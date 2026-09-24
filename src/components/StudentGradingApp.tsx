import React, { useState, useRef, useEffect, useMemo } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, 
  Barcode, 
  FileText, 
  CheckCircle2, 
  Camera, 
  RefreshCw, 
  Upload, 
  User, 
  BookOpen, 
  GraduationCap,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Check,
  ShieldCheck,
  Filter,
  Search,
  Sparkles,
  ChevronRight,
  Download,
  Settings,
  Key,
  FileCheck,
  FileSpreadsheet,
  X,
  Plus,
  Trash2,
  Edit3,
  Eye,
  Printer,
  Award,
  HelpCircle,
  ArrowRight,
  Layers,
  FileDown,
  BarChart2,
  TrendingUp,
  Copy
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Cell
} from 'recharts';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Tesseract from 'tesseract.js';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AnswerKey, 
  AnswerKeyItem, 
  ItemGradingComparison,
  ComparativeGradingResult, 
  SAMPLE_ANSWER_KEYS 
} from '../types/answerKey';
import { BatchGradingManager } from './BatchGradingManager';
import { BatchLowConfidenceReviewQueue } from './BatchLowConfidenceReviewQueue';
import { 
  BatchStudentGradeEntry, 
  exportSingleStudentGradingPdf, 
  exportBatchGradingToPdf,
  DEFAULT_BATCH_CONFIG 
} from '../utils/batchGradingPdfExporter';
import { transmuteInitialGrade, getQualitativeDescriptor } from '../data/gradingRules';

// === TYPES ===
interface Student {
  id: string;
  name: string;
  section: string;
  grade: string;
}

