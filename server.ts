import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

function extractJSON(text: string): any {
  try {
    return JSON.parse(text);
  } catch (err) {
    const cleaned = text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();
    return JSON.parse(cleaned);
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    project: 'Boiser Powerful Education Tools — 2026 Three-Term K–12 Master',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY)
  });
});

// Generate DepEd Daily Lesson Log (DLL / DLP) endpoint
app.post('/api/generate-lesson', async (req, res) => {
  try {
    const { competency, teacherNotes, durationMinutes = 60 } = req.body;

    if (!competency || !competency.learning_competency) {
      return res.status(400).json({ error: 'Competency record is required' });
    }

    const ai = getAI();

    const promptText = `
You are a master curriculum specialist and DepEd Master Teacher in the Philippines.
Develop a complete, pedagogically rigorous Daily Lesson Log (DLL) / Detailed Lesson Plan (DLP) aligned with the DepEd SY 2026–2027 Three-Term Curriculum (DO 009, s. 2026 & DO 015, s. 2026).

COMPETENCY DETAILS:
- Grade Level: ${competency.grade_level} (${competency.key_stage})
- Curriculum Framework: ${competency.curriculum}
- Subject: ${competency.subject_title} (${competency.subject_code})
- Term: Term ${competency.term}, Week ${competency.week}
- Learning Competency: "${competency.learning_competency}"
- Competency Code: ${competency.competency_code || 'N/A'}
- Domain: ${competency.domain || 'Core Discipline'}
- Content Standard: ${competency.content_standard || 'Standard understanding of discipline'}
- Performance Standard: ${competency.performance_standard || 'Practical and creative application'}
${teacherNotes ? `- Specific Teacher Context/Notes: "${teacherNotes}"` : ''}

Generate a comprehensive DepEd DLL in JSON format adhering strictly to this schema:
{
  "title": "Comprehensive Lesson Title",
  "content": "Specific topic and pedagogical core",
  "learningObjectives": [
    "Cognitive (Knowledge) objective",
    "Psychomotor (Skill/Practical) objective",
    "Affective (Values/Attitude) objective"
  ],
  "learningResources": {
    "references": ["Curriculum Guide page/source", "Teacher's Guide / Learner Material citation"],
    "otherResources": ["Interactive slides, realia, manipulatives, digital tools (e.g. Canva)"]
  },
  "procedures": {
    "routineAndReview": "A. Reviewing previous lesson or presenting the new lesson with an engaging diagnostic activity (3-5 mins).",
    "motivationAndPurpose": "B. Establishing a purpose for the lesson / Priming hook connecting to learners' daily Philippine life (3-5 mins).",
    "presentationAndExamples": "C. Presenting examples/instances of the new lesson with concrete realia or multimedia (7-10 mins).",
    "discussionConcept1": "D. Discussing new concepts and practicing new skills #1 — direct teacher-guided interactive modeling (10 mins).",
    "discussionConcept2": "E. Discussing new concepts and practicing new skills #2 — collaborative discovery or laboratory analysis (10 mins).",
    "guidedPractice": "F. Developing mastery (Formative Assessment) with tiered group activity and rubrics (10 mins).",
    "realWorldApplication": "G. Finding practical applications of concepts and skills in daily Philippine community/household living (5 mins).",
    "generalizationAndAbstraction": "H. Making generalizations and abstractions about the lesson — student synthesis (5 mins).",
    "evaluatingLearning": "I. Evaluating learning — 5-item formative quiz, exit ticket, or performance rubric (5 mins).",
    "additionalActivities": "J. Additional activities for application, enrichment, or differentiated remediation."
  },
  "differentiatedInstruction": {
    "strugglingLearners": "Scaffolded support, peer buddies, visual guides",
    "advancedLearners": "Inquiry extension, leadership roles, deeper case study"
  },
  "canvaSlidePrompts": [
    "Slide 1 Title & Hook: [Specific slide visual instruction]",
    "Slide 2 Concept Breakdown: [Visual layout instruction]",
    "Slide 3 Interactive Activity & Rubric: [Slide design guide]"
  ]
}
Respond strictly with valid JSON. Do not include markdown codeblocks around the response.
`;

    let responseText = '';
    let modelUsed = 'gemini-3.5-flash';

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [{ parts: [{ text: promptText }] }],
        config: {
          responseMimeType: 'application/json'
        }
      });
      responseText = response.text || '';
    } catch (err: any) {
      console.warn('Gemini 3.5 flash error, falling back to gemini-3.1-pro-preview:', err?.message);
      modelUsed = 'gemini-3.1-pro-preview';
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: [{ parts: [{ text: promptText }] }],
        config: {
          responseMimeType: 'application/json'
        }
      });
      responseText = fallbackResponse.text || '';
    }

    const lessonPlan = extractJSON(responseText);
    return res.json({
      success: true,
      data: lessonPlan,
      modelUsed
    });
  } catch (error: any) {
    console.error('Error in /api/generate-lesson:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate Daily Lesson Log.'
    });
  }
});

// Generate DepEd Assessment Items and Rubrics endpoint
app.post('/api/generate-assessment', async (req, res) => {
  try {
    const { competency, targetWeight, gradeLevel, term = 1 } = req.body;

    if (!competency) {
      return res.status(400).json({ error: 'Competency is required' });
    }

    const ai = getAI();

    const promptText = `
You are a DepEd Assessment & Measurement Specialist in the Philippines.
Create an authentic, standards-aligned assessment blueprint and test items for:
- Grade Level: ${gradeLevel || competency.grade_level}
- Subject: ${competency.subject_title}
- Term: Term ${term}, Week ${competency.week || '1-2'}
- Competency: "${competency.learning_competency}"
- Target Component: ${targetWeight || 'Performance Tasks (DO 015, s. 2026)'}

Provide JSON adhering to:
{
  "title": "Assessment Title",
  "targetComponent": "${targetWeight || 'Performance Task'}",
  "instructions": "Clear instructions for learners",
  "items": [
    {
      "itemNumber": 1,
      "type": "Multiple Choice | Essay | Performance Rubric | Practical Demo",
      "cognitiveLevel": "Remembering | Understanding | Applying | Analyzing | Evaluating | Creating",
      "question": "Question or task prompt",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."], // optional for MC
      "answerKeyOrRubric": "Correct answer or 4-tier rubric criteria",
      "points": 5
    }
  ],
  "rubric": {
    "criteria": [
      {
        "name": "Accuracy / Content Standard",
        "excellent4": "Descriptor for 4 pts",
        "proficient3": "Descriptor for 3 pts",
        "developing2": "Descriptor for 2 pts",
        "beginning1": "Descriptor for 1 pt"
      }
    ]
  }
}
Respond strictly with valid JSON.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [{ parts: [{ text: promptText }] }],
      config: {
        responseMimeType: 'application/json'
      }
    });

    const assessment = extractJSON(response.text || '{}');
    return res.json({
      success: true,
      data: assessment
    });
  } catch (error: any) {
    console.error('Error in /api/generate-assessment:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate assessment.'
    });
  }
});

// Start server function handling Vite in dev and static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
