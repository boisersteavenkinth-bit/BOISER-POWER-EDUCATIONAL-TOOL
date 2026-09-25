import React, { useState, useEffect, useRef } from 'react';
import {
  Tv,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Languages,
  Sparkles,
  X,
  Radio,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Bot,
  BookOpen,
  Calculator,
  FileSpreadsheet,
  Award,
  Zap,
  Power
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { speakWithCebuanoMaleVoice, stopCebuanoMaleVoice, executeSwitchToCebuanoMaleVoiceCommand } from '../services/boiserVoiceService';

interface HugeTVTourGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  autoPlayVoice?: boolean;
}

// 5 Step Lecturing Tour Data across 3 Languages
const TV_TOUR_STEPS = [
  {
    id: 1,
    title: {
      en: "📺 WELCOME TO BOISER POWER EDUCATION TOOLS",
      tl: "📺 MALIGAYANG PAGDATING SA BOISER POWER EDUCATION TOOLS",
      bis: "📺 MAAYONG PAG-ABOT SA BOISER POWER EDUCATION TOOLS"
    },
    subtitle: {
      en: "Channel 01: System Overview & Educator Mission",
      tl: "Channel 01: Pangkalahatang Sulyap at Layunin sa mga Guro",
      bis: "Channel 01: Pagpaila sa Sistema ug Misyon sa Magtutudlo"
    },
    icon: GraduationCap,
    badgeColor: "from-blue-600 to-indigo-700",
    lectureText: {
      en: "Welcome dear teacher! Engineered by Master Creator Steaven Kinth D. Boiser, this 100% free lifetime education suite is specifically built for public school educators in LNNCHS and DepEd Region X. It brings together automated grading, SF1 to SF10 form generation, ILAW lesson plans, and an interactive voice-activated AI assistant. Enjoy learning!",
      tl: "Maligayang pagdating mahal na guro! Idinisenyo ni Master Creator Steaven Kinth D. Boiser, ang 100% libreng platapormang ito ay ginawa para sa mga pampublikong guro ng LNNCHS at DepEd Region X. Pinagsasama nito ang awtomatikong pagmamarka, paggawa ng SF1 hanggang SF10, ILAW lesson plans, at boses na AI assistant. Enjoy learning!",
      bis: "Maayong pag-abot mahal nga magtutudlo! Gihimo ni Master Creator Steaven Kinth D. Boiser, kining 100% libre nga sistema ay para sa tanang magtutudlo sa LNNCHS ug DepEd Region X. Gi-usa dinhi ang pagkwenta sa grado, SF1 hangtod SF10 forms, ILAW lesson plans, ug voice AI chatbot. Enjoy learning!"
    },
    keyPoints: [
      { en: "100% Lifetime Free License for DepEd Educators", tl: "100% Libreng Lisensya Para sa mga Guro ng DepEd", bis: "100% Libre nga Lisensya Para sa mga Magtutudlo" },
      { en: "Offline-First PWA Technology for Mobile & Desktop", tl: "Gumagana Kahit Walang Internet sa Mobile at Desktop", bis: "Mo-gana Bisan Walay Internet sa Mobile ug Laptop" },
      { en: "Aligned with DepEd Order No. 3, s. 2026 MATATAG", tl: "Nakatugon sa DepEd Order No. 3, s. 2026 MATATAG", bis: "Subay sa DepEd Order No. 3, s. 2026 MATATAG" }
    ]
  },
  {
    id: 2,
    title: {
      en: "📊 15-SHEET MASTER GRADING & OFFICIAL SF FORMS",
      tl: "📊 15-SHEET MASTER GRADING AT OPISYAL NA SF FORMS",
      bis: "📊 15-SHEET MASTER GRADING UG OPISYAL NGA SF FORMS"
    },
    subtitle: {
      en: "Channel 02: Automated Transmutation & School Forms",
      tl: "Channel 02: Awtomatikong Pag-compute ng Grado at Forms",
      bis: "Channel 02: Awtomatiko nga Pagkwenta sa Grado ug Forms"
    },
    icon: Calculator,
    badgeColor: "from-emerald-600 to-teal-700",
    lectureText: {
      en: "Operating the 15-Sheet Master Grading System is fast and simple! Enter student scores for Written Works, Performance Tasks, and Quarterly Assessments. The system automatically converts grades using official DepEd transmutation tables. Easily export SF1 Masterlist, SF2 Attendance, SF9 Progress Report Cards, and SF10 Permanent Records. Enjoy learning!",
      tl: "Ang paggamit ng 15-Sheet Master Grading System ay napakabilis! Ipasok ang marka ng Written Works, Performance Tasks, at Quarterly Assessment. Kusa itong itinra-transmute ng system. Mabilis ding mai-export ang SF1, SF2, SF9 Report Card, at SF10 Permanent Record. Enjoy learning!",
      bis: "Ang pagkwenta sa 15-Sheet Master Grading System paspas kaayo! Ibutang ang marka sa Written Works, Performance Tasks, ug Quarterly Exam. Ang sistema na ang mag-convert sa sakto nga transmutation. Paspas usab maka-download og SF1, SF2, SF9 Report Card, ug SF10 Form 137. Enjoy learning!"
    },
    keyPoints: [
      { en: "Automated Trimester Transmutation (JHS & SHS)", tl: "Awtomatikong Transmutation sa Grade 7 hanggang Grade 12", bis: "Awtomatiko nga Transmutation gikan Grade 7 hangtod Grade 12" },
      { en: "Instant PDF/Excel Export for SF1, SF2, SF9, & SF10", tl: "Mabilis na Export ng SF1, SF2, SF9, at SF10 sa PDF at Excel", bis: "Paspas nga Download sa SF1, SF2, SF9, ug SF10 sa PDF/Excel" },
      { en: "Batch SF Inspector with Verification QR Codes", tl: "Batch SF Inspector na may QR Code Verification", bis: "Batch SF Inspector nga may QR Code Verification" }
    ]
  },
  {
    id: 3,
    title: {
      en: "📝 ILAW EXEMPLAR & LEARNER ACTIVITY SHEET (LAS)",
      tl: "📝 ILAW EXEMPLAR AT LEARNER ACTIVITY SHEET (LAS)",
      bis: "📝 ILAW EXEMPLAR UG LEARNER ACTIVITY SHEET (LAS)"
    },
    subtitle: {
      en: "Channel 03: MATATAG 2026 Lesson Plan Generator",
      tl: "Channel 03: Paggawa ng Aralin Alinsunod sa MATATAG 2026",
      bis: "Channel 03: Paggama og Leksyon Sumala sa MATATAG 2026"
    },
    icon: BookOpen,
    badgeColor: "from-amber-600 to-orange-700",
    lectureText: {
      en: "Drafting complete 4-session lesson plans and Learner Activity Sheets takes seconds! Select your subject and competency code from our 20-attribute curriculum database. The AI generator fills in Learning Objectives, Content Standards, and Assessment Rubrics. Download as formatted Word or PDF files ready for supervisor submission. Enjoy learning!",
      tl: "Ang pagbuo ng 4-session lesson plan at Activity Sheets ay tumatagal lamang ng ilang segundo! Pumili ng asignatura at competency code mula sa aming 20-attribute database. Awtomatikong pupunan ng AI ang mga Layunin, Content Standard, at Rubrics. I-download bilang Word o PDF na handa sa imbestigasyon ng supervisor. Enjoy learning!",
      bis: "Ang paghimo og 4-session nga leksyon ug Activity Sheets pwerteng paspasa! Pilia ang subject ug competency code sa among 20-attribute database. Ang AI na ang mopuno sa Layunin, Content Standards, ug Assessment Rubrics. I-download sa Word o PDF nga andam na sa pagsubay sa supervisor. Enjoy learning!"
    },
    keyPoints: [
      { en: "20-Attribute Verified Competency Database Model", tl: "Kumpirmadong 20-Attribute Curriculum Database Model", bis: "Kumpirmado nga 20-Attribute Curriculum Database Model" },
      { en: "4-Session Structured Lesson Log with Rubrics", tl: "4-Session na Lesson Log na may Kasamang Rubriks", bis: "4-Session nga Lesson Log nga may Kasamang Rubriks" },
      { en: "One-Click Word Document & PDF Generation", tl: "Isang Click na Paggawa ng Word Document at PDF", bis: "Usa ka Click nga Paggama og Word Document ug PDF" }
    ]
  },
  {
    id: 4,
    title: {
      en: "🎙️ VOICE-ACTIVATED BOISER CHATBOT & LIS DIRECTORY",
      tl: "🎙️ Boses-Na-BOISER CHATBOT AT LIS DIRECTORY",
      bis: "🎙️ TINGOG-NA-BOISER CHATBOT UG LIS DIRECTORY"
    },
    subtitle: {
      en: "Channel 04: Interactive Multilingual AI Assistant",
      tl: "Channel 04: AI Assistant sa Bisaya, Tagalog, at English",
      bis: "Channel 04: AI Assistant sa Bisaya, Tagalog, ug English"
    },
    icon: Bot,
    badgeColor: "from-purple-600 to-pink-700",
    lectureText: {
      en: "Meet the voice-activated Boiser Chatbot! Simply tap the microphone beside the chat box and speak in Bisaya, Tagalog, or English. The chatbot searches official DepEd orders, LNNCHS memos, and the 120-section LIS student directory. It answers your questions in a clear, calm voice. Enjoy learning!",
      tl: "Kilalanin ang voice-activated Boiser Chatbot! Pindutin lamang ang mikropono sa tabi ng chatbox at magsalita sa Bisaya, Tagalog, o English. Hinahanap ng chatbot ang opisyal na DepEd Orders, LNNCHS memos, at LIS directory ng 60 mag-aaral bawat seksyon. Sumasagot ito sa malinaw at kalmadong boses. Enjoy learning!",
      bis: "Ila-ila ang voice-activated Boiser Chatbot! Pindota lang ang mikropono sa kilid sa chatbox ug storya sa Bisaya, Tagalog, o English. Ang chatbot mo-search dayon sa mga DepEd Orders, LNNCHS memos, ug LIS directory sa 60 ka estudyante matag seksyon. Mo-tubag kini sa maayo ug klarong tingog. Enjoy learning!"
    },
    keyPoints: [
      { en: "Live Speech-to-Text Input in Bisaya, Tagalog, & English", tl: "Magsalita sa Bisaya, Tagalog, o English Gamit ang Mikropono", bis: "Magsulti sa Bisaya, Tagalog, o English Gamit ang Mikropono" },
      { en: "Searches DepEd Memos, Handbooks, & 120 LIS Sections", tl: "Naghahanap sa DepEd Orders, Memos, at 120 LIS Sections", bis: "Mo-search sa DepEd Orders, Memos, ug 120 LIS Sections" },
      { en: "Calm Voice Output with Tagline Reinforcement", tl: "Malinaw at Kalmadong Pagsasalita sa Bawat Tumutugon", bis: "Klaro ug Kalmado nga Tingog sa Matag Tubag" }
    ]
  },
  {
    id: 5,
    title: {
      en: "🛡️ APP GOVERNANCE & TEACHER SUPPORT NOTICE",
      tl: "🛡️ PAMAMAHALA AT PATAKARAN SA SUPORTA NG GURO",
      bis: "🛡️ PAGDUMALA AT GIYA SA SUPORTA SA MAGTUTUDLO"
    },
    subtitle: {
      en: "Channel 05: Support Tool Declaration & Master Security",
      tl: "Channel 05: Pahayag sa Suporta at Proteksyon ng System",
      bis: "Channel 05: Pahayag sa Suporta ug Proteksyon sa System"
    },
    icon: ShieldCheck,
    badgeColor: "from-rose-600 to-red-700",
    lectureText: {
      en: "Remember: Steaven Kinth D. Boiser is strictly a support tool for teachers designed to assist you in classroom management. Master Creator doors and source code are protected with live signal alerts that reveal unauthorized copy attempts directly to the Master Creator. Welcome aboard and enjoy learning!",
      tl: "Paalala: Ang app na ito ay suportang kagamitan lamang para sa mga guro upang tulungan kayo sa klase. Ang Master Creator doors at source code ay nakaseguro gamit ang live breach signal alerts na nagpapakita ng pangalan ng nagtangkang mangopya diretso kay Master Creator. Maligayang pagdating at enjoy learning!",
      bis: "Pahinumdom: Kining sistema ay suporta lamang nga gamit alang sa mga magtutudlo sa pagdumala sa klase. Ang Master Creator doors ug source code giprotektahan og live signal alarm nga mopadayag sa pangalan sa mangawat diretso sa Master Creator. Maayong pag-abot ug enjoy learning!"
    },
    keyPoints: [
      { en: "Steaven Kinth Boiser is strictly a support tool for teachers", tl: "Ito ay suportang kagamitan lamang para sa mga guro", bis: "Kining sistema ay suporta lamang nga gamit para sa magtutudlo" },
      { en: "Protected Codebase with Live Breach Signal Alerts", tl: "Protektadong Code Base na may Live Alarm Laban sa Pagnanakaw", bis: "Protektado nga Code Base nga may Live Alarm Laban sa Pagpangawat" },
      { en: "Welcome to LNNCHS SY 2026-2027 Master Ecosystem!", tl: "Maligayang Pagdating sa LNNCHS SY 2026-2027 Ecosystem!", bis: "Maayong Pag-abot sa LNNCHS SY 2026-2027 Ecosystem!" }
    ]
  }
];

