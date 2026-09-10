> **OBS (2026-09-10): flera av de "bevarade buggarna" nedan är nu RÄTTADE centralt.**
> Följ inte denna fil bokstavligt för dessa punkter — de ska INTE återinföras:
> `<html lang="xx">>` och `og:url ...">>>` (extra `>`), `js/forms.js` utan rätt relativ
> sökväg, saknade `datePublished`/`dateModified` i JSON-LD, samt drift-nycklarna
> (`nav.cta_indent`, `nav.close`/`nav.dropdown_close`, `tail`, `faq.gap`,
> `ai.section_tail`, `portfolio.grid_tail`, `hero.cls`) som nu är normaliserade till
> EN-strukturen i alla språk. Filen behålls som dokumentation av vad extraktionen hittade.

# known-diffs — små sidtyper (cookie-policy, privacy-policy, 404, process)

Extraktion av de fyra små sidtyperna. `node build.js --check --page {page}` ger
`identiska` för alla 6 språk på samtliga fyra. Inget är fixat (SPEC-regel 2).

## Strukturell drift

**Ingen.** Alla språkvarianter av `cookie-policy.html`, `privacy-policy.html` och
`process.html` är rad-parallella med EN (verifierat: varje diff-hunk är ren
innehållsersättning, inga tillagda/saknade rader). De kända driftmönstren från andra
sidor förekommer INTE här:

- nav-CTA-raden har 6 mellanslags indrag i ALLA språk (ingen 18-spaces-drift);
- navens `</div>`-stängning är balanserad i alla språk (inga lösa `</div>`);
- `js/lang.js`, `js/forms.js` och `js/consent.js` har korrekta `../`-prefix i
  språkundermapparna → `{{R}}` används (till skillnad från index/companies/why-publix
  där forms.js-sökvägen är trasig och hårdkodad).

## Behållna egenheter (byte-exakta i mallarna)

- `cookie-policy` + `privacy-policy`: rad 2 `<html lang="…">>` (extra `>`) och rad 11
  `og:url …">>>` (två extra `>`) — samma som contact/index/companies.
- `404` + `process`: taggarna är RENA (`<html lang="…">` utan extra `>`; 404:s `og:url`
  utan extra `>>`) — dessa två sidor tillkom i SEO-committen och har inte buggen.
- Favicon-raderna: 2 spaces indrag i cookie/privacy/process, 0 indrag i 404 — behållet.
- `404` saknar skip-link, språkdropdown och `js`-skripts; footern är den äldre varianten
  (`footer__grid`/`footer__tagline`) som inte finns på någon annan sida.
- `process` är en meta-refresh-stub: enda skillnaderna mellan språken är `lang`-attributet
  (beräknad `{{LANG}}`), `<title>` (`meta.title`) och omdirigeringsraden
  (`redirect.pre` + `redirect.link`). Ingen hreflang, ingen og:url → inga fler beräknade
  nycklar. Content-JSON finns ändå för alla 6 språk (build.js kräver det).

## Innehållsobservationer (ligger i content-JSON, ej åtgärdade)

- Footerns Stockholmsblock (`<h4>Stockholm</h4>` + adress) är IDENTISKT i alla 6 språk på
  cookie/privacy — fi översätter INTE till »Tukholma« här (till skillnad från contact/
  companies/index) och da/no översätter inte »8tr«. Hårdkodat i mallen per regel 3.
- `meta.og_image_alt` är engelsk i alla 6 språk (samma värde, nyckel per konvention).
- Nyhetsbrevets `aria-label="Email address"` är översatt per språk → nyckel
  `footer.newsletter_aria`.
- fi översätter nav-punkten »Team« (»Tiimi«) — samma värde i nav och footer, delad nyckel
  `nav.team` fungerar.

## 404 — språkvarianterna är NYA filer

`404.html` fanns bara i EN (tillkom i commit `7264ea9`, aldrig översatt) — trots att
EN-filens hreflang-block redan pekade på `sv/404.html` … `de/404.html`. Enligt
uppdragsinstruktionen skapades översatta content-JSON för de 5 övriga språken
(vokabulär återanvänd från respektive språks befintliga sidor: nav-etiketter, CTA,
`footer.org`, `ceo_line`, index-sidans »tillväxtplattform«-fraseologi) och
`site/{sv,da,no,fi,de}/404.html` GENERERADES som nya filer av build.js — den enda
platsen i extraktionen där output tillkommit i stället för reproducerats byte-exakt.
`site/404.html` (EN) reproduceras byte-exakt. Sidan har `noindex, follow`; sitemapen
är inte rörd. Netlify serverar fortsatt rot-`404.html` som global 404 om inga
språkspecifika redirect-regler läggs till.
