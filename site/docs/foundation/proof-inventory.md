---
type: workflow-artifact
for: site-produktion V5 · Fas 1 → docs/foundation/proof-inventory.md
workflow: ai/workflows/site-produktion/00-master.md
updated: 2026-07-09
status: bootstrapped — utöka vid nya claims
---

# Proof-inventory — PubliX Group

**Regel:** Ingen claim på siten utan PI-post. Tier: `primary` (officiell källa) ·
`secondary` (rapporterad/marknadsbrief) · `assumption` (visa som tes, inte faktum).

## Bolag & ledning

| id | Innehåll | Källa | Tier | licenses |
|----|----------|-------|------|----------|
| PI-001 | Org.nr 559485-5487 | Bolagsverket / case | primary | Witness, Verify |
| PI-002 | Registreringsår 2024 | case / about | primary | Witness |
| PI-003 | Säte Stockholm, Kungsgatan 37 | live site / case | primary | Locate |
| PI-004 | VD Alexander Hübel | live site, nyhetsartikel | primary | Witness |
| PI-005 | Styrelseordförande Patrik Sallner | case | primary | Witness |
| PI-006 | Aspira Partners i portföljen | case, Aspira case page | secondary | Witness |
| PI-007 | Buy-and-build / accelerator — inte passiv holding | case, design readme | primary | Orient, Compare |

## Portfölj (namn — verifiera datum vid ny copy)

| id | Bolag | Domän/nisch | Källa | Tier |
|----|-------|-------------|-------|------|
| PI-010 | Tidvis | LSS/privat assistans, schemaläggning | case, companies | primary |
| PI-011 | digiPlant / SBS Manager | Fonder, stiftelser, bidrag | case | primary |
| PI-012 | Koivu Solutions / Sotender | Finsk vårdbemanning | case | primary |
| PI-013 | Aspicore / Apuraha4 | Finska bidragssystem | case | primary |
| PI-014 | Embrace Safety / EMBRACE | Kommunal brottsförebyggande | case | primary |

## Metrics (endast om sourcade — annars stryk)

| id | Innehåll | Källa | Tier | licenses |
|----|----------|-------|------|----------|
| PI-020 | Koncernomsättning ~99 MSEK 2026 | marknadsbrief v1.2 | secondary | Measure |
| PI-021 | Österbotten ~70 MSEK årlig besparing (Sotender) | marknadsbrief | secondary | Measure, Witness |
| PI-022 | Embrace: lag 2023:196 driver efterfrågan | marknadsbrief | secondary | Acquire |
| PI-023 | Embrace: finns i 76/290 kommuner | marknadsbrief | secondary | Measure |
| PI-024 | 5 founder-led companies in group (hero) | live site index | primary | Witness |

## Erbjudande / lead magnet

| id | Innehåll | Källa | Tier | licenses |
|----|----------|-------|------|----------|
| PI-030 | AI-driven bolagsvärdering som lead magnet, medvetet ofullständig → möte | case redesign | primary | Acquire, Orient |
| PI-031 | "Discover your growth potential" — CTA, confidential, no obligation | live site | primary | — |
| PI-032 | Founder-to-founder ton, inte finans-hype | design readme | primary | — |

## ASSUMPTION (inte fakta på site)

| id | Antagande | Om fel |
|----|-----------|--------|
| PI-A01 | Exakt storleksspann för ICP (TBD med Alexander) | Self-selection för bred |
| PI-A02 | Alla förvärvsdatum i news korrekta | Verifiera mot pressrelease |

## Underhåll

Ny fakta på site → ny PI-rad med källa innan publish. Ändra siffra → uppdatera källa
eller nedgradera till assumption.