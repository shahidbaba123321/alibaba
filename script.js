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

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            toggleMenu(false);
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });

    // Initialize smooth scroll
    initSmoothScroll();
});

// Smooth Scroll Implementation
function initSmoothScroll() {
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
}

// Sentiment Analysis Demo
function analyzeSentiment() {
    const input = document.getElementById('analysis-input').value;
    const resultDiv = document.getElementById('analysis-result');
    
    if (!input.trim()) {
        showError(resultDiv, 'Please enter some text to analyze');
        return;
    }

    // Show loading state
    resultDiv.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Analyzing sentiment...</p>
        </div>
    `;
    
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

// Resume Parser Demo
function handleResumeUpload(event) {
    const file = event.target.files[0];
    const resultDiv = document.getElementById('resume-result');

    if (!file) return;

    // Show loading state
    resultDiv.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Analyzing resume...</p>
        </div>
    `;

    // Simulate file processing
    setTimeout(() => {
        resultDiv.innerHTML = `
            <div class="resume-analysis">
                <h4>Extracted Information:</h4>
                <ul>
                    <li>Name: John Doe</li>
                    <li>Experience: 5 years</li>
                    <li>Skills: AI, Machine Learning, HR Tech</li>
                </ul>
            </div>
        `;
    }, 2000);
}

// Copy Code Function
function copyCode() {
    const codeElement = document.querySelector('.code-snippet code');
    const textArea = document.createElement('textarea');
    textArea.value = codeElement.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        console.error('Failed to copy code:', err);
        showCopyError();
    } finally {
        document.body.removeChild(textArea);
    }
}

function showCopySuccess() {
    const copyBtn = document.querySelector('.copy-btn');
    const originalHTML = copyBtn.innerHTML;
    
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    copyBtn.classList.add('success');
    
    setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.classList.remove('success');
    }, 2000);
}

function showCopyError() {
    const copyBtn = document.querySelector('.copy-btn');
    const originalHTML = copyBtn.innerHTML;
    
    copyBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
    copyBtn.classList.add('error');
    
    setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.classList.remove('error');
    }, 2000);
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

// Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', () => {
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

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Initialize file upload listener
    const resumeUpload = document.getElementById('resume-upload');
    if (resumeUpload) {
        resumeUpload.addEventListener('change', handleResumeUpload);
    }
});

// API Explorer Demo
document.getElementById('try-api')?.addEventListener('click', function() {
    const responseDiv = document.getElementById('api-response');
    
    responseDiv.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Fetching data...</p>
        </div>
    `;

    // Simulate API call
    setTimeout(() => {
        const mockResponse = {
            status: 'success',
            data: {
                employees: [
                    { id: 1, name: 'John Doe', department: 'Engineering' },
                    { id: 2, name: 'Jane Smith', department: 'HR' }
                ]
            }
        };

        responseDiv.innerHTML = `
            <pre><code class="language-json">
${JSON.stringify(mockResponse, null, 2)}
            </code></pre>
        `;
    }, 1500);
});
