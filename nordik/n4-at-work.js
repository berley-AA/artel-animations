/* N4 · At work (Nov 5 2026, for the Luz pages' Nordik card). Real questions from Nordik's sales team and the assistant's real answers,
   word for word from the Voiceflow transcripts (Jun 23 and Oct 27, 2026). Only bold is added, on the key facts. */
def({id:'n4',client:'Nordik Recovery',name:'At work',len:23,
 why:'Real questions from Nordik\'s sales team, real answers from the assistant: a spec and the upsell, then the return-policy fine print.',
 moves:['F-01','O-L24','F-02','O-ML08','O-L15','A-25'],
 copy:{l1:'A customer asks something hard.',l2:'The rep gets the *answer.',
  q1:"What is the internal height of the 2 person outdoor sauna? I'm 6ft 2.",
  a1:"Hi there,\nGreat question! The internal height of the 2-3 Person Sanctuary Outdoor Sauna is **200cm**, which is approximately **6 ft 7 in**.\nAt 6 ft 2, you'll have plenty of headroom to stand up comfortably inside.\nHope that clears things up!\nBest regards,",
  q2:'Can i leave it outside all winter long ?',
  a2:"Yes, absolutely. The Sanctuary Outdoor Sauna is crafted from premium Finnish pine treated for exterior use and is designed to be installed outdoors through all seasons, including winter.\nFor stronger long-term weather protection and greater peace of mind, we strongly recommend pairing it with our **roofing kit**. Customers who buy the roofing kit automatically extend their sauna's warranty **from 2 to 5 years**.\nHappy to help,",
  q3:'Just want to confirm that it is a 30 day risk free try as the advertisements?',
  a3:"Hi there,\nGreat question! We do have a 30-day return policy, which for most of our products works just like a risk-free trial. As long as the item is in like-new condition and in its original packaging, you can return it within 30 days of receipt for a full refund.\nHowever, please note that **free returns within 30 days are not applicable to our oversized items**. This includes the 3-Person Nordik Recovery Infrared Sauna, the Nordik Recovery Prestige Cold Plunge, and our Sanctuary Outdoor Saunas.\nFor these larger products, you can still return them within the 30-day window, but the return would be subject to the following conditions:\n•  The product must be in its original packaging and in like-new condition.\n•  The customer is responsible for all outbound and return shipping costs.\n•  A **25% restocking fee** will be deducted from the refund.\nCould you let me know which product you were considering? I can provide a more precise idea of what the return process would look like.\nHope that clears things up!\nThe Nordik Recovery Team",
  tag1:'Exact spec',tag2:'Warranty upsell',tag3:'Fine print caught',end1:'Real questions. Real answers.',end2:"Asked by Nordik Recovery's sales team, 2026."},
 cues:[],
 draw(t,f){const U=u(),ink='#2A2E29',iv='#F2F1EC';
  const pills=(L,list)=>{const fs=Math.min(30*U,W*.022);font(fs,700);list.forEach(([s0,at,until,col])=>{if(t<at||t>until+.35)return;const k=snap(P(t,at,at+.5)*1.6)*(1-EZ(P(t,until,until+.35)));const tw=X.measureText(s0).width,pd=fs*.8;X.save();X.translate(W/2,H*.905);X.scale(k,k);rr(-tw/2-pd,-fs*1.05,tw+pd*2,fs*1.9,fs);X.fillStyle=col;X.fill();X.fillStyle='#FFFFF0';X.textAlign='center';X.fillText(s0,0,fs*.32);X.textAlign='left';X.restore()})};
  /* opening: Nordik's dark green, ivory words, one accent word in Nordik's sand (like the Montreal Weights card's opening) */
  field(ink);
  if(t<2.7){const a=1-P(t,2.2,2.6);X.save();X.globalAlpha=a;blurWords(T(f,'l1'),W/2,H/2-34*U,40*U,'Urbanist',500,'#B9B3A3',.15,.1,t,'center');blurWords(T(f,'l2'),W/2,H/2+44*U,68*U,'Urbanist',600,iv,.95,.13,t,'center','#C9BFA6');X.restore()}
  const L=(()=>{const s=Math.min(W*.86/1200,H*.78/700);return {compact:false,s,x:(W-1200*s)/2,y:H*.05,AW:1200,AH:700}})();
  const rec=(on)=>[{q:"What is the internal height of the 2 person",d:'06/22/2026',on:on===1},{q:'Just want to confirm that it is a 30 day',d:'10/27/2026',on:on===2,at:on===2?12.15:null},{q:'Can the two-person sauna be placed on top',d:'10/27/2026'},{q:'If I purchase the add-on 3-5 year NordikCare',d:'06/30/2026'},{q:'quelle est la température idéale pour inst',d:'07/10/2026'}];
  /* chat 1 (Jun 22, 9:22 PM): height for a 6'2" buyer, then winter, and the roofing-kit upsell */
  if(t>=2.4&&t<12.4){const k=EZ(P(t,2.55,3.5));X.save();X.globalAlpha=cl(P(t,2.55,3.05));X.translate(W/2,H/2);X.scale(lerp(1.1,1,k),lerp(1.1,1,k));X.translate(-W/2,-H/2);
    const q1=T(f,'q1'),q2=T(f,'q2');const ty1=P(t,3.0,4.5),ty2=P(t,7.4,8.3);
    const msgs=[{role:'user',text:q1,at:4.7,time:'09:22 PM'},{role:'bot',text:T(f,'a1'),at:5.1,cps:165},{role:'user',text:q2,at:8.5,time:'09:23 PM'},{role:'bot',text:T(f,'a2'),at:8.9,cps:220}];
    const input=t<4.7?q1:(t>=7.4&&t<8.5?q2:''),chars=t<4.7?ty1*q1.length:ty2*q2.length;
    const app=nordikApp({...L,t,recent:rec(1),msgs,input,inputChars:chars,caret:!!input,sendPress:Math.max(0,1-Math.abs(t-4.62)/.12,1-Math.abs(t-8.42)/.12)});
    let cx,cy,pr=0;if(t<4.7){const e=EZ(P(t,3.7,4.55));cx=lerp(W*.72,app.sendX,e);cy=lerp(H*.95,app.sendY,e);pr=Math.max(0,1-Math.abs(t-4.62)/.1)}else if(t<8.5){const e=EZ(P(t,7.2,8.35)),r=EZ(P(t,4.8,5.8));cx=lerp(lerp(app.sendX,app.sendX+30*L.s,r),app.sendX,e);cy=lerp(lerp(app.sendY,app.sendY+70*L.s,r),app.sendY,e);pr=Math.max(0,1-Math.abs(t-8.42)/.1)}else{const e=EZ(P(t,8.6,9.6));cx=lerp(app.sendX,app.sendX+30*L.s,e);cy=lerp(app.sendY,app.sendY+70*L.s,e)}
    if(t>3.4)cursor(cx,cy,1.25*L.s,pr,ink);X.restore()}
  /* chat 2 (Oct 27, 3:13 PM): "30 day risk free?" and the fine print on oversized items */
  if(t>=11.7&&t<20.6){const k=cl(P(t,11.7,12.4)),out=EZ(P(t,19.8,20.6));X.save();X.globalAlpha=k*(1-out);X.translate(W/2,H/2);X.scale(lerp(1,.95,out),lerp(1,.95,out));X.translate(-W/2,-H/2);
    const q3=T(f,'q3'),ty=P(t,12.5,13.9);
    const app=nordikApp({...L,t,recent:rec(2),msgs:[{role:'user',text:q3,at:14.1,time:'03:13 PM'},{role:'bot',text:T(f,'a3'),at:14.5,cps:230,copyAt:19.2}],input:t<14.1?q3:'',inputChars:ty*q3.length,caret:t<14.1,sendPress:Math.max(0,1-Math.abs(t-14.02)/.12)});
    let cx,cy,pr=0;if(t<14.1){const e=EZ(P(t,13.1,13.95));cx=lerp(app.sendX+30*L.s,app.sendX,e);cy=lerp(app.sendY+70*L.s,app.sendY,e);pr=Math.max(0,1-Math.abs(t-14.02)/.1)}else{const e=EZ(P(t,18.3,19.1));cx=lerp(app.sendX,L.x+(app.cx0+30)*L.s,e);cy=lerp(app.sendY,L.y+(app.inY-60)*L.s,e);pr=Math.max(0,1-Math.abs(t-19.18)/.1)}
    cursor(cx,cy,1.25*L.s,pr,ink);X.restore()}
  pills(L,[[T(f,'tag1'),6.0,8.3,'#8C6F3F'],[T(f,'tag2'),10.9,11.85,'#8C6F3F'],[T(f,'tag3'),16.4,19.7,'#8C6F3F']]);
  /* end card: ivory, the Nordik logo, the line, the Artel sign-off */
  if(t>=19.9){const a=cl(P(t,19.9,20.6));X.save();X.globalAlpha=a;field(iv);X.restore();
    endCard(P(t,20.3,21.2),1,e=>{const lw=Math.min(W*.36,360*U);nordikLogo(W/2-lw/2,H/2-lw*.375-56*U+(1-e)*20*U,lw,ink);X.textAlign='center';X.globalAlpha*=eo3(P(t,20.8,21.4));font(Math.min(W*.055,54*U),600);X.fillStyle=ink;X.fillText(T(f,'end1'),W/2,H/2+lw*.2+26*U);font(24*U,500);X.fillStyle='#8B8A80';X.fillText(T(f,'end2'),W/2,H/2+lw*.2+70*U);X.textAlign='left';artelTag(W/2,H-60*U,18*U,'#8B8A80')})}
  grain(.03)}});

