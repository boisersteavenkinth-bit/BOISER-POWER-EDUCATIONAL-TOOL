import { AssessmentWeights, GradeTransmutationResult, QualitativeDescriptor } from '../types';

/**
 * Official DepEd Transmutation Table (SY 2026–2027)
 * Maps Initial Grade (0.00 - 100.00) to Transmuted Grade (60 - 100)
 */
export function transmuteInitialGrade(initialGrade: number): number {
  const rounded = Math.round(initialGrade * 100) / 100;

  if (rounded >= 100) return 100;
  if (rounded >= 98.40) return 99;
  if (rounded >= 96.80) return 98;
  if (rounded >= 95.20) return 97;
  if (rounded >= 93.60) return 96;
  if (rounded >= 92.00) return 95;
  if (rounded >= 90.40) return 94;
  if (rounded >= 88.80) return 93;
  if (rounded >= 87.20) return 92;
  if (rounded >= 85.60) return 91;
  if (rounded >= 84.00) return 90;
  if (rounded >= 82.40) return 89;
  if (rounded >= 80.80) return 88;
  if (rounded >= 79.20) return 87;
  if (rounded >= 77.60) return 86;
  if (rounded >= 76.00) return 85;
  if (rounded >= 74.40) return 84;
  if (rounded >= 72.80) return 83;
  if (rounded >= 71.20) return 82;
  if (rounded >= 69.60) return 81;
  if (rounded >= 68.00) return 80;
  if (rounded >= 66.40) return 79;
  if (rounded >= 64.80) return 78;
  if (rounded >= 63.20) return 77;
  if (rounded >= 61.60) return 76;
  if (rounded >= 60.00) return 75;
  if (rounded >= 56.00) return 74;
  if (rounded >= 52.00) return 73;
  if (rounded >= 48.00) return 72;
  if (rounded >= 44.00) return 71;
  if (rounded >= 40.00) return 70;
  if (rounded >= 36.00) return 69;
  if (rounded >= 32.00) return 68;
  if (rounded >= 28.00) return 67;
  if (rounded >= 24.00) return 66;
  if (rounded >= 20.00) return 65;
  if (rounded >= 16.00) return 64;
  if (rounded >= 12.00) return 63;
  if (rounded >= 8.00) return 62;
  if (rounded >= 4.00) return 61;
  return 60;
}

/**
 * DepEd Qualitative Descriptors (SY 2026–2027)
 */
export function getQualitativeDescriptor(transmutedGrade: number): {
  descriptor: QualitativeDescriptor;
  meaning: string;
  isPassing: boolean;
  colorClass: string;
  badgeClass: string;
} {
  if (transmutedGrade >= 90) {
    return {
      descriptor: 'Advancing',
      meaning: 'Consistently meets/exceeds standards with independence and depth',
      isPassing: true,
      colorClass: 'text-emerald-700',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300'
    };
  }
  if (transmutedGrade >= 80) {
    return {
      descriptor: 'Benchmarking',
      meaning: 'Competent, generally independent performance',
      isPassing: true,
      colorClass: 'text-blue-700',
      badgeClass: 'bg-blue-50 text-blue-800 border-blue-300'
    };
  }
  if (transmutedGrade >= 75) {
    return {
      descriptor: 'Connecting',
      meaning: 'Sufficient but may need occasional guidance',
      isPassing: true,
      colorClass: 'text-amber-700',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-300'
    };
  }
  if (transmutedGrade >= 65) {
    return {
      descriptor: 'Developing',
      meaning: 'Partial/inconsistent; needs targeted remediation',
      isPassing: false,
      colorClass: 'text-orange-700',
      badgeClass: 'bg-orange-50 text-orange-800 border-orange-300'
    };
  }
  return {
    descriptor: 'Emerging',
    meaning: 'Has not yet met foundational requirements; needs sustained intervention',
    isPassing: false,
    colorClass: 'text-rose-700',
    badgeClass: 'bg-rose-50 text-rose-800 border-rose-300'
  };
}

/**
 * K to 10 Assessment Weights (DO No. 015, s. 2026)
 */
export const K10_ASSESSMENT_WEIGHTS: Record<string, AssessmentWeights> = {
  'Languages (English, Filipino, Reading)': { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 },
  'Araling Panlipunan (AP) / Makabansa': { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 },
  'GMRC / Values Education': { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 },
  'Science': { writtenWorks: 35, performanceTasks: 45, quarterlyExam: 20 },
  'Mathematics': { writtenWorks: 35, performanceTasks: 45, quarterlyExam: 20 },
  'MAPEH (Music, Arts, PE, Health)': { writtenWorks: 20, performanceTasks: 60, quarterlyExam: 20 },
  'EPP / TLE': { writtenWorks: 20, performanceTasks: 60, quarterlyExam: 20 }
};

/**
 * Compute the 3-Term Final Grade as the arithmetic mean of Term 1, Term 2, and Term 3 grades
 */
export function computeThreeTermFinalGrade(term1: number, term2: number, term3: number): number {
  return Math.round((term1 + term2 + term3) / 3);
}

/**
 * Grade 11 Strengthened SHS Weights (DO No. 015, s. 2026)
 */
export const GRADE_11_WEIGHTS: Record<string, AssessmentWeights> = {
  'Effective Communication (Prescribed)': { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 },
  'Mabisang Komunikasyon (Prescribed)': { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 },
  'General Mathematics (Prescribed)': { writtenWorks: 35, performanceTasks: 45, quarterlyExam: 20 },
  'General Science (Prescribed)': { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 },
  'Pag-aaral ng Kasaysayan at Lipunang Pilipino (Prescribed)': { writtenWorks: 30, performanceTasks: 50, quarterlyExam: 20 },
  'Academic Track Elective / Specialized': { writtenWorks: 25, performanceTasks: 50, quarterlyExam: 25 },
  'TechPro Elective / Practical Laboratory': { writtenWorks: 20, performanceTasks: 60, quarterlyExam: 20 }
};

/**
 * Grade 12 Retained Weights (DO 8, s. 2015 via DO 015, s. 2026 Par. 49 Transition)
 */
export const GRADE_12_TRANSITION_WEIGHTS: Record<string, AssessmentWeights> = {
  'Prescribed Subjects (All Tracks)': {
    writtenWorks: 25,
    performanceTasks: 50,
    quarterlyExam: 25,
    examSubweighting: { summativeTest1: 30, summativeTest2: 30, termExam: 40 }
  },
  'Academic Track (Non-Immersion)': {
    writtenWorks: 25,
    performanceTasks: 45,
    quarterlyExam: 30,
    examSubweighting: { summativeTest1: 30, summativeTest2: 30, termExam: 40 }
  },
  'Work Immersion / Culminating (Academic)': {
    writtenWorks: 35,
    performanceTasks: 40,
    quarterlyExam: 25,
    examSubweighting: { summativeTest1: 30, summativeTest2: 30, termExam: 40 }
  },
  'TVL / Sports / Arts & Design': {
    writtenWorks: 20,
    performanceTasks: 60,
    quarterlyExam: 20,
    examSubweighting: { summativeTest1: 30, summativeTest2: 30, termExam: 40 }
  }
};

/**
 * Calculate Grade 12 Combined Exam Score using the 30-30-40 Rule
 */
export function calculateExamScore30_30_40(st1Percentage: number, st2Percentage: number, termExamPercentage: number): number {
  return (st1Percentage * 0.30) + (st2Percentage * 0.30) + (termExamPercentage * 0.40);
}
