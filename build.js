#!/usr/bin/env node
// build.js — genererar alla språkvarianter i site/ från site-src/.
//
//   node build.js            bygg allt och skriv till site/
//   node build.js --check    bygg i minnet och diffa mot befintliga filer (byte-parity)
//   node build.js --page X   bygg/checka bara sidtypen X (t.ex. contact, news:aspicore)
//
// site-src/templates/{page}.html  — markup med {{nycklar}} från content-JSON
// site-src/content/{lang}/{page}.json — översatta strängar (värden är rå HTML)
// site-src/news/{slug}/{lang}.json — pressreleaser (title, lead, body_html, …)
//
// Reserverade (beräknade) nycklar, versaler:
//   {{LANG}}            språkkod (en, sv, da, no, fi, de)
//   {{R}}               relativt prefix till site-root ('' | '../' | '../../')
//   {{PAGE_URL}}        absolut URL till aktuell sidvariant
//   {{HREFLANG_BLOCK}}  <link rel="alternate" hreflang …> + x-default
//   {{LANG_BTN}}        flagga+kod för aktivt språk i dropdown-knappen
//   {{LANG_MENU}}       dropdown-menyns <a>-rader med korrekta relativa hrefs
// Loopar: {{#each key}} … {{.field}} … {{/each}} där key är en JSON-array av objekt.
//
// AI-läsbarhet (klartil.ai-kraven, 2026-11-27) — läggs på automatiskt efter renderingen:
//   - extra JSON-LD före </head>: WebSite (startsidan), FAQPage (startsidan
//     ur usp-frågorna, why-publix ur faq.qN/aN)
//   - <link rel="alternate" type="text/markdown"> + en .md-variant av varje sida
//     (innehållet i <main>, utan nav/skript/video) bredvid .html-filen
//   - site/llms.txt + site/llms-full.txt genereras ur de engelska sidorna
//   netlify/edge-functions/markdown.ts serverar .md-varianten vid Accept: text/markdown
//   eller AI-agenters User-Agent.
//
// Prestanda (seositecheckup-kraven, 2026-11-27):
//   - <img … data-fit="WxH cover|contain [top]"> → WebP-varianter i rätt storlek (1x + 2x)
//     i site/img/_v/, src/srcset skrivs om (inga width/height: de ger en aspect-ratio-hint
//     som ändrar kort med andra mått än data-fit). I JS-strängar: {{fit:1 src WxH mode}}
//     ger 1x-URL:en, {{fit:2 …}} 2x. Varianterna skapas med sharp och cachas (byggs bara om
//     källan är nyare).
//   - sidans <link rel="stylesheet">-rader slås ihop (med @import upplösta) till en fil
//     site/css/bundle/{hash}.css → en förfrågan i stället för 14
//   - target="_blank" utan rel får rel="noopener"
//   - Google Analytics-taggen (Consent Mode v2, grundläge) läggs i <head> på varje sida:
//     samtycke nekat som standard, ingen config/mätning förrän js/consent.js får "Acceptera"
//   - e-postadresser kodas (HTML-entiteter, \u0040 i JSON-LD) mot adress-skördare

'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const TurndownService = require('turndown');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'site-src');
const OUT = path.join(ROOT, 'site');
const BASE_URL = 'https://publixgroup.io';

const LANGS = [
  { code: 'en', dir: '',   flag: '🇬🇧', label: 'EN' },
  { code: 'sv', dir: 'sv', flag: '🇸🇪', label: 'SV' },
  { code: 'da', dir: 'da', flag: '🇩🇰', label: 'DA' },
  { code: 'no', dir: 'no', flag: '🇳🇴', label: 'NO' },
  { code: 'fi', dir: 'fi', flag: '🇫🇮', label: 'FI' },
  { code: 'de', dir: 'de', flag: '🇩🇪', label: 'DE' },
];

// ---------- template engine ----------

