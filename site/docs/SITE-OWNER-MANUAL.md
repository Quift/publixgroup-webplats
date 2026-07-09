# Site Owner Manual — PubliX Group / publixgroup.io

| | |
|---|---|
| **Domän** | https://publixgroup.io |
| **Repo** | https://github.com/Quift/publixgroup-webplats |
| **Live efter** | Push till `main` → Netlify (~2 min) |
| **Din agent-skill** | `/publix-site-edit` |
| **Senast uppdaterad** | 2026-07-09 |
| **Site owner** | PubliX Group intern (marknad/VD-kontext under Alexander Hübel) |

Du äger innehåll och riktning. Du behöver inte kunna koda.

**Paket:** denna manual · `OWNER-FAQ.md` · `.claude/skills/publix-site-edit/` · `docs/foundation/`

---

## 0. Start på 5 minuter

1. Klona repot, öppna i Cursor eller Grok
2. `/publix-site-edit` — beskriv en liten ändring
3. Agenten ändrar, uppdaterar 6 språk vid behov, deployar efter godkännande
4. Kolla publixgroup.io

**Första övning (M1):** Fixa favicon (känt live-issue — bra test av hela kedjan).

Fastnat? → `OWNER-FAQ.md`

---

## 1. Vad din webbplats gör (och inte gör)

**Gör:** Attraherar **founders/VD:ar** av nordisk vertikal SaaS mot offentlig sektor till dialog om förvärv/partnerskap — med lågfriktions-CTA "Discover your growth potential".

**Gör inte:** Sälja Tidvis, digiPlant, Sotender eller annan OpCo-produkt till slutkunder. Det är dotterbolagens egna sites.

---

## 2. Hur du arbetar med din kodagent

Beskriv målet → `/publix-site-edit` → agenten sätter tier (M1–U1) → M1–M2 körs, M3+ stoppar → deploy.

Agenten läser: `OWNER-FAQ.md`, `docs/foundation/`, design system.

---

## 3. Röda linjer

| Gör inte | Varför |
|----------|--------|
| Rikta mot slutkunder / produktkatalog | Fel persona — bryter jtbd |
| Ny sida i huvudmenyn utan godkännande | M3 — ny strategisk nod |
| Ta bort `#review` / värderings-CTA | Huvudkonvertering |
| Påhittade metrics eller förvärvsdatum | Kräver PI-post i proof-inventory |
| Hype / Silicon Valley-ton | Fel varumärke (GovTech institutionell) |

---

## 4. Grönt ljus

| Du vill… | Tier |
|----------|------|
| Typo, favicon, liten CSS | M1 |
| Nyhetsartikel, sektionscopy, SEO-titel | M2 |
| Ny pressrelease i `news/` | M2 (med källa) |

**Språk:** Skriv på EN eller SV — agenten uppdaterar EN + SV, DA, NO, FI, DE.

---

## 5. Sanning (kärnfakta)

- PubliX Group AB, org.nr 559485-5487, Stockholm
- Buy-and-build accelerator för GovTech-SaaS — inte passiv holding
- Portfölj: Tidvis, digiPlant, Sotender/Koivu, Aspicore, Embrace Safety m.fl.
- Lead magnet: AI-värdering → möte (medvetet ofullständig rapport)
- Nya fakta → agenten kollar `proof-inventory.md` först

---

## 6. Eskalering

| Situation | Till |
|-----------|------|
| M3 (ny nav, CTA-strategi) | Alexander Hübel + Pierre-Emil |
| Design / ny komponent | Pierre-Emil |
| DNS, Netlify, favicon live | PE eller Stockholm Code |
| Juridik, förvärvsfakta | Alexander Hübel |

**Leverans/byggare:** Pierre-Emil Chantereau (Konsult)

---

## 7. Ord du kan ignorera

Repo = GitHub-mappen. Deploy = push main. Tier = ändringens storlek. Foundation = strategifiler för agenten.

---

## 8. Referens

| Fil | Du | Agent |
|-----|-----|-------|
| `OWNER-FAQ.md` | ✓ | ✓ lookup |
| `.claude/skills/publix-site-edit/SKILL.md` | vet finns | ✓ |
| `docs/foundation/` | sällan | ✓ |

---

## 9. Changelog

| Datum | Händelse | Smoke test |
|-------|----------|------------|
| 2026-07-09 | Fas 9 handoff (v2 entreprenörsmodell) | — |
| 2026-07-09 | Favicon M1: PNG regenererade, push a2b5fea | Verifiera i flik efter deploy |
| 2026-07-09 | SEO: robots.txt, sitemap.xml, llms.txt | — |