export interface TeacherProgramSchedule {
  teacherName: string;
  semester: string;
  schoolYear: string;
  term: 'Term 1' | 'Term 2';
  durationDays: number;
  advisoryClass?: string;
  coAdvisoryClass?: string;
  coordinatorship?: string;
  schedule: {
    time: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
  }[];
}

export interface TeacherLoadingEntry {
  no: number;
  department: 'Science' | 'Mathematics' | 'Physical Education' | 'English' | 'Filipino' | 'Social Science' | 'ABM' | 'TVL';
  name: string;
  advisoryOrCoordinatorship: string;
  periodsRegular: number;
  periodsALS: number;
  advisoryMinutes: number;
  totalMinutes: number;
  subjectsHandled: string;
}

export interface ClassProgramSchedule {
  gradeLevel: string;
  section: string;
  trackPathway: string;
  preferredExit: string;
  targetJob: string;
  classAdviser: string;
  coAdviser?: string;
  schoolYear: string;
  term: string;
  schedule: {
    time: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
  }[];
}

export interface RUTEQuestionItem {
  number: number;
  passage?: string;
  question: string;
  options: { [key: string]: string };
  correctAnswer?: string;
}

export interface TableOfSpecificationRow {
  no: number;
  topic: string;
  learningCompetency: string;
  hours: number;
  weightPercent: number;
  itemsCount: number;
  r: number;
  u: number;
  ap: number;
  an: number;
  ev: number;
  cr: number;
  itemNos: string;
}

