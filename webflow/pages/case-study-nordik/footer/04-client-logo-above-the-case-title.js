
(function(){
  if(!/[?&]old\b/.test(location.search)) document.body.classList.add('cs-flow');
  var CLIENT={src:'https://cdn.prod.website-files.com/68bf9e7489e7a893477eea27/6a2af35d6a106878e6990c32_Nordik.svg',alt:'Nordik Recovery logo'};
  var ICONS='https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/';
  var path=location.pathname.replace('-v2','');
  var url='https://artelagency.com'+path;
  var T={
    en:{label:'Summarize with',prompt:'Summarize this case study and pull out the key results: '},
    fr:{label:'Résumer avec',prompt:'Résume cette étude de cas et fais ressortir les résultats clés : '}
  };
  var AI=[
    ['ChatGPT','https://chatgpt.com/?q=','openai'],
    ['Claude','https://claude.ai/new?q=','claude-color'],
    ['Perplexity','https://www.perplexity.ai/search/new?q=','perplexity-color'],
    ['Google AI','https://www.google.com/search?udm=50&q=','google-color'],
    ['Grok','https://grok.com/?q=','grok']
  ];
  [].forEach.call(document.querySelectorAll('.cs-container'),function(c){
    var head=c.querySelector('.cs-header');
    if(head&&!head.querySelector('.cs-client')){
      var w=document.createElement('div');w.className='cs-client';
      var im=document.createElement('img');im.src=CLIENT.src;im.alt=CLIENT.alt;im.loading='lazy';
      w.appendChild(im);head.insertBefore(w,head.firstChild);
    }
    var by=c.querySelector('.cs-byline');
    if(!by||c.querySelector('.cs-ai')) return;
    var t=T[c.getAttribute('data-lang')]||T.en;
    var q=encodeURIComponent(t.prompt+url);
    var row=document.createElement('div');
    row.className='cs-ai';
    var l=document.createElement('span');
    l.className='cs-ai-l';
    l.textContent=t.label;
    row.appendChild(l);
    AI.forEach(function(a){
      var e=document.createElement('a');
      e.href=a[1]+q;
      e.target='_blank';
      e.rel='noopener';
      var ic=document.createElement('img');
      ic.src=ICONS+a[2]+'.svg';
      ic.alt='';ic.width=16;ic.height=16;
      e.appendChild(ic);
      e.appendChild(document.createTextNode(a[0]));
      row.appendChild(e);
    });
    by.parentNode.insertBefore(row,by.nextSibling);
  });
})();
