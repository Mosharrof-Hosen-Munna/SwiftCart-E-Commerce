function loadComponent(id, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

loadComponent("navbar", "shared/navbar.html");
loadComponent("footer", "shared/footer.html");