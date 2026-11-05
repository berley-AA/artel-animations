/* Homepage Luz full-screen fix (Nov 5, Berley: the chat must take over the whole screen on every page).
   The #cta-chatbot embed already makes the chat full screen when Luz posts luz:fullscreen (body.luz-fs).
   Two things broke it on desktop:
   1. The "LUZ FIT" footer script scales the frame (82%) and re-applies that scale every time the frame's style changes.
      While the chat is open we take the section out of LUZ FIT's reach (it only targets #cta-chatbot.nx-moved)
      and clear the frame's scale. Both come back when the chat closes, and LUZ FIT re-fits the in-page window.
   2. A wrapper above the frame was mid-transition, so its transform still trapped position:fixed (the chat drew offset).
      While open, transitions on the frame's wrappers are off; their own values come back on close.
   3. On phones #cta-chatbot and #aa-results both sit at z-index 1, and Results comes later, so it painted over the
      full-screen chat (Berley's phone, Nov 5). While open, the frame's wrappers go to the top layer; their own values come back on close.
   Loaded by the site script ArtelFooterClearTap3. The embed itself is untouched. */
!function () {
  var b = document.body; if (!b || !document.getElementById('aa-chat-iframe')) return;
  var on = 0, sv = [];
  function sync() {
    var s = document.getElementById('cta-chatbot'), f = document.getElementById('aa-chat-iframe'); if (!s || !f) return;
    var fs = b.classList.contains('luz-fs');
    if (fs && !on) {
      on = 1; s.__nx = s.classList.contains('nx-moved'); s.classList.remove('nx-moved');
      f.style.setProperty('transform', 'none', 'important');
      for (var e = f.parentElement; e && e !== b; e = e.parentElement) {
        sv.push([e, e.style.getPropertyValue('transition'), e.style.getPropertyPriority('transition'), e.style.getPropertyValue('z-index'), e.style.getPropertyPriority('z-index')]);
        e.style.setProperty('transition', 'none', 'important'); e.style.setProperty('z-index', '2147483647', 'important');
      }
    } else if (!fs && on) {
      on = 0; if (s.__nx) s.classList.add('nx-moved');
      sv.forEach(function (a) { if (a[1]) a[0].style.setProperty('transition', a[1], a[2]); else a[0].style.removeProperty('transition'); if (a[3]) a[0].style.setProperty('z-index', a[3], a[4]); else a[0].style.removeProperty('z-index'); });
      sv = [];
    }
  }
  new MutationObserver(sync).observe(b, { attributes: true, attributeFilter: ['class'] });
  sync();
}();
