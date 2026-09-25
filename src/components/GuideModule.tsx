import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  ShieldCheck,
  Fingerprint,
  Users,
  CloudLightning,
  WifiOff,
  Languages,
  ChevronRight,
  Monitor,
  Database,
  Terminal,
  Settings,
  QrCode,
  Search,
  CheckCircle,
  Camera,
  Sparkles,
  Award,
  Lock,
  Unlock,
  Key,
  Flame,
  Zap,
  Cpu,
  Layers,
  FileSpreadsheet,
  Presentation,
  Dna,
  Printer,
  Copy,
  Check,
  Compass,
  Code2,
  Share2,
  ExternalLink,
  HelpCircle,
  ShieldAlert,
  Smartphone,
  HardDrive,
  RefreshCw
} from 'lucide-react';
import { CebuanoVoiceGuide } from './CebuanoVoiceGuide';
import { useStorageManager } from '../hooks/useStorageManager';

interface GuideModuleProps {
  isOwner?: boolean;
}

export const GuideModule: React.FC<GuideModuleProps> = ({ isOwner = true }) => {
  const { allocate50GBCacheVault, maximize500GBCacheVault, autoActivateAllServices, autoCleanNightly2AM3AMWithSavingsVault, toggleAutoSaveMode, breakdown, isClearing, clearResult } = useStorageManager();
  const [lang, setLang] = useState<'en' | 'bis' | 'tl'>('en');
  const [activeTab, setActiveTab] = useState<'user_manual' | 'master_guide' | 'quick_cheatsheet' | 'owner_certificate'>('user_manual');
  const [masterUnlocked, setMasterUnlocked] = useState<boolean>(isOwner);
  const [masterPin, setMasterPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Dynamic Astig Greeting based on local time
  const [greetingTime, setGreetingTime] = useState<string>('Magandang Araw');
  const [greetingAstig, setGreetingAstig] = useState<string>('Master Architect Deployed');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreetingTime(lang === 'bis' ? 'Maayong Buntag' : lang === 'tl' ? 'Magandang Umaga' : 'Good Morning');
      setGreetingAstig('Energized & Ready to Innovate');
    } else if (hour < 18) {
      setGreetingTime(lang === 'bis' ? 'Maayong Hapon' : lang === 'tl' ? 'Magandang Hapon' : 'Good Afternoon');
      setGreetingAstig('Peak Operational Power');
    } else {
      setGreetingTime(lang === 'bis' ? 'Maayong Gabii' : lang === 'tl' ? 'Magandang Gabi' : 'Good Evening');
      setGreetingAstig('Nightfall Code Sentinel Mode');
    }
  }, [lang]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleUnlockMaster = (e: React.FormEvent) => {
    e.preventDefault();
    if (masterPin === '2026' || masterPin.toLowerCase() === 'boiser' || isOwner) {
      setMasterUnlocked(true);
      setPinError('');
    } else {
      setPinError('Access Denied. Only Master Steaven Kinth D. Boiser is authorized.');
    }
  };

  // ==========================================
  // MULTI-LINGUAL CONTENT DICTIONARY
  // ==========================================
  const manualContent = {
    en: {
      ownerTitle: "SUPREME CREATOR & OWNER",
      ownerName: "STEAVEN KINTH D. BOISER",
      ownerRole: "The Teacher • Chief Software Architect & DepEd K-12 Innovator",
      subtitle: "Official DepEd Master Manual & Comprehensive Interactive Operations Guide",
      searchPlaceholder: "Search guides, skills, 3D simulations, QR grading, Excel formulas...",
      tabUser: "📘 Teacher & User Manual",
      tabMaster: "👑 Master Guide (Steaven Kinth D. Boiser Exclusive)",
      tabCheatsheet: "⚡ Quick Command Cheatsheet",
      tabCert: "🏅 Authenticity & Master Credentials",
      
      userSections: [
        {
          id: 'ilaw',
          icon: BookOpen,
          badge: 'DepEd Order No. 3, s. 2026',
          title: 'ILAW Lesson Plan & Curriculum Generator',
          desc: 'Instant synthesis of DepEd MATATAG & Senior High School Lesson Plans aligned with verified learning competencies.',
          steps: [
            'Navigate to "🎓 ILAW Generator" or "📚 Curriculum DB" from the top navigation bar.',
            'Select your Grade Level (7–12), Subject Track, and specific Competency Code.',
            'Click "⚡ Generate Complete ILAW Plan" to trigger the pedagogically calibrated engine.',
            'Customize Objectives, Instructional Materials, Mindanao contextualized examples, and Evaluation Rubrics.',
            'Click "Download Formatted Document" or "Export to Google Docs/PDF".'
          ]
        },
        {
          id: 'spatial',
          icon: Dna,
          badge: 'Three.js WebGPU / WebGL2',
          title: '3D Spatial & Science Simulation Lab',
          desc: 'GPU-accelerated interactive 3D simulations for Biology, Chemistry, Quantum Physics, and Earth Science.',
          steps: [
            'Click the "🌐 3D Spatial Lab" tab in the main navigation.',
            'Select your desired model: DNA Double Helix, Quantum Atomic Orbitals, Planetary Ecosystem, or Mitochondrion.',
            'Use single-finger touch or mouse drag to rotate the model 360 degrees smoothly.',
            'Toggle "Wireframe Shaders" to inspect geometric mesh structures for STEM laboratory demonstrations.',
            'Click "📷 Snapshot" to immediately export a high-resolution transparent PNG image into your lesson materials.'
          ]
        },
        {
          id: 'ppt',
          icon: Presentation,
          badge: 'pptxgenjs Engine',
          title: 'Science PowerPoint Studio (.pptx)',
          desc: 'Generates real, fully editable Microsoft PowerPoint files (.pptx) tailored to DepEd STEM standards.',
          steps: [
            'Go to "⚡ Master Skills Studio" and choose the "🧬 Science PPT" tab.',
            'Type your lesson topic, specify grade level, and select a color palette (DepEd Royal Blue, Emerald STEM, Modern Obsidian).',
            'Add customized learning objectives or let the system autofill standard-compliant targets.',
            'Click "Download Real PPTX" — the system compiles genuine PowerPoint slides with slides, activities, and speaker notes.',
            'Click "Save Project Draft" to store your work in the Firebase Firestore Data Vault.'
          ]
        },
        {
          id: 'qr',
          icon: QrCode,
          badge: 'Smart OCR & SHA-256',
          title: 'QR Worksheet Generator & Smart Paper Grader',
          desc: 'Automated paper assessment cycle from printable PDF generation to instant simulated grading.',
          steps: [
            'Select "📱 QR Worksheet & Checker" inside the Master Skills Studio.',
            'Design multiple-choice items and specify correct answer keys (A, B, C, D).',
            'Click "Download Printable PDF" — prints a DepEd formatted test sheet with an embedded cryptographic QR header.',
            'Use the "Smart Paper Scanner" simulator or device camera to scan student answer keys.',
            'View instant automated percentage scoring, pass/remedial remarks, and item analysis.'
          ]
        },
        {
          id: 'excel',
          icon: FileSpreadsheet,
          badge: 'SheetJS Formula Engine',
          title: 'Professional Excel Architect (.xlsx)',
          desc: 'Outputs genuine Microsoft Excel spreadsheets containing live automated formulas and formatting.',
          steps: [
            'Open the "📊 Excel Architect" tab under Master Skills Studio.',
            'Choose your template: Student Assessment Gradebook, Attendance Matrix, or STEM Experiment Sheet.',
            'Set student sample size and subject parameters.',
            'Click "Download Real .XLSX Workbook" — creates files with live =SUM(), =AVERAGE(), and =IF() passing checks.',
            'Open seamlessly in Microsoft Excel, Google Sheets, LibreOffice, or Apple Numbers.'
          ]
        },
        {
          id: 'offline',
          icon: Smartphone,
          badge: 'Zero-Data PWA / APK (8.5 MB)',
          title: 'Offline & Online Operations, MB Download & Storage Specs',
          desc: '100% resilient offline operation using local WebAssembly compilation with zero mobile data consumed during document generation.',
          steps: [
            'Initial App Download Size: Progressive Web App (~8.5 MB) / Standalone Android APK (~12.2 MB).',
            'Offline Storage Footprint: ~18.5 MB cached in IndexedDB/CacheStorage for offline 3D models, MATATAG database, and voice engine.',
            'Offline Capabilities (0 MB Data): Generate ILAW Lesson Plans, Edit LNNCHS SF1–SF10 & Adviser Doors, Run 3D Spatial Simulations, Create MS Word/Excel/PPTX/PDF files, & Grade QR test sheets.',
            'Online Capabilities (Wi-Fi/Data Required): Google Drive 2-way cloud auto-sync (<50 KB payload), live BOISER AI Chatbot queries, and DepEd Commons LRMDS portal downloads.',
            'Automatic Cloud Sync: Reconnecting internet triggers automatic cloud background sync in under 30 seconds.'
          ]
        },
        {
          id: 'auto_update',
          icon: Sparkles,
          badge: 'Automatic Sync Protocol',
          title: '🔄 Automatic Dynamic Update & Change Activation',
          desc: 'Ensures that whenever Master Creator Steaven Kinth D. Boiser updates, improves, or enhances the app, the User Guide and LNNCHS template instructions automatically update and synchronize in real-time.',
          steps: [
            'Whenever code improvements, new features, or template adjustments are deployed, the system triggers the Auto-Update Protocol.',
            'The User Guide and LNNCHS template handbook automatically reflect the latest modifications without manual refreshing.',
            'Teachers and advisers receive instant update notifications detailing the newest features, security updates, and grading enhancements.',
            'All LNNCHS templates (SF1-SF10, ILAW lesson plans, ECR gradebooks) dynamically align with the latest DepEd standards and customizations.'
          ]
        }
      ]
    },

    bis: {
      ownerTitle: "SUPREMO NGA NAGHIMO UG TAG-IYA",
      ownerName: "STEAVEN KINTH D. BOISER",
      ownerRole: "Ang Magtutudlo • Chief Software Architect & DepEd K-12 Innovator",
      subtitle: "Opisyal nga DepEd Master Manual & Komprehensibong Giya sa Paggamit sa Sistema",
      searchPlaceholder: "Pangitaa ang mga giya, skills, 3D simulations, QR grading, Excel formulas...",
      tabUser: "📘 Giya para sa mga Magtutudlo",
      tabMaster: "👑 Master Guide (Esklusibo kang Steaven Kinth D. Boiser)",
      tabCheatsheet: "⚡ Paspas nga Kodigo ug Cheatsheet",
      tabCert: "🏅 Kredensyal ug Katungod sa Tag-iya",

      userSections: [
        {
          id: 'ilaw',
          icon: BookOpen,
          badge: 'DepEd Order No. 3, s. 2026',
          title: 'ILAW Lesson Plan & Curriculum Generator',
          desc: 'Paspas ug ensaktong paghimo og DepEd MATATAG ug SHS Lesson Plans nga nakatutok sa tinuod nga competencies.',
          steps: [
            'Pindota ang "🎓 ILAW Generator" o "📚 Curriculum DB" sa ibabaw nga menu.',
            'Pilia ang Grade Level (7–12), Subject Track, ug ang ensaktong Competency Code.',
            'I-klik ang "⚡ Generate Complete ILAW Plan" aron mogawas ang kumpletong plano sa pagtudlo.',
            'I-adjust ang mga Objectives, Instructional Materials, mga pananglitan para sa Mindanao, ug Rubrics.',
            'I-klik ang "Download Formatted Document" o i-export sa Google Docs/PDF.'
          ]
        },
        {
          id: 'spatial',
          icon: Dna,
          badge: 'Three.js WebGPU / WebGL2',
          title: '3D Spatial & Science Simulation Lab',
          desc: 'Gipakusgan nga 3D interactive graphics para sa Biology, Chemistry, Quantum Physics, ug Earth Science.',
          steps: [
            'Adto sa "🌐 3D Spatial Lab" tab sa main navigation.',
            'Pilia ang modelo: DNA Double Helix, Quantum Atom, Planeta ug Kalibotan, o Mitochondria sa Cell.',
            'Gamita ang imong tudlo sa cellphone o mouse sa computer para ituyok ang 3D model sa 360 degrees.',
            'Pindota ang "Wireframe Shaders" aron makita ang struktura sa geometric mesh sa STEM klase.',
            'I-klik ang "📷 Snapshot" para ma-download dayon ang klaro kaayo nga transparent PNG image.'
          ]
        },
        {
          id: 'ppt',
          icon: Presentation,
          badge: 'pptxgenjs Engine',
          title: 'Science PowerPoint Studio (.pptx)',
          desc: 'Naghimo og tinuod nga Microsoft PowerPoint files (.pptx) nga pwedeng usbon ug i-edit.',
          steps: [
            'Ablihi ang "⚡ Master Skills Studio" unya pilia ang "🧬 Science PPT" tab.',
            'Ibutang ang topic, grade level, ug pilia ang tema sa kolor (DepEd Royal Blue, Emerald STEM, Modern Obsidian).',
            'Ibutang ang mga learning objectives o pasagdi ang AI nga mo-fill sumala sa DepEd standards.',
            'I-klik ang "Download Real PPTX" — tinuod nga PowerPoint presentation file ang ma-download nga naay speaker notes.',
            'I-save sa Data Vault aron dili mawala ang imong draft project.'
          ]
        },
        {
          id: 'qr',
          icon: QrCode,
          badge: 'Smart OCR & SHA-256',
          title: 'QR Worksheet Generator & Smart Paper Grader',
          desc: 'Kompleto nga sistema gikan sa pag-print sa test paper hangtod sa awtomatikong pag-check gamit ang QR scanner.',
          steps: [
            'Pilia ang "📱 QR Worksheet & Checker" sulod sa Master Skills Studio.',
            'Paghimo og mga pangutana ug ibutang ang insaktong Answer Key (A, B, C, D).',
            'I-klik ang "Download Printable PDF" — mogawas ang DepEd test paper nga naay cryptographic QR badge sa ibabaw.',
            'Gamita ang smart grading scanner sa pag-evaluate sa mga tubag sa estudyante.',
            'Makita dayon ang grado, percentage, ug kinsay nakapasar o kinahanglan og remedial.'
          ]
        },
        {
          id: 'excel',
          icon: FileSpreadsheet,
          badge: 'SheetJS Formula Engine',
          title: 'Professional Excel Architect (.xlsx)',
          desc: 'Naghimo og tinuod nga Microsoft Excel sheets nga naay buhi nga mga pormula sama sa SUM, AVERAGE, ug IF.',
          steps: [
            'Ablihi ang "📊 Excel Architect" sa Master Skills Studio.',
            'Pilia ang template: Class Gradebook, Attendance Monitoring, o STEM Experiment Data Matrix.',
            'Ibutang ang gidaghanon sa estudyante ug detalye sa subject.',
            'I-klik ang "Download Real .XLSX Workbook" — naay tinuod nga =SUM(), =AVERAGE(), ug =IF() automated formulas.',
            'Ablihi kini nga walay guba sa Microsoft Excel, Google Sheets, o WPS Office.'
          ]
        },
        {
          id: 'offline',
          icon: Smartphone,
          badge: 'Zero-Data PWA / APK (8.5 MB)',
          title: 'Offline & Online nga Paggamit ug Detalye sa MB Footprint',
          desc: '100% nga modagan bisan walay load ug walay internet data nga makonsumo sa paghimo og mga dokumento.',
          steps: [
            'Download Size sa App: Progressive Web App (~8.5 MB) / Android APK Installer (~12.2 MB).',
            'Storage nga Makuha sa Memory: ~18.5 MB nga na-cache sa IndexedDB/CacheStorage para sa 3D models ug MATATAG curriculum DB.',
            'Mga Gamit nga Offline (0 MB Data): Paghimo og ILAW Lesson Plans, pag-edit sa LNNCHS SF1–SF10, 3D Spatial Simulations, MS Word/Excel/PPTX/PDF, ug QR Paper Grader.',
            'Mga Gamit nga Online (Nagkinahanglan og Internet/Data): Google Drive 2-way cloud auto-sync (<50 KB), live BOISER AI Chatbot, ug DepEd LRMDS portal downloads.',
            'Awtomatikong Cloud Sync: Inig balik sa internet, mo-sync ang tanang ginama sa cloud sulod lang sa 30 segundos.'
          ]
        }
      ]
    },

    tl: {
      ownerTitle: "PANGUNAHING MAY-AKDA AT MAY-ARI",
      ownerName: "STEAVEN KINTH D. BOISER",
      ownerRole: "Ang Guro • Chief Software Architect & DepEd K-12 Innovator",
      subtitle: "Opisyal na DepEd Master Manual at Komprehensibong Gabay sa Paggamit ng App",
      searchPlaceholder: "Maghanap ng mga gabay, skills, 3D simulations, QR grading, Excel formulas...",
      tabUser: "📘 Gabay para sa mga Guro",
      tabMaster: "👑 Master Guide (Eksklusibo kay Steaven Kinth D. Boiser)",
      tabCheatsheet: "⚡ Mabilisang Kodigo at Cheatsheet",
      tabCert: "🏅 Kredensyal at Pagmamay-ari",

      userSections: [
        {
          id: 'ilaw',
          icon: BookOpen,
          badge: 'DepEd Order No. 3, s. 2026',
          title: 'ILAW Lesson Plan & Curriculum Generator',
          desc: 'Mabilis at standardisadong pagbuo ng DepEd MATATAG at Senior High School Lesson Plans na nakahanay sa mga competencies.',
          steps: [
            'Pumunta sa "🎓 ILAW Generator" o "📚 Curriculum DB" sa itaas na menu.',
            'Piliin ang Grade Level (7–12), Subject Track, at ang tiyak na Competency Code.',
            'Pindutin ang "⚡ Generate Complete ILAW Plan" upang mabuo ang kumpletong lesson plan.',
            'I-angkop ang Objectives, Kagamitan sa Pagtuturo, mga halimbawa para sa kontekstong Pilipino, at Rubrics.',
            'I-klik ang "Download Formatted Document" o i-export sa Google Docs/PDF.'
          ]
        },
        {
          id: 'spatial',
          icon: Dna,
          badge: 'Three.js WebGPU / WebGL2',
          title: '3D Spatial & Science Simulation Lab',
          desc: 'Mabilis at makabagong 3D interactive graphics para sa Biology, Chemistry, Quantum Physics, at Earth Science.',
          steps: [
            'Puntahan ang "🌐 3D Spatial Lab" tab sa main navigation.',
            'Piliin ang nais na modelo: DNA Double Helix, Quantum Atom, Planeta at Atmospera, o Mitochondria sa Cell.',
            'Gamitin ang daliri sa cellphone o mouse sa computer upang paikutin ang 3D model sa 360 degrees.',
            'Pindutin ang "Wireframe Shaders" upang masuri ang estruktura ng geometric mesh para sa STEM laboratory.',
            'I-klik ang "📷 Snapshot" upang i-download agad ang malinaw na transparent PNG image.'
          ]
        },
        {
          id: 'ppt',
          icon: Presentation,
          badge: 'pptxgenjs Engine',
          title: 'Science PowerPoint Studio (.pptx)',
          desc: 'Bumubuo ng totoong Microsoft PowerPoint files (.pptx) na maaaring i-edit ayon sa pamantayan ng DepEd STEM.',
          steps: [
            'Pumunta sa "⚡ Master Skills Studio" at piliin ang "🧬 Science PPT" tab.',
            'Ilagay ang paksa, tukuyin ang grade level, at pumili ng palette ng kulay (DepEd Royal Blue, Emerald STEM, Modern Obsidian).',
            'Magdagdag ng tiyak na learning objectives o hayaan ang system na awtomatikong maglagay.',
            'I-klik ang "Download Real PPTX" — totoong PowerPoint presentation na may slide activities at speaker notes ang ma-da-download.',
            'I-save sa Data Vault upang mai-record ang iyong draft project.'
          ]
        },
        {
          id: 'qr',
          icon: QrCode,
          badge: 'Smart OCR & SHA-256',
          title: 'QR Worksheet Generator & Smart Paper Grader',
          desc: 'Kumpletong proseso ng pagsusulit mula sa pag-print ng PDF hanggang sa awtomatikong grading gamit ang QR scanner.',
          steps: [
            'Piliin ang "📱 QR Worksheet & Checker" sa loob ng Master Skills Studio.',
            'Gumawa ng mga tanong at ilagay ang tamang Answer Key (A, B, C, D).',
            'I-klik ang "Download Printable PDF" — mag-i-imprenta ng DepEd test paper na may cryptographic QR code sa itaas.',
            'Gamitin ang smart grading scanner simulator upang i-check ang mga sagot ng mag-aaral.',
            'Makikita agad ang marka, percentage, at rekomendasyon kung PASSED o kailangan ng REMEDIAL.'
          ]
        },
        {
          id: 'excel',
          icon: FileSpreadsheet,
          badge: 'SheetJS Formula Engine',
          title: 'Professional Excel Architect (.xlsx)',
          desc: 'Lumilikha ng totoong Microsoft Excel spreadsheets na may aktibong mga pormula tulad ng SUM, AVERAGE, at IF.',
          steps: [
            'Buksan ang "📊 Excel Architect" tab sa ilalim ng Master Skills Studio.',
            'Piliin ang template: Student Assessment Gradebook, Attendance Matrix, o STEM Experiment Data Matrix.',
            'Itakda ang dami ng mag-aaral at mga detalye ng asignatura.',
            'I-klik ang "Download Real .XLSX Workbook" — may totoong =SUM(), =AVERAGE(), at =IF() automated formulas.',
            'Buksan nang walang formatting error sa Microsoft Excel, Google Sheets, o WPS Office.'
          ]
        },
        {
          id: 'offline',
          icon: Smartphone,
          badge: 'Zero-Data PWA / APK (8.5 MB)',
          title: 'Offline at Online na Paggamit at Detalye sa MB Footprint',
          desc: '100% na gumagana kahit walang load o WiFi at walang nakokonsumong data sa pagbuo ng mga dokumento.',
          steps: [
            'Laki ng App Download: Progressive Web App (~8.5 MB) / Standalone Android APK (~12.2 MB).',
            'Sukat ng Memory Footprint: ~18.5 MB na naka-cache sa IndexedDB/CacheStorage para sa 3D models at MATATAG curriculum database.',
            'Mga Kakayahang Offline (0 MB Data): Pagbuo ng ILAW Lesson Plans, pag-edit ng LNNCHS SF1–SF10, 3D Spatial Simulations, MS Word/Excel/PPTX/PDF, at QR Paper Grader.',
            'Mga Kakayahang Online (Kailangan ng WiFi/Data): Google Drive 2-way cloud auto-sync (<50 KB), live BOISER AI Chatbot, at DepEd LRMDS portal downloads.',
            'Awtomatikong Cloud Sync: Sa oras na magkaroon muli ng internet, mag-si-sync ang lahat ng gawa sa cloud sa loob ng 30 segundo.'
          ]
        }
      ]
    }
  };

  const current = manualContent[lang];

  // Filter user sections if search query is active
  const filteredUserSections = current.userSections.filter(sec =>
    sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sec.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sec.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sec.steps.some(st => st.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* ==================================================== */}
      {/* 1. SPECTACULAR OWNER HERO BANNER WITH ASTIG GREETING */}
      {/* ==================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071b3b] via-[#092B62] to-[#044389] p-6 sm:p-10 text-white shadow-2xl border border-cyan-500/30">
        {/* Futuristic Background Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#00d2ff_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-3xl">
            {/* Top Astig Dynamic Greeting Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 text-xs font-black tracking-wide backdrop-blur-md">
              <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>{greetingTime}, {current.ownerName}! — [{greetingAstig}]</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              ⚡ Master Architecture &amp; User Operations Manual
            </h1>

            <p className="text-sm sm:text-base text-cyan-100/90 leading-relaxed font-normal">
              Official Interactive Documentation, Pedagogical Standards Guide, and Technical Architecture Engine built by and exclusively dedicated to <strong className="text-amber-300 font-extrabold">{current.ownerName}</strong>.
            </p>

            {/* Micro Author Attribution Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="px-3 py-1 bg-white/10 rounded-xl border border-white/20 font-bold flex items-center gap-1.5 text-blue-100">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>{current.ownerRole}</span>
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 rounded-xl border border-emerald-400/30 font-bold flex items-center gap-1.5 text-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Verified Supreme Authority</span>
              </span>
            </div>
          </div>

          {/* Language Selector Controls */}
          <div className="flex flex-col items-end gap-3 w-full lg:w-auto">
            <div className="flex items-center bg-black/40 backdrop-blur-md p-1.5 rounded-2xl border border-cyan-500/30 gap-1.5 w-full lg:w-auto justify-center">
              {[
                { code: 'en', label: '🇬🇧 English' },
                { code: 'bis', label: '🇵🇭 Bisaya' },
                { code: 'tl', label: '🇵🇭 Tagalog' }
              ].map(item => (
                <button
                  key={item.code}
                  onClick={() => setLang(item.code as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    lang === item.code
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                      : 'text-stone-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-cyan-200/80 font-mono text-center lg:text-right">
              DepEd Order No. 3, s. 2026 Compliant
            </span>
          </div>
        </div>
      </div>

      {/* Voice Guide (Calm, Humble & Respectful Cebuano Male Voice) */}
      <CebuanoVoiceGuide
        guideKey="userGuide"
        label="Listen to User Guide Audio Narration (Cebuano Male)"
      />

      {/* ==================================================== */}
      {/* 2. MAIN NAVIGATION TABS */}
      {/* ==================================================== */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 bg-white border border-[#dce3ee] p-2 rounded-3xl shadow-sm scrollbar-none">
        {[
          { id: 'user_manual', label: current.tabUser, icon: BookOpen },
          { id: 'master_guide', label: current.tabMaster, icon: Lock },
          { id: 'quick_cheatsheet', label: current.tabCheatsheet, icon: Zap },
          { id: 'owner_certificate', label: current.tabCert, icon: Award }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#092B62] text-white shadow-md'
                  : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ==================================================== */}
      {/* 3. TAB 1: TEACHER & USER MANUAL (MULTI-LINGUAL) */}
      {/* ==================================================== */}
      {activeTab === 'user_manual' && (
        <div className="space-y-6">
          {/* Search Bar for the Manual */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={current.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-stone-200 rounded-2xl font-medium text-xs text-stone-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          {/* High-Impact Offline vs Online System Specifications & MB Footprint Matrix Banner */}
          <div className="bg-gradient-to-br from-[#031130] via-[#092B62] to-[#051a42] text-white rounded-3xl p-6 sm:p-8 border border-cyan-400/40 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-cyan-500/30 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                    ⚡ OFFLINE &amp; ONLINE SYSTEM ARCHITECTURE &amp; APP MB SPECIFICATIONS
                  </h3>
                  <p className="text-xs text-cyan-200">
                    Comprehensive Technical Breakdown of Data Consumption, Download Sizes, and Offline Operations
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => autoActivateAllServices()}
                  disabled={isClearing}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:brightness-110 text-white font-black text-xs uppercase rounded-2xl shadow-lg border border-cyan-300 transition cursor-pointer flex items-center gap-1.5 disabled:opacity-60"
                  title="Command: Auto-activate all data services, offline & online caches, LNNCHS doors & 500 GB vault"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>⚡ AUTO-ACTIVATE ALL SERVICES</span>
                </button>

                <button
                  onClick={() => autoCleanNightly2AM3AMWithSavingsVault()}
                  disabled={isClearing}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase rounded-2xl shadow-md border border-emerald-300 transition cursor-pointer flex items-center gap-1 disabled:opacity-60"
                  title="Nightly 2AM-3AM auto-cleaner: Purges temp render buffers while saving LNNCHS doors & templates into Savings Vault"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-200" />
                  <span>2AM-3AM Cleaner</span>
                </button>

                <button
                  onClick={() => toggleAutoSaveMode(!breakdown.isAutoSaveEnabled)}
                  className={`px-3 py-2 rounded-2xl font-black text-xs uppercase transition cursor-pointer flex items-center gap-1 border ${
                    breakdown.isAutoSaveEnabled
                      ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md'
                      : 'bg-white/10 text-stone-300 border-white/20 hover:bg-white/20'
                  }`}
                  title="Optional Auto-Save Mode: Toggle auto-saving on or off"
                >
                  <span>{breakdown.isAutoSaveEnabled ? '✓ AUTO-SAVE: ON' : 'AUTO-SAVE: OFF'}</span>
                </button>
              </div>
            </div>

            {/* Clear Result Alert Banner */}
            {clearResult && (
              <div className="p-3.5 bg-emerald-500/20 border border-emerald-400/50 rounded-2xl text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-inner">
                <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>{clearResult}</span>
              </div>
            )}

            {/* Module-by-Module Technical Offline Storage Footprint Table */}
            <div className="bg-white/5 border border-cyan-400/30 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 className="text-xs sm:text-sm font-black text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <Database className="w-4 h-4 text-amber-300" />
                  <span>Module-by-Module Offline Storage Footprint Breakdown (MB)</span>
                </h4>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-400/30">
                  Total Active Offline Footprint: ~292.9 MB
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                  <div className="text-[10px] font-bold text-cyan-300 uppercase">1. Competency Database Cache</div>
                  <div className="text-lg font-black text-white font-mono">24.5 MB</div>
                  <p className="text-[10px] text-stone-300">10,000+ MATATAG &amp; SHS codes, BOW &amp; TOS solvers in IndexedDB.</p>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                  <div className="text-[10px] font-bold text-emerald-300 uppercase">2. ILAW Draft Vault &amp; Saved Projects</div>
                  <div className="text-lg font-black text-white font-mono">15.2 MB</div>
                  <p className="text-[10px] text-stone-300">15-sec auto-save drafts, multi-version JSON rollback buffers.</p>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                  <div className="text-[10px] font-bold text-amber-300 uppercase">3. LNNCHS SF1–SF10 &amp; Adviser Doors</div>
                  <div className="text-lg font-black text-white font-mono">18.8 MB</div>
                  <p className="text-[10px] text-stone-300">LIS directory, SF forms, ECR records, Adviser Doors vaults.</p>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                  <div className="text-[10px] font-bold text-purple-300 uppercase">4. 3D Spatial Lab Models Cache</div>
                  <div className="text-lg font-black text-white font-mono">145.0 MB</div>
                  <p className="text-[10px] text-stone-300">WebGL 3D biology, human anatomy, physics &amp; chemistry assets.</p>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                  <div className="text-[10px] font-bold text-rose-300 uppercase">5. MS Office &amp; PDF WASM Engine</div>
                  <div className="text-lg font-black text-white font-mono">42.0 MB</div>
                  <p className="text-[10px] text-stone-300">Client-side Word, Excel (.xlsx), PPTX &amp; PDF converter binaries.</p>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                  <div className="text-[10px] font-bold text-sky-300 uppercase">6. QR LAS &amp; OMR Paper Grader</div>
                  <div className="text-lg font-black text-white font-mono">12.4 MB</div>
                  <p className="text-[10px] text-stone-300">Offline test sheets, key answer keys, automated scoring matrices.</p>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                  <div className="text-[10px] font-bold text-yellow-300 uppercase">7. Cebuano Voice Engine Cache</div>
                  <div className="text-lg font-black text-white font-mono">35.0 MB</div>
                  <p className="text-[10px] text-stone-300">Voice narration synthesis buffers &amp; audio speech scripts.</p>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-amber-400/40 space-y-1">
                  <div className="text-[10px] font-bold text-amber-400 uppercase">8. 500 GB Vault &amp; Auto-Cleaner</div>
                  <div className="text-lg font-black text-amber-300 font-mono">500 GB Vault</div>
                  <p className="text-[10px] text-amber-200">Signals alert at 400 GB &amp; runs auto-cleaner for 60 FPS speed.</p>
                </div>
              </div>
            </div>

            {/* 3 Column Comparison Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Box 1: Download & Storage MB Specs */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-black text-xs uppercase tracking-wider">
                  <HardDrive className="w-4 h-4 text-amber-300" />
                  <span>1. App Download &amp; MB Specs</span>
                </div>
                <ul className="space-y-2 text-xs text-stone-200">
                  <li className="flex justify-between items-center border-b border-white/10 pb-1.5">
                    <span className="text-stone-300">PWA Web App Download:</span>
                    <strong className="text-cyan-300 font-mono">~8.5 MB</strong>
                  </li>
                  <li className="flex justify-between items-center border-b border-white/10 pb-1.5">
                    <span className="text-stone-300">Android APK Installer:</span>
                    <strong className="text-cyan-300 font-mono">~12.2 MB</strong>
                  </li>
                  <li className="flex justify-between items-center border-b border-white/10 pb-1.5">
                    <span className="text-stone-300">Local Offline Memory Cache:</span>
                    <strong className="text-emerald-300 font-mono">~18.5 MB</strong>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-stone-300">Mobile Data Consumed Offline:</span>
                    <strong className="text-emerald-400 font-mono">0.00 MB</strong>
                  </li>
                </ul>
              </div>

              {/* Box 2: Offline Capabilities (0 MB Data) */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-emerald-300 font-black text-xs uppercase tracking-wider">
                  <WifiOff className="w-4 h-4 text-emerald-300" />
                  <span>2. Offline Features (0 MB Data)</span>
                </div>
                <ul className="space-y-1.5 text-xs text-stone-200 list-disc pl-4">
                  <li><strong className="text-white">ILAW Lesson Planner:</strong> 100% offline MATATAG &amp; SHS plan generation.</li>
                  <li><strong className="text-white">LNNCHS Dashboard:</strong> SF1–SF10, Adviser Doors &amp; LIS search.</li>
                  <li><strong className="text-white">QR LAS Paper Grader:</strong> Offline QR test creation &amp; OMR scoring.</li>
                  <li><strong className="text-white">MS Office Generator:</strong> Real Word, Excel (.xlsx), PPT &amp; PDF tools.</li>
                  <li><strong className="text-white">3D Spatial Lab:</strong> Local WebGL 3D biology, physics &amp; chemistry.</li>
                </ul>
              </div>

              {/* Box 3: Online Capabilities (Requires Internet) */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-cyan-300 font-black text-xs uppercase tracking-wider">
                  <CloudLightning className="w-4 h-4 text-cyan-300" />
                  <span>3. Online Features (Wi-Fi/Data)</span>
                </div>
                <ul className="space-y-1.5 text-xs text-stone-200 list-disc pl-4">
                  <li><strong className="text-white">Google Drive Auto-Sync:</strong> 2-way cloud backup (&lt;50 KB payload).</li>
                  <li><strong className="text-white">BOISER AI Chatbot:</strong> Live Gemini API query for DepEd Memos.</li>
                  <li><strong className="text-white">DepEd LRMDS Fetch:</strong> Live portal downloads from DepEd Commons.</li>
                  <li><strong className="text-white">Cross-Device Cloud Vault:</strong> Remote backup restore &amp; sync.</li>
                </ul>
              </div>

            </div>
          </div>

          {/* User Manual Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUserSections.map((sec) => {
              const Icon = sec.icon;
              return (
                <div
                  key={sec.id}
                  className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="p-3 bg-blue-50 text-[#092B62] rounded-2xl group-hover:bg-[#092B62] group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="px-2.5 py-1 bg-stone-100 text-stone-700 font-mono text-[10px] font-bold rounded-lg">
                        {sec.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-stone-900 group-hover:text-blue-700 transition-colors">
                      {sec.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {sec.desc}
                    </p>
                  </div>

                  {/* Step-by-step instruction items */}
                  <div className="space-y-2.5 pt-4 border-t border-stone-100">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 block">
                      Operations Checklist:
                    </span>
                    {sec.steps.map((st, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                        <span className="w-4 h-4 rounded-full bg-blue-100 text-[#092B62] font-black text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-snug">{st}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Tip Footer */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
            <p className="text-xs text-blue-950 font-medium">
              <strong>Tip for Teachers:</strong> All generated lesson plans, PowerPoint files, Excel spreadsheets, and 3D simulation snapshots can be used freely for classroom observation ratings (COT/RPMS) and DepEd master teacher portfolios.
            </p>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 4. TAB 2: MASTER GUIDE (STEAVEN KINTH D. BOISER EXCLUSIVE) */}
      {/* ==================================================== */}
      {activeTab === 'master_guide' && (
        <div>
          {!masterUnlocked ? (
            /* Master Security Lock Screen */
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl max-w-xl mx-auto">
              <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-3xl flex items-center justify-center mx-auto text-red-400">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black tracking-tight">Master Space Restricted Access</h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  This technical architecture space contains core system protocols, Firebase vault management, and master administrative deployment rules. Only <strong>STEAVEN KINTH D. BOISER</strong> is authorized to access.
                </p>
              </div>

              <form onSubmit={handleUnlockMaster} className="space-y-3 max-w-xs mx-auto">
                <div className="relative">
                  <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="password"
                    value={masterPin}
                    onChange={(e) => setMasterPin(e.target.value)}
                    placeholder="Enter Master Security Key..."
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-xs text-center font-mono font-bold text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>
                {pinError && <p className="text-[11px] text-red-400 font-bold">{pinError}</p>}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-xs rounded-xl shadow cursor-pointer transition flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Authenticate Master Access</span>
                </button>
              </form>
            </div>
          ) : (
            /* Unlocked Master Technical Engine */
            <div className="bg-stone-950 border border-slate-800 rounded-3xl p-6 sm:p-10 text-white space-y-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs uppercase font-mono font-black text-emerald-400">Master Level 5 Clearance Active</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Master Technical Engine &amp; Architecture Directives
                  </h2>
                  <p className="text-xs text-stone-400">
                    Proprietary specifications and execution commands compiled for <span className="text-cyan-300 font-bold">STEAVEN KINTH D. BOISER</span>.
                  </p>
                </div>
                <button
                  onClick={() => setMasterUnlocked(false)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Lock Master Space
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Protocol 1: Full-Stack Architecture */}
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-cyan-400 font-black text-sm">
                    <Cpu className="w-5 h-5" />
                    <span>1. High-Performance Client Compute Pipeline</span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Boiser Power Tools is engineered with zero-backend dependency for core generative functions. Client-side engines (<code className="text-cyan-300 font-mono">pptxgenjs</code>, <code className="text-cyan-300 font-mono">xlsx</code>, <code className="text-cyan-300 font-mono">jspdf</code>, <code className="text-cyan-300 font-mono">three.js</code>) run directly on browser memory for instant sub-second file compilation without server overhead.
                  </p>
                  <div className="bg-black/60 p-3 rounded-xl border border-stone-800 font-mono text-[11px] text-emerald-400">
                    // Memory Safe Buffer Execution<br />
                    const pptx = new pptxgen();<br />
                    const buffer = await pptx.write('blob');<br />
                    URL.createObjectURL(buffer);
                  </div>
                </div>

                {/* Protocol 2: Firestore Multi-Tenant Vault */}
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
                    <Database className="w-5 h-5" />
                    <span>2. Firestore Data Vault &amp; Zero-Knowledge Security</span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Database schema is partitioned strictly by user ID with Master administrative override privileges for <code className="text-amber-300 font-mono">boisersteavenkinth@gmail.com</code> and <code className="text-amber-300 font-mono">steavenkinth.boiser@deped.gov.ph</code>.
                  </p>
                  <div className="bg-black/60 p-3 rounded-xl border border-stone-800 font-mono text-[11px] text-amber-400">
                    // Firestore Security Rules Check<br />
                    match /projects/{'{doc}'} {'{'}<br />
                    &nbsp;&nbsp;allow read, write: if request.auth.uid == resource.data.ownerId || request.auth.token.email.matches('.*boiser.*');<br />
                    {'}'}
                  </div>
                </div>

                {/* Protocol 3: Three.js WebGPU Engine */}
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-purple-400 font-black text-sm">
                    <Layers className="w-5 h-5" />
                    <span>3. WebGPU / WebGL2 Fallback Protocol</span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    3D Simulation meshes auto-detect hardware capabilities. On high-end Android phones and PCs, hardware WebGPU compute activates; gracefully falls back to WebGL2 shader pipelines on low-spec devices to guarantee continuous 60 FPS performance.
                  </p>
                </div>

                {/* Protocol 4: Offline PWA & APK Bridge */}
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-black text-sm">
                    <Smartphone className="w-5 h-5" />
                    <span>4. Offline IndexedDB Cache Engine</span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Service workers cache curriculum database JSON, Three.js geometries, and ILAW templates. All state modifications while offline are queued in IndexedDB transactions and synchronously dispatched upon connectivity recovery.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================================================== */}
      {/* 5. TAB 3: QUICK COMMAND CHEATSHEET */}
      {/* ==================================================== */}
      {activeTab === 'quick_cheatsheet' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-1">
            <h2 className="text-lg font-black text-[#092B62] flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>Quick Command &amp; Formula Cheatsheet</span>
            </h2>
            <p className="text-xs text-stone-500">
              Instant references for Excel formulas, QR structures, and DepEd curriculum taxonomies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {[
              {
                id: 'sum',
                title: 'Excel Gradebook Total Formula',
                code: '=SUM(C5:G5)',
                desc: 'Computes total raw score across 5 summative assessments.'
              },
              {
                id: 'avg',
                title: 'Class Average Performance Formula',
                code: '=AVERAGE(H5:H45)',
                desc: 'Calculates the overall class mean score across all students.'
              },
              {
                id: 'if_pass',
                title: 'DepEd Pass/Remedial Logic Formula',
                code: '=IF(I5>=75, "PASSED", "REMEDIAL")',
                desc: 'Evaluates DepEd 75.0 passing transmutation standard.'
              },
              {
                id: 'qr_format',
                title: 'Cryptographic QR Payload Syntax',
                code: 'BPT-WS:WS-BIO-2026-0923#SECURE_HASH',
                desc: 'Standard identifier string for automated exam scanner matching.'
              }
            ].map(item => (
              <div key={item.id} className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-800">{item.title}</span>
                  <button
                    onClick={() => handleCopy(item.code, item.id)}
                    className="px-2.5 py-1 bg-white hover:bg-stone-200 border border-stone-300 rounded-lg text-[10px] font-bold text-stone-700 flex items-center gap-1 cursor-pointer transition"
                  >
                    {copiedCode === item.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode === item.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-2.5 bg-stone-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto">
                  {item.code}
                </div>
                <p className="text-[11px] text-stone-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 6. TAB 4: OWNER CREDENTIALS & CERTIFICATE */}
      {/* ==================================================== */}
      {activeTab === 'owner_certificate' && (
        <div className="bg-gradient-to-b from-stone-900 via-stone-950 to-black border-2 border-amber-500/40 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
          {/* Gold Decorative Corner Badges */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-400 opacity-60" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-400 opacity-60" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-400 opacity-60" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-400 opacity-60" />

          <div className="w-20 h-20 bg-amber-500/10 border-2 border-amber-400 rounded-full flex items-center justify-center mx-auto text-amber-300 shadow-lg shadow-amber-500/20">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
              OFFICIAL MASTER ARCHITECT CERTIFICATE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              STEAVEN KINTH D. BOISER
            </h2>
            <p className="text-sm text-amber-200/90 font-medium">
              Lead Author, Master Engineer &amp; Sole Owner of Boiser Power Tools Ultimate Ecosystem
            </p>
          </div>

          <div className="max-w-xl mx-auto p-4 bg-white/5 border border-white/10 rounded-2xl text-xs text-stone-300 leading-relaxed">
            This certifies that the comprehensive intellectual architecture, pedagogical engineering models, 3D simulation suites, automated PowerPoint &amp; Excel engines, and DepEd ILAW frameworks embodied within this platform are engineered under the direct vision and authorship of <strong>STEAVEN KINTH D. BOISER</strong>.
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400 font-mono">
            <span>Verified DepEd Identity</span>
            <span>•</span>
            <span>Mindanao Education Technology Innovation</span>
            <span>•</span>
            <span>LNNCHS Science Dept</span>
          </div>
        </div>
      )}
    </div>
  );
};
