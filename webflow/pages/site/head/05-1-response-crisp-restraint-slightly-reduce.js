
/* §1 RESPONSE — crisp restraint: slightly reduce smooth-scroll lag.
   Runs after the page's motion-polish tuner (load + delay) so this value wins. */
(function(){
  function tune(){ try{ var L=window.__lenis||window.lenis; if(L&&L.options){ L.options.lerp=0.11; } }catch(e){} }
  window.addEventListener('load', function(){ setTimeout(tune, 1500); });
})();
