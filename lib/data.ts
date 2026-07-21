import type { LGU, Service, SubmissionResponse, FormBlock, BlockTypeDef } from './types'

// ---------------------------------------------------------------------------
// "Your LGUs" — the programs available to a citizen based on their address.
// Ordered Barangay → City/Municipal → Provincial to match the index-based
// filtering already written in CitizenHome (province-only shows index 2, etc).
// ---------------------------------------------------------------------------
export const MY_LGUS: LGU[] = [
  {
    id: 1,
    level: 'Barangay',
    province: 'Metro Manila',
    city: 'Manila',
    barangay: 'Tondo',
    lguName: 'Barangay Tondo, Manila',
    programName: 'Libreng Tuli Program',
    description:
      'Free circumcision services for qualified residents with medical screening and after-care support.',
    services: 1,
  },
  {
    id: 2,
    level: 'Barangay',
    province: 'Metro Manila',
    city: 'Manila',
    barangay: 'Sampaloc',
    lguName: 'Barangay Sampaloc, Manila',
    programName: 'Free Community Checkup Program',
    description:
      'Free medical consultations, basic health screening, medicine assistance, and referrals.',
    services: 2,
  },
  {
    id: 3,
    level: 'Barangay',
    province: 'Metro Manila',
    city: 'Caloocan',
    barangay: 'Barangay 176',
    lguName: 'Barangay 176, Caloocan City',
    programName: 'TB DOTS Scheduling Program',
    description:
      'TB screening, treatment scheduling, patient monitoring, and free medication support.',
    services: 2,
  },
  {
    id: 4,
    level: 'City/Municipal',
    province: 'Metro Manila',
    city: 'Manila',
    lguName: 'Manila City',
    programName: 'Manila Ayuda Assistance Program',
    description:
      'Financial aid, emergency assistance, livelihood support, and social welfare services.',
    services: 1,
    isNew: true,
  },
  {
    id: 5,
    level: 'City/Municipal',
    province: 'Cavite',
    city: 'Bacoor',
    lguName: 'Bacoor City, Cavite',
    programName: 'Bacoor Health and Wellness Program',
    description:
      'Vaccination drives, free checkups, medicine assistance, and health campaigns.',
    services: 3,
  },
  {
    id: 6,
    level: 'City/Municipal',
    province: 'Cavite',
    city: 'Imus',
    lguName: 'Imus City, Cavite',
    programName: 'Imus Scholarship Assistance Program',
    description:
      'Scholarships, educational support, and student assistance programs.',
    services: 1,
  },
  {
    id: 7,
    level: 'City/Municipal',
    province: 'Cavite',
    city: 'Dasmariñas',
    lguName: 'Dasmariñas City, Cavite',
    programName: 'Nutrition and Anti-Parasitic Program',
    description:
      'Community deworming, nutrition monitoring, and child wellness services.',
    services: 2,
  },
  {
    id: 8,
    level: 'City/Municipal',
    province: 'Cavite',
    city: 'General Trias',
    lguName: 'General Trias City, Cavite',
    programName: 'Livelihood Starter Program',
    description:
      'Skills training, livelihood kits, and employment assistance for residents.',
    services: 2,
  },
  {
    id: 9,
    level: 'City/Municipal',
    province: 'Bulacan',
    city: 'Malolos',
    lguName: 'Malolos City, Bulacan',
    programName: 'Bulacan Vaccination Drive',
    description:
      'Free vaccines, health monitoring, and preventive healthcare services.',
    services: 3,
  },
  {
    id: 10,
    level: 'City/Municipal',
    province: 'Bulacan',
    city: 'Meycauayan',
    lguName: 'Meycauayan City, Bulacan',
    programName: 'Clean Community Drive',
    description:
      'Barangay clean-ups, environmental activities, and waste management programs.',
    services: 2,
  },
  {
    id: 11,
    level: 'City/Municipal',
    province: 'Bulacan',
    city: 'San Jose del Monte',
    lguName: 'San Jose del Monte, Bulacan',
    programName: 'Family Assistance Program',
    description:
      'Emergency support, family aid, and community welfare services.',
    services: 2,
  },
  {
    id: 12,
    level: 'Provincial',
    province: 'Cavite',
    lguName: 'Province of Cavite',
    programName: 'Cavite Provincial Assistance Program',
    description:
      'Province-wide healthcare, scholarship assistance, disaster response, and livelihood programs.',
    services: 3,
  },
  {
    id: 13,
    level: 'Provincial',
    province: 'Bulacan',
    lguName: 'Province of Bulacan',
    programName: 'Bulacan Provincial Development Program',
    description:
      'Healthcare, education, agriculture support, and public assistance services.',
    services: 3,
  },
  {
    id: 14,
    level: 'Provincial',
    province: 'Metro Manila',
    lguName: 'Metro Manila (NCR)',
    programName: 'NCR Regional Assistance Program',
    description:
      'Regional disaster relief, employment assistance, health subsidies, and social services.',
    services: 2,
  },
  // --- Quezon City ---
  {
    id: 15,
    level: 'Barangay',
    province: 'Metro Manila',
    city: 'Quezon City',
    barangay: 'Barangay Commonwealth',
    lguName: 'Barangay Commonwealth, Quezon City',
    programName: 'Barangay Commonwealth Health and Wellness Program',
    description:
      'Free medical consultations and medicine assistance for qualified residents.',
    services: 2,
  },
  {
    id: 16,
    level: 'City/Municipal',
    province: 'Metro Manila',
    city: 'Quezon City',
    lguName: 'Quezon City',
    programName: 'Quezon City Public Health Program',
    description:
      'City-wide health screening and vaccination services for residents.',
    services: 2,
  },
  // --- Makati ---
  {
    id: 17,
    level: 'Barangay',
    province: 'Metro Manila',
    city: 'Makati',
    barangay: 'Barangay Poblacion',
    lguName: 'Barangay Poblacion, Makati',
    programName: 'Barangay Poblacion Senior Citizen Assistance',
    description:
      'ID processing and benefits assistance for senior citizen residents.',
    services: 1,
  },
  {
    id: 18,
    level: 'City/Municipal',
    province: 'Metro Manila',
    city: 'Makati',
    lguName: 'Makati City',
    programName: 'Makati Business Permit Assistance Program',
    description:
      'Guided application support for new and renewing business permits.',
    services: 1,
  },
  // --- Pasig ---
  {
    id: 19,
    level: 'Barangay',
    province: 'Metro Manila',
    city: 'Pasig',
    barangay: 'Barangay Ugong',
    lguName: 'Barangay Ugong, Pasig',
    programName: 'Barangay Ugong Youth Development Program',
    description:
      'Skills training and sports program registration for local youth.',
    services: 2,
  },
  {
    id: 20,
    level: 'City/Municipal',
    province: 'Metro Manila',
    city: 'Pasig',
    lguName: 'Pasig City',
    programName: 'Pasig City Scholarship Program',
    description:
      'Educational scholarship support for qualified Pasig students.',
    services: 1,
  },
  // --- Cavite barangays ---
  {
    id: 21,
    level: 'Barangay',
    province: 'Cavite',
    city: 'Bacoor',
    barangay: 'Barangay Molino',
    lguName: 'Barangay Molino, Bacoor',
    programName: 'Barangay Molino Feeding Program',
    description:
      'Nutrition feeding sessions for qualified children and residents.',
    services: 1,
  },
  {
    id: 22,
    level: 'Barangay',
    province: 'Cavite',
    city: 'Dasmariñas',
    barangay: 'Barangay Salawag',
    lguName: 'Barangay Salawag, Dasmariñas',
    programName: 'Barangay Salawag Sports Development Program',
    description:
      'Sports training registration and equipment support for youth athletes.',
    services: 1,
  },
  {
    id: 23,
    level: 'Barangay',
    province: 'Cavite',
    city: 'Imus',
    barangay: 'Barangay Anabu',
    lguName: 'Barangay Anabu, Imus',
    programName: 'Barangay Anabu Solid Waste Management Program',
    description:
      'Waste segregation guidance and collection assistance for residents.',
    services: 1,
  },
  {
    id: 24,
    level: 'Barangay',
    province: 'Cavite',
    city: 'General Trias',
    barangay: 'Barangay Buenavista',
    lguName: 'Barangay Buenavista, General Trias',
    programName: 'Barangay Buenavista Community Assistance Program',
    description:
      'General community aid requests for qualified residents.',
    services: 1,
  },
]

