document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('mobile-nav');

  if (hamburger && navLinks) {
      hamburger.addEventListener('click', (e) => {
          e.stopPropagation();
          
          // Toggle dropdown open states
          navLinks.classList.toggle('active');
          hamburger.classList.toggle('open');
          
          // Manage accessibility standards updates
          const isOpen = hamburger.classList.contains('open');
          hamburger.setAttribute('aria-expanded', isOpen);
      });

      // Close dropdown when clicking outside the navbar container bounds
      document.addEventListener('click', (e) => {
          if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
              navLinks.classList.remove('active');
              hamburger.classList.remove('open');
              hamburger.setAttribute('aria-expanded', 'false');
          }
      });

      // Clean layout reset if screen transitions to desktop viewports
      window.addEventListener('resize', () => {
          if (window.innerWidth > 768) {
              navLinks.classList.remove('active');
              hamburger.classList.remove('open');
              hamburger.setAttribute('aria-expanded', 'false');
          }
      });
  }
});