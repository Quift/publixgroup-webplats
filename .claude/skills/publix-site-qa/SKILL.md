---
name: publix-site-qa
description: >
  QA-audit av publixgroup.io — flerspråkig HTML-site (EN + SV/DA/NO/FI/DE).
  Kör systematiska pre-launch/ongoing kvalitetskontroller: brand-namn, placeholders, brutna länkar,
  sitemap, meta/SEO, fakta-konsistens, translation drift, team-bio integritet, testimonial-integritet,
  Netlify-redirects, live-site checks. Triggas vid: QA, kvalitetsgranskning, pre-launch check,
  audit, granska sidan, hitta buggar på siten, review site, sanity check.
  Producerar strukturerad Markdown-rapport och kan applicera M1-fixes direkt.
---

# PubliX Site QA

Du kör en QA-audit av **produktionskoden** för https://publixgroup.io. Målet: hitta varje defekt,
oavsett storlek, dokumentera med fil-referens, och (där lämpligt) fixa direkt.

**Ordertyp:** paras alltid med `publix-site-edit`-skillen för fix-tier-regler
(M1 fixa direkt, M2 full propagering, M3+ eskalera).

**Repo:** `Quift/publixgroup-webplats` · **Root:** `site/`

---

## Steg 0 — Skopa auditen

Innan du börjar, klargör:

1. **Full audit** (alla ~108 sidor, alla språk) eller **fokuserad** (en sida / en språkgren / ett område)?
2. **Bara rapport** eller **rapport + applicera fixes**? För fixes: hänvisa till `publix-site-edit`-skillens tier-tabell — M1 kör direkt, M2+ kräver godkännande.
3. **Live-site checks?** Vissa checks (OG-image URL, cookie-banner, Lighthouse) kräver Netlify-deploy att köra mot.

Skapa tasks via TaskCreate för varje major check-kategori så användaren ser progress.

---

## Steg 1 — Site-inventering (kör alltid först)

```bash
# Bekräfta baseline
find site -maxdepth 3 -name "*.html" -not -path "site/Design-system/*" | wc -l   # Förväntat: ~108 (11 sidor × 6 språk + 7 nyheter × 6)
ls site/ site/sv/ site/da/ site/no/ site/fi/ site/de/                             # Ska visa identiska filnamn per språk
cat site/sitemap.xml | grep -c '<url>'                                            # Ska matcha <loc>-antal
```

Om nya sidor har lagts till sedan senaste audit — flagga för uppdatering av denna checklista.

---

## Kategori A — Brand & copy hygien

### A1. Brand-namn konsekvens
```bash
grep -rHn '\bPublix\b' site/ --include="*.html"     # 0 träffar förväntat (allt ska vara PubliX)
grep -rHn 'Public X\|PublicX' site/ --include="*.html"
```

**Fix-tier:** M1 (typo). Kör `sed -i 's|\bPublix\b|PubliX|g' fil.html` direkt.

### A2. Placeholder-innehåll
```bash
grep -rHn 'TODO\|Lorem\|lorem ipsum\|FIXME\|XXX\|Coming soon\|Company Name' site/ --include="*.html"
grep -rHn 'href="#"' site/ --include="*.html"       # Ska bara finnas i Design-system/guidelines/
grep -rHn 'href=""\|href="javascript:' site/ --include="*.html"
```

**Fix-tier:** M1 om det är enkel städning, M2 om det är riktigt innehåll som saknas.

### A3. Typografi
```bash
# Straight vs curly apostrofer (medium/low)
grep -rHn "you're\|it's\|don't\|we're\|we've\|we'll\|I'm" site/ --include="*.html" | head
# En-dash (–) vs em-dash (—) blandning
grep -rHn '–' site/ --include="*.html" | head       # Bör vara konsekvent
# Dubbla mellanslag i brödtext
grep -rHnE '[a-zA-Z]  +[a-zA-Z]' site/ --include="*.html" | head
```

**Fix-tier:** L / M — sällan blocking, men bra polish.

---

## Kategori B — Struktur & länkar

