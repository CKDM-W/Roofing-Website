/* ======================================================
   Peak Roofing Solutions – Main JavaScript
   ====================================================== */

(function () {
  'use strict';

  /* ---- Sticky header shadow ---- */
  const header = document.getElementById('site-header');
  function handleHeaderScroll() {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ---- Mobile nav toggle ---- */
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.getElementById('main-nav');

  hamburger.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when a link is clicked
  mainNav.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close nav on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* ---- Active nav link on scroll ---- */
  const sections       = document.querySelectorAll('section[id]');
  const navLinks       = document.querySelectorAll('.nav-link');
  const headerHeight   = 70;

  function setActiveNav() {
    let currentId = '';
    sections.forEach(function (sec) {
      const top = sec.getBoundingClientRect().top;
      if (top <= headerHeight + 40) currentId = sec.id;
    });
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + currentId);
    });
  }
  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();

  /* ---- Scroll-to-top button ---- */
  const scrollTopBtn = document.getElementById('scroll-top');
  function handleScrollTopVisibility() {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
  }
  window.addEventListener('scroll', handleScrollTopVisibility, { passive: true });
  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Animate on scroll (IntersectionObserver) ---- */
  const animatedEls = document.querySelectorAll(
    '.service-card, .why-card, .testimonial-card, .process-step, .trust-item, .about-inner, .contact-inner'
  );

  animatedEls.forEach(function (el) {
    el.classList.add('animate-on-scroll');
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    animatedEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show all elements immediately
    animatedEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- Contact form validation & submission ---- */
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');

  function getEl(id)  { return document.getElementById(id); }
  function setError(fieldId, msg) {
    const field = getEl(fieldId);
    const error = getEl(fieldId + '-error');
    if (field)  field.classList.toggle('error', !!msg);
    if (error)  error.textContent = msg || '';
  }

  function validateUKPhone(value) {
    // Accepts UK mobile and landline formats
    const cleaned = value.replace(/[\s\-\(\)]/g, '');
    return /^(\+44|0)[1-9]\d{8,9}$/.test(cleaned);
  }

  function validateUKPostcode(value) {
    const pattern = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
    return pattern.test(value.trim());
  }

  function validateForm() {
    let valid = true;

    // Name
    const name = getEl('name').value.trim();
    if (!name) {
      setError('name', 'Please enter your full name.');
      valid = false;
    } else if (name.length < 2) {
      setError('name', 'Name must be at least 2 characters.');
      valid = false;
    } else {
      setError('name', '');
    }

    // Phone
    const phone = getEl('phone').value.trim();
    if (!phone) {
      setError('phone', 'Please enter your phone number.');
      valid = false;
    } else if (!validateUKPhone(phone)) {
      setError('phone', 'Please enter a valid UK phone number.');
      valid = false;
    } else {
      setError('phone', '');
    }

    // Email (optional but validate format if provided)
    const email = getEl('email').value.trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('email', 'Please enter a valid email address.');
      valid = false;
    } else {
      setError('email', '');
    }

    // Postcode
    const postcode = getEl('postcode').value.trim();
    if (!postcode) {
      setError('postcode', 'Please enter your postcode.');
      valid = false;
    } else if (!validateUKPostcode(postcode)) {
      setError('postcode', 'Please enter a valid UK postcode (e.g. S1 2AB).');
      valid = false;
    } else {
      setError('postcode', '');
    }

    // Service
    const service = getEl('service').value;
    if (!service) {
      setError('service', 'Please select a service.');
      valid = false;
    } else {
      setError('service', '');
    }

    return valid;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateForm()) return;

      // Simulate form submission (replace with real endpoint as needed)
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      setTimeout(function () {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send My Free Quote Request';
        successMsg.hidden = false;
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Hide success message after 8 seconds
        setTimeout(function () { successMsg.hidden = true; }, 8000);
      }, 1200);
    });

    // Live validation: clear errors as user types
    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        const errorEl = getEl(el.id + '-error');
        if (errorEl && el.classList.contains('error')) {
          el.classList.remove('error');
          errorEl.textContent = '';
        }
      });
    });
  }

  /* ---- Smooth anchor scroll with header offset ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

})();
