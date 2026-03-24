/* ============================================
   MariTaty Media Kit — Script
   GSAP + ScrollTrigger + Lenis + Swiper
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── LENIS SMOOTH SCROLL ──
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // ── NAV SCROLL EFFECT ──
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // ── HAMBURGER MENU ──
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ── SMOOTH SCROLL FOR ANCHOR LINKS ──
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target, { offset: -70 });
            }
        });
    });

    // ── GSAP SCROLL ANIMATIONS ──
    // Animate all .anim elements on scroll
    const animEls = document.querySelectorAll('.anim');
    animEls.forEach(el => {
        const delay = (parseInt(el.dataset.delay) || 0) / 1000;

        gsap.fromTo(el,
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0,
                duration: 0.8,
                delay: delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    once: true
                }
            }
        );
    });

    // ── HERO ENTRANCE ANIMATION ──
    const heroTl = gsap.timeline({ delay: 0.2 });
    const heroLogo = document.querySelector('.hero-logo');
    const heroTagline = document.querySelector('.hero-tagline');
    const heroNames = document.querySelector('.hero-names');
    const heroPlatforms = document.querySelector('.hero-platforms');
    const heroBtn = document.querySelector('.hero .btn');
    const heroFoto = document.querySelector('.hero-foto');

    if (heroLogo) {
        heroTl
            .fromTo(heroLogo, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
            .fromTo(heroTagline, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
            .fromTo(heroNames, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
            .fromTo(heroPlatforms, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
            .fromTo(heroBtn, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
            .fromTo(heroFoto, { opacity: 0, scale: 0.95, x: 30 }, { opacity: 1, scale: 1, x: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6');
    }

    // ── BLOB PARALLAX ──
    document.querySelectorAll('.blob').forEach(blob => {
        gsap.to(blob, {
            y: () => Math.random() * 80 - 40,
            x: () => Math.random() * 40 - 20,
            scrollTrigger: {
                trigger: blob.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });

    // ── COUNTER ANIMATION (GSAP) ──
    document.querySelectorAll('.snum[data-target]').forEach(el => {
        const target = parseFloat(el.dataset.target);
        const isDecimal = target % 1 !== 0;

        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.fromTo(el,
                    { textContent: 0 },
                    {
                        textContent: target,
                        duration: 1.8,
                        ease: 'power3.out',
                        snap: isDecimal ? { textContent: 0.1 } : { textContent: 1 },
                        onUpdate: function () {
                            const val = parseFloat(el.textContent);
                            el.textContent = isDecimal ? val.toFixed(1) : Math.floor(val);
                        }
                    }
                );
            }
        });
    });

    // ── PRESENTER PHOTO MASK ANIMATION ──
    document.querySelectorAll('.pphoto').forEach(photo => {
        gsap.fromTo(photo,
            { clipPath: 'circle(0% at 50% 50%)' },
            {
                clipPath: 'circle(75% at 50% 50%)',
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: photo,
                    start: 'top 80%',
                    once: true
                }
            }
        );
    });

    // ── SWIPER (Visualizações) ──
    new Swiper('.views-swiper', {
        slidesPerView: 1.3,
        centeredSlides: true,
        spaceBetween: 24,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            640: { slidesPerView: 2.3, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 }
        }
    });

    // ── CARD HOVER (delegated for performance) ──
    // Cards already have CSS hover transitions

});
