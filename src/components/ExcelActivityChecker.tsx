import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Plus,
  Trash2,
  Calculator,
  Award,
  CheckCircle2,
  TrendingUp,
  RotateCcw,
  Search,
  BookOpen
} from 'lucide-react';
import {
  StudentScoreRecord,
  ActivityCheckerMeta,
  exportActivityCheckerToXlsx,
  transmuteDepEdScore
} from '../utils/excelActivityCheckerExporter';

interface ExcelActivityCheckerProps {
  meta: ActivityCheckerMeta;
}

const DEFAULT_STUDENTS: StudentScoreRecord[] = [
  { id: '1', name: 'Alcantara, Mark Angelo D.', gender: 'M', las1Score: 24, las2Score: 23, las3Score: 25, las4Score: 24 },
  { id: '2', name: 'Bautista, Sarah Mae P.', gender: 'F', las1Score: 25, las2Score: 24, las3Score: 25, las4Score: 25 },
  { id: '3', name: 'Cabrera, Joshua Neil T.', gender: 'M', las1Score: 20, las2Score: 19, las3Score: 22, las4Score: 21 },
  { id: '4', name: 'Dela Cruz, Princess Jane R.', gender: 'F', las1Score: 23, las2Score: 24, las3Score: 24, las4Score: 23 },
  { id: '5', name: 'Espina, Christian Paul L.', gender: 'M', las1Score: 18, las2Score: 17, las3Score: 19, las4Score: 18 },
  { id: '6', name: 'Flores, Kimberly Anne S.', gender: 'F', las1Score: 25, las2Score: 25, las3Score: 24, las4Score: 25 },
  { id: '7', name: 'Garcia, Ralph Christian V.', gender: 'M', las1Score: 21, las2Score: 22, las3Score: 20, las4Score: 21 },
  { id: '8', name: 'Hernandez, Aaliyah Nicole M.', gender: 'F', las1Score: 24, las2Score: 23, las3Score: 25, las4Score: 24 }
];

