/* ArtelLoopEnd 2.2.0 (unchanged, homepage footer -> hero loop) + ArtelLoopHint 1.0 */
!function(){if(!matchMedia("(prefers-reduced-motion:reduce)").matches){var t=0,e=scrollY,n=1;addEventListener("scroll",u,{passive:!0});var o=r();o&&o.on&&o.on("scroll",u),addEventListener("wheel",(function(t){t.deltaY>0&&(n=1,c())}),{passive:!0});var i=setInterval((function(){var t=l();t&&(clearInterval(i),new MutationObserver(s).observe(t.b,{childList:!0}),s())}),500)}function r(){return"undefined"!=typeof lenis?lenis:null}function l(){return window.__aaLoop}function s(){var t=l();if(t){var e=t.b.firstElementChild;if(e){var n=t.b.getBoundingClientRect(),o=innerHeight,i=Math.min(1,Math.max(0,1-n.top/o)),r=i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2;e.style.setProperty("transform","scale("+(.84+.16*r).toFixed(4)+")","important"),e.style.transformOrigin="50% 0",e.style.borderRadius=(28*(1-r)).toFixed(1)+"px",e.style.overflow="hidden",e.style.filter="brightness("+(.8+.2*r).toFixed(3)+")"}}}function a(){if(1===t){t=2,l().jump();var n=r();n&&n.start(),setTimeout((function(){t=0,e=scrollY}),700)}}function c(){if(!t){var e=l();if(e){var o=e.b.getBoundingClientRect();n>0&&o.top<=.3*innerHeight&&o.top>-o.height/2&&function(){var e=l();if(e&&!t){t=1;var n=e.b.getBoundingClientRect(),o=scrollY+n.top,i=r();i&&i.scrollTo?(i.start(),i.scrollTo(o,{duration:.55,easing:function(t){return 1-Math.pow(1-t,3)},lock:!0,force:!0,onComplete:a})):(scrollTo({top:o,behavior:"smooth"}),setTimeout(a,600)),setTimeout((function(){1===t&&a()}),1200)}}()}}}function u(){s();var t=scrollY;t!==e&&(n=t<e?-1:1,e=t),c()}}();
/* ArtelLoopHint 1.0 — the bottom-of-page loop says what it's about to do.
   When the end card (Luz pages: #loop, homepage: #aa-loop) comes up, a line on it reads "Keep scrolling to start over",
   with a thin bar that fills as they keep scrolling. Full bar = the existing loop fires (its top reaches 30% of the screen).
   After the jump back, a short note says "You're back at the start" for 2 s. It never blocks anything. EN/FR by path. */
(function () {
  if (window.__aaLoopHint) return; window.__aaLoopHint = 1;
  var FR = /^\/fr-ca(\/|$)/.test(location.pathname);
  var T1 = FR ? 'Continuez à défiler pour revenir au début.' : 'Keep scrolling to start over.';
  var T2 = FR ? 'Vous êtes de retour au début.' : 'You’re back at the start.';
  var css = '.aalh{position:absolute;left:50%;top:clamp(16px,3vh,32px);transform:translateX(-50%);z-index:20;width:min(340px,calc(100vw - 32px));box-sizing:border-box;background:#FFFFFF;border:1px solid rgba(29,29,31,.14);padding:12px 16px 14px;font-family:"ABC Areal","Helvetica Neue",Helvetica,Arial,sans-serif;color:#1D1D1F;text-align:center;opacity:0;transition:opacity .35s ease;pointer-events:none}' +
    '.aalh.on{opacity:1}.aalh p{margin:0 0 10px;font-size:16px;line-height:1.35;font-weight:500;letter-spacing:-.005em}' +
    '.aalh i{display:block;height:3px;background:rgba(29,29,31,.12);position:relative;overflow:hidden}.aalh b{position:absolute;left:0;top:0;bottom:0;width:100%;background:#FF7B00;transform-origin:0 50%;transform:scaleX(0)}' +
    '.aalt{position:fixed;left:50%;top:clamp(76px,11vh,104px);transform:translate(-50%,-6px);z-index:2147483000;width:max-content;max-width:calc(100vw - 32px);box-sizing:border-box;background:#1D1D1F;color:#FFFFFF;padding:12px 18px;font-family:"ABC Areal","Helvetica Neue",Helvetica,Arial,sans-serif;font-size:16px;line-height:1.35;font-weight:500;opacity:0;transition:opacity .35s ease,transform .35s ease;pointer-events:none}' +
    '.aalt.on{opacity:1;transform:translate(-50%,0)}';
  var st = document.createElement('style'); st.textContent = css; (document.head || document.documentElement).appendChild(st);
  var sec = null, hint = null, bar = null, toast = null, armed = false, raf = 0, toastT = 0;
  function find() {
    var s = document.getElementById('loop') || document.getElementById('aa-loop') || (window.__aaLoop && window.__aaLoop.b); if (!s || s === sec) return;
    sec = s; if (getComputedStyle(s).position === 'static') s.style.position = 'relative';
    hint = document.createElement('div'); hint.className = 'aalh'; hint.setAttribute('role', 'status');
    hint.innerHTML = '<p></p><i aria-hidden="true"><b></b></i>'; hint.firstChild.textContent = T1; bar = hint.querySelector('b'); s.appendChild(hint);
  }
  function showToast() {
    if (!toast) { toast = document.createElement('div'); toast.className = 'aalt'; toast.setAttribute('role', 'status'); toast.textContent = T2; document.body.appendChild(toast); }
    clearTimeout(toastT); requestAnimationFrame(function () { toast.classList.add('on'); }); toastT = setTimeout(function () { toast.classList.remove('on'); }, 2000);
  }
  function tick() {
    raf = 0; find(); if (!sec) return;
    var vh = window.innerHeight || 800, top = sec.getBoundingClientRect().top;
    // 0 when the card's top enters at the bottom of the screen, 1 when it reaches 30% (where the loop fires)
    var p = Math.max(0, Math.min(1, (vh - top) / (0.7 * vh)));
    var y = window.scrollY || window.pageYOffset || 0;
    if (p > 0.02 && top > -vh * 0.5) { hint.classList.add('on'); bar.style.transform = 'scaleX(' + p.toFixed(3) + ')'; if (p > 0.9) armed = true; }
    else { hint.classList.remove('on'); }
    if (armed && y < Math.max(80, vh * 0.15) && top > vh) { armed = false; hint.classList.remove('on'); bar.style.transform = 'scaleX(0)'; showToast(); }
  }
  function req() { if (!raf) raf = requestAnimationFrame(tick); }
  addEventListener('scroll', req, { passive: true }); addEventListener('resize', req); addEventListener('wheel', req, { passive: true }); addEventListener('touchmove', req, { passive: true });
  var n = 0, iv = setInterval(function () { req(); if (++n > 40 && sec) clearInterval(iv); if (n > 120) clearInterval(iv); }, 250);
})();
