# PubliX Group — Webbplatsens strategiska mål

**Domän:** https://publixgroup.io  
**Senast uppdaterad:** 2026-07-09

> **Kanonisk dokumentation:** `site/docs/foundation/` (JTBD, arkitektur, evidens, trafik).
> Denna fil är en kort sammanfattning. Agenter ska läsa foundation först.
> Underhåll: `ai/workflows/site-produktion/08-maintenance.md` · skill: `.grok/skills/publix-site-edit/`

## Vad den här siten ÄR

Moderbolagets **M&A- och rekryteringssite** — inte en slutkunds-site för Tidvis, digiPlant, Sotender m.fl.

| Mål | Beskrivning |
|-----|-------------|
| **Primärt** | Attrahera rätt **founders** av vertikal SaaS inom offentlig sektor (Norden) till förvärv/partnerskap |
| **Sekundärt** | Rekrytera ledning och signalera trovärdighet mot investerare (Aspira) |
| **Lead magnet** | "Discover your growth potential" — AI-driven bolagsvärdering som öppnar dialog (medvetet ofullständig → möte) |

## Vad den här siten INTE ÄR

- Inte marknadsföring av OpCo-produkter till slutkunder (det sker i dotterbolagen)
- Inte "growth hacking" eller flashig Silicon Valley-estetik
- Inte generisk holding-company-site utan self-selection för rätt persona

## Målgrupp (self-selection)

**Ägare/VD** av vertikal B2B SaaS mot offentlig sektor — kommuner, vård, skola, stiftelser, NGO. Norden (SE/FI primärt). De ska känna: *"det här är för mig"* och ta steget till värderings-CTA.

## Tre strategiska pelare (varje sida ska stödja minst en)

1. **Lead magnet** — värderings-CTA, reversed due diligence, mötesbokning
2. **Persona & self-selection** — tydlig målgrupp, rätt ton (institutionell GovTech, inte hype)
3. **USP** — delade kunder, AI-kompetens, skalning, bibehållet oberoende efter förvärv

## Beslutsgate — innan du ändrar

Fråga alltid:

1. **Vilken pelare stödjer ändringen?** Om ingen → stopp, diskutera med Alexander/PE.
2. **Drar ändringen fel persona?** (t.ex. slutkund, konsument, fel bransch)
3. **Försvagar ändringen CTA-flödet?** (färre vägar till `#review` / kontakt)
4. **Är påståendet sant och sourcat?** Uppfinn aldrig metrics.

## Röst & ton (obligatorisk)

Se `site/Design-system/readme.md` — CONTENT FUNDAMENTALS. Kort: **we/you**, sentence case, EU/British English på EN, ingen emoji i corporate copy, navy+institutionell ton.

## Språk

| Kod | Mapp | Roll |
|-----|------|------|
| `en` | `site/` (root) | **Kanonisk källa** för struktur och nya sidor |
| `sv` | `site/sv/` | Svenska |
| `da` | `site/da/` | Danska |
| `no` | `site/no/` | Norska |
| `fi` | `site/fi/` | Finska |
| `de` | `site/de/` | Tyska |

**Regel:** Ingen ändring är klar förrän alla sex språk är uppdaterade (eller uttryckligen undantagna i changelog med motivering).