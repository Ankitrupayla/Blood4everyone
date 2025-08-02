document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('requestForm');
  const alertBox = document.getElementById('requestAlert');
  const requestTable = document.getElementById('requestTable').querySelector('tbody');

  // Load existing requests from JSON
  fetch('/data/request.json')
    .then(res => res.json())
    .then(data => data.forEach(req => appendRow(req)))
    .catch(err => console.error('Error loading requests:', err));

  // Form submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(form);
    const request = {
      name: formData.get('name').trim(),
      phone: formData.get('phone').trim(),
      bloodType: formData.get('bloodType'),
      units: formData.get('units'),
      hospital: formData.get('hospital').trim(),
      location: formData.get('location').trim(),
      details: formData.get('details').trim(),
      time: new Date().toLocaleString(),
      completed: false
    };

    // Add to table
    appendRow(request);

    // Show alert
    alertBox.classList.remove('d-none');
    setTimeout(() => alertBox.classList.add('d-none'), 3000);

    // Reset form
    form.reset();

    // Send to WhatsApp
    sendToWhatsApp(request);
  });

  // Append request row to table
  function appendRow(data) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.bloodType}</td>
      <td>${data.units}</td>
      <td>${data.hospital}</td>
      <td>${data.location}</td>
      <td>${data.phone}</td>
      <td>${data.time}</td>
      <td class="status-cell"><span class="badge bg-warning text-dark">Pending</span></td>
      <td>
        <button class="btn btn-success btn-sm me-2 mark-btn" title="Mark as Complete">
          <i class="bi bi-check-circle"></i>
        </button>
        <button class="btn btn-danger btn-sm delete-btn" title="Delete">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    `;

    const markBtn = row.querySelector('.mark-btn');
    const deleteBtn = row.querySelector('.delete-btn');
    const statusCell = row.querySelector('.status-cell');

    markBtn.addEventListener('click', () => {
      const isComplete = row.classList.toggle('table-success');
      const icon = markBtn.querySelector('i');
      statusCell.innerHTML = isComplete
        ? '<span class="badge bg-success">Completed</span>'
        : '<span class="badge bg-warning text-dark">Pending</span>';
      icon.className = isComplete ? 'bi bi-check-circle-fill' : 'bi bi-check-circle';
    });

    deleteBtn.addEventListener('click', () => row.remove());

    requestTable.prepend(row);
  }

  // Send request to WhatsApp
  function sendToWhatsApp(data) {
    const message = `🩸 *Blood Request*\n\n` +
      `👤 Name: ${data.name}\n` +
      `📞 Phone: ${data.phone}\n` +
      `🩸 Blood Group: ${data.bloodType}\n` +
      `💉 Units Needed: ${data.units}\n` +
      `🏥 Hospital: ${data.hospital}\n` +
      `📍 Location: ${data.location}\n` +
      `📝 Details: ${data.details || 'N/A'}\n\n` +
      `Please help if you can! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '917440989857'; // Replace with real number
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
  }
});
