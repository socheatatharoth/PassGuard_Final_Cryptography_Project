document.addEventListener('DOMContentLoaded', () => {

  const navLinks = document.querySelectorAll('.nav a');
  const logo = document.querySelector('.logo');

  // Logo click → home
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '/';
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // 1️⃣ Internal anchor
      if (href.startsWith('#')) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          const top = targetEl.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        } else {
          // Anchor not on this page → go to home page
          window.location.href = '/' + href;
        }
      }

      // 2️⃣ Special case: Features link to home page (#features)
      if (href === '/#features') {
        e.preventDefault();
        if (window.location.pathname === '/') {
          const targetEl = document.querySelector('#features');
          if (targetEl) {
            const top = targetEl.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        } else {
          window.location.href = '/#features';
        }
      }

      // 3️⃣ Other links → default navigation
    });
  });

});
