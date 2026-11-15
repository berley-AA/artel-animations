"""One-time: turns the Webflow custom-code snapshot (.snapshot/) into organised source.
Each <style>/<script> block becomes a named file. A block that appears on more than one page
is stored once in shared/. pages/<page>/<head|footer>.html keeps the order with {{> path}}."""
import os, re, hashlib, json
W = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SNAP = os.path.join(W, '.snapshot')
PAGES = {'site': 'site', 'home_free': 'home', 'faq_free': 'faq', 'mw_free': 'case-study-montreal-weights',
         'nordik_free': 'case-study-nordik', 'labs_free': 'labs', 'terms_free': 'terms', 'privacy_free': 'privacy'}
# not carried over: luz_free_* (dead: the Luz loader rewrites the page) and bf_free_* (empty)
def slug(x):
    x = re.sub(r'([a-z])([A-Z])', r'\1-\2', x)
    return re.sub(r'[^a-z0-9]+', '-', x.lower()).strip('-')[:44] or 'block'
blocks = {}   # sha -> list of (page, loc, name, ext, body)
docs = {}
for f in sorted(os.listdir(SNAP)):
    m = re.match(r'(.+)_(head|footer)\.html$', f)
    if not m or m.group(1) not in PAGES: continue
    page, loc = PAGES[m.group(1)], m.group(2)
    s = open(os.path.join(SNAP, f), encoding='utf-8').read()
    if not s.strip(): continue
    parts, last, n = [], 0, 0
    for b in re.finditer(r'<(style|script)(\b[^>]*)>(.*?)</\1>', s, re.S):
        tag, attrs, body = b.groups()
        if (tag == 'script' and 'src=' in attrs) or not body.strip(): continue
        n += 1
        before = s[last:b.start()]
        cm = re.search(r'id="([^"]+)"', attrs) or re.match(r'\s*/\*+\s*(.*?)\*/', body, re.S) or re.match(r'\s*//\s*(.*)', body)
        hm = re.findall(r'<!--\s*(.*?)-->', s[:b.start()][-2000:], re.S)
        nm = slug(' '.join((cm.group(1) if cm else (hm[-1] if hm else 'block')).replace('=', ' ').split()[:7]))
        ext = 'css' if tag == 'style' else 'js'
        sha = hashlib.sha1(body.encode()).hexdigest()[:10]
        blocks.setdefault(sha, []).append((page, loc, n, nm, ext, body))
        parts.append((before, tag, attrs, sha))
        last = b.end()
    docs[(page, loc)] = (parts, s[last:])
paths = {}
for sha, uses in blocks.items():
    pages = sorted({u[0] for u in uses})
    page, loc, n, nm, ext, body = uses[0]
    if len(pages) > 1:
        rel = f'shared/{nm}.{ext}'
    else:
        rel = f'pages/{page}/{loc}/{n:02d}-{nm}.{ext}'
    i = 2
    while rel in paths.values():
        rel = re.sub(r'(-\d+)?\.(css|js)$', f'-{i}.\\2', rel); i += 1
    paths[sha] = rel
    os.makedirs(os.path.join(W, os.path.dirname(rel)), exist_ok=True)
    open(os.path.join(W, rel), 'w', encoding='utf-8').write(body)
for (page, loc), (parts, tail) in docs.items():
    out = ''.join(f'{before}<{tag}{attrs}>{{{{> {paths[sha]}}}}}</{tag}>' for before, tag, attrs, sha in parts) + tail
    os.makedirs(os.path.join(W, 'pages', page), exist_ok=True)
    open(os.path.join(W, 'pages', page, f'{loc}.html'), 'w', encoding='utf-8').write(out)
print(len(blocks), 'blocks,', sum(1 for p in paths.values() if p.startswith('shared/')), 'shared')
