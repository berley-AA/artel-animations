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
  'html.aa-lg-on .aa-lg-bar{background-color:rgba(250,250,252,.52)!important;background-image:linear-gradient(180deg,rgba(255,255,255,.42),rgba(255,255,255,.08))!important;',
  '-webkit-backdrop-filter:blur(18px) saturate(185%) brightness(1.03)!important;backdrop-filter:blur(18px) saturate(185%) brightness(1.03)!important;',
  'box-shadow:inset 0 -1px 0 rgba(255,255,255,.75),0 1px 0 rgba(29,29,31,.06),0 10px 30px -18px rgba(29,29,31,.22)!important}',
  'html.aa-lg-on .aa-lg-bar.aa-lg-dark{background-color:rgba(18,19,23,.42)!important;background-image:linear-gradient(180deg,rgba(255,255,255,.10),rgba(255,255,255,0))!important;',
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
  '@media (prefers-reduced-transparency:reduce){html.aa-lg-on .aa-lg-bar{background-color:rgba(250,250,252,.97)!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}',
  'html.aa-lg-on .aa-lg-bar.aa-lg-dark{background-color:rgba(18,19,23,.97)!important}.aa-lg-ctl{background-color:#fff!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}}',
  '@media (prefers-reduced-motion:reduce){.aa-lg-btn{transition:none!important}}',
  '@media print{html.aa-lg-on .aa-lg-bar,.aa-lg-btn,.aa-lg-ctl{background-image:none!important;box-shadow:none!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}}'].join('');
  function rgb(s){var m=/rgba?\(([^)]+)\)/.exec(s||'');if(!m)return null;var p=m[1].split(',').map(parseFloat);return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1};}
  function lum(c){return (0.299*c.r+0.587*c.g+0.114*c.b)/255;}
  function tag(){
    /* the bar: a fixed element pinned to the top, full width */
    var bars=[].slice.call(document.querySelectorAll('.navbar.w-nav, body > header, header'));
    bars.forEach(function(e){var s=getComputedStyle(e),r=e.getBoundingClientRect();if((s.position==='fixed'||s.position==='sticky')&&r.top<=1&&r.width>=innerWidth*0.9&&r.height<140)e.classList.add('aa-lg-bar');});
    [].slice.call(document.querySelectorAll('a,button')).forEach(function(e){if(e.classList.contains('aa-lg-btn')||e.classList.contains('aa-lg-ctl')||e.closest('.aa-lg-skip,iframe'))return;
      var s=getComputedStyle(e),c=rgb(s.backgroundColor),r=e.getBoundingClientRect();if(!c||c.a<0.9||r.height<24||r.height>90||r.width>520)return;
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
