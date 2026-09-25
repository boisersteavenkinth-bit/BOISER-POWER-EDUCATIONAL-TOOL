import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Users, 
  DoorOpen, 
  AlarmClock, 
  ShieldAlert, 
  CheckCircle2, 
  UserPlus, 
  ArrowRight,
  Maximize2,
  LayoutGrid,
  Activity,
  UserCheck
} from 'lucide-react';
import { ALL_LNNCHS_SECTIONS, SectionDefinition } from '../data/lnnchsCompleteSectionsDirectory';
import { useAuth } from '../context/AuthContext';

interface SubstitutePortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubstitutePortalModal: React.FC<SubstitutePortalModalProps> = ({ isOpen, onClose }) => {
  const { addSubstitutionPlan, userRegistry, logActivity } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<SectionDefinition | null>(null);
  const [assignmentData, setAssignmentData] = useState({
    substituteEmail: '',
    subject: '',
    content: ''
  });
  const [step, setStep] = useState<'summary' | 'assign'>('summary');
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen) return null;

  const filteredSections = ALL_LNNCHS_SECTIONS.filter(s => 
    s.sectionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.adviserName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssign = () => {
    if (!selectedSection || !assignmentData.substituteEmail || !assignmentData.subject) return;

    addSubstitutionPlan({
      subject: assignmentData.subject,
      section: selectedSection.sectionName,
      substituteTeacherEmail: assignmentData.substituteEmail,
      date: new Date().toLocaleDateString(),
      startTime: '07:30 AM',
      content: assignmentData.content || `Please oversee ${selectedSection.sectionName} for ${assignmentData.subject}. Ensure students stay on task.`
    });

    logActivity('Substitution', 'Assigned via Master Portal', `Assigned ${assignmentData.substituteEmail} to ${selectedSection.sectionName}`);
    
    // Reset and close or show success
    setSelectedSection(null);
    setAssignmentData({ substituteEmail: '', subject: '', content: '' });
    setStep('summary');
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md transition-all ${isFullscreen ? 'p-0' : 'p-4'}`}>
      <div className={`bg-white shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 ${isFullscreen ? 'w-full h-full' : 'w-full max-w-6xl h-[90vh] rounded-3xl border-4 border-blue-600'}`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#001f5c] via-[#0038A8] to-[#001440] p-6 text-white flex items-center justify-between border-b-4 border-[#FCD116]">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
              <ShieldAlert className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Master Creator Substitution Portal</h2>
              <p className="text-xs text-blue-200 font-bold">LNNCHS Faculty Neighborhood Real-Time Control Node</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition border border-white/20"
              title="Toggle Full Screen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose}
              className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col sm:flex-row">
          
          {/* Left Side: Summary / List of Doors */}
          <div className={`flex-1 overflow-y-auto p-6 space-y-6 ${step === 'assign' ? 'hidden md:block' : 'block'}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 bg-white pb-4 z-10">
              <div className="flex items-center gap-3">
                <LayoutGrid className="w-5 h-5 text-blue-600" />
                <h3 className="font-black text-stone-900 uppercase">Masters Doors Summary Preview</h3>
              </div>
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input 
                  type="text" 
                  placeholder="Search faculty or section..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-stone-100 border border-stone-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSections.map(sec => (
                <div 
                  key={sec.id}
                  onClick={() => { setSelectedSection(sec); setStep('assign'); }}
                  className={`p-4 rounded-2xl border-2 transition group cursor-pointer ${selectedSection?.id === sec.id ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-stone-100 hover:border-blue-300 hover:shadow-md'}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-black uppercase tracking-wider">
                      {sec.gradeLevel}
                    </div>
                    <DoorOpen className={`w-4 h-4 ${selectedSection?.id === sec.id ? 'text-blue-600' : 'text-stone-300 group-hover:text-blue-400'} transition`} />
                  </div>
                  <h4 className="font-black text-stone-900 truncate">{sec.sectionName}</h4>
                  <p className="text-[11px] text-stone-500 font-bold mb-3">{sec.adviserName}</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-stone-50 rounded-xl text-center">
                      <div className="text-[8px] uppercase text-stone-400 font-black">Learners</div>
                      <div className="text-xs font-black text-stone-700">{sec.totalLearners}</div>
                    </div>
                    <div className="p-2 bg-stone-50 rounded-xl text-center">
                      <div className="text-[8px] uppercase text-stone-400 font-black">Room</div>
                      <div className="text-xs font-black text-stone-700 truncate">{sec.roomNumber?.split(' ')[0]}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Door Secured
                    </span>
                    <button className="text-[10px] font-black text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      ASSIGN SUB <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Assignment Panel */}
          <div className={`w-full md:w-96 bg-stone-50 border-l border-stone-200 flex flex-col ${step === 'summary' ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-6 bg-white border-b border-stone-200">
              <div className="flex items-center gap-3 mb-1">
                <UserPlus className="w-5 h-5 text-blue-600" />
                <h3 className="font-black text-stone-900 uppercase">Assignment Node</h3>
              </div>
              <p className="text-[10px] text-stone-500 font-bold">Configure substitution alert & portal signal</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {!selectedSection ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <DoorOpen className="w-16 h-16 text-stone-300" />
                  <p className="text-xs font-bold text-stone-500">Select a door from the preview to begin substitution assignment</p>
                </div>
              ) : (
                <>
                  {/* Selected Section Summary */}
                  <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-lg">
                    <div className="text-[10px] uppercase font-black text-blue-200 mb-1">Target Section</div>
                    <h4 className="text-lg font-black">{selectedSection.sectionName}</h4>
                    <div className="text-xs font-bold opacity-90">{selectedSection.adviserName}</div>
                  </div>

                  {/* Form */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest ml-1">Substitute Teacher (DepEd Email)</label>
                      <select 
                        value={assignmentData.substituteEmail}
                        onChange={(e) => setAssignmentData({ ...assignmentData, substituteEmail: e.target.value })}
                        className="w-full p-3 bg-white border-2 border-stone-200 rounded-2xl text-xs font-bold focus:border-blue-600 transition outline-hidden"
                      >
                        <option value="">Select available faculty...</option>
                        {userRegistry.map(u => (
                          <option key={u.email} value={u.email}>{u.name} ({u.email})</option>
                        ))}
                        {/* Mock options if registry is empty */}
                        {userRegistry.length === 0 && (
                          <>
                            <option value="teacher.rox@deped.gov.ph">SHS Teacher Account (Mock)</option>
                            <option value="assistant.rox@deped.gov.ph">Teaching Assistant (Mock)</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest ml-1">Assigned Subject</label>
                      <input 
                        type="text"
                        placeholder="e.g., General Mathematics"
                        value={assignmentData.subject}
                        onChange={(e) => setAssignmentData({ ...assignmentData, subject: e.target.value })}
                        className="w-full p-3 bg-white border-2 border-stone-200 rounded-2xl text-xs font-bold focus:border-blue-600 transition outline-hidden"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest ml-1">Instruction / Content</label>
                      <textarea 
                        rows={4}
                        placeholder="Provide specific instructions for the substitute..."
                        value={assignmentData.content}
                        onChange={(e) => setAssignmentData({ ...assignmentData, content: e.target.value })}
                        className="w-full p-3 bg-white border-2 border-stone-200 rounded-2xl text-xs font-bold focus:border-blue-600 transition outline-hidden resize-none"
                      />
                    </div>

                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                      <div className="flex items-center gap-2 text-amber-800">
                        <Activity className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase">Alarm Configuration</span>
                      </div>
                      <p className="text-[9px] text-amber-700 leading-relaxed font-bold italic">
                        "Choosing a teacher will automatically trigger a 🚨 WARNING ALARM and warning signal on their dashboard."
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="p-6 bg-white border-t border-stone-200 flex gap-2">
              {step === 'assign' && (
                <button 
                  onClick={() => setStep('summary')}
                  className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-black rounded-2xl transition md:hidden"
                >
                  BACK
                </button>
              )}
              <button 
                disabled={!selectedSection || !assignmentData.substituteEmail || !assignmentData.subject}
                onClick={handleAssign}
                className={`flex-[2] py-3 text-xs font-black rounded-2xl transition shadow-lg flex items-center justify-center gap-2 ${(!selectedSection || !assignmentData.substituteEmail || !assignmentData.subject) ? 'bg-stone-200 text-stone-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                <AlarmClock className="w-4 h-4" />
                <span>ACTIVATE SIGNAL</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
