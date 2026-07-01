/* ═══════════════════════════════════════════════
   Monologue — CINEMATIC ANIMATIONS
   main.js
═══════════════════════════════════════════════ */

/* ── DATE ──────────────────────────────────── */
const dateEl = document.getElementById('today-date');
if (dateEl) {
  dateEl.textContent = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}


/* ═══════════════════════════════════════════════
   1. INJECT ANIMATION STYLES
═══════════════════════════════════════════════ */
const style = document.createElement('style');
style.textContent = `

  /* ── RESET default CSS animations so JS owns them ── */
  .masthead, main { animation: none !important; }

  /* ── MASTHEAD ENTRANCE ──────────────────────────── */
  .masthead {
    transform: translateY(-100%);
    opacity: 0;
    transition: transform 0.9s cubic-bezier(0.16,1,0.3,1),
                opacity 0.7s ease;
  }
  .masthead.anim-in {
    transform: translateY(0);
    opacity: 1;
  }

  /* ── LOGO LETTER SPLIT ──────────────────────────── */
  .logo-title .char {
    display: inline-block;
    opacity: 0;
    transform: translateY(60px) scaleY(1.3);
    transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
  }
  .logo-title .char.anim-in {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }

  /* ── TOP BAR SLIDE ───────────────────────────────  */
  .masthead-top {
    clip-path: inset(0 100% 0 0);
    transition: clip-path 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s;
  }
  .masthead.anim-in .masthead-top {
    clip-path: inset(0 0% 0 0);
  }

  /* ── NAV LINKS STAGGER ──────────────────────────── */
  .main-nav a {
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.4s ease, transform 0.4s ease,
                background 0.15s, color 0.15s; /* keep hover transitions */
  }
  .main-nav a.nav-anim-in {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── ORNAMENT SPIN IN ────────────────────────────  */
  .ornament {
    opacity: 0;
    transform: scaleX(0);
    transition: opacity 0.6s ease 0.8s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.8s;
    transform-origin: center;
  }
  .masthead.anim-in .ornament {
    opacity: 1;
    transform: scaleX(1);
  }

  /* ── LOGO SUB FADE ───────────────────────────────  */
  .logo-sub {
    opacity: 0;
    transition: opacity 0.7s ease 1.1s;
  }
  .masthead.anim-in .logo-sub {
    opacity: 1;
  }

  /* ══════════════════════════════════════════
     SCROLL REVEAL — base state
  ══════════════════════════════════════════ */

  /* Fade up — default for most elements */
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Slide in from left */
  .reveal-left {
    opacity: 0;
    transform: translateX(-60px);
    transition: opacity 0.7s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal-left.visible {
    opacity: 1;
    transform: translateX(0);
  }

  /* Slide in from right */
  .reveal-right {
    opacity: 0;
    transform: translateX(60px);
    transition: opacity 0.7s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal-right.visible {
    opacity: 1;
    transform: translateX(0);
  }

  /* Scale up reveal */
  .reveal-scale {
    opacity: 0;
    transform: scale(0.92);
    transition: opacity 0.7s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal-scale.visible {
    opacity: 1;
    transform: scale(1);
  }

  /* Clip wipe — for dividers and horizontal lines */
  .reveal-wipe {
    clip-path: inset(0 100% 0 0);
    transition: clip-path 0.9s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal-wipe.visible {
    clip-path: inset(0 0% 0 0);
  }

  /* Stagger delay helpers */
  .delay-1 { transition-delay: 0.1s !important; }
  .delay-2 { transition-delay: 0.2s !important; }
  .delay-3 { transition-delay: 0.3s !important; }
  .delay-4 { transition-delay: 0.4s !important; }
  .delay-5 { transition-delay: 0.5s !important; }
  .delay-6 { transition-delay: 0.6s !important; }

  /* ══════════════════════════════════════════
     HOVER ENHANCEMENTS
  ══════════════════════════════════════════ */

  /* Nav links — ink underline sweep */
  
    content: '';
    display: block;
    height: 2px;
    background: var(--paper);
    width: 0;
    transition: width 0.25s cubic-bezier(0.16,1,0.3,1);
    position: absolute;
    bot.main-nav a::after {tom: 0; left: 0;
  }
  .main-nav a { position: relative; overflow: hidden; }
  .main-nav a:hover::after { width: 100%; }

  /* Nav cards — bold left border slide */
  .nav-card {
    position: relative;
    overflow: hidden;
    transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }
  .nav-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: var(--ink);
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
  }
  .nav-card:hover::before { transform: scaleY(1); }
  .nav-card:hover { transform: translateX(4px); }

  /* Teaser cards — lift with shadow */
  .teaser-card {
    transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1) !important;
  }
  .teaser-card:hover {
    opacity: 1 !important;
    transform: translateY(-6px);
  }

  /* Work feature images — subtle zoom on hover */
  .work-feature-img {
    overflow: hidden;
  }
  .work-feature-img img,
  .work-feature-img .img-placeholder {
    transition: transform 0.6s cubic-bezier(0.16,1,0.3,1) !important;
  }
  .work-feature:hover .work-feature-img img,
  .work-feature:hover .work-feature-img .img-placeholder {
    transform: scale(1.03);
  }

  /* Award rows — ink sweep already in CSS; enhance with transform */
  .award-row {
    transition: background 0.2s ease, padding 0.2s ease, margin 0.2s ease,
                transform 0.2s ease !important;
  }
  .award-row:hover { transform: translateX(8px); }

  /* Edu entries */
  .edu-entry {
    transition: background 0.2s ease, transform 0.2s ease !important;
  }
  .edu-entry:hover { transform: translateX(4px); }

  /* Discipline cells — bold scale on hover */
  .discipline-cell {
    transition: background 0.15s ease, transform 0.2s ease !important;
  }
  .discipline-cell:hover { transform: scaleY(1.03); }

  /* Nav card arrow pulse */
  .nav-card:hover .nav-card-arrow {
    animation: arrowPulse 0.6s ease infinite alternate;
  }
  @keyframes arrowPulse {
    from { transform: translateX(0); }
    to   { transform: translateX(6px); }
  }

  /* Page headline — dramatic underline on load */
  .page-headline {
    position: relative;
    display: inline-block;
  }
  .page-headline::after {
    content: '';
    position: absolute;
    bottom: -4px; left: 0;
    height: 3px;
    background: var(--ink);
    width: 0;
    transition: width 1s cubic-bezier(0.16,1,0.3,1) 0.5s;
  }
  .page-headline.visible::after {
    width: 100%;
  }

  /* Pull quote — scale reveal */
  .pull-quote-strip blockquote,
  .about-pull blockquote,
  .project-pull blockquote {
    transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1);
  }

  /* Section dividers — wipe */
  .section-divider {
    overflow: hidden;
  }

  /* Client row */
  .client-row {
    transition: background 0.15s ease, transform 0.2s ease !important;
  }
  .client-row:hover { transform: translateX(6px); }

  /* Form inputs — border grows on focus (already in CSS, enhance) */
  .form-input {
    transition: border-color 0.2s ease, border-bottom-width 0.2s ease,
                transform 0.2s ease !important;
  }
  .form-input:focus { transform: translateX(2px); }

  /* Submit button — slide shimmer */
  .form-submit {
    position: relative;
    overflow: hidden;
    transition: opacity 0.15s ease, transform 0.2s ease !important;
  }
  .form-submit::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%;
    height: 100%;
    background: rgba(255,255,255,0.12);
    transform: skewX(-20deg);
    transition: left 0.5s ease;
  }
  .form-submit:hover::after { left: 150%; }
  .form-submit:hover { transform: translateY(-2px); opacity: 1 !important; }

  /* Review cards */
  .review-card {
    transition: background 0.15s ease, transform 0.25s ease !important;
  }
  .review-card:hover { transform: translateY(-4px); }

  /* Logo strip cells */
  .brand-logo-cell,
  .logo-cell {
    transition: background 0.15s ease, transform 0.2s ease !important;
  }
  .brand-logo-cell:hover,
  .logo-cell:hover { transform: scale(1.05); }

`;
document.head.appendChild(style);