### B1. Nav-konsekvens över alla språk
```bash
for f in site/index.html site/sv/index.html site/da/index.html site/no/index.html site/fi/index.html site/de/index.html; do
  echo "=== $f ==="
  grep -oE 'nav__links.*|<a href="[^"#]*\.html"' "$f" | head
done
```
Alla index-filer ska ha samma nav-struktur (samma antal länkar, samma målfiler).

### B2. Språkväxlare
```bash
# Räkna language switcher-poster per index
for f in site/index.html site/sv/index.html site/da/index.html site/no/index.html site/fi/index.html site/de/index.html; do
  echo -n "$f: "; grep -c 'lang-dropdown__menu\|data-lang=' "$f"
done
```
Alla ska ha 6 språkalternativ. Verifiera att varje `<a data-lang>` pekar på **motsvarande** sida i målspråket (inte t.ex. alltid `index.html`).

### B3. Interna länkar upplöses
```bash
# Enkelt: alla href-mål ska existera som fil
python << 'EOF'
import os, re
issues = []
for root, dirs, files in os.walk('site'):
    if 'Design-system' in root: continue
    for fn in files:
        if not fn.endswith('.html'): continue
        p = os.path.join(root, fn)
        with open(p, 'r', encoding='utf-8') as f: s = f.read()
        for href in re.findall(r'href="([^"#][^"]*\.html)(#[^"]*)?"', s):
            target = href[0]
            if target.startswith(('http', 'mailto:', 'tel:')): continue
            target_path = os.path.normpath(os.path.join(os.path.dirname(p), target))
            if not os.path.exists(target_path):
                issues.append(f"{p} → {target} (missing)")
for i in issues[:50]: print(i)
print(f"total broken internal links: {len(issues)}")
EOF
```

### B4. Anchor-mål existerar
Om siten har `href="#review"`, `href="index.html#review"`, `href="why-publix.html#process"` etc. — verifiera att `id="review"`, `id="process"` finns i mål-filerna:
```bash
grep -rHo 'href="[^"]*#[a-zA-Z][a-zA-Z0-9_-]*"' site/ --include="*.html" | grep -oE '#[a-zA-Z][a-zA-Z0-9_-]*' | sort -u   # lista alla anchors
grep -rHo 'id="[a-zA-Z][a-zA-Z0-9_-]*"' site/ --include="*.html" | sort -u                                                # lista alla ids
```
Diff:a listorna.

### B5. Sitemap-integritet
```bash
# url = loc balans (invalidt XML om olika)
echo "url: $(grep -c '<url>' site/sitemap.xml)  loc: $(grep -c '<loc>' site/sitemap.xml)"
# Orphan <url>-taggar (två i rad = defekt)
awk '/^  <url>$/{n=NR; getline nx; if (nx !~ /<loc>/) print "line " n ": orphan"}' site/sitemap.xml
# Sitemap innehåller varje shipping-sida
python << 'EOF'
import re, os
with open('site/sitemap.xml') as f: locs = set(re.findall(r'<loc>https://publixgroup\.io/(.+)</loc>', f.read()))
for root, dirs, files in os.walk('site'):
    if 'Design-system' in root: continue
    for fn in files:
        if not fn.endswith('.html'): continue
        rel = os.path.relpath(os.path.join(root, fn), 'site').replace(os.sep,'/')
        # Skippa redirect-sidor
        with open(os.path.join(root, fn)) as f2:
            if 'http-equiv="refresh"' in f2.read(): continue
        # Root index → '' i sitemap (som '/')
        expected = rel if not rel.endswith('index.html') else rel[:-len('index.html')]
        if expected not in locs and rel not in locs:
            print(f"NOT in sitemap: {rel}")
EOF
```

### B6. Netlify redirects
```bash
cat netlify.toml
# Verifiera att alla legacy-URLs som ändrats (t.ex. career.html → team.html) har 301s
# Verifiera att /legal/* och andra externa URL-antaganden fungerar
```

---

## Kategori C — Meta & SEO

### C1. Titel + description per sida
```bash
grep -rH '<title>\|<meta name="description"' site/ --include="*.html" | head -40
# Varje sida ska ha exakt en <title> och en meta description
# Titlar bör vara ~50–60 tecken, descriptions ~140–155
```

