export interface StudentMasterRecord {
  id: string;
  lrn: string;
  lastName: string;
  firstName: string;
  mi: string;
  sex: 'M' | 'F';
  gradeLevel: 'Grade 3' | 'Grade 8' | 'Grade 11';
  section: string;
  birthDate: string;
  age: number;
  motherTongue: string;
  address: string;
  parentGuardian: string;
  contact: string;
  heightCm: number;
  weightKg: number;
  daysPresent: number;
  daysAbsent: number;
}

export interface SubjectGrade {
  subject: string;
  term1: number;
  term2: number;
  term3: number;
}

export interface StudentGradesECR {
  lrn: string;
  grades: SubjectGrade[];
}

export const SUBJECT_SETS = {
  'Grade 3': [
    'Filipino',
    'English',
    'Mathematics',
    'Science',
    'Araling Panlipunan',
    'Edukasyon sa Pagpapakatao (EsP)',
    'MAPEH'
  ],
  'Grade 8': [
    'Filipino',
    'English',
    'Mathematics',
    'Science',
    'Araling Panlipunan',
    'Edukasyon sa Pagpapakatao (EsP)',
    'MAPEH',
    'Technology and Livelihood Education (TLE)'
  ],
  'Grade 11': [
    'Oral Communication',
    'Komunikasyon at Pananaliksik',
    'General Mathematics',
    'Earth and Life Science',
    'Physical Science',
    'Personal Development',
    'Physical Education and Health',
    'Pre-Calculus'
  ]
};

