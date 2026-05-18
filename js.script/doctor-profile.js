document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const doctorSlug = urlParams.get('doctor');

  const doctorData = {
  'dr-ahmad-Naqiuddin-Bunyamin': {
    name: 'Dr. Ahmad Naqiuddin Bunyamin',
    specialty: 'General Medicine',
    hospital: 'Clinic Tuah',
    qualifications: 'MBBS, General Practitioner',
    about: 'Dr. Ahmad Naqiuddin Bunyamin is a friendly general practitioner serving Clinic Tuah patients with a focus on family care and preventive medicine.',
    rating: '4.9',
    experience: '12 yrs',
    patients: '4.8k',
    languages: 'EN, BM',
    focusAreas: ['Family health', 'Preventive care', 'Chronic condition management'],
    hours: 'Mon–Fri 9am–6pm'
  },
    'dr-Leong-Yan-Ning': {
      name: 'Dr. Leong Yan Ning',
      specialty: 'Family Medicine',
      hospital: 'Clinic Tuah',
      qualifications: 'MBBS, Family Physician',
      about: 'Dr. Leong Yan Ning offers family-focused care for all ages, helping patients manage long-term health and wellness.',
      rating: '4.8',
      experience: '10 yrs',
      patients: '4.1k',
      languages: 'EN, BM',
      focusAreas: ['Child wellness', 'Women’s health', 'Chronic care'],
      hours: 'Mon–Sat 9am–5pm'
    },
    'dr-Aznita-Ibrahim': {
      name: 'Dr. Aznita Ibrahim',
      specialty: 'Internal Medicine',
      hospital: 'Clinic Tuah',
      qualifications: 'MBBS, Internal Medicine Specialist',
      about: 'Dr. Aznita Ibrahim specializes in internal medicine and chronic care, providing effective diagnosis and treatment plans.',
      rating: '4.7',
      experience: '14 yrs',
      patients: '5.2k',
      languages: 'EN, BM',
      focusAreas: ['Chronic disease', 'Preventive screening', 'Diagnostic care'],
      hours: 'Mon–Fri 8:30am–5:30pm'
    },
    'dr-Khoo-Yan-Teng': {
      name: 'Dr. Khoo Yan Teng',
      specialty: 'Plastic Surgery',
      hospital: 'Cosmetic clinic Whooper',
      qualifications: 'MBBS, Plastic Surgeon',
      about: 'Dr. Khoo Yan Teng provides cosmetic and reconstructive plastic surgery with a warm patient-centered approach.',
      rating: '4.9',
      experience: '16 yrs',
      patients: '3.6k',
      languages: 'EN, BM',
      focusAreas: ['Facial aesthetics', 'Reconstructive surgery', 'Skin tightening'],
      hours: 'Tue–Sat 10am–7pm'
    },
    'dr-Bernard-Chan': {
      name: 'Dr. Bernard Chan',
      specialty: 'Cosmetic Surgery',
      hospital: 'Cosmetic clinic Whooper',
      qualifications: 'MBBS, Cosmetic Surgeon',
      about: 'Dr. Bernard Chan offers cosmetic procedures with detailed care for aesthetic results and patient safety.',
      rating: '4.8',
      experience: '12 yrs',
      patients: '4.0k',
      languages: 'EN, BM',
      focusAreas: ['Body contouring', 'Skin rejuvenation', 'Laser therapy'],
      hours: 'Mon–Fri 9am–6pm'
    },
    'dr-Foong-boon-Bee': {
      name: 'Dr. Foong Boon Bee',
      specialty: 'Dermatology',
      hospital: 'Cosmetic clinic Whooper',
      qualifications: 'MBBS, Dermatologist',
      about: 'Dr. Foong Boon Bee treats skin conditions and provides cosmetic dermatology services for healthier skin.',
      rating: '4.7',
      experience: '10 yrs',
      patients: '3.2k',
      languages: 'EN, BM',
      focusAreas: ['Skin health', 'Anti-aging', 'Acne management'],
      hours: 'Mon–Fri 9am–5pm'
    },
    'dr-Melissa-Foo': {
      name: 'Dr. Melissa Foo',
      specialty: 'Cosmetic Dentistry',
      hospital: 'Dental Clinic Amru',
      qualifications: 'BDS, Cosmetic Dentist',
      about: 'Dr. Melissa Foo specializes in cosmetic dental treatments and smile enhancements at Dental Clinic Amru.',
      rating: '4.8',
      experience: '11 yrs',
      patients: '3.9k',
      languages: 'EN, BM',
      focusAreas: ['Smile design', 'Whitening', 'Veneers'],
      hours: 'Mon–Fri 10am–6pm'
    },
    'dr-Catherine-Lee-Tong-How': {
      name: 'Dr. Catherine Lee Tong How',
      specialty: 'Prosthodontics',
      hospital: 'Dental Clinic Amru',
      qualifications: 'BDS, Prosthodontist',
      about: 'Dr. Catherine Lee Tong How is experienced in restorative dental care, including crowns, bridges, and prosthetics.',
      rating: '4.7',
      experience: '13 yrs',
      patients: '4.2k',
      languages: 'EN, BM',
      focusAreas: ['Restore smiles', 'Dental implants', 'Full mouth rehabilitation'],
      hours: 'Tue–Sat 10am–7pm'
    },
    'Datuk-Dr-Mohd-Noor-Awang': {
      name: 'Datuk Dr. Mohd Noor Awang',
      specialty: 'Endodontics',
      hospital: 'Dental Clinic Amru',
      qualifications: 'BDS, Endodontist',
      about: 'Datuk Dr. Mohd Noor Awang treats root canal conditions and dental pain using advanced endodontic techniques.',
      rating: '4.9',
      experience: '18 yrs',
      patients: '5.0k',
      languages: 'EN, BM',
      focusAreas: ['Root canal therapy', 'Pain relief', 'Dental preservation'],
      hours: 'Mon–Fri 9am–5pm'
    },
    'Dr.-Khoo-Teng-Hoc': {
      name: 'Dr. Khoo Teng Hock',
      specialty: 'Pediatrics',
      hospital: 'kids clinic ISka',
      qualifications: 'MBBS, Pediatrician',
      about: 'Dr. Khoo Teng Hock provides compassionate pediatric care with a focus on child growth and wellness.',
      rating: '4.8',
      experience: '15 yrs',
      patients: '4.5k',
      languages: 'EN, BM',
      focusAreas: ['Child development', 'Vaccinations', 'Growth monitoring'],
      hours: 'Mon–Fri 9am–6pm'
    },
    'Ms-Lim-Maureen': {
      name: 'Dr. Lim Maureen',
      specialty: 'Child Psychology',
      hospital: 'kids clinic ISka',
      qualifications: 'MA, Child Psychologist',
      about: 'Dr. Lim Maureen supports children and families with behavioral health and emotional wellness services.',
      rating: '4.9',
      experience: '14 yrs',
      patients: '4.0k',
      languages: 'EN, BM',
      focusAreas: ['Child behavior', 'Counseling', 'Family support'],
      hours: 'Tue–Sat 10am–6pm'
    },
    'Dr.-Daniel-Mohanaprakash': {
      name: 'Dr. Daniel Mohanaprakash',
      specialty: 'Pediatric Surgery',
      hospital: 'kids clinic ISka',
      qualifications: 'MBBS, Pediatric Surgeon',
      about: 'Dr. Daniel Mohanaprakash performs pediatric surgical care with compassion and precision for young patients.',
      rating: '4.8',
      experience: '16 yrs',
      patients: '4.7k',
      languages: 'EN, BM',
      focusAreas: ['Minimally invasive surgery', 'Neonatal care', 'Post-op recovery'],
      hours: 'Mon–Fri 9am–5pm'
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
    document.getElementById('doctorRating').textContent = `★ ${doctor.rating}`;
    document.getElementById('doctorExperience').textContent = doctor.experience;
    document.getElementById('doctorPatients').textContent = doctor.patients;
    document.getElementById('doctorLanguages').textContent = doctor.languages;
    document.getElementById('doctorHours').textContent = doctor.hours;
    const focusList = document.getElementById('doctorFocus');
    if (focusList && Array.isArray(doctor.focusAreas)) {
      focusList.innerHTML = doctor.focusAreas.map(item => `<li>${item}</li>`).join('');
    }

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