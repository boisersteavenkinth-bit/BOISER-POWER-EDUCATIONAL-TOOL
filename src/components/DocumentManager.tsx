import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  FolderOpen, 
  CheckCircle, 
  AlertTriangle,
  Calculator,
  RefreshCw,
  FileSpreadsheet,
  BookOpen,
  Presentation
} from 'lucide-react';

interface DocumentManagerProps {
  sectionName: string;
}

export const DocumentManager: React.FC<DocumentManagerProps> = ({ sectionName }) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncDrive = () => {
    setIsSyncing(true);
    // Simulate API call to Google Drive
    setTimeout(() => {
      setIsSyncing(false);
      alert('Automatically synced with DepEd Google Drive: LIS & RUTE exams updated.');
    }, 2000);
  };

  const docCategories = [
    { name: 'SF-1-10 Reports', icon: FileSpreadsheet },
    { name: 'DLL & Lesson Plans', icon: BookOpen },
    { name: 'ECR (Gradebooks)', icon: FileSpreadsheet },
    { name: 'Summative Tests', icon: FileText },
    { name: 'Item Analysis', icon: Calculator },
    { name: 'Table of Specifications (TOS)', icon: FileText },
    { name: 'BOW w/ Competencies', icon: FileText },
    { name: 'Presentation (PPT)', icon: Presentation },
    { name: 'Grading Results', icon: FileSpreadsheet },
    { name: 'Blank Scanning Sheets', icon: FileText },
    { name: 'Answer Keys', icon: CheckCircle }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between bg-stone-900 text-white p-6 rounded-3xl border-2 border-stone-800 shadow-xl">
        <div>
          <h3 className="text-lg font-black flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-amber-400" />
            <span>Document Manager: {sectionName}</span>
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            Secure offline document repository with automatic Google Drive sync for LIS & RUTE exams.
          </p>
        </div>
        <button 
          onClick={handleSyncDrive}
          className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition ${isSyncing ? 'bg-amber-600' : 'bg-blue-700 hover:bg-blue-800'}`}
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Syncing...' : 'Sync with DepEd Drive'}
        </button>
      </div>

      <div className="bg-blue-50 p-6 rounded-3xl border border-blue-200">
        <h4 className="text-sm font-black text-blue-900 mb-2 flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-blue-700" />
          <span>Orderly Document Governance</span>
        </h4>
        <p className="text-xs text-blue-800">
          All essential files—SF1–SF10, ECRs, ILAW lesson plans, TOS, and Gradebooks—are now structured and easily accessible within this private residence door.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {docCategories.map(cat => {
          const Icon = cat.icon;
          return (
            <div key={cat.name} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-amber-400 transition group">
              <Icon className="w-6 h-6 text-blue-700 mb-3 group-hover:text-amber-600" />
              <h4 className="text-xs font-black text-stone-900 mb-3">{cat.name}</h4>
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg text-[10px] font-bold text-stone-700">Upload</button>
                <button className="flex-1 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg text-[10px] font-bold text-stone-700">Download</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-amber-50 p-6 rounded-3xl border border-amber-200">
        <h4 className="text-sm font-black text-amber-900 mb-4 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-amber-700" />
          <span>RUTE Fact-Check & Item Analysis</span>
        </h4>
        <p className="text-xs text-amber-800 mb-4">
          Upload RUTE/Summative test results to generate Item Analysis and perform fact-checking (Math/Physics).
        </p>
        <button className="px-4 py-2 bg-amber-600 text-white text-xs font-black rounded-xl hover:bg-amber-700">
          Run Analysis & Verification
        </button>
      </div>
    </div>
  );
};
