document.addEventListener('DOMContentLoaded', function () {
  const grayscaleToggle = document.getElementById('grayscaleToggle');
  const GRAYSCALE_KEY = 'grayscaleEnabled';

  if (!grayscaleToggle) {
    return;
  }

  function applyGrayscale(enabled) {
    document.body.classList.toggle('grayscale', enabled);
    grayscaleToggle.setAttribute('aria-pressed', String(enabled));
    grayscaleToggle.textContent = enabled ? 'Color mode' : 'Grayscale';
  }

  function loadGrayscalePreference() {
    const storedValue = localStorage.getItem(GRAYSCALE_KEY);
    const enabled = storedValue === 'true';
    applyGrayscale(enabled);
  }

  loadGrayscalePreference();

  grayscaleToggle.addEventListener('click', function () {
    const enabled = !document.body.classList.contains('grayscale');
    localStorage.setItem(GRAYSCALE_KEY, String(enabled));
    applyGrayscale(enabled);
  });
});
