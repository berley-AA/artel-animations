
/* LUZ FIT (A/B test pages): on desktop the Luz frame renders at a minimum design height and is scaled to fit the screen, so the button is never cut. */
(function(){
  var H0=860;
  function fit(){
    var s=document.querySelector('#cta-chatbot.nx-moved'),f=document.getElementById('aa-chat-iframe');
    if(!s||!f) return;
    var e=f.parentElement;
    if(innerWidth<992){ if(f.__fit){f.__fit=0;['transform','transform-origin','width','max-width'].forEach(function(p){f.style.removeProperty(p)});e.style.removeProperty('height');} return; }
    var nav=document.querySelector('.navbar'),top=Math.round(nav?nav.getBoundingClientRect().height:68)+4;
    var avail=s.clientHeight-top, h=Math.max(avail,H0), k=+Math.min(1,avail/h).toFixed(4), wp=Math.round(e.clientWidth/k);
    if(f.style.height===h+'px'&&f.style.transform==='scale('+k+')'&&f.style.width===wp+'px'&&e.style.height===avail+'px') return;
    e.style.setProperty('height',avail+'px','important');
    f.style.setProperty('height',h+'px','important');
    f.style.setProperty('width',wp+'px','important');
    f.style.setProperty('max-width','none','important');
    f.style.setProperty('transform','scale('+k+')');
    f.style.setProperty('transform-origin','0 0');
    f.__fit=1;
  }
  function arm(){
    var f=document.getElementById('aa-chat-iframe'); if(!f){ setTimeout(arm,400); return; }
    new MutationObserver(function(){ requestAnimationFrame(fit); }).observe(f,{attributes:true,attributeFilter:['style']});
    fit(); setTimeout(fit,800); setTimeout(fit,2500);
  }
  addEventListener('resize',function(){ setTimeout(fit,120); },{passive:true});
  if(document.readyState!=='loading') arm(); else document.addEventListener('DOMContentLoaded',arm);
})();
