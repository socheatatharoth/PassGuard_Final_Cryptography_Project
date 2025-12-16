// index.js
document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------
       Navbar & Explore Button Smooth Scrolling
       -------------------------- */
    const navLinks = document.querySelectorAll('.nav a');
    const exploreBtn = document.getElementById('exploreBtn');

    const smoothScroll = (targetSelector, offset = 80) => {
        const targetEl = document.querySelector(targetSelector);
        if (targetEl) {
            const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) { // Internal section
                e.preventDefault();
                smoothScroll(href);
            } 
            // External pages will navigate normally in same tab
        });
    });

    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => smoothScroll('#features'));
    }

    /* --------------------------
       Background Floating Blobs
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
       Typewriter Effect
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
        let typing = true;
        const typingSpeed = 40;
        const deletingSpeed = 25;
        const pauseAfter = 1700;
        const pauseBefore = 400;

        function tick() {
            const current = phrases[phraseIndex];
            if (typing) {
                typeEl.textContent = current.slice(0, charIndex + 1);
                charIndex++;
                if (charIndex === current.length) {
                    typing = false;
                    setTimeout(tick, pauseAfter);
                } else {
                    setTimeout(tick, typingSpeed);
                }
            } else {
                typeEl.textContent = current.slice(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    typing = true;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(tick, pauseBefore);
                } else {
                    setTimeout(tick, deletingSpeed);
                }
            }
        }
        setTimeout(tick, 400);
    }

    /* --------------------------
       Accessibility: Reduced Motion
       -------------------------- */
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
        document.querySelectorAll('.hero-image img').forEach(i => { i.style.animation = 'none'; });
    }

    /* --------------------------
       Password Strength Checker
       -------------------------- */
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('input', async function() {
            const password = this.value;

            const response = await fetch('/check_password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await response.json();

            document.getElementById('strengthMeter').textContent = data.strength;
            document.getElementById('entropy').textContent = data.entropy;
            document.getElementById('crackTime').textContent = data.crack_time;
        });
    }

    /* --------------------------
       Hash Generator
       -------------------------- */
    const hashButton = document.getElementById('hashButton');
    if (hashButton) {
        hashButton.addEventListener('click', async () => {
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
    }

});
