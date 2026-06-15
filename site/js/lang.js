document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-dropdown__menu a[data-lang]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = link.dataset.lang;
      document.cookie = "nf_lang=" + lang + "; path=/;";
      
      const path = window.location.pathname;
      const file = path.split('/').pop() || 'index.html';
      
      if (lang === 'en') {
        window.location.href = '/' + file;
      } else {
        window.location.href = '/' + lang + '/' + file;
      }
    });
  });
});
