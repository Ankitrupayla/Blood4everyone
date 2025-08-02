document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('volunteerForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      name: form.querySelector('#name').value.trim(),
      email: form.querySelector('#email').value.trim(),
      phone: form.querySelector('#phone').value.trim(),
      city: form.querySelector('#city').value.trim(),
      interest: form.querySelector('#interest').value.trim(),
    };

    if (!data.name || !data.email || !data.phone || !data.city || !data.interest) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        form.reset();
        loadVolunteers(); // Reload table after submission
      } else {
        alert(result.error || 'Something went wrong.');
      }
    } catch (error) {
      alert('Network error. Please try again later.');
      console.error(error);
    }
  });
});
