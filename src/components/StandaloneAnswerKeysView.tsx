import React, { useState } from 'react';
import {
  KeyRound,
  ShieldAlert,
  Copy,
  Check,
  Printer,
  FileCheck,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { ILAWCompletePlan } from '../types/ilawDO3';

interface StandaloneAnswerKeysViewProps {
  plan: ILAWCompletePlan;
}

export const StandaloneAnswerKeysView: React.FC<StandaloneAnswerKeysViewProps> = ({ plan }) => {
  const [activeSession, setActiveSession] = useState<number>(0);
  const [copiedSession, setCopiedSession] = useState<number | null>(null);

  const { header, activitySheets } = plan;
  const currentSheet = activitySheets[activeSession] || activitySheets[0];

  const handleCopySessionKey = (sessionIdx: number) => {
    const sheet = activitySheets[sessionIdx];
    if (!sheet) return;

    let text = `CONFIDENTIAL — FOR TEACHER USE ONLY\n`;
    text += `DEPARTMENT OF EDUCATION — ${header.region}\n`;
    text += `STANDALONE TEACHER ANSWER KEY: ${sheet.activityTitle}\n`;
    text += `Learning Area: ${header.learningArea} | ${header.gradeLevelAndSection} | Term ${header.term}\n`;
    text += `Session Date: ${sheet.sessionDate}\n\n`;
    text += `==================================================\n`;
    text += `PART A: COLLABORATIVE GROUP TASK ANSWER GUIDE\n`;
    text += `==================================================\n`;
    sheet.answerKey.partAAnswers.forEach((ans, i) => {
      text += `${ans}\n\n`;
    });
    text += `==================================================\n`;
    text += `PART B: INDIVIDUAL WRITTEN OUTPUT SCORING GUIDE\n`;
    text += `==================================================\n`;
    sheet.answerKey.partBAnswers.forEach((ans, i) => {
      text += `${ans}\n\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
      setCopiedSession(sessionIdx);
      setTimeout(() => setCopiedSession(null), 2000);
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Warning Banner */}
      <div className="rounded-3xl bg-amber-500 text-stone-950 p-6 shadow-sm border-2 border-amber-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-950 text-amber-300 flex items-center justify-center shrink-0 shadow-xs">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider">
              <ShieldAlert className="w-3 h-3 text-red-400" />
              Confidential Teacher Evaluator Material
            </div>
            <h3 className="text-xl font-bold font-serif tracking-tight text-amber-950">
              Standalone Teacher Answer Key &amp; Scoring Rubric
            </h3>
            <p className="text-xs text-amber-950 font-medium">
              FOR TEACHER USE ONLY • STRICTLY NOT FOR STUDENT DISTRIBUTION OR ADVANCE SHARING
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCopySessionKey(activeSession)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-950 text-amber-200 hover:bg-black text-xs font-bold transition shadow-xs cursor-pointer"
          >
            {copiedSession === activeSession ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSession === activeSession ? 'Copied Key!' : 'Copy Session Key'}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/80 hover:bg-white text-stone-900 text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Key</span>
          </button>
        </div>
      </div>

      {/* Session Selector Tabs */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Select Session Answer Sheet
            </span>
            <div className="text-lg font-bold text-[#002776] font-serif">
              {header.lesson} • {header.learningArea}
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-stone-100 border border-stone-200">
            {activitySheets.map((sheet, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSession(idx)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  activeSession === idx
                    ? 'bg-[#002776] text-white shadow-xs'
                    : 'text-stone-700 hover:bg-white'
                }`}
              >
                <span>LAS {idx + 1} Key</span>
                <span className="text-[10px] opacity-80 font-normal">({sheet.sessionDate})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Answer Key Content */}
        <div className="space-y-6">
          {/* Header Metadata */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div>
              <span className="font-bold text-[#002776]">Active Sheet: </span>
              <span className="font-semibold text-stone-800">{currentSheet.activityTitle}</span>
            </div>
            <div className="text-stone-500">
              Inclusive Date: <strong>{currentSheet.sessionDate}</strong> • Term {header.term}
            </div>
          </div>

          {/* Part A Answers */}
          <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#002776] text-white text-[11px] font-bold">
                PART A GUIDE
              </span>
              <h4 className="text-sm font-bold text-[#002776]">
                {currentSheet.partAGroup.title} — Expected Responses &amp; Scoring Benchmarks
              </h4>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed italic">
              Use these model responses to guide student group grading and facilitate post-activity synthesis. Allow for paraphrasing and creative contextualization.
            </p>

            <div className="space-y-3 pt-2">
              {currentSheet.answerKey.partAAnswers.map((ans, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white border border-blue-200 text-xs shadow-2xs space-y-1">
                  <div className="font-bold text-blue-950 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-blue-700" />
                    <span>Model Answer / Assessment Benchmark {i + 1}:</span>
                  </div>
                  <div className="text-stone-800 leading-relaxed font-sans pl-5">
                    {ans}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Part B Answers */}
          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[11px] font-bold">
                PART B GUIDE
              </span>
              <h4 className="text-sm font-bold text-emerald-950">
                {currentSheet.partBIndividual.title} — Individual Written Output Rubric
              </h4>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed italic">
              Individual outputs evaluate higher-order thinking and application. Grade against the 4-level criteria below.
            </p>

            <div className="space-y-3 pt-2">
              {currentSheet.answerKey.partBAnswers.map((ans, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white border border-emerald-200 text-xs shadow-2xs space-y-1">
                  <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Exemplary Mastery Criteria {i + 1}:</span>
                  </div>
                  <div className="text-stone-800 leading-relaxed font-sans pl-5">
                    {ans}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rubric Matrix Display */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#002776]" />
              Official Analytic Scoring Rubric (LAS {activeSession + 1})
            </h4>

            <div className="overflow-x-auto rounded-2xl border border-stone-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#002776] text-white uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3 w-1/4">Criterion</th>
                    <th className="p-3 bg-emerald-900/60">Exemplary (4 pts)</th>
                    <th className="p-3 bg-blue-900/60">Proficient (3 pts)</th>
                    <th className="p-3 bg-amber-900/60">Developing (2 pts)</th>
                    <th className="p-3 bg-red-900/60">Beginning (1 pt)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {currentSheet.rubric.criteria.map((c, i) => (
                    <tr key={i} className="hover:bg-stone-50">
                      <td className="p-3 font-bold text-stone-900 bg-stone-50/50">{c.criterion}</td>
                      <td className="p-3 text-stone-800">{c.exemplary4}</td>
                      <td className="p-3 text-stone-700">{c.proficient3}</td>
                      <td className="p-3 text-stone-600">{c.developing2}</td>
                      <td className="p-3 text-stone-500">{c.beginning1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
