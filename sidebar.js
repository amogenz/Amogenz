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

    // ===== TEMA GELAP/TERANG (satu mekanisme untuk semua halaman) =====
    // Hirarki standar: toggle di header kanan. Pilihan tersimpan (default: gelap).
    const THEME_KEY = 'amogenz-theme';
    const LOGO_DARK = 'logo.svg';
    const LOGO_LIGHT = 'logo-dark.svg';

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        // Logo mengikuti tema (teks terang di gelap, teks gelap di terang)
        document.querySelectorAll('img.brand-logo').forEach(img => {
            const want = theme === 'light' ? LOGO_LIGHT : LOGO_DARK;
            if (!img.src.endsWith(want)) img.src = want;
        });
        // theme-color mengikuti tema
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', theme === 'light' ? '#F2F2ED' : '#101210');
        document.querySelectorAll('.theme-toggle').forEach(b => b.setAttribute('data-mode', theme));
        try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    }

    let savedTheme = 'dark';
    try { savedTheme = localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark'; } catch (e) {}
    applyTheme(savedTheme);

    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            applyTheme(cur === 'light' ? 'dark' : 'light');
        });
    });

})();
