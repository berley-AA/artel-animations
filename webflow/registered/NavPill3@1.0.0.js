(function(){
if(document.getElementById('aaNavPill'))return;
var s=document.createElement('style');s.id='aaNavPill';
s.textContent='@media(max-width:991px){html body .navbar{transition:left .35s ease,right .35s ease,top .35s ease,border-radius .35s ease,background .3s ease!important}html body .navbar.frosted{left:8px!important;right:8px!important;top:6px!important;width:auto!important;border-radius:100px!important;box-shadow:0 10px 34px rgba(0,0,0,.16)!important;border:1px solid rgba(255,255,255,.28)!important;-webkit-backdrop-filter:blur(22px) saturate(1.6)!important;backdrop-filter:blur(22px) saturate(1.6)!important}}';
document.head.appendChild(s);
})();