# PubliX Group — publixgroup.io

Statisk flerspråkig webbplats (EN + SV/DA/NO/FI/DE) för [publixgroup.io](https://publixgroup.io).

Deploy: push till `main` → Netlify.

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
| `site/` | Produktions-HTML (EN i root, övriga språk i undermappar) |
| `site/Design-system/` | Brand, tokens, komponenter |
| `site/docs/` | Strategi, foundation, SEO-register |
| `.claude/skills/` | Agent-skill för redigering (Claude Code / Cursor) |

## Verktyg

```bash
npm install
node optimize.js    # optimera JPG/PNG under site/
node make_favicon.js
```

## Repo

https://github.com/Quift/publixgroup-webplats