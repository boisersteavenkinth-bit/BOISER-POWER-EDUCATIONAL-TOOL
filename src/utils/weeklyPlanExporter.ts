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
  HeadingLevel,
  ShadingType,
  PageOrientation
} from 'docx';
import * as XLSX from 'xlsx';
import { WeeklyLessonPlan } from '../types';

function saveBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const DEPED_NAVY = '002776';
const DEPED_BLUE = '0038A8';
const HEADER_BG = 'F1F5F9';

/**
 * Export Weekly Lesson Plan to Microsoft Word (.docx)
 */
export async function exportWeeklyPlanToDocx(plan: WeeklyLessonPlan): Promise<void> {
  const documentTitle = `DepEd_Weekly_Lesson_Plan_${plan.subject}_Grade_${plan.gradeLevel}_${plan.weekNumber}`.replace(/[^a-zA-Z0-9_\-]/g, '_');

  const doc = new Document({
    title: `Weekly Lesson Plan - ${plan.subject}`,
    description: 'DepEd 2026 One-Week Lesson Plan',
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720
            }
          }
        },
        children: [
          // Header Banner
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'REPUBLIC OF THE PHILIPPINES • DEPARTMENT OF EDUCATION',
                bold: true,
                size: 18,
                color: '475569'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: 'WEEKLY LESSON LOG / LESSON PLAN (SY 2026–2027)',
                bold: true,
                size: 26,
                color: DEPED_BLUE
              })
            ]
          }),

          // Plan Metadata Box
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 6, color: DEPED_BLUE },
              bottom: { style: BorderStyle.SINGLE, size: 6, color: DEPED_BLUE },
              left: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' },
              right: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: 'E2E8F0' },
              insideVertical: { style: BorderStyle.SINGLE, size: 2, color: 'E2E8F0' }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                    width: { size: 20, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: 'School:', bold: true, size: 20 })] })]
                  }),
                  new TableCell({
                    width: { size: 30, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: plan.schoolName, size: 20 })] })]
                  }),
                  new TableCell({
                    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                    width: { size: 20, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Grade Level & Subject:', bold: true, size: 20 })] })]
                  }),
                  new TableCell({
                    width: { size: 30, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: `${plan.gradeLevel} • ${plan.subject}`, bold: true, size: 20 })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Teacher:', bold: true, size: 20 })] })]
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: plan.teacherName, size: 20 })] })]
                  }),
                  new TableCell({
                    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Quarter & Week:', bold: true, size: 20 })] })]
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: `${plan.quarter} • ${plan.weekNumber} (${plan.dateRange})`, size: 20 })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'FEF3C7', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Topic & Competency:', bold: true, size: 20, color: '92400E' })] })]
                  }),
                  new TableCell({
                    columnSpan: 3,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: `Topic: ${plan.topic || ''}\n`, bold: true, size: 20 }),
                          new TextRun({ text: `Competencies: ${Array.isArray(plan.competencies) ? plan.competencies.join('; ') : (plan.competencies || '')}`, size: 20 })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { after: 180 }, children: [] }),

          // 5-Day Detailed Plan
          ...plan.days.flatMap((day) => [
            new Paragraph({
              heading: HeadingLevel.HEADING_3,
              spacing: { before: 120, after: 60 },
              children: [
                new TextRun({
                  text: `${day.dayName.toUpperCase()} (${day.date || 'Scheduled Instructional Day'})`,
                  bold: true,
                  size: 22,
                  color: DEPED_NAVY
                })
              ]
            }),

            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 6, color: DEPED_BLUE },
                bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' },
                left: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' },
                right: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' },
                insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: 'E2E8F0' },
                insideVertical: { style: BorderStyle.SINGLE, size: 2, color: 'E2E8F0' }
              },
              rows: [
                // Objectives
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 25, type: WidthType.PERCENTAGE },
                      shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                      children: [new Paragraph({ children: [new TextRun({ text: 'Learning Objectives:', bold: true, size: 20 })] })]
                    }),
                    new TableCell({
                      width: { size: 75, type: WidthType.PERCENTAGE },
                      children: (day.learningObjectives || day.objectives || []).map(
                        (obj: any) => new Paragraph({ children: [new TextRun({ text: `• ${obj}`, size: 20 })] })
                      )
                    })
                  ]
                }),

                // Content & Resources
                new TableRow({
                  children: [
                    new TableCell({
                      shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                      children: [new Paragraph({ children: [new TextRun({ text: 'Content & Resources:', bold: true, size: 20 })] })]
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({ text: `Topic: ${day.contentTopic || day.content || plan.topic || ''}\n`, bold: true, size: 20 }),
                            new TextRun({ text: `References: ${day.learningResources?.references || day.references || ''}\n`, size: 20 }),
                            new TextRun({ text: `Other Materials: ${day.learningResources?.otherResources || day.otherResources || ''}`, size: 20 })
                          ]
                        })
                      ]
                    })
                  ]
                }),

                // Procedures (10-Step)
                new TableRow({
                  children: [
                    new TableCell({
                      shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                      children: [new Paragraph({ children: [new TextRun({ text: 'Procedures & Activities:', bold: true, size: 20 })] })]
                    }),
                    new TableCell({
                      children: (Array.isArray(day.procedures) ? day.procedures : []).map(
                        (p: any) =>
                          new Paragraph({
                            spacing: { after: 60 },
                            children: [
                              new TextRun({ text: `${p.stepLetter}. ${p.stepTitle}: `, bold: true, size: 20, color: DEPED_BLUE }),
                              new TextRun({ text: p.description, size: 20 })
                            ]
                          })
                      )
                    })
                  ]
                }),

                // Assessment
                new TableRow({
                  children: [
                    new TableCell({
                      shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                      children: [new Paragraph({ children: [new TextRun({ text: 'Evaluation / Assessment:', bold: true, size: 20 })] })]
                    }),
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: day.assessment || 'Formative assessment item/quiz', size: 20 })] })]
                    })
                  ]
                }),

                // Assignment & Remarks
                new TableRow({
                  children: [
                    new TableCell({
                      shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                      children: [new Paragraph({ children: [new TextRun({ text: 'Assignment & Remarks:', bold: true, size: 20 })] })]
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({ text: `Assignment/Enrichment: ${day.assignmentEnrichment || 'N/A'}\n`, size: 20 }),
                            new TextRun({ text: `Remarks: ${day.remarks || 'Lesson carried out successfully.'}`, size: 20 })
                          ]
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            new Paragraph({ spacing: { after: 180 }, children: [] })
          ])
        ]
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  saveBlob(blob, `${documentTitle}_${Date.now()}.docx`);
}

