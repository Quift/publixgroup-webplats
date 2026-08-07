const fs = require("fs");
const path = require("path");

const SITE_ROOT = path.join(__dirname, "site");
const BASE = "https://publixgroup.io";
const LASTMOD = "2026-07-09";

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "Design-system" || entry.name === "docs") continue;
      walk(full, files);
    } else if (entry.name.endsWith(".html")) {
      const head = fs.readFileSync(full, "utf8").slice(0, 2000);
      if (/http-equiv=["']refresh["']/i.test(head)) continue;
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
  .map(toUrl)
  .sort((a, b) => a.localeCompare(b));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${LASTMOD}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(SITE_ROOT, "sitemap.xml"), xml);
console.log(`Wrote ${urls.length} URLs to site/sitemap.xml`);