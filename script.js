const revealItems = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('nav a');
const headerEl = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');

if (menuToggle && headerEl) {
  menuToggle.addEventListener('click', () => {
    const isOpen = headerEl.classList.toggle('nav-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      headerEl.classList.remove('nav-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 70, 250)}ms`;
  io.observe(item);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', isActive);
      });
    });
  },
  { rootMargin: '-40% 0px -45% 0px' }
);

['about', 'experience', 'skills', 'contact'].forEach((id) => {
  const section = document.getElementById(id);
  if (section) sectionObserver.observe(section);
});

// Insert current year into #current-year (moved from inline HTML)
(() => {
  const el = document.getElementById('current-year');
  if (!el) return;
  try {
    el.textContent = new Date().getFullYear();
  } catch (e) {
    // fail silently
  }
})();
