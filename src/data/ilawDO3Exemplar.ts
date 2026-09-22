import { ILAWCompletePlan } from '../types/ilawDO3';

export const OFFICIAL_DO3_ILAW_EXEMPLAR: ILAWCompletePlan = {
  id: 'ilaw-lcs-g11-w1',
  header: {
    lesson: 'Understanding and Strengthening the Self',
    learningArea: 'Life and Career Skill',
    teacher: 'STEAVEN KINTH D. BOISER',
    contentEvaluator: 'Content Evaluator: ____________________',
    languageEvaluator: 'Language Evaluator: ____________________',
    formatEvaluator: 'Format and Layout Evaluator: ____________________',
    school: 'LNNCHS',
    division: 'Division of Lanao del Norte',
    region: 'Region X – Northern Mindanao',
    gradeLevelAndSection: 'Grade 11 - Einstein',
    gradeBand: '11-12',
    term: 1,
    bowWeek: 'Week 1',
    inclusiveTeachingDates: 'June 16–19, 2026',
    numberOfSessions: 4,
    references: [
      "Erik Erikson's Stages of Psychosocial Development Saul McLeod, PhD, April 2025",
      "Brown, D. and Brooks, L (Eds), 'Career Choice and Development: Applying Contemporary Theories to Practice', San Francisco: Jossey-Bass, 2002.",
      "Department of Employment Services, 'Developmental Theories', accessed December 2008, (http://does.dc.gov).",
      'https://psychologyeducational.com/health-issues-in-adolescence-age/blogs/',
      'CDC Youth Violence Prevention (2024): Risk and Protective Factors: https://www.cdc.gov/youth-violence/risk-factors/index.html',
      'Centers for Disease Control and Prevention (CDC). 2020. "Moving Forward." Video. YouTube. https://www.youtube.com/watch?v=FJDwe2RkOq0.',
      'R Shepler and Center for Innovative Practices and ODMH. "Risk and Protective Factors Checklist v.3." Center for Innovative Practices and ODMH, 2006.',
      'http://resiliencyohio.org/assets/risk_and_protective_factors_checklist_totals.pdf'
    ],
    declarationOfAIUse:
      'This lesson plan was formulated with the assistance of artificial intelligence tools in drafting, structuring, and organizing competencies, learning tasks, guide questions, and assessment blueprints in compliance with DepEd Order No. 3, s. 2026 Annex A. The teacher-developer thoroughly reviewed, adapted, contextualized, and takes full professional accountability for its pedagogical integrity and alignment with learner needs and curriculum standards.'
  },
  matrix: {
    intentions:
      'The lessons aim to help learners understand the interconnectedness of developmental stages, responsibilities, protective and risk factors, health, relationships, identity, and emotional wellness in shaping their sense of self during adolescence and early adulthood. Through meaningful, reflective, and contextualized learning experiences, learners are encouraged to develop self-awareness, healthy habits, emotional regulation, responsible decision-making, resilience, and positive social relationships that can guide them toward lifelong personal growth and well-being.',
    competency: {
      melc: "Examine one's sense of self through understanding key developmental stages, tasks, and protective and risk factors of late adolescence and early adulthood.",
      content: 'Developmental Stages, Tasks, and Challenges in Middle and Late Adolescence',
      contentStandard:
        'The learner demonstrates understanding of the various developmental stages of adolescence, focusing on late adolescence to early adulthood, and its associated tasks, challenges, and protective factors.',
      performanceStandard:
        'The learner creates an authentic Personal Development Roadmap and Resilience Plan illustrating positive strategies for navigating developmental transitions and strengthening sense of self.'
    },
    objectives: [
      {
        sessionNumber: 1,
        sessionDate: 'June 16, 2026',
        objectives: [
          'Define "sense of self" and "personal identity" in the context of late adolescence.',
          'Create a personal identity map showing individual characteristics, strengths, interests, values, and goals.',
          'Express genuine appreciation of personal uniqueness and cultural heritage.'
        ]
      },
      {
        sessionNumber: 2,
        sessionDate: 'June 17, 2026',
        objectives: [
          'Describe the physiological, cognitive, and psychosocial characteristics of late adolescence transitioning into early adulthood.',
          'Construct a personal developmental timeline showing significant milestones, changes, and key turning points experienced.'
        ]
      },
      {
        sessionNumber: 3,
        sessionDate: 'June 18, 2026',
        objectives: [
          'Identify the developmental tasks (Havighurst framework) of late adolescence and early adulthood.',
          'Create a "Responsibility and Growth Chart" classifying developmental tasks currently being navigated in family, school, and community life.',
          'Demonstrate appreciation for the expanding social and civic responsibilities of growing up.'
        ]
      },
      {
        sessionNumber: 4,
        sessionDate: 'June 19, 2026',
        objectives: [
          'Differentiate protective factors from risk factors affecting adolescent wellness and decision-making.',
          'Create a comprehensive "Protective and Risk Factors Chart" analyzing positive buffers and vulnerabilities in their local environment.',
          'Formulate actionable personal coping mechanisms and support networks to mitigate identified risks.'
        ]
      }
    ],
    learnerContext:
      'Learners are senior high school students in a comprehensive school setting undergoing rapid physical, social, and academic role changes. While most display high enthusiasm for collaborative peer discussions and digital media, some demonstrate anxiety regarding post-secondary transitions, academic pressures, and identity formation. Instruction incorporates multi-tiered scaffolding, reflective prompts, and culturally safe peer sharing to support emotional well-being.',
    learningExperience: [
      {
        sessionNumber: 1,
        sessionDate: 'June 16, 2026',
        preLesson: {
          engage: {
            time: '10 mins',
            activity:
              'Activity: "Mirror, Mirror on the Wall" — Quick silent reflection where students write 3 words that best describe who they are when nobody is looking. Followed by a 2-minute video clip depicting youth self-discovery.'
          },
          elicit: {
            time: '10 mins',
            activity:
              'Guiding diagnostic questions on personal identity vs social expectations. Teacher prompts: "What makes your identity uniquely yours?"',
            expectedResponses:
              'Students are expected to mention their family values, talents, beliefs, hobbies, community upbringing, and personal ambitions.'
          }
        },
        flow: {
          explore: {
            time: '25 mins',
            groupActivity: {
              formatType: 'Collaborative Identity Mapping Station',
              title: 'Part A: Peer Perspective Identity Web',
              instructions:
                'In groups of 4 to 5, learners pool common adolescent qualities on butcher paper, clustering traits into: Strengths, Passions, Cultural Roots, and Future Aspirations [see attached worksheet LAS-S1].'
            },
            individualOutput: {
              outputType: 'Structured Reflective Personal Identity Map',
              title: 'Part B: My Inner Anchor Map',
              instructions:
                'Each learner independently completes their individual Personal Identity Map documenting core values, personal motto, and self-worth affirmations.'
            }
          },
          explain: {
            time: '15 mins',
            synthesisQuestions: [
              'How does understanding your personal identity influence your daily decisions?',
              'Why is self-acceptance critical before building meaningful relationships with peers and mentors?',
              'How do external societal pressures challenge your authentic self?'
            ]
          }
        },
        learningResources: [
          'Slide Deck: Understanding the Self (DO 015 s. 2026 Master Series)',
          'Activity Sheet LAS-S1: Personal Identity Map and Peer Reflection Web',
          'Video Clip: Centers for Disease Control and Prevention "Moving Forward" (2020)',
          'Erikson Psychosocial Framework Summary Handout'
        ],
        opportunitiesForIntegration: [
          { area: 'Values Education', connection: 'Cultivating honesty, self-respect, and moral integrity.' },
          { area: 'English / Oral Communication', connection: 'Expressing introspective thoughts coherently in peer dialogue.' }
        ]
      },
      {
        sessionNumber: 2,
        sessionDate: 'June 17, 2026',
        preLesson: {
          engage: {
            time: '10 mins',
            activity:
              'Photo Montage Flash: "Then & Now" — Projecting childhood photos versus teenage milestones to stimulate discussion on developmental transformations.'
          },
          elicit: {
            time: '10 mins',
            activity:
              'Diagnostic recall drill: "What changed the most between Grade 7 and Grade 11?"',
            expectedResponses:
              'Students identify physical growth spurts, emotional maturity, deeper critical thinking, increased independence, and career anxieties.'
          }
        },
        flow: {
          explore: {
            time: '25 mins',
            groupActivity: {
              formatType: 'Developmental Milestones Timeline Station',
              title: 'Part A: Cross-Generational Adolescent Comparison Chart',
              instructions:
                'Small groups construct a comparative developmental matrix examining adolescent challenges across physical, mental, and social domains [see attached worksheet LAS-S2].'
            },
            individualOutput: {
              outputType: 'Personal Developmental Lifeline',
              title: 'Part B: Milestone Reflection Log',
              instructions:
                'Each learner independently sketches their own personal developmental timeline from age 12 to 17, identifying 3 key turning points and lessons learned.'
            }
          },
          explain: {
            time: '15 mins',
            synthesisQuestions: [
              'How do Erik Erikson\'s Identity vs Role Confusion concepts manifest in your everyday decisions?',
              'What coping strategies have you used to handle physical and hormonal transitions?',
              'In what ways has your thinking become more analytical and future-oriented?'
            ]
          }
        },
        learningResources: [
          'Slide Deck: Characteristics of Late Adolescence and Early Adulthood',
          'Activity Sheet LAS-S2: Developmental Milestones and Personal Timeline',
          'Erikson Stages of Psychosocial Development Infographic',
          'Timeline graphing template'
        ],
        opportunitiesForIntegration: [
          { area: 'Health Science', connection: 'Understanding adolescent brain neuroplasticity and endocrine systems.' },
          { area: 'Social Studies', connection: 'Examining cultural rites of passage in Philippine communities.' }
        ]
      },
      {
        sessionNumber: 3,
        sessionDate: 'June 18, 2026',
        preLesson: {
          engage: {
            time: '10 mins',
            activity:
              'Role-Play Snippet: "Adulting 101" — Two students enact a short scenario of balancing school tasks, family chores, budgeting allowance, and part-time work.'
          },
          elicit: {
            time: '10 mins',
            activity:
              'Guide question: "What does taking responsibility for your own life look like in Senior High School?"',
            expectedResponses:
              'Learners cite time management, accountable decision-making, self-advocacy, financial prudence, and helping support the household.'
          }
        },
        flow: {
          explore: {
            time: '25 mins',
            groupActivity: {
              formatType: 'Havighurst Developmental Tasks Categorization Board',
              title: 'Part A: Youth Responsibility Matrix',
              instructions:
                'Teams organize 12 real-life youth tasks into categories: Emotional Independence, Career Preparation, Civic Responsibility, and Ethical Standards [see attached worksheet LAS-S3].'
            },
            individualOutput: {
              outputType: 'Personal Responsibility and Growth Chart',
              title: 'Part B: My Growth and Accountability Commitment',
              instructions:
                'Each student evaluates their current readiness in 5 key developmental tasks, rating themselves from 1 to 4 with supporting evidence.'
            }
          },
          explain: {
            time: '15 mins',
            synthesisQuestions: [
              'Which developmental task feels most demanding for you right now, and why?',
              'How does acquiring emotional independence benefit your relationship with parents and guardians?',
              'What support systems exist in school to assist with career preparation?'
            ]
          }
        },
        learningResources: [
          'Slide Deck: Robert Havighurst\'s Developmental Tasks for Adolescents',
          'Activity Sheet LAS-S3: Responsibility and Growth Self-Audit Chart',
          'Youth Accountability Rubric and Self-Reflection Prompts',
          'Brown & Brooks Career Choice excerpt'
        ],
        opportunitiesForIntegration: [
          { area: 'TLE / TechPro', connection: 'Applying workplace ethics, accountability, and time management.' },
          { area: 'Values Education', connection: 'Filipino values of filial responsibility (utang na loob) and civic duty.' }
        ]
      },
      {
        sessionNumber: 4,
        sessionDate: 'June 19, 2026',
        preLesson: {
          engage: {
            time: '10 mins',
            activity:
              'Case Scenario Flash: "The Crossroads" — Presenting two case studies of youth facing social pressure vs having strong mentors and sports hobbies.'
          },
          elicit: {
            time: '10 mins',
            activity:
              'Prompt: "What protects you from harmful habits, and what situations put young people at risk?"',
            expectedResponses:
              'Protective factors: Supportive family, faithful friends, teacher mentors, hobbies, religious faith. Risk factors: Peer pressure, cyberbullying, substance exposure, neglect.'
          }
        },
        flow: {
          explore: {
            time: '25 mins',
            groupActivity: {
              formatType: 'Risk vs Protective Factors Mapping Carousel',
              title: 'Part A: Community Risk and Buffer Analysis Carousel',
              instructions:
                'Groups rotate between 4 chart stations (Individual, Peer, Family, Community) to map specific risk triggers and protective shields [see attached worksheet LAS-S4].'
            },
            individualOutput: {
              outputType: 'Personal Protective Shield and Resilience Plan',
              title: 'Part B: My Actionable Resilience Blueprint',
              instructions:
                'Each learner drafts an individual resilience protocol outlining 3 immediate protective actions to take when encountering crisis or negative peer pressure.'
            }
          },
          explain: {
            time: '15 mins',
            synthesisQuestions: [
              'How does building internal protective factors reduce vulnerability to external peer pressures?',
              'Where can an adolescent seek confidential mental health or crisis guidance in our school and division?',
              'What concrete steps will you take this school year to strengthen your personal support network?'
            ]
          }
        },
        learningResources: [
          'Slide Deck: Protective and Risk Factors in Youth Development',
          'Activity Sheet LAS-S4: Risk and Protective Factors Blueprint and Shield',
          'CDC Youth Violence Prevention Risk & Protective Factors Reference Guide',
          'Ohio Resiliency Youth Factors Checklist'
        ],
        opportunitiesForIntegration: [
          { area: 'Health Science', connection: 'Mental health, stress coping mechanisms, and substance abuse prevention.' },
          { area: 'ICT', connection: 'Cyber-safety and mitigating digital risks on social media.' }
        ]
      }
    ],
    assessment: [
      {
        sessionNumber: 1,
        sessionDate: 'June 16, 2026',
        formativeTask:
          'Formative Assessment 1: Individual submission of Personal Identity Map and a 3-sentence exit statement on self-worth.',
        guidanceAndSupport:
          'Teacher conducts roving conferences to support hesitant learners; provides sentence frames and word banks for trait descriptors.',
        accommodations:
          'Visual learners may use drawings/symbols; bilingual Tagalog/Bisaya explanations accepted during formative roving check.'
      },
      {
        sessionNumber: 2,
        sessionDate: 'June 17, 2026',
        formativeTask:
          'Formative Assessment 2: Peer-evaluated Developmental Milestone Timeline with 2 self-critique notes on turning points.',
        guidanceAndSupport:
          'Clear chronological rubric provided; teacher models exemplar timeline on the board before independent work.',
        accommodations:
          'Pre-printed milestone prompts for struggling writers; option to record audio reflections for neurodiverse learners.'
      },
      {
        sessionNumber: 3,
        sessionDate: 'June 18, 2026',
        formativeTask:
          'Formative Assessment 3: 4-tier rubric evaluation of Responsibility and Growth Chart plus 5-item check on Havighurst tasks.',
        guidanceAndSupport:
          'Peer buddy verification of task categorization; teacher provides immediate corrective feedback during station work.',
        accommodations:
          'Tiered worksheets with graduated difficulty; simplified task descriptions for students needing literacy support.'
      },
      {
        sessionNumber: 4,
        sessionDate: 'June 19, 2026',
        formativeTask:
          'Formative Assessment 4: Culminating Personal Resilience Blueprint evaluation using a 16-point analytic rubric.',
        guidanceAndSupport:
          'Teacher shares exemplar blueprints; guidance counselor office contact details provided as an active resource.',
        accommodations:
          'Flexible submission format: graphic poster, structured matrix, or written essay.'
      }
    ],
    waysForward: {
      extendedLearningOpportunities: [
        'Family Interview Task: Conduct a 10-minute dialogue with a parent or guardian about how adolescent responsibilities differed in their generation.',
        'Digital Portfolio Entry: Upload your completed Personal Identity Map and Resilience Shield to your e-portfolio.',
        'Peer Mentorship: Form a voluntary study-buddy circle to support time management and academic accountability during Term 1.',
        'Community Extension: Identify one barangay youth initiative (SK / church youth / environmental group) that aligns with your personal values.'
      ],
      reflections:
        'To be completed by the teacher after the 4-session execution: Assess student engagement levels, effectiveness of collaborative stations, areas needing instructional remediation, and specific innovations observed for sharing with the SHS Academic Department.'
    }
  },
  activitySheets: [
    {
      sessionNumber: 1,
      sessionDate: 'June 16, 2026',
      activityTitle: 'LAS-S1: Mapping the Inner Compass — Personal Identity and Sense of Self',
      objectives: [
        'a. Define personal identity and sense of self in your own words.',
        'b. Construct a Personal Identity Map incorporating traits, values, passions, and life goals.',
        'c. Write an affirmation statement honoring your individual uniqueness and strengths.'
      ],
      materials: [
        'Activity Worksheet LAS-S1',
        'Writing pen, coloring materials, ruler',
        'Johari Window trait reference cards'
      ],
      instruction:
        'Read all instructions carefully. Work with your assigned group of 4 for Part A to share perspectives, then independently complete Part B. Submit your worksheet to the teacher at the end of the session.',
      partAGroup: {
        title: 'Part A — Collaborative Identity Discovery Matrix',
        formatType: 'Group Round-Robin Identity Matrix',
        scenarioOrPrompt:
          'With your group members, discuss the diverse dimensions that shape adolescent identity. Record at least 3 agreed examples for each category in the matrix below.',
        tableData: {
          headers: ['Identity Dimension', 'Key Elements & Influences', 'Typical Adolescent Challenge'],
          rows: [
            ['Biological / Physical', 'Genetics, physical growth, health habits', 'Body image concerns, peer comparison'],
            ['Psychological / Emotional', 'Personality traits, emotional triggers, temperament', 'Mood swings, self-doubt, stress'],
            ['Social / Cultural', 'Family expectations, peer circle, regional heritage', 'Conforming to peers vs staying authentic'],
            ['Aspirational / Goals', 'Career dreams, vocational skills, academic track', 'Uncertainty about college or career path']
          ]
        },
        guidingQuestions: [
          '1. How do your peers help you discover strengths that you were unaware you possessed? __________________________________________________________________________________________',
          '2. In what situations is it most challenging to stay true to your personal values? __________________________________________________________________________________________'
        ],
        drawingPrompt:
          'Draw your personal "Identity Shield" or emblem in the box below, featuring symbols for your core value, top talent, and life vision.'
      },
      partBIndividual: {
        title: 'Part B — Individual Written Output: My Personal Identity Anchor',
        outputType: 'Structured Reflective Identity Anchor and Synthesis',
        taskPrompt:
          'Write a structured response answering: "Who am I today, and who am I striving to become?" Include your top 3 core values, 2 unique talents, and 1 non-negotiable moral standard.',
        analysisChallenge: [
          '1. Analysis: What is the difference between a self-concept based on external social media validation versus an internally grounded sense of self? __________________________________________________________________________________________',
          '2. Synthesis & Real-World Application: Describe a concrete scenario in school or community where a strong sense of self will protect you from making a regrettable choice. __________________________________________________________________________________________'
        ]
      },
      answerKey: {
        partAAnswers: [
          'Question 1: Peers act as mirrors through honest feedback, encouragement, and shared collaborative tasks, illuminating hidden talents (Johari Window Open Area).',
          'Question 2: Staying true to values is most challenging when facing direct peer pressure, desire for social acceptance, or fear of ostracization.'
        ],
        partBAnswers: [
          'Analysis Question 1: Social-media-based self-concept is volatile, fragile, and reliant on likes/comments; an internally grounded sense of self is resilient, anchored in core values, self-worth, and authentic self-knowledge.',
          'Synthesis Question 2: Acceptable answers must describe a realistic adolescent challenge (e.g., refusing alcohol/vaping at a party, avoiding cheating, standing up against bullying) and explain how self-worth guided the choice.'
        ]
      },
      rubric: {
        criteria: [
          {
            criterion: 'Depth of Self-Insight & Identity Detail',
            exemplary4: 'Presents profound, articulate self-awareness with nuanced values, strengths, and realistic aspirations.',
            proficient3: 'Clearly identifies personal values, strengths, and goals with substantial detail.',
            developing2: 'Lists basic traits with superficial explanation; minimal self-reflection.',
            beginning1: 'Incomplete traits listed with no supporting reflection or personal insight.'
          },
          {
            criterion: 'Collaboration & Group Matrix Contribution',
            exemplary4: 'Actively facilitated group discovery; offered insightful contributions to all matrix categories.',
            proficient3: 'Participated constructively in group discussion and completed all matrix sections.',
            developing2: 'Passive participation; contributed only when prompted by peers.',
            beginning1: 'Did not engage in collaborative discussion or left group sections blank.'
          },
          {
            criterion: 'Analysis & Real-World Application',
            exemplary4: 'Analysis is incisive and compelling; real-world application is practical, ethical, and inspiring.',
            proficient3: 'Analysis is clear and logical; application describes a plausible real-world scenario.',
            developing2: 'Analysis is vague or repetitive; application is unrealistic or overly generic.',
            beginning1: 'Analysis and application are missing, irrelevant, or inaccurate.'
          },
          {
            criterion: 'Clarity, Organization & Presentation',
            exemplary4: 'Exceptional linguistic clarity, organized structure, and clean presentation with expressive visual emblem.',
            proficient3: 'Well-organized responses, clear expression, and completed visual emblem.',
            developing2: 'Disorganized structure, frequent grammatical lapses, or rushed visual emblem.',
            beginning1: 'Unorganized, difficult to read, incomplete sections.'
          }
        ]
      },
      notesForUse: [
        'Ensure a safe, non-judgmental classroom environment before students share sensitive personal reflections.',
        'Use roving feedback during Part A to prompt students who struggle to articulate their personal qualities.',
        'Check that the answer key criteria are strictly applied for formative mastery tracking (target: 80%+ mastery).',
        'Store student identity maps securely in their individual developmental portfolios.'
      ]
    },
    {
      sessionNumber: 2,
      sessionDate: 'June 17, 2026',
      activityTitle: 'LAS-S2: The Journey of Becoming — Developmental Milestones and Transitions',
      objectives: [
        'a. Describe key physical, cognitive, and social changes marking late adolescence.',
        'b. Plot a Personal Developmental Lifeline highlighting important milestones and turning points.',
        'c. Analyze how past challenges contributed to current maturity and decision-making.'
      ],
      materials: [
        'Activity Worksheet LAS-S2',
        'Ruler, timeline colored pens',
        'Developmental stages reference chart'
      ],
      instruction:
        'Complete the collaborative milestone audit in pairs for Part A. Then construct your individual developmental lifeline and synthesis analysis in Part B.',
      partAGroup: {
        title: 'Part A — Pair Milestone Audit: Mapping Transformations',
        formatType: 'Dyadic Comparative Lifeline Audit',
        scenarioOrPrompt:
          'With your seatmate, compare the typical developmental shifts between early adolescence (ages 12-14) and late adolescence (ages 16-18).',
        tableData: {
          headers: ['Domain of Growth', 'Early Adolescence (Ages 12–14)', 'Late Adolescence / Early Adulthood (Ages 16–18)'],
          rows: [
            ['Physical & Hormonal', 'Rapid growth spurts, puberty changes', 'Physical maturation stabilizes, motor coordination peaks'],
            ['Cognitive & Reasoning', 'Concrete logic, present-focused thinking', 'Abstract thinking, future planning, risk evaluation'],
            ['Social & Peer Relations', 'High conformity to peer groups', 'Selective intimate friendships, autonomous identity'],
            ['Emotional Self-Regulation', 'Intense mood volatility, impulsive reactions', 'Increased emotional awareness, reflective coping']
          ]
        },
        guidingQuestions: [
          '1. How has your way of resolving conflicts with family members evolved as you entered late adolescence? __________________________________________________________________________________________',
          '2. Why is abstract thinking essential when choosing your Senior High School strand and career pathway? __________________________________________________________________________________________'
        ],
        drawingPrompt:
          'Draw a symbolic timeline curve on the grid below representing your emotional growth from Grade 7 to Grade 11, marking high points (achievements) and low points (hurdles).'
      },
      partBIndividual: {
        title: 'Part B — Individual Written Output: Lifeline Turning Point Analysis',
        outputType: 'Written Critical Reflection Log',
        taskPrompt:
          'Identify 2 critical turning points in your life journey. For each, describe: (1) The event or circumstance, (2) How you responded, and (3) The positive maturity or lesson that emerged.',
        analysisChallenge: [
          '1. Critical Analysis: How does Erik Erikson\'s concept of "Psychosocial Moratorium" (a period of exploration before committing to an identity) apply to Grade 11 students? __________________________________________________________________________________________',
          '2. Synthesis: Formulate a 3-point personal guideline for staying resilient when facing unforeseen disruptions in your life plans. __________________________________________________________________________________________'
        ]
      },
      answerKey: {
        partAAnswers: [
          'Question 1: Responses should reflect shifts from emotional argumentation or withdrawal toward constructive dialogue, empathy, and rational negotiation.',
          'Question 2: Abstract thinking enables learners to anticipate future outcomes, weigh costs and benefits, evaluate consequences, and align career choices with long-term goals.'
        ],
        partBAnswers: [
          'Analysis Question 1: Grade 11 provides a safe academic and social testing ground where students experiment with different roles, strands, and passions before making binding adult career commitments.',
          'Synthesis Question 2: Expected guidelines should feature: (1) emotional composure/acceptance, (2) proactive problem-solving, and (3) reaching out to mentors or support systems.'
        ]
      },
      rubric: {
        criteria: [
          {
            criterion: 'Accuracy of Developmental Knowledge',
            exemplary4: 'Demonstrates comprehensive understanding of physical, cognitive, and social milestones with precise terminology.',
            proficient3: 'Accurately describes developmental shifts across all required growth domains.',
            developing2: 'Describes some developmental shifts but confuses stages or uses vague generalizations.',
            beginning1: 'Inaccurate or superficial descriptions of developmental stages.'
          },
          {
            criterion: 'Depth of Lifeline Reflection',
            exemplary4: 'Turning point reflections demonstrate exceptional emotional maturity, honesty, and transformative learning.',
            proficient3: 'Reflections clearly articulate turning points, student responses, and resulting maturity.',
            developing2: 'Identifies events without deep reflection on lessons learned or character growth.',
            beginning1: 'Incomplete or trivial events listed without meaningful reflection.'
          },
          {
            criterion: 'Application of Theoretical Concepts',
            exemplary4: 'Skillfully connects personal life experiences to Erikson and developmental stage theories.',
            proficient3: 'Appropriately links personal experiences to core developmental concepts.',
            developing2: 'Superficial attempt to connect experiences with theory.',
            beginning1: 'No connection made between experiences and curriculum theory.'
          },
          {
            criterion: 'Completeness and Presentation',
            exemplary4: 'Lifeline graph and written responses are immaculate, comprehensive, and thoroughly documented.',
            proficient3: 'All sections completed clearly with neat handwriting and proper structure.',
            developing2: 'One section missing or hastily completed.',
            beginning1: 'Major portions left blank or illegible.'
          }
        ]
      },
      notesForUse: [
        'Remind students that they only need to share experiences they feel comfortable writing down.',
        'Use the lifeline visual to help visual learners connect emotional states with chronological time.',
        'Offer differentiated guidance for students who experienced significant childhood hardships.',
        'Record mastery marks to feed into the 4-session assessment tracking matrix.'
      ]
    },
    {
      sessionNumber: 3,
      sessionDate: 'June 18, 2026',
      activityTitle: 'LAS-S3: Stepping Into Responsibility — Navigating Developmental Tasks',
      objectives: [
        'a. Categorize Robert Havighurst\'s developmental tasks of late adolescence.',
        'b. Construct a Responsibility and Growth Chart assessing your current readiness and competencies.',
        'c. Commit to 2 specific civic or household responsibilities that support your transition to adulthood.'
      ],
      materials: [
        'Activity Worksheet LAS-S3',
        'Pen, highlighter',
        'Havighurst Developmental Tasks reference handout'
      ],
      instruction:
        'Work in triads for Part A to analyze and categorize developmental tasks. Complete the self-audit Responsibility and Growth Chart and personal commitments independently in Part B.',
      partAGroup: {
        title: 'Part A — Triad Task Categorization Matrix',
        formatType: 'Triad Cooperative Sorting Activity',
        scenarioOrPrompt:
          'Review the 8 developmental tasks listed below. Categorize each into its primary domain and identify whether it is: [E] Emerging, [D] Developing, or [M] Mastered for typical 16-to-17-year-olds.',
        tableData: {
          headers: ['Developmental Task (Havighurst)', 'Target Domain', 'Significance for Adulthood'],
          rows: [
            ['Achieving mature relations with peers of both sexes', 'Social / Interpersonal', 'Foundation for professional collaboration and healthy partnerships'],
            ['Achieving a masculine or feminine social role', 'Cultural / Identity', 'Living authentically within social and ethical frameworks'],
            ['Accepting one\'s physique and using body effectively', 'Physical / Health', 'Lifelong wellness, positive body image, healthy physical habits'],
            ['Achieving emotional independence from parents/adults', 'Psychological', 'Ability to make autonomous choices while maintaining mutual respect'],
            ['Preparing for marriage and family life', 'Relational / Social', 'Understanding commitment, empathy, and relationship responsibility'],
            ['Preparing for an economic career', 'Vocational / Technical', 'Acquiring workplace competencies, financial independence'],
            ['Acquiring an ethical system and set of values', 'Moral / Spiritual', 'Consistent moral compass guiding ethical leadership and citizenship'],
            ['Desiring and achieving socially responsible behavior', 'Civic / Community', 'Active participation in community progress, obeying laws, civic duty']
          ]
        },
        guidingQuestions: [
          '1. Why is "Achieving emotional independence from parents" often misunderstood as rebellion? __________________________________________________________________________________________',
          '2. How does preparing for an economic career in SHS differ between the TechPro and Academic tracks? __________________________________________________________________________________________'
        ]
      },
      partBIndividual: {
        title: 'Part B — Individual Written Output: Responsibility and Growth Chart',
        outputType: 'Self-Audit Accountability Matrix & Commitment Contract',
        taskPrompt:
          'Rate your personal readiness in 4 key developmental tasks on a scale of 1 (Beginning) to 4 (Exemplary). Provide concrete evidence of actions you currently perform to fulfill each task.',
        analysisChallenge: [
          '1. Self-Evaluation Challenge: In which developmental task do you currently feel least confident, and what specific action can you take this month to improve? __________________________________________________________________________________________',
          '2. Civic Commitment: Draft a 2-sentence pledge describing how you will practice socially responsible behavior in your school or barangay this school year. __________________________________________________________________________________________'
        ]
      },
      answerKey: {
        partAAnswers: [
          'Question 1: Emotional independence is misunderstood as rebellion because it involves questioning childhood assumptions; true independence is constructive, respectful, and self-governing, not defiance.',
          'Question 2: TechPro tracks emphasize direct industry-standard technical skills and NC certifications; Academic tracks emphasize pre-tertiary disciplinary research and specialized theory, though both require workplace ethics.'
        ],
        partBAnswers: [
          'Challenge 1: Learner must pinpoint a specific task (e.g. financial budgeting, emotional regulation) with an actionable, verifiable 30-day intervention.',
          'Pledge 2: Must be a specific, observable action (e.g. segregating waste, tutoring younger siblings, leading a school club, following community traffic ordinances).'
        ]
      },
      rubric: {
        criteria: [
          {
            criterion: 'Understanding of Developmental Tasks',
            exemplary4: 'Accurately categorizes all tasks and articulates their profound relevance to adult societal functioning.',
            proficient3: 'Accurately categorizes tasks and explains their general significance.',
            developing2: 'Categorizes some tasks with confusion between emotional and civic domains.',
            beginning1: 'Inaccurate categorization and lacking conceptual understanding.'
          },
          {
            criterion: 'Honesty and Evidence in Self-Audit',
            exemplary4: 'Provides authentic, detailed, and verifiable evidence supporting all self-audit ratings.',
            proficient3: 'Provides realistic evidence for most ratings with clear self-awareness.',
            developing2: 'Provides superficial or generalized statements without concrete evidence.',
            beginning1: 'Arbitrary ratings with no supporting evidence provided.'
          },
          {
            criterion: 'Feasibility of Action Plan & Pledge',
            exemplary4: 'Action plan is SMART (Specific, Measurable, Achievable, Relevant, Time-bound); pledge is inspiring.',
            proficient3: 'Action plan is realistic and actionable; pledge is clear and appropriate.',
            developing2: 'Action plan is overly ambitious or vague; pledge lacks clear intent.',
            beginning1: 'No action plan or pledge provided.'
          },
          {
            criterion: 'Analytical Depth & Quality',
            exemplary4: 'Responses show sophisticated critical thinking regarding family dynamics and societal roles.',
            proficient3: 'Responses show thoughtful consideration of responsibilities.',
            developing2: 'Basic, brief answers with limited analytical effort.',
            beginning1: 'Responses are incomplete or demonstrate minimal effort.'
          }
        ]
      },
      notesForUse: [
        'Guide students to recognize that developmental tasks are ongoing processes rather than one-time exams.',
        'Encourage peer discussions that normalize the challenges of growing up.',
        'Use the self-audit data to identify learners who may benefit from study skills or stress management workshops.',
        'Ensure the civic pledges are displayed or kept accessible for mid-term review.'
      ]
    },
    {
      sessionNumber: 4,
      sessionDate: 'June 19, 2026',
      activityTitle: 'LAS-S4: Building the Shield — Protective Factors vs Risk Factors in Youth Resilience',
      objectives: [
        'a. Differentiate between environmental/individual protective factors and risk factors.',
        'b. Construct a Comprehensive Protective and Risk Factors Chart mapping your personal ecosystem.',
        'c. Design an actionable Personal Resilience Blueprint with identified emergency support systems.'
      ],
      materials: [
        'Activity Worksheet LAS-S4',
        'Multi-colored markers',
        'CDC Youth Risk & Protective Factors Reference Handout'
      ],
      instruction:
        'Complete the carousel case-study analysis in groups of 4 for Part A. Complete your individual Protective Shield and emergency resilience plan in Part B.',
      partAGroup: {
        title: 'Part A — Group Ecosystem Risk & Buffer Carousel',
        formatType: 'Collaborative Risk/Protective Mapping Grid',
        scenarioOrPrompt:
          'Examine the 4 social-ecological levels (Individual, Relationship, Community, Societal). Classify common adolescent experiences into Risk Factors (threats to well-being) vs Protective Factors (buffers).',
        tableData: {
          headers: ['Ecosystem Level', 'Risk Factors (Vulnerabilities)', 'Protective Factors (Resilience Buffers)'],
          rows: [
            ['Individual Level', 'Low self-esteem, impulsivity, substance experimentation', 'High emotional intelligence, strong sense of purpose, spiritual faith'],
            ['Relationship (Family/Peers)', 'Family conflict, peer delinquency, lack of adult monitoring', 'Warm parental communication, supportive prosocial peer circle'],
            ['Community / School', 'Bullying, lack of safe youth spaces, community violence', 'Accessible guidance counseling, active youth organizations, caring teachers'],
            ['Societal / Cultural', 'Poverty stigma, harmful media messages, discrimination', 'Equitable educational access, cultural pride, protective child laws']
          ]
        },
        guidingQuestions: [
          '1. Why is having even one trusted adult mentor considered one of the strongest protective buffers for an adolescent? __________________________________________________________________________________________',
          '2. How can peer groups actively transform from a risk factor into a powerful protective network? __________________________________________________________________________________________'
        ],
        drawingPrompt:
          'Sketch your "Personal Resilience Shield" below. Divide it into 4 quadrants: (1) Inner Strengths, (2) Family Anchor, (3) Safe Mentors/Friends, and (4) Inspiring Goals.'
      },
      partBIndividual: {
        title: 'Part B — Individual Written Output: My Actionable Resilience Blueprint',
        outputType: 'Crisis Coping Protocol and Support Network Directory',
        taskPrompt:
          'Construct your Personal Resilience Blueprint identifying 3 specific risk situations you may encounter (e.g. academic burnout, toxic peer pressure, family tension) and your exact 3-step coping action for each.',
        analysisChallenge: [
          '1. Critical Analysis: What internal mindset shift must occur before someone can ask for help when overwhelmed? __________________________________________________________________________________________',
          '2. Resource Directory: List 3 real, verified support contacts you can reach out to in our school, division, or community when under severe stress. __________________________________________________________________________________________'
        ]
      },
      answerKey: {
        partAAnswers: [
          'Question 1: A trusted adult provides unconditional emotional safety, objective guidance, validation during crises, and advocates for the youth when navigating systemic challenges.',
          'Question 2: Peers become protective when they establish collective positive norms, practice mutual academic accountability, celebrate healthy habits, and refuse to engage in risky behaviors.'
        ],
        partBAnswers: [
          'Analysis Question 1: Shifting from viewing vulnerability as weakness to recognizing that seeking help is a courageous act of self-advocacy and strength.',
          'Directory Question 2: Acceptable entries include: School Guidance Office / Counselor, Designated Teacher-Adviser, Barangay SK / Youth Health Center, National Youth Commission / Mental Health Hotline (1553).'
        ]
      },
      rubric: {
        criteria: [
          {
            criterion: 'Ecosystem Classification Accuracy',
            exemplary4: 'Accurately and comprehensively differentiates risk vs protective factors across all 4 ecological levels.',
            proficient3: 'Accurately differentiates risk and protective factors across ecological levels.',
            developing2: 'Differentiates factors but confuses community and societal levels.',
            beginning1: 'Misclassifies risk and protective factors or leaves levels blank.'
          },
          {
            criterion: 'Personal Resilience Blueprint Quality',
            exemplary4: 'Blueprint is deeply practical, nuanced, and provides realistic multi-step actions for each identified risk.',
            proficient3: 'Blueprint provides clear and practical coping steps for identified risks.',
            developing2: 'Coping steps are overly general (e.g. "just relax") without concrete procedures.',
            beginning1: 'Incomplete or unfeasible coping steps provided.'
          },
          {
            criterion: 'Resource Identification & Safety Awareness',
            exemplary4: 'Lists verified, realistic support contacts and demonstrates thorough understanding of safety protocols.',
            proficient3: 'Lists appropriate support contacts with clear understanding of help-seeking.',
            developing2: 'Lists only generic contacts without specific titles or locations.',
            beginning1: 'Does not identify realistic support resources.'
          },
          {
            criterion: 'Visual Resilience Shield & Commitment',
            exemplary4: 'Resilience Shield is richly symbolic, thoughtfully partitioned, and visually inspiring.',
            proficient3: 'Shield is properly partitioned and completed with clear symbolic representations.',
            developing2: 'Shield is incomplete or hastily drawn with minimal detail.',
            beginning1: 'Shield space is blank or defaced.'
          }
        ]
      },
      notesForUse: [
        'Emphasize that identifying risk factors is not a sign of failure, but the first essential step in building protective shields.',
        'Review the emergency resource directory with the entire class, verifying that all students know where the guidance office is located.',
        'If any student discloses critical safety concerns during this activity, follow established DepEd Child Protection protocols immediately.',
        'Celebrate the completion of the 4-session unit and invite students to carry their Resilience Shield in their school binders.'
      ]
    }
  ],
  presentationSlides: [
    {
      slideNumber: 1,
      sessionNumber: 1,
      title: 'UNDERSTANDING & STRENGTHENING THE SELF',
      subtitle: 'Life and Career Skills | Grade 11 | DepEd DO 015 & DO 3, s. 2026',
      type: 'title',
      bodyBullets: [
        'Instructional Leadership & Academic Workflow (ILAW)',
        'Teacher: STEAVEN KINTH D. BOISER • LNNCHS',
        'Session 1: Defining Identity & Uniqueness',
        'SY 2026–2027 Three-Term Calendar (Term 1, Week 1)'
      ],
      speakerNotes: 'Welcome the class. Introduce the foundational theme of self-concept and personal identity for Grade 11.',
      badge: 'ILAW MASTER DECK'
    },
    {
      slideNumber: 2,
      sessionNumber: 1,
      title: 'TODAY’S LEARNING OBJECTIVES',
      subtitle: 'What You Will Master by the End of Session 1',
      type: 'objective',
      bodyBullets: [
        '1. Define "Sense of Self" and "Personal Identity"',
        '2. Map your Strengths, Values, and Passions',
        '3. Celebrate your Cultural & Personal Uniqueness'
      ],
      speakerNotes: 'Read aloud the learning targets. Remind students that self-awareness is the root of all effective leadership.',
      badge: 'GOALS'
    },
    {
      slideNumber: 3,
      sessionNumber: 1,
      title: 'HOOK: MIRROR ON THE WALL',
      subtitle: 'Quiet Reflection Exercise (3 Minutes)',
      type: 'engage',
      bodyBullets: [
        'Write 3 words that describe WHO YOU ARE when no one is watching.',
        'Are your words based on what others say, or what you truly feel inside?',
        'Look beyond external appearances into character, values, and heart.'
      ],
      speakerNotes: 'Give students 2 minutes of silent writing time. Do not force them to read private answers aloud.',
      badge: 'ENGAGE'
    },
    {
      slideNumber: 4,
      sessionNumber: 1,
      title: 'EXPLORE: THE IDENTITY ANCHOR',
      subtitle: 'Activity Sheet LAS-S1 • Small Group Collaboration',
      type: 'explore',
      bodyBullets: [
        'Part A: Collaborative Group Identity Discovery Matrix',
        'Part B: Individual Personal Identity Anchor & Shield',
        'Connect: Values • Talents • Heritage • Future Goals'
      ],
      speakerNotes: 'Direct learners to form groups of 4. Distribute LAS-S1 worksheets and facilitate station sharing.',
      badge: 'FLOW: EXPLORE'
    },
    {
      slideNumber: 5,
      sessionNumber: 1,
      title: 'EXPLAIN: CORE TAKEAWAYS',
      subtitle: 'Consolidating Our Understanding of the Self',
      type: 'explain',
      bodyBullets: [
        'Identity is multidimensional: Physical, Social, and Moral.',
        'A grounded sense of self protects you against negative peer pressure.',
        'Your uniqueness is not a limitation—it is your superpower.'
      ],
      speakerNotes: 'Synthesize student responses from the group matrix. Reinforce internal versus external locus of self-worth.',
      badge: 'FLOW: EXPLAIN'
    },
    {
      slideNumber: 6,
      sessionNumber: 1,
      title: 'SESSION 1 SYNTHESIS & EXIT TICKET',
      subtitle: 'Commitment to Self-Respect',
      type: 'synthesis',
      bodyBullets: [
        'Submit completed Activity Sheet LAS-S1.',
        'Write your 1-sentence Personal Affirmation.',
        'Next Session: Navigating Milestones & Changes in Late Adolescence.'
      ],
      speakerNotes: 'Collect LAS-S1 sheets for formative assessment tracking. Provide words of affirmation as students exit.',
      badge: 'WRAP-UP'
    },
    {
      slideNumber: 7,
      sessionNumber: 2,
      title: 'SESSION 2: THE JOURNEY OF BECOMING',
      subtitle: 'Developmental Milestones & Lifeline Analysis',
      type: 'title',
      bodyBullets: [
        'Late Adolescence to Early Adulthood Transitions',
        'Physical, Cognitive, and Social Transformations',
        'Constructing Your Personal Lifeline & Turning Points'
      ],
      speakerNotes: 'Introduce Session 2. Discuss how rapid changes between age 12 and 18 shape thinking and emotions.',
      badge: 'SESSION 2'
    },
    {
      slideNumber: 8,
      sessionNumber: 2,
      title: 'EXPLORE: THE LIFELINE AUDIT',
      subtitle: 'Activity Sheet LAS-S2 • Dyadic & Individual Work',
      type: 'explore',
      bodyBullets: [
        'Compare Ages 12–14 vs Ages 16–18 across 4 growth domains.',
        'Plot your chronological developmental lifeline curve.',
        'Analyze 2 critical turning points that tested and built your resilience.'
      ],
      speakerNotes: 'Pair students up for the comparison matrix, then give individual quiet time for personal lifeline graphing.',
      badge: 'FLOW: EXPLORE'
    },
    {
      slideNumber: 9,
      sessionNumber: 3,
      title: 'SESSION 3: STEPPING INTO RESPONSIBILITY',
      subtitle: 'Robert Havighurst\'s Developmental Tasks',
      type: 'title',
      bodyBullets: [
        'What does "Adulting" mean in Senior High School?',
        'Navigating 8 Major Adolescent Developmental Tasks',
        'Creating Your Personal Responsibility & Growth Chart'
      ],
      speakerNotes: 'Kick off Session 3 focusing on responsibility, emotional independence, and preparing for career and civic life.',
      badge: 'SESSION 3'
    },
    {
      slideNumber: 10,
      sessionNumber: 3,
      title: 'EXPLAIN: 8 DEVELOPMENTAL TASKS',
      subtitle: 'Building the Foundation for Lifelong Success',
      type: 'explain',
      bodyBullets: [
        '1. Achieving mature peer relations',
        '2. Emotional independence from adults',
        '3. Preparing for an economic career',
        '4. Adopting an ethical code and civic responsibility'
      ],
      speakerNotes: 'Discuss Havighurst framework. Explain how each task prepares them for tertiary education, work, or entrepreneurship.',
      badge: 'FLOW: EXPLAIN'
    },
    {
      slideNumber: 11,
      sessionNumber: 4,
      title: 'SESSION 4: BUILDING THE PROTECTIVE SHIELD',
      subtitle: 'Risk Factors vs Protective Buffers in Youth Resilience',
      type: 'title',
      bodyBullets: [
        'Identifying vulnerabilities in your daily environment',
        'Strengthening internal and social protective shields',
        'Formulating your Actionable Personal Resilience Blueprint'
      ],
      speakerNotes: 'Lead the culminating session on resilience, coping strategies, and mental wellness.',
      badge: 'SESSION 4'
    },
    {
      slideNumber: 12,
      sessionNumber: 4,
      title: 'YOUR RESILIENCE BLUEPRINT & SHIELD',
      subtitle: 'Activity Sheet LAS-S4 • Culminating Master Synthesis',
      type: 'synthesis',
      bodyBullets: [
        'Identify 3 specific risks you will proactively avoid.',
        'Activate your emergency support network (Counselor, Mentor, Family).',
        'Carry your Resilience Shield as your daily guide for Grade 11!'
      ],
      speakerNotes: 'Wrap up the 4-session ILAW unit. Celebrate student growth and collect LAS-S4 for portfolio assessment.',
      badge: 'CULMINATION'
    }
  ]
};
