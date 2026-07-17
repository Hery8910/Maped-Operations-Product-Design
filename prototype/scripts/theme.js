(() => {
  const root = document.documentElement;
  const button = document.querySelector('#theme-toggle');
  const requested = new URLSearchParams(window.location.search).get('theme');
  const saved = localStorage.getItem('maped-prototype-theme');
  const preferred = window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const apply = (theme) => {
    root.dataset.theme = theme;
    button?.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    if (button) button.textContent = theme === 'dark' ? '☼' : '◐';
  };
  apply(requested === 'light' || requested === 'dark' ? requested : (saved || preferred));
  button?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('maped-prototype-theme', next);
    apply(next);
  });
})();
