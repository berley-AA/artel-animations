
(function(){
  var W='#F5F5F7';
  var IC={
    play:'<svg width="34" height="40" viewBox="0 0 34 40" fill="'+W+'"><path d="M2 2l30 18L2 38z"/></svg>',
    pause:'<svg width="30" height="40" viewBox="0 0 30 40" fill="'+W+'"><rect x="1" y="1" width="9" height="38"/><rect x="20" y="1" width="9" height="38"/></svg>',
    vol:'<svg width="20" height="16" viewBox="0 0 20 16" fill="none" stroke="'+W+'" stroke-width="1.5"><path d="M1 5.5h3.5L9 1.5v13l-4.5-4H1z" fill="'+W+'" stroke="none"/><path d="M12.5 5a4 4 0 0 1 0 6M15 2.5a7.5 7.5 0 0 1 0 11" stroke-linecap="square"/></svg>',
    mute:'<svg width="20" height="16" viewBox="0 0 20 16" fill="none" stroke="'+W+'" stroke-width="1.5"><path d="M1 5.5h3.5L9 1.5v13l-4.5-4H1z" fill="'+W+'" stroke="none"/><path d="M13 5.5l5 5M18 5.5l-5 5" stroke-linecap="square"/></svg>',
    fs:'<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="'+W+'" stroke-width="1.5" stroke-linecap="square"><path d="M1 5.5V1h4.5M10.5 1H15v4.5M15 10.5V15h-4.5M5.5 15H1v-4.5"/></svg>',
    fsx:'<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="'+W+'" stroke-width="1.5" stroke-linecap="square"><path d="M5.5 1v4.5H1M15 5.5h-4.5V1M10.5 15v-4.5H15M1 10.5h4.5V15"/></svg>'
  };
  var o=document.getElementById('aafp'), hit=o.querySelector('.hit'), big=o.querySelector('.big'), mu=o.querySelector('.mute'), fs=o.querySelector('.fs'), cur=o.querySelector('.cur'), rem=o.querySelector('.rem'), trk=o.querySelector('.trk'), fill=trk.querySelector('b');
  mu.innerHTML=IC.vol; fs.innerHTML=IC.fs;
  function V(){return document.getElementById('filmPlayer')}
  function L(){return document.getElementById('filmLayer')}
  function mm(t){t=Math.max(0,Math.floor(t||0));var m=Math.floor(t/60),s=t%60;return (m<10?'0':'')+m+':'+(s<10?'0':'')+s}
  var idleT=null;
  function wake(){o.classList.remove('idle');clearTimeout(idleT);var v=V();if(v&&!v.paused)idleT=setTimeout(function(){o.classList.add('idle')},2500)}
{{@loop.23}}  function place(){var l=L(),v=V();var vis=l&&getComputedStyle(l).display!=='none';o.classList.toggle('on',!!vis);o.setAttribute('aria-hidden',vis?'false':'true');if(!vis||!v)return;var r=v.getBoundingClientRect();o.style.left=r.left+'px';o.style.top=r.top+'px';o.style.width=r.width+'px';o.style.height=r.height+'px';o.style.opacity=getComputedStyle(l).opacity}
  (function loop(){place();paint();(window.__aaRAF||requestAnimationFrame)(loop)})();
  function toggle(){var v=V();if(!v)return;if(v.paused){var q=v.play();if(q&&q.catch)q.catch(function(){})}else v.pause();wake()}
  hit.addEventListener('click',toggle);
  o.addEventListener('mousemove',wake,{passive:true});o.addEventListener('touchstart',wake,{passive:true});
  mu.addEventListener('click',function(){var v=V();if(v)v.muted=!v.muted;wake()});
  fs.addEventListener('click',function(){var v=V(),d=document,e=d.documentElement;wake();
    if(d.fullscreenElement||d.webkitFullscreenElement){(d.exitFullscreen||d.webkitExitFullscreen).call(d);return}
    if(e.requestFullscreen){e.requestFullscreen().then(function(){try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock('landscape').catch(function(){})}catch(x){}}).catch(function(){})}
    else if(e.webkitRequestFullscreen){e.webkitRequestFullscreen()}
    else if(v&&v.webkitEnterFullscreen){v.webkitEnterFullscreen()}   /* iPhone: the phone's own player, it turns with the phone */
  });
  function seekAt(x){var v=V();if(!v||!v.duration)return;var r=trk.getBoundingClientRect();v.currentTime=Math.max(0,Math.min(1,(x-r.left)/r.width))*v.duration}
  trk.addEventListener('pointerdown',function(e){trk.classList.add('drag');trk.setPointerCapture(e.pointerId);seekAt(e.clientX);wake()});
  trk.addEventListener('pointermove',function(e){if(trk.classList.contains('drag'))seekAt(e.clientX)});
  trk.addEventListener('pointerup',function(){trk.classList.remove('drag')});trk.addEventListener('pointercancel',function(){trk.classList.remove('drag')});
  document.addEventListener('keydown',function(e){if(!o.classList.contains('on'))return;var v=V();if(!v)return;
    if(e.key===' '||e.key==='k'){e.preventDefault();toggle()}
    else if(e.key==='ArrowRight'){v.currentTime=Math.min(v.duration||0,v.currentTime+5);wake()}
    else if(e.key==='ArrowLeft'){v.currentTime=Math.max(0,v.currentTime-5);wake()}
    else if(e.key==='m'){v.muted=!v.muted;wake()}
    else if(e.key==='f'){fs.click()}});
  document.addEventListener('play',function(e){if(e.target&&e.target.id==='filmPlayer')wake()},true);
  document.addEventListener('pause',function(e){if(e.target&&e.target.id==='filmPlayer'){clearTimeout(idleT);o.classList.remove('idle')}},true);
})();
