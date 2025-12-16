document.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("passwordInput");
  const toggle = document.getElementById("togglePassword");
  const check = document.getElementById("checkStrengthBtn");
  const dashboard = document.getElementById("dashboardSection");

  const dash = {
    passwordMasked: document.getElementById("dashPasswordMasked"),
    strength: document.getElementById("dashStrength"),
    reason: document.getElementById("dashReasonText"),
    entropy: document.getElementById("dashEntropy"),
    crackTime: document.getElementById("dashCrackTime"),
    suggestions: document.getElementById("dashSuggestions"),
    strengthBar: document.getElementById("dashStrengthBar"),
    entropyBar: document.getElementById("dashEntropyBar"),
    dashToggle: document.getElementById("dashTogglePassword")
  };

  toggle.onclick = () => {
    input.type = input.type === "password" ? "text" : "password";
    toggle.innerHTML = input.type === "text"
      ? '<i class="fas fa-eye-slash"></i>'
      : '<i class="fas fa-eye"></i>';
  };

  let passwordVisible = false;
  let currentPassword = "";

  dash.dashToggle.onclick = () => {
    passwordVisible = !passwordVisible;
    dash.passwordMasked.innerText = passwordVisible ? currentPassword : "••••••";
    dash.dashToggle.innerHTML = passwordVisible
      ? '<i class="fas fa-eye-slash"></i>'
      : '<i class="fas fa-eye"></i>';
  };

  async function checkPassword() {
    if (!input.value.trim()) {
      alert("Enter password!");
      return;
    }

    currentPassword = input.value.trim();

    const res = await fetch("/check_password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: currentPassword })
    });

    const data = await res.json();
    dashboard.style.display = "flex";

    dash.passwordMasked.innerText = "••••••";
    passwordVisible = false;
    dash.dashToggle.innerHTML = '<i class="fas fa-eye"></i>';

    dash.strength.innerText = data.strength;
    dash.strength.style.color =
      data.strength === "Weak" ? "#ff4757" :
      data.strength === "Medium" ? "#ffa502" : "#2ed573";

    dash.reason.innerText = data.reasonText;
    dash.entropy.innerText = data.entropy;
    dash.crackTime.innerText = data.crackTime;

    dash.strengthBar.style.width =
      data.strength === "Weak" ? "33%" :
      data.strength === "Medium" ? "66%" : "100%";

    dash.strengthBar.style.backgroundColor = dash.strength.style.color;

    const entropyPercent = Math.min(100, (parseFloat(data.entropy) / 128) * 100);
    dash.entropyBar.style.width = entropyPercent + "%";
    dash.entropyBar.style.backgroundColor = "#2ed573";

    dash.suggestions.innerHTML = "";
    (data.suggestions.length ? data.suggestions : ["No suggestions needed"])
      .forEach(text => {
        const li = document.createElement("li");
        li.innerText = text;
        dash.suggestions.appendChild(li);
      });

    input.value = "";
  }

  check.onclick = checkPassword;
  input.addEventListener("keyup", e => {
    if (e.key === "Enter") checkPassword();
  });

});
