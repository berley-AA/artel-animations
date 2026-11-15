/* Nov 10 (Berley: the page sticks at sections). On computers the chat is a separate page inside ours, and it used to catch the scroll wheel: with the mouse resting over it, the page stopped dead. Now the chat only takes the mouse once the mouse moves over it, and lets go when the mouse leaves, so the page scrolls straight past it. Phones and tablets are unchanged. */
(function(){try{if(!matchMedia('(hover:hover) and (pointer:fine)').matches)return;}catch(e){return;}
var H=document.documentElement,st=document.createElement('style');st.textContent='html.aa-chatpass #luzChat{pointer-events:none!important}';(document.head||H).appendChild(st);H.classList.add('aa-chatpass');
function over(e){var t=e.target;return !!(t&&t.closest&&t.closest('#ask'));}
function sync(e){H.classList.toggle('aa-chatpass',!over(e));}
document.addEventListener('pointermove',sync,{passive:true});document.addEventListener('pointerdown',sync,{passive:true});})();