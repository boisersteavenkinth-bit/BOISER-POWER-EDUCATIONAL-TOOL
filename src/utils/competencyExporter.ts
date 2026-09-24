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
  ShadingType
} from 'docx';
import { CompetencyRecord } from '../types';

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
const ACCENT_GOLD = 'FCD116';

/**
 * Export a set of selected competencies into a single combined Word (.docx) document
 */
export async function exportCompetenciesToDocx(
  competencies: CompetencyRecord[],
  documentTitle: string = 'DepEd_2026_Combined_Competencies'
): Promise<void> {
  const now = new Date().toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const doc = new Document({
    title: documentTitle,
    description: 'DepEd 2026 Combined Learning Competencies Document',
    styles: {
      default: {
        document: {
          run: {
            font: 'Calibri',
            size: 22 // 11pt
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 in
              right: 720,
              bottom: 720,
              left: 720
            }
          }
        },
        children: [
          // Official Header
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
                text: 'COMBINED LEARNING COMPETENCIES & SYLLABUS EXTRACT',
                bold: true,
                size: 28,
                color: DEPED_BLUE
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 },
            children: [
              new TextRun({
                text: `Normalized against DepEd Order No. 009, s. 2026 & DO 015, s. 2026 • Exported on ${now}`,
                italics: true,
                size: 18,
                color: '64748B'
              })
            ]
          }),

          // Metadata Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 6, color: DEPED_BLUE },
              bottom: { style: BorderStyle.SINGLE, size: 6, color: DEPED_BLUE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: 'E2E8F0' },
              insideVertical: { style: BorderStyle.NONE }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'F8FAFC', type: ShadingType.CLEAR },
                    width: { size: 30, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Total Competencies:', bold: true })] })]
                  }),
                  new TableCell({
                    width: { size: 70, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: `${competencies.length} items selected` })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'F8FAFC', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Curriculum Standard:', bold: true })] })]
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: '2026 K–12 MATATAG & Senior High Transition Matrix' })] })]
                  })
                ]
              })
            ]
          }),

          // Heading for list
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 180, after: 180 },
            children: [
              new TextRun({
                text: 'Selected Competency Details',
                bold: true,
                size: 24,
                color: DEPED_NAVY
              })
            ]
          }),

          // List of Competency Cards in Docx
          ...competencies.flatMap((comp, idx) => {
            return [
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 8, color: DEPED_BLUE },
                  bottom: { style: BorderStyle.SINGLE, size: 8, color: 'CBD5E1' },
                  left: { style: BorderStyle.SINGLE, size: 8, color: 'CBD5E1' },
                  right: { style: BorderStyle.SINGLE, size: 8, color: 'CBD5E1' },
                  insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
                  insideVertical: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' }
                },
                rows: [
                  // Row 1: Header
                  new TableRow({
                    children: [
                      new TableCell({
                        shading: { fill: DEPED_BLUE, type: ShadingType.CLEAR },
                        columnSpan: 2,
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `#${idx + 1}. ${comp.subject_title} `,
                                bold: true,
                                color: 'FFFFFF',
                                size: 22
                              }),
                              new TextRun({
                                text: `(${comp.grade_level === 'Kindergarten' ? 'Kindergarten' : `Grade ${comp.grade_level}`} • ${comp.key_stage} • Term ${comp.term}, Week ${comp.week})`,
                                color: 'F1F5F9',
                                size: 20
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  // Row 2: Code & Track
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 25, type: WidthType.PERCENTAGE },
                        shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                        children: [new Paragraph({ children: [new TextRun({ text: 'Code / Track:', bold: true, size: 20 })] })]
                      }),
                      new TableCell({
                        width: { size: 75, type: WidthType.PERCENTAGE },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({ text: comp.competency_code || comp.subject_code || 'N/A', bold: true, size: 20 }),
                              comp.track ? new TextRun({ text: ` | ${comp.track} Track`, italics: true, size: 20 }) : new TextRun('')
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  // Row 3: Domain (if present)
                  ...(comp.domain
                    ? [
                        new TableRow({
                          children: [
                            new TableCell({
                              shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                              children: [new Paragraph({ children: [new TextRun({ text: 'Domain:', bold: true, size: 20 })] })]
                            }),
                            new TableCell({
                              children: [new Paragraph({ children: [new TextRun({ text: comp.domain, size: 20 })] })]
                            })
                          ]
                        })
                      ]
                    : []),

                  // Row 4: Learning Competency Statement
                  new TableRow({
                    children: [
                      new TableCell({
                        shading: { fill: 'FEF3C7', type: ShadingType.CLEAR }, // light gold tint
                        children: [new Paragraph({ children: [new TextRun({ text: 'Learning Competency:', bold: true, size: 20, color: '92400E' })] })]
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({ text: `"${comp.learning_competency}"`, bold: true, size: 22, color: '0F172A' })
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  // Row 5: Content Standard
                  ...(comp.content_standard
                    ? [
                        new TableRow({
                          children: [
                            new TableCell({
                              shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                              children: [new Paragraph({ children: [new TextRun({ text: 'Content Standard:', bold: true, size: 20 })] })]
                            }),
                            new TableCell({
                              children: [new Paragraph({ children: [new TextRun({ text: comp.content_standard, size: 20 })] })]
                            })
                          ]
                        })
                      ]
                    : []),

                  // Row 6: Performance Standard
                  ...(comp.performance_standard
                    ? [
                        new TableRow({
                          children: [
                            new TableCell({
                              shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                              children: [new Paragraph({ children: [new TextRun({ text: 'Performance Standard:', bold: true, size: 20 })] })]
                            }),
                            new TableCell({
                              children: [new Paragraph({ children: [new TextRun({ text: comp.performance_standard, size: 20 })] })]
                            })
                          ]
                        })
                      ]
                    : []),

                  // Row 7: Assessment Weight Set & Source
                  new TableRow({
                    children: [
                      new TableCell({
                        shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                        children: [new Paragraph({ children: [new TextRun({ text: 'Assessment & Source:', bold: true, size: 18 })] })]
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({ text: `Weight Set: ${comp.assessment_weight_set}`, bold: true, size: 18, color: '1E40AF' }),
                              new TextRun({ text: ` • Source: ${comp.bow_source || 'DepEd Official BOW'}`, italics: true, size: 18, color: '64748B' }),
                              comp.transition_flag
                                ? new TextRun({ text: ' • [Grade 12 Transition Policy Applied]', bold: true, size: 18, color: 'B45309' })
                                : new TextRun('')
                            ]
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              new Paragraph({ spacing: { after: 180 }, children: [] })
            ];
          })
        ]
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  saveBlob(blob, `${documentTitle}_${Date.now()}.docx`);
}

/**
 * Export a set of selected competencies into a single combined PDF document
 */
export function exportCompetenciesToPdf(
  competencies: CompetencyRecord[],
  documentTitle: string = 'DepEd_2026_Combined_Competencies'
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2; // 182mm

  // Colors
  const DEPED_BLUE = { r: 0, g: 56, b: 168 };
  const DEPED_GOLD = { r: 252, g: 209, b: 22 };
  const LIGHT_GRAY = { r: 248, g: 250, b: 252 };
  const BORDER_GRAY = { r: 203, g: 213, b: 225 };
  const DARK_TEXT = { r: 15, g: 23, b: 42 };

  let currentY = 12;

  const drawHeader = () => {
    // Blue top bar
    doc.setFillColor(DEPED_BLUE.r, DEPED_BLUE.g, DEPED_BLUE.b);
    doc.rect(marginX, currentY, contentWidth, 3, 'F');

    // Gold accent stripe
    doc.setFillColor(DEPED_GOLD.r, DEPED_GOLD.g, DEPED_GOLD.b);
    doc.rect(marginX, currentY + 3, contentWidth, 1, 'F');

    currentY += 8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('REPUBLIC OF THE PHILIPPINES • DEPARTMENT OF EDUCATION', pageWidth / 2, currentY, { align: 'center' });

    currentY += 5;
    doc.setFontSize(13);
    doc.setTextColor(DEPED_BLUE.r, DEPED_BLUE.g, DEPED_BLUE.b);
    doc.text('COMBINED LEARNING COMPETENCIES EXTRACT', pageWidth / 2, currentY, { align: 'center' });

    currentY += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `DepEd Order No. 009, s. 2026 & DO 015, s. 2026 • Total Items: ${competencies.length}`,
      pageWidth / 2,
      currentY,
      { align: 'center' }
    );

    currentY += 6;
    doc.setDrawColor(BORDER_GRAY.r, BORDER_GRAY.g, BORDER_GRAY.b);
    doc.setLineWidth(0.3);
    doc.line(marginX, currentY, marginX + contentWidth, currentY);
    currentY += 6;
  };

  const drawFooter = (pageNum: number, totalPages: number) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(
      'DepEd 2026 Normalized Competency Matrix • Steaven Kinth D. Boiser Suite',
      marginX,
      pageHeight - 8
    );
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - marginX, pageHeight - 8, { align: 'right' });
  };

  drawHeader();

  competencies.forEach((comp, idx) => {
    // Estimate card height
    const compTextLines = doc.splitTextToSize(`"${comp.learning_competency}"`, contentWidth - 8);
    const csLines = comp.content_standard ? doc.splitTextToSize(`CS: ${comp.content_standard}`, contentWidth - 8) : [];
    const psLines = comp.performance_standard ? doc.splitTextToSize(`PS: ${comp.performance_standard}`, contentWidth - 8) : [];

    const estimatedCardHeight =
      22 +
      compTextLines.length * 4.2 +
      (csLines.length > 0 ? csLines.length * 3.5 + 2 : 0) +
      (psLines.length > 0 ? psLines.length * 3.5 + 2 : 0) +
      10;

    // Check if new page is required
    if (currentY + estimatedCardHeight > pageHeight - 15) {
      doc.addPage();
      currentY = 12;
      drawHeader();
    }

    const cardStartY = currentY;

    // Card Outer Background
    doc.setFillColor(LIGHT_GRAY.r, LIGHT_GRAY.g, LIGHT_GRAY.b);
    doc.setDrawColor(BORDER_GRAY.r, BORDER_GRAY.g, BORDER_GRAY.b);
    doc.roundedRect(marginX, currentY, contentWidth, estimatedCardHeight, 2, 2, 'FD');

    // Header Banner inside Card
    doc.setFillColor(DEPED_BLUE.r, DEPED_BLUE.g, DEPED_BLUE.b);
    doc.roundedRect(marginX, currentY, contentWidth, 7, 2, 2, 'F');
    // Cover bottom round corners of header banner
    doc.rect(marginX, currentY + 4, contentWidth, 3, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text(
      `#${idx + 1}. ${comp.subject_title} (${comp.grade_level === 'Kindergarten' ? 'Kindergarten' : `Grade ${comp.grade_level}`} • ${comp.key_stage} • Term ${comp.term}, Week ${comp.week})`,
      marginX + 3,
      currentY + 4.8
    );

    if (comp.competency_code || comp.subject_code) {
      doc.setFontSize(7.5);
      doc.text(
        comp.competency_code || comp.subject_code,
        marginX + contentWidth - 3,
        currentY + 4.8,
        { align: 'right' }
      );
    }

    currentY += 10;

    // Domain & Track info if present
    if (comp.domain || comp.track) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(30, 64, 175); // blue
      const metaStr = [comp.domain ? `Domain: ${comp.domain}` : '', comp.track ? `Track: ${comp.track}` : '']
        .filter(Boolean)
        .join(' | ');
      doc.text(metaStr, marginX + 4, currentY);
      currentY += 4.5;
    }

    // Learning Competency Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(146, 64, 14); // Amber
    doc.text('LEARNING COMPETENCY:', marginX + 4, currentY);
    currentY += 3.5;

    // Learning Competency Text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(DARK_TEXT.r, DARK_TEXT.g, DARK_TEXT.b);
    doc.text(compTextLines, marginX + 4, currentY);
    currentY += compTextLines.length * 4.2 + 2;

    // CS
    if (csLines.length > 0) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      doc.text(csLines, marginX + 4, currentY);
      currentY += csLines.length * 3.5 + 1;
    }

    // PS
    if (psLines.length > 0) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      doc.text(psLines, marginX + 4, currentY);
      currentY += psLines.length * 3.5 + 1;
    }

    // Footer info inside card
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `Assessment Weight: ${comp.assessment_weight_set} • Source: ${comp.bow_source || 'DepEd BOW'}`,
      marginX + 4,
      cardStartY + estimatedCardHeight - 2.5
    );

    currentY = cardStartY + estimatedCardHeight + 4;
  });

  // Calculate pages and write page numbers
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawFooter(i, totalPages);
  }

  doc.save(`${documentTitle}_${Date.now()}.pdf`);
}