// ---------------------------------------------------------------------------
// Location dropdowns for the "Other LGUs" search tab.
// ---------------------------------------------------------------------------
export const PROVINCES = ['Metro Manila', 'Cavite', 'Laguna', 'Bulacan', 'Rizal']

export const CITIES: Record<string, string[]> = {
  'Metro Manila': ['Caloocan', 'Quezon City', 'Manila', 'Makati', 'Pasig'],
  Cavite: ['Bacoor', 'Dasmariñas', 'Imus'],
  Laguna: ['Santa Rosa', 'Calamba', 'San Pablo'],
  Bulacan: ['Malolos', 'Meycauayan', 'San Jose del Monte'],
  Rizal: ['Antipolo', 'Cainta', 'Taytay'],
}

export const BRGYS: Record<string, string[]> = {
  Caloocan: ['Barangay 176', 'Barangay 177', 'Barangay 178'],
  'Quezon City': ['Barangay Commonwealth', 'Barangay Bagong Silangan', 'Barangay Batasan Hills'],
  Manila: ['Barangay 1', 'Barangay 2', 'Barangay 3'],
  Makati: ['Barangay Poblacion', 'Barangay Bel-Air', 'Barangay San Lorenzo'],
  Pasig: ['Barangay Ugong', 'Barangay Kapitolyo', 'Barangay Pinagbuhatan'],
  Bacoor: ['Barangay Molino', 'Barangay Zapote', 'Barangay Talaba'],
  'Dasmariñas': ['Barangay Salawag', 'Barangay Zone I', 'Barangay San Agustin'],
  Imus: ['Barangay Anabu', 'Barangay Bucandala', 'Barangay Tanzang Luma'],
  'Santa Rosa': ['Barangay Balibago', 'Barangay Market Area', 'Barangay Sinalhan'],
  Calamba: ['Barangay Real', 'Barangay Canlubang', 'Barangay Halang'],
  'San Pablo': ['Barangay San Gabriel', 'Barangay San Nicolas', 'Barangay San Roque'],
  Malolos: ['Barangay Sumapang Matanda', 'Barangay Look 1st', 'Barangay Santo Rosario'],
  Meycauayan: ['Barangay Calvario', 'Barangay Poblacion', 'Barangay Banga'],
  'San Jose del Monte': ['Barangay Tungkong Mangga', 'Barangay Gaya-gaya', 'Barangay Muzon'],
  Antipolo: ['Barangay San Roque', 'Barangay Dela Paz', 'Barangay Mayamot'],
  Cainta: ['Barangay San Juan', 'Barangay Sto. Domingo', 'Barangay San Isidro'],
  Taytay: ['Barangay San Juan', 'Barangay Dolores', 'Barangay Muzon'],
}

