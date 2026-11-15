
(function(){
  var FR=/^\/fr-ca(\/|$)/.test(location.pathname);
  var P=FR?["La","technologie","devrait","porter","le","travail,","pas","le","travailleur.","Nous","bâtissons","pour","les","gens","derrière","chaque","entreprise,","pour","qu'ils","puissent","faire","plus,","et","être","plus."]
          :"Technology should carry the work, not the worker. We build for the people behind every business, so they can do more, and be more.".split(' ');
  var G=FR?["On ne","remplace","pas,","on","amplifie."]:null;
  function fill(host,arr){
    if(!host)return;
    var first=host.querySelector('.amx-w'); if(!first)return;
    for(var i=0;i<arr.length;i++){
      if(!host.querySelectorAll('.amx-w')[i]){
        var ns=first.cloneNode(true); ns.className='amx-w';
        host.appendChild(document.createTextNode(' ')); host.appendChild(ns);
      }
      host.querySelectorAll('.amx-w')[i].textContent=arr[i];
    }
    var all=host.querySelectorAll('.amx-w');
    for(var k=arr.length;k<all.length;k++){ if(all[k].parentNode) all[k].parentNode.removeChild(all[k]); }
  }
  var tries=0;
  var iv=setInterval(function(){
    var t=document.querySelector('#artel-mission .amx-t');
    if(t && t.querySelectorAll('.amx-w').length){
      if(!t.__aaSwapped){
        t.__aaSwapped=1;
        fill(t,P);
        if(G) fill(document.querySelector('#artel-mission .amx-g'),G);
      }
      clearInterval(iv);
    } else if(++tries>80){ clearInterval(iv); }
  },150);
})();
