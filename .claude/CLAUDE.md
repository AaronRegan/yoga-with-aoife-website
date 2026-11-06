# Yoga with Aoife — Website

Single-page, scroll-driven site for Aoife's yoga teaching: who she is, the
classes she offers, and how to join one. The design system is set (below);
most copy is still placeholder — her design canvas's wording is a strong
steer but not yet final content.

**This is the yoga site only.** Aoife's dietitian site is a separate
project: repo `AaronRegan/aoifes-website`, local `~/Development/aoifes-website`,
its own Vercel project, CLAUDE.md, changelog and releases. Dietitian
content, design or tooling changes never go in this repo — if a request is
about the dietitian practice, point to that project instead. The two sites
will get separate domains and be cross-linked later only via an "Also by
Aoife" footer link (already slotted in this design) and JSON-LD `sameAs`
at launch.

## Who you're working with

**By default it's Aaron**, a software engineer who owns the repo. Work as
everything below describes.

**If the person says they are Aoife**, switch to working as her **web
consultant**. She's the client, not an engineer, and has no coding
experience. Keep the development side out of her way:

- **Talk in plain language.** Describe changes by what she'll see on the
  page, not how they're built. No unexplained jargon: no "PR", "branch",
  "merge", "CI", "commit", "deploy", "CSS" and so on. If a technical idea
  matters, explain it in one everyday sentence.
- **Work as questions and answers with examples.** Ask one or a few
  questions at a time, each with concrete options to pick from: sample
  wording, before/after, or a quick visual mockup in the chat. Recommend
  one option and say why in a sentence. Never leave her a blank question
  she'd need expertise to answer.
- **Do all the development yourself**, start to finish, following the
  feature flow below.
