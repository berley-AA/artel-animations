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
  const C={
    hero_luz(){bg(BGW);T_('Introducing',W/2,H*0.17,H*0.034,'#86868B',{w:500,ls:-0.01});T_('Luz',W/2,H*0.29,H*0.15,INK,{ls:-0.04});
      shadow(W/2,H*0.885,W*0.33);orbs([{x:W/2,y:H*0.62,h:H*0.5,ry:0.4}]);T_('Your new sales assistant.',W/2,H*0.955,H*0.026,'#6E6E73',{w:500,ls:-0.01});},
    orb_pink(){bg(BGW);T_('Dressed in',W/2,H*0.15,H*0.07,INK);T_('your brand.',W/2,H*0.225,H*0.07,'#FF4F9A');shadow(W/2,H*0.9,W*0.34);orbs([{x:W/2,y:H*0.62,h:H*0.52,c:'#FF4F9A',ry:0.9}]);},
    orb_trio(){bg('#0B0B0C');T_('One assistant.',W/2,H*0.15,H*0.062,'#F5F5F7');T_('Every page. Every hour.',W/2,H*0.215,H*0.062,'#86868B');
      orbs([{x:W*0.24,y:H*0.66,h:H*0.3,c:'#7A4BFF',ry:1.2},{x:W*0.76,y:H*0.66,h:H*0.3,c:'#1F7BFF',ry:2.1},{x:W/2,y:H*0.6,h:H*0.42,ry:0.5}]);},
    artel_black(){bg('#0B0B0C');mark(W/2,H*0.36,H*0.07,'#FF7B00');word(W/2,H*0.5,W*0.0085,'#F5F5F7');T_('a Montréal AI company',W/2,H*0.6,H*0.026,'#86868B',{w:500,ls:0});
      T_('AI agents and software that grow your business.',W/2,H*0.9,H*0.022,'#6E6E73',{w:500,ls:0});},
    stat_59(){bg(BGW);T_('Why Luz',W*0.1,H*0.14,H*0.026,'#86868B',{w:500,align:'left',ls:0});T_('59%',W*0.09,H*0.47,H*0.27,INK,{align:'left',ls:-0.055});
      lines(['of Montreal Weights’','conversations come in','when the shop is closed.'],W*0.1,H*0.6,H*0.048,INK,{align:'left'});T_('Luz answers.',W*0.1,H*0.83,H*0.048,'#FF7B00',{align:'left'});
      orbs([{x:W*0.86,y:H*0.86,h:H*0.16,ry:0.3}]);},
    stat_5400(){bg('#0B0B0C');T_('Montreal Weights · past year',W*0.1,H*0.14,H*0.026,'#86868B',{w:500,align:'left',ls:0});T_('5,400+',W*0.09,H*0.44,H*0.2,'#F5F5F7',{align:'left',ls:-0.05});
      lines(['conversations answered.','About 3 seconds each.'],W*0.1,H*0.57,H*0.05,['#F5F5F7','#86868B'],{align:'left'});orbs([{x:W*0.72,y:H*0.86,h:H*0.3,c:'#FF7B00',ry:0.8}]);},
    stat_week(){bg(BGW);T_('1 week',W/2,H*0.4,H*0.19,INK,{ls:-0.05});lines(['to build Luz on your business.','Products, policies, your tone.'],W/2,H*0.5,H*0.04,[INK,'#6E6E73']);
      shadow(W/2,H*0.95,W*0.25);orbs([{x:W/2,y:H*0.8,h:H*0.25,ry:0.45}]);},
    chat(){bg(BGW);T_('Changes an order.',W/2,H*0.12,H*0.055,INK);T_('In seconds, day or night.',W/2,H*0.17,H*0.055,'#86868B');
      const x0=W*0.08,w=W*0.84,y0=H*0.25,h=H*0.66;X.save();X.setTransform(K,0,0,K,0,0);X.shadowColor='rgba(0,0,0,0.10)';X.shadowBlur=60;X.shadowOffsetY=20;rr(x0,y0,w,h,40,'#FFFFFF');X.restore();rr(x0,y0,w,h,40,null,'#E9E9EE');
      const fs=H*0.024;X.save();X.setTransform(K,0,0,K,0,0);X.fillStyle='#FF7B00';X.beginPath();X.arc(x0+46,y0+52,9,0,7);X.fill();X.restore();T_('Luz · yourstore.com',x0+66,y0+60,fs*0.95,'#6E6E73',{w:500,align:'left',ls:0});
      const msgs=[['c','Can I switch my order to a size M?','It hasn’t shipped.'],['l','Found it, order #4821. It hasn’t','shipped, so I’ve switched it to M.'],['l','A new confirmation is on its','way to your inbox.'],['c','Perfect, thanks!']];
      let y=y0+120;msgs.forEach(([who,...L])=>{X.save();X.setTransform(K,0,0,K,0,0);X.font=`500 ${fs}px ${CF}`;const tw=Math.max(...L.map(s=>X.measureText(s).width));X.restore();const pad=fs*0.75,bw=tw+pad*2,bh=L.length*fs*1.3+pad*1.6,bx=who==='c'?x0+w-36-bw:x0+36;
        rr(bx,y,bw,bh,Math.min(fs*1.1,bh/2),who==='c'?INK:'#EDEDF0');L.forEach((s,i)=>T_(s,bx+pad,y+pad+fs*0.95+i*fs*1.3,fs,who==='c'?'#FFFFFF':INK,{w:500,align:'left',ls:-0.005}));y+=bh+fs*0.9;});
      rr(x0+36,y0+h-120,w-72,84,24,'#FFFFFF','#E5E5EA');T_('Order #4821',x0+64,y0+h-70,fs,INK,{align:'left',ls:0});T_('Updated ✓',x0+w-64,y0+h-70,fs,'#FF7B00',{align:'right',ls:0});},
    bilingual(){bg(BGW);T_('Bonjour.',W/2,H*0.36,H*0.13,INK,{ls:-0.045});T_('Hello.',W/2,H*0.5,H*0.13,'#FF7B00',{ls:-0.045});
      lines(['Luz answers in French and English,','in your voice.'],W/2,H*0.6,H*0.034,['#1D1D1F','#6E6E73'],{w:500,ls:-0.01});shadow(W/2,H*0.96,W*0.22);orbs([{x:W/2,y:H*0.83,h:H*0.22,ry:0.6}]);},
    tagline(){bg('#0B0B0C');lines(['Run the operation.','Stop being the operation.'],W/2,H*0.44,H*0.062,['#F5F5F7','#86868B']);
      const bw=W*0.36,bh=H*0.06;rr(W/2-bw/2,H*0.56,bw,bh,bh/2,'#FF7B00');T_('Book a Call',W/2,H*0.56+bh*0.64,bh*0.38,'#FFFFFF',{w:500,ls:-0.01});mark(W/2,H*0.86,H*0.045,'#F5F5F7');},
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
