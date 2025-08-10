// Typing animation
const typingTexts = ['Full Stack Developer', 'Competitive Programmer', 'Problem Solver', 'Tech Enthusiast'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeWriter() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 100 : 150;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start typing animation
typeWriter();

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navLinks.classList.remove('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .card, .project-card, .achievement-card').forEach(el => {
    observer.observe(el);
});

// Add some interactive elements
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effect to achievement cards
document.querySelectorAll('.achievement-card').forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'scale(1.05)';
        }, 150);
    });
});

// Add floating animation to profile image
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    let floatDirection = 1;
    setInterval(() => {
        const currentTransform = profileImage.style.transform || 'translateY(0px)';
        const currentY = parseFloat(currentTransform.match(/translateY\(([^)]+)px\)/)?.[1] || 0);
        
        if (currentY >= 10) floatDirection = -1;
        if (currentY <= -10) floatDirection = 1;
        
        profileImage.style.transform = `translateY(${currentY + floatDirection}px)`;
    }, 100);
}

// Add glitch effect to name on hover
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    
    heroTitle.addEventListener('mouseenter', () => {
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        let glitchText = '';
        
        for (let i = 0; i < originalText.length; i++) {
            if (originalText[i] === ' ') {
                glitchText += ' ';
            } else {
                glitchText += Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : originalText[i];
            }
        }
        
        heroTitle.textContent = glitchText;
        
        setTimeout(() => {
            heroTitle.textContent = originalText;
        }, 200);
    });
}

// Add particle effect on scroll
let particles = [];
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '1';
canvas.style.opacity = '0.3';
document.body.appendChild(canvas);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
    };
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0 || particle.x > canvas.width || 
            particle.y < 0 || particle.y > canvas.height) {
            particles[index] = createParticle();
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
        ctx.fill();
    });
    
    requestAnimationFrame(animateParticles);
}

// Initialize particles
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 50; i++) {
    particles.push(createParticle());
}

animateParticles();

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add custom cursor effect
const cursor = document.createElement('div');
cursor.style.position = 'fixed';
cursor.style.width = '20px';
cursor.style.height = '20px';
cursor.style.backgroundColor = 'rgba(0, 212, 255, 0.5)';
cursor.style.borderRadius = '50%';
cursor.style.pointerEvents = 'none';
cursor.style.zIndex = '9999';
cursor.style.transition = 'transform 0.1s ease';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Scale cursor on hover over interactive elements
document.querySelectorAll('a, button, .card, .project-card, .achievement-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.backgroundColor = 'rgba(0, 212, 255, 0.8)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.backgroundColor = 'rgba(0, 212, 255, 0.5)';
    });
});

// Hide custom cursor on mobile
if (window.innerWidth <= 768) {
    cursor.style.display = 'none';
}

// Add scroll-triggered counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isNumber = !isNaN(parseFloat(target));
        
        if (isNumber) {
            const finalValue = parseFloat(target);
            let currentValue = 0;
            const increment = finalValue / 50;
            
            const updateCounter = () => {
                if (currentValue < finalValue) {
                    currentValue += increment;
                    if (target.includes('.')) {
                        counter.textContent = currentValue.toFixed(1);
                    } else if (target.includes('+')) {
                        counter.textContent = Math.ceil(currentValue) + '+';
                    } else {
                        counter.textContent = Math.ceil(currentValue);
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Start animation when element is visible
            const statObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        statObserver.unobserve(entry.target);
                    }
                });
            });
            
            statObserver.observe(counter);
        }
    });
}

// Initialize counter animation
animateCounters();

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const parallax = scrolled * 0.5;
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${parallax}px)`;
    }
});

// Add skill bars animation
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateX(-20px)';
                        
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateX(0)';
                            entry.target.style.transition = 'all 0.5s ease';
                        }, 50);
                    }, index * 100);
                    
                    skillObserver.unobserve(entry.target);
                }
            });
        });
        
        skillObserver.observe(item);
    });
}

// Initialize skill bars animation
animateSkillBars();

// Add project card hover effects with tilt
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
    });
});

// Add typewriter effect to project descriptions
function addTypewriterEffect() {
    const descriptions = document.querySelectorAll('.project-card p');
    
    descriptions.forEach(desc => {
        const text = desc.textContent;
        desc.textContent = '';
        desc.style.borderRight = '2px solid var(--accent-color)';
        
        const typeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let i = 0;
                    const typeInterval = setInterval(() => {
                        if (i < text.length) {
                            desc.textContent += text.charAt(i);
                            i++;
                        } else {
                            clearInterval(typeInterval);
                            desc.style.borderRight = 'none';
                        }
                    }, 20);
                    
                    typeObserver.unobserve(entry.target);
                }
            });
        });
        
        typeObserver.observe(desc);
    });
}

// Initialize typewriter effect
// addTypewriterEffect(); // Commented out as it might be too distracting

// Add smooth reveal animation for achievement icons
document.querySelectorAll('.achievement-icon').forEach((icon, index) => {
    const iconObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transform = 'scale(0)';
                    entry.target.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    
                    setTimeout(() => {
                        entry.target.style.transform = 'scale(1)';
                    }, 100);
                }, index * 200);
                
                iconObserver.unobserve(entry.target);
            }
        });
    });
    
    iconObserver.observe(icon);
});

// Add Easter egg - Konami code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konami.join(',')) {
        // Easter egg activated
        document.body.style.animation = 'rainbow 2s infinite';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        // Add rainbow animation to CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        konamiCode = [];
    }
});