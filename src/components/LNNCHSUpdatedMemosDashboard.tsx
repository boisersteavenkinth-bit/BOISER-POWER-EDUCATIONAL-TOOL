import React, { useState, useMemo } from 'react';
import {
  Shield,
  Search,
  BookMarked,
  FileText,
  Building,
  Calendar,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { LNNCHS_OFFICIAL_DOCUMENTS, OfficialDocumentItem } from '../data/lnnchsOfficialDocumentsData';

export const LNNCHSUpdatedMemosDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedDocId, setExpandedDocId] = useState<string | null>(null);

  const allOfficialDocs = useMemo(() => {
    return LNNCHS_OFFICIAL_DOCUMENTS.filter(doc => 
      doc.category.includes('Memorandum') || doc.category.includes('DepEd Order') || doc.category.includes('Handbook')
    );
  }, []);

  const filteredDocs = useMemo(() => {
    return allOfficialDocs.filter(doc => {
      const matchesCategory = selectedCategory === 'ALL' || doc.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        doc.title.toLowerCase().includes(q) || 
        doc.code.toLowerCase().includes(q) || 
        doc.summary.toLowerCase().includes(q) || 
        doc.issuer.toLowerCase().includes(q) ||
        doc.keywords.some(k => k.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [allOfficialDocs, selectedCategory, searchQuery]);

  const categories = ['ALL', 'Division Memorandum', 'Regional Memorandum', 'DepEd Order', 'Student Handbook', 'School Memorandum'];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#002776] via-[#092B62] to-[#1e3a8a] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <h2 className="text-2xl font-black flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#FCD116]" />
              Official Updated Memos & Documents Dashboard
            </h2>
            <p className="text-blue-100 mt-2 max-w-2xl text-xs sm:text-sm">
              Centralized repository for official issuances across National (DepEd Orders), Regional (Region X), Division (Lanao del Norte / Iligan City), and School levels with cross-references.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-center min-w-[100px]">
              <span className="block text-2xl font-black text-[#FCD116]">{filteredDocs.length}</span>
              <span className="text-[10px] text-blue-100 uppercase tracking-wider font-semibold">Displayed</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-center min-w-[100px]">
              <span className="block text-2xl font-black text-emerald-400">{allOfficialDocs.length}</span>
              <span className="text-[10px] text-blue-100 uppercase tracking-wider font-semibold">Total Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls: Search and Filters */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search memo number, title, keywords (e.g. DM 299, DM 290-B, DO 3, Khan Academy, PhilHealth)..."
            className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-4 h-4 text-stone-400 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#002776] text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat === 'ALL' ? 'All Coverage' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Memos Grid */}
      {filteredDocs.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-stone-200 text-stone-500 space-y-2">
          <FileText className="w-10 h-10 mx-auto text-stone-300" />
          <p className="font-bold">No official memoranda match your search filter.</p>
          <p className="text-xs text-stone-400">Try clearing your search query or selecting "All Coverage".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocs.map(doc => {
            const isExpanded = expandedDocId === doc.id;
            return (
              <div key={doc.id} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                      doc.category === 'DepEd Order'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : doc.category === 'Regional Memorandum'
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : doc.category === 'Division Memorandum'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {doc.category}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200">
                      {doc.code}
                    </span>
                  </div>
                  
                  <h3 className="text-base font-black text-stone-900 leading-snug">
                    {doc.title}
                  </h3>

                  <div className="space-y-1 text-xs text-stone-600">
                    <div className="flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="font-medium truncate">{doc.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>Issued: <strong className="text-stone-800">{doc.dateIssued}</strong> (S.Y. {doc.schoolYear})</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 bg-stone-50 p-3.5 rounded-2xl border border-stone-100 leading-relaxed">
                    {doc.summary}
                  </p>

                  {/* Expanded Full Sections & Key Points */}
                  {isExpanded && doc.fullSections && doc.fullSections.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-stone-100 space-y-3 animate-fadeIn">
                      <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                        <BookMarked className="w-3.5 h-3.5 text-blue-600" />
                        Detailed Provisions & References:
                      </div>
                      {doc.fullSections.map((sec, idx) => (
                        <div key={idx} className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 space-y-1.5 text-xs">
                          <span className="font-bold text-blue-900 block">{sec.heading}</span>
                          <p className="text-stone-700 leading-relaxed">{sec.content}</p>
                          {sec.keyPoints && (
                            <ul className="space-y-1 pt-1">
                              {sec.keyPoints.map((kp, kIdx) => (
                                <li key={kIdx} className="flex items-start gap-1.5 text-[11px] text-stone-600">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{kp}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="pt-2 flex items-center gap-2">
                  {doc.fullSections && doc.fullSections.length > 0 && (
                    <button 
                      onClick={() => setExpandedDocId(isExpanded ? null : doc.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-stone-100 text-stone-800 rounded-xl text-xs font-bold hover:bg-stone-200 transition"
                    >
                      {isExpanded ? (
                        <>Hide Details <ChevronUp className="w-3.5 h-3.5" /></>
                      ) : (
                        <>View Full References <ChevronDown className="w-3.5 h-3.5" /></>
                      )}
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      alert(`Official Reference Code: ${doc.code}\nIssuer: ${doc.issuer}\nDate: ${doc.dateIssued}\n\nSummary:\n${doc.summary}`);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#002776] text-white rounded-xl text-xs font-bold hover:bg-blue-900 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Reference Info
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

