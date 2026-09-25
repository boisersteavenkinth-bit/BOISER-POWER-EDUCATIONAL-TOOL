import React, { useState, useEffect } from 'react';
import { 
  DoorClosed, 
  DoorOpen, 
  ShieldCheck, 
  UserCheck, 
  UserX, 
  FileText, 
  Users, 
  Award, 
  Sparkles, 
  Lock, 
  Unlock, 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  FileSpreadsheet, 
  BookOpen, 
  Download, 
  Eye, 
  EyeOff,
  Check, 
  ArrowRight,
  LogOut,
  Info,
  Mic,
  Volume2,
  BookOpenCheck,
  ShieldAlert,
  HelpCircle,
  Activity,
  User,
  Home
} from 'lucide-react';
import { LNNCHS_20_SECTIONS_PER_GRADE, CONSOLIDATED_LIS_STUDENTS, SectionDefinition, LISStudentMasterRecord } from '../data/lnnchsCompleteSectionsDirectory';
import { SectionManager } from './SectionManager';
import { AdviserDoorsHome } from './AdviserDoorsHome';
import { MasterCreatorSkillsVault } from './MasterCreatorSkillsVault';
import { speakWithCebuanoMaleVoice, stopCebuanoMaleVoice } from '../services/boiserVoiceService';
import { triggerSuspiciousActivityAndLogout } from '../services/securityAlertService';

interface BoisertEmpirePortalProps {
  onNavigateTab: (tab: string) => void;
}

interface RegisteredUser {
  name: string;
  email: string;
  password: string;
  role: 'adviser' | 'non_adviser' | 'master_creator';
  section?: string;
  isVerifiedDepEd: boolean;
  createdAt: string;
  clickingActivities: {
    timestamp: string;
    action: string;
    moduleUsed: string;
    ipOrDevice: string;
  }[];
}

