// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom cursor functionality
let cursor = document.querySelector('.cursor');
let cursorTrail = document.querySelector('.cursor-trail');
let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;

// Mouse movement tracking
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    gsap.to(cursor, {
        x: mouseX - 10,
        y: mouseY - 10,
        duration: 0.1,
        ease: "power2.out"
    });
});

// Cursor trail animation
function animateTrail() {
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    
    gsap.set(cursorTrail, {
        x: trailX - 4,
        y: trailY - 4
    });
    
    requestAnimationFrame(animateTrail);
}
animateTrail();

// Parallax effect for hero background
document.addEventListener('mousemove', (e) => {
    const mouseXPercent = (e.clientX / window.innerWidth) * 100;
    const mouseYPercent = (e.clientY / window.innerHeight) * 100;
    
    gsap.to('.layer-1', {
        x: (mouseXPercent - 50) * 0.5,
        y: (mouseYPercent - 50) * 0.3,
        duration: 1,
        ease: "power2.out"
    });
    
    gsap.to('.layer-2', {
        x: (mouseXPercent - 50) * 0.3,
        y: (mouseYPercent - 50) * 0.2,
        duration: 1.2,
        ease: "power2.out"
    });
    
    gsap.to('.layer-3', {
        x: (mouseXPercent - 50) * 0.1,
        y: (mouseYPercent - 50) * 0.1,
        duration: 1.5,
        ease: "power2.out"
    });
});

// Hero section animations
gsap.timeline()
    .to('.title-line', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    })
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5")
    .to('.cta-button', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.3");

// Scroll-triggered animations
// Section titles
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: title,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
});

// Section text
gsap.utils.toArray('.section-text').forEach(text => {
    gsap.to(text, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: text,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
        }
    });
});

// Vision items
gsap.utils.toArray('.vision-item').forEach((item, index) => {
    gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
        }
    });
});

// Form elements
gsap.utils.toArray('.form-group').forEach((group, index) => {
    gsap.to(group, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: group,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse"
        }
    });
});

gsap.to('.submit-button', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
        trigger: '.submit-button',
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none reverse"
    }
});

// Smooth scrolling for navigation
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: targetElement,
                ease: "power2.inOut"
            });
        }
    }
});

// CTA button click effect
document.querySelector('.cta-button').addEventListener('click', () => {
    gsap.to(window, {
        duration: 1.5,
        scrollTo: '#about',
        ease: "power2.inOut"
    });
});

// Form submission handling
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (name && email && message) {
        // Animate button
        gsap.to('.submit-button', {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
        
        // Show success message (in a real app, you'd send the data to a server)
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            e.target.reset();
        }, 200);
    }
});

// Hover effects for interactive elements
document.querySelectorAll('.cta-button, .submit-button, .vision-item').forEach(element => {
    element.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            scale: 1.5,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    element.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Resize handler for responsive behavior
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// Performance optimization: Reduce animations on mobile
if (window.innerWidth <= 768) {
    // Disable cursor effects on mobile
    cursor.style.display = 'none';
    cursorTrail.style.display = 'none';
    
    // Reduce parallax intensity on mobile
    document.addEventListener('mousemove', (e) => {
        const mouseXPercent = (e.clientX / window.innerWidth) * 100;
        const mouseYPercent = (e.clientY / window.innerHeight) * 100;
        
        gsap.to('.layer-1', {
            x: (mouseXPercent - 50) * 0.1,
            y: (mouseYPercent - 50) * 0.1,
            duration: 2,
            ease: "power2.out"
        });
    });
}

// Loading animation
window.addEventListener('load', () => {
    gsap.from('body', {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
    });
});

