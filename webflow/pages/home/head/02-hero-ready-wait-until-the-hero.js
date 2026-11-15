
/* HERO READY — wait until the hero photo has FULLY downloaded, then trigger
   the single entrance fade. Safety timeout so the page never stays hidden. */
(function(){
  function ready(){
    var h=document.documentElement;
    if(h.classList.contains('aa-bg-ready')) return;
    h.classList.add('aa-bg-ready');
    window.__aaReadyAt=(window.performance&&performance.now)?performance.now():Date.now();
  }
  function gate(){
    var bg=document.getElementById('hero-plaza-bg');
    if(!bg){ ready(); return; }
    var cs='';
    try{ cs=getComputedStyle(bg).backgroundImage||''; }catch(e){}
    var m=cs.match(/url\(("|')?([^"')]+)/);
    if(!m||!m[2]){ ready(); return; }
    var im=new Image();
    im.onload=ready; im.onerror=ready;
    im.src=m[2];
    if(im.complete) ready();
    setTimeout(ready,3500);
  }
  if(document.readyState!=='loading') gate();
  else document.addEventListener('DOMContentLoaded',gate);
})();
