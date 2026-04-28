document.addEventListener('DOMContentLoaded', function () {
  emailjs.init('EFNQAwKhe4o6pyY0Z');

  const data = JSON.parse(localStorage.getItem('bookingData')) || {};
  const detailsElement = document.getElementById('details');
  const emailStatusElement = document.getElementById('emailStatus');

  if (detailsElement) {
    detailsElement.innerHTML = `
      <b>Clinic:</b> ${data.clinic || ''} <br>
      <b>Doctor Type:</b> ${data.doctorType || ''} <br>
      <b>Doctor Name:</b> ${data.doctorName || ''} <br>
      <b>Patient Name:</b> ${data.name || ''} <br>
      <b>Phone:</b> ${data.phone || ''} <br>
      <b>IC Number:</b> ${data.icNumber || ''} <br>
      <b>Pain/Symptoms:</b>
      <p style="text-align:left; background:#f8f9fa; padding:12px; border-radius:8px;">${data.painDescription || ''}</p>
      <b>Date:</b> ${data.date || ''} <br>
      <b>Time:</b> ${data.time || ''}
    `;
  }

  if (data.email) {
    emailjs.send('service_v3ot97g', 'template_5uq33qr', {
      user_name: data.name,
      clinic_name: data.clinic,
      doctor_type: data.doctorType,
      doctor_name: data.doctorName,
      booking_date: data.date,
      booking_time: data.time,
      user_email: data.email
    }).then(() => {
      if (emailStatusElement) {
        emailStatusElement.style.color = 'green';
        emailStatusElement.innerText = '✅ Confirmation email sent to ' + data.email;
      }
    }).catch((err) => {
      if (emailStatusElement) {
        emailStatusElement.style.color = 'red';
        emailStatusElement.innerText = '❌ Email failed to send.';
      }
      console.error('EmailJS error:', err);
    });
  } else if (emailStatusElement) {
    emailStatusElement.style.color = 'red';
    emailStatusElement.innerText = '❌ No booking data found.';
  }

  attachNavHandlers();
});

function attachNavHandlers() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  document.addEventListener('click', function (event) {
    if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}
