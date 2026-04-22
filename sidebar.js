// sidebar.js — shared across all pages
(function () {
    const hamburgerBtn   = document.getElementById('hamburgerBtn');
    const sidebar        = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    function open() {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
        hamburgerBtn.classList.add('open');
    }

    function close() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        hamburgerBtn.classList.remove('open');
    }

    hamburgerBtn.addEventListener('click', () => {
        sidebar.classList.contains('open') ? close() : open();
    });

    sidebarOverlay.addEventListener('click', close);

    // Close on sidebar link click (navigation = page change)
    document.querySelectorAll('.sidebar-link:not([target="_blank"])').forEach(link => {
        link.addEventListener('click', close);
    });

    // ── Custom cursor (Desktop only) ──
    const dot     = document.querySelector('[data-cursor-dot]');
    const outline = document.querySelector('[data-cursor-outline]');
    const orbs    = document.querySelectorAll('.orb');

    if (window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', e => {
            if (dot)     { dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px'; }
            if (outline) outline.animate({ left: e.clientX + 'px', top: e.clientY + 'px' }, { duration: 500, fill: 'forwards' });
            orbs.forEach((orb, i) => {
                const s = (i + 1) * 14;
                orb.style.transform = `translate(${(window.innerWidth - e.clientX * s) / 100}px, ${(window.innerHeight - e.clientY * s) / 100}px)`;
            });
        });
    }
})();
