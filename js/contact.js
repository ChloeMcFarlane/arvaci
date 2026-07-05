document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────────────
       NAV — same behavior as index.js, so the header
       acts identically across every page
    ───────────────────────────────────────────── */
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
  
      document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
          closeMenu();
        }
      });
  
      if (overlay) {
        overlay.addEventListener('click', closeMenu);
      }
  
      navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
      });
  
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          closeMenu();
        }
      });
    }
  
    /* ─────────────────────────────────────────────
       CONTACT FORM
    ───────────────────────────────────────────── */
    const form        = document.getElementById('contactForm');
    const submitBtn   = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');
    const formError   = document.getElementById('formError');
  
    const fields = {
      name:    { el: document.getElementById('name'),         err: document.getElementById('nameError'),    validate: v => v.trim().length > 0 },
      email:   { el: document.getElementById('emailAddress'), err: document.getElementById('emailError'),   validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
      message: { el: document.getElementById('message'),      err: document.getElementById('messageError'), validate: v => v.trim().length > 0 },
    };
  
    function validateField(key) {
      const { el, err, validate } = fields[key];
      const valid = validate(el.value);
      el.classList.toggle('invalid', !valid);
      err.classList.toggle('visible', !valid);
      return valid;
    }
  
    Object.keys(fields).forEach(key => {
      fields[key].el.addEventListener('blur', () => validateField(key));
      fields[key].el.addEventListener('input', () => {
        if (fields[key].el.classList.contains('invalid')) validateField(key);
      });
    });
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const allValid = Object.keys(fields).map(validateField).every(Boolean);
      if (!allValid) return;
  
      submitBtn.disabled = true;
      submitBtn.classList.add('sending');
      formSuccess.classList.remove('visible');
      formError.classList.remove('visible');
  
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form),
        });
        if (res.ok) {
          formSuccess.classList.add('visible');
          form.reset();
        } else {
          formError.classList.add('visible');
        }
      } catch {
        formError.classList.add('visible');
      } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove('sending');
      }
    });
  });