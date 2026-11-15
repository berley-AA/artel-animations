
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
