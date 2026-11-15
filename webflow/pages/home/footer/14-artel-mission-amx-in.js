 to roll back. ===== -->
<script id="aa-design-pass-js">
(function(){
  if(window.__aaDesignPass) return; window.__aaDesignPass=1;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vh=function(){return (window.__aaVH&&window.__aaVH())||window.innerHeight};

  /* A. Mission -> Strength hand-off.
     The mission text only ever fades IN (target 0->1). When #strength arrives it fades in
     over the still-visible mission text, so two paragraphs overlap. Drive the mission TEXT
     (not its photo) to 1 - strengthProgress so the photo stays as the strength backdrop. */
  var missionIn=null,strength=null,last=-1;
  function handoff(){
    if(window.innerWidth<992||reduce) return;
    missionIn=missionIn||document.querySelector('#artel-mission .amx-in');
    strength=strength||document.getElementById('strength');
    if(!missionIn||!strength) return;
    var top=strength.getBoundingClientRect().top;
    var p=(-top)/(0.75*vh()); p=Math.min(Math.max(p,0),1);
    var o=+(1-p).toFixed(3);
    if(o!==last){ last=o; missionIn.style.opacity=o; missionIn.style.pointerEvents=o<0.1?'none':''; }
  }

  /* B. Nav: flag when scrolled past the hero so the frosted bar can kick in (CSS in head). */
  var nav=null,scrolled=null;
  function navState(){
    nav=nav||document.querySelector('.navbar');
    if(!nav) return;
    var s=window.scrollY>vh()*0.9;
    if(s!==scrolled){ scrolled=s; nav.classList.toggle('aa-scrolled',s); }
  }

  /* D. Results list -> Mission hand-off (same shape: rows fade out as the mission fades in). */
  var resList=null,mission=null,lastR=-1;
  function resultsHandoff(){
    if(window.innerWidth<992||reduce) return;
    mission=mission||document.getElementById('artel-mission');
    if(!resList){ var r=document.querySelector('.res-row'); resList=r&&r.parentElement; }
    if(!mission||!resList) return;
    var top=mission.getBoundingClientRect().top;
    var p=(-top)/(0.75*vh()); p=Math.min(Math.max(p,0),1);
    var o=+(1-p).toFixed(3);
    if(o!==lastR){ lastR=o; resList.style.opacity=o; resList.style.pointerEvents=o<0.1?'none':''; }
  }

  function onScroll(){ handoff(); resultsHandoff(); navState(); }
  function hook(){
    if(window.__lenis&&window.__lenis.on){ window.__lenis.on('scroll',onScroll); }
    else { window.addEventListener('scroll',onScroll,{passive:true}); }
    onScroll();
  }
  var tries=0,iv=setInterval(function(){ if(window.__lenis||++tries>40){ clearInterval(iv); hook(); } },150);
  window.addEventListener('resize',function(){ last=-1; lastR=-1; scrolled=null; onScroll(); },{passive:true});

  /* E. Hero CTA label: the letter-roll script sizes its spans itself (9.8px), so a stylesheet rule loses. */
  function ctaText(){ document.querySelectorAll('.git-btn .git-text').forEach(function(s){
    s.style.setProperty('font-size','12px','important'); s.style.setProperty('letter-spacing','.14em','important'); }); }
  setTimeout(ctaText,1500); setTimeout(ctaText,4000);

  /* C. Below-the-fold images lazy-load (Vercel WIG). Runs once, leaves the hero alone. */
  window.addEventListener('load',function(){
    var fold=vh()*1.5;
    document.querySelectorAll('img:not([loading])').forEach(function(img){
      if(img.getBoundingClientRect().top+window.scrollY>fold) img.setAttribute('loading','lazy');
    });
  });
})();
