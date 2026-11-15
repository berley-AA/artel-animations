
(function(){
  function init(){
    var body=document.body, toggle=document.querySelector('.an-toggle'), panel=document.getElementById('an-panel');
    if(!toggle||!panel) return;
    var path=location.pathname, FR=/^\/fr-ca(\/|$)/.test(path);
    var isHome=/^\/(fr-ca\/?)?$/.test(path);
    var base=FR?(path.replace(/^\/fr-ca/,'')||'/'):path;
    var home=FR?'/fr-ca/':'/';
    /* logos go home, locale-aware */
    document.querySelectorAll('.an-logo,.an-wordmark').forEach(function(a){ a.setAttribute('href',home); });
    /* section links: same-page anchors on home, home+anchor elsewhere */
    panel.querySelectorAll('.an-item').forEach(function(a){
      var lbl=a.querySelector('.an-lbl'); if(lbl) lbl.textContent=FR?a.getAttribute('data-fr'):a.getAttribute('data-en');
      if(a.getAttribute('data-id')) a.setAttribute('href',(isHome?'':home)+'#'+a.getAttribute('data-id'));
      else if(a.getAttribute('data-page')) a.setAttribute('href',(FR?'/fr-ca':'')+a.getAttribute('data-page'));
      else if(a.getAttribute('data-login')){
        var src=null, links=document.querySelectorAll('.navbar a');
        for(var i=0;i<links.length;i++){ if(/login|connexion/i.test((links[i].textContent||'').trim())){ src=links[i]; break; } }
        if(src&&src.getAttribute('href')) a.setAttribute('href',src.getAttribute('href'));
        if(src&&src.getAttribute('target')) a.setAttribute('target',src.getAttribute('target'));
      }
    });
    /* EN | FR inside the menu only */
    var en=panel.querySelector('.an-en'), fr=panel.querySelector('.an-fr');
    if(en){ en.setAttribute('href',base); en.classList.toggle('is-active',!FR); }
    if(fr){ fr.setAttribute('href','/fr-ca'+(base==='/'?'':base)); fr.classList.toggle('is-active',FR); }
    function setOpen(o){
      body.classList.toggle('an-open',o);
      toggle.setAttribute('aria-expanded',o?'true':'false');
      toggle.setAttribute('aria-label',o?'Close menu':'Open menu');
    }
    toggle.addEventListener('click',function(){ setOpen(!body.classList.contains('an-open')); });
    panel.querySelectorAll('a').forEach(function(a){ a.addEventListener('click',function(){ setOpen(false); }); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') setOpen(false); });
    window.addEventListener('resize',function(){ if(window.innerWidth>991) setOpen(false); },{passive:true});
  }
  if(document.readyState!=='loading') init(); else document.addEventListener('DOMContentLoaded',init);
})();
