export interface BOWCompetencyItem {
  id: string;
  term: 1 | 2 | 3;
  week: string;
  hours: number;
  domain: string;
  topic: string;
  competencyCode: string;
  contentStandard: string;
  performanceStandard: string;
  learningCompetency: string;
  enablingCompetencies: string[];
  assessmentWeights: {
    writtenWork: number;
    performanceTask: number;
    termExam: number;
  };
  sampleAssessment: string;
  pedagogicalStrategies: string[];
  materials: string[];
}

export interface SubjectThreeTermBOW {
  subjectTitle: string;
  subjectCode: string;
  track: 'Academic' | 'TechPro' | 'Both';
  hoursPerTerm: number;
  totalAnnualHours: number;
  policyIssuance: string;
  description: string;
  competencies: BOWCompetencyItem[];
}

export const GRADE_11_THREE_TERM_BOW: Record<string, SubjectThreeTermBOW> = {
  'Effective Communication': {
    subjectTitle: 'Effective Communication',
    subjectCode: 'SHS-EC11',
    track: 'Both',
    hoursPerTerm: 40,
    totalAnnualHours: 120,
    policyIssuance: 'DepEd Order No. 015, s. 2026 (Strengthened SHS Curriculum)',
    description: 'A streamlined English prescribed subject integrating oral communication, pragmatic discourse, and critical reading/writing across multicultural, academic, and technical settings.',
    competencies: [
      // Term 1
      {
        id: 'G11-EC-T1-W1',
        term: 1,
        week: 'Weeks 1–2',
        hours: 8,
        domain: 'Foundations of Human Communication',
        topic: 'Nature, Process, and Models of Human Communication',
        competencyCode: 'EC11-FHC-T1-W1',
        contentStandard: 'The learner understands the principles, nature, and elements of human communication in multidisciplinary and cultural contexts.',
        performanceStandard: 'The learner demonstrates effective and culturally sensitive oral and written communication exemplifying fundamental communication models.',
        learningCompetency: 'Explains the functions, nature, and process of communication using established models (Shannon-Weaver, Schramm, Berlo SMCR).',
        enablingCompetencies: [
          'Distinguishes verbal from non-verbal communication cues in interpersonal settings.',
          'Identifies systemic communication breakdowns and applies effective verbal remediation techniques.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Performance Task (50%): Simulated workplace conference resolving an operational misunderstanding between remote departments.',
        pedagogicalStrategies: ['Case study simulation', 'Video exemplar critique', 'Interactive diagramming'],
        materials: ['DepEd Grade 11 Teacher Guide', 'Audio-visual communication clips', 'Rubric on Communicative Competence']
      },
      {
        id: 'G11-EC-T1-W2',
        term: 1,
        week: 'Weeks 3–4',
        hours: 8,
        domain: 'Intercultural & Ethical Communication',
        topic: 'Socio-Cultural Dimensions of Discourse & Inclusive Language',
        competencyCode: 'EC11-IEC-T1-W2',
        contentStandard: 'The learner demonstrates communicative competence by recognizing barriers in intercultural discourse.',
        performanceStandard: 'The learner participates productively in diverse intercultural and multilingual collaborative dialogues.',
        learningCompetency: 'Demonstrates sensitivity to the socio-cultural dimensions of communication including gender, culture, religion, and socio-economic background.',
        enablingCompetencies: [
          'Evaluates linguistic bias, ethnocentrism, and stereotypes in broadcast media and workplace memos.',
          'Applies polite honorifics and culturally respectful registers in cross-regional Philippine dialogues.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Written Work (30%): Comparative critique of two corporate public statements analyzing cultural inclusivity and tone.',
        pedagogicalStrategies: ['Fishbowl discussion', 'Cultural etiquette inquiry', 'Discourse analysis'],
        materials: ['Hofstede Cultural Dimensions summary', 'DepEd Gender-Fair Language Guidelines']
      },
      {
        id: 'G11-EC-T1-W3',
        term: 1,
        week: 'Weeks 5–6',
        hours: 8,
        domain: 'Communicative Strategies',
        topic: 'Discourse Governance & Conversation Flow Management',
        competencyCode: 'EC11-CS-T1-W3',
        contentStandard: 'The learner understands how communicative strategies manage topic, turn-taking, and conversational dynamics.',
        performanceStandard: 'The learner skillfully deploys communicative strategies in informal dialogues, panel discussions, and symposiums.',
        learningCompetency: 'Engages in collaborative communicative situations using appropriate strategies (Nomination, Restriction, Turn-taking, Topic Control, Topic Shifting, Repair, Termination).',
        enablingCompetencies: [
          'Identifies the seven communicative strategies in authentic legislative and workplace debates.',
          'Applies repair strategies to de-escalate conflicting conversational interruptions.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Performance Task (50%): Round-table committee simulation where students are assessed on strategy card deployment.',
        pedagogicalStrategies: ['Role-playing', 'Strategy card prompts', 'Mock legislative assembly'],
        materials: ['Discourse transcription worksheets', 'Strategy rubric']
      },
      {
        id: 'G11-EC-T1-W4',
        term: 1,
        week: 'Weeks 7–8',
        hours: 8,
        domain: 'Oral Presentation & Delivery Styles',
        topic: 'Speech Styles, Contexts, and Non-Verbal Modalities',
        competencyCode: 'EC11-OPD-T1-W4',
        contentStandard: 'The learner understands the distinctions among speech styles (intimate, casual, consultative, formal, frozen).',
        performanceStandard: 'The learner adjusts speech style and non-verbal pacing appropriately for various audience sizes and occasions.',
        learningCompetency: 'Differentiates types of speech contexts and speech styles, employing appropriate non-verbal body language and vocal variety.',
        enablingCompetencies: [
          'Distinguishes consultative communication from formal declamation.',
          'Modulates vocal pitch, rate, and volume for persuasive impact.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Performance Task (50%): 3-minute consultative pitch addressing a community barangay council.',
        pedagogicalStrategies: ['Speech audio modeling', 'Mirror vocal drills', 'Peer coaching'],
        materials: ['Microphone / audio recorder', 'Speech evaluation rubric']
      },
      {
        id: 'G11-EC-T1-W5',
        term: 1,
        week: 'Weeks 9–10',
        hours: 8,
        domain: 'Term 1 Synthesis & Culminating Evaluation',
        topic: 'Persuasive Speech Delivery & Term Examination',
        competencyCode: 'EC11-SYN-T1-W5',
        contentStandard: 'The learner synthesizes foundational principles of speech delivery and ethics.',
        performanceStandard: 'The learner writes and delivers a polished persuasive speech addressing a local developmental issue.',
        learningCompetency: 'Writes and delivers a coherent, well-structured speech that integrates evidence, emotional appeal, and ethical reasoning.',
        enablingCompetencies: [
          'Constructs an outline following Monroe Motivated Sequence.',
          'Completes Term 1 Summative Assessment Examination.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Term Examination (20%) + Persuasive Speech Delivery (50%): Full term evaluation covering communication models and live delivery.',
        pedagogicalStrategies: ['Speech showcase', 'Peer review circles', 'Summative paper-and-pencil test'],
        materials: ['Term 1 TOS and Summative Examination Paper']
      },

      // Term 2
      {
        id: 'G11-EC-T2-W1',
        term: 2,
        week: 'Weeks 1–2',
        hours: 8,
        domain: 'Academic Reading & Discourse Structure',
        topic: 'Critical Reading across Disciplines & Text Structures',
        competencyCode: 'EC11-ARD-T2-W1',
        contentStandard: 'The learner understands the principles, tone, and conventions of academic texts across disciplines.',
        performanceStandard: 'The learner produces a comprehensive critical reading analysis of academic journal articles.',
        learningCompetency: 'Differentiates language used in academic texts from various disciplines, identifying text structure and thesis statements.',
        enablingCompetencies: [
          'Identifies the IMRaD format (Introduction, Methods, Results, Discussion).',
          'Extracts central arguments and supporting empirical evidence.'
        ],
        assessmentWeights: { writtenWork: 35, performanceTask: 45, termExam: 20 },
        sampleAssessment: 'Written Work (35%): Annotating and outlining an academic research article relevant to the learner’s track.',
        pedagogicalStrategies: ['Text dissection', 'Graphic organizer mapping', 'Socratic questioning'],
        materials: ['Scholarly article excerpts', 'Text structure taxonomy chart']
      },
      {
        id: 'G11-EC-T2-W2',
        term: 2,
        week: 'Weeks 3–4',
        hours: 8,
        domain: 'Academic Summarizing & Paraphrasing',
        topic: 'Synthesizing Academic Sources & Avoiding Plagiarism',
        competencyCode: 'EC11-ASP-T2-W2',
        contentStandard: 'The learner understands ethical citation standards (APA 7th edition) and paraphrasing techniques.',
        performanceStandard: 'The learner writes accurate, well-cited summaries synthesizing multiple scholarly viewpoints.',
        learningCompetency: 'Applies summarizing, paraphrasing, and direct quotation techniques without altering author intent or committing plagiarism.',
        enablingCompetencies: [
          'Uses in-text parenthetical citations correctly.',
          'Condenses complex scientific paragraphs into concise 2-sentence summaries.'
        ],
        assessmentWeights: { writtenWork: 35, performanceTask: 45, termExam: 20 },
        sampleAssessment: 'Written Work (35%): Synthesis matrix combining findings of 3 separate studies on regional renewable energy.',
        pedagogicalStrategies: ['Sentence transformation drills', 'Plagiarism audit workshop', 'Source matrix building'],
        materials: ['APA 7th Edition quick guide', 'Plagiarism detection checklist']
      },
      {
        id: 'G11-EC-T2-W3',
        term: 2,
        week: 'Weeks 5–6',
        hours: 8,
        domain: 'Critical Evaluation & Reviews',
        topic: 'Writing Academic Critiques & Literature Reviews',
        competencyCode: 'EC11-CER-T2-W3',
        contentStandard: 'The learner understands the criteria for evaluating scholarly literature and creative works.',
        performanceStandard: 'The learner composes a balanced, evidence-based critique evaluating methodology and validity.',
        learningCompetency: 'Writes an objective, balanced review or critique of an academic work, artistic creation, or technological system.',
        enablingCompetencies: [
          'Applies critical approaches (Formalism, Structuralism, Marxist, Feminist, Post-colonial).',
          'Identifies logical fallacies and empirical gaps in arguments.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Performance Task (50%): 800-word formal critique of a published Philippine environmental impact assessment.',
        pedagogicalStrategies: ['Peer-review dyads', 'Rubric breakdown', 'Guided draft revision'],
        materials: ['Sample published reviews', 'Critique evaluation rubric']
      },
      {
        id: 'G11-EC-T2-W4',
        term: 2,
        week: 'Weeks 7–8',
        hours: 8,
        domain: 'Concept Papers & Grant Proposals',
        topic: 'Drafting Academic and Development Concept Papers',
        competencyCode: 'EC11-CP-T2-W4',
        contentStandard: 'The learner understands the components of project and research concept papers.',
        performanceStandard: 'The learner formulates an actionable concept paper addressing a socio-economic or technical need.',
        learningCompetency: 'Determines the ways a writer can elucidate on a concept (definition, explication, clarification) and drafts a formal concept paper.',
        enablingCompetencies: [
          'Formulates clear project objectives and expected measurable outcomes.',
          'Estimates realistic resource requirements and operational timelines.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Performance Task (50%): 3-page Concept Paper for a community project (e.g., rainwater harvesting or digital literacy).',
        pedagogicalStrategies: ['Project-based inquiry', 'Pitch workshop', 'Scaffolded writing'],
        materials: ['DepEd Concept Paper template', 'Project rubric']
      },
      {
        id: 'G11-EC-T2-W5',
        term: 2,
        week: 'Weeks 9–10',
        hours: 8,
        domain: 'Term 2 Synthesis & Academic Defense',
        topic: 'Oral Presentation of Concept Papers & Term 2 Exam',
        competencyCode: 'EC11-SYN-T2-W5',
        contentStandard: 'The learner synthesizes academic writing and defense principles.',
        performanceStandard: 'The learner defends their academic concept paper before a mock panel.',
        learningCompetency: 'Presents and defends an academic concept paper using multimodal visual aids and responsive Q&A argumentation.',
        enablingCompetencies: [
          'Designs professional presentation slide decks adhering to visual contrast principles.',
          'Completes Term 2 Summative Examination.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Term Examination (20%) + Panel Defense (50%): Oral presentation and defense of concept paper before peer panel.',
        pedagogicalStrategies: ['Mock defense symposium', 'Panel rubrics', 'Summative exam'],
        materials: ['Slide projector', 'TOS and Term 2 examination papers']
      },

      // Term 3
      {
        id: 'G11-EC-T3-W1',
        term: 3,
        week: 'Weeks 1–2',
        hours: 8,
        domain: 'Workplace Correspondence',
        topic: 'Professional Letters, Memoranda, and Executive Notices',
        competencyCode: 'EC11-WC-T3-W1',
        contentStandard: 'The learner understands industry standards for formal corporate and institutional correspondence.',
        performanceStandard: 'The learner drafts standard business letters and official administrative memos.',
        learningCompetency: 'Writes clear, concise, and professional business correspondence (full-block letters, inter-office memos, formal email).',
        enablingCompetencies: [
          'Applies the 7 Cs of Business Communication (Clear, Concise, Concrete, Correct, Coherent, Complete, Courteous).',
          'Formats institutional letterheads, date, recipient address, and signature blocks.'
        ],
        assessmentWeights: { writtenWork: 35, performanceTask: 45, termExam: 20 },
        sampleAssessment: 'Written Work (35%): Drafting an official sponsorship request letter and internal compliance memo for Work Immersion.',
        pedagogicalStrategies: ['Authentic document analysis', 'Editing laboratory', 'Corporate simulation'],
        materials: ['Business letter templates', 'Corporate style guides']
      },
      {
        id: 'G11-EC-T3-W2',
        term: 3,
        week: 'Weeks 3–4',
        hours: 8,
        domain: 'Executive Reporting & Workplace Documentation',
        topic: 'Incident Reports, Meeting Minutes, and Progress Tracking',
        competencyCode: 'EC11-ERW-T3-W2',
        contentStandard: 'The learner understands objective documentation procedures in corporate and industrial environments.',
        performanceStandard: 'The learner records accurate meeting minutes and investigatory incident reports.',
        learningCompetency: 'Writes objective workplace documentation including factual incident reports, minutes of meeting, and periodic progress briefs.',
        enablingCompetencies: [
          'Separates verifiable factual observations from subjective opinions.',
          'Follows chronologically structured reporting formats.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Performance Task (50%): Transcribing a 10-minute audio simulation into official DepEd / Corporate Minutes of Meeting.',
        pedagogicalStrategies: ['Simulated staff meeting', 'Speed transcription drill', 'Peer audit'],
        materials: ['Audio conference recordings', 'Incident report forms']
      },
      {
        id: 'G11-EC-T3-W3',
        term: 3,
        week: 'Weeks 5–6',
        hours: 8,
        domain: 'Career Portfolios & Job Applications',
        topic: 'Curriculum Vitae, Resumes, and Cover Letters',
        competencyCode: 'EC11-CPJ-T3-W3',
        contentStandard: 'The learner understands modern talent acquisition standards and applicant tracking systems (ATS).',
        performanceStandard: 'The learner constructs an ATS-compliant resume and compelling cover letter tailored to a specific job vacancy.',
        learningCompetency: 'Develops a tailored professional resume, electronic career portfolio, and application letter aligned with regional labor requirements.',
        enablingCompetencies: [
          'Translates Senior High School academic and TechPro competencies into actionable skill statements.',
          'Formats clean, ATS-scannable digital documents.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Performance Task (50%): Complete Job Application Package (Cover Letter, Resume, and Digital Credential Portfolio).',
        pedagogicalStrategies: ['Resume clinic', 'ATS simulator analysis', 'One-on-one feedback'],
        materials: ['DepEd career guidelines', 'ATS resume formatting checklist']
      },
      {
        id: 'G11-EC-T3-W4',
        term: 3,
        week: 'Weeks 7–8',
        hours: 8,
        domain: 'Workplace Interviewing & Oral Demonstration',
        topic: 'Behavioral Interviews & Technical Demonstration',
        competencyCode: 'EC11-WID-T3-W4',
        contentStandard: 'The learner understands principles of structured behavioral interviews (STAR method).',
        performanceStandard: 'The learner demonstrates composure, professionalism, and articulation during job and immersion interviews.',
        learningCompetency: 'Performs proficiently in simulated job, scholarship, and immersion interviews, effectively applying the STAR response framework.',
        enablingCompetencies: [
          'Formulates responses using Situation, Task, Action, Result (STAR).',
          'Demonstrates professional posture, active listening, and appropriate follow-up questions.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Performance Task (50%): Mock Panel Job Interview scored by industry partners and faculty using a standard rubric.',
        pedagogicalStrategies: ['Mock interview panels', 'Video playback analysis', 'Stress interview handling drills'],
        materials: ['Interview questions bank', 'HR interview scoring rubric']
      },
      {
        id: 'G11-EC-T3-W5',
        term: 3,
        week: 'Weeks 9–10',
        hours: 8,
        domain: 'Term 3 Culminating Showcase & Final Examination',
        topic: 'Work Immersion Readiness Showcase & Term 3 Exam',
        competencyCode: 'EC11-SYN-T3-W5',
        contentStandard: 'The learner demonstrates comprehensive mastery of oral, academic, and professional communication.',
        performanceStandard: 'The learner delivers a culminating portfolio presentation validating readiness for Grade 12 Work Immersion.',
        learningCompetency: 'Synthesizes all communicative skills to present a career portfolio and successfully completes the Term 3 Summative Exam.',
        enablingCompetencies: [
          'Assembles all verified written works and performance tasks into a master portfolio.',
          'Completes Term 3 Final Trimester Examination.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Term 3 Examination (20%) + Master Career Portfolio Defense (50%): Culminating year-end evaluation.',
        pedagogicalStrategies: ['Portfolio exhibition', 'Summative exam', 'Reflective debriefing'],
        materials: ['Term 3 TOS and Final Examination papers', 'Portfolio assessment rubric']
      }
    ]
  },

  'General Mathematics': {
    subjectTitle: 'General Mathematics',
    subjectCode: 'SHS-MATH11',
    track: 'Both',
    hoursPerTerm: 40,
    totalAnnualHours: 120,
    policyIssuance: 'DepEd Order No. 015, s. 2026 (Strengthened SHS Curriculum)',
    description: 'Enriched mathematical modeling encompassing functions, progressive business mathematics (payroll, TRAIN law taxation, compounding), and symbolic propositional logic.',
    competencies: [
      // Term 1
      {
        id: 'G11-GM-T1-W1',
        term: 1,
        week: 'Weeks 1–2',
        hours: 8,
        domain: 'Functions & Piecewise Modeling',
        topic: 'Functions, Operations on Functions & Composition',
        competencyCode: 'GM11-FPM-T1-W1',
        contentStandard: 'The learner demonstrates understanding of key concepts of functions and operations on functions.',
        performanceStandard: 'The learner accurately constructs mathematical models representing real-life situations using piecewise functions.',
        learningCompetency: 'Represents real-life situations using functions, evaluates functions, and performs operations including function composition.',
        enablingCompetencies: [
          'Evaluates polynomial, rational, and piecewise functions at specific domain values.',
          'Formulates cost and revenue functions for Philippine micro-enterprises.'
        ],
        assessmentWeights: { writtenWork: 35, performanceTask: 45, termExam: 20 },
        sampleAssessment: 'Performance Task (45%): Modeling the progressive electricity or water consumption billing matrix in their local municipality.',
        pedagogicalStrategies: ['Guided problem-solving', 'Desmos graphing tool exploration', 'Real-world utility bill analysis'],
        materials: ['Graphing calculator / GeoGebra', 'Sample electric bill statements']
      },
      {
        id: 'G11-GM-T1-W2',
        term: 1,
        week: 'Weeks 3–4',
        hours: 8,
        domain: 'Rational Functions & Models',
        topic: 'Rational Equations, Inequalities, and Graphs',
        competencyCode: 'GM11-RFM-T1-W2',
        contentStandard: 'The learner understands rational functions, equations, inequalities, and their graphical behaviors.',
        performanceStandard: 'The learner solves real-world rate and mixture problems using rational functions.',
        learningCompetency: 'Solves rational equations and inequalities; determines intercepts, zeroes, and asymptotes of rational functions.',
        enablingCompetencies: [
          'Distinguishes rational expressions from rational equations.',
          'Calculates vertical and horizontal asymptotes accurately.'
        ],
        assessmentWeights: { writtenWork: 35, performanceTask: 45, termExam: 20 },
        sampleAssessment: 'Written Work (35%): 10-item seatwork solving rational inequalities and identifying domain restrictions.',
        pedagogicalStrategies: ['Number line sign analysis', 'Asymptote discovery lab', 'Algebraic modeling'],
        materials: ['Scientific calculators', 'Graph paper']
      },
      {
        id: 'G11-GM-T1-W3',
        term: 1,
        week: 'Weeks 5–6',
        hours: 8,
        domain: 'Inverse & One-to-One Functions',
        topic: 'Inverse Functions and Real-World Reversibility',
        competencyCode: 'GM11-IF-T1-W3',
        contentStandard: 'The learner understands one-to-one functions and the properties of inverse functions.',
        performanceStandard: 'The learner constructs inverse functions to solve reversible engineering and financial problems.',
        learningCompetency: 'Represents one-to-one functions, finds the inverse of a function, and verifies inverse relationships graphically.',
        enablingCompetencies: [
          'Applies the horizontal line test to determine injectivity.',
          'Verifies that (f o f^-1)(x) = x for all domain values.'
        ],
        assessmentWeights: { writtenWork: 35, performanceTask: 45, termExam: 20 },
        sampleAssessment: 'Written Work (35%): Finding inverse conversion formulas between foreign currencies and Celsius-Fahrenheit scales.',
        pedagogicalStrategies: ['Reflective graphing along y = x', 'Worked examples', 'Equation manipulation'],
        materials: ['Coordinate grid whiteboards', 'GeoGebra']
      },
      {
        id: 'G11-GM-T1-W4',
        term: 1,
        week: 'Weeks 7–8',
        hours: 8,
        domain: 'Exponential & Logarithmic Modeling',
        topic: 'Exponential Growth, Decay, and Logarithms',
        competencyCode: 'GM11-ELM-T1-W4',
        contentStandard: 'The learner understands exponential functions, equations, and logarithmic relations.',
        performanceStandard: 'The learner models biological population growth, viral spread, and radioactive half-life.',
        learningCompetency: 'Represents real-life situations using exponential functions; solves exponential equations and logarithmic problems.',
        enablingCompetencies: [
          'Applies y = a(b)^x to biological and demographic datasets.',
          'Converts between exponential and logarithmic forms.'
        ],
        assessmentWeights: { writtenWork: 35, performanceTask: 45, termExam: 20 },
        sampleAssessment: 'Performance Task (45%): Modeling population growth in Region X over a 20-year span using historical census data.',
        pedagogicalStrategies: ['Data fitting simulation', 'Logarithmic scale investigation (Richter scale, pH)', 'Problem-based learning'],
        materials: ['PSA Census datasets', 'Scientific calculators']
      },
      {
        id: 'G11-GM-T1-W5',
        term: 1,
        week: 'Weeks 9–10',
        hours: 8,
        domain: 'Term 1 Review & Trimester Examination',
        topic: 'Comprehensive Functions Synthesis & Term 1 Exam',
        competencyCode: 'GM11-SYN-T1-W5',
        contentStandard: 'The learner demonstrates synthesized proficiency across polynomial, rational, inverse, and exponential functions.',
        performanceStandard: 'The learner applies functional modeling to solve multi-step STEM and business problems.',
        learningCompetency: 'Synthesizes functional models to solve complex real-life challenges and completes Term 1 Summative Assessment.',
        enablingCompetencies: [
          'Executes problem-solving heuristics under timed conditions.',
          'Completes Term 1 Summative Examination.'
        ],
        assessmentWeights: { writtenWork: 35, performanceTask: 45, termExam: 20 },
        sampleAssessment: 'Term 1 Examination (20%): 40-item standard multiple-choice and constructed-response problem-solving test.',
        pedagogicalStrategies: ['Mock exam clinic', 'Error analysis review', 'Summative testing'],
        materials: ['Term 1 TOS and Test booklets']
      },

      // Term 2
      {
        id: 'G11-GM-T2-W1',
        term: 2,
        week: 'Weeks 1–2',
        hours: 8,
        domain: 'Business Mathematics & Financial Calculations',
        topic: 'Simple and Compound Interest & Maturity Values',
        competencyCode: 'GM11-BMF-T2-W1',
        contentStandard: 'The learner understands basic business mathematics concepts of simple and compound interest.',
        performanceStandard: 'The learner investigates and analyzes real-world investment scenarios to make wise financial choices.',
        learningCompetency: 'Illustrates simple and compound interest; computes interest, maturity value, and present value across compounding frequencies.',
        enablingCompetencies: [
          'Differentiates linear interest accumulation from exponential compounding.',
          'Solves for unknown variables: Principal (P), Rate (r), Time (t), or Maturity (F).'
        ],
        assessmentWeights: { writtenWork: 35, performanceTask: 45, termExam: 20 },
        sampleAssessment: 'Written Work (35%): Comparative calculation of ₱100,000 invested under simple vs compound interest over 10 years.',
        pedagogicalStrategies: ['Spreadsheet financial modeling', 'Case analysis', 'Comparative matrix'],
        materials: ['Financial interest tables', 'Excel / Google Sheets']
      },
      {
        id: 'G11-GM-T2-W2',
        term: 2,
        week: 'Weeks 3–4',
        hours: 8,
        domain: 'Annuities & Loan Amortization',
        topic: 'Simple and General Annuities & Sinking Funds',
        competencyCode: 'GM11-ALA-T2-W2',
        contentStandard: 'The learner understands simple and general annuities and amortization schedules.',
        performanceStandard: 'The learner formulates a fair debt payoff and housing mortgage amortization schedule.',
        learningCompetency: 'Calculates the future value, present value, and monthly payment of simple and general ordinary annuities.',
        enablingCompetencies: [
          'Constructs a 12-month loan amortization schedule showing principal and interest breakdown.',
          'Computes the cash value of installment purchases.'
        ],
        assessmentWeights: { writtenWork: 35, performanceTask: 45, termExam: 20 },
        sampleAssessment: 'Performance Task (45%): Creating a full Pag-IBIG housing loan amortization spreadsheet for a ₱1.5M socialized housing unit.',
        pedagogicalStrategies: ['Spreadsheet laboratory', 'Financial advisor role-play', 'Guided calculation'],
        materials: ['Pag-IBIG loan calculator reference', 'Laptop / mobile spreadsheet']
      },
      {
        id: 'G11-GM-T2-W3',
        term: 2,
        week: 'Weeks 5–6',
        hours: 8,
        domain: 'Applied Payroll & Progressive Taxation',
        topic: 'Philippine Payroll, Statutory Deductions, and TRAIN Law',
        competencyCode: 'GM11-PPT-T2-W3',
        contentStandard: 'The learner demonstrates understanding of real-life payroll systems and progressive personal income tax.',
        performanceStandard: 'The learner computes gross pay, statutory contributions, withholding tax, and net take-home pay.',
        learningCompetency: 'Calculates Philippine employee payroll including gross earnings, statutory contributions (SSS/GSIS, PhilHealth, Pag-IBIG), and withholding tax under TRAIN Law progressive brackets.',
        enablingCompetencies: [
          'Determines non-taxable de minimis benefits and overtime rates.',
          'Applies the Bureau of Internal Revenue (BIR) withholding tax table accurately.'
        ],
        assessmentWeights: { writtenWork: 35, performanceTask: 45, termExam: 20 },
        sampleAssessment: 'Performance Task (45%): Complete payroll register audit for a small business with 5 employees across various salary grades.',
        pedagogicalStrategies: ['Payslip audit clinic', 'Workplace accounting simulation', 'Error-spotting exercises'],
        materials: ['BIR Withholding Tax Tables', 'SSS/PhilHealth contribution matrix']
      },
      {
        id: 'G11-GM-T2-W4',
        term: 2,
        week: 'Weeks 7–8',
        hours: 8,
        domain: 'Investment Instruments & Financial Literacy',
        topic: 'Stocks, Bonds, Mutual Funds, and Consumer Loans',
        competencyCode: 'GM11-IIF-T2-W4',
        contentStandard: 'The learner understands the principles of equity instruments (stocks) and debt instruments (bonds).',
        performanceStandard: 'The learner evaluates investment portfolios to balance return against financial risk.',
        learningCompetency: 'Distinguishes between stocks and bonds; calculates dividend yields, bond coupon payments, and evaluates consumer loan terms.',
        enablingCompetencies: [
          'Interprets Philippine Stock Exchange (PSE) stock market quotes.',
          'Calculates the Effective Interest Rate (EIR) of motorcycle and gadget installment loans.'
        ],
        assessmentWeights: { writtenWork: 35, performanceTask: 45, termExam: 20 },
        sampleAssessment: 'Written Work (35%): Comparing the total financial cost of a 3-year motorcycle financing scheme vs cash payment.',
        pedagogicalStrategies: ['Virtual stock market tracking', 'Loan disclosure statement audit', 'Discussion'],
        materials: ['PSE Market reports', 'Truth in Lending disclosure copies']
      },
      {
        id: 'G11-GM-T2-W5',
        term: 2,
        week: 'Weeks 9–10',
        hours: 8,
        domain: 'Term 2 Review & Trimester Examination',
        topic: 'Comprehensive Business Math Synthesis & Term 2 Exam',
        competencyCode: 'GM11-SYN-T2-W5',
        contentStandard: 'The learner synthesizes personal financial literacy, progressive taxation, and investment mathematics.',
        performanceStandard: 'The learner produces a comprehensive 5-year personal financial blueprint.',
        learningCompetency: 'Demonstrates integrated mastery of financial computations and successfully completes the Term 2 Summative Examination.',
        enablingCompetencies: [
          'Integrates budgeting, compound interest, and loan amortization.',
          'Completes Term 2 Summative Examination.'
        ],
        assessmentWeights: { writtenWork: 35, performanceTask: 45, termExam: 20 },
        sampleAssessment: 'Term 2 Examination (20%): 40-item comprehensive business and payroll problem-solving examination.',
        pedagogicalStrategies: ['Financial blueprint presentation', 'Summative testing'],
        materials: ['Term 2 TOS and Test booklets']
      },

      // Term 3
      {
        id: 'G11-GM-T3-W1',
        term: 3,
        week: 'Weeks 1–2',
        hours: 8,
        domain: 'Mathematical Logic & Propositions',
        topic: 'Propositions, Negation, Conjunction, and Disjunction',
        competencyCode: 'GM11-MLP-T3-W1',
        contentStandard: 'The learner understands key concepts of propositional logic, truth values, and logical connectives.',
        performanceStandard: 'The learner symbolizes statements accurately to evaluate conversational and civic arguments.',
        learningCompetency: 'Illustrates and symbolizes simple and compound propositions; determines truth values using basic connectives (NOT, AND, OR).',
        enablingCompetencies: [
          'Distinguishes declarative statements from questions, commands, and paradoxes.',
          'Translates natural language sentences into symbolic notation.'
        ],
        assessmentWeights: { writtenWork: 35, performanceTask: 45, termExam: 20 },
        sampleAssessment: 'Written Work (35%): Translating 15 legal, advertising, and philosophical statements into symbolic propositional logic.',
        pedagogicalStrategies: ['Logic puzzle solving', 'Truth table builder drills', 'Riddle breakdowns'],
        materials: ['Truth table templates', 'Logic symbol flashcards']
      },
      {
        id: 'G11-GM-T3-W2',
        term: 3,
        week: 'Weeks 3–4',
        hours: 8,
        domain: 'Truth Tables & Conditional Logic',
        topic: 'Conditionals, Biconditionals, and Truth Tables',
        competencyCode: 'GM11-TTC-T3-W2',
        contentStandard: 'The learner understands conditional (if-then) and biconditional propositions.',
        performanceStandard: 'The learner constructs complete truth tables to determine logical equivalence, tautologies, and contradictions.',
        learningCompetency: 'Constructs complete truth tables for complex compound propositions, identifying tautologies, contradictions, and contingencies.',
        enablingCompetencies: [
          'Calculates truth values for conditional (p -> q) and biconditional (p <-> q).',
          'Proves De Morgan’s Laws using truth tables.'
        ],
        assessmentWeights: { writtenWork: 35, performanceTask: 45, termExam: 20 },
        sampleAssessment: 'Written Work (35%): Constructing full 8-row truth tables for 4 three-variable compound statements.',
        pedagogicalStrategies: ['Step-by-step table construction', 'Board work exercises', 'Peer verification'],
        materials: ['Logic grid worksheets']
      },
      {
        id: 'G11-GM-T3-W3',
        term: 3,
        week: 'Weeks 5–6',
        hours: 8,
        domain: 'Logical Equivalences & Contrapositives',
        topic: 'Converse, Inverse, Contrapositive, and Valid Arguments',
        competencyCode: 'GM11-LEC-T3-W3',
        contentStandard: 'The learner understands logical variations of conditional statements and valid forms of deductive inference.',
        performanceStandard: 'The learner determines the validity of real-world debates and legal clauses.',
        learningCompetency: 'Formulates the converse, inverse, and contrapositive of conditional statements; tests the validity of syllogistic arguments using rules of inference.',
        enablingCompetencies: [
          'Demonstrates that a conditional statement is logically equivalent to its contrapositive.',
          'Applies Modus Ponens, Modus Tollens, and Hypothetical Syllogism.'
        ],
        assessmentWeights: { writtenWork: 35, performanceTask: 45, termExam: 20 },
        sampleAssessment: 'Performance Task (45%): Logical audit of court case arguments or commercial advertisements identifying deductive validity.',
        pedagogicalStrategies: ['Moot court logic critique', 'Ad campaign analysis', 'Argument mapping'],
        materials: ['Philippine legal brief excerpts', 'Advertising video clips']
      },
      {
        id: 'G11-GM-T3-W4',
        term: 3,
        week: 'Weeks 7–8',
        hours: 8,
        domain: 'Fallacies & Informal Logic',
        topic: 'Spotting Logical Fallacies in Civic and Digital Discourse',
        competencyCode: 'GM11-FID-T3-W4',
        contentStandard: 'The learner understands common informal logical fallacies in media, politics, and daily discourse.',
        performanceStandard: 'The learner exposes deceptive logical fallacies in social media posts and electoral debates.',
        learningCompetency: 'Identifies and refutes common formal and informal fallacies (Ad Hominem, Straw Man, Slippery Slope, False Dilemma, Circular Reasoning).',
        enablingCompetencies: [
          'Differentiates deductive validity from inductive cogency.',
          'Constructs sound, fallacy-free counterarguments.'
        ],
        assessmentWeights: { writtenWork: 35, performanceTask: 45, termExam: 20 },
        sampleAssessment: 'Performance Task (45%): "Fact-Check Bulletin" analyzing 5 viral social media claims, charting logical fallacies and evidence gaps.',
        pedagogicalStrategies: ['Digital fact-checking lab', 'Debate dissection', 'Socratic seminar'],
        materials: ['Social media commentary archives', 'Fallacy taxonomy reference']
      },
      {
        id: 'G11-GM-T3-W5',
        term: 3,
        week: 'Weeks 9–10',
        hours: 8,
        domain: 'Term 3 Synthesis & Trimester Examination',
        topic: 'Comprehensive Mathematical Logic Synthesis & Term 3 Exam',
        competencyCode: 'GM11-SYN-T3-W5',
        contentStandard: 'The learner demonstrates comprehensive mastery of propositional logic, proof techniques, and critical reasoning.',
        performanceStandard: 'The learner applies rigorous logical proofs to solve complex decision-making problems.',
        learningCompetency: 'Applies mathematical logic to formal problem-solving and successfully completes the Term 3 Summative Examination.',
        enablingCompetencies: [
          'Executes truth-table and deductive proof methods under examination conditions.',
          'Completes Term 3 Summative Examination.'
        ],
        assessmentWeights: { writtenWork: 35, performanceTask: 45, termExam: 20 },
        sampleAssessment: 'Term 3 Examination (20%): 40-item comprehensive logic and problem-solving assessment.',
        pedagogicalStrategies: ['Logic olympiad review', 'Timed mock assessment', 'Summative examination'],
        materials: ['Term 3 TOS and Test booklets']
      }
    ]
  },

  'General Science': {
    subjectTitle: 'General Science',
    subjectCode: 'SHS-SCI11',
    track: 'Both',
    hoursPerTerm: 40,
    totalAnnualHours: 120,
    policyIssuance: 'DepEd Order No. 015, s. 2026 (Strengthened SHS Curriculum)',
    description: 'Integrated physical, earth, and biological science curriculum centering environmental stewardship, clean energy systems, plate tectonics in the Philippine trench, and classical kinematics.',
    competencies: [
      // Term 1
      {
        id: 'G11-GS-T1-W1',
        term: 1,
        week: 'Weeks 1–2',
        hours: 8,
        domain: 'Earth Systems & Biogeochemical Cycles',
        topic: 'Earth Subsystems, Carbon Cycle, and Ecological Equilibrium',
        competencyCode: 'GS11-ESB-T1-W1',
        contentStandard: 'The learner demonstrates understanding of Earth as a dynamic system composed of four interconnected subsystems.',
        performanceStandard: 'The learner models matter and energy transfers across the geosphere, hydrosphere, atmosphere, and biosphere.',
        learningCompetency: 'Describes the interactions between Earth subsystems and analyzes human disruption of biogeochemical cycles.',
        enablingCompetencies: [
          'Traces the flow of carbon, nitrogen, and water through terrestrial and aquatic biomes.',
          'Evaluates the role of ocean acidification on Philippine coral reef ecosystems.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Performance Task (50%): Building an enclosed desktop ecosphere demonstrating balanced nutrient cycling.',
        pedagogicalStrategies: ['System modeling lab', 'Ecosphere design challenge', 'Data inquiry'],
        materials: ['Ecological modeling jars', 'Water quality test kits']
      },
      {
        id: 'G11-GS-T1-W2',
        term: 1,
        week: 'Weeks 3–4',
        hours: 8,
        domain: 'Plate Tectonics & Philippine Geology',
        topic: 'Mantle Convection, Plate Boundaries, and the Philippine Archipelago',
        competencyCode: 'GS11-PTP-T1-W2',
        contentStandard: 'The learner understands internal heat transfer, mantle convection, and plate boundary dynamics.',
        performanceStandard: 'The learner maps regional seismic and volcanic hazard zones in Mindanao and the Philippine trench system.',
        learningCompetency: 'Explains how internal heat drives plate tectonics, subduction, and volcanism in the Philippine Mobile Belt.',
        enablingCompetencies: [
          'Differentiates convergent, divergent, and transform boundary mechanics.',
          'Maps active subduction trenches (Philippine Trench, Manila Trench).'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Written Work (30%): Diagrammatic explanation of magma generation via flux melting along the Philippine subduction zone.',
        pedagogicalStrategies: ['PHIVOLCS FaultFinder GIS workshop', 'Clay plate modeling', 'Case studies'],
        materials: ['PHIVOLCS Tectonic hazard maps', 'Clay / boundary models']
      },
      {
        id: 'G11-GS-T1-W3',
        term: 1,
        week: 'Weeks 5–6',
        hours: 8,
        domain: 'Volcanism & Seismology',
        topic: 'Volcanic Eruption Mechanics, Seismic Waves, and Epicenter Triangulation',
        competencyCode: 'GS11-VS-T1-W3',
        contentStandard: 'The learner understands magma viscosity, eruptive styles, and earthquake epicenter triangulation.',
        performanceStandard: 'The learner performs seismic wave analysis to locate earthquake epicenters and interpret seismograms.',
        learningCompetency: 'Relates magma composition to eruption hazards and calculates epicenter distance using P-S wave lag time.',
        enablingCompetencies: [
          'Calculates distance: d = (Td / 8s) * 100 km using seismogram data.',
          'Compares explosive plinian eruptions with effusive basaltic shield volcanism.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Performance Task (50%): Triangulating a simulated magnitude 6.8 earthquake epicenter using three recording stations in Mindanao.',
        pedagogicalStrategies: ['Triangulation lab', 'Seismogram reading exercises', 'Volcano classification'],
        materials: ['Compass and regional map worksheets', 'Seismogram prints']
      },
      {
        id: 'G11-GS-T1-W4',
        term: 1,
        week: 'Weeks 7–8',
        hours: 8,
        domain: 'Geohazards & Disaster Resilience',
        topic: 'Landslides, Sinkholes, Tsunamis, and Community DRRM',
        competencyCode: 'GS11-GDR-T1-W4',
        contentStandard: 'The learner understands geological hazard triggers (precipitation, seismic shaking, slope instability).',
        performanceStandard: 'The learner formulates a comprehensive Community Disaster Risk Reduction and Management Plan.',
        learningCompetency: 'Identifies geological hazards using hazard maps and designs actionable disaster risk mitigation strategies for the school and barangay.',
        enablingCompetencies: [
          'Interprets Mines and Geosciences Bureau (MGB) flood and landslide hazard maps.',
          'Formulates emergency evacuation protocols.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Performance Task (50%): Barangay DRRM hazard audit and family emergency disaster preparedness manual.',
        pedagogicalStrategies: ['Campus hazard walk', 'MGB GIS map interpretation', 'Emergency simulation'],
        materials: ['MGB Geohazard maps', 'DRRM rating rubric']
      },
      {
        id: 'G11-GS-T1-W5',
        term: 1,
        week: 'Weeks 9–10',
        hours: 8,
        domain: 'Term 1 Review & Trimester Examination',
        topic: 'Earth Systems Synthesis & Term 1 Exam',
        competencyCode: 'GS11-SYN-T1-W5',
        contentStandard: 'The learner synthesizes Earth science principles, tectonic processes, and geohazard mitigation.',
        performanceStandard: 'The learner presents a regional geological resilience portfolio.',
        learningCompetency: 'Demonstrates synthesized understanding of Earth systems and completes the Term 1 Trimester Examination.',
        enablingCompetencies: [
          'Synthesizes biogeochemical and plate boundary concepts under examination conditions.',
          'Completes Term 1 Summative Examination.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Term 1 Examination (20%): 40-item multiple choice and diagram analysis examination.',
        pedagogicalStrategies: ['Diagnostic review', 'Summative exam'],
        materials: ['Term 1 TOS and Test booklets']
      },

      // Term 2
      {
        id: 'G11-GS-T2-W1',
        term: 2,
        week: 'Weeks 1–2',
        hours: 8,
        domain: 'Atomic Structure & Quantum Models',
        topic: 'Electronic Configuration, Orbitals, and Periodic Trends',
        competencyCode: 'GS11-ASQ-T2-W1',
        contentStandard: 'The learner understands electronic structure, sublevels (spdf), and periodic trends.',
        performanceStandard: 'The learner predicts chemical behaviors and physical properties of elements based on periodic positioning.',
        learningCompetency: 'Relates electron configuration to atomic radius, ionization energy, electron affinity, and electronegativity.',
        enablingCompetencies: [
          'Writes electron configurations using the Aufbau principle, Hund’s rule, and Pauli exclusion principle.',
          'Explains effective nuclear charge (Zeff) and shielding effects.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Written Work (30%): Predicting chemical reactivity and bonding behavior of 5 unfamiliar elements using periodic trends.',
        pedagogicalStrategies: ['Flame test demonstration', 'Periodic trend graphing lab', 'Orbital diagramming'],
        materials: ['Spectroscopy glass / flame test chemicals', 'Periodic table wall chart']
      },
      {
        id: 'G11-GS-T2-W2',
        term: 2,
        week: 'Weeks 3–4',
        hours: 8,
        domain: 'Chemical Bonding & Molecular Geometry',
        topic: 'Ionic, Covalent, and Metallic Bonds & Lewis Structures',
        competencyCode: 'GS11-CBM-T2-W2',
        contentStandard: 'The learner understands ionic, covalent, and metallic bonding mechanisms.',
        performanceStandard: 'The learner constructs 3D molecular geometries using VSEPR theory.',
        learningCompetency: 'Draws Lewis electron dot structures, predicts molecular polarity, and explains physical properties using intermolecular forces.',
        enablingCompetencies: [
          'Applies the Octet Rule and determines formal charges.',
          'Differentiates London dispersion, dipole-dipole, and hydrogen bonding.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Performance Task (50%): Physical or digital modeling of 6 common molecular geometries explaining water anomalous properties.',
        pedagogicalStrategies: ['Molecular modeling kit workshop', 'Polarity testing lab (water vs oil vs alcohol)', 'Guided inquiry'],
        materials: ['Molecular model ball-and-stick sets', 'Solubility lab reagents']
      },
      {
        id: 'G11-GS-T2-W3',
        term: 2,
        week: 'Weeks 5–6',
        hours: 8,
        domain: 'Stoichiometry & Chemical Transformations',
        topic: 'Mole Concept, Reaction Balancing, and Limiting Reactants',
        competencyCode: 'GS11-SCT-T2-W3',
        contentStandard: 'The learner understands conservation of mass and quantitative mole relationships in chemical reactions.',
        performanceStandard: 'The learner calculates theoretical and percentage yields in industrial and agricultural chemical applications.',
        learningCompetency: 'Balances chemical equations and performs stoichiometric calculations to determine limiting reactants and percent yield.',
        enablingCompetencies: [
          'Converts between grams, moles, and particles using Avogadro’s number.',
          'Calculates fertilizer N-P-K nutrient application ratios.'
        ],
        assessmentWeights: { writtenWork: 35, performanceTask: 45, termExam: 20 },
        sampleAssessment: 'Written Work (35%): Stoichiometry seatwork solving for limiting reagent and excess reactant in baking soda and vinegar reaction.',
        pedagogicalStrategies: ['Kitchen stoichiometry experiment', 'Dimensional analysis drills', 'Peer correction'],
        materials: ['Electronic balance', 'Reagents (vinegar, sodium bicarbonate)']
      },
      {
        id: 'G11-GS-T2-W4',
        term: 2,
        week: 'Weeks 7–8',
        hours: 8,
        domain: 'Environmental Chemistry & Climate Mitigation',
        topic: 'Greenhouse Gases, Ocean Acidification, and Carbon Capture',
        competencyCode: 'GS11-ECC-T2-W4',
        contentStandard: 'The learner understands the chemistry of atmospheric greenhouse gases and ocean chemical buffering.',
        performanceStandard: 'The learner evaluates green chemical technologies and localized carbon sequestration initiatives.',
        learningCompetency: 'Explains chemical mechanisms of global warming and ocean acidification, proposing actionable green chemistry interventions.',
        enablingCompetencies: [
          'Writes chemical reactions showing CO2 dissolution in seawater and carbonic acid dissociation.',
          'Compares biological mangrove carbon storage with industrial carbon capture.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Performance Task (50%): Laboratory demonstration of ocean acidification using bromothymol blue indicator and seashell calcium dissolution.',
        pedagogicalStrategies: ['Ocean chemistry lab', 'Carbon footprint audit', 'Scientific debate'],
        materials: ['Bromothymol blue', 'Seashells / eggshells', 'Dilute acid / vinegar']
      },
      {
        id: 'G11-GS-T2-W5',
        term: 2,
        week: 'Weeks 9–10',
        hours: 8,
        domain: 'Term 2 Review & Trimester Examination',
        topic: 'Chemical Principles Synthesis & Term 2 Exam',
        competencyCode: 'GS11-SYN-T2-W5',
        contentStandard: 'The learner synthesizes atomic structure, chemical bonding, stoichiometry, and environmental chemistry.',
        performanceStandard: 'The learner presents a comprehensive chemical application portfolio.',
        learningCompetency: 'Demonstrates integrated mastery of chemical principles and successfully completes the Term 2 Summative Examination.',
        enablingCompetencies: [
          'Executes chemical problem-solving under timed conditions.',
          'Completes Term 2 Summative Examination.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Term 2 Examination (20%): 40-item comprehensive chemistry and stoichiometry examination.',
        pedagogicalStrategies: ['Exam review workshop', 'Summative testing'],
        materials: ['Term 2 TOS and Test booklets']
      },

      // Term 3
      {
        id: 'G11-GS-T3-W1',
        term: 3,
        week: 'Weeks 1–2',
        hours: 8,
        domain: 'Classical Mechanics: Kinematics',
        topic: 'Displacement, Velocity, and Uniformly Accelerated Motion (UAM)',
        competencyCode: 'GS11-CMK-T3-W1',
        contentStandard: 'The learner understands kinematic equations and vectors describing motion in one and two dimensions.',
        performanceStandard: 'The learner measures and analyzes real-world vehicle and athletic motion using motion sensors.',
        learningCompetency: 'Applies equations of uniformly accelerated motion to solve velocity, displacement, and free-fall problems.',
        enablingCompetencies: [
          'Differentiates scalar distance from vector displacement.',
          'Derives acceleration from position-time and velocity-time graphs.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Performance Task (50%): Motion tracking laboratory calculating gravitational acceleration (g = 9.8 m/s²) using video analysis.',
        pedagogicalStrategies: ['Tracker video analysis software lab', 'Ticker timer ticker tape lab', 'Formula derivations'],
        materials: ['Stopwatches', 'Ramps and rolling carts', 'Smartphone video cameras']
      },
      {
        id: 'G11-GS-T3-W2',
        term: 3,
        week: 'Weeks 3–4',
        hours: 8,
        domain: 'Dynamics: Newton’s Laws of Motion',
        topic: 'Force, Mass, Friction, and Free-Body Diagrams (FBD)',
        competencyCode: 'GS11-DNL-T3-W2',
        contentStandard: 'The learner understands Newton’s three laws of motion and friction forces.',
        performanceStandard: 'The learner builds engineering prototypes demonstrating force balance and impact mitigation.',
        learningCompetency: 'Constructs free-body diagrams and applies Newton’s second law (F = ma) to multi-force systems with friction.',
        enablingCompetencies: [
          'Calculates static and kinetic friction: f = mu * N.',
          'Solves inclined plane tension problems.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Written Work (30%): Drawing and solving free-body diagrams for a 50kg crate on a 30-degree inclined ramp.',
        pedagogicalStrategies: ['Spring balance friction measurement', 'Engineering egg drop design', 'FBD drills'],
        materials: ['Spring balances', 'Wood friction blocks', 'Incline planes']
      },
      {
        id: 'G11-GS-T3-W3',
        term: 3,
        week: 'Weeks 5–6',
        hours: 8,
        domain: 'Energy Transformations & Conservation',
        topic: 'Work, Kinetic and Potential Energy, and Conservation of Energy',
        competencyCode: 'GS11-ETC-T3-W3',
        contentStandard: 'The learner understands the work-energy theorem and the law of conservation of mechanical energy.',
        performanceStandard: 'The learner designs an energy-efficient roller coaster or mechanical energy transformation system.',
        learningCompetency: 'Quantifies work, kinetic energy (KE = 0.5mv²), and gravitational potential energy (PE = mgh), verifying mechanical energy conservation.',
        enablingCompetencies: [
          'Relates power (Watts) to work done per unit time.',
          'Calculates thermal dissipation due to non-conservative friction.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Performance Task (50%): Designing and testing a marble roller coaster demonstrating 100% loop completion through energy conservation.',
        pedagogicalStrategies: ['Maker design challenge', 'Roller coaster physics competition', 'Calculations'],
        materials: ['Foam pipe insulation track', 'Marbles', 'Stopwatches']
      },
      {
        id: 'G11-GS-T3-W4',
        term: 3,
        week: 'Weeks 7–8',
        hours: 8,
        domain: 'Renewable Energy Systems & Grid Integration',
        topic: 'Solar PV, Hydroelectric, Geothermal, and Biomass Energy',
        competencyCode: 'GS11-REG-T3-W4',
        contentStandard: 'The learner understands renewable energy technologies in the Philippine power matrix.',
        performanceStandard: 'The learner designs a schematic for a community-scale solar PV or micro-hydro clean energy installation.',
        learningCompetency: 'Evaluates efficiency, environmental impact, and grid integration of Philippine renewable energy sources (Solar, Geothermal, Hydro).',
        enablingCompetencies: [
          'Calculates solar panel capacity: Watt-peak requirements for an off-grid rural school.',
          'Explains turbine generators converting kinetic water flow into electromagnetic current.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Performance Task (50%): Complete solar PV installation blueprint and cost-benefit analysis for an off-grid classroom.',
        pedagogicalStrategies: ['Solar cell multimeter lab', 'Renewable site feasibility inquiry', 'Presentation'],
        materials: ['Miniature solar panels', 'Digital multimeters', 'Solar irradiance data']
      },
      {
        id: 'G11-GS-T3-W5',
        term: 3,
        week: 'Weeks 9–10',
        hours: 8,
        domain: 'Term 3 Culminating Showcase & Final Examination',
        topic: 'Integrated Science Portfolio Showcase & Term 3 Exam',
        competencyCode: 'GS11-SYN-T3-W5',
        contentStandard: 'The learner synthesizes Earth science, chemistry, physics, and sustainable clean energy.',
        performanceStandard: 'The learner presents an integrated science innovation prototype.',
        learningCompetency: 'Synthesizes foundational scientific competencies and successfully completes the Term 3 Summative Examination.',
        enablingCompetencies: [
          'Presents a culminating STEM innovation prototype.',
          'Completes Term 3 Final Summative Examination.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Term 3 Examination (20%) + Prototype Exhibition (50%): Culminating year-end scientific defense.',
        pedagogicalStrategies: ['Science fair exhibition', 'Peer judging', 'Summative testing'],
        materials: ['Term 3 TOS and Test booklets', 'Innovation judging rubrics']
      }
    ]
  },

  'Life and Career Skills': {
    subjectTitle: 'Life and Career Skills',
    subjectCode: 'SHS-LCS11',
    track: 'Both',
    hoursPerTerm: 40,
    totalAnnualHours: 120,
    policyIssuance: 'DepEd Order No. 015, s. 2026 (Strengthened SHS Curriculum)',
    description: 'A 21st-century foundational prescribed subject building self-awareness, emotional resilience, career pathway mapping, Philippine labor market navigation, and practical personal finance.',
    competencies: [
      // Term 1
      {
        id: 'G11-LCS-T1-W1',
        term: 1,
        week: 'Weeks 1–2',
        hours: 8,
        domain: 'Self-Awareness & Emotional Intelligence',
        topic: 'Identity, Daniel Goleman EQ Framework, and Personal Values',
        competencyCode: 'LCS11-SAE-T1-W1',
        contentStandard: 'The learner understands personal identity, foundational values, emotional triggers, and self-regulation.',
        performanceStandard: 'The learner creates a comprehensive personal development roadmap aligning values with career ambitions.',
        learningCompetency: 'Analyzes personal strengths, growth areas, and emotional intelligence competencies (Goleman framework) to guide life choices.',
        enablingCompetencies: [
          'Performs a comprehensive Personal SWOT Analysis.',
          'Identifies personal emotional triggers and applies calming mindfulness techniques.'
        ],
        assessmentWeights: { writtenWork: 25, performanceTask: 55, termExam: 20 },
        sampleAssessment: 'Performance Task (55%): Personal SWOT Portfolio accompanied by an Emotional Regulation Action Plan.',
        pedagogicalStrategies: ['Johari Window reflection', 'Guided self-assessment', 'Values clarification auction'],
        materials: ['Goleman EQ inventory', 'Personal SWOT templates']
      },
      {
        id: 'G11-LCS-T1-W2',
        term: 1,
        week: 'Weeks 3–4',
        hours: 8,
        domain: 'Growth Mindset & Mental Wellness',
        topic: 'Neuroplasticity, Growth Mindset, and Stress Coping Mechanisms',
        competencyCode: 'LCS11-GMM-T1-W2',
        contentStandard: 'The learner understands growth vs fixed mindset principles and mental wellness strategies.',
        performanceStandard: 'The learner applies stress resilience techniques during high-pressure academic and personal situations.',
        learningCompetency: 'Demonstrates a growth mindset when facing setbacks and applies evidence-based mental wellness coping strategies.',
        enablingCompetencies: [
          'Differentiates constructive failure from defeat.',
          'Creates a personal mental health first-aid toolkit.'
        ],
        assessmentWeights: { writtenWork: 25, performanceTask: 55, termExam: 20 },
        sampleAssessment: 'Written Work (25%): Reflective case study analysis transforming 3 personal academic failures into actionable growth milestones.',
        pedagogicalStrategies: ['Mindset reframing drills', 'Mental health journaling', 'Peer support circles'],
        materials: ['Dweck Mindset scale', 'Mental health crisis hotlines directory']
      },
      {
        id: 'G11-LCS-T1-W3',
        term: 1,
        week: 'Weeks 5–6',
        hours: 8,
        domain: 'Interpersonal Dynamics & Collaboration',
        topic: 'Active Listening, Non-Violent Communication, and Team Dynamics',
        competencyCode: 'LCS11-IDC-T1-W3',
        contentStandard: 'The learner understands principles of non-violent communication and team collaboration stages (Tuckman model).',
        performanceStandard: 'The learner navigates interpersonal team conflicts constructively.',
        learningCompetency: 'Deploys active listening and non-violent communication to mediate conflict and foster high-performing collaborative teams.',
        enablingCompetencies: [
          'Identifies four steps of Non-Violent Communication: Observation, Feeling, Need, Request.',
          'Applies Tuckman stages: Forming, Storming, Norming, Performing.'
        ],
        assessmentWeights: { writtenWork: 25, performanceTask: 55, termExam: 20 },
        sampleAssessment: 'Performance Task (55%): Mediated conflict resolution role-play resolving an equity dispute in a Senior High group project.',
        pedagogicalStrategies: ['Fishbowl mediation', 'Team dynamic simulations', 'Feedback protocols'],
        materials: ['NVC dialogue worksheets', 'Teamwork rubric']
      },
      {
        id: 'G11-LCS-T1-W4',
        term: 1,
        week: 'Weeks 7–8',
        hours: 8,
        domain: 'Digital Citizenship & Ethical Conduct',
        topic: 'Cybersecurity, Digital Footprint, and Online Ethics',
        competencyCode: 'LCS11-DCE-T1-W4',
        contentStandard: 'The learner understands the permanency of digital footprints and Philippine Cybercrime Prevention legislation (RA 10175).',
        performanceStandard: 'The learner conducts a personal digital footprint audit and establishes a professional online presence.',
        learningCompetency: 'Practices responsible digital citizenship, identifies cyber threats, and curates an ethical, professional digital persona.',
        enablingCompetencies: [
          'Audits social media accounts for privacy and reputational risks.',
          'Identifies phishing, identity theft, and fake news propagation mechanisms.'
        ],
        assessmentWeights: { writtenWork: 25, performanceTask: 55, termExam: 20 },
        sampleAssessment: 'Performance Task (55%): Professional LinkedIn / Digital Portfolio setup adhering to strict privacy and professional ethics.',
        pedagogicalStrategies: ['Digital footprint audit', 'Cybersecurity simulation', 'Social media policy drafting'],
        materials: ['RA 10175 summary', 'Digital privacy audit checklist']
      },
      {
        id: 'G11-LCS-T1-W5',
        term: 1,
        week: 'Weeks 9–10',
        hours: 8,
        domain: 'Term 1 Review & Trimester Examination',
        topic: 'Personal Leadership Roadmap & Term 1 Exam',
        competencyCode: 'LCS11-SYN-T1-W5',
        contentStandard: 'The learner synthesizes personal self-awareness, emotional resilience, and collaboration competencies.',
        performanceStandard: 'The learner presents an individual Personal Leadership Roadmap.',
        learningCompetency: 'Synthesizes personal development competencies to chart a leadership roadmap and completes the Term 1 Exam.',
        enablingCompetencies: [
          'Integrates SWOT, EQ, and values into a cohesive manifesto.',
          'Completes Term 1 Summative Examination.'
        ],
        assessmentWeights: { writtenWork: 25, performanceTask: 55, termExam: 20 },
        sampleAssessment: 'Term 1 Examination (20%) + Leadership Roadmap Portfolio (55%): Comprehensive first-trimester assessment.',
        pedagogicalStrategies: ['Portfolio exhibition', 'Summative testing'],
        materials: ['Term 1 TOS and Test booklets']
      },

      // Term 2
      {
        id: 'G11-LCS-T2-W1',
        term: 2,
        week: 'Weeks 1–2',
        hours: 8,
        domain: 'Labor Market Intelligence & Career Pathways',
        topic: 'Philippine Labor Market Trends & DOLE In-Demand Industries',
        competencyCode: 'LCS11-LMI-T2-W1',
        contentStandard: 'The learner understands macroeconomic labor dynamics in the Philippines and Northern Mindanao.',
        performanceStandard: 'The learner formulates a career trajectory aligned with validated market demands.',
        learningCompetency: 'Analyzes DOLE, TESDA, and PSA labor market occupational forecasts to identify high-growth industries and career pathways.',
        enablingCompetencies: [
          'Compares employment demand across Agri-Tech, IT-BPM, Construction, Tourism, and Green Economy.',
          'Identifies entry-level educational credentials (NC II vs Associate Degree vs Baccalaureate).'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Written Work (30%): Comparative labor market report mapping top 3 local career options in Northern Mindanao.',
        pedagogicalStrategies: ['DOLE JobsFit report analysis', 'Career market mapping', 'Guest speaker forum'],
        materials: ['DOLE JobsFit 2026 Reports', 'TESDA priority occupations list']
      },
      {
        id: 'G11-LCS-T2-W2',
        term: 2,
        week: 'Weeks 3–4',
        hours: 8,
        domain: 'Fourth Industrial Revolution (4IR) & AI Readiness',
        topic: 'Automation, Artificial Intelligence, and Transferable Skills',
        competencyCode: 'LCS11-AIR-T2-W2',
        contentStandard: 'The learner understands how automation and generative AI reshape professional occupations.',
        performanceStandard: 'The learner develops human-centric skills that complement automated tools.',
        learningCompetency: 'Evaluates the impact of 4IR technologies and identifies human-centered soft skills (critical inquiry, empathy, creative problem-solving).',
        enablingCompetencies: [
          'Uses AI tools ethically as an augmentative research partner without plagiarism.',
          'Identifies vulnerable routine tasks vs resilient cognitive-emotional skills.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Performance Task (50%): Comparative inquiry analyzing how AI transforms a selected profession and how professionals must adapt.',
        pedagogicalStrategies: ['AI tool experimentation', 'Ethical case debate', 'Skills matrix design'],
        materials: ['World Economic Forum Future of Jobs Report 2026']
      },
      {
        id: 'G11-LCS-T2-W3',
        term: 2,
        week: 'Weeks 5–6',
        hours: 8,
        domain: 'Labor Rights, Safety & Philippine Labor Code',
        topic: 'Labor Standards, DOLE Regulations, and Workplace Safety',
        competencyCode: 'LCS11-LRS-T2-W3',
        contentStandard: 'The learner understands fundamental employee rights under the Philippine Labor Code and OSH Law (RA 11058).',
        performanceStandard: 'The learner identifies workplace labor violations and advocates for safe working environments.',
        learningCompetency: 'Explains employee statutory rights (minimum wage, overtime pay, 13th-month pay, leaves) and Occupational Safety and Health standards.',
        enablingCompetencies: [
          'Calculates statutory holiday and overtime wage premiums.',
          'Identifies mandatory personal protective equipment (PPE) in technical trades.'
        ],
        assessmentWeights: { writtenWork: 30, performanceTask: 50, termExam: 20 },
        sampleAssessment: 'Written Work (30%): Labor rights case analysis evaluating an employment contract for statutory compliance.',
        pedagogicalStrategies: ['Employment contract critique', 'OSH hazard simulation', 'Legal rights Q&A'],
        materials: ['Philippine Labor Code summary', 'DOLE Handbook on Workers’ Statutory Benefits']
      },
      {
        id: 'G11-LCS-T2-W4',
        term: 2,
        week: 'Weeks 7–8',
        hours: 8,
        domain: 'Career Mapping & Track Immersion Preparation',
        topic: 'Senior High Track Specialization & Immersion Matching',
        competencyCode: 'LCS11-CMT-T2-W4',
        contentStandard: 'The learner understands the requirements and partner industry competencies for Grade 12 Work Immersion.',
        performanceStandard: 'The learner secures a preliminary immersion placement profile matched to their competencies.',
        learningCompetency: 'Develops a personal career portfolio and Action Plan aligning Senior High School electives with industry partners.',
        enablingCompetencies: [
          'Maps acquired technical competencies against industry internship descriptions.',
          'Drafts letters of intent for work immersion placements.'
        ],
        assessmentWeights: { writtenWork: 25, performanceTask: 55, termExam: 20 },
        sampleAssessment: 'Performance Task (55%): Comprehensive Work Immersion Action Plan with verified partner industry profile.',
        pedagogicalStrategies: ['Industry partner matchmaking', 'Portfolio clinic', 'Mentorship circles'],
        materials: ['DepEd Work Immersion Guidelines (DO 30, s. 2017 / DO 15, s. 2026)', 'Internship agreement templates']
      },
      {
        id: 'G11-LCS-T2-W5',
        term: 2,
        week: 'Weeks 9–10',
        hours: 8,
        domain: 'Term 2 Review & Trimester Examination',
        topic: 'Career Trajectory Defense & Term 2 Exam',
        competencyCode: 'LCS11-SYN-T2-W5',
        contentStandard: 'The learner demonstrates comprehensive understanding of labor trends, rights, and career action plans.',
        performanceStandard: 'The learner defends their career trajectory before a career guidance panel.',
        learningCompetency: 'Defends personal career and immersion readiness plan and completes the Term 2 Summative Examination.',
        enablingCompetencies: [
          'Delivers an articulate oral defense of career choices.',
          'Completes Term 2 Summative Examination.'
        ],
        assessmentWeights: { writtenWork: 25, performanceTask: 55, termExam: 20 },
        sampleAssessment: 'Term 2 Examination (20%) + Career Defense (55%): Trimester assessment.',
        pedagogicalStrategies: ['Career defense symposium', 'Summative testing'],
        materials: ['Term 2 TOS and Test booklets']
      },

      // Term 3
      {
        id: 'G11-LCS-T3-W1',
        term: 3,
        week: 'Weeks 1–2',
        hours: 8,
        domain: 'Financial Literacy: Cash Flow & Budgeting',
        topic: 'The 50/30/20 Budgeting Rule & Personal Cash Flow',
        competencyCode: 'LCS11-FLC-T3-W1',
        contentStandard: 'The learner understands principles of cash-flow tracking, budget discipline, and spending priorities.',
        performanceStandard: 'The learner maintains an authentic personal monthly cash-flow ledger.',
        learningCompetency: 'Constructs a personal budget using the 50/30/20 rule (Needs, Wants, Savings), differentiating essential from discretionary expenses.',
        enablingCompetencies: [
          'Tracks daily expenditures using mobile or paper cash ledgers.',
          'Analyzes personal spending leaks and devises conservation strategies.'
        ],
        assessmentWeights: { writtenWork: 25, performanceTask: 55, termExam: 20 },
        sampleAssessment: 'Performance Task (55%): 30-day personal expense tracking journal and adjusted 50/30/20 budget blueprint.',
        pedagogicalStrategies: ['Daily tracking exercise', 'Budgeting spreadsheet modeling', 'Needs vs Wants game'],
        materials: ['Budgeting ledger sheets', 'Mobile financial apps']
      },
      {
        id: 'G11-LCS-T3-W2',
        term: 3,
        week: 'Weeks 3–4',
        hours: 8,
        domain: 'Banking, Emergency Funds & Savings Systems',
        topic: 'Formal Banking, PDIC Protection, and Cooperatives',
        competencyCode: 'LCS11-BES-T3-W2',
        contentStandard: 'The learner understands formal financial institutions (commercial banks, rural banks, cooperatives, PDIC).',
        performanceStandard: 'The learner establishes an emergency fund plan covering 3–6 months of living expenses.',
        learningCompetency: 'Compares formal savings instruments, understands PDIC deposit insurance protection (₱1,000,000 ceiling), and calculates emergency fund targets.',
        enablingCompetencies: [
          'Calculates emergency fund requirements: Baseline Monthly Needs * 3 to 6 months.',
          'Compares savings account interest rates vs cooperative dividend rates.'
        ],
        assessmentWeights: { writtenWork: 25, performanceTask: 55, termExam: 20 },
        sampleAssessment: 'Written Work (25%): Comparative research matrix evaluating 3 local banks and 2 community cooperatives in Region X.',
        pedagogicalStrategies: ['Bank field inquiry / online audit', 'Emergency fund calculation workshop'],
        materials: ['PDIC informational brochures', 'Bank account opening requirements list']
      },
      {
        id: 'G11-LCS-T3-W3',
        term: 3,
        week: 'Weeks 5–6',
        hours: 8,
        domain: 'Debt Management & Consumer Protection',
        topic: 'Credit Discipline, Avoiding Predatory Scams, and SEC Warnings',
        competencyCode: 'LCS11-DMC-T3-W3',
        contentStandard: 'The learner understands healthy credit vs predatory debt traps (5-6 schemes, unregulated online lending apps).',
        performanceStandard: 'The learner evaluates loan contracts and spots deceptive investment scams (Ponzi schemes).',
        learningCompetency: 'Applies consumer debt avoidance strategies, evaluates borrowing contracts, and detects financial fraud and pyramid schemes using SEC advisories.',
        enablingCompetencies: [
          'Identifies the red flags of Ponzi / pyramiding schemes (guaranteed high return with zero risk).',
          'Calculates the compounding cost of unpaid credit card / mobile loan balances.'
        ],
        assessmentWeights: { writtenWork: 25, performanceTask: 55, termExam: 20 },
        sampleAssessment: 'Performance Task (55%): Financial scam investigative case report analyzing an actual SEC cease-and-desist advisory.',
        pedagogicalStrategies: ['Scam breakdown case study', 'SEC advisory investigation', 'Role-play debt negotiation'],
        materials: ['SEC Enforcement advisories', 'BSP consumer protection guides']
      },
      {
        id: 'G11-LCS-T3-W4',
        term: 3,
        week: 'Weeks 7–8',
        hours: 8,
        domain: 'Micro-Entrepreneurship & Community Enterprise',
        topic: 'Business Model Canvas (BMC) & Feasibility for Youth',
        competencyCode: 'LCS11-MEC-T3-W4',
        contentStandard: 'The learner understands micro-enterprise planning and the 9 building blocks of the Business Model Canvas.',
        performanceStandard: 'The learner formulates a viable micro-business plan addressing a local community need.',
        learningCompetency: 'Develops a Business Model Canvas for a sustainable micro-enterprise or freelance service venture in their locality.',
        enablingCompetencies: [
          'Identifies target customer segments and unique value propositions.',
          'Calculates break-even point: Fixed Costs / (Selling Price - Variable Cost).'
        ],
        assessmentWeights: { writtenWork: 25, performanceTask: 55, termExam: 20 },
        sampleAssessment: 'Performance Task (55%): 1-Page Business Model Canvas (BMC) and 2-minute elevator pitch for a youth-led community venture.',
        pedagogicalStrategies: ['Business model workshop', 'Elevator pitch practice', 'Break-even math drills'],
        materials: ['Business Model Canvas poster template', 'Entrepreneurship scoring rubric']
      },
      {
        id: 'G11-LCS-T3-W5',
        term: 3,
        week: 'Weeks 9–10',
        hours: 8,
        domain: 'Term 3 Culminating Showcase & Final Examination',
        topic: 'Master Life and Career Portfolio Showcase & Term 3 Exam',
        competencyCode: 'LCS11-SYN-T3-W5',
        contentStandard: 'The learner synthesizes self-awareness, career intelligence, financial literacy, and entrepreneurship.',
        performanceStandard: 'The learner presents a comprehensive Master Life and Career Transition Portfolio.',
        learningCompetency: 'Defends the Master Life and Career Portfolio demonstrating readiness for Grade 12 transition and completes Term 3 Exam.',
        enablingCompetencies: [
          'Assembles all verified artifacts (SWOT, Career Plan, Budget, BMC).',
          'Completes Term 3 Final Summative Examination.'
        ],
        assessmentWeights: { writtenWork: 25, performanceTask: 55, termExam: 20 },
        sampleAssessment: 'Term 3 Examination (20%) + Master Portfolio Exhibition (55%): Final year-end assessment.',
        pedagogicalStrategies: ['Portfolio gallery walk', 'Self-reflection panel', 'Summative testing'],
        materials: ['Term 3 TOS and Test booklets', 'Portfolio rubric']
      }
    ]
  }
};
