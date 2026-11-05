# Changelog

All notable changes to this site are logged here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) — newest entry on
top. Features merged into `dev` are listed under `[Unreleased]`; a release
turns that into a version heading, and merging the release to `main` tags
it automatically (see `.github/workflows/release.yml`).

## [Unreleased]

### Added

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

- Documented showing each change in the preview panel before merging
  into `dev` (no change to the site itself).
