import pptxgen from 'pptxgenjs';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { generateQRCodeDataUrl } from './qrBarcodeService';

export interface SciencePPTConfig {
  topic: string;
  gradeLevel: string;
  subjectStrand: string;
  learningObjectives: string[];
  slideCount: number;
  language: string;
  teacherName: string;
  visualTheme: 'DepEd Royal Blue' | 'Emerald STEM' | 'Modern Obsidian' | 'Sunset Amber';
  includeActivities: boolean;
  includeAssessment: boolean;
  includeSpeakerNotes: boolean;
}

export interface ExcelWorkbookConfig {
  sheetType: 'Student Assessment Gradebook' | 'Attendance Monitoring Sheet' | 'STEM Experiment Data Matrix' | 'Rubric Scoring Calculator';
  title: string;
  subject: string;
  gradeLevel: string;
  teacherName: string;
  itemsCount: number;
  studentsCount: number;
}

// 1. REAL SCIENCE PPTX GENERATOR
export const generateSciencePPTX = async (config: SciencePPTConfig): Promise<Blob> => {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = config.teacherName || 'STEAVEN KINTH D. BOISER — THE TEACHER';
  pptx.title = config.topic;

  const themeColors = {
    'DepEd Royal Blue': { primary: '092B62', secondary: '00A3E0', bg: 'F0F4F8', card: 'FFFFFF', text: '1E293B' },
    'Emerald STEM': { primary: '065F46', secondary: '10B981', bg: 'ECFDF5', card: 'FFFFFF', text: '064E3B' },
    'Modern Obsidian': { primary: '0F172A', secondary: '38BDF8', bg: 'F8FAFC', card: 'FFFFFF', text: '0F172A' },
    'Sunset Amber': { primary: '7C2D12', secondary: 'F59E0B', bg: 'FFFBEB', card: 'FFFFFF', text: '451A03' }
  }[config.visualTheme];

  // Slide 1: Title Slide
  const slide1 = pptx.addSlide();
  slide1.background = { color: themeColors.primary };
  slide1.addText(config.topic.toUpperCase(), {
    x: 1.0, y: 1.8, w: 11.3, h: 1.5,
    fontSize: 34, fontFace: 'Arial', bold: true, color: 'FFFFFF', align: 'center'
  });
  slide1.addText(`${config.subjectStrand} • Grade ${config.gradeLevel} • DepEd MATATAG / ILAW Aligned`, {
    x: 1.0, y: 3.5, w: 11.3, h: 0.8,
    fontSize: 18, fontFace: 'Arial', color: themeColors.secondary, align: 'center', bold: true
  });
  slide1.addText(`Prepared by: ${config.teacherName || 'STEAVEN KINTH D. BOISER — THE TEACHER'}`, {
    x: 1.0, y: 5.5, w: 11.3, h: 0.6,
    fontSize: 14, fontFace: 'Arial', color: 'CBD5E1', align: 'center', italic: true
  });

  // Slide 2: Objectives & Content Standard
  const slide2 = pptx.addSlide();
  slide2.background = { color: themeColors.bg };
  slide2.addText('🎯 Learning Objectives & Standards', {
    x: 0.8, y: 0.6, w: 11.5, h: 0.8,
    fontSize: 26, fontFace: 'Arial', bold: true, color: themeColors.primary
  });

  const objBullets = config.learningObjectives.map(obj => ({
    text: `• ${obj}\n`,
    options: { fontSize: 16, color: themeColors.text, breakLine: true }
  }));

  slide2.addText(objBullets, {
    x: 1.0, y: 1.6, w: 11.0, h: 4.5,
    lineSpacing: 28, fontFace: 'Arial'
  });
  if (config.includeSpeakerNotes) {
    slide2.addNotes('Emphasize the cognitive alignment with DepEd Order No. 3, s. 2026 and connect to practical student observations.');
  }

  // Slide 3: Core Scientific Concept & Principles
  const slide3 = pptx.addSlide();
  slide3.background = { color: themeColors.bg };
  slide3.addText('🔬 Core Scientific Concepts', {
    x: 0.8, y: 0.6, w: 11.5, h: 0.8,
    fontSize: 26, fontFace: 'Arial', bold: true, color: themeColors.primary
  });

  slide3.addShape(pptx.ShapeType.rect, {
    x: 0.8, y: 1.5, w: 5.4, h: 4.8,
    fill: { color: themeColors.card }, line: { color: themeColors.secondary, width: 2 }
  });
  slide3.addText(`Theoretical Framework:\n\n• Fundamental laws governing ${config.topic}.\n• Mathematical models & variable relationships.\n• Empirical validation criteria.`, {
    x: 1.0, y: 1.7, w: 5.0, h: 4.4, fontSize: 15, color: themeColors.text
  });

  slide3.addShape(pptx.ShapeType.rect, {
    x: 6.8, y: 1.5, w: 5.5, h: 4.8,
    fill: { color: themeColors.card }, line: { color: themeColors.primary, width: 2 }
  });
  slide3.addText(`Real-World Application:\n\n• Environmental and technological implications in the Philippines.\n• STEM laboratory exploration & safety benchmarks.\n• Critical thinking inquiry prompts.`, {
    x: 7.0, y: 1.7, w: 5.1, h: 4.4, fontSize: 15, color: themeColors.text
  });

  // Slide 4: Interactive Activity / Laboratory Simulation
  if (config.includeActivities) {
    const slide4 = pptx.addSlide();
    slide4.background = { color: themeColors.bg };
    slide4.addText('🧪 Guided Inquiry & Hands-on Activity', {
      x: 0.8, y: 0.6, w: 11.5, h: 0.8,
      fontSize: 26, fontFace: 'Arial', bold: true, color: themeColors.primary
    });
    slide4.addText(`Activity Protocol: "Investigating ${config.topic} in Action"\n\n1. Form collaborative teams of 4-5 learners.\n2. Formulate hypothesis based on observed phenomena.\n3. Record measurements, isolate control variables, and compute standard error.\n4. Present synthesized findings to the class.`, {
      x: 1.0, y: 1.6, w: 11.0, h: 4.5, fontSize: 16, lineSpacing: 26, color: themeColors.text
    });
  }

  // Slide 5: Formative Assessment Matrix
  if (config.includeAssessment) {
    const slide5 = pptx.addSlide();
    slide5.background = { color: themeColors.primary };
    slide5.addText('📝 Formative Assessment & Mastery Check', {
      x: 0.8, y: 0.6, w: 11.5, h: 0.8,
      fontSize: 26, fontFace: 'Arial', bold: true, color: 'FFFFFF'
    });
    slide5.addText(`1. Explain the fundamental mechanism of ${config.topic}.\n2. How does varying external conditions affect the expected scientific outcome?\n3. Propose a viable technological solution addressing a local community problem using this principle.`, {
      x: 1.0, y: 1.8, w: 11.0, h: 4.0, fontSize: 18, lineSpacing: 30, color: 'F8FAFC'
    });
  }

  // Generate real Blob
  const arrayBuffer = await pptx.write({ outputType: 'arraybuffer' }) as ArrayBuffer;
  return new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
};

