(() => {
  const views = {
    about: document.getElementById('view-about'),
    work: document.getElementById('view-work'),
    process: document.getElementById('view-process'),
  };

  const navLinks = document.querySelectorAll('.nav-link');
  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2400);
  }

  function switchView(targetView, pushHash = true) {
    if (!views[targetView]) return;

    Object.entries(views).forEach(([key, el]) => {
      el.classList.toggle('active', key === targetView);
    });

    navLinks.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.view === targetView);
    });

    if (pushHash) {
      history.replaceState(null, '', `#${targetView}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Delegate clicks for any [data-view] trigger
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-view]');
    if (!trigger) return;
    e.preventDefault();
    switchView(trigger.dataset.view);
  });

  // Keyboard accessibility for clickable cards
  document.querySelectorAll('[role="button"][data-view]').forEach((card) => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        switchView(card.dataset.view);
      }
    });
  });

  // Copy email buttons
  function bindCopyEmail(btn) {
    if (!btn) return;
    btn.addEventListener('click', async () => {
      const email = btn.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email copied to clipboard');
      } catch {
        showToast(`Email: ${email}`);
      }
    });
  }

  bindCopyEmail(document.getElementById('hero-copy-email'));
  bindCopyEmail(document.getElementById('footer-copy-email'));

  // Resume download handler (checks if assets/Esha_Singh_Resume.pdf exists when hosted)
  const resumeBtn = document.getElementById('resume-download-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', async () => {
      const resumePath = 'assets/Esha_Singh_Resume.pdf';
      try {
        const res = await fetch(resumePath, { method: 'HEAD' });
        if (res.ok) {
          const a = document.createElement('a');
          a.href = resumePath;
          a.download = 'Esha_Singh_Resume.pdf';
          document.body.appendChild(a);
          a.click();
          a.remove();
          return;
        }
      } catch {
        // Fallback when opened directly via file:// or before resume PDF is added
      }
      showToast('Add your PDF to assets/Esha_Singh_Resume.pdf to enable download');
    });
  }

  // Interactive Self-Serve Layout Switcher (Work view)
  const demoGrid = document.getElementById('demo-grid');
  const layoutBtns = document.querySelectorAll('.layout-btn');

  layoutBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.layout;
      layoutBtns.forEach((b) => b.classList.toggle('active', b === btn));
      demoGrid.classList.remove('layout-exec', 'layout-grid2x2', 'layout-grid3x2');
      demoGrid.classList.add(`layout-${mode}`);
    });
  });

  // Scroll-spy for Case Study Jump Navigation
  const jumpLinks = document.querySelectorAll('.jump-link');
  const csSections = Array.from(jumpLinks)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  window.addEventListener('scroll', () => {
    if (!views.work.classList.contains('active')) return;
    const scrollPos = window.scrollY + 160;
    let currentId = csSections[0]?.id;

    for (const sec of csSections) {
      if (sec.offsetTop <= scrollPos) {
        currentId = sec.id;
      }
    }

    jumpLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }, { passive: true });

  // Respect initial URL hash on load
  const initialHash = window.location.hash.replace('#', '');
  if (views[initialHash]) {
    switchView(initialHash, false);
  }
})();
