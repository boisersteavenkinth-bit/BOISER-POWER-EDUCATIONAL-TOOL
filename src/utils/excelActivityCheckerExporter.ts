import * as XLSX from 'xlsx';

export interface StudentScoreRecord {
  id: string;
  name: string;
  gender: 'M' | 'F';
  las1Score: number;
  las2Score: number;
  las3Score: number;
  las4Score: number;
}

export interface ActivityCheckerMeta {
  school: string;
  subject: string;
  gradeAndSection: string;
  teacher: string;
  term: string;
  week: string;
  topic: string;
  dates: string;
  maxScores: {
    las1: number;
    las2: number;
    las3: number;
    las4: number;
  };
}

export function exportActivityCheckerToXlsx(
  students: StudentScoreRecord[],
  meta: ActivityCheckerMeta,
  fileName?: string
): void {
  const wb = XLSX.utils.book_new();

  const totalMax = meta.maxScores.las1 + meta.maxScores.las2 + meta.maxScores.las3 + meta.maxScores.las4;

  // Header rows
  const wsData: any[][] = [
    ['DEPARTMENT OF EDUCATION — REGION X (NORTHERN MINDANAO)'],
    [meta.school.toUpperCase()],
    ['OFFICIAL ILAW LEARNING ACTIVITY SHEET (LAS) AUTO-ACTIVITY CHECKER & GRADEBOOK'],
    [`Compliant with DepEd Order No. 3, s. 2026 & DepEd Order No. 009, s. 2026`],
    [],
    ['Subject:', meta.subject, '', 'Grade & Section:', meta.gradeAndSection],
    ['Teacher:', meta.teacher, '', 'Term & Week:', `${meta.term} • ${meta.week}`],
    ['Lesson Title:', meta.topic, '', 'Teaching Dates:', meta.dates],
    [],
    // Table Headers
    [
      'No.',
      'Learner Name',
      'Gender',
      `LAS 1 (${meta.maxScores.las1} pts)`,
      `LAS 2 (${meta.maxScores.las2} pts)`,
      `LAS 3 (${meta.maxScores.las3} pts)`,
      `LAS 4 (${meta.maxScores.las4} pts)`,
      `Total Score (${totalMax} pts)`,
      'Percentage (%)',
      'Transmuted Grade',
      'Mastery Status'
    ]
  ];

  // Data rows
  students.forEach((st, idx) => {
    const rowNum = wsData.length + 1; // 1-based row number for Excel formulas
    const rawTotal = st.las1Score + st.las2Score + st.las3Score + st.las4Score;
    const pct = totalMax > 0 ? (rawTotal / totalMax) * 100 : 0;
    const transmuted = transmuteDepEdScore(pct);
    const mastery = pct >= 85 ? 'Mastered' : pct >= 75 ? 'Developing' : 'Needs Support';

    wsData.push([
      idx + 1,
      st.name,
      st.gender,
      st.las1Score,
      st.las2Score,
      st.las3Score,
      st.las4Score,
      { f: `SUM(D${rowNum}:G${rowNum})`, v: rawTotal },
      { f: `ROUND((H${rowNum}/${totalMax})*100, 2)`, v: Math.round(pct * 100) / 100 },
      transmuted,
      mastery
    ]);
  });

  // Summary row
  const startRow = 11;
  const endRow = startRow + students.length - 1;
  wsData.push([]);
  wsData.push([
    'CLASS AVERAGE',
    '',
    '',
    { f: `AVERAGE(D${startRow}:D${endRow})` },
    { f: `AVERAGE(E${startRow}:E${endRow})` },
    { f: `AVERAGE(F${startRow}:F${endRow})` },
    { f: `AVERAGE(G${startRow}:G${endRow})` },
    { f: `AVERAGE(H${startRow}:H${endRow})` },
    { f: `AVERAGE(I${startRow}:I${endRow})` },
    '',
    ''
  ]);

  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Column widths
  ws['!cols'] = [
    { wch: 6 },  // No.
    { wch: 28 }, // Name
    { wch: 8 },  // Gender
    { wch: 14 }, // LAS 1
    { wch: 14 }, // LAS 2
    { wch: 14 }, // LAS 3
    { wch: 14 }, // LAS 4
    { wch: 16 }, // Total Score
    { wch: 14 }, // Percentage
    { wch: 16 }, // Transmuted Grade
    { wch: 16 }  // Mastery Status
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'LAS Grade Checker');

  const cleanSubject = meta.subject.replace(/[^a-zA-Z0-9]/g, '_');
  const actualFileName = fileName || `DepEd_ILAW_Activity_Checker_${cleanSubject}_${meta.term.replace(/\s+/g, '')}.xlsx`;
  XLSX.writeFile(wb, actualFileName);
}

/**
 * Standard DepEd Initial Grade to Transmuted Grade conversion (DO 8 / DO 009 s. 2026)
 */
export function transmuteDepEdScore(percentage: number): number {
  if (percentage >= 100) return 100;
  if (percentage >= 98.4) return 99;
  if (percentage >= 96.8) return 98;
  if (percentage >= 95.2) return 97;
  if (percentage >= 93.6) return 96;
  if (percentage >= 92.0) return 95;
  if (percentage >= 90.4) return 94;
  if (percentage >= 88.8) return 93;
  if (percentage >= 87.2) return 92;
  if (percentage >= 85.6) return 91;
  if (percentage >= 84.0) return 90;
  if (percentage >= 82.4) return 89;
  if (percentage >= 80.8) return 88;
  if (percentage >= 79.2) return 87;
  if (percentage >= 77.6) return 86;
  if (percentage >= 76.0) return 85;
  if (percentage >= 74.4) return 84;
  if (percentage >= 72.8) return 83;
  if (percentage >= 71.2) return 82;
  if (percentage >= 69.6) return 81;
  if (percentage >= 68.0) return 80;
  if (percentage >= 66.4) return 79;
  if (percentage >= 64.8) return 78;
  if (percentage >= 63.2) return 77;
  if (percentage >= 61.6) return 76;
  if (percentage >= 60.0) return 75;
  if (percentage >= 56.0) return 74;
  if (percentage >= 52.0) return 73;
  if (percentage >= 48.0) return 72;
  if (percentage >= 44.0) return 71;
  if (percentage >= 40.0) return 70;
  return 60 + Math.floor(percentage / 4);
}
