> **OBS (2026-09-10): flera av de "bevarade buggarna" nedan är nu RÄTTADE centralt.**
> Följ inte denna fil bokstavligt för dessa punkter — de ska INTE återinföras:
> `<html lang="xx">>` och `og:url ...">>>` (extra `>`), `js/forms.js` utan rätt relativ
> sökväg, saknade `datePublished`/`dateModified` i JSON-LD, samt drift-nycklarna
> (`nav.cta_indent`, `nav.close`/`nav.dropdown_close`, `tail`, `faq.gap`,
> `ai.section_tail`, `portfolio.grid_tail`, `hero.cls`) som nu är normaliserade till
> EN-strukturen i alla språk. Filen behålls som dokumentation av vad extraktionen hittade.

# known-diffs — team

Strukturell drift mellan språkvarianterna av `team.html`, hanterad via content-nycklar
så att `node build.js --check --page team` ger `identiska` för alla 6 språk.
Allt nedan är BEVARAT byte-exakt (SPEC regel 2) — inget är fixat.

## Drift som gjorts till content-nycklar (trivial, regel 4a)

- **Nav-CTA-indrag** (`site/team.html` rad 57 vs alla översatta rad 57):
  EN indrar `<a class="btn btn--accent btn--sm">` med 6 mellanslag, sv/da/no/fi/de med 18.
  → nyckel `nav.cta_indent` (samma mönster som companies/contact).
- **Nav-stängningsdivar** (rad 70–71): EN har två rena `      </div>`-rader;
  alla översatta har `      </div></div>` + `    </div>      </div>` (obalanserad markup).
  → nyckel `nav.dropdown_close` (samma mönster som companies).
- **fi: portfoliokortens ordning** (`site/fi/team.html` rad 270–287): korten i
  »Careers at our companies« kommer i ordningen Tidvis, digiPlant, **Koivu Solutions,
  Embrace Safety, Aspicore** — EN och övriga har Tidvis, digiPlant, Aspicore,
  Koivu Solutions, Embrace Safety. Absorberas som data i `pc.cards`-arrayen ({{#each}}).
- **fi: Koivu-länk** (rad 274): `https://koivusolutions.com` i stället för
  `https://sotender.fi` som alla andra språk har. Ligger i kortets `href`-fält.
- **fi: footer-rubrik** rad 326: `<h4>Tukholma</h4>` — enda språket som översätter
  »Stockholm«. → nyckel `footer.city`.
- **da/no: footer-adressrad** rad 327: da `Kungsgatan 37, 8. sal`,
  no `Kungsgatan 37, 8. etasje` — översätter »8tr« (EN/sv/fi/de: `Kungsgatan 37, 8tr`).
  → nyckel `footer.address1`.

## Bevarade egenheter (kvar i mallen, ej nycklar)

- `<html lang="…">>` (extra `>`) och `og:url …">>>` (två extra `>`) — som i contact-mallen.
- Blankrader i `<head>` före favicon-blocket och före `<script src=…consent.js>` (rad 33/37).
- `<script src="js/forms.js"></script>` (sista raden före `</body>`) saknar `../`-prefix i ALLA
  språkvarianter → trasig sökväg i sv/da/no/fi/de (pekar på t.ex. `sv/js/forms.js`).
  Hårdkodad utan `{{R}}` i mallen. (`js/lang.js` är däremot korrekt `{{R}}`-prefixad.)
- Teamfoton blandar relativa och absoluta paths per person (t.ex. `/img/team-alexander-hubel.jpg`
  absolut men `img/team-marcus-astrom.webp` relativ) — konsekvent i alla språk;
  ligger i medlemmarnas `photo`-fält (`{{R}}img/…` för de relativa).
- Länktexten »LinkedIn« är oöversatt i alla språk → hårdkodad i mallen.

## Innehållsdrift (noteras, ligger i respektive språks JSON)

- **fi: sidtitel** `Tiimi ja urat — PubliX Group` (»Team och karriärer«) — inte en direkt
  översättning av EN:s »Our Team — PubliX Group«.