// ---------------------------------------------------------------------------
// Services offered under a Program (used by CitizenProgram, CitizenFormView,
// and the LGU Program Editor's service checklist).
// ---------------------------------------------------------------------------
export const SERVICES: Service[] = [
  // LGU 1 - Barangay Tondo
  // LGU 1 - Barangay Tondo
{
  id: 1,
  lguId: 1,
  name: 'Free Circumcision Service',
  description:
    'Free circumcision procedure with medical screening, scheduling, and post-operation care instructions.',
  requirements: ['Valid ID', 'Barangay residency proof', 'Parent/guardian consent for minors'],
  processing: 'Scheduled medical activity',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Full Name',
      required: true,
      placeholder: 'Juan Dela Cruz',
    },
    {
      id: 2,
      type: 'date',
      label: 'Date of Birth',
      required: true,
    },
    {
      id: 3,
      type: 'file',
      label: 'Valid Government ID',
      required: true,
      accept: '.pdf,.jpg,.png',
    },
    {
      id: 4,
      type: 'file',
      label: 'Barangay Residency Proof',
      required: true,
      accept: '.pdf,.jpg,.png',
    },
    {
      id: 5,
      type: 'file',
      label: 'Parent/Guardian Consent',
      required: true,
      accept: '.pdf,.jpg,.png',
    },
  ],
},


// LGU 2 - Barangay Sampaloc
{
  id: 2,
  lguId: 2,
  name: 'Medical Consultation',
  description:
    'Free doctor consultation, basic assessment, and health referrals.',
  requirements: ['Valid ID'],
  processing: 'Same day',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Full Name',
      required: true,
      placeholder: 'Juan Dela Cruz',
    },
    {
      id: 2,
      type: 'date',
      label: 'Date of Birth',
      required: true,
    },
    {
      id: 3,
      type: 'text',
      label: 'Medical Concern',
      required: true,
      placeholder: 'Describe your concern',
    },
    {
      id: 4,
      type: 'file',
      label: 'Valid Government ID',
      required: true,
      accept: '.pdf,.jpg,.png',
    },
  ],
},

{
  id: 3,
  lguId: 2,
  name: 'Medicine Assistance',
  description:
    'Request assistance for available medicines based on medical needs.',
  requirements: ['Valid ID', 'Prescription if applicable'],
  processing: '1-3 business days',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      id: 2,
      type: 'text',
      label: 'Medicine Requested',
      required: true,
    },
    {
      id: 3,
      type: 'file',
      label: 'Valid Government ID',
      required: true,
    },
    {
      id: 4,
      type: 'file',
      label: 'Doctor Prescription',
      required: false,
    },
  ],
},


// LGU 3 - Barangay 176 Caloocan
{
  id: 4,
  lguId: 3,
  name: 'TB Screening',
  description:
    'Tuberculosis assessment, screening, and patient evaluation.',
  requirements: ['Valid ID'],
  processing: 'Same day',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      id: 2,
      type: 'date',
      label: 'Date of Birth',
      required: true,
    },
    {
      id: 3,
      type: 'text',
      label: 'Symptoms / Health Concerns',
      required: true,
    },
    {
      id: 4,
      type: 'file',
      label: 'Valid Government ID',
      required: true,
    },
  ],
},

{
  id: 5,
  lguId: 3,
  name: 'TB DOTS Treatment Scheduling',
  description:
    'Scheduling and monitoring enrollment for tuberculosis treatment.',
  requirements: ['Screening result', 'Patient information'],
  processing: 'Scheduled follow-up',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Patient Name',
      required: true,
    },
    {
      id: 2,
      type: 'file',
      label: 'TB Screening Result',
      required: true,
    },
    {
      id: 3,
      type: 'select',
      label: 'Preferred Schedule',
      required: true,
      options: [
        'Morning',
        'Afternoon',
        'Evening',
      ],
    },
  ],
},


