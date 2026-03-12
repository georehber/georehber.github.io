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
    } else {
        mobileMenu.style.display = 'flex';
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    }
}

function closeMobileMenu() {
    mobileMenu.style.display = 'none';
    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
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

// Navigation to QGIS Plugins page
function navigateToQgis() {
    window.location.href = 'qgis-eklentileri.html';
}

// Typing Animation for Hero Subtitle
const typingTexts = ["Mekânsal Analiz", "Uzaktan Algılama", "CBS (GIS)"];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;

    const currentText = typingTexts[typingIndex];

    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex++;
        if (typingIndex === typingTexts.length) {
            typingIndex = 0;
        }
        typeSpeed = 500; // Pause before typing next
    }

    setTimeout(typeEffect, typeSpeed);
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
    setTimeout(typeEffect, 1000); // Start typing animation
    reveal(); // Trigger initial reveals
});

window.addEventListener('scroll', reveal);

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
        const target = e.target.closest('a, button, .btn, .project-card, .plugin-card a, .download-btn');
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
        else if (hrefUrl.includes('.pdf') || target.closest('.pdf-download-btn') || target.closest('.project-card') || hrefUrl.includes('storymaps.arcgis.com') || hrefUrl.includes('udemy.com')) {
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
