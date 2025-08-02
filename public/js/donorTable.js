let donorList = [];

// Render donor data in table
function renderDonors() {
  const tableBody = document.querySelector('#donorTable tbody');
  tableBody.innerHTML = '';

  donorList.forEach((donor, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${donor.name}</td>
      <td>${donor.bloodType}</td>
      <td>${donor.city}</td>
      <td>${donor.mobile}</td>
      <td><a href="tel:${donor.mobile}" class="btn btn-sm btn-success"><i class="fas fa-phone"></i></a></td>
      <td><button class="btn btn-sm btn-warning" onclick="editDonor(${index})"><i class="fas fa-edit"></i></button></td>
      <td><a href="https://www.google.com/maps/search/${donor.city}" target="_blank" class="btn btn-sm btn-info"><i class="fas fa-map-marker-alt"></i></a></td>
    `;
    tableBody.appendChild(row);
  });
}

// Submit donor form
document.getElementById('donorForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const donor = {
    name: document.getElementById('name').value.trim(),
    bloodType: document.getElementById('bloodType').value,
    city: document.getElementById('city').value.trim(),
    mobile: document.getElementById('mobile').value.trim(),
    pincode: document.getElementById('pincode').value.trim()
  };

  donorList.push(donor);
  renderDonors();
  this.reset(); // clear form
});

// Filter donors
function searchDonors() {
  const bloodType = document.getElementById('searchBloodType').value;
  const city = document.getElementById('searchCity').value.trim().toLowerCase();

  const filtered = donorList.filter(donor => {
    const matchesBlood = !bloodType || donor.bloodType === bloodType;
    const matchesCity = !city || donor.city.toLowerCase().includes(city);
    return matchesBlood && matchesCity;
  });

  const tableBody = document.querySelector('#donorTable tbody');
  tableBody.innerHTML = '';

  filtered.forEach((donor, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${donor.name}</td>
      <td>${donor.bloodType}</td>
      <td>${donor.city}</td>
      <td>${donor.mobile}</td>
      <td><a href="tel:${donor.mobile}" class="btn btn-sm btn-success"><i class="fas fa-phone"></i></a></td>
      <td><button class="btn btn-sm btn-warning" onclick="editDonor(${index})"><i class="fas fa-edit"></i></button></td>
      <td><a href="https://www.google.com/maps/search/${donor.city}" target="_blank" class="btn btn-sm btn-info"><i class="fas fa-map-marker-alt"></i></a></td>
    `;
    tableBody.appendChild(row);
  });
}

// Edit donor (optional)
function editDonor(index) {
  const donor = donorList[index];
  document.getElementById('name').value = donor.name;
  document.getElementById('bloodType').value = donor.bloodType;
  document.getElementById('city').value = donor.city;
  document.getElementById('mobile').value = donor.mobile;
  document.getElementById('pincode').value = donor.pincode;

  document.getElementById('submitBtn').classList.add('d-none');
  document.getElementById('updateBtn').classList.remove('d-none');

  document.getElementById('updateBtn').onclick = function () {
    donorList[index] = {
      name: document.getElementById('name').value.trim(),
      bloodType: document.getElementById('bloodType').value,
      city: document.getElementById('city').value.trim(),
      mobile: document.getElementById('mobile').value.trim(),
      pincode: document.getElementById('pincode').value.trim()
    };
    renderDonors();
    document.getElementById('donorForm').reset();
    document.getElementById('submitBtn').classList.remove('d-none');
    document.getElementById('updateBtn').classList.add('d-none');
  };
}