// LGU 4 - Manila Ayuda
{
  id: 6,
  lguId: 4,
  name: 'Financial Assistance Request',
  description:
    'Application for emergency financial aid and social welfare assistance.',
  requirements: ['Valid ID', 'Proof of residency'],
  processing: '5-7 business days',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      id: 2,
      type: 'text',
      label: 'Reason for Assistance',
      required: true,
    },
    {
      id: 3,
      type: 'file',
      label: 'Valid Government ID',
      required: true,
    },
    {
      id: 4,
      type: 'file',
      label: 'Proof of Residency',
      required: true,
    },
    {
      id: 5,
      type: 'file',
      label: 'Certificate of Indigency',
      required: false,
    },
  ],
},


// LGU 5 - Bacoor Health
{
  id: 7,
  lguId: 5,
  name: 'Vaccination Service',
  description:
    'Free vaccination programs for eligible residents.',
  requirements: ['Valid ID', 'Vaccination record if available'],
  processing: 'Same day',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      id: 2,
      type: 'date',
      label: 'Date of Birth',
      required: true,
    },
    {
      id: 3,
      type: 'select',
      label: 'Preferred Vaccine',
      required: true,
      options: [
        'Flu Vaccine',
        'COVID-19 Vaccine',
        'Routine Immunization',
        'Other',
      ],
    },
    {
      id: 4,
      type: 'file',
      label: 'Vaccination Record',
      required: false,
    },
  ],
},

{
  id: 8,
  lguId: 5,
  name: 'Free Medical Checkup',
  description:
    'General consultation and basic health screening.',
  requirements: ['Valid ID'],
  processing: 'Same day',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      id: 2,
      type: 'text',
      label: 'Health Concern',
      required: true,
    },
    {
      id: 3,
      type: 'file',
      label: 'Valid Government ID',
      required: true,
    },
  ],
},

{
  id: 9,
  lguId: 5,
  name: 'Medicine Assistance',
  description:
    'Assistance for approved medicine requests.',
  requirements: ['Prescription', 'Valid ID'],
  processing: '1-3 business days',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      id: 2,
      type: 'text',
      label: 'Requested Medicine',
      required: true,
    },
    {
      id: 3,
      type: 'file',
      label: 'Valid Government ID',
      required: true,
    },
    {
      id: 4,
      type: 'file',
      label: 'Prescription',
      required: true,
    },
  ],
},
// LGU 6 - Imus Scholarship
{
  id: 10,
  lguId: 6,
  name: 'Scholarship Application',
  description:
    'Educational scholarship support for qualified students.',
  requirements: ['School enrollment proof', 'Grades/transcript'],
  processing: '15 business days',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Student Full Name',
      required: true,
      placeholder: 'Juan Dela Cruz',
    },
    {
      id: 2,
      type: 'date',
      label: 'Date of Birth',
      required: true,
    },
    {
      id: 3,
      type: 'text',
      label: 'School Name',
      required: true,
    },
    {
      id: 4,
      type: 'file',
      label: 'Certificate of Enrollment',
      required: true,
    },
    {
      id: 5,
      type: 'file',
      label: 'Grades / Transcript of Records',
      required: true,
    },
  ],
},


// LGU 7 - Dasmarinas Nutrition
{
  id: 11,
  lguId: 7,
  name: 'Community Deworming',
  description:
    'Free anti-parasitic treatment and child health support.',
  requirements: ['Parent/guardian consent'],
  processing: 'Scheduled activity',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Child Full Name',
      required: true,
    },
    {
      id: 2,
      type: 'date',
      label: 'Child Date of Birth',
      required: true,
    },
    {
      id: 3,
      type: 'text',
      label: 'Parent / Guardian Name',
      required: true,
    },
    {
      id: 4,
      type: 'file',
      label: 'Parent / Guardian Consent',
      required: true,
    },
  ],
},

{
  id: 12,
  lguId: 7,
  name: 'Nutrition Monitoring',
  description:
    'Child growth tracking and nutrition assessment services.',
  requirements: ['Resident information'],
  processing: 'Monthly monitoring',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Child Full Name',
      required: true,
    },
    {
      id: 2,
      type: 'date',
      label: 'Child Date of Birth',
      required: true,
    },
    {
      id: 3,
      type: 'text',
      label: 'Parent / Guardian Name',
      required: true,
    },
    {
      id: 4,
      type: 'file',
      label: 'Previous Health Record',
      required: false,
    },
  ],
},


