import React, { useState } from 'react';
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  KeyRound,
  Download,
  Printer,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  FileDown,
  Loader2,
  BookOpen,
  Pencil,
  Palette,
  Compass,
  CheckSquare
} from 'lucide-react';
import { ILAWCompletePlan } from '../types/ilawDO3';
import { DO3ILAWView } from './DO3ILAWView';
import { StandaloneAnswerKeysView } from './StandaloneAnswerKeysView';
import { ExcelActivityChecker } from './ExcelActivityChecker';
import { exportActivityCheckerToXlsx } from '../utils/excelActivityCheckerExporter';
import { ScienceVisualsLab } from './ScienceVisualsLab';
import { WritingAiChecker } from './WritingAiChecker';

interface MyGeneratedILAWViewProps {
  plan: ILAWCompletePlan;
  onNavigateToForm: () => void;
  onExportDocx: () => void;
  onExportPptx: () => void;
  onExportPdf: () => void;
  onRegenerateAI?: () => void;
  versionStatus?: 'AI Generated' | 'Teacher Edited';
  isExportingDocx?: boolean;
  isExportingPptx?: boolean;
  isExportingPdf?: boolean;
  onUpdatePlan?: (updatedPlan: ILAWCompletePlan) => void;
}

export const MyGeneratedILAWView: React.FC<MyGeneratedILAWViewProps> = ({
  plan,
  onNavigateToForm,
  onExportDocx,
  onExportPptx,
  onExportPdf,
  onRegenerateAI,
  versionStatus = 'AI Generated',
  isExportingDocx = false,
  isExportingPptx = false,
  isExportingPdf = false,
  onUpdatePlan
}) => {
  const [activeSection, setActiveSection] = useState<'matrix' | 'las' | 'slides' | 'answers' | 'checker' | 'poster' | 'science' | 'writing'>('matrix');

  const { header, activitySheets, presentationSlides } = plan;

  const activityCheckerMeta = {
    school: header.school,
    subject: header.learningArea,
    gradeAndSection: header.gradeLevelAndSection,
    teacher: header.teacher,
    term: `Term ${header.term}`,
    week: header.bowWeek,
    topic: header.lesson,
    dates: header.inclusiveTeachingDates,
    maxScores: {
      las1: 25,
      las2: 25,
      las3: 25,
      las4: 25
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Banner - Prominent Generated Section */}
      <div className="bg-[#002776] text-white rounded-3xl p-6 sm:p-8 shadow-md border-b-4 border-[#FCD116] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-0.5 rounded-full bg-[#CE1126] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              DepEd Order No. 3, s. 2026 Master Output
            </span>
            <span className="text-xs text-blue-100">
              Term {header.term} • {header.inclusiveTeachingDates}
            </span>
            {versionStatus === 'Teacher Edited' ? (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-300 text-amber-950 text-xs font-bold flex items-center gap-1 shadow-xs">
                <Pencil className="w-3 h-3 text-amber-900" />
                <span>Version: Teacher Edited</span>
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-blue-200 text-[#002776] text-xs font-bold flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3 text-[#002776]" />
                <span>Version: AI Generated</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onRegenerateAI && (
              <button
                onClick={onRegenerateAI}
                className="px-3 py-1 rounded-xl bg-[#FCD116] hover:bg-amber-300 text-[#002776] text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                title="Regenerate this ILAW Plan with AI"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#002776]" />
                <span>Regenerate Content</span>
              </button>
            )}

            <button
              onClick={onNavigateToForm}
              className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center gap-1.5 border border-white/20 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Edit In ILAW Form</span>
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-white">
            My ILAW Generated Lesson Plan
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-3xl leading-relaxed">
            {header.learningArea}: <strong>{header.lesson}</strong> • {header.gradeLevelAndSection} • Teacher {header.teacher}
          </p>
        </div>

        {/* Global Export Hub */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={onExportDocx}
            disabled={isExportingDocx}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-[#002776] text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
            title="Download full official Microsoft Word document (.docx) with all 4 parts"
          >
            {isExportingDocx ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5 text-[#002776]" />}
            <span>{isExportingDocx ? 'Exporting Word...' : 'Download Word (.docx)'}</span>
          </button>

          <button
            onClick={onExportPptx}
            disabled={isExportingPptx}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FCD116] hover:bg-amber-300 text-[#002776] text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
            title="Download companion PowerPoint deck (.pptx) with ≥35pt body text"
          >
            {isExportingPptx ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Presentation className="w-3.5 h-3.5 text-[#002776]" />}
            <span>{isExportingPptx ? 'Exporting Slides...' : 'Download Companion PPT (.pptx)'}</span>
          </button>

          <button
            onClick={onExportPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold transition shadow-sm cursor-pointer border border-blue-600 disabled:opacity-50"
          >
            {isExportingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileDown className="w-3.5 h-3.5" />}
            <span>{isExportingPdf ? 'Exporting PDF...' : 'Download PDF'}</span>
          </button>

          <button
            onClick={() => exportActivityCheckerToXlsx([], activityCheckerMeta)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm cursor-pointer"
            title="Download formula-ready Excel Activity Checker (.xlsx)"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Download Excel Checker (.xlsx)</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print All</span>
          </button>
        </div>
      </div>

      {/* Primary Section Switcher Tabs */}
      <div className="bg-white rounded-3xl p-3 border border-stone-200 shadow-sm flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveSection('matrix')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer ${
            activeSection === 'matrix'
              ? 'bg-[#002776] text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <FileText className="w-4 h-4 text-[#FCD116]" />
          <span>Part 1 &amp; 2: Lesson Plan Matrix</span>
        </button>

        <button
          onClick={() => setActiveSection('las')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer ${
            activeSection === 'las'
              ? 'bg-[#002776] text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-[#FCD116]" />
          <span>Part 3: Learning Activity Sheets (LAS 1–4)</span>
          <span className="px-1.5 py-0.2 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold">
            {activitySheets.length} Sheets
          </span>
        </button>

        <button
          onClick={() => setActiveSection('slides')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer ${
            activeSection === 'slides'
              ? 'bg-[#002776] text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <Presentation className="w-4 h-4 text-[#FCD116]" />
          <span>Part 4: Lesson Proper Presentation (PPT)</span>
          <span className="px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-900 text-[10px] font-bold">
            {presentationSlides.length} Slides • ≥35pt
          </span>
        </button>

        <button
          onClick={() => setActiveSection('answers')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer ${
            activeSection === 'answers'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-amber-900 hover:bg-amber-50'
          }`}
        >
          <KeyRound className="w-4 h-4 text-amber-200" />
          <span>Standalone Teacher Answer Keys</span>
          <span className="px-1.5 py-0.2 rounded-full bg-amber-200 text-amber-950 text-[10px] font-bold">
            Teacher Only
          </span>
        </button>

        <button
          onClick={() => setActiveSection('checker')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer ${
            activeSection === 'checker'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-emerald-900 hover:bg-emerald-50'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
          <span>Excel Activity Checker &amp; Gradebook</span>
          <span className="px-1.5 py-0.2 rounded-full bg-emerald-200 text-emerald-950 text-[10px] font-bold">
            Auto-Graded
          </span>
        </button>

        <button
          onClick={() => setActiveSection('poster')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer ${
            activeSection === 'poster'
              ? 'bg-purple-800 text-white shadow-xs'
              : 'text-purple-900 hover:bg-purple-50'
          }`}
        >
          <Palette className="w-4 h-4 text-[#FCD116]" />
          <span>Part 5: Creative Lesson Poster</span>
          <span className="px-1.5 py-0.2 rounded-full bg-purple-200 text-purple-950 text-[10px] font-bold">
            Printable
          </span>
        </button>

        <button
          onClick={() => setActiveSection('science')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer ${
            activeSection === 'science'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-emerald-900 hover:bg-emerald-50'
          }`}
        >
          <Compass className="w-4 h-4 text-emerald-300" />
          <span>Part 6: Science Visuals &amp; Flowcharts</span>
          <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-950 text-[10px] font-bold">
            3D/5D Lab
          </span>
        </button>

        <button
          onClick={() => setActiveSection('writing')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer ${
            activeSection === 'writing'
              ? 'bg-red-800 text-white shadow-xs'
              : 'text-red-900 hover:bg-red-50'
          }`}
        >
          <CheckSquare className="w-4 h-4 text-red-300" />
          <span>Part 7: Writing AI &amp; Plagiarism Checker</span>
          <span className="px-1.5 py-0.2 rounded-full bg-red-100 text-red-950 text-[10px] font-bold">
            Live Detector
          </span>
        </button>
      </div>

      {/* Render Active Output Section */}
      {activeSection === 'matrix' && (
        <DO3ILAWView
          plan={plan}
          onExportDocx={onExportDocx}
          onExportPptx={onExportPptx}
          onExportPdf={onExportPdf}
          onGenerateAI={onRegenerateAI}
          versionStatus={versionStatus}
          isExportingDocx={isExportingDocx}
          isExportingPptx={isExportingPptx}
          isExportingPdf={isExportingPdf}
          onUpdatePlan={onUpdatePlan}
        />
      )}

      {activeSection === 'las' && (
        <DO3ILAWView
          plan={plan}
          onExportDocx={onExportDocx}
          onExportPptx={onExportPptx}
          onExportPdf={onExportPdf}
          onGenerateAI={onRegenerateAI}
          versionStatus={versionStatus}
          isExportingDocx={isExportingDocx}
          isExportingPptx={isExportingPptx}
          isExportingPdf={isExportingPdf}
          onUpdatePlan={onUpdatePlan}
        />
      )}

      {activeSection === 'slides' && (
        <DO3ILAWView
          plan={plan}
          onExportDocx={onExportDocx}
          onExportPptx={onExportPptx}
          onExportPdf={onExportPdf}
          onGenerateAI={onRegenerateAI}
          versionStatus={versionStatus}
          isExportingDocx={isExportingDocx}
          isExportingPptx={isExportingPptx}
          isExportingPdf={isExportingPdf}
          onUpdatePlan={onUpdatePlan}
        />
      )}

      {activeSection === 'answers' && (
        <StandaloneAnswerKeysView plan={plan} />
      )}

      {activeSection === 'checker' && (
        <ExcelActivityChecker meta={activityCheckerMeta} />
      )}

      {activeSection === 'poster' && (
        <div className="space-y-6 animate-fade-in">
          {/* Canva & Gamma authorized integrations info card */}
          <div className="bg-stone-50 border border-stone-200 p-5 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-stone-100 shadow-3xs space-y-2">
              <div className="flex items-center gap-2 text-[#0084FF] font-black text-xs uppercase">
                <Palette className="w-4 h-4" />
                <span>Canva Authorized Bridge</span>
              </div>
              <p className="text-xs text-stone-600">
                Authorized Canva connection ready. Transfer your poster layout, color assets, and titles directly to Canva templates.
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`POSTER TITLE: ${header.lesson}\n\nSUBTITLE: Standardized Matatag K-12 Guide\n\nCONTENT: ${plan.matrix.intentions}`);
                  alert('Poster copy layout transferred to clipboard! You can now open Canva and paste.');
                  window.open('https://canva.com', '_blank');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-[#0084FF] text-white font-bold text-xs hover:bg-[#0070da] transition cursor-pointer flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Canva</span>
              </button>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-stone-100 shadow-3xs space-y-2">
              <div className="flex items-center gap-2 text-indigo-700 font-black text-xs uppercase">
                <Presentation className="w-4 h-4" />
                <span>Gamma Slide Connector</span>
              </div>
              <p className="text-xs text-stone-600">
                Authorized Gamma connection ready. Instantly send your slide bullets to Gamma to create customized, highly design-polished slides.
              </p>
              <button
                onClick={() => {
                  const slidesText = presentationSlides.map(s => `SLIDE ${s.slideNumber}: ${s.title}\n${s.bodyBullets.join('\n')}`).join('\n\n');
                  navigator.clipboard.writeText(slidesText);
                  alert('Slides presentation text transferred to clipboard! Opening Gamma...');
                  window.open('https://gamma.app', '_blank');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition cursor-pointer flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Create with Gamma</span>
              </button>
            </div>
          </div>

          {/* Printable Poster Canvas */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-black text-stone-800 uppercase tracking-wide">Live Poster Preview</h3>
                <p className="text-[10px] text-stone-500">Perfect for A4/Letter classroom display printing</p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl cursor-pointer transition flex items-center gap-2 shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Print Poster (A4)</span>
              </button>
            </div>

            {/* Poster Sheet Frame */}
            <div id="classroomPosterPrintable" className={`mx-auto max-w-2xl p-8 rounded-3xl border border-stone-300 shadow-lg text-stone-900 bg-gradient-to-br ${
              header.learningArea.includes('Science') 
                ? 'from-emerald-50 via-white to-emerald-50/30 border-emerald-300' 
                : header.learningArea.includes('Math')
                ? 'from-blue-50 via-white to-blue-50/30 border-blue-300'
                : header.learningArea.includes('English')
                ? 'from-purple-50 via-white to-purple-50/30 border-purple-300'
                : 'from-teal-50 via-white to-teal-50/30 border-teal-300'
            }`}>
              {/* Poster Header */}
              <div className="flex items-center justify-between border-b-2 border-stone-300 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  {/* Highlighted DepEd and LNNCHS logos side-by-side */}
                  <div className="flex items-center gap-2">
                    <img 
                      src="/deped-logo.png" 
                      alt="DepEd Logo" 
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-contain rounded-full bg-white p-0.5 border border-stone-200 ring-2 ring-blue-500 shadow-md" 
                    />
                    <img 
                      src="/lnnchs-logo.png" 
                      alt="LNNCHS Logo" 
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-contain rounded-full bg-white p-0.5 border border-stone-200 ring-2 ring-amber-400 shadow-md" 
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-stone-800 tracking-wider">LNNCHS Unified Academics</h4>
                    <p className="text-[9px] uppercase tracking-wider text-stone-600 font-sans font-bold">
                      Republic of the Philippines
                    </p>
                    <span className="text-[9px] text-stone-500 font-bold block">{header.region} • {header.division}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] px-2.5 py-1 bg-[#002776] text-white font-black rounded-md uppercase tracking-wider">
                    {header.learningArea}
                  </span>
                  <span className="text-[9px] font-bold text-stone-500 block mt-1">Classroom Guide Poster</span>
                </div>
              </div>

              {/* Poster Body */}
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
                    {header.lesson}
                  </h1>
                  <span className="inline-block px-3 py-1 bg-stone-100 rounded-full text-xs text-stone-700 font-bold">
                    Grade Level Target: {header.gradeLevelAndSection}
                  </span>
                </div>

                {/* Main Core Concept block */}
                <div className="p-5 bg-white border border-stone-200 rounded-2xl shadow-inner space-y-2">
                  <span className="text-[10px] font-black text-blue-900 uppercase tracking-widest block">Core Learning Competency</span>
                  <p className="text-sm font-bold text-stone-800 leading-relaxed">
                    {plan.matrix.competency.melc}
                  </p>
                </div>

                {/* Key Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-2xl border border-stone-100 shadow-3xs space-y-2">
                    <span className="text-[10px] font-black text-teal-800 uppercase tracking-wider block">Objectives &amp; Targets</span>
                    <ul className="space-y-1.5 text-xs text-stone-700 list-disc list-inside">
                      {plan.matrix.objectives[0]?.objectives.map((obj, oIdx) => (
                        <li key={oIdx}>{obj}</li>
                      )) || <li>Understand primary standards.</li>}
                    </ul>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-stone-100 shadow-3xs space-y-2">
                    <span className="text-[10px] font-black text-purple-800 uppercase tracking-wider block">Real-World Application</span>
                    <p className="text-xs text-stone-600 leading-relaxed italic">
                      {plan.matrix.intentions}
                    </p>
                  </div>
                </div>

                {/* Callout box for safety / classroom rules */}
                <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-2xl text-xs space-y-1.5">
                  <span className="font-bold text-amber-900 block flex items-center gap-1">
                    💡 Teacher Guide Reflection:
                  </span>
                  <p className="text-amber-800 leading-relaxed">
                    Apply local community examples (Lanao del Norte National Comprehensive High School contexts). Focus on student-centered collaboration, active safety, and critical reflection.
                  </p>
                </div>
              </div>

              {/* Poster Footer */}
              <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between text-[9px] text-stone-500 font-bold">
                <span>Teacher: {header.teacher}</span>
                <span>Created with BOISER Direct-Output AI Engine</span>
                <span>DEPED DO 3 s. 2026</span>
              </div>

            </div>

          </div>
        </div>
      )}

      {activeSection === 'science' && (
        <ScienceVisualsLab plan={plan} />
      )}

      {activeSection === 'writing' && (
        <WritingAiChecker plan={plan} />
      )}
    </div>
  );
};
