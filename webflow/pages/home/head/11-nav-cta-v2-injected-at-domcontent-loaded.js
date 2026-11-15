
/* NAV CTA v2 — injected at DOMContentLoaded BEFORE the reveal engine binds its
   navbar-link handlers (head scripts register first), so the engine's
   release-on-click and smooth anchor behavior cover this link too. The
   pre-set aa-roll class opts it out of the letter-roll rebuild.
   GATE: the pill only becomes visible once the scroll position has reached
   the work section (#aa-results) — before that (hero + billboard) it stays
   hidden even when the navbar itself shows. */
(function(){
  function place(a, nb){
    var host=nb.querySelector('.w-container')||nb;
    if(getComputedStyle(host).position==='static') host.style.position='relative';
    var links=nb.querySelectorAll('a'), lg=null;
    for(var i=0;i<links.length;i++){ if(/login/i.test((links[i].textContent||'').trim())){ lg=links[i]; break; } }
    var r=host.getBoundingClientRect();
    var right = lg ? Math.max(24, Math.round(r.right - lg.getBoundingClientRect().left) + 26) : 150;
    a.style.right = right + 'px';
    if(a.parentElement!==host) host.appendChild(a);
  }
  function gate(){
    var a=document.querySelector('.aa-nav-cta'); if(!a) return;
    var w=document.getElementById('aa-results');
    var sc=window.pageYOffset||0;
    if(!w){ a.classList.add('aa-on'); return; }
    var top=w.getBoundingClientRect().top + sc;
    a.classList.toggle('aa-on', sc >= top - 80);
  }
  function add(){
    if(window.innerWidth<992) return;
    var nb=document.querySelector('.navbar'); if(!nb) return;
    var mine=nb.querySelector('.aa-nav-cta');
    if(!mine){
      var links=nb.querySelectorAll('a[href*="ai-readiness"]');
      for(var i=0;i<links.length;i++){
        var cs=getComputedStyle(links[i]);
        if(cs.display!=='none' && cs.visibility!=='hidden') return; /* a visible CTA already exists */
      }
      mine=document.createElement('a');
      mine.className='aa-nav-cta aa-roll';
      mine.href='#ai-readiness';
      mine.textContent='Get my AIQ';
    }
    place(mine, nb);
    gate();
  }
  var tick=false;
  window.addEventListener('scroll',function(){
    if(tick) return; tick=true;
    requestAnimationFrame(function(){ tick=false; gate(); });
  },{passive:true});
  if(document.readyState!=='loading'){ add(); } else document.addEventListener('DOMContentLoaded',add);
  var n=0, iv=setInterval(function(){ add(); if(++n>8) clearInterval(iv); },800);
  window.addEventListener('resize',function(){ setTimeout(add,300); },{passive:true});
})();
