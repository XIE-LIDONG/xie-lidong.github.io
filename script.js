'use strict';

// The full CV and all links work without JavaScript.
const links = [...document.querySelectorAll('nav a')];
const sections = links.map(link => document.querySelector(link.getAttribute('href')));
let scheduled = false;

function updateNavigation() {
  const headerHeight = document.querySelector('.site-header').offsetHeight;
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= headerHeight + 50) current = section;
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5) current = sections[sections.length - 1];
  for (const link of links) {
    if (link.getAttribute('href') === '#' + current.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; window.requestAnimationFrame(updateNavigation); }
}, {passive: true});
window.addEventListener('resize', updateNavigation);
document.fonts?.ready.then(updateNavigation);
document.querySelector('#year').textContent = new Date().getFullYear();
updateNavigation();
