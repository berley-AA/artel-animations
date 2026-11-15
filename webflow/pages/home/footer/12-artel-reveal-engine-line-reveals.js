
(function(){
  function init(){
    if(window.__aaRv) return; window.__aaRv=1;
    var RM=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('rv-on');
    function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
    function splitLines(t){
      if(!t || RM) return t;
      if(!t.dataset.rvOrig) t.dataset.rvOrig=t.textContent;
      var words=t.dataset.rvOrig.split(/\s+/).filter(Boolean);
      t.innerHTML=words.map(function(w){
        return '<span class="rvW" style="display:inline-block;white-space:pre">'+esc(w)+' </span>';
      }).join('');
      var ws=[].slice.call(t.querySelectorAll('.rvW'));
      var lines=[],cur=[],top=null;
      ws.forEach(function(w){
        var y=Math.round(w.offsetTop);
        if(top===null) top=y;
        if(Math.abs(y-top)>3){ lines.push(cur); cur=[]; top=y; }
        cur.push(w);
      });
      if(cur.length) lines.push(cur);
      t.innerHTML=lines.map(function(l,i){
        var txt=l.map(function(w){ return w.textContent; }).join('').replace(/\s+$/,'');
        return '<span class="rvLw"><span class="rvL" style="transition:transform .95s cubic-bezier(.19,1,.22,1) '+(i*0.1).toFixed(2)+'s, opacity .55s ease '+(i*0.1).toFixed(2)+'s">'+esc(txt)+'</span></span>';
      }).join('');
      return t;
    }
    function reveal(t,instant){
      if(!t) return;
      t.querySelectorAll('.rvL').forEach(function(l){
        if(instant){ l.style.transition='none'; }
        l.classList.add('go');
      });
    }
    var h1=document.querySelector('#hero h1 strong')||document.querySelector('#hero h1');
    var h2=document.querySelector('#hero h2 strong')||document.querySelector('#hero h2');
    function heroArm(){
      splitLines(h1); splitLines(h2);
      function fire(){
        setTimeout(function(){ reveal(h1); },1700);
        setTimeout(function(){ reveal(h2); },2050);
      }
      if(document.documentElement.classList.contains('aa-bg-ready')) fire();
      else{
        var mo=new MutationObserver(function(){
          if(document.documentElement.classList.contains('aa-bg-ready')){ mo.disconnect(); fire(); }
        });
        mo.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
        setTimeout(function(){ try{mo.disconnect();}catch(e){} fire(); },6000);
      }
    }
    if(!RM){
      if(document.fonts && document.fonts.ready) document.fonts.ready.then(heroArm);
      else setTimeout(heroArm,400);
      var rw=window.innerWidth;
      window.addEventListener('resize',function(){
        if(Math.abs(window.innerWidth-rw)<80) return;
        rw=window.innerWidth;
        [h1,h2,bbHead].forEach(function(t){ if(t&&t.dataset.rvOrig){ splitLines(t); reveal(t,true); } });
      },{passive:true});
    }
    var bb=document.querySelector('#clients.section-9:not(.description)');
    var bbHead=document.querySelector('#clients .bb-headline');
    if(bbHead && !RM){
      var bbSplit=function(){ splitLines(bbHead); if(bb && bb.classList.contains('rv-in')) reveal(bbHead); };
      if(document.fonts && document.fonts.ready) document.fonts.ready.then(bbSplit); else bbSplit();
    }
    if(bb && 'IntersectionObserver' in window && !RM){
      var io=new IntersectionObserver(function(es){
        es.forEach(function(en){
          if(en.isIntersecting){
            bb.classList.add('rv-in');
            if(bbHead) setTimeout(function(){ reveal(bbHead); },250);
            io.unobserve(bb);
          }
        });
      },{threshold:0.18});
      io.observe(bb);
    } else if(bb){ bb.classList.add('rv-in'); if(bbHead) reveal(bbHead); }
    var tw=document.querySelector('#team .team-wrap');
    if(tw && 'IntersectionObserver' in window && !RM){
      var tio=new IntersectionObserver(function(es){
        es.forEach(function(en){ if(en.isIntersecting){ tw.classList.add('tm-in'); tio.unobserve(tw); } });
      },{threshold:0.25});
      tio.observe(tw);
    } else if(tw){ tw.classList.add('tm-in'); }
    if(!RM && window.innerWidth>=992 && window.__lenis){
      var L=window.__lenis;
      var IDS=['hero','clients','aa-results','free-pilot','ai-readiness','cta-chatbot','compliance','team','about']; /* free-pilot added 2026-10-01: offer section snaps like the rest */
      var clusters=[];
      var CAP=520;
      function absTop(el){ var y=0; while(el){ y+=el.offsetTop; el=el.offsetParent; } return y; }
      function build(){
        var vh=window.innerHeight;
        var tops=IDS.map(function(id){ var el=document.getElementById(id); return (el&&el.offsetParent)?Math.round(absTop(el)):null; })
          .filter(function(x){ return x!=null; }).sort(function(a,b){ return a-b; });
        clusters=[];
        if(!tops.length) return;
        var cur=[tops[0]];
        for(var i=1;i<tops.length;i++){
          if(tops[i]-tops[i-1]<=vh*1.4) cur.push(tops[i]);
          else{ clusters.push(cur); cur=[tops[i]]; }
        }
        clusters.push(cur);
      }
      function ease(x){ return x<0.5 ? 4*x*x*x : 1-Math.pow(-2*x+2,3)/2; }
      function findCluster(sc){
        var m=window.innerHeight*0.35;
        for(var i=0;i<clusters.length;i++){
          var c=clusters[i];
          if(sc>=c[0]-m && sc<=c[c.length-1]+m) return c;
        }
        return null;
      }
      function nearest(c,sc){
        var bi=0,bd=1e9;
        for(var i=0;i<c.length;i++){ var d=Math.abs(c[i]-sc); if(d<bd){ bd=d; bi=i; } }
        return bi;
      }
      build();
      window.addEventListener('resize',build,{passive:true});
      var cl=null, idx=0, anim=false, captured=false, exited=null;
      var coolStart=0, lastMag=1e9;
      function release(c){ captured=false; cl=null; exited=c; anim=false; coolStart=0; L.start(); }
      function settleDone(){ anim=false; if(cl) idx=nearest(cl,window.scrollY); coolStart=performance.now(); lastMag=1e9; }
      function capture(c,snapIdx){
        captured=true; cl=c; exited=null;
        idx=(snapIdx==null)?nearest(c,window.scrollY):snapIdx;
        L.stop();
        if(snapIdx!=null){
          anim=true;
          L.scrollTo(c[idx],{duration:0.55,force:true,lock:true,easing:ease,onComplete:settleDone});
        }
      }
      function step(n){
        n=Math.max(0,Math.min(cl.length-1,n));
        if(n===idx) return;
        anim=true; coolStart=0;
        L.scrollTo(cl[n],{duration:0.9,force:true,lock:true,easing:ease,
          onComplete:function(){ idx=n; settleDone(); }});
      }
      var c0=findCluster(window.scrollY);
      if(c0) capture(c0,null);
      window.addEventListener('wheel',function(e){
        if(!captured) return;
        e.preventDefault();
        if(anim) return;
        var mag=Math.abs(e.deltaY);
        if(coolStart){
          var since=performance.now()-coolStart;
          var fresh=(mag>20 && mag>lastMag+8) || since>CAP;
          if(!fresh){ lastMag=mag; return; }
          coolStart=0;
        }
        if(mag<6) return;
        var dir=e.deltaY>0?1:-1, t=idx+dir;
        if(t>cl.length-1){ release(cl); }
        else if(t<0){ if(cl===clusters[0]) return; release(cl); }
        else step(t);
      },{passive:false});
      var pv=null, run=0;
      L.on('scroll',function(){
        var sc=window.scrollY;
        if(pv===null){ pv=sc; return; }
        var d=sc-pv; pv=sc;
        if(captured) return;
        if(d===0) return;
        if((d>0)!==(run>0)) run=0;
        run+=d;
        var mx=window.innerHeight*0.5;
        if(exited && (sc<exited[0]-mx || sc>exited[exited.length-1]+mx)) exited=null;
        var c=findCluster(sc);
        if(!c || c===exited) return;
        if(Math.abs(run)<40) return;
        var ti=-1,i;
        if(run>0){ for(i=0;i<c.length;i++){ if(c[i]>=sc-8){ ti=i; break; } } }
        else { for(i=c.length-1;i>=0;i--){ if(c[i]<=sc+8){ ti=i; break; } } }
        if(ti<0) return;
        run=0;
        capture(c,ti);
      });
      document.querySelectorAll('a[href^="#"], .navbar a').forEach(function(a){
        a.addEventListener('click',function(){ if(captured) release(cl); });
      });
      /* A only: lets a link jump to a section and keep the snap engine in sync. */
      window.__aaSnapTo=function(y){ var c=findCluster(y); if(c){ captured=true; cl=c; exited=null; coolStart=0; idx=nearest(c,y); anim=true; L.stop(); L.scrollTo(c[idx],{duration:1.1,force:true,lock:true,easing:ease,onComplete:settleDone}); } else { if(captured) release(cl); L.scrollTo(y,{duration:1.1,force:true}); } };
    }
  }
  if(document.readyState!=='loading') init();
  else document.addEventListener('DOMContentLoaded',init);
})();
