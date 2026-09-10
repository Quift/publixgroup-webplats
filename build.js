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

'use strict';
const fs = require('fs');
const path = require('path');

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
  const html = render(tpl, { ...content, ...computed(lang, pagePath) });
  return { outPath: path.join(OUT, lang.dir, pagePath), html };
}

function buildNews(slug, lang) {
  const tpl = fs.readFileSync(path.join(SRC, 'templates', 'news-article.html'), 'utf8');
  const contentFile = path.join(SRC, 'news', slug, lang.code + '.json');
  const content = JSON.parse(fs.readFileSync(contentFile, 'utf8'));
  const pagePath = 'news/' + slug + '.html';
  const html = render(tpl, { ...content, SLUG: slug, ...computed(lang, pagePath) });
  return { outPath: path.join(OUT, lang.dir, pagePath), html };
}

function main() {
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

  let ok = 0, diff = 0, missing = 0, failed = 0;
  for (const job of jobs) {
    let res;
    try { res = job(); }
    catch (e) { console.error(`FAIL  ${e.message}`); failed++; continue; }
    const rel = path.relative(OUT, res.outPath);
    if (check) {
      if (!fs.existsSync(res.outPath)) { console.log(`NY    ${rel}`); missing++; continue; }
      // ledande BOM i befintliga filer ignoreras — bygget skriver medvetet utan BOM
      const cur = fs.readFileSync(res.outPath, 'utf8').replace(/^﻿/, '');
      if (cur === res.html) { ok++; }
      else {
        diff++;
        const a = cur.split('\n'), b = res.html.split('\n');
        let firstDiff = -1;
        for (let i = 0; i < Math.max(a.length, b.length); i++)
          if (a[i] !== b[i]) { firstDiff = i; break; }
        console.log(`DIFF  ${rel}  (rad ${firstDiff + 1})`);
        console.log(`   befintlig: ${JSON.stringify((a[firstDiff] || '').slice(0, 120))}`);
        console.log(`   genererad: ${JSON.stringify((b[firstDiff] || '').slice(0, 120))}`);
      }
    } else {
      fs.mkdirSync(path.dirname(res.outPath), { recursive: true });
      fs.writeFileSync(res.outPath, res.html);
      ok++;
    }
  }
  console.log(check
    ? `\n--check: ${ok} identiska, ${diff} diffar, ${missing} nya, ${failed} fel`
    : `\nbyggde ${ok} filer (${failed} fel)`);
  if (failed || (check && diff)) process.exitCode = 1;
}

main();
