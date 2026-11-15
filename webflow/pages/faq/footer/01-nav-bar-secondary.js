
(function(){
  var navbar = document.querySelector('#nav-bar-secondary') || document.querySelector('.navbar');
  if (!navbar) return;
 
  var p = location.pathname;
  var isHome = (p === '/' || p === '/fr-ca' || p === '/fr-ca/');
  var FR = /^\/fr-ca(\/|$)/.test(p);
  var base = FR ? '/fr-ca' : '';
 
  // Re-point homepage-section links so they work from subpages: dead "#" / "#vision" -> "/#vision"
  if (!isHome) {
    var MAP = [
      { labels:['vision'],              to:'#vision' },
      { labels:['process','processus'], to:'#process' },
      { labels:['proof','preuve','results','résultats'], to:'#aa-results' },
      { labels:['about','à propos'],     to:'#team' }
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
 
  if (isHome) return; // homepage runs its own navbar script — don't double up
 
  // Scroll behavior (frost + hide on scroll-down, reveal on scroll-up, 4s auto-hide)
  var navHideTimer = null, lastScrollY = window.scrollY, isPast = false, THRESH = 100;
  var hoverZone = document.createElement('div');
  hoverZone.style.cssText = 'position:fixed;top:0;left:0;right:0;height:30px;z-index:1000;pointer-events:all;';
  document.body.appendChild(hoverZone);
 
  function showNavbar(){
    navbar.classList.remove('hidden-nav');
    navbar.classList.add('visible','frosted');
    clearTimeout(navHideTimer);
    navHideTimer = setTimeout(function(){ if (isPast) hideNavbar(); }, 4000);
  }
  function hideNavbar(){
    navbar.classList.add('hidden-nav');
    navbar.classList.remove('visible');
  }
  navbar.addEventListener('mouseenter', function(){ clearTimeout(navHideTimer); });
  navbar.addEventListener('mouseleave', function(){ if (isPast){ navHideTimer = setTimeout(hideNavbar, 4000); } });
  hoverZone.addEventListener('mouseenter', function(){ if (isPast) showNavbar(); });
 
  window.addEventListener('scroll', function(){
    var y = window.scrollY;
    navbar.classList.toggle('frosted', y > 10);
    if (y > THRESH && !isPast){ isPast = true; hideNavbar(); }
    else if (y <= THRESH && isPast){ isPast = false; clearTimeout(navHideTimer); showNavbar(); }
    if (y < lastScrollY && isPast){ showNavbar(); }
    lastScrollY = y;
  }, { passive: true });
})();
