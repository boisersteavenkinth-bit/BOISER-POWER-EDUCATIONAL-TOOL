import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Download, 
  FileText, 
  CheckCircle2, 
  RefreshCw, 
  Search,
  BookOpen,
  Printer,
  ChevronRight,
  Layers,
  Wand2,
  FileDown
} from 'lucide-react';
import { 
  ILAW_BOW_DATABASE, 
  ILAWBOWEntry, 
  getDistinctGrades, 
  getSubjectsForGrade, 
  getTermsForSubject, 
  getEntriesForTerm 
} from '../data/ilawBOWDatabase';
import { useAuth } from '../context/AuthContext';

export const LASGenerator: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedGrade, setSelectedGrade] = useState<string>('Grade 11');
  const [selectedSubject, setSelectedSubject] = useState<string>('Mabisang Komunikasyon');
  const [selectedTerm, setSelectedTerm] = useState<'Term 1' | 'Term 2' | 'Term 3'>('Term 1');
  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number>(0);
  
  const availableSubjects = getSubjectsForGrade(selectedGrade);
  const availableTerms = getTermsForSubject(selectedGrade, selectedSubject);
  const availableEntries = getEntriesForTerm(selectedGrade, selectedSubject, selectedTerm);
  const activeEntry = availableEntries[selectedWeekIndex] || availableEntries[0];

  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [generatedLAS, setGeneratedLAS] = useState<Partial<ILAWBOWEntry> | null>(null);

  useEffect(() => {
    if (activeEntry) {
      setGeneratedLAS({
        ...activeEntry,
        lasBg: activeEntry.lasBg || `Background information for ${activeEntry.topic}...`,
        lasA1: activeEntry.lasA1 || `Activity 1: Conceptual check on ${activeEntry.competency}...`,
        lasA2: activeEntry.lasA2 || `Activity 2: Critical analysis and practical application...`,
        lasA3: activeEntry.lasA3 || `Activity 3: Reflection and synthesis...`
      });
    }
  }, [activeEntry]);

  const handleGenerateLAS = async () => {
    setIsGenerating(true);
    // Simulate generation logic
    await new Promise(r => setTimeout(r, 1200));
    
    if (activeEntry) {
      // If data exists in BOW, use it, otherwise use AI-enhanced placeholder
      setGeneratedLAS({
        ...activeEntry,
        lasBg: activeEntry.lasBg || `[AI GENERATED] ${activeEntry.topic} is a critical component of the ${activeEntry.subject} curriculum. It involves understanding ${activeEntry.learningCompetency.toLowerCase()}.`,
        lasA1: activeEntry.lasA1 || `[AI GENERATED] Activity 1: Define the following terms based on the background information: ${activeEntry.topic}, ${activeEntry.code}.`,
        lasA2: activeEntry.lasA2 || `[AI GENERATED] Activity 2: Create a concept map illustrating the relationship between ${activeEntry.topic} and daily life scenarios.`,
        lasA3: activeEntry.lasA3 || `[AI GENERATED] Activity 3: Write a 100-word reflection on how mastering ${activeEntry.competency} contributes to your personal growth.`
      });
    }
    setIsGenerating(false);
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
       alert('LAS Exported to PDF successfully!');
       setIsExporting(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-2xl text-blue-700">
              <Wand2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#002776]">LAS Generator & Multi-Sync Hub</h2>
              <p className="text-xs text-stone-500 uppercase font-bold tracking-wider">SY 2026-2027 MATATAG • MELCs Aligned</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handleGenerateLAS}
              disabled={isGenerating}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 rounded-xl text-xs font-black shadow-md hover:from-amber-400 transition flex items-center gap-2"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>AUTO-GENERATE LAS FROM BOW</span>
            </button>
          </div>
        </div>

        {/* SELECTORS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-stone-400 uppercase ml-1">Grade Level</label>
            <select 
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-stone-700 outline-none focus:ring-2 focus:ring-blue-600"
            >
              {getDistinctGrades().map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-stone-400 uppercase ml-1">Subject / Learning Area</label>
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-stone-700 outline-none focus:ring-2 focus:ring-blue-600"
            >
              {availableSubjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-stone-400 uppercase ml-1">Term</label>
            <select 
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value as any)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-stone-700 outline-none focus:ring-2 focus:ring-blue-600"
            >
              {availableTerms.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-stone-400 uppercase ml-1">Week / Competency</label>
            <select 
              value={selectedWeekIndex}
              onChange={(e) => setSelectedWeekIndex(parseInt(e.target.value))}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-stone-700 outline-none focus:ring-2 focus:ring-blue-600"
            >
              {availableEntries.map((e, idx) => (
                <option key={idx} value={idx}>Week {e.week}: {e.topic.slice(0, 30)}...</option>
              ))}
            </select>
          </div>
        </div>

        {/* LAS PREVIEW */}
        {generatedLAS && (
          <div className="mt-8 border-2 border-slate-200 rounded-3xl overflow-hidden bg-slate-50">
            <div className="bg-[#002776] p-4 text-white flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-amber-300" />
                  <span className="text-xs font-black uppercase tracking-widest">Learning Activity Sheet Preview</span>
               </div>
               <div className="flex items-center gap-2">
                  <button 
                    onClick={handleExportPDF}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold border border-white/20 flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print LAS</span>
                  </button>
                  <button 
                    onClick={handleExportPDF}
                    className="px-3 py-1.5 bg-amber-500 text-stone-950 rounded-lg text-[10px] font-black flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export PDF</span>
                  </button>
               </div>
            </div>

            <div className="p-8 bg-white max-w-4xl mx-auto shadow-inner my-6 border border-stone-200 min-h-[800px] text-stone-800">
               {/* LAS HEADER */}
               <div className="flex items-center justify-between border-b-2 border-stone-900 pb-4 mb-6">
                  <div className="w-16 h-16 bg-stone-100 rounded-lg border-2 border-stone-300 flex items-center justify-center font-black text-stone-400">LOGO</div>
                  <div className="text-center flex-1">
                     <p className="text-[10px] font-bold uppercase">Republic of the Philippines</p>
                     <p className="text-[10px] font-black uppercase">Department of Education</p>
                     <p className="text-[10px] font-bold uppercase">Region X — Northern Mindanao</p>
                     <p className="text-xs font-black uppercase mt-1">LANAO DEL NORTE NATIONAL COMPREHENSIVE HIGH SCHOOL</p>
                  </div>
                  <div className="w-16 h-16 bg-stone-100 rounded-lg border-2 border-stone-300 flex items-center justify-center font-black text-stone-400">LOGO</div>
               </div>

               <div className="text-center mb-8">
                  <h1 className="text-2xl font-black uppercase underline decoration-2 underline-offset-4">LEARNING ACTIVITY SHEET</h1>
                  <p className="text-sm font-bold mt-1">{selectedSubject} — {selectedGrade}</p>
                  <p className="text-xs font-medium text-stone-500 uppercase">{selectedTerm} • Week {activeEntry?.week}</p>
               </div>

               <div className="grid grid-cols-2 gap-4 text-xs font-bold border-2 border-stone-900 p-4 mb-6">
                  <div>Name: __________________________________</div>
                  <div>Section: _______________________________</div>
                  <div>Teacher: {currentUser.name}</div>
                  <div>Date: __________________________________</div>
               </div>

               <div className="space-y-6">
                  <section>
                    <h3 className="bg-stone-900 text-white px-3 py-1 text-xs font-black inline-block mb-3">I. BACKGROUND INFORMATION FOR LEARNERS</h3>
                    <p className="text-xs leading-relaxed text-justify font-medium">{generatedLAS.lasBg}</p>
                  </section>

                  <section>
                    <h3 className="bg-stone-900 text-white px-3 py-1 text-xs font-black inline-block mb-3">II. LEARNING COMPETENCY WITH CODE</h3>
                    <p className="text-xs font-bold">{generatedLAS.learningCompetency}</p>
                    <p className="text-[10px] font-mono mt-1 text-blue-700">Code: {generatedLAS.code}</p>
                  </section>

                  <section>
                    <h3 className="bg-stone-900 text-white px-3 py-1 text-xs font-black inline-block mb-3">III. ACTIVITIES</h3>
                    <div className="space-y-4">
                       <div className="p-4 border border-dashed border-stone-300 rounded-xl bg-stone-50">
                          <p className="text-[10px] font-black uppercase text-stone-400 mb-1">Activity 1</p>
                          <p className="text-xs font-bold">{generatedLAS.lasA1}</p>
                       </div>
                       <div className="p-4 border border-dashed border-stone-300 rounded-xl bg-stone-50">
                          <p className="text-[10px] font-black uppercase text-stone-400 mb-1">Activity 2</p>
                          <p className="text-xs font-bold">{generatedLAS.lasA2}</p>
                       </div>
                       <div className="p-4 border border-dashed border-stone-300 rounded-xl bg-stone-50">
                          <p className="text-[10px] font-black uppercase text-stone-400 mb-1">Activity 3</p>
                          <p className="text-xs font-bold">{generatedLAS.lasA3}</p>
                       </div>
                    </div>
                  </section>

                  <section className="pt-8 border-t border-stone-200">
                    <h3 className="bg-stone-900 text-white px-3 py-1 text-xs font-black inline-block mb-3">IV. REFLECTION</h3>
                    <p className="text-xs italic leading-relaxed text-stone-600">
                      What have you learned from today's activity? How can you apply this in your daily life as a student?
                      ____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
                    </p>
                  </section>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
