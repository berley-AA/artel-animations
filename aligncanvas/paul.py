import asyncio,base64,os
from playwright.async_api import async_playwright
OUT='showcase';os.makedirs(OUT,exist_ok=True)
JOBS=[
 ('p_portrait_berley',"CARDS.photo('paul/portrait45.jpg',{fy:0.12,fx:0.6,z:1.18})"),
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
    await b.close()
asyncio.run(main())
