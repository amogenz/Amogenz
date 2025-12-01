document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal-item');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger sekali saat load
    revealOnScroll();

    // 2. Custom Cursor Logic (Desktop Only)
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    // Cek apakah user menggunakan mouse (bukan touch)
    if (window.matchMedia("(pointer: fine)").matches) {
        
        window.addEventListener("mousemove", function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot mengikuti langsung
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline mengikuti dengan sedikit delay (animation di CSS)
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Efek Hover pada elemen interaktif
        const interactiveElements = document.querySelectorAll('a, button, .glass-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(57, 255, 20, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // 3. Parallax Effect Sederhana untuk Logo
    const logo = document.querySelector('.main-logo');
    
    document.addEventListener('mousemove', (e) => {
        if(window.innerWidth > 768) {
            const x = (window.innerWidth - e.pageX * 2) / 90;
            const y = (window.innerHeight - e.pageY * 2) / 90;
            
            logo.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }
    });

});