export const BoisertEmpirePortal: React.FC<BoisertEmpirePortalProps> = ({ onNavigateTab }) => {
  const [authStep, setAuthStep] = useState<'welcome' | 'door_select' | 'login' | 'agreement' | 'dashboard' | 'master_creator_dashboard' | 'handbook' | 'locked_out'>('welcome');
  const [selectedDoor, setSelectedDoor] = useState<'adviser' | 'non_adviser' | 'master_creator' | null>(null);
  
  // Login & Password Creation State
  const [usernameInput, setUsernameInput] = useState('');
  const [depedEmail, setDepedEmail] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [isDepEdTeacher, setIsDepEdTeacher] = useState(true);
  const [agreementAccepted, setAgreementAccepted] = useState(false);

  // Stored Registered Users Database with Door-to-Door Clicking Activity Telemetry
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([
    {
      name: 'Steaven Kinth D. Boiser',
      email: 'steavenkinth.boiser@deped.gov.ph',
      password: 'MasterCreatorSecure2026!',
      role: 'master_creator',
      isVerifiedDepEd: true,
      createdAt: '2026-09-01',
      clickingActivities: [
        { timestamp: 'Today, 07:26 AM', action: 'Unlocked Master Creator Vault', moduleUsed: 'Boiser Empire Authentication', ipOrDevice: 'LNNCHS Secure Node A1' },
        { timestamp: 'Yesterday, 04:12 PM', action: 'Inspected 120 Section Masterlist', moduleUsed: 'SF1-10 Consolidated Registry', ipOrDevice: 'LNNCHS Secure Node A1' }
      ]
    },
    {
      name: 'Mrs. Roselyn Rufino',
      email: 'roselyn.rufino@deped.gov.ph',
      password: 'TeacherPassword123',
      role: 'adviser',
      section: 'G11 Academic 1 (Social Science Education)',
      isVerifiedDepEd: true,
      createdAt: '2026-09-10',
      clickingActivities: [
        { timestamp: 'Today, 06:45 AM', action: 'Generated SF9 Learner Report Card', moduleUsed: 'ECR Three-Term Grading & SF9', ipOrDevice: 'SHS Faculty Terminal 2' },
        { timestamp: 'Yesterday, 02:30 PM', action: 'Verified LIS Attendance Record', moduleUsed: 'SF2 Daily Attendance', ipOrDevice: 'SHS Faculty Terminal 2' }
      ]
    },
    {
      name: 'Mr. Melvin Tabacon',
      email: 'melvin.tabacon@deped.gov.ph',
      password: 'MelvinPassword2026',
      role: 'adviser',
      section: 'G12 TechPro 3 (Electrical Systems / EIM)',
      isVerifiedDepEd: true,
      createdAt: '2026-09-12',
      clickingActivities: [
        { timestamp: 'Yesterday, 4:15 PM', action: 'Filed Substitute Leave Form via OLS', moduleUsed: 'Leave & Substitution Module', ipOrDevice: 'TVET Workshop Terminal' }
      ]
    }
  ]);

  // Active Session State
  const [currentUser, setCurrentUser] = useState<RegisteredUser | null>(null);

  // Active Tab inside Dashboard
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'adviser_doors' | 'section_manager' | 'sf_records' | 'sub_forms' | 'summative' | 'ecr_3term' | 'ilaw_ppt' | 'honors' | 'activity_logs' | 'passwords_vault'>('adviser_doors');

  // Master Creator Door-to-Door Telemetry Modal State
  const [selectedTeacherTelemetry, setSelectedTeacherTelemetry] = useState<RegisteredUser | null>(null);

  // Audio / Speech Synthesis State
  const [audioLang, setAudioLang] = useState<'en' | 'tl' | 'ceb'>('en');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = (text: string, _lang: 'en' | 'tl' | 'ceb') => {
    setIsSpeaking(true);
    speakWithCebuanoMaleVoice(text, {
      appendTagline: true,
      rate: 0.88,
      pitch: 0.86,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  const stopSpeech = () => {
    stopCebuanoMaleVoice();
    setIsSpeaking(false);
  };

  const triggerAntiBreachSecurity = (reason: string) => {
    triggerSuspiciousActivityAndLogout(
      'unauthorized_door_visitor@lnnchs.deped.gov.ph',
      'Door Visitor',
      reason,
      'MASTER_DOOR_BREACH'
    );
    setAuthStep('locked_out');
  };

  const handleDoorChoice = (door: 'adviser' | 'non_adviser' | 'master_creator') => {
    setSelectedDoor(door);
    if (door === 'master_creator') {
      setUsernameInput('Steaven Kinth D. Boiser');
      setDepedEmail('steavenkinth.boiser@deped.gov.ph');
      setPasswordInput('MasterCreatorSecure2026!');
    } else {
      setUsernameInput('');
      setDepedEmail('');
      setPasswordInput('');
    }
    setAuthStep('login');
  };

  const logClickingAction = (username: string, action: string, moduleUsed: string) => {
    setRegisteredUsers(prev => prev.map(u => {
      if (u.name === username || u.email === depedEmail) {
        return {
          ...u,
          clickingActivities: [
            { timestamp: 'Just now (' + new Date().toLocaleTimeString() + ')', action, moduleUsed, ipOrDevice: 'LNNCHS Secure Node' },
            ...u.clickingActivities
          ]
        };
      }
      return u;
    }));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim() || !depedEmail.trim() || !passwordInput.trim()) {
      alert('Please fill in all required fields including your DepEd email and password.');
      return;
    }

    if (selectedDoor === 'master_creator') {
      if (usernameInput !== 'Steaven Kinth D. Boiser' || passwordInput !== 'MasterCreatorSecure2026!') {
        triggerAntiBreachSecurity('Invalid Master Creator credentials for Steaven Kinth D. Boiser.');
        return;
      }
      const masterUser: RegisteredUser = {
        name: 'Steaven Kinth D. Boiser',
        email: 'steavenkinth.boiser@deped.gov.ph',
        password: passwordInput,
        role: 'master_creator',
        isVerifiedDepEd: true,
        createdAt: new Date().toISOString(),
        clickingActivities: [
          { timestamp: 'Just now', action: 'Master Creator Login', moduleUsed: 'Boiser Empire Authentication', ipOrDevice: 'Master Terminal' }
        ]
      };
      setCurrentUser(masterUser);
      setAuthStep('agreement');
      return;
    }

    if (passwordInput.length < 6) {
      alert('Password must be at least 6 characters long for secure LNNCHS account protection.');
      return;
    }

    const newUser: RegisteredUser = {
      name: usernameInput,
      email: depedEmail,
      password: passwordInput,
      role: selectedDoor || 'adviser',
      section: selectedSectionId ? selectedSectionId : 'General LNNCHS Faculty Load',
      isVerifiedDepEd: isDepEdTeacher,
      createdAt: new Date().toISOString(),
      clickingActivities: [
        { timestamp: 'Just now', action: `Logged into ${selectedDoor} door`, moduleUsed: 'Authentication Suite', ipOrDevice: 'Faculty Terminal' }
      ]
    };

    setRegisteredUsers(prev => {
      const filtered = prev.filter(u => u.email !== depedEmail);
      return [...filtered, newUser];
    });

    setCurrentUser(newUser);
    setAuthStep('agreement');
  };

  const confirmAgreementAndEnter = () => {
    if (!agreementAccepted) {
      alert('Please accept the mandatory Do\'s and Don\'ts and Master Creator oversight agreement.');
      return;
    }

    if (selectedDoor === 'master_creator') {
      setAuthStep('master_creator_dashboard');
    } else {
      setAuthStep('dashboard');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 font-sans animate-fade-in text-stone-900">
      
      {/* ================= LOCKED OUT / SECURITY BREACH SCREEN ================= */}
      {authStep === 'locked_out' && (
        <div className="bg-red-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-red-500 text-center space-y-6 max-w-xl mx-auto">
          <ShieldAlert className="w-20 h-20 text-red-400 mx-auto animate-bounce" />
          <h1 className="text-3xl font-black uppercase text-red-300">Access Revoked &amp; Locked Out</h1>
          <p className="text-xs sm:text-sm text-red-200 leading-relaxed">
            Your session has been terminated by the <strong className="text-white">Master Creator (Steaven Kinth D. Boiser)</strong> due to suspected breach, unauthorized source code inspection, or data tampering attempt.
          </p>
          <div className="p-4 bg-red-900/60 rounded-2xl border border-red-700 text-xs text-red-100 font-mono">
            Security Incident ID: LNNCHS-SEC-{Math.floor(Math.random() * 89999 + 10000)} • Baroy, Lanao del Norte
          </div>
          <button
            onClick={() => { setAuthStep('welcome'); }}
            className="px-6 py-3 bg-white text-red-950 font-black rounded-xl text-xs uppercase tracking-wider hover:bg-stone-200 cursor-pointer shadow-lg"
          >
            Return to Secure Portal Home
          </button>
        </div>
      )}

      {/* ================= STEP 1: WELCOME & DOOR ENTRY ================= */}
      {authStep === 'welcome' && (
        <div className="bg-gradient-to-br from-[#002776] via-blue-900 to-stone-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-amber-400 relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-widest shadow-md">
              <Sparkles className="w-4 h-4" />
              <span>Official 120 LNNCHS Section &amp; Authentication Suite</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md">
              🏛️ BOISER EMPIRE AUTHENTICATION
            </h1>
            <p className="text-sm sm:text-base text-stone-200 font-medium leading-relaxed">
              Lanao del Norte National Comprehensive High School (LNNCHS) • Baroy, Lanao del Norte. 120 Fixed Sections (Grades 7–12), Adviser &amp; Master Creator Strict Privacy, SF1–SF10 Registry, &amp; Door-to-Door Clicking Telemetry.
            </p>

            {/* Audio Voice Guide Bar */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Mic className="w-4 h-4 animate-pulse" />
                <span>Hands-Free Audio Tutorial Guide (Bisaya, Tagalog, English):</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setAudioLang('en');
                    speakText('Welcome to Boiser Empire Authentication. Select your door, verify with your DepEd email, and access your 120 official sections and SF1 to SF10 records securely.', 'en');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${audioLang === 'en' && isSpeaking ? 'bg-amber-400 text-stone-950 animate-pulse' : 'bg-white/20 hover:bg-white/30 text-white'}`}
                >
                  English 🇬🇧
                </button>
                <button
                  onClick={() => {
                    setAudioLang('tl');
                    speakText('Maligayang pagdating sa Boiser Empire Authentication. Piliin ang inyong pinto, i-verify ang DepEd email, at buksan ang inyong mga opisyal na seksyon at rekord ng SF1 hanggang SF10.', 'tl');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${audioLang === 'tl' && isSpeaking ? 'bg-amber-400 text-stone-950 animate-pulse' : 'bg-white/20 hover:bg-white/30 text-white'}`}
                >
                  Tagalog 🇵🇭
                </button>
                <button
                  onClick={() => {
                    setAudioLang('ceb');
                    speakText('Maayong pag-abot sa Boiser Empire Authentication. Pilia ang imong pinto, i-verify ang DepEd email, ug ablihi ang imong opisyal nga mga seksyon ug rekord sa SF1 hangtod SF10.', 'ceb');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${audioLang === 'ceb' && isSpeaking ? 'bg-amber-400 text-stone-950 animate-pulse' : 'bg-white/20 hover:bg-white/30 text-white'}`}
                >
                  Bisaya 🌊
                </button>
                {isSpeaking && (
                  <button
                    onClick={stopSpeech}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Stop ⏹️
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            {/* Adviser Door */}
            <div 
              onClick={() => handleDoorChoice('adviser')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-6 rounded-2xl border-2 border-white/20 transition cursor-pointer flex flex-col items-center text-center space-y-4 group shadow-lg"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center text-2xl group-hover:scale-110 transition shadow-md">
                🚪🚪
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Adviser Door</h3>
                <p className="text-xs text-stone-300 mt-1">
                  Access fixed sectioning (Grades 7–12), official LIS student lists, &amp; SF1–SF10 reports exclusively for advisers.
                </p>
              </div>
              <span className="px-4 py-2 bg-amber-400 text-stone-950 font-black rounded-xl text-xs flex items-center gap-1 group-hover:bg-amber-300 transition">
                <span>Enter Adviser Room</span>
                <ArrowRight size={14} />
              </span>
            </div>

            {/* Non-Adviser Door */}
            <div 
              onClick={() => handleDoorChoice('non_adviser')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-6 rounded-2xl border-2 border-white/20 transition cursor-pointer flex flex-col items-center text-center space-y-4 group shadow-lg"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-2xl group-hover:scale-110 transition shadow-md">
                🚪🔑
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Non-Adviser Door</h3>
                <p className="text-xs text-stone-300 mt-1">
                  Access subject teaching loads, ECR Three-Term grading, ILAW generator, &amp; substitution forms.
                </p>
              </div>
              <span className="px-4 py-2 bg-blue-600 text-white font-black rounded-xl text-xs flex items-center gap-1 group-hover:bg-blue-500 transition">
                <span>Enter Subject Room</span>
                <ArrowRight size={14} />
              </span>
            </div>

            {/* Master Creator Door (Steaven Kinth D. Boiser) */}
            <div 
              onClick={() => handleDoorChoice('master_creator')}
              className="bg-amber-500/20 hover:bg-amber-500/30 backdrop-blur-md p-6 rounded-2xl border-2 border-amber-400 transition cursor-pointer flex flex-col items-center text-center space-y-4 group shadow-lg"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center text-2xl group-hover:scale-110 transition shadow-md animate-pulse">
                👑
              </div>
              <div>
                <h3 className="text-lg font-black text-amber-300">Master Creator Door</h3>
                <p className="text-xs text-stone-300 mt-1">
                  Steaven Kinth D. Boiser Exclusive Master Control: Door-to-door clicking telemetry, passwords &amp; all 120 sections.
                </p>
              </div>
              <span className="px-4 py-2 bg-amber-400 text-stone-950 font-black rounded-xl text-xs flex items-center gap-1 group-hover:bg-amber-300 transition">
                <span>Master Creator Login</span>
                <ArrowRight size={14} />
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs text-stone-300">
            <div>🔒 120 Official Sections (Grades 7–12) • Adviser &amp; Master Creator Privacy Enforced</div>
            <button
              onClick={() => setAuthStep('handbook')}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <BookOpenCheck size={14} />
              <span>Tutorial Handbook &amp; Do's/Don'ts</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 1.5: TUTORIAL HANDBOOK ================= */}
      {authStep === 'handbook' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-stone-800 space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-[#002776] text-amber-400 flex items-center justify-center font-black text-2xl">
                📖
              </span>
              <div>
                <h2 className="text-xl font-black uppercase text-stone-950">LNNCHS Fixed 120 Sectioning &amp; Telemetry Guide</h2>
                <p className="text-xs text-stone-500">Official Step-by-Step Guide in English, Tagalog, and Bisaya</p>
              </div>
            </div>
            <button
              onClick={() => setAuthStep('welcome')}
              className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold rounded-xl text-xs cursor-pointer"
            >
              ✕ Back to Home
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-300 space-y-4">
              <h3 className="text-sm font-black text-amber-950 uppercase flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
                <span>Strict Adviser &amp; Master Creator Privacy</span>
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                Only the assigned adviser of each section and Master Creator Steaven Kinth D. Boiser can view SF1–SF10 and LIS student records. The Master Creator has a door-to-door telemetry inspector to review all clicking activities.
              </p>
            </div>

            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
              <h3 className="text-sm font-black text-stone-900 uppercase flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#002776]" />
                <span>Step-by-Step Instructions</span>
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-xs text-stone-700">
                <li>Select your designated door (Adviser, Non-Adviser, or Master Creator).</li>
                <li>Enter your DepEd email and create your secure password.</li>
                <li>Advisers can manage their exact fixed section (Grades 7–12) and view LIS student masterlists privately.</li>
                <li>Master Creator Steaven Kinth D. Boiser opens door-to-door clicking telemetry for complete oversight.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2: DOOR LOGIN FORM ================= */}
      {authStep === 'login' && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border-2 border-stone-800 max-w-lg mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-[#002776] text-white flex items-center justify-center font-black text-lg">
                {selectedDoor === 'master_creator' ? '👑' : selectedDoor === 'adviser' ? '🚪' : '🔑'}
              </span>
              <div>
                <h3 className="text-lg font-black uppercase text-stone-900">
                  {selectedDoor === 'master_creator' ? 'Master Creator Secure Access' : selectedDoor === 'adviser' ? 'Adviser Door (120 Sections)' : 'Non-Adviser Door'}
                </h3>
                <p className="text-xs text-stone-500">Lanao del Norte National Comprehensive High School</p>
              </div>
            </div>
            <button
              onClick={() => setAuthStep('welcome')}
              className="text-stone-400 hover:text-stone-700 font-bold text-sm cursor-pointer"
            >
              ✕ Back
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-stone-800 uppercase">Teacher Full Name / Username:</label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                readOnly={selectedDoor === 'master_creator'}
                placeholder={selectedDoor === 'master_creator' ? 'Steaven Kinth D. Boiser' : 'e.g., Mrs. Roselyn Rufino'}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-stone-800 uppercase">DepEd Email Account (@deped.gov.ph):</label>
              <input
                type="email"
                required
                value={depedEmail}
                onChange={(e) => setDepedEmail(e.target.value)}
                readOnly={selectedDoor === 'master_creator'}
                placeholder="teacher.name@deped.gov.ph"
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-stone-800 uppercase">Create / Enter Secure Password:</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  readOnly={selectedDoor === 'master_creator'}
                  placeholder="Min. 6 characters"
                  className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-900 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {selectedDoor === 'adviser' && (
              <div className="space-y-1.5">
                <label className="text-xs font-black text-stone-800 uppercase">Select Official Fixed Section (120 Sections JHS &amp; SHS):</label>
                <select
                  required
                  value={selectedSectionId}
                  onChange={(e) => setSelectedSectionId(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-900"
                >
                  <option value="">-- Choose Fixed LNNCHS Section --</option>
                  {Object.entries(LNNCHS_20_SECTIONS_PER_GRADE).map(([grade, secs]) => (
                    <optgroup key={grade} label={grade}>
                      {secs.map(s => (
                        <option key={s.id} value={s.sectionName}>
                          {s.sectionName} (Official Adviser: {s.adviserName})
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="depedCheck"
                checked={isDepEdTeacher}
                onChange={(e) => setIsDepEdTeacher(e.target.checked)}
                className="w-4 h-4 rounded text-[#002776]"
              />
              <label htmlFor="depedCheck" className="text-xs font-bold text-stone-700">
                I am verified DepEd personnel at LNNCHS Baroy.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#002776] hover:bg-blue-900 text-white font-black rounded-xl text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
            >
              Proceed to Agreement →
            </button>
          </form>
        </div>
      )}

      {/* ================= STEP 3: AGREEMENT SCREEN ================= */}
      {authStep === 'agreement' && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border-2 border-stone-800 max-w-xl mx-auto space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
            <span className="p-3 bg-blue-100 text-[#002776] rounded-2xl">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <div>
              <h3 className="text-lg font-black uppercase text-stone-900">
                LNNCHS Fixed Section &amp; Telemetry Agreement
              </h3>
              <p className="text-xs text-stone-500">Strict Adviser &amp; Master Creator Privacy</p>
            </div>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3 text-xs text-stone-700 leading-relaxed font-medium">
            <p>
              By accessing <strong className="text-stone-900">Boiser Empire Authentication</strong>, you agree that:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-800">
              <li>Only you (as assigned adviser) and <strong className="text-[#002776]">Master Creator Steaven Kinth D. Boiser</strong> can view SF1–SF10 data for your section.</li>
              <li>All door-to-door clicking activities, form generations, and credential updates are securely logged for telemetry oversight.</li>
              <li>Attempting unauthorized breaches or source inspection will immediately revoke access.</li>
            </ul>
          </div>

          <div className="flex items-center gap-3 pt-2 bg-blue-50/50 p-4 rounded-2xl border border-blue-200">
            <input
              type="checkbox"
              id="agreeCheck"
              checked={agreementAccepted}
              onChange={(e) => setAgreementAccepted(e.target.checked)}
              className="w-5 h-5 rounded text-[#002776] cursor-pointer"
            />
            <label htmlFor="agreeCheck" className="text-xs font-bold text-stone-900 cursor-pointer">
              I agree to strict LNNCHS adviser privacy and Master Creator oversight by Steaven Kinth D. Boiser.
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAuthStep('login')}
              className="w-1/3 py-3 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold rounded-xl text-xs cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={confirmAgreementAndEnter}
              disabled={!agreementAccepted}
              className={`w-2/3 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition ${agreementAccepted ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-md' : 'bg-stone-300 text-stone-500 cursor-not-allowed'}`}
            >
              Enter Dashboard →
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 4: TEACHER DASHBOARD (ADVISER / NON-ADVISER) ================= */}
      {authStep === 'dashboard' && currentUser && (
        <div className="space-y-6">
          <div className="bg-[#002776] text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border-2 border-amber-400">
            <div className="flex items-center gap-4">
              <span className="w-14 h-14 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-black text-2xl shadow-md">
                🎓
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black uppercase font-mono">
                    {currentUser.role === 'adviser' ? 'Adviser Portal (Fixed Section)' : 'Subject Teacher Portal'}
                  </span>
                  <span className="text-xs text-stone-200 font-mono">LNNCHS Baroy</span>
                </div>
                <h2 className="text-xl font-black text-white mt-0.5">
                  Welcome, {currentUser.name} {currentUser.section ? `(${currentUser.section})` : ''}
                </h2>
                <p className="text-xs text-stone-300 font-mono">
                  DepEd Email: {currentUser.email} • Private Section Access Verified
                </p>
              </div>
            </div>

            <button
              onClick={() => { setAuthStep('welcome'); setCurrentUser(null); }}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-xl text-xs transition flex items-center gap-2 cursor-pointer shadow-sm self-start md:self-auto"
            >
              <LogOut size={14} />
              <span>Exit Door</span>
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {[
              { id: 'adviser_doors', label: '🏡 Adviser Doors (House View)', icon: Home },
              { id: 'overview', label: '📊 Dashboard Overview', icon: BarChart3 },
              { id: 'section_manager', label: '🏫 Sections & Advisers Manager', icon: Users },
              { id: 'sf_records', label: '📋 LIS SF1–SF10 (Private)', icon: FileText },
              { id: 'sub_forms', label: '📝 Substitution & Leave Forms', icon: Calendar },
              { id: 'summative', label: '📈 Summative Records', icon: CheckCircle2 },
              { id: 'ecr_3term', label: '📐 ECR Three-Term Grading', icon: FileSpreadsheet },
              { id: 'ilaw_ppt', label: '💡 ILAW (PPT & LAS)', icon: BookOpen },
              { id: 'honors', label: '🏆 Honor Roll & Rankings', icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSubTab(tab.id as any);
                    logClickingAction(currentUser.name, `Opened tab: ${tab.label}`, 'Dashboard Navigation');
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${active ? 'bg-[#002776] text-white shadow-md' : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'}`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200 space-y-6">
            {activeSubTab === 'adviser_doors' && (
              <AdviserDoorsHome currentUser={currentUser} />
            )}

            {activeSubTab === 'section_manager' && (
              <SectionManager currentUser={currentUser} />
            )}

            {activeSubTab === 'overview' && (
              <div className="space-y-6">
                <div className="border-b border-stone-200 pb-4">
                  <h3 className="text-base font-black text-stone-900 uppercase">Fixed Section Advisory Overview</h3>
                  <p className="text-xs text-stone-500">Strictly Private: Accessible only by Assigned Adviser and Master Creator Steaven Kinth D. Boiser</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-blue-800 uppercase block">Fixed Advisory Section</span>
                    <strong className="text-base font-black text-[#002776] block">{currentUser.section || 'General Faculty Load'}</strong>
                    <span className="text-[11px] text-stone-600 block">Official LIS Registry Synced</span>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-emerald-800 uppercase block">SF1–SF10 Data Privacy</span>
                    <strong className="text-base font-black text-emerald-950 block">🔒 Locked &amp; Private</strong>
                    <span className="text-[11px] text-stone-600 block">Protected under Master Creator Steaven Boiser</span>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 p-5 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-purple-800 uppercase block">Door-to-Door Telemetry</span>
                    <strong className="text-base font-black text-purple-950 block">⚡ Active Logging</strong>
                    <span className="text-[11px] text-stone-600 block">Clicking actions recorded securely</span>
                  </div>
                </div>
              </div>
            )}

            {activeSubTab === 'sf_records' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <div>
                    <h3 className="text-base font-black text-stone-900 uppercase">📋 Private LIS School Forms 1 to 10</h3>
                    <p className="text-xs text-stone-500">Exclusive Section Data for {currentUser.section}</p>
                  </div>
                  <button 
                    onClick={() => {
                      logClickingAction(currentUser.name, 'Downloaded SF1-10 Packet', 'SF Records Module');
                      alert(`Successfully downloaded official SF packet for ${currentUser.section}`);
                    }}
                    className="px-4 py-2 bg-[#002776] hover:bg-blue-900 text-white font-black rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Download size={14} />
                    <span>Download SF Packet</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['SF1 School Register', 'SF2 Daily Attendance', 'SF3 Books Issued', 'SF4 Monthly Summary', 'SF5 Promotion Report', 'SF6 Summary Report', 'SF7 Personnel List', 'SF8 Health Profile', 'SF9 Report Card', 'SF10 Permanent Record'].map((form) => (
                    <div key={form} className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">{form}</span>
                      <button
                        onClick={() => {
                          logClickingAction(currentUser.name, `Viewed ${form}`, 'SF Records Module');
                          alert(`Opening ${form} for ${currentUser.section}`);
                        }}
                        className="px-3 py-1.5 bg-white border border-stone-300 text-stone-800 font-bold rounded-lg text-xs cursor-pointer shadow-xs"
                      >
                        View Private Record
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSubTab === 'sub_forms' && (
              <div className="space-y-4">
                <h3 className="text-base font-black text-stone-900 uppercase">Substitution &amp; Leave Filing</h3>
                <p className="text-xs text-stone-500">Manage leave forms and substitute assignments.</p>
              </div>
            )}

            {activeSubTab === 'summative' && (
              <div className="space-y-4">
                <h3 className="text-base font-black text-stone-900 uppercase">Summative Records</h3>
                <p className="text-xs text-stone-500">Written works and performance tasks.</p>
              </div>
            )}

            {activeSubTab === 'ecr_3term' && (
              <div className="space-y-4">
                <h3 className="text-base font-black text-stone-900 uppercase">ECR Three-Term Grading</h3>
                <p className="text-xs text-stone-500">Term transmutation and averages.</p>
              </div>
            )}

            {activeSubTab === 'ilaw_ppt' && (
              <div className="space-y-4">
                <h3 className="text-base font-black text-stone-900 uppercase">ILAW Lesson Plan Generator</h3>
                <button onClick={() => onNavigateTab('ilaw')} className="px-4 py-2 bg-purple-700 text-white font-bold rounded-xl text-xs cursor-pointer">
                  Open ILAW Studio
                </button>
              </div>
            )}

            {activeSubTab === 'honors' && (
              <div className="space-y-4">
                <h3 className="text-base font-black text-stone-900 uppercase">Honor Roll &amp; Academic Ranking</h3>
                <p className="text-xs text-stone-500">Three-term honor computations.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= STEP 5: MASTER CREATOR DASHBOARD WITH DOOR-TO-DOOR TELEMETRY ================= */}
      {authStep === 'master_creator_dashboard' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-2xl border-4 border-amber-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="w-16 h-16 rounded-2xl bg-white text-stone-950 flex items-center justify-center font-black text-3xl shadow-lg">
                👑
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-stone-950 text-amber-400 rounded-full text-xs font-black uppercase tracking-wider font-mono">
                    Master Creator Exclusive Control
                  </span>
                  <span className="text-xs text-stone-200">Steaven Kinth D. Boiser</span>
                </div>
                <h2 className="text-2xl font-black text-white mt-1">
                  LNNCHS Door-to-Door Clicking Telemetry &amp; Master Password Vault
                </h2>
                <p className="text-xs text-amber-100 font-medium">
                  Exclusive oversight of all 120 fixed sections (Grades 7–12), SF1–SF10 private data, and real-time door-to-door teacher clicking activities.
                </p>
              </div>
            </div>

            <button
              onClick={() => { setAuthStep('welcome'); setCurrentUser(null); }}
              className="px-5 py-2.5 bg-stone-950 hover:bg-stone-900 text-amber-400 font-black rounded-xl text-xs transition flex items-center gap-2 cursor-pointer shadow-md self-start md:self-auto"
            >
              <LogOut size={14} />
              <span>Lock Master Room</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-stone-500 uppercase">Fixed LNNCHS Sections</span>
              <div className="text-3xl font-black text-[#002776]">120</div>
              <span className="text-[11px] text-emerald-700 font-bold">Grades 7 to 12 (20/grade)</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-stone-500 uppercase">Consolidated LIS Learners</span>
              <div className="text-3xl font-black text-emerald-800">5,400+</div>
              <span className="text-[11px] text-emerald-700 font-bold">SF1-SF10 Private Masterlist</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-stone-500 uppercase">Registered Teachers</span>
              <div className="text-3xl font-black text-purple-900">{registeredUsers.length}</div>
              <span className="text-[11px] text-purple-700 font-bold">Credentials &amp; Telemetry Active</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-stone-500 uppercase">Master Control</span>
              <div className="text-3xl font-black text-amber-700">Door-to-Door</div>
              <span className="text-[11px] text-stone-600 font-bold">Steaven Kinth D. Boiser</span>
            </div>
          </div>

          {/* Steaven Kinth D. Boiser Exclusive Master Creator Skills Vault */}
          <MasterCreatorSkillsVault />

          {/* Door-to-Door Teacher Telemetry & Password Vault */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <h3 className="text-base font-black text-stone-900 uppercase">
                  🚪 Door-to-Door Teacher Clicking Telemetry &amp; Password Vault (Steaven Kinth D. Boiser)
                </h3>
                <p className="text-xs text-stone-500">Click any teacher's door to inspect their exact real-time clicking activities and SF form actions</p>
              </div>
              <button
                onClick={() => alert('Door-to-door telemetry audit exported successfully.')}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Download size={14} />
                <span>Export Telemetry CSV</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {registeredUsers.map((user) => (
                <div key={user.email} className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl bg-[#002776] text-amber-400 flex items-center justify-center font-bold text-base">
                      🚪
                    </span>
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-black uppercase font-mono">
                      {user.role}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-sm text-stone-900">{user.name}</h4>
                    <p className="text-xs text-stone-500 font-mono">{user.email}</p>
                    <p className="text-[11px] text-[#002776] font-bold">Section: {user.section || 'Master Administrator'}</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1 text-xs">
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span>Password:</span>
                      <strong className="font-mono text-emerald-800">{user.password}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span>Recorded Actions:</span>
                      <strong className="text-[#002776]">{user.clickingActivities.length} events</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTeacherTelemetry(user)}
                    className="w-full py-2.5 bg-[#002776] hover:bg-blue-900 text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition shadow-sm"
                  >
                    <Activity size={14} />
                    <span>Open Door Telemetry →</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Selected Teacher Telemetry Modal */}
            {selectedTeacherTelemetry && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border-2 border-stone-800 space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-black text-xl">
                        🚪
                      </span>
                      <div>
                        <h3 className="text-lg font-black text-stone-900 uppercase">
                          Teacher Door Telemetry: {selectedTeacherTelemetry.name}
                        </h3>
                        <p className="text-xs text-stone-500">{selectedTeacherTelemetry.email} • {selectedTeacherTelemetry.section || 'Master Creator'}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedTeacherTelemetry(null)}
                      className="text-stone-400 hover:text-stone-700 font-bold text-base cursor-pointer"
                    >
                      ✕ Close
                    </button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-stone-800 uppercase">Real-Time Clicking &amp; Activity Audit Log:</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {selectedTeacherTelemetry.clickingActivities.map((act, i) => (
                        <div key={i} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                          <div className="space-y-0.5">
                            <strong className="text-stone-900 block">{act.action}</strong>
                            <span className="text-[11px] text-stone-500">Module: {act.moduleUsed} • Device: {act.ipOrDevice}</span>
                          </div>
                          <span className="font-mono text-[11px] text-[#002776] bg-blue-50 px-2 py-1 rounded-md">{act.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2 border-t border-stone-200">
                    <button
                      onClick={() => {
                        triggerAntiBreachSecurity(`Revoked access for ${selectedTeacherTelemetry.name}`);
                        setSelectedTeacherTelemetry(null);
                      }}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                    >
                      Revoke Door Access 🚫
                    </button>
                    <button
                      onClick={() => setSelectedTeacherTelemetry(null)}
                      className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold rounded-xl text-xs cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
