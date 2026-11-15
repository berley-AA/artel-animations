

/* Qualify form -> Artel dashboard. Sent as plain form data (a "simple" request, so no CORS preflight) to Luz's public chat endpoint; Luz saves it with her capture_lead tool and it shows up in Leads. The response is opaque on purpose: the page never reads it. */
/* Full film: 16:9 on laptops and tablets, the 4:5 cut on phones held upright (same rule as the #filmPlayer CSS). */
const AA_FILM_HOST = 'https://berley-aa.github.io/artel-animations/luz-film/';
try { const l = document.createElement('link'); l.rel = 'preconnect'; l.href = 'https://berley-aa.github.io'; document.head.appendChild(l); } catch (x) {}
/* Nov 4: the films are served from GitHub Pages (phones in portrait get the 4:5 cut at 1080x1350, 60 fps) (jsDelivr refuses files over ~5 MB). 1440p60 where the player is drawn on 2,200+ real pixels (retina laptops, big screens), 1080p60 otherwise. Both CRF 17 from the 4K master. */
function aaFilmSrc() { let tall = false, px = 1920; try { tall = window.matchMedia('(orientation: portrait) and (max-width: 820px)').matches; px = Math.min(window.innerWidth, 1600) * (window.devicePixelRatio || 1); } catch (x) {} const fr = /^\/fr-ca(\/|$)/.test(location.pathname) ? 'fr-' : ''; if (tall) return AA_FILM_HOST + 'luz-film-' + fr + '4x5-1350-v3.mp4'; return AA_FILM_HOST + 'luz-film-' + fr + (px >= 2200 ? '16x9-1440-v3.mp4' : '16x9-1080-v3.mp4'); }
function aaSendApplication(d, page) {
  const v = (k, n) => String(d[k] || '').replace(/\s+/g, ' ').trim().slice(0, n || 200);
  const lines = [
    '[Website form · ' + page + ' qualify] New application from the Artel website.',
    'Save it as a lead with capture_lead now, with the source and every answer below in the dossier. Start the notes with the Fit line. Do not book a meeting. Berley replies by email within 24 hours.',
    'Source page: ' + location.origin + location.pathname,
    'Name: ' + v('name'),
    'Email: ' + v('email'),
    'Store website: ' + v('website'),
    'Platform: ' + v('q1'),
    'Messages per month: ' + v('q2'),
    'Who answers today: ' + v('q3'),
    'Needs it live: ' + v('q4'),
    'Budget set aside: ' + v('q5'),
    'Who else decides: ' + v('q6'),
    'Fit: ' + (d.q5 === 'Under $6,000' ? 'UNDER BUDGET. January waitlist, no call.' : (d.q5 === '$10,000 to $20,000' || d.q5 === '$20,000 or more') ? 'QUALIFIED, BIGGER STORE. Book the call, extra prep.' : d.q5 ? 'QUALIFIED. Book the call.' : 'Budget not given.') + (d.q6 && d.q6 !== 'Just me' ? ' Another person decides: ' + d.q6 + '. Bring them to the call.' : ''),
    'Customers ask most: ' + (v('questions', 800) || 'not given'),
    'Reply language: ' + (d.lang === 'fr' ? 'French' : 'English')
  ];
  const id = 'form-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const body = new URLSearchParams({ message: lines.join('\n'), userId: id, visitorId: id });
  try { fetch('https://app.artelagency.com/api/w/luz-ac6955/chat', { method: 'POST', mode: 'no-cors', keepalive: true, body: body }); } catch (x) {}
}
{{@loop.7}}const QS = [
  { q: 'Where does your store run?', o: ['Shopify', 'WooCommerce', 'BigCommerce', 'Something else'] },
  { q: 'How many customer messages a month?', o: ['Under 100', '100 to 500', '500 to 2,000', 'Over 2,000'] },
  { q: 'Who answers them today?', o: ['Me', 'My team', 'An agency', 'Nobody after hours'] },
  { q: 'When do you need it live?', o: ['Before Black Friday', 'Before Christmas', 'In the new year', 'Just looking'] },
  /* Nov 4 (Berley): budget as ranges, no price on the form. The cutoff sits at $6,000, the setup price said on the call. FR copy kept here for the French page. */
  { q: 'What budget do you have set aside to get this running before Black Friday?', o: ['Under $6,000', '$6,000 to $10,000', '$10,000 to $20,000', '$20,000 or more'],
    fr: 'Quel budget as-tu prévu pour que ça roule avant le Black Friday?', ofr: ['Moins de 6 000 $', '6 000 $ à 10 000 $', '10 000 $ à 20 000 $', '20 000 $ ou plus'] },
  { q: 'Who else decides on this?', o: ['Just me', 'Me and a partner', 'Someone else'],
    fr: "Qui d'autre décide là-dessus?", ofr: ['Juste moi', 'Moi et un partenaire', "Quelqu'un d'autre"] }
];
{{@loop.8}}/* What each budget answer means. Under $6,000 = January waitlist, no call. $10,000 and up = bigger store, extra prep. */
function aaFit(qa) {
  const b = (qa || [])[4] || '', w = (qa || [])[5] || '';
  const under = b === 'Under $6,000', big = b === '$10,000 to $20,000' || b === '$20,000 or more';
{{@loop.9}}}
class Component extends DCLogic {
  constructor(props) { super(props); this.state = { sent: false, phase: 0, inkIn: false, det: false, menu: false, scrolled: false, slide: 0, playing: true, conv: 0, carManual: false, carIn: false }; this._t = []; }
  later(fn, ms) { this._t.push(setTimeout(fn, ms)); }
  go(p) { if (this.state.phase < p) this.setState({ phase: p }); }
  componentDidMount() {
    let reduce = false; try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    // smooth scroll, nothing pinned
    try { if ((this.props.smooth ?? true) && !reduce && window.Lenis) { this._lenis = new window.Lenis({ autoRaf: true, lerp: 0.09, smoothWheel: true, anchors: true }); } } catch (e) {}
    this.later(() => { try { document.querySelectorAll('video.hlv').forEach((v) => { v.muted = true; const p = v.play(); if (p && p.catch) p.catch(() => {}); }); } catch (e) {} }, 200);
    // hero: ink once, orb, words, button
    this._it = []; const il = (fn, ms) => this._it.push(setTimeout(fn, ms));
    // hero intro (film pull-back): the orb opens full screen, seen from its pole, zooms out and tilts back up to stand straight.
    // The tilt starts while the zoom is still moving (overlapping keyframes). Then nav, words, button.
    // Film timing (Luz film, hero H1, in real seconds): the zoom out runs in log space with a cubic ease-out over 1.0 s; the tilt is EZ from 0.4 s to 1.55 s.
    const ZOOM = 1.0, TILT_AT = 0.4, TILT = 1.15, POLE = Math.PI / 2 - 0.16;   // starts looking straight down the pole, ends upright (the orb's own 0.16 lean)
    const ez = (x) => { const c1 = 0.3, c2 = 0.08; let lo = 0, hi = 1, u = x; for (let k = 0; k < 18; k++) { u = (lo + hi) / 2; const bx = 3 * (1 - u) * (1 - u) * u * c1 + 3 * (1 - u) * u * u * c2 + u * u * u; if (bx < x) lo = u; else hi = u; } return 3 * (1 - u) * u * u + u * u * u; };   // cubic-bezier(.3,0,.08,1): quick departure, long settle
    const eoc = (x) => 1 - Math.pow(1 - x, 3);
    this._iv = null;
    this._orbPre = (now, ready) => {
      const I = this._iv; if (!I) return null;
      const cv = document.getElementById('orb'), box = cv && cv.parentElement, hero = document.getElementById('hero'); if (!box || !hero) return null;
      const b = box.getBoundingClientRect(), h = hero.getBoundingClientRect(); if (!b.height) return null;
      // One canvas, one size, the whole time (no swap when the orb lands, so nothing blips): it starts at the hero's top-left and is as big as
      // the screen (or the hero, if taller). The orb is drawn centred on its box. The box, not the canvas, takes the pointer.
      if (!I.vw || I.rs) { I.rs = false; I.vw = document.documentElement.clientWidth || innerWidth; I.vh = Math.round((window.visualViewport && window.visualViewport.height) || innerHeight); }
      const aw = I.vw, ah = Math.max(I.vh, Math.round(h.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(4.5e6 / Math.max(1, aw * ah)));   // full screen on any size, capped at ~4.5 MP (Nov 4: a 3.2 MP cap drew the beads below screen resolution and they showed a square pattern; back to 4.5)
      const geo = 'left: ' + Math.round(h.left - b.left) + 'px; top: ' + Math.round(h.top - b.top) + 'px; width: ' + aw + 'px; height: ' + ah + 'px;';
      if (geo !== this.state.orbGeo) this.setState({ orbGeo: geo });
      const cx = b.left + b.width / 2, cy = b.top + b.height / 2, ax = h.left + aw / 2, ay = h.top + ah / 2;
      const view = (k, pitch) => ({ k, ox: (cx - ax) * dpr, oy: -(cy - ay) * dpr, pitch, refH: b.height * dpr, px: dpr });
      if (!I.t0) {
        if (!ready) return view(16, POLE);
        // Nov 5 (Berley: zoom out anyway): if the orb was late, the page already showed; still play the zoom if they're at the top.
        if (I.skip) { if ((window.scrollY || 0) > 120) { I.t0 = now - 1e4; return view(1, 0); } I.t0 = now; }
        else {
          if ((window.scrollY || 0) > 120) { I.t0 = now - 1e4; this.go(1); this.go(2); this.go(3); this.introRelease(); il(() => this.setState({ hintGone: true }), 2500); return view(1, 0); }
          I.t0 = now; this.go(1); il(() => this.go(2), 1100); il(() => this.go(3), 1500); il(() => this.introRelease(), 1550); il(() => this.setState({ hintGone: true }), 4000);
        }
      }
      const t = (now - I.t0) / 1000;
      if (t >= TILT_AT + TILT) return view(1, 0);   // landed: same canvas, the orb just stays put and is free to play with
      // the screen at the start: grow the orb (seen from the pole, a disc ~0.26 x its box) past the farthest visible corner
      const vw = I.vw, vh = I.vh, far = Math.max(Math.hypot(cx, cy), Math.hypot(vw - cx, cy), Math.hypot(cx, vh - cy), Math.hypot(vw - cx, vh - cy));
      if (!I.k0) I.k0 = Math.max(3, Math.min(18, (far * 1.1) / (0.25 * b.height)));
      const k = Math.exp(Math.log(I.k0) * (1 - eoc(Math.min(1, t / ZOOM))));   // log space: the size ratio per frame eases out, like the film's camera distance
      const pitch = POLE * (1 - ez(Math.min(1, Math.max(0, (t - TILT_AT) / TILT))));
      return view(k, pitch);
    };
    addEventListener('resize', () => { if (this._iv) this._iv.rs = true; });
    this.startIntro = () => {   // also used by the Replay button
      this._it.forEach(clearTimeout); this._it = [];
      this.setState({ phase: 0, hintGone: false });
      this._iv = { t0: 0 };
      const I = this._iv;
      il(() => { if (!I.t0) { I.skip = true; this.go(1); il(() => this.go(2), 600); il(() => this.go(3), 1200); il(() => this.introRelease(), 1250); il(() => this.setState({ hintGone: true }), 4000); } }, 12000);   // fallback: the orb still isn't ready after 12 s, show the page
    };
    // Nov 5 (Berley): the zoom out plays on every device, Reduce Motion included. Start at the top so a restored scroll doesn't skip it.
    try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; if (!location.hash) window.scrollTo(0, 0); } catch (e) {}
    this.startIntro();
    this.later(() => { try { const cv = document.getElementById('orb');
      if (window.ArtelOrb && cv) this._orb = window.ArtelOrb.mount(cv, { hit: cv.parentElement, pre: (now, ready) => (this._orbPre ? this._orbPre(now, ready) : null), onClick: () => { if ((this.props.orbClick ?? 'play') === 'chat') { const a = document.getElementById('ask'); if (a) { if (this._lenis) this._lenis.scrollTo(a, { offset: -120 }); else a.scrollIntoView({ behavior: 'smooth', block: 'center' }); const i = document.getElementById('askLuz'); if (i) setTimeout(() => i.focus({ preventScroll: true }), 900); } } } }); } catch (e) {} }, 0);
    // scroll: nav background, the hero settles back
    const stage = document.getElementById('heroStage'), hero = document.getElementById('hero');
    const fitStage = () => { try { [[stage, hero], [document.querySelector('#loopCard > div'), document.getElementById('loopCard')]].forEach(([st, box]) => { if (!st || !box) return; const words = [...box.children].find((c) => c !== st && c.querySelector && c.querySelector('h1, p')); if (!words) return; const para = words.querySelector('p'), lh = para ? parseFloat(getComputedStyle(para).lineHeight) || 0 : 0, short = (para && lh) ? Math.max(0, 3 - Math.round(para.offsetHeight / lh)) * lh : 0; /* Nov 5 (Berley): the orb sits where it does on Black Friday on every screen, so a shorter paragraph still keeps 3 lines of room under it */ st.style.paddingBottom = Math.round(words.offsetHeight + 20 + short) + 'px'; /* Nov 5 (Berley): on phones the orb gets a real size (about 3/4 of the width) and the section grows to fit, instead of the orb shrinking to what the text leaves */ const sec = box.closest('section') || box; /* phones only (Berley: PC and iPad stay as they were); min-height so the section's own height is never touched */ if (window.innerWidth < 768) { const want = Math.min(window.innerWidth * 0.76, 330), need = Math.ceil(68 + want + words.offsetHeight + 20 + short); sec.style.setProperty('min-height', Math.max(560, need) + 'px'); } else sec.style.setProperty('min-height', '560px'); }); if (!this.state.inkIn && this._calcInk) { this._calcInk(); this.setState({ inkK: (this.state.inkK || 0) + 1 }); } } catch (e) {} };
    fitStage(); window.addEventListener('resize', fitStage); if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitStage); this.later(fitStage, 400);
    this._scroll = () => { if (this._raf) return; this._raf = requestAnimationFrame(() => { this._raf = 0;
      const y = window.scrollY || document.documentElement.scrollTop || 0; const s = y > 24; if (s !== this.state.scrolled) this.setState({ scrolled: s });
      this.loopStep(y);
      if (!stage || !hero || reduce) return; const r = hero.getBoundingClientRect(), k = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
      stage.style.transform = 'translateY(' + (k * -60) + 'px) scale(' + (1 - k * 0.14) + ')'; stage.style.opacity = String(1 - k * 0.85); }); };
    window.addEventListener('scroll', this._scroll, { passive: true });
    // highlights: which card is in view
    const tr = document.getElementById('hlTrack');
    if (tr) { this._track = tr; this._ts = () => { if (performance.now() < (this._progUntil || 0)) return; const w = tr.firstElementChild ? tr.firstElementChild.getBoundingClientRect().width + 20 : 1; const i = Math.round(tr.scrollLeft / w); if (i !== this.state.slide) this.setState({ slide: Math.max(0, Math.min(3, i)) }); }; tr.addEventListener('scroll', this._ts, { passive: true }); }
    if (tr) { const man = () => { if (!this.state.carManual) this.setState({ carManual: true }); };
      tr.addEventListener('pointerdown', man, { passive: true }); tr.addEventListener('touchstart', man, { passive: true });
      tr.addEventListener('wheel', (e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) man(); }, { passive: true });
      if ('IntersectionObserver' in window) { this._carIo = new IntersectionObserver((es) => es.forEach((en) => { const v = en.isIntersecting && en.intersectionRatio > 0.35; if (v !== this.state.carIn) this.setState({ carIn: v }); }), { threshold: [0, 0.35, 0.6] }); this._carIo.observe(tr); } else this.setState({ carIn: true });
      this._carEnd = (e) => { if (e.animationName !== 'lpfill' || this.state.carManual || !this.state.playing || !this._carGo) return; this._carGo((this.state.slide + 1) % this._carN); };
      document.addEventListener('animationend', this._carEnd); }
    try { const d = document.getElementById('highlights');
      if (d && 'IntersectionObserver' in window) { this._io = new IntersectionObserver((es) => { es.forEach((en) => { if (en.isIntersecting && en.intersectionRatio > 0.15) this.setState({ det: true }); }); }, { threshold: [0, 0.15, 0.4] }); this._io.observe(d); }
      else this.setState({ det: true }); } catch (e) { this.setState({ det: true }); }
    this.initMotion(); this.initChat();
    // conversations advance on their own until someone picks one
    this._cv = setInterval(() => { if (!this._picked) this.setState({ conv: (this.state.conv + 1) % 4 }); }, 13000);
  }
  initMotion() {
    let reduce = false; try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    const root = document.documentElement; root.classList.add('m-on');
    const els = Array.from(document.querySelectorAll('[data-m]'));
    // siblings that reveal together come in one after another (90 ms apart)
    els.forEach((el) => { const sib = Array.from(el.parentElement ? el.parentElement.children : []).filter((x) => x.hasAttribute('data-m'));
      const i = sib.indexOf(el); if (i > 0) el.style.transitionDelay = (i * 90) + 'ms'; });
    const counters = Array.from(document.querySelectorAll('[data-count]'));
    const count = (el) => { if (el._counted) return; el._counted = true; const raw = el.textContent; const m = raw.match(/^([^0-9]*)([0-9][0-9,]*)(.*)$/); if (!m || reduce) return;
      const target = +m[2].replace(/,/g, ''), comma = m[2].includes(','), t0 = performance.now(), dur = 1400;
      const fmt = (v) => (comma ? Math.round(v).toLocaleString('en-US') : String(Math.round(v)));
      const step = (t) => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = m[1] + fmt(target * e) + m[3]; if (k < 1) requestAnimationFrame(step); };
      el.textContent = m[1] + fmt(0) + m[3]; requestAnimationFrame(step); };
    if (reduce || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('m-in')); this.initPods(); return; }
    this._mio = new IntersectionObserver((es) => es.forEach((en) => { if (!en.isIntersecting) return; en.target.classList.add('m-in'); this._mio.unobserve(en.target); }), { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });
    els.forEach((e) => this._mio.observe(e)); this._mEls = els; this._mCounters = counters;
    this._cio = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { count(en.target); this._cio.unobserve(en.target); } }), { threshold: 0.6 });
    counters.forEach((e) => this._cio.observe(e));
    // the film grows from the content width to the full width as it rises into view
    const fills = Array.from(document.querySelectorAll('[data-fill]'));
    if (fills.length) { const fit = () => { const vh = window.innerHeight || 800, vw = document.documentElement.clientWidth;
        fills.forEach((f) => { const r = f.getBoundingClientRect(); const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.75)));
          const e = p * p * (3 - 2 * p); const gut = Math.max(Math.min(64, Math.max(20, vw * 0.04)), (vw - 1240) / 2);
          f.style.clipPath = 'inset(0 ' + (gut * (1 - e)).toFixed(1) + 'px)'; }); };
      this._fill = () => { if (this._fr) return; this._fr = requestAnimationFrame(() => { this._fr = 0; fit(); }); };
      window.addEventListener('scroll', this._fill, { passive: true }); window.addEventListener('resize', this._fill); fit(); }
    // films that play once when they come into view (the colour line-up)
    const once = Array.from(document.querySelectorAll('video[data-playonce]'));
    if (once.length) { this._vio = new IntersectionObserver((es) => es.forEach((en) => { if (!en.isIntersecting) return; const v = en.target; this._vio.unobserve(v); try { v.muted = true; v.currentTime = 0; const q = v.play(); if (q && q.catch) q.catch(() => {}); } catch (x) {} }), { threshold: 0.55 });
      once.forEach((v) => this._vio.observe(v)); }
    this.initLineup(); this.initPods();
  }
  initLineup() {
    const cv = document.getElementById('lineup'); if (!cv || !cv.getContext) return;
    const W = 240, H = 80, d = Math.min(2, window.devicePixelRatio || 1); cv.width = W * d; cv.height = H * d; const c = cv.getContext('2d'); c.scale(d, d);
    const FG = '#1D1D1F', BG = '#F5F5F7', OR = '#FF7B00';
    const MARK = [[0,-10],[4.87,-5],[9.74,0],[4.87,5],[0,10],[-4.88,5],[-9.75,0],[-4.88,-5]], MR = 1.95, WR = 1.22;
    const WRAW = '1.62,17.78 1.6,15.05 1.6,12.34 1.59,9.63 1.59,6.9 1.58,4.19 4.75,12.39 4.72,1.53 7.95,12.33 7.93,1.46 11.01,12.32 10.99,1.44 14.19,17.81 14.18,15.09 14.18,12.38 14.18,9.65 14.17,6.94 14.16,4.23 19.79,17.78 19.78,15.05 19.78,12.34 19.77,9.63 19.77,6.9 19.76,4.19 19.76,1.47 22.91,9.68 22.9,1.53 26.12,9.6 26.1,1.46 29.19,9.6 29.16,1.44 32.37,17.81 32.36,15.09 32.36,12.38 32.34,6.94 32.33,4.23 37.91,1.47 41.05,1.53 44.29,17.76 44.28,15.04 44.28,12.33 44.27,9.6 44.27,6.89 44.26,4.18 44.26,1.46 47.32,1.44 50.49,1.5 55.4,17.78 55.38,15.05 55.38,12.34 55.37,9.63 55.37,6.9 55.36,4.19 55.36,1.47 58.53,17.84 58.52,9.68 58.5,1.53 61.74,17.76 61.72,9.6 61.71,1.46 64.82,17.75 64.79,9.6 64.77,1.44 67.97,17.81 67.96,9.65 67.94,1.5 72.28,17.78 72.27,15.05 72.27,12.34 72.26,9.63 72.26,6.9 72.25,4.19 72.25,1.47 75.41,17.84 78.63,17.76 81.7,17.75 84.86,17.81';
    const WORD = WRAW.split(' ').map((p) => p.split(',').map(Number)).map(([x, y]) => [x - 43.22, y - 9.64]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const SLOT = [3,5,7,6,4,2,0,1], WSRC = WORD.map((_, j) => Math.min(7, Math.floor(j * 8 / WORD.length)));
    const cl = (x) => Math.min(1, Math.max(0, x)), P = (t, a, b) => cl((t - a) / (b - a)), eo = (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)), eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2), mix = (a, b, t) => a + (b - a) * t;
    const hx = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    const mixC = (a, b, t) => { const A = hx(a), B = hx(b); return 'rgb(' + A.map((v, i) => Math.round(mix(v, B[i], t))).join(',') + ')'; };
    const dot = (x, y, r, col) => { if (r <= 0) return; c.fillStyle = col; c.beginPath(); c.arc(x, y, r, 0, 6.2832); c.fill(); };
    const s = H, cx = W / 2, cy = H / 2, k = s * 0.36 / 24, gap = Math.min(W * 0.075, s * 0.12), rl = MR * k * 0.62, kw = Math.min(W * 0.62, s * 2.6) / 87, rw = WR * kw * 1.04;
    const lx = (sl) => cx + (sl - 3.5) * gap;
    const draw = (t) => { c.fillStyle = BG; c.fillRect(0, 0, W, H);
      if (t < 3.3) { const a = eio(P(t, 0.4, 1.4)); MARK.forEach(([x, y], i) => { const sl = SLOT[i]; const o = eo(P(t, 1.5 + sl * 0.12, 1.75 + sl * 0.12)); let r = mix(MR * k, rl, a); if (o > 0 && o < 1) r *= 1 + 0.35 * Math.sin(o * Math.PI); dot(mix(cx + x * k, lx(sl), a), mix(cy + y * k, cy, a), r, mixC(FG, OR, o)); }); return; }
      const sw = P(t, 5.0, 6.4), bx = mix(-0.2, 1.2, sw);
      WORD.forEach(([x, y], j) => { const sl = WSRC[j]; const b = eo(P(t, 3.3 + j * 0.011, 4.3 + j * 0.011)); const cj = P(t, 4.2 + j * 0.007, 5.0 + j * 0.007); let col = mixC(OR, FG, cj);
        if (sw > 0 && sw < 1) { const u = (x + 43.2) / 87; col = mixC(FG, OR, Math.exp(-Math.pow((u - bx) / 0.07, 2)) * cj); }
        dot(mix(lx(sl), cx + x * kw, b), mix(cy, cy + y * kw, b), mix(rl, rw, b), col); }); };
    let reduce = false; try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    draw(reduce ? 6.9 : 0); if (reduce || !('IntersectionObserver' in window)) { draw(6.9); return; }
    const io = new IntersectionObserver((es) => { if (!es[0].isIntersecting) return; io.disconnect(); const t0 = performance.now();
      const run = (now) => { const t = (now - t0) / 1000; draw(Math.min(t, 6.9)); if (t < 6.9) requestAnimationFrame(run); }; requestAnimationFrame(run); }, { threshold: 0.8 });
    io.observe(cv);
  }
  initChat() {
    // The Luz app's idle screen opens with "Stop Reacting / Start Leading" and a paragraph. On these landing pages only,
    // that header is cropped out of view (the homepage embed is untouched). When a chat starts, the app posts
    // luz:fullscreen and the whole frame shows again.
    const wrap = document.getElementById('luzWrap'), f = document.getElementById('luzChat'); if (!wrap || !f) return;
    const lerp = (T, w) => { if (w <= T[0][0]) return T[0][1]; for (let i = 1; i < T.length; i++) if (w <= T[i][0]) { const [a, va] = T[i - 1], [b, vb] = T[i]; return va + (vb - va) * (w - a) / (b - a); } return T[T.length - 1][1]; };
    const LEDE = [[340, 218], [420, 196], [520, 179], [600, 189], [720, 204], [900, 220]];      // bottom of the app's paragraph, measured
    // Nov 5 (Berley): "Replies in seconds · EN / FR" sits 10 px under the Talk to Luz button, so the crop has to land right on the button.
    // The app's layout jumps at 371, 509 and 901 px wide, so the button bottom is measured every 10 px and never blended across a jump.
    const SEG = [[[300, 634], [370, 634]],
      [[371, 612], [410, 612], [420, 617], [430, 623], [440, 628], [450, 633], [460, 639], [470, 644], [480, 649], [490, 655], [500, 662], [508, 667]],
      [[509, 646], [510, 647], [520, 653], [530, 660], [540, 666], [550, 673], [560, 680], [570, 686], [580, 693], [590, 699], [600, 706], [610, 712], [620, 719], [630, 726], [640, 732], [650, 735], [660, 736], [670, 737], [680, 739], [690, 740], [700, 741], [720, 744], [740, 746], [760, 749], [780, 751], [800, 754], [820, 756], [840, 759], [860, 761], [880, 764], [900, 766]],
      [[901, 700], [920, 701], [940, 702], [960, 704], [980, 705], [1000, 706], [1040, 709], [1080, 711], [1120, 714], [1160, 716], [1200, 719]]];
    const btnBottom = (w) => { w = Math.floor(w); const S = SEG.find((s) => w <= s[s.length - 1][0]) || SEG[SEG.length - 1]; return lerp(S, w); };
    const fit = () => { const w = wrap.clientWidth;
      const crop = Math.round(lerp(LEDE, w) + 14 + 44 /* Nov 11: 44px less white above the orb, so the orb and button sit centred in the card by eye */), end = Math.floor(btnBottom(w) + 9);
      if (this._chatOpen) { f.style.top = '0px'; f.style.height = '100%'; let ph = false; try { ph = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768; } catch (x) { ph = window.innerWidth < 768; }
        /* Nov 11 (Berley): on computers the open chat keeps the same height as the closed card */ wrap.style.minHeight = (ph ? 620 : Math.max(440, end - crop)) + 'px'; if (!ph) wrap.style.height = Math.max(440, end - crop) + 'px'; return; }
      wrap.style.height = ''; /* Nov 11: the orb area runs 9px under the button, right to the card's bottom edge (the app's small line starts 10px under the button) */
      wrap.style.minHeight = (end - crop) + 'px'; /* Nov 11: particles reach the card's bottom edge, no white band (Berley) */ f.style.top = (-crop) + 'px'; f.style.height = (end) + 'px'; };
    // Nov 5 (Berley): the full-screen takeover is for phones and tablets only. On desktop the chat opens inside its card.
    const phoneish = () => { try { return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768; } catch (x) { return window.innerWidth < 768; } };
    this._chatMsg = (e) => { if (!/artelagency\.com$/.test((e.origin || '').replace(/^https?:\/\//, '').split(':')[0])) return; const d = e.data || {};
      if (d && d.type === 'luz:fullscreen') { const was = this._chatOpen;
        // Nov 5 (Berley): the chat takes over the whole screen while it's open (scroll moves the chat, the keyboard lifts the message box), like the homepage
        if (d.on) { this._chatOpen = true; fit(); if (this._take && phoneish()) { this._take.open(); this._took = true; } } else { if (this._take && this._took) this._take.close(); this._took = false; this._chatOpen = false; fit(); if (was) reset(); } } };
    this._take = window.LuzTakeover ? window.LuzTakeover(f, { bg: '#F5F5F7' }) : null;
    // Nov 5: after a chat ends, the app's closing animation can leave the chat panel peeking out at the sides of
    // the cropped orb screen. Reload the frame fresh (same visitor id, so the conversation is kept), with a short fade.
    const reset = () => { /* Nov 11 (Berley): no frame reload when a chat closes. The reload replayed the particles forming; the app itself returns to the fully formed orb, so particles form once, at the start. */ };
    window.addEventListener('message', this._chatMsg); window.addEventListener('resize', fit); fit();
  }
  initPods() {
    const sec = document.getElementById('lineup-sec'), cv = document.getElementById('podsCv'); if (!sec || !cv) return;
    let reduce = false; try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    reduce = false;   // Nov 5 (Berley): the pods animate on every phone, Reduce Motion included (the still frame came up blank on iPhone)
    const mountPods = () => { if (this._pods || !window.ArtelLineup || !window.THREE) return !!this._pods; this._pods = window.ArtelLineup.mount(cv, { manual: reduce }); if (this._pods && reduce) this._pods.still(4); return true; };
    const need = () => { if (window.ArtelLineup) return; if (document.getElementById('luScript')) return; const s = document.createElement('script'); s.id = 'luScript'; s.src = 'js/orb-lineup.js'; document.head.appendChild(s); };
    if (reduce) { sec.classList.add('lu-go'); }
    const go = () => { sec.classList.add('lu-go'); const tryPlay = () => { if (mountPods() && this._pods) { if (!reduce) this._pods.play(); } else setTimeout(tryPlay, 200); }; tryPlay(); };
    const start = () => { if (this._luStarted) return; this._luStarted = true; need(); const wait = () => { if (!mountPods()) setTimeout(wait, 250); }; wait(); };
    if ('IntersectionObserver' in window) { this._lunear = new IntersectionObserver((es) => { if (es.some((en) => en.isIntersecting)) { start(); this._lunear.disconnect(); } }, { rootMargin: '150% 0px 150% 0px' }); this._lunear.observe(sec); } else start();
    if (!('IntersectionObserver' in window)) { go(); return; }
    this._luio = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting && !sec.classList.contains('lu-go')) go(); }), { threshold: 0, rootMargin: '0px 0px -20% 0px' });
    this._luio.observe(sec);
  }
  rearm() {   // after the loop lands back on the hero, everything below plays again on the way down
    const vh = window.innerHeight || 900, below = (el) => el.getBoundingClientRect().top > vh;
    (this._mEls || []).forEach((el) => { if (!below(el) || !el.classList.contains('m-in')) return; el.classList.add('m-reset'); el.classList.remove('m-in'); void el.offsetWidth; el.classList.remove('m-reset'); if (this._mio) this._mio.observe(el); });
    (this._mCounters || []).forEach((el) => { if (!below(el)) return; el._counted = false; if (this._cio) this._cio.observe(el); });
    document.querySelectorAll('video[data-playonce]').forEach((v) => { try { v.pause(); v.currentTime = 0; } catch (x) {} if (this._vio) this._vio.observe(v); });
    const sec = document.getElementById('lineup-sec');
    if (sec && below(sec)) { sec.classList.add('lu-reset'); sec.classList.remove('lu-go'); void sec.offsetWidth; sec.classList.remove('lu-reset'); if (this._pods) this._pods.reset(); }
  }
  syncVids() {   // carousel: only the film in front plays, and only while the carousel is on screen
    const tr = this._track; if (!tr) return;
    Array.from(tr.children).forEach((card, i) => { const v = card.querySelector('video'); if (!v) return;
      const want = i === this.state.slide && this.state.carIn && this.state.playing && !document.hidden;
      if (i === 0) { v.loop = false;   // the film card: the orb's head tilts back once, the line comes in, it holds; a click opens the full film
        const box = v.parentElement, hold = () => { try { v.pause(); if (v.duration && v.currentTime < v.duration - 0.1) v.currentTime = v.duration - 0.02; } catch (x) {} };
        if (!v._aaFc) { v._aaFc = 1;
          v.addEventListener('playing', () => { if (box) box.classList.add('fc-on'); });
          v.addEventListener('timeupdate', () => { if (v.currentTime > 2.9 && box) box.classList.add('fc-end'); });
          v.addEventListener('ended', () => { this._fcDone = true; if (box) box.classList.add('fc-on', 'fc-end'); });
          v.addEventListener('play', () => { if (this._fcDone) hold(); }); v.addEventListener('loadedmetadata', () => { if (this._fcDone) hold(); }); }
        if (this._fcDone) { if (box && !box.classList.contains('fc-end')) { box.classList.add('fc-snap', 'fc-on', 'fc-end'); requestAnimationFrame(() => requestAnimationFrame(() => box.classList.remove('fc-snap'))); } hold(); return; }   // a redrawn card keeps its end pose without replaying
        if (want && !this._fcSeen) { this._fcSeen = true; try { v.currentTime = 0; } catch (x) {} } }   // starts from the top the first time it is actually on screen
      try { if (want && v.paused) { const q = v.play(); if (q && q.catch) q.catch(() => {}); } else if (!want && !v.paused) v.pause(); } catch (x) {} });
  }
  introRelease() {   // the hero intro is done (or they scrolled): show what's below and let its reveals play
    if (this._released) return; this._released = true;
    const vh = window.innerHeight || 900, hero = document.getElementById('hero');
    (this._mEls || []).forEach((el) => { if (hero && hero.contains(el)) return; const r = el.getBoundingClientRect(); if (r.top > vh || r.bottom < 0 || !el.classList.contains('m-in')) return;
      el.classList.add('m-reset'); el.classList.remove('m-in'); void el.offsetWidth; el.classList.remove('m-reset'); if (this._mio) this._mio.observe(el); });
    this.setState({ introFree: true });
  }
  loopStep(y) {
    const L = this._loopEl || (this._loopEl = document.getElementById('loop')), card = this._loopCard || (this._loopCard = document.getElementById('loopCard'));
    if (y > 40 && !this._released) this.introRelease();
    if (!L || !card) return; const vh = window.innerHeight || 900, top = L.getBoundingClientRect().top;
    const k = Math.min(1, Math.max(0, 1 - top / vh)); const e = k * k * (3 - 2 * k);
    card.style.transform = 'scale(' + (0.84 + 0.16 * e) + ')'; card.style.filter = 'brightness(' + (0.8 + 0.2 * e) + ')';
    if (!this._loopL) { this._loopL = true;   // the wheel and the finger keep talking even when the page can't scroll any further
      window.addEventListener('wheel', (ev) => { if (ev.deltaY > 0) { this._dir = 1; this.loopCheck(); } }, { passive: true });
      window.addEventListener('touchstart', (ev) => { this._ty = ev.touches[0] ? ev.touches[0].clientY : 0; }, { passive: true });
      window.addEventListener('touchmove', (ev) => { const t = ev.touches[0]; if (t && this._ty - t.clientY > 8) { this._dir = 1; this.loopCheck(); } }, { passive: true }); }
    if (this._lastY !== undefined && y !== this._lastY) this._dir = y > this._lastY ? 1 : -1; this._lastY = y;
    this.loopCheck();
  }
  loopCheck() {
    const L = this._loopEl; if (!L || this._jumping || this._dir !== 1) return;
    const r = L.getBoundingClientRect(), vh = window.innerHeight || 900;
    if (!(r.top < 0.3 * vh && r.top > -r.height / 2)) return;
    this._jumping = 1; const target = (window.scrollY || 0) + r.top, ln = this._lenis;
    // Nov 5 (Berley: smooth on phones, no skip): while the card glides up, finger and wheel input is held, which also stops
    // iOS momentum, so nothing fights the glide or carries the page past the hero after the jump. The glide is drawn frame by
    // frame (Lenis when it runs, our own tween when it doesn't, e.g. Reduce Motion), and the jump waits for the glide to end.
    const html = document.documentElement; let lastIn = performance.now(); const hold = (ev) => { lastIn = performance.now(); if (ev.cancelable) ev.preventDefault(); };
    const lock = (on) => { try { if (on) { html.style.overflow = 'hidden'; window.addEventListener('touchmove', hold, { passive: false }); window.addEventListener('wheel', hold, { passive: false }); }
      else { html.style.overflow = ''; window.removeEventListener('touchmove', hold, { passive: false }); window.removeEventListener('wheel', hold, { passive: false }); } } catch (x) {} };
    lock(true);
    const land = () => { if (this._jumping !== 1) return; this._jumping = 2;
      const sb = html.style.scrollBehavior; html.style.scrollBehavior = 'auto';
      if (ln) { ln.scrollTo(0, { immediate: true, force: true }); } window.scrollTo(0, 0); html.style.scrollBehavior = sb;
      try { this.rearm(); } catch (x) {}
      // give the page back once the leftover momentum (iOS flick, trackpad inertia) has stopped: no input for 220 ms, at least 450 ms, at most 1.6 s
      const tl = performance.now(), rel = () => { const now = performance.now(); if ((now - tl > 450 && now - lastIn > 220) || now - tl > 1600) { lock(false); if (ln) ln.start(); this._jumping = 0; this._lastY = window.scrollY || 0; this._dir = 0; } else setTimeout(rel, 60); }; setTimeout(rel, 450); };
    if (ln) { ln.start(); ln.scrollTo(target, { duration: 0.55, easing: (t) => 1 - Math.pow(1 - t, 3), lock: true, force: true, onComplete: land }); }
    else { const y0 = window.scrollY || 0, t0 = performance.now(), D = 550, R = window.__aaRAF || window.requestAnimationFrame.bind(window);
      const sb = html.style.scrollBehavior; html.style.scrollBehavior = 'auto';
      const step = (now) => { const t = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - t, 3); window.scrollTo(0, y0 + (target - y0) * e);
        if (t < 1) R(step); else { html.style.scrollBehavior = sb; land(); } };
      R(step); }
    setTimeout(() => { if (this._jumping === 1) land(); }, 1200);
  }
  openFilmLayer() {   // full-screen player: pause the page films, lock the page, play with sound
    try { document.querySelectorAll('video.hlv').forEach((v) => v.pause()); } catch (x) {}
    this._filmFrom = document.activeElement; this.setState({ filmOn: true });
    try { if (this._lenis) this._lenis.stop(); document.documentElement.style.overflow = 'hidden'; } catch (x) {}
    requestAnimationFrame(() => { this.setState({ filmIn: true }); const v = document.getElementById('filmPlayer'); if (v) { try { v.currentTime = 0; v.muted = false; const q = v.play(); if (q && q.catch) q.catch(() => {}); v.focus({ preventScroll: true }); } catch (x) {} } try { window.__aaFilmSet && window.__aaFilmSet(true); } catch (x) {} });
    if (!this._filmKey) { this._filmKey = (ev) => { if (ev.key === 'Escape' && this.state.filmOn) this.closeFilmLayer(); }; document.addEventListener('keydown', this._filmKey); }
  }
  closeFilmLayer() {
    try { window.__aaFilmSet && window.__aaFilmSet(false); } catch (x) {}
    const v = document.getElementById('filmPlayer'); try { if (v) v.pause(); if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen(); } catch (x) {}
    this.setState({ filmIn: false }); setTimeout(() => { this.setState({ filmOn: false }); try { document.documentElement.style.overflow = ''; if (this._lenis) this._lenis.start(); if (this._filmFrom && this._filmFrom.focus) this._filmFrom.focus({ preventScroll: true }); } catch (x) {} if (this.syncVids) this.syncVids(); }, 360);
  }
  componentWillUnmount() { if (this._carEnd) document.removeEventListener('animationend', this._carEnd); if (this._carIo) this._carIo.disconnect(); this._t.forEach(clearTimeout); (this._it || []).forEach(clearTimeout); clearInterval(this._cv); clearTimeout(this._pullT); try { if (this._io) this._io.disconnect(); if (this._orb) this._orb.destroy(); if (this._lenis) this._lenis.destroy(); window.removeEventListener('scroll', this._scroll); if (this._fill) window.removeEventListener('scroll', this._fill); if (this._chatMsg) window.removeEventListener('message', this._chatMsg); if (this._mio) this._mio.disconnect(); if (this._luio) this._luio.disconnect(); if (this._pods) this._pods.destroy(); if (this._track) this._track.removeEventListener('scroll', this._ts); } catch (e) {} }
  renderVals() {
    const ph = this.state.phase, chat = (this.props.orbClick ?? 'play') === 'chat';
    const CARDS = [
{{@loop.10}}    ];
    const me = (t, k) => ({ t, k, side: 'flex-end', bg: '#1D1D1F', ink: '#FFFFFF', rad: '18px 18px 4px 18px' });
    const luz = (t, k) => ({ t, k, side: 'flex-start', bg: '#F2F2F4', ink: '#1D1D1F', rad: '18px 18px 18px 4px' });
    const C = [
{{@loop.11}}    ];
    const scrollToCard = (i) => { const tr = this._track; if (!tr || !tr.children[i]) return; this._progUntil = performance.now() + 900; tr.scrollTo({ left: tr.children[i].offsetLeft - tr.children[0].offsetLeft, behavior: 'smooth' }); this.setState({ slide: i }); };
    this._carGo = scrollToCard; this._carN = CARDS.length; Promise.resolve().then(() => this.syncVids()); let rmo = false; try { rmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    const auto = !this.state.carManual && !rmo, take = () => { if (!this.state.carManual) this.setState({ carManual: true }); };
    return {
      navBg: this.state.scrolled || this.state.menu ? 'rgba(245,245,247,0.86)' : 'rgba(245,245,247,0)',
      navBlur: this.state.scrolled ? 'saturate(180%) blur(18px)' : 'none',
      navLine: 'rgba(29,29,31,0)',
{{@loop.12}}      toggleMenu: () => this.setState({ menu: !this.state.menu }),
      showReplay: this.props.showReplay === true,
      inkSrc: (() => { let w = 1440, d = 1; try { w = Math.max(window.innerWidth, window.innerHeight); d = window.devicePixelRatio || 1; } catch (e) {} return w * d >= 3400 ? 'assets/4a31b904fb71e8d45680ace7c4cc2954.mp4' : 'assets/521457798e663ff07745212d99d5922a.mp4'; })(),
      replay: () => { if (this._lenis) this._lenis.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0); if (this.startIntro) this.startIntro(); },
      introCls: ph >= 3 || this.state.introFree ? '' : 'intro-hold', inkO: ph >= 1 ? 0 : 1, inkS: this.state.inkIn ? 'scale(1)' : 'scale(' + (this._inkStart || 5).toFixed(2) + ')', inkDur: this.state.inkIn ? '2.9s' : '0s',
      navO: ph >= 2 ? 1 : 0, navPE: ph >= 2 ? 'auto' : 'none', orbO: ph >= 1 ? 1 : 0, orbGeo: this.state.orbGeo || 'inset: 0; width: 100%; height: 100%;', orbPE: ph >= 1 ? 'auto' : 'none',
      textO: ph >= 2 ? 1 : 0, textT: ph >= 2 ? 'none' : 'translateY(18px)',
      ctaO: ph >= 3 ? 1 : 0, ctaT: ph >= 3 ? 'none' : 'translateY(14px)', hintO: ph >= 3 && !this.state.hintGone ? 1 : 0,
{{@loop.13}}      detO: this.state.det ? 1 : 0, detT: this.state.det ? 'none' : 'translateY(28px)',
      cards: CARDS.map((c) => ({ ...c, boxCls: c.end ? 'hlbox fc' : 'hlbox', ovDisp: c.end ? 'flex' : 'none', h1: c.h1 || '', h2: c.h2 || '', cur: c.end ? 'pointer' : 'auto', boxClick: () => { if (c.end) this.openFilmLayer(); } })),
{{@loop.14}}      carCls: !this.state.playing || !this.state.carIn ? 'car-bar is-paused' : 'car-bar',
      prevCard: () => { take(); scrollToCard((this.state.slide + CARDS.length - 1) % CARDS.length); }, nextCard: () => { take(); scrollToCard((this.state.slide + 1) % CARDS.length); },
{{@loop.15}}      togglePlay: () => { const p = !this.state.playing; try { document.querySelectorAll('#hlTrack video.hlv').forEach((v) => { if (p) { if (v.ended) return; const q = v.play(); if (q && q.catch) q.catch(() => {}); } else v.pause(); }); } catch (e) {} this.setState({ playing: p }); },
      openFilm: (e) => { if (e && e.preventDefault) e.preventDefault(); this.openFilmLayer(); },
      closeFilm: (e) => { if (e && e.stopPropagation) e.stopPropagation(); this.closeFilmLayer(); },
      filmBackdrop: (e) => { if (e && e.target && e.target.id === 'filmLayer') this.closeFilmLayer(); },
      filmDisp: this.state.filmOn ? 'flex' : 'none', filmO: this.state.filmIn ? 1 : 0, filmSrc: aaFilmSrc(),
      convs: C.map((c, i) => ({ ...c, n: String(i + 1).padStart(2, '0'), on: i === this.state.conv ? 'true' : 'false', disp: i === this.state.conv ? 'flex' : 'none',
        tabBg: i === this.state.conv ? '#1D1D1F' : '#FFFFFF', tabInk: i === this.state.conv ? '#FFFFFF' : '#1D1D1F', tabLine: i === this.state.conv ? '#1D1D1F' : 'rgba(29,29,31,0.14)',
        pick: () => { this._picked = true; this.setState({ conv: i }); } })),
      formOpen: !this.state.sent, formSent: this.state.sent,
{{@loop.16}}        pick: () => { const qa = (this.state.qa || []).slice(); qa[si] = t; this.setState({ qa }); setTimeout(() => this.setState({ qStep: si + 1 }), 220); } }; }) })),
{{@loop.17}}      qFormDisp: (this.state.qStep || 0) === QS.length ? 'grid' : 'none', qBackDisp: (this.state.qStep || 0) > 0 ? 'inline-flex' : 'none',
      qBack: () => this.setState({ qStep: Math.max(0, (this.state.qStep || 0) - 1) }),
{{@loop.18}}    };
  }
}

