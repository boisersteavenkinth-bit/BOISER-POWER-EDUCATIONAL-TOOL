import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  HeadingLevel
} from 'docx';

export interface SchoolFormRecord {
  lrn: string;
  name: string;
  sex: 'M' | 'F';
  birthDate?: string;
  age?: number;
  motherTongue?: string;
  address?: string;
  parentGuardian?: string;
  contact?: string;
  // Academic / Attendance fields
  daysPresent?: number;
  daysAbsent?: number;
  genAverage?: number;
  actionTaken?: 'PROMOTED' | 'CONDITIONAL' | 'RETAINED';
  nutritionalStatus?: string;
  height?: number;
  weight?: number;
  bmi?: number;
  q1?: number;
  q2?: number;
  q3?: number;
  q4?: number;
  remarks?: string;
}

export interface SchoolFormConfig {
  formId: string;
  formName: string;
  title: string;
  code: string;
  schoolName: string;
  schoolId: string;
  district: string;
  division: string;
  region: string;
  schoolYear: string;
  gradeLevel: string;
  section: string;
  trackStrand: string;
  adviser: string;
  schoolHead: string;
  divisionSuperintendent?: string;
  records: SchoolFormRecord[];
}

export const LNNCHS_DEFAULT_CONFIG: SchoolFormConfig = {
  formId: 'SF1',
  formName: 'School Register',
  title: 'School Form 1 (SF1) School Register for Senior High School',
  code: 'SF1-SHS',
  schoolName: 'Lanao del Norte National Comprehensive High School (LNNCHS)',
  schoolId: '304005',
  district: 'Baroy District',
  division: 'Division of Lanao del Norte',
  region: 'Region X - Northern Mindanao',
  schoolYear: '2026-2027',
  gradeLevel: 'Grade 11',
  section: 'Einstein (STEM / Life and Career Skills)',
  trackStrand: 'Academic Track - STEM / DO 3, s. 2026',
  adviser: 'STEAVEN KINTH D. BOISER, T-III',
  schoolHead: 'ANISAH A. SINAL, Principal IV',
  records: [
    { lrn: '136514110001', name: 'ABELLA, Christian Dave M.', sex: 'M', birthDate: '2009-03-15', age: 17, motherTongue: 'Cebuano', address: 'Poblacion, Tubod, Lanao del Norte', parentGuardian: 'Maria Abella', contact: '09171234501', daysPresent: 198, daysAbsent: 2, genAverage: 92, actionTaken: 'PROMOTED', nutritionalStatus: 'Normal', height: 168, weight: 58, bmi: 20.5, q1: 91, q2: 92, q3: 93, q4: 92, remarks: 'Consistent Honor Roll' },
    { lrn: '136514110002', name: 'BACALSO, John Michael P.', sex: 'M', birthDate: '2009-07-22', age: 17, motherTongue: 'Cebuano', address: 'Baroy, Lanao del Norte', parentGuardian: 'Roberto Bacalso', contact: '09171234502', daysPresent: 195, daysAbsent: 5, genAverage: 89, actionTaken: 'PROMOTED', nutritionalStatus: 'Normal', height: 172, weight: 62, bmi: 20.9, q1: 88, q2: 89, q3: 90, q4: 89, remarks: 'With Honors' },
    { lrn: '136514110003', name: 'CABILOGAN, Mark Anthony T.', sex: 'M', birthDate: '2009-11-04', age: 16, motherTongue: 'Maranao', address: 'Kolambugan, Lanao del Norte', parentGuardian: 'Fatima Cabilogan', contact: '09171234503', daysPresent: 190, daysAbsent: 10, genAverage: 86, actionTaken: 'PROMOTED', nutritionalStatus: 'Normal', height: 165, weight: 54, bmi: 19.8, q1: 85, q2: 86, q3: 87, q4: 86, remarks: 'Passed' },
    { lrn: '136514110004', name: 'DIMAPORO, Al-Rashid K.', sex: 'M', birthDate: '2009-01-18', age: 17, motherTongue: 'Maranao', address: 'Tubod, Lanao del Norte', parentGuardian: 'Ibrahim Dimaporo', contact: '09171234504', daysPresent: 200, daysAbsent: 0, genAverage: 95, actionTaken: 'PROMOTED', nutritionalStatus: 'Normal', height: 175, weight: 65, bmi: 21.2, q1: 94, q2: 95, q3: 96, q4: 95, remarks: 'With High Honors' },
    { lrn: '136514110005', name: 'ESPAÑOL, Vince Nicole G.', sex: 'M', birthDate: '2009-08-30', age: 17, motherTongue: 'Cebuano', address: 'Lala, Lanao del Norte', parentGuardian: 'Elena Español', contact: '09171234505', daysPresent: 188, daysAbsent: 12, genAverage: 83, actionTaken: 'PROMOTED', nutritionalStatus: 'Normal', height: 169, weight: 57, bmi: 19.9, q1: 82, q2: 83, q3: 84, q4: 83, remarks: 'Passed' },
    { lrn: '136514110006', name: 'FUENTES, Princess Mae S.', sex: 'F', birthDate: '2009-05-12', age: 17, motherTongue: 'Cebuano', address: 'Poblacion, Tubod, Lanao del Norte', parentGuardian: 'Rosario Fuentes', contact: '09171234506', daysPresent: 200, daysAbsent: 0, genAverage: 96, actionTaken: 'PROMOTED', nutritionalStatus: 'Normal', height: 160, weight: 50, bmi: 19.5, q1: 95, q2: 96, q3: 97, q4: 96, remarks: 'With High Honors' },
    { lrn: '136514110007', name: 'GOMEZ, Mary Grace C.', sex: 'F', birthDate: '2009-09-19', age: 17, motherTongue: 'Cebuano', address: 'Magsaysay, Tubod, LDN', parentGuardian: 'Antonio Gomez', contact: '09171234507', daysPresent: 197, daysAbsent: 3, genAverage: 91, actionTaken: 'PROMOTED', nutritionalStatus: 'Normal', height: 158, weight: 48, bmi: 19.2, q1: 90, q2: 91, q3: 92, q4: 91, remarks: 'With Honors' },
    { lrn: '136514110008', name: 'HADJI, Sittie Ayna M.', sex: 'F', birthDate: '2009-12-05', age: 16, motherTongue: 'Maranao', address: 'Tubod, Lanao del Norte', parentGuardian: 'Nasrudin Hadji', contact: '09171234508', daysPresent: 199, daysAbsent: 1, genAverage: 94, actionTaken: 'PROMOTED', nutritionalStatus: 'Normal', height: 162, weight: 52, bmi: 19.8, q1: 93, q2: 94, q3: 95, q4: 94, remarks: 'With High Honors' },
    { lrn: '136514110009', name: 'IBARRA, Kimberly Joy R.', sex: 'F', birthDate: '2009-04-28', age: 17, motherTongue: 'Cebuano', address: 'Baroy, Lanao del Norte', parentGuardian: 'Fernando Ibarra', contact: '09171234509', daysPresent: 192, daysAbsent: 8, genAverage: 88, actionTaken: 'PROMOTED', nutritionalStatus: 'Normal', height: 157, weight: 47, bmi: 19.1, q1: 87, q2: 88, q3: 89, q4: 88, remarks: 'With Honors' },
    { lrn: '136514110010', name: 'JALOSJOS, Stephanie Nicole B.', sex: 'F', birthDate: '2009-10-14', age: 16, motherTongue: 'Cebuano', address: 'Tubod, Lanao del Norte', parentGuardian: 'Corazon Jalosjos', contact: '09171234510', daysPresent: 196, daysAbsent: 4, genAverage: 90, actionTaken: 'PROMOTED', nutritionalStatus: 'Normal', height: 161, weight: 51, bmi: 19.7, q1: 89, q2: 90, q3: 91, q4: 90, remarks: 'With Honors' }
  ]
};

