document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const doctorSlug = urlParams.get('doctor');

  const doctorData = {
  'dr-ahmad-hassan': {
  name: 'Dr. Ahmad Hassan',
  specialty: 'General Medicine',
  hospital: 'Clinic Tuah',
  qualifications: 'MBBS, General Practitioner',
  about: 'Dr. Ahmad Hassan is a friendly general practitioner serving Clinic Tuah patients with a focus on family care and preventive medicine.',
  doctorImage: 'image/a.jpg'
},
    'dr-fatima-rahman': {
      name: 'Dr. Fatima Rahman',
      specialty: 'Family Medicine',
      hospital: 'Clinic Tuah',
      qualifications: 'MBBS, Family Physician',
      about: 'Dr. Fatima Rahman offers family-focused care for all ages, helping patients manage long-term health and wellness.'
    },
    'dr-mehdi-khan': {
      name: 'Dr. Mehdi Khan',
      specialty: 'Internal Medicine',
      hospital: 'Clinic Tuah',
      qualifications: 'MBBS, Internal Medicine Specialist',
      about: 'Dr. Mehdi Khan specializes in internal medicine and chronic care, providing effective diagnosis and treatment plans.'
    },
    'dr-johan-aziz': {
      name: 'Dr. Johan Aziz',
      specialty: 'Plastic Surgery',
      hospital: 'Cosmetic clinic Whooper',
      qualifications: 'MBBS, Plastic Surgeon',
      about: 'Dr. Johan Aziz provides cosmetic and reconstructive plastic surgery with a warm patient-centered approach.'
    },
    'dr-siti-nurhaliza': {
      name: 'Dr. Siti Nurhaliza',
      specialty: 'Cosmetic Surgery',
      hospital: 'Cosmetic clinic Whooper',
      qualifications: 'MBBS, Cosmetic Surgeon',
      about: 'Dr. Siti Nurhaliza offers cosmetic procedures with detailed care for aesthetic results and patient safety.'
    },
    'dr-akyas-m': {
      name: 'Dr. Akyas M',
      specialty: 'Dermatology',
      hospital: 'Cosmetic clinic Whooper',
      qualifications: 'MBBS, Dermatologist',
      about: 'Dr. Akyas M treats skin conditions and provides cosmetic dermatology services for healthier skin.'
    },
    'dr-chen-wei': {
      name: 'Dr. Chen Wei',
      specialty: 'Cosmetic Dentistry',
      hospital: 'Dental Clinic Amru',
      qualifications: 'BDS, Cosmetic Dentist',
      about: 'Dr. Chen Wei specializes in cosmetic dental treatments and smile enhancements at Dental Clinic Amru.'
    },
    'dr-lily-wong': {
      name: 'Dr. Lily Wong',
      specialty: 'Prosthodontics',
      hospital: 'Dental Clinic Amru',
      qualifications: 'BDS, Prosthodontist',
      about: 'Dr. Lily Wong is experienced in restorative dental care, including crowns, bridges, and prosthetics.'
    },
    'dr-akmal-ali': {
      name: 'Dr. Akmal Ali',
      specialty: 'Endodontics',
      hospital: 'Dental Clinic Amru',
      qualifications: 'BDS, Endodontist',
      about: 'Dr. Akmal Ali treats root canal conditions and dental pain using advanced endodontic techniques.'
    },
    'dr-priya-sharma': {
      name: 'Dr. Priya Sharma',
      specialty: 'Pediatrics',
      hospital: 'kids clinic ISka',
      qualifications: 'MBBS, Pediatrician',
      about: 'Dr. Priya Sharma provides compassionate pediatric care with a focus on child growth and wellness.'
    },
    'dr-vikram-singh': {
      name: 'Dr. Vikram Singh',
      specialty: 'Child Psychology',
      hospital: 'kids clinic ISka',
      qualifications: 'MA, Child Psychologist',
      about: 'Dr. Vikram Singh supports children and families with behavioral health and emotional wellness services.'
    },
    'dr-kavya-patel': {
      name: 'Dr. Kavya Patel',
      specialty: 'Pediatric Surgery',
      hospital: 'kids clinic ISka',
      qualifications: 'MBBS, Pediatric Surgeon',
      about: 'Dr. Kavya Patel performs pediatric surgical care with compassion and precision for young patients.',
      doctorImage: 'pic/my%20picture.jpg'
    }
  };

  // Load image from clinics.json (has base64 imageData)
  async function loadDoctorImage(slug) {
    try {
      const response = await fetch('json file/clinics.json');
      const clinics = await response.json();
      for (const doctors of Object.values(clinics)) {
        const found = doctors.find(d => d.slug === slug);
        if (found) return found.imageData || found.image || '';
      }
    } catch (e) { console.error('Could not load clinics.json', e); }
    return '';
  }

  if (doctorSlug && doctorData[doctorSlug]) {
    const doctor = doctorData[doctorSlug];
    document.getElementById('doctorName').textContent = doctor.name;
    document.getElementById('doctorSpecialty').textContent = doctor.specialty;
    document.getElementById('doctorHospital').textContent = doctor.hospital;
    document.getElementById('doctorQualifications').textContent = doctor.qualifications;
    document.getElementById('doctorAbout').textContent = doctor.about;

    // Try base64 from clinics.json first, fall back to direct image path
    loadDoctorImage(doctorSlug).then(imgSrc => {
      const imgEl = document.getElementById('doctorImage');
      if (imgSrc) {
        imgEl.src = imgSrc;
      } else if (doctor.doctorImage) {
        imgEl.src = doctor.doctorImage;
      } else {
        imgEl.src = `image/dr-${doctorSlug.split('-')[1] || 'ahmad'}.jpg`;
      }
    });
  } else {
    document.querySelector('.doctor-profile-section').innerHTML = '<h2>Doctor not found</h2>';
  }

  // Navigation toggle
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