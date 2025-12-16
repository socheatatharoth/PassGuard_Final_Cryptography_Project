document.addEventListener("DOMContentLoaded",()=>{

  // NAV SMOOTH SCROLL
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          const top = targetEl.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  // PASSWORD TOGGLE
  const input = document.getElementById("passwordInput");
  const toggle = document.getElementById("togglePassword");

  toggle.onclick = () => {
    input.type = input.type==="password"?"text":"password";
    toggle.innerHTML = input.type==="text"?'<i class="fas fa-eye-slash"></i>':'<i class="fas fa-eye"></i>';
  };

  // HASH GENERATOR
  const hashButtons = document.querySelectorAll(".hash-btn");
  const hashResultBox = document.getElementById("hashResultBox");
  const hashOutput = document.getElementById("hashOutput");
  const hashType = document.getElementById("hashType");

  hashButtons.forEach(btn => {
    btn.onclick = async () => {
      const password = input.value.trim();
      if(!password) return alert("Please input password first!");
      try {
        const res = await fetch("/generate_hash", {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({ password, algo: btn.dataset.type })
        });
        const data = await res.json();
        hashResultBox.style.display = "block";
        hashOutput.value = data.hash;
        hashType.innerText = btn.dataset.type.toUpperCase();
      } catch(err) {
        alert("Error generating hash. Make sure server is running.");
        console.error(err);
      }
    }
  });
});
