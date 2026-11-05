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

// Booking calendar loads only on click, so no visitor data reaches Cal.com until they ask for it.
const bookingLoad = document.querySelector('[data-booking-load]');
if (bookingLoad) {
  bookingLoad.addEventListener('click', (event) => {
    event.preventDefault();
    const booking = bookingLoad.closest('[data-booking]');

    const frameWrap = document.createElement('div');
    frameWrap.className = 'booking-frame-wrap';

    // Shows through the transparent iframe until Cal.com's page paints over it.
    const loading = document.createElement('p');
    loading.className = 'booking-loading';
    loading.textContent = 'Loading upcoming classes…';

    const frame = document.createElement('iframe');
    frame.src = bookingLoad.href;
    frame.title = 'Upcoming yoga classes and booking';
    frame.className = 'booking-frame';
    frameWrap.append(loading, frame);

    const newTab = document.createElement('a');
    newTab.href = bookingLoad.href;
    newTab.target = '_blank';
    newTab.rel = 'noopener';
    newTab.className = 'text-link booking-newtab';
    newTab.textContent = 'Open the booking calendar in a new tab';

    booking.replaceChildren(frameWrap, newTab);
    booking.classList.add('is-loaded');
  });
}

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
