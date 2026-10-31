import asyncio,base64,os
from playwright.async_api import async_playwright
OUT='showcase';os.makedirs(OUT,exist_ok=True)
NAMES=['hero_luz','orb_pink','orb_trio','artel_black','stat_59','stat_5400','stat_week','chat','bilingual','tagline']
CLIENTS=[('client_montreal_weights','cand/mwA2_0_1.0.png','Montreal Weights',['The bilingual support agent,','live since 2024.'],0.5),
         ('client_nordik_recovery','cand/nrA1_0_1.8.png','Nordik Recovery',['A product expert beside','every sales rep.'],0.5),
         ('client_ic_production','cand/icA1_0_0.3.png','I.C. Production',['Luz books the visit.','The crew is on site.'],0.5)]
FILM=[('film_cx_rings','T.CX0+2.8*1.3'),('film_colour_lineup','T.LU0+3.6'),('film_every_customer','T.SP0-0.6')]
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(args=['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'])
    pg=await b.new_page(viewport={'width':1400,'height':1000});pg.on('pageerror',lambda e:print('ERR',e))
    await pg.goto('http://127.0.0.1:8766/test.html')
    await pg.wait_for_function('window.__qa && document.getElementById("loader").hidden',timeout=120000)
    await pg.evaluate('window.__qa.set({cut:"code",len:"full",asp:"4:5",lang:"en",copy:"current"})')
    await pg.add_script_tag(path='cards.js')
    await pg.evaluate('document.fonts.load(\'600 100px "ABC Areal"\')')
    async def save(n):
      d=await pg.evaluate('document.getElementById("c").toDataURL("image/png")');open(f'{OUT}/{n}.png','wb').write(base64.b64decode(d.split(',')[1]));print(n)
    for n in NAMES:
      for k in range(2):await pg.evaluate(f'(()=>{{window.LUZ_HQ=true;setStage("4:5",2);CARDS.run("{n}");}})()');await pg.wait_for_timeout(300)
      await save(n)
    for n,src,brand,line,fy in CLIENTS:
      await pg.evaluate('(async(a)=>{setStage("4:5",2);await CARDS.run("client",a[0],a[1],a[2],a[3]);})',[src,brand,line,fy]);await save(n)
    for n,expr in FILM:
      for k in range(2):await pg.evaluate(f'(()=>{{window.SCOREK="groove";window.LUZ_HQ=true;setStage("4:5",2);const t={expr};window.__T=t;seek(t);}})()');await pg.wait_for_timeout(400)
      await save(n)
    await b.close()
asyncio.run(main())
