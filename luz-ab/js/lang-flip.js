/* Nov 14 (Berley): EN <-> FR without a page reload.
   Clicking the other language swaps the text in place: letters roll out, the new ones roll in, and the visitor stays where they are.
   The marker in the EN/FR picker moves like an Apple switch knob: it stretches toward the other side, then settles there.
   The address changes to the other language's URL, so a refresh or a shared link opens that language.
   Not swapped here (on purpose, for later): the Luz chat frame and the films. */
(function () {
  if (window.__aaLangFlip) return; window.__aaLangFlip = 1;
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, IFRAME: 1, CANVAS: 1, VIDEO: 1, TEMPLATE: 1, svg: 1, SVG: 1, SELECT: 1, TEXTAREA: 1 };
  var INL = { SPAN: 1, B: 1, STRONG: 1, EM: 1, I: 1, A: 1, BR: 1, SUP: 1, SUB: 1, SMALL: 1, MARK: 1, CODE: 1, ABBR: 1, TIME: 1, U: 1, S: 1, Q: 1 };
  var LINKS = { '/labs': '/fr-ca/labs', '/faq': '/fr-ca/faq', '/': '/fr-ca', '/#team': '/fr-ca#team', '/#selected-work': '/fr-ca#selected-work', '/#process': '/fr-ca#process',
    '/#free-pilot': '/fr-ca#free-pilot', '/privacy-policy': '/fr-ca/privacy-policy', '/terms-of-services': '/fr-ca/terms-of-services' };
  var RLINKS = {}; Object.keys(LINKS).forEach(function (k) { RLINKS[LINKS[k]] = k; });
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SRC = (document.currentScript && document.currentScript.src) || '', MAP_URL = SRC ? SRC.replace(/js\/lang-flip\.js[^]*$/, 'assets/lang-flip.json') : 'assets/lang-flip.json';
  var mapP = null, lang = /^\/fr-ca(\/|$)/.test(location.pathname) ? 'fr' : 'en', busy = false, mo = null, selfEdit = false; if (mo) mo.takeRecords();

  function load() { if (!mapP) mapP = fetch(MAP_URL).then(function (r) { if (!r.ok) throw 0; return r.json(); }).catch(function (e) { mapP = null; throw e; }); return mapP; }
  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }
  function enPath(p) { return p.replace(/^\/fr-ca(?=\/|$)/, '') || '/'; }
  function pathFor(l) { var b = enPath(location.pathname); return l === 'fr' ? '/fr-ca' + (b === '/' ? '' : b) : b; }
  function inSkip(e) { while (e) { if (SKIP[e.tagName]) return true; e = e.parentElement; } return false; }
  function ok(e) { if (SKIP[e.tagName]) return false; var k = e.querySelectorAll('*'); for (var i = 0; i < k.length; i++) if (!INL[k[i].tagName]) return false; return /[A-Za-zÀ-ÿ]/.test(e.textContent); }
  function blocks(root) {
    var out = [], all = (root || document.body).querySelectorAll('*');
    for (var i = 0; i < all.length; i++) { var e = all[i]; if (inSkip(e) || !ok(e)) continue; if (e.parentElement && e.parentElement !== document.body && ok(e.parentElement)) continue; out.push(e); }
    return out;
  }
  /* text sitting straight inside an element that also holds icons (a pill with an svg): swap the text node itself */
  function orphans(root, M) {
    var out = [], tw = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT), n, tmp = document.createElement('div');
    while ((n = tw.nextNode())) { var p = n.parentElement; if (!p || inSkip(p)) continue; if (ok(p)) { var bl = p; while (bl.parentElement && bl.parentElement !== document.body && ok(bl.parentElement)) bl = bl.parentElement; if (M.b[norm(bl.textContent)] !== undefined) continue; } var k = norm(n.data); if (!k) continue; var v = M.b[k]; if (v === undefined) continue; tmp.innerHTML = v; out.push({ n: n, v: n.data.replace(k, tmp.textContent) }); }
    return out;
  }
  function inView(r) { return r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth && r.width > 0; }

  /* split the text nodes of an element into letter spans (words kept whole so lines wrap the same way) */
  function splitLetters(el) {
    var letters = [], tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [], n;
    while ((n = tw.nextNode())) if (n.data.trim()) nodes.push(n);
    nodes.forEach(function (t) {
      var f = document.createDocumentFragment();
      t.data.split(/(\s+)/).forEach(function (w) {
        if (!w) return; if (/^\s+$/.test(w)) { f.appendChild(document.createTextNode(w)); return; }
        var ws = document.createElement('span'); ws.style.whiteSpace = 'nowrap';
        Array.from(w).forEach(function (c) { var s = document.createElement('span'); s.textContent = c; s.style.display = 'inline-block'; ws.appendChild(s); letters.push(s); });
        f.appendChild(ws);
      });
      t.parentNode.replaceChild(f, t);
    });
    return letters;
  }
  function rollOut(el, d0) {
    var L = splitLetters(el), step = Math.min(8, 160 / Math.max(L.length, 1)), last = null;
    L.forEach(function (s, i) { last = s.animate([{ transform: 'translateY(0)', opacity: 1, filter: 'blur(0)' }, { transform: 'translateY(-0.55em)', opacity: 0, filter: 'blur(2px)' }],
      { duration: 170, delay: d0 + i * step, easing: 'cubic-bezier(.4,0,1,1)', fill: 'forwards' }); });
    return last ? last.finished.catch(function () {}) : Promise.resolve();
  }
  function rollIn(el, html, d0) {
    el.innerHTML = html; var clean = el.innerHTML, L = splitLetters(el), step = Math.min(10, 260 / Math.max(L.length, 1)), last = null;
    L.forEach(function (s, i) { s.style.opacity = '0'; last = s.animate([{ transform: 'translateY(0.6em)', opacity: 0, filter: 'blur(2px)' }, { transform: 'translateY(0)', opacity: 1, filter: 'blur(0)' }],
      { duration: 300, delay: d0 + i * step, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' }); });
    return (last ? last.finished.catch(function () {}) : Promise.resolve()).then(function () { selfEdit = true; el.innerHTML = clean; selfEdit = false; if (mo) mo.takeRecords(); });
  }

  /* keep the visitor on the same spot while text lengths change */
  function anchor() {
    var x = innerWidth / 2, y = innerHeight * 0.4, e = document.elementFromPoint(x, y);
    while (e && e !== document.body && e.getBoundingClientRect().height > innerHeight) e = e.firstElementChild || null;
    if (!e || e === document.body || e === document.documentElement) return null;
    return { e: e, top: e.getBoundingClientRect().top };
  }
  function hold(a) { if (!a || !a.e.isConnected) return; var d = a.e.getBoundingClientRect().top - a.top; if (Math.abs(d) > 0.5) { window.scrollBy({ top: d, left: 0, behavior: 'instant' }); a.top = a.e.getBoundingClientRect().top; } }

  function swapAttrs(M) {
    ['aria-label', 'alt', 'placeholder', 'title'].forEach(function (a) {
      document.querySelectorAll('[' + a + ']').forEach(function (e) { if (inSkip(e)) return; var v = e.getAttribute(a); if (M.a[v] !== undefined) e.setAttribute(a, M.a[v]); });
    });
    document.querySelectorAll('a[href]').forEach(function (e) {
      if (e.closest('.aa-ctl')) return; var h = e.getAttribute('href'), m = lang === 'fr' ? LINKS : RLINKS;
      if (m[h]) e.setAttribute('href', m[h]);
      else if (/^\/(fr-ca\/)?(luz|black-friday)\/?$/.test(h)) e.setAttribute('href', pathFor(lang === 'fr' ? 'en' : 'fr'));
    });
    var t = M.b['__title__' + document.title]; if (t) document.title = t;
    var md = document.querySelector('meta[name=description]'); if (md && M.b['__desc__' + md.content]) md.content = M.b['__desc__' + md.content];
  }

  function translateNow(M, root) {
    selfEdit = true;
    blocks(root).forEach(function (e) { var h = M.b[norm(e.textContent)]; if (h !== undefined) e.innerHTML = h; }); orphans(root, M).forEach(function (o) { o.n.data = o.v; });
    selfEdit = false; if (mo) mo.takeRecords();
  }
  function watch() {
    if (mo || !window.MutationObserver) return; var q = new Set(), tm = 0;
    mo = new MutationObserver(function (recs) {
      if (selfEdit) return;
      recs.forEach(function (r) { var t = r.target.nodeType === 3 ? r.target.parentElement : r.target; if (t) q.add(t); });
      clearTimeout(tm); tm = setTimeout(function () {
        load().then(function (MAP) { var M = MAP[lang]; q.forEach(function (t) { if (!t.isConnected || inSkip(t)) return; var b = t; while (b.parentElement && b.parentElement !== document.body && ok(b.parentElement)) b = b.parentElement; translateNow(M, b.parentElement || b); }); q.clear(); });
      }, 60);
    });
    mo.observe(document.body, { subtree: true, childList: true, characterData: true });
  }

  /* the EN/FR picker: one knob behind the two letters, Apple-switch motion */
  function knob() {
    var c = document.querySelector('.aa-ctl'); if (!c) return null;
    var k = c.querySelector('.aa-ctl-k');
    if (!k) {
      var st = document.createElement('style');
      st.textContent = '.aa-ctl{isolation:isolate}.aa-ctl a{position:relative!important;z-index:2!important}.aa-ctl a.on{background:transparent!important}.aa-ctl-k{position:absolute;z-index:0;border-radius:999px;background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.08);pointer-events:none;will-change:top,height,left,width}';
      document.head.appendChild(st);
      k = document.createElement('div'); k.className = 'aa-ctl-k'; c.insertBefore(k, c.firstChild);
    }
    return { c: c, k: k };
  }
  function place(K, a) { var s = K.k.style; s.left = a.offsetLeft + 'px'; s.top = a.offsetTop + 'px'; s.width = a.offsetWidth + 'px'; s.height = a.offsetHeight + 'px'; }
  function linkFor(K, l) { var A = K.c.querySelectorAll('a'); return l === 'fr' ? A[1] : A[0]; }
  function initKnob() { var K = knob(); if (!K) return; var on = K.c.querySelector('a.on') || linkFor(K, lang); place(K, on); }
  function moveKnob(to) {
    var K = knob(); if (!K) return Promise.resolve();
    var a = K.c.querySelector('a.on') || linkFor(K, lang === 'fr' ? 'en' : 'fr'), b = linkFor(K, to);
    K.c.querySelectorAll('a').forEach(function (x) { x.classList.toggle('on', x === b); });
    if (reduce || !K.k.animate) { place(K, b); return Promise.resolve(); }
    var vert = Math.abs(b.offsetTop - a.offsetTop) >= Math.abs(b.offsetLeft - a.offsetLeft);
    var A = { l: a.offsetLeft, t: a.offsetTop, w: a.offsetWidth, h: a.offsetHeight }, B = { l: b.offsetLeft, t: b.offsetTop, w: b.offsetWidth, h: b.offsetHeight };
    var top = Math.min(A.t, B.t), left = Math.min(A.l, B.l), bot = Math.max(A.t + A.h, B.t + B.h), right = Math.max(A.l + A.w, B.l + B.w);
    /* 1. press: the knob grows a little where it sits. 2. it stretches across to the other letter. 3. it lets go of the old side and settles, with a small overshoot */
    var press = vert ? { left: A.l - 1 + 'px', width: A.w + 2 + 'px', top: A.t - 1 + 'px', height: A.h + 2 + 'px' } : { left: A.l - 1 + 'px', width: A.w + 2 + 'px', top: A.t - 1 + 'px', height: A.h + 2 + 'px' };
    var stretch = vert ? { left: A.l + 1 + 'px', width: A.w - 2 + 'px', top: top + 'px', height: bot - top + 'px' } : { top: A.t + 1 + 'px', height: A.h - 2 + 'px', left: left + 'px', width: right - left + 'px' };
    var land = { left: B.l + 'px', width: B.w + 'px', top: B.t + 'px', height: B.h + 'px' };
    var from = { left: A.l + 'px', width: A.w + 'px', top: A.t + 'px', height: A.h + 'px' };
    var an = K.k.animate([from, Object.assign({ offset: 0.18, easing: 'cubic-bezier(.3,0,.2,1)' }, press), Object.assign({ offset: 0.5, easing: 'cubic-bezier(.34,1.45,.55,1)' }, stretch), land],
      { duration: 520, easing: 'linear', fill: 'forwards' });
    return an.finished.then(function () { place(K, b); an.cancel(); }).catch(function () { place(K, b); });
  }

  window.__aaLangState = function () { return { lang: lang, busy: busy, map: MAP_URL }; };
  function flip(to) {
    if (busy || to === lang) return; busy = true;
    var knobDone = moveKnob(to);
    load().then(function (MAP) {
      var M = MAP[to], a = anchor(), list = blocks(), vis = [], d = document.documentElement;
      var prev = lang; lang = to;
      try { history.pushState({ aaLang: to }, '', pathFor(to) + location.search + location.hash); } catch (e) {}
      d.lang = to === 'fr' ? 'fr-CA' : 'en';
      selfEdit = true;
      list.forEach(function (e) { var h = M.b[norm(e.textContent)]; if (h === undefined) return; e.__aaDone = 1; var r = e.getBoundingClientRect(); if (!reduce && inView(r)) vis.push({ e: e, h: h, y: r.top }); else e.innerHTML = h; });
      orphans(document.body, M).forEach(function (o) { o.n.data = o.v; }); swapAttrs(M); selfEdit = false; if (mo) mo.takeRecords(); hold(a);
      if (!vis.length) { busy = false; watch(); return; }
      vis.sort(function (p, q) { return p.y - q.y; });
      Promise.all(vis.map(function (v, i) { var d0 = Math.min(140, (Math.max(v.y, 0) / innerHeight) * 140); selfEdit = true; var p = rollOut(v.e, d0); selfEdit = false; if (mo) mo.takeRecords(); return p.then(function () { selfEdit = true; var q = rollIn(v.e, v.h, 0); selfEdit = false; if (mo) mo.takeRecords(); hold(a); return q; }); }))
        .then(function () { hold(a); busy = false; watch(); });
    }).catch(function (err) { window.__aaLangErr = String(err && err.stack || err); busy = false; location.href = pathFor(to); });
    return knobDone;
  }

  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a[href]'); if (!a || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button) return;
    var h = a.getAttribute('href'), other = lang === 'fr' ? 'en' : 'fr';
    var target = h === pathFor(other) ? other : (h === pathFor(lang) && a.closest('.aa-ctl') ? lang : null);
    if (!target) return; ev.preventDefault(); if (target !== lang) flip(target);
  }, true);
  window.addEventListener('popstate', function () { var l = /^\/fr-ca(\/|$)/.test(location.pathname) ? 'fr' : 'en'; if (l !== lang) location.reload(); });
  function boot() {
    var tries = 0; (function t() { if (document.querySelector('.aa-ctl')) { initKnob(); var c = document.querySelector('.aa-ctl'); c.addEventListener('pointerenter', function () { load().catch(function () {}); }, { once: true }); } else if (tries++ < 40) setTimeout(t, 150); })();
    addEventListener('resize', function () { var K = knob(); if (K && !busy) place(K, K.c.querySelector('a.on') || linkFor(K, lang)); });
    setTimeout(function () { load().catch(function () {}); }, 4000);
  }
  document.readyState !== 'loading' ? boot() : document.addEventListener('DOMContentLoaded', boot);
})();
