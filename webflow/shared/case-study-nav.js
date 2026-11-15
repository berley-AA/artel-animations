
(function(){
  var navbar=document.querySelector('#nav-bar-secondary');
  if(!navbar) return;
  var navHideTimer=null,lastScrollY=window.scrollY,isPastThreshold=false,SCROLL_THRESHOLD=100;
  var hoverZone=document.createElement('div');
  hoverZone.style.cssText='position:fixed;top:0;left:0;right:0;height:30px;z-index:1000;pointer-events:all;';
  document.body.appendChild(hoverZone);
  function hideNavbar(){navbar.classList.add('hidden-nav');navbar.classList.remove('visible');}
  function showNavbar(){navbar.classList.remove('hidden-nav');navbar.classList.add('visible');navbar.classList.add('frosted');clearTimeout(navHideTimer);navHideTimer=setTimeout(function(){if(isPastThreshold)hideNavbar();},8000);}
  navbar.addEventListener('mouseenter',function(){clearTimeout(navHideTimer);});
  navbar.addEventListener('mouseleave',function(){if(isPastThreshold){navHideTimer=setTimeout(hideNavbar,8000);}});
  hoverZone.addEventListener('mouseenter',function(){if(isPastThreshold)showNavbar();});
  window.addEventListener('scroll',function(){
    var y=window.scrollY;
    if(y>10){navbar.classList.add('frosted');}else{navbar.classList.remove('frosted');}
    if(y>SCROLL_THRESHOLD&&!isPastThreshold){isPastThreshold=true;hideNavbar();}
    else if(y<=SCROLL_THRESHOLD&&isPastThreshold){isPastThreshold=false;clearTimeout(navHideTimer);showNavbar();clearTimeout(navHideTimer);}
    if(y<lastScrollY&&isPastThreshold){showNavbar();}
    lastScrollY=y;
  },{passive:true});
})();
