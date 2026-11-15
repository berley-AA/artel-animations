
(function(){
  function track(n,p){ try{ if(typeof gtag==='function'){ gtag('event',n,p||{}); } else if(window.dataLayer){ window.dataLayer.push(Object.assign({event:n},p||{})); } }catch(e){} }
  document.addEventListener('click', function(e){
    var el = e.target && e.target.closest ? e.target.closest('a, button, .git-btn, .air-btn') : null;
    if(!el) return;
    var href = (el.getAttribute && el.getAttribute('href')) || '';
    var txt  = (el.textContent || '').trim().toLowerCase();
    var loc  = location.pathname;
    if(/talk to us|parlez-nous/.test(txt)){
      track('contact_click', { location: loc });
    } else if(/cta-chatbot/.test(href) || /book my discovery call|réservez mon appel/.test(txt)){
      track('book_call_click', { location: loc });
    } else if(/ai-readiness/.test(href) || /get my aiq|obtenez mon aiq/.test(txt)){
      track('aiq_cta_click', { location: loc });
    }
  }, true);
})();
