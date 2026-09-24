import { TECHPRO_BOW_DATABASE, TechProBOWElective, EPP_GRADE4_ICT_BOW, EPPGrade4BOW } from './techProBOWData';
import { TECHPRO_BOW_ADDITIONAL } from './techProBOWDataPart2';
import { TECHPRO_BOW_PART3 } from './techProBOWDataPart3';

// Combine all TechPro Electives into one authoritative registry
export const ALL_TECHPRO_BOW_ELECTIVES: Record<string, TechProBOWElective> = {
  ...TECHPRO_BOW_DATABASE,
  ...TECHPRO_BOW_ADDITIONAL,
  ...TECHPRO_BOW_PART3,

  // Additional subjects from the DepEd April 28, 2026 BOW Issuance:
  'ia-motorcycle': {
    id: 'ia-motorcycle',
    title: 'Motorcycle and Small Engine Servicing',
    sector: 'Industrial Arts (IA)',
    cluster: 'Automotive and Small Engine Technologies',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'Demonstrate an understanding of principles in motorcycle driving.',
      'Demonstrate an understanding of the principles in motorcycles/small engine systems.',
      'Demonstrate an understanding of the principles in servicing electrical system and chassis in motorcycle/small engine repair.',
      'The learners demonstrate an understanding of the principles in overhauling and elements of costing for motorcycles/small engine services.'
    ],
    performanceStandards: [
      'The learners perform driving procedures in motorcycles employing safety precautions.',
      'The learners perform procedures in servicing of motorcycle/small engine systems following safety precautions.',
      'The learners perform procedures in electrical system servicing, and chassis servicing in motorcycle/small engine employing safety precautions.',
      'The learners perform procedures for overhauling motorcycle engines with safety precautions and compute servicing total costs.'
    ],
    weeks: [
      {
        week: 'Week 1',
        learningCompetencies: ['Discuss overview of motorcycle driving.', 'Perform procedures in maintaining and servicing motorcycle.'],
        suggestedActivities: [{ title: 'Motorcycle Driving Fundamentals Workshop', description: 'Explore parts and functions, basic controls, safety gear, and defensive driving.' }]
      },
      {
        week: 'Weeks 2–3',
        learningCompetencies: ['Apply procedures in pre-starting and warm-up of motorcycles.', 'Identify traffic rules and regulations.', 'Discuss appropriate responses to road emergencies.'],
        suggestedActivities: [{ title: 'Pre-Start Inspection Drill & Traffic Rules Recognition', description: 'Perform systematic pre-start inspection and emergency response simulations.' }]
      },
      {
        week: 'Week 4',
        learningCompetencies: ['Perform procedures in motorcycle driving.', 'Discuss overview of motorcycle/small engine services.'],
        suggestedActivities: [{ title: 'Controlled Riding Course Performance Task', description: 'Navigate a marked driving course demonstrating proper balance, turning, and braking.' }]
      },
      {
        week: 'Week 5',
        learningCompetencies: ['Discuss motorcycle/small engine services.', 'Discuss motorcycle/small engine system and common troubles procedures.'],
        suggestedActivities: [{ title: 'Engine Systems and Common Troubles Mapping', description: 'Diagnose hard starting, overheating, misfiring, and power loss.' }]
      },
      {
        week: 'Week 6',
        learningCompetencies: ['Perform procedures in servicing the motorcycle/small engine system.', 'Discuss concepts of electrical and chassis servicing.'],
        suggestedActivities: [{ title: 'Guided Small Engine Servicing Practicum', description: 'Perform spark plug servicing, carburetor cleaning, oil change, and valve lash check.' }]
      },
      {
        week: 'Weeks 7–8',
        learningCompetencies: ['Discuss electrical system components and troubleshoot malfunctions.', 'Perform assembling/disassembling in electrical system and chassis.'],
        suggestedActivities: [{ title: 'Chassis & Electrical Diagnostic Workshop', description: 'Test battery, ignition coil, regulator/rectifier, brakes, steering, and suspension.' }]
      },
      {
        week: 'Weeks 9–10',
        learningCompetencies: ['Discuss procedures in motorcycle/small engine overhauling based on service manual.', 'Perform overhauling and performance testing.'],
        suggestedActivities: [{ title: 'Engine Overhaul & Compression Test Practicum', description: 'Disassemble cylinder head, measure piston ring clearance, lap valves, and reassemble.' }]
      },
      {
        week: 'Week 11',
        learningCompetencies: ['Discuss service cost of motorcycle/small engine servicing.', 'Calculate total labor and materials costs.'],
        suggestedActivities: [{ title: 'Job Costing & Service Quotation Exercise', description: 'Calculate total parts, fluids, labor hours, and profit for client billing.' }]
      }
    ],
    suggestedPerformanceTasks: [
      { title: 'Individual Task: Safe Motorcycle Riding Demonstration', type: 'Individual', description: 'Demonstrate pre-ride check, mounting, starting, maneuvering, braking, and parking in controlled course.' },
      { title: 'Individual Task: Motorcycle/Small Engine Complete Servicing', type: 'Individual', description: 'Perform complete preventive maintenance servicing on a motorcycle engine system.' },
      { title: 'Group Task: Engine Overhaul and Cost Computation Project', type: 'Group', description: 'Collaboratively overhaul a 4-stroke small engine, verify compression, and compute job service cost.' }
    ]
  },

  'ia-rac': {
    id: 'ia-rac',
    title: 'Domestic Refrigeration and Air-Conditioning Servicing',
    sector: 'Industrial Arts (IA)',
    cluster: 'Industrial Technologies',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'Understands the concepts and principles of installing domestic refrigeration and air-conditioning units.',
      'Understands the concepts and principles of maintaining domestic refrigeration and window-type air-conditioning units.',
      'Understands the concepts and principles of troubleshooting domestic refrigeration and window-type air-conditioning units.',
      'Understands the concepts and principles of repairing domestic refrigeration and window-type air-conditioning units.'
    ],
    performanceStandards: [
      'The learner performs the installation of domestic refrigeration and air-conditioning units with safety precautions.',
      'The learner performs the maintenance of domestic refrigeration and window-type air- conditioning units with safety precautions.',
      'The learner performs troubleshooting of domestic refrigeration and window-type air- conditioning units with safety precautions.',
      'The learner performs repairing domestic refrigeration and window-type air-conditioning units with safety precautions.'
    ],
    weeks: [
      {
        week: 'Week 1',
        learningCompetencies: ['Discuss overview of Refrigeration and Air Conditioning servicing.', 'Discuss refrigeration and air conditioning concepts and principles.'],
        suggestedActivities: [{ title: 'Refrigeration Cycle Exploration & Tool ID', description: 'Map compressor, condenser, metering device, evaporator, and identify gauge manifolds and flaring tools.' }]
      },
      {
        week: 'Weeks 2–3',
        learningCompetencies: ['Perform pre-installation procedure for an air-conditioning unit.'],
        suggestedActivities: [{ title: 'Site Inspection Drill & Component Readiness', description: 'Verify wall opening dimensions, electrical outlet capacity, and drainage slope.' }]
      },
      {
        week: 'Weeks 4–5',
        learningCompetencies: ['Perform procedures in installing a window-type air-conditioning unit.'],
        suggestedActivities: [{ title: 'Window AC Unit Mounting & Functional Check', description: 'Mount unit on bracket, seal perimeter, plug in power, and measure air temperature delta.' }]
      },
      {
        week: 'Weeks 6–7',
        learningCompetencies: ['Perform maintenance of window-type air-conditioning units.'],
        suggestedActivities: [{ title: 'Coil Cleaning & Electrical Check', description: 'Clean evaporator and condenser coils with pressure washer, clean air filter, and clear drain pans.' }]
      },
      {
        week: 'Weeks 8–9',
        learningCompetencies: ['Discuss pre-troubleshooting of domestic refrigeration and window AC.', 'Perform troubleshooting of units.'],
        suggestedActivities: [{ title: 'Fault Diagnosis & Leak Testing Drill', description: 'Diagnose low cooling, high head pressure, faulty thermostat, and perform bubble/electronic leak test.' }]
      },
      {
        week: 'Weeks 10–11',
        learningCompetencies: ['Discuss repairing of domestic refrigeration and window AC units.', 'Perform repairing of domestic refrigeration and window AC units.'],
        suggestedActivities: [{ title: 'Component Replacement & System Recovery Practicum', description: 'Recover refrigerant safely, replace start capacitor/overload, evacuate with vacuum pump, and recharge.' }]
      }
    ],
    suggestedPerformanceTasks: [
      { title: 'Individual Task: Window-Type AC Installation', type: 'Individual', description: 'Safely measure, frame, mount, seal, and test a window air conditioning unit.' },
      { title: 'Group Task: Comprehensive Maintenance & Coil Washing Workshop', type: 'Group', description: 'Dismantle housing, pressure wash coils, test fan motor capacitor, and evaluate amp draw.' },
      { title: 'Individual Task: Component Repair & Refrigerant Charging Challenge', type: 'Individual', description: 'Braze copper tubing, pull deep vacuum under 500 microns, and charge refrigerant by weight.' }
    ]
  },

  'fcs-garments': {
    id: 'fcs-garments',
    title: 'Garments Artisanry',
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Artisanry and Creative Enterprises',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'The learners demonstrate essential knowledge and skills in designing, sewing and assembling upper garments.',
      'The learners demonstrate essential knowledge and skills in designing, sewing, and assembling lower garments.',
      'The learners demonstrate essential knowledge and skills in designing, sewing, and assembling blazers and trousers.',
      'The learners demonstrate essential knowledge and skills in designing, sewing, and assembling sleeping garments.'
    ],
    performanceStandards: [
      'The learners create sustainable upper garments following occupational health and safety precautions.',
      'The learners create sustainable lower garments following Occupational Health and Safety precautions.',
      'The learners create blazers and trousers following Occupational Health and Safety precautions.',
      'The learners create sustainable sleeping garments and children\'s wear following Occupational Health and Safety precautions.'
    ],
    weeks: [
      {
        week: 'Week 1',
        learningCompetencies: ['Discuss key components of dressmaking, tailoring, and fashion design.', 'Discuss considerations in designing garments.'],
        suggestedActivities: [{ title: 'Dressmaking Concept Map & Design Considerations', description: 'Analyze fabric drape, ergonomics, body types, and safety rules for cutting/sewing.' }]
      },
      {
        week: 'Weeks 2–3',
        learningCompetencies: ['Create own designs of ladies\' blouse and men\'s polo.', 'Perform pattern drafting and sewing of sustainable upper garments.', 'Apply post-garment construction procedures.'],
        suggestedActivities: [{ title: 'Blouse & Polo Drafting, Construction & Finishing', description: 'Draft sloper patterns, cut fabric, attach collars/sleeves/buttons, and press seams.' }]
      },
      {
        week: 'Weeks 4–6',
        learningCompetencies: ['Discuss marketing strategy.', 'Discuss types and parts of lower garments.', 'Create designs, draft patterns, and sew sustainable lower garments (skirts/shorts).'],
        suggestedActivities: [{ title: 'Skirt & Shorts Pattern Drafting & Sewing Practice', description: 'Draft A-line skirt and pleated shorts patterns, insert zippers, and stitch waistbands.' }]
      },
      {
        week: 'Weeks 7–9',
        learningCompetencies: ['Discuss types and parts of blazers and trousers.', 'Create designs, draft patterns, and assemble blazers and trousers.'],
        suggestedActivities: [{ title: 'Tailored Blazer & Trousers Construction', description: 'Construct tailored notched lapels, shoulder pads, welt pockets, and trouser fly fronts.' }]
      },
      {
        week: 'Weeks 10–11',
        learningCompetencies: ['Discuss types and parts of sleeping garments and children\'s wear.', 'Draft patterns, sew, and apply post-garment construction.'],
        suggestedActivities: [{ title: 'Pajama & Children\'s Wear Assembly & Packaging', description: 'Draft and sew elastic waist pajamas and children\'s garments with soft child-safe seams.' }]
      }
    ],
    suggestedPerformanceTasks: [
      { title: 'Individual Task: Upper Garment Design & Construction (Blouse/Polo)', type: 'Individual', description: 'Independently measure, draft pattern, cut, and construct a wearable blouse or polo shirt.' },
      { title: 'Individual Task: Blazer & Trousers Tailoring Project', type: 'Individual', description: 'Draft and tailor a structured lined blazer or pair of formal slacks adhering to quality standards.' },
      { title: 'Group Task: Sustainable Garments Fashion Showcase & Collection', type: 'Group', description: 'Collaboratively produce a 4-piece collection (upper, lower, formal, sleepwear) with marketing plan.' }
    ]
  },

  'fcs-baking': {
    id: 'fcs-baking',
    title: 'Bakery Operation',
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Hospitality and Tourism',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'The learners demonstrate an understanding of the fundamentals of baking bread and other baked products.',
      'The learners demonstrate understanding of pastry products.',
      'The learners demonstrate understanding on cake products.',
      'The learners demonstrate understanding on producing traditional and contemporary petit fours.'
    ],
    performanceStandards: [
      'The learners demonstrate fundamental skills in baking breads.',
      'The learners apply skills in preparing pastry products.',
      'The learners apply skills in producing cakes and cake products.',
      'The learners apply skills in producing traditional and contemporary petit fours.'
    ],
    weeks: [
      {
        week: 'Weeks 1–3',
        learningCompetencies: ['Discuss the overview of baking industry and fundamentals.', 'Prepare bread products following safety.', 'Select appropriate packaging and marketing strategies.'],
        suggestedActivities: [{ title: 'Yeast Bread Fermentation, Kneading & Baking', description: 'Formulate enriched dough (pandesal, dinner rolls), control proofing temperature, bake, and package.' }]
      },
      {
        week: 'Weeks 4–7',
        learningCompetencies: ['Explain fundamentals and characteristics of pastries.', 'Prepare crust, fillings, and coatings.', 'Prepare traditional and contemporary pastry products.', 'Perform costing and marketing.'],
        suggestedActivities: [{ title: 'Shortcrust, Choux & Laminated Pastry Production', description: 'Produce cream puffs, fruit tarts, and turnovers with pastry cream, calculate unit cost and margin.' }]
      },
      {
        week: 'Weeks 8–9',
        learningCompetencies: ['Explain fundamentals of cake production and classify cakes/icing.', 'Produce and store cakes following industry standards.'],
        suggestedActivities: [{ title: 'Sponge, Chiffon Cakes & Buttercream Decorating', description: 'Bake chiffon and sponge layers, whip Swiss meringue buttercream, and pipe borders and rosettes.' }]
      },
      {
        week: 'Weeks 10–11',
        learningCompetencies: ['Discuss function of petit fours and describe characteristics.', 'Produce traditional and modern petit fours.'],
        suggestedActivities: [{ title: 'Petit Fours Glacé, Sec, and Frais Platter', description: 'Cut layered sponge cakes into 1-inch squares, coat with poured fondant, and decorate delicately.' }]
      }
    ],
    suggestedPerformanceTasks: [
      { title: 'Individual Task: Bread Baking Practice (Artisan Loaf / Pandesal)', type: 'Individual', description: 'Independently mix, knead, proof, shape, and bake uniform bread products.' },
      { title: 'Individual Task: Cake Production & Piping Skills Demonstration', type: 'Individual', description: 'Bake a layered chiffon cake, crumb coat, frost smoothly, and pipe decorative borders.' },
      { title: 'Group Task: Petit Fours Platter & Bakery Fair Display', type: 'Group', description: 'Create an assortment of miniature petit fours and present on a themed banquet tier.' }
    ]
  },

  'fcs-hairdressing': {
    id: 'fcs-hairdressing',
    title: 'Hairdressing',
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Aesthetic, Wellness, and Human Care',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'The learner demonstrates an understanding of the concepts and principles of haircutting.',
      'The learner demonstrates an understanding of the principles of hair treatments.',
      'The learner demonstrates an understanding of the principles of hair bleaching and coloring.',
      'The learner demonstrates an understanding of the principles of hair rebonding and perming.'
    ],
    performanceStandards: [
      'The learners perform haircutting techniques.',
      'The learners perform hair treatment following the quality standards of hairdressing.',
      'The learners perform bleaching and coloring services following quality standards.',
      'The learners perform rebonding and perming services and safety considerations.'
    ],
    weeks: [
      {
        week: 'Weeks 1–3',
        learningCompetencies: ['Discuss hairdressing fundamentals, hair theory & chemistry.', 'Perform pre/post-hair services and client consultation.', 'Discuss and apply haircutting techniques and aftercare.'],
        suggestedActivities: [{ title: 'Precision Haircutting Techniques (Blunt, Layered, Graduated)', description: 'Section hair in 4 quadrants, maintain shear-over-comb elevation, and check balance.' }]
      },
      {
        week: 'Weeks 4–5',
        learningCompetencies: ['Explain principles of hair treatment and differentiate products.', 'Perform hair treatment procedures and plan follow-up services.'],
        suggestedActivities: [{ title: 'Deep Conditioning & Scalp Treatment Practicum', description: 'Diagnose hair porosity/elasticity, apply keratin/hot oil treatments with steam cap.' }]
      },
      {
        week: 'Weeks 6–8',
        learningCompetencies: ['Discuss hair bleaching and coloring.', 'Explain factors in applying hair color.', 'Perform procedures of hair bleaching and coloring and aftercare.'],
        suggestedActivities: [{ title: 'Color Wheel Formulation & Foil Highlight Application', description: 'Formulate developer volumes (20/30 vol), conduct patch test, and execute balayage/highlights.' }]
      },
      {
        week: 'Weeks 9–11',
        learningCompetencies: ['Discuss principles of hair perming and rebonding.', 'Identify tools, materials, and conduct pre-assessment.', 'Perform perming/rebonding and aftercare.'],
        suggestedActivities: [{ title: 'Chemical Straightening & Cold Wave Perming Lab', description: 'Wrap perm rods in overlapping patterns, apply neutralizer, and execute ceramic flat iron rebonding.' }]
      }
    ],
    suggestedPerformanceTasks: [
      { title: 'Individual Task: Precision Haircut Demonstration', type: 'Individual', description: 'Perform a complete layered or blunt haircut on a mannequin following sanitation rules.' },
      { title: 'Individual Task: Hair Coloring & Bleaching Application', type: 'Individual', description: 'Conduct strand test, mix formula, section, apply bleach/color evenly, and neutralize.' },
      { title: 'Group Task: Salon Client Service Simulation', type: 'Group', description: 'Simulate full salon flow: consultation, scalp treatment, haircutting, and styling.' }
    ]
  },

  'fcs-beautycare': {
    id: 'fcs-beautycare',
    title: 'Beauty Care',
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Aesthetic, Wellness, and Human Care',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'The learners understand the principles of nail care services.',
      'The learners demonstrate an understanding of skincare services.',
      'The learners demonstrate an understanding of basic concepts in makeup services.',
      'The learners demonstrate an understanding of the principles, knowledge, skills, and attitude in hairstyling.'
    ],
    performanceStandards: [
      'The learners perform nail care procedures.',
      'The learners perform skincare services.',
      'The learners perform simple makeup and special occasion makeup following safety guidelines.',
      'The learners perform hairstyling following safety guidelines in hairstyling services.'
    ],
    weeks: [
      {
        week: 'Weeks 1–3',
        learningCompetencies: ['Discuss principles of beauty care and nail anatomy.', 'Discuss safety and hygiene practices.', 'Perform spa and nail care procedures following industry standards.'],
        suggestedActivities: [{ title: 'Manicure, Pedicure & Hand/Foot Spa Practicum', description: 'Sanitize tools in autoclave/alcohol, trim, shape nails, clean cuticles, and apply polish.' }]
      },
      {
        week: 'Weeks 4–6',
        learningCompetencies: ['Discuss skincare concepts and safety considerations.', 'Discuss tools, equipment, products.', 'Explain and perform basic skincare procedures.'],
        suggestedActivities: [{ title: 'Basic Facial Treatment & Skin Type Analysis', description: 'Perform cleansing, steaming, gentle extraction, facial massage, and clay mask application.' }]
      },
      {
        week: 'Weeks 7–8',
        learningCompetencies: ['Discuss concepts of makeup services and product functions.', 'Demonstrate makeup application techniques following safety guidelines.'],
        suggestedActivities: [{ title: 'Day, Evening & Bridal Makeup Application', description: 'Color match foundation, contour, blend eyeshadows, apply false eyelashes, and set with powder.' }]
      },
      {
        week: 'Weeks 9–11',
        learningCompetencies: ['Discuss basic hairstyling and tools/accessories.', 'Discuss preparation and perform hairstyling techniques according to client needs.'],
        suggestedActivities: [{ title: 'Creative Updos, Braiding & Curling Showcase', description: 'Execute French/Dutch braids, barrel curls, and bridal updos with bobby pins and hairspray.' }]
      }
    ],
    suggestedPerformanceTasks: [
      { title: 'Individual Task: Manicure & Pedicure with Nail Art', type: 'Individual', description: 'Demonstrate hygienic nail preparation, cuticle care, and French tip nail polish application.' },
      { title: 'Individual Task: Special Occasion Makeup Application', type: 'Individual', description: 'Apply a full-face evening/glamour makeup on a model following sanitation standards.' },
      { title: 'Group Task: Bridal Total Look Runway Showcase', type: 'Group', description: 'Team executes hair, makeup, and nail styling for bridal and special occasion themes.' }
    ]
  },

  'fcs-caregiving-child': {
    id: 'fcs-caregiving-child',
    title: 'Caregiving (Child Care)',
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Aesthetic, Wellness, and Human Care',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'The learners demonstrate understanding in occupational safety and health policies (OHS), career and business opportunities, therapeutic communication, care plan, infection control, standard first aid, and basic life support.',
      'The learners demonstrate understanding in taking vital signs.',
      'The learners demonstrate understanding in pre-natal and post-natal care, breast feeding techniques, newborn screening, vaccines, growth stages, bathing, and feeding.',
      'The learners demonstrate understanding the different behavioral patterns, common routines and principles of medication administration.'
    ],
    performanceStandards: [
      'The learners perform infection control procedures, standard first aid, and basic life support in accordance with Philippine National Red Cross.',
      'The learners perform taking vital signs.',
      'The learners perform bathing and feeding procedures.',
      'The learners perform common routines in child care.'
    ],
    weeks: [
      {
        week: 'Weeks 1–3',
        learningCompetencies: ['Discuss OHS, communication, and create a SMARTER care plan.', 'Perform infection control and first aid/BLS according to Red Cross.'],
        suggestedActivities: [{ title: 'Pediatric CPR, Choking First Aid & Infection Control', description: 'Practice infant/child CPR compressions, Heimlich maneuver, and hand hygiene.' }]
      },
      {
        week: 'Weeks 4–6',
        learningCompetencies: ['Perform procedures in taking vital signs.'],
        suggestedActivities: [{ title: 'Pediatric Vital Signs Measurement', description: 'Measure infant axillary temperature, apical pulse, respiratory rate, and plot on growth charts.' }]
      },
      {
        week: 'Weeks 7–8',
        learningCompetencies: ['Discuss pre/post-natal care, breastfeeding, newborn screening, vaccines, and child development.', 'Perform bathing and feeding procedures.'],
        suggestedActivities: [{ title: 'Infant Sponge Bathing, Diapering & Bottle Feeding', description: 'Demonstrate safe sponge bath holding techniques, cord care, sterilization, and burping.' }]
      },
      {
        week: 'Weeks 9–11',
        learningCompetencies: ['Discuss sleeping habits, behavioral patterns, and routine care activities.', 'Discuss medication principles and calculate service cost.'],
        suggestedActivities: [{ title: 'Child Routine Schedule & Pediatric Medication Safety', description: 'Create age-appropriate bedtime routines, oral medicine syringe measurement, and care budget.' }]
      }
    ],
    suggestedPerformanceTasks: [
      { title: 'Individual Task: Infant Bathing & Umbilical Cord Care Drill', type: 'Individual', description: 'Demonstrate safe infant bath preparation, head support, cleansing, and antiseptic cord dressing.' },
      { title: 'Individual Task: Pediatric Vital Signs & Emergency BLS', type: 'Individual', description: 'Record temperature/pulse/respiration and execute infant CPR sequence on training manikin.' }
    ]
  },

  'fcs-caregiving-adult': {
    id: 'fcs-caregiving-adult',
    title: 'Caregiving (Adult Care)',
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Aesthetic, Wellness, and Human Care',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'The learners demonstrate understanding in career opportunities, OHS, legal/ethical issues, therapeutic communication, care plan, infection control, first aid, and BLS.',
      'The learners demonstrate understanding of phases of aging and importance of taking vital signs.',
      'The learners demonstrate understanding of food pyramid, therapeutic diets, feeding, elimination, bathing, perineal care, oral care, and bed making.',
      'The learners demonstrate understanding of safe ambulation, basic wound care, heat/cold therapy, palliative care, and medication assistance.'
    ],
    performanceStandards: [
      'The learners perform infection control, standard first aid, basic life support according to Red Cross and care plan.',
      'The learners perform taking vital signs.',
      'The learners perform feeding, food disposal, toileting, bathing, perineal care, oral care, and bed making.',
      'The learners demonstrate safe ambulation, transfer techniques, basic wound care, heat/cold therapy, and medication assistance.'
    ],
    weeks: [
      {
        week: 'Weeks 1–3',
        learningCompetencies: ['Discuss career opportunities, OHS, legal and ethical issues in adult care.', 'Compare therapeutic with non-therapeutic communication.', 'Perform infection control and BLS.'],
        suggestedActivities: [{ title: 'Adult BLS, PPE Donning/Doffing & Ethics Seminar', description: 'Demonstrate chest compressions, AED use, hand hygiene, and patient privacy compliance.' }]
      },
      {
        week: 'Weeks 4–5',
        learningCompetencies: ['Create a SMARTER care plan and discuss aging process.', 'Perform taking vital signs and feeding techniques.'],
        suggestedActivities: [{ title: 'Vital Signs Monitoring (BP, Pulse, SpO2) & Feeding', description: 'Use sphygmomanometer/stethoscope for blood pressure and assist dysphagia clients safely.' }]
      },
      {
        week: 'Weeks 6–8',
        learningCompetencies: ['Perform toileting, bathing, perineal/oral care.', 'Perform hospital bed making and safe ambulation/transfer.'],
        suggestedActivities: [{ title: 'Occupied Bed Making & Wheelchair Transfer', description: 'Change linens with patient in bed, use gait belts for pivot transfers, and maintain dignified hygiene.' }]
      },
      {
        week: 'Weeks 9–11',
        learningCompetencies: ['Perform wound care and heat/cold therapy.', 'Discuss palliative care and medication assistance.', 'Calculate service cost in providing caregiving.'],
        suggestedActivities: [{ title: 'Aseptic Dressing Change, Hot Compress & Medication Log', description: 'Clean minor wounds with saline, apply sterile dressings, verify 5 rights of medication, and prepare budget.' }]
      }
    ],
    suggestedPerformanceTasks: [
      { title: 'Individual Task: Adult Vital Signs Measurement & Documentation', type: 'Individual', description: 'Accurately measure and chart systolic/diastolic BP, heart rate, respiration, and temperature.' },
      { title: 'Individual Task: Occupied Bed Making & Safe Patient Transfer', type: 'Individual', description: 'Demonstrate linen replacement while turning patient safely and transferring to wheelchair.' },
      { title: 'Group Task: Comprehensive Geriatric Care Simulation', type: 'Group', description: 'Manage a simulated elderly patient shift: vital signs, meal assistance, oral care, and medication log.' }
    ]
  },

  'fcs-events': {
    id: 'fcs-events',
    title: 'Event Management Servicing',
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Hospitality and Tourism',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'The learners demonstrate an understanding of the fundamental concepts, processes, and roles within the event management industry.',
      'The learner demonstrates an understanding of developing event programs and selecting appropriate venues.',
      'The learners demonstrate an understanding of legal regulatory requirements in managing events.',
      'The learners demonstrate an understanding of managing events.'
    ],
    performanceStandards: [
      'The learners conceptualize event plans by preparing event proposals and budgets.',
      'The learner applies knowledge on developing event programs and selecting appropriate venues.',
      'The learners prepare legal documents needed in managing events.',
      'The learners manage an event.'
    ],
    weeks: [
      {
        week: 'Weeks 1–3',
        learningCompetencies: ['Discuss history and careers in event management.', 'Explain event concepts, themes, and prepare SOAR analysis.', 'Prepare budget allocation and event branding.'],
        suggestedActivities: [{ title: 'Event Theme Proposal & Budget Allocation Plan', description: 'Develop thematic pitch for corporate/social events, itemize revenues and expenditure line items.' }]
      },
      {
        week: 'Weeks 4–6',
        learningCompetencies: ['Prepare event proposal and develop contingency plan for risks.', 'Simulate event bidding and develop program schedule.', 'Site a venue selection checklist.'],
        suggestedActivities: [{ title: 'Venue Inspection Checklist & Run of Show Program', description: 'Evaluate venue ingress/egress, audiovisual staging, and sequence minute-by-minute program flow.' }]
      },
      {
        week: 'Weeks 7–9',
        learningCompetencies: ['Discuss legal, regulatory, and ethical requirements for events.', 'Manage contractors and execute event following contractor plan.', 'Prepare an event portfolio.'],
        suggestedActivities: [{ title: 'Contractor SOW & Event Production Execution', description: 'Draft vendor Service Level Agreements (SLAs), sound/lights staging, and coordinate team roles.' }]
      },
      {
        week: 'Weeks 10–11',
        learningCompetencies: ['Manage an event from preparation to post-event evaluation.'],
        suggestedActivities: [{ title: 'Live Event Staging & Post-Event Audit', description: 'Execute live school event (symposium, showcase) with guest registration, crowd control, and financial audit.' }]
      }
    ],
    suggestedPerformanceTasks: [
      { title: 'Individual Task: Comprehensive Event Proposal & Budget Plan', type: 'Individual', description: 'Draft complete proposal including client brief, theme, venue layout, run of show, and budget.' },
      { title: 'Group Task: Live School Event Management & Production', type: 'Group', description: 'Collaboratively plan, finance, stage, direct, and audit a live educational or cultural event.' }
    ]
  },

  'fcs-frontoffice': {
    id: 'fcs-frontoffice',
    title: 'Hotel Operation (Front Office)',
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Hospitality and Tourism',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'The learner demonstrates an understanding of the hotel front office and its organization and OHS standards.',
      'The learners demonstrate understanding on guest accounting and cashiering, night audit and yield management.',
      'The learners demonstrate understanding of PBX, uniformed services, service excellence, and guest recovery.'
    ],
    performanceStandards: [
      'The learner will create an organizational chart for the front office department.',
      'The learners perform stages of the guest cycle.',
      'The learners demonstrate billing procedures, cashiering functions, payment processing methods.',
      'The learners exhibit customer service relation skills.'
    ],
    weeks: [
      {
        week: 'Weeks 1–3',
        learningCompetencies: ['Discuss front office overview, service quality, and guestology.', 'Explain organizational structure and duties.', 'Categorize guestrooms, amenities, and security.'],
        suggestedActivities: [{ title: 'Front Office Layout & Departmental Hierarchy Chart', description: 'Map bell desk, reception, cashier, concierge, and reservations workflows.' }]
      },
      {
        week: 'Weeks 4–6',
        learningCompetencies: ['Demonstrate different guest cycles in a hotel.', 'Analyze reservation systems and policies.', 'Explain guest accounting and cashiering.'],
        suggestedActivities: [{ title: 'Guest Cycle Check-In / Check-Out Simulation', description: 'Register walk-in and reserved guests, issue keycards, verify credit card pre-auth, and post folio charges.' }]
      },
      {
        week: 'Weeks 7–9',
        learningCompetencies: ['Demonstrate night audit procedures.', 'Apply principles of yield management.', 'Explain PBX telephone operator and concierge service.'],
        suggestedActivities: [{ title: 'Night Audit Balancing & RevPAR Calculation', description: 'Reconcile daily room revenue, room status reports, calculate occupancy rate and ADR.' }]
      },
      {
        week: 'Weeks 10–11',
        learningCompetencies: ['Demonstrate techniques for handling guest complaints and service recovery.'],
        suggestedActivities: [{ title: 'Service Recovery & Guest Concierge Simulation', description: 'Handle overbooking, noisy neighbors, room downgrades with diplomatic compensation options.' }]
      }
    ],
    suggestedPerformanceTasks: [
      { title: 'Individual Task: Front Office Check-In & Folio Billing', type: 'Individual', description: 'Perform check-in registration, folio charges posting, and check-out settlement under time limits.' },
      { title: 'Group Task: Night Audit & Front Desk Operations Simulation', type: 'Group', description: 'Manage front desk shifts, telephone reservations, audit reconciliation, and guest recovery.' }
    ]
  },

  'fcs-weaving': {
    id: 'fcs-weaving',
    title: 'Handicraft (Weaving)',
    sector: 'Family and Consumer Sciences (FCS)',
    cluster: 'Artisanry and Creative Enterprises',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'The learners exhibit knowledge in basketry.',
      'The learners demonstrate understanding of the techniques, pattern, and steps in mat weaving.',
      'The learners demonstrate understanding the procedures of handloom weaving in making handloom device.',
      'The learners demonstrate an understanding on handloom weaving procedure.'
    ],
    performanceStandards: [
      'The learners craft basketry products.',
      'The learners apply the techniques in weaving in creating innovative mat products.',
      'The learners apply the procedures in making handloom device for textile weaving.',
      'The learners apply the steps in handloom weaving to create sustainable woven textile products.'
    ],
    weeks: [
      {
        week: 'Weeks 1–3',
        learningCompetencies: ['Discuss principles, tools, and raw materials for basketry.', 'Perform preparation of raw materials.', 'Create basket products following OSH standards and finish products.'],
        suggestedActivities: [{ title: 'Bamboo/Rattan Splitting & Basket Weaving Practicum', description: 'Soak, split, and shave weaving splints; weave base, stakes, waling, and coiled rim border.' }]
      },
      {
        week: 'Weeks 4–5',
        learningCompetencies: ['Discuss methods, techniques, patterns in mat weaving.', 'Create mat products using weaving steps with safety.', 'Determine production cost and market products.'],
        suggestedActivities: [{ title: 'Tiklisi & Plaiting Pandan / Buri Mat Weaving', description: 'Execute twill, diagonal, and checkered plaiting patterns and calculate export craft pricing.' }]
      },
      {
        week: 'Weeks 6–8',
        learningCompetencies: ['Discuss principles of handloom weaving and tools.', 'Apply steps in making handloom devices for textile weaving.'],
        suggestedActivities: [{ title: 'Handloom Frame Construction & Warping Workshop', description: 'Assemble wooden frame loom with warp beam, heddles, and reed; string uniform tension warp threads.' }]
      },
      {
        week: 'Weeks 9–11',
        learningCompetencies: ['Weave textile using handloom devices.', 'Plan post weaving activities of woven textile products.'],
        suggestedActivities: [{ title: 'Textile Weaving & Edge Finishing Practicum', description: 'Pass weft shuttles through shed openings, beat weft rows evenly, trim fringe, and steam press.' }]
      }
    ],
    suggestedPerformanceTasks: [
      { title: 'Individual Task: Handwoven Basketry Product', type: 'Individual', description: 'Craft a functional storage or market basket from natural plant fibers with durable rim finish.' },
      { title: 'Individual Task: Handloom Textile Weaving Sample', type: 'Individual', description: 'Construct a frame loom, set warp, and weave a 1-meter pattern textile strip with clean selvages.' }
    ]
  },

  'ict-net': {
    id: 'ict-net',
    title: 'Computer Programming (.NET / C#)',
    sector: 'ICT',
    cluster: 'ICT Support and Computer Programming Technologies',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'Demonstrate understanding of HTML, CSS box model, responsive web development layouts, JavaScript fundamentals, DOM, and event handling.',
      'Demonstrate understanding of C# data types, syntax, control structures, OOP principles, and file I/O.',
      'Demonstrate understanding of ASP.NET MVC architecture, controllers, views, models, database validation, security, and RESTful APIs.'
    ],
    performanceStandards: [
      'The learners build responsive web interfaces using HTML5, CSS3, and JavaScript.',
      'The learners create C# console and object-oriented solutions.',
      'The learners develop full-stack ASP.NET MVC web applications and REST APIs.'
    ],
    weeks: [
      {
        week: 'Weeks 1–3',
        learningCompetencies: ['Discuss HTML fundamentals, CSS selectors, box model, flexbox, RWD media queries, and JavaScript DOM manipulation.'],
        suggestedActivities: [{ title: 'Responsive Web Design & JavaScript Interactive DOM', description: 'Construct modern responsive web page with navigation, flexbox grid, and form validation.' }]
      },
      {
        week: 'Weeks 4–6',
        learningCompetencies: ['Discuss C# fundamentals, data types, operators, iterations, arrays, OOP classes, methods, and file I/O streams.'],
        suggestedActivities: [{ title: 'C# Console OOP Application & LINQ Queries', description: 'Build C# class hierarchies with encapsulation, inheritance, and query objects using LINQ.' }]
      },
      {
        week: 'Weeks 7–11',
        learningCompetencies: ['Discuss ASP.NET MVC environment, routing, controllers, views, models, Entity Framework database connection, security, and REST API creation.'],
        suggestedActivities: [{ title: 'Full ASP.NET Core MVC CRUD Web Application', description: 'Develop web app with SQL database connectivity, user authentication, model binding, and Web API endpoints.' }]
      }
    ],
    suggestedPerformanceTasks: [
      { title: 'Individual Task: C# Object-Oriented Console Information System', type: 'Individual', description: 'Write an OOP inventory or grading system in C# with persistent file/database storage.' },
      { title: 'Group Task: ASP.NET MVC Web Application with REST API', type: 'Group', description: 'Deploy a full-stack database-backed web portal with responsive frontend and REST endpoints.' }
    ]
  },

  'ict-oracle': {
    id: 'ict-oracle',
    title: 'Computer Programming (Oracle Database / SQL)',
    sector: 'ICT',
    cluster: 'ICT Support and Computer Programming Technologies',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'Demonstrate understanding of Oracle Database architecture, IDE installation, basic and advanced SQL syntax, DML, DDL, table constraints, views, and security.',
      'Demonstrate understanding of PL/SQL code framework, stored procedures, exception handling, and database application connectivity.'
    ],
    performanceStandards: [
      'The learners create and administer relational tables, execute complex multi-table queries with joins and subqueries.',
      'The learners write and debug stored procedures, triggers, and PL/SQL programmatic blocks connected to client applications.'
    ],
    weeks: [
      {
        week: 'Weeks 1–4',
        learningCompetencies: ['Discuss Oracle Database concepts, install IDE (SQL Developer), construct SELECT queries, ORDER BY, single/multi-row functions, JOINs, subqueries.'],
        suggestedActivities: [{ title: 'Advanced SQL Querying & Relational Joins Workshop', description: 'Query multiple normalized tables using INNER/OUTER JOINs, GROUP BY, HAVING, and nested subqueries.' }]
      },
      {
        week: 'Weeks 5–7',
        learningCompetencies: ['Apply DML commands (INSERT, UPDATE, DELETE), CREATE TABLE, table constraints (PK, FK, CHECK), and manage VIEWs and user permissions (DCL).'],
        suggestedActivities: [{ title: 'Schema Design, Integrity Constraints & Role Security', description: 'Build relational database schema with referential integrity, indexes, and grant/revoke access controls.' }]
      },
      {
        week: 'Weeks 8–11',
        learningCompetencies: ['Write PL/SQL blocks, stored procedures, functions, triggers, exception handling, and connect to Java/.NET applications.'],
        suggestedActivities: [{ title: 'PL/SQL Stored Procedures, Triggers & Application Bridge', description: 'Implement business rules via automated PL/SQL database triggers and connect to external client apps.' }]
      }
    ],
    suggestedPerformanceTasks: [
      { title: 'Individual Task: Enterprise Relational Database Schema & Query Suite', type: 'Individual', description: 'Design normalized 3NF database schema, populate sample data, and write 15 analytical SQL queries.' },
      { title: 'Group Task: PL/SQL Automated Transaction Engine Project', type: 'Group', description: 'Program stored procedures, audit triggers, and exception handlers for an online banking or retail system.' }
    ]
  },

  'ict-ccs': {
    id: 'ict-ccs',
    title: 'Contact Center Services',
    sector: 'ICT',
    cluster: 'ICT Support and Computer Programming Technologies',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'Discuss concepts, jargons, tools, and equipment in the contact center industry.',
      'Understand cultural variables, technical aspects of voice (intonation, pacing, pronunciation), English colloquialisms, and probing question techniques.',
      'Understand products, services, markets, inbound and outbound call handling, and non-voice digital interactions.'
    ],
    performanceStandards: [
      'The learners perform inbound and outbound phone transactions adhering to professional call flow protocols.',
      'The learners perform non-voice email and chat customer support adhering to SLAs and quality standards.'
    ],
    weeks: [
      {
        week: 'Weeks 1–3',
        learningCompetencies: ['Discuss contact center industry, headsets, CRM software, telephony systems, and professional call jargons.'],
        suggestedActivities: [{ title: 'BPO Telephony Lab & Acoustic Headset Drills', description: 'Navigate CRM dialers, log dispositions, and practice phonetic alphabet call signs.' }]
      },
      {
        week: 'Weeks 4–7',
        learningCompetencies: ['Apply vocal modulation, rate of speech, active listening, American English idioms, and open-ended probing.'],
        suggestedActivities: [{ title: 'Voice Coaching & Active Listening Phone Simulation', description: 'Analyze recorded customer calls, practice empathetic paraphrasing, and de-escalate angry callers.' }]
      },
      {
        week: 'Weeks 8–11',
        learningCompetencies: ['Perform inbound customer service calls, outbound telemarketing/survey calls, and non-voice email/chat handling.'],
        suggestedActivities: [{ title: 'Live Inbound/Outbound Call Simulation & Live Chat Support', description: 'Execute standardized 7-step call flow: opening greeting, verification, probe, solution, closing.' }]
      }
    ],
    suggestedPerformanceTasks: [
      { title: 'Individual Task: Inbound Customer Service Call Evaluation', type: 'Individual', description: 'Handle an unscripted simulated customer support call achieving 90%+ quality assurance (QA) score.' },
      { title: 'Group Task: BPO Floor Shift Simulation (Voice & Non-Voice)', type: 'Group', description: 'Operate a contact center shift managing inbound queues, chat tickets, and supervisor escalations.' }
    ]
  },

  'ict-illustration': {
    id: 'ict-illustration',
    title: 'Illustration',
    sector: 'ICT',
    cluster: 'Creative Arts and Design Technology',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'The learners demonstrate understanding of fundamentals of illustration, traditional drawing techniques, volume, objects, and human anatomy.',
      'The learners demonstrate understanding of drawing techniques for creating digital drawings, volume, objects, and vector art using software.',
      'The learners demonstrate understanding of concept art, design briefs, digital drawing, styles, and computing design costs.'
    ],
    performanceStandards: [
      'The learners create illustrations that represent intended ideas by analyzing design briefs and applying appropriate styles.',
      'The learners create accurate digital drawings of basic shapes with volume, objects, figures, and vector art.',
      'The learners create concept art using digital media and compute design cost for illustration.'
    ],
    weeks: [
      {
        week: 'Weeks 1–4',
        learningCompetencies: ['Discuss fundamentals, IP laws, tools/materials, ergonomics, line art, volume, 3D shapes, and human figure drawing.'],
        suggestedActivities: [{ title: 'Anatomy, Volumetric Drawing & Perspective Plate', description: 'Draw gesture skeletons, foreshortened figures, and volumetric cityscapes using 2-point perspective.' }]
      },
      {
        week: 'Weeks 5–9',
        learningCompetencies: ['Discuss digital drawing equipment and software, create volumetric digital shapes, vector art, and gather concept art research.'],
        suggestedActivities: [{ title: 'Digital Painting, Vector Asset Design & Moodboards', description: 'Use graphics tablet with pressure sensitivity, digital layer blending, and vector pen tool paths.' }]
      },
      {
        week: 'Weeks 10–11',
        learningCompetencies: ['Create concept art (characters, environments), analyze illustration styles, and compute design costs based on client briefs.'],
        suggestedActivities: [{ title: 'Full Concept Art Portfolio & Freelance Pricing', description: 'Render detailed character and environmental concept art plate and calculate freelance project rates.' }]
      }
    ],
    suggestedPerformanceTasks: [
      { title: 'Individual Task: Illustrator\'s Blueprint: From Basics to Figure Mastery', type: 'Individual', description: 'Complete traditional drawing plates showcasing volumetric shapes, textures, and anatomical figure drawing.' },
      { title: 'Individual Task: Pixels to Vectors: The Digital Illustrator Challenge', type: 'Individual', description: 'Design a digital artwork combining painterly raster textures with clean vector asset components.' },
      { title: 'Group Task: Concept Lab: From Research to Render', type: 'Group', description: 'Collaboratively build a complete concept art pitch package for an original animated game world.' }
    ]
  },

  'mar-transport': {
    id: 'mar-transport',
    title: 'Maritime Transportation at Support Level',
    sector: 'Maritime',
    cluster: 'Naval Operations & Engineering',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'Understanding of shipping industry, safe navigational watch, COLREGs, bridge equipment, and shipboard organization.',
      'Understanding of mooring operations, cargo and stores handling, dangerous goods (IMDG), and marine pollution prevention (MARPOL).',
      'Understanding of deck machinery, occupational safety, survival crafts, rescue boats, and shipboard maintenance.'
    ],
    performanceStandards: [
      'The learners perform look-out, handover and relief of the watch in conformity with acceptable STCW practices.',
      'The learners carry out mooring operations, cargo stowage and securing, and environmental protection.',
      'The learners operate deck equipment and survival crafts.'
    ],
    weeks: [
      {
        week: 'Weeks 1–4',
        learningCompetencies: ['Discuss shipping industry, regulatory bodies (IMO, STCW), shipboard organization, bridge watchkeeping, and ship steering.'],
        suggestedActivities: [{ title: 'Bridge Watchkeeping & Compass Steering Simulation', description: 'Execute helm orders, report sighted targets (lights, shapes, sound signals), and practice watch relief.' }]
      },
      {
        week: 'Weeks 5–8',
        learningCompetencies: ['Discuss emergency duties, pyrotechnics, EPIRB, SART, perform mooring operations, cargo handling, and deck safety.'],
        suggestedActivities: [{ title: 'Mooring Line Operations & Deck Winch Handling', description: 'Heave messenger lines, secure mooring lines on bitts, operate anchor windlass safely, and tie maritime knots.' }]
      },
      {
        week: 'Weeks 9–11',
        learningCompetencies: ['Perform rigging, seamanship, hoisting/dipping flags, MARPOL pollution prevention, survival techniques, and deck maintenance.'],
        suggestedActivities: [{ title: 'Seamanship Splices, Flag Etiquette & Lifeboat Drill', description: 'Perform eye splices on synthetic ropes, hoist international signal flags, and simulate lifeboat launching.' }]
      }
    ],
    suggestedPerformanceTasks: [
      { title: 'Individual Task: Bridge Watchkeeping & Look-Out Duties', type: 'Individual', description: 'Execute standard helm commands and report navigation hazards according to COLREGs.' },
      { title: 'Group Task: Mooring Station & Anchor Windlass Operation', type: 'Group', description: 'Perform coordinated mooring operations applying snapback zone safety precautions.' }
    ]
  },

  'mar-engineering': {
    id: 'mar-engineering',
    title: 'Maritime Engineering at Support Level',
    sector: 'Maritime',
    cluster: 'Naval Operations & Engineering',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'Understanding of safe engineering watch, main propulsion/auxiliary monitoring, marine steam boiler water level and pressure.',
      'Understanding of emergency procedures in machinery spaces, engine room watchkeeping communication, and electrical safety.',
      'Understanding of shipboard maintenance, anti-pollution equipment, fuel/oil transfer, bilge and ballast system operations.'
    ],
    performanceStandards: [
      'The learners demonstrate skills in the engine room piping system based on Maritime industry standards.',
      'The learners demonstrate skills in maintaining a safe engineering watch and shipboard maintenance/repair.',
      'The learners apply procedures in pollution prevention, machinery operation, fueling, bilge/ballast, and stores.'
    ],
    weeks: [
      {
        week: 'Weeks 1–3',
        learningCompetencies: ['Discuss shipping industry, IMO/SOLAS, shipboard organization, ISPS code, machinery identification, and piping systems.'],
        suggestedActivities: [{ title: 'Engine Room Piping Schematics & Gauge Reading', description: 'Trace fuel, lube oil, cooling water, and compressed air piping systems, recording pressure gauges.' }]
      },
      {
        week: 'Weeks 4–7',
        learningCompetencies: ['Engine room communications, emergency duties, fire pumps, watchkeeping handover, and marine boiler monitoring.'],
        suggestedActivities: [{ title: 'Marine Boiler Water Level & Watch Handover Drill', description: 'Blow down boiler gauge glass, monitor steam pressure, and conduct systematic watch relief.' }]
      },
      {
        week: 'Weeks 8–11',
        learningCompetencies: ['Safe working practices (SMS), electrical maintenance, auxiliary machinery repair, MARPOL oil transfer, and bilge/ballast operations.'],
        suggestedActivities: [{ title: 'Bilge & Ballast Valve Manifold Operation & Oily Water Separator', description: 'Operate pump manifold valves safely, check bilge alarms, and simulate bunkering transfer procedures.' }]
      }
    ],
    suggestedPerformanceTasks: [
      { title: 'Individual Task: Engine Room Piping System Diagram & Valve Line-Up', type: 'Individual', description: 'Trace and accurately label a complete cooling water or fuel oil supply manifold system.' },
      { title: 'Group Task: Machinery Space Emergency Response & Watch Simulation', type: 'Group', description: 'Simulate responding to an engine room alarm (high jacket water temp / low oil pressure) and safely executing corrective actions.' }
    ]
  },

  'mar-catering': {
    id: 'mar-catering',
    title: 'Ships Catering Services',
    sector: 'Maritime',
    cluster: 'Naval Operations & Engineering',
    gradeLevel: 'Grade 12',
    deliveryNote: 'Please note that each TechPro elective is completed within one term if delivered at Grade 12.',
    lastUpdated: 'April 28, 2026',
    contentStandards: [
      'Comprehensive knowledge of maritime regulatory frameworks (MLC 2006), environmental sustainability, cultural diversity, and catering operations.',
      'Understanding of ship provisioning and storage, mess hall operations, pantry and cabin housekeeping, and vessel sanitation.',
      'Understanding of victualing (budgeting and consumption management) and galley operations.',
      'Understanding of bakery and pastry production on board ships.'
    ],
    performanceStandards: [
      'The learners demonstrate waste disposal in compliance with MARPOL regulations.',
      'The learners perform food service in mess halls, pantry replenishment, and cabin housekeeping.',
      'The learners apply methods in preparing menus, victualing, and baking bread and pastries.'
    ],
    weeks: [
      {
        week: 'Weeks 1–4',
        learningCompetencies: ['Discuss maritime catering, MLC 2006, cultural diversity, MARPOL garbage disposal annexes, and ship provisioning inspection.'],
        suggestedActivities: [{ title: 'Maritime Food Safety (HACCP) & Galley Provisioning Storage', description: 'Organize dry store, chiller (0-4°C), and deep freezer (-18°C) following FIFO and stowage rules for rough seas.' }]
      },
      {
        week: 'Weeks 5–8',
        learningCompetencies: ['Mess hall table setting, food service, pantry replenishment, cabin housekeeping, and public area sanitation aboard vessels.'],
        suggestedActivities: [{ title: 'Crew Mess Hall Service & Storm-Proof Table Setting', description: 'Use wet tablecloth fiddles, secure plate rails, serve balanced seafarer meals, and clean cabins.' }]
      },
      {
        week: 'Weeks 9–11',
        learningCompetencies: ['Victualing budget calculation, recipe scaling for crew size, galley cooking methods, and maritime bread/pastry baking.'],
        suggestedActivities: [{ title: 'Crew Victualing Costing & Shipboard Bread Baking', description: 'Scale 30-day nutritionally balanced menu for 25 crew members and bake daily fresh rolls.' }]
      }
    ],
    suggestedPerformanceTasks: [
      { title: 'Individual Task: Ship Galley Food Preparation & Storm Safety', type: 'Individual', description: 'Cook a complete crew meal adhering to maritime galley safety and rough weather protocols.' },
      { title: 'Group Task: 30-Day Shipboard Victualing Plan & Provisioning Audit', type: 'Group', description: 'Calculate victualing allowance, create inventory stock sheets, and plan waste management under MARPOL.' }
    ]
  }
};
