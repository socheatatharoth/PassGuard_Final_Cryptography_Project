document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Book a call button functionality
    const bookCallBtn = document.querySelector('.book-call-btn');
    const exploreBtn = document.querySelector('.explore-btn');
    
    bookCallBtn.addEventListener('click', function() {
        showBookingModal();
    });
    
    exploreBtn.addEventListener('click', function() {
        // Scroll to features section
        const featuresSection = document.querySelector('.features-section');
        window.scrollTo({
            top: featuresSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });

    // Card hover effects enhancement
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animate statistic numbers (simulated)
    const statValues = document.querySelectorAll('.stat-value');
    
    // Create observer for number animation when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a subtle animation class
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });
    
    statValues.forEach(value => observer.observe(value));

    // Add a subtle background animation
    const createBackgroundParticles = () => {
        const colors = ['rgba(106, 17, 203, 0.1)', 'rgba(37, 117, 252, 0.1)', 'rgba(0, 219, 222, 0.1)'];
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = Math.random() * 100 + 50 + 'px';
            particle.style.height = Math.random() * 100 + 50 + 'px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + 'vh';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.zIndex = '-1';
            particle.style.filter = 'blur(40px)';
            particle.style.opacity = '0.5';
            document.body.appendChild(particle);
        }
    };

    // Modal for booking a call
    function showBookingModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Book a Call</h2>
                <p>Schedule a consultation with our crypto experts</p>
                <form id="booking-form">
                    <div class="form-group">
                        <input type="text" placeholder="Your Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" placeholder="Email Address" required>
                    </div>
                    <div class="form-group">
                        <select required>
                            <option value="">Select Time Slot</option>
                            <option value="morning">Morning (9AM-12PM)</option>
                            <option value="afternoon">Afternoon (1PM-4PM)</option>
                            <option value="evening">Evening (5PM-8PM)</option>
                        </select>
                    </div>
                    <button type="submit" class="submit-btn">Schedule Call</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                backdrop-filter: blur(5px);
            }
            .modal-content {
                background: linear-gradient(135deg, #1a1a2e, #16213e);
                padding: 40px;
                border-radius: 16px;
                width: 90%;
                max-width: 500px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                position: relative;
            }
            .close-modal {
                position: absolute;
                top: 20px;
                right: 20px;
                font-size: 28px;
                cursor: pointer;
                color: #b8b8d1;
                transition: color 0.3s;
            }
            .close-modal:hover {
                color: #fff;
            }
            .modal-content h2 {
                margin-bottom: 10px;
                color: #fff;
            }
            .modal-content p {
                color: #b8b8d1;
                margin-bottom: 30px;
            }
            .form-group {
                margin-bottom: 20px;
            }
            .form-group input, .form-group select {
                width: 100%;
                padding: 15px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                color: #fff;
                font-size: 16px;
            }
            .form-group input::placeholder {
                color: #b8b8d1;
            }
            .submit-btn {
                width: 100%;
                padding: 16px;
                background: linear-gradient(90deg, #6a11cb, #2575fc);
                color: white;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                font-size: 16px;
                transition: transform 0.3s;
            }
            .submit-btn:hover {
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
        
        // Close modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        // Form submission
        modal.querySelector('#booking-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Our team will contact you shortly to confirm your call.');
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }
        });
    }

    // Initialize background particles
    createBackgroundParticles();
});