### C2. `<html lang>` matchar mapp
```bash
grep -rH '<html lang=' site/ --include="*.html" | awk -F'"' '{
  match($0, /site\/([a-z]{2})\/[^:]+:/, arr);
  lang = arr[1] ? arr[1] : "en";
  if ($2 != lang) print "MISMATCH: " $0
}'
```

### C3. Canonical + hreflang
```bash
# Varje icke-redirect sida ska ha 1 canonical + 7 hreflang (6 språk + x-default)
for f in $(find site -maxdepth 3 -name "*.html" -not -path "site/Design-system/*"); do
  if grep -q 'http-equiv="refresh"' "$f"; then continue; fi
  c=$(grep -c 'rel="canonical"' "$f")
  h=$(grep -c 'hreflang=' "$f")
  if [ "$c" != "1" ] || [ "$h" != "7" ]; then echo "$f: canonical=$c hreflang=$h"; fi
done
```

### C4. Open Graph + Twitter Card
```bash
# Varje sida ska ha: og:title, og:description, og:type, og:url, og:image,
#                    og:image:width, og:image:height, og:image:alt, twitter:card, twitter:image
for f in $(find site -maxdepth 3 -name "*.html" -not -path "site/Design-system/*"); do
  if grep -q 'http-equiv="refresh"' "$f"; then continue; fi
  for tag in 'og:title' 'og:description' 'og:type' 'og:url' 'og:image' 'og:image:width' 'og:image:height' 'og:image:alt' 'twitter:card' 'twitter:image'; do
    if ! grep -q "$tag" "$f"; then echo "$f: missing $tag"; fi
  done
done
```

### C5. OG-image URL faktiskt existerar
Kritisk check — 404 här = alla sociala förhandsvisningar går sönder:
```bash
grep -rho 'og:image" content="[^"]*"' site/index.html | head -1
# Hämta URL:en och testa mot live-siten (WebFetch)
curl -sI https://publixgroup.io/assets/og-image.jpg | head -1   # Ska vara 200
```

### C6. Robots + sitemap referens
```bash
cat site/robots.txt   # Ska innehålla Sitemap: https://publixgroup.io/sitemap.xml
```

---

## Kategori D — Fakta & innehåll

### D1. KPI-konsistens
```bash
# Alla nyckeltal ska vara identiska över alla språk + sidor
grep -Hn 'stats-bar__number' site/index.html site/*/index.html site/why-publix.html site/*/why-publix.html
# Förväntat: ~100 / 10+ / 5 / SEK 90M+ (eller lokaliserad variant) / ~60
```

Om värdena ändras — uppdatera **alla 12 platser** (2 sidor × 6 språk) och proof-inventory.

### D2. Kontaktuppgifter identiska
```bash
grep -rEnH 'Kungsgatan|559485-5487|alexander\.hubel@|info@publixgroup|\+46 76 859 2923' site/ --include="*.html"
# Alla ska matcha:
#   Kungsgatan 37, 8tr, 111 56 Stockholm
#   Org. 559485-5487
#   alexander.hubel@publixgroup.io + info@publixgroup.io
#   +46 76 859 2923
```

### D3. Person-namn (särskilt Alexander Hübel med ü)
```bash
grep -rHn 'Hueble\|Hubbel\|Hübell\|Hübell' site/ --include="*.html"   # 0 träffar
grep -rHn 'Hübel\|H%C3%BCbel' site/ --include="*.html" | wc -l         # Ska vara konsekvent
```

### D4. Team-tile ↔ bio-namn matchar (Adam/Mattias-buggen)
```bash
python << 'EOF'
import os, re
for root, dirs, files in os.walk('site'):
    if 'Design-system' in root: continue
    for fn in ['index.html', 'team.html', 'career.html']:
        p = os.path.join(root, fn)
        if not os.path.exists(p): continue
        with open(p) as f: s = f.read()
        # Match team__member blocks: bio + tile name
        members = re.findall(r'data-bio="([^"]+)".*?team__name">([^<]+)</h3>', s, re.DOTALL)
        for bio, name in members:
            first_name = name.split()[0]
            bio_first_word = bio.split()[0].rstrip(',.')
            if first_name != bio_first_word and bio_first_word not in ['Alexander']:
                # Alexander är dubblett i teamet så flagga specifikt om första ord är annat namn
                print(f"{p}: tile='{name}' bio starts with '{bio_first_word}'")
EOF
```

