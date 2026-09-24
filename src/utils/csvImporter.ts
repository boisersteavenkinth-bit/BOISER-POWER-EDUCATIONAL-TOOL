import { CompetencyRecord, KeyStage, VerificationStatus } from '../types';

/**
 * Parses raw CSV text into array of strings per row, correctly handling quoted commas and newlines.
 */
function parseCSVRows(csvText: string): string[][] {
  const result: string[][] = [];
  let currentRow: string[] = [];
  let currentVal = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentVal.trim());
      if (currentRow.some((field) => field.length > 0)) {
        result.push(currentRow);
      }
      currentRow = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }

  if (currentVal.length > 0 || currentRow.length > 0) {
    currentRow.push(currentVal.trim());
    if (currentRow.some((field) => field.length > 0)) {
      result.push(currentRow);
    }
  }

  return result;
}

export interface CSVParseResult {
  success: boolean;
  records: CompetencyRecord[];
  errors: string[];
  totalParsed: number;
}

/**
 * Parses CSV file text and returns CompetencyRecord array with validation feedback.
 */
export function parseCompetencyCSV(csvContent: string): CSVParseResult {
  const rows = parseCSVRows(csvContent);
  const errors: string[] = [];
  const records: CompetencyRecord[] = [];

  if (rows.length < 2) {
    return {
      success: false,
      records: [],
      errors: ['CSV file is empty or missing headers.'],
      totalParsed: 0
    };
  }

  // Normalize header map
  const headers = rows[0].map((h) => h.toLowerCase().replace(/[^a-z0-9_]/g, ''));
  const headerIndex = (possibleNames: string[]): number => {
    return headers.findIndex((h) => possibleNames.includes(h));
  };

  const idIdx = headerIndex(['id', 'code', 'comp_id']);
  const gradeIdx = headerIndex(['grade_level', 'grade', 'gradelevel']);
  const keyStageIdx = headerIndex(['key_stage', 'keystage', 'ks']);
  const termIdx = headerIndex(['term', 'quarter', 'term_number']);
  const weekIdx = headerIndex(['week', 'week_number']);
  const subjCodeIdx = headerIndex(['subject_code', 'subjectcode', 'code']);
  const subjTitleIdx = headerIndex(['subject_title', 'subject_name', 'subject']);
  const compCodeIdx = headerIndex(['competency_code', 'comp_code', 'code']);
  const compStmtIdx = headerIndex(['learning_competency', 'competency', 'statement', 'learningcompetency', 'lc']);
  const domainIdx = headerIndex(['domain', 'strand']);
  const contentStdIdx = headerIndex(['content_standard', 'contentstd']);
  const perfStdIdx = headerIndex(['performance_standard', 'perfstd']);
  const trackIdx = headerIndex(['track', 'shs_track']);
  const bowSourceIdx = headerIndex(['bow_source', 'source']);

  if (compStmtIdx === -1) {
    return {
      success: false,
      records: [],
      errors: ['CSV missing required column "learning_competency" or "competency".'],
      totalParsed: 0
    };
  }

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const statement = row[compStmtIdx]?.trim();

    if (!statement) {
      continue; // Skip blank competency lines
    }

    const rawGrade = row[gradeIdx] || '11';
    let grade_level: number | 'Kindergarten' = 11;
    if (rawGrade.toLowerCase().includes('kinder')) {
      grade_level = 'Kindergarten';
    } else {
      const parsedNum = parseInt(rawGrade.replace(/\D/g, ''), 10);
      if (!isNaN(parsedNum)) {
        grade_level = parsedNum;
      }
    }

    let key_stage: KeyStage = 'KS 3';
    if (grade_level === 'Kindergarten' || (typeof grade_level === 'number' && grade_level <= 3)) {
      key_stage = 'KS 1';
    } else if (typeof grade_level === 'number' && grade_level <= 6) {
      key_stage = 'KS 2';
    } else if (typeof grade_level === 'number' && grade_level <= 10) {
      key_stage = 'KS 3';
    } else {
      key_stage = 'KS 4';
    }

    const rawTerm = parseInt(row[termIdx] || '1', 10);
    const term = (rawTerm >= 1 && rawTerm <= 3 ? rawTerm : 1) as 1 | 2 | 3;

    const record: CompetencyRecord = {
      id: row[idIdx] || `csv-comp-${Date.now()}-${r}`,
      school_year: '2026-2027',
      grade_level,
      key_stage,
      curriculum: grade_level === 11 || grade_level === 12 ? 'Strengthened SHS Curriculum' : 'MATATAG',
      subject_code: row[subjCodeIdx] || 'SUBJ-CSV',
      subject_title: row[subjTitleIdx] || 'Imported Subject',
      term,
      week: row[weekIdx] || '1-2',
      domain: row[domainIdx] || 'Imported Domain',
      learning_competency: statement,
      competency_code: row[compCodeIdx] || null,
      content_standard: row[contentStdIdx] || 'Understands core principles',
      performance_standard: row[perfStdIdx] || 'Demonstrates practical mastery',
      track: (row[trackIdx] as any) || ((typeof grade_level === 'number' && grade_level >= 11) ? 'Academic' : 'General K-10'),
      assessment_weight_set: 'DO-015-2026',
      bow_source: row[bowSourceIdx] || 'DepEd CSV Bulk Import',
      cg_source: 'User CSV Import',
      transition_flag: grade_level === 12,
      verification_status: 'unverified'
    };

    records.push(record);
  }

  return {
    success: records.length > 0,
    records,
    errors,
    totalParsed: records.length
  };
}

/**
 * Generates sample CSV string for users to download and reference.
 */
export function generateSampleCompetencyCSV(): string {
  const headers = [
    'id',
    'grade_level',
    'term',
    'week',
    'subject_code',
    'subject_title',
    'domain',
    'learning_competency',
    'competency_code',
    'content_standard',
    'performance_standard',
    'track',
    'bow_source'
  ];

  const sampleRows = [
    [
      'CSV-COMP-001',
      '11',
      '1',
      '1-2',
      'GEN-MATH-11',
      'General Mathematics',
      'Functions and Their Graphs',
      'Represents real-life situations using functions, including piece-wise functions.',
      'M11GM-Ia-1',
      'Key concepts of functions and relations',
      'Constructs mathematical models using functions',
      'Academic',
      'DepEd Order No. 009, s. 2026'
    ],
    [
      'CSV-COMP-002',
      '7',
      '1',
      '3-4',
      'SCI-7',
      'Science 7',
      'Matter and Solutions',
      'Investigates the properties of unsaturated, saturated, and supersaturated solutions.',
      'S7MT-Ia-1',
      'Properties of mixtures and solutions',
      'Prepares solutions of specified concentrations',
      'General K-10',
      'DepEd Order No. 015, s. 2026'
    ]
  ];

  const csvLines = [
    headers.join(','),
    ...sampleRows.map((r) => r.map((val) => `"${val.replace(/"/g, '""')}"`).join(','))
  ];

  return csvLines.join('\n');
}
