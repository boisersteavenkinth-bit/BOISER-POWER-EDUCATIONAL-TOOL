export interface ILAWBOWEntry {
  grade: string;
  subject: string;
  term: 'Term 1' | 'Term 2' | 'Term 3';
  termNumber: 1 | 2 | 3;
  week: number;
  weekLabel: string;
  topic: string;
  competency: string;
  hours: number;
  sessions: number;
  code: string;
  contentStandard: string;
  performanceStandard: string;
  learningCompetency: string;
  enablingCompetencies: string;
  subjectCategory: 'Filipino' | 'English' | 'Math' | 'Science' | 'AP' | 'MAPEH' | 'TLE' | 'ESP';
  s1: string;
  s2: string;
  s3: string;
  s4: string;
  lasBg?: string;
  lasA1?: string;
  lasA2?: string;
  lasA3?: string;
}

export const ILAW_BOW_DATABASE: ILAWBOWEntry[] = [
  // =========================================================================
  // GRADE 11 — MABISANG KOMUNIKASYON (DepEd Strengthened SHS Filipino)
  // =========================================================================
  {
    grade: 'Grade 11',
    subject: 'Mabisang Komunikasyon',
    term: 'Term 1',
    termNumber: 1,
    week: 1,
    weekLabel: 'Linggo 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-MK11-T1-W1',
    topic: 'Mungkahing Pagpapangkat: Persona, Panahon, at Lugar',
    competency: 'Mungkahing Pagpapangkat: Persona, Panahon, at Lugar',
    learningCompetency: 'Naiisa-isa ang mga kontekstuwal na elemento ng komunikasyon (persona, panahon, at lugar) at naipapaliwanag ang impluwensya nito sa pagbuo ng diskurso.',
    contentStandard: 'Nauunawaan ang mga batayang teorya at salik na nakakaapekto sa mabisang pakikipagtalastasan sa wikang Filipino.',
    performanceStandard: 'Nakabubuo ng mapanuri at etikal na pagsusuri ng iba\'t ibang sitwasyong pangkomunikasyon sa pamayanan at midya.',
    enablingCompetencies: '1. Natutukoy ang papel ng tagapagsalita at tagapakinig. 2. Nasusuri kung paano binabago ng panahon at espasyo ang kahulugan ng salita.',
    subjectCategory: 'Filipino',
    s1: 'Elicit: Pagpapakita ng video clip ng talumpati sa plaza vs. podcast. Engage: Pagsusuri kung bakit nag-iiba ang tono batay sa lugar at kausap.',
    s2: 'Explore: Pangkatang pagsusuri ng tatlong konteksto: pampublikong debate, hapag-kainan, at digital chat. Explain: Teorya ng Persona, Panahon, at Lugar.',
    s3: 'Elaborate: Role-play simulation ng pagpapanayam sa isang lokal na lider ng barangay gamit ang angkop na rehistro.',
    s4: 'Evaluate: Pagsusulit at rubric evaluation ng nabuong iskrip ng panayam na nagpapakita ng pagsasaalang-alang sa persona at lugar.',
    lasBg: 'Ang komunikasyon ay hindi nagaganap sa kawalan; ito ay laging nakaugat sa persona (sino ang nag-uusap), panahon (kailan nagaganap), at lugar (saan umiiral ang diskurso).',
    lasA1: 'Gumawa ng matrix na naghahambing sa paggamit ng wika sa tatlong magkakaibang persona (guro, kaibigan, punong-lungsod).',
    lasA2: 'Suriin ang isang napapanahong balita at tukuyin kung paano nakaimpluwensya ang panahon at lugar sa estilo ng pag-uulat.',
    lasA3: 'Sumulat ng 200-salitang replektibong sanaysay tungkol sa kahalagahan ng pag-angkop sa konteksto sa digital age.'
  },
  {
    grade: 'Grade 11',
    subject: 'Mabisang Komunikasyon',
    term: 'Term 1',
    termNumber: 1,
    week: 2,
    weekLabel: 'Linggo 2',
    hours: 4,
    sessions: 4,
    code: 'SHS-MK11-T1-W2',
    topic: 'Barayti at Baryasyon ng Wika sa Lipunan',
    competency: 'Pagsusuri sa mga Barayti ng Wika (Dayalek, Sosyolek, Idyolek, Etnolek, Ekolek)',
    learningCompetency: 'Natutukoy at nasusuri ang iba\'t ibang barayti ng wika sa pamamagitan ng pagbibigay ng mga halimbawang nagpapakita ng kultural na pagkakaiba.',
    contentStandard: 'Nauunawaan ang kalikasan, barayti, at baryasyon ng wikang Filipino sa iba\'t ibang pamayanan sa bansa.',
    performanceStandard: 'Nakapagpapakita ng paggalang sa multilingguwal at multikultural na realidad ng Pilipinas.',
    enablingCompetencies: '1. Naiisa-isa ang 5 pangunahing barayti. 2. Nakapagtatala ng mga lokal na termino sa sariling rehiyon.',
    subjectCategory: 'Filipino',
    s1: 'Elicit: Paghula sa pinagmulan ng mga diyalekto at salitang kanto. Engage: Audio clips ng iba\'t ibang punto sa Pilipinas.',
    s2: 'Explore: Pangkatang pagbuo ng "Wika Map" ng Northern Mindanao at sariling komunidad. Explain: Sosyolingguwistikang teorya ng barayti.',
    s3: 'Elaborate: Pagsasagawa ng skit na gumagamit ng tamang idyolek at sosyolek nang may etikal na paggalang.',
    s4: 'Evaluate: 10-item formative quiz at pagwawasto ng matrix ng mga barayti ng wika.',
    lasBg: 'Ang pagkakaiba-iba ng wika ay patunay ng mayamang kultura at kasaysayan ng bawat grupo sa kapuluan.',
    lasA1: 'Itala ang 10 salita sa inyong sariling rehiyon (e.g. Bisaya / Chavacano) at ibigay ang katumbas sa Filipino at konteksto ng paggamit.',
    lasA2: 'Tukuyin ang barayti ng wika sa 5 ibinigay na pahayag at ipaliwanag ang iyong sagot.',
    lasA3: 'Sumulat ng isang diyalogo sa pagitan ng dalawang kabataang nagmula sa magkakaibang lalawigan.'
  },
  {
    grade: 'Grade 11',
    subject: 'Mabisang Komunikasyon',
    term: 'Term 1',
    termNumber: 1,
    week: 3,
    weekLabel: 'Linggo 3',
    hours: 4,
    sessions: 4,
    code: 'SHS-MK11-T1-W3',
    topic: 'Kakayahang Pragmatiko at Sosyolingguwistiko',
    competency: 'Kakayahang Komunikatibo: Pragmatiko at Sosyolingguwistiko',
    learningCompetency: 'Naipapamalas ang kakayahang pragmatiko sa pamamagitan ng pagtukoy sa di-tahasang pahiwatig at layunin ng nagsasalita (Speech Acts).',
    contentStandard: 'Nauunawaan ang ugnayan ng pahiwatig, kultura, at etika sa pakikipagtalastasan.',
    performanceStandard: 'Naisasagawa ang mabisang pakikipagtalastasan na umiiwas sa miskomunikasyon at nakapaloob sa kabutihang-asal.',
    enablingCompetencies: '1. Nauunawaan ang illocutionary at perlocutionary force. 2. Nasusuri ang "kagandahang-asal" sa kulturang Pilipino.',
    subjectCategory: 'Filipino',
    s1: 'Elicit: Ano ang ibig sabihin kapag sinabi ng bisita: "Malamig pala rito"? Engage: Konsepto ng "pahiwatig" sa kulturang Pilipino.',
    s2: 'Explore: Pagsusuri ng mga sitwasyon ng pahiwatig sa pamilya at opisina. Explain: Teorya ng Speech Acts ni Austin at Searle.',
    s3: 'Elaborate: Simulasyon ng paglutas sa tampuhan o di-pagkakaunawaan gamit ang mabuting komunikasyon.',
    s4: 'Evaluate: Pagsusuri sa isang maikling dula-dulaan batay sa rubric ng kakayahang pragmatiko.',
    lasBg: 'Ang kakayahang pragmatiko ay ang abilidad na maunawaan ang tunay na kahulugan ng mensahe lampas sa literal na anyo ng mga salita.',
    lasA1: 'Ipaliwanag ang literal vs. pragmatikong kahulugan ng 5 karaniwang pahayag sa Pilipinas.',
    lasA2: 'Sumulat ng solusyon sa isang sitwasyong nagkaroon ng miskomunikasyon dahil sa maling interpretasyon ng pahiwatig.',
    lasA3: 'Bumuo ng sariling gabay sa "Mabisang Pakikipag-usap sa Nakatatanda at mga Awtoridad".'
  },
  {
    grade: 'Grade 11',
    subject: 'Mabisang Komunikasyon',
    term: 'Term 2',
    termNumber: 2,
    week: 1,
    weekLabel: 'Linggo 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-MK11-T2-W1',
    topic: 'Tekstong Akademiko at Impormatibo',
    competency: 'Pagbasa at Pagsusuri ng Tekstong Impormatibo at Deskriptibo',
    learningCompetency: 'Nasusuri ang estruktura, tono, at layunin ng tekstong impormatibo at deskriptibo tungo sa pananaliksik.',
    contentStandard: 'Nauunawaan ang mga katangian at anyo ng iba\'t ibang tekstong binabasa sa Senior High School.',
    performanceStandard: 'Nakasusulat ng isang komprehensibong buod at reaksyong papel batay sa binasang tekstong akademiko.',
    enablingCompetencies: '1. Nakikilala ang paksang pangungusap. 2. Natutukoy ang hulwaran ng organisasyon ng teksto.',
    subjectCategory: 'Filipino',
    s1: 'Elicit: Paghahambing ng balita sa pahayagan at artikulo sa ensiklopedya. Engage: Pagsusuri ng obhetibong tono.',
    s2: 'Explore: Pag-aaral ng tekstong impormatibo ukol sa kalikasan ng Mindanao. Explain: Hulwaran ng organisasyon.',
    s3: 'Elaborate: Pagsulat ng sariling tekstong impormatibo tungkol sa isang natatanging pook sa sariling munisipalidad.',
    s4: 'Evaluate: Peer-evaluation ng isinulat na tekstong impormatibo gamit ang rubrik sa nilalaman at gramatika.',
    lasBg: 'Ang tekstong impormatibo ay naglalayong maghatid ng tumpak, beripikado, at obhetibong kabatiran sa mambabasa.',
    lasA1: 'Basahin ang ibinigay na sipi at balangkasin ang pangunahin at pansuportang ideya.',
    lasA2: 'Itama ang 5 maling impormasyon at ipaliwanag kung bakit mahalaga ang pagsangguni sa mapagkakatiwalaang sanggunian.',
    lasA3: 'Sumulat ng 150-salitang impormatibong anunsyo para sa isang pampublikong serbisyo sa paaralan.'
  },
  {
    grade: 'Grade 11',
    subject: 'Mabisang Komunikasyon',
    term: 'Term 3',
    termNumber: 3,
    week: 1,
    weekLabel: 'Linggo 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-MK11-T3-W1',
    topic: 'Komunikasyon sa Trabaho at Propesyonal na Pagsulat',
    competency: 'Pagsulat ng Liham Pangnegosyo at Memorandum',
    learningCompetency: 'Nakasusulat ng pormal at propesyonal na liham pangnegosyo (liham aplikasyon, pagbibitiw, at kahilingan) alinsunod sa pamantayan ng industriya.',
    contentStandard: 'Nauunawaan ang mga kumbensyon at pormat ng propesyonal at teknikal na komunikasyon sa daigdig ng paggawa.',
    performanceStandard: 'Nakabubuo ng propesyonal na portfolio ng mga dokumento sa trabaho na magagamit sa TechPro at Academic tracks.',
    enablingCompetencies: '1. Naiisa-isa ang bahagi ng liham pangnegosyo. 2. Nagagamit ang pormal na rehistro ng wika sa trabaho.',
    subjectCategory: 'Filipino',
    s1: 'Elicit: Pagsusuri ng isang hindi maayos na email sa aplikasyon. Engage: Kahalagahan ng unang impresyon sa paghahanapbuhay.',
    s2: 'Explore: Paghahambing ng Full Block at Modified Block style. Explain: Bahagi ng liham at layunin ng memorandum.',
    s3: 'Elaborate: Pagsulat ng Liham Aplikasyon at Resume para sa isang aktwal na bakanteng posisyon sa Region X.',
    s4: 'Evaluate: Pagsusuri sa nabuong liham gamit ang pamantayang rubrik sa korespondensiya opisyal.',
    lasBg: 'Ang liham pangnegosyo at memorandum ay salamin ng propesyonalismo at kredibilidad ng isang kawani at kumpanya.',
    lasA1: 'Tukuyin ang 7 bahagi ng ibinigay na halimbawang liham pangnegosyo.',
    lasA2: 'Iwasto ang mga kamalian sa tono, bantas, at pormat ng isang halimbawang draft ng memorandum.',
    lasA3: 'Sumulat ng isang pormal na liham kahilingan para sa Work Immersion / On-the-Job Training.'
  },

  // =========================================================================
  // GRADE 11 — EFFECTIVE COMMUNICATION (English)
  // =========================================================================
  {
    grade: 'Grade 11',
    subject: 'Effective Communication',
    term: 'Term 1',
    termNumber: 1,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-EC11-T1-W1',
    topic: 'Nature, Process, and Models of Human Communication',
    competency: 'Nature, Process, and Models of Human Communication',
    learningCompetency: 'Explains the functions, nature, and process of communication using established models (Shannon-Weaver, Schramm, Berlo SMCR).',
    contentStandard: 'The learner understands the principles, nature, and elements of human communication in multidisciplinary and cultural contexts.',
    performanceStandard: 'The learner demonstrates effective and culturally sensitive oral and written communication exemplifying fundamental communication models.',
    enablingCompetencies: '1. Distinguishes verbal from non-verbal communication cues in interpersonal settings. 2. Identifies systemic communication breakdowns and applies remediation techniques.',
    subjectCategory: 'English',
    s1: 'Elicit: Telephone game exposing distortion. Engage: Video case analysis of intercultural communication breakdowns.',
    s2: 'Explore: Small group diagramming of Shannon-Weaver vs. Schramm models. Explain: Interactive lecture on noise barriers.',
    s3: 'Elaborate: Role-play simulation resolving workplace miscommunication in a simulated BPO / front-office scenario.',
    s4: 'Evaluate: Formative rubric assessment of role-play simulation and 10-item conceptual quiz on communication models.',
    lasBg: 'Communication is a dynamic two-way process of exchanging information, thoughts, and emotions through shared systems of symbols and behavior.',
    lasA1: 'Create a comparative Venn diagram contrasting the linear Shannon-Weaver model with the transactional Schramm interactive model.',
    lasA2: 'Analyze three real-life classroom or online communication breakdowns. Propose a concrete communicative repair strategy for each.',
    lasA3: 'Record or present a 2-minute video commentary demonstrating appropriate non-verbal gestures in formal Philippine workplace settings.'
  },
  {
    grade: 'Grade 11',
    subject: 'Effective Communication',
    term: 'Term 1',
    termNumber: 1,
    week: 2,
    weekLabel: 'Week 2',
    hours: 4,
    sessions: 4,
    code: 'SHS-EC11-T1-W2',
    topic: 'Intercultural Communication & Communicative Strategies',
    competency: 'Intercultural Sensitivity and Communicative Strategies in Discourse',
    learningCompetency: 'Engages in collaborative communicative situations using appropriate communicative strategies and demonstrating sensitivity to cultural nuances.',
    contentStandard: 'The learner demonstrates communicative competence by recognizing barriers in intercultural discourse.',
    performanceStandard: 'The learner skillfully deploys communicative strategies in informal dialogues, panel discussions, and symposiums.',
    enablingCompetencies: '1. Identifies 7 communicative strategies. 2. Evaluates ethnocentrism and bias in media discourse.',
    subjectCategory: 'English',
    s1: 'Elicit: Cross-cultural etiquette quiz. Engage: Discussion on high-context vs low-context Philippine regional discourse.',
    s2: 'Explore: Case study of multinational company email exchanges. Explain: Hofstede cultural dimensions in conversation.',
    s3: 'Elaborate: Mock legislative or barangay council debate deploying assigned communicative strategy cards.',
    s4: 'Evaluate: Checklist scoring of strategy card utilization during the live mock debate.',
    lasBg: 'Intercultural communication happens when participants from differing cultural backgrounds negotiate shared meaning respectfully.',
    lasA1: 'Classify 10 dialogue excerpts into Nomination, Restriction, Turn-taking, Topic Control, Topic Shifting, Repair, or Termination.',
    lasA2: 'Write a short script showing how a chairperson can use "Repair" and "Topic Shifting" to resolve an argument.',
    lasA3: 'Draft a Code of Intercultural Conduct for your Senior High School classroom.'
  },
  {
    grade: 'Grade 11',
    subject: 'Effective Communication',
    term: 'Term 2',
    termNumber: 2,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-EC11-T2-W1',
    topic: 'Critical Reading & Academic Text Structures (EAPP)',
    competency: 'Academic Text Structures and Critical Reading Across Disciplines',
    learningCompetency: 'Differentiates language and text structures used in academic texts from various disciplines (IMRaD format, problem-solution, cause-effect).',
    contentStandard: 'The learner understands the principles, text structures, and objective conventions of academic writing.',
    performanceStandard: 'The learner produces a comprehensive critique of an academic journal article or research report.',
    enablingCompetencies: '1. Locates thesis statements and topic sentences. 2. Synthesizes multiple texts on a single topic.',
    subjectCategory: 'English',
    s1: 'Elicit: Compare social media post vs scientific journal abstract. Engage: Vocabulary audit of academic tone.',
    s2: 'Explore: Highlighting text structures in research papers. Explain: Academic objectivity, hedges, and nominalization.',
    s3: 'Elaborate: Annotating an academic paper relevant to student track (TechPro vs Academic).',
    s4: 'Evaluate: Text structure identification quiz and abstract critique worksheet.',
    lasBg: 'Academic language is formal, objective, cautious, and structurally organized to convey scientific rigor.',
    lasA1: 'Read a research abstract and label its Introduction, Methodology, Results, and Discussion (IMRaD).',
    lasA2: 'Convert 5 informal, biased paragraphs into objective, academic prose.',
    lasA3: 'Write an academic review of a peer-reviewed article in your field of interest.'
  },
  {
    grade: 'Grade 11',
    subject: 'Effective Communication',
    term: 'Term 3',
    termNumber: 3,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-EC11-T3-W1',
    topic: 'Workplace Correspondence & Technical Writing',
    competency: 'Professional and Workplace Correspondence (Memos, Business Letters)',
    learningCompetency: 'Drafts professional workplace communications including executive summaries, formal memoranda, and business inquiries.',
    contentStandard: 'The learner understands professional correspondence standards, ethical obligations, and corporate voice.',
    performanceStandard: 'The learner compiles a professional career portfolio with polished correspondence artifacts.',
    enablingCompetencies: '1. Applies standard business formatting. 2. Adheres to conciseness and courtesy principles.',
    subjectCategory: 'English',
    s1: 'Elicit: Critique of unprofessional corporate emails. Engage: Impact of tone on client trust.',
    s2: 'Explore: Deconstructing memorandum structure. Explain: Executive summary writing standards.',
    s3: 'Elaborate: Drafting a formal inter-office memorandum requesting facility upgrades.',
    s4: 'Evaluate: Scoring memorandum artifacts against corporate rubric.',
    lasBg: 'Clear professional correspondence saves institutional time and prevents costly operational mistakes.',
    lasA1: 'Identify 5 errors in tone or format in the provided business memo.',
    lasA2: 'Draft a concise 1-page executive memo proposing an eco-friendly campus initiative.',
    lasA3: 'Write a professional email inquiring about internship qualifications at an IT firm.'
  },

  // =========================================================================
  // GRADE 11 — GENERAL MATHEMATICS
  // =========================================================================
  {
    grade: 'Grade 11',
    subject: 'General Mathematics',
    term: 'Term 1',
    termNumber: 1,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-GM11-T1-W1',
    topic: 'Functions, Piecewise Functions & Mathematical Modeling',
    competency: 'Functions, Piecewise Functions & Mathematical Modeling',
    learningCompetency: 'Represents real-life situations using functions, including piecewise functions, and evaluates function values across domains.',
    contentStandard: 'The learner understands key concepts of functions and piecewise mathematical models.',
    performanceStandard: 'The learner models real-world situations involving cost functions, utility rates, and step billing.',
    enablingCompetencies: '1. Evaluates algebraic functions f(x). 2. Graphically plots piecewise step-functions.',
    subjectCategory: 'Math',
    s1: 'Elicit: Jeepney fare calculation rules (base fare + additional km). Engage: Stepwise cost modeling.',
    s2: 'Explore: Graphing mobile data plans and electrical consumption tiers. Explain: Piecewise domain notation.',
    s3: 'Elaborate: Formulating a piecewise function for local tricycle tariff rates in the municipality.',
    s4: 'Evaluate: 5-item piecewise evaluation problem set and word problem rubric.',
    lasBg: 'Functions describe predictable relationships where each distinct input produces exactly one definite output.',
    lasA1: 'Construct a piecewise function C(d) representing local jeepney fare: P13 for the first 4 km, plus P1.75 for each additional km.',
    lasA2: 'Evaluate the function f(x) = { 2x + 1 for x <= 0; x^2 - 3 for x > 0 } at x = -3, 0, and 4.',
    lasA3: 'Design a tiered pricing model for a school entrepreneurship food stall.'
  },
  {
    grade: 'Grade 11',
    subject: 'General Mathematics',
    term: 'Term 2',
    termNumber: 2,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-GM11-T2-W1',
    topic: 'Simple and Compound Interest & Annuities',
    competency: 'Business Mathematics: Simple vs Compound Interest',
    learningCompetency: 'Computes interest, maturity value, future value, and present value in simple and compound interest environments.',
    contentStandard: 'The learner understands the principles of time value of money and financial instruments.',
    performanceStandard: 'The learner investigates loan options and investment products to make prudent financial decisions.',
    enablingCompetencies: '1. Solves I = Prt. 2. Computes compound interest A = P(1 + r/n)^(nt).',
    subjectCategory: 'Math',
    s1: 'Elicit: Why do banks pay interest on savings? Engage: The power of compounding over 20 years.',
    s2: 'Explore: Spreadsheet modeling of simple vs compound growth. Explain: Compound interest formulas.',
    s3: 'Elaborate: Comparing 3 Philippine commercial bank savings and time-deposit options.',
    s4: 'Evaluate: Comparative problem set on loan amortization and interest computation.',
    lasBg: 'Understanding the time value of money empowers learners to build wealth and avoid exploitative debt.',
    lasA1: 'Compute the maturity value of P50,000 invested at 6% simple interest for 5 years.',
    lasA2: 'Calculate the compound amount if P50,000 is compounded quarterly at 6% annual rate for 5 years. Find the interest difference.',
    lasA3: 'Analyze a motorcycle installment plan and calculate its effective annual interest rate.'
  },
  {
    grade: 'Grade 11',
    subject: 'General Mathematics',
    term: 'Term 3',
    termNumber: 3,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-GM11-T3-W1',
    topic: 'Logic, Truth Tables, and Tautologies',
    competency: 'Mathematical Logic: Propositions, Truth Tables & Validity',
    learningCompetency: 'Determines the truth value of compound propositions and establishes logical equivalence using truth tables.',
    contentStandard: 'The learner understands propositional logic, logical connectives, and fallacies in reasoning.',
    performanceStandard: 'The learner establishes the validity of arguments in legal, commercial, and technical debates.',
    enablingCompetencies: '1. Translates English statements into symbolic logic. 2. Identifies converse, inverse, and contrapositive.',
    subjectCategory: 'Math',
    s1: 'Elicit: Logic riddles and paradoxical statements. Engage: Everyday deceptive advertising arguments.',
    s2: 'Explore: Constructing truth tables for conjunction, disjunction, implication. Explain: De Morgan Laws.',
    s3: 'Elaborate: Analyzing legal contracts or warranty claims using propositional logic.',
    s4: 'Evaluate: Truth table verification test for compound logical propositions.',
    lasBg: 'Mathematical logic forms the algorithmic foundation of computer programming and legal deduction.',
    lasA1: 'Symbolize: "If it rains and the electricity is cut, then the computer lab is closed."',
    lasA2: 'Construct the full truth table for ~(p AND q) <-> (~p OR ~q).',
    lasA3: 'Explain the logical fallacy in: "All doctors are smart. Maria is smart, therefore Maria is a doctor."'
  },

  // =========================================================================
  // GRADE 11 — GENERAL SCIENCE
  // =========================================================================
  {
    grade: 'Grade 11',
    subject: 'General Science',
    term: 'Term 1',
    termNumber: 1,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-GS11-T1-W1',
    topic: 'Earth Subsystems & Plate Tectonic Processes',
    competency: 'Earth Subsystems & Plate Tectonics in the Philippine Archipelago',
    learningCompetency: 'Describes the interactions between Earth subsystems and explains how internal heat drives plate tectonics and volcanism in the Philippine archipelago.',
    contentStandard: 'The learner understands the geosphere, hydrosphere, atmosphere, biosphere, and plate boundary dynamics.',
    performanceStandard: 'The learner conducts a community hazard risk assessment for earthquakes, tsunamis, or landslides.',
    enablingCompetencies: '1. Identifies convergent, divergent, and transform boundaries. 2. Explains subduction along the Philippine Trench.',
    subjectCategory: 'Science',
    s1: 'Elicit: Video footage of recent Mindanao earthquakes. Engage: PHIVOLCS FaultFinder digital map search.',
    s2: 'Explore: Modeling tectonic plate motion with graham crackers and frosting. Explain: Mantle convection.',
    s3: 'Elaborate: Preparing a Disaster Risk Reduction evacuation plan for the local barangay.',
    s4: 'Evaluate: Diagram analysis quiz of tectonic plate boundaries and DRRM plan rubric.',
    lasBg: 'The Earth operates as a unified dynamic system where geological movements continuously shape landforms, weather, and habitats.',
    lasA1: 'Draw and label a cross-section showing subduction along the Philippine Trench, indicating magma generation.',
    lasA2: 'Explain why Northern Mindanao experiences both tectonic earthquakes and volcanic activity in 4 scientific sentences.',
    lasA3: 'Formulate an evacuation checklist and route map for your family during a magnitude 7.2 earthquake.'
  },
  {
    grade: 'Grade 11',
    subject: 'General Science',
    term: 'Term 2',
    termNumber: 2,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-GS11-T2-W1',
    topic: 'Chemical Bonding & Molecular Structure',
    competency: 'Chemical Bonding, Lewis Dot Structures, and Molecular Geometry',
    learningCompetency: 'Relates electron configuration to periodic properties and predicts ionic vs covalent bonding behaviors.',
    contentStandard: 'The learner understands the octet rule, valence electrons, and intermolecular forces.',
    performanceStandard: 'The learner predicts chemical properties of everyday household and agricultural substances.',
    enablingCompetencies: '1. Draws Lewis electron dot diagrams. 2. Differentiates polar and nonpolar covalent bonds.',
    subjectCategory: 'Science',
    s1: 'Elicit: Why does salt dissolve in water while cooking oil does not? Engage: Polarity demonstration.',
    s2: 'Explore: Constructing ball-and-stick molecular models. Explain: Electronegativity differences.',
    s3: 'Elaborate: Analyzing Safety Data Sheets (SDS) of common agricultural pesticides used in Region X.',
    s4: 'Evaluate: Lewis dot structure drawing quiz and polarity prediction sheet.',
    lasBg: 'Valence electrons govern how atoms interact, forming chemical bonds that dictate physical and chemical characteristics.',
    lasA1: 'Draw Lewis dot structures for H2O, CO2, and NaCl, indicating partial charges.',
    lasA2: 'Predict whether NF3 and CH4 are polar or nonpolar molecules based on electronegativity and geometry.',
    lasA3: 'Explain the role of hydrogen bonding in giving water its unusually high boiling point and surface tension.'
  },
  {
    grade: 'Grade 11',
    subject: 'General Science',
    term: 'Term 3',
    termNumber: 3,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-GS11-T3-W1',
    topic: 'Newton Laws of Motion & Momentum',
    competency: 'Kinematics, Newton Laws of Motion, and Impact Mitigation',
    learningCompetency: 'Applies Newton laws of motion and impulse-momentum theorem to analyze and solve real-world vehicular safety problems.',
    contentStandard: 'The learner understands forces, acceleration, momentum, and energy conservation.',
    performanceStandard: 'The learner designs and tests an impact mitigation prototype (egg-drop or vehicle crash test).',
    enablingCompetencies: '1. Solves F = ma with free-body diagrams. 2. Explains impulse J = F * delta_t.',
    subjectCategory: 'Science',
    s1: 'Elicit: Crash test dummy slow-motion footage. Engage: Why do modern cars have crumple zones?',
    s2: 'Explore: Motion sensor cart lab on inclined tracks. Explain: Impulse-momentum theorem.',
    s3: 'Elaborate: Egg-drop engineering challenge using recycled materials to maximize impact duration.',
    s4: 'Evaluate: Free-body diagram problem solving exam and egg-drop engineering rubric.',
    lasBg: 'Newton laws explain the dynamics of motion, providing critical engineering principles for transport safety.',
    lasA1: 'A 1,500-kg vehicle traveling at 20 m/s comes to a stop in 0.5 seconds upon hitting a barrier. Calculate the average impact force.',
    lasA2: 'Draw a complete Free-Body Diagram for a motorcycle traveling at constant velocity on a rough highway.',
    lasA3: 'Explain scientifically why wearing seatbelts and having airbags saves lives during sudden deceleration.'
  },

  // =========================================================================
  // GRADE 11 — LIFE AND CAREER SKILLS
  // =========================================================================
  {
    grade: 'Grade 11',
    subject: 'Life and Career Skills',
    term: 'Term 1',
    termNumber: 1,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-LCS11-T1-W1',
    topic: 'Self-Awareness, Emotional Intelligence & Personal Values',
    competency: 'Self-Awareness, Emotional Intelligence & Personal Values',
    learningCompetency: 'Analyzes personal strengths, growth areas, and emotional intelligence competencies (Goleman framework) to guide life choices.',
    contentStandard: 'The learner understands personal identity, emotional regulation, and ethical values.',
    performanceStandard: 'The learner creates a comprehensive personal development roadmap aligning values with career ambitions.',
    enablingCompetencies: '1. Performs a Personal SWOT Analysis. 2. Identifies healthy emotional regulation techniques.',
    subjectCategory: 'ESP',
    s1: 'Elicit: Who Am I? reflective shield drawing. Engage: Daniel Goleman 5 EQ domains.',
    s2: 'Explore: Peer-feedback circle on perceived character strengths. Explain: Johari Window model.',
    s3: 'Elaborate: Drafting an actionable Personal SWOT matrix.',
    s4: 'Evaluate: Rubric evaluation of Personal SWOT Portfolio and reflective self-assessment journal.',
    lasBg: 'Self-awareness is the cornerstone of leadership, enabling individuals to manage stress and build resilience.',
    lasA1: 'Complete your Johari Window matrix by listing 4 traits in Open, Blind, Hidden, and Unknown quadrants.',
    lasA2: 'Construct a Personal SWOT analysis focusing on your Senior High School academic and technical skills.',
    lasA3: 'Write a 250-word reflective essay detailing a situation where you successfully applied emotional self-regulation.'
  },
  {
    grade: 'Grade 11',
    subject: 'Life and Career Skills',
    term: 'Term 2',
    termNumber: 2,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-LCS11-T2-W1',
    topic: 'Philippine Labor Market Trends & 21st Century Skills',
    competency: 'Philippine Labor Market Trends & 21st Century In-Demand Skills',
    learningCompetency: 'Investigates emerging career trajectories, TechPro industries, and Fourth Industrial Revolution (4IR) skill requirements in Region X.',
    contentStandard: 'The learner understands economic shifts, industry demands, and lifelong learning competencies.',
    performanceStandard: 'The learner formulates a viable career pathway matching personal competencies with regional labor market needs.',
    enablingCompetencies: '1. Analyzes DOLE/TESDA job demand reports. 2. Identifies transferable technical and soft skills.',
    subjectCategory: 'TLE',
    s1: 'Elicit: Jobs that existed 10 years ago vs today. Engage: Automation and AI impacts in the Philippines.',
    s2: 'Explore: Reviewing DOLE occupational forecasts. Explain: Hard skills vs soft skills in hiring.',
    s3: 'Elaborate: Mapping Senior High School track specializations to high-growth regional industries in Region X.',
    s4: 'Evaluate: Career pathway alignment report and presentation of industry skill requirement matrices.',
    lasBg: 'The contemporary workforce demands adaptive professionals possessing both technical mastery and interpersonal agility.',
    lasA1: 'List 5 high-demand industries in Northern Mindanao / Region X and note 2 essential competencies required by each.',
    lasA2: 'Compare the educational requirements, career growth, and starting compensation of your top 2 career choices.',
    lasA3: 'Draft an action plan detailing the certifications (NC II / NC III) or academic degrees needed to achieve your career goal.'
  },
  {
    grade: 'Grade 11',
    subject: 'Life and Career Skills',
    term: 'Term 3',
    termNumber: 3,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-LCS11-T3-W1',
    topic: 'Financial Literacy & Personal Budgeting Systems',
    competency: 'Financial Literacy, Personal Budgeting & Saving Systems',
    learningCompetency: 'Demonstrates practical financial literacy by drafting personal cash-flow budgets and identifying savings and investment instruments.',
    contentStandard: 'The learner understands principles of sound personal financial management, budgeting, and debt avoidance.',
    performanceStandard: 'The learner develops a realistic personal budget and emergency fund plan.',
    enablingCompetencies: '1. Applies the 50/30/20 budget framework. 2. Differentiates needs from wants.',
    subjectCategory: 'TLE',
    s1: 'Elicit: How do you manage your weekly allowance? Engage: Realities of inflation and purchasing power.',
    s2: 'Explore: Creating an interactive spreadsheet for daily expense tracking. Explain: The 50/30/20 rule.',
    s3: 'Elaborate: Budgeting simulation: Managing a monthly minimum wage salary for a young professional living in Cagayan de Oro.',
    s4: 'Evaluate: Personal monthly budget plan scored against accuracy, realism, and emergency savings allocation.',
    lasBg: 'Financial independence begins with disciplined cash-flow tracking, prioritizing emergency reserves, and smart spending.',
    lasA1: 'Categorize a list of 15 common teen expenses into Essential Needs, Discretionary Wants, and Future Savings.',
    lasA2: 'Draft a weekly budget using the 50/30/20 rule based on a hypothetical allowance of P1,000.',
    lasA3: 'Calculate how long it will take to build a P15,000 emergency fund saving P250 each week.'
  },

  // =========================================================================
  // GRADE 12 — TECHPRO APPLIED SPECIALIZATION
  // =========================================================================
  {
    grade: 'Grade 12',
    subject: 'TechPro Applied Specialization',
    term: 'Term 1',
    termNumber: 1,
    week: 1,
    weekLabel: 'Week 1',
    hours: 4,
    sessions: 4,
    code: 'SHS-TP12-T1-W1',
    topic: 'Occupational Health, Safety & Equipment Diagnostics',
    competency: 'OH&S Standards, Risk Mitigation, and Diagnostic Protocols',
    learningCompetency: 'Applies national Occupational Health and Safety (OH&S) standards and conducts systematic equipment diagnostics in workshop environments.',
    contentStandard: 'The learner understands workplace safety regulations, hazardous materials protocols, and preventive maintenance routines.',
    performanceStandard: 'The learner performs an end-to-end hazard risk audit of the school workshop and executes diagnostic checklists.',
    enablingCompetencies: '1. Identifies PPE standards according to DOLE regulations. 2. Operates diagnostic multimeters and diagnostic software safely.',
    subjectCategory: 'TLE',
    s1: 'Elicit: Workshop hazard spot-the-error photo challenge. Engage: Real-life industrial safety accident case studies.',
    s2: 'Explore: Hands-on inspection of workshop electrical tools. Explain: 5S methodology and Lockout/Tagout (LOTO) protocols.',
    s3: 'Elaborate: Drafting an OH&S compliance checklist for the school TechPro laboratory.',
    s4: 'Evaluate: Workshop safety inspection practical test and checklist scoring.',
    lasBg: 'Workplace safety protects human life and guarantees long-term productivity and industrial efficiency.',
    lasA1: 'List 5 common electrical and mechanical workshop hazards and state the appropriate PPE required for each.',
    lasA2: 'Create a Lockout/Tagout (LOTO) step-by-step flowchart for servicing heavy machinery.',
    lasA3: 'Conduct a safety audit of a designated workstation in your school laboratory and document 3 recommended improvements.'
  },

  // =========================================================================
  // GRADE 10 — ARALING PANLIPUNAN
  // =========================================================================
  {
    grade: 'Grade 10',
    subject: 'Araling Panlipunan 10',
    term: 'Term 1',
    termNumber: 1,
    week: 1,
    weekLabel: 'Linggo 1',
    hours: 4,
    sessions: 4,
    code: 'JHS-AP10-T1-W1',
    topic: 'Mga Isyung Pangkapaligiran at Disaster Risk Reduction',
    competency: 'Pagsusuri sa mga Isyung Pangkapaligiran at Katutubong Pamamahala',
    learningCompetency: 'Nasusuri ang mga suliraning pangkapaligiran sa sariling pamayanan at ang kahalagahan ng Community-Based Disaster Risk Reduction (CBDRRM).',
    contentStandard: 'Nauunawaan ang mga sanhi at implikasyon ng mga hamong pangkapaligiran sa bansa.',
    performanceStandard: 'Nakabubuo ng community action plan para sa pangangalaga ng kapaligiran at kahandaan sa kalamidad.',
    enablingCompetencies: '1. Natutukoy ang Top-down vs Bottom-up DRRM approach. 2. Nasusuri ang epekto ng climate change sa agrikultura.',
    subjectCategory: 'AP',
    s1: 'Elicit: Larawan ng mga nakaraang bagyo at pagbaha sa Mindanao. Engage: Pagsusuri ng kahandaan ng barangay.',
    s2: 'Explore: Pangkatang pagsusuri ng CBDRRM framework. Explain: Apat na yugto ng disaster management.',
    s3: 'Elaborate: Paggawa ng hazard map ng sariling barangay na tumutukoy sa mga ligtas na evacuation centers.',
    s4: 'Evaluate: Pagsusulit sa DRRM concepts at pagmamarka sa nabuong hazard map.',
    lasBg: 'Ang epektibong pamamahala sa kalamidad ay nakasalalay sa pagkakaisa at partisipasyon ng bawat mamamayan sa komunidad.',
    lasA1: 'Ikumpara ang Top-Down Approach at Bottom-Up Approach sa Disaster Risk Reduction Management.',
    lasA2: 'Gumuhit ng payak na hazard map ng inyong purok at markahan ang posibleng banta ng baha o landslide.',
    lasA3: 'Sumulat ng 3 konkretong hakbang na gagawin ng iyong pamilya bago, habang, at pagkatapos ng bagyo.'
  }
];

