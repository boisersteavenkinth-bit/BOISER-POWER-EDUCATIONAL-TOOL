import { TechProElective } from '../types';

export interface CurriculumMapRow {
  gradeLevel: string;
  keyStage: string;
  curriculumFramework: string;
  threeTermBOW: boolean;
  transitionFlag: boolean;
  notes: string;
}

export const CURRICULUM_FRAMEWORK_MAP: CurriculumMapRow[] = [
  {
    gradeLevel: 'Kindergarten',
    keyStage: 'KS 1',
    curriculumFramework: 'MATATAG',
    threeTermBOW: true,
    transitionFlag: false,
    notes: 'Developmental milestones, socio-emotional literacy, play-based foundational domains'
  },
  {
    gradeLevel: 'Grade 1',
    keyStage: 'KS 1',
    curriculumFramework: 'Revised K–10 (MATATAG)',
    threeTermBOW: true,
    transitionFlag: false,
    notes: 'Focus on Makabansa, GMRC, Language/Filipino/English, Mathematics'
  },
  {
    gradeLevel: 'Grade 2',
    keyStage: 'KS 1',
    curriculumFramework: 'Revised K–10 (MATATAG)',
    threeTermBOW: true,
    transitionFlag: false,
    notes: 'Strengthening early literacy and numeracy across 3 terms'
  },
  {
    gradeLevel: 'Grade 3',
    keyStage: 'KS 2',
    curriculumFramework: 'MATATAG (Phase 3 Rollout)',
    threeTermBOW: true,
    transitionFlag: false,
    notes: '🌟 SY 2026–2027 Phase 3 Addition. Introduction of Science, continued Makabansa & GMRC'
  },
  {
    gradeLevel: 'Grade 4',
    keyStage: 'KS 2',
    curriculumFramework: 'Revised K–10 (MATATAG)',
    threeTermBOW: true,
    transitionFlag: false,
    notes: 'Discrete learning areas: Science, Math, English, Filipino, AP, EPP, MAPEH, GMRC'
  },
  {
    gradeLevel: 'Grade 5',
    keyStage: 'KS 2',
    curriculumFramework: 'Revised K–10 (MATATAG)',
    threeTermBOW: true,
    transitionFlag: false,
    notes: 'Three-term pacing with thematic integration and inquiry-based STEM'
  },
  {
    gradeLevel: 'Grade 6',
    keyStage: 'KS 2',
    curriculumFramework: 'MATATAG (Phase 3 Rollout)',
    threeTermBOW: true,
    transitionFlag: false,
    notes: '🌟 SY 2026–2027 Phase 3 Addition. Terminal KS 2 competencies & graduation standards'
  },
  {
    gradeLevel: 'Grade 7',
    keyStage: 'KS 3',
    curriculumFramework: 'Revised K–10 (MATATAG)',
    threeTermBOW: true,
    transitionFlag: false,
    notes: 'Secondary transition, exploratory TLE modules, enriched Science & Mathematics'
  },
  {
    gradeLevel: 'Grade 8',
    keyStage: 'KS 3',
    curriculumFramework: 'Revised K–10 (MATATAG)',
    threeTermBOW: true,
    transitionFlag: false,
    notes: 'Scientific inquiry, Asian Studies / AP, specialized language tracks'
  },
  {
    gradeLevel: 'Grade 9',
    keyStage: 'KS 3',
    curriculumFramework: 'MATATAG (Phase 3 Rollout)',
    threeTermBOW: true,
    transitionFlag: false,
    notes: '🌟 SY 2026–2027 Phase 3 Addition. Economics, advanced biology & chemistry concepts'
  },
  {
    gradeLevel: 'Grade 10',
    keyStage: 'KS 3',
    curriculumFramework: 'Revised K–10 / MELC-based',
    threeTermBOW: true,
    transitionFlag: false,
    notes: 'Pre-Senior High School preparation; final KS 3 summative portfolios'
  },
  {
    gradeLevel: 'Grade 11',
    keyStage: 'KS 4',
    curriculumFramework: 'Strengthened SHS Curriculum',
    threeTermBOW: true,
    transitionFlag: false,
    notes: 'Full implementation nationwide. 2 tracks only (Academic & TechPro). 5 streamlined prescribed subjects + Life and Career Skills + DO 015, s. 2026 weights'
  },
  {
    gradeLevel: 'Grade 12',
    keyStage: 'KS 4',
    curriculumFramework: 'Old SHS + DO 015 Transition',
    threeTermBOW: true,
    transitionFlag: true,
    notes: '⚠️ CRITICAL TRANSITION: DO 015, s. 2026 Paragraph 49 mandates retaining old DO 8, s. 2015 weights with new 3-term calendar and adjusted transmutation. Pilot schools: 320h TechPro / 80h Academic immersion'
  }
];

