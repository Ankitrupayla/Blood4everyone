document.addEventListener("DOMContentLoaded", () => {
  fetch("/public/partials/header.html")
    .then((res) => res.text())
    .then((data) => (document.getElementById("header").innerHTML = data));

  fetch("/public/partials/footer.html")
    .then((res) => res.text())
    .then((data) => (document.getElementById("footer").innerHTML = data));
});
