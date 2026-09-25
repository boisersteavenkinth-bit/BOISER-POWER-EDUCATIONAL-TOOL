export interface OfficialDocumentItem {
  id: string;
  code: string;
  title: string;
  category: 'Student Handbook' | 'Regional Memorandum' | 'Division Memorandum' | 'DepEd Order' | 'School Memorandum' | 'Curriculum & Rubric';
  issuer: string;
  dateIssued: string;
  schoolYear: string;
  applicableGrades: string[];
  applicableSections: string[];
  summary: string;
  keywords: string[];
  fullSections: {
    heading: string;
    content: string;
    keyPoints: string[];
  }[];
}

export const LNNCHS_OFFICIAL_DOCUMENTS: OfficialDocumentItem[] = [
  {
    id: 'doc-handbook-2025',
    code: 'LNNCHS-SHB-2025-2026',
    title: 'Lanao del Norte National Comprehensive High School Student Handbook (S.Y. 2025-2026)',
    category: 'Student Handbook',
    issuer: 'LNNCHS Child Protection Committee & Office of the Principal (Anisah A. Sinal, Principal IV)',
    dateIssued: 'August 2025',
    schoolYear: '2025-2026 / 2026-2027',
    applicableGrades: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    applicableSections: ['All 120 Sections (Grade 7 to Grade 12)'],
    summary: 'Official student code of conduct, school seal symbolism, academic programs (STE, BEC, SPS, SPJ, OHSP, SHS Tracks), admission & transfer rules, grading (DO 8, s. 2015 / DO 36, s. 2016), attendance (20% absence threshold), uniform guidelines (JHS Maroon, SHS Blue), social media policies (RA 10175, RA 10173), non-disciplinary and disciplinary cases, and SSLG constitution.',
    keywords: [
      'student handbook', 'rules and regulations', 'uniform', 'haircut', 'sarimanok', 'school seal',
      'anisah sinal', 'baroy', '304005', 'child protection', 'lourdes ong', 'sslg', 'ste', 'sps',
      'spj', 'ohsp', 'academic track', 'tvl', 'sports track', 'disciplinary cases', 'minor offense',
      'grave offense', 'anti-bullying', 'ra 10627', 'cybercrime', 'ra 10175', 'data privacy', 'ra 10173'
    ],
    fullSections: [
      {
        heading: 'Correspondence Directory & School Profile',
        content: 'Mailing Address: Sto. Niño Village, Baroy, Lanao del Norte. Email: 304005.ldn@deped.gov.ph. School ID: 304005. Fax/Phone: (063) 221-373-6215. Campus Area: 78,981 square meters (7.893 hectares). Established 1945 as Lanao West High School; renamed 1950 to Lanao del Norte Provincial High School (RA 228); chartered 1971 as LNNCHS.',
        keyPoints: [
          'School ID: 304005 (Sto. Niño Village, Baroy, Lanao del Norte)',
          'School Head: Anisah A. Sinal (Secondary School Principal IV)',
          'Guidance Counselor Designate: Lourdes D. Ong, RGC',
          'School Seal: Sarimanok with book on its claw and a torch representing knowledge, wisdom, and light.'
        ]
      },
      {
        heading: 'Curricular Programs Offered',
        content: 'Junior High School: (1) Science, Technology, & Engineering (STE) with specializations in Environmental Science, Biotechnology, Consumer Chemistry, Electronics/Robotics (minimum grade 85% in Math, English, Science); (2) Enhanced Basic Education Curriculum (BEC); (3) Special Program in Sports (SPS - DO 25, s. 2015); (4) Special Program in Journalism (SPJ); (5) Open High School Program (OHSP - DO 46, s. 2006). Senior High School: Academic Track (STEM, ABM, HUMSS, GAS), TVL Track (Industrial Arts: SMAW, EIM; ICT: CSS, Programming/Drafting; Home Economics: Bread & Pastry, FBS/Cookery; Agri-Fishery Arts), and Sports Track (athlete development & coaching).',
        keyPoints: [
          'STE Program: Grade 7 (Environmental Science), Grade 8 (Biotechnology), Grade 9 (Consumer Chemistry), Grade 10 (Electronics & Robotics)',
          'Special Program in Sports (SPS): DO 25, s. 2015 athlete & coaching framework',
          'Senior High School: STEM, ABM, HUMSS, GAS, TVL (IA/ICT/HE/AFA), and Sports Track'
        ]
      },
      {
        heading: 'Prescribed Uniform & Grooming Policies',
        content: 'JHS Prescribed Uniform: Boys - Long black pants, white collared polo shirt with school logo on breast pocket, black shoes, white socks. Girls - Maroon long pants or maroon skirts below knee, white collared blouse with maroon necktie matching pants with school logo. SHS Prescribed Uniform: Boys - Long black pants, blue collared shirt with blue neck lining and embroidered school logo. Girls - Black long pants or skirts below knee, blue collared blouse with blue necktie and school logo. Wednesday: Wash Day (MAPEH / PE uniform). Strict prohibition of slippers, crop tops, mini-skirts, and unprescribed civilian attire.',
        keyPoints: [
          'JHS Uniform: Maroon skirts/slacks with white blouse/polo and maroon necktie',
          'SHS Uniform: Black skirts/slacks with blue blouse/shirt and blue necktie',
          'Haircut for boys: At least 1 inch above ear and 3 inches above collar line (DO 32, s. 2017)'
        ]
      },
      {
        heading: 'Attendance, Grading & Discipline Framework',
        content: 'Attendance: More than 20% absence threshold of total prescribed school days results in failing grade / no credit (DO 11, s. 2011). Grading & Assessment: Based on DepEd directives (passing grade 75%). Discipline: Minor offenses (cheating, tardiness, littering, unauthorized gadget use - RM 207 s. 2018); Less Grave (vandalism, smoking/vaping, alcohol); Grave (plagiarism, weapon possession, extortion, bullying - RA 10627/DO 55 s. 2013, drug possession - DO 40 s. 2017/RA 9165, cyber-defamation). Prohibited penalties: Corporal punishment, fines, manual labor, "kultap" haircut, grade demerits.',
        keyPoints: [
          'Attendance rule: Maximum 20% allowed absences before forfeiture of credit (DO 11, s. 2011)',
          'Discipline process: Written notice within 3 days, written answer within 3 days, Child Protection Committee conference',
          'Strictly prohibited: Corporal punishment, grade score demerits, fines or contributions'
        ]
      },
      {
        heading: 'Supreme Secondary Learner Government (SSLG)',
        content: 'The SSLG of LNNCHS is the highest democratic representative student body. Elective qualifications: General average 85+ with no failing grades in any term, good moral standing, and active participation. Standard officer structure: President, Vice President, Secretary, Treasurer, Auditor, Public Information Officer, Peace Officer, Year Level Chairpersons and Councilors.',
        keyPoints: [
          'Minimum grade requirement for SSLG candidates: General Average 85% with zero failing grades',
          'Mentored by appointed SSLG Adviser under DO 47, s. 2014'
        ]
      }
    ]
  },
  {
    id: 'doc-ruqa-2025',
    code: 'RM-No.-604-s.-2025',
    title: 'Regional Memorandum No. 604, s. 2025: Regional Unified Quarterly Assessment (RUQA) for SY 2025-2026',
    category: 'Regional Memorandum',
    issuer: 'DepEd Region X (Northern Mindanao) - Dr. Arturo B. Bayocot, CESO III (Regional Director)',
    dateIssued: 'August 6, 2025',
    schoolYear: '2025-2026 / 2026-2027',
    applicableGrades: ['Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'],
    applicableSections: ['All JHS Sections (Grade 7 to 10)', 'SHS Grade 11 Core Subjects Sections'],
    summary: 'Directs the implementation of the Regional Unified Quarterly Assessment (RUQA) across Northern Mindanao. Covers all subjects from Grades 3 to 10 and Grade 11 core subjects. Test items are developed by Regional Team of Test Developers (RTTD) anchored on 21st Century Skills and SOLO Framework with partner division assignments (e.g. Values Ed: Lanao del Norte & Iligan City).',
    keywords: [
      'ruqa', 'regional unified quarterly assessment', 'region x', 'arturo bayocot', 'clmd', 'rttd',
      'solo framework', '21st century skills', 'table of specifications', 'tos', 'grade 7', 'grade 8',
      'grade 9', 'grade 10', 'grade 11 core'
    ],
    fullSections: [
      {
        heading: 'Coverage and Test Development',
        content: 'RUQA covers all learning areas from Grades 3 to 10 and Grade 11 core subjects. Subjects from K to Grade 2 and Grades 11-12 specialized/applied tracks are division-initiated. Test items are developed by RTTDs under SDO Education Program Supervisors (EPSs) anchored on the Structure of Observed Learning Outcomes (SOLO) Framework and 21st Century Skills.',
        keyPoints: [
          'Applies to Grades 3–10 and Grade 11 Core Subjects',
          'Test development aligned with SOLO Framework and 21st Century Skills Table of Specifications (TOS)',
          'Double test-item formulation rule for rigorous pilot testing and reliability'
        ]
      },
      {
        heading: 'Partner Division Assignments',
        content: 'English: Cagayan de Oro City & El Salvador City; TVL: Bukidnon & Misamis Oriental; Science: Malaybalay City & Valencia City; Filipino: Ozamiz City & Oroquieta City; Math: Camiguin & Gingoog City; MAPEH: Misamis Oriental; Values Education: Lanao del Norte & Iligan City; Araling Panlipunan: Misamis Occidental & Tangub City.',
        keyPoints: [
          'Lanao del Norte partnered with Iligan City for Values Education test development',
          'Secure transmission of RUQA materials via official DepEd institutional accounts only'
        ]
      }
    ]
  },
  {
    id: 'doc-ecps-reclassification-2025',
    code: 'DM-No.-523-s.-2025',
    title: 'Division Memorandum No. 523, s. 2025: Call for Applications for Reclassification of Teaching Positions',
    category: 'Division Memorandum',
    issuer: 'DepEd Schools Division of Lanao del Norte - Edwin R. Maribojoc, CESO V (Schools Division Superintendent)',
    dateIssued: 'September 8, 2025',
    schoolYear: '2025-2026 / 2026-2027',
    applicableGrades: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    applicableSections: ['All 120 Faculty & Advisers across Grades 7 to 12'],
    summary: 'Implements the Expanded Career Progression System (ECPS) pursuant to DO 024, s. 2025 and DO 19, s. 2025. Outlines qualification standards, education, training hours (8h, 16h, 24h, 32h), experience, and classroom observable (COIs) / non-classroom observable indicators (NCOIs) for Teacher II to Teacher VII and Master Teacher II to Master Teacher IV across JHS, SHS Academic, TVL, and Sports tracks.',
    keywords: [
      'ecps', 'reclassification', 'career progression', 'edwin maribojoc', 'lanao del norte',
      'teacher ii', 'teacher iii', 'teacher iv', 'teacher v', 'teacher vi', 'teacher vii',
      'master teacher ii', 'master teacher iii', 'master teacher iv', 'ppst', 'coi', 'ncoi', 'tesda'
    ],
    fullSections: [
      {
        heading: 'JHS & Elementary Qualification Standards',
        content: 'Teacher II: Bachelor degree in Education + 8 hrs training + 1 yr experience. Teacher III: Bachelor degree + 16 hrs training + 2 yrs experience. Teacher IV: Bachelor degree + 16 hrs training or NEAP Career Stage II + 3 yrs experience. Teacher V: Bachelor degree + 24 hrs training or NEAP Stage II + 4 yrs experience. Teacher VI: Bachelor degree + 32 hrs training or NEAP Stage II + 4 yrs experience. Master Teacher II: Master degree in Education/Management + 24 hrs training (8h instructional supervision) or NEAP Stage III + 5 yrs experience (1 yr relevant instructional supervision). Master Teacher III: Master degree + 24 hrs training or NEAP Stage IV + 5 yrs experience (2 yrs instructional supervision).',
        keyPoints: [
          'Teacher II: 8h training, 1 yr experience | Teacher III: 16h training, 2 yrs experience',
          'Teacher IV-VI: 16h–32h training or NEAP Career Stage II certification',
          'Master Teacher II-III: Master degree + 24h training (8h instructional supervision) + 5 yrs experience'
        ]
      },
      {
        heading: 'SHS Academic, TVL, and Sports Track Standards',
        content: 'SHS Academic: Bachelor degree in major + 18 professional units or Master degree units + 8h to 24h training + RA 1080 (Teacher Secondary). SHS TVL: Bachelor degree + 18 units + National Certificate (NC II) and Trainer Methodology Certificate (TMC I) in relevant vocational specialization. SHS Sports Track: Bachelor degree with major in Sports Track plus 18 professional units + 8h to 24h training in Sports Track curriculum/instruction.',
        keyPoints: [
          'TVL Track requirement: TESDA NC II and TMC I in specialization area',
          'Sports Track requirement: 8h-24h specialized sports curriculum training + relevant coaching/teaching experience'
        ]
      },
      {
        heading: 'Performance & Observable Indicators (PPST)',
        content: 'Teacher II: At least 6 Proficient COIs at VS, 4 Proficient NCOIs at VS. Teacher III: 12 Proficient COIs at VS, 8 Proficient NCOIs at VS. Teacher IV: 21 Proficient COIs at VS, 16 Proficient NCOIs at VS. Teacher V-VII: 6 to 18 Proficient COIs at Outstanding, 4 to 6 NCOIs at Outstanding. Master Teacher II: At least 10 Highly Proficient COIs at Outstanding, 5 Highly Proficient NCOIs at VS & 5 at Outstanding. Master Teacher III: 21 Highly Proficient COIs at Outstanding, 8 Highly Proficient NCOIs at VS & 8 at Outstanding.',
        keyPoints: [
          'Evaluation based on Classroom Observable Indicators (COIs) and Non-Classroom Observable Indicators (NCOIs)',
          'Requires at least Very Satisfactory (VS) or Outstanding performance ratings'
        ]
      }
    ]
  },
  {
    id: 'doc-summer-remediation-2026',
    code: 'DepEd-Order-No.-010-s.-2026',
    title: 'DepEd Order No. 010, s. 2026: Guidelines for the Implementation of the 2026 Summer Remediation Programs',
    category: 'DepEd Order',
    issuer: 'Department of Education - Sonny Angara (Secretary of Education)',
    dateIssued: 'April 28, 2026',
    schoolYear: '2025-2026 / 2026-2027',
    applicableGrades: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    applicableSections: ['All Remedial & Conditional Sections (Grades 7 to 12)'],
    summary: 'Prescribes the national policy on the 2026 Summer Remediation Programs (SRP) implemented from May 6 to June 2, 2026. Encompasses: (1) ARAL Summer-Reading, (2) ARAL Summer-Mathematics, (3) Senior High School Remediation (English & Math), and (4) Summer Academic Remedial Program (SARP) for learners failing 1-2 learning areas. Establishes 20-day tutorial format, 2 hrs/day per subject, 1:10 tutor ratio, and Recomputed Final Grade (RFG >= 75) promotion standard.',
    keywords: [
      'summer remediation', 'srp', 'sarp', 'aral program', 'ra 12028', 'sonny angara', 'deped order 010',
      'recomputed final grade', 'rfg', 'may 6 to june 2 2026', '20-day tutorial', '1:10 tutor ratio',
      'shs remediation', 'reading frustration level', 'math remediation'
    ],
    fullSections: [
      {
        heading: 'Program Components & Target Learners',
        content: '1. ARAL Summer-Reading: 20-day tutorial for incoming Grades 2 to 11 at Emerging/Frustration level based on CRLA / Phil-IRI EOSY assessment. 2. ARAL Summer-Mathematics: Incoming Grades 2-4 at Not Proficient / Low Proficient. 3. SHS Remediation Program: Incoming Grade 12 learners in English and Mathematics at Frustration / Low Proficient level. 4. Summer Academic Remedial Program (SARP): Public and private learners in Key Stages 1-4 who failed 1 or 2 subjects in SY 2025-2026.',
        keyPoints: [
          'Implementation Schedule: May 6 to June 2, 2026 (20-day duration)',
          'Tutor-to-Learner Ratio: Maximum 1:10 for individualized instruction',
          'Session Duration: 2 hours per learning area per day (with 30-min break)'
        ]
      },
      {
        heading: 'Recomputed Final Grade (RFG) & Promotion Criteria',
        content: 'The Remedial Class Mark (final grade in SARP) is averaged with the learner\'s final grade at the end of the school year to determine the Recomputed Final Grade (RFG). Formula: RFG = (Final Rating + Remedial Mark) / 2. The RFG must be at least 75 for a learner to be promoted to the next grade level. A Certificate of RFG signed by the subject teacher and approved by the Principal is issued upon enrollment.',
        keyPoints: [
          'Promotion Standard: Recomputed Final Grade (RFG) >= 75',
          'Certificate of RFG issued and submitted for enrollment to the next grade level',
          'Consistent attendance is mandatory; unexcused non-attendance results in retention'
        ]
      },
      {
        heading: 'Teacher Incentives & Service Credits',
        content: 'Public school teachers handling tutorial sessions receive 1 day of Vacation Service Credit for every 6 hours of actual service (in addition to annual 30-45 day limit under DO 013, s. 2024). Certificates of Appreciation and financial honoraria provided subject to government accounting guidelines.',
        keyPoints: [
          '1 day Vacation Service Credit earned for every 6 hours of actual tutorial service',
          'Priority assignment given to Master Teachers and highly proficient subject specialists'
        ]
      }
    ]
  },
  {
    id: 'doc-sports-memo-2026',
    code: 'LNNCHS-SM-2026-06',
    title: 'LNNCHS School Memorandum s. 2026: Beginning of School Year 2026-2027 Meeting for Sports Coaches & SPS Advisers',
    category: 'School Memorandum',
    issuer: 'Office of the Principal - Anisah A. Sinal (Secondary School Principal IV)',
    dateIssued: 'June 8, 2026',
    schoolYear: '2026-2027',
    applicableGrades: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    applicableSections: ['Sports Track 11 (Olympus)', 'Sports Track 12 (Marathon)', 'Special Program in Sports (SPS) Classes'],
    summary: 'Directs all School Sports Coaches, Special Program in Sports (SPS) Specialization Teachers, and SPS Advisers to convene on June 9, 2026 at 8:00 AM in the LNNCHS Conference Hall. Focuses on sports curriculum orientation, selection & training programs for student-athletes, coaching assignments, and role designations under School Sports Coordinator Norwin F. Palao and SPS Coordinator Cyril Mark B. Olis.',
    keywords: [
      'sports memo', 'school sports coordinator', 'norwin palao', 'cyril mark olis', 'special program in sports',
      'sps', 'sports coaches', 'sports track 11', 'sports track 12', 'maam kisshia', 'student athletes'
    ],
    fullSections: [
      {
        heading: 'Meeting Agenda & Directives',
        content: 'Convenes sports leaders on June 9, 2026 (8:00 AM, LNNCHS Conference Hall) with key agenda: 1. Orientation on School Sports and SPS Program for S.Y. 2026-2027; 2. Selection and Training Program for Student-Athletes; 3. Roles and responsibilities of Sports Coaches and Teacher-Advisers (including Ma\'am Kisshia, Coach Bernardo Diaz, and specialization mentors); 4. Facilities management for athletic oval, gym, and tennis/volleyball courts.',
        keyPoints: [
          'Addressed to: Norwin F. Palao (School Sports Coordinator), Cyril Mark B. Olis (SPS Coordinator), Coaches & Advisers',
          'Approved by: Anisah A. Sinal (Secondary School Principal IV)',
          'Covers athlete selection, training schedule, and sports facility operations'
        ]
      }
    ]
  },
  {
    id: 'doc-lesson-rubric',
    code: 'DepEd-Annex-A-Rubric',
    title: 'DepEd Annex A: Lesson Planning Rubric & Instructional Coaching Guide',
    category: 'Curriculum & Rubric',
    issuer: 'Department of Education - Curriculum and Instruction Strand',
    dateIssued: '2025/2026',
    schoolYear: '2025-2026 / 2026-2027',
    applicableGrades: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    applicableSections: ['All 120 Sections (Grade 7 to 12 Teaching Plans)'],
    summary: 'Standardized evaluation rubric for lesson plan quality assurance and instructional coaching. Features 8 quality dimensions: clear learning intentions, coherence across sections, instructional clarity for peer implementation, learning design principles, integration & contextualization, inclusivity for diverse learners, integrated assessment strategies, and actionable reflection forward.',
    keywords: [
      'lesson planning rubric', 'annex a', 'instructional coaching', 'learning competencies',
      'learning design', 'inclusivity', 'integrated assessment', 'coherence', 'matatag curriculum'
    ],
    fullSections: [
      {
        heading: 'Rubric Quality Dimensions',
        content: '1. Intentions clearly stated with appropriate competencies. 2. Intentions evident across all sections (coherence). 3. Learning experience clear for peer implementation without additional explanation. 4. Intentionally embedded Learning Design Principles. 5. Maximizes available opportunities for integration and contextualization. 6. Inclusive learning experiences supporting learners with disabilities and diverse contexts. 7. Integrated assessment strategies throughout session. 8. Actionable forward interventions based on reflections.',
        keyPoints: [
          'Criteria scored as: "Yes", "Not Yet", and "Why? / What will make it better?"',
          'Includes dedicated notes container for instructional coaching and master teacher mentoring'
        ]
      }
    ]
  },
  {
    id: 'doc-dm-299-2026',
    code: 'DM No. 299, s. 2026',
    title: 'Division Memorandum No. 299, s. 2026: Handog ng Pangulo in partnership with PhilHealth and the Philippine Statistics Authority',
    category: 'Division Memorandum',
    issuer: 'DepEd Schools Division Office',
    dateIssued: 'September 24, 2026',
    schoolYear: '2026-2027',
    applicableGrades: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    applicableSections: ['All Students & Faculty'],
    summary: 'Inter-agency initiative for Handog ng Pangulo providing PhilHealth registration and PSA birth certificate processing for learners and personnel.',
    keywords: ['handog ng pangulo', 'philhealth', 'psa', 'philippine statistics authority', 'dm 299'],
    fullSections: [
      {
        heading: 'Program Implementation',
        content: 'Provides free PSA registration and PhilHealth enrollment for learners and teaching/non-teaching personnel in collaboration with partner agencies.',
        keyPoints: ['Partnership with PhilHealth and PSA', 'Covers learners and DepEd personnel', 'Facilitated through school health and registrar units']
      }
    ]
  },
  {
    id: 'doc-dm-298-2026',
    code: 'DM No. 298, s. 2026',
    title: 'Division Memorandum No. 298, s. 2026: Gulayan sa Paaralan and Integrated School Nutrition Model Implementing Guidelines, SY 2026–2027',
    category: 'Division Memorandum',
    issuer: 'DepEd Schools Division Office',
    dateIssued: 'September 24, 2026',
    schoolYear: '2026-2027',
    applicableGrades: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    applicableSections: ['School Gardening & Feeding Program Coordinators'],
    summary: 'Establishes updated implementing guidelines for Gulayan sa Paaralan Program (GPP) and Integrated School Nutrition Model for SY 2026–2027.',
    keywords: ['gulayan sa paaralan', 'gpp', 'school nutrition', 'feeding program', 'dm 298'],
    fullSections: [
      {
        heading: 'GPP Guidelines',
        content: 'Directs all public secondary schools to establish bio-intensive gardens and link crop yields to the SBFP school feeding initiatives.',
        keyPoints: ['Bio-intensive organic gardening', 'Supports SBFP feeding program', 'Promotes nutritional awareness among learners']
      }
    ]
  },
  {
    id: 'doc-dm-297-2026',
    code: 'DM No. 297, s. 2026',
    title: 'Division Memorandum No. 297, s. 2026: Conduct of Initial Evaluation Result (KER) and Comparative Assessment Result for Expanded Reclassification (CAReER) for Higher Teaching Positions',
    category: 'Division Memorandum',
    issuer: 'DepEd Schools Division Office - HRMO',
    dateIssued: 'September 24, 2026',
    schoolYear: '2026-2027',
    applicableGrades: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    applicableSections: ['All Teaching Staff & Applicants'],
    summary: 'Announces the evaluation and comparative assessment results (KER/CAReER) for higher teaching position reclassification under the Expanded Career Progression System.',
    keywords: ['ker', 'career', 'comparative assessment', 'reclassification', 'higher teaching positions', 'dm 297'],
    fullSections: [
      {
        heading: 'CAReER Evaluation',
        content: 'Publishes evaluation matrices for qualified applicants aspiring for Master Teacher and Senior High School promotion under ECPS.',
        keyPoints: ['Transparency in reclassification', 'Covers Master Teacher I-IV applicants', 'Includes appeal and validation period']
      }
    ]
  },
  {
    id: 'doc-dm-296-2026',
    code: 'DM No. 296, s. 2026',
    title: 'Division Memorandum No. 296, s. 2026: Division Election Committee (CAReER) for Higher Teaching Positions',
    category: 'Division Memorandum',
    issuer: 'DepEd Schools Division Office',
    dateIssued: 'September 24, 2026',
    schoolYear: '2026-2027',
    applicableGrades: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    applicableSections: ['Division Screening & Assessment Board'],
    summary: 'Designates the composition and duties of the Division Election and Assessment Committee for higher teaching position promotion evaluations.',
    keywords: ['election committee', 'career', 'higher teaching positions', 'dm 296'],
    fullSections: [
      {
        heading: 'Committee Composition',
        content: 'Outlines official members including Assistant Schools Division Superintendent, HR Personnel, and Division EPS representatives.',
        keyPoints: ['Formulates evaluation schedules', 'Oversees ranking and verification', 'Ensures compliance with Civil Service Commission standards']
      }
    ]
  },
  {
    id: 'doc-dm-295-2026',
    code: 'DM No. 295, s. 2026',
    title: 'Division Memorandum No. 295, s. 2026: Induction Program for Beginning Teachers (Batch 2) cum Onboarding of Newly-Hired Non-Teaching Personnel',
    category: 'Division Memorandum',
    issuer: 'DepEd Schools Division Office - HRDD',
    dateIssued: 'September 24, 2026',
    schoolYear: '2026-2027',
    applicableGrades: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    applicableSections: ['Newly Hired Teachers & Non-Teaching Staff'],
    summary: 'Conduct of Teacher Induction Program (TIP) Batch 2 and onboarding orientation for newly-appointed non-teaching personnel.',
    keywords: ['tip', 'teacher induction program', 'onboarding', 'newly hired teachers', 'dm 295'],
    fullSections: [
      {
        heading: 'Induction Schedule & Modules',
        content: 'Provides mandatory courseware and mentoring schedules for newly deployed educators and non-teaching support staff.',
        keyPoints: ['PPST Module alignment', 'Mentoring by Master Teachers', 'Attendance and completion requirements']
      }
    ]
  },
  {
    id: 'doc-dm-294-2026',
    code: 'DM No. 294, s. 2026',
    title: 'Division Memorandum No. 294, s. 2026: Submission of data on schools with LRP desks, LEO designates, and localized anti-bullying policies per district',
    category: 'Division Memorandum',
    issuer: 'DepEd Schools Division Office - Legal & CPC Unit',
    dateIssued: 'September 24, 2026',
    schoolYear: '2026-2027',
    applicableGrades: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    applicableSections: ['School Child Protection Committees & Guidance Office'],
    summary: 'Requires submission of localized anti-bullying policy updates, Learner Rights Protection (LRP) desk rosters, and Legal Education Officer (LEO) designations.',
    keywords: ['lrp desks', 'leo designates', 'anti-bullying policy', 'child protection', 'dm 294'],
    fullSections: [
      {
        heading: 'Compliance Submission',
        content: 'Directs all school heads to submit verified templates on Child Protection Committee personnel and anti-bullying monitoring desks.',
        keyPoints: ['Mandatory compliance under RA 10627', 'Updated LRP desk contact info', 'District consolidation deadline']
      }
    ]
  },
  {
    id: 'doc-dm-293-2026',
    code: 'DM No. 293, s. 2026',
    title: 'Division Memorandum No. 293, s. 2026: Participation for School-Based Immunization (SBI) Microplanning Workshop',
    category: 'Division Memorandum',
    issuer: 'DepEd Schools Division Office - Health & Nutrition Unit',
    dateIssued: 'September 24, 2026',
    schoolYear: '2026-2027',
    applicableGrades: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    applicableSections: ['School Clinic & Health Coordinators'],
    summary: 'Designates health personnel to attend the microplanning workshop for School-Based Immunization (SBI) program roll-out in partnership with DOH.',
    keywords: ['sbi', 'school-based immunization', 'microplanning workshop', 'health clinic', 'dm 293'],
    fullSections: [
      {
        heading: 'Workshop Details',
        content: 'Strategic session for target learner coverage, parental consent verification, and vaccine cold-chain logistics.',
        keyPoints: ['DOH and DepEd Health collaboration', 'Parental consent requirement', 'Schedule of immunization drives']
      }
    ]
  },
  {
    id: 'doc-dm-292-2026',
    code: 'DM No. 292, s. 2026',
    title: "Division Memorandum No. 292, s. 2026: DepEd Learners' Convergence 2026",
    category: 'Division Memorandum',
    issuer: 'DepEd Schools Division Office - Youth Formation',
    dateIssued: 'September 24, 2026',
    schoolYear: '2026-2027',
    applicableGrades: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    applicableSections: ['SSLG Officers, Youth Leaders, and Advisers'],
    summary: 'Gathering of student leaders, SSLG officers, and youth formation advisers for leadership development, digital literacy, and civic engagement.',
    keywords: ['learners convergence', 'youth formation', 'sslg', 'student leadership', 'dm 292'],
    fullSections: [
      {
        heading: 'Convergence Framework',
        content: 'Provides instructions for delegation selection, parental consent, and student leadership workshop strands.',
        keyPoints: ['SSLG and Youth Club participation', 'Leadership & digital citizenship topics', 'Safety and travel protocols']
      }
    ]
  },
  {
    id: 'doc-dm-291a-2026',
    code: 'DM No. 291-A, s. 2026',
    title: 'Division Memorandum No. 291-A, s. 2026: Registration of Authorized Processors for the Online Certification, Authentication and Verification Application System (OCAVAS)',
    category: 'Division Memorandum',
    issuer: 'DepEd Schools Division Office - Records Section',
    dateIssued: 'September 24, 2026',
    schoolYear: '2026-2027',
    applicableGrades: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    applicableSections: ['School Registrar & Records Officers'],
    summary: 'Guidelines for designating and registering official school records personnel into the OCAVAS digital verification platform.',
    keywords: ['ocavas', 'certification authentication verification', 'records officer', 'school registrar', 'dm 291-a'],
    fullSections: [
      {
        heading: 'OCAVAS User Registration',
        content: 'Ensures secure credentialing for authorized encoders handling transcript verification and diploma authentication.',
        keyPoints: ['Online CAV processing', 'Encrypted portal access', 'User security compliance']
      }
    ]
  },
  {
    id: 'doc-dm-290b-2026',
    code: 'DM No. 290-B, s. 2026',
    title: 'Division Memorandum No. 290-B, s. 2026: Khan Academy Orientation Module 2 – Reimagining Teaching with Khan Academy: Hands-on Technical Training for KHANDO Teachers',
    category: 'Division Memorandum',
    issuer: 'DepEd Schools Division Office - CID / ICT',
    dateIssued: 'September 24, 2026',
    schoolYear: '2026-2027',
    applicableGrades: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    applicableSections: ['Math & Science Faculty, ICT Coordinators'],
    summary: 'Hands-on technical orientation and training for educators on using Khan Academy platform and Khanmigo AI teaching assistants.',
    keywords: ['khan academy', 'khando teachers', 'digital learning', 'ict training', 'dm 290-b'],
    fullSections: [
      {
        heading: 'Training Mechanics',
        content: 'Module 2 technical walkthrough on classroom creation, skill mastery tracking, and blended learning integration.',
        keyPoints: ['Khan Academy platform setup', 'Differentiated math/science learning', 'Teacher dashboard navigation']
      }
    ]
  }
];
