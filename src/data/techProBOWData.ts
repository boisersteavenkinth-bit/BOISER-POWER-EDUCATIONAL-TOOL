export interface TechProBOWActivity {
  title: string;
  description: string;
  prompt?: string;
}

export interface TechProBOWWeekItem {
  week: string;
  learningCompetencies: string[];
  suggestedActivities: TechProBOWActivity[];
}

export interface TechProBOWPerformanceTask {
  title: string;
  type: 'Individual' | 'Group';
  description: string;
  prompt?: string;
}

export interface TechProBOWElective {
  id: string;
  title: string;
  sector: 'Industrial Arts (IA)' | 'ICT' | 'Family and Consumer Sciences (FCS)' | 'Maritime';
  cluster: string;
  gradeLevel: 'Grade 12';
  deliveryNote: string; // "Please note that each TechPro elective is completed within one term if delivered at Grade 12."
  contentStandards: string[];
  performanceStandards: string[];
  weeks: TechProBOWWeekItem[];
  suggestedPerformanceTasks: TechProBOWPerformanceTask[];
  lastUpdated: string;
}

export const TECHPRO_BOW_DATABASE: Record<string, TechProBOWElective> = {
  'ia-smaw': {
    id: 'ia-smaw',
    title: 'Manual Metal Arc Welding (MMAW)',
    sector: 'Industrial Arts (IA)',
    cluster: 'Construction and Building Technology',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'Demonstrate an understanding of the concepts and principles of Manual Metal Arc Welding Process (MMAW).',
      'Demonstrate an understanding of the concepts and principles of the fillet welding in carbon steel plates in PA (1F), PC (2F), PF (3F) and PE (4F) positions.',
      'Demonstrate an understanding of the concepts and principles of the groove welding in carbon steel plates in PA (1G), PC (2G), PF (3G) and PE (4G) positions.'
    ],
    performanceStandards: [
      'The learners perform setting-up welding machines, accessories, jigs and fixtures, stringer and weave bead patterns in carbon steel plates. Joint fit-up in workpiece/weld specimen and inspect visually following the safety precautions.',
      'The learners perform fillet welding procedures in carbon steel plates in PA (1F), PC (2F), PF (3F) and PE (4F) positions, following the safety precautions. Inspect visually and compute the service cost based on job requirements.',
      'The learners perform groove welding procedures in carbon steel plates in PA (1G), PC (2G), PF (3G) and PE (4G) positions following the safety precautions. Inspect visually and compute the service cost based on job requirements.'
    ],
    weeks: [
      {
        week: 'Week 1',
        learningCompetencies: [
          'Discuss the overview of manual metal arc welding process.',
          'Discuss the weld joint design.',
          'Interpret technical drawing, sketches and welding symbols in reading blueprints/plans.',
          'Discuss welding procedure specification (WPS).'
        ],
        suggestedActivities: [
          {
            title: 'Arc Process Breakdown',
            description: 'A collaborative activity where learners analyze and explain the complete overview of the Manual Metal Arc Welding process, including principles, equipment, step-by-step procedure, and safety precautions.',
            prompt: 'Divide learners into groups and have each group create and present a labeled flowchart explaining the MMAW process from equipment setup to slag removal.'
          },
          {
            title: 'Welding Process Mapping',
            description: 'A visual-learning activity where learners synthesize their understanding of the MMAW process by identifying key stages, materials, and safety measures.',
            prompt: 'Design a process map or diagram illustrating and briefly explaining each stage of the manual metal arc welding operation.'
          },
          {
            title: 'Joint Design Explorer',
            description: 'A collaborative discussion activity examining and differentiating common weld joint designs—butt joint, lap joint, tee joint, corner joint, and edge joint.',
            prompt: 'Assign each group one weld joint type to illustrate, describe its features and uses, and present their explanation.'
          },
          {
            title: 'WPS Breakdown Workshop',
            description: 'A guided discussion examining parts of a Welding Procedure Specification (WPS) including process, base metal, filler metal, positions, amperage, voltage, and safety.',
            prompt: 'Provide a sample WPS form and have learners highlight and explain the function of each major section in small groups.'
          }
        ]
      },
      {
        week: 'Week 2',
        learningCompetencies: [
          'Discuss occupational safety and health (OSH).',
          'Perform setting-up welding machine, accessories, positioners, jigs and fixtures.',
          'Prepare tools, materials and equipment for stringer and weave beads.'
        ],
        suggestedActivities: [
          {
            title: 'Shop Hazard Hunt',
            description: 'Identify common workshop hazards (electrical, fire, fumes, sharp tools, improper PPE) and explain preventive measures.',
            prompt: 'Inspect a simulated workshop setup and list identified hazards with corresponding OSH preventive measures.'
          },
          {
            title: 'Welding Equipment Setup Drill',
            description: 'Hands-on performance preparing and setting up the welding machine, connecting accessories, adjusting settings, and inspecting cables/PPE.',
            prompt: 'In small groups, properly assemble and set up a welding station following a provided setup checklist and safety standards.'
          },
          {
            title: 'Jigs and Fixtures Alignment Task',
            description: 'Install and align workpieces using positioners, jigs, and fixtures to ensure correct joint alignment and stability.',
            prompt: 'Set up and secure materials using appropriate jigs, fixtures, and positioners according to given specifications.'
          }
        ]
      },
      {
        week: 'Week 3',
        learningCompetencies: [
          'Perform stringer and weave bead patterns in carbon steel plates.',
          'Perform visual weld inspection.',
          'Apply joint fit-up of the workpiece/weld specimen.'
        ],
        suggestedActivities: [
          {
            title: 'Stringer Bead Control Practice',
            description: 'Deposit straight stringer runs on carbon steel plates to develop proper arc length control, travel speed, and electrode angle.',
            prompt: 'Maintain correct arc length, travel speed, and electrode positioning according to set standards.'
          },
          {
            title: 'Weave Bead Pattern Application',
            description: 'Execute weave bead patterns focusing on side-to-side motion control, uniform width, proper fusion, and slag removal.',
            prompt: 'Perform controlled weave bead passes following specified width, movement pattern, and safety procedures.'
          },
          {
            title: 'Weld Defect Detection Lab & Inspection',
            description: 'Examine welded specimens to identify visible discontinuities such as cracks, porosity, undercut, overlap, and incomplete fusion.',
            prompt: 'Complete a visual inspection report stating acceptability based on specified criteria.'
          }
        ]
      },
      {
        week: 'Week 4',
        learningCompetencies: [
          'Discuss fillet welding in carbon steel plates and the prescribed welding positions: PA (1F), PC (2F), PF (3F) and PE (4F).',
          'Prepare tools, materials and equipment for fillet welding.',
          'Perform fillet welding in carbon steel plates PA (1F) position.'
        ],
        suggestedActivities: [
          {
            title: 'Fillet Welding Position Exploration & Demonstration',
            description: 'Examine carbon steel fillet welds across flat, horizontal, vertical, and overhead positions, noting handling techniques.',
            prompt: 'Observe or simulate welding in PA, PC, PF, and PE positions and note key handling techniques and bead appearance.'
          },
          {
            title: 'PA Position Fillet Bead Practice',
            description: 'Practice producing straight and uniform fillet welds on carbon steel plates in the flat (PA/1F) position.',
            prompt: 'Weld multiple fillet beads on carbon steel plates in the PA (1F) position while maintaining correct technique.'
          }
        ]
      },
      {
        week: 'Week 5',
        learningCompetencies: [
          'Perform fillet welding in carbon steel plates in PC (2F) position.',
          'Perform fillet welding in carbon steel plates in PF (3F) position.'
        ],
        suggestedActivities: [
          {
            title: 'PC (2F) Horizontal Fillet Bead Practice',
            description: 'Perform fillet welding in the horizontal (PC/2F) position emphasizing proper electrode angle and bead uniformity.',
            prompt: 'Set up a carbon steel workpiece in PC (2F) position and perform multiple fillet beads observing safety procedures.'
          },
          {
            title: 'PF (3F) Vertical Fillet Bead Practice',
            description: 'Perform fillet welds in the vertical (PF/3F) position focusing on controlling electrode angle, travel speed, and bead uniformity.',
            prompt: 'Weld multiple vertical fillet beads and visually inspect for bead shape, penetration, and defects.'
          }
        ]
      },
      {
        week: 'Week 6',
        learningCompetencies: [
          'Perform fillet welding in carbon steel plates in PE (4F) position.',
          'Perform visual weld inspection.',
          'Compute the service cost based on the job requirements.'
        ],
        suggestedActivities: [
          {
            title: 'Overhead Fillet Bead Practice (PE/4F)',
            description: 'Perform fillet welds on carbon steel plates in the overhead position, emphasizing electrode control under challenging angles.',
            prompt: 'Perform multiple fillet beads in PE (4F) position and inspect visually for uniformity and defects.'
          },
          {
            title: 'Individual & Group Service Cost Calculation',
            description: 'Calculate total service cost for a welding job by considering materials, labor hours, machine use, and overhead expenses.',
            prompt: 'Compute the total service cost using standard cost computation formulas based on job specifications.'
          }
        ]
      },
      {
        week: 'Weeks 7–8',
        learningCompetencies: [
          'Discuss groove welding in carbon steel plates and the prescribed welding positions: PA (1G), PC (2G), PF (3G) and PE (4G).',
          'Prepare tools, materials and equipment for groove welding carbon steel plates.',
          'Perform groove welding in carbon steel plates in PA (1G), PC (2G), PF (3G), and PE (4G) positions.'
        ],
        suggestedActivities: [
          {
            title: 'Groove Welding Position Exploration & Setup Drill',
            description: 'Assemble and check all tools, electrodes, machine settings, and PPE required for groove welding on carbon steel plates.',
            prompt: 'Observe and simulate groove welding in PA, PC, PF, and PE positions and record key observations about technique.'
          },
          {
            title: 'PA (1G), PC (2G), PF (3G), PE (4G) Groove Practice Rotation',
            description: 'Perform groove welds in flat, horizontal, vertical, and overhead positions focusing on bead penetration and fusion.',
            prompt: 'Weld groove joints sequentially across all four positions and inspect visually using defect checklists.'
          }
        ]
      },
      {
        week: 'Week 9',
        learningCompetencies: [
          'Perform visual weld inspection.',
          'Compute the service cost based on the job requirements.',
          'Discuss groove welding in carbon steel plates and the prescribed welding positions: PA (1G), PC (2G), PH (5G) and H-LO45 (6G).',
          'Prepare tools, materials and equipment for groove welding in carbon steel pipes.'
        ],
        suggestedActivities: [
          {
            title: 'Pipe Groove Welding Demonstration & Rigging',
            description: 'Observe instructor perform groove welding on carbon steel pipes in 1G, 2G, 5G, and 6G (H-LO45) positions.',
            prompt: 'Inspect welding area and create a complete checklist of materials, pipes, and consumables required for pipe welding.'
          },
          {
            title: 'Cost Breakdown & Quotation Workshop',
            description: 'Analyze industrial project specifications to calculate labor, materials, and overhead, producing a final service quotation.',
            prompt: 'Prepare an itemized quotation with labor charges and profit margin for client presentation.'
          }
        ]
      },
      {
        week: 'Weeks 10–11',
        learningCompetencies: [
          'Perform groove welding in carbon steel pipes in PA (1G) position.',
          'Perform groove welding in carbon steel pipes in PC (2G) position.',
          'Perform groove welding in carbon steel pipes in PH (5G) position.',
          'Perform groove welding in carbon steel pipes in H-LO45 (6G) position.',
          'Perform visual weld inspection.',
          'Compute the service cost based on the job requirements.'
        ],
        suggestedActivities: [
          {
            title: 'Pipe Alignment & 1G/2G Groove Welding Drill',
            description: 'Align and clamp two carbon steel pipes horizontally and vertically to execute continuous groove welds.',
            prompt: 'Weld prepared horizontal and vertical pipe joints using proper electrode angles and travel speed.'
          },
          {
            title: 'PH (5G) & H-LO45 (6G) Pipe Groove Welding Drill',
            description: 'Clamp pipes on rotatable fixtures and at 45° inclined angles to execute 5G and 6G groove welds.',
            prompt: 'Weld the 45° inclined pipe joint steadily, adjusting electrode angle and speed to maintain a consistent groove weld.'
          },
          {
            title: 'Quality Assessment & Job Cost Breakdown',
            description: 'Evaluate weld quality by checking bead uniformity, size, alignment, and compliance, then compute final project service cost.',
            prompt: 'Classify welds as acceptable or needing repair, and calculate the total service cost using a spreadsheet.'
          }
        ]
      }
    ],
    suggestedPerformanceTasks: [
      {
        title: 'Individual Task: Weld Mastery Challenge',
        type: 'Individual',
        description: 'Set up welding station, prepare and fit-up a carbon steel workpiece, perform both stringer and weave bead patterns, and conduct visual inspection following safety rules.'
      },
      {
        title: 'Group Task: Welding Station Simulation',
        type: 'Group',
        description: 'Organize a complete welding station, assign roles for machine setup, joint fit-up, bead welding, and visual inspection collaboratively.'
      },
      {
        title: 'Individual Task: Fillet Welding Mastery & Cost Computation',
        type: 'Individual',
        description: 'Perform fillet welding on carbon steel plates in PA, PC, PF, and PE positions, visually inspect work, and calculate total service cost.'
      },
      {
        title: 'Individual Task: Pipe Groove Welding (6G) & Cost Computation',
        type: 'Individual',
        description: 'Perform groove welding on carbon steel pipes in PA (1G), PC (2G), PH (5G), and H-LO45 (6G) positions, inspect for defects, and calculate total service cost.'
      }
    ]
  },

  'ia-tech-drafting': {
    id: 'ia-tech-drafting',
    title: 'Technical Drafting',
    sector: 'Industrial Arts (IA)',
    cluster: 'Construction and Building Technology',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'Demonstrate understanding of the fundamentals of technical drafting, tools and materials in manual drafting, mensuration and calculation, drafting conventions, architectural symbols, and details in producing architectural plans.',
      'Demonstrate an understanding of drafting principles, techniques, and industry standards including mastering manual drafting, knowledge of various disciplines (architectural, structural, electrical, plumbing, mechanical).',
      'Demonstrate an understanding of CAD software installation, interface navigation, creation of 2D and 3D geometries, and produce accurate 2D architectural and structural plans in CAD.',
      'Demonstrate an understanding in using Computer-Aided Design (CAD) software to create detailed 2D and 3D drawings of various building systems, and compute project cost estimates align to industry standards.'
    ],
    performanceStandards: [
      'The learners create accurate technical drawings, and architectural plans observing relevant building codes, standards, and conventions.',
      'The learners create manual Structural, Electrical, Electronic, and Mechanical plans projects observing relevant building codes, standards, and conventions.',
      'The learners create 2D and 3D geometries, and detailed 2D architectural and structural plans projects using CAD software observing relevant building codes, standards, and conventions.',
      'The learners create 2D and 3D Computer-Aided Design (CAD) layouts project integrating Electrical, Electronic, Mechanical plans, Architectural Model and compute project cost estimate.'
    ],
    weeks: [
      {
        week: 'Week 1',
        learningCompetencies: [
          'Discuss technical drafting fundamentals.',
          'Explain tools, materials and equipment in manual drafting.',
          'Perform mensuration and calculation.'
        ],
        suggestedActivities: [
          {
            title: 'Drafting Tools & Materials Exploration',
            description: 'Examine each drafting tool (T-squares, triangles, compasses, scales) and material, noting function and proper usage.',
            prompt: 'Handle each tool and material, identify its function, and demonstrate how it is used in creating accurate drawings.'
          },
          {
            title: 'Basic Drawing Practice & Mensuration',
            description: 'Practice fundamental drafting techniques such as orthographic projection, dimensioning, line types, and area/volume calculations.',
            prompt: 'Draw simple objects using proper drafting symbols, line weights, and measurement standards.'
          }
        ]
      },
      {
        week: 'Week 2',
        learningCompetencies: [
          'Perform manual drafting conversions.',
          'Create architectural layout and details.'
        ],
        suggestedActivities: [
          {
            title: 'Scale Conversion Practice & Unit Transformation',
            description: 'Convert real-world dimensions into scaled drawings and vice versa (inches to mm, feet to cm).',
            prompt: 'Measure an object, apply a given scale ratio, and draw the scaled representation on drafting paper.'
          },
          {
            title: 'Floor Plan Drafting & Detail Development',
            description: 'Design and draw a simple architectural floor plan with rooms, walls, doors, windows, and detailed drawings of stairs or doors.',
            prompt: 'Draw floor plan to scale on drafting paper, label all rooms and openings clearly, and annotate construction specifications.'
          }
        ]
      },
      {
        week: 'Week 3',
        learningCompetencies: [
          'Create structural layout and details.',
          'Create electrical and electronic layout and details.'
        ],
        suggestedActivities: [
          {
            title: 'Structural Plan Drafting & Component Detailing',
            description: 'Design and draw structural layout (beams, columns, footings) with reinforcement specifications.',
            prompt: 'Sketch building framework to scale, annotating dimensions and material specifications.'
          },
          {
            title: 'Circuit Layout Drafting & Component Detailing',
            description: 'Draft layout of electrical and electronic circuits using standard symbols, showing connections and power sources.',
            prompt: 'Connect circuit components using standard symbols and annotate specifications accurately.'
          }
        ]
      },
      {
        week: 'Week 4',
        learningCompetencies: [
          'Create sanitary and plumbing layout and details.',
          'Create mechanical layout and details.'
        ],
        suggestedActivities: [
          {
            title: 'Plumbing System Layout & Fixture Detailing',
            description: 'Draw water supply lines, drainage, fixtures, and pipe routes of a residential structure to scale.',
            prompt: 'Sketch plumbing network showing pipes, fixtures, traps, and flow direction according to standard symbols.'
          },
          {
            title: 'Mechanical System Layout Drafting',
            description: 'Draft layout of a mechanical system (conveyor, engine, ventilation) showing component arrangements.',
            prompt: 'Draw mechanical components to scale with tolerances and fabrication notes.'
          }
        ]
      },
      {
        week: 'Week 5',
        learningCompetencies: [
          'Perform installation and exploration of Computer-Aided Design (CAD) Software.',
          'Create 2D geometries and shapes.'
        ],
        suggestedActivities: [
          {
            title: 'CAD Software Installation & Interface Exploration',
            description: 'Navigate menus, toolbars, coordinate systems, and basic drawing commands in CAD.',
            prompt: 'Open CAD program, explore toolbars, and practice drawing basic 2D shapes with constraints.'
          },
          {
            title: 'Composite Geometry Design',
            description: 'Combine multiple 2D shapes into complex geometries simulating real-world design components.',
            prompt: 'Construct dimensionally accurate 2D CAD components using snaps, layers, and offset tools.'
          }
        ]
      },
      {
        week: 'Week 6',
        learningCompetencies: [
          'Discuss 3D Computer Aided Design User Interface.',
          'Create 3D Geometry.'
        ],
        suggestedActivities: [
          {
            title: '3D CAD Interface Tour & Tool Demonstration',
            description: 'Explore 3D modeling viewports, extrude, revolve, sweep, fillet, and rotate commands.',
            prompt: 'Select 2D sketches and apply 3D operations to manipulate them into solid 3D objects.'
          },
          {
            title: 'Complex 3D Shape Construction',
            description: 'Merge, subtract, and intersect 3D solids to build composite machine or architectural models.',
            prompt: 'Build a composite 3D solid model maintaining proper dimensions and alignment.'
          }
        ]
      },
      {
        week: 'Weeks 7–8',
        learningCompetencies: [
          'Create 2D architectural layout and details.',
          'Create 2D structural layout and details.',
          'Create 2D electrical and electronic layout and details.',
          'Create 2D sanitary and plumbing layout and details.'
        ],
        suggestedActivities: [
          {
            title: 'Full 2D Architectural & Structural CAD Set',
            description: 'Produce complete 2D floor plans, elevations, sections, and foundation/framing plans.',
            prompt: 'Generate properly layered, scaled, and annotated 2D CAD drawing sets.'
          },
          {
            title: 'MEP Systems 2D CAD Integration',
            description: 'Draft electrical lighting/power plans, plumbing layouts, and schematic circuit diagrams.',
            prompt: 'Integrate electrical and plumbing layouts on coordinated architectural backgrounds.'
          }
        ]
      },
      {
        week: 'Weeks 9–11',
        learningCompetencies: [
          'Create a 2D mechanical layout and details.',
          'Create 3D architectural model.',
          'Compute project cost estimation.'
        ],
        suggestedActivities: [
          {
            title: '3D House Modeling & Architectural Rendering',
            description: 'Convert 2D floor plan into a rendered 3D architectural model with roof, openings, and textures.',
            prompt: 'Extrude walls, insert doors/windows, and generate a 3D model for presentation.'
          },
          {
            title: 'Bill of Materials (BOM) & Project Cost Estimation',
            description: 'Calculate material quantities, labor costs, overhead, contingency, and profit margin for the building project.',
            prompt: 'Prepare a complete project cost estimate and bill of materials aligned to industry standards.'
          }
        ]
      }
    ],
    suggestedPerformanceTasks: [
      {
        title: 'Individual Task: Code-Compliant Residential Floor Plan',
        type: 'Individual',
        description: 'Independently create an architectural floor plan of a residential unit applying building code requirements (room sizes, ventilation, egress).'
      },
      {
        title: 'Group Task: Complete Architectural Drawing Set Project',
        type: 'Group',
        description: 'Collaboratively produce a full architectural drawing set (floor plan, elevations, sections, details) conforming to building codes.'
      },
      {
        title: 'Individual Task: 2D–3D Residential Model Development in CAD',
        type: 'Individual',
        description: 'Create scaled 2D plans in CAD and generate a corresponding rendered 3D model following drafting standards.'
      },
      {
        title: 'Group Task: Integrated CAD Design, Multi-System Modeling & Cost Proposal',
        type: 'Group',
        description: 'Design a complete building package integrating architectural, structural, electrical, and plumbing plans with a full Bill of Materials and cost proposal.'
      }
    ]
  },

  'ia-epas': {
    id: 'ia-epas',
    title: 'Electronics Product Assembly and Servicing',
    sector: 'Industrial Arts (IA)',
    cluster: 'Industrial Technologies',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'The learners demonstrate understanding of the principles in electronic systems assembling and servicing, identification of electronic components, PCB designing, soldering and desoldering, and assembly of electronic products.',
      'Demonstrate an understanding of the principles of appliances with electric motors, appliances with heating components, and electronic controlled lighting units.',
      'The learners demonstrate an understanding of the principles of Closed-Circuit Television (CCTV) systems, and fire alarm systems.',
      'The learners demonstrate an understanding of the principles of audio products and systems, television, control boards and motor controllers, sensors and actuators.'
    ],
    performanceStandards: [
      'The learners perform procedures in assembling and testing of electronic components, and power supply assembly following existing standard.',
      'The learners perform servicing of appliances with electric motors, appliances with heating elements, and rechargeable and electronic-controlled lighting units ensuring adherence to safety standards.',
      'The learners perform servicing of Closed-Circuit Television (CCTV) systems, and fire alarm systems ensuring adherence to safety precautions.',
      'The learners perform procedures in servicing audio products and systems, control boards and motor controllers, and sensors and actuators.'
    ],
    weeks: [
      {
        week: 'Week 1',
        learningCompetencies: [
          'Explain the overview of Electronic Systems Servicing.',
          'Discuss electronic components identification.',
          'Demonstrate procedures in testing electronic components.'
        ],
        suggestedActivities: [
          {
            title: 'Electronic Device Disassembly & Component Mapping',
            description: 'Disassemble a simple electronic device (radio, LED lamp) to identify parts and trace signal flow.',
            prompt: 'Open the device, identify its components (passive, active, ICs), and test values using a digital multimeter.'
          },
          {
            title: 'Multimeter Hands-On Testing & Fault Diagnosis Lab',
            description: 'Measure resistance, voltage, diode drop, and continuity to locate defective components.',
            prompt: 'Systematically test circuits with deliberately faulty components and document findings.'
          }
        ]
      },
      {
        week: 'Week 2',
        learningCompetencies: [
          'Discuss the procedures for PCB designing, including design software and layout transfer techniques.',
          'Discuss soldering and desoldering.',
          'Discuss the different types of power supplies.',
          'Perform variable regulated power supply assembly.'
        ],
        suggestedActivities: [
          {
            title: 'PCB Design, Layout Transfer & Soldering Practice',
            description: 'Transfer a designed PCB layout onto copper board, etch, drill, and practice clean soldering/desoldering.',
            prompt: 'Safely solder components without overheating and demonstrate desoldering using pump and wick.'
          },
          {
            title: 'Regulated DC Power Supply Assembly & Testing',
            description: 'Assemble transformer, bridge rectifier, filter capacitor, voltage regulator IC, and potentiometer into a working power supply.',
            prompt: 'Test output voltage adjustment and stability under load using a multimeter.'
          }
        ]
      },
      {
        week: 'Week 3',
        learningCompetencies: [
          'Discuss the procedures in servicing appliances with electric motors.',
          'Apply procedures in servicing appliances with electric motors.'
        ],
        suggestedActivities: [
          {
            title: 'Electric Motor Component Analysis & Lubrication',
            description: 'Dismantle small appliance motors (fans, blenders), clean bearings, inspect brushes, and test winding continuity.',
            prompt: 'Troubleshoot common motor faults like worn brushes or open thermal fuses safely.'
          }
        ]
      },
      {
        week: 'Weeks 4–5',
        learningCompetencies: [
          'Discuss the procedures in servicing appliances with heating components.',
          'Apply procedure in servicing appliances with heating components.',
          'Discuss the procedures in servicing rechargeable and electronic-controlled lighting units.',
          'Demonstrate the procedure in servicing electronic controlled lighting units.',
          'Discuss the principles of Closed-Circuit Television (CCTV) system.'
        ],
        suggestedActivities: [
          {
            title: 'Heating Element & Thermostat Replacement Lab',
            description: 'Diagnose and replace heating elements, thermal cutoffs, and thermostats in irons, toasters, and water heaters.',
            prompt: 'Verify continuity and safe operation using multimeters before powering on.'
          },
          {
            title: 'Rechargeable LED Lighting Repair & Testing',
            description: 'Troubleshoot battery charging circuits, driver boards, and LED arrays in emergency lights and solar lanterns.',
            prompt: 'Perform functional testing for proper charging current, voltage, and illumination.'
          }
        ]
      },
      {
        week: 'Week 6',
        learningCompetencies: [
          'Demonstrate the procedure in CCTV system installation.',
          'Perform CCTV system servicing.'
        ],
        suggestedActivities: [
          {
            title: 'CCTV Installation & Troubleshooting Practicum',
            description: 'Mount cameras, terminate coaxial/UTP video cables, connect to DVR/NVR, configure channels, and troubleshoot video loss.',
            prompt: 'Install and configure a multi-camera CCTV system following safety and operational guidelines.'
          }
        ]
      },
      {
        week: 'Weeks 7–8',
        learningCompetencies: [
          'Discuss the principles of fire alarm systems.',
          'Perform the procedure in fire alarm system installation.',
          'Perform the procedure in fire alarm system servicing.',
          'Discuss audio products and systems.'
        ],
        suggestedActivities: [
          {
            title: 'Fire Alarm System (FAS) Installation & Testing Lab',
            description: 'Wire smoke detectors, heat detectors, manual pull stations, and alarm bells to an FDAS control panel.',
            prompt: 'Simulate open circuit and short circuit faults and perform functional alarm trip testing.'
          },
          {
            title: 'Audio Amplifier & Sound System Signal Mapping',
            description: 'Trace audio signals from microphone input, preamp, tone control, to power amplifier stages and speaker loads.',
            prompt: 'Test speaker outputs and diagnose common distortion or power supply hum.'
          }
        ]
      },
      {
        week: 'Weeks 9–11',
        learningCompetencies: [
          'Perform the installation and operation of audio products and systems.',
          'Perform procedure in servicing audio products and systems.',
          'Discuss television and perform servicing procedures.',
          'Discuss control boards, motor controllers, sensors and actuators and perform servicing.'
        ],
        suggestedActivities: [
          {
            title: 'Public Address System Setup & Audio Repair',
            description: 'Connect microphones, mixer, equalizer, amplifier, and speakers; resolve feedback and loose connections.',
            prompt: 'Diagnose defective components in audio amplifiers using signal tracing.'
          },
          {
            title: 'Television Inspection & Power Board Troubleshooting',
            description: 'Examine LED/LCD TV power boards, backlights, and mainboards, observing high-voltage safety rules.',
            prompt: 'Simulate troubleshooting scenarios for no power, no display, or sound issues.'
          },
          {
            title: 'Motor Controllers, Sensors & Actuators Servicing',
            description: 'Test temperature/optical sensors, relays, solenoids, and PWM motor speed control boards.',
            prompt: 'Diagnose and restore a sensor-actuator automated motor control circuit.'
          }
        ]
      }
    ],
    suggestedPerformanceTasks: [
      {
        title: 'Individual Task: Assembly and Testing of a Regulated DC Power Supply',
        type: 'Individual',
        description: 'Independently assemble and test a regulated DC power supply with transformer, rectifier, filter, and regulator IC.'
      },
      {
        title: 'Individual Task: Servicing a Motor-Operated or Heating Appliance',
        type: 'Individual',
        description: 'Diagnose and repair a common household appliance (fan, flat iron, rice cooker) following electrical safety standards.'
      },
      {
        title: 'Group Task: CCTV & Fire Alarm System Installation and Restoration',
        type: 'Group',
        description: 'Collaboratively install, wire, configure, and troubleshoot a simulated CCTV security and Fire Alarm System.'
      },
      {
        title: 'Group Task: Integrated System Servicing of Motor Controller with Sensors & Actuators',
        type: 'Group',
        description: 'Diagnose, repair, and test a motor control board integrated with limit switches, sensors, and relays.'
      }
    ]
  },

  'ia-pv-systems': {
    id: 'ia-pv-systems',
    title: 'Photovoltaic (PV) Systems Installation',
    sector: 'Industrial Arts (IA)',
    cluster: 'Industrial Technologies',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'The learners demonstrate an understanding of the concepts and principles of solar energy systems in Photovoltaic (PV) Systems Installation.',
      'The learners demonstrate an understanding of the concepts and principles of Photovoltaic (Solar Energy) Systems Installation.'
    ],
    performanceStandards: [
      'The learners perform site assessment with safety precautions.',
      'The learners perform PV components inspection with safety precautions.',
      'The learners perform photovoltaic (solar energy) systems installation with safety precautions.',
      'The learners perform commissioning of photovoltaic (solar energy) systems with safety precautions.'
    ],
    weeks: [
      {
        week: 'Week 1',
        learningCompetencies: [
          'Discuss the concepts and principles related to Photovoltaic Systems Installation.'
        ],
        suggestedActivities: [
          {
            title: 'Solar Energy System Exploration & Case Study',
            description: 'Examine solar panels, inverters, charge controllers, battery banks, and wiring to understand solar electricity conversion.',
            prompt: 'Analyze real-life applications of PV systems in homes and off-grid schools.'
          }
        ]
      },
      {
        week: 'Weeks 2–3',
        learningCompetencies: [
          'Discuss checklist for installation parameters.',
          'Perform site assessment procedures.'
        ],
        suggestedActivities: [
          {
            title: 'PV Installation Checklist & School-Based Site Assessment',
            description: 'Evaluate roof orientation, azimuth, tilt angle, structural integrity, and shading patterns using solar meters.',
            prompt: 'Conduct a practical site assessment and document solar irradiance data.'
          }
        ]
      },
      {
        week: 'Weeks 4–5',
        learningCompetencies: [
          'Report completion of work.',
          'Perform inspection of PV components, materials and measuring instruments compliance.'
        ],
        suggestedActivities: [
          {
            title: 'PV Components Compliance Inspection & Instrument Check',
            description: 'Inspect solar modules, MC4 connectors, mounting rails, and verify calibration of clamp meters and irradiance meters.',
            prompt: 'Verify that components meet safety specifications and prepare an inspection compliance report.'
          }
        ]
      },
      {
        week: 'Week 6',
        learningCompetencies: [
          'Conduct reporting of test results of PV components and materials.',
          'Discuss safety protocols for PV systems installation.'
        ],
        suggestedActivities: [
          {
            title: 'PV Testing Data Recording & Safety Scenario Analysis',
            description: 'Test open-circuit voltage (Voc) and short-circuit current (Isc), analyze fall protection, PPE, and DC arc flash hazards.',
            prompt: 'Demonstrate proper safety equipment use including harness, insulated tools, and lockout-tagout.'
          }
        ]
      },
      {
        week: 'Week 7',
        learningCompetencies: [
          'Determine the PV installation layout, tools, and materials.'
        ],
        suggestedActivities: [
          {
            title: 'PV System Layout Planning & Materials Workshop',
            description: 'Design panel layout for a building roof, calculate string sizing, and plan conduit runs to inverter and battery bank.',
            prompt: 'Draw and label a proposed PV installation single-line diagram.'
          }
        ]
      },
      {
        week: 'Weeks 8–9',
        learningCompetencies: [
          'Perform installation of photovoltaic systems.',
          'Report completion of work.'
        ],
        suggestedActivities: [
          {
            title: 'Simulated PV System Assembly & Wiring Practicum',
            description: 'Mount solar panels on racking frames, install DC combiner box, surge protectors, charge controller, and inverter.',
            prompt: 'Complete wiring connections according to system schematics and submit a formal accomplishment report.'
          }
        ]
      },
      {
        week: 'Weeks 10–11',
        learningCompetencies: [
          'Apply commissioning procedures on wiring, grounding, and system components.',
          'Manage the results of commissioning photovoltaic systems.'
        ],
        suggestedActivities: [
          {
            title: 'PV System Commissioning Simulation & Fault Correction',
            description: 'Verify polarity, continuity of grounding electrode conductors, insulation resistance, inverter startup sequence, and grid synchronization.',
            prompt: 'Diagnose intentionally staged wiring/grounding faults and compile a professional commissioning test report.'
          }
        ]
      }
    ],
    suggestedPerformanceTasks: [
      {
        title: 'Individual Task: Safe Site Inspector',
        type: 'Individual',
        description: 'Independently inspect a designated installation area, identify hazards, measure solar orientation, and prepare a site safety report.'
      },
      {
        title: 'Individual Task: Solar Panel Mounting & Wiring Practice',
        type: 'Individual',
        description: 'Demonstrate mounting a solar panel on a frame, making weatherproof MC4 connections, and checking Voc with a multimeter.'
      },
      {
        title: 'Group Task: Mini Solar System Installation & Commissioning Project',
        type: 'Group',
        description: 'Collaboratively install and commission a complete small-scale off-grid solar system including panel, controller, battery, inverter, and load.'
      }
    ]
  },

  'ict-animation': {
    id: 'ict-animation',
    title: 'Animation',
    sector: 'ICT',
    cluster: 'Creative Arts and Design Technology',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'The learners demonstrate understanding of the concepts and principles of creating character design using traditional hand drawing techniques.',
      'The learners demonstrate understanding of the concepts and principles of creating cleaned-up drawings in traditional animation and storyboard.',
      'The learners demonstrate an understanding of the concepts of creating in-between drawings/key extremes and breakdown using digital drawing techniques.',
      'The learners demonstrate understanding of the principles in creating digital animation and calculate animation cost based on industry standards.'
    ],
    performanceStandards: [
      'The learners create character designs using hand drawing techniques.',
      'The learners create cleaned-up drawings for traditional animation and storyboard.',
      'The learners create clean up and in-between drawings/key extremes and breakdown using digital drawing techniques.',
      'Learners create digital animation output and calculate animation cost based on industry standards.'
    ],
    weeks: [
      {
        week: 'Week 1',
        learningCompetencies: [
          'Discuss animation fundamentals.',
          'Use tools, equipment, and materials in traditional animation.',
          'Apply traditional hand drawing techniques in animation.'
        ],
        suggestedActivities: [
          {
            title: 'Animation Through the Ages & Studio Simulation',
            description: 'Examine history, 12 principles of animation, animation desk setup, peg bars, lightboxes, and exposure sheets.',
            prompt: 'Create a timeline of animation developments and organize a traditional animator workstation.'
          },
          {
            title: 'Lines That Speak & Perspective in Action',
            description: 'Apply construction drawing, varied line weights, and one/two-point perspective to establish volume and depth.',
            prompt: 'Draw character poses using construction lines showing anatomy, balance, and emotion.'
          }
        ]
      },
      {
        week: 'Week 2',
        learningCompetencies: [
          'Create character designs for traditional animation.'
        ],
        suggestedActivities: [
          {
            title: 'Design a Star & Character Turnaround Challenge',
            description: 'Apply proportion, silhouettes, and anatomical guidelines to design an original character with a 360 turnaround sheet.',
            prompt: 'Draw front, three-quarters, side, and back views maintaining head proportions and model consistency.'
          }
        ]
      },
      {
        week: 'Week 3',
        learningCompetencies: [
          'Create traditional cleaned-up drawings.'
        ],
        suggestedActivities: [
          {
            title: 'Clean-Up Master Challenge & Keyframe Performance',
            description: 'Produce refined, polished key drawings for a selected action (walk cycle, head turn, jump) with clean line consistency.',
            prompt: 'Finalize cleaned-up key drawings following animation model sheet specifications.'
          }
        ]
      },
      {
        week: 'Weeks 4–6',
        learningCompetencies: [
          'Discuss in-between drawing concepts.',
          'Create in-between drawings.'
        ],
        suggestedActivities: [
          {
            title: 'Fill the Motion Gap: In-Betweening & Timing Charts',
            description: 'Analyze slow-in/slow-out timing charts, breakdown drawings, and pegging techniques for fluid movement.',
            prompt: 'Complete missing in-between frames between two keyframes and perform a line test.'
          },
          {
            title: 'Smooth Moves Action Lab',
            description: 'Produce complete in-between sequences for walk cycles, head turns, and lip-sync dialogue.',
            prompt: 'Compile ordered in-betweens into a scene folder ready for digital scanning.'
          }
        ]
      },
      {
        week: 'Week 7',
        learningCompetencies: [
          'Create storyboards.',
          'Discuss animation tools and techniques.'
        ],
        suggestedActivities: [
          {
            title: 'Storyboard Your Story & Director\'s Cut Review',
            description: 'Develop a 6–8 panel storyboard with shot compositions, camera angles, timing, dialogue, and action arrows.',
            prompt: 'Refine and revise storyboard drafts based on peer review and visual storytelling clarity.'
          }
        ]
      },
      {
        week: 'Weeks 8–9',
        learningCompetencies: [
          'Create digital clean-ups and in-between drawing/key extremes and breakdown.'
        ],
        suggestedActivities: [
          {
            title: 'Digital Keyframing, Breakdown & In-Betweening',
            description: 'Use 2D digital animation software to draw vector key extremes, breakdowns, and digital in-betweens.',
            prompt: 'Apply digital onion skinning, timing adjustments, and wave principles to animate fluid motion.'
          }
        ]
      },
      {
        week: 'Weeks 10–11',
        learningCompetencies: [
          'Create digital animations.',
          'Calculate animation costs.'
        ],
        suggestedActivities: [
          {
            title: 'Digital Finalization, Visual FX & Audio Sync',
            description: 'Add digital coloring, shadows, special effects, sound effects, and export in MP4 format.',
            prompt: 'Render and export animated short adhering to frame rate (24 fps) and resolution standards.'
          },
          {
            title: 'Price Your Pixels & Animation Guild Costing',
            description: 'Calculate project costs using industry guild rates for keyframes, in-betweens, background art, and rendering.',
            prompt: 'Prepare a formal client pricing proposal comparing value-based and cost-plus models.'
          }
        ]
      }
    ],
    suggestedPerformanceTasks: [
      {
        title: 'Individual Task: From Sketch to Screen: The Animator\'s Starter Quest',
        type: 'Individual',
        description: 'Design an original character, apply 12 animation principles, and produce a short 6–12 frame animation cycle.'
      },
      {
        title: 'Group Task: Mini Studio Challenge: Build Your First Animated Scene',
        type: 'Group',
        description: 'Form a studio team (director, key animator, clean-up, in-betweener) to produce a coordinated animated scene (10–20 frames).'
      },
      {
        title: 'Individual Task: Digital Frame Builder: From Keys to Clean Motion',
        type: 'Individual',
        description: 'Create a 1–2 second digital animation incorporating key poses, breakdowns, in-betweens, and clean vector line art.'
      },
      {
        title: 'Group Task: Mini Digital Studio Production & Cost Proposal',
        type: 'Group',
        description: 'Produce a polished digital animation with audio sync and submit an itemized client budget quotation.'
      }
    ]
  },

  'ict-vgd': {
    id: 'ict-vgd',
    title: 'Visual Graphic Design',
    sector: 'ICT',
    cluster: 'Creative Arts and Design Technology',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'The learners demonstrate understanding of fundamental principles and trends of visual graphic design needed in creating logo designs and print media design using appropriate software, tools, and materials based on industry standards.',
      'The learners demonstrate understanding of user experience designs (UX) and user interface design (UI) using appropriate software, tools, and materials based on industry standards.',
      'The learners demonstrate understanding of the principles in product packaging design using appropriate software, tools, and materials based on industry standards.'
    ],
    performanceStandards: [
      'The learners create logo designs and print media design using appropriate software, tools, and materials based on industry standards.',
      'The learners create user experience (UX) design and user interface design (UI) using appropriate software, tools, and materials based on industry standards.',
      'The learners create product packaging with design using appropriate software, tools, and materials, with the design pricing / costing guide based on industry standards.',
      'The learners create 2D and 3D booth and product window/display designs and mock-up for presentations using appropriate software, tools, materials, and compute design cost.'
    ],
    weeks: [
      {
        week: 'Weeks 1–3',
        learningCompetencies: [
          'Discuss the fundamental principles of visual graphic design.',
          'Discuss trends in visual graphic designing.',
          'Discuss the fundamental principles of creating logo designs.',
          'Create logo designs.',
          'Discuss the fundamental principles of print media design.',
          'Create print media designs.'
        ],
        suggestedActivities: [
          {
            title: 'Design Impact Challenge & Creative Agency Simulation',
            description: 'Apply design principles, color theory, typography, and copyright laws to create brand visual identities.',
            prompt: 'In groups, develop a client-based visual campaign from brief to vector logo and export in standard formats.'
          },
          {
            title: 'Print Media Power Project & Pre-Press Production',
            description: 'Design brochures, posters, business cards with bleed, trim marks, CMYK separation, and print resolution (300 DPI).',
            prompt: 'Produce a complete print-ready branding collateral package with font licensing compliance.'
          }
        ]
      },
      {
        week: 'Weeks 4–5',
        learningCompetencies: [
          'Discuss the fundamental principles of user experience (UX) design.',
          'Create User Experience (UX) design.',
          'Discuss the fundamental principles of User Interface (UI) design.'
        ],
        suggestedActivities: [
          {
            title: 'UX Explorer & Wireflow Adventure',
            description: 'Conduct user research, develop personas, create information architecture, and map user flows.',
            prompt: 'Produce digital wireframes and interactive user journeys addressing accessibility and usability standards.'
          },
          {
            title: 'Next-Gen UI Design Challenge',
            description: 'Design web, mobile, and dashboard interfaces adhering to UI design systems, color tokens, and responsive grids.',
            prompt: 'Create UI components (navigation, inputs, buttons, cards) with dark/light mode variations.'
          }
        ]
      },
      {
        week: 'Week 6',
        learningCompetencies: [
          'Create User Interface (UI) designs.'
        ],
        suggestedActivities: [
          {
            title: 'Interactive UI Studio Challenge & Usability Testing',
            description: 'Build interactive prototypes with micro-interactions, hover states, and test with users for task efficiency.',
            prompt: 'Finalize a high-fidelity digital UI prototype and document usability testing results.'
          }
        ]
      },
      {
        week: 'Weeks 7–8',
        learningCompetencies: [
          'Discuss the fundamental principles of product packaging design.',
          'Create product packaging design.'
        ],
        suggestedActivities: [
          {
            title: 'Pack It to Sell Challenge & Sketch-to-Shelf Project',
            description: 'Design product packaging including dielines, folding flaps, bleed, mandatory food/safety labeling, and barcode placement.',
            prompt: 'Create vector dieline in software, print, cut, and assemble a physical 3D packaging prototype.'
          }
        ]
      },
      {
        week: 'Weeks 9–11',
        learningCompetencies: [
          'Discuss the fundamental principles of booths and product window/ display design.',
          'Create 2D booth and product window/ display designs.',
          'Create 3D booth and product window/ display designs and mock-ups.',
          'Compute for design costs in visual graphics design.'
        ],
        suggestedActivities: [
          {
            title: 'Blueprint to Booth & 3D Booth Builder Challenge',
            description: 'Draft 2D orthographic layouts and construct rendered 3D digital models for exhibition booths and retail window displays.',
            prompt: 'Create a 3D booth model with lighting, textures, signage, and build a physical scaled architectural model.'
          },
          {
            title: 'Price It Right: Creative Agency Costing & Pitch',
            description: 'Compute design service costs using union minimum rate sheets, value-based pricing, and prepare client proposals.',
            prompt: 'Present a comprehensive agency design proposal with itemized design fees and print production budget.'
          }
        ]
      }
    ],
    suggestedPerformanceTasks: [
      {
        title: 'Individual Task: Graphic Design Prodigy: Concept to Creation',
        type: 'Individual',
        description: 'Create an original logo and print media collateral set adhering to branding principles and file management rules.'
      },
      {
        title: 'Individual Task: UX-UI Mastery: From Concept to Click',
        type: 'Individual',
        description: 'Conduct user research, map wireflows, and design a responsive digital app UI prototype with usability test report.'
      },
      {
        title: 'Individual Task: From Concept to Carton: Packaging Pro Challenge',
        type: 'Individual',
        description: 'Develop full packaging design from concept sketch to dieline vector art and assemble a finished physical prototype.'
      },
      {
        title: 'Group Task: Design & Build Expo Challenge: Full-Service Booth & Costing',
        type: 'Group',
        description: 'Collaboratively design 2D plans, rendered 3D models, physical mockups, and prepare an itemized commercial cost proposal.'
      }
    ]
  },

  'fcs-culinary': {
    id: 'fcs-culinary',
    title: 'Kitchen Operation',
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Hospitality and Tourism',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'The learners demonstrate an understanding of the fundamentals of culinary arts.',
      'The learners demonstrate an understanding of preparing, presenting and storing stocks, soup and sauces.',
      'The learners demonstrate an understanding of preparing, presenting and storing sandwiches, salads, dressings, egg, cereal, starch, vegetable, seafood, poultry, meat dishes, and desserts.',
      'The learners demonstrate an understanding of entrepreneurship in the food industry.'
    ],
    performanceStandards: [
      'The learners demonstrate fundamental skills in culinary arts.',
      'The learners prepare a variety of stocks, soup and sauces, appetizers, salads, dressings, egg/cereal/starch, vegetable, seafood, poultry, meat dishes, and desserts.',
      'The learners collaborate to organize and manage a kitchenpreneur bazaar.'
    ],
    weeks: [
      {
        week: 'Week 1',
        learningCompetencies: [
          'Discuss the fundamentals of culinary arts.',
          'Perform knife skills.'
        ],
        suggestedActivities: [
          {
            title: 'Culinary Foundations & Precision Knife Cuts',
            description: 'Master kitchen brigade hierarchy, sanitation, mise en place, and 5 classical knife cuts: julienne, brunoise, dice, chiffonade, batonnet.',
            prompt: 'Demonstrate knife sharpening, claw grip, and execute uniform vegetable cuts evaluated for dimensions.'
          }
        ]
      },
      {
        week: 'Week 2',
        learningCompetencies: [
          'Perform conversion and food costing of provided recipe.',
          'Discuss presenting, packaging, labeling and storing of food products.'
        ],
        suggestedActivities: [
          {
            title: 'Recipe Conversion, Costing & Food Presentation',
            description: 'Scale standard recipes for 8 to 50 pax, calculate food cost percentage, and design food safety labels.',
            prompt: 'Calculate portion cost, mark-up, selling price, and analyze food plating principles (color, balance, height).'
          }
        ]
      },
      {
        week: 'Weeks 3–4',
        learningCompetencies: [
          'Prepare a variety of stocks, soups, and sauces.'
        ],
        suggestedActivities: [
          {
            title: 'Classical Stocks, Mother Sauces & Soups',
            description: 'Simmer white/brown/vegetable stocks, prepare French mother sauces (Béchamel, Velouté, Espagnole, Tomato, Hollandaise), and clear/thick soups.',
            prompt: 'Prepare, skim, strain stocks, and evaluate sauce consistency (nappe) and flavor depth.'
          }
        ]
      },
      {
        week: 'Week 5',
        learningCompetencies: [
          'Prepare a variety of soup and appetizers.'
        ],
        suggestedActivities: [
          {
            title: 'Hot & Cold Appetizers Assembly',
            description: 'Prepare canapés, hors d\'oeuvres, and specialty hot appetizers with harmonious dip pairings.',
            prompt: 'Assemble a themed appetizer platter observing hygiene, temperature control, and presentation aesthetics.'
          }
        ]
      },
      {
        week: 'Week 6',
        learningCompetencies: [
          'Prepare a variety of sandwiches.'
        ],
        suggestedActivities: [
          {
            title: 'Sandwich Crafting & Signature Spreads',
            description: 'Prepare hot and cold sandwiches with proper layering, moisture barriers, and crust/spread balance.',
            prompt: 'Design and execute a signature sandwich with standardized costing card.'
          }
        ]
      },
      {
        week: 'Week 7',
        learningCompetencies: [
          'Prepare a variety of salads.'
        ],
        suggestedActivities: [
          {
            title: 'Salad Preparation & Emulsified Dressings',
            description: 'Toss green, composed, bound, and grain salads with homemade vinaigrettes and emulsified mayonnaise dressings.',
            prompt: 'Present plated composed salads demonstrating crispness, balance, and dressing ratio.'
          }
        ]
      },
      {
        week: 'Weeks 8–9',
        learningCompetencies: [
          'Prepare various types of egg, cereal, and starch dishes.',
          'Prepare a variety of vegetable dishes following appropriate cooking methods.'
        ],
        suggestedActivities: [
          {
            title: 'Egg & Starch Cookery Practicum',
            description: 'Execute poached, scrambled, and omelette eggs; cook rice, pasta al dente, and cereal starches.',
            prompt: 'Demonstrate heat control for tender egg coagulation and starch gelatinization.'
          },
          {
            title: 'Vegetable Cookery Methods',
            description: 'Cook seasonal vegetables via blanching, steaming, sautéing, and roasting maintaining vibrant color and crisp-tender texture.',
            prompt: 'Evaluate retention of nutrients, color chlorophyll/carotenoid preservation, and doneness.'
          }
        ]
      },
      {
        week: 'Week 10',
        learningCompetencies: [
          'Prepare variety of seafood dishes.',
          'Prepare various poultry and game dishes.',
          'Prepare variety of meat dishes.',
          'Prepare a variety of desserts.'
        ],
        suggestedActivities: [
          {
            title: 'Proteins & Pastry Cookery Showcase',
            description: 'Scale fish, debone chicken, cook meat via dry/moist methods, and prepare cold/hot desserts (custard, fruit tarts).',
            prompt: 'Ensure proper internal cooking temperatures (HACCP) and assemble complete balanced entrees.'
          }
        ]
      },
      {
        week: 'Week 11',
        learningCompetencies: [
          'Organize and manage a kitchen entrepreneur food bazaar.'
        ],
        suggestedActivities: [
          {
            title: 'Kitchenpreneur Food Bazaar Operations',
            description: 'Plan menu, source ingredients, setup sanitary food booth, manage sales transactions, and analyze profit/loss.',
            prompt: 'Collaboratively operate a live food station simulating commercial catering operations.'
          }
        ]
      }
    ],
    suggestedPerformanceTasks: [
      {
        title: 'Individual Task: Culinary Skills & Knife Handling Demonstration',
        type: 'Individual',
        description: 'Execute mise en place, kitchen sanitizing procedures, and demonstrate 5 classic vegetable cuts within time limit.'
      },
      {
        title: 'Individual Task: Stock, Mother Sauce & Entree Preparation',
        type: 'Individual',
        description: 'Prepare a stock, derivative sauce, and balanced protein/vegetable main course observing HACCP standards.'
      },
      {
        title: 'Group Task: Kitchen Workflow & Banquet Service Simulation',
        type: 'Group',
        description: 'Organize kitchen brigade stations (hot line, garde manger, pastry) to serve a 3-course menu for guests.'
      },
      {
        title: 'Group Task: Kitchenpreneur Food Booth Operation & Financial Audit',
        type: 'Group',
        description: 'Plan, finance, cook, and operate a live commercial food bazaar booth, concluding with an audited income statement.'
      }
    ]
  }
};

