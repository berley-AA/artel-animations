/* Luz pages, phones and tablets only (under 992px, the homepage's breakpoint): the homepage's mobile nav (Nov 5, Berley).
   Same bar as the homepage: Artel dots on the left, the ARTEL wordmark in the middle, two thin lines on the right that cross,
   then pull back into four dots; the menu opens from the bar with 01 The Lab … 06 Login and the EN/FR switch.
   Copied from the site's MOBILE NAV v3.1 (site footer), MOBILE NAV MASTHEAD and MOBILE MENU DOTS + LIST (site head).
   Differences on these pages: no hairline under the bar (Berley), and links go to the homepage sections.
   From 992px up nothing changes: the Luz pages keep their own nav. */
(function () {
  if (window.__aaMobNav) return; window.__aaMobNav = 1;
  var MARK = 'https://cdn.prod.website-files.com/68bf9e7489e7a893477eea27/6a8e14492ddb283e245bbaaf_LOGO.svg';
  var WORD = 'https://cdn.prod.website-files.com/68bf9e7489e7a893477eea27/68c314cd2f42189dbde75934_Txt%20Logo%20Artel.svg';
  var css =
    ':root{--an-ease:cubic-bezier(.22,1,.36,1)}' +
    '@keyframes aa-an-fade{from{opacity:0}to{opacity:1}}@keyframes aa-an-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}' +
    /* Nov 5 (Berley): the full-screen film player sits above every nav, so the bar never covers the film or its close button */
    '#filmLayer{z-index:10010!important}' +
    '.an-header,.an-panel{display:none}' +
    '@media (max-width:991px){' +
      /* the Luz pages' own header and its menu step aside on phones and tablets */
      'html body header:not(.an-header){display:none!important}' +
      '.an-header,.an-panel{display:block}' +
      '.an-header{position:fixed;top:0;left:0;right:0;z-index:10001}' +
      /* Nov 5 (Berley): the bar is the page's own colour, so it blends in; glass.js leaves it alone */
      '.an-capsule{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;height:56px;padding:0 20px;background:var(--an-bg,#F5F5F7);color:#000;border:0;box-shadow:none}' +
      'html body .an-header,html body .an-header.aa-lg-bar{background:none!important;background-image:none!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;box-shadow:none!important;border:0!important}' +
      '.an-capsule .an-logo,.an-capsule .an-wordmark{display:block;text-decoration:none;color:inherit!important}' +
      '.an-logo{justify-self:start;width:24px;height:24px}.an-wordmark{justify-self:center;width:78.3px;height:18px}' +
      '.an-capsule .an-mask{display:block;width:100%;height:100%;background:#000!important;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:contain;mask-size:contain}' +
      '.an-logo .an-mask{-webkit-mask-image:url(' + MARK + ');mask-image:url(' + MARK + ')}.an-wordmark .an-mask{-webkit-mask-image:url(' + WORD + ');mask-image:url(' + WORD + ')}' +
      '.an-toggle{justify-self:end;display:flex;align-items:center;justify-content:center;width:40px;height:40px;margin-right:-8px;background:none;border:0;padding:0;color:#000;cursor:pointer;-webkit-tap-highlight-color:transparent}' +
      '.an-burger{position:relative;width:24px;height:8px}' +
      '.an-bar{position:absolute;left:3px;width:18px;height:1.5px;display:flex;justify-content:space-between;align-items:center;transition:transform .3s var(--an-ease) .22s}' +
      '.an-bar.t{top:0}.an-bar.b{top:6.5px}' +
      '.an-bar i{display:block;width:9px;height:1.5px;flex:none;background:currentColor;border-radius:0;transition:width .2s cubic-bezier(.4,0,.2,1) 0s,height .2s cubic-bezier(.4,0,.2,1) 0s,border-radius .2s ease 0s}' +
      'body.an-open .an-bar{transition:transform .3s var(--an-ease) 0s}' +
      'body.an-open .an-bar.t{transform:translateY(3.25px) rotate(45deg)}body.an-open .an-bar.b{transform:translateY(-3.25px) rotate(-45deg)}' +
      'body.an-open .an-bar i{width:3.9px;height:4px;border-radius:50%;transition:width .26s cubic-bezier(.4,0,.2,1) .3s,height .26s cubic-bezier(.4,0,.2,1) .3s,border-radius .2s ease .36s}' +
      '.an-toggle:focus-visible,.an-logo:focus-visible,.an-wordmark:focus-visible,.an-item:focus-visible,.an-lang a:focus-visible{outline:2px solid currentColor;outline-offset:4px}' +
      '.an-panel{position:fixed;inset:0;z-index:10000;background:#fff;color:#000;padding:96px 20px 0;clip-path:inset(0 0 calc(100% - 56px) 0);transition:clip-path .55s var(--an-ease),visibility 0s linear .55s;visibility:hidden}' +
      'body.an-open .an-panel{clip-path:inset(0);visibility:visible;transition:clip-path .65s var(--an-ease),visibility 0s}' +
      'body.an-open{overflow:hidden!important}' +
      '.an-list{list-style:none;margin:0;padding:0;border-top:1px solid rgba(0,0,0,.12)}.an-list li{border-bottom:1px solid rgba(0,0,0,.12)}' +
      '.an-item{display:flex;align-items:center;height:60px;color:#000;text-decoration:none;font-family:"Helveticanowdisplay","Helvetica Neue",Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;line-height:1.15;letter-spacing:-.01em;text-transform:uppercase;opacity:0}' +
      'body.an-open .an-item{animation:aa-an-up .5s var(--an-ease) both}' +
      'body.an-open li:nth-child(-n+3) .an-item{animation-delay:.4s}body.an-open li:nth-child(4) .an-item{animation-delay:.45s}body.an-open li:nth-child(5) .an-item{animation-delay:.5s}body.an-open li:nth-child(6) .an-item{animation-delay:.55s}' +
      '.an-num{width:44px;font-size:11px;font-weight:500;line-height:1;letter-spacing:.08em;color:#6b6b6b;text-transform:none}' +
      '.an-lang{position:absolute;right:20px;bottom:24px;display:flex;align-items:center;justify-content:center;gap:4px;width:60px;height:29px;padding:0 10px;border-radius:20px;border:1px solid rgba(0,0,0,.14);background:#fff;font-family:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;font-size:13px;line-height:1;letter-spacing:.01em;opacity:0}' +
      'body.an-open .an-lang{animation:aa-an-fade .4s var(--an-ease) .65s both}' +
      '.an-lang a{text-decoration:none;font-weight:500;color:#8E8E93}.an-lang a.is-active{font-weight:700;color:#FF8A00}.an-lang span{width:1px;height:14px;background:#8E8E93}' +
      '.aa-ctl{display:none!important}' +
    '}' +
    '';   /* Nov 5 (Berley): the lines-to-dots animation and the menu play with Reduce Motion on too, like on the homepage */
  function init() {
    if (document.querySelector('.an-header')) return;
    var st = document.createElement('style'); st.id = 'aaMobNav'; st.textContent = css; document.head.appendChild(st);
    try { var bg = getComputedStyle(document.body).backgroundColor; if (!bg || /rgba\(0, 0, 0, 0\)|transparent/.test(bg)) bg = getComputedStyle(document.documentElement).backgroundColor; if (bg && !/rgba\(0, 0, 0, 0\)|transparent/.test(bg)) document.documentElement.style.setProperty('--an-bg', bg); } catch (e) {}
    var path = location.pathname, FR = /^\/fr-ca(\/|$)/.test(path), base = FR ? (path.replace(/^\/fr-ca/, '') || '/') : path, pre = FR ? '/fr-ca' : '';
    var items = [['The Lab', 'Le Lab', pre + '/labs'], ['Results', 'Résultats', pre + '/#aa-results'], ['About', 'À propos', pre + '/#about'],
      ['Process', 'Processus', pre + '/#process'], ['FAQ', 'FAQ', pre + '/faq'], ['Login', 'Connexion', 'https://app.artelagency.com']];
    var h = document.createElement('header'); h.className = 'an-header';
    h.innerHTML = '<div class="an-capsule"><a class="an-logo" href="' + (pre || '/') + '" aria-label="' + (FR ? 'Artel, accueil' : 'Artel home') + '"><span class="an-mask" aria-hidden="true"></span></a>' +
      '<a class="an-wordmark" href="' + (pre || '/') + '" aria-label="Artel"><span class="an-mask" aria-hidden="true"></span></a>' +
      '<button class="an-toggle" type="button" aria-label="' + (FR ? 'Ouvrir le menu' : 'Open menu') + '" aria-expanded="false" aria-controls="an-panel"><span class="an-burger" aria-hidden="true"><span class="an-bar t"><i></i><i></i></span><span class="an-bar b"><i></i><i></i></span></span></button></div>';
    var p = document.createElement('nav'); p.className = 'an-panel'; p.id = 'an-panel'; p.setAttribute('aria-label', FR ? 'Menu mobile' : 'Mobile menu');
    p.innerHTML = '<ul class="an-list">' + items.map(function (it, i) { return '<li><a class="an-item" href="' + it[2] + '"><span class="an-num">0' + (i + 1) + '</span><span class="an-lbl">' + (FR ? it[1] : it[0]) + '</span></a></li>'; }).join('') + '</ul>' +
      '<div class="an-lang"><a class="an-en' + (FR ? '' : ' is-active') + '" href="' + base + '">EN</a><span aria-hidden="true"></span><a class="an-fr' + (FR ? ' is-active' : '') + '" href="/fr-ca' + (base === '/' ? '' : base) + '">FR</a></div>';
    document.body.appendChild(p); document.body.appendChild(h);
    var t = h.querySelector('.an-toggle'), body = document.body;
    function setOpen(o) { body.classList.toggle('an-open', o); t.setAttribute('aria-expanded', o ? 'true' : 'false'); t.setAttribute('aria-label', o ? (FR ? 'Fermer le menu' : 'Close menu') : (FR ? 'Ouvrir le menu' : 'Open menu')); }
    t.addEventListener('click', function () { setOpen(!body.classList.contains('an-open')); });
    p.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 991) setOpen(false); }, { passive: true });
  }
  if (document.readyState !== 'loading') init(); else document.addEventListener('DOMContentLoaded', init);
})();
