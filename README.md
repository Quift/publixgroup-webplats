# PubliX Group — publixgroup.io

Statisk flerspråkig webbplats (EN + SV/DA/NO/FI/DE) för [publixgroup.io](https://publixgroup.io).

Deploy: push till `main` → Netlify.

## Redigera siten med AI-agenter

**Skill:** [`.grok/skills/publix-site-edit/SKILL.md`](.grok/skills/publix-site-edit/SKILL.md)

I Cursor eller Grok: klona repot, öppna projektroten, kör `/publix-site-edit`.

Skillen implementerar löpande underhåll (copy, SEO, nyhetsartiklar, favicon, 6 språk) med strategisk gate mot foundation-dokumentationen.

### Läsordning för agenter

1. [`site/docs/foundation/`](site/docs/foundation/) — JTBD, arkitektur, evidens, trafik
2. [`site/docs/seo/keywords.md`](site/docs/seo/keywords.md) — meta + changelog
3. [`site/Design-system/SKILL.md`](site/Design-system/SKILL.md) — visuell identitet

### Onboarding (människor)

[`site/docs/NOAH-ONBOARDING.md`](site/docs/NOAH-ONBOARDING.md)

## Struktur

| Mapp | Innehåll |
|------|----------|
| `site/` | Produktions-HTML (EN i root, övriga språk i undermappar) |
| `site/Design-system/` | Brand, tokens, komponenter |
| `site/docs/` | Strategi, foundation, SEO-register |
| `.grok/skills/` | Agent-skills för redigering |

## Verktyg

```bash
npm install
node optimize.js    # optimera JPG/PNG under site/
node make_favicon.js
```

## Repo

https://github.com/Quift/publixgroup-webplats