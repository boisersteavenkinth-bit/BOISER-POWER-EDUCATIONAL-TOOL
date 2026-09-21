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
  Loader2
} from 'lucide-react';
import { exportDepEdRegionXPDF, DepEdILAWExportData, PDFExportMode } from '../utils/depedPdfExporter';

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

export const ILAWGenerator: React.FC = () => {
  const [bowData, setBowData] = useState<SubjectBOWMap>(GRADE_11_DEFAULT_BOW);
  const [selectedSubject, setSelectedSubject] = useState<string>('Effective Communication');
  const [selectedTerm, setSelectedTerm] = useState<string>('1');
  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number>(0);

  // Meta Information (Region X Presets)
  const [school, setSchool] = useState<string>('LNNCHS (Lanao del Norte National Comprehensive High School)');
  const [teacher, setTeacher] = useState<string>('STEAVEN KINTH D. BOISER');
  const [section, setSection] = useState<string>('Grade 11 - Einstein / Rizal (Academic & TechPro)');
  const [dates, setDates] = useState<string>('Week 1 (4 Sessions • 60 mins/session)');
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

  // UI state
  const [viewMode, setViewMode] = useState<'ilaw' | 'las' | 'svg' | 'assets'>('ilaw');
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportingPDF, setIsExportingPDF] = useState<boolean>(false);
  const [pdfSuccessMessage, setPdfSuccessMessage] = useState<string | null>(null);
  const [pdfExportMode, setPdfExportMode] = useState<PDFExportMode>('full');

  // Auto-load entry when subject, term, or week changes
  useEffect(() => {
    const list = bowData[selectedSubject]?.[selectedTerm] || [];
    const entry = list[selectedWeekIndex] || list[0];
    if (entry) {
      setContentStandard(entry.contentStandard || '');
      setPerformanceStandard(entry.performanceStandard || '');
      setLearningCompetency(`[${entry.code}] ${entry.learningCompetency || ''}`);
      setEnablingCompetencies(entry.enablingCompetencies || '');
      setSession1(entry.s1 || '');
      setSession2(entry.s2 || '');
      setSession3(entry.s3 || '');
      setSession4(entry.s4 || '');
    }
  }, [selectedSubject, selectedTerm, selectedWeekIndex, bowData]);

  const currentList = bowData[selectedSubject]?.[selectedTerm] || [];
  const activeEntry = currentList[selectedWeekIndex] || currentList[0];

  // Helper for generating SVG vector string for Figma & Canva
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
<svg width="1400" height="1950" viewBox="0 0 1400 1950" xmlns="http://www.w3.org/2000/svg" font-family="'Times New Roman', serif">
  <!-- Outer Canvas Background -->
  <rect width="1400" height="1950" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />

  <!-- Top Header Frame -->
  <rect x="50" y="40" width="1300" height="170" fill="#f8fafc" stroke="#000000" stroke-width="2" />
  <text x="700" y="70" font-size="14" fill="#333333" text-anchor="middle" letter-spacing="1">REPUBLIC OF THE PHILIPPINES • DEPARTMENT OF EDUCATION</text>
  <text x="700" y="95" font-size="20" font-weight="bold" fill="#000000" text-anchor="middle">REGION X - NORTHERN MINDANAO • DIVISION OF LANAO DEL NORTE</text>
  <text x="700" y="125" font-size="18" font-weight="bold" fill="#000000" text-anchor="middle">${escapeXML(school)}</text>
  
  <rect x="50" y="145" width="1300" height="40" fill="#072044" />
  <text x="700" y="172" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle" letter-spacing="1">
    INSTRUCTIONAL LEADERSHIP AND ACADEMIC WORKFLOW (ILAW) — SY 2026–2027
  </text>

  <!-- Meta Info Grid -->
  <rect x="50" y="220" width="1300" height="90" fill="#ffffff" stroke="#000000" stroke-width="1.5" />
  
  <!-- Row 1 -->
  <rect x="50" y="220" width="220" height="45" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
  <text x="65" y="248" font-size="13" font-weight="bold" fill="#000000">TEACHER</text>
  <text x="285" y="248" font-size="13" font-weight="bold" fill="#000000">${escapeXML(teacher)}</text>

  <rect x="700" y="220" width="220" height="45" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
  <text x="715" y="248" font-size="13" font-weight="bold" fill="#000000">LEARNING AREA</text>
  <text x="935" y="248" font-size="13" font-weight="bold" fill="#000000">${escapeXML(selectedSubject)}</text>

  <!-- Row 2 -->
  <rect x="50" y="265" width="220" height="45" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
  <text x="65" y="293" font-size="13" font-weight="bold" fill="#000000">GRADING PERIOD</text>
  <text x="285" y="293" font-size="13" fill="#111111">Term ${selectedTerm} (DO 009, s. 2026 Three-Term Calendar)</text>

  <rect x="700" y="265" width="220" height="45" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
  <text x="715" y="293" font-size="13" font-weight="bold" fill="#000000">CURRICULUM</text>
  <text x="935" y="293" font-size="13" fill="#111111">Strengthened SHS (DO 015, s. 2026)</text>

  <!-- Section I: Objectives -->
  <rect x="50" y="325" width="1300" height="36" fill="#072044" />
  <text x="700" y="349" fill="#ffffff" font-size="15" font-weight="bold" text-anchor="middle" letter-spacing="1">I. OBJECTIVES &amp; STANDARDS</text>

  <!-- Content Standard -->
  <rect x="50" y="361" width="220" height="60" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
  <text x="65" y="396" font-size="13" font-weight="bold" fill="#000000">Content Standard</text>
  <rect x="270" y="361" width="1080" height="60" fill="#ffffff" stroke="#000000" stroke-width="1" />
  <text x="285" y="396" font-size="13" fill="#111111">${escapeXML(contentStandard.substring(0, 140))}...</text>

  <!-- Performance Standard -->
  <rect x="50" y="421" width="220" height="60" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
  <text x="65" y="456" font-size="13" font-weight="bold" fill="#000000">Performance Standard</text>
  <rect x="270" y="421" width="1080" height="60" fill="#ffffff" stroke="#000000" stroke-width="1" />
  <text x="285" y="456" font-size="13" fill="#111111">${escapeXML(performanceStandard.substring(0, 140))}...</text>

  <!-- Learning Competency -->
  <rect x="50" y="481" width="220" height="70" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
  <text x="65" y="520" font-size="13" font-weight="bold" fill="#000000">Learning Competency</text>
  <rect x="270" y="481" width="1080" height="70" fill="#ffffff" stroke="#000000" stroke-width="1" />
  <text x="285" y="520" font-size="13" font-weight="bold" fill="#0c3d78">${escapeXML(learningCompetency.substring(0, 140))}</text>

  <!-- Section II: Content Topic -->
  <rect x="50" y="565" width="1300" height="36" fill="#072044" />
  <text x="700" y="589" fill="#ffffff" font-size="15" font-weight="bold" text-anchor="middle" letter-spacing="1">II. CONTENT / TOPIC FOCUS</text>
  
  <rect x="50" y="601" width="1300" height="45" fill="#ffffff" stroke="#000000" stroke-width="1.5" />
  <text x="700" y="629" font-size="16" font-weight="bold" fill="#000000" text-anchor="middle">${escapeXML(activeEntry?.topic || '')}</text>

  <!-- Section III: Procedures (4 Sessions Grid) -->
  <rect x="50" y="660" width="1300" height="36" fill="#072044" />
  <text x="700" y="684" fill="#ffffff" font-size="15" font-weight="bold" text-anchor="middle" letter-spacing="1">III. PROCEDURES (FOUR-SESSION LESSON FLOW)</text>

  <!-- 4 Columns Container -->
  <!-- Col 1 -->
  <rect x="50" y="696" width="325" height="520" fill="#ffffff" stroke="#000000" stroke-width="1.5" />
  <rect x="50" y="696" width="325" height="40" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
  <text x="212" y="722" font-size="13" font-weight="bold" fill="#0c3d78" text-anchor="middle">SESSION 1 (DAY 1)</text>
  <text x="212" y="745" font-size="11" font-weight="bold" fill="#555555" text-anchor="middle">ELICIT &amp; ENGAGE</text>
  <foreignObject x="60" y="760" width="305" height="440">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:12px;line-height:1.5;color:#000;font-family:'Times New Roman',serif">
      ${escapeXML(session1)}
    </div>
  </foreignObject>

  <!-- Col 2 -->
  <rect x="375" y="696" width="325" height="520" fill="#ffffff" stroke="#000000" stroke-width="1.5" />
  <rect x="375" y="696" width="325" height="40" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
  <text x="537" y="722" font-size="13" font-weight="bold" fill="#0c3d78" text-anchor="middle">SESSION 2 (DAY 2)</text>
  <text x="537" y="745" font-size="11" font-weight="bold" fill="#555555" text-anchor="middle">EXPLORE &amp; EXPLAIN</text>
  <foreignObject x="385" y="760" width="305" height="440">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:12px;line-height:1.5;color:#000;font-family:'Times New Roman',serif">
      ${escapeXML(session2)}
    </div>
  </foreignObject>

  <!-- Col 3 -->
  <rect x="700" y="696" width="325" height="520" fill="#ffffff" stroke="#000000" stroke-width="1.5" />
  <rect x="700" y="696" width="325" height="40" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
  <text x="862" y="722" font-size="13" font-weight="bold" fill="#0c3d78" text-anchor="middle">SESSION 3 (DAY 3)</text>
  <text x="862" y="745" font-size="11" font-weight="bold" fill="#555555" text-anchor="middle">ELABORATE &amp; DEEPEN</text>
  <foreignObject x="710" y="760" width="305" height="440">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:12px;line-height:1.5;color:#000;font-family:'Times New Roman',serif">
      ${escapeXML(session3)}
    </div>
  </foreignObject>

  <!-- Col 4 -->
  <rect x="1025" y="696" width="325" height="520" fill="#ffffff" stroke="#000000" stroke-width="1.5" />
  <rect x="1025" y="696" width="325" height="40" fill="#f1f5f9" stroke="#000000" stroke-width="1" />
  <text x="1187" y="722" font-size="13" font-weight="bold" fill="#0c3d78" text-anchor="middle">SESSION 4 (DAY 4)</text>
  <text x="1187" y="745" font-size="11" font-weight="bold" fill="#555555" text-anchor="middle">EVALUATE &amp; EXTEND</text>
  <foreignObject x="1035" y="760" width="305" height="440">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:12px;line-height:1.5;color:#000;font-family:'Times New Roman',serif">
      ${escapeXML(session4)}
    </div>
  </foreignObject>

  <!-- Signatures Block -->
  <line x1="120" y1="1340" x2="380" y2="1340" stroke="#000000" stroke-width="1.5" />
  <text x="250" y="1360" font-size="13" font-weight="bold" text-anchor="middle">${escapeXML(teacher)}</text>
  <text x="250" y="1378" font-size="11" fill="#555555" text-anchor="middle">Special Science Teacher II / Subject Teacher</text>

  <line x1="570" y1="1340" x2="830" y2="1340" stroke="#000000" stroke-width="1.5" />
  <text x="700" y="1360" font-size="13" font-weight="bold" text-anchor="middle">MASTER TEACHER / HEAD TEACHER</text>
  <text x="700" y="1378" font-size="11" fill="#555555" text-anchor="middle">Checked by: Department Head</text>

  <line x1="1020" y1="1340" x2="1280" y2="1340" stroke="#000000" stroke-width="1.5" />
  <text x="1150" y="1360" font-size="13" font-weight="bold" text-anchor="middle">${escapeXML(principal)}</text>
  <text x="1150" y="1378" font-size="11" fill="#555555" text-anchor="middle">Noted by: School Head, LNNCHS</text>

  <!-- Vector Blueprint Watermark for Figma / Canva -->
  <text x="700" y="1450" font-size="11" fill="#94a3b8" text-anchor="middle">
    BOISER Powerful Education Tools • Vector Architecture for Figma &amp; Canva Integration • DepEd Region X
  </text>
