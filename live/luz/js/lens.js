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
