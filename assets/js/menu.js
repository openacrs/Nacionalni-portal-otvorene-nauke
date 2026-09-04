(() => {
  const script = Array.from(document.scripts).find(s => /assets\/js\/menu\.js(?:\?|$)/.test(s.src));
  if (!script) return;
  const root = new URL('../../', script.src);
  const u = p => new URL(p, root).href;
  const icon = (name) => {
    const icons = {
      home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.2 12 4l9 7.2v8.3a.5.5 0 0 1-.5.5H15v-6H9v6H3.5a.5.5 0 0 1-.5-.5z"/></svg>',
      search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.2" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="m15.2 15.2 5 5" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>',
      menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>',
      close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" fill="none" stroke="currentColor" stroke-width="2"/></svg>'
    }; return icons[name] || '';
  };

  const header = document.getElementById('site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML = `
      <div class="header-inner">
        <a class="brand" href="${u('')}" aria-label="Nacionalni portal otvorene nauke – početna">
          <img src="${u('images/SERBIA_LOGO-portal.png')}" alt="Serbia – Nacionalni portal otvorene nauke" class="brand-logo">
        </a>
        <nav class="site-nav" aria-label="Glavna navigacija">
          <ul class="desktop-nav">
            <li class="icon-link"><a href="${u('')}" aria-label="Početna">${icon('home')}</a></li>
            <li class="has-sub"><a href="${u('')}">OTVORENA NAUKA <span class="chev">⌄</span></a>
              <ul>
                <li><a href="${u('pristupnica/otvoreni-pristup/')}">Otvoreni pristup</a></li>
                <li><a href="${u('pristupnica/podaci/')}">Otvoreni podaci</a></li>
                <li><a href="${u('pristupnica/metodologija/')}">Otvorena metodologija</a></li>
                <li><a href="${u('pristupnica/otvorena-evaluacija/')}">Otvorena evaluacija</a></li>
                <li><a href="${u('recnik/')}">Rečnik</a></li>
              </ul>
            </li>
            <li><a href="${u('politika/')}">POLITIKA</a></li>
            <li><a href="${u('repozitorijumi/')}">REPOZITORIJUMI</a></li>
            <li class="has-sub"><a href="${u('izdavastvo/')}">IZDAVAŠTVO <span class="chev">⌄</span></a>
              <ul>
                <li><a href="${u('izdavastvo/podrska/')}">Podrška</a></li>
                <li><a href="${u('izdavastvo/centar/')}">Centar</a></li>
                <li><a href="${u('izdavastvo/politike-casopisa/')}">Politike časopisa</a></li>
                <li><a href="${u('izdavastvo/standard-za-dijamantski-otvoreni-pristup/')}">Standard za dijamantski otvoreni pristup</a></li>
                <li><a href="${u('izdavastvo/standard-za-dijamantski-otvoreni-pristup-vodic-za-casopise/')}">Vodič za časopise</a></li>
                <li><a href="${u('izdavastvo/podrska/kvalitet-u-naucnom-izdavastvu/')}">Kvalitet u naučnom izdavaštvu</a></li>
              </ul>
            </li>
            <li class="has-sub"><a href="${u('novosti/vesti/')}">NOVOSTI <span class="chev">⌄</span></a>
              <ul>
                <li><a href="${u('novosti/vesti/')}">Vesti</a></li>
                <li><a href="${u('novosti/konferencije/')}">Konferencije</a></li>
              </ul>
            </li>
            <li class="icon-link"><a href="${u('pretrazivanje/')}" aria-label="Pretraživanje">${icon('search')}</a></li>
          </ul>
        </nav>
        <button class="drawer-toggle" type="button" aria-expanded="false" aria-controls="mobile-drawer" aria-label="Otvori meni">${icon('menu')}</button>
      </div>
      <div class="drawer-backdrop" hidden></div>
      <aside class="mobile-drawer" id="mobile-drawer" aria-hidden="true">
        <button class="drawer-close" type="button" aria-label="Zatvori meni">${icon('close')}</button>
        <ul class="drawer-list">
          <li><a href="${u('')}"><span class="arrow">›</span>${icon('home')} HOME</a></li>
          <li class="drawer-has-sub"><button type="button" class="drawer-sub-toggle"><span><span class="arrow">›</span> OTVORENA NAUKA</span><span class="down">⌄</span></button>
            <ul>
              <li><a href="${u('pristupnica/otvoreni-pristup/')}">Otvoreni pristup</a></li>
              <li><a href="${u('pristupnica/podaci/')}">Otvoreni podaci</a></li>
              <li><a href="${u('pristupnica/metodologija/')}">Otvorena metodologija</a></li>
              <li><a href="${u('pristupnica/otvorena-evaluacija/')}">Otvorena evaluacija</a></li>
              <li><a href="${u('recnik/')}">Rečnik</a></li>
            </ul>
          </li>
          <li><a href="${u('politika/')}"><span class="arrow">›</span> POLITIKA</a></li>
          <li><a href="${u('repozitorijumi/')}"><span class="arrow">›</span> REPOZITORIJUMI</a></li>
          <li class="drawer-has-sub"><button type="button" class="drawer-sub-toggle"><span><span class="arrow">›</span> IZDAVAŠTVO</span><span class="down">⌄</span></button>
            <ul>
              <li><a href="${u('izdavastvo/podrska/')}">Podrška</a></li>
              <li><a href="${u('izdavastvo/centar/')}">Centar</a></li>
              <li><a href="${u('izdavastvo/politike-casopisa/')}">Politike časopisa</a></li>
              <li><a href="${u('izdavastvo/standard-za-dijamantski-otvoreni-pristup/')}">Standard za dijamantski otvoreni pristup</a></li>
              <li><a href="${u('izdavastvo/podrska/kvalitet-u-naucnom-izdavastvu/')}">Kvalitet u naučnom izdavaštvu</a></li>
            </ul>
          </li>
          <li class="drawer-has-sub"><button type="button" class="drawer-sub-toggle"><span><span class="arrow">›</span> NOVOSTI</span><span class="down">⌄</span></button>
            <ul><li><a href="${u('novosti/vesti/')}">Vesti</a></li><li><a href="${u('novosti/konferencije/')}">Konferencije</a></li></ul>
          </li>
          <li><a href="${u('pretrazivanje/')}"><span class="arrow">›</span>${icon('search')} PRETRAŽIVANJE</a></li>
        </ul>
      </aside>`;
  }

  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="footer-inner">
        <div class="footer-left">
          <img class="eu-flag" src="${u('images/flag_yellow_eps-e1447756206778.png')}" alt="European Union flag">
          <p>Sajt je nastao u okviru projekta <a href="http://www.beopen.uns.ac.rs/project.php">BE-OPEN - Boosting Engagement of Serbian Universities in Open Science</a> (Erasmus+)</p>
          <p><a href="https://www.openaire.eu/advance/">OpenAIRE Advance</a>, funded under H2020-eu.1.4.1.3, Grant Agreement no. 777541</p>
          <p><a href="https://ni4os.eu/">NI4OS-Europe</a>, funded under H2020 European research infrastructures, Grant Agreement no. 857645</p>
          <p class="licence"><a href="https://creativecommons.org/licenses/by/4.0/"><img src="${u('images/BY.png')}" alt="CC BY 4.0"></a><br><a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a></p>
        </div>
        <div class="footer-right">
          <p><a href="${u('registration-form/')}">Pristupnica Portalu za<br>kompanije i nevladine organizacije</a></p>
          <p class="contact-title">KONTAKT</p>
          <img class="mail-icon" src="${u('images/mail-png.png')}" alt="">
          <p>Tim za otvorenu nauku u Srbiji - TONuS</p>
          <p>e-mail: <a href="mailto:info@open.ac.rs">info@open.ac.rs</a></p>
        </div>
      </div>`;
  }

  const toggle = document.querySelector('.drawer-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const close = document.querySelector('.drawer-close');
  const backdrop = document.querySelector('.drawer-backdrop');
  const setDrawer = open => {
    if (!drawer || !toggle || !backdrop) return;
    drawer.classList.toggle('open', open);
    backdrop.hidden = !open;
    requestAnimationFrame(() => backdrop.classList.toggle('show', open));
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('drawer-open', open);
  };
  toggle?.addEventListener('click', () => setDrawer(true));
  close?.addEventListener('click', () => setDrawer(false));
  backdrop?.addEventListener('click', () => setDrawer(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setDrawer(false); });
  document.querySelectorAll('.drawer-sub-toggle').forEach(btn => btn.addEventListener('click', () => btn.parentElement.classList.toggle('expanded')));
})();
