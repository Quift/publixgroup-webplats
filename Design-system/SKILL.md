---
name: publix-design
description: Use this skill to generate well-branded interfaces and assets for PubliX Group AB (a Nordic GovTech accelerator), either for production or throwaway prototypes/mocks/decks. Contains essential design guidelines, colours, type, fonts, assets, and UI-kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation
- **Brand in one line:** navy-led, institutional, trustworthy GovTech; "digital innovation in service of people." Mark = pixel-squares rising like a bar chart.
- **Tokens & fonts:** link `styles.css` (it `@import`s everything). Core tokens: `--navy-800` (#0E2240 brand), `--azure-600` (#2563D4 action), cool `--slate-*` neutrals.
- **Type:** Sora (display), Hanken Grotesk (text), IBM Plex Mono (figures).
- **Icons:** Phosphor (Regular), self-hosted — link `assets/icons/phosphor/phosphor.css`, e.g. `<i class="ph ph-arrow-right">`.
- **Charts:** use the `--viz-*` palette (`tokens/dataviz.css`) — categorical / sequential / diverging / finance semantics. Green = positive, red = negative.
- **Components:** load `_ds_bundle.js`, then `const { Button, Badge, Card, … } = window.PubliXGroupDesignSystem_c7bc72;`. See each component's `.prompt.md`.
- **Voice:** plain, mission-led, "we"/"you", sentence case, em-dashes, no emoji, EU/British spelling.

## Assets
Logos, the dot-skyline pattern, hero imagery and portfolio logos live in `assets/`. The wordmark and mark SVGs are single-colour (`-currentcolor` follows CSS `color`).
