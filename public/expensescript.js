// Initialize all functionality when DOM is loaded
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

// Mobile Menu with improved dropdown handling
function initializeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const dropdowns = document.querySelectorAll('.dropdown');
    let isMenuOpen = false;

    mobileMenu?.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        toggleMenu(isMenuOpen);
    });

    function toggleMenu(show) {
        mobileMenu.classList.toggle('active', show);
        navMenu.classList.toggle('active', show);
        menuOverlay.classList.toggle('active', show);
        document.body.classList.toggle('no-scroll', show);
        
        // Reset dropdowns when closing menu
        if (!show) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    }

    // Enhanced dropdown handling for mobile
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');

        link?.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();

                // Close other dropdowns
                dropdowns.forEach(d => {
                    if (d !== dropdown && d.classList.contains('active')) {
                        d.classList.remove('active');
                    }
                });

                dropdown.classList.toggle('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
            isMenuOpen = false;
            toggleMenu(false);
        }
    });

    // Close menu when clicking overlay
    menuOverlay?.addEventListener('click', () => {
        isMenuOpen = false;
        toggleMenu(false);
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            isMenuOpen = false;
            toggleMenu(false);
        }
    });
}

// Enhanced Horizontal Navigation
function initializeHorizontalNav() {
    const nav = document.querySelector('.side-nav nav');
    const navLinks = document.querySelectorAll('.side-nav .nav-link');
    const sections = document.querySelectorAll('[data-section]');
    let isScrolling = false;
    let scrollTimeout;

    // Improved smooth scroll behavior
    nav.style.scrollBehavior = 'smooth';

    // Enhanced mouse wheel horizontal scroll
    nav.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            nav.scrollLeft += e.deltaY;
            
            // Clear previous timeout
            clearTimeout(scrollTimeout);
            
            // Set new timeout
            scrollTimeout = setTimeout(() => {
                snapToNearestLink();
            }, 150);
        }
    });

    // Improved drag to scroll
    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let lastPageX;
    let frameId;

    nav.addEventListener('mousedown', (e) => {
        isDown = true;
        nav.style.cursor = 'grabbing';
        startX = e.pageX - nav.offsetLeft;
        scrollLeft = nav.scrollLeft;
        lastPageX = e.pageX;
        cancelAnimationFrame(frameId);
    });

    nav.addEventListener('mouseleave', () => {
        isDown = false;
        nav.style.cursor = 'grab';
    });

    nav.addEventListener('mouseup', () => {
        isDown = false;
        nav.style.cursor = 'grab';
        
        // Add momentum scrolling
        const momentumScroll = () => {
            if (Math.abs(velocity) > 0.1) {
                nav.scrollLeft += velocity;
                velocity *= 0.95;
                frameId = requestAnimationFrame(momentumScroll);
            } else {
                snapToNearestLink();
            }
        };
        
        momentumScroll();
    });

    nav.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - nav.offsetLeft;
        const walk = (x - startX) * 2;
        nav.scrollLeft = scrollLeft - walk;
        
        // Calculate velocity
        velocity = lastPageX - e.pageX;
        lastPageX = e.pageX;
    });

    // Snap to nearest link after scrolling
    function snapToNearestLink() {
        const links = Array.from(navLinks);
        let nearestLink = links[0];
        let nearestDistance = Infinity;

        links.forEach(link => {
            const rect = link.getBoundingClientRect();
            const distance = Math.abs(rect.left - nav.getBoundingClientRect().left);
            
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestLink = link;
            }
        });

        nearestLink.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }

    // Update active section on scroll
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

                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                setTimeout(() => {
                    isScrolling = false;
                }, 1000);
            }
        });
    });
}

// Improved Scroll Reveal
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

// Enhanced Back to Top Button
function initializeBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    const scrollThreshold = 300;
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                if (window.pageYOffset > scrollThreshold) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Improved Progress Bar
function initializeProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = (window.pageYOffset / windowHeight) * 100;
                progressBar.style.width = `${scrolled}%`;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Enhanced Header Scroll Effect
function initializeHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                if (currentScroll > lastScroll && currentScroll > 300) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }

                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Improved Cookie Consent
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

// Enhanced Smooth Scroll
function handleSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;

            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced Animations
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

// Improved Debounce Utility
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

// Enhanced responsive layout handling
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768) {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        const menuOverlay = document.querySelector('.menu-overlay');
        
        mobileMenu?.classList.remove('active');
        navMenu?.classList.remove('active');
        menuOverlay?.classList.remove('active');
        document.body.classList.remove('no-scroll');
        
        // Reset all dropdowns
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
}, 250));
