
(function(){
  var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var box=[].filter.call(document.querySelectorAll('.fq'),function(e){return getComputedStyle(e).display!=='none'})[0];
  if(!box) return;
  var OUT='cubic-bezier(.23,1,.32,1)';
  /* 1 + 3: entrance, head first, then rows 30 ms apart, ease-out */
  if(!RM && 'IntersectionObserver' in window){
    document.documentElement.classList.add('fq-js');
    var items=[box.querySelector('.fq-head')].concat([].slice.call(box.querySelectorAll('.fq-row')));
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){ if(!e.isIntersecting) return; io.unobserve(e.target);
        var i=items.indexOf(e.target), first=items.filter(function(x){return x.classList.contains('fq-in')}).length;
        e.target.style.transitionDelay=Math.min(Math.max(i-first,0),12)*30+'ms';
        e.target.classList.add('fq-in');
        setTimeout(function(){e.target.style.transitionDelay=''},800);
      });
    },{rootMargin:'0px 0px -5% 0px'});
    items.forEach(function(x){io.observe(x)});
  }
  /* 2, 6, 15, 17: accordion. Open 260 ms, close 240 ms as a true reverse: the box and its bottom padding
     shrink together (no snap at the end), the text slides back down as it fades. Interrupting mid-way
     picks up from where the box is. */
  [].forEach.call(box.querySelectorAll('.fq-row'),function(row){
    var sum=row.querySelector('.fq-q'), a=row.querySelector('.fq-a'), p=a.querySelector('p'), anim=null, panim=null;
    var IO='cubic-bezier(.32,.72,0,1)';
    function now(){var c=getComputedStyle(a);return {h:a.getBoundingClientRect().height,pb:c.paddingBottom}}
    function stop(){if(anim){anim.onfinish=null;anim.cancel();anim=null} if(panim){panim.cancel();panim=null}}
    sum.addEventListener('mousedown',function(ev){ if(ev.detail>1) ev.preventDefault(); });
    sum.addEventListener('click',function(ev){
      if(RM||!a.animate) return;
      ev.preventDefault();
      try{ if(ev.detail>1){ var s=window.getSelection(); if(s&&!s.isCollapsed) s.removeAllRanges(); } }catch(e){}
      var opening=!row.open||row.classList.contains('fq-closing');
      var from=(anim?now():null); stop();
      if(opening){
        row.classList.remove('fq-closing');
        row.open=true;
        var pb=getComputedStyle(a).paddingBottom, h=a.getBoundingClientRect().height;
        anim=a.animate([{height:(from?from.h:0)+'px',paddingBottom:(from?from.pb:'0px')},{height:h+'px',paddingBottom:pb}],{duration:260,easing:IO});
        panim=p.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:240,delay:from?0:50,easing:OUT,fill:'backwards'});
        anim.onfinish=function(){anim=null};
      }else{
        var c=from||now();
        row.classList.add('fq-closing');
        anim=a.animate([{height:c.h+'px',paddingBottom:c.pb},{height:'0px',paddingBottom:'0px'}],{duration:240,easing:IO,fill:'forwards'});
        panim=p.animate([{opacity:1,transform:'none'},{opacity:0,transform:'translateY(6px)'}],{duration:170,easing:'cubic-bezier(.4,0,1,1)',fill:'forwards'});
        anim.onfinish=function(){row.open=false;row.classList.remove('fq-closing');stop()};
      }
    });
  });
})();
