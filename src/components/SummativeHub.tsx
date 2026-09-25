import React, { useState } from 'react';
import { 
  Award, 
  FileText, 
  Download, 
  CheckCircle2, 
  Search, 
  Zap,
  Sparkles,
  RefreshCw,
  Printer,
  ChevronRight,
  Calculator
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SummativeHub: React.FC<{ sectionName: string; gradeLevel: string }> = ({ sectionName, gradeLevel }) => {
  const { currentUser } = useAuth();
  const [selectedTerm, setSelectedTerm] = useState<1 | 2 | 3>(1);
  const [testCount, setTestCount] = useState<number>(5);

  const tests = Array.from({ length: testCount }).map((_, i) => ({
    id: `ST-${selectedTerm}-${i + 1}`,
    title: `Summative Test #${i + 1}`,
    week: `Week ${i * 2 + 1}-${i * 2 + 2}`,
    status: i < 2 ? 'Completed' : 'Draft',
    date: 'SY 2026-2027',
  }));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="bg-indigo-900 p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <Award className="w-8 h-8 text-amber-300" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight">Summative Test Assessment Hub</h3>
                <p className="text-xs text-indigo-200 font-bold uppercase">Section: {sectionName} • {gradeLevel} • Term {selectedTerm}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/10">
               <div className="text-[10px] font-black uppercase text-indigo-300 ml-2">Tests per Term:</div>
               <div className="flex bg-indigo-950 rounded-xl p-1">
                  {[3, 5, 7].map(n => (
                    <button 
                      key={n}
                      onClick={() => setTestCount(n)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-black transition ${testCount === n ? 'bg-amber-500 text-indigo-950 shadow-md' : 'text-indigo-400 hover:text-white'}`}
                    >
                      {n}
                    </button>
                  ))}
               </div>
            </div>
          </div>
        </div>

        <div className="p-6">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
             {tests.map(test => (
               <div key={test.id} className="group p-5 bg-slate-50 hover:bg-white border border-slate-100 hover:border-indigo-300 rounded-3xl transition-all duration-300 shadow-xs hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-xl text-[10px] font-black">{test.id}</div>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${test.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {test.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-slate-800 mb-1">{test.title}</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-6">{test.week} • MATATAG Aligned</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                     <button className="py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black flex items-center justify-center gap-1.5 hover:bg-indigo-700 transition shadow-sm">
                        <FileText className="w-3 h-3" /> PREVIEW
                     </button>
                     <button className="py-2 bg-white text-slate-700 border border-slate-200 rounded-xl text-[10px] font-black flex items-center justify-center gap-1.5 hover:bg-slate-50 transition">
                        <Download className="w-3 h-3" /> EXPORT
                     </button>
                  </div>
               </div>
             ))}
             
             {/* Dynamic AI Generation Slot */}
             <div className="p-5 border-2 border-dashed border-indigo-200 rounded-3xl bg-indigo-50/30 flex flex-col items-center justify-center text-center space-y-3">
                <div className="p-3 bg-white rounded-full shadow-sm">
                   <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" />
                </div>
                <div>
                   <h4 className="text-xs font-black text-indigo-900 uppercase">AI Test Generator</h4>
                   <p className="text-[9px] text-indigo-700 font-bold max-w-[150px]">Create new MATATAG-aligned test based on your weekly BOW entries.</p>
                </div>
                <button className="px-6 py-2 bg-indigo-900 text-white rounded-2xl text-[10px] font-black shadow-md hover:scale-105 transition active:scale-95">
                   GENERATE NOW
                </button>
             </div>
           </div>
        </div>
        
        <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl shadow-xs flex items-center justify-center text-indigo-600">
                 <Calculator className="w-5 h-5" />
              </div>
              <div>
                 <h5 className="text-xs font-black text-slate-800">Term Average Scorer</h5>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Auto-Compute Summative Grades</p>
              </div>
           </div>
           <div className="flex gap-2">
              <button className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black flex items-center gap-2 shadow-md">
                 <CheckCircle2 className="w-3.5 h-3.5" /> SYNC TO SF9
              </button>
              <button className="px-5 py-2 bg-white text-slate-700 border border-slate-200 rounded-xl text-[10px] font-black flex items-center gap-2">
                 <Printer className="w-3.5 h-3.5" /> PRINT TOS
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
