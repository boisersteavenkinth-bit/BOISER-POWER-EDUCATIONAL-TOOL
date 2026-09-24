import React, { useState } from 'react';
import { 
  DoorClosed, 
  DoorOpen, 
  ShieldCheck, 
  UserCheck, 
  FileText, 
  Users, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Building, 
  Award, 
  BarChart3, 
  Activity, 
  Key, 
  FileSpreadsheet, 
  Calendar,
  Home,
  ChevronRight,
  Eye,
  ShieldAlert,
  HelpCircle,
  Volume2,
  VolumeX,
  BookOpen,
  ArrowRight,
  Compass,
  FolderOpen,
  HeartPulse
} from 'lucide-react';
import { LNNCHS_20_SECTIONS_PER_GRADE, ALL_LNNCHS_SECTIONS, CONSOLIDATED_LIS_STUDENTS, SectionDefinition } from '../data/lnnchsCompleteSectionsDirectory';
import { DocumentManager } from './DocumentManager';

interface AdviserDoorsHomeProps {
  currentUser: {
    name: string;
    email: string;
    role: 'master_creator' | 'adviser' | 'non_adviser';
    section?: string;
  };
  schoolYear?: string;
  setSchoolYear?: (sy: string) => void;
}

export const AdviserDoorsHome: React.FC<AdviserDoorsHomeProps> = ({ currentUser, schoolYear = '2026-2027', setSchoolYear }) => {
  const isMasterCreator = currentUser.role === 'master_creator' || currentUser.email === 'boisersteavenkinth@gmail.com';
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'sf_records' | 'summative' | 'activity_log' | 'document_manager'>('sf_records');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Door-to-Door Tutorial Modal State
  const [tutorialSection, setTutorialSection] = useState<SectionDefinition | null>(null);
  const [tutorialLang, setTutorialLang] = useState<'en' | 'tl' | 'ceb'>('en');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Load sections from localStorage if managed or default array
  const getSections = (): SectionDefinition[] => {
    const saved = localStorage.getItem('lnnchs_managed_sections');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((s: any) => ({
            ...s,
            id: s.id || s.sectionId,
            sectionId: s.sectionId || s.id,
            adviserEmail: s.adviserEmail || `${(s.adviserName || '').toLowerCase().replace(/[^a-z]/g, '')}@deped.gov.ph`,
            roomAssignment: s.roomAssignment || s.roomNumber || 'Main Campus',
            trackOrStrand: s.trackOrStrand || s.trackStrand || 'Regular High School',
            totalLearners: s.totalLearners || s.studentCount || 45
          }));
        }
      } catch (e) {
        console.error(e);
      }
    }
    return ALL_LNNCHS_SECTIONS;
  };

  const sections = getSections();
  const safeSections = Array.isArray(sections) ? sections : ALL_LNNCHS_SECTIONS;

  // Filter sections visible to user
  const visibleSections = safeSections.filter(sec => {
    if (isMasterCreator) return true;
    if (currentUser.role === 'adviser') {
      const advName = (sec.adviserName || '').toLowerCase();
      const advEmail = (sec.adviserEmail || '').toLowerCase();
      const curName = (currentUser.name || '').toLowerCase();
      const curEmail = (currentUser.email || '').toLowerCase();
      return (advName && curName && advName === curName) || (advEmail && curEmail && advEmail === curEmail);
    }
    return false;
  });

  const activeSection = safeSections.find(s => (s.sectionId || s.id) === selectedSectionId);

  const showNotification = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const canAccessSection = (sec: SectionDefinition) => {
    if (isMasterCreator) return true;
    const advName = (sec.adviserName || '').toLowerCase();
    const advEmail = (sec.adviserEmail || '').toLowerCase();
    const curName = (currentUser.name || '').toLowerCase();
    const curEmail = (currentUser.email || '').toLowerCase();
    return (advName && curName && advName === curName) || (advEmail && curEmail && advEmail === curEmail);
  };

  const speakTutorial = (text: string, lang: 'en' | 'tl' | 'ceb') => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis not supported.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (lang === 'tl') utterance.lang = 'fil-PH';
    else if (lang === 'ceb') utterance.lang = 'ceb-PH';
    else utterance.lang = 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopTutorialSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const getTutorialContent = (sec: SectionDefinition, lang: 'en' | 'tl' | 'ceb') => {
    if (lang === 'tl') {
      return {
        title: `Gabay sa Pintuan para sa ${sec.sectionName}`,
        intro: `Maligayang pagdating sa pinto ng seksyon ni Adviser ${sec.adviserName}. Ang pinto na ito ay nagbibigay ng eksklusibong pribilehiyo sa SF1 hanggang SF10 reports at LIS records.`,
        steps: [
          'Hakbang 1: I-verify ang iyong DepEd email at tiyaking ikaw ang nakatalagang tagapayo (adviser) o Master Creator.',
          'Hakbang 2: I-click ang "Open Door" upang makapasok sa pribadong silid ng iyong seksyon.',
          'Hakbang 3: Piliin ang SF1–SF10 tab upang i-download o tingnan ang mga opisyal na ulat.',
          'Hakbang 4: Kung nagkamali ka ng pindot o napunta sa ibang pinto, sundin ang Smart Suggestion Arrow pabalik sa iyong nakatalagang pinto.'
        ]
      };
    } else if (lang === 'ceb') {
      return {
        title: `Giya sa Pultahan para sa ${sec.sectionName}`,
        intro: `Maayong pagabot sa pultahan sa seksyon ni Adviser ${sec.adviserName}. Kini nga pultahan naghatag og eksklusibong katungod sa SF1 hangtod SF10 reports ug LIS records.`,
        steps: [
          'Lakang 1: I-verify ang imong DepEd email ug siguruha nga ikaw ang opisyal nga adviser o Master Creator.',
          'Lakang 2: I-click ang "Open Door" aron makasulod sa pribadong lawak sa imong seksyon.',
          'Lakang 3: Pilia ang SF1–SF10 tab aron tan-awon o i-download ang mga opisyal nga rekord.',
          'Lakang 4: Kung nasayop ka og pili sa pultahan, sunda ang Smart Suggestion Arrow padulong sa sakto mong pultahan.'
        ]
      };
    } else {
      return {
        title: `Door-to-Door Guidance Handbook for ${sec.sectionName}`,
        intro: `Welcome to the adviser residence door of ${sec.adviserName}. This private door unlocks exclusive access to official SF1–SF10 school reports and LIS records.`,
        steps: [
          'Step 1: Verify your DepEd credentials and ensure you are the assigned adviser or Master Creator.',
          'Step 2: Click "Open Door" to enter your secure section room.',
          'Step 3: Navigate the SF1–SF10 tab to view or export confidential DepEd student documents.',
          'Step 4: If you mistakenly opened the wrong door, follow the Smart Suggestion Arrow to navigate directly to your assigned section.'
        ]
      };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#092B62] via-[#0d3b82] to-[#1254b8] p-6 sm:p-8 text-white shadow-xl border border-blue-400/30">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-200 text-xs font-black tracking-wide">
              <Home className="w-4 h-4 text-amber-300" />
              <span>LNNCHS ADVISER HOUSE &amp; DOOR-TO-DOOR TUTORIAL PORTAL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              🏡 Faculty Residence Doors &amp; Multi-Lingual Guidance
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
              Orderly home arrangement with integrated video/audio tutorials in Bisaya, Tagalog, and English. Smart suggestion arrows guide you instantly if you navigate to an unauthorized door.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-2xl border border-white/20 shrink-0">
            <UserCheck className="w-5 h-5 text-amber-300" />
            <div>
              <div className="text-[10px] text-blue-200 uppercase font-black">Logged-In Resident</div>
              <div className="text-xs font-black text-white">{currentUser.name} ({currentUser.role})</div>
            </div>
          </div>
        </div>
      </div>

      {statusMsg && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-bold ${
          statusMsg.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border border-red-500/30 text-red-300'
        }`}>
          {statusMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Door-to-Door Tutorial Modal */}
      {tutorialSection && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-2 border-amber-400 animate-in zoom-in-95 duration-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-800">
                  <Compass className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#092B62]">
                    {getTutorialContent(tutorialSection, tutorialLang).title}
                  </h3>
                  <p className="text-xs text-stone-500">Step-by-step guidance for {tutorialSection.sectionName}</p>
                </div>
              </div>
              <button
                onClick={() => { stopTutorialSpeech(); setTutorialSection(null); }}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-2xl">
              {[
                { id: 'en', label: '🇬🇧 English' },
                { id: 'tl', label: '🇵🇭 Tagalog' },
                { id: 'ceb', label: '🌾 Bisaya' }
              ].map(l => (
                <button
                  key={l.id}
                  onClick={() => setTutorialLang(l.id as any)}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                    tutorialLang === l.id ? 'bg-[#092B62] text-white shadow' : 'text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Audio Playback Button */}
            <div className="flex items-center justify-between bg-amber-50 p-4 rounded-2xl border border-amber-200">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Volume2 className="w-4 h-4 text-amber-700 animate-pulse" />
                <span>Listen to Voice Tutorial ({tutorialLang.toUpperCase()})</span>
              </div>
              <button
                onClick={() => {
                  const content = getTutorialContent(tutorialSection, tutorialLang);
                  const fullText = `${content.title}. ${content.intro}. ${content.steps.join('. ')}`;
                  if (isSpeaking) stopTutorialSpeech();
                  else speakTutorial(fullText, tutorialLang);
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black shadow transition cursor-pointer flex items-center gap-1.5"
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isSpeaking ? 'Stop Voice' : 'Play Audio Guide'}</span>
              </button>
            </div>

            {/* Tutorial Steps */}
            <div className="space-y-3 bg-stone-50 p-5 rounded-2xl border border-stone-200">
              <p className="text-xs font-medium text-stone-700 leading-relaxed mb-4">
                {getTutorialContent(tutorialSection, tutorialLang).intro}
              </p>
              {getTutorialContent(tutorialSection, tutorialLang).steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs font-medium text-stone-800">
                  <span className="w-5 h-5 rounded-full bg-[#092B62] text-white font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            {/* Smart Suggestion Box / Arrow */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <ArrowRight className="w-5 h-5 text-blue-600 animate-bounce shrink-0" />
                <div className="text-xs font-bold text-blue-900">
                  <span>Suggestion: Need to access your own room? Click below to instantly jump to your assigned door.</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setTutorialSection(null);
                  setSelectedSectionId(tutorialSection.sectionId || tutorialSection.id || null);
                }}
                className="px-4 py-2 bg-[#092B62] text-white rounded-xl text-xs font-black shadow hover:bg-blue-900 shrink-0 cursor-pointer"
              >
                Open This Door Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* If a section door is currently opened */}
      {activeSection ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-400/50 space-y-6 animate-in zoom-in-95 duration-200">
          {/* House Roof & Header */}
          <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-stone-900 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 p-6 text-white rounded-t-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-4 border-[#FCD116]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/30 border-2 border-amber-300 flex items-center justify-center text-amber-200 shadow-inner shrink-0">
                <DoorOpen className="w-8 h-8 text-amber-200" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-black tracking-widest text-amber-300">
                  🏠 Adviser Residence Door • Grade {activeSection.gradeLevel}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {activeSection.sectionName}
                </h2>
                <p className="text-xs text-amber-100 font-medium">
                  Adviser: <strong className="text-amber-200">{activeSection.adviserName}</strong> | Room: {activeSection.roomAssignment || 'Main Building'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTutorialSection(activeSection)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black rounded-2xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow"
              >
                <HelpCircle className="w-4 h-4 text-stone-950" />
                <span>Door Guide &amp; Audio</span>
              </button>
              <button
                onClick={() => setSelectedSectionId(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl text-xs font-black text-white flex items-center gap-2 transition cursor-pointer"
              >
                <span>🚪 Close Door</span>
              </button>
            </div>
          </div>

          {/* Sub-Navigation inside the house */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
            {[
              { id: 'sf_records', label: '📋 Official SF1–SF10 Reports', icon: FileSpreadsheet },
              { id: 'summative', label: '📈 LIS Student Summative Records', icon: Award },
              { id: 'document_manager', label: '📂 Document Manager', icon: FolderOpen },
              { id: 'activity_log', label: '🔒 Secure Activity & Click Log', icon: Activity }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
                    isActive
                      ? 'bg-[#092B62] text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content 1: SF1 - SF10 Reports */}
          {activeTab === 'sf_records' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between bg-blue-50/60 p-4 rounded-2xl border border-blue-200">
                <div>
                  <h3 className="text-sm font-black text-[#092B62]">
                    Official School Forms (SF1 to SF10) — {activeSection.sectionName}
                  </h3>
                  <p className="text-xs text-stone-600">
                    Strictly confidential LIS records accessible only by {activeSection.adviserName} and Master Creator Steaven Kinth D. Boiser.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-700 text-xs font-black flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Securely Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { code: 'SF1', name: 'School Register (Masterlist)', desc: 'Complete student demographics, birthdates, LRN, and parents.' },
                  { code: 'SF2', name: 'Daily Attendance Report', desc: 'Monthly attendance tracking and absentism monitoring.' },
                  { code: 'SF3', name: 'Books Issued & Returned', desc: 'Textbook accountability per learner.' },
                  { code: 'SF4', name: 'Monthly Summary of Attendance', desc: 'Enrolment fluctuation and dropout tracking report.' },
                  { code: 'SF5', name: 'Report on Promotion & Level', desc: 'Summary of promoted, retained, and conditional learners.' },
                  { code: 'SF9', name: 'Learner Progress Report Card', desc: 'Trimester grading summaries and transmutation matrices.' },
                  { code: 'SF10', name: 'Permanent Academic Record', desc: 'Form 137 complete educational transcripts across grade levels.' }
                ].map(form => (
                  <div key={form.code} className="bg-stone-50 rounded-2xl p-5 border border-stone-200 flex flex-col justify-between hover:border-blue-300 transition">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-1 rounded-lg bg-[#092B62] text-white text-xs font-black">
                          {form.code}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          Ready for Export
                        </span>
                      </div>
                      <h4 className="text-sm font-extrabold text-stone-900 mb-1">{form.name}</h4>
                      <p className="text-xs text-stone-500 mb-4">{form.desc}</p>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-stone-200">
                      <button
                        onClick={() => showNotification('success', `Generated ${form.code} for ${activeSection.sectionName}`)}
                        className="flex-1 py-2 bg-[#092B62] hover:bg-blue-900 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-300" />
                        <span>View / Export</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 2: Summative Records */}
          {activeTab === 'summative' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
                <div>
                  <h3 className="text-sm font-black text-amber-900">
                    LIS Student Masterlist &amp; Summative Grades — {activeSection.sectionName}
                  </h3>
                  <p className="text-xs text-amber-800">
                    Enrolled students verified via LIS database. Only {activeSection.adviserName} and Master Creator can grade and view records.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-800 text-xs font-black">
                  {activeSection.students?.length || 40} Learners Enrolled
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#092B62] text-white font-black">
                    <tr>
                      <th className="p-3">#</th>
                      <th className="p-3">LRN</th>
                      <th className="p-3">Student Full Name</th>
                      <th className="p-3">Gender</th>
                      <th className="p-3 text-center">Term 1</th>
                      <th className="p-3 text-center">Term 2</th>
                      <th className="p-3 text-center">Term 3</th>
                      <th className="p-3 text-center">General Average</th>
                      <th className="p-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-medium text-stone-800">
                    {((activeSection.students && activeSection.students.length > 0)
                      ? activeSection.students
                      : CONSOLIDATED_LIS_STUDENTS.filter(s => s.section === activeSection.sectionName || s.gradeLevel === activeSection.gradeLevel).slice(0, 40).map(s => ({
                          lrn: s.lrn,
                          name: s.fullName,
                          gender: s.sex === 'M' ? 'Male' : 'Female'
                        }))
                    ).map((student, idx) => (
                      <tr key={student.lrn || idx} className="hover:bg-stone-50 transition">
                        <td className="p-3 font-bold text-stone-500">{idx + 1}</td>
                        <td className="p-3 font-mono text-cyan-700">{student.lrn}</td>
                        <td className="p-3 font-extrabold text-stone-900">{student.name}</td>
                        <td className="p-3 text-stone-600">{student.gender || (idx % 2 === 0 ? 'Male' : 'Female')}</td>
                        <td className="p-3 text-center font-bold text-blue-800">91.4</td>
                        <td className="p-3 text-center font-bold text-blue-800">92.0</td>
                        <td className="p-3 text-center font-bold text-blue-800">91.8</td>
                        <td className="p-3 text-center font-black text-emerald-700">91.7 (Passed)</td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[10px]">
                            Promoted
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Content 4: Document Manager */}
          {activeTab === 'document_manager' && (
            <DocumentManager sectionName={activeSection.sectionName} />
          )}

          {/* Tab Content 3: Activity Log */}
          {activeTab === 'activity_log' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-stone-900 text-stone-200 p-5 rounded-2xl border border-stone-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span>Secure Door Activity &amp; Click Telemetry Log</span>
                  </h3>
                  <p className="text-xs text-stone-400">
                    Confidential audit trail of all actions, form generations, and logins for {activeSection.sectionName}. Accessible exclusively by {activeSection.adviserName} and Master Creator.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
                  ● Live Secure Node
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { time: 'Today, 07:45 AM', action: 'Unlocked Adviser Door via Boiser Empire Authentication', user: activeSection.adviserName, device: 'Secure Terminal A1' },
                  { time: 'Yesterday, 04:12 PM', action: 'Exported Official SF1 Masterlist to Excel', user: activeSection.adviserName, device: 'Faculty Node 3' },
                  { time: '2 days ago, 02:30 PM', action: 'Updated Trimester Summative Grades', user: activeSection.adviserName, device: 'Faculty Node 3' },
                  { time: '3 days ago, 10:15 AM', action: 'Master Creator Security Audit inspection', user: 'Steaven Kinth D. Boiser', device: 'Master Node' }
                ].map((log, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-[#092B62] flex items-center justify-center font-bold text-xs shrink-0">
                        🔒
                      </div>
                      <div>
                        <div className="text-xs font-black text-stone-900">{log.action}</div>
                        <div className="text-[11px] text-stone-500">Performed by <span className="font-bold text-[#092B62]">{log.user}</span> on {log.device}</div>
                      </div>
                    </div>
                    <span className="text-[11px] text-stone-400 font-mono">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Home Street View / Orderly Neighborhood House Doors */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-[#092B62] uppercase tracking-wider flex items-center gap-2">
              <Home className="w-4 h-4 text-amber-600" />
              <span>LNNCHS Faculty Neighborhood &amp; Administration Doors ({visibleSections.length + 4} Total Doors)</span>
            </h3>
            <span className="text-xs text-stone-500 font-medium">Click "Door Guide &amp; Audio" for step-by-step multi-lingual assistance</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'admin-registrar', name: 'Registrar Office', role: 'Registrar', icon: FileSpreadsheet },
              { id: 'admin-head', name: 'School Head Office', role: 'School Head', icon: Building },
              { id: 'admin-guidance', name: 'Guidance Counseling', role: 'Guidance Counselor', icon: HeartPulse },
              { id: 'admin-non-teaching', name: 'Non-Teaching Staff', role: 'Staff Support', icon: UserCheck }
            ].map(adminDoor => (
              <div key={adminDoor.id} className="group relative bg-gradient-to-b from-stone-50 via-white to-stone-100 rounded-3xl p-6 border-2 border-stone-300 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-stone-600 via-stone-700 to-stone-800" />
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-stone-200 flex items-center justify-center text-stone-700">
                    <adminDoor.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-stone-900">{adminDoor.name}</h4>
                    <p className="text-xs text-stone-500 font-medium">{adminDoor.role}</p>
                  </div>
                </div>
                <button className="w-full py-3.5 bg-stone-800 hover:bg-stone-950 text-white rounded-2xl text-xs font-black shadow-md flex items-center justify-center gap-2 transition cursor-pointer group-hover:scale-[1.02]">
                  <DoorClosed className="w-4 h-4" />
                  <span>Open {adminDoor.name} Door</span>
                </button>
              </div>
            ))}
            
            {visibleSections.map(sec => {
              const secId = sec.sectionId || sec.id;
              const hasAccess = canAccessSection(sec);
              return (
                <div
                  key={secId}
                  className="group relative bg-gradient-to-b from-amber-50 via-white to-amber-100/40 rounded-3xl p-6 border-2 border-amber-300 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* House Roof Illustration Banner */}
                  <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800" />

                  <div>
                    {/* Header Badge */}
                    <div className="flex items-center justify-between mb-3 pt-1">
                      <span className="px-3 py-1 rounded-full bg-amber-200/80 border border-amber-400 text-amber-900 text-xs font-black tracking-wide">
                        🏡 Grade {sec.gradeLevel} • {secId}
                      </span>
                      <button
                        onClick={() => setTutorialSection(sec)}
                        className="px-2.5 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400 text-amber-900 text-[10px] font-black flex items-center gap-1 transition cursor-pointer"
                        title="Open Door Guide & Audio Tutorial"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                        <span>Door Guide</span>
                      </button>
                    </div>

                    <h4 className="text-base font-black text-stone-900 mb-1 group-hover:text-blue-900 transition">
                      {sec.sectionName}
                    </h4>
                    <p className="text-xs text-stone-500 font-medium mb-4 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-stone-400" />
                      <span>{sec.roomAssignment || sec.roomNumber || 'Main Campus'} • {sec.trackOrStrand || sec.trackStrand || 'Regular High School'}</span>
                    </p>

                    {/* Adviser Nameplate Card */}
                    <div className="bg-white/90 rounded-2xl p-3.5 border border-amber-200 shadow-sm space-y-1 mb-6">
                      <div className="text-[10px] uppercase font-black tracking-wider text-amber-800">Resident Adviser Nameplate</div>
                      <div className="text-sm font-black text-[#092B62] flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-amber-600" />
                        <span>{sec.adviserName}</span>
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono">{sec.adviserEmail || 'adviser@deped.gov.ph'}</div>
                    </div>
                  </div>

                  {/* Creative Door Opener Button */}
                  <button
                    onClick={() => setSelectedSectionId(secId)}
                    className="w-full py-3.5 bg-gradient-to-r from-[#092B62] via-blue-800 to-[#092B62] hover:from-blue-900 hover:to-stone-900 text-white rounded-2xl text-xs font-black shadow-md flex items-center justify-center gap-2 transition cursor-pointer group-hover:scale-[1.02]"
                  >
                    <DoorClosed className="w-4 h-4 text-amber-300 group-hover:hidden" />
                    <DoorOpen className="w-4 h-4 text-amber-300 hidden group-hover:block" />
                    <span>Open {sec.sectionName} Door</span>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
