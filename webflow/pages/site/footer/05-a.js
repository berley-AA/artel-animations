
(function () {
  // On the homepage, keep the #hero scroll behavior
  if (/^\/(fr-ca\/?)?$/.test(location.pathname)) return;
  var home = location.pathname.indexOf('/fr-ca') === 0 ? '/fr-ca' : '/';
  document.querySelectorAll('a').forEach(function (a) {
    var href = a.getAttribute('href') || '';
    var isLogo = a.querySelector('img[alt*="Artel"]');   // your logo <img> alt is "Artel Agency"
    if (isLogo || href.indexOf('#hero') !== -1) a.setAttribute('href', home);
  });
})();
