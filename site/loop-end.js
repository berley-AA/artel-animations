/* ArtelLoopEnd 2.2.0 (unchanged, homepage footer -> hero loop) + ArtelLoopHint 1.0 */
!function(){if(!matchMedia("(prefers-reduced-motion:reduce)").matches){var t=0,e=scrollY,n=1;addEventListener("scroll",u,{passive:!0});var o=r();o&&o.on&&o.on("scroll",u),addEventListener("wheel",(function(t){t.deltaY>0&&(n=1,c())}),{passive:!0});var i=setInterval((function(){var t=l();t&&(clearInterval(i),new MutationObserver(s).observe(t.b,{childList:!0}),s())}),500)}function r(){return"undefined"!=typeof lenis?lenis:null}function l(){return window.__aaLoop}function s(){var t=l();if(t){var e=t.b.firstElementChild;if(e){var n=t.b.getBoundingClientRect(),o=innerHeight,i=Math.min(1,Math.max(0,1-n.top/o)),r=i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2;e.style.setProperty("transform","scale("+(.84+.16*r).toFixed(4)+")","important"),e.style.transformOrigin="50% 0",e.style.borderRadius=(28*(1-r)).toFixed(1)+"px",e.style.overflow="hidden",e.style.filter="brightness("+(.8+.2*r).toFixed(3)+")"}}}function a(){if(1===t){t=2,l().jump();var n=r();n&&n.start(),setTimeout((function(){t=0,e=scrollY}),700)}}function c(){if(!t){var e=l();if(e){var o=e.b.getBoundingClientRect();n>0&&o.top<=.3*innerHeight&&o.top>-o.height/2&&function(){var e=l();if(e&&!t){t=1;var n=e.b.getBoundingClientRect(),o=scrollY+n.top,i=r();i&&i.scrollTo?(i.start(),i.scrollTo(o,{duration:.55,easing:function(t){return 1-Math.pow(1-t,3)},lock:!0,force:!0,onComplete:a})):(scrollTo({top:o,behavior:"smooth"}),setTimeout(a,600)),setTimeout((function(){1===t&&a()}),1200)}}()}}}function u(){s();var t=scrollY;t!==e&&(n=t<e?-1:1,e=t),c()}}();
/* ArtelLoopHint 1.0 — the bottom-of-page loop says what it's about to do.
   When the end card (Luz pages: #loop, homepage: #aa-loop) comes up, a line on it reads "Keep scrolling to start over",
   (words only). It shows until the existing loop fires (its top reaches 30% of the screen).
   After the jump back, a short note says "You're back at the start" for 2 s. It never blocks anything. EN/FR by path. */
