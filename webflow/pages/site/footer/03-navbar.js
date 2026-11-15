
(function(){
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;
  var p = location.pathname;
  var isHome = (p === '/' || p === '/fr-ca' || p === '/fr-ca/');
  var FR = /^\/fr-ca(\/|$)/.test(p);
  var base = FR ? '/fr-ca' : '';
  // (A) SUBPAGES: the section links are Webflow page-section links, which collapse
  //     to href="#" on any page that doesn't contain those sections. Re-point them
  //     by LABEL to the homepage + section. Locale-aware: French pages get /fr-ca/#...
  //     Labels cover the current menu (Results / Vision / How) plus legacy names.
  if (!isHome) {
    var MAP = [
      { labels:['vision'],                                 to:'#vision' },
      { labels:['how','comment','process','processus'],    to:'#process' },
      { labels:['results','résultats','proof','preuve'],   to:'#case-studies' }
    ];
    navbar.querySelectorAll('a').forEach(function(a){
      var t = (a.textContent || '').trim().toLowerCase();
      if (!t) return;
      for (var i=0;i<MAP.length;i++){
        if (MAP[i].labels.some(function(l){ return t === l || t.indexOf(l) === 0; })){
          a.setAttribute('href', base + '/' + MAP[i].to);
          break;
        }
      }
    });
  }
  // (B) Home already runs its own navbar script — don't double up there.
  if (isHome) return;
  // (C) Scroll behavior, matched to Home: frost after 10px; hide on scroll-down,
  //     reveal on scroll-up (auto-hides after ~4s). Subpages have no hero, so use a small threshold.
  var lastY = window.pageYOffset || 0, hideTimer = null, THRESH = 120;
  function show(){
    navbar.classList.remove('hidden-nav');
    navbar.classList.add('visible','frosted');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function(){ if ((window.pageYOffset||0) > THRESH) hide(); }, 4000);
  }
  function hide(){
    navbar.classList.add('hidden-nav');
    navbar.classList.remove('visible');
  }
  navbar.addEventListener('mouseenter', function(){ clearTimeout(hideTimer); });
  window.addEventListener('scroll', function(){
    var y = window.pageYOffset || 0;
    navbar.classList.toggle('frosted', y > 10);
    if (y > THRESH) {
      if (y < lastY - 2) show();
      else if (y > lastY + 2) { clearTimeout(hideTimer); hide(); }
    } else {
      navbar.classList.remove('hidden-nav');
      navbar.classList.add('visible');
    }
    lastY = y;
  }, { passive: true });
})();
