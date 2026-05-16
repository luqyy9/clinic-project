document.addEventListener('DOMContentLoaded', async function () {
  const clinicSelect = document.getElementById('clinicSelect');
  const doctorGrid = document.getElementById('doctorGrid');
  let clinicDoctors = {};
  let selectedClinic = localStorage.getItem('selectedClinic') || '';
  let doctorNameMap = {};
  const clinicNameElement = document.getElementById('clinicName');
  const doctorTypeSelect = document.getElementById('doctorType');
  const doctorNameDisplay = document.getElementById('doctorName');
  const bookingForm = document.querySelector('form.form');

  async function loadClinicData() {
    try {
      const response = await fetch('clinics.json');
      clinicDoctors = await response.json();
    } catch (error) {
      console.error('Unable to load clinics.json:', error);
      doctorGrid.innerHTML = '<p class="no-doctors">Unable to load clinic data. Please refresh.</p>';
      clinicDoctors = {};
    }
  }

  function updateClinicText(clinic) {
    if (clinicNameElement) {
      clinicNameElement.innerText = clinic ? 'Booking at: ' + clinic : 'Select a clinic to begin';
    }
  }

  function renderClinicOptions() {
    clinicSelect.innerHTML = '';
    Object.keys(clinicDoctors).forEach((clinicName) => {
      const option = document.createElement('option');
      option.value = clinicName;
      option.text = clinicName;
      clinicSelect.appendChild(option);
    });
    clinicSelect.value = selectedClinic;
  }

  function renderDoctorGrid(clinic) {
    const doctors = clinicDoctors[clinic] || [];
    doctorGrid.innerHTML = '';

    if (!doctors.length) {
      doctorGrid.innerHTML = '<p class="no-doctors">No doctors are available for this clinic.</p>';
      return;
    }

    doctors.forEach((doctor) => {
      const card = document.createElement('div');
      card.className = 'doctor-card';
      card.innerHTML = `
        <img src="${doctor.image}" alt="${doctor.name}">
        <h3>${doctor.name}</h3>
        <p class="specialty">${doctor.specialty}</p>
        <p class="hospital">${doctor.hospital}</p>
        <button class="view-profile-btn" onclick="viewDoctorProfile('${doctor.slug}')">View Profile</button>
      `;
      doctorGrid.appendChild(card);
    });
  }

  function populateDoctors(clinic) {
    doctorTypeSelect.innerHTML = '<option value="">-- Select Doctor Type --</option>';
    const doctors = clinicDoctors[clinic] || [];

    doctorNameMap = {};
    doctors.forEach((doctor) => {
      const option = document.createElement('option');
      option.value = doctor.type;
      option.text = doctor.type;
      doctorTypeSelect.appendChild(option);
      doctorNameMap[doctor.type] = doctor.name;
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

  function handleClinicChange(event) {
    selectedClinic = event.target.value;
    localStorage.setItem('selectedClinic', selectedClinic);
    updateClinicText(selectedClinic);
    populateDoctors(selectedClinic);
    renderDoctorGrid(selectedClinic);
    doctorNameDisplay.innerText = '-- Select a doctor type --';
  }

  function saveBooking(event) {
    event.preventDefault();

    const doctorType = doctorTypeSelect.value;
    const doctorName = doctorNameMap[doctorType] || '';

    const ic = document.getElementById('userIC').value;
    const phone = document.getElementById('userPhone').value;
    const date = document.getElementById('bookingDate').value;

    if (!/^\d{12}$/.test(ic)) {
      alert('IC number must be exactly 12 digits with no dashes.');
      return;
    }

    if (!/^01[0-9]{8,9}$/.test(phone)) {
      alert('Phone number must be Malaysian format e.g. 0123456789');
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    if (date < today) {
      alert('Please select a future date.');
      return;
    }

    const booking = {
      clinic: selectedClinic,
      doctorType,
      doctorName,
      name: document.getElementById('userName').value,
      phone,
      icNumber: ic,
      email: document.getElementById('userEmail').value,
      painDescription: document.getElementById('painDescription').value,
      date,
      time: document.getElementById('bookingTime').value,
      status: 'Pending'
    };

    const existing = JSON.parse(localStorage.getItem('bookingList')) || [];
    existing.push(booking);
    localStorage.setItem('bookingList', JSON.stringify(existing));
    window.location.href = 'confirm.html';
  }

  if (clinicSelect) {
    clinicSelect.addEventListener('change', handleClinicChange);
  }

  if (doctorTypeSelect) {
    doctorTypeSelect.addEventListener('change', showDoctorName);
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', saveBooking);
  }

  await loadClinicData();
  selectedClinic = selectedClinic || Object.keys(clinicDoctors)[0] || '';
  renderClinicOptions();
  updateClinicText(selectedClinic);
  if (clinicSelect) clinicSelect.value = selectedClinic;
  populateDoctors(selectedClinic);
  renderDoctorGrid(selectedClinic);
});

document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    function updateNavExpanded() {
      const isExpanded = navMenu.classList.contains('active');
      navToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    }

    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      updateNavExpanded();
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        updateNavExpanded();
      });
    });

    document.addEventListener('click', function (event) {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        updateNavExpanded();
      }
    });
  }
});

window.viewDoctorProfile = function(doctorSlug) {
  window.location.href = `doctor-profile.html?doctor=${doctorSlug}`;
};