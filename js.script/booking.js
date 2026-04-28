document.addEventListener('DOMContentLoaded', function () {
  const clinicDoctors = {
    'Clinic Tuah': [
      { type: 'General Practitioner', name: 'Dr. Ahmad Hassan' },
      { type: 'Family Physician', name: 'Dr. Fatima Rahman' },
      { type: 'Internal Medicine Specialist', name: 'Dr. Mehdi Khan' },
      { type: 'Emergency Physician', name: 'Dr. Zainab Ali' }
    ],
    'Cosmetic clinic Whooper': [
      { type: 'Plastic Surgeon', name: 'Dr. Johan Aziz' },
      { type: 'Cosmetic Surgeon', name: 'Dr. Siti Nurhaliza' },
      { type: 'Dermatologist', name: 'Dr. Akyas M' },
      { type: 'Aesthetic Physician', name: 'Dr. Aisha Mohamed' }
    ],
    'Dental Clinic Amru': [
      { type: 'Cosmetic Dentist', name: 'Dr. Chen Wei' },
      { type: 'Prosthodontist', name: 'Dr. Lily Wong' },
      { type: 'Endodontist', name: 'Dr. Akmal Ali' }
    ],
    'kids clinic ISka': [
      { type: 'Pediatrician', name: 'Dr. Priya Sharma' },
      { type: 'Child Psychologist', name: 'Dr. Vikram Singh' },
      { type: 'Pediatric Surgeon', name: 'Dr. Kavya Patel' },
      { type: 'Neonatologist', name: 'Dr. Arjun Nair' }
    ]
  };

  const clinic = localStorage.getItem('selectedClinic') || 'Unknown Clinic';
  const doctorNameMap = {};
  const clinicNameElement = document.getElementById('clinicName');
  const doctorTypeSelect = document.getElementById('doctorType');
  const doctorNameDisplay = document.getElementById('doctorName');
  const bookingForm = document.querySelector('form.form');

  if (clinicNameElement) {
    clinicNameElement.innerText = 'Booking at: ' + clinic;
  }

  function populateDoctors() {
    const doctors = clinicDoctors[clinic] || [];

    doctors.forEach((doctorObj) => {
      const option = document.createElement('option');
      option.value = doctorObj.type;
      option.text = doctorObj.type;
      doctorTypeSelect.appendChild(option);
      doctorNameMap[doctorObj.type] = doctorObj.name;
    });
  }

  function showDoctorName() {
    const selectedType = doctorTypeSelect.value;

    if (selectedType && doctorNameMap[selectedType]) {
      doctorNameDisplay.innerText = doctorNameMap[selectedType];
    } else {
      doctorNameDisplay.innerText = '-- Select a doctor type --';
    }
  }

  function saveBooking(event) {
    event.preventDefault();

    const doctorType = doctorTypeSelect.value;
    const doctorName = doctorNameMap[doctorType] || '';
    const booking = {
      clinic,
      doctorType,
      doctorName,
      name: document.getElementById('userName').value,
      phone: document.getElementById('userPhone').value,
      icNumber: document.getElementById('userIC').value,
      email: document.getElementById('userEmail').value,
      painDescription: document.getElementById('painDescription').value,
      date: document.getElementById('bookingDate').value,
      time: document.getElementById('bookingTime').value
    };

    localStorage.setItem('bookingData', JSON.stringify(booking));
    window.location.href = 'confirm.html';
  }

  if (doctorTypeSelect) {
    doctorTypeSelect.addEventListener('change', showDoctorName);
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', saveBooking);
  }

  populateDoctors();

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
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
});
