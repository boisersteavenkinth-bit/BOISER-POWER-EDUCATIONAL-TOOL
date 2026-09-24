export type GradeLevel =
  | 'Kindergarten'
  | 'Grade 1'
  | 'Grade 2'
  | 'Grade 3'
  | 'Grade 4'
  | 'Grade 5'
  | 'Grade 6'
  | 'Grade 7'
  | 'Grade 8'
  | 'Grade 9'
  | 'Grade 10'
  | 'Grade 11'
  | 'Grade 12';

export type KeyStage = 'KS 1' | 'KS 2' | 'KS 3' | 'KS 4';

export type TermNumber = 1 | 2 | 3;

export type TrackType = 'Academic' | 'TechPro' | 'TVL' | 'Sports' | 'Arts & Design' | 'General K-10';

export type VerificationStatus = 'verified' | 'unverified' | 'flagged';

export interface CompetencyRecord {
  id: string;
  school_year: string; // e.g. "2026-2027"
  grade_level: number | 'Kindergarten';
  key_stage: KeyStage;
  curriculum: string; // "MATATAG" | "Revised K–10 (MATATAG)" | "Strengthened SHS Curriculum" | "Old SHS Curriculum (DO 8, s. 2015)"
  track?: TrackType;
  subject_code: string;
  subject_title: string;
  term: TermNumber;
  week: string; // e.g. "1-2"
  domain?: string;
  learning_competency: string;
  competency_code: string | null;
  content_standard?: string;
  performance_standard?: string;
  assessment_weight_set: 'DO-015-2026' | 'DO-008-2015 + DO-015-2026-transmutation' | 'MATATAG-K10';
  bow_source: string;
  cg_source: string;
  transition_flag: boolean;
  pilot_school_exception?: boolean;
  verification_status: VerificationStatus;
  notes?: string;
  suggested_activities?: string[];
  sample_assessment_item?: string;
}

export type QualitativeDescriptor =
  | 'Advancing'
  | 'Benchmarking'
  | 'Connecting'
  | 'Developing'
  | 'Emerging';

export interface GradeTransmutationResult {
  initialGrade: number;
  transmutedGrade: number;
  descriptor: QualitativeDescriptor;
  meaning: string;
  isPassing: boolean;
}

export interface AssessmentWeights {
  writtenWorks: number; // percentage e.g. 25
  performanceTasks: number; // percentage e.g. 50
  quarterlyExam: number; // percentage e.g. 25
  examSubweighting?: {
    summativeTest1: number; // 30%
    summativeTest2: number; // 30%
    termExam: number; // 40%
  };
}

export interface TechProElective {
  sector: 'Family and Consumer Sciences (FCS)' | 'Industrial Arts (IA)' | 'ICT' | 'Maritime';
  cluster?: string;
  title: string;
  code?: string;
  description: string;
  careerPathways: string[];
  prerequisites?: string;
  certifications?: string[]; // e.g. "NC II Cookery"
}

export interface DailyLessonLog {
  id: string;
  title: string;
  schoolYear: string;
  term: TermNumber;
  week: string;
  gradeLevel: string;
  learningArea: string;
  teacherName?: string;
  competency: CompetencyRecord;
  contentStandard: string;
  performanceStandard: string;
  learningObjectives: string[];
  content: string;
  learningResources: {
    references: string[];
    otherResources: string[];
  };
  procedures: {
    routineAndReview: string; // A. Reviewing previous lesson or presenting the new lesson
    motivationAndPurpose: string; // B. Establishing a purpose for the lesson
    presentationAndExamples: string; // C. Presenting examples/instances
    discussionConcept1: string; // D. Discussing new concepts and practicing new skills #1
    discussionConcept2: string; // E. Discussing new concepts and practicing new skills #2
    guidedPractice: string; // F. Developing mastery (Formative Assessment)
    realWorldApplication: string; // G. Finding practical applications of concepts and skills in daily living
    generalizationAndAbstraction: string; // H. Making generalizations and abstractions about the lesson
    evaluatingLearning: string; // I. Evaluating learning
    additionalActivities: string; // J. Additional activities for application or remediation
  };
  remarks?: string;
  reflection?: {
    learnersEarned80: string;
    learnersRequiringRemediation: string;
    teachingStrategiesEffectiveness: string;
  };
}

export interface WeeklyDayPlan {
  dayName: string; // e.g. "Monday"
  date: string; // e.g. "Jun 16, 2026"
  learningObjectives?: string[];
  objectives?: string[];
  contentTopic?: string;
  content?: string;
  learningResources?: any;
  references?: string[];
  otherResources?: string[];
  procedures?: any;
  assessment?: string;
  assignmentEnrichment?: string;
  assignment?: string;
  remarks?: string;
  reflection?: string;
  [key: string]: any;
}

export interface WeeklyLessonPlan {
  id: string;
  schoolName: string;
  teacherName: string;
  gradeLevel: string;
  subject: string;
  term: string;
  quarter?: string;
  weekNumber: string;
  inclusiveDates: string;
  dateRange?: string;
  schoolYear?: string;
  topic?: string;
  competencies?: string;
  contentStandard: string;
  performanceStandard: string;
  learningCompetencies: string;
  version?: string;
  validationStatus?: any;
  days: WeeklyDayPlan[];
  [key: string]: any;
}

export interface AssessmentBlueprint {
  id: string;
  title: string;
  term: TermNumber;
  subjectTitle: string;
  gradeLevel: string;
  competency: string;
  targetWeight: 'Written Works' | 'Performance Tasks' | 'Summative Test';
  cognitiveLevels: {
    remembering: number;
    understanding: number;
    applying: number;
    analyzing: number;
    evaluating: number;
    creating: number;
  };
  items: Array<{
    itemNumber: number;
    type: 'Multiple Choice' | 'Constructed Response' | 'Performance Rubric' | 'Practical Demonstration';
    questionOrPrompt: string;
    options?: string[];
    correctAnswerOrRubric: string;
    points: number;
  }>;
}
