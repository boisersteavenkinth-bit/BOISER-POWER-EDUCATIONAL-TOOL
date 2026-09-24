export interface SectionDefinition {
  id: string;
  sectionId?: string;
  gradeLevel: 'Grade 7' | 'Grade 8' | 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12' | string;
  sectionName: string;
  adviserName: string;
  adviserPosition?: 'Teacher I' | 'Teacher II' | 'Teacher III' | 'Master Teacher I' | 'Master Teacher II' | string;
  adviserEmail?: string;
  roomNumber?: string;
  roomAssignment?: string;
  trackStrand?: string;
  trackOrStrand?: string;
  curriculum?: string;
  keyStage?: string;
  maleCount?: number;
  femaleCount?: number;
  totalLearners?: number;
  studentCount?: number;
  students?: any[];
}

export interface LISStudentMasterRecord {
  id: string;
  lrn: string;
  lastName: string;
  firstName: string;
  mi: string;
  fullName: string;
  sex: 'M' | 'F';
  gradeLevel: 'Grade 7' | 'Grade 8' | 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';
  section: string;
  adviser: string;
  trackStrand?: string;
  birthDate: string;
  age: number;
  motherTongue: string;
  address: string;
  parentGuardian: string;
  contact: string;
  lisStatus: 'Officially Enrolled' | 'Transferred In' | 'Balik-Aral' | 'Repeater';
  verificationStatus: 'Verified (LIS Synced)' | 'Pending Division Validation' | 'Enrolled with Documents';
  heightCm: number;
  weightKg: number;
  daysPresent: number;
  daysAbsent: number;
}

