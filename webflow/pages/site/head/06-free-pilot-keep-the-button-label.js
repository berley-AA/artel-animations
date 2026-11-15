
/* FREE PILOT — keep the button label (the locale engine rewrites any link to
   #cta-chatbot into "Book my discovery call"), and localize it on /fr-ca. */
(function(){
  var FR=/^\/fr-ca(\/|$)/.test(location.pathname);
  function fix(){
    var b=document.querySelector('.fp-btn');
    if(b) b.textContent = FR ? 'Réserver mon pilote gratuit' : 'Claim my free pilot';
  }
  if(document.readyState!=='loading'){ setTimeout(fix,900); } else { document.addEventListener('DOMContentLoaded', function(){ setTimeout(fix,900); }); }
  window.addEventListener('load', function(){ setTimeout(fix,1200); setTimeout(fix,2500); });
})();
