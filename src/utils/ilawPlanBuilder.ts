import { ILAWBOWEntry } from '../data/ilawBOWDatabase';
import { ILAWCompletePlan, ILAWLearningActivitySheet, ILAWSlide } from '../types/ilawDO3';
import { computeSessionDates } from '../data/calendarConfig';

interface PlanGenerationOptions {
  entry: ILAWBOWEntry;
  teacher: string;
  school: string;
  section: string;
  dates: string;
  division?: string;
  region?: string;
  lessonTitle?: string;
  startDate?: string;
  holidays?: string[];
}

export function generateDO3PlanFromBOWEntry(options: PlanGenerationOptions): ILAWCompletePlan {
  const {
    entry,
    teacher,
    school,
    section,
    dates,
    division = 'Division of Lanao del Norte',
    region = 'Region X – Northern Mindanao',
    lessonTitle,
    startDate,
    holidays = []
  } = options;

  const actualTitle = lessonTitle && lessonTitle.trim() !== '' ? lessonTitle : entry.topic;

  // Compute session dates
  let sessionDateStrings: string[] = ['Session 1', 'Session 2', 'Session 3', 'Session 4'];
  if (startDate) {
    const datesList = computeSessionDates(startDate, entry.week, holidays, entry.sessions || 4);
    if (datesList && datesList.length > 0) {
      sessionDateStrings = datesList.map(d =>
        d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      );
    }
  }

  // Generate 4 Session Objectives
  const objectives = [
    {
      sessionNumber: 1,
      sessionDate: sessionDateStrings[0] || 'Session 1',
      objectives: [
        `Identify and define foundational principles of ${actualTitle}.`,
        `Examine real-life applications and context within ${entry.subject}.`,
        'Demonstrate active engagement and collaborative problem analysis.'
      ]
    },
    {
      sessionNumber: 2,
      sessionDate: sessionDateStrings[1] || 'Session 2',
      objectives: [
        `Analyze core structures, models, and elements of ${entry.competency}.`,
        'Execute guided collaborative exploration using contextualized graphic organizers or case studies.'
      ]
    },
    {
      sessionNumber: 3,
      sessionDate: sessionDateStrings[2] || 'Session 3',
      objectives: [
        `Synthesize key insights and demonstrate problem-solving in real-world scenarios.`,
        'Formulate evidence-based arguments, solutions, or creative models.'
      ]
    },
    {
      sessionNumber: 4,
      sessionDate: sessionDateStrings[3] || 'Session 4',
      objectives: [
        `Evaluate practical mastery and produce the standalone individual written output.`,
        'Reflect on personal learning progress and practical career or civic application.'
      ]
    }
  ];

  // Subject-specific activity generator
  const activitySheets: ILAWLearningActivitySheet[] = [1, 2, 3, 4].map(sNum => {
    const sDate = sessionDateStrings[sNum - 1] || `Session ${sNum}`;
    return createActivitySheetForSubject(entry, actualTitle, sNum, sDate);
  });

  // Presentation slides with >= 35pt body text
  const presentationSlides: ILAWSlide[] = createSlidesForPlan(entry, actualTitle, teacher, school, sessionDateStrings);

  return {
    id: `ilaw-${entry.grade.toLowerCase().replace(/\s+/g, '-')}-${entry.subject.toLowerCase().replace(/\s+/g, '-')}-t${entry.termNumber}-w${entry.week}`,
    header: {
      lesson: actualTitle,
      learningArea: entry.subject,
      teacher: teacher,
      contentEvaluator: 'Content Evaluator: ____________________',
      languageEvaluator: 'Language Evaluator: ____________________',
      formatEvaluator: 'Format and Layout Evaluator: ____________________',
      school: school,
      division: division,
      region: region,
      gradeLevelAndSection: `${entry.grade} - ${section}`,
      gradeBand: entry.grade.includes('11') || entry.grade.includes('12') ? '11-12' : '7-10',
      term: entry.termNumber,
      bowWeek: `${entry.weekLabel} (${entry.hours} Hours)`,
      inclusiveTeachingDates: dates,
      numberOfSessions: entry.sessions || 4,
      references: [
        `DepEd Strengthened Senior High School Curriculum Guide (${entry.subject})`,
        `DepEd Order No. 009, s. 2026 (Three-Term Calendar and Trimester Policy)`,
        `DepEd Order No. 3, s. 2026 (Instructional Leadership and Academic Workflow)`,
        `Official Budget of Work (BOW) — ${entry.grade} ${entry.subject}`
      ],
      declarationOfAIUse:
        'This lesson plan was formulated with the assistance of artificial intelligence tools in drafting, structuring, and organizing competencies, learning tasks, guide questions, and assessment blueprints in compliance with DepEd Order No. 3, s. 2026 Annex A. The teacher-developer thoroughly reviewed, adapted, contextualized, and takes full professional accountability for its pedagogical integrity and alignment with learner needs and curriculum standards.'
    },
    matrix: {
      intentions: `The 4-session learning cycle aims to guide learners in mastering ${actualTitle} within ${entry.subject}. Through contextualized inquiries, collaborative workshops, and structured individual outputs, learners develop critical thinking, disciplinary competence, and authentic real-world problem-solving abilities aligned with DepEd 2026 standards.`,
      competency: {
        melc: entry.learningCompetency,
        content: entry.topic,
        contentStandard: entry.contentStandard,
        performanceStandard: entry.performanceStandard
      },
      objectives: objectives,
      learnerContext: `Learners in ${section} demonstrate diverse socio-economic, linguistic, and academic readiness. Instruction employs multi-tiered scaffolding, high-contrast visual materials, collaborative group structures, and differentiated inquiry challenges to guarantee universal access and mastery.`,
      learningExperience: [
        {
          sessionNumber: 1,
          sessionDate: sessionDateStrings[0] || 'Session 1',
          preLesson: {
            engage: {
              time: '10 mins',
              activity: entry.s1.split('Engage:')[1]?.trim() || `Introductory provocation and multimedia exemplar connecting to ${actualTitle}.`
            },
            elicit: {
              time: '10 mins',
              activity: entry.s1.split('Engage:')[0]?.replace('Elicit:', '').trim() || `Diagnostic check: Activating prior knowledge regarding ${entry.topic}.`,
              expectedResponses: 'Learners draw upon everyday experiences, prior grade concepts, and regional community practices.'
            }
          },
          flow: {
            explore: {
              time: '25 mins',
              groupActivity: {
                formatType: 'Collaborative Problem Analysis',
                title: `Group Investigation: Deconstructing ${actualTitle}`,
                instructions: 'Work in assigned clusters of 4-5 members to analyze the provided case scenario and record findings on the group matrix.'
              },
              individualOutput: {
                outputType: 'Written Conceptual Map',
                title: 'Personal Learning Synthesis',
                instructions: 'Individually record the core definitions and draft one concrete real-world example from your own household or community.'
              }
            },
            explain: {
              time: '15 mins',
              synthesisQuestions: [
                `What are the critical elements of ${actualTitle}?`,
                'How does understanding this concept prevent common errors or misunderstandings in everyday life?',
                'In what ways does this topic connect to your chosen academic or TechPro track?'
              ]
            }
          },
          learningResources: [
            'DepEd Learner Material',
            'Contextualized Activity Sheet (LAS 1)',
            'Audio-visual presentation slide deck'
          ],
          opportunitiesForIntegration: [
            { area: 'Values & Ethics', connection: 'Practicing intellectual honesty, constructive peer critique, and active listening.' },
            { area: 'Career & TechPro', connection: 'Relating analytical thinking to industrial standards and professional competence.' }
          ]
        },
        {
          sessionNumber: 2,
          sessionDate: sessionDateStrings[1] || 'Session 2',
          preLesson: {
            engage: {
              time: '10 mins',
              activity: 'Recap of Session 1 key concepts through a rapid flash-inquiry game.'
            },
            elicit: {
              time: '10 mins',
              activity: 'Targeted questioning examining theoretical nuances and structural models.',
              expectedResponses: 'Learners articulate connections between conceptual definitions and practical scenarios.'
            }
          },
          flow: {
            explore: {
              time: '25 mins',
              groupActivity: {
                formatType: 'Matrix Analysis & Venn Diagramming',
                title: `Comparative Modeling: ${entry.topic}`,
                instructions: 'Collaboratively chart the differences, relationships, and operational mechanisms using the provided structured template.'
              },
              individualOutput: {
                outputType: 'Structured Problem Sheet',
                title: 'Analytical Worksheet 2',
                instructions: 'Answer the 3 diagnostic challenge questions independently with complete justifications.'
              }
            },
            explain: {
              time: '15 mins',
              synthesisQuestions: [
                'Which factors most significantly alter the outcome in this process?',
                'How can we apply systematic methods to evaluate conflicting claims or data points?'
              ]
            }
          },
          learningResources: ['Case study cards', 'Interactive diagramming templates', 'DepEd Teacher Guide'],
          opportunitiesForIntegration: [
            { area: 'Digital Citizenship', connection: 'Evaluating source credibility and ethical citation.' }
          ]
        },
        {
          sessionNumber: 3,
          sessionDate: sessionDateStrings[2] || 'Session 3',
          preLesson: {
            engage: {
              time: '10 mins',
              activity: 'Real-world dilemma or engineering/social challenge presentation.'
            },
            elicit: {
              time: '10 mins',
              activity: 'Brainstorming preliminary intervention strategies.',
              expectedResponses: 'Proposed step-by-step methodologies to address community or technical needs.'
            }
          },
          flow: {
            explore: {
              time: '25 mins',
              groupActivity: {
                formatType: 'Simulation & Workshop Practicum',
                title: `Application Workshop: ${actualTitle}`,
                instructions: 'Simulate the target process, draft actionable solutions, and critique peer prototypes against standard rubrics.'
              },
              individualOutput: {
                outputType: 'Action Proposal / Solution Draft',
                title: 'Individual Implementation Plan',
                instructions: 'Formulate a written 3-step action roadmap detailing concrete steps, resources, and expected metrics.'
              }
            },
            explain: {
              time: '15 mins',
              synthesisQuestions: [
                'What challenges arose during collaborative problem-solving, and how were they resolved?',
                'How can this solution be scaled or adapted to local community realities?'
              ]
            }
          },
          learningResources: ['Simulation materials', 'Rubric checklists', 'Field examples'],
          opportunitiesForIntegration: [
            { area: 'Community Action', connection: 'Aligning school learning with barangay or regional development objectives.' }
          ]
        },
        {
          sessionNumber: 4,
          sessionDate: sessionDateStrings[3] || 'Session 4',
          preLesson: {
            engage: {
              time: '10 mins',
              activity: 'Gallery walk of student group artifacts and peer constructive feedback.'
            },
            elicit: {
              time: '10 mins',
              activity: 'Self-assessment check: Identifying remaining learning gaps before final evaluation.',
              expectedResponses: 'Reflections on strengths, masteries, and areas requiring clarification.'
            }
          },
          flow: {
            explore: {
              time: '25 mins',
              groupActivity: {
                formatType: 'Peer Review & Synthesis Circle',
                title: 'Quality Verification & Defense',
                instructions: 'Conduct structured peer audits using the official DepEd 4-criteria rubric.'
              },
              individualOutput: {
                outputType: 'Summative Written Output & Reflection',
                title: 'Mastery Assessment & Reflective Journal',
                instructions: 'Complete the individual performance assessment task and write a 250-word synthesis of insights gained.'
              }
            },
            explain: {
              time: '15 mins',
              synthesisQuestions: [
                'How has your understanding of this topic evolved from Session 1 to Session 4?',
                'What lifelong skills will you take forward into your future career and community roles?'
              ]
            }
          },
          learningResources: ['Final assessment sheets', 'Standardized grading rubric', 'Teacher reflection log'],
          opportunitiesForIntegration: [
            { area: 'Lifelong Learning', connection: 'Nurturing metacognitive awareness and personal accountability.' }
          ]
        }
      ],
      assessment: [1, 2, 3, 4].map(sNum => ({
        sessionNumber: sNum,
        sessionDate: sessionDateStrings[sNum - 1] || `Session ${sNum}`,
        formativeTask: `Session ${sNum} Formative Check: Active completion of LAS ${sNum} tasks and rubric-scored output.`,
        guidanceAndSupport: 'Provide step-by-step scaffolds, sentence starters, or worked-out examples for developing learners.',
        accommodations: 'Extend time limits by 10 minutes and offer bilingual Filipino/English prompts where beneficial.'
      })),
      waysForward: {
        extendedLearningOpportunities: [
          'Encourage learners to interview local professionals or barangay officials regarding real-world application.',
          'Provide supplemental digital resources and advanced case studies via the class learning management folder.',
          'Facilitate peer mentoring circles pairing proficient students with peers needing remediation.'
        ],
        reflections:
          'Teacher notes on instructional timing, learner engagement levels, common misconceptions identified, and adjustments planned for the succeeding week.'
      }
    },
    activitySheets: activitySheets,
    presentationSlides: presentationSlides
  };
}

