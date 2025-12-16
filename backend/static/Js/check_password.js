document.addEventListener("DOMContentLoaded",()=>{
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

  const input=document.getElementById("passwordInput");
  const toggle=document.getElementById("togglePassword");
  const check=document.getElementById("checkStrengthBtn");
  const dashboard=document.getElementById("dashboardSection");

  const dash={
    passwordMasked:document.getElementById("dashPasswordMasked"),
    strength:document.getElementById("dashStrength"),
    reason:document.getElementById("dashReasonText"),
    entropy:document.getElementById("dashEntropy"),
    crackTime:document.getElementById("dashCrackTime"),
    suggestions:document.getElementById("dashSuggestions"),
    strengthBar:document.getElementById("dashStrengthBar"),
    entropyBar:document.getElementById("dashEntropyBar"),
    dashToggle:document.getElementById("dashTogglePassword")
  };

  // Input toggle
  toggle.onclick=()=>{
    input.type=input.type==="password"?"text":"password";
    toggle.innerHTML=input.type==="text"?'<i class="fas fa-eye-slash"></i>':'<i class="fas fa-eye"></i>';
  };

  // Dashboard toggle: show/hide password
  let passwordVisible=false;
  let currentPassword='';
  dash.dashToggle.onclick=()=>{
    passwordVisible=!passwordVisible;
    dash.passwordMasked.innerText=passwordVisible?currentPassword:'••••••';
    dash.dashToggle.innerHTML=passwordVisible?'<i class="fas fa-eye-slash"></i>':'<i class="fas fa-eye"></i>';
  };

  async function checkPassword(){
    if(!input.value.trim()) return alert("Enter password!");
    currentPassword=input.value.trim();

    const res=await fetch("/check_password",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({password:currentPassword})
    });

    const data=await res.json();
    dashboard.style.display="flex";

    dash.passwordMasked.innerText='••••••';
    passwordVisible=false;
    dash.dashToggle.innerHTML='<i class="fas fa-eye"></i>';

    dash.strength.innerText=data.strength;
    dash.strength.style.color=data.strength==="Weak"?"#ff4b5c":
                              data.strength==="Medium"?"#ffb400":"#00ff94";

    dash.reason.innerText=data.reasonText;
    dash.entropy.innerText=data.entropy;
    dash.crackTime.innerText=data.crackTime;

    // Strength bar
    let strengthPercent=data.strength==="Weak"?33:
                        data.strength==="Medium"?66:100;
    dash.strengthBar.style.width=strengthPercent+"%";
    dash.strengthBar.style.backgroundColor=dash.strength.style.color;

    // Entropy bar
    let entropyValue=parseFloat(data.entropy);
    let entropyPercent=Math.min(100,(entropyValue/128)*100);
    dash.entropyBar.style.width=entropyPercent+"%";
    dash.entropyBar.style.backgroundColor="#00ff94";

    dash.suggestions.innerHTML="";
    (data.suggestions.length?data.suggestions:["No suggestions needed"])
      .forEach(s=>{
        let li=document.createElement("li");
        li.innerText=s;
        dash.suggestions.appendChild(li);
      });

    input.value="";
  }

  check.onclick=checkPassword;
  input.addEventListener("keyup",(e)=>e.key==="Enter"?checkPassword():null);
});
