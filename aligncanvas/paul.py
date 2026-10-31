import asyncio,base64,os
from playwright.async_api import async_playwright
OUT='showcase';os.makedirs(OUT,exist_ok=True)
JOBS=[
 ('p_first',"CARDS.photo('paul/firstsection.jpg',{fx:0.66,grad:1,gt:0.5,ga:0.72,draw:()=>{CARDS._lines(['AI agents and software','that grow your business.'],W*0.08,H*0.84,H*0.044,'#FFFFFF',{align:'left'});CARDS._mark(W*0.9,H*0.08,H*0.032,'rgba(255,255,255,0.92)');}})"),
 ('p_quote',"CARDS.photo('paul/quote.jpg',{fx:0.5})"),
 ('p_boardroom',"CARDS.photo('paul/boardroom.jpg',{fx:0.32,gradTop:0.55,draw:()=>{CARDS._lines(['Run the operation.','Stop being the operation.'],W/2,H*0.12,H*0.046,['#FFFFFF','rgba(255,255,255,0.72)']);}})"),
 ('p_portrait',"CARDS.photo('paul/portrait45.jpg',{fy:0.3,grad:1,gt:0.7,ga:0.6,draw:()=>{CARDS._T('Berley Bruny',W*0.08,H*0.9,H*0.034,'#FFFFFF',{align:'left'});CARDS._T('Founder, Artel',W*0.08,H*0.935,H*0.024,'rgba(255,255,255,0.7)',{w:500,align:'left',ls:0});}})"),
 ('p_portrait_light',"CARDS.photo('paul/portraitwide.jpg',{fx:0.78})"),
 ('p_mark',"CARDS.photo('paul/marklogo.jpg',{bg:'#FFFFFF',fx:0.5})"),
 ('p_discs',"CARDS.photo('paul/discs.png',{bg:'#0B0B0C',z:0.62})"),
]
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(args=['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'])
    pg=await b.new_page(viewport={'width':1400,'height':1000});pg.on('pageerror',lambda e:print('ERR',e))
    await pg.goto('http://127.0.0.1:8766/test.html')
    await pg.wait_for_function('window.__qa && document.getElementById("loader").hidden',timeout=120000)
    await pg.evaluate('window.__qa.set({cut:"code",len:"full",asp:"4:5",lang:"en",copy:"current"})')
    await pg.add_script_tag(path='cards.js')
    async def save(n):
      d=await pg.evaluate('document.getElementById("c").toDataURL("image/png")');open(f'{OUT}/{n}.png','wb').write(base64.b64decode(d.split(',')[1]));print(n)
    for n,js in JOBS:
      await pg.evaluate(f'(async()=>{{setStage("4:5",2);await {js};}})()');await save(n)
    for k in range(2):await pg.evaluate('(()=>{window.SCOREK="groove";window.LUZ_HQ=true;setStage("4:5",2);const t=T.CX0+2.8*1.3;window.__T=t;seek(t);})()');await pg.wait_for_timeout(500)
    await save('film_cx_rings')
    await b.close()
asyncio.run(main())
