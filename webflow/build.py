"""Webflow custom code, kept here as source.

  pages/<page>/head.html, footer.html   what goes in that page's Custom code boxes (site = site-wide)
  pages/<page>/<head|footer>/*.css|js   each block as its own file, pulled in with {{> path}}
  shared/                               a block more than one page uses (stored once)
  registered/                           scripts registered in Webflow (Site settings > Custom code > scripts), by name@version
  manifest.json                         which registered scripts each page applies, where, in which order

Run  python3 webflow/build.py         prints what each Webflow box should contain (dist/)
     python3 webflow/build.py --check compares with .snapshot/ (the last code read from Webflow)"""
import os, re, sys, json
W = os.path.dirname(os.path.abspath(__file__))
SNAP = {'site': 'site', 'home': 'home_free', 'faq': 'faq_free', 'case-study-montreal-weights': 'mw_free',
        'case-study-nordik': 'nordik_free', 'labs': 'labs_free', 'terms': 'terms_free', 'privacy': 'privacy_free'}
def include(t):
    return re.sub(r'\{\{> ([\w./-]+)\}\}', lambda m: include(open(os.path.join(W, m.group(1)), encoding='utf-8').read()), t)
def build(page, loc):
    p = os.path.join(W, 'pages', page, f'{loc}.html')
    return include(open(p, encoding='utf-8').read()) if os.path.exists(p) else ''
if __name__ == '__main__':
    bad = 0; os.makedirs(os.path.join(W, 'dist'), exist_ok=True)
    for page, snap in SNAP.items():
        for loc in ('head', 'footer'):
            out = build(page, loc)
            if '--check' in sys.argv:
                sp = os.path.join(W, '.snapshot', f'{snap}_{loc}.html')
                ref = open(sp, encoding='utf-8').read() if os.path.exists(sp) else ''
                ok = ref == out; bad += not ok
                print(('ok   ' if ok else 'DIFF ') + f'{page}/{loc}')
            else:
                open(os.path.join(W, 'dist', f'{page}-{loc}.html'), 'w', encoding='utf-8').write(out)
    sys.exit(1 if bad else 0)
