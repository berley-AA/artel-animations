
/* MISSION — tag the word "amplify" in the subline (turns orange via .aa-amp.on). */
(function(){
  function paint(){
    var g=document.querySelector('#artel-mission .amx-g'); if(!g) return;
    g.querySelectorAll('span').forEach(function(s){
      if(/amplif/i.test(s.textContent)){ s.classList.add('aa-amp'); }
    });
  }
  paint();
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',paint);
  var n=0, iv=setInterval(function(){ paint(); if(++n>24) clearInterval(iv); },250);
})();
