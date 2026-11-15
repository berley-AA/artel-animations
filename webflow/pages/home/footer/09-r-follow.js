
(function(){
  function init(){
    var s=document.getElementById('aa-results');
    if(!s || s.querySelector('.r-follow')) return;
    var old=document.getElementById('Study-cases');
    if(old)(old.closest('section')||old).style.display='none';
    var rows=[].slice.call(s.querySelectorAll('.res-row'));
    if(!rows.length) return;
    if(document.documentElement.classList.contains('is-fr')||/^\/fr-ca(\/|$)/.test(location.pathname)){
      rows.forEach(function(r){
        var h=r.getAttribute('href');
        if(h && h.charAt(0)==='/' && h.indexOf('/fr-ca')!==0) r.setAttribute('href','/fr-ca'+h);
      });
    }
    var c=document.createElement('div'); c.className='r-follow';
    var card=document.createElement('div'); card.className='r-card';
    var bar=document.createElement('div'); bar.className='r-bar';
    for(var i=0;i<3;i++){ var d=document.createElement('span'); d.className='r-dot'; bar.appendChild(d); }
    var cap=document.createElement('span'); cap.className='r-cap'; bar.appendChild(cap);
    var live=document.createElement('span'); live.className='r-live'; bar.appendChild(live);
    var body=document.createElement('div'); body.className='r-body';
    var imgs=rows.map(function(r){
      var im=document.createElement('img');
      im.setAttribute('data-src', r.getAttribute('data-gif')||'');
      im.alt=''; body.appendChild(im); return im;
    });
    card.appendChild(bar); card.appendChild(body); c.appendChild(card); s.appendChild(c);
    function show(i){
      imgs.forEach(function(im,j){
        if(j===i && !im.src && im.getAttribute('data-src')) im.src=im.getAttribute('data-src');
        im.classList.toggle('on', j===i);
      });
      cap.textContent=rows[i].getAttribute('data-cap')||'';
    }
    var tx=0,ty=0,cx=0,cy=0,hot=false,rafId=null,started=false;
    function aim(e){
      var b=s.getBoundingClientRect(), w=c.offsetWidth, h=c.offsetHeight;
      var x=e.clientX-b.left-w/2, y=e.clientY-b.top-h-30;
      x=Math.max(14,Math.min(x,b.width-w-14));
      y=Math.max(14,Math.min(y,b.height-h-14));
      tx=x; ty=y;
      if(!started){ cx=x; cy=y; started=true; }
    }
    function step(){
      cx+=0.13*(tx-cx); cy+=0.13*(ty-cy);
      c.style.transform='translate3d('+cx.toFixed(1)+'px,'+cy.toFixed(1)+'px,0)';
      rafId=(hot||Math.abs(tx-cx)>.5||Math.abs(ty-cy)>.5)?requestAnimationFrame(step):null;
    }
    function go(){ if(rafId==null) rafId=requestAnimationFrame(step); }
    var box=s.querySelector('.res-rows')||s;
    box.addEventListener('mousemove',function(e){
      if(window.innerWidth<992||!s.classList.contains('on'))return;
      aim(e); go();
    });
    box.addEventListener('mouseleave',function(){
      if(window.innerWidth<992)return;
      s.classList.remove('on'); hot=false;
      rows.forEach(function(x){x.classList.remove('act');});
    });
    rows.forEach(function(r,i){
      r.style.transitionDelay='0s,0s,'+(0.12*i)+'s,'+(0.12*i)+'s';
      r.addEventListener('mouseenter',function(e){
        if(window.innerWidth<992)return;
        show(i); s.classList.add('on'); hot=true; aim(e); go();
        rows.forEach(function(x){x.classList.remove('act');}); r.classList.add('act');
      });
    });
    s.addEventListener('mouseleave',function(){
      s.classList.remove('on'); s._cur=null; hot=false;
      rows.forEach(function(x){x.classList.remove('act');});
    });
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(es){
        es.forEach(function(en){
          if(en.isIntersecting){
            s.classList.add('vis'); io.unobserve(s);
            setTimeout(function(){ rows.forEach(function(r){ r.style.transitionDelay='0s'; }); },1500);
          }
        });
      },{threshold:0.15});
      io.observe(s);
    } else { s.classList.add('vis'); }
    if(window.innerWidth<992){
      var mAbsTop=function(el){ var y=0; while(el){ y+=el.offsetTop; el=el.offsetParent; } return y; };
      var mStep=function(){
        var vhm=window.innerHeight;
        var wrap=s.parentElement;
        var sp=wrap.querySelector('.pin-spacer');
        var runway=sp?sp.offsetHeight:0;
        if(!runway) return;
        var end=mAbsTop(wrap)+wrap.offsetHeight-vhm;
        var start=end-runway;
        var p=(window.scrollY-start)/runway;
        if(p<-0.15){ s.classList.remove('on'); s.__mIdx=null; rows.forEach(function(x){x.classList.remove('act','lit');}); return; }
        var idx=Math.max(0, Math.min(rows.length-1, Math.floor(p*rows.length)));
        s.classList.add('on');
        if(s.__mIdx===idx) return;
        s.__mIdx=idx; show(idx);
        rows.forEach(function(x,j){
          x.classList.toggle('lit', j<=idx);
          x.classList.toggle('act', j===idx);
        });
      };
      window.addEventListener('scroll', mStep, {passive:true});
      window.addEventListener('resize', mStep, {passive:true});
      mStep();
    }
  }
  if(document.readyState!=='loading') init(); else document.addEventListener('DOMContentLoaded',init);
})();
