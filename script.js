// Open Enquiry Modal
document.querySelectorAll('.book-now').forEach(button => {
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
