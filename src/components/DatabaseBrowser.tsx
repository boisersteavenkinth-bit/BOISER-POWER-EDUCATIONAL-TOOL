import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Presentation,
  CheckSquare,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  X,
  Layers,
  Copy,
  Check,
  ListChecks,
  Square
} from 'lucide-react';
import { CompetencyRecord, KeyStage, TermNumber, VerificationStatus } from '../types';
import { exportCompetenciesToPdf, exportCompetenciesToDocx } from '../utils/competencyExporter';
import { parseCompetencyCSV, generateSampleCompetencyCSV } from '../utils/csvImporter';

interface DatabaseBrowserProps {
  competencies: CompetencyRecord[];
  onSelectForLessonPlan: (comp: CompetencyRecord) => void;
  onSelectForAssessment: (comp: CompetencyRecord) => void;
  onSelectForCanva: (comp: CompetencyRecord) => void;
  onNavigateToGrade11BOW?: () => void;
  onImportCompetencies?: (records: CompetencyRecord[]) => void;
}

export const DatabaseBrowser: React.FC<DatabaseBrowserProps> = ({
  competencies,
  onSelectForLessonPlan,
  onSelectForAssessment,
  onSelectForCanva,
  onNavigateToGrade11BOW,
  onImportCompetencies
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKeyStage, setSelectedKeyStage] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedTerm, setSelectedTerm] = useState<string>('all');
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [selectedVerification, setSelectedVerification] = useState<string>('all');
  const [transitionOnly, setTransitionOnly] = useState<boolean>(false);
  const [activeModalComp, setActiveModalComp] = useState<CompetencyRecord | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [selectedCompIds, setSelectedCompIds] = useState<Set<string>>(new Set());

  // CSV Import state
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [csvParsedRecords, setCsvParsedRecords] = useState<CompetencyRecord[]>([]);
  const [csvErrorMessages, setCsvErrorMessages] = useState<string[]>([]);
  const [csvFileName, setCsvFileName] = useState<string>('');

  const handleCsvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      if (text) {
        const result = parseCompetencyCSV(text);
        if (result.success) {
          setCsvParsedRecords(result.records);
          setCsvErrorMessages([]);
        } else {
          setCsvParsedRecords([]);
          setCsvErrorMessages(result.errors);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleDownloadSampleCsv = () => {
    const csvContent = generateSampleCompetencyCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deped_competencies_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleConfirmCsvImport = () => {
    if (csvParsedRecords.length === 0) return;
    if (onImportCompetencies) {
      onImportCompetencies(csvParsedRecords);
    }
    alert(`Successfully imported ${csvParsedRecords.length} new competencies into local storage!`);
    setIsCsvModalOpen(false);
    setCsvParsedRecords([]);
    setCsvFileName('');
  };

  const toggleSelectComp = (id: string) => {
    setSelectedCompIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAllFiltered = () => {
    const filteredIds = filtered.map((c) => c.id);
    const allSelected = filteredIds.length > 0 && filteredIds.every((id) => selectedCompIds.has(id));
    if (allSelected) {
      setSelectedCompIds((prev) => {
        const next = new Set(prev);
        filteredIds.forEach((id) => next.delete(id));
        return next;
      });
    } else {
      setSelectedCompIds((prev) => {
        const next = new Set(prev);
        filteredIds.forEach((id) => next.add(id));
        return next;
      });
    }
  };

  const handleClearSelection = () => {
    setSelectedCompIds(new Set());
  };

  const selectedCompetenciesList = useMemo(() => {
    return competencies.filter((c) => selectedCompIds.has(c.id));
  }, [competencies, selectedCompIds]);

  const handleExportSelectedPdf = () => {
    if (selectedCompetenciesList.length === 0) return;
    exportCompetenciesToPdf(selectedCompetenciesList, 'DepEd_2026_Combined_Competencies');
  };

  const handleExportSelectedDocx = async () => {
    if (selectedCompetenciesList.length === 0) return;
    await exportCompetenciesToDocx(selectedCompetenciesList, 'DepEd_2026_Combined_Competencies');
  };

  // Filter logic
  const filtered = useMemo(() => {
    return competencies.filter((c) => {
      // Search text
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const match =
          c.learning_competency.toLowerCase().includes(q) ||
          c.subject_title.toLowerCase().includes(q) ||
          c.subject_code.toLowerCase().includes(q) ||
          (c.competency_code && c.competency_code.toLowerCase().includes(q)) ||
          (c.domain && c.domain.toLowerCase().includes(q)) ||
          (c.content_standard && c.content_standard.toLowerCase().includes(q));
        if (!match) return false;
      }

      // Key stage
      if (selectedKeyStage !== 'all' && c.key_stage !== selectedKeyStage) {
        return false;
      }

      // Grade level
      if (selectedGrade !== 'all') {
        if (selectedGrade === 'Kindergarten' && c.grade_level !== 'Kindergarten') return false;
        if (selectedGrade !== 'Kindergarten' && String(c.grade_level) !== selectedGrade) return false;
      }

      // Term
      if (selectedTerm !== 'all' && String(c.term) !== selectedTerm) {
        return false;
      }

      // Track
      if (selectedTrack !== 'all' && c.track !== selectedTrack) {
        return false;
      }

      // Verification status
      if (selectedVerification !== 'all' && c.verification_status !== selectedVerification) {
        return false;
      }

      // Transition only
      if (transitionOnly && !c.transition_flag) {
        return false;
      }

      return true;
    });
  }, [
    competencies,
    searchTerm,
    selectedKeyStage,
    selectedGrade,
    selectedTerm,
    selectedTrack,
    selectedVerification,
    transitionOnly,
  ]);

  const handleCopyJSON = (comp: CompetencyRecord) => {
    navigator.clipboard.writeText(JSON.stringify(comp, null, 2));
    setCopiedId(comp.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filtered, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `DepEd_2026_Competencies_Extraction_${Date.now()}.json`);
    dlAnchorElem.click();
  };

  const handleExportCSV = () => {
    const headers = [
      'ID',
      'School Year',
      'Grade Level',
      'Key Stage',
      'Curriculum',
      'Track',
      'Subject Code',
      'Subject Title',
      'Term',
      'Week',
      'Domain',
      'Learning Competency',
      'Competency Code',
      'Content Standard',
      'Performance Standard',
      'Assessment Weight Set',
      'BOW Source',
      'CG Source',
      'Transition Flag',
      'Verification Status'
    ];

    const rows = filtered.map((c) => [
      `"${c.id}"`,
      `"${c.school_year}"`,
      `"${c.grade_level}"`,
      `"${c.key_stage}"`,
      `"${c.curriculum}"`,
      `"${c.track || ''}"`,
      `"${c.subject_code}"`,
      `"${c.subject_title}"`,
      `"${c.term}"`,
      `"${c.week}"`,
      `"${(c.domain || '').replace(/"/g, '""')}"`,
      `"${c.learning_competency.replace(/"/g, '""')}"`,
      `"${c.competency_code || ''}"`,
      `"${(c.content_standard || '').replace(/"/g, '""')}"`,
      `"${(c.performance_standard || '').replace(/"/g, '""')}"`,
      `"${c.assessment_weight_set}"`,
      `"${(c.bow_source || '').replace(/"/g, '""')}"`,
      `"${(c.cg_source || '').replace(/"/g, '""')}"`,
      `"${c.transition_flag}"`,
      `"${c.verification_status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DepEd_2026_Competency_Database_${Date.now()}.csv`);
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
              Normalization Layer • Single Source of Truth
            </span>
            <span className="text-xs text-stone-500 font-medium">
              Showing {filtered.length} of {competencies.length} Competencies
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900">
            2026 Three-Term K–12 Competency Database
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-2xl">
            Normalized against DepEd Order No. 009, s. 2026 Three-Term Calendar & DO 015, s. 2026 Assessment rules. Built to feed lesson planners, assessment builders, and Canva presentation decks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5 text-blue-600" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Sticky Selection & Combined Export Bar */}
      {selectedCompIds.size > 0 && (
        <div className="sticky top-4 z-40 bg-stone-900 text-white p-4 rounded-3xl shadow-xl border border-stone-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/80 border border-blue-400/40 flex items-center justify-center shrink-0">
              <CheckSquare className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm font-display text-white">
                  {selectedCompIds.size} Competencies Selected
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-[10px] font-mono border border-blue-400/30">
                  Combined Document Export
                </span>
              </div>
              <p className="text-xs text-stone-300">
                Bundle selected items into a single unified DepEd-formatted document.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleExportSelectedPdf}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md transition cursor-pointer"
            >
              <FileText className="w-4 h-4 text-stone-900" />
              <span>Export Combined PDF</span>
            </button>

            <button
              onClick={handleExportSelectedDocx}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
            >
              <FileCode className="w-4 h-4 text-blue-200" />
              <span>Export Combined Word (.docx)</span>
            </button>

            <button
              onClick={handleClearSelection}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 text-xs font-semibold transition cursor-pointer"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Filter Control Console */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-4">
        {/* Search Input & Batch Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search learning competency, code, domain, subject (e.g. 'secondary sources scientist', 'payroll', 'interpersonal')..."
              className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-stone-50/60"
            />
          </div>

          <button
            onClick={handleSelectAllFiltered}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition shrink-0 cursor-pointer ${
              filtered.length > 0 && filtered.every((c) => selectedCompIds.has(c.id))
                ? 'bg-blue-50 text-blue-800 border-blue-300'
                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
            }`}
          >
            <ListChecks className="w-4 h-4 text-blue-600" />
            <span>
              {filtered.length > 0 && filtered.every((c) => selectedCompIds.has(c.id))
                ? 'Deselect All Visible'
                : `Select All Visible (${filtered.length})`}
            </span>
          </button>

          <button
            onClick={() => setIsCsvModalOpen(true)}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition shrink-0 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4 text-emerald-700 rotate-180" />
            <span>Bulk Import CSV</span>
          </button>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          {/* Key Stage */}
          <div>
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
              Key Stage
            </label>
            <select
              value={selectedKeyStage}
              onChange={(e) => setSelectedKeyStage(e.target.value)}
              className="w-full p-2 rounded-xl border border-stone-200 bg-white font-medium text-stone-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Key Stages</option>
              <option value="KS 1">KS 1 (K to Gr 2)</option>
              <option value="KS 2">KS 2 (Gr 3 to 6)</option>
              <option value="KS 3">KS 3 (Gr 7 to 10)</option>
              <option value="KS 4">KS 4 (Gr 11 & 12)</option>
            </select>
          </div>

          {/* Grade Level */}
          <div>
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
              Grade Level
            </label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full p-2 rounded-xl border border-stone-200 bg-white font-medium text-stone-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Grades (K–12)</option>
              <option value="Kindergarten">Kindergarten</option>
              <option value="1">Grade 1</option>
              <option value="2">Grade 2</option>
              <option value="3">Grade 3 (Phase 3)</option>
              <option value="4">Grade 4</option>
              <option value="5">Grade 5</option>
              <option value="6">Grade 6 (Phase 3)</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9 (Phase 3)</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11 (Strengthened)</option>
              <option value="12">Grade 12 (Transition)</option>
            </select>
          </div>

          {/* Term */}
          <div>
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
              Term (BOW)
            </label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="w-full p-2 rounded-xl border border-stone-200 bg-white font-medium text-stone-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Terms (1–3)</option>
              <option value="1">Term 1</option>
              <option value="2">Term 2</option>
              <option value="3">Term 3</option>
            </select>
          </div>

          {/* Track */}
          <div>
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
              SHS Track
            </label>
            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
              className="w-full p-2 rounded-xl border border-stone-200 bg-white font-medium text-stone-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Tracks</option>
              <option value="Academic">Academic</option>
              <option value="TechPro">TechPro (Grade 11)</option>
              <option value="TVL">TVL (Grade 12)</option>
            </select>
          </div>

          {/* Verification */}
          <div>
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
              Trust Level
            </label>
            <select
              value={selectedVerification}
              onChange={(e) => setSelectedVerification(e.target.value)}
              className="w-full p-2 rounded-xl border border-stone-200 bg-white font-medium text-stone-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="verified">Verified (Levels 1–3)</option>
              <option value="unverified">Unverified</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>

          {/* Transition Toggle */}
          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 p-2 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer text-stone-700 font-medium">
              <input
                type="checkbox"
                checked={transitionOnly}
                onChange={(e) => setTransitionOnly(e.target.checked)}
                className="rounded text-amber-600 focus:ring-0"
              />
              <span className="text-[11px] truncate">Gr 12 Transition Only</span>
            </label>
          </div>
        </div>

        {/* Grade 11 Strengthened SHS Quick-Link Banner */}
        {selectedGrade === '11' && onNavigateToGrade11BOW && (
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-3.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs mt-2">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <div className="text-xs">
                <span className="font-bold">Looking for the complete Grade 11 Three-Term Budget of Work?</span>
                <span className="text-blue-200 block sm:inline sm:ml-1">
                  Access the official 30-week BOW matrix for Effective Communication, Gen Math, Science, and Life Skills.
                </span>
              </div>
            </div>
            <button
              onClick={onNavigateToGrade11BOW}
              className="px-3.5 py-1.5 bg-white text-blue-950 font-bold rounded-xl text-xs hover:bg-blue-50 transition shrink-0 cursor-pointer"
            >
              Open Grade 11 BOW Master →
            </button>
          </div>
        )}
      </div>

      {/* Competency Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((comp) => {
          const isGrade11 = comp.grade_level === 11;
          const isGrade12 = comp.grade_level === 12;
          const isSelected = selectedCompIds.has(comp.id);

          return (
            <div
              key={comp.id}
              className={`bg-white rounded-3xl p-5 border transition flex flex-col justify-between hover:shadow-md ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/30 ring-2 ring-blue-500/20 shadow-xs'
                  : comp.transition_flag
                  ? 'border-amber-300/80 bg-amber-50/20'
                  : isGrade11
                  ? 'border-emerald-300/80 bg-emerald-50/15'
                  : 'border-stone-200/90'
              }`}
            >
              {/* Header Badges & Checkbox */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => toggleSelectComp(comp.id)}
                      className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg border text-[11px] font-bold cursor-pointer transition ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border-stone-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-0 cursor-pointer pointer-events-none"
                      />
                      <span>{isSelected ? 'Selected' : 'Select'}</span>
                    </button>

                    <span className="px-2 py-0.5 rounded-lg bg-stone-100 text-stone-800 text-[10px] font-bold">
                      {comp.grade_level === 'Kindergarten' ? 'Kindergarten' : `Grade ${comp.grade_level}`} ({comp.key_stage})
                    </span>

                    <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-100">
                      Term {comp.term} • Week {comp.week}
                    </span>

                    {comp.track && (
                      <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 text-[10px] font-semibold">
                        {comp.track} Track
                      </span>
                    )}

                    {comp.transition_flag && (
                      <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-900 text-[10px] font-extrabold border border-amber-300">
                        ⚠️ Gr 12 Transition (DO 015 Par. 49)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3" />
                      {comp.verification_status}
                    </span>
                  </div>
                </div>

                {/* Subject Title and Domain */}
                <div className="mb-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-base font-bold text-stone-900 font-display">
                      {comp.subject_title}
                    </h3>
                    <span className="text-[11px] font-mono text-stone-400 shrink-0">
                      {comp.competency_code || comp.subject_code}
                    </span>
                  </div>
                  {comp.domain && (
                    <p className="text-[11px] text-blue-700 font-medium mt-0.5">
                      Domain: {comp.domain}
                    </p>
                  )}
                </div>

                {/* Exact Learning Competency Text */}
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100 text-xs text-stone-800 leading-relaxed font-sans mb-3">
                  <span className="font-bold text-stone-900 block mb-1 text-[11px] uppercase tracking-wider">
                    Learning Competency:
                  </span>
                  "{comp.learning_competency}"
                </div>

                {/* Content & Performance Standards Preview */}
                {comp.content_standard && (
                  <div className="text-[11px] text-stone-500 space-y-1 mb-3">
                    <p className="line-clamp-2">
                      <strong className="text-stone-700">CS:</strong> {comp.content_standard}
                    </p>
                    {comp.performance_standard && (
                      <p className="line-clamp-2">
                        <strong className="text-stone-700">PS:</strong> {comp.performance_standard}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons & Source Citation */}
              <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="text-[10px] text-stone-400 truncate max-w-[200px]" title={comp.bow_source}>
                  Source: {comp.bow_source}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveModalComp(comp)}
                    title="Inspect Full Schema JSON"
                    className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
                  >
                    <FileCode className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectForLessonPlan(comp)}
                    title="Create DepEd Lesson Plan (DLL)"
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 text-[11px] font-semibold transition cursor-pointer"
                  >
                    <FileText className="w-3 h-3 text-blue-600" />
                    <span>Plan DLL</span>
                  </button>

                  <button
                    onClick={() => onSelectForAssessment(comp)}
                    title="Build Assessment / TOS"
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-[11px] font-semibold transition cursor-pointer"
                  >
                    <CheckSquare className="w-3 h-3 text-emerald-600" />
                    <span>Assess</span>
                  </button>

                  <button
                    onClick={() => onSelectForCanva(comp)}
                    title="Send to Canva Presentation Bridge"
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-50 text-purple-800 hover:bg-purple-100 text-[11px] font-semibold transition cursor-pointer"
                  >
                    <Presentation className="w-3 h-3 text-purple-600" />
                    <span>Canva</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Schema Inspector Modal */}
      {activeModalComp && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 max-h-[85vh] overflow-y-auto space-y-4 border border-stone-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {activeModalComp.id} • {activeModalComp.curriculum}
                </span>
                <h3 className="text-lg font-bold text-stone-900 font-display mt-1">
                  {activeModalComp.subject_title} (Term {activeModalComp.term}, Week {activeModalComp.week})
                </h3>
              </div>
              <button
                onClick={() => setActiveModalComp(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Structured Table */}
            <div className="text-xs divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden bg-stone-50">
              <div className="p-3 grid grid-cols-3 bg-white">
                <span className="font-bold text-stone-500">Learning Competency</span>
                <span className="col-span-2 text-stone-900 font-medium">"{activeModalComp.learning_competency}"</span>
              </div>
              <div className="p-3 grid grid-cols-3">
                <span className="font-bold text-stone-500">Competency Code</span>
                <span className="col-span-2 font-mono text-stone-700">{activeModalComp.competency_code || 'None (Text Only in BOW)'}</span>
              </div>
              <div className="p-3 grid grid-cols-3 bg-white">
                <span className="font-bold text-stone-500">Content Standard</span>
                <span className="col-span-2 text-stone-700">{activeModalComp.content_standard || 'N/A'}</span>
              </div>
              <div className="p-3 grid grid-cols-3">
                <span className="font-bold text-stone-500">Performance Standard</span>
                <span className="col-span-2 text-stone-700">{activeModalComp.performance_standard || 'N/A'}</span>
              </div>
              <div className="p-3 grid grid-cols-3 bg-white">
                <span className="font-bold text-stone-500">Assessment Weight Set</span>
                <span className="col-span-2 font-semibold text-blue-800">{activeModalComp.assessment_weight_set}</span>
              </div>
              <div className="p-3 grid grid-cols-3">
                <span className="font-bold text-stone-500">BOW Source Citation</span>
                <span className="col-span-2 text-stone-700">{activeModalComp.bow_source}</span>
              </div>
              <div className="p-3 grid grid-cols-3 bg-white">
                <span className="font-bold text-stone-500">Transition Flag</span>
                <span className="col-span-2 font-bold text-amber-700">{activeModalComp.transition_flag ? 'YES (DO 015, s. 2026 Par. 49 Applied)' : 'NO (Regular Rollout)'}</span>
              </div>
            </div>

            {/* Raw JSON Block */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  Raw JSON Schema (Normalized)
                </span>
                <button
                  onClick={() => handleCopyJSON(activeModalComp)}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                >
                  {copiedId === activeModalComp.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === activeModalComp.id ? 'Copied' : 'Copy JSON'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-2xl bg-stone-900 text-stone-200 text-[11px] font-mono overflow-x-auto max-h-48 scrollbar-none">
                {JSON.stringify(activeModalComp, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* CSV Bulk Import Modal */}
      {isCsvModalOpen && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  CSV
                </div>
                <div>
                  <h3 className="font-extrabold text-stone-900 text-base">Bulk Import Competencies via CSV</h3>
                  <p className="text-xs text-stone-500">Upload custom learning competencies into local storage</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsCsvModalOpen(false);
                  setCsvParsedRecords([]);
                  setCsvFileName('');
                  setCsvErrorMessages([]);
                }}
                className="p-2 rounded-xl text-stone-400 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Template Download Helper */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between gap-3">
              <div className="text-xs text-emerald-900">
                <p className="font-bold mb-0.5">Need the correct CSV formatting?</p>
                <p className="text-[11px] text-emerald-700">Download our official DepEd competency template with all required headers.</p>
              </div>
              <button
                onClick={handleDownloadSampleCsv}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition cursor-pointer shrink-0 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Sample Template</span>
              </button>
            </div>

            {/* File Upload Box */}
            <div className="border-2 border-dashed border-stone-300 hover:border-emerald-500 rounded-2xl p-6 text-center bg-stone-50 transition relative">
              <input
                type="file"
                accept=".csv"
                onChange={handleCsvFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-2 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <Download className="w-6 h-6 rotate-180" />
                </div>
                <p className="text-sm font-bold text-stone-800">
                  {csvFileName ? `Selected File: ${csvFileName}` : 'Click or drop your CSV file here'}
                </p>
                <p className="text-xs text-stone-500">
                  Supports .csv with headers: <code className="bg-stone-200 px-1 py-0.5 rounded text-[10px]">learning_competency</code>, <code className="bg-stone-200 px-1 py-0.5 rounded text-[10px]">grade_level</code>, <code className="bg-stone-200 px-1 py-0.5 rounded text-[10px]">subject_title</code>, etc.
                </p>
              </div>
            </div>

            {/* Parsing Errors */}
            {csvErrorMessages.length > 0 && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  CSV Parsing Errors:
                </p>
                {csvErrorMessages.map((msg, i) => (
                  <p key={i} className="text-[11px]">• {msg}</p>
                ))}
              </div>
            )}

            {/* Parsed Preview Table */}
            {csvParsedRecords.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700">
                    Parsed Competencies Preview ({csvParsedRecords.length} records ready to import)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Valid CSV Structure
                  </span>
                </div>

                <div className="border border-stone-200 rounded-2xl overflow-hidden max-h-52 overflow-y-auto text-xs bg-white">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-stone-100 text-[11px] font-bold text-stone-600 border-b border-stone-200 sticky top-0">
                      <tr>
                        <th className="p-2.5">Grade</th>
                        <th className="p-2.5">Subject</th>
                        <th className="p-2.5">Competency Statement</th>
                        <th className="p-2.5">Code</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-[11px]">
                      {csvParsedRecords.map((r, i) => (
                        <tr key={i} className="hover:bg-stone-50">
                          <td className="p-2.5 font-bold text-stone-800">Gr {r.grade_level}</td>
                          <td className="p-2.5 font-semibold text-blue-800">{r.subject_title}</td>
                          <td className="p-2.5 text-stone-700">{r.learning_competency}</td>
                          <td className="p-2.5 font-mono text-stone-500">{r.competency_code || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-stone-200">
              <button
                onClick={() => {
                  setIsCsvModalOpen(false);
                  setCsvParsedRecords([]);
                  setCsvFileName('');
                }}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-100 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                disabled={csvParsedRecords.length === 0}
                onClick={handleConfirmCsvImport}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs ${
                  csvParsedRecords.length > 0
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Import {csvParsedRecords.length} Records</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
