import React, { useState } from 'react';
import {
  Building,
  Award,
  BookOpen,
  CheckCircle2,
  FileText,
  Users,
  Calendar,
  Sparkles,
  ShieldCheck,
  Download,
  Printer,
  ChevronRight,
  Eye,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { CebuanoVoiceGuide } from './CebuanoVoiceGuide';

interface PrincipalDoorsViewProps {
  doorId: 'head-anisah' | 'head-andot' | 'head-calibo';
  onClose: () => void;
}

export const PrincipalDoorsView: React.FC<PrincipalDoorsViewProps> = ({ doorId, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 4000);
  };

  const DOOR_CONFIGS = {
    'head-anisah': {
      title: "Executive Office of Ma'am Anisah",
      role: "Principal III-A • Senior High School Leadership",
      color: "from-blue-900 via-indigo-950 to-blue-900",
      accent: "border-[#FCD116] bg-blue-100 text-blue-900",
      icon: Building,
      badge: "School Head (Principal III-A)",
      desc: "Comprehensive Senior High School institutional management, OPCRF/IPCRF reviews, School Improvement Plan (SIP), and policy compliance.",
      tabs: [
        { id: 'overview', label: 'Institutional Overview' },
        { id: 'sip', label: 'SIP & AIP Programs' },
        { id: 'opcrf', label: 'Faculty Performance (OPCRF/IPCRF)' },
        { id: 'clearances', label: 'Official Clearances' }
      ]
    },
    'head-andot': {
      title: "Office of Ma'am Joan J. Andot",
      role: "Asst. Principal II • Senior High School Academic Affairs",
      color: "from-emerald-900 via-teal-950 to-emerald-900",
      accent: "border-emerald-400 bg-emerald-100 text-emerald-900",
      icon: Award,
      badge: "Asst. Principal II",
      desc: "Faculty loading, teacher class allocations without co-adviser overhead, student attendance tracking, and academic scheduling.",
      tabs: [
        { id: 'overview', label: 'Academic Command' },
        { id: 'loading', label: 'Faculty Loading & Schedules' },
        { id: 'attendance', label: 'Learner Attendance Audits' },
        { id: 'supervision', label: 'Classroom Observations' }
      ]
    },
    'head-calibo': {
      title: 'Office of Ma\'am Alma "Almazing" L. Calibo',
      role: "Head Teacher • Curriculum & Instruction Leadership",
      color: "from-amber-900 via-stone-900 to-amber-950",
      accent: "border-amber-400 bg-amber-100 text-amber-900",
      icon: BookOpen,
      badge: 'Head Teacher ("Almazing")',
      desc: "ILAW lesson exemplar approvals, Budget of Work (BOW) audits for DepEd Order No. 9, s. 2026, and Learning Action Cell (LAC) pedagogical mentoring.",
      tabs: [
        { id: 'overview', label: 'Curriculum Command' },
        { id: 'ilaw_approvals', label: 'ILAW Exemplar Approvals' },
        { id: 'bow_audit', label: 'BOW Compliance (DO 9 s.2026)' },
        { id: 'lac_sessions', label: 'LAC Coaching Sessions' }
      ]
    }
  };

  const currentConfig = DOOR_CONFIGS[doorId];
  const Icon = currentConfig.icon;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-stone-300 space-y-6 animate-in zoom-in-95 duration-200">
      {/* Header Banner */}
      <div className={`bg-gradient-to-r ${currentConfig.color} -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 p-6 text-white rounded-t-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-4 border-[#FCD116]`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center text-amber-300 shadow-inner shrink-0">
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {currentConfig.badge}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {currentConfig.title}
            </h2>
            <p className="text-xs text-stone-200 font-medium max-w-xl">
              {currentConfig.desc}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl text-xs font-black text-white flex items-center gap-2 transition cursor-pointer shrink-0"
        >
          <span>🚪 Close Door</span>
        </button>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs font-black text-emerald-900 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notice}</span>
        </div>
      )}

      {/* Voice Guide Strip */}
      <CebuanoVoiceGuide
        guideKey="principals"
        label="Listen to Executive Office Audio Guide"
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
        {currentConfig.tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#092B62] text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-1">
              <span className="text-[10px] uppercase font-black tracking-wider text-blue-800">Faculty Monitored</span>
              <div className="text-2xl font-black text-[#092B62]">64 Teachers</div>
              <p className="text-[11px] text-blue-700">100% DepEd verified accounts</p>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
              <span className="text-[10px] uppercase font-black tracking-wider text-emerald-800">Curriculum Compliance</span>
              <div className="text-2xl font-black text-emerald-900">99.8%</div>
              <p className="text-[11px] text-emerald-700">DepEd Order No. 9, s. 2026 aligned</p>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-1">
              <span className="text-[10px] uppercase font-black tracking-wider text-amber-800">Master Creator Direct Line</span>
              <div className="text-base font-black text-amber-950">Steaven Kinth Boiser</div>
              <p className="text-[11px] text-amber-800">Real-time system protection active</p>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-700" />
              <span>Official Executive Directives &amp; Approvals</span>
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { title: 'Three-Term Calendar Implementation Memo (SY 2026–2027)', date: 'June 2026', status: 'Approved & Distributed' },
                { title: 'Comprehensive SHS Summative Assessment Quality Protocol', date: 'August 2026', status: 'Active Policy' },
                { title: 'ILAW Four-Day Lesson Exemplar Supervisory Standards', date: 'September 2026', status: 'Enforced School-wide' }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-white border border-stone-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-stone-900">{item.title}</span>
                    <span className="block text-[10px] text-stone-500">{item.date}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Specific Tabs for Principal III-A Ma'am Anisah */}
      {doorId === 'head-anisah' && activeTab === 'sip' && (
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-2">
            <h4 className="font-black text-blue-900">LNNCHS School Improvement Plan (SIP 2026-2029)</h4>
            <p className="text-stone-600">Pillar 1: Access &amp; Retention • Pillar 2: Curriculum Delivery &amp; ILAW Integration • Pillar 3: Resilient School Governance.</p>
          </div>
          <button
            onClick={() => showNotice('SIP Strategic Matrix Exported successfully!')}
            className="px-4 py-2.5 bg-[#092B62] text-white rounded-xl font-bold flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-amber-300" /> Export Full SIP &amp; AIP Document
          </button>
        </div>
      )}

      {/* Specific Tabs for Ma'am Joan J. Andot */}
      {doorId === 'head-andot' && activeTab === 'loading' && (
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
            <h4 className="font-black text-emerald-900">Senior High School Faculty Loading Matrix</h4>
            <p className="text-stone-600">64 full-time subject teachers deployed with balanced instructional hours across Term 1, Term 2, and Term 3.</p>
          </div>
          <button
            onClick={() => showNotice('Teacher Loading Schedule saved and verified!')}
            className="px-4 py-2.5 bg-emerald-800 text-white rounded-xl font-bold flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-amber-300" /> Download Teaching Loads Summary (Excel)
          </button>
        </div>
      )}

      {/* Specific Tabs for Ma'am Alma "Almazing" L. Calibo */}
      {doorId === 'head-calibo' && activeTab === 'ilaw_approvals' && (
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
            <h4 className="font-black text-amber-950">"Almazing" ILAW Lesson Exemplar Supervisory Approval Hub</h4>
            <p className="text-stone-700">Review, annotate, and grant official supervisory clearance to teacher-submitted Daily Lesson Logs (DLL) and ILAW exemplar units.</p>
          </div>
          <div className="space-y-2">
            {[
              { subject: 'Grade 11 STEM — General Biology 1', teacher: 'Steaven Kinth D. Boiser', term: 'Term 2 (Week 2)', status: 'Approved with Distinction' },
              { subject: 'Grade 11 TVL — Computer Systems Servicing', teacher: 'Engr. J. Dela Cruz', term: 'Term 2 (Week 1)', status: 'Under Review' },
              { subject: 'Grade 12 HUMSS — Creative Nonfiction', teacher: 'M. Santos', term: 'Term 2 (Week 2)', status: 'Approved' }
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-white border border-stone-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-black text-stone-900">{item.subject}</span>
                  <div className="text-[11px] text-stone-500">Teacher: {item.teacher} • {item.term}</div>
                </div>
                <button
                  onClick={() => showNotice(`Endorsed ${item.subject} by ${item.teacher}`)}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black rounded-lg text-[10px]"
                >
                  Approve Exemplar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
