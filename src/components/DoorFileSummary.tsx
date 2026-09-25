import React from 'react';
import { 
  FileText, 
  FileSpreadsheet, 
  Download, 
  CheckCircle2, 
  Clock, 
  Lock,
  Layers,
  Sparkles,
  Search,
  Grid,
  FileBox,
  FolderOpen,
  ChevronRight
} from 'lucide-react';

interface DoorFileSummaryProps {
  sectionName: string;
  gradeLevel: string;
}

export const DoorFileSummary: React.FC<DoorFileSummaryProps> = ({ sectionName, gradeLevel }) => {
  const sfFiles = [
    { code: 'SF1', name: 'School Register', status: 'Updated', type: 'Excel' },
    { code: 'SF2', name: 'Daily Attendance', status: 'Live Sync', type: 'Excel' },
    { code: 'SF3', name: 'Books Issued', status: 'Ready', type: 'PDF' },
    { code: 'SF4', name: 'Attendance Summary', status: 'Monthly', type: 'Excel' },
    { code: 'SF5', name: 'Promotion Report', status: 'Generated', type: 'Excel' },
    { code: 'SF9', name: 'Report Card', status: 'Batch Ready', type: 'PDF' },
    { code: 'SF10', name: 'Permanent Record', status: 'Secure', type: 'PDF' },
  ];

  const activityBatches = [
    { name: 'Term 1 Activities', count: 12, lastAdded: '2 days ago' },
    { name: 'Summative Tests', count: 5, lastAdded: 'Yesterday' },
    { name: 'LAS Packets', count: 8, lastAdded: '1 week ago' },
    { name: 'Performance Tasks', count: 3, lastAdded: '3 days ago' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* SF Summary Section */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="bg-[#002776] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <FileSpreadsheet className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-tight">Official School Forms (SF1–SF10)</h3>
              <p className="text-[10px] text-blue-200 font-bold uppercase">Section: {sectionName} • {gradeLevel}</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/20 transition flex items-center gap-2">
            <Download className="w-3.5 h-3.5" />
            <span>Download All SF</span>
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sfFiles.map(file => (
            <div key={file.code} className="group p-4 bg-slate-50 hover:bg-white border border-slate-100 hover:border-blue-200 rounded-2xl transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-[10px] font-black">{file.code}</div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[8px] font-black uppercase">{file.status}</span>
              </div>
              <h4 className="text-xs font-black text-slate-800 mb-1">{file.name}</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-4">{file.type} Document</p>
              <div className="flex items-center justify-between text-[10px] pt-3 border-t border-slate-100">
                <span className="text-blue-600 font-black flex items-center gap-1">
                   <Download className="w-3 h-3" /> EXPORT
                </span>
                <Clock className="w-3 h-3 text-slate-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Compilation Section */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="bg-emerald-800 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Layers className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-tight">Activity Compilation & Storage</h3>
              <p className="text-[10px] text-emerald-200 font-bold uppercase">Orderly Organized Files & Resource Packages</p>
            </div>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-300" />
            <input 
              type="text" 
              placeholder="Search Activities..." 
              className="pl-9 pr-4 py-2 bg-emerald-900/40 border border-emerald-700/50 rounded-xl text-[10px] font-bold text-white placeholder-emerald-400 outline-none focus:ring-2 focus:ring-emerald-400 w-48"
            />
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
           {activityBatches.map(batch => (
             <div key={batch.name} className="flex items-center justify-between p-5 bg-stone-50 rounded-3xl border border-stone-100 group hover:border-emerald-200 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                      <FolderOpen className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="text-sm font-black text-slate-800">{batch.name}</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">{batch.count} Items • Updated {batch.lastAdded}</p>
                   </div>
                </div>
                <button className="p-2.5 bg-white hover:bg-emerald-50 rounded-xl border border-stone-200 group-hover:border-emerald-300 text-slate-400 group-hover:text-emerald-600 transition-all shadow-xs">
                   <ChevronRight className="w-5 h-5" />
                </button>
             </div>
           ))}
        </div>
        
        <div className="px-6 pb-6">
           <div className="p-4 bg-blue-50 border-2 border-dashed border-blue-200 rounded-3xl flex items-center justify-center gap-3 text-blue-800">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <p className="text-xs font-black uppercase tracking-tight">Need a new batch? Use the LAS Generator to create custom activity sheets.</p>
           </div>
        </div>
      </div>
    </div>
  );
};