/* ═══════════════════════════════════════════════
   2. PAGE LOAD — CINEMATIC MASTHEAD ENTRANCE
═══════════════════════════════════════════════ */
function runPageEntrance() {
  const masthead = document.querySelector('.masthead');
  if (!masthead) return;

  // Split logo letters
  const logo = masthead.querySelector('.logo-title');
  if (logo) {
    const text = logo.textContent;
    logo.innerHTML = text.split('').map(ch =>
      ch === ' '
        ? ' '
        : `<span class="char">${ch}</span>`
    ).join('');
  }

  // Fire masthead entrance after short paint delay
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      masthead.classList.add('anim-in');

      // Stagger logo letters
      const chars = masthead.querySelectorAll('.logo-title .char');
      chars.forEach((ch, i) => {
        setTimeout(() => ch.classList.add('anim-in'), 400 + i * 55);
      });

      // Stagger nav links
      const navLinks = masthead.querySelectorAll('.main-nav a');
      navLinks.forEach((link, i) => {
        setTimeout(() => link.classList.add('nav-anim-in'), 900 + i * 80);
      });
    });
  });
}

runPageEntrance();


/* ═══════════════════════════════════════════════
   3. SCROLL REVEAL — INTERSECTION OBSERVER
═══════════════════════════════════════════════ */
function assignRevealClasses() {
  const selectors = {
    // Fade up — general content blocks
    '.page-title-block, .about-hero-text, .film-story-col, .project-overview, .contact-layout': 'reveal',

    // Left slide — left-column elements
    '.about-hero-photo, .film-poster-col, .project-hero-meta': 'reveal-left',

    // Right slide — right-column content
    '.about-bio-paras, .film-opening .film-story-col': 'reveal-right',

    // Scale — images and media
    '.work-feature-img, .film-embed-wrap, .full-image, .film-poster-img': 'reveal-scale',

    // Fade up — section dividers and headers
    '.section-divider, .section-header': 'reveal',

    // Fade up — cards and rows
    '.nav-card, .teaser-card, .award-row, .edu-entry, .client-row, .review-card, .storyboard-frame, .char-sketch-pair, .spec-item, .film-char-card, .swatch-item, .type-entry': 'reveal',

    // Pull quotes
    '.pull-quote-strip, .about-pull, .project-pull': 'reveal-scale',

    // Page headline
    '.page-headline': 'reveal',

    // Disciplines strip
    '.discipline-cell': 'reveal',

    // Misc blocks
    '.about-name-block, .about-role-line, .edu-year-col, .edu-content-col, .award-icon-col, .award-text-col, .film-specs, .pd-item, .hero-facts': 'reveal',

    // Logo / brand strips
    '.brand-logo-cell, .logo-cell': 'reveal',

    // Project mockups
    '.img-block, .three-col-images .img-block, .two-col-images .img-block': 'reveal-scale',
  };

  Object.entries(selectors).forEach(([sel, cls]) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      // Don't re-assign if already tagged
      if (el.classList.contains('reveal') ||
          el.classList.contains('reveal-left') ||
          el.classList.contains('reveal-right') ||
          el.classList.contains('reveal-scale')) return;

      el.classList.add(cls);

      // Add stagger delays within sibling groups
      const siblings = el.parentElement
        ? [...el.parentElement.children].filter(c =>
            c.classList.contains(cls))
        : [];
      const idx = siblings.indexOf(el);
      if (idx > 0 && idx <= 6) {
        el.classList.add(`delay-${idx}`);
      }
    });
  });
}

