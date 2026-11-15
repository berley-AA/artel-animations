"""One-time extraction: turns the four hand-kept Luz pages into one template + one copy file.
After this runs, src/ is the source and the four pages are build output (see build.py)."""
import re, json, difflib, sys, os
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
V = {'en': 'luz.html', 'fr': 'luz-fr.html', 'en-bf': 'luz-bf.html', 'fr-bf': 'luz-bf-fr.html'}
# tags on one line, or a run of text/code up to the next tag or line end. Tokens never cross a line,
# so line boundaries are token boundaries and a changed sentence becomes one slot, not ten.
TOK = re.compile(r'<[^<>\n]*>|[^<\n]+\n?|\n|<')

def tokens(s):
    out = TOK.findall(s)
    assert ''.join(out) == s
    return out

def edits(a, b):
    """list of (i1, i2, replacement) on token list a, from a line pass refined by a token pass"""
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    return [(i1, i2, ''.join(b[j1:j2])) for op, i1, i2, j1, j2 in sm.get_opcodes() if op != 'equal']

def main():
    src = {k: open(os.path.join(ROOT, f), encoding='utf-8').read() for k, f in V.items()}
    M = tokens(src['en'])
    # coarse pass on lines to keep difflib fast, then token pass inside each changed line block
    mlines = src['en'].splitlines(keepends=True)
    # token offsets of each master line
    pos, starts = 0, []
    acc = 0; tstarts = []
    joined = ''
    # map char offset -> token index
    char2tok = []; c = 0
    for i, t in enumerate(M):
        char2tok.append(c); c += len(t)
    import bisect
    def tok_at(charpos):
        return bisect.bisect_right(char2tok, charpos) - 1
    all_edits = {}
    for k in ('fr', 'en-bf', 'fr-bf'):
        vlines = src[k].splitlines(keepends=True)
        sm = difflib.SequenceMatcher(None, mlines, vlines, autojunk=False)
        E = []
        mo = [0]
        for l in mlines: mo.append(mo[-1] + len(l))
        for op, i1, i2, j1, j2 in sm.get_opcodes():
            if op == 'equal': continue
            ma, mb = mo[i1], mo[i2]
            vt = ''.join(vlines[j1:j2])
            # token range of the master chunk (line boundaries are token-aligned only if no token spans lines)
            ta = tok_at(ma) if ma < c else len(M)
            tb = tok_at(mb) if mb < c else len(M)
            # widen to token boundaries
            sa = char2tok[ta] if ta < len(M) else c
            sb = char2tok[tb] if tb < len(M) else c
            mtext = src['en'][sa:sb]
            # pull the variant text for the widened range: add the master prefix/suffix that the line cut away
            pre, suf = src['en'][sa:ma], src['en'][mb:sb]
            vt2 = pre + vt + suf
            sub = edits(tokens(mtext) if mtext else [], tokens(vt2) if vt2 else [])
            base = ta
            for i1_, i2_, rep in sub:
                E.append((base + i1_, base + i2_, rep))
        all_edits[k] = E
        # self check: applying E to M gives the variant
        out, last = [], 0
        for i1, i2, rep in sorted(E, key=lambda e: (e[0], e[1])):
            out.append(''.join(M[last:i1])); out.append(rep); last = i2
        out.append(''.join(M[last:]))
        assert ''.join(out) == src[k], k
    # merge ranges across variants (insertions are points; touching ranges merge)
    iv = sorted({(i1, i2) for E in all_edits.values() for i1, i2, _ in E})
    merged = []
    for a, b in iv:
        if merged and a <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], b)
        else:
            merged.append([a, b])
    # name each slot by the nearest section/landmark before it
    landmark = re.compile(r'<(?:section|header|footer|nav|main)\b[^>]*?(?:id|data-aa|aria-label)="([^"]+)"')
    def near(ti):
        text = ''.join(M[max(0, ti - 4000):ti])
        ms = landmark.findall(text)
        return re.sub(r'[^a-z0-9]+', '-', ms[-1].lower()).strip('-')[:24] if ms else 'head'
    tmpl, copy, last, counts = [], {}, 0, {}
    for a, b in merged:
        tmpl.append(''.join(M[last:a]))
        nm = near(a); counts[nm] = counts.get(nm, 0) + 1
        sid = f'{nm}.{counts[nm]}'
        entry = {'en': ''.join(M[a:b])}
        for k, E in all_edits.items():
            out, cur = [], a
            for i1, i2, rep in sorted(E, key=lambda e: (e[0], e[1])):
                if i1 >= a and i2 <= b and not (i1 == i2 == b and any(x[0] < b for x in [(i1,)]) and False):
                    if a <= i1 <= b:
                        out.append(''.join(M[cur:i1])); out.append(rep); cur = i2
            out.append(''.join(M[cur:b]))
            entry[k] = ''.join(out)
        tmpl.append('{{@' + sid + '}}')
        copy[sid] = entry
        last = b
    tmpl.append(''.join(M[last:]))
    T = ''.join(tmpl)
    # store each language/offer only when it differs from its fallback
    slim = {}
    for sid, e in copy.items():
        d = {'en': e['en'], 'fr': e['fr']}
        if e['en-bf'] != e['en']: d['en-bf'] = e['en-bf']
        if e['fr-bf'] != e['fr']: d['fr-bf'] = e['fr-bf']
        slim[sid] = d
    os.makedirs(os.path.join(ROOT, 'src'), exist_ok=True)
    open(os.path.join(ROOT, 'src', 'page.html'), 'w', encoding='utf-8').write(T)
    json.dump(slim, open(os.path.join(ROOT, 'src', 'copy.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('slots', len(slim), 'template', len(T))

main()
