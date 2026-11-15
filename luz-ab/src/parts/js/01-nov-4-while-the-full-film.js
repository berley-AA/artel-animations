/* Nov 4: while the full film plays, the page's own animation loops (orb, glass, nav) wait, so the film gets the whole frame budget and never stutters. */
(function(){var R=window.requestAnimationFrame.bind(window),C=window.cancelAnimationFrame.bind(window),q=[];window.__aaRAF=R;
window.requestAnimationFrame=function(cb){if(window.__aaFilm){q.push(cb);return -q.length;}return R(cb);};
window.cancelAnimationFrame=function(id){if(id<0){if(q[-id-1])q[-id-1]=null;return;}C(id);};
window.__aaFilmSet=function(on){window.__aaFilm=!!on;if(!on){var l=q;q=[];l.forEach(function(cb){if(cb)R(cb);});}};})();