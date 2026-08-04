# SEO & nyckelord — underhållsregister

Uppdatera denna fil **varje gång** title, description, H1 eller primärt budskap ändras på en sida.

**Språk:** EN = kanonisk. Övriga språk ska behålla samma intent, lokalt anpassade nyckelord.

## Primära nyckelordskluster (grupp)

| Kluster | Intent | Exempeltermer (EN) |
|---------|--------|-------------------|
| GovTech M&A | Förvärv av SaaS-bolag offentlig sektor | public sector SaaS acquisition, Nordic GovTech |
| Founder partnership | Founder som söker skalning | SaaS founder growth platform, scale public services software |
| Vertical SaaS Norden | Geografi + nisch | Nordic vertical SaaS, Sweden Finland public services |
| Buy-and-build | Investerarkategori | buy and build platform, accelerator not holding company |

## Per sida (kärnsidor — EN)

| Sida | Primary keyword | Secondary | Title (max ~60 tecken) | Meta description (max ~155) |
|------|-----------------|-----------|------------------------|----------------------------|
| `index.html` | public sector SaaS founders | Nordic growth platform | *(se live HTML)* | *(se live HTML)* |
| `why-publix.html` | why partner PubliX | founder barriers scaling | *(se live HTML)* | *(se live HTML)* |
| `about.html` | PubliX Group about | GovTech accelerator | *(se live HTML)* | *(se live HTML)* |
| `process.html` | SaaS acquisition process | founder-friendly M&A | *(se live HTML)* | *(se live HTML)* |
| `companies.html` | PubliX portfolio companies | Tidvis digiPlant Sotender | *(se live HTML)* | *(se live HTML)* |
| `contact.html` | contact PubliX Group | founder inquiry | *(se live HTML)* | *(se live HTML)* |

> **Agent:** Vid ändring — uppdatera tabellen ovan OCH alla språkversioners `<title>`, `meta description`, `og:*`, `twitter:*`.

## Teknisk SEO (obligatorisk vid varje deploy)

- [ ] `lang` attribut på `<html>` matchar mapp (`en`, `sv`, …)
- [ ] `og:url` pekar på korrekt språk-URL (idag ofta samma — verifiera avsikt)
- [ ] `canonical` + `hreflang` — lägg till om saknas vid större SEO-pass
- [ ] Interna länkar använder relativa sökvägar konsekvent inom språk
- [ ] Bilder: beskrivande `alt`, optimerade (`node optimize.js`)
- [ ] H1 unik per sida; en H1 per sida
- [ ] Inga brutna `#review`-ankare

## Changelog

| Datum | Sida | Ändring | Av |
|-------|------|---------|-----|
| 2026-07-09 | — | Register skapat | PE |
| 2026-07-09 | site/ | robots.txt, sitemap.xml (84 URL), llms.txt tillagt | PE |
| 2026-08-04 | all-lang | Analytics-plattform swap: Plausible → Google Analytics 4 (G-F39X0LXQTH) med samtyckesgate. `cookie-policy.html` + `privacy-policy.html` (6 språk) uppdaterade — GA4-cookies (`_ga`, `_ga_F39X0LXQTH`), Google Ireland Ltd + Google LLC (EU-US DPF) som sub-processor. Ny `js/consent.js` äger bannern och GA-loadern; Plausible-taggen borttagen från alla 102 sidor. Meta description på legal-sidor uppdaterad. | Noak |