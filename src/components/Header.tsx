import React, { useState } from 'react';
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
  FileSpreadsheet,
  Palette,
  FileCheck,
  ShieldAlert,
  Cable,
  Search,
  ChevronDown,
  Layers,
  X,
  Compass
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LiveClockCalendar } from './LiveClockCalendar';
import { BoiserEmpireTaglineHeader } from './BoiserEmpireTaglineHeader';

export type ActiveTab =
  | 'home'
  | 'database'
  | 'grade11-bow'
  | 'techpro-bow'
  | 'ilaw-generator'
  | 'my-ilaw-generated'
  | 'three-term-grading'
  | 'poster-maker'
  | 'excel-generator'
  | 'essay-checker'
  | 'admin-dashboard'
  | 'shs-split'
  | 'lesson-planner'
  | 'assessment'
  | 'canva-bridge'
  | 'techpro'
  | 'policies'
  | 'connectors'
  | 'local-llm'
  | 'whisper-ltm'
  | 'gmail'
  | 'csv-import'
  | 'curriculum-db'
  | 'science-math-db'
  | 'research-intelligence'
  | 'data-governance';

export type NavGroup = 'home' | 'curriculum' | 'research' | 'generator' | 'grading' | 'system';

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
  const { currentUser, isOwner, securityAlerts, activeLogoUrl } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<NavGroup>('home');

  const allTools = [
    { id: 'home' as ActiveTab, group: 'home' as NavGroup, label: 'Dashboard Home', icon: Home, desc: 'Central overview & quick launcher' },
    { id: 'csv-import' as ActiveTab, group: 'research' as NavGroup, label: 'CSV Bulk Import', icon: FileSpreadsheet, highlight: '10-Step Wizard', desc: 'Import & validate DepEd datasets' },
    { id: 'curriculum-db' as ActiveTab, group: 'curriculum' as NavGroup, label: 'Curriculum DB (Versioned)', icon: BookOpen, highlight: 'MATATAG 2026', desc: 'Version-controlled curriculum' },
    { id: 'science-math-db' as ActiveTab, group: 'research' as NavGroup, label: 'Science & Math DB', icon: Layers, highlight: 'STEM Skills', desc: 'Inquiry & reasoning maps' },
    { id: 'research-intelligence' as ActiveTab, group: 'research' as NavGroup, label: 'Research Intelligence', icon: GraduationCap, highlight: '15-Yr RRL & RRS', desc: 'Action research & STF builder' },
    { id: 'data-governance' as ActiveTab, group: 'system' as NavGroup, label: 'Data Governance & Sync', icon: ShieldCheck, highlight: 'Offline Sync', desc: 'Source provenance & audit logs' },

    { id: 'grade11-bow' as ActiveTab, group: 'curriculum' as NavGroup, label: 'Grade 11 Three-Term BOW', icon: BookOpen, highlight: 'Strengthened SHS', desc: 'Trimester distribution (DO 009)' },
    { id: 'techpro-bow' as ActiveTab, group: 'curriculum' as NavGroup, label: 'TechPro & EPP BOW', icon: Wrench, highlight: 'Gr 12 & EPP 4', desc: 'Vocational specialization BOW' },
    { id: 'database' as ActiveTab, group: 'curriculum' as NavGroup, label: 'Competency DB', icon: Database, badge: totalCompetencies, desc: 'Verified curriculum standards' },
    { id: 'shs-split' as ActiveTab, group: 'curriculum' as NavGroup, label: 'SHS Split Analyzer', icon: Scale, highlight: 'Gr 11 vs 12', desc: 'Curriculum transition split' },
    { id: 'policies' as ActiveTab, group: 'curriculum' as NavGroup, label: 'DO 009 / 015 Policies', icon: ShieldCheck, desc: 'Official DepEd Policy Orders' },
    { id: 'techpro' as ActiveTab, group: 'curriculum' as NavGroup, label: 'TechPro Directory', icon: Wrench, desc: 'Institutional staff & track directory' },

    { id: 'ilaw-generator' as ActiveTab, group: 'generator' as NavGroup, label: 'ILAW Generator Form', icon: FileText, highlight: '9-Field Form', desc: '4-session lesson plan generator' },
    { id: 'my-ilaw-generated' as ActiveTab, group: 'generator' as NavGroup, label: 'My ILAW Generated Plan', icon: Sparkles, highlight: 'DO 3 Finalized', desc: 'Saved 4-part lesson plan output' },
    { id: 'lesson-planner' as ActiveTab, group: 'generator' as NavGroup, label: 'DLL / DLP Planner', icon: FileText, highlight: 'DepEd 2026', desc: 'Custom daily lesson log planner' },
    { id: 'poster-maker' as ActiveTab, group: 'generator' as NavGroup, label: '3D Poster Maker', icon: Palette, highlight: 'Values', desc: 'Classroom poster designer' },

    { id: 'three-term-grading' as ActiveTab, group: 'grading' as NavGroup, label: '3-Term SF9 & Grading', icon: Calculator, highlight: 'DO 009 Trimester', desc: 'Trimester grade calculator' },
    { id: 'assessment' as ActiveTab, group: 'grading' as NavGroup, label: 'Assessment & TOS', icon: CheckSquare, desc: 'Test blueprint & TOS builder' },
    { id: 'excel-generator' as ActiveTab, group: 'grading' as NavGroup, label: 'Excel & SF Generator', icon: FileSpreadsheet, highlight: 'Formulas', desc: 'DepEd School Forms builder' },
    { id: 'essay-checker' as ActiveTab, group: 'grading' as NavGroup, label: 'Essay & AI Checker', icon: FileCheck, highlight: 'DepEd Rubric', desc: 'Essay evaluation tool' },
    { id: 'canva-bridge' as ActiveTab, group: 'grading' as NavGroup, label: 'Canva Bridge', icon: Presentation, desc: 'Visual slide & deck exporter' },

    { id: 'connectors' as ActiveTab, group: 'system' as NavGroup, label: 'Connectors Hub', icon: Cable, highlight: 'Gmail • Whisper • LLM', desc: 'Decoupled system connectors' },
    { id: 'admin-dashboard' as ActiveTab, group: 'system' as NavGroup, label: 'Admin & Security', icon: ShieldAlert, badge: securityAlerts.length > 0 ? securityAlerts.length : undefined, desc: 'Owner admin console' },
  ];

  const primaryGroups = [
    { id: 'home' as NavGroup, label: 'Home', icon: Home, count: 1 },
    { id: 'research' as NavGroup, label: 'CSV & Research', icon: GraduationCap, count: 3 },
    { id: 'curriculum' as NavGroup, label: 'Curriculum & BOW', icon: BookOpen, count: 7 },
    { id: 'generator' as NavGroup, label: 'Lesson & ILAW', icon: Sparkles, count: 4 },
    { id: 'grading' as NavGroup, label: 'Grading & TOS', icon: Calculator, count: 5 },
    { id: 'system' as NavGroup, label: 'Connectors & Governance', icon: Cable, count: 3 },
  ];

  // Map active tab to current group automatically
  const currentActiveTool = allTools.find((t) => t.id === activeTab);
  const currentNavGroup = currentActiveTool?.group || 'home';

  const visibleTools = allTools.filter((t) => {
    if (activeGroup === 'home') return true;
    return t.group === activeGroup;
  });

  const searchResults = searchQuery.trim()
    ? allTools.filter(
        (t) =>
          t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (t.highlight && t.highlight.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allTools;

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-b from-white via-stone-50 to-stone-100 border-b-2 border-stone-300 shadow-[0_12px_30px_-10px_rgba(0,40,120,0.18)]">
      {/* Boiser Empire Tagline & Welcoming Note */}
      <BoiserEmpireTaglineHeader />

      {/* Top Banner - DepEd Blue & Gold */}
      <div className="bg-gradient-to-r from-[#001f5c] via-[#0038A8] to-[#001f5c] text-stone-200 text-xs px-4 py-2 border-b-2 border-[#FCD116] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 drop-shadow-sm">
            <span className="inline-flex items-center gap-1 font-extrabold text-[#FCD116]">
              <GraduationCap className="w-4 h-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" />
              DepEd SY 2026–2027
            </span>
            <span className="text-blue-300">•</span>
            <span className="font-medium">Three-Term Budget of Work (DO 009, s. 2026)</span>
            <span className="text-blue-300">•</span>
            <span className="text-[#FCD116] font-bold">DO 015, s. 2026 Compliant</span>
          </div>

          <div className="flex items-center gap-2.5 text-[11px]">
            <LiveClockCalendar />
            <button
              onClick={() => setIsSearchOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#FCD116]" />
              <span>Search Tools...</span>
            </button>
            <button
              onClick={() => setActiveTab('admin-dashboard')}
              title="View Owner Admin & Security Console"
              className={`px-2.5 py-0.5 rounded-md font-extrabold border shadow-sm transition flex items-center gap-1.5 cursor-pointer ${
                isOwner
                  ? 'bg-gradient-to-r from-[#FCD116] to-amber-400 text-[#002776] border-yellow-300 hover:brightness-110'
                  : 'bg-white/15 text-stone-200 border-white/20 hover:bg-white/25'
              }`}
            >
              <span>{isOwner ? '👑 Owner: S. Boiser' : '👤 User Mode'}</span>
            </button>
            <span className="px-2.5 py-0.5 rounded-md bg-[#CE1126] text-white font-extrabold border-t border-red-400 shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
              Region X Standard
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Brand & Category Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Official Logo & Title */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => setActiveTab('home')}
              className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0047ff] via-[#0038A8] to-[#002070] text-white flex items-center justify-center shadow-[0_6px_14px_-2px_rgba(0,56,168,0.4)] border-2 border-[#FCD116] shrink-0 overflow-hidden cursor-pointer hover:scale-105 transition"
            >
              <img
                src={activeLogoUrl}
                alt="BOISER Powerful Education Tools Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div onClick={() => setActiveTab('home')} className="cursor-pointer">
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-extrabold font-display text-stone-900 tracking-tight">
                  BOISER POWERFUL EDUCATION TOOLS
                </h1>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-blue-100 text-[#0038A8] border border-blue-200">
                  v2026.1
                </span>
              </div>
              <p className="text-[11px] text-stone-600 font-medium">
                DepEd Region X Three-Term K–12 Curriculum &amp; ILAW Master Suite
              </p>
            </div>
          </div>

          {/* Primary Group Category Bar */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {primaryGroups.map((grp) => {
              const Icon = grp.icon;
              const isGrpActive = activeGroup === grp.id || (activeGroup === 'home' && grp.id === currentNavGroup);
              return (
                <button
                  key={grp.id}
                  onClick={() => {
                    setActiveGroup(grp.id);
                    if (grp.id === 'home') setActiveTab('home');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    isGrpActive
                      ? 'bg-[#002776] text-white shadow-sm border border-blue-600'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isGrpActive ? 'text-[#FCD116]' : 'text-[#0038A8]'}`} />
                  <span>{grp.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Tool Selection Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-none border-t border-stone-200/80">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Compass className="w-3 h-3 text-[#0038A8]" />
            <span>Tools:</span>
          </span>
          {visibleTools.map((tab) => {
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0038A8] to-[#002776] text-white shadow-xs border border-blue-500'
                    : 'bg-white/80 text-stone-700 hover:bg-white hover:text-stone-900 border border-stone-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#FCD116]' : 'text-[#0038A8]'}`} />
                <span>{tab.label}</span>
                {tab.highlight && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold ${
                      isActive ? 'bg-[#001c54] text-[#FCD116]' : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {tab.highlight}
                  </span>
                )}
                {tab.badge !== undefined && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isActive ? 'bg-[#001f5c] text-white' : 'bg-stone-200 text-stone-800'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Tool Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-start justify-center pt-16 px-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-3">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <Search className="w-4 h-4 text-[#0038A8]" />
                <span>Quick Tool Search &amp; Launcher</span>
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tool name, e.g. ILAW, SF9, TOS, CSV, Policy..."
              className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-stone-50 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none mb-3"
            />

            <div className="max-h-72 overflow-y-auto space-y-1.5">
              {searchResults.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setActiveTab(tool.id);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50/80 border border-transparent hover:border-blue-200 transition flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#0038A8] flex items-center justify-center font-bold shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-800 group-hover:text-[#0038A8]">
                          {tool.label}
                        </div>
                        <div className="text-[11px] text-stone-500">{tool.desc}</div>
                      </div>
                    </div>
                    {tool.highlight && (
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 shrink-0">
                        {tool.highlight}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

