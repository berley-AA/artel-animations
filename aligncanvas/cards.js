/* Artel showcase cards, drawn with the film's own engine (real 3D orb, ABC Areal, film colours). Run inside the film page after setStage('4:5',2). */
window.CARDS=(function(){
  let BGC='#F5F5F7',ORBED=false;const CV=document.getElementById('c');const TMP=document.createElement('canvas');
  const snap=()=>{TMP.width=CV.width;TMP.height=CV.height;const g=TMP.getContext('2d');g.clearRect(0,0,TMP.width,TMP.height);g.drawImage(CV,0,0);};
  const paste=()=>{X.save();X.setTransform(1,0,0,1,0,0);X.globalAlpha=1;X.drawImage(TMP,0,0);X.restore();};
  const bg=c=>{BGC=c;ORBED=false;X.setTransform(1,0,0,1,0,0);X.clearRect(0,0,CV.width,CV.height);X.setTransform(K,0,0,K,0,0);};
  const T_=(s,x,y,px,col,o={})=>{X.save();X.setTransform(K,0,0,K,0,0);X.font=`${o.w||600} ${px}px ${o.font||CF}`;X.letterSpacing=((o.ls??-0.025)*px)+'px';X.textAlign=o.align||'center';X.textBaseline=o.base||'alphabetic';X.fillStyle=col;X.globalAlpha=o.a??1;X.fillText(s,x,y);X.restore();};
  const lines=(L,x,y,px,cols,o={})=>L.forEach((s,i)=>T_(s,x,y+i*px*(o.lh||1.08),px,Array.isArray(cols)?cols[i]:cols,o));
  const orbs=list=>{snap();const keep=CFG.studio;CFG.studio=BGC;screenOrbs(40,list.map(o=>({x:o.x,y:o.y,h:o.h,rx:o.rx??0.12,ry:o.ry??0.55,g:o.c?brandGrad(o.c):g0()})),0);CFG.studio=keep;paste();ORBED=true;};
  const shadow=(x,y,w)=>{X.save();X.setTransform(K,0,0,K,0,0);const g=X.createRadialGradient(x,y,0,x,y,w);g.addColorStop(0,'rgba(30,30,34,0.22)');g.addColorStop(0.5,'rgba(30,30,34,0.08)');g.addColorStop(1,'rgba(30,30,34,0)');X.fillStyle=g;X.translate(x,y);X.scale(1,0.16);X.beginPath();X.arc(0,0,w,0,7);X.fill();X.restore();};
  const mark=(cx,cy,h,col)=>{const k=h/(20+2*MR);X.save();X.setTransform(K,0,0,K,0,0);X.fillStyle=col;MARK.forEach(([x,y])=>{X.beginPath();X.arc(cx+x*k,cy+y*k,MR*k,0,7);X.fill();});X.restore();};
  const word=(cx,cy,kw,col)=>{X.save();X.setTransform(K,0,0,K,0,0);X.fillStyle=col;WORD.forEach(([x,y])=>{X.beginPath();X.arc(cx+x*kw,cy+y*kw,WR*kw,0,7);X.fill();});X.restore();};
  const rr=(x,y,w,h,r,fill,stroke)=>{X.save();X.setTransform(K,0,0,K,0,0);X.beginPath();X.roundRect(x,y,w,h,r);if(fill){X.fillStyle=fill;X.fill();}if(stroke){X.strokeStyle=stroke;X.lineWidth=1.5;X.stroke();}X.restore();};
  /* Oct 31 (v2): golden-ratio layouts. phi = 1.618; the key lines sit at 0.236, 0.382, 0.618 and 0.764 of the card. Text always clears the orb by
     at least a quarter of the orb's height; orbs live on light backgrounds (their lit cream base reads best on white); a contact shadow sits under
     each orb (clipped below the orb, so it never darkens the body). */
  const F1=0.236,F2=0.382,F3=0.618,F4=0.764,OW=0.758;   // OW: orb width / height
  const contact=(x,yb,w)=>{X.save();X.setTransform(K,0,0,K,0,0);X.beginPath();X.rect(0,yb-1,W,H);X.clip();const g=X.createRadialGradient(x,yb,0,x,yb,w);g.addColorStop(0,'rgba(30,30,34,0.26)');g.addColorStop(0.45,'rgba(30,30,34,0.09)');g.addColorStop(1,'rgba(30,30,34,0)');X.fillStyle=g;X.translate(x,yb);X.scale(1,0.13);X.beginPath();X.arc(0,0,w,0,7);X.fill();X.restore();};
  const orbsOnFloor=list=>{orbs(list);list.forEach(o=>contact(o.x,o.y+o.h*0.5,o.h*OW*0.62));};
  const C={
    hero_luz(){bg(BGW);T_('Introducing',W/2,H*0.15,H*0.03,'#86868B',{w:500,ls:-0.01});T_('Luz',W/2,H*F1+H*0.03,H*0.14,INK,{ls:-0.04});
      const h=H*0.42;orbsOnFloor([{x:W/2,y:H*F3+H*0.02,h,ry:0.4}]);T_('Your new sales assistant.',W/2,H*0.93,H*0.024,'#6E6E73',{w:500,ls:-0.01});},
    orb_pink(){bg(BGW);T_('Dressed in',W/2,H*0.14,H*0.062,INK);T_('your brand.',W/2,H*0.14+H*0.067,H*0.062,'#FF4F9A');const h=H*0.44;orbsOnFloor([{x:W/2,y:H*F3+H*0.03,h,c:'#FF4F9A',ry:0.9}]);},
    orb_trio(){bg(BGW);T_('One assistant.',W/2,H*0.14,H*0.058,INK);T_('Every page. Every hour.',W/2,H*0.14+H*0.064,H*0.058,'#86868B');
      /* three on one floor line: the centre orb h, the two beside it h/phi, equal gaps of (side width)/phi^2; bottoms on the 0.764 line */
      const fl=H*0.80,hc=Math.min(H*0.40,W*0.84/(OW*2.708)),hs=hc/1.618,wc=hc*OW,ws=hs*OW,gap=ws/2.618,dx=wc/2+gap+ws/2;
      orbsOnFloor([{x:W/2-dx,y:fl-hs/2,h:hs,c:'#7A4BFF',ry:1.2},{x:W/2+dx,y:fl-hs/2,h:hs,c:'#1F7BFF',ry:2.1},{x:W/2,y:fl-hc/2,h:hc,ry:0.5}]);},
    artel_black(){bg('#0B0B0C');mark(W/2,H*F2-H*0.02,H*0.06,'#FF7B00');word(W/2,H*0.5,W*0.0085,'#F5F5F7');T_('a Montréal AI company',W/2,H*F3,H*0.024,'#86868B',{w:500,ls:0});
      T_('AI agents and software that grow your business.',W/2,H*0.92,H*0.021,'#6E6E73',{w:500,ls:0});},
    stat_59(){bg(BGW);T_('Why Luz',W*0.1,H*0.12,H*0.024,'#86868B',{w:500,align:'left',ls:0});T_('59%',W*0.09,H*F2,H*0.24,INK,{align:'left',ls:-0.055});
      lines(['of Montreal Weights’','conversations come in','when the shop is closed.'],W*0.1,H*0.47,H*0.044,INK,{align:'left'});T_('Luz answers.',W*0.1,H*0.66,H*0.044,'#FF7B00',{align:'left'});
      const h=H*0.2;orbsOnFloor([{x:W*0.76,y:H*0.86-h/2,h,ry:0.3}]);},
    stat_5400(){bg(BGW);T_('Montreal Weights · past year',W*0.1,H*0.12,H*0.024,'#86868B',{w:500,align:'left',ls:0});T_('5,400+',W*0.09,H*F2-H*0.02,H*0.19,INK,{align:'left',ls:-0.05});
      lines(['conversations answered.','About 3 seconds each.'],W*0.1,H*0.46,H*0.046,[INK,'#86868B'],{align:'left'});const h=H*0.28;orbsOnFloor([{x:W*0.68,y:H*0.88-h/2,h,c:'#FF7B00',ry:0.8}]);},
    stat_week(){bg(BGW);T_('1 week',W/2,H*F1+H*0.07,H*0.17,INK,{ls:-0.05});lines(['to build Luz on your business.','Products, policies, your tone.'],W/2,H*F2+H*0.01,H*0.036,[INK,'#6E6E73'],{w:500});
      const h=H*0.3;orbsOnFloor([{x:W/2,y:H*0.87-h/2,h,ry:0.45}]);},
    chat(){bg(BGW);T_('Changes an order.',W/2,H*0.11,H*0.052,INK);T_('In seconds, day or night.',W/2,H*0.11+H*0.058,H*0.052,'#86868B');
      const x0=W*0.08,w=W*0.84,y0=H*F1,h=H*0.68;X.save();X.setTransform(K,0,0,K,0,0);X.shadowColor='rgba(0,0,0,0.10)';X.shadowBlur=60;X.shadowOffsetY=20;rr(x0,y0,w,h,40,'#FFFFFF');X.restore();rr(x0,y0,w,h,40,null,'#E9E9EE');
      const fs=H*0.024;X.save();X.setTransform(K,0,0,K,0,0);X.fillStyle='#FF7B00';X.beginPath();X.arc(x0+46,y0+52,9,0,7);X.fill();X.restore();T_('Luz · yourstore.com',x0+66,y0+60,fs*0.95,'#6E6E73',{w:500,align:'left',ls:0});
      const msgs=[['c','Can I switch my order to a size M?','It hasn’t shipped.'],['l','Found it, order #4821. It hasn’t','shipped, so I’ve switched it to M.'],['l','A new confirmation is on its','way to your inbox.'],['c','Perfect, thanks!']];
      let y=y0+120;msgs.forEach(([who,...L])=>{X.save();X.setTransform(K,0,0,K,0,0);X.font=`500 ${fs}px ${CF}`;const tw=Math.max(...L.map(s=>X.measureText(s).width));X.restore();const pad=fs*0.75,bw=tw+pad*2,bh=L.length*fs*1.3+pad*1.6,bx=who==='c'?x0+w-36-bw:x0+36;
        rr(bx,y,bw,bh,Math.min(fs*1.1,bh/2),who==='c'?INK:'#EDEDF0');L.forEach((s,i)=>T_(s,bx+pad,y+pad+fs*0.95+i*fs*1.3,fs,who==='c'?'#FFFFFF':INK,{w:500,align:'left',ls:-0.005}));y+=bh+fs*0.9;});
      rr(x0+36,y0+h-120,w-72,84,24,'#FFFFFF','#E5E5EA');T_('Order #4821',x0+64,y0+h-70,fs,INK,{align:'left',ls:0});T_('Updated ✓',x0+w-64,y0+h-70,fs,'#FF7B00',{align:'right',ls:0});},
    bilingual(){bg(BGW);T_('Bonjour.',W/2,H*F1+H*0.02,H*0.12,INK,{ls:-0.045});T_('Hello.',W/2,H*F2,H*0.12,'#FF7B00',{ls:-0.045});
      lines(['Luz answers in French and English,','in your voice.'],W/2,H*0.46,H*0.03,['#1D1D1F','#6E6E73'],{w:500,ls:-0.01});const h=H*0.28;orbsOnFloor([{x:W/2,y:H*0.86-h/2,h,ry:0.6}]);},
    tagline(){bg('#0B0B0C');lines(['Run the operation.','Stop being the operation.'],W/2,H*F2+H*0.04,H*0.06,['#F5F5F7','#86868B']);
      const bw=W*0.36,bh=H*0.06;rr(W/2-bw/2,H*0.565,bw,bh,bh/2,'#FF7B00');T_('Book a Call',W/2,H*0.565+bh*0.64,bh*0.38,'#FFFFFF',{w:500,ls:-0.01});mark(W/2,H*0.88,H*0.04,'#F5F5F7');},
  };
  /* client cards: footage behind, the client's name and one line */
  C.client=async(src,brand,line,fy)=>{const im=new Image();im.src=src;await im.decode();bg('#000');X.save();X.setTransform(K,0,0,K,0,0);const s=Math.max(W/im.width,H/im.height),dw=im.width*s,dh=im.height*s;X.drawImage(im,(W-dw)/2,(H-dh)*(fy??0.5),dw,dh);
    const g=X.createLinearGradient(0,H*0.5,0,H);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.78)');X.fillStyle=g;X.fillRect(0,0,W,H);X.restore();
    T_(brand.toUpperCase(),W*0.08,H*0.82,H*0.02,'rgba(255,255,255,0.75)',{w:500,align:'left',ls:0.16,font:'"ABC Areal Mono", ui-monospace, monospace'});
    lines(line,W*0.08,H*0.875,H*0.045,'#FFFFFF',{align:'left'});mark(W*0.88,H*0.1,H*0.035,'rgba(255,255,255,0.9)');};
  C._bg=bg;C._T=T_;C._lines=lines;C._mark=mark;C._word=word;C._orbs=orbs;
  C.run=async(n,...a)=>{await C[n](...a);if(!ORBED){snap();X.setTransform(1,0,0,1,0,0);X.fillStyle=BGC;X.fillRect(0,0,CV.width,CV.height);paste();}};
  return C;})();
/* Paul's photos: cover-cropped to the card, our type on top where it helps */
CARDS.photo=async(src,o={})=>{const im=new Image();im.src=src;await im.decode();CARDS._bg(o.bg||'#0B0B0C');X.save();X.setTransform(K,0,0,K,0,0);const s=Math.max(W/im.width,H/im.height)*(o.z||1),dw=im.width*s,dh=im.height*s;
  X.drawImage(im,(W-dw)*(o.fx??0.5),(H-dh)*(o.fy??0.5),dw,dh);
  if(o.grad){const g=X.createLinearGradient(0,H*(o.gt??0.55),0,H);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,'+(o.ga??0.7)+')');X.fillStyle=g;X.fillRect(0,0,W,H);}
  if(o.gradTop){const g=X.createLinearGradient(0,0,0,H*0.42);g.addColorStop(0,'rgba(0,0,0,'+o.gradTop+')');g.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=g;X.fillRect(0,0,W,H);}
  X.restore();if(o.draw)o.draw();};
