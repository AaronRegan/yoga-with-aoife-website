// JS is available: drop the no-js fallback so [data-reveal] elements
// start hidden and animate in via the observer below.
document.documentElement.classList.remove('no-js');

document.getElementById('year').textContent = new Date().getFullYear();

// Slide the slim sticky bar in once the pill nav has scrolled up out of view.
const stickyBar = document.querySelector('[data-sticky-bar]');
new IntersectionObserver(([entry]) => {
  const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
  stickyBar.classList.toggle('is-shown', scrolledPast);
}).observe(document.querySelector('.site-nav'));

const revealTargets = document.querySelectorAll('[data-reveal]');

// Stagger via data attribute — html-validate forbids inline style attributes.
revealTargets.forEach((target) => {
  const delay = target.dataset.revealDelay;
  if (delay) target.style.setProperty('--reveal-delay', `${delay}ms`);
});

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((target) => observer.observe(target));
}
