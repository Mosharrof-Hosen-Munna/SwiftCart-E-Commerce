const nav = document.getElementById('mobile-menu-button');
const menu = document.getElementById('mobile-menu');
nav.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});
