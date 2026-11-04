# Yoga with Aoife

Aoife's yoga site — a single-page, scroll-driven site covering who she is,
the classes she offers, and how to join one.

Currently a placeholder while real content (venue, pricing, class times)
is worked out.

## Stack

Plain HTML/CSS/JS — no build step, no framework. Scroll-triggered reveal
animations are done with the native `IntersectionObserver` API
(`js/main.js`) plus CSS transitions (`css/styles.css`).

## Running locally

Just open `index.html` in a browser, or serve it:

```bash
npx serve .
```

## Testing

Requires Node.js. Install dependencies once, then:

```bash
npm install
npm run lint   # HTML validation
npm test       # Playwright smoke tests
```

CI (`.github/workflows/ci.yml`) runs both on every push/PR to `main` and
`dev`. Vercel only handles deployment — it doesn't run these checks.

## Branches and releases

- Feature branches — branch off `dev`, PR back into `dev`, and add a line
  under `[Unreleased]` in [CHANGELOG.md](CHANGELOG.md).
- `dev` — QA. Features accumulate here and can be reviewed on the `dev`
  preview deployment.
- `main` — production. A release is a `Release vX.Y.Z` PR from `dev` into
  `main` whose changelog has `[Unreleased]` renamed to `[X.Y.Z] — date`.
  Merging it deploys to production, and
  [`release.yml`](.github/workflows/release.yml) tags `vX.Y.Z` and publishes
  a GitHub Release from that changelog section.
- Versioning is SemVer, staying on `0.x` until the public launch (`v1.0.0`).

## Deployments

- **Vercel**: https://vercel.com (production branch: `main`)

No custom domain yet — Vercel's default subdomain is used until one is
bought.