function createActivitySheetForSubject(
  entry: ILAWBOWEntry,
  title: string,
  sessionNum: number,
  sessionDate: string
): ILAWLearningActivitySheet {
  const isFilipino = entry.subjectCategory === 'Filipino';
  const subCategory: string = (entry.subjectCategory || 'Filipino') as string;
  const subName = entry.subject.toLowerCase();

  // Part B.9 Subject-Contextualized Activity Formats
  let formatType = 'Structured Scenario & Case Matrix';
  let scenarioPrompt = isFilipino
    ? `Suriin ang sitwasyong may kinalaman sa ${title}. Pag-usapan sa grupo ang mga sanhi, epekto, at mga mungkahing solusyon.`
    : `Analyze the provided case scenario regarding ${title}. Discuss within your cluster the root mechanisms, stakeholder impacts, and strategic solutions.`;
  let tableHeaders = isFilipino
    ? ['Aspeto ng Pagsusuri', 'Pangyayari / Sitwasyon', 'Pagpapaliwanag ng Grupo', 'Rekomendasyon']
    : ['Analysis Dimension', 'Observed Phenomenon', 'Group Interpretation', 'Actionable Recommendation'];
  let tableRows = [
    ['Foundational Factor', 'Observed in baseline scenario', 'Indicates systemic variable interaction', 'Standardize initial parameters'],
    ['Operational Mechanism', 'Applied during workflow execution', 'Reveals critical leverage points', 'Implement continuous monitoring'],
    ['Impact & Sustainability', 'Post-implementation assessment', 'Confirms positive alignment with goals', 'Document lessons learned']
  ];
  let partBOutputType = 'Critical Reflection & Written Problem Set';

  if (subCategory === 'Filipino' || subName.includes('komunikasyon') || subName.includes('filipino') || subName.includes('panitikan')) {
    formatType = 'Madulang Pagsasadula / Speech Choir / Pagtatalong Pampanitikan (Debate)';
    scenarioPrompt = `Gawain: Magsagawa ng pangkatang pagpapamalas (dula-dulaan, sabayang pagbigkas, o debate) batay sa sitwasyon ng ${title}. Pag-aralan ang tono, persona, at nilalaman ng mensahe bago itanghal.`;
    tableHeaders = ['Karakter / Tungkulin', 'Sitwasyong Pangkomunikasyon', 'Paraan ng Pagpapahayag (Tono/Salita)', 'Etikal na Pamantayan'];
    tableRows = [
      ['Tagapagsalita / Mananalumpati', 'Pormal na pagpupulong ng komunidad', 'Kagalang-galang at may paninindigan', 'Katapatan sa datos at ebidensya'],
      ['Tagapakinig / Tagasuri', 'Open forum at pagtatanong', 'Mapanuri at magalang', 'Bukas ang isip sa magkakaibang pananaw'],
      ['Moderator / Tagapamagitan', 'Pagkakaroon ng debate o tensyon', 'Walang pinapanigan at kalmado', 'Pantay na pagbibigay ng pagkakataon']
    ];
    partBOutputType = 'Indibidwal na Spoken-Word / Malikhaing Sanaysay (150–200 salita)';
  } else if (subCategory === 'Social Studies' || subCategory === 'AP' || subName.includes('araling panlipunan') || subName.includes('history') || subName.includes('kasaysayan')) {
    formatType = 'Timeline Reconstruction, Historical Tableau & Mock Tribunal';
    scenarioPrompt = `Cluster Task: Reconstruct the historical/social timeline of ${title}. Examine primary source evidence and enact a structured mock inquiry to evaluate policy impacts.`;
    tableHeaders = ['Historical Period / Event', 'Primary Evidence Source', 'Stakeholder Perspective', 'Institutional & Policy Impact'];
    tableRows = [
      ['Pre-Reform Context', 'Official archival records & decrees', 'Agricultural & grassroots workers', 'Structural resource imbalances'],
      ['Transition Phase', 'Legislative bills & treaties', 'Reform advocates & state officials', 'Establishment of new regulatory bodies'],
      ['Contemporary Era', 'Modern socio-economic indices', 'Regional Filipino communities', 'Sustainable democratic governance']
    ];
    partBOutputType = 'Primary-Source Analytical Essay & Citizen Reflection';
  } else if (subCategory === 'Science' || subName.includes('science') || subName.includes('agham') || subName.includes('chemistry') || subName.includes('biology')) {
    formatType = 'Hands-On Scientific Investigation, Lab Simulation & Data Gathering';
    scenarioPrompt = `Laboratory Investigation: Conduct structured empirical observations on ${title}. Record quantitative variables in the lab station matrix and verify hypothesis models.`;
    tableHeaders = ['Experimental Trial / Variable', 'Measured Observation', 'Theoretical Principle', 'Error Analysis & Control'];
    tableRows = [
      ['Baseline Control Trial', 'Controlled room temperature & pressure', 'Standard stoichiometric equilibrium', 'Calibrated sensor precision'],
      ['Experimental Treatment A', 'Altered concentration parameter (+25%)', 'Kinetic collision rate elevation', 'Triplicate trial averaging'],
      ['Experimental Treatment B', 'Altered catalyst environment', 'Reduced activation energy barrier', 'Isolated system boundary control']
    ];
    partBOutputType = 'Laboratory Experiment Report & Individual Data Analysis';
  } else if (subCategory === 'Mathematics' || subCategory === 'Math' || subName.includes('math') || subName.includes('calculus') || subName.includes('statistics')) {
    formatType = 'Guided Problem Sets, Computation Stations & Real-World Modeling';
    scenarioPrompt = `Mathematical Modeling Station: Solve multi-step applied equations for ${title}. Conduct peer error-analysis on student sample solutions before formulating optimized models.`;
    tableHeaders = ['Applied Scenario Station', 'Given Parameters & Formula', 'Computed Mathematical Solution', 'Real-World Interpretation'];
    tableRows = [
      ['Station 1: Linear Optimization', 'Revenue function R(x) & cost C(x)', 'Critical break-even threshold calculated', 'Optimal production quota for local SME'],
      ['Station 2: Exponential Growth', 'Population decay model P(t) = P0*e^(kt)', 'Half-life interval derived step-by-step', 'Resource depletion timeline forecast'],
      ['Station 3: Statistical Variance', 'Standard deviation & normal curve z-score', 'Confidence interval 95% verified', 'Quality assurance standard compliance']
    ];
    partBOutputType = 'Independent Step-by-Step Problem Solving & Error Analysis Journal';
  } else if (subCategory === 'TechPro' || subCategory === 'TVL' || subCategory === 'TLE' || subName.includes('tle') || subName.includes('epp') || subName.includes('techpro')) {
    formatType = 'Hands-On Skill Demonstration & Technical Product-Making';
    scenarioPrompt = `Workplace Practicum: Execute standardized workshop procedures for ${title}. Follow occupational safety directives (PPE), calibrate tools, and assemble output specification.`;
    tableHeaders = ['Technical Step / Standard', 'Tool / Equipment Utilized', 'Quality & Tolerance Check', 'Safety & Environmental Protocol'];
    tableRows = [
      ['Preparation & Layout', 'Precision vernier caliper & rule', 'Exact dimensional tolerance (±0.5mm)', 'Zero-debris workbench clearance'],
      ['Fabrication / Execution', 'Approved workshop machine / circuit kit', 'Proper operating speed & feed rate', 'Emergency shut-off mechanism verified'],
      ['Finishing & Quality Audit', 'Multimeter / Inspection gauge', 'DepEd standard specification met', 'Waste sorting & tool turnover completed']
    ];
    partBOutputType = 'Individual Technical Logbook & Job Order Costing Sheet';
  } else if (subCategory === 'MAPEH' || subName.includes('mapeh') || subName.includes('pe') || subName.includes('music') || subName.includes('arts')) {
    formatType = 'Movement / Performance Exhibition & Health Case Analysis';
    scenarioPrompt = `Performance Studio: Execute choreographed physical movement or creative arts composition representing ${title}. Conduct peer biomechanical or aesthetic audits.`;
    tableHeaders = ['Performance Element', 'Choreographic / Artistic Action', 'Biomechanical / Aesthetic Quality', 'Health & Safety Integration'];
    tableRows = [
      ['Rhythmic Dynamic Warm-up', 'Cardiovascular aerobic coordination', 'Target heart rate zone achieved', 'Hydration & joint alignment focus'],
      ['Core Skill Execution', 'Rhythmic routine / vocal cadence', 'Spatial awareness and synchronicity', 'Proper posture & injury prevention'],
      ['Cool-down & Critique', 'Low-intensity static stretching', 'Reflective artistic interpretation', 'Metabolic recovery & cool-down logged']
    ];
    partBOutputType = 'Individual Fitness / Artistic Journal & Health Reflection';
  } else if (subCategory === 'Values' || subCategory === 'ESP' || subName.includes('esp') || subName.includes('values')) {
    formatType = 'Values-Clarification Discussion Circle & Ethical Role-Play';
    scenarioPrompt = `Values Circle: Reflect on ethical dilemmas involving ${title}. Discuss moral agency, community solidarity, and character virtues in your peer cluster.`;
    tableHeaders = ['Moral Dilemma Scenario', 'Stakeholder Conflicting Values', 'Core Ethical Principle (DepEd)', 'Action Plan with Integrity'];
    tableRows = [
      ['Dilemma 1: Peer Pressure vs Honesty', 'Belongingness vs Academic Truth', 'Maka-Diyos / Katapatan', 'Stand firm with respectful dialogue'],
      ['Dilemma 2: Resource Sharing in Need', 'Personal ownership vs Empathy', 'Makatao / Bayanihan', 'Collaborative community food pantry'],
      ['Dilemma 3: Environmental Responsibility', 'Convenience vs Conservation', 'Makakalikasan', 'Zero single-use plastic habit in school']
    ];
    partBOutputType = 'Personal Moral Compass Journal & Commitment Pledge';
  }

  return {
    sessionNumber: sessionNum,
    sessionDate: sessionDate,
    activityTitle: isFilipino
      ? `Gawain sa Pagkatuto Blg. ${sessionNum}: ${title}`
      : `Learning Activity Sheet ${sessionNum}: ${title}`,
    objectives: [
      isFilipino
        ? `1. Naipapaliwanag ang mga pangunahing konsepto ng ${title}.`
        : `1. Explain the fundamental concepts and principles of ${title}.`,
      isFilipino
        ? `2. Naisasagawa ang pangkatang pagsusuri (${formatType}) at nakagagawa ng indibidwal na awtput (${partBOutputType}).`
        : `2. Execute collaborative inquiry (${formatType}) and independently complete the written mastery output (${partBOutputType}).`
    ],
    materials: [
      isFilipino ? 'Kuwaderno, bolpen, modyul ng aralin' : 'Learning module, activity worksheet, writing materials',
      'DepEd Order No. 3, s. 2026 Reference Materials',
      'DepEd Strengthened SHS 2026 Subject Curriculum Guide'
    ],
    instruction: isFilipino
      ? 'Basahin at unawaing mabuti ang bawat bahagi. Isagawa ang Pangkatang Gawain (Bahagi A) kasama ang inyong grupo, at tapusin ang Indibidwal na Awtput (Bahagi B) nang may katapatan at husay.'
      : 'Read all sections carefully. Collaborate with your assigned cluster on Part A, and independently complete the written requirements for Part B adhering to high academic standards.',
    partAGroup: {
      title: isFilipino ? `Bahagi A: Pangkatang Gawain — ${formatType}` : `Part A: Collaborative Group Task — ${formatType}`,
      formatType: formatType,
      scenarioOrPrompt: scenarioPrompt,
      tableData: {
        headers: tableHeaders,
        rows: tableRows
      },
      guidingQuestions: isFilipino
        ? [
            '1. Ano ang pangunahing suliranin o kaisipan na ipinapakita sa sitwasyon?',
            '2. Paano nakaaapekto ang mga elemento ng aralin sa resulta ng gawain?',
            '3. Anong pagpapahalaga (values) ang dapat pairalin sa ganitong kalagayan?'
          ]
        : [
            '1. What is the root cause or core mechanism illustrated in the case?',
            '2. How do the theoretical principles directly influence real-world outcomes in this context?',
            '3. What preventive measures or ethical considerations must be established by the practitioners?'
          ]
    },
    partBIndividual: {
      title: isFilipino ? `Bahagi B: Indibidwal na Awtput — ${partBOutputType}` : `Part B: Individual Output — ${partBOutputType}`,
      outputType: partBOutputType,
      taskPrompt: isFilipino
        ? `Batay sa inyong natutuhan, sumulat ng isang komprehensibong paliwanag o solusyon (150–200 salita) kung paano mo ilalapat ang ${title} sa iyong sariling buhay at kinabukasan.`
        : `Based on your learning, compose an evidence-based synthesis (150–200 words) articulating how you will apply ${title} to professional, civic, or academic challenges.`,
      analysisChallenge: isFilipino
        ? [
            '1. Magbigay ng 2 tiyak na halimbawa kung paano nakatutulong ang araling ito sa iyong pang-araw-araw na gawain.',
            '2. Ipaliwanag ang pinakamahalagang aral na iyong natutuhan sa sesyong ito.',
            '3. Bakit mahalaga ang pagsunod sa pamantayang etikal sa larangang ito?'
          ]
        : [
            '1. Formulate two concrete scenarios where applying this competency prevents significant operational or communication failure.',
            '2. Articulate the single most critical insight you developed during this session.',
            '3. Explain how this knowledge aligns with ethical and professional standards in modern Philippine society.'
          ]
    },
    answerKey: {
      partAAnswers: isFilipino
        ? [
            '1. Sagot sa Sitwasyon: Ang pangunahing suliranin ay ang kakulangan ng pagsasaalang-alang sa persona at konteksto ng kausap, na nagdudulot ng miskomunikasyon.',
            '2. Sagot sa Elemento: Ang wika, tono, at espasyo ay nagdidikta kung paano tatanggapin ang mensahe. Kapag pormal ang lugar, kinakailangan ang pormal na rehistro.',
            '3. Sagot sa Pagpapahalaga: Paggalang, empatiya, at aktibong pakikinig ang mga pangunahing pagpapahalagang kailangang pairalin.'
          ]
        : [
            '1. Analysis Answer: The primary issue stems from misaligned contextual assumptions and failure to calibrate registers to the intended audience.',
            '2. Mechanism Answer: Theoretical principles dictate message fidelity; noise reduction and structured feedback loops ensure clarity.',
            '3. Ethical Answer: Respect for diverse perspectives, transparency, and professional accountability must guide discourse.'
          ],
      partBAnswers: isFilipino
        ? [
            '1. Pagsusuri: Tumpak na natukoy ng mag-aaral ang 2 tiyak na halimbawa na may malinaw na paliwanag ng konteksto.',
            '2. Repleksyon: Naipahayag nang buo ang pinakamahalagang aral na may kaugnayan sa sariling karanasan.',
            '3. Etika: Naipaliwanag ang kahalagahan ng etikal na pamantayan bilang pundasyon ng mapagkakatiwalaang ugnayan.'
          ]
        : [
            '1. Application Challenge: Accurate identification of two authentic real-world scenarios with clear cause-and-effect justification.',
            '2. Synthesis: Insight demonstrates higher-order metacognitive awareness linking theory to practice.',
            '3. Standards: Thorough articulation of ethical responsibility, accuracy, and social impact.'
          ]
    },
    rubric: {
      criteria: [
        {
          criterion: isFilipino ? 'Nilalaman at Kawastuhan' : 'Content & Conceptual Accuracy',
          exemplary4: isFilipino ? 'Komprehensibo, tumpak, at malalim ang pagkaunawa sa konsepto.' : 'Demonstrates complete, nuanced mastery with thorough evidence and precision.',
          proficient3: isFilipino ? 'Tumpak at malinaw ang karamihan sa mga ideya.' : 'Accurate and clear with sufficient explanatory depth.',
          developing2: isFilipino ? 'May mga ideyang tama ngunit may ilang kamalian o kakulangan.' : 'Partial understanding with noticeable gaps or inaccuracies.',
          beginning1: isFilipino ? 'Kulang sa kawastuhan at nangangailangan ng karagdagang gabay.' : 'Limited accuracy requiring substantial remediation.'
        },
        {
          criterion: isFilipino ? 'Organisasyon at Pagsulat' : 'Organization & Clarity of Output',
          exemplary4: isFilipino ? 'Lohikal, maayos ang transisyon, at walang mali sa gramatika.' : 'Logically sequenced with fluid transitions and professional polish.',
          proficient3: isFilipino ? 'Maayos ang daloy at madaling maunawaan.' : 'Clear structure with minor mechanical errors.',
          developing2: isFilipino ? 'May kalituhan sa daloy ng mga talata.' : 'Disorganized progression requiring reader effort.',
          beginning1: isFilipino ? 'Hindi malinaw ang pagkakabuo ng mga ideya.' : 'Lacks coherent structure.'
        },
        {
          criterion: isFilipino ? 'Pagtutulungan sa Grupo' : 'Collaborative Engagement (Part A)',
          exemplary4: isFilipino ? 'Lahat ng kasapi ay aktibo at nag-ambag sa tagumpay ng grupo.' : 'Exemplary teamwork, shared leadership, and mutual respect.',
          proficient3: isFilipino ? 'Karamihan ng kasapi ay nakibahagi nang maayos.' : 'Constructive participation by most cluster members.',
          developing2: isFilipino ? 'Iilan lamang ang gumawa at nag-ambag.' : 'Unequal participation with reliance on 1-2 members.',
          beginning1: isFilipino ? 'Hindi nagkaisa ang grupo sa pagsasagawa.' : 'Failure to collaborate effectively.'
        }
      ]
    },
    notesForUse: [
      isFilipino
        ? 'Para sa Guro: Gamitin ang nakalaang Susi sa Pagwawasto (Answer Key) para sa mabilis at pantay na pagtataya.'
        : 'For Teacher: Reference the Standalone Teacher Answer Key for standardized and efficient evaluation.',
      isFilipino
        ? 'Maaaring ipunin ang mga natapos na LAS sa Student Portfolio bilang patunay ng pag-unlad.'
        : 'Completed sheets should be archived into the student portfolio as evidence of trimester competency mastery.'
    ]
  };
}