export const StudentGradingApp: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'key' | 'sheet' | 'grading' | 'batch' | 'review' | 'qr' | 'barcode'>('key');
  const [student, setStudent] = useState<Student>({
    id: "136514260001",
    name: "Juan Dela Cruz",
    section: "Grade 11 - Einstein",
    grade: "11"
  });
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [batchToast, setBatchToast] = useState<string | null>(null);

  // Initialize batch roster with realistic starter class entries (Grade 11 Einstein)
  const [batchStudents, setBatchStudents] = useState<BatchStudentGradeEntry[]>(() => {
    const defaultKey = SAMPLE_ANSWER_KEYS[0];
    const initialRoster: { id: string; name: string; pattern: 'high' | 'very_good' | 'average' | 'needs_work' }[] = [
      { id: "136514260001", name: "Juan Dela Cruz", pattern: 'high' },
      { id: "136514260002", name: "Maria Clara Santos", pattern: 'high' },
      { id: "136514260003", name: "Ahmed Dimaporo", pattern: 'very_good' },
      { id: "136514260004", name: "Sofia Isabella Fuentes", pattern: 'very_good' },
      { id: "136514260005", name: "Reynaldo Alonto", pattern: 'average' },
      { id: "136514260006", name: "Sittie Aisah Hadji", pattern: 'needs_work' },
      { id: "136514260007", name: "Joshua Bautista", pattern: 'very_good' },
      { id: "136514260008", name: "Fatima Macapaar", pattern: 'high' }
    ];

    return initialRoster.map(st => {
      const items = defaultKey.items;
      const totalItems = items.length;
      const totalPoints = items.reduce((s, it) => s + (it.points || 1), 0);
      let targetCorrect = 9;
      if (st.pattern === 'very_good') targetCorrect = 8;
      else if (st.pattern === 'average') targetCorrect = 7;
      else if (st.pattern === 'needs_work') targetCorrect = 5;

      const comparisons = items.map((it, idx) => {
        const isCorrect = idx < targetCorrect;
        let studentAns = isCorrect ? it.correctAnswer : (it.correctAnswer === 'A' ? 'C' : 'B');
        let ocrConf = 88 + ((idx * 3 + st.id.charCodeAt(st.id.length - 1)) % 10);
        let needsReview = false;
        let ocrStatus: 'high' | 'medium' | 'low' = 'high';
        let originalOcrAnswer: string | undefined = undefined;

        // Realistic OCR handwriting ambiguities in the batch queue:
        if (st.id === "136514260006" && it.itemNumber === 4) {
          // Sittie Aisah Hadji: Item 4 (54% faint handwriting)
          ocrConf = 54;
          needsReview = true;
          ocrStatus = 'low';
          studentAns = 'D';
          originalOcrAnswer = 'D (faint cursive loop)';
        } else if (st.id === "136514260006" && it.itemNumber === 7) {
          // Sittie Aisah Hadji: Item 7 (62% pencil smudge)
          ocrConf = 62;
          needsReview = true;
          ocrStatus = 'low';
          studentAns = 'B';
          originalOcrAnswer = 'B (pencil smudge)';
        } else if (st.id === "136514260005" && it.itemNumber === 3) {
          // Reynaldo Alonto: Item 3 (58% ambiguous slanted stroke)
          ocrConf = 58;
          needsReview = true;
          ocrStatus = 'low';
          studentAns = 'A';
          originalOcrAnswer = 'A (slanted letter)';
        } else if (st.id === "136514260004" && it.itemNumber === 6) {
          // Sofia Isabella Fuentes: Item 6 (64% erased prior mark)
          ocrConf = 64;
          needsReview = true;
          ocrStatus = 'low';
          studentAns = 'C';
          originalOcrAnswer = 'C (erased prior mark)';
        } else if (st.id === "136514260003" && it.itemNumber === 8) {
          // Ahmed Dimaporo: Item 8 (56% light pencil)
          ocrConf = 56;
          needsReview = true;
          ocrStatus = 'low';
          studentAns = 'B';
          originalOcrAnswer = 'B (light pencil stroke)';
        }

        return {
          itemNumber: it.itemNumber,
          question: it.question || `Item ${it.itemNumber}`,
          studentAnswer: studentAns,
          correctAnswer: it.correctAnswer,
          isCorrect,
          scoreAwarded: isCorrect ? (it.points || 1) : 0,
          maxPoints: it.points || 1,
          feedback: isCorrect ? 'Demonstrated standard competency' : 'Requires targeted reinforcement',
          ocrConfidence: ocrConf,
          ocrStatus,
          needsReview,
          originalOcrAnswer,
          isManuallyReviewed: false
        };
      });

      const rawScore = comparisons.reduce((s, it) => s + it.scoreAwarded, 0);
      const percentage = Math.round((rawScore / totalPoints) * 100);
      const transmuted = transmuteInitialGrade(percentage);
      const qualitative = getQualitativeDescriptor(transmuted);
      const meanConf = Math.round(comparisons.reduce((s, it) => s + (it.ocrConfidence || 85), 0) / comparisons.length);
      const lowCount = comparisons.filter(c => c.needsReview && !c.isManuallyReviewed).length;

      return {
        id: st.id,
        name: st.name,
        section: "Grade 11 - Einstein",
        grade: "11",
        evaluatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        gradingResult: {
          rawText: `Sample answers evaluated for ${st.name}`,
          score: rawScore,
          totalItems,
          totalPoints,
          percentage,
          depedTransmutedGrade: transmuted,
          masteryLevel: `${qualitative.descriptor} (${percentage}%)`,
          meanOcrConfidence: meanConf,
          lowConfidenceCount: lowCount,
          comparedAgainstKey: {
            id: defaultKey.id,
            title: defaultKey.title,
            totalItems: defaultKey.totalItems
          },
          itemComparisons: comparisons,
          summary: {
            correctCount: comparisons.filter(c => c.isCorrect).length,
            incorrectCount: comparisons.filter(c => !c.isCorrect).length,
            skippedCount: 0
          },
          feedback: {
            strengths: st.pattern === 'high' 
              ? 'Outstanding grasp of foundational concepts in workplace adaptability and self-direction.'
              : 'Consistent participation and basic mastery of key core competencies.',
            areasForImprovement: st.pattern === 'high' 
              ? 'Further explore higher-order synthesis and real-world ethical problem solving.'
              : 'Needs targeted review of time management techniques and adaptability scenarios.',
            corrections: 'Review items against the official DepEd rubrics.',
            suggestions: 'Engage in collaborative peer problem solving and remedial learning modules.',
            teacherComment: st.pattern === 'high' 
              ? 'Exceptional academic engagement and performance!' 
              : 'Good foundational effort. Consistent practice will yield higher mastery.',
            sentiment: 'positive'
          }
        }
      };
    });
  });

  // Active Answer Key State (Preloaded with Life & Career Skills Exemplar)
  const [activeKey, setActiveKey] = useState<AnswerKey>(SAMPLE_ANSWER_KEYS[0]);
  const [isUploadingKey, setIsUploadingKey] = useState<boolean>(false);
  const [keyUploadProgress, setKeyUploadProgress] = useState<number>(0);
  const [keyUploadStatus, setKeyUploadStatus] = useState<string>('');
  const [keyFileName, setKeyFileName] = useState<string | null>(null);
  const [keyFilePreview, setKeyFilePreview] = useState<string | null>(null);

  // Sheet Scan & Grading State
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [ocrProgress, setOcrProgress] = useState<number>(0);
  const [ocrStatus, setOcrStatus] = useState<string>('Initializing OCR...');
  const [studentAnswerText, setStudentAnswerText] = useState<string>('');
  const [gradingResult, setGradingResult] = useState<ComparativeGradingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState<boolean>(false);

  // OCR Confidence & Manual Review States
  const [confidenceFilter, setConfidenceFilter] = useState<'all' | 'needs_review' | 'high_confidence'>('all');
  const [editingItemNumber, setEditingItemNumber] = useState<number | null>(null);
  const [editAnswerInput, setEditAnswerInput] = useState<string>('');
  const [chartView, setChartView] = useState<'overall' | 'item_by_item'>('overall');

  // Calculate Class Statistics across batch roster
  const classStats = useMemo(() => {
    if (!batchStudents || batchStudents.length === 0) {
      return {
        avgScore: 7.8,
        avgPercentage: 78,
        highestScore: 10,
        lowestScore: 5,
        totalStudents: 1,
        itemAccuracy: {} as Record<number, number>
      };
    }

    const scores = batchStudents.map(s => s.gradingResult?.score ?? 0);
    const percentages = batchStudents.map(s => s.gradingResult?.percentage ?? 0);
    const sumScores = scores.reduce((a, b) => a + b, 0);
    const sumPercentages = percentages.reduce((a, b) => a + b, 0);
    const avgScore = Number((sumScores / scores.length).toFixed(1));
    const avgPercentage = Math.round(sumPercentages / percentages.length);
    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);

    // Compute item accuracy across all batch students
    const itemCounts: Record<number, { correct: number; total: number }> = {};
    batchStudents.forEach(st => {
      (st.gradingResult?.itemComparisons || []).forEach(it => {
        if (!itemCounts[it.itemNumber]) {
          itemCounts[it.itemNumber] = { correct: 0, total: 0 };
        }
        itemCounts[it.itemNumber].total += 1;
        if (it.isCorrect) {
          itemCounts[it.itemNumber].correct += 1;
        }
      });
    });

    const itemAccuracy: Record<number, number> = {};
    Object.keys(itemCounts).forEach(numStr => {
      const num = Number(numStr);
      const { correct, total } = itemCounts[num];
      itemAccuracy[num] = total > 0 ? Math.round((correct / total) * 100) : 75;
    });

    return {
      avgScore,
      avgPercentage,
      highestScore,
      lowestScore,
      totalStudents: batchStudents.length,
      itemAccuracy
    };
  }, [batchStudents]);

  // Chart Dataset 1: Overall Performance Metrics Comparison
  const overallMetricsChartData = useMemo(() => {
    if (!gradingResult) return [];
    return [
      {
        category: 'Raw Score (Pts)',
        Student: gradingResult.score,
        ClassAvg: classStats.avgScore,
        ClassHigh: classStats.highestScore,
        MaxPossible: gradingResult.totalPoints
      },
      {
        category: 'Percentage (%)',
        Student: gradingResult.percentage,
        ClassAvg: classStats.avgPercentage,
        ClassHigh: 100,
        MaxPossible: 100
      },
      {
        category: 'DepEd Transmuted Grade',
        Student: gradingResult.depedTransmutedGrade,
        ClassAvg: Math.round(transmuteInitialGrade(classStats.avgPercentage)),
        ClassHigh: 100,
        MaxPossible: 100
      }
    ];
  }, [gradingResult, classStats]);

  // Chart Dataset 2: Item-by-Item Score & Class Average Accuracy
  const itemAccuracyChartData = useMemo(() => {
    if (!gradingResult) return [];
    return gradingResult.itemComparisons.map(item => {
      const classAcc = classStats.itemAccuracy[item.itemNumber] ?? (item.isCorrect ? 85 : 45);
      const studentScorePct = item.isCorrect ? 100 : 0;
      return {
        itemLabel: `Item ${item.itemNumber}`,
        shortLabel: `#${item.itemNumber}`,
        StudentScore: studentScorePct,
        ClassAvgAccuracy: classAcc,
        isCorrect: item.isCorrect,
        rawStudentPoints: item.scoreAwarded,
        maxPoints: item.maxPoints
      };
    });
  }, [gradingResult, classStats]);

  // QR/Barcode Scanner Ref
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const answerKeyFileInputRef = useRef<HTMLInputElement | null>(null);
  const studentSheetFileInputRef = useRef<HTMLInputElement | null>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, [activeModule]);

  // Generate QR code for physical scan recording when grading results are active
  useEffect(() => {
    if (activeModule === 'grading' && gradingResult && qrCanvasRef.current) {
      const payload = JSON.stringify({
        sys: "LNNCHS-GRADING",
        id: student.id,
        name: student.name,
        section: student.section,
        subject: activeKey.subject,
        score: gradingResult.score,
        total: gradingResult.totalPoints,
        pct: gradingResult.percentage,
        transmuted: gradingResult.depedTransmutedGrade,
        mastery: gradingResult.masteryLevel
      });
      QRCode.toCanvas(qrCanvasRef.current, payload, {
        width: 180,
        margin: 2,
        color: {
          dark: '#002776',
          light: '#FFFFFF'
        }
      }, (err) => {
        if (err) console.error("QR Code generation error:", err);
      });
    }
  }, [activeModule, gradingResult, student, activeKey]);

  const handleIdScanSuccess = (decodedText: string) => {
    setScannedData(decodedText);
    setStudent({
      id: decodedText,
      name: "Juan Dela Cruz",
      section: "Grade 11 - Einstein",
      grade: "11"
    });
    if (scannerRef.current) {
      scannerRef.current.clear();
    }
  };

  const startIdScanner = (module: 'qr' | 'barcode') => {
    setActiveModule(module);
    setScannedData(null);

    setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );
      scanner.render(handleIdScanSuccess, (err) => {
        // scanner frame error handling
      });
      scannerRef.current = scanner;
    }, 100);
  };

  // Convert File to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Handle Answer Key File Upload (Image or PDF)
  const handleAnswerKeyUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingKey(true);
    setKeyUploadProgress(15);
    setKeyUploadStatus(`Loading ${file.name}...`);
    setError(null);
    setKeyFileName(file.name);

    try {
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      const base64Data = await fileToBase64(file);
      
      if (!isPdf) {
        setKeyFilePreview(base64Data);
      } else {
        setKeyFilePreview(null);
      }

      setKeyUploadProgress(40);
      setKeyUploadStatus(isPdf ? 'Analyzing PDF with Gemini multimodal vision...' : 'Running optical recognition on answer key...');

      // If it's an image, also extract text via Tesseract client-side as fallback
      let clientOcrText = '';
      if (!isPdf) {
        try {
          const tResult = await Tesseract.recognize(file, 'eng', {
            logger: m => {
              if (m.status === 'recognizing text' && typeof m.progress === 'number') {
                setKeyUploadProgress(Math.round(40 + m.progress * 40));
              }
            }
          });
          clientOcrText = tResult.data.text;
        } catch (tErr) {
          console.warn('Tesseract fallback extraction note:', tErr);
        }
      } else {
        setKeyUploadProgress(70);
      }

      setKeyUploadStatus('Structuring question items & points...');
      setKeyUploadProgress(85);

      // Send to server to parse with Gemini 3.8 Flash or deterministic engine
      const response = await fetch('/api/grading/parse-answer-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileData: base64Data,
          mimeType: file.type || (isPdf ? 'application/pdf' : 'image/jpeg'),
          fileName: file.name,
          rawText: clientOcrText
        })
      });

      const data = await response.json();

      if (data.success && data.answerKey) {
        setActiveKey(data.answerKey);
        setKeyUploadProgress(100);
        setKeyUploadStatus('Answer key successfully loaded and active!');
        setTimeout(() => setIsUploadingKey(false), 800);
      } else {
        throw new Error(data.error || 'Unable to parse answer key.');
      }
    } catch (err: any) {
      console.error('Answer key upload error:', err);
      setError(err?.message || 'Failed to parse answer key. Please ensure file is clear.');
      setIsUploadingKey(false);
    }
  };

  // Handle Student Sheet Upload (Image or PDF)
  const handleStudentSheetUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setOcrProgress(15);
    setOcrStatus(`Reading student submission: ${file.name}...`);
    setError(null);

    try {
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      const base64Data = await fileToBase64(file);
      let detectedText = '';
      const itemConfidenceMap: Record<number, number> = {};

      if (!isPdf) {
        // Tesseract image recognition with line-level extraction confidence
        const tResult = await Tesseract.recognize(file, 'eng', {
          logger: m => {
            if (m.status && typeof m.progress === 'number') {
              setOcrProgress(Math.max(20, Math.round(m.progress * 80)));
              setOcrStatus(`Scanning handwriting (${Math.round(m.progress * 100)}%)...`);
            }
          }
        });
        detectedText = tResult?.data?.text || '';

        // Extract confidence per item from scanned lines
        const dataAny = tResult?.data as any;
        if (dataAny?.lines && Array.isArray(dataAny.lines)) {
          dataAny.lines.forEach((line: any) => {
            const match = line.text?.match(/^(?:item\s*)?(\d+)[\.\)\:\-\s]+/i);
            if (match) {
              const num = parseInt(match[1], 10);
              itemConfidenceMap[num] = Math.round(line.confidence || dataAny.confidence || 85);
            }
          });
        }
      } else {
        setOcrProgress(60);
        setOcrStatus('Processing student PDF document...');
        detectedText = `Student PDF: ${file.name}`;
      }

      setStudentAnswerText(detectedText);
      setOcrProgress(90);
      setOcrStatus(`Cross-referencing against Answer Key: "${activeKey.title}"...`);

      // Grade against the active uploaded answer key
      await performEvaluation(detectedText, itemConfidenceMap);
      setOcrProgress(100);
      setActiveModule('grading');
    } catch (err: any) {
      console.error('Sheet upload error:', err);
      setError('Failed to scan student answer sheet. Please ensure high clarity.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Evaluate Student Answers against Uploaded Answer Key
  const performEvaluation = async (text: string, customItemConfidences?: Record<number, number>) => {
    setIsProcessing(true);
    setError(null);
    try {
      const response = await fetch('/api/grading/evaluate-against-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentText: text,
          studentName: student.name,
          answerKey: activeKey,
          itemConfidences: customItemConfidences
        })
      });

      const data = await response.json();
      if (data.success && data.gradingResult) {
        setGradingResult(data.gradingResult);
      } else {
        throw new Error(data.error || 'Evaluation error');
      }
    } catch (err: any) {
      console.error('Grading evaluation error:', err);
      setError(err?.message || 'Grading engine encountered an error.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Inline Answer Key Edit Handlers
  const handleUpdateKeyItem = (index: number, field: keyof AnswerKeyItem, val: any) => {
    const updatedItems = [...activeKey.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: val
    };
    const totalPts = updatedItems.reduce((sum, it) => sum + (it.points || 1), 0);
    setActiveKey({
      ...activeKey,
      items: updatedItems,
      totalItems: updatedItems.length,
      totalPoints: totalPts
    });
  };

  const handleAddNewKeyItem = () => {
    const nextNum = activeKey.items.length + 1;
    const newItem: AnswerKeyItem = {
      itemNumber: nextNum,
      question: `Item ${nextNum}`,
      correctAnswer: 'A',
      points: 1,
      type: 'multiple_choice',
      acceptableVariants: ['A', 'a'],
      explanation: `Correct answer for Item ${nextNum}`
    };
    const updatedItems = [...activeKey.items, newItem];
    setActiveKey({
      ...activeKey,
      items: updatedItems,
      totalItems: updatedItems.length,
      totalPoints: updatedItems.reduce((s, it) => s + (it.points || 1), 0)
    });
  };

  const handleDeleteKeyItem = (index: number) => {
    if (activeKey.items.length <= 1) return;
    const updatedItems = activeKey.items.filter((_, i) => i !== index).map((it, idx) => ({
      ...it,
      itemNumber: idx + 1
    }));
    setActiveKey({
      ...activeKey,
      items: updatedItems,
      totalItems: updatedItems.length,
      totalPoints: updatedItems.reduce((s, it) => s + (it.points || 1), 0)
    });
  };

  // Load Preset Sample Keys
  const handleLoadSampleKey = (keyPreset: AnswerKey) => {
    setActiveKey(keyPreset);
    setKeyFileName(keyPreset.fileName || null);
    setKeyFilePreview(null);
  };

  // Load Preset Student Submissions for Quick Testing
  const handleLoadSampleStudentSubmission = (type: 'high' | 'needs_work') => {
    let sampleText = '';
    const sampleConfidences: Record<number, number> = {};
    if (type === 'high') {
      sampleText = activeKey.items.map((it, idx) => {
        // High score: 90% correct
        const ans = (idx === 3) ? (it.correctAnswer === 'A' ? 'B' : 'A') : it.correctAnswer;
        // Item 6 has lower OCR confidence (58%) due to cursive handwriting
        sampleConfidences[it.itemNumber] = (idx === 5) ? 58 : (idx === 7) ? 68 : (90 + (idx % 7));
        return `${it.itemNumber}. ${ans}`;
      }).join('\n');
    } else {
      // Needs work: ~50% correct
      sampleText = activeKey.items.map((it, idx) => {
        const ans = (idx % 2 === 0) ? it.correctAnswer : (it.correctAnswer === 'A' ? 'C' : 'A');
        // Item 4 has 54% and Item 8 has 62% confidence
        sampleConfidences[it.itemNumber] = (idx === 3) ? 54 : (idx === 7) ? 62 : (82 + (idx % 11));
        return `${it.itemNumber}. ${ans}`;
      }).join('\n');
    }

    setStudentAnswerText(sampleText);
    performEvaluation(sampleText, sampleConfidences);
    setActiveModule('grading');
  };

  // Manual Review & Teacher Override Handlers for OCR Scanned Answers
  const handleStartEdit = (item: ItemGradingComparison) => {
    setEditingItemNumber(item.itemNumber);
    setEditAnswerInput(item.studentAnswer && item.studentAnswer !== '(No answer detected)' ? item.studentAnswer : '');
  };

  const handleCancelEdit = () => {
    setEditingItemNumber(null);
    setEditAnswerInput('');
  };

  const handleSaveManualEdit = (itemNumber: number) => {
    if (!gradingResult) return;
    const targetKeyItem = activeKey.items.find(k => k.itemNumber === itemNumber);
    if (!targetKeyItem) return;

    const trimmedInput = editAnswerInput.trim();
    const cNorm = String(targetKeyItem.correctAnswer || '').trim().toLowerCase();
    const sNorm = trimmedInput.toLowerCase();
    const variants = (targetKeyItem.acceptableVariants || []).map(v => String(v).trim().toLowerCase());
    const isCorrect = sNorm === cNorm || variants.some(v => v === sNorm || sNorm.includes(v) || v.includes(sNorm));
    const maxPts = targetKeyItem.points || 1;
    const awarded = isCorrect ? maxPts : 0;

    const updatedComparisons = gradingResult.itemComparisons.map(c => {
      if (c.itemNumber === itemNumber) {
        return {
          ...c,
          originalOcrAnswer: c.originalOcrAnswer || c.studentAnswer,
          studentAnswer: trimmedInput || '(No answer detected)',
          isCorrect,
          scoreAwarded: awarded,
          maxPoints: maxPts,
          ocrConfidence: 100, // Teacher manual verified
          ocrStatus: 'high' as const,
          needsReview: false,
          isManuallyReviewed: true,
          feedback: isCorrect 
            ? 'Teacher verified as correct response.' 
            : `Teacher verified. Correct answer is ${targetKeyItem.correctAnswer}.`
        };
      }
      return c;
    });

    const newScore = updatedComparisons.reduce((sum, c) => sum + c.scoreAwarded, 0);
    const newCorrect = updatedComparisons.filter(c => c.isCorrect).length;
    const newIncorrect = updatedComparisons.filter(c => !c.isCorrect).length;
    const percentage = Math.round((newScore / (gradingResult.totalPoints || 1)) * 100);
    const transmuted = transmuteInitialGrade(percentage);
    const qualitative = getQualitativeDescriptor(transmuted);
    const lowCount = updatedComparisons.filter(c => c.needsReview && !c.isManuallyReviewed).length;

    setGradingResult({
      ...gradingResult,
      score: newScore,
      percentage,
      depedTransmutedGrade: transmuted,
      masteryLevel: `${qualitative.descriptor} (${percentage}%)`,
      lowConfidenceCount: lowCount,
      itemComparisons: updatedComparisons,
      summary: {
        correctCount: newCorrect,
        incorrectCount: newIncorrect,
        skippedCount: gradingResult.summary.skippedCount
      }
    });

    setEditingItemNumber(null);
    setEditAnswerInput('');
    setBatchToast(`✓ Item ${itemNumber} reviewed and updated! Transmuted Grade: ${transmuted}`);
    setTimeout(() => setBatchToast(null), 4000);
  };

  const handleConfirmOcrItem = (itemNumber: number) => {
    if (!gradingResult) return;
    const updatedComparisons = gradingResult.itemComparisons.map(c => {
      if (c.itemNumber === itemNumber) {
        return {
          ...c,
          isManuallyReviewed: true,
          needsReview: false,
          ocrConfidence: Math.max(c.ocrConfidence || 75, 85),
          ocrStatus: 'high' as const
        };
      }
      return c;
    });

    const lowCount = updatedComparisons.filter(c => c.needsReview && !c.isManuallyReviewed).length;
    setGradingResult({
      ...gradingResult,
      lowConfidenceCount: lowCount,
      itemComparisons: updatedComparisons
    });

    setBatchToast(`✓ Item ${itemNumber} OCR confirmed and marked as verified!`);
    setTimeout(() => setBatchToast(null), 3000);
  };

  const handleApproveAllLowConfidence = () => {
    if (!gradingResult) return;
    const updatedComparisons = gradingResult.itemComparisons.map(c => ({
      ...c,
      isManuallyReviewed: true,
      needsReview: false,
      ocrConfidence: Math.max(c.ocrConfidence || 80, 85),
      ocrStatus: 'high' as const
    }));

    setGradingResult({
      ...gradingResult,
      lowConfidenceCount: 0,
      itemComparisons: updatedComparisons
    });

    setBatchToast(`✓ All low-confidence OCR items approved and verified!`);
    setTimeout(() => setBatchToast(null), 3500);
  };

  // Export CSV Report
  const handleExportCSV = () => {
    if (!gradingResult) return;
    let csv = `Item,Competency/Question,Student Answer,Correct Answer,Status,Score,Max Points,Feedback\n`;
    gradingResult.itemComparisons.forEach(it => {
      csv += `${it.itemNumber},"${it.question || ''}","${it.studentAnswer}","${it.correctAnswer}",${it.isCorrect ? 'Correct' : 'Incorrect'},${it.scoreAwarded},${it.maxPoints},"${it.feedback || ''}"\n`;
    });
    csv += `\nTotal Score,${gradingResult.score},Max Points,${gradingResult.totalPoints},Percentage,${gradingResult.percentage}%,DepEd Transmuted Grade,${gradingResult.depedTransmutedGrade}\n`;
    csv += `Student Name,"${student.name}",Grade & Section,"${student.grade} - ${student.section}",Answer Key,"${activeKey.title}"\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Grading_Report_${student.name.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Single Student PDF Slip Export
  const handleExportStudentPdf = () => {
    if (!gradingResult) return;
    try {
      const studentEntry: BatchStudentGradeEntry = {
        id: student.id,
        name: student.name,
        section: student.section,
        grade: student.grade,
        gradingResult,
        evaluatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      exportSingleStudentGradingPdf(studentEntry, {
        title: activeKey.title,
        subject: activeKey.subject
      });
      setBatchToast(`✓ Generated individual PDF result slip for ${student.name}!`);
      setTimeout(() => setBatchToast(null), 4000);
    } catch (err: any) {
      console.error(err);
      alert('Could not export student PDF slip.');
    }
  };

  // Add current student to batch queue
  const handleAddCurrentStudentToBatch = () => {
    if (!gradingResult) return;
    const exists = batchStudents.some(s => s.id === student.id);
    const newEntry: BatchStudentGradeEntry = {
      id: student.id,
      name: student.name,
      section: student.section,
      grade: student.grade,
      gradingResult,
      evaluatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    if (exists) {
      setBatchStudents(prev => prev.map(s => s.id === student.id ? newEntry : s));
      setBatchToast(`✓ Updated ${student.name} in batch export queue!`);
    } else {
      setBatchStudents(prev => [newEntry, ...prev]);
      setBatchToast(`✓ Added ${student.name} to batch queue (${batchStudents.length + 1} total ready for consolidated PDF)!`);
    }
    setTimeout(() => setBatchToast(null), 4000);
  };

  // Direct Batch Export All to Consolidated PDF
  const handleBatchExportAll = () => {
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
      setBatchToast(`✓ Consolidated PDF successfully exported! Page 1: Summary Dashboard + ${batchStudents.length} Individual Student Result Slips.`);
      setTimeout(() => setBatchToast(null), 5000);
    } catch (err: any) {
      console.error(err);
      alert('Could not export batch consolidated PDF.');
    }
  };

  // Count total unreviewed low confidence items across batch queue
  const totalBatchLowConfidenceCount = useMemo(() => {
    return batchStudents.reduce((acc, st) => {
      const flagged = (st.gradingResult?.itemComparisons || []).filter(
        it => ((it.ocrConfidence !== undefined && it.ocrConfidence < 70) || it.needsReview) && !it.isManuallyReviewed
      ).length;
      return acc + flagged;
    }, 0);
  }, [batchStudents]);

  // Inject / reset sample handwriting ambiguities for testing
  const handleInjectSampleFlags = () => {
    setBatchStudents(prev => {
      return prev.map(st => {
        const comparisons = (st.gradingResult?.itemComparisons || []).map((it) => {
          if (st.id === "136514260006" && (it.itemNumber === 4 || it.itemNumber === 7)) {
            return {
              ...it,
              ocrConfidence: it.itemNumber === 4 ? 54 : 62,
              ocrStatus: 'low' as const,
              needsReview: true,
              isManuallyReviewed: false,
              studentAnswer: it.itemNumber === 4 ? 'D' : 'B',
              originalOcrAnswer: it.itemNumber === 4 ? 'D (faint cursive loop)' : 'B (pencil smudge)'
            };
          }
          if (st.id === "136514260005" && it.itemNumber === 3) {
            return {
              ...it,
              ocrConfidence: 58,
              ocrStatus: 'low' as const,
              needsReview: true,
              isManuallyReviewed: false,
              studentAnswer: 'A',
              originalOcrAnswer: 'A (slanted letter)'
            };
          }
          if (st.id === "136514260004" && it.itemNumber === 6) {
            return {
              ...it,
              ocrConfidence: 64,
              ocrStatus: 'low' as const,
              needsReview: true,
              isManuallyReviewed: false,
              studentAnswer: 'C',
              originalOcrAnswer: 'C (erased prior mark)'
            };
          }
          if (st.id === "136514260003" && it.itemNumber === 8) {
            return {
              ...it,
              ocrConfidence: 56,
              ocrStatus: 'low' as const,
              needsReview: true,
              isManuallyReviewed: false,
              studentAnswer: 'B',
              originalOcrAnswer: 'B (light pencil stroke)'
            };
          }
          return it;
        });

        const lowCount = comparisons.filter(c => c.needsReview && !c.isManuallyReviewed).length;

        return {
          ...st,
          gradingResult: {
            ...st.gradingResult,
            lowConfidenceCount: lowCount,
            itemComparisons: comparisons
          }
        };
      });
    });

    setBatchToast('✓ Loaded sample low-confidence handwriting scans into the batch queue!');
    setTimeout(() => setBatchToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* ================= HEADER ================= */}
        <header className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-blue-900 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                <GraduationCap className="w-3.5 h-3.5 text-[#FCD116]" />
                <span>DepEd DO 3, s. 2026 Assessment Suite</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
                Multimodal Image &amp; PDF Comparator
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2.5">
              <span>Student Answer Grading App</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Upload official teacher answer keys (Image or PDF) to automatically evaluate and cross-reference student answer sheets.
            </p>
          </div>
          
          {/* Main Navigation Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex-wrap">
            <button 
              onClick={() => setActiveModule('key')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeModule === 'key' 
                  ? 'bg-amber-600 text-white shadow-md' 
                  : 'text-slate-700 hover:bg-white/70'
              }`}
            >
              <Key size={15} />
              <span>🔑 Answer Key</span>
              <span className="ml-1 px-1.5 py-0.2 bg-white/20 rounded-full text-[10px] font-mono">
                {activeKey.items.length}
              </span>
            </button>

            <button 
              onClick={() => setActiveModule('sheet')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeModule === 'sheet' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-700 hover:bg-white/70'
              }`}
            >
              <FileText size={15} />
              <span>📝 Sheet Scan</span>
            </button>

            <button 
              onClick={() => {
                if (!gradingResult) {
                  // If no grading result yet, test evaluation with active key
                  handleLoadSampleStudentSubmission('high');
                } else {
                  setActiveModule('grading');
                }
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeModule === 'grading' 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-slate-700 hover:bg-white/70'
              }`}
            >
              <CheckCircle2 size={15} />
              <span>📊 Comparison Results</span>
            </button>

            {/* NEW TAB: Batch Low-Confidence Review Queue */}
            <button 
              onClick={() => setActiveModule('review')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeModule === 'review' 
                  ? 'bg-rose-700 text-white shadow-md' 
                  : 'text-slate-700 hover:bg-white/70'
              }`}
              title="Review handwriting items flagged with low OCR confidence across the batch queue"
            >
              <AlertTriangle size={15} className={totalBatchLowConfidenceCount > 0 ? "text-amber-300" : ""} />
              <span>⚠️ Batch OCR Review</span>
              <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
                totalBatchLowConfidenceCount > 0 
                  ? 'bg-rose-100 text-rose-800 animate-pulse' 
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {totalBatchLowConfidenceCount}
              </span>
            </button>

            <button 
              onClick={() => setActiveModule('batch')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeModule === 'batch' 
                  ? 'bg-blue-900 text-white shadow-md' 
                  : 'text-slate-700 hover:bg-white/70'
              }`}
            >
              <Layers size={15} />
              <span>📦 Batch Class Export</span>
              <span className="ml-1 px-1.5 py-0.2 bg-[#FCD116] text-[#002776] rounded-full text-[10px] font-mono font-black shadow-2xs">
                {batchStudents.length}
              </span>
            </button>

            <button 
              onClick={() => startIdScanner('qr')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeModule === 'qr' 
                  ? 'bg-blue-800 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-white/70'
              }`}
            >
              <QrCode size={14} />
              <span className="hidden sm:inline">QR ID</span>
            </button>

            <button 
              onClick={() => startIdScanner('barcode')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeModule === 'barcode' 
                  ? 'bg-blue-800 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-white/70'
              }`}
            >
              <Barcode size={14} />
              <span className="hidden sm:inline">Barcode</span>
            </button>
          </div>
        </header>

        {/* Global Batch Toast Alert */}
        {batchToast && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-emerald-900 text-xs font-bold shadow-xs animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{batchToast}</span>
            </div>
            <button
              onClick={() => setActiveModule('batch')}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-black transition cursor-pointer"
            >
              View Batch Queue ({batchStudents.length}) →
            </button>
          </div>
        )}

        {/* Active Answer Key Banner Strip */}
        <div className="bg-gradient-to-r from-amber-500/15 via-blue-500/10 to-indigo-500/10 border border-amber-300/60 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded">
                  Active Reference Key
                </span>
                <span className="text-xs font-mono font-bold text-slate-600">
                  {activeKey.totalItems} Items • {activeKey.totalPoints} Points
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                {activeKey.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveModule('key')}
              className="px-3 py-1.5 bg-white hover:bg-amber-50 border border-amber-300 text-amber-900 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Edit3 size={13} />
              <span>Inspect / Change Key</span>
            </button>

            <button
              onClick={() => setActiveModule('sheet')}
              className="px-3.5 py-1.5 bg-[#092B62] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <FileCheck size={13} className="text-[#FCD116]" />
              <span>Scan Sheet Against Key</span>
            </button>
          </div>
        </div>

        {/* ================= MAIN CONTENT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT 2 COLUMNS: ACTIVE MODULE WORKSPACE */}
          <div className="lg:col-span-2 space-y-6">

            {/* MODULE 1: TEACHER ANSWER KEY UPLOAD & EDITOR */}
            {activeModule === 'key' && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden space-y-6 p-5 sm:p-7"
              >
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <Key className="text-amber-600 w-5 h-5" />
                      <span>Upload Teacher's Answer Key (Image or PDF)</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      The grading engine extracts the correct answers and scoring points directly from your uploaded file.
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-black font-mono">
                    PDF / JPG / PNG
                  </span>
                </div>

                {/* Upload Drag & Drop Zone */}
                <div className="relative border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-3xl p-6 sm:p-8 bg-amber-50/40 hover:bg-amber-50/70 transition-all text-center group cursor-pointer">
                  <input 
                    ref={answerKeyFileInputRef}
                    type="file" 
                    accept="image/*,application/pdf" 
                    onChange={handleAnswerKeyUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
                      <Upload className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">
                        Drop your Answer Key here, or <span className="text-amber-700 underline">Browse</span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                        Supports photographed answer keys, scanned tests, Word-exported PDFs, and DepEd TOS answer sheets.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2 flex-wrap justify-center">
                      <span className="px-3 py-1 bg-white border border-amber-200 rounded-lg text-xs font-bold text-amber-800 shadow-2xs">
                        📄 PDF Document
                      </span>
                      <span className="px-3 py-1 bg-white border border-amber-200 rounded-lg text-xs font-bold text-amber-800 shadow-2xs">
                        🖼️ Image (JPG, PNG, WEBP)
                      </span>
                      <span className="px-3 py-1 bg-white border border-amber-200 rounded-lg text-xs font-bold text-amber-800 shadow-2xs">
                        ⚡ Auto-OCR Extraction
                      </span>
                    </div>
                  </div>

                  {/* Uploading progress overlay */}
                  <AnimatePresence>
                    {isUploadingKey && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/85 backdrop-blur-xs rounded-3xl z-20 flex flex-col items-center justify-center p-6 text-white"
                      >
                        <div className="w-full max-w-sm bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-4 shadow-xl">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <RefreshCw className="w-5 h-5 text-amber-400 animate-spin" />
                              <span className="font-bold text-sm">Parsing Answer Key...</span>
                            </div>
                            <span className="font-mono font-bold text-amber-400">{keyUploadProgress}%</span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300"
                              style={{ width: `${keyUploadProgress}%` }}
                            />
                          </div>
                          <p className="text-xs text-slate-400 text-center">{keyUploadStatus}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Preloaded Quick Keys */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
                  <span className="text-xs font-bold text-slate-600 block uppercase tracking-wider">
                    Or Load a Verified DepEd Key Template:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SAMPLE_ANSWER_KEYS.map((sKey) => (
                      <button
                        key={sKey.id}
                        onClick={() => handleLoadSampleKey(sKey)}
                        className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                          activeKey.id === sKey.id 
                            ? 'bg-amber-100/80 border-amber-400 text-amber-950 font-bold' 
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold leading-snug">{sKey.title}</p>
                          <p className="text-[10px] text-slate-500">{sKey.items.length} Items • {sKey.subject}</p>
                        </div>
                        {activeKey.id === sKey.id ? (
                          <CheckCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Key Table & Editor */}
                <div className="space-y-3 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
                        <span>Extracted Key Items &amp; Scoring Matrix</span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Review or edit answers and points. Changes take effect immediately.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleAddNewKeyItem}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <Plus size={13} />
                        <span>Add Item</span>
                      </button>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                    <div className="overflow-x-auto max-h-[360px] overflow-y-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-slate-100 text-slate-700 font-bold uppercase sticky top-0 z-10 border-b border-slate-200">
                          <tr>
                            <th className="p-2.5 w-12 text-center">Item</th>
                            <th className="p-2.5">Topic / Competency</th>
                            <th className="p-2.5 w-32">Correct Answer</th>
                            <th className="p-2.5 w-20 text-center">Pts</th>
                            <th className="p-2.5 w-28">Type</th>
                            <th className="p-2.5 w-12 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {activeKey.items.map((it, idx) => (
                            <tr key={idx} className="hover:bg-amber-50/40 transition">
                              <td className="p-2.5 text-center font-bold text-slate-900 font-mono">
                                {it.itemNumber}
                              </td>
                              <td className="p-2.5">
                                <input
                                  type="text"
                                  value={it.question || ''}
                                  onChange={(e) => handleUpdateKeyItem(idx, 'question', e.target.value)}
                                  className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs focus:bg-white focus:outline-indigo-500"
                                  placeholder="Topic / Question"
                                />
                              </td>
                              <td className="p-2.5">
                                <input
                                  type="text"
                                  value={it.correctAnswer}
                                  onChange={(e) => handleUpdateKeyItem(idx, 'correctAnswer', e.target.value)}
                                  className="w-full px-2 py-1 bg-amber-50 border border-amber-300 font-black text-amber-950 rounded text-xs focus:bg-white focus:outline-amber-600"
                                  placeholder="Answer"
                                />
                              </td>
                              <td className="p-2.5 text-center">
                                <input
                                  type="number"
                                  min={1}
                                  max={20}
                                  value={it.points}
                                  onChange={(e) => handleUpdateKeyItem(idx, 'points', parseInt(e.target.value) || 1)}
                                  className="w-14 px-1.5 py-1 bg-slate-50 border border-slate-200 text-center font-mono font-bold rounded text-xs focus:bg-white"
                                />
                              </td>
                              <td className="p-2.5">
                                <select
                                  value={it.type || 'multiple_choice'}
                                  onChange={(e) => handleUpdateKeyItem(idx, 'type', e.target.value)}
                                  className="w-full px-1.5 py-1 bg-slate-50 border border-slate-200 rounded text-[11px]"
                                >
                                  <option value="multiple_choice">Multiple Choice</option>
                                  <option value="identification">Identification</option>
                                  <option value="true_false">True / False</option>
                                  <option value="short_answer">Short Answer</option>
                                </select>
                              </td>
                              <td className="p-2.5 text-center">
                                <button
                                  onClick={() => handleDeleteKeyItem(idx)}
                                  disabled={activeKey.items.length <= 1}
                                  className="p-1 text-slate-400 hover:text-red-600 rounded transition cursor-pointer disabled:opacity-30"
                                  title="Remove item"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Proceed CTA */}
                  <div className="pt-3 flex justify-end">
                    <button
                      onClick={() => setActiveModule('sheet')}
                      className="px-5 py-2.5 bg-[#092B62] hover:bg-blue-900 text-white rounded-xl text-xs font-black transition flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>Proceed to Scan Student Sheets with this Key</span>
                      <ArrowRight size={15} className="text-[#FCD116]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* MODULE 2: STUDENT ANSWER SHEET SCANNER */}
            {activeModule === 'sheet' && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden space-y-6 p-5 sm:p-7"
              >
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <FileText className="text-indigo-600 w-5 h-5" />
                      <span>Scan Student Answer Sheet</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Cross-referencing answers against: <strong className="text-amber-800">{activeKey.title}</strong>
                    </p>
                  </div>
                  <button
                    onClick={() => setShowManualInput(!showManualInput)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 size={13} />
                    <span>{showManualInput ? 'Camera / File Upload' : 'Manual Text / Paste'}</span>
                  </button>
                </div>

                {!showManualInput ? (
                  <div className="border-2 border-dashed border-indigo-300 hover:border-indigo-500 rounded-3xl p-8 bg-indigo-50/40 hover:bg-indigo-50/70 transition-all text-center relative group cursor-pointer">
                    <input 
                      ref={studentSheetFileInputRef}
                      type="file" 
                      accept="image/*,application/pdf" 
                      onChange={handleStudentSheetUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />

                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
                        <Camera className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">
                          Snap Photo or Upload Student Answer Sheet
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                          Our Tesseract OCR and GenAI engine reads handwriting or bubbles and compares each answer directly with the teacher's key.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-2 flex-wrap justify-center">
                        <span className="px-3 py-1 bg-white border border-indigo-200 rounded-lg text-xs font-bold text-indigo-800 shadow-2xs">
                          JPG / PNG Photo
                        </span>
                        <span className="px-3 py-1 bg-white border border-indigo-200 rounded-lg text-xs font-bold text-indigo-800 shadow-2xs">
                          PDF Exam Sheet
                        </span>
                      </div>
                    </div>

                    {/* Progress overlay */}
                    <AnimatePresence>
                      {isProcessing && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-slate-900/85 backdrop-blur-xs rounded-3xl z-20 flex flex-col items-center justify-center p-6 text-white"
                        >
                          <div className="w-full max-w-sm bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-4 shadow-xl">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin" />
                                <span className="font-bold text-sm">Grading in progress...</span>
                              </div>
                              <span className="font-mono font-bold text-indigo-400">{ocrProgress}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 transition-all duration-300"
                                style={{ width: `${ocrProgress}%` }}
                              />
                            </div>
                            <p className="text-xs text-slate-400 text-center">{ocrStatus}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Type or Paste Student Answer Text:
                      </label>
                      <textarea
                        rows={6}
                        value={studentAnswerText}
                        onChange={(e) => setStudentAnswerText(e.target.value)}
                        placeholder="e.g.:&#10;1. A&#10;2. C&#10;3. B&#10;4. D&#10;5. A&#10;6. Adaptability&#10;7. Makatao..."
                        className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-300 rounded-2xl focus:bg-white focus:outline-indigo-500 leading-relaxed"
                      />
                    </div>
                    <button
                      onClick={() => performEvaluation(studentAnswerText)}
                      disabled={isProcessing || !studentAnswerText.trim()}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-[#FCD116]" />}
                      <span>Evaluate Answers Against Answer Key</span>
                    </button>
                  </div>
                )}

                {/* Instant Test Buttons */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                  <span className="text-xs font-bold text-slate-600 block uppercase tracking-wider">
                    Test Grading Engine Instantly:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleLoadSampleStudentSubmission('high')}
                      className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle size={14} />
                      <span>Simulate High Scorer (90%)</span>
                    </button>
                    <button
                      onClick={() => handleLoadSampleStudentSubmission('needs_work')}
                      className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <HelpCircle size={14} />
                      <span>Simulate Developing Learner (50%)</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* MODULE 3: COMPARISON RESULTS & DETAILED GRADING */}
            {activeModule === 'grading' && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {gradingResult ? (
                  <>
                    {/* Score Summary Card */}
                    <div className="bg-gradient-to-br from-[#002776] via-[#092B62] to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] uppercase tracking-wider font-mono">
                              Official Evaluation
                            </span>
                            <span className="text-xs text-blue-200">
                              Compared vs: <strong>{gradingResult.comparedAgainstKey?.title || activeKey.title}</strong>
                            </span>
                          </div>
                          <h2 className="text-2xl font-black">{student.name}</h2>
                          <p className="text-xs text-blue-200 font-mono">
                            ID: {student.id} • {student.section}
                          </p>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <span className="text-[11px] uppercase tracking-widest text-blue-200 font-bold block">
                              Raw Score
                            </span>
                            <div className="text-4xl sm:text-5xl font-black text-white">
                              {gradingResult.score}
                              <span className="text-2xl text-blue-300 font-normal"> / {gradingResult.totalPoints}</span>
                            </div>
                          </div>

                          <div className="text-right border-l border-white/20 pl-6">
                            <span className="text-[11px] uppercase tracking-widest text-[#FCD116] font-bold block">
                              Transmuted Grade
                            </span>
                            <div className="text-4xl sm:text-5xl font-black text-[#FCD116]">
                              {gradingResult.depedTransmutedGrade}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Performance Indicators */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                        <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
                          <span className="text-[10px] text-blue-200 uppercase font-bold block">Percentage</span>
                          <strong className="text-lg font-black text-white">{gradingResult.percentage}%</strong>
                        </div>
                        <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
                          <span className="text-[10px] text-emerald-300 uppercase font-bold block">Correct</span>
                          <strong className="text-lg font-black text-emerald-300">
                            {gradingResult.summary.correctCount} Items
                          </strong>
                        </div>
                        <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
                          <span className="text-[10px] text-red-300 uppercase font-bold block">Incorrect</span>
                          <strong className="text-lg font-black text-red-300">
                            {gradingResult.summary.incorrectCount} Items
                          </strong>
                        </div>
                        <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
                          <span className="text-[10px] text-amber-300 uppercase font-bold block">DepEd Mastery</span>
                          <strong className="text-xs font-bold text-amber-200 block truncate">
                            {gradingResult.masteryLevel.split(' ')[0]}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* ================= TEACHER QR CODE GENERATOR FOR PHYSICAL SCAN RECORDING ================= */}
                    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-black uppercase tracking-wider font-mono flex items-center gap-1">
                              <QrCode className="w-3.5 h-3.5 text-[#002776]" />
                              Teacher Physical Scan Recording
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
                              Encodes Final Grade &amp; Transmuted Score
                            </span>
                          </div>
                          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            <span>Student Result QR Code</span>
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Scan this QR code with any teacher physical scanner app or mobile camera to instantly record <strong className="text-slate-800">{student.name}</strong>'s grade.
                          </p>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => {
                              const payload = JSON.stringify({
                                system: "LNNCHS Grading",
                                id: student.id,
                                name: student.name,
                                section: student.section,
                                subject: activeKey.subject,
                                score: gradingResult.score,
                                total: gradingResult.totalPoints,
                                pct: gradingResult.percentage,
                                transmuted: gradingResult.depedTransmutedGrade,
                                mastery: gradingResult.masteryLevel
                              });
                              navigator.clipboard.writeText(payload);
                              setBatchToast("QR payload copied to clipboard!");
                              setTimeout(() => setBatchToast(null), 3000);
                            }}
                            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <Copy size={14} />
                            <span>Copy QR Data</span>
                          </button>
                          <button
                            onClick={() => {
                              const canvas = qrCanvasRef.current;
                              if (!canvas) return;
                              const url = canvas.toDataURL('image/png');
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = `LNNCHS_QR_${student.id}_${student.name.replace(/\s+/g, '_')}.png`;
                              a.click();
                            }}
                            className="px-3.5 py-2 bg-[#002776] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Download size={14} />
                            <span>Download QR Code</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center space-y-3">
                          <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                            <canvas ref={qrCanvasRef} className="w-40 h-40 object-contain mx-auto" />
                          </div>
                          <span className="text-[11px] font-mono font-bold text-slate-600">
                            ID: {student.id}
                          </span>
                        </div>

                        <div className="md:col-span-2 space-y-4">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                              <span className="text-[10px] text-slate-500 uppercase font-bold block">Student Name</span>
                              <strong className="text-sm font-black text-slate-900">{student.name}</strong>
                            </div>
                            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                              <span className="text-[10px] text-slate-500 uppercase font-bold block">Section</span>
                              <strong className="text-xs font-bold text-slate-900">{student.section}</strong>
                            </div>
                            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                              <span className="text-[10px] text-slate-500 uppercase font-bold block">Subject</span>
                              <strong className="text-xs font-bold text-amber-900 truncate block" title={activeKey.subject}>{activeKey.subject}</strong>
                            </div>
                            <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
                              <span className="text-[10px] text-amber-800 uppercase font-bold block">Raw Score</span>
                              <strong className="text-base font-black text-amber-950">{gradingResult.score} / {gradingResult.totalPoints}</strong>
                            </div>
                            <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200">
                              <span className="text-[10px] text-emerald-800 uppercase font-bold block">Percentage</span>
                              <strong className="text-base font-black text-emerald-950">{gradingResult.percentage}%</strong>
                            </div>
                            <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-200">
                              <span className="text-[10px] text-blue-800 uppercase font-bold block">DepEd Transmuted</span>
                              <strong className="text-base font-black text-[#002776]">{gradingResult.depedTransmutedGrade}</strong>
                            </div>
                          </div>

                          <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-2xl flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                            <div className="space-y-0.5">
                              <h5 className="font-bold text-xs text-indigo-950">Quick Physical Scan Recording Guide</h5>
                              <p className="text-[11px] text-indigo-800 leading-relaxed">
                                Teachers can use the built-in scanner or physical mobile devices to scan this QR code during class recording. Encodes official DepEd Order No. 3, s. 2026 grade records.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ================= RECHARTS BAR CHART: STUDENT VS CLASS AVERAGE ================= */}
                    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200 space-y-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-black uppercase tracking-wider font-mono flex items-center gap-1">
                              <BarChart2 className="w-3.5 h-3.5 text-indigo-600" />
                              Recharts Class Analytics
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
                              Class Roster: <strong className="text-slate-800">{classStats.totalStudents} Learners</strong>
                            </span>
                          </div>
                          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            <span>Student Score Distribution vs. Class Average</span>
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Visualizing <strong>{student.name}</strong>'s performance scores and item accuracy distributions compared to class benchmarks.
                          </p>
                        </div>

                        {/* Toggle View */}
                        <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-bold border border-slate-200">
                          <button
                            onClick={() => setChartView('overall')}
                            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                              chartView === 'overall'
                                ? 'bg-indigo-600 text-white shadow-2xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            <TrendingUp size={13} />
                            <span>Overall Metrics</span>
                          </button>
                          <button
                            onClick={() => setChartView('item_by_item')}
                            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                              chartView === 'item_by_item'
                                ? 'bg-indigo-600 text-white shadow-2xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            <Layers size={13} />
                            <span>Item Accuracy (%)</span>
                          </button>
                        </div>
                      </div>

                      {/* Quick Comparison Stat Pills */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
                        <div className="space-y-0.5">
                          <span className="text-slate-500 text-[10px] uppercase font-bold block">Student Score</span>
                          <div className="text-sm font-black text-indigo-700">
                            {gradingResult.score} / {gradingResult.totalPoints} ({gradingResult.percentage}%)
                          </div>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-slate-500 text-[10px] uppercase font-bold block">Class Average</span>
                          <div className="text-sm font-black text-sky-700">
                            {classStats.avgScore} / {gradingResult.totalPoints} ({classStats.avgPercentage}%)
                          </div>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-slate-500 text-[10px] uppercase font-bold block">Class Highest Score</span>
                          <div className="text-sm font-black text-emerald-700">
                            {classStats.highestScore} / {gradingResult.totalPoints}
                          </div>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-slate-500 text-[10px] uppercase font-bold block">Variance vs Class</span>
                          <div className={`text-sm font-black flex items-center gap-1 ${
                            gradingResult.percentage >= classStats.avgPercentage ? 'text-emerald-600' : 'text-amber-600'
                          }`}>
                            <span>{gradingResult.percentage >= classStats.avgPercentage ? '▲ +' : '▼ '}
                              {gradingResult.percentage - classStats.avgPercentage}%
                            </span>
                            <span className="text-[10px] text-slate-500 font-normal">
                              ({gradingResult.percentage >= classStats.avgPercentage ? 'Above Avg' : 'Below Avg'})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Recharts Bar Chart Graphic */}
                      <div className="w-full h-72 sm:h-80 pt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          {chartView === 'overall' ? (
                            <BarChart
                              data={overallMetricsChartData}
                              margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                              <XAxis 
                                dataKey="category" 
                                tick={{ fill: '#334155', fontSize: 12, fontWeight: 700 }} 
                                axisLine={{ stroke: '#cbd5e1' }}
                              />
                              <YAxis 
                                tick={{ fill: '#64748b', fontSize: 11 }} 
                                axisLine={{ stroke: '#cbd5e1' }}
                              />
                              <Tooltip
                                content={({ active, payload, label }) => {
                                  if (active && payload && payload.length) {
                                    return (
                                      <div className="bg-slate-900 text-white p-3 rounded-xl text-xs space-y-1.5 shadow-xl border border-slate-700">
                                        <p className="font-bold border-b border-slate-700 pb-1 text-amber-300">{label}</p>
                                        {payload.map((entry: any, index: number) => (
                                          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
                                            <span style={{ color: entry.color }} className="font-semibold">{entry.name}:</span>
                                            <span className="font-mono font-bold">{entry.value}</span>
                                          </div>
                                        ))}
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontWeight: 600 }} />
                              <ReferenceLine y={classStats.avgPercentage} stroke="#0284c7" strokeDasharray="4 4" label={{ value: `Class Avg (${classStats.avgPercentage}%)`, fill: '#0284c7', fontSize: 10, position: 'top' }} />
                              <Bar dataKey="Student" name={`${student.name} (Student)`} fill="#4f46e5" radius={[6, 6, 0, 0]} maxBarSize={50} />
                              <Bar dataKey="ClassAvg" name="Class Average" fill="#0284c7" radius={[6, 6, 0, 0]} maxBarSize={50} />
                              <Bar dataKey="ClassHigh" name="Class Top Score" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={50} />
                            </BarChart>
                          ) : (
                            <BarChart
                              data={itemAccuracyChartData}
                              margin={{ top: 20, right: 30, left: 10, bottom: 25 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                              <XAxis 
                                dataKey="shortLabel" 
                                tick={{ fill: '#334155', fontSize: 11, fontWeight: 700 }} 
                                axisLine={{ stroke: '#cbd5e1' }}
                              />
                              <YAxis 
                                unit="%" 
                                domain={[0, 100]} 
                                tick={{ fill: '#64748b', fontSize: 11 }} 
                                axisLine={{ stroke: '#cbd5e1' }}
                              />
                              <Tooltip
                                content={({ active, payload }) => {
                                  if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                      <div className="bg-slate-900 text-white p-3 rounded-xl text-xs space-y-1 shadow-xl border border-slate-700">
                                        <p className="font-bold text-amber-300 border-b border-slate-700 pb-1">{data.itemLabel}</p>
                                        <p className="flex items-center justify-between gap-3">
                                          <span>Student Result:</span>
                                          <span className={`font-bold ${data.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            {data.isCorrect ? '✓ Correct (100%)' : '✗ Incorrect (0%)'}
                                          </span>
                                        </p>
                                        <p className="flex items-center justify-between gap-3">
                                          <span>Class Avg Accuracy:</span>
                                          <span className="font-mono font-bold text-sky-300">{data.ClassAvgAccuracy}%</span>
                                        </p>
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontWeight: 600 }} />
                              <ReferenceLine y={50} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: '50% Threshold', fill: '#d97706', fontSize: 10, position: 'insideTopLeft' }} />
                              <Bar dataKey="StudentScore" name={`${student.name} Score (100% = Correct)`} radius={[6, 6, 0, 0]} maxBarSize={40}>
                                {itemAccuracyChartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.isCorrect ? '#10b981' : '#f43f5e'} />
                                ))}
                              </Bar>
                              <Bar dataKey="ClassAvgAccuracy" name="Class Avg Accuracy (%)" fill="#0284c7" radius={[6, 6, 0, 0]} maxBarSize={40} />
                            </BarChart>
                          )}
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Side-by-Side Item Comparison Table */}
                    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                            <Layers className="text-indigo-600 w-4 h-4" />
                            <span>Detailed Item-by-Item Answer Key Comparison</span>
                          </h3>
                          <p className="text-xs text-slate-500">
                            Cross-referencing student's handwritten/OCR answer against teacher's correct key.
                          </p>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            onClick={handleExportStudentPdf}
                            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                            title="Export official single student PDF result slip"
                          >
                            <FileDown size={13} />
                            <span>Export PDF Slip</span>
                          </button>

                          <button
                            onClick={handleAddCurrentStudentToBatch}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                            title="Add this evaluated learner to the consolidated class batch"
                          >
                            <Plus size={13} />
                            <span>Add to Batch Queue</span>
                          </button>

                          <button
                            onClick={() => setActiveModule('batch')}
                            className="px-3 py-1.5 bg-[#002776] hover:bg-blue-900 text-[#FCD116] rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                            title="Open batch exporter to generate consolidated single PDF with summary dashboard"
                          >
                            <Layers size={13} />
                            <span>Batch Export PDF ({batchStudents.length})</span>
                          </button>

                          <button
                            onClick={handleExportCSV}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <Download size={13} />
                            <span>Export CSV</span>
                          </button>

                          <button
                            onClick={() => window.print()}
                            className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <Printer size={13} />
                            <span>Print Slip</span>
                          </button>
                        </div>
                      </div>

                      {/* OCR Confidence Analytics & Manual Review Bar */}
                      {(() => {
                        const totalItemsCount = gradingResult.itemComparisons.length;
                        const flaggedItems = gradingResult.itemComparisons.filter(it => it.needsReview && !it.isManuallyReviewed);
                        const highConfidenceCount = gradingResult.itemComparisons.filter(it => (it.ocrConfidence || 0) >= 80 || it.isManuallyReviewed).length;
                        const meanConfidence = gradingResult.meanOcrConfidence || (
                          totalItemsCount > 0 
                            ? Math.round(gradingResult.itemComparisons.reduce((acc, it) => acc + (it.ocrConfidence || 85), 0) / totalItemsCount)
                            : 88
                        );

                        return (
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-3 shadow-2xs">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              {/* Left: Overall Confidence Metric & Status */}
                              <div className="flex items-center gap-2.5 flex-wrap">
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-xl shadow-2xs">
                                  <ShieldCheck className={`w-4 h-4 ${meanConfidence >= 80 ? 'text-emerald-600' : 'text-amber-600'}`} />
                                  <span className="text-xs font-bold text-slate-700">Tesseract OCR Scan Clarity:</span>
                                  <span className={`text-xs font-black ${
                                    meanConfidence >= 80 ? 'text-emerald-700' : meanConfidence >= 70 ? 'text-amber-700' : 'text-rose-700'
                                  }`}>
                                    {meanConfidence}% Mean
                                  </span>
                                </div>

                                {flaggedItems.length > 0 ? (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black bg-rose-50 text-rose-800 border border-rose-200 animate-pulse">
                                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                                    <span>{flaggedItems.length} Low-Confidence Item{flaggedItems.length > 1 ? 's' : ''} Flagged (&lt;70%)</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                    <span>All Items Verified & High Quality</span>
                                  </span>
                                )}
                              </div>

                              {/* Right: Quick Batch Approval & Filter Tabs */}
                              <div className="flex items-center gap-2 flex-wrap">
                                {flaggedItems.length > 0 && (
                                  <button
                                    onClick={handleApproveAllLowConfidence}
                                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                                    title="Mark all flagged items as verified by teacher"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Approve All Flagged ({flaggedItems.length})</span>
                                  </button>
                                )}

                                <div className="flex items-center p-0.5 bg-slate-200 rounded-xl text-[11px] font-bold">
                                  <button
                                    onClick={() => setConfidenceFilter('all')}
                                    className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                                      confidenceFilter === 'all' 
                                        ? 'bg-white text-slate-900 shadow-2xs' 
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                  >
                                    All ({totalItemsCount})
                                  </button>
                                  <button
                                    onClick={() => setConfidenceFilter('needs_review')}
                                    className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer ${
                                      confidenceFilter === 'needs_review' 
                                        ? 'bg-amber-500 text-slate-900 shadow-2xs' 
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                  >
                                    <AlertTriangle className="w-3 h-3 text-amber-900" />
                                    <span>Needs Review ({flaggedItems.length})</span>
                                  </button>
                                  <button
                                    onClick={() => setConfidenceFilter('high_confidence')}
                                    className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                                      confidenceFilter === 'high_confidence' 
                                        ? 'bg-white text-slate-900 shadow-2xs' 
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                  >
                                    High (&ge;80%) ({highConfidenceCount})
                                  </button>
                                </div>
                              </div>
                            </div>

                            {flaggedItems.length > 0 && (
                              <div className="text-[11px] bg-amber-50 border border-amber-200 text-amber-900 px-3 py-2 rounded-xl flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                                <span>
                                  <strong>Manual Review Prompt:</strong> Tesseract text extraction encountered handwriting with low confidence in item{flaggedItems.length > 1 ? 's' : ''} {flaggedItems.map(f => `#${f.itemNumber}`).join(', ')}. Click <strong>"Edit Answer"</strong> to adjust or <strong>"Approve OCR"</strong> to confirm.
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                        <div className="overflow-x-auto max-h-[450px] overflow-y-auto">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead className="bg-slate-100 text-slate-700 font-bold uppercase sticky top-0 z-10 border-b border-slate-200">
                              <tr>
                                <th className="p-3 w-14 text-center">Item</th>
                                <th className="p-3">Topic / Question</th>
                                <th className="p-3">Student Answer (OCR Scanned)</th>
                                <th className="p-3">Correct Answer Key</th>
                                <th className="p-3 w-20 text-center">Points</th>
                                <th className="p-3">Evaluation / Feedback</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                              {gradingResult.itemComparisons
                                .filter(item => {
                                  if (confidenceFilter === 'needs_review') {
                                    return item.needsReview && !item.isManuallyReviewed;
                                  }
                                  if (confidenceFilter === 'high_confidence') {
                                    return (item.ocrConfidence || 0) >= 80 || item.isManuallyReviewed;
                                  }
                                  return true;
                                })
                                .map((item, idx) => (
                                <tr 
                                  key={idx} 
                                  className={`transition ${
                                    item.needsReview && !item.isManuallyReviewed 
                                      ? 'bg-amber-100/50 border-l-4 border-l-amber-500 ring-1 ring-amber-300/40' 
                                      : item.isCorrect 
                                      ? 'bg-emerald-50/20' 
                                      : 'bg-red-50/25'
                                  }`}
                                >
                                  <td className="p-3 text-center font-bold font-mono text-slate-900">
                                    {item.itemNumber}
                                  </td>
                                  <td className="p-3 font-medium text-slate-800">
                                    {item.question || `Item ${item.itemNumber}`}
                                  </td>
                                  <td className="p-3">
                                    {editingItemNumber === item.itemNumber ? (
                                      <div className="flex items-center gap-1.5 py-1">
                                        <input
                                          type="text"
                                          value={editAnswerInput}
                                          onChange={(e) => setEditAnswerInput(e.target.value)}
                                          className="w-24 px-2 py-1 bg-white border-2 border-indigo-500 rounded text-xs font-mono font-bold focus:outline-none"
                                          placeholder="Answer..."
                                          autoFocus
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSaveManualEdit(item.itemNumber);
                                            if (e.key === 'Escape') handleCancelEdit();
                                          }}
                                        />
                                        <button
                                          onClick={() => handleSaveManualEdit(item.itemNumber)}
                                          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold flex items-center gap-1 cursor-pointer shadow-2xs"
                                          title="Save revised answer"
                                        >
                                          <Check size={12} />
                                          <span>Save</span>
                                        </button>
                                        <button
                                          onClick={handleCancelEdit}
                                          className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-bold cursor-pointer"
                                          title="Cancel"
                                        >
                                          <X size={12} />
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="space-y-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                          <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${
                                            item.isCorrect 
                                              ? 'bg-emerald-100 text-emerald-800' 
                                              : 'bg-red-100 text-red-800'
                                          }`}>
                                            {item.studentAnswer || '(No answer)'}
                                          </span>
                                          {item.isCorrect ? (
                                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                          ) : (
                                            <X className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                                          )}

                                          {/* Visual Indicator of Tesseract OCR Confidence */}
                                          {item.isManuallyReviewed ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-300 shadow-2xs">
                                              <Check className="w-3 h-3 text-blue-700" />
                                              <span>Teacher Verified</span>
                                            </span>
                                          ) : (item.ocrConfidence !== undefined && item.ocrConfidence < 70) || item.needsReview ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300 shadow-2xs animate-pulse">
                                              <AlertTriangle className="w-3 h-3 text-rose-600" />
                                              <span>{item.ocrConfidence ?? 58}% Low OCR</span>
                                            </span>
                                          ) : (item.ocrConfidence !== undefined && item.ocrConfidence < 80) ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
                                              <span>{item.ocrConfidence}% Fair OCR</span>
                                            </span>
                                          ) : (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
                                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                              <span>{item.ocrConfidence ?? 94}% OCR</span>
                                            </span>
                                          )}

                                          {/* Quick edit button */}
                                          <button
                                            onClick={() => handleStartEdit(item)}
                                            className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded cursor-pointer transition"
                                            title="Manually edit student response"
                                          >
                                            <Edit3 className="w-3 h-3" />
                                          </button>
                                        </div>

                                        {/* Highlighted Low Confidence Manual Review Actions */}
                                        {item.needsReview && !item.isManuallyReviewed && (
                                          <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                                            <span className="px-1.5 py-0.5 bg-amber-200 text-amber-950 rounded text-[9.5px] font-black uppercase tracking-wider flex items-center gap-1 border border-amber-300">
                                              <AlertTriangle className="w-2.5 h-2.5 text-amber-900" />
                                              Needs Review
                                            </span>
                                            <button
                                              onClick={() => handleStartEdit(item)}
                                              className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer transition shadow-2xs"
                                              title="Inspect handwriting and edit OCR output"
                                            >
                                              <Edit3 className="w-2.5 h-2.5" />
                                              <span>Edit Answer</span>
                                            </button>
                                            <button
                                              onClick={() => handleConfirmOcrItem(item.itemNumber)}
                                              className="px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer transition shadow-2xs"
                                              title="Confirm Tesseract read this item accurately"
                                            >
                                              <Check className="w-2.5 h-2.5" />
                                              <span>Approve OCR</span>
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </td>
                                  <td className="p-3 font-mono font-bold text-amber-900 bg-amber-50/40">
                                    {item.correctAnswer}
                                  </td>
                                  <td className="p-3 text-center font-mono font-bold">
                                    <span className={item.isCorrect ? 'text-emerald-700' : 'text-red-600'}>
                                      {item.scoreAwarded} / {item.maxPoints}
                                    </span>
                                  </td>
                                  <td className="p-3 text-slate-600 text-[11.5px] leading-relaxed">
                                    {item.feedback}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Pedagogical AI Teacher Note */}
                    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-amber-50 border border-indigo-200 rounded-3xl p-6 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Sparkles className="w-6 h-6 text-[#FCD116]" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-indigo-950 text-base">
                            Teacher's Formative Analysis &amp; Remediation Plan
                          </h4>
                          <p className="text-xs text-indigo-800">
                            Generated by DepEd GenAI Comparative Evaluator (DepEd Order No. 3, s. 2026)
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="bg-white p-4 rounded-2xl border border-indigo-100 shadow-2xs space-y-1">
                          <span className="font-bold uppercase text-emerald-800 text-[10px] block">
                            Strengths Observed:
                          </span>
                          <p className="text-slate-700 leading-relaxed">
                            {gradingResult.feedback?.strengths || 'Strong conceptual baseline demonstrated.'}
                          </p>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-indigo-100 shadow-2xs space-y-1">
                          <span className="font-bold uppercase text-amber-800 text-[10px] block">
                            Targeted Competencies for Review:
                          </span>
                          <p className="text-slate-700 leading-relaxed">
                            {gradingResult.feedback?.areasForImprovement || 'Continue practicing complex questions.'}
                          </p>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border border-indigo-100 shadow-2xs">
                        <span className="font-bold uppercase text-indigo-900 text-[10px] block mb-1">
                          Teacher's Encouraging Note:
                        </span>
                        <p className="text-slate-800 italic text-sm leading-relaxed">
                          "{gradingResult.feedback?.teacherComment}"
                        </p>
                      </div>

                      {/* Action buttons at bottom */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={handleAddCurrentStudentToBatch}
                            className="px-4 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <Plus size={14} />
                            <span>Add to Batch Queue</span>
                          </button>
                          <button
                            onClick={() => setActiveModule('batch')}
                            className="px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-300 text-[#002776] rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <Layers size={14} />
                            <span>View Batch Class Export ({batchStudents.length})</span>
                          </button>
                          {totalBatchLowConfidenceCount > 0 && (
                            <button
                              onClick={() => setActiveModule('review')}
                              className="px-4 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                            >
                              <AlertTriangle size={14} className="text-rose-600" />
                              <span>Batch OCR Review ({totalBatchLowConfidenceCount})</span>
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveModule('sheet')}
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black transition flex items-center gap-2 shadow-sm cursor-pointer"
                          >
                            <FileText size={14} />
                            <span>Scan Next Student Answer Sheet</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                      <FileCheck className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-800">No Grading Results Yet</h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                        Scan or upload a student's answer sheet to view the automatic comparison against your answer key.
                      </p>
                    </div>
                    <button
                      onClick={() => handleLoadSampleStudentSubmission('high')}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Sparkles size={14} className="text-[#FCD116]" />
                      <span>Run Quick Sample Evaluation</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* MODULE: BATCH LOW-CONFIDENCE REVIEW QUEUE */}
            {activeModule === 'review' && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <BatchLowConfidenceReviewQueue
                  activeKey={activeKey}
                  batchStudents={batchStudents}
                  setBatchStudents={setBatchStudents}
                  currentStudentId={student.id}
                  onSyncCurrentStudentResult={(updatedRes) => {
                    setGradingResult(updatedRes);
                  }}
                  onNavigateToBatchExport={() => setActiveModule('batch')}
                  onSelectStudentToView={(st) => {
                    setStudent({
                      id: st.id,
                      name: st.name,
                      section: st.section,
                      grade: st.grade
                    });
                    setGradingResult(st.gradingResult);
                    setActiveModule('grading');
                  }}
                  onInjectSampleFlags={handleInjectSampleFlags}
                />
              </motion.div>
            )}

            {/* MODULE: BATCH CLASS CONSOLIDATED EXPORT */}
            {activeModule === 'batch' && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <BatchGradingManager
                  activeKey={activeKey}
                  batchStudents={batchStudents}
                  setBatchStudents={setBatchStudents}
                  currentStudent={student}
                  currentGradingResult={gradingResult}
                  onSelectStudentToView={(st) => {
                    setStudent({
                      id: st.id,
                      name: st.name,
                      section: st.section,
                      grade: st.grade
                    });
                    setGradingResult(st.gradingResult);
                    setActiveModule('grading');
                  }}
                  onScanNextSheet={() => setActiveModule('sheet')}
                  onNavigateToReviewQueue={() => setActiveModule('review')}
                />
              </motion.div>
            )}

            {/* MODULE 4 & 5: QR & BARCODE SCANNERS */}
            {(activeModule === 'qr' || activeModule === 'barcode') && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 text-center space-y-6"
              >
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center justify-center gap-2">
                    {activeModule === 'qr' ? <QrCode className="text-blue-900" /> : <Barcode className="text-blue-900" />}
                    <span>{activeModule === 'qr' ? 'Scan Student QR ID' : 'Scan Student Barcode ID'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Align the student ID badge in front of your camera to auto-link student records.
                  </p>
                </div>

                {!scannedData ? (
                  <div className="relative overflow-hidden rounded-2xl border-4 border-indigo-500/20 shadow-xl bg-black max-w-sm mx-auto">
                    <div id="reader" className="w-full overflow-hidden" />
                  </div>
                ) : (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 max-w-sm mx-auto space-y-3">
                    <CheckCircle className="w-10 h-10 mx-auto text-emerald-600" />
                    <h4 className="font-bold text-base">Student ID Linked</h4>
                    <p className="text-xs font-mono font-bold">ID: {scannedData}</p>
                    <button 
                      onClick={() => startIdScanner(activeModule)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                    >
                      Rescan ID
                    </button>
                  </div>
                )}
              </motion.div>
            )}

          </div>

          {/* RIGHT COLUMN: ACTIVE STUDENT & CONTROLS */}
          <div className="space-y-6">
            
            {/* Student Profile Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                <User className="text-indigo-600 w-4 h-4" />
                <span>Active Student Profile</span>
              </h3>

              <div className="flex items-center gap-3.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-blue-900 text-[#FCD116] rounded-2xl flex items-center justify-center font-bold text-lg shadow-xs">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight">{student.name}</h4>
                  <p className="text-xs text-slate-500 font-mono">ID: {student.id}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs pt-1">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Grade Level:</span>
                  <span className="font-bold text-slate-800">Grade {student.grade}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Section:</span>
                  <span className="font-bold text-slate-800">{student.section}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Active Key:</span>
                  <span className="font-bold text-amber-800 truncate max-w-[150px] text-right" title={activeKey.title}>
                    {activeKey.title}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Curriculum:</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-900 rounded font-bold text-[10px]">
                    DO 3, s. 2026
                  </span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => startIdScanner('qr')}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <QrCode size={13} />
                  <span>Scan QR</span>
                </button>
                <button
                  onClick={() => startIdScanner('barcode')}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Barcode size={13} />
                  <span>Barcode</span>
                </button>
              </div>
            </div>

            {/* Answer Key Quick Summary Box */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/60 border border-amber-200 rounded-3xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                  Loaded Answer Key
                </span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                  {activeKey.sourceType?.toUpperCase() || 'OFFICIAL'}
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-sm">{activeKey.title}</h4>
              <p className="text-xs text-slate-600">
                Subject: <strong>{activeKey.subject}</strong>
              </p>

              <div className="grid grid-cols-2 gap-2 text-center pt-1">
                <div className="bg-white/80 p-2 rounded-xl border border-amber-200">
                  <span className="text-[10px] text-slate-500 block">Total Items</span>
                  <strong className="text-sm font-black text-amber-900">{activeKey.totalItems}</strong>
                </div>
                <div className="bg-white/80 p-2 rounded-xl border border-amber-200">
                  <span className="text-[10px] text-slate-500 block">Max Points</span>
                  <strong className="text-sm font-black text-amber-900">{activeKey.totalPoints}</strong>
                </div>
              </div>

              <button
                onClick={() => setActiveModule('key')}
                className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Upload size={13} />
                <span>Upload New Key (PDF/Image)</span>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-5 space-y-2.5">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">
                Quick Shortcuts
              </h3>

              <button
                onClick={() => {
                  setActiveModule('sheet');
                  studentSheetFileInputRef.current?.click();
                }}
                className="w-full p-3 rounded-2xl hover:bg-indigo-50 border border-slate-100 hover:border-indigo-100 transition text-left flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Camera size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Scan Student Sheet</p>
                    <p className="text-[10px] text-slate-500">Camera or Photo</p>
                  </div>
                </div>
                <ChevronRight size={15} className="text-slate-400" />
              </button>

              <button
                onClick={() => {
                  setActiveModule('key');
                  answerKeyFileInputRef.current?.click();
                }}
                className="w-full p-3 rounded-2xl hover:bg-amber-50 border border-slate-100 hover:border-amber-100 transition text-left flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Upload size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Upload Answer Key</p>
                    <p className="text-[10px] text-slate-500">Image or PDF</p>
                  </div>
                </div>
                <ChevronRight size={15} className="text-slate-400" />
              </button>

              {gradingResult && (
                <button
                  onClick={handleExportCSV}
                  className="w-full p-3 rounded-2xl hover:bg-emerald-50 border border-slate-100 hover:border-emerald-100 transition text-left flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Download size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Export Item Analysis</p>
                      <p className="text-[10px] text-slate-500">Download CSV</p>
                    </div>
                  </div>
                  <ChevronRight size={15} className="text-slate-400" />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-center gap-3 text-red-700 shadow-2xs">
            <AlertCircle className="flex-shrink-0 w-5 h-5" />
            <p className="text-xs font-medium">{error}</p>
            <button 
              onClick={() => setError(null)} 
              className="ml-auto text-red-500 hover:text-red-800 transition cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
