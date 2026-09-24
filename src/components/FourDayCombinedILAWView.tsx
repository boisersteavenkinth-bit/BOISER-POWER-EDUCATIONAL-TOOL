import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  Copy,
  Check,
  Sparkles,
  Users,
  User,
  Layers,
  Calendar,
  Award,
  BookOpen,
  CheckCircle2,
  FileSpreadsheet,
  FileDown,
  ArrowRight,
  ShieldCheck,
  BookmarkCheck,
  HelpCircle,
  Clock
} from 'lucide-react';
import { ILAWCompletePlan } from '../types/ilawDO3';

interface FourDayCombinedILAWViewProps {
  plan: ILAWCompletePlan;
  onExportDocx?: () => void;
  onExportPdf?: () => void;
}

export const FourDayCombinedILAWView: React.FC<FourDayCombinedILAWViewProps> = ({
  plan,
  onExportDocx,
  onExportPdf
}) => {
  const [activityMode, setActivityMode] = useState<'mixed' | 'individual' | 'group'>('mixed');
  const [copied, setCopied] = useState(false);

  const { header, matrix, activitySheets } = plan;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyFormattedText = () => {
    const textContent = `DEPARTMENT OF EDUCATION - REGION X
LESSON EXEMPLAR & LEARNING ACTIVITY SHEETS (4-DAY SESSION)
Format: Life & Career Skills / DepEd Order No. 3, s. 2026 Standards

Learning Area: ${header.learningArea}
Grade & Section: ${header.gradeLevelAndSection}
Quarter / Term: Term ${header.term} (Week ${header.bowWeek})
Inclusive Teaching Dates: ${header.inclusiveTeachingDates}
Teacher: ${header.teacher}
School: ${header.school}

============================================================
I. CURRICULUM CONTENT, STANDARDS, AND LESSON COMPETENCIES
============================================================
A. Content Standards:
${matrix.competency.contentStandard}

B. Performance Standards:
${matrix.competency.performanceStandard}

C. Learning Competencies & Objectives:
- Primary Competency: ${matrix.competency.melc}
- Content Focus: ${matrix.competency.content}
- Daily Enabling Objectives:
  * Day 1 (Cognitive/Elicit): ${matrix.objectives[0]?.objectives.join('; ') || 'Identify key foundational principles'}
  * Day 2 (Psychomotor/Inquiry): ${matrix.objectives[1]?.objectives.join('; ') || 'Analyze and execute core practical procedures'}
  * Day 3 (Collaborative/Application): ${matrix.objectives[2]?.objectives.join('; ') || 'Collaborate to solve real-world problem scenarios'}
  * Day 4 (Synthesis/Evaluation): ${matrix.objectives[3]?.objectives.join('; ') || 'Demonstrate comprehensive mastery and reflective assessment.'}

D. Content / Subject Matter: ${header.lesson}
E. Integration: Values Education, Life and Career Skills (Critical Thinking, Collaboration, Communication)

============================================================
II. LEARNING RESOURCES
============================================================
A. References: DepEd LRMDS Portal (lrmds.deped.gov.ph), Teacher's Guide, Learner's Materials
B. Other Resources: Activity Worksheets, Visual Aids, Multimedia Presentations

============================================================
III. TEACHING AND LEARNING PROCEDURES (4-DAY SESSIONS)
============================================================
[DAY 1: ACTIVATE & ENGAGE - PHASE I (INTENTION)]
- Mind & Mood: ${matrix.learningExperience[0]?.preLesson.elicit.activity || 'Activating prior knowledge through diagnostic elicitation.'}
- Lesson Proper: ${matrix.learningExperience[0]?.flow.explain.time || '15 mins'} - ${matrix.learningExperience[0]?.flow.explain.synthesisQuestions.join(' ') || 'Explicit instruction on fundamental concepts.'}
- Activity: LAS 1 (Individual Schema Activation & Concept Check).

[DAY 2: EXPLORE & DEEPEN - PHASE L (LEARN)]
- Mind & Mood: ${matrix.learningExperience[1]?.preLesson.engage.activity || 'Review of Day 1 takeaways and question formulation.'}
- Lesson Proper: ${matrix.learningExperience[1]?.flow.explore.groupActivity.instructions || 'Guided inquiry and hands-on conceptual demonstration.'}
- Activity: LAS 2 (Guided Concept Mapping & Analytical Drills).

[DAY 3: COLLABORATE & APPLY - PHASE A (APPLY)]
- Mind & Mood: Scenario setup for real-world contextual problem.
- Lesson Proper: ${matrix.learningExperience[2]?.flow.explore.groupActivity.instructions || 'Group collaborative performance task and problem solving.'}
- Activity: LAS 3 (${activityMode === 'group' || activityMode === 'mixed' ? 'Group Collaborative Performance Task' : 'Individual Application Task'} with Rubric).

[DAY 4: SYNTHESIZE & EVALUATE - PHASE W (WEAVE)]
- Mind & Mood: Generalization and synthesis of 4-day learnings.
- Lesson Proper: Formative evaluation, assessment of learning, and personal reflection.
- Activity: LAS 4 (Summative Mastery Test & Metacognitive Reflection).
`;
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Action Bar & Controls */}
      <div className="bg-white border border-[#dce3ee] rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 no-print">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-blue-900 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FCD116]" />
              <span>4-Day Combined ILAW + LAS Session Pack</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
              A4 DepEd Format Verified
            </span>
          </div>
          <h2 className="text-lg font-black text-[#092B62]">
            Complete 4-Day Session &amp; Combined Learning Activity Sheets (LAS)
          </h2>
          <p className="text-xs text-stone-500">
            Headings &amp; Structure modeled after DepEd Life and Career Skills / DO 3, s. 2026 Exemplar with standard 1-inch A4 print margins.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Activity mode switch */}
          <div className="flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-200">
            <button
              onClick={() => setActivityMode('mixed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activityMode === 'mixed' ? 'bg-[#092B62] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Mixed (Indiv + Group)
            </button>
            <button
              onClick={() => setActivityMode('group')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                activityMode === 'group' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Users className="w-3 h-3" />
              <span>Group Focus</span>
            </button>
            <button
              onClick={() => setActivityMode('individual')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                activityMode === 'individual' ? 'bg-blue-800 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <User className="w-3 h-3" />
              <span>Individual</span>
            </button>
          </div>

          <button
            onClick={handleCopyFormattedText}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Text' : 'Copy Full Text'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#092B62] hover:bg-blue-900 text-white rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#FCD116]" />
            <span>Print A4 Document</span>
          </button>

          {onExportDocx && (
            <button
              onClick={onExportDocx}
              className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Export Word (.docx)</span>
            </button>
          )}

          {onExportPdf && (
            <button
              onClick={onExportPdf}
              className="px-3.5 py-2 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Export PDF (A4)</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* PRINTABLE A4 CONTAINER WITH STANDARD 1-INCH (25.4mm) MARGINS */}
      {/* ========================================================= */}
      <div className="a4-document-sheet bg-white border border-stone-300 shadow-xl rounded-2xl mx-auto p-6 sm:p-12 max-w-[850px] font-serif text-stone-900 leading-normal print:m-0 print:p-0 print:border-none print:shadow-none">
        
        {/* ==================== DEPED OFFICIAL HEADER ==================== */}
        <div className="border-b-2 border-stone-900 pb-4 text-center space-y-1 mb-6">
          <div className="flex items-center justify-between px-4">
            <div className="w-16 h-16 rounded-full border border-stone-400 flex items-center justify-center text-[10px] font-sans font-bold text-blue-900 text-center p-1 bg-stone-50">
              DEPED SEAL
            </div>
            <div className="space-y-0.5">
              <p className="text-[11px] font-sans uppercase tracking-widest text-stone-600 font-bold">
                Republic of the Philippines • Department of Education
              </p>
              <p className="text-xs font-sans font-bold text-stone-800 uppercase">
                REGION X – NORTHERN MINDANAO • DIVISION OF LANAO DEL NORTE
              </p>
              <h1 className="text-base sm:text-lg font-bold font-serif uppercase tracking-tight text-blue-950 pt-1">
                4-DAY LESSON EXEMPLAR WITH COMBINED LEARNING ACTIVITY SHEETS (LAS)
              </h1>
              <p className="text-[11px] font-sans text-stone-600 italic">
                (Standard DepEd Order No. 3, s. 2026 Format / Life and Career Skills Alignment)
              </p>
            </div>
            <div className="w-16 h-16 rounded-full border border-stone-400 flex items-center justify-center text-[10px] font-sans font-bold text-amber-800 text-center p-1 bg-stone-50">
              ILAW SEAL
            </div>
          </div>
        </div>

        {/* ==================== METADATA TABLE ==================== */}
        <div className="border border-stone-800 rounded-none mb-6 overflow-hidden text-xs font-sans">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-stone-800 bg-stone-50">
            <div className="p-2.5">
              <span className="font-bold text-stone-600 block text-[10px] uppercase">Learning Area:</span>
              <strong className="text-blue-950">{header.learningArea}</strong>
            </div>
            <div className="p-2.5">
              <span className="font-bold text-stone-600 block text-[10px] uppercase">Grade Level &amp; Section:</span>
              <strong className="text-stone-900">{header.gradeLevelAndSection}</strong>
            </div>
            <div className="p-2.5">
              <span className="font-bold text-stone-600 block text-[10px] uppercase">School Year &amp; Term:</span>
              <strong className="text-stone-900">SY 2026–2027 • Term {header.term}</strong>
            </div>
            <div className="p-2.5">
              <span className="font-bold text-stone-600 block text-[10px] uppercase">BOW Week &amp; Dates:</span>
              <strong className="text-stone-900">{header.bowWeek} ({header.inclusiveTeachingDates})</strong>
            </div>
            <div className="p-2.5 col-span-2">
              <span className="font-bold text-stone-600 block text-[10px] uppercase">Teacher / Master Implementer:</span>
              <strong className="text-blue-950">{header.teacher}</strong>
            </div>
            <div className="p-2.5 col-span-2">
              <span className="font-bold text-stone-600 block text-[10px] uppercase">School Name &amp; Division:</span>
              <strong className="text-stone-900">{header.school} ({header.division})</strong>
            </div>
          </div>
        </div>

        {/* ==================== SECTION I ==================== */}
        <div className="space-y-4 mb-6">
          <div className="bg-[#002776] text-white px-3 py-1.5 font-sans font-bold text-xs uppercase tracking-wide">
            I. CURRICULUM CONTENT, STANDARDS, AND LESSON COMPETENCIES
          </div>

          <div className="space-y-3 text-xs pl-2">
            <div>
              <strong className="font-sans text-stone-900 font-bold uppercase text-[11px] block">
                A. Content Standards:
              </strong>
              <p className="text-stone-800 text-justify mt-0.5 leading-relaxed">
                {matrix.competency.contentStandard}
              </p>
            </div>

            <div>
              <strong className="font-sans text-stone-900 font-bold uppercase text-[11px] block">
                B. Performance Standards:
              </strong>
              <p className="text-stone-800 text-justify mt-0.5 leading-relaxed">
                {matrix.competency.performanceStandard}
              </p>
            </div>

            <div>
              <strong className="font-sans text-stone-900 font-bold uppercase text-[11px] block">
                C. Learning Competencies and Objectives:
              </strong>
              <div className="bg-stone-50 border border-stone-200 p-3 rounded-md mt-1 space-y-2">
                <p className="font-sans font-bold text-blue-950 text-xs">
                  Main Competency: {matrix.competency.melc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="p-2 bg-white border border-stone-200 rounded">
                    <strong>Day 1 (Cognitive / Schema):</strong>{' '}
                    <span>{matrix.objectives[0]?.objectives.join('; ') || 'Define and categorize foundational principles'}</span>
                  </div>
                  <div className="p-2 bg-white border border-stone-200 rounded">
                    <strong>Day 2 (Psychomotor / Inquiry):</strong>{' '}
                    <span>{matrix.objectives[1]?.objectives.join('; ') || 'Analyze and perform core practical operations'}</span>
                  </div>
                  <div className="p-2 bg-white border border-stone-200 rounded">
                    <strong>Day 3 (Affective / Collaborative):</strong>{' '}
                    <span>{matrix.objectives[2]?.objectives.join('; ') || 'Collaborate in group tasks to solve contextual problems'}</span>
                  </div>
                  <div className="p-2 bg-white border border-stone-200 rounded">
                    <strong>Day 4 (Evaluation &amp; Reflection):</strong>{' '}
                    <span>{matrix.objectives[3]?.objectives.join('; ') || 'Synthesize concepts, pass summative assessment, and reflect on values'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong className="font-sans text-stone-900 font-bold uppercase text-[11px] block">
                  D. Content / Topic:
                </strong>
                <p className="text-stone-800 mt-0.5 font-bold">{header.lesson}</p>
              </div>

              <div>
                <strong className="font-sans text-stone-900 font-bold uppercase text-[11px] block">
                  E. Integration / 21st Century Skills:
                </strong>
                <p className="text-stone-800 mt-0.5">
                  Life and Career Skills, Values Education (Moral Integrity, Accountability), Critical Problem-Solving.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== SECTION II ==================== */}
        <div className="space-y-3 mb-6">
          <div className="bg-[#002776] text-white px-3 py-1.5 font-sans font-bold text-xs uppercase tracking-wide">
            II. LEARNING RESOURCES
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pl-2">
            <div>
              <strong className="font-sans text-stone-900 font-bold uppercase text-[11px] block">
                A. References:
              </strong>
              <ul className="list-disc list-inside text-stone-800 space-y-0.5 mt-1 text-[11px]">
                <li>DepEd Learning Resources Management &amp; Development System (LRMDS)</li>
                <li>Teacher's Guide (TG) &amp; Learner's Materials (LM)</li>
                <li>DepEd Order No. 3, s. 2026 &amp; DO 009, s. 2026 Standards</li>
              </ul>
            </div>

            <div>
              <strong className="font-sans text-stone-900 font-bold uppercase text-[11px] block">
                B. Other Learning Resources:
              </strong>
              <ul className="list-disc list-inside text-stone-800 space-y-0.5 mt-1 text-[11px]">
                <li>4-Day Learning Activity Sheets (LAS 1, 2, 3, 4)</li>
                <li>Interactive Presentation Slides &amp; 3D STEM Visuals</li>
                <li>Performance Task Rubrics &amp; Formative Checklists</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ==================== SECTION III: 4-DAY SESSIONS ==================== */}
        <div className="space-y-4 mb-6">
          <div className="bg-[#002776] text-white px-3 py-1.5 font-sans font-bold text-xs uppercase tracking-wide flex items-center justify-between">
            <span>III. TEACHING AND LEARNING PROCEDURES (4-DAY SESSIONS)</span>
            <span className="text-[10px] text-amber-300 font-mono">ILAW 4-Phase Delivery</span>
          </div>

          {/* 4-Day Session Cards */}
          <div className="space-y-4 text-xs">
            {/* DAY 1 */}
            <div className="border border-stone-300 rounded-lg overflow-hidden">
              <div className="bg-stone-100 px-3 py-2 border-b border-stone-300 font-sans font-bold text-blue-950 flex items-center justify-between">
                <span>DAY 1: ACTIVATE &amp; INTENTION (Phase I)</span>
                <span className="text-[10px] bg-blue-100 text-blue-900 px-2 py-0.5 rounded font-mono">
                  Session 1 • Diagnostic &amp; Schema
                </span>
              </div>
              <div className="p-3 space-y-2 text-[11.5px]">
                <div>
                  <strong className="text-stone-900 font-sans">1. Activating Prior Knowledge (Mind and Mood):</strong>
                  <p className="text-stone-700 pl-2 mt-0.5">
                    {matrix.learningExperience[0]?.preLesson?.elicit?.activity ||
                      'Conduct interactive diagnostic drill, eliciting learners’ baseline knowledge on key terminology.'}
                  </p>
                </div>
                <div>
                  <strong className="text-stone-900 font-sans">2. Lesson Proper (Aims &amp; Tasks):</strong>
                  <p className="text-stone-700 pl-2 mt-0.5">
                    {matrix.learningExperience[0]?.flow?.explain?.synthesisQuestions.join(' ') ||
                      'Explicitly communicate competencies and present foundational case studies with guided question prompts.'}
                  </p>
                </div>
                <div className="bg-blue-50/70 p-2 rounded border border-blue-200 text-blue-950">
                  <strong className="font-sans text-[11px] block">Aligned Learning Activity:</strong>
                  <span>LAS 1 (Individual Schema Activation &amp; Diagnostic Check)</span>
                </div>
              </div>
            </div>

            {/* DAY 2 */}
            <div className="border border-stone-300 rounded-lg overflow-hidden">
              <div className="bg-stone-100 px-3 py-2 border-b border-stone-300 font-sans font-bold text-blue-950 flex items-center justify-between">
                <span>DAY 2: EXPLORE &amp; LEARN (Phase L)</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-mono">
                  Session 2 • Guided Inquiry &amp; Analysis
                </span>
              </div>
              <div className="p-3 space-y-2 text-[11.5px]">
                <div>
                  <strong className="text-stone-900 font-sans">1. Review &amp; Spark Inquiry:</strong>
                  <p className="text-stone-700 pl-2 mt-0.5">
                    {matrix.learningExperience[1]?.preLesson?.engage?.activity ||
                      'Review Day 1 concepts and introduce guided investigative scenario.'}
                  </p>
                </div>
                <div>
                  <strong className="text-stone-900 font-sans">2. Lesson Proper (Deepening Understanding):</strong>
                  <p className="text-stone-700 pl-2 mt-0.5">
                    {matrix.learningExperience[1]?.flow?.explore?.individualOutput?.instructions ||
                      'Facilitate structured analytical discussion, breaking down complex mechanisms into sequential steps.'}
                  </p>
                </div>
                <div className="bg-emerald-50/70 p-2 rounded border border-emerald-200 text-emerald-950">
                  <strong className="font-sans text-[11px] block">Aligned Learning Activity:</strong>
                  <span>LAS 2 (Individual Guided Concept Mapping &amp; Analytical Drills)</span>
                </div>
              </div>
            </div>

            {/* DAY 3 */}
            <div className="border border-stone-300 rounded-lg overflow-hidden">
              <div className="bg-stone-100 px-3 py-2 border-b border-stone-300 font-sans font-bold text-blue-950 flex items-center justify-between">
                <span>DAY 3: COLLABORATE &amp; APPLY (Phase A)</span>
                <span className="text-[10px] bg-purple-100 text-purple-900 px-2 py-0.5 rounded font-mono">
                  Session 3 • {activityMode === 'group' || activityMode === 'mixed' ? 'Group Performance Task' : 'Individual Application'}
                </span>
              </div>
              <div className="p-3 space-y-2 text-[11.5px]">
                <div>
                  <strong className="text-stone-900 font-sans">1. Contextual Scenario Setup:</strong>
                  <p className="text-stone-700 pl-2 mt-0.5">
                    {matrix.learningExperience[2]?.preLesson?.engage?.activity ||
                      'Group learners into collaborative circles and assign distinct real-world workplace/community roles.'}
                  </p>
                </div>
                <div>
                  <strong className="text-stone-900 font-sans">2. Lesson Proper (Application &amp; Problem Solving):</strong>
                  <p className="text-stone-700 pl-2 mt-0.5">
                    {matrix.learningExperience[2]?.flow?.explore?.groupActivity?.instructions ||
                      'Guide collaborative execution of the performance task, monitoring rubric criteria and peer accountability.'}
                  </p>
                </div>
                <div className="bg-purple-50/70 p-2 rounded border border-purple-200 text-purple-950">
                  <strong className="font-sans text-[11px] block">Aligned Learning Activity:</strong>
                  <span>
                    LAS 3 ({activityMode === 'group' || activityMode === 'mixed' ? 'Group Collaborative Performance Task' : 'Individual Performance Application'} with Standard Analytic Rubric)
                  </span>
                </div>
              </div>
            </div>

            {/* DAY 4 */}
            <div className="border border-stone-300 rounded-lg overflow-hidden">
              <div className="bg-stone-100 px-3 py-2 border-b border-stone-300 font-sans font-bold text-blue-950 flex items-center justify-between">
                <span>DAY 4: SYNTHESIZE &amp; WEAVE (Phase W)</span>
                <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-mono">
                  Session 4 • Summative Assessment &amp; Reflection
                </span>
              </div>
              <div className="p-3 space-y-2 text-[11.5px]">
                <div>
                  <strong className="text-stone-900 font-sans">1. Abstraction &amp; Generalization:</strong>
                  <p className="text-stone-700 pl-2 mt-0.5">
                    {matrix.learningExperience[3]?.flow?.explain?.synthesisQuestions.join(' ') ||
                      'Learners formulate holistic generalizations connecting lessons learned to daily life and future career pathways.'}
                  </p>
                </div>
                <div>
                  <strong className="text-stone-900 font-sans">2. Evaluating Learning:</strong>
                  <p className="text-stone-700 pl-2 mt-0.5">
                    {matrix.assessment[3]?.formativeTask ||
                      'Administer 4-day summative assessment, record mastery levels, and facilitate values reflection journals.'}
                  </p>
                </div>
                <div className="bg-amber-50/70 p-2 rounded border border-amber-200 text-amber-950">
                  <strong className="font-sans text-[11px] block">Aligned Learning Activity:</strong>
                  <span>LAS 4 (Summative Mastery Assessment &amp; Metacognitive Reflection)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== SECTION IV: COMBINED LEARNING ACTIVITY SHEETS (LAS 1-4) ==================== */}
        <div className="space-y-4 mb-6 pt-4 border-t-2 border-stone-900">
          <div className="bg-[#002776] text-white px-3 py-1.5 font-sans font-bold text-xs uppercase tracking-wide flex items-center justify-between">
            <span>IV. COMBINED LEARNING ACTIVITY SHEETS (LAS 1–4)</span>
            <span className="text-[10px] text-amber-300 font-mono">Individual &amp; Group Tasks</span>
          </div>

          {/* LAS Render Loop */}
          <div className="space-y-6">
            {activitySheets.map((las, idx) => {
              const isGroupTask = idx === 2 && (activityMode === 'group' || activityMode === 'mixed');
              const dayLabel = `DAY ${idx + 1}`;

              return (
                <div key={idx} className="border border-stone-400 p-4 rounded-lg bg-stone-50/50 space-y-3 text-xs">
                  {/* LAS Header */}
                  <div className="border-b border-stone-300 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-sans font-bold uppercase text-blue-900 block">
                        {dayLabel} LEARNING ACTIVITY SHEET (LAS #{idx + 1})
                      </span>
                      <h4 className="font-sans font-bold text-stone-900 text-sm">
                        {las.activityTitle || `Activity ${idx + 1}: ${header.lesson}`}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-sans font-bold uppercase ${
                        isGroupTask ? 'bg-purple-100 text-purple-900' : 'bg-blue-100 text-blue-900'
                      }`}>
                        {isGroupTask ? '👥 Group Collaborative Task' : '👤 Individual Task'}
                      </span>
                      <span className="text-[10px] font-mono text-stone-500">
                        {header.learningArea}
                      </span>
                    </div>
                  </div>

                  {/* Student Credentials Block */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] font-sans bg-white p-2 border border-stone-200 rounded">
                    <div>
                      <span className="text-stone-500">Learner / Group Name:</span>
                      <div className="border-b border-stone-400 mt-1 h-4"></div>
                    </div>
                    <div>
                      <span className="text-stone-500">Grade &amp; Section:</span>
                      <div className="border-b border-stone-400 mt-1 h-4"></div>
                    </div>
                    <div>
                      <span className="text-stone-500">Date:</span>
                      <div className="border-b border-stone-400 mt-1 h-4"></div>
                    </div>
                  </div>

                  {/* Background Information */}
                  <div>
                    <strong className="font-sans text-[11px] uppercase text-stone-900 block">
                      I. Background Information for Learners:
                    </strong>
                    <p className="text-stone-700 text-justify text-[11px] mt-0.5 leading-relaxed">
                      {las.instruction ||
                        'This learning activity sheet provides structured exercises to strengthen your mastery of the essential learning competency in line with DepEd standards.'}
                    </p>
                  </div>

                  {/* Learning Competency */}
                  <div className="bg-white p-2 rounded border border-stone-200 text-[10.5px]">
                    <strong>Learning Competency:</strong> {matrix.competency.melc}
                  </div>

                  {/* Part A: Group / Individual Task Prompt */}
                  <div className="bg-white p-3 rounded border border-stone-200 space-y-1.5">
                    <span className="font-sans font-bold text-blue-950 text-[11px] block">
                      Part A: {las.partAGroup?.title || 'Exploration & Concept Execution'}
                    </span>
                    <p className="text-stone-700 text-[11px]">
                      {las.partAGroup?.scenarioOrPrompt || 'Execute the core problem analysis using the provided guidelines.'}
                    </p>
                    <div className="border border-dashed border-stone-300 rounded p-2 h-16 bg-stone-50/50 flex items-center justify-center text-[10px] text-stone-400 font-sans">
                      [Student / Group Output Response Space]
                    </div>
                  </div>

                  {/* Part B: Individual Task Prompt */}
                  <div className="bg-white p-3 rounded border border-stone-200 space-y-1.5">
                    <span className="font-sans font-bold text-blue-950 text-[11px] block">
                      Part B: {las.partBIndividual?.title || 'Individual Synthesis & Metacognition'}
                    </span>
                    <p className="text-stone-700 text-[11px]">
                      {las.partBIndividual?.taskPrompt || 'Reflect on the key lessons learned and explain practical career connections.'}
                    </p>
                    <div className="border border-dashed border-stone-300 rounded p-2 h-14 bg-stone-50/50 flex items-center justify-center text-[10px] text-stone-400 font-sans">
                      [Individual Reflection Space]
                    </div>
                  </div>

                  {/* Rubric / Scoring Guide */}
                  <div className="pt-2">
                    <strong className="font-sans text-[10.5px] uppercase text-stone-700 block mb-1">
                      Scoring Guide &amp; Performance Rubric:
                    </strong>
                    <div className="border border-stone-300 rounded text-[10px] font-sans overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-stone-200 text-stone-900 border-b border-stone-300">
                            <th className="p-1.5">Criteria</th>
                            <th className="p-1.5">Exemplary (4 pts)</th>
                            <th className="p-1.5">Proficient (3 pts)</th>
                            <th className="p-1.5">Developing (2 pts)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200 bg-white">
                          {las.rubric?.criteria?.map((crit, cIdx) => (
                            <tr key={cIdx}>
                              <td className="p-1.5 font-bold">{crit.criterion}</td>
                              <td className="p-1.5">{crit.exemplary4}</td>
                              <td className="p-1.5">{crit.proficient3}</td>
                              <td className="p-1.5">{crit.developing2}</td>
                            </tr>
                          )) || (
                            <tr>
                              <td className="p-1.5 font-bold">Accuracy &amp; Completion</td>
                              <td className="p-1.5">Complete and thorough</td>
                              <td className="p-1.5">Accurate with minor omissions</td>
                              <td className="p-1.5">Basic completion</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================== SECTION V: TEACHER'S REFLECTION & REMARKS ==================== */}
        <div className="space-y-3 pt-2 border-t-2 border-stone-900 text-xs">
          <div className="bg-[#002776] text-white px-3 py-1.5 font-sans font-bold text-xs uppercase tracking-wide">
            V. TEACHER'S REFLECTION &amp; REMARKS
          </div>

          <div className="border border-stone-300 rounded p-3 bg-stone-50 space-y-2 text-[11px] font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <span className="font-bold text-stone-700">A. Number of learners who earned 80% on evaluation:</span>
                <div className="border-b border-stone-400 mt-1 h-4"></div>
              </div>
              <div>
                <span className="font-bold text-stone-700">B. Number of learners requiring remediation:</span>
                <div className="border-b border-stone-400 mt-1 h-4"></div>
              </div>
            </div>

            <div>
              <span className="font-bold text-stone-700">C. Which of my teaching strategies worked well? Why did these work?</span>
              <div className="border-b border-stone-400 mt-1 h-5"></div>
            </div>
          </div>
        </div>

        {/* Signatures Footer */}
        <div className="pt-8 border-t border-stone-300 grid grid-cols-2 gap-8 text-xs font-sans">
          <div className="space-y-8">
            <div>
              <p className="text-[10px] text-stone-500 uppercase">Prepared by:</p>
              <div className="pt-6 border-b border-stone-800 w-48 font-bold text-blue-950">
                {header.teacher}
              </div>
              <p className="text-[10px] text-stone-600">Teacher / Master Implementer</p>
            </div>
          </div>

          <div className="space-y-8 text-right flex flex-col items-end">
            <div>
              <p className="text-[10px] text-stone-500 uppercase">Checked &amp; Verified by:</p>
              <div className="pt-6 border-b border-stone-800 w-48 font-bold text-stone-900 text-center">
                {header.contentEvaluator || 'SCHOOL PRINCIPAL / PSDS'}
              </div>
              <p className="text-[10px] text-stone-600">School Head / District Supervisor</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
