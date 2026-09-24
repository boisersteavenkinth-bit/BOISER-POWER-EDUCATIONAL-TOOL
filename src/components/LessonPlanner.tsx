import React, { useState, useEffect } from 'react';
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
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Edit3,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Save,
  RotateCcw,
  ShieldCheck,
  FileCode,
  Calendar,
  User,
  School,
  List,
  CheckSquare,
  HelpCircle,
  Share2
} from 'lucide-react';
import { CompetencyRecord, WeeklyLessonPlan, WeeklyDayPlan } from '../types';
import {
  exportWeeklyPlanToPdf,
  exportWeeklyPlanToDocx,
  exportWeeklyPlanToXlsx
} from '../utils/weeklyPlanExporter';

interface LessonPlannerProps {
  competencies: CompetencyRecord[];
  selectedCompetency: CompetencyRecord | null;
  onSelectCompetency: (comp: CompetencyRecord) => void;
  onSendToCanva: (comp: CompetencyRecord) => void;
}

type StepType = 'input' | 'generate' | 'preview' | 'edit' | 'validate' | 'export';

const DRAFT_STORAGE_KEY = 'boiser_weekly_lesson_plan_draft_v1';

export const LessonPlanner: React.FC<LessonPlannerProps> = ({
  competencies,
  selectedCompetency,
  onSelectCompetency,
  onSendToCanva
}) => {
  // Current Workflow Step
  const [currentStep, setCurrentStep] = useState<StepType>('input');

  // Input Form State
  const [gradeLevel, setGradeLevel] = useState<string>('Grade 11');
  const [subject, setSubject] = useState<string>('General Mathematics');
  const [quarter, setQuarter] = useState<string>('Quarter 1');
  const [weekNumber, setWeekNumber] = useState<string>('Week 3');
  const [schoolYear, setSchoolYear] = useState<string>('2026–2027');
  const [dateRange, setDateRange] = useState<string>('Jun 16–20, 2026');
  const [topic, setTopic] = useState<string>('Functions and Piece-wise Mathematical Modeling');
  const [schoolName, setSchoolName] = useState<string>('LNNCHS (Lanao del Norte National Comprehensive High School)');
  const [teacherName, setTeacherName] = useState<string>('STEAVEN KINTH D. BOISER');
  const [numDays, setNumDays] = useState<number>(5);
  const [resourcesInput, setResourcesInput] = useState<string>('DepEd Learner Material p. 12–28, slide decks, graphing software, realia');
  const [specialInstructions, setSpecialInstructions] = useState<string>('Emphasize contextual Philippine word problems and collaborative group discovery.');

  // Selected Competency (from official database or custom)
  const [activeComp, setActiveComp] = useState<CompetencyRecord | null>(
    selectedCompetency || (competencies.length > 0 ? competencies[0] : null)
  );

  // Sync if prop changes
  useEffect(() => {
    if (selectedCompetency) {
      setActiveComp(selectedCompetency);
      setGradeLevel(selectedCompetency.grade_level === 'Kindergarten' ? 'Kindergarten' : `Grade ${selectedCompetency.grade_level}`);
      setSubject(selectedCompetency.subject_title);
      setQuarter(`Quarter ${selectedCompetency.term}`);
      setWeekNumber(`Week ${selectedCompetency.week}`);
      setTopic(`${selectedCompetency.subject_title}: ${selectedCompetency.learning_competency.slice(0, 50)}`);
    }
  }, [selectedCompetency]);

  // Master Weekly Lesson Plan Data State
  const [workingPlan, setWorkingPlan] = useState<WeeklyLessonPlan | null>(null);

  // UI state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [showRegenConfirmModal, setShowRegenConfirmModal] = useState<boolean>(false);
  const [activeEditDayTab, setActiveEditDayTab] = useState<number>(0); // 0 = Mon, 1 = Tue, etc.
  const [draftSavedToast, setDraftSavedToast] = useState<boolean>(false);
  const [validationResults, setValidationResults] = useState<{
    isValid: boolean;
    issues: string[];
  }>({ isValid: false, issues: [] });

  // Load Saved Draft on mount if available
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed && parsed.days && parsed.days.length > 0) {
          setWorkingPlan(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not load weekly plan draft', e);
    }
  }, []);

  // 1. GENERATE PLAN CALL
  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    setGenerationProgress(20);
    setCurrentStep('generate');

    try {
      const compStatement = activeComp ? activeComp.learning_competency : topic;

      setGenerationProgress(50);
      const res = await fetch('/api/generate-weekly-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gradeLevel,
          subject,
          quarter,
          weekNumber,
          schoolYear,
          dateRange,
          topic,
          competency: compStatement,
          specialInstructions,
          schoolName,
          teacherName
        })
      });

      setGenerationProgress(80);
      const data = await res.json();

      if (data.success && data.data) {
        setWorkingPlan(data.data);
        setGenerationProgress(100);
        setTimeout(() => {
          setIsGenerating(false);
          // Automatically navigate to PREVIEW screen according to Master Prompt!
          setCurrentStep('preview');
        }, 600);
      } else {
        alert(data.error || 'Failed to generate weekly lesson plan.');
        setIsGenerating(false);
        setCurrentStep('input');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to lesson generator backend.');
      setIsGenerating(false);
      setCurrentStep('input');
    }
  };

  // 2. SAVE DRAFT
  const handleSaveDraft = () => {
    if (!workingPlan) return;
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(workingPlan));
      setDraftSavedToast(true);
      setTimeout(() => setDraftSavedToast(false), 3000);
    } catch (e) {
      console.warn('Could not save draft', e);
    }
  };

  // 3. EDIT UPDATERS (Strictly Editable Requirements)
  const updateWorkingPlanHeader = (field: keyof WeeklyLessonPlan, value: any) => {
    if (!workingPlan) return;
    setWorkingPlan((prev) => {
      if (!prev) return null;
      const curVer = prev.version || 'v1.0';
      return {
        ...prev,
        [field]: value,
        version: curVer.includes('Teacher Edited') ? curVer : `${curVer.split('—')[0]} — Teacher Edited`,
        lastModified: new Date().toLocaleString('en-PH'),
        validationStatus: { isValidated: false, issues: [] }
      };
    });
  };

  const updateDayPlanField = (dayIdx: number, field: keyof WeeklyDayPlan, value: any) => {
    if (!workingPlan) return;
    setWorkingPlan((prev) => {
      if (!prev) return null;
      const curVer = prev.version || 'v1.0';
      const updatedDays = [...(prev.days || [])];
      if (updatedDays[dayIdx]) {
        updatedDays[dayIdx] = {
          ...updatedDays[dayIdx],
          [field]: value
        };
      }
      return {
        ...prev,
        days: updatedDays,
        version: curVer.includes('Teacher Edited') ? curVer : `${curVer.split('—')[0]} — Teacher Edited`,
        lastModified: new Date().toLocaleString('en-PH'),
        validationStatus: { isValidated: false, issues: [] }
      };
    });
  };

  const updateObjectiveItem = (dayIdx: number, objIdx: number, text: string) => {
    if (!workingPlan) return;
    setWorkingPlan((prev) => {
      if (!prev) return null;
      const curVer = prev.version || 'v1.0';
      const updatedDays = [...(prev.days || [])];
      if (!updatedDays[dayIdx]) return prev;
      const updatedObjs = [...(updatedDays[dayIdx].learningObjectives || [])];
      updatedObjs[objIdx] = text;
      updatedDays[dayIdx] = { ...updatedDays[dayIdx], learningObjectives: updatedObjs };
      return {
        ...prev,
        days: updatedDays,
        version: curVer.includes('Teacher Edited') ? curVer : `${curVer.split('—')[0]} — Teacher Edited`,
        validationStatus: { isValidated: false, issues: [] }
      };
    });
  };

  const addObjectiveItem = (dayIdx: number) => {
    if (!workingPlan) return;
    setWorkingPlan((prev) => {
      if (!prev) return null;
      const curVer = prev.version || 'v1.0';
      const updatedDays = [...(prev.days || [])];
      if (!updatedDays[dayIdx]) return prev;
      const updatedObjs = [...(updatedDays[dayIdx].learningObjectives || []), 'New specific learning objective'];
      updatedDays[dayIdx] = { ...updatedDays[dayIdx], learningObjectives: updatedObjs };
      return {
        ...prev,
        days: updatedDays,
        version: curVer.includes('Teacher Edited') ? curVer : `${curVer.split('—')[0]} — Teacher Edited`,
        validationStatus: { isValidated: false, issues: [] }
      };
    });
  };

  const removeObjectiveItem = (dayIdx: number, objIdx: number) => {
    if (!workingPlan) return;
    setWorkingPlan((prev) => {
      if (!prev) return null;
      const curVer = prev.version || 'v1.0';
      const updatedDays = [...(prev.days || [])];
      if (!updatedDays[dayIdx]) return prev;
      const updatedObjs = (updatedDays[dayIdx].learningObjectives || []).filter((_, i) => i !== objIdx);
      updatedDays[dayIdx] = { ...updatedDays[dayIdx], learningObjectives: updatedObjs };
      return {
        ...prev,
        days: updatedDays,
        version: curVer.includes('Teacher Edited') ? curVer : `${curVer.split('—')[0]} — Teacher Edited`,
        validationStatus: { isValidated: false, issues: [] }
      };
    });
  // Procedure step reordering / editing
  const updateProcedureStep = (dayIdx: number, stepIdx: number, field: string, text: string) => {
    if (!workingPlan) return;
    setWorkingPlan((prev) => {
      if (!prev) return null;
      const curVer = prev.version || 'v1.0';
      const updatedDays = [...(prev.days || [])];
      if (!updatedDays[dayIdx]) return prev;
      const updatedProcedures = [...(updatedDays[dayIdx].procedures || [])];
      if (!updatedProcedures[stepIdx]) return prev;
      updatedProcedures[stepIdx] = {
        ...updatedProcedures[stepIdx],
        [field]: text
      };
      updatedDays[dayIdx] = { ...updatedDays[dayIdx], procedures: updatedProcedures };
      return {
        ...prev,
        days: updatedDays,
        version: curVer.includes('Teacher Edited') ? curVer : `${curVer.split('—')[0]} — Teacher Edited`,
        validationStatus: { isValidated: false, issues: [] }
      };
    });
  };

  const addProcedureStep = (dayIdx: number) => {
    if (!workingPlan) return;
    setWorkingPlan((prev) => {
      if (!prev) return null;
      const curVer = prev.version || 'v1.0';
      const updatedDays = [...(prev.days || [])];
      if (!updatedDays[dayIdx]) return prev;
      const curProcs = updatedDays[dayIdx].procedures || [];
      const nextLetter = String.fromCharCode(65 + curProcs.length);
      const newStep = {
        id: `step-${Date.now()}`,
        stepLetter: nextLetter,
        stepTitle: 'Additional Pedagogical Procedure',
        description: 'Detail the teacher-guided or learner-centered activity here.'
      };
      updatedDays[dayIdx] = {
        ...updatedDays[dayIdx],
        procedures: [...curProcs, newStep]
      };
      return {
        ...prev,
        days: updatedDays,
        version: curVer.includes('Teacher Edited') ? curVer : `${curVer.split('—')[0]} — Teacher Edited`,
        validationStatus: { isValidated: false, issues: [] }
      };
    });
  };

  const removeProcedureStep = (dayIdx: number, stepIdx: number) => {
    if (!workingPlan) return;
    setWorkingPlan((prev) => {
      if (!prev) return null;
      const curVer = prev.version || 'v1.0';
      const updatedDays = [...(prev.days || [])];
      if (!updatedDays[dayIdx]) return prev;
      const updatedProcedures = (updatedDays[dayIdx].procedures || []).filter((_: any, i: number) => i !== stepIdx);
      updatedDays[dayIdx] = { ...updatedDays[dayIdx], procedures: updatedProcedures };
      return {
        ...prev,
        days: updatedDays,
        version: curVer.includes('Teacher Edited') ? curVer : `${curVer.split('—')[0]} — Teacher Edited`,
        validationStatus: { isValidated: false, issues: [] }
      };
    });
  };

  const moveProcedureStep = (dayIdx: number, stepIdx: number, direction: 'up' | 'down') => {
    if (!workingPlan || !workingPlan.days || !workingPlan.days[dayIdx]) return;
    const procs = workingPlan.days[dayIdx].procedures || [];
    const targetIdx = direction === 'up' ? stepIdx - 1 : stepIdx + 1;
    if (targetIdx < 0 || targetIdx >= procs.length) return;

    setWorkingPlan((prev) => {
      if (!prev) return null;
      const curVer = prev.version || 'v1.0';
      const updatedDays = [...(prev.days || [])];
      if (!updatedDays[dayIdx]) return prev;
      const procedures = [...(updatedDays[dayIdx].procedures || [])];
      const temp = procedures[stepIdx];
      procedures[stepIdx] = procedures[targetIdx];
      procedures[targetIdx] = temp;

      // Re-assign step letters
      const relettered = procedures.map((p: any, idx: number) => ({
        ...p,
        stepLetter: String.fromCharCode(65 + idx)
      }));

      updatedDays[dayIdx] = { ...updatedDays[dayIdx], procedures: relettered };
      return {
        ...prev,
        days: updatedDays,
        version: curVer.includes('Teacher Edited') ? curVer : `${curVer.split('—')[0]} — Teacher Edited`,
        validationStatus: { isValidated: false, issues: [] }
      };
    });
  };

  // 4. VALIDATION CHECK ENGINE
  const handleRunValidation = () => {
    if (!workingPlan) return;

    const issues: string[] = [];

    // Header validations
    if (!(workingPlan.schoolName || '').trim()) issues.push('Missing School Name in document header.');
    if (!(workingPlan.teacherName || '').trim()) issues.push('Missing Teacher Name in document header.');
    if (!(workingPlan.subject || '').trim()) issues.push('Missing Subject / Learning Area.');
    if (!(workingPlan.gradeLevel || '').trim()) issues.push('Missing Grade Level specification.');
    if (!(workingPlan.topic || '').trim()) issues.push('Missing Main Lesson Topic.');
    const comps = Array.isArray(workingPlan.competencies) ? workingPlan.competencies : (workingPlan.competencies ? [workingPlan.competencies] : []);
    if (comps.length === 0 || !(comps[0] || '').trim()) {
      issues.push('Missing Learning Competency statement.');
    }

    // Days check
    if (!workingPlan.days || workingPlan.days.length === 0) {
      issues.push('The weekly plan does not contain any instructional days.');
    } else {
      if (workingPlan.days.length < 5) {
        issues.push(`Weekly plan only has ${workingPlan.days.length} days (5 days required for full week).`);
      }

      workingPlan.days.forEach((day, idx) => {
        const dayLabel = day.dayName || `Day ${idx + 1}`;
        if (!day.learningObjectives || day.learningObjectives.length === 0 || day.learningObjectives.every((o) => !o.trim())) {
          issues.push(`${dayLabel}: Missing learning objectives.`);
        }
        if (!day.procedures || day.procedures.length === 0) {
          issues.push(`${dayLabel}: Missing procedures and activities section.`);
        } else {
          const emptyProcedures = day.procedures.filter((p: any) => !(p.description || '').trim());
          if (emptyProcedures.length > 0) {
            issues.push(`${dayLabel}: Has ${emptyProcedures.length} empty procedure step(s).`);
          }
        }
        if (!day.assessment || !day.assessment.trim()) {
          issues.push(`${dayLabel}: Missing evaluation or assessment task.`);
        }
      });
    }

    const isValid = issues.length === 0;
    setValidationResults({ isValid, issues });

    setWorkingPlan((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        validationStatus: {
          isValidated: isValid,
          issues,
          validatedAt: new Date().toLocaleString('en-PH')
        }
      };
    });

    setCurrentStep('validate');
  };

  // Regeneration Handler with Safety Modal
  const handleRegenerateWithSafety = () => {
    setShowRegenConfirmModal(true);
  };

  const handleConfirmRegeneration = () => {
    setShowRegenConfirmModal(false);
    handleGeneratePlan();
  };

  // Workflow Step Bar Steps
  const workflowSteps: { id: StepType; label: string; number: string }[] = [
    { id: 'input', label: 'Information', number: '①' },
    { id: 'generate', label: 'Generate', number: '②' },
    { id: 'preview', label: 'Preview', number: '③' },
    { id: 'edit', label: 'Edit Plan', number: '④' },
    { id: 'validate', label: 'Validate', number: '⑤' },
    { id: 'export', label: 'Export', number: '⑥' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#002776] via-[#0038A8] to-[#002070] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-[#FCD116]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DepEd SY 2026–2027 Master Generator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Editable One-Week Lesson Plan Generator
            </h1>
            <p className="text-sm text-blue-100">
              Generate a complete 5-day (Monday to Friday) lesson plan aligned with DepEd Order No. 009 & 015, s. 2026. Fully editable, validated, and exportable.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Teacher Decision Control</p>
              <p className="text-[11px] text-blue-100">AI draft → Preview → Edit → Validate → Export</p>
            </div>
          </div>
        </div>

        {/* Workflow Step Bar */}
        <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
          {workflowSteps.map((step) => {
            const isActive = currentStep === step.id;
            const isDone =
              (currentStep === 'generate' && step.id === 'input') ||
              (currentStep === 'preview' && (step.id === 'input' || step.id === 'generate')) ||
              (currentStep === 'edit' && (step.id === 'input' || step.id === 'generate' || step.id === 'preview')) ||
              (currentStep === 'validate' && (step.id === 'input' || step.id === 'generate' || step.id === 'preview' || step.id === 'edit')) ||
              (currentStep === 'export' && step.id !== 'export');

            const canClick = workingPlan && (step.id === 'preview' || step.id === 'edit' || step.id === 'validate' || step.id === 'export');

            return (
              <button
                key={step.id}
                disabled={!canClick && step.id !== 'input'}
                onClick={() => canClick && setCurrentStep(step.id)}
                className={`p-2.5 rounded-2xl transition flex flex-col items-center justify-center gap-1 ${
                  isActive
                    ? 'bg-[#FCD116] text-[#002776] font-extrabold shadow-md scale-102'
                    : isDone
                    ? 'bg-white/20 text-white font-semibold hover:bg-white/30 cursor-pointer'
                    : 'bg-white/5 text-stone-300 opacity-60'
                }`}
              >
                <span className="text-sm font-bold">{step.number}</span>
                <span className="text-[11px] uppercase tracking-wider">{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toast Notification */}
      {draftSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Lesson Plan Draft Saved to Local Device!</span>
        </div>
      )}

      {/* ========================================================================
          STEP 1: INPUT & ALIGNMENT FORM
         ======================================================================== */}
      {currentStep === 'input' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-stone-900">
                1. Curriculum & Lesson Plan Parameters
              </h2>
              <p className="text-xs text-stone-500">
                Select from the official DepEd competency database or enter custom topic parameters.
              </p>
            </div>
            {workingPlan && (
              <button
                onClick={() => setCurrentStep('preview')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 text-blue-600" />
                <span>Resume Active Plan ({workingPlan.version})</span>
              </button>
            )}
          </div>

          {/* Competency Picker from Connected Database */}
          <div className="space-y-3 p-5 rounded-2xl bg-blue-50/50 border border-blue-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-700" />
                Official Connected Competency Database
              </label>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                DepEd DO 009 & 015, s. 2026 Exact Text
              </span>
            </div>

            <div className="space-y-2">
              <select
                value={activeComp ? activeComp.id : ''}
                onChange={(e) => {
                  const found = competencies.find((c) => c.id === e.target.value);
                  if (found) {
                    setActiveComp(found);
                    onSelectCompetency(found);
                    setGradeLevel(found.grade_level === 'Kindergarten' ? 'Kindergarten' : `Grade ${found.grade_level}`);
                    setSubject(found.subject_title);
                    setQuarter(`Quarter ${found.term}`);
                    setWeekNumber(`Week ${found.week}`);
                    setTopic(`${found.subject_title}: ${found.learning_competency.slice(0, 50)}`);
                  }
                }}
                className="w-full p-3 rounded-xl border border-stone-300 bg-white text-xs font-medium text-stone-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                {competencies.map((comp) => (
                  <option key={comp.id} value={comp.id}>
                    [Grade {comp.grade_level} - {comp.subject_code}] {comp.learning_competency.slice(0, 90)}...
                  </option>
                ))}
              </select>

              {activeComp && (
                <div className="p-3.5 rounded-xl bg-white border border-blue-200 text-xs space-y-1 text-stone-800">
                  <div className="flex items-center justify-between font-bold text-blue-900">
                    <span>{activeComp.subject_title} ({activeComp.subject_code})</span>
                    <span className="text-[11px] font-mono text-stone-500">Code: {activeComp.competency_code || 'N/A'}</span>
                  </div>
                  <p className="italic text-stone-700">"{activeComp.learning_competency}"</p>
                  <div className="text-[10px] text-stone-500 pt-1 flex flex-wrap gap-2">
                    <span>Track: <strong>{activeComp.track || 'General'}</strong></span>
                    <span>•</span>
                    <span>Assessment Set: <strong>{activeComp.assessment_weight_set}</strong></span>
                    <span>•</span>
                    <span>Source: <strong>{activeComp.bow_source}</strong></span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-stone-700 block mb-1">School Name</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Teacher Name</label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Grade Level</label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                {['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Learning Area / Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Quarter / Term</label>
              <select
                value={quarter}
                onChange={(e) => setQuarter(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 bg-white font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="Quarter 1">Quarter 1 / Term 1</option>
                <option value="Quarter 2">Quarter 2 / Term 2</option>
                <option value="Quarter 3">Quarter 3 / Term 3</option>
                <option value="Quarter 4">Quarter 4 / Term 4</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Week Number & Dates</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={weekNumber}
                  onChange={(e) => setWeekNumber(e.target.value)}
                  placeholder="Week 3"
                  className="w-1/2 p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
                <input
                  type="text"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  placeholder="Jun 16-20, 2026"
                  className="w-1/2 p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1 text-xs">Main Lesson Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Available Learning Resources</label>
              <textarea
                rows={2}
                value={resourcesInput}
                onChange={(e) => setResourcesInput(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Special Instructions / Pedagogical Focus</label>
              <textarea
                rows={2}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-4">
            <p className="text-xs text-stone-500">
              Generates Monday–Friday coherent sequence. Will open <strong>Preview Screen</strong> automatically.
            </p>

            <button
              onClick={handleGeneratePlan}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white font-extrabold text-sm shadow-lg shadow-blue-900/20 flex items-center gap-2 cursor-pointer transition"
            >
              <Sparkles className="w-5 h-5 text-[#FCD116]" />
              <span>Generate 1-Week Lesson Plan</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================
          STEP 2: GENERATION LOADING SCREEN
         ======================================================================== */}
      {currentStep === 'generate' && (
        <div className="bg-white rounded-3xl p-12 border border-stone-200 shadow-sm text-center space-y-6 max-w-xl mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 mx-auto flex items-center justify-center animate-spin">
            <Sparkles className="w-8 h-8 text-blue-700" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-stone-900">
              Generating 5-Day Weekly Lesson Plan...
            </h2>
            <p className="text-xs text-stone-500">
              Constructing Monday to Friday pedagogical progression, 10-step DepEd procedures, and formative assessments.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden border border-stone-200">
            <div
              className="bg-blue-600 h-full transition-all duration-500 ease-out"
              style={{ width: `${generationProgress}%` }}
            />
          </div>

          <p className="text-xs text-blue-800 font-bold">
            Next: Automatic redirection to PREVIEW screen
          </p>
        </div>
      )}

      {/* ========================================================================
          STEP 3: PREVIEW SCREEN (Resembles Final Printable Document)
         ======================================================================== */}
      {currentStep === 'preview' && workingPlan && (
        <div className="space-y-6">
          {/* Action Control Header */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-extrabold text-xs">
                {workingPlan.version}
              </span>
              <span className="text-xs text-stone-500">Last Modified: {workingPlan.lastModified}</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setCurrentStep('input')}
                className="px-3.5 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Input</span>
              </button>

              <button
                onClick={handleRegenerateWithSafety}
                className="px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Regenerate</span>
              </button>

              <button
                onClick={handleSaveDraft}
                className="px-3.5 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-4 h-4 text-stone-600" />
                <span>Save Draft</span>
              </button>

              {/* PRIMARY EDIT BUTTON */}
              <button
                onClick={() => setCurrentStep('edit')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-600/20"
              >
                <Edit3 className="w-4 h-4" />
                <span>EDIT LESSON PLAN</span>
              </button>

              <button
                onClick={handleRunValidation}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>VALIDATE & EXPORT</span>
              </button>
            </div>
          </div>

          {/* DOCUMENT PREVIEW CONTAINER */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-300 shadow-xl space-y-8 font-sans">
            {/* Header Document Banner */}
            <div className="text-center space-y-1 border-b-2 border-blue-900 pb-4">
              <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">
                REPUBLIC OF THE PHILIPPINES • DEPARTMENT OF EDUCATION
              </p>
              <h2 className="text-xl sm:text-2xl font-black text-[#002776]">
                WEEKLY LESSON LOG / ONE-WEEK LESSON PLAN
              </h2>
              <p className="text-xs font-bold text-stone-600">
                SY {workingPlan.schoolYear} • DepEd Order No. 009, s. 2026 & DO 015, s. 2026 Aligned
              </p>
            </div>

            {/* Metadata Summary Table */}
            <div className="border border-stone-300 rounded-2xl overflow-hidden text-xs bg-stone-50/50">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-300">
                <div className="p-4 space-y-1.5">
                  <p><strong>School:</strong> {workingPlan.schoolName}</p>
                  <p><strong>Teacher:</strong> {workingPlan.teacherName}</p>
                  <p><strong>Grade Level:</strong> {workingPlan.gradeLevel}</p>
                  <p><strong>Subject / Learning Area:</strong> {workingPlan.subject}</p>
                </div>
                <div className="p-4 space-y-1.5">
                  <p><strong>Quarter / Term:</strong> {workingPlan.quarter}</p>
                  <p><strong>Week & Dates:</strong> {workingPlan.weekNumber} ({workingPlan.dateRange})</p>
                  <p><strong>Topic:</strong> {workingPlan.topic}</p>
                  <p><strong>Competencies:</strong> {Array.isArray(workingPlan.competencies) ? workingPlan.competencies.join('; ') : (workingPlan.competencies || '')}</p>
                </div>
              </div>
            </div>

            {/* 5-Day Weekly Content Sections */}
            <div className="space-y-8">
              {(workingPlan.days || []).map((day, idx) => (
                <div key={idx} className="border border-stone-200 rounded-2xl p-6 bg-stone-50/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-blue-200 pb-3">
                    <h3 className="text-base font-extrabold text-[#002776] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-700 text-white flex items-center justify-center text-xs">
                        {idx + 1}
                      </span>
                      <span>{(day.dayName || 'Day').toUpperCase()} ({day.date || 'Instructional Day'})</span>
                    </h3>

                    <button
                      onClick={() => {
                        setActiveEditDayTab(idx);
                        setCurrentStep('edit');
                      }}
                      className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit {day.dayName}</span>
                    </button>
                  </div>

                  {/* Objectives */}
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-stone-900 block uppercase tracking-wider text-[11px] text-blue-900">
                      I. Specific Learning Objectives
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-stone-800 pl-2">
                      {(day.learningObjectives || []).map((obj: string, i: number) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Content & Resources */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-3 rounded-xl border border-stone-200">
                    <div>
                      <span className="font-bold text-stone-700 block">Focus Topic:</span>
                      <p className="text-stone-900 font-medium">{day.contentTopic || workingPlan.topic}</p>
                    </div>
                    <div>
                      <span className="font-bold text-stone-700 block">Learning Resources:</span>
                      <p className="text-stone-700">{day.learningResources?.references || ''}</p>
                      <p className="text-stone-500 text-[11px]">{day.learningResources?.otherResources || ''}</p>
                    </div>
                  </div>

                  {/* Procedures */}
                  <div className="space-y-2 text-xs">
                    <span className="font-bold text-stone-900 block uppercase tracking-wider text-[11px] text-blue-900">
                      II. Instructional Procedures & Activities
                    </span>

                    <div className="space-y-2 pl-2">
                      {(day.procedures || []).map((p: any, i: number) => (
                        <div key={i} className="flex items-start gap-2 text-stone-800">
                          <span className="font-bold text-blue-800 shrink-0">{p.stepLetter}. {p.stepTitle}:</span>
                          <span>{p.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Evaluation & Remarks */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-stone-200">
                    <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200">
                      <span className="font-bold text-amber-900 block text-[11px] uppercase">Evaluation / Assessment:</span>
                      <p className="text-amber-950 font-medium">{day.assessment}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-100 border border-stone-200">
                      <span className="font-bold text-stone-800 block text-[11px] uppercase">Assignment & Remarks:</span>
                      <p className="text-stone-700">{day.assignmentEnrichment || 'N/A'}</p>
                      <p className="text-stone-500 text-[11px] italic mt-1">{day.remarks}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================
          STEP 4: EDITABLE FORM (Strict Non-Locked Master Editor)
         ======================================================================== */}
      {currentStep === 'edit' && workingPlan && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-stone-900">
                  Interactive Lesson Plan Editor
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs">
                  {workingPlan.version}
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Every field is fully editable. Add/delete sections, reorder activities, or update competencies.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setCurrentStep('preview')}
                className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold transition cursor-pointer"
              >
                Preview Plan
              </button>

              <button
                onClick={handleSaveDraft}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition cursor-pointer flex items-center gap-1"
              >
                <Save className="w-4 h-4 text-stone-700" />
                <span>Save Draft</span>
              </button>

              <button
                onClick={handleRunValidation}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Run Validation</span>
              </button>
            </div>
          </div>

          {/* Editable Header Meta Section */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 text-xs">
            <h3 className="font-extrabold text-stone-800 text-sm">Header Metadata</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="font-bold text-stone-600 block mb-1">School Name</label>
                <input
                  type="text"
                  value={workingPlan.schoolName}
                  onChange={(e) => updateWorkingPlanHeader('schoolName', e.target.value)}
                  className="w-full p-2 rounded-xl border border-stone-300 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-600 block mb-1">Teacher Name</label>
                <input
                  type="text"
                  value={workingPlan.teacherName}
                  onChange={(e) => updateWorkingPlanHeader('teacherName', e.target.value)}
                  className="w-full p-2 rounded-xl border border-stone-300 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-600 block mb-1">Grade Level</label>
                <input
                  type="text"
                  value={workingPlan.gradeLevel}
                  onChange={(e) => updateWorkingPlanHeader('gradeLevel', e.target.value)}
                  className="w-full p-2 rounded-xl border border-stone-300 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-600 block mb-1">Subject / Learning Area</label>
                <input
                  type="text"
                  value={workingPlan.subject}
                  onChange={(e) => updateWorkingPlanHeader('subject', e.target.value)}
                  className="w-full p-2 rounded-xl border border-stone-300 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-600 block mb-1">Quarter / Term</label>
                <input
                  type="text"
                  value={workingPlan.quarter}
                  onChange={(e) => updateWorkingPlanHeader('quarter', e.target.value)}
                  className="w-full p-2 rounded-xl border border-stone-300 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-600 block mb-1">Week Number</label>
                <input
                  type="text"
                  value={workingPlan.weekNumber}
                  onChange={(e) => updateWorkingPlanHeader('weekNumber', e.target.value)}
                  className="w-full p-2 rounded-xl border border-stone-300 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-600 block mb-1">Date Range</label>
                <input
                  type="text"
                  value={workingPlan.dateRange}
                  onChange={(e) => updateWorkingPlanHeader('dateRange', e.target.value)}
                  className="w-full p-2 rounded-xl border border-stone-300 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-600 block mb-1">School Year</label>
                <input
                  type="text"
                  value={workingPlan.schoolYear}
                  onChange={(e) => updateWorkingPlanHeader('schoolYear', e.target.value)}
                  className="w-full p-2 rounded-xl border border-stone-300 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-600 block mb-1">Main Topic</label>
              <input
                type="text"
                value={workingPlan.topic}
                onChange={(e) => updateWorkingPlanHeader('topic', e.target.value)}
                className="w-full p-2 rounded-xl border border-stone-300 bg-white"
              />
            </div>
          </div>

          {/* Daily Editor Tabs */}
          <div className="space-y-4">
            <div className="flex border-b border-stone-200 overflow-x-auto gap-2 pb-1">
              {workingPlan.days.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveEditDayTab(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    activeEditDayTab === idx
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {day.dayName} Editor
                </button>
              ))}
            </div>

            {/* Active Day Editor Card */}
            {workingPlan.days[activeEditDayTab] && (
              <div className="p-6 rounded-3xl border-2 border-blue-200 bg-blue-50/10 space-y-6">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <h3 className="font-extrabold text-blue-900 text-base">
                    Editing {workingPlan.days[activeEditDayTab].dayName} Plan
                  </h3>
                  <span className="text-xs text-stone-500 font-medium">Day {activeEditDayTab + 1} of 5</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Day Name</label>
                    <input
                      type="text"
                      value={workingPlan.days[activeEditDayTab].dayName}
                      onChange={(e) => updateDayPlanField(activeEditDayTab, 'dayName', e.target.value)}
                      className="w-full p-2 rounded-xl border border-stone-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Date</label>
                    <input
                      type="text"
                      value={workingPlan.days[activeEditDayTab]?.date || ''}
                      onChange={(e) => updateDayPlanField(activeEditDayTab, 'date', e.target.value)}
                      className="w-full p-2 rounded-xl border border-stone-300 bg-white"
                    />
                  </div>
                </div>

                {/* Objectives Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-extrabold text-stone-800 text-xs uppercase tracking-wider">
                      Specific Learning Objectives
                    </label>
                    <button
                      onClick={() => addObjectiveItem(activeEditDayTab)}
                      className="flex items-center gap-1 text-xs text-blue-700 hover:text-blue-900 font-bold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Objective</span>
                    </button>
                  </div>

                  {(workingPlan.days[activeEditDayTab]?.learningObjectives || []).map((obj: string, oIdx: number) => (
                    <div key={oIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={obj}
                        onChange={(e) => updateObjectiveItem(activeEditDayTab, oIdx, e.target.value)}
                        className="w-full p-2 rounded-xl border border-stone-300 bg-white text-xs"
                      />
                      <button
                        onClick={() => removeObjectiveItem(activeEditDayTab, oIdx)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Resources */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">References / BOW Citations</label>
                    <input
                      type="text"
                      value={workingPlan.days[activeEditDayTab]?.learningResources?.references || ''}
                      onChange={(e) =>
                        updateDayPlanField(activeEditDayTab, 'learningResources', {
                          ...workingPlan.days[activeEditDayTab]?.learningResources,
                          references: e.target.value
                        })
                      }
                      className="w-full p-2 rounded-xl border border-stone-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Other Materials / Slide Decks</label>
                    <input
                      type="text"
                      value={workingPlan.days[activeEditDayTab]?.learningResources?.otherResources || ''}
                      onChange={(e) =>
                        updateDayPlanField(activeEditDayTab, 'learningResources', {
                          ...workingPlan.days[activeEditDayTab]?.learningResources,
                          otherResources: e.target.value
                        })
                      }
                      className="w-full p-2 rounded-xl border border-stone-300 bg-white"
                    />
                  </div>
                </div>

                {/* Procedures Reordering & Editing */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-extrabold text-stone-800 text-xs uppercase tracking-wider">
                      Procedures & Activities (Rearrange, Add, Delete)
                    </label>
                    <button
                      onClick={() => addProcedureStep(activeEditDayTab)}
                      className="flex items-center gap-1 text-xs text-blue-700 hover:text-blue-900 font-bold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Procedure Step</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(workingPlan.days[activeEditDayTab]?.procedures || []).map((p: any, pIdx: number) => (
                      <div key={p.id || pIdx} className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-2 text-xs shadow-2xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 font-bold flex items-center justify-center">
                              {p.stepLetter}
                            </span>
                            <input
                              type="text"
                              value={p.stepTitle}
                              onChange={(e) => updateProcedureStep(activeEditDayTab, pIdx, 'stepTitle', e.target.value)}
                              className="font-bold text-stone-900 border-b border-stone-200 focus:outline-none focus:border-blue-600 px-1 py-0.5"
                            />
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              disabled={pIdx === 0}
                              onClick={() => moveProcedureStep(activeEditDayTab, pIdx, 'up')}
                              className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-30 cursor-pointer"
                              title="Move Step Up"
                            >
                              <MoveUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              disabled={pIdx === workingPlan.days[activeEditDayTab].procedures.length - 1}
                              onClick={() => moveProcedureStep(activeEditDayTab, pIdx, 'down')}
                              className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-30 cursor-pointer"
                              title="Move Step Down"
                            >
                              <MoveDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => removeProcedureStep(activeEditDayTab, pIdx)}
                              className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer"
                              title="Delete Step"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <textarea
                          rows={2}
                          value={p.description}
                          onChange={(e) => updateProcedureStep(activeEditDayTab, pIdx, 'description', e.target.value)}
                          className="w-full p-2 rounded-xl border border-stone-300 text-xs focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evaluation & Remarks Editing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Evaluation / Formative Assessment</label>
                    <textarea
                      rows={2}
                      value={workingPlan.days[activeEditDayTab].assessment}
                      onChange={(e) => updateDayPlanField(activeEditDayTab, 'assessment', e.target.value)}
                      className="w-full p-2 rounded-xl border border-stone-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Assignment / Remediation / Remarks</label>
                    <textarea
                      rows={2}
                      value={workingPlan.days[activeEditDayTab].remarks}
                      onChange={(e) => updateDayPlanField(activeEditDayTab, 'remarks', e.target.value)}
                      className="w-full p-2 rounded-xl border border-stone-300 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================
          STEP 5: VALIDATION SCREEN
         ======================================================================== */}
      {currentStep === 'validate' && workingPlan && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-stone-900">Document Validation Report</h2>
                <p className="text-xs text-stone-500">Automated quality & completeness health check</p>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep('edit')}
              className="px-3.5 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold transition cursor-pointer"
            >
              Return to Editor
            </button>
          </div>

          {/* Validation Status Block */}
          {!validationResults.isValid ? (
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-base">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>REVIEW REQUIRED</span>
              </div>
              <p className="text-xs text-amber-800 font-medium">
                ⚠️ Some parts of your lesson plan need attention before export. Please address the following flagged items:
              </p>

              <ul className="space-y-1.5 text-xs text-amber-950 font-medium pl-2">
                {validationResults.issues.map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentStep('edit')}
                  className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition cursor-pointer"
                >
                  Fix Issues in Editor
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-4">
              <div className="flex items-center gap-2 text-emerald-900 font-black text-lg">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <span>READY TO EXPORT</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-emerald-900 font-bold">
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-200">✓ 5 Days Completed</div>
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-200">✓ Content Reviewed</div>
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-200">✓ Editable Version Saved</div>
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-200">✓ Validation Passed</div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setCurrentStep('export')}
                  className="px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-extrabold transition cursor-pointer flex items-center gap-2 shadow-lg shadow-emerald-900/20"
                >
                  <span>PROCEED TO EXPORT OPTIONS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================
          STEP 6: EXPORT OPTIONS SCREEN
         ======================================================================== */}
      {currentStep === 'export' && workingPlan && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl space-y-8 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 mx-auto flex items-center justify-center font-bold">
              <Download className="w-6 h-6 text-blue-700" />
            </div>
            <h2 className="text-2xl font-black text-stone-900">Export & Download Lesson Plan</h2>
            <p className="text-xs text-stone-500">
              Exporting final teacher-reviewed version: <strong>{workingPlan.version}</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* PDF Export */}
            <button
              onClick={() => exportWeeklyPlanToPdf(workingPlan)}
              className="p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/50 hover:bg-rose-100/60 transition text-left space-y-2 cursor-pointer group shadow-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
                PDF
              </div>
              <h3 className="font-extrabold text-stone-900 text-sm group-hover:text-rose-700">Download PDF</h3>
              <p className="text-[11px] text-stone-500">Print-ready document with official DepEd headers & layout.</p>
            </button>

            {/* Word (.docx) Export */}
            <button
              onClick={() => exportWeeklyPlanToDocx(workingPlan)}
              className="p-5 rounded-2xl border-2 border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 transition text-left space-y-2 cursor-pointer group shadow-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                DOCX
              </div>
              <h3 className="font-extrabold text-stone-900 text-sm group-hover:text-blue-700">Microsoft Word (.docx)</h3>
              <p className="text-[11px] text-stone-500">Editable Word document format for DepEd office submissions.</p>
            </button>

            {/* Excel (.xlsx) Export */}
            <button
              onClick={() => exportWeeklyPlanToXlsx(workingPlan)}
              className="p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 transition text-left space-y-2 cursor-pointer group shadow-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                XLSX
              </div>
              <h3 className="font-extrabold text-stone-900 text-sm group-hover:text-emerald-700">Excel (.xlsx)</h3>
              <p className="text-[11px] text-stone-500">Structured matrix spreadsheet for electronic school logs.</p>
            </button>
          </div>

          <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-stone-600" />
              <span>Print Directly</span>
            </button>

            <button
              onClick={() => setCurrentStep('preview')}
              className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition cursor-pointer"
            >
              Return to Document Preview
            </button>
          </div>
        </div>
      )}

      {/* Safety Regeneration Confirmation Modal */}
      {showRegenConfirmModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-stone-200 shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-amber-700 font-extrabold text-base">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              <span>Confirm Regeneration</span>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed">
              Regenerating may replace the current AI-generated content. Your manual teacher edits may be affected. Do you want to continue?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
              <button
                onClick={() => setShowRegenConfirmModal(false)}
                className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRegeneration}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition cursor-pointer"
              >
                Continue Regeneration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
};