export const TECH_PRO_ELECTIVES: TechProElective[] = [
  // Family and Consumer Sciences (FCS)
  {
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Aesthetic, Wellness & Human Care',
    title: 'Beauty Care (Nail & Skin Care)',
    code: 'FCS-BC-11',
    description: 'Specialized cosmetic hygiene, manicuring, pedicuring, hand/foot spa, and salon safety procedures.',
    careerPathways: ['Licensed Esthetician', 'Nail Technician', 'Salon Manager', 'Spa Therapist'],
    certifications: ['Beauty Care NC II']
  },
  {
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Aesthetic, Wellness & Human Care',
    title: 'Caregiving (Adult & Geriatric Care)',
    code: 'FCS-CGA-11',
    description: 'Specialized healthcare support, vital signs monitoring, physical rehabilitation assistance, and palliative support.',
    careerPathways: ['Certified Adult Caregiver', 'Geriatric Care Specialist', 'Home Healthcare Aide'],
    certifications: ['Caregiving NC II']
  },
  {
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Aesthetic, Wellness & Human Care',
    title: 'Caregiving (Child & Pediatric Care)',
    code: 'FCS-CGC-11',
    description: 'Infant and child developmental milestones, nutrition, pediatric safety, and early childhood nursery management.',
    careerPathways: ['Pediatric Caregiver', 'Child Daycare Coordinator', 'Nanny / Au Pair Professional'],
    certifications: ['Caregiving NC II (Child Module)']
  },
  {
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Aesthetic, Wellness & Human Care',
    title: 'Hairdressing & Cosmetology',
    code: 'FCS-HD-11',
    description: 'Hair cutting, coloring, chemical straightening/perming, and creative scalp and aesthetic styling.',
    careerPathways: ['Hair Stylist', 'Barbering Entrepreneur', 'Cosmetology Instructor'],
    certifications: ['Hairdressing NC II']
  },
  {
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Artisanry & Creative Enterprises',
    title: 'Garments Artisanry & Tailoring',
    code: 'FCS-GA-11',
    description: 'Pattern drafting, industrial sewing machine operation, textile selection, and custom garment construction.',
    careerPathways: ['Pattern Maker', 'Fashion Tailor', 'Apparel Production Technician'],
    certifications: ['Dressmaking NC II', 'Tailoring NC II']
  },
  {
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Artisanry & Creative Enterprises',
    title: 'Handicraft (Traditional & Modern Weaving)',
    code: 'FCS-HW-11',
    description: 'Indigenous fiber extraction (abaca, piña, bamboo), handloom weaving techniques, and export craft enterprise.',
    careerPathways: ['Textile Artisan', 'Indigenous Craft Entrepreneur', 'Museum Textile Conservator'],
    certifications: ['Handicraft Artisan Certification']
  },
  {
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Hospitality & Tourism',
    title: 'Bakery Operation & Pastry Production',
    code: 'FCS-BO-11',
    description: 'Commercial yeast bread production, pastry lamination, cake decorating, food cost calculation, and baking science.',
    careerPathways: ['Head Baker', 'Pastry Chef', 'Bakery Store Operator'],
    certifications: ['Bread & Pastry Production NC II']
  },
  {
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Hospitality & Tourism',
    title: 'Event Management Services',
    code: 'FCS-EM-11',
    description: 'Corporate and social event planning, protocol management, budgeting, venue staging, and vendor coordination.',
    careerPathways: ['Event Coordinator', 'Wedding Planner', 'Convention Liaison Officer'],
    certifications: ['Events Management Services NC III']
  },
  {
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Hospitality & Tourism',
    title: 'Food & Beverage Services',
    code: 'FCS-FB-11',
    description: 'Dining room mise en place, American/French table service, beverage pairing, and customer relations.',
    careerPathways: ['Head Server', 'Restaurant Supervisor', 'Banquet Captain'],
    certifications: ['Food & Beverage Services NC II']
  },
  {
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Hospitality & Tourism',
    title: 'Hotel Front Office Services',
    code: 'FCS-FO-11',
    description: 'PMS software operation, reservations, guest registration, night audit, concierge services, and bell desk operations.',
    careerPathways: ['Front Desk Agent', 'Night Auditor', 'Hotel Operations Supervisor'],
    certifications: ['Front Office Services NC II']
  },
  {
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Hospitality & Tourism',
    title: 'Housekeeping Services',
    code: 'FCS-HK-11',
    description: 'Guest room maintenance, linen and laundry management, public area sanitation, and chemical handling safety.',
    careerPathways: ['Executive Housekeeper', 'Linen Master', 'Hospitality Facilities Supervisor'],
    certifications: ['Housekeeping NC II']
  },
  {
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Hospitality & Tourism',
    title: 'Kitchen Operation & Culinary Arts',
    code: 'FCS-KO-11',
    description: 'Classical culinary techniques, butchery, stock and sauce making, line cooking, HACCP food hygiene.',
    careerPathways: ['Commis Chef', 'Line Cook', 'Catering Entrepreneur'],
    certifications: ['Cookery NC II']
  },
  {
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Hospitality & Tourism',
    title: 'Tourism Promotion & Guiding Services',
    code: 'FCS-TS-11',
    description: 'Ecotourism itinerary development, regional tour commentary, Philippine heritage interpretation, travel ticketing.',
    careerPathways: ['Licensed DOT Tour Guide', 'Travel Agent', 'Tourism Promotion Officer'],
    certifications: ['Tourism Promotion Services NC II', 'Tour Guiding NC II']
  },

  // Industrial Arts (IA)
  {
    sector: 'Industrial Arts (IA)',
    cluster: 'Automotive & Small Engine',
    title: 'Driving & Automotive Servicing',
    code: 'IA-AS-11',
    description: 'Automotive powertrain diagnostics, chassis overhaul, brake systems, electrical troubleshooting, and professional road driving.',
    careerPathways: ['Automotive Service Technician', 'Fleet Maintenance Inspector', 'Professional Transport Specialist'],
    certifications: ['Automotive Servicing NC I & NC II', 'Professional Driver License']
  },
  {
    sector: 'Industrial Arts (IA)',
    cluster: 'Automotive & Small Engine',
    title: 'Motorcycle & Small Engine Servicing',
    code: 'IA-MS-11',
    description: 'Two-stroke and four-stroke carburetion, EFI tuning, CVT belt maintenance, suspension, and motorcycle electrical systems.',
    careerPathways: ['Motorcycle Mechanic', 'Small Engine Repair Specialist', 'Power Equipment Technician'],
    certifications: ['Motorcycle/Small Engine Servicing NC II']
  },
  {
    sector: 'Industrial Arts (IA)',
    cluster: 'Construction & Building',
    title: 'Carpentry & Formwork Construction',
    code: 'IA-CP-11',
    description: 'Structural framing, scaffolding assembly, formwork layout, rough carpentry, and architectural finishing.',
    careerPathways: ['Master Carpenter', 'Construction Site Foreman', 'Cabinet Maker'],
    certifications: ['Carpentry NC II']
  },
  {
    sector: 'Industrial Arts (IA)',
    cluster: 'Construction & Building',
    title: 'Construction Operation & Masonry',
    code: 'IA-CO-11',
    description: 'Rebar fabrication, concrete batching and pouring, block laying, plastering, tile setting, and site safety management.',
    careerPathways: ['Masonry Specialist', 'Concrete Inspector', 'Tile Setter Contractor'],
    certifications: ['Masonry NC II']
  },
  {
    sector: 'Industrial Arts (IA)',
    cluster: 'Construction & Building',
    title: 'Manual Metal Arc Welding (SMAW)',
    code: 'IA-WLD-11',
    description: 'Shielded metal arc welding in flat, horizontal, vertical, and overhead positions on carbon steel plates and pipes.',
    careerPathways: ['Industrial Welder', 'Pipefitter', 'Structural Steel Fabricator'],
    certifications: ['SMAW NC I & NC II']
  },
  {
    sector: 'Industrial Arts (IA)',
    cluster: 'Construction & Building',
    title: 'Technical Drafting & CAD Modeling',
    code: 'IA-TD-11',
    description: 'Architectural and engineering drafting, 2D AutoCAD detailing, 3D Revit/BIM modeling, and bill of materials preparation.',
    careerPathways: ['CAD Operator', 'Architectural Draftsperson', 'Engineering Technician'],
    certifications: ['Technical Drafting NC II']
  },
  {
    sector: 'Industrial Arts (IA)',
    cluster: 'Industrial Technologies',
    title: 'Domestic Refrigeration & Aircon (RAC)',
    code: 'IA-RAC-11',
    description: 'Thermodynamics of vapor compression, inverter split-type HVAC installation, copper brazing, vacuum testing, refrigerant recovery.',
    careerPathways: ['RAC Technician', 'HVAC Installer', 'Commercial Cold-Storage Technician'],
    certifications: ['RAC Servicing (DOMRAC) NC II']
  },
  {
    sector: 'Industrial Arts (IA)',
    cluster: 'Industrial Technologies',
    title: 'Electrical Installation & Maintenance (EIM)',
    code: 'IA-EIM-11',
    description: 'Philippine Electrical Code (PEC) standards, conduit bending, residential and commercial wiring, breaker panel installation.',
    careerPathways: ['Registered Master Electrician (RME)', 'Building Maintenance Electrician', 'Substation Technician'],
    certifications: ['Electrical Installation & Maintenance NC II']
  },
  {
    sector: 'Industrial Arts (IA)',
    cluster: 'Industrial Technologies',
    title: 'Electronics Product Assembly & Servicing',
    code: 'IA-EPAS-11',
    description: 'PCB soldering and desoldering, microcontroller interfacing, consumer audio-video troubleshooting, and power supply repair.',
    careerPathways: ['Electronics Service Technician', 'SMT Assembly Operator', 'IoT Hardware Assembler'],
    certifications: ['EPAS NC II']
  },
  {
    sector: 'Industrial Arts (IA)',
    cluster: 'Industrial Technologies',
    title: 'Photovoltaic (PV) Systems Installation',
    code: 'IA-PV-11',
    description: 'Solar panel array sizing, string inverter wiring, charge controllers, lithium/lead battery banks, grid-tied and off-grid compliance.',
    careerPathways: ['Solar PV Installer', 'Renewable Energy Technician', 'Green Building Specialist'],
    certifications: ['PV Systems Installation NC II']
  },

  // Information and Communications Technology (ICT)
  {
    sector: 'ICT',
    cluster: 'Creative Arts & Design',
    title: 'Animation (2D & 3D Digital Animation)',
    code: 'ICT-AN-11',
    description: '12 principles of animation, storyboarding, vector character rigging, digital inbetweening, 3D asset animation.',
    careerPathways: ['2D Animator', '3D Generalist', 'Motion Graphics Designer'],
    certifications: ['2D Animation NC III', '3D Animation NC III']
  },
  {
    sector: 'ICT',
    cluster: 'Creative Arts & Design',
    title: 'Digital Illustration & Concept Art',
    code: 'ICT-IL-11',
    description: 'Digital raster and vector drawing, color theory, digital painting, character design, and editorial graphics.',
    careerPathways: ['Concept Artist', 'Children Book Illustrator', 'Game Asset Designer'],
    certifications: ['Illustration NC II']
  },
  {
    sector: 'ICT',
    cluster: 'Creative Arts & Design',
    title: 'Visual Graphic Design & UI/UX',
    code: 'ICT-VGD-11',
    description: 'Typography, branding, layout design for print/digital, Figma wireframing, design systems, and prepress production.',
    careerPathways: ['Graphic Designer', 'UI/UX Designer', 'Brand Identity Specialist'],
    certifications: ['Visual Graphic Design NC III']
  },
  {
    sector: 'ICT',
    cluster: 'ICT Support & Programming',
    title: 'Computer Programming (Java)',
    code: 'ICT-PRG-JAVA-11',
    description: 'Object-oriented programming (OOP), data structures, GUI development, JDBC database connection, and algorithmic thinking.',
    careerPathways: ['Junior Java Developer', 'Software QA Tester', 'Backend Systems Associate'],
    certifications: ['Programming (Java) NC IV']
  },
  {
    sector: 'ICT',
    cluster: 'ICT Support & Programming',
    title: 'Computer Programming (.NET / C#)',
    code: 'ICT-PRG-NET-11',
    description: 'C# fundamentals, ASP.NET web development, Entity Framework, RESTful API consumption, and desktop solutions.',
    careerPathways: ['.NET Application Developer', 'Enterprise Software Assistant', 'Cloud Solutions Trainee'],
    certifications: ['Programming (.NET) NC IV']
  },
  {
    sector: 'ICT',
    cluster: 'ICT Support & Programming',
    title: 'Computer Programming (Oracle Database / SQL)',
    code: 'ICT-PRG-DB-11',
    description: 'Relational database design, ER modeling, SQL querying, PL/SQL stored procedures, and database administration fundamentals.',
    careerPathways: ['Junior Database Administrator', 'Data Analyst Associate', 'SQL Reporting Specialist'],
    certifications: ['Programming (Oracle Database) NC IV']
  },
  {
    sector: 'ICT',
    cluster: 'ICT Support & Programming',
    title: 'Computer Systems Servicing (CSS)',
    code: 'ICT-CSS-11',
    description: 'Computer hardware assembly, OS installation and dual-booting, LAN cable crimping, routing, subnetting, client-server setup.',
    careerPathways: ['IT Helpdesk Specialist', 'Network Support Technician', 'Computer Repair Entrepreneur'],
    certifications: ['Computer Systems Servicing NC II']
  },
  {
    sector: 'ICT',
    cluster: 'ICT Support & Programming',
    title: 'Contact Center Services & CRM Operations',
    code: 'ICT-CCS-11',
    description: 'American English accent training, active listening, CRM software data entry, omnichannel support, and escalation procedures.',
    careerPathways: ['Customer Experience Associate', 'Technical Support Representative', 'BPO Team Lead Trainee'],
    certifications: ['Contact Center Services NC II']
  },

  // Maritime
  {
    sector: 'Maritime',
    cluster: 'Naval Operations & Engineering',
    title: 'Maritime Engineering at Support Level',
    code: 'MAR-ENG-11',
    description: 'STCW 2010 Manila Amendments compliance, auxiliary engine maintenance, watchkeeping, marine electrical machinery.',
    careerPathways: ['Engine Cadet', 'Oiler / Wiper Support Technician', 'Marine Auxiliary Mechanic'],
    certifications: ['Ratings Forming Part of an Engineering Watch (RFPEW)']
  },
  {
    sector: 'Maritime',
    cluster: 'Naval Operations & Engineering',
    title: 'Maritime Transportation at Support Level',
    code: 'MAR-TRN-11',
    description: 'Bridge watchkeeping, terrestrial navigation, nautical chart plotting, shipboard knots and rigging, life-saving appliances.',
    careerPathways: ['Deck Cadet', 'Able Seafarer Deck', 'Port Operations Assistant'],
    certifications: ['Ratings Forming Part of a Navigational Watch (RFPNW)']
  },
  {
    sector: 'Maritime',
    cluster: 'Naval Operations & Engineering',
    title: 'Ships Catering Services (Maritime Cookery)',
    code: 'MAR-CAT-11',
    description: 'MLC 2006 maritime food safety standards, galley inventory, balanced seafarer nutrition, mess hall service, provisions storage.',
    careerPathways: ['Ship Chief Cook', 'Messman', 'Cruise Ship Galley Assistant'],
    certifications: ['Ships Catering Services NC I / NC II']
  }
];