// LGU 8 - General Trias
{
  id: 13,
  lguId: 8,
  name: 'Livelihood Skills Training',
  description:
    'Training programs for employment and income opportunities.',
  requirements: ['Valid ID'],
  processing: 'Depends on schedule',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Applicant Name',
      required: true,
    },
    {
      id: 2,
      type: 'select',
      label: 'Preferred Training',
      required: true,
      options: [
        'Food Processing',
        'Small Business',
        'Technical Skills',
        'Other',
      ],
    },
    {
      id: 3,
      type: 'file',
      label: 'Valid Government ID',
      required: true,
    },
  ],
},

{
  id: 14,
  lguId: 8,
  name: 'Livelihood Starter Kit',
  description:
    'Application for starter materials to support small businesses.',
  requirements: ['Valid ID', 'Application form'],
  processing: 'Review period',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Applicant Name',
      required: true,
    },
    {
      id: 2,
      type: 'text',
      label: 'Proposed Business / Livelihood',
      required: true,
    },
    {
      id: 3,
      type: 'file',
      label: 'Valid Government ID',
      required: true,
    },
    {
      id: 4,
      type: 'file',
      label: 'Business Proposal / Application Form',
      required: true,
    },
  ],
},


// LGU 9 - Malolos Vaccination
{
  id: 15,
  lguId: 9,
  name: 'Routine Vaccination',
  description:
    'Free preventive vaccines for residents.',
  requirements: ['Valid ID'],
  processing: 'Same day',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Resident Full Name',
      required: true,
    },
    {
      id: 2,
      type: 'date',
      label: 'Date of Birth',
      required: true,
    },
    {
      id: 3,
      type: 'select',
      label: 'Requested Vaccine',
      required: true,
      options: [
        'Flu Vaccine',
        'COVID-19 Vaccine',
        'Routine Immunization',
        'Other',
      ],
    },
    {
      id: 4,
      type: 'file',
      label: 'Previous Vaccination Record',
      required: false,
    },
  ],
},

{
  id: 16,
  lguId: 9,
  name: 'Health Monitoring',
  description:
    'Basic health tracking and wellness assessment.',
  requirements: ['Resident information'],
  processing: 'Scheduled checkup',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Resident Name',
      required: true,
    },
    {
      id: 2,
      type: 'date',
      label: 'Date of Birth',
      required: true,
    },
    {
      id: 3,
      type: 'text',
      label: 'Health Concern',
      required: false,
    },
  ],
},

{
  id: 17,
  lguId: 9,
  name: 'Preventive Healthcare Consultation',
  description:
    'Health education and preventive care guidance.',
  requirements: ['Valid ID'],
  processing: 'Same day',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      id: 2,
      type: 'text',
      label: 'Health Topic Concern',
      required: true,
    },
    {
      id: 3,
      type: 'file',
      label: 'Valid Government ID',
      required: true,
    },
  ],
},


// LGU 10 - Meycauayan Clean Drive
{
  id: 18,
  lguId: 10,
  name: 'Barangay Clean-up Registration',
  description:
    'Volunteer registration for community clean-up activities.',
  requirements: ['Resident information'],
  processing: 'Same day',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Volunteer Name',
      required: true,
    },
    {
      id: 2,
      type: 'date',
      label: 'Preferred Activity Date',
      required: true,
    },
    {
      id: 3,
      type: 'file',
      label: 'Valid Government ID',
      required: true,
    },
  ],
},

{
  id: 19,
  lguId: 10,
  name: 'Waste Management Assistance',
  description:
    'Community waste segregation and disposal support.',
  requirements: ['Valid ID'],
  processing: 'Scheduled activity',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Resident Name',
      required: true,
    },
    {
      id: 2,
      type: 'select',
      label: 'Assistance Type',
      required: true,
      options: [
        'Waste Collection',
        'Segregation Support',
        'Recycling Assistance',
      ],
    },
    {
      id: 3,
      type: 'file',
      label: 'Valid Government ID',
      required: true,
    },
  ],
},
// LGU 11 - SJDM Family Assistance
{
  id: 20,
  lguId: 11,
  name: 'Emergency Family Aid',
  description:
    'Support program for families needing immediate assistance.',
  requirements: ['Valid ID', 'Proof of residency'],
  processing: 'Assessment required',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Applicant Full Name',
      required: true,
    },
    {
      id: 2,
      type: 'text',
      label: 'Reason for Assistance',
      required: true,
    },
    {
      id: 3,
      type: 'file',
      label: 'Valid Government ID',
      required: true,
    },
    {
      id: 4,
      type: 'file',
      label: 'Proof of Residency',
      required: true,
    },
    {
      id: 5,
      type: 'file',
      label: 'Certificate of Indigency',
      required: false,
    },
  ],
},

{
  id: 21,
  lguId: 11,
  name: 'Community Welfare Support',
  description:
    'Social support services for qualified families.',
  requirements: ['Application form'],
  processing: 'Review period',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Applicant Name',
      required: true,
    },
    {
      id: 2,
      type: 'select',
      label: 'Requested Support Type',
      required: true,
      options: [
        'Food Assistance',
        'Medical Support',
        'Family Support',
        'Other',
      ],
    },
    {
      id: 3,
      type: 'file',
      label: 'Valid Government ID',
      required: true,
    },
    {
      id: 4,
      type: 'file',
      label: 'Application Form',
      required: true,
    },
  ],
},


