import re,json,sys
segs={}
def add(t,src):
    t=t.strip()
    if len(re.sub(r'[^A-Za-z]','',t))<2: return
    if re.fullmatch(r'[\w\-./#:%,()+ ]*\{\{.*',t): pass
    segs.setdefault(t,set()).add(src)
for f in ['luz.html','luz-bf.html']:
    s=open(f).read()
    body=re.sub(r'<script.*?</script>|<style.*?</style>','',s,flags=re.S)
    for m in re.finditer(r'>([^<>]+)<',body):
        t=m.group(1)
        if '{{' in t and not re.sub(r'\{\{[^}]*\}\}','',t).strip(): continue
        add(t,f+':text')
    for m in re.finditer(r'\b(alt|aria-label|placeholder|title|content)="([^"{]*[A-Za-z][^"]*)"',body):
        if m.group(1)=='content' and not re.search(r'\s',m.group(2)): continue
        add(m.group(2),f+':attr')
    t=re.search(r'<title>(.*?)</title>',s)
    if t: add(t.group(1),f+':title')
    for sc in re.findall(r'<script[^>]*>(.*?)</script>',s,flags=re.S):
        for m in re.finditer(r"'((?:[^'\\\n]|\\.){12,})'|\"((?:[^\"\\\n]|\\.){12,})\"|`([^`]{12,})`",sc):
            x=m.group(1) or m.group(2) or m.group(3)
            if re.search(r'[a-z]{3,} [a-z]{2,}',x) and not re.search(r'[{};=]|https?:|\.\w+\(|px|rgba|translate|cubic|^\s*[#.]',x):
                add(x,f+':js')
out=[{'en':k,'src':sorted(v)} for k,v in segs.items()]
json.dump(out,open('i18n/segments.json','w'),ensure_ascii=False,indent=0)
print(len(out), sum(len(o['en'].split()) for o in out))
