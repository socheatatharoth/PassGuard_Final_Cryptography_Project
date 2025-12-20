document.addEventListener('DOMContentLoaded', () => {

  /* ---------- NAVIGATION (YOUR ORIGINAL LOGIC) ---------- */
  const navLinks = document.querySelectorAll('.nav a');
  const logo = document.querySelector('.logo');

  if (logo) {
    logo.addEventListener('click', () => {
      window.location.href = '/';
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        } else {
          window.location.href = '/' + href;
        }
      }
    });
  });

  /* ---------- FAQ ACCORDION ---------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });

});
