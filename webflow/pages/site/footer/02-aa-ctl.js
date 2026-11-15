
(function(){
  function build(){
    if(document.querySelector('.aa-ctl')) return;
    var path=location.pathname, isFR=/^\/fr-ca(\/|$)/.test(path);
    var base=isFR?(path.replace(/^\/fr-ca/,'')||'/'):path;
    var en=base, fr='/fr-ca'+(base==='/'?'':base);
    var box=document.createElement('div'); box.className='aa-ctl';
    box.innerHTML='<a href="'+en+'" class="'+(isFR?'':'on')+'">EN</a>'+
                  '<a href="'+fr+'" class="'+(isFR?'on':'')+'">FR</a>';
    document.body.appendChild(box);
  }
  document.readyState!='loading'?build():document.addEventListener('DOMContentLoaded',build);
})();
