export interface CurriculumSource {
  ID: string;
  SchoolYear: string;
  GradeLevel: string;
  KeyStage: string;
  Curriculum: string;
  Track: string;
  SubjectCode: string;
  SubjectTitle: string;
  Term: string;
  Week: string;
  Domain: string;
  LearningCompetency: string;
  CompetencyCode: string;
  ContentStandard: string;
  PerformanceStandard: string;
  AssessmentWeightSet: string;
  BOWSource: string;
  CGSource: string;
  TransitionFlag: string;
  VerificationStatus: string;
}

export const CURRICULUM_SOURCES: CurriculumSource[] = [
  {
    ID: "SRC-001",
    SchoolYear: "2026-2027",
    GradeLevel: "Grade 11",
    KeyStage: "Key Stage 4",
    Curriculum: "MATATAG (DO 3, s. 2026)",
    Track: "Academic Track - STEM",
    SubjectCode: "ENG-11-ACAD",
    SubjectTitle: "English for Academic & Professional Purposes",
    Term: "1",
    Week: "Week 1-2",
    Domain: "Academic Text Structures",
    LearningCompetency: "Differentiate language used in academic texts from various disciplines.",
    CompetencyCode: "CS_EN11/12A-EAPP-Ia-c-1",
    ContentStandard: "The learner acquires knowledge of appropriate reading strategies for a better understanding of academic texts.",
    PerformanceStandard: "The learner produces a detailed abstract of information gathered from the various academic texts read.",
    AssessmentWeightSet: "Written 25% | Performance 50% | Exam 25%",
    BOWSource: "DepEd Region X ROX-BOW-2026",
    CGSource: "MATATAG SHS CG 2026",
    TransitionFlag: "FULL_MATATAG_IMPLEMENTATION",
    VerificationStatus: "VERIFIED_BY_CO"
  },
  {
    ID: "SRC-002",
    SchoolYear: "2026-2027",
    GradeLevel: "Grade 12",
    KeyStage: "Key Stage 4",
    Curriculum: "DO 3, s. 2026",
    Track: "TechPro - CSS",
    SubjectCode: "CSS-12-NET",
    SubjectTitle: "Computer Systems Servicing NC II",
    Term: "2",
    Week: "Week 3-4",
    Domain: "Network Configuration",
    LearningCompetency: "Configure client device IP addresses and verify connectivity.",
    CompetencyCode: "TVL-CSS-12-NET-IIa-1",
    ContentStandard: "The learner demonstrates understanding of computer networking principles and IP addressing.",
    PerformanceStandard: "The learner independently configures static IP addresses and performs network ping tests.",
    AssessmentWeightSet: "Written 20% | Performance 60% | Exam 20%",
    BOWSource: "LNNCHS TechPro Blueprint 2026",
    CGSource: "TESDA-NCII Aligned CG",
    TransitionFlag: "TECHPRO_ENHANCED",
    VerificationStatus: "VERIFIED_BY_LNNCHS_FACULTY"
  }
  // Add more entries here as needed
];