export const LNNCHS_SCHOOL_FORMS_LIST = [
  { id: 'SF1', name: 'SF1 - School Register', desc: 'Masterlist of enrolled learners, demographic profiles, LRNs, and guardians (SY 2026-2027).' },
  { id: 'SF2', name: 'SF2 - Daily Attendance Report', desc: 'Daily attendance logs, monthly present/absent tallies, and percentage of attendance.' },
  { id: 'SF3', name: 'SF3 - Books Issued and Returned', desc: 'Textbook, module, and LAS tracking per student, condition and accountability report.' },
  { id: 'SF4', name: 'SF4 - Monthly Movement and Attendance', desc: 'Monthly summary of transferred in/out, dropouts, and net active enrollment.' },
  { id: 'SF5', name: 'SF5 - Report on Promotion & Achievement', desc: 'Year-end general averages, promotion status (Promoted, Conditional, Retained).' },
  { id: 'SF6', name: 'SF6 - Summarized Report on Promotion', desc: 'School-level consolidated promotion statistics across all Grade 7–12 sections.' },
  { id: 'SF7', name: 'SF7 - School Personnel Assignment List', desc: 'Faculty inventory, plantilla positions, degree credentials, and weekly subject loads.' },
  { id: 'SF8', name: 'SF8 - Health and Nutritional Status', desc: 'Learner baseline and endline BMI, weight/height metrics, and nutritional categorization.' },
  { id: 'SF9', name: 'SF9 - Learner Progress Report Card (Form 138)', desc: 'Official student quarterly report card with Core Values and attendance matrices.' },
  { id: 'SF10', name: 'SF10 - Permanent Academic Record (Form 137)', desc: 'Cumulative senior high permanent academic transcript for college and employment.' }
];

