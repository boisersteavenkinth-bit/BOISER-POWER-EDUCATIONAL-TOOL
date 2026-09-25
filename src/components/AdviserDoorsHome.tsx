import React, { useState, useEffect } from 'react';
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
  HeartPulse,
  Bell,
  AlarmClock,
  Download,
  MessageSquare,
  Camera,
  FileCheck,
  ListChecks,
  Zap,
  QrCode
} from 'lucide-react';
import { LNNCHS_20_SECTIONS_PER_GRADE, ALL_LNNCHS_SECTIONS, CONSOLIDATED_LIS_STUDENTS, SectionDefinition } from '../data/lnnchsCompleteSectionsDirectory';
import { DocumentManager } from './DocumentManager';
import { useAuth } from '../context/AuthContext';
import { SingleSFInspector } from './SingleSFInspector';
import { BoiserChatbot } from './BoiserChatbot';
import { DoorFileSummary } from './DoorFileSummary';
import { DoorCameraScanner } from './DoorCameraScanner';
import { ILAWGenerator } from './ILAWGenerator';
import { SummativeHub } from './SummativeHub';
import { DoorChathead } from './DoorChathead';
import { BOWGeneratorTool } from './BOWGeneratorTool';
import { StudentDocumentVault } from './StudentDocumentVault';
import { PrincipalDoorsView } from './PrincipalDoorsView';
import { CebuanoVoiceGuide } from './CebuanoVoiceGuide';
import { speakWithCebuanoMaleVoice } from '../services/boiserVoiceService';
import { LnnchsDoorResultPreviewModal, PreviewItemData } from './LnnchsDoorResultPreviewModal';

interface AdviserDoorsHomeProps {
  currentUser: {
    name: string;
    email: string;
    role: 'master_creator' | 'adviser' | 'non_adviser' | 'user' | 'owner';
    section?: string;
  };
  schoolYear?: string;
  setSchoolYear?: (sy: string) => void;
}

