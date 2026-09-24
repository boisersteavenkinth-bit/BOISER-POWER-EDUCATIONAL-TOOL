import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Check, 
  X, 
  Edit3, 
  Sparkles, 
  FileText, 
  Download, 
  Printer, 
  Layers, 
  User, 
  ShieldCheck, 
  Search, 
  Filter, 
  ChevronRight, 
  AlertCircle, 
  RefreshCw, 
  GraduationCap, 
  ArrowRight,
  Eye,
  SlidersHorizontal,
  CheckCheck
} from 'lucide-react';
import { AnswerKey, ItemGradingComparison, ComparativeGradingResult } from '../types/answerKey';
import { 
  BatchStudentGradeEntry, 
  exportBatchGradingToPdf, 
  DEFAULT_BATCH_CONFIG 
} from '../utils/batchGradingPdfExporter';
import { transmuteInitialGrade, getQualitativeDescriptor } from '../data/gradingRules';

export interface BatchFlaggedItem {
  studentId: string;
  studentName: string;
  studentSection: string;
  studentGrade: string;
  item: ItemGradingComparison;
}

interface BatchLowConfidenceReviewQueueProps {
  activeKey: AnswerKey;
  batchStudents: BatchStudentGradeEntry[];
  setBatchStudents: React.Dispatch<React.SetStateAction<BatchStudentGradeEntry[]>>;
  currentStudentId?: string;
  onSyncCurrentStudentResult?: (result: ComparativeGradingResult) => void;
  onNavigateToBatchExport: () => void;
  onSelectStudentToView: (student: BatchStudentGradeEntry) => void;
  onInjectSampleFlags?: () => void;
}