(function () {
  if (window.__aaLoopHint) return; window.__aaLoopHint = 1;
  var FR = /^\/fr-ca(\/|$)/.test(location.pathname);
  var T1 = FR ? 'Continuez à défiler pour revenir au début.' : 'Keep scrolling to start over.';
  var T2 = FR ? 'Vous êtes de retour au début.' : 'You’re back at the start.';
  var css = '.aalh{position:absolute;left:50%;top:clamp(16px,3vh,32px);transform:translateX(-50%);z-index:20;width:min(340px,calc(100vw - 32px));box-sizing:border-box;background:none;border:0;padding:0;font-family:"ABC Areal","Helvetica Neue",Helvetica,Arial,sans-serif;color:#1D1D1F;text-align:center;opacity:0;transition:opacity .35s ease;pointer-events:none}' +
    '.aalh.on{opacity:1}.aalh p{margin:0;font-size:16px;line-height:1.35;font-weight:500;letter-spacing:-.005em}' +
        '.aalt{position:fixed;left:50%;top:84px;transform:translate(-50%,calc(-50% - 4px));z-index:2147483000;width:max-content;max-width:calc(100vw - 32px);box-sizing:border-box;background:none;color:#1D1D1F;padding:0;font-family:"ABC Areal","Helvetica Neue",Helvetica,Arial,sans-serif;font-size:15px;line-height:1.3;font-weight:500;letter-spacing:-.005em;text-align:center;opacity:0;transition:opacity .35s ease,transform .35s ease;pointer-events:none}' +
    '.aalt.on{opacity:1;transform:translate(-50%,-50%)}';
  var st = document.createElement('style'); st.textContent = css; (document.head || document.documentElement).appendChild(st);
  var sec = null, hint = null, bar = null, toast = null, armed = false, raf = 0, toastT = 0;
  function find() {
    var s = document.getElementById('loop') || document.getElementById('aa-loop') || (window.__aaLoop && window.__aaLoop.b); if (!s) return;
    if (s === sec) { if (hint && !s.contains(hint)) s.appendChild(hint); return; }   // the homepage rebuilds the card's contents: put the note back
    sec = s; if (getComputedStyle(s).position === 'static') s.style.position = 'relative';
    hint = document.createElement('div'); hint.className = 'aalh'; hint.setAttribute('role', 'status');
    hint.innerHTML = '<p></p>'; hint.firstChild.textContent = T1; /* words only: the one bar on the site is the scroll line at the bottom */ s.appendChild(hint);
  }
  function gapMid() {   // just words, centred in the gap between the nav bar and the first picture (or the orb) under it
    var vw = innerWidth, vh = innerHeight, navB = 0, picT = 0;
    Array.prototype.forEach.call(document.querySelectorAll('nav, header, .navbar, .w-nav, .aanav, [class*="nav-bar"]'), function (e) { var r = e.getBoundingClientRect(); if (r.top < 24 && r.height > 20 && r.height < 160 && r.width > vw * 0.5 && getComputedStyle(e).display !== 'none') navB = Math.max(navB, r.bottom); });
    if (!navB) navB = 64;
    Array.prototype.forEach.call(document.querySelectorAll('img, video, .orb-box'), function (e) { var r = e.getBoundingClientRect(); if (r.width > vw * 0.25 && r.height > 120 && r.top >= navB + 8 && r.top < vh * 0.6 && (!picT || r.top < picT)) picT = r.top; });
    return picT && picT - navB >= 28 ? Math.round((navB + picT) / 2) : Math.round(navB + 22);
  }
  function showToast() {
    if (!toast) { toast = document.createElement('div'); toast.className = 'aalt'; toast.setAttribute('role', 'status'); toast.textContent = T2; document.body.appendChild(toast); }
    toast.style.top = gapMid() + 'px'; clearTimeout(toastT); requestAnimationFrame(function () { toast.classList.add('on'); }); toastT = setTimeout(function () { toast.classList.remove('on'); }, 2000);
  }
  function tick() {
    raf = 0; find(); if (!sec) return;
    var vh = window.innerHeight || 800, top = sec.getBoundingClientRect().top;
    // 0 when the card's top enters at the bottom of the screen, 1 when it reaches 30% (where the loop fires)
    var p = Math.max(0, Math.min(1, (vh - top) / (0.7 * vh)));
    var y = window.scrollY || window.pageYOffset || 0;
    if (p > 0.02 && top > -vh * 0.5) { hint.classList.add('on'); if (p > 0.9) armed = true; }
    else { hint.classList.remove('on'); }
    if (armed && y < Math.max(80, vh * 0.15) && top > vh) { armed = false; hint.classList.remove('on'); showToast(); }
  }
  function req() { if (!raf) raf = requestAnimationFrame(tick); }
  addEventListener('scroll', req, { passive: true }); addEventListener('resize', req); addEventListener('wheel', req, { passive: true }); addEventListener('touchmove', req, { passive: true });
  var n = 0, iv = setInterval(function () { req(); if (++n > 40 && sec) clearInterval(iv); if (n > 120) clearInterval(iv); }, 250);
})();
/* ArtelScrollLine 1.0 — a thin orange line on the very bottom edge of the screen that fills left to right as the page scrolls,
   so visitors always see how much is left. 2 px on standard screens, 1.5 px on retina. Never takes clicks. */
(function () {
  if (window.__aaScrollLine) return; window.__aaScrollLine = 1;
  var st = document.createElement('style');
  st.textContent = '.aasl{position:fixed;left:0;right:0;bottom:0;height:2px;z-index:2147483600;pointer-events:none;background:transparent}' +
    '.aasl b{display:block;height:100%;width:100%;background:#FF7B00;transform-origin:0 50%;transform:scaleX(0);will-change:transform}' +
    '@media (min-resolution:2dppx){.aasl{height:1.5px}}@media print{.aasl{display:none}}';
  (document.head || document.documentElement).appendChild(st);
  var el = null, bar = null, raf = 0;
  function mount() { if (el || !document.body) return; el = document.createElement('div'); el.className = 'aasl'; el.setAttribute('aria-hidden', 'true'); el.innerHTML = '<b></b>'; bar = el.firstChild; document.body.appendChild(el); }
  function tick() {
    raf = 0; mount(); if (!bar) return;
    if (!document.body.contains(el)) document.body.appendChild(el);
    var d = document.documentElement, max = Math.max(d.scrollHeight, document.body.scrollHeight) - (window.innerHeight || d.clientHeight);
    var p = max > 0 ? Math.min(1, Math.max(0, (window.scrollY || window.pageYOffset || 0) / max)) : 0;
    bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
  }
  function req() { if (!raf) raf = requestAnimationFrame(tick); }
  addEventListener('scroll', req, { passive: true }); addEventListener('resize', req);
  if ('ResizeObserver' in window) { var ro = new ResizeObserver(req); var w = setInterval(function () { if (document.body) { ro.observe(document.body); clearInterval(w); } }, 100); }
  req(); setInterval(req, 1000);
})();
