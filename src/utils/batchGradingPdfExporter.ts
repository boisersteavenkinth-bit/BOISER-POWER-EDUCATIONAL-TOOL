import { jsPDF } from 'jspdf';
import { ComparativeGradingResult } from '../types/answerKey';

export interface BatchStudentGradeEntry {
  id: string; // LRN or Student ID
  name: string;
  gender?: 'M' | 'F';
  section: string;
  grade: string;
  gradingResult: ComparativeGradingResult;
  evaluatedAt?: string;
  notes?: string;
}

export interface BatchGradingExportConfig {
  title: string;
  subject: string;
  gradeLevel: string;
  section: string;
  schoolName?: string;
  schoolId?: string;
  district?: string;
  division?: string;
  region?: string;
  schoolYear?: string;
  teacherName?: string;
  departmentHead?: string;
  principalName?: string;
  dateEvaluated?: string;
  answerKeyUsed?: {
    id: string;
    title: string;
    totalItems: number;
    totalPoints: number;
  };
  students: BatchStudentGradeEntry[];
}

export const DEFAULT_BATCH_CONFIG: BatchGradingExportConfig = {
  title: '1st Trimester Comprehensive Diagnostic Assessment',
  subject: 'Life and Career Skills (DO 3, s. 2026)',
  gradeLevel: 'Grade 11',
  section: 'Einstein',
  schoolName: 'Lanao del Norte National Comprehensive High School',
  schoolId: '304005',
  district: 'Baroy District',
  division: 'Division of Lanao del Norte',
  region: 'Region X - Northern Mindanao',
  schoolYear: '2026-2027',
  teacherName: 'Steaven Kinth D. Boiser, T-III',
  departmentHead: 'Marites B. Alonto, Master Teacher II',
  principalName: 'Anisah A. Sinal, Principal IV',
  dateEvaluated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  students: []
};

/**
 * Generates and downloads a single consolidated PDF file containing:
 * - Page 1: Comprehensive Class Assessment Summary Dashboard (KPIs, Mastery Levels, Item Analysis, Consolidated Roster, Official Signatures)
 * - Pages 2+: Individual Learner Assessment Result Slips with Item-by-Item Comparisons, Qualitative Remediation Notes, and Parent Acknowledgment blocks.
 */
