/* Artel · live Luz orb for the landing page hero.
   Same body, beads and shaders as the Luz film (lathe capsule, ~45k relaxed beads).
   ArtelOrb.mount(canvas, {onClick, pre, hit}) (hit: the element that takes the pointer, default the canvas) (pre(now, ready) -> {k, ox, oy, pitch, refH, px} or null: the hero intro's zoom out + tilt) -> {setExcite, destroy}. Needs window.THREE (r128). */
(function(){
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const R=1,hL=.60,capH=.72,NE=3.0,B=hL+capH;
const rho=y=>{const ay=Math.abs(y);if(ay<=hL)return R;const v=(ay-hL)/capH;return v>=1?0:R*Math.pow(1-Math.pow(v,NE),1/NE)};

/* the bead layout: computed once per page, off the main thread, shared by every orb */
const BEADS_FN=function(){const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));const R=1,hL=.60,capH=.72,NE=3.0,B=hL+capH;const rho=y=>{const ay=Math.abs(y);if(ay<=hL)return R;const v=(ay-hL)/capH;return v>=1?0:R*Math.pow(1-Math.pow(v,NE),1/NE)};const D=.024;let seed=7;const R01=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
  const PS=[[0,-B,0]];{let s=0,py=-B,pr=0;for(let i=1;i<=4000;i++){const y=-B+i/4000*2*B,r=rho(y);s+=Math.hypot(y-py,r-pr);PS.push([s,y,r]);py=y;pr=r}}
  const M=PS.length;let area=0;const cum=new Float64Array(M);for(let i=1;i<M;i++){area+=2*Math.PI*(PS[i][2]+PS[i-1][2])*.5*(PS[i][0]-PS[i-1][0]);cum[i]=area}
  const PHI=PS.map(p=>Math.atan2(p[1],p[2]));let N=Math.round(area/(D*D*.74));let Pp=new Float32Array(N*3);
  const onSurf=(i,x,y,z)=>{const ph=Math.atan2(y,Math.hypot(x,z));let lo=0,hi=M-1;while(lo<hi){const m=(lo+hi)>>1;if(PHI[m]<ph)lo=m+1;else hi=m}
    const k=Math.max(1,lo),a=PS[k-1],b=PS[k],f=clamp((ph-PHI[k-1])/((PHI[k]-PHI[k-1])||1e-9)),r=a[2]+(b[2]-a[2])*f,yy=a[1]+(b[1]-a[1])*f,th=Math.atan2(z,x);
    Pp[i*3]=r*Math.cos(th);Pp[i*3+1]=yy;Pp[i*3+2]=r*Math.sin(th);return k};
  for(let i=0;i<N;i++){const v=R01()*area;let lo=1,hi=M-1;while(lo<hi){const m=(lo+hi)>>1;if(cum[m]<v)lo=m+1;else hi=m}const p=PS[lo],th=R01()*6.2832;onSurf(i,p[2]*Math.cos(th),p[1],p[2]*Math.sin(th))}
  const RAD=Math.sqrt(area/N/.866)*1.12,cell=RAD,KK=(a,b,c)=>((a+512)*1048576)+((b+512)*1024)+(c+512);const dx=new Float32Array(N*3);
  for(let it=0;it<18;it++){const G=new Map();for(let i=0;i<N;i++){const kk=KK(Math.floor(Pp[i*3]/cell),Math.floor(Pp[i*3+1]/cell),Math.floor(Pp[i*3+2]/cell));let a=G.get(kk);if(!a)G.set(kk,a=[]);a.push(i)}
    dx.fill(0);for(let i=0;i<N;i++){const x=Pp[i*3],y=Pp[i*3+1],z=Pp[i*3+2],cx=Math.floor(x/cell),cy=Math.floor(y/cell),cz=Math.floor(z/cell);
      for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let c=-1;c<=1;c++){const L=G.get(KK(cx+a,cy+b,cz+c));if(!L)continue;
        for(const j of L){if(j<=i)continue;const ex=x-Pp[j*3],ey=y-Pp[j*3+1],ez=z-Pp[j*3+2],d=Math.hypot(ex,ey,ez);if(d>=RAD||d<1e-7)continue;const pu=(RAD-d)/d*.3;dx[i*3]+=ex*pu;dx[i*3+1]+=ey*pu;dx[i*3+2]+=ez*pu;dx[j*3]-=ex*pu;dx[j*3+1]-=ey*pu;dx[j*3+2]-=ez*pu}}}
    for(let i=0;i<N;i++)onSurf(i,Pp[i*3]+dx[i*3],Pp[i*3+1]+dx[i*3+1],Pp[i*3+2]+dx[i*3+2])}
  {const add=[];[1,-1].forEach(sg=>{let rmin=9;for(let i=0;i<N;i++){if(Pp[i*3+1]*sg>hL){const r=Math.hypot(Pp[i*3],Pp[i*3+2]);if(r<rmin)rmin=r;}}
     const rh=rmin+RAD*4,near=[];for(let i=0;i<N;i++){if(Pp[i*3+1]*sg>hL&&Math.hypot(Pp[i*3],Pp[i*3+2])<rh+RAD)near.push([Pp[i*3],Pp[i*3+2]]);}
     const n=Math.round(Math.PI*rh*rh/(RAD*RAD*0.866)),mine=[];
     for(let k=0;k<n;k++){const r=rh*Math.sqrt((k+0.5)/n),th=k*2.39996+sg,x=r*Math.cos(th),z=r*Math.sin(th);
       if(near.some(q=>Math.hypot(q[0]-x,q[1]-z)<RAD*0.82)||mine.some(q=>Math.hypot(q[0]-x,q[1]-z)<RAD*0.82))continue;mine.push([x,z]);
       const v=Math.pow(Math.max(0,1-Math.pow(r,NE)),1/NE);add.push([x,sg*(hL+capH*v),z]);}});
   if(add.length){const P2=new Float32Array((N+add.length)*3);P2.set(Pp);add.forEach((q,j)=>P2.set(q,(N+j)*3));Pp=P2;N+=add.length;}}
  const Cc=new Float32Array(N*3),Nn=new Float32Array(N*3),Tt=new Float32Array(N*3),Rn=new Float32Array(N);
  for(let i=0;i<N;i++){const k=onSurf(i,Pp[i*3],Pp[i*3+1],Pp[i*3+2]),a=PS[k-1],b=PS[k],dy=b[1]-a[1],dr=b[2]-a[2],dl=Math.hypot(dy,dr)||1,th=Math.atan2(Pp[i*3+2],Pp[i*3]),ct=Math.cos(th),st=Math.sin(th);
    Cc.set([Pp[i*3],Pp[i*3+1],Pp[i*3+2]],i*3);Nn.set([dy/dl*ct,-dr/dl,dy/dl*st],i*3);Tt.set([-st,0,ct],i*3);Rn[i]=R01()}
  const St=new Float32Array(N*3);for(let i=0;i<N*3;i++)St[i]=R01();return {N,Cc,Nn,Tt,Rn,St};};
