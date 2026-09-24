import React, { useState } from 'react';
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Download,
  Copy,
  Check,
  Sparkles,
  Printer,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Calendar,
  Layers,
  Award,
  BookOpen,
  Info,
  CheckCircle2,
  FileDown,
  Loader2,
  Pencil
} from 'lucide-react';
import { ILAWCompletePlan } from '../types/ilawDO3';

interface DO3ILAWViewProps {
  plan: ILAWCompletePlan;
  onExportDocx: () => void;
  onExportPptx: () => void;
  onExportPdf: () => void;
  onGenerateAI?: () => void;
  versionStatus?: 'AI Generated' | 'Teacher Edited';
  isGenerating?: boolean;
  isExportingDocx?: boolean;
  isExportingPptx?: boolean;
  isExportingPdf?: boolean;
  onUpdatePlan?: (updatedPlan: ILAWCompletePlan) => void;
}

export const DO3ILAWView: React.FC<DO3ILAWViewProps> = ({
  plan,
  onExportDocx,
  onExportPptx,
  onExportPdf,
  onGenerateAI,
  versionStatus = 'AI Generated',
  isGenerating = false,
  isExportingDocx = false,
  isExportingPptx = false,
  isExportingPdf = false,
  onUpdatePlan
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'las' | 'slides'>('matrix');
  const [activeSessionLAS, setActiveSessionLAS] = useState<number>(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [copiedText, setCopiedText] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlan, setEditedPlan] = useState<ILAWCompletePlan>(plan);

  React.useEffect(() => {
    setEditedPlan(plan);
  }, [plan]);

  const handleSave = () => {
    setIsEditing(false);
    if (onUpdatePlan) {
      onUpdatePlan(editedPlan);
    }
  };

  const updateHeaderField = (field: keyof typeof plan.header, value: any) => {
    setEditedPlan(prev => ({
      ...prev,
      header: {
        ...prev.header,
        [field]: value
      }
    }));
  };

  const updateMatrixField = (field: keyof typeof plan.matrix, value: any) => {
    setEditedPlan(prev => ({
      ...prev,
      matrix: {
        ...prev.matrix,
        [field]: value
      }
    }));
  };

  const updateCompetencyField = (field: keyof typeof plan.matrix.competency, value: any) => {
    setEditedPlan(prev => ({
      ...prev,
      matrix: {
        ...prev.matrix,
        competency: {
          ...prev.matrix.competency,
          [field]: value
        }
      }
    }));
  };

  const updateLearningExperienceField = (
    sessionIdx: number,
    section: 'preLesson' | 'flow' | 'meta',
    subsection: string,
    field: string,
    value: any
  ) => {
    setEditedPlan(prev => {
      const newExperience = [...prev.matrix.learningExperience];
      const targetExp = { ...newExperience[sessionIdx] };
      
      if (section === 'preLesson') {
        const pre = { ...targetExp.preLesson };
        const sub = { ...(pre as any)[subsection] };
        sub[field] = value;
        (pre as any)[subsection] = sub;
        targetExp.preLesson = pre;
      } else if (section === 'flow') {
        const fl = { ...targetExp.flow };
        if (subsection === 'explore') {
          const sub = { ...fl.explore };
          if (field === 'groupActivity') {
            sub.groupActivity = { ...sub.groupActivity, title: value };
          } else if (field === 'individualOutput') {
            sub.individualOutput = { ...sub.individualOutput, title: value };
          } else {
            (sub as any)[field] = value;
          }
          fl.explore = sub;
        } else if (subsection === 'explain') {
          const sub = { ...fl.explain };
          if (field === 'synthesisQuestions') {
            sub.synthesisQuestions = Array.isArray(value) ? value : value.split('\n').filter(Boolean);
          } else {
            (sub as any)[field] = value;
          }
          fl.explain = sub;
        }
      } else if (section === 'meta') {
        if (field === 'learningResources') {
          targetExp.learningResources = Array.isArray(value) ? value : value.split(',').map((s: string) => s.trim());
        }
      }
      
      newExperience[sessionIdx] = targetExp;
      return {
        ...prev,
        matrix: {
          ...prev.matrix,
          learningExperience: newExperience
        }
      };
    });
  };

  const { header, matrix, activitySheets, presentationSlides } = editedPlan;

  const handleCopyFullText = () => {
    let text = `REPUBLIC OF THE PHILIPPINES\nDEPARTMENT OF EDUCATION\n${header.region.toUpperCase()} • ${header.division.toUpperCase()}\n${header.school.toUpperCase()}\n\n`;
    text += `================================================================================\n`;
    text += `INSTRUCTIONAL LEADERSHIP AND ACADEMIC WORKFLOW (ILAW) — DEPED ORDER NO. 3, S. 2026\n`;
    text += `================================================================================\n\n`;
    text += `PART 1: HEADER INFORMATION\n`;
    text += `Lesson / Topic: ${header.lesson}\n`;
    text += `Learning Area: ${header.learningArea}\n`;
    text += `Teacher-Developer: ${header.teacher}\n`;
    text += `Evaluators: ${header.contentEvaluator} | ${header.languageEvaluator} | ${header.formatEvaluator}\n`;
    text += `School: ${header.school} (${header.division})\n`;
    text += `Grade & Section: ${header.gradeLevelAndSection} | Term ${header.term} • ${header.bowWeek}\n`;
    text += `Dates: ${header.inclusiveTeachingDates} | Sessions: ${header.numberOfSessions} (60 mins each)\n`;
    text += `References: ${header.references.join('; ')}\n`;
    text += `Declaration of AI Use: ${header.declarationOfAIUse}\n\n`;

    text += `PART 2: THE LESSON PLAN MATRIX\n`;
    text += `1. INTENTIONS: ${matrix.intentions}\n\n`;
    text += `2. LEARNING COMPETENCY & STANDARDS\n`;
    text += `MELC: ${matrix.competency.melc}\nContent Topic: ${matrix.competency.content}\nContent Standard: ${matrix.competency.contentStandard}\nPerformance Standard: ${matrix.competency.performanceStandard}\n\n`;

    text += `3. LEARNING OBJECTIVES\n`;
    matrix.objectives.forEach((obj) => {
      text += `Session ${obj.sessionNumber} (${obj.sessionDate}):\n${obj.objectives.map((o) => `  - ${o}`).join('\n')}\n`;
    });
    text += `\n4. LEARNER CONTEXT: ${matrix.learnerContext}\n\n`;

    text += `5. LEARNING EXPERIENCE TABLE\n`;
    matrix.learningExperience.forEach((exp) => {
      text += `[SESSION ${exp.sessionNumber}]\n`;
      text += `Engage (${exp.preLesson.engage.time}): ${exp.preLesson.engage.activity}\n`;
      text += `Elicit (${exp.preLesson.elicit.time}): ${exp.preLesson.elicit.activity}\n`;
      text += `Explore (${exp.flow.explore.time}): Group: ${exp.flow.explore.groupActivity.title} | Indiv: ${exp.flow.explore.individualOutput.title}\n`;
      text += `Explain (${exp.flow.explain.time}): Questions: ${exp.flow.explain.synthesisQuestions.join(' / ')}\n\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    });
  };

  const curSheet = activitySheets[activeSessionLAS] || activitySheets[0];
  const curSlide = presentationSlides[activeSlideIndex] || presentationSlides[0];

  return (
    <div className="space-y-6">
      {/* Action Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4 no-print">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-3 py-0.5 rounded-full bg-[#002776] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FCD116]" />
                DepEd Order No. 3, s. 2026 Standard
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                Term {header.term} • {header.bowWeek}
              </span>
              {versionStatus === 'Teacher Edited' ? (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1 shadow-2xs">
                  <Pencil className="w-3 h-3 text-amber-700" />
                  <span>Version: Teacher Edited</span>
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#002776] border border-blue-300 text-xs font-bold flex items-center gap-1 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-[#0038A8]" />
                  <span>Version: AI Generated</span>
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#002776]">
              {header.lesson}
            </h3>
            <p className="text-xs text-stone-600">
              {header.learningArea} • {header.gradeLevelAndSection} • Teacher {header.teacher}
            </p>
          </div>

          {/* Export & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {onGenerateAI && (
              <button
                onClick={onGenerateAI}
                disabled={isGenerating}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
                title="Regenerate this 4-part ILAW plan using Gemini 2.5 and DepEd Curriculum Standards Engine"
              >
                {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-[#FCD116]" />}
                <span>{isGenerating ? 'Generating...' : 'AI Generate Plan'}</span>
              </button>
            )}

            <button
              onClick={onExportDocx}
              disabled={isExportingDocx}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#002776] hover:bg-[#001c54] text-white text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
              title="Download official Microsoft Word document (.docx) with all tables, LAS, and rubrics"
            >
              {isExportingDocx ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5 text-[#FCD116]" />}
              <span>{isExportingDocx ? 'Exporting Word...' : 'Export Word (.docx)'}</span>
            </button>

            <button
              onClick={onExportPptx}
              disabled={isExportingPptx}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
              title="Download companion PowerPoint presentation (.pptx) with >= 35pt body text for classroom projection"
            >
              {isExportingPptx ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Presentation className="w-3.5 h-3.5 text-amber-300" />}
              <span>{isExportingPptx ? 'Exporting Slides...' : 'Export Slides (.pptx)'}</span>
            </button>

            <button
              onClick={onExportPdf}
              disabled={isExportingPdf}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
              title="Export high-fidelity DepEd Order No. 3 PDF document with official seal, tables, and signatures"
            >
              {isExportingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileDown className="w-3.5 h-3.5" />}
              <span>{isExportingPdf ? 'Exporting PDF...' : 'Export PDF'}</span>
            </button>

            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
                isEditing 
                  ? 'bg-amber-600 hover:bg-amber-700 text-white animate-pulse' 
                  : 'bg-stone-800 hover:bg-stone-900 text-white'
              }`}
              title={isEditing ? "Save changes to this plan" : "Edit fields of this plan"}
            >
              <Pencil className="w-3.5 h-3.5 text-[#FCD116]" />
              <span>{isEditing ? 'Save Changes' : 'Edit Plan'}</span>
            </button>

            <button
              onClick={handleCopyFullText}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition cursor-pointer"
              title="Copy formatted ILAW text"
            >
              {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedText ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print A4</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'matrix'
                ? 'bg-[#002776] text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <FileText className="w-4 h-4 text-[#FCD116]" />
            <span>Part 1 &amp; 2: Header &amp; Lesson Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('las')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'las'
                ? 'bg-[#002776] text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-[#FCD116]" />
            <span>Part 3: Learning Activity Sheets (LAS 1–4)</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold">
              {activitySheets.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('slides')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'slides'
                ? 'bg-[#002776] text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Presentation className="w-4 h-4 text-[#FCD116]" />
            <span>Part 4: Lesson Proper Presentation (PPT)</span>
            <span className="px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-900 text-[10px] font-bold">
              {presentationSlides.length} Slides • ≥35pt
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PART 1 HEADER & PART 2 LESSON PLAN MATRIX                         */}
      {/* ========================================================================= */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          {/* Visual Document Canvas */}
          <div className="bg-white rounded-none p-6 sm:p-12 border border-stone-300 shadow-md space-y-6 text-stone-900 mx-auto max-w-5xl">
            {/* DepEd & LNNCHS Official Dual-Logo Header Bar */}
            <div className="pb-4 border-b-2 border-stone-800 space-y-2">
              <div className="flex items-center justify-between gap-4">
                {/* Left: DepEd Seal */}
                <div className="w-20 sm:w-24 shrink-0 flex items-center justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-xs opacity-75" />
                    <img
                      src="/deped-logo.png"
                      alt="DepEd Seal"
                      referrerPolicy="no-referrer"
                      className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#FCD116] bg-white p-1 object-contain shadow-md scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const fallback = document.createElement('div');
                          fallback.className = "w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-900 border-2 border-[#FCD116] flex flex-col items-center justify-center text-white p-1 text-center shadow-xs";
                          fallback.innerHTML = '<span class="text-[9px] font-bold uppercase leading-tight">DepEd</span><span class="text-[7px] text-amber-200 uppercase font-mono">Official</span>';
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Center: Official Title Block */}
                <div className="text-center flex-1 space-y-0.5">
                  <p className="text-[11px] uppercase tracking-widest text-stone-600 font-sans font-semibold">
                    Republic of the Philippines
                  </p>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#002776] font-serif">
                    DEPARTMENT OF EDUCATION
                  </h2>
                  <p className="text-xs uppercase tracking-wide text-stone-700 font-sans font-medium">
                    {header.region} • {header.division}
                  </p>
                  <p className="text-sm sm:text-base font-bold text-[#002776] font-sans">
                    {header.school}
                  </p>
                  {header.address && (
                    <p className="text-[10px] text-stone-500 font-sans">
                      {header.address}
                    </p>
                  )}
                </div>

                {/* Right: LNNCHS Rooster Emblem */}
                <div className="w-20 sm:w-24 shrink-0 flex items-center justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full blur-xs opacity-75 animate-pulse" />
                    <img
                      src="/lnnchs-logo.png"
                      alt="LNNCHS Emblem"
                      referrerPolicy="no-referrer"
                      className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#002776] bg-white p-1 object-contain shadow-md scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const fallback = document.createElement('div');
                          fallback.className = "w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-400 border-2 border-[#002776] flex flex-col items-center justify-center text-[#002776] p-1 text-center shadow-xs";
                          fallback.innerHTML = '<span class="text-[8px] font-black uppercase leading-tight">LNNCHS</span><span class="text-[6px] font-bold uppercase">Roosters</span>';
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="text-center pt-2">
                <div className="inline-block px-4 py-1 bg-[#002776] text-white font-sans text-xs font-bold tracking-wider uppercase">
                  Instructional Leadership and Academic Workflow (ILAW)
                </div>
                <p className="text-[11px] text-stone-500 font-sans italic pt-1">
                  Compliant with DepEd Order No. 3, s. 2026 | Three-Term Calendar (DO 009, s. 2026)
                </p>
              </div>
            </div>

            {/* Official Sharp Solid Grid Table (DO3 Layout Structure) */}
            <div className="border-2 border-stone-800 bg-white text-stone-900 font-sans">
              {/* Row 1: Lesson */}
              <div className="flex flex-col md:flex-row border-b border-stone-800">
                <div className="md:w-[28%] bg-stone-100/80 p-3 font-bold text-xs text-stone-800 border-b md:border-b-0 md:border-r border-stone-800 flex flex-col justify-between">
                  <span>Lesson / Topic:</span>
                  <span className="text-[9px] text-stone-500 font-normal leading-tight hidden md:block">Name of the target lesson or subject matter.</span>
                </div>
                <div className="md:w-[72%] p-3.5 text-xs text-stone-900 leading-relaxed font-semibold">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedPlan.header.lesson}
                      onChange={(e) => updateHeaderField('lesson', e.target.value)}
                      className="w-full bg-amber-50 border border-amber-300 rounded p-1 text-xs font-sans font-normal"
                    />
                  ) : (
                    editedPlan.header.lesson
                  )}
                </div>
              </div>

              {/* Row 2: Learning Area/s */}
              <div className="flex flex-col md:flex-row border-b border-stone-800">
                <div className="md:w-[28%] bg-stone-100/80 p-3 font-bold text-xs text-stone-800 border-b md:border-b-0 md:border-r border-stone-800 flex flex-col justify-between">
                  <span>Learning Area/s:</span>
                  <span className="text-[9px] text-stone-500 font-normal leading-tight hidden md:block">Subject specialization field.</span>
                </div>
                <div className="md:w-[72%] p-3.5 text-xs text-stone-900 font-semibold">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedPlan.header.learningArea}
                      onChange={(e) => updateHeaderField('learningArea', e.target.value)}
                      className="w-full bg-amber-50 border border-amber-300 rounded p-1 text-xs font-sans font-normal"
                    />
                  ) : (
                    editedPlan.header.learningArea
                  )}
                </div>
              </div>

              {/* Row 3: Teacher-Developer */}
              <div className="flex flex-col md:flex-row border-b border-stone-800">
                <div className="md:w-[28%] bg-stone-100/80 p-3 font-bold text-xs text-stone-800 border-b md:border-b-0 md:border-r border-stone-800 flex flex-col justify-between">
                  <span>Teacher-Developer:</span>
                  <span className="text-[9px] text-stone-500 font-normal leading-tight hidden md:block">The primary teacher author.</span>
                </div>
                <div className="md:w-[72%] p-3.5 text-xs text-[#002776] font-bold uppercase tracking-wider">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedPlan.header.teacher}
                      onChange={(e) => updateHeaderField('teacher', e.target.value)}
                      className="w-full bg-amber-50 border border-amber-300 rounded p-1 text-xs font-sans font-normal"
                    />
                  ) : (
                    editedPlan.header.teacher
                  )}
                </div>
              </div>

              {/* Row 4: Grade Level & Section */}
              <div className="flex flex-col md:flex-row border-b border-stone-800">
                <div className="md:w-[28%] bg-stone-100/80 p-3 font-bold text-xs text-stone-800 border-b md:border-b-0 md:border-r border-stone-800 flex flex-col justify-between">
                  <span>Grade Level &amp; Section:</span>
                  <span className="text-[9px] text-stone-500 font-normal leading-tight hidden md:block">Target grade bracket.</span>
                </div>
                <div className="md:w-[72%] p-3.5 text-xs text-stone-900 font-semibold">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedPlan.header.gradeLevelAndSection}
                      onChange={(e) => updateHeaderField('gradeLevelAndSection', e.target.value)}
                      className="w-full bg-amber-50 border border-amber-300 rounded p-1 text-xs font-sans font-normal"
                    />
                  ) : (
                    editedPlan.header.gradeLevelAndSection
                  )}
                </div>
              </div>

              {/* Row 5: No. of Sessions */}
              <div className="flex flex-col md:flex-row border-b border-stone-800">
                <div className="md:w-[28%] bg-stone-100/80 p-3 font-bold text-xs text-stone-800 border-b md:border-b-0 md:border-r border-stone-800 flex flex-col justify-between">
                  <span>No. of Sessions:</span>
                  <span className="text-[9px] text-stone-500 font-normal leading-tight hidden md:block">Total instruction sessions.</span>
                </div>
                <div className="md:w-[72%] p-3.5 text-xs text-stone-900 font-semibold">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedPlan.header.numberOfSessions}
                      onChange={(e) => updateHeaderField('numberOfSessions', e.target.value)}
                      className="w-full bg-amber-50 border border-amber-300 rounded p-1 text-xs font-sans font-normal"
                    />
                  ) : (
                    `${editedPlan.header.numberOfSessions} Sessions (60 mins each)`
                  )}
                </div>
              </div>

              {/* Row 6: References */}
              <div className="flex flex-col md:flex-row border-b border-stone-800">
                <div className="md:w-[28%] bg-stone-100/80 p-3 font-bold text-xs text-stone-800 border-b md:border-b-0 md:border-r border-stone-800 flex flex-col justify-between">
                  <span>References:</span>
                  <span className="text-[9px] text-stone-500 font-normal leading-tight hidden md:block">Books, websites, toolkits, etc.</span>
                </div>
                <div className="md:w-[72%] p-3.5 text-xs text-stone-900 leading-relaxed">
                  {isEditing ? (
                    <textarea
                      value={editedPlan.header.references.join('; ')}
                      onChange={(e) => updateHeaderField('references', e.target.value.split(';').map(s => s.trim()))}
                      className="w-full bg-amber-50 border border-amber-300 rounded p-1 text-xs font-sans font-normal"
                      rows={2}
                    />
                  ) : (
                    <p className="text-stone-800">{editedPlan.header.references.join('; ')}</p>
                  )}
                </div>
              </div>

              {/* Row 7: Declaration of AI Use */}
              <div className="flex flex-col md:flex-row border-b border-stone-800">
                <div className="md:w-[28%] bg-stone-100/80 p-3 font-bold text-xs text-stone-800 border-b md:border-b-0 md:border-r border-stone-800 flex flex-col justify-between">
                  <span>Declaration of AI Use:</span>
                  <span className="text-[9px] text-stone-500 font-normal leading-tight hidden md:block">Cite how AI was used in the formulation of the lesson plan. See DO 3 s. 2026 Annex A.</span>
                </div>
                <div className="md:w-[72%] p-3.5 text-xs text-stone-700 italic leading-relaxed bg-blue-50/20">
                  {isEditing ? (
                    <textarea
                      value={editedPlan.header.declarationOfAIUse}
                      onChange={(e) => updateHeaderField('declarationOfAIUse', e.target.value)}
                      className="w-full bg-amber-50 border border-amber-300 rounded p-1 text-xs font-sans font-normal italic"
                      rows={3}
                    />
                  ) : (
                    editedPlan.header.declarationOfAIUse
                  )}
                </div>
              </div>

              {/* Row 8: Intentions */}
              <div className="flex flex-col md:flex-row border-b border-stone-800">
                <div className="md:w-[28%] bg-stone-100/80 p-3 font-bold text-xs text-stone-800 border-b md:border-b-0 md:border-r border-stone-800 flex flex-col justify-between">
                  <span>Intentions:</span>
                  <span className="text-[9px] text-stone-500 font-normal leading-tight hidden md:block">Meaningful learning experiences are anchored on how we frame them. Start by deciding what you want learners to learn or understand by the end of the lesson; keep it clear and simple. Remember: Understanding your learners' evolving context and designing it will help ensure that your lessons connect with and are relevant to them.</span>
                </div>
                <div className="md:w-[72%] p-3.5 text-xs text-stone-900 leading-relaxed whitespace-pre-line">
                  {isEditing ? (
                    <textarea
                      value={editedPlan.matrix.intentions}
                      onChange={(e) => updateMatrixField('intentions', e.target.value)}
                      className="w-full bg-amber-50 border border-amber-300 rounded p-1 text-xs font-sans font-normal"
                      rows={5}
                    />
                  ) : (
                    editedPlan.matrix.intentions
                  )}
                </div>
              </div>

              {/* Row 9: Learning Competency */}
              <div className="flex flex-col md:flex-row border-b border-stone-800">
                <div className="md:w-[28%] bg-stone-100/80 p-3 font-bold text-xs text-stone-800 border-b md:border-b-0 md:border-r border-stone-800 flex flex-col justify-between">
                  <span>Learning Competency:</span>
                  <span className="text-[9px] text-stone-500 font-normal leading-tight hidden md:block">Write the competencies from the curriculum that we are targeting, and the content or performance standards applicable to the sessions. Note: No Learning Competency (LC) should be taught in isolation.</span>
                </div>
                <div className="md:w-[72%] p-3.5 text-xs text-stone-900 space-y-3">
                  <div>
                    <strong className="text-[#002776] block mb-0.5 text-xs">Learning Competency (MELC):</strong>
                    {isEditing ? (
                      <textarea
                        value={editedPlan.matrix.competency.melc}
                        onChange={(e) => updateCompetencyField('melc', e.target.value)}
                        className="w-full bg-amber-50 border border-amber-300 rounded p-1 text-xs font-sans font-normal"
                        rows={2}
                      />
                    ) : (
                      <p className="text-stone-800">{editedPlan.matrix.competency.melc}</p>
                    )}
                  </div>

                  <div>
                    <strong className="text-stone-700 block mb-0.5 text-xs">Content Focus:</strong>
                    {isEditing ? (
                      <textarea
                        value={editedPlan.matrix.competency.content}
                        onChange={(e) => updateCompetencyField('content', e.target.value)}
                        className="w-full bg-amber-50 border border-amber-300 rounded p-1 text-xs font-sans font-normal"
                        rows={1}
                      />
                    ) : (
                      <p className="text-stone-800">{editedPlan.matrix.competency.content}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-2.5 bg-stone-50 border border-stone-200">
                      <strong className="text-stone-800 block mb-0.5 text-[11px]">Content Standard:</strong>
                      {isEditing ? (
                        <textarea
                          value={editedPlan.matrix.competency.contentStandard}
                          onChange={(e) => updateCompetencyField('contentStandard', e.target.value)}
                          className="w-full bg-amber-50 border border-amber-300 rounded p-1 text-[11px] font-sans font-normal"
                          rows={2}
                        />
                      ) : (
                        <p className="text-stone-700 text-[11px] leading-relaxed">{editedPlan.matrix.competency.contentStandard}</p>
                      )}
                    </div>

                    <div className="p-2.5 bg-stone-50 border border-stone-200">
                      <strong className="text-stone-800 block mb-0.5 text-[11px]">Performance Standard:</strong>
                      {isEditing ? (
                        <textarea
                          value={editedPlan.matrix.competency.performanceStandard}
                          onChange={(e) => updateCompetencyField('performanceStandard', e.target.value)}
                          className="w-full bg-amber-50 border border-amber-300 rounded p-1 text-[11px] font-sans font-normal"
                          rows={2}
                        />
                      ) : (
                        <p className="text-stone-700 text-[11px] leading-relaxed">{editedPlan.matrix.competency.performanceStandard}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 10: Learning Objectives */}
              <div className="flex flex-col md:flex-row border-b border-stone-800">
                <div className="md:w-[28%] bg-stone-100/80 p-3 font-bold text-xs text-stone-800 border-b md:border-b-0 md:border-r border-stone-800 flex flex-col justify-between">
                  <span>Learning Objectives:</span>
                  <span className="text-[9px] text-stone-500 font-normal leading-tight hidden md:block">Write the smaller knowledge, skills, or tasks from the competency that the learners will work on and be able to show by the end of the sessions.</span>
                </div>
                <div className="md:w-[72%] grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-400 text-xs">
                  {editedPlan.matrix.objectives.map((obj, oIdx) => (
                    <div key={obj.sessionNumber} className="p-2.5 space-y-2">
                      <div className="font-bold border-b border-stone-300 pb-1 text-[#002776] flex flex-col items-start justify-between">
                        <span className="text-[11px]">Sesyon {obj.sessionNumber}</span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={obj.sessionDate}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditedPlan(prev => {
                                const newObj = [...prev.matrix.objectives];
                                const targetIdx = newObj.findIndex(o => o.sessionNumber === obj.sessionNumber);
                                if (targetIdx !== -1) {
                                  newObj[targetIdx] = { ...newObj[targetIdx], sessionDate: val };
                                }
                                return { ...prev, matrix: { ...prev.matrix, objectives: newObj } };
                              });
                            }}
                            className="bg-amber-50 border border-amber-300 rounded px-1 py-0.5 text-[10px] w-full mt-1"
                          />
                        ) : (
                          <span className="text-[10px] text-stone-500 font-normal">{obj.sessionDate}</span>
                        )}
                      </div>

                      <div className="space-y-2.5 text-[11px]">
                        <div>
                          <strong className="text-[10px] text-stone-700 block uppercase tracking-wider">Kaalaman (Knowledge):</strong>
                          {isEditing ? (
                            <textarea
                              value={obj.objectives[0] || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setEditedPlan(prev => {
                                  const newObj = [...prev.matrix.objectives];
                                  const idx = newObj.findIndex(o => o.sessionNumber === obj.sessionNumber);
                                  if (idx !== -1) {
                                    const currentArr = [...newObj[idx].objectives];
                                    currentArr[0] = val;
                                    newObj[idx] = { ...newObj[idx], objectives: currentArr };
                                  }
                                  return { ...prev, matrix: { ...prev.matrix, objectives: newObj } };
                                });
                              }}
                              className="w-full bg-amber-50 border border-amber-300 rounded p-1 text-[10px] font-normal"
                              rows={3}
                            />
                          ) : (
                            <p className="leading-relaxed text-stone-900">{obj.objectives[0] || 'N/A'}</p>
                          )}
                        </div>

                        <div>
                          <strong className="text-[10px] text-stone-700 block uppercase tracking-wider">Kasanayan (Skills):</strong>
                          {isEditing ? (
                            <textarea
                              value={obj.objectives[1] || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setEditedPlan(prev => {
                                  const newObj = [...prev.matrix.objectives];
                                  const idx = newObj.findIndex(o => o.sessionNumber === obj.sessionNumber);
                                  if (idx !== -1) {
                                    const currentArr = [...newObj[idx].objectives];
                                    currentArr[1] = val;
                                    newObj[idx] = { ...newObj[idx], objectives: currentArr };
                                  }
                                  return { ...prev, matrix: { ...prev.matrix, objectives: newObj } };
                                });
                              }}
                              className="w-full bg-amber-50 border border-amber-300 rounded p-1 text-[10px] font-normal"
                              rows={3}
                            />
                          ) : (
                            <p className="leading-relaxed text-stone-900">{obj.objectives[1] || 'N/A'}</p>
                          )}
                        </div>

                        <div>
                          <strong className="text-[10px] text-stone-700 block uppercase tracking-wider">Asal/Saloobin (Attitude):</strong>
                          {isEditing ? (
                            <textarea
                              value={obj.objectives[2] || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setEditedPlan(prev => {
                                  const newObj = [...prev.matrix.objectives];
                                  const idx = newObj.findIndex(o => o.sessionNumber === obj.sessionNumber);
                                  if (idx !== -1) {
                                    const currentArr = [...newObj[idx].objectives];
                                    currentArr[2] = val;
                                    newObj[idx] = { ...newObj[idx], objectives: currentArr };
                                  }
                                  return { ...prev, matrix: { ...prev.matrix, objectives: newObj } };
                                });
                              }}
                              className="w-full bg-amber-50 border border-amber-300 rounded p-1 text-[10px] font-normal"
                              rows={3}
                            />
                          ) : (
                            <p className="leading-relaxed text-stone-900">{obj.objectives[2] || 'N/A'}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 11: Learner Context */}
              <div className="flex flex-col md:flex-row">
                <div className="md:w-[28%] bg-stone-100/80 p-3 font-bold text-xs text-stone-800 border-b md:border-b-0 md:border-r border-stone-800 flex flex-col justify-between">
                  <span>Learner Context:</span>
                  <span className="text-[9px] text-stone-500 font-normal leading-tight hidden md:block">Write your observations of your learners' profile, including special education needs, indigenous learners, giftedness, or other localized backgrounds.</span>
                </div>
                <div className="md:w-[72%] p-3.5 text-xs text-stone-900 leading-relaxed whitespace-pre-line font-semibold">
                  {isEditing ? (
                    <textarea
                      value={editedPlan.matrix.learnerContext}
                      onChange={(e) => updateMatrixField('learnerContext', e.target.value)}
                      className="w-full bg-amber-50 border border-amber-300 rounded p-1 text-xs font-sans font-normal"
                      rows={5}
                    />
                  ) : (
                    editedPlan.matrix.learnerContext
                  )}
                </div>
              </div>
            </div>

            {/* Preparation and Signatures Grid */}
            <div className="pt-6 border-t border-stone-300 text-xs text-stone-600">
              <span className="font-bold text-stone-800 block mb-2">Quality Assurance &amp; Evaluator Sign-off:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center font-sans">
                <div className="p-3 bg-stone-50 border border-stone-300">
                  <div className="h-10" />
                  <strong className="text-xs text-[#002776] block uppercase underline">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedPlan.header.contentEvaluator}
                        onChange={(e) => updateHeaderField('contentEvaluator', e.target.value)}
                        className="bg-amber-50 border border-amber-300 rounded px-1.5 py-0.5 text-center text-[10px] w-full font-normal"
                      />
                    ) : (
                      editedPlan.header.contentEvaluator
                    )}
                  </strong>
                  <span className="text-[10px] text-stone-500 block">Content Quality Evaluator</span>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-300">
                  <div className="h-10" />
                  <strong className="text-xs text-[#002776] block uppercase underline">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedPlan.header.languageEvaluator}
                        onChange={(e) => updateHeaderField('languageEvaluator', e.target.value)}
                        className="bg-amber-50 border border-amber-300 rounded px-1.5 py-0.5 text-center text-[10px] w-full font-normal"
                      />
                    ) : (
                      editedPlan.header.languageEvaluator
                    )}
                  </strong>
                  <span className="text-[10px] text-stone-500 block">Language &amp; Spelling Evaluator</span>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-300">
                  <div className="h-10" />
                  <strong className="text-xs text-[#002776] block uppercase underline">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedPlan.header.formatEvaluator}
                        onChange={(e) => updateHeaderField('formatEvaluator', e.target.value)}
                        className="bg-amber-50 border border-amber-300 rounded px-1.5 py-0.5 text-center text-[10px] w-full font-normal"
                      />
                    ) : (
                      editedPlan.header.formatEvaluator
                    )}
                  </strong>
                  <span className="text-[10px] text-stone-500 block">Formatting &amp; Standards Evaluator</span>
                </div>
              </div>
            </div>

            {/* Preparation, Checked, and Noted Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-300 text-xs text-center font-sans">
              <div className="p-4 bg-stone-50 border border-stone-300 space-y-2">
                <span className="text-[10px] font-bold text-stone-500 uppercase block">Prepared by:</span>
                <div className="h-10" />
                <strong className="text-xs text-[#002776] block uppercase underline">
                  {header.teacher}
                </strong>
                <span className="text-[10px] text-stone-600 block">Teacher-Developer / LNNCHS</span>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-300 space-y-2">
                <span className="text-[10px] font-bold text-stone-500 uppercase block">Reviewed &amp; Verified:</span>
                <div className="h-10" />
                <strong className="text-xs text-[#002776] block uppercase underline">
                  MASTER TEACHER / HEAD TEACHER
                </strong>
                <span className="text-[10px] text-stone-600 block">Department Head, SHS Curriculum</span>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-300 space-y-2">
                <span className="text-[10px] font-bold text-stone-500 uppercase block">Noted by:</span>
                <div className="h-10" />
                <strong className="text-xs text-[#002776] block uppercase underline">
                  SECONDARY SCHOOL PRINCIPAL IV
                </strong>
                <span className="text-[10px] text-stone-600 block">School Head / LNNCHS</span>
              </div>
            </div>

            {/* LNNCHS Official Document Footer */}
            <div className="mt-6 pt-4 border-t-2 border-stone-800 font-sans text-center text-[10px] text-stone-600 space-y-1">
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-semibold text-[#002776]">
                <span>{header.school}</span>
                <span>•</span>
                <span>{header.address || 'Barangay Santo Niño, Tubod, Lanao del Norte'}</span>
                <span>•</span>
                <span>Tel: {header.telephone || '(063) 223-1452'}</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-3 text-stone-500">
                <span>Email: {header.email || 'lnnchs.shs@deped.gov.ph'}</span>
                <span>•</span>
                <span>Web: {header.website || 'https://depedlanaodelnorte.gov.ph/lnnchs'}</span>
                <span>•</span>
                <span className="font-bold text-emerald-800">DepEd Order No. 3, s. 2026 Compliant</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PART 3 LEARNING ACTIVITY SHEETS (LAS 1–4)                         */}
      {/* ========================================================================= */}
      {activeTab === 'las' && (
        <div className="space-y-6">
          {/* Session Switcher Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <span className="text-xs font-bold text-stone-700">
              Select Session Activity Sheet:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {activitySheets.map((sheet, idx) => (
                <button
                  key={sheet.sessionNumber}
                  onClick={() => setActiveSessionLAS(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    activeSessionLAS === idx
                      ? 'bg-[#002776] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Session {sheet.sessionNumber}</span>
                </button>
              ))}
            </div>
          </div>

          {/* LAS Document Preview */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-300 shadow-sm space-y-6 font-serif text-stone-900">
            {/* Header */}
            <div className="border-b-2 border-stone-300 pb-4 text-center space-y-2">
              <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
                <img src="/deped-logo.png" alt="DepEd" className="w-10 h-10 object-contain rounded-full border border-[#FCD116] p-0.5 bg-white shadow-2xs" />
                <div className="flex-1">
                  <p className="text-[9px] uppercase tracking-wider text-stone-600 font-sans font-bold">
                    Republic of the Philippines
                  </p>
                  <p className="text-xs uppercase tracking-wider text-stone-600 font-sans font-black">
                    Department of Education
                  </p>
                  <p className="text-[10px] text-stone-500 font-sans font-medium">
                    {header.region} • {header.division}
                  </p>
                </div>
                <img src="/lnnchs-logo.png" alt="LNNCHS" className="w-10 h-10 object-contain rounded-full border border-[#002776] p-0.5 bg-white shadow-2xs" />
              </div>
              <h3 className="text-base sm:text-lg font-bold font-sans text-[#002776] pt-1 uppercase">
                LEARNING ACTIVITY SHEET (LAS) — SESSION {curSheet.sessionNumber}
              </h3>
              <p className="text-[10px] font-sans text-stone-500 font-bold">
                {header.school} • DepEd Order No. 3, s. 2026 Compliant
              </p>
            </div>

            {/* Student Metadata Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-stone-50 rounded-xl border border-stone-300 font-sans text-xs">
              <div>Name of Learner: _________________________________________</div>
              <div>Grade &amp; Section: <strong>{header.gradeLevelAndSection}</strong></div>
              <div>Learning Area: <strong>{header.learningArea}</strong></div>
              <div>Date: <strong>{curSheet.sessionDate}</strong></div>
            </div>

            {/* Title & Objectives */}
            <div className="space-y-2">
              <h4 className="text-base sm:text-lg font-bold text-[#002776]">
                {curSheet.activityTitle}
              </h4>

              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200 font-sans text-xs space-y-1">
                <strong className="text-[#002776]">Learning Objectives:</strong>
                <ul className="list-disc list-inside space-y-0.5 text-stone-800">
                  {curSheet.objectives.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>

              <div className="font-sans text-xs text-stone-700">
                <strong className="text-stone-900">Materials: </strong>
                {curSheet.materials.join(', ')}
              </div>

              <div className="font-sans text-xs text-stone-700">
                <strong className="text-stone-900">Instruction: </strong>
                {curSheet.instruction}
              </div>
            </div>

            {/* Part A: Group / Collaborative Activity */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-300 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <h5 className="text-sm font-bold font-sans text-[#002776]">
                  {curSheet.partAGroup.title}
                </h5>
                <span className="text-[11px] font-sans px-2 py-0.5 bg-blue-100 text-blue-900 rounded-md font-semibold">
                  {curSheet.partAGroup.formatType}
                </span>
              </div>

              <p className="text-xs leading-relaxed text-stone-800">
                {curSheet.partAGroup.scenarioOrPrompt}
              </p>

              {/* Table Data if present */}
              {curSheet.partAGroup.tableData && (
                <div className="overflow-x-auto border border-stone-300 rounded-xl">
                  <table className="w-full text-xs font-sans text-left">
                    <thead className="bg-[#002776] text-white">
                      <tr>
                        {curSheet.partAGroup.tableData.headers.map((h, hi) => (
                          <th key={hi} className="p-2 border-r border-blue-800 last:border-r-0">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 bg-white">
                      {curSheet.partAGroup.tableData.rows.map((row, ri) => (
                        <tr key={ri} className="hover:bg-stone-50">
                          {row.map((cell, ci) => (
                            <td key={ci} className="p-2 border-r border-stone-200 last:border-r-0">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Guiding Questions with blank response lines */}
              <div className="space-y-2 font-sans text-xs">
                <strong className="text-[#002776] block">Guiding Questions &amp; Group Analysis:</strong>
                {curSheet.partAGroup.guidingQuestions.map((q, qi) => (
                  <div key={qi} className="space-y-1">
                    <p className="text-stone-800 font-medium">{q}</p>
                    <div className="space-y-1.5 pt-1">
                      <div className="h-4 border-b border-stone-300" />
                      <div className="h-4 border-b border-stone-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Part B: Individual Written Output */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-300 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <h5 className="text-sm font-bold font-sans text-[#002776]">
                  {curSheet.partBIndividual.title}
                </h5>
                <span className="text-[11px] font-sans px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded-md font-semibold">
                  {curSheet.partBIndividual.outputType}
                </span>
              </div>

              <p className="text-xs leading-relaxed text-stone-800">
                {curSheet.partBIndividual.taskPrompt}
              </p>

              {/* Analysis / Synthesis Challenge */}
              <div className="space-y-2 font-sans text-xs">
                <strong className="text-[#002776] block">Synthesis Challenge:</strong>
                {curSheet.partBIndividual.analysisChallenge.map((ac, ci) => (
                  <div key={ci} className="space-y-1">
                    <p className="text-stone-800 font-medium">{ac}</p>
                    <div className="space-y-1.5 pt-1">
                      <div className="h-4 border-b border-stone-300" />
                      <div className="h-4 border-b border-stone-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Standalone Answer Key (Teacher Only Alert) */}
            <div className="p-4 bg-red-50/70 border-2 border-red-300 rounded-2xl space-y-2 font-sans text-xs">
              <div className="flex items-center gap-2 text-red-900 font-bold">
                <Info className="w-4 h-4 text-red-700" />
                <span>ANSWER KEY — For Teacher Use Only (Not to be distributed with learner worksheet)</span>
              </div>
              <div className="space-y-1.5 text-stone-800 text-[11px] bg-white p-3 rounded-xl border border-red-200">
                <div>
                  <strong className="text-red-900">Part A Expected Answers / Sample Model: </strong>
                  <ul className="list-disc list-inside">
                    {curSheet.answerKey.partAAnswers.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-1 border-t border-red-100">
                  <strong className="text-red-900">Part B Expected Answers / Key Indicators: </strong>
                  <ul className="list-disc list-inside">
                    {curSheet.answerKey.partBAnswers.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Analytic Rubric (4-Point Scale) */}
            <div className="space-y-2 font-sans text-xs">
              <strong className="text-[#002776] block text-sm">
                Analytic Rubric (4-Point Performance Scale):
              </strong>
              <div className="overflow-x-auto border border-stone-300 rounded-xl">
                <table className="w-full text-[11px] text-left">
                  <thead className="bg-[#002776] text-white">
                    <tr>
                      <th className="p-2.5 w-1/5">Criterion</th>
                      <th className="p-2.5 w-1/5">Exemplary (4)</th>
                      <th className="p-2.5 w-1/5">Proficient (3)</th>
                      <th className="p-2.5 w-1/5">Developing (2)</th>
                      <th className="p-2.5 w-1/5">Beginning (1)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 bg-white">
                    {curSheet.rubric.criteria.map((crit, ci) => (
                      <tr key={ci} className="hover:bg-stone-50">
                        <td className="p-2.5 font-bold text-[#002776] bg-stone-50/50">{crit.criterion}</td>
                        <td className="p-2.5 text-stone-800">{crit.exemplary4}</td>
                        <td className="p-2.5 text-stone-800">{crit.proficient3}</td>
                        <td className="p-2.5 text-stone-800">{crit.developing2}</td>
                        <td className="p-2.5 text-stone-800">{crit.beginning1}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notes for Use */}
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl font-sans text-[11px] text-amber-900 space-y-1">
              <strong className="block text-amber-950">Notes for Use &amp; Facilitation:</strong>
              <ul className="list-disc list-inside space-y-0.5">
                {curSheet.notesForUse.map((n, ni) => (
                  <li key={ni}>{n}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PART 4 LESSON PROPER PRESENTATION (PPT)                           */}
      {/* ========================================================================= */}
      {activeTab === 'slides' && (
        <div className="space-y-6">
          {/* Slide Deck Navigator */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-700">Slide Deck Navigator:</span>
              <span className="text-xs text-stone-500">
                Slide {activeSlideIndex + 1} of {presentationSlides.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeSlideIndex === 0}
                className="p-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveSlideIndex((prev) => Math.min(presentationSlides.length - 1, prev + 1))}
                disabled={activeSlideIndex === presentationSlides.length - 1}
                className="p-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExportPptx}
                disabled={isExportingPptx}
                className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .PPTX</span>
              </button>
            </div>
          </div>

          {/* High-Contrast Projection Card (Navy #0A1128, Gold #FCD116, Body text >= 35pt) */}
          <div className="bg-[#0A1128] text-white rounded-3xl p-8 sm:p-14 shadow-xl border-4 border-[#002776] space-y-6 min-h-[420px] flex flex-col justify-between">
            {/* Top Bar on Slide */}
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#CE1126] text-white text-xs font-bold tracking-wider uppercase">
                  {curSlide.badge || `SESSION ${curSlide.sessionNumber}`}
                </span>
                <span className="text-xs text-blue-200 font-sans">
                  {header.learningArea} • {header.gradeLevelAndSection}
                </span>
              </div>
              <span className="text-xs font-bold text-[#FCD116]">
                SLIDE {curSlide.slideNumber} / {presentationSlides.length}
              </span>
            </div>

            {/* Main Content Area */}
            <div className="space-y-4 my-auto">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FCD116] tracking-tight font-sans">
                {curSlide.title}
              </h2>

              {curSlide.subtitle && (
                <p className="text-base sm:text-xl text-blue-100 font-medium">
                  {curSlide.subtitle}
                </p>
              )}

              {/* Body Bullets (Strict >=35pt projection scale visual simulation) */}
              <div className="space-y-4 pt-3">
                {curSlide.bodyBullets.map((bullet, bi) => (
                  <div key={bi} className="flex items-start gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#FCD116] shrink-0 mt-2" />
                    <p className="text-xl sm:text-2xl font-bold text-white leading-snug">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Footer on Slide */}
            <div className="flex items-center justify-between border-t border-white/15 pt-3 text-xs text-blue-300 font-sans">
              <span>Teacher {header.teacher} • {header.school}</span>
              <span className="text-[11px] text-amber-300 font-semibold">
                Classroom Projection Ready (DO 3, s. 2026 Companion Deck)
              </span>
            </div>
          </div>

          {/* Speaker Notes Box */}
          {curSlide.speakerNotes && (
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
              <strong className="block font-bold text-amber-950 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-700" />
                Teacher Speaker Notes &amp; Facilitation Cues:
              </strong>
              <p className="italic text-stone-700 leading-relaxed font-serif">
                "{curSlide.speakerNotes}"
              </p>
            </div>
          )}

          {/* Slide Thumbnail Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {presentationSlides.map((slide, sidx) => (
              <button
                key={sidx}
                onClick={() => setActiveSlideIndex(sidx)}
                className={`p-3 rounded-xl text-left border transition cursor-pointer flex flex-col justify-between h-24 ${
                  activeSlideIndex === sidx
                    ? 'bg-[#002776] text-white border-amber-400 shadow-md ring-2 ring-amber-400'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                }`}
              >
                <span className="text-[10px] font-bold opacity-75">Slide {slide.slideNumber}</span>
                <span className="text-xs font-bold line-clamp-2 leading-tight">{slide.title}</span>
                <span className="text-[9px] opacity-60">Sess {slide.sessionNumber}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
