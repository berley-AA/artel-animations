
/* HERO A GRID v2: text starts under the ARTEL logo, photo runs from under "The Lab" to under "Login". Measured from the nav, then applied to every hero copy relative to its own left edge, so the end-of-page loop card is an exact scaled copy of the hero. */
(function(){var M=null;function tx(a){var s=a.querySelectorAll('.aa-l-t1');return s.length?[].map.call(s,function(x){return x.textContent}).join(''):a.textContent}
function ol(e){var x=0;while(e){x+=e.offsetLeft;e=e.offsetParent}return x}
function vis(e){return e&&e.offsetWidth>0}
function measure(){var nb=document.querySelector('.navbar');if(!nb)return;var L=[].filter.call(nb.querySelectorAll('a'),vis);var lab=L.filter(function(a){return /the\s*lab/i.test(tx(a))})[0],lg=L.filter(function(a){return /login/i.test(tx(a))})[0];var br=[].filter.call(nb.querySelectorAll('.w-nav-brand img'),vis)[0]||nb.querySelector('.w-nav-brand');if(!lab||!vis(br))return;var bl=br.getBoundingClientRect().left;if(bl<=0)return;M={bl:bl,ll:lab.getBoundingClientRect().left,lr:lg?lg.getBoundingClientRect().right:document.documentElement.clientWidth-40}}
function apply(){if(!M||innerWidth<992)return;[].forEach.call(document.querySelectorAll('section.nx-d'),function(s){var x=ol(s);s.style.setProperty('--nl',Math.round(M.bl-x)+'px');s.style.setProperty('--lab',Math.round(M.ll-x)+'px');s.style.setProperty('--nr',Math.round(x+s.offsetWidth-M.lr)+'px')})}
function al(){measure();apply()}
function arm(){al();[600,1500,3500,6000].forEach(function(t){setTimeout(al,t)})}
if(document.readyState!=='loading')arm();else document.addEventListener('DOMContentLoaded',arm);
addEventListener('resize',function(){M=null;setTimeout(al,150);setTimeout(al,800)},{passive:true});
var wn=0;(function watch(){var l=document.getElementById('aa-loop');if(!l){if(++wn<80)setTimeout(watch,150);return}new MutationObserver(function(){if(!M)measure();apply()}).observe(l,{childList:true})})();})();
