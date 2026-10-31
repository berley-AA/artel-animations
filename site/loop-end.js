/* ArtelLoopEnd 2.2.0 (unchanged, homepage footer -> hero loop) + ArtelLoopHint 1.0 + ArtelScrollLine 1.0 + ArtelGlass 1.0 + ArtelCorners 1.0 + ArtelLens 1.1 */
!function(){if(!matchMedia("(prefers-reduced-motion:reduce)").matches){var t=0,e=scrollY,n=1;addEventListener("scroll",u,{passive:!0});var o=r();o&&o.on&&o.on("scroll",u),addEventListener("wheel",(function(t){t.deltaY>0&&(n=1,c())}),{passive:!0});var i=setInterval((function(){var t=l();t&&(clearInterval(i),new MutationObserver(s).observe(t.b,{childList:!0}),s())}),500)}function r(){return"undefined"!=typeof lenis?lenis:null}function l(){return window.__aaLoop}function s(){var t=l();if(t){var e=t.b.firstElementChild;if(e){var n=t.b.getBoundingClientRect(),o=innerHeight,i=Math.min(1,Math.max(0,1-n.top/o)),r=i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2;e.style.setProperty("transform","scale("+(.84+.16*r).toFixed(4)+")","important"),e.style.transformOrigin="50% 0",e.style.borderRadius=(28*(1-r)).toFixed(1)+"px",e.style.overflow="hidden",e.style.filter="brightness("+(.8+.2*r).toFixed(3)+")"}}}function a(){if(1===t){t=2,l().jump();var n=r();n&&n.start(),setTimeout((function(){t=0,e=scrollY}),700)}}function c(){if(!t){var e=l();if(e){var o=e.b.getBoundingClientRect();n>0&&o.top<=.3*innerHeight&&o.top>-o.height/2&&function(){var e=l();if(e&&!t){t=1;var n=e.b.getBoundingClientRect(),o=scrollY+n.top,i=r();i&&i.scrollTo?(i.start(),i.scrollTo(o,{duration:.55,easing:function(t){return 1-Math.pow(1-t,3)},lock:!0,force:!0,onComplete:a})):(scrollTo({top:o,behavior:"smooth"}),setTimeout(a,600)),setTimeout((function(){1===t&&a()}),1200)}}()}}}function u(){s();var t=scrollY;t!==e&&(n=t<e?-1:1,e=t),c()}}();
/* ArtelLoopHint 1.0 — the bottom-of-page loop says what it's about to do.
   When the end card (Luz pages: #loop, homepage: #aa-loop) comes up, a line on it reads "Keep scrolling to start over",
   (words only). It shows until the existing loop fires (its top reaches 30% of the screen).
   After the jump back, a short note says "You're back at the start" for 2 s. It never blocks anything. EN/FR by path. */
