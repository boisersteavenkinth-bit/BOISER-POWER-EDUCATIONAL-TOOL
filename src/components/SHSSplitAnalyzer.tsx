import React, { useState } from 'react';
import {
  Scale,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Calculator,
  ArrowRight,
  Sparkles,
  Info,
  Layers,
  Award
} from 'lucide-react';
import {
  GRADE_11_WEIGHTS,
  GRADE_12_TRANSITION_WEIGHTS,
  transmuteInitialGrade,
  getQualitativeDescriptor,
  calculateExamScore30_30_40
} from '../data/gradingRules';

export const SHSSplitAnalyzer: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<'11' | '12'>('11');
  const [selectedSubjectTrack, setSelectedSubjectTrack] = useState<string>('Effective Communication (Prescribed)');
  const [isPilotSchool, setIsPilotSchool] = useState<boolean>(false);

  // Grade inputs (percentage 0-100)
  const [wwScore, setWwScore] = useState<number>(88);
  const [ptScore, setPtScore] = useState<number>(92);
  const [st1Score, setSt1Score] = useState<number>(85);
  const [st2Score, setSt2Score] = useState<number>(89);
  const [termExamScore, setTermExamScore] = useState<number>(90);

  // Compute active weights
  const currentWeights =
    selectedGrade === '11'
      ? GRADE_11_WEIGHTS[selectedSubjectTrack] || { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 }
      : GRADE_12_TRANSITION_WEIGHTS[selectedSubjectTrack] || { writtenWorks: 25, performanceTasks: 50, quarterlyExam: 25 };

  // Calculate examination component
  const examPercentage = calculateExamScore30_30_40(st1Score, st2Score, termExamScore);

  // Calculate weighted initial grade (0 to 100)
  const initialGrade =
    (wwScore * (currentWeights.writtenWorks / 100)) +
    (ptScore * (currentWeights.performanceTasks / 100)) +
    (examPercentage * (currentWeights.quarterlyExam / 100));

  const transmutedGrade = transmuteInitialGrade(initialGrade);
  const descriptor = getQualitativeDescriptor(transmutedGrade);

  const handleGradeSwitch = (grade: '11' | '12') => {
    setSelectedGrade(grade);
    if (grade === '11') {
      setSelectedSubjectTrack('Effective Communication (Prescribed)');
    } else {
      setSelectedSubjectTrack('Prescribed Subjects (All Tracks)');
    }
  };

  return (
    <div className="space-y-8">
      {/* Overview Banner - DepEd Blue & Gold */}
      <div className="bg-[#0038A8] text-white rounded-3xl p-6 sm:p-8 shadow-sm border-b-4 border-[#FCD116] relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-[#FCD116] text-[#0038A8] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <AlertTriangle className="w-3.5 h-3.5" />
              DepEd Order No. 015, s. 2026 • Paragraph 49
            </span>
            <span className="text-xs text-blue-100">Official Curriculum Transition</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
            Senior High School Split: Grade 11 vs. Grade 12
          </h2>

          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            In SY 2026–2027, Grade 11 fully adopts the <strong className="text-[#FCD116]">Strengthened SHS Curriculum</strong> (2 tracks, 5 prescribed subjects, DO 015 weights). Concurrently, Grade 12 remains under the <strong className="text-white">Old SHS Curriculum (DO 8, s. 2015)</strong>, yet mapped into the new 3-term calendar with the 2026 adjusted transmutation table.
          </p>
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Grade 11 Card */}
        <div className="bg-white rounded-3xl p-6 border-2 border-[#0038A8]/30 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-[#0038A8] text-xs font-extrabold tracking-wide border border-blue-200">
              GRADE 11 (Full Implementation)
            </span>
            <span className="text-xs font-semibold text-[#0038A8]">DO 015, s. 2026</span>
          </div>

          <h3 className="text-lg font-bold text-stone-900 font-display">
            Strengthened Senior High School Curriculum
          </h3>

          <ul className="text-xs space-y-2.5 text-stone-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0038A8] shrink-0 mt-0.5" />
              <span>
                <strong className="text-stone-900">2 Tracks Only:</strong> Academic Track & Technical-Professional (TechPro) Track.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0038A8] shrink-0 mt-0.5" />
              <span>
                <strong className="text-stone-900">5 Streamlined Prescribed Subjects:</strong> Effective Communication, Mabisang Komunikasyon, General Mathematics, General Science, Pag-aaral ng Kasaysayan at Lipunang Pilipino + Life and Career Skills.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0038A8] shrink-0 mt-0.5" />
              <span>
                <strong className="text-stone-900">New DO 015 Weights:</strong> Written Works (20–35%), Performance Tasks (45–60%), Quarterly/Term Exam (20–25%).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0038A8] shrink-0 mt-0.5" />
              <span>
                <strong className="text-stone-900">TechPro Electives:</strong> Verified across FCS, Industrial Arts, ICT, and Maritime clusters.
              </span>
            </li>
          </ul>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-stone-400">Status in Database</span>
            <span className="font-bold text-[#0038A8]">transition_flag: false</span>
          </div>
        </div>

        {/* Grade 12 Card */}
        <div className="bg-white rounded-3xl p-6 border-2 border-[#CE1126]/30 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-red-100 text-[#CE1126] text-xs font-extrabold tracking-wide border border-red-200">
              GRADE 12 (Transition Provision)
            </span>
            <span className="text-xs font-semibold text-[#CE1126]">DO 8, s. 2015 + DO 015 Par. 49</span>
          </div>

          <h3 className="text-lg font-bold text-stone-900 font-display">
            Old SHS Curriculum (Transition Year)
          </h3>

          <ul className="text-xs space-y-2.5 text-stone-600">
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#CE1126] shrink-0 mt-0.5" />
              <span>
                <strong className="text-stone-900">4 Original Tracks:</strong> Academic, TVL, Sports, and Arts & Design.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#CE1126] shrink-0 mt-0.5" />
              <span>
                <strong className="text-stone-900">Retained DO 8, s. 2015 Weights:</strong> Prescribed Subjects: WW 25%, PT 50%, QA 25%. Academic: WW 25%, PT 45%, QA 30%. TVL: WW 20%, PT 60%, QA 20%.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#CE1126] shrink-0 mt-0.5" />
              <span>
                <strong className="text-stone-900">Exam Sub-weighting (30-30-40):</strong> ST 1 (30%), ST 2 (30%), Term Exam (40%) across the 3 terms.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#CE1126] shrink-0 mt-0.5" />
              <span>
                <strong className="text-stone-900">Pilot School Exception:</strong> Standard schools: 80 hrs. ~900 pilot schools: 320 hrs TechPro / 80 hrs optional Academic exposure.
              </span>
            </li>
          </ul>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-stone-400">Status in Database</span>
            <span className="font-bold text-[#CE1126]">transition_flag: true</span>
          </div>
        </div>
      </div>

      {/* Interactive Grade Transmutation & Qualitative Descriptor Calculator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-700" />
              <h3 className="text-lg font-bold font-display text-stone-900">
                Official SY 2026–2027 Grade & Transmutation Calculator
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Computes weighted initial grade, looks up DepEd transmutation, and assigns official Qualitative Descriptors.
            </p>
          </div>

          {/* Grade 11 vs 12 Toggle */}
          <div className="inline-flex p-1 rounded-2xl bg-stone-100 border border-stone-200">
            <button
              onClick={() => handleGradeSwitch('11')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedGrade === '11'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Grade 11 (DO 015)
            </button>
            <button
              onClick={() => handleGradeSwitch('12')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedGrade === '12'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Grade 12 (DO 8 + Transmutation)
            </button>
          </div>
        </div>

        {/* Configuration Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              Subject Weight Profile
            </label>
            <select
              value={selectedSubjectTrack}
              onChange={(e) => setSelectedSubjectTrack(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-medium text-stone-800"
            >
              {selectedGrade === '11' ? (
                Object.keys(GRADE_11_WEIGHTS).map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))
              ) : (
                Object.keys(GRADE_12_TRANSITION_WEIGHTS).map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-[11px] font-semibold text-stone-400 block mb-1">
              Active Assessment Distribution
            </span>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="px-2 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                WW: {currentWeights.writtenWorks}%
              </span>
              <span className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                PT: {currentWeights.performanceTasks}%
              </span>
              <span className="px-2 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200">
                Exam: {currentWeights.quarterlyExam}%
              </span>
            </div>
          </div>

          {/* Pilot School Exception Flag */}
          {selectedGrade === '12' && (
            <div className="flex flex-col justify-center">
              <label className="flex items-center gap-2 p-2 rounded-xl border border-amber-200 bg-amber-50/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPilotSchool}
                  onChange={(e) => setIsPilotSchool(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-0"
                />
                <span className="text-[11px] font-bold text-amber-900">
                  Pilot School (320h TechPro / 80h Academic)
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Input sliders / numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
          {/* Written Works */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700">Written Works (WW)</span>
              <span className="text-xs font-extrabold text-blue-700 font-mono">{wwScore}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={wwScore}
              onChange={(e) => setWwScore(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <span className="text-[10px] text-stone-400 block">Weight: {currentWeights.writtenWorks}%</span>
          </div>

          {/* Performance Tasks */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700">Performance Tasks (PT)</span>
              <span className="text-xs font-extrabold text-emerald-700 font-mono">{ptScore}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={ptScore}
              onChange={(e) => setPtScore(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <span className="text-[10px] text-stone-400 block">Weight: {currentWeights.performanceTasks}%</span>
          </div>

          {/* Summative Test 1 */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700">Summative Test 1 (ST1)</span>
              <span className="text-xs font-extrabold text-purple-700 font-mono">{st1Score}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={st1Score}
              onChange={(e) => setSt1Score(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <span className="text-[10px] text-stone-400 block">Exam Sub-weight: 30%</span>
          </div>

          {/* Summative Test 2 */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700">Summative Test 2 (ST2)</span>
              <span className="text-xs font-extrabold text-purple-700 font-mono">{st2Score}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={st2Score}
              onChange={(e) => setSt2Score(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <span className="text-[10px] text-stone-400 block">Exam Sub-weight: 30%</span>
          </div>

          {/* Term Exam */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700">Term Examination</span>
              <span className="text-xs font-extrabold text-purple-700 font-mono">{termExamScore}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={termExamScore}
              onChange={(e) => setTermExamScore(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <span className="text-[10px] text-stone-400 block">Exam Sub-weight: 40%</span>
          </div>
        </div>

        {/* Results Panel */}
        <div className="p-6 rounded-3xl bg-stone-900 text-white flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              Calculated Outcomes • SY 2026–2027
            </span>
            <div className="flex items-baseline gap-4">
              <div>
                <span className="text-xs text-stone-400 block">Initial Grade</span>
                <span className="text-2xl font-bold font-mono text-stone-200">
                  {initialGrade.toFixed(2)}
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-stone-600" />
              <div>
                <span className="text-xs text-amber-400 font-semibold block">Transmuted Grade</span>
                <span className="text-4xl font-extrabold font-mono text-amber-400">
                  {transmutedGrade}
                </span>
              </div>
            </div>
          </div>

          {/* Qualitative Descriptor Badge */}
          <div className="p-4 rounded-2xl bg-stone-800 border border-stone-700/80 space-y-2 max-w-md">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold text-stone-400 uppercase">Qualitative Descriptor:</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-stone-900 text-white border border-stone-700">
                {descriptor.descriptor}
              </span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed font-sans">
              "{descriptor.meaning}"
            </p>
            <div className="text-[11px] font-semibold text-stone-400 flex items-center gap-2">
              <span>Status:</span>
              <span className={descriptor.isPassing ? 'text-emerald-400' : 'text-rose-400'}>
                {descriptor.isPassing ? '✓ Passing Standard' : '✗ Needs Remediation'}
              </span>
            </div>
          </div>
        </div>

        {/* Descriptor Reference Table */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
            Official SY 2026–2027 Qualitative Descriptor Reference Table
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="font-bold text-emerald-800 block">Advancing</span>
              <span className="font-mono text-xs text-emerald-900 font-extrabold">90 – 100</span>
              <p className="text-[11px] text-emerald-700 mt-1">Exceeds standards with deep independence.</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
              <span className="font-bold text-blue-800 block">Benchmarking</span>
              <span className="font-mono text-xs text-blue-900 font-extrabold">80 – 89</span>
              <p className="text-[11px] text-blue-700 mt-1">Competent, generally independent.</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <span className="font-bold text-amber-800 block">Connecting</span>
              <span className="font-mono text-xs text-amber-900 font-extrabold">75 – 79</span>
              <p className="text-[11px] text-amber-700 mt-1">Sufficient; occasional guidance.</p>
            </div>
            <div className="p-3 rounded-xl bg-orange-50 border border-orange-200">
              <span className="font-bold text-orange-800 block">Developing</span>
              <span className="font-mono text-xs text-orange-900 font-extrabold">65 – 74</span>
              <p className="text-[11px] text-orange-700 mt-1">Partial; needs targeted remediation.</p>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
              <span className="font-bold text-rose-800 block">Emerging</span>
              <span className="font-mono text-xs text-rose-900 font-extrabold">0 – 64</span>
              <p className="text-[11px] text-rose-700 mt-1">Has not met foundational criteria.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
