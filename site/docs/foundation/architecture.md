---
type: workflow-artifact
for: site-produktion V5 · Fas 4 (arkitektur)
workflow: ai/workflows/site-produktion/00-master.md
updated: 2026-07-09
status: bootstrapped — operationssekvenser förenklade (statisk HTML-site)
inputs: traffic-thesis.md, jtbd.md
supersedes: site/docs/pages/registry.md (behåll som läsbar sammanfattning)
---

# Fas 4 — Arkitektur: publixgroup.io

Flerspråk: samma nod-struktur i `site/`, `site/sv/`, `site/da/`, `site/no/`, `site/fi/`, `site/de/`.

## Sitemap

```
/                index         — self-selection + hero           [ENTRÉ]
/why-publix      why-publix    — barriers → solutions            [ENTRÉ]
/process         process       — acquisition process             [destination]
/about           about         — trust, mission, Aspira          [destination]
/companies       companies     — portfolio proof                 [destination]
/career          career        — recruitment                     [destination]
/news            news          — momentum archive                [destination]
/news/<slug>     article       — acquisition/leadership news     [destination]
/contact         contact       — low-friction contact            [destination · footer CTA]
```

Delade komponenter: **nav**, **footer**, **#review** lead block (index), **lang-dropdown**.

## Sitemap-noder

### `/` index — **Self-selection** [entré]
- **purpose:** Founder känner igen sig och ser portföljbevis; tar steget till värdering.
- **traffic:** outbound, organisk, referral (primär kanal).
- **conversion_goal:** Klick/submit på `#review` — "Discover your growth potential".
- **dimensional_mandate:** DO-1, DO-4 (STAT, PROG).
- **restrictions:** Inte produktkatalog; inte slutkundspitch; inga påhittade metrics.
- **operation_sequence (förenklad):** `Acquire → Orient → Witness → (CTA)`

### `/why-publix` — **Compare/Orient** [entré]
- **purpose:** Barriärer → hur PubliX löser dem (founder-to-founder).
- **traffic:** outbound, intern nav från skeptiker.
- **conversion_goal:** Navigera till `#review` eller contact.
- **dimensional_mandate:** DO-2 (CMPR).
- **restrictions:** Inget hype-språk; inga garantier om värdering.

### `/process` — **Orient** [destination]
- **purpose:** Demystifiera förvärvsprocessen.
- **traffic:** utvärderingsintent, "hur funkar det?".
- **conversion_goal:** `#review` efter förståelse.
- **dimensional_mandate:** DO-2, DO-4.
- **restrictions:** Ej juridisk rådgivning.

### `/about` — **Witness** [destination]
- **purpose:** Trovärdighet, mission, ledning, Aspira-koppling.
- **traffic:** referral, media, due diligence.
- **conversion_goal:** contact / career (sekundärt).
- **restrictions:** Felaktiga bolagsfakta; OpCo-produktpitch.

### `/companies` — **Witness** [destination]
- **purpose:** Portfölj som bevis på buy-and-build.
- **traffic:** utvärdering, nyhetsuppföljning.
- **conversion_goal:** Utforska → news/contact.
- **restrictions:** Sälja OpCo-produkter; fel förvärvsdatum.

### `/career` — **Acquire** [destination]
- **purpose:** Rekrytera senior talang till koncernen.
- **traffic:** rekrytering, LinkedIn.
- **conversion_goal:** Ansökan / contact.
- **restrictions:** Generiska startup-jobb utan GovTech-kontext.

### `/news` + `/news/<slug>` — **Witness** [destination]
- **purpose:** Momentum, förvärv, ledarskap — trovärdighet över tid.
- **traffic:** media, SEO, intern utforskning.
- **conversion_goal:** Implicit trust → companies/contact.
- **restrictions:** Fabricerade citat; clickbait utan affärskoppling.

### `/contact` — **Close** [destination]
- **purpose:** Låg friktion — founders, partners, media.
- **traffic:** nav, footer, direktlänk.
- **conversion_goal:** Formulär skickat / mail klickat.
- **restrictions:** Dölja kontaktvägar; fel adresser.

## Ny sida — procedur

1. Lägg till nod här (purpose, conversion_goal, restrictions)
2. Fas 8 M3 eller partiell V5 om i nav
3. `seo/keywords.md` + alla språk
4. Uppdatera `proof-inventory` om nya fakta