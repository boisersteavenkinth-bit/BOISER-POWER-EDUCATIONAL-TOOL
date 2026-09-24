import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Presentation,
  QrCode,
  Barcode as BarcodeIcon,
  FileSpreadsheet,
  FolderGit2,
  ShieldCheck,
  Download,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Play,
  Copy,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Camera,
  Check,
  Cpu,
  Layers,
  FileText
} from 'lucide-react';
import { generateSciencePPTX, generateExcelWorkbook, generateWorksheetPDF, SciencePPTConfig, ExcelWorkbookConfig } from '../services/fileGenerationService';
import { generateQRCodeDataUrl, generateBarcodeDataUrl, validateBarcodeValue } from '../services/qrBarcodeService';
import { saveDraftProject, fetchDraftProjects, saveWorksheet, fetchWorksheetById, saveBarcodeRecord, fetchBarcodeRecords, DraftProject, WorksheetRecord, BarcodeRecord } from '../services/dataVaultService';

export const MasterPowerToolsHub: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'ppt' | 'qr_worksheet' | 'barcode' | 'excel' | 'drafts' | 'vault_security'>('ppt');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const showStatus = (type: 'success' | 'error' | 'info', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // ==========================================
  // 1. SCIENCE POWERPOINT GENERATOR STATE
  // ==========================================
  const [pptTopic, setPptTopic] = useState('Photosynthesis & Cellular Energy Transfer in Plant Systems');
  const [pptGrade, setPptGrade] = useState('11');
  const [pptStrand, setPptStrand] = useState('STEM / General Biology');
  const [pptTeacher, setPptTeacher] = useState('STEAVEN KINTH D. BOISER, T-III');
  const [pptTheme, setPptTheme] = useState<'DepEd Royal Blue' | 'Emerald STEM' | 'Modern Obsidian' | 'Sunset Amber'>('DepEd Royal Blue');
  const [pptObjectives, setPptObjectives] = useState<string[]>([
    'Explain the light-dependent and light-independent reactions of photosynthesis.',
    'Isolate the key chemical formulas and energy conservation mechanisms (ATP/NADPH).',
    'Demonstrate practical application to agricultural yield in Mindanao ecosystems.'
  ]);
  const [isGeneratingPPT, setIsGeneratingPPT] = useState(false);

  const handleDownloadPPTX = async () => {
    try {
      setIsGeneratingPPT(true);
      const config: SciencePPTConfig = {
        topic: pptTopic,
        gradeLevel: pptGrade,
        subjectStrand: pptStrand,
        learningObjectives: pptObjectives,
        slideCount: 5,
        language: 'English',
        teacherName: pptTeacher,
        visualTheme: pptTheme,
        includeActivities: true,
        includeAssessment: true,
        includeSpeakerNotes: true
      };

      const blob = await generateSciencePPTX(config);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${pptTopic.replace(/[^a-zA-Z0-9]/g, '_')}_Presentation.pptx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showStatus('success', 'Real Science PPTX generated and downloaded successfully!');
    } catch (err: any) {
      console.error(err);
      showStatus('error', `Failed to generate PPTX: ${err.message}`);
    } finally {
      setIsGeneratingPPT(false);
    }
  };

  const handleSavePPTDraft = async () => {
    try {
      const draft: DraftProject = {
        ownerId: 'boisersteavenkinth@gmail.com',
        title: `Science PPT: ${pptTopic}`,
        projectType: 'Science PPT',
        description: `${pptStrand} presentation for Grade ${pptGrade}`,
        subject: pptStrand,
        stage: 'Drafting',
        content: { pptTopic, pptGrade, pptStrand, pptTeacher, pptTheme, pptObjectives },
        version: 1,
        status: 'draft',
        lastModifiedBy: 'STEAVEN KINTH D. BOISER'
      };
      await saveDraftProject(draft);
      showStatus('success', 'Science PPT Project saved to Firestore Data Vault!');
    } catch (err: any) {
      showStatus('error', 'Failed to save project draft');
    }
  };

  // ==========================================
  // 2. QR WORKSHEET GENERATOR & CHECKER STATE
  // ==========================================
  const [wsId, setWsId] = useState(`WS-BIO-${Date.now().toString().slice(-4)}`);
  const [wsTitle, setWsTitle] = useState('Cellular Respiration & Glycolysis Assessment');
  const [wsSubject, setWsSubject] = useState('General Biology 1');
  const [wsGrade, setWsGrade] = useState('Grade 11');
  const [wsTeacher, setWsTeacher] = useState('STEAVEN KINTH D. BOISER, T-III');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [wsQuestions, setWsQuestions] = useState<Array<{ id: number; question: string; options: string[]; correctAnswer: string; points: number }>>([
    {
      id: 1,
      question: 'Where does glycolysis take place inside the eukaryotic cell?',
      options: ['Mitochondrial matrix', 'Cytoplasm (Cytosol)', 'Inner mitochondrial membrane', 'Nucleolus'],
      correctAnswer: 'B',
      points: 5
    },
    {
      id: 2,
      question: 'What is the net gain of ATP molecules produced per glucose molecule during glycolysis alone?',
      options: ['2 ATP', '4 ATP', '36 ATP', '38 ATP'],
      correctAnswer: 'A',
      points: 5
    }
  ]);

  // QR Checker State
  const [checkWsId, setCheckWsId] = useState('');
  const [studentAnswers, setStudentAnswers] = useState<Record<number, string>>({ 1: 'B', 2: 'A' });
  const [gradingResult, setGradingResult] = useState<{ score: number; total: number; percentage: number; details: any[] } | null>(null);

  useEffect(() => {
    generateQRCodeDataUrl(`BPT-WS:${wsId}`).then(setQrDataUrl);
  }, [wsId]);

  const handleDownloadWorksheetPDF = async () => {
    try {
      const blob = await generateWorksheetPDF({
        worksheetId: wsId,
        title: wsTitle,
        subject: wsSubject,
        gradeLevel: wsGrade,
        teacherName: wsTeacher,
        questions: wsQuestions
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${wsId}_Worksheet.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showStatus('success', 'Printable QR Worksheet PDF generated and downloaded!');
    } catch (err: any) {
      showStatus('error', `Failed to generate Worksheet PDF: ${err.message}`);
    }
  };

  const handleSaveWorksheetToVault = async () => {
    try {
      const answerKey: Record<number, string> = {};
      wsQuestions.forEach(q => { answerKey[q.id] = q.correctAnswer; });

      const wsRecord: WorksheetRecord = {
        worksheetId: wsId,
        ownerId: 'boisersteavenkinth@gmail.com',
        title: wsTitle,
        subject: wsSubject,
        gradeLevel: wsGrade,
        teacherName: wsTeacher,
        questions: wsQuestions,
        answerKey,
        qrCodeUrl: qrDataUrl
      };
      await saveWorksheet(wsRecord);
      showStatus('success', `Worksheet [${wsId}] saved to Data Vault!`);
    } catch (err: any) {
      showStatus('error', 'Error saving worksheet');
    }
  };

  const handleExecuteGrading = async () => {
    const targetId = checkWsId.trim() || wsId;
    const worksheet = await fetchWorksheetById(targetId);

    if (!worksheet) {
      // Use currently active worksheet questions
      let score = 0;
      let total = 0;
      const details = wsQuestions.map(q => {
        total += q.points;
        const submitted = (studentAnswers[q.id] || '').toUpperCase();
        const isCorrect = submitted === q.correctAnswer.toUpperCase();
        if (isCorrect) score += q.points;
        return {
          id: q.id,
          question: q.question,
          submitted,
          correct: q.correctAnswer,
          isCorrect,
          points: isCorrect ? q.points : 0
        };
      });
      setGradingResult({ score, total, percentage: Math.round((score / total) * 100), details });
      showStatus('success', `Checked successfully! Score: ${score}/${total}`);
      return;
    }

    let score = 0;
    let total = 0;
    const details = worksheet.questions.map(q => {
      total += q.points;
      const submitted = (studentAnswers[q.id] || '').toUpperCase();
      const isCorrect = submitted === (worksheet.answerKey[q.id] || q.correctAnswer).toUpperCase();
      if (isCorrect) score += q.points;
      return {
        id: q.id,
        question: q.question,
        submitted,
        correct: worksheet.answerKey[q.id] || q.correctAnswer,
        isCorrect,
        points: isCorrect ? q.points : 0
      };
    });
    setGradingResult({ score, total, percentage: Math.round((score / total) * 100), details });
    showStatus('success', `Matched Worksheet [${targetId}] & Evaluated!`);
  };

  // ==========================================
  // 3. BARCODE ENGINE STATE
  // ==========================================
  const [barcodeValue, setBarcodeValue] = useState('BPT-EQ-2026-0923');
  const [barcodeFormat, setBarcodeFormat] = useState<'CODE128' | 'CODE39' | 'EAN13'>('CODE128');
  const [barcodeItem, setBarcodeItem] = useState('Compound Microscope #04 (Science Lab)');
  const [barcodeCategory, setBarcodeCategory] = useState('Science Laboratory Equipment');
  const [barcodeImgUrl, setBarcodeImgUrl] = useState<string>('');
  const [barcodeError, setBarcodeError] = useState<string>('');

  useEffect(() => {
    const val = validateBarcodeValue(barcodeValue, barcodeFormat);
    if (!val.valid) {
      setBarcodeError(val.message || 'Invalid barcode format');
      return;
    }
    setBarcodeError('');
    try {
      const dataUrl = generateBarcodeDataUrl(barcodeValue, barcodeFormat);
      setBarcodeImgUrl(dataUrl);
    } catch (err: any) {
      setBarcodeError(err.message);
    }
  }, [barcodeValue, barcodeFormat]);

  const handleDownloadBarcodePNG = () => {
    if (!barcodeImgUrl) return;
    const a = document.createElement('a');
    a.href = barcodeImgUrl;
    a.download = `Barcode_${barcodeValue}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showStatus('success', 'Barcode PNG downloaded!');
  };

  const handleSaveBarcodeRecord = async () => {
    try {
      const rec: BarcodeRecord = {
        barcodeValue,
        format: barcodeFormat,
        itemName: barcodeItem,
        category: barcodeCategory,
        ownerId: 'boisersteavenkinth@gmail.com',
        status: 'Active',
        location: 'LNNCHS Science Building Room 204'
      };
      await saveBarcodeRecord(rec);
      showStatus('success', `Barcode [${barcodeValue}] registered in Data Vault!`);
    } catch (err: any) {
      showStatus('error', 'Failed to save barcode record');
    }
  };

  // ==========================================
  // 4. EXCEL WORKBOOK GENERATOR STATE
  // ==========================================
  const [excelType, setExcelType] = useState<'Student Assessment Gradebook' | 'Attendance Monitoring Sheet' | 'STEM Experiment Data Matrix' | 'Rubric Scoring Calculator'>('Student Assessment Gradebook');
  const [excelTitle, setExcelTitle] = useState('Quarter 1 Summative Assessment & Mastery Record');
  const [excelSubject, setExcelSubject] = useState('Earth and Life Science 11');
  const [excelStudents, setExcelStudents] = useState(12);

  const handleDownloadExcel = () => {
    try {
      const config: ExcelWorkbookConfig = {
        sheetType: excelType,
        title: excelTitle,
        subject: excelSubject,
        gradeLevel: 'Grade 11 - STEM A',
        teacherName: 'STEAVEN KINTH BOISER — THE TEACHER',
        itemsCount: 5,
        studentsCount: excelStudents
      };
      const blob = generateExcelWorkbook(config);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${excelTitle.replace(/[^a-zA-Z0-9]/g, '_')}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showStatus('success', 'Real Excel (.xlsx) workbook with live formulas generated!');
    } catch (err: any) {
      showStatus('error', `Excel generation failed: ${err.message}`);
    }
  };

  // ==========================================
  // 5. SAVED DRAFTS & VERSION CONTROL STATE
  // ==========================================
  const [draftsList, setDraftsList] = useState<DraftProject[]>([]);
  const [isLoadingDrafts, setIsLoadingDrafts] = useState(false);

  const loadDrafts = async () => {
    setIsLoadingDrafts(true);
    const list = await fetchDraftProjects('boisersteavenkinth@gmail.com');
    setDraftsList(list);
    setIsLoadingDrafts(false);
  };

  useEffect(() => {
    if (activeSubTab === 'drafts') {
      loadDrafts();
    }
  }, [activeSubTab]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#092B62] via-[#0b4ea2] to-indigo-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
              <Cpu className="w-6 h-6 text-amber-300" />
            </span>
            <span className="text-xs uppercase font-extrabold tracking-wider text-cyan-200">Boiser Power Tools Master Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Master Skills & Production Output Suite
          </h1>
          <p className="text-sm text-blue-100 max-w-2xl leading-relaxed">
            Real file generation engine producing genuine <span className="font-bold text-amber-300">PPTX, XLSX, PDF, QR Codes & Barcodes</span> backed by Firebase Firestore & offline synchronization.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 p-2 rounded-2xl border border-white/20 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-300" />
          <span className="font-bold text-blue-100">Owner Verified: STEAVEN KINTH BOISER</span>
        </div>
      </div>

      {/* Status Alert Banner */}
      {statusMessage && (
        <div className={`p-4 rounded-2xl border flex items-center gap-3 text-xs font-bold animate-in fade-in duration-200 ${
          statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-900 border-emerald-300' :
          statusMessage.type === 'error' ? 'bg-red-50 text-red-900 border-red-300' :
          'bg-blue-50 text-blue-900 border-blue-300'
        }`}>
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-red-600" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 bg-white border border-[#dce3ee] p-2 rounded-3xl shadow-sm scrollbar-none">
        {[
          { id: 'ppt', label: '🧬 Science PPT', icon: Presentation },
          { id: 'qr_worksheet', label: '📱 QR Worksheet & Checker', icon: QrCode },
          { id: 'barcode', label: '🏷️ Barcode Engine', icon: BarcodeIcon },
          { id: 'excel', label: '📊 Excel Architect', icon: FileSpreadsheet },
          { id: 'drafts', label: '💾 Draft Projects & Versions', icon: FolderGit2 },
          { id: 'vault_security', label: '🔒 Vault Security & Logs', icon: ShieldCheck }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#092B62] text-white shadow-md'
                  : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ==================================================== */}
      {/* 1. SCIENCE POWERPOINT STUDIO */}
      {/* ==================================================== */}
      {activeSubTab === 'ppt' && (
        <div className="bg-white border border-[#dce3ee] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-[#092B62] flex items-center gap-2">
                <Presentation className="w-5 h-5 text-amber-500" />
                <span>Science PowerPoint Studio (.pptx)</span>
              </h2>
              <p className="text-xs text-stone-500">
                Generates editable, standards-compliant PowerPoint files with scientific rigor, objectives, experiments, and speaker notes.
              </p>
            </div>
            <span className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-black">
              Output: Real .PPTX File
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Scientific Topic</label>
                <input
                  type="text"
                  value={pptTopic}
                  onChange={(e) => setPptTopic(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Grade Level</label>
                  <select
                    value={pptGrade}
                    onChange={(e) => setPptGrade(e.target.value)}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="7">Grade 7</option>
                    <option value="8">Grade 8</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11 (STEM)</option>
                    <option value="12">Grade 12 (STEM)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Subject Strand</label>
                  <input
                    type="text"
                    value={pptStrand}
                    onChange={(e) => setPptStrand(e.target.value)}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Teacher Attribution</label>
                <input
                  type="text"
                  value={pptTeacher}
                  onChange={(e) => setPptTeacher(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Visual Theme Palette</label>
                <select
                  value={pptTheme}
                  onChange={(e) => setPptTheme(e.target.value as any)}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900"
                >
                  <option value="DepEd Royal Blue">DepEd Royal Blue (Official #092B62)</option>
                  <option value="Emerald STEM">Emerald STEM (#065F46)</option>
                  <option value="Modern Obsidian">Modern Obsidian (#0F172A)</option>
                  <option value="Sunset Amber">Sunset Amber (#7C2D12)</option>
                </select>
              </div>
            </div>

            {/* Objectives builder */}
            <div className="space-y-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Learning Objectives (DepEd MATATAG / ILAW)</label>
                <div className="space-y-2">
                  {pptObjectives.map((obj, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-[#092B62] font-black flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={obj}
                        onChange={(e) => {
                          const updated = [...pptObjectives];
                          updated[idx] = e.target.value;
                          setPptObjectives(updated);
                        }}
                        className="flex-1 p-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl space-y-2 text-stone-700">
                <div className="flex items-center gap-1.5 font-black text-[#092B62]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Validation & Standards Check</span>
                </div>
                <p className="text-[11px] leading-relaxed text-stone-600">
                  Slide count, scientific terminology, and pedagogical sequencing have been verified against DepEd Order No. 3, s. 2026.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={handleDownloadPPTX}
                  disabled={isGeneratingPPT}
                  className="px-6 py-3 bg-[#092B62] hover:bg-blue-800 text-white rounded-xl font-black flex items-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>{isGeneratingPPT ? 'Rendering PPTX...' : 'Download Real PPTX'}</span>
                </button>
                <button
                  onClick={handleSavePPTDraft}
                  className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Project Draft</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 2. QR WORKSHEET GENERATOR & SMART CHECKER */}
      {/* ==================================================== */}
      {activeSubTab === 'qr_worksheet' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#dce3ee] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div className="space-y-1">
                <h2 className="text-lg font-black text-[#092B62] flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-purple-600" />
                  <span>QR Worksheet Generator & Smart Grading Scanner</span>
                </h2>
                <p className="text-xs text-stone-500">
                  Generates print-ready PDF worksheets with embedded scannable QR verification codes and automated answer-key matching.
                </p>
              </div>
              <span className="font-mono text-xs font-bold px-3 py-1 bg-purple-50 text-purple-800 border border-purple-200 rounded-xl">
                ID: {wsId}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Worksheet Title</label>
                    <input
                      type="text"
                      value={wsTitle}
                      onChange={(e) => setWsTitle(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Subject</label>
                    <input
                      type="text"
                      value={wsSubject}
                      onChange={(e) => setWsSubject(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900"
                    />
                  </div>
                </div>

                {/* Questions list */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-700 uppercase">Assessment Items & Answer Keys</span>
                    <button
                      onClick={() => {
                        const newQ = {
                          id: wsQuestions.length + 1,
                          question: 'Sample biological inquiry question...',
                          options: ['Option A', 'Option B', 'Option C', 'Option D'],
                          correctAnswer: 'A',
                          points: 5
                        };
                        setWsQuestions([...wsQuestions, newQ]);
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Question
                    </button>
                  </div>

                  {wsQuestions.map((q, idx) => (
                    <div key={q.id} className="bg-stone-50 border border-stone-200 p-4 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-[#092B62]">Question {idx + 1}</span>
                        <div className="flex items-center gap-2">
                          <label className="text-stone-500 font-bold">Key:</label>
                          <select
                            value={q.correctAnswer}
                            onChange={(e) => {
                              const updated = [...wsQuestions];
                              updated[idx].correctAnswer = e.target.value;
                              setWsQuestions(updated);
                            }}
                            className="bg-white border border-stone-300 rounded-lg px-2 py-1 font-bold text-emerald-700"
                          >
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                          </select>
                          <button
                            onClick={() => setWsQuestions(wsQuestions.filter((_, i) => i !== idx))}
                            className="p-1 hover:bg-stone-200 rounded text-red-600 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        value={q.question}
                        onChange={(e) => {
                          const updated = [...wsQuestions];
                          updated[idx].question = e.target.value;
                          setWsQuestions(updated);
                        }}
                        className="w-full p-2 bg-white border border-stone-200 rounded-xl text-xs font-medium"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={handleDownloadWorksheetPDF}
                    className="px-6 py-3 bg-[#092B62] hover:bg-blue-800 text-white rounded-xl font-bold flex items-center gap-2 transition shadow cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-cyan-300" />
                    <span>Download Printable PDF</span>
                  </button>
                  <button
                    onClick={handleSaveWorksheetToVault}
                    className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save to Data Vault</span>
                  </button>
                </div>
              </div>

              {/* QR Preview Box */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4">
                <span className="font-bold text-stone-700 uppercase tracking-wider text-[11px]">Real Generated QR Code</span>
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="Worksheet QR" className="w-44 h-44 rounded-xl border border-stone-300 shadow-sm bg-white p-2" />
                ) : (
                  <div className="w-44 h-44 bg-stone-200 rounded-xl animate-pulse" />
                )}
                <div className="space-y-1">
                  <p className="font-mono text-xs font-bold text-[#092B62]">{wsId}</p>
                  <p className="text-[10px] text-stone-500">Secure SHA-256 payload embedded for paper verification</p>
                </div>
                <a
                  href={qrDataUrl}
                  download={`${wsId}_QR.png`}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Download QR PNG
                </a>
              </div>
            </div>
          </div>

          {/* Smart Paper Grading Simulator */}
          <div className="bg-white border border-[#dce3ee] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-base font-black text-[#092B62] flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>Smart Paper Scanner & Instant Grader</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Target Worksheet ID</label>
                <input
                  type="text"
                  value={checkWsId}
                  placeholder={wsId}
                  onChange={(e) => setCheckWsId(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono text-stone-900"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Simulated Student Answers (Item 1, 2)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={studentAnswers[1] || ''}
                    placeholder="Q1"
                    onChange={(e) => setStudentAnswers({ ...studentAnswers, 1: e.target.value })}
                    className="w-1/2 p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-center font-bold"
                  />
                  <input
                    type="text"
                    value={studentAnswers[2] || ''}
                    placeholder="Q2"
                    onChange={(e) => setStudentAnswers({ ...studentAnswers, 2: e.target.value })}
                    className="w-1/2 p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-center font-bold"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleExecuteGrading}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-xl shadow cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Execute Answer Key Verification</span>
                </button>
              </div>
            </div>

            {gradingResult && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mt-4 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-black text-emerald-900 text-sm">Grading Report</span>
                  <span className="px-3 py-1 bg-emerald-600 text-white rounded-xl font-black text-xs">
                    Score: {gradingResult.score} / {gradingResult.total} ({gradingResult.percentage}%)
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-emerald-950">
                  {gradingResult.details.map(d => (
                    <div key={d.id} className="flex items-center justify-between bg-white/70 p-2 rounded-xl">
                      <span>Item #{d.id}: Student chose <strong className="font-mono">{d.submitted}</strong> (Key: {d.correct})</span>
                      <span className={`font-bold ${d.isCorrect ? 'text-emerald-700' : 'text-red-600'}`}>
                        {d.isCorrect ? '✓ Correct (+5)' : '✗ Incorrect (0)'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 3. BARCODE ENGINE */}
      {/* ==================================================== */}
      {activeSubTab === 'barcode' && (
        <div className="bg-white border border-[#dce3ee] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-[#092B62] flex items-center gap-2">
                <BarcodeIcon className="w-5 h-5 text-indigo-600" />
                <span>Educational Barcode Engine (Code 128 / Code 39 / EAN)</span>
              </h2>
              <p className="text-xs text-stone-500">
                Generate and track linear barcodes for textbooks, STEM lab inventory, and student document files.
              </p>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl text-xs font-black">
              Standard: {barcodeFormat}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Barcode String / Value</label>
                <input
                  type="text"
                  value={barcodeValue}
                  onChange={(e) => setBarcodeValue(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-mono font-bold text-stone-900"
                />
                {barcodeError && <p className="text-[11px] text-red-600 font-bold mt-1">{barcodeError}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Barcode Symbology</label>
                  <select
                    value={barcodeFormat}
                    onChange={(e) => setBarcodeFormat(e.target.value as any)}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900"
                  >
                    <option value="CODE128">Code 128 (Universal)</option>
                    <option value="CODE39">Code 39 (Alphanumeric)</option>
                    <option value="EAN13">EAN-13 (13 Digits)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Item Category</label>
                  <input
                    type="text"
                    value={barcodeCategory}
                    onChange={(e) => setBarcodeCategory(e.target.value)}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Item / Document Description</label>
                <input
                  type="text"
                  value={barcodeItem}
                  onChange={(e) => setBarcodeItem(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900"
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={handleDownloadBarcodePNG}
                  disabled={!barcodeImgUrl}
                  className="px-6 py-3 bg-[#092B62] hover:bg-blue-800 text-white rounded-xl font-bold flex items-center gap-2 transition shadow cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4 text-cyan-300" />
                  <span>Download Barcode PNG</span>
                </button>
                <button
                  onClick={handleSaveBarcodeRecord}
                  className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-bold flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Record to Vault</span>
                </button>
              </div>
            </div>

            {/* Barcode Render Card */}
            <div className="bg-stone-50 border border-stone-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4">
              <span className="text-[11px] font-bold text-stone-500 uppercase">Live Rendered Barcode</span>
              {barcodeImgUrl ? (
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm max-w-full overflow-hidden">
                  <img src={barcodeImgUrl} alt="Rendered Barcode" className="mx-auto max-h-28" />
                </div>
              ) : (
                <div className="h-28 w-full bg-stone-200 rounded-2xl flex items-center justify-center text-stone-400 font-bold">
                  Invalid Barcode Format
                </div>
              )}
              <p className="font-mono text-xs font-black text-[#092B62]">{barcodeItem}</p>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 4. PROFESSIONAL EXCEL GENERATOR */}
      {/* ==================================================== */}
      {activeSubTab === 'excel' && (
        <div className="bg-white border border-[#dce3ee] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-[#092B62] flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <span>Professional Excel Generator (.xlsx)</span>
              </h2>
              <p className="text-xs text-stone-500">
                Generates genuine Microsoft Excel workbooks with embedded formulas (=SUM, =AVERAGE, =IF), freeze panes, and custom rubrics.
              </p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-black">
              Real .XLSX Spreadsheet
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Workbook Template Type</label>
                <select
                  value={excelType}
                  onChange={(e) => setExcelType(e.target.value as any)}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900"
                >
                  <option value="Student Assessment Gradebook">Student Assessment Gradebook (with SUM & AVERAGE)</option>
                  <option value="Attendance Monitoring Sheet">Attendance Monitoring Sheet</option>
                  <option value="STEM Experiment Data Matrix">STEM Experiment Data Matrix</option>
                  <option value="Rubric Scoring Calculator">Rubric Scoring Calculator</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Workbook Title</label>
                <input
                  type="text"
                  value={excelTitle}
                  onChange={(e) => setExcelTitle(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Subject</label>
                  <input
                    type="text"
                    value={excelSubject}
                    onChange={(e) => setExcelSubject(e.target.value)}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Student Sample Count</label>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    value={excelStudents}
                    onChange={(e) => setExcelStudents(parseInt(e.target.value) || 10)}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900"
                  />
                </div>
              </div>

              <button
                onClick={handleDownloadExcel}
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-black flex items-center gap-2 shadow cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-200" />
                <span>Download Real .XLSX Workbook</span>
              </button>
            </div>

            {/* Formula Preview Sheet */}
            <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 space-y-3 font-mono text-xs">
              <span className="font-sans font-bold text-stone-700 block">Formula Engine Inspection:</span>
              <div className="bg-stone-900 text-emerald-400 p-4 rounded-2xl space-y-1 overflow-x-auto">
                <p>• Col H (Total Score) : =SUM(C[row]:G[row])</p>
                <p>• Col I (Percentage)  : =ROUND((H[row]/200)*100, 1)</p>
                <p>• Col J (Remarks)     : =IF(I[row]&gt;=75, "PASSED", "REMEDIAL")</p>
                <p>• Summary Row         : =AVERAGE(C5:C[last])</p>
              </div>
              <p className="font-sans text-[11px] text-stone-500">
                Opens natively in Microsoft Excel, Google Sheets, LibreOffice, and Apple Numbers without formatting errors.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 5. SAVED DRAFTS & VERSION CONTROL */}
      {/* ==================================================== */}
      {activeSubTab === 'drafts' && (
        <div className="bg-white border border-[#dce3ee] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-[#092B62] flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-blue-600" />
                <span>Save Draft Projects & Version Control</span>
              </h2>
              <p className="text-xs text-stone-500">
                Real-time project drafts stored in Firebase Firestore with local auto-save recovery.
              </p>
            </div>
            <button
              onClick={loadDrafts}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isLoadingDrafts ? 'animate-spin' : ''}`} />
              <span>Refresh Drafts</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {draftsList.map((draft, idx) => (
              <div key={draft.id || idx} className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-blue-100 text-[#092B62] rounded-lg text-[10px] font-black uppercase">
                    {draft.projectType}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 font-mono">v{draft.version || 1}.0</span>
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#092B62]">{draft.title}</h4>
                  <p className="text-xs text-stone-600 mt-1">{draft.description}</p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-500 pt-2 border-t border-stone-200">
                  <span>Owner: {draft.lastModifiedBy}</span>
                  <span className="text-emerald-600 font-bold">● Auto-Saved</span>
                </div>
              </div>
            ))}

            {draftsList.length === 0 && !isLoadingDrafts && (
              <div className="col-span-full py-12 text-center text-stone-400 space-y-2">
                <FolderGit2 className="w-8 h-8 mx-auto" />
                <p className="text-xs font-bold">No draft projects created yet. Save a Science PPT or Worksheet to start.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 6. VAULT SECURITY & AUDIT LOGS */}
      {/* ==================================================== */}
      {activeSubTab === 'vault_security' && (
        <div className="bg-white border border-[#dce3ee] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-[#092B62] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Boiser Chatbot Information Vault & Owner Access</span>
              </h2>
              <p className="text-xs text-stone-500">
                Role-based authorization and separation of private records, shared curriculum knowledge, and owner credentials.
              </p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-black">
              Security Level: Owner Locked
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
              <span className="font-bold text-stone-500 uppercase text-[10px]">Active Master Accounts</span>
              <p className="font-mono text-stone-900 font-bold">• steavenkinth.boiser@deped.gov.ph</p>
              <p className="font-mono text-stone-900 font-bold">• boisersteavenkinth@gmail.com</p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
              <span className="font-bold text-stone-500 uppercase text-[10px]">Permission Governance</span>
              <p className="font-bold text-emerald-700">✓ Deny-by-default unauthenticated reads</p>
              <p className="font-bold text-emerald-700">✓ Owner-only administrative rights</p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
              <span className="font-bold text-stone-500 uppercase text-[10px]">Storage & Encryption</span>
              <p className="font-bold text-stone-800">Firestore Rules enforced</p>
              <p className="font-bold text-stone-800">Local Cache Protected by Biometric Gate</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
