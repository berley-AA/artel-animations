(function(){
  var reduce=false;try{reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){}
  function init(){
    var sec=document.querySelector('.aa-how');if(!sec)return setTimeout(init,300);
    var pin=sec.querySelector('.aa-how-pin'),fill=sec.querySelector('.aa-how-rail .fl'),dots=[].slice.call(sec.querySelectorAll('.aa-how-dot')),steps=[].slice.call(sec.querySelectorAll('.aa-how-step')),N=steps.length,cur=-1,tk=false;
    if(reduce){steps.forEach(function(s){s.classList.add('on');});dots.forEach(function(d){d.classList.add('done');});fill.style.width='75%';return;}
    function H(){return window.innerHeight||800;}
    function size(){pin.style.height=Math.round(H()*(N*0.85+0.6))+'px';}
    function set(i,p){fill.style.transform='scaleX('+Math.min(1,p*N/(N-0.15)).toFixed(4)+')';if(i===cur)return;cur=i;
      steps.forEach(function(s,k){s.classList.toggle('on',k===i);s.classList.toggle('out',k<i);s.setAttribute('aria-hidden',k===i?'false':'true');});
      dots.forEach(function(d,k){d.classList.toggle('done',k<=i);d.classList.toggle('now',k===i);});}
    function tick(){tk=false;var h=H(),top=pin.getBoundingClientRect().top,run=pin.offsetHeight-h,p=Math.min(1,Math.max(0,-top/Math.max(1,run)));set(Math.min(N-1,Math.floor(p*N)),p);}
    size();tick();
    window.addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(tick);}},{passive:true});
    window.addEventListener('resize',function(){size();tick();});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();