### D5. Testimonial-quote ↔ person-attribut
Handkoll: läs varje testimonial och verifiera att kontexten passar personen.
Röda flaggor:
- "expandera till Sverige" attribuerad till en svensk-baserad person
- Familjeföretag / generationsskifte-quotes attribuerade till en ny CEO
```bash
python << 'EOF'
import os, re
for root, dirs, files in os.walk('site'):
    if 'Design-system' in root: continue
    for fn in files:
        if not fn.endswith('.html'): continue
        p = os.path.join(root, fn)
        with open(p) as f: s = f.read()
        for match in re.finditer(r'testimonial__quote">([^<]+)</p>.*?testimonial__name">([^<]+)</p>.*?testimonial__role">([^<]+)</p>', s, re.DOTALL):
            quote, name, role = match.groups()
            # Enkel heuristik: quote med "expand into Sweden"/"expandera till Sverige" ska INTE ha en Sverige-baserad person
            if re.search(r'to Sweden|till Sverige|nach Schweden|til Sverige|Ruotsiin', quote):
                if 'Sweden' in role or 'digiPlant' in role or 'Aspicore' in role or 'Tidvis' in role or 'Embrace' in role:
                    print(f"{p}: '{name}' ({role}) attributed with Sweden-expansion quote")
EOF
```

### D6. Roll-konsekvens (samma person, olika titel)
```bash
python << 'EOF'
import os, re
titles = {}  # name → set of (role, file)
for root, dirs, files in os.walk('site'):
    if 'Design-system' in root: continue
    for fn in files:
        if not fn.endswith('.html'): continue
        p = os.path.join(root, fn)
        with open(p) as f: s = f.read()
        for name, role in re.findall(r'testimonial__name">([^<]+)</p>\s*<p class="testimonial__role">([^<]+)</p>', s):
            # Normalisera bort språk-varianter av "Co-Founder & CEO"
            titles.setdefault(name, set()).add((role.strip(), p))
        for name, role in re.findall(r'team__name">([^<]+)</h3>\s*<p class="team__role">([^<]+)</p>', s):
            titles.setdefault(name, set()).add((role.strip(), p))
for name, entries in titles.items():
    roles = {e[0] for e in entries}
    if len(roles) > 1:
        print(f"{name}: {len(roles)} distinct role strings — {sorted(roles)[:3]}")
EOF
```

---

## Kategori E — Translation drift

### E1. Alla språk har alla sidor
```bash
python << 'EOF'
import os
en_pages = set(f for f in os.listdir('site') if f.endswith('.html'))
for lang in ['sv','da','no','fi','de']:
    if not os.path.exists(f'site/{lang}'): continue
    lang_pages = set(f for f in os.listdir(f'site/{lang}') if f.endswith('.html'))
    missing = en_pages - lang_pages
    extra = lang_pages - en_pages
    if missing: print(f"{lang}: MISSING {missing}")
    if extra:   print(f"{lang}: EXTRA {extra}")
# Samma för news/
en_news = set(os.listdir('site/news'))
for lang in ['sv','da','no','fi','de']:
    p = f'site/{lang}/news'
    if not os.path.exists(p): continue
    ln = set(os.listdir(p))
    if en_news - ln: print(f"{lang}/news: MISSING {en_news - ln}")
    if ln - en_news: print(f"{lang}/news: EXTRA {ln - en_news}")
EOF
```

