(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('languageToggle');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  let language = 'en';

  // Reveal sections and project cards as the visitor scrolls.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // A very subtle ambient light follows the pointer on desktop.
  const glows = document.querySelectorAll('.ambient-glow');
  if (window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 18;
      glows.forEach((glow, index) => {
        glow.style.transform = `translate(${x * (index ? -1 : 1)}px, ${y * (index ? -1 : 1)}px)`;
      });
    }, { passive: true });
  }

  function setLanguage(next) {
    language = next;
    root.lang = next;
    root.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-en][data-ar]').forEach((element) => {
      element.innerHTML = element.dataset[next];
    });
    toggle.textContent = next === 'en' ? 'عربي' : 'English';
    toggle.setAttribute('aria-label', next === 'en' ? 'Switch to Arabic' : 'Switch to English');
  }

  toggle.addEventListener('click', () => setLanguage(language === 'en' ? 'ar' : 'en'));
  menuButton.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(opened));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
})();