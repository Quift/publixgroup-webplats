# PubliX Group — Design System

A brand & UI design system for **PubliX Group AB**, a Stockholm-based Nordic GovTech group. PubliX acquires and accelerates founder-led, vertical-SaaS companies that digitise public services — municipalities, healthcare, schools, foundations and NGOs across Sweden and Finland. It positions itself not as a passive holding company but as an **accelerator**, sharing resources (public procurement, IT-security & compliance, AI, pricing) across its portfolio. Backed by investment firm **Aspira Partners**.

> "We unite entrepreneur-led companies with one shared ambition: to improve public services through digital innovation and efficiency."

- **Org. number:** 559485-5487 · founded 2024 · HQ Kungsgatan 37, Stockholm
- **CEO:** Alexander Hübel · **Chair:** Patrik Sallner
- **Portfolio:** Tidvis (social care), digiPlant / SBS Manager (grants & foundations), Aspicore / Apuraha4 (grants, FI), Koivu Solutions / Sotender (healthcare shifts, FI), Embrace Safety / EMBRACE (municipal safety)

This system covers PubliX Group's **own** corporate brand — navy + neutral, institutional, trustworthy. Each portfolio company keeps its own colours and logo.

## Sources used
No codebase or Figma was provided. The brand was reconstructed from public material:
- **Live site:** https://www.publixgroup.io (homepage, about, our-companies, news, contact)
- **Aspira Partners case page:** https://www.aspirapartners.se/cases/publix
- **Real brand assets pulled from the site CDN** (`cdn.prod.website-files.com`) and stored under `assets/`: the wordmark logo (`publixlogo.svg`), the dot-skyline background pattern, the hero portrait, Phosphor caret icons, and the five portfolio-company logos.
- Facts (capital SEK 300M+, €7M Ostrobothnia savings) from public M&A reporting, Sep 2025.

⚠️ **Font substitution (please confirm):** the site's exact webfont could not be extracted. The wordmark is custom-drawn paths. We set the system in **Sora** (display) + **Hanken Grotesk** (text) — a geometric/humanist pairing that matches the wordmark's character and the brand's "digital + human" thesis. If you have the real brand fonts, drop the files in `assets/fonts/` and update `tokens/fonts.css`.

---

## CONTENT FUNDAMENTALS

**Voice.** Confident, plain, public-spirited. PubliX is a serious operator in an unglamorous-but-important corner of tech, and the copy reflects that: declarative, mission-led, never hype-y. It is comfortable naming the problem bluntly ("Public services… are under-digitized and often inefficient") and then stating its purpose simply ("PubliX Group exists to change that").

**Person.** First-person plural — **"we"** — throughout. The reader/partner is **"you"** ("whether *you're* building digital solutions… *we'd* love to hear from you"). Founders and companies are spoken about with respect and specificity, by name.

**Tone & register.** Warm institutional. It pairs welfare-sector empathy ("empowering care providers and improving lives") with operator confidence ("a Nordic buy-and-build platform"). British/EU English spelling on the marketing site ("digitised", "modernise") sits alongside US spellings in places — **standardise on EU/British English** for new copy.

**Casing.** Sentence case for headlines and buttons ("Building better public services through digital innovation", "Get in touch") — **not** Title Case. Eyebrows/labels are UPPERCASE with wide tracking. The wordmark is always lowercase: **publix group**. The "X" in PubliX is capitalised in prose ("PubliX Group").

**Sentence shape.** Short lead sentences, then one expanding sentence. Em-dashes are a signature — used for asides and pivots ("Rather than acting as a holding company, we function as an accelerator — helping our companies scale faster…"). Lists are concrete (scheduling, reporting, communication, payroll).

**Numbers.** Real and sourced — "€7 million annual savings", "5 portfolio companies", "SEK 300m". Never invent metrics. Currency and figures read best in mono (`--font-mono`).

**Emoji.** None on the corporate site. Avoid in product and marketing. (The CEO uses 🚀/🖤 on personal LinkedIn — that is personal voice, not the brand.)

**Do / Don't**
- ✅ "Founder-led, mission-driven." · ✅ "Modernizing essential services, alongside purpose-driven entrepreneurs."
- ❌ "Revolutionary AI-powered synergy platform!" · ❌ Title Case Everywhere · ❌ exclamation marks in headlines

---

## VISUAL FOUNDATIONS

**The idea.** A pixel-grid mark whose squares rise like a bar chart / equalizer — *data turning into progress*, the accelerator metaphor. Everything else is calm, squared-off and institutional so the work feels trustworthy.