// LGU 12 - Cavite Province
{
  id: 22,
  lguId: 12,
  name: 'Provincial Healthcare Assistance',
  description:
    'Healthcare support and medical assistance services.',
  requirements: ['Valid ID'],
  processing: 'Assessment required',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Patient Full Name',
      required: true,
    },
    {
      id: 2,
      type: 'text',
      label: 'Medical Concern',
      required: true,
    },
    {
      id: 3,
      type: 'file',
      label: 'Valid Government ID',
      required: true,
    },
    {
      id: 4,
      type: 'file',
      label: 'Medical Certificate / Prescription',
      required: false,
    },
  ],
},

{
  id: 23,
  lguId: 12,
  name: 'Provincial Scholarship Assistance',
  description:
    'Educational support for qualified Cavite students.',
  requirements: ['School documents'],
  processing: '15 business days',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Student Name',
      required: true,
    },
    {
      id: 2,
      type: 'text',
      label: 'School Name',
      required: true,
    },
    {
      id: 3,
      type: 'file',
      label: 'Certificate of Enrollment',
      required: true,
    },
    {
      id: 4,
      type: 'file',
      label: 'Grades / Transcript',
      required: true,
    },
  ],
},

{
  id: 24,
  lguId: 12,
  name: 'Livelihood Support Program',
  description:
    'Assistance for livelihood and income projects.',
  requirements: ['Application form'],
  processing: 'Review period',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Applicant Name',
      required: true,
    },
    {
      id: 2,
      type: 'select',
      label: 'Livelihood Category',
      required: true,
      options: [
        'Food Business',
        'Retail',
        'Agriculture',
        'Services',
      ],
    },
    {
      id: 3,
      type: 'file',
      label: 'Valid Government ID',
      required: true,
    },
    {
      id: 4,
      type: 'file',
      label: 'Project Proposal',
      required: false,
    },
  ],
},


// LGU 13 - Bulacan Province
{
  id: 25,
  lguId: 13,
  name: 'Provincial Health Services',
  description:
    'Healthcare assistance and wellness programs.',
  requirements: ['Valid ID'],
  processing: 'Assessment required',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Resident Name',
      required: true,
    },
    {
      id: 2,
      type: 'text',
      label: 'Health Concern',
      required: true,
    },
    {
      id: 3,
      type: 'file',
      label: 'Valid Government ID',
      required: true,
    },
  ],
},

{
  id: 26,
  lguId: 13,
  name: 'Education Support',
  description:
    'Educational assistance programs for residents.',
  requirements: ['School documents'],
  processing: 'Review period',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Student Name',
      required: true,
    },
    {
      id: 2,
      type: 'text',
      label: 'School Name',
      required: true,
    },
    {
      id: 3,
      type: 'file',
      label: 'School Documents',
      required: true,
    },
  ],
},

{
  id: 27,
  lguId: 13,
  name: 'Agriculture Assistance',
  description:
    'Support services for farmers and agricultural activities.',
  requirements: ['Resident proof'],
  processing: 'Scheduled review',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Applicant Name',
      required: true,
    },
    {
      id: 2,
      type: 'select',
      label: 'Agriculture Category',
      required: true,
      options: [
        'Crop Farming',
        'Livestock',
        'Fishing',
        'Other',
      ],
    },
    {
      id: 3,
      type: 'file',
      label: 'Proof of Residency',
      required: true,
    },
  ],
},


// LGU 14 - NCR
{
  id: 28,
  lguId: 14,
  name: 'Disaster Relief Assistance',
  description:
    'Emergency assistance during disasters and calamities.',
  requirements: ['Valid ID', 'Incident proof'],
  processing: 'Assessment required',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Applicant Name',
      required: true,
    },
    {
      id: 2,
      type: 'select',
      label: 'Type of Assistance Needed',
      required: true,
      options: [
        'Food Relief',
        'Financial Assistance',
        'Emergency Supplies',
        'Medical Assistance',
      ],
    },
    {
      id: 3,
      type: 'file',
      label: 'Valid Government ID',
      required: true,
    },
    {
      id: 4,
      type: 'file',
      label: 'Incident Proof',
      required: true,
    },
  ],
},

