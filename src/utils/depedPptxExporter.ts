import pptxgen from 'pptxgenjs';
import { ILAWCompletePlan, ILAWSlide } from '../types/ilawDO3';

export async function exportILAWToPptx(plan: ILAWCompletePlan, fileName?: string): Promise<void> {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = plan.header.teacher;
  pptx.company = plan.header.school;
  pptx.subject = plan.header.lesson;
  pptx.title = `${plan.header.lesson} - ILAW Companion Deck`;

  const { header, presentationSlides } = plan;

  // Render each slide strictly adhering to the ≥ 35pt body text rule!
  presentationSlides.forEach(s => {
    const slide = pptx.addSlide();

    // Visual theme: Deep Navy canvas with high-contrast elements (modern Gamma/Canva aesthetic)
    slide.background = { color: '0A1128' };

    // Accent top bar: DepEd Blue & Gold
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: '100%',
      h: 0.12,
      fill: { color: '0038A8' }
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0.12,
      w: '100%',
      h: 0.05,
      fill: { color: 'FCD116' }
    });

    // Header badge (e.g. "ILAW MASTER DECK", "SESSION 1", "FLOW: EXPLORE")
    if (s.badge) {
      slide.addText(s.badge.toUpperCase(), {
        x: 0.8,
        y: 0.45,
        w: 5.0,
        h: 0.35,
        fontSize: 16,
        bold: true,
        color: 'FCD116',
        charSpacing: 3
      });
    }

    // Title (44–56pt)
    slide.addText(s.title, {
      x: 0.8,
      y: 0.85,
      w: 11.7,
      h: 1.3,
      fontSize: 44,
      bold: true,
      color: 'FFFFFF',
      fontFace: 'Arial'
    });

    // Subtitle if present (22–26pt)
    if (s.subtitle) {
      slide.addText(s.subtitle, {
        x: 0.8,
        y: 2.1,
        w: 11.7,
        h: 0.6,
        fontSize: 22,
        color: '94A3B8',
        fontFace: 'Arial',
        italic: true
      });
    }

    // Background Container Card (modern 3D card layout)
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y: 2.85,
      w: 11.7,
      h: 3.8,
      rectRadius: 0.2,
      fill: { color: '131F42' },
      line: { color: '1E293B', width: 1.5 }
    });

    // Body text items strictly adhering to font size >= 35pt!
    const bodyItems = s.bodyBullets.map(bullet => ({
      text: bullet,
      options: {
        fontSize: 36, // NON-NEGOTIABLE RULE: >= 35pt for classroom projection visibility
        color: 'FFFFFF',
        fontFace: 'Arial',
        bold: false,
        bullet: true,
        lineSpacing: 52,
        paraSpaceAfter: 16
      }
    }));

    slide.addText(bodyItems, {
      x: 1.2,
      y: 3.1,
      w: 10.9,
      h: 3.3,
      valign: 'middle'
    });

    // Footer info: Teacher, School, DO 3 s. 2026
    slide.addText(`${header.school} • Teacher ${header.teacher} • DepEd DO 3, s. 2026`, {
      x: 0.8,
      y: 6.9,
      w: 11.7,
      h: 0.4,
      fontSize: 14,
      color: '64748B'
    });

    // Slide Number
    slide.addText(`${s.slideNumber}`, {
      x: 12.0,
      y: 6.9,
      w: 0.6,
      h: 0.4,
      fontSize: 14,
      bold: true,
      color: 'FCD116',
      align: 'right'
    });

    // Speaker notes
    if (s.speakerNotes) {
      slide.addNotes(s.speakerNotes);
    }
  });

  const actualFileName = fileName || `Companion_PPT_${header.lesson.replace(/[^a-zA-Z0-9]/g, '_')}_${header.teacher.replace(/[^a-zA-Z0-9]/g, '_')}.pptx`;
  await pptx.writeFile({ fileName: actualFileName });
}

export const exportDO3ILAWToPptx = exportILAWToPptx;
