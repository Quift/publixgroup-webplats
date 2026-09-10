> **OBS (2026-09-10): flera av de "bevarade buggarna" nedan är nu RÄTTADE centralt.**
> Följ inte denna fil bokstavligt för dessa punkter — de ska INTE återinföras:
> `<html lang="xx">>` och `og:url ...">>>` (extra `>`), `js/forms.js` utan rätt relativ
> sökväg, saknade `datePublished`/`dateModified` i JSON-LD, samt drift-nycklarna
> (`nav.cta_indent`, `nav.close`/`nav.dropdown_close`, `tail`, `faq.gap`,
> `ai.section_tail`, `portfolio.grid_tail`, `hero.cls`) som nu är normaliserade till
> EN-strukturen i alla språk. Filen behålls som dokumentation av vad extraktionen hittade.

# known-diffs — index (startsidan)

Strukturella skillnader mellan språkvarianterna som upptäcktes vid extraktionen.
Alla hanterades som content-nycklar (triviala skillnader per SPEC regel 4) så att
`node build.js --check --page index` ger `identiska` för alla 6 språk. Inget är fixat i output.

## Skillnader EN vs övriga (sv/da/no/fi/de)

- `site/index.html` rad 6 — `<meta name="google-site-verification" …>` finns BARA i EN.
  → nyckel `meta.site_verification` (hel rad + radbrytning i EN, tom sträng i övriga).
- `site/index.html` rad 44 — JSON-LD-raden `"description": "Growth platform for founders …",`
  finns BARA i EN. → nyckel `meta.jsonld_description` (tom i övriga).
- rad 89 (EN) / rad 87 (övriga) — nav-CTA: EN har 6 spaces indrag + `href="#review"`;
  övriga har 18 spaces indrag + `href="index.html#review"`.
  → nycklar `nav.cta_indent` och `review_href` (samma href-skillnad även i hero-CTA rad 116/114
  och bottom-CTA rad 616/614; footerns "Growth assessment"-länk är `index.html#review` i ALLA språk).
- rad 101–103 (EN) / rad 99–101 (övriga) — nav-avslutande `</div>`-struktur skiljer:
  EN stänger med 3 divar (`</div>` × 3 på egna rader); övriga har 5 divar i trasigt mönster
  (`</div></div>` + `</div>      </div>` — en div FÖR MYCKET, kvarlämnad bugg).
  → nyckel `nav.close` (buggen bevaras exakt i output).

## Övriga per-språk-avvikelser

- `site/da/index.html` rad 642 — footer-adressen är översatt: `Kungsgatan 37, 8. sal`
  (no: `8. etasje`; en/sv/fi/de: `8tr`). → nyckel `footer.address1`.
- `site/fi/index.html` rad 641 — footer-rubriken `<h4>` är översatt: `Tukholma`
  (alla andra: `Stockholm`). → nyckel `footer.stockholm`.
- `site/no/index.html` — Aspicore-rollen skrivs OLIKA i team-sektionen
  (`Medgründer &amp; administrerende direktør, Aspicore`, rad ~462) och i testimonial-sektionen
  (`Medgrunnlegger &amp; CEO, Aspicore`, rad ~587). Därför har testimonial-rollerna egna nycklar
  (`testi.t1_role`–`t3_role`) i stället för att dela `team.role_*`.
- `site/fi/index.html` — stats-siffran `SEK 90M+` är lokaliserad: `Yli 90 milj. SEK`.
  → även siffrorna är nycklar (`stats.n1`–`n5`).

## Gemensamma egenheter (behållna i mallen, INTE per-språk)

- `<html lang="…">>` — extra `>` efter html-taggen (alla språk).
- `<meta property="og:url" …>>>` — extra `>>` (alla språk).
- `<script src="js/forms.js"></script>` — sökvägen saknar `../` i sv/da/no/fi/de
  (trasig relativ sökväg i undermapparna). Hårdkodad UTAN `{{R}}` i mallen så att
  buggen reproduceras byte-exakt i alla språk.
- Tom `<script>\n</script>` sist i body (alla språk).
- `aria-label="Previous"` / `aria-label="Next"` är oöversatta (engelska) i alla språk — hårdkodade.
- `og:image:alt` är engelsk i alla språk (nyckel `meta.og_image_alt`, samma värde överallt).