function render(tpl, data) {
  // {{#each key}} ... {{/each}}
  tpl = tpl.replace(/\{\{#each ([\w.]+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (_, key, block) => {
    const arr = lookup(data, key);
    if (!Array.isArray(arr)) throw new Error(`each: '${key}' är inte en array`);
    return arr.map(item =>
      block.replace(/\{\{\.([\w.]+)\}\}/g, (_, k) => {
        const v = lookup(item, k);
        if (v === undefined) throw new Error(`each '${key}': saknad fältnyckel '${k}'`);
        return v;
      })
    ).join('');
  });
  // {{key}}
  return tpl.replace(/\{\{([\w.]+)\}\}/g, (_, key) => {
    const v = lookup(data, key);
    if (v === undefined) throw new Error(`saknad nyckel '${key}'`);
    return v;
  });
}

function lookup(obj, dotted) {
  return dotted.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

// ---------- computed keys ----------

// pagePath: sidans path relativt språkroten, t.ex. 'contact.html' eller 'news/aspicore.html'
function computed(lang, pagePath) {
  const depth = pagePath.split('/').length - 1; // news/x.html -> 1
  const up = '../'.repeat(depth);
  const R = (lang.dir ? '../' : '') + up; // från sv/news/x.html: '../../'
  const langPage = l => (l.dir ? l.dir + '/' : '') + pagePath;
  const url = l => `${BASE_URL}/${langPage(l)}`;

  const hreflang = LANGS.map(l =>
    `<link rel="alternate" hreflang="${l.code}" href="${url(l)}">`
  ).join('\n') + `\n<link rel="alternate" hreflang="x-default" href="${url(LANGS[0])}">`;

  // relativ länk från aktuell sidvariant till samma sida på språk l
  const relTo = l => {
    if (l.code === lang.code) return path.basename(pagePath);
    const fromDir = (lang.dir ? lang.dir + '/' : '') + pagePath.replace(/[^/]+$/, '');
    const upAll = '../'.repeat(fromDir.split('/').filter(Boolean).length);
    return upAll + langPage(l);
  };
  const menu = LANGS.map(l =>
    `          <a href="${relTo(l)}" data-lang="${l.code}">${l.flag} ${l.label}</a>`
  ).join('\n');

  return {
    LANG: lang.code,
    R,
    PAGE_URL: url(lang),
    HREFLANG_BLOCK: hreflang,
    LANG_BTN: `${lang.flag} ${lang.label}`,
    LANG_MENU: menu,
  };
}


// ---------- AI readability ----------

// Portfolio companies — mirrors the COMPANIES list in templates/index.html.
const PORTFOLIO = [
  { name: 'Tidvis', url: 'https://tidvis.se' },
  { name: 'digiPlant', url: 'https://www.digiplant.se/sv/' },
  { name: 'Aspicore', url: 'https://aspicore.com' },
  { name: 'Koivu Solutions', url: 'https://sotender.io' },
  { name: 'Embrace Safety', url: 'https://www.embrace-safety.se/' },
  { name: 'Bleau', url: 'https://www.bleau.dk/' },
  { name: 'Elected Technologies', url: 'https://www.electedtechnologies.com/' },
];

function decodeEntities(str) {
  return str
    .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&amp;/g, '&');
}
const plain = html => decodeEntities(String(html).replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const ldScript = obj => `<script type="application/ld+json">${JSON.stringify(obj, null, 2)}</script>\n`;

function faqPage(pairs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pairs.map(([q, a]) => ({
      '@type': 'Question',
      name: plain(q),
      acceptedAnswer: { '@type': 'Answer', text: plain(a) },
    })),
  };
}

function extraJsonLd(page, content, lang, pageUrl) {
  let out = '';
  if (page === 'index') {
    out += ldScript({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'PubliX Group',
      url: pageUrl,
      inLanguage: lang.code,
      publisher: { '@type': 'Organization', name: 'PubliX Group', url: `${BASE_URL}/` },
    });
    // The homepage sections are framed as a founder's question (eyebrow) answered by the section.
    const pairs = ['usp1', 'usp2', 'usp3', 'usp4', 'usp5']
      .map(k => content[k])
      .filter(u => u && u.eyebrow)
      .map(u => [u.eyebrow, [u.title, u.p1, u.p2, u.p3].filter(Boolean).join(' ')]);
    if (pairs.length) out += ldScript(faqPage(pairs));
  }
  if (content.faq) {
    const pairs = [];
    for (let i = 1; content.faq['q' + i]; i++) pairs.push([content.faq['q' + i], content.faq['a' + i] || '']);
    if (pairs.length) out += ldScript(faqPage(pairs));
  }
  return out;
}

const turndown = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced' });
turndown.remove(['script', 'style', 'noscript', 'svg', 'video', 'audio', 'iframe', 'form', 'template']);
const DROP_CLASSES = /\b(video-answer|companies__nav|co-dots|faq__icon|skip-link|lead-magnet__form|form-card)\b/;
turndown.addRule('drop-ui', {
  filter: node => DROP_CLASSES.test(node.getAttribute && node.getAttribute('class') || ''),
  replacement: () => '',
});
turndown.addRule('decorative-img', {
  filter: node => node.nodeName === 'IMG' && !(node.getAttribute('alt') || '').trim(),
  replacement: () => '',
});
turndown.addRule('img', {
  filter: 'img',
  replacement: () => '', // images carry no text for agents; alt text is already in captions/names
});

// absolute links so the markdown works out of context
let currentPageUrl = BASE_URL + '/';
turndown.addRule('abs-link', {
  filter: node => node.nodeName === 'A' && node.getAttribute('href'),
  replacement: (text, node) => {
    if (!text.trim()) return '';
    let abs = node.getAttribute('href');
    try { abs = new URL(abs, currentPageUrl).href; } catch (_) {}
    return `[${text.trim()}](${abs})`;
  },
});
// FAQ questions sit in <button>s on the page; give them heading weight in markdown
turndown.addRule('faq-question', {
  filter: node => /\bfaq__question\b/.test(node.getAttribute && node.getAttribute('class') || ''),
  replacement: text => `\n\n### ${text.trim()}\n\n`,
});

function toMarkdown(html, pageUrl, lang) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/);
  if (!main) return null;
  currentPageUrl = pageUrl;
  const title = plain((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
  const desc = plain((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  const body = turndown.turndown(main[1])
    .replace(/^[ \t\u00a0]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n').trim();
  const fm = [
    '---',
    `title: ${JSON.stringify(title)}`,
    desc ? `description: ${JSON.stringify(desc)}` : null,
    `url: ${pageUrl}`,
    `language: ${lang.code}`,
    '---',
  ].filter(Boolean).join('\n');
  return { md: `${fm}\n\n${body}\n`, title, desc };
}

// Inject JSON-LD + markdown alternate link, and derive the .md variant.
function finalize(html, { page, content, lang, pagePath }) {
  html = perfPass(html, lang, pagePath);
  const pageUrl = computed(lang, pagePath).PAGE_URL.replace(/index\.html$/, '');
  const mdName = path.basename(pagePath).replace(/\.html$/, '.md');
  const hasMain = /<main\b/.test(html) && page !== '404';
  if (hasMain) {
    const inject = `<link rel="alternate" type="text/markdown" href="${mdName}">\n` +
      extraJsonLd(page, content, lang, pageUrl);
    html = html.replace('</head>', inject + '</head>');
  }
  const md = hasMain ? toMarkdown(html, pageUrl, lang) : null;
  return { html, md, pageUrl };
}

function buildLlms(entries) {
  const en = entries.filter(e => e.lang.code === 'en' && e.md && e.page !== '404');
  const order = ['index', 'why-publix', 'about', 'team', 'companies', 'news', 'contact'];
  const core = order.map(p => en.find(e => e.page === p)).filter(Boolean);
  const news = en.filter(e => e.page === 'news-article').sort((a, b) => b.date.localeCompare(a.date));
  const legal = en.filter(e => /policy/.test(e.page));
  const line = e => `- [${e.md.title.replace(/\s*[—|]\s*PubliX Group$/, '')}](${e.pageUrl})${e.md.desc ? ': ' + e.md.desc : ''}`;
  const langName = { sv: 'Svenska', da: 'Dansk', no: 'Norsk', fi: 'Suomi', de: 'Deutsch' };

  const llms = `# PubliX Group

> PubliX Group is a Nordic buy-and-build group for founder-led SaaS companies that serve the public sector in the Nordics and the UK. It is a permanent owner, backed by Aspira Partners, and headquartered in Stockholm.

PubliX Group AB (org. no. 559485-5487) acquires and develops vertical SaaS companies serving public services, such as social care, grants management, procurement, safety and scheduling. Portfolio companies keep their own brand, office and decision-making; the group adds shared customer relationships, procurement capability, embedded AI expertise and expansion into new markets. The site is written for founders and CEOs considering a partnership or a sale.

Every page is also available as Markdown: replace \`.html\` with \`.md\` (\`/\` → \`/index.md\`), or request the page with \`Accept: text/markdown\`.

## Main pages

${core.map(line).join('\n')}

## Portfolio companies

${PORTFOLIO.map(c => `- [${c.name}](${c.url})`).join('\n')}

## News

${news.map(line).join('\n')}

## Other languages

The same pages exist in ${Object.values(langName).join(', ')}:
${Object.entries(langName).map(([code, name]) => `- [${name}](${BASE_URL}/${code}/)`).join('\n')}

## Contact

- Email: info@publixgroup.io
- Address: Kungsgatan 37, 7tr, 111 56 Stockholm, Sweden
- [Contact page](${BASE_URL}/contact.html)

## Optional

- [Full site content as one Markdown file](${BASE_URL}/llms-full.txt)
- [Sitemap](${BASE_URL}/sitemap.xml)
${legal.map(line).join('\n')}
`;
  const full = `# PubliX Group — full site content (English)\n\n` +
    [...core, ...news].map(e => e.md.md).join('\n\n---\n\n');
  return { llms, full };
}


// ---------- performance: images, CSS bundle, link hygiene ----------

const IMG_JOBS = new Map(); // outFile -> { src, w, h, fit, pos }

// resolve an href/src as written in a page to a path relative to site/
function siteRel(ref, lang, pagePath) {
  if (/^(https?:)?\/\//.test(ref) || ref.startsWith('data:')) return null;
  ref = ref.split(/[?#]/)[0];
  if (ref.startsWith('/')) return ref.slice(1);
  const dir = path.posix.dirname(path.posix.join(lang.dir || '.', pagePath));
  return path.posix.normalize(path.posix.join(dir, ref));
}

function variant(srcRel, w, h, fit, pos, scale) {
  const stem = path.posix.basename(srcRel).replace(/\.[^.]+$/, '');
  const W = w * scale, H = h * scale;
  const name = `img/_v/${stem}-${W}x${H}${fit === 'contain' ? '-c' : ''}${pos && pos !== 'center' ? '-' + pos : ''}.webp`;
  IMG_JOBS.set(name, { src: srcRel, w: W, h: H, fit, pos });
  return '/' + name;
}

function processImages(html, lang, pagePath) {
  html = html.replace(/<img\b([^>]*?)\sdata-fit="(\d+)x(\d+)(?: (cover|contain))?(?: (\w+))?"([^>]*)>/g,
    (tag, pre, w, h, fit = 'cover', pos = 'center', post) => {
      const attrs = pre + post;
      const m = attrs.match(/\ssrc="([^"]+)"/);
      const rel = m && siteRel(m[1], lang, pagePath);
      if (!rel || !/\.(jpe?g|png|webp)$/i.test(rel)) return tag.replace(/\sdata-fit="[^"]*"/, '');
      const one = variant(rel, +w, +h, fit, pos, 1), two = variant(rel, +w, +h, fit, pos, 2);
      return `<img${attrs.replace(m[0], ` src="${one}" srcset="${one} 1x, ${two} 2x"`)}>`;
    });
  return html.replace(/\{\{fit:([12]) (\S+) (\d+)x(\d+)(?: (cover|contain))?(?: (\w+))?\}\}/g,
    (_, scale, src, w, h, fit = 'cover', pos = 'center') => {
      const rel = siteRel(src, lang, pagePath);
      return variant(rel, +w, +h, fit, pos, +scale);
    });
}

async function renderImageJobs() {
  const sharp = require('sharp');
  let made = 0;
  for (const [name, j] of IMG_JOBS) {
    const out = path.join(OUT, name), src = path.join(OUT, j.src);
    if (!fs.existsSync(src)) { console.error(`FAIL  bild saknas: ${j.src}`); process.exitCode = 1; continue; }
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs) continue;
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await sharp(src)
      .resize(j.w, j.h, { fit: j.fit, position: j.pos === 'center' ? 'centre' : j.pos, background: { r: 0, g: 0, b: 0, alpha: 0 }, withoutEnlargement: false })
      .webp({ quality: 82, effort: 5 })
      .toFile(out);
    made++;
  }
  return made;
}

const CSS_BUNDLES = new Map(); // file -> css text

function inlineCss(fileRel, seen = new Set()) {
  if (seen.has(fileRel)) return '';
  seen.add(fileRel);
  // strip a leading BOM: harmless at the start of a file, but mid-bundle it breaks the next selector
  const css = fs.readFileSync(path.join(OUT, fileRel), 'utf8').replace(/^\uFEFF/, '');
  const dir = path.posix.dirname(fileRel);
  return css
    .replace(/@import\s+(?:url\()?["']([^"']+)["']\)?\s*;/g, (_, ref) =>
      inlineCss(path.posix.normalize(path.posix.join(dir, ref)), seen))
    .replace(/url\(\s*(["']?)([^"')]+)\1\s*\)/g, (m, q, ref) => {
      if (/^(data:|https?:|\/|#)/.test(ref)) return m;
      return `url("/${path.posix.normalize(path.posix.join(dir, ref))}")`;
    });
}

function bundleCss(html, lang, pagePath) {
  const links = [...html.matchAll(/^[ \t]*<link rel="stylesheet" href="([^"]+)">\n/gm)];
  if (links.length < 2) return html;
  const files = links.map(l => siteRel(l[1], lang, pagePath));
  if (files.some(f => !f)) return html;
  const css = files.map(f => `/* ${f} */\n` + inlineCss(f)).join('\n');
  const hash = crypto.createHash('sha1').update(css).digest('hex').slice(0, 10);
  const name = `css/bundle/${hash}.css`;
  CSS_BUNDLES.set(name, css);
  let first = true;
  for (const l of links) {
    html = html.replace(l[0], first ? `<link rel="stylesheet" href="/${name}">\n` : '');
    first = false;
  }
  return html;
}

const GA_ID = 'G-F39X0LXQTH'; // same ID as js/consent.js
// Consent Mode v2, basic: the tag is on the page, but nothing is measured and no cookie is
// set until js/consent.js calls gtag('consent','update',…) + gtag('config',…) on "Accept".
const GA_TAG =
  `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>\n` +
  `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}` +
  `gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});` +
  `gtag('js',new Date());</script>\n`;

const encodeEntities = str => [...str].map(c => `&#${c.codePointAt(0)};`).join('');
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

function protectEmails(html) {
  // JSON-LD: escape the @ so the address is still valid JSON but not plain text
  html = html.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g,
    (_, a, json, b) => a + json.replace(EMAIL, m => m.replace('@', '\\u0040')) + b);
  // everywhere else outside <script>: HTML entities (browsers render and follow them unchanged)
  return html.split(/(<script\b[\s\S]*?<\/script>)/).map((part, i) =>
    i % 2 ? part : part.replace(/mailto:([^"'?\s>]+)/g, (_, a) => encodeEntities('mailto:' + a))
      .replace(EMAIL, m => m.includes('&#') ? m : encodeEntities(m))).join('');
}

const PRELOAD_FONTS = [
  '/Design-system/assets/fonts/hanken/hanken-var.woff2',
  '/Design-system/assets/fonts/sora/sora-var.woff2',
];

function perfPass(html, lang, pagePath) {
  html = processImages(html, lang, pagePath);
  html = bundleCss(html, lang, pagePath);
  if (/<link rel="stylesheet" href="\/css\/bundle\//.test(html)) {
    html = html.replace(/(<link rel="stylesheet" href="\/css\/bundle\/)/,
      PRELOAD_FONTS.map(f => `<link rel="preload" href="${f}" as="font" type="font/woff2" crossorigin>\n`).join('') + '$1');
  }
  if (/<\/head>/.test(html) && !html.includes('googletagmanager.com/gtag/js'))
    html = html.replace(/(<meta name="viewport"[^>]*>\n)/, '$1' + GA_TAG);
  html = protectEmails(html);
  // external links opened in a new tab must not get window.opener
  html = html.replace(/<a\b[^>]*>/g, tag =>
    /target="_blank"/.test(tag) && !/\srel=/.test(tag) ? tag.replace('target="_blank"', 'target="_blank" rel="noopener"') : tag);
  return html;
}

// ---------- build ----------

function listPages() {
  const dir = path.join(SRC, 'templates');
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.html') && f !== 'news-article.html')
    .map(f => f.replace(/\.html$/, ''));
}

function listNews() {
  const dir = path.join(SRC, 'news');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());
}

function buildPage(page, lang) {
  const tpl = fs.readFileSync(path.join(SRC, 'templates', page + '.html'), 'utf8');
  const contentFile = path.join(SRC, 'content', lang.code, page + '.json');
  const content = JSON.parse(fs.readFileSync(contentFile, 'utf8'));
  const pagePath = page + '.html';
  const raw = render(tpl, { ...content, ...computed(lang, pagePath) });
  const { html, md, pageUrl } = finalize(raw, { page, content, lang, pagePath });
  return { outPath: path.join(OUT, lang.dir, pagePath), html, md, page, lang, pageUrl };
}

function buildNews(slug, lang) {
  const tpl = fs.readFileSync(path.join(SRC, 'templates', 'news-article.html'), 'utf8');
  const contentFile = path.join(SRC, 'news', slug, lang.code + '.json');
  const content = JSON.parse(fs.readFileSync(contentFile, 'utf8'));
  const pagePath = 'news/' + slug + '.html';
  const raw = render(tpl, { ...content, SLUG: slug, ...computed(lang, pagePath) });
  const { html, md, pageUrl } = finalize(raw, { page: 'news-article', content, lang, pagePath });
  return { outPath: path.join(OUT, lang.dir, pagePath), html, md, page: 'news-article', lang, pageUrl,
    date: (content.date && content.date.published_iso) || '' };
}

async function main() {
  const args = process.argv.slice(2);
  const check = args.includes('--check');
  const pageArg = args.includes('--page') ? args[args.indexOf('--page') + 1] : null;

  let pages = listPages();
  let news = listNews();
  if (pageArg) {
    if (pageArg.startsWith('news:')) { pages = []; news = [pageArg.slice(5)]; }
    else { pages = pages.filter(p => p === pageArg); news = []; }
  }

  const jobs = [];
  for (const lang of LANGS) {
    for (const p of pages) jobs.push(() => buildPage(p, lang));
    for (const s of news) jobs.push(() => buildNews(s, lang));
  }

  // every output file: { outPath, text }
  const outputs = [];
  const built = [];
  let ok = 0, diff = 0, missing = 0, failed = 0;
  for (const job of jobs) {
    let res;
    try { res = job(); }
    catch (e) { console.error(`FAIL  ${e.message}`); failed++; continue; }
    built.push(res);
    outputs.push({ outPath: res.outPath, text: res.html });
    if (res.md) outputs.push({ outPath: res.outPath.replace(/\.html$/, '.md'), text: res.md.md });
  }
  for (const [name, css] of CSS_BUNDLES) outputs.push({ outPath: path.join(OUT, name), text: css });
  if (!pageArg && !failed) {
    const { llms, full } = buildLlms(built);
    outputs.push({ outPath: path.join(OUT, 'llms.txt'), text: llms });
    outputs.push({ outPath: path.join(OUT, 'llms-full.txt'), text: full });
  }

  for (const res of outputs) {
    const rel = path.relative(OUT, res.outPath);
    if (check) {
      if (!fs.existsSync(res.outPath)) { console.log(`NY    ${rel}`); missing++; continue; }
      // ledande BOM i befintliga filer ignoreras — bygget skriver medvetet utan BOM
      const cur = fs.readFileSync(res.outPath, 'utf8').replace(/^\uFEFF/, '');
      if (cur === res.text) { ok++; }
      else {
        diff++;
        const a = cur.split('\n'), b = res.text.split('\n');
        let firstDiff = -1;
        for (let i = 0; i < Math.max(a.length, b.length); i++)
          if (a[i] !== b[i]) { firstDiff = i; break; }
        console.log(`DIFF  ${rel}  (rad ${firstDiff + 1})`);
        console.log(`   befintlig: ${JSON.stringify((a[firstDiff] || '').slice(0, 120))}`);
        console.log(`   genererad: ${JSON.stringify((b[firstDiff] || '').slice(0, 120))}`);
      }
    } else {
      fs.mkdirSync(path.dirname(res.outPath), { recursive: true });
      fs.writeFileSync(res.outPath, res.text);
      ok++;
    }
  }
  if (!check) {
    const made = await renderImageJobs();
    console.log(`bilder: ${IMG_JOBS.size} varianter (${made} nya)`);
    // drop stale CSS bundles
    const bdir = path.join(OUT, 'css/bundle');
    if (!pageArg && fs.existsSync(bdir))
      for (const f of fs.readdirSync(bdir)) if (!CSS_BUNDLES.has('css/bundle/' + f)) fs.unlinkSync(path.join(bdir, f));
  } else {
    for (const name of IMG_JOBS.keys())
      if (!fs.existsSync(path.join(OUT, name))) { console.log(`NY    ${name}`); missing++; }
  }
  console.log(check
    ? `\n--check: ${ok} identiska, ${diff} diffar, ${missing} nya, ${failed} fel`
    : `\nbyggde ${ok} filer (${failed} fel)`);
  if (failed || (check && diff)) process.exitCode = 1;
}

main().catch(e => { console.error(e); process.exitCode = 1; });
