> **OBS (2026-09-10): flera av de "bevarade buggarna" nedan är nu RÄTTADE centralt.**
> Följ inte denna fil bokstavligt för dessa punkter — de ska INTE återinföras:
> `<html lang="xx">>` och `og:url ...">>>` (extra `>`), `js/forms.js` utan rätt relativ
> sökväg, saknade `datePublished`/`dateModified` i JSON-LD, samt drift-nycklarna
> (`nav.cta_indent`, `nav.close`/`nav.dropdown_close`, `tail`, `faq.gap`,
> `ai.section_tail`, `portfolio.grid_tail`, `hero.cls`) som nu är normaliserade till
> EN-strukturen i alla språk. Filen behålls som dokumentation av vad extraktionen hittade.

# known-diffs — pressrelease-artiklar (news/{slug})

Alla 7 slugs × 6 språk byggs byte-identiskt (`node build.js --check --page news:{slug}` → 6 identiska).
Strukturell drift nedan är alltså INTE normaliserad utan bevarad exakt via content-nycklar —
posterna här är att-göra-listan för den centrala buggfixen/harmoniseringen efteråt.

## Strukturell drift mellan språkvarianter (SPEC regel 4)

- **JSON-LD saknar datum i alla översättningar** — de 6 standardartiklarna (alla utom
  sotender-launches-sweden-suomikoti): EN har `"datePublished"`/`"dateModified"` (rad ~56–57),
  sv/da/no/fi/de saknar båda raderna (och `"image"`-raden saknar därmed avslutande komma).
  Bevarat exakt via per-språk `head_scripts`-värde. ISO-datumen ligger ändå som
  `date.published_iso`/`date.modified_iso` i ALLA språkfiler (kopierade från EN) så att
  mallen kan centralisera JSON-LD-blocket senare.
- **JSON-LD headline ≠ h1 i sotender-launches-sweden-suomikoti** för sv/da/no/de
  (fi och en matchar h1). Där headline avviker används nyckeln `jsonld.headline`;
  annars refererar blocket `{{title}}`.
- **`<title>`/og:title ≠ h1** i flera översättningar (t.ex. sv/news/aspicore.html:
  title "PubliX Group till Finland…" men h1 "PubliX Group etablerar sig i Finland…").
  Modellerat som två nycklar: `meta.title` (title/og:title) och `title` (h1 + JSON-LD).

## Strukturell drift mellan artiklar (hanterad via content-nycklar)

- **sotender-launches-sweden-suomikoti avviker i hela `<head>`** från de andra sex:
  annan meta-ordning (description först), og:image-blocket FÖRE hreflang, extra
  `article:published_time`/`article:author`/`article:section`, twitter:image utan
  parallell placering, pretty-printad JSON-LD med andra fält (`mainEntityOfPage`,
  `author` inline, ingen `description`/`url`/`dateModified`) samt consent.js EFTER
  JSON-LD i stället för före. Därför är head-regionerna arrays i content-JSON:
  `head_meta` (efter `<title>`, före hreflang), `head_after_canonical`,
  `head_scripts` (efter favicons, före `</head>`).
- **`og:description` ≠ `meta description`** endast i sotender-launches-sweden-suomikoti
  (kortad og-variant) → nyckeln `meta.og_description` finns bara där.
- **Sidebar varierar**: sotender-artikeln har 3 rubrik/text-par (2:a/3:e med
  ` style="margin-top:20px;"`) och `alt="Sotender"`; övriga har 1 par och `alt="Logo"`.
  Modellerat som `sidebar.blocks[]` med `style`-fält.
- **CEO-artikeln saknar `loading="lazy" decoding="async"`** på sidebar-loggan
  (alla språk) → tomt `sidebar.logo_attrs`; övriga artiklar har attributen.

## Bevarade buggar (fixas centralt i mallen SENARE, ej nu)

- `<html lang="…">>` — extra `>` efter html-taggen (alla filer; samma som contact).
- `<meta property="og:url" …>>>` — två extra `>` (alla filer).
- **`<script src="js/forms.js"></script>` saknar `../`-prefix** i de 6 standardartiklarna,
  i ALLA språk (trasig sökväg; sv-varianter borde haft `../../`). Endast
  sotender-launches-sweden-suomikoti har korrekt R-prefixad sökväg. Bevarat via
  nyckeln `scripts.forms_src` (literal per språk).
- Tomt `<script>\n</script>`-block sist i body (alla filer) — ligger kvar i mallen.
- `og:image:alt` och nyhetsbrevs-/badge-oberoende boilerplate i head är oöversatt
  engelska i alla språkvarianter — bevarat som literala rader i `head_meta`/
  `head_after_canonical`.
- Duplicerad boilerplate-brödtext i de 6 standardartiklarna (identiska stycken med
  bara företagsnamnet utbytt) — extraherad exakt som den är till `body_html`
  enligt SPEC regel 2; omskrivning sker i ett senare steg.
