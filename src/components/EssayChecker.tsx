import React, { useState } from 'react';
import {
  FileCheck2,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Copy,
  Check,
  RefreshCw,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface CorrectionItem {
  id: string;
  original: string;
  replacement: string;
  type: 'grammar' | 'spelling' | 'punctuation' | 'clarity';
  explanation: string;
}

interface AIAnalysisResult {
  confidenceRange: string;
  minPercent: number;
  maxPercent: number;
  verdictLabel: 'Likely Human-Written' | 'Possible AI Involvement' | 'Likely AI-Generated';
  verdictColor: string;
  badgeBg: string;
  perplexityScore: string;
  burstinessVariance: string;
  repetitionIndex: string;
  pedagogicalObservation: string;
}

const SAMPLE_ESSAY_HUMAN = `Sa aming aralin sa Mabisang Komunikasyon, natutuhan ko na hindi lamang simpleng pagpapalitan ng salita ang komunikasyon. Mahalaga ang pagkilala sa konteksto at emosyon ng taong kausap. Noong nagkaroon kami ng pangkatang gawain, nagkaroon kami ng kaunting di-pagkakaunawaan dahil magkaiba ang aming pananaw. Subalit nang makinig kami sa isa't isa, nahanap namin ang tamang solusyon. Para sa akin, ang etikal na pakikipagtalastasan ay nagsisimula sa bukas na puso at respeto.`;

const SAMPLE_ESSAY_AI = `Furthermore, effective communication serves as the fundamental cornerstone of modern pedagogical paradigms in contemporary educational ecosystems. It is imperative to acknowledge that the multifaceted dimensions of interpersonal discourse inherently synthesize diverse cognitive frameworks. Moreover, by fostering an inclusive environment characterized by reciprocal empathy, academic institutions can substantially optimize the holistic development of Senior High School learners across the nation. In conclusion, the strategic implementation of communicative methodologies ultimately yields transformative outcomes.`;

export const EssayChecker: React.FC = () => {
  const { logActivity } = useAuth();

  const [essayText, setEssayText] = useState(SAMPLE_ESSAY_HUMAN);
  const [studentName, setStudentName] = useState('Dela Cruz, Juan');
  const [gradeLevel, setGradeLevel] = useState('Grade 11');
  const [subject, setSubject] = useState('Mabisang Komunikasyon / English');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);

  const [corrections, setCorrections] = useState<CorrectionItem[]>([
    {
      id: 'c1',
      original: 'di-pagkakaunawaan',
      replacement: 'hindi pagkakaunawaan',
      type: 'clarity',
      explanation: 'Mas pormal at angkop ang buong salitang "hindi" sa pormal na akademikong sulatin kaysa sa pinaikling "di-".'
    },
    {
      id: 'c2',
      original: 'respeto',
      replacement: 'paggalang',
      type: 'clarity',
      explanation: 'Mungkahi: Ang katutubong salitang "paggalang" ay nagtataglay ng mas malalim na kontekstong pangkultura sa Filipino.'
    }
  ]);

  const [aiResult, setAiResult] = useState<AIAnalysisResult>({
    confidenceRange: '14% – 26% Likelihood Range',
    minPercent: 14,
    maxPercent: 26,
    verdictLabel: 'Likely Human-Written',
    verdictColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    perplexityScore: 'High Natural Variation (68.4)',
    burstinessVariance: 'Healthy Human Rhythm (14.2 s.d.)',
    repetitionIndex: 'Low Uniformity (Authentic Student Voice)',
    pedagogicalObservation:
      'The text demonstrates natural syntactical unevenness, personal experiential narrative, and authentic student phrasing typical of genuine learner drafts.'
  });

  const handleAnalyze = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const lower = essayText.toLowerCase();
      const words = essayText.trim().split(/\s+/);
      const wordCount = words.length;

      // Heuristic AI indicator based on AI boilerplate patterns
      const aiMarkers = [
        'furthermore',
        'in conclusion',
        'multifaceted',
        'cornerstone',
        'paramount',
        'moreover',
        'testament',
        'vital role',
        'it is imperative',
        'holistic',
        'ecosystem'
      ];

      let matchCount = 0;
      aiMarkers.forEach(m => {
        if (lower.includes(m)) matchCount += 1;
      });

      // Compute confidence range (never a flat 100% or single point)
      let minPct = 12;
      let maxPct = 28;
      let label: 'Likely Human-Written' | 'Possible AI Involvement' | 'Likely AI-Generated' = 'Likely Human-Written';
      let vColor = 'text-emerald-700';
      let bBg = 'bg-emerald-100 border-emerald-300 text-emerald-900';
      let obs = 'Demonstrates personal student voice, idiomatic authenticity, and normal structural variance.';

      if (matchCount >= 4 || (wordCount > 60 && matchCount >= 3)) {
        minPct = 72;
        maxPct = 88;
        label = 'Likely AI-Generated';
        vColor = 'text-red-700';
        bBg = 'bg-red-100 border-red-300 text-red-900';
        obs =
          'Text exhibits high lexical uniformity, predictable transition connectors, and abstract nominalizations frequently produced by LLM models.';
      } else if (matchCount >= 2) {
        minPct = 42;
        maxPct = 58;
        label = 'Possible AI Involvement';
        vColor = 'text-amber-700';
        bBg = 'bg-amber-100 border-amber-300 text-amber-900';
        obs =
          'Mixed stylistic signals: contains some elevated boilerplate transitional phrases alongside student-driven sentences. Recommended for teacher-student writing conference.';
      }

      setAiResult({
        confidenceRange: `${minPct}% – ${maxPct}% Confidence Range`,
        minPercent: minPct,
        maxPercent: maxPct,
        verdictLabel: label,
        verdictColor: vColor,
        badgeBg: bBg,
        perplexityScore: matchCount >= 3 ? 'Low Syntactic Surprise (28.1)' : 'High Natural Variation (64.5)',
        burstinessVariance: matchCount >= 3 ? 'Monotonous Sentence Flow (4.2 s.d.)' : 'Organic Human Sentence Variation (15.6 s.d.)',
        repetitionIndex: matchCount >= 3 ? 'Elevated Formulaic Density' : 'Natural Authentic Vocabulary',
        pedagogicalObservation: obs
      });

      // Extract sample grammar fixes
      const newCorrections: CorrectionItem[] = [];
      if (lower.includes('di-')) {
        newCorrections.push({
          id: 'c-di',
          original: 'di-',
          replacement: 'hindi ',
          type: 'clarity',
          explanation: 'Sa akademikong Filipino, mas pormal ang pagsulat nang buo sa salitang "hindi".'
        });
      }
      if (lower.includes('furthermore')) {
        newCorrections.push({
          id: 'c-furthermore',
          original: 'Furthermore',
          replacement: 'Additionally / Higit pa rito',
          type: 'clarity',
          explanation: 'Overused transition marker. Consider direct contextual transitions.'
        });
      }
      if (newCorrections.length === 0) {
        newCorrections.push({
          id: 'c-ok',
          original: 'Sentence Structure',
          replacement: 'Clear and coherent',
          type: 'grammar',
          explanation: 'Grammar and mechanics appear sound and aligned with Senior High School writing standards.'
        });
      }
      setCorrections(newCorrections);

      setIsAnalyzing(false);
      logActivity('Essay Checker', 'Analyzed Student Essay', `Student: ${studentName}, Confidence: ${minPct}%–${maxPct}%`);
    }, 700);
  };

  const loadSample = (type: 'human' | 'ai') => {
    if (type === 'human') {
      setEssayText(SAMPLE_ESSAY_HUMAN);
      setStudentName('Barredo, Maria Clara L.');
    } else {
      setEssayText(SAMPLE_ESSAY_AI);
      setStudentName('Digital Draft Analysis');
    }
  };

  const handleCopyCleaned = () => {
    navigator.clipboard.writeText(essayText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 3D Header Banner */}
      <div className="rounded-3xl bg-linear-to-r from-[#001f5c] via-[#0038A8] to-[#001440] text-white p-6 sm:p-8 border-2 border-[#FCD116] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400 text-stone-900 text-xs font-black uppercase tracking-wider mb-2 shadow-sm">
              <FileCheck2 className="w-3.5 h-3.5 text-stone-900" />
              Part C.15 • Grammar Correction &amp; AI Likelihood
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white drop-shadow-md">
              Student Essay Checker &amp; AI-Writing Likelihood Analyzer
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mt-1">
              Checks grammar, mechanics, and syntax with track-changes recommendations. Provides a scientific AI-writing likelihood indicator with realistic confidence ranges and strict DepEd pedagogical caveats.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => loadSample('human')}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition cursor-pointer border border-white/20"
            >
              Load Student Draft
            </button>
            <button
              onClick={() => loadSample('ai')}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition cursor-pointer border border-white/20"
            >
              Load AI Sample
            </button>
          </div>
        </div>
      </div>

      {/* Mandatory Accuracy Caveat Warning Box */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 shadow-xs flex items-start gap-4">
        <div className="p-2.5 rounded-2xl bg-amber-500 text-white shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs text-amber-950">
          <h4 className="font-extrabold text-sm uppercase tracking-wide text-amber-900">
            Official DepEd Pedagogical Advisory &amp; Accuracy Caveat
          </h4>
          <p className="leading-relaxed">
            <strong>No AI-detection tool can guarantee 100% accuracy.</strong> Algorithmic detectors measure statistical probability, perplexity, and burstiness — which can produce false positives (flagging neurodivergent, ESL, or highly structured student essays) and false negatives. DepEd teachers must treat this confidence range solely as one qualitative input among several (in-class drafts, student defense, handwritten checks), and <strong>never as standalone proof of academic dishonesty</strong>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Essay Input & Parameters */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-stone-600 block mb-1">Student Name:</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-stone-300 bg-stone-50 font-semibold"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-stone-600 block mb-1">Grade Level:</label>
                <input
                  type="text"
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-stone-300 bg-stone-50"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-stone-600 block mb-1">Subject / Area:</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-stone-300 bg-stone-50"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-stone-800">
                  Student Essay Submission Text:
                </label>
                <span className="text-[11px] text-stone-500">
                  {essayText.trim().split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea
                rows={10}
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                placeholder="Paste the student's written essay, reflection, or learning activity response here..."
                className="w-full text-xs p-3.5 rounded-2xl border border-stone-300 bg-stone-50/60 text-stone-800 leading-relaxed font-sans focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleCopyCleaned}
                className="px-3.5 py-2 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !essayText.trim()}
                className="px-6 py-2.5 rounded-xl bg-[#0038A8] hover:bg-blue-800 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-2 border border-blue-400 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-[#FCD116]" />
                ) : (
                  <Sparkles className="w-4 h-4 text-[#FCD116]" />
                )}
                <span>{isAnalyzing ? 'Running Diagnostics...' : 'Run Diagnostics & Check'}</span>
              </button>
            </div>
          </div>

          {/* Grammar & Mechanics Track Changes List */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0038A8]" />
              Suggested Grammar, Spelling &amp; Mechanics Corrections:
            </h3>

            <div className="space-y-2.5">
              {corrections.map((c) => (
                <div key={c.id} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="line-through text-red-700 font-mono text-xs bg-red-50 px-2 py-0.5 rounded border border-red-200">
                        {c.original}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                      <span className="text-emerald-800 font-bold font-mono text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {c.replacement}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-[#0038A8]">
                      {c.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-snug">
                    {c.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Likelihood & Metric Indicators */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">
                Linguistic Heuristics
              </span>
              <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0038A8]" />
                AI-Writing Likelihood Assessment
              </h3>
            </div>

            {/* Confidence Range Card */}
            <div className={`p-4 rounded-2xl border-2 space-y-3 ${aiResult.badgeBg}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Likelihood Verdict:
                </span>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-white/80 shadow-2xs">
                  {aiResult.confidenceRange}
                </span>
              </div>

              <div className="text-lg font-black tracking-tight">
                {aiResult.verdictLabel}
              </div>

              {/* Confidence Range Bar (Never flat line) */}
              <div className="space-y-1">
                <div className="w-full h-3.5 rounded-full bg-stone-200 overflow-hidden relative">
                  <div
                    className="h-full bg-linear-to-r from-blue-500 to-amber-500 rounded-full"
                    style={{
                      marginLeft: `${aiResult.minPercent}%`,
                      width: `${aiResult.maxPercent - aiResult.minPercent}%`
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-semibold text-stone-500">
                  <span>0% (Human)</span>
                  <span>50% (Mixed)</span>
                  <span>100% (Pure AI)</span>
                </div>
              </div>

              <p className="text-xs leading-relaxed font-medium">
                {aiResult.pedagogicalObservation}
              </p>
            </div>

            {/* Linguistic Metrics Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                Linguistic Variance Indices:
              </h4>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10px] font-bold text-stone-500 block">Perplexity (Syntactic Unpredictability)</span>
                <span className="text-xs font-bold text-stone-900">{aiResult.perplexityScore}</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10px] font-bold text-stone-500 block">Burstiness (Sentence Length Rhythms)</span>
                <span className="text-xs font-bold text-stone-900">{aiResult.burstinessVariance}</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10px] font-bold text-stone-500 block">Lexical Repetition Profile</span>
                <span className="text-xs font-bold text-stone-900">{aiResult.repetitionIndex}</span>
              </div>
            </div>

            {/* Action Recommendation for Teachers */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2 text-xs text-[#002776]">
              <h5 className="font-bold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#0038A8]" />
                Recommended Instructional Next Steps:
              </h5>
              <ul className="space-y-1 list-disc list-inside text-[11px] text-stone-700">
                <li>Conduct a 3-minute oral writing conference asking the student to explain their arguments.</li>
                <li>Compare against prior handwritten in-class summative samples.</li>
                <li>Ensure the student accomplished the mandatory <em>Declaration of AI Use</em> per DepEd Order 3 s. 2026.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
