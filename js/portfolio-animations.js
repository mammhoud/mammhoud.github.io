/**
 * Portfolio Animations — powered by GSAP + ScrollTrigger
 * Animates hero, navbar, sections, cards, orbs, and social tiles.
 */
(function () {
  'use strict';

  // Wait for GSAP to load, then initialize
  function init() {
    if (typeof gsap === 'undefined') {
      // Retry after GSAP loads
      document.addEventListener('DOMContentLoaded', tryInit);
      return;
    }
    runAnimations();
  }

  function tryInit() {
    if (typeof gsap !== 'undefined') {
      runAnimations();
    } else {
      // GSAP might still be loading, check again
      setTimeout(tryInit, 200);
    }
  }

  function runAnimations() {
    var ScrollTrigger = gsap.ScrollTrigger;

    // Register ScrollTrigger plugin
    if (ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    var mm = gsap.matchMedia();
    // Only run GSAP animations on screens wider than 768px (tablet/desktop)
    // On mobile, everything is static (faster perceived load)
    mm.add('(min-width: 768px)', function () {
      desktopAnimations(ScrollTrigger);
    });
    mm.add('(max-width: 767px)', function () {
      mobileAnimations();
    });

    // Always-run effects (navbar, orbs, hover)
    alwaysAnimations();
  }

  // ─── Desktop ScrollTrigger Animations ───────────────────────────
  function desktopAnimations(ScrollTrigger) {
    // ---- Hero Section ----
    var heroContent = document.querySelector('.portfolio__hero-content');
    if (heroContent) {
      var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Avatar: scale + fade
      heroTl.fromTo(
        '.portfolio__avatar',
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9 },
        0
      );

      // Staggered hero text entries
      heroTl.fromTo(
        '.portfolio__eyebrow',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.15
      );

      heroTl.fromTo(
        '.portfolio__hero-title',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.35
      );

      heroTl.fromTo(
        '.portfolio__hero-label',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.5
      );

      heroTl.fromTo(
        '.portfolio__summary',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.65
      );

      heroTl.fromTo(
        '.portfolio__interests',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.8
      );

      // Social tiles staggered
      heroTl.fromTo(
        '.portfolio__social-tile',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        0.95
      );
    }

    // ---- Section: "In bloom" heading slide-in ----
    gsap.fromTo(
      '.portfolio__surface--projects .portfolio__section-title',
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.portfolio__surface--projects',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // ---- Section: "Field notes" heading slide-in ----
    gsap.fromTo(
      '.portfolio__surface--blog .portfolio__section-title',
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.portfolio__surface--blog',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // ---- Project cards staggered entrance ----
    gsap.fromTo(
      '.portfolio__surface--projects .portfolio__card',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.portfolio__surface--projects',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );

    // ---- Post cards staggered entrance ----
    gsap.fromTo(
      '.portfolio__surface--blog .portfolio__card',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.portfolio__surface--blog',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );

    // ---- Resume sections staggered entrance ----
    gsap.utils.toArray('.portfolio__resume-section').forEach(function (section, i) {
      gsap.fromTo(
        section,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // ---- Resume hero entrance ----
    var resumeHero = document.querySelector('.portfolio__resume-hero');
    if (resumeHero) {
      gsap.fromTo(
        resumeHero,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: resumeHero,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // ---- Resume contact card slide from right ----
    var contactCard = document.querySelector('.portfolio__resume-contact-card');
    if (contactCard) {
      gsap.fromTo(
        contactCard,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactCard,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // ---- Post/project page titles ----
    gsap.utils.toArray('.portfolio h1:not(.portfolio__hero-title):not(.portfolio__section-title)').forEach(function (title) {
      gsap.fromTo(
        title,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // ---- Section eyebrows slide in ----
    gsap.utils.toArray('.portfolio__eyebrow').forEach(function (eb) {
      // only target non-hero eyebrows (hero is handled in the timeline)
      if (eb.closest('.portfolio__hero-content')) return;
      gsap.fromTo(
        eb,
        { x: -24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: eb,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // ---- Vine subtle parallax ----
    gsap.utils.toArray('.portfolio__vine').forEach(function (vine) {
      gsap.to(vine, {
        y: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: vine.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });
  }

  // ─── Mobile (simpler, lighter animations) ──────────────────────
  function mobileAnimations() {
    // Just fade-in hero on mobile — no heavy scroll-triggered animations
    var heroContent = document.querySelector('.portfolio__hero-content');
    if (heroContent) {
      var mobileTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      mobileTl.fromTo(
        '.portfolio__hero-content > *',
        { opacity: 0 },
        { opacity: 1, duration: 0.4, stagger: 0.08 },
        0
      );
    }
  }

  // ─── Always-run effects ─────────────────────────────────────────
  function alwaysAnimations() {
    // ---- Navbar scroll effect ----
    var navbar = document.querySelector('.portfolio__navbar');
    var didScroll = false;

    if (navbar) {
      // Check initial scroll position
      if (window.scrollY > 60) {
        navbar.classList.add('portfolio__navbar--scrolled');
      }

      // Throttled scroll listener with GSAP ticker for performance
      gsap.ticker.add(function () {
        var scrollY = window.scrollY;
        if (scrollY > 60) {
          if (!didScroll) {
            navbar.classList.add('portfolio__navbar--scrolled');
            didScroll = true;
          }
        } else {
          if (didScroll) {
            navbar.classList.remove('portfolio__navbar--scrolled');
            didScroll = false;
          }
        }
      });
    }

    // ---- Garden orbs gentle floating ----
    var mossOrb = document.querySelector('.portfolio__garden-orb--moss');
    var petalOrb = document.querySelector('.portfolio__garden-orb--petal');

    if (mossOrb) {
      gsap.to(mossOrb, {
        y: -12,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    }

    if (petalOrb) {
      gsap.to(petalOrb, {
        y: 8,
        x: -6,
        duration: 5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    }

    // ---- Hover effects only on devices that support hover (not touch) ----
    var hoverMq = window.matchMedia('(hover: hover)');
    if (hoverMq.matches) {
      // Social tile hover with GSAP (smoother than CSS transition)
      document.querySelectorAll('.portfolio__social-tile').forEach(function (tile) {
        tile.addEventListener('mouseenter', function () {
          gsap.to(tile, {
            scale: 1.06,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        tile.addEventListener('mouseleave', function () {
          gsap.to(tile, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });

      // Resume contact card social links hover
      document.querySelectorAll('.portfolio__resume-contact-list .portfolio__social-link').forEach(function (link) {
        link.addEventListener('mouseenter', function () {
          gsap.to(link, {
            scale: 1.04,
            duration: 0.25,
            ease: 'power2.out'
          });
        });
        link.addEventListener('mouseleave', function () {
          gsap.to(link, {
            scale: 1,
            duration: 0.25,
            ease: 'power2.out'
          });
        });
      });
    }
  }

  // ─── Boot ────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ─── Re-init after Unpoly content swap ───────────────────────────
  document.addEventListener('up:content:swapped', function () {
    // Give the DOM a moment to settle, then re-run animations
    // Use requestAnimationFrame to ensure the next paint cycle
    requestAnimationFrame(function () {
      // Kill existing ScrollTrigger instances to prevent duplicates
      if (typeof gsap !== 'undefined' && gsap.ScrollTrigger) {
        gsap.ScrollTrigger.getAll().forEach(function (st) { st.kill(); });
      }
      // Re-run after a small delay to let the DOM fully settle
      setTimeout(function () {
        if (typeof gsap !== 'undefined') {
          runAnimations();
        }
      }, 50);
    });
  });
})();