/**
 * Helper to retrieve distinct grade levels from the BOW database
 */
export function getDistinctGrades(): string[] {
  const grades = Array.from(new Set(ILAW_BOW_DATABASE.map(e => e.grade)));
  // Ensure Grade 11 is first
  return grades.sort((a, b) => {
    if (a === 'Grade 11') return -1;
    if (b === 'Grade 11') return 1;
    return a.localeCompare(b);
  });
}

/**
 * Helper to retrieve distinct subjects for a given grade level
 */
export function getSubjectsForGrade(grade: string): string[] {
  const subjects = Array.from(
    new Set(
      ILAW_BOW_DATABASE.filter(e => e.grade === grade).map(e => e.subject)
    )
  );
  return subjects.sort((a, b) => {
    if (a === 'Mabisang Komunikasyon') return -1;
    if (b === 'Mabisang Komunikasyon') return 1;
    return a.localeCompare(b);
  });
}

/**
 * Helper to retrieve available terms for a given grade and subject
 */
export function getTermsForSubject(grade: string, subject: string): Array<'Term 1' | 'Term 2' | 'Term 3'> {
  const terms = Array.from(
    new Set(
      ILAW_BOW_DATABASE
        .filter(e => e.grade === grade && e.subject === subject)
        .map(e => e.term)
    )
  );
  return (['Term 1', 'Term 2', 'Term 3'] as const).filter(t => terms.includes(t));
}

/**
 * Helper to retrieve BOW entries for a selected grade, subject, and term
 */
export function getEntriesForTerm(
  grade: string,
  subject: string,
  term: 'Term 1' | 'Term 2' | 'Term 3'
): ILAWBOWEntry[] {
  return ILAW_BOW_DATABASE.filter(
    e => e.grade === grade && e.subject === subject && e.term === term
  );
}
