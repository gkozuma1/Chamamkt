// Configuração do Tailwind
tailwind.config = {
    theme: {
        extend: {
            colors: {
                fire: {
                    primary: '#FF5F00',
                    secondary: '#FF8C00',
                    dark: '#1A1A1A',
                    light: '#F8F8F8'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        }
    }
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Add shadow to header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);

            fetch('https://formsubmit.co/ajax/firemktnegocios@gmail.com', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                form.reset();
                const successMessage = document.getElementById('success-message');
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                    
                    // Play success sound
                    const successSound = document.getElementById('success-sound');
                    if (successSound) {
                        successSound.play().catch(e => console.log('Audio playback failed'));
                    }
                    
                    setTimeout(() => {
                        successMessage.classList.add('hidden');
                    }, 5000);
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }
});