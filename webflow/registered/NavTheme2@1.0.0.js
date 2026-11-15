(function(){
function nav(){return document.querySelector('.navbar')||document.querySelector('.w-nav');}
function lum(p){return 0.2126*p[0]+0.7152*p[1]+0.0722*p[2];}
function isDark(s){if(!s)return false;if(s.id==='hero'||s.querySelector('.hero-plaza-bg'))return true;var b=getComputedStyle(s).backgroundColor,m=b.match(/rgba?\(([^)]+)\)/);if(!m)return false;var p=m[1].split(',').map(Number),a=p[3]===undefined?1:p[3];return a>=0.3&&lum(p)<110;}
function darkBehind(){var n=nav();if(!n)return null;var y=n.getBoundingClientRect().height/2,S=document.querySelectorAll('section, .section'),C=[],best=null,bt=-1e9;for(var i=0;i<S.length;i++){var r=S[i].getBoundingClientRect();if(r.height<40)continue;if(r.top<=y&&r.bottom>y)C.push(S[i]);if(r.top<=y&&r.top>bt){bt=r.top;best=S[i];}}var P=C.length?C:(best?[best]:[]);if(!P.length)return null;for(var j=0;j<P.length;j++)if(isDark(P[j]))return true;return false;}
var last;
function upd(){var n=nav();if(!n)return;var d=darkBehind();if(d===null||d===last)return;last=d;n.classList.toggle('aa-nav-dark',d);n.classList.toggle('aa-nav-light',!d);}
var raf;function os(){if(raf)return;raf=requestAnimationFrame(function(){raf=0;upd();});}
['scroll','wheel','touchmove','resize'].forEach(function(e){addEventListener(e,os,{passive:true});});
document.addEventListener('scroll',os,{passive:true,capture:true});
setInterval(upd,150);
if(!document.getElementById('aaNavTheme')){var st=document.createElement('style');st.id='aaNavTheme';st.textContent='.navbar a,.navbar .w-nav-link{transition:color .35s ease}.navbar .w-nav-brand img,.navbar img{transition:filter .35s ease}.navbar .w-icon-nav-menu,.navbar .w-nav-button{transition:color .35s ease}html body .navbar.aa-nav-dark a,html body .navbar.aa-nav-dark .w-nav-link{color:#fff!important}html body .navbar.aa-nav-dark .w-nav-brand img,html body .navbar.aa-nav-dark img{filter:brightness(0) invert(1)!important}html body .navbar.aa-nav-dark .w-nav-button,html body .navbar.aa-nav-dark .w-icon-nav-menu{color:#fff!important}html body .navbar.aa-nav-light a,html body .navbar.aa-nav-light .w-nav-link{color:#141414!important}html body .navbar.aa-nav-light .w-nav-brand img,html body .navbar.aa-nav-light img{filter:none!important}html body .navbar.aa-nav-light .w-nav-button,html body .navbar.aa-nav-light .w-icon-nav-menu{color:#141414!important}';document.head.appendChild(st);}
function start(){upd();setTimeout(upd,500);setTimeout(upd,1500);}
if(document.readyState!=='loading')start();else document.addEventListener('DOMContentLoaded',start);
})();