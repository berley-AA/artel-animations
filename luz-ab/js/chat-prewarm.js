/* Luz pages: the chat's orb never shows its "dots fly in and form" animation (Nov 5, Berley).
   That animation lives in Felix's widget (cross-origin): it plays once, about 2.6 s, the first time the widget is seen on
   screen. We can't switch it off from here, so we let it play where nobody looks:
   - Each time the chat frame loads, if it's off screen, it's lifted for 6.5 s into the screen corner, invisible (opacity 0,
     behind the page, no clicks). The widget sees itself on screen, the orb forms there, then the frame goes back in its card.
   - If the frame is already on screen when it loads (someone lands right on the chat, or the chat reloads after it ends),
     it simply stays invisible in its card for 4.5 s and fades in, already formed.
   - Right after the page is built, the frame starts loading even if it's far down the page (it was lazy), so this usually
     happens long before the visitor scrolls there.
   The frame is never moved in the DOM (that would reload it); only a class goes on and off. */
(function () {
  var HOLD = 6500, FADE = 4500;   /* the orb starts forming once its dots are built, a moment after the frame loads, then takes 2.6 s */
  function init() {
    var f = document.getElementById('luzChat'); if (!f || f.__aaPrewarm) return; f.__aaPrewarm = 1;
    if (!document.getElementById('aaChatPrewarm')) { var st = document.createElement('style'); st.id = 'aaChatPrewarm';
    st.textContent = '#luzChat{transition:opacity .35s ease}' +
      '#luzChat.aa-pw-off{position:fixed!important;top:0!important;left:0!important;width:var(--aa-pw)!important;height:var(--aa-ph)!important;opacity:0!important;pointer-events:none!important;z-index:-1!important;transition:none!important}' +
      '#luzChat.aa-pw-in{opacity:0!important;pointer-events:none!important}' +
      /* a reveal animation on the chat card (will-change: transform) would pin a fixed frame to the card instead of the screen; it waits too */
      '.aa-pw-anc{will-change:auto!important;transform:none!important;translate:none!important;scale:none!important;rotate:none!important;filter:none!important;perspective:none!important}';
    document.head.appendChild(st); }
    var timer = 0;
    function onScreen(el) { var r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth && r.width > 0; }
    var anc = [];
    function clear() { clearTimeout(timer); f.classList.remove('aa-pw-off', 'aa-pw-in'); anc.forEach(function (e) { e.classList.remove('aa-pw-anc'); }); anc = []; }
    function warm() {
      if (document.documentElement.classList.contains('luz-fs')) return;   // the chat is open full screen: leave it alone
      clear();
      if (onScreen(f)) { f.classList.add('aa-pw-in'); timer = setTimeout(clear, FADE); return; }
      var w = f.parentElement ? f.parentElement.clientWidth : f.offsetWidth;
      f.style.setProperty('--aa-pw', Math.max(320, w) + 'px'); f.style.setProperty('--aa-ph', Math.max(480, f.offsetHeight) + 'px');
      for (var e = f.parentElement; e && e !== document.body && e !== document.documentElement; e = e.parentElement) { try { var cs = getComputedStyle(e);
        if (cs.transform !== 'none' || (cs.willChange || '').indexOf('transform') > -1 || cs.filter !== 'none' || (cs.translate && cs.translate !== 'none') || (cs.scale && cs.scale !== 'none') || cs.perspective !== 'none') { e.classList.add('aa-pw-anc'); anc.push(e); } } catch (x) {} }
      f.classList.add('aa-pw-off'); timer = setTimeout(clear, HOLD);
    }
    f.addEventListener('load', warm);
    // someone clicks into the chat while it's still hidden: show it right away
    window.addEventListener('message', function (e) { if (/artelagency\.com$/.test((e.origin || '').replace(/^https?:\/\//, '').split(':')[0]) && e.data && e.data.type === 'luz:fullscreen') clear(); });
    // start loading the (lazy) frame early, off screen, once the page has settled
    function eager() { try { if (f.getAttribute('loading') === 'lazy') f.setAttribute('loading', 'eager'); } catch (x) {} }
    setTimeout(eager, 600);
  }
  if (document.readyState !== 'loading') init(); else document.addEventListener('DOMContentLoaded', init);
  setInterval(init, 800);   // the page builds the chat after its own scripts run, and may rebuild it
})();
