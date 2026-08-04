(function () {
  var STORAGE_KEY = 'publix_cookie_consent';
  var GA_ID = 'G-F39X0LXQTH';

  var COPY = {
    en: {
      text: 'We use Google Analytics cookies to understand how visitors use this site. You can accept or decline.',
      link: 'Cookie policy',
      accept: 'Accept',
      decline: 'Decline'
    },
    sv: {
      text: 'Vi använder Google Analytics-cookies för att förstå hur besökare använder sajten. Du kan acceptera eller avböja.',
      link: 'Cookiepolicy',
      accept: 'Acceptera',
      decline: 'Avböj'
    },
    da: {
      text: 'Vi bruger Google Analytics-cookies for at forstå, hvordan besøgende bruger sitet. Du kan acceptere eller afvise.',
      link: 'Cookiepolitik',
      accept: 'Acceptér',
      decline: 'Afvis'
    },
    no: {
      text: 'Vi bruker Google Analytics-informasjonskapsler for å forstå hvordan besøkende bruker nettstedet. Du kan godta eller avslå.',
      link: 'Informasjonskapselpolicy',
      accept: 'Godta',
      decline: 'Avslå'
    },
    fi: {
      text: 'Käytämme Google Analytics -evästeitä ymmärtääksemme, kuinka kävijät käyttävät sivustoa. Voit hyväksyä tai kieltäytyä.',
      link: 'Evästekäytäntö',
      accept: 'Hyväksy',
      decline: 'Hylkää'
    },
    de: {
      text: 'Wir verwenden Google Analytics-Cookies, um zu verstehen, wie Besucher diese Website nutzen. Sie können zustimmen oder ablehnen.',
      link: 'Cookie-Richtlinie',
      accept: 'Akzeptieren',
      decline: 'Ablehnen'
    }
  };

  function lang() {
    var l = (document.documentElement.getAttribute('lang') || 'en').slice(0, 2).toLowerCase();
    return COPY[l] ? l : 'en';
  }

  function policyHref() {
    // All pages that reference cookie-policy.html sit at the same depth as it.
    return 'cookie-policy.html';
  }

  function loadGA() {
    if (window.__publixGaLoaded) return;
    window.__publixGaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  function removeExistingBanner() {
    var existing = document.getElementById('cookie-banner');
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
  }

  function renderBanner() {
    removeExistingBanner();
    var c = COPY[lang()];
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', c.link);
    banner.innerHTML =
      '<p class="cookie-banner__text">' + c.text +
        ' <a href="' + policyHref() + '">' + c.link + '</a></p>' +
      '<div class="cookie-banner__actions">' +
        '<button type="button" class="btn btn--on-navy btn--sm" data-consent="accept">' + c.accept + '</button>' +
        '<button type="button" class="btn btn--on-navy-outline btn--sm" data-consent="decline">' + c.decline + '</button>' +
      '</div>';
    document.body.appendChild(banner);
    banner.querySelector('[data-consent="accept"]').addEventListener('click', window.acceptCookies);
    banner.querySelector('[data-consent="decline"]').addEventListener('click', window.declineCookies);
  }

  function hideBanner() {
    var b = document.getElementById('cookie-banner');
    if (b) b.classList.add('hidden');
  }

  window.acceptCookies = function () {
    try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch (e) {}
    hideBanner();
    loadGA();
  };

  window.declineCookies = function () {
    try { localStorage.setItem(STORAGE_KEY, 'declined'); } catch (e) {}
    hideBanner();
  };

  window.resetCookieChoice = function () {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    renderBanner();
  };

  function init() {
    var choice = null;
    try { choice = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (choice === 'accepted') {
      removeExistingBanner();
      loadGA();
    } else if (choice === 'declined') {
      removeExistingBanner();
    } else {
      renderBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
