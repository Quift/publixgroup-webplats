# Site Owner Manual — PubliX Group / publixgroup.io

**Domän:** https://publixgroup.io  
**Repo:** https://github.com/Quift/publixgroup-webplats  
**Deploy:** push `main` → Netlify  
**Senast uppdaterad:** 2026-07-09  
**Site owner:** PubliX Group (intern redaktör under Alexander Hübel; teknisk eskalering Pierre-Emil)

> Handoff efter bootstrap + Fas 8-setup. Mall: `ai/templates/site/site-owner-manual.md` (Life OS vault).

---

## 1. Vad siten gör

Moderbolagets **M&A- och rekryteringssite** — attraherar founders av nordisk GovTech-SaaS till dialog/förvärv. **Inte** slutkundsmarknadsföring för Tidvis, digiPlant, Sotender m.fl.

Kanon: `docs/foundation/jtbd.md`

---

## 2. Två lager

| Lager | När | Hur |
|-------|-----|-----|
| **Underhåll** | Copy, favicon, nyhetsartikel, SEO | `/publix-site-edit` · Fas 8 |
| **Strategisk** | Pivot, ny money page, repositioning | `site-produktion` V5 Fas 0–7 |

---

## 3. Kom igång

1. Klona repot
2. Läs `docs/foundation/` — `architecture.md`, `proof-inventory.md`
3. Cursor/Grok → `/publix-site-edit`

---

## 4. Ändringstiers

| Tier | Exempel | Godkännande |
|------|---------|-------------|
| M1 | Typo, favicon | Intern |
| M2 | Copy, nyhetsartikel | Gate mot architecture + PI |
| M3 | Ny nav-sida, CTA-strategi | **Alexander Hübel + PE** |
| U1 | Pivot | Full site-produktion |

---

## 5. Obligatoriska regler

- Inga fakta utan PI-post i `proof-inventory.md`
- **EN först** → SV, DA, NO, FI, DE
- Design: `site/Design-system/SKILL.md`
- Bryter restrictions i `architecture.md` → stopp

---

## 6. Eskalering

| Situation | Till |
|-----------|------|
| Strategisk riktning | Alexander Hübel |
| Design system / ny komponent | Pierre-Emil |
| Deploy/DNS/favicon live | PE eller Stockholm Code |
| Juridik/förvärvsfakta | Alexander + PE |

---

## 7. Vanliga uppgifter

| Uppgift | Tier | Notering |
|---------|------|----------|
| Favicon | M1 | Känt issue live — bra test av flödet |
| Ny pressrelease | M2 | Kopiera `news/<slug>.html` → 6 språk |
| Ny kärnsida i nav | M3 | Uppdatera `architecture.md` först |

---

## 8. Referensfiler

| Fil | Innehåll |
|-----|----------|
| `.grok/skills/publix-site-edit/SKILL.md` | Agent-workflow |
| `docs/foundation/` | Strategisk sanning |
| `docs/seo/keywords.md` | Meta-changelog |
| `ai/workflows/site-produktion/08-maintenance.md` | Fas 8-kanon (vault) |