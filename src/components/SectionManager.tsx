import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  BookOpen, 
  FileText, 
  Building, 
  GraduationCap, 
  UserCheck, 
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react';
import { ALL_LNNCHS_SECTIONS, CONSOLIDATED_LIS_STUDENTS, SectionDefinition, LISStudentMasterRecord } from '../data/lnnchsCompleteSectionsDirectory';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

interface SectionManagerProps {
  currentUser: {
    name: string;
    email: string;
    role: 'master_creator' | 'adviser' | 'non_adviser';
    section?: string;
  };
}

export const SectionManager: React.FC<SectionManagerProps> = ({ currentUser }) => {
  const [sections, setSections] = useState<SectionDefinition[]>(ALL_LNNCHS_SECTIONS);
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMasterCreator] = useState(currentUser.role === 'master_creator' || currentUser.email === 'boisersteavenkinth@gmail.com');
  
  // Modal / Editing State
  const [editingSection, setEditingSection] = useState<SectionDefinition | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New Section Form State
  const [newSectionId, setNewSectionId] = useState('');
  const [newSectionName, setNewSectionName] = useState('');
  const [newGradeLevel, setNewGradeLevel] = useState<any>('7');
  const [newAdviserName, setNewAdviserName] = useState('');
  const [newAdviserEmail, setNewAdviserEmail] = useState('');
  const [newRoom, setNewRoom] = useState('Room 101');
  const [newTrack, setNewTrack] = useState('General Academic');

  useEffect(() => {
    // Load from localStorage or Firestore if available
    const saved = localStorage.getItem('lnnchs_managed_sections');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSections(parsed);
        } else {
          setSections(ALL_LNNCHS_SECTIONS);
        }
      } catch (e) {
        console.error('Failed to parse saved sections', e);
        setSections(ALL_LNNCHS_SECTIONS);
      }
    } else {
      setSections(ALL_LNNCHS_SECTIONS);
    }
  }, []);

  const saveToStorage = (updatedSections: SectionDefinition[]) => {
    setSections(updatedSections);
    localStorage.setItem('lnnchs_managed_sections', JSON.stringify(updatedSections));
  };

  const showNotification = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const handleSaveNewSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMasterCreator) {
      showNotification('error', 'Only the Master Creator can create or modify sections.');
      return;
    }
    if (!newSectionName.trim() || !newAdviserName.trim()) {
      showNotification('error', 'Please provide section name and adviser name.');
      return;
    }

    const createdSection: SectionDefinition = {
      id: newSectionId.trim() || `sec-${newGradeLevel}-${Date.now().toString().slice(-4)}`,
      sectionId: newSectionId.trim() || `SEC-${newGradeLevel}-${Date.now().toString().slice(-4)}`,
      sectionName: newSectionName.trim(),
      gradeLevel: String(newGradeLevel).startsWith('Grade') ? newGradeLevel : `Grade ${newGradeLevel}`,
      adviserName: newAdviserName.trim(),
      adviserEmail: newAdviserEmail.trim() || `${newAdviserName.toLowerCase().replace(/[^a-z]/g, '')}@deped.gov.ph`,
      roomAssignment: newRoom.trim(),
      trackOrStrand: newTrack,
      studentCount: 40,
      students: CONSOLIDATED_LIS_STUDENTS.slice(0, 40).map(s => ({
        ...s,
        section: newSectionName.trim(),
        gradeLevel: String(newGradeLevel)
      }))
    };

    const currentList = Array.isArray(sections) ? sections : ALL_LNNCHS_SECTIONS;
    const updated = [createdSection, ...currentList];
    saveToStorage(updated);
    setIsAddingNew(false);
    setNewSectionName('');
    setNewAdviserName('');
    setNewAdviserEmail('');
    showNotification('success', `Successfully created section "${createdSection.sectionName}" and assigned adviser ${createdSection.adviserName}.`);
  };

  const handleDeleteSection = (sectionId: string) => {
    if (!isMasterCreator) {
      showNotification('error', 'Only the Master Creator can delete sections.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this official section?')) {
      const currentList = Array.isArray(sections) ? sections : ALL_LNNCHS_SECTIONS;
      const updated = currentList.filter(s => (s.sectionId || s.id) !== sectionId);
      saveToStorage(updated);
      showNotification('success', 'Section successfully removed.');
    }
  };

  // Filter sections safely
  const sectionList = Array.isArray(sections) ? sections : ALL_LNNCHS_SECTIONS;
  const filteredSections = sectionList.filter(sec => {
    const rawGrade = String(sec.gradeLevel || '').replace(/[^0-9]/g, '');
    const matchesGrade = selectedGradeFilter === 'all' || rawGrade === selectedGradeFilter || String(sec.gradeLevel) === selectedGradeFilter;
    const matchesSearch = 
      (sec.sectionName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sec.adviserName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sec.sectionId || sec.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      ((sec.trackOrStrand || sec.trackStrand || '')).toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  // Check if current user is allowed to view data for a specific section
  const canAccessSection = (sec: SectionDefinition) => {
    if (isMasterCreator) return true;
    if (currentUser.role === 'adviser') {
      const advName = (sec.adviserName || '').toLowerCase();
      const advEmail = (sec.adviserEmail || '').toLowerCase();
      const curName = (currentUser.name || '').toLowerCase();
      const curEmail = (currentUser.email || '').toLowerCase();
      return (advName && curName && advName === curName) || 
             (advEmail && curEmail && advEmail === curEmail);
    }
    return false;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#092B62] via-[#0d3b82] to-[#1254b8] p-6 sm:p-8 text-white shadow-xl border border-blue-400/30">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-cyan-200 text-xs font-black tracking-wide">
              <ShieldCheck className="w-4 h-4 text-cyan-300" />
              <span>LNNCHS OFFICIAL SECTION &amp; ADVISER MANAGER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              🏫 Grade 7 to 12 Fixed Sectioning &amp; LIS Directory
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
              Manage official section definitions, track/strands, room assignments, and assigned advisers with strict data privacy enforcing SF1–SF10 visibility exclusively for the assigned adviser and Master Creator.
            </p>
          </div>

          {isMasterCreator && (
            <button
              onClick={() => setIsAddingNew(true)}
              className="px-5 py-3 bg-[#FCD116] hover:bg-amber-400 text-stone-950 font-black rounded-2xl shadow-lg flex items-center gap-2 transition cursor-pointer shrink-0 text-xs uppercase tracking-wider"
            >
              <Plus className="w-4 h-4 text-stone-950" />
              <span>Define New Section</span>
            </button>
          )}
        </div>
      </div>

      {/* Status Alert */}
      {statusMsg && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-bold ${
          statusMsg.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border border-red-500/30 text-red-300'
        }`}>
          {statusMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Controls / Filters */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Grade Level Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {['all', '7', '8', '9', '10', '11', '12'].map(grade => (
            <button
              key={grade}
              onClick={() => setSelectedGradeFilter(grade)}
              className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer whitespace-nowrap ${
                selectedGradeFilter === grade
                  ? 'bg-[#092B62] text-white shadow'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {grade === 'all' ? 'All Grades (7-12)' : `Grade ${grade}`}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search section name, adviser..."
            className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Add New Section Modal */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <h3 className="text-base font-black text-[#092B62] flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-500" />
                <span>Define New LNNCHS Section</span>
              </h3>
              <button 
                onClick={() => setIsAddingNew(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNewSection} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-black uppercase text-stone-600 mb-1">Grade Level</label>
                  <select
                    value={newGradeLevel}
                    onChange={(e) => setNewGradeLevel(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-800 focus:ring-2 focus:ring-blue-600"
                  >
                    {[7, 8, 9, 10, 11, 12].map(g => (
                      <option key={g} value={g}>Grade {g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase text-stone-600 mb-1">Section ID Code</label>
                  <input
                    type="text"
                    value={newSectionId}
                    onChange={(e) => setNewSectionId(e.target.value)}
                    placeholder="e.g. G7-SEC-01"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-stone-600 mb-1">Official Section Name</label>
                <input
                  type="text"
                  required
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  placeholder="e.g. Grade 7 - Diamond / STEM 11-A"
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-black uppercase text-stone-600 mb-1">Assigned Adviser Name</label>
                  <input
                    type="text"
                    required
                    value={newAdviserName}
                    onChange={(e) => setNewAdviserName(e.target.value)}
                    placeholder="e.g. Mrs. Roselyn Rufino"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase text-stone-600 mb-1">DepEd Email</label>
                  <input
                    type="email"
                    value={newAdviserEmail}
                    onChange={(e) => setNewAdviserEmail(e.target.value)}
                    placeholder="teacher@deped.gov.ph"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-black uppercase text-stone-600 mb-1">Room Assignment</label>
                  <input
                    type="text"
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    placeholder="e.g. Room 204"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase text-stone-600 mb-1">Track / Strand</label>
                  <input
                    type="text"
                    value={newTrack}
                    onChange={(e) => setNewTrack(e.target.value)}
                    placeholder="e.g. Academic - STEM / Regular JHS"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-800"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold hover:bg-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#092B62] text-white text-xs font-black shadow-md hover:bg-blue-900"
                >
                  Save &amp; Register Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSections.map(sec => {
          const hasAccess = canAccessSection(sec);
          const sid = sec.sectionId || sec.id;
          return (
            <div 
              key={sid}
              className={`bg-white rounded-3xl p-6 border shadow-sm transition hover:shadow-md flex flex-col justify-between ${
                hasAccess ? 'border-blue-200 ring-1 ring-blue-500/20' : 'border-stone-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#092B62] text-xs font-black tracking-wider">
                    Grade {sec.gradeLevel} • {sid}
                  </span>
                  <div className="flex items-center gap-1">
                    {hasAccess ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-700 text-[10px] font-black flex items-center gap-1">
                        <Unlock className="w-3 h-3" /> Access Granted
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-400/30 text-red-700 text-[10px] font-black flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Restricted
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-black text-stone-900 mb-1">
                  {sec.sectionName}
                </h3>
                <p className="text-xs text-stone-500 font-medium mb-4 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-stone-400" />
                  <span>{sec.roomAssignment || 'Main Campus'} • {sec.trackOrStrand || 'Junior High'}</span>
                </p>

                <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200 space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-medium flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-blue-600" /> Assigned Adviser:
                    </span>
                    <span className="font-extrabold text-[#092B62]">{sec.adviserName}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-medium flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-cyan-600" /> LIS Enrollees:
                    </span>
                    <span className="font-extrabold text-stone-800">{sec.studentCount || sec.students?.length || 40} Students</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                {hasAccess ? (
                  <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> SF1–SF10 Accessible
                  </div>
                ) : (
                  <div className="text-[11px] font-bold text-stone-400 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Adviser / Master Only
                  </div>
                )}

                {isMasterCreator && (
                  <button
                    onClick={() => handleDeleteSection(sid)}
                    className="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition cursor-pointer"
                    title="Delete Section"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