// ==========================================
// 1. EXCEL (.XLSX) GENERATOR FOR LNNCHS SF
// ==========================================
export function exportLnnchsSFToExcel(formId: string, config: SchoolFormConfig = LNNCHS_DEFAULT_CONFIG) {
  const wb = XLSX.utils.book_new();
  const rows: any[][] = [];

  // Official DepEd & LNNCHS Header
  rows.push(['REPUBLIC OF THE PHILIPPINES']);
  rows.push(['DEPARTMENT OF EDUCATION - REGION X (NORTHERN MINDANAO)']);
  rows.push(['DIVISION OF LANAO DEL NORTE - TUBOD CENTRAL DISTRICT']);
  rows.push([config.schoolName.toUpperCase()]);
  rows.push([`OFFICIAL DEPED SCHOOL FORM: ${formId} - SY ${config.schoolYear}`]);
  rows.push([]);
  rows.push(['School ID:', config.schoolId, '', 'District:', config.district, '', 'Division:', config.division]);
  rows.push(['Region:', config.region, '', 'School Year:', config.schoolYear, '', 'Track/Strand:', config.trackStrand]);
  rows.push(['Grade Level:', config.gradeLevel, '', 'Section:', config.section, '', 'Class Adviser:', config.adviser]);
  rows.push([]);

  // Form-Specific Columns & Rows
  if (formId === 'SF1') {
    rows.push(['No.', 'LRN', 'Learner Full Name', 'Sex', 'Birth Date', 'Age', 'Mother Tongue', 'Complete Address', 'Parent/Guardian', 'Contact No.', 'Remarks']);
    config.records.forEach((r, idx) => {
      rows.push([idx + 1, r.lrn, r.name, r.sex, r.birthDate || '2009-05-10', r.age || 17, r.motherTongue || 'Cebuano', r.address || 'Tubod, LDN', r.parentGuardian || 'Guardian', r.contact || 'N/A', r.remarks || 'Registered']);
    });
  } else if (formId === 'SF2') {
    rows.push(['No.', 'LRN', 'Learner Full Name', 'Sex', 'Total School Days', 'Days Present', 'Days Absent', 'Attendance Rate (%)', 'Remarks']);
    config.records.forEach((r, idx) => {
      const rate = r.daysPresent ? Math.round((r.daysPresent / 200) * 100) : 98;
      rows.push([idx + 1, r.lrn, r.name, r.sex, 200, r.daysPresent || 196, r.daysAbsent || 4, `${rate}%`, rate >= 90 ? 'Regular' : 'At Risk']);
    });
  } else if (formId === 'SF3') {
    rows.push(['No.', 'LRN', 'Learner Full Name', 'Sex', 'Textbook 1 (General Math)', 'Textbook 2 (Science)', 'Textbook 3 (LCS Guide)', 'Date Issued', 'Return Condition', 'Status']);
    config.records.forEach((r, idx) => {
      rows.push([idx + 1, r.lrn, r.name, r.sex, 'LNNCHS-GM-26', 'LNNCHS-ELS-26', 'LNNCHS-LCS-26', '2026-08-22', 'Good / Complete', 'Issued']);
    });
  } else if (formId === 'SF4') {
    rows.push(['No.', 'LRN', 'Learner Full Name', 'Sex', 'Official Enrolment Date', 'Movement Status', 'Transferred In/Out Date', 'Reason / Track', 'Active Status']);
    config.records.forEach((r, idx) => {
      rows.push([idx + 1, r.lrn, r.name, r.sex, '2026-08-18', 'ACTIVE', 'N/A', 'Regular Enrollee - STEM', 'Confirmed']);
    });
  } else if (formId === 'SF5') {
    rows.push(['No.', 'LRN', 'Learner Full Name', 'Sex', 'Q1', 'Q2', 'Q3', 'Q4', 'General Average', 'Action Taken', 'Level of Progress']);
    config.records.forEach((r, idx) => {
      const avg = r.genAverage || 90;
      const desc = avg >= 90 ? 'Outstanding' : avg >= 85 ? 'Very Satisfactory' : 'Satisfactory';
      rows.push([idx + 1, r.lrn, r.name, r.sex, r.q1 || 90, r.q2 || 90, r.q3 || 90, r.q4 || 90, avg, r.actionTaken || 'PROMOTED', desc]);
    });
  } else if (formId === 'SF6') {
    rows.push(['No.', 'LRN', 'Learner Full Name', 'Sex', 'Grade & Track', 'Final General Average', 'Promotion Status', 'Honors / Distinction', 'Next Grade Level']);
    config.records.forEach((r, idx) => {
      const avg = r.genAverage || 91;
      const distinction = avg >= 95 ? 'With High Honors' : avg >= 90 ? 'With Honors' : 'Passed';
      rows.push([idx + 1, r.lrn, r.name, r.sex, `${config.gradeLevel} - STEM`, avg, 'PROMOTED', distinction, 'Grade 12']);
    });
  } else if (formId === 'SF7') {
    rows.push(['No.', 'Plantilla Position', 'Faculty Full Name', 'Sex', 'Educational Attainment', 'Major / Specialization', 'Assigned Load / Section', 'Advisory Class', 'Remarks']);
    rows.push([1, 'Teacher III', config.adviser, 'M', 'Master of Arts in Science Education', 'General Science / Biology', '30 Hours / Week', `${config.gradeLevel} - ${config.section}`, 'Permanent']);
    rows.push([2, 'Principal IV', config.schoolHead, 'F', 'Doctor of Education (Ed.D)', 'Educational Management', 'School Head / Administration', 'LNNCHS Campus', 'Permanent']);
  } else if (formId === 'SF8') {
    rows.push(['No.', 'LRN', 'Learner Full Name', 'Sex', 'Age', 'Weight (kg)', 'Height (cm)', 'BMI', 'Nutritional Status', 'Height-for-Age']);
    config.records.forEach((r, idx) => {
      rows.push([idx + 1, r.lrn, r.name, r.sex, r.age || 17, r.weight || 55, r.height || 165, r.bmi || 20.2, r.nutritionalStatus || 'Normal', 'Normal']);
    });
  } else if (formId === 'SF9') {
    rows.push(['No.', 'LRN', 'Learner Full Name', 'Sex', 'General Math', 'Science', 'Life & Career Skills', 'Oral Comm', 'Filipino', 'PE & Health', 'Gen Average', 'Core Values Rating']);
    config.records.forEach((r, idx) => {
      rows.push([idx + 1, r.lrn, r.name, r.sex, 92, 91, 94, 91, 90, 95, r.genAverage || 92, 'Always Observed (AO)']);
    });
  } else if (formId === 'SF10') {
    rows.push(['No.', 'LRN', 'Learner Full Name', 'Sex', 'Elementary School', 'Elem Gen Average', 'JHS School Completed', 'JHS Gen Average', 'SHS Track / Strand', 'Academic Status']);
    config.records.forEach((r, idx) => {
      rows.push([idx + 1, r.lrn, r.name, r.sex, 'Tubod Central Elementary School', 91.5, 'LNNCHS Junior High School', 91.8, 'Academic Track - STEM', 'Eligible for Grade 12']);
    });
  } else {
    // General Standard SF Table
    rows.push(['No.', 'LRN', 'Learner Full Name', 'Sex', 'Quarterly Grade', 'General Average', 'Evaluation / Action Taken', 'Remarks']);
    config.records.forEach((r, idx) => {
      rows.push([idx + 1, r.lrn, r.name, r.sex, r.q4 || 91, r.genAverage || 91, r.actionTaken || 'PROMOTED', r.remarks || 'Standard LNNCHS Record']);
    });
  }

  rows.push([]);
  rows.push(['SUMMARY METRICS:']);
  const males = config.records.filter(r => r.sex === 'M').length;
  const females = config.records.filter(r => r.sex === 'F').length;
  rows.push(['Total Male Learners:', males]);
  rows.push(['Total Female Learners:', females]);
  rows.push(['Grand Total Enrolled:', config.records.length]);
  rows.push([]);
  rows.push(['Prepared by (Class Adviser):', config.adviser]);
  rows.push(['Certified Correct (School Head):', config.schoolHead]);

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [
    { wch: 6 }, { wch: 16 }, { wch: 32 }, { wch: 6 }, { wch: 14 },
    { wch: 14 }, { wch: 16 }, { wch: 18 }, { wch: 20 }, { wch: 20 }, { wch: 22 }
  ];

  XLSX.utils.book_append_sheet(wb, ws, `${formId}_LNNCHS_2026-2027`);
  XLSX.writeFile(wb, `LNNCHS_${formId}_SY2026-2027_${config.section.replace(/\s+/g, '_')}.xlsx`);
}

