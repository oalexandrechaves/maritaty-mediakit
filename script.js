/* ============================================
   MariTaty Media Kit — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // NAVIGATION — Scroll behavior
  // ==========================================
  const nav = document.getElementById('nav');

  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ==========================================
  // HAMBURGER MENU
  // ==========================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ==========================================
  // SCROLL ANIMATIONS (Intersection Observer)
  // ==========================================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => scrollObserver.observe(el));

  // ==========================================
  // COUNTER-UP ANIMATION
  // ==========================================
  function animateCounter(element, target, suffix = '', duration = 2000) {
    const isDecimal = target % 1 !== 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (isDecimal) {
        element.textContent = current.toFixed(1) + suffix;
      } else {
        element.textContent = Math.round(current) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Observe social stat numbers
  const counterElements = document.querySelectorAll('.social-stat__number[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        animateCounter(el, target, '', 1800);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => counterObserver.observe(el));

  // Big counter in Alcance section
  const bigCounter = document.getElementById('bigCounter');
  if (bigCounter) {
    const bigCounterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const startTime = performance.now();
          const target = 796;
          const duration = 2500;

          function updateBig(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            bigCounter.textContent = '~' + current + 'K';
            if (progress < 1) {
              requestAnimationFrame(updateBig);
            }
          }

          requestAnimationFrame(updateBig);
          bigCounterObserver.unobserve(bigCounter);
        }
      });
    }, { threshold: 0.3 });

    bigCounterObserver.observe(bigCounter);
  }

  // ==========================================
  // SMOOTH SCROLL for anchor links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
