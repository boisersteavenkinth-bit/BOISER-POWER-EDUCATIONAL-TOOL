import React, { useState, useMemo } from 'react';
import {
  FileSpreadsheet,
  Download,
  Lock,
  Unlock,
  Search,
  CheckCircle,
  AlertTriangle,
  Award,
  Users,
  Building,
  GraduationCap,
  Sparkles,
  Info,
  RefreshCw,
  Plus,
  Trash2,
  Key,
  ShieldCheck,
  FileText,
  BookOpen
} from 'lucide-react';
import {
  INITIAL_60_STUDENTS,
  INITIAL_60_GRADES_ECR,
  StudentMasterRecord,
  StudentGradesECR,
  SUBJECT_SETS
} from '../data/lnnchs60StudentsMasterData';
import {
  computeAllLearners,
  computeLearnerAcademic,
  exportCompleteLnnchsWorkbook,
  exportLnnchsPdfPacket
} from '../utils/lnnchsWorkbookService';

export const LNNCHSSystemWorkbookModule: React.FC = () => {
  // State for 60 students
  const [students, setStudents] = useState<StudentMasterRecord[]>(INITIAL_60_STUDENTS);
  const [gradesEcr, setGradesEcr] = useState<StudentGradesECR[]>(INITIAL_60_GRADES_ECR);
  
  // Sheet tab selection
  const [activeSheet, setActiveSheet] = useState<string>('README');
  
  // Grade filter
  const [gradeFilter, setGradeFilter] = useState<'ALL' | 'Grade 3' | 'Grade 8' | 'Grade 11'>('ALL');

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Password unlock state for locked sheets
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // SF9 & SF10 Yellow Cell LRN state
  const [sf9Lrn, setSf9Lrn] = useState<string>('136514110001');
  const [sf10Lrn, setSf10Lrn] = useState<string>('136514110001');

  // Success alert
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setAlertMsg(msg);
    setTimeout(() => setAlertMsg(null), 3500);
  };

  // Compute live academic summaries
  const computedList = useMemo(() => {
    return computeAllLearners(students, gradesEcr);
  }, [students, gradesEcr]);

  // Filtered lists
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchGrade = gradeFilter === 'ALL' || s.gradeLevel === gradeFilter;
      const matchSearch = `${s.lastName} ${s.firstName} ${s.lrn}`.toLowerCase().includes(searchQuery.toLowerCase());
      return matchGrade && matchSearch;
    });
  }, [students, gradeFilter, searchQuery]);

  const filteredComputed = useMemo(() => {
    return computedList.filter(c => {
      const matchGrade = gradeFilter === 'ALL' || c.gradeLevel === gradeFilter;
      const matchSearch = `${c.fullName} ${c.lrn}`.toLowerCase().includes(searchQuery.toLowerCase());
      return matchGrade && matchSearch;
    });
  }, [computedList, gradeFilter, searchQuery]);

  // Master Data inline editor
  const handleUpdateMaster = (lrn: string, field: keyof StudentMasterRecord, val: any) => {
    setStudents(prev => prev.map(s => s.lrn === lrn ? { ...s, [field]: val } : s));
  };

  // ECR Grade inline editor
  const handleUpdateGrade = (lrn: string, subject: string, term: 'term1' | 'term2' | 'term3', val: number) => {
    const numVal = Math.min(100, Math.max(50, isNaN(val) ? 75 : val));
    setGradesEcr(prev => prev.map(e => {
      if (e.lrn !== lrn) return e;
      const updatedGrades = e.grades.map(g => {
        if (g.subject !== subject) return g;
        return { ...g, [term]: numVal };
      });
      return { ...e, grades: updatedGrades };
    }));
  };

  // Unlock check
  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'LNNCHS2026') {
      setIsUnlocked(true);
      setShowPasswordModal(false);
      setPasswordError(null);
      setPasswordInput('');
      triggerNotification('✓ Workbook protection unlocked! Registrar edit mode active.');
    } else {
      setPasswordError('Invalid Password. Check the README tab (LNNCHS2026).');
    }
  };

  // Sheet Tabs List
  const sheetsList = [
    { id: 'README', label: '📒 README & Protection', isInput: false },
    { id: 'Master_Data', label: '🟡 Master_Data (Editable)', isInput: true },
    { id: 'Grades_ECR', label: '🟡 Grades_ECR (Editable)', isInput: true },
    { id: 'Computed_Averages', label: '🔒 Computed_Averages', isInput: false },
    { id: 'SF1', label: '📄 SF1 (School Register)', isInput: false },
    { id: 'SF2', label: '📋 SF2 (Daily Attendance)', isInput: false },
    { id: 'SF3', label: '📖 SF3 (Enrolment / Books)', isInput: false },
    { id: 'SF4', label: '📊 SF4 (Monthly Movement)', isInput: false },
    { id: 'SF5', label: '🏆 SF5 (Report on Promotion)', isInput: false },
    { id: 'SF6', label: '📈 SF6 (Promotion Summary)', isInput: false },
    { id: 'SF7', label: '👨‍🏫 SF7 (Personnel List)', isInput: false },
    { id: 'SF8', label: '🩺 SF8 (Nutritional Status)', isInput: false },
    { id: 'SF9', label: '📇 SF9 (Report Card)', isInput: false },
    { id: 'SF10', label: '📜 SF10 (Permanent Record)', isInput: false },
    { id: 'Honor_Roll_Summary', label: '🎖️ Honor_Roll_Summary', isInput: false },
    { id: 'Registrar_Dashboard', label: '🏢 Registrar_Dashboard', isInput: false }
  ];

  return (
    <div className="space-y-5 animate-fade-in text-stone-900">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#092B62] via-[#0e3c84] to-[#1254b8] text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LNNCHS SF1–SF10 INTEGRATED WORKBOOK &amp; FORMS SYSTEM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Official DepEd School Forms 1–10 (SY 2026-2027)
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 font-medium">
            3-Term ECR • Auto-Computed Promotion &amp; Honors • 60 Preloaded Learners across Grade 3, Grade 8, and Grade 11
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => exportCompleteLnnchsWorkbook(students, gradesEcr, computedList)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-2 transition cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export .XLSX (15 Sheets)</span>
          </button>
          <button
            onClick={() => exportLnnchsPdfPacket(activeSheet, students, computedList, activeSheet === 'SF9' ? sf9Lrn : sf10Lrn)}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-black shadow-md flex items-center gap-2 transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF Packet</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {alertMsg && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in shadow-sm">
          <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{alertMsg}</span>
        </div>
      )}

      {/* Sheet Tabs Bar (Excel Style) */}
      <div className="bg-white border border-stone-300 rounded-2xl p-2 shadow-sm">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <div className="flex gap-1.5 shrink-0">
            {sheetsList.map(sheet => {
              const isActive = activeSheet === sheet.id;
              return (
                <button
                  key={sheet.id}
                  onClick={() => setActiveSheet(sheet.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-extrabold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#092B62] text-white shadow'
                      : sheet.isInput
                      ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {sheet.label}
                </button>
              );
            })}
          </div>

          <div className="shrink-0 pl-2 border-l border-stone-200">
            {isUnlocked ? (
              <button
                onClick={() => {
                  setIsUnlocked(false);
                  triggerNotification('🔒 Workbook re-locked.');
                }}
                className="px-3 py-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Unlock className="w-3.5 h-3.5 text-emerald-700" />
                <span>Unlocked</span>
              </button>
            ) : (
              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-stone-500" />
                <span>Locked</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter and Query Sub-Bar */}
      {(activeSheet === 'Master_Data' || activeSheet === 'Grades_ECR' || activeSheet === 'Computed_Averages' || activeSheet === 'SF1' || activeSheet === 'SF5' || activeSheet === 'Honor_Roll_Summary') && (
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-600">Filter Section/Level:</span>
            {(['ALL', 'Grade 3', 'Grade 8', 'Grade 11'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => setGradeFilter(lvl)}
                className={`px-3 py-1 rounded-lg text-xs font-extrabold cursor-pointer transition ${
                  gradeFilter === lvl
                    ? 'bg-[#092B62] text-white'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {lvl === 'ALL' ? 'All (60)' : lvl === 'Grade 3' ? 'Grade 3 (Mabini)' : lvl === 'Grade 8' ? 'Grade 8 (Rizal)' : 'Grade 11 (Einstein)'}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search student or LRN..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-xl pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 1: README & PROTECTION */}
      {/* ========================================================= */}
      {activeSheet === 'README' && (
        <div className="bg-white border border-stone-300 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <h2 className="text-lg font-black text-[#092B62] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-700" />
              <span>LNNCHS SF1–SF10 Master Prompt &amp; Protection Guidelines</span>
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Official DepEd 3-Term School Forms Generation Model (DO 3, s. 2026)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
              <h3 className="font-black text-amber-900 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                <span>1. Data Entry Rule (Yellow Cells)</span>
              </h3>
              <p className="text-amber-800 leading-relaxed">
                Advisers enter learners in <strong>Master_Data</strong> and 3-term quarter grades per subject in <strong>Grades_ECR</strong>. All other forms (SF1, SF5, SF6, SF9, SF10, Honor Roll) are derived automatically and never entered twice.
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
              <h3 className="font-black text-blue-900 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-blue-700" />
                <span>2. Sheet Protection Password</span>
              </h3>
              <p className="text-blue-800 leading-relaxed">
                Output sheets are locked against accidental overwrite. Master Password: <code className="bg-white px-2 py-0.5 rounded font-black text-blue-900 border border-blue-300">LNNCHS2026</code>.
              </p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
              <h3 className="font-black text-emerald-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-700" />
                <span>3. Honor Roll Classification (DepEd DO 3)</span>
              </h3>
              <ul className="list-disc list-inside text-emerald-800 space-y-1">
                <li><strong>With Honors:</strong> Gen Avg 90–94, no subject below 85</li>
                <li><strong>With High Honors:</strong> Gen Avg 95–97, no subject below 90</li>
                <li><strong>With Highest Honors:</strong> Gen Avg 98–100, no subject below 93</li>
                <li>No failing grade (below 75) qualifies for any honors.</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl space-y-2">
              <h3 className="font-black text-purple-900 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-purple-700" />
                <span>4. Promotion &amp; Remediation Rule</span>
              </h3>
              <p className="text-purple-800 leading-relaxed">
                Final General Average ≥ 75 = <strong>PROMOTED</strong>. Learners failing in 1 or 2 subjects = <strong>CONDITIONAL</strong> (Remedial class required). Below 75 or failing &gt; 2 subjects = <strong>RETAINED</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: MASTER_DATA (YELLOW EDITABLE CELLS) */}
      {/* ========================================================= */}
      {activeSheet === 'Master_Data' && (
        <div className="bg-white border border-stone-300 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-black text-stone-900 flex items-center gap-2">
                <span className="w-3 h-3 bg-amber-400 rounded-sm inline-block"></span>
                <span>Master_Data — Learner Demographics (Adviser Editable Yellow Cells)</span>
              </h2>
              <p className="text-[11px] text-stone-500">Edit values directly in the highlighted yellow cells below.</p>
            </div>
            <span className="text-xs font-bold text-stone-600">Showing {filteredStudents.length} of {students.length} Learners</span>
          </div>

          <div className="overflow-x-auto max-h-[600px] border border-stone-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#092B62] text-white sticky top-0 font-bold">
                <tr>
                  <th className="p-2.5 border-r border-blue-800">LRN (12-Digit)</th>
                  <th className="p-2.5 border-r border-blue-800">Last Name</th>
                  <th className="p-2.5 border-r border-blue-800">First Name</th>
                  <th className="p-2.5 border-r border-blue-800">M.I.</th>
                  <th className="p-2.5 border-r border-blue-800">Sex</th>
                  <th className="p-2.5 border-r border-blue-800">Grade &amp; Section</th>
                  <th className="p-2.5 border-r border-blue-800">Birthdate</th>
                  <th className="p-2.5 border-r border-blue-800">Age</th>
                  <th className="p-2.5 border-r border-blue-800">Mother Tongue</th>
                  <th className="p-2.5 border-r border-blue-800">Parent / Guardian</th>
                  <th className="p-2.5">Contact No.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-medium">
                {filteredStudents.map((s) => (
                  <tr key={s.lrn} className="hover:bg-amber-50/50">
                    <td className="p-2 border-r border-stone-200 font-mono font-bold text-blue-900">{s.lrn}</td>
                    <td className="p-1 border-r border-stone-200 bg-amber-50">
                      <input
                        type="text"
                        value={s.lastName}
                        onChange={(e) => handleUpdateMaster(s.lrn, 'lastName', e.target.value)}
                        className="w-full bg-amber-100/70 border border-amber-200 px-1.5 py-0.5 rounded text-xs font-bold text-stone-900 focus:bg-white"
                      />
                    </td>
                    <td className="p-1 border-r border-stone-200 bg-amber-50">
                      <input
                        type="text"
                        value={s.firstName}
                        onChange={(e) => handleUpdateMaster(s.lrn, 'firstName', e.target.value)}
                        className="w-full bg-amber-100/70 border border-amber-200 px-1.5 py-0.5 rounded text-xs font-bold text-stone-900 focus:bg-white"
                      />
                    </td>
                    <td className="p-1 border-r border-stone-200 bg-amber-50 w-12 text-center">
                      <input
                        type="text"
                        value={s.mi}
                        onChange={(e) => handleUpdateMaster(s.lrn, 'mi', e.target.value)}
                        className="w-full bg-amber-100/70 border border-amber-200 px-1.5 py-0.5 rounded text-xs text-center font-bold text-stone-900 focus:bg-white"
                      />
                    </td>
                    <td className="p-2 border-r border-stone-200 text-center font-bold">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${s.sex === 'M' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
                        {s.sex}
                      </span>
                    </td>
                    <td className="p-2 border-r border-stone-200 text-stone-700 whitespace-nowrap">
                      {s.gradeLevel} - {s.section}
                    </td>
                    <td className="p-1 border-r border-stone-200 bg-amber-50">
                      <input
                        type="date"
                        value={s.birthDate}
                        onChange={(e) => handleUpdateMaster(s.lrn, 'birthDate', e.target.value)}
                        className="bg-amber-100/70 border border-amber-200 px-1 py-0.5 rounded text-xs font-mono"
                      />
                    </td>
                    <td className="p-2 border-r border-stone-200 text-center">{s.age}</td>
                    <td className="p-1 border-r border-stone-200 bg-amber-50">
                      <input
                        type="text"
                        value={s.motherTongue}
                        onChange={(e) => handleUpdateMaster(s.lrn, 'motherTongue', e.target.value)}
                        className="w-full bg-amber-100/70 border border-amber-200 px-1.5 py-0.5 rounded text-xs"
                      />
                    </td>
                    <td className="p-1 border-r border-stone-200 bg-amber-50">
                      <input
                        type="text"
                        value={s.parentGuardian}
                        onChange={(e) => handleUpdateMaster(s.lrn, 'parentGuardian', e.target.value)}
                        className="w-full bg-amber-100/70 border border-amber-200 px-1.5 py-0.5 rounded text-xs"
                      />
                    </td>
                    <td className="p-1 bg-amber-50">
                      <input
                        type="text"
                        value={s.contact}
                        onChange={(e) => handleUpdateMaster(s.lrn, 'contact', e.target.value)}
                        className="w-full bg-amber-100/70 border border-amber-200 px-1.5 py-0.5 rounded text-xs font-mono"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: GRADES_ECR (YELLOW EDITABLE CELLS) */}
      {/* ========================================================= */}
      {activeSheet === 'Grades_ECR' && (
        <div className="bg-white border border-stone-300 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-black text-stone-900 flex items-center gap-2">
                <span className="w-3 h-3 bg-amber-400 rounded-sm inline-block"></span>
                <span>Grades_ECR — Electronic Class Record (Adviser 3-Term Entry)</span>
              </h2>
              <p className="text-[11px] text-stone-500">Enter Term 1, Term 2, and Term 3 numerical grades in the yellow input cells.</p>
            </div>
            <span className="text-xs font-bold text-stone-600">Showing {filteredStudents.length} Learners</span>
          </div>

          <div className="overflow-x-auto max-h-[600px] border border-stone-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#092B62] text-white sticky top-0 font-bold">
                <tr>
                  <th className="p-2.5 border-r border-blue-800">LRN</th>
                  <th className="p-2.5 border-r border-blue-800">Learner Name</th>
                  <th className="p-2.5 border-r border-blue-800">Grade Level</th>
                  <th className="p-2.5 border-r border-blue-800">Subject / Learning Area</th>
                  <th className="p-2.5 border-r border-blue-800 text-center bg-amber-600/90">Term 1</th>
                  <th className="p-2.5 border-r border-blue-800 text-center bg-amber-600/90">Term 2</th>
                  <th className="p-2.5 border-r border-blue-800 text-center bg-amber-600/90">Term 3</th>
                  <th className="p-2.5 text-center bg-blue-900">Final Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-medium">
                {filteredStudents.map((s) => {
                  const ecr = gradesEcr.find(e => e.lrn === s.lrn);
                  const subjects = SUBJECT_SETS[s.gradeLevel] || [];
                  return subjects.map((subj, sIdx) => {
                    const g = ecr?.grades.find(x => x.subject === subj) || { term1: 75, term2: 75, term3: 75 };
                    const final = Math.round((g.term1 + g.term2 + g.term3) / 3);
                    return (
                      <tr key={`${s.lrn}-${subj}`} className="hover:bg-amber-50/40">
                        {sIdx === 0 && (
                          <>
                            <td rowSpan={subjects.length} className="p-2 border-r border-stone-200 font-mono font-bold text-blue-900 align-top bg-stone-50">
                              {s.lrn}
                            </td>
                            <td rowSpan={subjects.length} className="p-2 border-r border-stone-200 font-bold text-stone-900 align-top bg-stone-50 whitespace-nowrap">
                              {s.lastName}, {s.firstName}
                            </td>
                            <td rowSpan={subjects.length} className="p-2 border-r border-stone-200 text-stone-600 align-top bg-stone-50 whitespace-nowrap">
                              {s.gradeLevel} ({s.section})
                            </td>
                          </>
                        )}
                        <td className="p-2 border-r border-stone-200 font-semibold text-stone-800">{subj}</td>
                        <td className="p-1 border-r border-stone-200 bg-amber-50 w-20 text-center">
                          <input
                            type="number"
                            min="50"
                            max="100"
                            value={g.term1}
                            onChange={(e) => handleUpdateGrade(s.lrn, subj, 'term1', parseInt(e.target.value) || 0)}
                            className="w-16 bg-amber-100 border border-amber-300 px-1 py-0.5 rounded text-xs text-center font-bold focus:bg-white"
                          />
                        </td>
                        <td className="p-1 border-r border-stone-200 bg-amber-50 w-20 text-center">
                          <input
                            type="number"
                            min="50"
                            max="100"
                            value={g.term2}
                            onChange={(e) => handleUpdateGrade(s.lrn, subj, 'term2', parseInt(e.target.value) || 0)}
                            className="w-16 bg-amber-100 border border-amber-300 px-1 py-0.5 rounded text-xs text-center font-bold focus:bg-white"
                          />
                        </td>
                        <td className="p-1 border-r border-stone-200 bg-amber-50 w-20 text-center">
                          <input
                            type="number"
                            min="50"
                            max="100"
                            value={g.term3}
                            onChange={(e) => handleUpdateGrade(s.lrn, subj, 'term3', parseInt(e.target.value) || 0)}
                            className="w-16 bg-amber-100 border border-amber-300 px-1 py-0.5 rounded text-xs text-center font-bold focus:bg-white"
                          />
                        </td>
                        <td className="p-2 text-center font-black">
                          <span className={`px-2 py-0.5 rounded ${final >= 90 ? 'bg-emerald-100 text-emerald-900' : final >= 75 ? 'bg-blue-100 text-blue-900' : 'bg-rose-100 text-rose-900'}`}>
                            {final}
                          </span>
                        </td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: COMPUTED_AVERAGES (AUTO-COMPUTED LOCKED) */}
      {/* ========================================================= */}
      {activeSheet === 'Computed_Averages' && (
        <div className="bg-white border border-stone-300 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-black text-stone-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-stone-500" />
                <span>Computed_Averages (Auto-Calculated &amp; Protected)</span>
              </h2>
              <p className="text-[11px] text-stone-500">Derived in real time from Master_Data and Grades_ECR.</p>
            </div>
            <span className="text-xs font-bold text-stone-600">{filteredComputed.length} Records</span>
          </div>

          <div className="overflow-x-auto max-h-[600px] border border-stone-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#092B62] text-white sticky top-0 font-bold">
                <tr>
                  <th className="p-2.5 border-r border-blue-800">LRN</th>
                  <th className="p-2.5 border-r border-blue-800">Learner Name</th>
                  <th className="p-2.5 border-r border-blue-800">Level &amp; Section</th>
                  <th className="p-2.5 border-r border-blue-800 text-center">General Average</th>
                  <th className="p-2.5 border-r border-blue-800 text-center">Lowest Grade</th>
                  <th className="p-2.5 border-r border-blue-800">Qualitative Descriptor</th>
                  <th className="p-2.5 border-r border-blue-800">Honor Classification</th>
                  <th className="p-2.5 text-center">Promotion Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-medium">
                {filteredComputed.map((c) => (
                  <tr key={c.lrn} className="hover:bg-blue-50/40">
                    <td className="p-2 border-r border-stone-200 font-mono font-bold text-blue-900">{c.lrn}</td>
                    <td className="p-2 border-r border-stone-200 font-bold text-stone-900">{c.fullName}</td>
                    <td className="p-2 border-r border-stone-200 text-stone-700">{c.gradeLevel} - {c.section}</td>
                    <td className="p-2 border-r border-stone-200 text-center font-black text-sm text-blue-950">
                      {c.generalAverage}
                    </td>
                    <td className="p-2 border-r border-stone-200 text-center font-bold text-stone-700">
                      {c.lowestGrade}
                    </td>
                    <td className="p-2 border-r border-stone-200 font-semibold">
                      <span className="text-stone-900">{c.descriptorEn}</span>{' '}
                      <span className="text-stone-400 text-[10px]">({c.descriptorFil})</span>
                    </td>
                    <td className="p-2 border-r border-stone-200">
                      {c.honorClassification !== 'None' ? (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded font-black text-[10px]">
                          🎖️ {c.honorClassification}
                        </span>
                      ) : (
                        <span className="text-stone-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="p-2 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full font-black text-[10px] ${
                        c.promotionStatus === 'PROMOTED'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : c.promotionStatus === 'CONDITIONAL'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-rose-100 text-rose-900 border border-rose-300'
                      }`}>
                        {c.promotionStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: SF1 (SCHOOL REGISTER) */}
      {/* ========================================================= */}
      {activeSheet === 'SF1' && (
        <div className="bg-white border border-stone-300 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="border-b border-stone-200 pb-3 flex justify-between items-center">
            <div>
              <h2 className="text-base font-black text-[#092B62]">
                School Form 1 (SF1) — School Register
              </h2>
              <p className="text-xs text-stone-500">LNNCHS • School Year: 2026-2027 • Full Auto-Pulled from Master_Data</p>
            </div>
            <button
              onClick={() => exportLnnchsPdfPacket('SF1', students, computedList)}
              className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print SF1</span>
            </button>
          </div>

          <div className="overflow-x-auto max-h-[550px] border border-stone-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#092B62] text-white font-bold sticky top-0">
                <tr>
                  <th className="p-2 border-r border-blue-800">LRN</th>
                  <th className="p-2 border-r border-blue-800">Last Name</th>
                  <th className="p-2 border-r border-blue-800">First Name</th>
                  <th className="p-2 border-r border-blue-800">M.I.</th>
                  <th className="p-2 border-r border-blue-800">Sex</th>
                  <th className="p-2 border-r border-blue-800">Grade Lvl</th>
                  <th className="p-2">Section</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-medium">
                {filteredStudents.map(s => (
                  <tr key={s.lrn} className="hover:bg-stone-50">
                    <td className="p-2 border-r border-stone-200 font-mono font-bold text-blue-900">{s.lrn}</td>
                    <td className="p-2 border-r border-stone-200">{s.lastName}</td>
                    <td className="p-2 border-r border-stone-200">{s.firstName}</td>
                    <td className="p-2 border-r border-stone-200 text-center">{s.mi}</td>
                    <td className="p-2 border-r border-stone-200 text-center">{s.sex}</td>
                    <td className="p-2 border-r border-stone-200">{s.gradeLevel}</td>
                    <td className="p-2">{s.section}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 9: SF5 (REPORT ON PROMOTION) */}
      {/* ========================================================= */}
      {activeSheet === 'SF5' && (
        <div className="bg-white border border-stone-300 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="border-b border-stone-200 pb-3 flex justify-between items-center">
            <div>
              <h2 className="text-base font-black text-[#092B62]">
                School Form 5 (SF5) — Report on Promotion and Level of Progress
              </h2>
              <p className="text-xs text-stone-500">LNNCHS • School Year: 2026-2027 • Full Auto-Pulled from Computed_Averages</p>
            </div>
            <button
              onClick={() => exportLnnchsPdfPacket('SF5', students, computedList)}
              className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print SF5</span>
            </button>
          </div>

          <div className="overflow-x-auto max-h-[550px] border border-stone-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#092B62] text-white font-bold sticky top-0">
                <tr>
                  <th className="p-2.5 border-r border-blue-800">LRN</th>
                  <th className="p-2.5 border-r border-blue-800">Learner Name</th>
                  <th className="p-2.5 border-r border-blue-800 text-center">Final General Average</th>
                  <th className="p-2.5 border-r border-blue-800 text-center">Promotion Status</th>
                  <th className="p-2.5">Remarks / Deficiency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-medium">
                {filteredComputed.map(c => (
                  <tr key={c.lrn} className="hover:bg-stone-50">
                    <td className="p-2 border-r border-stone-200 font-mono font-bold text-blue-900">{c.lrn}</td>
                    <td className="p-2 border-r border-stone-200 font-bold">{c.fullName}</td>
                    <td className="p-2 border-r border-stone-200 text-center font-black">{c.generalAverage}</td>
                    <td className="p-2 border-r border-stone-200 text-center font-bold">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        c.promotionStatus === 'PROMOTED' ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                      }`}>
                        {c.promotionStatus}
                      </span>
                    </td>
                    <td className="p-2 text-stone-600">
                      {c.failingCount > 0 ? `Failed ${c.failingCount} learning area(s) - For Remedial` : 'Eligible for Regular Promotion'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 10: SF6 (SUMMARIZED REPORT ON PROMOTION) */}
      {/* ========================================================= */}
      {activeSheet === 'SF6' && (
        <div className="bg-white border border-stone-300 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-stone-200 pb-3">
            <h2 className="text-base font-black text-[#092B62]">
              School Form 6 (SF6) — Summarized Report on Promotion and Learning Progress
            </h2>
            <p className="text-xs text-stone-500">School-Wide Aggregation across Key Stages (Auto-Calculated)</p>
          </div>

          <div className="overflow-x-auto border border-stone-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#092B62] text-white font-bold">
                <tr>
                  <th className="p-3 border-r border-blue-800">Grade Level</th>
                  <th className="p-3 border-r border-blue-800 text-center">Total Learners</th>
                  <th className="p-3 border-r border-blue-800 text-center">Promoted</th>
                  <th className="p-3 border-r border-blue-800 text-center">Conditional</th>
                  <th className="p-3 border-r border-blue-800 text-center">Retained</th>
                  <th className="p-3 border-r border-blue-800 text-center">With Honors</th>
                  <th className="p-3 border-r border-blue-800 text-center">With High Honors</th>
                  <th className="p-3 text-center">With Highest Honors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-semibold">
                {(['Grade 3', 'Grade 8', 'Grade 11'] as const).map(gl => {
                  const list = computedList.filter(c => c.gradeLevel === gl);
                  const total = list.length;
                  const promoted = list.filter(c => c.promotionStatus === 'PROMOTED').length;
                  const conditional = list.filter(c => c.promotionStatus === 'CONDITIONAL').length;
                  const retained = list.filter(c => c.promotionStatus === 'RETAINED').length;
                  const honors = list.filter(c => c.honorClassification === 'With Honors').length;
                  const highHonors = list.filter(c => c.honorClassification === 'With High Honors').length;
                  const highestHonors = list.filter(c => c.honorClassification === 'With Highest Honors').length;
                  return (
                    <tr key={gl} className="hover:bg-stone-50">
                      <td className="p-3 border-r border-stone-200 font-black text-stone-900">{gl}</td>
                      <td className="p-3 border-r border-stone-200 text-center font-bold">{total}</td>
                      <td className="p-3 border-r border-stone-200 text-center text-emerald-700 font-bold">{promoted}</td>
                      <td className="p-3 border-r border-stone-200 text-center text-amber-700 font-bold">{conditional}</td>
                      <td className="p-3 border-r border-stone-200 text-center text-rose-700 font-bold">{retained}</td>
                      <td className="p-3 border-r border-stone-200 text-center font-bold text-amber-900">{honors}</td>
                      <td className="p-3 border-r border-stone-200 text-center font-bold text-amber-900">{highHonors}</td>
                      <td className="p-3 text-center font-bold text-amber-900">{highestHonors}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 13: SF9 (LEARNER'S REPORT CARD - YELLOW LRN INPUT) */}
      {/* ========================================================= */}
      {activeSheet === 'SF9' && (
        <div className="bg-white border border-stone-300 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-stone-200 pb-4">
            <div>
              <h2 className="text-base font-black text-[#092B62]">
                School Form 9 (SF9) — Learner's Progress Report Card
              </h2>
              <p className="text-xs text-stone-500">Auto-fills when LRN is selected or typed in the yellow cell.</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-900">🟡 Enter/Select LRN:</span>
              <select
                value={sf9Lrn}
                onChange={e => setSf9Lrn(e.target.value)}
                className="bg-amber-100 border border-amber-300 rounded-xl px-3 py-1.5 text-xs font-mono font-black text-stone-900 focus:bg-white"
              >
                {students.map(s => (
                  <option key={s.lrn} value={s.lrn}>
                    {s.lrn} — {s.lastName}, {s.firstName} ({s.gradeLevel})
                  </option>
                ))}
              </select>
              <button
                onClick={() => exportLnnchsPdfPacket('SF9', students, computedList, sf9Lrn)}
                className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>
            </div>
          </div>

          {(() => {
            const currentComputed = computedList.find(c => c.lrn === sf9Lrn) || computedList[0];
            const currentStudent = students.find(s => s.lrn === sf9Lrn) || students[0];
            return (
              <div className="border border-stone-300 rounded-xl p-5 space-y-4 bg-stone-50/50 shadow-2xs hover:shadow-lg hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-300 ease-out">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white p-3 rounded-lg border border-stone-200 font-medium shadow-2xs hover:shadow-sm transition-all duration-200">
                  <div><strong>Name:</strong> {currentStudent.lastName}, {currentStudent.firstName} {currentStudent.mi}</div>
                  <div><strong>LRN:</strong> <span className="font-mono font-bold text-blue-900">{currentStudent.lrn}</span></div>
                  <div><strong>Sex:</strong> {currentStudent.sex}</div>
                  <div><strong>Grade &amp; Section:</strong> {currentStudent.gradeLevel} - {currentStudent.section}</div>
                  <div><strong>School Year:</strong> 2026-2027</div>
                  <div><strong>Adviser:</strong> STEAVEN KINTH D. BOISER, T-III</div>
                </div>

                <table className="w-full text-left text-xs border-collapse bg-white rounded-lg overflow-hidden border border-stone-200">
                  <thead className="bg-[#092B62] text-white font-bold">
                    <tr>
                      <th className="p-2.5">Learning Area</th>
                      <th className="p-2.5 text-center">Term 1</th>
                      <th className="p-2.5 text-center">Term 2</th>
                      <th className="p-2.5 text-center">Term 3</th>
                      <th className="p-2.5 text-center">Final Rating</th>
                      <th className="p-2.5 text-center">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {currentComputed.subjectFinalGrades.map(s => (
                      <tr key={s.subject}>
                        <td className="p-2 font-semibold text-stone-900">{s.subject}</td>
                        <td className="p-2 text-center font-mono">{s.t1}</td>
                        <td className="p-2 text-center font-mono">{s.t2}</td>
                        <td className="p-2 text-center font-mono">{s.t3}</td>
                        <td className="p-2 text-center font-mono font-black text-blue-950">{s.final}</td>
                        <td className="p-2 text-center font-bold">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${s.final >= 75 ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
                            {s.final >= 75 ? 'PASSED' : 'FAILED'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-stone-100 font-bold border-t border-stone-300">
                    <tr>
                      <td className="p-2.5">General Average</td>
                      <td colSpan={3}></td>
                      <td className="p-2.5 text-center text-sm font-black text-blue-950">{currentComputed.generalAverage}</td>
                      <td className="p-2.5 text-center">{currentComputed.promotionStatus}</td>
                    </tr>
                  </tfoot>
                </table>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs flex flex-wrap justify-between items-center gap-2">
                  <div><strong>Honor Classification:</strong> {currentComputed.honorClassification !== 'None' ? currentComputed.honorClassification : 'Did Not Qualify'}</div>
                  <div><strong>Descriptor:</strong> {currentComputed.descriptorEn} ({currentComputed.descriptorFil})</div>
                  <div><strong>Lowest Subject Grade:</strong> {currentComputed.lowestGrade}</div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 14: SF10 (PERMANENT ACADEMIC RECORD) */}
      {/* ========================================================= */}
      {activeSheet === 'SF10' && (
        <div className="bg-white border border-stone-300 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-stone-200 pb-4">
            <div>
              <h2 className="text-base font-black text-[#092B62]">
                School Form 10 (SF10) — Learner's Permanent Academic Record
              </h2>
              <p className="text-xs text-stone-500">Cumulative Academic Record across School Years.</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-900">🟡 Enter/Select LRN:</span>
              <select
                value={sf10Lrn}
                onChange={e => setSf10Lrn(e.target.value)}
                className="bg-amber-100 border border-amber-300 rounded-xl px-3 py-1.5 text-xs font-mono font-black text-stone-900 focus:bg-white"
              >
                {students.map(s => (
                  <option key={s.lrn} value={s.lrn}>
                    {s.lrn} — {s.lastName}, {s.firstName} ({s.gradeLevel})
                  </option>
                ))}
              </select>
              <button
                onClick={() => exportLnnchsPdfPacket('SF10', students, computedList, sf10Lrn)}
                className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>
            </div>
          </div>

          {(() => {
            const currentComputed = computedList.find(c => c.lrn === sf10Lrn) || computedList[0];
            const currentStudent = students.find(s => s.lrn === sf10Lrn) || students[0];
            return (
              <div className="border border-stone-300 rounded-xl p-5 space-y-4 bg-stone-50/50 shadow-2xs hover:shadow-lg hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-300 ease-out">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white p-3 rounded-lg border border-stone-200 font-medium shadow-2xs hover:shadow-sm transition-all duration-200">
                  <div><strong>Learner:</strong> {currentStudent.lastName}, {currentStudent.firstName} {currentStudent.mi}</div>
                  <div><strong>LRN:</strong> <span className="font-mono font-bold text-blue-900">{currentStudent.lrn}</span></div>
                  <div><strong>Birthdate:</strong> {currentStudent.birthDate}</div>
                  <div><strong>School:</strong> LNNCHS (School ID: 304015)</div>
                  <div><strong>Track / Strand:</strong> DO 3, s. 2026 Curriculum</div>
                  <div><strong>Eligibility:</strong> Elementary Graduate / JHS Completer</div>
                </div>

                <table className="w-full text-left text-xs border-collapse bg-white rounded-lg overflow-hidden border border-stone-200">
                  <thead className="bg-[#092B62] text-white font-bold">
                    <tr>
                      <th className="p-2.5">Learning Area</th>
                      <th className="p-2.5 text-center">Term 1</th>
                      <th className="p-2.5 text-center">Term 2</th>
                      <th className="p-2.5 text-center">Term 3</th>
                      <th className="p-2.5 text-center">Final Rating</th>
                      <th className="p-2.5 text-center">Action Taken</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {currentComputed.subjectFinalGrades.map(s => (
                      <tr key={s.subject}>
                        <td className="p-2 font-semibold text-stone-900">{s.subject}</td>
                        <td className="p-2 text-center font-mono">{s.t1}</td>
                        <td className="p-2 text-center font-mono">{s.t2}</td>
                        <td className="p-2 text-center font-mono">{s.t3}</td>
                        <td className="p-2 text-center font-mono font-black text-blue-950">{s.final}</td>
                        <td className="p-2 text-center font-bold">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${s.final >= 75 ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
                            {s.final >= 75 ? 'PASSED' : 'FAILED'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-stone-100 font-bold border-t border-stone-300">
                    <tr>
                      <td className="p-2.5">General Average</td>
                      <td colSpan={3}></td>
                      <td className="p-2.5 text-center text-sm font-black text-blue-950">{currentComputed.generalAverage}</td>
                      <td className="p-2.5 text-center">{currentComputed.promotionStatus}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 15: HONOR_ROLL_SUMMARY */}
      {/* ========================================================= */}
      {activeSheet === 'Honor_Roll_Summary' && (
        <div className="bg-white border border-stone-300 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-stone-200 pb-3 flex justify-between items-center">
            <div>
              <h2 className="text-base font-black text-[#092B62] flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Honor Roll Summary (Alphabetical as per DepEd DO 3, s. 2026)</span>
              </h2>
              <p className="text-xs text-stone-500">
                With Honors (90–94, min 85) • With High Honors (95–97, min 90) • With Highest Honors (98–100, min 93)
              </p>
            </div>
            <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Total Awardees: {computedList.filter(c => c.honorClassification !== 'None').length}
            </span>
          </div>

          <div className="overflow-x-auto border border-stone-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#092B62] text-white font-bold">
                <tr>
                  <th className="p-3 border-r border-blue-800">LRN</th>
                  <th className="p-3 border-r border-blue-800">Learner Name (Alphabetical)</th>
                  <th className="p-3 border-r border-blue-800">Grade Level</th>
                  <th className="p-3 border-r border-blue-800">Section</th>
                  <th className="p-3 border-r border-blue-800 text-center">General Average</th>
                  <th className="p-3 border-r border-blue-800 text-center">Lowest Grade</th>
                  <th className="p-3">Honor Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-semibold">
                {computedList
                  .filter(c => c.honorClassification !== 'None')
                  .sort((a, b) => a.fullName.localeCompare(b.fullName))
                  .map(h => (
                    <tr key={h.lrn} className="hover:bg-amber-50/50">
                      <td className="p-2.5 border-r border-stone-200 font-mono font-bold text-blue-900">{h.lrn}</td>
                      <td className="p-2.5 border-r border-stone-200 font-bold text-stone-900">{h.fullName}</td>
                      <td className="p-2.5 border-r border-stone-200 text-stone-700">{h.gradeLevel}</td>
                      <td className="p-2.5 border-r border-stone-200 text-stone-700">{h.section}</td>
                      <td className="p-2.5 border-r border-stone-200 text-center font-black text-blue-950 text-sm">{h.generalAverage}</td>
                      <td className="p-2.5 border-r border-stone-200 text-center text-stone-600">{h.lowestGrade}</td>
                      <td className="p-2.5">
                        <span className={`px-2.5 py-1 rounded-full font-black text-[10px] ${
                          h.honorClassification === 'With Highest Honors'
                            ? 'bg-purple-100 text-purple-900 border border-purple-300'
                            : h.honorClassification === 'With High Honors'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-blue-100 text-blue-900 border border-blue-300'
                        }`}>
                          🎖️ {h.honorClassification}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 16: REGISTRAR_DASHBOARD */}
      {/* ========================================================= */}
      {activeSheet === 'Registrar_Dashboard' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm space-y-1">
              <span className="text-xs font-bold text-stone-500">Total Enrolled Learners</span>
              <p className="text-3xl font-black text-[#092B62]">{students.length}</p>
              <span className="text-[11px] text-stone-400">Across 3 Sample Sections</span>
            </div>
            <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm space-y-1">
              <span className="text-xs font-bold text-emerald-600">Promoted Learners</span>
              <p className="text-3xl font-black text-emerald-700">
                {computedList.filter(c => c.promotionStatus === 'PROMOTED').length}
              </p>
              <span className="text-[11px] text-stone-400">
                {Math.round((computedList.filter(c => c.promotionStatus === 'PROMOTED').length / students.length) * 100)}% Promotion Rate
              </span>
            </div>
            <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm space-y-1">
              <span className="text-xs font-bold text-amber-600">Academic Awardees</span>
              <p className="text-3xl font-black text-amber-700">
                {computedList.filter(c => c.honorClassification !== 'None').length}
              </p>
              <span className="text-[11px] text-stone-400">Highest, High &amp; With Honors</span>
            </div>
            <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm space-y-1">
              <span className="text-xs font-bold text-rose-600">For Remediation / Retained</span>
              <p className="text-3xl font-black text-rose-700">
                {computedList.filter(c => c.promotionStatus !== 'PROMOTED').length}
              </p>
              <span className="text-[11px] text-stone-400">Conditional or Retained</span>
            </div>
          </div>
        </div>
      )}

      {/* Other Form Templates (SF2, SF3, SF4, SF7, SF8) */}
      {(activeSheet === 'SF2' || activeSheet === 'SF3' || activeSheet === 'SF4' || activeSheet === 'SF7' || activeSheet === 'SF8') && (
        <div className="bg-white border border-stone-300 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-stone-200 pb-3 flex justify-between items-center">
            <div>
              <h2 className="text-base font-black text-[#092B62]">
                {activeSheet} — Ready-to-Fill School Form Template
              </h2>
              <p className="text-xs text-stone-500">
                Standard non-grade derived official DepEd layout (Attendance, Enrolment, Personnel &amp; Health).
              </p>
            </div>
            <button
              onClick={() => exportLnnchsPdfPacket(activeSheet, students, computedList)}
              className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export {activeSheet} PDF</span>
            </button>
          </div>

          <div className="p-8 text-center bg-stone-50 rounded-xl border border-dashed border-stone-300 space-y-2">
            <FileText className="w-10 h-10 text-stone-400 mx-auto" />
            <h3 className="text-sm font-bold text-stone-700">Template is Pre-Configured for Printing or Excel Export</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              This form is linked in the master 15-sheet Excel workbook and printable in the PDF packet.
            </p>
          </div>
        </div>
      )}

      {/* Password Unlock Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-300 space-y-4 animate-scale-up">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-800">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-stone-950">Unlock Protected Sheets</h3>
                <p className="text-xs text-stone-500">Registrar &amp; ICT Authority Password</p>
              </div>
            </div>

            <form onSubmit={handleUnlockSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Enter Master Password:</label>
                <input
                  type="password"
                  placeholder="Hint: LNNCHS2026"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-xs text-rose-600 font-bold mt-1.5">{passwordError}</p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordError(null);
                  }}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#092B62] hover:bg-blue-900 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Unlock Sheets
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
