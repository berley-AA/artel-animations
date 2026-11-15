(function(){function go(){var s=document.getElementById('aa-results'),fr=s&&s.querySelector('.rs-track .lw-frame');if(!fr)return;var rows=[].slice.call(s.querySelectorAll('.lw-row')),ph=matchMedia('(max-width:767px)'),tc=matchMedia('(hover:none)').matches,cur=null,lk=0,px=-1,py=-1,wh=0,ct=0,vb=/[?&]w=b\b/i.test(location.search),F=/^\/fr-ca/.test(location.pathname);
function set(r){if(r===cur)return;rows.forEach(function(x){var o=x===r;x.classList.toggle('open',o);x.classList.toggle('cur',o)});fr.classList.toggle('has-cur',!!r);cur=r;lk=Date.now()+(vb?650:450)}
function ev(){if(tc||ph.matches||px<0)return;if(Date.now()<lk){setTimeout(ev,lk-Date.now()+20);return}var r=at();if(r){if(!vb)set(r);else{clearTimeout(ct);ct=setTimeout(function(){if(at()===r)set(r)},90)}}}
function at(){var e=document.elementFromPoint(px,py);return e&&e.closest?e.closest('#aa-results .lw-row'):null}
document.addEventListener('mousemove',function(e){if(e.clientX===px&&e.clientY===py)return;px=e.clientX;py=e.clientY;ev()},{passive:true});
addEventListener('wheel',function(){wh=Date.now()},{passive:true});
addEventListener('scroll',function(){if(Date.now()-wh<700)ev()},{passive:true});
fr.addEventListener('mouseleave',function(){if(!tc&&!ph.matches)set(null)});
rows.forEach(function(r){r.addEventListener('click',function(e){if(ph.matches&&e.target.closest('.lw-slides')&&window.__rsLb){window.__rsLb(r);return}var h=r.getAttribute('data-href');if(h)location.href=(F&&h.charAt(0)=='/'&&h.indexOf('/fr-ca')!==0?'/fr-ca':'')+h})})}
if(document.readyState!=='loading')go();else document.addEventListener('DOMContentLoaded',go)})();
(function(){var s=document.createElement('style');s.textContent='html body #aa-loop>.hero-section{max-width:none!important;width:100%!important;margin-left:0!important;margin-right:0!important}';document.head.appendChild(s)})();