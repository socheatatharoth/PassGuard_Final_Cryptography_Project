// ui.js
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
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

    // Explore button scroll to features
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            const features = document.querySelector('#features');
            if (features) {
                const top = features.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    }

    /* --------------------------
       Background floating blobs (decorative)
       -------------------------- */
    const createBackgroundParticles = () => {
        const colors = [
            'rgba(106, 17, 203, 0.08)',
            'rgba(37, 117, 252, 0.06)',
            'rgba(0, 219, 222, 0.06)'
        ];
        for (let i = 0; i < 10; i++) {
            const p = document.createElement('div');
            p.style.position = 'fixed';
            p.style.width = (Math.random() * 160 + 60) + 'px';
            p.style.height = p.style.width;
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.borderRadius = '50%';
            p.style.top = Math.floor(Math.random() * 100) + 'vh';
            p.style.left = Math.floor(Math.random() * 100) + 'vw';
            p.style.zIndex = '-1';
            p.style.filter = 'blur(36px)';
            p.style.opacity = '0.45';
            document.body.appendChild(p);
        }
    };
    createBackgroundParticles();

    /* --------------------------
       Continuous Typewriter
       - cycles through phrases
       - types, pauses, deletes, moves to next
       -------------------------- */
    const phrases = [
        'Secure Your Passwords, Empower Your Privacy',
        'Create strong passwords with instant feedback',
        'Learn hashing, entropy and safe password habits'
    ];
    const typeEl = document.getElementById('typewriter-text');

    if (typeEl) {
        let phraseIndex = 0;
        let charIndex = 0;
        let typing = true;  // true = typing, false = deleting
        const typingSpeed = 40;   // ms per character
        const deletingSpeed = 25; // ms per char when deleting
        const pauseAfter = 1700;  // pause after typing phrase (ms)
        const pauseBefore = 400;  // small pause before typing

        function tick() {
            const current = phrases[phraseIndex];
            if (typing) {
                // type
                typeEl.textContent = current.slice(0, charIndex + 1);
                charIndex++;
                if (charIndex === current.length) {
                    typing = false;
                    setTimeout(tick, pauseAfter);
                } else {
                    setTimeout(tick, typingSpeed);
                }
            } else {
                // delete
                typeEl.textContent = current.slice(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    // next phrase
                    typing = true;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(tick, pauseBefore);
                } else {
                    setTimeout(tick, deletingSpeed);
                }
            }
        }

        // small initial delay
        setTimeout(tick, 400);
    }

    /* --------------------------
       Accessibility: Pause animations when user prefers reduced motion
       -------------------------- */
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
        // stop floating animation by removing style
        const imgs = document.querySelectorAll('.hero-image img');
        imgs.forEach(i => { i.style.animation = 'none'; });
    }
});
function typeWriterEffect(elementId, text, speed = 50) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.textContent = "";  

    function type() {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}
document.getElementById('passwordInput').addEventListener('input', async function() {
    const password = this.value;

    const response = await fetch('/check_password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    });
    const data = await response.json();

    // Update strength meter
    document.getElementById('strengthMeter').textContent = data.strength;
    document.getElementById('entropy').textContent = data.entropy;
    document.getElementById('crackTime').textContent = data.crack_time;
});
document.getElementById('hashButton').addEventListener('click', async () => {
    const password = document.getElementById('passwordInput').value;
    const algorithm = document.getElementById('algorithmSelect').value;

    const response = await fetch('/generate_hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, algorithm })
    });
    const data = await response.json();
    document.getElementById('hashOutput').value = data.hash;
});

