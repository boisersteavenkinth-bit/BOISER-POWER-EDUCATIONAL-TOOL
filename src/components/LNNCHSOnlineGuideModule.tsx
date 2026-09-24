import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  FileSpreadsheet,
  Lock,
  Unlock,
  Award,
  Users,
  Search,
  Printer,
  Download,
  ShieldCheck,
  Building2,
  FileText,
  ChevronRight,
  HelpCircle,
  Clock,
  ExternalLink,
  Layers
} from 'lucide-react';

export const LNNCHSOnlineGuideModule: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<string>('getting_started');

  const topics = [
    { id: 'getting_started', title: '🚀 Getting Started & System Overview', icon: Sparkles },
    { id: 'master_data', title: '🟡 Master_Data Encoding (Step 1)', icon: Users },
    { id: 'grades_ecr', title: '📊 Grades_ECR 3-Term Entry (Step 2)', icon: FileSpreadsheet },
    { id: 'auto_computation', title: '🏆 DO 3, s. 2026 Promotion & Honors (Step 3)', icon: Award },
    { id: 'school_forms', title: '📄 Generating SF1–SF10 (Step 4)', icon: FileText },
    { id: 'lis_directory', title: '👥 120-Section LIS Directory (Grades 7–12)', icon: Building2 },
    { id: 'blank_templates', title: '📋 Blank Templates & Printouts', icon: Printer },
    { id: 'protection_passwords', title: '🔒 Protection & Password (LNNCHS2026)', icon: Lock }
  ];

  return (
    <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-xl overflow-hidden space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#092B62] via-[#0D3B82] to-[#1E4E9E] p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-400 text-blue-950 font-black text-xs rounded-full uppercase tracking-wider">
                Official User Manual &amp; Standard Operating Procedures (SOP)
              </span>
              <span className="px-3 py-1 bg-blue-800 text-blue-100 font-bold text-xs rounded-full border border-blue-600/50">
                DepEd Order No. 3, s. 2026 Aligned
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-amber-300" />
              <span>LNNCHS Integrated System Online User Guide</span>
            </h2>
            <p className="text-blue-100 text-sm max-w-3xl leading-relaxed">
              Step-by-step instructions on operating the 15-Sheet Master Grading System, 120-Section LIS Student Directory, automated SF1–SF10 form generation, and blank printable templates.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Topics */}
          <div className="lg:col-span-1 space-y-2">
            <div className="text-xs font-black text-stone-500 uppercase tracking-wider px-2 mb-2">
              Guide Navigation
            </div>
            {topics.map(t => {
              const Icon = t.icon;
              const isActive = activeTopic === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTopic(t.id)}
                  className={`w-full text-left p-3 rounded-2xl text-xs font-bold transition flex items-center gap-2.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#092B62] text-white shadow-md'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-blue-700'}`} />
                  <span className="truncate">{t.title}</span>
                </button>
              );
            })}
          </div>

          {/* Main Topic Detail Content */}
          <div className="lg:col-span-3 bg-stone-50 border-2 border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6">
            {activeTopic === 'getting_started' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-blue-950 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>System Architecture &amp; Core Principles</span>
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    The LNNCHS System is engineered to eliminate repetitive data entry by propagating one master record across all 15 sheets and 10 official DepEd School Forms.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-2 shadow-2xs">
                    <div className="font-black text-blue-950 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-mono">1</span>
                      <span>Single-Source Truth</span>
                    </div>
                    <p className="text-stone-600">
                      Advisers input learner data once in <strong>Master_Data</strong> and numerical quarterly scores in <strong>Grades_ECR</strong>. All other 13 sheets calculate dynamically.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-2 shadow-2xs">
                    <div className="font-black text-blue-950 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-mono">2</span>
                      <span>3-Term Grading</span>
                    </div>
                    <p className="text-stone-600">
                      Calculates general averages, final ratings, and promotion descriptors following <strong>DepEd Order No. 3, s. 2026</strong> for 201 school days across 3 terms.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-2 shadow-2xs">
                    <div className="font-black text-blue-950 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-mono">3</span>
                      <span>120 Sections Roster</span>
                    </div>
                    <p className="text-stone-600">
                      Grade 7 to Grade 12 each have exactly <strong>20 official sections</strong>, assigned advisers, rooms, and LIS-synced master student search.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTopic === 'master_data' && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-blue-950 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-700" />
                  <span>Step 1: Encoding in Master_Data (Yellow Input Cells)</span>
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  The <strong>Master_Data</strong> sheet contains student demographic records. Cells highlighted in light yellow are editable by class advisers.
                </p>

                <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-3 text-xs">
                  <div className="font-bold text-stone-900">Key Demographic Fields to Encode:</div>
                  <ul className="list-disc pl-5 space-y-1 text-stone-600">
                    <li><strong>LRN (Learner Reference Number):</strong> Exactly 12-digit unique national ID (e.g., <code>136514...</code>).</li>
                    <li><strong>Student Full Name:</strong> Last Name, First Name, Middle Initial.</li>
                    <li><strong>Sex:</strong> Enter <code>M</code> for Male, <code>F</code> for Female.</li>
                    <li><strong>Birthdate:</strong> Standard format (<code>YYYY-MM-DD</code>). Age is auto-calculated.</li>
                    <li><strong>Mother Tongue &amp; Address:</strong> Used for SF1 and SF8.</li>
                    <li><strong>Parent / Guardian &amp; Contact:</strong> Official contact info for emergency and reporting.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTopic === 'grades_ecr' && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-blue-950 flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-amber-500" />
                  <span>Step 2: Entering 3-Term Numerical Grades (Grades_ECR)</span>
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Under the DO 3, s. 2026 Three-Term academic calendar, quarterly assessments are divided into Term 1, Term 2, and Term 3.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-stone-200">
                    <div className="font-black text-stone-900">Term 1 (Quarter 1)</div>
                    <p className="text-stone-500 text-[11px] mt-1">Foundational competencies, initial written works, and performance tasks.</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-stone-200">
                    <div className="font-black text-stone-900">Term 2 (Quarter 2)</div>
                    <p className="text-stone-500 text-[11px] mt-1">Mid-year formative &amp; summative projects and practical evaluations.</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-stone-200">
                    <div className="font-black text-stone-900">Term 3 (Quarter 3)</div>
                    <p className="text-stone-500 text-[11px] mt-1">Culminating assessments, end-of-year exams, and final portfolio.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTopic === 'auto_computation' && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-blue-950 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>Step 3: Automated Computation, Promotion &amp; Honor Roll</span>
                </h3>
                <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-3 text-xs">
                  <div className="font-bold text-stone-900">DepEd Order No. 3, s. 2026 Academic Honor Roll Criteria:</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 bg-amber-50 rounded-xl border border-amber-200">
                      <div>
                        <strong className="text-amber-900">With Highest Honors (May Pinakamataas na Karangalan)</strong>
                        <div className="text-stone-500 text-[11px]">General Average 98–100 • No grade below 93 in any subject</div>
                      </div>
                      <span className="px-2.5 py-1 bg-amber-400 text-blue-950 font-black rounded-lg">98–100</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 bg-blue-50 rounded-xl border border-blue-200">
                      <div>
                        <strong className="text-blue-950">With High Honors (May Mataas na Karangalan)</strong>
                        <div className="text-stone-500 text-[11px]">General Average 95–97 • No grade below 90 in any subject</div>
                      </div>
                      <span className="px-2.5 py-1 bg-blue-900 text-white font-black rounded-lg">95–97</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                      <div>
                        <strong className="text-stone-900">With Honors (May Karangalan)</strong>
                        <div className="text-stone-500 text-[11px]">General Average 90–94 • No grade below 85 in any subject</div>
                      </div>
                      <span className="px-2.5 py-1 bg-stone-800 text-white font-black rounded-lg">90–94</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTopic === 'school_forms' && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-blue-950 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-700" />
                  <span>Step 4: Official DepEd School Forms (SF1–SF10) Summary</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <strong className="text-blue-950">SF1 (School Register):</strong> Master student profiles, LRNs, birthdays, parents.
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <strong className="text-blue-950">SF2 (Daily Attendance):</strong> Monthly school days, absences, and tardiness.
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <strong className="text-blue-950">SF3 (Books / LMS Record):</strong> Textbooks issued and returned per subject.
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <strong className="text-blue-950">SF4 (Monthly Movement):</strong> Influx of transferred in/out and dropped learners.
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <strong className="text-blue-950">SF5 (Promotion Report):</strong> End-of-year promotion, conditional, and honors list.
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <strong className="text-blue-950">SF6 (Promotion Matrix):</strong> Consolidated school-wide promotion statistics.
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <strong className="text-blue-950">SF7 (Personnel Roster):</strong> Faculty plantilla, subjects taught, and credentials.
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <strong className="text-blue-950">SF8 (Health &amp; Nutritional):</strong> BMI baseline and endline health classifications.
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <strong className="text-blue-950">SF9 (Progress Report Card):</strong> Official Form 138 given to parents every term.
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <strong className="text-blue-950">SF10 (Permanent Record):</strong> Official Form 137 scholastic transcript.
                  </div>
                </div>
              </div>
            )}

            {activeTopic === 'lis_directory' && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-blue-950 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-700" />
                  <span>120-Section LIS Directory (Grades 7–12, 20 Secs Each)</span>
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  LNNCHS implements exactly 20 official sections per grade level across Junior and Senior High School. The directory allows instant live searching by student name, LRN, section name, adviser, or track.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl text-xs text-blue-950 space-y-2">
                  <div className="font-bold">Pro-Tip for Teachers:</div>
                  <p>
                    Clicking on any learner in the LIS Directory automatically links their full credentials across all SF1–SF10 forms, eliminating manual typing.
                  </p>
                </div>
              </div>
            )}

            {activeTopic === 'blank_templates' && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-blue-950 flex items-center gap-2">
                  <Printer className="w-5 h-5 text-blue-700" />
                  <span>Blank Template Generator &amp; Direct Printouts</span>
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Generate empty, beautifully formatted official DepEd School Forms (SF1 to SF10) with customizable blank rows (15, 20, 25, 45, 50 rows) for manual handwriting or offline archiving.
                </p>
              </div>
            )}

            {activeTopic === 'protection_passwords' && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-blue-950 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-blue-700" />
                  <span>Workbook Sheet Protection &amp; Security Passwords</span>
                </h3>
                <div className="bg-amber-50 border border-amber-300 p-4 rounded-2xl text-xs space-y-2 text-amber-950">
                  <div className="font-bold">Official Protection Password:</div>
                  <div className="text-lg font-mono font-black text-blue-950 bg-white p-2 rounded-lg border border-amber-300 inline-block">
                    LNNCHS2026
                  </div>
                  <p className="text-[11px] text-amber-900">
                    This password unlocks computed sheets (Computed_Averages, SF1-SF10, Honor Roll) for administrative formula inspections.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
