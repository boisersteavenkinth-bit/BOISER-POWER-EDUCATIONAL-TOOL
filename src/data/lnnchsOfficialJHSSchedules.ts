export interface JHSTeacherSchedule {
  no: number;
  department: 'Mathematics' | 'TLE' | 'Science' | 'English' | 'Filipino' | 'Aral.Pan.' | 'MAPEH' | 'Val.Ed.';
  name: string;
  advisoryOrCoordinatorship: string;
  totalMinutes: number;
  schedule: {
    timeSlot: string; // e.g. '07:30-08:30', '08:30-09:30', '09:45-10:45', '10:45-11:45', '12:45-01:45', '01:45-02:45', '02:45-03:45'
    days: string[]; // e.g. ['M', 'T', 'W', 'Th', 'F']
    subjectAndSection: string; // e.g. 'MATH 8-LAVENDER' or 'VACANT'
  }[];
}

export const LNNCHS_TIME_SLOTS = [
  '07:00-07:30',
  '07:30-08:30',
  '08:30-09:30',
  '09:45-10:45',
  '10:45-11:45',
  '12:45-01:45',
  '01:45-02:45',
  '02:45-03:45',
  '03:45-04:45'
];

export const LNNCHS_JHS_TEACHERS: JHSTeacherSchedule[] = [
  // =========================================================================
  // 1. MATHEMATICS DEPARTMENT (JHS)
  // =========================================================================
  {
    no: 1,
    department: 'Mathematics',
    name: 'JEMMA B. ABAQUITA',
    advisoryOrCoordinatorship: 'G8 Lavender Class Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:00-07:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Flag Raising / Pre-School' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Math G8-Lavender' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Math G7-SPTVE' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Math / Aral G7-Esmeralda' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'Math G7-SPJ' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Math / Aral G8-Beige' },
      { timeSlot: '02:45-03:45', days: ['M', 'F'], subjectAndSection: 'Aral 8-Beige / Aral 10-Charlie' }
    ]
  },
  {
    no: 2,
    department: 'Mathematics',
    name: 'BEVERLY ALVIOLA',
    advisoryOrCoordinatorship: 'G10 Bravo Class Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Math 10-Delta' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Math G10-Bravo' },
      { timeSlot: '09:45-10:45', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'Math G9-Bravery' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'Math G9-Dignity' },
      { timeSlot: '01:45-02:45', days: ['F'], subjectAndSection: 'RHGP 10-Delta' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Adv. Eng. 10 G10-SPJ' }
    ]
  },
  {
    no: 3,
    department: 'Mathematics',
    name: 'MA. THERESA Y. CASILDO',
    advisoryOrCoordinatorship: 'G7 Hyacinth Class Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '08:30-09:30', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'Math G7-Hyacinth' },
      { timeSlot: '09:45-10:45', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'Math G7-Fleur-de-Lis' },
      { timeSlot: '10:45-11:45', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'Math G7-Kalachuchi' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Math / Aral G7-Bougainvillea' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Math / Aral G7-Camia' }
    ]
  },
  {
    no: 4,
    department: 'Mathematics',
    name: 'CHERRY JOY V. EBO',
    advisoryOrCoordinatorship: 'G10 STE-A Class Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'EMath G10-STE A' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'EMath G10-STE B' },
      { timeSlot: '10:45-11:45', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'Math G10-India' },
      { timeSlot: '12:45-01:45', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'Math G10-Foxtrot' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Math G10-Echo' }
    ]
  },
  {
    no: 5,
    department: 'Mathematics',
    name: 'JENNIFER C. ENTE',
    advisoryOrCoordinatorship: 'G10 Gamma Class Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'RHGP / Math 10-Gamma' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'MAPEH 10-Echo' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'MAPEH 10-Foxtrot' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'MAPEH 10-Jaguar' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Volleyball Specialization (Boys)' }
    ]
  },
  {
    no: 6,
    department: 'Mathematics',
    name: 'ROLANISA A.L. GANTE',
    advisoryOrCoordinatorship: 'G8 Ivory Class Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'RHGP / Math 8-Ivory' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'Math 8-Dark Blue' },
      { timeSlot: '09:45-10:45', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'Math 8-Cream' },
      { timeSlot: '10:45-11:45', days: ['W'], subjectAndSection: 'Aral 9-SPS' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Filipino / Aral 7-Camia' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Filipino / Aral 7-Jasmine' }
    ]
  },
  {
    no: 7,
    department: 'Mathematics',
    name: 'JUDITH P. HECHANOVA',
    advisoryOrCoordinatorship: 'G9 STE-A Class Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'EMath 9-STE A' },
      { timeSlot: '08:30-09:30', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'Math 9-SPJ' },
      { timeSlot: '09:45-10:45', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'Math 8-SPJ' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'EMath 9-STE B' },
      { timeSlot: '12:45-01:45', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'Math 9-Justice' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Math 9-Adorable' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Math 8-Fuchsia' }
    ]
  },
  {
    no: 8,
    department: 'Mathematics',
    name: 'ROWELL R. LLACA',
    advisoryOrCoordinatorship: 'G10 Jaguar Class Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'RHGP / Math 10-Jaguar' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'Math 10-SPJ' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Math 10-Charlie' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Futsal/Football Specialization' }
    ]
  },
  {
    no: 9,
    department: 'Mathematics',
    name: 'LEE S. LLANES',
    advisoryOrCoordinatorship: 'G10 Alpha Class Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'RHGP / Math 10-Alpha' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'Math 8 G8-Green' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Math 10 G10-Harvard' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Math 10 G10-SPS' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Math / Aral G8-Emerald' }
    ]
  },
  {
    no: 10,
    department: 'Mathematics',
    name: 'FELY T. MAGKILAT',
    advisoryOrCoordinatorship: 'G9 Charity Class Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'RHGP / Math 9-Charity' },
      { timeSlot: '08:30-09:30', days: ['F'], subjectAndSection: 'Aral G9-Charity' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Math / Aral G9-SPS RJ' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Math / Aral G8-Jade' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Math G8-Aquamarine / Aral Charity' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Math G9-Kindness / Aral Kindness' }
    ]
  },
  {
    no: 11,
    department: 'Mathematics',
    name: 'JEMUEL A. RABAGO',
    advisoryOrCoordinatorship: 'G9 Faith Class Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'RHGP / Math 9-Faith' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Creative Tech G9-STE A' },
      { timeSlot: '12:45-01:45', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'Math G9-Integrity' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Creative Tech G9-STE B' }
    ]
  },
  {
    no: 12,
    department: 'Mathematics',
    name: 'CHERYL Q. REYES',
    advisoryOrCoordinatorship: 'G8 STE-A Class Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'EMath G8-STE A' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'EMath G7-STE B' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Math / Aral 7-Jasmine' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Math 7-Adelfa' },
      { timeSlot: '01:45-02:45', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'Math 7-Dahlia' }
    ]
  },
  {
    no: 13,
    department: 'Mathematics',
    name: 'ROSANO A. ROSACIA',
    advisoryOrCoordinatorship: 'G9 Gallantry Class Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Math / Aral G9-Gallantry' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Math / Aral G9-Excellence' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Math G9-Hope' },
      { timeSlot: '12:45-01:45', days: ['F'], subjectAndSection: 'Aral 10-Charlie' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Val. Ed. G8-Hazel' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Val. Ed. G8-Jade / Aral Aquamarine' }
    ]
  },
  {
    no: 14,
    department: 'Mathematics',
    name: 'ERIC P. VILLARTA',
    advisoryOrCoordinatorship: 'G7 STE-A Math Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'EMath (M-F) G7-STE A' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Math (MTWTH) / Aral (F) G8-RN' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'EMath (M-F) G8-STE B' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Math 8 (MTWTH) / Aral (F) G8-Kalancho' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Math (MTWTH) / Aral (F) G8-Hazel' }
    ]
  },
  {
    no: 15,
    department: 'Mathematics',
    name: 'ROMULO L. YOSORES',
    advisoryOrCoordinatorship: 'G7 SPS Math Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['F'], subjectAndSection: 'Aral (F) 10-Gamma' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Math (MTWF) / Aral (TH) 7-SPS' },
      { timeSlot: '09:45-10:45', days: ['W'], subjectAndSection: 'Aral (W) 9-SPS' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Math 7-Ilang-Ilang (M-TH)' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'MAPEH (T-F) / Aral (M) 7-SPJ' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Math (M-TH) / Aral (F) 7-Geranium' }
    ]
  },

  // =========================================================================
  // 2. TLE / TVE DEPARTMENT (JHS)
  // =========================================================================
  {
    no: 16,
    department: 'TLE',
    name: 'ELLINE B. CABRERA',
    advisoryOrCoordinatorship: 'G10 ICT Coordinator',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE-ICT-V.Arts 10-India' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE-ICT-V.Arts 9-Hope' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE-ICT V.Arts 10-Delta' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE-ICT V. Arts 9-Adorable' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE 7-Kalachuchi' }
    ]
  },
  {
    no: 17,
    department: 'TLE',
    name: 'ZENMAR S. CLAM',
    advisoryOrCoordinatorship: 'G10 CSS Specialization Lead',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE-ICT-CSS 10-Jaguar' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE-ICT-CSS 9-Justice' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE-ICT-CSS 9-Dignity' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Taekwondo Sports Specialization' }
    ]
  },
  {
    no: 18,
    department: 'TLE',
    name: 'LIVE C. OBELDO',
    advisoryOrCoordinatorship: 'Agriculture Lead Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'TLE 10-Harvard / TLE 8-Lavender' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'TLE 8-Beige' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE G9-Kindness' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE 8-Cream' }
    ]
  },
  {
    no: 19,
    department: 'TLE',
    name: 'CINDY PEARL B. OLIS',
    advisoryOrCoordinatorship: 'Drafting Lead Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '08:30-09:30', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'TLE 7-Adelfa' },
      { timeSlot: '09:45-10:45', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'TLE 7-Dahlia' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'TLE 8-Emerald' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'TLE 8-Ivory' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE 8-Kalancho' },
      { timeSlot: '02:45-03:45', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'TLE 7-SPTVE' }
    ]
  },
  {
    no: 20,
    department: 'TLE',
    name: 'NORWIN F. PALAO',
    advisoryOrCoordinatorship: 'Physics / STE Creative Tech In-Charge',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Creative Tech. 7-STE A' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Creative Tech. 7-STE B' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Specialization Lawn Tennis' }
    ]
  },
  {
    no: 21,
    department: 'TLE',
    name: 'EMERSON Y. MADRONERO',
    advisoryOrCoordinatorship: 'G10 Foxtrot TLE Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE 10-Foxtrot' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE 9-Faith' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE 10-Charlie' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE 9-Charity' },
      { timeSlot: '01:45-02:45', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'TLE 7-Ilangilang' },
      { timeSlot: '02:45-03:45', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'TLE 7-Esmeralda' }
    ]
  },
  {
    no: 22,
    department: 'TLE',
    name: 'REY S. TONZO',
    advisoryOrCoordinatorship: 'Electronics / STE Creative Tech Lead',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Creative Tech 8-STE A' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Creative Tech 8-STE A' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Specialization Volleyball' }
    ]
  },
  {
    no: 23,
    department: 'TLE',
    name: 'ANGELIE P. TUMALA',
    advisoryOrCoordinatorship: 'Home Economics In-Charge',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '08:30-09:30', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'TLE 7-Camia' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE 9-Integrity' },
      { timeSlot: '10:45-11:45', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'TLE 7-Hyacinth' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE 9-Bravery' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'TLE G7-Jasmine' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'TLE G7-Fleurdeliz' }
    ]
  },
  {
    no: 24,
    department: 'TLE',
    name: 'ALBERTO R. REYES JR.',
    advisoryOrCoordinatorship: 'Drafting Coordinator',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE 10-Gamma' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE 9-Gallantry' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE 10-Echo' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE 9-Excellence' }
    ]
  },
  {
    no: 25,
    department: 'TLE',
    name: 'NEILYN P. VALIENTE',
    advisoryOrCoordinatorship: 'Home Economics Lead',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '09:45-10:45', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'TLE 8-Fuchsia' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE 10-Bravo' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'TLE 8-Hazel' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'TLE 8-Jade' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Athletics Specialization' }
    ]
  },
  {
    no: 26,
    department: 'TLE',
    name: 'EDALYN M. OLIS',
    advisoryOrCoordinatorship: 'Comp Science Lead In-Charge',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Creative Tech 10-STE A' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'TLE 10 Alpha' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Creative Tech 10-STE B' },
      { timeSlot: '01:45-02:45', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'TLE 7-Bougainvillea' }
    ]
  },

  // =========================================================================
  // 3. SCIENCE DEPARTMENT (JHS)
  // =========================================================================
  {
    no: 27,
    department: 'Science',
    name: 'JUDITH A. BAZAR',
    advisoryOrCoordinatorship: 'G10 General Science Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Guidance Services' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Guidance Services' },
      { timeSlot: '10:45-11:45', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'Science 10-SPJ' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'Science 7-Kalachuchi' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Science 7-Esmeralda' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Science 10-India' }
    ]
  },
  {
    no: 28,
    department: 'Science',
    name: 'IVAN BELNAS',
    advisoryOrCoordinatorship: 'Physics / Research Lead',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Enhanced Science 7 STE-B' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Research 10-STE B' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Research 10-STE A' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'Science 10-Bravo' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Science 10-Echo' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Science 10-Charlie' }
    ]
  },
  {
    no: 29,
    department: 'Science',
    name: 'HEIDI B. CORAMBAO',
    advisoryOrCoordinatorship: 'Chemistry Lead Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Enhanced Science 7 STE-B' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Science G9-SPS' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Science G9-Kindness' },
      { timeSlot: '10:45-11:45', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'Science G9-Adorable' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'Science G9-Bravery' },
      { timeSlot: '02:45-03:45', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'Science G9-Excellence' }
    ]
  },
  {
    no: 30,
    department: 'Science',
    name: 'AILYN E. DELOSTRICO',
    advisoryOrCoordinatorship: 'Biology Lead Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Research 8-STE B' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Science G9-SPS' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Research 8-STE A' },
      { timeSlot: '01:45-02:45', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'Science 9-Gallantry' },
      { timeSlot: '02:45-03:45', days: ['M', 'W', 'F'], subjectAndSection: 'Science 9-Faith' }
    ]
  },
  {
    no: 31,
    department: 'Science',
    name: 'EMMA D. FRANCISCO',
    advisoryOrCoordinatorship: 'Gen. Science Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'RHGP / Science 8-Beige' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'EScience 7-STE A' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Science 7-Geranium' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Science 7-Adelfa' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'Science 7-Hyacinth' },
      { timeSlot: '02:45-03:45', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'Science 7-Ilang-Ilang' }
    ]
  },
  {
    no: 32,
    department: 'Science',
    name: 'JAMILLAH G. MACAPANTON',
    advisoryOrCoordinatorship: 'Biology / Science 8 Lead',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Science 8-Green' },
      { timeSlot: '09:45-10:45', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'Science 8-Kalancho' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'Science 10-Delta' },
      { timeSlot: '01:45-02:45', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'Science 10-Foxtrot' }
    ]
  },
  {
    no: 33,
    department: 'Science',
    name: 'CHRIZA FAITH M. AGUIPO',
    advisoryOrCoordinatorship: 'Gen. Science / STE 10 Lead',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Enhanced Science 10-STE B' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Enhanced Science 10-STE A' },
      { timeSlot: '09:45-10:45', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'Science 10-Alpha' },
      { timeSlot: '12:45-01:45', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'Science 10-Harvard' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Science 10-Gamma' }
    ]
  },
  {
    no: 34,
    department: 'Science',
    name: 'MAGDALENA P. REGALADO',
    advisoryOrCoordinatorship: 'Biology / G9 Dignity Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'Science 9-Dignity' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Science 10-SPS' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Science 10-Jaguar' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Science 9-SPJ' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Science 9-Justice' }
    ]
  },
  {
    no: 35,
    department: 'Science',
    name: 'MARIA COLITA G. REGALADO',
    advisoryOrCoordinatorship: 'Biology / G8 SPJ Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Aral Reading Story Haven' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Science 8-SPJ' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Science 8-Emerald' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Science 8-Hazel' },
      { timeSlot: '12:45-01:45', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'Science 8-Jade' },
      { timeSlot: '01:45-02:45', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'Science 8-Aquamarine' }
    ]
  },

  // =========================================================================
  // 4. ENGLISH DEPARTMENT (JHS)
  // =========================================================================
  {
    no: 36,
    department: 'English',
    name: 'OPHELIA BLANCHE A. ALLERE',
    advisoryOrCoordinatorship: 'G8 Tomas Pinpin Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'English 8-Tomas Pinpin' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'English 7-Esmeralda' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'English 7-Camia' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'English 7-SPJ' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'English 8-RN' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'English 8-Green' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'English 8-Kalancho' }
    ]
  },
  {
    no: 37,
    department: 'English',
    name: 'ALJANE MAE L. ALIVIO',
    advisoryOrCoordinatorship: 'English 7 Lead Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'English 7-Darkblue' },
      { timeSlot: '08:30-09:30', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'English G8-Ivory' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'English G8-Fuchsia' },
      { timeSlot: '12:45-01:45', days: ['T', 'W', 'Th'], subjectAndSection: 'Val.Ed G10-Gamma' }
    ]
  },
  {
    no: 38,
    department: 'English',
    name: 'MARLY A. ALTAMARINO',
    advisoryOrCoordinatorship: 'English 9 Lead Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'English 9-Adorable' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'English G9-Bravery' },
      { timeSlot: '09:45-10:45', days: ['F'], subjectAndSection: 'Val.Ed. 9-Justice' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'English 9-SPS' }
    ]
  },
  {
    no: 39,
    department: 'English',
    name: 'CLAIRE A. BALUCAN',
    advisoryOrCoordinatorship: 'English 9 Justice Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'English 9-Justice' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'MAPEH 9-Adorable' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'English 9 Integrity' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'English 7-Geranium' }
    ]
  },

  // =========================================================================
  // 5. FILIPINO DEPARTMENT (JHS)
  // =========================================================================
  {
    no: 40,
    department: 'Filipino',
    name: 'RUBY DELWANEY ALCAIN',
    advisoryOrCoordinatorship: 'Filipino 7 Lead Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'Filipino 7-Hyacinth' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Filipino 7-Esmeralda' },
      { timeSlot: '10:45-11:45', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'Filipino 7-Ilang-Ilang' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'Filipino 7-Dahlia' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'Filipino 7-Geranium' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Filipino 8-STE A' }
    ]
  },
  {
    no: 41,
    department: 'Filipino',
    name: 'ASHLIA ABDULWAHAB',
    advisoryOrCoordinatorship: 'Filipino 8 Lead Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'Filipino 8-Fleurdeliz' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Filipino 7-Kalachuchi' },
      { timeSlot: '12:45-01:45', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'Filipino 7-SPTVE' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'Filipino 8-SPJ' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Filipino 8-STE B' }
    ]
  },
  {
    no: 42,
    department: 'Filipino',
    name: 'DANICA OPHELLE M. CALIAO',
    advisoryOrCoordinatorship: 'Filipino 9 SPJ Lead Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'Filipino 9 SPJ' },
      { timeSlot: '08:30-09:30', days: ['W'], subjectAndSection: 'Filipino 8-Fuchsia' },
      { timeSlot: '09:45-10:45', days: ['T'], subjectAndSection: 'Filipino 8-Fuchsia' },
      { timeSlot: '12:45-01:45', days: ['M', 'W', 'F'], subjectAndSection: 'Fil 9-STE B' },
      { timeSlot: '01:45-02:45', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'Fil 9-SPS' }
    ]
  },
  {
    no: 43,
    department: 'Filipino',
    name: 'LEAH G. DELOSA',
    advisoryOrCoordinatorship: 'G8 Kalancho / G10 Charlie Filipino Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Aral Reading Story Haven' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Filipino 8-Kalancho' },
      { timeSlot: '09:45-10:45', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'Filipino 10-Bravo' },
      { timeSlot: '10:45-11:45', days: ['W'], subjectAndSection: 'Filipino 8-Kalancho' },
      { timeSlot: '12:45-01:45', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'Filipino 10-India' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Filipino 10-Delta' }
    ]
  },

  // =========================================================================
  // 6. ARAL.PAN. / SOCIAL STUDIES DEPARTMENT (JHS)
  // =========================================================================
  {
    no: 44,
    department: 'Aral.Pan.',
    name: 'CATHERINE C. ABAMONGA',
    advisoryOrCoordinatorship: 'Aral.Pan. 8 Emerald Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '08:30-09:30', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'Aral.Pan. 8-Emerald' },
      { timeSlot: '09:45-10:45', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'Aral.Pan. 7-SPJ' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Aral.Pan. 8-RN' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Aral.Pan. 8-Cream' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'Aral.Pan. 8-STE B' }
    ]
  },
  {
    no: 45,
    department: 'Aral.Pan.',
    name: 'CANAPIYA L. BOCARI',
    advisoryOrCoordinatorship: 'Aral.Pan. 9 Gallantry Lead',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['Th'], subjectAndSection: 'ARPAN 9-Gallantry' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'ARPAN 9-Dignity' },
      { timeSlot: '09:45-10:45', days: ['T', 'Th'], subjectAndSection: 'VAL.ED. 7-SPJ / 7-Ilang-Ilang' },
      { timeSlot: '10:45-11:45', days: ['F'], subjectAndSection: 'VAL.ED. 7-SPJ' },
      { timeSlot: '12:45-01:45', days: ['M'], subjectAndSection: 'ARPAN 9-Gallantry' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'ARPAN 9-Gallantry / 9-Faith' }
    ]
  },
  {
    no: 46,
    department: 'Aral.Pan.',
    name: 'JASSIE B. CABILIN',
    advisoryOrCoordinatorship: 'History / Aral.Pan. 8 Lead',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'ARPAN 8-Hazel' },
      { timeSlot: '08:30-09:30', days: ['F'], subjectAndSection: 'ARPAN 8-Jade' },
      { timeSlot: '09:45-10:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'ARPAN 8-Lavender' },
      { timeSlot: '10:45-11:45', days: ['Th'], subjectAndSection: 'VAL.ED. 9-Integrity' },
      { timeSlot: '12:45-01:45', days: ['M', 'T'], subjectAndSection: 'ARPAN 8-Jade' },
      { timeSlot: '01:45-02:45', days: ['Th'], subjectAndSection: 'ARPAN 8-Jade' }
    ]
  },

  // =========================================================================
  // 7. MAPEH DEPARTMENT (JHS)
  // =========================================================================
  {
    no: 47,
    department: 'MAPEH',
    name: 'OSZEL JUNE R. BALANAY',
    advisoryOrCoordinatorship: 'MAPEH 10 SPS Lead Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'MAPEH 10-SPS' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Science 7-SPJ' },
      { timeSlot: '09:45-10:45', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'Science 7-Jasmine' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'MAPEH 10-Gamma' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'Science 7-Fluerdeliz' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'MAPEH 10 SPJ' }
    ]
  },
  {
    no: 48,
    department: 'MAPEH',
    name: 'AGAKHAN C. CABARO',
    advisoryOrCoordinatorship: 'MAPEH 7 Fleurdeliz Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M'], subjectAndSection: 'MAPEH 8-Lavender' },
      { timeSlot: '08:30-09:30', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'MAPEH 7-Fleurdeliz' },
      { timeSlot: '09:45-10:45', days: ['M'], subjectAndSection: '7-Jasmine' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'MAPEH 7-Camia' },
      { timeSlot: '12:45-01:45', days: ['W'], subjectAndSection: 'MAPEH 7-Jasmine' },
      { timeSlot: '01:45-02:45', days: ['Th'], subjectAndSection: 'MAPEH 7-Jasmine' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Sepak Takraw Specialization' }
    ]
  },
  {
    no: 49,
    department: 'MAPEH',
    name: 'ZSAZHA NICOLET R. CABRERA',
    advisoryOrCoordinatorship: 'MAPEH 9 SPS Lead Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['T', 'W', 'Th', 'F'], subjectAndSection: 'MAPEH 9-SPS' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'F'], subjectAndSection: 'MAPEH 8-Aquamarine' },
      { timeSlot: '12:45-01:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'MAPEH 8-Emerald' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'Th', 'F'], subjectAndSection: 'MAPEHM8-Dark Blue' },
      { timeSlot: '02:45-03:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'MAPEH 9-Bravery' }
    ]
  },

  // =========================================================================
  // 8. VALUES EDUCATION / GUIDANCE DEPARTMENT (JHS)
  // =========================================================================
  {
    no: 50,
    department: 'Val.Ed.',
    name: 'JORALYN A. NARVAL',
    advisoryOrCoordinatorship: 'G7 Esmeralda Guidance / Val.Ed.',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Guidance Services / Val.Ed. 7-SPTVE' },
      { timeSlot: '08:30-09:30', days: ['M', 'T', 'W', 'Th', 'F'], subjectAndSection: 'Guidance Services / Val.Ed. G7-STE B' },
      { timeSlot: '09:45-10:45', days: ['M'], subjectAndSection: 'Val.Ed. G7-Esmeralda' },
      { timeSlot: '10:45-11:45', days: ['M', 'T', 'W', 'Th'], subjectAndSection: 'Val.Ed. G7-Dahlia' },
      { timeSlot: '12:45-01:45', days: ['T', 'W', 'Th'], subjectAndSection: 'Val.Ed. G7-STE A / STE B / Esmeralda' },
      { timeSlot: '01:45-02:45', days: ['M', 'T', 'F'], subjectAndSection: 'Val.Ed. G7-STE A / STE B / Esmeralda' },
      { timeSlot: '02:45-03:45', days: ['W', 'T'], subjectAndSection: 'Val.Ed. G7-STE A / Esmeralda' }
    ]
  },
  {
    no: 51,
    department: 'Val.Ed.',
    name: 'EDWIN H. BERONDO',
    advisoryOrCoordinatorship: 'Val.Ed. G10 Alpha & SPJ Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '08:30-09:30', days: ['W', 'Th', 'F'], subjectAndSection: 'VAL.ED G10-Alpha / G10-SPJ / G10-Foxtrot' },
      { timeSlot: '09:45-10:45', days: ['M', 'W', 'Th', 'F'], subjectAndSection: 'VAL.ED G10-Charlie / G10-Alpha' },
      { timeSlot: '10:45-11:45', days: ['T', 'W', 'F'], subjectAndSection: 'VAL.ED G10-SPJ / G10-Foxtrot / G10-Alpha' },
      { timeSlot: '12:45-01:45', days: ['T', 'W'], subjectAndSection: 'VAL.ED G10-Foxtrot / G10-SPJ' },
      { timeSlot: '01:45-02:45', days: ['M', 'Th', 'F'], subjectAndSection: 'VAL.ED G10-Foxtrot / G10-Alpha / G10-SPJ' }
    ]
  },
  {
    no: 52,
    department: 'Val.Ed.',
    name: 'ZENMAN P. GARCIA',
    advisoryOrCoordinatorship: 'Val.Ed. 8-Emerald Adviser',
    totalMinutes: 1800,
    schedule: [
      { timeSlot: '07:30-08:30', days: ['T', 'F'], subjectAndSection: 'RHGP (M) / VAL.ED. 8-Fuchsia' },
      { timeSlot: '08:30-09:30', days: ['T', 'W'], subjectAndSection: 'VAL.ED. 8-Emerald / 8-Green' },
      { timeSlot: '09:45-10:45', days: ['W', 'Th', 'F'], subjectAndSection: 'VAL.ED 8-Emerald / 8-Green / 10-Harvard' },
      { timeSlot: '10:45-11:45', days: ['T', 'Th', 'F'], subjectAndSection: 'VAL.ED 10-Harvard / 8-Emerald / 8-Green' },
      { timeSlot: '12:45-01:45', days: ['T', 'W', 'F'], subjectAndSection: 'VAL.ED. 8-Green / 10-Harvard / 8-Emerald' }
    ]
  }
];

/**
 * Helper to check if a teacher is vacant at a given timeSlot and day
 */
export function isTeacherVacantAtSlot(
  teacher: JHSTeacherSchedule,
  timeSlot: string,
  day: string // 'M' | 'T' | 'W' | 'Th' | 'F'
): { isVacant: boolean; currentAssignment?: string } {
  const match = teacher.schedule.find(s => s.timeSlot === timeSlot && s.days.includes(day));
  if (!match) {
    return { isVacant: true };
  }
  return { isVacant: false, currentAssignment: match.subjectAndSection };
}
