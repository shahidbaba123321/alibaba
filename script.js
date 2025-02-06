// Toggle mobile menu
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');
mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Carousel functionality
let currentIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
function showNextTestimonial() {
    testimonials[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % testimonials.length;
    testimonials[currentIndex].classList.add('active');
}
setInterval(showNextTestimonial, 5000);

// Lazy loading for resource-heavy sections
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyLoad = (target) => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.onload = () => img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        io.observe(target);
    };
    lazyImages.forEach(lazyLoad);
});
