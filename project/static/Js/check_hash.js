document.addEventListener("DOMContentLoaded", () => {

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

  // ---------------- PASSWORD TOGGLE ----------------
  const input = document.getElementById("passwordInput");
  const toggle = document.getElementById("togglePassword");

  if (toggle && input) {
    toggle.onclick = () => {
      input.type = input.type === "password" ? "text" : "password";
      toggle.innerHTML = input.type === "text"
        ? '<i class="fas fa-eye-slash"></i>'
        : '<i class="fas fa-eye"></i>';
    };
  }

  // ---------------- HASH GENERATOR ----------------
  const hashButtons = document.querySelectorAll(".hash-btn");
  const hashResultBox = document.getElementById("hashResultBox");
  const hashOutput = document.getElementById("hashOutput");
  const hashType = document.getElementById("hashType");

  if (hashButtons && hashButtons.length && input) {
    hashButtons.forEach(btn => {
      btn.onclick = async () => {
        const password = input.value.trim();
        if (!password) return alert("Please input password first!");

        try {
          const res = await fetch("/generate_hash", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password, algo: btn.dataset.type })
          });
          const data = await res.json();
          if (hashResultBox) hashResultBox.style.display = "block";
          if (hashOutput) hashOutput.value = data.hash;
          if (hashType) hashType.innerText = btn.dataset.type.toUpperCase();
        } catch (err) {
          alert("Error generating hash. Make sure server is running.");
          console.error(err);
        }
      };
    });
  }

});
