import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Printer,
  Copy,
  Check,
  Download,
  BookOpen,
  ChevronDown,
  Layers,
  Presentation,
  CheckCircle2,
  RefreshCw,
  Clock,
  User
} from 'lucide-react';
import { CompetencyRecord, DailyLessonLog } from '../types';

interface LessonPlannerProps {
  competencies: CompetencyRecord[];
  selectedCompetency: CompetencyRecord | null;
  onSelectCompetency: (comp: CompetencyRecord) => void;
  onSendToCanva: (comp: CompetencyRecord) => void;
}

export const LessonPlanner: React.FC<LessonPlannerProps> = ({
  competencies,
  selectedCompetency,
  onSelectCompetency,
  onSendToCanva,
}) => {
  const [activeComp, setActiveComp] = useState<CompetencyRecord>(
    selectedCompetency || competencies[0]
  );
  const [teacherName, setTeacherName] = useState('Teacher Master / Specialist');
  const [teacherNotes, setTeacherNotes] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync if prop changes
  React.useEffect(() => {
    if (selectedCompetency) {
      setActiveComp(selectedCompetency);
    }
  }, [selectedCompetency]);

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          competency: activeComp,
          teacherNotes,
          durationMinutes
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setGeneratedPlan(data.data);
      } else {
        alert(data.error || 'Failed to generate lesson plan.');
      }
    } catch (err: any) {
      console.error(err);
      alert('Error communicating with backend generator.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyMarkdown = () => {
    if (!generatedPlan && !activeComp) return;

    const content = `
# DEPED DAILY LESSON LOG (DLL) — SY 2026–2027
**School Year:** 2026–2027 | **Term:** Term ${activeComp.term} | **Week:** Week ${activeComp.week}
**Grade Level:** ${activeComp.grade_level} (${activeComp.key_stage}) | **Learning Area:** ${activeComp.subject_title}
**Curriculum Framework:** ${activeComp.curriculum}
**Teacher:** ${teacherName} | **Duration:** ${durationMinutes} mins

---
### I. OBJECTIVES
- **Content Standard:** ${activeComp.content_standard || 'Standard understanding'}
- **Performance Standard:** ${activeComp.performance_standard || 'Practical demonstration'}
- **Learning Competency:** ${activeComp.learning_competency}
- **Competency Code:** ${activeComp.competency_code || 'N/A'}
- **Specific Learning Objectives:**
${(generatedPlan?.learningObjectives || [
  'Define and identify key disciplinary concepts',
  'Demonstrate practical execution and problem-solving',
  'Exhibit ethical and cultural appreciation in group tasks'
]).map((o: string) => `  - ${o}`).join('\n')}

---
### II. CONTENT & TOPIC
**Topic:** ${generatedPlan?.title || activeComp.subject_title}
**Domain:** ${activeComp.domain || 'Prescribed Learning Area'}

---
### III. LEARNING RESOURCES
- **References:** ${generatedPlan?.learningResources?.references?.join(', ') || activeComp.bow_source}
- **Other Resources:** ${generatedPlan?.learningResources?.otherResources?.join(', ') || 'Slide decks, manipulatives, authentic materials'}

---
### IV. PROCEDURES (10-Step DepEd Format)
**A. Reviewing previous lesson or presenting the new lesson:**
${generatedPlan?.procedures?.routineAndReview || 'Engage learners with diagnostic recall.'}

**B. Establishing a purpose for the lesson:**
${generatedPlan?.procedures?.motivationAndPurpose || 'State the essential question and real-world relevance.'}

**C. Presenting examples/instances of the new lesson:**
${generatedPlan?.procedures?.presentationAndExamples || 'Show multimodal samples and realia.'}

**D. Discussing new concepts and practicing new skills #1:**
${generatedPlan?.procedures?.discussionConcept1 || 'Direct teacher-guided interactive modeling.'}

**E. Discussing new concepts and practicing new skills #2:**
${generatedPlan?.procedures?.discussionConcept2 || 'Collaborative group inquiry and structured discovery.'}

**F. Developing mastery (Leads to Formative Assessment):**
${generatedPlan?.procedures?.guidedPractice || 'Tiered practice activity with authentic rubric.'}

**G. Finding practical applications of concepts and skills in daily living:**
${generatedPlan?.procedures?.realWorldApplication || 'Connect to everyday community/household situations in the Philippines.'}

**H. Making generalizations and abstractions about the lesson:**
${generatedPlan?.procedures?.generalizationAndAbstraction || 'Synthesize key takeaways and enduring understandings.'}

**I. Evaluating learning:**
${generatedPlan?.procedures?.evaluatingLearning || '5-item formative quiz or exit assessment.'}

**J. Additional activities for application or remediation:**
${generatedPlan?.procedures?.additionalActivities || 'Enrichment task or scaffolded remedial worksheet.'}

---
### V. REMARKS & REFLECTION
- Learners who earned 80% on formative assessment: [Pending evaluation]
- Learners requiring additional remediation: [Pending evaluation]
    `.trim();

    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
              DepEd Standard DLL / DLP
            </span>
            <span className="text-xs text-stone-500 font-medium">
              10-Part Procedural Matrix • AI Grounded
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900">
            Three-Term Daily Lesson Log (DLL) Builder
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-2xl">
            Select any verified competency to generate a comprehensive, classroom-ready lesson plan with differentiated instruction, local contextualization, and Canva slide deck outlines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied DLL' : 'Copy Formatted DLL'}</span>
          </button>
          <button
            onClick={() => onSendToCanva(activeComp)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Send to Canva Deck</span>
          </button>
        </div>
      </div>

      {/* Configuration & Selection Panel */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Competency Selector */}
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Select Competency from Master Database
            </label>
            <select
              value={activeComp.id}
              onChange={(e) => {
                const found = competencies.find((c) => c.id === e.target.value);
                if (found) {
                  setActiveComp(found);
                  setGeneratedPlan(null);
                }
              }}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-medium text-stone-800"
            >
              {competencies.map((c) => (
                <option key={c.id} value={c.id}>
                  [{c.grade_level === 'Kindergarten' ? 'K' : `Gr ${c.grade_level}`} T{c.term} W{c.week}] {c.subject_title}: {c.learning_competency.slice(0, 75)}...
                </option>
              ))}
            </select>
          </div>

          {/* Teacher Name & Duration */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Teacher</label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Duration (Mins)</label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50"
              />
            </div>
          </div>
        </div>

        {/* Selected Competency Badge Card */}
        <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-blue-900">
                {activeComp.subject_title} ({activeComp.competency_code || activeComp.subject_code})
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-200 text-blue-900 text-[10px] font-bold">
                Term {activeComp.term} • Week {activeComp.week}
              </span>
              <span className="px-2 py-0.5 rounded bg-white text-stone-700 text-[10px] font-semibold border border-blue-200">
                {activeComp.curriculum}
              </span>
            </div>
            <p className="text-stone-800 font-medium">
              "{activeComp.learning_competency}"
            </p>
          </div>

          <button
            onClick={handleGenerateAI}
            disabled={isGenerating}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 disabled:bg-blue-400 text-white font-bold text-xs shadow-xs transition cursor-pointer shrink-0"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Crafting Lesson Plan...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Generate Full DepEd DLL</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Lesson Plan Document View (DepEd 10-Step Format) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
        {/* Document Header */}
        <div className="border-b-2 border-stone-900 pb-4 text-center space-y-1">
          <span className="text-[11px] font-extrabold text-stone-500 uppercase tracking-widest block">
            Department of Education • Republic of the Philippines
          </span>
          <h3 className="text-xl font-bold font-display text-stone-900">
            DAILY LESSON LOG (DLL) / DETAILED LESSON PLAN (DLP)
          </h3>
          <p className="text-xs text-stone-600 font-mono">
            SY 2026–2027 • Three-Term Calendar (DO 009, s. 2026) • Term {activeComp.term}, Week {activeComp.week}
          </p>
        </div>

        {/* Matrix Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs border border-stone-200 rounded-2xl p-4 bg-stone-50/50">
          <div>
            <span className="font-bold text-stone-500 block text-[10px] uppercase">Grade Level</span>
            <span className="font-semibold text-stone-900">{activeComp.grade_level} ({activeComp.key_stage})</span>
          </div>
          <div>
            <span className="font-bold text-stone-500 block text-[10px] uppercase">Learning Area</span>
            <span className="font-semibold text-stone-900">{activeComp.subject_title}</span>
          </div>
          <div>
            <span className="font-bold text-stone-500 block text-[10px] uppercase">Teaching Duration</span>
            <span className="font-semibold text-stone-900">{durationMinutes} Minutes</span>
          </div>
          <div>
            <span className="font-bold text-stone-500 block text-[10px] uppercase">Assessment Scheme</span>
            <span className="font-semibold text-blue-800">{activeComp.assessment_weight_set}</span>
          </div>
        </div>

        {/* I. Objectives */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold uppercase text-blue-900 tracking-wider flex items-center gap-1.5 border-b border-stone-100 pb-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-700"></span>
            I. Objectives
          </h4>

          <div className="space-y-2 text-xs text-stone-700">
            <p>
              <strong className="text-stone-900">A. Content Standards:</strong> {activeComp.content_standard || 'The learner demonstrates understanding of essential disciplinary principles and context.'}
            </p>
            <p>
              <strong className="text-stone-900">B. Performance Standards:</strong> {activeComp.performance_standard || 'The learner independently applies knowledge in realistic collaborative tasks.'}
            </p>
            <p>
              <strong className="text-stone-900">C. Learning Competency:</strong> {activeComp.learning_competency} <span className="font-mono text-stone-500">({activeComp.competency_code || 'BOW-2026'})</span>
            </p>
            <div>
              <strong className="text-stone-900 block mb-1">D. Specific Learning Objectives:</strong>
              <ul className="list-disc list-inside space-y-1 pl-2 text-stone-800">
                {generatedPlan?.learningObjectives ? (
                  generatedPlan.learningObjectives.map((obj: string, i: number) => (
                    <li key={i}>{obj}</li>
                  ))
                ) : (
                  <>
                    <li>Identify and explain the essential theoretical foundations of the competency.</li>
                    <li>Demonstrate active problem-solving and task execution in small groups.</li>
                    <li>Express cultural and social responsibility in applied community contexts.</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* II. Content */}
        <div className="space-y-2">
          <h4 className="text-xs font-extrabold uppercase text-blue-900 tracking-wider flex items-center gap-1.5 border-b border-stone-100 pb-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-700"></span>
            II. Content & Topic
          </h4>
          <p className="text-xs text-stone-800 font-medium">
            <strong>Subject Matter:</strong> {generatedPlan?.title || activeComp.subject_title} — {activeComp.domain || 'Disciplinary Standard'}
          </p>
        </div>

        {/* III. Learning Resources */}
        <div className="space-y-2">
          <h4 className="text-xs font-extrabold uppercase text-blue-900 tracking-wider flex items-center gap-1.5 border-b border-stone-100 pb-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-700"></span>
            III. Learning Resources
          </h4>
          <div className="text-xs text-stone-700 space-y-1">
            <p><strong>Curriculum Guide / BOW:</strong> {activeComp.bow_source} | {activeComp.cg_source}</p>
            <p><strong>Additional Materials:</strong> {generatedPlan?.learningResources?.otherResources?.join(', ') || 'Interactive slide decks (Canva), realia, activity sheets, graphic organizers.'}</p>
          </div>
        </div>

        {/* IV. Procedures (Steps A to J) */}
        <div className="space-y-4">
          <h4 className="text-xs font-extrabold uppercase text-blue-900 tracking-wider flex items-center gap-1.5 border-b border-stone-100 pb-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-700"></span>
            IV. Procedures (DepEd 10-Step Model)
          </h4>

          <div className="space-y-3 text-xs">
            {/* Step A */}
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
              <span className="font-bold text-stone-900 block mb-1">
                A. Reviewing previous lesson or presenting the new lesson (Diagnostic & Recall)
              </span>
              <p className="text-stone-700 leading-relaxed">
                {generatedPlan?.procedures?.routineAndReview ||
                  'The teacher conducts a 3-minute interactive review using flash questions or a rapid word-association drill to reactivate prior knowledge.'}
              </p>
            </div>

            {/* Step B */}
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
              <span className="font-bold text-stone-900 block mb-1">
                B. Establishing a purpose for the lesson (Priming & Motivation)
              </span>
              <p className="text-stone-700 leading-relaxed">
                {generatedPlan?.procedures?.motivationAndPurpose ||
                  'Introduce a relatable daily situation or multimedia hook from Philippine life to ignite curiosity and present the target objective.'}
              </p>
            </div>

            {/* Step C */}
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
              <span className="font-bold text-stone-900 block mb-1">
                C. Presenting examples/instances of the new lesson
              </span>
              <p className="text-stone-700 leading-relaxed">
                {generatedPlan?.procedures?.presentationAndExamples ||
                  'Display concrete visual models, case vignettes, or manipulatives demonstrating the competency in real-life practice.'}
              </p>
            </div>

            {/* Step D */}
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
              <span className="font-bold text-stone-900 block mb-1">
                D. Discussing new concepts and practicing new skills #1 (Direct Instruction)
              </span>
              <p className="text-stone-700 leading-relaxed">
                {generatedPlan?.procedures?.discussionConcept1 ||
                  'Teacher-led explicit modeling: Break down key steps and formulas, guiding students through worked examples.'}
              </p>
            </div>

            {/* Step E */}
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
              <span className="font-bold text-stone-900 block mb-1">
                E. Discussing new concepts and practicing new skills #2 (Guided Collaborative Practice)
              </span>
              <p className="text-stone-700 leading-relaxed">
                {generatedPlan?.procedures?.discussionConcept2 ||
                  'Pair or small-group inquiry: Students tackle scaffolded problems with peer discussion and immediate teacher feedback.'}
              </p>
            </div>

            {/* Step F */}
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
              <span className="font-bold text-stone-900 block mb-1">
                F. Developing mastery (Formative Assessment)
              </span>
              <p className="text-stone-700 leading-relaxed">
                {generatedPlan?.procedures?.guidedPractice ||
                  'Independent or tiered team challenge evaluated using a clear 4-level rubric to measure accuracy and independence.'}
              </p>
            </div>

            {/* Step G */}
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
              <span className="font-bold text-stone-900 block mb-1">
                G. Finding practical applications of concepts and skills in daily living
              </span>
              <p className="text-stone-700 leading-relaxed">
                {generatedPlan?.procedures?.realWorldApplication ||
                  'Connect the lesson to barangay community contexts, household financial decisions, or local occupational safety standards.'}
              </p>
            </div>

            {/* Step H */}
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
              <span className="font-bold text-stone-900 block mb-1">
                H. Making generalizations and abstractions about the lesson
              </span>
              <p className="text-stone-700 leading-relaxed">
                {generatedPlan?.procedures?.generalizationAndAbstraction ||
                  'Learners articulate what they learned by completing the synthesis prompt: "Today I discovered that..."'}
              </p>
            </div>

            {/* Step I */}
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
              <span className="font-bold text-stone-900 block mb-1">
                I. Evaluating learning (Formative Quiz / Authentic Output)
              </span>
              <p className="text-stone-700 leading-relaxed">
                {generatedPlan?.procedures?.evaluatingLearning ||
                  'Administer a 5-item formative quiz or evaluate student artifacts against the standard performance rubric.'}
              </p>
            </div>

            {/* Step J */}
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
              <span className="font-bold text-stone-900 block mb-1">
                J. Additional activities for application or remediation
              </span>
              <p className="text-stone-700 leading-relaxed">
                {generatedPlan?.procedures?.additionalActivities ||
                  'Provide differentiated enrichment tasks for advanced learners and targeted remediation guides for students needing reinforcement.'}
              </p>
            </div>
          </div>
        </div>

        {/* Canva Presentation Slide Outlines (Presentation Layer Integration) */}
        {generatedPlan?.canvaSlidePrompts && (
          <div className="p-5 rounded-3xl bg-purple-50/70 border border-purple-200 space-y-3">
            <div className="flex items-center gap-2">
              <Presentation className="w-4 h-4 text-purple-700" />
              <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                Canva Presentation Deck Bridge (Ready to Copy)
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {generatedPlan.canvaSlidePrompts.map((slide: string, i: number) => (
                <div key={i} className="p-3 rounded-xl bg-white border border-purple-100 shadow-2xs space-y-1">
                  <span className="font-bold text-purple-800 text-[11px] block">Slide {i + 1}</span>
                  <p className="text-stone-700 text-[11px] leading-relaxed">{slide}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
