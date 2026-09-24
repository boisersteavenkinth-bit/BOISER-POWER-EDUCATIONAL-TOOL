import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  RotateCcw,
  Printer,
  Copy,
  Check,
  Zap,
  Eye,
  BookOpen,
  Info,
  RefreshCw,
  X,
  ExternalLink,
  ChevronRight,
  Flame,
  Binary,
  Layers,
  Award
} from 'lucide-react';

export interface FactCheckSentence {
  id: string;
  text: string;
  isAiLikely: boolean;
  factStatus: 'VERIFIED' | 'FALSE' | 'MISLEADING' | 'UNVERIFIED' | 'OPINION';
  factExplanation: string;
  citations: string[];
}

export interface FactCheckResult {
  extractedText: string;
  aiProbability: number;
  humanProbability: number;
  verdict: 'Human Written' | 'AI-Generated' | 'Hybrid / AI-Assisted';
  verdictSummary: string;
  factCheckScore: number;
  plagiarismScore: number;
  readabilityMetrics: {
    wordCount: number;
    sentenceCount: number;
    readingLevel: string;
    burstinessScore: number;
    perplexityScore: number;
  };
  sentences: FactCheckSentence[];
  recommendations: string[];
}

const SAMPLE_TEXTS = [
  {
    title: '🔬 Science 10 Photosynthesis & ATP Lab Report',
    text: `During our laboratory session at LNNCHS Science Laboratory, we investigated the rate of photosynthesis in Elodea canadensis under varying light intensities. The light-dependent reactions take place within the thylakoid membrane where chlorophyll absorbs photons, splitting water molecules into oxygen gas, protons, and electrons. The adenosine triphosphate (ATP) and NADPH produced are subsequently transferred to the stroma to fuel the Calvin Cycle. Under 100-watt illumination, the bubble production averaged 42 bubbles per minute compared to 12 bubbles under 25-watt illumination. This confirms that photosynthetic rate is directly proportional to light photon irradiance until carbon dioxide concentration becomes the rate-limiting factor.`
  },
  {
    title: '📘 DepEd Policy & LNNCHS S.Y. 2026–2027 Memo Analysis',
    text: `Under DepEd Order No. 009, s. 2026, the Philippine basic education system officially transitions into a Three-Term Trimester Calendar comprising 201 class days. In Region X, Regional Memorandum No. 604, s. 2025 mandates the Regional Unified Quarterly Assessment (RUQA) across Grades 3 to 10 and Grade 11 Core learning areas. At Lanao del Norte National Comprehensive High School (School ID: 304005) in Sto. Niño, Baroy, students must strictly observe school uniform guidelines and maintain an attendance rate above the 20% absence threshold.`
  },
  {
    title: '🤖 Sample AI-Assisted Student Essay (Mixed Quality)',
    text: `In today's multifaceted modern society, science serves as a testament to human curiosity and innovation. Delving deeper into the intricate tapestry of biological ecosystems, it is important to note that chlorophyll plays a crucial role. Furthermore, not only does education provide a solid framework for academic excellence, but it also elevates the holistic development of all learners in Northern Mindanao.`
  }
];