// 60 Sample Students: 20 in Grade 3 (Mabini), 20 in Grade 8 (Rizal), 20 in Grade 11 (Einstein)
export const INITIAL_60_STUDENTS: StudentMasterRecord[] = [
  // Grade 3 (20 learners)
  ...Array.from({ length: 20 }, (_, i) => {
    const isMale = i < 10;
    const lrn = `1365140300${String(i + 1).padStart(2, '0')}`;
    const firstNamesM = ['Liam', 'Noah', 'Ethan', 'Lucas', 'Mason', 'Oliver', 'Elijah', 'Aiden', 'James', 'Benjamin'];
    const firstNamesF = ['Sophia', 'Olivia', 'Emma', 'Ava', 'Mia', 'Isabella', 'Amelia', 'Harper', 'Evelyn', 'Abigail'];
    const lastNames = ['Abad', 'Alcantara', 'Aquino', 'Bautista', 'Castillo', 'Cruz', 'Del Rosario', 'Garcia', 'Mendoza', 'Ramos', 'Reyes', 'Santos', 'Torres', 'Villanueva', 'Navarro', 'Salazar', 'Mercado', 'Tan', 'Lim', 'Booc'];
    return {
      id: `std-g3-${i + 1}`,
      lrn,
      lastName: lastNames[i],
      firstName: isMale ? firstNamesM[i] : firstNamesF[i - 10],
      mi: String.fromCharCode(65 + (i % 26)) + '.',
      sex: (isMale ? 'M' : 'F') as 'M' | 'F',
      gradeLevel: 'Grade 3' as const,
      section: 'Mabini',
      birthDate: '2017-06-15',
      age: 9,
      motherTongue: 'Cebuano',
      address: 'Poblacion, Tubod, Lanao del Norte',
      parentGuardian: `Mr./Mrs. ${lastNames[i]}`,
      contact: `091700300${String(i + 1).padStart(2, '0')}`,
      heightCm: 125 + (i % 8),
      weightKg: 24 + (i % 6),
      daysPresent: 195 - (i % 5),
      daysAbsent: i % 5
    };
  }),

  // Grade 8 (20 learners)
  ...Array.from({ length: 20 }, (_, i) => {
    const isMale = i < 10;
    const lrn = `1365140800${String(i + 1).padStart(2, '0')}`;
    const firstNamesM = ['Joshua', 'Angelo', 'Gabriel', 'Daniel', 'Christian', 'Mark', 'John Paul', 'Kevin', 'Adrian', 'Nathan'];
    const firstNamesF = ['Princess', 'Chloe', 'Angel', 'Jasmine', 'Nicole', 'Bea', 'Samantha', 'Kaye', 'Andrea', 'Hannah'];
    const lastNames = ['Alonzo', 'Beltran', 'Corpuz', 'Dela Cruz', 'Estrella', 'Ferrer', 'Gonzales', 'Hernandez', 'Ignacio', 'Jimenez', 'Lagman', 'Manalo', 'Natividad', 'Ocampo', 'Pascual', 'Quinto', 'Rivera', 'Santiago', 'Tolentino', 'Valdez'];
    return {
      id: `std-g8-${i + 1}`,
      lrn,
      lastName: lastNames[i],
      firstName: isMale ? firstNamesM[i] : firstNamesF[i - 10],
      mi: String.fromCharCode(66 + (i % 25)) + '.',
      sex: (isMale ? 'M' : 'F') as 'M' | 'F',
      gradeLevel: 'Grade 8' as const,
      section: 'Rizal',
      birthDate: '2012-08-20',
      age: 14,
      motherTongue: 'Cebuano',
      address: 'Baroy, Lanao del Norte',
      parentGuardian: `Mr./Mrs. ${lastNames[i]}`,
      contact: `091700800${String(i + 1).padStart(2, '0')}`,
      heightCm: 152 + (i % 12),
      weightKg: 45 + (i % 10),
      daysPresent: 196 - (i % 6),
      daysAbsent: i % 6
    };
  }),

  // Grade 11 (20 learners)
  ...Array.from({ length: 20 }, (_, i) => {
    const isMale = i < 10;
    const lrn = `1365141100${String(i + 1).padStart(2, '0')}`;
    const firstNamesM = ['Christian Dave', 'John Michael', 'Mark Anthony', 'Al-Rashid', 'Vince Nicole', 'Kenneth', 'Francis', 'Gerald', 'Paolo', 'Dominic'];
    const firstNamesF = ['Princess Mae', 'Mary Grace', 'Sittie Ayna', 'Kimberly Joy', 'Stephanie Nicole', 'Rhea', 'Christine', 'Bea Bianca', 'Janine', 'Clarisse'];
    const lastNames = ['Abella', 'Bacalso', 'Cabilogan', 'Dimaporo', 'Español', 'Fuentes', 'Gomez', 'Hadji', 'Ibarra', 'Jalosjos', 'Kintanar', 'Lomondot', 'Macaspac', 'Nuñez', 'Ortega', 'Pimentel', 'Quirino', 'Rosales', 'Soriano', 'Teodoro'];
    return {
      id: `std-g11-${i + 1}`,
      lrn,
      lastName: lastNames[i],
      firstName: isMale ? firstNamesM[i] : firstNamesF[i - 10],
      mi: String.fromCharCode(67 + (i % 24)) + '.',
      sex: (isMale ? 'M' : 'F') as 'M' | 'F',
      gradeLevel: 'Grade 11' as const,
      section: 'Einstein',
      birthDate: '2009-03-15',
      age: 17,
      motherTongue: (i === 3 || i === 7 || i === 11) ? 'Maranao' : 'Cebuano',
      address: 'Tubod Central, Lanao del Norte',
      parentGuardian: `Mr./Mrs. ${lastNames[i]}`,
      contact: `091701100${String(i + 1).padStart(2, '0')}`,
      heightCm: 165 + (i % 14),
      weightKg: 55 + (i % 12),
      daysPresent: 198 - (i % 4),
      daysAbsent: i % 4
    };
  })
];

// Generate initial 3-term grades for all 60 learners
export const INITIAL_60_GRADES_ECR: StudentGradesECR[] = INITIAL_60_STUDENTS.map((std, idx) => {
  const subjects = SUBJECT_SETS[std.gradeLevel];
  
  // Create realistic grade distributions (High Honors, Honors, Passing, Remediation candidate)
  let baseGrade = 88;
  if (idx % 20 === 0 || idx % 20 === 10) baseGrade = 98; // Highest Honors
  else if (idx % 20 === 1 || idx % 20 === 5) baseGrade = 95; // High Honors
  else if (idx % 20 === 2 || idx % 20 === 6 || idx % 20 === 12) baseGrade = 91; // With Honors
  else if (idx % 20 === 19) baseGrade = 73; // Candidate for Remediation / Retained
  else baseGrade = 82 + ((idx * 3) % 8);

  const grades: SubjectGrade[] = subjects.map((subj, sIdx) => {
    // slight variation per subject and term
    const t1 = Math.min(99, Math.max(70, baseGrade + ((sIdx + idx) % 5) - 2));
    const t2 = Math.min(100, Math.max(70, t1 + ((sIdx % 3) - 1)));
    const t3 = Math.min(100, Math.max(70, t2 + ((idx % 3) - 1)));
    return {
      subject: subj,
      term1: t1,
      term2: t2,
      term3: t3
    };
  });

  return {
    lrn: std.lrn,
    grades
  };
});
