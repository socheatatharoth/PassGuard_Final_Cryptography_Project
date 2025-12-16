document.addEventListener("DOMContentLoaded", () => {

  const hashType = document.getElementById("hashType");
  const resultBox = document.getElementById("resultBox");
  const checkBtn = document.getElementById("checkBtn");

  hashType.style.display = "none";

  // Toggle hash dropdown correctly
  document.querySelectorAll('input[name="mode"]').forEach(radio => {
    radio.addEventListener("change", () => {
      const mode = document.querySelector('input[name="mode"]:checked').value;
      hashType.style.display = mode === "hash" ? "block" : "none";
      resultBox.textContent = "";
    });
  });

  checkBtn.addEventListener("click", async () => {
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const value = document.getElementById("passwordInput").value.trim();
    const algo = document.getElementById("hashAlgo").value;

    if (!value) {
      resultBox.style.color = "#ffce00";
      resultBox.textContent = "Please enter a value.";
      return;
    }

    resultBox.style.color = "#ffce00";
    resultBox.textContent = "Checking breach database...";

    try {
      const res = await fetch("/check_dictionary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          value: value,
          mode: mode,
          algo: mode === "hash" ? algo : null
        })
      });

      const data = await res.json();

      if (data.breached) {
        resultBox.style.color = "#ff4d4d";
        resultBox.textContent = "🚨 BREACHED: " + data.message;
      } else {
        resultBox.style.color = "#00ffae";
        resultBox.textContent = "✅ SAFE: " + data.message;
      }

    } catch (err) {
      resultBox.style.color = "#ff4d4d";
      resultBox.textContent = "Server error. Try again.";
    }
  });
});
