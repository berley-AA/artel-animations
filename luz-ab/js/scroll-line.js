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
