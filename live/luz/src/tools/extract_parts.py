"""One-time: moves every inline <style> and <script> body out of src/page.html into src/parts/,
named after the block id or its leading comment, and leaves {{> file}} in its place."""
import re, os
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(HERE, 'page.html')
s = open(P, encoding='utf-8').read()
os.makedirs(os.path.join(HERE, 'parts', 'css'), exist_ok=True)
os.makedirs(os.path.join(HERE, 'parts', 'js'), exist_ok=True)
used = {}
def slug(x):
    x = re.sub(r'([a-z])([A-Z])', r'\1-\2', x)
    return re.sub(r'[^a-z0-9]+', '-', x.lower()).strip('-')[:40] or 'block'
def name_for(tag, attrs, body, before):
    m = re.search(r'id="([^"]+)"', attrs)
    if m: return slug(re.sub(r'^aa', '', m.group(1)))
    c = re.match(r'\s*/\*+\s*(.*?)\*/', body, re.S) or re.match(r'\s*//\s*(.*)', body)
    if c: return slug(' '.join(c.group(1).split()[:6]))
    h = re.findall(r'<!--\s*(.*?)-->', before[-1500:], re.S)
    if h: return slug(' '.join(h[-1].split()[:6]))
    return 'block'
out, last, n = [], 0, 0
for m in re.finditer(r'<(style|script)(\b[^>]*)>(.*?)</\1>', s, re.S):
    tag, attrs, body = m.group(1), m.group(2), m.group(3)
    if tag == 'script' and 'src=' in attrs: continue
    if tag == 'script' and re.search(r'type="(?!text/javascript|module)[^"]+"', attrs): continue
    if len(body.strip()) == 0: continue
    n += 1
    nm = name_for(tag, attrs, body, s[:m.start()])
    k = (tag, nm); used[k] = used.get(k, 0) + 1
    if used[k] > 1: nm = f'{nm}-{used[k]}'
    fn = f"{'css' if tag == 'style' else 'js'}/{n:02d}-{nm}.{'css' if tag == 'style' else 'js'}"
    open(os.path.join(HERE, 'parts', fn), 'w', encoding='utf-8').write(body)
    out.append(s[last:m.start()]); out.append(f'<{tag}{attrs}>{{{{> {fn}}}}}</{tag}>'); last = m.end()
out.append(s[last:])
open(P, 'w', encoding='utf-8').write(''.join(out))
print(n, 'parts')