{
  id: 29,
  lguId: 14,
  name: 'Employment Assistance',
  description:
    'Job referral and employment support services.',
  requirements: ['Valid ID', 'Resume if applicable'],
  processing: 'Depends on program',
  fee: 'Free',

  formBlocks: [
    {
      id: 1,
      type: 'text',
      label: 'Applicant Name',
      required: true,
    },
    {
      id: 2,
      type: 'text',
      label: 'Desired Job Position',
      required: true,
    },
    {
      id: 3,
      type: 'file',
      label: 'Valid Government ID',
      required: true,
    },
    {
      id: 4,
      type: 'file',
      label: 'Resume',
      required: false,
    },
  ],
},
// LGU 15 - Barangay Commonwealth, QC
{
  id: 30,
  lguId: 15,
  name: 'Free Medical Consultation',
  description: 'Basic doctor consultation and health assessment.',
  requirements: ['Valid ID'],
  processing: 'Same day',
  fee: 'Free',
  formBlocks: [
    { id: 1, type: 'text', label: 'Full Name', required: true },
    { id: 2, type: 'date', label: 'Date of Birth', required: true },
    { id: 3, type: 'file', label: 'Valid Government ID', required: true },
  ],
},
{
  id: 31,
  lguId: 15,
  name: 'Medicine Assistance',
  description: 'Request assistance for available medicines.',
  requirements: ['Valid ID', 'Prescription if applicable'],
  processing: '1-3 business days',
  fee: 'Free',
  formBlocks: [
    { id: 1, type: 'text', label: 'Full Name', required: true },
    { id: 2, type: 'text', label: 'Medicine Requested', required: true },
    { id: 3, type: 'file', label: 'Valid Government ID', required: true },
    { id: 4, type: 'file', label: 'Doctor Prescription', required: false },
  ],
},

// LGU 16 - Quezon City
{
  id: 32,
  lguId: 16,
  name: 'Public Health Screening',
  description: 'City-run screening for common health conditions.',
  requirements: ['Valid ID'],
  processing: 'Same day',
  fee: 'Free',
  formBlocks: [
    { id: 1, type: 'text', label: 'Full Name', required: true },
    { id: 2, type: 'date', label: 'Date of Birth', required: true },
    { id: 3, type: 'file', label: 'Valid Government ID', required: true },
  ],
},
{
  id: 33,
  lguId: 16,
  name: 'Vaccination Service',
  description: 'Free vaccination for eligible residents.',
  requirements: ['Valid ID', 'Vaccination record if available'],
  processing: 'Same day',
  fee: 'Free',
  formBlocks: [
    { id: 1, type: 'text', label: 'Full Name', required: true },
    {
      id: 2,
      type: 'select',
      label: 'Preferred Vaccine',
      required: true,
      options: ['Flu Vaccine', 'COVID-19 Vaccine', 'Routine Immunization', 'Other'],
    },
    { id: 3, type: 'file', label: 'Vaccination Record', required: false },
  ],
},

// LGU 17 - Barangay Poblacion, Makati
{
  id: 34,
  lguId: 17,
  name: 'Senior Citizen ID Assistance',
  description: 'Application processing for senior citizen ID and benefits.',
  requirements: ['Valid ID', 'Proof of age'],
  processing: '3-5 business days',
  fee: 'Free',
  formBlocks: [
    { id: 1, type: 'text', label: 'Full Name', required: true },
    { id: 2, type: 'date', label: 'Date of Birth', required: true },
    { id: 3, type: 'file', label: 'Valid Government ID', required: true },
  ],
},

// LGU 18 - Makati City
{
  id: 35,
  lguId: 18,
  name: 'Business Permit Application Assistance',
  description: 'Guided assistance for new or renewing business permits.',
  requirements: ['Valid ID', 'Business documents'],
  processing: '5-7 business days',
  fee: 'Free',
  formBlocks: [
    { id: 1, type: 'text', label: 'Applicant Name', required: true },
    { id: 2, type: 'text', label: 'Business Name', required: true },
    { id: 3, type: 'file', label: 'Valid Government ID', required: true },
    { id: 4, type: 'file', label: 'Business Documents', required: true },
  ],
},

// LGU 19 - Barangay Ugong, Pasig
{
  id: 36,
  lguId: 19,
  name: 'Youth Skills Training',
  description: 'Training sessions for employable skills.',
  requirements: ['Valid ID'],
  processing: 'Depends on schedule',
  fee: 'Free',
  formBlocks: [
    { id: 1, type: 'text', label: 'Applicant Name', required: true },
    {
      id: 2,
      type: 'select',
      label: 'Preferred Training',
      required: true,
      options: ['Food Processing', 'Small Business', 'Technical Skills', 'Other'],
    },
    { id: 3, type: 'file', label: 'Valid Government ID', required: true },
  ],
},
{
  id: 37,
  lguId: 19,
  name: 'Sports Development Registration',
  description: 'Registration for youth sports training programs.',
  requirements: ['Valid ID', 'Parent/guardian consent for minors'],
  processing: 'Scheduled activity',
  fee: 'Free',
  formBlocks: [
    { id: 1, type: 'text', label: 'Full Name', required: true },
    { id: 2, type: 'date', label: 'Date of Birth', required: true },
    { id: 3, type: 'file', label: 'Parent/Guardian Consent', required: true },
  ],
},