export const SOURCE_HIERARCHY = [
  {
    level: 1,
    title: 'LEVEL 1 — Official DepEd.gov.ph Issuances',
    description: 'DepEd Orders (DO 009, s. 2026; DO 015, s. 2026), Memoranda, Official Central Office BOWs and Curriculum Guides.',
    trust: 'Authoritative / Single Source of Truth',
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-300'
  },
  {
    level: 2,
    title: 'LEVEL 2 — DepEd Regional / Division Issuances',
    description: 'Regional Memoranda, Division-validated localized Three-Term BOWs (e.g. Caraga, Gapan, Ozamiz), regional learning materials.',
    trust: 'Validated Contextualization',
    badge: 'bg-blue-50 text-blue-800 border-blue-300'
  },
  {
    level: 3,
    title: 'LEVEL 3 — Trusted Educator Platforms',
    description: 'DepEd Club, DepEd Tambayan, EduFilesPH — strictly used for cross-checking verification and pedagogical formatting.',
    trust: 'Cross-Check Only',
    badge: 'bg-amber-50 text-amber-800 border-amber-300'
  },
  {
    level: 4,
    title: 'LEVEL 4 — Secondary Uploads & Unverified Files',
    description: 'Scribd, social forums, personal educator blogs. Never used as the sole source of truth; marked unverified if not backed by Level 1-2.',
    trust: 'Reference Only (Flagged for Review)',
    badge: 'bg-rose-50 text-rose-800 border-rose-300'
  }
];
