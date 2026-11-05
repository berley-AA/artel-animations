/* Artel cookie consent (Quebec Law 25) for the Luz pages. Nov 5, 2026.
   Copy of "ARTEL CONSENT CORE v1" + "ARTEL CONSENT UI v1" from the Webflow Site Footer code. Keep the two in sync.
   Why a copy: the Luz loader swaps the whole page (document.open/write). The swap wipes the site footer's styles and
   event listeners, but its scripts may already have run. Result: a "Cookie settings" button with no styling, and a
   panel that opened unstyled at the very bottom of the page (or no panel at all, depending on timing).
   Here: the styles always load, the core only runs if the site's copy did not, and the panel is rebuilt in this page. */
(function(){
var s=document.createElement('style');s.id='aaConsentCss';s.textContent="#aa-cc{--cc-bg:#E5E5E5;--cc-ink:#1A1B1F;--cc-mute:#55565B;--cc-or:#FF7B00;position:fixed;left:16px;bottom:16px;z-index:2147483600;width:min(400px,calc(100vw - 32px));box-sizing:border-box;background:var(--cc-bg);color:var(--cc-ink);border-radius:18px;padding:20px 20px 18px;font-family:Helvetica,'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:1.45;box-shadow:0 10px 40px rgba(26,27,31,.18),0 0 0 1px rgba(26,27,31,.06);opacity:0;transform:translateY(12px);transition:opacity .35s cubic-bezier(.22,1,.36,1),transform .35s cubic-bezier(.22,1,.36,1);max-height:calc(100vh - 32px);overflow:auto;-webkit-font-smoothing:antialiased}\n#aa-cc.on{opacity:1;transform:none}\n#aa-cc[hidden],#aa-cc [hidden]{display:none!important}\n#aa-cc *{box-sizing:border-box;font-family:inherit}\n#aa-cc h2{margin:0 0 6px!important;font-size:16px!important;font-weight:700!important;letter-spacing:-.01em!important;text-transform:none!important;color:var(--cc-ink)!important;line-height:1.25!important;font-family:Helvetica,'Helvetica Neue',Arial,sans-serif!important}\n#aa-cc .cc-btn,#aa-cc .cc-link,#aa-cc p,#aa-cc b{text-transform:none!important;letter-spacing:normal}\n#aa-cc p{margin:0 0 14px;color:var(--cc-mute);font-size:13.5px}\n#aa-cc a{color:var(--cc-ink);text-decoration:underline;text-underline-offset:2px}\n#aa-cc .cc-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}\n#aa-cc .cc-btn{all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;justify-content:center;text-align:center;min-height:44px;padding:10px 14px;border-radius:999px;font-size:14px;font-weight:600;line-height:1.1;background:var(--cc-ink);color:#fff;transition:background .15s,color .15s,box-shadow .15s}\n#aa-cc .cc-btn:hover{background:#000}\n#aa-cc .cc-btn:focus-visible,#aa-cc .cc-link:focus-visible,#aa-cc input:focus-visible+.cc-sw{outline:2px solid var(--cc-or);outline-offset:2px}\n#aa-cc .cc-link{all:unset;cursor:pointer;display:block;margin:12px auto 0;font-size:13px;color:var(--cc-ink);text-decoration:underline;text-underline-offset:2px;text-align:center}\n#aa-cc .cc-save{grid-column:1/-1;background:var(--cc-or);color:var(--cc-ink)}\n#aa-cc .cc-save:hover{background:#ff8f26}\n#aa-cc .cc-cats{display:none;margin:0 0 14px;border-top:1px solid rgba(26,27,31,.12)}\n#aa-cc.cc-open .cc-cats{display:block}\n#aa-cc .cc-cat{display:flex;gap:12px;align-items:flex-start;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(26,27,31,.12)}\n#aa-cc .cc-cat b{display:block;font-size:14px;color:var(--cc-ink)}\n#aa-cc .cc-cat span.cc-d{display:block;font-size:12.5px;color:var(--cc-mute);margin-top:2px}\n#aa-cc label.cc-tg{position:relative;flex:0 0 auto;margin-top:2px;cursor:pointer}\n#aa-cc label.cc-tg input{position:absolute;opacity:0;width:1px;height:1px}\n#aa-cc .cc-sw{display:block;width:40px;height:24px;border-radius:999px;background:#bdbdbd;position:relative;transition:background .2s}\n#aa-cc .cc-sw:after{content:'';position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:transform .2s cubic-bezier(.22,1,.36,1)}\n#aa-cc input:checked+.cc-sw{background:var(--cc-ink)}\n#aa-cc input:checked+.cc-sw:after{transform:translateX(16px)}\n#aa-cc input:disabled+.cc-sw{opacity:.5;cursor:not-allowed}\n#aa-cc .cc-x{display:none}\n@media (max-width:600px){#aa-cc{left:8px;right:8px;bottom:8px;width:auto;padding:16px 16px 14px;border-radius:16px}#aa-cc.cc-top{top:76px;bottom:auto}#aa-cc p{font-size:13px;margin-bottom:12px}}\n@media (prefers-reduced-motion:reduce){#aa-cc,#aa-cc .cc-sw,#aa-cc .cc-sw:after{transition:none}}";document.head.appendChild(s);
})();
if (!window.ArtelConsent) {
(function(){
  var GA_ID = 'G-W6BLN594FM';
  var ARTEL_LI_PARTNER_ID = ''; // LinkedIn Insight Tag partner ID. Leave '' until known; tag never loads while empty.
  var KEY = 'artel_consent', VER = 1, MAX_AGE = 365 * 864e5;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') { window.gtag = function(){ window.dataLayer.push(arguments); }; }
  var g = window.gtag;
  /* Google Consent Mode v2: everything optional denied by default */
  g('consent', 'default', { ad_storage:'denied', analytics_storage:'denied', ad_user_data:'denied', ad_personalization:'denied', functionality_storage:'granted', security_storage:'granted' });
  g('set', 'ads_data_redaction', true);

  function ck(n){ var m = document.cookie.match('(?:^|; )' + n + '=([^;]*)'); return m ? decodeURIComponent(m[1]) : null; }
  function read(){
    var raw = null;
    try { raw = localStorage.getItem(KEY); } catch(e){}
    if (!raw) { try { raw = ck(KEY); } catch(e){} }
    if (!raw) return null;
    try {
      var c = JSON.parse(raw);
      if (!c || c.v !== VER || !c.ts || (Date.now() - c.ts) > MAX_AGE) return null;
      return { necessary:true, analytics:!!c.analytics, marketing:!!c.marketing, ts:c.ts, v:c.v };
    } catch(e){ return null; }
  }
  function write(c){
    var s = JSON.stringify(c);
    try { localStorage.setItem(KEY, s); } catch(e){}
    try { document.cookie = KEY + '=' + encodeURIComponent(s) + '; max-age=31536000; path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : ''); } catch(e){}
  }
  function clearGA(){
    try {
      var host = location.hostname.split('.'), doms = [''];
      for (var i = 0; i < host.length - 1; i++) doms.push('; domain=.' + host.slice(i).join('.'));
      document.cookie.split('; ').forEach(function(p){
        var n = p.split('=')[0];
        if (/^(_ga|_gid|_gat|_gcl)/.test(n)) doms.forEach(function(d){ document.cookie = n + '=; max-age=0; path=/' + d; });
      });
      for (var k = localStorage.length - 1; k >= 0; k--) { var key = localStorage.key(k); if (/^_gcl/.test(key)) localStorage.removeItem(key); }
    } catch(e){}
  }
  var gaOn = false, liOn = false;
  function loadGA(){
    if (gaOn) return; gaOn = true;
    /* drop events queued before consent so they are never sent retroactively */
    try { for (var i = window.dataLayer.length - 1; i >= 0; i--) { var e = window.dataLayer[i]; if (e && e[0] === 'event') window.dataLayer.splice(i, 1); } } catch(x){}
    window['ga-disable-' + GA_ID] = false;
    g('consent', 'update', { analytics_storage:'granted' });
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    g('js', new Date()); g('config', GA_ID);
  }
  function loadLI(){
    if (liOn || !ARTEL_LI_PARTNER_ID) return; liOn = true;
    window._linkedin_partner_id = ARTEL_LI_PARTNER_ID;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(ARTEL_LI_PARTNER_ID);
    if (!window.lintrk) { window.lintrk = function(a,b){ window.lintrk.q.push([a,b]); }; window.lintrk.q = []; }
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    document.head.appendChild(s);
  }
  function apply(c){ if (c && c.analytics) loadGA(); if (c && c.marketing) loadLI(); }
  var subs = [];
  var api = {
    version: VER, GA_ID: GA_ID, LI_PARTNER_ID: ARTEL_LI_PARTNER_ID,
    get: function(){ return read(); },
    has: function(cat){ if (cat === 'necessary') return true; var c = read(); return !!(c && c[cat]); },
    set: function(o){
      var prev = read();
      var c = { v:VER, ts:Date.now(), analytics:!!(o && o.analytics), marketing:!!(o && o.marketing) };
      write(c);
      var revoked = prev && ((prev.analytics && !c.analytics) || (prev.marketing && !c.marketing));
      if (!c.analytics) { window['ga-disable-' + GA_ID] = true; clearGA(); }
      var out = read() || { necessary:true, analytics:c.analytics, marketing:c.marketing, ts:c.ts, v:VER };
      subs.forEach(function(f){ try { f(out); } catch(e){} });
      try { window.dispatchEvent(new CustomEvent('artel:consent', { detail: out })); } catch(e){}
      if (revoked && (gaOn || liOn)) { setTimeout(function(){ location.reload(); }, 150); return out; }
      apply(c);
      return out;
    },
    onChange: function(f){ if (typeof f === 'function') subs.push(f); },
    open: function(){ if (api._ui) api._ui.open(); else api._pendingOpen = true; }
  };
  window.ArtelConsent = api;
  var cur = read();
  if (cur) apply(cur);
  if (!cur || !cur.analytics) clearGA();
})();
}

(function(){
  var C = window.ArtelConsent; if (!C) return;
  var FR = /^fr/i.test(document.documentElement.lang || '') || /^\/fr-ca(\/|$)/.test(location.pathname);
  var T = FR ? {
    title:'Vos témoins, votre choix', body:'On utilise des témoins (cookies) nécessaires au fonctionnement du site. Avec votre accord, on aimerait aussi mesurer l’audience (Google Analytics) et la performance de nos publicités (LinkedIn). Rien ne s’active sans votre consentement. Vous pouvez changer d’idée en tout temps.',
    privacy:'Politique de confidentialité', privUrl:'https://artelagency.com/fr-ca/politique-de-confidentialite',
    accept:'Accepter', refuse:'Refuser', settings:'Paramètres', save:'Enregistrer mes choix',
    nec:'Nécessaires', necD:'Toujours actifs. Langue, sécurité et mémoire de vos choix.',
    ana:'Analytique', anaD:'Google Analytics. Statistiques de visite anonymisées.',
    mkt:'Marketing', mktD:'LinkedIn. Mesure de nos campagnes publicitaires.',
    foot:'Paramètres des témoins', dlg:'Paramètres des témoins'
  } : {
    title:'Your cookies, your choice', body:'We use cookies the site needs to work. With your OK, we’d also like to measure traffic (Google Analytics) and how our ads perform (LinkedIn). Nothing optional runs until you say yes. You can change your mind any time.',
    privacy:'Privacy policy', privUrl:'https://artelagency.com/privacy-policy',
    accept:'Accept all', refuse:'Refuse all', settings:'Settings', save:'Save my choices',
    nec:'Necessary', necD:'Always on. Language, security and remembering your choice.',
    ana:'Analytics', anaD:'Google Analytics. Anonymous visit statistics.',
    mkt:'Marketing', mktD:'LinkedIn. Measures our ad campaigns.',
    foot:'Cookie settings', dlg:'Cookie settings'
  };
  var box, lastFocus, chatIO;
  function tg(id, on, dis){ return '<label class="cc-tg"><input type="checkbox" id="'+id+'"'+(on?' checked':'')+(dis?' disabled':'')+'><span class="cc-sw" aria-hidden="true"></span></label>'; }
  function build(){
    if (box) return box;
    [].forEach.call(document.querySelectorAll('#aa-cc'), function(x){ x.remove(); });
    box = document.createElement('div'); box.id = 'aa-cc'; box.hidden = true;
    box.setAttribute('data-luz','1');
    box.setAttribute('role','dialog'); box.setAttribute('aria-modal','false');
    box.setAttribute('aria-labelledby','aa-cc-t'); box.setAttribute('aria-describedby','aa-cc-b'); box.setAttribute('lang', FR ? 'fr-CA' : 'en-CA');
    box.innerHTML =
      '<h2 id="aa-cc-t">'+T.title+'</h2>'+
      '<p id="aa-cc-b">'+T.body+' <a href="'+T.privUrl+'" target="_blank" rel="noopener">'+T.privacy+'</a></p>'+
      '<div class="cc-cats" id="aa-cc-cats" role="group" aria-label="'+T.dlg+'">'+
        '<div class="cc-cat"><div><b id="aa-cc-l0">'+T.nec+'</b><span class="cc-d">'+T.necD+'</span></div>'+tg('aa-cc-nec',true,true)+'</div>'+
        '<div class="cc-cat"><div><b id="aa-cc-l1">'+T.ana+'</b><span class="cc-d">'+T.anaD+'</span></div>'+tg('aa-cc-ana',false,false)+'</div>'+
        '<div class="cc-cat"><div><b id="aa-cc-l2">'+T.mkt+'</b><span class="cc-d">'+T.mktD+'</span></div>'+tg('aa-cc-mkt',false,false)+'</div>'+
      '</div>'+
      '<div class="cc-row">'+
        '<button type="button" class="cc-btn" data-cc="refuse">'+T.refuse+'</button>'+
        '<button type="button" class="cc-btn" data-cc="accept">'+T.accept+'</button>'+
        '<button type="button" class="cc-btn cc-save" data-cc="save" hidden>'+T.save+'</button>'+
      '</div>'+
      '<button type="button" class="cc-link" data-cc="settings" aria-expanded="false" aria-controls="aa-cc-cats">'+T.settings+'</button>';
    document.body.appendChild(box);
    box.querySelector('#aa-cc-nec').setAttribute('aria-labelledby','aa-cc-l0');
    box.querySelector('#aa-cc-ana').setAttribute('aria-labelledby','aa-cc-l1');
    box.querySelector('#aa-cc-mkt').setAttribute('aria-labelledby','aa-cc-l2');
    box.addEventListener('click', function(e){
      var b = e.target.closest('[data-cc]'); if (!b) return;
      var a = b.getAttribute('data-cc');
      if (a === 'accept') { C.set({analytics:true, marketing:true}); close(); }
      else if (a === 'refuse') { C.set({analytics:false, marketing:false}); close(); }
      else if (a === 'save') { C.set({analytics:box.querySelector('#aa-cc-ana').checked, marketing:box.querySelector('#aa-cc-mkt').checked}); close(); }
      else if (a === 'settings') { settings(!box.classList.contains('cc-open')); }
    });
    box.addEventListener('keydown', function(e){ if (e.key === 'Escape' && C.get()) close(); });
    watchChat();
    return box;
  }
  function settings(on){
    box.classList.toggle('cc-open', on);
    box.querySelector('[data-cc="save"]').hidden = !on;
    box.querySelector('[data-cc="settings"]').setAttribute('aria-expanded', on ? 'true' : 'false');
    if (on && box && !box.hidden) box.querySelector('#aa-cc-ana').focus({preventScroll:true});
  }
  function open(withSettings, userInitiated){
    build();
    var c = C.get();
    box.querySelector('#aa-cc-ana').checked = !!(c && c.analytics);
    box.querySelector('#aa-cc-mkt').checked = !!(c && c.marketing);
    settings(!!withSettings);
    lastFocus = document.activeElement;
    box.hidden = false;
    requestAnimationFrame(function(){ box.classList.add('on'); });
    /* only move focus when the visitor opened it (footer link); on first load the card stays non-modal and no button gets a ring, so Refuse and Accept look identical */
    if (userInitiated) box.querySelector('#aa-cc-ana').focus({preventScroll:true});
  }
  function close(){
    if (!box) return;
    box.classList.remove('on');
    setTimeout(function(){ box.hidden = true; }, 300);
    if (lastFocus && lastFocus.focus && lastFocus !== document.body) { try { lastFocus.focus({preventScroll:true}); } catch(e){} }
  }
  /* Keep the card off the Luz chat: on phones, dock it to the top while the chat embed is on screen */
  function watchChat(){
    if (!('IntersectionObserver' in window)) return;
    var w = document.getElementById('aa-chat-wrap') || (document.querySelector('iframe[src*="artelagency.com/api/w/"]') || {}).parentElement;
    if (!w) return;
    chatIO = new IntersectionObserver(function(es){ es.forEach(function(en){ box.classList.toggle('cc-top', en.isIntersecting && innerWidth <= 600); }); }, {threshold:0.15});
    chatIO.observe(w);
  }
  function footLink(){
    if (document.querySelector('.aa-cc-foot, .aa-cc-foot-float')) return;
    var b = document.createElement('button'); b.type = 'button'; b.textContent = T.foot;
    b.setAttribute('aria-haspopup','dialog');
    b.addEventListener('click', function(e){ e.preventDefault(); open(true, true); });
    var legal = document.querySelector('.aaf-legal-l');
    if (legal) {
      b.className = 'aa-cc-foot aaf-txt-cc';
      var law = [].filter.call(legal.querySelectorAll('.aaf-txt'), function(s){ return /Law 25|Loi 25/.test(s.textContent); })[0];
      law ? legal.insertBefore(b, law) : legal.appendChild(b);
    } else {
      var f = document.querySelector('footer, .footer-light, .aaf');
      if (f) { b.className = 'aa-cc-foot'; b.style.cssText = 'all:unset;cursor:pointer;display:inline-block;margin:12px 16px;font:13px Helvetica,Arial,sans-serif;color:#55565B;text-decoration:underline'; f.appendChild(b); }
      else { b.className = 'aa-cc-foot-float'; document.body.appendChild(b); }
    }
  }
  /* Any link to #cookie-settings also reopens the panel */
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href$="#cookie-settings"],a[href$="#parametres-temoins"],[data-cookie-settings]');
    if (a) { e.preventDefault(); open(true, true); }
  });
  C._ui = { open: function(){ open(true, true); } };
  function init(){
    footLink();
    if (!C.get()) setTimeout(function(){ open(false); }, 600);
    else if (C._pendingOpen) open(true, true);
    /* footer may be re-rendered by other scripts; re-add the link if it disappears */
    setTimeout(footLink, 1500); setTimeout(footLink, 4000);
  }
  /* the original page's own copy can still fire its first-visit timer after the swap; keep one card only */
  try { new MutationObserver(function(){ [].forEach.call(document.querySelectorAll('#aa-cc:not([data-luz])'), function(x){ x.remove(); }); }).observe(document.body || document.documentElement, { childList: true }); } catch(e){}
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();

