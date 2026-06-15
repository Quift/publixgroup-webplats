document.addEventListener('DOMContentLoaded', () => {
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
