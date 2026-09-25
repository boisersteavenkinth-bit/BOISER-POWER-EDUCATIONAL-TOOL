import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Printer,
  Download,
  Copy,
  Check,
  FileCode,
  ExternalLink,
  BookOpen,
  Layers,
  Upload,
  RotateCcw,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  FileDown,
  Loader2,
  ShieldCheck,
  Presentation,
  Wand2,
  AlertTriangle,
  AlertCircle,
  XCircle,
  Focus,
  Zap,
  ShieldAlert,
  ListChecks,
  Info,
  Pencil
} from 'lucide-react';
import { exportDepEdRegionXPDF, exportBatchDepEdRegionXPDF, exportDO3ILAWToPdf, DepEdILAWExportData, PDFExportMode } from '../utils/depedPdfExporter';
import { DO3ILAWView } from './DO3ILAWView';
import { OFFICIAL_DO3_ILAW_EXEMPLAR } from '../data/ilawDO3Exemplar';
import { ILAWCompletePlan } from '../types/ilawDO3';
import { exportDO3ILAWToDocx } from '../utils/depedDocxExporter';
import { exportDO3ILAWToPptx } from '../utils/depedPptxExporter';
import { pushILAWDocxToGoogleDrive, BOISER_LESSONS_FOLDER_NAME } from '../services/ilawDriveSyncService';

import { computeDate, DEPED_2026_CALENDAR_CONFIG } from '../data/calendarConfig';
import {
  ILAW_BOW_DATABASE,
  ILAWBOWEntry,
  getDistinctGrades,
  getSubjectsForGrade,
  getTermsForSubject,
  getEntriesForTerm
} from '../data/ilawBOWDatabase';
import { generateDO3PlanFromBOWEntry } from '../utils/ilawPlanBuilder';
import { MyGeneratedILAWView } from './MyGeneratedILAWView';
import { FourDayCombinedILAWView } from './FourDayCombinedILAWView';
import { ValidationDashboard, ValidationCheck } from './ValidationDashboard';

interface BOWEntry {
  week: string;
  topic: string;
  code: string;
  contentStandard: string;
  performanceStandard: string;
  learningCompetency: string;
  enablingCompetencies: string;
  s1: string;
  s2: string;
  s3: string;
  s4: string;
  lasBg?: string;
  lasA1?: string;
  lasA2?: string;
  lasA3?: string;
}

type TermBOWMap = Record<string, BOWEntry[]>; // '1' | '2' | '3'
type SubjectBOWMap = Record<string, TermBOWMap>;

const GRADE_11_DEFAULT_BOW: SubjectBOWMap = {
  "Effective Communication": {
    "1": [
      {
        week: "Weeks 1–2",
        topic: "Nature, Process, and Models of Human Communication",
        code: "SHS-EC-T1-W1",
        contentStandard: "The learner understands the nature, elements, and dynamics of verbal and non-verbal human communication across diverse cultural and social settings.",
        performanceStandard: "The learner designs and performs an effective, culturally sensitive oral communication exemplar illustrating fundamental communication models.",
        learningCompetency: "Explains the functions, nature, and process of communication using established models (Shannon-Weaver, Schramm, Berlo SMCR).",
        enablingCompetencies: "1. Distinguishes verbal from non-verbal cues. 2. Identifies communication breakdowns and applies remediation strategies.",
        s1: "Elicit: Telephone game icebreaker exposing message distortion. Engage: Video case analysis of intercultural communication breakdowns in corporate settings.",
        s2: "Explore: Small group diagramming of Shannon-Weaver vs. Schramm models. Explain: Interactive lecture on noise barriers and feedback loops.",
        s3: "Elaborate: Role-play simulation resolving workplace miscommunication in a simulated BPO / front-office scenario.",
        s4: "Evaluate: Formative rubric assessment of role-play simulation and 10-item conceptual quiz on communication models.",
        lasBg: "Communication is a dynamic two-way process of exchanging information, thoughts, and emotions through shared systems of symbols and behavior.",
        lasA1: "Create a comparative Venn diagram contrasting the linear Shannon-Weaver model with the transactional Schramm interactive model.",
        lasA2: "Analyze three real-life classroom or online communication breakdowns. Propose a concrete communicative repair strategy for each.",
        lasA3: "Record or present a 2-minute video commentary demonstrating appropriate non-verbal gestures in formal Philippine workplace settings."
      },
      {
        week: "Weeks 3–4",
        topic: "Intercultural Communication & Communicative Competence",
        code: "SHS-EC-T1-W2",
        contentStandard: "The learner demonstrates communicative competence by recognizing barriers in intercultural communication.",
        performanceStandard: "The learner participates productively in diverse intercultural collaborative dialogues.",
        learningCompetency: "Demonstrates sensitivity to socio-cultural dimensions of communication (gender, religion, culture, social status).",
        enablingCompetencies: "1. Evaluates bias and ethnocentrism in dialogues. 2. Applies polite register in multicultural settings.",
        s1: "Elicit: World etiquette cultural quiz. Engage: Discussion on high-context vs low-context Philippine regional cultures.",
        s2: "Explore: Case study of multinational company email exchanges. Explain: Hofstede's cultural dimensions in everyday communication.",
        s3: "Elaborate: Scriptwriting of an inclusive intercultural dialogue among Mindanao, Visayas, and Luzon youth leaders.",
        s4: "Evaluate: Peer assessment of intercultural dialogue scripts using an inclusiveness rubric.",
        lasBg: "Intercultural communication happens when participants from differing cultural backgrounds negotiate shared meaning respectfully.",
        lasA1: "Identify 5 cultural communication differences between high-context and low-context societies.",
        lasA2: "Rewrite 3 culturally insensitive customer service responses into empathetic, inclusive statements.",
        lasA3: "Draft a Code of Intercultural Conduct for your Senior High School classroom."
      },
      {
        week: "Weeks 5–6",
        topic: "Types of Communicative Strategies in Discourse",
        code: "SHS-EC-T1-W3",
        contentStandard: "The learner understands how communicative strategies manage topic and interaction flow.",
        performanceStandard: "The learner skillfully deploys communicative strategies in informal and formal panel discussions.",
        learningCompetency: "Engages in collaborative communicative situations using appropriate communicative strategies (Nomination, Restriction, Turn-taking, Topic Control, Topic Shifting, Repair, Termination).",
        enablingCompetencies: "1. Identifies seven types of communicative strategies. 2. Prevents topic hijacking.",
        s1: "Elicit: Fishbowl discussion without speaking rules to observe chaos. Engage: Establish necessity of conversational protocol.",
        s2: "Explore: Video analysis of Senate committee hearings highlighting Turn-taking and Repair. Explain: 7 communicative strategies defined.",
        s3: "Elaborate: Mock legislative or barangay council debate with assigned communicative strategy cards.",
        s4: "Evaluate: Checklist scoring of strategy card utilization during the live mock debate.",
        lasBg: "Communicative strategies are planned methods used by speakers to overcome communication barriers and govern conversation flow.",
        lasA1: "Classify 10 dialogue excerpts into Nomination, Restriction, Turn-taking, Topic Control, Topic Shifting, Repair, or Termination.",
        lasA2: "Write a short script showing how a chairperson can use 'Repair' and 'Topic Shifting' to resolve an argument.",
        lasA3: "Participate in a 3-minute impromptu round-table discussion using at least 4 assigned strategies."
      }
    ],
    "2": [
      {
        week: "Weeks 1–2",
        topic: "Critical Reading & Academic Text Structures",
        code: "SHS-EC-T2-W1",
        contentStandard: "The learner understands the principles and text structures of academic writing.",
        performanceStandard: "The learner produces a comprehensive critique of an academic journal article.",
        learningCompetency: "Differentiates language used in academic texts from various disciplines (EAPP).",
        enablingCompetencies: "1. Identifies IMRaD format. 2. Locates thesis statements and topic sentences.",
        s1: "Elicit: Compare social media post vs scientific journal abstract. Engage: Vocabulary audit of academic tone.",
        s2: "Explore: Highlighting text structures in research papers. Explain: Academic objectivity and nominalization.",
        s3: "Elaborate: Annotating an academic paper relevant to student's track (TechPro vs Academic).",
        s4: "Evaluate: Text structure identification quiz and abstract critique worksheet.",
        lasBg: "Academic language is formal, objective, cautious, and structurally organized.",
        lasA1: "Read a research abstract and label its Introduction, Methodology, Results, and Discussion (IMRaD).",
        lasA2: "Convert 5 informal, biased paragraphs into objective, academic prose.",
        lasA3: "Write an academic review of a peer-reviewed article in your field of interest."
      }
    ],
    "3": [
      {
        week: "Weeks 1–2",
        topic: "Professional & Workplace Communication (Memos, Business Letters)",
        code: "SHS-EC-T3-W1",
        contentStandard: "The learner understands professional correspondence standards.",
        performanceStandard: "The learner drafts standard business correspondence compliant with industry norms.",
        learningCompetency: "Writes effective professional letters, memoranda, and executive incident reports.",
        enablingCompetencies: "1. Formats block style business letters. 2. Uses appropriate formal salutations.",
        s1: "Elicit: Critique poorly written complaint emails. Engage: Discuss cost of miscommunication in business.",
        s2: "Explore: Anatomy of a formal memo and letter of request. Explain: The 7 Cs of Business Communication.",
        s3: "Elaborate: Drafting an official sponsorship request letter for a school community outreach project.",
        s4: "Evaluate: Rubric-based evaluation of drafted business letters.",
        lasBg: "Professional correspondence reflects institutional credibility and requires concise clarity.",
        lasA1: "Label the 7 essential parts of a standard Full Block business letter.",
        lasA2: "Draft a formal internal memorandum reminding staff about workplace safety compliance.",
        lasA3: "Compose a professional letter of inquiry addressed to a prospective Work Immersion partner company."
      }
    ]
  },
  "General Mathematics": {
    "1": [
      {
        week: "Weeks 1–2",
        topic: "Functions, Operations on Functions & Composition",
        code: "SHS-GM-T1-W1",
        contentStandard: "The learner demonstrates understanding of key concepts of functions and piecewise functions.",
        performanceStandard: "The learner accurately models real-life situations using functions, including piecewise functions.",
        learningCompetency: "Represents real-life situations using functions and performs operations on functions (addition, subtraction, multiplication, division, composition).",
        enablingCompetencies: "1. Evaluates functions at given values. 2. Solves problems involving piecewise functions (e.g., jeepney fares, utility bills).",
        s1: "Elicit: Recall Cartesian plane and vertical line test. Engage: Calculate jeepney fare matrix across distances.",
        s2: "Explore: Formulating a piecewise function for mobile data consumption charges. Explain: Function algebra and (f o g)(x).",
        s3: "Elaborate: Real-world modeling problem: Cost, revenue, and profit function optimization for a Senior High food kiosk.",
        s4: "Evaluate: 5-item problem-solving seatwork on function composition and piecewise evaluation.",
        lasBg: "A function is a mathematical relation where each input has exactly one output, widely used in business, science, and computer algorithms.",
        lasA1: "Given f(x) = 2x^2 - 3x + 1 and g(x) = x - 4, compute: a) (f + g)(x), b) (f - g)(x), c) (f * g)(x), d) (f / g)(x).",
        lasA2: "Formulate a piecewise function C(x) representing the electric bill where the first 50 kWh costs P8/kWh and excess costs P12/kWh.",
        lasA3: "Solve: A computer technician charges P500 base fee plus P250 per hour of service. Write the cost function and find the cost for 4.5 hours."
      },
      {
        week: "Weeks 3–4",
        topic: "Rational Functions, Equations, and Inequalities",
        code: "SHS-GM-T1-W2",
        contentStandard: "The learner understands rational functions, equations, and inequalities.",
        performanceStandard: "The learner solves real-life problems involving rational functions and graphs their asymptotes.",
        learningCompetency: "Solves rational equations and inequalities; determines intercepts, zeroes, and asymptotes of rational functions.",
        enablingCompetencies: "1. Finds LCD to clear fractions. 2. Uses sign tables for rational inequalities.",
        s1: "Elicit: Review operations on algebraic fractions. Engage: Speed, distance, and time rate problems.",
        s2: "Explore: Step-by-step solving of (x - 2) / (x + 3) > 0 using test points. Explain: Vertical vs horizontal asymptotes.",
        s3: "Elaborate: Work-problem simulation: Two tech students configuring local area network computers together vs solo.",
        s4: "Evaluate: Written test solving 2 rational equations and graphing 1 rational function with asymptotes.",
        lasBg: "Rational expressions represent ratios of polynomials, essential in modeling speed rates, dilution problems, and electrical circuits.",
        lasA1: "Solve for x: (2 / x) + (3 / (x - 1)) = 5.",
        lasA2: "Determine the domain, vertical asymptote, horizontal asymptote, and x-intercept of f(x) = (3x - 6) / (x + 2).",
        lasA3: "A water tank is filled by Pipe A in 4 hours and emptied by Pipe B in 6 hours. How long will it take to fill the tank if both are open?"
      }
    ],
    "2": [
      {
        week: "Weeks 1–2",
        topic: "Simple and Compound Interest & Present Value",
        code: "SHS-GM-T2-W1",
        contentStandard: "The learner understands basic business mathematics concepts of simple and compound interest.",
        performanceStandard: "The learner investigates and analyzes real-world investment scenarios to make wise financial choices.",
        learningCompetency: "Illustrates simple and compound interest; computes interest, maturity value, and present value in loan/savings contracts.",
        enablingCompetencies: "1. Differentiates Is = Prt from A = P(1 + r/n)^(nt). 2. Compares annual vs quarterly compounding.",
        s1: "Elicit: Discussing personal savings in piggy banks vs cooperative bank accounts. Engage: Time value of money concept.",
        s2: "Explore: Calculating total payout of P50,000 invested for 5 years under simple vs compound interest. Explain: Compounding effect.",
        s3: "Elaborate: Investment advisory simulation: Advising an OFW family on placing remittance savings in Philippine Treasury bonds vs commercial banks.",
        s4: "Evaluate: Problem-solving assessment computing compound interest and present value across compounding frequencies.",
        lasBg: "Interest is the cost of borrowing money or the return on invested capital. Compound interest yields 'interest on interest'.",
        lasA1: "Calculate simple interest earned on a P25,000 principal at 6% annual rate for 3.5 years.",
        lasA2: "Determine the maturity value and compound interest if P80,000 is invested at 8% compounded quarterly for 4 years.",
        lasA3: "How much money must be invested today at 7% compounded semi-annually to have P200,000 after 5 years for college tuition?"
      }
    ],
    "3": [
      {
        week: "Weeks 1–2",
        topic: "Mathematical Logic, Propositions & Truth Tables",
        code: "SHS-GM-T3-W1",
        contentStandard: "The learner understands key concepts of propositional logic, truth values, and logical arguments.",
        performanceStandard: "The learner establishes the validity and fallacy of arguments to make informed decisions.",
        learningCompetency: "Illustrates and symbolizes propositions; determines the truth value of compound propositions using truth tables.",
        enablingCompetencies: "1. Distinguishes simple from compound propositions. 2. Uses negation, conjunction, disjunction, implication, and biconditional.",
        s1: "Elicit: Identifying true/false statements vs subjective opinions. Engage: Riddles solved through logical deduction.",
        s2: "Explore: Constructing truth tables for (p -> q) and its contrapositive (~q -> ~p). Explain: Logical equivalence and tautologies.",
        s3: "Elaborate: Analyzing legal contracts or Philippine advertising claims to spot deceptive logical fallacies.",
        s4: "Evaluate: Truth table verification test for 3 compound logical statements.",
        lasBg: "Propositional logic forms the backbone of computational reasoning, legal debate, and structured scientific proof.",
        lasA1: "Symbolize the following statements using p, q, and logical connectives (AND, OR, NOT, IF-THEN).",
        lasA2: "Construct the full truth table for the statement: ~(p AND q) <-> (~p OR ~q) (De Morgan's Law).",
        lasA3: "Identify the fallacy in the argument: 'If it rains, the grass is wet. The grass is wet, therefore it rained.'"
      }
    ]
  },
  "General Science": {
    "1": [
      {
        week: "Weeks 1–2",
        topic: "Earth Systems & Internal/External Geologic Processes",
        code: "SHS-GS-T1-W1",
        contentStandard: "The learner understands the Earth's subsystems (geosphere, hydrosphere, atmosphere, biosphere) and plate tectonics.",
        performanceStandard: "The learner conducts a hazard risk evaluation of their local municipality regarding earthquakes and landslides.",
        learningCompetency: "Describes the interactions between Earth subsystems and explains how internal heat drives plate tectonics and volcanism in the Philippine archipelago.",
        enablingCompetencies: "1. Explains mantle convection currents. 2. Identifies Pacific Ring of Fire features.",
        s1: "Elicit: Video footage of recent Mindanao earthquakes or volcanic tremors. Engage: Mapping local fault lines using DOST-PHIVOLCS FaultFinder.",
        s2: "Explore: Modeling convergent, divergent, and transform plate boundaries with clay models. Explain: Magmatism and subduction zones.",
        s3: "Elaborate: Preparing a Community Disaster Risk Reduction and Management (DRRM) evacuation plan for their barangay.",
        s4: "Evaluate: 10-item diagram analysis on plate boundary mechanics and DRRM rubric evaluation.",
        lasBg: "The Earth operates as a unified dynamic system where geological movements shape terrain, climate, and biological habitats.",
        lasA1: "Draw and label a cross-section showing oceanic-continental subduction along the Philippine Trench.",
        lasA2: "Explain why the Philippine archipelago experiences high seismic and volcanic activity in 4 scientific sentences.",
        lasA3: "Formulate a 5-step emergency family action plan during a magnitude 7.0 earthquake."
      },
      {
        week: "Weeks 3–4",
        topic: "Cellular Energetics: Photosynthesis & Cellular Respiration",
        code: "SHS-GS-T1-W2",
        contentStandard: "The learner understands bioenergetics and energy transformation within biological systems.",
        performanceStandard: "The learner designs an agricultural experiment testing factors affecting plant growth and biomass output.",
        learningCompetency: "Explains how photosynthetic light-dependent and Calvin cycle reactions convert solar energy into ATP, and how cellular respiration extracts metabolic energy.",
        enablingCompetencies: "1. Compares chloroplast and mitochondria structures. 2. Balances chemical equations of aerobic respiration.",
        s1: "Elicit: Why do athletes consume carbohydrates before marathons? Engage: Leaf pigment chromatography demo.",
        s2: "Explore: Step-by-step trace of electrons through Photosystems II and I. Explain: Glycolysis, Krebs cycle, and oxidative phosphorylation.",
        s3: "Elaborate: Linking photosynthetic efficiency to local agricultural yields in Lanao del Norte rice fields.",
        s4: "Evaluate: Diagrammatic labeling quiz of ATP synthesis and comparative chart worksheet.",
        lasBg: "Cellular energetics sustains all life by transforming radiant solar photons into chemical ATP energy through metabolic pathways.",
        lasA1: "Write the balanced chemical equations for photosynthesis and cellular respiration, noting their complementary nature.",
        lasA2: "Compare and contrast aerobic respiration and anaerobic fermentation in terms of ATP yield and end products.",
        lasA3: "Design a simple experiment to test how light intensity influences the rate of photosynthesis in local aquatic plants."
      }
    ],
    "2": [
      {
        week: "Weeks 1–2",
        topic: "Atomic Structure, Periodic Trends & Chemical Bonding",
        code: "SHS-GS-T2-W1",
        contentStandard: "The learner understands the electronic structure of atoms and periodic trends in chemical reactivity.",
        performanceStandard: "The learner predicts chemical behaviors and properties of substances used in everyday industry.",
        learningCompetency: "Relates electron configuration to periodic properties (ionization energy, electronegativity, atomic radius) and chemical bonding types.",
        enablingCompetencies: "1. Writes spdf electron configurations. 2. Draws Lewis electron dot structures for ionic and covalent compounds.",
        s1: "Elicit: Flame test demonstrations with metal salts. Engage: Mendeleev's periodic law predictions.",
        s2: "Explore: Mapping periodic trends across periods and groups. Explain: Electronegativity differences dictating polar vs non-polar covalent bonds.",
        s3: "Elaborate: Investigating safety data sheets (SDS) of common household and industrial cleaning chemicals.",
        s4: "Evaluate: Lewis structure drawing test and periodic trend prediction worksheet.",
        lasBg: "Chemical bonding occurs when valence electrons interact to achieve a stable octet configuration, dictating physical properties.",
        lasA1: "Write the full electron configuration and orbital diagram for Iron (Fe, atomic number 26).",
        lasA2: "Arrange the elements Li, Na, K, and Cs in order of increasing atomic radius and explain the underlying trend.",
        lasA3: "Draw Lewis dot structures for H2O, CO2, and NaCl, indicating bond polarity and formal charges."
      }
    ],
    "3": [
      {
        week: "Weeks 1–2",
        topic: "Classical Mechanics: Kinematics & Newton's Laws of Motion",
        code: "SHS-GS-T3-W1",
        contentStandard: "The learner understands kinematics equations and Newton's laws governing force and momentum.",
        performanceStandard: "The learner builds a prototype demonstrating energy conservation and impact mitigation.",
        learningCompetency: "Applies Newton's laws of motion and equations of uniformly accelerated motion to solve real-world velocity and momentum problems.",
        enablingCompetencies: "1. Draws free-body diagrams (FBD). 2. Solves F = ma in multi-force systems.",
        s1: "Elicit: Why do vehicle passengers jerk forward during sudden braking? Engage: Crash test dummy physics.",
        s2: "Explore: Motion sensor lab measuring acceleration down an inclined ramp. Explain: Action-reaction pairs and impulse-momentum theorem.",
        s3: "Elaborate: Designing an egg-drop container using principles of impulse reduction (extending impact time).",
        s4: "Evaluate: Free-body diagram problem-solving test and egg-drop engineering performance evaluation.",
        lasBg: "Newton's laws of motion provide the mathematical foundation for analyzing vehicle safety, aeronautics, and mechanical engineering.",
        lasA1: "A 1200-kg car accelerates from rest to 25 m/s in 8.0 seconds. Compute the acceleration and net force exerted on the vehicle.",
        lasA2: "Draw a complete Free-Body Diagram of a crate being pulled up an inclined plane with friction.",
        lasA3: "Explain how airbags and vehicle crumple zones reduce injury during a collision using the impulse-momentum theorem."
      }
    ]
  },
  "Life and Career Skills": {
    "1": [
      {
        week: "Weeks 1–2",
        topic: "Self-Awareness, Emotional Intelligence & Personal Values",
        code: "SHS-LCS-T1-W1",
        contentStandard: "The learner understands their personal identity, strengths, emotional triggers, and foundational values.",
        performanceStandard: "The learner creates a comprehensive personal development roadmap aligning values with career ambitions.",
        learningCompetency: "Analyzes personal strengths, growth areas, and emotional intelligence competencies (Goleman framework) to guide life choices.",
        enablingCompetencies: "1. Performs a Personal SWOT Analysis. 2. Identifies healthy emotional regulation techniques.",
        s1: "Elicit: 'Who Am I?' reflective shield drawing activity. Engage: Daniel Goleman's 5 domains of EQ introduction.",
        s2: "Explore: Facilitated peer-feedback circle on perceived character strengths. Explain: Self-awareness vs blind spots (Johari Window).",
        s3: "Elaborate: Drafting an actionable Personal SWOT matrix.",
        s4: "Evaluate: Rubric evaluation of Personal SWOT Portfolio and reflective self-assessment journal entry.",
        lasBg: "Self-awareness is the cornerstone of leadership, enabling individuals to understand feelings, manage impulses, and build resilience.",
        lasA1: "Complete your Johari Window matrix by listing 4 traits in Open Area, Blind Spot, Hidden Area, and Unknown Area.",
        lasA2: "Construct a Personal SWOT analysis focusing on your Senior High School academic and technical skills.",
        lasA3: "Write a 250-word reflective essay detailing a difficult situation where you successfully applied emotional self-regulation."
      },
      {
        week: "Weeks 3–4",
        topic: "Growth Mindset, Stress Management & Mental Wellness",
        code: "SHS-LCS-T1-W2",
        contentStandard: "The learner understands the neurobiology of growth mindset and holistic mental wellness practices.",
        performanceStandard: "The learner implements a personalized stress management and study-life wellness routine.",
        learningCompetency: "Distinguishes fixed mindset from growth mindset and applies evidence-based coping strategies for adolescent stress.",
        enablingCompetencies: "1. Re-frames failure as a learning vector. 2. Practices diaphragmatic breathing and sleep hygiene.",
        s1: "Elicit: Mindset survey: Is intelligence fixed or malleable? Engage: Neuroplasticity brain video overview.",
        s2: "Explore: Rewriting negative internal self-talk into growth mindset statements. Explain: Cortisol, stress cycles, and burnout prevention.",
        s3: "Elaborate: Designing a weekly healthy habits checklist balancing academic tasks, physical activity, and family time.",
        s4: "Evaluate: Submission and monitoring of a 7-day Mental Wellness and Habit Tracker.",
        lasBg: "Adopting a growth mindset allows learners to embrace challenges and view effort as the pathway to mastery.",
        lasA1: "Convert 5 fixed-mindset internal statements into empowering growth-mindset self-talk.",
        lasA2: "Create an emergency stress-reduction toolkit containing 3 quick cognitive and physiological reset techniques.",
        lasA3: "Design a 7-day balanced time-blocking calendar prioritizing sleep, study, hobbies, and digital detox."
      }
    ],
    "2": [
      {
        week: "Weeks 1–2",
        topic: "Philippine Labor Market Trends & 21st Century In-Demand Skills",
        code: "SHS-LCS-T2-W1",
        contentStandard: "The learner understands current economic and labor market demands in the Philippines and ASEAN region.",
        performanceStandard: "The learner formulates a viable career pathway matching personal competencies with market needs.",
        learningCompetency: "Investigates emerging career trajectories, TechPro industries, and Fourth Industrial Revolution (4IR) skill sets.",
        enablingCompetencies: "1. Analyzes DOLE and TESDA in-demand industry reports. 2. Identifies transferable technical and soft skills.",
        s1: "Elicit: Which jobs existed 10 years ago that are gone today? Engage: AI and automation impact on local employment.",
        s2: "Explore: Reviewing DOLE labor market occupational forecasts. Explain: Hard skills vs soft skills in hiring.",
        s3: "Elaborate: Mapping Senior High School track specializations to high-growth regional industries in Region X.",
        s4: "Evaluate: Career pathway alignment report and presentation of industry skill requirement matrices.",
        lasBg: "The contemporary workforce demands adaptive professionals possessing both technical aptitude and interpersonal agility.",
        lasA1: "List 5 high-demand industries in Northern Mindanao / Region X and note 2 essential competencies required by each.",
        lasA2: "Compare the educational requirements, career growth, and starting compensation of your top 2 career choices.",
        lasA3: "Draft an action plan detailing the certifications (NC II / NC III) or academic degrees needed to achieve your career goal."
      }
    ],
    "3": [
      {
        week: "Weeks 1–2",
        topic: "Financial Literacy, Personal Budgeting & Saving Systems",
        code: "SHS-LCS-T3-W1",
        contentStandard: "The learner understands principles of sound personal financial management, budgeting, and debt avoidance.",
        performanceStandard: "The learner develops a realistic personal budget and emergency fund plan.",
        learningCompetency: "Demonstrates practical financial literacy by drafting personal cash-flow budgets and identifying savings instruments.",
        enablingCompetencies: "1. Applies the 50/30/20 budget framework. 2. Differentiates needs from wants.",
        s1: "Elicit: How do you manage your weekly school allowance? Engage: Realities of inflation and purchasing power.",
        s2: "Explore: Creating an interactive spreadsheet for daily expense tracking. Explain: The 50/30/20 rule (Needs, Wants, Savings).",
        s3: "Elaborate: Budgeting simulation: Managing a monthly minimum wage salary for a young professional living in Cagayan de Oro.",
        s4: "Evaluate: Personal monthly budget plan scored against accuracy, realism, and emergency savings allocation.",
        lasBg: "Financial independence begins with disciplined cash-flow tracking, prioritizing emergency reserves, and smart spending.",
        lasA1: "Categorize a list of 15 common teen expenses into 'Essential Needs', 'Discretionary Wants', and 'Future Savings'.",
        lasA2: "Draft a weekly budget using the 50/30/20 rule based on a hypothetical allowance of P1,000.",
        lasA3: "Calculate how long it will take to build a P15,000 emergency fund saving P250 each week."
      }
    ]
  }
};

