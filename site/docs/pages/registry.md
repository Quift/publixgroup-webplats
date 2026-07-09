# Sidregister — syfte per sida

> **Superseded av** `site/docs/foundation/architecture.md` (V5-format med conversion_goal).
> Denna fil behålls som snabb läsbar tabell. Uppdatera **båda** vid sidändringar.

Varje sida har ett **strategiskt syfte** kopplat till `site/docs/site-strategy.md`.

**Fält:** Syfte · Pelare (1/2/3) · Primär CTA · Får inte göras · Senast granskad

---

## Kärnsidor

| Sida (EN path) | Syfte | Pelare | Primär CTA | Får inte göras |
|----------------|-------|--------|------------|----------------|
| `index.html` | Self-selection + hero narrative för founders; social proof (portfölj) | 2, 3 | `#review` — Discover growth potential | Göra om till produktkatalog; ta bort portföljloggor utan ersättare |
| `why-publix.html` | Förklara varför founders väljer PubliX (barriärer → lösningar) | 2, 3 | Länk till `#review` / contact | Hype-språk; löften utan substans |
| `about.html` | Trovärdighet, mission, team-närvaro, Aspira-koppling | 3 | Contact / career | Felaktiga bolagsfakta; blanda OpCo-produktpitch |
| `process.html` | Demystifiera förvärvsprocessen (founder-to-founder) | 1, 2 | `#review` | Juridisk rådgivning; garantier om värdering |
| `companies.html` | Portföljöversikt — bevis på buy-and-build | 3 | Utforska bolag → news/contact | Sälja OpCo-produkter direkt; felaktiga förvärvsdatum |
| `career.html` | Rekrytering ledning/expertis till gruppen | sekundärt mål | Ansökan / contact | Generiska startup-jobb utan GovTech-kontext |
| `news.html` | Nyhetsarkiv — momentum, förvärv, ledarskap | 3 | Läs artikel → implicit trovärdighet | Clickbait; nyheter utan affärskoppling |
| `contact.html` | Låg friktion kontakt för founders/partners/media | 1 | Formulär / mail | Dölja kontaktvägar; felaktiga adresser |

## Nyhetsartiklar (mall)

| Mönster | Syfte | Pelare | Primär CTA | Får inte göras |
|---------|-------|--------|------------|----------------|
| `news/<slug>.html` | Dokumentera förvärv, ledarskap, portföljnyhet | 3 | Tillbaka till companies/news | Fabricera citat; fel bolagsnamn; bryta artikel-layout |

**Befintliga slugs:** `tidvis`, `digiplant`, `koivu-solutions-sotender`, `aspicore`, `embrace-safety`, `publix-group-appoints-alexander-hubel-as-ceo`

## Ny sida — checklista innan skapande

1. Motivera syfte i denna tabell (PR-godkännande om strategisk ändring)
2. Skapa EN först → propagera 5 språk
3. Lägg till i `site/docs/seo/keywords.md`
4. Uppdatera nav i alla språk om sidan ska synas i menyn
5. Uppdatera sitemap (om/when den finns)