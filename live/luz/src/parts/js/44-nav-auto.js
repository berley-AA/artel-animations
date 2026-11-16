(function(){
  var hdr, mark, lastY = 0, hover = false, t = 0, ticking = false;
  function y(){ return window.scrollY || document.documentElement.scrollTop || 0; }
  function menuOpen(){ var m = hdr && hdr.querySelector('nav[aria-label="Menu"]'); return !!(m && m.offsetParent); }
  function past(){ var top = mark ? mark.getBoundingClientRect().top + y() : 600; return y() > top - 80; }
  function show(){ clearTimeout(t); hdr.classList.remove('aa-nav-up'); }
  function hide(){ if (hover || menuOpen() || hdr.contains(document.activeElement)) return; hdr.classList.add('aa-nav-up'); }
  function onScroll(){ if (ticking) return; ticking = true; requestAnimationFrame(function(){ ticking = false;
    var now = y(), d = now - lastY; lastY = now;
    if (!past()) { show(); return; }
    if (d > 4) hide(); else if (d < -6) show(); }); }
  function init(){
    hdr = document.querySelector('header'); mark = document.querySelector('section[aria-label="Why Luz"]');
    if (!hdr) return setTimeout(init, 400);
    hdr.classList.add('aa-nav'); lastY = y();
    window.addEventListener('scroll', onScroll, { passive: true });
    // the mouse at the top of the screen brings it back; leaving lets it go again
    if (matchMedia('(hover: hover)').matches) {
      document.addEventListener('mousemove', function(e){
        var inside = e.clientY < 72 || (hdr.matches(':hover'));
        if (inside && !hover) { hover = true; show(); }
        else if (!inside && hover) { hover = false; clearTimeout(t); t = setTimeout(function(){ if (past()) hide(); }, 700); }
      }, { passive: true });
    }
    hdr.addEventListener('focusin', show);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();