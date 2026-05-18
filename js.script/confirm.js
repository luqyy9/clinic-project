document.addEventListener('DOMContentLoaded', function () {
  emailjs.init('EFNQAwKhe4o6pyY0Z');

  const bookings = JSON.parse(localStorage.getItem('bookingList')) || [];
  const data = bookings[bookings.length - 1] || {};
  const detailsElement = document.getElementById('details');
  const emailStatusElement = document.getElementById('emailStatus');

  if (detailsElement) {
    detailsElement.innerHTML = `
      <div class="confirm-summary">
        <div class="confirm-detail-card">
          <div class="confirm-detail-key" style="font-weight: bold;">Clinic:</div>
          <div class="confirm-detail-value">${data.clinic || 'Not specified'}</div>
        </div>
        <div class="confirm-detail-card">
          <div class="confirm-detail-key" style="font-weight: bold;">Appointment:</div>
          <div class="confirm-detail-value">${data.date || 'Not set'} • ${data.time || 'Not set'}</div>
        </div>
        <div class="confirm-detail-card">
          <div class="confirm-detail-key" style="font-weight: bold;">Doctor:</div>
          <div class="confirm-detail-value">${data.doctorName || data.doctor || 'TBD'} • ${data.doctorType || 'General'}</div>
        </div>
        <div class="confirm-detail-card">
          <div class="confirm-detail-key" style="font-weight: bold;">Patient:</div>
          <div class="confirm-detail-value">${data.name || 'Unknown'} • ${data.phone || 'No phone'}</div>
        </div>
        <div class="confirm-detail-card">
          <div class="confirm-detail-key" style="font-weight: bold;">IC Number:</div>
          <div class="confirm-detail-value">${data.icNumber || 'Not provided'}</div>
        </div>
        <div class="confirm-detail-card">
          <div class="confirm-detail-key" style="font-weight: bold;">Email:</div>
          <div class="confirm-detail-value">${data.email || 'Not provided'}</div>
        </div>
      </div>
      <div class="confirm-detail-panel">
        <div class="confirm-detail-panel-title" style="font-weight: bold;">Symptoms & notes:</div>
        <p class="confirm-symptoms">${data.painDescription || 'No additional symptom details were provided.'}</p>
      </div>
    `;
  }

  const whatsappBtn = document.getElementById('whatsappBtn');
  if (whatsappBtn) {
    const supportMessage = `Hello WOWClinicFinder, my appointment is confirmed for ${data.date || 'N/A'} at ${data.time || 'N/A'} with ${data.doctorName || 'a doctor'} at ${data.clinic || 'the clinic'}.`;
    whatsappBtn.href = `https://wa.me/60123456789?text=${encodeURIComponent(supportMessage)}`;
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
        emailStatusElement.style.color = '#50d650';
        emailStatusElement.innerText = '✅ Confirmation email sent to ' + data.email;
      }
    }).catch((err) => {
      if (emailStatusElement) {
        emailStatusElement.style.color = '#ff4757';
        emailStatusElement.innerText = '❌ Email failed to send. You can use the button below to send manually.';
      }
      console.error('EmailJS error:', err);
      createManualEmailLink(data);
    });
  } else if (emailStatusElement) {
    emailStatusElement.style.color = 'red';
    emailStatusElement.innerText = '❌ No booking data found.';
  }
});

function createManualEmailLink(data) {
  if (!data.email) return;
  const emailStatusElement = document.getElementById('emailStatus');
  const fallbackContainer = document.createElement('div');
  fallbackContainer.style.textAlign = 'center';
  fallbackContainer.style.marginTop = '16px';
  fallbackContainer.innerHTML = `
    <p>If automatic email sending fails, open your email client manually:</p>
    <a id="manualEmailLink" class="btn" href="#">Send Email Manually</a>
  `;

  if (emailStatusElement && emailStatusElement.parentNode) {
    emailStatusElement.parentNode.appendChild(fallbackContainer);
    const subject = encodeURIComponent('Appointment Confirmation - ' + (data.clinic || 'Clinic'));
    const body = encodeURIComponent(
      `Hello ${data.name || 'Patient'},\n\nYour appointment has been confirmed.\n\nClinic: ${data.clinic || ''}\nDoctor Type: ${data.doctorType || ''}\nDoctor Name: ${data.doctorName || ''}\nDate: ${data.date || ''}\nTime: ${data.time || ''}\n\nThank you,\nWOWClinicFinder`
    );
    const mailtoLink = `mailto:${data.email}?subject=${subject}&body=${body}`;
    const manualEmailLink = document.getElementById('manualEmailLink');
    if (manualEmailLink) manualEmailLink.href = mailtoLink;
  }
}
