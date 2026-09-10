> **OBS (2026-09-10): flera av de "bevarade buggarna" nedan är nu RÄTTADE centralt.**
> Följ inte denna fil bokstavligt för dessa punkter — de ska INTE återinföras:
> `<html lang="xx">>` och `og:url ...">>>` (extra `>`), `js/forms.js` utan rätt relativ
> sökväg, saknade `datePublished`/`dateModified` i JSON-LD, samt drift-nycklarna
> (`nav.cta_indent`, `nav.close`/`nav.dropdown_close`, `tail`, `faq.gap`,
> `ai.section_tail`, `portfolio.grid_tail`, `hero.cls`) som nu är normaliserade till
> EN-strukturen i alla språk. Filen behålls som dokumentation av vad extraktionen hittade.

# known-diffs — companies

Strukturell drift mellan språkvarianterna av `companies.html`, hanterad via content-nycklar
så att `node build.js --check --page companies` ger `identiska` för alla 6 språk.
Allt nedan är BEVARAT byte-exakt (SPEC regel 2) — inget är fixat.

## Drift som gjorts till content-nycklar (trivial, regel 4a)

- **Nav-CTA-indrag** (`site/companies.html` rad 55 vs alla översatta rad 55):
  EN indrar `<a class="btn btn--accent btn--sm">` med 6 mellanslag, sv/da/no/fi/de med 18.
  → nyckel `nav.cta_indent`.
- **Nav-stängningsdivar** (rad 68–69): EN har två rena `      </div>`-rader;
  alla översatta har `      </div></div>` + `    </div>      </div>`.
  → nyckel `nav.dropdown_close`.
- **fi: hero-klassnamn** (`site/fi/companies.html` rad 76–78): `comp-hero__eyebrow/title/sub`
  i stället för `companies-hero__…` — kvarglömd äldre markup-version.
  → nyckel `hero.cls` (`companies-hero__` överallt utom fi: `comp-hero__`).
- **fi: saknad blankrad** efter sista portfoliokortet (EN rad 212 saknas i fi, därav 345 rader).
  → nyckel `portfolio.grid_tail` (`"\n"` överallt utom fi: `""`).
- **fi: footer-rubrik** rad 305: `<h4>Tukholma</h4>` — enda språket som översätter »Stockholm«.
  → nyckel `footer.city`.
- **no: footer-adressrad** rad 306: `Kungsgatan 37, 8. etasje` — enda språket som översätter »8tr«.
  → nyckel `footer.address1`.

## Bevarade egenheter (kvar i mallen, ej nycklar)

- `<html lang="…">>` (extra `>`) och `og:url …">>>` (två extra `>`) — som i contact-mallen.
- `<script src="js/forms.js"></script>` (sista raden före `</body>`) saknar `../`-prefix i ALLA
  språkvarianter → trasig sökväg i sv/da/no/fi/de (pekar på t.ex. `sv/js/forms.js`).
  Hårdkodad utan `{{R}}` i mallen.
- Grundar-avatarer blandar relativa och absoluta paths: digiPlant (`/img/team-alexander-tornqvist.jpg`)
  och Koivu (`/img/team-janne-salmi.png`) är absoluta; Tidvis/Aspicore/Embrace är relativa
  (`{{R}}img/…` i kortens `avatar`-fält).

## Innehållsdrift (noteras, ligger i respektive språks JSON)

- **fi: hero-texten är inte en översättning av EN-texten** — helt annat budskap
  (»Salkkumme / Yritykset alustan takana …«), sannolikt äldre copy-version.
- **da: Aspicore-rollen** är »Stifter« (grundare) där alla andra språk har »CEO«.
- **Fika-bildens alt-text** är översatt i da och no men engelsk i sv/fi/de → nyckel `timeline.fika_alt`.
- **no: footer ceo_line** »administrerende direktør«, sv »vd«, övriga »CEO« — normal översättning,
  men noteras eftersom titeln varierar i form.
