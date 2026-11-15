
/* FREE PILOT CTA (A): hero "Get my AIQ" becomes "Get my free pilot" and goes to the Free pilot section. AIQ section hidden for now. */
(function(){var FR=/^\/fr-ca(\/|$)/.test(location.pathname),T=FR?'Obtenez mon projet pilote gratuit':'Get my free pilot';
function sw(){[].forEach.call(document.querySelectorAll('#hero a[href*="ai-readiness"], #hero a.aa-fp'),function(a){a.classList.add('aa-fp');a.setAttribute('href','#free-pilot');if(a.textContent!==T)a.textContent=T})}
sw();[300,800,1500,3000,6000].forEach(function(t){setTimeout(sw,t)});})();
