document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const nav = document.querySelector('header nav');
    const logo = document.querySelector('header .logo');

    // --- DARK MODE TOGGLE ---
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'theme-toggle';
    toggleBtn.className = 'theme-btn';
    toggleBtn.innerHTML = '🌙';
    toggleBtn.title = 'Karanlık Modu Aç/Kapat';

    // --- HAMBURGER MENU (Mobilde Görünür) ---
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.ariaLabel = 'Menüyü Aç';

    // Mobil layout:
    // [Hamburger] [Logo] [Dark Mode]
    // Hamburger en sola, logo ortada, dark mode en sağda
    if (header && logo) {
        // Hamburger'i logo'dan ÖNCE ekle (sol tarafa)
        header.insertBefore(hamburger, logo);
        // Dark mode butonu en sona (sağa)
        header.appendChild(toggleBtn);
    }

    // Mobil Menü Toggle
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
    });

    // Link tıklama - menüyü kapat
    if (nav) {
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                hamburger.innerHTML = '☰';
            });
        });
    }

    // --- TEMA YÖNETİMİ ---
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (systemPrefersDark) {
        setTheme('dark');
    }

    toggleBtn.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        toggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    }
});