(function () {
  if (window.__aaLoopHint) return; window.__aaLoopHint = 1;
  var FR = /^\/fr-ca(\/|$)/.test(location.pathname);
  var T1 = FR ? 'Continuez à défiler pour revenir au début.' : 'Keep scrolling to start over.';
  var T2 = FR ? 'Vous êtes de retour au début.' : 'You’re back at the start.';
  var css = '.aalh{position:absolute;left:50%;top:clamp(16px,3vh,32px);transform:translateX(-50%);z-index:20;width:min(340px,calc(100vw - 32px));box-sizing:border-box;background:none;border:0;padding:0;font-family:"ABC Areal","Helvetica Neue",Helvetica,Arial,sans-serif;color:#1D1D1F;text-align:center;opacity:0;transition:opacity .35s ease;pointer-events:none}' +
    '.aalh.on{opacity:1}.aalh p{margin:0;font-size:16px;line-height:1.35;font-weight:500;letter-spacing:-.005em}' +
        '.aalt{position:fixed;left:50%;top:84px;transform:translate(-50%,calc(-50% - 4px));z-index:2147483000;width:max-content;max-width:calc(100vw - 32px);box-sizing:border-box;background:none;color:#1D1D1F;padding:0;font-family:"ABC Areal","Helvetica Neue",Helvetica,Arial,sans-serif;font-size:15px;line-height:1.3;font-weight:500;letter-spacing:-.005em;text-align:center;opacity:0;transition:opacity .35s ease,transform .35s ease;pointer-events:none}' +
    '.aalt.on{opacity:1;transform:translate(-50%,-50%)}';
  var st = document.createElement('style'); st.textContent = css; (document.head || document.documentElement).appendChild(st);
  var sec = null, hint = null, bar = null, toast = null, armed = false, raf = 0, toastT = 0;
  function find() {
    var s = document.getElementById('loop') || document.getElementById('aa-loop') || (window.__aaLoop && window.__aaLoop.b); if (!s) return;
    if (s === sec) { if (hint && !s.contains(hint)) s.appendChild(hint); return; }   // the homepage rebuilds the card's contents: put the note back
    sec = s; if (getComputedStyle(s).position === 'static') s.style.position = 'relative';
    hint = document.createElement('div'); hint.className = 'aalh'; hint.setAttribute('role', 'status');
    hint.innerHTML = '<p></p>'; hint.firstChild.textContent = T1; /* words only: the one bar on the site is the scroll line at the bottom */ s.appendChild(hint);
  }
  function gapMid() {   // just words, centred in the gap between the nav bar and the first picture (or the orb) under it
    var vw = innerWidth, vh = innerHeight, navB = 0, picT = 0;
    Array.prototype.forEach.call(document.querySelectorAll('nav, header, .navbar, .w-nav, .aanav, [class*="nav-bar"]'), function (e) { var r = e.getBoundingClientRect(); if (r.top < 24 && r.height > 20 && r.height < 160 && r.width > vw * 0.5 && getComputedStyle(e).display !== 'none') navB = Math.max(navB, r.bottom); });
    if (!navB) navB = 64;
    Array.prototype.forEach.call(document.querySelectorAll('img, video, .orb-box'), function (e) { var r = e.getBoundingClientRect(); if (r.width > vw * 0.25 && r.height > 120 && r.top >= navB + 8 && r.top < vh * 0.6 && (!picT || r.top < picT)) picT = r.top; });
    return picT && picT - navB >= 28 ? Math.round((navB + picT) / 2) : Math.round(navB + 22);
  }
  function showToast() {
    if (!toast) { toast = document.createElement('div'); toast.className = 'aalt'; toast.setAttribute('role', 'status'); toast.textContent = T2; document.body.appendChild(toast); }
    toast.style.top = gapMid() + 'px'; clearTimeout(toastT); requestAnimationFrame(function () { toast.classList.add('on'); }); toastT = setTimeout(function () { toast.classList.remove('on'); }, 2000);
  }
  function tick() {
    raf = 0; find(); if (!sec) return;
    var vh = window.innerHeight || 800, top = sec.getBoundingClientRect().top;
    // 0 when the card's top enters at the bottom of the screen, 1 when it reaches 30% (where the loop fires)
    var p = Math.max(0, Math.min(1, (vh - top) / (0.7 * vh)));
    var y = window.scrollY || window.pageYOffset || 0;
    if (p > 0.02 && top > -vh * 0.5) { hint.classList.add('on'); if (p > 0.9) armed = true; }
    else { hint.classList.remove('on'); }
    if (armed && y < Math.max(80, vh * 0.15) && top > vh) { armed = false; hint.classList.remove('on'); showToast(); }
  }
  function req() { if (!raf) raf = requestAnimationFrame(tick); }
  addEventListener('scroll', req, { passive: true }); addEventListener('resize', req); addEventListener('wheel', req, { passive: true }); addEventListener('touchmove', req, { passive: true });
  var n = 0, iv = setInterval(function () { req(); if (++n > 40 && sec) clearInterval(iv); if (n > 120) clearInterval(iv); }, 250);
})();
/* ArtelScrollLine 1.0 — a thin orange line on the very bottom edge of the screen that fills left to right as the page scrolls,
   so visitors always see how much is left. 2 px on standard screens, 1.5 px on retina. Never takes clicks. */
(function () {
  if (window.__aaScrollLine) return; window.__aaScrollLine = 1;
  var st = document.createElement('style');
  st.textContent = '.aasl{position:fixed;left:0;right:0;bottom:0;height:2px;z-index:2147483600;pointer-events:none;background:transparent}' +
    '.aasl b{display:block;height:100%;width:100%;background:#FF7B00;transform-origin:0 50%;transform:scaleX(0);will-change:transform}' +
    '@media (min-resolution:2dppx){.aasl{height:1.5px}}@media print{.aasl{display:none}}';
  (document.head || document.documentElement).appendChild(st);
  var el = null, bar = null, raf = 0;
  function mount() { if (el || !document.body) return; el = document.createElement('div'); el.className = 'aasl'; el.setAttribute('aria-hidden', 'true'); el.innerHTML = '<b></b>'; bar = el.firstChild; document.body.appendChild(el); }
  function tick() {
    raf = 0; mount(); if (!bar) return;
    if (!document.body.contains(el)) document.body.appendChild(el);
    var d = document.documentElement, max = Math.max(d.scrollHeight, document.body.scrollHeight) - (window.innerHeight || d.clientHeight);
    var p = max > 0 ? Math.min(1, Math.max(0, (window.scrollY || window.pageYOffset || 0) / max)) : 0;
    bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
  }
  function req() { if (!raf) raf = requestAnimationFrame(tick); }
  addEventListener('scroll', req, { passive: true }); addEventListener('resize', req);
  if ('ResizeObserver' in window) { var ro = new ResizeObserver(req); var w = setInterval(function () { if (document.body) { ro.observe(document.body); clearInterval(w); } }, 100); }
  req(); setInterval(req, 1000);
})();

