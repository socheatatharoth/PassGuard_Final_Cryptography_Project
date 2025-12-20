document.addEventListener('DOMContentLoaded', () => {

  // ---------------- NAVIGATION ----------------
  const navLinks = document.querySelectorAll('.nav a');
  const logo = document.querySelector('.logo');

  // Logo click → redirect to home
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '/';
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Features link
      if (href === '#features' || href === '/#features') {
        e.preventDefault();

        // If already on home page
        if (window.location.pathname === '/') {
          const targetEl = document.querySelector('#features');
          if (targetEl) {
            const top = targetEl.getBoundingClientRect().top + window.pageYOffset - 80; // navbar offset
            window.scrollTo({ top, behavior: 'smooth' });
          }
        } else {
          // Redirect to home page with #features
          window.location.href = '/#features';
        }
      }

      // Other links (About Us, Services, FAQs) → navigate normally
    });
  });

  console.log('PassGuard About Us page loaded');
});
