# Changelog

All notable changes to this site are documented in this file.

The format follows the spirit of [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This is a personal resume site rather than a published package, so version numbers below are
informal release milestones reconstructed from the git history (`git log`), grouped by the date
changes actually shipped — not tags pushed to a registry.

Each entry lists what changed **and** which part of the site (section, file, or JS function) it
affects, so it's easy to tell what to re-check after pulling a given version.

A rendered, browsable version of this file lives at [`changelog.html`](./changelog.html).

---

## [2.2.0] - 2026-08-20

### Changed
- Updated the sidebar role to **Technical Business Analyst** and added a focused specialization in
  SAP, Odoo ERP, and finance systems.
- Rewrote the About introduction in clear, natural English while retaining the existing $8M system
  rollout, 30% processing-time improvement, CBAP preparation, professional interests, and links.
- Kept the intentionally masked public contact details unchanged.

**Affected:** Sidebar title and About introduction (`index.html`), changelog documentation
(`CHANGELOG.md`, `changelog.html`)

---

## [2.1.1] - 2026-07-10

### Changed
- Masked the public phone number and swapped the sidebar email to a generic contact address, to
  reduce personal info exposed on the public page.

**Affected:** Sidebar contact list (`index.html` → `.contacts-list`)

---

## [2.1.0] - 2026-07-03

### Added
- New **US Sugar** entry in the Portfolio grid (ERP category), with description, tech tags, and
  outbound link, using the `data-project-*` fields introduced in 2.0.0.

### Changed
- Page `<title>` simplified back to "Nguyen Thanh Dat — Business Analyst".
- Minor markup cleanup/de-duplication around the portfolio project list.

**Affected:** Portfolio section (`index.html` → `.project-list`), document `<title>`

---

## [2.0.0] - 2026-07-02

A functional-bug-fix release: the portfolio category filter had been silently broken since the
3.22 markup rework (see 1.5.0) and is now working again, plus new interactive project details and
motion.

### Fixed
- **Portfolio filter was fully broken** by three compounding bugs, now all fixed:
  - A `[data-selecct-value]` selector typo made the dropdown handler throw on every click.
  - Filtering compared the visible button label instead of the `data-value` category key.
  - The desktop filter-tag row used `data-filter-btn` markup that the JS/CSS active-state never
    targeted (introduced in 1.5.0's "Update filter buttons" change).
  - One handler now drives both the desktop tag row and the mobile dropdown, filters by
    `data-value`, and correctly highlights the active tag.
- Broken asset references: favicon path and modal image paths.
- Content bugs: page title, "Bussiness" → "Business" typo, reversed education dates, map caption,
  Air Liquide category label, and mismatched skill-bar value/width pairs.

### Added
- **Project detail modals** — clicking a portfolio card now opens a modal with description, tech
  chips, and an outbound link instead of navigating away.
- **Scroll-reveal animations** via `IntersectionObserver`, plus animated skill progress bars, with
  a `prefers-reduced-motion` fallback.

### Removed
- Unused jQuery, EmailJS, and Toastr script includes, and dead contact-form JavaScript.

**Affected:**
- `assets/js/script.js` — `filterFunc`, portfolio filter click handlers, new `projectModalFunc`
  and related `data-project-*` handlers, new scroll-reveal `IntersectionObserver` logic
- `assets/css/style.css` — modal, project-tech-chip, and reveal/animation styles
- `index.html` — Portfolio section markup (`data-project-*` attributes), project detail modal
  markup, favicon link

---

## [1.7.0] - 2026-05-13

### Changed
- Rewrote `README.md` from a generic template into a personal introduction (about the author,
  toolkit used, and project purpose).

**Affected:** `README.md` only — no site behavior changed.

---

## [1.6.0] - 2026-03-23

### Added
- `assets/resume/Corporate Resume.pdf` — a second downloadable resume file.
- Dedicated **Education** section in the Resume tab, split out from the Experience timeline.

### Changed
- Large formatting pass across the Resume and Portfolio markup (multi-line, more readable HTML);
  no visual regression intended, but the diff touches most of `index.html`.

**Affected:** Resume section (`index.html` → `.timeline`, new Education `<section>`), Portfolio
markup formatting

---

## [1.5.0] - 2026-03-22

### Added
- New **Simple MDG LTD — SAP Business Analyst** entry at the top of the Experience timeline.

### Changed
- Renamed the "Payment Platform ERP" service card to **"SAP middleware ERP"**.
- Updated testimonial name/content (Daniel Lewis → Hung Nguyen) and trimmed placeholder Lorem
  Ipsum text.
- Removed the "Embedded Systems" and "Research & Development" service cards (commented out),
  leaving only the ERP service item.
- Removed the second (Ph.D) testimonial placeholder entry.

### Fixed *(regression, later fixed in 2.0.0)*
- The desktop filter-tag row was switched from `data-select-item` to `data-filter-btn`, and the
  dropdown's `data-value` keys were rewritten to full lowercase category names
  (`"enterprise resource planning"` instead of `"erp"`). Neither markup was ever wired up to the
  filter JavaScript, which silently broke the Portfolio category filter until 2.0.0.

**Affected:** Resume timeline (`index.html` → `.timeline-list`), About service cards
(`.service-list`), testimonials modal, Portfolio filter markup (`.filter-list`, `.select-list`)

---

## [1.4.0] - 2026-02-08

### Changed
- Wired up real outbound links for the **Ruby Angels Fashion** and **Victoria Dang** portfolio
  cards (previously `#` placeholders).
- Replaced the two placeholder "Business Strategy Consulting" project cards (Eavesdrop,
  Findingschools) with a real **Air Liquide** ERP entry.

**Affected:** Portfolio section (`index.html` → `.project-list`)

---

## [1.3.0] - 2025-11-17 — 2025-11-18

### Changed
- Copy/typo fix in the About section ("workflow optimization" capitalization).
- Broad re-indentation and de-duplication pass across the Portfolio and filter markup.

**Affected:** About section copy, Portfolio markup formatting

---

## [1.2.0] - 2025-10-11 — 2025-10-18

### Changed
- Removed the unused **Publications** nav item (no matching page existed).
- Fixed broken portfolio image paths (`.assets/...` → `./assets/...`).
- Renamed the ERP portfolio category label, fixing the "Emterprises" → "Enterprises" typo, and
  aligned `data-category` values with the display labels.
- Added **ERP Setup** and **Business Strategy Consultant** placeholder project cards.
- Updated the testimonial reference's title/email to reflect a new role.
- Extended the TM Healthcare & Beauty role's end date to "Present".

**Affected:** Navbar (`.navbar-list`), Portfolio section (`.project-list`, filter labels),
testimonials, Resume timeline dates

---

## [1.1.0] - 2025-09-20 — 2025-09-27

A full content pivot: the resume was rewritten from a Machine Learning / Robotics engineering
profile to the current Business Analyst / ERP profile.

### Changed
- Replaced ML/Robotics job history (Contrel Technology, NCKU Robotic Lab, D-Soft, JSC) with
  Business Analyst roles (RMIT University, TM HealthCare & Beauty, FPT Software).
- Replaced education entries (NCKU Taiwan, Danang University of Technology) with Danang
  University of Economics and Phan Chau Trinh High School.
- Reworked the Skills section from ML/DL frameworks & CV tooling to ERP systems, BA tooling, and
  management tools.
- Fixed contact/social links (corrected GitHub handle, fixed a doubled `@gmail.com` email typo).
- Corrected "Middle Bussiness Analyst" → "Bussiness Analyst" title typo (fully fixed in 2.0.0).

### Removed
- The entire **Publications** section (2025 paper list) — not applicable to the new profile.

**Affected:** Sidebar contact/social links, Resume timeline (Experience & Education), Skills
section, About section

---

## [1.0.0] - 2025-09-14 — 2025-09-15

### Added
- Initial launch of the site: sidebar profile card, About/Resume/Portfolio/Contact navigation,
  timeline-based Experience & Education, skills bars, testimonials with modal, portfolio grid
  with category filter, and Google Maps contact block.
- Base assets: `assets/css/style.css`, `assets/js/script.js`, profile/portfolio images, and the
  first downloadable resume PDF.

**Affected:** Entire site — first commit of `index.html`, `assets/css/style.css`,
`assets/js/script.js`, and images/resume assets.

---

[2.2.0]: https://github.com/DatNguyen998/Kent_Ng_Resume/commit/cfa6f9d
[2.1.1]: https://github.com/DatNguyen998/Kent_Ng_Resume/commit/fe120d2
[2.1.0]: https://github.com/DatNguyen998/Kent_Ng_Resume/commit/0ba11fc
[2.0.0]: https://github.com/DatNguyen998/Kent_Ng_Resume/commit/a4b87e5
[1.7.0]: https://github.com/DatNguyen998/Kent_Ng_Resume/commit/ebe4116
[1.6.0]: https://github.com/DatNguyen998/Kent_Ng_Resume/commit/97e3e2b
[1.5.0]: https://github.com/DatNguyen998/Kent_Ng_Resume/commit/4dcd954
[1.4.0]: https://github.com/DatNguyen998/Kent_Ng_Resume/commit/093208a
[1.3.0]: https://github.com/DatNguyen998/Kent_Ng_Resume/commit/f684058
[1.2.0]: https://github.com/DatNguyen998/Kent_Ng_Resume/commit/b67a804
[1.1.0]: https://github.com/DatNguyen998/Kent_Ng_Resume/commit/a367ad4
[1.0.0]: https://github.com/DatNguyen998/Kent_Ng_Resume/commit/e5dc8f3
