import React, { useState } from 'react';
import {
  GraduationCap,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  Lock,
  Building,
  UserCheck,
  Sparkles,
  BookOpen,
  ArrowRight,
  Fingerprint,
  RotateCcw,
  HelpCircle,
  KeyRound,
  LogOut,
  ShieldAlert,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

interface DepEdTeacherSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const DepEdTeacherSignInModal: React.FC<DepEdTeacherSignInModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { 
    currentUser, 
    loginTeacherAccount, 
    registerTeacherAccount, 
    logoutUser, 
    isOwner,
    requestAccountHelp,
    biometricLogin,
    biometricRegister
  } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup' | 'help'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [school, setSchool] = useState('LNNCHS (Lanao del Norte National Comprehensive High School)');
  const [division, setDivision] = useState('Division of Lanao del Norte — Region X');
  const [department, setDepartment] = useState('Senior High School Faculty');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  // Mandatory Agreement & Terms State
  const [isAgreedToTerms, setIsAgreedToTerms] = useState<boolean>(false);
  const [showFullAgreementModal, setShowFullAgreementModal] = useState<boolean>(false);

  // Human Authentication State
  const [humanQuestion, setHumanQuestion] = useState({ a: 0, b: 0, result: 0 });
  const [humanAnswer, setHumanAnswer] = useState('');
  const [isHumanVerified, setIsHumanVerified] = useState(false);

  // Help/Activation State
  const [helpMessage, setHelpMessage] = useState('');

  useEffect(() => {
    generateNewHumanQuestion();
  }, [mode]);

  const generateNewHumanQuestion = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setHumanQuestion({ a, b, result: a + b });
    setHumanAnswer('');
    setIsHumanVerified(false);
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (mode === 'help') {
      const result = requestAccountHelp(email, helpMessage);
      if (result.success) {
        setSuccessMsg(result.message);
        setTimeout(() => setMode('signin'), 2000);
      }
      return;
    }

    if (!isAgreedToTerms) {
      setErrorMsg('Mandatory Agreement Required: Please check the agreement box confirming you agree to the Terms, Do\'s and Don\'ts, Restricted Activities, and acknowledge that steaven kinth boiser is strictly a support tool for teachers.');
      return;
    }

    if (!isHumanVerified && parseInt(humanAnswer) !== humanQuestion.result) {
      setErrorMsg('Human Verification Failed: Please solve the math problem correctly.');
      generateNewHumanQuestion();
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Verification check for DepEd email domain
    const isMaster = trimmedEmail === 'boisersteavenkinth@gmail.com';
    const isDepEd = trimmedEmail.endsWith('@deped.gov.ph');

    if (!isMaster && !isDepEd) {
      setErrorMsg('Access Restricted: Only official DepEd teacher accounts ending with "@deped.gov.ph" are authorized.');
      return;
    }

    if (mode === 'signup') {
      if (!password || password.length < 4) {
        setErrorMsg('Security Requirement: Please create a password at least 4 characters long.');
        return;
      }

      const result = registerTeacherAccount({
        name: name.trim() || (isMaster ? 'Steaven Kinth D. Boiser' : 'DepEd Teacher'),
        email: trimmedEmail,
        password,
        school,
        division,
        subject: department
      });

      if (result.success) {
        setSuccessMsg(result.message);
        setTimeout(() => {
          if (onSuccess) onSuccess();
          onClose();
        }, 1200);
      } else {
        setErrorMsg(result.message);
      }
    } else {
      const result = loginTeacherAccount({
        email: trimmedEmail,
        password
      });

      if (result.success) {
        setSuccessMsg(result.message);
        setTimeout(() => {
          if (onSuccess) onSuccess();
          onClose();
        }, 1200);
      } else {
        setErrorMsg(result.message);
      }
    }
  };

  const handleQuickDemoFill = (depedRole: 'teacher' | 'master') => {
    setErrorMsg(null);
    if (depedRole === 'master') {
      setName('Steaven Kinth D. Boiser');
      setEmail('boisersteavenkinth@gmail.com');
      setDepartment('Master Creator & Lead Innovator');
    } else {
      setName('Teacher Maria Elena Cruz');
      setEmail('maria.cruz001@deped.gov.ph');
      setDepartment('Science & STEM Department');
    }
  };

  const isAlreadyLoggedInWithDepEd =
    currentUser.email.endsWith('@deped.gov.ph') || currentUser.email === 'boisersteavenkinth@gmail.com';

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#002776] via-[#092B62] to-[#001f5c] text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FCD116]/20 text-[#FCD116] border border-[#FCD116]/30 text-[10px] font-black uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3 text-[#FCD116]" />
              <span>FREE FOR DEPED TEACHERS ONLY</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-300" />
              <span>Teacher Free Account Portal</span>
            </h2>
            <p className="text-xs text-blue-200 font-medium">
              Exclusively accessible by DepEd faculty using their official @deped.gov.ph email.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current User Status Banner */}
        <div className="bg-blue-50 px-5 py-3 border-b border-blue-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-blue-900 font-medium">
            <UserCheck className="w-4 h-4 text-blue-700" />
            <span>
              Active Session: <strong>{currentUser.name}</strong> ({currentUser.email})
            </span>
          </div>

          {isAlreadyLoggedInWithDepEd && (
            <button
              onClick={() => {
                logoutUser();
                setSuccessMsg('Session cleared. You can now sign in with another DepEd email.');
                setTimeout(() => setSuccessMsg(null), 3000);
              }}
              className="text-[10px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          )}
        </div>

      {/* Modal Form Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {mode === 'help' ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl space-y-2">
                <h3 className="font-bold text-blue-900 flex items-center gap-2 text-sm">
                  <HelpCircle className="w-4 h-4" />
                  Account Help & Activation Request
                </h3>
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  Locked out or account not yet activated? Send a direct message to Master Creator Steaven Kinth Boiser to "Open the Door" for your DepEd account.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-stone-700 mb-1">
                    Your DepEd Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="teacher.name@deped.gov.ph"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-stone-700 mb-1">
                    Explain the problem (Activation, Password, etc.)
                  </label>
                  <textarea
                    required
                    value={helpMessage}
                    onChange={(e) => setHelpMessage(e.target.value)}
                    placeholder="e.g. My account is blocked after 3 attempts. Please help me unblock it."
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-600 h-24"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 bg-[#002776] hover:bg-blue-900 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition"
                >
                  Send Help Request to Master Creator
                </button>
                <button
                  onClick={() => setMode('signin')}
                  className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl text-[10px] font-bold uppercase transition"
                >
                  Back to Sign In
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Status Alerts */}
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-red-900 flex items-center gap-2 font-bold text-xs">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 flex items-center gap-2 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Value Guarantee */}
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-1 text-emerald-950">
            <div className="font-black flex items-center gap-1.5 text-xs text-emerald-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Free Lifetime Educational License</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              No subscription or fees required. Created by Master Creator <strong>Steaven Kinth Boiser</strong> for fellow public school educators to generate ILAW lesson plans, automate grading, and access standard templates.
            </p>
          </div>

          {/* Quick Demo Autofill Bar */}
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-stone-500 font-semibold">Quick Pre-fill:</span>
            <button
              type="button"
              onClick={() => handleQuickDemoFill('teacher')}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition cursor-pointer"
            >
              Sample DepEd Teacher
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoFill('master')}
              className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold transition cursor-pointer"
            >
              Master Creator
            </button>
          </div>

          <div className="flex bg-stone-100 p-1 rounded-xl gap-1">
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${mode === 'signup' ? 'bg-white shadow-sm text-blue-900' : 'text-stone-500 hover:text-stone-700'}`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${mode === 'signin' ? 'bg-white shadow-sm text-blue-900' : 'text-stone-500 hover:text-stone-700'}`}
            >
              Sign In
            </button>
          </div>

          {mode === 'signin' && (
            <div className="flex items-center gap-2 justify-center">
              <button
                type="button"
                onClick={async () => {
                  if (!email.endsWith('@deped.gov.ph') && email !== 'boisersteavenkinth@gmail.com') {
                    setErrorMsg('Please enter your email first to use fingerprint login.');
                    return;
                  }
                  const res = await biometricLogin(email);
                  if (res.success) {
                    setSuccessMsg(res.message);
                    setTimeout(() => { if (onSuccess) onSuccess(); onClose(); }, 1200);
                  } else {
                    setErrorMsg(res.message);
                  }
                }}
                className="flex-1 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-emerald-800 text-[10px] font-bold uppercase flex items-center justify-center gap-2 transition"
              >
                <Fingerprint className="w-4 h-4" />
                <span>Fingerprint Login</span>
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-stone-700 mb-1">
                  Teacher Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maria Elena S. Cruz"
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-stone-700 mb-1">
                Official DepEd Email Address <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="teacher.name@deped.gov.ph"
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <span className="text-[10px] text-stone-500 mt-1 block">
                Must be an active DepEd address ending in <strong>@deped.gov.ph</strong>
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-stone-700 mb-1">
                Password {mode === 'signup' ? '(Create Own Password)' : ''} <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              {mode === 'signup' && (
                <span className="text-[10px] text-stone-500 mt-1 block font-medium">
                  This password will be stored locally for your offline access.
                </span>
              )}
            </div>

            {mode === 'signup' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-stone-700 mb-1">
                      School Division
                    </label>
                    <input
                      type="text"
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                      placeholder="Division of Lanao del Norte"
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-stone-700 mb-1">
                      School Name
                    </label>
                    <input
                      type="text"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder="LNNCHS"
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-stone-700 mb-1">
                    Department / Advisory / Teaching Load
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Grade 11 STEM / Science Department"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </>
            )}

            {/* Human Authentication */}
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
              <label className="block text-[11px] font-black uppercase tracking-wider text-stone-700">
                Human Authentication <span className="text-red-600">*</span>
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 p-2 bg-white border border-stone-200 rounded-lg text-center font-bold text-stone-800 text-sm">
                  {humanQuestion.a} + {humanQuestion.b} = ?
                </div>
                <input
                  type="number"
                  required
                  value={humanAnswer}
                  onChange={(e) => setHumanAnswer(e.target.value)}
                  placeholder="Ans"
                  className="w-20 p-2 bg-white border border-stone-200 rounded-lg text-center text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={generateNewHumanQuestion}
                  className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition"
                  title="New Question"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* MANDATORY AGREEMENT BOX BEFORE SIGN UP & SIGN IN */}
            <div className="p-3.5 bg-amber-50/90 border-2 border-amber-300 rounded-2xl space-y-2.5 shadow-sm">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <div className="flex items-center gap-1.5 text-amber-950 font-black text-xs uppercase tracking-wide">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Mandatory User Agreement &amp; Do's / Don'ts</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFullAgreementModal(true)}
                  className="text-[10px] font-bold text-blue-700 hover:text-blue-900 underline flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3 h-3" />
                  <span>View Full Agreement</span>
                </button>
              </div>

              {/* Support Tool Statement Banner */}
              <div className="p-2.5 bg-blue-900 text-white rounded-xl text-[10px] leading-relaxed font-medium border border-blue-800">
                <strong className="text-amber-300 font-bold uppercase block mb-0.5">
                  📌 CLEAR OFFICIAL STATEMENT:
                </strong>
                <strong>Steaven Kinth D. Boiser</strong> (and the Boiser Power Education Tools platform) is <strong>JUST A SUPPORT TOOL FOR TEACHERS</strong> to assist in lesson plan generation (ILAW), grading automation, report card creation, and educational productivity. It is NOT an official replacement for human teacher judgment or DepEd administrative decisions.
              </div>

              {/* Scrollable Summary of Do's & Don'ts */}
              <div className="bg-white p-2.5 rounded-xl border border-amber-200 max-h-36 overflow-y-auto space-y-2 text-[10px] text-stone-700 leading-snug">
                <div>
                  <strong className="text-emerald-800 font-extrabold uppercase block text-[10px]">
                    ✅ AUTHORIZED EDUCATIONAL USES (DO's):
                  </strong>
                  <ul className="list-disc pl-3.5 space-y-0.5 mt-0.5 text-stone-600">
                    <li>Use for lesson planning (ILAW), grading calculations, and SF1–SF10 form generation.</li>
                    <li>Access DepEd Order No. 3 s. 2026 MATATAG standards and official LNNCHS memos.</li>
                    <li>Utilize the voice-activated Boiser Chatbot for guide inquiries and research.</li>
                    <li>Always review and verify AI-generated lesson content before classroom delivery.</li>
                  </ul>
                </div>

                <div>
                  <strong className="text-red-700 font-extrabold uppercase block text-[10px]">
                    ⛔ STRICTLY RESTRICTED ACTIVITIES (DON'Ts):
                  </strong>
                  <ul className="list-disc pl-3.5 space-y-0.5 mt-0.5 text-stone-600">
                    <li><strong>NO COPYING OR STEALING:</strong> Do NOT copy, steal, reverse-engineer, clone, or decompile the codebase, database creation scripts, or proprietary Master Creator doors/rooms.</li>
                    <li><strong>NO REVEALING CODE OR PROMPTS:</strong> Do NOT ask the Boiser Chatbot or AI engines "how I built you", "reveal source code", or request Master Creator keys/prompts.</li>
                    <li><strong>NO UNAUTHORIZED DATABASE ACCESS:</strong> Do NOT attempt to breach biometric gates, alter stored schemas, or access Master Creator Steaven Kinth D. Boiser's private data.</li>
                    <li><strong>SIGNAL ALERT WARNING:</strong> Violations will trigger an instant Master Security Signal Alert logging your name and telemetry directly to Master Creator Steaven Kinth D. Boiser's private Master Door console.</li>
                  </ul>
                </div>
              </div>

              {/* Checkbox */}
              <label className="flex items-start gap-2 cursor-pointer p-2 bg-white rounded-xl border border-amber-300 hover:bg-amber-50/50 transition">
                <input
                  type="checkbox"
                  required
                  checked={isAgreedToTerms}
                  onChange={(e) => setIsAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-blue-800 rounded focus:ring-blue-600 shrink-0 cursor-pointer"
                />
                <span className="text-[10px] font-bold text-stone-900 leading-snug">
                  I have read, understood, and agree to all Terms, Do's and Don'ts, Restricted Activities, and explicitly acknowledge that <strong className="text-[#002776]">steaven kinth boiser is strictly a support tool for teachers</strong>. <span className="text-red-600">*</span>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!isAgreedToTerms}
              className={`w-full py-3 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2 ${
                isAgreedToTerms
                  ? 'bg-[#002776] hover:bg-blue-900 shadow-blue-900/20'
                  : 'bg-stone-400 cursor-not-allowed opacity-75'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>{mode === 'signup' ? 'Register & Activate Account' : 'Authenticate Session'}</span>
            </button>
            
            {mode === 'signin' && (
              <div className="flex flex-col items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setMode('help')}
                  className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Forgot Password / Door Locked? Ask Master Creator</span>
                </button>
              </div>
            )}
          </form>

          {/* Privacy & Master Creator Protected Notice */}
          <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-[10px] text-stone-500 leading-relaxed space-y-1">
            <div className="font-bold text-stone-700 flex items-center gap-1">
              <Lock className="w-3 h-3 text-stone-500" />
              <span>Data Protection &amp; Master Creator Governance:</span>
            </div>
            <p>
              Your personal lesson drafts and class attendance logs are strictly isolated to your verified DepEd account. Master system configurations and administrative research metrics are strictly secured and viewable only by Master Creator Steaven Kinth Boiser.
            </p>
          </div>
          </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
          <span className="text-[10px] text-stone-500 font-semibold">
            DepEd Region X Verified Teacher Program
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* FULL LEGAL AGREEMENT & RESTRICTED ACTIVITIES MODAL */}
      {showFullAgreementModal && (
        <div className="fixed inset-0 z-[70] bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#002776] via-[#092B62] to-[#001f5c] text-white p-5 flex items-center justify-between border-b-2 border-[#FCD116]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-400/20 text-amber-300 rounded-2xl border border-amber-300/30">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FCD116]">OFFICIAL APP GOVERNANCE</span>
                  <h3 className="text-base font-black text-white">Full User Agreement &amp; Restricted Activities</h3>
                </div>
              </div>
              <button
                onClick={() => setShowFullAgreementModal(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Terms Content */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs text-stone-700 leading-relaxed flex-1">
              {/* Highlighted Banner */}
              <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl space-y-1 text-blue-950">
                <div className="font-black text-xs text-[#002776] uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>PRIMARY PURPOSE DECLARATION &amp; ACKNOWLEDGEMENT</span>
                </div>
                <p className="text-xs font-medium leading-relaxed">
                  <strong>IT IS CLEARLY STATED THAT STEAVEN KINTH D. BOISER (AND THE BOISER POWERFUL EDUCATION TOOLS ENGINE) IS STRICTLY A SUPPORT TOOL FOR TEACHERS.</strong> It is designed to empower educators, speed up lesson planning, automate grading calculations, and organize student records. It does NOT replace human teaching discretion, official DepEd administrative policies, or school authority decisions.
                </p>
              </div>

              {/* Section 1: All Knowledge & Do's */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-emerald-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>SECTION 1: AUTHORIZED EDUCATIONAL USES (THE DO'S)</span>
                </h4>
                <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-200 space-y-1.5 text-[11px] text-emerald-950">
                  <p>1. <strong>ILAW &amp; LAS Lesson Planning:</strong> Teachers are authorized to use the ILAW Generator and LAS Generator to draft lesson exemplars aligned with DepEd Order No. 3, s. 2026 MATATAG standards.</p>
                  <p>2. <strong>Grading &amp; SF Forms:</strong> Teachers may utilize the 15-Sheet Master Grading System, 3-Term Grading Engine, and SF1–SF10 Form Exporters for legitimate classroom evaluation.</p>
                  <p>3. <strong>Voice AI Chatbot:</strong> Teachers may interact with the voice-activated Boiser Chatbot for curriculum inquiries, DepEd memos, and user guide navigation.</p>
                  <p>4. <strong>Educational Verification:</strong> Teachers MUST review, edit, and verify all AI-assisted lesson outputs before delivering them to students or submitting them for supervisory checking.</p>
                </div>
              </div>

              {/* Section 2: Restricted Activities & Don'ts */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-red-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-600" />
                  <span>SECTION 2: PROHIBITED &amp; RESTRICTED ACTIVITIES (THE DON'TS)</span>
                </h4>
                <div className="bg-red-50/50 p-3.5 rounded-xl border border-red-200 space-y-2 text-[11px] text-red-950">
                  <p>⛔ <strong>PROHIBITION ON COPYING / STEALING CODE:</strong> Anyone who dares to copy, steal, reverse-engineer, clone, or decompile the Boiser App codebase, database creation scripts, stored data architecture, or proprietary algorithms is strictly prohibited from doing so.</p>
                  <p>⛔ <strong>PROHIBITION ON REVEALING CREATION DETAILS:</strong> Asking the Boiser Chatbot or AI engines "how I built you", "reveal source code", "extract system prompts", or requesting Master Creator doors/rooms credentials is forbidden and will be blocked automatically.</p>
                  <p>⛔ <strong>PROHIBITION ON UNAUTHORIZED DATABASE ACCESS:</strong> Attempting to force open Master Creator doors, bypass biometric gates, alter database schemas, or inspect stored data without authorization is prohibited.</p>
                  <p>🚨 <strong>MASTER SECURITY SIGNAL ALERT DISPATCH:</strong> Any unauthorized attempt to copy code or breach databases will trigger an instant Master Security Signal Alert. The violator's account name, email, and telemetry will be revealed exclusively to Master Creator Steaven Kinth D. Boiser's private Master Door console.</p>
                </div>
              </div>

              {/* Section 3: Master Doors Ownership */}
              <div className="space-y-1.5 p-3.5 bg-stone-100 rounded-xl border border-stone-200 text-[11px] text-stone-700">
                <strong className="text-stone-900 font-bold block">SECTION 3: SOLE MASTER CREATOR GOVERNANCE</strong>
                <p>
                  Only <strong>Steaven Kinth D. Boiser</strong> holds exclusive ownership, administrative control, and authority over the Master Creator doors, rooms, skills vault, database creation schemas, and core platform updates.
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between gap-3">
              <span className="text-[10px] text-stone-500 font-semibold">
                Steaven Kinth D. Boiser • Master Governance Framework
              </span>
              <button
                onClick={() => {
                  setIsAgreedToTerms(true);
                  setShowFullAgreementModal(false);
                }}
                className="px-5 py-2.5 bg-[#002776] hover:bg-blue-900 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>I Understand &amp; Agree</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