function createSlidesForPlan(
  entry: ILAWBOWEntry,
  title: string,
  teacher: string,
  school: string,
  sessionDates: string[]
): ILAWSlide[] {
  return [
    {
      slideNumber: 1,
      sessionNumber: 1,
      type: 'title',
      title: title,
      subtitle: `${entry.subject} • ${entry.grade} • ${entry.term}`,
      badge: 'ILAW MASTER CLASSROOM SLIDES',
      bodyBullets: [
        `School: ${school}`,
        `Teacher-Developer: ${teacher}`,
        `Curriculum Standard: DepEd Order No. 3, s. 2026`,
        `Instructional Window: ${sessionDates[0] || 'Term Launch'}`
      ],
      speakerNotes: 'Welcome the class. Introduce the week-long learning intentions and explain the assessment criteria.'
    },
    {
      slideNumber: 2,
      sessionNumber: 1,
      type: 'objective',
      title: 'Our Learning Targets for Today',
      subtitle: 'Session 1 Competencies & Targets',
      badge: 'INTENTIONS',
      bodyBullets: [
        `Understand core principles of ${title}`,
        'Analyze authentic local real-world scenarios',
        'Collaborate productively in small teams',
        'Complete Session 1 Learning Activity Sheet (LAS 1)'
      ],
      speakerNotes: 'Have students read the targets chorally or call on one student to read them aloud.'
    },
    {
      slideNumber: 3,
      sessionNumber: 1,
      type: 'engage',
      title: 'Engage & Provocation',
      subtitle: 'What do you observe in this scenario?',
      badge: 'PRE-LESSON: ENGAGE',
      bodyBullets: [
        'Examine the visual case presented on screen',
        'Notice what works and what breaks down',
        'Consider: Why does context matter?',
        'Turn to your seatmate and share one initial thought'
      ],
      speakerNotes: 'Facilitate a 2-minute think-pair-share to stimulate curiosity.'
    },
    {
      slideNumber: 4,
      sessionNumber: 1,
      type: 'explore',
      title: 'Cluster Investigation: Part A',
      subtitle: 'Collaborative Matrix Deconstruction',
      badge: 'FLOW: EXPLORE',
      bodyBullets: [
        'Move into your assigned groups of 4 to 5',
        'Open LAS 1: Part A (Group Investigation)',
        'Assign roles: Leader, Scribe, Timekeeper, Presenter',
        'Time allotment: 20 minutes of focused teamwork'
      ],
      speakerNotes: 'Circulate around the classroom, addressing questions and ensuring all learners are actively engaged.'
    },
    {
      slideNumber: 5,
      sessionNumber: 1,
      type: 'explain',
      title: 'Key Insights & Synthesis',
      subtitle: 'Making Meaning from Evidence',
      badge: 'FLOW: EXPLAIN',
      bodyBullets: [
        `Core Idea 1: ${entry.competency}`,
        'Core Idea 2: Persona, timing, and place shape outcome',
        'Core Idea 3: Systematic analysis avoids costly errors',
        'Q&A: Ask questions before moving to individual tasks'
      ],
      speakerNotes: 'Highlight common patterns discovered across different student groups.'
    },
    {
      slideNumber: 6,
      sessionNumber: 1,
      type: 'synthesis',
      title: 'Individual Mastery & Wrap-Up',
      subtitle: 'Completing Part B in Your Sheet',
      badge: 'ASSESSMENT',
      bodyBullets: [
        'Work independently on Part B of LAS 1',
        'Apply the standard rubric (Content, Clarity, Ethics)',
        'Submit completed sheets to the class coordinator',
        'Homework preview: Reflect on tomorrow’s inquiry'
      ],
      speakerNotes: 'Signal 5 minutes remaining. Collect papers and commend strong collaborative behavior.'
    }
  ];
}
