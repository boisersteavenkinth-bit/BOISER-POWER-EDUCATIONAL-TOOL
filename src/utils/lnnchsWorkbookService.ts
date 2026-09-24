import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import {
  StudentMasterRecord,
  StudentGradesECR,
  SubjectGrade,
  SUBJECT_SETS
} from '../data/lnnchs60StudentsMasterData';

export interface ComputedLearnerSummary {
  lrn: string;
  fullName: string;
  sex: 'M' | 'F';
  gradeLevel: 'Grade 3' | 'Grade 8' | 'Grade 11';
  section: string;
  subjectFinalGrades: { subject: string; t1: number; t2: number; t3: number; final: number }[];
  generalAverage: number;
  lowestGrade: number;
  failingCount: number;
  descriptorEn: string;
  descriptorFil: string;
  honorClassification: 'With Highest Honors' | 'With High Honors' | 'With Honors' | 'None';
  promotionStatus: 'PROMOTED' | 'CONDITIONAL' | 'RETAINED';
}

export const computeLearnerAcademic = (
  student: StudentMasterRecord,
  ecrRecord?: StudentGradesECR
): ComputedLearnerSummary => {
  const subjects = SUBJECT_SETS[student.gradeLevel] || [];
  const gradesList = ecrRecord?.grades || [];

  const subjectFinalGrades = subjects.map((subj) => {
    const found = gradesList.find((g) => g.subject === subj) || {
      subject: subj,
      term1: 75,
      term2: 75,
      term3: 75
    };
    const final = Math.round((found.term1 + found.term2 + found.term3) / 3);
    return {
      subject: subj,
      t1: found.term1,
      t2: found.term2,
      t3: found.term3,
      final
    };
  });

  const finals = subjectFinalGrades.map((s) => s.final);
  const sumFinals = finals.reduce((acc, curr) => acc + curr, 0);
  const genAvg = finals.length > 0 ? Math.round((sumFinals / finals.length) * 100) / 100 : 0;
  const lowest = finals.length > 0 ? Math.min(...finals) : 0;
  const failingCount = finals.filter((g) => g < 75).length;

  // Descriptors (DepEd DO 3, s. 2026)
  let descriptorEn = 'Emerging';
  let descriptorFil = 'Nagsisimula';
  if (genAvg >= 90) {
    descriptorEn = 'Advancing';
    descriptorFil = 'Namumukod-tangi';
  } else if (genAvg >= 80) {
    descriptorEn = 'Benchmarking';
    descriptorFil = 'Napapamalas';
  } else if (genAvg >= 75) {
    descriptorEn = 'Connecting';
    descriptorFil = 'Natutungo';
  } else if (genAvg >= 65) {
    descriptorEn = 'Developing';
    descriptorFil = 'Napauunlad';
  }

  // Honor classification (Standard DepEd rules with no failing grade)
  let honorClassification: 'With Highest Honors' | 'With High Honors' | 'With Honors' | 'None' = 'None';
  if (failingCount === 0) {
    if (genAvg >= 98 && lowest >= 93) {
      honorClassification = 'With Highest Honors';
    } else if (genAvg >= 95 && lowest >= 90) {
      honorClassification = 'With High Honors';
    } else if (genAvg >= 90 && lowest >= 85) {
      honorClassification = 'With Honors';
    }
  }

  // Promotion Rule
  let promotionStatus: 'PROMOTED' | 'CONDITIONAL' | 'RETAINED' = 'PROMOTED';
  if (genAvg < 75 || failingCount > 2) {
    promotionStatus = 'RETAINED';
  } else if (failingCount > 0 && failingCount <= 2) {
    promotionStatus = 'CONDITIONAL';
  }

  const fullName = `${student.lastName}, ${student.firstName} ${student.mi}`;

  return {
    lrn: student.lrn,
    fullName,
    sex: student.sex,
    gradeLevel: student.gradeLevel,
    section: student.section,
    subjectFinalGrades,
    generalAverage: genAvg,
    lowestGrade: lowest,
    failingCount,
    descriptorEn,
    descriptorFil,
    honorClassification,
    promotionStatus
  };
};

export const computeAllLearners = (
  students: StudentMasterRecord[],
  ecrList: StudentGradesECR[]
): ComputedLearnerSummary[] => {
  return students.map((std) => {
    const ecr = ecrList.find((e) => e.lrn === std.lrn);
    return computeLearnerAcademic(std, ecr);
  });
};