- **Batch her changes, and show each one live**:
  - One branch per goal, not per session (see "Scope each branch by its
    goal first" below), e.g. `content/class-descriptions`. When she moves
    on to a different part of the site, ask in plain words whether to send
    what's done first ("Shall I send the Classes changes before we start
    on About?"), then start a new branch for the new goal.
  - Keep the `static-site` preview running in the browser panel beside
    the chat (`preview_start`, don't stop it at the end of a turn). After
    each change, reload it and scroll to the changed spot so she sees it
    straight away. Commit as you go, with a changelog line per change.
  - Only when she says "send it" (or before the session ends — ask her
    first): run lint and tests, open one PR into `dev`, merge once CI is
    green. Then tell her it's on the preview:
    `yoga-with-aoife-website-git-dev-aaronregan.vercel.app`.
  - The panel copy is local to this computer; the preview link only
    changes when a batch is sent.
- **Never take anything to production for her.** No `dev` → `main` PRs, no
  releases, no tags. When she's happy with something, tell her Aaron will
  put it live, and list what's waiting on `dev` in plain words.
- **Never ask her to** run commands, use GitHub or Vercel, read code or
  diffs, or check logs. Verify things yourself and show her results
  visually.
- **Hand infrastructure decisions to Aaron**: hosting, domains and DNS,
  accounts and billing, analytics or tracking changes, security, repo
  settings, new tools or dependencies. Explain simply that it's Aaron's
  area, and record what she wants in the PR description so he sees it.
- **The project rules still hold**, explained to her in plain terms:
  - Readability (contrast) rules: if a colour she picks is hard to read,
    say so and offer the closest option that works.
  - Self-hosted fonts.
  - Changelog lines.
  - The pre-launch search-engine block: real content she supplies can go
    onto `dev`, but it only reaches the public when Aaron releases it.
  - Design changes she asks for are her call. Update the design-system
    notes below to match.

## Stack

Plain HTML/CSS/JS. No build step, no framework, no backend, no package.json
for the site itself. Keep it that way unless there's a concrete reason to
add tooling (e.g. the page genuinely outgrows a single CSS/JS file). Don't
introduce a framework, bundler, or dependency to solve a problem that
doesn't exist yet.

- `index.html` — all page sections in one file.
- `css/styles.css` — all styles.
- `js/main.js` — scroll-reveal (`IntersectionObserver`) + small utilities.
- `assets/` — images, etc. `assets/fonts/` holds the self-hosted woff2 fonts
  and their OFL licenses (the same Montserrat/Cormorant Garamond families as
  the dietitian site — self-hosted separately here, never shared across
  repos at runtime).

## Scroll animations

"Things move into place as you scroll" is implemented via `[data-reveal]`
elements: CSS starts them faded/translated, and `main.js` toggles
`.is-visible` on them via `IntersectionObserver` as they enter the
viewport. The `no-js` class on `<html>` is a progressive-enhancement
fallback (content stays visible if JS fails) — removed by `main.js` on
load. Extend this pattern rather than introducing an animation library
unless a design genuinely needs more than CSS transitions can do.

Stagger with `data-reveal-delay="<ms>"` (main.js turns it into a
`--reveal-delay` custom property — html-validate forbids inline `style`).
Under `prefers-reduced-motion` everything is shown immediately.

## Content policy

Nothing goes on the public site until Aoife or Aaron supplies or confirms
it; keep text as obvious placeholders (`[Venue name]`, `[Street address,
town]`, pricing, etc.) until then.

**Real content already supplied, from her design canvas** (2026-11-04,
"Yoga with Aoife Website" canvas, board `Main.dc.html` — use as-is; it
reaches the public only when Aaron releases, and the pre-launch block
still applies):
- Brand name: **Yoga with Aoife**. Tagline (italic, Cormorant Garamond):
  "English yoga classes in Geneva".
- Hero headline: "Space to breathe, move and slow down." Intro paragraph:
  vinyasa and hatha flows, options for every level.
- Pull-quote band: "Yoga for every body. Come as you are, and leave
  feeling a little lighter and a little stronger."
- Three class types (Classes grid): Group Classes ("Weekly classes in a
  small, friendly group"), Private Sessions ("One-to-one yoga, tailored to
  your needs and wishes"), Online Classes ("Practise from home, wherever
  you are").
- About me, four paragraphs (her wording): yoga has been part of her life
  since she was a teenager, a constant through different seasons; she also
  works as a dietitian, with a holistic view of movement, nourishment,
  breath and rest (this is the explicit link to the dietitian site — keep
  it, it's her own framing, not ours); classes balance movement and
  stillness, some dynamic and strength-building, others slow and calming;
  she teaches in English but also speaks French and can support students
  in French.
- Hero photo (2026-11-06, Aaron supplied; replaces the 2026-11-04 seated
  twist on a mountain path from her canvas): `assets/images/aoife-hero.jpg`,
  Aoife smiling, sitting cross-legged on a blue yoga mat against a white
  wall. Resized to 900×1306 (~43 KB), converted from Display P3 to sRGB,
  and the whole EXIF block stripped. The original had no GPS, but did
  carry a capture date/time, which we don't publish. Shown in the hero
  circle via `.img-slot--photo` with `object-position: 50% 58%`, which
  fits head (with headroom) to mat inside the circle. Alt "Aoife smiling,
  sitting cross-legged on a yoga mat".
- **Photo prep recipe** (no Pillow/ImageMagick on this machine):
  `sips -m "/System/Library/ColorSync/Profiles/sRGB Profile.icc"
  --resampleWidth 900 -s format png`, then `sips -s format jpeg -s
  formatOptions low`. `sips` re-adds a small EXIF block, including the
  original capture date, so drop the `Exif` APP1 segment afterwards
  (a short byte-level Python script) and check with `file` that "Exif"
  no longer appears.
- Footer cross-link slot: "Also by Aoife: [Practice Name] · Paediatric
  Dietitian →" — kept as a placeholder link (no real URL yet, no domains
  bought). Fill in once both sites' domains exist (see the two-domains
  plan at the top of this file).

**Class booking — Cal.com Events** (2026-11-05, Aaron's choice): the
Timetable section (ours — her canvas linked to `#timetable` but had no such
section) has a "See upcoming classes" button for her Cal.com events page,
`https://cal.com/aoifeoneill/events?theme=light`.
- **Why Events, not a seated event type:** her classes are ad hoc, with no
  weekly rhythm. Each class is a one-off Cal.com Event with its own date,
  capacity ("spots remaining" → "Sold out" / waitlist) and optional
  approval. Guests register without a Cal.com account. If she settles into
  a fixed weekly class, a seated event type would be less work for her;
  the site change would just be that one link.
- **The site never lists individual classes.** It only points at the
  `/events` directory, so publishing a new Event in Cal.com shows up with
  no site change. Don't switch to per-Event embeds. Events with "Private
  event" switched on don't appear in the directory.
- **Click-to-load, for GDPR:** nothing is requested from Cal.com until the
  visitor clicks. `main.js` then swaps the button for an iframe of the
  same URL plus an "open in a new tab" link. Without JS, the button is a
  plain link that opens the page in a new tab. A test enforces "no Cal.com
  request before the click" — keep it. It's a plain iframe, not Cal.com's
  `embed.js` (no third-party script on our page). Cal.com sends no
  frame-blocking headers (checked 2026-11-05); if it ever starts, the
  new-tab link still works.
- `?theme=light` keeps Cal.com's page light, matching the site; it
  otherwise follows the visitor's OS dark mode. Her brand colour and other
  styling inside the iframe are Cal.com settings (Appearance), not ours.

**Still placeholder / not yet designed**:
- Venue name/address, pricing, email, phone — all still bracketed
  placeholders.
- "Geneva" (from the tagline) is treated as confirmed, since it's her own
  canvas copy; don't add more specific location detail (exact studio
  address, neighbourhood) until supplied.

## Design system

**Source of truth: Aoife's design canvas**, "Yoga with Aoife Website"
(https://claude.ai/artifact/Rv399C2hyS4k7Q6oTDQ6MG), board `Main.dc.html` —
light slate blue + poppy vermilion, adopted 2026-11-04. It's the only board
in the canvas (no variants to choose between). The matching flier artifact
("Yoga Class Flier", board `Website.dc.html`) confirms this as her chosen
direction — its other boards (`Main`, `WithPhoto`, `Dancer`) are a
different flier-only direction (mustard/plum, Bricolage Grotesque) and
aren't used here. Colours, fonts and section content come from her design;
the Timetable placeholder and scroll-reveal flow are ours. Tokens live in
`:root` in `css/styles.css` — use them, don't add raw hex values.

- **Palette**: `--slate` (`#E2E8F1`) page background, `--slate-mid`
  (`#7C8EB4`) the pull-quote band, `--vermilion` (`#CF3D25`) header/footer
  and primary buttons, `--vermilion-deep` (`#B8341F`) headings, links,
  outlines and secondary buttons, `--vermilion-hover` (`#8E2614`) hover
  state, `--text` (`#2E3A55`) body text, `--line` (a light slate-blue
  hairline, e.g. `#C3CDDD`) dividers.
- **Contrast rules** (WCAG AA — checked 2026-11-04, don't regress):
  - `--cream-text` (`#FFF6F2`) on `--vermilion` (header/footer): 4.54:1 —
    passes normal text, but only just. Don't darken the header background
    or lighten its text further without rechecking.
  - `--cream-text` on `--vermilion-deep` (filled buttons): 5.56:1 — safe
    margin.
  - `--vermilion-deep` on `--slate` (headings, links, pill text): 4.80:1 —
    passes.
  - `--text` on `--slate` (body copy): 9.20:1 — excellent.
  - `--vermilion-hover` on `--slate`: 6.99:1 — safe.
  - White on `--slate-mid` (pull-quote band): **3.29:1 — fails AA for
    normal text, passes only as "large text" (≥24px / ≥18.66px bold).**
    Keep the band's quote at ≥24px (the canvas uses 28px) and never use
    that pairing for smaller text. Switching the band text to `--text`
    (3.45:1) doesn't meaningfully help — if the band ever needs smaller
    text, darken the band background and recheck, don't just swap the
    text colour.
- **Type**: Montserrat (everything; light 300 for headings and the brand
  name, uppercase with tracking for the brand) and Cormorant Garamond
  italic as the accent (tagline, the pull-quote intro-style lines). Same
  font families as the dietitian site, coincidentally — self-hosted
  independently in this repo's own `assets/fonts/`.
- **Fonts are self-hosted** from `assets/fonts/` — never link Google
  Fonts, even though her canvas does. Their CDN sends visitor IPs to
  Google, which EU courts ruled a GDPR issue; a test enforces this.
- **Boxes — flat**: no cards, shadows or illustrations beyond the brand
  mark. Outline pills (`.pill`, 1px `--vermilion-deep`) for nav; filled
  pill buttons (`.btn-primary` vermilion, `.btn-outline` on slate
  backgrounds); a circle photo in the hero; square-cornered 4:5 photo
  blocks in the Classes grid; hairline dividers between sections.
- **Brand mark**: a simple line-drawn lotus/plant silhouette (from her
  canvas), decorative (`aria-hidden`), used in the header and sticky bar.
  The same mark is the favicon (`assets/favicon.svg`, 2026-11-04): cream
  lotus strokes on a rounded vermilion square, legible down to tab-icon
  size. One self-hosted SVG file, no build step or PNG fallbacks needed —
  linked via `<link rel="icon" type="image/svg+xml">`.
- **Header**: tall vermilion header (brand mark, brand name, tagline) with
  the pill nav row beneath. A slim fixed `.sticky-bar` (name + "Get in
  touch"-equivalent CTA) slides in once the pill nav scrolls out of view
  (`main.js`), and is `visibility: hidden` until then so it's out of the
  tab order — same mechanism as the dietitian site.
- **Images**: real photos live in `assets/images/` and sit in their slot
  with `.img-slot--photo` (a ring of the slot colour, image cropped with
  `object-fit: cover`). Check new photos for EXIF/GPS before committing.
  The hero photo is real (see Content policy above).
- **Classes grid icons** (final redraw 2026-11-06, `.class-icon` tiles,
  `--slate-pale` background): one shared seated-figure drawing,
  `#seated-figure`, plus `#sun-rays`, both in a hidden `.svg-defs` block
  above the grid and placed with `<use>`. The style is a thin, even line in
  the manner of a typical line-icon set. The figure has a round head;
  narrow rounded shoulders; upper arms dropping almost straight down, then
  bending at the elbow so the forearms angle out and the hands end just
  above the knees; two inner lines that run down the torso and continue
  round each knee as the legs, meeting in a shallow V at the bottom; and
  two small curves on top for the feet. Short sun rays around the head
  mark the teacher (Group and Private only; not on the small phone figure).
  - **Origin:** Aaron picked it after several rounds, from the cross-legged
    "meditation" icon in a stock "Wellness 30 line icons" set (iStock,
    2026-11-06). **It's our own drawing in that style, not a copy or trace —
    the stock icons are licensed; keep it that way.** Rejected along the
    way: the chunky rounded figure (2026-11-04), thin stick figures, an
    arms-overhead pose, and a flowing calligraphic figure with
    infinity-loop legs.
  - Coloured by role: `.figure--instructor` (`--vermilion-deep`) vs
    `.figure--student` (`--slate-mid`). Stroke `0.75` in figure units;
    because it scales with the figure, the half-size phone figure uses
    `.figure--small` (`1.5`) so all lines look the same weight.
  - **Mats are a single grey line** (`.mat`, `--mat`, stroke `0.8`),
    placed by formula, not by eye. For a figure at
    `translate(tx,ty) scale(s)`, the mat runs from `x = tx - 14*s` to
    `tx + 14*s` at `y = ty + 5.2*s`. That puts it just under the legs and a
    little past the knees. Reuse this for any new figure (e.g. a fourth
    class type).
  - Group Classes: the teacher sits higher (further back) and only slightly
    larger than the two students (Aaron, 2026-11-04: no big size gap).
    Mats must never touch each other or a figure. Online Classes: the
    figure on a phone outline (`.device`, stroke `0.9`), clipped to the
    screen via `clipPath`.
- **Grids**: the 3-item Classes grid uses explicit breakpoints (not
  `auto-fit`) so an item is never orphaned on its own row.
- For new visual directions beyond this system, ask first.

## Branch strategy and release cycle

- `main` — production. Deploys to the live site (Vercel, production
  branch = `main`). Every merge to `main` is a release.
- `dev` — QA. Features accumulate here and are reviewed on the stable
  preview URL `yoga-with-aoife-website-git-dev-aaronregan.vercel.app`
  (behind Vercel login). Never the production domain.
- Branch protection should be enabled on `main` once it exists remotely
  (PR required, no direct pushes, including for repo admins — no bypass) —
  see the reminder at the end of this file.

**Scope each branch by its goal first.** Before creating a branch, work
out what the set of changes is trying to achieve and name the branch after
that goal, not a date or "batch" (e.g. `content/class-descriptions`,
`feature/contact-form`, `chore/release-workflow`). Bundle changes that
serve the same goal; when a request doesn't fit the current branch's goal,
finish/send that branch first or start a separate one (ask if unsure).
Each merge into `dev` should be one coherent unit with a PR description
that states the goal.

**Feature flow**: branch off `dev` (`feature/*`, `content/*`, `chore/*`) →
**show the change in the browser panel and wait for the user's OK** → PR
into `dev` → Claude merges once CI is green. Each feature adds a line
under `## [Unreleased]` in CHANGELOG.md. **Don't open a `dev` → `main` PR
after each feature** — features batch up on `dev` until the user asks for
a release.

**Show before merging** (Aaron, 2026-11-04): never merge into `dev` until
the user has seen the change. Serve the branch with the `static-site`
preview in the browser panel, scroll to the changed spot (check phone
width too when layout changes), say what changed, and wait for an
explicit OK. Docs-only changes: show the changed text instead. Keep the
working tree on the branch being reviewed while waiting, because the
panel serves whatever is checked out. In Aoife mode, her "send it" is
that OK.

**Release flow** (only when the user asks to cut/ship a release):
1. On a `release/vX.Y.Z` branch off `dev`, turn `## [Unreleased]` into
   `## [X.Y.Z] — YYYY-MM-DD` (leave a fresh empty `## [Unreleased]` above
   it) → PR into `dev` → merge.
2. Open a PR `dev` → `main` titled `Release vX.Y.Z`, with the changelog
   section as the body.
3. The user reviews and merges it. **Claude never merges into `main`.**
4. `.github/workflows/release.yml` runs on the push to `main`: it reads the
   newest `## [X.Y.Z]` heading, creates tag `vX.Y.Z` and a GitHub Release
   with that section as notes. It skips (with a warning) if that version
   is already released — so a merge to `main` without a version bump is a
   mistake.

**Versioning** (SemVer, `0.x` until real launch): minor = new sections or
features, patch = fixes and copy tweaks. `v1.0.0` = public launch with real
content and a custom domain.

**Hotfix**: `hotfix/*` off `main` → bump the patch version in CHANGELOG.md
in the same branch → PR into `main` (user merges; tagged automatically) →
then merge `main` back into `dev` so they don't drift.

**Rollback**: Vercel's instant rollback to the previous production
deployment; tags identify which commit each release was.

**CI gotcha**: GitHub Actions sometimes leaves a run stuck "in_progress"
after the job has actually finished. Check the **test job's** conclusion
via `gh api repos/AaronRegan/yoga-with-aoife-website/actions/runs/<id>/jobs`
and treat a successful test job as green, rather than trusting a stuck
overall run status.

## Deployment

Static site — deploys to Vercel with zero config (no build command, output
directory is the repo root). Vercel's GitHub app auto-imported the repo
(2026-11-04) the moment `main` was pushed — project `yoga-with-aoife-website`
under team `aaronregan`, framework auto-detected as none, production
branch `main`. No custom domain yet — Vercel's default subdomain is used
until one is bought.

**Watch for duplicate projects**: the same auto-import created a second,
auto-suffixed project (`yoga-with-aoife-website-6ii7`) off the same repo
when `dev` was pushed shortly after. Vercel project deletion needs
dashboard confirmation (no non-interactive API path), so if you ever see
more than one Vercel project tracking this repo, that's why — check
before assuming a second one means something changed.

Vercel only handles *deployment* (auto-build/publish on push to `main`) —
it doesn't run lint or tests as a gate. That's what the GitHub Actions
workflow below is for.

## Analytics & performance monitoring

`index.html` has inline snippets for Vercel Web Analytics
(`/_vercel/insights/script.js`) and Vercel Speed Insights
(`/_vercel/speed-insights/script.js`). No npm packages — these are the
plain-HTML/no-framework integration (a fixed same-origin route Vercel
serves once the feature is enabled in the project dashboard), keeping the
zero-build-step setup intact. Both routes only resolve on Vercel's own
infra, so `tests/site.spec.js` stubs them to avoid 404 noise elsewhere.

Enabling them is Aaron's job: both `vercel project web-analytics` and
`vercel project speed-insights` require interactive CLI confirmation with
no skip flag, and there's no non-interactive MCP/API path either — enabling
Speed Insights specifically also upgrades the project to Speed Insights
Plus (a paid tier change), so this stays a dashboard action, not something
done on Aaron's behalf.

## Languages (French planned, built later)

Aoife's own canvas copy says she teaches in English but also speaks French
and can support students in French — so, unlike the dietitian site, French
is core to this offering, not a "nice to have". Even so, **don't build the
French page yet** — it gets built once the English copy is close to final,
so a design/content change isn't made twice. Keep the English page
French-ready in the meantime, same approach as the dietitian site:

**Decided approach**:
- A separate static page, `fr/index.html`, sharing `css/`, `js/`, and
  `assets/` with the English `index.html` at `/`. `lang="fr"` on its
  `<html>`.
- A plain-link "EN / FR" switcher in the header (no JS).
- `hreflang` alternate links on both pages (`en`, `fr`, `x-default` → `/`).
- No automatic redirect by browser language.
- Rejected: a JS translation toggle (the French text wouldn't be in the
  HTML, and most crawlers — nearly all AI crawlers — don't run JS); a
  static site generator (breaks the no-build-step setup; revisit only if
  the site grows to several pages); auto-translate widgets (quality risk,
  and they send visitor data to third parties).

**Until then, keep the English page French-ready:**
- All user-facing text lives in the HTML — never inside images, SVGs, or
  JS strings.
- Leave room in the header for the switcher.
- No fixed-width buttons or tight text containers — French typically runs
  15–20% longer.

**When it's built:** a parity test so both pages keep the same section
IDs, links, and structure; run the 375px overflow test on both pages; the
`pre-launch:` noindex applies to `/fr/` too until launch; real French copy
translated or reviewed by a fluent speaker — Aoife herself speaks French,
so she's a natural reviewer, but confirm with her directly rather than
assuming. Still to decide with the user: which French audience (the canvas
says "Geneva", so likely Swiss French), which sets the `hreflang` code and
some word choices.

## Search and AI discoverability

**Current state: pre-launch block.** While content is placeholder, the
site is kept out of search engines and AI models on purpose, so the first
thing they learn about "Yoga with Aoife" isn't a Coming Soon page:
- `<meta name="robots" content="noindex, nofollow">` in `index.html` —
  Google/Bing (and the AI search products that use their indexes) won't
  list the page.
- `robots.txt` blocks AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, CCBot, etc.), which don't reliably honour `noindex`.
  `User-agent: *` stays allowed — search engines must be able to fetch the
  page to see the `noindex`. Never `Disallow: /` for everyone.
- A `pre-launch:` test enforces both. Lift the block only as part of the
  `v1.0.0` launch, never earlier.

**Launch checklist** (do together with real content, the French page, and
the custom domain):
1. Remove the `noindex` meta (both languages); in `robots.txt` remove the
   AI block and add a `Sitemap:` line; delete or invert the `pre-launch:`
   test.
2. Add `sitemap.xml`, a canonical URL, a real meta description, and Open
   Graph tags for link previews.
3. JSON-LD structured data: a `Person`/`ExerciseAction`-style or
   professional-service entry (what she teaches, where, in-person/online,
   any teaching qualifications, `sameAs` links to her profiles — plus the
   `sameAs` link to the dietitian site, per the cross-link plan).
4. Copy that states plainly who she is, what she teaches, where (in
   person / online), and in what languages. Consider a short FAQ — LLMs
   pick up Q&A well.
5. Optional `llms.txt` (short Markdown summary). Little evidence the major
   models use it yet, but it's cheap.
6. Submit to Google Search Console and Bing Webmaster Tools (Bing feeds
   ChatGPT search and Copilot).
7. If DNS goes through Cloudflare, check its "block AI bots" setting is
   off.
8. Off-site (user's job, but remind them): Google Business Profile,
   local class-listing directories, Instagram/social profiles — with the
   same name and contact details everywhere. LLMs lean heavily on these
   when recommending local classes.

## Changelog policy

**Every change merged into `dev` gets a line under `## [Unreleased]` in
[CHANGELOG.md](../CHANGELOG.md)**, in the same PR — even small ones. This
is how design/content iterations get tracked. A release converts
`[Unreleased]` into a version heading (see release flow above); the
release workflow depends on that heading to tag the release, so every
merge to `main` must ship a new version.

## Testing & CI

- `npm run lint` — HTML validation (`html-validate`, config in
  `.htmlvalidate.json`).
- `npm test` — Playwright smoke tests (`tests/site.spec.js`): no console
  errors, every section present, in-page links resolve, scroll-reveal
  fires, reduced motion shows content, no horizontal overflow at 375px,
  fonts self-hosted. Config in `playwright.config.js` spins up a plain
  `python3 -m http.server` on **port 4174** (not 4173 — that's the
  dietitian site's port; keeping them different avoids Playwright's
  `reuseExistingServer` silently attaching to the wrong repo's server when
  both sites' preview servers happen to be running at once) to serve the
  static files — don't swap this for a bundler-based dev server.
- `.github/workflows/ci.yml` runs both on every push/PR to `main`/`dev`.
- `package.json` exists **only** for this dev/CI tooling (Playwright,
  html-validate). It must never grow a build step for the site itself —
  the deployed site stays plain static files with zero build command on
  Vercel.
- When adding new sections/markup, extend `tests/site.spec.js` with
  assertions for the new content rather than leaving it uncovered.

## Things Aaron still needs to do

1. **Repo visibility** — currently public; consider making it private
   until launch.
2. **Branch protection** on `main` once it exists remotely (PR required,
   no admin bypass).
3. **Vercel**: repo is already imported (auto-connected by Vercel's GitHub
   app). Delete the duplicate project `yoga-with-aoife-website-6ii7`
   (dashboard confirmation required — link given when this was found,
   2026-11-04), then enable Web Analytics and Speed Insights on
   `yoga-with-aoife-website` (also dashboard-only, see Deployment above).
