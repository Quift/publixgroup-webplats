# publixgroup.io — Pre-launch QA Audit

**Date:** YYYY-MM-DD
**Auditor:** Claude (via `publix-site-qa` skill)
**Scope covered:** X pages × Y languages (list what was actually inspected).

---

## 1. Executive Summary

3–5 sentences. Overall health, total issue count per severity, whether any release-blocker exists.

**Totals:** N Critical · N High · N Medium · N Low.

---

## 2. Issue Log

Ordered by severity, then by page. `file:line` = repo path relative to `site/`.

### Critical

| # | Page(s) / URL | Description | Evidence | Recommended fix | Files |
|---|---|---|---|---|---|
| C-1 | ... | ... | file:line + quoted snippet | ... | N files |

### High

| # | Page(s) | Description | Evidence | Fix | Files |
|---|---|---|---|---|---|

### Medium

| # | Page(s) | Description | Evidence | Fix |
|---|---|---|---|---|

### Low

| # | Page(s) | Description | Evidence | Fix |
|---|---|---|---|---|

---

## 3. Verified Clean

The following categories were audited and are defect-free — do not re-verify:

- Brand naming — 0 stray `Publix` (lowercase x)
- Placeholder content — 0 `TODO`/`Lorem`/`FIXME`
- ...

---

## 4. Categories that need live-verify

- Lighthouse scores per page × mobile/desktop
- Layout at 375/768/1366/1920
- Form end-to-end (Growth Assessment `#review`)
- Cookie banner behavior on re-visit
- External LinkedIn profile URLs
- Console errors / failed asset requests

---

## 5. Prioritized Action List

Only Critical + High. Fix in this order:

1. **C-1** — one-line description + file count
2. **C-2** — ...
3. **H-1** — ...

Medium + Low can batch into a follow-up polish PR.

---

## 6. Deferred items (owner action required)

Each with: what needs to happen + who should do it.

1. ...
2. ...

---

## 7. Sign-off Checklist

Legend: ✅ clean · ⚠️ open findings (see issue #) · 🔍 needs live-verify

| Page (all languages) | Links | Copy | Responsive | A11y | Perf | SEO |
|---|---|---|---|---|---|---|
| `/` | ... | ... | ... | ... | ... | ... |
| `/why-publix.html` | | | | | | |
| `/about.html` | | | | | | |
| `/team.html` | | | | | | |
| `/companies.html` | | | | | | |
| `/news.html` | | | | | | |
| `/news/*.html` | | | | | | |
| `/contact.html` | | | | | | |
| `/cookie-policy.html` | | | | | | |
| `/privacy-policy.html` | | | | | | |
| `/sitemap.xml` | | | — | — | — | |

**Ship gate:** every ⚠️ must clear. 🔍 items can go into a live-verify pass post-deploy.

---

## 8. Suggested repo follow-ups

- ...
- ...

---

*End of report.*