export const HugeTVTourGuideModal: React.FC<HugeTVTourGuideModalProps> = ({
  isOpen,
  onClose,
  autoPlayVoice = true
}) => {
  const { currentUser, activeLogoUrl } = useAuth();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedLang, setSelectedLang] = useState<'en' | 'tl' | 'bis'>('en');
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [isTvPowerOn, setIsTvPowerOn] = useState(true);
  const [tvVolume, setTvVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<number>(30); // 30s per step for 2-3 min total

  const activeStep = TV_TOUR_STEPS[currentStepIndex];
  const StepIcon = activeStep.icon;

  // Speak Lecture Text using Speech Synthesis with Calm, Clear, Respectful Cebuano Male Voice
  const speakLecture = (stepIdx: number, lang: 'en' | 'tl' | 'bis') => {
    if (!('speechSynthesis' in window) || isMuted) return;

    stopVoice();

    const baseText = TV_TOUR_STEPS[stepIdx].lectureText[lang];
    setIsPlayingVoice(true);
    speakWithCebuanoMaleVoice(baseText, {
      appendTagline: true,
      rate: 0.88,
      pitch: 0.86,
      onStart: () => setIsPlayingVoice(true),
      onEnd: () => setIsPlayingVoice(false),
      onError: () => setIsPlayingVoice(false)
    });
  };

  const stopVoice = () => {
    stopCebuanoMaleVoice();
    setIsPlayingVoice(false);
  };

  // Trigger speech on step or language change if TV is powered on
  useEffect(() => {
    if (isOpen && isTvPowerOn && autoPlayVoice && !isMuted) {
      speakLecture(currentStepIndex, selectedLang);
    } else {
      stopVoice();
    }

    return () => stopVoice();
  }, [isOpen, currentStepIndex, selectedLang, isTvPowerOn, isMuted]);

  // Auto step timer (2-3 min total experience)
  useEffect(() => {
    if (!isOpen || !isTvPowerOn) return;

    const timer = setInterval(() => {
      setAutoAdvanceTimer((prev) => {
        if (prev <= 1) {
          if (currentStepIndex < TV_TOUR_STEPS.length - 1) {
            setCurrentStepIndex((s) => s + 1);
            return 30;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isTvPowerOn, currentStepIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-300">
      
      {/* CREATIVE HUGE 75-INCH CURVED 4K TELEVISION CONTAINER */}
      <div className="relative w-full max-w-5xl bg-stone-900 rounded-[3rem] p-3 sm:p-6 md:p-8 border-4 border-stone-800 shadow-[0_0_80px_rgba(0,50,150,0.4)] flex flex-col items-center">
        
        {/* Ambient Backlight Glow Effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 via-amber-500/20 to-indigo-600/30 rounded-[3.5rem] blur-2xl pointer-events-none -z-10" />

        {/* TV Top Bezel Indicator & Speaker Grill */}
        <div className="w-full flex items-center justify-between px-4 pb-3 text-stone-400 text-[10px] font-mono tracking-widest border-b border-stone-800/80">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-amber-400 font-bold uppercase">BOISER 4K EDU-TV BROADCAST STUDIO</span>
            <span className="hidden sm:inline text-stone-600">|</span>
            <span className="hidden sm:inline text-stone-300">CH 0{activeStep.id}: {activeStep.subtitle[selectedLang]}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-[9px]">
              LIVE 4K HDR 60FPS
            </span>
            <button
              onClick={() => {
                stopVoice();
                onClose();
              }}
              className="p-1 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer"
              title="Close TV Screen"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* HUGE TELEVISION SCREEN AREA */}
        <div className={`relative w-full rounded-3xl overflow-hidden border-2 transition-all duration-500 my-3 ${
          isTvPowerOn 
            ? 'bg-slate-950 border-stone-700 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]' 
            : 'bg-black border-stone-900 flex items-center justify-center min-h-[420px]'
        }`}>

          {!isTvPowerOn ? (
            /* TV Off Screen */
            <div className="text-center space-y-4 p-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-600">
                <Power className="w-8 h-8" />
              </div>
              <h3 className="text-stone-500 font-bold text-sm uppercase tracking-widest">BOISER EDU-TV SCREEN POWERED OFF</h3>
              <button
                onClick={() => {
                  setIsTvPowerOn(true);
                  setAutoAdvanceTimer(30);
                }}
                className="px-6 py-2.5 bg-blue-700 hover:bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition"
              >
                Press Power Button To Turn On TV
              </button>
            </div>
          ) : (
            /* TV On Screen - Full Studio Broadcast */
            <div className="p-4 sm:p-6 md:p-8 space-y-6 relative min-h-[440px] flex flex-col justify-between">
              
              {/* Screen Scanlines Texture */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40 z-10" />

              {/* Top Studio Broadcast Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-20 border-b border-slate-800/80 pb-4">
                
                {/* Animated Logo Broadcast Anchor */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#0047ff] via-[#0038A8] to-[#001f5c] p-1 shadow-2xl border-2 border-amber-400 overflow-hidden shrink-0 animate-pulse">
                      <img
                        src={activeLogoUrl}
                        alt="Boiser Animated Logo Anchor"
                        className="w-full h-full object-cover rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-600 border-2 border-slate-950 rounded-full animate-ping" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm sm:text-base md:text-lg font-black text-white tracking-tight">
                        MASTER CREATOR TUTOR STUDIO
                      </h2>
                      <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider">
                        ON AIR
                      </span>
                    </div>
                    <p className="text-xs text-blue-300 font-bold">
                      Lecturing: {currentUser.name || 'DepEd Educator'} • {currentUser.email}
                    </p>
                  </div>
                </div>

                {/* Multilingual Selector & Voice Accent Command Bar */}
                <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
                  <button
                    onClick={() => {
                      executeSwitchToCebuanoMaleVoiceCommand("Voice command executed! Tour guide set to calm, clear Cebuano male voice accent.");
                    }}
                    className="px-3 py-1 rounded-xl text-[10px] font-black uppercase bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 flex items-center gap-1 shadow-md hover:brightness-110 cursor-pointer border border-amber-300"
                    title="Command: Set voice to calm, clear Cebuano-accented male voice with clear pronunciation"
                  >
                    <span>🎙️ COMMAND: SET CEBUANO MALE VOICE</span>
                  </button>

                  <div className="h-4 w-[1px] bg-slate-700 hidden sm:block" />

                  <Languages className="w-4 h-4 text-amber-400 ml-1" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lang:</span>
                  <button
                    onClick={() => setSelectedLang('en')}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${
                      selectedLang === 'en' ? 'bg-[#0038A8] text-white shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setSelectedLang('tl')}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${
                      selectedLang === 'tl' ? 'bg-[#0038A8] text-white shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Tagalog
                  </button>
                  <button
                    onClick={() => setSelectedLang('bis')}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${
                      selectedLang === 'bis' ? 'bg-[#0038A8] text-white shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Bisaya
                  </button>
                </div>
              </div>

              {/* Main TV Screen Content Body */}
              <div className="relative z-20 space-y-4 flex-1">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl bg-gradient-to-r ${activeStep.badgeColor} text-white shadow-lg`}>
                    <StepIcon className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-black text-amber-300 tracking-tight">
                      {activeStep.title[selectedLang]}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {activeStep.subtitle[selectedLang]}
                    </p>
                  </div>
                </div>

                {/* Main Speech Subtitle Banner (Lecturing Text) */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900/90 via-blue-950/80 to-slate-900/90 border-2 border-blue-500/40 rounded-2xl shadow-inner relative overflow-hidden">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-400 text-slate-950 rounded-xl shrink-0 font-bold text-xs mt-0.5">
                      🎙️ LECTURE:
                    </div>
                    <p className="text-xs sm:text-sm md:text-base font-semibold text-stone-100 leading-relaxed italic">
                      "{activeStep.lectureText[selectedLang]}"
                    </p>
                  </div>
                  {isPlayingVoice && (
                    <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-amber-400 animate-pulse">
                      <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Calm &amp; Clear Boiser Voice Lecturing...</span>
                    </div>
                  )}
                </div>

                {/* Key Points Bullet List */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  {activeStep.keyPoints.map((pt, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 font-bold flex items-center gap-2 shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{pt[selectedLang]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom TV Studio Status Bar */}
              <div className="relative z-20 border-t border-slate-800/80 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                
                {/* Step Progress Pills */}
                <div className="flex items-center gap-1.5">
                  {TV_TOUR_STEPS.map((st, idx) => (
                    <button
                      key={st.id}
                      onClick={() => {
                        setCurrentStepIndex(idx);
                        setAutoAdvanceTimer(30);
                      }}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        idx === currentStepIndex
                          ? 'w-8 bg-amber-400 shadow-md'
                          : idx < currentStepIndex
                          ? 'w-3 bg-emerald-500'
                          : 'w-3 bg-slate-700 hover:bg-slate-600'
                      }`}
                      title={`Jump to Step ${st.id}`}
                    />
                  ))}
                  <span className="text-[10px] text-slate-400 font-mono font-bold ml-2">
                    Step {currentStepIndex + 1} of {TV_TOUR_STEPS.length} ({autoAdvanceTimer}s)
                  </span>
                </div>

                {/* Voice & Channel Navigation Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-2 rounded-xl border text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                      isMuted
                        ? 'bg-red-500/20 text-red-400 border-red-500/40'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                    title={isMuted ? "Unmute Audio" : "Mute Audio"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                    <span className="hidden sm:inline">{isMuted ? "Muted" : "Voice On"}</span>
                  </button>

                  <button
                    disabled={currentStepIndex === 0}
                    onClick={() => {
                      setCurrentStepIndex((prev) => Math.max(0, prev - 1));
                      setAutoAdvanceTimer(30);
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                  >
                    <SkipBack className="w-4 h-4" />
                    <span>Prev Channel</span>
                  </button>

                  <button
                    onClick={() => {
                      if (currentStepIndex < TV_TOUR_STEPS.length - 1) {
                        setCurrentStepIndex((prev) => prev + 1);
                        setAutoAdvanceTimer(30);
                      } else {
                        stopVoice();
                        onClose();
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition cursor-pointer"
                  >
                    <span>{currentStepIndex === TV_TOUR_STEPS.length - 1 ? "Finish Tour" : "Next Channel"}</span>
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* PHYSICAL TV FRAME BOTTOM BEZEL & POWER BUTTON CONTROLS */}
        <div className="w-full flex items-center justify-between px-6 pt-2 text-stone-400 text-xs font-bold">
          
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-stone-300 font-extrabold uppercase tracking-widest text-[10px]">
              BOISER VISION 4K HDR • SY 2026-2027 CURRICULUM TV
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTvPowerOn(!isTvPowerOn)}
              className={`p-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                isTvPowerOn
                  ? 'bg-red-600/20 text-red-400 border border-red-500/40 hover:bg-red-600/40'
                  : 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600/40'
              }`}
            >
              <Power className="w-4 h-4" />
              <span>{isTvPowerOn ? "Power OFF" : "Power ON"}</span>
            </button>

            <button
              onClick={() => {
                stopVoice();
                onClose();
              }}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-extrabold transition cursor-pointer"
            >
              Skip Tour &amp; Open App
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
