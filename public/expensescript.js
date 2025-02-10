document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeScrollReveal();
    initializeHorizontalNav();
    initializeBackToTop();
    initializeProgressBar();
    initializeCookieConsent();
    handleSmoothScroll();
    initializeAnimations();
    initializeHeaderScroll();
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

    menuOverlay?.addEventListener('click', () => {
        toggleMenu(false);
    });
}

// Horizontal Navigation
function initializeHorizontalNav() {
    const nav = document.querySelector('.side-nav nav');
    const navLinks = document.querySelectorAll('.side-nav .nav-link');
    const sections = document.querySelectorAll('[data-section]');
    let isScrolling = false;

    // Add mouse wheel horizontal scroll
    nav.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            nav.scrollLeft += e.deltaY;
        }
    });

    // Drag to scroll
    let isDown = false;
    let startX;
    let scrollLeft;

    nav.addEventListener('mousedown', (e) => {
        isDown = true;
        nav.style.cursor = 'grabbing';
        startX = e.pageX - nav.offsetLeft;
        scrollLeft = nav.scrollLeft;
    });

    nav.addEventListener('mouseleave', () => {
        isDown = false;
        nav.style.cursor = 'grab';
    });

    nav.addEventListener('mouseup', () => {
        isDown = false;
        nav.style.cursor = 'grab';
    });

    nav.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - nav.offsetLeft;
        const walk = (x - startX) * 2;
        nav.scrollLeft = scrollLeft - walk;
    });

    // Update active link on scroll
    window.addEventListener('scroll', debounce(() => {
        if (!isScrolling) {
            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const scrollPosition = window.pageYOffset;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('data-section');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === currentSection) {
                    link.classList.add('active');
                    // Scroll active link into view
                    link.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }
            });
        }
    }, 100));
    // Smooth scroll to section when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            isScrolling = true;
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update active class
                navLinks.forEach(link => link.classList.remove('active'));
                link.classList.add('active');

                // Reset isScrolling after animation
                setTimeout(() => {
                    isScrolling = false;
                }, 1000);
            }
        });
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

// Back to Top Button
function initializeBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, 100));

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

    window.addEventListener('scroll', debounce(() => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    }, 10));
}

// Header Scroll Effect
function initializeHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, 50));
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
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animations
function initializeAnimations() {
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
