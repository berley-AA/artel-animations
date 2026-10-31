/* ArtelLens 1.0 — liquid glass with a refracting rim (Oct 31), after the glass Berley liked on AlignCanvas. Our own code.
   What you see: a glass surface that bends what is behind it. Near the rim the picture is pulled inward and stretched, as light bends
   through the thick curved edge of a lens; across the middle it is magnified a touch, like a loupe. A bright specular line runs along the
   top rim and a soft one along the bottom.
   How: for each glass element a displacement map is drawn on a canvas from the element's own rounded shape (signed distance to its edge),
   wrapped in an SVG filter (feImage + feDisplacementMap) and used as backdrop-filter, so the refraction follows the corner radius exactly
   (capsule, fixed or concentric, from ArtelCorners). Image cards get the same rim on their own picture (filter), so their corners read as glass.
   Where: every button and small control (orange, ink, outlined, light), the top bar's lower edge stays frosted (ArtelGlass), image cards.
   Chrome and Edge show the refraction; Safari and Firefox get the frosted glass without the bend. Reduced transparency: solid. */
(function(){if(window.__aaLens)return;window.__aaLens='1.0';
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
    g.putImageData(im,0,0);return {url:c.toDataURL(),S:S*2};}
  function filter(w,h,r,kind){w=Math.round(w);h=Math.round(h);r=Math.round(Math.min(r,w/2,h/2));var key=kind+w+'x'+h+'r'+r;if(cache[key])return cache[key];host();
    var big=kind==='img',rim=big?Math.min(22,Math.min(w,h)*0.08):Math.min(16,h*0.42),mag=big?0.015:0.05,pull=big?10:Math.min(12,h*0.3),m=map(w,h,r,rim,mag,pull,big?Math.min(1,160/Math.max(w,h)):Math.min(1,240/Math.max(w,h)));
    var id='aa-lens-'+(++n),f=document.createElementNS(NS,'filter');f.setAttribute('id',id);f.setAttribute('x','0');f.setAttribute('y','0');f.setAttribute('width',w);f.setAttribute('height',h);f.setAttribute('filterUnits','userSpaceOnUse');f.setAttribute('primitiveUnits','userSpaceOnUse');f.setAttribute('color-interpolation-filters','sRGB');
    var fi=document.createElementNS(NS,'feImage');fi.setAttribute('href',m.url);fi.setAttribute('x','0');fi.setAttribute('y','0');fi.setAttribute('width',w);fi.setAttribute('height',h);fi.setAttribute('preserveAspectRatio','none');fi.setAttribute('result','map');
    var dm=document.createElementNS(NS,'feDisplacementMap');dm.setAttribute('in','SourceGraphic');dm.setAttribute('in2','map');dm.setAttribute('scale',m.S.toFixed(1));dm.setAttribute('xChannelSelector','R');dm.setAttribute('yChannelSelector','G');
    f.appendChild(fi);f.appendChild(dm);defs.appendChild(f);return cache[key]='url(#'+id+')';}
  var css=[
  /* glass buttons: tinted, see-through, the backdrop bends at the rim */
  '.aa-lens{position:relative;isolation:isolate}',
  '.aa-lens.aa-lg-btn{background-color:rgba(255,123,0,.80)!important}',
  '.aa-lens.aa-lg-btn.aa-lg-ink{background-color:rgba(29,29,31,.74)!important}',
  '.aa-lens.aa-lg-clear{background-color:rgba(255,255,255,.16)!important}',
  '.aa-lens.aa-lg-ctl{background-color:rgba(255,255,255,.30)!important}',
  '.aa-lens{box-shadow:inset 0 1.5px 0 rgba(255,255,255,.75),inset 0 -1px 0 rgba(255,255,255,.28),inset 1px 0 0 rgba(255,255,255,.18),inset -1px 0 0 rgba(255,255,255,.18),0 8px 22px -12px rgba(29,29,31,.45)!important}',
  '.aa-lens-img{box-shadow:0 18px 40px -26px rgba(29,29,31,.45)}',
  '@media (prefers-reduced-transparency:reduce){.aa-lens{-webkit-backdrop-filter:none!important;backdrop-filter:none!important}.aa-lens.aa-lg-btn{background-color:#FF7B00!important}.aa-lens.aa-lg-btn.aa-lg-ink{background-color:#1D1D1F!important}.aa-lens-img{filter:none!important}}'].join('');
  function apply(){if(!document.body)return;
    [].slice.call(document.querySelectorAll('.aa-lg-btn,.aa-lg-clear,.aa-lg-ctl')).forEach(function(e){var r=e.getBoundingClientRect();if(r.width<8||r.height<8)return;var rad=parseFloat(getComputedStyle(e).borderTopLeftRadius)||0;
      var base=e.classList.contains('aa-lg-ctl')?'blur(6px) saturate(170%)':'blur(3px) saturate(165%) brightness(1.04)';
      var v=ok?filter(r.width,r.height,rad,'btn')+' '+base:base;e.classList.add('aa-lens');if(e.__lens!==v){e.style.setProperty('-webkit-backdrop-filter',v,'important');e.style.setProperty('backdrop-filter',v,'important');e.__lens=v;}});
    if(!ok)return;
    [].slice.call(document.querySelectorAll('img[data-aa-rc]')).forEach(function(e){var r=e.getBoundingClientRect();if(r.width<200||r.height<140)return;var rad=parseFloat(getComputedStyle(e).borderTopLeftRadius)||0;if(rad<8)return;
      var v=filter(r.width,r.height,rad,'img');e.classList.add('aa-lens-img');if(e.__lens!==v){e.style.setProperty('filter',v);e.__lens=v;}});}
  var t=0;function later(){clearTimeout(t);t=setTimeout(apply,400);}
  function init(){var st=document.createElement('style');st.id='aa-lens';st.textContent=css;document.head.appendChild(st);apply();addEventListener('resize',later);
    new MutationObserver(later).observe(document.body,{attributes:true,subtree:true,attributeFilter:['data-aa-rc']});[900,2200,5200,9000].forEach(function(d){setTimeout(apply,d);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();
