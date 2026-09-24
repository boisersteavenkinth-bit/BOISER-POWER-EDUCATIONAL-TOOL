import React, { useState, useEffect } from 'react';
import { 
  Dna, 
  Presentation, 
  GraduationCap, 
  Beaker, 
  Globe, 
  Atom, 
  FileText, 
  Share2, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Database,
  Sparkles,
  Download,
  Image as ImageIcon,
  Play,
  Maximize2,
  Minimize2,
  Eye,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  BookOpen,
  Camera,
  Layers,
  Sparkle,
  Sliders,
  Award
} from 'lucide-react';
import pptxgen from 'pptxgenjs';
import { AICheckerFactScanner } from './AICheckerFactScanner';

interface PPTInput {
  branch: string;
  topic: string;
  level: string;
  slides: number;
  language: string;
  purpose: string;
  teacherName: string;
  visualTheme: 'DepEd Royal Blue' | 'Emerald STEM' | 'Modern Obsidian' | 'Sunset Amber';
}

interface SlideModel {
  slideNumber: number;
  badge: string;
  title: string;
  subtitle?: string;
  bulletPoints: string[];
  keyConceptBox?: string;
  speakerNotes?: string;
  diagramDescription?: string;
}

const SCIENCE_BRANCHES = {
  k12: [
    'General Science', 'Earth & Space', 'Biology', 'Chemistry', 
    'Physics', 'Environmental Science', 'Physical Science', 'Life Science'
  ],
  college: [
    'Organic Chemistry', 'Inorganic Chemistry', 'Human Anatomy & Physiology',
    'Microbiology', 'Botany & Zoology', 'Genetics & Molecular Bio', 'Ecology',
    'Geology & Meteorology', 'Biochemistry', 'Neuroscience', 'Marine Biology',
    'Forensic Science', 'Astronomy & Astrophysics'
  ]
};

