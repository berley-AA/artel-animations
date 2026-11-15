
/* === SNAP-MAP REFRESHER (July 21) — keeps the wheel-paging cluster map true
   after the mission module injects ~200vh of page post-init, and re-arms
   cluster re-entry on scroll-direction reversals. Verified headless: every
   snap lands on a true section top in both scroll directions. */
(function(){
  function kick(){ try{ window.dispatchEvent(new Event('resize')); }catch(e){} }
  window.addEventListener('load', function(){ setTimeout(kick,300); });
  setTimeout(kick,2000); setTimeout(kick,4500); setTimeout(kick,8000);
  if('MutationObserver' in window){
    var t=null, mo=new MutationObserver(function(){ clearTimeout(t); t=setTimeout(kick,300); });
    (function arm(){ if(document.body){ mo.observe(document.body,{childList:true}); } else setTimeout(arm,60); })();
  }
  var last=window.pageYOffset||0, dir=0, cool=0;
  window.addEventListener('scroll', function(){
    var sc=window.pageYOffset||0, d=sc-last; last=sc;
    if(!d) return;
    var nd=d>0?1:-1;
    if(dir && nd!==dir){ var now=Date.now(); if(now-cool>900){ cool=now; kick(); } }
    dir=nd;
  }, {passive:true});
})();
