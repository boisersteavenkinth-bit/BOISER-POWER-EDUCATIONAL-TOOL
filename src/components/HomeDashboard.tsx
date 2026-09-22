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
  X
} from 'lucide-react';
import { UpliftChatbot } from './UpliftChatbot';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { ReportGenerator } from './ReportGenerator';
import { LanguageSelector } from './LanguageSelector';

interface HomeDashboardProps {
  setActiveTab: (tab: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ setActiveTab }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

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
      id: 'curriculum',
      name: 'LNCHS TEMPLATES',
      desc: 'Ready-made school resources.',
      icon: FileText,
      bgColor: 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/90',
      iconColor: '#475569'
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
