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

})();
