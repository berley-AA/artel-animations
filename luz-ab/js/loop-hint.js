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
        '.aalt{position:fixed;left:50%;top:84px;transform:translate(-50%,calc(-50% - 4px));z-index:2147483000;width:max-content;max-width:calc(100vw - 32px);box-sizing:border-box;background:none;color:#1D1D1F;padding:0;font-family:"ABC Areal","Helvetica Neue",Helvetica,Arial,sans-serif;font-size:15px;line-height:1.3;font-weight:300;letter-spacing:0;text-align:center;opacity:0;transition:opacity .35s ease,transform .35s ease;pointer-events:none}' +
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
  function orbTop(box) {   // the orb is drawn inside a full-screen canvas: find its real top edge, not the box's
    var b = box.getBoundingClientRect(), rest = b.top + b.height * 0.155, c = box.querySelector('canvas');
    try {
      if (c && c.width) {
        var cr = c.getBoundingClientRect(), sx = c.width / cr.width, t = document.createElement('canvas'); t.width = c.width; t.height = c.height;
        var g = t.getContext('2d'); g.drawImage(c, 0, 0);
        var x0 = Math.floor((b.left + b.width * 0.3 - cr.left) * sx), x1 = Math.floor((b.left + b.width * 0.7 - cr.left) * sx), y0 = Math.max(0, Math.floor((b.top - cr.top) * sx)), y1 = Math.floor((b.top + b.height * 0.5 - cr.top) * sx);
        var d = g.getImageData(x0, y0, Math.max(1, x1 - x0), Math.max(1, y1 - y0)), W = d.width;
        for (var y = 0; y < d.height; y += 2) for (var x = 0; x < W; x += 4) if (d.data[(y * W + x) * 4 + 3] > 40) {
          var top = cr.top + (y0 + y) / sx;
          return (top > b.top + b.height * 0.08 && top < b.top + b.height * 0.3) ? top : rest;   // mid-animation (intro zoom): use where the orb comes to rest
        }
      }
    } catch (e) {}
    return rest;
  }
  function gapMid() {   // just words, centred in the gap between the nav bar and the first picture (or the orb) under it
    var vw = innerWidth, vh = innerHeight, navB = 0, picT = 0;
    Array.prototype.forEach.call(document.querySelectorAll('nav, header, .navbar, .w-nav, .aanav, [class*="nav-bar"]'), function (e) { var r = e.getBoundingClientRect(); if (r.top < 24 && r.height > 20 && r.height < 160 && r.width > vw * 0.5 && getComputedStyle(e).display !== 'none') navB = Math.max(navB, r.bottom); });
    if (!navB) navB = 64;
    Array.prototype.forEach.call(document.querySelectorAll('img, video, .orb-box'), function (e) { if (e.closest('.orb-box') && !e.classList.contains('orb-box')) return; var r = e.getBoundingClientRect(), t = e.classList.contains('orb-box') ? orbTop(e) : r.top; if ((r.width > vw * 0.25 || e.classList.contains('orb-box')) && r.height > 120 && t >= navB + 8 && t < vh * 0.6 && (!picT || t < picT)) picT = t; });
    // the first words under the bar count too (homepage on a phone: the headline sits above the photo)
    Array.prototype.forEach.call(document.querySelectorAll('h1, h2, h3, p'), function (e) { if (e.closest('.aalh,.aalt,nav,header')) return; var r = e.getBoundingClientRect(); if (r.width > 40 && r.height > 8 && r.top >= navB + 8 && r.top < vh * 0.6 && getComputedStyle(e).visibility !== 'hidden' && (!picT || r.top < picT)) picT = r.top; });
    // Nov 2: always in the open space between the bar's bottom edge and the picture, never on the bar's hairline
    var lo = navB + 18, hi = picT ? picT - 14 : navB + 60, mid = picT ? (navB + picT) / 2 : navB + 30;
    return Math.round(Math.max(lo, Math.min(hi, mid)));
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
