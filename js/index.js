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

    // ── Scroll reveal: stagger the offer blocks up one by one ──
    const revealContainer = document.querySelector('.right-blocks');
    const revealBlocks = revealContainer ? revealContainer.querySelectorAll('.block') : [];

    if (revealContainer && revealBlocks.length) {
        revealBlocks.forEach((block, i) => {
            block.style.setProperty('--reveal-delay', `${i * 120}ms`);
        });

        // Observe the container itself (its box never moves) rather than the
        // individual blocks, which are the elements being translated/faded.
        // Watching a moving target caused the observer to re-fire mid-animation
        // and glitch, especially right at the top edge of the viewport.
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                revealBlocks.forEach((block) => {
                    block.classList.toggle('is-visible', entry.isIntersecting);
                });
            });
        }, {
            threshold: 0.2,
            rootMargin: '-10% 0px -10% 0px'
        });

        revealObserver.observe(revealContainer);
    }
  });