</svg>
    `.trim();
  };

  const handleExportPDF = (mode: PDFExportMode = pdfExportMode) => {
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

      exportDepEdRegionXPDF(exportData, mode);
      const label = mode === 'full' ? 'Full Packet (ILAW & LAS)' : mode === 'ilaw' ? 'ILAW Plan' : 'LAS Sheet';
      setPdfSuccessMessage(`✓ Exported DepEd Region X Formal PDF (${label}) successfully!`);
      setTimeout(() => setPdfSuccessMessage(null), 4500);
    } catch (err: any) {
      console.error('PDF export error:', err);
      alert('Unable to generate PDF document: ' + (err?.message || 'Please try again.'));
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
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 text-xs">
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

      {/* Control & Selector Panel */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Select Grade 11 Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedWeekIndex(0);
              }}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-semibold text-stone-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              {Object.keys(bowData).map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Grading Term (DO 009, s. 2026)
            </label>
            <select
              value={selectedTerm}
              onChange={(e) => {
                setSelectedTerm(e.target.value);
                setSelectedWeekIndex(0);
              }}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-semibold text-stone-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="1">Term 1 (Weeks 1–10)</option>
              <option value="2">Term 2 (Weeks 1–10)</option>
              <option value="3">Term 3 (Weeks 1–10)</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Week &amp; Competency Cluster
            </label>
            <select
              value={selectedWeekIndex}
              onChange={(e) => setSelectedWeekIndex(Number(e.target.value))}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-semibold text-stone-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              {currentList.length === 0 && (
                <option value="0">No pre-loaded weeks in this term (custom import available)</option>
              )}
              {currentList.map((entry, idx) => (
                <option key={idx} value={idx}>
                  {entry.week} — {entry.topic}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* School & Teacher Information Accordion */}
        <div className="pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1">School</label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full p-2 rounded-lg border border-stone-300 bg-stone-50 font-medium"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1">Teacher</label>
            <input
              type="text"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              className="w-full p-2 rounded-lg border border-stone-300 bg-stone-50 font-medium"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-stone-600 uppercase block mb-1">Grade &amp; Section</label>
            <input
              type="text"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full p-2 rounded-lg border border-stone-300 bg-stone-50 font-medium"
            />
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100">
          <div className="inline-flex p-1 rounded-2xl bg-stone-100 border border-stone-200 text-xs">
            <button
              onClick={() => setViewMode('ilaw')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'ilaw' ? 'bg-blue-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Region X ILAW</span>
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
                onClick={() => handleExportPDF(pdfExportMode)}
                disabled={isExportingPDF}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white hover:text-[#FCD116] transition cursor-pointer disabled:opacity-50"
                title="Generate and download official DepEd Region X PDF Document"
              >
                {isExportingPDF ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#FCD116]" />
                ) : (
                  <FileDown className="w-3.5 h-3.5 text-[#FCD116]" />
                )}
                <span>{isExportingPDF ? 'Generating...' : 'Export Formal PDF'}</span>
              </button>
            </div>

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
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>Print A4</span>
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
              DepEd Region X Standard Format Ready
            </span>
          </div>
        )}
      </div>

      {/* VIEW 1: Official Region X ILAW Template */}
      {viewMode === 'ilaw' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-300 shadow-sm space-y-6 print:shadow-none print:border-none print:p-0">
          {/* View Toolbar Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200 print:hidden">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-[#0038A8] text-white text-xs font-bold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#FCD116]" />
                Region X Formal Record Template
              </span>
              <span className="text-xs text-stone-500 hidden sm:inline">
                Strengthened SHS • 4-Session Daily Flow (SY 2026–2027)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleExportPDF('ilaw')}
                disabled={isExportingPDF}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0038A8] hover:bg-[#002776] text-white text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isExportingPDF ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileDown className="w-3.5 h-3.5 text-[#FCD116]" />}
                <span>Export ILAW PDF (2 Pages)</span>
              </button>
              <button
                onClick={() => handleExportPDF('full')}
                disabled={isExportingPDF}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
              >
                <FileDown className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export Full Packet (ILAW + LAS)</span>
              </button>
            </div>
          </div>

          {/* Official DepEd Region X Header */}
          <div className="text-center space-y-1 border-b-2 border-stone-800 pb-5">
            <div className="text-[11px] tracking-widest uppercase font-semibold text-stone-600">
              Republic of the Philippines • Department of Education
            </div>
            <div className="text-sm font-bold text-stone-800 uppercase">
              {region} • {division}
            </div>
            <h1 className="text-lg sm:text-xl font-bold font-serif text-stone-900 uppercase tracking-wide">
              {school}
            </h1>
            <div className="inline-block mt-2 bg-stone-900 text-white px-4 py-1 text-xs font-bold uppercase tracking-wider">
              INSTRUCTIONAL LEADERSHIP AND ACADEMIC WORKFLOW (ILAW)
            </div>
            <div className="text-[11px] text-stone-600 italic mt-1">
              SY 2026–2027 Three-Term Implementation (DO 009 &amp; 015, s. 2026)
            </div>
          </div>

          {/* Meta Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-stone-400">
              <tbody>
                <tr>
                  <th className="p-2.5 border border-stone-400 bg-stone-100 font-bold w-48 text-stone-900">TEACHER</th>
                  <td className="p-2.5 border border-stone-400 font-bold text-stone-900">{teacher}</td>
                  <th className="p-2.5 border border-stone-400 bg-stone-100 font-bold w-44 text-stone-900">LEARNING AREA</th>
                  <td className="p-2.5 border border-stone-400 font-bold text-blue-900">{selectedSubject}</td>
                </tr>
                <tr>
                  <th className="p-2.5 border border-stone-400 bg-stone-100 font-bold text-stone-900">TEACHING DATES &amp; TIME</th>
                  <td className="p-2.5 border border-stone-400 text-stone-800">{dates}</td>
                  <th className="p-2.5 border border-stone-400 bg-stone-100 font-bold text-stone-900">GRADE LEVEL &amp; SECTION</th>
                  <td className="p-2.5 border border-stone-400 text-stone-800">{section}</td>
                </tr>
                <tr>
                  <th className="p-2.5 border border-stone-400 bg-stone-100 font-bold text-stone-900">GRADING PERIOD</th>
                  <td className="p-2.5 border border-stone-400 text-stone-800">Term {selectedTerm} (Weeks 1–10)</td>
                  <th className="p-2.5 border border-stone-400 bg-stone-100 font-bold text-stone-900">CURRICULUM</th>
                  <td className="p-2.5 border border-stone-400 text-stone-800">Strengthened SHS (DO 015, s. 2026)</td>
                </tr>

                {/* Section I: Objectives */}
                <tr className="bg-blue-950 text-white font-bold text-center">
                  <td colSpan={4} className="p-2 tracking-wider uppercase text-[11px]">
                    I. OBJECTIVES &amp; STANDARDS
                  </td>
                </tr>
                <tr>
                  <th className="p-2.5 border border-stone-400 bg-stone-50 font-bold text-stone-800">A. Content Standard</th>
                  <td colSpan={3} className="p-2.5 border border-stone-400 text-stone-800 leading-relaxed">
                    {contentStandard}
                  </td>
                </tr>
                <tr>
                  <th className="p-2.5 border border-stone-400 bg-stone-50 font-bold text-stone-800">B. Performance Standard</th>
                  <td colSpan={3} className="p-2.5 border border-stone-400 text-stone-800 leading-relaxed">
                    {performanceStandard}
                  </td>
                </tr>
                <tr>
                  <th className="p-2.5 border border-stone-400 bg-stone-50 font-bold text-stone-800">C. Learning Competency</th>
                  <td colSpan={3} className="p-2.5 border border-stone-400 font-bold text-blue-900 leading-relaxed">
                    {learningCompetency}
                  </td>
                </tr>
                <tr>
                  <th className="p-2.5 border border-stone-400 bg-stone-50 font-bold text-stone-800">D. Enabling Competencies</th>
                  <td colSpan={3} className="p-2.5 border border-stone-400 text-stone-700 leading-relaxed">
                    {enablingCompetencies}
                  </td>
                </tr>

                {/* Section II: Content */}
                <tr className="bg-blue-950 text-white font-bold text-center">
                  <td colSpan={4} className="p-2 tracking-wider uppercase text-[11px]">
                    II. CONTENT / TOPIC FOCUS
                  </td>
                </tr>
                <tr>
                  <th className="p-2.5 border border-stone-400 bg-stone-50 font-bold text-stone-800">Subject Matter Focus</th>
                  <td colSpan={3} className="p-2.5 border border-stone-400 font-bold text-stone-900 text-sm">
                    {activeEntry?.topic}
                  </td>
                </tr>

                {/* Section III: Learning Resources */}
                <tr className="bg-blue-950 text-white font-bold text-center">
                  <td colSpan={4} className="p-2 tracking-wider uppercase text-[11px]">
                    III. LEARNING RESOURCES &amp; INTEGRATION
                  </td>
                </tr>
                <tr>
                  <th className="p-2.5 border border-stone-400 bg-stone-50 font-bold text-stone-800">A. References &amp; Materials</th>
                  <td colSpan={3} className="p-2.5 border border-stone-400 text-stone-800">{resources}</td>
                </tr>
                <tr>
                  <th className="p-2.5 border border-stone-400 bg-stone-50 font-bold text-stone-800">B. Cross-Curricular Integration</th>
                  <td colSpan={3} className="p-2.5 border border-stone-400 text-stone-800">{integration}</td>
                </tr>

                {/* Section IV: 4 Sessions */}
                <tr className="bg-blue-950 text-white font-bold text-center">
                  <td colSpan={4} className="p-2 tracking-wider uppercase text-[11px]">
                    IV. PROCEDURES (FOUR-SESSION DAILY LESSON FLOW)
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-0 border border-stone-400">
                    <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone-400">
                      {/* Session 1 */}
                      <div className="p-3 space-y-2">
                        <div className="bg-stone-100 p-1.5 text-center font-bold border border-stone-300 rounded">
                          <span className="block text-blue-900">SESSION 1 (DAY 1)</span>
                          <span className="text-[10px] text-stone-500 font-normal uppercase">ELICIT &amp; ENGAGE</span>
                        </div>
                        <p className="text-xs text-stone-800 leading-relaxed whitespace-pre-wrap">{session1}</p>
                      </div>

                      {/* Session 2 */}
                      <div className="p-3 space-y-2">
                        <div className="bg-stone-100 p-1.5 text-center font-bold border border-stone-300 rounded">
                          <span className="block text-blue-900">SESSION 2 (DAY 2)</span>
                          <span className="text-[10px] text-stone-500 font-normal uppercase">EXPLORE &amp; EXPLAIN</span>
                        </div>
                        <p className="text-xs text-stone-800 leading-relaxed whitespace-pre-wrap">{session2}</p>
                      </div>

                      {/* Session 3 */}
                      <div className="p-3 space-y-2">
                        <div className="bg-stone-100 p-1.5 text-center font-bold border border-stone-300 rounded">
                          <span className="block text-blue-900">SESSION 3 (DAY 3)</span>
                          <span className="text-[10px] text-stone-500 font-normal uppercase">ELABORATE &amp; DEEPEN</span>
                        </div>
                        <p className="text-xs text-stone-800 leading-relaxed whitespace-pre-wrap">{session3}</p>
                      </div>

                      {/* Session 4 */}
                      <div className="p-3 space-y-2">
                        <div className="bg-stone-100 p-1.5 text-center font-bold border border-stone-300 rounded">
                          <span className="block text-blue-900">SESSION 4 (DAY 4)</span>
                          <span className="text-[10px] text-stone-500 font-normal uppercase">EVALUATE &amp; EXTEND</span>
                        </div>
                        <p className="text-xs text-stone-800 leading-relaxed whitespace-pre-wrap">{session4}</p>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Section V: Remarks & Reflection */}
                <tr className="bg-blue-950 text-white font-bold text-center">
                  <td colSpan={4} className="p-2 tracking-wider uppercase text-[11px]">
                    V. REMARKS &amp; VI. REFLECTION
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} className="p-3 border border-stone-400 text-xs text-stone-700 leading-relaxed">
                    <strong>Formative Assessment Tracking:</strong> Daily formative assessment items documented. Remediation activities provided for learners scoring below 80% mastery before proceeding to the subsequent week's competency cluster.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-6 pt-6 text-center text-xs text-stone-800">
            <div>
              <span className="text-stone-500 block mb-8">Prepared by:</span>
              <strong className="block border-t border-stone-900 pt-1 text-stone-900 uppercase font-serif">{teacher}</strong>
              <span className="text-[11px] text-stone-600">Special Science Teacher II / Subject Teacher</span>
            </div>
            <div>
              <span className="text-stone-500 block mb-8">Checked by:</span>
              <strong className="block border-t border-stone-900 pt-1 text-stone-900 uppercase font-serif">MASTER TEACHER / HEAD TEACHER</strong>
              <span className="text-[11px] text-stone-600">Department Head, SHS Academics</span>
            </div>
            <div>
              <span className="text-stone-500 block mb-8">Noted by:</span>
              <strong className="block border-t border-stone-900 pt-1 text-stone-900 uppercase font-serif">{principal}</strong>
              <span className="text-[11px] text-stone-600">School Head, LNNCHS</span>
            </div>
          </div>
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
                {activeEntry?.lasBg || contentStandard}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-stone-900 uppercase border-b border-stone-200 pb-1 mb-2">
                II. Activity 1: Foundational Discovery
              </h3>
              <p className="text-stone-800 leading-relaxed">
                {activeEntry?.lasA1 || 'Analyze the foundational principles and diagram the key elements of the concept.'}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-stone-900 uppercase border-b border-stone-200 pb-1 mb-2">
                III. Activity 2: Deepening &amp; Real-World Application
              </h3>
              <p className="text-stone-800 leading-relaxed">
                {activeEntry?.lasA2 || 'Apply the concept to a real-world Philippine community or workplace case study.'}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-stone-900 uppercase border-b border-stone-200 pb-1 mb-2">
                IV. Activity 3: Authentic Performance Task &amp; Rubric
              </h3>
              <p className="text-stone-800 leading-relaxed mb-3">
                {activeEntry?.lasA3 || 'Synthesize findings and create an authentic artifact evaluated via the rubric below.'}
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
            <div className="font-mono text-[11px] text-blue-900 bg-white p-2.5 rounded-lg border border-stone-200 select-all">
              app/src/main/assets/web/ilaw/ilaw-generator.html
            </div>
            <div className="font-mono text-[11px] text-stone-600 bg-white p-2.5 rounded-lg border border-stone-200 select-all">
              public/ilaw/ilaw-generator.html (Web-accessible copy)
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
              <span>Launch Standalone Offline Tool in New Tab</span>
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
    </div>
  );
};