/* ArtelGlass 1.0 — liquid glass on the site's own surfaces (Oct 31). Nothing moves, nothing is added to the layout, corners stay square.
   - The top bar (homepage .navbar, Luz pages' fixed header) turns to frosted glass once the page leaves the very top: it blurs and lifts the
     colour of what scrolls under it, with a bright hairline on its lower edge, like light caught in the edge of a pane.
   - Solid buttons (orange, ink) get a glass face: a soft light from the top, a bright top edge and a darker bottom edge; on hover the light
     slides across once. Their colour, size and text don't change.
   - Small light controls (carousel pause, arrows) become clear glass squares.
   Elements are found by what they look like (computed colour and size), so the same file works on the homepage, /luz and /black-friday,
   and keeps working when Webflow renames classes. Reduced transparency: solid fallbacks. */
(function(){if(window.__aaGlass)return;window.__aaGlass='1.0';
  var css=[
  /* the bar */
  '.aa-lg-bar{transition:background-color .45s ease,backdrop-filter .45s ease,-webkit-backdrop-filter .45s ease,box-shadow .45s ease!important}',
  'html.aa-lg-on body .aa-lg-bar.aa-lg-bar.aa-lg-bar.aa-lg-bar{background-color:rgba(250,250,252,.52)!important;background-image:linear-gradient(180deg,rgba(255,255,255,.42),rgba(255,255,255,.08))!important;',
  '-webkit-backdrop-filter:blur(18px) saturate(185%) brightness(1.03)!important;backdrop-filter:blur(18px) saturate(185%) brightness(1.03)!important;',
  'box-shadow:inset 0 -1px 0 rgba(255,255,255,.75),0 1px 0 rgba(29,29,31,.06),0 10px 30px -18px rgba(29,29,31,.22)!important}',
  'html.aa-lg-on body .aa-lg-bar.aa-lg-bar.aa-lg-bar.aa-lg-bar.aa-lg-dark{background-color:rgba(18,19,23,.42)!important;background-image:linear-gradient(180deg,rgba(255,255,255,.10),rgba(255,255,255,0))!important;',
  'box-shadow:inset 0 -1px 0 rgba(255,255,255,.16),0 10px 30px -18px rgba(0,0,0,.5)!important}',
  /* solid buttons: a glass face over their own colour */
  '.aa-lg-btn{background-image:linear-gradient(105deg,rgba(255,255,255,0) 35%,rgba(255,255,255,.28) 50%,rgba(255,255,255,0) 65%),linear-gradient(180deg,rgba(255,255,255,.26),rgba(255,255,255,.04) 52%,rgba(0,0,0,.05))!important;',
  'background-size:250% 100%,100% 100%!important;background-position:130% 0,0 0!important;background-repeat:no-repeat!important;',
  'box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset 0 -1px 0 rgba(0,0,0,.14),0 6px 18px -10px rgba(29,29,31,.35)!important;',
  'transition:background-position .9s cubic-bezier(.3,0,.08,1),box-shadow .3s ease!important}',
  '.aa-lg-btn:hover{background-position:-30% 0,0 0!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.7),inset 0 -1px 0 rgba(0,0,0,.14),0 10px 24px -10px rgba(29,29,31,.4)!important}',
  '.aa-lg-btn.aa-lg-ink{box-shadow:inset 0 1px 0 rgba(255,255,255,.22),inset 0 -1px 0 rgba(0,0,0,.4),0 6px 18px -10px rgba(0,0,0,.5)!important}',
  /* small light controls: clear glass */
  '.aa-lg-ctl{background-color:rgba(255,255,255,.46)!important;background-image:linear-gradient(180deg,rgba(255,255,255,.6),rgba(255,255,255,.12))!important;',
  '-webkit-backdrop-filter:blur(12px) saturate(170%)!important;backdrop-filter:blur(12px) saturate(170%)!important;',
  'box-shadow:inset 0 1px 0 rgba(255,255,255,.9),inset 0 -1px 0 rgba(29,29,31,.08),0 4px 14px -8px rgba(29,29,31,.3)!important}',
  /* outlined buttons: clear glass behind the outline */
  '.aa-lg-clear{background-color:rgba(255,255,255,.22)!important;background-image:linear-gradient(180deg,rgba(255,255,255,.45),rgba(255,255,255,0) 60%)!important;-webkit-backdrop-filter:blur(10px) saturate(160%)!important;backdrop-filter:blur(10px) saturate(160%)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.8)!important;transition:background-color .3s ease!important}',
  '.aa-lg-clear:hover{background-color:rgba(255,255,255,.4)!important}',
  '@media (prefers-reduced-transparency:reduce){html.aa-lg-on body .aa-lg-bar.aa-lg-bar.aa-lg-bar.aa-lg-bar{background-color:rgba(250,250,252,.97)!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}',
  'html.aa-lg-on body .aa-lg-bar.aa-lg-bar.aa-lg-bar.aa-lg-bar.aa-lg-dark{background-color:rgba(18,19,23,.97)!important}.aa-lg-ctl{background-color:#fff!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}.aa-lg-clear{-webkit-backdrop-filter:none!important;backdrop-filter:none!important}}',
  '@media (prefers-reduced-motion:reduce){.aa-lg-btn{transition:none!important}}',
  '@media print{html.aa-lg-on body .aa-lg-bar.aa-lg-bar.aa-lg-bar.aa-lg-bar,.aa-lg-btn,.aa-lg-ctl{background-image:none!important;box-shadow:none!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}}'].join('');
  function rgb(s){var m=/rgba?\(([^)]+)\)/.exec(s||'');if(!m)return null;var p=m[1].split(',').map(parseFloat);return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1};}
  function lum(c){return (0.299*c.r+0.587*c.g+0.114*c.b)/255;}
  function tag(){
    /* the bar: a fixed element pinned to the top, full width */
    var bars=[].slice.call(document.querySelectorAll('.navbar.w-nav, body > header, header'));
    bars.forEach(function(e){var s=getComputedStyle(e),r=e.getBoundingClientRect();if((s.position==='fixed'||s.position==='sticky')&&r.top<=1&&r.width>=innerWidth*0.9&&r.height<140)e.classList.add('aa-lg-bar');});
    [].slice.call(document.querySelectorAll('a,button')).forEach(function(e){if(e.classList.contains('aa-lg-btn')||e.classList.contains('aa-lg-ctl')||e.classList.contains('aa-lg-clear')||e.closest('.aa-lg-skip,iframe'))return;
      var s=getComputedStyle(e),c=rgb(s.backgroundColor),r=e.getBoundingClientRect();if(!c||r.height<24||r.height>90||r.width>520)return;
      if(c.a<0.1){if(parseFloat(s.borderTopWidth)>=1&&parseFloat(s.borderBottomWidth)>=1&&r.width>60)e.classList.add('aa-lg-clear');return;}   // outlined button: clear glass
      if(c.a<0.9)return;
      if(Math.abs(c.r-255)<6&&Math.abs(c.g-123)<10&&c.b<20)e.classList.add('aa-lg-btn');                     // orange
      else if(lum(c)<0.16&&r.width>60&&!(e.parentElement&&e.parentElement.querySelectorAll(':scope>a,:scope>button').length>=3))e.classList.add('aa-lg-btn','aa-lg-ink');   // ink (not a tab in a row of tabs: its colour moves with the active one)
      else if(lum(c)>0.96&&r.width<=64&&r.height<=64)e.classList.add('aa-lg-ctl');});}                  // small light control
  function tone(){var b=document.querySelectorAll('.aa-lg-bar');for(var i=0;i<b.length;i++){var e=b[i],ink=getComputedStyle(e.querySelector('a,.nav-link')||e).color,c=rgb(ink);
      /* light text on the bar = the bar sits over something dark: dark glass */ e.classList.toggle('aa-lg-dark',!!c&&lum(c)>0.7);}}
  function onScroll(){var on=(window.scrollY||document.documentElement.scrollTop)>12;document.documentElement.classList.toggle('aa-lg-on',on);if(on)tone();}
  function init(){var st=document.createElement('style');st.id='aa-glass';st.textContent=css;document.head.appendChild(st);tag();onScroll();
    addEventListener('scroll',onScroll,{passive:true});if(window.lenis&&window.lenis.on)window.lenis.on('scroll',onScroll);
    var t=0;new MutationObserver(function(){clearTimeout(t);t=setTimeout(function(){tag();tone();},250);}).observe(document.body,{childList:true,subtree:true});
    [600,1500,3500,8000].forEach(function(d){setTimeout(function(){tag();tone();},d);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();

/* ArtelCorners 1.0 — round corners the Apple way (Oct 31). Replaces the square 90° corners on the homepage, /luz and /black-friday.
   Apple's three shapes (WWDC25 "Get to know the new design system"):
   - Capsule: radius = half the height. Buttons, pills and small controls.
   - Fixed: one radius for a stand-alone container. Big cards and media 24 px (20 px on phones), smaller cards 18 px (16 px on phones).
   - Concentric: a box inside a rounded box takes the parent's radius minus the gap between them (never under 4 px), so the two
     curves share one centre and the gap stays even all the way round the corner. A box that sits far from its parent's edges keeps its own
     fixed radius, capped so it never looks rounder than its parent.
   Left square on purpose: full-bleed bands and the top bar (they meet the screen edge), text, lines and the orange scroll line.
   Shapes already round (chat bubbles, the orb) are left as they are. Found by look, so it follows Webflow class changes. */
(function(){if(window.__aaCorners)return;window.__aaCorners='1.0';
  var MARK='data-aa-rc';
  function rgb(s){var m=/rgba?\(([^)]+)\)/.exec(s||'');if(!m)return null;var p=m[1].split(',').map(parseFloat);return {a:p.length>3?p[3]:1};}
  function visibleBox(s,e){var c=rgb(s.backgroundColor);if(c&&c.a>0.05)return true;if(parseFloat(s.borderTopWidth)>=1&&parseFloat(s.borderLeftWidth)>=1&&s.borderTopStyle!=='none')return true;
    if(s.backgroundImage&&s.backgroundImage!=='none'&&!/gradient/.test(s.backgroundImage))return true;if(s.boxShadow&&s.boxShadow!=='none'&&!/inset/.test(s.boxShadow))return true;
    return /^(IMG|VIDEO|IFRAME|PICTURE)$/.test(e.tagName);}
  function set(e,v,kind){e.style.setProperty('border-radius',v,'important');e.setAttribute(MARK,kind);}
  function run(){var vw=innerWidth,phone=vw<768,BIG=phone?20:24,SM=phone?16:18;
    /* clear earlier marks so a resize re-solves cleanly */
    [].slice.call(document.querySelectorAll('['+MARK+']')).forEach(function(e){e.style.removeProperty('border-radius');e.removeAttribute(MARK);});
    var all=[].slice.call(document.body.querySelectorAll('a,button,div,section,article,figure,aside,form,img,video,iframe,picture,input,textarea,select,li'));
    var rad=new Map();
    all.forEach(function(e){
      if(e.closest('.aa-lg-bar,.aasl,.aalh,.aalt,svg,canvas,.aa-rc-skip'))return;
      var r=e.getBoundingClientRect();if(r.width<12||r.height<12)return;
      var s=getComputedStyle(e);if(s.display==='inline'||s.visibility==='hidden')return;
      if(parseFloat(s.borderTopLeftRadius)>0.5&&!e.hasAttribute(MARK))return;               // already round: leave it
      if(r.width>=vw*0.95)return;                                                            // full bleed: meets the screen edge
      if(!visibleBox(s,e))return;
      if(/^(IMG|PICTURE|VIDEO)$/.test(e.tagName)&&(r.width<120||r.height<90))return;                // logos and icons keep their own shape
      var isCtl=/^(A|BUTTON|INPUT|SELECT)$/.test(e.tagName)&&r.height<=90&&r.width<=520;
      if(isCtl){var grp=e.parentElement&&e.parentElement.querySelectorAll(':scope>a,:scope>button').length>=3&&r.width>140;
        if(/^(INPUT|SELECT)$/.test(e.tagName)){set(e,Math.min(12,r.height/2)+'px','field');rad.set(e,12);return;}   // text fields: rounded rectangles, as on Apple's forms
        if(!grp){set(e,'999px','capsule');rad.set(e,r.height/2);return;}}                    // capsule
      /* nearest rounded ancestor */
      var p=e.parentElement,pr=null,pe=null;while(p&&p!==document.body){if(rad.has(p)){pe=p;pr=rad.get(p);break;}p=p.parentElement;}
      var own=(r.width>=560||r.height>=420)?BIG:(r.width<=64&&r.height<=64?Math.min(r.width,r.height)/2:SM);
      if(isCtl)own=Math.min(12,r.height/2);                                                  // a row of tabs: small rounded rectangles
      var v=own,kind='fixed';
      if(pe){var b=pe.getBoundingClientRect(),gx=Math.max(0,Math.min(r.left-b.left,b.right-r.right)),gy=Math.max(0,Math.min(r.top-b.top,b.bottom-r.bottom));
        var near=gx<=48&&gy<=48;   // concentric only where the child sits in its parent's corner
        if(near){v=Math.max(4,pr-Math.max(0,Math.max(gx,gy)));kind='concentric';}else v=Math.min(own,Math.max(4,pr-Math.max(0,Math.min(gx,gy))));}
      set(e,v.toFixed(1)+'px',kind);rad.set(e,v);
      if(/^(DIV|SECTION|ARTICLE|FIGURE|ASIDE|LI)$/.test(e.tagName)&&s.overflow==='visible'&&e.querySelector(':scope>img,:scope>video,:scope>picture,:scope>iframe'))e.style.setProperty('overflow','clip','important');   // media inside follows the curve
    });
    /* the other direction: a small card hugging a capsule in its corner takes the capsule's radius plus the gap, so the two curves stay parallel */
    [].slice.call(document.querySelectorAll('['+MARK+'="capsule"]')).forEach(function(c){var p=c.parentElement;for(var k=0;k<3&&p&&p!==document.body;k++,p=p.parentElement){
      if(p.getAttribute(MARK)!=='fixed')continue;var r=c.getBoundingClientRect(),b=p.getBoundingClientRect(),gx=Math.min(r.left-b.left,b.right-r.right),gy=Math.min(r.top-b.top,b.bottom-r.bottom);
      if(gx>=0&&gy>=0&&gx<=24&&gy<=24&&b.height<=200){var v=r.height/2+Math.max(gx,gy);p.style.setProperty('border-radius',Math.min(v,b.height/2).toFixed(1)+'px','important');p.setAttribute(MARK,'outer');}break;}});}
  var t=0,last=0;function later(){clearTimeout(t);var w=Math.max(300,1500-(Date.now()-last));t=setTimeout(function(){last=Date.now();run();},w);}   // at most once every 1.5 s
  function init(){run();addEventListener('resize',later);new MutationObserver(function(m){for(var i=0;i<m.length;i++){var n=m[i].addedNodes;for(var j=0;j<n.length;j++)if(n[j].nodeType===1&&!n[j].classList.contains('aalt')){later();return;}}}).observe(document.body,{childList:true,subtree:true});
    [800,2000,5000].forEach(function(d){setTimeout(run,d);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();

/* ArtelLens 1.1 — liquid glass loupe with a refracting rim (Oct 31), after the glass Berley liked on AlignCanvas (Basit's round lenses). Our own code.
   1.1: the rim also splits light into a thin warm and cool fringe, like a loupe.
   What you see: a glass surface that bends what is behind it. Near the rim the picture is pulled inward and stretched, as light bends
   through the thick curved edge of a lens; across the middle it is magnified a touch, like a loupe. A bright specular line runs along the
   top rim and a soft one along the bottom.
   How: for each glass element a displacement map is drawn on a canvas from the element's own rounded shape (signed distance to its edge),
   wrapped in an SVG filter (feImage + feDisplacementMap) and used as backdrop-filter, so the refraction follows the corner radius exactly
   (capsule, fixed or concentric, from ArtelCorners). Image cards get the same rim on their own picture (filter), so their corners read as glass.
   Where: every button and small control (orange, ink, outlined, light), the top bar's lower edge stays frosted (ArtelGlass), image cards.
   Chrome and Edge show the refraction; Safari and Firefox get the frosted glass without the bend. Reduced transparency: solid. */
(function(){if(window.__aaLens)return;window.__aaLens='1.1';
  var NS='http://www.w3.org/2000/svg',svg,defs,cache={},n=0,ok=/Chrome\//.test(navigator.userAgent)&&!/Edg\/|OPR\//.test('')&&CSS.supports('backdrop-filter','url(#x)');
  function host(){if(svg)return;svg=document.createElementNS(NS,'svg');svg.setAttribute('width','0');svg.setAttribute('height','0');svg.setAttribute('aria-hidden','true');svg.style.cssText='position:absolute;width:0;height:0;overflow:hidden';
    defs=document.createElementNS(NS,'defs');svg.appendChild(defs);document.body.appendChild(svg);}
  /* signed distance to a rounded rectangle (negative inside) */
  function sd(x,y,hw,hh,r){var qx=Math.abs(x)-(hw-r),qy=Math.abs(y)-(hh-r),ox=Math.max(qx,0),oy=Math.max(qy,0);return Math.sqrt(ox*ox+oy*oy)+Math.min(Math.max(qx,qy),0)-r;}
  /* the map: R,G = x,y offset (128 = none). rim: width of the bent edge; mag: centre magnification; pull: how far the rim bends (px) */
  function map(w,h,r,rim,mag,pull,res){var W=Math.max(2,Math.round(w*res)),H=Math.max(2,Math.round(h*res)),c=document.createElement('canvas');c.width=W;c.height=H;var g=c.getContext('2d'),im=g.createImageData(W,H),d=im.data,hw=w/2,hh=h/2,S=pull+Math.max(hw,hh)*mag+1;
    for(var j=0;j<H;j++)for(var i=0;i<W;i++){var x=(i+0.5)/res-hw,y=(j+0.5)/res-hh,dist=-sd(x,y,hw,hh,r),dx=-x*mag,dy=-y*mag;
      if(dist<rim&&dist>-1){var e=0.6,nx=sd(x+e,y,hw,hh,r)-sd(x-e,y,hw,hh,r),ny=sd(x,y+e,hw,hh,r)-sd(x,y-e,hw,hh,r),L=Math.sqrt(nx*nx+ny*ny)||1,f=1-Math.max(0,dist)/rim;f=f*f*(3-2*f);
        dx-=nx/L*pull*f;dy-=ny/L*pull*f;}   /* sample from further inside: the rim stretches the picture behind it */
      var k=(j*W+i)*4;d[k]=128+dx/S*127;d[k+1]=128+dy/S*127;d[k+2]=128;d[k+3]=255;}
    g.putImageData(im,0,0);
    /* the light: a bright line where the rim faces up, a softer one facing down, fading inward across the rim */
    var c2=document.createElement('canvas');c2.width=W;c2.height=H;var g2=c2.getContext('2d'),im2=g2.createImageData(W,H),d2=im2.data;
    for(var j2=0;j2<H;j2++)for(var i2=0;i2<W;i2++){var x2=(i2+0.5)/res-hw,y2=(j2+0.5)/res-hh,ds=-sd(x2,y2,hw,hh,r);if(ds<0||ds>=rim)continue;var e2=0.6,ny2=sd(x2,y2+e2,hw,hh,r)-sd(x2,y2-e2,hw,hh,r),nx2=sd(x2+e2,y2,hw,hh,r)-sd(x2-e2,y2,hw,hh,r),L2=Math.sqrt(nx2*nx2+ny2*ny2)||1;
      var f2=Math.pow(1-ds/rim,2.2),lit=0.62*Math.max(0,-ny2/L2-0.15*nx2/L2)+0.28*Math.max(0,ny2/L2),a2=Math.min(1,f2*lit+(ds<1.2/res?0.22:0));var k2=(j2*W+i2)*4;d2[k2]=d2[k2+1]=d2[k2+2]=255;d2[k2+3]=Math.round(a2*255);}
    g2.putImageData(im2,0,0);return {url:c.toDataURL(),light:c2.toDataURL(),S:S*2};}
  function filter(w,h,r,kind){w=Math.round(w);h=Math.round(h);r=Math.round(Math.min(r,w/2,h/2));var key=kind+w+'x'+h+'r'+r;if(cache[key])return cache[key];host();
    var big=kind==='img',rim=big?Math.min(30,Math.min(w,h)*0.09):Math.min(18,h*0.45),mag=big?0.018:0.06,pull=big?18:Math.min(14,h*0.34),m=map(w,h,r,rim,mag,pull,big?Math.min(1,160/Math.max(w,h)):Math.min(1,240/Math.max(w,h)));
    var id='aa-lens-'+(++n),f=document.createElementNS(NS,'filter');f.setAttribute('id',id);f.setAttribute('x','0');f.setAttribute('y','0');f.setAttribute('width',w);f.setAttribute('height',h);f.setAttribute('filterUnits','userSpaceOnUse');f.setAttribute('primitiveUnits','userSpaceOnUse');f.setAttribute('color-interpolation-filters','sRGB');
    var fi=document.createElementNS(NS,'feImage');fi.setAttribute('href',m.url);fi.setAttribute('x','0');fi.setAttribute('y','0');fi.setAttribute('width',w);fi.setAttribute('height',h);fi.setAttribute('preserveAspectRatio','none');fi.setAttribute('result','map');
    /* the loupe's colour fringe: red bends a little more than green, blue a little less, so the rim splits light into a warm and a cool edge */
    f.appendChild(fi);var ch=[['R',1.07,'1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0'],['G',1,'0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0'],['B',0.93,'0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0']];
    ch.forEach(function(c){var dm=document.createElementNS(NS,'feDisplacementMap');dm.setAttribute('in','SourceGraphic');dm.setAttribute('in2','map');dm.setAttribute('scale',(m.S*c[1]).toFixed(1));dm.setAttribute('xChannelSelector','R');dm.setAttribute('yChannelSelector','G');dm.setAttribute('result','d'+c[0]);
      var cm=document.createElementNS(NS,'feColorMatrix');cm.setAttribute('in','d'+c[0]);cm.setAttribute('type','matrix');cm.setAttribute('values',c[2]);cm.setAttribute('result','c'+c[0]);f.appendChild(dm);f.appendChild(cm);});
    var a1=document.createElementNS(NS,'feComposite');a1.setAttribute('in','cR');a1.setAttribute('in2','cG');a1.setAttribute('operator','arithmetic');a1.setAttribute('k2','1');a1.setAttribute('k3','1');a1.setAttribute('result','rg');
    var a2=document.createElementNS(NS,'feComposite');a2.setAttribute('in','rg');a2.setAttribute('in2','cB');a2.setAttribute('operator','arithmetic');a2.setAttribute('k2','1');a2.setAttribute('k3','1');a2.setAttribute('result','bent');f.appendChild(a1);f.appendChild(a2);
    if(big){var fl=document.createElementNS(NS,'feImage');fl.setAttribute('href',m.light);fl.setAttribute('x','0');fl.setAttribute('y','0');fl.setAttribute('width',w);fl.setAttribute('height',h);fl.setAttribute('preserveAspectRatio','none');fl.setAttribute('result','light');
      var bl=document.createElementNS(NS,'feBlend');bl.setAttribute('in','light');bl.setAttribute('in2','bent');bl.setAttribute('mode','screen');f.appendChild(fl);f.appendChild(bl);}
    defs.appendChild(f);return cache[key]='url(#'+id+')';}
  var css=[
  /* glass buttons: tinted, see-through, the backdrop bends at the rim */
  '.aa-lens{position:relative;isolation:isolate}',
  '.aa-lens.aa-lg-btn{background-color:rgba(255,123,0,.9)!important}',
  '.aa-lens.aa-lg-btn.aa-lg-ink{background-color:rgba(29,29,31,.74)!important}',
  '.aa-lens.aa-lg-clear{background-color:rgba(255,255,255,.16)!important}',
  '.aa-lens.aa-lg-ctl{background-color:rgba(255,255,255,.30)!important}',
  '.aa-lens{box-shadow:inset 0 1.5px 1px rgba(255,255,255,.9),inset 0 -1.5px 1px rgba(255,255,255,.4),inset 0 0 0 1px rgba(255,255,255,.22),inset 0 10px 14px -10px rgba(255,255,255,.55),inset 0 -10px 14px -10px rgba(0,0,0,.14),0 10px 24px -12px rgba(29,29,31,.42)!important}',
  '.aa-lens-img{box-shadow:0 18px 40px -26px rgba(29,29,31,.45)}',
  '@media (prefers-reduced-transparency:reduce){.aa-lens{-webkit-backdrop-filter:none!important;backdrop-filter:none!important}.aa-lens.aa-lg-btn{background-color:#FF7B00!important}.aa-lens.aa-lg-btn.aa-lg-ink{background-color:#1D1D1F!important}.aa-lens-img{filter:none!important}}'].join('');
  function apply(){if(!document.body)return;
    [].slice.call(document.querySelectorAll('.aa-lg-btn,.aa-lg-clear,.aa-lg-ctl')).forEach(function(e){var r=e.getBoundingClientRect();if(r.width<8||r.height<8)return;var rad=parseFloat(getComputedStyle(e).borderTopLeftRadius)||0;
      var base=e.classList.contains('aa-lg-ctl')?'blur(6px) saturate(170%)':'blur(3px) saturate(165%) brightness(1.04)';
      var v=ok?base+' '+filter(r.width,r.height,rad,'btn'):base;e.classList.add('aa-lens');if(e.__lens!==v){e.style.setProperty('-webkit-backdrop-filter',v,'important');e.style.setProperty('backdrop-filter',v,'important');e.__lens=v;}});
    if(!ok||!window.__aaLensImg)return;   /* Oct 31: Berley: photos and cards stay flat; the loupe is for buttons (set window.__aaLensImg=1 to preview it on photos) */
    [].slice.call(document.querySelectorAll('img[data-aa-rc]')).forEach(function(e){var r=e.getBoundingClientRect();if(r.width<200||r.height<140)return;var rad=parseFloat(getComputedStyle(e).borderTopLeftRadius)||0;if(rad<8)return;
      var v=filter(r.width,r.height,rad,'img');e.classList.add('aa-lens-img');if(e.__lens!==v){e.style.setProperty('filter',v);e.__lens=v;}});}
  var t=0;function later(){clearTimeout(t);t=setTimeout(apply,400);}
  function init(){var st=document.createElement('style');st.id='aa-lens';st.textContent=css;document.head.appendChild(st);apply();addEventListener('resize',later);
    new MutationObserver(later).observe(document.body,{attributes:true,subtree:true,attributeFilter:['data-aa-rc']});[900,2200,5200,9000].forEach(function(d){setTimeout(apply,d);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();
