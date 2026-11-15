
/* === MOTION POLISH runtime === */
(function(){
  if(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  (function tune(){
    var L=window.__lenis;
    if(!L){ setTimeout(tune,150); return; }
    try{ L.options.lerp=0.09; L.options.wheelMultiplier=1.0; }catch(e){}
  })();
  var eoQ=function(t){ return 1-Math.pow(1-t,4); };
  var eioQ=function(t){ return t<.5 ? 8*t*t*t*t : 1-Math.pow(-2*t+2,4)/2; };
  (function patch(){
    if(!window.Lenis||!window.Lenis.prototype){ setTimeout(patch,60); return; }
    if(window.Lenis.prototype.__aaTuned) return;
    var o=window.Lenis.prototype.scrollTo;
    window.Lenis.prototype.scrollTo=function(t,opts){
      if(opts && opts.lock && opts.force){
        if(opts.duration===0.55){ opts.duration=1.0;  opts.easing=eoQ;  }
        else if(opts.duration===0.9){ opts.duration=1.15; opts.easing=eioQ; }
      }
      return o.apply(this,arguments);
    };
    window.Lenis.prototype.__aaTuned=1;
  })();
  function arm(){
    if(!('IntersectionObserver' in window)) return;
    var picks=[];
    ['.fp-section > .fp-inner','#ai-readiness > .w-layout-blockcontainer','#cta-chatbot > .w-layout-blockcontainer',
     '#compliance > .w-layout-blockcontainer','.footer-light'].forEach(function(s){
      var el=document.querySelector(s); if(el) picks.push(el);
    });
    var abouts=document.querySelectorAll('section[id="about"]');
    if(abouts.length>1) picks.push(abouts[1]);
    if(!picks.length) return;
    var io=new IntersectionObserver(function(es){
      es.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('aa-in'); io.unobserve(en.target); }
      });
    },{threshold:0.12});
    picks.forEach(function(el){
      var r=el.getBoundingClientRect();
      if(r.top<innerHeight && r.bottom>0){ el.classList.add('aa-rev','aa-in'); return; }
      el.classList.add('aa-rev'); io.observe(el);
    });
  }
  if(document.readyState!=='loading'){ setTimeout(arm,600); }
  else document.addEventListener('DOMContentLoaded',function(){ setTimeout(arm,600); });
})();