// ==========================================
// 2. PDF (.PDF) GENERATOR FOR LNNCHS SF
// ==========================================
export function exportLnnchsSFToPdf(formId: string, config: SchoolFormConfig = LNNCHS_DEFAULT_CONFIG) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let curY = 14;

  // Header Banner
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(0, 39, 118); // DepEd Navy Blue
  doc.text('REPUBLIC OF THE PHILIPPINES • DEPARTMENT OF EDUCATION', pageWidth / 2, curY, { align: 'center' });
  curY += 5;
  doc.setFontSize(9);
  doc.text('REGION X - NORTHERN MINDANAO • DIVISION OF LANAO DEL NORTE', pageWidth / 2, curY, { align: 'center' });
  curY += 5;
  doc.setFontSize(11);
  doc.text(config.schoolName.toUpperCase(), pageWidth / 2, curY, { align: 'center' });
  curY += 6;

  // Title box
  doc.setFillColor(0, 39, 118);
  doc.rect(14, curY, pageWidth - 28, 7, 'F');
  doc.setFontSize(10);
  doc.setTextColor(252, 209, 22); // Philippine Sun Gold
  doc.text(`DEPED ${formId} - OFFICIAL LNNCHS TEMPLATE (SY ${config.schoolYear})`, pageWidth / 2, curY + 4.8, { align: 'center' });
  curY += 10;

  // Metadata Grid
  doc.setFontSize(8);
  doc.setTextColor(40, 40, 40);
  doc.setFont('helvetica', 'bold');
  doc.text(`School ID: ${config.schoolId}`, 15, curY);
  doc.text(`District: ${config.district}`, 65, curY);
  doc.text(`Division: ${config.division}`, 125, curY);
  doc.text(`School Year: ${config.schoolYear}`, 215, curY);
  curY += 4.5;
  doc.text(`Grade Level: ${config.gradeLevel}`, 15, curY);
  doc.text(`Section: ${config.section}`, 65, curY);
  doc.text(`Track/Strand: ${config.trackStrand}`, 125, curY);
  doc.text(`Curriculum: DO 3, s. 2026 (MATATAG)`, 215, curY);
  curY += 6;

  // Table Headers
  const cols = [
    { title: 'No.', width: 10 },
    { title: 'Learner Reference No. (LRN)', width: 34 },
    { title: 'Learner Name (Last, First, MI)', width: 55 },
    { title: 'Sex', width: 10 },
    { title: 'Days Present', width: 22 },
    { title: 'Gen. Average', width: 22 },
    { title: 'Action Taken', width: 26 },
    { title: 'Level of Progress / Remarks', width: 85 }
  ];

  let startX = 14;
  doc.setFillColor(240, 244, 250);
  doc.rect(14, curY, pageWidth - 28, 6, 'F');
  doc.setDrawColor(180, 195, 215);
  doc.line(14, curY, pageWidth - 14, curY);
  doc.line(14, curY + 6, pageWidth - 14, curY + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(0, 39, 118);
  cols.forEach(c => {
    doc.text(c.title, startX + 1.5, curY + 4.2);
    startX += c.width;
  });
  curY += 6;

  // Records Rows
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 30, 30);
  config.records.forEach((rec, idx) => {
    let rowX = 14;
    const isEven = idx % 2 === 0;
    if (isEven) {
      doc.setFillColor(250, 252, 255);
      doc.rect(14, curY, pageWidth - 28, 5.5, 'F');
    }
    doc.line(14, curY + 5.5, pageWidth - 14, curY + 5.5);

    doc.text(String(idx + 1), rowX + 2, curY + 4);
    rowX += cols[0].width;
    doc.setFont('courier', 'bold');
    doc.text(rec.lrn, rowX + 1.5, curY + 4);
    doc.setFont('helvetica', 'normal');
    rowX += cols[1].width;
    doc.text(rec.name, rowX + 1.5, curY + 4);
    rowX += cols[2].width;
    doc.text(rec.sex, rowX + 3, curY + 4);
    rowX += cols[3].width;
    doc.text(String(rec.daysPresent || 196), rowX + 6, curY + 4);
    rowX += cols[4].width;
    doc.setFont('helvetica', 'bold');
    doc.text(String(rec.genAverage || 91), rowX + 6, curY + 4);
    doc.setFont('helvetica', 'normal');
    rowX += cols[5].width;
    doc.setTextColor(rec.actionTaken === 'PROMOTED' ? 0 : 180, rec.actionTaken === 'PROMOTED' ? 120 : 0, 0);
    doc.text(rec.actionTaken || 'PROMOTED', rowX + 2, curY + 4);
    doc.setTextColor(30, 30, 30);
    rowX += cols[6].width;
    doc.text(rec.remarks || 'Mastered - DO 3, s. 2026 Standards', rowX + 1.5, curY + 4);

    curY += 5.5;
  });

  // Signatory Section
  curY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('Prepared by (Class Adviser):', 25, curY);
  doc.text('Certified Correct (School Head):', 170, curY);
  curY += 8;
  doc.setFontSize(9);
  doc.text(config.adviser.toUpperCase(), 25, curY);
  doc.text(config.schoolHead.toUpperCase(), 170, curY);
  curY += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Special Science Teacher / LNNCHS Adviser', 25, curY);
  doc.text('Secondary School Principal IV / LNNCHS Head', 170, curY);

  doc.save(`LNNCHS_${formId}_SY2026-2027_${config.section.replace(/\s+/g, '_')}.pdf`);
}

