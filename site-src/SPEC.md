# site-src — källformat för flerspråkbygget

`site/` är numera GENERERAD för alla HTML-sidor (EN i root + sv/da/no/fi/de).
Källan är `site-src/`. Bygg med `node build.js`, verifiera med `node build.js --check`.

## Struktur

```
site-src/
  templates/{page}.html        en mall per sidtyp (news-article.html för pressreleaser)
  content/{lang}/{page}.json   översatta strängar per språk (en, sv, da, no, fi, de)
  news/{slug}/{lang}.json      pressreleaser (renderas med templates/news-article.html)
  known-diffs.md               accepterade avvikelser mot gamla handskrivna filer
```

## Mallkonventioner

- `{{nyckel.subnyckel}}` slås upp i sidans content-JSON. Värden är RÅ HTML
  (får innehålla taggar och entiteter; `&lt;`-escapade attributvärden behålls exakt som i källan).
- Beräknade nycklar (versaler, tillhandahålls av build.js — definiera ALDRIG i JSON):
  - `{{LANG}}` språkkod · `{{R}}` relativt prefix till site-root (`''`/`../`/`../../`)
  - `{{PAGE_URL}}` absolut URL för aktuell variant · `{{HREFLANG_BLOCK}}` hela hreflang-blocket inkl. x-default
  - `{{LANG_BTN}}` t.ex. `🇬🇧 EN` · `{{LANG_MENU}}` dropdownens `<a>`-rader (12 spaces indrag)
- Loopar: `{{#each lista}} … {{.fält}} … {{/each}}` där `lista` är en JSON-array av objekt.
- Länkar till systersidor (`index.html`, `about.html`, …) är språkrelativa och skrivs UTAN prefix.
  Tillgångar (`css/`, `js/`, `img/`, `Design-system/`, `assets/`) prefixas med `{{R}}`.
  Absoluta paths (`/favicon.svg`, `/img/team-…`) och absoluta URL:ar lämnas som de är.

## Status: extraktionen är KLAR (2026-09-10)

Alla sidtyper är extraherade och `node build.js --check` ger full paritet. Reglerna nedan
gällde under extraktionen. **Regel 2 (bevara buggar) gäller inte längre** — buggarna är
rättade centralt i mallarna: `">>`-artefakterna, `js/forms.js`-sökvägen, saknade JSON-LD-datum
och drift-nycklarna är borta. Vid fortsatt arbete: ändra i mallen (slår igenom i alla språk)
eller i innehålls-JSON per språk, och kör `node build.js`.

## Extraktionsregler (gällde under migreringen)

1. **Byte-parity är kravet.** `node build.js --check --page {page}` ska ge `identiska` för alla 6 språk.
   Ledande BOM i gamla filer ignoreras av checken (bygget skriver utan BOM).
2. **Fixa INGA buggar** under extraktionen — befintliga egenheter (t.ex. `">>"` efter `<html lang=…>`,
   trasiga sökvägar) behålls exakt. Buggfixar görs efteråt, centralt i mallen.
3. Parametrisera all läsbar text (även meta/og/JSON-LD-strängar, placeholders, aria-texter om översatta).
   Namn, telefonnummer, e-postadresser, org-nummer och adresser som är identiska i alla språk
   får ligga kvar hårdkodade i mallen.
4. Om språkvarianterna skiljer sig STRUKTURELLT (olika attribut, extra/saknad rad):
   - trivial skillnad → gör den till en content-nyckel;
   - äkta drift (saknad sektion, kvarglömd oöversatt text) → använd EN-strukturen,
     dokumentera avvikelsen med en rad i `site-src/known-diffs.md` (fil + rad + vad).
5. Återanvänd nyckelnamnen från exemplaret `content/en/contact.json` för gemensamma block
   (`meta.*`, `nav.*`, `footer.*`, `cta.*`) så att block kan flyttas till partials senare.
6. JSON: UTF-8 utan BOM, 2 spaces indrag, avslutande radbrytning.

## Arbetsgång

1. Läs `site/{page}.html` (EN) och skapa `templates/{page}.html` + `content/en/{page}.json`.
2. Kör `node build.js --check --page {page}` tills EN är `identiska`.
3. Extrahera övriga språk från `site/{lang}/{page}.html` till `content/{lang}/{page}.json`.
4. Kör checken igen tills alla 6 är `identiska` (eller avvikelse dokumenterad).