// 2. REAL EXCEL WORKBOOK GENERATOR
export const generateExcelWorkbook = (config: ExcelWorkbookConfig): Blob => {
  const wb = XLSX.utils.book_new();

  if (config.sheetType === 'Student Assessment Gradebook') {
    const data: any[][] = [
      [`${config.title.toUpperCase()}`],
      [`Subject: ${config.subject}`, `Grade Level: ${config.gradeLevel}`, `Teacher: ${config.teacherName}`],
      [''],
      ['No.', 'Student Name', 'Quiz 1 (20)', 'Quiz 2 (20)', 'Activity 1 (30)', 'Activity 2 (30)', 'Exam (100)', 'Total Score', 'Percentage (%)', 'Remarks']
    ];

    const sampleNames = [
      'Abad, Juan M.', 'Bautista, Maria C.', 'Cruz, Mark L.', 'Dela Cruz, Joshua P.',
      'Flores, Angel D.', 'Garcia, Carlo S.', 'Hernandez, Jane R.', 'Lim, Ethan V.',
      'Mendoza, Nicole T.', 'Navarro, Brian K.', 'Perez, Sofia G.', 'Ramos, Daniel J.'
    ];

    const studentCount = Math.min(config.studentsCount || 10, sampleNames.length);

    for (let i = 0; i < studentCount; i++) {
      const rowNum = 5 + i;
      const q1 = Math.floor(Math.random() * 6) + 15;
      const q2 = Math.floor(Math.random() * 6) + 15;
      const a1 = Math.floor(Math.random() * 8) + 23;
      const a2 = Math.floor(Math.random() * 8) + 23;
      const exam = Math.floor(Math.random() * 20) + 80;

      data.push([
        i + 1,
        sampleNames[i],
        q1,
        q2,
        a1,
        a2,
        exam,
        { f: `SUM(C${rowNum}:G${rowNum})` },
        { f: `ROUND((H${rowNum}/200)*100, 1)` },
        { f: `IF(I${rowNum}>=75, "PASSED", "NEEDS REMEDIATION")` }
      ]);
    }

    // Summary row
    const lastStudentRow = 4 + studentCount;
    data.push(['']);
    data.push([
      'SUMMARY',
      'CLASS AVERAGE',
      { f: `AVERAGE(C5:C${lastStudentRow})` },
      { f: `AVERAGE(D5:D${lastStudentRow})` },
      { f: `AVERAGE(E5:E${lastStudentRow})` },
      { f: `AVERAGE(F5:F${lastStudentRow})` },
      { f: `AVERAGE(G5:G${lastStudentRow})` },
      { f: `AVERAGE(H5:H${lastStudentRow})` },
      { f: `AVERAGE(I5:I${lastStudentRow})` },
      ''
    ]);

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [
      { wch: 6 }, { wch: 24 }, { wch: 14 }, { wch: 14 }, { wch: 15 },
      { wch: 15 }, { wch: 14 }, { wch: 14 }, { wch: 16 }, { wch: 20 }
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'Gradebook');
  } else {
    // Generic table format
    const sampleData = [
      ['BOISER POWER TOOLS — STEM & EXPERIMENT LOG'],
      [`Subject: ${config.subject}`, `Teacher: ${config.teacherName}`],
      [''],
      ['Trial No.', 'Variable A (Input)', 'Variable B (Control)', 'Measured Output (Y)', 'Calculated Error (%)', 'Status'],
      [1, 10.5, 25.0, 42.1, 0.45, 'Optimal'],
      [2, 20.0, 25.0, 84.3, 0.32, 'Optimal'],
      [3, 30.5, 25.0, 126.8, 0.81, 'Optimal'],
      [4, 40.0, 25.0, 168.2, 0.55, 'Optimal'],
      ['AVERAGE', '', '', { f: 'AVERAGE(D5:D8)' }, { f: 'AVERAGE(E5:E8)' }, 'VERIFIED']
    ];
    const ws = XLSX.utils.aoa_to_sheet(sampleData);
    XLSX.utils.book_append_sheet(wb, ws, 'Data Matrix');
  }

  const out = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  return new Blob([out], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
};

// 3. REAL QR WORKSHEET PDF GENERATOR
export const generateWorksheetPDF = async (worksheet: {
  worksheetId: string;
  title: string;
  subject: string;
  gradeLevel: string;
  teacherName: string;
  questions: Array<{ id: number; question: string; options?: string[]; points: number }>;
}): Promise<Blob> => {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  const qrDataUrl = await generateQRCodeDataUrl(`BPT-WS:${worksheet.worksheetId}`, { width: 120, margin: 1 });

  // DepEd Header Bar
  doc.setFillColor(9, 43, 98); // #092B62
  doc.rect(0, 0, 612, 45, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('DEPARTMENT OF EDUCATION • LANAO DEL NORTE DIVISION', 306, 26, { align: 'center' });

  // Main Title & Details
  doc.setTextColor(9, 43, 98);
  doc.setFontSize(16);
  doc.text(worksheet.title.toUpperCase(), 40, 75);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(70, 70, 70);
  doc.text(`Subject: ${worksheet.subject} | Grade Level: ${worksheet.gradeLevel}`, 40, 95);
  doc.text(`Teacher: ${worksheet.teacherName || 'STEAVEN KINTH D. BOISER — THE TEACHER'}`, 40, 110);
  doc.text(`Worksheet ID: ${worksheet.worksheetId}`, 40, 125);

  // Student details fill-in box
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(1);
  doc.rect(40, 135, 410, 50);
  doc.text('Student Name: _________________________________', 50, 155);
  doc.text('Grade & Section: _________________  Date: ________', 50, 172);

  // Add QR Code at top right
  doc.addImage(qrDataUrl, 'PNG', 470, 65, 100, 100);
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('Scan to Verify & Check', 520, 175, { align: 'center' });

  // Render Questions
  let currentY = 215;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(9, 43, 98);
  doc.text('LEARNING ACTIVITY & ASSESSMENT ITEMS:', 40, currentY);
  currentY += 20;

  worksheet.questions.forEach((q, idx) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 30, 30);
    doc.text(`${idx + 1}. ${q.question} (${q.points} pt${q.points > 1 ? 's' : ''})`, 40, currentY);
    currentY += 16;

    if (q.options && q.options.length > 0) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      q.options.forEach((opt, optIdx) => {
        const letter = String.fromCharCode(65 + optIdx);
        doc.text(`    ${letter}) ${opt}`, 50, currentY);
        currentY += 14;
      });
      currentY += 8;
    } else {
      // Free response lines
      doc.setDrawColor(220, 220, 220);
      doc.line(50, currentY + 12, 570, currentY + 12);
      doc.line(50, currentY + 28, 570, currentY + 28);
      currentY += 40;
    }
  });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(140, 140, 140);
  doc.text('Generated via Boiser Power Tools • Compliant with DepEd Order No. 3, s. 2026 (ILAW)', 306, 760, { align: 'center' });

  return doc.output('blob');
};
