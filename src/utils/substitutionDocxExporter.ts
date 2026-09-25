import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
} from 'docx';

const DEPED_NAVY = '002776';

export async function exportSubstitutionToDocx(
  data: {
    subject: string;
    section: string;
    content: string;
    date: string;
  }
): Promise<void> {
  const doc = new Document({
    title: `Substitution_Plan_${data.subject.replace(/\s+/g, '_')}`,
    description: 'LNNCHS Official Substitution Form',
    styles: {
      default: {
        document: {
          run: {
            font: 'Calibri',
            size: 22,
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: [
          // Header
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: 'REPUBLIC OF THE PHILIPPINES', size: 18, color: '475569', bold: true }),
              new TextRun({ text: '\nDEPARTMENT OF EDUCATION', size: 26, bold: true, color: DEPED_NAVY }),
              new TextRun({ text: '\nLanao del Norte National Comprehensive High School (LNNCHS)', size: 20, bold: true }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 300 },
            border: {
              bottom: { color: '000000', size: 12, space: 1, style: BorderStyle.DOUBLE },
            },
            children: [
              new TextRun({
                text: 'SUBSTITUTION REPORT & PLAN',
                bold: true,
                size: 28,
                color: DEPED_NAVY,
              }),
            ],
          }),

          // Metadata
          new Paragraph({
            children: [
              new TextRun({ text: 'Subject: ', bold: true }),
              new TextRun({ text: data.subject }),
            ],
            spacing: { after: 120 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Section: ', bold: true }),
              new TextRun({ text: data.section }),
            ],
            spacing: { after: 120 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Start Time: ', bold: true }),
              new TextRun({ text: '7:30 AM (Strict Class Start)' }),
            ],
            spacing: { after: 120 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Date: ', bold: true }),
              new TextRun({ text: data.date }),
            ],
            spacing: { after: 300 },
          }),

          // Content
          ...data.content.split('\n').map(line => 
            new Paragraph({
              children: [new TextRun({ text: line, size: 24 })],
              spacing: { after: 120 },
            })
          ),

          // Signatures
          new Paragraph({
            spacing: { before: 800 },
            children: [
              new TextRun({ text: '__________________________', bold: true }),
              new TextRun({ text: '\t\t\t' }),
              new TextRun({ text: '__________________________', bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Substitute Teacher Signature', size: 16, bold: true }),
              new TextRun({ text: '\t\t\t' }),
              new TextRun({ text: 'Assigned Faculty Member', size: 16, bold: true }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `LNNCHS_Substitution_${data.subject.replace(/[^a-zA-Z0-9]/g, '_')}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
