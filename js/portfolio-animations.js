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
    // ---- Hero Section (Bento profile card) ----
    var heroContent = document.querySelector('.portfolio__hero-content');
    if (heroContent) {
      var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Avatar: scale + fade
      heroTl.fromTo(
        '.bento-avatar',
        { scale: 0.85, opacity: 0, filter: 'grayscale(0.5)' },
        { scale: 1, opacity: 1, filter: 'grayscale(0.1)', duration: 0.9 },
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

      // Social links staggered
      heroTl.fromTo(
        '.portfolio__social-item',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06 },
        0.9
      );

      // Stats staggered
      heroTl.fromTo(
        '.bento-stat',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
        1.0
      );
    }

    // ---- Bento cards: all bento-card elements scroll entrance ----
    gsap.utils.toArray('.bento-shell').forEach(function (shell) {
      // Section heading
      var heading = shell.querySelector('.portfolio__section-title');
      if (heading) {
        gsap.fromTo(
          heading,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: shell,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Cards staggered entrance
      var cards = shell.querySelectorAll('.bento-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: shell,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

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
    gsap.utils.toArray('.portfolio .max-w-7xl h1:not(.portfolio__hero-title):not(.portfolio__section-title)').forEach(function (title) {
      gsap.fromTo(
        title,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 88%',
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

    // ---- Navbar scroll-shrink (desktop only) ----
    var navbar = document.querySelector('.portfolio__navbar');
    if (navbar) {
      var navbarInner = navbar.querySelector('.navbar-inner');
      var brandText = navbar.querySelector('.navbar-brand');

      var navShrinkTl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top-=50',
          end: 'top top-=180',
          scrub: 0.35
        }
      });

      // Outer bezel: tighter top, deeper shadow, slimmer padding
      navShrinkTl.to(navbar, {
        top: 6,
        marginTop: 6,
        paddingTop: 2,
        paddingBottom: 2,
        boxShadow: '0 0 0 1px rgba(212,237,176,0.14), 0 36px 120px rgba(0,0,0,0.38), 0 14px 48px rgba(0,0,0,0.20)',
        duration: 1
      }, 0);

      // Inner core: slimmer padding for compact feel
      if (navbarInner) {
        navShrinkTl.to(navbarInner, {
          paddingTop: 3,
          paddingBottom: 3,
          paddingLeft: 10,
          paddingRight: 6,
          duration: 1
        }, 0);
      }

      // Brand text: slightly smaller on scroll
      if (brandText) {
        navShrinkTl.to(brandText, {
          fontSize: '0.875rem',
          letterSpacing: '-0.03em',
          duration: 1
        }, 0);
      }
    }
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
    // ---- Universal scroll-reveal via IntersectionObserver ----
    initScrollReveal();

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
      // Spotlight border tracking on bento cards
      document.querySelectorAll('.bento-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          var rect = card.getBoundingClientRect();
          var x = ((e.clientX - rect.left) / rect.width) * 100;
          var y = ((e.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty('--mouse-x', x + '%');
          card.style.setProperty('--mouse-y', y + '%');
        });
      });

      // 3D tilt on blog cards — spring-physics via GSAP
      document.querySelectorAll('.bento-blog').forEach(function (card) {
        var maxTilt = 6; // degrees
        var liftY = -8; // px

        card.addEventListener('mousemove', function (e) {
          var rect = card.getBoundingClientRect();
          var centerX = rect.left + rect.width / 2;
          var centerY = rect.top + rect.height / 2;
          // Normalized -1 to 1
          var nx = (e.clientX - centerX) / (rect.width / 2);
          var ny = (e.clientY - centerY) / (rect.height / 2);
          // Clamp
          nx = Math.max(-1, Math.min(1, nx));
          ny = Math.max(-1, Math.min(1, ny));

          var rotateY = nx * maxTilt;
          var rotateX = -ny * maxTilt;

          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            y: liftY,
            duration: 0.4,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', function () {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)'
          });
        });
      });

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

  // ─── Universal Scroll-Reveal (IntersectionObserver) ───────────────
  function initScrollReveal() {
    var reveals = document.querySelectorAll('[data-reveal]:not(.revealed)');
    if (reveals.length === 0) return;

    // Respect prefers-reduced-motion: reveal everything immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach(function (el) { el.classList.add('revealed'); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
    );

    reveals.forEach(function (el) { observer.observe(el); });
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