// 20 SECTIONS PER GRADE LEVEL (Grades 7, 8, 9, 10, 11, 12 = 120 SECTIONS TOTAL)
export const LNNCHS_20_SECTIONS_PER_GRADE: Record<string, SectionDefinition[]> = {
  'Grade 7': [
    { id: 'g7-1', gradeLevel: 'Grade 7', sectionName: 'STE 7-A (Curie)', adviserName: 'Dr. Sheila Marie C. Datu', adviserPosition: 'Master Teacher I', roomNumber: 'Bldg A-101 (Science Wing)', trackStrand: 'Science, Technology & Engineering (STE)', curriculum: 'MATATAG / Special Science', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g7-2', gradeLevel: 'Grade 7', sectionName: 'STE 7-B (Newton)', adviserName: 'Lourdes T. Dimaporo', adviserPosition: 'Master Teacher I', roomNumber: 'Bldg A-102 (Science Wing)', trackStrand: 'Science, Technology & Engineering (STE)', curriculum: 'MATATAG / Special Science', keyStage: 'Key Stage 3 (JHS)', maleCount: 21, femaleCount: 24, totalLearners: 45 },
    { id: 'g7-3', gradeLevel: 'Grade 7', sectionName: 'SPS 7 (Olympus)', adviserName: 'Coach Bernardo L. Diaz', adviserPosition: 'Teacher III', roomNumber: 'Bldg A-103 (Sports Wing)', trackStrand: 'Special Program in Sports (SPS)', curriculum: 'MATATAG / DO 25, s. 2015', keyStage: 'Key Stage 3 (JHS)', maleCount: 26, femaleCount: 19, totalLearners: 45 },
    { id: 'g7-4', gradeLevel: 'Grade 7', sectionName: 'SPJ 7 (Chronicle)', adviserName: 'Rowena L. Gonzaga', adviserPosition: 'Teacher III', roomNumber: 'Bldg A-104 (Journalism Lab)', trackStrand: 'Special Program in Journalism (SPJ)', curriculum: 'MATATAG / Special Curricular', keyStage: 'Key Stage 3 (JHS)', maleCount: 18, femaleCount: 27, totalLearners: 45 },
    { id: 'g7-5', gradeLevel: 'Grade 7', sectionName: 'Diamond', adviserName: 'Carmelita A. Navarro', adviserPosition: 'Master Teacher I', roomNumber: 'Bldg A-105', curriculum: 'MATATAG / K to 12', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g7-6', gradeLevel: 'Grade 7', sectionName: 'Ruby', adviserName: 'Vicente K. Corpuz', adviserPosition: 'Teacher III', roomNumber: 'Bldg A-106', curriculum: 'MATATAG / K to 12', keyStage: 'Key Stage 3 (JHS)', maleCount: 21, femaleCount: 24, totalLearners: 45 },
    { id: 'g7-7', gradeLevel: 'Grade 7', sectionName: 'Emerald', adviserName: 'Sittie Rahma D. Hadji', adviserPosition: 'Teacher II', roomNumber: 'Bldg A-107', curriculum: 'MATATAG / K to 12', keyStage: 'Key Stage 3 (JHS)', maleCount: 23, femaleCount: 22, totalLearners: 45 },
    { id: 'g7-8', gradeLevel: 'Grade 7', sectionName: 'Sapphire', adviserName: 'Mark Lester G. Manalo', adviserPosition: 'Teacher I', roomNumber: 'Bldg A-108', curriculum: 'MATATAG / K to 12', keyStage: 'Key Stage 3 (JHS)', maleCount: 20, femaleCount: 25, totalLearners: 45 },
    { id: 'g7-9', gradeLevel: 'Grade 7', sectionName: 'Pearl', adviserName: 'Evangeline P. Ignacio', adviserPosition: 'Teacher III', roomNumber: 'Bldg A-109', curriculum: 'MATATAG / K to 12', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 22, totalLearners: 44 },
    { id: 'g7-10', gradeLevel: 'Grade 7', sectionName: 'Topaz', adviserName: 'Dennis R. Jimenez', adviserPosition: 'Teacher II', roomNumber: 'Bldg A-110', curriculum: 'MATATAG / K to 12', keyStage: 'Key Stage 3 (JHS)', maleCount: 24, femaleCount: 21, totalLearners: 45 },
    { id: 'g7-11', gradeLevel: 'Grade 7', sectionName: 'Amethyst', adviserName: 'Glenda F. Lagman', adviserPosition: 'Teacher III', roomNumber: 'Bldg A-111', curriculum: 'MATATAG / K to 12', keyStage: 'Key Stage 3 (JHS)', maleCount: 21, femaleCount: 24, totalLearners: 45 },
    { id: 'g7-12', gradeLevel: 'Grade 7', sectionName: 'Opal', adviserName: 'Jonathan B. Natividad', adviserPosition: 'Teacher I', roomNumber: 'Bldg A-112', curriculum: 'MATATAG / K to 12', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g7-13', gradeLevel: 'Grade 7', sectionName: 'Garnet', adviserName: 'Lilibeth M. Estrella', adviserPosition: 'Master Teacher II', roomNumber: 'Bldg A-113', curriculum: 'MATATAG / K to 12', keyStage: 'Key Stage 3 (JHS)', maleCount: 23, femaleCount: 22, totalLearners: 45 },
    { id: 'g7-14', gradeLevel: 'Grade 7', sectionName: 'Jade', adviserName: 'Alvin T. Ferrer', adviserPosition: 'Teacher II', roomNumber: 'Bldg A-114', curriculum: 'MATATAG / K to 12', keyStage: 'Key Stage 3 (JHS)', maleCount: 20, femaleCount: 24, totalLearners: 44 },
    { id: 'g7-15', gradeLevel: 'Grade 7', sectionName: 'Aquamarine', adviserName: 'Nenita L. Gonzales', adviserPosition: 'Teacher III', roomNumber: 'Bldg A-115', curriculum: 'MATATAG / K to 12', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g7-16', gradeLevel: 'Grade 7', sectionName: 'Quartz', adviserName: 'Roderick S. Hernandez', adviserPosition: 'Teacher I', roomNumber: 'Bldg A-116', curriculum: 'MATATAG / K to 12', keyStage: 'Key Stage 3 (JHS)', maleCount: 21, femaleCount: 23, totalLearners: 44 },
    { id: 'g7-17', gradeLevel: 'Grade 7', sectionName: 'Onyx', adviserName: 'Rosalinda C. Valdez', adviserPosition: 'Teacher II', roomNumber: 'Bldg A-117', curriculum: 'MATATAG / K to 12', keyStage: 'Key Stage 3 (JHS)', maleCount: 24, femaleCount: 21, totalLearners: 45 },
    { id: 'g7-18', gradeLevel: 'Grade 7', sectionName: 'Turquoise', adviserName: 'Benjamin G. Alonzo', adviserPosition: 'Teacher III', roomNumber: 'Bldg A-118', curriculum: 'MATATAG / K to 12', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g7-19', gradeLevel: 'Grade 7', sectionName: 'Amber', adviserName: 'Shirley D. Salazar', adviserPosition: 'Teacher I', roomNumber: 'Bldg A-119', curriculum: 'MATATAG / K to 12', keyStage: 'Key Stage 3 (JHS)', maleCount: 20, femaleCount: 24, totalLearners: 44 },
    { id: 'g7-20', gradeLevel: 'Grade 7', sectionName: 'Zircon', adviserName: 'Marlon P. Mercado', adviserPosition: 'Teacher II', roomNumber: 'Bldg A-120', curriculum: 'MATATAG / K to 12', keyStage: 'Key Stage 3 (JHS)', maleCount: 23, femaleCount: 22, totalLearners: 45 }
  ],

  'Grade 8': [
    { id: 'g8-1', gradeLevel: 'Grade 8', sectionName: 'STE 8-A (Franklin)', adviserName: 'Engr. Nelson V. Borres', adviserPosition: 'Master Teacher II', roomNumber: 'Bldg B-201 (Biotech Lab)', trackStrand: 'Science, Technology & Engineering (STE)', curriculum: 'K to 12 Science Special', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g8-2', gradeLevel: 'Grade 8', sectionName: 'STE 8-B (Pasteur)', adviserName: 'Grace N. Villanueva', adviserPosition: 'Master Teacher II', roomNumber: 'Bldg B-202 (Biotech Lab)', trackStrand: 'Science, Technology & Engineering (STE)', curriculum: 'K to 12 Science Special', keyStage: 'Key Stage 3 (JHS)', maleCount: 21, femaleCount: 24, totalLearners: 45 },
    { id: 'g8-3', gradeLevel: 'Grade 8', sectionName: 'SPS 8 (Achilles)', adviserName: 'Reynaldo M. Cruz', adviserPosition: 'Teacher III', roomNumber: 'Bldg B-203 (Sports Wing)', trackStrand: 'Special Program in Sports (SPS)', curriculum: 'K to 12 / DO 25, s. 2015', keyStage: 'Key Stage 3 (JHS)', maleCount: 27, femaleCount: 18, totalLearners: 45 },
    { id: 'g8-4', gradeLevel: 'Grade 8', sectionName: 'SPJ 8 (Herald)', adviserName: 'Aileen D. Rosales', adviserPosition: 'Teacher III', roomNumber: 'Bldg B-204 (Press Room)', trackStrand: 'Special Program in Journalism (SPJ)', curriculum: 'K to 12 Special Curricular', keyStage: 'Key Stage 3 (JHS)', maleCount: 19, femaleCount: 26, totalLearners: 45 },
    { id: 'g8-5', gradeLevel: 'Grade 8', sectionName: 'Sampaguita', adviserName: 'Cherry Mae P. Alcantara', adviserPosition: 'Teacher I', roomNumber: 'Bldg B-205', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 22, totalLearners: 44 },
    { id: 'g8-6', gradeLevel: 'Grade 8', sectionName: 'Rosal', adviserName: 'Arnel G. Fernandez', adviserPosition: 'Teacher II', roomNumber: 'Bldg B-206', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 24, femaleCount: 21, totalLearners: 45 },
    { id: 'g8-7', gradeLevel: 'Grade 8', sectionName: 'Orchid', adviserName: 'Danilo E. Ocampo', adviserPosition: 'Teacher II', roomNumber: 'Bldg B-207', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 21, femaleCount: 24, totalLearners: 45 },
    { id: 'g8-8', gradeLevel: 'Grade 8', sectionName: 'Camia', adviserName: 'Jocelyn S. Tan', adviserPosition: 'Teacher III', roomNumber: 'Bldg B-208', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g8-9', gradeLevel: 'Grade 8', sectionName: 'Ilang-Ilang', adviserName: 'Noel J. Macaspac', adviserPosition: 'Teacher I', roomNumber: 'Bldg B-209', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 23, femaleCount: 22, totalLearners: 45 },
    { id: 'g8-10', gradeLevel: 'Grade 8', sectionName: 'Dahlia', adviserName: 'Eduardo B. Quinto', adviserPosition: 'Teacher III', roomNumber: 'Bldg B-210', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 20, femaleCount: 24, totalLearners: 44 },
    { id: 'g8-11', gradeLevel: 'Grade 8', sectionName: 'Gumamela', adviserName: 'Maritess H. Beltran', adviserPosition: 'Teacher I', roomNumber: 'Bldg B-211', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g8-12', gradeLevel: 'Grade 8', sectionName: 'Adelfa', adviserName: 'Nestor C. Pascual', adviserPosition: 'Teacher II', roomNumber: 'Bldg B-212', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 21, femaleCount: 23, totalLearners: 44 },
    { id: 'g8-13', gradeLevel: 'Grade 8', sectionName: 'Bougainvillea', adviserName: 'Cristina R. Lim', adviserPosition: 'Teacher III', roomNumber: 'Bldg B-213', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 24, femaleCount: 21, totalLearners: 45 },
    { id: 'g8-14', gradeLevel: 'Grade 8', sectionName: 'Carnation', adviserName: 'Gil M. Tolentino', adviserPosition: 'Master Teacher I', roomNumber: 'Bldg B-214', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g8-15', gradeLevel: 'Grade 8', sectionName: 'Daisy', adviserName: 'Flordeliza S. Rivera', adviserPosition: 'Teacher II', roomNumber: 'Bldg B-215', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 20, femaleCount: 24, totalLearners: 44 },
    { id: 'g8-16', gradeLevel: 'Grade 8', sectionName: 'Everlasting', adviserName: 'Arnold J. Santiago', adviserPosition: 'Teacher III', roomNumber: 'Bldg B-216', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 23, femaleCount: 22, totalLearners: 45 },
    { id: 'g8-17', gradeLevel: 'Grade 8', sectionName: 'Gardenia', adviserName: 'Helen N. Castillo', adviserPosition: 'Teacher III', roomNumber: 'Bldg B-217', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 21, femaleCount: 24, totalLearners: 45 },
    { id: 'g8-18', gradeLevel: 'Grade 8', sectionName: 'Hyacinth', adviserName: 'Gregorio E. Aquino', adviserPosition: 'Master Teacher I', roomNumber: 'Bldg B-218', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g8-19', gradeLevel: 'Grade 8', sectionName: 'Iris', adviserName: 'Annaliza J. Ramos', adviserPosition: 'Teacher II', roomNumber: 'Bldg B-219', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 22, totalLearners: 44 },
    { id: 'g8-20', gradeLevel: 'Grade 8', sectionName: 'Jasmine', adviserName: 'Wilfredo M. Reyes', adviserPosition: 'Teacher III', roomNumber: 'Bldg B-220', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 23, femaleCount: 22, totalLearners: 45 }
  ],

  'Grade 9': [
    { id: 'g9-1', gradeLevel: 'Grade 9', sectionName: 'Grade 9 - STE (Einstein)', adviserName: 'STEAVEN KINTH D. BOISER', adviserPosition: 'Teacher III', roomNumber: 'Bldg C-301 (Chemistry Wing)', trackStrand: 'Science, Technology & Engineering (STE)', curriculum: 'K to 12 Science Special (Consumer Chem)', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g9-2', gradeLevel: 'Grade 9', sectionName: 'STE 9-B (Galileo)', adviserName: 'Felipe B. Bacalso', adviserPosition: 'Master Teacher I', roomNumber: 'Bldg C-302 (Chemistry Wing)', trackStrand: 'Science, Technology & Engineering (STE)', curriculum: 'K to 12 Science Special', keyStage: 'Key Stage 3 (JHS)', maleCount: 21, femaleCount: 24, totalLearners: 45 },
    { id: 'g9-3', gradeLevel: 'Grade 9', sectionName: 'SPS 9 (Titan)', adviserName: 'Arthur G. Español', adviserPosition: 'Teacher I', roomNumber: 'Bldg C-303 (Sports Wing)', trackStrand: 'Special Program in Sports (SPS)', curriculum: 'K to 12 / DO 25, s. 2015', keyStage: 'Key Stage 3 (JHS)', maleCount: 26, femaleCount: 19, totalLearners: 45 },
    { id: 'g9-4', gradeLevel: 'Grade 9', sectionName: 'SPJ 9 (Tribune)', adviserName: 'Priscilla M. Abella', adviserPosition: 'Teacher II', roomNumber: 'Bldg C-304 (Press Lab)', trackStrand: 'Special Program in Journalism (SPJ)', curriculum: 'K to 12 Special Curricular', keyStage: 'Key Stage 3 (JHS)', maleCount: 18, femaleCount: 27, totalLearners: 45 },
    { id: 'g9-5', gradeLevel: 'Grade 9', sectionName: 'Narra', adviserName: 'Corazon T. Cabilogan', adviserPosition: 'Teacher III', roomNumber: 'Bldg C-305', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 22, totalLearners: 44 },
    { id: 'g9-6', gradeLevel: 'Grade 9', sectionName: 'Molave', adviserName: 'Imelda K. Fuentes', adviserPosition: 'Teacher II', roomNumber: 'Bldg C-306', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 24, femaleCount: 21, totalLearners: 45 },
    { id: 'g9-7', gradeLevel: 'Grade 9', sectionName: 'Yakal', adviserName: 'Danilo P. Gomez', adviserPosition: 'Teacher III', roomNumber: 'Bldg C-307', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 21, femaleCount: 24, totalLearners: 45 },
    { id: 'g9-8', gradeLevel: 'Grade 9', sectionName: 'Mahogany', adviserName: 'Noraisa L. Ibarra', adviserPosition: 'Teacher I', roomNumber: 'Bldg C-308', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g9-9', gradeLevel: 'Grade 9', sectionName: 'Acacia', adviserName: 'Romeo D. Jalosjos', adviserPosition: 'Master Teacher II', roomNumber: 'Bldg C-309', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 23, femaleCount: 22, totalLearners: 45 },
    { id: 'g9-10', gradeLevel: 'Grade 9', sectionName: 'Apitong', adviserName: 'Leonor J. Kintanar', adviserPosition: 'Teacher II', roomNumber: 'Bldg C-310', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 20, femaleCount: 24, totalLearners: 44 },
    { id: 'g9-11', gradeLevel: 'Grade 9', sectionName: 'Kamagong', adviserName: 'Bong S. Lomondot', adviserPosition: 'Teacher III', roomNumber: 'Bldg C-311', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g9-12', gradeLevel: 'Grade 9', sectionName: 'Tindalo', adviserName: 'Fe M. Nuñez', adviserPosition: 'Teacher I', roomNumber: 'Bldg C-312', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 21, femaleCount: 23, totalLearners: 44 },
    { id: 'g9-13', gradeLevel: 'Grade 9', sectionName: 'Lauan', adviserName: 'Salvador C. Ortega', adviserPosition: 'Teacher II', roomNumber: 'Bldg C-313', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 24, femaleCount: 21, totalLearners: 45 },
    { id: 'g9-14', gradeLevel: 'Grade 9', sectionName: 'Ipil', adviserName: 'Virginia R. Pimentel', adviserPosition: 'Teacher III', roomNumber: 'Bldg C-314', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g9-15', gradeLevel: 'Grade 9', sectionName: 'Dao', adviserName: 'Arman J. Quirino', adviserPosition: 'Teacher I', roomNumber: 'Bldg C-315', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 20, femaleCount: 24, totalLearners: 44 },
    { id: 'g9-16', gradeLevel: 'Grade 9', sectionName: 'Banaba', adviserName: 'Elvira T. Rosales', adviserPosition: 'Teacher II', roomNumber: 'Bldg C-316', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 23, femaleCount: 22, totalLearners: 45 },
    { id: 'g9-17', gradeLevel: 'Grade 9', sectionName: 'Almaciga', adviserName: 'Joel K. Soriano', adviserPosition: 'Teacher III', roomNumber: 'Bldg C-317', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 21, femaleCount: 24, totalLearners: 45 },
    { id: 'g9-18', gradeLevel: 'Grade 9', sectionName: 'Guijo', adviserName: 'Zenaida B. Teodoro', adviserPosition: 'Master Teacher I', roomNumber: 'Bldg C-318', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g9-19', gradeLevel: 'Grade 9', sectionName: 'G9 Gallantry', adviserName: 'Ms. Jenilou Miculob', adviserPosition: 'Teacher III', roomNumber: 'Bldg C-319', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 22, totalLearners: 44 },
    { id: 'g9-20', gradeLevel: 'Grade 9', sectionName: 'Toog', adviserName: 'Divina G. Barte', adviserPosition: 'Teacher III', roomNumber: 'Bldg C-320', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 23, femaleCount: 22, totalLearners: 45 }
  ],

  'Grade 10': [
    { id: 'g10-1', gradeLevel: 'Grade 10', sectionName: 'STE 10-A (Tesla)', adviserName: 'Jonathan D. Santos', adviserPosition: 'Master Teacher II', roomNumber: 'Bldg D-401 (Robotics Lab)', trackStrand: 'Science, Technology & Engineering (STE)', curriculum: 'K to 12 Science Special (Robotics)', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g10-2', gradeLevel: 'Grade 10', sectionName: 'STE 10-B (Hawking)', adviserName: 'Delia S. Garcia', adviserPosition: 'Master Teacher I', roomNumber: 'Bldg D-402 (Robotics Lab)', trackStrand: 'Science, Technology & Engineering (STE)', curriculum: 'K to 12 Science Special', keyStage: 'Key Stage 3 (JHS)', maleCount: 21, femaleCount: 24, totalLearners: 45 },
    { id: 'g10-3', gradeLevel: 'Grade 10', sectionName: 'SPS 10 (Centaur)', adviserName: 'Alexander T. Cruz', adviserPosition: 'Teacher II', roomNumber: 'Bldg D-403 (Sports Wing)', trackStrand: 'Special Program in Sports (SPS)', curriculum: 'K to 12 / DO 25, s. 2015', keyStage: 'Key Stage 3 (JHS)', maleCount: 27, femaleCount: 18, totalLearners: 45 },
    { id: 'g10-4', gradeLevel: 'Grade 10', sectionName: 'SPJ 10 (Gazette)', adviserName: 'Milagros C. Perez', adviserPosition: 'Teacher III', roomNumber: 'Bldg D-404 (Newsroom)', trackStrand: 'Special Program in Journalism (SPJ)', curriculum: 'K to 12 Special Curricular', keyStage: 'Key Stage 3 (JHS)', maleCount: 17, femaleCount: 28, totalLearners: 45 },
    { id: 'g10-5', gradeLevel: 'Grade 10', sectionName: 'Integrity', adviserName: 'Bernadette L. Reyes', adviserPosition: 'Teacher III', roomNumber: 'Bldg D-405', curriculum: 'K to 12 Junior High (Completers)', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g10-6', gradeLevel: 'Grade 10', sectionName: 'Honesty', adviserName: 'Cesar P. Mendoza', adviserPosition: 'Teacher I', roomNumber: 'Bldg D-406', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 21, femaleCount: 24, totalLearners: 45 },
    { id: 'g10-7', gradeLevel: 'Grade 10', sectionName: 'Courage', adviserName: 'Eric G. Ramos', adviserPosition: 'Teacher III', roomNumber: 'Bldg D-407', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 23, femaleCount: 22, totalLearners: 45 },
    { id: 'g10-8', gradeLevel: 'Grade 10', sectionName: 'Loyalty', adviserName: 'Felicitas M. Torres', adviserPosition: 'Teacher II', roomNumber: 'Bldg D-408', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 20, femaleCount: 25, totalLearners: 45 },
    { id: 'g10-9', gradeLevel: 'Grade 10', sectionName: 'Humility', adviserName: 'Geraldine B. Villanueva', adviserPosition: 'Teacher III', roomNumber: 'Bldg D-409', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 22, totalLearners: 44 },
    { id: 'g10-10', gradeLevel: 'Grade 10', sectionName: 'Wisdom', adviserName: 'Homer K. Alcantara', adviserPosition: 'Teacher I', roomNumber: 'Bldg D-410', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 24, femaleCount: 21, totalLearners: 45 },
    { id: 'g10-11', gradeLevel: 'Grade 10', sectionName: 'Diligence', adviserName: 'Irene C. Bautista', adviserPosition: 'Teacher II', roomNumber: 'Bldg D-411', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 21, femaleCount: 24, totalLearners: 45 },
    { id: 'g10-12', gradeLevel: 'Grade 10', sectionName: 'Compassion', adviserName: 'Jasper L. Corpuz', adviserPosition: 'Teacher III', roomNumber: 'Bldg D-412', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g10-13', gradeLevel: 'Grade 10', sectionName: 'Respect', adviserName: 'Katrina D. Dela Cruz', adviserPosition: 'Master Teacher I', roomNumber: 'Bldg D-413', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 23, femaleCount: 22, totalLearners: 45 },
    { id: 'g10-14', gradeLevel: 'Grade 10', sectionName: 'Excellence', adviserName: 'Leonardo M. Ferrer', adviserPosition: 'Teacher II', roomNumber: 'Bldg D-414', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 20, femaleCount: 24, totalLearners: 44 },
    { id: 'g10-15', gradeLevel: 'Grade 10', sectionName: 'Justice', adviserName: 'Maricel S. Hernandez', adviserPosition: 'Teacher I', roomNumber: 'Bldg D-415', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g10-16', gradeLevel: 'Grade 10', sectionName: 'Hope', adviserName: 'Nilo P. Ignacio', adviserPosition: 'Teacher III', roomNumber: 'Bldg D-416', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 21, femaleCount: 23, totalLearners: 44 },
    { id: 'g10-17', gradeLevel: 'Grade 10', sectionName: 'Faith', adviserName: 'Ophelia B. Jimenez', adviserPosition: 'Teacher II', roomNumber: 'Bldg D-417', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 24, femaleCount: 21, totalLearners: 45 },
    { id: 'g10-18', gradeLevel: 'Grade 10', sectionName: 'Peace', adviserName: 'Paquito R. Lagman', adviserPosition: 'Master Teacher II', roomNumber: 'Bldg D-418', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g10-19', gradeLevel: 'Grade 10', sectionName: 'Unity', adviserName: 'Querubin M. Manalo', adviserPosition: 'Teacher I', roomNumber: 'Bldg D-419', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 20, femaleCount: 24, totalLearners: 44 },
    { id: 'g10-20', gradeLevel: 'Grade 10', sectionName: 'Prudence', adviserName: 'Rosario T. Ocampo', adviserPosition: 'Teacher III', roomNumber: 'Bldg D-420', curriculum: 'K to 12 Junior High', keyStage: 'Key Stage 3 (JHS)', maleCount: 23, femaleCount: 22, totalLearners: 45 }
  ],

  'Grade 11': [
    { id: 'g11-1', gradeLevel: 'Grade 11', sectionName: 'G11 Academic 1 (Social Science Education)', adviserName: 'Mrs. Roselyn Rufino', adviserPosition: 'Teacher III', roomNumber: 'SHS Bldg-101', trackStrand: 'Pure Academic Track 1 (Social Science)', curriculum: 'DO 3, s. 2026 / MATATAG SHS', keyStage: 'Key Stage 4 (SHS)', maleCount: 20, femaleCount: 25, totalLearners: 45 },
    { id: 'g11-2', gradeLevel: 'Grade 11', sectionName: 'G11 Academic 2 (Communication Studies Education)', adviserName: 'Ms. An Miculob', adviserPosition: 'Teacher III', roomNumber: 'SHS Bldg-102', trackStrand: 'Pure Academic Track 2 (Communication)', curriculum: 'DO 3, s. 2026 / MATATAG SHS', keyStage: 'Key Stage 4 (SHS)', maleCount: 18, femaleCount: 27, totalLearners: 45 },
    { id: 'g11-3', gradeLevel: 'Grade 11', sectionName: 'G11 Academic 3 (Health and Medical Sciences 2)', adviserName: 'Mr. Edgar Mark Secuya', adviserPosition: 'Teacher III', roomNumber: 'SHS Bldg-103', trackStrand: 'Pure Academic Track 3 (Nursing/Medicine)', curriculum: 'DO 3, s. 2026 / MATATAG SHS', keyStage: 'Key Stage 4 (SHS)', maleCount: 17, femaleCount: 28, totalLearners: 45 },
    { id: 'g11-4', gradeLevel: 'Grade 11', sectionName: 'G11 Academic 4 (Science Education)', adviserName: 'Mrs. Arjene Canoog', adviserPosition: 'Teacher III', roomNumber: 'SHS Bldg-104', trackStrand: 'Pure Academic Track 4 (Science Major)', curriculum: 'DO 3, s. 2026 / MATATAG SHS', keyStage: 'Key Stage 4 (SHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g11-5', gradeLevel: 'Grade 11', sectionName: 'G11 Academic 5 (Health and Medical Sciences 1)', adviserName: 'Mrs. Ivy-Gen Cabural', adviserPosition: 'Teacher III', roomNumber: 'SHS Bldg-105', trackStrand: 'Academic with TechPro Track 5', curriculum: 'DO 3, s. 2026 / MATATAG SHS', keyStage: 'Key Stage 4 (SHS)', maleCount: 19, femaleCount: 26, totalLearners: 45 },
    { id: 'g11-6', gradeLevel: 'Grade 11', sectionName: 'G11 Academic 6 (Business and Accountancy 2)', adviserName: 'Mrs. Bernice Mae Gordoncillo', adviserPosition: 'Teacher III', roomNumber: 'SHS Bldg-106', trackStrand: 'Pure Academic Track 6 (ABM / Trade)', curriculum: 'DO 3, s. 2026 / MATATAG SHS', keyStage: 'Key Stage 4 (SHS)', maleCount: 18, femaleCount: 27, totalLearners: 45 },
    { id: 'g11-7', gradeLevel: 'Grade 11', sectionName: 'G11 Academic 7 (Public Service & Defense)', adviserName: 'Mrs. Jenefer Arquita (Co-Adv: Mr. Jonathan Mallorca)', adviserPosition: 'Teacher III', roomNumber: 'SHS Bldg-107', trackStrand: 'Pure Academic Track 7 (Uniformed Services)', curriculum: 'DO 3, s. 2026 / MATATAG SHS', keyStage: 'Key Stage 4 (SHS)', maleCount: 28, femaleCount: 17, totalLearners: 45 },
    { id: 'g11-8', gradeLevel: 'Grade 11', sectionName: 'G11 Academic 8 (Engineering & Tech Studies 2)', adviserName: 'Ms. Hazel Salomsom', adviserPosition: 'Teacher III', roomNumber: 'SHS Bldg-108', trackStrand: 'Pure Academic / TechPro Track 8 (Engineering)', curriculum: 'DO 3, s. 2026 / MATATAG SHS', keyStage: 'Key Stage 4 (SHS)', maleCount: 29, femaleCount: 16, totalLearners: 45 },
    { id: 'g11-9', gradeLevel: 'Grade 11', sectionName: 'G11 Academic 9 (Business & Accountancy 1)', adviserName: 'Mr. Bimbo Gupit', adviserPosition: 'Teacher III', roomNumber: 'SHS Bldg-109', trackStrand: 'Pure Academic / TechPro Track 9 (ABM)', curriculum: 'DO 3, s. 2026 / MATATAG SHS', keyStage: 'Key Stage 4 (SHS)', maleCount: 19, femaleCount: 26, totalLearners: 45 },
    { id: 'g11-10', gradeLevel: 'Grade 11', sectionName: 'G11 Academic 10 (Engineering & Tech Studies 1)', adviserName: 'Mr. Esteward Baguio (Co-Adv: Ms. Rosemarie Silva)', adviserPosition: 'Teacher III', roomNumber: 'SHS Bldg-110', trackStrand: 'Pure Academic Track 10 (Engineering)', curriculum: 'DO 3, s. 2026 / MATATAG SHS', keyStage: 'Key Stage 4 (SHS)', maleCount: 30, femaleCount: 15, totalLearners: 45 },
    { id: 'g11-11', gradeLevel: 'Grade 11', sectionName: 'G11 TechPro 1 (Welding Technology / MMAW)', adviserName: 'Ms. Ina Kristie Deang', adviserPosition: 'Teacher III', roomNumber: 'IA Workshop 1 (SMAW)', trackStrand: 'TechPro Track 1 (Manual Metal Arc Welding)', curriculum: 'DO 3, s. 2026 / TechPro Track', keyStage: 'Key Stage 4 (SHS)', maleCount: 36, femaleCount: 9, totalLearners: 45 },
    { id: 'g11-12', gradeLevel: 'Grade 11', sectionName: 'G11 TechPro 2 (TechDraft & Oracle Database)', adviserName: 'Mrs. Lovely Queen Guilot', adviserPosition: 'Teacher III', roomNumber: 'ICT Drafting Lab', trackStrand: 'TechPro Track 2 (CAD / Oracle Database)', curriculum: 'DO 3, s. 2026 / TechPro Track', keyStage: 'Key Stage 4 (SHS)', maleCount: 25, femaleCount: 20, totalLearners: 45 },
    { id: 'g11-13', gradeLevel: 'Grade 11', sectionName: 'G11 TechPro 3 (Electrical Systems / EIM)', adviserName: 'Mrs. Harvy Legh Miculob', adviserPosition: 'Teacher III', roomNumber: 'IA Workshop 2 (EIM)', trackStrand: 'TechPro Track 3 (Electrical Installation)', curriculum: 'DO 3, s. 2026 / TechPro Track', keyStage: 'Key Stage 4 (SHS)', maleCount: 34, femaleCount: 11, totalLearners: 45 },
    { id: 'g11-14', gradeLevel: 'Grade 11', sectionName: 'G11 TechPro 4 (Food & Beverage / Kitchen Ops)', adviserName: 'Mrs. Maria Cristina Santillan (Co-Adv: Mrs. Hezel Tesio)', adviserPosition: 'Teacher III', roomNumber: 'HE Lab 1 (Commercial Kitchen)', trackStrand: 'TechPro Track 4 (FBS & Kitchen Operations)', curriculum: 'DO 3, s. 2026 / TechPro Track', keyStage: 'Key Stage 4 (SHS)', maleCount: 15, femaleCount: 30, totalLearners: 45 },
    { id: 'g11-15', gradeLevel: 'Grade 11', sectionName: 'G11 TechPro 5 (Computer Programming Java / CSS)', adviserName: 'Mrs. Sherine Genebraldo (Co-Adv: Mr. James Oliver Deang)', adviserPosition: 'Teacher III', roomNumber: 'ICT Lab 1 (Java/CSS)', trackStrand: 'TechPro Track 5 (Programming & CSS NC II)', curriculum: 'DO 3, s. 2026 / TechPro Track', keyStage: 'Key Stage 4 (SHS)', maleCount: 26, femaleCount: 19, totalLearners: 45 },
    { id: 'g11-16', gradeLevel: 'Grade 11', sectionName: 'G11 TechPro 6 (Organic Agriculture Production)', adviserName: 'Mr. Junrey Sarausas', adviserPosition: 'Teacher III', roomNumber: 'Agri Demonstration Farm', trackStrand: 'TechPro Track 6 (Organic Agri Production NC II)', curriculum: 'DO 3, s. 2026 / TechPro Track', keyStage: 'Key Stage 4 (SHS)', maleCount: 24, femaleCount: 21, totalLearners: 45 },
    { id: 'g11-17', gradeLevel: 'Grade 11', sectionName: 'G11 Alternative Learning System (ALS)', adviserName: 'Mr. Arrvic M. Villegas (SHS Coordinator)', adviserPosition: 'Teacher III', roomNumber: 'ALS Center / Flexible Learning Wing', trackStrand: 'Alternative Learning System (Senior High)', curriculum: 'DepEd ALS-SHS Curriculum', keyStage: 'Key Stage 4 (SHS)', maleCount: 25, femaleCount: 20, totalLearners: 45 },
    { id: 'g11-18', gradeLevel: 'Grade 11', sectionName: 'G11 GAS OHSP (Open High School)', adviserName: 'Mr. Brecht Tampus', adviserPosition: 'Teacher III', roomNumber: 'OHSP Distance Learning Center', trackStrand: 'General Academic Strand (Distance/Modular)', curriculum: 'DO 46, s. 2006 Open High School', keyStage: 'Key Stage 4 (SHS)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g11-19', gradeLevel: 'Grade 11', sectionName: 'G11 SMAW OHSP (Open High School)', adviserName: 'Ms. Jenilou Miculob', adviserPosition: 'Teacher III', roomNumber: 'OHSP Technical Annex', trackStrand: 'TVL - SMAW (Distance/Modular)', curriculum: 'DO 46, s. 2006 Open High School', keyStage: 'Key Stage 4 (SHS)', maleCount: 27, femaleCount: 18, totalLearners: 45 },
    { id: 'g11-20', gradeLevel: 'Grade 11', sectionName: 'G11 HE OHSP (Open High School)', adviserName: 'Mrs. Nidalyn Jumawan (Guidance Designate)', adviserPosition: 'Teacher III', roomNumber: 'OHSP Home Ec Lab', trackStrand: 'TVL - Home Economics (Modular)', curriculum: 'DO 46, s. 2006 Open High School', keyStage: 'Key Stage 4 (SHS)', maleCount: 16, femaleCount: 29, totalLearners: 45 }
  ],

  'Grade 12': [
    { id: 'g12-1', gradeLevel: 'Grade 12', sectionName: 'G12 STEM 1', adviserName: 'Mrs. Crislyn Regis (Co-Adv: Mr. Stephen Tabal)', adviserPosition: 'Teacher III', roomNumber: 'SHS Science Complex 1', trackStrand: 'STEM (Academic Track)', curriculum: 'DO 3, s. 2026 Three-Term SHS', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g12-2', gradeLevel: 'Grade 12', sectionName: 'G12 STEM 2', adviserName: 'Mrs. Marilyn Alaba (Journalism Coach)', adviserPosition: 'Teacher III', roomNumber: 'SHS Science Complex 2', trackStrand: 'STEM (Academic Track)', curriculum: 'DO 3, s. 2026 Three-Term SHS', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 21, femaleCount: 24, totalLearners: 45 },
    { id: 'g12-3', gradeLevel: 'Grade 12', sectionName: 'G12 HUMSS 1', adviserName: 'Mr. Mark Japeth Balatero (SSLG Adviser)', adviserPosition: 'Teacher III', roomNumber: 'SHS Bldg-201', trackStrand: 'HUMSS (Academic Track)', curriculum: 'DO 3, s. 2026 Three-Term SHS', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 17, femaleCount: 28, totalLearners: 45 },
    { id: 'g12-4', gradeLevel: 'Grade 12', sectionName: 'G12 HUMSS 2', adviserName: 'Mrs. Evelyn Cartin', adviserPosition: 'Teacher III', roomNumber: 'SHS Bldg-202', trackStrand: 'HUMSS (Academic Track)', curriculum: 'DO 3, s. 2026 Three-Term SHS', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 18, femaleCount: 27, totalLearners: 45 },
    { id: 'g12-5', gradeLevel: 'Grade 12', sectionName: 'G12 HUMSS 3', adviserName: 'Mrs. Ronalyn Paradero (Co-Adv: Mrs. Marjorie Tagacay)', adviserPosition: 'Teacher III', roomNumber: 'SHS Bldg-203', trackStrand: 'HUMSS (Academic Track)', curriculum: 'DO 3, s. 2026 Three-Term SHS', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 16, femaleCount: 29, totalLearners: 45 },
    { id: 'g12-6', gradeLevel: 'Grade 12', sectionName: 'G12 HUMSS 4', adviserName: 'Mr. Israfel Jutba', adviserPosition: 'Teacher III', roomNumber: 'SHS Bldg-204', trackStrand: 'HUMSS (Academic Track)', curriculum: 'DO 3, s. 2026 Three-Term SHS', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 19, femaleCount: 26, totalLearners: 45 },
    { id: 'g12-7', gradeLevel: 'Grade 12', sectionName: 'G12 ABM 1', adviserName: 'Mrs. Mary Fe Lacia', adviserPosition: 'Teacher III', roomNumber: 'SHS Bldg-205', trackStrand: 'ABM (Academic Track)', curriculum: 'DO 3, s. 2026 Three-Term SHS', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 18, femaleCount: 27, totalLearners: 45 },
    { id: 'g12-8', gradeLevel: 'Grade 12', sectionName: 'G12 ABM 2', adviserName: 'Mrs. Lucy Resaba (Journalism Coach)', adviserPosition: 'Teacher III', roomNumber: 'SHS Bldg-206', trackStrand: 'ABM (Academic Track)', curriculum: 'DO 3, s. 2026 Three-Term SHS', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 17, femaleCount: 28, totalLearners: 45 },
    { id: 'g12-9', gradeLevel: 'Grade 12', sectionName: 'G12 GAS 1', adviserName: 'Mr. Ken Lugatiman', adviserPosition: 'Teacher III', roomNumber: 'SHS Bldg-207', trackStrand: 'General Academic Strand', curriculum: 'DO 3, s. 2026 Three-Term SHS', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 22, femaleCount: 23, totalLearners: 45 },
    { id: 'g12-10', gradeLevel: 'Grade 12', sectionName: 'G12 GAS 2', adviserName: 'Mrs. Gladys Oquina', adviserPosition: 'Teacher III', roomNumber: 'SHS Bldg-208', trackStrand: 'General Academic Strand', curriculum: 'DO 3, s. 2026 Three-Term SHS', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 21, femaleCount: 24, totalLearners: 45 },
    { id: 'g12-11', gradeLevel: 'Grade 12', sectionName: 'G12 GAS OHSP', adviserName: 'Mrs. Aicy Nermal', adviserPosition: 'Teacher III', roomNumber: 'SHS OHSP Center', trackStrand: 'General Academic Strand (OHSP)', curriculum: 'DO 46, s. 2006 Open High School', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 20, femaleCount: 25, totalLearners: 45 },
    { id: 'g12-12', gradeLevel: 'Grade 12', sectionName: 'G12 ICT', adviserName: 'Mrs. Annafel Nova Macapobre (Co-Adv: Mrs. Kristine Capao)', adviserPosition: 'Teacher III', roomNumber: 'ICT Lab 3 (Advanced Dev)', trackStrand: 'TVL - ICT (Software, Database & Telecom)', curriculum: 'DO 3, s. 2026 Three-Term SHS', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 26, femaleCount: 19, totalLearners: 45 },
    { id: 'g12-13', gradeLevel: 'Grade 12', sectionName: 'G12 HE', adviserName: 'Mrs. Trazy Ann Tuastomban (Co-Adv: Mrs. Myla Becoy)', adviserPosition: 'Teacher III', roomNumber: 'HE Commercial Kitchen', trackStrand: 'TVL - Home Economics (Cookery & FBS)', curriculum: 'DO 3, s. 2026 Three-Term SHS', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 15, femaleCount: 30, totalLearners: 45 },
    { id: 'g12-14', gradeLevel: 'Grade 12', sectionName: 'G12 SMAW 1', adviserName: 'Mr. Joenel Almonia', adviserPosition: 'Teacher III', roomNumber: 'IA Fabrication Lab 1', trackStrand: 'TVL - Industrial Arts (SMAW NC II)', curriculum: 'DO 3, s. 2026 Three-Term SHS', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 37, femaleCount: 8, totalLearners: 45 },
    { id: 'g12-15', gradeLevel: 'Grade 12', sectionName: 'G12 SMAW 2', adviserName: 'Mrs. Erma Celia Ignacio (Co-Adv: Ms. Abby Grace Gallardo)', adviserPosition: 'Teacher III', roomNumber: 'IA Fabrication Lab 2', trackStrand: 'TVL - Industrial Arts (SMAW NC II)', curriculum: 'DO 3, s. 2026 Three-Term SHS', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 35, femaleCount: 10, totalLearners: 45 },
    { id: 'g12-16', gradeLevel: 'Grade 12', sectionName: 'G12 EIM', adviserName: 'Mr. Melvin Tabacon (Guidance Designate)', adviserPosition: 'Teacher III', roomNumber: 'IA Electrical Lab (EIM/CCTV)', trackStrand: 'TVL - Industrial Arts (EIM NC II)', curriculum: 'DO 3, s. 2026 Three-Term SHS', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 33, femaleCount: 12, totalLearners: 45 },
    { id: 'g12-17', gradeLevel: 'Grade 12', sectionName: 'G12 Sports', adviserName: 'Ms. Khrizza Mae Flores (Co-Adv: Mr. Ren Ariel Terrado)', adviserPosition: 'Teacher III', roomNumber: 'Athletics & Sports Complex', trackStrand: 'Sports Track (Coaching & Officiating)', curriculum: 'DO 3, s. 2026 Three-Term SHS', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 28, femaleCount: 17, totalLearners: 45 },
    { id: 'g12-18', gradeLevel: 'Grade 12', sectionName: 'Grade 12 OHSP / G12 SMAW OHSP', adviserName: 'Mr. Steaven Kinth Boiser', adviserPosition: 'Teacher III', roomNumber: 'OHSP Multi-Discipline Lab', trackStrand: 'Open High School (SMAW & Academic)', curriculum: 'DO 46, s. 2006 Open High School', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 26, femaleCount: 19, totalLearners: 45 },
    { id: 'g12-19', gradeLevel: 'Grade 12', sectionName: 'G12 HE OHSP', adviserName: 'Mrs. Nidalyn Jumawan (Guidance Designate)', adviserPosition: 'Teacher III', roomNumber: 'OHSP Food Center', trackStrand: 'TVL - Home Economics (OHSP)', curriculum: 'DO 46, s. 2006 Open High School', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 15, femaleCount: 30, totalLearners: 45 },
    { id: 'g12-20', gradeLevel: 'Grade 12', sectionName: 'G12 Alternative Learning System (ALS)', adviserName: 'Mr. Arrvic M. Villegas (SHS Coordinator)', adviserPosition: 'Teacher III', roomNumber: 'ALS Learning Center', trackStrand: 'Alternative Learning System (Senior High)', curriculum: 'DepEd ALS-SHS Curriculum', keyStage: 'Key Stage 4 (SHS Graduating)', maleCount: 25, femaleCount: 20, totalLearners: 45 }
  ]
};

// Filipino First & Last Name pools for realistic LIS generation
const MALE_NAMES = [
  'Juan Carlos', 'Mark Anthony', 'John Lloyd', 'Angelo', 'Christian Dave',
  'Joshua', 'Gabriel', 'Daniel', 'Al-Rashid', 'Vince Nicole',
  'Kenneth', 'Francis', 'Gerald', 'Paolo Dominic', 'Nathan',
  'Liam Oliver', 'Noah James', 'Ethan Lucas', 'Elijah Mason', 'Aiden Benjamin',
  'Kurt Russell', 'Sean Patrick', 'Lance Andrei', 'Justin Kyle', 'Neil Patrick',
  'Karl Benedict', 'Raffy James', 'Jan Andrei', 'Danielle Roy', 'Louie Jake'
];

const FEMALE_NAMES = [
  'Maria Princess', 'Sophia Grace', 'Princess Mae', 'Mary Grace', 'Sittie Ayna',
  'Kimberly Joy', 'Stephanie Nicole', 'Rhea Mae', 'Christine Joy', 'Bea Bianca',
  'Janine Nicole', 'Clarisse Anne', 'Olivia Emma', 'Ava Isabella', 'Amelia Harper',
  'Evelyn Abigail', 'Chloe Jasmine', 'Angel Samantha', 'Kaye Andrea', 'Hannah Joyce',
  'Patricia May', 'Alyssa Marie', 'Jenny Rose', 'Krizza Joy', 'Aira Shane',
  'Fatima Zahra', 'Noralyn Joy', 'Camille Joy', 'Dianne Rose', 'Jocelyn May'
];

const SURNAME_POOL = [
  'Abad', 'Alcantara', 'Aquino', 'Bautista', 'Castillo', 'Cruz', 'Del Rosario',
  'Garcia', 'Mendoza', 'Ramos', 'Reyes', 'Santos', 'Torres', 'Villanueva',
  'Navarro', 'Salazar', 'Mercado', 'Tan', 'Lim', 'Booc', 'Alonzo', 'Beltran',
  'Corpuz', 'Dela Cruz', 'Estrella', 'Ferrer', 'Gonzales', 'Hernandez', 'Ignacio',
  'Jimenez', 'Lagman', 'Manalo', 'Natividad', 'Ocampo', 'Pascual', 'Quinto',
  'Rivera', 'Santiago', 'Tolentino', 'Valdez', 'Abella', 'Bacalso', 'Cabilogan',
  'Dimaporo', 'Español', 'Fuentes', 'Gomez', 'Hadji', 'Ibarra', 'Jalosjos',
  'Kintanar', 'Lomondot', 'Macaspac', 'Nuñez', 'Ortega', 'Pimentel', 'Quirino',
  'Rosales', 'Soriano', 'Teodoro'
];

const BARANGAYS = [
  'Poblacion, Tubod, Lanao del Norte',
  'Pigcarangan, Tubod, Lanao del Norte',
  'Malingao, Tubod, Lanao del Norte',
  'Patudan, Tubod, Lanao del Norte',
  'Baroy Daku, Baroy, Lanao del Norte',
  'San Juan, Baroy, Lanao del Norte',
  'Poblacion, Kolambugan, Lanao del Norte',
  'Mukas, Kolambugan, Lanao del Norte',
  'Tubod Central, Lanao del Norte',
  'Camp Philipps, Tubod, Lanao del Norte'
];

// Generate consolidated student masterlist (5 learners per section = 600 consolidated LIS records across all 120 sections)
export const generateConsolidatedLISStudentMasterlist = (): LISStudentMasterRecord[] => {
  const result: LISStudentMasterRecord[] = [];
  let globalCount = 1;

  Object.entries(LNNCHS_20_SECTIONS_PER_GRADE).forEach(([gradeLevel, sections]) => {
    const glCode = gradeLevel.replace('Grade ', '').padStart(2, '0');
    
    sections.forEach((sec, secIdx) => {
      const secCode = String(secIdx + 1).padStart(2, '0');
      // Generate 6 sample learners per section (3 male, 3 female) representing the consolidated registry
      for (let i = 0; i < 6; i++) {
        const isMale = i < 3;
        const lrn = `136514${glCode}${secCode}${String(i + 1).padStart(2, '0')}`;
        const lastName = SURNAME_POOL[(secIdx * 3 + i) % SURNAME_POOL.length];
        const firstName = isMale
          ? MALE_NAMES[(secIdx * 2 + i) % MALE_NAMES.length]
          : FEMALE_NAMES[(secIdx * 2 + i - 3) % FEMALE_NAMES.length];
        const mi = String.fromCharCode(65 + ((secIdx + i) % 26)) + '.';
        const age = parseInt(glCode) + 5; // e.g. G7 is 12-13, G12 is 17-18
        const birthYear = 2026 - age;
        const birthMonth = String((i % 12) + 1).padStart(2, '0');
        const birthDay = String((i * 4 % 28) + 1).padStart(2, '0');
        const address = BARANGAYS[(secIdx + i) % BARANGAYS.length];

        result.push({
          id: `lis-std-${globalCount}`,
          lrn,
          lastName,
          firstName,
          mi,
          fullName: `${lastName}, ${firstName} ${mi}`,
          sex: isMale ? 'M' : 'F',
          gradeLevel: gradeLevel as any,
          section: sec.sectionName,
          adviser: sec.adviserName,
          trackStrand: sec.trackStrand,
          birthDate: `${birthYear}-${birthMonth}-${birthDay}`,
          age,
          motherTongue: (secIdx % 4 === 0) ? 'Maranao' : 'Cebuano',
          address,
          parentGuardian: `Mr./Mrs. ${lastName}`,
          contact: `09170${glCode}${secCode}${String(i + 1).padStart(2, '0')}`,
          lisStatus: i === 5 ? 'Transferred In' : 'Officially Enrolled',
          verificationStatus: 'Verified (LIS Synced)',
          heightCm: isMale ? 140 + (parseInt(glCode) * 3) : 138 + (parseInt(glCode) * 2.5),
          weightKg: 35 + (parseInt(glCode) * 2.8),
          daysPresent: 196 - (i % 4),
          daysAbsent: i % 4
        });
        globalCount++;
      }
    });
  });

  return result;
};

export const CONSOLIDATED_LIS_STUDENTS = generateConsolidatedLISStudentMasterlist();

export const ALL_LNNCHS_SECTIONS: SectionDefinition[] = Object.values(LNNCHS_20_SECTIONS_PER_GRADE).flat().map(sec => ({
  ...sec,
  sectionId: sec.id,
  adviserEmail: sec.adviserEmail || `${(sec.adviserName || '').toLowerCase().replace(/[^a-z]/g, '')}@deped.gov.ph`,
  roomAssignment: sec.roomAssignment || sec.roomNumber || 'Main Campus',
  trackOrStrand: sec.trackOrStrand || sec.trackStrand || 'General Curriculum',
  studentCount: sec.totalLearners || 45,
  students: CONSOLIDATED_LIS_STUDENTS.filter(s => s.section === sec.sectionName)
}));
