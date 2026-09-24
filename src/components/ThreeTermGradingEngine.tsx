import React, { useState } from 'react';
import {
  Calculator,
  FileSpreadsheet,
  Award,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Download,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  BookOpen,
  GraduationCap,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  transmuteInitialGrade,
  getQualitativeDescriptor,
  calculateExamScore30_30_40,
  computeThreeTermFinalGrade,
  K10_ASSESSMENT_WEIGHTS,
  GRADE_11_WEIGHTS,
  GRADE_12_TRANSITION_WEIGHTS
} from '../data/gradingRules';
import { AssessmentWeights } from '../types';

interface TermScores {
  ww: number; // 0-100%
  pt: number; // 0-100%
  st1: number; // 0-100%
  st2: number; // 0-100%
  te: number; // 0-100%
}

interface SubjectGradingRow {
  id: string;
  subjectTitle: string;
  weightCategory: string;
  weights: AssessmentWeights;
  term1: TermScores;
  term2: TermScores;
  term3: TermScores;
}

// Preset subjects per grade level
const GRADE_PRESETS: Record<string, { label: string; framework: string; subjects: Omit<SubjectGradingRow, 'term1' | 'term2' | 'term3'>[] }> = {
  'Grade 1': {
    label: 'Grade 1 (Key Stage 1 - MATATAG)',
    framework: 'Revised K–10 (DO 015, s. 2026)',
    subjects: [
      {
        id: 'g1-makabansa',
        subjectTitle: 'Makabansa',
        weightCategory: 'Araling Panlipunan (AP) / Makabansa',
        weights: { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 }
      },
      {
        id: 'g1-gmrc',
        subjectTitle: 'Good Moral and Right Conduct (GMRC)',
        weightCategory: 'GMRC / Values Education',
        weights: { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 }
      },
      {
        id: 'g1-lang',
        subjectTitle: 'Language (First Language / English)',
        weightCategory: 'Languages (English, Filipino, Reading)',
        weights: { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 }
      },
      {
        id: 'g1-read',
        subjectTitle: 'Reading and Literacy',
        weightCategory: 'Languages (English, Filipino, Reading)',
        weights: { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 }
      },
      {
        id: 'g1-math',
        subjectTitle: 'Mathematics',
        weightCategory: 'Mathematics',
        weights: { writtenWorks: 35, performanceTasks: 45, quarterlyExam: 20 }
      }
    ]
  },
  'Grade 4': {
    label: 'Grade 4 (Key Stage 2 - Intermediate)',
    framework: 'Revised K–10 (DO 015, s. 2026)',
    subjects: [
      {
        id: 'g4-eng',
        subjectTitle: 'English',
        weightCategory: 'Languages (English, Filipino, Reading)',
        weights: { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 }
      },
      {
        id: 'g4-fil',
        subjectTitle: 'Filipino',
        weightCategory: 'Languages (English, Filipino, Reading)',
        weights: { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 }
      },
      {
        id: 'g4-sci',
        subjectTitle: 'Science',
        weightCategory: 'Science',
        weights: { writtenWorks: 35, performanceTasks: 45, quarterlyExam: 20 }
      },
      {
        id: 'g4-math',
        subjectTitle: 'Mathematics',
        weightCategory: 'Mathematics',
        weights: { writtenWorks: 35, performanceTasks: 45, quarterlyExam: 20 }
      },
      {
        id: 'g4-ap',
        subjectTitle: 'Araling Panlipunan (AP)',
        weightCategory: 'Araling Panlipunan (AP) / Makabansa',
        weights: { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 }
      },
      {
        id: 'g4-epp',
        subjectTitle: 'Edukasyong Pantahanan at Pangkabuhayan (EPP)',
        weightCategory: 'EPP / TLE',
        weights: { writtenWorks: 20, performanceTasks: 60, quarterlyExam: 20 }
      },
      {
        id: 'g4-mapeh',
        subjectTitle: 'MAPEH (Music, Arts, PE, Health)',
        weightCategory: 'MAPEH (Music, Arts, PE, Health)',
        weights: { writtenWorks: 20, performanceTasks: 60, quarterlyExam: 20 }
      },
      {
        id: 'g4-gmrc',
        subjectTitle: 'GMRC / Values Education',
        weightCategory: 'GMRC / Values Education',
        weights: { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 }
      }
    ]
  },
  'Grade 7': {
    label: 'Grade 7 (Key Stage 3 - Junior High School)',
    framework: 'Revised K–10 (DO 015, s. 2026)',
    subjects: [
      {
        id: 'g7-eng',
        subjectTitle: 'English 7',
        weightCategory: 'Languages (English, Filipino, Reading)',
        weights: { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 }
      },
      {
        id: 'g7-fil',
        subjectTitle: 'Filipino 7',
        weightCategory: 'Languages (English, Filipino, Reading)',
        weights: { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 }
      },
      {
        id: 'g7-sci',
        subjectTitle: 'Science 7 (Integrated STEM)',
        weightCategory: 'Science',
        weights: { writtenWorks: 35, performanceTasks: 45, quarterlyExam: 20 }
      },
      {
        id: 'g7-math',
        subjectTitle: 'Mathematics 7',
        weightCategory: 'Mathematics',
        weights: { writtenWorks: 35, performanceTasks: 45, quarterlyExam: 20 }
      },
      {
        id: 'g7-ap',
        subjectTitle: 'Araling Panlipunan 7',
        weightCategory: 'Araling Panlipunan (AP) / Makabansa',
        weights: { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 }
      },
      {
        id: 'g7-tle',
        subjectTitle: 'Technology & Livelihood Education (TLE)',
        weightCategory: 'EPP / TLE',
        weights: { writtenWorks: 20, performanceTasks: 60, quarterlyExam: 20 }
      },
      {
        id: 'g7-mapeh',
        subjectTitle: 'MAPEH 7',
        weightCategory: 'MAPEH (Music, Arts, PE, Health)',
        weights: { writtenWorks: 20, performanceTasks: 60, quarterlyExam: 20 }
      },
      {
        id: 'g7-ve',
        subjectTitle: 'Values Education 7',
        weightCategory: 'GMRC / Values Education',
        weights: { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 }
      }
    ]
  },
  'Grade 11': {
    label: 'Grade 11 (Key Stage 4 - Strengthened SHS)',
    framework: 'Strengthened SHS (DO 015, s. 2026)',
    subjects: [
      {
        id: 'g11-ec',
        subjectTitle: 'Effective Communication (English 11)',
        weightCategory: 'Languages',
        weights: { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 }
      },
      {
        id: 'g11-mk',
        subjectTitle: 'Mabisang Komunikasyon (Filipino 11)',
        weightCategory: 'Languages',
        weights: { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 }
      },
      {
        id: 'g11-gm',
        subjectTitle: 'General Mathematics',
        weightCategory: 'Mathematics',
        weights: { writtenWorks: 35, performanceTasks: 45, quarterlyExam: 20 }
      },
      {
        id: 'g11-gs',
        subjectTitle: 'General Science',
        weightCategory: 'Science',
        weights: { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 }
      },
      {
        id: 'g11-ap',
        subjectTitle: 'Pag-aaral ng Kasaysayan at Lipunang Pilipino',
        weightCategory: 'Social Studies',
        weights: { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 }
      },
      {
        id: 'g11-techpro',
        subjectTitle: 'TechPro Elective: Computer Systems Servicing (CSS)',
        weightCategory: 'TechPro Practical Laboratory',
        weights: { writtenWorks: 20, performanceTasks: 60, quarterlyExam: 20 }
      }
    ]
  },
  'Grade 12': {
    label: 'Grade 12 (Key Stage 4 - Transition Arrangement)',
    framework: 'DO 8, s. 2015 + DO 015 Par. 49 Transition',
    subjects: [
      {
        id: 'g12-mil',
        subjectTitle: 'Media and Information Literacy (MIL)',
        weightCategory: 'Prescribed Subjects (All Tracks)',
        weights: { writtenWorks: 25, performanceTasks: 50, quarterlyExam: 25 }
      },
      {
        id: 'g12-pr2',
        subjectTitle: 'Practical Research 2 (Applied Academic)',
        weightCategory: 'Academic Track (Non-Immersion)',
        weights: { writtenWorks: 25, performanceTasks: 45, quarterlyExam: 30 }
      },
      {
        id: 'g12-lit',
        subjectTitle: '21st Century Literature from the Philippines and the World',
        weightCategory: 'Prescribed Subjects (All Tracks)',
        weights: { writtenWorks: 25, performanceTasks: 50, quarterlyExam: 25 }
      },
      {
        id: 'g12-cpar',
        subjectTitle: 'Contemporary Philippine Arts from the Regions',
        weightCategory: 'Prescribed Subjects (All Tracks)',
        weights: { writtenWorks: 25, performanceTasks: 50, quarterlyExam: 25 }
      },
      {
        id: 'g12-wi',
        subjectTitle: 'Work Immersion / Culminating Activity',
        weightCategory: 'Work Immersion (Academic)',
        weights: { writtenWorks: 35, performanceTasks: 40, quarterlyExam: 25 }
      }
    ]
  }
};

