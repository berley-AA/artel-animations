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
