import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Search,
  PenTool,
  Compass,
  Target,
  Home,
  Monitor,
  Atom,
  QrCode,
  FileSpreadsheet,
  Moon,
  Cross,
  Settings,
  Box,
  Bot,
  Database,
  Lock,
  User,
  Globe,
  FlaskConical,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

interface HomeDashboardProps {
  setActiveTab: (tab: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#020817] text-white p-2 sm:p-4 lg:p-6 font-sans relative overflow-hidden select-none">
      
      {/* Background Ambient Atmospheric Light & Star Dust */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />

      {/* OUTER FUTURISTIC METALLIC CHASSIS FRAME */}
      <div className="max-w-[1440px] mx-auto bg-gradient-to-b from-[#061335]/95 via-[#040e29]/95 to-[#02081c]/95 border-2 border-cyan-400/40 rounded-[28px] p-3 sm:p-5 lg:p-6 shadow-[0_0_60px_rgba(0,180,255,0.2)] relative z-10 backdrop-blur-xl space-y-4 sm:space-y-6">
        
        {/* Top Metallic Bevel Highlight Bars */}
        <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent shadow-[0_0_12px_#00f0ff]" />
        <div className="absolute bottom-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

        {/* ========================================================================= */}
        {/* 1. TOP HEADER SECTION */}
        {/* ========================================================================= */}
        <header className="flex flex-col lg:flex-row items-center justify-between gap-4 border-b border-cyan-500/30 pb-4 relative">
          
          {/* Left Brand Lockup */}
          <div className="flex items-center gap-3.5 shrink-0">
            {/* 3D Metallic Blue Emblem */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-900 p-[2px] shadow-[0_0_25px_rgba(0,200,255,0.4)] group">
              <div className="w-full h-full bg-[#030c24] rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-amber-400/20" />
                {/* Custom Emblem SVG: Book + Cap + Laurel Wreath */}
                <svg className="w-10 h-10 text-cyan-300 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" viewBox="0 0 64 64" fill="none">
                  <path d="M12 22L32 10L52 22L32 34L12 22Z" fill="url(#grad1)" stroke="#00f0ff" strokeWidth="2" />
                  <path d="M20 27V38C20 42 25 46 32 46C39 46 44 42 44 38V27" stroke="#ffd700" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M10 42C10 42 16 38 32 38C48 38 54 42 54 42V52C54 52 46 48 32 48C18 48 10 52 10 52V42Z" fill="url(#grad2)" opacity="0.8" />
                  <circle cx="32" cy="22" r="3" fill="#ffd700" />
                  <defs>
                    <linearGradient id="grad1" x1="12" y1="10" x2="52" y2="34" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00d2ff" />
                      <stop offset="1" stopColor="#0055ff" />
                    </linearGradient>
                    <linearGradient id="grad2" x1="10" y1="38" x2="54" y2="52" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ffd700" />
                      <stop offset="1" stopColor="#ffaa00" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 drop-shadow-[0_2px_10px_rgba(0,180,255,0.5)]">
                  BOISER
                </h1>
                <span className="px-2 py-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-[10px] uppercase rounded-md shadow-[0_0_10px_rgba(255,215,0,0.4)]">
                  LITE V2026
                </span>
              </div>
              <p className="text-xs sm:text-sm font-black tracking-[0.2em] text-amber-400 drop-shadow-[0_0_6px_rgba(255,215,0,0.5)] uppercase">
                YOUR EDUCATIONAL ASSISTANT
              </p>
            </div>
          </div>

          {/* Center Quote Glassmorphism Banner */}
          <div className="flex-1 max-w-2xl bg-gradient-to-r from-[#071d4a]/90 via-[#0a255c]/90 to-[#071d4a]/90 border border-amber-400/50 rounded-2xl px-4 py-2.5 sm:px-6 sm:py-3 text-center shadow-[0_0_25px_rgba(255,215,0,0.12)] backdrop-blur-md">
            <p className="text-xs sm:text-sm font-semibold text-amber-200 italic tracking-wide">
              "Enjoy learning with <span className="font-black text-amber-400 not-italic drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">BOISER</span> educational resources."
            </p>
            <p className="text-[11px] sm:text-xs font-bold text-cyan-200 tracking-wide mt-1">
              <span className="text-amber-300 font-extrabold">B.O.I.S.E.R.</span> — Building Organizational Intelligence for Sustainable Educational Results.
            </p>
          </div>

          {/* Upper Right User Profile Badge */}
          <div className="flex items-center gap-3 bg-[#0a2254]/90 border border-cyan-400/50 px-4 py-2 rounded-2xl shadow-[inset_0_0_12px_rgba(0,200,255,0.2)] shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-[2px] shadow-[0_0_10px_rgba(0,200,255,0.5)] flex items-center justify-center">
              <div className="w-full h-full bg-[#041233] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-cyan-300" />
              </div>
            </div>
            <div className="text-left">
              <div className="font-black text-xs text-white tracking-wider">BOISER USER</div>
              <div className="text-[10px] font-bold text-cyan-300 tracking-wide">Learn • Create • Achieve</div>
            </div>
          </div>

        </header>

        {/* ========================================================================= */}
        {/* 2. MAIN BODY (LEFT SIDEBAR + 10 CARDS GRID + LOWER RIGHT ART) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">

          {/* LEFT SIDEBAR NAVIGATION */}
          <aside className="lg:col-span-3 bg-gradient-to-b from-[#081b42]/90 via-[#051433]/90 to-[#030c24]/90 border border-cyan-500/30 rounded-2xl p-4 flex flex-col justify-between shadow-[0_0_20px_rgba(0,180,255,0.1)] space-y-6">
            
            <div className="space-y-5">
              {/* Top Glowing Brain Icon */}
              <div className="flex items-center justify-center p-3 bg-gradient-to-b from-cyan-500/20 via-blue-600/10 to-transparent rounded-2xl border border-cyan-400/30 shadow-[0_0_20px_rgba(0,240,255,0.2)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-cyan-400/10 blur-xl group-hover:bg-cyan-400/20 transition-all" />
                {/* Glowing Brain Bulb Graphic */}
                <svg className="w-12 h-12 text-cyan-300 drop-shadow-[0_0_12px_rgba(0,240,255,0.9)] animate-pulse" viewBox="0 0 64 64" fill="none">
                  <path d="M32 8C20 8 12 16 12 28C12 34 16 40 20 44V52C20 54 22 56 24 56H40C42 56 44 54 44 52V44C48 40 52 34 52 28C52 16 44 8 32 8Z" stroke="#00f0ff" strokeWidth="2.5" fill="url(#bulbGrad)" />
                  <path d="M26 24C24 24 22 26 22 28M42 28C42 26 40 24 38 24" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" />
                  <path d="M28 56V60M36 56V60M32 56V60" stroke="#00f0ff" strokeWidth="2" />
                  <defs>
                    <linearGradient id="bulbGrad" x1="32" y1="8" x2="32" y2="56" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00f0ff" stopOpacity="0.4" />
                      <stop offset="1" stopColor="#0055ff" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* 5 Vertical Action Pills (Exact Order & Styling) */}
              <div className="space-y-2.5">
                
                {/* 1. LEARN */}
                <button
                  onClick={() => setActiveTab('ilaw')}
                  className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-3 cursor-pointer bg-gradient-to-r from-[#0066ff] via-[#0088ff] to-[#00a8ff] hover:from-[#0077ff] hover:to-[#00c8ff] text-white shadow-[0_4px_15px_rgba(0,120,255,0.4)] border border-cyan-300/60 hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(0,200,255,0.6)] group"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0 border border-white/30 group-hover:rotate-12 transition-transform">
                    <GraduationCap className="w-4 h-4 text-amber-300" />
                  </div>
                  <span className="drop-shadow-md">LEARN</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-cyan-200 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* 2. RESEARCH */}
                <button
                  onClick={() => setActiveTab('math')}
                  className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-3 cursor-pointer bg-gradient-to-r from-[#00b853] via-[#00c853] to-[#00e676] hover:from-[#00c853] hover:to-[#69f0ae] text-white shadow-[0_4px_15px_rgba(0,200,83,0.4)] border border-emerald-300/60 hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(0,230,118,0.6)] group"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0 border border-white/30 group-hover:rotate-12 transition-transform">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                  <span className="drop-shadow-md">RESEARCH</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-emerald-200 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* 3. CREATE */}
                <button
                  onClick={() => setActiveTab('office')}
                  className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-3 cursor-pointer bg-gradient-to-r from-[#ff6d00] via-[#ff8f00] to-[#ffab00] hover:from-[#ff7d00] hover:to-[#ffd600] text-white shadow-[0_4px_15px_rgba(255,109,0,0.4)] border border-amber-300/60 hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(255,171,0,0.6)] group"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0 border border-white/30 group-hover:rotate-12 transition-transform">
                    <PenTool className="w-4 h-4 text-amber-200" />
                  </div>
                  <span className="drop-shadow-md">CREATE</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-amber-100 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* 4. EXPLORE */}
                <button
                  onClick={() => setActiveTab('three_spatial')}
                  className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-3 cursor-pointer bg-gradient-to-r from-[#7c4dff] via-[#651fff] to-[#b388ff] hover:from-[#8c5dff] hover:to-[#d1c4e9] text-white shadow-[0_4px_15px_rgba(124,77,255,0.4)] border border-purple-300/60 hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(179,136,255,0.6)] group"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0 border border-white/30 group-hover:rotate-12 transition-transform">
                    <Compass className="w-4 h-4 text-purple-200" />
                  </div>
                  <span className="drop-shadow-md">EXPLORE</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-purple-200 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* 5. ACHIEVE */}
                <button
                  onClick={() => setActiveTab('grading_app')}
                  className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-3 cursor-pointer bg-gradient-to-r from-[#ff1744] via-[#f50057] to-[#ff5252] hover:from-[#ff2d55] hover:to-[#ff80ab] text-white shadow-[0_4px_15px_rgba(255,23,68,0.4)] border border-rose-300/60 hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(255,82,82,0.6)] group"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0 border border-white/30 group-hover:rotate-12 transition-transform">
                    <Target className="w-4 h-4 text-amber-300" />
                  </div>
                  <span className="drop-shadow-md">ACHIEVE</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-rose-200 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>

            {/* Handwritten Inspirational Typography Section */}
            <div className="pt-4 border-t border-cyan-500/20 text-center space-y-0.5">
              <p className="text-base sm:text-lg font-serif italic text-cyan-200 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
                Your Ideas
              </p>
              <p className="text-base sm:text-lg font-serif italic text-cyan-300 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
                Our Tools
              </p>
              <p className="text-lg sm:text-xl font-black italic text-amber-400 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">
                A Smarter
              </p>
              <p className="text-lg sm:text-xl font-black italic text-amber-300 uppercase tracking-wider drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">
                Tomorrow
              </p>
            </div>

          </aside>

          {/* MAIN 10 CARDS GRID (Exact 4-Column Layout from Reference Image) */}
          <div className="lg:col-span-9 space-y-4 sm:space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4">
              
              {/* CARD 1 — HOME */}
              <button
                onClick={() => setActiveTab('dashboard')}
                className="group relative p-4 rounded-2xl bg-gradient-to-br from-[#0055ff] via-[#0077ff] to-[#00b4ff] border-2 border-cyan-300/60 shadow-[0_8px_25px_rgba(0,120,255,0.35)] hover:scale-[1.03] hover:shadow-[0_12px_35px_rgba(0,200,255,0.6)] transition-all duration-300 text-left flex flex-col justify-between min-h-[175px] cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:bg-white/20 transition-all" />
                
                {/* 3D House Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/40 flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform">
                  <Home className="w-7 h-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
                </div>

                <div className="mt-3 space-y-1">
                  <h3 className="font-black text-base sm:text-lg tracking-tight text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    HOME
                  </h3>
                  <p className="text-xs font-semibold text-blue-100/90 leading-tight">
                    Quick access to your dashboard
                  </p>
                </div>
              </button>

              {/* CARD 2 — LNNCHS DASHBOARD */}
              <button
                onClick={() => setActiveTab('lnnchs_templates')}
                className="group relative p-4 rounded-2xl bg-gradient-to-br from-[#00695c] via-[#00897b] to-[#00e676] border-2 border-emerald-300/60 shadow-[0_8px_25px_rgba(0,200,120,0.35)] hover:scale-[1.03] hover:shadow-[0_12px_35px_rgba(0,230,130,0.6)] transition-all duration-300 text-left flex flex-col justify-between min-h-[175px] cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:bg-white/20 transition-all" />

                {/* 3D Monitor Icon with Graduation Cap */}
                <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/40 flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform relative">
                  <Monitor className="w-7 h-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
                  <GraduationCap className="w-4 h-4 text-amber-300 absolute -top-1 -right-1 drop-shadow" />
                </div>

                <div className="mt-3 space-y-1">
                  <h3 className="font-black text-base sm:text-lg tracking-tight text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    LNNCHS DASHBOARD
                  </h3>
                  <p className="text-xs font-semibold text-emerald-100/90 leading-tight">
                    Learning Management & Academic Tools
                  </p>
                </div>
              </button>

              {/* CARD 3 — RESEARCH TOOLS */}
              <button
                onClick={() => setActiveTab('math')}
                className="group relative p-4 rounded-2xl bg-gradient-to-br from-[#4a148c] via-[#6a1b9a] to-[#ab47bc] border-2 border-purple-300/60 shadow-[0_8px_25px_rgba(150,50,200,0.35)] hover:scale-[1.03] hover:shadow-[0_12px_35px_rgba(200,100,255,0.6)] transition-all duration-300 text-left flex flex-col justify-between min-h-[175px] cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:bg-white/20 transition-all" />

                {/* 3D Magnifying Glass & Science Icons */}
                <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/40 flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform relative">
                  <Search className="w-6 h-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
                  <Atom className="w-4 h-4 text-cyan-300 absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '8s' }} />
                </div>

                <div className="mt-3 space-y-1">
                  <h3 className="font-black text-base sm:text-lg tracking-tight text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    RESEARCH TOOLS
                  </h3>
                  <p className="text-xs font-semibold text-purple-100/90 leading-tight">
                    Science & Math Generated Activities and Poster Outputs
                  </p>
                </div>
              </button>

              {/* CARD 4 — GENERATED QR LAS */}
              <button
                onClick={() => setActiveTab('grading_app')}
                className="group relative p-4 rounded-2xl bg-gradient-to-br from-[#e65100] via-[#f57c00] to-[#ffb74d] border-2 border-amber-300/60 shadow-[0_8px_25px_rgba(240,120,0,0.35)] hover:scale-[1.03] hover:shadow-[0_12px_35px_rgba(255,180,0,0.6)] transition-all duration-300 text-left flex flex-col justify-between min-h-[175px] cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:bg-white/20 transition-all" />

                {/* 3D QR Code Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/40 flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform">
                  <QrCode className="w-7 h-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
                </div>

                <div className="mt-3 space-y-1">
                  <h3 className="font-black text-base sm:text-lg tracking-tight text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    GENERATED QR LAS
                  </h3>
                  <p className="text-xs font-semibold text-amber-100/90 leading-tight">
                    With Key Answers, Answer Sheets & Auto Scoring (ALL SUBJECTS)
                  </p>
                </div>
              </button>

              {/* CARD 5 — MS OFFICE */}
              <button
                onClick={() => setActiveTab('office')}
                className="group relative p-4 rounded-2xl bg-gradient-to-br from-[#b71c1c] via-[#d32f2f] to-[#ff5252] border-2 border-rose-300/60 shadow-[0_8px_25px_rgba(220,30,30,0.35)] hover:scale-[1.03] hover:shadow-[0_12px_35px_rgba(255,80,80,0.6)] transition-all duration-300 text-left flex flex-col justify-between min-h-[175px] cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:bg-white/20 transition-all" />

                {/* MS Office W X P Badges */}
                <div className="flex items-center gap-1.5 group-hover:scale-105 transition-transform">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow border border-white/30">W</span>
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow border border-white/30">X</span>
                  <span className="w-7 h-7 rounded-lg bg-orange-600 text-white font-black text-xs flex items-center justify-center shadow border border-white/30">P</span>
                </div>

                <div className="mt-3 space-y-1">
                  <h3 className="font-black text-base sm:text-lg tracking-tight text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    MS OFFICE
                  </h3>
                  <p className="text-xs font-bold text-rose-100 leading-tight">
                    Create Word, PDF, Excel, PPT + 1000 Pages Converter (Attachments: Unlimited)
                  </p>
                </div>
              </button>

              {/* CARD 6 — RELIGIOUS DASHBOARD */}
              <button
                onClick={() => setActiveTab('sources')}
                className="group relative p-4 rounded-2xl bg-gradient-to-br from-[#006064] via-[#00838f] to-[#00acc1] border-2 border-teal-300/60 shadow-[0_8px_25px_rgba(0,150,170,0.35)] hover:scale-[1.03] hover:shadow-[0_12px_35px_rgba(0,220,240,0.6)] transition-all duration-300 text-left flex flex-col justify-between min-h-[175px] cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:bg-white/20 transition-all" />

                {/* Interfaith Symbols */}
                <div className="flex items-center gap-2 group-hover:scale-110 transition-transform">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                    <Moon className="w-4 h-4 text-amber-300" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                    <Cross className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  <h3 className="font-black text-base sm:text-lg tracking-tight text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    RELIGIOUS DASHBOARD
                  </h3>
                  <p className="text-xs font-semibold text-teal-100/90 leading-tight">
                    For Muslims, Christians and Adventist (With Chat Boot for Bible Verses)
                  </p>
                </div>
              </button>

              {/* CARD 7 — SETTINGS */}
              <button
                onClick={() => setActiveTab('resources')}
                className="group relative p-4 rounded-2xl bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#3f51b5] border-2 border-indigo-300/60 shadow-[0_8px_25px_rgba(40,50,180,0.35)] hover:scale-[1.03] hover:shadow-[0_12px_35px_rgba(100,120,255,0.6)] transition-all duration-300 text-left flex flex-col justify-between min-h-[175px] cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:bg-white/20 transition-all" />

                {/* 3D Gear Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/40 flex items-center justify-center text-white shadow-inner group-hover:scale-110 group-hover:rotate-45 transition-all">
                  <Settings className="w-7 h-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
                </div>

                <div className="mt-3 space-y-1">
                  <h3 className="font-black text-base sm:text-lg tracking-tight text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    SETTINGS
                  </h3>
                  <p className="text-xs font-bold text-indigo-100 leading-tight">
                    User Guide (BISAYA / TAGALOG / ENGLISH) + Quick Tour Video (Step-by-Step Guide)
                  </p>
                </div>
              </button>

              {/* CARD 8 — 3D GENERATOR SPATIAL LAB */}
              <button
                onClick={() => setActiveTab('three_spatial')}
                className="group relative p-4 rounded-2xl bg-gradient-to-br from-[#01579b] via-[#0288d1] to-[#00e5ff] border-2 border-sky-300/60 shadow-[0_8px_25px_rgba(0,180,240,0.35)] hover:scale-[1.03] hover:shadow-[0_12px_35px_rgba(0,230,255,0.6)] transition-all duration-300 text-left flex flex-col justify-between min-h-[175px] cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:bg-white/20 transition-all" />

                {/* Glowing 3D Cube Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/40 flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform">
                  <Box className="w-7 h-7 text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] animate-pulse" />
                </div>

                <div className="mt-3 space-y-1">
                  <h3 className="font-black text-base sm:text-lg tracking-tight text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    3D GENERATOR SPATIAL LAB
                  </h3>
                  <p className="text-xs font-semibold text-sky-100/90 leading-tight">
                    3–5 Minute Lessons with Videos, Discussions & Simulations (Functions, Uses, Applications, Calculations, Earth, Planets, Anatomy)
                  </p>
                </div>
              </button>

            </div>

            {/* ROW 3: CARD 9, CARD 10, AND LOWER RIGHT GLOWING BOOK ARTWORK */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4 items-stretch">
              
              {/* CARD 9 — BOISER CHAT BOOT */}
              <button
                onClick={() => setActiveTab('chat')}
                className="group relative p-4 rounded-2xl bg-gradient-to-br from-[#880e4f] via-[#c2185b] to-[#e91e63] border-2 border-fuchsia-300/60 shadow-[0_8px_25px_rgba(200,30,100,0.35)] hover:scale-[1.03] hover:shadow-[0_12px_35px_rgba(255,50,150,0.6)] transition-all duration-300 text-left flex flex-col justify-between min-h-[175px] cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:bg-white/20 transition-all" />

                {/* 3D Robot Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/40 flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform">
                  <Bot className="w-7 h-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
                </div>

                <div className="mt-3 space-y-1">
                  <h3 className="font-black text-base sm:text-lg tracking-tight text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    BOISER CHAT BOOT
                  </h3>
                  <p className="text-xs font-semibold text-pink-100/90 leading-tight">
                    Ask • Learn • Get Answers Anytime
                  </p>
                </div>
              </button>

              {/* CARD 10 — DATA VAULT */}
              <button
                onClick={() => setActiveTab('data_vault')}
                className="group relative p-4 rounded-2xl bg-gradient-to-br from-[#0d47a1] via-[#1565c0] to-[#1e88e5] border-2 border-amber-400/70 shadow-[0_8px_25px_rgba(20,100,220,0.35)] hover:scale-[1.03] hover:shadow-[0_12px_35px_rgba(255,215,0,0.5)] transition-all duration-300 text-left flex flex-col justify-between min-h-[175px] cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:bg-white/20 transition-all" />

                {/* 3D Database Server + Lock */}
                <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/40 flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform relative">
                  <Database className="w-6 h-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
                  <Lock className="w-4 h-4 text-amber-300 absolute -top-1 -right-1" />
                </div>

                <div className="mt-3 space-y-1">
                  <h3 className="font-black text-base sm:text-lg tracking-tight text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    DATA VAULT
                  </h3>
                  <p className="text-xs font-bold text-amber-300 leading-tight">
                    🔒 Master Creator Access Only
                  </p>
                </div>
              </button>

              {/* LOWER-RIGHT FEATURE & ARTWORK PANEL (Spans 2 columns on large screens) */}
              <div className="xl:col-span-2 bg-gradient-to-r from-[#031130]/90 via-[#061d4a]/90 to-[#020b24]/90 border border-cyan-400/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_30px_rgba(0,180,255,0.15)] relative overflow-hidden min-h-[175px]">
                
                {/* Background Electric Glow & Orbit Rays */}
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

                {/* Handwritten Callout Text */}
                <div className="space-y-1 text-center sm:text-left z-10">
                  <p className="text-xl sm:text-2xl font-serif italic text-cyan-200 drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
                    Smarter Tools
                  </p>
                  <p className="text-xl sm:text-2xl font-serif italic text-cyan-300 drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
                    for Brighter
                  </p>
                  <p className="text-2xl sm:text-3xl font-black italic text-amber-300 uppercase tracking-wider drop-shadow-[0_0_12px_rgba(255,215,0,0.9)]">
                    Learners
                  </p>
                </div>

                {/* Glowing Floating Open-Book Graphic & Educational Orbit Symbols */}
                <div className="relative w-40 h-32 flex items-center justify-center shrink-0 z-10">
                  {/* Orbiting Symbols */}
                  <Globe className="w-5 h-5 text-cyan-300 absolute top-0 left-2 animate-bounce" style={{ animationDuration: '3s' }} />
                  <Atom className="w-5 h-5 text-purple-300 absolute top-2 right-4 animate-spin" style={{ animationDuration: '6s' }} />
                  <FlaskConical className="w-5 h-5 text-emerald-300 absolute bottom-2 right-2" />
                  <Sparkles className="w-4 h-4 text-amber-300 absolute bottom-0 left-4 animate-pulse" />

                  {/* 3D Glowing Open Book SVG */}
                  <svg className="w-32 h-24 text-cyan-300 drop-shadow-[0_0_20px_rgba(0,240,255,0.9)]" viewBox="0 0 100 80" fill="none">
                    <path d="M10 55C25 45 45 45 50 52C55 45 75 45 90 55V25C75 15 55 15 50 22C45 15 25 15 10 25V55Z" fill="url(#bookGrad)" stroke="#00f0ff" strokeWidth="2" />
                    <path d="M50 22V52" stroke="#ffd700" strokeWidth="2" />
                    {/* Glowing light rays emerging from pages */}
                    <path d="M50 20L30 5M50 20L50 2M50 20L70 5" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="2 2" />
                    <defs>
                      <linearGradient id="bookGrad" x1="10" y1="15" x2="90" y2="55" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00d2ff" stopOpacity="0.8" />
                        <stop offset="1" stopColor="#0033aa" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. BOTTOM FOOTER BAR */}
        {/* ========================================================================= */}
        <footer className="pt-3 border-t border-cyan-500/30 flex items-center justify-center gap-6 text-center">
          <div className="flex items-center gap-4 sm:gap-8 text-amber-300 font-black tracking-[0.25em] text-xs sm:text-sm uppercase drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
            <span>EDUCATE</span>
            <span className="text-cyan-400">|</span>
            <span>EMPOWER</span>
            <span className="text-cyan-400">|</span>
            <span>TRANSFORM</span>
          </div>
        </footer>

      </div>

    </div>
  );
};
