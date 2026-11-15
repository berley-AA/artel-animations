
  // =====================
  // NAVBAR BEHAVIOR (standalone — no hero dependency)
  // =====================
  const navbar = document.querySelector('#nav-bar-secondary');
  let navHideTimer = null;
  let lastScrollY = window.scrollY;
  let isPastThreshold = false;
  const SCROLL_THRESHOLD = 100; // px before navbar starts hiding

  // Hover zone at top of screen
  const hoverZone = document.createElement('div');
  hoverZone.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    z-index: 1000;
    pointer-events: all;
  `;
  document.body.appendChild(hoverZone);

  function showNavbar() {
    if (!navbar) return;
    navbar.classList.remove('hidden-nav');
    navbar.classList.add('visible');
    navbar.classList.add('frosted');
    clearTimeout(navHideTimer);
    navHideTimer = setTimeout(() => {
      if (isPastThreshold) hideNavbar();
    }, 8000);
  }

  function hideNavbar() {
    if (!navbar) return;
    navbar.classList.add('hidden-nav');
    navbar.classList.remove('visible');
  }

  // Navbar hover keeps it visible
  if (navbar) {
    navbar.addEventListener('mouseenter', () => {
      clearTimeout(navHideTimer);
    });
    navbar.addEventListener('mouseleave', () => {
      if (isPastThreshold) {
        navHideTimer = setTimeout(() => {
          hideNavbar();
        }, 8000);
      }
    });
  }

  // Top hover zone triggers show
  hoverZone.addEventListener('mouseenter', () => {
    if (isPastThreshold) showNavbar();
  });

  // Scroll logic
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Frost effect
    if (navbar) {
      if (currentScrollY > 10) {
        navbar.classList.add('frosted');
      } else {
        navbar.classList.remove('frosted');
      }
    }

    // Past threshold — start hide behavior
    if (currentScrollY > SCROLL_THRESHOLD && !isPastThreshold) {
      isPastThreshold = true;
      hideNavbar();
    } else if (currentScrollY <= SCROLL_THRESHOLD && isPastThreshold) {
      isPastThreshold = false;
      clearTimeout(navHideTimer);
      showNavbar();
      clearTimeout(navHideTimer);
    }

    // Scroll up detection — show navbar
    if (currentScrollY < lastScrollY && isPastThreshold) {
      showNavbar();
    }

    lastScrollY = currentScrollY;
  });
