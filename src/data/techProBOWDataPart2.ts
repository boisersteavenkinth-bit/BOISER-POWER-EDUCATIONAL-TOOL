import { TechProBOWElective } from './techProBOWData';

export const TECHPRO_BOW_ADDITIONAL: Record<string, TechProBOWElective> = {
  'ia-construction': {
    id: 'ia-construction',
    title: 'Construction Operation',
    sector: 'Industrial Arts (IA)',
    cluster: 'Construction and Building Technology',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'Demonstrate an understanding of concepts and principles in masonry.',
      'Demonstrate an understanding of concepts and principles in performing masonry works.',
      'Demonstrate an understanding of concepts and principles in performing plumbing works.',
      'Demonstrate an understanding of concepts and principles in basic construction management.'
    ],
    performanceStandards: [
      'The learners perform masonry works based on industry and safety standards.',
      'The learners perform plumbing works based on industry and safety standards.',
      'The learners perform project cost and estimates for basic construction services.'
    ],
    weeks: [
      {
        week: 'Week 1',
        learningCompetencies: [
          'Discuss overview in masonry.',
          'Discuss masonry materials, tools and equipment.',
          'Perform procedure in site preparations.'
        ],
        suggestedActivities: [
          {
            title: 'Masonry 360°: Exploring Foundations of the Trade',
            description: 'Explore definition, scope of work, materials, tools, safety practices, and career opportunities in masonry.',
            prompt: 'Identify tools (trowel, level, plumb bob) and materials (cement, sand, CHB, gravel) with proper handling.'
          },
          {
            title: 'Site Ready Simulation & Batter Board Layout',
            description: 'Practice site clearing, checking levels, setting up batter boards, and marking layout lines.',
            prompt: 'Perform measuring, marking, and leveling procedures following step-by-step site preparation standards.'
          }
        ]
      },
      {
        week: 'Week 2',
        learningCompetencies: [
          'Perform procedure in excavation for foundation works.'
        ],
        suggestedActivities: [
          {
            title: 'Foundation Dig Simulation: Excavation in Action',
            description: 'Execute site marking, measuring dimensions, observing proper depth/width, and verifying slope safety.',
            prompt: 'Measure, mark, and excavate a designated practice area following correct dimensions and safety standards.'
          }
        ]
      },
      {
        week: 'Week 3',
        learningCompetencies: [
          'Perform procedures in formworks preparation.',
          'Perform procedures in re-bars preparation.'
        ],
        suggestedActivities: [
          {
            title: 'Formworks Assembly Workshop & Rebar Bending',
            description: 'Prepare wooden formworks for footing/column and measure, cut, and bend rebars using rebar cutter/bender.',
            prompt: 'Assemble wooden form panels with braces and tie rebar cages with tie wire using proper spacing.'
          }
        ]
      },
      {
        week: 'Week 4',
        learningCompetencies: [
          'Perform procedures in scaffoldings preparation.',
          'Perform procedures in preparing concrete for pouring.'
        ],
        suggestedActivities: [
          {
            title: 'Scaffold Assembly Simulation & Safety Drill',
            description: 'Assemble tubular/frame scaffoldings, install base jacks, cross-braces, catwalk platforms, and guardrails.',
            prompt: 'Inspect scaffold stability, leveling, and fall protection gear prior to simulated use.'
          },
          {
            title: 'Concrete Mixing Practicum: Proportioning to Proper Consistency',
            description: 'Batch cement, sand, gravel, and water according to standard class mix ratios (Class A 1:2:4).',
            prompt: 'Demonstrate manual and mechanical concrete mixing, slump test evaluation, and placement readiness.'
          }
        ]
      },
      {
        week: 'Week 5',
        learningCompetencies: [
          'Perform procedures in backfilling and compaction.'
        ],
        suggestedActivities: [
          {
            title: 'Backfill Basics & Compaction Drill',
            description: 'Evenly layer backfill material around foundations and compact using manual tampers or plate compactors.',
            prompt: 'Consolidate soil layers in 15cm lifts to achieve uniform density and prevent ground settlement.'
          }
        ]
      },
      {
        week: 'Week 6',
        learningCompetencies: [
          'Perform procedures in laying block/ bricks.'
        ],
        suggestedActivities: [
          {
            title: 'Bricklaying & CHB Wall Construction Drill',
            description: 'Lay concrete hollow blocks (CHB), apply mortar beds, install horizontal/vertical rebar dowels, and check plumb line.',
            prompt: 'Construct a 1-meter high CHB wall section verifying horizontal leveling and joint uniformity.'
          }
        ]
      },
      {
        week: 'Week 7',
        learningCompetencies: [
          'Perform procedures in plastering concrete surfaces.'
        ],
        suggestedActivities: [
          {
            title: 'Surface Preparation & Precision Plastering',
            description: 'Clean and wet wall surface, apply scratch coat, level with brown coat, and smooth with wooden float.',
            prompt: 'Apply plaster mix achieving even 16mm thickness, smooth texture, and inspect curing moisture.'
          }
        ]
      },
      {
        week: 'Week 8',
        learningCompetencies: [
          'Perform pre-cast balusters and handrails installation.',
          'Prepare common plumbing materials, tools and equipment for installation.'
        ],
        suggestedActivities: [
          {
            title: 'Pre-Cast Baluster & Railing Alignment Task',
            description: 'Position, space, level, and anchor pre-cast decorative balusters and concrete handrails.',
            prompt: 'Ensure uniform spacing, structural stability, and grout joints neatly.'
          },
          {
            title: 'Plumbing Materials & Tools Familiarization',
            description: 'Identify PVC, PPR, GI pipes, fittings (elbow, tee, union), pipe cutters, wrenches, and thread seal tape.',
            prompt: 'Classify plumbing materials and demonstrate proper handling of cutting and threading tools.'
          }
        ]
      },
      {
        week: 'Weeks 9–10',
        learningCompetencies: [
          'Perform plumbing installation based on lay-out plan.',
          'Perform piping joints and connections based on job specifications.'
        ],
        suggestedActivities: [
          {
            title: 'Pipe Routing, Solvent Welding & Threading Workshop',
            description: 'Cut, ream, and connect PVC/PPR pipes following schematic layout for water supply and DWV drainage lines.',
            prompt: 'Assemble solvent-cemented PVC joints and heat-fused PPR fittings, then conduct water leak pressure test.'
          }
        ]
      },
      {
        week: 'Week 11',
        learningCompetencies: [
          'Perform basic project cost and estimates for construction services.',
          'Simulate basic cost and estimates for basic construction projects.'
        ],
        suggestedActivities: [
          {
            title: 'Construction Cost Estimation & Budget Role-Play Drill',
            description: 'Calculate quantities of cement, sand, gravel, CHB, rebars, and compute direct labor and equipment overhead.',
            prompt: 'Prepare an itemized Bill of Quantities (BOQ) and cost proposal for a small construction project.'
          }
        ]
      }
    ],
    suggestedPerformanceTasks: [
      {
        title: 'Individual Task: Wall Section Construction',
        type: 'Individual',
        description: 'Independently mix mortar, lay CHB blocks with reinforcing steel, check level/plumb, and strike joints.'
      },
      {
        title: 'Group Task: Team Masonry & Concrete Structure Project',
        type: 'Group',
        description: 'Collaboratively excavate, build formworks, tie rebars, pour concrete footing, and lay boundary wall.'
      },
      {
        title: 'Individual Task: Plumbing Fixture & Piping Installation',
        type: 'Individual',
        description: 'Install a residential plumbing fixture (faucet, sink, or toilet) with proper supply and trap connections, ensuring leak-free performance.'
      },
      {
        title: 'Group Task: Collaborative Construction Budget & Project Proposal',
        type: 'Group',
        description: 'Analyze structural plans to calculate material quantities, labor costs, equipment expenses, and present a complete project budget.'
      }
    ]
  },

  'ia-eim': {
    id: 'ia-eim',
    title: 'Electrical Installation and Maintenance (EIM)',
    sector: 'Industrial Arts (IA)',
    cluster: 'Industrial Technologies',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'The learners demonstrate an understanding of roughing-in activities for residential/building wiring systems.',
      'Demonstrate an understanding of the installation and termination of wiring fixtures, as well as the use of protective devices in residential/building wiring systems.',
      'Demonstrate an understanding of the concepts and principles of Fire Detection and Alarm Systems (FDAS).',
      'The learners demonstrate an understanding of the concepts and principles of Closed-Circuit Television (CCTV).'
    ],
    performanceStandards: [
      'The learners perform roughing-in activities for residential/building in accordance with PEC standard.',
      'The learners perform installation and termination of wiring fixtures, as well as the use of protective devices in residential/building wiring systems according to PEC standard.',
      'The learners perform installation of Fire Detection and Alarm Systems (FDAS) according to PEC standard.',
      'The learners perform installation of Closed-Circuit Television (CCTV) according to PEC standard.'
    ],
    weeks: [
      {
        week: 'Week 1',
        learningCompetencies: [
          'Explain the overview of Electrical System Installation.',
          'Discuss the electrical plans, tools and requirements for roughing-in, wiring and cabling works.'
        ],
        suggestedActivities: [
          {
            title: 'Electrical System Walkthrough & Blueprint Analysis',
            description: 'Interpret electrical plans, service entrance location, branch circuits, panelboard, and Philippine Electrical Code (PEC) rules.',
            prompt: 'Identify circuit layouts, wire gauges (THHN/THWN), conduit sizes, and list tools required for roughing-in.'
          }
        ]
      },
      {
        week: 'Weeks 2–4',
        learningCompetencies: [
          'Perform procedures in installing electrical non-metallic and metallic conduits.',
          'Perform procedures in electrical cable pulling.'
        ],
        suggestedActivities: [
          {
            title: 'Conduit Bending (EMT / PVC) & Roughing-In Drill',
            description: 'Measure and bend 90° stub-ups, back-to-back bends, and offsets using hand conduit benders according to PEC spacing.',
            prompt: 'Secure conduits to junction and utility boxes using locknuts, bushings, and clamps with proper strapping.'
          },
          {
            title: 'Cable Pulling & Wire Tension Simulation',
            description: 'Use fish tape to pull copper conductors through conduits without insulation scuffing, observing color coding (black/red live, white neutral, green ground).',
            prompt: 'Leave required 6-inch conductor leads inside boxes for termination.'
          }
        ]
      },
      {
        week: 'Weeks 5–6',
        learningCompetencies: [
          'Report completion of work.',
          'Discuss the protective devices for single-phase distribution.',
          'Perform procedures in installing electrical protective devices.',
          'Discuss the wiring devices for floor and wall mount orientation.'
        ],
        suggestedActivities: [
          {
            title: 'Circuit Breaker (MCB) & Panelboard Installation Drill',
            description: 'Mount miniature circuit breakers (MCBs) and residual current devices (RCD/GFCI) in a single-phase distribution panel.',
            prompt: 'Terminate hot, neutral, and equipment grounding conductors with specified torque and verify polarity.'
          }
        ]
      },
      {
        week: 'Week 7',
        learningCompetencies: [
          'Perform procedures in installing wiring devices for floor and wall mount orientation.'
        ],
        suggestedActivities: [
          {
            title: 'Wiring Devices Installation: Switches & Convenience Outlets',
            description: 'Install single-pole switches, 3-way switches, and duplex convenience receptacles adhering to PEC mounting heights.',
            prompt: 'Properly strip conductors, tighten screw terminals, and test for voltage and ground continuity.'
          }
        ]
      },
      {
        week: 'Weeks 8–9',
        learningCompetencies: [
          'Report completion of work.',
          'Discuss the devices and wiring diagrams for FDAS.',
          'Perform installation procedures for FDAS.'
        ],
        suggestedActivities: [
          {
            title: 'Conventional FDAS Detection & Alarm Installation',
            description: 'Mount ionization/photoelectric smoke detectors, thermal heat sensors, manual pull stations, and alarm bells.',
            prompt: 'Wire class B initiating and notification appliance circuits with end-of-line resistors (EOLR) to the control panel.'
          }
        ]
      },
      {
        week: 'Weeks 10–11',
        learningCompetencies: [
          'Report completion of work.',
          'Discuss the devices and wiring diagrams for CCTV.',
          'Perform installation procedures for CCTV.',
          'Report completion of work.'
        ],
        suggestedActivities: [
          {
            title: 'CCTV Camera Mounting, Cabling & DVR/NVR Commissioning',
            description: 'Install indoor dome and outdoor bullet cameras, terminate BNC/RJ45 connectors, connect power distribution, and configure DVR recording.',
            prompt: 'Adjust field of view, test infrared night vision, verify live monitor streaming, and document commissioning checklist.'
          }
        ]
      }
    ],
    suggestedPerformanceTasks: [
      {
        title: 'Individual Task: Bedroom Lighting & Convenience Outlet Roughing-In',
        type: 'Individual',
        description: 'Independently install EMT/PVC conduits, utility boxes, and pull conductors for a bedroom branch circuit adhering to PEC standards.'
      },
      {
        title: 'Group Task: Residential Living Area Roughing-In & 3-Way Switching Project',
        type: 'Group',
        description: 'Collaboratively calculate circuit loads and install complete roughing-in with multi-point lighting and outlet loops.'
      },
      {
        title: 'Individual Task: Installation of a Basic Conventional Smoke Detector Circuit',
        type: 'Individual',
        description: 'Terminate a smoke detector, manual pull station, and notification buzzer to an FDAS trainer and perform functional trip test.'
      },
      {
        title: 'Group Task: Multi-Camera CCTV System Installation & Network Surveillance Project',
        type: 'Group',
        description: 'Plan and deploy a multi-camera surveillance setup with cabling, power supply distribution, and DVR/NVR configuration.'
      }
    ]
  },

  'ia-carpentry': {
    id: 'ia-carpentry',
    title: 'Carpentry',
    sector: 'Industrial Arts (IA)',
    cluster: 'Construction and Building Technology',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'Demonstrate an understanding of the concepts and principles in structural carpentry.',
      'Understand procedures in formworks preparations in rough carpentry.',
      'Demonstrate an understanding of concepts in carpentry.',
      'Understand the concepts and principles in structural carpentry.'
    ],
    performanceStandards: [
      'The learners perform a batter board set up in structural carpentry with safety practices.',
      'The learners perform procedures in wooden foundation and column formworks with safety.',
      'The learners perform procedures for installation of framing works (wall, floor, window and jambs) with safety practices.',
      'The learners perform construction process for roof, ceiling, and build – in cabinet in structural carpentry with safety practices.'
    ],
    weeks: [
      {
        week: 'Week 1',
        learningCompetencies: [
          'Identify principles structural carpentry.',
          'Prepare tools, equipment, consumables and PPEs used in structural carpentry.'
        ],
        suggestedActivities: [
          {
            title: 'Load Path Investigation & Framing Layout Workshop',
            description: 'Analyze structural load paths from roof truss down to wall studs and foundation; inspect circular saws, framing squares, and hammers.',
            prompt: 'Mark out framing members on lumber following standard 16" on-center (O.C.) spacing.'
          }
        ]
      },
      {
        week: 'Week 2',
        learningCompetencies: [
          'Discuss specifications and tolerance in structural carpentry.',
          'Discuss the purpose structural carpentry temporary structures.'
        ],
        suggestedActivities: [
          {
            title: 'Blueprint Specification Breakdown & Tolerance Testing',
            description: 'Examine architectural framing plans to interpret dimension tolerances and design temporary shoring and scaffolding.',
            prompt: 'Perform measurements on cut lumber and compute allowable dimensional deviations.'
          }
        ]
      },
      {
        week: 'Week 3',
        learningCompetencies: [
          'Perform basic 4-corner batter board set up.',
          'Discuss importance and applications of formworks.'
        ],
        suggestedActivities: [
          {
            title: '4-Corner Batter Board Layout Simulation Activity',
            description: 'Stake out building footprint, set batter boards, stretch nylon lines, and check squareness using the 3-4-5 triangulation method.',
            prompt: 'Verify level with water hose level and confirm equal diagonal measurements across all four corners.'
          }
        ]
      },
      {
        week: 'Weeks 4–6',
        learningCompetencies: [
          'Prepare tools, materials and equipment in wooden formwork.',
          'Perform working drawing plan for wooden form.',
          'Prepare wooden foundation and column form for fabrication.',
          'Apply wooden foundation and column form process.',
          'Strip / disassembly wooden foundation and column form.'
        ],
        suggestedActivities: [
          {
            title: 'Column & Footing Wooden Formwork Fabrication & Stripping',
            description: 'Cut marine plywood and 2x2 lumber stiffeners, assemble column boxes, erect with diagonal kickers/braces, and practice safe stripping.',
            prompt: 'Check column plumbness with plumb bob, secure form clamps, and disassemble panels systematically for material preservation.'
          }
        ]
      },
      {
        week: 'Weeks 7–8',
        learningCompetencies: [
          'Perform operations for walling works.',
          'Apply flooring installation procedures.',
          'Perform doors, windows, and trim installation.'
        ],
        suggestedActivities: [
          {
            title: 'Timber Wall Framing, Flooring & Door Jamb Installation',
            description: 'Assemble top plate, sole plate, studs, and headers; install tongue-and-groove flooring and square door jambs.',
            prompt: 'Fasten structural wall framing with 3-inch common nails and install window frames verifying squareness.'
          }
        ]
      },
      {
        week: 'Weeks 9–11',
        learningCompetencies: [
          'Perform operations for roofing works.',
          'Perform process in ceiling works.',
          'Perform build – in cabinet fabrication.'
        ],
        suggestedActivities: [
          {
            title: 'Roof Truss Assembly & Sheathing Workshop',
            description: 'Fabricate King-post wooden trusses with gusset plates, hoist into position, install purlins, and apply roofing sheets.',
            prompt: 'Verify truss plumb line, install hurricane ties, and fasten corrugated roofing with rubber washers.'
          },
          {
            title: 'Suspended Ceiling Framing & Built-In Cabinet Fabrication',
            description: 'Level ceiling joists/runners, attach fiber cement ceiling boards, and construct a base kitchen cabinet with shelves and doors.',
            prompt: 'Cut cabinet panels accurately, join using pocket screws and wood glue, and mount concealed hinges.'
          }
        ]
      }
    ],
    suggestedPerformanceTasks: [
      {
        title: 'Individual Task: Batter Board Setup Challenge',
        type: 'Individual',
        description: 'Independently establish a 4-corner batter board layout for a small building, verifying squareness via 3-4-5 method.'
      },
      {
        title: 'Individual Task: Wooden Formwork Assembly & Bracing',
        type: 'Individual',
        description: 'Fabricate and brace a wooden column form to size, checking vertical plumbness and corner squareness.'
      },
      {
        title: 'Group Task: Wall & Window Jamb Framing Installation Project',
        type: 'Group',
        description: 'Collaboratively construct a timber wall frame section complete with window rough opening, cripples, and king/jack studs.'
      },
      {
        title: 'Individual Task: Built-In Cabinet Fabrication & Finishing',
        type: 'Individual',
        description: 'Construct a small modular base cabinet box with shelving, edge banding, and operable cabinet doors.'
      }
    ]
  },

  'ia-automotive': {
    id: 'ia-automotive',
    title: 'Driving and Automotive Servicing',
    sector: 'Industrial Arts (IA)',
    cluster: 'Automotive and Small Engine Technologies',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'Demonstrate an understanding of the concepts and principles of driving a light vehicle.',
      'Demonstrate an understanding of the concepts and principles of pre-delivery inspection (PDI) in automotive servicing.',
      'Demonstrate an understanding of the concepts and principles of periodic maintenance services (PMS) for vehicle component parts (engine) in automotive servicing.',
      'Demonstrate an understanding of the concepts of automotive periodic maintenance services (PMS) for the vehicle\'s component parts (drive train, brake system, suspension system, and steering system).'
    ],
    performanceStandards: [
      'The learners perform procedures for moving and positioning vehicles, operating vehicle lifting and support equipment, and driving light vehicles, employing appropriate safety precautions.',
      'The learners perform procedures of pre-delivery inspection in automotive servicing employing appropriate safety precautions.',
      'The learners perform procedures of periodic maintenance services (PMS) for vehicle component parts (engine) in automotive servicing, employing appropriate safety precautions.',
      'The learners perform automotive periodic maintenance services (PMS) for the vehicle component parts (drive train, brake system, suspension system, and steering system) by employing appropriate safety precautions and conduct vehicle release and service cost calculations.'
    ],
    weeks: [
      {
        week: 'Week 1',
        learningCompetencies: [
          'Discuss the overview of driving vehicles.',
          'Identify traffic laws/rules and regulations.'
        ],
        suggestedActivities: [
          {
            title: 'Know Your Vehicle & Traffic Law Discovery Chart',
            description: 'Explore dashboard indicators, primary driving controls (steering, pedals, shifter), and organize LTO/traffic safety regulations.',
            prompt: 'Explain functions of driver controls and analyze road emergency response for brake failure or tire blowouts.'
          }
        ]
      },
      {
        week: 'Week 2',
        learningCompetencies: [
          'Demonstrate the role of service personnel in moving and positioning light vehicles.'
        ],
        suggestedActivities: [
          {
            title: 'Workshop Vehicle Positioning & Spotter Simulation',
            description: 'Practice moving vehicles inside a workshop bay, standard hand signals between spotter and driver, and wheel chocking.',
            prompt: 'Safely position a vehicle over service bays and engage parking brake and safety blocks.'
          }
        ]
      },
      {
        week: 'Weeks 3–4',
        learningCompetencies: [
          'Identify the type of vehicle and the appropriate maintenance according to specifications and power source.',
          'Perform the procedures of operating vehicle lifting and support equipment in servicing vehicles.'
        ],
        suggestedActivities: [
          {
            title: 'Vehicle Lifting & Support Equipment Demonstration',
            description: 'Operate two-post hydraulic lifts, floor jacks, and position heavy-duty jack stands at designated chassis lifting points.',
            prompt: 'Verify vehicle balance, lock safety pawls on the lift, and perform shake test before crawling underneath.'
          }
        ]
      },
      {
        week: 'Week 5',
        learningCompetencies: [
          'Perform driving procedures for light vehicles.'
        ],
        suggestedActivities: [
          {
            title: 'Basic Driving Procedures Practical Drill & Controlled Course',
            description: 'Conduct BLOWBAGETS pre-ride check, start engine, execute smooth clutch/gear shifting, parallel parking, and hill starts.',
            prompt: 'Navigate a marked driving course demonstrating lane discipline, mirror checking, and defensive driving.'
          }
        ]
      },
      {
        week: 'Weeks 6–7',
        learningCompetencies: [
          'Discuss the pre-delivery inspection (PDI) in automotive servicing.',
          'Identify required items for pre-delivery inspection (PDI) service.',
          'Perform the pre-delivery inspection procedures.',
          'Discuss the periodic maintenance services (PMS) for vehicle component parts (engine).'
        ],
        suggestedActivities: [
          {
            title: 'Pre-Delivery Inspection (PDI) Walkthrough Simulation',
            description: 'Perform complete PDI checklist: engine fluids, battery state-of-health, tire pressure/torque, exterior lights, and seatbelts.',
            prompt: 'Document vehicle readiness checklist and simulate customer walkthrough before handover.'
          }
        ]
      },
      {
        week: 'Weeks 8–10',
        learningCompetencies: [
          'Explore career and business opportunities for periodic maintenance services.',
          'Discuss latest trends and advanced technology for PMS.',
          'Perform the procedure of periodic maintenance servicing for vehicle component parts (engine).',
          'Explain the operating principles of vehicle components parts.',
          'Discuss and identify required items for periodic maintenance services on drive train, brake system, suspension, and steering.'
        ],
        suggestedActivities: [
          {
            title: 'Hands-On Engine PMS Workshop (5,000 / 10,000 km)',
            description: 'Drain and refill motor oil, replace oil filter, inspect/gap spark plugs, clean air filter, and check drive belt tension.',
            prompt: 'Follow vehicle service manual torque specs and dispose of used engine oil environmentally.'
          },
          {
            title: 'Brake, Drivetrain & Suspension PMS Rotation',
            description: 'Measure brake pad thickness, bleed hydraulic brake lines, inspect CV joint boots, grease tie-rods, and inspect shock absorbers.',
            prompt: 'Record brake disc runout measurements using dial indicator and micrometer.'
          }
        ]
      },
      {
        week: 'Week 11',
        learningCompetencies: [
          'Discuss vehicle releasing procedures of the vehicle.',
          'Calculate service cost for PMS.'
        ],
        suggestedActivities: [
          {
            title: 'Customer Vehicle Release & PMS Cost Quotation',
            description: 'Itemize parts (filter, oil, fluids), labor hours, calculate shop supplies/tax, and explain maintenance invoice to customer.',
            prompt: 'Simulate vehicle release protocol, explaining performed maintenance and safety recommendations.'
          }
        ]
      }
    ],
    suggestedPerformanceTasks: [
      {
        title: 'Individual Task: Vehicle Lifting and Positioning Drill',
        type: 'Individual',
        description: 'Safely position a light vehicle on a hydraulic lift, raise to working height, engage safety locks, and position jack stands.'
      },
      {
        title: 'Individual Task: Pre-Delivery Inspection (PDI) Complete Audit',
        type: 'Individual',
        description: 'Conduct comprehensive multi-point PDI audit covering engine compartment, under-chassis, interior electronics, and road test.'
      },
      {
        title: 'Individual Task: Engine Periodic Maintenance Service (PMS)',
        type: 'Individual',
        description: 'Perform complete engine oil and filter change, spark plug inspection, coolant check, and air induction service.'
      },
      {
        title: 'Group Task: Comprehensive Vehicle PMS, Release & Cost Calculation',
        type: 'Group',
        description: 'Team executes full 20,000 km PMS (engine, brakes, suspension, drivetrain) and presents an audited customer cost breakdown.'
      }
    ]
  },

  'ict-css': {
    id: 'ict-css',
    title: 'Computer Systems Servicing (CSS)',
    sector: 'ICT',
    cluster: 'ICT Support and Computer Programming Technologies',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'The learners demonstrate an understanding of concepts and principles in setting up computer systems.',
      'The learners demonstrate an understanding of the principles of setting up a computer network.',
      'The learners demonstrate an understanding of principles in setting up computer servers.',
      'The learners demonstrate an understanding of the principles of troubleshooting, repairing and maintaining computer systems, network and servers.'
    ],
    performanceStandards: [
      'The learners perform setting up computer systems, adhering to occupational health and safety standards.',
      'The learners perform installation, configuration and testing of computer networks, adhering to occupational health and safety standards.',
      'The learners perform the setting up of a computer server.',
      'The learners perform the process of troubleshooting, repairing and maintaining computer systems, networks and servers.'
    ],
    weeks: [
      {
        week: 'Week 1',
        learningCompetencies: [
          'Discuss fundamental concepts of computer systems servicing.',
          'Discuss elements of computer systems.',
          'Perform disassembly and assembly of computer hardware.'
        ],
        suggestedActivities: [
          {
            title: 'PC Disassembly & Assembly Challenge',
            description: 'Observe ESD safety (wrist strap, mat), remove and reinstall motherboard, CPU, RAM, storage, and power supply unit (PSU).',
            prompt: 'Verify cable routing, thermal paste application, front panel headers, and confirm POST on initial power-up.'
          }
        ]
      },
      {
        week: 'Week 2',
        learningCompetencies: [
          'Create portable bootable device.',
          'Perform installation of system software and application software.'
        ],
        suggestedActivities: [
          {
            title: 'ISO Master & OS Deployment Showdown',
            description: 'Create UEFI bootable USB installers using Rufus/command line, configure BIOS settings, and partition drives with GPT.',
            prompt: 'Install Windows 11/Linux OS, install hardware chipsets and graphics drivers, and deploy required productivity software.'
          }
        ]
      },
      {
        week: 'Weeks 3–4',
        learningCompetencies: [
          'Perform computer testing and documentation.',
          'Discuss the concepts of computer network.',
          'Perform setting up of computer network.',
          'Perform network testing and documentation.'
        ],
        suggestedActivities: [
          {
            title: 'Ethernet Cable Crimping & Network Builder Challenge',
            description: 'Crimp Cat6 cables to T568B standard, test with cable tester, patch into switch, and configure IPv4 static and dynamic IPs.',
            prompt: 'Test connectivity using ping, tracert, ipconfig, and setup cross-folder sharing and printer sharing.'
          }
        ]
      },
      {
        week: 'Week 5',
        learningCompetencies: [
          'Discuss the concepts of server management.',
          'Perform server installation.'
        ],
        suggestedActivities: [
          {
            title: 'Windows Server Setup & Server Manager Configuration',
            description: 'Install Windows Server OS on physical/virtual hardware, configure computer name, static IP, and navigate Server Manager.',
            prompt: 'Document initial server baseline configuration and verify remote administrative access.'
          }
        ]
      },
      {
        week: 'Weeks 6–8',
        learningCompetencies: [
          'Perform installation of Active Directory Domain Services (ADDS).',
          'Perform installation of Domain Name System (DNS) services.',
          'Perform installation and configuration of Dynamic Host Configuration Protocol (DHCP) services.',
          'Perform installation and configuration of File and Storage Services.',
          'Perform installation and configuration of web servers Internet Information Services (IIS).'
        ],
        suggestedActivities: [
          {
            title: 'Domain Controller (ADDS), DNS & DHCP Deployment',
            description: 'Promote server to Domain Controller, configure forest root domain, build Organizational Units (OUs), users, and security groups.',
            prompt: 'Set up forward/reverse DNS lookup zones and configure DHCP scope with lease durations and exclusions.'
          },
          {
            title: 'File Server Resource Manager & IIS Web Hosting',
            description: 'Configure shared folders with NTFS permissions, user quotas, folder redirection, and host an intranet website on IIS.',
            prompt: 'Join client PCs to the domain and verify automated group policy and user drive mapping.'
          }
        ]
      },
      {
        week: 'Weeks 9–11',
        learningCompetencies: [
          'Perform installation of print and document services.',
          'Perform installation of remote desktop services.',
          'Perform troubleshooting and repairs of computer systems, networks, and servers.',
          'Perform maintenance of computer systems, networks, and servers.',
          'Prepare documentation and reporting on maintenance; develop a business plan proposal.'
        ],
        suggestedActivities: [
          {
            title: 'Hardware/Software Diagnostic Lab & Network Troubleshooting',
            description: 'Diagnose RAM/SSD failure, BSOD stop codes, malware removal, cable breaks, and server service recovery.',
            prompt: 'Document troubleshooting steps, root cause analysis, preventive maintenance schedules, and draft an IT service business proposal.'
          }
        ]
      }
    ],
    suggestedPerformanceTasks: [
      {
        title: 'Individual Task: Build, Boot & Benchmark (Solo System Builder)',
        type: 'Individual',
        description: 'Assemble a complete computer unit from components, prepare bootable media, install OS and drivers, and run stress tests.'
      },
      {
        title: 'Individual Task: Connect & Confirm (Solo Network Builder)',
        type: 'Individual',
        description: 'Crimp straight-through and crossover cables, interconnect PCs via switch, configure IP addressing, and verify file sharing.'
      },
      {
        title: 'Individual Task: Enterprise Server Build: The One-Admin Deployment',
        type: 'Individual',
        description: 'Install Windows Server, configure ADDS, DNS, DHCP, File Services, join client machines to domain, and document validation.'
      },
      {
        title: 'Group Task: TechCare Solutions: Full-Service IT Business Simulation',
        type: 'Group',
        description: 'Operate a mock IT service firm handling hardware repairs, network deployment, server administration, and client billing proposals.'
      }
    ]
  }
};
