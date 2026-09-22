export interface ILAWCustomField {
  id: string;
  label: string;
  value: string;
}

export interface ILAWHeaderInfo {
  lesson: string;
  learningArea: string;
  teacher: string;
  contentEvaluator: string;
  languageEvaluator: string;
  formatEvaluator: string;
  school: string;
  division: string;
  region: string;
  gradeLevelAndSection: string;
  gradeBand: 'K-6' | '7-10' | '11-12';
  term: number; // 1 | 2 | 3
  bowWeek: string;
  inclusiveTeachingDates: string;
  numberOfSessions: number;
  references: string[];
  declarationOfAIUse: string;
  address?: string;
  telephone?: string;
  email?: string;
  website?: string;
  logoLeftUrl?: string;
  logoRightUrl?: string;
  logoCenterUrl?: string;
  templateType?: 'LNNCHS_STANDARD' | 'CUSTOM' | 'DEPED_OFFICIAL' | 'SCHOOL_HEADER';
  customFields?: ILAWCustomField[];
  topics?: string[];
}

export interface ILAWCompetency {
  melc: string;
  content: string;
  contentStandard: string;
  performanceStandard: string;
}

export interface ILAWSessionObjective {
  sessionNumber: number;
  sessionDate: string;
  objectives: string[];
}

export interface ILAWSessionExperience {
  sessionNumber: number;
  sessionDate: string;
  preLesson: {
    engage: {
      time: string;
      activity: string;
    };
    elicit: {
      time: string;
      activity: string;
      expectedResponses: string;
    };
  };
  flow: {
    explore: {
      time: string;
      groupActivity: {
        formatType: string;
        title: string;
        instructions: string;
      };
      individualOutput: {
        outputType: string;
        title: string;
        instructions: string;
      };
    };
    explain: {
      time: string;
      synthesisQuestions: string[];
    };
  };
  learningResources: string[];
  opportunitiesForIntegration: Array<{
    area: string;
    connection: string;
  }>;
}

export interface ILAWSessionAssessment {
  sessionNumber: number;
  sessionDate: string;
  formativeTask: string;
  guidanceAndSupport: string;
  accommodations: string;
}

export interface ILAWWaysForward {
  extendedLearningOpportunities: string[];
  reflections: string;
}

export interface ILAWLearningActivitySheet {
  sessionNumber: number;
  sessionDate: string;
  activityTitle: string;
  objectives: string[];
  materials: string[];
  instruction: string;
  partAGroup: {
    title: string;
    formatType: string;
    scenarioOrPrompt: string;
    tableData?: {
      headers: string[];
      rows: string[][];
    };
    guidingQuestions: string[];
    drawingPrompt?: string;
  };
  partBIndividual: {
    title: string;
    outputType: string;
    taskPrompt: string;
    analysisChallenge: string[];
  };
  answerKey: {
    partAAnswers: string[];
    partBAnswers: string[];
  };
  rubric: {
    criteria: Array<{
      criterion: string;
      exemplary4: string;
      proficient3: string;
      developing2: string;
      beginning1: string;
    }>;
  };
  notesForUse: string[];
}

export interface ILAWSlide {
  slideNumber: number;
  sessionNumber: number;
  title: string;
  subtitle?: string;
  type: 'title' | 'objective' | 'engage' | 'elicit' | 'explore' | 'explain' | 'synthesis';
  bodyBullets: string[]; // Key phrases designed for ≥ 35pt display
  speakerNotes: string;
  badge?: string;
}

export interface ILAWCompletePlan {
  id: string;
  header: ILAWHeaderInfo;
  matrix: {
    intentions: string;
    competency: ILAWCompetency;
    objectives: ILAWSessionObjective[];
    learnerContext: string;
    learningExperience: ILAWSessionExperience[];
    assessment: ILAWSessionAssessment[];
    waysForward: ILAWWaysForward;
  };
  activitySheets: ILAWLearningActivitySheet[];
  presentationSlides: ILAWSlide[];
}
