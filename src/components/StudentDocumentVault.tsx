import React, { useState, useEffect } from 'react';
import {
  FolderOpen,
  FileText,
  Upload,
  Download,
  Trash2,
  Calendar,
  CheckCircle2,
  FileSpreadsheet,
  Presentation,
  BookOpen,
  Award,
  Layers,
  Sparkles,
  Plus,
  ShieldCheck,
  Eye
} from 'lucide-react';

interface VaultDocument {
  id: string;
  category: string;
  title: string;
  fileName: string;
  uploadDate: string;
  size: string;
  fileType: string;
  dataUrl?: string;
}

interface StudentDocumentVaultProps {
  sectionName?: string;
  gradeLevel?: string;
  teacherName?: string;
}

const CATEGORIES = [
  { id: 'sf_1_10', name: 'SF 1 to SF 10 School Forms', icon: FileSpreadsheet, color: 'bg-blue-50 text-blue-800 border-blue-200' },
  { id: 'dll', name: 'Daily Lesson Log (DLL)', icon: FileText, color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
  { id: 'lesson_plan', name: 'ILAW Lesson Plan Exemplars', icon: BookOpen, color: 'bg-amber-50 text-amber-800 border-amber-200' },
  { id: 'ecr', name: 'Electronic Class Record (ECR)', icon: FileSpreadsheet, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  { id: 'summative', name: 'Summative Tests & Periodicals', icon: Award, color: 'bg-purple-50 text-purple-800 border-purple-200' },
  { id: 'item_analysis', name: 'Item Analysis Reports', icon: Layers, color: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
  { id: 'tos', name: 'Table of Specifications (TOS)', icon: Sparkles, color: 'bg-rose-50 text-rose-800 border-rose-200' },
  { id: 'bow', name: 'Budget of Work (BOW)', icon: Calendar, color: 'bg-teal-50 text-teal-800 border-teal-200' },
  { id: 'ppt', name: 'Companion PPT Decks', icon: Presentation, color: 'bg-orange-50 text-orange-800 border-orange-200' },
  { id: 'grading_results', name: 'Grading Results & Transmutation', icon: FileText, color: 'bg-stone-100 text-stone-800 border-stone-300' }
];

export const StudentDocumentVault: React.FC<StudentDocumentVaultProps> = ({
  sectionName = 'Grade 11 - Section A',
  gradeLevel = 'Grade 11',
  teacherName = 'Steaven Kinth D. Boiser'
}) => {
  const [documents, setDocuments] = useState<VaultDocument[]>(() => {
    const saved = localStorage.getItem('lnnchs_student_document_vault');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      { id: 'doc-1', category: 'sf_1_10', title: 'Official SF1 School Register Term 2', fileName: 'SF1_Masterlist_Term2.xlsx', uploadDate: 'Sept. 24, 2026', size: '245 KB', fileType: 'xlsx' },
      { id: 'doc-2', category: 'bow', title: 'SY 2026-2027 Term 2 Budget of Work', fileName: 'BOW_Term2_SY2026.pdf', uploadDate: 'Sept. 20, 2026', size: '512 KB', fileType: 'pdf' },
      { id: 'doc-3', category: 'ppt', title: 'Module 1 Companion PPT Deck (36pt Font)', fileName: 'Module1_Interactive_Deck.pptx', uploadDate: 'Sept. 22, 2026', size: '3.4 MB', fileType: 'pptx' }
    ];
  });

  const [activeCategory, setActiveCategory] = useState<string>('sf_1_10');
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    localStorage.setItem('lnnchs_student_document_vault', JSON.stringify(documents));
  }, [documents]);

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !selectedFile) {
      alert('Please provide a document title and select a file.');
      return;
    }

    const newDoc: VaultDocument = {
      id: 'doc-' + Date.now(),
      category: activeCategory,
      title: uploadTitle.trim(),
      fileName: selectedFile.name,
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      size: `${(selectedFile.size / 1024).toFixed(1)} KB`,
      fileType: selectedFile.name.split('.').pop() || 'file'
    };

    setDocuments([newDoc, ...documents]);
    setUploadTitle('');
    setSelectedFile(null);
    setShowUploadModal(false);
  };

  const deleteDocument = (id: string) => {
    if (confirm('Are you sure you want to delete this document from the vault?')) {
      setDocuments(documents.filter(d => d.id !== id));
    }
  };

  const filteredDocs = documents.filter(d => d.category === activeCategory);
  const currentCategoryInfo = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];
  const CategoryIcon = currentCategoryInfo.icon;

  return (
    <div className="space-y-6">
      {/* Vault Header Banner */}
      <div className="bg-gradient-to-r from-[#092B62] via-[#0E3C84] to-[#1E4E9E] p-6 sm:p-8 text-white rounded-3xl shadow-xl border-b-4 border-[#FCD116] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              LNNCHS Secure Local Document Vault • {sectionName}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <FolderOpen className="w-8 h-8 text-amber-300" />
              <span>Teacher Local Document &amp; File Repository</span>
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
              Clean, orderly, offline-ready document management for SF1–SF10, DLL, ILAW Lesson Plans, ECR, Summative Tests, Item Analysis, TOS, BOW, PPT Decks, and Grading Results.
            </p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs sm:text-sm rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Upload / Insert Document</span>
          </button>
        </div>
      </div>

      {/* DepEd 2026-2027 Calendar & Overview Strip */}
      <div className="bg-stone-50 border-2 border-stone-200 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#092B62] flex items-center justify-center font-bold">
            <Calendar className="w-5 h-5 text-blue-800" />
          </div>
          <div>
            <div className="text-xs font-black text-stone-900">DepEd Order No. 9, s. 2026 Academic Calendar Active</div>
            <div className="text-[11px] text-stone-500">Term 1 (June 15 – Sept 1) • Term 2 (Sept 16 – Dec 4) • Term 3 (Jan 4 – Mar 23)</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-stone-700">
          <span className="px-3 py-1 bg-white border border-stone-300 rounded-xl">Teacher: {teacherName}</span>
          <span className="px-3 py-1 bg-white border border-stone-300 rounded-xl">Total Files: {documents.length}</span>
        </div>
      </div>

      {/* Categorized Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const count = documents.filter(d => d.category === cat.id).length;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between gap-3 cursor-pointer ${
                isActive
                  ? 'bg-[#092B62] text-white border-[#092B62] shadow-md ring-2 ring-blue-300'
                  : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? 'bg-white/20 text-white' : cat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-amber-400 text-stone-950' : 'bg-stone-100 text-stone-700'}`}>
                  {count}
                </span>
              </div>
              <div className="text-xs font-black leading-snug">{cat.name}</div>
            </button>
          );
        })}
      </div>

      {/* Active Category Files Container */}
      <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${currentCategoryInfo.color}`}>
              <CategoryIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-stone-900">{currentCategoryInfo.name}</h3>
              <p className="text-xs text-stone-500">Manage and organize your local files for this category</p>
            </div>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-[#092B62] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-amber-300" />
            <span>Upload to {currentCategoryInfo.name}</span>
          </button>
        </div>

        {filteredDocs.length === 0 ? (
          <div className="p-12 text-center bg-stone-50 rounded-2xl border-2 border-dashed border-stone-300 space-y-3">
            <FolderOpen className="w-12 h-12 text-stone-400 mx-auto" />
            <div className="text-sm font-bold text-stone-700">No documents found in {currentCategoryInfo.name}</div>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Click the upload button above to insert files, worksheets, spreadsheets, or presentations into this vault category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDocs.map(doc => (
              <div key={doc.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-blue-300 transition flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs uppercase">
                    {doc.fileType}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-stone-900">{doc.title}</h4>
                    <p className="text-[11px] text-stone-500 font-mono">{doc.fileName} • {doc.size}</p>
                    <span className="text-[10px] text-stone-400">Uploaded on {doc.uploadDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`Downloading ${doc.fileName}...`)}
                    className="p-2 bg-white border border-stone-300 hover:bg-stone-100 rounded-xl text-stone-700 transition cursor-pointer"
                    title="Download File"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteDocument(doc.id)}
                    className="p-2 bg-white border border-red-200 hover:bg-red-50 rounded-xl text-red-600 transition cursor-pointer"
                    title="Delete File"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl border-2 border-amber-400 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#092B62]" />
                <span>Upload Document to Vault</span>
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-stone-400 hover:text-stone-700 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFileUpload} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-bold mb-1">Target Category:</label>
                <select
                  value={activeCategory}
                  onChange={e => setActiveCategory(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold text-stone-900"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Document Title / Description:</label>
                <input
                  type="text"
                  placeholder="e.g. Quarter 2 Summative Test in Mathematics"
                  value={uploadTitle}
                  onChange={e => setUploadTitle(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold text-stone-900"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Select File (PDF, Word, Excel, PPT):</label>
                <input
                  type="file"
                  onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-[#092B62] file:text-white hover:file:bg-blue-900 cursor-pointer"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#092B62] hover:bg-blue-900 text-white font-black rounded-xl shadow cursor-pointer"
                >
                  Confirm &amp; Insert Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
