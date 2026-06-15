# PubliX Web — UI Kit

A faithful recreation of the **PubliX Group marketing site** (`publixgroup.io`), built from the live site's structure and copy. It demonstrates the brand's public-facing surface composed entirely from the design-system primitives.

## Run it
Open `index.html`. It loads `../../styles.css` (tokens + fonts), the compiled `_ds_bundle.js` (components), and Phosphor Icons from CDN, then mounts the page into a scroll container so the sticky nav and in-page navigation behave like the real site.

## Surfaces
| File | What it is |
|---|---|
| `WebNav.jsx` | Sticky, blur-on-scroll top nav · logo + links + "Get in touch" (`Button`) |
| `WebHero.jsx` | Split hero · headline, sub, CTAs, washed portrait image + "Backed by Aspira" badge |
| `MissionSection.jsx` | "Public services deserve better" prose + a 4-up impact strip (`StatCard`) |
| `CompaniesSection.jsx` | **Interactive** portfolio carousel — prev/next + name pills cycle the 5 companies (`Badge`, `Avatar`, `IconButton`, `Button`) |
| `NewsSection.jsx` | 3-up news teasers (`Badge`) |
| `WebCTA.jsx` | Navy CTA with the dot-skyline pattern + `WebFooter` |

## Components used
`Button`, `IconButton`, `Badge`, `Avatar`, `StatCard` from `window.PubliXGroupDesignSystem_c7bc72`. The kit does **not** re-implement primitives — it composes them.

## Interactions
- Nav links + footer links smooth-scroll to sections.
- Companies carousel: caret buttons and the name pills below switch the featured company.
- News + company cards lift on hover.

## Real data
Copy, portfolio companies (Tidvis, digiPlant, Aspicore, Koivu/Sotender, Embrace Safety), people, locations and the SEK 300M / €7M figures are drawn from the live site and public reporting (Sep 2025). Portfolio logos live in `assets/portfolio/`.

## Notes / fidelity gaps
- The live site is built in Webflow; exact section paddings are approximated against screenshots, not pixel-measured from source (no code/Figma access was provided).
- Founder portraits are rendered as initials avatars (the kit ships no personal photos).
