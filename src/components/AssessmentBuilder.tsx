import React, { useState } from 'react';
import {
  CheckSquare,
  Sparkles,
  Layers,
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  Award,
  RefreshCw,
  HelpCircle,
  Clock,
  BookOpen
} from 'lucide-react';
import { CompetencyRecord, AssessmentBlueprint } from '../types';

interface AssessmentBuilderProps {
  competencies: CompetencyRecord[];
  selectedCompetency: CompetencyRecord | null;
}

export const AssessmentBuilder: React.FC<AssessmentBuilderProps> = ({
  competencies,
  selectedCompetency,
}) => {
  const [activeComp, setActiveComp] = useState<CompetencyRecord>(
    selectedCompetency || competencies[0]
  );
  const [targetComponent, setTargetComponent] = useState<
    'Performance Tasks' | 'Written Works' | 'Summative Test / Term Exam'
  >('Performance Tasks');
  const [isGenerating, setIsGenerating] = useState(false);
  const [assessmentData, setAssessmentData] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (selectedCompetency) {
      setActiveComp(selectedCompetency);
    }
  }, [selectedCompetency]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          competency: activeComp,
          targetWeight: targetComponent,
          gradeLevel: activeComp.grade_level,
          term: activeComp.term
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setAssessmentData(data.data);
      } else {
        alert(data.error || 'Failed to generate assessment items.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to assessment generator.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!assessmentData) return;
    navigator.clipboard.writeText(JSON.stringify(assessmentData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              DepEd Assessment & Measurement
            </span>
            <span className="text-xs text-stone-500 font-medium">
              Table of Specifications (TOS) & Authentic Rubrics
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900">
            Assessment & TOS Generator (SY 2026–2027)
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-2xl">
            Directly aligns assessment items with DepEd component weights (Written Works, Performance Tasks, Summative Tests) and Cognitive Process Dimensions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Assessment'}</span>
          </button>
        </div>
      </div>

      {/* Selector & Setup */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Select Learning Competency
            </label>
            <select
              value={activeComp.id}
              onChange={(e) => {
                const found = competencies.find((c) => c.id === e.target.value);
                if (found) {
                  setActiveComp(found);
                  setAssessmentData(null);
                }
              }}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-medium text-stone-800"
            >
              {competencies.map((c) => (
                <option key={c.id} value={c.id}>
                  [{c.grade_level === 'Kindergarten' ? 'K' : `Gr ${c.grade_level}`} T{c.term}] {c.subject_title}: {c.learning_competency.slice(0, 75)}...
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Target Component (Weight Distribution)
            </label>
            <select
              value={targetComponent}
              onChange={(e: any) => setTargetComponent(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-medium text-stone-800"
            >
              <option value="Performance Tasks">Performance Tasks (45%–60%)</option>
              <option value="Written Works">Written Works (20%–35%)</option>
              <option value="Summative Test / Term Exam">Summative Test / Term Exam (20%–25%)</option>
            </select>
          </div>
        </div>

        {/* Selected Context Card */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-emerald-900 block">
              {activeComp.subject_title} • Term {activeComp.term}, Week {activeComp.week} ({activeComp.assessment_weight_set})
            </span>
            <p className="text-stone-800">
              "{activeComp.learning_competency}"
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:bg-emerald-400 text-white font-bold text-xs shadow-xs transition cursor-pointer shrink-0"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Designing Assessment...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Generate Test Items & Rubric</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Content View */}
      {assessmentData ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              {assessmentData.targetComponent || targetComponent}
            </span>
            <h3 className="text-xl font-bold font-display text-stone-900 mt-2">
              {assessmentData.title || 'DepEd Aligned Assessment Instrument'}
            </h3>
            {assessmentData.instructions && (
              <p className="text-xs text-stone-600 mt-1">
                <strong>Instructions:</strong> {assessmentData.instructions}
              </p>
            )}
          </div>

          {/* Items */}
          {assessmentData.items && assessmentData.items.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold uppercase text-stone-700 tracking-wider">
                Assessment Items / Tasks
              </h4>
              <div className="space-y-3">
                {assessmentData.items.map((item: any, i: number) => (
                  <div key={i} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-900">
                        Item #{item.itemNumber || i + 1} ({item.type || 'Standard'})
                      </span>
                      <div className="flex items-center gap-2">
                        {item.cognitiveLevel && (
                          <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-semibold border border-purple-200">
                            {item.cognitiveLevel}
                          </span>
                        )}
                        <span className="font-mono text-stone-600 font-bold text-[11px]">
                          {item.points || 5} Pts
                        </span>
                      </div>
                    </div>

                    <p className="text-stone-900 font-medium text-xs sm:text-sm">
                      {item.question || item.taskPrompt}
                    </p>

                    {item.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 pl-2">
                        {item.options.map((opt: string, optIdx: number) => (
                          <div key={optIdx} className="p-1.5 rounded-lg bg-white border border-stone-200 text-stone-700">
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}

                    {item.answerKeyOrRubric && (
                      <div className="pt-2 border-t border-stone-200/60 text-stone-600">
                        <strong className="text-stone-800">Answer Key / Evaluation Criterion:</strong>{' '}
                        {item.answerKeyOrRubric}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rubric View */}
          {assessmentData.rubric?.criteria && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-extrabold uppercase text-stone-700 tracking-wider">
                Authentic 4-Tier Performance Rubric
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-stone-200 rounded-2xl overflow-hidden">
                  <thead className="bg-stone-100 text-stone-700 font-bold">
                    <tr>
                      <th className="p-3 border-b border-stone-200">Criteria</th>
                      <th className="p-3 border-b border-stone-200 text-emerald-800">Excellent (4)</th>
                      <th className="p-3 border-b border-stone-200 text-blue-800">Proficient (3)</th>
                      <th className="p-3 border-b border-stone-200 text-amber-800">Developing (2)</th>
                      <th className="p-3 border-b border-stone-200 text-rose-800">Beginning (1)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 bg-white text-stone-700">
                    {assessmentData.rubric.criteria.map((crit: any, cIdx: number) => (
                      <tr key={cIdx}>
                        <td className="p-3 font-bold text-stone-900 bg-stone-50/50">{crit.name}</td>
                        <td className="p-3 bg-emerald-50/20">{crit.excellent4 || 'Meets full standard with autonomy.'}</td>
                        <td className="p-3 bg-blue-50/20">{crit.proficient3 || 'Meets standard with minimal prompts.'}</td>
                        <td className="p-3 bg-amber-50/20">{crit.developing2 || 'Approaches standard with assistance.'}</td>
                        <td className="p-3 bg-rose-50/20">{crit.beginning1 || 'Needs substantial scaffolding.'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Pre-generation Table of Specifications (TOS) Structure */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="text-base font-bold font-display text-stone-900">
              Standard DepEd 3-Term Table of Specifications (TOS) Framework
            </h3>
            <span className="text-xs font-mono text-stone-400">DO 015, s. 2026</span>
          </div>

          <p className="text-xs text-stone-600">
            Click "Generate Test Items & Rubric" above to formulate specific test questions or performance tasks mapped directly to this framework.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs text-center">
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="font-bold text-stone-800 block text-[11px]">Remembering</span>
              <span className="text-xs font-extrabold text-blue-700 font-mono">15%</span>
              <span className="text-[10px] text-stone-400 block mt-1">Knowledge recall</span>
            </div>
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="font-bold text-stone-800 block text-[11px]">Understanding</span>
              <span className="text-xs font-extrabold text-blue-700 font-mono">25%</span>
              <span className="text-[10px] text-stone-400 block mt-1">Comprehension</span>
            </div>
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="font-bold text-stone-800 block text-[11px]">Applying</span>
              <span className="text-xs font-extrabold text-emerald-700 font-mono">30%</span>
              <span className="text-[10px] text-stone-400 block mt-1">Real-world practice</span>
            </div>
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="font-bold text-stone-800 block text-[11px]">Analyzing</span>
              <span className="text-xs font-extrabold text-emerald-700 font-mono">15%</span>
              <span className="text-[10px] text-stone-400 block mt-1">Deconstructing</span>
            </div>
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="font-bold text-stone-800 block text-[11px]">Evaluating</span>
              <span className="text-xs font-extrabold text-purple-700 font-mono">10%</span>
              <span className="text-[10px] text-stone-400 block mt-1">Critical judgment</span>
            </div>
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="font-bold text-stone-800 block text-[11px]">Creating</span>
              <span className="text-xs font-extrabold text-purple-700 font-mono">5%</span>
              <span className="text-[10px] text-stone-400 block mt-1">Design & synthesis</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
