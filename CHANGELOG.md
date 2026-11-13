# Changelog

All notable changes to this site are logged here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) — newest entry on
top. Features merged into `dev` are listed under `[Unreleased]`; a release
turns that into a version heading, and merging the release to `main` tags
it automatically (see `.github/workflows/release.yml`).

## [Unreleased]

### Added

- Launch hardening, matching the dietitian site: security headers
  (including a content security policy that allows only the booking
  calendar frame), the public vercel.app addresses redirect to
  yoga.aoifeoneill.ch, a branded English/French "page not found" page,
  project files kept out of the deployment, and read-only CI permissions.
- French version of the site at `/fr/`, with an "EN / FR" switcher in the
  top-right of the header. The French text is a first translation for
  Aoife to review.
- Class booking: the Timetable section's "See upcoming classes" button
  loads Aoife's Cal.com events page in place (only once clicked, so
  nothing is sent to Cal.com before then). New classes she adds in
  Cal.com appear automatically.
- Classes grid icons: a seated-figure illustration for each class type —
  Group Classes (instructor + 2 students on mats), Private Sessions
  (1-on-1), Online Classes (solo, on a phone) — replacing the generic
  "Photo" placeholders.
- Favicon: the brand's lotus mark as a self-hosted SVG.
- Aoife's photo in the hero circle, replacing the placeholder.
- Project scaffold: tooling (lint + Playwright tests), CI and release
  workflows, CLAUDE.md, README and this changelog.
- Placeholder page built from Aoife's design canvas: hero, pull-quote
  band, Classes (Group/Private/Online), a placeholder Timetable section,
  About, and a Join-a-class contact section.
- Design foundation: light slate blue and poppy vermilion palette,
  self-hosted Montserrat + Cormorant Garamond italic typography.
- Self-hosted fonts (no Google Fonts CDN, for GDPR).
- Sticky header with skip link, visible focus rings, and reduced-motion
  support.
- Pre-launch block on search engines and AI crawlers (`noindex` meta tag
  and a `robots.txt` blocking AI bots) so placeholder content isn't
  indexed or learned before launch.
- Tests for section structure, in-page links, mobile overflow, reduced
  motion, and self-hosted fonts.

### Changed

- Footer: "Also by Aoife" now links to Aoife's dietitian site,
  aoifeoneill.ch, replacing the placeholder text.
- Contact: Aoife's real email address (aoife.oneill.practice@gmail.com) replaces the
  placeholder on the "Email me" button and the written address.
- Navigation tidied so every link goes to one place: the nav is Home,
  Classes, Timetable, About and Contact (Private Sessions removed); the
  floating "Join a class" button goes to the timetable; the top of the
  page has a single "See classes" button. Button text no longer wraps
  onto two lines on phones.
- Class cards are now clickable: Group and Online go to the timetable,
  Private Sessions goes to Contact (with a line saying to get in touch to
  arrange one).
- Contact section: "Get in touch" with an "Email me" button that opens an
  email with the subject filled in (placeholder address for now),
  replacing the "Join a class / View timetable" block.
- "Ways to practise" icons: the grey yoga mats under the figures are
  gone.
- "Ways to practise" icons redrawn as thin line drawings of a seated,
  cross-legged figure, with short sun rays around the teacher's head and
  each mat drawn as a single line.
- Hero photo: Aoife sitting cross-legged on a yoga mat, replacing the
  mountain-path seated twist.
- Documented showing each change in the preview panel before merging
  into `dev` (no change to the site itself).
