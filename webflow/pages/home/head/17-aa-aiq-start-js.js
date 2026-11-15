
(function(){
  if(!document.documentElement.hasAttribute('data-aav')) return;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function arm(){
    var start=document.getElementById('air-start'), intro=document.getElementById('air-intro'), sec=document.getElementById('ai-readiness'), quiz=document.getElementById('air-quiz');
    if(!start||!intro||!quiz||start.__aaArmed) return; start.__aaArmed=1;
    /* capture phase: runs before the embed's own handler swaps screens, same task, so no frame shows a gap */
    start.addEventListener('click',function(){
      var cb=document.getElementById('air-consent-cb'); if(cb&&!cb.checked) return;
      var meta=intro.querySelector('.air-meta'), w=sec.querySelector('.air-w');
      /* lock the current height before the embed swaps screens, then glide to the quiz height */
      var h0=w.offsetHeight; w.style.height=h0+'px'; w.classList.add('aa-glide');
      setTimeout(function(){
        var h1=Math.max(h0,quiz.offsetHeight); void w.offsetWidth;
        if(h1!==h0){ w.style.height=h1+'px'; }
        setTimeout(function(){ w.style.height=''; w.classList.remove('aa-glide'); }, reduce?0:2300);
      },0);
      quiz.classList.add('aa-first');
      intro.classList.add('aa-leaving'); sec.classList.add('aa-quiz');
      if(meta&&!reduce){
        var r=meta.getBoundingClientRect(), host=sec.getBoundingClientRect();
        var dx=(host.left+host.width/2)-(r.left+r.width/2);
        meta.animate([
          {transform:'translateX(0)',filter:'blur(0)'},
          {transform:'translateX('+(dx*.55)+'px)',filter:'blur(10px)',offset:.45},
          {transform:'translateX('+dx+'px)',filter:'blur(0)'}
        ],{duration:600,easing:'cubic-bezier(.22,1,.36,1)',fill:'forwards'});
      }
      /* the first-screen delay only applies once; harmless if this timer is throttled */
      setTimeout(function(){ quiz.classList.remove('aa-first'); },3500);
      w.__aaH0=h0;
    },true);

    /* BACK button on the first question: reverses the take and restores the intro */
    var back=document.createElement('button'); back.type='button'; back.id='aa-back'; back.textContent='← Back';
    quiz.insertBefore(back, quiz.firstChild);
    var pn=document.getElementById('air-pn');
    function step0(){ quiz.classList.toggle('aa-step0', /^\s*1\s*\//.test(pn?pn.textContent:'')); }
    if(pn){ new MutationObserver(step0).observe(pn,{childList:true,characterData:true,subtree:true}); }
    back.addEventListener('click',function(){
      if(sec.classList.contains('aa-return')) return;
      var meta=intro.querySelector('.air-meta'), w=sec.querySelector('.air-w');
      var h1=w.offsetHeight, h0=w.__aaH0||h1;
      w.style.height=h1+'px'; w.classList.add('aa-glide','aa-glide-back'); void w.offsetWidth;
      sec.classList.add('aa-return');
      if(h0!==h1) w.style.height=h0+'px';
      var T=reduce?0:2000;
      if(meta&&!reduce){
        setTimeout(function(){
          var a=meta.getAnimations()[0]; if(a){ a.reverse(); }
        },T-600);
      }
      setTimeout(function(){
        quiz.classList.remove('on','aa-first'); intro.classList.add('on'); intro.classList.remove('aa-leaving');
        sec.classList.remove('aa-quiz','aa-return');
        if(meta) meta.getAnimations().forEach(function(a){a.cancel()});
        w.style.height=''; w.classList.remove('aa-glide','aa-glide-back');
      },T+50);
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',arm); else arm();
  setTimeout(arm,1500); setTimeout(arm,4000);
})();