if(window.__aaNoLenis){try{window.Lenis=null;}catch(e){}} dcBoot(Component, {"orbClick": "play", "smooth": true, "showReplay": false}, document.getElementById('dc-root'));
/* Black Friday countdown (offer section): Nov 27, 12:00 a.m. Eastern; the box hides once it has passed */
(function(){var T=Date.UTC(2026,10,27,5,0,0);function p(n){return (n<10?'0':'')+n}function tick(){var b=document.getElementById('cdBox');if(!b)return;var d=T-Date.now();if(d<=0){b.style.display='none';return}var m=Math.floor(d/60000);document.getElementById('cdD').textContent=p(Math.floor(m/1440));document.getElementById('cdH').textContent=p(Math.floor(m%1440/60));document.getElementById('cdM').textContent=p(m%60)}tick();setInterval(tick,15000);new MutationObserver(tick).observe(document.getElementById('dc-root'),{childList:true});})();
/* only play the films that are on screen (saves battery and data on phones); carousel films are run by the page: only the slide in front plays */
(function(){if(!('IntersectionObserver' in window))return;var io=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting&&e.intersectionRatio>=0.2){var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})},{threshold:0.2});
function scan(){document.querySelectorAll('video.hlv').forEach(function(v){if(!v.__io&&!v.closest('#hlTrack')){v.__io=1;io.observe(v)}})}scan();new MutationObserver(scan).observe(document.getElementById('dc-root'),{childList:true,subtree:true});})();
