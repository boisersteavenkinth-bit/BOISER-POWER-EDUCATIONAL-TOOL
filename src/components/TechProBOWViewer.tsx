import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  Award, 
  Sparkles, 
  ChevronRight, 
  ChevronDown, 
  Copy, 
  Layers, 
  ArrowRight,
  Printer,
  BookmarkCheck,
  Briefcase,
  Laptop,
  Utensils,
  Anchor,
  Baby,
  Cpu
} from 'lucide-react';
import { ALL_TECHPRO_BOW_ELECTIVES } from '../data/techProBOWRegistry';
import { EPP_GRADE4_ICT_BOW, TechProBOWElective, EPPGrade4BOW } from '../data/techProBOWData';

interface TechProBOWViewerProps {
  onSelectForILAW?: (subjectTitle: string, gradeLevel: string, topic: string, week: string) => void;
}

export const TechProBOWViewer: React.FC<TechProBOWViewerProps> = ({ onSelectForILAW }) => {
  const [activeTab, setActiveTab] = useState<'techpro' | 'epp'>('techpro');
  const [selectedElectiveId, setSelectedElectiveId] = useState<string>('ia-mmaw');
  const [selectedEPPTerm, setSelectedEPPTerm] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [expandedWeeks, setExpandedWeeks] = useState<Record<string, boolean>>({ 'Week 1': true, 'Week 2': true });
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const electivesList = useMemo(() => Object.values(ALL_TECHPRO_BOW_ELECTIVES), []);

  const sectors = useMemo(() => {
    const set = new Set<string>();
    electivesList.forEach(e => set.add(e.sector));
    return ['All', ...Array.from(set)];
  }, [electivesList]);

  const filteredElectives = useMemo(() => {
    return electivesList.filter(e => {
      const matchesSector = selectedSector === 'All' || e.sector === selectedSector;
      const matchesSearch = searchQuery === '' || 
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.cluster.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.weeks.some(w => 
          w.learningCompetencies.some(lc => lc.toLowerCase().includes(searchQuery.toLowerCase())) ||
          w.suggestedActivities?.some(act => act.title.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      return matchesSector && matchesSearch;
    });
  }, [electivesList, selectedSector, searchQuery]);

  const currentElective: TechProBOWElective | undefined = ALL_TECHPRO_BOW_ELECTIVES[selectedElectiveId] || electivesList[0];
  const currentEPPTerm = EPP_GRADE4_ICT_BOW.terms.find(t => t.term === selectedEPPTerm) || EPP_GRADE4_ICT_BOW.terms[0];

  const toggleWeek = (weekName: string) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [weekName]: !prev[weekName]
    }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotification(label);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  const getSectorIcon = (sector: string) => {
    if (sector.includes('Industrial')) return <Cpu className="w-4 h-4 text-amber-600" />;
    if (sector.includes('ICT')) return <Laptop className="w-4 h-4 text-blue-600" />;
    if (sector.includes('Consumer') || sector.includes('FCS')) return <Utensils className="w-4 h-4 text-emerald-600" />;
    if (sector.includes('Maritime')) return <Anchor className="w-4 h-4 text-cyan-600" />;
    return <Briefcase className="w-4 h-4 text-slate-600" />;
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              DepEd Regional Memorandum / Curriculum Issuance • April 28, 2026
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              TechPro & EPP Budget of Work (BOW) Explorer
            </h1>
            <p className="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
              Official DepEd standards-aligned 11-week electives for Grade 12 TechPro specializations and 3-Term Grade 4 EPP: ICT curriculum mapping with suggested classroom activities and assessment tasks.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 shrink-0 self-start md:self-center">
            <button
              onClick={() => setActiveTab('techpro')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'techpro'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Grade 12 TechPro ({electivesList.length} Electives)
            </button>
            <button
              onClick={() => setActiveTab('epp')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'epp'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Baby className="w-4 h-4" />
              Grade 4 EPP: ICT (3 Terms)
            </button>
          </div>
        </div>

        {copiedNotification && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Copied {copiedNotification} to clipboard!
          </div>
        )}
      </div>

      {activeTab === 'techpro' ? (
        /* TechPro Electives Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar: Filter & Electives List */}
          <div className="lg:col-span-4 space-y-4">
            {/* Search & Sector Filters */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search electives or competencies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Sector Filter
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {sectors.map(sector => (
                    <button
                      key={sector}
                      onClick={() => setSelectedSector(sector)}
                      className={`px-2.5 py-1 text-xs rounded-md transition-all font-medium ${
                        selectedSector === sector
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {sector}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* List of Electives */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col max-h-[700px]">
              <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Elective Subjects ({filteredElectives.length})
                </span>
                <span className="text-[11px] text-slate-500">Grade 12 • 1 Term</span>
              </div>
              <div className="overflow-y-auto divide-y divide-slate-100 p-1">
                {filteredElectives.map(elective => {
                  const isSelected = elective.id === selectedElectiveId;
                  return (
                    <button
                      key={elective.id}
                      onClick={() => {
                        setSelectedElectiveId(elective.id);
                        setExpandedWeeks({ 'Week 1': true, 'Week 2': true });
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-all flex items-start gap-3 ${
                        isSelected 
                          ? 'bg-indigo-50 border border-indigo-200/80 text-indigo-950 shadow-sm' 
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {getSectorIcon(elective.sector)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold leading-snug line-clamp-1">
                          {elective.title}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                          <span className="font-medium text-slate-600">{elective.cluster}</span>
                          <span>•</span>
                          <span>{elective.weeks.length} Weeks</span>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-indigo-600 translate-x-0.5' : 'text-slate-300'}`} />
                    </button>
                  );
                })}
                {filteredElectives.length === 0 && (
                  <div className="p-6 text-center text-sm text-slate-400">
                    No electives match your query.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Main Content: Detailed BOW View */}
          {currentElective && (
            <div className="lg:col-span-8 space-y-5">
              {/* Elective Header Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full">
                        {currentElective.sector}
                      </span>
                      <span className="text-xs text-slate-500">
                        {currentElective.cluster}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1.5">
                      {currentElective.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => copyToClipboard(
                        `${currentElective.title} - Budget of Work (${currentElective.weeks.length} Weeks)\n` +
                        currentElective.weeks.map(w => `${w.week}: ${w.learningCompetencies.join('; ')}`).join('\n'),
                        'Competencies'
                      )}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                      title="Copy competencies to clipboard"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy BOW
                    </button>

                    {onSelectForILAW && (
                      <button
                        onClick={() => onSelectForILAW(
                          currentElective.title,
                          currentElective.gradeLevel,
                          currentElective.cluster,
                          'Week 1'
                        )}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Plan in ILAW
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200/80 rounded-lg p-3">
                  <strong>Notice on Delivery:</strong> {currentElective.deliveryNote}
                </div>

                {/* Content & Performance Standards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200/70">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      Content Standards
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-outside ml-4">
                      {currentElective.contentStandards.map((std, idx) => (
                        <li key={idx} className="leading-relaxed">{std}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200/70">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      <Award className="w-4 h-4 text-emerald-600" />
                      Performance Standards
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-outside ml-4">
                      {currentElective.performanceStandards.map((std, idx) => (
                        <li key={idx} className="leading-relaxed">{std}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Weekly Matrix Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    Weekly Learning Competencies & Suggested Activities
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    {currentElective.weeks.length} Instructional Periods
                  </span>
                </div>

                {currentElective.weeks.map((weekItem) => {
                  const isExpanded = !!expandedWeeks[weekItem.week];
                  return (
                    <div 
                      key={weekItem.week}
                      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleWeek(weekItem.week)}
                        className="w-full px-4 py-3.5 bg-slate-50 hover:bg-slate-100/80 border-b border-slate-100 flex items-center justify-between text-left transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 bg-indigo-600 text-white font-bold text-xs rounded-md shadow-xs">
                            {weekItem.week}
                          </span>
                          <span className="text-sm font-semibold text-slate-800">
                            {weekItem.learningCompetencies.length} Competencies Defined
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                            {isExpanded ? 'Collapse' : 'Expand Details'}
                          </span>
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-500" />
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-4 md:p-5 space-y-4">
                          {/* Competencies */}
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                              Learning Competencies
                            </span>
                            <div className="space-y-1.5">
                              {weekItem.learningCompetencies.map((lc, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{lc}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Suggested Activities */}
                          {weekItem.suggestedActivities && weekItem.suggestedActivities.length > 0 && (
                            <div>
                              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 block mb-2">
                                Suggested Instructional Activities
                              </span>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {weekItem.suggestedActivities.map((act, actIdx) => (
                                  <div 
                                    key={actIdx} 
                                    className="p-3.5 rounded-lg bg-indigo-50/40 border border-indigo-100 space-y-1.5"
                                  >
                                    <div className="text-xs font-bold text-indigo-950 flex items-center justify-between">
                                      <span>{act.title}</span>
                                      <BookmarkCheck className="w-3.5 h-3.5 text-indigo-600" />
                                    </div>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                      {act.description}
                                    </p>
                                    {act.prompt && (
                                      <p className="text-[11px] text-indigo-800/90 font-medium bg-white/70 p-2 rounded border border-indigo-100/60 mt-1">
                                        <strong>Instructional Prompt:</strong> {act.prompt}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {onSelectForILAW && (
                            <div className="pt-2 flex justify-end">
                              <button
                                onClick={() => onSelectForILAW(
                                  currentElective.title,
                                  currentElective.gradeLevel,
                                  currentElective.cluster,
                                  weekItem.week
                                )}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                              >
                                Create Lesson & LAS for {weekItem.week}
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Performance Tasks Section */}
              {currentElective.suggestedPerformanceTasks && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-600" />
                    Culminating Performance Tasks
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {currentElective.suggestedPerformanceTasks.map((pt, idx) => (
                      <div 
                        key={idx}
                        className={`p-4 rounded-lg border ${
                          pt.type === 'Individual' 
                            ? 'bg-blue-50/40 border-blue-100' 
                            : 'bg-emerald-50/40 border-emerald-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-slate-900">
                            {pt.title}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            pt.type === 'Individual' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {pt.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {pt.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Grade 4 EPP: ICT 3-Term Layout */
        <div className="space-y-6">
          {/* EPP Header Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    {EPP_GRADE4_ICT_BOW.learningArea}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {EPP_GRADE4_ICT_BOW.gradeLevel} • Three-Term Complete Sequence
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Edukasyong Pantahanan at Pangkabuhayan (EPP): ICT
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Comprehensive 3-Term Budget of Work aligned with DepEd DO 009, s. 2026 guidelines for primary basic education.
                </p>
              </div>

              {/* Term Selector */}
              <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
                {EPP_GRADE4_ICT_BOW.terms.map(t => (
                  <button
                    key={t.term}
                    onClick={() => setSelectedEPPTerm(t.term)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      selectedEPPTerm === t.term
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Term {t.term} ({t.weeks.length} Periods)
                  </button>
                ))}
              </div>
            </div>

            {/* Current Term Standards */}
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-indigo-950">
                  Term {currentEPPTerm.term}: {currentEPPTerm.termTitle}
                </h3>
                {onSelectForILAW && (
                  <button
                    onClick={() => onSelectForILAW(
                      'EPP 4: ICT',
                      'Grade 4',
                      currentEPPTerm.termTitle,
                      'Weeks 1–2'
                    )}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Plan in ILAW
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200/70">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                    Pamantayang Pangnilalaman (Content Standard)
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {currentEPPTerm.contentStandard}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200/70">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                    Pamantayan sa Pagganap (Performance Standard)
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {currentEPPTerm.performanceStandard}
                  </p>
                </div>
              </div>

              {/* Term Suggested Culminating Activities */}
              {currentEPPTerm.suggestedActivities && currentEPPTerm.suggestedActivities.length > 0 && (
                <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 block">
                    Mungkahing Gawain sa Pagganap (Suggested Culminating Activities)
                  </span>
                  <div className="space-y-2">
                    {currentEPPTerm.suggestedActivities.map((actText, actIdx) => (
                      <div key={actIdx} className="text-xs text-indigo-950/90 leading-relaxed bg-white/80 p-3 rounded-lg border border-indigo-100">
                        {actText}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* EPP Weeks Matrix */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              Term {currentEPPTerm.term} Weekly Learning Competencies
            </h3>

            {currentEPPTerm.weeks.map(weekItem => {
              const isExpanded = !!expandedWeeks[weekItem.weeks];
              return (
                <div 
                  key={weekItem.weeks}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleWeek(weekItem.weeks)}
                    className="w-full px-4 py-3.5 bg-slate-50 hover:bg-slate-100/80 border-b border-slate-100 flex items-center justify-between text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 bg-indigo-600 text-white font-bold text-xs rounded-md">
                        {weekItem.weeks}
                      </span>
                      <span className="text-sm font-semibold text-slate-800">
                        {weekItem.learningCompetencies.length} Competencies
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-5 space-y-4">
                      {/* Competencies */}
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                          Mga Kasanayang Pampagkatuto (Learning Competencies)
                        </span>
                        <div className="space-y-1.5">
                          {weekItem.learningCompetencies.map((lc, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-100">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{lc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {onSelectForILAW && (
                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() => onSelectForILAW(
                              'EPP 4: ICT',
                              'Grade 4',
                              currentEPPTerm.termTitle,
                              weekItem.weeks
                            )}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                          >
                            Plan Lesson in ILAW Generator
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
