export interface AnswerKeyItem {
  itemNumber: number;
  question?: string;
  correctAnswer: string;
  points: number;
  type?: 'multiple_choice' | 'identification' | 'true_false' | 'short_answer';
  acceptableVariants?: string[];
  explanation?: string;
}

export interface AnswerKey {
  id: string;
  title: string;
  subject: string;
  totalItems: number;
  totalPoints: number;
  sourceType?: 'pdf' | 'image' | 'manual' | 'sample';
  fileName?: string;
  filePreviewUrl?: string;
  uploadedAt: string;
  items: AnswerKeyItem[];
}

export interface ItemGradingComparison {
  itemNumber: number;
  question?: string;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  scoreAwarded: number;
  maxPoints: number;
  feedback?: string;
  ocrConfidence?: number; // Tesseract OCR confidence score (0 - 100)
  ocrStatus?: 'high' | 'medium' | 'low';
  needsReview?: boolean; // Flagged when confidence < 70% or ambiguous handwriting
  isManuallyReviewed?: boolean; // Flagged when teacher manually inspected or edited
  originalOcrAnswer?: string; // Stored in case user overrides
}

export interface ComparativeGradingResult {
  rawText: string;
  score: number;
  totalItems: number;
  totalPoints: number;
  percentage: number;
  depedTransmutedGrade: number;
  masteryLevel: string;
  meanOcrConfidence?: number;
  lowConfidenceCount?: number;
  comparedAgainstKey: {
    id: string;
    title: string;
    totalItems: number;
    fileName?: string;
  };
  itemComparisons: ItemGradingComparison[];
  summary: {
    correctCount: number;
    incorrectCount: number;
    skippedCount: number;
  };
  feedback: {
    strengths?: string;
    areasForImprovement?: string;
    corrections: string;
    suggestions: string;
    teacherComment: string;
    sentiment: string;
  };
}

export const SAMPLE_ANSWER_KEYS: AnswerKey[] = [
  {
    id: 'key-life-career-1',
    title: 'Life & Career Skills 1st Trimester Diagnostic Key',
    subject: 'Life and Career Skills (DO 3, s. 2026)',
    totalItems: 10,
    totalPoints: 10,
    sourceType: 'sample',
    fileName: 'LCS_Diagnostic_Key_SY2026.pdf',
    uploadedAt: '2026-09-23',
    items: [
      { itemNumber: 1, question: 'Self-direction and initiative', correctAnswer: 'A', points: 1, type: 'multiple_choice', acceptableVariants: ['A', 'a', 'Initiative'], explanation: 'Initiative is the ability to assess and initiate things independently.' },
      { itemNumber: 2, question: 'Cross-cultural collaboration', correctAnswer: 'C', points: 1, type: 'multiple_choice', acceptableVariants: ['C', 'c', 'Collaboration'], explanation: 'Working effectively in diverse teams.' },
      { itemNumber: 3, question: 'Ethical workplace decision making', correctAnswer: 'B', points: 1, type: 'multiple_choice', acceptableVariants: ['B', 'b', 'Integrity'], explanation: 'Adhering to professional and moral standards.' },
      { itemNumber: 4, question: 'Financial literacy budgeting tool', correctAnswer: 'D', points: 1, type: 'multiple_choice', acceptableVariants: ['D', 'd', 'Budget'], explanation: 'Allocating income towards savings and obligations.' },
      { itemNumber: 5, question: 'Effective feedback receptivity', correctAnswer: 'A', points: 1, type: 'multiple_choice', acceptableVariants: ['A', 'a', 'Open-mindedness'], explanation: 'Welcoming constructive critique for continuous growth.' },
      { itemNumber: 6, question: 'Key 21st century skill: Adaptability', correctAnswer: 'Adaptability', points: 1, type: 'identification', acceptableVariants: ['Adaptability', 'Flexibility', 'Adaptable'], explanation: 'Adjusting smoothly to changing roles and environments.' },
      { itemNumber: 7, question: 'DepEd core value: Makatao', correctAnswer: 'Makatao', points: 1, type: 'identification', acceptableVariants: ['Makatao', 'Compassion', 'Respect for others'], explanation: 'Demonstrating empathy and social responsibility.' },
      { itemNumber: 8, question: 'SMART goal letter "M" meaning', correctAnswer: 'Measurable', points: 1, type: 'identification', acceptableVariants: ['Measurable', 'measurable', 'Quantifiable'], explanation: 'M in SMART stands for Measurable.' },
      { itemNumber: 9, question: 'Time management technique dividing tasks', correctAnswer: 'Pomodoro', points: 1, type: 'identification', acceptableVariants: ['Pomodoro', 'Timeboxing', 'Chunking'], explanation: 'Interval-based focused productivity intervals.' },
      { itemNumber: 10, question: 'Professional accountability commitment', correctAnswer: 'Accountability', points: 1, type: 'identification', acceptableVariants: ['Accountability', 'Responsibility', 'Integrity'], explanation: 'Taking ownership of outcomes and workplace deliverables.' }
    ]
  },
  {
    id: 'key-science-7',
    title: 'Grade 7 Science — Cellular Energy & Photosynthesis Key',
    subject: 'Science 7',
    totalItems: 8,
    totalPoints: 10,
    sourceType: 'sample',
    fileName: 'Science7_Photosynthesis_Key.png',
    uploadedAt: '2026-09-23',
    items: [
      { itemNumber: 1, question: 'Green pigment in plants', correctAnswer: 'Chlorophyll', points: 1, type: 'identification', acceptableVariants: ['Chlorophyll', 'chlorophyll'], explanation: 'Absorbs sunlight primarily in red and blue wavelengths.' },
      { itemNumber: 2, question: 'Gas absorbed by plants during photosynthesis', correctAnswer: 'Carbon Dioxide', points: 1, type: 'identification', acceptableVariants: ['Carbon Dioxide', 'CO2', 'Carbon dioxide'], explanation: 'Reactant taken in through stomata.' },
      { itemNumber: 3, question: 'Gas released as a byproduct', correctAnswer: 'Oxygen', points: 1, type: 'identification', acceptableVariants: ['Oxygen', 'O2', 'oxygen'], explanation: 'Produced from photolysis of water.' },
      { itemNumber: 4, question: 'Cellular organelle of photosynthesis', correctAnswer: 'Chloroplast', points: 1, type: 'identification', acceptableVariants: ['Chloroplast', 'chloroplast', 'Plastid'], explanation: 'Contains thylakoids and stroma.' },
      { itemNumber: 5, question: 'Sugar synthesized as chemical energy', correctAnswer: 'Glucose', points: 1, type: 'identification', acceptableVariants: ['Glucose', 'glucose', 'Sugar', 'C6H12O6'], explanation: 'Primary carbohydrate product.' },
      { itemNumber: 6, question: 'Primary source of energy for the reaction', correctAnswer: 'Sunlight', points: 1, type: 'identification', acceptableVariants: ['Sunlight', 'Light energy', 'Sun', 'Solar energy'], explanation: 'Provides kinetic photons to excite chlorophyll.' },
      { itemNumber: 7, question: 'Microscopic pores on leaf surfaces', correctAnswer: 'Stomata', points: 2, type: 'identification', acceptableVariants: ['Stomata', 'stomata', 'Stoma'], explanation: 'Regulate gas exchange and transpiration.' },
      { itemNumber: 8, question: 'Dark reaction site inside chloroplast', correctAnswer: 'Stroma', points: 2, type: 'identification', acceptableVariants: ['Stroma', 'stroma'], explanation: 'Fluid-filled space where Calvin cycle takes place.' }
    ]
  }
];
