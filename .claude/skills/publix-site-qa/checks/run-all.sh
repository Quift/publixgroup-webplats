#!/usr/bin/env bash
# publix-site-qa — kör alla deterministiska checks och skriver preliminär rapport
# Användning: bash .claude/skills/publix-site-qa/checks/run-all.sh > qa-preliminary.md
# Sedan låter du LLM:en läsa rapporten och lägga till kontext + kategori C-E som kräver läsning.
#
# Kör från repo-root.

set -u

SITE=site
REPORT_HEADER="# publixgroup.io — QA preliminär (autogenererad $(date -I))"

echo "$REPORT_HEADER"
echo ""
echo "> Kör från: \`bash .claude/skills/publix-site-qa/checks/run-all.sh\`"
echo ""

section() { echo ""; echo "## $1"; echo ""; }
subhead() { echo ""; echo "### $1"; echo ""; }
codeblock() { echo '```'; "$@"; echo '```'; }

# ─────────────────────────────────────────────
section "A · Brand & copy hygien"

subhead "A1 — Publix (lowercase x) — förväntat 0"
codeblock grep -rHn '\bPublix\b' "$SITE" --include="*.html" 2>/dev/null

subhead "A2 — Placeholders (TODO/Lorem/FIXME/href=\"#\")"
{
  grep -rHn 'TODO\|Lorem\|lorem ipsum\|FIXME\|XXX\|Coming soon' "$SITE" --include="*.html" 2>/dev/null | grep -v Design-system
  grep -rHn 'href="#"' "$SITE" --include="*.html" 2>/dev/null | grep -v Design-system
  grep -rHn 'href=""' "$SITE" --include="*.html" 2>/dev/null | grep -v Design-system
} | ( echo '```'; cat; echo '```' )

# ─────────────────────────────────────────────
section "B · Struktur & länkar"

subhead "B3 — Brutna interna länkar"
echo '```'
python << 'PYEOF'
import os, re
issues = []
for root, dirs, files in os.walk('site'):
    if 'Design-system' in root: continue
    for fn in files:
        if not fn.endswith('.html'): continue
        p = os.path.join(root, fn)
        try:
            with open(p, encoding='utf-8') as f: s = f.read()
        except: continue
        for href in re.findall(r'href="([^"#][^"]*\.html)(#[^"]*)?"', s):
            target = href[0]
            if target.startswith(('http', 'mailto:', 'tel:')): continue
            target_path = os.path.normpath(os.path.join(os.path.dirname(p), target))
            if not os.path.exists(target_path):
                issues.append(f"{p} → {target}")
for i in issues[:100]: print(i)
print(f"# total: {len(issues)}")
PYEOF
echo '```'

subhead "B5a — Sitemap balans"
echo '```'
echo "url tags: $(grep -c '<url>' "$SITE/sitemap.xml")"
echo "loc tags: $(grep -c '<loc>' "$SITE/sitemap.xml")"
echo "(måste vara lika för valid sitemap)"
echo '```'

subhead "B5b — Sitemap orphan url-taggar"
echo '```'
awk '/^  <url>$/{n=NR; getline nx; if (nx !~ /<loc>/) print "line " n ": orphan <url>"}' "$SITE/sitemap.xml"
echo '```'

subhead "B5c — Shipping-sidor som saknas i sitemap"
echo '```'
python << 'PYEOF'
import re, os
with open('site/sitemap.xml') as f:
    locs = set(re.findall(r'<loc>https://publixgroup\.io/(.*)</loc>', f.read()))
locs.add('')  # rot
for root, dirs, files in os.walk('site'):
    if 'Design-system' in root or root.endswith('assets'): continue
    for fn in files:
        if not fn.endswith('.html'): continue
        p = os.path.join(root, fn)
        try:
            with open(p, encoding='utf-8') as f2:
                if 'http-equiv="refresh"' in f2.read(): continue
        except: continue
        rel = os.path.relpath(p, 'site').replace(os.sep, '/')
        expected = rel[:-len('index.html')] if rel.endswith('index.html') else rel
        if expected not in locs and rel not in locs:
            print(f"NOT in sitemap: {rel}")
