
/* French line on /fr-ca/labs */
if(/^\/fr-ca(\/|$)/.test(location.pathname)){document.addEventListener('DOMContentLoaded',function(){var p=document.querySelector('.lx-copy');if(!p)return;var n=' ';p.innerHTML=n.repeat(13)+'—'+n+n+'Un labo montréalais qui apprend chaque jour et <span class="lx-dim">construit les outils d’IA qui feront rouler les entreprises.</span>';});}
/* Systems index: A/B switch (?w=b) */
if(/[?&]w=b\b/i.test(location.search))document.documentElement.classList.add('lw-vb');
document.addEventListener('DOMContentLoaded',function(){
 var frame=document.querySelector('.lw-frame'),rows=[].slice.call(document.querySelectorAll('.lw-row'));if(!frame||!rows.length)return;
 var vb=document.documentElement.classList.contains('lw-vb'),phone=matchMedia('(max-width:767px)'),touch=matchMedia('(hover:none)').matches;
 /* desktop: image top = where the grey tech line sits once the row is open: summary bottom + --tg (and never above any other cell's text) */
 function align(){if(phone.matches)return;var tg=parseFloat(getComputedStyle(frame).getPropertyValue('--tg'))||22;rows.forEach(function(row){var line=row.querySelector('.lw-line'),s=row.querySelector('.lw-short');if(!line||!s)return;var top=line.getBoundingClientRect().top,t=s.getBoundingClientRect().bottom-top+tg;row.querySelectorAll('.lw-line>.lw-c:not(.lw-desc)').forEach(function(c){t=Math.max(t,c.getBoundingClientRect().bottom-top+8)});row.style.setProperty('--mt',Math.round(t)+'px')})}
 /* carousel per row: runs only while the row is current */
 rows.forEach(function(row){var slides=row.querySelectorAll('.lw-slide'),count=row.querySelector('.lw-count'),i=0,timer=null;
  row._show=function(n){if(!slides.length)return;i=(n+slides.length)%slides.length;slides.forEach(function(s,k){s.classList.toggle('on',k===i)});if(count)count.textContent=(i+1)+' / '+slides.length};
  row._next=function(){row._show(i+1)};
  row._idx=function(){return i};
  row._start=function(){if(timer||slides.length<2)return;timer=setInterval(row._next,1800)};
  row._pause=function(){clearInterval(timer);timer=null};
  row._stop=function(){row._pause();row._show(0)};
  row._show(0)});
 /* ---------- desktop / tablet ----------
    One row open at a time. Switching only follows REAL input (mouse moving, wheel/trackpad, keys).
    Two ways a row can open, handled differently:
    - by SCROLLING (wheel/trackpad brought a row under the mouse): the page is never scrolled back. Only if the row
      above closing would push the open row's top line under the nav is that shift undone. (A and B)
    - by MOVING THE MOUSE onto a row (B only): that row is ANCHORED under the mouse. While the row above closes,
      the page scrolls by exactly the same amount, frame by frame, so the aimed row stays put and the next row never
      slides under the mouse. B also uses hover intent: a row only opens once the mouse settles on it (~90ms). */
 var cur=null,lockUntil=0,lockT=null,px=-1,py=-1,userUntil=0,lastWheel=0,progUntil=0,kv=0,evQ=false,cand=null,candT=null;
 var nav=document.querySelector('.navbar')||document.querySelector('.w-nav');
 function navH(){if(!nav)return 0;var cs=getComputedStyle(nav);if(cs.position!=='fixed'&&cs.position!=='sticky')return 0;var b=nav.getBoundingClientRect().bottom;return b>0?b:0}
 function setCur(row){cur=row;rows.forEach(function(r){var c=r===row;r.classList.toggle('cur',c);if(!c)r._pause()});frame.classList.toggle('has-cur',!!row)}
 function rowAtPointer(){if(px<0)return null;var el=document.elementFromPoint(px,py);return el&&el.closest?el.closest('.lw-row'):null}
 function keepInView(row,anchor){cancelAnimationFrame(kv);var t0=performance.now(),opened=Date.now(),anchorTop=row.getBoundingClientRect().top,prevDoc=anchorTop+scrollY;
  (function step(t){if(row!==cur)return;var r=row.getBoundingClientRect(),el=t-t0,minTop=navH()+8,maxBot=innerHeight-8,dy=0;
   var doc=r.top+scrollY,shift=doc-prevDoc;prevDoc=doc;
   if(anchor&&lastWheel<opened&&el<720){
    /* mouse-aimed row (B): hold it exactly where it was while rows above close */
    dy=r.top-anchorTop;if(r.top-dy<minTop)dy=r.top-minTop;
   }else if(shift<0&&r.top<minTop){
    /* only undo a shift caused by a row above shrinking, and only if the top line would hide */
    dy=Math.max(shift,r.top-minTop);
   }else if(lastWheel<opened&&el>=(anchor?720:0)&&r.bottom>maxBot&&r.top>minTop){
    /* reveal the rest of the open row, only if the reader hasn't scrolled since it opened */
    dy=Math.min(r.bottom-maxBot,r.top-minTop,30);
   }
   if(dy){progUntil=Date.now()+160;window.scrollBy(0,dy);prevDoc=row.getBoundingClientRect().top+scrollY}
   if(el<1300)kv=requestAnimationFrame(step)})(t0)}
 function openDesk(row){if(row===cur)return;
  /* did the mouse move onto this row, or did scrolling bring it under the mouse? */
  var byScroll=(Date.now()-lastWheel)<450;
  rows.forEach(function(r){if(r!==row&&r.classList.contains('open')){r.classList.remove('open');r._stop()}});
  row.classList.add('open');setCur(row);row._start();lockUntil=Date.now()+620;keepInView(row,vb&&!byScroll)}
 function leaveDesk(){cancelAnimationFrame(kv);clearTimeout(lockT);lockT=null;clearTimeout(candT);cand=null;rows.forEach(function(r){if(r.classList.contains('open')){r.classList.remove('open');r._stop()}});setCur(null)}
 function commit(r){var now=Date.now();if(now<lockUntil){clearTimeout(lockT);lockT=setTimeout(evaluate,lockUntil-now+20);return}openDesk(r)}
 function evaluate(){evQ=false;if(touch||phone.matches)return;var r=rowAtPointer();if(!r||rows.indexOf(r)<0||r===cur){if(vb){clearTimeout(candT);cand=null}return}
  if(!vb){commit(r);return}
  /* B: hover intent — only open once the mouse has settled on this row */
  if(cand!==r){cand=r;clearTimeout(candT);candT=setTimeout(function(){candT=null;var r2=rowAtPointer();if(r2===cand&&r2!==cur)commit(r2);cand=null},90)}}
 function queue(){if(!evQ){evQ=true;requestAnimationFrame(evaluate)}}
 document.addEventListener('mousemove',function(e){if(e.clientX===px&&e.clientY===py)return;px=e.clientX;py=e.clientY;queue()},{passive:true});
 window.addEventListener('wheel',function(){var n=Date.now();userUntil=n+700;lastWheel=n},{passive:true});
 ['keydown','mousedown'].forEach(function(t){window.addEventListener(t,function(){var n=Date.now();userUntil=n+700;lastWheel=n},{passive:true})});
 window.addEventListener('scroll',function(){var now=Date.now();if(now<userUntil&&now>progUntil)queue()},{passive:true});
 frame.addEventListener('mouseleave',function(e){if(touch||phone.matches)return;if(e.relatedTarget&&frame.contains(e.relatedTarget))return;leaveDesk()});
 /* tablets (touch, 768+): tap toggles a row */
 function tapToggle(row){if(row.classList.contains('open')){row.classList.remove('open');row._stop();setCur(null)}else{rows.forEach(function(r){if(r!==row&&r.classList.contains('open')){r.classList.remove('open');r._stop()}});row.classList.add('open');setCur(row);row._start();keepInView(row,true)}}
 /* ---------- phone B ----------
    The row crossing the trigger line opens; the others close (both scroll directions).
    The trigger sits at 40% of the screen height so that when the row above closes, the open row's top line stays on screen. */
 var ticking=false;
 function pick(){ticking=false;if(!(vb&&phone.matches))return;var y=innerHeight*0.4,act=null;if(frame.getBoundingClientRect().top<y){rows.forEach(function(r){if(r.getBoundingClientRect().top<=y)act=r})}
  rows.forEach(function(r){if(r!==act&&r.classList.contains('open')){r.classList.remove('open');r._stop()}});
  if(act&&!act.classList.contains('open')){act.classList.add('open');act._start()}}
 function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(pick)}}
 window.addEventListener('scroll',onScroll,{passive:true});
 if(window.lenis&&lenis.on)lenis.on('scroll',onScroll);
 /* ---------- phone A: full-screen viewer ---------- */
 var lb=null,lbRow=null,lbI=0,sx=null;
 function lbRender(){var slides=lbRow.querySelectorAll('.lw-slide'),n=slides.length;lbI=(lbI+n)%n;var st=lb.querySelector('.lw-lb-stage');st.innerHTML='';var c=slides[lbI].cloneNode(true);c.classList.add('on');st.appendChild(c);lb.querySelector('.lw-lb-n').textContent=(lbI+1)+' / '+n}
 function lbClose(){if(!lb)return;lb.classList.remove('on');document.documentElement.style.overflow='';if(window.lenis&&lenis.start)lenis.start()}
 function lbOpen(row){if(!row.querySelectorAll('.lw-slide').length)return;
  if(!lb){lb=document.createElement('div');lb.className='lw-lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');
   lb.innerHTML='<span class="lw-lb-name"></span><button class="lw-lb-x" type="button">Close</button><div class="lw-lb-stage"></div><div class="lw-lb-bar"><button class="lw-lb-p" type="button" aria-label="Previous image">&larr;</button><span class="lw-lb-n"></span><button class="lw-lb-nx" type="button" aria-label="Next image">&rarr;</button></div>';
   document.body.appendChild(lb);
   lb.querySelector('.lw-lb-x').addEventListener('click',lbClose);
   lb.querySelector('.lw-lb-p').addEventListener('click',function(){lbI--;lbRender()});
   lb.querySelector('.lw-lb-nx').addEventListener('click',function(){lbI++;lbRender()});
   lb.addEventListener('click',function(e){if(e.target===lb)lbClose()});
   lb.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
   lb.addEventListener('touchend',function(e){if(sx==null)return;var dx=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(dx)>40){lbI+=dx<0?1:-1;lbRender()}});
   document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')lbClose();if(e.key==='ArrowRight'){lbI++;lbRender()}if(e.key==='ArrowLeft'){lbI--;lbRender()}})}
  lbRow=row;lbI=row._idx();var nm=row.querySelector('.lw-sys');lb.querySelector('.lw-lb-name').textContent=nm?nm.textContent:'';lbRender();
  document.documentElement.style.overflow='hidden';if(window.lenis&&lenis.stop)lenis.stop();lb.classList.add('on');lb.querySelector('.lw-lb-x').focus({preventScroll:true})}
 rows.forEach(function(row){
  row.addEventListener('focus',function(){if(!touch&&!phone.matches)openDesk(row)});
  row.addEventListener('click',function(e){
   if(phone.matches){if(!vb&&e.target.closest('.lw-slides'))lbOpen(row);return}
   if(touch){tapToggle(row)}else{row._next()}});
 });
 function refresh(){align();pick()}
 refresh();window.addEventListener('load',refresh);window.addEventListener('resize',refresh);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(refresh);
});
