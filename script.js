document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'theme-toggle';
    toggleBtn.className = 'theme-btn';
    toggleBtn.innerHTML = '🌙'; // Default icon
    toggleBtn.title = 'Karanlık Modu Aç/Kapat';

    // Header'da navigasyonun yanına ekleyelim
    const header = document.querySelector('header');
    const nav = document.querySelector('header nav');

    // --- HAMBURGER MENU EKLEME ---
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰'; // Basit ikon
    hamburger.ariaLabel = 'Menüyü Aç';

    // Hamburger'i Logodan sonra, Nav'dan önce ekleyelim
    if (header && nav) {
        header.insertBefore(hamburger, nav);
    }

    // Mobil Menü Mantığı
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
    });

    // Linklere tıklayınca menüyü kapat
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            hamburger.innerHTML = '☰';
        });
    });
    // ----------------------------

    if (nav) {
        nav.appendChild(toggleBtn);
    } else {
        // Fallback: Header içine sona ekle
        document.querySelector('header').appendChild(toggleBtn);
    }

    const root = document.documentElement;

    // 1. Kayıtlı tercihi kontrol et
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (systemPrefersDark) {
        setTheme('dark');
    }

    // 2. Butona tıklama olayı
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