// ==========================================
// 1. OFFICIAL SUMMARY OF TEACHER LOADING (SY 2026-2027)
// ==========================================
export const LNNCHS_SHS_TEACHER_LOADINGS: TeacherLoadingEntry[] = [
  // Science Teachers
  { no: 1, department: 'Science', name: 'GLADYS OQUINA', advisoryOrCoordinatorship: 'G12 GAS 2 Class Adviser', periodsRegular: 23, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1680, subjectsHandled: 'Practical Research 2, General Science, RHGP, Intervention in Science' },
  { no: 2, department: 'Science', name: 'CRISLYN REGIS', advisoryOrCoordinatorship: 'G12 STEM 1 Class Adviser', periodsRegular: 26, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1860, subjectsHandled: 'General Biology 1, General Science, Practical Research 2, Intervention in Science, RHGP' },
  { no: 3, department: 'Science', name: 'AICY NERMAL', advisoryOrCoordinatorship: 'G12 GAS OHSP Class Adviser', periodsRegular: 26, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1860, subjectsHandled: 'General Mathematics, Practical Research 2, Intervention in Science' },
  { no: 4, department: 'Science', name: 'EDGAR MARK SECUYA', advisoryOrCoordinatorship: 'G11 Academic 3 Class Adviser', periodsRegular: 29, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 2040, subjectsHandled: 'General Science, EIM NC II, RHGP' },
  { no: 5, department: 'Science', name: 'ROSEMARIE SILVA', advisoryOrCoordinatorship: 'CO-ADVISER – G11 Academic 10', periodsRegular: 23, periodsALS: 5, advisoryMinutes: 0, totalMinutes: 1680, subjectsHandled: 'DISS (ALS), General Science, General Biology 1, Chemistry 1' },
  { no: 6, department: 'Science', name: 'STEPHEN TABAL', advisoryOrCoordinatorship: 'Laboratory In-Charge (Co-Adviser G12 STEM 1)', periodsRegular: 24, periodsALS: 5, advisoryMinutes: 300, totalMinutes: 2040, subjectsHandled: 'Earth and Life, General Physics 1, Physics 1, Intervention in Science' },
  { no: 7, department: 'Science', name: 'STEAVEN KINTH BOISER', advisoryOrCoordinatorship: 'G12 SMAW OHSP Class Adviser', periodsRegular: 24, periodsALS: 5, advisoryMinutes: 300, totalMinutes: 2040, subjectsHandled: 'Practical Research 2 (ALS), Practical Research 2 (Regular), Life and Career, RHGP, Intervention in Science' },
  { no: 8, department: 'Science', name: 'ESTEWARD BAGUIO', advisoryOrCoordinatorship: 'G11 Academic 10 Class Adviser, Research Coordinator', periodsRegular: 27, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1920, subjectsHandled: 'General Science, Practical Research 2, Biology 1, RHGP, Intervention in Science' },
  { no: 9, department: 'Science', name: 'TRAZY ANN TUASTOMBAN', advisoryOrCoordinatorship: 'G12 HE Class Adviser, SHS YES-O Coordinator', periodsRegular: 25, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1800, subjectsHandled: 'Personal Development, General Science, Chemistry 1, Intervention in Science, RHGP' },

  // Mathematics Teachers
  { no: 1, department: 'Mathematics', name: 'JONATHAN MALLORCA', advisoryOrCoordinatorship: 'CO-ADVISER – G11 Academic 7', periodsRegular: 28, periodsALS: 0, advisoryMinutes: 0, totalMinutes: 1740, subjectsHandled: 'General Mathematics, Finite Mathematics 1, Intervention in Math' },
  { no: 2, department: 'Mathematics', name: 'JUNREY SARAUSAS', advisoryOrCoordinatorship: 'G11 TECHPRO 6 Class Adviser', periodsRegular: 28, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1980, subjectsHandled: 'General Mathematics, UCSP, Intervention in Mathematics, RHGP' },
  { no: 3, department: 'Mathematics', name: 'BERNICE GORDONCILLO', advisoryOrCoordinatorship: 'G11 ACADEMIC 6 Class Adviser', periodsRegular: 27, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1920, subjectsHandled: 'General Mathematics, Practical Research 2, RHGP, Intervention in Math' },
  { no: 4, department: 'Mathematics', name: 'EVELYN CARTIN', advisoryOrCoordinatorship: 'G12 HUMSS 2 Class Adviser', periodsRegular: 27, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1920, subjectsHandled: 'Practical Research 2, General Mathematics, RHGP, Intervention in Math' },

  // Physical Education Teachers
  { no: 1, department: 'Physical Education', name: 'REN ARIEL TERRADO', advisoryOrCoordinatorship: 'CO-ADVISORY – G12 Sports, Assistant LNNCHS-Band', periodsRegular: 27, periodsALS: 0, advisoryMinutes: 0, totalMinutes: 1620, subjectsHandled: 'Life and Career, Fitness and Recreational' },
  { no: 2, department: 'Physical Education', name: 'JENEFER ARQUITA', advisoryOrCoordinatorship: 'G11 Academic 7 Class Adviser, Assistant to the BSP Coordinator', periodsRegular: 23, periodsALS: 2, advisoryMinutes: 300, totalMinutes: 1800, subjectsHandled: 'PE 3 (ALS), PE 3 (Regular), Human Movement 1, Life and Career, RHGP' },
  { no: 3, department: 'Physical Education', name: 'KHRIZZA FLORES', advisoryOrCoordinatorship: 'G12 Sports Class Adviser', periodsRegular: 25, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1800, subjectsHandled: 'Sports Officiating, PE 3, RHGP' },

  // English Teachers
  { no: 1, department: 'English', name: 'MARIA CHRISTINA SANTILLAN', advisoryOrCoordinatorship: 'G11 TECHPRO 4/6 Class Adviser, SWAP Club Adviser', periodsRegular: 21, periodsALS: 5, advisoryMinutes: 300, totalMinutes: 1860, subjectsHandled: 'Effective Communication, 21st Century (ALS), Trends, RHGP' },
  { no: 2, department: 'English', name: 'MARJORIE TAGACAY', advisoryOrCoordinatorship: 'CO-ADVISER G12 HUMSS 3, Journalism Coach, G12 Chairman', periodsRegular: 13, periodsALS: 8, advisoryMinutes: 300, totalMinutes: 1860, subjectsHandled: 'Philippine Politics (ALS), Personal Development, Effective Communication, Intervention in English' },
  { no: 3, department: 'English', name: 'RONALYN PARADERO', advisoryOrCoordinatorship: 'G12 HUMSS 3 Class Adviser', periodsRegular: 26, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1860, subjectsHandled: 'Philippine Politics, UCSP, Life and Career, Intervention in English, RHGP' },
  { no: 4, department: 'English', name: 'MARILYN ALABA', advisoryOrCoordinatorship: 'G12 STEM 2 Class Adviser, Journalism Coach', periodsRegular: 27, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1920, subjectsHandled: 'Personal Development, Effective Communication, RHGP, Intervention in English' },
  { no: 5, department: 'English', name: 'JENILOU MICULOB', advisoryOrCoordinatorship: 'G9 GALLANTRY Class Adviser / G11 SMAW OHSP', periodsRegular: 34, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 2340, subjectsHandled: 'EAPP (ALS), Trends, Homeroom Guidance' },
  { no: 6, department: 'English', name: 'KEN LUGATIMAN', advisoryOrCoordinatorship: 'G12 GAS 1 Class Adviser', periodsRegular: 25, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1800, subjectsHandled: 'UCSP, Philippine Politics, Effective Communication, RHGP' },
  { no: 7, department: 'English', name: 'ARJENE CANOOG', advisoryOrCoordinatorship: 'G11 Academic 4 Class Adviser', periodsRegular: 20, periodsALS: 5, advisoryMinutes: 300, totalMinutes: 1800, subjectsHandled: 'Oral Communication (ALS), Effective Communication, Life and Career, RHGP, Project DEAR' },

  // Filipino Teachers
  { no: 1, department: 'Filipino', name: 'ARRVIC M. VILLEGAS', advisoryOrCoordinatorship: 'G11 and G12 ALS Class Adviser, Grade 11 Chairman, BSP Coordinator', periodsRegular: 20, periodsALS: 5, advisoryMinutes: 300, totalMinutes: 1800, subjectsHandled: 'Komunikasyon (ALS), Mabisang Komunikasyon, Filipino 1' },
  { no: 2, department: 'Filipino', name: 'IVY-GEN CABURAL', advisoryOrCoordinatorship: 'G11 ACADEMIC 5 Class Adviser', periodsRegular: 23, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1680, subjectsHandled: 'Mabisang Komunikasyon, World Religion, Personal Development, RHGP' },
  { no: 3, department: 'Filipino', name: 'HAZEL SALOMSOM', advisoryOrCoordinatorship: 'G11 ACADEMIC 8 Class Adviser', periodsRegular: 26, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1860, subjectsHandled: 'Pag-aaral ng Kasaysayan, Mabisang Komunikasyon, Personal Development, RHGP' },
  { no: 4, department: 'Filipino', name: 'LUCY RESABA', advisoryOrCoordinatorship: 'G12 ABM 2 Class Adviser, Journalism Coach', periodsRegular: 22, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1620, subjectsHandled: 'Practical Research 2, Mabisang Komunikasyon, RHGP, Project DEAR' },
  { no: 5, department: 'Filipino', name: 'LOVELY QUEEN GUILOT', advisoryOrCoordinatorship: 'G11 TECHPRO 2 Class Adviser', periodsRegular: 24, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1740, subjectsHandled: 'Pag-aaral ng Kasaysayan, Mabisang Komunikasyon, Personal Development, RHGP, Project DEAR' },
  { no: 6, department: 'Filipino', name: 'ROSELYN RUFINO', advisoryOrCoordinatorship: 'G11 ACADEMIC 1 Class Adviser', periodsRegular: 27, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1920, subjectsHandled: 'Mabisang Komunikasyon, Pag-aaral ng Kasaysayan, UCSP, RHGP, Project DEAR' },

  // Social Science Teachers
  { no: 1, department: 'Social Science', name: 'MELVIN TABACON', advisoryOrCoordinatorship: 'G12 EIM Class Adviser, Guidance Designate', periodsRegular: 20, periodsALS: 5, advisoryMinutes: 300, totalMinutes: 1800, subjectsHandled: 'World Religion (ALS), UCSP, Practical Research 2, Philosophy, RHGP' },
  { no: 2, department: 'Social Science', name: 'NIDALYN JUMAWAN', advisoryOrCoordinatorship: 'G11 and G12 HE Class Adviser, Guidance Designate', periodsRegular: 23, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1680, subjectsHandled: 'Agriculture NC II, Life and Career, Project DEAR' },
  { no: 3, department: 'Social Science', name: 'ISRAFEL JUTBA', advisoryOrCoordinatorship: 'G12 HUMSS 4 Class Adviser', periodsRegular: 23, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1680, subjectsHandled: 'Personal Development, UCSP, Life and Career, RHGP, Project DEAR' },
  { no: 4, department: 'Social Science', name: 'BRECHT TAMPUS', advisoryOrCoordinatorship: 'G11 ACADEMIC 7 OHSP Class Adviser', periodsRegular: 20, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1500, subjectsHandled: 'Pag-aaral ng Kasaysayan' },
  { no: 5, department: 'Social Science', name: 'MARK JAPETH BALATERO', advisoryOrCoordinatorship: 'G12 HUMSS 1/2 Class Adviser, SSLG Adviser', periodsRegular: 25, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1800, subjectsHandled: 'Personal Development, Practical Research 2, RHGP, Project DEAR' },

  // ABM Teachers
  { no: 1, department: 'ABM', name: 'BIMBO GUPIT', advisoryOrCoordinatorship: 'G11 ACADEMIC 9 Class Adviser', periodsRegular: 21, periodsALS: 8, advisoryMinutes: 300, totalMinutes: 2040, subjectsHandled: 'Applied Economics (ALS), Business 1, Applied Economics (Regular)' },
  { no: 2, department: 'ABM', name: 'AN MICULOB', advisoryOrCoordinatorship: 'G11 ACADEMIC 2 Class Adviser', periodsRegular: 23, periodsALS: 5, advisoryMinutes: 300, totalMinutes: 1980, subjectsHandled: 'General Mathematics (ALS), Life and Career, Philippine Politics, RHGP, Intervention in Math' },
  { no: 3, department: 'ABM', name: 'INA KRISTIE DEANG', advisoryOrCoordinatorship: 'G11 TECHPRO 1 Class Adviser', periodsRegular: 23, periodsALS: 5, advisoryMinutes: 300, totalMinutes: 1980, subjectsHandled: 'Organization and Management (ALS), Life and Career, RHGP, Business Finance' },
  { no: 4, department: 'ABM', name: 'MARY FE LACIA', advisoryOrCoordinatorship: 'G12 ABM 1/2 Class Adviser', periodsRegular: 29, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 2040, subjectsHandled: 'FABM 2, Personal Development, RHGP, Intervention in Math' },
  { no: 5, department: 'ABM', name: 'HARVY LEGH MICULOB', advisoryOrCoordinatorship: 'G11 TECHPRO 3 Class Adviser', periodsRegular: 28, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1980, subjectsHandled: 'Pag-aaral ng Kasaysayan, RHGP, Intervention in Math' },
  { no: 6, department: 'ABM', name: 'JOENEL ALMONIA', advisoryOrCoordinatorship: 'G12 SMAW 1 Class Adviser', periodsRegular: 18, periodsALS: 5, advisoryMinutes: 300, totalMinutes: 1680, subjectsHandled: 'Personal Development (ALS), UCSP, RHGP, Intervention in Math' },

  // TVL Teachers
  { no: 1, department: 'TVL', name: 'ERMA CELIA IGNACIO', advisoryOrCoordinatorship: 'G12 SMAW 2 Class Adviser', periodsRegular: 25, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1800, subjectsHandled: 'RHGP, Life and Career, UCSP' },
  { no: 2, department: 'TVL', name: 'MYLA BECOY', advisoryOrCoordinatorship: 'LABORATORY IN-CHARGE (Co-Adviser G12 HE)', periodsRegular: 26, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1860, subjectsHandled: 'Cookery NC II, Kitchen Operations' },
  { no: 3, department: 'TVL', name: 'JAMES OLIVER DEANG', advisoryOrCoordinatorship: 'LABORATORY IN-CHARGE, ALS Coordinator (Co-Adv G11 TechPro 5)', periodsRegular: 28, periodsALS: 5, advisoryMinutes: 300, totalMinutes: 2280, subjectsHandled: 'E-Tech (ALS), Telecom NC II, CSS NC II, Oracle Database' },
  { no: 4, department: 'TVL', name: 'SHERINE GENEBRALDO', advisoryOrCoordinatorship: 'G11 TECHPRO 5 Class Adviser', periodsRegular: 25, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1800, subjectsHandled: 'RHGP, Life and Career, UCSP, CSS NC II' },
  { no: 5, department: 'TVL', name: 'ANNAFEL NOVA MACAPOBRE', advisoryOrCoordinatorship: 'G12 ICT Class Adviser', periodsRegular: 25, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1800, subjectsHandled: 'RHGP, Computer Programming NC II, UCSP, World Religion' },
  { no: 6, department: 'TVL', name: 'HEZEL TESIO', advisoryOrCoordinatorship: 'LABORATORY IN-CHARGE (Co-Adv G11 TechPro 4)', periodsRegular: 25, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1800, subjectsHandled: 'Life and Career, PE 3, Food and Beverage NC II' },
  { no: 7, department: 'TVL', name: 'KRISTINE CAPAO', advisoryOrCoordinatorship: 'LABORATORY IN-CHARGE (Co-Adv G12 ICT / Grade 12 OHSP SMAW)', periodsRegular: 31, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 2160, subjectsHandled: 'Technical Drafting NC II' },
  { no: 8, department: 'TVL', name: 'ABBY GRACE GALLARDO', advisoryOrCoordinatorship: 'LABORATORY IN-CHARGE (Co-Adv G12 SMAW 2)', periodsRegular: 26, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 1860, subjectsHandled: 'SMAW NC II, Manual Metal Arc Welding NC II' },
  { no: 9, department: 'TVL', name: 'JOVANAE BENITEZ', advisoryOrCoordinatorship: 'LABORATORY IN-CHARGE', periodsRegular: 29, periodsALS: 0, advisoryMinutes: 300, totalMinutes: 2040, subjectsHandled: 'SMAW NC II, EIM NC II' }
];

