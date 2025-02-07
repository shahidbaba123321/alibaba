// Mobile Menu and Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle mobile menu
    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    function toggleMenu(force = null) {
        const isActive = force !== null ? force : !mobileMenu.classList.contains('active');
        mobileMenu.classList.toggle('active', isActive);
        navMenu.classList.toggle('active', isActive);
        menuOverlay.classList.toggle('active', isActive);
        body.classList.toggle('menu-open', isActive);
    }

    // Handle dropdowns in mobile view
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });
                
                dropdown.classList.toggle('active');
            }
        });

        // Prevent dropdown content clicks from closing the menu
        dropdownContent?.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.stopPropagation();
            }
        });
    });

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', () => {
        toggleMenu(false);
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    });

    // Initialize progress circles
    initializeProgressCircles();
    
    // Initialize performance metrics
    initializePerformanceMetrics();
    
    // Initialize smooth scroll
    initSmoothScroll();
});

// Progress Circles Animation
function initializeProgressCircles() {
    const circles = document.querySelectorAll('.progress-circle');
    
    circles.forEach(circle => {
        const progress = circle.getAttribute('data-progress');
        const circumference = 2 * Math.PI * 19; // radius = 19 (40px diameter - 2px border)
        const offset = circumference - (progress / 100 * circumference);
        
        // Create SVG circle
        circle.innerHTML = `
            <svg width="40" height="40" viewBox="0 0 40 40">
                <circle
                    cx="20"
                    cy="20"
                    r="19"
                    fill="none"
                    stroke="#e9ecef"
                    stroke-width="2"
                />
                <circle
                    cx="20"
                    cy="20"
                    r="19"
                    fill="none"
                    stroke="var(--primary-color)"
                    stroke-width="2"
                    stroke-dasharray="${circumference}"
                    stroke-dashoffset="${offset}"
                    transform="rotate(-90 20 20)"
                />
                <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="12">
                    ${progress}%
                </text>
            </svg>
        `;
    });
}

// Performance Metrics Animation
function initializePerformanceMetrics() {
    const metrics = document.querySelectorAll('.metric-item .progress');
    
    metrics.forEach(metric => {
        const width = metric.style.width;
        metric.style.width = '0';
        setTimeout(() => {
            metric.style.width = width;
        }, 100);
    });
}

// Smooth Scroll Implementation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Calendar Functionality
function initializeCalendar() {
    const calendar = document.querySelector('.calendar-view');
    if (!calendar) return;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Update calendar dates
    updateCalendarDates(currentDate);
}

function updateCalendarDates(date) {
    const daysContainer = document.querySelector('.calendar-header .dates');
    if (!daysContainer) return;

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    // Clear existing dates
    daysContainer.innerHTML = '';

    // Add dates
    for (let i = 1; i <= 5; i++) {
        const dateSpan = document.createElement('span');
        dateSpan.textContent = i;
        daysContainer.appendChild(dateSpan);
    }
}

// Graph Animation
function initializeGraph() {
    const graphContainer = document.querySelector('.graph-container');
    if (!graphContainer) return;

    // Add graph animation
    const graph = document.createElement('div');
    graph.classList.add('graph-line');
    graphContainer.appendChild(graph);

    // Animate graph line
    setTimeout(() => {
        graph.style.width = '100%';
    }, 500);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCalendar();
    initializeGraph();
    
    // Add scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        const menuOverlay = document.querySelector('.menu-overlay');
        
        mobileMenu?.classList.remove('active');
        navMenu?.classList.remove('active');
        menuOverlay?.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Error Handler
function showError(element, message) {
    element.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            ${message}
        </div>
    `;
}

// Success Handler
function showSuccess(element, message) {
    element.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            ${message}
        </div>
    `;
}

// Loading State Handler
function showLoading(element, message = 'Loading...') {
    element.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>${message}</p>
        </div>
    `;
}

// Add touch support for mobile devices
document.addEventListener('touchstart', function() {}, true);
