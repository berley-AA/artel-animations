import re,sys,os
from playwright.sync_api import sync_playwright
A=sys.argv[1]; OUT=sys.argv[2]
ext={'20d77980398d8bce8ed61611ce009d5e':'ttf','f2fde9f6d7e81b4302650ef6e0f94b8d':'svg','a163ac0e2a4a30c4ed839725bbd675f3':'png'}
def load(name):
    h=open(f'{A}/project/{name}.dc.html').read()
    body=h.split('<x-dc>')[1].split('</x-dc>')[0]
    style=re.search(r'<style>(.*?)</style>',body,re.S).group(1)
    body=re.sub(r'<helmet>.*?</helmet>','',body,flags=re.S)
    def rep(m):
        i=m.group(1); e=ext.get(i,'jpg'); return f'file://{A}/{i}.{e}'
    style=re.sub(r'/_blob/([0-9a-f]{32})',rep,style); body=re.sub(r'/_blob/([0-9a-f]{32})',rep,body)
    return style,body
J={
 'promo_night':('Promo-night',[('Live since Nov 5','Nov 5')]),
 'promo_wismo':('Promo-wismo',[('Live since Nov 5','Nov 5'),('<div style="align-self: flex-end; margin-right: 153px; background: #E5E5EA; border-radius: 26px; padding: 18px 26px; font-size: 28px; color: #1A1B1F; opacity: 0.23">Where’s my order?</div>',''),('<div style="align-self: flex-start; margin-left: 10px; background: #E5E5EA; border-radius: 26px; padding: 18px 26px; font-size: 28px; color: #1A1B1F; opacity: 0.15">Where’s my order?</div>',''),('<div style="align-self: flex-start; margin-left: 116px; background: #E5E5EA; border-radius: 26px; padding: 18px 26px; font-size: 28px; color: #1A1B1F; opacity: 0.32">Where’s my order?</div>','')]),
 'promo_offer':('Promo-offer',[('[OFFER · for example: Luz live on your store in 7 days]','Luz, live on your store in one week.'),('padding: 24px 44px','padding: 24px 44px; border-radius: 999px')]),
 'promo_brand':('Promo-brand',[]),
 'promo_countdown':('Promo-countdown',[('{{days}}','27'),('{{label}}','days until Black Friday.'),('At the peak, nearly half your messages ask one thing. <span style="color: #FF7B00">Luz answers it.</span>','Your store is ready. <span style="color: #FF7B00">Is your inbox?</span>')]),
 'promo_day_night':('Promo-carousel-3',[('<span style="font-size: 22px; color: #86868B">3/3</span>','')]),
 'edu_two_jobs':('Edu-01',[('<span>01</span>','<span></span>'),('>→</span>','></span>')]),
 'edu_who_answers':('Edu-10',[('<span>10</span>','<span></span>')]),
}
only=sys.argv[3:] 
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1080,'height':1350},device_scale_factor=2)
    for k,(n,edits) in J.items():
        if only and k not in only: continue
        st,bd=load(n)
        for a,c in edits:
            assert a in bd, (k,a); bd=bd.replace(a,c)
        html=f'<!doctype html><html><head><meta charset=utf-8><style>{st}</style></head><body>{bd}</body></html>'
        fp=f'{OUT}/{k}.html'; open(fp,'w').write(html)
        pg.goto('file://'+fp); pg.wait_for_timeout(600); pg.evaluate('document.fonts.ready')
        pg.screenshot(path=f'{OUT}/{k}.png',clip={'x':0,'y':0,'width':1080,'height':1350})
        print(k)
    b.close()
