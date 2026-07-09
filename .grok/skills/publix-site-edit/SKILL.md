---
name: publix-site-edit
description: >
  Redigera publixgroup.io med AI-agenter — flerspråkig HTML-site (EN + SV/DA/NO/FI/DE).
  Implementerar site-produktion Fas 8 (underhåll). Triggas vid: ändra PubliX-siten, ny sida,
  SEO, översättning, favicon, interna länkar, nyhetsartikel, site owner, Netlify deploy.
  Kräver strategisk gate mot docs/foundation/ innan M2+-ändringar.
---

# PubliX Site Edit

Du redigerar **produktionskoden** för https://publixgroup.io — statisk HTML i `site/`, deployad via GitHub → Netlify.

**Kanonisk workflow:** `ai/workflows/site-produktion/08-maintenance.md` (Fas 8 underhåll).
Denna skill är den operativa implementationen för PubliX.

**Läs alltid före ändring (i ordning):**

1. `site/docs/foundation/jtbd.md` — läsarens jobb, DO-n
2. `site/docs/foundation/architecture.md` — purpose, conversion_goal, restrictions per sida
3. `site/docs/foundation/proof-inventory.md` — inga claims utan PI-post
4. `site/docs/foundation/traffic-thesis.md` — SEO-intent
5. `site/docs/seo/keywords.md` — meta + changelog
6. `site/docs/site-strategy.md` — övergripande mål (kort sammanfattning)
7. `site/Design-system/SKILL.md` + `readme.md` — visuell identitet

**Repo:** `Quift/publixgroup-webplats` · **Root:** `site/` = EN, språkmappar: `sv/`, `da/`, `no/`, `fi/`, `de/`

---

## Change tiers (från Fas 8)

| Tier | Exempel | Åtgärd |
|------|---------|--------|
| **M1** | Typo, favicon, CSS-bugg | Kör direkt, minimal check |
| **M2** | Copy-sektion, nyhetsartikel | Full Fas 8 + proof-check + 6 språk |
| **M3** | Ny nav-sida, CTA-strategi | Stopp — eskalera PE/Alexander, partiell V5 |
| **U1** | Pivot/repositioning | Stopp — full site-produktion V5 |

**Ny nyhetsartikel (M2):** Kopiera `news/<slug>.html` → alla språk → PI-poster → `architecture.md` om ny slug.

---

## Steg 0 — Strategisk gate (STOPPA om nej)

Innan du skriver kod, svara skriftligt i chat/commit:

1. **Vilken sida** (EN path)?
2. **Vilket syfte** och **conversion_goal** enligt `foundation/architecture.md`?
3. **Tjänar ändringen ett DO** i `foundation/jtbd.md`?
4. **Nya fakta?** Finns PI-post i `foundation/proof-inventory.md`?
5. **Påverkar ändringen CTA** (`#review`, contact)?
6. **Bryter restrictions?** → stoppa, eskalera Alexander/PE. **Tier M3+?** → stoppa.

Gör **inte** ändringar som bara "ser bättre ut" men försvagar self-selection eller lead-flödet.

---

## Steg 1 — Planera språkpropagering

| Kod | Mapp |
|-----|------|
| en | `site/` |
| sv | `site/sv/` |
| da | `site/da/` |
| no | `site/no/` |
| fi | `site/fi/` |
| de | `site/de/` |

**Regel:** EN är kanonisk struktur. Ändra EN först, sedan spegla till övriga fem.  
Samma filnamn i varje språk (t.ex. `why-publix.html` i root och `sv/why-publix.html`).

Undantag måste dokumenteras i `site/docs/seo/keywords.md` changelog.

---

## Steg 2 — Genomför ändring (EN)

- Följ design system: `Design-system/styles.css`, tokens, Phosphor-ikoner
- **Sentence case** rubriker, EU/British English på EN
- Behåll befintlig HTML-struktur (nav, footer, sektioner) om inte uttryckligen omdesign
- Nya bilder: `site/Design-system/assets/` eller `site/img/` — kör `node optimize.js` efter tillägg
- Hero/imagery: navy wash, `--radius-xl`, se brand-imagery i design readme

---

## Steg 3 — Propagera alla språk

För varje språk:

1. Översätt **intent**, inte ordagrant maskinöversättning — behåll GovTech-ton
2. Uppdatera `<html lang="...">`
3. Uppdatera `<title>`, `meta name="description"`, `og:title`, `og:description`
4. Uppdatera nav-länkar och synliga CTA:er
5. Kontrollera att `#review` och formulär-ID:n finns kvar om sidan har lead-magnet

---

## Steg 4 — SEO & metadata

Uppdatera `site/docs/seo/keywords.md` med:

- Primary/secondary keyword om de ändrats
- Ny title/description om ändrat
- Changelog-rad med datum och kort beskrivning

**Per HTML-fil, verifiera:**

