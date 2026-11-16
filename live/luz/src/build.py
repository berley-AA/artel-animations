"""Builds the four Luz pages from one source.

  src/page.html     the page: structure, styles and scripts, once
  src/copy.json     the words that change: per slot ({{@name.N}} in the page), "en" and "fr", plus "en-bf"/"fr-bf" only where the
                    Black Friday page says something different
  src/parts/        styles and scripts the page pulls in with {{> name}}

Run:  python3 src/build.py          writes luz.html, luz-fr.html, luz-bf.html, luz-bf-fr.html
      python3 src/build.py --check  fails if the pages on disk differ from what the source builds
Never edit the four .html files by hand: edit src/ and rebuild."""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
OUT = {'en': 'luz.html', 'fr': 'luz-fr.html', 'en-bf': 'luz-bf.html', 'fr-bf': 'luz-bf-fr.html'}

def include(text, depth=0):
    def rep(m):
        name = m.group(1)
        with open(os.path.join(HERE, 'parts', name), encoding='utf-8') as f:
            return include(f.read(), depth + 1)
    return re.sub(r'\{\{> ([\w./-]+)\}\}', rep, text)

def build(variant):
    lang = variant.split('-')[0]
    page = include(open(os.path.join(HERE, 'page.html'), encoding='utf-8').read())
    copy = json.load(open(os.path.join(HERE, 'copy.json'), encoding='utf-8'))
    def fill(m):
        e = copy[m.group(1)]
        return e.get(variant, e[lang])
    out = re.sub(r'\{\{@([\w-]+\.\d+)\}\}', fill, page)
    left = re.findall(r'\{\{[@>][^}]*\}\}', out)
    assert not left, f'unfilled: {left[:3]}'
    return out

if __name__ == '__main__':
    bad = 0
    for v, f in OUT.items():
        html = build(v); p = os.path.join(ROOT, f)
        if '--check' in sys.argv:
            same = open(p, encoding='utf-8').read() == html
            print(('ok   ' if same else 'DIFF ') + f); bad += not same
        else:
            open(p, 'w', encoding='utf-8').write(html); print('wrote', f, len(html))
    sys.exit(1 if bad else 0)
