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
import { ILAWCompletePlan } from '../types/ilawDO3';

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

export async function exportILAWToDocx(plan: ILAWCompletePlan, fileName?: string): Promise<void> {
  const { header, matrix, activitySheets } = plan;

  const doc = new Document({
    title: `ILAW_${header.lesson.replace(/\s+/g, '_')}_${header.teacher.replace(/\s+/g, '_')}`,
    description: 'DepEd DO 3, s. 2026 Compliant ILAW Lesson Plan and LAS',
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
          // Header section
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: 'REPUBLIC OF THE PHILIPPINES', size: 18, color: '475569', bold: true }),
              new TextRun({ text: '\nDEPARTMENT OF EDUCATION', size: 26, bold: true, color: DEPED_NAVY }),
              new TextRun({ text: `\n${header.region} • ${header.division}`, size: 20, bold: true }),
              new TextRun({ text: `\n${header.school}`, size: 22, bold: true, color: DEPED_BLUE })
            ]
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 120 },
            children: [
              new TextRun({
                text: 'INSTRUCTIONAL LEADERSHIP AND ACADEMIC WORKFLOW (ILAW) LESSON PLAN',
                bold: true,
                size: 24,
                color: DEPED_NAVY
              }),
              new TextRun({
                text: '\nDepEd Order No. 3, s. 2026 Compliant | SY 2026–2027 Three-Term Calendar (DO 009, s. 2026)',
                italics: true,
                size: 18,
                color: '475569'
              })
            ]
          }),

          // Part 1: Header Information Table
          new Paragraph({
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({ text: 'PART 1: HEADER INFORMATION TABLE', bold: true, size: 22, color: DEPED_NAVY })
            ]
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Lesson / Topic:', bold: true })] })]
                  }),
                  new TableCell({
                    width: { size: 75, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: header.lesson, bold: true })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Learning Area/s:', bold: true })] })]
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: header.learningArea })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Teacher-Developer/s:', bold: true })] })]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: header.teacher, bold: true }),
                          new TextRun({
                            text: `\n${header.contentEvaluator}\n${header.languageEvaluator}\n${header.formatEvaluator}`,
                            size: 18,
                            italics: true
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'School & Station:', bold: true })] })]
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: `${header.school} (${header.division})` })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Grade Level & Section:', bold: true })] })]
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: header.gradeLevelAndSection })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Term & BOW Week No.:', bold: true })] })]
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: `Term ${header.term} • ${header.bowWeek}` })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Inclusive Teaching Dates:', bold: true })] })]
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: header.inclusiveTeachingDates })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'No. of Sessions:', bold: true })] })]
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: `${header.numberOfSessions} Sessions (60 mins each)` })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'References Cited:', bold: true })] })]
                  }),
                  new TableCell({
                    children: header.references.map(
                      ref =>
                        new Paragraph({
                          bullet: { level: 0 },
                          children: [new TextRun({ text: ref, size: 18 })]
                        })
                    )
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Declaration of AI Use:', bold: true })] })]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: header.declarationOfAIUse,
                            size: 18,
                            italics: true
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          // Part 2: The Lesson Plan Matrix
          new Paragraph({
            spacing: { before: 300, after: 100 },
            children: [
              new TextRun({ text: 'PART 2: THE LESSON PLAN MATRIX (DO 3, s. 2026)', bold: true, size: 22, color: DEPED_NAVY })
            ]
          }),

          // 1. Intentions
          new Paragraph({
            spacing: { before: 150, after: 60 },
            children: [new TextRun({ text: '1. INTENTIONS', bold: true, size: 20, color: DEPED_BLUE })]
          }),
          new Paragraph({
            spacing: { after: 120 },
            children: [new TextRun({ text: matrix.intentions })]
          }),

          // 2. Learning Competency
          new Paragraph({
            spacing: { before: 120, after: 60 },
            children: [new TextRun({ text: '2. LEARNING COMPETENCY & STANDARDS', bold: true, size: 20, color: DEPED_BLUE })]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Learning Competency (MELC):', bold: true })] })]
                  }),
                  new TableCell({
                    width: { size: 75, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: matrix.competency.melc, bold: true, color: DEPED_NAVY })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Content Topic Focus:', bold: true })] })]
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: matrix.competency.content })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Content Standard:', bold: true })] })]
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: matrix.competency.contentStandard })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Performance Standard:', bold: true })] })]
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: matrix.competency.performanceStandard })] })]
                  })
                ]
              })
            ]
          }),

          // 3. Learning Objectives
          new Paragraph({
            spacing: { before: 180, after: 60 },
            children: [new TextRun({ text: '3. LEARNING OBJECTIVES', bold: true, size: 20, color: DEPED_BLUE })]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: matrix.objectives.map(
                  obj =>
                    new TableCell({
                      width: { size: Math.floor(100 / matrix.objectives.length), type: WidthType.PERCENTAGE },
                      shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({ text: `Session ${obj.sessionNumber}`, bold: true, color: DEPED_NAVY }),
                            new TextRun({ text: `\n${obj.sessionDate}`, size: 16, italics: true })
                          ]
                        })
                      ]
                    })
                )
              }),
              new TableRow({
                children: matrix.objectives.map(
                  obj =>
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [new TextRun({ text: 'At the end of the session, learners are expected to:', italics: true, size: 18 })]
                        }),
                        ...obj.objectives.map(
                          item =>
                            new Paragraph({
                              bullet: { level: 0 },
                              children: [new TextRun({ text: item, size: 19 })]
                            })
                        )
                      ]
                    })
                )
              })
            ]
          }),

          // 4. Learner Context
          new Paragraph({
            spacing: { before: 180, after: 60 },
            children: [new TextRun({ text: '4. LEARNER CONTEXT', bold: true, size: 20, color: DEPED_BLUE })]
          }),
          new Paragraph({
            spacing: { after: 120 },
            children: [new TextRun({ text: matrix.learnerContext })]
          }),

          // 5. Learning Experience Table
          new Paragraph({
            spacing: { before: 180, after: 60 },
            children: [new TextRun({ text: '5. LEARNING EXPERIENCE TABLE', bold: true, size: 20, color: DEPED_BLUE })]
          }),
          ...matrix.learningExperience.map(exp => {
            return new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      columnSpan: 2,
                      shading: { fill: DEPED_NAVY, type: ShadingType.CLEAR },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `SESSION ${exp.sessionNumber} (${exp.sessionDate})`,
                              bold: true,
                              color: 'FFFFFF',
                              size: 20
                            })
                          ]
                        })
                      ]
                    })
                  ]
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 25, type: WidthType.PERCENTAGE },
                      shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                      children: [new Paragraph({ children: [new TextRun({ text: `Pre-Lesson: Engage (${exp.preLesson.engage.time})`, bold: true })] })]
                    }),
                    new TableCell({
                      width: { size: 75, type: WidthType.PERCENTAGE },
                      children: [new Paragraph({ children: [new TextRun({ text: exp.preLesson.engage.activity })] })]
                    })
                  ]
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                      children: [new Paragraph({ children: [new TextRun({ text: `Pre-Lesson: Elicit (${exp.preLesson.elicit.time})`, bold: true })] })]
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({ children: [new TextRun({ text: exp.preLesson.elicit.activity })] }),
                        new Paragraph({
                          children: [
                            new TextRun({ text: 'Expected students\' response: ', bold: true, italics: true }),
                            new TextRun({ text: exp.preLesson.elicit.expectedResponses, italics: true })
                          ]
                        })
                      ]
                    })
                  ]
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                      children: [new Paragraph({ children: [new TextRun({ text: `Flow: Explore (${exp.flow.explore.time})`, bold: true })] })]
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({ text: `Group Activity [${exp.flow.explore.groupActivity.formatType}]: `, bold: true }),
                            new TextRun({ text: exp.flow.explore.groupActivity.title, bold: true, color: DEPED_BLUE }),
                            new TextRun({ text: `\n${exp.flow.explore.groupActivity.instructions}` })
                          ]
                        }),
                        new Paragraph({
                          spacing: { before: 60 },
                          children: [
                            new TextRun({ text: `Individual Written Output [${exp.flow.explore.individualOutput.outputType}]: `, bold: true }),
                            new TextRun({ text: exp.flow.explore.individualOutput.title, bold: true, color: DEPED_BLUE }),
                            new TextRun({ text: `\n${exp.flow.explore.individualOutput.instructions}` })
                          ]
                        })
                      ]
                    })
                  ]
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                      children: [new Paragraph({ children: [new TextRun({ text: `Flow: Explain (${exp.flow.explain.time})`, bold: true })] })]
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({ children: [new TextRun({ text: 'Synthesis and Guide Questions:', bold: true })] }),
                        ...exp.flow.explain.synthesisQuestions.map(
                          q =>
                            new Paragraph({
                              bullet: { level: 0 },
                              children: [new TextRun({ text: q })]
                            })
                        )
                      ]
                    })
                  ]
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                      children: [new Paragraph({ children: [new TextRun({ text: 'Learning Resources:', bold: true })] })]
                    }),
                    new TableCell({
                      children: exp.learningResources.map(
                        res =>
                          new Paragraph({
                            bullet: { level: 0 },
                            children: [new TextRun({ text: res, size: 19 })]
                          })
                      )
                    })
                  ]
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                      children: [new Paragraph({ children: [new TextRun({ text: 'Opportunities for Integration:', bold: true })] })]
                    }),
                    new TableCell({
                      children: exp.opportunitiesForIntegration.map(
                        integ =>
                          new Paragraph({
                            bullet: { level: 0 },
                            children: [
                              new TextRun({ text: `${integ.area}: `, bold: true }),
                              new TextRun({ text: integ.connection })
                            ]
                          })
                      )
                    })
                  ]
                })
              ]
            });
          }),

          // 6. Assessment
          new Paragraph({
            spacing: { before: 200, after: 60 },
            children: [new TextRun({ text: '6. ASSESSMENT (FORMATIVE ASSESSMENT)', bold: true, size: 20, color: DEPED_BLUE })]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: matrix.assessment.map(
                  ass =>
                    new TableCell({
                      width: { size: Math.floor(100 / matrix.assessment.length), type: WidthType.PERCENTAGE },
                      shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({ text: `Session ${ass.sessionNumber}`, bold: true, color: DEPED_NAVY }),
                            new TextRun({ text: `\n${ass.sessionDate}`, size: 16, italics: true })
                          ]
                        })
                      ]
                    })
                )
              }),
              new TableRow({
                children: matrix.assessment.map(
                  ass =>
                    new TableCell({
                      children: [
                        new Paragraph({ children: [new TextRun({ text: 'Formative Task:', bold: true })] }),
                        new Paragraph({ children: [new TextRun({ text: ass.formativeTask, size: 19 })] }),
                        new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text: 'Guidance & Support:', bold: true })] }),
                        new Paragraph({ children: [new TextRun({ text: ass.guidanceAndSupport, size: 18 })] }),
                        new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text: 'Accommodations:', bold: true })] }),
                        new Paragraph({ children: [new TextRun({ text: ass.accommodations, size: 18 })] })
                      ]
                    })
                )
              })
            ]
          }),

          // 7. Ways Forward
          new Paragraph({
            spacing: { before: 200, after: 60 },
            children: [new TextRun({ text: '7. WAYS FORWARD', bold: true, size: 20, color: DEPED_BLUE })]
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Extended Learning Opportunities:', bold: true })]
          }),
          ...matrix.waysForward.extendedLearningOpportunities.map(
            elo =>
              new Paragraph({
                bullet: { level: 0 },
                children: [new TextRun({ text: elo })]
              })
          ),
          new Paragraph({
            spacing: { before: 100 },
            children: [
              new TextRun({ text: 'Teacher Reflection & Innovations:', bold: true }),
              new TextRun({ text: `\n${matrix.waysForward.reflections}`, italics: true })
            ]
          }),

          // Part 3: Learning Activity Sheets (LAS)
          new Paragraph({
            spacing: { before: 300, after: 100 },
            children: [
              new TextRun({
                text: 'PART 3: LEARNING ACTIVITY SHEETS (LAS) — ALL SESSIONS',
                bold: true,
                size: 22,
                color: DEPED_NAVY
              })
            ]
          }),

          ...activitySheets.flatMap((sheet, index) => [
            new Paragraph({
              spacing: { before: 200, after: 60 },
              children: [
                new TextRun({
                  text: `ACTIVITY SHEET FOR SESSION ${sheet.sessionNumber} (${sheet.sessionDate})`,
                  bold: true,
                  size: 20,
                  color: DEPED_BLUE
                })
              ]
            }),

            // LAS Header
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 50, type: WidthType.PERCENTAGE },
                      children: [new Paragraph({ children: [new TextRun({ text: 'Name of Learner: ____________________________' })] })]
                    }),
                    new TableCell({
                      width: { size: 50, type: WidthType.PERCENTAGE },
                      children: [new Paragraph({ children: [new TextRun({ text: 'Grade & Section: ____________________________' })] })]
                    })
                  ]
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: `Learning Area: ${header.learningArea}` })] })]
                    }),
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: `Date: ${sheet.sessionDate}` })] })]
                    })
                  ]
                })
              ]
            }),

            new Paragraph({
              spacing: { before: 100, after: 60 },
              children: [new TextRun({ text: sheet.activityTitle, bold: true, size: 22, color: DEPED_NAVY })]
            }),

            new Paragraph({
              children: [
                new TextRun({ text: 'Objectives: ', bold: true }),
                new TextRun({ text: 'At the end of the activity, the learners should be able to:' })
              ]
            }),
            ...sheet.objectives.map(obj => new Paragraph({ bullet: { level: 0 }, children: [new TextRun({ text: obj })] })),

            new Paragraph({
              spacing: { before: 80 },
              children: [
                new TextRun({ text: 'Materials: ', bold: true }),
                new TextRun({ text: sheet.materials.join(', ') })
              ]
            }),

            new Paragraph({
              spacing: { before: 80, after: 100 },
              children: [
                new TextRun({ text: 'Instruction: ', bold: true }),
                new TextRun({ text: sheet.instruction })
              ]
            }),

            // Part A
            new Paragraph({
              spacing: { before: 100, after: 40 },
              children: [new TextRun({ text: sheet.partAGroup.title, bold: true, color: DEPED_BLUE })]
            }),
            new Paragraph({
              children: [new TextRun({ text: sheet.partAGroup.scenarioOrPrompt })]
            }),

            ...(sheet.partAGroup.tableData
              ? [
                  new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                      new TableRow({
                        children: sheet.partAGroup.tableData.headers.map(
                          h =>
                            new TableCell({
                              shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
                              children: [new Paragraph({ children: [new TextRun({ text: h, bold: true })] })]
                            })
                        )
                      }),
                      ...sheet.partAGroup.tableData.rows.map(
                        row =>
                          new TableRow({
                            children: row.map(
                              cell =>
                                new TableCell({
                                  children: [new Paragraph({ children: [new TextRun({ text: cell })] })]
                                })
                            )
                          })
                      )
                    ]
                  })
                ]
              : []),

            ...sheet.partAGroup.guidingQuestions.map(
              q =>
                new Paragraph({
                  spacing: { before: 60 },
                  children: [new TextRun({ text: q, italics: true })]
                })
            ),

            // Part B
            new Paragraph({
              spacing: { before: 120, after: 40 },
              children: [new TextRun({ text: sheet.partBIndividual.title, bold: true, color: DEPED_BLUE })]
            }),
            new Paragraph({
              children: [new TextRun({ text: sheet.partBIndividual.taskPrompt })]
            }),
            ...sheet.partBIndividual.analysisChallenge.map(
              ac =>
                new Paragraph({
                  spacing: { before: 60 },
                  children: [new TextRun({ text: ac, italics: true })]
                })
            ),

            // Answer Key
            new Paragraph({
              spacing: { before: 140, after: 40 },
              children: [
                new TextRun({
                  text: 'ANSWER KEY — for teacher use, not to be distributed with the worksheet',
                  bold: true,
                  color: 'B91C1C'
                })
              ]
            }),
            ...sheet.answerKey.partAAnswers.map(ans => new Paragraph({ bullet: { level: 0 }, children: [new TextRun({ text: ans, size: 18 })] })),
            ...sheet.answerKey.partBAnswers.map(ans => new Paragraph({ bullet: { level: 0 }, children: [new TextRun({ text: ans, size: 18 })] })),

            // Rubric
            new Paragraph({
              spacing: { before: 120, after: 40 },
              children: [new TextRun({ text: `Analytic Rubric for ${sheet.activityTitle}:`, bold: true })]
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({ shading: { fill: HEADER_BG, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Criterion', bold: true })] })] }),
                    new TableCell({ shading: { fill: HEADER_BG, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Exemplary (4)', bold: true })] })] }),
                    new TableCell({ shading: { fill: HEADER_BG, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Proficient (3)', bold: true })] })] }),
                    new TableCell({ shading: { fill: HEADER_BG, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Developing (2)', bold: true })] })] }),
                    new TableCell({ shading: { fill: HEADER_BG, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Beginning (1)', bold: true })] })] })
                  ]
                }),
                ...sheet.rubric.criteria.map(
                  crit =>
                    new TableRow({
                      children: [
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: crit.criterion, bold: true })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: crit.exemplary4, size: 17 })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: crit.proficient3, size: 17 })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: crit.developing2, size: 17 })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: crit.beginning1, size: 17 })] })] })
                      ]
                    })
                )
              ]
            }),

            // Notes for Use
            new Paragraph({
              spacing: { before: 80, after: 40 },
              children: [new TextRun({ text: 'Notes for Use:', bold: true })]
            }),
            ...sheet.notesForUse.map(n => new Paragraph({ bullet: { level: 0 }, children: [new TextRun({ text: n, size: 18 })] }))
          ]),

          // Signatures block
          new Paragraph({
            spacing: { before: 300, after: 60 },
            children: [new TextRun({ text: 'SIGNATURES & APPROVALS (DEPED DO 3, s. 2026)', bold: true, size: 20, color: DEPED_NAVY })]
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 33, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Prepared by:\n\n\n', size: 18 }),
                          new TextRun({ text: header.teacher.toUpperCase(), bold: true }),
                          new TextRun({ text: '\nSpecial Science Teacher II / Subject Teacher' })
                        ]
                      })
                    ]
                  }),
                  new TableCell({
                    width: { size: 33, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Quality Assured by:\n\n\n', size: 18 }),
                          new TextRun({ text: 'MASTER TEACHER / HEAD TEACHER', bold: true }),
                          new TextRun({ text: '\nDepartment Head, SHS Curriculum' })
                        ]
                      })
                    ]
                  }),
                  new TableCell({
                    width: { size: 34, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Noted by:\n\n\n', size: 18 }),
                          new TextRun({ text: 'SECONDARY SCHOOL PRINCIPAL IV', bold: true }),
                          new TextRun({ text: '\nSchool Head / LNNCHS' })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const actualFileName = fileName || `ILAW_DO3_${header.lesson.replace(/[^a-zA-Z0-9]/g, '_')}_${header.teacher.replace(/[^a-zA-Z0-9]/g, '_')}.docx`;
  saveBlob(blob, actualFileName);
}

export const exportDO3ILAWToDocx = exportILAWToDocx;
