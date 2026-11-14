/* Luz · "She becomes your store" (Nov 14, 2026, Berley).
   Second section of the Luz pages. One live orb, one chat. Each round the orb takes a store's colours
   and the chat answers one of that store's real questions in its tone.
   Montreal Weights and Nordik Recovery: real conversations, word for word (trimmed, never reworded).
   The rest: example stores, fictional, labelled as such. Same conversations as the niche ads.
   The ad a visitor came from plays first (?angle=<key> or a utm_* value naming the niche), then the others.
   Nothing plays until the section is on screen. EN/FR follows the page path, live with the language switch. */
(function () {
  if (window.__aaShow) return; window.__aaShow = 1;
  var SRC = (document.currentScript && document.currentScript.src) || '';
  var reduce = false; try { reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  function isFR() { return /^\/fr-ca(\/|$)/.test(location.pathname); }

  /* ---------- the stores ---------- */
  var S = {
    mw: { real: 1, orb: '#EC2E33', bub: '#2B2B2B', ink: '#FFFFFF', acc: '#D3262B',
      en: { tab: 'Montreal Weights', who: 'Ava · Montreal Weights', tag: 'Real client', cap: 'Real conversation · Montreal Weights, 2026',
        q: 'Setting up a basement gym with a 7 ft ceiling. Should I get the Ascend Power Cage 3.0 or the compact squat rack?',
        a: ['For a 7 ft ceiling, the **Ascend Compact Squat Rack** is the safer choice. It adjusts from **37 to 55 inches**, holds **500 lbs**, and includes safety arms and plate storage.'],
        card: ['Ascend Compact Squat Rack', [['Height', '37 to 55 in'], ['Holds', '500 lbs'], ['Includes', 'Safety arms']]] },
      fr: { tab: 'Montreal Weights', who: 'Ava · Montreal Weights', tag: 'Vrai client', cap: 'Vraie conversation, en anglais · Montreal Weights, 2026',
        card: ['Ascend Compact Squat Rack', [['Hauteur', '37 à 55 po'], ['Charge', '500 lb'], ['Inclus', 'Bras de sécurité']]] } },
    nordik: { real: 1, orb: ['#C9BFA6', '#3E5443'], bub: '#282D27', ink: '#F2F1EA', acc: '#3E5443',
      en: { tab: 'Nordik Recovery', who: 'Sales assistant · Nordik Recovery', tag: 'Real client', cap: 'Real conversation · Nordik Recovery, 2026',
        q: 'What is the internal height of the 2 person outdoor sauna? I’m 6ft 2.',
        a: ['The internal height of the 2-3 Person Sanctuary Outdoor Sauna is **200cm**, which is approximately **6 ft 7 in**.', 'At 6 ft 2, you’ll have plenty of headroom to stand up comfortably inside.'],
        card: ['Sanctuary Outdoor Sauna', [['Inside height', '200 cm · 6 ft 7'], ['Customer', '6 ft 2'], ['Headroom', 'Stands up inside']]] },
      fr: { tab: 'Nordik Recovery', who: 'Assistant de vente · Nordik Recovery', tag: 'Vrai client', cap: 'Vraie conversation, en anglais · Nordik Recovery, 2026',
        card: ['Sauna extérieur Sanctuary', [['Hauteur intérieure', '200 cm · 6 pi 7'], ['Client', '6 pi 2'], ['Espace', 'Debout à l’intérieur']]] } },
    ling: { orb: '#B0102B', bub: '#B0102B', ink: '#FFFFFF', acc: '#B0102B',
      en: { tab: 'Lingerie', who: 'Luz · Lingerie store', tag: 'Example store', cap: 'Example store · fictional',
        q: 'I’m a 34C in most brands. What size should I take in the Mila bra?',
        a: ['Good news: the **Mila** runs true to size. Take your **34C**.', 'Between two cups? Go up one. The lace doesn’t stretch.', 'Free exchanges for **30 days**, so you can try it at home.'],
        card: ['Mila lace bra', [['Fit', 'True to size'], ['Your size', '34C'], ['Exchanges', '30 days']]] },
      fr: { tab: 'Lingerie', who: 'Luz · Boutique de lingerie', tag: 'Boutique d’exemple', cap: 'Boutique d’exemple · fictive',
        q: 'Je porte un 34C dans la plupart des marques. Je prends quoi pour le Mila?',
        a: ['Bonne nouvelle: le **Mila** taille juste. Prenez votre **34C**.', 'Entre deux bonnets? Montez d’un. La dentelle ne s’étire pas.', 'Échange gratuit pendant **30 jours**, pour l’essayer tranquille à la maison.'],
        card: ['Soutien-gorge Mila', [['Taille', 'Juste'], ['Votre taille', '34C'], ['Échanges', '30 jours']]] } },
    kids: { orb: ['#FFC72C', '#3DB4F2'], bub: '#3DB4F2', ink: '#0E2A3D', acc: '#1A7FC0',
      en: { tab: 'Kids’ toys', who: 'Luz · Toy store', tag: 'Example store', cap: 'Example store · fictional',
        q: 'Is the Pompon stacker OK for my 18-month-old?',
        a: ['Yes. The **Pompon** stacker is made for **12 months and up**.', 'No small parts, and the paint is **non-toxic and water-based**.', 'When she’s ready for more, the **Grand Pompon** is for 3 years and up.'],
        card: ['Pompon stacker', [['Ages', '12 months +'], ['Small parts', 'None'], ['Paint', 'Non-toxic']]] },
      fr: { tab: 'Jouets', who: 'Luz · Boutique de jouets', tag: 'Boutique d’exemple', cap: 'Boutique d’exemple · fictive',
        q: 'La tour Pompon, c’est correct pour mon bébé de 18 mois?',
        a: ['Oui. La tour **Pompon** est faite pour les **12 mois et plus**.', 'Aucune petite pièce, et la peinture est **non toxique, à base d’eau**.', 'Quand elle sera prête pour plus, la **Grand Pompon** est pour les 3 ans et plus.'],
        card: ['Tour Pompon', [['Âge', '12 mois et +'], ['Petites pièces', 'Aucune'], ['Peinture', 'Non toxique']]] } },
    chat: { orb: '#7A2340', bub: '#7A2340', ink: '#FFFFFF', acc: '#7A2340',
      en: { tab: 'Cats', who: 'Luz · Cat supply store', tag: 'Example store', cap: 'Example store · fictional',
        q: 'My cat is 12 and picky. How do I switch her to the Senior formula?',
        a: ['Slowly, and she’ll thank you. Mix **25% new** with 75% old for 3 days.', 'Then **50/50**, then **75/25**. Full switch in about **10 days**.', 'Still not eating after 2 days? Write us, we’ll help.'],
        card: ['Senior formula', [['Days 1 to 3', '25% new'], ['Then', '50/50, 75/25'], ['Full switch', 'About 10 days']]] },
      fr: { tab: 'Chats', who: 'Luz · Boutique pour chats', tag: 'Boutique d’exemple', cap: 'Boutique d’exemple · fictive',
        q: 'Ma chatte a 12 ans et elle est difficile. Comment la passer à la formule Senior?',
        a: ['Doucement, elle vous remerciera. Mélangez **25 % de nouvelle** à 75 % d’ancienne pendant 3 jours.', 'Puis **50/50**, puis **75/25**. Transition complète en **10 jours** environ.', 'Elle ne mange toujours pas après 2 jours? Écrivez-nous, on vous aide.'],
        card: ['Formule Senior', [['Jours 1 à 3', '25 % nouvelle'], ['Ensuite', '50/50, 75/25'], ['Transition', '10 jours environ']]] } },
    dog: { orb: '#B5651D', bub: '#8A4B16', ink: '#FFFFFF', acc: '#8A4B16',
      en: { tab: 'Dogs', who: 'Luz · Dog supply store', tag: 'Example store', cap: 'Example store · fictional',
        q: 'My beagle is 32 lb. Which harness should I take, the M or the L?',
        a: ['For a **32 lb beagle**, take the **M**. It fits chests from **20 to 28 in**.', 'Measure right behind the front legs to be sure. Two fingers should slide under the strap.', 'Wrong size? **Free exchange** within 30 days.'],
        card: ['Walk harness', [['Size', 'M'], ['Chest', '20 to 28 in'], ['Exchange', '30 days, free']]] },
      fr: { tab: 'Chiens', who: 'Luz · Boutique pour chiens', tag: 'Boutique d’exemple', cap: 'Boutique d’exemple · fictive',
        q: 'Mon beagle pèse 32 lb. Je prends le harnais M ou L?',
        a: ['Pour un **beagle de 32 lb**, prenez le **M**. Il convient aux poitrines de **20 à 28 po**.', 'Mesurez juste derrière les pattes avant pour être sûr. Deux doigts doivent passer sous la sangle.', 'Mauvaise taille? **Échange gratuit** pendant 30 jours.'],
        card: ['Harnais de marche', [['Taille', 'M'], ['Poitrine', '20 à 28 po'], ['Échange', '30 jours, gratuit']]] } },
    intim: { orb: '#B4467A', bub: '#B4467A', ink: '#FFFFFF', acc: '#9C3566',
      en: { tab: 'Intimate wellness', who: 'Luz · Wellness store', tag: 'Example store', cap: 'Example store · fictional',
        q: 'Is shipping discreet? And what is the Lune made of?',
        a: ['Always. A plain box, no logo, and the label just says **LM Distribution**.', 'The **Lune** is **body-safe medical silicone**, phthalate-free.', 'Clean it with warm water and a mild soap. That’s it.'],
        card: ['Lune', [['Material', 'Medical silicone'], ['Phthalates', 'None'], ['Shipping', 'Plain box']]] },
      fr: { tab: 'Bien-être intime', who: 'Luz · Boutique bien-être', tag: 'Boutique d’exemple', cap: 'Boutique d’exemple · fictive',
        q: 'La livraison est-elle discrète? Et le Lune est fait de quoi?',
        a: ['Toujours. Une boîte neutre, sans logo, et l’étiquette dit seulement **LM Distribution**.', 'Le **Lune** est en **silicone médical**, sans phtalates.', 'Nettoyez-le à l’eau tiède avec un savon doux. C’est tout.'],
        card: ['Lune', [['Matériau', 'Silicone médical'], ['Phtalates', 'Aucun'], ['Livraison', 'Boîte neutre']]] } },
    mode: { orb: '#F25C9A', bub: '#C8306F', ink: '#FFFFFF', acc: '#C8306F',
      en: { tab: 'Clothing', who: 'Luz · Clothing store', tag: 'Example store', cap: 'Example store · fictional',
        q: 'Would the Romy blazer work for a wedding this fall?',
        a: ['Absolutely. In **burgundy wool**, the **Romy** steals the show at a fall wedding.', 'Pair it with the wide-leg **Lou** pants for the full look.', 'Ships in **2 days** anywhere in Quebec.'],
        card: ['Romy blazer', [['Fabric', 'Burgundy wool'], ['Goes with', 'Lou pants'], ['Shipping', '2 days']]] },
      fr: { tab: 'Mode', who: 'Luz · Boutique de mode', tag: 'Boutique d’exemple', cap: 'Boutique d’exemple · fictive',
        q: 'Le blazer Romy, ça passe pour un mariage cet automne?',
        a: ['Absolument. En **laine bordeaux**, le **Romy** vole la vedette à un mariage d’automne.', 'Agencez-le avec le pantalon large **Lou** pour le look complet.', 'Livré en **2 jours** partout au Québec.'],
        card: ['Blazer Romy', [['Tissu', 'Laine bordeaux'], ['Avec', 'Pantalon Lou'], ['Livraison', '2 jours']]] } }
  };
  ['mw', 'nordik'].forEach(function (k) { S[k].fr.q = S[k].en.q; S[k].fr.a = S[k].en.a; });   // real chats stay as they were written
  var ORDER = ['mw', 'nordik', 'ling', 'kids', 'chat', 'dog', 'intim', 'mode'];
  var TX = {
    en: { label: 'One Luz, any store', h: 'She becomes your store.', sub: 'Real clients and example stores. The same Luz, in their colours and their voice.', aria: 'Luz in every store', typing: 'Luz is typing' },
    fr: { label: 'Une Luz, toutes les boutiques', h: 'Elle devient votre boutique.', sub: 'De vrais clients et des boutiques d’exemple. La même Luz, à leurs couleurs et à leur voix.', aria: 'Luz dans chaque boutique', typing: 'Luz écrit' }
  };

  /* ---------- which ad did they come from ---------- */
  function fromAd() {
    var K = { ling: /lingerie|\bling\b|bra\b|soutien/, kids: /kids|toys?|jouets?|enfants?|bebe|baby/, chat: /(^|[^a-z])(cats?|chats?)([^a-z]|$)|feline|chaton/, dog: /dogs?|chiens?|canin/,
      intim: /intim|wellness|bien[-_ ]?etre/, mode: /mode|clothing|fashion|vetements?|apparel/, mw: /\bmw\b|gym|weights|fitness/, nordik: /nordik|sauna|plunge|recovery/ };
    var key = null;
    try {
      var p = new URLSearchParams(location.search), vals = [p.get('angle'), p.get('niche'), p.get('utm_content'), p.get('utm_campaign'), p.get('utm_term')];
      for (var i = 0; i < vals.length && !key; i++) { var v = (vals[i] || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); if (!v) continue; if (S[v]) { key = v; break; }
        for (var k in K) if (K[k].test(v)) { key = k; break; } }
      if (key) sessionStorage.setItem('aaShowFirst', key); else key = sessionStorage.getItem('aaShowFirst');
    } catch (e) {}
    return S[key] ? key : null;
  }
  var first = fromAd(), order = first ? [first].concat(ORDER.filter(function (k) { return k !== first; })) : ORDER.slice();

  /* ---------- colour for the orb ---------- */
  function hex(h) { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
  var KS = [[0, 0.94], [0.15, 0.82], [0.3, 0.55], [0.42, 0.15], [0.5, 0], [0.58, -0.3], [0.68, -0.6], [0.8, -0.8], [1, -0.88]];
  function kAt(s) { for (var i = 1; i < KS.length; i++) if (s <= KS[i][0]) { var a = KS[i - 1], b = KS[i], f = (s - a[0]) / (b[0] - a[0]); return a[1] + (b[1] - a[1]) * f; } return -0.88; }
  function ramp(spec) {   // 64 samples, light end to dark end, like the line-up's brand orbs; two colours blend across the middle
    var A = hex(Array.isArray(spec) ? spec[0] : spec), B = hex(Array.isArray(spec) ? spec[1] : spec), out = [];
    for (var i = 0; i < 64; i++) { var s = i / 63, m = Math.min(1, Math.max(0, (s - 0.3) / 0.4)), mm = m * m * (3 - 2 * m), k = kAt(s) * (Array.isArray(spec) ? 0.8 : 1);
      var c = [0, 1, 2].map(function (j) { var v = A[j] + (B[j] - A[j]) * mm; return k >= 0 ? v + (255 - v) * k : v * (1 + k); }); out.push(c); }
    return out;
  }

  /* ---------- markup ---------- */
  var CSS = '#luzShow{padding:clamp(72px,10vh,120px) clamp(20px,4vw,64px) clamp(56px,8vh,96px);box-sizing:border-box}' +
    '#luzShow .ls-in{max-width:1240px;margin:0 auto}' +
    '#luzShow .ls-head{text-align:center;display:flex;flex-direction:column;align-items:center;gap:14px}' +
    '#luzShow .ls-label{font-size:15px;color:#6E6E73;letter-spacing:-0.005em}' +
    '#luzShow h2{margin:0;font-weight:600;letter-spacing:-0.025em;line-height:1.05;font-size:clamp(36px,4.4vw,64px);color:#1D1D1F}' +
    '#luzShow .ls-sub{margin:4px 0 0;max-width:620px;font-size:clamp(17px,1.35vw,20px);line-height:1.5;color:#3A3A3C}' +
    '#luzShow .ls-stage{margin-top:clamp(36px,5vh,56px);display:grid;grid-template-columns:minmax(0,0.9fr) minmax(0,1.1fr);gap:clamp(20px,3vw,48px);align-items:center;min-height:clamp(440px,52vh,560px)}' +
    '#luzShow .ls-orb{position:relative;height:clamp(380px,48vh,540px)}#luzShow .ls-orb canvas{position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:pan-y;cursor:grab}' +
    '#luzShow .ls-right>*{transition:opacity .3s ease}#luzShow .ls-right.ls-out>*{opacity:0!important}#luzShow .ls-right{position:relative;display:flex;flex-direction:column;gap:14px;align-items:flex-start;min-height:clamp(420px,50vh,540px);justify-content:center}' +
    '#luzShow .ls-card{position:relative;width:min(100%,460px);background:#FFFFFF;border-radius:24px;box-shadow:0 1px 2px rgba(0,0,0,.04),0 12px 40px rgba(0,0,0,.06);overflow:hidden}' +
    '#luzShow .ls-top{display:flex;align-items:center;gap:8px;padding:14px 18px;border-bottom:1px solid rgba(29,29,31,.08);font-size:13px;color:#1D1D1F}' +
    '#luzShow .ls-dot{width:9px;height:9px;border-radius:50%;flex:none;transition:background-color .6s ease}' +
    '#luzShow .ls-who{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '#luzShow .ls-tag{margin-left:auto;flex:none;font-size:11px;color:#515154;border:1px solid rgba(29,29,31,.14);border-radius:999px;padding:3px 9px}' +
    '#luzShow .ls-body{padding:18px 16px 20px;display:flex;flex-direction:column;gap:8px;min-height:300px}' +
    '#luzShow .ls-b{max-width:86%;padding:10px 14px;border-radius:20px;font-size:15px;line-height:1.42;letter-spacing:-0.005em;opacity:0;transform:translateY(8px) scale(.98);transform-origin:left bottom;transition:opacity .35s ease,transform .45s cubic-bezier(.16,1,.3,1)}' +
    '#luzShow .ls-b.q{align-self:flex-end;transform-origin:right bottom;border-bottom-right-radius:6px}#luzShow .ls-b.a{align-self:flex-start;background:#F2F2F7;color:#1D1D1F;border-bottom-left-radius:6px}' +
    '#luzShow .ls-b.on{opacity:1;transform:none}#luzShow .ls-b b{font-weight:600}' +
    '#luzShow .ls-typing{align-self:flex-start;display:flex;gap:4px;padding:12px 14px;background:#F2F2F7;border-radius:20px;border-bottom-left-radius:6px;opacity:0;transition:opacity .25s ease}#luzShow .ls-typing.on{opacity:1}' +
    '#luzShow .ls-typing i{width:6px;height:6px;border-radius:50%;background:#8E8E93;animation:lsT 1s infinite ease-in-out}#luzShow .ls-typing i:nth-child(2){animation-delay:.15s}#luzShow .ls-typing i:nth-child(3){animation-delay:.3s}' +
    '@keyframes lsT{0%,60%,100%{opacity:.35;transform:none}30%{opacity:1;transform:translateY(-3px)}}' +
    '#luzShow .ls-fact{width:min(100%,300px);margin-left:clamp(0px,6vw,120px);background:#FFFFFF;border-radius:18px;box-shadow:0 1px 2px rgba(0,0,0,.04),0 10px 30px rgba(0,0,0,.06);padding:14px 16px;font-size:13px;color:#1D1D1F;opacity:0;transform:translateY(10px);transition:opacity .45s ease,transform .6s cubic-bezier(.16,1,.3,1)}' +
    '#luzShow .ls-fact.on{opacity:1;transform:none}#luzShow .ls-fact p{margin:0 0 8px;font-weight:600;font-size:14px}#luzShow .ls-fact div{display:flex;justify-content:space-between;gap:12px;padding:5px 0;border-top:1px solid rgba(29,29,31,.08)}#luzShow .ls-fact span:first-child{color:#6E6E73}#luzShow .ls-fact span:last-child{font-weight:600;text-align:right}' +
    '#luzShow .ls-cap{font-size:12px;color:#6E6E73;padding-left:4px;min-height:1.4em}' +
    '#luzShow .ls-tabs{margin:clamp(28px,4vh,44px) auto 0;display:flex;gap:8px;justify-content:center;flex-wrap:wrap;max-width:1240px}' +
    '#luzShow .ls-tab{position:relative;overflow:hidden;min-height:40px;padding:0 16px;border-radius:999px;border:1px solid rgba(29,29,31,.14);background:#FFFFFF;color:#1D1D1F;font:inherit;font-size:14px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:border-color .3s ease}' +
    '#luzShow .ls-tab i{width:8px;height:8px;border-radius:50%;flex:none}#luzShow .ls-tab span{position:relative}' +
    '#luzShow .ls-tab b{position:absolute;left:0;top:0;bottom:0;width:0;opacity:.13;pointer-events:none}#luzShow .ls-tab.on{border-color:rgba(29,29,31,.4)}' +
    '#luzShow .ls-tab:focus-visible{outline:2px solid #1D1D1F;outline-offset:2px}' +
    '@media (max-width:860px){#luzShow .ls-stage{grid-template-columns:1fr;min-height:0;gap:8px}#luzShow .ls-orb{height:clamp(160px,22vh,210px)}#luzShow .ls-stage{margin-top:20px}#luzShow .ls-right{min-height:0;align-items:center}#luzShow .ls-fact{margin-left:0}#luzShow .ls-cap{align-self:center}' +
    '#luzShow .ls-tabs{flex-wrap:nowrap;overflow-x:auto;justify-content:flex-start;padding:0 2px 6px;scrollbar-width:none;-webkit-overflow-scrolling:touch}#luzShow .ls-tabs::-webkit-scrollbar{display:none}#luzShow .ls-tab{flex:none}}' +
    '@media (max-width:600px){#luzShow .ls-body{min-height:260px}#luzShow .ls-b{font-size:14px}}';

  var sec, el = {}, orb = null, tex = null, texCv = null, cur = [], from = null, to = null, mix = 1, mixT0 = 0;
  var idx = 0, started = false, inView = false, paused = false, roundT0 = 0, roundDur = 10000, steps = [], raf = 0, timers = [], pausedAt = 0;

  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function rich(s, acc) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<b style="color:' + acc + '">$1</b>'); }
  function lang() { return isFR() ? 'fr' : 'en'; }

  function build() {
    sec = document.getElementById('luzShow'); if (!sec || sec.__built) return !!sec; sec.__built = 1;
    var st = document.createElement('style'); st.id = 'luzShowCss'; st.textContent = CSS; document.head.appendChild(st);
    sec.innerHTML = '<div class="ls-in"><div class="ls-head"><span class="ls-label"></span><h2></h2><p class="ls-sub"></p></div>' +
      '<div class="ls-stage"><div class="ls-orb"><canvas aria-hidden="true"></canvas></div><div class="ls-right" aria-live="polite">' +
      '<div class="ls-card"><div class="ls-top"><span class="ls-dot"></span><span class="ls-who"></span><span class="ls-tag"></span></div><div class="ls-body"></div></div>' +
      '<div class="ls-fact"></div><div class="ls-cap"></div></div></div><div class="ls-tabs" role="tablist"></div></div>';
    ['ls-label', 'ls-sub', 'ls-orb', 'ls-dot', 'ls-who', 'ls-tag', 'ls-body', 'ls-fact', 'ls-cap', 'ls-tabs'].forEach(function (c) { el[c] = sec.querySelector('.' + c); });
    el.h2 = sec.querySelector('h2'); el.cv = sec.querySelector('canvas'); el.tabs = el['ls-tabs'];
    el.tabs.addEventListener('click', function (e) { var b = e.target.closest('.ls-tab'); if (!b) return; go(+b.getAttribute('data-i'), true); });
    texts(); return true;
  }
  function texts() {
    var L = lang(), T = TX[L]; sec.setAttribute('aria-label', T.aria);
    el['ls-label'].textContent = T.label; el.h2.textContent = T.h; el['ls-sub'].textContent = T.sub;
    el.tabs.innerHTML = order.map(function (k, i) { var s = S[k], c = Array.isArray(s.orb) ? 'linear-gradient(135deg,' + s.orb[0] + ',' + s.orb[1] + ')' : s.orb;
      return '<button type="button" role="tab" class="ls-tab' + (i === idx ? ' on' : '') + '" data-i="' + i + '" aria-selected="' + (i === idx) + '"><b style="background:' + s.acc + '"></b><i style="background:' + c + '"></i><span>' + esc(s[L].tab) + '</span></button>'; }).join('');
  }

  /* ---------- orb ---------- */
  function orbUp() {
    if (orb || !window.ArtelLineup || !window.ArtelLineup.solo || !window.THREE) return !!orb;
    orb = window.ArtelLineup.solo(el.cv, {}); if (!orb || !orb.U) { orb = null; return false; }
    texCv = document.createElement('canvas'); texCv.width = 64; texCv.height = 1;
    tex = new window.THREE.CanvasTexture(texCv); tex.minFilter = tex.magFilter = window.THREE.LinearFilter; orb.U.uGradient.value = tex;
    cur = ramp(S[order[idx]].orb); paint(cur); return true;
  }
  function needOrb() {
    if (orbUp()) return;
    if (!window.ArtelLineup && !document.getElementById('luScript')) { var s = document.createElement('script'); s.id = 'luScript'; s.src = SRC ? SRC.replace(/luz-show\.js[^]*$/, 'orb-lineup.js') : 'js/orb-lineup.js'; document.head.appendChild(s); }
    setTimeout(needOrb, 250);
  }
  function paint(c) { if (!texCv) return; var g = texCv.getContext('2d'), im = g.createImageData(64, 1); for (var i = 0; i < 64; i++) { im.data[i * 4] = c[i][0]; im.data[i * 4 + 1] = c[i][1]; im.data[i * 4 + 2] = c[i][2]; im.data[i * 4 + 3] = 255; } g.putImageData(im, 0, 0); tex.needsUpdate = true; }
  function recolour(spec, instant) {
    var target = ramp(spec); if (!orb) { cur = target; return; }
    if (instant || reduce) { cur = target; paint(cur); return; }
    from = cur.map(function (c) { return c.slice(); }); to = target; mix = 0; mixT0 = performance.now(); orb.kick(3);
    (function step(now) { var f = Math.min(1, (now - mixT0) / 900), e = f < .5 ? 4 * f * f * f : 1 - Math.pow(-2 * f + 2, 3) / 2;
      cur = from.map(function (c, i) { return [0, 1, 2].map(function (j) { return c[j] + (to[i][j] - c[j]) * e; }); }); paint(cur); if (f < 1) requestAnimationFrame(step); })(mixT0);
  }

  /* ---------- a round ---------- */
  function clear() { timers.forEach(clearTimeout); timers = []; }
  function at(ms, fn) { steps.push({ t: ms, fn: fn }); }
  function words(s) { return s.replace(/\*\*/g, '').split(/\s+/).length; }
  function render(k, instant) {
    var s = S[k], D = s[lang()];
    el['ls-dot'].style.backgroundColor = Array.isArray(s.orb) ? s.orb[1] : s.orb; el['ls-who'].textContent = D.who; el['ls-tag'].textContent = D.tag; el['ls-cap'].textContent = D.cap;
    var html = '<div class="ls-b q" style="background:' + s.bub + ';color:' + s.ink + '">' + esc(D.q) + '</div><div class="ls-typing" aria-label="' + TX[lang()].typing + '"><i></i><i></i><i></i></div>';
    D.a.forEach(function (a) { html += '<div class="ls-b a">' + rich(a, s.acc) + '</div>'; });
    el['ls-body'].innerHTML = html;
    el['ls-fact'].innerHTML = '<p>' + esc(D.card[0]) + '</p>' + D.card[1].map(function (r) { return '<div><span>' + esc(r[0]) + '</span><span>' + esc(r[1]) + '</span></div>'; }).join('');
    el['ls-fact'].classList.remove('on');
    var q = el['ls-body'].querySelector('.q'), ty = el['ls-body'].querySelector('.ls-typing'), as = [].slice.call(el['ls-body'].querySelectorAll('.a'));
    if (instant) { q.classList.add('on'); ty.style.display = 'none'; as.forEach(function (x) { x.classList.add('on'); }); el['ls-fact'].classList.add('on'); return 0; }
    steps = []; var t = 500;
    at(t, function () { q.classList.add('on'); }); t += 700;
    at(t, function () { ty.classList.add('on'); }); t += 1100;
    at(t, function () { ty.style.display = 'none'; });
    as.forEach(function (x, i) { at(t, function () { x.classList.add('on'); }); if (i === 0) at(t + 600, function () { el['ls-fact'].classList.add('on'); }); t += 400 + words(D.a[i]) / 200 * 60000 * 0.55; });
    var read = (words(D.q) + D.a.reduce(function (n, a) { return n + words(a); }, 0)) / 200 * 60000;   // reading pace: 200 wpm, the slow end
    return Math.max(9000, Math.min(17000, Math.max(t, 2300 + read) + 1800));
  }
  function setTab() {
    [].slice.call(el.tabs.children).forEach(function (b, i) { var on = i === idx; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); b.querySelector('b').style.width = on ? '0%' : '0'; });
  }
  function go(i, user) {
    idx = (i + order.length) % order.length; clear(); setTab();
    var k = order[idx], R = sec.querySelector('.ls-right'), swap = started && !reduce && !!el['ls-body'].firstChild;
    recolour(S[k].orb, !started);
    var run = function () { roundDur = render(k, reduce); R.classList.remove('ls-out'); roundT0 = performance.now(); pausedAt = 0;
      if (!reduce) steps.forEach(function (s) { timers.push(setTimeout(s.fn, s.t)); }); loop(); };
    roundDur = 1e9; roundT0 = performance.now();
    if (swap) { R.classList.add('ls-out'); timers.push(setTimeout(run, 320)); } else run();
    if (user) { var b = el.tabs.children[idx]; if (b && b.scrollIntoView && innerWidth < 861) try { b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' }); } catch (e) {} }
  }
  function loop() {
    cancelAnimationFrame(raf);
    (function tick(now) { if (paused) return; var f = Math.min(1, (now - roundT0) / roundDur), b = el.tabs.children[idx] && el.tabs.children[idx].querySelector('b'); if (b) b.style.width = (f * 100).toFixed(2) + '%';
      if (f >= 1) { go(idx + 1); return; } raf = requestAnimationFrame(tick); })(performance.now());
  }
  function pause() { if (paused || !started) return; paused = true; pausedAt = performance.now(); cancelAnimationFrame(raf); clear();
    var done = pausedAt - roundT0; steps = steps.filter(function (s) { if (s.t <= done) { return false; } return true; }); steps.forEach(function (s) { s.t -= done; }); }
  function resume() { if (!paused) return; paused = false; if (roundDur === 1e9) { go(idx); return; } var off = performance.now() - pausedAt; roundT0 += off; steps.forEach(function (s) { timers.push(setTimeout(s.fn, s.t)); }); loop(); }

  function start() { if (started) { resume(); return; } started = true; go(0); }

  function boot() {
    if (!build()) return setTimeout(boot, 200);
    needOrb();
    render(order[0], false); setTab();   // the first store waits, chat empty, until the section is on screen; then it plays from the top
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) {
      inView = en.isIntersecting && en.intersectionRatio > 0.3;
      if (inView && !document.hidden) start(); else if (!en.isIntersecting || en.intersectionRatio < 0.1) pause(); }); }, { threshold: [0, 0.1, 0.3, 0.5] });
    io.observe(sec);
    document.addEventListener('visibilitychange', function () { if (document.hidden) pause(); else if (inView) start(); });
    var lastL = lang();
    new MutationObserver(function () { var L = lang(); if (L === lastL) return; lastL = L; texts(); setTab(); var k = order[idx]; clear(); render(k, true); if (started && !paused) { roundT0 = performance.now() - roundDur * 0.35; loop(); } })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', boot) : boot();
})();
