
/* RESULTS LINK (A): "See the results" goes to the Results list. */
(function(){function at(e){var y=0;while(e){y+=e.offsetTop;e=e.offsetParent}return y}
window.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a');if(!a)return;var id=a.classList.contains('aa-fp')?'free-pilot':(a.closest('#clients')&&/result/i.test(a.textContent)?'aa-results':null);if(!id)return;var t=document.getElementById(id);if(!t)return;e.preventDefault();e.stopImmediatePropagation();var y=at(t);if(window.__aaSnapTo&&innerWidth>=992)window.__aaSnapTo(y);else if(window.__lenis)window.__lenis.scrollTo(y,{duration:1.1,force:true});else window.scrollTo({top:y,behavior:'smooth'})},true);})();