**Colour.** Navy-led. **Navy #0E2240** is the brand anchor (logo, headings, dark sections). A single **Azure #2563D4** is the digital "signal" — actions, links, focus, active states — used sparingly. Neutrals are **cool slate** (never warm or pure grey). Semantics are tuned Nordic-cool (success green `#1F8A5B`, warning ochre, danger `#C8453B`, info = azure). The palette is deliberately restrained: navy + white + slate carry ~90% of any layout; azure is a spark. Portfolio companies bring their own colours — PubliX itself does not.

**Type.** Display = **Sora** (geometric, technological) for headlines, big numbers and eyebrows; Text/UI = **Hanken Grotesk** (humanist grotesk) for everything readable; Mono = **IBM Plex Mono** for figures, org-numbers, IDs and code. Headlines are tight (−0.02em), large and sentence-case; body is 16–18px at 1.55 line-height.

**Backgrounds.** Mostly flat white and `--navy-50`. Dark sections use solid **navy** (no gradients as decoration). The one recurring texture is the **dot-skyline pattern** (`assets/patterns/dot-skyline.svg`) — the mark's pixels scaled up into a city-skyline/equalizer, placed low-right on navy CTA/footer at ~50% opacity. No noise/grain, no blobs, no mesh gradients.

**Imagery.** Cool, deep, human. Close honest portraits (e.g. the hero eye) over a **navy protection wash** (`linear-gradient` to `rgba(6,18,42,.45–.72)`) so white text stays legible. Slightly desaturated, never bright-stock. Corners rounded `--radius-xl` (24px) on hero/feature media.

**Borders & elevation.** Border-first, shadow-second — institutional restraint. Hairlines are `--border-subtle/-default` (cool slate). Shadows are **navy-tinted, not black**, and soft/low (`--shadow-xs … xl`). On navy surfaces, hairlines become `rgba(255,255,255,.14)`.

**Corner radius.** Restrained and squared-off, echoing the pixel-square mark: chips 3px, inputs/sm 6px, buttons/cards 10px, large cards 16px, hero media 24px. True pills (999px) only for avatars, toggles and status dots.

**Cards.** White surface, 1px subtle slate border, `--radius-lg`, soft `--shadow-sm`. Interactive cards lift `-2/-3px` with a larger shadow on hover. No coloured left-border accents.

**Motion.** Calm and confident — short fades and small upward translates, **never bounce**. `--ease-standard` for UI, `--ease-out` for entrances; durations 140 / 220 / 360ms. Carets/arrows nudge a few px on hover. Respect `prefers-reduced-motion`.

**Interaction states.** Hover: darken fills one step (navy-800→700, azure-600→700) or wash with `--navy-50` / `rgba(255,255,255,.08)` on navy. Press: translateY(1px). Focus: 3px azure ring (`--ring`), always visible.

**Transparency & blur.** Used sparingly and purposefully: the sticky nav uses an 85% white + `backdrop-filter: blur` once scrolled; image badges use a translucent navy + blur. Not decorative.

**Layout.** 1200px max content width, 32px gutters, ~96px (`--section-y`) vertical rhythm between sections, 4px spacing grid. Sticky top nav. Alternate white / `--navy-50` / `--slate-50` section backgrounds for rhythm; navy for CTA/footer.

---

## DATA VISUALIZATION

PubliX's portfolio runs on financial and operational data — grants paid, budgets, shift coverage, reported savings — so charts get a **dedicated palette** (`tokens/dataviz.css`, prefix `--viz-*`) rather than being improvised from UI colours. It is brand-cohesive (azure leads, navy anchors) and tuned to read on white.

- **Categorical** `--viz-cat-1…8` (+ `-soft` tints): up to 8 qualitative series, ordered for maximum separation — azure, teal, amber, violet, green, coral, magenta, steel. Use the fewest you can; reach for the soft tints for area/stacked fills and legend chips.
- **Sequential** `--viz-seq-azure-1…7` (default) and `--viz-seq-teal-1…6` (alternate): single-hue magnitude ramps for heatmaps, choropleths and intensity.
- **Diverging** `--viz-div-neg-3 … --viz-div-mid … --viz-div-pos-3`: loss ↔ neutral ↔ gain. The default for budget variance, profit/loss and over/under-target.
- **Finance semantics** (fixed meaning): `--viz-positive` (gain/surplus/paid, green), `--viz-negative` (loss/deficit/overdue, red), `--viz-neutral`, `--viz-benchmark` (navy target line), `--viz-forecast` (azure, usually dashed). Financial convention: **green = positive, red = negative** — never swap.
- **Chart chrome**: `--viz-grid`, `--viz-grid-strong` (baseline), `--viz-axis`, `--viz-axis-label`, `--viz-tooltip-bg/-fg`. Gridlines are faint slate; the zero baseline is one step stronger; tooltips sit on navy-900.