export function exportBatchGradingToPdf(config: BatchGradingExportConfig) {
  if (!config.students || config.students.length === 0) {
    throw new Error('No students selected for batch PDF export.');
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 14;
  const contentWidth = pageWidth - (margin * 2); // 182mm

  // Colors
  const navy = [0, 39, 118] as const; // DepEd Navy Blue
  const gold = [252, 209, 22] as const; // Philippine Sun Gold
  const slateDark = [30, 41, 59] as const;
  const slateMuted = [100, 116, 139] as const;
  const emerald = [16, 122, 77] as const;
  const red = [185, 28, 28] as const;
  const amber = [217, 119, 6] as const;
  const lightBg = [248, 250, 252] as const;

  // =========================================================================
  // PAGE 1: CONSOLIDATED SUMMARY DASHBOARD
  // =========================================================================
  let curY = margin;

  // 1. Institutional Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('REPUBLIC OF THE PHILIPPINES • DEPARTMENT OF EDUCATION', pageWidth / 2, curY, { align: 'center' });
  curY += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text(`${config.region || 'REGION X - NORTHERN MINDANAO'} • ${config.division || 'DIVISION OF LANAO DEL NORTE'}`, pageWidth / 2, curY, { align: 'center' });
  curY += 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text((config.schoolName || 'Lanao del Norte National Comprehensive High School').toUpperCase(), pageWidth / 2, curY, { align: 'center' });
  curY += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text(`School ID: ${config.schoolId || '304015'} • ${config.district || 'Tubod Central District'} • SY ${config.schoolYear || '2026-2027'}`, pageWidth / 2, curY, { align: 'center' });
  curY += 5;

  // 2. Dashboard Title Banner
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(margin, curY, contentWidth, 7.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('CONSOLIDATED CLASS ASSESSMENT SUMMARY DASHBOARD (DO 3, s. 2026)', pageWidth / 2, curY + 5.2, { align: 'center' });
  curY += 10.5;

  // 3. Assessment Metadata Card
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, curY, contentWidth, 14, 'FD');

  doc.setFontSize(7.5);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);

  doc.setFont('helvetica', 'bold');
  doc.text('Assessment:', margin + 3, curY + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.text(config.title, margin + 22, curY + 4.5);

  doc.setFont('helvetica', 'bold');
  doc.text('Grade & Section:', margin + 115, curY + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`${config.gradeLevel} - ${config.section}`, margin + 142, curY + 4.5);

  doc.setFont('helvetica', 'bold');
  doc.text('Subject / Area:', margin + 3, curY + 9.5);
  doc.setFont('helvetica', 'normal');
  doc.text(config.subject, margin + 22, curY + 9.5);

  doc.setFont('helvetica', 'bold');
  doc.text('Date Evaluated:', margin + 115, curY + 9.5);
  doc.setFont('helvetica', 'normal');
  doc.text(config.dateEvaluated || 'Current Session', margin + 142, curY + 9.5);

  curY += 16.5;

  // 4. Compute Statistical KPIs across batch
  const totalStudents = config.students.length;
  const totalScores = config.students.map(s => s.gradingResult.score);
  const maxPossiblePoints = config.students[0]?.gradingResult.totalPoints || 10;
  const totalPossibleItems = config.students[0]?.gradingResult.totalItems || 10;

  const sumScore = totalScores.reduce((a, b) => a + b, 0);
  const meanRawScore = Math.round((sumScore / totalStudents) * 10) / 10;
  const meanPct = Math.round((meanRawScore / maxPossiblePoints) * 1000) / 10;

  const transmutedGrades = config.students.map(s => s.gradingResult.depedTransmutedGrade);
  const meanTransmuted = Math.round(transmutedGrades.reduce((a, b) => a + b, 0) / totalStudents);
  const highestScore = Math.max(...totalScores);
  const lowestScore = Math.min(...totalScores);
  const passingStudents = config.students.filter(s => s.gradingResult.depedTransmutedGrade >= 75).length;
  const passingRate = Math.round((passingStudents / totalStudents) * 100);

  // 5. Four KPI Summary Metric Boxes
  const kpiBoxWidth = (contentWidth - 6) / 4;
  const kpiBoxHeight = 15;

  // Box 1: Enrolled / Evaluated
  doc.setFillColor(240, 249, 255); // Blue 50
  doc.setDrawColor(186, 230, 253);
  doc.rect(margin, curY, kpiBoxWidth, kpiBoxHeight, 'FD');
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('STUDENTS EVALUATED', margin + (kpiBoxWidth / 2), curY + 4, { align: 'center' });
  doc.setFontSize(13);
  doc.text(`${totalStudents}`, margin + (kpiBoxWidth / 2), curY + 10.5, { align: 'center' });
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.text(`Passing: ${passingRate}% (${passingStudents}/${totalStudents})`, margin + (kpiBoxWidth / 2), curY + 13.5, { align: 'center' });

  // Box 2: Mean Raw Score
  doc.setFillColor(240, 253, 244); // Emerald 50
  doc.setDrawColor(187, 247, 208);
  doc.rect(margin + kpiBoxWidth + 2, curY, kpiBoxWidth, kpiBoxHeight, 'FD');
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(emerald[0], emerald[1], emerald[2]);
  doc.text('CLASS MEAN RAW SCORE', margin + kpiBoxWidth + 2 + (kpiBoxWidth / 2), curY + 4, { align: 'center' });
  doc.setFontSize(13);
  doc.text(`${meanRawScore} / ${maxPossiblePoints}`, margin + kpiBoxWidth + 2 + (kpiBoxWidth / 2), curY + 10.5, { align: 'center' });
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.text(`Accuracy Rate: ${meanPct}%`, margin + kpiBoxWidth + 2 + (kpiBoxWidth / 2), curY + 13.5, { align: 'center' });

  // Box 3: Mean Transmuted Grade
  doc.setFillColor(254, 252, 232); // Amber 50
  doc.setDrawColor(254, 240, 138);
  doc.rect(margin + (kpiBoxWidth * 2) + 4, curY, kpiBoxWidth, kpiBoxHeight, 'FD');
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(amber[0], amber[1], amber[2]);
  doc.text('TRANSMUTED CLASS GWA', margin + (kpiBoxWidth * 2) + 4 + (kpiBoxWidth / 2), curY + 4, { align: 'center' });
  doc.setFontSize(13);
  doc.text(`${meanTransmuted}`, margin + (kpiBoxWidth * 2) + 4 + (kpiBoxWidth / 2), curY + 10.5, { align: 'center' });
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.text(meanTransmuted >= 90 ? 'Outstanding Band' : meanTransmuted >= 85 ? 'Very Satisfactory' : 'Satisfactory Band', margin + (kpiBoxWidth * 2) + 4 + (kpiBoxWidth / 2), curY + 13.5, { align: 'center' });

  // Box 4: Score Range
  doc.setFillColor(248, 250, 252); // Slate 50
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin + (kpiBoxWidth * 3) + 6, curY, kpiBoxWidth, kpiBoxHeight, 'FD');
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('SCORE RANGE (HIGH/LOW)', margin + (kpiBoxWidth * 3) + 6 + (kpiBoxWidth / 2), curY + 4, { align: 'center' });
  doc.setFontSize(12);
  doc.text(`${highestScore}  -  ${lowestScore}`, margin + (kpiBoxWidth * 3) + 6 + (kpiBoxWidth / 2), curY + 10.5, { align: 'center' });
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.text(`Max: ${maxPossiblePoints} pts (${totalPossibleItems} items)`, margin + (kpiBoxWidth * 3) + 6 + (kpiBoxWidth / 2), curY + 13.5, { align: 'center' });

  curY += kpiBoxHeight + 3.5;

  // 6. DepEd Mastery Level Breakdown Bar
  const outstandingCount = config.students.filter(s => s.gradingResult.depedTransmutedGrade >= 90).length;
  const verySatCount = config.students.filter(s => s.gradingResult.depedTransmutedGrade >= 85 && s.gradingResult.depedTransmutedGrade < 90).length;
  const satCount = config.students.filter(s => s.gradingResult.depedTransmutedGrade >= 80 && s.gradingResult.depedTransmutedGrade < 85).length;
  const fairlySatCount = config.students.filter(s => s.gradingResult.depedTransmutedGrade >= 75 && s.gradingResult.depedTransmutedGrade < 80).length;
  const didNotMeetCount = config.students.filter(s => s.gradingResult.depedTransmutedGrade < 75).length;

  doc.setFillColor(241, 245, 249);
  doc.rect(margin, curY, contentWidth, 10, 'F');
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('DEPED PROFICIENCY DISTRIBUTION:', margin + 3, curY + 4);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(`• Outstanding (90-100%): ${outstandingCount} (${Math.round((outstandingCount / totalStudents) * 100)}%)`, margin + 3, curY + 7.5);
  doc.text(`• Very Satisfactory (85-89%): ${verySatCount}`, margin + 50, curY + 7.5);
  doc.text(`• Satisfactory (80-84%): ${satCount}`, margin + 95, curY + 7.5);
  doc.text(`• Fairly Satisfactory (75-79%): ${fairlySatCount}`, margin + 130, curY + 7.5);
  doc.text(`• Below 75%: ${didNotMeetCount}`, margin + 165, curY + 7.5);

  curY += 13;

  // 7. Item Analysis / Competency Mastery Summary Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('ITEM ANALYSIS & COMPETENCY MASTERY (DIAGNOSTIC FREQUENCY):', margin, curY);
  curY += 3;

  // Header row for item analysis
  const itemAnalysisCols = [
    { label: 'Item', width: 10, align: 'center' as const },
    { label: 'Competency / Question Tested', width: 78, align: 'left' as const },
    { label: 'Key', width: 16, align: 'center' as const },
    { label: 'Correct', width: 16, align: 'center' as const },
    { label: 'Error', width: 16, align: 'center' as const },
    { label: '% Mastery', width: 20, align: 'center' as const },
    { label: 'Formative Assessment Action', width: 26, align: 'left' as const }
  ];

  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(margin, curY, contentWidth, 4.5, 'F');
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);

  let curX = margin;
  itemAnalysisCols.forEach(col => {
    const textX = col.align === 'center' ? curX + (col.width / 2) : curX + 1.5;
    doc.text(col.label, textX, curY + 3.2, { align: col.align });
    curX += col.width;
  });
  curY += 4.5;

  // Render top items (up to 6 items to fit on page 1)
  const sampleItems = config.students[0]?.gradingResult.itemComparisons || [];
  const displayItems = sampleItems.slice(0, 6);

  displayItems.forEach((it, idx) => {
    let correctCount = 0;
    config.students.forEach(s => {
      const match = s.gradingResult.itemComparisons.find(item => item.itemNumber === it.itemNumber);
      if (match?.isCorrect) correctCount++;
    });
    const errorCount = totalStudents - correctCount;
    const itemPct = Math.round((correctCount / totalStudents) * 100);
    const actionDesc = itemPct >= 80 ? 'Mastered' : itemPct >= 60 ? 'Reinforce' : 'Reteach / Remediate';

    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(margin, curY, contentWidth, 4.2, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);

    curX = margin;
    // Col 0: Item
    doc.text(`${it.itemNumber}`, curX + 5, curY + 3, { align: 'center' });
    curX += 10;
    // Col 1: Question
    const truncatedQ = (it.question || `Item ${it.itemNumber}`).length > 55
      ? (it.question || `Item ${it.itemNumber}`).substring(0, 52) + '...'
      : (it.question || `Item ${it.itemNumber}`);
    doc.text(truncatedQ, curX + 1.5, curY + 3);
    curX += 78;
    // Col 2: Key
    doc.setFont('helvetica', 'bold');
    doc.text(it.correctAnswer.substring(0, 8), curX + 8, curY + 3, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    curX += 16;
    // Col 3: Correct
    doc.setTextColor(emerald[0], emerald[1], emerald[2]);
    doc.text(`${correctCount}`, curX + 8, curY + 3, { align: 'center' });
    curX += 16;
    // Col 4: Error
    doc.setTextColor(errorCount > 0 ? red[0] : slateDark[0], errorCount > 0 ? red[1] : slateDark[1], errorCount > 0 ? red[2] : slateDark[2]);
    doc.text(`${errorCount}`, curX + 8, curY + 3, { align: 'center' });
    curX += 16;
    // Col 5: % Mastery
    doc.setTextColor(itemPct >= 75 ? emerald[0] : amber[0], itemPct >= 75 ? emerald[1] : amber[1], itemPct >= 75 ? emerald[2] : amber[2]);
    doc.text(`${itemPct}%`, curX + 10, curY + 3, { align: 'center' });
    curX += 20;
    // Col 6: Action
    doc.setTextColor(itemPct >= 80 ? emerald[0] : itemPct >= 60 ? navy[0] : red[0], itemPct >= 80 ? emerald[1] : itemPct >= 60 ? navy[1] : red[1], itemPct >= 80 ? emerald[2] : itemPct >= 60 ? navy[2] : red[2]);
    doc.text(actionDesc, curX + 1.5, curY + 3);

    curY += 4.2;
  });

  curY += 3;

  // 8. Consolidated Student Roster Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('CONSOLIDATED STUDENT RESULTS ROSTER:', margin, curY);
  curY += 3;

  const rosterCols = [
    { label: 'Rank', width: 10, align: 'center' as const },
    { label: 'LRN / ID', width: 28, align: 'center' as const },
    { label: 'Learner Full Name', width: 62, align: 'left' as const },
    { label: 'Score', width: 18, align: 'center' as const },
    { label: '%', width: 14, align: 'center' as const },
    { label: 'Transmuted', width: 20, align: 'center' as const },
    { label: 'Mastery Level', width: 30, align: 'left' as const }
  ];

  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(margin, curY, contentWidth, 4.5, 'F');
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);

  curX = margin;
  rosterCols.forEach(col => {
    const textX = col.align === 'center' ? curX + (col.width / 2) : curX + 1.5;
    doc.text(col.label, textX, curY + 3.2, { align: col.align });
    curX += col.width;
  });
  curY += 4.5;

  // Sort students by score descending for ranking
  const sortedStudents = [...config.students].sort((a, b) => b.gradingResult.score - a.gradingResult.score);

  // Render up to 10 students on dashboard page
  sortedStudents.slice(0, 10).forEach((st, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(margin, curY, contentWidth, 4.2, 'F');

    doc.setFontSize(6);
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);

    curX = margin;
    // Rank
    doc.setFont('helvetica', 'bold');
    doc.text(`${idx + 1}`, curX + 5, curY + 3, { align: 'center' });
    curX += 10;
    // LRN
    doc.setFont('helvetica', 'normal');
    doc.text(st.id, curX + 14, curY + 3, { align: 'center' });
    curX += 28;
    // Name
    doc.setFont('helvetica', 'bold');
    doc.text(st.name.substring(0, 38), curX + 1.5, curY + 3);
    curX += 62;
    // Score
    doc.setFont('helvetica', 'normal');
    doc.text(`${st.gradingResult.score} / ${st.gradingResult.totalPoints}`, curX + 9, curY + 3, { align: 'center' });
    curX += 18;
    // Percentage
    doc.text(`${st.gradingResult.percentage}%`, curX + 7, curY + 3, { align: 'center' });
    curX += 14;
    // Transmuted Grade
    doc.setFont('helvetica', 'bold');
    const transmuted = st.gradingResult.depedTransmutedGrade;
    doc.setTextColor(transmuted >= 90 ? emerald[0] : transmuted >= 80 ? navy[0] : amber[0], transmuted >= 90 ? emerald[1] : transmuted >= 80 ? navy[1] : amber[1], transmuted >= 90 ? emerald[2] : transmuted >= 80 ? navy[2] : amber[2]);
    doc.text(`${transmuted}`, curX + 10, curY + 3, { align: 'center' });
    curX += 20;
    // Mastery Level
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
    doc.text(st.gradingResult.masteryLevel.substring(0, 22), curX + 1.5, curY + 3);

    curY += 4.2;
  });

  if (sortedStudents.length > 10) {
    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    doc.text(`* Showing top 10 of ${sortedStudents.length} learners. Full individual slips follow on subsequent pages.`, margin, curY + 3);
    curY += 5;
  } else {
    curY += 4;
  }

  // 9. Signatures Block (Bottom of Page 1)
  const signY = pageHeight - 26;
  const signColWidth = (contentWidth - 8) / 3;

  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);

  // Col 1: Prepared
  doc.text('Prepared & Evaluated by:', margin, signY);
  doc.line(margin, signY + 11, margin + signColWidth - 4, signY + 11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(config.teacherName || 'Subject Teacher / Adviser', margin, signY + 14.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text('Subject Teacher / Class Adviser', margin, signY + 17.5);

  // Col 2: Verified
  const col2X = margin + signColWidth + 4;
  doc.setFontSize(6.5);
  doc.text('Verified & Checked by:', col2X, signY);
  doc.line(col2X, signY + 11, col2X + signColWidth - 4, signY + 11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(config.departmentHead || 'Department Head / MT', col2X, signY + 14.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text('Head Teacher / Master Teacher', col2X, signY + 17.5);

  // Col 3: Approved
  const col3X = margin + (signColWidth * 2) + 8;
  doc.setFontSize(6.5);
  doc.text('Approved by:', col3X, signY);
  doc.line(col3X, signY + 11, col3X + signColWidth - 4, signY + 11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(config.principalName || 'Dr. Connie A. Emborong, Principal IV', col3X, signY + 14.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text('Secondary School Principal IV', col3X, signY + 17.5);

  // Page 1 Footer stamp
  doc.setFontSize(5.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text('Page 1 of ' + (config.students.length + 1) + ' • Consolidated Batch Assessment Summary • DepEd DO 3, s. 2026 Standards', pageWidth / 2, pageHeight - 5, { align: 'center' });

  // =========================================================================
  // PAGES 2+: INDIVIDUAL STUDENT GRADING RESULT SLIPS
  // =========================================================================
  config.students.forEach((student, sIdx) => {
    doc.addPage();
    let pY = margin;

    // 1. Sub Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.text('DEPARTMENT OF EDUCATION • REGION X - NORTHERN MINDANAO • DIVISION OF LANAO DEL NORTE', pageWidth / 2, pY, { align: 'center' });
    pY += 3.5;

    doc.setFontSize(9.5);
    doc.text((config.schoolName || 'Lanao del Norte National Comprehensive High School').toUpperCase(), pageWidth / 2, pY, { align: 'center' });
    pY += 3.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    doc.text(`School ID: ${config.schoolId || '304015'} • ${config.district || 'Tubod Central District'} • SY ${config.schoolYear || '2026-2027'}`, pageWidth / 2, pY, { align: 'center' });
    pY += 4.5;

    // 2. Individual Slip Header Banner
    doc.setFillColor(navy[0], navy[1], navy[2]);
    doc.rect(margin, pY, contentWidth, 7, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text('OFFICIAL INDIVIDUAL LEARNER ASSESSMENT RESULT SLIP', pageWidth / 2, pY + 4.8, { align: 'center' });
    pY += 9.5;

    // 3. Learner Profile Box
    doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, pY, contentWidth, 16, 'FD');

    doc.setFontSize(8);
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);

    // Row 1
    doc.setFont('helvetica', 'bold');
    doc.text('Learner Full Name:', margin + 3, pY + 4.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.text(student.name, margin + 33, pY + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
    doc.text('LRN / ID:', margin + 120, pY + 4.5);
    doc.setFont('helvetica', 'normal');
    doc.text(student.id, margin + 137, pY + 4.5);

    // Row 2
    doc.setFont('helvetica', 'bold');
    doc.text('Grade & Section:', margin + 3, pY + 9.5);
    doc.setFont('helvetica', 'normal');
    doc.text(`${student.grade} - ${student.section}`, margin + 33, pY + 9.5);

    doc.setFont('helvetica', 'bold');
    doc.text('Assessment Date:', margin + 120, pY + 9.5);
    doc.setFont('helvetica', 'normal');
    doc.text(student.evaluatedAt || config.dateEvaluated || 'Current Session', margin + 148, pY + 9.5);

    // Row 3
    doc.setFont('helvetica', 'bold');
    doc.text('Assessment Title:', margin + 3, pY + 14);
    doc.setFont('helvetica', 'normal');
    doc.text(`${config.title} (${config.subject})`, margin + 33, pY + 14);

    pY += 18.5;

    // 4. Score Summary Cards (4 Badges)
    const gr = student.gradingResult;
    const sBoxWidth = (contentWidth - 6) / 4;
    const sBoxHeight = 16;

    // Badge 1: Raw Score
    doc.setFillColor(240, 249, 255);
    doc.setDrawColor(186, 230, 253);
    doc.rect(margin, pY, sBoxWidth, sBoxHeight, 'FD');
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.text('RAW SCORE', margin + (sBoxWidth / 2), pY + 4.5, { align: 'center' });
    doc.setFontSize(14);
    doc.text(`${gr.score} / ${gr.totalPoints}`, margin + (sBoxWidth / 2), pY + 11, { align: 'center' });
    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'normal');
    doc.text(`${gr.summary.correctCount} correct • ${gr.summary.incorrectCount} incorrect`, margin + (sBoxWidth / 2), pY + 14.5, { align: 'center' });

    // Badge 2: Percentage
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(187, 247, 208);
    doc.rect(margin + sBoxWidth + 2, pY, sBoxWidth, sBoxHeight, 'FD');
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(emerald[0], emerald[1], emerald[2]);
    doc.text('SCORE PERCENTAGE', margin + sBoxWidth + 2 + (sBoxWidth / 2), pY + 4.5, { align: 'center' });
    doc.setFontSize(14);
    doc.text(`${gr.percentage}%`, margin + sBoxWidth + 2 + (sBoxWidth / 2), pY + 11, { align: 'center' });
    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'normal');
    doc.text('Computed vs Total Points', margin + sBoxWidth + 2 + (sBoxWidth / 2), pY + 14.5, { align: 'center' });

    // Badge 3: DepEd Transmuted Grade
    doc.setFillColor(254, 252, 232);
    doc.setDrawColor(254, 240, 138);
    doc.rect(margin + (sBoxWidth * 2) + 4, pY, sBoxWidth, sBoxHeight, 'FD');
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(amber[0], amber[1], amber[2]);
    doc.text('TRANSMUTED GRADE', margin + (sBoxWidth * 2) + 4 + (sBoxWidth / 2), pY + 4.5, { align: 'center' });
    doc.setFontSize(14);
    doc.text(`${gr.depedTransmutedGrade}`, margin + (sBoxWidth * 2) + 4 + (sBoxWidth / 2), pY + 11, { align: 'center' });
    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'normal');
    doc.text('DO 3, s. 2026 Table Standard', margin + (sBoxWidth * 2) + 4 + (sBoxWidth / 2), pY + 14.5, { align: 'center' });

    // Badge 4: Mastery Descriptor
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin + (sBoxWidth * 3) + 6, pY, sBoxWidth, sBoxHeight, 'FD');
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
    doc.text('MASTERY LEVEL', margin + (sBoxWidth * 3) + 6 + (sBoxWidth / 2), pY + 4.5, { align: 'center' });
    doc.setFontSize(10);
    doc.text(gr.masteryLevel.split(' ')[0], margin + (sBoxWidth * 3) + 6 + (sBoxWidth / 2), pY + 10.5, { align: 'center' });
    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'normal');
    doc.text(gr.depedTransmutedGrade >= 75 ? 'Passed Assessment' : 'Needs Remediation', margin + (sBoxWidth * 3) + 6 + (sBoxWidth / 2), pY + 14.5, { align: 'center' });

    pY += sBoxHeight + 4;

    // 5. Item-by-Item Detailed Comparison Table
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.text('ITEM-BY-ITEM COMPARATIVE EVALUATION MATRIX:', margin, pY);
    pY += 3;

    const indTableCols = [
      { label: 'Item', width: 10, align: 'center' as const },
      { label: 'Topic / Competency Question', width: 68, align: 'left' as const },
      { label: 'Student Answer', width: 28, align: 'left' as const },
      { label: 'Key Answer', width: 22, align: 'left' as const },
      { label: 'Status', width: 12, align: 'center' as const },
      { label: 'Pts', width: 10, align: 'center' as const },
      { label: 'Evaluation / Formative Feedback', width: 32, align: 'left' as const }
    ];

    doc.setFillColor(navy[0], navy[1], navy[2]);
    doc.rect(margin, pY, contentWidth, 4.5, 'F');
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);

    curX = margin;
    indTableCols.forEach(col => {
      const textX = col.align === 'center' ? curX + (col.width / 2) : curX + 1.5;
      doc.text(col.label, textX, pY + 3.2, { align: col.align });
      curX += col.width;
    });
    pY += 4.5;

    // Render items
    gr.itemComparisons.forEach((item, iIdx) => {
      doc.setFillColor(
        item.isCorrect ? 240 : 254, 
        item.isCorrect ? 253 : 242, 
        item.isCorrect ? 244 : 242
      );
      doc.rect(margin, pY, contentWidth, 4.5, 'F');

      doc.setFontSize(6);
      doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);

      curX = margin;
      // Item #
      doc.setFont('helvetica', 'bold');
      doc.text(`${item.itemNumber}`, curX + 5, pY + 3.2, { align: 'center' });
      curX += 10;
      // Topic
      doc.setFont('helvetica', 'normal');
      const qText = (item.question || `Item ${item.itemNumber}`).substring(0, 48);
      doc.text(qText, curX + 1.5, pY + 3.2);
      curX += 68;
      // Student Answer
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(item.isCorrect ? emerald[0] : red[0], item.isCorrect ? emerald[1] : red[1], item.isCorrect ? emerald[2] : red[2]);
      const sAns = (item.studentAnswer || '(Blank)').substring(0, 20);
      doc.text(sAns, curX + 1.5, pY + 3.2);
      curX += 28;
      // Correct Key
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(navy[0], navy[1], navy[2]);
      doc.text(item.correctAnswer.substring(0, 15), curX + 1.5, pY + 3.2);
      curX += 22;
      // Status
      doc.text(item.isCorrect ? 'PASS' : 'FAIL', curX + 6, pY + 3.2, { align: 'center' });
      curX += 12;
      // Points
      doc.setFont('helvetica', 'normal');
      doc.text(`${item.scoreAwarded}/${item.maxPoints}`, curX + 5, pY + 3.2, { align: 'center' });
      curX += 10;
      // Feedback
      doc.setFontSize(5.5);
      doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
      const fText = (item.feedback || (item.isCorrect ? 'Correct response' : 'Incorrect response')).substring(0, 26);
      doc.text(fText, curX + 1.5, pY + 3.2);

      pY += 4.5;
    });

    pY += 3;

    // 6. Pedagogical Feedback & Teacher Note Box
    doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, pY, contentWidth, 24, 'FD');

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.text('FORMATIVE ASSESSMENT & REMEDIATION PLAN (DO 3, s. 2026):', margin + 3, pY + 4);

    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(emerald[0], emerald[1], emerald[2]);
    doc.text('Strengths Observed:', margin + 3, pY + 8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
    const strength = (gr.feedback?.strengths || 'Consistent grasp of foundational concepts in the tested competencies.').substring(0, 110);
    doc.text(strength, margin + 32, pY + 8.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(amber[0], amber[1], amber[2]);
    doc.text('Review Focus:', margin + 3, pY + 13);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
    const review = (gr.feedback?.areasForImprovement || 'Reinforce application and higher-order critical thinking items.').substring(0, 110);
    doc.text(review, margin + 32, pY + 13);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.text('Teacher Note:', margin + 3, pY + 17.5);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
    const comment = `"${(gr.feedback?.teacherComment || 'Keep up the focused effort; continue honing your strengths for academic excellence.')}"`.substring(0, 120);
    doc.text(comment, margin + 32, pY + 17.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.5);
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    doc.text(`Evaluation Timestamp: ${student.evaluatedAt || config.dateEvaluated || 'Official LIS Session'} • Comparison Engine DO 3, s. 2026`, margin + 3, pY + 22);

    // 7. Signatures & Parent Acknowledgment (Bottom of Slip)
    const slipSignY = pageHeight - 25;
    const halfWidth = (contentWidth - 10) / 2;

    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);

    // Left: Teacher
    doc.text('Subject Teacher / Examiner:', margin, slipSignY);
    doc.line(margin, slipSignY + 10, margin + halfWidth, slipSignY + 10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
    doc.text(config.teacherName || 'Steaven Kinth D. Boiser, T-III', margin, slipSignY + 13.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.5);
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    doc.text('Official Examiner / Class Adviser', margin, slipSignY + 16.5);

    // Right: Parent / Guardian Acknowledgment
    const rightX = margin + halfWidth + 10;
    doc.setFontSize(6.5);
    doc.text('Parent / Guardian Acknowledgment:', rightX, slipSignY);
    doc.line(rightX, slipSignY + 10, rightX + halfWidth, slipSignY + 10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
    doc.text('Signature over Printed Name', rightX, slipSignY + 13.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.5);
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    doc.text('Date Received & Acknowledged: ____________________', rightX, slipSignY + 16.5);

    // Page Footer
    doc.setFontSize(5.5);
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    doc.text(`Page ${sIdx + 2} of ${config.students.length + 1} • Official Student Result Slip • ${student.name} (${student.id}) • LNNCHS School ID: ${config.schoolId || '304015'}`, pageWidth / 2, pageHeight - 5, { align: 'center' });
  });

  // Save the consolidated PDF
  const sanitizedTitle = (config.title || 'Grading_Results').replace(/[^a-zA-Z0-9_-]/g, '_');
  const sanitizedSection = (config.section || 'Class').replace(/[^a-zA-Z0-9_-]/g, '_');
  const fileName = `LNNCHS_${sanitizedSection}_${sanitizedTitle}_Consolidated_Batch_Results.pdf`;

  doc.save(fileName);
  return fileName;
}

/**
 * Generates and returns a PDF Blob and fileName for Google Drive upload or auto-save.
 */
export function generateBatchGradingPdfBlob(config: BatchGradingExportConfig): { blob: Blob; fileName: string } {
  if (!config.students || config.students.length === 0) {
    throw new Error('No students selected for batch PDF generation.');
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 14;
  const contentWidth = pageWidth - (margin * 2); // 182mm

  const navy = [0, 39, 118] as const;
  const gold = [252, 209, 22] as const;
  const slateDark = [30, 41, 59] as const;
  const slateMuted = [100, 116, 139] as const;
  const emerald = [16, 122, 77] as const;
  const red = [185, 28, 28] as const;
  const amber = [217, 119, 6] as const;
  const lightBg = [248, 250, 252] as const;

  let curY = margin;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('REPUBLIC OF THE PHILIPPINES • DEPARTMENT OF EDUCATION', pageWidth / 2, curY, { align: 'center' });
  curY += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text(`${config.region || 'Region X'} • ${config.division || 'Division of Lanao del Norte'} • ${config.district || 'Baroy District'}`, pageWidth / 2, curY, { align: 'center' });
  curY += 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(config.schoolName || 'Lanao del Norte National Comprehensive High School', pageWidth / 2, curY, { align: 'center' });
  curY += 5;

  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(margin, curY, contentWidth, 7, 'F');
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text((config.title || 'CLASS ASSESSMENT SUMMARY REPORT').toUpperCase(), pageWidth / 2, curY + 4.8, { align: 'center' });
  curY += 10;

  // Metadata block
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.rect(margin, curY, contentWidth, 14, 'FD');
  doc.setFontSize(7);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(`Subject: ${config.subject || 'N/A'}`, margin + 3, curY + 4.5);
  doc.text(`Grade & Section: ${config.gradeLevel || ''} - ${config.section || ''}`, margin + 3, curY + 9.5);
  doc.text(`School Year: ${config.schoolYear || '2026-2027'}`, margin + 95, curY + 4.5);
  doc.text(`Date Evaluated: ${config.dateEvaluated || 'N/A'}`, margin + 95, curY + 9.5);
  curY += 18;

  // Table headers
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(margin, curY, contentWidth, 6, 'F');
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.text('LRN', margin + 2, curY + 4);
  doc.text('Learner Name', margin + 28, curY + 4);
  doc.text('Raw Score', margin + 82, curY + 4);
  doc.text('Pct %', margin + 102, curY + 4);
  doc.text('Transmuted Grade', margin + 120, curY + 4);
  doc.text('Performance Level', margin + 152, curY + 4);
  curY += 7;

  config.students.forEach((st, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, curY - 3, contentWidth, 5, 'F');
    }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
    doc.text(st.id || 'N/A', margin + 2, curY);
    doc.setFont('helvetica', 'bold');
    doc.text(st.name, margin + 28, curY);
    doc.setFont('helvetica', 'normal');
    const gr = st.gradingResult;
    doc.text(`${gr.score}/${gr.totalPoints}`, margin + 82, curY);
    doc.text(`${gr.percentage.toFixed(1)}%`, margin + 102, curY);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.text(`${gr.depedTransmutedGrade}`, margin + 124, curY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
    doc.text(gr.masteryLevel || 'Satisfactory', margin + 152, curY);
    curY += 5;
    if (curY > pageHeight - 20) {
      doc.addPage();
      curY = margin;
    }
  });

  const blob = doc.output('blob');
  const sanitizedTitle = (config.title || 'Grading_Results').replace(/[^a-zA-Z0-9_-]/g, '_');
  const sanitizedSection = (config.section || 'Class').replace(/[^a-zA-Z0-9_-]/g, '_');
  const fileName = `LNNCHS_${sanitizedSection}_${sanitizedTitle}_Consolidated_Batch_Results.pdf`;

  return { blob, fileName };
}

/**
 * Convenience helper to export a single student result slip as PDF
 */
export function exportSingleStudentGradingPdf(student: BatchStudentGradeEntry, config: Partial<BatchGradingExportConfig> = {}) {
  const mergedConfig: BatchGradingExportConfig = {
    ...DEFAULT_BATCH_CONFIG,
    ...config,
    students: [student]
  };
  return exportBatchGradingToPdf(mergedConfig);
}