PYEOF
echo '```'

# ─────────────────────────────────────────────
section "C · Meta & SEO"

subhead "C2 — <html lang> matchar mapp"
echo '```'
python << 'PYEOF'
import re, os
for root, dirs, files in os.walk('site'):
    if 'Design-system' in root: continue
    for fn in files:
        if not fn.endswith('.html'): continue
        p = os.path.join(root, fn)
        rel = os.path.relpath(p, 'site').replace(os.sep, '/')
        expected = rel.split('/')[0] if '/' in rel and rel.split('/')[0] in ['sv','da','no','fi','de'] else 'en'
        with open(p, encoding='utf-8') as f: s = f.read()
        m = re.search(r'<html lang="([^"]+)"', s)
        if m and m.group(1) != expected:
            print(f"{p}: <html lang=\"{m.group(1)}\"> but expected \"{expected}\"")
PYEOF
echo '```'

subhead "C3 — Canonical + hreflang (varje icke-redirect ska ha 1 + 7)"
echo '```'
for f in $(find "$SITE" -maxdepth 3 -name "*.html" -not -path "$SITE/Design-system/*" -not -path "$SITE/assets/*" 2>/dev/null); do
  if grep -q 'http-equiv="refresh"' "$f" 2>/dev/null; then continue; fi
  c=$(grep -c 'rel="canonical"' "$f")
  h=$(grep -c 'hreflang=' "$f")
  if [ "$c" != "1" ] || [ "$h" != "7" ]; then echo "$f: canonical=$c hreflang=$h"; fi
done
echo '```'

subhead "C4 — Saknade OG/Twitter-tags"
echo '```'
for f in $(find "$SITE" -maxdepth 3 -name "*.html" -not -path "$SITE/Design-system/*" -not -path "$SITE/assets/*" 2>/dev/null); do
  if grep -q 'http-equiv="refresh"' "$f" 2>/dev/null; then continue; fi
  for tag in 'og:title' 'og:description' 'og:type' 'og:url' 'og:image' 'og:image:width' 'og:image:height' 'og:image:alt' 'twitter:card' 'twitter:image'; do
    if ! grep -q "$tag" "$f"; then echo "$f: missing $tag"; fi
  done
done | head -60
echo '```'

# ─────────────────────────────────────────────
section "D · Fakta & innehåll"

subhead "D1 — KPI-värden (måste matcha över alla index+why-publix)"
echo '```'
grep -Hn 'stats-bar__number' "$SITE"/index.html "$SITE"/*/index.html "$SITE"/why-publix.html "$SITE"/*/why-publix.html 2>/dev/null
echo '```'

subhead "D2 — Kontaktuppgifter (ska vara identiska överallt)"
echo '```'
grep -rEnH 'Kungsgatan|559485-5487|alexander\.hubel@|info@publixgroup|\+46 76 859 2923' "$SITE" --include="*.html" 2>/dev/null | head -20
echo '```'

subhead "D3 — Alexander Hübel-stavning"
echo '```'
grep -rHn 'Hueble\|Hubbel\|Hübell' "$SITE" --include="*.html" 2>/dev/null
echo "(förväntat 0 träffar; korrekt stavning är Alexander Hübel)"
echo '```'

subhead "D4 — Team-tile ↔ bio-namn mismatches"
echo '```'
python << 'PYEOF'
import os, re
alias = {'Adam': ['Adam'], 'Marcus': ['Marcus', 'Marcuksella'], 'Erik':['Erik'], 'Patrick':['Patrick'],
        'Patrik':['Patrik'], 'Viktor':['Viktor'], 'Anders':['Anders'], 'Anton':['Anton'],
        'Janne':['Janne'], 'Harri':['Harri'], 'Johan':['Johan'], 'Alexander':['Alexander']}
for root, dirs, files in os.walk('site'):
    if 'Design-system' in root: continue
    for fn in files:
        if fn not in ('index.html','team.html','career.html'): continue
        p = os.path.join(root, fn)
        with open(p, encoding='utf-8') as f: s = f.read()
        for match in re.finditer(r'data-bio="([^"]+)"[^>]*>.*?team__name">([^<]+)</h3>', s, re.DOTALL):
            bio, name = match.groups()
            first = name.split()[0]
            bio_start = bio.split()[0].rstrip('.,')
            allowed = alias.get(first, [first])
            if bio_start not in allowed:
                print(f"{p}: tile='{name}' — bio starts with '{bio_start}'")