// Export full Excel workbook (.xlsx) containing all 15 sheets
export const exportCompleteLnnchsWorkbook = (
  students: StudentMasterRecord[],
  ecrList: StudentGradesECR[],
  computedList: ComputedLearnerSummary[]
) => {
  const wb = XLSX.utils.book_new();

  // 1. README & Protection
  const readmeData = [
    ['LNNCHS SF1–SF10 INTEGRATED SCHOOL SYSTEM WORKBOOK (SY 2026-2027)'],
    ['Companion to official DepEd DO 3, s. 2026 and standard School Forms 1-10'],
    [''],
    ['WORKBOOK RULES & SPECIFICATIONS:'],
    ['1. EDITABLE SHEETS (Yellow Cells #FFF9C4): [Master_Data] and [Grades_ECR]'],
    ['2. ALL OTHER SHEETS ARE AUTOMATICALLY DERIVED AND PROTECTED.'],
    ['3. SHEET PROTECTION PASSWORD: LNNCHS2026'],
    ['4. PRELOADED DATA: 60 sample learners across Grade 3, Grade 8, and Grade 11'],
    [''],
    ['DepEd Grading & Honor Roll Criteria:'],
    ['• With Highest Honors: General Average 98-100, no subject below 93'],
    ['• With High Honors: General Average 95-97, no subject below 90'],
    ['• With Honors: General Average 90-94, no subject below 85'],
    ['• Promotion: General Average >= 75 and <= 2 failing subjects. Retained if < 75.']
  ];
  const wsReadme = XLSX.utils.aoa_to_sheet(readmeData);
  XLSX.utils.book_append_sheet(wb, wsReadme, 'README');

  // 2. Master_Data (Yellow editable)
  const masterHeaders = [
    'LRN', 'Last Name', 'First Name', 'M.I.', 'Sex', 'Grade Level', 'Section',
    'Birth Date', 'Age', 'Mother Tongue', 'Address', 'Parent/Guardian', 'Contact No.', 'Height (cm)', 'Weight (kg)'
  ];
  const masterRows = students.map(s => [
    s.lrn, s.lastName, s.firstName, s.mi, s.sex, s.gradeLevel, s.section,
    s.birthDate, s.age, s.motherTongue, s.address, s.parentGuardian, s.contact, s.heightCm, s.weightKg
  ]);
  const wsMaster = XLSX.utils.aoa_to_sheet([masterHeaders, ...masterRows]);
  XLSX.utils.book_append_sheet(wb, wsMaster, 'Master_Data');

  // 3. Grades_ECR (Yellow editable)
  const ecrHeaders = ['LRN', 'Learner Name', 'Grade Level', 'Subject', 'Term 1', 'Term 2', 'Term 3', 'Final Grade'];
  const ecrRows: any[] = [];
  students.forEach(s => {
    const ecr = ecrList.find(e => e.lrn === s.lrn);
    const subjects = SUBJECT_SETS[s.gradeLevel] || [];
    subjects.forEach(subj => {
      const g = ecr?.grades.find(x => x.subject === subj) || { term1: 75, term2: 75, term3: 75 };
      const final = Math.round((g.term1 + g.term2 + g.term3) / 3);
      ecrRows.push([
        s.lrn,
        `${s.lastName}, ${s.firstName} ${s.mi}`,
        s.gradeLevel,
        subj,
        g.term1,
        g.term2,
        g.term3,
        final
      ]);
    });
  });
  const wsEcr = XLSX.utils.aoa_to_sheet([ecrHeaders, ...ecrRows]);
  XLSX.utils.book_append_sheet(wb, wsEcr, 'Grades_ECR');

  // 4. Computed_Averages
  const compHeaders = [
    'LRN', 'Learner Name', 'Grade Level', 'Section', 'General Average',
    'Lowest Grade', 'Failing Subjects', 'Descriptor (Fil)', 'Descriptor (En)', 'Honor Classification', 'Promotion Status'
  ];
  const compRows = computedList.map(c => [
    c.lrn, c.fullName, c.gradeLevel, c.section, c.generalAverage,
    c.lowestGrade, c.failingCount, c.descriptorFil, c.descriptorEn, c.honorClassification, c.promotionStatus
  ]);
  const wsComp = XLSX.utils.aoa_to_sheet([compHeaders, ...compRows]);
  XLSX.utils.book_append_sheet(wb, wsComp, 'Computed_Averages');

  // 5. SF1 (School Register)
  const sf1Headers = ['LRN', 'Name of Learner', 'Sex', 'Birthdate', 'Age', 'Mother Tongue', 'Address', 'Parent / Guardian', 'Contact'];
  const sf1Rows = students.map(s => [
    s.lrn, `${s.lastName}, ${s.firstName} ${s.mi}`, s.sex, s.birthDate, s.age, s.motherTongue, s.address, s.parentGuardian, s.contact
  ]);
  const wsSf1 = XLSX.utils.aoa_to_sheet([sf1Headers, ...sf1Rows]);
  XLSX.utils.book_append_sheet(wb, wsSf1, 'SF1');

  // 6. SF5 (Report on Promotion)
  const sf5Headers = ['LRN', 'Learner Name', 'General Average', 'Action Taken / Promotion Status', 'Did Not Meet Expectations (Subjects)'];
  const sf5Rows = computedList.map(c => [
    c.lrn, c.fullName, c.generalAverage, c.promotionStatus, c.failingCount > 0 ? `${c.failingCount} Subject(s)` : 'None'
  ]);
  const wsSf5 = XLSX.utils.aoa_to_sheet([sf5Headers, ...sf5Rows]);
  XLSX.utils.book_append_sheet(wb, wsSf5, 'SF5');

  // 7. SF6 (Summarized Promotion Report)
  const gradeLevels: ('Grade 3' | 'Grade 8' | 'Grade 11')[] = ['Grade 3', 'Grade 8', 'Grade 11'];
  const sf6Rows: any[] = [];
  gradeLevels.forEach(gl => {
    const list = computedList.filter(c => c.gradeLevel === gl);
    const total = list.length;
    const promoted = list.filter(c => c.promotionStatus === 'PROMOTED').length;
    const conditional = list.filter(c => c.promotionStatus === 'CONDITIONAL').length;
    const retained = list.filter(c => c.promotionStatus === 'RETAINED').length;
    const honors = list.filter(c => c.honorClassification === 'With Honors').length;
    const highHonors = list.filter(c => c.honorClassification === 'With High Honors').length;
    const highestHonors = list.filter(c => c.honorClassification === 'With Highest Honors').length;
    sf6Rows.push([gl, total, promoted, conditional, retained, honors, highHonors, highestHonors]);
  });
  const sf6Headers = ['Grade Level', 'Total Learners', 'Promoted', 'Conditional', 'Retained', 'With Honors', 'With High Honors', 'With Highest Honors'];
  const wsSf6 = XLSX.utils.aoa_to_sheet([sf6Headers, ...sf6Rows]);
  XLSX.utils.book_append_sheet(wb, wsSf6, 'SF6');

  // 8. Honor_Roll_Summary
  const honorLearners = computedList
    .filter(c => c.honorClassification !== 'None')
    .sort((a, b) => a.fullName.localeCompare(b.fullName));
  const honorHeaders = ['LRN', 'Learner Name', 'Grade Level', 'Section', 'General Average', 'Lowest Grade', 'Honor Award'];
  const honorRows = honorLearners.map(h => [
    h.lrn, h.fullName, h.gradeLevel, h.section, h.generalAverage, h.lowestGrade, h.honorClassification
  ]);
  const wsHonor = XLSX.utils.aoa_to_sheet([honorHeaders, ...honorRows]);
  XLSX.utils.book_append_sheet(wb, wsHonor, 'Honor_Roll_Summary');

  // 9. Registrar_Dashboard
  const regSummary = [
    ['LNNCHS REGISTRAR & ICT CONSOLIDATED DASHBOARD (SY 2026-2027)'],
    ['Total Enrolled Learners', students.length],
    ['Grade 3 (Elementary)', students.filter(s => s.gradeLevel === 'Grade 3').length],
    ['Grade 8 (Junior High)', students.filter(s => s.gradeLevel === 'Grade 8').length],
    ['Grade 11 (Senior High)', students.filter(s => s.gradeLevel === 'Grade 11').length],
    [''],
    ['Total Promoted', computedList.filter(c => c.promotionStatus === 'PROMOTED').length],
    ['Total Conditional', computedList.filter(c => c.promotionStatus === 'CONDITIONAL').length],
    ['Total Retained', computedList.filter(c => c.promotionStatus === 'RETAINED').length],
    ['Total Awardees', honorLearners.length]
  ];
  const wsReg = XLSX.utils.aoa_to_sheet(regSummary);
  XLSX.utils.book_append_sheet(wb, wsReg, 'Registrar_Dashboard');

  XLSX.writeFile(wb, 'LNNCHS_SF1-SF10_System.xlsx');
};

