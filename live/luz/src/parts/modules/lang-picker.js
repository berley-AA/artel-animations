/* EN/FR picker (.aa-ctl): builds it, then runs the one behaviour each kind of device needs.
   Styles live in lang-picker.css. The knob and the in-place flip live in js/lang-flip.js. */
(function () {
  var html = document.documentElement;
  function build() {
    if (document.querySelector('.aa-ctl')) return;
    var path = location.pathname, isFR = /^\/fr-ca(\/|$)/.test(path);
    var base = isFR ? (path.replace(/^\/fr-ca/, '') || '/') : path;
    var en = base, fr = '/fr-ca' + (base === '/' ? '' : base);
    var box = document.createElement('div'); box.className = 'aa-ctl';
    box.innerHTML = '<a href="' + en + '" class="' + (isFR ? '' : 'on') + '">EN</a>' +
                    '<a href="' + fr + '" class="' + (isFR ? 'on' : '') + '">FR</a>';
    document.body.appendChild(box);
  }
  function mouse() {   // show when the pointer comes within 96px of the right edge, near the picker
    var t = null;
    function show(v) { clearTimeout(t); if (v) html.classList.add('aa-show'); else t = setTimeout(function () { html.classList.remove('aa-show'); }, 450); }
    document.addEventListener('mousemove', function (e) {
      var c = document.querySelector('.aa-ctl'), n = e.clientX > innerWidth - 96;
      if (n && c) { var r = c.getBoundingClientRect(); n = e.clientY > r.top - 140 && e.clientY < r.bottom + 140; }
      show(n);
    }, { passive: true });
    html.addEventListener('mouseleave', function () { show(false); });
  }
  function touch() {   // slide away while scrolling down past 140px, come back on the way up
    var last = window.scrollY || 0;
    window.addEventListener('scroll', function () {
      var c = document.querySelector('.aa-ctl'); if (!c) return;
      var y = window.scrollY || 0, d = y - last; if (Math.abs(d) < 2) return;
      if (d > 0 && y > 140) c.classList.add('is-away'); else if (d < 0) c.classList.remove('is-away');
      last = y;
    }, { passive: true });
  }
  document.readyState != 'loading' ? build() : document.addEventListener('DOMContentLoaded', build);
  if (matchMedia('(hover:none)').matches) touch(); else mouse();
})();
