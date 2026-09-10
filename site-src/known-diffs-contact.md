> **OBS (2026-09-10): flera av de "bevarade buggarna" nedan är nu RÄTTADE centralt.**
> Följ inte denna fil bokstavligt för dessa punkter — de ska INTE återinföras:
> `<html lang="xx">>` och `og:url ...">>>` (extra `>`), `js/forms.js` utan rätt relativ
> sökväg, saknade `datePublished`/`dateModified` i JSON-LD, samt drift-nycklarna
> (`nav.cta_indent`, `nav.close`/`nav.dropdown_close`, `tail`, `faq.gap`,
> `ai.section_tail`, `portfolio.grid_tail`, `hero.cls`) som nu är normaliserade till
> EN-strukturen i alla språk. Filen behålls som dokumentation av vad extraktionen hittade.

# known-diffs — contact

Accepterade avvikelser mellan de gamla handskrivna filerna (git: `48d1222`) och det
genererade resultatet för `contact.html`. Alla enligt SPEC-regel 4 (äkta drift →
EN-strukturen används). Radnummer avser de gamla filerna.

- `site/{sv,da,no,fi,de}/contact.html` rad 53 — nav-CTA-raden (`<a class="btn btn--accent btn--sm" …>`)
  hade 18 mellanslags indrag i alla fem språkvarianter mot EN:s 6. Whitespace-drift;
  EN-indraget används.
- `site/{sv,da,no,fi,de}/contact.html` rad 66–67 — de fem språkvarianterna hade två extra
  lösa `</div>` (`      </div></div>` / `    </div>      </div>`, 6 stängningar mot 4
  öppningar i nav-headern — obalanserad markup). EN:s balanserade två `</div>`-rader används.
- `site/{sv,da,no,fi,de}/contact.html` rad 231 — `<script src="js/forms.js">` var en trasig
  sökväg från språkundermapparna (pekar på obefintlig `/{lang}/js/forms.js`). Mallen använder
  `{{R}}js/forms.js` → `../js/forms.js`, vilket EN-strukturen ger.

Ej drift (löst som content-nyckel enligt regel 4, trivial skillnad):

- `site/fi/contact.html` rad 192 — footerns `<h4>Stockholm</h4>` var översatt till
  `<h4>Tukholma</h4>` på finska. Parametriserad som `{{footer.city}}` i mallen
  (EN/sv/da/no/de: "Stockholm", fi: "Tukholma").