export const ExcelActivityChecker: React.FC<ExcelActivityCheckerProps> = ({ meta }) => {
  const [students, setStudents] = useState<StudentScoreRecord[]>(() => {
    // deduplicate fixed spelling elements
    return DEFAULT_STUDENTS.map(s => {
      const fixed = { ...s };
      // ensure we don't have stray properties
      return fixed;
    });
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGender, setNewStudentGender] = useState<'M' | 'F'>('M');

  const maxTotal = meta.maxScores.las1 + meta.maxScores.las2 + meta.maxScores.las3 + meta.maxScores.las4;

  const handleScoreChange = (id: string, field: keyof StudentScoreRecord, val: number) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.id === id) {
          const clamped = Math.max(0, val);
          return { ...s, [field]: clamped };
        }
        return s;
      })
    );
  };

  const handleAddStudent = () => {
    if (!newStudentName.trim()) return;
    const newStudent: StudentScoreRecord = {
      id: Date.now().toString(),
      name: newStudentName.trim(),
      gender: newStudentGender,
      las1Score: 20,
      las2Score: 20,
      las3Score: 20,
      las4Score: 20
    };
    setStudents([...students, newStudent]);
    setNewStudentName('');
  };

  const handleRemoveStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const handleResetScores = () => {
    setStudents(DEFAULT_STUDENTS);
  };

  // Calculations
  const scoresSummary = students.map(s => {
    const raw = s.las1Score + s.las2Score + s.las3Score + s.las4Score;
    const pct = maxTotal > 0 ? (raw / maxTotal) * 100 : 0;
    const transmuted = transmuteDepEdScore(pct);
    return { ...s, raw, pct, transmuted };
  });

  const filteredScores = scoresSummary.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const avgScore = scoresSummary.length > 0
    ? scoresSummary.reduce((acc, s) => acc + s.raw, 0) / scoresSummary.length
    : 0;

  const avgPct = maxTotal > 0 ? (avgScore / maxTotal) * 100 : 0;
  const avgTransmuted = transmuteDepEdScore(avgPct);

  const passingCount = scoresSummary.filter(s => s.transmuted >= 75).length;
  const passingRate = scoresSummary.length > 0 ? (passingCount / scoresSummary.length) * 100 : 0;

  const handleDownloadXlsx = () => {
    exportActivityCheckerToXlsx(students, meta);
  };

  const handleDownloadCsv = () => {
    let csv = `No.,Learner Name,Gender,LAS 1 (${meta.maxScores.las1}),LAS 2 (${meta.maxScores.las2}),LAS 3 (${meta.maxScores.las3}),LAS 4 (${meta.maxScores.las4}),Total Score,Percentage (%),Transmuted Grade,Mastery Status\n`;
    scoresSummary.forEach((s, idx) => {
      const status = s.pct >= 85 ? 'Mastered' : s.pct >= 75 ? 'Developing' : 'Needs Support';
      csv += `${idx + 1},"${s.name}",${s.gender},${s.las1Score},${s.las2Score},${s.las3Score},${s.las4Score},${s.raw},${s.pct.toFixed(1)}%,${s.transmuted},${status}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DepEd_ILAW_Activity_Checker_${meta.subject.replace(/\s+/g, '_')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Actions */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-0.5 rounded-full bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-200" />
                Auto-Graded Excel Activity Checker
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-800 text-xs font-bold">
                Formula Driven • DO 009 Trimester
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
              {meta.subject} — Class Gradebook &amp; LAS Checker
            </h3>
            <p className="text-xs text-stone-600">
              {meta.gradeAndSection} • {meta.teacher} • {meta.term} • {meta.dates}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadXlsx}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              title="Download real Excel .xlsx file with embedded SUM and PERCENTAGE formulas"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-200" />
              <span>Download Excel (.xlsx)</span>
            </button>

            <button
              onClick={handleDownloadCsv}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition cursor-pointer"
              title="Download comma-separated values (.csv)"
            >
              <Download className="w-3.5 h-3.5 text-stone-600" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>Print Sheet</span>
            </button>

            <button
              onClick={handleResetScores}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs transition cursor-pointer"
              title="Reset to default exemplar class roster"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div className="text-emerald-800 text-[11px] font-semibold">Class Raw Average</div>
            <div className="text-xl font-bold text-emerald-950 mt-0.5">
              {avgScore.toFixed(1)} <span className="text-xs font-normal text-emerald-700">/ {maxTotal}</span>
            </div>
            <div className="text-[10px] text-emerald-700 mt-1">{avgPct.toFixed(1)}% Raw Score</div>
          </div>

          <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200">
            <div className="text-blue-800 text-[11px] font-semibold">Transmuted Average</div>
            <div className="text-xl font-bold text-[#002776] mt-0.5">
              {avgTransmuted}
            </div>
            <div className="text-[10px] text-blue-700 mt-1">DepEd SF9 Equivalent</div>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="text-amber-800 text-[11px] font-semibold">Passing Rate (≥75)</div>
            <div className="text-xl font-bold text-amber-950 mt-0.5">
              {passingRate.toFixed(0)}%
            </div>
            <div className="text-[10px] text-amber-700 mt-1">{passingCount} of {students.length} Passing</div>
          </div>

          <div className="p-3 rounded-2xl bg-stone-100 border border-stone-200">
            <div className="text-stone-700 text-[11px] font-semibold">Activity Weighting</div>
            <div className="text-sm font-bold text-stone-900 mt-1">
              4 LAS • 25 pts each
            </div>
            <div className="text-[10px] text-stone-500 mt-1">Total Max: 100 pts</div>
          </div>
        </div>
      </div>

      {/* Exact Calculations & Excel Formulas Reference Guide Panel */}
      <div className="bg-emerald-50/50 border border-emerald-200 p-5 rounded-3xl space-y-3">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-emerald-700" />
          <span>DepEd Official Excel Calculations &amp; Formulas Guide</span>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          The following standard, exact spreadsheet formulas are integrated into our system and the downloaded <strong className="text-emerald-800">Excel Gradebook (.xlsx)</strong> to calculate scores automatically matching DepEd Orders:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-1 text-[11px]">
          <div className="p-3 bg-white rounded-xl border border-emerald-100 space-y-1">
            <span className="font-bold text-emerald-800 uppercase block">1. Total Score (SUM)</span>
            <code className="text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded font-mono text-[10px] block">
              =SUM(D2, E2, F2, G2)
            </code>
            <p className="text-stone-500 text-[10px] leading-tight">Sums the raw student scores across all four Learning Activity Sheets.</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-emerald-100 space-y-1">
            <span className="font-bold text-emerald-800 uppercase block">2. Score Percentage</span>
            <code className="text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded font-mono text-[10px] block">
              =(H2 / $H$1) * 100
            </code>
            <p className="text-stone-500 text-[10px] leading-tight">Divides the raw total by the absolute maximum total points ($H$1) to calculate percentage.</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-emerald-100 space-y-1">
            <span className="font-bold text-emerald-800 uppercase block">3. Transmuted Grade</span>
            <code className="text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded font-mono text-[10px] block">
              =VLOOKUP(I2, trans_table, 2, TRUE)
            </code>
            <p className="text-stone-500 text-[10px] leading-tight">Retrieves the official equivalent grade from the DepEd Order No. 8, s. 2015 tables.</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-emerald-100 space-y-1">
            <span className="font-bold text-emerald-800 uppercase block">4. Mastery Status (IFs)</span>
            <code className="text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded font-mono text-[10px] block">
              =IF(I2&gt;=85, "Mastered", IF(I2&gt;=75, "Developing", "Needs Support"))
            </code>
            <p className="text-stone-500 text-[10px] leading-tight">Classifies the student’s learning progress directly based on their grade percentage.</p>
          </div>
        </div>
      </div>

      {/* Spreadsheet Table with Search & Add Controls */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 flex-1 min-w-[250px]">
            <div className="font-bold text-stone-800 flex items-center gap-1.5 shrink-0">
              <Calculator className="w-4 h-4 text-emerald-700" />
              <span>Interactive Score Matrix</span>
            </div>
            
            {/* Interactive Search Box */}
            <div className="relative flex-1 max-w-xs">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                <Search className="w-3.5 h-3.5 text-stone-400" />
              </span>
              <input
                type="text"
                placeholder="Search students by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-600 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-stone-400 hover:text-stone-600 text-[10px]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick add student */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Add Learner Name..."
              value={newStudentName}
              onChange={e => setNewStudentName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddStudent()}
              className="p-1.5 px-3 rounded-lg border border-stone-300 text-xs bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            />
            <select
              value={newStudentGender}
              onChange={e => setNewStudentGender(e.target.value as 'M' | 'F')}
              className="p-1.5 rounded-lg border border-stone-300 text-xs bg-white"
            >
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
            <button
              onClick={handleAddStudent}
              className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#002776] text-white uppercase text-[11px] font-bold tracking-wider">
              <tr>
                <th className="p-3 text-center w-12">No.</th>
                <th className="p-3">Learner Name</th>
                <th className="p-3 text-center w-12">Sex</th>
                <th className="p-3 text-center bg-blue-900/60">LAS 1 (25)</th>
                <th className="p-3 text-center bg-blue-900/60">LAS 2 (25)</th>
                <th className="p-3 text-center bg-blue-900/60">LAS 3 (25)</th>
                <th className="p-3 text-center bg-blue-900/60">LAS 4 (25)</th>
                <th className="p-3 text-center bg-emerald-900">Total (100)</th>
                <th className="p-3 text-center bg-emerald-900">Score %</th>
                <th className="p-3 text-center bg-amber-600">Transmuted</th>
                <th className="p-3 text-center">Mastery Status</th>
                <th className="p-3 text-center w-10">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 font-mono">
              {filteredScores.map((st, idx) => {
                const mastery = st.pct >= 85 ? 'Mastered' : st.pct >= 75 ? 'Developing' : 'Needs Support';
                const isPassing = st.transmuted >= 75;

                return (
                  <tr key={st.id} className="hover:bg-blue-50/40 transition">
                    <td className="p-3 text-center text-stone-500 font-sans">{idx + 1}</td>
                    <td className="p-3 font-semibold font-sans text-stone-900 whitespace-nowrap">{st.name}</td>
                    <td className="p-3 text-center font-sans font-bold text-stone-600">{st.gender}</td>

                    {/* Inputs */}
                    <td className="p-2 text-center bg-stone-50">
                      <input
                        type="number"
                        min="0"
                        max="25"
                        value={st.las1Score}
                        onChange={e => handleScoreChange(st.id, 'las1Score', Number(e.target.value))}
                        className="w-12 p-1 text-center font-bold text-stone-800 rounded border border-stone-300 focus:ring-1 focus:ring-emerald-600 bg-white"
                      />
                    </td>
                    <td className="p-2 text-center bg-stone-50">
                      <input
                        type="number"
                        min="0"
                        max="25"
                        value={st.las2Score}
                        onChange={e => handleScoreChange(st.id, 'las2Score', Number(e.target.value))}
                        className="w-12 p-1 text-center font-bold text-stone-800 rounded border border-stone-300 focus:ring-1 focus:ring-emerald-600 bg-white"
                      />
                    </td>
                    <td className="p-2 text-center bg-stone-50">
                      <input
                        type="number"
                        min="0"
                        max="25"
                        value={st.las3Score}
                        onChange={e => handleScoreChange(st.id, 'las3Score', Number(e.target.value))}
                        className="w-12 p-1 text-center font-bold text-stone-800 rounded border border-stone-300 focus:ring-1 focus:ring-emerald-600 bg-white"
                      />
                    </td>
                    <td className="p-2 text-center bg-stone-50">
                      <input
                        type="number"
                        min="0"
                        max="25"
                        value={st.las4Score}
                        onChange={e => handleScoreChange(st.id, 'las4Score', Number(e.target.value))}
                        className="w-12 p-1 text-center font-bold text-stone-800 rounded border border-stone-300 focus:ring-1 focus:ring-emerald-600 bg-white"
                      />
                    </td>

                    {/* Computed Columns */}
                    <td className="p-3 text-center font-bold text-emerald-900 bg-emerald-50/50">
                      {st.raw}
                    </td>
                    <td className="p-3 text-center font-semibold text-emerald-950 bg-emerald-50/50">
                      {st.pct.toFixed(1)}%
                    </td>
                    <td className="p-3 text-center font-bold text-base bg-amber-50">
                      <span className={isPassing ? 'text-[#002776]' : 'text-red-600'}>
                        {st.transmuted}
                      </span>
                    </td>
                    <td className="p-3 text-center font-sans">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          mastery === 'Mastered'
                            ? 'bg-emerald-100 text-emerald-900'
                            : mastery === 'Developing'
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-rose-100 text-rose-900'
                        }`}
                      >
                        {mastery}
                      </span>
                    </td>
                    <td className="p-3 text-center font-sans">
                      <button
                        onClick={() => handleRemoveStudent(st.id)}
                        className="p-1 rounded text-stone-400 hover:text-red-600 transition cursor-pointer"
                        title="Remove student"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-stone-100 text-stone-800 font-bold font-mono border-t-2 border-stone-300">
              <tr>
                <td colSpan={3} className="p-3 text-right uppercase tracking-wider font-sans text-xs">
                  Class Average:
                </td>
                <td className="p-3 text-center">
                  {(students.reduce((a, b) => a + b.las1Score, 0) / (students.length || 1)).toFixed(1)}
                </td>
                <td className="p-3 text-center">
                  {(students.reduce((a, b) => a + b.las2Score, 0) / (students.length || 1)).toFixed(1)}
                </td>
                <td className="p-3 text-center">
                  {(students.reduce((a, b) => a + b.las3Score, 0) / (students.length || 1)).toFixed(1)}
                </td>
                <td className="p-3 text-center">
                  {(students.reduce((a, b) => a + b.las4Score, 0) / (students.length || 1)).toFixed(1)}
                </td>
                <td className="p-3 text-center text-emerald-900 bg-emerald-100/50">
                  {avgScore.toFixed(1)}
                </td>
                <td className="p-3 text-center text-emerald-900 bg-emerald-100/50">
                  {avgPct.toFixed(1)}%
                </td>
                <td className="p-3 text-center text-[#002776] bg-amber-100 text-base">
                  {avgTransmuted}
                </td>
                <td colSpan={2} className="p-3 text-center font-sans text-xs text-stone-600">
                  {passingRate.toFixed(0)}% Class Pass Rate
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
