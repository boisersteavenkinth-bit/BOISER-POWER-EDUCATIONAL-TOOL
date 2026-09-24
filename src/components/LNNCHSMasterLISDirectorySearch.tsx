import React, { useState, useMemo } from 'react';
import {
  Search,
  Users,
  Building2,
  GraduationCap,
  FileSpreadsheet,
  Download,
  Filter,
  UserCheck,
  CheckCircle2,
  Phone,
  MapPin,
  Calendar,
  School,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Copy,
  Check,
  Eye,
  BookOpen,
  ArrowUpDown,
  FileText
} from 'lucide-react';
import {
  LNNCHS_20_SECTIONS_PER_GRADE,
  CONSOLIDATED_LIS_STUDENTS,
  SectionDefinition,
  LISStudentMasterRecord
} from '../data/lnnchsCompleteSectionsDirectory';

interface Props {
  onSelectStudent?: (student: LISStudentMasterRecord) => void;
}

export const LNNCHSMasterLISDirectorySearch: React.FC<Props> = ({ onSelectStudent }) => {
  const [activeTab, setActiveTab] = useState<'search' | 'sections' | 'summary'>('search');
  const [displayMode, setDisplayMode] = useState<'table' | 'cards'>('cards');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [selectedSection, setSelectedSection] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sexFilter, setSexFilter] = useState<'ALL' | 'M' | 'F'>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [copiedLrn, setCopiedLrn] = useState<string | null>(null);
  const [selectedStudentModal, setSelectedStudentModal] = useState<LISStudentMasterRecord | null>(null);
  const [activeSectionModal, setActiveSectionModal] = useState<SectionDefinition | null>(null);

  const gradeLevels = ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

  // Dynamic sections available for selected grade
  const availableSections = useMemo(() => {
    if (selectedGrade === 'All') {
      return Object.values(LNNCHS_20_SECTIONS_PER_GRADE).flat();
    }
    return LNNCHS_20_SECTIONS_PER_GRADE[selectedGrade] || [];
  }, [selectedGrade]);

  // Filtered students
  const filteredStudents = useMemo(() => {
    return CONSOLIDATED_LIS_STUDENTS.filter(s => {
      // Grade filter
      if (selectedGrade !== 'All' && s.gradeLevel !== selectedGrade) return false;
      // Section filter
      if (selectedSection !== 'All' && s.section !== selectedSection) return false;
      // Sex filter
      if (sexFilter !== 'ALL' && s.sex !== sexFilter) return false;
      // Status filter
      if (statusFilter !== 'ALL' && s.lisStatus !== statusFilter) return false;
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = s.fullName.toLowerCase().includes(q) || `${s.firstName} ${s.lastName}`.toLowerCase().includes(q);
        const matchesLrn = s.lrn.includes(q);
        const matchesAdviser = s.adviser.toLowerCase().includes(q);
        const matchesSection = s.section.toLowerCase().includes(q);
        const matchesTrack = (s.trackStrand || '').toLowerCase().includes(q);
        const matchesAddress = s.address.toLowerCase().includes(q);
        return matchesName || matchesLrn || matchesAdviser || matchesSection || matchesTrack || matchesAddress;
      }
      return true;
    });
  }, [selectedGrade, selectedSection, sexFilter, statusFilter, searchQuery]);

  const copyToClipboard = (text: string, lrn: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLrn(lrn);
    setTimeout(() => setCopiedLrn(null), 2000);
  };

  const handleExportCSV = () => {
    const headers = [
      'LRN',
      'Last Name',
      'First Name',
      'Middle Initial',
      'Sex',
      'Grade Level',
      'Section',
      'Adviser',
      'Track / Strand',
      'Birth Date',
      'Age',
      'Mother Tongue',
      'Address',
      'Parent/Guardian',
      'Contact',
      'LIS Status',
      'Verification Status'
    ];

    const rows = filteredStudents.map(s => [
      `"${s.lrn}"`,
      `"${s.lastName}"`,
      `"${s.firstName}"`,
      `"${s.mi}"`,
      `"${s.sex}"`,
      `"${s.gradeLevel}"`,
      `"${s.section}"`,
      `"${s.adviser}"`,
      `"${s.trackStrand || 'N/A'}"`,
      `"${s.birthDate}"`,
      s.age,
      `"${s.motherTongue}"`,
      `"${s.address}"`,
      `"${s.parentGuardian}"`,
      `"${s.contact}"`,
      `"${s.lisStatus}"`,
      `"${s.verificationStatus}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LNNCHS_Consolidated_Master_LIS_${selectedGrade.replace(' ', '_')}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-blue-900/20 shadow-xl overflow-hidden space-y-6">
      {/* ================= HEADER BANNER ================= */}
      <div className="bg-gradient-to-r from-[#092B62] via-[#0D3B82] to-[#1E4E9E] p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <School className="w-80 h-80" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-400 text-blue-950 font-black text-xs rounded-full uppercase tracking-wider shadow-sm">
                LNNCHS Master Directory • 120 Sections
              </span>
              <span className="px-3 py-1 bg-blue-800/80 text-blue-100 font-semibold text-xs rounded-full border border-blue-600/50">
                Grade 7 to Grade 12 (20 Sections Each)
              </span>
              <span className="px-3 py-1 bg-emerald-700/80 text-emerald-100 font-semibold text-xs rounded-full border border-emerald-500/50 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> LIS Synced
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <Users className="w-8 h-8 text-amber-300" />
              <span>Consolidated Learner &amp; Section Master Database</span>
            </h2>
            <p className="text-blue-200 text-sm max-w-3xl leading-relaxed">
              Official roster explorer aligned with DepEd Learner Information System (LIS) references, Grade 7 to 12 section advisorships, room assignments, and 20-attribute standardized curriculum integration.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md transition hover:-translate-y-0.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export LIS Manifest (.CSV)</span>
            </button>
          </div>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex bg-blue-950/60 p-1.5 rounded-2xl gap-2 mt-6 border border-blue-800/60 max-w-2xl">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'search'
                ? 'bg-amber-400 text-blue-950 shadow-md'
                : 'text-blue-200 hover:bg-blue-900/50'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Search Learners ({filteredStudents.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'sections'
                ? 'bg-amber-400 text-blue-950 shadow-md'
                : 'text-blue-200 hover:bg-blue-900/50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>120 Sections &amp; Advisers</span>
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'summary'
                ? 'bg-amber-400 text-blue-950 shadow-md'
                : 'text-blue-200 hover:bg-blue-900/50'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Enrollment Summary</span>
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* ================= SEARCH & FILTER CONTROL BOX ================= */}
        <div className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-300 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            {/* Realtime Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by Learner Name, 12-digit LRN, Section, Adviser, Track, or Address..."
                className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-medium shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 px-2 py-0.5 rounded cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Grade Level Dropdown */}
            <div className="w-full md:w-56 space-y-1">
              <label className="text-[11px] font-bold text-stone-600 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
                <span>Grade Level</span>
              </label>
              <select
                value={selectedGrade}
                onChange={e => {
                  setSelectedGrade(e.target.value);
                  setSelectedSection('All');
                }}
                className="w-full py-2.5 px-3 bg-white rounded-xl border-2 border-blue-900/30 text-stone-900 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-xs cursor-pointer"
              >
                <option value="All">All Grades (120 Sections)</option>
                {gradeLevels.map(g => (
                  <option key={g} value={g}>{g} (20 Sections)</option>
                ))}
              </select>
            </div>

            {/* Quick 20 Available Sections Dropdown */}
            <div className="w-full md:w-72 space-y-1">
              <label className="text-[11px] font-bold text-stone-600 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-blue-700" />
                  <span>20 Available Sections</span>
                </span>
                {selectedGrade !== 'All' && (
                  <span className="text-[10px] font-mono text-blue-800 font-bold bg-blue-100 px-1.5 py-0.2 rounded">
                    20 Sections
                  </span>
                )}
              </label>
              <select
                value={selectedSection}
                onChange={e => setSelectedSection(e.target.value)}
                className="w-full py-2.5 px-3 bg-white rounded-xl border-2 border-blue-900/30 text-stone-900 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-xs cursor-pointer truncate"
              >
                <option value="All">
                  {selectedGrade === 'All' ? 'All Sections (120 Total)' : `All 20 Sections in ${selectedGrade}`}
                </option>
                {availableSections.map((s, idx) => (
                  <option key={s.id} value={s.sectionName}>
                    {selectedGrade === 'All' ? `${s.gradeLevel} - ` : ''}Sec {String((idx % 20) + 1).padStart(2, '0')}: {s.sectionName} — Adv: {s.adviserName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Filter Badges & 20 Available Sections Pill Selector */}
          <div className="space-y-3 pt-2 border-t border-stone-200 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-stone-500 font-bold flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-blue-700" /> Grade Level:
                </span>
                <button
                  onClick={() => { setSelectedGrade('All'); setSelectedSection('All'); }}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                    selectedGrade === 'All' ? 'bg-[#092B62] text-white shadow-xs' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                  }`}
                >
                  All (120 Secs)
                </button>
                {gradeLevels.map(gl => (
                  <button
                    key={gl}
                    onClick={() => { setSelectedGrade(gl); setSelectedSection('All'); }}
                    className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                      selectedGrade === gl ? 'bg-[#092B62] text-white shadow-xs' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                    }`}
                  >
                    {gl}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-stone-500 font-bold">Sex:</span>
                {(['ALL', 'M', 'F'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setSexFilter(s)}
                    className={`px-2 py-0.5 rounded font-bold transition cursor-pointer ${
                      sexFilter === s ? 'bg-blue-800 text-white' : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                    }`}
                  >
                    {s === 'ALL' ? 'Both' : s === 'M' ? 'Male (M)' : 'Female (F)'}
                  </button>
                ))}
                {(selectedGrade !== 'All' || selectedSection !== 'All' || searchQuery || sexFilter !== 'ALL') && (
                  <button
                    onClick={() => {
                      setSelectedGrade('All');
                      setSelectedSection('All');
                      setSearchQuery('');
                      setSexFilter('ALL');
                      setStatusFilter('ALL');
                    }}
                    className="ml-2 px-2 py-0.5 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold rounded text-[11px] cursor-pointer transition"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* 20 Sections Quick Pills Bar for Active Grade */}
            {selectedGrade !== 'All' && (
              <div className="bg-white p-3 rounded-xl border border-blue-200 shadow-2xs space-y-2 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-blue-950 flex items-center gap-1.5 text-[11px]">
                    <Building2 className="w-3.5 h-3.5 text-blue-700" />
                    <span>20 Available Sections in {selectedGrade}:</span>
                    <span className="text-stone-400 font-normal">Click any section to filter student data</span>
                  </div>
                  {selectedSection !== 'All' && (
                    <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold border border-amber-300">
                      Active: {selectedSection}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedSection('All')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      selectedSection === 'All'
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                    }`}
                  >
                    All 20 Sections
                  </button>
                  {availableSections.map((sec, idx) => (
                    <button
                      key={sec.id}
                      onClick={() => setSelectedSection(sec.sectionName)}
                      className={`px-2 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                        selectedSection === sec.sectionName
                          ? 'bg-amber-400 text-blue-950 shadow-xs ring-2 ring-blue-900'
                          : 'bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200'
                      }`}
                      title={`Section ${idx + 1}: ${sec.sectionName} | Adviser: ${sec.adviserName}`}
                    >
                      <span className="opacity-60 text-[9px] font-mono">{idx + 1}.</span>
                      <span>{sec.sectionName}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= TAB CONTENT 1: SEARCH & MANIFEST ================= */}
        {activeTab === 'search' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-blue-50/60 p-3 rounded-xl border border-blue-200">
              <div className="text-xs text-blue-950 font-medium flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                <span>
                  Live Real-Time Results: <strong className="text-blue-900 font-black">{filteredStudents.length}</strong> {filteredStudents.length === 1 ? 'Learner' : 'Learners'}
                  {selectedGrade !== 'All' && <span> in <strong className="text-blue-950">{selectedGrade}</strong></span>}
                  {selectedSection !== 'All' && <span> • Section <strong className="text-blue-950">{selectedSection}</strong></span>}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="flex bg-white p-0.5 rounded-lg border border-stone-300 shadow-2xs">
                  <button
                    onClick={() => setDisplayMode('cards')}
                    className={`px-2.5 py-1 rounded-md font-bold text-xs flex items-center gap-1 cursor-pointer transition ${
                      displayMode === 'cards'
                        ? 'bg-blue-900 text-white shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <span>🗂️ Live Cards List</span>
                  </button>
                  <button
                    onClick={() => setDisplayMode('table')}
                    className={`px-2.5 py-1 rounded-md font-bold text-xs flex items-center gap-1 cursor-pointer transition ${
                      displayMode === 'table'
                        ? 'bg-blue-900 text-white shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <span>📊 Data Table</span>
                  </button>
                </div>
                <span className="text-emerald-800 bg-emerald-100 px-2 py-1 rounded-lg font-bold flex items-center gap-1 border border-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  LIS Synced
                </span>
              </div>
            </div>

            {/* REAL-TIME CARDS LIST VIEW */}
            {displayMode === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredStudents.length === 0 ? (
                  <div className="col-span-full p-8 text-center text-stone-500 bg-stone-50 rounded-2xl border border-stone-200">
                    <Users className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                    <p className="font-bold text-sm">No learners found matching "{searchQuery}" in {selectedGrade} {selectedSection !== 'All' ? `(${selectedSection})` : ''}</p>
                    <p className="text-xs text-stone-400">Try adjusting your search keywords, section selector, or clearing filters.</p>
                  </div>
                ) : (
                  filteredStudents.map((std, idx) => (
                    <div
                      key={std.id}
                      className="bg-white border-2 border-stone-200 hover:border-blue-700/50 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-3 group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${
                              std.sex === 'M' ? 'bg-blue-100 text-blue-900 border border-blue-200' : 'bg-pink-100 text-pink-900 border border-pink-200'
                            }`}>
                              {std.firstName[0]}{std.lastName[0]}
                            </div>
                            <div>
                              <h4 className="font-black text-sm text-stone-950 group-hover:text-blue-900 transition-colors">
                                {std.fullName}
                              </h4>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="font-mono text-[11px] font-bold text-blue-900 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                                  {std.lrn}
                                </span>
                                <button
                                  onClick={() => copyToClipboard(std.lrn, std.lrn)}
                                  title="Copy 12-Digit LRN"
                                  className="text-stone-400 hover:text-blue-700 p-0.5 rounded cursor-pointer"
                                >
                                  {copiedLrn === std.lrn ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                                </button>
                              </div>
                            </div>
                          </div>
                          <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase shrink-0 ${
                            std.sex === 'M' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                          }`}>
                            {std.sex === 'M' ? 'Male' : 'Female'}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px] bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                          <div>
                            <span className="text-stone-500 block text-[10px]">Grade &amp; Section:</span>
                            <strong className="text-stone-900">{std.gradeLevel} - {std.section}</strong>
                          </div>
                          <div>
                            <span className="text-stone-500 block text-[10px]">Class Adviser:</span>
                            <span className="text-stone-800 font-medium truncate block" title={std.adviser}>{std.adviser}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-stone-500 block text-[10px]">Track / Strand:</span>
                            <span className="text-stone-700 font-medium">{std.trackStrand || 'K-10 Basic Education'}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-stone-500 block text-[10px]">Barangay Address:</span>
                            <span className="text-stone-600 truncate block" title={std.address}>{std.address}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
                        <button
                          onClick={() => setSelectedStudentModal(std)}
                          className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition text-[11px]"
                        >
                          <Eye className="w-3.5 h-3.5 text-stone-600" />
                          <span>View Profile</span>
                        </button>
                        {onSelectStudent && (
                          <button
                            onClick={() => onSelectStudent(std)}
                            className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-blue-950 rounded-lg font-black flex items-center gap-1 cursor-pointer shadow-2xs transition text-[11px]"
                          >
                            <span>Auto-Fill SF Forms</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Students Table */}
            {displayMode === 'table' && (
              <div className="overflow-x-auto border border-stone-200 rounded-2xl shadow-xs bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#092B62] text-white uppercase text-[11px] tracking-wider font-bold">
                    <tr>
                      <th className="p-3">#</th>
                      <th className="p-3">LRN (12-Digit)</th>
                      <th className="p-3">Learner Full Name</th>
                      <th className="p-3">Sex</th>
                      <th className="p-3">Grade &amp; Section</th>
                      <th className="p-3">Class Adviser</th>
                      <th className="p-3">Track / Strand</th>
                      <th className="p-3">Barangay Address</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-8 text-center text-stone-500">
                          <Users className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                          <p className="font-bold text-sm">No students match the current filters.</p>
                          <p className="text-xs text-stone-400">Try searching for a different name, LRN, section, or clear your filters.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((std, idx) => (
                        <tr
                          key={std.id}
                          className="hover:bg-blue-50/70 transition-all duration-200 group"
                        >
                          <td className="p-3 font-mono text-stone-400">{idx + 1}</td>
                          <td className="p-3 font-mono font-bold text-blue-900 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <span>{std.lrn}</span>
                              <button
                                onClick={() => copyToClipboard(std.lrn, std.lrn)}
                                title="Copy LRN"
                                className="text-stone-400 hover:text-blue-700 p-0.5 rounded cursor-pointer"
                              >
                                {copiedLrn === std.lrn ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                              </button>
                            </div>
                          </td>
                          <td className="p-3 font-bold text-stone-900 whitespace-nowrap">
                            {std.fullName}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              std.sex === 'M' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                            }`}>
                              {std.sex}
                            </span>
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <span className="font-bold text-stone-900">{std.gradeLevel}</span>
                            <span className="text-stone-500 ml-1">({std.section})</span>
                          </td>
                          <td className="p-3 font-medium text-stone-700 whitespace-nowrap">
                            {std.adviser}
                          </td>
                          <td className="p-3 text-stone-600 whitespace-nowrap">
                            {std.trackStrand || 'K-10 General Academic'}
                          </td>
                          <td className="p-3 text-stone-600 max-w-xs truncate" title={std.address}>
                            {std.address}
                          </td>
                          <td className="p-3 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => setSelectedStudentModal(std)}
                                className="p-1.5 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                                title="View Consolidated Profile"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Profile</span>
                              </button>
                              {onSelectStudent && (
                                <button
                                  onClick={() => onSelectStudent(std)}
                                  className="p-1.5 bg-amber-400 hover:bg-amber-300 text-blue-950 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-2xs"
                                  title="Auto-fill into School Forms"
                                >
                                  <ChevronRight className="w-3.5 h-3.5" />
                                  <span>Select</span>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB CONTENT 2: 120 SECTIONS DIRECTORY ================= */}
        {activeTab === 'sections' && (
          <div className="space-y-8">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-3">
              <School className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">LNNCHS Standard Section Hierarchy (SY 2026-2027):</strong> Exactly 20 officially designated sections per grade level across Grade 7, Grade 8, Grade 9, Grade 10, Grade 11, and Grade 12 (120 Sections Total). Each section is headed by an assigned Adviser and room assignment.
              </div>
            </div>

            {Object.entries(LNNCHS_20_SECTIONS_PER_GRADE)
              .filter(([grade]) => selectedGrade === 'All' || selectedGrade === grade)
              .map(([grade, sections]) => (
                <div key={grade} className="space-y-3">
                  <div className="flex items-center justify-between border-b-2 border-blue-900/20 pb-2">
                    <h3 className="text-lg font-black text-blue-950 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-700" />
                      <span>{grade} Sections Directory</span>
                      <span className="text-xs bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full font-bold">
                        20 Sections
                      </span>
                    </h3>
                    <span className="text-xs text-stone-500 font-semibold">
                      Total Capacity: ~900 Learners
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {sections.map((sec, idx) => (
                      <div
                        key={sec.id}
                        className="bg-stone-50/70 border border-stone-200 rounded-2xl p-4 shadow-2xs hover:shadow-lg hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 ease-out space-y-3 group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono text-stone-400">Section {idx + 1} of 20</span>
                            <h4 className="font-black text-sm text-stone-900 group-hover:text-blue-900 transition">
                              {sec.sectionName}
                            </h4>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                            {sec.roomNumber}
                          </span>
                        </div>

                        <div className="text-xs space-y-1 text-stone-600 border-t border-stone-200/60 pt-2">
                          <div className="font-bold text-stone-900 flex items-center gap-1 text-[11px]">
                            <UserCheck className="w-3 h-3 text-blue-600" />
                            <span>Adviser:</span>
                            <span className="truncate">{sec.adviserName}</span>
                          </div>
                          <div className="text-[10px] text-stone-500 flex items-center justify-between">
                            <span>{sec.adviserPosition}</span>
                            <span className="font-semibold text-emerald-700">{sec.totalLearners} Enrolled</span>
                          </div>
                          {sec.trackStrand && (
                            <div className="text-[10px] bg-amber-100/70 text-amber-900 px-2 py-0.5 rounded font-bold truncate">
                              {sec.trackStrand}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[10px] text-stone-500">
                          <span>M: {sec.maleCount} | F: {sec.femaleCount}</span>
                          <button
                            onClick={() => {
                              setSelectedGrade(grade);
                              setSelectedSection(sec.sectionName);
                              setActiveTab('search');
                            }}
                            className="text-blue-700 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>View Roster</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* ================= TAB CONTENT 3: ENROLLMENT SUMMARY ================= */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {gradeLevels.map(gl => {
                const secs = LNNCHS_20_SECTIONS_PER_GRADE[gl] || [];
                const totalM = secs.reduce((acc, s) => acc + (s.maleCount || 0), 0);
                const totalF = secs.reduce((acc, s) => acc + (s.femaleCount || 0), 0);
                const total = totalM + totalF;

                return (
                  <div
                    key={gl}
                    className="bg-white border-2 border-stone-200 rounded-2xl p-4 text-center space-y-2 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all"
                  >
                    <div className="text-xs font-black text-stone-500 uppercase">{gl}</div>
                    <div className="text-2xl font-black text-blue-950">{total}</div>
                    <div className="text-[11px] text-stone-600 font-semibold">20 Sections</div>
                    <div className="text-[10px] text-stone-500 border-t border-stone-100 pt-1">
                      Male: {totalM} | Female: {totalF}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4">
              <h4 className="text-sm font-black text-blue-950 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-700" />
                <span>LIS Official School Profile &amp; Summary Roster</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                  <div className="text-stone-500 font-bold">School ID / Name</div>
                  <div className="font-black text-blue-950">304012 - LNNCHS</div>
                  <div className="text-stone-400 text-[10px]">Lanao del Norte National Comprehensive High School</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                  <div className="text-stone-500 font-bold">Total Designated Sections</div>
                  <div className="font-black text-blue-950">120 Active Sections</div>
                  <div className="text-stone-400 text-[10px]">Grades 7, 8, 9, 10, 11, 12 (20 each)</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                  <div className="text-stone-500 font-bold">School Division / Region</div>
                  <div className="font-black text-blue-950">Division of Lanao del Norte</div>
                  <div className="text-stone-400 text-[10px]">DepEd Region X (Northern Mindanao)</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                  <div className="text-stone-500 font-bold">Curriculum Framework</div>
                  <div className="font-black text-blue-950">MATATAG &amp; DO 3, s. 2026</div>
                  <div className="text-stone-400 text-[10px]">Three-Term Academic Calendar</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= STUDENT DETAIL MODAL ================= */}
      {selectedStudentModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border-2 border-blue-900/30 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-[#092B62] to-[#1E4E9E] p-6 text-white flex items-center justify-between">
              <div>
                <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                  DepEd LIS Consolidated Learner Profile
                </div>
                <h3 className="text-xl font-black text-white">{selectedStudentModal.fullName}</h3>
                <p className="text-xs text-blue-200 font-mono">LRN: {selectedStudentModal.lrn}</p>
              </div>
              <button
                onClick={() => setSelectedStudentModal(null)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-stone-700">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200 font-medium">
                <div><strong>Grade Level:</strong> {selectedStudentModal.gradeLevel}</div>
                <div><strong>Section:</strong> {selectedStudentModal.section}</div>
                <div><strong>Sex:</strong> {selectedStudentModal.sex === 'M' ? 'Male' : 'Female'}</div>
                <div><strong>Birth Date:</strong> {selectedStudentModal.birthDate}</div>
                <div><strong>Age:</strong> {selectedStudentModal.age} y/o</div>
                <div><strong>Mother Tongue:</strong> {selectedStudentModal.motherTongue}</div>
                <div><strong>Adviser:</strong> {selectedStudentModal.adviser}</div>
                <div><strong>LIS Status:</strong> <span className="text-emerald-700 font-bold">{selectedStudentModal.lisStatus}</span></div>
                <div><strong>Verification:</strong> <span className="text-blue-800 font-bold">{selectedStudentModal.verificationStatus}</span></div>
              </div>

              <div className="space-y-2 bg-white p-4 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-2 text-stone-800 font-bold">
                  <MapPin className="w-4 h-4 text-rose-600" />
                  <span>Residential Address:</span>
                </div>
                <p className="text-stone-600 pl-6">{selectedStudentModal.address}</p>

                <div className="flex items-center gap-2 text-stone-800 font-bold pt-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Parent / Guardian &amp; Contact:</span>
                </div>
                <p className="text-stone-600 pl-6">{selectedStudentModal.parentGuardian} • {selectedStudentModal.contact}</p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => copyToClipboard(JSON.stringify(selectedStudentModal, null, 2), selectedStudentModal.lrn)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl transition flex items-center gap-2 cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy JSON Data</span>
                </button>
                {onSelectStudent && (
                  <button
                    onClick={() => {
                      onSelectStudent(selectedStudentModal);
                      setSelectedStudentModal(null);
                    }}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold rounded-xl shadow transition flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Select for Forms &amp; ECR</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
