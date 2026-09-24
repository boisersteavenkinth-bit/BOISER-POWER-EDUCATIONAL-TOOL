import React, { useState } from 'react';
import { Database, ShieldCheck, FolderGit2, BookOpen, Lightbulb, Archive, Settings, CheckCircle2, AlertTriangle, Search, Plus, RefreshCw, Cpu, FileText } from 'lucide-react';

interface VaultRecord {
  id: string;
  title: string;
  category: string;
  recordType: 'Knowledge Library' | 'Innovation Lab' | 'Project Memory' | 'Verification Center' | 'User Preferences' | 'Archive';
  description: string;
  practicalUse: string;
  source: string;
  verificationStatus: 'Verified' | 'Pending Review' | 'Outdated' | 'Suggestion';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt: string;
}

export const DataVaultModule: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'all' | 'Knowledge Library' | 'Innovation Lab' | 'Project Memory' | 'Verification Center' | 'User Preferences' | 'Archive'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);

  // New record form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Education');
  const [newRecordType, setNewRecordType] = useState<'Knowledge Library' | 'Innovation Lab' | 'Project Memory' | 'Verification Center' | 'User Preferences' | 'Archive'>('Innovation Lab');
  const [newDesc, setNewDesc] = useState('');
  const [newPractical, setNewPractical] = useState('');
  const [newPriority, setNewPriority] = useState<'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');

  const [records, setRecords] = useState<VaultRecord[]>([
    {
      id: 'BPT-VAULT-2026-001',
      title: 'DepEd Order No. 3, s. 2026 ILAW & MATATAG Compliance Standard',
      category: 'Education',
      recordType: 'Knowledge Library',
      description: 'Official framework for Instructional Leadership and Academic Workflow (ILAW) and MATATAG curriculum guidelines.',
      practicalUse: 'Guides automated Daily Lesson Log (DLL) and lesson plan generation across all grade levels.',
      source: 'DepEd Central Office (steavenkinth.boiser@deped.gov.ph)',
      verificationStatus: 'Verified',
      priority: 'CRITICAL',
      createdAt: '2026-09-23'
    },
    {
      id: 'BPT-VAULT-2026-002',
      title: 'Dual Google Drive Account Integration (DepEd & Gmail)',
      category: 'Technology',
      recordType: 'User Preferences',
      description: 'Seamless synchronization across steavenkinth.boiser@deped.gov.ph and boisersteavenkinth@gmail.com Drive repositories.',
      practicalUse: 'Accesses shared SSHS Lesson Exemplars and Learning Activity Sheets from multiple cloud spaces.',
      source: 'Google Workspace OAuth API',
      verificationStatus: 'Verified',
      priority: 'HIGH',
      createdAt: '2026-09-23'
    },
    {
      id: 'BPT-VAULT-2026-003',
      title: 'AI-Powered Cross-Disciplinary Project-Based Learning Matrix',
      category: 'Innovation',
      recordType: 'Innovation Lab',
      description: 'Generates integrated STEM capstone projects combining Mathematics, Physical Science, and Technical-Vocational skills.',
      practicalUse: 'Enhances student engagement through real-world problem-solving in Lanao del Norte.',
      source: 'Opus & Claude Advanced Cognitive Frameworks',
      verificationStatus: 'Pending Review',
      priority: 'HIGH',
      createdAt: '2026-09-23'
    },
    {
      id: 'BPT-VAULT-2026-004',
      title: 'Biometric & PIN Security Gate',
      category: 'Security',
      recordType: 'Project Memory',
      description: 'Client-side authentication shield protecting sensitive teacher gradebooks and curriculum databases.',
      practicalUse: 'Ensures confidentiality of student records on shared devices.',
      source: 'Boiser Power Tools Core Architecture',
      verificationStatus: 'Verified',
      priority: 'CRITICAL',
      createdAt: '2026-09-23'
    }
  ]);

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const record: VaultRecord = {
      id: `BPT-VAULT-2026-00${records.length + 1}`,
      title: newTitle,
      category: newCategory,
      recordType: newRecordType,
      description: newDesc || 'No description provided.',
      practicalUse: newPractical || 'Standard practical application.',
      source: 'User Workspace (boisersteavenkinth@gmail.com / steavenkinth.boiser@deped.gov.ph)',
      verificationStatus: 'Verified',
      priority: newPriority,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setRecords([record, ...records]);
    setNewTitle('');
    setNewDesc('');
    setNewPractical('');
    setShowNewModal(false);
  };

  const filteredRecords = records.filter(r => {
    const matchesSection = activeSection === 'all' || r.recordType === activeSection;
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.description.toLowerCase().includes(searchTerm.toLowerCase()) || r.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSection && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#092B62] via-[#0b4ea2] to-indigo-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
              <Database className="w-6 h-6 text-cyan-300" />
            </span>
            <span className="text-xs uppercase font-extrabold tracking-wider text-cyan-200">Boiser Data Vault Intelligence System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Ultimate Knowledge Vault & Innovation Memory
          </h1>
          <p className="text-sm text-blue-100 max-w-2xl leading-relaxed">
            Centralized memory organization, secure knowledge storage, and innovation management across <span className="font-semibold text-cyan-200">steavenkinth.boiser@deped.gov.ph</span> and <span className="font-semibold text-cyan-200">boisersteavenkinth@gmail.com</span>.
          </p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-stone-900 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Innovation Intake</span>
        </button>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#dce3ee] rounded-3xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-bold text-stone-500 uppercase">Total Records</span>
          <p className="text-2xl font-black text-[#092B62]">{records.length}</p>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Fully Synchronized
          </span>
        </div>
        <div className="bg-white border border-[#dce3ee] rounded-3xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-bold text-stone-500 uppercase">Knowledge Library</span>
          <p className="text-2xl font-black text-[#0b4ea2]">
            {records.filter(r => r.recordType === 'Knowledge Library').length}
          </p>
          <span className="text-[11px] text-stone-500 font-medium">Verified Policies & Standards</span>
        </div>
        <div className="bg-white border border-[#dce3ee] rounded-3xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-bold text-stone-500 uppercase">Innovation Lab</span>
          <p className="text-2xl font-black text-purple-600">
            {records.filter(r => r.recordType === 'Innovation Lab').length}
          </p>
          <span className="text-[11px] text-stone-500 font-medium">Active Ideas & Prototypes</span>
        </div>
        <div className="bg-white border border-[#dce3ee] rounded-3xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-bold text-stone-500 uppercase">Google Drive Accounts</span>
          <p className="text-xl font-black text-emerald-600 truncate">Dual Active</p>
          <span className="text-[11px] text-stone-500 font-medium truncate block" title="deped & gmail">DepEd & Gmail Connected</span>
        </div>
      </div>

      {/* Section Navigation Tabs & Search */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white border border-[#dce3ee] p-4 rounded-3xl shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'All Records', icon: Database },
            { id: 'Knowledge Library', label: 'Knowledge Library', icon: BookOpen },
            { id: 'Innovation Lab', label: 'Innovation Lab', icon: Lightbulb },
            { id: 'Project Memory', label: 'Project Memory', icon: FolderGit2 },
            { id: 'Verification Center', label: 'Verification Center', icon: ShieldCheck },
            { id: 'User Preferences', label: 'User Preferences', icon: Settings },
            { id: 'Archive', label: 'Archive', icon: Archive }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#092B62] text-white shadow-md'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-300' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search vault records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRecords.map(record => (
          <div key={record.id} className="bg-white border border-[#dce3ee] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 bg-blue-50 text-[#092B62] border border-blue-200 rounded-xl text-[11px] font-black uppercase">
                  {record.recordType}
                </span>
                <span className={`px-2.5 py-1 rounded-xl text-[11px] font-black ${
                  record.priority === 'CRITICAL' ? 'bg-red-50 text-red-700 border border-red-200' :
                  record.priority === 'HIGH' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                  'bg-stone-100 text-stone-700'
                }`}>
                  {record.priority}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-black text-[#092B62] leading-snug">{record.title}</h3>
                <span className="text-[11px] font-bold text-stone-400 font-mono">{record.id}</span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">{record.description}</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-stone-100 text-xs">
              <div className="bg-stone-50 p-3 rounded-2xl space-y-1">
                <span className="font-bold text-stone-700 block">Practical Application:</span>
                <p className="text-stone-600">{record.practicalUse}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
                <span className="truncate max-w-[220px]" title={record.source}>Source: {record.source}</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {record.verificationStatus}
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredRecords.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white border border-dashed border-stone-300 rounded-3xl space-y-3">
            <Database className="w-10 h-10 text-stone-400 mx-auto" />
            <h3 className="text-base font-bold text-stone-700">No records found matching your query</h3>
            <p className="text-xs text-stone-500">Try adjusting your search terms or create a new innovation intake proposal.</p>
          </div>
        )}
      </div>

      {/* Firestore Schema Hierarchy Explorer */}
      <div className="bg-white border border-[#dce3ee] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-[#092B62] flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-600" />
              <span>Boilerplate Firestore Schema Tree (`boiser-power-tools/`)</span>
            </h3>
            <p className="text-xs text-stone-500">Official hierarchical collection structure implemented for Boiser Power Tools knowledge storage.</p>
          </div>
          <span className="px-3 py-1 bg-purple-50 text-purple-800 border border-purple-200 rounded-xl text-[11px] font-black">
            Active Schema
          </span>
        </div>

        <pre className="text-xs font-mono bg-stone-950 text-cyan-300 p-5 rounded-2xl overflow-x-auto leading-relaxed">
{`boiser-power-tools/
│
├── users/{uid}
├── userPreferences/{uid}
│
├── categories/{categoryId}
├── tags/{tagId}
│
├── knowledgeRecords/{recordId}
├── knowledgeSources/{sourceId}
├── knowledgeRecords/{recordId}/reviews/{reviewId}
├── knowledgeRecords/{recordId}/relations/{relationId}
│
├── innovationProposals/{proposalId}
├── projects/{projectId}
├── projects/{projectId}/records/{recordId}
│
├── vaultFiles/{fileId}
├── auditLogs/{logId}
│
└── systemConfig/{configId}`}
        </pre>
      </div>

      {/* New Innovation Intake Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="space-y-1">
                <h2 className="text-lg font-black text-[#092B62]">Create Innovation Intake Proposal</h2>
                <p className="text-xs text-stone-500">Add new knowledge, teaching tool, or idea to the Boiser Data Vault.</p>
              </div>
              <button
                onClick={() => setShowNewModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddRecord} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. AI-Assisted Automated Rubric Evaluator..."
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Vault Section</label>
                  <select
                    value={newRecordType}
                    onChange={(e) => setNewRecordType(e.target.value as any)}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Knowledge Library">Knowledge Library</option>
                    <option value="Innovation Lab">Innovation Lab</option>
                    <option value="Project Memory">Project Memory</option>
                    <option value="Verification Center">Verification Center</option>
                    <option value="User Preferences">User Preferences</option>
                    <option value="Archive">Archive</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Priority Level</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Explain the concept or proposal in detail..."
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Practical Use & Application Feature</label>
                <input
                  type="text"
                  value={newPractical}
                  onChange={(e) => setNewPractical(e.target.value)}
                  placeholder="How does this benefit teachers or students in Boiser Power Tools?"
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0b4ea2] hover:bg-blue-800 text-white rounded-xl font-bold shadow cursor-pointer"
                >
                  Save Record to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
