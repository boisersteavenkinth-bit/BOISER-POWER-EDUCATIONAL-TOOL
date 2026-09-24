import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Download,
  Calendar,
  Layers,
  FileText,
  Eye,
  Info,
  ExternalLink,
  Tag
} from 'lucide-react';
import {
  CurriculumRecordMaster,
  CurriculumVersion,
  SourceStatus
} from '../types/masterResearchCurriculum';
import { SEED_CURRICULUM_RECORDS } from '../data/masterDatabaseSeed';

interface CurriculumDatabaseModuleProps {
  importedRecords?: CurriculumRecordMaster[];
}

export const CurriculumDatabaseModule: React.FC<CurriculumDatabaseModuleProps> = ({
  importedRecords = []
}) => {
  const [records, setRecords] = useState<CurriculumRecordMaster[]>([
    ...SEED_CURRICULUM_RECORDS,
    ...importedRecords
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVersion, setSelectedVersion] = useState<CurriculumVersion | 'ALL'>('ALL');
  const [selectedTerm, setSelectedTerm] = useState<'ALL' | 'Term 1' | 'Term 2' | 'Term 3'>('ALL');
  const [selectedGrade, setSelectedGrade] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<SourceStatus | 'ALL'>('ALL');
  const [inspectRecord, setInspectRecord] = useState<CurriculumRecordMaster | null>(null);

  const filtered = records.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      r.competency_code.toLowerCase().includes(q) ||
      r.competency_text.toLowerCase().includes(q) ||
      r.subject.toLowerCase().includes(q) ||
      (r.domain && r.domain.toLowerCase().includes(q));

    const matchesVersion = selectedVersion === 'ALL' || r.curriculum_version === selectedVersion;
    const matchesTerm = selectedTerm === 'ALL' || r.term === selectedTerm;
    const matchesGrade = selectedGrade === 'ALL' || r.grade_level === selectedGrade;
    const matchesStatus = selectedStatus === 'ALL' || r.verification_status === selectedStatus;

    return matchesSearch && matchesVersion && matchesTerm && matchesGrade && matchesStatus;
  });

  const handleExportCSV = () => {
    if (filtered.length === 0) return;
    const headers = [
      'curriculum_id',
      'curriculum_version',
      'school_year',
      'grade_level',
      'learning_area',
      'subject',
      'domain',
      'competency_code',
      'competency_text',
      'term',
      'quarter',
      'source_document',
      'verification_status'
    ];

    const csvLines = [
      headers.join(','),
      ...filtered.map((r) =>
        [
          r.curriculum_id,
          r.curriculum_version,
          r.school_year,
          r.grade_level,
          r.learning_area,
          r.subject,
          r.domain || '',
          r.competency_code,
          `"${(r.competency_text || '').replace(/"/g, '""')}"`,
          r.term,
          r.quarter || '',
          `"${(r.source_document || '').replace(/"/g, '""')}"`,
          r.verification_status
        ].join(',')
      )
    ];

    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `deped_curriculum_database_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Module Banner */}
      <div className="bg-gradient-to-r from-[#001f5c] via-[#0038A8] to-[#002776] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-400/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCD116] text-[#002776] text-xs font-black uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              Version-Controlled Repository
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Curriculum &amp; Competency Database</h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-2xl">
              Strictly version-controlled DepEd curriculum repository. Preserves historical K-12, MELC, and MATATAG revisions without undifferentiated merging.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-2xl bg-[#FCD116] hover:bg-yellow-400 text-[#002776] font-extrabold text-xs transition shadow-md flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4 text-[#002776]" />
            <span>Export CSV / Excel ({filtered.length})</span>
          </button>
        </div>

        {/* Quick Version Metrics */}
        <div className="mt-6 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-white/10 border border-white/15">
            <span className="text-blue-200 block text-[10px] uppercase font-bold">MATATAG_2026</span>
            <span className="text-lg font-black text-[#FCD116]">
              {records.filter((r) => r.curriculum_version === 'MATATAG_2026').length}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-white/10 border border-white/15">
            <span className="text-blue-200 block text-[10px] uppercase font-bold">MATATAG (Phase 1)</span>
            <span className="text-lg font-black text-white">
              {records.filter((r) => r.curriculum_version === 'MATATAG').length}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-white/10 border border-white/15">
            <span className="text-blue-200 block text-[10px] uppercase font-bold">MELC_2020</span>
            <span className="text-lg font-black text-white">
              {records.filter((r) => r.curriculum_version === 'MELC_2020').length}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-white/10 border border-white/15">
            <span className="text-blue-200 block text-[10px] uppercase font-bold">Official Verified</span>
            <span className="text-lg font-black text-emerald-300">
              {records.filter((r) => r.verification_status === 'VERIFIED_OFFICIAL').length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search code, competency, subject..."
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-2xl border border-stone-300 focus:outline-none focus:border-[#0038A8]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value as any)}
              className="text-xs font-bold p-2.5 rounded-xl border border-stone-300 bg-stone-50"
            >
              <option value="ALL">All Curriculum Versions</option>
              <option value="MATATAG_2026">MATATAG_2026 (DepEd 015, s. 2026)</option>
              <option value="MATATAG">MATATAG (Phase 1)</option>
              <option value="MELC_2020">MELC_2020</option>
              <option value="K12_ORIGINAL">K12_ORIGINAL</option>
            </select>

            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value as any)}
              className="text-xs font-bold p-2.5 rounded-xl border border-stone-300 bg-stone-50"
            >
              <option value="ALL">All 3-Terms</option>
              <option value="Term 1">Term 1 (Jun–Sep)</option>
              <option value="Term 2">Term 2 (Oct–Jan)</option>
              <option value="Term 3">Term 3 (Feb–May)</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="text-xs font-bold p-2.5 rounded-xl border border-stone-300 bg-stone-50"
            >
              <option value="ALL">All Verification Statuses</option>
              <option value="VERIFIED_OFFICIAL">VERIFIED_OFFICIAL</option>
              <option value="SECONDARY_SOURCE">SECONDARY_SOURCE</option>
              <option value="USER_IMPORTED">USER_IMPORTED</option>
              <option value="NEEDS_VERIFICATION">NEEDS_VERIFICATION</option>
            </select>
          </div>
        </div>
      </div>

      {/* Curriculum Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((record) => (
          <div
            key={record.curriculum_id}
            className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs hover:border-[#0038A8] transition space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-black text-[#0038A8] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  {record.competency_code}
                </span>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                      record.verification_status === 'VERIFIED_OFFICIAL'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-amber-50 text-amber-800 border-amber-300'
                    }`}
                  >
                    {record.verification_status}
                  </span>

                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                    {record.curriculum_version}
                  </span>
                </div>
              </div>

              <h4 className="text-xs font-bold text-stone-900 leading-snug">{record.competency_text}</h4>

              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100 space-y-1 text-[11px]">
                <div className="flex items-center justify-between text-stone-600">
                  <span><strong>Subject:</strong> {record.subject} ({record.grade_level})</span>
                  <span className="font-bold text-[#0038A8] bg-blue-100/60 px-2 py-0.5 rounded-md">{record.term}</span>
                </div>
                {record.domain && (
                  <div className="text-stone-500 truncate">
                    <strong>Domain:</strong> {record.domain}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11px]">
              <span className="text-stone-400 truncate max-w-[200px]" title={record.source_document}>
                Source: {record.source_document}
              </span>
              <button
                onClick={() => setInspectRecord(record)}
                className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0038A8] font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect Record</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Record Inspection Modal */}
      {inspectRecord && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2 font-black text-sm text-[#0038A8]">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Curriculum Record Provenance Details</span>
              </div>
              <button
                onClick={() => setInspectRecord(null)}
                className="text-stone-400 hover:text-stone-700 font-bold text-xs"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-3 text-xs max-h-96 overflow-y-auto">
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
                <span className="font-mono font-bold text-[#0038A8] text-sm block">{inspectRecord.competency_code}</span>
                <p className="font-medium text-stone-800">{inspectRecord.competency_text}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 block">Curriculum Version</span>
                  <span className="font-bold text-stone-800">{inspectRecord.curriculum_version}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 block">Term &amp; Quarter</span>
                  <span className="font-bold text-stone-800">{inspectRecord.term} ({inspectRecord.quarter || 'N/A'})</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 block">Grade &amp; Subject</span>
                  <span className="font-bold text-stone-800">{inspectRecord.grade_level} - {inspectRecord.subject}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 block">Verification Status</span>
                  <span className="font-bold text-emerald-700">{inspectRecord.verification_status}</span>
                </div>
              </div>

              {inspectRecord.content_standard && (
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="font-bold text-stone-700 block">Content Standard:</span>
                  <p className="text-stone-600">{inspectRecord.content_standard}</p>
                </div>
              )}

              {inspectRecord.performance_standard && (
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="font-bold text-stone-700 block">Performance Standard:</span>
                  <p className="text-stone-600">{inspectRecord.performance_standard}</p>
                </div>
              )}

              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1 text-[11px]">
                <span className="font-bold block">Source Document Provenance:</span>
                <p>{inspectRecord.source_document}</p>
                {inspectRecord.source_url && (
                  <a
                    href={inspectRecord.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-700 underline font-semibold flex items-center gap-1 mt-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>View Official DepEd Source Document</span>
                  </a>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInspectRecord(null)}
                className="px-5 py-2 rounded-xl bg-[#0038A8] text-white font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
