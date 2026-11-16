/* Luz full-screen chat (Nov 5, Berley): when a chat starts, the Luz chat takes over the whole screen, like WhatsApp or
   iMessage. The page behind is frozen, so scrolling only moves the chat. The chat is sized to the VISIBLE part of the
   screen, so when the phone keyboard opens, the message box sits right on top of it. Tapping End in Luz gives the page back.
   Same behaviour as the homepage embed (#cta-chatbot), shared by /luz and /black-friday (EN + FR).
   Usage: var t = LuzTakeover(iframe); t.open(); t.close();
   The iframe is never moved in the DOM: moving it reloads it and would wipe the conversation. */
(function () {
  function LuzTakeover(f, opts) {
    opts = opts || {};
    var vv = window.visualViewport, isOpen = false, y = 0, base = '', patched = [], hidden = [], timers = [], lifted = [];
    var NEUTRAL = { transition: 'none', translate: 'none', scale: 'none', rotate: 'none', transform: 'none', filter: 'none', perspective: 'none', '-webkit-backdrop-filter': 'none', 'backdrop-filter': 'none', 'will-change': 'auto', contain: 'none' };
    function traps(cs) {   // anything that turns position:fixed into "fixed to this box" instead of "fixed to the screen"
      return (cs.transform && cs.transform !== 'none') || (cs.translate && cs.translate !== 'none') || (cs.scale && cs.scale !== 'none') || (cs.rotate && cs.rotate !== 'none') || (cs.filter && cs.filter !== 'none') || (cs.perspective && cs.perspective !== 'none') ||
        (cs.backdropFilter && cs.backdropFilter !== 'none') || (cs.webkitBackdropFilter && cs.webkitBackdropFilter !== 'none') ||
        /transform|filter|perspective/.test(cs.willChange || '') || /paint|layout|strict|content/.test(cs.contain || '');
    }
    function unTrap() { for (var el = f.parentElement; el && el !== document.body && el !== document.documentElement; el = el.parentElement) {
      try { if (traps(getComputedStyle(el))) { patched.push([el, el.getAttribute('style')]); for (var p in NEUTRAL) el.style.setProperty(p, NEUTRAL[p], 'important'); } } catch (e) {} } }
    function reTrap() { patched.forEach(function (a) { if (a[1] === null) a[0].removeAttribute('style'); else a[0].setAttribute('style', a[1]); }); patched = []; }
    function hideEl(el) { if (!el || el === f || el.__luzHid || el.contains(f)) return; var cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none') return;
      el.__luzHid = true; hidden.push([el, el.style.visibility]); el.style.visibility = 'hidden'; }
    function hideChrome() {   // the nav, the EN/FR switch, the cookie note, the scroll line: anything pinned that could paint over the chat
      var c = document.querySelectorAll('body > *, body > * > *, header, nav, .aa-ctl, [class*="consent"], [id*="consent"], [class*="cookie"], [id*="cookie"]');
      for (var i = 0; i < c.length; i++) { var p = getComputedStyle(c[i]).position; if (p === 'fixed' || p === 'sticky' || /^(HEADER|NAV)$/.test(c[i].tagName)) hideEl(c[i]); } }
    function showChrome() { hidden.forEach(function (h) { h[0].style.visibility = h[1] || ''; h[0].__luzHid = false; }); hidden = []; }
    function size() {   // glue the chat to the visible screen: above the keyboard, under nothing
      var s = f.style;
      s.setProperty('top', (vv ? vv.offsetTop : 0) + 'px', 'important'); s.setProperty('left', (vv ? vv.offsetLeft : 0) + 'px', 'important');
      s.setProperty('width', (vv ? vv.width : innerWidth) + 'px', 'important'); s.setProperty('height', (vv ? vv.height : innerHeight) + 'px', 'important');
      s.setProperty('right', 'auto', 'important'); s.setProperty('bottom', 'auto', 'important'); s.setProperty('max-width', 'none', 'important'); s.setProperty('max-height', 'none', 'important');
      s.setProperty('min-height', '0', 'important');
    }
    function lock() { y = window.scrollY || window.pageYOffset || 0; var b = document.body.style, h = document.documentElement.style;
      b.position = 'fixed'; b.top = (-y) + 'px'; b.left = '0'; b.right = '0'; b.width = '100%'; b.overflow = 'hidden'; h.overflow = 'hidden'; }
    function unlock() { var b = document.body.style, h = document.documentElement.style;
      b.position = ''; b.top = ''; b.left = ''; b.right = ''; b.width = ''; b.overflow = ''; h.overflow = '';
      var html = document.documentElement, sb = html.style.scrollBehavior; html.style.scrollBehavior = 'auto'; window.scrollTo(0, y); html.style.scrollBehavior = sb; }
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function open() {
      if (isOpen) return; isOpen = true; base = f.getAttribute('style') || '';
      if (window.__aaFilmSet) window.__aaFilmSet(true);   // the page's own animation loops wait (also stops smooth scroll), so typing stays smooth
      document.documentElement.classList.add('luz-fs'); lock(); unTrap(); hideChrome(); later(hideChrome, 300);
      // nothing may paint over the chat: hide everything around it (each wrapper's siblings) instead of lifting z-index.
      // Nov 5: lifting the wrappers' z-index made iPhone Safari clip the fixed chat to its old box (blank screen).
      for (var e = f; e && e !== document.body && e.parentElement; e = e.parentElement) { var kids = e.parentElement.children;
        for (var k = 0; k < kids.length; k++) { var c = kids[k]; if (c === e || c.__luzSib || /^(SCRIPT|STYLE|LINK)$/.test(c.tagName)) continue; c.__luzSib = 1; lifted.push([c, c.style.getPropertyValue('visibility'), c.style.getPropertyPriority('visibility')]); c.style.setProperty('visibility', 'hidden', 'important'); } }
      var s = f.style; s.setProperty('position', 'fixed', 'important'); s.setProperty('margin', '0', 'important'); s.setProperty('border-radius', '0', 'important');
      s.setProperty('transform', 'none', 'important'); s.setProperty('z-index', '2147483647', 'important'); s.setProperty('background', opts.bg || '#F5F5F7', 'important');
      size(); later(size, 60); later(size, 320);
      if (opts.onOpen) try { opts.onOpen(); } catch (e) {}
    }
    function close() {
      if (!isOpen) return; isOpen = false; timers.forEach(clearTimeout); timers = [];
      if (base) f.setAttribute('style', base); else f.removeAttribute('style');
      lifted.forEach(function (a) { a[0].__luzSib = 0; if (a[1]) a[0].style.setProperty('visibility', a[1], a[2]); else a[0].style.removeProperty('visibility'); }); lifted = [];
      showChrome(); reTrap(); unlock(); document.documentElement.classList.remove('luz-fs');
      if (window.__aaFilmSet && !window.__aaFilmByFilm) window.__aaFilmSet(false);
      if (opts.onClose) try { opts.onClose(); } catch (e) {}
    }
    var onVV = function () { if (isOpen) size(); };
    if (vv) { vv.addEventListener('resize', onVV); vv.addEventListener('scroll', onVV); }
    window.addEventListener('resize', onVV);
    window.addEventListener('orientationchange', function () { if (isOpen) setTimeout(size, 250); });
    window.addEventListener('keydown', function (e) { if (isOpen && e.key === 'Escape' && opts.onEscape) opts.onEscape(); });
    return { open: open, close: close, isOpen: function () { return isOpen; } };
  }
  window.LuzTakeover = LuzTakeover;
})();
