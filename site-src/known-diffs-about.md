> **OBS (2026-09-10): flera av de "bevarade buggarna" nedan är nu RÄTTADE centralt.**
> Följ inte denna fil bokstavligt för dessa punkter — de ska INTE återinföras:
> `<html lang="xx">>` och `og:url ...">>>` (extra `>`), `js/forms.js` utan rätt relativ
> sökväg, saknade `datePublished`/`dateModified` i JSON-LD, samt drift-nycklarna
> (`nav.cta_indent`, `nav.close`/`nav.dropdown_close`, `tail`, `faq.gap`,
> `ai.section_tail`, `portfolio.grid_tail`, `hero.cls`) som nu är normaliserade till
> EN-strukturen i alla språk. Filen behålls som dokumentation av vad extraktionen hittade.

# known-diffs — about

Strukturell drift mellan språkvarianterna av `about.html`, hanterad via content-nycklar
så att `node build.js --check --page about` ger `identiska` för alla 6 språk.
Allt nedan är BEVARAT byte-exakt (SPEC regel 2) — inget är fixat. Radnummer avser de gamla filerna.

## Drift som gjorts till content-nycklar (trivial, regel 4a)

- **Nav-CTA-indrag** (`site/about.html` rad 76 vs alla översatta rad 76):
  EN indrar `<a class="btn btn--accent btn--sm">` med 6 mellanslag, sv/da/no/fi/de med 18.
  → nyckel `nav.cta_indent` (samma mönster som companies/contact).
- **Nav-stängningsdivar** (rad 89–90): EN har två rena `      </div>`-rader;
  alla översatta har `      </div></div>` + `    </div>      </div>` (obalanserad markup).
  → nyckel `nav.dropdown_close` (samma som companies).
- **de: saknad blankrad** mellan AI-sektionens `</section>` (rad 212) och
  `<!-- CEO QUOTE -->`-kommentaren: EN/sv/da/no/fi har TVÅ blankrader (rad 213–214),
  de har bara en — därav 304 rader mot övrigas 305.
  → nyckel `ai.section_tail` (`"\n"` överallt utom de: `""`).
- **fi: footer-rubrik** rad 264: `<h4>Tukholma</h4>` — enda språket som översätter »Stockholm«.
  → nyckel `footer.city`.
- **da/no: footer-adressrad** rad 265: `Kungsgatan 37, 8. sal` (da) resp.
  `Kungsgatan 37, 8. etasje` (no) — enda språken som översätter »8tr«.
  → nyckel `footer.address1`.

## Bevarade egenheter (kvar i mallen, ej nycklar)

- `<html lang="…">>` (extra `>`) och `og:url …">>>` (två extra `>`) — som i contact-mallen.
- `<script src="js/forms.js"></script>` (sista raden före `</body>`, rad 303) saknar
  `../`-prefix i ALLA språkvarianter → trasig sökväg i sv/da/no/fi/de
  (pekar på t.ex. `sv/js/forms.js`). Hårdkodad utan `{{R}}` i mallen (samma som companies).
- Blankraden mellan apple-touch-icon och consent.js (rad 35) finns i alla språk — behållen.

## Innehållsdrift (noteras, ligger i respektive språks JSON)

- **JSON-LD-blocken (rad 37–57) är oöversatta** — Organization-beskrivningen
  »PubliX Group is the growth platform for SaaS founders in public services.« är
  identisk engelska i alla 6 språkvarianter. Parametriserad som `meta.ld_description`
  (SPEC regel 3) med samma engelska värde överallt.
- `<title>` och `og:title` är identiska per språk (verifierat) → en gemensam nyckel
  `meta.title`; likaså `meta name=description` och `og:description` → `meta.description`.
- Track-kortens `alt`-texter (`alt="Foundations"`/`alt="Growth"`) är översatta i vissa
  språk → nycklar `tracks.c1_alt`/`tracks.c2_alt`.
