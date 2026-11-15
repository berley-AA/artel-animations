
(function(){
  var m=(location.search+location.hash).match(/[?&#]v=([a-f])\b/i); var v=m?m[1].toLowerCase():null;
  try{ if(v){ sessionStorage.setItem('aav',v); sessionStorage.removeItem('aav-off'); } else if(/[?&#]v=(0|off|control)\b/i.test(location.search+location.hash)){ sessionStorage.removeItem('aav'); sessionStorage.setItem('aav-off','1'); } else v=sessionStorage.getItem('aav'); }catch(e){}
  if(!v){ try{ if(sessionStorage.getItem('aav-off')) return; }catch(e){} v='f'; }   /* default on staging: f */
  document.documentElement.setAttribute('data-aav',v);
  /* group the right-hand actions so the grid can place them as one block */
  function wrap(sel, kids){
    var host=document.querySelector(sel); if(!host||host.querySelector('.aa-actions')) return;
    var box=document.createElement('div'); box.className='aa-actions';
    var first=null; kids.forEach(function(k){ var el=host.querySelector(k); if(el){ if(!first) first=el; box.appendChild(el);} });
    if(first!==null||box.children.length) host.appendChild(box);
  }
  function go(){ wrap('#free-pilot .fp-inner',['.fp-cta-row','.fp-fine']); wrap('#air-intro',['.air-consent','#air-start','.air-meta']); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',go); else go();
  setTimeout(go,1500); setTimeout(go,4000);
})();
