// Survey Form Handler
document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        country: document.getElementById('country').value,
        interests: Array.from(document.querySelectorAll('input[name="interests"]:checked'))
            .map(cb => cb.value),
        duration: document.getElementById('duration').value,
        budget: document.getElementById('budget').value,
        transport: document.querySelector('input[name="transport"]:checked').value
    };
    
    // Store in localStorage for use in map page
    localStorage.setItem('userPreferences', JSON.stringify(formData));
    
    // Show loading animation
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.innerHTML = 'Processing... ⏳';
    submitBtn.disabled = true;
    
    // Redirect to map after short delay
    setTimeout(() => {
        window.location.href = 'map.html';
    }, 1000);
});

// Add some visual feedback on checkbox/radio selection
document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
    input.addEventListener('change', function() {
        if (this.type === 'checkbox') {
            this.parentElement.style.fontWeight = this.checked ? 'bold' : 'normal';
        }
    });
});
