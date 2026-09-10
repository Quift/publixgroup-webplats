> **OBS (2026-09-10): flera av de "bevarade buggarna" nedan är nu RÄTTADE centralt.**
> Följ inte denna fil bokstavligt för dessa punkter — de ska INTE återinföras:
> `<html lang="xx">>` och `og:url ...">>>` (extra `>`), `js/forms.js` utan rätt relativ
> sökväg, saknade `datePublished`/`dateModified` i JSON-LD, samt drift-nycklarna
> (`nav.cta_indent`, `nav.close`/`nav.dropdown_close`, `tail`, `faq.gap`,
> `ai.section_tail`, `portfolio.grid_tail`, `hero.cls`) som nu är normaliserade till
> EN-strukturen i alla språk. Filen behålls som dokumentation av vad extraktionen hittade.

# known-diffs — news

Strukturell drift mellan språkvarianterna av `news.html` (nyhetslistan), hanterad via
content-nycklar så att `node build.js --check --page news` ger `identiska` för alla 6 språk.
Allt nedan är BEVARAT byte-exakt (SPEC regel 2) — inget är fixat.

## Drift som gjorts till content-nycklar (trivial, regel 4a)

- **Nav-CTA-indrag** (`site/news.html` rad 55 vs alla översatta rad 55):
  EN indrar `<a class="btn btn--accent btn--sm">` med 6 mellanslag, sv/da/no/fi/de med 18.
  → nyckel `nav.cta_indent` (samma mönster som companies).
- **Nav-stängningsdivar** (rad 68–69): EN har två rena `      </div>`-rader;
  alla översatta har `      </div></div>` + `    </div>      </div>`.
  → nyckel `nav.dropdown_close` (samma mönster som companies).
- **Filslut**: EN slutar `</html>\n\n` (extra tom rad, 306 rader); alla översatta slutar
  `</html>\n` (305 rader). → nyckel `tail` (`"\n"` i en, `""` i övriga).
- **fi: footer-rubrik** rad 245: `<h4>Tukholma</h4>` — enda språket som översätter »Stockholm«.
  → nyckel `footer.city`.
- **da/no: footer-adressrad** rad 246: da »Kungsgatan 37, 8. sal«, no »Kungsgatan 37, 8. etasje«
  — enda språken som översätter »8tr« (en/sv/fi/de har »Kungsgatan 37, 8tr«).
  → nyckel `footer.address1`.

## Bevarade egenheter (kvar i mallen, ej nycklar)

- `<html lang="…">>` (extra `>`) och `og:url …">>>` (två extra `>`) — som i contact-mallen.
- Tom rad mellan apple-touch-icon-länken och consent-scriptet i `<head>` (rad 35) — finns
  i alla 6 varianter, hårdkodad i mallen.
- `<script src="js/forms.js"></script>` (näst sista scriptet) saknar `../`-prefix i ALLA
  språkvarianter → trasig sökväg i sv/da/no/fi/de. Hårdkodad utan `{{R}}` i mallen.
- Tomt `<script>\n</script>`-block sist före `</body>` — finns i alla varianter, hårdkodat.

## Nyhetskorten (`cards`-arrayen)

- Korten renderas med `{{#each cards}}` — en ny pressrelease = ett array-objekt per språk
  i `content/{lang}/news.json` (fält: `comment`, `classes`, `category`, `logo`, `logo_alt`,
  `date`, `badge`, `title`, `excerpt`, `slug`).
- `category` används både för `data-category` och badge-modifierklassen
  (`news-card__badge--…`) — identiska i alla befintliga kort.
- »Läs mer«-etiketten är identisk för alla 7 kort inom varje språk → en gemensam nyckel
  `grid.read_more` (refereras inne i loopen).
- HTML-kommentaren före varje kort är delvis översatt: Sotender-kortets kommentar är
  översatt i sv/da/no (»Sotender lanseras/lanceres/lanseres i Sverige«) men engelsk i fi/de;
  övriga kommentarer är engelska i alla språk → fält `comment` per kort.
- Kortens datum är språkformaterade i löptext (»April 14, 2026« / »14. april 2026« /
  »14. huhtikuuta 2026«) → fält `date` per kort.

## Innehållsdrift (noteras, ligger i respektive språks JSON)

- **og:image:alt** är engelsk (»Nordic public-sector SaaS growth platform«) i ALLA språk
  → nyckel `meta.og_image_alt` (parametriserad men identisk).
- **Titel/roll varierar**: CEO-kortets titel är »vd« (sv), »administrerende direktør« (no),
  »CEO« (övriga); footer `ceo_line` följer samma mönster — normal översättning, noteras
  eftersom formen varierar.
- Sotender-kortets excerpt i sv (»vikarieplattformen … vård- och omsorgsboende«) är friare
  formulerad än EN (»SaaS platform … care home«) — copydrift, ingen strukturskillnad.
