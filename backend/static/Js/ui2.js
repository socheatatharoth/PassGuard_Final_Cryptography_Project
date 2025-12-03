document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('passwordInput');
  const togglePassword = document.getElementById('togglePassword');
  const checkBtn = document.getElementById('checkStrengthBtn');
  const strengthMeter = document.getElementById('strengthMeter');

  // Toggle show/hide password
  togglePassword.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
      passwordInput.type = 'password';
      togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
    }
  });

  // Check password strength
  checkBtn.addEventListener('click', () => {
    const val = passwordInput.value.trim();
    let strength = "";

    if (!val) {
      strength = "Please enter a password";
    } else if (val.length > 10 && /[A-Z]/.test(val) && /\d/.test(val) && /[\W]/.test(val)) {
      strength = "Strong";
    } else if (val.length >= 6) {
      strength = "Medium";
    } else {
      strength = "Weak";
    }

    strengthMeter.textContent = strength;
  });
});