```
<title>          — unik, ~50–60 tecken, intent tydlig
meta description — unik, ~140–155 tecken, inkluderar CTA-värde
og:title         — matchar eller avsiktligt avviker (dokumentera)
og:description   — matchar meta
og:url           — korrekt URL för språkversion
og:image         — finns och laddar (1200×630 rekommenderat)
twitter:card     — summary_large_image
```

**Om du lägger till canonical/hreflang** — gör det konsekvent för alla språkversioner av samma sida.

---

## Steg 5 — Interna länkar

Kör mental/grep-checklista:

- [ ] Alla `href` i nav pekar på existerande filer **inom samma språkmapp**
- [ ] Brödsmulor / "tillbaka till news" fungerar
- [ ] Portfolio-länkar på `companies.html` matchar `news/<slug>.html`
- [ ] Språkväxlaren (`lang-dropdown`) pekar på rätt motsvarighet (idag delvis `data-lang` — verifiera faktiska hrefs)
- [ ] Inga brutna relativa sökvägar till `Design-system/` (räkna `../` nivåer i språkmappar)
- [ ] CTA `#review` finns på sidor som ska konvertera

```bash
# Snabb brutna-länk-scan (kör från repo-root)
grep -rho 'href="[^"#][^"]*"' site --include="*.html" | sort -u | head -50
```

---

## Steg 6 — Bilder & media

| Krav | Standard |
|------|----------|
| Format | WebP/JPEG för foto, SVG för logotyp/ikoner |
| Optimering | `node optimize.js` efter nya JPG/PNG |
| Alt-text | Beskrivande, inte "image" — tom alt endast för dekorativa element |
| Logotyper | Använd `Design-system/assets/logo/` — rätt variant (navy/white/currentcolor) |
| OG-bild | `assets/og-image.jpg` eller sid-specifik |
| Favicon | `favicon.svg`, `favicon.png`, `apple-touch-icon.png` i `site/` root — **känt issue: verifiera efter deploy** |

Bildsättning följer `brand-imagery` i design system: cool, navy wash, mänskliga porträtt.

---

## Steg 7 — Tillgänglighet & kvalitet

- [ ] En `<h1>` per sida
- [ ] Logiska heading-nivåer (h2 → h3, inte hoppa)
- [ ] `alt` på innehållsbilder
- [ ] Knappar/länkar har synlig fokus (design system)
- [ ] `aria-*` på dropdowns (språkväxlare, nav)
- [ ] Kontrast: navy/azure på vit/slate — följ tokens
- [ ] Mobil: testa ~375px bredd — nav och hero ska inte bryta

---

## Steg 8 — Pre-deploy checklist

- [ ] Alla 6 språk uppdaterade (eller undantag dokumenterat)
- [ ] `site/docs/foundation/architecture.md` (+ `pages/registry.md`) uppdaterat om syfte ändrats
- [ ] `site/docs/seo/keywords.md` changelog uppdaterad
- [ ] Inga brutna interna länkar
- [ ] Nya bilder optimerade
- [ ] Favicon-referenser intakta om du rört `<head>`
- [ ] Commit-meddelande: `site(sv): <vad> — <sidnamn>` eller `site(all-lang): ...`

**Deploy:** push till `main` → Netlify auto-deploy. Verifiera live URL efter ~2 min.

---

## Vad mer ingår (utöver det du nämnde)

Dessa ska också bevakas — lägg till i changelog om du rör dem:

| Område | Varför |
|--------|--------|
| **Structured data** | JSON-LD `Organization` / `NewsArticle` — konsekvens för rich results |
| **Sitemap/robots** | Nya sidor måste indexeras |
| **Lead-form / `#review`** | Integritet med värderings-CTA — rör inte formulärlogik utan test |
| **Performance** | Lazy-load tunga bilder; undvik enorma inline-SVG |
| **Analytics** | Event-namn konsekventa om tracking finns i `js/` |
| **Juridik** | Org.nr, adress, copyright år — fakta ska stämma |
| **OpCo-separation** | Blanda inte Tidvis/digiPlant-produktpitch på moderbolagssidan |
| **Översättningskvalitet** | FI/DE/NO/DA ska kännas native — inte EN med Google Translate |
| **Nyhetsdatum** | Artiklar ska ha korrekt publiceringsdatum i copy och ev. schema |
| **Rollback** | `git revert` + redeploy — notera commit-hash före större ändringar |

---

## Eskalering

| Situation | Till |
|-----------|------|
| Strategisk riktningsändring | Alexander Hübel |
| Design system / ny komponent | Pierre-Emil |
| Teknisk deploy/DNS/favicon | Pierre-Emil eller Stockholm Code |
| Copy som påverkar juridik/förvärv | Alexander + PE |

---

## Referensfiler

- `references/` — kopior av strategi/registry vid behov
- `site/Design-system/SKILL.md` — visuell design
- `optimize.js` / `make_favicon.js` — build-hjälpare i repo-root