function getBeads(){if(window.__artelBeadsP)return window.__artelBeadsP;
  window.__artelBeadsP=new Promise(res=>{let done=false;const sync=()=>{if(!done){done=true;res(BEADS_FN());}};
    try{const url=URL.createObjectURL(new Blob(['onmessage=function(){var r=('+BEADS_FN.toString()+')();postMessage(r,[r.Cc.buffer,r.Nn.buffer,r.Tt.buffer,r.Rn.buffer,r.St.buffer]);}'],{type:'text/javascript'}));
      const w=new Worker(url);w.onmessage=ev=>{if(!done){done=true;res(ev.data);}w.terminate();URL.revokeObjectURL(url);};w.onerror=()=>{w.terminate();sync();};w.postMessage(0);}catch(e){setTimeout(sync,0);}});
  return window.__artelBeadsP;}
try{getBeads();}catch(e){}
function build(THREE,cv){
  const renderer=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});renderer.setClearColor(0xffffff,0);
  const scene=new THREE.Scene(),cam3=new THREE.OrthographicCamera(-1,1,1,-1,1,200000);cam3.position.set(0,0,60000);cam3.lookAt(0,0,0);
  const STOPS=[[0,'#fff6e3'],[.087,'#fff6e2'],[.122,'#fff5e1'],[.157,'#fff2dd'],[.192,'#feedd2'],[.227,'#fce6c1'],[.262,'#fadcad'],[.297,'#f8d292'],[.331,'#f4c273'],[.366,'#efae5a'],[.401,'#e69445'],[.436,'#d47b36'],[.471,'#c36730'],[.506,'#a75025'],[.541,'#8e3f1f'],[.576,'#7a351d'],[.610,'#602617'],[.645,'#4e1f14'],[.680,'#401a12'],[.715,'#33140e'],[.750,'#2c110d'],[.785,'#26100e'],[.820,'#210f0e'],[.855,'#1b0e0d'],[.890,'#130c0b'],[.924,'#120d0e'],[.959,'#12100f'],[1,'#1f1c1b']];
  const gc=document.createElement('canvas');gc.width=512;gc.height=1;const g2=gc.getContext('2d');const lg=g2.createLinearGradient(0,0,512,0);STOPS.forEach(s=>lg.addColorStop(s[0],s[1]));g2.fillStyle=lg;g2.fillRect(0,0,512,1);
  const grad=new THREE.CanvasTexture(gc);grad.minFilter=grad.magFilter=THREE.LinearFilter;
  const U={uGradient:{value:grad},uTime:{value:0},uBreath:{value:0.3},uLift:{value:0},uExcite:{value:0},uSpeak:{value:0},uListen:{value:0},uRippleY:{value:-99},uRippleAmp:{value:0},uClk:{value:new THREE.Vector3(0,0,1)},uClkT:{value:9},uClkA:{value:0},uGather:{value:1},uMouse:{value:new THREE.Vector2(9,9)},uHover:{value:0},uPulseP:{value:new THREE.Vector2(9,9)},uPulseT:{value:9},uView:{value:new THREE.Vector2(1,1)},uBox:{value:300},
    uYmin:{value:-B},uYmax:{value:B},uBead:{value:.012},uFlat:{value:.62},uEnv:{value:.9},uMove:{value:.18},uCover:{value:1},uSize:{value:2}};
  const COMMON=`uniform sampler2D uGradient;uniform float uEnv;uniform float uBreath;uniform float uLift;uniform float uRippleY;uniform float uRippleAmp;uniform float uCover;
float shift(){return 0.0492*uBreath-0.012+uLift;}
vec3 shade(float vT){float t=clamp(vT-shift(),0.0,1.0);return texture2D(uGradient,vec2(t,0.5)).rgb;}
float melt(float vT){return smoothstep(0.50+shift(),0.28+shift(),vT);}
float edge(float vT,float j){return uCover*1.2-0.08+j*0.05-vT;}
const vec3 KEY=vec3(-0.62,0.52,0.58);
#define ENV (vec3(0.86,0.84,0.84)*uEnv)`;
  const floatG=new THREE.Group();scene.add(floatG);const grp=new THREE.Group();floatG.add(grp);
  const prof=[];for(let i=0;i<=200;i++){const y=-B+i/200*2*B;prof.push(new THREE.Vector2(Math.max(rho(y),.0001)*.997,y));}
  const bodyMat=new THREE.ShaderMaterial({uniforms:U,
    vertexShader:`varying float vT;varying vec3 vN;uniform float uYmin;uniform float uYmax;void main(){vT=(position.y-uYmin)/(uYmax-uYmin);vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader:`precision highp float;${COMMON}
varying float vT;varying vec3 vN;uniform float uGather;
void main(){if(edge(vT,0.0)-0.03<0.0)discard;vec3 s=normalize(vN);vec3 base=shade(vT);float m=melt(vT);vec3 L=normalize(KEY);
 float diff=max(dot(s,L),0.0);float self=smoothstep(0.80+shift(),0.48+shift(),vT);vec3 col=base*mix(0.62+0.62*diff,1.06,self)*0.86;
 float graze=pow(1.0-max(s.z,0.0),1.5)*smoothstep(0.38,0.72,vT);
 float F=pow(abs(s.x),2.4)*(0.55+0.45*smoothstep(0.45,0.80,vT))*smoothstep(0.30,0.45,vT)*(1.0-0.4*smoothstep(0.6,0.98,s.y));
 col+=ENV*F*(s.x<0.0?1.0:0.55)*(0.45+1.1*graze)*2.0+ENV*graze*0.25*smoothstep(0.36,0.70,vT);
 col=mix(col,base,m);col+=vec3(1.0,0.86,0.66)*pow(1.0-max(s.z,0.0),2.0)*0.22*m;
 float rip=uRippleAmp*exp(-pow((vT-uRippleY)*9.0,2.0));col+=vec3(1.0,0.7,0.35)*rip*0.45;gl_FragColor=vec4(col,1.0);}`});
  grp.add(new THREE.Mesh(new THREE.LatheGeometry(prof,160),bodyMat));
  const D=.024;floatG.visible=false;
  const beadMat=new THREE.ShaderMaterial({uniforms:U,
    vertexShader:`attribute vec3 aC;attribute vec3 aN;attribute vec3 aT;attribute float aRand;
uniform float uBead;uniform float uFlat;uniform float uYmin;uniform float uYmax;uniform float uTime;uniform float uExcite;uniform float uSpeak;uniform float uListen;uniform float uMove;uniform float uRippleY;uniform float uRippleAmp;uniform float uCover;uniform vec3 uClk;uniform float uClkT;uniform float uClkA;uniform float uGather;uniform vec2 uMouse;uniform float uHover;uniform vec2 uPulseP;uniform float uPulseT;uniform vec2 uView;uniform float uBox;attribute vec3 aStart;
varying vec3 vN;varying vec3 vS;varying float vT;varying float vRand;varying float vSpike;varying float vPop;
void main(){vec3 Bt=cross(aN,aT);vT=(aC.y-uYmin)/(uYmax-uYmin);vRand=aRand;
 float bob=0.5+0.5*sin(uTime*7.0+aRand*6.2831+aC.y*4.0);float spike=uExcite*(0.15+0.85*bob)*(0.3+0.7*aRand);
 float swell=uListen*(0.5+0.5*sin(uTime*2.4-aC.y*3.0+aRand*1.5));float rip=uRippleAmp*exp(-pow((vT-uRippleY)*10.0,2.0));
 float pop=clamp((uCover*1.2-0.08+(aRand-0.5)*0.012-vT)/0.025,0.0,1.0);vPop=pop;
 float cd=distance(aC,uClk),cr=cd-uClkT*1.5;float cw=uClkA*exp(-uClkT*2.0)*sin(cr*16.0)*exp(-cr*cr*6.0)*step(0.0,uClkT);
 vec4 cc=projectionMatrix*modelViewMatrix*vec4(aC,1.0);vec2 sp=cc.xy/cc.w;vec2 dm=(sp-uMouse)*uView*0.5/(uBox*0.5);float hov=uHover*exp(-dot(dm,dm)/0.018);
 float pd=length((sp-uPulseP)*uView*0.5/(uBox*0.5)),pr=uPulseT*1.6;float pulse=exp(-pow((pd-pr)*14.0,2.0))*exp(-uPulseT*1.4);
 float lift=(spike+swell*0.55+rip*0.9+hov*0.8+pulse*1.1)*uMove*(0.3+0.7*smoothstep(0.0,0.25,vT))+(1.0-pop)*0.012+cw*0.045;
 vSpike=spike+rip*0.6+abs(cw)*0.9+pulse*0.8+hov*0.3;float jig=uSpeak*spike*0.35*uMove;
 vec3 off=aN*lift+(aT*sin(uTime*17.0+aRand*40.0)+Bt*cos(uTime*13.0+aRand*31.0))*jig;
 float sz=uBead*(0.82+0.32*fract(aRand*7.31))*(1.0+0.35*min(vSpike,1.0))*pop;
 vec3 p=aC+off+(aT*position.x+Bt*position.y)*sz+aN*position.z*sz*uFlat;
 vN=normalize(normalMatrix*normalize(aT*position.x+Bt*position.y+aN*position.z/uFlat));vS=normalize(normalMatrix*aN);
 gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,
    fragmentShader:`precision highp float;${COMMON}
varying vec3 vN;varying vec3 vS;varying float vT;varying float vRand;varying float vSpike;varying float vPop;
void main(){if(vPop<=0.001)discard;vec3 n=normalize(vN);vec3 s=normalize(vS);vec3 L=normalize(KEY);vec3 base=shade(vT)*(0.95+0.10*vRand);float m=melt(vT);
 float diff=max(dot(n,L),0.0);float dome=clamp(dot(n,s),0.0,1.0);float ao=0.72+0.30*smoothstep(0.30,0.95,dome);float self=smoothstep(0.80+shift(),0.48+shift(),vT);
 vec3 col=base*mix(0.62+0.62*diff,1.06,self)*mix(ao,0.55+0.45*ao,self);
 float graze=pow(1.0-max(n.z,0.0),1.5)*smoothstep(0.38,0.72,vT);
 float F=pow(abs(s.x),2.4)*(0.55+0.45*smoothstep(0.45,0.80,vT))*smoothstep(0.30,0.45,vT)*(1.0-0.4*smoothstep(0.6,0.98,s.y));
 col+=ENV*F*(s.x<0.0?1.0:0.55)*(0.45+1.1*graze)*2.0;col+=ENV*graze*0.25*smoothstep(0.36,0.70,vT);
 float spec=pow(max(dot(reflect(-L,n),vec3(0.0,0.0,1.0)),0.0),36.0);col+=vec3(1.0,0.95,0.88)*spec*(0.06+0.7*step(0.94,vRand));
 col+=ENV*pow(max(dot(reflect(-L,n),vec3(0.0,0.0,1.0)),0.0),26.0)*0.55*smoothstep(0.5,0.85,vT);
 col+=vec3(1.0,0.62,0.25)*min(vSpike,1.2)*0.22;col=mix(col,shade(vT)*(0.98+0.04*uBreath),m*(1.0-0.6*min(vSpike,1.0)));
 float rip=uRippleAmp*exp(-pow((vT-uRippleY)*10.0,2.0));col+=vec3(1.0,0.7,0.35)*rip*0.35;gl_FragColor=vec4(col,1.0);}`});
  const ready=getBeads().then(({N,Cc,Nn,Tt,Rn,St})=>{const ico=new THREE.IcosahedronGeometry(1,0),geo=new THREE.InstancedBufferGeometry();geo.index=ico.index;geo.setAttribute('position',ico.getAttribute('position'));
  geo.setAttribute('aC',new THREE.InstancedBufferAttribute(Cc,3));geo.setAttribute('aN',new THREE.InstancedBufferAttribute(Nn,3));geo.setAttribute('aT',new THREE.InstancedBufferAttribute(Tt,3));geo.setAttribute('aRand',new THREE.InstancedBufferAttribute(Rn,1));geo.setAttribute('aStart',new THREE.InstancedBufferAttribute(St,3));geo.instanceCount=N;U.uBead.value=D*.5;const beads=new THREE.Mesh(geo,beadMat);beads.frustumCulled=false;grp.add(beads);floatG.visible=true;});
  return {renderer,scene,cam3,U,floatG,grp,ready};
}
function mount(cv,opts){
  opts=opts||{};const THREE=window.THREE;if(!THREE||!cv)return null;
  let G;try{G=build(THREE,cv);}catch(e){return null;}
  const {renderer,scene,cam3,U,floatG,grp}=G;
  let w=0,h=0,raf=0,alive=true,t0=performance.now(),last=t0;
  let tiltX=0,tiltY=0,tx=0,ty=0,spin=0.6,spinV=0,pitch=0,pitchV=0,drag=null,lastT=0,moved=0,excite=0,exT=0;
  let V=null;function size(){const r=cv.getBoundingClientRect(),dpr=(V&&V.px)||Math.min(window.devicePixelRatio||1,2);const nw=Math.max(2,Math.round(r.width*dpr)),nh=Math.max(2,Math.round(r.height*dpr));
    if(nw===w&&nh===h)return;w=nw;h=nh;renderer.setPixelRatio(1);renderer.setSize(w,h,false);
    cam3.left=-w/2;cam3.right=w/2;cam3.top=h/2;cam3.bottom=-h/2;cam3.updateProjectionMatrix();}
  const hit=opts.hit||cv;function local(e){const r=hit.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width*2-1,y:-((e.clientY-r.top)/r.height*2-1)};}
  /* Nov 5 (Berley): same hands-on feel as the orb in the chat. Hover lifts the beads under the cursor and the orb leans
     toward it; press and swirl to spin her (spin follows the swirl), let go and she keeps turning, then slows down;
     hold still to stop her; a tap sends a ring out across the beads. */
  const M={x:9,y:9,in:0,lx:0,ly:0};let pulseT=9;
  function cvp(e){const r=cv.getBoundingClientRect();M.x=(e.clientX-r.left)/r.width*2-1;M.y=-((e.clientY-r.top)/r.height*2-1);}
  /* Nov 5 (Berley): holding and swirling the orb must never select text on the page. While the button or finger is down
     (even after leaving the orb), the page can't be selected; it comes back as soon as it's released. */
  if(!document.getElementById('aaOrbNoSel')){const st=document.createElement('style');st.id='aaOrbNoSel';st.textContent='html.aa-orb-hold,html.aa-orb-hold *{-webkit-user-select:none!important;user-select:none!important;-webkit-touch-callout:none!important}';document.head.appendChild(st);}
  hit.style.setProperty('-webkit-user-select','none');hit.style.setProperty('user-select','none');hit.style.setProperty('-webkit-touch-callout','none');
  const noSel=e=>e.preventDefault();
  function holdOn(){document.documentElement.classList.add('aa-orb-hold');document.addEventListener('selectstart',noSel,true);try{const g=window.getSelection();if(g&&g.rangeCount&&!g.isCollapsed)g.removeAllRanges();}catch(x){}}
  function holdOff(){document.documentElement.classList.remove('aa-orb-hold');document.removeEventListener('selectstart',noSel,true);}
  window.addEventListener('pointerup',holdOff);window.addEventListener('pointercancel',holdOff);window.addEventListener('blur',holdOff);
  function letGo(){drag=null;}
  function onMove(e){cvp(e);M.in=(e.pointerType==='touch'&&!drag)?0:1;exT=0.35;
    if(!drag)return;if(e.pointerType==='mouse'&&e.buttons===0){letGo();return;}
    const now=performance.now(),dxp=e.clientX-drag.x,dts=Math.max(0.008,(now-drag.lt)/1000);drag.x=e.clientX;drag.lt=now;moved+=Math.abs(dxp);
    spin+=dxp*0.008;spinV=spinV+(Math.max(-14,Math.min(14,dxp*0.008/dts))-spinV)*0.5;}
  function onDown(e){cvp(e);holdOn();drag={x:e.clientX,x0:e.clientX,y0:e.clientY,t:Date.now(),lt:performance.now()};spinV=0;moved=0;}
  function onUp(e){if(!drag)return;const d=Math.abs(e.clientX-drag.x0)+Math.abs(e.clientY-drag.y0),tap=d<10&&(Date.now()-drag.t)<700;
    if(performance.now()-drag.lt>90)spinV*=0.3;letGo();
    if(tap&&e.type==='pointerup'){cvp(e);U.uPulseP.value.set(M.x,M.y);pulseT=0;exT=0.9;setTimeout(()=>{exT=0.35},500);if(opts.onClick)opts.onClick();}}
  function onLeave(){M.in=0;exT=0;letGo();}
  hit.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')M.in=1;});hit.addEventListener('pointercancel',onUp);window.addEventListener('pointerup',letGo);window.addEventListener('blur',letGo);
  hit.addEventListener('pointermove',onMove);hit.addEventListener('pointerdown',onDown);hit.addEventListener('pointerup',onUp);hit.addEventListener('pointerleave',onLeave);
  function frame(now){if(!alive)return;if(!onScr||document.hidden){raf=0;return;}raf=requestAnimationFrame(frame);V=null;if(opts.pre){try{V=opts.pre(now,floatG.visible);}catch(e){V=null;}}size();floatG.scale.setScalar(((V&&V.refH)||h)*0.68/2.64*(V?V.k:1));const dt=Math.min(0.05,(now-last)/1000);last=now;const t=(now-t0)/1000;
    excite+=(exT-excite)*0.05;const cr=cv.getBoundingClientRect(),hr=hit.getBoundingClientRect(),pk=cr.width?w/cr.width:1,box=Math.max(40,Math.min(hr.width,hr.height)*pk);U.uView.value.set(w,h);U.uBox.value=box;const ocx=(hr.left+hr.width/2-cr.left)/(cr.width||1)*2-1,ocy=-((hr.top+hr.height/2-cr.top)/(cr.height||1)*2-1);const tlx=M.in?Math.max(-1,Math.min(1,(M.x-ocx)*w/box)):0,tly=M.in?Math.max(-1,Math.min(1,(M.y-ocy)*h/box)):0;const ke=1-Math.exp(-dt*5);M.lx+=(tlx-M.lx)*ke;M.ly+=(tly-M.ly)*ke;if(drag&&performance.now()-drag.lt>120)spinV*=Math.exp(-dt*10);if(!drag){spinV*=Math.exp(-dt*0.55);if(Math.abs(spinV)<0.002)spinV=0;}spin+=((drag?0:0.05)+spinV)*dt;U.uMouse.value.set(M.x,M.y);U.uHover.value+=(M.in-U.uHover.value)*(1-Math.exp(-dt*6));pulseT+=dt;U.uPulseT.value=pulseT;
    U.uTime.value=t;U.uBreath.value=0.3+0.25*Math.sin(t*0.9);U.uExcite.value=excite;U.uClkT.value+=dt;
    floatG.rotation.set(0.16-M.ly*0.14+(V?V.pitch:0),0.4+M.lx*0.18,-M.lx*0.10);grp.rotation.y=spin;floatG.position.x=V?V.ox:0;floatG.position.y=(V?V.oy:0)+Math.sin(t*0.8)*((V&&V.refH)||h)*0.006;
    renderer.render(scene,cam3);}
  let onScr=true;const wake=()=>{if(alive&&!raf&&onScr&&!document.hidden){last=performance.now();raf=requestAnimationFrame(frame);}};let vio=null;if('IntersectionObserver' in window){vio=new IntersectionObserver(es=>{const e=es[es.length-1];onScr=e.isIntersecting&&e.intersectionRatio>=0.2;wake();},{threshold:[0,0.2,0.4]});vio.observe(cv);}document.addEventListener('visibilitychange',wake);
  raf=requestAnimationFrame(frame);
  return {destroy(){alive=false;cancelAnimationFrame(raf);if(vio)vio.disconnect();document.removeEventListener('visibilitychange',wake);hit.removeEventListener('pointermove',onMove);hit.removeEventListener('pointerdown',onDown);hit.removeEventListener('pointerup',onUp);hit.removeEventListener('pointerleave',onLeave);try{renderer.dispose();}catch(e){}}};
}
window.ArtelOrb={mount};
})();