export const AdviserDoorsHome: React.FC<AdviserDoorsHomeProps> = ({ currentUser, schoolYear = '2026-2027', setSchoolYear }) => {
  const { isOwner, substitutionPlans, notifications, markNotificationRead } = useAuth();
  const isMasterCreator = isOwner || currentUser.email === 'boisersteavenkinth@gmail.com';
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [activeAdminDoorId, setActiveAdminDoorId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'sf_records' | 'summative' | 'activity_log' | 'document_manager' | 'substitution' | 'file_summary' | 'camera_hub' | 'weekly_dll' | 'summative_hub' | 'bow_generator' | 'summative_item_analysis' | 'student_vault'>('sf_records');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerMode, setScannerMode] = useState<'activity' | 'exam' | 'qr' | 'rute' | 'ddt'>('activity');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showChathead, setShowChathead] = useState(false);
  const [previewDoorData, setPreviewDoorData] = useState<{ doorName: string; doorRole: string; gradeLevel?: string; sectionName?: string; itemData?: PreviewItemData } | null>(null);

  // Door-to-Door Tutorial Modal State
  const [tutorialSection, setTutorialSection] = useState<SectionDefinition | null>(null);
  const [tutorialLang, setTutorialLang] = useState<'en' | 'tl' | 'ceb'>('en');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Filter plans for this user
  const myPlans = substitutionPlans.filter(p => p.substituteTeacherEmail === currentUser.email);
  const unreadAlarms = notifications.filter(n => !n.read && n.type === 'alarm');

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
    // Open ALL doors if master creator OR any authenticated DepEd user
    if (isMasterCreator || currentUser.role === 'adviser' || currentUser.role === 'non_adviser') return true;
    
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

  const speakTutorial = (text: string, _lang: 'en' | 'tl' | 'ceb') => {
    setIsSpeaking(true);
    speakWithCebuanoMaleVoice(text, {
      appendTagline: true,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
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
      {/* ALARM SIGNAL FOR CHOSEN TEACHERS */}
      {unreadAlarms.length > 0 && (
        <div className="bg-red-600 text-white p-4 rounded-2xl shadow-2xl border-4 border-red-400 animate-bounce flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white text-red-600 rounded-full">
              <AlarmClock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase tracking-tighter">🚨 WARNING: SUBSTITUTION ALERT! 🚨</h2>
              <p className="text-sm font-bold opacity-90">{unreadAlarms[0].message}</p>
            </div>
          </div>
          <button 
            onClick={() => markNotificationRead(unreadAlarms[0].id)}
            className="px-6 py-2 bg-white text-red-600 font-black rounded-xl hover:bg-stone-100 transition shadow-lg"
          >
            I UNDERSTAND / DISMISS
          </button>
        </div>
      )}

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

      {/* If an admin door is currently opened */}
      {activeAdminDoorId === 'head-anisah' || activeAdminDoorId === 'head-andot' || activeAdminDoorId === 'head-calibo' ? (
        <PrincipalDoorsView doorId={activeAdminDoorId} onClose={() => setActiveAdminDoorId(null)} />
      ) : activeAdminDoorId === 'admin-guidance' ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-rose-300 space-y-6 animate-in zoom-in-95 duration-200">
          <div className="bg-gradient-to-r from-rose-700 via-pink-800 to-rose-900 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 p-6 text-white rounded-t-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-4 border-[#FCD116]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/30 border-2 border-rose-300 flex items-center justify-center text-rose-200 shadow-inner shrink-0">
                <HeartPulse className="w-8 h-8 text-rose-200" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-black tracking-widest text-rose-300">
                  💖 Guidance &amp; Counseling Office
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">Learner Guidance &amp; Welfare Center</h2>
                <p className="text-xs text-rose-100 font-medium">Confidential counseling records, behavioral support, and career advocacy.</p>
              </div>
            </div>
            <button onClick={() => setActiveAdminDoorId(null)} className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl text-xs font-black text-white transition cursor-pointer">
              🚪 Close Door
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl">
              <div className="font-bold text-rose-900 mb-1">Student Welfare Cases</div>
              <div className="text-2xl font-black text-rose-950">0 Active Alerts</div>
              <p className="text-[11px] text-rose-700 mt-1">Safe and nurturing campus climate.</p>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <div className="font-bold text-emerald-900 mb-1">Career Guidance Track</div>
              <div className="text-2xl font-black text-emerald-950">100% Oriented</div>
              <p className="text-[11px] text-emerald-700 mt-1">College, Tech-Voc, &amp; Job readiness.</p>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
              <div className="font-bold text-amber-900 mb-1">Guidance Counselor</div>
              <div className="text-base font-black text-amber-950">Official LNNCHS Staff</div>
              <p className="text-[11px] text-amber-800 mt-1">Protected records under Data Privacy.</p>
            </div>
          </div>
        </div>
      ) : activeAdminDoorId === 'admin-non-teaching' ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-purple-300 space-y-6 animate-in zoom-in-95 duration-200">
          <div className="bg-gradient-to-r from-purple-800 via-indigo-900 to-purple-900 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 p-6 text-white rounded-t-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-4 border-[#FCD116]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/30 border-2 border-purple-300 flex items-center justify-center text-purple-200 shadow-inner shrink-0">
                <UserCheck className="w-8 h-8 text-purple-200" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-black tracking-widest text-purple-300">
                  📁 Administrative Operations
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">Non-Teaching Staff &amp; A.O. Hub (Ma'am Dayan)</h2>
                <p className="text-xs text-purple-100 font-medium">School inventory, property management, document routing, and HR support.</p>
              </div>
            </div>
            <button onClick={() => setActiveAdminDoorId(null)} className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl text-xs font-black text-white transition cursor-pointer">
              🚪 Close Door
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl">
              <div className="font-bold text-purple-900 mb-1">Administrative Officer (A.O.)</div>
              <div className="text-base font-black text-purple-950">Ma'am Dayan &amp; A.O. Staff</div>
              <p className="text-[11px] text-purple-700 mt-1">Official LNNCHS Administrative Desk.</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
              <div className="font-bold text-blue-900 mb-1">School Property Inventory</div>
              <div className="text-2xl font-black text-blue-950">Synchronized</div>
              <p className="text-[11px] text-blue-700 mt-1">Textbooks, equipment, &amp; lab supplies.</p>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <div className="font-bold text-emerald-900 mb-1">Official Document Tracker</div>
              <div className="text-2xl font-black text-emerald-950">0 Backlogs</div>
              <p className="text-[11px] text-emerald-700 mt-1">All communications logged &amp; filed.</p>
            </div>
          </div>
        </div>
      ) : activeAdminDoorId === 'admin-co-adviser' ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-cyan-300 space-y-6 animate-in zoom-in-95 duration-200">
          <div className="bg-gradient-to-r from-cyan-800 via-blue-900 to-cyan-900 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 p-6 text-white rounded-t-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-4 border-[#FCD116]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/30 border-2 border-cyan-300 flex items-center justify-center text-cyan-200 shadow-inner shrink-0">
                <Users className="w-8 h-8 text-cyan-200" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-black tracking-widest text-cyan-300">
                  👥 Subject Faculty Resource Center
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">Co-Advisers &amp; Subject Teachers Door</h2>
                <p className="text-xs text-cyan-100 font-medium">Teaching load scheduling, curriculum alignment, and test item generation without co-adviser overhead.</p>
              </div>
            </div>
            <button onClick={() => setActiveAdminDoorId(null)} className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl text-xs font-black text-white transition cursor-pointer">
              🚪 Close Door
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-2xl">
              <div className="font-bold text-cyan-900 mb-1">Subject Faculty Loading</div>
              <div className="text-2xl font-black text-cyan-950">Direct Access</div>
              <p className="text-[11px] text-cyan-700 mt-1">Individual teaching schedules ready.</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
              <div className="font-bold text-blue-900 mb-1">Test Question Bank</div>
              <div className="text-2xl font-black text-blue-950">TOS Aligned</div>
              <p className="text-[11px] text-blue-700 mt-1">Summative &amp; RUTE exam generator.</p>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <div className="font-bold text-emerald-900 mb-1">ILAW Exemplar Drafting</div>
              <div className="text-2xl font-black text-emerald-950">Ready to Edit</div>
              <p className="text-[11px] text-emerald-700 mt-1">Direct submission to Ma'am Calibo.</p>
            </div>
          </div>
        </div>
      ) : activeAdminDoorId === 'admin-registrar' ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-blue-400 space-y-6 animate-in zoom-in-95 duration-200">
          <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 p-6 text-white rounded-t-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-4 border-[#FCD116]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/30 border-2 border-blue-300 flex items-center justify-center text-blue-200 shadow-inner shrink-0">
                <FileSpreadsheet className="w-8 h-8 text-blue-200" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-black tracking-widest text-blue-300">
                  🏢 Registrar Office • Official LIS Gateway
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Registrar Command Center
                </h2>
                <p className="text-xs text-blue-100 font-medium">
                  Official enrollment, record inspection, and SF synchronization hub.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveAdminDoorId(null)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl text-xs font-black text-white flex items-center gap-2 transition cursor-pointer"
            >
              <span>🚪 Close Registrar Door</span>
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  <div>
                    <span className="text-xs font-black text-emerald-900 uppercase">Registrar Access Verified</span>
                    <p className="text-[10px] text-emerald-700">You are currently inspecting official LNNCHS records with full read/write LIS permissions.</p>
                  </div>
                </div>

                <div className="h-[500px] border border-blue-200 rounded-3xl overflow-hidden shadow-sm">
                  <BoiserChatbot variant="embedded" />
                </div>
              </div>

              <SingleSFInspector />
            </div>
          </div>
        </div>
      ) : activeSection ? (
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

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setPreviewDoorData({
                  doorName: activeSection.adviserName,
                  doorRole: `Resident Adviser • Grade ${activeSection.gradeLevel} ${activeSection.sectionName}`,
                  gradeLevel: `Grade ${activeSection.gradeLevel}`,
                  sectionName: activeSection.sectionName
                })}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white font-black rounded-2xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow border border-cyan-300"
              >
                <Eye className="w-4 h-4 text-amber-300" />
                <span>👁️ Preview &amp; Download Results</span>
              </button>

              <button
                onClick={() => {
                   showNotification('success', `Assign Subject BOW for ${activeSection.sectionName} downloaded!`);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow"
              >
                <Download className="w-4 h-4" />
                <span>Download assigned BOW</span>
              </button>
              <button
                onClick={() => setShowChathead(!showChathead)}
                className={`px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer shadow ${showChathead ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>{showChathead ? 'Disable Chat' : 'Enable Chat'}</span>
              </button>
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
              { id: 'student_vault', label: '🗂️ Student Document Vault', icon: FolderOpen },
              { id: 'bow_generator', label: '📚 Budget of Work (BOW)', icon: BookOpen },
              { id: 'summative_item_analysis', label: '📊 Summative Test & Item Analysis', icon: BarChart3 },
              { id: 'file_summary', label: '📂 Door File Summary', icon: FolderOpen },
              { id: 'camera_hub', label: '📸 Smart Scanner Hub', icon: Camera },
              { id: 'weekly_dll', label: '📝 Weekly DLL/ILAW', icon: Sparkles },
              { id: 'summative_hub', label: '🏆 Summative Tests', icon: Award },
              { id: 'summative', label: '📈 LIS Student Records', icon: UserCheck },
              { id: 'substitution', label: '🛡️ My Substitution Plans', icon: AlarmClock },
              { id: 'activity_log', label: '🔒 Secure Activity Log', icon: Activity }
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

          {/* Tab Content: Student Document Vault */}
          {activeTab === 'student_vault' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <StudentDocumentVault sectionName={activeSection.sectionName} gradeLevel={activeSection.gradeLevel} teacherName={activeSection.adviserName} />
            </div>
          )}

          {/* Tab Content: BOW Generator */}
          {activeTab === 'bow_generator' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <BOWGeneratorTool />
            </div>
          )}

          {/* Tab Content: Summative & Item Analysis */}
          {activeTab === 'summative_item_analysis' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 rounded-3xl text-white shadow-md flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-amber-300" />
                    <span>Summative Test Results, RUTE Periodicals &amp; Item Analysis Hub</span>
                  </h3>
                  <p className="text-xs text-blue-100 mt-1">
                    Upload student test results, compute item difficulty indices, generate Table of Specifications (TOS), and run exact fact-check calculation tables for Math &amp; Physics exams.
                  </p>
                </div>
                <span className="px-3 py-1 bg-amber-400 text-stone-950 font-black rounded-full text-xs">
                  DepEd Regional Exam Compliant
                </span>
              </div>
              <SummativeHub sectionName={activeSection.sectionName} gradeLevel={activeSection.gradeLevel} />
            </div>
          )}

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
                        onClick={() => {
                          setPreviewDoorData({
                            doorName: `${form.name} — ${activeSection.sectionName}`,
                            doorRole: `Official School Form • ${activeSection.adviserName}`,
                            gradeLevel: `Grade ${activeSection.gradeLevel}`,
                            sectionName: activeSection.sectionName,
                            itemData: {
                              id: form.code,
                              title: form.name,
                              code: form.code,
                              category: 'Official School Form',
                              description: form.desc,
                              gradeLevel: `Grade ${activeSection.gradeLevel}`,
                              sectionName: activeSection.sectionName,
                              adviserName: activeSection.adviserName
                            }
                          });
                        }}
                        className="flex-1 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 hover:brightness-110 text-stone-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-stone-950" />
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={() => showNotification('success', `Generated ${form.code} for ${activeSection.sectionName}`)}
                        className="flex-1 py-2 bg-[#092B62] hover:bg-blue-900 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-300" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 2: Door File Summary */}
          {activeTab === 'file_summary' && (
            <DoorFileSummary sectionName={activeSection.sectionName} gradeLevel={`Grade ${activeSection.gradeLevel}`} />
          )}

          {/* Tab Content 3: Smart Scanner Hub */}
          {activeTab === 'camera_hub' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-700 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="relative z-10 space-y-4">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest">
                      <Camera className="w-3 h-3" /> Smart Vision Node
                   </div>
                   <h3 className="text-2xl font-black uppercase tracking-tight">Digital Inspection & Grading Hub</h3>
                   <p className="text-slate-400 text-xs max-w-xl font-medium leading-relaxed">
                      Use the high-precision camera to scan student activities, exam answer sheets (RUTE), and official DepEd QR codes. AI-powered scoring generates results with instant pedagogical explanations.
                   </p>
                   
                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                      {[
                        { id: 'activity', name: 'Check Activity', icon: FileCheck },
                        { id: 'exam', name: 'Grade Exam', icon: ListChecks },
                        { id: 'rute', name: 'RUTE Scanner', icon: Zap },
                        { id: 'qr', name: 'Verify QR', icon: QrCode }
                      ].map(mode => (
                        <button 
                          key={mode.id}
                          onClick={() => { setScannerMode(mode.id as any); setIsScannerOpen(true); }}
                          className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition flex flex-col items-center gap-2 text-center group"
                        >
                           <mode.icon className="w-6 h-6 text-amber-300 group-hover:scale-110 transition-transform" />
                           <span className="text-[10px] font-black uppercase tracking-wider">{mode.name}</span>
                        </button>
                      ))}
                   </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                 <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Recent Inspection History</h4>
                 <div className="space-y-3">
                    {[
                      { type: 'Exam', name: 'Unit 1 Science Test', score: '48/50', time: '1 hour ago' },
                      { type: 'Activity', name: 'Math Worksheet #3', score: '95%', time: '3 hours ago' },
                      { type: 'QR', name: 'DepEd Memo DO 003', score: 'Verified', time: 'Yesterday' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400">
                               {item.type === 'QR' ? <QrCode size={18} /> : <FileText size={18} />}
                            </div>
                            <div>
                               <div className="text-xs font-black text-slate-800">{item.name}</div>
                               <div className="text-[10px] text-slate-500 font-bold uppercase">{item.type} • {item.time}</div>
                            </div>
                         </div>
                         <div className="text-xs font-black text-blue-700">{item.score}</div>
                      </div>
                    ))}
                 </div>
              </div>

              <DoorCameraScanner 
                isOpen={isScannerOpen} 
                onClose={() => setIsScannerOpen(false)} 
                mode={scannerMode}
                onResult={(res) => {
                   showNotification('success', `Scan complete! Result: ${res.score || res.status}`);
                }}
              />
            </div>
          )}

          {/* Tab Content 4: Weekly DLL/ILAW */}
          {activeTab === 'weekly_dll' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-3">
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                        <Sparkles className="w-3 h-3 text-amber-300" /> SY 2026-2027 MATATAG Aligned
                     </div>
                     <h3 className="text-2xl font-black uppercase tracking-tight">Weekly DLL / ILAW Generator</h3>
                     <p className="text-blue-100 text-xs max-w-md font-medium leading-relaxed">
                        Automatically generate your weekly Daily Lesson Log (DLL) in the official 4-part ILAW format. Includes AI-created LAS activity sheets with QR codes for 4-day integration.
                     </p>
                  </div>
                  <div className="flex flex-col gap-2 w-full md:w-auto">
                     <div className="p-3 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm text-center">
                        <p className="text-[9px] font-black uppercase text-blue-200 mb-1">Print Ready</p>
                        <p className="text-xs font-black">A4 Landscape Format</p>
                     </div>
                  </div>
               </div>

               <ILAWGenerator />
            </div>
          )}

          {/* Tab Content 5: Summative Hub */}
          {activeTab === 'summative_hub' && (
            <SummativeHub sectionName={activeSection.sectionName} gradeLevel={`Grade ${activeSection.gradeLevel}`} />
          )}

          {/* Tab Content 6: LIS Student Records (Old Summative) */}
          {activeTab === 'summative' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
                <div>
                  <h3 className="text-sm font-black text-amber-900">
                    LIS Student Masterlist &amp; Records — {activeSection.sectionName}
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

          {/* Tab Content 7: Activity Log */}
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

          {/* Tab Content 8: Substitution Summary */}
          {activeTab === 'substitution' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-orange-50 p-6 rounded-3xl border-2 border-orange-200">
                <h3 className="text-lg font-black text-orange-900 flex items-center gap-2 mb-2">
                  <AlarmClock className="w-5 h-5" /> Summary of Assigned Substitution Tasks
                </h3>
                <p className="text-xs text-orange-800 font-bold">
                  List of all classes where you have been chosen as a substitute teacher. All tasks start strictly at 7:30 AM.
                </p>
              </div>

              {myPlans.length === 0 ? (
                <div className="p-12 text-center bg-stone-50 rounded-3xl border border-dashed border-stone-300">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <p className="text-sm font-black text-stone-500">You have no active substitution assignments.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {myPlans.map(plan => (
                    <div key={plan.id} className="bg-white p-6 rounded-3xl border-2 border-orange-100 shadow-sm hover:shadow-md transition group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-black">
                            {plan.subject.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-base font-black text-stone-900">{plan.subject}</h4>
                            <p className="text-[10px] text-stone-500 uppercase font-black tracking-widest">{plan.section} • {plan.date}</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">ACTIVE</span>
                      </div>
                      
                      <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 text-xs text-stone-700 italic line-clamp-3 mb-4">
                        "{plan.content}"
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                        <div className="text-[10px] text-stone-500 font-bold">
                          Assigned by: <span className="text-[#092B62]">{plan.assignedByName}</span>
                        </div>
                        <button className="px-4 py-2 bg-[#092B62] text-white text-[10px] font-black rounded-xl hover:bg-blue-900 transition flex items-center gap-2">
                          <Eye className="w-3.5 h-3.5" /> PREVIEW FULL REPORT
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {showChathead && <DoorChathead />}
        </div>
      ) : (
        /* Home Street View / Orderly Neighborhood House Doors */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-black text-[#092B62] uppercase tracking-wider flex items-center gap-2">
                <Home className="w-4 h-4 text-amber-600" />
                <span>LNNCHS Faculty Neighborhood &amp; Administration Doors ({visibleSections.length + 7} Total Doors)</span>
              </h3>
              <p className="text-xs text-stone-500 font-medium">Three School Head Executive Doors, Registrar, Guidance, Non-Teaching, and Resident Advisers.</p>
            </div>
            <CebuanoVoiceGuide
              compact
              guideKey="welcome"
              label="Audio Guide (Cebuano Male)"
            />
          </div>

          <CebuanoVoiceGuide
            guideKey="principals"
            label="Listen to Executive Office &amp; Faculty Neighborhood Audio Tour"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              // 1. THREE SCHOOL HEAD DOORS (SWAPPED TO FIRST LOCATION)
              {
                id: 'head-anisah',
                name: "Ma'am Anisah (Principal III-A) Door",
                role: 'Senior High School Executive Leadership & SIP',
                icon: Building,
                badge: 'School Head',
                bannerColor: 'from-blue-700 via-indigo-800 to-blue-900',
                btnColor: 'bg-blue-900 hover:bg-blue-950'
              },
              {
                id: 'head-andot',
                name: "Ma'am Joan J. Andot (Asst. Principal II) Door",
                role: 'Asst. Principal II • Academic Programs & Scheduling',
                icon: Award,
                badge: 'Asst. Principal II',
                bannerColor: 'from-emerald-700 via-teal-800 to-emerald-900',
                btnColor: 'bg-emerald-900 hover:bg-emerald-950'
              },
              {
                id: 'head-calibo',
                name: 'Ma\'am Alma "Almazing" L. Calibo (Head Teacher) Door',
                role: 'Head Teacher • Curriculum & ILAW Approval',
                icon: BookOpen,
                badge: 'Head Teacher',
                bannerColor: 'from-amber-600 via-stone-800 to-amber-700',
                btnColor: 'bg-amber-900 hover:bg-amber-950'
              },
              // 2. REGISTRAR OFFICE (COMES AFTER HEAD)
              {
                id: 'admin-registrar',
                name: 'Registrar Office Door',
                role: 'Registrar • LIS Enrollment & Official Records',
                icon: FileSpreadsheet,
                badge: 'Registrar',
                bannerColor: 'from-slate-700 via-slate-800 to-slate-900',
                btnColor: 'bg-slate-800 hover:bg-slate-950'
              },
              // 3. GUIDANCE COUNSELING
              {
                id: 'admin-guidance',
                name: 'Guidance Counseling Office Door',
                role: 'Guidance Counselor • Learner Well-Being',
                icon: HeartPulse,
                badge: 'Guidance',
                bannerColor: 'from-rose-700 via-pink-800 to-rose-900',
                btnColor: 'bg-rose-900 hover:bg-rose-950'
              },
              // 4. NON-TEACHING STAFF & A.O.
              {
                id: 'admin-non-teaching',
                name: 'Non-Teaching Staff & A.O. (Ma\'am Dayan) Door',
                role: 'Staff Support • Property, Inventory & HR Desk',
                icon: UserCheck,
                badge: 'Administrative Officer',
                bannerColor: 'from-purple-700 via-indigo-800 to-purple-900',
                btnColor: 'bg-purple-900 hover:bg-purple-950'
              },
              // 5. CO-ADVISER & SUBJECT TEACHERS
              {
                id: 'admin-co-adviser',
                name: 'Co-Advisers & Subject Teachers Door',
                role: 'Subject Faculty (Without Co-Adviser Overhead)',
                icon: Users,
                badge: 'Subject Teachers',
                bannerColor: 'from-cyan-700 via-blue-800 to-cyan-900',
                btnColor: 'bg-cyan-900 hover:bg-cyan-950'
              }
            ].map(adminDoor => (
              <div key={adminDoor.id} className="group relative bg-gradient-to-b from-stone-50 via-white to-stone-100 rounded-3xl p-6 border-2 border-stone-300 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-3 bg-gradient-to-r ${adminDoor.bannerColor}`} />
                <div>
                  <div className="flex items-center justify-between mb-3 pt-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-stone-200 text-stone-800 text-[10px] font-black uppercase tracking-wider">
                      {adminDoor.badge}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Door Active
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 shadow-xs">
                      <adminDoor.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-stone-900 leading-snug">{adminDoor.name}</h4>
                      <p className="text-[11px] text-stone-500 font-medium">{adminDoor.role}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => setPreviewDoorData({
                      doorName: adminDoor.name,
                      doorRole: adminDoor.role,
                      gradeLevel: 'Executive Level',
                      sectionName: adminDoor.badge
                    })}
                    className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 rounded-xl text-xs font-black shadow-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-700" />
                    <span>👁️ Preview &amp; Download Results</span>
                  </button>

                  <button 
                    onClick={() => setActiveAdminDoorId(adminDoor.id)}
                    className={`w-full py-3 ${adminDoor.btnColor} text-white rounded-2xl text-xs font-black shadow-md flex items-center justify-center gap-2 transition cursor-pointer group-hover:scale-[1.02]`}
                  >
                    <DoorClosed className="w-4 h-4 text-amber-300" />
                    <span>Open {adminDoor.name}</span>
                  </button>
                </div>
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

                  {/* Creative Door Opener & Preview Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setPreviewDoorData({
                        doorName: sec.adviserName,
                        doorRole: `Resident Adviser • Grade ${sec.gradeLevel} ${sec.sectionName}`,
                        gradeLevel: `Grade ${sec.gradeLevel}`,
                        sectionName: sec.sectionName
                      })}
                      className="w-full py-2 bg-[#092B62]/10 hover:bg-[#092B62]/20 text-[#092B62] border border-[#092B62]/30 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-800" />
                      <span>👁️ Preview &amp; Download Results</span>
                    </button>

                    <button
                      onClick={() => setSelectedSectionId(secId)}
                      className="w-full py-3 bg-gradient-to-r from-[#092B62] via-blue-800 to-[#092B62] hover:from-blue-900 hover:to-stone-900 text-white rounded-2xl text-xs font-black shadow-md flex items-center justify-center gap-2 transition cursor-pointer group-hover:scale-[1.02]"
                    >
                      <DoorClosed className="w-4 h-4 text-amber-300 group-hover:hidden" />
                      <DoorOpen className="w-4 h-4 text-amber-300 hidden group-hover:block" />
                      <span>Open {sec.sectionName} Door</span>
                      <ChevronRight className="w-4 h-4 opacity-70" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* LNNCHS Door Result Preview & Download Modal */}
      {previewDoorData && (
        <LnnchsDoorResultPreviewModal
          doorName={previewDoorData.doorName}
          doorRole={previewDoorData.doorRole}
          gradeLevel={previewDoorData.gradeLevel}
          sectionName={previewDoorData.sectionName}
          itemData={previewDoorData.itemData}
          isOpen={true}
          onClose={() => setPreviewDoorData(null)}
        />
      )}
    </div>
  );
};
