// Sample blood bank data
const bloodBanks = [
  {
    name: "Red Cross Blood Bank",
    city: "Indore",
    address: "MG Road",
    contact: "+91 731 2547077",
    type: "Government",
    verified: true,
    directions: "Red+Cross+Blood+Bank+Indore"
  },
  {
    name: "Bombay Hospital Blood Bank",
    city: "Indore",
    address: "Ring Road, Vijay Nagar",
    contact: "+91 731 4771100",
    type: "Private",
    verified: true,
    directions: "Bombay+Hospital+Indore"
  },
  {
    name: "LifeLine Blood Bank",
    city: "Bhopal",
    address: "MP Nagar",
    contact: "+91 755 4099000",
    type: "Private",
    verified: false,
    directions: "LifeLine+Blood+Bank+Bhopal"
  },
  {
    name: "Jabalpur Govt Blood Bank",
    city: "Jabalpur",
    address: "Civil Lines",
    contact: "+91 761 1234567",
    type: "Government",
    verified: true,
    directions: "Jabalpur+Govt+Blood+Bank"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('bankTableBody');
  const cityFilter = document.getElementById('cityFilter');
  const nameSearch = document.getElementById('nameSearch');
  const noResults = document.getElementById('noResults');
  const form = document.getElementById('bloodBankForm');
  const alertBox = document.getElementById('bankFormAlert');

  // Populate City Dropdown
  const cities = [...new Set(bloodBanks.map(bank => bank.city))].sort();
  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    cityFilter.appendChild(option);
  });

  // Render Filtered Table
  function renderTable(data) {
    tableBody.innerHTML = '';
    noResults.classList.toggle('d-none', data.length > 0);

    data.forEach(bank => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${bank.name}</td>
        <td>${bank.city}</td>
        <td>${bank.address}</td>
        <td>${bank.contact}</td>
        <td>${bank.type}</td>
        <td>${bank.verified ? '<i class="fa-solid fa-circle-check text-success"></i>' : '<i class="fa-solid fa-circle-xmark text-muted"></i>'}</td>
        <td>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${bank.directions}" target="_blank" class="btn btn-sm btn-outline-danger">
            Get Directions
          </a>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Apply Filters
  function applyFilters() {
    const city = cityFilter.value.toLowerCase();
    const name = nameSearch.value.toLowerCase();

    const filtered = bloodBanks.filter(bank =>
      (city === '' || bank.city.toLowerCase() === city) &&
      (name === '' || bank.name.toLowerCase().includes(name))
    );

    renderTable(filtered);
  }

  // Reset Filters
  document.getElementById('resetBtn').addEventListener('click', () => {
    cityFilter.value = '';
    nameSearch.value = '';
    renderTable(bloodBanks);
  });

  // Add Filter Listeners
  cityFilter.addEventListener('change', applyFilters);
  nameSearch.addEventListener('input', applyFilters);

  // Add New Bank from Form
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const newBank = {
      name: formData.get('name'),
      city: formData.get('city'),
      address: formData.get('address'),
      contact: formData.get('contact'),
      type: formData.get('type'),
      verified: formData.get('verified') === 'Yes',
      directions: formData.get('map')
    };

    bloodBanks.push(newBank);
    renderTable(bloodBanks);
    form.reset();

    // Show Success Alert
    alertBox.classList.remove('d-none');
    setTimeout(() => alertBox.classList.add('d-none'), 3000);

    // Add city to filter if new
    if (![...cityFilter.options].some(opt => opt.value === newBank.city)) {
      const opt = document.createElement('option');
      opt.value = newBank.city;
      opt.textContent = newBank.city;
      cityFilter.appendChild(opt);
    }
  });

  // Initial Render
  renderTable(bloodBanks);
});
