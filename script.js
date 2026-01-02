// Register Plugins
gsap.registerPlugin(ScrollTrigger);

// --- 1. Custom Cursor ---
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

// Basic Follow
window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot - instant
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline - smooth
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Hover States
const hoverables = document.querySelectorAll('a, button, .hover-magnet, .card-item');
hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovered'));
});


// --- 2. Hero Particles Canvas ---
const canvas = document.getElementById('hero-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = (Math.random() * 1.5) - 0.75;
            this.speedY = (Math.random() * 1.5) - 0.75;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = '#8b5cf6'; // Primary color
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < 50; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            // Connections
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 - distance / 500})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
}


// --- 3. Hero Animations (Reveal) ---
const tl = gsap.timeline();

// Stagger text reveal - Animate FROM hidden state
tl.from('.reveal-text', {
    y: "100%",
    duration: 1,
    stagger: 0.2,
    ease: "power4.out",
    delay: 0.2
})
    .from('.hero-sub', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5")
    .from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5")
    .from('.hero-scroll', {
        opacity: 0,
        duration: 1
    }, "-=0.5");


// --- 4. Mouse Parallax Orbs ---
const heroSection = document.getElementById('hero');
const floaters = document.querySelectorAll('.mouse-parallax');

if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        floaters.forEach(el => {
            const speed = el.getAttribute('data-speed');
            gsap.to(el, {
                x: x * 100 * speed,
                y: y * 100 * speed,
                duration: 1,
                ease: "power2.out"
            });
        });
    });
}


// --- 5. Marquee Loop ---
gsap.to(".marquee-content", {
    xPercent: -100,
    repeat: -1,
    duration: 15,
    ease: "linear"
}).totalProgress(0.5);


// --- 6. Scroll Animations (Fade Up) ---
const fadeUpElements = document.querySelectorAll('.fade-up');
fadeUpElements.forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});


// --- 7. SVG Drawing Animation ---
const drawPaths = document.querySelectorAll('.draw-path');
drawPaths.forEach(path => {
    gsap.to(path, {
        strokeDashoffset: 0,
        scrollTrigger: {
            trigger: path,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
        }
    });
});


// --- 8. 3D Card Tilt & Glow ---
const cards = document.querySelectorAll('.card-item');
cards.forEach(card => {
    const glow = card.querySelector('.card-glow');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Move Glow
        if (glow) {
            gsap.to(glow, {
                x: x,
                y: y,
                duration: 0.1,
                ease: "power1.out"
            });
        }

        // 3D Tilt
        const xCenter = rect.width / 2;
        const yCenter = rect.height / 2;
        const rotateX = ((y - yCenter) / yCenter) * -5;
        const rotateY = ((x - xCenter) / xCenter) * 5;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power2.out"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    });
});

// --- 9. Magnetic Buttons (Simple) ---
const magnets = document.querySelectorAll('.magnet-btn');
magnets.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    });
});