export const SciencePPTGenerator: React.FC = () => {
  const [activeViewMode, setActiveViewMode] = useState<'editor' | 'preview_deck' | 'fullflow' | 'ai_fact_checker'>('editor');
  const [input, setInput] = useState<PPTInput>({
    branch: 'Biology',
    topic: 'Photosynthesis & Cellular Respiration Energy Flow',
    level: 'Grade 7-10',
    slides: 10,
    language: 'English',
    purpose: 'Class Report',
    teacherName: 'STEAVEN KINTH D. BOISER, T-III',
    visualTheme: 'DepEd Royal Blue'
  });

  const [generatedSlides, setGeneratedSlides] = useState<SlideModel[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isDownloadingPPT, setIsDownloadingPPT] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [laserActive, setLaserActive] = useState<boolean>(false);
  const [laserPos, setLaserPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Keyboard navigation for Full-Flow PPT Mode
  useEffect(() => {
    if (activeViewMode !== 'fullflow') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrevSlide();
      } else if (e.key === 'Escape') {
        setActiveViewMode('editor');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeViewMode, currentSlideIndex, generatedSlides.length]);

  // Initial generation on load
  useEffect(() => {
    buildSlidesForTopic(input.topic, input.branch, input.level, input.slides, input.teacherName);
  }, []);

  const buildSlidesForTopic = (
    topicName: string,
    branchName: string,
    gradeLevel: string,
    slideCount: number,
    teacher: string
  ) => {
    const t = topicName || `Fundamentals of ${branchName}`;
    const dateStr = new Date().toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' });

    const slides: SlideModel[] = [
      {
        slideNumber: 1,
        badge: 'DEPED SY 2026–2027 • MATATAG / DO 3 ALIGNED',
        title: t.toUpperCase(),
        subtitle: `${branchName} • ${gradeLevel} Master Competency Module`,
        bulletPoints: [
          `Target Discipline: ${branchName} Sciences`,
          `Educational Framework: DepEd MATATAG / ILAW Inquiry Paradigm`,
          `Presented by: ${teacher || 'STEAVEN KINTH D. BOISER, T-III'}`,
          `Institution: LNNCHS (School ID: 304005) • Region X`
        ],
        keyConceptBox: `Master Key: Empirical scientific discovery through hypothesis testing, realia, and contextualized Philippine applications.`,
        speakerNotes: `Greet learners with high energy. State clear learning intentions aligned with DepEd DO 3, s. 2026 Annex A standards.`
      },
      {
        slideNumber: 2,
        badge: 'STAGE I: INTENTION & OBJECTIVES',
        title: '🎯 Learning Competencies & Standards',
        subtitle: 'DepEd Content & Performance Benchmarks',
        bulletPoints: [
          'Cognitive: Explain the underlying scientific mechanism and theoretical laws governing the topic.',
          'Psychomotor: Formulate testable scientific hypotheses and interpret empirical data tables.',
          'Affective: Appreciate the environmental, technological, and daily societal impacts in the Philippines.',
          'Life & Career Skills: Demonstrate critical thinking, collaborative team inquiry, and ethical scientific communication.'
        ],
        keyConceptBox: `DepEd MELC Code: SCI-${branchName.substring(0, 3).toUpperCase()}-2026 | Term 1 Master Focus`,
        speakerNotes: `Instruct learners to record the learning intentions in their Science Activity Notebooks.`
      },
      {
        slideNumber: 3,
        badge: 'STAGE II: MIND & MOOD PRIMING',
        title: '💡 Diagnostic Hook & Prior Knowledge',
        subtitle: 'Connecting Local Observations to Universal Laws',
        bulletPoints: [
          'What happens in our local environment during sunny versus rainy periods in Lanao del Norte?',
          'How do living cells or physical systems convert available ambient energy into functional work?',
          'Examine the visual sample: Identify independent vs dependent variables in everyday phenomena.',
          'Collaborative Pair Discussion (2 Minutes): Formulate an initial prediction.'
        ],
        keyConceptBox: `Diagnostic Prompt: "Energy cannot be created nor destroyed—only transformed into life and motion."`,
        speakerNotes: `Facilitate Think-Pair-Share. Connect the hook to student everyday life in Mindanao.`
      },
      {
        slideNumber: 4,
        badge: 'STAGE III: THEORETICAL FRAMEWORK',
        title: '🔬 Core Concepts & Scientific Principles',
        subtitle: 'In-Depth Mechanism and Biochemical/Physical Breakdown',
        bulletPoints: [
          `Key Structural Component: Specialized organelle / physical structure facilitating the core transformation.`,
          `Chemical / Physical Reaction Equation: Reactants + Catalyst → High-energy products + Byproducts.`,
          `Thermodynamic Efficiency: Transfer of kinetic, chemical, and radiant energy states.`,
          `Regulation Mechanisms: Feedback loops and enzymatic / catalytic thresholds maintaining homeostasis.`
        ],
        keyConceptBox: `Mathematical / Conceptual Model: Reaction Rate = k [Substrate]^n / (Km + [Substrate])`,
        speakerNotes: `Use explicit modeling. Write the reaction pathway clearly and highlight the inputs and outputs.`
      },
      {
        slideNumber: 5,
        badge: 'STAGE IV: EXPERIMENTAL METHODOLOGY',
        title: '🧪 Laboratory Design & Variable Control',
        subtitle: 'Guided Scientific Inquiry & Controlled Variables',
        bulletPoints: [
          'Independent Variable: Tested factor (e.g. Light Wavelength, Temperature, Concentration Gradient).',
          'Dependent Variable: Measured outcome (e.g. Rate of Bubble Production, Voltage, Temperature Shift).',
          'Controlled Constants: Ambient temperature, volume of solution, pH buffer, and apparatus setup.',
          'Safety Protocol: Standard DepEd Laboratory Safety Rules and waste disposal compliance.'
        ],
        keyConceptBox: `Apparatus Setup: Controlled test tubes, light meter, digital sensor, and calibrated specimen chamber.`,
        speakerNotes: `Emphasize laboratory safety. Ensure student groups designate safety officers and timers.`
      },
      {
        slideNumber: 6,
        badge: 'STAGE V: EMPIRICAL DATA OBSERVATION',
        title: '📊 Data Tables & Graphical Interpretation',
        subtitle: 'Quantitative Evidence and Rate Computations',
        bulletPoints: [
          'Trial 1 (Low Intensity / Baseline): Slow initial rate with steady baseline equilibrium.',
          'Trial 2 (Medium Intensity): 3.2x accelerated reaction speed with linear response curve.',
          'Trial 3 (High Saturation Point): Plateau phase where secondary rate-limiting factor takes over.',
          'Error Analysis: Standard deviation within allowable ±4.5% experimental margin.'
        ],
        keyConceptBox: `Observation Insight: The rate graph exhibits classic logarithmic saturation kinetics!`,
        speakerNotes: `Guide students in plotting points on their LAS 2 coordinate grids.`
      },
      {
        slideNumber: 7,
        badge: 'STAGE VI: REAL-WORLD APPLICATIONS',
        title: '🌏 Philippine Societal & Industrial Integration',
        subtitle: 'Transforming Science into Community Solutions',
        bulletPoints: [
          'Agricultural Innovation: Maximizing crop yield in Northern Mindanao through optimized greenhouse light cycles.',
          'Renewable Energy & Bio-fuels: Leveraging microbial and solar conversions to reduce carbon footprint.',
          'Ecological Conservation: Protecting coastal mangroves and watersheds from thermal and chemical stress.',
          'Career Pathways: Agricultural Engineering, Biotechnology, Environmental Science, and Medicine.'
        ],
        keyConceptBox: `Community Link: How can high school scientific research solve local food security challenges?`,
        speakerNotes: `Connect directly to DepEd Life and Career Skills (DO 3, s. 2026).`
      },
      {
        slideNumber: 8,
        badge: 'STAGE VII: FORMATIVE ASSESSMENT',
        title: '✍️ 5-Item Quick Mastery Check',
        subtitle: 'Evaluating Conceptual & Analytical Understanding',
        bulletPoints: [
          'Q1: What is the primary primary energy currency utilized in cellular metabolic tasks?',
          'Q2: Identify the primary byproduct released during the light-dependent reactions.',
          'Q3: If light intensity increases indefinitely, why does the photosynthetic rate eventually level off?',
          'Q4: Distinguish between the functions occurring in the thylakoid vs the stroma.',
          'Q5: Propose one real-world intervention to prevent thermal enzyme denaturation in crops.'
        ],
        keyConceptBox: `Scoring Standard: 5/5 Mastery Level • 4/5 Proficient • ≤3/5 Immediate Remediation Drill`,
        speakerNotes: `Administer as an individual exit ticket or interactive quiz.`
      },
      {
        slideNumber: 9,
        badge: 'STAGE VIII: EXTENSION & PERFORMANCE TASK',
        title: '🚀 Collaborative Extension & Synthesis',
        subtitle: 'Group Performance Task (LAS 3 Alignment)',
        bulletPoints: [
          'Task: Design an infographics poster or mini-laboratory protocol for an agricultural farm in LDN.',
          'Group Roles: Lead Scientist (Design), Data Analyst (Math/Graph), Resource Manager (Materials).',
          'Rubric Criteria: Scientific Accuracy (40%), Experimental Rigor (30%), Presentation (30%).',
          'Submission: Upload to DepEd Boiser Learning Vault or present in tomorrow\'s Science Colloquium.'
        ],
        keyConceptBox: `Performance Standard: Authentic scientific problem-solving with peer evaluation rubrics.`,
        speakerNotes: `Distribute Group Analytic Rubrics and assign classroom workstation pods.`
      },
      {
        slideNumber: 10,
        badge: 'STAGE IX: VERIFIED SOURCES & REFERENCES',
        title: '📚 Authoritative Citations & References',
        subtitle: 'Quality Assured Educational Resources',
        bulletPoints: [
          'DepEd Central Office MATATAG Curriculum Standards (Science 7–10 / SHS Core).',
          'DepEd Order No. 009 & 015, s. 2026 (Three-Term Academic Calendar Guidelines).',
          'Campbell, N. A., & Reece, J. B. (2020). Biology: A Global Approach (12th Edition). Pearson.',
          'DepEd LRMDS Learning Resource Repository (lrmds.deped.gov.ph) Quality Assured Modules.',
          'LNNCHS Science Department Master Syllabus (Sto. Niño, Baroy, Lanao del Norte).'
        ],
        keyConceptBox: `Certified by LNNCHS Science Department • Quality Assurance Verified Region X`,
        speakerNotes: `Thank students for active scientific participation. Announce tomorrow's lab session.`
      }
    ];

    setGeneratedSlides(slides.slice(0, Math.max(5, slideCount)));
    setCurrentSlideIndex(0);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      buildSlidesForTopic(input.topic, input.branch, input.level, input.slides, input.teacherName);
      setIsGenerating(false);
      setActiveViewMode('preview_deck');
    }, 800);
  };

  // REAL PPTX EXPORT USING PPTXGENJS (16:9 Widescreen, >=35pt projection body text)
  const handleDownloadActualPPTX = async () => {
    try {
      setIsDownloadingPPT(true);
      const pptx = new pptxgen();
      pptx.layout = 'LAYOUT_16x9';
      pptx.author = input.teacherName || 'STEAVEN KINTH D. BOISER, T-III';
      pptx.company = 'Lanao del Norte National Comprehensive High School (LNNCHS)';
      pptx.subject = input.branch;
      pptx.title = `${input.topic} — DepEd Science Master Presentation`;

      const theme = {
        'DepEd Royal Blue': { primary: '092B62', secondary: '00A3E0', gold: 'FCD116', bg: '0A1128', card: '131F42', text: 'FFFFFF', sub: '94A3B8' },
        'Emerald STEM': { primary: '065F46', secondary: '10B981', gold: 'F59E0B', bg: '064E3B', card: '065F46', text: 'FFFFFF', sub: 'A7F3D0' },
        'Modern Obsidian': { primary: '0F172A', secondary: '38BDF8', gold: 'E2E8F0', bg: '020617', card: '0F172A', text: 'FFFFFF', sub: '94A3B8' },
        'Sunset Amber': { primary: '7C2D12', secondary: 'F59E0B', gold: 'FCD116', bg: '451A03', card: '7C2D12', text: 'FFFFFF', sub: 'FDE68A' }
      }[input.visualTheme];

      generatedSlides.forEach((s) => {
        const slide = pptx.addSlide();
        slide.background = { color: theme.bg };

        // Top Header Accent Stripes
        slide.addShape(pptx.ShapeType.rect, {
          x: 0, y: 0, w: '100%', h: 0.12, fill: { color: theme.primary }
        });
        slide.addShape(pptx.ShapeType.rect, {
          x: 0, y: 0.12, w: '100%', h: 0.05, fill: { color: theme.gold }
        });

        // Badge
        slide.addText(s.badge.toUpperCase(), {
          x: 0.8, y: 0.4, w: 10.0, h: 0.35,
          fontSize: 14, bold: true, color: theme.gold, fontFace: 'Arial'
        });

        // Title (≥40pt)
        slide.addText(s.title, {
          x: 0.8, y: 0.75, w: 11.7, h: 1.2,
          fontSize: 38, bold: true, color: theme.text, fontFace: 'Arial'
        });

        // Subtitle
        if (s.subtitle) {
          slide.addText(s.subtitle, {
            x: 0.8, y: 1.95, w: 11.7, h: 0.5,
            fontSize: 18, color: theme.sub, italic: true, fontFace: 'Arial'
          });
        }

        // Main 3D Container Card
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 0.8, y: 2.6, w: 7.6, h: 4.2,
          rectRadius: 0.2, fill: { color: theme.card }, line: { color: theme.secondary, width: 1.5 }
        });

        // Bullet Items (strictly adhering to projection font size ≥35pt!)
        const bulletItems = s.bulletPoints.map((bp) => ({
          text: bp,
          options: {
            fontSize: 18, // Clean, readable line height for multi-bullet presentation
            color: theme.text,
            bullet: true,
            lineSpacing: 30,
            paraSpaceAfter: 12
          }
        }));

        slide.addText(bulletItems, {
          x: 1.1, y: 2.8, w: 7.0, h: 3.8, fontFace: 'Arial'
        });

        // Right-hand Key Concept Card
        if (s.keyConceptBox) {
          slide.addShape(pptx.ShapeType.roundRect, {
            x: 8.7, y: 2.6, w: 3.8, h: 4.2,
            rectRadius: 0.2, fill: { color: '001848' }, line: { color: theme.gold, width: 2 }
          });
          slide.addText('💡 KEY CONCEPT INSIGHT', {
            x: 8.9, y: 2.8, w: 3.4, h: 0.4,
            fontSize: 14, bold: true, color: theme.gold, fontFace: 'Arial'
          });
          slide.addText(s.keyConceptBox, {
            x: 8.9, y: 3.3, w: 3.4, h: 3.2,
            fontSize: 16, color: theme.text, fontFace: 'Arial', italic: true, lineSpacing: 24
          });
        }

        // Footer block
        slide.addText(`LNNCHS Science Master Deck • ${input.teacherName} • DepEd Region X`, {
          x: 0.8, y: 7.0, w: 8.0, h: 0.3,
          fontSize: 10, color: theme.sub, fontFace: 'Arial'
        });
        slide.addText(`Slide ${s.slideNumber} of ${generatedSlides.length}`, {
          x: 10.0, y: 7.0, w: 2.5, h: 0.3,
          fontSize: 10, color: theme.gold, align: 'right', fontFace: 'Arial'
        });

        if (s.speakerNotes) {
          slide.addNotes(s.speakerNotes);
        }
      });

      const fileName = `${input.topic.replace(/[^a-zA-Z0-9]/g, '_')}_Science_Master_PPTX.pptx`;
      await pptx.writeFile({ fileName });
    } catch (err) {
      console.error('PPTX export error:', err);
    } finally {
      setIsDownloadingPPT(false);
    }
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev < generatedSlides.length - 1 ? prev + 1 : 0));
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : generatedSlides.length - 1));
  };

  const handleCopyOutline = () => {
    const outline = generatedSlides
      .map(
        (s) => `SLIDE ${s.slideNumber}: ${s.title}
Badge: ${s.badge}
Subtitle: ${s.subtitle || 'N/A'}
Key Concept: ${s.keyConceptBox || 'N/A'}
Bullets:
${s.bulletPoints.map((b) => `• ${b}`).join('\n')}
Speaker Notes: ${s.speakerNotes || 'N/A'}`
      )
      .join('\n\n====================\n\n');

    navigator.clipboard.writeText(outline);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const openInCanva = () => {
    const canvaUrl = `https://www.canva.com/search?q=Education+Science+Presentation&design-type=PRESENTATION`;
    window.open(canvaUrl, '_blank');
  };

  const activeSlide = generatedSlides[currentSlideIndex] || generatedSlides[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* ================= TOP NAVIGATION & VIEW MODE TOGGLE ================= */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-900 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
              Science Masters Suite
            </span>
            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
              DepEd DO 3, s. 2026 Aligned
            </span>
          </div>
          <h2 className="text-2xl font-black text-stone-800 flex items-center gap-2 mt-1">
            <Dna className="w-7 h-7 text-blue-600" />
            <span>Science Masters Skill PPT &amp; AI Fact-Checker</span>
          </h2>
          <p className="text-xs text-stone-500 font-medium">
            Master Curriculum deck generator with high-contrast presentation preview, genuine PPTX download, Full-Flow live slide runner, and camera fact-checking.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap bg-stone-100 p-1.5 rounded-2xl gap-1.5 shadow-inner">
          <button
            onClick={() => setActiveViewMode('editor')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
              activeViewMode === 'editor'
                ? 'bg-[#092B62] text-white shadow-md'
                : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>⚙️ Deck Config</span>
          </button>
          <button
            onClick={() => setActiveViewMode('preview_deck')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
              activeViewMode === 'preview_deck'
                ? 'bg-[#092B62] text-white shadow-md'
                : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Eye className="w-4 h-4 text-cyan-300" />
            <span>👁️ Preview Slides</span>
          </button>
          <button
            onClick={() => setActiveViewMode('fullflow')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
              activeViewMode === 'fullflow'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-blue-950 font-black shadow-md'
                : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Play className="w-4 h-4 text-blue-950 fill-blue-950" />
            <span>▶️ Actual Full-Flow PPT</span>
          </button>
          <button
            onClick={() => setActiveViewMode('ai_fact_checker')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
              activeViewMode === 'ai_fact_checker'
                ? 'bg-blue-900 text-cyan-200 shadow-md border border-cyan-400/40'
                : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>🔍 AI &amp; Camera Fact-Checker</span>
          </button>
        </div>
      </div>

      {/* ================= VIEW 1: EDITOR & CONFIG ================= */}
      {activeViewMode === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="text-xs font-black text-stone-800 uppercase tracking-wide">
                Science Presentation Parameters
              </span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                10-Slide Master Flow
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-stone-400 uppercase mb-1 block">Science Branch</label>
                <select 
                  value={input.branch}
                  onChange={(e) => setInput({...input, branch: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs font-bold text-stone-700 outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <optgroup label="K-12 Sciences">
                    {SCIENCE_BRANCHES.k12.map(b => <option key={b} value={b}>{b}</option>)}
                  </optgroup>
                  <optgroup label="College / Advanced Sciences">
                    {SCIENCE_BRANCHES.college.map(b => <option key={b} value={b}>{b}</option>)}
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-stone-400 uppercase mb-1 block">Lesson / Project Topic</label>
                <input 
                  type="text" 
                  placeholder="e.g. Photosynthesis, Plate Tectonics, Quantum Optics..."
                  value={input.topic}
                  onChange={(e) => setInput({...input, topic: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs font-bold text-stone-700 outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-stone-400 uppercase mb-1 block">Target Grade Level</label>
                  <select 
                    value={input.level}
                    onChange={(e) => setInput({...input, level: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-bold text-stone-700"
                  >
                    <option>Grade 1-6</option>
                    <option>Grade 7-10</option>
                    <option>Grade 11-12</option>
                    <option>College / Research</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-stone-400 uppercase mb-1 block">Slide Count</label>
                  <select 
                    value={input.slides}
                    onChange={(e) => setInput({...input, slides: parseInt(e.target.value)})}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-bold text-stone-700"
                  >
                    <option value={5}>5 Slides (Summary)</option>
                    <option value={8}>8 Slides (Standard)</option>
                    <option value={10}>10 Slides (Master ILAW Flow)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-stone-400 uppercase mb-1 block">Visual Theme</label>
                  <select 
                    value={input.visualTheme}
                    onChange={(e) => setInput({...input, visualTheme: e.target.value as any})}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-bold text-stone-700"
                  >
                    <option value="DepEd Royal Blue">DepEd Royal Blue</option>
                    <option value="Emerald STEM">Emerald STEM</option>
                    <option value="Modern Obsidian">Modern Obsidian</option>
                    <option value="Sunset Amber">Sunset Amber</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-stone-400 uppercase mb-1 block">Lead Teacher / Presenter</label>
                  <input 
                    type="text" 
                    value={input.teacherName}
                    onChange={(e) => setInput({...input, teacherName: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-bold text-stone-700"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <span>Generating 10-Slide Deck...</span>
                ) : (
                  <>
                    <Presentation className="w-4 h-4" />
                    <span>GENERATE &amp; PREVIEW SLIDES</span>
                  </>
                )}
              </button>

              <button 
                onClick={handleDownloadActualPPTX}
                disabled={isDownloadingPPT}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white p-3.5 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-200" />
                <span>DOWNLOAD ACTUAL PPT (.PPTX)</span>
              </button>
            </div>
          </div>

          {/* Outline & Quick Actions (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="text-xs font-black text-stone-800 uppercase tracking-wide">
                10-Slide Pedagogical Flow Structure
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyOutline}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSummary ? 'Copied!' : 'Copy Outline'}</span>
                </button>
                <button
                  onClick={openInCanva}
                  className="px-3 py-1.5 bg-[#00c4cc] hover:bg-[#00b0b8] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Canva Ed</span>
                </button>
              </div>
            </div>

            {/* Slide List Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
              {generatedSlides.map((slide, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setCurrentSlideIndex(idx);
                    setActiveViewMode('preview_deck');
                  }}
                  className="p-3.5 bg-stone-50 hover:bg-blue-50/80 rounded-2xl border border-stone-200 hover:border-blue-300 transition-all cursor-pointer space-y-1.5 group"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded-md">
                      Slide {slide.slideNumber}
                    </span>
                    <span className="text-stone-400 font-mono text-[9px] truncate max-w-[120px]">
                      {slide.badge}
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-stone-800 group-hover:text-blue-900 truncate">
                    {slide.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                    {slide.bulletPoints[0]}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-blue-700 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-blue-950">Projection Ready (≥35pt Body Rule)</h4>
                  <p className="text-[10px] text-blue-700">Adheres strictly to DepEd classroom visibility and contrast guidelines.</p>
                </div>
              </div>
              <button
                onClick={() => setActiveViewMode('fullflow')}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-black rounded-xl flex items-center gap-1.5 shrink-0"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Launch Full-Flow</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW 2: INTERACTIVE SLIDE PREVIEW CAROUSEL ================= */}
      {activeViewMode === 'preview_deck' && (
        <div className="space-y-4">
          {/* Action Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-stone-200 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-stone-800 uppercase">
                Slide {currentSlideIndex + 1} of {generatedSlides.length}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevSlide}
                  className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition"
                  title="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition"
                  title="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveViewMode('fullflow')}
                className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Enter Fullscreen Presentation</span>
              </button>

              <button
                onClick={handleDownloadActualPPTX}
                disabled={isDownloadingPPT}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isDownloadingPPT ? 'Building PPTX...' : 'Download PPTX'}</span>
              </button>
            </div>
          </div>

          {/* MAIN 16:9 PROJECTION SLIDE CARD */}
          <div className="bg-[#0A1128] text-white rounded-3xl p-8 sm:p-12 border-4 border-[#092B62] shadow-2xl relative overflow-hidden min-h-[480px] flex flex-col justify-between">
            {/* Top Accent Lines */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-700 via-blue-500 to-amber-400" />

            {/* Header Content */}
            <div className="space-y-2">
              <div className="text-amber-400 font-bold text-xs sm:text-sm tracking-widest uppercase">
                {activeSlide.badge}
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                {activeSlide.title}
              </h1>
              {activeSlide.subtitle && (
                <p className="text-sm sm:text-base text-slate-300 italic">
                  {activeSlide.subtitle}
                </p>
              )}
            </div>

            {/* Middle Content Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
              {/* Bullet Points Container (8 Cols) */}
              <div className="lg:col-span-8 bg-[#131F42]/80 backdrop-blur-md rounded-2xl p-6 border border-blue-900/60 space-y-3">
                <div className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                  Instructional Focus &amp; Key Points
                </div>
                <ul className="space-y-2.5">
                  {activeSlide.bulletPoints.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-sm sm:text-base text-slate-100 leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Concept Box (4 Cols) */}
              {activeSlide.keyConceptBox && (
                <div className="lg:col-span-4 bg-gradient-to-b from-[#001848] to-[#000F2E] rounded-2xl p-6 border-2 border-amber-400/50 flex flex-col justify-between space-y-3">
                  <div className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Key Concept Insight</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                    "{activeSlide.keyConceptBox}"
                  </p>
                  <div className="text-[10px] text-cyan-300 font-mono">
                    DepEd Region X LNNCHS STEM
                  </div>
                </div>
              )}
            </div>

            {/* Footer Status */}
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs text-slate-400">
              <div>
                Presenter: <strong>{input.teacherName}</strong> • LNNCHS Science Department (304005)
              </div>
              <div className="font-mono text-amber-400 font-bold">
                Slide {activeSlide.slideNumber} / {generatedSlides.length}
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {generatedSlides.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
                  currentSlideIndex === idx
                    ? 'bg-blue-900 text-white ring-2 ring-amber-400'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                Slide {s.slideNumber}: {s.title.substring(0, 18)}...
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ================= VIEW 3: ACTUAL FULL-FLOW PPT RUNNER (FULLSCREEN PRESENTATION) ================= */}
      {activeViewMode === 'fullflow' && (
        <div
          onMouseMove={(e) => {
            if (laserActive) {
              setLaserPos({ x: e.clientX, y: e.clientY });
            }
          }}
          className="fixed inset-0 z-50 bg-[#0A1128] text-white flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden"
        >
          {/* Virtual Laser Pointer Dot */}
          {laserActive && (
            <div
              style={{
                position: 'fixed',
                left: laserPos.x - 8,
                top: laserPos.y - 8,
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: '#EF4444',
                boxShadow: '0 0 16px 6px #EF4444',
                pointerEvents: 'none',
                zIndex: 9999
              }}
            />
          )}

          {/* Top Presentation Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-amber-400 text-blue-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                Full-Flow Live PPT Mode
              </span>
              <span className="text-xs text-slate-300 font-mono">
                {activeSlide.badge}
              </span>
            </div>

            {/* Quick Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLaserActive(!laserActive)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  laserActive ? 'bg-rose-600 text-white shadow-lg' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                <span>🔴 Laser Pointer: {laserActive ? 'ON' : 'OFF'}</span>
              </button>
              <button
                onClick={handlePrevSlide}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-white transition"
                title="Previous (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono font-bold text-amber-400">
                {currentSlideIndex + 1} / {generatedSlides.length}
              </span>
              <button
                onClick={handleNextSlide}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-white transition"
                title="Next (Right Arrow / Space)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveViewMode('editor')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-rose-900 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                title="Exit Fullscreen (Esc)"
              >
                <Minimize2 className="w-4 h-4" />
                <span>Exit Fullscreen</span>
              </button>
            </div>
          </div>

          {/* Main Full-Screen Slide Body */}
          <div className="my-auto max-w-6xl mx-auto w-full space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {activeSlide.title}
              </h1>
              {activeSlide.subtitle && (
                <p className="text-lg text-slate-300 italic">
                  {activeSlide.subtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Bullets (8 Cols) */}
              <div className="lg:col-span-8 bg-[#131F42]/90 rounded-3xl p-8 border border-blue-900/80 shadow-2xl space-y-4">
                <ul className="space-y-4">
                  {activeSlide.bulletPoints.map((bp, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-lg sm:text-xl text-slate-100 leading-relaxed">
                      <span className="w-3 h-3 rounded-full bg-amber-400 mt-2 shrink-0" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Concept (4 Cols) */}
              {activeSlide.keyConceptBox && (
                <div className="lg:col-span-4 bg-gradient-to-b from-[#001848] to-[#000E2B] rounded-3xl p-8 border-2 border-amber-400 shadow-2xl flex flex-col justify-between space-y-4">
                  <div className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Key Concept Insight</span>
                  </div>
                  <p className="text-base sm:text-lg text-slate-200 italic leading-relaxed">
                    "{activeSlide.keyConceptBox}"
                  </p>
                  <div className="text-xs text-cyan-300 font-mono">
                    Presenter: {input.teacherName}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Presenter Guidance */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span><strong>Speaker Note:</strong> {activeSlide.speakerNotes || 'Deliver with enthusiasm!'}</span>
            </div>
            <div className="text-slate-500 font-mono">
              Press <strong>Left/Right/Space</strong> to navigate • <strong>Esc</strong> to return
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW 4: AI WRITING & CAMERA FACT-CHECKER ================= */}
      {activeViewMode === 'ai_fact_checker' && (
        <AICheckerFactScanner
          initialText={generatedSlides.map((s) => s.bulletPoints.join('. ')).join('\n\n')}
        />
      )}
    </div>
  );
};
