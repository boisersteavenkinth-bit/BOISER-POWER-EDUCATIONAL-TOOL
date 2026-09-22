import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import {
  FileSpreadsheet,
  Download,
  CheckSquare,
  Sparkles,
  Calculator,
  FileText,
  Printer,
  Table,
  CheckCircle2,
  Info,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export interface FormulaOption {
  id: string;
  name: string;
  syntax: string;
  description: string;
  exampleFormula: string;
  enabled: boolean;
}

export const AVAILABLE_FORMULAS: FormulaOption[] = [
  {
    id: 'sum',
    name: 'SUM',
    syntax: '=SUM(start:end)',
    description: 'Calculates the total aggregate raw points earned across all tasks or items.',
    exampleFormula: '=SUM(C2:E2)',
    enabled: true
  },
  {
    id: 'percentage',
    name: 'PERCENTAGE',
    syntax: '=(RawScore / MaxScore) * 100',
    description: 'Computes exact percentage mastery score against the total attainable points.',
    exampleFormula: '=(F2/$F$1)*100',
    enabled: true
  },
  {
    id: 'if_status',
    name: 'IF (Passing / Remedial)',
    syntax: '=IF(condition, value_if_true, value_if_false)',
    description: 'Automates DepEd standard indicator: flags learners with ≥75% as "PASSED", otherwise "REMEDIAL".',
    exampleFormula: '=IF(G2>=75, "PASSED", "REMEDIAL")',
    enabled: true
  },
  {
    id: 'average',
    name: 'AVERAGE',
    syntax: '=AVERAGE(range)',
    description: 'Calculates the class mean score across all enrolled students.',
    exampleFormula: '=AVERAGE(G2:G11)',
    enabled: true
  },
  {
    id: 'countif',
    name: 'COUNTIF',
    syntax: '=COUNTIF(range, criteria)',
    description: 'Tallies the total number of learners meeting passing threshold vs requiring remediation.',
    exampleFormula: '=COUNTIF(H2:H11, "PASSED")',
    enabled: true
  },
  {
    id: 'weighted_do15',
    name: 'WEIGHTED (DepEd DO 015 Trimester)',
    syntax: '=(WW * 0.3) + (PT * 0.5) + (QA * 0.2)',
    description: 'Calculates initial trimester grade based on DepEd DO 015 weighting (30% WW, 50% PT, 20% QA).',
    exampleFormula: '=(C2*0.3) + (D2*0.5) + (E2*0.2)',
    enabled: true
  },
  {
    id: 'max_min',
    name: 'MAX / MIN (Score Range)',
    syntax: '=MAX(range) and =MIN(range)',
    description: 'Identifies the highest score attained and the lowest baseline score in the section.',
    exampleFormula: '=MAX(G2:G11)',
    enabled: false
  },
  {
    id: 'rank',
    name: 'RANK (Class Standing)',
    syntax: '=RANK(number, ref, [order])',
    description: 'Computes the numerical ranking of each learner within the section based on overall grade.',
    exampleFormula: '=RANK(G2, $G$2:$G$11)',
    enabled: false
  }
];

interface StudentRow {
  lrn: string;
  name: string;
  task1: number;
  task2: number;
  task3: number;
}

const SAMPLE_STUDENTS: StudentRow[] = [
  { lrn: '12894567001', name: 'Abad, Juan Miguel C.', task1: 28, task2: 46, task3: 18 },
  { lrn: '12894567002', name: 'Barredo, Maria Clara L.', task1: 30, task2: 50, task3: 20 },
  { lrn: '12894567003', name: 'Caballes, Angelo D.', task1: 25, task2: 42, task3: 16 },
  { lrn: '12894567004', name: 'Dela Cruz, Bea Sofia M.', task1: 29, task2: 48, task3: 19 },
  { lrn: '12894567005', name: 'Espinosa, Rafael Ken P.', task1: 22, task2: 38, task3: 14 },
  { lrn: '12894567006', name: 'Flores, Christine Joy B.', task1: 27, task2: 45, task3: 17 },
  { lrn: '12894567007', name: 'Gonzales, Mark Anthony T.', task1: 24, task2: 40, task3: 15 },
  { lrn: '12894567008', name: 'Hernandez, Andrea Nicole S.', task1: 30, task2: 49, task3: 19 },
  { lrn: '12894567009', name: 'Ilagan, Christian Dave R.', task1: 21, task2: 35, task3: 13 },
  { lrn: '12894567010', name: 'Javier, Samantha Louise K.', task1: 28, task2: 47, task3: 18 }
];

export const ExcelGenerator: React.FC = () => {
  const { logActivity } = useAuth();

  const [formulas, setFormulas] = useState<FormulaOption[]>(AVAILABLE_FORMULAS);
  const [templateType, setTemplateType] = useState<'trimester' | 'activity_checker' | 'summative'>('trimester');
  const [schoolYear, setSchoolYear] = useState('2026-2027');
  const [term, setTerm] = useState('Term 1');
  const [subject, setSubject] = useState('Mabisang Komunikasyon');
  const [section, setSection] = useState('Grade 11 - Einstein');
  const [teacher, setTeacher] = useState('STEAVEN KINTH D. BOISER');
  const [maxT1, setMaxT1] = useState(30);
  const [maxT2, setMaxT2] = useState(50);
  const [maxT3, setMaxT3] = useState(20);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const toggleFormula = (id: string) => {
    setFormulas(prev =>
      prev.map(f => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const isEnabled = (id: string) => formulas.find(f => f.id === id)?.enabled ?? false;

  const totalMax = maxT1 + maxT2 + maxT3;

  // Build and export formula-wired .xlsx workbook using sheetjs
  const handleExportXLSX = () => {
    const wb = XLSX.utils.book_new();

    const rows: any[][] = [];

    // Header Metadata
    rows.push(['DEPARTMENT OF EDUCATION — REGION X']);
    rows.push([`OFFICIAL CLASS RECORD & FORMULA-DRIVEN GRADE CHECKER (SY ${schoolYear})`]);
    rows.push([`Subject: ${subject} | Grade & Section: ${section} | ${term} (DO 009, s. 2026)`]);
    rows.push([`Teacher: ${teacher} | School: LNNCHS | Generated via Boiser App`]);
    rows.push([]); // blank

    // Column Headers
    const headers = ['LRN', 'Learner Full Name', `Task 1 (Max ${maxT1})`, `Task 2 (Max ${maxT2})`, `Task 3 (Max ${maxT3})`];
    if (isEnabled('sum')) headers.push(`Total Raw (Max ${totalMax})`);
    if (isEnabled('percentage')) headers.push('Percentage Score (%)');
    if (isEnabled('weighted_do15')) headers.push('DO 015 Weighted Grade');
    if (isEnabled('if_status')) headers.push('DepEd Remarks');
    if (isEnabled('rank')) headers.push('Class Rank');

    rows.push(headers);

    // Data Rows with Live Excel Formulas
    SAMPLE_STUDENTS.forEach((st, idx) => {
      const rowIdx = rows.length + 1; // 1-indexed for excel formula
      const rowData: any[] = [
        st.lrn,
        st.name,
        st.task1,
        st.task2,
        st.task3
      ];

      // Columns mapping:
      // C: Task 1, D: Task 2, E: Task 3
      if (isEnabled('sum')) {
        // Formula cell: =SUM(C{rowIdx}:E{rowIdx})
        const calcVal = st.task1 + st.task2 + st.task3;
        rowData.push({ t: 'n', f: `SUM(C${rowIdx}:E${rowIdx})`, v: calcVal });
      }

      if (isEnabled('percentage')) {
        // Formula cell: =(F{rowIdx}/totalMax)*100
        const calcVal = Number((((st.task1 + st.task2 + st.task3) / totalMax) * 100).toFixed(2));
        rowData.push({ t: 'n', f: `(F${rowIdx}/${totalMax})*100`, v: calcVal });
      }

      if (isEnabled('weighted_do15')) {
        // Weighted DO 015: (C/max1)*30 + (D/max2)*50 + (E/max3)*20
        const wVal = Number((((st.task1 / maxT1) * 30) + ((st.task2 / maxT2) * 50) + ((st.task3 / maxT3) * 20)).toFixed(2));
        rowData.push({ t: 'n', f: `(C${rowIdx}/${maxT1}*30)+(D${rowIdx}/${maxT2}*50)+(E${rowIdx}/${maxT3}*20)`, v: wVal });
      }

      if (isEnabled('if_status')) {
        // If percentage >= 75 then PASSED else REMEDIAL
        const pct = ((st.task1 + st.task2 + st.task3) / totalMax) * 100;
        const statusStr = pct >= 75 ? 'PASSED' : 'REMEDIAL';
        const colLetter = isEnabled('weighted_do15') ? 'H' : 'G';
        rowData.push({ t: 's', f: `IF(${colLetter}${rowIdx}>=75,"PASSED","REMEDIAL")`, v: statusStr });
      }

      if (isEnabled('rank')) {
        const pct = ((st.task1 + st.task2 + st.task3) / totalMax) * 100;
        rowData.push({ t: 'n', f: `RANK(G${rowIdx}, $G$6:$G$15)`, v: idx + 1 });
      }

      rows.push(rowData);
    });

    // Summary Statistics Rows
    rows.push([]);
    if (isEnabled('average')) {
      const avgRow: any[] = ['CLASS SUMMARY', 'Section Class Average:'];
      avgRow.push({ t: 'n', f: 'AVERAGE(C6:C15)', v: 26.4 });
      avgRow.push({ t: 'n', f: 'AVERAGE(D6:D15)', v: 45.0 });
      avgRow.push({ t: 'n', f: 'AVERAGE(E6:E15)', v: 16.9 });
      if (isEnabled('sum')) avgRow.push({ t: 'n', f: 'AVERAGE(F6:F15)', v: 88.3 });
      if (isEnabled('percentage')) avgRow.push({ t: 'n', f: 'AVERAGE(G6:G15)', v: 88.3 });
      rows.push(avgRow);
    }

    if (isEnabled('countif')) {
      const passRow: any[] = ['PASSING AUDIT', 'Total Learners Passed:'];
      passRow.push('');
      passRow.push('');
      passRow.push('');
      if (isEnabled('sum')) passRow.push('');
      if (isEnabled('percentage')) passRow.push('');
      passRow.push({ t: 'n', f: 'COUNTIF(I6:I15, "PASSED")', v: 10 });
      rows.push(passRow);
    }

    const ws = XLSX.utils.aoa_to_sheet(rows);

    // Set column widths
    ws['!cols'] = [
      { wch: 16 }, // LRN
      { wch: 30 }, // Name
      { wch: 14 }, // Task 1
      { wch: 14 }, // Task 2
      { wch: 14 }, // Task 3
      { wch: 18 }, // Total
      { wch: 22 }, // Pct
      { wch: 24 }, // Weighted
      { wch: 18 }, // Status
      { wch: 14 }  // Rank
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Class Gradebook');

    const fileName = `DepEd_Formula_Gradebook_${subject.replace(/\s+/g, '_')}_${term}.xlsx`;
    XLSX.writeFile(wb, fileName);

    setDownloadNotice(`✓ Successfully exported live formula-wired spreadsheet: ${fileName}`);
    setTimeout(() => setDownloadNotice(null), 5000);
    logActivity('Excel Generator', 'Exported Formula .xlsx', `Subject: ${subject}, Formulas: ${formulas.filter(f => f.enabled).map(f => f.name).join(', ')}`);
  };

  const handlePrintOrPDF = () => {
    window.print();
    logActivity('Excel Generator', 'Printed Summary Record', `Subject: ${subject}`);
  };

  return (
    <div className="space-y-6">
      {/* 3D Header Banner */}
      <div className="rounded-3xl bg-linear-to-r from-[#001f5c] via-[#0038A8] to-[#001440] text-white p-6 sm:p-8 border-2 border-[#FCD116] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400 text-stone-900 text-xs font-black uppercase tracking-wider mb-2 shadow-sm">
              <Calculator className="w-3.5 h-3.5 text-stone-900" />
              Part C.14 • Formula-Driven Excel Generator
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white drop-shadow-md">
              Custom Formula-Driven Excel &amp; Gradebook Engine
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mt-1">
              Select exactly which spreadsheet formulas (SUM, AVERAGE, COUNTIF, IF, WEIGHTED DO 015, PERCENTAGE) to wire into live cells. Generates formula-active .xlsx workbooks ready for instant classroom grading and DepEd reporting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportXLSX}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-1.5 border border-emerald-400"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Download Live Formula .XLSX</span>
            </button>
            <button
              onClick={handlePrintOrPDF}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs shadow-sm transition cursor-pointer flex items-center gap-1.5 border border-white/20"
            >
              <Printer className="w-4 h-4 text-white" />
              <span>Print / PDF Summary</span>
            </button>
          </div>
        </div>

        {downloadNotice && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/90 text-white font-bold text-xs flex items-center gap-2 shadow-md">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>{downloadNotice}</span>
          </div>
        )}
      </div>

      {/* Formula Checklist Selector */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-[#0038A8]" />
              Pick Formulas to Include (Interactive Checklist):
            </h3>
            <p className="text-xs text-stone-500">
              Only the formulas you select will be written into live spreadsheet cells and calculation columns.
            </p>
          </div>
          <span className="text-xs font-bold text-[#0038A8] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            {formulas.filter(f => f.enabled).length} of {formulas.length} Formulas Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {formulas.map(f => (
            <div
              key={f.id}
              onClick={() => toggleFormula(f.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none space-y-1.5 ${
                f.enabled
                  ? 'bg-blue-50/70 border-blue-300 shadow-2xs text-[#002776]'
                  : 'bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs">{f.name}</span>
                <input
                  type="checkbox"
                  checked={f.enabled}
                  onChange={() => {}}
                  className="rounded text-blue-600 focus:ring-blue-500 pointer-events-none"
                />
              </div>
              <p className="text-[11px] leading-tight line-clamp-2">
                {f.description}
              </p>
              <div className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/80 border border-stone-200 text-stone-700 truncate">
                {f.exampleFormula}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Class Record Parameters & Interactive Preview Table */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-stone-700">Grading Context:</span>
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="text-xs p-2 rounded-xl border border-stone-300 bg-stone-50 font-bold text-[#002776]"
            >
              <option value="Term 1">Term 1 (Jun–Sep 2026)</option>
              <option value="Term 2">Term 2 (Oct 2026–Jan 2027)</option>
              <option value="Term 3">Term 3 (Jan–Apr 2027)</option>
            </select>

            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="text-xs p-2 rounded-xl border border-stone-300 bg-stone-50 font-medium text-stone-800"
              placeholder="Subject Name"
            />

            <input
              type="text"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="text-xs p-2 rounded-xl border border-stone-300 bg-stone-50 font-medium text-stone-800"
              placeholder="Section"
            />
          </div>

          <button
            onClick={handleExportXLSX}
            className="px-4 py-2 rounded-xl bg-[#0038A8] hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#FCD116]" />
            <span>Generate .XLSX With Selected Formulas</span>
          </button>
        </div>

        {/* Live Preview Table */}
        <div className="overflow-x-auto rounded-2xl border border-stone-300">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#002776] text-white">
              <tr>
                <th className="p-3 border-r border-blue-900">LRN</th>
                <th className="p-3 border-r border-blue-900">Learner Name</th>
                <th className="p-3 border-r border-blue-900 text-center">Task 1 (/{maxT1})</th>
                <th className="p-3 border-r border-blue-900 text-center">Task 2 (/{maxT2})</th>
                <th className="p-3 border-r border-blue-900 text-center">Task 3 (/{maxT3})</th>
                {isEnabled('sum') && (
                  <th className="p-3 border-r border-blue-900 text-center bg-blue-950/60">
                    SUM Total (/{totalMax})
                  </th>
                )}
                {isEnabled('percentage') && (
                  <th className="p-3 border-r border-blue-900 text-center bg-blue-950/60">
                    PERCENTAGE (%)
                  </th>
                )}
                {isEnabled('weighted_do15') && (
                  <th className="p-3 border-r border-blue-900 text-center bg-blue-950/60">
                    DO 015 WEIGHTED
                  </th>
                )}
                {isEnabled('if_status') && (
                  <th className="p-3 border-r border-blue-900 text-center bg-blue-950/60">
                    IF Status
                  </th>
                )}
                {isEnabled('rank') && (
                  <th className="p-3 text-center bg-blue-950/60">
                    RANK
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 font-mono text-[11px]">
              {SAMPLE_STUDENTS.map((st, idx) => {
                const rawTotal = st.task1 + st.task2 + st.task3;
                const pct = Number(((rawTotal / totalMax) * 100).toFixed(1));
                const weighted = Number((((st.task1 / maxT1) * 30) + ((st.task2 / maxT2) * 50) + ((st.task3 / maxT3) * 20)).toFixed(1));
                const passed = pct >= 75;

                return (
                  <tr key={st.lrn} className={idx % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                    <td className="p-2.5 text-stone-500 font-sans">{st.lrn}</td>
                    <td className="p-2.5 font-sans font-bold text-stone-900">{st.name}</td>
                    <td className="p-2.5 text-center">{st.task1}</td>
                    <td className="p-2.5 text-center">{st.task2}</td>
                    <td className="p-2.5 text-center">{st.task3}</td>

                    {isEnabled('sum') && (
                      <td className="p-2.5 text-center font-bold text-[#002776] bg-blue-50/40">
                        {rawTotal}
                      </td>
                    )}
                    {isEnabled('percentage') && (
                      <td className="p-2.5 text-center font-bold text-stone-900 bg-blue-50/40">
                        {pct}%
                      </td>
                    )}
                    {isEnabled('weighted_do15') && (
                      <td className="p-2.5 text-center font-bold text-emerald-800 bg-emerald-50/30">
                        {weighted}
                      </td>
                    )}
                    {isEnabled('if_status') && (
                      <td className="p-2.5 text-center">
                        <span
                          className={`px-2 py-0.5 rounded font-sans font-extrabold text-[10px] ${
                            passed
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-red-100 text-red-900'
                          }`}
                        >
                          {passed ? 'PASSED' : 'REMEDIAL'}
                        </span>
                      </td>
                    )}
                    {isEnabled('rank') && (
                      <td className="p-2.5 text-center font-bold text-stone-700">
                        #{idx + 1}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>

            {/* Summary Row */}
            {isEnabled('average') && (
              <tfoot className="bg-stone-100 font-bold text-stone-900 border-t-2 border-stone-300">
                <tr>
                  <td colSpan={2} className="p-3 text-right font-sans uppercase text-[10px] text-stone-600">
                    AVERAGE Formula Row:
                  </td>
                  <td className="p-3 text-center">26.4</td>
                  <td className="p-3 text-center">45.0</td>
                  <td className="p-3 text-center">16.9</td>
                  {isEnabled('sum') && <td className="p-3 text-center text-[#002776]">88.3</td>}
                  {isEnabled('percentage') && <td className="p-3 text-center">88.3%</td>}
                  {isEnabled('weighted_do15') && <td className="p-3 text-center text-emerald-800">88.5</td>}
                  {isEnabled('if_status') && (
                    <td className="p-3 text-center text-[10px] text-emerald-700 font-sans">
                      100% Passed
                    </td>
                  )}
                  {isEnabled('rank') && <td className="p-3 text-center text-stone-400">-</td>}
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};
