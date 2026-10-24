/* dcrt: a tiny runtime for the design-canvas pages, so they run as plain web pages.
   Template: <template id="dc-tpl"> with {{path}} bindings, <sc-for list as>, <sc-if value>, onClick/onSubmit handlers. */
(function () {
  function get(scope, path) {
    const parts = path.trim().split('.'); let v = scope;
    for (const p of parts) { if (v == null) return undefined; v = v[p]; }
    return v;
  }
  const RX = /\{\{([^}]+)\}\}/g;
  function interp(str, scope) {
    if (!str.includes('{{')) return str;
    const m = str.match(/^\{\{([^}]+)\}\}$/);
    if (m) { const v = get(scope, m[1]); return v == null ? '' : v; }
    return str.replace(RX, (_, p) => { const v = get(scope, p); return v == null ? '' : String(v); });
  }
  function sig(v) { try { return JSON.stringify(v, (k, x) => (typeof x === 'function' ? 0 : x)); } catch (e) { return Math.random(); } }
  const EVENTS = { onclick: 'click', onsubmit: 'submit', oninput: 'input', onchange: 'change' };

  // build(node) returns { nodes: [...], update(scope) }
  function build(src) {
    if (src.nodeType === 3) {
      const t = src.nodeValue; const n = document.createTextNode('');
      if (!t.includes('{{')) { n.nodeValue = t; return { nodes: [n], update() {} }; }
      let last = null; return { nodes: [n], update(s) { const v = String(interp(t, s)); if (v !== last) { n.nodeValue = v; last = v; } } };
    }
    if (src.nodeType !== 1) return { nodes: [], update() {} };
    const tag = src.tagName.toLowerCase();
    if (tag === 'sc-for') return buildFor(src);
    if (tag === 'sc-if') return buildIf(src);
    const el = document.createElementNS(src.namespaceURI, src.tagName.toLowerCase() === src.tagName ? src.tagName : (src.namespaceURI === 'http://www.w3.org/1999/xhtml' ? tag : src.tagName));
    const ups = []; let curScope = null;
    for (const a of Array.from(src.attributes)) {
      const name = a.name, val = a.value;
      if (name.startsWith('hint-placeholder')) continue;
      if (EVENTS[name]) {
        const path = (val.match(/^\{\{([^}]+)\}\}$/) || [])[1];
        if (path) el.addEventListener(EVENTS[name], (e) => { const f = get(curScope, path); if (typeof f === 'function') f(e); });
        continue;
      }
      if (!val.includes('{{')) { el.setAttribute(name, val); if (tag === 'video' && name === 'muted') el.muted = true; continue; }
      let last = null;
      ups.push((s) => { const v = interp(val, s); const sv = v === false || v == null ? null : String(v);
        if (sv === last) return; last = sv; if (sv === null) el.removeAttribute(name); else el.setAttribute(name, sv); });
    }
    const kids = [];
    const srcKids = tag === 'template' ? src.content.childNodes : src.childNodes;
    for (const c of Array.from(srcKids)) { const b = build(c); b.nodes.forEach((n) => el.appendChild(n)); kids.push(b); }
    return { nodes: [el], update(s) { curScope = s; ups.forEach((u) => u(s)); kids.forEach((k) => k.update(s)); } };
  }
  function buildChildren(src) { return Array.from(src.childNodes).map(build); }
  function buildFor(src) {
    const listPath = (src.getAttribute('list').match(/\{\{([^}]+)\}\}/) || [])[1]; const as = src.getAttribute('as') || 'item';
    const start = document.createComment('for'), end = document.createComment('/for');
    let inst = [], lastSig = null;
    return { nodes: [start, end], update(s) {
      const list = get(s, listPath) || []; const sg = sig(list);
      if (sg !== lastSig) {
        inst.forEach((i) => i.forEach((b) => b.nodes.forEach((n) => n.remove())));
        inst = list.map(() => buildChildren(src));
        const frag = document.createDocumentFragment(); inst.forEach((i) => i.forEach((b) => b.nodes.forEach((n) => frag.appendChild(n))));
        end.parentNode.insertBefore(frag, end); lastSig = sg;
      }
      list.forEach((item, i) => { const sc = Object.create(s); sc[as] = item; inst[i].forEach((b) => b.update(sc)); });
    } };
  }
  function buildIf(src) {
    const path = (src.getAttribute('value').match(/\{\{([^}]+)\}\}/) || [])[1];
    const start = document.createComment('if'), end = document.createComment('/if'); let kids = null;
    return { nodes: [start, end], update(s) {
      const on = !!get(s, path);
      if (on && !kids) { kids = buildChildren(src); const f = document.createDocumentFragment(); kids.forEach((b) => b.nodes.forEach((n) => f.appendChild(n))); end.parentNode.insertBefore(f, end); }
      if (!on && kids) { kids.forEach((b) => b.nodes.forEach((n) => n.remove())); kids = null; }
      if (kids) kids.forEach((b) => b.update(s));
    } };
  }

  class DCLogic {
    constructor(props) { this.props = props || {}; this.state = {}; }
    setState(p) { Object.assign(this.state, typeof p === 'function' ? p(this.state) : p); if (this.__render) this.__render(); }
  }
  window.DCLogic = DCLogic;
  window.dcBoot = function (Component, props, mountEl) {
    const tpl = document.getElementById('dc-tpl');
    const comp = new Component(props);
    const roots = Array.from(tpl.content.childNodes).map(build);
    roots.forEach((b) => b.nodes.forEach((n) => mountEl.appendChild(n)));
    let queued = false;
    const draw = () => { queued = false; const vals = comp.renderVals(); roots.forEach((b) => b.update(vals)); };
    comp.__render = () => { if (!queued) { queued = true; Promise.resolve().then(draw); } };
    draw();
    if (comp.componentDidMount) comp.componentDidMount();
    window.__dc = comp;
  };
})();
