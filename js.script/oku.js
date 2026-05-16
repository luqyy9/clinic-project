// ============================================================
// OKU ACCESSIBILITY FEATURES — oku.js
// ============================================================

let ttsActive = false;

// --- Restore saved preferences on page load ---
document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('oku-large-text') === 'true') {
    document.body.classList.add('large-text');
    const btn = document.getElementById('btnLargeText');
    if (btn) btn.classList.add('oku-btn-active');
  }
  if (localStorage.getItem('oku-contrast') === 'true') {
    document.body.classList.add('high-contrast');
    const btn = document.getElementById('btnContrast');
    if (btn) btn.classList.add('oku-btn-active');
  }
});

// --- 1. Large Text Toggle ---
function toggleLargeText() {
  const isOn = document.body.classList.toggle('large-text');
  localStorage.setItem('oku-large-text', isOn);
  const btn = document.getElementById('btnLargeText');
  if (btn) btn.classList.toggle('oku-btn-active', isOn);
}

// --- 2. High Contrast Toggle ---
function toggleContrast() {
  const isOn = document.body.classList.toggle('high-contrast');
  localStorage.setItem('oku-contrast', isOn);
  const btn = document.getElementById('btnContrast');
  if (btn) btn.classList.toggle('oku-btn-active', isOn);
}

// --- 3. Text-to-Speech — toggles on/off ---
function speakPage() {
  if (!window.speechSynthesis) {
    alert('Sorry, your browser does not support text-to-speech.');
    return;
  }

  const btn = document.getElementById('btnSpeak');

  if (ttsActive) {
    window.speechSynthesis.cancel();
    ttsActive = false;
    if (btn) { btn.textContent = '🔊 Read Aloud'; btn.classList.remove('oku-btn-active'); }
    return;
  }

  const selectors = ['h1', 'h2', 'h3', 'p', 'label', 'td', 'th', '.card'];
  let text = '';
  document.querySelectorAll(selectors.join(',')).forEach(el => {
    const t = el.innerText?.trim();
    if (t && t.length > 1) text += t + '. ';
  });
  if (!text) text = document.body.innerText;

  const utterance = new SpeechSynthesisUtterance(text.slice(0, 5000));
  utterance.lang = 'en-US';
  utterance.rate = 0.9;

  utterance.onend = function () {
    ttsActive = false;
    if (btn) { btn.textContent = '🔊 Read Aloud'; btn.classList.remove('oku-btn-active'); }
  };
  utterance.onerror = function () {
    ttsActive = false;
    if (btn) { btn.textContent = '🔊 Read Aloud'; btn.classList.remove('oku-btn-active'); }
  };

  ttsActive = true;
  if (btn) { btn.textContent = '⏹ Stop Reading'; btn.classList.add('oku-btn-active'); }
  window.speechSynthesis.speak(utterance);
}

window.addEventListener('beforeunload', () => {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && ttsActive) {
    window.speechSynthesis.cancel();
    ttsActive = false;
    const btn = document.getElementById('btnSpeak');
    if (btn) { btn.textContent = '🔊 Read Aloud'; btn.classList.remove('oku-btn-active'); }
  }
});