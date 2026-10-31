/* ArtelLoopHint 1.0 — the bottom-of-page loop says what it's about to do.
   When the end card (Luz pages: #loop, homepage: #aa-loop) comes up, a line on it reads "Keep scrolling to start over",
   with a thin bar that fills as they keep scrolling. Full bar = the existing loop fires (its top reaches 30% of the screen).
   After the jump back, a short note says "You're back at the start" for 2 s. It never blocks anything. EN/FR by path. */
(function () {
  if (window.__aaLoopHint) return; window.__aaLoopHint = 1;
  var FR = /^\/fr-ca(\/|$)/.test(location.pathname);
  var T1 = FR ? 'Continuez à défiler pour revenir au début.' : 'Keep scrolling to start over.';
  var T2 = FR ? 'Vous êtes de retour au début.' : 'You’re back at the start.';
  var css = '.aalh{position:absolute;left:50%;top:clamp(16px,3vh,32px);transform:translateX(-50%);z-index:20;width:min(340px,calc(100vw - 32px));box-sizing:border-box;background:#FFFFFF;border:1px solid rgba(29,29,31,.14);padding:12px 16px 14px;font-family:"ABC Areal","Helvetica Neue",Helvetica,Arial,sans-serif;color:#1D1D1F;text-align:center;opacity:0;transition:opacity .35s ease;pointer-events:none}' +
    '.aalh.on{opacity:1}.aalh p{margin:0 0 10px;font-size:16px;line-height:1.35;font-weight:500;letter-spacing:-.005em}' +
    '.aalh i{display:block;height:3px;background:rgba(29,29,31,.12);position:relative;overflow:hidden}.aalh b{position:absolute;left:0;top:0;bottom:0;width:100%;background:#FF7B00;transform-origin:0 50%;transform:scaleX(0)}' +
    '.aalt{position:fixed;left:50%;top:84px;transform:translate(-50%,calc(-50% - 4px));z-index:2147483000;width:max-content;max-width:calc(100vw - 32px);box-sizing:border-box;background:none;color:#1D1D1F;padding:0;font-family:"ABC Areal","Helvetica Neue",Helvetica,Arial,sans-serif;font-size:15px;line-height:1.3;font-weight:500;letter-spacing:-.005em;text-align:center;opacity:0;transition:opacity .35s ease,transform .35s ease;pointer-events:none}' +
    '.aalt.on{opacity:1;transform:translate(-50%,-50%)}';
  var st = document.createElement('style'); st.textContent = css; (document.head || document.documentElement).appendChild(st);
  var sec = null, hint = null, bar = null, toast = null, armed = false, raf = 0, toastT = 0;
  function find() {
    var s = document.getElementById('loop') || document.getElementById('aa-loop') || (window.__aaLoop && window.__aaLoop.b); if (!s) return;
    if (s === sec) { if (hint && !s.contains(hint)) s.appendChild(hint); return; }   // the homepage rebuilds the card's contents: put the note back
    sec = s; if (getComputedStyle(s).position === 'static') s.style.position = 'relative';
    hint = document.createElement('div'); hint.className = 'aalh'; hint.setAttribute('role', 'status');
    hint.innerHTML = '<p></p><i aria-hidden="true"><b></b></i>'; hint.firstChild.textContent = T1; bar = hint.querySelector('b'); s.appendChild(hint);
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
    if (p > 0.02 && top > -vh * 0.5) { hint.classList.add('on'); bar.style.transform = 'scaleX(' + p.toFixed(3) + ')'; if (p > 0.9) armed = true; }
    else { hint.classList.remove('on'); }
    if (armed && y < Math.max(80, vh * 0.15) && top > vh) { armed = false; hint.classList.remove('on'); bar.style.transform = 'scaleX(0)'; showToast(); }
  }
  function req() { if (!raf) raf = requestAnimationFrame(tick); }
  addEventListener('scroll', req, { passive: true }); addEventListener('resize', req); addEventListener('wheel', req, { passive: true }); addEventListener('touchmove', req, { passive: true });
  var n = 0, iv = setInterval(function () { req(); if (++n > 40 && sec) clearInterval(iv); if (n > 120) clearInterval(iv); }, 250);
})();
