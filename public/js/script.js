const dropdownMenu = document.querySelector('.dropdown-menu');
const navbar = document.querySelector('.navbar');

if (dropdownMenu) {
  navbar.addEventListener("mouseleave", function(){
    dropdownMenu.classList.remove('show');
  });
};