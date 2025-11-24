document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows immediately
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with animation (handled by CSS transition)
        // We use animate for smoother trailing effect if CSS transition isn't enough, 
        // but CSS transition on left/top is usually performant enough for simple following.
        // To make it smoother/laggy, we can use requestAnimationFrame, but let's stick to simple CSS updates first.
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
    });

    // Add hover effect to links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .btn');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });

        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // Scroll Reveal Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.hero-content, .hero-visual, .section-title, .about-text, .stat-item, .timeline-item, .contact-box');

    animatedElements.forEach(el => {
        el.classList.add('fade-in-up'); // Add initial class
        observer.observe(el);
    });
});

// Add CSS for animations dynamically or in CSS file.
// I'll add a small helper style block here for the JS-driven classes if they aren't in CSS.
// Actually, it's cleaner to put the animation keyframes in CSS.
// I will append the animation styles to the style.css file instead of injecting them here to keep it clean.
