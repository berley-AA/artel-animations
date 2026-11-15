
/* BILLBOARD MOBILE — one-sentence-per-line rebuild reusing the reveal engine's
   .rvLw/.rvL classes; locale-safe sentence split. */
(function(){
  function build(){
    if(window.innerWidth>=768) return;
    var h=document.querySelector('#clients .bb-headline'); if(!h) return;
    if(h.querySelector('.aa-bb-punch')) return;
    var src=(h.dataset&&h.dataset.rvOrig)||h.textContent||'';
    src=src.replace(/\s+/g,' ').trim(); if(!src) return;
    h.dataset.rvOrig=src;
    var parts=src.match(/[^.!?]+[.!?]+/g)||[src];
    parts=parts.map(function(s){return s.trim();}).filter(Boolean);
    if(parts.length<2) return;
    var last=parts.length-1;
    h.innerHTML=parts.map(function(s,i){
      var punch=(i===last);
      var d=(i*0.12).toFixed(2);
      var txt=s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      return '<span class="rvLw'+(punch?' aa-bb-punch':'')+'" style="display:block"><span class="rvL" style="transition:transform .95s cubic-bezier(.19,1,.22,1) '+d+'s, opacity .55s ease '+d+'s">'+txt+'</span></span>';
    }).join('');
    var bb=document.querySelector('#clients.section-9');
    function go(){ h.querySelectorAll('.rvL').forEach(function(l){ l.classList.add('go'); }); }
    if(!document.documentElement.classList.contains('rv-on')){ h.querySelectorAll('.rvL').forEach(function(l){ l.style.transition='none'; l.classList.add('go'); }); }
    else if(!bb||bb.classList.contains('rv-in')||!('IntersectionObserver'in window)){ go(); }
    else{
      var io=new IntersectionObserver(function(es){ es.forEach(function(en){ if(en.isIntersecting){ setTimeout(go,250); io.disconnect(); } }); },{threshold:0.18});
      io.observe(bb);
    }
  }
  function arm(){ var n=0,iv=setInterval(function(){ build(); if(++n>20) clearInterval(iv); },400); build(); }
  if(document.readyState!=='loading') arm(); else document.addEventListener('DOMContentLoaded',arm);
  window.addEventListener('resize',function(){ setTimeout(build,350); },{passive:true});
})();
