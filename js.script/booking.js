document.addEventListener('DOMContentLoaded', function () {
  const clinicDoctors = {
    'Clinic Tuah': [
      {
        slug: 'dr-ahmad-hassan',
        name: 'Dr. Ahmad Hassan',
        type: 'General Practitioner',
        specialty: 'General Medicine',
        hospital: 'Clinic Tuah',
        image: 'image/a.jpg'
      },
      {
        slug: 'dr-fatima-rahman',
        name: 'Dr. Fatima Rahman',
        type: 'Family Physician',
        specialty: 'Family Medicine',
        hospital: 'Clinic Tuah',
        image: 'https://via.placeholder.com/150?text=Fatima'
      },
      {
        slug: 'dr-mehdi-khan',
        name: 'Dr. Mehdi Khan',
        type: 'Internal Medicine Specialist',
        specialty: 'Internal Medicine',
        hospital: 'Clinic Tuah',
        image: 'https://via.placeholder.com/150?text=Mehdi'
      }
    ],
    'Cosmetic clinic Whooper': [
      {
        slug: 'dr-johan-aziz',
        name: 'Dr. Johan Aziz',
        type: 'Plastic Surgeon',
        specialty: 'Plastic Surgery',
        hospital: 'Cosmetic clinic Whooper',
        image: 'https://via.placeholder.com/150?text=Johan'
      },
      {
        slug: 'dr-siti-nurhaliza',
        name: 'Dr. Siti Nurhaliza',
        type: 'Cosmetic Surgeon',
        specialty: 'Cosmetic Surgery',
        hospital: 'Cosmetic clinic Whooper',
        image: 'https://via.placeholder.com/150?text=Siti'
      },
      {
        slug: 'dr-akyas-m',
        name: 'Dr. Akyas M',
        type: 'Dermatologist',
        specialty: 'Dermatology',
        hospital: 'Cosmetic clinic Whooper',
        image: 'https://via.placeholder.com/150?text=Akyas'
      }
    ],
    'Dental Clinic Amru': [
      {
        slug: 'dr-chen-wei',
        name: 'Dr. Chen Wei',
        type: 'Cosmetic Dentist',
        specialty: 'Cosmetic Dentistry',
        hospital: 'Dental Clinic Amru',
        image: 'https://via.placeholder.com/150?text=Chen'
      },
      {
        slug: 'dr-lily-wong',
        name: 'Dr. Lily Wong',
        type: 'Prosthodontist',
        specialty: 'Prosthodontics',
        hospital: 'Dental Clinic Amru',
        image: 'https://via.placeholder.com/150?text=Lily'
      },
      {
        slug: 'dr-akmal-ali',
        name: 'Dr. Akmal Ali',
        type: 'Endodontist',
        specialty: 'Endodontics',
        hospital: 'Dental Clinic Amru',
        image: 'https://via.placeholder.com/150?text=Akmal'
      }
    ],
    'kids clinic ISka': [
      {
        slug: 'dr-priya-sharma',
        name: 'Dr. Priya Sharma',
        type: 'Pediatrician',
        specialty: 'Pediatrics',
        hospital: 'kids clinic ISka',
        image: 'https://via.placeholder.com/150?text=Priya'
      },
      {
        slug: 'dr-vikram-singh',
        name: 'Dr. Vikram Singh',
        type: 'Child Psychologist',
        specialty: 'Child Psychology',
        hospital: 'kids clinic ISka',
        image: 'https://via.placeholder.com/150?text=Vikram'
      },
      {
        slug: 'dr-kavya-patel',
        name: 'Dr. Kavya Patel',
        type: 'Pediatric Surgeon',
        specialty: 'Pediatric Surgery',
        hospital: 'kids clinic ISka',
        image: 'https://via.placeholder.com/150?text=Kavya'
      }
    ]
  };

  const clinicSelect = document.getElementById('clinicSelect');
  const doctorGrid = document.getElementById('doctorGrid');
  const clinic = localStorage.getItem('selectedClinic') || Object.keys(clinicDoctors)[0];
  let doctorNameMap = {};
  const clinicNameElement = document.getElementById('clinicName');
  const doctorTypeSelect = document.getElementById('doctorType');
  const doctorNameDisplay = document.getElementById('doctorName');
  const bookingForm = document.querySelector('form.form');

  function updateClinicText(selectedClinic) {
    if (clinicNameElement) {
      clinicNameElement.innerText = 'Booking at: ' + selectedClinic;
    }
  }

  function renderClinicOptions() {
    Object.keys(clinicDoctors).forEach((clinicName) => {
      const option = document.createElement('option');
      option.value = clinicName;
      option.text = clinicName;
      clinicSelect.appendChild(option);
    });
    clinicSelect.value = clinic;
  }

  function renderDoctorGrid(selectedClinic) {
    const doctors = clinicDoctors[selectedClinic] || [];
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

  function populateDoctors(selectedClinic) {
    doctorTypeSelect.innerHTML = '<option value="">-- Select Doctor Type --</option>';
    const doctors = clinicDoctors[selectedClinic] || [];

    doctorNameMap = {};
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

  function handleClinicChange(event) {
    const selectedClinic = event.target.value;
    localStorage.setItem('selectedClinic', selectedClinic);
    updateClinicText(selectedClinic);
    populateDoctors(selectedClinic);
    renderDoctorGrid(selectedClinic);
    doctorNameDisplay.innerText = '-- Select a doctor type --';
  }

function saveBooking(event) {
    event.preventDefault();

    const selectedClinic = clinicSelect.value;
    const doctorType = doctorTypeSelect.value;
    const doctorName = doctorNameMap[doctorType] || '';

    // Validation inputs
    const ic = document.getElementById('userIC').value;
    const phone = document.getElementById('userPhone').value;
    const date = document.getElementById('bookingDate').value;

    // IC validation
    if (!/^\d{12}$/.test(ic)) {
      alert('IC number must be exactly 12 digits with no dashes.');
      return;
    }

    // Malaysian phone validation
    if (!/^01[0-9]{8,9}$/.test(phone)) {
      alert('Phone number must be Malaysian format e.g. 0123456789');
      return;
    }

    // Date validation
    const today = new Date().toISOString().split('T')[0];

    if (date < today) {
      alert('Please select a future date.');
      return;
    }

    // Booking object
    const booking = {
      clinic: selectedClinic,
      doctorType,
      doctorName,
      name: document.getElementById('userName').value,
      phone: phone,
      icNumber: ic,
      email: document.getElementById('userEmail').value,
      painDescription: document.getElementById('painDescription').value,
      date: date,
      time: document.getElementById('bookingTime').value,
      status: 'Pending'
    };

    // Save multiple bookings
    const existing = JSON.parse(localStorage.getItem('bookingList')) || [];
    existing.push(booking);

    localStorage.setItem('bookingList', JSON.stringify(existing));

    // Redirect
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

  renderClinicOptions();
  updateClinicText(clinic);
  populateDoctors(clinic);
  renderDoctorGrid(clinic);

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

  // Function to view doctor profile
  window.viewDoctorProfile = function(doctorSlug) {
    window.location.href = `doctor-profile.html?doctor=${doctorSlug}`;
    };
});