import React from 'react';
import {
  BookOpen,
  Database,
  Scale,
  FileText,
  CheckSquare,
  Presentation,
  Wrench,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Calculator,
  Home,
  Cpu,
  Mail,
  Mic,
  Cable
} from 'lucide-react';

export type ActiveTab =
  | 'home'
  | 'database'
  | 'grade11-bow'
  | 'techpro-bow'
  | 'ilaw-generator'
  | 'three-term-grading'
  | 'shs-split'
  | 'lesson-planner'
  | 'assessment'
  | 'canva-bridge'
  | 'techpro'
  | 'policies'
  | 'connectors'
  | 'local-llm'
  | 'whisper-ltm'
  | 'gmail';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  totalCompetencies: number;
  verifiedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  totalCompetencies,
  verifiedCount,
}) => {
  const tabs = [
    { id: 'home', label: 'Dashboard Home', icon: Home },
    { id: 'grade11-bow', label: 'Grade 11 Three-Term BOW', icon: BookOpen, highlight: 'Strengthened SHS' },
    { id: 'techpro-bow', label: 'TechPro & EPP BOW', icon: Wrench, highlight: 'Gr 12 & EPP 4' },
    { id: 'database', label: 'Competency DB', icon: Database, badge: totalCompetencies },
    { id: 'ilaw-generator', label: 'Region X ILAW & LAS', icon: Sparkles, highlight: 'Figma / SVG' },
    { id: 'three-term-grading', label: '3-Term SF9 & Grading', icon: Calculator, highlight: 'DO 009 Trimester' },
    { id: 'shs-split', label: 'SHS Split Analyzer', icon: Scale, highlight: 'Gr 11 vs 12' },
    { id: 'lesson-planner', label: 'DLL / DLP Planner', icon: FileText, sub: 'DepEd 2026' },
    { id: 'assessment', label: 'Assessment & TOS', icon: CheckSquare },
    { id: 'canva-bridge', label: 'Canva Bridge', icon: Presentation },
    { id: 'techpro', label: 'TechPro Directory', icon: Wrench },
    { id: 'policies', label: 'DO 009 / 015 Policies', icon: ShieldCheck },
    { id: 'connectors', label: 'Connectors Hub', icon: Cable, highlight: 'Gmail • Whisper • LLM' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-b from-white via-stone-50 to-stone-100 border-b-2 border-stone-300 shadow-[0_12px_30px_-10px_rgba(0,40,120,0.18)]">
      {/* Top 3D Banner - DepEd Blue & Gold with Embossed Inset */}
      <div className="bg-gradient-to-r from-[#001f5c] via-[#0038A8] to-[#001f5c] text-stone-200 text-xs px-4 py-2 border-b-2 border-[#FCD116] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 drop-shadow-sm">
            <span className="inline-flex items-center gap-1 font-extrabold text-[#FCD116]">
              <GraduationCap className="w-4 h-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" />
              DepEd SY 2026–2027
            </span>
            <span className="text-blue-300">•</span>
            <span className="font-medium">Three-Term Budget of Work (DO 009, s. 2026 — 201 Class Days)</span>
            <span className="text-blue-300">•</span>
            <span className="text-[#FCD116] font-bold">DO 015, s. 2026 Assessment Compliant</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="px-2.5 py-0.5 rounded-md bg-[#CE1126] text-white font-extrabold border-t border-red-400 shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)]">
              Region X Standard
            </span>
            <span className="text-blue-200 hidden sm:inline font-medium">
              Official DepEd Curriculum Alignment
            </span>
          </div>
        </div>
      </div>

      {/* Main 3D Header Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* 3D Tactile Logo Emblem */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0047ff] via-[#0038A8] to-[#002070] text-white flex items-center justify-center shadow-[0_8px_16px_-4px_rgba(0,56,168,0.4),inset_0_1px_2px_rgba(255,255,255,0.4)] border-t border-blue-300 shrink-0">
              <BookOpen className="w-6 h-6 text-[#FCD116] drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-lg sm:text-xl font-extrabold font-display text-stone-900 tracking-tight drop-shadow-[0_1px_0_rgba(255,255,255,1)]">
                  BOISER POWERFUL EDUCATION TOOLS
                </h1>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-lg bg-blue-100 text-[#0038A8] border border-blue-300 shadow-[0_2px_4px_rgba(0,56,168,0.1)]">
                  DepEd 2026 Master
                </span>
              </div>
              <p className="text-xs text-stone-600 font-medium">
                Department of Education Three-Term K–12 Curriculum & Learning Standards System
              </p>
            </div>
          </div>

          {/* 3D Nav Pills */}
          <nav className="flex items-center gap-1.5 overflow-x-auto pb-1.5 md:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive =
                activeTab === tab.id ||
                (tab.id === 'connectors' &&
                  (activeTab === 'whisper-ltm' ||
                    activeTab === 'gmail' ||
                    activeTab === 'local-llm'));
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-b from-[#0047ff] via-[#0038A8] to-[#002776] text-white shadow-[0_6px_16px_rgba(0,56,168,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] border-t border-blue-400 translate-y-[-1px]'
                      : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 shadow-[0_3px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] border border-stone-200/80 active:translate-y-[1px]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#FCD116] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]' : 'text-[#0038A8]'}`} />
                  <span>{tab.label}</span>
                  {tab.highlight && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-md font-extrabold uppercase tracking-wide ${
                        isActive
                          ? 'bg-[#002070] text-[#FCD116] border border-blue-800 shadow-[inset_0_1px_1px_rgba(0,0,0,0.3)]'
                          : 'bg-amber-100 text-amber-900 border border-amber-200'
                      }`}
                    >
                      {tab.highlight}
                    </span>
                  )}
                  {tab.badge !== undefined && (
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-extrabold ${
                        isActive
                          ? 'bg-[#001f5c] text-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]'
                          : 'bg-stone-200 text-stone-800'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

