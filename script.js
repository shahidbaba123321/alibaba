// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// AI Sentiment Analysis Demo
function analyzeSentiment() {
    const input = document.getElementById('analysis-input').value;
    const resultDiv = document.getElementById('analysis-result');
    
    if (!input.trim()) {
        showError(resultDiv, 'Please enter some text to analyze');
        return;
    }

    // Show loading spinner
    resultDiv.innerHTML = '<div class="spinner"></div>';
    
    // Simulate API call
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

// API Explorer
class APIExplorer {
    constructor() {
        this.tryButton = document.getElementById('try-api');
        this.responseDiv = document.getElementById('api-response');
        this.init();
    }

    init() {
        if (this.tryButton) {
            this.tryButton.addEventListener('click', () => this.makeRequest());
        }
    }

    async makeRequest() {
        this.responseDiv.innerHTML = '<div class="spinner"></div>';

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const mockResponse = {
                status: 'success',
                data: {
                    employees: [
                        { id: 1, name: 'John Doe', department: 'Engineering' },
                        { id: 2, name: 'Jane Smith', department: 'Marketing' }
                    ]
                }
            };

            this.displayResponse(mockResponse);
        } catch (error) {
            this.displayError(error);
        }
    }

    displayResponse(response) {
        this.responseDiv.innerHTML = `
            <pre><code class="language-json">
${JSON.stringify(response, null, 2)}
            </code></pre>
        `;
        Prism.highlightAll();
    }

    displayError(error) {
        this.responseDiv.innerHTML = `
            <div class="error-message">
                Error: ${error.message}
            </div>
        `;
    }
}

// Form Validation
class FormValidator {
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }

    static validatePassword(password) {
        return password.length >= 8;
    }

    static showError(element, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        element.parentNode.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
}

// Lazy Loading Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new APIExplorer();
    lazyLoadImages();
    
    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        new Tooltip(tooltip);
    });
});

// Handle scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
