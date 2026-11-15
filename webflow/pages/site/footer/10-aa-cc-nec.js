
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
    box = document.createElement('div'); box.id = 'aa-cc'; box.hidden = true;
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
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