// ==========================================
// 3. WORD (.DOCX) GENERATOR FOR LNNCHS SF
// ==========================================
export async function exportLnnchsSFToWord(formId: string, config: SchoolFormConfig = LNNCHS_DEFAULT_CONFIG) {
  const tableHeaderRow = new TableRow({
    children: [
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'No.', bold: true, size: 18 })] })], width: { size: 500, type: WidthType.DXA } }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'LRN', bold: true, size: 18 })] })], width: { size: 1800, type: WidthType.DXA } }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Learner Full Name', bold: true, size: 18 })] })], width: { size: 3000, type: WidthType.DXA } }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Sex', bold: true, size: 18 })] })], width: { size: 600, type: WidthType.DXA } }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Gen. Ave', bold: true, size: 18 })] })], width: { size: 1000, type: WidthType.DXA } }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Action Taken', bold: true, size: 18 })] })], width: { size: 1400, type: WidthType.DXA } }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Remarks / Learning Status', bold: true, size: 18 })] })], width: { size: 2500, type: WidthType.DXA } }),
    ]
  });

  const recordRows = config.records.map((r, idx) => {
    return new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(idx + 1), size: 18 })] })] }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: r.lrn, size: 18, font: 'Courier New' })] })] }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: r.name, size: 18, bold: true })] })] }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: r.sex, size: 18 })] })] }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(r.genAverage || 91), size: 18, bold: true })] })] }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: r.actionTaken || 'PROMOTED', size: 18 })] })] }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: r.remarks || 'Consistent Performance', size: 18 })] })] }),
      ]
    });
  });

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } // 1-inch standard margins
        }
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: 'Republic of the Philippines\n', size: 20 }),
            new TextRun({ text: 'Department of Education • Region X - Northern Mindanao\n', size: 20 }),
            new TextRun({ text: 'Division of Lanao del Norte • Tubod Central District\n', size: 20 }),
            new TextRun({ text: 'LANAO DEL NORTE NATIONAL COMPREHENSIVE HIGH SCHOOL (LNNCHS)\n', bold: true, size: 24, color: '002776' }),
            new TextRun({ text: `OFFICIAL DEPED ${formId} - SY ${config.schoolYear}\n`, bold: true, size: 22, color: 'B45309' }),
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: `School ID: ${config.schoolId}  |  District: ${config.district}  |  Division: ${config.division}\n`, size: 18 }),
            new TextRun({ text: `Grade & Section: ${config.gradeLevel} - ${config.section}  |  Track/Strand: ${config.trackStrand}\n`, size: 18 }),
            new TextRun({ text: `Class Adviser: ${config.adviser}  |  School Head: ${config.schoolHead}\n`, size: 18 }),
          ]
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [tableHeaderRow, ...recordRows]
        }),
        new Paragraph({ text: '\n' }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Prepared by:\n\n', size: 18 }),
            new TextRun({ text: config.adviser.toUpperCase() + '\n', bold: true, size: 20 }),
            new TextRun({ text: 'Special Science Teacher / Class Adviser, LNNCHS\n\n', size: 18 }),
            new TextRun({ text: 'Certified Correct:\n\n', size: 18 }),
            new TextRun({ text: config.schoolHead.toUpperCase() + '\n', bold: true, size: 20 }),
            new TextRun({ text: 'Secondary School Principal IV, LNNCHS\n', size: 18 }),
          ]
        })
      ]
    }]
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `LNNCHS_${formId}_SY2026-2027_${config.section.replace(/\s+/g, '_')}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
