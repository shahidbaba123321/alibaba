// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle mobile menu
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Handle dropdowns in mobile view
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });
            }
        });
    });

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        
        // Close all dropdowns
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && !link.parentElement.classList.contains('dropdown')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});

// Sentiment Analysis Demo
function analyzeSentiment() {
    const input = document.getElementById('analysis-input').value;
    const resultDiv = document.getElementById('analysis-result');
    
    if (!input.trim()) {
        showError(resultDiv, 'Please enter some text to analyze');
        return;
    }

    resultDiv.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Analyzing sentiment...</p>
        </div>
    `;
    
    setTimeout(() => {
        const sentiments = ['Positive', 'Negative', 'Neutral'];
        const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
        const confidence = (Math.random() * (0.99 - 0.70) + 0.70).toFixed(2);
        
        resultDiv.innerHTML = `
            <div class="analysis-result ${randomSentiment.toLowerCase()}">
                <h4>Analysis Result:</h4>
                <p>Sentiment: ${randomSentiment}</p>
                <p>Confidence: ${confidence}</p>
            </div>
        `;
    }, 1500);
}

// Show Error Message
function showError(element, message) {
    element.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            ${message}
        </div>
    `;
}

// Copy Code Function
function copyCode() {
    const codeElement = document.querySelector('.code-snippet code');
    const textArea = document.createElement('textarea');
    textArea.value = codeElement.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    const copyBtn = document.querySelector('.copy-btn');
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
    }, 2000);
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add scroll animation class to elements
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
});
