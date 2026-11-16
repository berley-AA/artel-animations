/* Nov 10: test switches for the scroll feel, read from the page address. They change nothing unless asked for.
   ?reveal=0  section content is simply there (no fade, no 44px slide into place)
   ?smooth=0  the browser's own scrolling (the smoothing library, Lenis, stays off). Lenis is on by default again since v90
   ?pin=0     the four "How we work" steps scroll past as a plain list (nothing holds in place) */
(function(){try{var q=location.search,H=document.documentElement;if(/[?&]reveal=0/.test(q))H.classList.add('aa-noreveal');if(/[?&]pin=0/.test(q))H.classList.add('aa-nopin');if(/[?&]smooth=0/.test(q))window.__aaNoLenis=1;}catch(e){}})();