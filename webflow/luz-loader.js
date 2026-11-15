/* ArtelLuzLoader: the only script on /luz and /black-friday (EN and /fr-ca).
   Replaces the Webflow page with the Luz page built from luz-ab/src, pinned to one commit.
   Deploy: put the commit in COMMIT, update the registered script ArtelLuzLoader to a new version,
   set that version on both pages, publish staging, check, then publish live. */
(function(){if(!/(\.webflow\.io|artelagency\.com)$/.test(location.hostname))return;var COMMIT='{{COMMIT}}';var B='https://cdn.jsdelivr.net/gh/berley-AA/artel-animations@'+COMMIT+'/luz-ab/';var p=location.pathname,fr=/^\/fr-ca(\/|$)/.test(p);var F=(/\/black-friday\/?$/.test(p)?'luz-bf':'luz')+(fr?'-fr':'')+'.html';var d=document.documentElement;d.style.visibility='hidden';fetch(B+F).then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(t){t=t.replace(/([\"'(=])(js|assets)\//g,'$1'+B+'$2/');document.open();document.write(t);document.close()}).catch(function(){d.style.visibility=''})})();