export interface ILAWGeneratorProps {
  currentPlan?: ILAWCompletePlan;
  onPlanGenerated?: (plan: ILAWCompletePlan) => void;
  onNavigateToGenerated?: () => void;
}

export const ILAWGenerator: React.FC<ILAWGeneratorProps> = ({
  currentPlan,
  onPlanGenerated,
  onNavigateToGenerated
}) => {
  const [activeMainTab, setActiveMainTab] = useState<'form' | 'generated'>('form');

  // Cascade states
  const [selectedGrade, setSelectedGrade] = useState<string>('Grade 11');
  const [selectedSubject, setSelectedSubject] = useState<string>('Mabisang Komunikasyon');
  const [selectedTerm, setSelectedTerm] = useState<'Term 1' | 'Term 2' | 'Term 3'>('Term 1');
  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number>(0);
  const [computedDate, setComputedDate] = useState<string>('Jun 16–19, 2026');
  const [lessonTitle, setLessonTitle] = useState<string>('');

  // BOW lookups
  const distinctGrades = getDistinctGrades();
  const availableSubjects = getSubjectsForGrade(selectedGrade);
  const availableTerms = getTermsForSubject(selectedGrade, selectedSubject);
  const availableCompetencies = getEntriesForTerm(selectedGrade, selectedSubject, selectedTerm);

  const activeBOWEntry = availableCompetencies[selectedWeekIndex] || availableCompetencies[0] || ILAW_BOW_DATABASE[0];

  // Version Management State ('AI Generated' vs 'Teacher Edited')
  const [versionStatus, setVersionStatus] = useState<'AI Generated' | 'Teacher Edited'>('AI Generated');
  const [showRegenerateConfirmModal, setShowRegenerateConfirmModal] = useState<boolean>(false);

  const markTeacherEdited = () => {
    setVersionStatus('Teacher Edited');
  };

  const handleGradeChange = (grade: string) => {
    setSelectedGrade(grade);
    const subjects = getSubjectsForGrade(grade);
    const firstSubject = subjects[0] || '';
    setSelectedSubject(firstSubject);
    const terms = getTermsForSubject(grade, firstSubject);
    const firstTerm = terms[0] || 'Term 1';
    setSelectedTerm(firstTerm);
    setSelectedWeekIndex(0);
    setVersionStatus('AI Generated');
  };

  const handleSubjectChange = (subj: string) => {
    setSelectedSubject(subj);
    const terms = getTermsForSubject(selectedGrade, subj);
    const firstTerm = terms[0] || 'Term 1';
    setSelectedTerm(firstTerm);
    setSelectedWeekIndex(0);
    setVersionStatus('AI Generated');
  };

  const handleTermChange = (term: 'Term 1' | 'Term 2' | 'Term 3') => {
    setSelectedTerm(term);
    setSelectedWeekIndex(0);
    setVersionStatus('AI Generated');
  };

  const [bowData, setBowData] = useState<SubjectBOWMap>(GRADE_11_DEFAULT_BOW);

  // Meta Information (Region X Presets)
  const [school, setSchool] = useState<string>('Lanao del Norte National Comprehensive High School');
  const [teacher, setTeacher] = useState<string>('STEAVEN KINTH D. BOISER');
  const [section, setSection] = useState<string>('Grade 11 - Einstein / Rizal (Academic & TechPro)');
  const [dates, setDates] = useState<string>('Jun 16–19, 2026');
  const [division, setDivision] = useState<string>('Division of Lanao del Norte');
  const [region, setRegion] = useState<string>('Region X - Northern Mindanao');
  const [principal, setPrincipal] = useState<string>('School Principal IV / Head Teacher');

  // Active Entry Details (Editable)
  const [contentStandard, setContentStandard] = useState<string>('');
  const [performanceStandard, setPerformanceStandard] = useState<string>('');
  const [learningCompetency, setLearningCompetency] = useState<string>('');
  const [enablingCompetencies, setEnablingCompetencies] = useState<string>('');
  const [session1, setSession1] = useState<string>('');
  const [session2, setSession2] = useState<string>('');
  const [session3, setSession3] = useState<string>('');
  const [session4, setSession4] = useState<string>('');
  const [resources, setResources] = useState<string>('DepEd Strengthened SHS BOW (SY 2026–2027), Learner Materials, Boiser Power Tools, Canva & Figma Exemplars.');
  const [integration, setIntegration] = useState<string>('STEM linkages, TechPro Career readiness, Critical Thinking, Ethical Digital Citizenship.');

  // LAS Specific States
  const [lasBgState, setLasBgState] = useState<string>('');
  const [lasA1State, setLasA1State] = useState<string>('');
  const [lasA2State, setLasA2State] = useState<string>('');
  const [lasA3State, setLasA3State] = useState<string>('');

  // UI state
  const [viewMode, setViewMode] = useState<'do3' | 'four_day' | 'ilaw' | 'las' | 'svg' | 'assets'>('four_day');
  const [directResultMode, setDirectResultMode] = useState<boolean>(true);
  const [generationMode, setGenerationMode] = useState<'quick' | 'standard' | 'complete'>('standard');
  const [do3Plan, setDo3Plan] = useState<ILAWCompletePlan>(() => {
    const termConfig = DEPED_2026_CALENDAR_CONFIG['Term 1'];
    return generateDO3PlanFromBOWEntry({
      entry: ILAW_BOW_DATABASE[0],
      teacher: 'STEAVEN KINTH D. BOISER',
      school: 'Lanao del Norte National Comprehensive High School',
      section: 'Grade 11 - Einstein / Rizal (Academic & TechPro)',
      dates: 'Jun 16–19, 2026',
      startDate: termConfig.startDate,
      holidays: termConfig.holidays
    });
  });
  const [isGeneratingDO3, setIsGeneratingDO3] = useState<boolean>(false);
  const [isExportingDocx, setIsExportingDocx] = useState<boolean>(false);
  const [isExportingPptx, setIsExportingPptx] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [activePagePreview, setActivePagePreview] = useState<'both' | 'page1' | 'page2'>('both');
  const [isExportingPDF, setIsExportingPDF] = useState<boolean>(false);
  const [pdfSuccessMessage, setPdfSuccessMessage] = useState<string | null>(null);
  const [pdfExportMode, setPdfExportMode] = useState<PDFExportMode>('full');

  // Validation Dashboard State & Helpers
  const [highlightedField, setHighlightedField] = useState<string | null>(null);
  const [isValidationDashboardExpanded, setIsValidationDashboardExpanded] = useState<boolean>(true);
  const [showValidationExportModal, setShowValidationExportModal] = useState<boolean>(false);
  const [pendingExportAction, setPendingExportAction] = useState<(() => void) | null>(null);

  const getValidationChecks = (): ValidationCheck[] => {
    return [
      {
        id: 'dates',
        label: 'Teaching Dates (DO 009, s. 2026 Calendar)',
        category: 'dates',
        isValid: Boolean(computedDate && dates && computedDate.trim().length > 3),
        isRequired: true,
        currentValue: computedDate || dates || 'Not set',
        errorMessage: 'Teaching dates are missing or invalid.',
        elementId: 'field-dates'
      },
      {
        id: 'subject',
        label: 'Learning Area / Subject',
        category: 'subjects',
        isValid: Boolean(selectedSubject && selectedSubject.trim().length > 0),
        isRequired: true,
        currentValue: selectedSubject || 'None selected',
        errorMessage: 'Subject / Learning Area must be selected.',
        elementId: 'field-subject'
      },
      {
        id: 'competency',
        label: 'Learning Competency (MELC & Code)',
        category: 'competencies',
        isValid: Boolean(learningCompetency && learningCompetency.trim().length > 5),
        isRequired: true,
        currentValue: learningCompetency ? (learningCompetency.length > 45 ? learningCompetency.substring(0, 45) + '...' : learningCompetency) : 'Missing',
        errorMessage: 'Learning competency description or MELC code is missing.',
        elementId: 'field-competency'
      },
      {
        id: 'contentStandard',
        label: 'Content Standard',
        category: 'competencies',
        isValid: Boolean(contentStandard && contentStandard.trim().length > 5),
        isRequired: true,
        currentValue: contentStandard ? (contentStandard.length > 45 ? contentStandard.substring(0, 45) + '...' : contentStandard) : 'Missing',
        errorMessage: 'Content standard statement is missing.',
        elementId: 'field-content-standard'
      },
      {
        id: 'performanceStandard',
        label: 'Performance Standard',
        category: 'competencies',
        isValid: Boolean(performanceStandard && performanceStandard.trim().length > 5),
        isRequired: true,
        currentValue: performanceStandard ? (performanceStandard.length > 45 ? performanceStandard.substring(0, 45) + '...' : performanceStandard) : 'Missing',
        errorMessage: 'Performance standard statement is missing.',
        elementId: 'field-performance-standard'
      },
      {
        id: 'topic',
        label: 'Lesson Topic / Curriculum Focus',
        category: 'competencies',
        isValid: Boolean((activeBOWEntry?.topic || lessonTitle) && (activeBOWEntry?.topic || lessonTitle).trim().length > 2),
        isRequired: true,
        currentValue: lessonTitle || activeBOWEntry?.topic || 'Missing',
        errorMessage: 'Lesson topic or title is missing.',
        elementId: 'field-topic'
      },
      {
        id: 'teacher',
        label: 'Teacher-Developer Name',
        category: 'metadata',
        isValid: Boolean(teacher && teacher.trim().length > 2),
        isRequired: true,
        currentValue: teacher || 'Missing',
        errorMessage: 'Teacher name is required.',
        elementId: 'field-teacher'
      },
      {
        id: 'section',
        label: 'Grade Level & Section',
        category: 'metadata',
        isValid: Boolean(section && section.trim().length > 2),
        isRequired: true,
        currentValue: section || 'Missing',
        errorMessage: 'Grade & section details are required.',
        elementId: 'field-section'
      },
      {
        id: 'school',
        label: 'School Name & Division',
        category: 'metadata',
        isValid: Boolean(school && school.trim().length > 2),
        isRequired: true,
        currentValue: school || 'Missing',
        errorMessage: 'School name is required.',
        elementId: 'field-school'
      },
      {
        id: 'procedures',
        label: 'Four-Session Daily Procedures (Sessions 1–4)',
        category: 'procedures',
        isValid: Boolean(session1?.trim() && session2?.trim() && session3?.trim() && session4?.trim()),
        isRequired: true,
        currentValue: (session1 && session2 && session3 && session4) ? 'All 4 Daily Sessions Configured' : 'Incomplete daily procedures',
        errorMessage: 'One or more daily session procedures (Sessions 1–4) are empty.',
        elementId: 'field-procedures'
      }
    ];
  };

  const handleFocusField = (elementId: string) => {
    setHighlightedField(elementId);
    setActiveMainTab('form');
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
      }
    }, 100);
    setTimeout(() => {
      setHighlightedField(null);
    }, 3500);
  };

  const handleRepairDefaults = () => {
    if (!school || school.trim().length < 3) {
      setSchool('LNNCHS (Lanao del Norte National Comprehensive High School)');
    }
    if (!teacher || teacher.trim().length < 3) {
      setTeacher('STEAVEN KINTH D. BOISER');
    }
    if (!section || section.trim().length < 3) {
      setSection('Grade 11 - Einstein / Rizal (Academic & TechPro)');
    }
    if (!dates || dates.trim().length < 3) {
      setDates(computedDate || 'Jun 16–19, 2026');
    }
    if (!contentStandard || contentStandard.trim().length < 5) {
      setContentStandard(activeBOWEntry?.contentStandard || 'The learner understands the nature, elements, and dynamics of verbal and non-verbal human communication across diverse settings.');
    }
    if (!performanceStandard || performanceStandard.trim().length < 5) {
      setPerformanceStandard(activeBOWEntry?.performanceStandard || 'The learner designs and performs an effective, culturally sensitive oral communication exemplar.');
    }
    if (!learningCompetency || learningCompetency.trim().length < 5) {
      setLearningCompetency(`[${activeBOWEntry?.code || 'SHS-2026'}] ${activeBOWEntry?.learningCompetency || 'Explains the functions, nature, and process of communication using established models.'}`);
    }
    if (!session1 || session1.trim().length < 5) setSession1(activeBOWEntry?.s1 || 'Elicit: Icebreaker message relay. Engage: Video case study of communication breakdowns.');
    if (!session2 || session2.trim().length < 5) setSession2(activeBOWEntry?.s2 || 'Explore: Group diagramming of Shannon-Weaver vs Schramm models. Explain: Interactive lecture.');
    if (!session3 || session3.trim().length < 5) setSession3(activeBOWEntry?.s3 || 'Elaborate: Role-play simulation resolving workplace miscommunication.');
    if (!session4 || session4.trim().length < 5) setSession4(activeBOWEntry?.s4 || 'Evaluate: Formative rubric assessment and 10-item conceptual check-in.');

    markTeacherEdited();
    setPdfSuccessMessage('✓ Auto-filled all missing required fields with standard DepEd Region X exemplar content!');
    setTimeout(() => setPdfSuccessMessage(null), 4000);
  };

  const withExportValidation = (exportAction: () => void) => {
    const missing = getValidationChecks().filter(c => !c.isValid && c.isRequired);
    if (missing.length > 0) {
      setPendingExportAction(() => exportAction);
      setShowValidationExportModal(true);
    } else {
      exportAction();
    }
  };

  const ensureGeneratedPlan = (): ILAWCompletePlan => {
    const termConfig = DEPED_2026_CALENDAR_CONFIG[selectedTerm] || DEPED_2026_CALENDAR_CONFIG['Term 1'];
    const plan = generateDO3PlanFromBOWEntry({
      entry: activeBOWEntry,
      teacher,
      school,
      section,
      dates: computedDate || 'Jun 16–19, 2026',
      division,
      region,
      lessonTitle,
      startDate: termConfig.startDate,
      holidays: termConfig.holidays
    });
    setDo3Plan(plan);
    return plan;
  };

  const handleExportDO3Docx = async () => {
    setIsExportingDocx(true);
    try {
      await exportDO3ILAWToDocx(do3Plan);
      setPdfSuccessMessage('✓ Successfully exported DepEd DO 3, s. 2026 Word Document (.docx) with all 4 parts!');
      setTimeout(() => setPdfSuccessMessage(null), 5000);
    } catch (err: any) {
      console.error(err);
      alert('Failed to export Word document: ' + (err?.message || 'Error occurred'));
    } finally {
      setIsExportingDocx(false);
    }
  };

  const handleExportDO3Pptx = async () => {
    setIsExportingPptx(true);
    try {
      await exportDO3ILAWToPptx(do3Plan);
      setPdfSuccessMessage('✓ Successfully exported Lesson Proper Presentation (.pptx) with ≥35pt projection typography!');
      setTimeout(() => setPdfSuccessMessage(null), 5000);
    } catch (err: any) {
      console.error(err);
      alert('Failed to export PowerPoint deck: ' + (err?.message || 'Error occurred'));
    } finally {
      setIsExportingPptx(false);
    }
  };

  const handleExportDO3Pdf = async () => {
    setIsExportingPDF(true);
    try {
      await exportDO3ILAWToPdf(do3Plan);
      setPdfSuccessMessage('✓ Successfully exported official DepEd DO 3, s. 2026 PDF Document with LNNCHS and DepEd Seals!');
      setTimeout(() => setPdfSuccessMessage(null), 5000);
    } catch (err: any) {
      console.error(err);
      alert('Failed to export PDF: ' + (err?.message || 'Error occurred'));
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleGenerateDO3AI = async () => {
    setIsGeneratingDO3(true);
    try {
      const res = await fetch('/api/generate-ilaw-do3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lesson: activeEntry?.topic || 'Mungkahing Pagpapangkat: Persona, Panahon, at Lugar',
          learningArea: selectedSubject || 'Mabisang Komunikasyon',
          teacher,
          school,
          division,
          region,
          gradeLevel: selectedGrade,
          section,
          term: selectedTerm === 'Term 1' ? 1 : selectedTerm === 'Term 2' ? 2 : 3,
          bowWeek: activeEntry?.week || 'Linggo 1',
          inclusiveDates: computedDate || 'Jun 16–19, 2026',
          numberOfSessions: 4,
          targetCompetency: learningCompetency,
          teacherNotes: `Strict DO 3 s. 2026 4-part lesson plan format. Mode: ${generationMode}`
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setDo3Plan(data.data);
        setViewMode('do3');
        setVersionStatus('AI Generated');
        setPdfSuccessMessage(`✓ Generated DepEd DO 3, s. 2026 complete ILAW (${data.modelUsed})!`);
        setTimeout(() => setPdfSuccessMessage(null), 5000);
        if (directResultMode) {
          if (onNavigateToGenerated) {
            onNavigateToGenerated();
          } else {
            setActiveMainTab('generated');
          }
        }
      } else {
        throw new Error(data.error || 'Server returned invalid response');
      }
    } catch (err: any) {
      console.warn('Fallback to local rule-based builder:', err.message);
      const plan = ensureGeneratedPlan();
      setDo3Plan(plan);
      setViewMode('do3');
      setVersionStatus('AI Generated');
      setPdfSuccessMessage(`✓ Generated DepEd DO 3, s. 2026 Complete Plan for ${plan.header.learningArea}!`);
      setTimeout(() => setPdfSuccessMessage(null), 4000);
      if (directResultMode) {
        if (onNavigateToGenerated) {
          onNavigateToGenerated();
        } else {
          setActiveMainTab('generated');
        }
      }
    } finally {
      setIsGeneratingDO3(false);
    }
  };

  const handleRequestRegenerate = () => {
    setShowRegenerateConfirmModal(true);
  };

  const handleConfirmRegenerate = () => {
    setShowRegenerateConfirmModal(false);
    handleGenerateDO3AI();
  };

  // Auto-compute date and update details when grade, subject, term, or week changes
  useEffect(() => {
    const termConfig = DEPED_2026_CALENDAR_CONFIG[selectedTerm] || DEPED_2026_CALENDAR_CONFIG['Term 1'];
    const weekNum = activeBOWEntry ? activeBOWEntry.week : (selectedWeekIndex + 1);
    const sessions = activeBOWEntry ? (activeBOWEntry.sessions || 4) : 4;

    const dateStr = computeDate(termConfig.startDate, weekNum, termConfig.holidays, sessions);
    setComputedDate(dateStr);
    setDates(dateStr);

    if (activeBOWEntry) {
      setContentStandard(activeBOWEntry.contentStandard || '');
      setPerformanceStandard(activeBOWEntry.performanceStandard || '');
      setLearningCompetency(`[${activeBOWEntry.code}] ${activeBOWEntry.learningCompetency || ''}`);
      setEnablingCompetencies(activeBOWEntry.enablingCompetencies || '');
      setSession1(activeBOWEntry.s1 || '');
      setSession2(activeBOWEntry.s2 || '');
      setSession3(activeBOWEntry.s3 || '');
      setSession4(activeBOWEntry.s4 || '');
    }
  }, [selectedGrade, selectedSubject, selectedTerm, selectedWeekIndex, activeBOWEntry]);

  const activeEntry = {
    week: activeBOWEntry.weekLabel || `Week ${activeBOWEntry.week}`,
    topic: activeBOWEntry.topic,
    code: activeBOWEntry.code,
    contentStandard: activeBOWEntry.contentStandard,
    performanceStandard: activeBOWEntry.performanceStandard,
    learningCompetency: activeBOWEntry.learningCompetency,
    enablingCompetencies: activeBOWEntry.enablingCompetencies,
    s1: activeBOWEntry.s1,
    s2: activeBOWEntry.s2,
    s3: activeBOWEntry.s3,
    s4: activeBOWEntry.s4,
    lasBg: activeBOWEntry.lasBg,
    lasA1: activeBOWEntry.lasA1,
    lasA2: activeBOWEntry.lasA2,
    lasA3: activeBOWEntry.lasA3,
  };

  const currentList = availableCompetencies.map(e => ({
    week: e.weekLabel || `Week ${e.week}`,
    topic: e.topic,
    code: e.code,
    contentStandard: e.contentStandard,
    performanceStandard: e.performanceStandard,
    learningCompetency: e.learningCompetency,
    enablingCompetencies: e.enablingCompetencies,
    s1: e.s1,
    s2: e.s2,
    s3: e.s3,
    s4: e.s4,
    lasBg: e.lasBg,
    lasA1: e.lasA1,
    lasA2: e.lasA2,
    lasA3: e.lasA3,
  }));

  const handleCopyFormattedText = () => {
    const formatted = `
REPUBLIC OF THE PHILIPPINES
DEPARTMENT OF EDUCATION
${region.toUpperCase()} • ${division.toUpperCase()}
${school.toUpperCase()}

================================================================================
INSTRUCTIONAL LEADERSHIP AND ACADEMIC WORKFLOW (ILAW) — PART 1
Three-Term Calendar (DepEd Order No. 009, s. 2026) | Strengthened SHS Curriculum (DO No. 015, s. 2026)
================================================================================

TEACHER: ${teacher} | LEARNING AREA: ${selectedSubject}
TEACHING DATES: ${dates} | GRADE & SECTION: ${section}
GRADING PERIOD: Term ${selectedTerm} (Weeks 1–10) | CURRICULUM: Strengthened SHS (DO 015, s. 2026)

--------------------------------------------------------------------------------
I. OBJECTIVES & CURRICULUM STANDARDS
--------------------------------------------------------------------------------
A. Content Standard: ${contentStandard}
B. Performance Standard: ${performanceStandard}
C. Learning Competency: ${learningCompetency}
D. Enabling Competency: ${enablingCompetencies}

--------------------------------------------------------------------------------
II. CONTENT / TOPIC FOCUS
--------------------------------------------------------------------------------
Subject Matter Focus: ${activeEntry?.week || 'Weeks 1–2'} — ${activeEntry?.topic || 'Curriculum Competency Focus'}

--------------------------------------------------------------------------------
III. LEARNING RESOURCES & INTEGRATION
--------------------------------------------------------------------------------
A. References & Materials: ${resources}
B. Cross-Curricular Link: ${integration}

--------------------------------------------------------------------------------
IV. PROCEDURES (FOUR-SESSION DAILY LESSON FLOW) — SESSIONS 1 & 2
--------------------------------------------------------------------------------
[SESSION 1 (DAY 1): ELICIT & ENGAGE]
${session1}

[SESSION 2 (DAY 2): EXPLORE & EXPLAIN]
${session2}

Document Code: DEPED-ROX-LDN-ILAW-2026 | Verified Official Record | Quality Assured Instructional Material • Page 1 of 2

================================================================================
INSTRUCTIONAL LEADERSHIP AND ACADEMIC WORKFLOW (ILAW) — PART 2
Three-Term Calendar (DepEd Order No. 009, s. 2026) | Strengthened SHS Curriculum (DO No. 015, s. 2026)
================================================================================

CONTINUATION: ${selectedSubject.toUpperCase()} | TERM ${selectedTerm} (${activeEntry?.week || 'Weeks 1–2'}) — ${(activeEntry?.topic || '').toUpperCase()}

--------------------------------------------------------------------------------
IV. PROCEDURES (FOUR-SESSION DAILY LESSON FLOW) — SESSIONS 3 & 4
--------------------------------------------------------------------------------
[SESSION 3 (DAY 3): ELABORATE & DEEPEN]
${session3}

[SESSION 4 (DAY 4): EVALUATE & EXTEND]
${session4}

--------------------------------------------------------------------------------
V. REMARKS & FORMATIVE ASSESSMENT TRACKING
--------------------------------------------------------------------------------
1. No. of learners who earned 80% on the formative assessment: _______
2. No. of learners who require additional activities for remediation: _______
3. Remediation strategy implemented: Targeted peer mentoring and differentiated scaffold worksheets.
4. Did the remedial lessons work? No. of learners who caught up with the lesson: _______

--------------------------------------------------------------------------------
VI. REFLECTION & INSTRUCTIONAL SUPERVISION
--------------------------------------------------------------------------------
A. Which of my teaching strategies worked well? Why did these work?
   Collaborative inquiry and authentic task-based modeling stimulated active participation and higher concept retention.

B. What difficulties did I encounter which my principal or supervisor can help me solve?
   Access to supplementary digital tools and high-volume printed learning activity sheets for differentiated tracks.

C. What innovation or localized materials did I use/discover which I wish to share with other teachers?
   Contextualized Region X workplace exemplars and interactive competency check-ins.

--------------------------------------------------------------------------------
SIGNATURES:
Prepared by:
${teacher}
Special Science Teacher II / Subject Teacher

Checked by:
MASTER TEACHER / HEAD TEACHER
Department Head, SHS Academic Track

Noted by:
${principal.toUpperCase()}
Secondary School Principal IV / School Head

Document Code: DEPED-ROX-LDN-ILAW-2026 | Verified Official Record | Quality Assured Instructional Material • Page 2 of 2
    `.trim();

    navigator.clipboard.writeText(formatted).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    });
  };

  // Helper for generating SVG vector string for Figma & Canva (Dual-Artboard Frame 1 & Frame 2)
  const generateFigmaSVGString = (): string => {
    const escapeXML = (str: string) =>
      (str || '').replace(/[<>&'"]/g, (c) => {
        switch (c) {
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '&': return '&amp;';
          case '\'': return '&apos;';
          case '"': return '&quot;';
          default: return c;
        }
      });

    return `
<svg width="2880" height="2030" viewBox="0 0 2880 2030" xmlns="http://www.w3.org/2000/svg" font-family="'Times New Roman', serif">
  <!-- Background Canvas -->
  <rect width="2880" height="2030" fill="#e2e8f0" />

  <!-- ==================== FRAME 1 (PAGE 1: PART 1) ==================== -->
  <g id="Frame_ILAW_Part_1" transform="translate(40, 40)">
    <rect width="1380" height="1950" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" rx="4" />
    
    <!-- Accent Bars -->
    <rect x="30" y="30" width="1320" height="6" fill="#0038A8" />
    <rect x="30" y="36" width="1320" height="3" fill="#FCD116" />

    <!-- Official Header -->
    <text x="690" y="65" font-size="13" font-weight="bold" fill="#475569" text-anchor="middle" letter-spacing="1">REPUBLIC OF THE PHILIPPINES</text>
    <text x="690" y="90" font-size="20" font-weight="bold" fill="#002776" text-anchor="middle" letter-spacing="0.5">DEPARTMENT OF EDUCATION</text>
    <text x="690" y="115" font-size="14" font-weight="bold" fill="#334155" text-anchor="middle">${escapeXML((region + ' • ' + division).toUpperCase())}</text>
    <text x="690" y="142" font-size="17" font-weight="bold" fill="#002776" text-anchor="middle">${escapeXML(school.toUpperCase())}</text>

    <!-- Navy Title Banner -->
    <rect x="30" y="160" width="1320" height="42" fill="#002776" />
    <text x="690" y="188" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle" letter-spacing="1">
      INSTRUCTIONAL LEADERSHIP AND ACADEMIC WORKFLOW (ILAW) — PART 1
    </text>
    <text x="690" y="222" font-size="12" font-style="italic" fill="#475569" text-anchor="middle">
      Three-Term Calendar (DepEd Order No. 009, s. 2026) | Strengthened SHS Curriculum (DO No. 015, s. 2026)
    </text>

    <!-- Meta Information Grid -->
    <rect x="30" y="240" width="1320" height="120" fill="#ffffff" stroke="#000000" stroke-width="1.2" />
    <!-- Row 1 -->
    <rect x="30" y="240" width="220" height="40" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
    <text x="45" y="265" font-size="12" font-weight="bold" fill="#000000">TEACHER</text>
    <rect x="250" y="240" width="440" height="40" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <text x="265" y="265" font-size="12" font-weight="bold" fill="#000000">${escapeXML(teacher)}</text>
    <rect x="690" y="240" width="220" height="40" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
    <text x="705" y="265" font-size="12" font-weight="bold" fill="#000000">LEARNING AREA</text>
    <rect x="910" y="240" width="440" height="40" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <text x="925" y="265" font-size="12" font-weight="bold" fill="#002776">${escapeXML(selectedSubject)}</text>

    <!-- Row 2 -->
    <rect x="30" y="280" width="220" height="40" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
    <text x="45" y="305" font-size="12" font-weight="bold" fill="#000000">TEACHING DATES</text>
    <rect x="250" y="280" width="440" height="40" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <text x="265" y="305" font-size="11.5" fill="#000000">${escapeXML(dates)}</text>
    <rect x="690" y="280" width="220" height="40" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
    <text x="705" y="305" font-size="12" font-weight="bold" fill="#000000">GRADE &amp; SECTION</text>
    <rect x="910" y="280" width="440" height="40" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <text x="925" y="305" font-size="11.5" fill="#000000">${escapeXML(section)}</text>

    <!-- Row 3 -->
    <rect x="30" y="320" width="220" height="40" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
    <text x="45" y="345" font-size="12" font-weight="bold" fill="#000000">GRADING PERIOD</text>
    <rect x="250" y="320" width="440" height="40" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <text x="265" y="345" font-size="11.5" fill="#000000">Term ${selectedTerm} (Weeks 1–10)</text>
    <rect x="690" y="320" width="220" height="40" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
    <text x="705" y="345" font-size="12" font-weight="bold" fill="#000000">CURRICULUM</text>
    <rect x="910" y="320" width="440" height="40" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <text x="925" y="345" font-size="11.5" fill="#000000">Strengthened SHS (DO 015, s. 2026)</text>

    <!-- Section I: Objectives Ribbon -->
    <rect x="30" y="380" width="1320" height="34" fill="#002776" />
    <text x="690" y="403" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">
      I. OBJECTIVES &amp; CURRICULUM STANDARDS
    </text>

    <!-- Standards Table -->
    <rect x="30" y="414" width="260" height="65" fill="#f8fafc" stroke="#000000" stroke-width="1" />
    <text x="45" y="452" font-size="12" font-weight="bold" fill="#000000">A. Content Standard</text>
    <rect x="290" y="414" width="1060" height="65" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <foreignObject x="305" y="420" width="1030" height="55">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:12px;line-height:1.4;color:#1e293b;font-family:'Times New Roman',serif">
        ${escapeXML(contentStandard)}
      </div>
    </foreignObject>

    <rect x="30" y="479" width="260" height="65" fill="#f8fafc" stroke="#000000" stroke-width="1" />
    <text x="45" y="517" font-size="12" font-weight="bold" fill="#000000">B. Performance Standard</text>
    <rect x="290" y="479" width="1060" height="65" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <foreignObject x="305" y="485" width="1030" height="55">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:12px;line-height:1.4;color:#1e293b;font-family:'Times New Roman',serif">
        ${escapeXML(performanceStandard)}
      </div>
    </foreignObject>

    <rect x="30" y="544" width="260" height="65" fill="#f8fafc" stroke="#000000" stroke-width="1" />
    <text x="45" y="582" font-size="12" font-weight="bold" fill="#000000">C. Learning Competency</text>
    <rect x="290" y="544" width="1060" height="65" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <foreignObject x="305" y="550" width="1030" height="55">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:12px;line-height:1.4;color:#002776;font-weight:bold;font-family:'Times New Roman',serif">
        ${escapeXML(learningCompetency)}
      </div>
    </foreignObject>

    <rect x="30" y="609" width="260" height="55" fill="#f8fafc" stroke="#000000" stroke-width="1" />
    <text x="45" y="642" font-size="12" font-weight="bold" fill="#000000">D. Enabling Competency</text>
    <rect x="290" y="609" width="1060" height="55" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <foreignObject x="305" y="615" width="1030" height="45">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:11.5px;line-height:1.4;color:#334155;font-family:'Times New Roman',serif">
        ${escapeXML(enablingCompetencies)}
      </div>
    </foreignObject>

    <!-- Section II: Content Ribbon -->
    <rect x="30" y="680" width="1320" height="34" fill="#002776" />
    <text x="690" y="703" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">
      II. CONTENT / TOPIC FOCUS
    </text>
    <rect x="30" y="714" width="260" height="45" fill="#f8fafc" stroke="#000000" stroke-width="1" />
    <text x="45" y="742" font-size="12" font-weight="bold" fill="#000000">Subject Matter Focus</text>
    <rect x="290" y="714" width="1060" height="45" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <text x="305" y="742" font-size="13" font-weight="bold" fill="#002776">
      ${escapeXML(activeEntry?.week || 'Weeks 1–2')} — ${escapeXML(activeEntry?.topic || '')}
    </text>

    <!-- Section III: Resources Ribbon -->
    <rect x="30" y="775" width="1320" height="34" fill="#002776" />
    <text x="690" y="798" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">
      III. LEARNING RESOURCES &amp; INTEGRATION
    </text>
    <rect x="30" y="809" width="260" height="50" fill="#f8fafc" stroke="#000000" stroke-width="1" />
    <text x="45" y="840" font-size="12" font-weight="bold" fill="#000000">A. References &amp; Materials</text>
    <rect x="290" y="809" width="1060" height="50" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <foreignObject x="305" y="815" width="1030" height="40">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:11.5px;line-height:1.4;color:#334155;font-family:'Times New Roman',serif">
        ${escapeXML(resources)}
      </div>
    </foreignObject>

    <rect x="30" y="859" width="260" height="50" fill="#f8fafc" stroke="#000000" stroke-width="1" />
    <text x="45" y="890" font-size="12" font-weight="bold" fill="#000000">B. Cross-Curricular Link</text>
    <rect x="290" y="859" width="1060" height="50" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <foreignObject x="305" y="865" width="1030" height="40">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:11.5px;line-height:1.4;color:#334155;font-family:'Times New Roman',serif">
        ${escapeXML(integration)}
      </div>
    </foreignObject>

    <!-- Section IV: Sessions 1 & 2 Ribbon -->
    <rect x="30" y="925" width="1320" height="34" fill="#002776" />
    <text x="690" y="948" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">
      IV. PROCEDURES (FOUR-SESSION DAILY LESSON FLOW) — SESSIONS 1 &amp; 2
    </text>

    <!-- 2 Columns Container -->
    <rect x="30" y="959" width="660" height="40" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
    <text x="360" y="985" font-size="12.5" font-weight="bold" fill="#002776" text-anchor="middle">
      SESSION 1 (DAY 1): ELICIT &amp; ENGAGE
    </text>
    <rect x="30" y="999" width="660" height="880" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <foreignObject x="45" y="1010" width="630" height="855">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:12px;line-height:1.6;color:#1e293b;font-family:'Times New Roman',serif;white-space:pre-wrap">
        ${escapeXML(session1)}
      </div>
    </foreignObject>

    <rect x="690" y="959" width="660" height="40" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
    <text x="1020" y="985" font-size="12.5" font-weight="bold" fill="#002776" text-anchor="middle">
      SESSION 2 (DAY 2): EXPLORE &amp; EXPLAIN
    </text>
    <rect x="690" y="999" width="660" height="880" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <foreignObject x="705" y="1010" width="630" height="855">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:12px;line-height:1.6;color:#1e293b;font-family:'Times New Roman',serif;white-space:pre-wrap">
        ${escapeXML(session2)}
      </div>
    </foreignObject>

    <!-- Footer Page 1 -->
    <line x1="30" y1="1900" x2="1350" y2="1900" stroke="#cbd5e1" stroke-width="1" />
    <text x="30" y="1922" font-size="10" fill="#64748b" font-family="'Courier New', monospace">
      Document Code: DEPED-ROX-LDN-ILAW-2026 | Verified Official Record | Quality Assured Instructional Material
    </text>
    <text x="1350" y="1922" font-size="10" font-weight="bold" fill="#64748b" text-anchor="end" font-family="'Courier New', monospace">
      Page 1 of 2
    </text>
  </g>

  <!-- ==================== FRAME 2 (PAGE 2: PART 2) ==================== -->
  <g id="Frame_ILAW_Part_2" transform="translate(1460, 40)">
    <rect width="1380" height="1950" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" rx="4" />
    
    <!-- Accent Bars -->
    <rect x="30" y="30" width="1320" height="6" fill="#0038A8" />
    <rect x="30" y="36" width="1320" height="3" fill="#FCD116" />

    <!-- Official Header -->
    <text x="690" y="65" font-size="13" font-weight="bold" fill="#475569" text-anchor="middle" letter-spacing="1">REPUBLIC OF THE PHILIPPINES</text>
    <text x="690" y="90" font-size="20" font-weight="bold" fill="#002776" text-anchor="middle" letter-spacing="0.5">DEPARTMENT OF EDUCATION</text>
    <text x="690" y="115" font-size="14" font-weight="bold" fill="#334155" text-anchor="middle">${escapeXML((region + ' • ' + division).toUpperCase())}</text>
    <text x="690" y="142" font-size="17" font-weight="bold" fill="#002776" text-anchor="middle">${escapeXML(school.toUpperCase())}</text>

    <!-- Navy Title Banner -->
    <rect x="30" y="160" width="1320" height="42" fill="#002776" />
    <text x="690" y="188" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle" letter-spacing="1">
      INSTRUCTIONAL LEADERSHIP AND ACADEMIC WORKFLOW (ILAW) — PART 2
    </text>
    <text x="690" y="222" font-size="12" font-style="italic" fill="#475569" text-anchor="middle">
      Three-Term Calendar (DepEd Order No. 009, s. 2026) | Strengthened SHS Curriculum (DO No. 015, s. 2026)
    </text>

    <!-- Continuation Banner -->
    <rect x="30" y="240" width="1320" height="38" fill="#f1f5f9" stroke="#000000" stroke-width="1.2" />
    <text x="45" y="264" font-size="12" font-weight="bold" fill="#002776">
      CONTINUATION: ${escapeXML(selectedSubject.toUpperCase())} | TERM ${selectedTerm} (${escapeXML(activeEntry?.week || 'Weeks 1–2')}) — ${escapeXML((activeEntry?.topic || '').toUpperCase())}
    </text>

    <!-- Section IV: Sessions 3 & 4 Ribbon -->
    <rect x="30" y="295" width="1320" height="34" fill="#002776" />
    <text x="690" y="318" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">
      IV. PROCEDURES (FOUR-SESSION DAILY LESSON FLOW) — SESSIONS 3 &amp; 4
    </text>

    <!-- 2 Columns Container -->
    <rect x="30" y="329" width="660" height="40" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
    <text x="360" y="355" font-size="12.5" font-weight="bold" fill="#002776" text-anchor="middle">
      SESSION 3 (DAY 3): ELABORATE &amp; DEEPEN
    </text>
    <rect x="30" y="369" width="660" height="880" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <foreignObject x="45" y="380" width="630" height="855">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:12px;line-height:1.6;color:#1e293b;font-family:'Times New Roman',serif;white-space:pre-wrap">
        ${escapeXML(session3)}
      </div>
    </foreignObject>

    <rect x="690" y="329" width="660" height="40" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
    <text x="1020" y="355" font-size="12.5" font-weight="bold" fill="#002776" text-anchor="middle">
      SESSION 4 (DAY 4): EVALUATE &amp; EXTEND
    </text>
    <rect x="690" y="369" width="660" height="880" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <foreignObject x="705" y="380" width="630" height="855">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:12px;line-height:1.6;color:#1e293b;font-family:'Times New Roman',serif;white-space:pre-wrap">
        ${escapeXML(session4)}
      </div>
    </foreignObject>

    <!-- Section V: Remarks Ribbon -->
    <rect x="30" y="1265" width="1320" height="34" fill="#002776" />
    <text x="690" y="1288" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">
      V. REMARKS &amp; FORMATIVE ASSESSMENT TRACKING
    </text>
    <rect x="30" y="1299" width="1320" height="110" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <text x="45" y="1325" font-size="12" fill="#000000">1. No. of learners who earned 80% on the formative assessment: _______</text>
    <text x="45" y="1350" font-size="12" fill="#000000">2. No. of learners who require additional activities for remediation: _______</text>
    <text x="45" y="1375" font-size="12" fill="#000000">3. Remediation strategy implemented: Targeted peer mentoring and differentiated scaffold worksheets.</text>
    <text x="45" y="1400" font-size="12" fill="#000000">4. Did the remedial lessons work? No. of learners who caught up with the lesson: _______</text>

    <!-- Section VI: Reflection Ribbon -->
    <rect x="30" y="1425" width="1320" height="34" fill="#002776" />
    <text x="690" y="1448" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">
      VI. REFLECTION &amp; INSTRUCTIONAL SUPERVISION
    </text>
    <rect x="30" y="1459" width="1320" height="210" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <text x="45" y="1485" font-size="12" font-weight="bold" fill="#000000">A. Which of my teaching strategies worked well? Why did these work?</text>
    <text x="65" y="1508" font-size="11.5" font-style="italic" fill="#334155">Collaborative inquiry and authentic task-based modeling stimulated active participation and higher concept retention.</text>

    <text x="45" y="1545" font-size="12" font-weight="bold" fill="#000000">B. What difficulties did I encounter which my principal or supervisor can help me solve?</text>
    <text x="65" y="1568" font-size="11.5" font-style="italic" fill="#334155">Access to supplementary digital tools and high-volume printed learning activity sheets for differentiated tracks.</text>

    <text x="45" y="1605" font-size="12" font-weight="bold" fill="#000000">C. What innovation or localized materials did I use/discover which I wish to share with other teachers?</text>
    <text x="65" y="1628" font-size="11.5" font-style="italic" fill="#334155">Contextualized Region X workplace exemplars and interactive competency check-ins.</text>

    <!-- Signatures -->
    <rect x="30" y="1690" width="440" height="180" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <text x="45" y="1715" font-size="12" font-weight="bold" fill="#475569">Prepared by:</text>
    <text x="250" y="1800" font-size="14" font-weight="bold" fill="#002776" text-anchor="middle">${escapeXML(teacher)}</text>
    <line x1="60" y1="1810" x2="440" y2="1810" stroke="#000000" stroke-width="1.2" />
    <text x="250" y="1832" font-size="10.5" fill="#475569" text-anchor="middle">Special Science Teacher II / Subject Teacher</text>

    <rect x="470" y="1690" width="440" height="180" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <text x="485" y="1715" font-size="12" font-weight="bold" fill="#475569">Checked by:</text>
    <text x="690" y="1800" font-size="14" font-weight="bold" fill="#002776" text-anchor="middle">MASTER TEACHER / HEAD TEACHER</text>
    <line x1="500" y1="1810" x2="880" y2="1810" stroke="#000000" stroke-width="1.2" />
    <text x="690" y="1832" font-size="10.5" fill="#475569" text-anchor="middle">Department Head, SHS Academic Track</text>

    <rect x="910" y="1690" width="440" height="180" fill="#ffffff" stroke="#000000" stroke-width="1" />
    <text x="925" y="1715" font-size="12" font-weight="bold" fill="#475569">Noted by:</text>
    <text x="1130" y="1800" font-size="14" font-weight="bold" fill="#002776" text-anchor="middle">${escapeXML(principal.toUpperCase())}</text>
    <line x1="940" y1="1810" x2="1320" y2="1810" stroke="#000000" stroke-width="1.2" />
    <text x="1130" y="1832" font-size="10.5" fill="#475569" text-anchor="middle">Secondary School Principal IV / School Head</text>

    <!-- Footer Page 2 -->
    <line x1="30" y1="1900" x2="1350" y2="1900" stroke="#cbd5e1" stroke-width="1" />
    <text x="30" y="1922" font-size="10" fill="#64748b" font-family="'Courier New', monospace">
      Document Code: DEPED-ROX-LDN-ILAW-2026 | Verified Official Record | Quality Assured Instructional Material
    </text>
    <text x="1350" y="1922" font-size="10" font-weight="bold" fill="#64748b" text-anchor="end" font-family="'Courier New', monospace">
      Page 2 of 2
    </text>
  </g>
</svg>
    `.trim();
  };

  const handleExportPDF = async (mode: PDFExportMode = pdfExportMode) => {
    setIsExportingPDF(true);
    try {
      const exportData: DepEdILAWExportData = {
        school,
        teacher,
        section,
        dates,
        division,
        region,
        principal,
        subject: selectedSubject,
        term: selectedTerm,
        week: activeEntry?.week || 'Week 1',
        topic: activeEntry?.topic || 'Curriculum Competency Focus',
        code: activeEntry?.code || 'SHS-2026',
        contentStandard,
        performanceStandard,
        learningCompetency,
        enablingCompetencies,
        session1,
        session2,
        session3,
        session4,
        resources,
        integration,
        lasBg: activeEntry?.lasBg,
        lasA1: activeEntry?.lasA1,
        lasA2: activeEntry?.lasA2,
        lasA3: activeEntry?.lasA3,
      };

      await exportDepEdRegionXPDF(exportData, mode);
      const label = mode === 'full' ? 'Full Packet (ILAW & LAS)' : mode === 'ilaw' ? 'ILAW Plan' : 'LAS Sheet';
      setPdfSuccessMessage(`✓ Exported DepEd Region X Formal PDF (${label}) successfully with LNNCHS and DepEd Seals!`);
      setTimeout(() => setPdfSuccessMessage(null), 4500);
    } catch (err: any) {
      console.error('PDF export error:', err);
      alert('Unable to generate PDF document: ' + (err?.message || 'Please try again.'));
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleBatchExportPDF = async () => {
    setIsExportingPDF(true);
    try {
      const subjectTerms = bowData[selectedSubject] || {};
      const allEntries: DepEdILAWExportData[] = [];

      Object.entries(subjectTerms).forEach(([termKey, entries]) => {
        entries.forEach((entry) => {
          allEntries.push({
            school,
            teacher,
            section,
            dates: `Term ${termKey} - ${entry.week}`,
            division,
            region,
            principal,
            subject: selectedSubject,
            term: termKey,
            week: entry.week,
            topic: entry.topic,
            code: entry.code,
            contentStandard: entry.contentStandard,
            performanceStandard: entry.performanceStandard,
            learningCompetency: `[${entry.code}] ${entry.learningCompetency}`,
            enablingCompetencies: entry.enablingCompetencies,
            session1: entry.s1,
            session2: entry.s2,
            session3: entry.s3,
            session4: entry.s4,
            resources,
            integration,
            lasBg: entry.lasBg,
            lasA1: entry.lasA1,
            lasA2: entry.lasA2,
            lasA3: entry.lasA3,
          });
        });
      });

      if (allEntries.length === 0) {
        alert('No lesson plans found for batch export.');
        setIsExportingPDF(false);
        return;
      }

      await exportBatchDepEdRegionXPDF(allEntries, `Consolidated ILAW Lesson Plans — ${selectedSubject} (SY 2026-2027)`);
      setPdfSuccessMessage(`✓ Exported Batch PDF (${allEntries.length} Lesson Plans with DepEd Region X Cover Page, Table of Contents, and LNNCHS/DepEd Seals) successfully!`);
      setTimeout(() => setPdfSuccessMessage(null), 6000);
    } catch (err: any) {
      console.error('Batch PDF export error:', err);
      alert('Unable to generate batch PDF document: ' + (err?.message || 'Please try again.'));
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleCopySVG = () => {
    const svgCode = generateFigmaSVGString();
    navigator.clipboard.writeText(svgCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleDownloadSVG = () => {
    const svgCode = generateFigmaSVGString();
    const blob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ILAW_${selectedSubject.replace(/\s+/g, '_')}_Term${selectedTerm}_Figma_Vector.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(bowData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DepEd_Grade11_ThreeTerm_BOW_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (typeof parsed === 'object' && Object.keys(parsed).length > 0) {
          setBowData(parsed);
          alert('✓ Custom Budget of Work (BOW) database successfully loaded!');
        }
      } catch (err: any) {
        alert('Invalid JSON file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {pdfSuccessMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between shadow-xs animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{pdfSuccessMessage}</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-normal">Official DepEd Region X Document</span>
        </div>
      )}

      {/* Primary Top Tab Switcher: ILAW Generator Form vs. My ILAW Generated Lesson Plan */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-100/90 p-2 rounded-2xl border border-stone-200">
        <div className="inline-flex p-1 rounded-xl bg-stone-200/80 border border-stone-300/60 shadow-2xs">
          <button
            onClick={() => setActiveMainTab('form')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
              activeMainTab === 'form'
                ? 'bg-white text-[#002776] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileText className="w-4 h-4 text-[#002776]" />
            <span>ILAW Generator Form</span>
          </button>

          <button
            onClick={() => {
              const plan = ensureGeneratedPlan();
              if (onPlanGenerated) {
                onPlanGenerated(plan);
              }
              if (onNavigateToGenerated) {
                onNavigateToGenerated();
              } else {
                setActiveMainTab('generated');
              }
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
              activeMainTab === 'generated'
                ? 'bg-[#002776] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#FCD116]" />
            <span>My ILAW Generated Lesson Plan</span>
            <span className="px-2 py-0.5 rounded-full bg-[#CE1126] text-white text-[10px] font-extrabold uppercase tracking-wide">
              DO 3 s. 2026
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs flex-wrap">
          <span className="font-semibold text-stone-600 hidden sm:inline">Active Target:</span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 font-bold text-stone-800 shadow-2xs">
            {selectedSubject}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 font-bold text-[#002776]">
            {selectedTerm}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-300 font-bold text-emerald-800">
            {computedDate}
          </span>
          {versionStatus === 'Teacher Edited' ? (
            <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 font-bold flex items-center gap-1.5 shadow-2xs">
              <Pencil className="w-3.5 h-3.5 text-amber-700" />
              <span>Version: Teacher Edited</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-[#002776] border border-blue-300 font-bold flex items-center gap-1.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0038A8]" />
              <span>Version: AI Generated</span>
            </span>
          )}
        </div>
      </div>

      {activeMainTab === 'generated' ? (
        <MyGeneratedILAWView
          plan={do3Plan}
          onNavigateToForm={() => setActiveMainTab('form')}
          onExportDocx={handleExportDO3Docx}
          onExportPptx={handleExportDO3Pptx}
          onExportPdf={handleExportDO3Pdf}
          onRegenerateAI={handleRequestRegenerate}
          versionStatus={versionStatus}
          isExportingDocx={isExportingDocx}
          isExportingPptx={isExportingPptx}
          isExportingPdf={isExportingPDF}
          onUpdatePlan={(updatedPlan) => {
            setDo3Plan(updatedPlan);
            setVersionStatus('Teacher Edited');
          }}
        />
      ) : (
        <>
          {/* Top Banner - DepEd Blue, Gold, and Red */}
          <div className="bg-[#0038A8] text-white rounded-3xl p-6 sm:p-8 shadow-xs space-y-4 border-b-4 border-[#FCD116]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-[#CE1126] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  DepEd Region X (Northern Mindanao)
                </span>
                <span className="text-xs text-blue-100">
                  LNNCHS Unified ILAW &amp; Learning Activity Sheet (LAS)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FCD116] text-[#0038A8] text-xs font-bold shadow-xs">
                  📐 Figma / SVG Vector Ready
                </span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
              Unified ILAW &amp; LAS Generator (Grade 11 Strengthened SHS)
            </h2>

            <p className="text-xs sm:text-sm text-blue-100 max-w-3xl leading-relaxed">
              Generates official Region X <strong>Instructional Leadership and Academic Workflow (ILAW)</strong> lesson exemplars with four-session lesson procedures, paired with authentic <strong>Learning Activity Sheets (LAS)</strong>. Supports instant export as vector <strong>SVG / Figma code</strong>, A4 print, and standalone offline Android web asset deployment.
            </p>

            {/* Quick Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 text-xs no-print">
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/15">
                <strong className="text-[#FCD116] block mb-0.5">4 Prescribed Disciplines</strong>
                <span className="text-blue-100 text-[11px]">Effective Comm, Gen Math, Gen Sci, Life &amp; Career Skills</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/15">
                <strong className="text-white block mb-0.5">Region X Matrix</strong>
                <span className="text-blue-100 text-[11px]">LNNCHS 4-session daily lesson exemplar flow</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/15">
                <strong className="text-[#FCD116] block mb-0.5">Figma &amp; Canva SVG</strong>
                <span className="text-blue-100 text-[11px]">Vector copy/paste directly into Figma canvas</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/15">
                <strong className="text-white block mb-0.5">Offline Asset Ready</strong>
                <span className="text-blue-100 text-[11px]">Saved in app/src/main/assets/web/ilaw/</span>
              </div>
            </div>
          </div>

          {/* DepEd Quality Assurance & Validation Dashboard */}
          <ValidationDashboard
            checks={getValidationChecks()}
            onFocusField={handleFocusField}
            onRepairDefaults={handleRepairDefaults}
            isExpanded={isValidationDashboardExpanded}
            onToggleExpand={() => setIsValidationDashboardExpanded(!isValidationDashboardExpanded)}
          />

          {/* 9-Field ILAW Generator Form Panel */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-5 no-print">
            <div className="flex flex-wrap items-center justify-between pb-3 border-b border-stone-200 gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0038A8] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">DepEd ILAW Curriculum &amp; Teaching Configuration</h3>
                  <p className="text-[11px] text-stone-500">Wired to DepEd Order 009, s. 2026 Three-Term Calendar &amp; DO 015, s. 2026 Strengthened SHS BOW</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#0038A8] border border-blue-200 text-[11px] font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0038A8]" />
                  Official DepEd ROX Standards
                </span>
                {versionStatus === 'Teacher Edited' ? (
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold flex items-center gap-1">
                    <Pencil className="w-3.5 h-3.5 text-amber-700" />
                    <span>Version: Teacher Edited</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-blue-100 text-[#002776] border border-blue-300 text-[11px] font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#0038A8]" />
                    <span>Version: AI Generated</span>
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* 1. Grade Level */}
              <div id="field-grade-container">
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  1. Grade Level
                </label>
                <select
                  id="field-grade"
                  value={selectedGrade}
                  onChange={(e) => handleGradeChange(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-semibold text-stone-800 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all ${
                    highlightedField === 'field-grade' ? 'ring-4 ring-amber-400 border-amber-500 bg-amber-100 animate-pulse' : ''
                  }`}
                >
                  {distinctGrades.map((g) => (
                    <option key={g} value={g}>{g} {g === 'Grade 11' ? '(Strengthened SHS)' : ''}</option>
                  ))}
                </select>
              </div>

              {/* 2. Subject */}
              <div id="field-subject-container">
                <label className="text-xs font-bold text-stone-700 block mb-1 flex items-center justify-between">
                  <span>2. Subject / Learning Area</span>
                  {!selectedSubject && <span className="text-[10px] text-amber-600 font-bold">⚠️ Required</span>}
                </label>
                <select
                  id="field-subject"
                  value={selectedSubject}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-semibold text-stone-800 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all ${
                    !selectedSubject ? 'border-amber-400 bg-amber-50/60' : ''
                  } ${highlightedField === 'field-subject' ? 'ring-4 ring-amber-400 border-amber-500 bg-amber-100 animate-pulse' : ''}`}
                >
                  {availableSubjects.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              {/* 3. Term */}
              <div id="field-term-container">
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  3. Term <span className="text-[#0038A8] font-normal">(DO 009, s. 2026 Trimester)</span>
                </label>
                <select
                  id="field-term"
                  value={selectedTerm}
                  onChange={(e) => handleTermChange(e.target.value as 'Term 1' | 'Term 2' | 'Term 3')}
                  className={`w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-semibold text-stone-800 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all ${
                    highlightedField === 'field-term' ? 'ring-4 ring-amber-400 border-amber-500 bg-amber-100 animate-pulse' : ''
                  }`}
                >
                  {availableTerms.map((t) => {
                    const cfg = DEPED_2026_CALENDAR_CONFIG[t];
                    return (
                      <option key={t} value={t}>
                        {t} ({cfg?.startDate} to {cfg?.endDate})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* 4. Competency and TERM EXACT BASED ON BOW */}
              <div id="field-bow-container" className="sm:col-span-2 lg:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-stone-700">
                    4. Competency &amp; BOW Entry Selection
                  </label>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1 border border-emerald-300 shadow-2xs">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    real BOW data
                  </span>
                </div>
                <select
                  id="field-bow"
                  value={selectedWeekIndex}
                  onChange={(e) => setSelectedWeekIndex(Number(e.target.value))}
                  className={`w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-semibold text-stone-800 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all ${
                    highlightedField === 'field-bow' ? 'ring-4 ring-amber-400 border-amber-500 bg-amber-100 animate-pulse' : ''
                  }`}
                >
                  {availableCompetencies.map((entry, idx) => (
                    <option key={idx} value={idx}>
                      {entry.weekLabel || `Week ${entry.week}`} — {entry.topic} ({entry.hours || 4} na Oras)
                    </option>
                  ))}
                </select>
              </div>

              {/* 5. Date */}
              <div id="field-dates-container">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-stone-700">
                    5. Date <span className="text-stone-400 font-normal">(DO 009, s. 2026 Calendar)</span>
                  </label>
                  <span className="text-[10px] text-blue-700 font-semibold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                    Auto-computed
                  </span>
                </div>
                <input
                  id="field-dates"
                  type="text"
                  value={computedDate || dates}
                  onChange={(e) => {
                    setComputedDate(e.target.value);
                    setDates(e.target.value);
                    markTeacherEdited();
                  }}
                  className={`w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-100 font-bold text-[#002776] focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all ${
                    !computedDate && !dates ? 'border-amber-400 bg-amber-50/60' : ''
                  } ${highlightedField === 'field-dates' ? 'ring-4 ring-amber-400 border-amber-500 bg-amber-100 animate-pulse' : ''}`}
                  title="Auto-computed teaching dates based on DepEd Order 009, s. 2026 calendar"
                />
              </div>

              {/* 6. Lesson title */}
              <div id="field-topic-container">
                <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1 flex items-center justify-between">
                  <span>6. Lesson Title / Topic</span>
                  {!lessonTitle && !activeBOWEntry?.topic && <span className="text-[10px] text-amber-600 font-bold">⚠️ Missing</span>}
                </label>
                <input
                  id="field-topic"
                  type="text"
                  value={lessonTitle}
                  onChange={(e) => {
                    setLessonTitle(e.target.value);
                    markTeacherEdited();
                  }}
                  placeholder={activeBOWEntry?.topic || 'Enter custom lesson title'}
                  className={`w-full p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-medium text-xs text-stone-800 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all ${
                    highlightedField === 'field-topic' ? 'ring-4 ring-amber-400 border-amber-500 bg-amber-100 animate-pulse' : ''
                  }`}
                />
              </div>

              {/* 7. Teacher */}
              <div id="field-teacher-container">
                <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1 flex items-center justify-between">
                  <span>7. Teacher-Developer Name</span>
                  {!teacher && <span className="text-[10px] text-amber-600 font-bold">⚠️ Required</span>}
                </label>
                <input
                  id="field-teacher"
                  type="text"
                  value={teacher}
                  onChange={(e) => {
                    setTeacher(e.target.value);
                    markTeacherEdited();
                  }}
                  className={`w-full p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-medium text-xs text-stone-800 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all ${
                    !teacher ? 'border-amber-400 bg-amber-50/60' : ''
                  } ${highlightedField === 'field-teacher' ? 'ring-4 ring-amber-400 border-amber-500 bg-amber-100 animate-pulse' : ''}`}
                />
              </div>

              {/* 8. Grade & Section */}
              <div id="field-section-container">
                <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1 flex items-center justify-between">
                  <span>8. Grade Level &amp; Section</span>
                  {!section && <span className="text-[10px] text-amber-600 font-bold">⚠️ Required</span>}
                </label>
                <input
                  id="field-section"
                  type="text"
                  value={section}
                  onChange={(e) => {
                    setSection(e.target.value);
                    markTeacherEdited();
                  }}
                  className={`w-full p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-medium text-xs text-stone-800 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all ${
                    !section ? 'border-amber-400 bg-amber-50/60' : ''
                  } ${highlightedField === 'field-section' ? 'ring-4 ring-amber-400 border-amber-500 bg-amber-100 animate-pulse' : ''}`}
                />
              </div>

              {/* 9. School */}
              <div id="field-school-container" className="sm:col-span-2 lg:col-span-3">
                <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1 flex items-center justify-between">
                  <span>9. School Name &amp; Division</span>
                  {!school && <span className="text-[10px] text-amber-600 font-bold">⚠️ Required</span>}
                </label>
                <input
                  id="field-school"
                  type="text"
                  value={school}
                  onChange={(e) => {
                    setSchool(e.target.value);
                    markTeacherEdited();
                  }}
                  className={`w-full p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-medium text-xs text-stone-800 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all ${
                    !school ? 'border-amber-400 bg-amber-50/60' : ''
                  } ${highlightedField === 'field-school' ? 'ring-4 ring-amber-400 border-amber-500 bg-amber-100 animate-pulse' : ''}`}
                />
              </div>
            </div>

            {/* Editable Curriculum Standards & Four-Session Daily Procedures Editor */}
            <div className="pt-4 border-t border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#0038A8]" />
                  <span>Editable Curriculum Standards &amp; 4-Session Procedures</span>
                </h4>
                <span className="text-[11px] text-stone-500 font-medium">Auto-populates from BOW database; fully customizable</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Content Standard */}
                <div id="field-content-standard-container" className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-700 block flex items-center justify-between">
                    <span>A. Content Standard</span>
                    {!contentStandard && <span className="text-[10px] text-amber-600 font-bold">⚠️ Missing</span>}
                  </label>
                  <textarea
                    id="field-content-standard"
                    rows={3}
                    value={contentStandard}
                    onChange={(e) => {
                      setContentStandard(e.target.value);
                      markTeacherEdited();
                    }}
                    className={`w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-normal text-stone-800 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all ${
                      !contentStandard ? 'border-amber-400 bg-amber-50/60' : ''
                    } ${highlightedField === 'field-content-standard' ? 'ring-4 ring-amber-400 border-amber-500 bg-amber-100 animate-pulse' : ''}`}
                    placeholder="Enter Content Standard..."
                  />
                </div>

                {/* Performance Standard */}
                <div id="field-performance-standard-container" className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-700 block flex items-center justify-between">
                    <span>B. Performance Standard</span>
                    {!performanceStandard && <span className="text-[10px] text-amber-600 font-bold">⚠️ Missing</span>}
                  </label>
                  <textarea
                    id="field-performance-standard"
                    rows={3}
                    value={performanceStandard}
                    onChange={(e) => {
                      setPerformanceStandard(e.target.value);
                      markTeacherEdited();
                    }}
                    className={`w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-normal text-stone-800 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all ${
                      !performanceStandard ? 'border-amber-400 bg-amber-50/60' : ''
                    } ${highlightedField === 'field-performance-standard' ? 'ring-4 ring-amber-400 border-amber-500 bg-amber-100 animate-pulse' : ''}`}
                    placeholder="Enter Performance Standard..."
                  />
                </div>

                {/* Learning Competency */}
                <div id="field-competency-container" className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-700 block flex items-center justify-between">
                    <span>C. Learning Competency (MELC)</span>
                    {!learningCompetency && <span className="text-[10px] text-amber-600 font-bold">⚠️ Missing</span>}
                  </label>
                  <textarea
                    id="field-competency"
                    rows={3}
                    value={learningCompetency}
                    onChange={(e) => {
                      setLearningCompetency(e.target.value);
                      markTeacherEdited();
                    }}
                    className={`w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-bold text-[#002776] focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all ${
                      !learningCompetency ? 'border-amber-400 bg-amber-50/60' : ''
                    } ${highlightedField === 'field-competency' ? 'ring-4 ring-amber-400 border-amber-500 bg-amber-100 animate-pulse' : ''}`}
                    placeholder="Enter MELC & Code..."
                  />
                </div>
              </div>

              {/* 4-Session Daily Procedures Preview & Quick Editor */}
              <div id="field-procedures-container" className="space-y-2 pt-2">
                <label className="text-[11px] font-bold text-stone-700 block flex items-center justify-between">
                  <span>D. Four-Session Daily Procedures (Sessions 1–4)</span>
                  {(!session1 || !session2 || !session3 || !session4) && (
                    <span className="text-[10px] text-amber-600 font-bold">⚠️ Some sessions incomplete</span>
                  )}
                </label>
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-stone-50 border border-stone-200 transition-all ${
                  highlightedField === 'field-procedures' ? 'ring-4 ring-amber-400 border-amber-500 bg-amber-100 animate-pulse' : ''
                }`}>
                  <div>
                    <span className="text-[10px] font-bold text-blue-900 block mb-1">Session 1 (Day 1) Elicit/Engage</span>
                    <textarea
                      rows={2}
                      value={session1}
                      onChange={(e) => {
                        setSession1(e.target.value);
                        markTeacherEdited();
                      }}
                      className="w-full text-[11px] p-2 rounded-lg border border-stone-300 bg-white"
                      placeholder="Session 1 activities..."
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-900 block mb-1">Session 2 (Day 2) Explore/Explain</span>
                    <textarea
                      rows={2}
                      value={session2}
                      onChange={(e) => {
                        setSession2(e.target.value);
                        markTeacherEdited();
                      }}
                      className="w-full text-[11px] p-2 rounded-lg border border-stone-300 bg-white"
                      placeholder="Session 2 activities..."
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-900 block mb-1">Session 3 (Day 3) Elaborate/Deepen</span>
                    <textarea
                      rows={2}
                      value={session3}
                      onChange={(e) => {
                        setSession3(e.target.value);
                        markTeacherEdited();
                      }}
                      className="w-full text-[11px] p-2 rounded-lg border border-stone-300 bg-white"
                      placeholder="Session 3 activities..."
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-900 block mb-1">Session 4 (Day 4) Evaluate/Extend</span>
                    <textarea
                      rows={2}
                      value={session4}
                      onChange={(e) => {
                        setSession4(e.target.value);
                        markTeacherEdited();
                      }}
                      className="w-full text-[11px] p-2 rounded-lg border border-stone-300 bg-white"
                      placeholder="Session 4 activities..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* BOISER Master Direct-Output Control Panel */}
            <div className="p-5 sm:p-6 bg-stone-50/70 border border-blue-100 rounded-3xl space-y-4 no-print">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* 1. Direct Result Mode Toggle */}
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center">
                    <button
                      type="button"
                      onClick={() => setDirectResultMode(!directResultMode)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        directResultMode ? 'bg-teal-600' : 'bg-stone-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          directResultMode ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-800 block">DIRECT RESULT MODE</span>
                    <span className="text-[10px] text-stone-500 block">Instantly launch full output dashboard upon generation</span>
                  </div>
                </div>

                {/* 2. Generation Mode Selector */}
                <div className="flex items-center gap-2 bg-stone-100 border border-stone-200 p-1 rounded-2xl">
                  {(['quick', 'standard', 'complete'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setGenerationMode(mode)}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all duration-200 cursor-pointer ${
                        generationMode === mode
                          ? 'bg-[#002776] text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

              </div>

              {/* 3. Action Buttons & Description */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-blue-100/40">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleGenerateDO3AI}
                    disabled={isGeneratingDO3}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 via-[#002776] to-[#001c54] hover:from-teal-700 hover:to-blue-900 text-white font-black text-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 border border-teal-400/30"
                  >
                    <Sparkles className="w-5 h-5 text-[#FCD116]" />
                    <span>⚡ GENERATE EVERYTHING (ILAW + PPT)</span>
                    <span className="px-2 py-0.5 rounded-full bg-teal-400 text-slate-950 text-[9px] font-black uppercase tracking-wider">
                      Auto-Aligned
                    </span>
                  </button>

                  <button
                    onClick={handleRequestRegenerate}
                    disabled={isGeneratingDO3}
                    className="px-4 py-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs shadow-xs transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    title="Regenerate this ILAW Plan with AI"
                  >
                    {isGeneratingDO3 ? <Loader2 className="w-4 h-4 animate-spin text-amber-700" /> : <RotateCcw className="w-4 h-4 text-amber-700" />}
                    <span>Regenerate with AI</span>
                  </button>
                </div>

                <p className="text-xs text-stone-500 text-center sm:text-right max-w-xs">
                  Generates full lesson package: Matrix, LAS 1–4, presentation slides, answers, &amp; gradebook.
                </p>
              </div>
            </div>
          </div>

        {/* Global Toolbar */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3 no-print">
          <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex p-1 rounded-2xl bg-stone-100 border border-stone-200 text-xs flex-wrap gap-1">
            <button
              onClick={() => setViewMode('four_day')}
              className={`px-3.5 py-1.5 rounded-xl font-black transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'four_day' ? 'bg-[#002776] text-white shadow-md ring-2 ring-[#FCD116]' : 'text-stone-700 hover:text-stone-900 bg-white/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FCD116]" />
              <span>📑 4-Day Session &amp; LAS (A4 Format)</span>
            </button>
            <button
              onClick={() => setViewMode('do3')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'do3' ? 'bg-[#002776] text-white shadow-xs' : 'text-stone-700 hover:text-stone-900 bg-white/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FCD116]" />
              <span>DO 3, s. 2026 (4-Part)</span>
            </button>
            <button
              onClick={() => setViewMode('ilaw')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'ilaw' ? 'bg-blue-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Region X 2-Page Matrix</span>
            </button>
            <button
              onClick={() => setViewMode('las')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'las' ? 'bg-teal-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Activity Sheet (LAS)</span>
            </button>
            <button
              onClick={() => setViewMode('svg')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'svg' ? 'bg-purple-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Figma / SVG Vector</span>
            </button>
            <button
              onClick={() => setViewMode('assets')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'assets' ? 'bg-amber-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Offline Asset Info</span>
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* DO 3 Export Fast Buttons */}
            <button
              onClick={() => withExportValidation(handleExportDO3Docx)}
              disabled={isExportingDocx}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#002776] text-white hover:text-[#FCD116] text-xs font-bold transition cursor-pointer shadow-xs disabled:opacity-50"
              title="Download complete DepEd DO 3, s. 2026 Word Document (.docx) with all tables & rubrics"
            >
              {isExportingDocx ? <Loader2 className="w-3.5 h-3.5 animate-spin text-[#FCD116]" /> : <FileText className="w-3.5 h-3.5 text-[#FCD116]" />}
              <span>Word (.docx)</span>
            </button>

            <button
              onClick={() => withExportValidation(handleExportDO3Pptx)}
              disabled={isExportingPptx}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-700 text-white hover:text-amber-300 text-xs font-bold transition cursor-pointer shadow-xs disabled:opacity-50"
              title="Download companion PowerPoint presentation (.pptx) with >= 35pt body text"
            >
              {isExportingPptx ? <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-300" /> : <Presentation className="w-3.5 h-3.5 text-amber-300" />}
              <span>Slides (.pptx)</span>
            </button>

            {/* Formal DepEd PDF Export Group */}
            <div className="inline-flex items-center rounded-xl bg-[#0038A8] p-0.5 shadow-sm">
              <select
                value={pdfExportMode}
                onChange={(e) => setPdfExportMode(e.target.value as PDFExportMode)}
                aria-label="Select PDF Export Scope"
                className="text-[11px] font-bold bg-[#002776] text-white py-1.5 px-2.5 rounded-lg border-none focus:outline-none cursor-pointer"
              >
                <option value="full">Full Packet (ILAW + LAS • 3 Pgs)</option>
                <option value="ilaw">ILAW Plan Only (2 Pgs)</option>
                <option value="las">LAS Activity Sheet (1 Pg)</option>
              </select>

              <button
                onClick={() => withExportValidation(() => handleExportPDF(pdfExportMode))}
                disabled={isExportingPDF}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white hover:text-[#FCD116] transition cursor-pointer disabled:opacity-50"
                title="Generate and download official DepEd Region X PDF Document"
              >
                {isExportingPDF ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#FCD116]" />
                ) : (
                  <FileDown className="w-3.5 h-3.5 text-[#FCD116]" />
                )}
                <span>{isExportingPDF ? 'Generating...' : 'Export PDF'}</span>
              </button>
            </div>

            <button
              onClick={() => withExportValidation(handleBatchExportPDF)}
              disabled={isExportingPDF}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition cursor-pointer shadow-sm disabled:opacity-50"
              title="Batch export all lesson plans in this subject as a single organized PDF with DepEd Region X summary cover page & Table of Contents"
            >
              {isExportingPDF ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Layers className="w-3.5 h-3.5" />
              )}
              <span>Batch Export All Plans ({selectedSubject})</span>
            </button>

            <a
              href="/ilaw/ilaw-generator.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0038A8] border border-blue-200 text-xs font-semibold transition cursor-pointer"
              title="Launch the exact standalone HTML ILAW generator tool in a new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#0038A8]" />
              <span>Standalone HTML</span>
            </a>

            <a
              href="/ilaw/curriculum-engine.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-semibold transition cursor-pointer"
              title="Launch the exact standalone Curriculum Engine dashboard in a new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-teal-800" />
              <span>Curriculum Engine</span>
            </a>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>Print A4</span>
            </button>
            <button
              onClick={handleCopyFormattedText}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 text-[#0038A8] hover:bg-blue-100 border border-blue-200 text-xs font-semibold transition cursor-pointer"
              title="Copy the complete, official 2-part ILAW lesson plan text to clipboard"
            >
              {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedText ? 'Copied ILAW Text!' : 'Copy Formatted Text'}</span>
            </button>
            <button
              onClick={handleCopySVG}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200 text-xs font-semibold transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied SVG!' : 'Copy SVG for Figma'}</span>
            </button>
            <button
              onClick={handleDownloadSVG}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-stone-600" />
              <span>.SVG</span>
            </button>
          </div>
        </div>

        {/* Success / Notification Banner */}
        {pdfSuccessMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-xs flex items-center justify-between gap-2 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">{pdfSuccessMessage}</span>
            </div>
            <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
              DepEd DO 3, s. 2026 Ready
            </span>
          </div>
        )}
      </div>

      {/* VIEW 0: 4-Day Session with Combined LAS (A4 Format) */}
      {viewMode === 'four_day' && (
        <FourDayCombinedILAWView
          plan={do3Plan}
          onExportDocx={handleExportDO3Docx}
          onExportPdf={handleExportDO3Pdf}
        />
      )}

      {/* VIEW 0.5: DepEd DO 3, s. 2026 Complete 4-Part Standard Format */}
      {viewMode === 'do3' && (
        <DO3ILAWView
          plan={do3Plan}
          onExportDocx={handleExportDO3Docx}
          onExportPptx={handleExportDO3Pptx}
          onExportPdf={handleExportDO3Pdf}
          onGenerateAI={handleRequestRegenerate}
          versionStatus={versionStatus}
          isGenerating={isGeneratingDO3}
          isExportingDocx={isExportingDocx}
          isExportingPptx={isExportingPptx}
          isExportingPdf={isExportingPDF}
        />
      )}

      {/* VIEW 1: Official Region X ILAW Template (2-Page Format) */}
      {viewMode === 'ilaw' && (
        <div className="space-y-8 print:space-y-0">
          {/* Top Control Bar for View Selector */}
          <div className="bg-white rounded-2xl p-4 border border-stone-300 shadow-xs flex flex-wrap items-center justify-between gap-3 print:hidden">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-[#002776] text-white text-xs font-bold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#FCD116]" />
                Official DepEd Region X Format
              </span>
              <span className="text-xs text-stone-500 hidden sm:inline">
                DepEd Order No. 009 &amp; 015, s. 2026 • 2-Part Structured Layout
              </span>
            </div>

            {/* Page View Toggles */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActivePagePreview('both')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  activePagePreview === 'both' ? 'bg-white text-[#002776] font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Both Pages
              </button>
              <button
                type="button"
                onClick={() => setActivePagePreview('page1')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  activePagePreview === 'page1' ? 'bg-white text-[#002776] font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Page 1 (Part 1)
              </button>
              <button
                type="button"
                onClick={() => setActivePagePreview('page2')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  activePagePreview === 'page2' ? 'bg-white text-[#002776] font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Page 2 (Part 2)
              </button>
            </div>

            {/* Fast Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyFormattedText}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-[#002776] hover:bg-blue-100 border border-blue-200 text-xs font-bold transition shadow-xs cursor-pointer"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText ? 'Copied!' : 'Copy Formatted Text'}</span>
              </button>
              <button
                onClick={() => handleExportPDF('ilaw')}
                disabled={isExportingPDF}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#002776] hover:bg-[#001c54] text-white text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isExportingPDF ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileDown className="w-3.5 h-3.5 text-[#FCD116]" />}
                <span>Export 2-Page PDF</span>
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-stone-600" />
                <span>Print A4</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SHEET 1: PART 1 (OBJECTIVES, CONTENT, RESOURCES, SESSIONS 1 & 2)           */}
          {/* ========================================================================= */}
          {(activePagePreview === 'both' || activePagePreview === 'page1') && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-300 shadow-sm space-y-4 print:shadow-none print:border-none print:p-0 print:break-after-page">
              {/* DepEd Accent Color Bars */}
              <div className="space-y-0.5">
                <div className="w-full h-1.5 bg-[#0038A8] rounded-t-sm"></div>
                <div className="w-full h-0.5 bg-[#FCD116]"></div>
              </div>

              {/* DepEd Region X Header */}
              <div className="text-center space-y-0.5 pt-2 pb-2">
                <div className="text-[10px] tracking-wider uppercase font-semibold text-stone-500">
                  REPUBLIC OF THE PHILIPPINES
                </div>
                <div className="text-base font-bold text-[#002776] tracking-wide uppercase">
                  DEPARTMENT OF EDUCATION
                </div>
                <div className="text-xs font-semibold text-stone-700 uppercase">
                  {region.toUpperCase()} • {division.toUpperCase()}
                </div>
                <div className="text-sm font-bold font-serif text-[#002776] uppercase tracking-wide">
                  {school.toUpperCase()}
                </div>
                <div className="mt-2.5 bg-[#002776] text-white py-1 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xs rounded-xs">
                  INSTRUCTIONAL LEADERSHIP AND ACADEMIC WORKFLOW (ILAW) — PART 1
                </div>
                <div className="text-[10.5px] text-stone-600 italic pt-0.5">
                  Three-Term Calendar (DepEd Order No. 009, s. 2026) | Strengthened SHS Curriculum (DO No. 015, s. 2026)
                </div>
              </div>

              {/* Meta Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-stone-400">
                  <tbody>
                    <tr>
                      <th className="p-2 border border-stone-400 bg-stone-100 font-bold w-40 text-stone-900">TEACHER</th>
                      <td className="p-2 border border-stone-400 font-bold text-stone-900">{teacher}</td>
                      <th className="p-2 border border-stone-400 bg-stone-100 font-bold w-40 text-stone-900">LEARNING AREA</th>
                      <td className="p-2 border border-stone-400 font-bold text-[#002776]">{selectedSubject}</td>
                    </tr>
                    <tr>
                      <th className="p-2 border border-stone-400 bg-stone-100 font-bold text-stone-900">TEACHING DATES</th>
                      <td className="p-2 border border-stone-400 text-stone-800">{dates}</td>
                      <th className="p-2 border border-stone-400 bg-stone-100 font-bold text-stone-900">GRADE &amp; SECTION</th>
                      <td className="p-2 border border-stone-400 text-stone-800">{section}</td>
                    </tr>
                    <tr>
                      <th className="p-2 border border-stone-400 bg-stone-100 font-bold text-stone-900">GRADING PERIOD</th>
                      <td className="p-2 border border-stone-400 text-stone-800">Term {selectedTerm} (Weeks 1–10)</td>
                      <th className="p-2 border border-stone-400 bg-stone-100 font-bold text-stone-900">CURRICULUM</th>
                      <td className="p-2 border border-stone-400 text-stone-800">Strengthened SHS (DO 015, s. 2026)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Section I: Objectives & Curriculum Standards */}
              <div className="space-y-0">
                <div className="bg-[#002776] text-white py-1 px-3 text-[11px] font-bold uppercase tracking-wider text-center rounded-t-xs">
                  I. OBJECTIVES &amp; CURRICULUM STANDARDS
                </div>
                <table className="w-full text-xs text-left border-collapse border border-stone-400">
                  <tbody>
                    <tr>
                      <th className="p-2.5 border border-stone-400 bg-stone-100 font-bold w-44 text-stone-900">A. Content Standard</th>
                      <td className="p-2.5 border border-stone-400 text-stone-800 leading-relaxed">{contentStandard}</td>
                    </tr>
                    <tr>
                      <th className="p-2.5 border border-stone-400 bg-stone-100 font-bold text-stone-900">B. Performance Standard</th>
                      <td className="p-2.5 border border-stone-400 text-stone-800 leading-relaxed">{performanceStandard}</td>
                    </tr>
                    <tr>
                      <th className="p-2.5 border border-stone-400 bg-stone-100 font-bold text-stone-900">C. Learning Competency</th>
                      <td className="p-2.5 border border-stone-400 font-bold text-[#002776] leading-relaxed">{learningCompetency}</td>
                    </tr>
                    <tr>
                      <th className="p-2.5 border border-stone-400 bg-stone-100 font-bold text-stone-900">D. Enabling Competency</th>
                      <td className="p-2.5 border border-stone-400 text-stone-800 leading-relaxed">{enablingCompetencies}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Section II: Content / Topic Focus */}
              <div className="space-y-0">
                <div className="bg-[#002776] text-white py-1 px-3 text-[11px] font-bold uppercase tracking-wider text-center rounded-t-xs">
                  II. CONTENT / TOPIC FOCUS
                </div>
                <table className="w-full text-xs text-left border-collapse border border-stone-400">
                  <tbody>
                    <tr>
                      <th className="p-2.5 border border-stone-400 bg-stone-100 font-bold w-44 text-stone-900">Subject Matter Focus</th>
                      <td className="p-2.5 border border-stone-400 font-bold text-[#002776] text-sm">
                        {activeEntry?.week || 'Weeks 1–2'} — {activeEntry?.topic || 'Curriculum Competency Focus'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Section III: Learning Resources & Integration */}
              <div className="space-y-0">
                <div className="bg-[#002776] text-white py-1 px-3 text-[11px] font-bold uppercase tracking-wider text-center rounded-t-xs">
                  III. LEARNING RESOURCES &amp; INTEGRATION
                </div>
                <table className="w-full text-xs text-left border-collapse border border-stone-400">
                  <tbody>
                    <tr>
                      <th className="p-2.5 border border-stone-400 bg-stone-100 font-bold w-44 text-stone-900">A. References &amp; Materials</th>
                      <td className="p-2.5 border border-stone-400 text-stone-800 leading-relaxed">{resources}</td>
                    </tr>
                    <tr>
                      <th className="p-2.5 border border-stone-400 bg-stone-100 font-bold text-stone-900">B. Cross-Curricular Link</th>
                      <td className="p-2.5 border border-stone-400 text-stone-800 leading-relaxed">{integration}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Section IV: Procedures — Sessions 1 & 2 */}
              <div className="space-y-0">
                <div className="bg-[#002776] text-white py-1 px-3 text-[11px] font-bold uppercase tracking-wider text-center rounded-t-xs">
                  IV. PROCEDURES (FOUR-SESSION DAILY LESSON FLOW) — SESSIONS 1 &amp; 2
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 border border-stone-400 divide-y md:divide-y-0 md:divide-x divide-stone-400">
                  {/* Session 1 */}
                  <div className="flex flex-col">
                    <div className="bg-stone-100 p-2 text-center font-bold text-xs border-b border-stone-400 text-[#002776]">
                      SESSION 1 (DAY 1): ELICIT &amp; ENGAGE
                    </div>
                    <div className="p-3 text-xs text-stone-800 leading-relaxed whitespace-pre-wrap flex-1 bg-white">
                      {session1}
                    </div>
                  </div>

                  {/* Session 2 */}
                  <div className="flex flex-col">
                    <div className="bg-stone-100 p-2 text-center font-bold text-xs border-b border-stone-400 text-[#002776]">
                      SESSION 2 (DAY 2): EXPLORE &amp; EXPLAIN
                    </div>
                    <div className="p-3 text-xs text-stone-800 leading-relaxed whitespace-pre-wrap flex-1 bg-white">
                      {session2}
                    </div>
                  </div>
                </div>
              </div>

              {/* Page 1 Running Footer */}
              <div className="pt-4 border-t border-stone-300 flex flex-wrap items-center justify-between text-[10px] text-stone-500 font-mono">
                <span>Document Code: DEPED-ROX-LDN-ILAW-2026 | Verified Official Record | Quality Assured Instructional Material</span>
                <span className="font-bold text-stone-700">Page 1 of 2</span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SHEET 2: PART 2 (SESSIONS 3 & 4, REMARKS, REFLECTIONS, SIGNATURES)          */}
          {/* ========================================================================= */}
          {(activePagePreview === 'both' || activePagePreview === 'page2') && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-300 shadow-sm space-y-4 print:shadow-none print:border-none print:p-0">
              {/* DepEd Accent Color Bars */}
              <div className="space-y-0.5">
                <div className="w-full h-1.5 bg-[#0038A8] rounded-t-sm"></div>
                <div className="w-full h-0.5 bg-[#FCD116]"></div>
              </div>

              {/* DepEd Region X Header */}
              <div className="text-center space-y-0.5 pt-2 pb-2">
                <div className="text-[10px] tracking-wider uppercase font-semibold text-stone-500">
                  REPUBLIC OF THE PHILIPPINES
                </div>
                <div className="text-base font-bold text-[#002776] tracking-wide uppercase">
                  DEPARTMENT OF EDUCATION
                </div>
                <div className="text-xs font-semibold text-stone-700 uppercase">
                  {region.toUpperCase()} • {division.toUpperCase()}
                </div>
                <div className="text-sm font-bold font-serif text-[#002776] uppercase tracking-wide">
                  {school.toUpperCase()}
                </div>
                <div className="mt-2.5 bg-[#002776] text-white py-1 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xs rounded-xs">
                  INSTRUCTIONAL LEADERSHIP AND ACADEMIC WORKFLOW (ILAW) — PART 2
                </div>
                <div className="text-[10.5px] text-stone-600 italic pt-0.5">
                  Three-Term Calendar (DepEd Order No. 009, s. 2026) | Strengthened SHS Curriculum (DO No. 015, s. 2026)
                </div>
              </div>

              {/* Continuation Subject & Term Banner */}
              <div className="p-2.5 border border-stone-400 bg-stone-100 font-bold text-xs text-[#002776] uppercase tracking-wide">
                CONTINUATION: {selectedSubject.toUpperCase()} | TERM {selectedTerm} ({activeEntry?.week || 'Weeks 1–2'}) — {(activeEntry?.topic || '').toUpperCase()}
              </div>

              {/* Section IV: Procedures — Sessions 3 & 4 */}
              <div className="space-y-0">
                <div className="bg-[#002776] text-white py-1 px-3 text-[11px] font-bold uppercase tracking-wider text-center rounded-t-xs">
                  IV. PROCEDURES (FOUR-SESSION DAILY LESSON FLOW) — SESSIONS 3 &amp; 4
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 border border-stone-400 divide-y md:divide-y-0 md:divide-x divide-stone-400">
                  {/* Session 3 */}
                  <div className="flex flex-col">
                    <div className="bg-stone-100 p-2 text-center font-bold text-xs border-b border-stone-400 text-[#002776]">
                      SESSION 3 (DAY 3): ELABORATE &amp; DEEPEN
                    </div>
                    <div className="p-3 text-xs text-stone-800 leading-relaxed whitespace-pre-wrap flex-1 bg-white">
                      {session3}
                    </div>
                  </div>

                  {/* Session 4 */}
                  <div className="flex flex-col">
                    <div className="bg-stone-100 p-2 text-center font-bold text-xs border-b border-stone-400 text-[#002776]">
                      SESSION 4 (DAY 4): EVALUATE &amp; EXTEND
                    </div>
                    <div className="p-3 text-xs text-stone-800 leading-relaxed whitespace-pre-wrap flex-1 bg-white">
                      {session4}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section V: Remarks & Formative Assessment Tracking */}
              <div className="space-y-0">
                <div className="bg-[#002776] text-white py-1 px-3 text-[11px] font-bold uppercase tracking-wider text-center rounded-t-xs">
                  V. REMARKS &amp; FORMATIVE ASSESSMENT TRACKING
                </div>
                <div className="p-3 border border-stone-400 text-xs text-stone-800 leading-relaxed space-y-1.5 bg-white">
                  <div>1. No. of learners who earned 80% on the formative assessment: <span className="font-mono underline font-semibold text-stone-900">_______</span></div>
                  <div>2. No. of learners who require additional activities for remediation: <span className="font-mono underline font-semibold text-stone-900">_______</span></div>
                  <div>3. Remediation strategy implemented: <span className="font-medium text-stone-900">Targeted peer mentoring and differentiated scaffold worksheets.</span></div>
                  <div>4. Did the remedial lessons work? No. of learners who caught up with the lesson: <span className="font-mono underline font-semibold text-stone-900">_______</span></div>
                </div>
              </div>

              {/* Section VI: Reflection & Instructional Supervision */}
              <div className="space-y-0">
                <div className="bg-[#002776] text-white py-1 px-3 text-[11px] font-bold uppercase tracking-wider text-center rounded-t-xs">
                  VI. REFLECTION &amp; INSTRUCTIONAL SUPERVISION
                </div>
                <div className="p-3 border border-stone-400 text-xs text-stone-800 leading-relaxed space-y-2 bg-white">
                  <div>
                    <div className="font-bold text-stone-900">A. Which of my teaching strategies worked well? Why did these work?</div>
                    <p className="text-stone-700 pl-3 italic">Collaborative inquiry and authentic task-based modeling stimulated active participation and higher concept retention.</p>
                  </div>
                  <div>
                    <div className="font-bold text-stone-900">B. What difficulties did I encounter which my principal or supervisor can help me solve?</div>
                    <p className="text-stone-700 pl-3 italic">Access to supplementary digital tools and high-volume printed learning activity sheets for differentiated tracks.</p>
                  </div>
                  <div>
                    <div className="font-bold text-stone-900">C. What innovation or localized materials did I use/discover which I wish to share with other teachers?</div>
                    <p className="text-stone-700 pl-3 italic">Contextualized Region X workplace exemplars and interactive competency check-ins.</p>
                  </div>
                </div>
              </div>

              {/* 3-Column Formal Signatures Block */}
              <div className="grid grid-cols-1 md:grid-cols-3 border border-stone-400 divide-y md:divide-y-0 md:divide-x divide-stone-400 text-center bg-white">
                <div className="p-3.5 flex flex-col justify-between min-h-[95px]">
                  <div className="text-left text-[11px] font-bold text-stone-600">Prepared by:</div>
                  <div className="my-2">
                    <div className="font-serif font-bold text-xs uppercase text-[#002776] border-b border-stone-900 inline-block px-4 pb-0.5">
                      {teacher}
                    </div>
                    <div className="text-[10px] text-stone-600 mt-1">Special Science Teacher II / Subject Teacher</div>
                  </div>
                </div>

                <div className="p-3.5 flex flex-col justify-between min-h-[95px]">
                  <div className="text-left text-[11px] font-bold text-stone-600">Checked by:</div>
                  <div className="my-2">
                    <div className="font-serif font-bold text-xs uppercase text-[#002776] border-b border-stone-900 inline-block px-4 pb-0.5">
                      MASTER TEACHER / HEAD TEACHER
                    </div>
                    <div className="text-[10px] text-stone-600 mt-1">Department Head, SHS Academic Track</div>
                  </div>
                </div>

                <div className="p-3.5 flex flex-col justify-between min-h-[95px]">
                  <div className="text-left text-[11px] font-bold text-stone-600">Noted by:</div>
                  <div className="my-2">
                    <div className="font-serif font-bold text-xs uppercase text-[#002776] border-b border-stone-900 inline-block px-4 pb-0.5">
                      {principal.toUpperCase()}
                    </div>
                    <div className="text-[10px] text-stone-600 mt-1">Secondary School Principal IV / School Head</div>
                  </div>
                </div>
              </div>

              {/* Page 2 Running Footer */}
              <div className="pt-4 border-t border-stone-300 flex flex-wrap items-center justify-between text-[10px] text-stone-500 font-mono">
                <span>Document Code: DEPED-ROX-LDN-ILAW-2026 | Verified Official Record | Quality Assured Instructional Material</span>
                <span className="font-bold text-stone-700">Page 2 of 2</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: Learning Activity Sheet (LAS) */}
      {viewMode === 'las' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-300 shadow-sm space-y-6">
          {/* LAS View Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200 print:hidden">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-teal-800 text-white text-xs font-bold flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                Region X Student Activity Sheet (LAS)
              </span>
              <span className="text-xs text-stone-500 hidden sm:inline">
                Three Tiered Tasks with Analytic Scoring Rubric
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={async () => {
                  setIsGeneratingDO3(true);
                  await new Promise(r => setTimeout(r, 1000));
                  
                  const bg = activeBOWEntry?.lasBg || `[GENERATED] ${activeBOWEntry?.topic} covers the core concepts of ${activeBOWEntry?.learningCompetency.toLowerCase()}.`;
                  const a1 = activeBOWEntry?.lasA1 || `[GENERATED] Task 1: Identify the primary components of ${activeBOWEntry?.topic} and explain their function.`;
                  const a2 = activeBOWEntry?.lasA2 || `[GENERATED] Task 2: Apply ${activeBOWEntry?.topic} to solve a practical scenario in your community.`;
                  const a3 = activeBOWEntry?.lasA3 || `[GENERATED] Task 3: Evaluate the impact of ${activeBOWEntry?.topic} on 21st-century learners.`;
                  
                  setLasBgState(bg);
                  setLasA1State(a1);
                  setLasA2State(a2);
                  setLasA3State(a3);
                  
                  setPdfSuccessMessage('✓ LAS Content generated based on MELCs/BOW integration!');
                  setIsGeneratingDO3(false);
                  setTimeout(() => setPdfSuccessMessage(null), 3000);
                }}
                disabled={isGeneratingDO3}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-black transition shadow-xs cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Fill LAS Content</span>
              </button>
              <button
                onClick={() => handleExportPDF('las')}
                disabled={isExportingPDF}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isExportingPDF ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileDown className="w-3.5 h-3.5 text-teal-200" />}
                <span>Export LAS PDF (1 Page)</span>
              </button>
              <button
                onClick={() => handleExportPDF('full')}
                disabled={isExportingPDF}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0038A8] hover:bg-[#002776] text-white text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
              >
                <FileDown className="w-3.5 h-3.5 text-[#FCD116]" />
                <span>Export Full Packet</span>
              </button>
            </div>
          </div>

          <div className="text-center space-y-1 border-b-2 border-stone-800 pb-4">
            <h2 className="text-xl font-bold font-serif uppercase tracking-wide text-stone-900">
              LEARNING ACTIVITY SHEET (LAS) — REGION X
            </h2>
            <div className="text-xs text-stone-600">
              Department of Education • Division of Lanao del Norte • {school}
            </div>
          </div>

          {/* Learner Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs border border-stone-400 p-3 rounded-xl bg-stone-50/60">
            <div>
              <span className="font-bold text-stone-600">Learner Name: </span>
              <span className="font-mono text-stone-900">___________________________</span>
            </div>
            <div>
              <span className="font-bold text-stone-600">Grade &amp; Section: </span>
              <span className="font-semibold text-stone-900">{section}</span>
            </div>
            <div>
              <span className="font-bold text-stone-600">Date: </span>
              <span className="font-mono text-stone-900">________________</span>
            </div>
            <div className="sm:col-span-2">
              <span className="font-bold text-stone-600">Learning Area: </span>
              <span className="font-semibold text-blue-900">{selectedSubject} (Term {selectedTerm}, {activeEntry?.week})</span>
            </div>
            <div>
              <span className="font-bold text-stone-600">Teacher: </span>
              <span className="font-semibold text-stone-900">{teacher}</span>
            </div>
          </div>

          {/* Competency */}
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs space-y-1">
            <span className="font-bold text-blue-950 uppercase tracking-wider text-[11px]">
              Most Essential Learning Competency &amp; Code:
            </span>
            <p className="text-blue-900 font-semibold">{learningCompetency}</p>
          </div>

          {/* Content Sections */}
          <div className="space-y-4 text-xs">
            <div>
              <h3 className="text-sm font-bold text-stone-900 uppercase border-b border-stone-200 pb-1 mb-2">
                I. Background Information for Learners
              </h3>
              <p className="text-stone-800 leading-relaxed text-justify">
                {lasBgState || activeEntry?.lasBg || contentStandard}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-stone-900 uppercase border-b border-stone-200 pb-1 mb-2">
                II. Activity 1: Foundational Discovery
              </h3>
              <p className="text-stone-800 leading-relaxed">
                {lasA1State || activeEntry?.lasA1 || 'Analyze the foundational principles and diagram the key elements of the concept.'}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-stone-900 uppercase border-b border-stone-200 pb-1 mb-2">
                III. Activity 2: Deepening &amp; Real-World Application
              </h3>
              <p className="text-stone-800 leading-relaxed">
                {lasA2State || activeEntry?.lasA2 || 'Apply the concept to a real-world Philippine community or workplace case study.'}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-stone-900 uppercase border-b border-stone-200 pb-1 mb-2">
                IV. Activity 3: Authentic Performance Task &amp; Rubric
              </h3>
              <p className="text-stone-800 leading-relaxed mb-3">
                {lasA3State || activeEntry?.lasA3 || 'Synthesize findings and create an authentic artifact evaluated via the rubric below.'}
              </p>

              {/* Rubric Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-stone-300">
                  <thead className="bg-stone-100 text-stone-900 font-bold">
                    <tr>
                      <th className="p-2 border border-stone-300">Criteria</th>
                      <th className="p-2 border border-stone-300">Advancing (4)</th>
                      <th className="p-2 border border-stone-300">Benchmarking (3)</th>
                      <th className="p-2 border border-stone-300">Connecting (2)</th>
                      <th className="p-2 border border-stone-300">Developing (1)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    <tr>
                      <td className="p-2 border border-stone-300 font-semibold">Content &amp; Accuracy</td>
                      <td className="p-2 border border-stone-300">Exemplary depth and precision</td>
                      <td className="p-2 border border-stone-300">Accurate with minor gaps</td>
                      <td className="p-2 border border-stone-300">Basic understanding shown</td>
                      <td className="p-2 border border-stone-300">Needs remediation</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-stone-300 font-semibold">Application &amp; Rigor</td>
                      <td className="p-2 border border-stone-300">Creative, authentic synthesis</td>
                      <td className="p-2 border border-stone-300">Standard real-world link</td>
                      <td className="p-2 border border-stone-300">Superficial connection</td>
                      <td className="p-2 border border-stone-300">Incomplete task</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Figma & SVG Vector Blueprint */}
      {viewMode === 'svg' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
            <div>
              <h3 className="text-base font-bold font-display text-stone-900">
                Figma &amp; Canva Vector Blueprint Exporter
              </h3>
              <p className="text-xs text-stone-500">
                Generate pure, scalable SVG code. You can copy it directly to your clipboard and press <strong>Ctrl+V / Cmd+V</strong> inside Figma to paste editable vector frames!
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySVG}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy SVG for Figma'}</span>
              </button>
              <button
                onClick={handleDownloadSVG}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .SVG</span>
              </button>
            </div>
          </div>

          {/* Live SVG Render Container */}
          <div className="w-full max-h-[550px] overflow-auto border border-stone-200 rounded-2xl bg-stone-50 p-4 flex justify-center">
            <div
              className="shadow-md bg-white"
              dangerouslySetInnerHTML={{ __html: generateFigmaSVGString() }}
            />
          </div>

          <div className="p-3 bg-purple-50 rounded-xl text-xs text-purple-900 border border-purple-200">
            <strong>💡 How to use in Figma or Canva:</strong>
            <ul className="list-disc ml-5 mt-1 space-y-0.5 text-[11px]">
              <li>Click <strong>"Copy SVG for Figma"</strong>, switch to your Figma document canvas, and press <code>Ctrl + V</code> (Windows) or <code>Cmd + V</code> (Mac).</li>
              <li>Or click <strong>"Download .SVG"</strong> and drag-and-drop the downloaded SVG file directly into Figma or Canva. All headers, labels, and text will import as editable vector layers!</li>
            </ul>
          </div>
        </div>
      )}

      {/* VIEW 4: Offline Android Asset Info & Tools */}
      {viewMode === 'assets' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Standalone Offline Android Asset Created &amp; Saved</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
            <span className="font-bold text-stone-700 uppercase tracking-wider block">
              Installed File Target Paths:
            </span>
            <div className="font-mono text-[11px] text-blue-900 bg-white p-2 rounded-lg border border-stone-100 select-all">
              app/src/main/assets/web/ilaw/ilaw-generator.html (ILAW Plan Builder)
            </div>
            <div className="font-mono text-[11px] text-teal-900 bg-white p-2 rounded-lg border border-stone-100 select-all">
              public/ilaw/curriculum-engine.html (BOISER Curriculum Engine Dashboard)
            </div>
            <div className="font-mono text-[11px] text-stone-600 bg-white p-2 rounded-lg border border-stone-100 select-all">
              public/curriculum-engine.js (Background Offline Sync module)
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/ilaw/ilaw-generator.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition shadow-xs"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Standalone ILAW Tool</span>
            </a>

            <a
              href="/ilaw/curriculum-engine.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-700 text-white text-xs font-bold transition shadow-xs"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Standalone Curriculum Engine</span>
            </a>

            <button
              onClick={handleExportJSON}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition"
            >
              <Download className="w-4 h-4 text-stone-600" />
              <span>Export Full BOW Database (JSON)</span>
            </button>

            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer">
              <Upload className="w-4 h-4 text-stone-600" />
              <span>Import Custom BOW (JSON)</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
        </>
      )}
      {/* Validation Warning Export Modal */}
      {showValidationExportModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-4 shadow-inner">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>

            <h3 className="text-base font-bold text-stone-900 mb-1">
              Missing Required Fields Detected
            </h3>
            <p className="text-xs text-stone-600 mb-4">
              Your lesson plan contains missing or incomplete required fields (e.g., dates, learning area, competencies, or session procedures).
            </p>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 mb-5 space-y-2 max-h-48 overflow-y-auto">
              <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                Unresolved Field Checks:
              </div>
              <ul className="text-xs space-y-1.5 text-stone-700">
                {getValidationChecks().filter(c => !c.isValid && c.isRequired).map(check => (
                  <li key={check.id} className="flex items-center justify-between gap-2 bg-white/80 p-2 rounded-xl border border-amber-200/80">
                    <span className="font-semibold text-stone-800 text-[11px]">{check.label}</span>
                    <button
                      onClick={() => {
                        setShowValidationExportModal(false);
                        handleFocusField(check.elementId);
                      }}
                      className="text-[10px] font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer shrink-0"
                    >
                      Fix Field
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5">
              <button
                onClick={() => {
                  handleRepairDefaults();
                  setShowValidationExportModal(false);
                  if (pendingExportAction) {
                    setTimeout(() => pendingExportAction(), 300);
                  }
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-50 text-[#0038A8] border border-blue-200 hover:bg-blue-100 text-xs font-bold transition cursor-pointer"
              >
                Auto-Fill Defaults &amp; Export
              </button>
              <button
                onClick={() => {
                  setShowValidationExportModal(false);
                  if (pendingExportAction) {
                    pendingExportAction();
                  }
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition cursor-pointer"
              >
                Export Anyway
              </button>
              <button
                onClick={() => setShowValidationExportModal(false)}
                className="w-full sm:w-auto px-3 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Regeneration Confirmation Dialog Modal */}
      {showRegenerateConfirmModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-4 shadow-inner">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>

            <h3 className="text-base font-bold text-stone-900 mb-1">
              Confirm Plan Regeneration
            </h3>
            <p className="text-xs text-stone-600 mb-4">
              Are you sure you want to regenerate this ILAW plan using AI?
            </p>

            {versionStatus === 'Teacher Edited' ? (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 mb-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Pencil className="w-4 h-4 text-amber-700" />
                  <span>Warning: Manual Edits Detected</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  You currently have custom teacher edits saved in this lesson plan. Regenerating will <strong>overwrite all your manual edits</strong> and reset the plan status to <strong>AI Generated</strong>.
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 mb-5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0038A8]">
                  <Sparkles className="w-4 h-4 text-[#0038A8]" />
                  <span>AI Regeneration</span>
                </div>
                <p className="text-xs text-stone-700">
                  This will generate a fresh DepEd DO 3, s. 2026 ILAW exemplar for <strong>{selectedSubject}</strong> ({computedDate}).
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5">
              <button
                onClick={handleConfirmRegenerate}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Yes, Overwrite &amp; Regenerate</span>
              </button>
              <button
                onClick={() => setShowRegenerateConfirmModal(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
