const fs = require("fs");
const path = require("path");

const SITE_ROOT = path.join(__dirname, "site");
const SRC = path.join(__dirname, "site-src");
const BASE = "https://publixgroup.io";
const LANG_DIRS = ["sv", "da", "no", "fi", "de"];

// lastmod per sida.
// Ursprungligen hårdkodat lanseringsdatum → alla sidor fick samma datum.
// Får INTE tas från den byggda HTML-filen heller: build.js skriver om varje fil
// vid varje körning, så mtime där = senaste bygget, inte senaste ändringen.
// Datumet härleds därför ur sidans källor: innehålls-JSON + mallen den renderas ur.
function sourcesFor(builtFile) {
  const rel = path.relative(SITE_ROOT, builtFile).replace(/\\/g, "/");
  const parts = rel.split("/");
  const lang = LANG_DIRS.includes(parts[0]) ? parts.shift() : "en";
  const pagePath = parts.join("/");

  if (pagePath.startsWith("news/")) {
    const slug = pagePath.slice("news/".length, -".html".length);
    return [
      path.join(SRC, "news", slug, lang + ".json"),
      path.join(SRC, "templates", "news-article.html"),
    ];
  }
  const page = pagePath.slice(0, -".html".length);
  return [
    path.join(SRC, "content", lang, page + ".json"),
    path.join(SRC, "templates", page + ".html"),
  ];
}

function ymd(date) {
  // lokal tid, inte UTC — annars hamnar kvällsändringar på fel dygn
  const p = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
}

function lastmodOf(builtFile) {
  const times = sourcesFor(builtFile)
    .filter((f) => fs.existsSync(f))
    .map((f) => fs.statSync(f).mtime.getTime());
  // saknas källorna (t.ex. handskriven sida) — falla tillbaka på den byggda filen
  if (!times.length) times.push(fs.statSync(builtFile).mtime.getTime());
  return ymd(new Date(Math.max(...times)));
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "Design-system" || entry.name === "docs") continue;
      walk(full, files);
    } else if (entry.name.endsWith(".html")) {
      // 404-sidor är noindex och _og-image.html är en intern renderingsmall
      if (entry.name === "404.html" || entry.name.startsWith("_")) continue;
      const head = fs.readFileSync(full, "utf8").slice(0, 2000);
      if (/http-equiv=["']refresh["']/i.test(head)) continue;
      if (/<meta\s+name=["']robots["'][^>]*noindex/i.test(head)) continue;
      files.push(full);
    }
  }
  return files;
}

function toUrl(filePath) {
  const rel = path.relative(SITE_ROOT, filePath).replace(/\\/g, "/");
  if (rel === "index.html") return `${BASE}/`;
  if (rel.endsWith("/index.html")) {
    return `${BASE}/${rel.slice(0, -"index.html".length)}`;
  }
  return `${BASE}/${rel}`;
}

const urls = walk(SITE_ROOT)
  .map((file) => ({ loc: toUrl(file), lastmod: lastmodOf(file) }))
  .sort((a, b) => a.loc.localeCompare(b.loc));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(SITE_ROOT, "sitemap.xml"), xml);
console.log(`Wrote ${urls.length} URLs to site/sitemap.xml`);