const createDefaultScores = (wwBase: number, ptBase: number, examBase: number): TermScores => ({
  ww: wwBase,
  pt: ptBase,
  st1: examBase - 2,
  st2: examBase + 1,
  te: examBase + 3
});

export const ThreeTermGradingEngine: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<string>('Grade 11');
  const [learnerName, setLearnerName] = useState<string>('Dela Cruz, Juan M.');
  const [lrn, setLrn] = useState<string>('123456789012');
  const [section, setSection] = useState<string>('11 - Rizal (Academic Track)');
  const [schoolName, setSchoolName] = useState<string>('National High School - Division of DepEd');
  const [viewMode, setViewMode] = useState<'calculator' | 'sf9-preview'>('calculator');
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(null);

  // Initialize subject rows
  const [subjectRows, setSubjectRows] = useState<SubjectGradingRow[]>(() => {
    const preset = GRADE_PRESETS['Grade 11'];
    return preset.subjects.map((sub, idx) => ({
      ...sub,
      term1: createDefaultScores(88 - idx, 92 - idx, 86 + idx),
      term2: createDefaultScores(90 - idx, 93 - idx, 88 + idx),
      term3: createDefaultScores(91 - idx, 95 - idx, 90 + idx)
    }));
  });

  // Handle grade change
  const handleGradeChange = (newGrade: string) => {
    setSelectedGrade(newGrade);
    const preset = GRADE_PRESETS[newGrade];
    if (preset) {
      setSubjectRows(
        preset.subjects.map((sub, idx) => ({
          ...sub,
          term1: createDefaultScores(87 - (idx % 3), 90 - (idx % 2), 85 + (idx % 4)),
          term2: createDefaultScores(89 - (idx % 2), 92 - (idx % 3), 87 + (idx % 3)),
          term3: createDefaultScores(91 - (idx % 3), 94 - (idx % 2), 89 + (idx % 4))
        }))
      );
      if (newGrade === 'Grade 11') {
        setSection('11 - Mabini (TechPro Track)');
      } else if (newGrade === 'Grade 12') {
        setSection('12 - Bonifacio (Academic Track - DO 015 Par 49)');
      } else {
        setSection(`${newGrade.replace('Grade ', '')} - Diamond`);
      }
    }
  };

  // Helper to compute a single term's transmuted grade
  const computeTermGrade = (row: SubjectGradingRow, termKey: 'term1' | 'term2' | 'term3'): {
    initialGrade: number;
    transmutedGrade: number;
    examPercent: number;
  } => {
    const scores = row[termKey];
    const examPercent = calculateExamScore30_30_40(scores.st1, scores.st2, scores.te);
    const initialGrade =
      (scores.ww * (row.weights.writtenWorks / 100)) +
      (scores.pt * (row.weights.performanceTasks / 100)) +
      (examPercent * (row.weights.quarterlyExam / 100));
    const transmutedGrade = transmuteInitialGrade(initialGrade);
    return { initialGrade, transmutedGrade, examPercent };
  };

  // Compute final grade for a subject row
  const computeSubjectFinal = (row: SubjectGradingRow) => {
    const t1 = computeTermGrade(row, 'term1').transmutedGrade;
    const t2 = computeTermGrade(row, 'term2').transmutedGrade;
    const t3 = computeTermGrade(row, 'term3').transmutedGrade;
    const finalGrade = computeThreeTermFinalGrade(t1, t2, t3);
    const descriptor = getQualitativeDescriptor(finalGrade);
    return {
      t1,
      t2,
      t3,
      finalGrade,
      descriptor,
      isPassed: finalGrade >= 75
    };
  };

  // Compute general average across all subjects
  const allFinalGrades = subjectRows.map((row) => computeSubjectFinal(row).finalGrade);
  const generalAverage =
    allFinalGrades.length > 0
      ? Math.round((allFinalGrades.reduce((a, b) => a + b, 0) / allFinalGrades.length) * 100) / 100
      : 0;
  const generalTransmuted = Math.round(generalAverage);
  const generalDescriptor = getQualitativeDescriptor(generalTransmuted);

  // Update a specific term component score
  const updateScore = (
    subjectId: string,
    term: 'term1' | 'term2' | 'term3',
    field: keyof TermScores,
    value: number
  ) => {
    setSubjectRows((prev) =>
      prev.map((row) => {
        if (row.id === subjectId) {
          return {
            ...row,
            [term]: {
              ...row[term],
              [field]: Math.max(0, Math.min(100, value))
            }
          };
        }
        return row;
      })
    );
  };

  const [showSummarySlip, setShowSummarySlip] = useState(false);

  // Export as CSV
  const handleExportCSV = () => {
    const headers = [
      'Learning Area',
      'WW Weight (%)',
      'PT Weight (%)',
      'Exam Weight (%)',
      'Term 1 Grade',
      'Term 2 Grade',
      'Term 3 Grade',
      'Final Grade (Average of 3 Terms)',
      'Qualitative Descriptor',
      'Remarks'
    ];

    const rows = subjectRows.map((row) => {
      const outcome = computeSubjectFinal(row);
      return [
        `"${row.subjectTitle}"`,
        row.weights.writtenWorks,
        row.weights.performanceTasks,
        row.weights.quarterlyExam,
        outcome.t1,
        outcome.t2,
        outcome.t3,
        outcome.finalGrade,
        `"${outcome.descriptor.descriptor}"`,
        outcome.isPassed ? 'PASSED' : 'REMEDIATION'
      ];
    });

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      `"Learner: ${learnerName}","LRN: ${lrn}","Grade: ${selectedGrade}","SY: 2026-2027 (DO 009, s. 2026)"\n` +
      `"General Average: ${generalTransmuted}","Descriptor: ${generalDescriptor.descriptor}"\n\n` +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SF9_${learnerName.replace(/\s+/g, '_')}_SY2026_2027.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner - DepEd Blue with Gold Accent */}
      <div className="bg-[#0038A8] text-white rounded-3xl p-6 sm:p-8 shadow-xs space-y-4 border-b-4 border-[#FCD116]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-[#FCD116] text-[#0038A8] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <Calculator className="w-3.5 h-3.5" />
              DepEd Order No. 009 & 015, s. 2026
            </span>
            <span className="text-xs text-blue-100">
              Three-Term Grading System & SF9 Progress Card
            </span>
          </div>

          {/* View Mode Toggle */}
          <div className="inline-flex p-1 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20">
            <button
              onClick={() => setViewMode('calculator')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'calculator'
                  ? 'bg-white text-[#0038A8] shadow-xs'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>3-Term E-Class Record</span>
            </button>
            <button
              onClick={() => setViewMode('sf9-preview')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'sf9-preview'
                  ? 'bg-[#FCD116] text-[#0038A8] shadow-xs'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>SF9 Report Card Preview</span>
            </button>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
          Three-Term (Trimester) Grading Period & SF9 System
        </h2>

        <p className="text-xs sm:text-sm text-blue-100 max-w-3xl leading-relaxed">
          In accordance with <strong>DepEd Order No. 009, s. 2026</strong>, evaluation cycles have transitioned from four quarterly periods to <strong>three terms</strong> (Term 1, Term 2, Term 3). Each term evaluates <strong>Written Works (WW)</strong>, <strong>Performance Tasks (PT)</strong>, and <strong>Term Examinations (TE / QA)</strong>. The Final Grade for each learning area is computed as the arithmetic average of the 3 Term Grades.
        </p>

        {/* Quick Rule Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-2xl bg-white/10 border border-white/15">
            <span className="text-[#FCD116] font-bold block mb-1">1. Three Grading Periods</span>
            <p className="text-blue-100 text-[11px]">
              Students receive grades three times per school year: <strong>Term 1</strong>, <strong>Term 2</strong>, and <strong>Term 3</strong> on SF9.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white/10 border border-white/15">
            <span className="text-[#FCD116] font-bold block mb-1">2. Average of 3 Terms</span>
            <p className="text-blue-100 text-[11px]">
              Final Grade = <code>round((Term 1 + Term 2 + Term 3) / 3)</code>, assigned with official Qualitative Descriptors.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white/10 border border-white/15">
            <span className="text-[#FCD116] font-bold block mb-1">3. Prescribed Weighting (DO 015)</span>
            <p className="text-blue-100 text-[11px]">
              WW (20–35%), PT (45–60%), TE (20–30%) based on learning area & Key Stage (Grade 12 retains DO 8 via Par. 49).
            </p>
          </div>
        </div>
      </div>

      {/* Configuration & Controls */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Select Grade Level & Framework
            </label>
            <select
              value={selectedGrade}
              onChange={(e) => handleGradeChange(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-semibold text-stone-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              {Object.keys(GRADE_PRESETS).map((gk) => (
                <option key={gk} value={gk}>
                  {GRADE_PRESETS[gk].label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Learner Full Name
            </label>
            <input
              type="text"
              value={learnerName}
              onChange={(e) => setLearnerName(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-medium text-stone-800"
              placeholder="Last Name, First Name M."
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Learner Reference Number (LRN)
            </label>
            <input
              type="text"
              value={lrn}
              onChange={(e) => setLrn(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-mono text-stone-800"
              placeholder="12-digit LRN"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Grade, Section & Track
            </label>
            <input
              type="text"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-medium text-stone-800"
              placeholder="Section"
            />
          </div>
        </div>

        {/* Global Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-stone-500">Framework Applied:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 font-semibold border border-blue-200">
              {GRADE_PRESETS[selectedGrade]?.framework}
            </span>
            {selectedGrade === 'Grade 12' && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                ⚠️ Paragraph 49 Transition Rule
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-stone-600" />
              <span>Export SF9 (CSV)</span>
            </button>
            <button
              onClick={() => handlePrint()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>Print SF9 Form</span>
            </button>
            <button
              onClick={() => setShowSummarySlip(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-black transition cursor-pointer shadow-sm"
            >
              <Award className="w-3.5 h-3.5 text-stone-950" />
              <span>🏷️ 3x2" Summary Slip</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: Interactive 3-Term E-Class Record Calculator */}
      {viewMode === 'calculator' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <h3 className="text-lg font-bold font-display text-stone-900">
                  Three-Term Assessment Record & Final Average Calculator
                </h3>
                <p className="text-xs text-stone-500">
                  Click any subject row to expand score sliders for Written Works (WW), Performance Tasks (PT), and Term Exams (TE).
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
                    Computed General Average
                  </span>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-2xl font-extrabold font-mono text-blue-900">
                      {generalTransmuted}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${generalDescriptor.badgeClass}`}>
                      {generalDescriptor.descriptor}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Table of Subjects */}
            <div className="space-y-3">
              {subjectRows.map((row) => {
                const outcome = computeSubjectFinal(row);
                const isExpanded = expandedSubjectId === row.id;

                return (
                  <div
                    key={row.id}
                    className="border border-stone-200 rounded-2xl overflow-hidden hover:border-blue-300 transition shadow-2xs"
                  >
                    {/* Header Row */}
                    <div
                      onClick={() => setExpandedSubjectId(isExpanded ? null : row.id)}
                      className="p-4 bg-stone-50/70 hover:bg-stone-100/70 flex flex-col md:flex-row md:items-center md:justify-between gap-3 cursor-pointer select-none transition"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-stone-900 font-display">
                            {row.subjectTitle}
                          </h4>
                          <span className="text-[10px] font-semibold text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                            WW {row.weights.writtenWorks}% • PT {row.weights.performanceTasks}% • Exam {row.weights.quarterlyExam}%
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-500 block">
                          Weight Profile: {row.weightCategory}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-6 self-end md:self-center">
                        {/* Term 1 */}
                        <div className="text-center">
                          <span className="text-[10px] text-stone-400 uppercase font-bold block">
                            Term 1
                          </span>
                          <span className="text-sm font-bold font-mono text-stone-800">
                            {outcome.t1}
                          </span>
                        </div>

                        {/* Term 2 */}
                        <div className="text-center">
                          <span className="text-[10px] text-stone-400 uppercase font-bold block">
                            Term 2
                          </span>
                          <span className="text-sm font-bold font-mono text-stone-800">
                            {outcome.t2}
                          </span>
                        </div>

                        {/* Term 3 */}
                        <div className="text-center">
                          <span className="text-[10px] text-stone-400 uppercase font-bold block">
                            Term 3
                          </span>
                          <span className="text-sm font-bold font-mono text-stone-800">
                            {outcome.t3}
                          </span>
                        </div>

                        {/* Arrow */}
                        <ArrowRight className="w-4 h-4 text-stone-300 hidden sm:block" />

                        {/* Final Grade */}
                        <div className="text-center bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
                          <span className="text-[10px] text-blue-700 uppercase font-bold block">
                            Final Grade
                          </span>
                          <span className="text-base font-extrabold font-mono text-blue-900">
                            {outcome.finalGrade}
                          </span>
                        </div>

                        {/* Descriptor */}
                        <div className="min-w-[100px] text-right">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border block text-center ${outcome.descriptor.badgeClass}`}>
                            {outcome.descriptor.descriptor}
                          </span>
                          <span className={`text-[10px] font-semibold block text-center mt-0.5 ${outcome.isPassed ? 'text-emerald-700' : 'text-rose-600'}`}>
                            {outcome.isPassed ? '✓ Passed' : '✗ Remediation'}
                          </span>
                        </div>

                        {/* Chevron */}
                        <div className="text-stone-400">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Drilldown Sliders */}
                    {isExpanded && (
                      <div className="p-5 bg-white border-t border-stone-200 space-y-4 text-xs">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Term 1 Controls */}
                          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                              <span className="font-bold text-stone-900">Term 1 Assessment</span>
                              <span className="font-mono text-xs font-bold text-blue-700">
                                Grade: {outcome.t1}
                              </span>
                            </div>

                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-[11px] mb-1">
                                  <span className="text-stone-600 font-semibold">Written Works ({row.weights.writtenWorks}%):</span>
                                  <span className="font-mono font-bold text-blue-800">{row.term1.ww}%</span>
                                </div>
                                <input
                                  type="range"
                                  min="50"
                                  max="100"
                                  value={row.term1.ww}
                                  onChange={(e) => updateScore(row.id, 'term1', 'ww', Number(e.target.value))}
                                  className="w-full accent-blue-600 cursor-pointer"
                                />
                              </div>

                              <div>
                                <div className="flex justify-between text-[11px] mb-1">
                                  <span className="text-stone-600 font-semibold">Performance Tasks ({row.weights.performanceTasks}%):</span>
                                  <span className="font-mono font-bold text-emerald-800">{row.term1.pt}%</span>
                                </div>
                                <input
                                  type="range"
                                  min="50"
                                  max="100"
                                  value={row.term1.pt}
                                  onChange={(e) => updateScore(row.id, 'term1', 'pt', Number(e.target.value))}
                                  className="w-full accent-emerald-600 cursor-pointer"
                                />
                              </div>

                              <div>
                                <div className="flex justify-between text-[11px] mb-1">
                                  <span className="text-stone-600 font-semibold">Term Exam / QA ({row.weights.quarterlyExam}%):</span>
                                  <span className="font-mono font-bold text-purple-800">{row.term1.te}%</span>
                                </div>
                                <input
                                  type="range"
                                  min="50"
                                  max="100"
                                  value={row.term1.te}
                                  onChange={(e) => updateScore(row.id, 'term1', 'te', Number(e.target.value))}
                                  className="w-full accent-purple-600 cursor-pointer"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Term 2 Controls */}
                          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                              <span className="font-bold text-stone-900">Term 2 Assessment</span>
                              <span className="font-mono text-xs font-bold text-blue-700">
                                Grade: {outcome.t2}
                              </span>
                            </div>

                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-[11px] mb-1">
                                  <span className="text-stone-600 font-semibold">Written Works ({row.weights.writtenWorks}%):</span>
                                  <span className="font-mono font-bold text-blue-800">{row.term2.ww}%</span>
                                </div>
                                <input
                                  type="range"
                                  min="50"
                                  max="100"
                                  value={row.term2.ww}
                                  onChange={(e) => updateScore(row.id, 'term2', 'ww', Number(e.target.value))}
                                  className="w-full accent-blue-600 cursor-pointer"
                                />
                              </div>

                              <div>
                                <div className="flex justify-between text-[11px] mb-1">
                                  <span className="text-stone-600 font-semibold">Performance Tasks ({row.weights.performanceTasks}%):</span>
                                  <span className="font-mono font-bold text-emerald-800">{row.term2.pt}%</span>
                                </div>
                                <input
                                  type="range"
                                  min="50"
                                  max="100"
                                  value={row.term2.pt}
                                  onChange={(e) => updateScore(row.id, 'term2', 'pt', Number(e.target.value))}
                                  className="w-full accent-emerald-600 cursor-pointer"
                                />
                              </div>

                              <div>
                                <div className="flex justify-between text-[11px] mb-1">
                                  <span className="text-stone-600 font-semibold">Term Exam / QA ({row.weights.quarterlyExam}%):</span>
                                  <span className="font-mono font-bold text-purple-800">{row.term2.te}%</span>
                                </div>
                                <input
                                  type="range"
                                  min="50"
                                  max="100"
                                  value={row.term2.te}
                                  onChange={(e) => updateScore(row.id, 'term2', 'te', Number(e.target.value))}
                                  className="w-full accent-purple-600 cursor-pointer"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Term 3 Controls */}
                          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                              <span className="font-bold text-stone-900">Term 3 Assessment</span>
                              <span className="font-mono text-xs font-bold text-blue-700">
                                Grade: {outcome.t3}
                              </span>
                            </div>

                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-[11px] mb-1">
                                  <span className="text-stone-600 font-semibold">Written Works ({row.weights.writtenWorks}%):</span>
                                  <span className="font-mono font-bold text-blue-800">{row.term3.ww}%</span>
                                </div>
                                <input
                                  type="range"
                                  min="50"
                                  max="100"
                                  value={row.term3.ww}
                                  onChange={(e) => updateScore(row.id, 'term3', 'ww', Number(e.target.value))}
                                  className="w-full accent-blue-600 cursor-pointer"
                                />
                              </div>

                              <div>
                                <div className="flex justify-between text-[11px] mb-1">
                                  <span className="text-stone-600 font-semibold">Performance Tasks ({row.weights.performanceTasks}%):</span>
                                  <span className="font-mono font-bold text-emerald-800">{row.term3.pt}%</span>
                                </div>
                                <input
                                  type="range"
                                  min="50"
                                  max="100"
                                  value={row.term3.pt}
                                  onChange={(e) => updateScore(row.id, 'term3', 'pt', Number(e.target.value))}
                                  className="w-full accent-emerald-600 cursor-pointer"
                                />
                              </div>

                              <div>
                                <div className="flex justify-between text-[11px] mb-1">
                                  <span className="text-stone-600 font-semibold">Term Exam / QA ({row.weights.quarterlyExam}%):</span>
                                  <span className="font-mono font-bold text-purple-800">{row.term3.te}%</span>
                                </div>
                                <input
                                  type="range"
                                  min="50"
                                  max="100"
                                  value={row.term3.te}
                                  onChange={(e) => updateScore(row.id, 'term3', 'te', Number(e.target.value))}
                                  className="w-full accent-purple-600 cursor-pointer"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 bg-blue-50/60 rounded-xl text-[11px] text-blue-900 border border-blue-100 flex items-center justify-between">
                          <span>
                            <strong>Formula:</strong> Final Grade = <code>round(({outcome.t1} + {outcome.t2} + {outcome.t3}) / 3) = {outcome.finalGrade}</code>
                          </span>
                          <span className="font-semibold">
                            Qualitative Descriptor: <strong className="text-blue-950">{outcome.descriptor.descriptor}</strong>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: Official School Form 9 (SF9) Report Card Preview */}
      {viewMode === 'sf9-preview' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-300 shadow-sm space-y-6 print:shadow-none print:border-none print:p-0">
          {/* Official DepEd Header */}
          <div className="text-center space-y-1 border-b-2 border-stone-800 pb-5">
            <div className="text-[11px] tracking-widest uppercase font-semibold text-stone-600">
              Republic of the Philippines • Department of Education
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 uppercase tracking-wide">
              Learner's Progress Report Card (SF9)
            </h1>
            <div className="text-xs font-medium text-stone-700">
              School Year 2026–2027 (DepEd Order No. 009 & 015, s. 2026)
            </div>
          </div>

          {/* Learner & School Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-xs text-stone-800 bg-stone-50/80 p-4 rounded-2xl border border-stone-200">
            <div>
              <span className="font-bold text-stone-500">Name: </span>
              <span className="font-bold text-stone-900 uppercase">{learnerName}</span>
            </div>
            <div>
              <span className="font-bold text-stone-500">LRN: </span>
              <span className="font-mono font-bold text-stone-900">{lrn}</span>
            </div>
            <div>
              <span className="font-bold text-stone-500">Grade & Section: </span>
              <span className="font-medium text-stone-900">{section}</span>
            </div>
            <div>
              <span className="font-bold text-stone-500">Curriculum / Policy: </span>
              <span className="font-semibold text-blue-900">{GRADE_PRESETS[selectedGrade]?.framework}</span>
            </div>
          </div>

          {/* Report Card Table (3 Terms) */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-stone-400">
              <thead>
                <tr className="bg-stone-100 text-stone-900 text-center font-bold">
                  <th className="p-3 border border-stone-400 text-left w-2/5">Learning Areas</th>
                  <th className="p-2 border border-stone-400 colspan-3">
                    <span className="block text-[10px] text-stone-500 font-normal">Grading Periods</span>
                    <div className="grid grid-cols-3 gap-1 pt-1 border-t border-stone-300">
                      <span>Term 1</span>
                      <span>Term 2</span>
                      <span>Term 3</span>
                    </div>
                  </th>
                  <th className="p-3 border border-stone-400 w-24">Final Rating</th>
                  <th className="p-3 border border-stone-400 w-36">Remarks / Descriptor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-300">
                {subjectRows.map((row) => {
                  const outcome = computeSubjectFinal(row);
                  return (
                    <tr key={row.id} className="hover:bg-stone-50/50">
                      <td className="p-3 border border-stone-400 font-semibold text-stone-900">
                        {row.subjectTitle}
                      </td>
                      <td className="p-0 border border-stone-400" colSpan={1}>
                        <div className="grid grid-cols-3 text-center py-2.5 font-mono">
                          <span className="border-r border-stone-200">{outcome.t1}</span>
                          <span className="border-r border-stone-200">{outcome.t2}</span>
                          <span>{outcome.t3}</span>
                        </div>
                      </td>
                      <td className="p-3 border border-stone-400 text-center font-bold font-mono text-stone-900 bg-stone-50/50">
                        {outcome.finalGrade}
                      </td>
                      <td className="p-3 border border-stone-400 text-center">
                        <span className="font-bold text-stone-900 block text-[11px]">
                          {outcome.descriptor.descriptor}
                        </span>
                        <span className={`text-[10px] font-semibold ${outcome.isPassed ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {outcome.isPassed ? 'Passed' : 'Failed'}
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {/* General Average Row */}
                <tr className="bg-stone-100/80 font-bold text-stone-900 border-t-2 border-stone-500">
                  <td className="p-3 border border-stone-400 uppercase tracking-wide">
                    General Average
                  </td>
                  <td className="p-3 border border-stone-400 text-center text-stone-400 font-mono text-[11px]">
                    Average of 3 Terms
                  </td>
                  <td className="p-3 border border-stone-400 text-center font-mono text-base font-extrabold text-blue-900 bg-blue-50/40">
                    {generalTransmuted}
                  </td>
                  <td className="p-3 border border-stone-400 text-center">
                    <span className="text-xs font-extrabold text-blue-900 uppercase block">
                      {generalDescriptor.descriptor}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold block">
                      PASSED & PROMOTED
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Qualitative Descriptors Grading Scale Legend */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
            <span className="font-bold text-stone-700 uppercase tracking-wider block text-[11px]">
              Descriptors & Grading Scale (DepEd Order No. 015, s. 2026)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] text-center">
              <div className="p-2 bg-white rounded-lg border border-stone-200">
                <strong className="block text-emerald-800">Advancing</strong>
                <span className="font-mono text-stone-600">90 – 100</span>
                <span className="block text-[10px] text-stone-400">Passed</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-stone-200">
                <strong className="block text-blue-800">Benchmarking</strong>
                <span className="font-mono text-stone-600">80 – 89</span>
                <span className="block text-[10px] text-stone-400">Passed</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-stone-200">
                <strong className="block text-amber-800">Connecting</strong>
                <span className="font-mono text-stone-600">75 – 79</span>
                <span className="block text-[10px] text-stone-400">Passed</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-stone-200">
                <strong className="block text-orange-800">Developing</strong>
                <span className="font-mono text-stone-600">65 – 74</span>
                <span className="block text-[10px] text-rose-500">Failed / Remediation</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-stone-200">
                <strong className="block text-rose-800">Emerging</strong>
                <span className="font-mono text-stone-600">0 – 64</span>
                <span className="block text-[10px] text-rose-500">Failed / Remediation</span>
              </div>
            </div>
          </div>

          {/* Certification of Eligibility */}
          <div className="p-4 rounded-2xl border border-stone-300 text-xs text-stone-700 space-y-2">
            <div className="font-bold uppercase text-stone-900 tracking-wide text-center pb-1 border-b border-stone-200">
              Certificate of Transfer / Promotion
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div>
                <span>Eligible for admission to: </span>
                <strong className="text-stone-900 border-b border-stone-400 px-2">
                  Next Grade Level
                </strong>
              </div>
              <div>
                <span>Date: </span>
                <span className="font-mono text-stone-900">End of Term 3, SY 2026–2027</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-6 text-center text-stone-800">
              <div className="border-t border-stone-400 pt-1 font-semibold">
                Class Adviser Signature
              </div>
              <div className="border-t border-stone-400 pt-1 font-semibold">
                School Principal Signature
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3x2 inch Summary Slip Modal */}
      {showSummarySlip && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-amber-400 animate-in zoom-in-95 duration-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-black text-[#092B62]">
                  🏷️ 3x2" Summary Slip Label Preview
                </h3>
              </div>
              <button
                onClick={() => setShowSummarySlip(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-500">
              Formatted for small thermal / label paper (3x2 inch format). Includes student demographics, final transmuted grade, and verification QR code.
            </p>

            {/* 3x2 Inch Label Card Preview */}
            <div className="mx-auto w-[320px] h-[213px] bg-stone-50 border-2 border-dashed border-stone-400 rounded-2xl p-4 flex flex-col justify-between shadow-sm relative overflow-hidden text-stone-900 select-none">
              <div className="absolute top-0 right-0 bg-[#092B62] text-white text-[9px] font-black px-2 py-0.5 rounded-bl-lg">
                LNNCHS LABEL
              </div>

              <div className="space-y-0.5">
                <div className="text-[9px] uppercase tracking-wider font-bold text-stone-500">
                  DepEd • Lanao del Norte Nat'l Comp. High School
                </div>
                <h4 className="text-xs font-black uppercase text-[#092B62] truncate">
                  {learnerName || 'Dela Cruz, Juan M.'}
                </h4>
                <div className="text-[10px] font-mono text-stone-600">
                  LRN: {lrn || '108492039481'} | {section || 'Grade 7 - Diamond'}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                <div>
                  <div className="text-[9px] uppercase tracking-wider font-bold text-stone-500">Final Transmuted Grade</div>
                  <div className="text-xl font-black font-mono text-blue-900">
                    {generalTransmuted || 91} <span className="text-xs font-bold text-emerald-700">({generalDescriptor.descriptor || 'Advancing'})</span>
                  </div>
                </div>

                {/* QR Code Placeholder */}
                <div className="w-12 h-12 bg-white border border-stone-300 p-1 rounded-lg flex items-center justify-center shrink-0">
                  <div className="w-full h-full bg-stone-900 grid grid-cols-4 gap-0.5 p-0.5">
                    <div className="bg-white" /><div className="bg-stone-900" /><div className="bg-white" /><div className="bg-stone-900" />
                    <div className="bg-stone-900" /><div className="bg-white" /><div className="bg-stone-900" /><div className="bg-white" />
                    <div className="bg-white" /><div className="bg-stone-900" /><div className="bg-white" /><div className="bg-stone-900" />
                    <div className="bg-stone-900" /><div className="bg-white" /><div className="bg-stone-900" /><div className="bg-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
              <button
                onClick={() => setShowSummarySlip(false)}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#092B62] hover:bg-blue-900 text-white text-xs font-black shadow-md flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-amber-300" />
                <span>Print 3x2" Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