function initScrollObserver() {
  assignRevealClasses();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once revealed, stop watching (performance)
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  const targets = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-wipe'
  );
  targets.forEach(el => observer.observe(el));
}

// Run after DOM is painted
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollObserver);
} else {
  initScrollObserver();
}


/* ═══════════════════════════════════════════════
   4. MAGNETIC CURSOR ON NAV LINKS
   Adds a subtle magnetic pull to nav items
═══════════════════════════════════════════════ */
function initMagneticNav() {
  document.querySelectorAll('.main-nav a, .sub-btn').forEach(link => {
    link.addEventListener('mousemove', (e) => {
      const rect = link.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.35;
      link.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    link.addEventListener('mouseleave', () => {
      link.style.transform = '';
    });
  });
}

initMagneticNav();


/* ═══════════════════════════════════════════════
   5. SECTION DIVIDERS — STAGGERED WIPE
═══════════════════════════════════════════════ */
function initDividerWipes() {
  const dividers = document.querySelectorAll('.section-divider');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      // Animate the children of the divider in sequence
      const children = [...el.children];
      children.forEach((child, i) => {
        child.style.opacity = '0';
        child.style.transform = 'translateX(-12px)';
        child.style.transition = `opacity 0.4s ease ${i * 0.12}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateX(0)';
          });
        });
      });

      obs.unobserve(el);
    });
  }, { threshold: 0.2 });

  dividers.forEach(d => obs.observe(d));
}

initDividerWipes();


/* ═══════════════════════════════════════════════
   6. PAGE HEADLINE — DRAMATIC WIPE REVEAL
═══════════════════════════════════════════════ */
function initHeadlineReveal() {
  const headlineObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        headlineObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.page-headline').forEach(h => headlineObs.observe(h));
}

initHeadlineReveal();


/* ═══════════════════════════════════════════════
   7. TEASER IMAGE — PARALLAX SCROLL TINT
   Subtle paper-to-dark shift as user scrolls into card
═══════════════════════════════════════════════ */
function initParallaxImages() {
  const imgs = document.querySelectorAll('.work-feature-img img');

  if (!imgs.length) return;

  window.addEventListener('scroll', () => {
    imgs.forEach(img => {
      const rect = img.getBoundingClientRect();
      const winH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > winH) return;
      const progress = 1 - (rect.top / winH);
      const offset = (progress - 0.5) * 30;
      img.style.transform = `translateY(${offset}px)`;
    });
  }, { passive: true });
}

initParallaxImages();


/* ═══════════════════════════════════════════════
   8. ABOUT PAGE — NAME COUNTER (if on about.html)
═══════════════════════════════════════════════ */
function initAboutExtras() {
  // Stagger hero facts
  const facts = document.querySelectorAll('.hero-fact');
  if (facts.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        facts.forEach((f, i) => {
          setTimeout(() => {
            f.style.transition = `opacity 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)`;
            f.style.opacity = '1';
            f.style.transform = 'translateX(0)';
          }, i * 80);
        });
        obs.disconnect();
      });
    }, { threshold: 0.2 });

    // Set initial state
    facts.forEach(f => {
      f.style.opacity = '0';
      f.style.transform = 'translateX(20px)';
    });

    const container = facts[0].closest('.hero-facts') || facts[0].parentElement;
    if (container) obs.observe(container);
  }

  // Stagger discipline cells
  const cells = document.querySelectorAll('.discipline-cell');
  if (cells.length) {
    const obs2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        cells.forEach((c, i) => {
          setTimeout(() => {
            c.style.transition = 'opacity 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)';
            c.style.opacity = '1';
            c.style.transform = 'translateY(0)';
          }, i * 60);
        });
        obs2.disconnect();
      });
    }, { threshold: 0.1 });

    cells.forEach(c => { c.style.opacity = '0'; c.style.transform = 'translateY(20px)'; });
    const strip = cells[0].closest('.disciplines-strip') || cells[0].parentElement;
    if (strip) obs2.observe(strip);
  }
}

initAboutExtras();


/* ═══════════════════════════════════════════════
   9. SMOOTH ANCHOR SCROLL (for sub-nav tabs)
═══════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ═══════════════════════════════════════════════
   10. GRAPHIC DESIGN PAGE — TAB TRANSITIONS
═══════════════════════════════════════════════ */
const subBtns = document.querySelectorAll('.sub-btn');
const tabSections = document.querySelectorAll('.tab-section');

if (subBtns.length && tabSections.length) {
  function showSection(tab) {
    tabSections.forEach(s => {
      if (tab === 'all' || s.dataset.section === tab) {
        s.style.display = 'block';
        // Animate in
        s.style.opacity = '0';
        s.style.transform = 'translateY(24px)';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            s.style.transition = 'opacity 0.5s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)';
            s.style.opacity = '1';
            s.style.transform = 'translateY(0)';
          });
        });
        // Re-trigger scroll observers for newly visible elements
        setTimeout(() => {
          s.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            if (!el.classList.contains('visible')) {
              const rect = el.getBoundingClientRect();
              if (rect.top < window.innerHeight * 0.92) {
                el.classList.add('visible');
              }
            }
          });
        }, 100);
      } else {
        s.style.display = 'none';
      }
    });
    subBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  }

  subBtns.forEach(btn => {
    btn.addEventListener('click', () => showSection(btn.dataset.tab));
  });

  const hash = window.location.hash.replace('#', '');
  if (['branding', 'illustration', 'books'].includes(hash)) {
    showSection(hash);
  }
}


/* ═══════════════════════════════════════════════
   11. STORYBOARD FRAMES — SEQUENTIAL REVEAL
═══════════════════════════════════════════════ */
function initStoryboardReveal() {
  const grids = document.querySelectorAll('.storyboard-grid, .storyboard-row-2');

  grids.forEach(grid => {
    const frames = grid.querySelectorAll('.storyboard-frame');
    frames.forEach(f => {
      f.style.opacity = '0';
      f.style.transform = 'scale(0.9) translateY(20px)';
    });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        frames.forEach((f, i) => {
          setTimeout(() => {
            f.style.transition = 'opacity 0.5s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)';
            f.style.opacity = '1';
            f.style.transform = 'scale(1) translateY(0)';
          }, i * 90);
        });
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.1 });

    obs.observe(grid);
  });
}

initStoryboardReveal();


/* ═══════════════════════════════════════════════
   12. FOOTER ENTRANCE
═══════════════════════════════════════════════ */
function initFooter() {
  const footer = document.querySelector('.site-footer');
  if (!footer) return;

  footer.style.opacity = '0';
  footer.style.transform = 'translateY(20px)';

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      footer.style.transition = 'opacity 0.6s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)';
      footer.style.opacity = '1';
      footer.style.transform = 'translateY(0)';
      obs.unobserve(footer);
    });
  }, { threshold: 0.2 });

  obs.observe(footer);
}

initFooter();

/* ═══════════════════════════════════════════════
   13. BOOK DESIGN — LAYOUT + MOCKUP REVEAL
═══════════════════════════════════════════════ */
function initBookImageReveal() {
  const targets = document.querySelectorAll(
    '.layout-spread img, [data-section="books"] img[src*="mockup"]'
  );

  targets.forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95) translateY(30px)';
    img.style.transition = 'opacity 0.8s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)';
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'scale(1) translateY(0)';
      }, i * 150);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  targets.forEach(el => obs.observe(el));
}

initBookImageReveal();

/* ═══════════════════════════════════════════════
   14. HOME PAGE — HERO INTRO ANIMATION
═══════════════════════════════════════════════ */
function initHomeHero() {
  const introLeft = document.querySelector('.intro-left');
  const introRight = document.querySelector('.intro-right');
  if (!introLeft && !introRight) return;

  // Set initial states
  if (introLeft) {
    introLeft.style.opacity = '0';
    introLeft.style.transform = 'translateY(40px)';
    introLeft.style.transition = 'opacity 0.8s ease 0.3s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s';
  }

  if (introRight) {
    introRight.style.opacity = '0';
    introRight.style.transform = 'translateX(40px)';
    introRight.style.transition = 'opacity 0.8s ease 0.5s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s';
  }

  // Stagger nav cards
  const navCards = document.querySelectorAll('.nav-card');
  navCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(20px)';
    card.style.transition = `opacity 0.5s ease ${0.7 + i * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${0.7 + i * 0.08}s`;
  });

  // Fire after masthead animation completes
  setTimeout(() => {
    if (introLeft) {
      introLeft.style.opacity = '1';
      introLeft.style.transform = 'translateY(0)';
    }
    if (introRight) {
      introRight.style.opacity = '1';
      introRight.style.transform = 'translateX(0)';
    }
    navCards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'translateX(0)';
    });
  }, 600);
}

initHomeHero();

/* ═══════════════════════════════════════════════
   15. BOOK DESIGN — CHARACTER SKETCHES REVEAL
═══════════════════════════════════════════════ */
function initCharacterReveal() {
  const chars = document.querySelectorAll('.character-col');
  if (!chars.length) return;

  chars.forEach((col, i) => {
    col.style.opacity = '0';
    col.style.transform = 'translateY(30px)';
    col.style.transition = `opacity 0.7s ease ${i * 0.2}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.2}s`;
  });

  // Animate sketch images left to right within each col
  document.querySelectorAll('.character-sketch-wrap img').forEach((img, i) => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.92)';
    img.style.transition = `opacity 0.6s ease ${0.3 + i * 0.15}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.15}s`;
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      chars.forEach(col => {
        col.style.opacity = '1';
        col.style.transform = 'translateY(0)';
      });

      document.querySelectorAll('.character-sketch-wrap img').forEach(img => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
      });

      obs.disconnect();
    });
  }, { threshold: 0.1 });

  const grid = document.querySelector('.characters-grid');
  if (grid) obs.observe(grid);
}

initCharacterReveal();

