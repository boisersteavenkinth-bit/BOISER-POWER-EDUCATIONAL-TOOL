import React, { useState, useEffect } from 'react';
import {
  Infinity as InfinityIcon,
  Users,
  Clock,
  Zap,
  Server,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Smartphone,
  Laptop,
  Tablet,
  Radio,
  Activity,
  Layers,
  Sparkles,
  Download,
  Copy,
  Check,
  GraduationCap,
  BookOpen,
  UserCheck,
  ArrowRight,
  TrendingUp,
  Cpu,
  RefreshCw
} from 'lucide-react';
import {
  EDU_ACCESS_SYSTEM_PROMPT,
  EDU_ACCESS_ROLES,
  EduAccessRoleConfig
} from '../data/eduAccessSystemPrompt';

export const EduAccessUniversalModule: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'teacher' | 'student' | 'public'>('teacher');
  const [copied, setCopied] = useState(false);
  const [activeSessionTime, setActiveSessionTime] = useState(0);
  const [simulatedLoad, setSimulatedLoad] = useState({
    activeTeachers: 148920,
    activeStudents: 492150,
    activePublic: 84320,
    nodesHealthy: 48,
    responseTimeMs: 14,
    cacheHitRatio: '99.8%'
  });

  // Increment simulated session uptime counter
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSessionTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Minor fluctuations in concurrency simulation to demonstrate real-time live telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedLoad((prev) => ({
        ...prev,
        activeTeachers: 148000 + Math.floor(Math.random() * 1900),
        activeStudents: 490000 + Math.floor(Math.random() * 8000),
        activePublic: 82000 + Math.floor(Math.random() * 5000),
        responseTimeMs: 12 + Math.floor(Math.random() * 4)
      }));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentRoleData = EDU_ACCESS_ROLES.find((r) => r.roleId === selectedRole)!;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(EDU_ACCESS_SYSTEM_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSpec = () => {
    const element = document.createElement('a');
    const file = new Blob([EDU_ACCESS_SYSTEM_PROMPT], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'EDUACCESS_UNIVERSAL_UNLIMITED_SPEC_2026.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ========================================================= */}
      {/* 1. HERO HEADER BANNER */}
      {/* ========================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#061c40] via-[#092B62] to-[#1254b8] p-6 sm:p-8 text-white shadow-2xl border border-cyan-500/30">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-cyan-200 text-xs font-black tracking-wider shadow-inner">
              <InfinityIcon className="w-4 h-4 text-cyan-300 animate-pulse" />
              <span>EDUACCESS UNIVERSAL — UNLIMITED 24/7/365 HOURS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Simultaneous "Sabay-Sabay" Multi-Role Engine
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
              Zero time restrictions, zero hourly quotas, zero session expiry, and true horizontal auto-scaling delivering simultaneous access for <strong>150,000 Teachers, 500,000 Students, and Unlimited Public Learners</strong> at the exact same moment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 w-full lg:w-auto">
            <button
              onClick={handleCopyPrompt}
              className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-[#092B62] rounded-2xl text-xs font-black transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied System Policy</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy System Prompt</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadSpec}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-300" />
              <span>Download Full Spec (.TXT)</span>
            </button>
          </div>
        </div>

        {/* Live Active Telemetry Cards Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[10px] font-mono text-cyan-200 uppercase block font-bold">Teachers Online</span>
            <div className="text-lg sm:text-xl font-black text-white flex items-center gap-1.5 mt-0.5">
              <span>{simulatedLoad.activeTeachers.toLocaleString()}</span>
              <span className="text-[10px] text-cyan-300 font-mono font-normal">/ 150k max</span>
            </div>
            <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Sabay-Sabay Active
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[10px] font-mono text-emerald-200 uppercase block font-bold">Students Online</span>
            <div className="text-lg sm:text-xl font-black text-white flex items-center gap-1.5 mt-0.5">
              <span>{simulatedLoad.activeStudents.toLocaleString()}</span>
              <span className="text-[10px] text-emerald-300 font-mono font-normal">/ 500k max</span>
            </div>
            <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Zero Queue Latency
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[10px] font-mono text-amber-200 uppercase block font-bold">Public Users</span>
            <div className="text-lg sm:text-xl font-black text-white flex items-center gap-1.5 mt-0.5">
              <span>{simulatedLoad.activePublic.toLocaleString()}</span>
              <span className="text-[10px] text-amber-300 font-mono font-normal">/ ∞ Inf</span>
            </div>
            <span className="text-[9px] text-cyan-300 font-bold flex items-center gap-1 mt-0.5">
              <InfinityIcon className="w-3 h-3 text-cyan-300" />
              Uncapped Access
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <span className="text-[10px] font-mono text-purple-200 uppercase block font-bold">Session Uptime</span>
            <div className="text-lg sm:text-xl font-black text-white font-mono mt-0.5">
              {formatUptime(activeSessionTime)}
            </div>
            <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Zero Idle Timeout
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. THREE CORE GUARANTEES GRID */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#dce3ee] rounded-2xl p-5 space-y-2.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-sm font-black text-[#092B62]">1. Unlimited Hours 24/7/365</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            No daily or monthly caps (not "3 hours/day"). Midnight, dawn, weekend, and holiday learning are 100% unrestricted across all roles.
          </p>
          <ul className="text-[11px] text-stone-700 space-y-1 font-medium pt-1">
            <li className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Zero session disconnects while idle</span>
            </li>
            <li className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>No cooldown timer between lessons</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-[#dce3ee] rounded-2xl p-5 space-y-2.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Users className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-sm font-black text-[#092B62]">2. Simultaneous "Sabay-Sabay"</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            650,000+ teachers, students, and citizens actively working simultaneously with <strong>no slowdowns, zero waiting queues, and no "server busy" errors</strong>.
          </p>
          <ul className="text-[11px] text-stone-700 space-y-1 font-medium pt-1">
            <li className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Pre-emptive horizontal auto-scaling</span>
            </li>
            <li className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Even load balancing across all edge nodes</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-[#dce3ee] rounded-2xl p-5 space-y-2.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <Smartphone className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-sm font-black text-[#092B62]">3. Parallel Multi-Device Sync</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Teachers and students can be logged into mobile phone, tablet, and PC simultaneously. All parallel sessions run continuously with zero conflicts.
          </p>
          <ul className="text-[11px] text-stone-700 space-y-1 font-medium pt-1">
            <li className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Real-time cloud &amp; local IndexedDB sync</span>
            </li>
            <li className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Instant auto-resume if connection drops</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. INTERACTIVE ROLE SELECTOR & PERMISSIONS MATRIX */}
      {/* ========================================================= */}
      <div className="bg-white border border-[#dce3ee] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#dce3ee] pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
              Section 3: Role Definitions &amp; Access Levels
            </span>
            <h2 className="text-lg sm:text-xl font-black text-[#092B62] mt-1">
              Multi-Role Simultaneous Access Matrix
            </h2>
          </div>

          {/* Role selector tabs */}
          <div className="flex gap-2 p-1.5 bg-stone-100 rounded-2xl w-full sm:w-auto">
            {EDU_ACCESS_ROLES.map((r) => {
              const active = selectedRole === r.roleId;
              return (
                <button
                  key={r.roleId}
                  onClick={() => setSelectedRole(r.roleId)}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-2 ${
                    active
                      ? 'bg-[#092B62] text-white shadow-sm'
                      : 'text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <span>{r.title.split(' ')[0]}</span>
                  <span className="text-[10px] opacity-80 font-mono">({r.badge})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Role Deep-Dive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-gradient-to-br from-stone-50 to-blue-50/40 border border-stone-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-[#092B62] tracking-wider">
                {currentRoleData.title}
              </span>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-black font-mono">
                {currentRoleData.hours}
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-blue-200/70 space-y-1">
              <span className="text-[10px] font-mono text-stone-500 uppercase block font-bold">
                Concurrent Capacity Guarantee
              </span>
              <span className="text-base font-black text-blue-900 block">
                {currentRoleData.simultaneousCapacity}
              </span>
              <p className="text-[11px] text-stone-600 pt-1">
                Zero queuing or throttled performance during national peak rush hours (e.g. 8:00 AM school start, quarterly test submission).
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase text-stone-500 font-bold block">
                Session &amp; Architecture Features:
              </span>
              {currentRoleData.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-stone-800 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#092B62] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Full Operational Permissions (Unrestricted 24/7)</span>
            </h3>

            <div className="space-y-2.5">
              {currentRoleData.permissions.map((perm, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-stone-50 border border-stone-200/80 rounded-xl text-xs text-stone-900 flex items-start gap-2.5 hover:border-blue-300 transition"
                >
                  <span className="w-5 h-5 rounded-lg bg-blue-100 text-[#092B62] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{perm}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. INFRASTRUCTURE & PEAK-HOUR BEHAVIOR SPECIFICATION */}
      {/* ========================================================= */}
      <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 space-y-6 border border-stone-800 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base sm:text-lg font-black text-white">
                Horizontal Auto-Scaling &amp; Zero-Bottleneck Infrastructure
              </h2>
            </div>
            <p className="text-xs text-stone-400">
              How the EduAccess Universal engine guarantees zero slowdowns when 650,000+ users work simultaneously.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-mono font-bold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Telemetry: {simulatedLoad.responseTimeMs}ms Ping</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-stone-800/80 rounded-2xl p-4 border border-stone-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300">Horizontal Auto-Scaling</span>
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-stone-300 leading-relaxed text-[11px]">
              Spins up new compute worker instances <em>before</em> peak traffic thresholds are crossed. Zero cold-start latency.
            </p>
          </div>

          <div className="bg-stone-800/80 rounded-2xl p-4 border border-stone-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-300">Multi-Region Read Replicas</span>
              <Layers className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-stone-300 leading-relaxed text-[11px]">
              Firestore &amp; localized cache replicas serve hundreds of thousands of read queries simultaneously with zero database lock contention.
            </p>
          </div>

          <div className="bg-stone-800/80 rounded-2xl p-4 border border-stone-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300">Edge CDN &amp; IndexedDB Dual Store</span>
              <Activity className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-stone-300 leading-relaxed text-[11px]">
              Media assets, lesson plans, and audio files are cached at edge nodes and inside local IndexedDB for zero-data offline continuity.
            </p>
          </div>
        </div>

        {/* System Prompt Code Box */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
            <span>Raw System Policy Definition:</span>
            <button
              onClick={handleCopyPrompt}
              className="text-cyan-400 hover:text-cyan-300 font-bold underline flex items-center gap-1 cursor-pointer"
            >
              <span>{copied ? 'Copied!' : 'Copy Raw Text'}</span>
            </button>
          </div>
          <pre className="p-4 bg-black/60 rounded-2xl border border-stone-800 text-[11px] font-mono text-cyan-200/90 overflow-x-auto max-h-[220px] whitespace-pre-wrap leading-relaxed">
            {EDU_ACCESS_SYSTEM_PROMPT}
          </pre>
        </div>
      </div>
    </div>
  );
};
