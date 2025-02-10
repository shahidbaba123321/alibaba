document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeScrollReveal();
    initializeSideNavigation();
    initializeBackToTop();
    initializeProgressBar();
    initializeCookieConsent();
    handleSmoothScroll();
    initializeAnimations();
});

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const dropdowns = document.querySelectorAll('.dropdown');

    mobileMenu?.addEventListener('click', () => {
        toggleMenu();
    });

    function toggleMenu(force = null) {
        const isActive = force !== null ? force : !mobileMenu.classList.contains('active');
        mobileMenu.classList.toggle('active', isActive);
        navMenu.classList.toggle('active', isActive);
        menuOverlay.classList.toggle('active', isActive);
        document.body.classList.toggle('no-scroll', isActive);
    }

    menuOverlay?.addEventListener('click', () => {
        toggleMenu(false);
    });

    // Handle dropdowns
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link?.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
            toggleMenu(false);
        }
    });
}

// Scroll Reveal
function initializeScrollReveal() {
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '-50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Side Navigation
function initializeSideNavigation() {
    const sideNavLinks = document.querySelectorAll('.side-nav .nav-link');
    const sections = document.querySelectorAll('[data-section]');

    // Update active link on scroll
    window.addEventListener('scroll', debounce(() => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                currentSection = section.getAttribute('data-section');
            }
        });

        sideNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    }, 100));

    // Smooth scroll to section
    sideNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Back to Top Button
function initializeBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Progress Bar
function initializeProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// Cookie Consent
function initializeCookieConsent() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptButton = document.getElementById('acceptCookies');
    const settingsButton = document.getElementById('cookieSettings');

    if (!cookieConsent || !acceptButton) return;

    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieConsent.classList.add('visible');
        }, 2000);
    }

    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.classList.remove('visible');
    });

    settingsButton?.addEventListener('click', () => {
        // Implement cookie settings functionality
        console.log('Cookie settings clicked');
    });
}

// Smooth Scroll
function handleSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animations
function initializeAnimations() {
    // Feature cards hover effect
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle loading state
window.addEventListener('load', () => {
    document.querySelector('.loading-overlay')?.style.display = 'none';
});

// Handle responsive layout
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768) {
        document.getElementById('mobile-menu')?.classList.remove('active');
        document.getElementById('nav-menu')?.classList.remove('active');
        document.querySelector('.menu-overlay')?.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
}, 250));
