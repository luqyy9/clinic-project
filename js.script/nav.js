document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!navToggle || !navMenu) return;

  function updateNavExpanded() {
    const isExpanded = navMenu.classList.contains('active');
    navToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    document.body.classList.toggle('nav-open', isExpanded);
  }

  function closeNavigation() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    updateNavExpanded();
  }

  navToggle.addEventListener('click', function (event) {
    event.stopPropagation();
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    updateNavExpanded();
  });

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', function () {
      closeNavigation();
    });
  });

  document.addEventListener('click', function (event) {
    if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
      closeNavigation();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
      closeNavigation();
    }
  });
});