/**
 * Export Weekly Lesson Plan to PDF
 */
export function exportWeeklyPlanToPdf(plan: WeeklyLessonPlan): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 12;
  const contentWidth = pageWidth - marginX * 2; // 186mm

  let currentY = 12;

  const drawHeader = () => {
    doc.setFillColor(0, 56, 168);
    doc.rect(marginX, currentY, contentWidth, 3, 'F');
    doc.setFillColor(252, 209, 22);
    doc.rect(marginX, currentY + 3, contentWidth, 1, 'F');

    currentY += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('REPUBLIC OF THE PHILIPPINES • DEPARTMENT OF EDUCATION', pageWidth / 2, currentY, { align: 'center' });

    currentY += 5;
    doc.setFontSize(13);
    doc.setTextColor(0, 56, 168);
    doc.text(`ONE-WEEK LESSON PLAN (${plan.version})`, pageWidth / 2, currentY, { align: 'center' });

    currentY += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `${plan.schoolName} • ${plan.teacherName} • ${plan.gradeLevel} (${plan.subject})`,
      pageWidth / 2,
      currentY,
      { align: 'center' }
    );

    currentY += 6;
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.line(marginX, currentY, marginX + contentWidth, currentY);
    currentY += 5;
  };

  const drawFooter = (pageNum: number, totalPages: number) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `DepEd SY 2026–2027 Weekly Lesson Plan • Boiser Powerful Education Tools`,
      marginX,
      pageHeight - 8
    );
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - marginX, pageHeight - 8, { align: 'right' });
  };

  drawHeader();

  // Print Meta Header Card
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(marginX, currentY, contentWidth, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text(`Quarter/Term: ${plan.quarter || plan.term || 'Term 1'} | Week: ${plan.weekNumber} (${plan.dateRange || plan.inclusiveDates || ''})`, marginX + 4, currentY + 5);
  doc.text(`Topic: ${plan.topic || ''}`, marginX + 4, currentY + 10);

  const compTextStr = Array.isArray(plan.competencies) ? plan.competencies.join('; ') : (plan.competencies || plan.learningCompetencies || '');
  const compText = doc.splitTextToSize(`Competencies: ${compTextStr}`, contentWidth - 8);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  doc.text(compText, marginX + 4, currentY + 15);

  currentY += 26;

  // Print Daily Sections
  (plan.days || []).forEach((day) => {
    if (currentY + 40 > pageHeight - 15) {
      doc.addPage();
      currentY = 12;
      drawHeader();
    }

    doc.setFillColor(0, 56, 168);
    doc.rect(marginX, currentY, contentWidth, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text(`${(day.dayName || 'DAY').toUpperCase()} — ${day.date || 'Instructional Day'}`, marginX + 3, currentY + 4.2);

    currentY += 8;

    // Objectives
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(0, 56, 168);
    doc.text('Objectives:', marginX + 2, currentY);
    currentY += 3.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    (day.learningObjectives || day.objectives || []).forEach((obj: any) => {
      const objLines = doc.splitTextToSize(`• ${obj}`, contentWidth - 6);
      doc.text(objLines, marginX + 4, currentY);
      currentY += objLines.length * 3.2;
    });

    currentY += 2;

    // Procedures
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(0, 56, 168);
    doc.text('Procedures & Activities:', marginX + 2, currentY);
    currentY += 3.5;

    (Array.isArray(day.procedures) ? day.procedures : []).forEach((p: any) => {
      const pLines = doc.splitTextToSize(`${p.stepLetter || '•'}. ${p.stepTitle || ''}: ${p.description || p}`, contentWidth - 6);
      if (currentY + pLines.length * 3.2 > pageHeight - 15) {
        doc.addPage();
        currentY = 12;
        drawHeader();
      }
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(30, 41, 59);
      doc.text(pLines, marginX + 4, currentY);
      currentY += pLines.length * 3.2 + 1;
    });

    // Assessment & Remarks
    if (currentY + 12 > pageHeight - 15) {
      doc.addPage();
      currentY = 12;
      drawHeader();
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(146, 64, 14);
    doc.text(`Evaluation: ${day.assessment || 'Formative Quiz'}`, marginX + 2, currentY);
    currentY += 4;
    doc.setTextColor(71, 85, 105);
    doc.text(`Assignment: ${day.assignmentEnrichment || day.assignment || 'N/A'} | Remarks: ${day.remarks || 'Carried out successfully'}`, marginX + 2, currentY);

    currentY += 8;
    doc.setDrawColor(226, 232, 240);
    doc.line(marginX, currentY, marginX + contentWidth, currentY);
    currentY += 4;
  });

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawFooter(i, totalPages);
  }

  doc.save(`DepEd_Weekly_Lesson_Plan_${plan.subject}_Grade_${plan.gradeLevel}_${plan.weekNumber}_${Date.now()}.pdf`);
}

/**
 * Export Weekly Lesson Plan to Excel (.xlsx)
 */
export function exportWeeklyPlanToXlsx(plan: WeeklyLessonPlan): void {
  const wb = XLSX.utils.book_new();

  const compTextStr = Array.isArray(plan.competencies) ? plan.competencies.join('; ') : (plan.competencies || plan.learningCompetencies || '');

  // Overview Sheet
  const overviewData = [
    ['REPUBLIC OF THE PHILIPPINES - DEPARTMENT OF EDUCATION'],
    ['WEEKLY LESSON LOG / LESSON PLAN (SY 2026-2027)'],
    [''],
    ['School Name:', plan.schoolName],
    ['Teacher Name:', plan.teacherName],
    ['Grade Level:', plan.gradeLevel],
    ['Subject:', plan.subject],
    ['Quarter:', plan.quarter || plan.term || 'Term 1'],
    ['Week Number:', plan.weekNumber],
    ['Date Range:', plan.dateRange || plan.inclusiveDates || ''],
    ['Topic:', plan.topic || ''],
    ['Competencies:', compTextStr],
    ['Version:', plan.version || 'v1.0'],
    ['Validation Status:', plan.validationStatus?.isValidated ? 'Validated ✓' : 'Pending Validation']
  ];

  const wsOverview = XLSX.utils.aoa_to_sheet(overviewData);
  XLSX.utils.book_append_sheet(wb, wsOverview, 'Overview');

  // Matrix Sheet
  const matrixHeaders = [
    'Day',
    'Date',
    'Objectives',
    'Content/Topic',
    'References',
    'Procedures & Activities',
    'Evaluation/Assessment',
    'Assignment',
    'Remarks'
  ];

  const matrixRows = (plan.days || []).map((d) => [
    d.dayName,
    d.date,
    (d.learningObjectives || d.objectives || []).join('\n• '),
    d.contentTopic || d.content || '',
    d.learningResources?.references || d.references || '',
    (Array.isArray(d.procedures) ? d.procedures : []).map((p: any) => `${p.stepLetter || '•'}. ${p.stepTitle || ''}: ${p.description || p}`).join('\n'),
    d.assessment || '',
    d.assignmentEnrichment || d.assignment || '',
    d.remarks || ''
  ]);

  const wsMatrix = XLSX.utils.aoa_to_sheet([matrixHeaders, ...matrixRows]);
  XLSX.utils.book_append_sheet(wb, wsMatrix, '5-Day Weekly Matrix');

  XLSX.writeFile(wb, `DepEd_Weekly_Lesson_Plan_${plan.subject}_Grade_${plan.gradeLevel}_${plan.weekNumber}.xlsx`);
}