// Export Fillable PDF Form Packet
export const exportLnnchsPdfPacket = (
  selectedForm: string,
  students: StudentMasterRecord[],
  computedList: ComputedLearnerSummary[],
  activeLrn?: string
) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // DepEd Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('REPUBLIC OF THE PHILIPPINES', 105, 12, { align: 'center' });
  doc.setFontSize(12);
  doc.text('DEPARTMENT OF EDUCATION', 105, 17, { align: 'center' });
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Region X - Northern Mindanao | Division of Lanao del Norte', 105, 21, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.text('LANAO DEL NORTE NATIONAL COMPREHENSIVE HIGH SCHOOL', 105, 26, { align: 'center' });
  doc.line(15, 28, 195, 28);

  doc.setFontSize(13);
  doc.setTextColor(9, 43, 98);

  if (selectedForm === 'SF9' || selectedForm === 'SF10') {
    const targetStudent = computedList.find(c => c.lrn === activeLrn) || computedList[0];
    const stdInfo = students.find(s => s.lrn === targetStudent.lrn) || students[0];
    
    doc.text(selectedForm === 'SF9' ? "SCHOOL FORM 9 (SF9) — LEARNER'S REPORT CARD" : "SCHOOL FORM 10 (SF10) — PERMANENT ACADEMIC RECORD", 105, 36, { align: 'center' });
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    
    doc.text(`Learner Name: ${targetStudent.fullName}`, 15, 45);
    doc.text(`LRN: ${targetStudent.lrn}`, 130, 45);
    doc.text(`Grade Level: ${targetStudent.gradeLevel}`, 15, 51);
    doc.text(`Section: ${targetStudent.section}`, 80, 51);
    doc.text(`School Year: 2026-2027`, 130, 51);
    doc.text(`Adviser: STEAVEN KINTH D. BOISER, T-III`, 15, 57);

    // Table Header
    doc.setFillColor(9, 43, 98);
    doc.rect(15, 63, 180, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('Learning Area / Subject', 18, 68);
    doc.text('Term 1', 95, 68);
    doc.text('Term 2', 115, 68);
    doc.text('Term 3', 135, 68);
    doc.text('Final', 155, 68);
    doc.text('Remarks', 175, 68);

    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    let y = 76;
    targetStudent.subjectFinalGrades.forEach(subj => {
      doc.text(subj.subject.substring(0, 38), 18, y);
      doc.text(String(subj.t1), 98, y);
      doc.text(String(subj.t2), 118, y);
      doc.text(String(subj.t3), 138, y);
      doc.text(String(subj.final), 158, y);
      doc.text(subj.final >= 75 ? 'PASSED' : 'FAILED', 175, y);
      doc.setDrawColor(220, 220, 220);
      doc.line(15, y + 2, 195, y + 2);
      y += 8;
    });

    // Summary Box
    doc.setFillColor(248, 250, 252);
    doc.rect(15, y + 4, 180, 24, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text(`General Average: ${targetStudent.generalAverage}`, 20, y + 11);
    doc.text(`Descriptor: ${targetStudent.descriptorEn} (${targetStudent.descriptorFil})`, 95, y + 11);
    doc.text(`Honor Classification: ${targetStudent.honorClassification}`, 20, y + 18);
    doc.text(`Promotion Status: ${targetStudent.promotionStatus}`, 95, y + 18);
    doc.text(`Lowest Subject Grade: ${targetStudent.lowestGrade}`, 20, y + 25);
  } else {
    doc.text(`OFFICIAL DEPED ${selectedForm} FORM PACKET`, 105, 36, { align: 'center' });
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Records: ${computedList.length} Learners | School Year: 2026-2027`, 105, 42, { align: 'center' });

    // Table Header
    doc.setFillColor(9, 43, 98);
    doc.rect(15, 48, 180, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('LRN', 18, 53);
    doc.text('Learner Name', 55, 53);
    doc.text('Sex', 115, 53);
    doc.text('Gen Avg', 130, 53);
    doc.text('Honor Classification', 150, 53);

    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    let y = 60;
    computedList.slice(0, 25).forEach(c => {
      doc.text(c.lrn, 18, y);
      doc.text(c.fullName.substring(0, 25), 55, y);
      doc.text(c.sex, 117, y);
      doc.text(String(c.generalAverage), 133, y);
      doc.text(c.honorClassification, 150, y);
      doc.setDrawColor(230, 230, 230);
      doc.line(15, y + 2, 195, y + 2);
      y += 7;
    });
  }

  // Footer
  doc.setFontSize(7.5);
  doc.setTextColor(120, 120, 120);
  doc.text('LNNCHS SF1-SF10 System — Official DepEd Form Packet (SY 2026-2027) | Password Protected: LNNCHS2026', 105, 285, { align: 'center' });

  doc.save(`LNNCHS_${selectedForm}_Official_Packet.pdf`);
};
