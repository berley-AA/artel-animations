
(function(){
  var reduce = false; try { reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  if (reduce) return;
  var tries = 0;
  (function wait(){ var tr = document.getElementById('hlTrack'), bar = document.querySelector('#highlights .car-bar');
    if (tr && bar && tr.children.length > 1 && bar.querySelectorAll('.dot').length > 1) return init(tr, bar);
    if (++tries < 200) setTimeout(wait, 100); })();
  function init(tr, bar){
    /* 2. glide: the page's own "smooth" jump to a card becomes a slower, eased glide */
    var nat = tr.scrollTo.bind(tr), g = 0;
    var ease = function(t){ return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
    function stop(){ if (g) { cancelAnimationFrame(g); g = 0; tr.style.scrollSnapType = 'x mandatory'; } }
    tr.scrollTo = function(o){ if (!o || o.behavior !== 'smooth' || typeof o.left !== 'number') return nat.apply(null, arguments);
      stop(); var x0 = tr.scrollLeft, x1 = Math.max(0, Math.min(o.left, tr.scrollWidth - tr.clientWidth)), t0 = performance.now(), D = 820;
      if (Math.abs(x1 - x0) < 2) return; tr.style.scrollSnapType = 'none';
      (function step(now){ var k = Math.min(1, (now - t0) / D); tr.scrollLeft = x0 + (x1 - x0) * ease(k); if (k < 1) g = requestAnimationFrame(step); else { g = 0; tr.style.scrollSnapType = 'x mandatory'; } })(t0); };
    tr.addEventListener('pointerdown', stop, { passive: true }); tr.addEventListener('wheel', function(e){ if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) stop(); }, { passive: true });
    /* 3. ink: a dark drop that travels from the old dot to the new one */
    var ink = document.createElement('span'); ink.className = 'car-ink'; ink.setAttribute('aria-hidden', 'true'); bar.appendChild(ink);
    var dots = function(){ return [].slice.call(bar.querySelectorAll('.dot')); };
    var cur = function(){ return dots().findIndex(function(d){ return d.getAttribute('aria-current') === 'true'; }); };
    var last = cur(), fillW = 28, anim = null, done = 0;
    bar.addEventListener('pointerdown', function(){ var d = dots()[last], f = d && d.querySelector('.dfill'); if (f) fillW = f.getBoundingClientRect().width; }, true);
    function pill(i){ var d = dots()[i]; return { l: d.offsetLeft + 10, w: d.offsetWidth - 20 }; }
    function finalPill(j){ var ds = dots(), x = ds[0].offsetLeft; for (var k = 0; k < j; k++) x += 8 + 20; return { l: x + 10, w: 28 }; }
    function travel(a, b){
      var A = pill(a), B = finalPill(b), w0 = Math.max(8, Math.min(A.w, fillW || A.w)), R0 = A.l + w0, R1 = B.l + B.w, mid;
      if (b > a) mid = { l: A.l + (B.l - A.l) * .18, r: R1 }; else mid = { l: B.l, r: R0 - (R0 - R1) * .18 };
      if (anim) anim.cancel(); clearTimeout(done); bar.classList.add('inking');
      anim = ink.animate([
        { left: A.l + 'px', width: w0 + 'px', opacity: 1, easing: 'cubic-bezier(.5,0,.2,1)' },
        { left: mid.l + 'px', width: (mid.r - mid.l) + 'px', opacity: 1, offset: .42, easing: 'cubic-bezier(.3,0,.1,1)' },
        { left: B.l + 'px', width: B.w + 'px', opacity: 1, offset: .85 },
        { left: B.l + 'px', width: B.w + 'px', opacity: 1 }
      ], { duration: 680, fill: 'forwards' });
      anim.onfinish = function(){ bar.classList.remove('inking');
        anim = ink.animate([{ left: B.l + 'px', width: B.w + 'px', opacity: 1 }, { left: B.l + 'px', width: B.w + 'px', opacity: 0 }], { duration: 260, fill: 'forwards', easing: 'ease-out' }); };
      fillW = 28; }
    new MutationObserver(function(){ var n = cur(); if (n < 0 || n === last) return; var o = last; last = n; if (o >= 0) travel(o, n); })
      .observe(bar, { subtree: true, attributes: true, attributeFilter: ['aria-current'] });
  }
})();
