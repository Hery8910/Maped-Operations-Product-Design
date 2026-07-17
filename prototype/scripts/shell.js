(() => {
  const languageToggle = document.querySelector('#language-toggle');
  const languageMenu = document.querySelector('#language-menu');
  const accountToggle = document.querySelector('#account-toggle');
  const accountMenu = document.querySelector('#account-menu');
  const signoutTrigger = document.querySelector('#signout-trigger');
  const languageOptions = [...document.querySelectorAll('[data-language]')];
  const savedLanguage = sessionStorage.getItem('maped-prototype-language') || 'DE';

  const menus = [
    { trigger: languageToggle, menu: languageMenu },
    { trigger: accountToggle, menu: accountMenu }
  ];

  function closeMenu(entry, restoreFocus = false) {
    if (!entry?.menu || entry.menu.hidden) return;
    entry.menu.hidden = true;
    entry.trigger?.setAttribute('aria-expanded', 'false');
    if (restoreFocus) entry.trigger?.focus();
  }

  function closeAll(except) {
    menus.filter((entry) => entry !== except).forEach((entry) => closeMenu(entry));
  }

  function openMenu(entry) {
    if (!entry?.menu || !entry?.trigger) return;
    closeAll(entry);
    entry.menu.hidden = false;
    entry.trigger.setAttribute('aria-expanded', 'true');
    entry.menu.querySelector('button:not([disabled])')?.focus();
  }

  function toggleMenu(entry) {
    if (entry?.menu?.hidden) openMenu(entry);
    else closeMenu(entry, true);
  }

  const languageEntry = menus[0];
  const accountEntry = menus[1];

  function applyLanguage(language) {
    languageToggle?.replaceChildren(language);
    languageOptions.forEach((option) => option.setAttribute('aria-checked', String(option.dataset.language === language)));
    sessionStorage.setItem('maped-prototype-language', language);
  }

  applyLanguage(savedLanguage);
  languageToggle?.addEventListener('click', () => toggleMenu(languageEntry));
  accountToggle?.addEventListener('click', () => toggleMenu(accountEntry));

  languageOptions.forEach((option) => option.addEventListener('click', () => {
    applyLanguage(option.dataset.language || 'DE');
    closeMenu(languageEntry, true);
  }));

  signoutTrigger?.addEventListener('click', () => closeMenu(accountEntry, true));

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const openEntry = menus.find((entry) => entry.menu && !entry.menu.hidden);
    if (openEntry) {
      event.preventDefault();
      closeMenu(openEntry, true);
    }
  });

  document.addEventListener('click', (event) => {
    menus.forEach((entry) => {
      if (entry.menu && !entry.menu.hidden && !entry.menu.parentElement?.contains(event.target)) closeMenu(entry);
    });
  });
})();