PYEOF
echo '```'

subhead "D5 — Testimonial 'Sweden expansion' quote hos Sverige-baserad person"
echo '```'
python << 'PYEOF'
import os, re
sweden_words = re.compile(r'to Sweden|till Sverige|nach Schweden|til Sverige|Ruotsiin')
for root, dirs, files in os.walk('site'):
    if 'Design-system' in root: continue
    for fn in files:
        if not fn.endswith('.html'): continue
        p = os.path.join(root, fn)
        with open(p, encoding='utf-8') as f: s = f.read()
        for m in re.finditer(r'testimonial__quote">([^<]+)</p>.*?testimonial__name">([^<]+)</p>.*?testimonial__role">([^<]+)</p>', s, re.DOTALL):
            quote, name, role = m.groups()
            if sweden_words.search(quote):
                if any(x in role for x in ['digiPlant','Aspicore','Tidvis','Embrace']):
                    print(f"{p}: '{name}' ({role}) → Sweden-expansion quote (suspekt)")
PYEOF
echo '```'

# ─────────────────────────────────────────────
section "E · Translation drift"

subhead "E1 — Sida-paritet mellan språk"
echo '```'
python << 'PYEOF'
import os
en = {f for f in os.listdir('site') if f.endswith('.html')}
for lang in ['sv','da','no','fi','de']:
    if not os.path.isdir(f'site/{lang}'): continue
    other = {f for f in os.listdir(f'site/{lang}') if f.endswith('.html')}
    miss = en - other; extra = other - en
    if miss: print(f"{lang}: MISSING {miss}")
    if extra: print(f"{lang}: EXTRA {extra}")
en_news = set(os.listdir('site/news'))
for lang in ['sv','da','no','fi','de']:
    p = f'site/{lang}/news'
    if not os.path.isdir(p): continue
    other = set(os.listdir(p))
    miss = en_news - other; extra = other - en_news
    if miss: print(f"{lang}/news: MISSING {miss}")
    if extra: print(f"{lang}/news: EXTRA {extra}")
PYEOF
echo '```'

subhead "E4 — Nyhets-datePublished synk över språk (ska vara identiska)"
echo '```'
for article in aspicore digiplant embrace-safety koivu-solutions-sotender publix-group-appoints-alexander-hubel-as-ceo sotender-launches-sweden-suomikoti tidvis; do
  vals=$(for d in site/news site/sv/news site/da/news site/no/news site/fi/news site/de/news; do
    grep -o '"datePublished": "[^"]*"' "$d/$article.html" 2>/dev/null | head -1
  done | sort -u | wc -l)
  if [ "$vals" -gt 1 ]; then
    echo "$article: DRIFT — $vals distinct datePublished-värden över språken"
  fi
done
echo '```'

# ─────────────────────────────────────────────
section "F · Media"

subhead "F1 — Externa CDN-beroenden (bör vara 0 för self-hosted)"
echo '```'
grep -rho 'https://cdn\.prod\.website-files\.com/[^"]*' "$SITE" --include="*.html" 2>/dev/null | sort -u
echo '```'

subhead "F2 — Bilder > 500KB (perf-flag)"
echo '```'
find "$SITE"/img "$SITE"/assets -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -size +500k -exec ls -lh {} \; 2>/dev/null
echo '```'

subhead "F3 — <img> utan alt-attribut"
echo '```'
grep -rHn '<img [^>]*src=' "$SITE" --include="*.html" 2>/dev/null | grep -v 'alt=' | head -10
echo '```'

# ─────────────────────────────────────────────
echo ""
echo "---"
echo ""
echo "**Nästa steg:** LLM:en läser detta output, korsrefererar mot fil-koden för context, lägger till Kategori G (live-site) och H (browser/a11y), och producerar den slutliga strukturerade rapporten enligt SKILL.md rapport-format."
