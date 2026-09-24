import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle,
  ShieldCheck,
  Layers, 
  Users, 
  Sparkles, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  Settings, 
  Eye, 
  RefreshCw, 
  GraduationCap, 
  School, 
  ChevronRight, 
  Award, 
  Search,
  Filter,
  FileCheck,
  CheckCircle,
  Cloud,
  CloudUpload,
  ExternalLink
} from 'lucide-react';
import { AnswerKey, ComparativeGradingResult } from '../types/answerKey';
import { transmuteInitialGrade, getQualitativeDescriptor } from '../data/gradingRules';
import { 
  BatchStudentGradeEntry, 
  BatchGradingExportConfig, 
  DEFAULT_BATCH_CONFIG,
  exportBatchGradingToPdf, 
  exportSingleStudentGradingPdf 
} from '../utils/batchGradingPdfExporter';
import { 
  pushGradingPdfToGoogleDrive, 
  pushSingleStudentPdfToGoogleDrive, 
  BOISER_GRADING_REPORTS_FOLDER_NAME 
} from '../services/gradingReportDriveSyncService';

interface BatchGradingManagerProps {
  activeKey: AnswerKey;
  batchStudents: BatchStudentGradeEntry[];
  setBatchStudents: React.Dispatch<React.SetStateAction<BatchStudentGradeEntry[]>>;
  currentStudent?: {
    id: string;
    name: string;
    section: string;
    grade: string;
  };
  currentGradingResult?: ComparativeGradingResult | null;
  onSelectStudentToView?: (student: BatchStudentGradeEntry) => void;
  onScanNextSheet?: () => void;
  onNavigateToReviewQueue?: () => void;
}

