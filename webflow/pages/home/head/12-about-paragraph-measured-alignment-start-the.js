
/* ABOUT PARAGRAPH — measured alignment: start the "Artel was born…" text at
   exactly the navbar logo's left edge on desktop, at any viewport width.
   (The paragraph sits under layered margins/paddings, so it's aligned by
   measurement, not arithmetic; re-runs on resize.)
   NOTE: the chatbot iframe's frame cap now lives INSIDE the Luz chat embed
   itself (cta-chatbot section) — single source of truth. */
(function(){
  function align(){
    if(window.innerWidth<992) return;
    var logo=document.querySelector('.navbar .w-nav-brand')||document.querySelector('.navbar img');
    var para=document.querySelector('#about .aa-about-para')||document.querySelector('section[id="about"] .about-us.paragraph');
    if(!logo||!para) return;
    para.style.paddingLeft='';
    var cs=getComputedStyle(para);
    var pl=parseFloat(cs.paddingLeft)||0;
    var delta=logo.getBoundingClientRect().left-(para.getBoundingClientRect().left+pl);
    if(Math.abs(delta)>1) para.style.paddingLeft=(pl+delta)+'px';
  }
  if(document.readyState!=='loading'){ align(); } else document.addEventListener('DOMContentLoaded',align);
  window.addEventListener('load',function(){ setTimeout(align,250); });
  setTimeout(align,1500); setTimeout(align,3500);
  var t; window.addEventListener('resize',function(){ clearTimeout(t); t=setTimeout(align,250); },{passive:true});
})();
