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
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
  const { currentUser, loginTeacherAccount, logoutUser, isOwner } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('LNNCHS (Lanao del Norte National Comprehensive High School)');
  const [division, setDivision] = useState('Division of Lanao del Norte — Region X');
  const [department, setDepartment] = useState('Senior High School Faculty');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const trimmedEmail = email.trim().toLowerCase();

    // Verification check for DepEd email domain
    const isMaster = trimmedEmail === 'boisersteavenkinth@gmail.com';
    const isDepEd = trimmedEmail.endsWith('@deped.gov.ph');

    if (!isMaster && !isDepEd) {
      setErrorMsg('Access Restricted: Only official DepEd teacher accounts ending with "@deped.gov.ph" are authorized.');
      return;
    }

    const teacherName = name.trim() || (isMaster ? 'Steaven Kinth D. Boiser' : 'DepEd Teacher');

    const result = loginTeacherAccount({
      name: teacherName,
      email: trimmedEmail,
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

          <form onSubmit={handleSubmit} className="space-y-3.5">
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

            <button
              type="submit"
              className="w-full py-3 bg-[#002776] hover:bg-blue-900 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Verify &amp; Activate Free Teacher Account</span>
            </button>
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
    </div>
  );
};
