
/* Navbar reactive ink v2 (2026-07-17) — same behaviour, cached measuring.
   OLD: measured every section per scroll tick + 150ms interval (top jank source).
   NEW: section tones + absolute positions cached; cache rebuilt on resize/aa:vh/
   every 3s; scroll path is rAF-throttled and only scans the cached array.
   Force photo-bg sections by id in OVERRIDE (e.g. OVERRIDE['hero']='light'). */
(function(){
  var OVERRIDE = { 'artel-mission':'dark' };   /* mission has a dark photo bg -> force white nav ink */
  var DARK_BELOW = 128;   /* luminance below this = dark bg -> white ink */
  function start(){
    var nav = document.querySelector('.navbar') || document.querySelector('.w-nav');
    if(!nav){ return setTimeout(start, 300); }
    function lumOf(el){
      var bg=getComputedStyle(el).backgroundColor, m=bg.match(/rgba?\(([^)]+)\)/);
      if(!m) return null;
      var p=m[1].split(',').map(Number), a=(p[3]===undefined?1:p[3]);
      if(a<0.5) return null;
      return 0.2126*p[0] + 0.7152*p[1] + 0.0722*p[2];
    }
    var cache=[], navB=70;
    function build(){
      cache=[];
      var r0=nav.getBoundingClientRect();
      if(r0.height>10 && r0.top>-r0.height) navB=r0.bottom+6;
      var sy=window.pageYOffset||0;
      var secs=document.querySelectorAll('section, .section, .w-section');
      for(var i=0;i<secs.length;i++){
        var s=secs[i];
        if(getComputedStyle(s).display==='none') continue;
        var r=s.getBoundingClientRect();
        if(r.height<40) continue;
        var tone;
        if(s.id && OVERRIDE[s.id]) tone=OVERRIDE[s.id];
        else{
          var el=s, g=0, L=null;
          while(el && g++<4){ L=lumOf(el); if(L!=null) break; el=el.parentElement; }
          if(L==null) L=229;
          tone = L < DARK_BELOW ? 'dark' : 'light';
        }
        cache.push({top:r.top+sy, bottom:r.bottom+sy, tone:tone});
      }
    }
    var last=null;
    function apply(t){
      if(t===last) return; last=t;
      nav.classList.toggle('aa-ink-dark',  t==='dark');
      nav.classList.toggle('aa-ink-light', t==='light');
      /* logos are <img> forced white by an old #Home id rule — inline filter is the
         only thing that outranks it, so set the logo colour straight on the elements */
      var f = (t==='dark') ? 'brightness(0) invert(1)' : 'brightness(0)';
      var ims = nav.querySelectorAll('img');
      for(var k=0;k<ims.length;k++){ ims[k].style.setProperty('filter', f, 'important'); }
    }
    function upd(){
      var y=(window.pageYOffset||0)+navB;
      var chosen=null;
      for(var i=0;i<cache.length;i++){
        var c=cache[i];
        if(c.top<=y && c.bottom>y) chosen=c;   /* last one spanning the nav = topmost visually */
      }
      apply(chosen?chosen.tone:'light');
    }
    var tick=false;
    function onScroll(){
      if(tick) return; tick=true;
      requestAnimationFrame(function(){ tick=false; upd(); });
    }
    function rebuild(){ build(); upd(); }
    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', rebuild, {passive:true});
    window.addEventListener('load', rebuild);
    try{ window.addEventListener('aa:vh', rebuild); }catch(e){}
    try{ var L=window.lenis||window.__lenis; if(L&&L.on) L.on('scroll', onScroll); }catch(e){}
    setInterval(rebuild, 3000);
    rebuild();
  }
  if(document.readyState!=='loading') start();
  else document.addEventListener('DOMContentLoaded', start);
})();
