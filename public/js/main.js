// js/main.js

document.getElementById("requestForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Collect form input values
  const name = document.getElementById("name").value;
  const bloodGroup = document.getElementById("bloodGroup").value;
  const city = document.getElementById("city").value;
  const mobile = document.getElementById("mobile").value;
  const info = document.getElementById("info").value;

  // Get today's date
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0]; // format: YYYY-MM-DD

  // Create request object
  const request = {
    name,
    bloodGroup,
    city,
    mobile,
    info,
    date: formattedDate,
    status: "Pending"
  };

  // Get existing requests from localStorage
  const requests = JSON.parse(localStorage.getItem("bloodRequests")) || [];

  // Add new request
  requests.push(request);

  // Save updated array
  localStorage.setItem("bloodRequests", JSON.stringify(requests));

  // Optionally clear form
  e.target.reset();

  // Reload table instantly
  loadRequestsToTable();
});