export const BatchGradingManager: React.FC<BatchGradingManagerProps> = ({
  activeKey,
  batchStudents,
  setBatchStudents,
  currentStudent,
  currentGradingResult,
  onSelectStudentToView,
  onScanNextSheet,
  onNavigateToReviewQueue
}) => {
  // Batch configuration state
  const [config, setConfig] = useState<BatchGradingExportConfig>({
    ...DEFAULT_BATCH_CONFIG,
    title: activeKey.title || DEFAULT_BATCH_CONFIG.title,
    subject: activeKey.subject || DEFAULT_BATCH_CONFIG.subject,
    students: batchStudents
  });

  const [selectedIds, setSelectedIds] = useState<string[]>(
    batchStudents.map(s => s.id)
  );
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showConfigSettings, setShowConfigSettings] = useState<boolean>(false);
  const [previewStudentSlip, setPreviewStudentSlip] = useState<BatchStudentGradeEntry | null>(null);

  // --- Google Drive Auto-Save States ---
  const [autoSyncGradingToDrive, setAutoSyncGradingToDrive] = useState<boolean>(() => {
    const saved = localStorage.getItem('boiser_auto_sync_grading_to_drive');
    return saved !== null ? saved === 'true' : true;
  });
  const [isSyncingGradingToDrive, setIsSyncingGradingToDrive] = useState<boolean>(false);
  const [gradingDriveResult, setGradingDriveResult] = useState<{
    success: boolean;
    message: string;
    webViewLink?: string;
    fileName?: string;
  } | null>(null);

  const handleToggleAutoSyncGrading = (enabled: boolean) => {
    setAutoSyncGradingToDrive(enabled);
    localStorage.setItem('boiser_auto_sync_grading_to_drive', String(enabled));
  };

  const executePushGradingToDrive = async (silent = false) => {
    const studentsToExport = batchStudents.filter(s => selectedIds.includes(s.id));
    if (studentsToExport.length === 0) {
      if (!silent) alert('Please select at least 1 student to sync to Google Drive.');
      return;
    }

    setIsSyncingGradingToDrive(true);
    try {
      const fullConfig: BatchGradingExportConfig = {
        ...config,
        title: activeKey.title,
        subject: activeKey.subject,
        answerKeyUsed: {
          id: activeKey.id,
          title: activeKey.title,
          totalItems: activeKey.totalItems,
          totalPoints: activeKey.totalPoints
        },
        students: studentsToExport
      };

      const result = await pushGradingPdfToGoogleDrive(fullConfig);
      if (result.success && result.file) {
        setGradingDriveResult({
          success: true,
          message: `✓ Auto-saved report PDF to Google Drive folder: ${BOISER_GRADING_REPORTS_FOLDER_NAME}`,
          webViewLink: result.file.webViewLink,
          fileName: result.file.name
        });
      } else {
        if (!silent) {
          setGradingDriveResult({
            success: false,
            message: result.error || 'Failed to auto-save to Google Drive.'
          });
        }
      }
    } catch (err: any) {
      if (!silent) {
        setGradingDriveResult({
          success: false,
          message: err?.message || 'Sync error'
        });
      }
    } finally {
      setIsSyncingGradingToDrive(false);
    }
  };

  // Auto-sync when roster is updated or exported if autoSyncGradingToDrive is enabled
  useEffect(() => {
    if (autoSyncGradingToDrive && batchStudents.length > 0) {
      executePushGradingToDrive(true);
    }
  }, [batchStudents.length, autoSyncGradingToDrive]);

  // Sync config students with prop changes
  React.useEffect(() => {
    setConfig(prev => ({
      ...prev,
      title: activeKey.title || prev.title,
      subject: activeKey.subject || prev.subject,
      students: batchStudents
    }));
    // If new students were added, auto-select them
    setSelectedIds(batchStudents.map(s => s.id));
  }, [batchStudents, activeKey]);

  // Handle Select All / Deselect All
  const handleToggleSelectAll = () => {
    if (selectedIds.length === batchStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(batchStudents.map(s => s.id));
    }
  };

  // Toggle individual student selection
  const handleToggleSelectStudent = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Remove student from batch
  const handleRemoveStudent = (id: string) => {
    setBatchStudents(prev => prev.filter(s => s.id !== id));
    setSelectedIds(prev => prev.filter(item => item !== id));
  };

  // Add current active student grading result to batch
  const handleAddCurrentToBatch = () => {
    if (!currentStudent || !currentGradingResult) return;
    
    const exists = batchStudents.some(s => s.id === currentStudent.id);
    const newEntry: BatchStudentGradeEntry = {
      id: currentStudent.id,
      name: currentStudent.name,
      section: currentStudent.section,
      grade: currentStudent.grade,
      gradingResult: currentGradingResult,
      evaluatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    if (exists) {
      setBatchStudents(prev => prev.map(s => s.id === currentStudent.id ? newEntry : s));
      setExportSuccess(`✓ Updated ${currentStudent.name} in batch queue!`);
    } else {
      setBatchStudents(prev => [newEntry, ...prev]);
      setSelectedIds(prev => [newEntry.id, ...prev]);
      setExportSuccess(`✓ Added ${currentStudent.name} to batch queue!`);
    }

    setTimeout(() => setExportSuccess(null), 4000);
  };

  // Generate standard class roster for quick preloading (LNNCHS Grade 11 Einstein)
  const handleLoadClassRoster = () => {
    const classRosterData: { id: string; name: string; pattern: 'high' | 'very_good' | 'average' | 'needs_work' }[] = [
      { id: "136514260001", name: "Juan Dela Cruz", pattern: 'high' },
      { id: "136514260002", name: "Maria Clara Santos", pattern: 'high' },
      { id: "136514260003", name: "Ahmed Dimaporo", pattern: 'very_good' },
      { id: "136514260004", name: "Sofia Isabella Fuentes", pattern: 'very_good' },
      { id: "136514260005", name: "Reynaldo Alonto", pattern: 'average' },
      { id: "136514260006", name: "Sittie Aisah Hadji", pattern: 'needs_work' },
      { id: "136514260007", name: "Joshua Bautista", pattern: 'very_good' },
      { id: "136514260008", name: "Fatima Macapaar", pattern: 'high' },
      { id: "136514260009", name: "Ethan Matthew Boiser", pattern: 'high' },
      { id: "136514260010", name: "Princess Sarah Macabando", pattern: 'average' }
    ];

    const generatedEntries: BatchStudentGradeEntry[] = classRosterData.map((st) => {
      const items = activeKey.items;
      const totalItems = items.length;
      const totalPoints = items.reduce((s, it) => s + (it.points || 1), 0);

      // Determine correct/incorrect based on pattern
      let targetCorrect = 0;
      if (st.pattern === 'high') targetCorrect = Math.max(totalItems - 1, Math.floor(totalItems * 0.9));
      else if (st.pattern === 'very_good') targetCorrect = Math.floor(totalItems * 0.8);
      else if (st.pattern === 'average') targetCorrect = Math.floor(totalItems * 0.7);
      else targetCorrect = Math.max(3, Math.floor(totalItems * 0.5));

      const comparisons = items.map((it, idx) => {
        const isCorrect = idx < targetCorrect;
        const studentAns = isCorrect 
          ? it.correctAnswer 
          : (it.correctAnswer === 'A' ? 'C' : it.correctAnswer === 'B' ? 'D' : 'Incomplete');
        const scoreAwarded = isCorrect ? (it.points || 1) : 0;
        
        return {
          itemNumber: it.itemNumber,
          question: it.question || `Item ${it.itemNumber}`,
          studentAnswer: studentAns,
          correctAnswer: it.correctAnswer,
          isCorrect,
          scoreAwarded,
          maxPoints: it.points || 1,
          feedback: isCorrect ? 'Demonstrated standard mastery' : 'Concept requires reinforcement'
        };
      });

      const rawScore = comparisons.reduce((sum, it) => sum + it.scoreAwarded, 0);
      const percentage = Math.round((rawScore / (totalPoints || 1)) * 100);
      const transmuted = transmuteInitialGrade(percentage);
      const qualitative = getQualitativeDescriptor(transmuted);

      const result: ComparativeGradingResult = {
        rawText: `Evaluated student answers for ${st.name}`,
        score: rawScore,
        totalItems,
        totalPoints,
        percentage,
        depedTransmutedGrade: transmuted,
        masteryLevel: `${qualitative.descriptor} (${percentage}%)`,
        comparedAgainstKey: {
          id: activeKey.id,
          title: activeKey.title,
          totalItems: activeKey.totalItems
        },
        itemComparisons: comparisons,
        summary: {
          correctCount: comparisons.filter(c => c.isCorrect).length,
          incorrectCount: comparisons.filter(c => !c.isCorrect).length,
          skippedCount: 0
        },
        feedback: {
          strengths: st.pattern === 'high' 
            ? 'Exceptional mastery across both core multiple-choice and critical identification competencies.'
            : 'Good foundational comprehension and active effort across basic learning competencies.',
          areasForImprovement: st.pattern === 'high' 
            ? 'Continue to engage with higher-order synthesis and real-world workplace application scenarios.'
            : 'Targeted remediation recommended for workplace adaptability and time management concepts.',
          corrections: 'Review items marked incorrect against official DepEd assessment rubrics.',
          suggestions: 'Participate in peer study groups and formative review sessions.',
          teacherComment: st.pattern === 'high'
            ? 'Outstanding performance! Keep up the exemplary dedication to academic excellence.'
            : st.pattern === 'very_good'
            ? 'Commendable effort. With focused review on complex items, you are on track for top honors.'
            : 'Encouraging progress. Attend the Friday remedial clinic to solidify these competencies.',
          sentiment: st.pattern === 'high' ? 'very_positive' : 'constructive'
        }
      };

      return {
        id: st.id,
        name: st.name,
        section: "Grade 11 - Einstein",
        grade: "11",
        gradingResult: result,
        evaluatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
    });

    setBatchStudents(generatedEntries);
    setSelectedIds(generatedEntries.map(e => e.id));
    setExportSuccess(`✓ Loaded LNNCHS Grade 11 Einstein class roster (${generatedEntries.length} learners)!`);
    setTimeout(() => setExportSuccess(null), 4000);
  };

  // Perform Consolidated Batch PDF Export
  const handleExportBatchPdf = () => {
    const studentsToExport = batchStudents.filter(s => selectedIds.includes(s.id));
    if (studentsToExport.length === 0) {
      alert('Please select at least 1 student to export.');
      return;
    }

    setIsExporting(true);
    setExportSuccess(null);

    setTimeout(() => {
      try {
        const fullConfig: BatchGradingExportConfig = {
          ...config,
          title: activeKey.title,
          subject: activeKey.subject,
          answerKeyUsed: {
            id: activeKey.id,
            title: activeKey.title,
            totalItems: activeKey.totalItems,
            totalPoints: activeKey.totalPoints
          },
          students: studentsToExport
        };

        const fileName = exportBatchGradingToPdf(fullConfig);
        setExportSuccess(`✓ Consolidated PDF successfully generated! Downloaded "${fileName}" (${studentsToExport.length + 1} pages total: 1 Summary Dashboard + ${studentsToExport.length} Student Result Slips).`);
      } catch (err: any) {
        console.error('Batch export error:', err);
        alert(err?.message || 'Could not complete batch PDF export.');
      } finally {
        setIsExporting(false);
      }
    }, 400);
  };

  // Export single student PDF
  const handleExportSinglePdf = (student: BatchStudentGradeEntry) => {
    try {
      const fileName = exportSingleStudentGradingPdf(student, {
        ...config,
        title: activeKey.title,
        subject: activeKey.subject
      });
      setExportSuccess(`✓ Exported individual result slip for ${student.name}!`);
      setTimeout(() => setExportSuccess(null), 4000);
    } catch (err: any) {
      console.error(err);
      alert('Could not export student slip.');
    }
  };

  // Compute live statistics for selected students
  const activeList = batchStudents.filter(s => selectedIds.includes(s.id));
  const totalCount = activeList.length;
  const rawScores = activeList.map(s => s.gradingResult.score);
  const maxPoints = activeList[0]?.gradingResult.totalPoints || 10;
  const meanRaw = totalCount > 0 ? Math.round((rawScores.reduce((a, b) => a + b, 0) / totalCount) * 10) / 10 : 0;
  const meanPct = totalCount > 0 ? Math.round((meanRaw / maxPoints) * 1000) / 10 : 0;
  const transmutedGrades = activeList.map(s => s.gradingResult.depedTransmutedGrade);
  const meanTransmuted = totalCount > 0 ? Math.round(transmutedGrades.reduce((a, b) => a + b, 0) / totalCount) : 0;
  const passingCount = activeList.filter(s => s.gradingResult.depedTransmutedGrade >= 75).length;
  const passingPct = totalCount > 0 ? Math.round((passingCount / totalCount) * 100) : 0;
  const highestScore = totalCount > 0 ? Math.max(...rawScores) : 0;
  const lowestScore = totalCount > 0 ? Math.min(...rawScores) : 0;

  // Filtered by search
  const filteredStudents = batchStudents.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.id.includes(searchQuery)
  );

  // Unreviewed low confidence items across batch queue
  const unreviewedCount = batchStudents.reduce((acc, st) => {
    const flagged = (st.gradingResult?.itemComparisons || []).filter(
      it => ((it.ocrConfidence !== undefined && it.ocrConfidence < 70) || it.needsReview) && !it.isManuallyReviewed
    ).length;
    return acc + flagged;
  }, 0);

  return (
    <div className="space-y-6">
      
      {/* ================= 1. BATCH HERO BANNER ================= */}
      <div className="bg-gradient-to-r from-[#002776] via-[#092B62] to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-[#FCD116] text-[#002776] rounded-full text-xs font-black uppercase tracking-wider font-mono shadow-xs">
                DO 3, s. 2026 Batch Assessment Suite
              </span>
              <span className="px-2.5 py-0.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-200 text-xs font-mono font-bold">
                Single Consolidated PDF File
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 border border-emerald-400/40 rounded-full text-emerald-300 text-xs font-mono font-bold">
                Summary Dashboard + Individual Slips
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
              <span>Batch Export Consolidated Grading Results</span>
            </h1>

            <p className="text-xs sm:text-sm text-blue-200 max-w-2xl leading-relaxed">
              Consolidate multiple evaluated learners into a <strong>single, print-ready PDF document</strong>. 
              <strong>Page 1 generates the official Class Summary Dashboard</strong> with statistical KPIs, mastery distribution, item error frequency, and administrative endorsement lines, followed by <strong>individual student assessment result slips</strong> with parent acknowledgment blocks.
            </p>
          </div>

          {/* Quick Actions in Banner */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5">
            <button
              onClick={handleExportBatchPdf}
              disabled={isExporting || activeList.length === 0}
              className="px-6 py-3.5 bg-[#FCD116] hover:bg-amber-300 text-[#002776] rounded-2xl text-xs font-black transition flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-95 disabled:opacity-50 whitespace-nowrap"
            >
              {isExporting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>Batch Export Consolidated PDF ({activeList.length})</span>
            </button>

            <button
              onClick={handleLoadClassRoster}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-[#FCD116]" />
              <span>Load LNNCHS Class Roster (10 Students)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Google Drive Auto-Save & Sync Card */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-[#002776] rounded-2xl p-4 sm:p-5 text-white shadow-md border border-blue-400/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-300/40 flex items-center justify-center flex-shrink-0">
            <Cloud className="w-5 h-5 text-amber-300" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white">Google Drive Auto-Save Engine</span>
              <span className="px-2 py-0.5 bg-amber-400 text-stone-900 rounded-md text-[10px] font-black uppercase">
                Folder: {BOISER_GRADING_REPORTS_FOLDER_NAME}
              </span>
            </div>
            <p className="text-xs text-blue-200">
              Automatically uploads generated student grading reports &amp; PDF slips directly to your connected Google Drive account.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          {/* Toggle */}
          <label className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 text-xs font-bold cursor-pointer hover:bg-white/15 transition">
            <input
              type="checkbox"
              checked={autoSyncGradingToDrive}
              onChange={(e) => handleToggleAutoSyncGrading(e.target.checked)}
              className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
            />
            <span>Auto-Sync Active</span>
          </label>

          {/* Manual Push Button */}
          <button
            onClick={() => executePushGradingToDrive(false)}
            disabled={isSyncingGradingToDrive || activeList.length === 0}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-900 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
          >
            {isSyncingGradingToDrive ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-stone-900" />
            ) : (
              <CloudUpload className="w-3.5 h-3.5 text-stone-900" />
            )}
            <span>{isSyncingGradingToDrive ? 'Uploading PDF...' : 'Sync to Google Drive Now'}</span>
          </button>
        </div>
      </div>

      {/* Drive Sync Feedback Alert */}
      {gradingDriveResult && (
        <div className={`p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-bold border shadow-xs animate-fade-in ${
          gradingDriveResult.success
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
            : 'bg-rose-50 border-rose-300 text-rose-900'
        }`}>
          <div className="flex items-center gap-2.5">
            {gradingDriveResult.success ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            )}
            <span>{gradingDriveResult.message}</span>
          </div>

          {gradingDriveResult.webViewLink && (
            <a
              href={gradingDriveResult.webViewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-bold transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span>View Report in Google Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      )}
      {exportSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 text-emerald-900 animate-fade-in shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="text-xs font-bold">{exportSuccess}</span>
        </div>
      )}

      {/* Current Student Ready-to-Add Banner */}
      {currentStudent && currentGradingResult && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black">
              ✓
            </div>
            <div>
              <div className="text-xs font-black text-indigo-950 uppercase">
                Active Student Result Ready to Add:
              </div>
              <div className="text-xs font-bold text-slate-800">
                {currentStudent.name} (LRN: {currentStudent.id}) • Score: {currentGradingResult.score}/{currentGradingResult.totalPoints} ({currentGradingResult.percentage}%) • Transmuted: {currentGradingResult.depedTransmutedGrade}
              </div>
            </div>
          </div>

          <button
            onClick={handleAddCurrentToBatch}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-[#FCD116]" />
            <span>Add This Student to Batch Queue</span>
          </button>
        </div>
      )}

      {/* Low-Confidence Items Alert for Batch Queue */}
      {unreviewedCount > 0 && (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-950 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-amber-900">
                {unreviewedCount} Low-Confidence Item{unreviewedCount > 1 ? 's' : ''} Awaiting Review in Batch
              </div>
              <div className="text-xs text-amber-800">
                Some student sheets in the batch queue contain handwriting flagged with OCR clarity &lt; 70%. You can review, adjust, or batch-approve all items before exporting the final PDF.
              </div>
            </div>
          </div>

          {onNavigateToReviewQueue && (
            <button
              onClick={onNavigateToReviewQueue}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer whitespace-nowrap self-start sm:self-auto"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-200" />
              <span>Open Batch OCR Review Tab →</span>
            </button>
          )}
        </div>
      )}

      {/* ================= 2. LIVE SUMMARY DASHBOARD PREVIEW (PAGE 1 PREVIEW) ================= */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-blue-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-900 font-bold">
              <School className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span>Page 1: Consolidated Class Summary Dashboard</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                  Print Preview
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Assessment: <strong>{activeKey.title}</strong> • Subject: <strong>{activeKey.subject}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowConfigSettings(!showConfigSettings)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Settings className="w-3.5 h-3.5 text-slate-500" />
            <span>{showConfigSettings ? 'Hide Parameters' : 'Edit Class & Signatory Parameters'}</span>
          </button>
        </div>

        {/* Collapsible Signatory & Class Parameters */}
        {showConfigSettings && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs animate-fade-in">
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Assessment Title:</label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Subject / Learning Area:</label>
              <input
                type="text"
                value={config.subject}
                onChange={(e) => setConfig({ ...config, subject: e.target.value })}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Grade & Section:</label>
              <input
                type="text"
                value={`${config.gradeLevel} - ${config.section}`}
                onChange={(e) => {
                  const parts = e.target.value.split('-');
                  setConfig({ 
                    ...config, 
                    gradeLevel: parts[0]?.trim() || config.gradeLevel,
                    section: parts[1]?.trim() || config.section 
                  });
                }}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Subject Teacher / Examiner:</label>
              <input
                type="text"
                value={config.teacherName}
                onChange={(e) => setConfig({ ...config, teacherName: e.target.value })}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Department Head / MT:</label>
              <input
                type="text"
                value={config.departmentHead}
                onChange={(e) => setConfig({ ...config, departmentHead: e.target.value })}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">School Head (Principal):</label>
              <input
                type="text"
                value={config.principalName}
                onChange={(e) => setConfig({ ...config, principalName: e.target.value })}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">School Year:</label>
              <input
                type="text"
                value={config.schoolYear}
                onChange={(e) => setConfig({ ...config, schoolYear: e.target.value })}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Evaluation Date:</label>
              <input
                type="text"
                value={config.dateEvaluated}
                onChange={(e) => setConfig({ ...config, dateEvaluated: e.target.value })}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800"
              />
            </div>
          </div>
        )}

        {/* 4 Statistical KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider block">
              Evaluated Learners
            </span>
            <div className="text-3xl font-black text-[#002776] my-1">
              {totalCount}
            </div>
            <span className="text-[11px] font-bold text-emerald-700 block">
              Passing: {passingPct}% ({passingCount}/{totalCount})
            </span>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider block">
              Class Mean Raw Score
            </span>
            <div className="text-3xl font-black text-emerald-900 my-1">
              {meanRaw} <span className="text-sm font-normal text-slate-500">/ {maxPoints}</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 block">
              Accuracy: {meanPct}%
            </span>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">
              Transmuted Class GWA
            </span>
            <div className="text-3xl font-black text-amber-900 my-1">
              {meanTransmuted}
            </div>
            <span className="text-[11px] font-bold text-amber-800 block">
              {meanTransmuted >= 90 ? 'Outstanding Band' : meanTransmuted >= 85 ? 'Very Satisfactory' : 'Satisfactory Band'}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
              Score Range (High / Low)
            </span>
            <div className="text-3xl font-black text-slate-800 my-1">
              {highestScore} <span className="text-sm font-normal text-slate-400">-</span> {lowestScore}
            </div>
            <span className="text-[11px] font-mono text-slate-500 block">
              {activeKey.items.length} Total Assessment Items
            </span>
          </div>
        </div>

        {/* DepEd Mastery Level Breakdown Ribbon */}
        <div className="p-3 bg-slate-100 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-black text-[#002776] uppercase text-[11px]">
            DepEd Mastery Distribution:
          </span>
          <div className="flex items-center gap-3 flex-wrap text-[11px]">
            <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 font-bold">
              Outstanding (90-100%): {activeList.filter(s => s.gradingResult.depedTransmutedGrade >= 90).length}
            </span>
            <span className="px-2 py-0.5 rounded bg-blue-200 text-blue-900 font-bold">
              Very Satisfactory (85-89%): {activeList.filter(s => s.gradingResult.depedTransmutedGrade >= 85 && s.gradingResult.depedTransmutedGrade < 90).length}
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold">
              Satisfactory (80-84%): {activeList.filter(s => s.gradingResult.depedTransmutedGrade >= 80 && s.gradingResult.depedTransmutedGrade < 85).length}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-bold">
              Below 75%: {activeList.filter(s => s.gradingResult.depedTransmutedGrade < 75).length}
            </span>
          </div>
        </div>

        {/* Item Analysis Matrix Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              Diagnostic Item Analysis (Diagnostic Error Frequency):
            </h4>
            <span className="text-[11px] text-slate-500">
              Evaluated against Answer Key: <strong>{activeKey.title}</strong>
            </span>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto max-h-48 overflow-y-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase sticky top-0 border-b border-slate-200">
                  <tr>
                    <th className="p-2.5 w-12 text-center">Item</th>
                    <th className="p-2.5">Competency / Question</th>
                    <th className="p-2.5 w-20 text-center">Correct Key</th>
                    <th className="p-2.5 w-20 text-center">Correct</th>
                    <th className="p-2.5 w-20 text-center">Errors</th>
                    <th className="p-2.5 w-24 text-center">% Mastery</th>
                    <th className="p-2.5">Formative Remediation Plan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {activeKey.items.map((it) => {
                    let correctCount = 0;
                    activeList.forEach(s => {
                      const match = s.gradingResult.itemComparisons.find(item => item.itemNumber === it.itemNumber);
                      if (match?.isCorrect) correctCount++;
                    });
                    const errorCount = totalCount - correctCount;
                    const masteryPct = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
                    
                    return (
                      <tr key={it.itemNumber} className="hover:bg-slate-50 transition">
                        <td className="p-2.5 text-center font-mono font-bold text-slate-800">{it.itemNumber}</td>
                        <td className="p-2.5 font-medium text-slate-800">{it.question || `Item ${it.itemNumber}`}</td>
                        <td className="p-2.5 text-center font-mono font-bold text-blue-900 bg-blue-50/50">{it.correctAnswer}</td>
                        <td className="p-2.5 text-center font-mono font-bold text-emerald-700">{correctCount}</td>
                        <td className="p-2.5 text-center font-mono font-bold text-red-600">{errorCount}</td>
                        <td className="p-2.5 text-center">
                          <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                            masteryPct >= 80 ? 'bg-emerald-100 text-emerald-800' :
                            masteryPct >= 60 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {masteryPct}%
                          </span>
                        </td>
                        <td className="p-2.5 text-[11px] text-slate-600">
                          {masteryPct >= 80 ? '✓ Standard Mastered' : masteryPct >= 60 ? '⚡ Reinforce in next lesson' : '⚠️ Immediate Reteaching Needed'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 3. CONSOLIDATED STUDENT ROSTER & SELECTOR ================= */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-900" />
              <span>Consolidated Batch Roster ({batchStudents.length} Students)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Select which evaluated learners to include in the consolidated PDF export.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search student or LRN..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-blue-900"
              />
            </div>

            <button
              onClick={handleToggleSelectAll}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              {selectedIds.length === batchStudents.length ? 'Deselect All' : 'Select All'}
            </button>

            <button
              onClick={() => {
                if (confirm('Clear all students from current batch queue?')) {
                  setBatchStudents([]);
                  setSelectedIds([]);
                }
              }}
              className="p-2 text-slate-400 hover:text-red-600 rounded-xl transition cursor-pointer"
              title="Clear Batch"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Student Table */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto max-h-[460px] overflow-y-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase sticky top-0 z-10 border-b border-slate-200">
                <tr>
                  <th className="p-3 w-10 text-center">
                    <input 
                      type="checkbox" 
                      checked={batchStudents.length > 0 && selectedIds.length === batchStudents.length}
                      onChange={handleToggleSelectAll}
                      className="rounded text-blue-900 focus:ring-0 cursor-pointer"
                    />
                  </th>
                  <th className="p-3 w-12 text-center">Rank</th>
                  <th className="p-3 w-32">LRN / ID</th>
                  <th className="p-3">Learner Full Name</th>
                  <th className="p-3 w-24 text-center">Raw Score</th>
                  <th className="p-3 w-16 text-center">%</th>
                  <th className="p-3 w-24 text-center">Transmuted</th>
                  <th className="p-3">Mastery Descriptor</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-slate-400">
                      No learners in batch queue. Click <strong>"Load LNNCHS Class Roster"</strong> or evaluate student sheets to populate.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((st, idx) => {
                    const isSelected = selectedIds.includes(st.id);
                    const gr = st.gradingResult;
                    return (
                      <tr 
                        key={st.id} 
                        className={`hover:bg-blue-50/40 transition ${isSelected ? 'bg-blue-50/20' : 'opacity-60'}`}
                      >
                        <td className="p-3 text-center">
                          <input 
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelectStudent(st.id)}
                            className="rounded text-blue-900 focus:ring-0 cursor-pointer"
                          />
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-slate-700">{idx + 1}</td>
                        <td className="p-3 font-mono font-bold text-blue-900">{st.id}</td>
                        <td className="p-3 font-bold text-slate-900">
                          {st.name}
                        </td>
                        <td className="p-3 text-center font-mono font-bold">
                          {gr.score} / {gr.totalPoints}
                        </td>
                        <td className="p-3 text-center font-mono text-slate-700">
                          {gr.percentage}%
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2.5 py-0.5 rounded-full font-mono font-black text-xs ${
                            gr.depedTransmutedGrade >= 90 ? 'bg-emerald-100 text-emerald-900' :
                            gr.depedTransmutedGrade >= 85 ? 'bg-blue-100 text-blue-900' :
                            gr.depedTransmutedGrade >= 75 ? 'bg-amber-100 text-amber-900' : 'bg-red-100 text-red-900'
                          }`}>
                            {gr.depedTransmutedGrade}
                          </span>
                        </td>
                        <td className="p-3 text-slate-700 font-medium">
                          {gr.masteryLevel}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setPreviewStudentSlip(st)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                              title="Preview Slip"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-600" />
                              <span>Slip</span>
                            </button>
                            <button
                              onClick={() => handleExportSinglePdf(st)}
                              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                              title="Download Individual PDF"
                            >
                              <Download className="w-3.5 h-3.5 text-blue-700" />
                              <span>PDF</span>
                            </button>
                            <button
                              onClick={() => handleRemoveStudent(st.id)}
                              className="p-1 text-slate-400 hover:text-red-600 rounded-lg transition cursor-pointer"
                              title="Remove"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Consolidated PDF Export Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            Selected for Export: <strong className="text-blue-900 font-bold">{selectedIds.length}</strong> of {batchStudents.length} learners
            • Total Pages in Consolidated PDF: <strong className="text-slate-900 font-bold">{selectedIds.length + 1}</strong> (1 Summary Dashboard + {selectedIds.length} Individual Slips)
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportBatchPdf}
              disabled={isExporting || selectedIds.length === 0}
              className="px-5 py-2.5 bg-[#002776] hover:bg-blue-900 text-white rounded-xl text-xs font-black transition flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              {isExporting ? (
                <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
              ) : (
                <Download className="w-4 h-4 text-[#FCD116]" />
              )}
              <span>Export Consolidated PDF ({selectedIds.length} Students)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= 4. INDIVIDUAL SLIP PREVIEW MODAL ================= */}
      {previewStudentSlip && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-blue-800 font-bold">Individual Slip Preview</span>
                <h3 className="text-lg font-black text-slate-900">
                  {previewStudentSlip.name} ({previewStudentSlip.id})
                </h3>
              </div>
              <button 
                onClick={() => setPreviewStudentSlip(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score Badges */}
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-3 bg-blue-50 rounded-2xl">
                <span className="text-[9px] font-bold text-blue-900 block uppercase">Raw Score</span>
                <span className="text-xl font-black text-blue-950">
                  {previewStudentSlip.gradingResult.score} / {previewStudentSlip.gradingResult.totalPoints}
                </span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl">
                <span className="text-[9px] font-bold text-emerald-900 block uppercase">Percentage</span>
                <span className="text-xl font-black text-emerald-950">
                  {previewStudentSlip.gradingResult.percentage}%
                </span>
              </div>
              <div className="p-3 bg-amber-50 rounded-2xl">
                <span className="text-[9px] font-bold text-amber-900 block uppercase">Transmuted</span>
                <span className="text-xl font-black text-amber-950">
                  {previewStudentSlip.gradingResult.depedTransmutedGrade}
                </span>
              </div>
              <div className="p-3 bg-slate-100 rounded-2xl">
                <span className="text-[9px] font-bold text-slate-700 block uppercase">Mastery</span>
                <span className="text-xs font-bold text-slate-900 block mt-1">
                  {previewStudentSlip.gradingResult.masteryLevel.split(' ')[0]}
                </span>
              </div>
            </div>

            {/* Item Breakdown & OCR Confidence Badges */}
            {previewStudentSlip.gradingResult.itemComparisons && previewStudentSlip.gradingResult.itemComparisons.length > 0 && (
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                <div className="bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 flex items-center justify-between border-b border-slate-200">
                  <span>Item Breakdown & Tesseract OCR Confidence</span>
                  {previewStudentSlip.gradingResult.meanOcrConfidence && (
                    <span className="text-[11px] font-bold text-slate-600">
                      Mean OCR: <span className="text-emerald-700 font-black">{previewStudentSlip.gradingResult.meanOcrConfidence}%</span>
                    </span>
                  )}
                </div>
                <div className="max-h-44 overflow-y-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] sticky top-0 border-b border-slate-200">
                      <tr>
                        <th className="p-2 w-12 text-center">Item</th>
                        <th className="p-2">Student Answer</th>
                        <th className="p-2">OCR Confidence</th>
                        <th className="p-2">Key</th>
                        <th className="p-2 text-center">Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {previewStudentSlip.gradingResult.itemComparisons.map((item, i) => (
                        <tr key={i} className={item.needsReview ? 'bg-amber-50/70' : item.isCorrect ? 'bg-emerald-50/20' : 'bg-rose-50/20'}>
                          <td className="p-2 text-center font-mono font-bold text-slate-900">{item.itemNumber}</td>
                          <td className="p-2 font-mono font-bold text-slate-800">{item.studentAnswer || '(No answer)'}</td>
                          <td className="p-2">
                            {item.isManuallyReviewed ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-100 text-blue-900 border border-blue-300">
                                <Check className="w-2.5 h-2.5 text-blue-700" />
                                <span>Verified</span>
                              </span>
                            ) : item.ocrConfidence !== undefined && item.ocrConfidence < 70 ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
                                <AlertTriangle className="w-2.5 h-2.5 text-rose-600" />
                                <span>{item.ocrConfidence}% Low OCR</span>
                              </span>
                            ) : item.ocrConfidence !== undefined && item.ocrConfidence < 80 ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                                <span>{item.ocrConfidence}% Fair OCR</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                                <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
                                <span>{item.ocrConfidence ?? 94}% OCR</span>
                              </span>
                            )}
                          </td>
                          <td className="p-2 font-mono text-amber-900 font-bold">{item.correctAnswer}</td>
                          <td className="p-2 text-center font-bold">
                            <span className={item.isCorrect ? 'text-emerald-700' : 'text-rose-600'}>
                              {item.scoreAwarded} / {item.maxPoints}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Pedagogical notes */}
            <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-xs">
              <div>
                <strong className="text-emerald-800">Strengths:</strong>
                <p className="text-slate-700 mt-0.5">{previewStudentSlip.gradingResult.feedback?.strengths}</p>
              </div>
              <div>
                <strong className="text-amber-800">Review Focus:</strong>
                <p className="text-slate-700 mt-0.5">{previewStudentSlip.gradingResult.feedback?.areasForImprovement}</p>
              </div>
              <div>
                <strong className="text-blue-900">Teacher's Note:</strong>
                <p className="italic text-slate-800 mt-0.5">"{previewStudentSlip.gradingResult.feedback?.teacherComment}"</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Included in batch export as Page {batchStudents.findIndex(s => s.id === previewStudentSlip.id) + 2}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExportSinglePdf(previewStudentSlip)}
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download This Slip Only</span>
                </button>
                <button
                  onClick={() => setPreviewStudentSlip(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
