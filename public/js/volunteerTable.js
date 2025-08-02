function loadVolunteers() {
  fetch('/data/volunteer.json')
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById('volunteerTableBody');
      tbody.innerHTML = "";

      data.forEach((volunteer, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${volunteer.name}</td>
            <td>${volunteer.city}</td>
            <td>${volunteer.phone}</td>
            <td>${volunteer.interest}</td>
          </tr>
        `;
        tbody.innerHTML += row;
      });
    })
    .catch(error => {
      console.error("Error loading volunteer data:", error);
    });
}

document.addEventListener("DOMContentLoaded", loadVolunteers);
