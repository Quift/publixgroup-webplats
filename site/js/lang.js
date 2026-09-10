// Mobilmeny. Länkarna i .nav__links är dolda under 920px och fälls ut som en
// panel när hamburgerknappen trycks; CSS:en styrs av .nav--open på <header>.
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.nav__burger');
  const nav = document.querySelector('.nav');
  const links = document.getElementById('nav-links');

  if (burger && nav && links) {
    const setOpen = (open) => {
      nav.classList.toggle('nav--open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.querySelector('i').className = open ? 'ph ph-x' : 'ph ph-list';
    };

    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(!nav.classList.contains('nav--open'));
    });

    // Stäng vid navigering, klick utanför och Escape
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('nav--open') && !nav.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
        setOpen(false);
        burger.focus();
      }
    });
    // Om fönstret växer till desktop ska panelen inte ligga kvar öppen
    window.addEventListener('resize', () => {
      if (window.innerWidth > 920 && nav.classList.contains('nav--open')) setOpen(false);
    });
  }

  document.querySelectorAll('.lang-dropdown__menu a[data-lang]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const langCode = link.dataset.lang;
      document.cookie = "nf_lang=" + langCode + "; path=/;";
      
      let path = window.location.pathname;
      if (path.length > 1 && path.endsWith('/')) {
        path = path.slice(0, -1);
      }
      
      const langs = ['sv', 'da', 'no', 'fi', 'de'];
      let corePath = path;
      
      for (const l of langs) {
        if (path === '/' + l || path.startsWith('/' + l + '/')) {
          corePath = path.substring(l.length + 1);
          break;
        }
      }
      
      if (corePath === '' || corePath === '/') {
        corePath = '/index.html';
      }
      
      if (!corePath.startsWith('/')) {
        corePath = '/' + corePath;
      }

      if (langCode === 'en') {
        window.location.href = corePath;
      } else {
        window.location.href = '/' + langCode + corePath;
      }
    });
  });
});
