const languageToggle = document.getElementById('languageToggle');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
let currentLanguage = 'en';

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', language === 'ar');
  document.querySelectorAll('[data-en][data-ar]').forEach((element) => {
    const value = element.dataset[language];
    if (value !== undefined) element.innerHTML = value;
  });
  languageToggle.textContent = language === 'en' ? 'عربي' : 'English';
  languageToggle.setAttribute('aria-label', language === 'en' ? 'Switch to Arabic' : 'Switch to English');
}
languageToggle.addEventListener('click', () => setLanguage(currentLanguage === 'en' ? 'ar' : 'en'));
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
const contactEmail = 'yousefemad2203@gmail.com';
const emailButton = document.getElementById('emailButton');
emailButton.href = `mailto:${contactEmail}?subject=${encodeURIComponent('Video editing project')}`;
