// Builds the French Luz pages from the English ones: luz.html -> luz-fr.html, luz-bf.html -> luz-bf-fr.html.
// Run from luz-ab/: node i18n/build-fr.mjs   (prints every English string it could not find in fr.json)
// The form answers stay English under the hood (fit logic + dashboard); only their labels show in French.
import fs from 'fs';
import { scripts, literals } from './strings.mjs';
const M = JSON.parse(fs.readFileSync(new URL('./fr.json', import.meta.url), 'utf8'));
const LINKS = { '/labs': '/fr-ca/labs', '/faq': '/fr-ca/faq', '/': '/fr-ca', '/#team': '/fr-ca#team', '/#selected-work': '/fr-ca#selected-work',
  '/#process': '/fr-ca#process', '/#free-pilot': '/fr-ca#free-pilot', '/privacy-policy': '/fr-ca/privacy-policy', '/terms-of-services': '/fr-ca/terms-of-services' };
const opt = (s, a, b) => s.split(a).join(b);   // form-only steps: the form was removed Nov 5 (Felix moved qualifying into the chat)
const once = (s, a, b, what) => { const n = s.split(a).length - 1; if (n !== 1) throw new Error(what + ': expected 1 match, got ' + n); return s.replace(a, b); };
const quote = (v, q) => q === '`' ? '`' + v.replace(/[`\\]|\$\{/g, (m) => '\\' + m) + '`' : q + v.replace(/\\/g, '\\\\').replace(new RegExp(q, 'g'), '\\' + q).replace(/\n/g, '\\n') + q;

function build(src, out, enPath) {
  let h = fs.readFileSync(src, 'utf8'); const missing = new Set();
  // 1. JS string literals (display strings only, from the js whitelist), by exact position, last first
  const reps = [];
  for (const sc of scripts(h)) { const r = literals(sc.code); if (r.err) throw new Error(src + ' parse: ' + r.err);
    for (const l of r.lits) { if (l.tpl) continue; if (Object.prototype.hasOwnProperty.call(M.js, l.v)) reps.push({ s: sc.start + l.s, e: sc.start + l.e, t: quote(M.js[l.v], l.raw[0]) }); } }
  reps.sort((a, b) => b.s - a.s).forEach((r) => { h = h.slice(0, r.s) + r.t + h.slice(r.e); });
  // 2. the form: French labels over English values
  h = once(h, 'const QS = [', 'const __FRQS = ' + JSON.stringify(M.qs) + ';\nconst QS = [', 'QS');
  h = h.replace(/(const QS = \[[\s\S]*?\n\];)/, '$1\nQS.forEach((s, i) => { const f = __FRQS[i]; if (f) { s.fr = f.fr; s.ofr = f.ofr; } });');
  h = once(h, '({ q: s.q,', '({ q: (s.fr || s.q),', 'qSteps q');
  h = once(h, 'return { t, on:', 'return { t, l: (s.ofr && s.ofr[s.o.indexOf(t)]) || t, on:', 'qSteps label');
  h = opt(h, '{{o.t}}', '{{o.l}}');
  h = opt(h, 'name="lang" value="en" checked=""', 'name="lang" value="en"');
  h = opt(h, 'name="lang" value="fr"> Français</label>', 'name="lang" value="fr" checked=""> français</label>');
  // 3. the page itself
  h = once(h, '<html lang="en">', '<html lang="fr-CA">', 'lang');
  h = once(h, '<a href="' + '/fr-ca' + enPath + '">Français</a>', '<a href="' + enPath + '">English</a>', 'menu language link');
  h = h.replace(/href="(\/[^"]*|\/)"/g, (m, p) => (LINKS[p] ? 'href="' + LINKS[p] + '"' : m));
  // 3b. nav labels that roll letter by letter: rebuild the letter spans for the French word
  const esc = (c) => (c === '&' ? '&amp;' : c === '<' ? '&lt;' : c);
  h = h.replace(/(<a\b([^>]*)>)((?:<span class="aaf-l"[\s\S]*?<\/span><\/span><\/span>)+)(<\/a>)/g, (m, open, attrs, spans, close) => {
    if (!/class="[^"]*\baaf-roll\b/.test(attrs)) return m; const label = (attrs.match(/aria-label="([^"]*)"/) || [])[1]; const fr = M.text[label]; if (fr === undefined) return m;
    const step = (spans.match(/transition-delay: ([\d.]+)s;[\s\S]*?transition-delay: ([\d.]+)s;/) || [0, 0, 0.03]); const d = (+step[2] - +step[1]) || 0.03;
    return open + [...fr].map((c, i) => '<span class="aaf-l" aria-hidden="true"><span class="aaf-lc" style="transition-delay: ' + (i * d).toFixed(3) + 's;"><span class="aaf-lt">' + esc(c) + '</span><span class="aaf-lt aaf-lt2">' + esc(c) + '</span></span></span>').join('') + close; });
  // 4. visible text and attributes, outside <script>/<style>
  const parts = h.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>)/);
  for (let i = 0; i < parts.length; i += 2) {
    parts[i] = parts[i].replace(/>([^<>]+)</g, (m, t) => { const k = t.trim(); if (!k || !/[A-Za-z]{2}/.test(k)) return m; if (M.text[k] !== undefined) return '>' + t.replace(k, M.text[k]) + '<'; if (!/^\{\{[^}]*\}\}$/.test(k)) missing.add(k); return m; })
      .replace(/\b(alt|aria-label|placeholder|title|content)="([^"]*)"/g, (m, a, v) => { if (M.text[v] !== undefined) return a + '="' + M.text[v] + '"'; if (a !== 'content' && /[A-Za-z]{2}/.test(v) && !/^\{\{/.test(v)) missing.add(v); return m; });
  }
  h = parts.join('');
  fs.writeFileSync(out, h);
  return [...missing];
}
const keep = new Set(['Luz', 'FAQ', 'Montreal Weights', 'Nordik Recovery', 'I.C. Production', 'Department Maison de Création', 'Julien Méthot', 'Justin T. Frankeur', 'Raphaël Caron', 'Paul Barbin',
  '© 2026 Artel Agency', 'Artel', 'Menu', 'LinkedIn', 'min', '1. Montreal Weights.', '2. Nordik Recovery.']);
for (const [src, out, p] of [['luz.html', 'luz-fr.html', '/luz'], ['luz-bf.html', 'luz-bf-fr.html', '/black-friday']]) {
  const miss = build(src, out, p).filter((x) => !keep.has(x));
  console.log(out, miss.length ? 'NOT TRANSLATED: ' + JSON.stringify(miss) : 'all text translated');
}
