> **OBS (2026-09-10): flera av de "bevarade buggarna" nedan är nu RÄTTADE centralt.**
> Följ inte denna fil bokstavligt för dessa punkter — de ska INTE återinföras:
> `<html lang="xx">>` och `og:url ...">>>` (extra `>`), `js/forms.js` utan rätt relativ
> sökväg, saknade `datePublished`/`dateModified` i JSON-LD, samt drift-nycklarna
> (`nav.cta_indent`, `nav.close`/`nav.dropdown_close`, `tail`, `faq.gap`,
> `ai.section_tail`, `portfolio.grid_tail`, `hero.cls`) som nu är normaliserade till
> EN-strukturen i alla språk. Filen behålls som dokumentation av vad extraktionen hittade.

# known-diffs — why-publix

Strukturell drift mellan språkvarianterna, bryggad med content-nycklar så att
`node build.js --check --page why-publix` ger `identiska` för alla 6 språk.
Inget är fixat (SPEC-regel 2) — allt nedan återges byte-exakt.

## Bryggad drift (trivial skillnad → content-nyckel)

- `site/{sv,da,no,fi,de}/why-publix.html` rad 61: nav-CTA-länken har 18 spaces indrag
  (EN rad 61 har 6) → nyckel `nav.cta_indent`.
- `site/{sv,da,no,fi,de}/why-publix.html` rad 74–75: navens stängningsblock är
  `      </div></div>` + `    </div>      </div>` — två överflödiga `</div>` jämfört
  med EN:s `      </div>` + `      </div>` → nyckel `nav.close` (flerradig).
- `site/{sv,da,no,fi,de}/why-publix.html` rad 375–376: extra tom rad före fjärde
  FAQ-item (EN har en tom rad, översättningarna två) → nyckel `faq.gap` (`""` för en, `"\n"` för övriga).
- `site/sv/why-publix.html` rad 452: nyhetsbrevs-`<p>` har `margin: 0 0 12px;` medan
  EN/da/no/fi/de har `14px` → nyckel `footer.updated_margin`.

## Behållna egenheter (byte-exakta i mallen)

- Rad 2 `<html lang="…">>` och rad 11 `og:url …">>>` — extra `>` behållna (samma som contact).
- Sista scriptet `<script src="js/forms.js"></script>` saknar `../`-prefix i ALLA
  språkvarianter (rad 496/497) — trasig sökväg i sv/da/no/fi/de behållen (hårdkodad utan `{{R}}`,
  medan `lang.js` använder `{{R}}`).
- Blandade bildsökvägar behållna: `/img/team-alexander-tornqvist.jpg`, `/img/team-janne-salmi.png`,
  `/img/team-alexander-hubel.jpg`, `/img/team-patrick-zeits.jpg` absoluta; `{{R}}img/team-harri-tanner.jpg`
  och `{{R}}img/team-marcus-astrom.webp` relativa.

## Innehållsdrift (noterad, ej åtgärdad — ligger i content-JSON)

- Illustrations-alt-texter (pillars + processteg) är översatta i da/no men kvar på engelska
  i sv/fi/de → nycklar `pillars.p*_alt`, `process.s*_alt`.
- `meta.og_image_alt` är engelsk i alla 6 språk.
- fi rad 403: CTO-rollen översatt ("teknologiajohtaja, PubliX Group"), övriga språk "CTO, PubliX Group"
  → nyckel `quote.role`.
- da/no rad 444: kontorsadressen översatt ("Kungsgatan 37, 8. sal" / "8. etasje"), fi rad 443:
  "Stockholm"-rubriken översatt ("Tukholma") → nycklar `footer.address1`, `footer.office_city`.
- Testimonial 2 och 3 (Harri Tanner, Janne Salmi) berättar delvis olika historier i EN jämfört
  med översättningarna (t.ex. nämner sv "Sotender", EN inte) — innehållsdivergens, ingen strukturfråga.