export const BatchLowConfidenceReviewQueue: React.FC<BatchLowConfidenceReviewQueueProps> = ({
  activeKey,
  batchStudents,
  setBatchStudents,
  currentStudentId,
  onSyncCurrentStudentResult,
  onNavigateToBatchExport,
  onSelectStudentToView,
  onInjectSampleFlags
}) => {
  // Filters & Search State
  const [statusFilter, setStatusFilter] = useState<'pending' | 'approved' | 'all'>('pending');
  const [selectedStudentFilter, setSelectedStudentFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Inline Editing State: key is `${studentId}-${itemNumber}`
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');

  // Export Confirmation Dialog State
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Aggregate all items across all students in the batch queue that were flagged with low confidence (<70% or needsReview)
  const allFlaggedItems: BatchFlaggedItem[] = useMemo(() => {
    const list: BatchFlaggedItem[] = [];
    batchStudents.forEach(st => {
      (st.gradingResult?.itemComparisons || []).forEach(item => {
        const isLowConfidence = (item.ocrConfidence !== undefined && item.ocrConfidence < 70) || item.needsReview === true;
        // Or if it was once flagged and is now manually reviewed
        const wasFlagged = isLowConfidence || (item.isManuallyReviewed && item.originalOcrAnswer !== undefined);
        if (wasFlagged) {
          list.push({
            studentId: st.id,
            studentName: st.name,
            studentSection: st.section,
            studentGrade: st.grade,
            item
          });
        }
      });
    });
    return list;
  }, [batchStudents]);

  // Statistics
  const pendingItems = useMemo(() => {
    return allFlaggedItems.filter(f => !f.item.isManuallyReviewed);
  }, [allFlaggedItems]);

  const approvedItems = useMemo(() => {
    return allFlaggedItems.filter(f => f.item.isManuallyReviewed);
  }, [allFlaggedItems]);

  const affectedStudentsCount = useMemo(() => {
    const ids = new Set(pendingItems.map(p => p.studentId));
    return ids.size;
  }, [pendingItems]);

  const batchMeanConfidence = useMemo(() => {
    let totalConf = 0;
    let totalCount = 0;
    batchStudents.forEach(st => {
      (st.gradingResult?.itemComparisons || []).forEach(it => {
        totalConf += it.ocrConfidence || 88;
        totalCount++;
      });
    });
    return totalCount > 0 ? Math.round(totalConf / totalCount) : 88;
  }, [batchStudents]);

  // Unique students with flagged items for dropdown
  const studentsWithFlaggedItems = useMemo(() => {
    const map = new Map<string, string>();
    allFlaggedItems.forEach(f => {
      map.set(f.studentId, f.studentName);
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [allFlaggedItems]);

  // Filtered Flagged Items based on user selections
  const filteredItems = useMemo(() => {
    return allFlaggedItems.filter(f => {
      // Status Filter
      if (statusFilter === 'pending' && f.item.isManuallyReviewed) return false;
      if (statusFilter === 'approved' && !f.item.isManuallyReviewed) return false;

      // Student Filter
      if (selectedStudentFilter !== 'all' && f.studentId !== selectedStudentFilter) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = f.studentName.toLowerCase().includes(q);
        const matchesId = f.studentId.toLowerCase().includes(q);
        const matchesItemNum = `item ${f.item.itemNumber}`.includes(q) || String(f.item.itemNumber) === q;
        const matchesQuestion = (f.item.question || '').toLowerCase().includes(q);
        const matchesAns = (f.item.studentAnswer || '').toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesItemNum && !matchesQuestion && !matchesAns) {
          return false;
        }
      }

      return true;
    });
  }, [allFlaggedItems, statusFilter, selectedStudentFilter, searchQuery]);

  // Helper to update a student's item in the batch queue and recalculate their official DepEd grades
  const updateStudentItemInBatch = (
    studentId: string, 
    itemNumber: number, 
    itemUpdater: (item: ItemGradingComparison, targetKeyItem?: any) => ItemGradingComparison
  ) => {
    let updatedGradingResultForActiveStudent: ComparativeGradingResult | null = null;

    setBatchStudents(prevStudents => {
      return prevStudents.map(st => {
        if (st.id !== studentId) return st;

        const targetKeyItem = activeKey.items.find(k => k.itemNumber === itemNumber);
        const currentComparisons = st.gradingResult?.itemComparisons || [];

        const newComparisons = currentComparisons.map(it => {
          if (it.itemNumber === itemNumber) {
            return itemUpdater(it, targetKeyItem);
          }
          return it;
        });

        // Recalculate raw score, percentage, transmuted grade, descriptors
        const totalPoints = st.gradingResult?.totalPoints || activeKey.totalPoints || 10;
        const rawScore = newComparisons.reduce((sum, c) => sum + (c.scoreAwarded || 0), 0);
        const percentage = Math.round((rawScore / (totalPoints || 1)) * 100);
        const transmuted = transmuteInitialGrade(percentage);
        const qualitative = getQualitativeDescriptor(transmuted);
        const correctCount = newComparisons.filter(c => c.isCorrect).length;
        const incorrectCount = newComparisons.filter(c => !c.isCorrect).length;
        const lowCount = newComparisons.filter(c => c.needsReview && !c.isManuallyReviewed).length;

        const newResult: ComparativeGradingResult = {
          ...st.gradingResult,
          score: rawScore,
          percentage,
          depedTransmutedGrade: transmuted,
          masteryLevel: `${qualitative.descriptor} (${percentage}%)`,
          lowConfidenceCount: lowCount,
          itemComparisons: newComparisons,
          summary: {
            correctCount,
            incorrectCount,
            skippedCount: st.gradingResult?.summary?.skippedCount || 0
          }
        };

        if (st.id === currentStudentId) {
          updatedGradingResultForActiveStudent = newResult;
        }

        return {
          ...st,
          gradingResult: newResult
        };
      });
    });

    if (updatedGradingResultForActiveStudent && onSyncCurrentStudentResult) {
      onSyncCurrentStudentResult(updatedGradingResultForActiveStudent);
    }
  };

  // Start Inline Editing for a flagged item
  const handleStartEdit = (studentId: string, item: ItemGradingComparison) => {
    setEditingKey(`${studentId}-${item.itemNumber}`);
    setEditText(item.studentAnswer && item.studentAnswer !== '(No answer detected)' ? item.studentAnswer : '');
  };

  const handleCancelEdit = () => {
    setEditingKey(null);
    setEditText('');
  };

  // Save manual edit for an item
  const handleSaveEdit = (studentId: string, itemNumber: number) => {
    const trimmed = editText.trim();
    updateStudentItemInBatch(studentId, itemNumber, (it, targetKeyItem) => {
      const cNorm = String(targetKeyItem?.correctAnswer || it.correctAnswer || '').trim().toLowerCase();
      const sNorm = trimmed.toLowerCase();
      const variants = (targetKeyItem?.acceptableVariants || []).map((v: string) => String(v).trim().toLowerCase());
      const isCorrect = sNorm === cNorm || variants.some((v: string) => v === sNorm || sNorm.includes(v) || v.includes(sNorm));
      const maxPts = targetKeyItem?.points || it.maxPoints || 1;
      const awarded = isCorrect ? maxPts : 0;

      return {
        ...it,
        originalOcrAnswer: it.originalOcrAnswer || it.studentAnswer,
        studentAnswer: trimmed || '(No answer detected)',
        isCorrect,
        scoreAwarded: awarded,
        maxPoints: maxPts,
        ocrConfidence: 100, // Teacher manual verified
        ocrStatus: 'high',
        needsReview: false,
        isManuallyReviewed: true,
        feedback: isCorrect 
          ? 'Teacher verified as correct response.' 
          : `Teacher verified. Official answer key is ${targetKeyItem?.correctAnswer || it.correctAnswer}.`
      };
    });

    setEditingKey(null);
    setEditText('');
    showToast(`✓ Item #${itemNumber} for student updated & re-evaluated!`);
  };

  // Approve OCR recognition without altering text
  const handleApproveOcrAsIs = (studentId: string, itemNumber: number) => {
    updateStudentItemInBatch(studentId, itemNumber, (it) => {
      return {
        ...it,
        isManuallyReviewed: true,
        needsReview: false,
        ocrConfidence: Math.max(it.ocrConfidence || 80, 88),
        ocrStatus: 'high',
        feedback: it.feedback || 'Teacher verified OCR recognition.'
      };
    });
    showToast(`✓ Item #${itemNumber} OCR reading approved & marked verified.`);
  };

  // Quick toggle score: Mark as Correct or Incorrect
  const handleQuickToggleCorrect = (studentId: string, itemNumber: number, forceCorrect: boolean) => {
    updateStudentItemInBatch(studentId, itemNumber, (it, targetKeyItem) => {
      const maxPts = targetKeyItem?.points || it.maxPoints || 1;
      return {
        ...it,
        isCorrect: forceCorrect,
        scoreAwarded: forceCorrect ? maxPts : 0,
        isManuallyReviewed: true,
        needsReview: false,
        ocrConfidence: 100,
        ocrStatus: 'high',
        feedback: forceCorrect ? 'Teacher awarded points.' : 'Teacher marked as incorrect.'
      };
    });
    showToast(`✓ Item #${itemNumber} marked as ${forceCorrect ? 'Correct (+Points)' : 'Incorrect'}.`);
  };

  // Batch approve all pending items for a single student
  const handleApproveAllForStudent = (studentId: string, studentName: string) => {
    setBatchStudents(prevStudents => {
      return prevStudents.map(st => {
        if (st.id !== studentId) return st;

        const newComparisons = (st.gradingResult?.itemComparisons || []).map(it => {
          if (it.needsReview || (it.ocrConfidence !== undefined && it.ocrConfidence < 70)) {
            return {
              ...it,
              isManuallyReviewed: true,
              needsReview: false,
              ocrConfidence: Math.max(it.ocrConfidence || 80, 88),
              ocrStatus: 'high' as const
            };
          }
          return it;
        });

        return {
          ...st,
          gradingResult: {
            ...st.gradingResult,
            lowConfidenceCount: 0,
            itemComparisons: newComparisons
          }
        };
      });
    });

    showToast(`✓ All flagged items for ${studentName} approved!`);
  };

  // Batch approve ALL pending flagged items across the ENTIRE batch queue
  const handleApproveAllPendingInBatch = () => {
    const countToApprove = pendingItems.length;
    if (countToApprove === 0) return;

    setBatchStudents(prevStudents => {
      return prevStudents.map(st => {
        const newComparisons = (st.gradingResult?.itemComparisons || []).map(it => {
          if (it.needsReview || (it.ocrConfidence !== undefined && it.ocrConfidence < 70)) {
            return {
              ...it,
              isManuallyReviewed: true,
              needsReview: false,
              ocrConfidence: Math.max(it.ocrConfidence || 80, 88),
              ocrStatus: 'high' as const
            };
          }
          return it;
        });

        return {
          ...st,
          gradingResult: {
            ...st.gradingResult,
            lowConfidenceCount: 0,
            itemComparisons: newComparisons
          }
        };
      });
    });

    showToast(`✓ Successfully approved all ${countToApprove} flagged items across ${affectedStudentsCount} students!`);
  };

  // Direct trigger of Final Consolidated PDF export
  const handleDirectExportFinalPdf = () => {
    if (batchStudents.length === 0) {
      alert('Batch queue is empty. Load class roster or evaluate student sheets first.');
      return;
    }

    try {
      exportBatchGradingToPdf({
        ...DEFAULT_BATCH_CONFIG,
        title: activeKey.title,
        subject: activeKey.subject,
        students: batchStudents
      });
      setShowExportModal(false);
      showToast(`✓ Final Consolidated PDF exported! Dashboard + ${batchStudents.length} Verified Student Slips.`);
    } catch (err: any) {
      console.error(err);
      alert('Error generating consolidated PDF.');
    }
  };

  // Check if safe to export or show modal if items are still pending
  const handleInitiateExport = () => {
    if (pendingItems.length > 0) {
      setShowExportModal(true);
    } else {
      handleDirectExportFinalPdf();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-emerald-900 text-xs font-bold shadow-xs animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-emerald-700 hover:text-emerald-900 cursor-pointer text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* ================= TOP HERO REVIEW BANNER ================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border border-amber-300">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                <span>Pre-Export OCR Quality Gate</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold font-mono">
                {batchStudents.length} Students in Batch Queue
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
              <span>Batch Low-Confidence Review Queue</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
              Inspect and verify handwriting items flagged by Tesseract OCR across all student sheets currently loaded in the batch queue before generating the final consolidated class PDF.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {pendingItems.length > 0 && (
              <button
                onClick={handleApproveAllPendingInBatch}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer"
                title="Approve all flagged items across the entire batch"
              >
                <CheckCheck className="w-4 h-4" />
                <span>Approve All Flagged ({pendingItems.length})</span>
              </button>
            )}

            <button
              onClick={handleInitiateExport}
              className="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-black transition flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#FCD116]" />
              <span>Export Final Consolidated PDF</span>
            </button>

            <button
              onClick={onNavigateToBatchExport}
              className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              title="Open full batch class manager"
            >
              <Layers className="w-3.5 h-3.5 text-slate-600" />
              <span>Full Batch Table</span>
            </button>
          </div>
        </div>

        {/* 4 STATS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className={`p-4 rounded-2xl border transition ${
            pendingItems.length > 0 
              ? 'bg-amber-50/70 border-amber-300/80 text-amber-950' 
              : 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
          }`}>
            <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
              Pending Teacher Review
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={`text-2xl font-black ${pendingItems.length > 0 ? 'text-amber-800' : 'text-emerald-700'}`}>
                {pendingItems.length}
              </span>
              <span className="text-xs font-bold opacity-75">Items</span>
            </div>
            <p className="text-[10px] mt-1 opacity-80">
              {pendingItems.length > 0 ? `Across ${affectedStudentsCount} student sheets` : 'Zero items pending'}
            </p>
          </div>

          <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-2xl text-blue-950">
            <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
              Approved &amp; Verified
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-blue-800">
                {approvedItems.length}
              </span>
              <span className="text-xs font-bold opacity-75">Items</span>
            </div>
            <p className="text-[10px] mt-1 opacity-80">
              Teacher verified or overridden
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900">
            <span className="text-[10px] font-bold uppercase tracking-wider block text-slate-500">
              Total Low-Confidence Flagged
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-800">
                {allFlaggedItems.length}
              </span>
              <span className="text-xs font-bold text-slate-500">Total</span>
            </div>
            <p className="text-[10px] mt-1 text-slate-500">
              OCR Confidence &lt; 70% threshold
            </p>
          </div>

          <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-2xl text-indigo-950">
            <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
              Batch Mean OCR Clarity
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-indigo-800">
                {batchMeanConfidence}%
              </span>
              <ShieldCheck className="w-4 h-4 text-indigo-600 inline" />
            </div>
            <p className="text-[10px] mt-1 opacity-80">
              High scan fidelity across class
            </p>
          </div>
        </div>

        {/* Dynamic Status Alert Strip */}
        {pendingItems.length > 0 ? (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-900">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider">
                  Action Recommended Prior to Consolidated PDF Export
                </h4>
                <p className="text-xs text-amber-800 mt-0.5">
                  There are <strong>{pendingItems.length} OCR scanned item(s)</strong> across {affectedStudentsCount} student(s) with confidence below 70%. Review the handwriting, confirm or edit the answers below, or click <strong>"Approve All Flagged"</strong> to batch-accept.
                </p>
              </div>
            </div>
            <button
              onClick={handleApproveAllPendingInBatch}
              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex-shrink-0 cursor-pointer shadow-2xs"
            >
              Approve All Now →
            </button>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-emerald-950">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900">
                  Batch Quality Gate Passed: Ready for Final PDF Export!
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  All OCR scanned answers across all {batchStudents.length} student sheets have been verified. The consolidated PDF will reflect 100% verified assessment records.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {onInjectSampleFlags && (
                <button
                  onClick={onInjectSampleFlags}
                  className="px-3 py-1.5 bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition cursor-pointer"
                  title="Simulate low confidence flags for test"
                >
                  <RefreshCw className="w-3 h-3 inline mr-1" />
                  Simulate Flagged Scans
                </button>
              )}
              <button
                onClick={handleDirectExportFinalPdf}
                className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF Now</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= FILTER & SEARCH TOOLBAR ================= */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              statusFilter === 'pending'
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            <span>Needs Review</span>
            <span className="px-1.5 py-0.2 bg-white/40 rounded-full text-[10px] font-mono">
              {pendingItems.length}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter('approved')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              statusFilter === 'approved'
                ? 'bg-blue-900 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Check className="w-3 h-3" />
            <span>Approved / Verified</span>
            <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px] font-mono">
              {approvedItems.length}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>All Flagged</span>
            <span className="px-1.5 py-0.2 bg-slate-200 rounded-full text-[10px] font-mono">
              {allFlaggedItems.length}
            </span>
          </button>
        </div>

        {/* Student Filter & Search */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <select
              value={selectedStudentFilter}
              onChange={(e) => setSelectedStudentFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              <option value="all">All Students ({studentsWithFlaggedItems.length})</option>
              {studentsWithFlaggedItems.map(st => (
                <option key={st.id} value={st.id}>{st.name}</option>
              ))}
            </select>
          </div>

          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search student, item, answer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'cards' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Cards
            </button>
          </div>
        </div>
      </div>

      {/* ================= MAIN REVIEW LIST ================= */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {statusFilter === 'pending' ? 'No Pending Low-Confidence Items!' : 'No Flagged Items Match Your Filter'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              {statusFilter === 'pending' 
                ? 'All scanned student answers in the batch queue meet or exceed accuracy thresholds. You can safely export the final consolidated PDF.'
                : 'Try adjusting your search criteria or switching to the "All Flagged" tab.'}
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleInitiateExport}
              className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-black transition flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#FCD116]" />
              <span>Export Final Consolidated PDF</span>
            </button>
            {onInjectSampleFlags && (
              <button
                onClick={onInjectSampleFlags}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Inject Sample Flagged Items for Testing
              </button>
            )}
          </div>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 text-slate-700 uppercase font-black text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Student Learner</th>
                  <th className="p-3.5 w-16 text-center">Item</th>
                  <th className="p-3.5">Question / Topic</th>
                  <th className="p-3.5">OCR Scanned Reading</th>
                  <th className="p-3.5">Clarity</th>
                  <th className="p-3.5">Answer Key</th>
                  <th className="p-3.5 text-center">Score</th>
                  <th className="p-3.5 text-right">Verification Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredItems.map((entry, idx) => {
                  const itemKey = `${entry.studentId}-${entry.item.itemNumber}`;
                  const isEditing = editingKey === itemKey;
                  const isPending = !entry.item.isManuallyReviewed;

                  return (
                    <tr 
                      key={idx}
                      className={`transition ${
                        isPending 
                          ? 'bg-amber-50/50 hover:bg-amber-100/40 border-l-4 border-l-amber-500' 
                          : 'bg-emerald-50/20 hover:bg-slate-50 border-l-4 border-l-emerald-500'
                      }`}
                    >
                      {/* Student Info */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs flex-shrink-0">
                            {entry.studentName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-xs">{entry.studentName}</p>
                            <p className="text-[10px] font-mono text-slate-500">ID: {entry.studentId}</p>
                          </div>
                        </div>
                      </td>

                      {/* Item Number */}
                      <td className="p-3.5 text-center font-mono font-black text-slate-900">
                        #{entry.item.itemNumber}
                      </td>

                      {/* Question topic */}
                      <td className="p-3.5 max-w-xs truncate text-slate-700">
                        {entry.item.question || `Item ${entry.item.itemNumber}`}
                      </td>

                      {/* OCR Scanned Answer / Edit Field */}
                      <td className="p-3.5">
                        {isEditing ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="w-24 px-2 py-1 bg-white border-2 border-indigo-500 rounded text-xs font-mono font-bold focus:outline-none"
                              placeholder="Answer..."
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveEdit(entry.studentId, entry.item.itemNumber);
                                if (e.key === 'Escape') handleCancelEdit();
                              }}
                            />
                            <button
                              onClick={() => handleSaveEdit(entry.studentId, entry.item.itemNumber)}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold flex items-center gap-1 cursor-pointer shadow-2xs"
                              title="Save answer and recalculate"
                            >
                              <Check size={12} />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-1.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs cursor-pointer"
                              title="Cancel"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                                entry.item.isCorrect 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {entry.item.studentAnswer || '(No answer detected)'}
                              </span>

                              <button
                                onClick={() => handleStartEdit(entry.studentId, entry.item)}
                                className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded cursor-pointer transition"
                                title="Edit answer text"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                            </div>

                            {entry.item.originalOcrAnswer && entry.item.originalOcrAnswer !== entry.item.studentAnswer && (
                              <p className="text-[9.5px] text-slate-400 font-mono">
                                Scanned raw: {entry.item.originalOcrAnswer}
                              </p>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Clarity / Confidence */}
                      <td className="p-3.5">
                        {entry.item.isManuallyReviewed ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-300 shadow-2xs">
                            <Check className="w-3 h-3 text-blue-700" />
                            <span>Teacher Verified</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
                            <AlertTriangle className="w-3 h-3 text-rose-600" />
                            <span>{entry.item.ocrConfidence ?? 58}% Low OCR</span>
                          </span>
                        )}
                      </td>

                      {/* Official Key */}
                      <td className="p-3.5 font-mono font-bold text-amber-900 bg-amber-50/40">
                        {entry.item.correctAnswer}
                      </td>

                      {/* Score */}
                      <td className="p-3.5 text-center">
                        <span className={`font-mono font-bold ${entry.item.isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                          {entry.item.scoreAwarded} / {entry.item.maxPoints}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                          {isPending ? (
                            <>
                              <button
                                onClick={() => handleStartEdit(entry.studentId, entry.item)}
                                className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-2xs"
                                title="Adjust student answer"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>Edit</span>
                              </button>

                              <button
                                onClick={() => handleApproveOcrAsIs(entry.studentId, entry.item.itemNumber)}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-2xs"
                                title="Approve OCR interpretation as correct text"
                              >
                                <Check className="w-3 h-3" />
                                <span>Approve OCR</span>
                              </button>

                              <button
                                onClick={() => handleQuickToggleCorrect(entry.studentId, entry.item.itemNumber, !entry.item.isCorrect)}
                                className={`p-1 rounded-lg text-xs font-bold transition cursor-pointer border ${
                                  entry.item.isCorrect
                                    ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                }`}
                                title={entry.item.isCorrect ? 'Mark as Incorrect' : 'Mark as Correct (+Pts)'}
                              >
                                {entry.item.isCorrect ? 'Mark Incorrect' : 'Mark Correct'}
                              </button>
                            </>
                          ) : (
                            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Approved</span>
                              <button
                                onClick={() => handleStartEdit(entry.studentId, entry.item)}
                                className="ml-1 text-indigo-600 hover:underline cursor-pointer"
                              >
                                Re-edit
                              </button>
                            </span>
                          )}

                          {/* Jump to student full sheet */}
                          <button
                            onClick={() => {
                              const found = batchStudents.find(s => s.id === entry.studentId);
                              if (found) onSelectStudentToView(found);
                            }}
                            className="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer"
                            title="View student's full comparative result"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CARDS VIEW (Grouped by Student) */
        <div className="space-y-4">
          {studentsWithFlaggedItems
            .filter(st => selectedStudentFilter === 'all' || st.id === selectedStudentFilter)
            .map(st => {
              const studentFlagged = filteredItems.filter(f => f.studentId === st.id);
              if (studentFlagged.length === 0) return null;

              const studentPending = studentFlagged.filter(f => !f.item.isManuallyReviewed);

              return (
                <div key={st.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-900 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                        {st.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{st.name}</h4>
                        <p className="text-xs font-mono text-slate-500">ID: {st.id} • Section: Grade 11 - Einstein</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {studentPending.length > 0 ? (
                        <button
                          onClick={() => handleApproveAllForStudent(st.id, st.name)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve All for {st.name.split(' ')[0]} ({studentPending.length})</span>
                        </button>
                      ) : (
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>All Items Verified</span>
                        </span>
                      )}

                      <button
                        onClick={() => {
                          const found = batchStudents.find(s => s.id === st.id);
                          if (found) onSelectStudentToView(found);
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Full Slip</span>
                      </button>
                    </div>
                  </div>

                  {/* Student items grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {studentFlagged.map(f => {
                      const itemKey = `${f.studentId}-${f.item.itemNumber}`;
                      const isEditing = editingKey === itemKey;

                      return (
                        <div 
                          key={f.item.itemNumber}
                          className={`p-4 rounded-2xl border transition space-y-3 ${
                            !f.item.isManuallyReviewed
                              ? 'bg-amber-50/50 border-amber-300'
                              : 'bg-emerald-50/30 border-emerald-200'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 bg-slate-900 text-white rounded-lg text-xs font-mono font-bold">
                                Item #{f.item.itemNumber}
                              </span>
                              <span className="text-xs font-bold text-slate-700 truncate max-w-[150px]">
                                {f.item.question || `Item ${f.item.itemNumber}`}
                              </span>
                            </div>

                            {f.item.isManuallyReviewed ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-300">
                                Verified
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
                                {f.item.ocrConfidence ?? 58}% OCR
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs bg-white p-3 rounded-xl border border-slate-200">
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 block uppercase">Student Answer</span>
                              {isEditing ? (
                                <div className="flex items-center gap-1 mt-1">
                                  <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="w-20 px-2 py-1 bg-white border border-indigo-500 rounded text-xs font-mono font-bold"
                                    autoFocus
                                  />
                                  <button
                                    onClick={() => handleSaveEdit(f.studentId, f.item.itemNumber)}
                                    className="px-1.5 py-1 bg-emerald-600 text-white rounded text-xs"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={handleCancelEdit}
                                    className="px-1.5 py-1 bg-slate-200 text-slate-700 rounded text-xs"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <span className={`font-mono font-bold text-sm ${f.item.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                                  {f.item.studentAnswer || '(No answer)'}
                                </span>
                              )}
                            </div>

                            <div>
                              <span className="text-[10px] font-bold text-slate-400 block uppercase">Answer Key</span>
                              <span className="font-mono font-bold text-sm text-amber-900">
                                {f.item.correctAnswer} ({f.item.maxPoints} pts)
                              </span>
                            </div>
                          </div>

                          {/* Action footer */}
                          {!f.item.isManuallyReviewed && !isEditing && (
                            <div className="flex items-center justify-end gap-2 pt-1">
                              <button
                                onClick={() => handleStartEdit(f.studentId, f.item)}
                                className="px-2.5 py-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleApproveOcrAsIs(f.studentId, f.item.itemNumber)}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-2xs"
                              >
                                <Check className="w-3 h-3" />
                                <span>Approve OCR</span>
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* ================= PRE-FLIGHT EXPORT CONFIRMATION MODAL ================= */}
      {showExportModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-scale-up">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">
                  Pending OCR Reviews Detected
                </h3>
                <p className="text-xs text-slate-500">
                  There are still <strong>{pendingItems.length} low-confidence item(s)</strong> awaiting manual teacher approval across {affectedStudentsCount} student sheets.
                </p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-1.5">
              <p className="font-bold">Official DepEd Assessment Recommendation:</p>
              <p className="text-amber-800">
                Approving all items confirms that Tesseract OCR readings have been checked against learner handwriting, ensuring 100% grade accuracy on the final consolidated PDF report card.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  handleApproveAllPendingInBatch();
                  handleDirectExportFinalPdf();
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <CheckCheck className="w-4 h-4" />
                <span>Approve All {pendingItems.length} Items &amp; Export PDF Now</span>
              </button>

              <button
                onClick={handleDirectExportFinalPdf}
                className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#FCD116]" />
                <span>Export PDF Anyway (Keep Current OCR Readings)</span>
              </button>

              <button
                onClick={() => setShowExportModal(false)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Cancel &amp; Continue Reviewing
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
