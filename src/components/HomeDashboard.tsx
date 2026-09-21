import React from 'react';
import {
  BookOpen,
  Database,
  Sparkles,
  Calculator,
  Scale,
  FileText,
  CheckSquare,
  Presentation,
  Wrench,
  ShieldCheck,
  GraduationCap,
  ArrowRight,
  Layers,
  Cable
} from 'lucide-react';
import { ActiveTab } from './Header';

interface HomeDashboardProps {
  setActiveTab: (tab: ActiveTab) => void;
  totalCompetencies: number;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  setActiveTab,
  totalCompetencies,
}) => {
  const categories = [
    {
      title: 'Curriculum & Budget of Work (BOW)',
      description: 'Official DepEd SY 2026-2027 Three-Term curricula, 201 class days breakdown, and verified competency database.',
      color: 'bg-blue-50 border-blue-200 text-blue-950',
      iconBg: 'bg-[#0038A8] text-white',
      borderColor: 'border-l-4 border-l-[#0038A8]',
      items: [
        { id: 'grade11-bow' as ActiveTab, name: 'Grade 11 Three-Term BOW', desc: 'Trimester distribution (DO 009)', icon: BookOpen, tag: 'Strengthened SHS' },
        { id: 'techpro-bow' as ActiveTab, name: 'TechPro & EPP BOW', desc: 'Grade 12 & EPP 4 specialization', icon: Wrench, tag: 'Vocational' },
        { id: 'database' as ActiveTab, name: 'Competency Database', desc: `${totalCompetencies} verified curriculum standards`, icon: Database, badge: totalCompetencies },
      ]
    },
    {
      title: 'Instructional Design & ILAW',
      description: 'Generate DepEd Region X compliant Lesson Plans, Learning Activity Sheets (LAS), and Canva visual assets.',
      color: 'bg-amber-50 border-amber-200 text-amber-950',
      iconBg: 'bg-amber-600 text-white',
      borderColor: 'border-l-4 border-l-amber-600',
      items: [
        { id: 'ilaw-generator' as ActiveTab, name: 'Region X ILAW & LAS Generator', desc: '4-session daily lesson flow & batch export', icon: Sparkles, tag: 'Official PDF & SVG' },
        { id: 'lesson-planner' as ActiveTab, name: 'DLL / DLP Lesson Planner', desc: 'Custom instructional plan builder', icon: FileText, tag: 'DepEd 2026' },
        { id: 'canva-bridge' as ActiveTab, name: 'Canva Design Bridge', desc: 'Visual slides & infographic export', icon: Presentation, tag: 'Presentation' },
      ]
    },
    {
      title: 'Grading, Assessment & Analytics',
      description: 'Compute 3-term trimester SF9 grades, build Tables of Specifications (TOS), and analyze SHS curriculum splits.',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-950',
      iconBg: 'bg-emerald-600 text-white',
      borderColor: 'border-l-4 border-l-emerald-600',
      items: [
        { id: 'three-term-grading' as ActiveTab, name: '3-Term SF9 & Grading Engine', desc: 'Trimester weightings & honor rolls', icon: Calculator, tag: 'DO 009 Trimester' },
        { id: 'assessment' as ActiveTab, name: 'Assessment & TOS Builder', desc: 'Cognitive level item distribution', icon: CheckSquare, tag: 'Test Blueprints' },
        { id: 'shs-split' as ActiveTab, name: 'SHS Split Analyzer', desc: 'Grade 11 vs Grade 12 curriculum comparison', icon: Scale, tag: 'Comparative' },
      ]
    },
    {
      title: 'Directory & DepEd Policies',
      description: 'Access TechPro institutional directory and official Department of Education policy orders (DO 009 & DO 015, s. 2026).',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-950',
      iconBg: 'bg-indigo-600 text-white',
      borderColor: 'border-l-4 border-l-indigo-600',
      items: [
        { id: 'techpro' as ActiveTab, name: 'TechPro Directory', desc: 'Institutional staff & track directory', icon: Wrench, tag: 'Directory' },
        { id: 'policies' as ActiveTab, name: 'DO 009 & 015 Policy Guidelines', desc: 'Official Department Orders viewer', icon: ShieldCheck, tag: 'Governance' },
      ]
    },
    {
      title: 'System Connectors & Integrations',
      description: 'Decoupled external connectors for Google Workspace Gmail, Open-Source Whisper ASR, and Local LLM offline inference.',
      color: 'bg-stone-100 border-stone-200 text-stone-950',
      iconBg: 'bg-stone-900 text-white',
      borderColor: 'border-l-4 border-l-[#0038A8]',
      items: [
        { id: 'connectors' as ActiveTab, name: 'Connectors Hub', desc: 'Gmail Hub • Whisper LTM Audio • Local LLM Engine', icon: Cable, tag: 'Decoupled Console' },
      ]
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#002776] via-[#0038A8] to-blue-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden border-b-4 border-[#FCD116]">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCD116] text-[#002776] text-xs font-extrabold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            DepEd Region X • SY 2026–2027 Master Suite
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Boiser Powerful Education Tools
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Welcome to the official Three-Term K–12 Curriculum, Instructional Leadership (ILAW), and Assessment System. Choose a module below to begin planning, grading, or generating DepEd-compliant documentation.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('ilaw-generator')}
              className="px-5 py-2.5 rounded-xl bg-[#FCD116] hover:bg-amber-300 text-[#002776] text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Region X ILAW Generator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTab('grade11-bow')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center gap-2 border border-white/20 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#FCD116]" />
              <span>View Grade 11 Three-Term BOW</span>
            </button>
          </div>
        </div>
      </div>

      {/* Module Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-2xl p-6 shadow-sm border border-stone-200 ${cat.borderColor} flex flex-col justify-between hover:shadow-md transition`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                    {cat.title}
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {cat.items.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className="w-full text-left p-3 rounded-xl bg-stone-50 hover:bg-blue-50/70 border border-stone-200 hover:border-blue-300 transition flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 text-[#0038A8] flex items-center justify-center shadow-xs group-hover:bg-[#0038A8] group-hover:text-white transition shrink-0">
                          <ItemIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-stone-800 group-hover:text-[#0038A8] transition flex items-center gap-2">
                            <span>{item.name}</span>
                            {item.tag && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-stone-200 group-hover:bg-blue-200 text-stone-700 group-hover:text-blue-900 font-bold uppercase">
                                {item.tag}
                              </span>
                            )}
                            {item.badge !== undefined && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#0038A8] text-white font-bold">
                                {item.badge} items
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-stone-500">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#0038A8] group-hover:translate-x-0.5 transition shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
