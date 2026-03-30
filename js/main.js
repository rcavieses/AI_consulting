/* ========================================
   main.js – AI Consulting site interactions
   ======================================== */

(function () {
  'use strict';

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-menu a, .navbar-mobile a');

  const observerOptions = {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(s => observer.observe(s));

  /* ---------- Navbar shrink on scroll ---------- */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ---------- Contact form ---------- */
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('.form-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      // Simulate async submission (replace with real API call if needed)
      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        if (successMsg) {
          successMsg.style.display = 'block';
          setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
        }
      }, 1200);
    });
  }

  /* ---------- Fade-in animation on scroll ---------- */
  const animatedEls = document.querySelectorAll(
    '.service-card, .course-card, .audience-card, .why-card, .software-item'
  );

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedEls.forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });



})();
