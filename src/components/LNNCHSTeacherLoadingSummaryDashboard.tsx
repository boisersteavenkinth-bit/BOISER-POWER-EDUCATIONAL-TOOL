import React, { useState } from 'react';
import { 
  LNNCHS_SHS_TEACHER_LOADINGS, 
  TeacherLoadingEntry 
} from '../data/lnnchsOfficialSHSSchedulesAndExams';
import { 
  LNNCHS_GRADE11_CLASS_PROGRAMS, 
  LNNCHS_GRADE12_CLASS_PROGRAMS, 
  LNNCHS_TEACHER_PROGRAMS 
} from '../data/lnnchsClassAndTeacherProgramsData';
import { 
  LNNCHS_JHS_TEACHERS 
} from '../data/lnnchsOfficialJHSSchedules';
import { 
  Building2, 
  GraduationCap, 
  BookOpen, 
  Users, 
  Clock, 
  FileSpreadsheet, 
  Printer, 
  Download, 
  Search, 
  Filter, 
  Layers,
  Sparkles,
  CheckCircle2,
  Award
} from 'lucide-react';
import { jsPDF } from 'jspdf';

export const LNNCHSTeacherLoadingSummaryDashboard: React.FC = () => {
  const [levelTab, setLevelTab] = useState<'SHS' | 'JHS'>('SHS');
  const [shsCategoryTab, setShsCategoryTab] = useState<'ACADEMIC' | 'TECHPRO' | 'TEACHER_PROGRAMS'>('ACADEMIC');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('ALL');

  // Categorize SHS teachers into Academic vs TechPro (TVL)
  const academicDepts = ['Science', 'Mathematics', 'English', 'Filipino', 'Social Science', 'Physical Education'];
  const techProDepts = ['ABM', 'TVL'];

  const filteredShsTeachers = LNNCHS_SHS_TEACHER_LOADINGS.filter(t => {
    const matchesLevel = levelTab === 'SHS';
    const matchesCategory = shsCategoryTab === 'TEACHER_PROGRAMS' || 
      (shsCategoryTab === 'ACADEMIC' && academicDepts.includes(t.department)) ||
      (shsCategoryTab === 'TECHPRO' && techProDepts.includes(t.department));
    
    const matchesDept = departmentFilter === 'ALL' || t.department === departmentFilter;
    const matchesSearch = !searchQuery.trim() || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.advisoryOrCoordinatorship.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subjectsHandled.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesLevel && matchesCategory && matchesDept && matchesSearch;
  });

  const filteredJhsTeachers = LNNCHS_JHS_TEACHERS.filter(t => {
    const matchesLevel = levelTab === 'JHS';
    const matchesDept = departmentFilter === 'ALL' || t.department === departmentFilter;
    const matchesSearch = !searchQuery.trim() || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.advisoryOrCoordinatorship.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesDept && matchesSearch;
  });

  // Export summary to PDF
  const exportSummaryPDF = () => {
    const doc = new jsPDF('landscape');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(0, 39, 118);
    doc.text('LANAO DEL NORTE NATIONAL COMPREHENSIVE HIGH SCHOOL', 148, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    doc.text(`Master Summary Dashboard – ${levelTab} (${shsCategoryTab})`, 148, 22, { align: 'center' });
    doc.text('School Year 2026–2027 (Term 2)', 148, 28, { align: 'center' });

    doc.setFillColor(0, 39, 118);
    doc.rect(14, 34, 268, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('No.', 16, 38.5);
    doc.text('Department', 26, 38.5);
    doc.text('Teacher Name', 65, 38.5);
    doc.text('Advisory / Designation', 125, 38.5);
    doc.text('Total Work Minutes / Wk', 210, 38.5);

    let y = 45;
    doc.setTextColor(15, 23, 42);
    const dataList = levelTab === 'SHS' ? filteredShsTeachers : filteredJhsTeachers;

    dataList.forEach((t: any, idx: number) => {
      if (idx % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(14, y - 4, 268, 6, 'F');
      }
      doc.setFont('helvetica', 'normal');
      doc.text(String(t.no || idx + 1), 16, y);
      doc.text(t.department || 'General', 26, y);
      doc.setFont('helvetica', 'bold');
      doc.text(t.name, 65, y);
      doc.setFont('helvetica', 'normal');
      doc.text(t.advisoryOrCoordinatorship || '-', 125, y);
      doc.setFont('helvetica', 'bold');
      doc.text(`${t.totalMinutes} mins`, 210, y);
      y += 6.5;
      if (y > 185) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save(`LNNCHS_${levelTab}_${shsCategoryTab}_Loading_Summary_SY2026.pdf`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#002776] to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border-b-4 border-[#FCD116]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-[#FCD116] text-[#002776] rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
                Master Reference Dashboard
              </span>
              <span className="px-3 py-1 bg-emerald-500/35 text-emerald-200 border border-emerald-400/40 rounded-full text-xs font-bold">
                SY 2026-2027 Term 2
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <span>Teachers' Schedule &amp; Class Loading Master Summary</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              Overall reference view separating Junior High School (JHS) and Senior High School (SHS), with distinct filtering between Academic Track and TechPro (TVL) Track class programs and teacher schedules.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportSummaryPDF}
              className="px-4 py-2.5 bg-[#CE1126] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Summary PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Level Selector Tabs (JHS vs SHS) */}
      <div className="flex flex-wrap bg-stone-200 p-1.5 rounded-2xl gap-2">
        <button
          onClick={() => { setLevelTab('SHS'); setShsCategoryTab('ACADEMic' as any); }}
          className={`flex-1 min-w-[200px] py-3.5 px-6 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-3 cursor-pointer ${
            levelTab === 'SHS' 
              ? 'bg-[#002776] text-white shadow-md ring-2 ring-blue-400' 
              : 'text-stone-700 hover:bg-stone-300'
          }`}
        >
          <GraduationCap className="w-5 h-5 text-[#FCD116]" />
          <span>Senior High School (SHS - Grade 11 &amp; 12)</span>
        </button>

        <button
          onClick={() => setLevelTab('JHS')}
          className={`flex-1 min-w-[200px] py-3.5 px-6 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-3 cursor-pointer ${
            levelTab === 'JHS' 
              ? 'bg-[#002776] text-white shadow-md ring-2 ring-blue-400' 
              : 'text-stone-700 hover:bg-stone-300'
          }`}
        >
          <Building2 className="w-5 h-5 text-emerald-400" />
          <span>Junior High School (JHS - Grade 7 to 10)</span>
        </button>
      </div>

      {/* SHS Track Sub-Tabs (Academic vs TechPro vs Programs) */}
      {levelTab === 'SHS' && (
        <div className="flex flex-wrap bg-blue-50 border border-blue-200 p-2 rounded-2xl gap-2">
          <button
            onClick={() => setShsCategoryTab('ACADEMIC')}
            className={`py-2.5 px-5 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
              shsCategoryTab === 'ACADEMIC' 
                ? 'bg-blue-800 text-white shadow-sm' 
                : 'text-blue-900 bg-white border border-blue-200 hover:bg-blue-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#FCD116]" />
            <span>Pure Academic Track Loading</span>
          </button>

          <button
            onClick={() => setShsCategoryTab('TECHPRO')}
            className={`py-2.5 px-5 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
              shsCategoryTab === 'TECHPRO' 
                ? 'bg-blue-800 text-white shadow-sm' 
                : 'text-blue-900 bg-white border border-blue-200 hover:bg-blue-100'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>TechPro (TVL / ECHPRO) Track Loading</span>
          </button>

          <button
            onClick={() => setShsCategoryTab('TEACHER_PROGRAMS')}
            className={`py-2.5 px-5 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
              shsCategoryTab === 'TEACHER_PROGRAMS' 
                ? 'bg-blue-800 text-white shadow-sm' 
                : 'text-blue-900 bg-white border border-blue-200 hover:bg-blue-100'
            }`}
          >
            <Users className="w-4 h-4 text-amber-300" />
            <span>Individual Teacher Programs &amp; Schedules</span>
          </button>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative min-w-[260px] flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search teacher name, advisory class, or subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-stone-500" />
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 outline-none"
            >
              <option value="ALL">All Departments</option>
              <option value="Science">Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="English">English</option>
              <option value="Filipino">Filipino</option>
              <option value="Social Science">Social Science</option>
              <option value="ABM">ABM / Business</option>
              <option value="TVL">TVL / TechPro</option>
              <option value="Physical Education">Physical Education</option>
            </select>
          </div>
        </div>

        <div className="text-xs font-bold text-stone-500">
          Showing <span className="text-[#002776] font-black">{levelTab === 'SHS' ? filteredShsTeachers.length : filteredJhsTeachers.length}</span> faculty records
        </div>
      </div>

      {/* Data Table View */}
      {levelTab === 'SHS' && shsCategoryTab !== 'TEACHER_PROGRAMS' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#002776] text-white font-black uppercase text-[11px] tracking-wider">
                  <th className="p-3.5 pl-5">No.</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Teacher Name</th>
                  <th className="p-3.5">Advisory Class / Designation</th>
                  <th className="p-3.5 text-center">Regular Periods</th>
                  <th className="p-3.5 text-center">ALS Periods</th>
                  <th className="p-3.5 text-center">Total Minutes / Wk</th>
                  <th className="p-3.5 pr-5">Subjects Handled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredShsTeachers.map((t, idx) => (
                  <tr key={t.no || idx} className="hover:bg-blue-50/50 transition">
                    <td className="p-3.5 pl-5 font-bold text-stone-500">{t.no}</td>
                    <td className="p-3.5 font-bold text-[#002776]">{t.department}</td>
                    <td className="p-3.5 font-black text-stone-900">{t.name}</td>
                    <td className="p-3.5 text-stone-700 font-medium">{t.advisoryOrCoordinatorship}</td>
                    <td className="p-3.5 text-center font-bold text-stone-800">{t.periodsRegular}</td>
                    <td className="p-3.5 text-center font-bold text-emerald-700">{t.periodsALS}</td>
                    <td className="p-3.5 text-center font-mono font-black text-blue-900">{t.totalMinutes} mins</td>
                    <td className="p-3.5 pr-5 text-stone-600 text-[11px]">{t.subjectsHandled}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {levelTab === 'JHS' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-emerald-800 text-white font-black uppercase text-[11px] tracking-wider">
                  <th className="p-3.5 pl-5">No.</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Teacher Name</th>
                  <th className="p-3.5">Advisory Class / Coordinatorship</th>
                  <th className="p-3.5 text-center">Weekly Load (Mins)</th>
                  <th className="p-3.5 pr-5">Status / Assignment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredJhsTeachers.map((t, idx) => (
                  <tr key={t.no || idx} className="hover:bg-emerald-50/40 transition">
                    <td className="p-3.5 pl-5 font-bold text-stone-500">{t.no}</td>
                    <td className="p-3.5 font-bold text-emerald-800">{t.department}</td>
                    <td className="p-3.5 font-black text-stone-900">{t.name}</td>
                    <td className="p-3.5 text-stone-700 font-medium">{t.advisoryOrCoordinatorship}</td>
                    <td className="p-3.5 text-center font-mono font-black text-emerald-900">{t.totalMinutes} mins</td>
                    <td className="p-3.5 pr-5 font-bold text-emerald-700">100% Full Load (JHS)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {levelTab === 'SHS' && shsCategoryTab === 'TEACHER_PROGRAMS' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 font-medium">
            <b>Teacher Programs View:</b> Below are the verified individual teacher daily schedules for Term 2 (SY 2026-2027) showing exact time slots and room distributions.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LNNCHS_TEACHER_PROGRAMS.map((prog, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <div className="font-black text-stone-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#002776]" />
                    <span>{prog.teacherName}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-lg text-[10px] font-bold">
                    Advisory: {prog.advisoryClass || 'None'}
                  </span>
                </div>
                <div className="text-[11px] text-stone-500">
                  Term: <b className="text-stone-800">{prog.term} ({prog.durationDays} days)</b> | {prog.schoolYear}
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1 bg-stone-50 p-2.5 rounded-xl border border-stone-200 font-mono text-[11px]">
                  {prog.schedule.map((slot, sIdx) => (
                    <div key={sIdx} className="flex justify-between border-b border-stone-200/50 py-1">
                      <span className="text-stone-500 font-bold">{slot.time}</span>
                      <span className="text-stone-800 text-right">{slot.monday !== '-' ? slot.monday : 'Free / Break'}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
