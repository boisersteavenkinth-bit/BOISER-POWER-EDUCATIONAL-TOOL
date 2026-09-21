import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  Printer,
  Download,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  Layers,
  FileText,
  Sparkles,
  BookmarkCheck,
  BarChart2,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import {
  GRADE_11_THREE_TERM_BOW,
  BOWCompetencyItem,
  SubjectThreeTermBOW
} from '../data/grade11BOWData';

interface Grade11ThreeTermBOWProps {
  onNavigateToILAW?: (subjectTitle: string, term: number, week: string) => void;
}

export const Grade11ThreeTermBOW: React.FC<Grade11ThreeTermBOWProps> = ({ onNavigateToILAW }) => {
  const subjects = Object.keys(GRADE_11_THREE_TERM_BOW);
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<string>(subjects[0]);
  const [selectedTerm, setSelectedTerm] = useState<'all' | '1' | '2' | '3'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<BOWCompetencyItem | null>(null);

  const currentSubject: SubjectThreeTermBOW = GRADE_11_THREE_TERM_BOW[selectedSubjectKey] || GRADE_11_THREE_TERM_BOW['Effective Communication'];

  // Filter competencies based on term and search query
  const filteredCompetencies = useMemo(() => {
    return currentSubject.competencies.filter((item) => {
      if (selectedTerm !== 'all' && String(item.term) !== selectedTerm) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          item.learningCompetency.toLowerCase().includes(q) ||
          item.competencyCode.toLowerCase().includes(q) ||
          item.topic.toLowerCase().includes(q) ||
          item.domain.toLowerCase().includes(q) ||
          item.contentStandard.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [currentSubject, selectedTerm, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const totalComp = currentSubject.competencies.length;
    const term1Count = currentSubject.competencies.filter((c) => c.term === 1).length;
    const term2Count = currentSubject.competencies.filter((c) => c.term === 2).length;
    const term3Count = currentSubject.competencies.filter((c) => c.term === 3).length;
    const totalHours = currentSubject.totalAnnualHours;
    return { totalComp, term1Count, term2Count, term3Count, totalHours };
  }, [currentSubject]);

  const handleCopy = (code: string, text: string) => {
    navigator.clipboard.writeText(`${code}: ${text}`);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentSubject, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${currentSubject.subjectCode}_G11_ThreeTerm_BOW.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportCSV = () => {
    const headers = [
      'Term',
      'Week',
      'Hours',
      'Competency Code',
      'Domain',
      'Topic',
      'Learning Competency',
      'Content Standard',
      'Performance Standard',
      'Written Work %',
      'Performance Task %',
      'Term Exam %'
    ];

    const rows = currentSubject.competencies.map((c) => [
      `Term ${c.term}`,
      `"${c.week}"`,
      c.hours,
      `"${c.competencyCode}"`,
      `"${c.domain.replace(/"/g, '""')}"`,
      `"${c.topic.replace(/"/g, '""')}"`,
      `"${c.learningCompetency.replace(/"/g, '""')}"`,
      `"${c.contentStandard.replace(/"/g, '""')}"`,
      `"${c.performanceStandard.replace(/"/g, '""')}"`,
      c.assessmentWeights.writtenWork,
      c.assessmentWeights.performanceTask,
      c.assessmentWeights.termExam
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${currentSubject.subjectCode}_G11_ThreeTerm_BOW.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Banner & DepEd Order Authority - DepEd Blue, Gold, and Red */}
      <div className="bg-[#0038A8] text-white rounded-3xl p-6 sm:p-8 shadow-md border-b-4 border-[#FCD116] print:border-none print:shadow-none print:p-4 print:text-black print:bg-none">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-[#FCD116] text-[#0038A8] rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                SY 2026–2027 Official Issuance
              </span>
              <span className="px-3 py-1 bg-white/20 text-white border border-white/30 rounded-full text-xs font-semibold uppercase tracking-wider">
                DO 015 &amp; DO 009, s. 2026 Mandate
              </span>
              <span className="px-3 py-1 bg-[#CE1126] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                Grade 11 Senior High School
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
              Three-Term Budget of Work (BOW) for Learning Competencies
            </h1>
            <p className="text-blue-100 text-sm max-w-3xl leading-relaxed">
              Master curriculum reference blueprint for the <strong className="text-[#FCD116]">Strengthened Senior High School Curriculum (DO 015, s. 2026)</strong> under the <strong className="text-white">Three-Term (Trimester) School Calendar (DO 009, s. 2026)</strong>. Distributes Grade 11 learning areas into 30 teaching weeks with aligned content standards, performance standards, competency codes, and classroom assessment weights.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white text-[#0038A8] hover:bg-blue-50 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
              title="Print official DepEd A4 Budget of Work table"
            >
              <Printer className="w-4 h-4 text-[#0038A8]" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#002776] hover:bg-[#001f5c] text-white border border-white/20 rounded-xl text-xs font-semibold transition cursor-pointer"
              title="Export as CSV for Excel or Google Sheets"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#FCD116]" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#002776] hover:bg-[#001f5c] text-white border border-white/20 rounded-xl text-xs font-semibold transition cursor-pointer"
              title="Export complete JSON dataset"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>

        {/* Metric Ribbons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/20 print:hidden">
          <div className="bg-black/20 p-3 rounded-xl border border-white/10">
            <div className="text-[11px] font-semibold text-blue-200 uppercase tracking-wider">Learning Area</div>
            <div className="text-base font-bold text-white truncate">{currentSubject.subjectTitle}</div>
            <div className="text-[11px] text-[#FCD116] font-mono">{currentSubject.subjectCode}</div>
          </div>
          <div className="bg-black/20 p-3 rounded-xl border border-white/10">
            <div className="text-[11px] font-semibold text-blue-200 uppercase tracking-wider">Annual Time Allotment</div>
            <div className="text-base font-bold text-white">{stats.totalHours} Hours / SY</div>
            <div className="text-[11px] text-blue-200">40 Hours per 10-Week Term</div>
          </div>
          <div className="bg-black/20 p-3 rounded-xl border border-white/10">
            <div className="text-[11px] font-semibold text-blue-200 uppercase tracking-wider">Assessment Weight Set</div>
            <div className="text-base font-bold text-white">DO 015, s. 2026</div>
            <div className="text-[11px] text-[#FCD116]">30% WW • 50% PT • 20% TE</div>
          </div>
          <div className="bg-black/20 p-3 rounded-xl border border-white/10">
            <div className="text-[11px] font-semibold text-blue-200 uppercase tracking-wider">Competency Clusters</div>
            <div className="text-base font-bold text-white">{stats.totalComp} Clusters (30 Wks)</div>
            <div className="text-[11px] text-blue-200">T1: {stats.term1Count} | T2: {stats.term2Count} | T3: {stats.term3Count}</div>
          </div>
        </div>
      </div>

      {/* Control Bar: Subject Selector & Term Filter */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-300 shadow-sm space-y-4 print:hidden">
        {/* Subject Chips */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
            Select Grade 11 Strengthened SHS Learning Area:
          </label>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subjKey) => {
              const subj = GRADE_11_THREE_TERM_BOW[subjKey];
              const isSelected = selectedSubjectKey === subjKey;
              return (
                <button
                  key={subjKey}
                  onClick={() => setSelectedSubjectKey(subjKey)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-900 text-white shadow-sm'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{subj.subjectTitle}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-blue-800 text-blue-200' : 'bg-stone-200 text-stone-600'}`}>
                    {subj.subjectCode}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Term Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-stone-200">
          {/* Term Selector Pills */}
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setSelectedTerm('all')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                selectedTerm === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Terms (Full Year)
            </button>
            <button
              onClick={() => setSelectedTerm('1')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1 ${
                selectedTerm === '1'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>Term 1</span>
              <span className="text-[10px] opacity-80">(Wks 1–10)</span>
            </button>
            <button
              onClick={() => setSelectedTerm('2')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1 ${
                selectedTerm === '2'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>Term 2</span>
              <span className="text-[10px] opacity-80">(Wks 1–10)</span>
            </button>
            <button
              onClick={() => setSelectedTerm('3')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1 ${
                selectedTerm === '3'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>Term 3</span>
              <span className="text-[10px] opacity-80">(Wks 1–10)</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search competencies, codes, topics..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
          </div>
        </div>
      </div>

      {/* Official DepEd Three-Term BOW Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-300 shadow-sm space-y-6 print:border-none print:shadow-none print:p-0">
        {/* Printable DepEd Document Header */}
        <div className="text-center space-y-1 pb-4 border-b-2 border-stone-800">
          <div className="text-[11px] tracking-widest uppercase font-semibold text-stone-600">
            Republic of the Philippines • Department of Education
          </div>
          <div className="text-xs font-bold text-stone-700 uppercase">
            Bureau of Curriculum Development • Curriculum and Learning Management Division
          </div>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-900 uppercase tracking-wide">
            THREE-TERM BUDGET OF WORK (BOW) FOR LEARNING COMPETENCIES
          </h2>
          <div className="flex items-center justify-center gap-3 text-xs font-medium text-stone-600">
            <span>Grade Level: <strong>Grade 11</strong></span>
            <span>•</span>
            <span>Curriculum: <strong>Strengthened SHS (DO 015, s. 2026)</strong></span>
            <span>•</span>
            <span>School Year: <strong>2026–2027</strong></span>
          </div>
          <div className="mt-2 inline-flex items-center gap-2 px-3.5 py-1 bg-stone-900 text-white rounded text-xs font-bold uppercase tracking-wider">
            <span>{currentSubject.subjectTitle}</span>
            <span>({currentSubject.subjectCode})</span>
          </div>
        </div>

        {/* Master Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-stone-400">
            <thead>
              <tr className="bg-blue-950 text-white text-[11px] uppercase tracking-wider">
                <th className="p-3 border border-stone-400 w-24 text-center font-bold">Term &amp; Week</th>
                <th className="p-3 border border-stone-400 w-20 text-center font-bold">Hours</th>
                <th className="p-3 border border-stone-400 w-44 font-bold">Domain &amp; Topic Focus</th>
                <th className="p-3 border border-stone-400 w-52 font-bold">Content &amp; Performance Standards</th>
                <th className="p-3 border border-stone-400 font-bold">Most Essential Learning Competency (MELC) &amp; Code</th>
                <th className="p-3 border border-stone-400 w-40 font-bold">DO 015 Assessment Allocation</th>
                <th className="p-3 border border-stone-400 w-28 text-center font-bold print:hidden">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-300">
              {filteredCompetencies.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-stone-500">
                    No learning competencies found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredCompetencies.map((item, index) => {
                  const isCopied = copiedCode === item.competencyCode;
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-blue-50/40 transition ${
                        index % 2 === 0 ? 'bg-white' : 'bg-stone-50/60'
                      }`}
                    >
                      {/* Term & Week */}
                      <td className="p-3 border border-stone-300 text-center align-top">
                        <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-[10px] uppercase">
                          Term {item.term}
                        </span>
                        <div className="font-bold text-stone-800 mt-1">{item.week}</div>
                      </td>

                      {/* Hours */}
                      <td className="p-3 border border-stone-300 text-center align-top font-mono text-stone-700">
                        <div className="font-bold text-stone-900">{item.hours} hrs</div>
                        <div className="text-[10px] text-stone-500">4 sessions</div>
                      </td>

                      {/* Domain & Topic */}
                      <td className="p-3 border border-stone-300 align-top">
                        <div className="font-bold text-stone-900 text-[11px] uppercase tracking-tight text-blue-900">
                          {item.domain}
                        </div>
                        <div className="text-stone-700 mt-1 leading-snug">{item.topic}</div>
                      </td>

                      {/* Standards */}
                      <td className="p-3 border border-stone-300 align-top text-stone-700 leading-relaxed text-[11px]">
                        <div className="mb-2">
                          <strong className="text-stone-900 block font-semibold">CS:</strong>
                          <span>{item.contentStandard}</span>
                        </div>
                        <div>
                          <strong className="text-stone-900 block font-semibold">PS:</strong>
                          <span>{item.performanceStandard}</span>
                        </div>
                      </td>

                      {/* Competency & Code */}
                      <td className="p-3 border border-stone-300 align-top">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2 py-0.5 bg-blue-900 text-white text-[10px] font-mono font-bold rounded">
                            {item.competencyCode}
                          </span>
                          <button
                            onClick={() => handleCopy(item.competencyCode, item.learningCompetency)}
                            className="text-stone-400 hover:text-stone-700 text-[11px] flex items-center gap-1 cursor-pointer print:hidden"
                            title="Copy code & text"
                          >
                            {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{isCopied ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <p className="font-bold text-stone-900 leading-relaxed text-[11px]">
                          {item.learningCompetency}
                        </p>

                        {/* Enabling Competencies */}
                        {item.enablingCompetencies && item.enablingCompetencies.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-stone-200">
                            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                              Enabling Competencies / Sub-tasks:
                            </span>
                            <ul className="list-disc list-inside text-[10px] text-stone-600 space-y-0.5 mt-0.5">
                              {item.enablingCompetencies.map((ec, idx) => (
                                <li key={idx} className="leading-snug">{ec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </td>

                      {/* Assessment Weights */}
                      <td className="p-3 border border-stone-300 align-top text-[11px]">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-stone-700">
                            <span>Written Works (WW):</span>
                            <strong className="text-blue-900">{item.assessmentWeights.writtenWork}%</strong>
                          </div>
                          <div className="flex items-center justify-between text-stone-700">
                            <span>Performance Tasks (PT):</span>
                            <strong className="text-emerald-700">{item.assessmentWeights.performanceTask}%</strong>
                          </div>
                          <div className="flex items-center justify-between text-stone-700">
                            <span>Term Exam (TE):</span>
                            <strong className="text-amber-700">{item.assessmentWeights.termExam}%</strong>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-stone-200 text-[10px] text-stone-500 italic">
                          {item.sampleAssessment}
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="p-3 border border-stone-300 align-top text-center print:hidden">
                        <div className="flex flex-col gap-1.5">
                          <button
                            onClick={() => setActiveItem(item)}
                            className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded font-semibold text-[11px] transition cursor-pointer"
                          >
                            Details
                          </button>
                          {onNavigateToILAW && (
                            <button
                              onClick={() => onNavigateToILAW(currentSubject.subjectTitle, item.term, item.week)}
                              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded font-semibold text-[10px] transition cursor-pointer flex items-center justify-center gap-1"
                              title="Create Region X ILAW for this competency"
                            >
                              <FileText className="w-3 h-3 text-blue-700" />
                              <span>Plan ILAW</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Official DepEd Footer & Verification Sign-Off */}
        <div className="pt-8 mt-6 border-t-2 border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
          <div>
            <div className="text-[10px] text-stone-500 uppercase tracking-wider mb-8">Curriculum Developer / Specialist</div>
            <div className="border-b border-stone-800 w-48 mx-auto font-bold text-stone-900 pb-1">
              STEAVEN KINTH D. BOISER
            </div>
            <div className="text-[10px] text-stone-600 mt-0.5">Master Teacher / Curriculum Focal Person</div>
          </div>
          <div>
            <div className="text-[10px] text-stone-500 uppercase tracking-wider mb-8">Verified and Attested</div>
            <div className="border-b border-stone-800 w-48 mx-auto font-bold text-stone-900 pb-1">
              DIVISION EPS / SHS SUPERVISOR
            </div>
            <div className="text-[10px] text-stone-600 mt-0.5">Curriculum Implementation Division (CID)</div>
          </div>
          <div>
            <div className="text-[10px] text-stone-500 uppercase tracking-wider mb-8">Recommending Approval</div>
            <div className="border-b border-stone-800 w-48 mx-auto font-bold text-stone-900 pb-1">
              SCHOOLS DIVISION SUPERINTENDENT
            </div>
            <div className="text-[10px] text-stone-600 mt-0.5">DepEd Schools Division Office</div>
          </div>
        </div>
      </div>

      {/* Item Detail Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-stone-300 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-xs uppercase">
                  Term {activeItem.term} • {activeItem.week} • {activeItem.hours} Hours
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-1">{activeItem.topic}</h3>
                <div className="text-xs font-mono font-bold text-blue-900">{activeItem.competencyCode}</div>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-stone-800 uppercase tracking-wider text-[11px] mb-1">
                  Most Essential Learning Competency
                </h4>
                <p className="p-3 bg-blue-50 text-blue-950 rounded-xl font-bold leading-relaxed border border-blue-200">
                  {activeItem.learningCompetency}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <h4 className="font-bold text-stone-800 uppercase tracking-wider text-[10px] mb-1">
                    Content Standard (CS)
                  </h4>
                  <p className="text-stone-700 leading-relaxed">{activeItem.contentStandard}</p>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <h4 className="font-bold text-stone-800 uppercase tracking-wider text-[10px] mb-1">
                    Performance Standard (PS)
                  </h4>
                  <p className="text-stone-700 leading-relaxed">{activeItem.performanceStandard}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-stone-800 uppercase tracking-wider text-[11px] mb-1">
                  Enabling Competencies / Prerequisite Sub-tasks
                </h4>
                <ul className="list-disc list-inside space-y-1 text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200">
                  {activeItem.enablingCompetencies.map((ec, i) => (
                    <li key={i}>{ec}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-stone-800 uppercase tracking-wider text-[11px] mb-1">
                  DepEd DO 015 Classroom Assessment Weighting
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="text-[10px] text-stone-600">Written Work</div>
                    <div className="text-sm font-bold text-blue-900">{activeItem.assessmentWeights.writtenWork}%</div>
                  </div>
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <div className="text-[10px] text-stone-600">Performance Task</div>
                    <div className="text-sm font-bold text-emerald-800">{activeItem.assessmentWeights.performanceTask}%</div>
                  </div>
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="text-[10px] text-stone-600">Term Exam (QA)</div>
                    <div className="text-sm font-bold text-amber-800">{activeItem.assessmentWeights.termExam}%</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-stone-800 uppercase tracking-wider text-[11px] mb-1">
                  Sample Classroom Assessment Task
                </h4>
                <p className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-800 italic">
                  {activeItem.sampleAssessment}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-stone-800 uppercase tracking-wider text-[10px] mb-1">
                    Pedagogical Strategies
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {activeItem.pedagogicalStrategies.map((strat, i) => (
                      <span key={i} className="px-2 py-0.5 bg-stone-200 text-stone-800 rounded text-[10px]">
                        {strat}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-stone-800 uppercase tracking-wider text-[10px] mb-1">
                    Learning Resources &amp; Materials
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {activeItem.materials.map((mat, i) => (
                      <span key={i} className="px-2 py-0.5 bg-stone-200 text-stone-800 rounded text-[10px]">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-end gap-2">
              {onNavigateToILAW && (
                <button
                  onClick={() => {
                    const item = activeItem;
                    setActiveItem(null);
                    onNavigateToILAW(currentSubject.subjectTitle, item.term, item.week);
                  }}
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Generate Region X ILAW for this Week
                </button>
              )}
              <button
                onClick={() => setActiveItem(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
