let navToggle = document.querySelector('.toggle'),
    navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
});