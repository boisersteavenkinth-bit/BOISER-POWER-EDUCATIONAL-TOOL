export type DatasetType =
  | 'Curriculum'
  | 'Competency'
  | 'Learning Standard'
  | 'MELC'
  | 'MATATAG Curriculum'
  | 'Subject'
  | 'Grade Level'
  | 'Quarter/Term'
  | 'Research Study'
  | 'Journal Article'
  | 'Thesis'
  | 'Dissertation'
  | 'Classroom Action Research'
  | 'Research Instrument'
  | 'Intervention'
  | 'Citation'
  | 'School'
  | 'Teacher'
  | 'Learning Resource';

export type CurriculumVersion =
  | 'K12_ORIGINAL'
  | 'MELC_2020'
  | 'MATATAG'
  | 'MATATAG_2026'
  | 'OTHER_OFFICIAL_REVISION';

export type SourceStatus =
  | 'VERIFIED_OFFICIAL'
  | 'SECONDARY_SOURCE'
  | 'USER_IMPORTED'
  | 'NEEDS_VERIFICATION';

export type VerificationStatusLevel =
  | 'VERIFIED'
  | 'PARTIALLY_VERIFIED'
  | 'NEEDS_VERIFICATION'
  | 'UNVERIFIED';

export type PublicationType =
  | 'PEER_REVIEWED'
  | 'GOVERNMENT_REPORT'
  | 'THESIS'
  | 'DISSERTATION'
  | 'CONFERENCE_PAPER'
  | 'PREPRINT'
  | 'SYSTEMATIC_REVIEW'
  | 'META_ANALYSIS'
  | 'BOOK'
  | 'WEB_RESOURCE';

export interface CurriculumRecordMaster {
  curriculum_id: string;
  curriculum_name: string;
  curriculum_version: CurriculumVersion;
  implementation_year: string;
  school_year: string;
  grade_level: string;
  learning_area: string;
  subject: string;
  domain?: string;
  strand?: string;
  competency_code: string;
  competency_text: string;
  content_standard?: string;
  performance_standard?: string;
  learning_objective?: string;
  prerequisite_competency?: string;
  term: 'Term 1' | 'Term 2' | 'Term 3';
  quarter?: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  source_document: string;
  source_url?: string;
  source_date?: string;
  verification_status: SourceStatus;
  last_verified?: string;
  notes?: string;
  import_batch_id?: string;
}

export interface ScienceRecordMaster {
  id: string;
  grade: string;
  term: 'Term 1' | 'Term 2' | 'Term 3';
  discipline: 'Physics' | 'Chemistry' | 'Biology' | 'Earth Science' | 'Environmental Science' | 'General Science' | 'STEM';
  domain: string;
  topic: string;
  subtopic?: string;
  competency_code: string;
  competency: string;
  scientific_concept: string;
  inquiry_skill: string;
  investigation_skill: string;
  laboratory_skill: string;
  hots_level: 'Remembering/Understanding' | 'Applying/Analyzing' | 'Evaluating/Creating';
  prerequisite_knowledge: string;
  misconception: string;
  intervention: string;
  assessment_type: string;
  research_connection: string;
  verification_status: SourceStatus;
}

export interface MathRecordMaster {
  id: string;
  grade: string;
  term: 'Term 1' | 'Term 2' | 'Term 3';
  strand: 'Number and Number Sense' | 'Measurement' | 'Geometry' | 'Algebra' | 'Statistics' | 'Probability' | 'Functions' | 'Mathematical Reasoning' | 'Problem Solving';
  domain: string;
  topic: string;
  subtopic?: string;
  competency_code: string;
  competency: string;
  mathematical_concept: string;
  procedural_skill: string;
  problem_solving_skill: string;
  reasoning_skill: string;
  hots_level: 'Remembering/Understanding' | 'Applying/Analyzing' | 'Evaluating/Creating';
  misconception: string;
  intervention: string;
  assessment: string;
  research_connection: string;
  verification_status: SourceStatus;
}

export type ActionResearchType =
  | 'Action Research'
  | 'Classroom-Based Research'
  | 'Descriptive Research'
  | 'Experimental/Quasi-Experimental Research'
  | 'Mixed Methods'
  | 'Case Study'
  | 'Survey Research'
  | 'Program Evaluation'
  | 'Developmental Research';

export interface ClassroomImprovementRecord {
  id: string;
  title: string;
  research_problem: string;
  baseline_data: string;
  root_cause_analysis: string;
  intervention: string;
  implementation: string;
  monitoring: string;
  post_test_data: string;
  analysis: string;
  reflection: string;
  recommendation: string;
  research_type: ActionResearchType;
  grade_level: string;
  subject: string;
  teacher: string;
  school: string;
  created_at: string;
  verification_status: VerificationStatusLevel;
}

export interface ResearchEventTemplate {
  id: string;
  event_name: 'ISTF' | 'DSTF' | 'RSTF' | 'NSTF' | string;
  event_level: 'Institutional' | 'Division' | 'Regional' | 'National';
  research_category: string;
  year: number;
  organizer: string;
  eligibility: string;
  required_sections: string[];
  formatting_rules: string;
  submission_requirements: string;
  evaluation_criteria: string;
  required_documents: string[];
  deadlines: string;
  source_document: string;
}

export interface ResearchSourceMaster {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal?: string;
  publisher?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
  abstract: string;
  keywords: string[];
  methodology: string;
  participants: string;
  intervention?: string;
  major_findings: string;
  limitations: string;
  research_gap: string;
  citation: string;
  publication_type: PublicationType;
  country: string;
  education_level: string;
  grade_level: string;
  subject: string;
  variables: string[];
  source_reliability: VerificationStatusLevel;
  verification_status: VerificationStatusLevel;
}

export interface ImportBatchReport {
  import_id: string;
  filename: string;
  timestamp: string;
  dataset_type: DatasetType;
  total_rows: number;
  imported_rows: number;
  rejected_rows: number;
  duplicate_rows: number;
  validation_errors: Array<{ row: number; column: string; message: string }>;
  warnings: Array<{ row: number; message: string }>;
  source: string;
  curriculum_version: CurriculumVersion;
}

export interface InterventionLibraryItem {
  id: string;
  name: string;
  category:
    | 'retrieval practice'
    | 'formative assessment'
    | 'peer instruction'
    | 'inquiry-based learning'
    | 'problem-based learning'
    | 'project-based learning'
    | 'differentiated instruction'
    | 'collaborative learning'
    | 'explicit instruction'
    | 'scaffolding'
    | 'feedback'
    | 'educational technology'
    | 'simulation'
    | 'gamification'
    | 'manipulatives'
    | 'laboratory/investigative learning'
    | 'contextualized learning';
  description: string;
  subject: string;
  grade_level: string;
  target_problem: string;
  evidence_source: string;
  evidence_year: number;
  implementation_notes: string;
}
