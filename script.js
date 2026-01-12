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

    // Butonu Logo ile Nav arasına ekle (header'ın ortasına)
    if (header && nav && logo) {
        header.insertBefore(toggleBtn, nav);
    } else if (header) {
        header.appendChild(toggleBtn);
    }

    // --- HAMBURGER MENU (Sadece Mobilde Görünür) ---
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.ariaLabel = 'Menüyü Aç';

    // Hamburger'i en sağa ekle (nav'dan sonra)
    if (header && nav) {
        header.appendChild(hamburger);
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
