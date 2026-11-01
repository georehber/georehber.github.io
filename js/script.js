// Theme Management
const themeToggleBtn = document.getElementById('themeToggle');
const themeToggleMobileBtn = document.getElementById('themeToggleMobile');
const htmlElement = document.documentElement;
const body = document.body;

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

function setTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcons('dark');
    } else {
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        updateThemeIcons('light');
    }
}

function updateThemeIcons(theme) {
    const sunIcons = document.querySelectorAll('.sun-icon');
    const moonIcons = document.querySelectorAll('.moon-icon');
    
    if (theme === 'dark') {
        sunIcons.forEach(icon => icon.style.display = 'none');
        moonIcons.forEach(icon => icon.style.display = 'block');
    } else {
        sunIcons.forEach(icon => icon.style.display = 'block');
        moonIcons.forEach(icon => icon.style.display = 'none');
    }

    const label = theme === 'dark' ? 'Açık temayı aç' : 'Koyu temayı aç';
    [themeToggleBtn, themeToggleMobileBtn].forEach(button => {
        if (!button) return;
        button.setAttribute('aria-label', label);
        button.title = label;
    });
}

function toggleTheme() {
    const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Theme toggle event listeners
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}
if (themeToggleMobileBtn) {
    themeToggleMobileBtn.addEventListener('click', toggleTheme);
}

// Mobile Menu Management
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = mobileMenuBtn?.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn?.querySelector('.close-icon');

function toggleMobileMenu() {
    const isOpen = mobileMenu.style.display === 'flex';
    if (isOpen) {
        mobileMenu.style.display = 'none';
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-label', 'Menüyü aç');
    } else {
        mobileMenu.style.display = 'flex';
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        mobileMenuBtn.setAttribute('aria-label', 'Menüyü kapat');
    }
}

function closeMobileMenu() {
    if (!mobileMenu || !mobileMenuBtn) return;
    mobileMenu.style.display = 'none';
    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-label', 'Menüyü aç');
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Smooth Scroll
function smoothScroll(event, targetId) {
    event.preventDefault();
    closeMobileMenu();
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToTop(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTopBtn');
const contactSection = document.querySelector('.contact');

function handleScroll() {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'flex';
        
        // Change color when overlapping contact section
        if (contactSection) {
            const btnRect = scrollTopBtn.getBoundingClientRect();
            const contactRect = contactSection.getBoundingClientRect();
            
            // Check if the button is within the contact section's vertical bounds
            if (btnRect.bottom > contactRect.top && btnRect.top < contactRect.bottom) {
                scrollTopBtn.style.backgroundColor = 'var(--accent)'; // Green
            } else {
                scrollTopBtn.style.backgroundColor = ''; // Revert to CSS default (Primary/Blue)
            }
        }
    } else {
        scrollTopBtn.style.display = 'none';
        scrollTopBtn.style.backgroundColor = ''; // Reset when hidden
    }
}

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', handleScroll);
}

// Scroll Reveal Animations
function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    reveal();
});

window.addEventListener('scroll', reveal);

// Standard footer social icons and accessible tooltips
function initializeFooterIcons() {
    const footerLinks = document.querySelector('.footer-links');
    if (!footerLinks) return;

    const iconDefinitions = [
        {
            href: 'https://tr.linkedin.com/in/mehmetaliyanmaz',
            label: 'LinkedIn',
            ariaLabel: 'LinkedIn profilini aç',
            external: true,
            markup: '<path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 9h3.55v11.45H3.56V9Z" />',
        },
        {
            href: 'https://www.instagram.com/georehber',
            label: 'Instagram',
            ariaLabel: 'Instagram profilini aç',
            external: true,
            markup: '<path fill="currentColor" d="M12 2.16c3.2 0 3.58.02 4.85.07 3.25.15 4.77 1.69 4.92 4.92.05 1.27.07 1.65.07 4.85s-.02 3.58-.07 4.85c-.15 3.23-1.67 4.77-4.92 4.92-1.27.05-1.65.07-4.85.07s-3.58-.02-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.05-1.27-.07-1.65-.07-4.85s.02-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.18 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />',
        },
        {
            href: 'https://www.youtube.com/@georehber/',
            label: 'YouTube',
            ariaLabel: 'YouTube kanalını aç',
            external: true,
            markup: '<path fill="currentColor" d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />',
        },
        {
            href: 'https://wa.me/905316066176',
            label: 'WhatsApp',
            ariaLabel: 'WhatsApp ile iletişime geç',
            external: true,
            markup: '<path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Zm-5.42 7.4h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26C2.16 6.44 6.6 2 12.06 2a9.89 9.89 0 0 1 9.89 9.9c0 5.45-4.44 9.88-9.9 9.88ZM20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45c6.55 0 11.89-5.34 11.89-11.9a11.82 11.82 0 0 0-3.48-8.41Z" />',
        },
        {
            href: 'mailto:georehber01@gmail.com',
            label: 'E-posta',
            ariaLabel: 'E-posta gönder',
            external: false,
            markup: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm18 3-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />',
        },
    ];

    const links = iconDefinitions.map(definition => {
        const link = document.createElement('a');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        link.href = definition.href;
        if (definition.external) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }

        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');
        svg.innerHTML = definition.markup;

        link.appendChild(svg);
        link.setAttribute('aria-label', definition.ariaLabel);
        link.setAttribute('data-tooltip', definition.label);
        return link;
    });

    footerLinks.setAttribute('role', 'navigation');
    footerLinks.setAttribute('aria-label', 'Sosyal medya ve iletişim');
    footerLinks.replaceChildren(...links);
}

