import React, { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  BookOpen,
  Calendar,
  Building,
  Award,
  Filter,
  Download,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Shield,
  Layers,
  GraduationCap
} from 'lucide-react';
import { LNNCHS_OFFICIAL_DOCUMENTS, OfficialDocumentItem } from '../data/lnnchsOfficialDocumentsData';
import { LnnchsDoorResultPreviewModal, PreviewItemData } from './LnnchsDoorResultPreviewModal';
import { Eye } from 'lucide-react';

export const LNNCHSOfficialDocumentsModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedGrade, setSelectedGrade] = useState<string>('ALL');
  const [expandedDocId, setExpandedDocId] = useState<string | null>(LNNCHS_OFFICIAL_DOCUMENTS[0].id);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [previewDocData, setPreviewDocData] = useState<PreviewItemData | null>(null);

  const categories = useMemo(() => {
    return ['ALL', 'Student Handbook', 'Regional Memorandum', 'Division Memorandum', 'DepEd Order', 'School Memorandum', 'Curriculum & Rubric'];
  }, []);

  const gradeFilters = useMemo(() => {
    return ['ALL', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  }, []);

  const filteredDocs = useMemo(() => {
    return LNNCHS_OFFICIAL_DOCUMENTS.filter(doc => {
      if (selectedCategory !== 'ALL' && doc.category !== selectedCategory) return false;
      if (selectedGrade !== 'ALL' && !doc.applicableGrades.includes(selectedGrade)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = doc.title.toLowerCase().includes(q);
        const matchesCode = doc.code.toLowerCase().includes(q);
        const matchesSummary = doc.summary.toLowerCase().includes(q);
        const matchesIssuer = doc.issuer.toLowerCase().includes(q);
        const matchesKeywords = doc.keywords.some(k => k.toLowerCase().includes(q));
        const matchesSections = doc.fullSections.some(s => 
          s.heading.toLowerCase().includes(q) || 
          s.content.toLowerCase().includes(q) ||
          s.keyPoints.some(kp => kp.toLowerCase().includes(q))
        );
        return matchesTitle || matchesCode || matchesSummary || matchesIssuer || matchesKeywords || matchesSections;
      }
      return true;
    });
  }, [selectedCategory, selectedGrade, searchQuery]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleDownloadDocSummary = (doc: OfficialDocumentItem) => {
    const textContent = `=====================================================
${doc.title}
Document Code: ${doc.code}
Category: ${doc.category}
Issuer: ${doc.issuer}
Date: ${doc.dateIssued} | SY: ${doc.schoolYear}
Applicable Grades: ${doc.applicableGrades.join(', ')}
Applicable Sections: ${doc.applicableSections.join(', ')}
=====================================================

SUMMARY:
${doc.summary}

KEYWORD INDEX:
${doc.keywords.join(' • ')}

DETAILED PROVISIONS & SECTIONS:
${doc.fullSections.map((s, idx) => `
${idx + 1}. ${s.heading}
${s.content}

Key Points:
${s.keyPoints.map(kp => ` - ${kp}`).join('\n')}
`).join('\n')}

=====================================================
Synchronized with Lanao del Norte National Comprehensive High School (LNNCHS)
School ID: 304005 • Sto. Niño Village, Baroy, Lanao del Norte
Email: 304005.ldn@deped.gov.ph • DepEd Region X
=====================================================`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.code.replace(/[^a-zA-Z0-9_-]/g, '_')}_Document_Brief.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#092B62] via-[#0E3D85] to-[#1E3A8A] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-blue-950 font-black text-xs uppercase tracking-wider mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Official DepEd &amp; LNNCHS Policy Repository</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Synchronized School Policy &amp; Assessment Documents
            </h2>
            <p className="text-blue-100/90 text-xs sm:text-sm mt-1 max-w-3xl">
              Searchable, section-assigned database of the <strong>LNNCHS Student Handbook (S.Y. 2025-2026)</strong>, <strong>RUQA RM 604 s. 2025</strong>, <strong>ECPS Reclassification DM 523 s. 2025</strong>, <strong>Summer Remediation DO 010 s. 2026</strong>, <strong>Sports Memorandum s. 2026</strong>, and <strong>Annex A Lesson Planning Rubrics</strong>.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-center">
              <span className="block text-2xl font-black text-amber-300">{LNNCHS_OFFICIAL_DOCUMENTS.length}</span>
              <span className="text-[10px] text-blue-100 uppercase tracking-wider font-semibold">Official Issuances</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-5 border-2 border-stone-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Main Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords (e.g. uniform, attendance 20%, RUQA, reclassification, summer remediation, sports)..."
              className="w-full pl-11 pr-4 py-2.5 bg-stone-50 hover:bg-stone-100/80 focus:bg-white border-2 border-stone-200 focus:border-blue-700 rounded-xl text-xs font-semibold text-stone-900 transition focus:outline-none"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter documents by category"
              className="w-full py-2.5 px-3 bg-stone-50 border-2 border-stone-200 focus:border-blue-700 rounded-xl text-xs font-bold text-stone-800 transition focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'ALL' ? '📂 All Issuance Types' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Grade Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              aria-label="Filter documents by grade level"
              className="w-full py-2.5 px-3 bg-stone-50 border-2 border-stone-200 focus:border-blue-700 rounded-xl text-xs font-bold text-stone-800 transition focus:outline-none"
            >
              {gradeFilters.map(gr => (
                <option key={gr} value={gr}>
                  {gr === 'ALL' ? '🎓 All Grade Levels (Gr 7–12)' : `Filter: ${gr}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Filter Status Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
          <div className="text-stone-600 font-medium">
            Found <strong className="text-blue-950 font-bold">{filteredDocs.length}</strong> matching policy documents
            {searchQuery && <span> for search "<strong className="text-blue-900">{searchQuery}</strong>"</span>}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-stone-500">
            <span>School ID:</span>
            <strong className="text-stone-800 bg-stone-100 px-1.5 py-0.5 rounded font-mono">304005</strong>
            <span className="mx-1">•</span>
            <span>Principal:</span>
            <strong className="text-stone-800">Anisah A. Sinal</strong>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocs.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border-2 border-dashed border-stone-300">
            <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800">No documents match your query</h3>
            <p className="text-xs text-stone-500 mt-1">Try searching for other terms or reset your category and grade filters.</p>
          </div>
        ) : (
          filteredDocs.map((doc) => {
            const isExpanded = expandedDocId === doc.id;
            return (
              <div
                key={doc.id}
                className={`bg-white rounded-3xl border-2 transition-all duration-200 overflow-hidden shadow-xs ${
                  isExpanded ? 'border-blue-700 ring-2 ring-blue-700/10' : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                {/* Doc Header */}
                <div
                  onClick={() => setExpandedDocId(isExpanded ? null : doc.id)}
                  className="p-5 sm:p-6 cursor-pointer hover:bg-stone-50/70 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-950 border border-blue-200">
                        {doc.category}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                        {doc.code}
                      </span>
                      <span className="text-[11px] text-stone-500 font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-stone-400" />
                        {doc.dateIssued}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-stone-900 leading-snug">
                      {doc.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {doc.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Applicable Sections:</span>
                      {doc.applicableSections.map((sec, i) => (
                        <span key={i} className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200 font-semibold px-2 py-0.5 rounded">
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewDocData({
                          id: doc.id,
                          title: doc.title,
                          code: doc.code,
                          category: doc.category,
                          description: doc.summary,
                          gradeLevel: doc.applicableGrades.join(', '),
                          sectionName: doc.applicableSections.join(', '),
                          adviserName: doc.issuer
                        });
                      }}
                      title="Preview summary & download files (.docx, .pptx, .xlsx, .pdf)"
                      className="p-2 bg-gradient-to-r from-blue-700 to-indigo-800 hover:brightness-110 text-white rounded-xl transition text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Eye className="w-4 h-4 text-amber-300" />
                      <span className="hidden sm:inline">Preview</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadDocSummary(doc);
                      }}
                      title="Download text summary"
                      className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Export</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(doc.summary, doc.id);
                      }}
                      title="Copy summary to clipboard"
                      className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode === doc.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      <span className="hidden sm:inline">Copy</span>
                    </button>
                    <div className="p-2 text-stone-400">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-blue-900" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Doc Expanded Body */}
                {isExpanded && (
                  <div className="p-5 sm:p-7 border-t border-stone-200 bg-stone-50/50 space-y-6">
                    {/* Issuer & Metadata box */}
                    <div className="bg-white p-4 rounded-2xl border border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Originating Authority / Issuer</span>
                        <strong className="text-stone-900">{doc.issuer}</strong>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">School Year &amp; Target</span>
                        <strong className="text-stone-900">{doc.schoolYear} ({doc.applicableGrades.join(', ')})</strong>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Assigned Hierarchy</span>
                        <strong className="text-blue-900">{doc.applicableSections.join('; ')}</strong>
                      </div>
                    </div>

                    {/* Detailed Sections Breakdown */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-wider text-blue-950 flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-amber-500" />
                        <span>Key Provisions &amp; Operational Standards</span>
                      </h4>

                      <div className="grid grid-cols-1 gap-3">
                        {doc.fullSections.map((sec, secIdx) => (
                          <div key={secIdx} className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2.5">
                            <h5 className="font-black text-sm text-stone-900 flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 text-[10px] flex items-center justify-center font-bold">
                                {secIdx + 1}
                              </span>
                              <span>{sec.heading}</span>
                            </h5>
                            <p className="text-xs text-stone-700 leading-relaxed">
                              {sec.content}
                            </p>
                            {sec.keyPoints && sec.keyPoints.length > 0 && (
                              <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-wider text-blue-900 block">Critical Implementation Notes:</span>
                                <ul className="list-disc list-inside text-xs text-blue-950 space-y-0.5">
                                  {sec.keyPoints.map((kp, kpIdx) => (
                                    <li key={kpIdx} className="leading-snug">{kp}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Keywords Index */}
                    <div className="pt-2">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">Search Index Tags:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {doc.keywords.map((kw, kwIdx) => (
                          <button
                            key={kwIdx}
                            onClick={() => setSearchQuery(kw)}
                            className="text-[10px] bg-stone-200/80 hover:bg-stone-300 text-stone-800 font-medium px-2 py-0.5 rounded-md cursor-pointer transition"
                          >
                            #{kw}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal Preview for Official Document Result */}
      {previewDocData && (
        <LnnchsDoorResultPreviewModal
          itemData={previewDocData}
          isOpen={true}
          onClose={() => setPreviewDocData(null)}
        />
      )}
    </div>
  );
};
