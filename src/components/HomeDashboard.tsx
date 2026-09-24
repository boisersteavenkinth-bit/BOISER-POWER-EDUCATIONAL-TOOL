import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Calculator,
  FileSpreadsheet,
  FlaskConical,
  Palette,
  FileText,
  Globe,
  MessageSquare,
  Sparkles,
  Wifi,
  ArrowRight,
  GraduationCap,
  Lightbulb,
  Calendar,
  Cloud,
  Database,
  ThumbsUp,
  CheckCircle2,
  Zap,
  TrendingUp,
  Bot,
  Layers,
  Check,
  X
} from 'lucide-react';
import { UpliftChatbot } from './UpliftChatbot';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { ReportGenerator } from './ReportGenerator';
import { LanguageSelector } from './LanguageSelector';
import { BoiserAppInstaller } from './BoiserAppInstaller';
import { BoiserDataAccessModal } from './BoiserDataAccessModal';
import { StorageManagerModal } from './StorageManagerModal';
import { DepEdTeacherSignInModal } from './DepEdTeacherSignInModal';
import { HardDrive, Smartphone, Laptop } from 'lucide-react';

interface HomeDashboardProps {
  setActiveTab: (tab: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ setActiveTab }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDataAccessOpen, setIsDataAccessOpen] = useState(false);
  const [isStorageOpen, setIsStorageOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);
  const [suggestionVotes, setSuggestionVotes] = useState<Record<number, number>>({
    1: 42,
    2: 58,
    3: 39
  });
  const [votedIds, setVotedIds] = useState<number[]>([]);
  const [feedbackSuccess, setFeedbackSuccess] = useState<string | null>(null);

  const handleVoteSuggestion = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (votedIds.includes(id)) return;
    setSuggestionVotes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setVotedIds(prev => [...prev, id]);
    setFeedbackSuccess(`Thank you for endorsing Suggestion #${id}! Your endorsement was registered for Steaven Kinth D. Boiser's system upgrade roadmap.`);
    setTimeout(() => setFeedbackSuccess(null), 3500);
  };


  const tools = [
    {
      id: 'ilaw',
      name: 'ILAW',
      desc: 'Create lesson plans with ease.',
      icon: BookOpen,
      bgColor: 'bg-blue-100/90 text-blue-700 hover:bg-blue-200/90',
      iconColor: '#2563eb'
    },
    {
      id: 'sources',
      name: 'RESEARCH',
      desc: 'Explore. Analyze. Discover.',
      icon: Search,
      bgColor: 'bg-emerald-100/90 text-emerald-700 hover:bg-emerald-200/90',
      iconColor: '#059669'
    },
    {
      id: 'math',
      name: 'MATH',
      desc: 'Solve. Compute. Understand.',
      icon: Calculator,
      bgColor: 'bg-amber-100/90 text-amber-700 hover:bg-amber-200/90',
      iconColor: '#d97706'
    },
    {
      id: 'office',
      name: 'EXCEL',
      desc: 'Work smarter with formulas.',
      icon: FileSpreadsheet,
      bgColor: 'bg-green-100/90 text-green-700 hover:bg-green-200/90',
      iconColor: '#16a34a'
    },
    {
      id: 'science',
      name: 'SCIENCE',
      desc: 'Explore the world around you.',
      icon: FlaskConical,
      bgColor: 'bg-purple-100/90 text-purple-700 hover:bg-purple-200/90',
      iconColor: '#7c3aed'
    },
    {
      id: 'creative',
      name: 'POSTER MAKER',
      desc: 'Design. Inspire. Share.',
      icon: Palette,
      bgColor: 'bg-pink-100/90 text-pink-700 hover:bg-pink-200/90',
      iconColor: '#db2777'
    },
    {
      id: 'lnnchs_templates',
      name: 'LNNCHS TEMPLATES',
      desc: 'SF1–SF10 for Word, PDF & Excel.',
      icon: FileText,
      bgColor: 'bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200/60',
      iconColor: '#002776'
    },
    {
      id: 'curriculum',
      name: 'SEARCH',
      desc: 'Find trusted information.',
      icon: Globe,
      bgColor: 'bg-teal-100/90 text-teal-700 hover:bg-teal-200/90',
      iconColor: '#0d9488'
    },
    {
      id: 'chat',
      name: 'CHAT',
      desc: 'Your AI assistant anytime.',
      icon: MessageSquare,
      bgColor: 'bg-indigo-100/90 text-indigo-700 hover:bg-indigo-200/90',
      iconColor: '#4f46e5'
    }
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-16 relative overflow-hidden bg-white/90 rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-100 max-w-5xl mx-auto">
      
      {/* BACKGROUND DECORATIVE ELEMENTS */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* TOP HEADER BRANDING BAR */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-5">
        <div className="space-y-0.5">
          <span className="text-xl sm:text-2xl font-black tracking-wider text-[#002776] uppercase">BOISER</span>
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FCD116] flex items-center gap-1">
            <span>Build</span>
            <span className="text-slate-300">•</span>
            <span>Create</span>
            <span className="text-slate-300">•</span>
            <span>Learn</span>
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-1.5">
          <div className="bg-emerald-50 border border-emerald-100 rounded-full py-1.5 px-4 flex items-center gap-2 shadow-xs">
            <Wifi className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold text-emerald-800 tracking-tight">
              Anytime, Anywhere: Offline-Ready Active
            </span>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-full py-1.5 px-4 flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-[11px] sm:text-xs font-extrabold text-[#002776] tracking-tight">
              Better Tools for Brighter Learners
            </span>
          </div>
        </div>
      </div>

      {/* CENTERED BRANDING & LOGO SEGMENT */}
      <div className="text-center space-y-6 pt-2">
        
        {/* Animated Custom Badge/Logo Component */}
        <div className="inline-flex flex-col items-center">
          <div className="relative w-36 h-36 bg-[#002776] rounded-3xl p-1.5 shadow-xl border-4 border-[#FCD116] flex items-center justify-center transform hover:scale-105 transition-transform">
            <div className="relative w-full h-full bg-white rounded-2xl flex flex-col items-center justify-center text-center overflow-hidden shadow-inner">
              <img
                src="/boiser-logo.png"
                alt="BOISER Official App Logo"
                className="w-full h-full object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Brand Display Typography & Accents */}
        <div className="space-y-3">
          <div className="relative inline-block">
            <div className="absolute -left-6 -top-5 transform -rotate-12 drop-shadow-md z-20">
              <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 50,15 L 85,32.5 L 50,50 L 15,32.5 Z" fill="#002776" stroke="#FCD116" strokeWidth="4" />
                <path d="M 30,42 L 30,68 C 30,75 70,75 70,68 L 70,42" fill="#002776" stroke="#FCD116" strokeWidth="4" />
                <path d="M 50,32.5 L 80,48 L 80,68" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
                <circle cx="80" cy="69" r="4" fill="#EF4444" />
              </svg>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-wider text-[#002776] font-display uppercase relative">
              BOISER
            </h1>

            <div className="flex justify-center -mt-1.5">
              <div className="w-44 h-1.5 bg-gradient-to-r from-blue-700 via-yellow-400 to-blue-700 rounded-full"></div>
            </div>
          </div>

          <div>
            <span className="inline-block bg-[#FCD116] text-[#002776] px-5 py-1.5 rounded-full text-xs font-black tracking-widest uppercase shadow-xs">
              Your Educational Assistant
            </span>
          </div>
        </div>

        {/* Welcome Text Segment */}
        <div className="max-w-md mx-auto space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-2">
            <span className="text-[#FCD116]">✨</span>
            <span>Welcome!</span>
            <span className="text-[#FCD116]">✨</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            We're excited to have you here! Let's elevate learning together.
          </p>
        </div>
      </div>

      {/* 🚀 BOISER POWER TOOLS LITE: UNIVERSAL MOBILE APP COMMAND CENTER */}
      <div className="space-y-3">
        {/* Banner with Direct Install and Device Detection */}
        <BoiserAppInstaller variant="banner" />

        {/* Quick Commands Bar: BOISER DATA ACCESS, TEACHER SIGN-IN & STORAGE */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setIsDataAccessOpen(true)}
            className="group p-4 bg-gradient-to-r from-blue-900 to-indigo-950 hover:from-blue-800 hover:to-indigo-900 text-white rounded-2xl border border-blue-400/30 shadow-md transition flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div className="text-left space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                    DATA ACCESS
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-blue-200">
                  Cross-device project sync &amp; vault
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          <button
            onClick={() => setIsTeacherModalOpen(true)}
            className="group p-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 rounded-2xl border border-amber-300 shadow-md transition flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-950/20 text-stone-950 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-stone-950" />
              </div>
              <div className="text-left space-y-0.5">
                <span className="text-xs font-black uppercase tracking-wider text-stone-950">
                  TEACHER SETUP
                </span>
                <p className="text-[10px] text-stone-900 font-semibold">
                  Free for DepEd teachers (@deped.gov.ph)
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-950 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          <button
            onClick={() => setIsStorageOpen(true)}
            className="group p-4 bg-white hover:bg-stone-50 text-stone-900 rounded-2xl border border-stone-200 hover:border-stone-300 shadow-sm transition flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <HardDrive className="w-5 h-5" />
              </div>
              <div className="text-left space-y-0.5">
                <span className="text-xs font-black uppercase tracking-wider text-stone-900">
                  STORAGE
                </span>
                <p className="text-[10px] text-stone-500">
                  Manage cache &amp; device memory
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>
        </div>
      </div>

      {/* DOUBLE COMPREHENSIVE CARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        
        {/* Left Card: What is BOISER? */}
        <div className="bg-blue-50/40 border border-blue-100 rounded-3xl p-6 relative pt-10 shadow-xs hover:shadow-md transition">
          <div className="bg-[#002776] text-white px-5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider absolute -top-3 left-6 -rotate-1 shadow-sm">
            What is BOISER?
          </div>
          
          <div className="absolute top-4 right-4 bg-yellow-100 p-1.5 rounded-full">
            <Lightbulb className="w-4 h-4 text-amber-600" />
          </div>

          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-[#002776]/90 font-medium leading-relaxed">
              <strong>BOISER</strong> is your all-in-one educational assistant, created to help you build lesson plans, create engaging materials, find reliable information, and make learning easier and more meaningful.
            </p>
            <div className="relative inline-block pt-1">
              <span className="text-xs sm:text-sm font-black italic text-slate-700">
                Let's make a difference — together!
              </span>
              <div className="w-full h-1 bg-[#FCD116] rounded-full mt-0.5"></div>
            </div>
          </div>
        </div>

        {/* Right Card: BOISER means: (Acrostic) */}
        <div className="bg-purple-50/40 border border-purple-100 rounded-3xl p-6 relative pt-10 shadow-xs hover:shadow-md transition">
          <div className="bg-[#002776] text-white px-5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider absolute -top-3 left-6 rotate-1 shadow-sm">
            BOISER means:
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white font-black flex items-center justify-center text-[10px]">B</div>
              <span className="font-bold text-slate-700">Building</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-purple-500 text-white font-black flex items-center justify-center text-[10px]">S</div>
              <span className="font-bold text-slate-700">Supporting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center text-[10px]">O</div>
              <span className="font-bold text-slate-700">Opportunities</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-pink-500 text-white font-black flex items-center justify-center text-[10px]">E</div>
              <span className="font-bold text-slate-700">Education</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-amber-500 text-white font-black flex items-center justify-center text-[10px]">I</div>
              <span className="font-bold text-slate-700">Inspiring</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-sky-500 text-white font-black flex items-center justify-center text-[10px]">R</div>
              <span className="font-bold text-slate-700">Resources</span>
            </div>
          </div>
        </div>
      </div>

      {/* ☁️ GOOGLE DRIVE CLOUD BACKUP ACTION BANNER */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-xl border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold uppercase tracking-wider">
            <Cloud className="w-3.5 h-3.5 animate-pulse" />
            Official Google Drive Cloud Integration
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white">
            Save Entire App to Google Drive (Starting from Scratch)
          </h3>
          <p className="text-xs text-emerald-100/80 max-w-2xl leading-relaxed">
            1-Click automated cloud backup: uploads your 120-Section LIS Directory, SHS 49-Faculty loading, 60-Item RUTE and Life &amp; Career exams with Answer Keys &amp; TOS, and 3-Term BOW files directly to your Google Drive account.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('google_drive')}
          className="relative z-10 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg transition flex items-center gap-2 flex-shrink-0 cursor-pointer"
        >
          <Database className="w-4 h-4" />
          <span>OPEN GOOGLE DRIVE BACKUP HUB</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 💡 3 STRATEGIC SUGGESTIONS FOR IMPROVEMENT OF BOISER APP */}
      <div className="bg-gradient-to-br from-[#001f5c] via-[#002b80] to-[#0a1945] rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6 border border-amber-400/40 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-4 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-black uppercase tracking-wider">
              <Lightbulb className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              Strategic System Roadmap
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              3 Key Suggestions for Improvement of Boiser App
            </h2>
            <p className="text-xs text-blue-100/90 max-w-2xl">
              Architectural and instructional enhancement recommendations for <strong>Steaven Kinth D. Boiser's Multi-Sync Educational Suite</strong> to advance DepEd Region X digital governance.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono text-amber-300 bg-amber-950/60 px-3.5 py-1.5 rounded-2xl border border-amber-400/40 font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              SY 2026–2027 Upgrade Suite
            </span>
          </div>
        </div>

        {/* Feedback Alert if user voted */}
        {feedbackSuccess && (
          <div className="p-3.5 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl text-xs text-emerald-200 flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>{feedbackSuccess}</span>
          </div>
        )}

        {/* 3 Improvement Suggestions Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative z-10">
          {/* IMPROVEMENT 1: LIS & SF Form Pipeline */}
          <div className="bg-white/10 backdrop-blur-md hover:bg-white/15 border border-white/15 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition duration-200 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-amber-500 text-slate-950 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Suggestion #1
                </span>
                <span className="text-[10px] text-amber-300 font-mono font-bold bg-white/10 px-2 py-0.5 rounded">
                  Priority: High
                </span>
              </div>

              <h3 className="font-black text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors">
                Bi-Directional LIS &amp; SF1–SF10 Automated Cloud Pipeline
              </h3>

              <p className="text-xs text-blue-100/85 leading-relaxed">
                Connect the 120-Section Master Directory (5,400 learners) directly with DepEd Central LIS to auto-track attendance thresholds (&lt;80% DO 8, s. 2015), transfer logs, and generate 1-click quarterly SF9/SF10 report cards with zero encoding errors.
              </p>

              <div className="p-2.5 bg-black/20 rounded-xl space-y-1 text-[11px] text-blue-200">
                <div className="flex items-center gap-1.5 text-white font-bold">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Key Impact: Cuts form preparation time by 85%</span>
                </div>
                <div className="text-[10px] text-blue-300">
                  Target: 120 Section Advisers &amp; LIS Focal Person
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveTab('lnnchs_templates')}
                className="px-3 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow"
              >
                <span>Inspect LIS Forms</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={(e) => handleVoteSuggestion(1, e)}
                disabled={votedIds.includes(1)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  votedIds.includes(1)
                    ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/40'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${votedIds.includes(1) ? 'text-emerald-400' : ''}`} />
                <span>{suggestionVotes[1]} Endorsements</span>
              </button>
            </div>
          </div>

          {/* IMPROVEMENT 2: AI Differentiated ILAW Generator */}
          <div className="bg-white/10 backdrop-blur-md hover:bg-white/15 border border-white/15 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition duration-200 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-cyan-400 text-slate-950 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <Bot className="w-3 h-3" />
                  Suggestion #2
                </span>
                <span className="text-[10px] text-cyan-300 font-mono font-bold bg-white/10 px-2 py-0.5 rounded">
                  Live Beta
                </span>
              </div>

              <h3 className="font-black text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors">
                AI Differentiated ILAW &amp; MATATAG Adaptive Engine
              </h3>

              <p className="text-xs text-blue-100/85 leading-relaxed">
                Empower educators with multi-tiered ILAW worksheet synthesis (Remedial, Core Proficiency, Advanced Mastery) perfectly calibrated to DO 3, s. 2026 Three-Term Calendar and 6-level Bloom's Taxonomy Table of Specifications (TOS).
              </p>

              <div className="p-2.5 bg-black/20 rounded-xl space-y-1 text-[11px] text-blue-200">
                <div className="flex items-center gap-1.5 text-white font-bold">
                  <Check className="w-3 h-3 text-cyan-400" />
                  <span>Key Impact: Saves 5+ hours weekly per teacher</span>
                </div>
                <div className="text-[10px] text-blue-300">
                  Target: 49 SHS Faculty across 8 Departments
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveTab('ilaw')}
                className="px-3 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow"
              >
                <span>Launch ILAW Studio</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={(e) => handleVoteSuggestion(2, e)}
                disabled={votedIds.includes(2)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  votedIds.includes(2)
                    ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/40'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${votedIds.includes(2) ? 'text-emerald-400' : ''}`} />
                <span>{suggestionVotes[2]} Endorsements</span>
              </button>
            </div>
          </div>

          {/* IMPROVEMENT 3: Offline-First Classroom PWA & Google Cloud Mirror */}
          <div className="bg-white/10 backdrop-blur-md hover:bg-white/15 border border-white/15 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition duration-200 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-emerald-400 text-slate-950 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <Cloud className="w-3 h-3" />
                  Suggestion #3
                </span>
                <span className="text-[10px] text-emerald-300 font-mono font-bold bg-white/10 px-2 py-0.5 rounded">
                  Connected
                </span>
              </div>

              <h3 className="font-black text-sm sm:text-base text-white group-hover:text-emerald-300 transition-colors">
                Zero-Bandwidth Offline Mode &amp; Google Cloud Mirroring
              </h3>

              <p className="text-xs text-blue-100/85 leading-relaxed">
                Full client-side offline storage enabling classroom exam scoring and lesson delivery without internet, paired with automatic background syncing to <code>boisersteavenkinth@gmail.com</code> and <code>operativecreative@gmail.com</code> upon reconnection.
              </p>

              <div className="p-2.5 bg-black/20 rounded-xl space-y-1 text-[11px] text-blue-200">
                <div className="flex items-center gap-1.5 text-white font-bold">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Key Impact: 100% uptime during power/signal outages</span>
                </div>
                <div className="text-[10px] text-blue-300">
                  Target: Remote Classrooms &amp; Field Assessors
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveTab('google_drive')}
                className="px-3 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow"
              >
                <span>Open Google Sync</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={(e) => handleVoteSuggestion(3, e)}
                disabled={votedIds.includes(3)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  votedIds.includes(3)
                    ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/40'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${votedIds.includes(3) ? 'text-emerald-400' : ''}`} />
                <span>{suggestionVotes[3]} Endorsements</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 OFFICIAL DEPED LNNCHS SENIOR HIGH SCHOOL HIGHLIGHTS (SY 2026–2027) */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-5 border border-blue-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-800/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-amber-300">
              🌟 Official DepEd LNNCHS Senior High School Highlights (SY 2026–2027)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-blue-200 bg-blue-900/60 px-3 py-1 rounded-full border border-blue-400/30">
            School ID: 304005 • Region X
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Highlight 1: SHS Loading */}
          <button
            onClick={() => setActiveTab('lnnchs_templates')}
            className="text-left bg-white/10 hover:bg-white/15 border border-white/15 p-4 rounded-2xl transition group space-y-2 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-red-600/80 text-white rounded text-[10px] font-bold uppercase tracking-wider">
                Highlight 1
              </span>
              <GraduationCap className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-amber-300 transition-colors">
              📋 49-Faculty SHS Loading Master Summary
            </h4>
            <p className="text-[11px] text-blue-100/80 leading-relaxed">
              Complete department breakdowns (Science, Math, PE, English, Filipino, SocSci, ABM, TVL) with ALS loads, advisory credits (300 mins), and official signatories.
            </p>
          </button>

          {/* Highlight 2: Class Programs & Rotational SII */}
          <button
            onClick={() => setActiveTab('lnnchs_templates')}
            className="text-left bg-white/10 hover:bg-white/15 border border-white/15 p-4 rounded-2xl transition group space-y-2 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-blue-600/80 text-white rounded text-[10px] font-bold uppercase tracking-wider">
                Highlight 2
              </span>
              <Calendar className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition-transform" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-cyan-300 transition-colors">
              📅 Class Programs &amp; G12 Rotational SII
            </h4>
            <p className="text-[11px] text-blue-100/80 leading-relaxed">
              Full daily timetables for Pure Academic 1–10, TechPro 1–6, ALS, and rotational School Intervention Initiatives across English, Science, and Math.
            </p>
          </button>

          {/* Highlight 3: 60-Item RUTE & Life/Career Exams */}
          <button
            onClick={() => setActiveTab('lnnchs_templates')}
            className="text-left bg-white/10 hover:bg-white/15 border border-white/15 p-4 rounded-2xl transition group space-y-2 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-emerald-600/80 text-white rounded text-[10px] font-bold uppercase tracking-wider">
                Highlight 3
              </span>
              <FileText className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-emerald-300 transition-colors">
              📝 60-Item RUTE, TOS &amp; OMR Bubble Sheet
            </h4>
            <p className="text-[11px] text-blue-100/80 leading-relaxed">
              RUTE Kasaysayan exam, Life and Career Skills assessment with Table of Specifications &amp; 100% answer key by Mary Els Markines, plus scannable PDF answer sheet.
            </p>
          </button>
        </div>
      </div>

      {/* DYNAMIC NINE TOOLS GRID */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xs font-black tracking-widest text-[#002776] uppercase">
            EXPLORE THE SUITE MODULES
          </h3>
          <div className="w-12 h-0.5 bg-[#FCD116] mx-auto mt-1"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.name}
                onClick={() => {
                  if (t.id === 'chat') {
                    setIsChatOpen(true);
                  } else {
                    setActiveTab(t.id);
                  }
                }}
                className="group flex flex-col items-center justify-between p-4 bg-slate-50 hover:bg-white border border-slate-200/60 hover:border-[#002776]/40 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer h-32"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${t.bgColor} group-hover:scale-110`}>
                  <Icon className="w-5 h-5 shrink-0" style={{ color: t.iconColor }} />
                </div>

                <div className="space-y-0.5">
                  <span className="text-[11px] sm:text-xs font-black tracking-wide text-slate-800 uppercase block group-hover:text-[#002776]">
                    {t.name}
                  </span>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium leading-tight line-clamp-2 max-w-[120px]">
                    {t.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MASSIVE MAIN CALL TO ACTION ACTION */}
      <div className="flex flex-col items-center justify-center space-y-4 pt-4 border-t border-slate-100">
        <button
          onClick={() => setActiveTab('ilaw')}
          className="group px-8 py-3.5 bg-gradient-to-r from-blue-700 via-indigo-800 to-blue-900 hover:from-blue-800 hover:to-indigo-950 text-white rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-md hover:shadow-xl cursor-pointer flex items-center gap-2 transform active:scale-95"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4 text-[#FCD116] group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center gap-1.5 text-slate-400 font-serif italic text-xs">
          <span className="text-[#FCD116]">—</span>
          <span>Small steps. Big learning.</span>
          <span className="text-[#FCD116]">—</span>
        </div>
      </div>

      {/* CHATBOT FLOATING OVERLAY MODAL */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl relative flex flex-col overflow-hidden max-h-[85vh] border border-slate-100">
            <div className="bg-gradient-to-r from-[#002776] to-[#0b67b2] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-300" />
                <span className="text-xs font-black tracking-wider uppercase">BOISER AI Assistant</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
              <UpliftChatbot />
            </div>

            <div className="bg-slate-100 text-center py-2 px-4 border-t border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Powered by Localized AI Engine
              </span>
            </div>
          </div>
        </div>
      )}

      {/* BOISER DATA ACCESS MODAL */}
      <BoiserDataAccessModal
        isOpen={isDataAccessOpen}
        onClose={() => setIsDataAccessOpen(false)}
        onOpenProject={(proj) => {
          setIsDataAccessOpen(false);
          if (proj.category === 'ilaw') setActiveTab('ilaw');
          else if (proj.category === 'worksheet' || proj.category === 'activity') setActiveTab('math');
          else setActiveTab('office');
        }}
      />

      {/* STORAGE GOVERNANCE MODAL */}
      <StorageManagerModal
        isOpen={isStorageOpen}
        onClose={() => setIsStorageOpen(false)}
      />

      {/* DEPED TEACHER FREE SIGN-IN MODAL */}
      <DepEdTeacherSignInModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
      />

      {/* BOTTOM WAVY DECORATIVE DECORATION */}
      <div className="w-full h-8 flex overflow-hidden opacity-90 -mb-6">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C150,90 350,30 500,70 C650,110 850,50 1000,80 C1150,110 1200,80 1200,80 L1200,120 L0,120 Z" fill="#FCD116" opacity="0.3" />
          <path d="M0,80 C200,110 400,60 600,90 C800,120 1000,70 1200,100 L1200,120 L0,120 Z" fill="#002776" opacity="0.4" />
        </svg>
      </div>

    </div>
  );
};
