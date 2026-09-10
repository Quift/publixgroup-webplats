# PubliX Group — publixgroup.io

Statisk flerspråkig webbplats (EN + SV/DA/NO/FI/DE) för [publixgroup.io](https://publixgroup.io).

Deploy: push till `main` → Netlify.

## ⚠️ HTML-filerna i `site/` är GENERERADE

Sedan 2026-09-09 byggs alla HTML-sidor från `site-src/` (mallar + innehålls-JSON per språk).
**Redigera aldrig HTML direkt i `site/`** — ändringarna skrivs över vid nästa bygge.

```bash
node build.js          # bygg alla språkvarianter → site/
node build.js --check  # verifiera att site/ matchar källan
```

- Copyändring → redigera `site-src/content/{lang}/{sida}.json` (alla 6 språk) → `node build.js`
- Ny pressrelease → ny mapp `site-src/news/{slug}/` med `{en,sv,da,no,fi,de}.json` + kort i
  `site-src/content/{lang}/news.json` → bygg → `node generate-sitemap.js`
- Strukturändring → redigera `site-src/templates/{sida}.html` (slår igenom i alla språk)

Format och regler: [`site-src/SPEC.md`](site-src/SPEC.md).

## Redigera siten med AI-agenter

**Skill:** [`.claude/skills/publix-site-edit/SKILL.md`](.claude/skills/publix-site-edit/SKILL.md)

I Claude Code eller Cursor: klona repot, öppna projektroten, kör `/publix-site-edit`.

Skillen implementerar löpande underhåll (copy, SEO, nyhetsartiklar, favicon, 6 språk) med strategisk gate mot foundation-dokumentationen.

### Läsordning för agenter

1. [`site/docs/foundation/`](site/docs/foundation/) — JTBD, arkitektur, evidens, trafik
2. [`site/docs/seo/keywords.md`](site/docs/seo/keywords.md) — meta + changelog
3. [`site/Design-system/SKILL.md`](site/Design-system/SKILL.md) — visuell identitet

### Site owner (entreprenör / intern)

| Dokument | Syfte |
|----------|--------|
| [`SITE-OWNER-MANUAL.md`](site/docs/SITE-OWNER-MANUAL.md) | Start på 5 min, röda linjer, eskalering |
| [`OWNER-FAQ.md`](site/docs/OWNER-FAQ.md) | Vanliga frågor — agenten läser också |

## Struktur

| Mapp | Innehåll |
|------|----------|
| `site-src/` | **Källan**: mallar + innehålls-JSON per språk + `SPEC.md` |
| `build.js` | Genererar alla språkvarianter från `site-src/` → `site/` |
| `site/` | Produktions-HTML — GENERERAD, redigeras aldrig direkt (EN i root, övriga språk i undermappar) |
| `site/Design-system/` | Brand, tokens, komponenter |
| `site/docs/` | Strategi, foundation, SEO-register |
| `.claude/skills/` | Agent-skill för redigering (Claude Code / Cursor) |

## Verktyg

```bash
npm install
node optimize.js       # optimera JPG/PNG under site/
node make_favicon.js   # favicon.png + apple-touch-icon från favicon.svg
node generate-sitemap.js  # site/sitemap.xml (produktionssidor)
```

## Repo

https://github.com/Quift/publixgroup-webplats