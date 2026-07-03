document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('mobile-nav');
    const overlay = document.getElementById('mobile-nav-overlay');
  
    if (hamburger && navLinks) {
  
        const closeMenu = () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            if (overlay) overlay.classList.remove('active');
        };
  
        const openMenu = () => {
            navLinks.classList.add('active');
            hamburger.classList.add('open');
            hamburger.setAttribute('aria-expanded', 'true');
            if (overlay) overlay.classList.add('active');
        };
  
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
  
            const isOpen = hamburger.classList.contains('open');
            isOpen ? closeMenu() : openMenu();
        });
  
        // Close dropdown when clicking outside the navbar container bounds
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                closeMenu();
            }
        });
  
        // Close the menu when the dimmed overlay behind it is tapped
        if (overlay) {
            overlay.addEventListener('click', closeMenu);
        }
  
        // Close the menu once a destination is chosen
        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });
  
        // Clean layout reset if screen transitions to desktop viewports
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }
  });