document.addEventListener('DOMContentLoaded', initializeFooterIcons);

// Newsletter request form for the static GitHub Pages site
const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterMessage = document.getElementById('newsletterMessage');

if (newsletterForm && newsletterEmail && newsletterMessage) {
    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = newsletterEmail.value.trim();
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!isValidEmail) {
            newsletterMessage.textContent = 'Lütfen geçerli bir e-posta adresi yazın.';
            return;
        }

        const subject = encodeURIComponent('GeoRehber duyuru listesine katılmak istiyorum');
        const body = encodeURIComponent(
            `Merhaba Mehmet Ali,\n\nGeoRehber'deki yeni ders, video ve kaynak duyurularından haberdar olmak istiyorum.\n\nE-posta adresim: ${email}\n`
        );

        newsletterMessage.textContent = 'E-posta uygulamanız açılıyor. Hazır mesajı göndererek kayıt talebinizi iletebilirsiniz.';
        window.location.href = `mailto:georehber01@gmail.com?subject=${subject}&body=${body}`;
    });
}

// ====== GA4 Event Tracking ======
document.addEventListener('DOMContentLoaded', () => {
    // Helper function to send GA4 events safely
    function trackEvent(eventName, eventParams) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, eventParams);
        } else {
            console.warn('GA4 (gtag) is not loaded for tracking event: ' + eventName);
        }
    }

    // Helper function to get link text safely
    function getLinkText(el) {
        return (el.innerText || el.textContent || '').trim().substring(0, 100);
    }

    document.addEventListener('click', (e) => {
        // Find the closest interactive element
        const target = e.target.closest('a, button, .btn, .project-card, .work-card, .path-card, .plugin-card a, .download-btn');
        if (!target) return;

        let eventName = '';
        const params = {
            page_path: window.location.pathname,
            link_text: getLinkText(target),
            destination_url: target.href || '',
        };

        const hrefUrl = params.destination_url.toLowerCase();
        
        // --- 1. Social Media & GitHub Links ---
        if (target.closest('.instagram') || hrefUrl.includes('instagram.com')) {
            eventName = 'click_social_instagram';
            params.event_category = 'social_media';
            params.event_label = 'Instagram Profile';
        } else if (target.closest('.linkedin') || hrefUrl.includes('linkedin.com')) {
            eventName = 'click_social_linkedin';
            params.event_category = 'social_media';
            params.event_label = 'LinkedIn Profile';
        } else if (target.closest('.youtube') || hrefUrl.includes('youtube.com')) {
            eventName = 'click_social_youtube';
            params.event_category = 'social_media';
            params.event_label = 'YouTube Channel';
        } else if (hrefUrl.includes('github.com')) {
            eventName = 'click_github';
            params.event_category = 'social_media';
            params.event_label = 'GitHub Link';
        } 
        // --- 2. Contact Buttons ---
        else if (target.closest('.email') || hrefUrl.includes('mailto:')) {
            eventName = 'click_contact';
            params.event_category = 'contact';
            params.event_label = 'Email';
        } else if (target.closest('.whatsapp') || hrefUrl.includes('wa.me')) {
            eventName = 'click_contact';
            params.event_category = 'contact';
            params.event_label = 'WhatsApp';
        }
        // --- 3. PDF / Portfolio Links ---
        else if (hrefUrl.includes('.pdf') || target.closest('.pdf-download-btn') || target.closest('.project-card') || target.closest('.work-card') || hrefUrl.includes('storymaps.arcgis.com') || hrefUrl.includes('udemy.com')) {
            eventName = 'click_portfolio_pdf';
            params.event_category = 'portfolio';
            params.event_label = params.link_text || 'Portfolio Item/PDF';
        } 
        // --- 4. QGIS Plugin Download Links ---
        else if (target.closest('.download-btn') || (hrefUrl.includes('plugins/') && hrefUrl.includes('.zip'))) {
            eventName = 'click_plugin_download';
            params.event_category = 'download';
            let pluginName = target.closest('.plugin-card')?.querySelector('.plugin-name')?.textContent || '';
            params.event_label = pluginName ? 'Plugin: ' + pluginName : 'ZIP Download';
        }
        // --- 5. CTA Buttons (Catch-all for other interactive buttons/links) ---
        else if (target.classList.contains('btn-primary') || target.classList.contains('btn-secondary') || target.classList.contains('btn-link') || target.classList.contains('nav-link')) {
            eventName = 'click_cta';
            params.event_category = 'engagement';
            params.event_label = params.link_text || 'CTA Button / Nav Link';
        }
        
        // Send event if matched
        if (eventName) {
            trackEvent(eventName, params);
        }
    });
});
