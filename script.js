// Open Enquiry Modal for Hero Section Button
document.getElementById('hero-cta').addEventListener('click', () => {
  document.getElementById('enquiry-modal').style.display = 'block';
});

// Open Enquiry Modal for Learn More Buttons
document.querySelectorAll('.learn-more').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('enquiry-modal').style.display = 'block';
  });
});

// Close Enquiry Modal
document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('enquiry-modal').style.display = 'none';
});

// Handle Form Submission
document.getElementById('enquiry-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for your enquiry! We will get back to you soon.');
  document.getElementById('enquiry-modal').style.display = 'none';
});

// Intersection Observer for Lazy Loading Animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.destination-card, .service-card, .testimonial-card').forEach(card => {
  observer.observe(card);
});

// Add Animation Class
document.querySelectorAll('.animate').forEach(el => {
  el.style.transform = 'translateY(0)';
  el.style.opacity = '1';
});