export interface EPPGrade4BOWWeek {
  term: 1 | 2 | 3;
  weeks: string;
  learningCompetencies: string[];
}

export interface EPPGrade4BOW {
  learningArea: 'Edukasyong Pantahanan at Pangkabuhayan (EPP) - ICT';
  gradeLevel: 'Grade 4';
  schoolYear: '2026–2027';
  terms: {
    term: 1 | 2 | 3;
    termTitle: string;
    contentStandard: string;
    performanceStandard: string;
    weeks: EPPGrade4BOWWeek[];
    suggestedActivities: string[];
  }[];
}

export const EPP_GRADE4_ICT_BOW: EPPGrade4BOW = {
  learningArea: 'Edukasyong Pantahanan at Pangkabuhayan (EPP) - ICT',
  gradeLevel: 'Grade 4',
  schoolYear: '2026–2027',
  terms: [
    {
      term: 1,
      termTitle: 'First Term',
      contentStandard: 'Naipamamalas ang pag-unawa sa kahalagahan, bahagi, at basic operation ng computer; at sa digital health and wellness at online security and safety.',
      performanceStandard: 'Ang mga mag-aaral ay nakagagawa ng iba’t ibang dokumento gamit ang computing devices at productivity tools.',
      weeks: [
        {
          term: 1,
          weeks: 'Weeks 1–2',
          learningCompetencies: ['Naipaliliwanag ang kahalagahan ng computer at iba pang computing device.']
        },
        {
          term: 1,
          weeks: 'Weeks 3–4',
          learningCompetencies: ['Natatalakay ang mga bahagi at gamit ng computer at peripherals nito.']
        },
        {
          term: 1,
          weeks: 'Weeks 5–6',
          learningCompetencies: ['Natatalakay ang basic computer operations.']
        },
        {
          term: 1,
          weeks: 'Weeks 7–8',
          learningCompetencies: ['Natatalakay ang wastong posisyon, layo, at oras sa paggamit ng computer at iba pang computing devices.']
        },
        {
          term: 1,
          weeks: 'Weeks 9–10',
          learningCompetencies: ['Naipaliliwanag ang mga panuntunang pangkaligtasan sa paggamit ng Internet.']
        }
      ],
      suggestedActivities: [
        'My First Digital Project: Gagawa ang mga mag-aaral ng isang simpleng dokumento gamit ang computer o iba pang computing device at productivity tools na nagpapakita ng kaalaman sa computer, bahagi at gamit ng peripherals, basic operations, tamang posisyon at oras sa paggamit, at mga panuntunang pangkaligtasan sa Internet.'
      ]
    },
    {
      term: 2,
      termTitle: 'Second Term',
      contentStandard: 'Naipamamalas ang pag-unawa sa paggamit ng productivity software.',
      performanceStandard: 'Ang mga mag-aaral ay nakagagawa ng iba’t ibang dokumento gamit ang computing devices at productivity tools.',
      weeks: [
        {
          term: 2,
          weeks: 'Weeks 1–3',
          learningCompetencies: ['Nakagagawa ng word document.']
        },
        {
          term: 2,
          weeks: 'Weeks 4–6',
          learningCompetencies: ['Nakagagawa ng presentation document.']
        },
        {
          term: 2,
          weeks: 'Weeks 7–10',
          learningCompetencies: ['Nakagagawa ng desktop publishing document.']
        }
      ],
      suggestedActivities: [
        'Digital Document Creation Challenge: Gagawa ng tatlong uri ng digital documents gamit ang computing devices at productivity tools: 1. Word document, 2. Presentation document, 3. Desktop publishing document.'
      ]
    },
    {
      term: 3,
      termTitle: 'Third Term',
      contentStandard: 'Naipamamalas ang pag-unawa sa paggamit ng productivity software.',
      performanceStandard: 'Ang mga mag-aaral ay nakagagawa ng algorithm at basic process flow chart bilang bahagi ng block coding.',
      weeks: [
        {
          term: 3,
          weeks: 'Weeks 1–4',
          learningCompetencies: ['Nakagagawa ng spreadsheet document.']
        },
        {
          term: 3,
          weeks: 'Weeks 5–7',
          learningCompetencies: ['Nakagagawa ng algorithm para sa mga gawaing pang-araw-araw.']
        }
      ],
      suggestedActivities: [
        'My Personal Budget Spreadsheet: Gagawa ang mga mag-aaral ng digital spreadsheet document gamit ang spreadsheet software (hal. Microsoft Excel, Google Sheets) upang ipakita ang kanilang kasanayan sa paglikha, pag-format, at pag-compute gamit ang formulas.',
        'Algorithm and Flowchart for Daily Tasks: Gagawa ang mga mag-aaral ng algorithm at process flowchart para sa isang pang-araw-araw na gawain upang maipakita ang tamang hakbang-hakbang na proseso at organisadong paglalahad ng impormasyon.'
      ]
    }
  ]
};
