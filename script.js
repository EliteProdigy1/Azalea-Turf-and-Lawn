document.getElementById('year').textContent = new Date().getFullYear();

/* ---- Sticky nav background on scroll ---- */
const siteNav = document.getElementById('siteNav');
const onScroll = () => {
  siteNav.classList.toggle('scrolled', window.scrollY > 40);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---- Mobile nav toggle ---- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---- Scroll reveal ---- */
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

/* ---- Before / After slider ---- */
const baSlider = document.getElementById('baSlider');
const baAfterWrap = document.getElementById('baAfterWrap');
const baHandle = document.getElementById('baHandle');

function setSliderPosition(percent) {
  const clamped = Math.min(96, Math.max(4, percent));
  baAfterWrap.style.width = clamped + '%';
  baHandle.style.left = clamped + '%';
}

function positionFromClientX(clientX) {
  const rect = baSlider.getBoundingClientRect();
  const percent = ((clientX - rect.left) / rect.width) * 100;
  setSliderPosition(percent);
}

let isDragging = false;

baSlider.addEventListener('pointerdown', (e) => {
  isDragging = true;
  positionFromClientX(e.clientX);
  baSlider.setPointerCapture(e.pointerId);
});
baSlider.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  positionFromClientX(e.clientX);
});
baSlider.addEventListener('pointerup', () => { isDragging = false; });
baSlider.addEventListener('pointercancel', () => { isDragging = false; });

/* keyboard accessibility */
baHandle.setAttribute('tabindex', '0');
baHandle.setAttribute('role', 'slider');
baHandle.setAttribute('aria-label', 'Before and after comparison slider');
baHandle.setAttribute('aria-valuemin', '0');
baHandle.setAttribute('aria-valuemax', '100');
baHandle.addEventListener('keydown', (e) => {
  const current = parseFloat(baAfterWrap.style.width) || 55;
  if (e.key === 'ArrowLeft') setSliderPosition(current - 5);
  if (e.key === 'ArrowRight') setSliderPosition(current + 5);
});
