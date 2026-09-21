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
  Calculator
} from 'lucide-react';

export type ActiveTab =
  | 'database'
  | 'grade11-bow'
  | 'ilaw-generator'
  | 'three-term-grading'
  | 'shs-split'
  | 'lesson-planner'
  | 'assessment'
  | 'canva-bridge'
  | 'techpro'
  | 'policies';

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
    { id: 'grade11-bow', label: 'Grade 11 Three-Term BOW', icon: BookOpen, highlight: 'Strengthened SHS' },
    { id: 'database', label: 'Competency DB', icon: Database, badge: totalCompetencies },
    { id: 'ilaw-generator', label: 'Region X ILAW & LAS', icon: Sparkles, highlight: 'Figma / SVG' },
    { id: 'three-term-grading', label: '3-Term SF9 & Grading', icon: Calculator, highlight: 'DO 009 Trimester' },
    { id: 'shs-split', label: 'SHS Split Analyzer', icon: Scale, highlight: 'Gr 11 vs 12' },
    { id: 'lesson-planner', label: 'DLL / DLP Planner', icon: FileText, sub: 'DepEd 2026' },
    { id: 'assessment', label: 'Assessment & TOS', icon: CheckSquare },
    { id: 'canva-bridge', label: 'Canva Bridge', icon: Presentation },
    { id: 'techpro', label: 'TechPro Electives', icon: Wrench },
    { id: 'policies', label: 'DO 009 / 015 Policies', icon: ShieldCheck },
  ];

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-xs">
      {/* Top Banner - DepEd Blue & Gold */}
      <div className="bg-[#002776] text-stone-200 text-xs px-4 py-1.5 border-b-2 border-[#FCD116]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-bold text-[#FCD116]">
              <GraduationCap className="w-3.5 h-3.5" />
              DepEd SY 2026–2027
            </span>
            <span className="text-blue-300">•</span>
            <span>Three-Term Budget of Work (DO 009, s. 2026 — 201 Class Days)</span>
            <span className="text-blue-300">•</span>
            <span className="text-[#FCD116] font-medium">DO 015, s. 2026 Assessment Compliant</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-[#CE1126] text-white font-bold border border-red-400/30">
              Region X Standard
            </span>
            <span className="text-blue-200 hidden sm:inline">
              Official DepEd Curriculum Alignment
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0038A8] text-white flex items-center justify-center shadow-md shadow-[#0038A8]/20 shrink-0 border border-[#FCD116]/40">
              <BookOpen className="w-5 h-5 text-[#FCD116]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold font-display text-stone-900 tracking-tight">
                  BOISER POWERFUL EDUCATION TOOLS
                </h1>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-[#0038A8] border border-blue-200">
                  DepEd 2026 Master
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Department of Education Three-Term K–12 Curriculum & Learning Standards System
              </p>
            </div>
          </div>

          {/* Nav pills */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    isActive
                      ? 'bg-[#0038A8] text-white shadow-sm shadow-[#0038A8]/25'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                  {tab.highlight && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold uppercase ${
                        isActive
                          ? 'bg-[#002776] text-[#FCD116]'
                          : 'bg-amber-100 text-[#0038A8]'
                      }`}
                    >
                      {tab.highlight}
                    </span>
                  )}
                  {tab.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-[#002776] text-white'
                          : 'bg-stone-200 text-stone-700'
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
