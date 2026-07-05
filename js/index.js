document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');

    if (header) {
        const SCROLL_THRESHOLD = 40;

        const updateHeaderState = () => {
            header.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
        };

        updateHeaderState();
        window.addEventListener('scroll', updateHeaderState, { passive: true });
    }

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

    // ── Scroll reveal: standalone headings float up into view ──
    const setupHeadingReveal = (containerSelector) => {
        const container = document.querySelector(containerSelector);
        const headings = container ? container.querySelectorAll('.reveal-heading') : [];
        if (!container || !headings.length) return;

        const headingObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                headings.forEach((heading) => {
                    heading.classList.toggle('is-visible', entry.isIntersecting);
                });
            });
        }, {
            threshold: 0.3,
            rootMargin: '-10% 0px -10% 0px'
        });

        headingObserver.observe(container);
    };

    setupHeadingReveal('#intro');
    setupHeadingReveal('#contact');

    // ── Scroll reveal: generic fade-up, used across intro photos, story
    //    copy, the social panel, and contact — same idea as the offer
    //    blocks above, just applied wherever a .fade-up shows up ──
    document.querySelectorAll('.grid-wrapper').forEach((group) => {
        group.querySelectorAll('.fade-up').forEach((item, i) => {
            item.style.setProperty('--reveal-delay', `${i * 100}ms`);
        });
    });

    const looseFadeUps = document.querySelectorAll('.fade-up');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
    }, {
        threshold: 0.15,
        rootMargin: '-8% 0px -8% 0px'
    });

    looseFadeUps.forEach((el) => fadeObserver.observe(el));

    // ── Social videos: play muted/looped while in view, pause when scrolled
    //    away so they don't keep decoding in the background ──
    const socialVideos = document.querySelectorAll('.video-frame video');

    if (socialVideos.length) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.25 });

        socialVideos.forEach((video) => videoObserver.observe(video));
    }
  });