(function() {
  if (window.self !== window.top) {
    document.documentElement.classList.add('is-embedded');
    document.body.classList.add('is-embedded');
  }
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===== SCROLL REVEAL ===== */
  if (!prefersReduced) {
    const reveals = document.querySelectorAll('[data-reveal]');
    if (reveals.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }});
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(el => io.observe(el));
    }
  } else {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('revealed'));
  }

  /* ===== ANIMATED COUNTERS ===== */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.countSuffix || '';
        const prefix = el.dataset.countPrefix || '';
        const duration = 2000;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = prefix + Math.round(target * eased).toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        if (!prefersReduced) requestAnimationFrame(step);
        else el.textContent = prefix + target.toLocaleString() + suffix;
        countIO.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => countIO.observe(el));
  }

  /* ===== NAV SCROLL ===== */
  const nav = document.querySelector('.demo-nav');
  if (nav) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('scrolled', window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ===== MOBILE MENU ===== */
  const toggle = document.querySelector('.demo-nav__toggle');
  const links = document.querySelector('.demo-nav__links');
  const navInner = document.querySelector('.demo-nav__inner');
  if (toggle && links && navInner) {
    const closeMenu = () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
      if (links.parentElement === document.body) {
        navInner.appendChild(links);
      }
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const open = toggle.classList.toggle('open');
      links.classList.toggle('open');
      if (open) {
        document.body.appendChild(links);
        document.body.style.overflow = 'hidden';
      } else {
        navInner.appendChild(links);
        document.body.style.overflow = '';
      }
      toggle.setAttribute('aria-expanded', open);
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => closeMenu());
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('open')) closeMenu();
    });
  }

  /* ===== HERO KEN BURNS ===== */
  const hero = document.querySelector('.demo-hero');
  if (hero) setTimeout(() => hero.classList.add('loaded'), 100);

  /* ===== HERO DECORATIVE SVG ===== */
  if (hero && !prefersReduced && !document.querySelector('.hero-deco')) {
    const bodyClass = Array.from(document.body.classList).find(c =>
      ['vibeband','vibewellness','mesagrill','ironoak','summit','fizzpop','dailygrind','vibebar','sumi','davidrice'].includes(c));
    const heroDecoSvgs = {
      vibeband: '<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hdg-band" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="currentColor" stop-opacity="0.06"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.02"/></linearGradient></defs><path class="hero-deco__wave hero-deco__wave--1" d="M0 200 Q100 150 200 200 T400 200" fill="none" stroke="url(#hdg-band)" stroke-width="12" stroke-linecap="round"/><path class="hero-deco__wave hero-deco__wave--2" d="M0 220 Q100 270 200 220 T400 220" fill="none" stroke="url(#hdg-band)" stroke-width="8" stroke-linecap="round"/><path class="hero-deco__wave hero-deco__wave--3" d="M0 180 Q100 130 200 180 T400 180" fill="none" stroke="url(#hdg-band)" stroke-width="6" stroke-linecap="round"/></svg>',
      vibewellness: '<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hdg-well" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="currentColor" stop-opacity="0.08"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.02"/></linearGradient></defs><circle class="hero-deco__orb hero-deco__orb--1" cx="80" cy="120" r="60" fill="url(#hdg-well)"/><circle class="hero-deco__orb hero-deco__orb--2" cx="320" cy="280" r="80" fill="url(#hdg-well)"/><circle class="hero-deco__orb hero-deco__orb--3" cx="200" cy="320" r="40" fill="url(#hdg-well)"/></svg>',
      mesagrill: '<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hdg-grill" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="currentColor" stop-opacity="0.07"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.02"/></linearGradient></defs><path class="hero-deco__flame hero-deco__flame--1" d="M60 320 L120 200 L180 320 Z" fill="url(#hdg-grill)"/><path class="hero-deco__flame hero-deco__flame--2" d="M220 340 L280 180 L340 340 Z" fill="url(#hdg-grill)"/><path class="hero-deco__flame hero-deco__flame--3" d="M320 280 L360 160 L400 280 L360 320 Z" fill="url(#hdg-grill)"/></svg>',
      ironoak: '<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hdg-oak" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="currentColor" stop-opacity="0.05"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.02"/></linearGradient></defs><rect class="hero-deco__beam hero-deco__beam--1" x="40" y="80" width="24" height="200" rx="4" fill="url(#hdg-oak)"/><rect class="hero-deco__beam hero-deco__beam--2" x="180" y="120" width="20" height="180" rx="4" fill="url(#hdg-oak)"/><rect class="hero-deco__beam hero-deco__beam--3" x="336" y="60" width="28" height="220" rx="4" fill="url(#hdg-oak)"/></svg>',
      summit: '<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hdg-summit" x1="50%" y1="100%" x2="50%" y2="0%"><stop offset="0%" stop-color="currentColor" stop-opacity="0.06"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.02"/></linearGradient></defs><path class="hero-deco__peak hero-deco__peak--1" d="M0 400 L120 180 L240 400 Z" fill="url(#hdg-summit)"/><path class="hero-deco__peak hero-deco__peak--2" d="M160 400 L280 120 L400 400 Z" fill="url(#hdg-summit)"/><path class="hero-deco__peak hero-deco__peak--3" d="M80 400 L200 220 L320 400 Z" fill="url(#hdg-summit)"/></svg>',
      fizzpop: '<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hdg-fizz" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="currentColor" stop-opacity="0.08"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.03"/></linearGradient></defs><circle class="hero-deco__bubble hero-deco__bubble--1" cx="100" cy="100" r="45" fill="url(#hdg-fizz)"/><circle class="hero-deco__bubble hero-deco__bubble--2" cx="300" cy="150" r="55" fill="url(#hdg-fizz)"/><circle class="hero-deco__bubble hero-deco__bubble--3" cx="180" cy="280" r="35" fill="url(#hdg-fizz)"/><circle class="hero-deco__bubble hero-deco__bubble--4" cx="320" cy="320" r="40" fill="url(#hdg-fizz)"/></svg>',
      dailygrind: '<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hdg-coffee" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="currentColor" stop-opacity="0.06"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.02"/></linearGradient></defs><path class="hero-deco__steam hero-deco__steam--1" d="M80 280 Q120 200 160 120 Q200 80 240 120" fill="none" stroke="url(#hdg-coffee)" stroke-width="10" stroke-linecap="round"/><path class="hero-deco__steam hero-deco__steam--2" d="M240 300 Q280 220 320 140 Q360 100 400 160" fill="none" stroke="url(#hdg-coffee)" stroke-width="8" stroke-linecap="round"/><path class="hero-deco__steam hero-deco__steam--3" d="M160 320 Q200 240 240 180" fill="none" stroke="url(#hdg-coffee)" stroke-width="6" stroke-linecap="round"/></svg>',
      vibebar: '<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hdg-bar" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="0%" stop-color="currentColor" stop-opacity="0.04"/><stop offset="50%" stop-color="currentColor" stop-opacity="0.08"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.04"/></linearGradient></defs><path class="hero-deco__liquid hero-deco__liquid--1" d="M0 220 Q100 180 200 220 T400 220" fill="none" stroke="url(#hdg-bar)" stroke-width="16" stroke-linecap="round"/><path class="hero-deco__liquid hero-deco__liquid--2" d="M0 260 Q100 300 200 260 T400 260" fill="none" stroke="url(#hdg-bar)" stroke-width="12" stroke-linecap="round"/></svg>',
      sumi: '<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hdg-sumi" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="currentColor" stop-opacity="0.07"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.02"/></linearGradient></defs><path class="hero-deco__stroke hero-deco__stroke--1" d="M40 200 Q120 120 200 200 T360 180" fill="none" stroke="url(#hdg-sumi)" stroke-width="14" stroke-linecap="round"/><path class="hero-deco__stroke hero-deco__stroke--2" d="M80 280 C160 200 240 320 320 260" fill="none" stroke="url(#hdg-sumi)" stroke-width="10" stroke-linecap="round"/><path class="hero-deco__stroke hero-deco__stroke--3" d="M120 100 Q200 180 280 100" fill="none" stroke="url(#hdg-sumi)" stroke-width="8" stroke-linecap="round"/></svg>',
      davidrice: '<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hdg-dr" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="currentColor" stop-opacity="0.06"/><stop offset="100%" stop-color="currentColor" stop-opacity="0.02"/></linearGradient></defs><path class="hero-deco__wave hero-deco__wave--1" d="M0 200 Q100 150 200 200 T400 200" fill="none" stroke="url(#hdg-dr)" stroke-width="12" stroke-linecap="round"/><path class="hero-deco__wave hero-deco__wave--2" d="M0 220 Q100 270 200 220 T400 220" fill="none" stroke="url(#hdg-dr)" stroke-width="8" stroke-linecap="round"/><path class="hero-deco__wave hero-deco__wave--3" d="M0 180 Q100 130 200 180 T400 180" fill="none" stroke="url(#hdg-dr)" stroke-width="6" stroke-linecap="round"/></svg>'
    };
    const deco = document.createElement('div');
    deco.className = 'hero-deco';
    deco.setAttribute('aria-hidden', 'true');
    deco.innerHTML = heroDecoSvgs[bodyClass] || heroDecoSvgs.vibewellness;
    hero.querySelector('.demo-hero__content')?.appendChild(deco);
  }

  /* ===== VIDEO PAUSE/PLAY (ADA) ===== */
  document.querySelectorAll('video[autoplay]:not([controls])').forEach(video => {
    const container = video.closest('.demo-hero__bg, .experience-card__media, .video-showcase__main, .demo-hero');
    if (!container || container.querySelector('.video-pause-btn')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'video-pause-btn';
    btn.setAttribute('aria-label', 'Pause video');
    btn.title = 'Pause video';
    btn.innerHTML = '<span class="video-pause-btn__icon video-pause-btn__icon--pause" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg></span><span class="video-pause-btn__icon video-pause-btn__icon--play" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>';
    const videos = container.querySelectorAll('video');
    btn.addEventListener('click', () => {
      const isPaused = btn.classList.toggle('paused');
      if (isPaused) {
        videos.forEach(v => v.pause());
      } else {
        const active = container.querySelector('.hero-video--active') || videos[0];
        active.play().catch(() => {});
        if (videos.length > 1) videos.forEach(v => { if (v !== active) v.pause(); });
      }
      btn.setAttribute('aria-label', isPaused ? 'Play video' : 'Pause video');
      btn.title = isPaused ? 'Play video' : 'Pause video';
    });
    const appendTarget = container.classList?.contains('demo-hero__bg') ? container.closest('.demo-hero') : container;
    const targetEl = appendTarget || container;
    if (targetEl && getComputedStyle(targetEl).position === 'static') targetEl.style.position = 'relative';
    targetEl?.appendChild(btn);
  });

  /* ===== SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