export const AICheckerFactScanner: React.FC<{ initialText?: string; onAnalyze?: (result: FactCheckResult) => void }> = ({
  initialText = '',
  onAnalyze
}) => {
  const [inputText, setInputText] = useState<string>(initialText || SAMPLE_TEXTS[0].text);
  const [isScanningCamera, setIsScanningCamera] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [selectedSentence, setSelectedSentence] = useState<FactCheckSentence | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedThumbnail, setCapturedThumbnail] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Auto-run analysis when text changes or mounted
  useEffect(() => {
    if (initialText) {
      setInputText(initialText);
      handleRunAudit(initialText);
    }
  }, [initialText]);

  // Camera cleanup
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setIsScanningCamera(true);
    setCameraError(null);
    stopCamera();

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err: any) {
      console.error('Camera stream error:', err);
      setCameraError(
        err?.message?.includes('Permission')
          ? 'Camera permission denied. Please allow camera access in browser permissions.'
          : 'Unable to start camera stream. You can upload an image file instead.'
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleCapturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth || 800;
    canvas.height = video.videoHeight || 600;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedThumbnail(dataUrl);
      stopCamera();
      setIsScanningCamera(false);

      // Send to Vision OCR & Fact Checker
      handleRunVisionOCR(dataUrl);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setCapturedThumbnail(base64);
      handleRunVisionOCR(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleRunVisionOCR = async (base64Image: string) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/ai-fact-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64Image })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setResult(data.data);
        setInputText(data.data.extractedText);
        if (data.data.sentences?.length > 0) {
          setSelectedSentence(data.data.sentences[0]);
        }
        if (onAnalyze) onAnalyze(data.data);
      }
    } catch (err) {
      console.error('OCR & Fact Check error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRunAudit = async (customText?: string) => {
    const textToCheck = (customText || inputText).trim();
    if (!textToCheck) return;

    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/ai-fact-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToCheck })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setResult(data.data);
        if (data.data.sentences?.length > 0) {
          setSelectedSentence(data.data.sentences[0]);
        }
        if (onAnalyze) onAnalyze(data.data);
      }
    } catch (err) {
      console.error('Audit error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyReport = () => {
    if (!result) return;
    const textToCopy = `=== OFFICIAL DEPED ACADEMIC INTEGRITY & FACT-CHECK AUDIT ===
Institution: Lanao del Norte National Comprehensive High School (LNNCHS - 304005)
Evaluation Date: ${new Date().toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' })}

AI Writing Likelihood: ${result.aiProbability}% (${result.verdict})
Fact-Checking Integrity Score: ${result.factCheckScore}/100
Plagiarism / Match Index: ${result.plagiarismScore}%
Readability: ${result.readabilityMetrics.readingLevel} (${result.readabilityMetrics.wordCount} words)

Verdict Summary:
${result.verdictSummary}

Verified Fact Claims & Citations:
${result.sentences.map((s, i) => `${i + 1}. [${s.factStatus}] "${s.text}" — ${s.factExplanation} (Citations: ${s.citations.join(', ')})`).join('\n\n')}

DepEd Improvement Directives:
${result.recommendations.map(r => `• ${r}`).join('\n')}
`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER BANNER ================= */}
      <div className="bg-gradient-to-r from-[#092B62] via-[#0B3C8A] to-[#1E40AF] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-2 border-amber-400/30">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-amber-400 text-blue-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-sm tracking-wider">
              Dual AI &amp; Fact-Check Engine
            </span>
            <span className="bg-blue-900/80 text-cyan-200 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border border-cyan-400/30">
              DepEd Region X &amp; LNNCHS Grounded
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-amber-400" />
            <span>AI Writing &amp; Scientific Fact-Checker</span>
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-3xl leading-relaxed">
            Scan physical student manuscripts or digital science papers with our interactive Camera Scanner. Audits AI writing likelihood, analyzes sentence-by-sentence authenticity, and fact-checks against verified DepEd Order issuances and scientific laws.
          </p>
        </div>

        {/* Quick Action Tools */}
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <button
            onClick={() => {
              if (isScanningCamera) {
                stopCamera();
                setIsScanningCamera(false);
              } else {
                startCamera();
              }
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-xs rounded-2xl shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>{isScanningCamera ? 'Close Camera' : '📷 Camera Scanner'}</span>
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-800/80 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl border border-blue-400/40 shadow-md transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4 text-cyan-300" />
            <span>Upload Document</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* ================= CAMERA SCANNER MODAL / VIEW ================= */}
      {isScanningCamera && (
        <div className="bg-stone-900 rounded-3xl p-6 border-2 border-amber-400 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2 text-white font-black text-sm">
              <Camera className="w-5 h-5 text-amber-400 animate-pulse" />
              <span>Live OCR Camera Scanner — Align Student Document in Frame</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
                }}
                className="p-2 bg-stone-800 hover:bg-stone-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                title="Switch Camera"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Flip Lens</span>
              </button>
              <button
                onClick={() => {
                  stopCamera();
                  setIsScanningCamera(false);
                }}
                className="p-2 bg-stone-800 hover:bg-rose-900/60 text-stone-300 hover:text-white rounded-xl transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {cameraError ? (
            <div className="p-6 bg-rose-950/60 border border-rose-800 rounded-2xl text-rose-200 text-xs flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
              <p>{cameraError}</p>
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden bg-black max-h-[420px] flex items-center justify-center border border-stone-700">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-auto object-cover max-h-[420px]"
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* Viewfinder Target Guidelines */}
              <div className="absolute inset-8 border-2 border-dashed border-amber-400/70 rounded-2xl pointer-events-none flex flex-col justify-between p-4">
                <span className="text-[10px] font-mono text-amber-300 bg-black/60 px-2 py-0.5 rounded self-start">
                  📐 DOCUMENT CAPTURE BOUNDS
                </span>
                <span className="text-[10px] font-mono text-amber-300 bg-black/60 px-2 py-0.5 rounded self-end">
                  HOLD STEADY • GOOD LIGHTING
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleCapturePhoto}
              disabled={isAnalyzing}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-black text-sm rounded-2xl shadow-xl flex items-center gap-2 transform active:scale-95 transition-all cursor-pointer"
            >
              <Camera className="w-5 h-5" />
              <span>SNAP &amp; EXTRACT TEXT (OCR)</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= MAIN INTERFACE: INPUT & EVALUATION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Input Text & Samples (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-stone-700 uppercase tracking-wide flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Input Writing / Manuscript</span>
            </label>
            <span className="text-[11px] font-mono text-stone-400">
              {inputText.trim().split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          {/* Preset Sample Text Buttons */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
              Load Preset Exemplars:
            </span>
            <div className="flex flex-col gap-1.5">
              {SAMPLE_TEXTS.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputText(sample.text);
                    handleRunAudit(sample.text);
                  }}
                  className="text-left px-3 py-2 rounded-xl bg-stone-50 hover:bg-blue-50 border border-stone-200 hover:border-blue-300 text-stone-700 hover:text-blue-900 text-xs font-semibold transition flex items-center justify-between gap-2"
                >
                  <span className="truncate">{sample.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Textarea Input */}
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={10}
            placeholder="Paste student research text, laboratory conclusions, or transcribed speech here..."
            className="w-full bg-stone-50/80 border border-stone-200 rounded-2xl p-4 text-xs font-medium text-stone-800 leading-relaxed outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition resize-none"
          />

          {capturedThumbnail && (
            <div className="p-3 bg-stone-100 rounded-2xl flex items-center justify-between border border-stone-200 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={capturedThumbnail}
                  alt="Scanned Document"
                  className="w-12 h-12 object-cover rounded-lg border border-stone-300 shadow-2xs"
                />
                <div>
                  <div className="font-bold text-stone-800">Scanned Document Image</div>
                  <div className="text-[10px] text-stone-500">OCR Text Extracted</div>
                </div>
              </div>
              <button
                onClick={() => setCapturedThumbnail(null)}
                className="text-stone-400 hover:text-rose-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={() => handleRunAudit()}
            disabled={isAnalyzing || !inputText.trim()}
            className="w-full py-4 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 hover:from-blue-600 hover:to-indigo-800 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 transition active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-amber-300" />
                <span>Auditing AI Writing &amp; Fact Grounds...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>RUN FULL AI &amp; FACT-CHECK AUDIT</span>
              </>
            )}
          </button>
        </div>

        {/* RIGHT COLUMN: Results Dashboard & Sentence Explorer (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6">
              {/* TOP METRICS CARDS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* AI Probability */}
                <div className={`p-4 rounded-2xl border ${
                  result.aiProbability < 30
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : result.aiProbability < 65
                    ? 'bg-amber-50 border-amber-200 text-amber-950'
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}>
                  <div className="text-[10px] font-black uppercase tracking-wider opacity-75">
                    AI Probability
                  </div>
                  <div className="text-2xl sm:text-3xl font-black mt-1">
                    {result.aiProbability}%
                  </div>
                  <div className="text-[10px] font-bold mt-1">
                    {result.verdict}
                  </div>
                </div>

                {/* Fact Integrity Score */}
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950">
                  <div className="text-[10px] font-black uppercase tracking-wider text-blue-700">
                    Fact Integrity
                  </div>
                  <div className="text-2xl sm:text-3xl font-black mt-1 text-blue-900">
                    {result.factCheckScore}/100
                  </div>
                  <div className="text-[10px] font-bold text-blue-700 mt-1">
                    DepEd &amp; Science Verified
                  </div>
                </div>

                {/* Human Voice Index */}
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950">
                  <div className="text-[10px] font-black uppercase tracking-wider text-indigo-700">
                    Human Voice
                  </div>
                  <div className="text-2xl sm:text-3xl font-black mt-1 text-indigo-900">
                    {result.humanProbability}%
                  </div>
                  <div className="text-[10px] font-bold text-indigo-700 mt-1">
                    Authentic Stylometry
                  </div>
                </div>

                {/* Readability Level */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900">
                  <div className="text-[10px] font-black uppercase tracking-wider text-stone-500">
                    Readability
                  </div>
                  <div className="text-sm font-black mt-2 text-stone-800">
                    {result.readabilityMetrics.readingLevel}
                  </div>
                  <div className="text-[10px] font-medium text-stone-500 mt-1">
                    {result.readabilityMetrics.sentenceCount} Sentences
                  </div>
                </div>
              </div>

              {/* VERDICT SUMMARY */}
              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-black text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Academic Integrity Verdict</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyReport}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Audit</span>
                    </button>
                  </div>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {result.verdictSummary}
                </p>
              </div>

              {/* SENTENCE-BY-SENTENCE INTERACTIVE HEATMAP */}
              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <div className="text-xs font-black text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>Sentence-by-Sentence Fact &amp; AI Heatmap</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Verified Fact
                    </span>
                    <span className="flex items-center gap-1 text-amber-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> AI Likely
                    </span>
                    <span className="flex items-center gap-1 text-rose-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> False/Alert
                    </span>
                  </div>
                </div>

                {/* Render Sentences */}
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs leading-relaxed space-y-2 max-h-[260px] overflow-y-auto">
                  {result.sentences.map((sent) => {
                    const isSelected = selectedSentence?.id === sent.id;
                    const bgClass =
                      sent.factStatus === 'FALSE'
                        ? 'bg-rose-100 hover:bg-rose-200 border-rose-300 text-rose-950'
                        : sent.isAiLikely
                        ? 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-950'
                        : sent.factStatus === 'VERIFIED'
                        ? 'bg-emerald-100/70 hover:bg-emerald-200 border-emerald-300 text-emerald-950'
                        : 'bg-white hover:bg-stone-200 border-stone-300 text-stone-800';

                    return (
                      <span
                        key={sent.id}
                        onClick={() => setSelectedSentence(sent)}
                        className={`inline-block mx-0.5 my-0.5 px-2 py-1 rounded-lg border text-xs cursor-pointer transition-all ${bgClass} ${
                          isSelected ? 'ring-2 ring-blue-600 font-bold shadow-sm' : ''
                        }`}
                        title="Click to view detailed fact verification and citations"
                      >
                        {sent.text}{' '}
                      </span>
                    );
                  })}
                </div>

                {/* SELECTED SENTENCE INSPECTION DRAWER */}
                {selectedSentence && (
                  <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                          selectedSentence.factStatus === 'VERIFIED'
                            ? 'bg-emerald-600 text-white'
                            : selectedSentence.factStatus === 'FALSE'
                            ? 'bg-rose-600 text-white'
                            : 'bg-amber-500 text-stone-950'
                        }`}>
                          {selectedSentence.factStatus}
                        </span>
                        {selectedSentence.isAiLikely && (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-purple-600 text-white">
                            AI Pattern Detected
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-blue-700 font-bold">
                        Sentence Inspector
                      </span>
                    </div>

                    <p className="text-xs font-bold text-stone-800 italic">
                      "{selectedSentence.text}"
                    </p>

                    <div className="text-xs text-stone-700 bg-white p-3 rounded-xl border border-blue-100">
                      <strong>Verification Analysis:</strong> {selectedSentence.factExplanation}
                    </div>

                    {selectedSentence.citations?.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-blue-900 uppercase">
                          Reference Sources &amp; Citations:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedSentence.citations.map((cite, cIdx) => (
                            <span
                              key={cIdx}
                              className="text-[10px] bg-white border border-blue-200 text-blue-900 font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-2xs"
                            >
                              <BookOpen className="w-3 h-3 text-blue-600" />
                              <span>{cite}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* RECOMMENDATIONS */}
              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
                <div className="text-xs font-black text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>DepEd Pedagogical Directives &amp; Action Items</span>
                </div>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {result.recommendations.map((rec, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-dashed border-stone-300 flex flex-col items-center justify-center text-center space-y-4 min-h-[380px]">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-blue-600 animate-bounce" />
              </div>
              <div>
                <h3 className="font-black text-stone-800 text-base">Ready to Verify Academic Integrity</h3>
                <p className="text-xs text-stone-500 max-w-[340px] mt-1 leading-relaxed">
                  Click <strong>Run Full AI &amp; Fact-Check Audit</strong> or scan a physical document using the <strong>Camera Scanner</strong> to see complete stylometry metrics and ground-truth citations.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