export const LNNCHS_SIGNATORIES = {
  preparedBy: {
    name: 'ARRVIC M. VILLEGAS',
    title: 'SHS Program Coordinator'
  },
  recommendingApproval: {
    name: 'JOAHN J. ANDOT',
    title: 'Assistant School Principal II'
  },
  approvedBy: {
    name: 'ANISAH A. SINAL',
    title: 'School Principal IV'
  }
};

// ==========================================
// 2. GRADE 12 ROTATIONAL INTERVENTION (SII)
// ==========================================
export const LNNCHS_G12_INTERVENTIONS = [
  { gradeSection: 'G12 SMAW 1', time: '2:45 – 3:45', day: 'THURSDAY', teacher: 'STEPHEN TABAL', subject: 'SCIENCE' },
  { gradeSection: 'G12 SMAW 2', time: '2:45 – 3:45', day: 'FRIDAY', teacher: 'RONALYN PARADERO', subject: 'ENGLISH' },
  { gradeSection: 'G12 EIM', time: '2:45 – 3:45', day: 'FRIDAY', teacher: 'JUNREY SARAUSAS', subject: 'MATH' },
  { gradeSection: 'G12 ICT', time: '2:45 – 3:45', day: 'FRIDAY', teacher: 'STEPHEN TABAL', subject: 'SCIENCE' },
  { gradeSection: 'G12 HE', time: '12:45 – 1:45', day: 'FRIDAY', teacher: 'STEAVEN BOISER', subject: 'SCIENCE' },
  { gradeSection: 'G12 SPORTS', time: '2:45 – 3:45', day: 'TUESDAY', teacher: 'RONALYN PARADERO', subject: 'ENGLISH' },
  { gradeSection: 'G12 STEM 1', time: '10:45 – 11:45', day: 'FRIDAY', teacher: 'RONALYN PARADERO', subject: 'ENGLISH' },
  { gradeSection: 'G12 STEM 2', time: '9:45 – 10:45', day: 'FRIDAY', teacher: 'RONALYN PARADERO', subject: 'ENGLISH' },
  { gradeSection: 'G12 ABM 1', time: '12:45 – 1:45', day: 'FRIDAY', teacher: 'MARJORIE TAGACAY', subject: 'ENGLISH' },
  { gradeSection: 'G12 ABM 2', time: '1:45 – 2:45', day: 'THURSDAY', teacher: 'RONALYN PARADERO', subject: 'ENGLISH' },
  { gradeSection: 'G12 HUMSS 1', time: '1:45 – 2:45', day: 'FRIDAY', teacher: 'TRAZY ANN TUASTOMBAN', subject: 'SCIENCE' },
  { gradeSection: 'G12 HUMSS 2', time: '8:30 – 9:30', day: 'MONDAY', teacher: 'RONALYN PARADERO', subject: 'ENGLISH' },
  { gradeSection: 'G12 HUMSS 3', time: '1:45 – 2:45', day: 'MONDAY', teacher: 'TRAZY ANN TUASTOMBAN', subject: 'SCIENCE' },
  { gradeSection: 'G12 HUMSS 4', time: '1:45 – 2:45', day: 'WEDNESDAY', teacher: 'RONALYN PARADERO', subject: 'ENGLISH' },
  { gradeSection: 'G12 GAS 1', time: '10:45 – 11:45', day: 'MONDAY', teacher: 'HARVY LEGH MICULOB', subject: 'MATH' },
  { gradeSection: 'G12 GAS 2', time: '8:30 – 9:30', day: 'TUESDAY', teacher: 'MARJORIE TAGACAY', subject: 'ENGLISH' }
];

