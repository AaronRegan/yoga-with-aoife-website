import { test, expect } from '@playwright/test';

const SECTION_IDS = [
  'hero',
  'classes',
  'timetable',
  'about',
  'contact',
];

test.beforeEach(async ({ page }) => {
  // /_vercel/insights/script.js and /_vercel/speed-insights/script.js only
  // resolve when served by Vercel itself. Stub them here so tests don't
  // depend on (or fail on the 404 from) real Vercel infra.
  await page.route('**/_vercel/insights/script.js', (route) =>
    route.fulfill({ status: 200, contentType: 'application/javascript', body: '' })
  );
  await page.route('**/_vercel/speed-insights/script.js', (route) =>
    route.fulfill({ status: 200, contentType: 'application/javascript', body: '' })
  );
});

test('loads without console errors and shows the hero', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (err) => errors.push(String(err)));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('/');

  await expect(page).toHaveTitle(/Yoga with Aoife/);
  await expect(page.locator('#hero h1')).toBeVisible();
  await expect(page.locator('#hero h1')).not.toBeEmpty();
  await expect(page.locator('#year')).toHaveText(String(new Date().getFullYear()));
  expect(errors).toEqual([]);
});

test('every planned section is present', async ({ page }) => {
  await page.goto('/');

  for (const id of SECTION_IDS) {
    await expect(page.locator(`#${id}`), `#${id} should exist`).toHaveCount(1);
  }
});

test('hero photo loads and has alt text', async ({ page }) => {
  await page.goto('/');

  const photo = page.locator('#hero .img-slot--photo img');
  await expect(photo).toHaveAttribute('alt', /\S/);
  await expect
    .poll(() => photo.evaluate((img) => img.complete && img.naturalWidth))
    .toBeGreaterThan(0);
});

test('classes grid: three class types, each with a title and description', async ({ page }) => {
  await page.goto('/');

  const items = page.locator('#classes .class-item');
  await expect(items).toHaveCount(3);
  for (const item of await items.all()) {
    await expect(item.locator('h3')).not.toBeEmpty();
    await expect(item.locator('p')).not.toBeEmpty();
  }
  await expect(page.locator('#classes')).toContainText('Private Sessions');
  await expect(page.locator('#private')).toHaveCount(1);
});

test('every in-page link points at an element that exists', async ({ page }) => {
  await page.goto('/');

  const targets = await page.$$eval('a[href^="#"]', (links) =>
    links.map((link) => link.getAttribute('href').slice(1))
  );
  expect(targets.length).toBeGreaterThan(0);

  for (const id of targets) {
    await expect(page.locator(`#${id}`), `link target #${id} should exist`).toHaveCount(1);
  }
});

test('scroll-reveal content animates in as it enters the viewport', async ({ page }) => {
  await page.goto('/');

  const aboutCopy = page.locator('#about .about-copy');
  await expect(aboutCopy).not.toHaveClass(/is-visible/);

  await aboutCopy.scrollIntoViewIfNeeded();
  await expect(aboutCopy).toHaveClass(/is-visible/);
});

test('reduced motion shows all content without scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.locator('#contact .contact')).toHaveCSS('opacity', '1');
});

test('no horizontal overflow on a small phone', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

// Pre-launch only: delete or invert this test as part of the v1.0.0 launch.
test('pre-launch: page is noindex and AI crawlers are blocked', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);

  const robots = await (await request.get('/robots.txt')).text();
  const groups = robots.split(/\n\s*\n/);
  const aiGroup = groups.find((g) => /User-agent: GPTBot/.test(g));
  const catchAll = groups.find((g) => /User-agent: \*/.test(g));

  expect(aiGroup).toMatch(/User-agent: ClaudeBot/);
  expect(aiGroup).toMatch(/^Disallow: \/$/m);
  // Search engines must still be able to fetch the page to see the noindex.
  expect(catchAll).not.toMatch(/^Disallow: \/$/m);
});

test('fonts are self-hosted, never fetched from Google', async ({ page }) => {
  const fontRequests = [];
  page.on('request', (req) => {
    if (req.resourceType() === 'font' || /fonts\.(googleapis|gstatic)\.com/.test(req.url())) {
      fontRequests.push(req.url());
    }
  });

  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  expect(fontRequests.some((url) => /fonts\.(googleapis|gstatic)\.com/.test(url))).toBe(false);
  expect(fontRequests.some((url) => url.includes('/assets/fonts/'))).toBe(true);
  expect(await page.evaluate(() => document.fonts.check('300 1em Montserrat'))).toBe(true);
  expect(await page.evaluate(() => document.fonts.check('italic 400 1em "Cormorant Garamond"'))).toBe(true);
});

test('slim sticky bar appears only after scrolling past the nav', async ({ page }) => {
  await page.goto('/');

  const bar = page.locator('[data-sticky-bar]');
  await expect(bar).not.toHaveClass(/is-shown/);
  await expect(bar).toBeHidden();

  await page.locator('#about').scrollIntoViewIfNeeded();
  await expect(bar).toHaveClass(/is-shown/);
  await expect(bar.getByRole('link', { name: 'Join a class' })).toBeVisible();

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(bar).not.toHaveClass(/is-shown/);
});
