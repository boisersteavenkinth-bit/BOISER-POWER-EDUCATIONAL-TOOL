import React, { useState } from 'react';
import { 
  User, 
  Link2, 
  Plus, 
  Check, 
  Search, 
  FileCheck, 
  RefreshCw,
  FileText,
  Download,
  FileSpreadsheet,
  Printer,
  Layers,
  School,
  CheckCircle,
  UserCheck
} from 'lucide-react';
import { 
  SchoolFormConfig, 
  SchoolFormRecord, 
  LNNCHS_DEFAULT_CONFIG, 
  LNNCHS_SCHOOL_FORMS_LIST,
  exportLnnchsSFToExcel,
  exportLnnchsSFToPdf,
  exportLnnchsSFToWord
} from '../utils/lnnchsSchoolFormsExporter';

export const SingleSFInspector: React.FC = () => {
  const [selectedFormId, setSelectedFormId] = useState<string>('SF1');
  const [config, setConfig] = useState<SchoolFormConfig>(LNNCHS_DEFAULT_CONFIG);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [studentInputQuery, setStudentInputQuery] = useState<string>('');
  const [suggestedStudents, setSuggestedStudents] = useState<any[]>([]);
  const [selectedConnectedStudent, setSelectedConnectedStudent] = useState<any | null>(null);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [exportSuccessMsg, setExportSuccessMsg] = useState<string | null>(null);

  const handleStudentNameInputChange = async (val: string) => {
    setStudentInputQuery(val);
    if (!val.trim()) {
      setSuggestedStudents([]);
      return;
    }
    const matches = config.records.filter(r => 
      r.name.toLowerCase().includes(val.toLowerCase()) || 
      r.lrn.includes(val)
    );
    setSuggestedStudents(matches);
  };

  const handleSelectStudentForAutoFill = (student: any) => {
    setStudentInputQuery(student.fullName || student.name);
    setSuggestedStudents([]);
    setSelectedConnectedStudent(student);
    setExportSuccessMsg(`✓ Auto-Filled details for ${student.fullName || student.name} across all forms.`);
    setTimeout(() => setExportSuccessMsg(null), 3000);
  };

  const handleExport = async (format: 'docx' | 'pdf' | 'xlsx') => {
    setIsExporting(format);
    try {
      if (format === 'xlsx') exportLnnchsSFToExcel(selectedFormId, config);
      else if (format === 'pdf') exportLnnchsSFToPdf(selectedFormId, config);
      else if (format === 'docx') await exportLnnchsSFToWord(selectedFormId, config);
      setExportSuccessMsg(`✓ Generated LNNCHS ${selectedFormId} successfully!`);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setIsExporting(null), 500);
      setTimeout(() => setExportSuccessMsg(null), 5000);
    }
  };

  const currentFormMeta = LNNCHS_SCHOOL_FORMS_LIST.find(f => f.id === selectedFormId) || LNNCHS_SCHOOL_FORMS_LIST[0];
  const filteredRecords = config.records.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.lrn.includes(searchQuery)
  );

  return (
    <div className="space-y-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 text-blue-900 rounded-2xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Single SF Inspector</h2>
            <p className="text-xs text-slate-500">Cross-reference learner data across all 10 official school forms.</p>
          </div>
        </div>
      </div>

      {/* SEARCH & AUTO-FILL */}
      <div className="relative">
        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Quick Student Inspector:</label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <User className="w-4 h-4 text-blue-700 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={studentInputQuery}
              onChange={(e) => handleStudentNameInputChange(e.target.value)}
              placeholder="Type learner name or LRN to inspect..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl text-xs font-bold focus:bg-white focus:border-blue-900 outline-none transition"
            />
          </div>
        </div>
        {suggestedStudents.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 overflow-hidden divide-y divide-slate-100 max-h-64 overflow-y-auto">
            {suggestedStudents.map((s) => (
              <button
                key={s.lrn}
                onClick={() => handleSelectStudentForAutoFill(s)}
                className="w-full p-3 text-left hover:bg-blue-50 transition flex items-center justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-[10px] text-blue-900">
                    {s.sex}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">{s.name}</div>
                    <div className="text-[10px] font-mono text-slate-500">LRN: {s.lrn}</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-mono font-bold text-[9px]">
                  GWA: {s.genAverage || 91}%
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* FORM SELECTOR */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
        {LNNCHS_SCHOOL_FORMS_LIST.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFormId(f.id)}
            className={`p-2.5 rounded-2xl text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer border ${
              selectedFormId === f.id
                ? 'bg-[#002776] text-white border-[#002776] shadow-sm font-black ring-2 ring-blue-300'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <span className="text-xs font-mono font-bold">{f.id}</span>
          </button>
        ))}
      </div>

      {/* EXPORT ACTIONS */}
      <div className="flex items-center gap-2 flex-wrap">
        <button onClick={() => handleExport('docx')} className="px-4 py-2 bg-blue-800 text-white rounded-xl text-[10px] font-black flex items-center gap-2">
          <FileText size={14} /> WORD
        </button>
        <button onClick={() => handleExport('pdf')} className="px-4 py-2 bg-red-700 text-white rounded-xl text-[10px] font-black flex items-center gap-2">
          <Download size={14} /> PDF
        </button>
        <button onClick={() => handleExport('xlsx')} className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-[10px] font-black flex items-center gap-2">
          <FileSpreadsheet size={14} /> EXCEL
        </button>
      </div>

      {exportSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-[10px] font-bold animate-fade-in flex items-center gap-2">
          <CheckCircle size={14} /> {exportSuccessMsg}
        </div>
      )}

      {/* TABLE PREVIEW */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-[10px] text-left">
          <thead className="bg-slate-100 text-slate-700 font-bold uppercase border-b border-slate-200">
            <tr>
              <th className="p-3">LRN</th>
              <th className="p-3">Learner Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRecords.slice(0, 10).map(r => (
              <tr key={r.lrn} className="hover:bg-slate-50 transition">
                <td className="p-3 font-mono font-bold">{r.lrn}</td>
                <td className="p-3 font-bold">{r.name}</td>
                <td className="p-3"><span className="px-2 py-0.5 bg-blue-50 text-blue-800 rounded-full font-bold">Active</span></td>
                <td className="p-3 text-slate-500 italic">No issues found.</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