// LGU 20 - Pasig City
{
  id: 38,
  lguId: 20,
  name: 'Scholarship Application',
  description: 'Educational scholarship support for qualified students.',
  requirements: ['School enrollment proof', 'Grades/transcript'],
  processing: '15 business days',
  fee: 'Free',
  formBlocks: [
    { id: 1, type: 'text', label: 'Student Full Name', required: true },
    { id: 2, type: 'date', label: 'Date of Birth', required: true },
    { id: 3, type: 'file', label: 'Certificate of Enrollment', required: true },
    { id: 4, type: 'file', label: 'Grades / Transcript of Records', required: true },
  ],
},

// LGU 21 - Barangay Molino, Bacoor
{
  id: 39,
  lguId: 21,
  name: 'Feeding Program Registration',
  description: 'Registration for community feeding sessions.',
  requirements: ['Parent/guardian consent'],
  processing: 'Scheduled activity',
  fee: 'Free',
  formBlocks: [
    { id: 1, type: 'text', label: 'Child Full Name', required: true },
    { id: 2, type: 'date', label: 'Child Date of Birth', required: true },
    { id: 3, type: 'text', label: 'Parent / Guardian Name', required: true },
  ],
},

// LGU 22 - Barangay Salawag, Dasmariñas
{
  id: 40,
  lguId: 22,
  name: 'Sports Program Registration',
  description: 'Registration for youth sports training and equipment support.',
  requirements: ['Valid ID', 'Parent/guardian consent for minors'],
  processing: 'Scheduled activity',
  fee: 'Free',
  formBlocks: [
    { id: 1, type: 'text', label: 'Applicant Name', required: true },
    { id: 2, type: 'date', label: 'Date of Birth', required: true },
    { id: 3, type: 'file', label: 'Parent/Guardian Consent', required: false },
  ],
},

// LGU 23 - Barangay Anabu, Imus
{
  id: 41,
  lguId: 23,
  name: 'Waste Segregation Assistance',
  description: 'Guidance and support for household waste segregation.',
  requirements: ['Resident information'],
  processing: 'Scheduled activity',
  fee: 'Free',
  formBlocks: [
    { id: 1, type: 'text', label: 'Resident Name', required: true },
    {
      id: 2,
      type: 'select',
      label: 'Assistance Type',
      required: true,
      options: ['Waste Collection', 'Segregation Support', 'Recycling Assistance'],
    },
  ],
},

// LGU 24 - Barangay Buenavista, General Trias
{
  id: 42,
  lguId: 24,
  name: 'Community Assistance Request',
  description: 'General welfare and community aid requests.',
  requirements: ['Valid ID', 'Proof of residency'],
  processing: '5-7 business days',
  fee: 'Free',
  formBlocks: [
    { id: 1, type: 'text', label: 'Full Name', required: true },
    { id: 2, type: 'text', label: 'Reason for Assistance', required: true },
    { id: 3, type: 'file', label: 'Valid Government ID', required: true },
    { id: 4, type: 'file', label: 'Proof of Residency', required: true },
  ],
},

]

// ---------------------------------------------------------------------------
// Submitted applications, for the LGU Response View.
// ---------------------------------------------------------------------------
export const RESPONSES: SubmissionResponse[] = [
  { id: 'REF-284193', name: 'Maria Dela Cruz Santos', date: 'Jul 18, 2026', service: 'Barangay Health Certificate', status: 'pending' },
  { id: 'REF-119482', name: 'Juan Carlos Reyes', date: 'Jul 17, 2026', service: 'Medical Consultation Referral', status: 'approved' },
  { id: 'REF-573920', name: 'Ana Bautista Cruz', date: 'Jul 17, 2026', service: 'Medicine Assistance Request', status: 'rejected' },
  { id: 'REF-902841', name: 'Roberto Villanueva Jr.', date: 'Jul 16, 2026', service: 'Barangay Health Certificate', status: 'pending' },
  { id: 'REF-448210', name: 'Grace Fernandez Lim', date: 'Jul 15, 2026', service: 'Medical Consultation Referral', status: 'approved' },
]

// ---------------------------------------------------------------------------
// Field palette + starting blocks for the LGU Form Builder.
// ---------------------------------------------------------------------------
export const BLOCK_TYPES: BlockTypeDef[] = [
  { type: 'text', label: 'Text', icon: 'T' },
//   { type: 'textarea', label: 'Long Text', icon: '¶' },
  { type: 'date', label: 'Date', icon: '📅' },
  { type: 'file', label: 'File Upload', icon: '↑' },
  { type: 'select', label: 'Dropdown', icon: '▾' },
  { type: 'checkbox', label: 'Checkbox', icon: '☑' },
]

export const INIT_BLOCKS: FormBlock[] = [
  {
    id: 1,
    type: 'instruction',
    content:
      'Please fill out all required fields accurately. Ensure your uploaded ID is clear and valid. Processing takes 1-2 business days.',
  },
  { id: 2, type: 'text', label: 'Full Name', required: true, placeholder: 'e.g. Santos, Maria Dela Cruz' },
  { id: 3, type: 'date', label: 'Date of Birth', required: true },
  { id: 4, type: 'file', label: 'Valid Government ID', required: true },
]