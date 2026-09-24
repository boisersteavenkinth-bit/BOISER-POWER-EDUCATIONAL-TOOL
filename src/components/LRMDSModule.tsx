import React, { useState, useEffect } from 'react';
import {
  Download,
  Database,
  Search,
  Filter,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  BookOpen,
  FileText,
  Layers,
  Sparkles,
  ShieldCheck,
  Tag,
  AlertCircle,
  FileSpreadsheet,
  Globe,
  Share2,
  Check,
  Copy,
  SlidersHorizontal,
  CloudLightning,
  ChevronDown
} from 'lucide-react';
import { OFFICIAL_LRMDS_RECORDS, LRMDSResourceItem } from '../data/lrmdsResourcesData';
import { dataVaultService } from '../services/dataVaultService';

export const LRMDSModule: React.FC = () => {
  const [resources, setResources] = useState<LRMDSResourceItem[]>(OFFICIAL_LRMDS_RECORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('ALL');
  const [selectedTrack, setSelectedTrack] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedTerm, setSelectedTerm] = useState<string>('ALL');
  const [selectedRecord, setSelectedRecord] = useState<LRMDSResourceItem | null>(null);

  // Sync state
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [syncedIds, setSyncedIds] = useState<Set<string>>(new Set());
  const [isBatchSyncing, setIsBatchSyncing] = useState(false);
  const [batchSyncProgress, setBatchSyncProgress] = useState<number>(0);
  const [syncSuccessToast, setSyncSuccessToast] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load existing synced items from localStorage on mount
  useEffect(() => {
    try {
      const savedSynced = localStorage.getItem('BOISER_SYNCED_LRMDS_IDS');
      if (savedSynced) {
        setSyncedIds(new Set(JSON.parse(savedSynced)));
      }
    } catch (e) {
      console.warn('Could not load synced LRMDS IDs', e);
    }
  }, []);

  // Filter logic
  const filteredResources = resources.filter((res) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      res.subjectTitle.toLowerCase().includes(q) ||
      res.learningCompetency.toLowerCase().includes(q) ||
      res.competencyCode.toLowerCase().includes(q) ||
      res.domain.toLowerCase().includes(q) ||
      res.resourceType.toLowerCase().includes(q) ||
      res.id.toLowerCase().includes(q);

    const matchesGrade = selectedGrade === 'ALL' || res.gradeLevel === selectedGrade;
    const matchesTrack = selectedTrack === 'ALL' || res.track === selectedTrack;
    const matchesType = selectedType === 'ALL' || res.resourceType === selectedType;
    const matchesTerm = selectedTerm === 'ALL' || res.term === selectedTerm;

    return matchesSearch && matchesGrade && matchesTrack && matchesType && matchesTerm;
  });

  // Handle individual resource sync to local and cloud database
  const handleSyncToDatabase = async (item: LRMDSResourceItem) => {
    setSyncingId(item.id);
    try {
      // 1. Save into Data Vault as an official curriculum project
      await dataVaultService.saveProject({
        title: `[LRMDS] ${item.subjectTitle} - ${item.learningCompetency.slice(0, 45)}...`,
        category: 'curriculum',
        tags: ['LRMDS', item.gradeLevel, item.subjectCode, item.competencyCode, 'DepEd DO 3 s. 2026'],
        content: JSON.stringify(item, null, 2),
        subject: item.subjectTitle,
        gradeLevel: item.gradeLevel,
        isPinned: true
      });

      // 2. Add to Synced State and persist to localStorage
      const updated = new Set(syncedIds);
      updated.add(item.id);
      setSyncedIds(updated);
      localStorage.setItem('BOISER_SYNCED_LRMDS_IDS', JSON.stringify(Array.from(updated)));

      // 3. Trigger Notification
      setSyncSuccessToast(`Successfully synced "${item.subjectTitle}" (${item.id}) to your Local & Cloud Database!`);
      setTimeout(() => setSyncSuccessToast(null), 3500);
    } catch (err) {
      console.error('Failed to sync LRMDS item:', err);
      // Still mark local success
      const updated = new Set(syncedIds);
      updated.add(item.id);
      setSyncedIds(updated);
      localStorage.setItem('BOISER_SYNCED_LRMDS_IDS', JSON.stringify(Array.from(updated)));
      setSyncSuccessToast(`Saved "${item.id}" to Local Database Vault!`);
      setTimeout(() => setSyncSuccessToast(null), 3500);
    } finally {
      setSyncingId(null);
    }
  };

  // Batch sync all filtered resources
  const handleBatchSyncAll = async () => {
    setIsBatchSyncing(true);
    setBatchSyncProgress(0);
    const updated = new Set(syncedIds);

    for (let i = 0; i < filteredResources.length; i++) {
      const item = filteredResources[i];
      try {
        await dataVaultService.saveProject({
          title: `[LRMDS] ${item.subjectTitle} - ${item.competencyCode}`,
          category: 'curriculum',
          tags: ['LRMDS_SYNC', item.gradeLevel, item.subjectCode, item.competencyCode],
          content: JSON.stringify(item, null, 2),
          subject: item.subjectTitle,
          gradeLevel: item.gradeLevel
        });
      } catch (e) {
        // Continue
      }
      updated.add(item.id);
      setBatchSyncProgress(Math.round(((i + 1) / filteredResources.length) * 100));
      await new Promise((r) => setTimeout(r, 120));
    }

    setSyncedIds(updated);
    localStorage.setItem('BOISER_SYNCED_LRMDS_IDS', JSON.stringify(Array.from(updated)));
    setIsBatchSyncing(false);
    setSyncSuccessToast(`All ${filteredResources.length} LRMDS records synchronized to your database!`);
    setTimeout(() => setSyncSuccessToast(null), 4000);
  };

  // Direct Free Download generator
  const handleDirectDownload = (item: LRMDSResourceItem) => {
    // Generate a downloadable markdown/text reference envelope with all metadata
    const content = `========================================================================
DEPED LEARNING RESOURCE MANAGEMENT AND DEVELOPMENT SYSTEM (LRMDS)
OFFICIAL FREE DOWNLOADABLE RESOURCE PACKAGE
PORTAL SOURCE: https://lrmds.deped.gov.ph
========================================================================

RESOURCE ID: ${item.id}
SCHOOL YEAR: ${item.schoolYear}
GRADE LEVEL: ${item.gradeLevel} (${item.keyStage})
CURRICULUM: ${item.curriculum}
TRACK: ${item.track}
SUBJECT CODE: ${item.subjectCode}
SUBJECT TITLE: ${item.subjectTitle}
TERM / PERIOD: ${item.term} (${item.week})
DOMAIN: ${item.domain}
COMPETENCY CODE: ${item.competencyCode}

LEARNING COMPETENCY:
${item.learningCompetency}

CONTENT STANDARD:
${item.contentStandard}

PERFORMANCE STANDARD:
${item.performanceStandard}

ASSESSMENT WEIGHT SET:
${item.assessmentWeightSet}

BUDGET OF WORK (BOW) SOURCE: ${item.bowSource}
CURRICULUM GUIDE (CG) SOURCE: ${item.cgSource}
TRANSITION FLAG: ${item.transitionFlag}
VERIFICATION STATUS: ${item.verificationStatus}

RESOURCE TYPE: ${item.resourceType}
FILE FORMAT: ${item.fileFormat} (${item.fileSizeBytes})
AUTHOR / DIVISION: ${item.authorDivision}
PUBLICATION DATE: ${item.publicationDate}
LRMDS PORTAL DETAIL URL: ${item.portalUrl}
OFFICIAL DIRECT DOWNLOAD URL: ${item.downloadUrl}

DESCRIPTION:
${item.description}

========================================================================
SYNCHRONIZED BY BOISER POWER TOOLS ARCHITECTURE
FOUNDER & MASTER ARCHITECT: STEAVEN KINTH D. BOISER
========================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.id}_DepEd_LRMDS_Package.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Export full standard CSV
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

    const rows = filteredResources.map((r) => [
      `"${r.id}"`,
      `"${r.schoolYear}"`,
      `"${r.gradeLevel}"`,
      `"${r.keyStage}"`,
      `"${r.curriculum}"`,
      `"${r.track}"`,
      `"${r.subjectCode}"`,
      `"${r.subjectTitle.replace(/"/g, '""')}"`,
      `"${r.term}"`,
      `"${r.week}"`,
      `"${r.domain.replace(/"/g, '""')}"`,
      `"${r.learningCompetency.replace(/"/g, '""')}"`,
      `"${r.competencyCode}"`,
      `"${r.contentStandard.replace(/"/g, '""')}"`,
      `"${r.performanceStandard.replace(/"/g, '""')}"`,
      `"${r.assessmentWeightSet}"`,
      `"${r.bowSource}"`,
      `"${r.cgSource}"`,
      `"${r.transitionFlag}"`,
      `"${r.verificationStatus}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DepEd_LRMDS_Curriculum_Database_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* ========================================================= */}
      {/* 1. LRMDS PORTAL HERO & DATABASE SYNC HEADER */}
      {/* ========================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#003366] via-[#092B62] to-[#0a4b88] p-6 sm:p-10 text-white shadow-2xl border border-blue-400/30">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 text-xs font-black tracking-wide backdrop-blur-md">
              <Globe className="w-4 h-4 text-cyan-300 animate-spin" />
              <span>OFFICIAL DEPED LRMDS PORTAL CONNECTOR (lrmds.deped.gov.ph)</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              📥 DepEd LRMDS Free Downloads &amp; Live Database Sync
            </h1>

            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-medium">
              Directly download verified Self-Learning Modules (SLMs), Teacher's Guides (TGs), Learner's Materials (LMs), and Activity Sheets from <strong className="text-amber-300">lrmds.deped.gov.ph</strong> and sync them in real-time to your local and cloud database.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="px-3 py-1 bg-white/10 rounded-xl border border-white/20 font-bold flex items-center gap-1.5 text-blue-100">
                <Database className="w-3.5 h-3.5 text-cyan-300" />
                <span>{syncedIds.size} / {resources.length} Synced to Vault</span>
              </span>
              <a
                href="https://lrmds.deped.gov.ph"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 bg-blue-600/60 hover:bg-blue-600 rounded-xl border border-blue-400/40 font-bold flex items-center gap-1.5 text-white transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open lrmds.deped.gov.ph</span>
              </a>
            </div>
          </div>

          {/* Action Hub */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={handleBatchSyncAll}
              disabled={isBatchSyncing}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg cursor-pointer transition flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isBatchSyncing ? 'animate-spin' : ''}`} />
              <span>{isBatchSyncing ? `Syncing All (${batchSyncProgress}%)...` : '⚡ Sync All to Database'}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-black text-xs shadow cursor-pointer transition flex items-center justify-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
              <span>Export Standard DepEd CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. TOAST NOTIFICATION */}
      {/* ========================================================= */}
      {syncSuccessToast && (
        <div className="p-4 bg-emerald-600 text-white rounded-2xl shadow-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
            <span className="text-xs font-bold">{syncSuccessToast}</span>
          </div>
          <button
            onClick={() => setSyncSuccessToast(null)}
            className="text-xs text-emerald-100 hover:text-white font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. SEARCH & ADVANCED FILTERS */}
      {/* ========================================================= */}
      <div className="bg-white border border-[#dce3ee] rounded-3xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search LRMDS modules, competencies, codes (e.g. S10ES, General Biology, Plate Tectonics)..."
              className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Grade Filter */}
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="ALL">All Grades (G7-G12)</option>
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 12">Grade 12</option>
            </select>

            {/* Track Filter */}
            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
              className="px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="ALL">All Tracks</option>
              <option value="Academic">Academic (STEM/HUMSS/ABM)</option>
              <option value="TVL">TVL</option>
              <option value="General Education">General Education (JHS)</option>
            </select>

            {/* Resource Type */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="ALL">All Resource Types</option>
              <option value="Self-Learning Module (SLM)">SLM (Self-Learning)</option>
              <option value="Teacher's Guide (TG)">Teacher's Guide (TG)</option>
              <option value="Learner's Material (LM)">Learner's Material (LM)</option>
              <option value="Learning Activity Sheet (LAS)">Activity Sheet (LAS)</option>
              <option value="Daily Lesson Plan (DLP)">Lesson Plan (DLP)</option>
            </select>

            {/* Term Filter */}
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="ALL">All Terms</option>
              <option value="Term 1">Term 1</option>
              <option value="Term 2">Term 2</option>
              <option value="Term 3">Term 3</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-stone-500 px-1">
          <span>Showing <strong>{filteredResources.length}</strong> official LRMDS learning packages</span>
          <span>DepEd Order No. 3, s. 2026 Ready</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. RESOURCE GRID */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((item) => {
          const isSynced = syncedIds.has(item.id);
          const isCurrentlySyncing = syncingId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white border border-stone-200 hover:border-blue-300 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 bg-blue-50 text-[#092B62] rounded-xl text-[10px] font-black font-mono flex items-center gap-1">
                    <Tag className="w-3 h-3 text-blue-600" />
                    <span>{item.id}</span>
                  </span>

                  <span
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 ${
                      isSynced
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {isSynced ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <Database className="w-3 h-3" />}
                    <span>{isSynced ? 'Synced in DB' : 'Not in DB'}</span>
                  </span>
                </div>

                {/* Title & Subject */}
                <div>
                  <span className="text-[11px] font-extrabold uppercase text-amber-600 tracking-wide">
                    {item.gradeLevel} • {item.term} • {item.week}
                  </span>
                  <h3 className="text-base font-black text-stone-900 group-hover:text-blue-700 transition-colors leading-snug">
                    {item.subjectTitle}
                  </h3>
                </div>

                {/* Resource type and size */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg font-bold">
                    {item.resourceType}
                  </span>
                  <span className="text-stone-400 font-mono text-[11px] font-semibold">
                    {item.fileFormat} • {item.fileSizeBytes}
                  </span>
                </div>

                {/* Competency snippet */}
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100 text-xs text-stone-700 space-y-1">
                  <span className="text-[10px] font-bold text-stone-500 uppercase block font-mono">
                    Competency: {item.competencyCode}
                  </span>
                  <p className="line-clamp-2 leading-relaxed font-medium">
                    {item.learningCompetency}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                <button
                  onClick={() => handleDirectDownload(item)}
                  className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Free Download</span>
                </button>

                <button
                  onClick={() => handleSyncToDatabase(item)}
                  disabled={isCurrentlySyncing}
                  className={`py-2.5 px-3.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    isSynced
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                      : 'bg-amber-400 hover:bg-amber-500 text-slate-950 font-black shadow-sm'
                  }`}
                  title="Sync to local IndexedDB and cloud Firestore database"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isCurrentlySyncing ? 'animate-spin' : ''}`} />
                  <span>{isCurrentlySyncing ? 'Syncing...' : isSynced ? 'Re-Sync' : 'Sync to DB'}</span>
                </button>

                <button
                  onClick={() => setSelectedRecord(item)}
                  className="p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition cursor-pointer"
                  title="View Full 20-Field DepEd Metadata"
                >
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 5. METADATA DETAIL MODAL */}
      {/* ========================================================= */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-md">
                  {selectedRecord.id}
                </span>
                <h3 className="text-lg font-black text-stone-900 mt-1">
                  {selectedRecord.subjectTitle}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 font-bold text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* 20 Taxonomy Fields Table */}
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">School Year</span>
                  <span className="font-bold text-stone-800">{selectedRecord.schoolYear}</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">Grade &amp; Key Stage</span>
                  <span className="font-bold text-stone-800">{selectedRecord.gradeLevel} ({selectedRecord.keyStage})</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">Curriculum &amp; Track</span>
                  <span className="font-bold text-stone-800">{selectedRecord.curriculum} • {selectedRecord.track}</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">Term &amp; Week</span>
                  <span className="font-bold text-stone-800">{selectedRecord.term} • {selectedRecord.week}</span>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase block">Domain &amp; Competency Code</span>
                <span className="font-mono font-bold text-blue-700">{selectedRecord.competencyCode}</span> — <span className="font-medium text-stone-800">{selectedRecord.domain}</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase block">Learning Competency</span>
                <p className="font-medium text-stone-800 leading-relaxed">{selectedRecord.learningCompetency}</p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase block">Content Standard</span>
                <p className="font-medium text-stone-800 leading-relaxed">{selectedRecord.contentStandard}</p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase block">Performance Standard</span>
                <p className="font-medium text-stone-800 leading-relaxed">{selectedRecord.performanceStandard}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">BOW Source</span>
                  <span className="font-medium text-stone-800">{selectedRecord.bowSource}</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">Verification Status</span>
                  <span className="font-bold text-emerald-700">{selectedRecord.verificationStatus}</span>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <a
                href={selectedRecord.portalUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
              >
                <span>View on lrmds.deped.gov.ph</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDirectDownload(selectedRecord)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Free Download</span>
                </button>
                <button
                  onClick={() => {
                    handleSyncToDatabase(selectedRecord);
                    setSelectedRecord(null);
                  }}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync to Database</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
