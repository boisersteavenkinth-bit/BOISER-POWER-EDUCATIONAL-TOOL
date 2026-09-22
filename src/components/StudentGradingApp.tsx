import React, { useState, useRef, useEffect } from 'react';
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
  CheckCircle,
  Search,
  Sparkles,
  ChevronRight,
  Download,
  Settings
} from 'lucide-react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import Tesseract from 'tesseract.js';
import { motion, AnimatePresence } from 'motion/react';

// === TYPES ===
interface Student {
  id: string;
  name: string;
  section: string;
  grade: string;
}

interface ScanResult {
  type: 'qr' | 'barcode' | 'document';
  data: string;
  timestamp: string;
}

interface GradingResult {
  rawText: string;
  score: number;
  totalItems: number;
  feedback: {
    corrections: string;
    suggestions: string;
    teacherComment: string;
    sentiment: string;
  } | null;
}

export const StudentGradingApp: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'qr' | 'barcode' | 'sheet' | 'grading'>('qr');
  const [student, setStudent] = useState<Student | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [gradingResult, setGradingResult] = useState<GradingResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // QR/Barcode Scanner Ref
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    // Cleanup scanner on module change
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, [activeModule]);

  const handleIdScanSuccess = (decodedText: string) => {
    setScannedData(decodedText);
    // In a real app, you'd fetch student from DB by ID
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
    setStudent(null);

    setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );
      scanner.render(handleIdScanSuccess, (err) => {
        // console.warn(err);
      });
      scannerRef.current = scanner;
    }, 100);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    try {
      const { data: { text } } = await Tesseract.recognize(file, 'eng', {
        logger: m => console.log(m)
      });

      setScannedData(text);
      setActiveModule('grading');
      performGrading(text);
    } catch (err) {
      setError("Failed to process document. Please ensure the image is clear.");
    } finally {
      setIsProcessing(false);
    }
  };

  const performGrading = async (text: string) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/grading/proofread', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          studentName: student?.name || 'Learner',
          subject: 'Life and Career Skills'
        })
      });
      const data = await response.json();
      
      if (data.success) {
        setGradingResult({
          rawText: text,
          score: 85, // Mock score for now
          totalItems: 100,
          feedback: data.result
        });
      }
    } catch (err) {
      setError("Grading engine encountered an error.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <GraduationCap className="w-10 h-10 text-indigo-600" />
              Student Answer Grading App
            </h1>
            <p className="text-slate-500 mt-1">Multi-Module Scanner & AI Grading Engine</p>
          </div>
          
          <div className="flex items-center gap-2 bg-white p-1 rounded-lg shadow-sm border border-slate-200">
            <button 
              onClick={() => startIdScanner('qr')}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${activeModule === 'qr' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <QrCode size={18} />
              <span className="hidden sm:inline">QR ID</span>
            </button>
            <button 
              onClick={() => startIdScanner('barcode')}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${activeModule === 'barcode' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Barcode size={18} />
              <span className="hidden sm:inline">Barcode ID</span>
            </button>
            <button 
              onClick={() => setActiveModule('sheet')}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${activeModule === 'sheet' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <FileText size={18} />
              <span className="hidden sm:inline">Sheet Scan</span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Scanner/Input */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                  {activeModule === 'qr' && <QrCode className="text-indigo-600" />}
                  {activeModule === 'barcode' && <Barcode className="text-indigo-600" />}
                  {activeModule === 'sheet' && <FileText className="text-indigo-600" />}
                  {activeModule === 'grading' && <CheckCircle2 className="text-indigo-600" />}
                  {activeModule === 'qr' ? 'QR Code ID Scanner' : 
                   activeModule === 'barcode' ? 'Barcode ID Scanner' : 
                   activeModule === 'sheet' ? 'Answer Sheet Scanner' : 'Grading Results'}
                </h2>
                {isProcessing && (
                  <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Processing...
                  </div>
                )}
              </div>

              <div className="p-8 min-h-[400px] flex flex-col items-center justify-center relative">
                <AnimatePresence mode="wait">
                  {(activeModule === 'qr' || activeModule === 'barcode') && (
                    <motion.div 
                      key="scanner"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full max-w-md mx-auto text-center"
                    >
                      {!scannedData ? (
                        <div id="reader" className="w-full overflow-hidden rounded-xl border-4 border-slate-100 shadow-inner">
                          {/* html5-qrcode will render here */}
                        </div>
                      ) : (
                        <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-green-700">
                          <CheckCircle className="w-12 h-12 mx-auto mb-4" />
                          <h3 className="text-xl font-bold">ID Scanned Successfully</h3>
                          <p className="mt-2">Student ID: <span className="font-mono font-bold">{scannedData}</span></p>
                          <button 
                            onClick={() => startIdScanner(activeModule as 'qr' | 'barcode')}
                            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                          >
                            Rescan ID
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeModule === 'sheet' && (
                    <motion.div 
                      key="sheet"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full text-center"
                    >
                      <div className="max-w-md mx-auto p-12 border-2 border-dashed border-slate-300 rounded-3xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group relative">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleFileUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Camera className="w-10 h-10 text-indigo-600" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-800">Scan Answer Sheet</h3>
                          <p className="text-slate-500 mt-2">Take a photo or upload an image of the student's answer sheet for AI analysis.</p>
                          <div className="mt-8 flex gap-3">
                            <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm">
                              JPG/PNG Supported
                            </span>
                            <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm">
                              Max 10MB
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeModule === 'grading' && gradingResult && (
                    <motion.div 
                      key="grading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full space-y-6"
                    >
                      <div className="bg-indigo-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                          <p className="text-indigo-100 text-sm font-medium uppercase tracking-wider">Final Score</p>
                          <h3 className="text-6xl font-black mt-1">
                            {gradingResult.score}<span className="text-3xl text-indigo-200 font-normal ml-1">/ {gradingResult.totalItems}</span>
                          </h3>
                        </div>
                        <div className="flex flex-col items-end text-right">
                          <span className="px-4 py-2 bg-indigo-500 bg-opacity-30 rounded-full text-sm font-semibold backdrop-blur-sm border border-indigo-400">
                            Status: PASSED
                          </span>
                          <p className="mt-4 text-indigo-100 text-sm italic">
                            Generated by DepEd GenAI Engine s. 2026
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                          <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-indigo-600" />
                            AI Proofreading
                          </h4>
                          <div className="space-y-4">
                            <div>
                              <p className="text-xs font-bold text-slate-400 uppercase">Corrections</p>
                              <p className="text-slate-700 mt-1">{gradingResult.feedback?.corrections}</p>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-400 uppercase">Suggestions</p>
                              <p className="text-slate-700 mt-1">{gradingResult.feedback?.suggestions}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
                          <h4 className="font-bold text-indigo-900 flex items-center gap-2 mb-4">
                            <Search className="w-5 h-5 text-indigo-600" />
                            Detected Raw Text
                          </h4>
                          <div className="max-h-[150px] overflow-y-auto text-sm text-indigo-800 leading-relaxed font-mono bg-white p-4 rounded-xl border border-indigo-100">
                            {gradingResult.rawText}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100 relative overflow-hidden">
                        <div className="relative z-10 flex items-start gap-4">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-indigo-100 flex-shrink-0">
                            <User className="w-6 h-6 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-indigo-400 uppercase mb-1">Teacher's Note</p>
                            <p className="text-lg font-medium text-indigo-900 leading-snug">
                              "{gradingResult.feedback?.teacherComment}"
                            </p>
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 p-4">
                           <CheckCircle2 className="w-20 h-20 text-indigo-100 opacity-50" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-8 left-8 right-8 bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3 text-red-700"
                  >
                    <AlertCircle className="flex-shrink-0" />
                    <p className="text-sm font-medium">{error}</p>
                    <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600 transition-colors">
                      <RefreshCw size={16} />
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Student Profile & History */}
          <div className="space-y-6">
            {/* Student Info Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
            >
              <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
                <User className="text-indigo-600" />
                Active Session
              </h3>
              
              {student ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-slate-400 border border-slate-200">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg leading-tight">{student.name}</h4>
                      <p className="text-slate-500 text-sm">ID: {student.id}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Grade Level:</span>
                      <span className="font-semibold text-slate-700">{student.grade}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Section:</span>
                      <span className="font-semibold text-slate-700">{student.section}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Status:</span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold">VERIFIED</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-slate-50 text-slate-600 rounded-xl font-semibold border border-slate-200 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                    <BookOpen size={18} />
                    View Student History
                  </button>
                </div>
              ) : (
                <div className="text-center py-12 px-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                    <User className="text-slate-300" />
                  </div>
                  <p className="text-slate-500 text-sm">Scan a Student ID (QR/Barcode) to link a profile to this session.</p>
                </div>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
            >
              <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Settings className="text-indigo-600" />
                Quick Controls
              </h3>
              <div className="space-y-3">
                <button className="w-full p-3 rounded-xl hover:bg-indigo-50 border border-slate-100 hover:border-indigo-100 transition-all text-left flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Upload size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">Export Grades</p>
                      <p className="text-xs text-slate-500">Generate CSV/Excel</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300" />
                </button>
                
                <button className="w-full p-3 rounded-xl hover:bg-indigo-50 border border-slate-100 hover:border-indigo-100 transition-all text-left flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Download size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">Download Reports</p>
                      <p className="text-xs text-slate-500">PDF Student Analytics</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