### E2. Untranslated fragment scan
Kolla efter engelska ord som slunkit in i icke-EN filer (typ "Read more" i sv/*.html):
```bash
for lang in sv da no fi de; do
  echo "=== $lang: uppenbara EN-fragment ==="
  grep -Ho '\bLearn more\|\bRead more\|\bContact us\|\bDiscover\|\bLet.s talk\b' site/$lang/*.html 2>/dev/null | head -5
done
```
(Justera listan baserat på UI-copy.)

### E3. Bio-text konsekvens (samma team-member över språk)
Om Adam har bio i EN, samma person ska ha bio på alla andra språk (även om texten är översatt):
```bash
python << 'EOF'
import os, re
en_bios = {}
with open('site/index.html') as f: s = f.read()
for name, bio in re.findall(r'team__name">([^<]+)</h3>.*?data-bio="([^"]+)"', s, re.DOTALL):
    en_bios[name] = bio
# Faktiskt: data-bio kommer före tile-namnet i markup
en_members = re.findall(r'data-bio="([^"]+)"[^>]*>.*?team__name">([^<]+)</h3>', s, re.DOTALL)
en_names = [name for _, name in en_members]

for lang in ['sv','da','no','fi','de']:
    p = f'site/{lang}/index.html'
    if not os.path.exists(p): continue
    with open(p) as f: s = f.read()
    lang_members = re.findall(r'data-bio="([^"]+)"[^>]*>.*?team__name">([^<]+)</h3>', s, re.DOTALL)
    lang_names = [name for _, name in lang_members]
    if lang_names != en_names:
        print(f"{p}: team order differs from EN. Missing: {set(en_names)-set(lang_names)}, Extra: {set(lang_names)-set(en_names)}")
EOF
```

### E4. Nyhets-datum synk över språk
Alla lokaliserade versioner av samma nyhet ska ha samma `datePublished`:
```bash
for article in aspicore digiplant embrace-safety koivu-solutions-sotender publix-group-appoints-alexander-hubel-as-ceo sotender-launches-sweden-suomikoti tidvis; do
  echo "=== $article ==="
  for lang_dir in site/news site/sv/news site/da/news site/no/news site/fi/news site/de/news; do
    grep -o '"datePublished": "[^"]*"' "$lang_dir/$article.html" 2>/dev/null
  done | sort -u
done
```

---

## Kategori F — Media & assets

### F1. Externa CDN-beroenden
Röd flagga: bilder hot-linkade från `cdn.prod.website-files.com` (Webflow) — bräckligt.
```bash
grep -rho 'https://cdn\.prod\.website-files\.com/[^"]*' site/ --include="*.html" | sort -u
```

### F2. Bildstorlekar (låg-hängande frukt för perf)
```bash
find site/img site/assets -type f \( -name "*.jpg" -o -name "*.png" \) -size +500k -exec ls -lh {} \;
# > 500KB för web-bilder är stort. Använd `node optimize.js` eller `sharp` för att komprimera.
```

### F3. Alt-text
```bash
# Bilder med tom alt är OK för dekorativa, men vitt tomt är misstänkt
grep -rHn 'alt=""' site/ --include="*.html" | head
# Bilder utan alt-attribut alls
grep -rHn '<img [^>]*src=' site/ --include="*.html" | grep -v 'alt=' | head
```

### F4. Favicon-set komplett
```bash
ls site/favicon.svg site/favicon.png site/favicon.ico site/apple-touch-icon.png
grep -rH 'link rel="icon"\|apple-touch-icon' site/index.html | head
```

---

## Kategori G — Live-site checks (kräver deploy)

Använd WebFetch:

### G1. HTTP-status per sida
```bash
# Loopa över sitemap.xml-URLer och verifiera 200
python << 'EOF'
import re, urllib.request
with open('site/sitemap.xml') as f: urls = re.findall(r'<loc>([^<]+)</loc>', f.read())
for url in urls:
    try:
        code = urllib.request.urlopen(url, timeout=10).getcode()
        if code != 200: print(f"{code} {url}")
    except Exception as e: print(f"ERR {url}: {e}")
EOF
```

### G2. OG image faktiskt live
```bash
curl -sI https://publixgroup.io/assets/og-image.jpg | head -1   # Ska vara 200
```

### G3. Redirects fungerar
```bash
curl -sI https://publixgroup.io/career.html | grep -E 'HTTP|Location'   # 301 → /team.html
curl -sI https://publixgroup.io/legal/privacy-policy | grep -E 'HTTP|Location'   # 301 → /privacy-policy.html
```

### G4. LinkedIn Post Inspector
Manuell — öppna https://www.linkedin.com/post-inspector/ och verifiera OG-preview renderar bild efter deploy.

---

## Kategori H — A11y & responsive (kräver browser)

Kör mot deployed URL med Playwright/Puppeteer eller preview_start:

### H1. Lighthouse per sida × mobil/desktop
Flagga sidor som scorar < 90 på Perf / A11y / SEO / Best Practices.

### H2. Layout på 375 / 768 / 1366 / 1920
```
resize_window preset:mobile → screenshot varje sida → jämför mot tablet/desktop
```

### H3. Tangentbordsnavigering
- Tab-ordning logisk
- Fokus-indikatorer synliga
- Team-card overlay operabelt utan mus

### H4. Cookie-banner
Testa accept/decline på förstabesök, andrabesök ska respektera valet (localStorage `publix_cookie_consent`).

### H5. Formulär end-to-end
Fyll i Growth Assessment-formuläret på `#review`, verifiera att success-state renderar och att submissionen faktiskt landar i Netlify Forms.

---

## Rapport-format

Producera **en enda Markdown-fil** i `Temp/qa-report-YYYY-MM-DD.md`:

```markdown
# publixgroup.io — QA Audit YYYY-MM-DD

## 1. Executive summary
2-3 meningar. Totalt-antal per severity.

## 2. Issue log
Tabell:
| # | Sev | Sida/URL | Beskrivning | Evidence (file:line) | Fix | Tier |

## 3. Verified clean
Kategorier som är rena — så användaren slipper re-verifiera.

## 4. Prioritized action list
Bara Critical + High, i fixordning.

## 5. Deferred
Med anledning + owner-action.
```

**Severity:**
- **Critical** — bryter förtroende/funktion (brutna länkar, faktafel, OG-image 404, wrong-name-in-bio)
- **High** — synlig bugg (typo, layout-brott, saknar översättning, sitemap-invalid)
- **Medium** — inkonsekvens (stilistik, formatting-drift)
- **Low** — polish/nitpick

---

## Fix-mode (när användaren säger "fixa alla")

1. Läs `publix-site-edit`-skillen för tier-regler.
2. Applicera M1-fixes direkt (typos, dead links, favicon, sitemap orphans, OG image path).
3. För M2 (copy-sektion, ny nyhetsartikel) — visa diff, be om godkännande.
4. För M3+ (nav-ändringar, CTA-strategi) — STOPPA, eskalera Alexander/PE.
5. Efter varje kategori av fixes: kör verify-passen igen och rapportera 0 kvar.
6. Batcha i **1 commit per pass** — inte 100 mikro-commits.
7. Commit-message-format: `site(all-lang): QA audit fixes — <kort lista>` med detaljerad body.

---

## Kända buggmönster (från tidigare audits)

1. **Team-bio startar med fel namn** i icke-EN-språk — översättare kopierade äldre bio där personen bytts ut men glömde uppdatera namnet.
2. **Testimonial-quote parad med fel person** — samma root cause, quotes swapped under en översättningsrunda.
3. **OG image 404** — meta-taggen refererar `/assets/og-image.jpg` men filen har aldrig committats.
4. **Sitemap orphan `<url>`-taggar** — sitemap-generator produced duplicate opening tags.
5. **CDN-beroenden till Webflow** — team-porträtt kvar från gammal Webflow-site istället för self-hosted i `site/img/`.
6. **Nav-label vs URL mismatch** — "Team" i nav pekar på `career.html`, förvirrande.
7. **Roll-drift** — samma person har olika titlar på olika sidor (Founder vs Co-Founder & CEO).
8. **SEK-formatting per språk** — vissa lokaliseringar behåller "SEK 90M+", andra "90M+ SEK", andra "Yli 90 milj. SEK". Bestäm en housestyle per språk.

Om du hittar en NY buggmönstertyp — lägg till här och till check-katalogen ovan.

---

## Referensfiler

- `checks/run-all.sh` — kör alla deterministiska checks och skriver preliminär rapport
- `references/report-template.md` — mall för slutrapport
- Skill-partners: `publix-site-edit` (fix-tier + propagering), `docs/foundation/` (strategisk gate)
