import { jsPDF } from 'jspdf';

export interface DepEdILAWExportData {
  school: string;
  teacher: string;
  section: string;
  dates: string;
  division: string;
  region: string;
  principal: string;
  subject: string;
  term: string;
  week: string;
  topic: string;
  code: string;
  contentStandard: string;
  performanceStandard: string;
  learningCompetency: string;
  enablingCompetencies: string;
  session1: string;
  session2: string;
  session3: string;
  session4: string;
  resources: string;
  integration: string;
  lasBg?: string;
  lasA1?: string;
  lasA2?: string;
  lasA3?: string;
}

export type PDFExportMode = 'full' | 'ilaw' | 'las';

export function exportDepEdRegionXPDF(
  data: DepEdILAWExportData,
  mode: PDFExportMode = 'full'
): void {
  // A4 size: 210mm x 297mm
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2; // 182mm
  const bottomLimit = pageHeight - 16;

  // DepEd Official Palette (RGB)
  const DEPED_BLUE = { r: 0, g: 56, b: 168 };
  const DEPED_NAVY = { r: 0, g: 39, b: 118 };
  const DEPED_GOLD = { r: 252, g: 209, b: 22 };
  const DEPED_RED = { r: 206, g: 17, b: 38 };
  const LIGHT_GRAY = { r: 243, g: 244, b: 246 };
  const BORDER_GRAY = { r: 160, g: 160, b: 160 };
  const DARK_TEXT = { r: 20, g: 20, b: 20 };

  // Helper: Draw running header on ILAW pages
  const drawOfficialHeader = (subtitleText: string) => {
    // Top colored indicator bars
    doc.setFillColor(DEPED_BLUE.r, DEPED_BLUE.g, DEPED_BLUE.b);
    doc.rect(marginX, 8, contentWidth, 2.5, 'F');
    doc.setFillColor(DEPED_GOLD.r, DEPED_GOLD.g, DEPED_GOLD.b);
    doc.rect(marginX, 10.5, contentWidth, 1, 'F');

    let y = 16;
    doc.setFont('times', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(70, 70, 70);
    doc.text('REPUBLIC OF THE PHILIPPINES', pageWidth / 2, y, { align: 'center' });

    y += 4.5;
    doc.setFontSize(12);
    doc.setTextColor(DEPED_NAVY.r, DEPED_NAVY.g, DEPED_NAVY.b);
    doc.text('DEPARTMENT OF EDUCATION', pageWidth / 2, y, { align: 'center' });

    y += 4.2;
    doc.setFontSize(8.5);
    doc.setTextColor(50, 50, 50);
    const regDiv = `${(data.region || 'REGION X - NORTHERN MINDANAO').toUpperCase()} • ${(data.division || 'DIVISION OF LANAO DEL NORTE').toUpperCase()}`;
    doc.text(regDiv, pageWidth / 2, y, { align: 'center' });

    y += 4.5;
    doc.setFontSize(10.5);
    doc.setTextColor(DEPED_NAVY.r, DEPED_NAVY.g, DEPED_NAVY.b);
    doc.text((data.school || 'LANAO DEL NORTE NATIONAL COMPREHENSIVE HIGH SCHOOL').toUpperCase(), pageWidth / 2, y, { align: 'center' });

    // Official divider line
    y += 3;
    doc.setDrawColor(BORDER_GRAY.r, BORDER_GRAY.g, BORDER_GRAY.b);
    doc.setLineWidth(0.4);
    doc.line(marginX, y, marginX + contentWidth, y);

    // Title banner block
    y += 2;
    doc.setFillColor(DEPED_NAVY.r, DEPED_NAVY.g, DEPED_NAVY.b);
    doc.rect(marginX, y, contentWidth, 7, 'F');
    doc.setFont('times', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(255, 255, 255);
    doc.text(subtitleText, pageWidth / 2, y + 4.8, { align: 'center' });

    y += 8.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(90, 90, 90);
    doc.text(
      'Three-Term Calendar (DepEd Order No. 009, s. 2026) | Strengthened SHS Curriculum (DO No. 015, s. 2026)',
      pageWidth / 2,
      y,
      { align: 'center' }
    );

    return y + 3;
  };

  // Helper: Draw footer on all pages
  const drawOfficialFooter = (pageNum: number, totalPages: number) => {
    const y = pageHeight - 10;
    doc.setDrawColor(BORDER_GRAY.r, BORDER_GRAY.g, BORDER_GRAY.b);
    doc.setLineWidth(0.3);
    doc.line(marginX, y, marginX + contentWidth, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    doc.text(
      'Document Code: DEPED-ROX-LDN-ILAW-2026 | Verified Official Record | Quality Assured Instructional Material',
      marginX,
      y + 4
    );
    doc.setFont('helvetica', 'bold');
    doc.text(`Page ${pageNum} of ${totalPages}`, marginX + contentWidth, y + 4, { align: 'right' });
  };

  // Helper: Draw bordered cell
  const drawCell = (
    x: number,
    y: number,
    w: number,
    h: number,
    text: string,
    isHeader: boolean = false,
    fontSize: number = 8,
    isBold: boolean = false,
    textColor = DARK_TEXT,
    align: 'left' | 'center' | 'right' = 'left'
  ) => {
    if (isHeader) {
      doc.setFillColor(LIGHT_GRAY.r, LIGHT_GRAY.g, LIGHT_GRAY.b);
      doc.rect(x, y, w, h, 'FD');
    } else {
      doc.rect(x, y, w, h, 'D');
    }

    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setFontSize(fontSize);
    doc.setTextColor(textColor.r, textColor.g, textColor.b);

    const padding = 2;
    const splitLines = doc.splitTextToSize(text, w - padding * 2);
    const lineSpacing = fontSize * 0.42;

    splitLines.forEach((line: string, idx: number) => {
      const lineY = y + padding + 2.5 + idx * lineSpacing;
      if (lineY <= y + h - 1) {
        if (align === 'center') {
          doc.text(line, x + w / 2, lineY, { align: 'center' });
        } else if (align === 'right') {
          doc.text(line, x + w - padding, lineY, { align: 'right' });
        } else {
          doc.text(line, x + padding, lineY);
        }
      }
    });
  };

  // Helper: Draw Section Ribbon
  const drawSectionRibbon = (title: string, yPos: number): number => {
    doc.setFillColor(DEPED_NAVY.r, DEPED_NAVY.g, DEPED_NAVY.b);
    doc.rect(marginX, yPos, contentWidth, 5.2, 'F');
    doc.setFont('times', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(title, marginX + 3, yPos + 3.8);
    return yPos + 5.2;
  };

  // Compute total pages based on mode
  const totalPages = mode === 'full' ? 3 : mode === 'ilaw' ? 2 : 1;

  // ==========================================
  // PAGE 1: ILAW Document - Standards & Plan (Days 1 & 2)
  // ==========================================
  if (mode === 'full' || mode === 'ilaw') {
    let currentY = drawOfficialHeader(
      'INSTRUCTIONAL LEADERSHIP AND ACADEMIC WORKFLOW (ILAW) — PART 1'
    );

    // Meta Information Table (4-column grid)
    doc.setDrawColor(BORDER_GRAY.r, BORDER_GRAY.g, BORDER_GRAY.b);
    doc.setLineWidth(0.25);

    const col1W = 34;
    const col2W = 60;
    const col3W = 38;
    const col4W = contentWidth - col1W - col2W - col3W; // 50mm
    const rowH = 6.2;

    // Row 1
    drawCell(marginX, currentY, col1W, rowH, 'TEACHER', true, 7.5, true);
    drawCell(marginX + col1W, currentY, col2W, rowH, data.teacher || 'Subject Teacher', false, 8, true);
    drawCell(marginX + col1W + col2W, currentY, col3W, rowH, 'LEARNING AREA', true, 7.5, true);
    drawCell(marginX + col1W + col2W + col3W, currentY, col4W, rowH, data.subject, false, 8, true, DEPED_NAVY);
    currentY += rowH;

    // Row 2
    drawCell(marginX, currentY, col1W, rowH, 'TEACHING DATES', true, 7.5, true);
    drawCell(marginX + col1W, currentY, col2W, rowH, data.dates || 'Week 1 (4 Sessions • 60 mins)', false, 7.5);
    drawCell(marginX + col1W + col2W, currentY, col3W, rowH, 'GRADE & SECTION', true, 7.5, true);
    drawCell(marginX + col1W + col2W + col3W, currentY, col4W, rowH, data.section || 'Grade 11 - Section 1', false, 7.5);
    currentY += rowH;

    // Row 3
    drawCell(marginX, currentY, col1W, rowH, 'GRADING PERIOD', true, 7.5, true);
    drawCell(marginX + col1W, currentY, col2W, rowH, `Term ${data.term} (Weeks 1–10)`, false, 7.5);
    drawCell(marginX + col1W + col2W, currentY, col3W, rowH, 'CURRICULUM', true, 7.5, true);
    drawCell(marginX + col1W + col2W + col3W, currentY, col4W, rowH, 'Strengthened SHS (DO 015, s. 2026)', false, 7.5);
    currentY += rowH + 2;

    // SECTION I: OBJECTIVES & STANDARDS
    currentY = drawSectionRibbon('I. OBJECTIVES & CURRICULUM STANDARDS', currentY);

    const standardHeaderW = 42;
    const standardContentW = contentWidth - standardHeaderW;

    // Content Standard Row
    const csText = data.contentStandard || 'Understands disciplinary principles and context.';
    const csLines = doc.splitTextToSize(csText, standardContentW - 4);
    const csH = Math.max(9, csLines.length * 3.8 + 4);
    drawCell(marginX, currentY, standardHeaderW, csH, 'A. Content Standard', true, 7.5, true);
    drawCell(marginX + standardHeaderW, currentY, standardContentW, csH, csText, false, 7.5);
    currentY += csH;

    // Performance Standard Row
    const psText = data.performanceStandard || 'Applies knowledge independently in practical collaborative tasks.';
    const psLines = doc.splitTextToSize(psText, standardContentW - 4);
    const psH = Math.max(9, psLines.length * 3.8 + 4);
    drawCell(marginX, currentY, standardHeaderW, psH, 'B. Performance Standard', true, 7.5, true);
    drawCell(marginX + standardHeaderW, currentY, standardContentW, psH, psText, false, 7.5);
    currentY += psH;

    // Learning Competency Row
    const lcText = data.learningCompetency || 'Learning Competency';
    const lcLines = doc.splitTextToSize(lcText, standardContentW - 4);
    const lcH = Math.max(9, lcLines.length * 3.8 + 4);
    drawCell(marginX, currentY, standardHeaderW, lcH, 'C. Learning Competency', true, 7.5, true);
    drawCell(marginX + standardHeaderW, currentY, standardContentW, lcH, lcText, false, 7.5, true, DEPED_NAVY);
    currentY += lcH;

    // Enabling Competencies Row
    const ecText = data.enablingCompetencies || '1. Distinguishes foundational concepts. 2. Applies relevant strategies.';
    const ecLines = doc.splitTextToSize(ecText, standardContentW - 4);
    const ecH = Math.max(7.5, ecLines.length * 3.6 + 3);
    drawCell(marginX, currentY, standardHeaderW, ecH, 'D. Enabling Competency', true, 7.5, true);
    drawCell(marginX + standardHeaderW, currentY, standardContentW, ecH, ecText, false, 7.5);
    currentY += ecH + 2;

    // SECTION II: CONTENT
    currentY = drawSectionRibbon('II. CONTENT / TOPIC FOCUS', currentY);
    const topicH = 7;
    drawCell(marginX, currentY, standardHeaderW, topicH, 'Subject Matter Focus', true, 7.5, true);
    drawCell(marginX + standardHeaderW, currentY, standardContentW, topicH, `${data.week} — ${data.topic}`, false, 8, true, DEPED_NAVY);
    currentY += topicH + 2;

    // SECTION III: LEARNING RESOURCES & INTEGRATION
    currentY = drawSectionRibbon('III. LEARNING RESOURCES & INTEGRATION', currentY);
    const resH = 8;
    drawCell(marginX, currentY, standardHeaderW, resH, 'A. References & Materials', true, 7.5, true);
    drawCell(marginX + standardHeaderW, currentY, standardContentW, resH, data.resources || 'DepEd Strengthened SHS BOW, Learner Materials.', false, 7.2);
    currentY += resH;

    const intH = 8;
    drawCell(marginX, currentY, standardHeaderW, intH, 'B. Cross-Curricular Link', true, 7.5, true);
    drawCell(marginX + standardHeaderW, currentY, standardContentW, intH, data.integration || 'STEM Linkages, Career Preparedness, Digital Responsibility.', false, 7.2);
    currentY += intH + 2;

    // SECTION IV: PROCEDURES - SESSIONS 1 & 2
    currentY = drawSectionRibbon('IV. PROCEDURES (FOUR-SESSION DAILY LESSON FLOW) — SESSIONS 1 & 2', currentY);

    const sessionW = contentWidth / 2;
    const sessionHeadH = 6;
    const sessionBoxH = 34;

    // Session 1 Header
    doc.setFillColor(LIGHT_GRAY.r, LIGHT_GRAY.g, LIGHT_GRAY.b);
    doc.rect(marginX, currentY, sessionW, sessionHeadH, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(DEPED_NAVY.r, DEPED_NAVY.g, DEPED_NAVY.b);
    doc.text('SESSION 1 (DAY 1): ELICIT & ENGAGE', marginX + sessionW / 2, currentY + 4, { align: 'center' });

    // Session 2 Header
    doc.rect(marginX + sessionW, currentY, sessionW, sessionHeadH, 'FD');
    doc.text('SESSION 2 (DAY 2): EXPLORE & EXPLAIN', marginX + sessionW * 1.5, currentY + 4, { align: 'center' });
    currentY += sessionHeadH;

    // Session 1 Body
    drawCell(marginX, currentY, sessionW, sessionBoxH, data.session1 || 'Elicit prior knowledge and introduce target concept.', false, 7.2);
    // Session 2 Body
    drawCell(marginX + sessionW, currentY, sessionW, sessionBoxH, data.session2 || 'Guided small-group exploration and concept modeling.', false, 7.2);
    currentY += sessionBoxH + 2;

    // Continued note
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(110, 110, 110);
    doc.text(
      'Sessions 3 & 4 (Elaborate & Evaluate), Remarks, Reflection, and Official Signatures are continued on Page 2.',
      marginX,
      currentY + 2
    );

    drawOfficialFooter(1, totalPages);
  }

  // ==========================================
  // PAGE 2: ILAW Document - Sessions 3 & 4, Remarks, Reflection & Signatures
  // ==========================================
  if (mode === 'full' || mode === 'ilaw') {
    doc.addPage();
    let currentY = drawOfficialHeader(
      'INSTRUCTIONAL LEADERSHIP AND ACADEMIC WORKFLOW (ILAW) — PART 2'
    );

    // Summary sub-header
    doc.setFillColor(LIGHT_GRAY.r, LIGHT_GRAY.g, LIGHT_GRAY.b);
    doc.rect(marginX, currentY, contentWidth, 6, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(DEPED_NAVY.r, DEPED_NAVY.g, DEPED_NAVY.b);
    doc.text(
      `CONTINUATION: ${data.subject.toUpperCase()} | TERM ${data.term} (${data.week}) — ${data.topic.toUpperCase()}`,
      marginX + 3,
      currentY + 4.2
    );
    currentY += 8;

    // SECTION IV CONTINUED: PROCEDURES - SESSIONS 3 & 4
    currentY = drawSectionRibbon('IV. PROCEDURES (FOUR-SESSION DAILY LESSON FLOW) — SESSIONS 3 & 4', currentY);

    const sessionW = contentWidth / 2;
    const sessionHeadH = 6;
    const sessionBoxH = 42;

    // Session 3 Header
    doc.setFillColor(LIGHT_GRAY.r, LIGHT_GRAY.g, LIGHT_GRAY.b);
    doc.rect(marginX, currentY, sessionW, sessionHeadH, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(DEPED_NAVY.r, DEPED_NAVY.g, DEPED_NAVY.b);
    doc.text('SESSION 3 (DAY 3): ELABORATE & DEEPEN', marginX + sessionW / 2, currentY + 4, { align: 'center' });

    // Session 4 Header
    doc.rect(marginX + sessionW, currentY, sessionW, sessionHeadH, 'FD');
    doc.text('SESSION 4 (DAY 4): EVALUATE & EXTEND', marginX + sessionW * 1.5, currentY + 4, { align: 'center' });
    currentY += sessionHeadH;

    // Session 3 Body
    drawCell(marginX, currentY, sessionW, sessionBoxH, data.session3 || 'Collaborative simulation, real-world scenario analysis, and problem-solving.', false, 7.2);
    // Session 4 Body
    drawCell(marginX + sessionW, currentY, sessionW, sessionBoxH, data.session4 || 'Formative assessment check, authentic performance scoring, and mastery reflection.', false, 7.2);
    currentY += sessionBoxH + 3;

    // SECTION V: REMARKS
    currentY = drawSectionRibbon('V. REMARKS & FORMATIVE ASSESSMENT TRACKING', currentY);
    const remarksH = 22;
    const remarksText =
      '1. No. of learners who earned 80% on the formative assessment: _______\n' +
      '2. No. of learners who require additional activities for remediation: _______\n' +
      '3. Remediation strategy implemented: Targeted peer mentoring and differentiated scaffold worksheets.\n' +
      '4. Did the remedial lessons work? No. of learners who caught up with the lesson: _______';
    drawCell(marginX, currentY, contentWidth, remarksH, remarksText, false, 7.5);
    currentY += remarksH + 3;

    // SECTION VI: REFLECTION
    currentY = drawSectionRibbon('VI. REFLECTION & INSTRUCTIONAL SUPERVISION', currentY);
    const reflectionH = 24;
    const reflectionText =
      'A. Which of my teaching strategies worked well? Why did these work?\n' +
      '   Collaborative inquiry and authentic task-based modeling stimulated active participation and higher concept retention.\n' +
      'B. What difficulties did I encounter which my principal or supervisor can help me solve?\n' +
      '   Access to supplementary digital tools and high-volume printed learning activity sheets for differentiated tracks.\n' +
      'C. What innovation or localized materials did I use/discover which I wish to share with other teachers?\n' +
      '   Contextualized Region X workplace exemplars and interactive competency check-ins.';
    drawCell(marginX, currentY, contentWidth, reflectionH, reflectionText, false, 7.2);
    currentY += reflectionH + 6;

    // SIGNATURES BLOCK (3 Columns)
    doc.setDrawColor(BORDER_GRAY.r, BORDER_GRAY.g, BORDER_GRAY.b);
    doc.setLineWidth(0.3);

    const sigColW = contentWidth / 3;
    const sigBoxH = 28;

    // Column 1: Prepared by
    doc.rect(marginX, currentY, sigColW, sigBoxH, 'D');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(70, 70, 70);
    doc.text('Prepared by:', marginX + 3, currentY + 5);

    doc.setFont('times', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(DEPED_NAVY.r, DEPED_NAVY.g, DEPED_NAVY.b);
    doc.text((data.teacher || 'STEAVEN KINTH D. BOISER').toUpperCase(), marginX + sigColW / 2, currentY + 18, { align: 'center' });
    doc.setDrawColor(0, 0, 0);
    doc.line(marginX + 6, currentY + 19.5, marginX + sigColW - 6, currentY + 19.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(90, 90, 90);
    doc.text('Special Science Teacher II / Subject Teacher', marginX + sigColW / 2, currentY + 23, { align: 'center' });

    // Column 2: Checked by
    doc.rect(marginX + sigColW, currentY, sigColW, sigBoxH, 'D');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(70, 70, 70);
    doc.text('Checked by:', marginX + sigColW + 3, currentY + 5);

    doc.setFont('times', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(DEPED_NAVY.r, DEPED_NAVY.g, DEPED_NAVY.b);
    doc.text('MASTER TEACHER / HEAD TEACHER', marginX + sigColW * 1.5, currentY + 18, { align: 'center' });
    doc.line(marginX + sigColW + 6, currentY + 19.5, marginX + sigColW * 2 - 6, currentY + 19.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(90, 90, 90);
    doc.text('Department Head, SHS Academic Track', marginX + sigColW * 1.5, currentY + 23, { align: 'center' });

    // Column 3: Noted by
    doc.rect(marginX + sigColW * 2, currentY, sigColW, sigBoxH, 'D');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(70, 70, 70);
    doc.text('Noted by:', marginX + sigColW * 2 + 3, currentY + 5);

    doc.setFont('times', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(DEPED_NAVY.r, DEPED_NAVY.g, DEPED_NAVY.b);
    doc.text((data.principal || 'SCHOOL PRINCIPAL IV').toUpperCase(), marginX + sigColW * 2.5, currentY + 18, { align: 'center' });
    doc.line(marginX + sigColW * 2 + 6, currentY + 19.5, marginX + contentWidth - 6, currentY + 19.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(90, 90, 90);
    doc.text('Secondary School Principal IV / School Head', marginX + sigColW * 2.5, currentY + 23, { align: 'center' });

    const page2Index = mode === 'full' ? 2 : 2;
    drawOfficialFooter(page2Index, totalPages);
  }

  // ==========================================
  // PAGE 3: Official Learning Activity Sheet (LAS)
  // ==========================================
  if (mode === 'full' || mode === 'las') {
    if (mode === 'full') {
      doc.addPage();
    }
    let currentY = drawOfficialHeader(
      'LEARNING ACTIVITY SHEET (LAS) — REGION X'
    );

    // Learner Header Box
    const learnerBoxH = 18;
    doc.setDrawColor(BORDER_GRAY.r, BORDER_GRAY.g, BORDER_GRAY.b);
    doc.setFillColor(LIGHT_GRAY.r, LIGHT_GRAY.g, LIGHT_GRAY.b);
    doc.rect(marginX, currentY, contentWidth, learnerBoxH, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(70, 70, 70);

    // Learner Row 1
    doc.text('Learner Name:', marginX + 3, currentY + 4.5);
    doc.setFont('helvetica', 'normal');
    doc.text('________________________________________________', marginX + 23, currentY + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.text('Grade & Section:', marginX + 110, currentY + 4.5);
    doc.setFont('helvetica', 'normal');
    doc.text(data.section || 'Grade 11 - Section 1', marginX + 135, currentY + 4.5);

    // Learner Row 2
    doc.setFont('helvetica', 'bold');
    doc.text('Learning Area:', marginX + 3, currentY + 10);
    doc.setFont('helvetica', 'normal');
    doc.text(`${data.subject} (Term ${data.term} • ${data.week})`, marginX + 23, currentY + 10);

    doc.setFont('helvetica', 'bold');
    doc.text('Date:', marginX + 110, currentY + 10);
    doc.setFont('helvetica', 'normal');
    doc.text('________________________', marginX + 135, currentY + 10);

    // Learner Row 3
    doc.setFont('helvetica', 'bold');
    doc.text('Subject Teacher:', marginX + 3, currentY + 15.5);
    doc.setFont('helvetica', 'normal');
    doc.text(data.teacher || 'STEAVEN KINTH D. BOISER', marginX + 25, currentY + 15.5);

    doc.setFont('helvetica', 'bold');
    doc.text('Score:', marginX + 110, currentY + 15.5);
    doc.setFont('helvetica', 'normal');
    doc.text('__________ / 100', marginX + 135, currentY + 15.5);

    currentY += learnerBoxH + 3;

    // Competency Banner
    doc.setFillColor(235, 242, 255);
    doc.setDrawColor(180, 205, 255);
    doc.rect(marginX, currentY, contentWidth, 10, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(DEPED_NAVY.r, DEPED_NAVY.g, DEPED_NAVY.b);
    doc.text('MOST ESSENTIAL LEARNING COMPETENCY & CODE:', marginX + 3, currentY + 3.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    const compShort = doc.splitTextToSize(data.learningCompetency || 'Learning competency description.', contentWidth - 6);
    doc.text(compShort, marginX + 3, currentY + 7);
    currentY += 12;

    // LAS Section 1: Background Information for Learners
    currentY = drawSectionRibbon('I. BACKGROUND INFORMATION FOR LEARNERS', currentY);
    const bgText = data.lasBg || data.contentStandard || 'Review the conceptual fundamentals and apply disciplinary frameworks.';
    const bgLines = doc.splitTextToSize(bgText, contentWidth - 4);
    const bgH = Math.min(22, Math.max(12, bgLines.length * 3.6 + 4));
    drawCell(marginX, currentY, contentWidth, bgH, bgText, false, 7.5);
    currentY += bgH + 3;

    // LAS Section 2: Activity 1 (Foundational Discovery)
    currentY = drawSectionRibbon('II. ACTIVITY 1: FOUNDATIONAL CONCEPT MASTERY', currentY);
    const a1Text = data.lasA1 || 'Analyze the foundational principles and diagram the key elements of the concept.';
    const a1Lines = doc.splitTextToSize(a1Text, contentWidth - 4);
    const a1H = Math.min(18, Math.max(10, a1Lines.length * 3.6 + 4));
    drawCell(marginX, currentY, contentWidth, a1H, a1Text, false, 7.5);
    currentY += a1H + 3;

    // LAS Section 3: Activity 2 (Deepening & Real-World Application)
    currentY = drawSectionRibbon('III. ACTIVITY 2: DEEPENING & REAL-WORLD APPLICATION', currentY);
    const a2Text = data.lasA2 || 'Apply the concept to a real-world Philippine community or workplace case study.';
    const a2Lines = doc.splitTextToSize(a2Text, contentWidth - 4);
    const a2H = Math.min(18, Math.max(10, a2Lines.length * 3.6 + 4));
    drawCell(marginX, currentY, contentWidth, a2H, a2Text, false, 7.5);
    currentY += a2H + 3;

    // LAS Section 4: Activity 3 (Authentic Performance Task & Scoring Rubric)
    currentY = drawSectionRibbon('IV. ACTIVITY 3: AUTHENTIC PERFORMANCE TASK & SCORING CRITERIA', currentY);
    const a3Text = data.lasA3 || 'Synthesize findings and create an authentic artifact evaluated via the rubric below.';
    const a3H = 10;
    drawCell(marginX, currentY, contentWidth, a3H, a3Text, false, 7.5);
    currentY += a3H + 2;

    // Analytic Rubric Table
    const rubricCols = [36, 36.5, 36.5, 36.5, 36.5];
    const rubricRowH = 7.5;

    // Rubric Header
    let rx = marginX;
    const headers = ['Criteria', 'Advancing (4)', 'Benchmarking (3)', 'Connecting (2)', 'Developing (1)'];
    headers.forEach((h, idx) => {
      drawCell(rx, currentY, rubricCols[idx], 5.5, h, true, 7, true, DEPED_NAVY, 'center');
      rx += rubricCols[idx];
    });
    currentY += 5.5;

    // Rubric Row 1
    rx = marginX;
    drawCell(rx, currentY, rubricCols[0], rubricRowH, 'Content & Accuracy', true, 7, true);
    rx += rubricCols[0];
    drawCell(rx, currentY, rubricCols[1], rubricRowH, 'Exemplary depth & precision', false, 6.8);
    rx += rubricCols[1];
    drawCell(rx, currentY, rubricCols[2], rubricRowH, 'Accurate with minor gaps', false, 6.8);
    rx += rubricCols[2];
    drawCell(rx, currentY, rubricCols[3], rubricRowH, 'Basic understanding shown', false, 6.8);
    rx += rubricCols[3];
    drawCell(rx, currentY, rubricCols[4], rubricRowH, 'Needs targeted remediation', false, 6.8);
    currentY += rubricRowH;

    // Rubric Row 2
    rx = marginX;
    drawCell(rx, currentY, rubricCols[0], rubricRowH, 'Application & Rigor', true, 7, true);
    rx += rubricCols[0];
    drawCell(rx, currentY, rubricCols[1], rubricRowH, 'Creative, authentic synthesis', false, 6.8);
    rx += rubricCols[1];
    drawCell(rx, currentY, rubricCols[2], rubricRowH, 'Standard real-world link', false, 6.8);
    rx += rubricCols[2];
    drawCell(rx, currentY, rubricCols[3], rubricRowH, 'Superficial connection', false, 6.8);
    rx += rubricCols[3];
    drawCell(rx, currentY, rubricCols[4], rubricRowH, 'Incomplete task output', false, 6.8);
    currentY += rubricRowH + 3;

    // Student Pledge & Signature Box
    doc.setDrawColor(BORDER_GRAY.r, BORDER_GRAY.g, BORDER_GRAY.b);
    doc.rect(marginX, currentY, contentWidth, 12, 'D');
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6.8);
    doc.setTextColor(80, 80, 80);
    doc.text(
      'Learner\'s Commitment: I certify that the work submitted in this Learning Activity Sheet represents my honest, original effort.',
      marginX + 3,
      currentY + 4.2
    );
    doc.setFont('helvetica', 'normal');
    doc.text('Learner Signature: ____________________________________', marginX + 3, currentY + 9.5);
    doc.text('Parent / Guardian Signature: ____________________________________', marginX + 96, currentY + 9.5);

    const lasPageIndex = mode === 'full' ? 3 : 1;
    drawOfficialFooter(lasPageIndex, totalPages);
  }

  // Generate File Name
  const cleanSubject = (data.subject || 'Subject').replace(/[^a-zA-Z0-9]/g, '_');
  const cleanWeek = (data.week || 'Week').replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `DepEd_RegionX_ILAW_${cleanSubject}_Term${data.term}_${cleanWeek}_SY2026-2027.pdf`;

  // Trigger download
  doc.save(fileName);
}