// ==========================================
// 3. TABLE OF SPECIFICATIONS (TOS) - LIFE & CAREER SKILLS
// ==========================================
export const LNNCHS_LIFE_CAREER_TOS: TableOfSpecificationRow[] = [
  { no: 1, topic: 'Self-Development', learningCompetency: 'Examine one’s sense of self through developmental stages, tasks, and protective and risk factors.', hours: 16, weightPercent: 20.0, itemsCount: 12, r: 0, u: 5, ap: 3, an: 2, ev: 2, cr: 0, itemNos: '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12' },
  { no: 2, topic: 'Health and Well-Being', learningCompetency: 'Exhibit understanding of fitness, mindfulness, and physical routines promoting development and well-being.', hours: 16, weightPercent: 20.0, itemsCount: 12, r: 0, u: 5, ap: 3, an: 3, ev: 1, cr: 0, itemNos: '13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24' },
  { no: 3, topic: 'Reflective Life Skills', learningCompetency: 'Reflect on experiences supporting self-awareness, self-acceptance, and self-regulation across domains.', hours: 8, weightPercent: 10.0, itemsCount: 6, r: 0, u: 1, ap: 2, an: 2, ev: 1, cr: 0, itemNos: '25, 26, 27, 28, 29, 30' },
  { no: 4, topic: 'Healthy Relationships', learningCompetency: 'Articulate the importance and dynamics of healthy relationships, growth, productivity, wellness, and conflict management.', hours: 16, weightPercent: 20.0, itemsCount: 12, r: 0, u: 4, ap: 4, an: 3, ev: 1, cr: 0, itemNos: '31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42' },
  { no: 5, topic: 'Interpersonal Effectiveness', learningCompetency: 'Apply effective communication, empathy, fairness, kindness, collaboration, and pakikipagkapwa in social situations.', hours: 16, weightPercent: 20.0, itemsCount: 12, r: 0, u: 4, ap: 4, an: 3, ev: 1, cr: 0, itemNos: '43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54' },
  { no: 6, topic: 'Collaborative Activities', learningCompetency: 'Apply skills that enhance interaction through group, sports, recreational, and rhythmic activities.', hours: 8, weightPercent: 10.0, itemsCount: 6, r: 0, u: 2, ap: 2, an: 1, ev: 1, cr: 0, itemNos: '55, 56, 57, 58, 59, 60' }
];

export const LIFE_CAREER_EXAM_ANSWER_KEY: { [key: number]: string } = {
  1: 'B', 2: 'C', 3: 'C', 4: 'C', 5: 'B', 6: 'C', 7: 'B', 8: 'B', 9: 'D', 10: 'B',
  11: 'B', 12: 'D', 13: 'D', 14: 'A', 15: 'C', 16: 'A', 17: 'A', 18: 'B', 19: 'A', 20: 'A',
  21: 'D', 22: 'B', 23: 'C', 24: 'A', 25: 'C', 26: 'C', 27: 'D', 28: 'B', 29: 'B', 30: 'A',
  31: 'B', 32: 'C', 33: 'C', 34: 'C', 35: 'A', 36: 'C', 37: 'A', 38: 'B', 39: 'D', 40: 'A',
  41: 'D', 42: 'A', 43: 'A', 44: 'D', 45: 'A', 46: 'D', 47: 'C', 48: 'A', 49: 'D', 50: 'D',
  51: 'D', 52: 'C', 53: 'D', 54: 'D', 55: 'B', 56: 'B', 57: 'A', 58: 'D', 59: 'B', 60: 'C'
};