Figures in charts use `--font-mono` (tabular). See the **Data Viz** cards in the Design System tab, including "Charts in use" for a worked budget-variance + sector-donut example.

> ⚠️ **Provisional:** this palette is a first pass pending the reference colour scheme you're attaching. Hues live in one file — adjust `tokens/dataviz.css` and every chart updates.

---

## ICONOGRAPHY

**System: [Phosphor Icons](https://phosphoricons.com/), Regular weight.** The live site ships Phosphor SVGs (`CaretLeft.svg` / `CaretRight.svg` are Phosphor's own files — copied into `assets/icons/`), so the whole system standardises on Phosphor. It is a clean, geometric, even-stroke set that sits naturally with Sora and the squared-off radii.

- **In components & kits:** Phosphor is **self-hosted** for an offline-complete system — link `assets/icons/phosphor/phosphor.css` (relative), then `<i class="ph ph-caret-right"></i>`. (The font is `font-display: block`; allow it to load before first paint.) Components take Phosphor class names via `icon` / `iconLeft` / `iconRight` props.
- **Weight:** Regular by default. Use Bold (`ph-bold ph-…`) only for very small sizes if needed; avoid mixing weights in one view.
- **Common glyphs:** `ph-caret-left/right` (carousels), `ph-arrow-right`/`ph-arrow-up-right` (CTAs & external links), `ph-magnifying-glass`, `ph-buildings`, `ph-coins`, `ph-check`, `ph-flag`, `ph-trend-up`.
- **No emoji. No unicode-as-icon.** The brand mark's pixel-grid (`assets/logo/publix-mark.svg`) is the only "illustrative" glyph — use it for app icons, favicons, avatars and loading states.
- We did **not** find a bespoke product icon font; if portfolio apps use one, add it under `assets/icons/` and document here.

---

## Index / manifest

**Root**
- `styles.css` — the single entry point consumers link. `@import`s every token + font file.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skills front-matter so this folder works as a downloadable Claude skill.

**`tokens/`** (each `@import`ed by `styles.css`)
- `fonts.css` — `@font-face` for Sora, Hanken Grotesk, IBM Plex Mono (woff2 in `assets/fonts/`)
- `colors.css` — navy / azure / slate scales, semantics, and semantic aliases (`--text-*`, `--surface-*`, `--border-*`, `--action`)
- `typography.css` — families, weights, the type scale, line-heights, tracking
- `spacing.css` — 4px scale + layout widths + control heights
- `radius.css` · `shadow.css` · `motion.css`
- `dataviz.css` — chart palette (`--viz-*`): categorical, sequential, diverging, finance semantics, chart chrome

**`guidelines/`** — 18 foundation specimen cards for the Design System tab (Colors, Type, Spacing, Brand).

**`components/`** — reusable primitives (React). Each has `.jsx` + `.d.ts` + `.prompt.md`, with one `@dsCard` HTML per folder.
- `forms/` — **Button**, **IconButton**, **Input**, **Select**, **Checkbox**, **Switch**
- `display/` — **Badge**, **Tag**, **Avatar**, **Card**, **StatCard**
- `navigation/` — **Tabs**

Use from card/kit HTML via `const { Button } = window.PubliXGroupDesignSystem_c7bc72;` after loading `_ds_bundle.js`.

**`ui_kits/`**
- `publix-web/` — recreation of the publixgroup.io marketing site (hero, mission + impact stats, interactive companies carousel, news, CTA, footer). See its `README.md`.

**`assets/`**
- `logo/` — wordmark (`publix-logo.svg` navy, `-white.svg`, `-currentcolor.svg`) + mark-only (`publix-mark*.svg`) + raster (`publix-logo-navy.png`)
- `patterns/` — `dot-skyline.svg`
- `icons/` — self-hosted **Phosphor** (Regular) at `phosphor/phosphor.css` + `Phosphor.woff2`, plus the brand's own caret SVGs
- `imagery/` — `hero-eye.jpg`
- `portfolio/` — the five portfolio-company logos
- `fonts/` — Sora, Hanken Grotesk, IBM Plex Mono (woff2)

## Starting points
- **Button** (Forms) · **Badge** (Display) are registered as component starting points for consuming projects.
