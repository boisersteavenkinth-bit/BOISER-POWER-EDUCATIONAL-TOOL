import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  School,
  FileSpreadsheet,
  CheckCircle2,
  Sliders,
  RefreshCw,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  Info
} from 'lucide-react';

interface BlankTemplateConfig {
  schoolId: string;
  schoolName: string;
  division: string;
  region: string;
  schoolYear: string;
  gradeLevel: string;
  section: string;
  trackStrand: string;
  adviser: string;
  principal: string;
  rowCount: number;
}

export const LNNCHSBlankTemplatesModule: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<string>('SF1');
  const [config, setConfig] = useState<BlankTemplateConfig>({
    schoolId: '304005',
    schoolName: 'Lanao del Norte National Comprehensive High School (LNNCHS)',
    division: 'Division of Lanao del Norte',
    region: 'Region X (Northern Mindanao)',
    schoolYear: '2026-2027',
    gradeLevel: 'Grade 7',
    section: 'STE 7-A (Curie)',
    trackStrand: 'Science, Technology & Engineering (STE)',
    adviser: 'Dr. Sheila Marie C. Datu',
    principal: 'Anisah A. Sinal (Secondary School Principal IV)',
    rowCount: 25
  });

  const formsList = [
    { id: 'SF1', name: 'School Form 1 (SF1)', title: 'School Register (Master Demographics)', desc: 'Official student demographic register with blank LRN, name, birthdate, and parent guardian rows.' },
    { id: 'SF2', name: 'School Form 2 (SF2)', title: 'Daily Attendance Report of Learners', desc: 'Monthly attendance tracker with blank daily tick-boxes (1-31) and summary totals.' },
    { id: 'SF3', name: 'School Form 3 (SF3)', title: 'Books & Learning Resource Record', desc: 'Textbook inventory and LMS distribution log for subject learning modules.' },
    { id: 'SF4', name: 'School Form 4 (SF4)', title: 'Monthly Learner Movement & Attendance', desc: 'Section-level summary of dropped out, transferred in/out, and actively attending learners.' },
    { id: 'SF5', name: 'School Form 5 (SF5)', title: 'Report on Promotion & Learning Progress', desc: 'Official end-of-year promotion manifest with General Average, Action Taken, and DO 3, s. 2026 descriptors.' },
    { id: 'SF6', name: 'School Form 6 (SF6)', title: 'Summarized Report on Promotion and Level of Progress', desc: 'Consolidated school-wide promotion matrix by grade level, curriculum, and sex.' },
    { id: 'SF7', name: 'School Form 7 (SF7)', title: 'School Personnel Assignment List & Basic Profile', desc: 'Faculty teaching loads, educational attainment, plantilla items, and advisory assignments.' },
    { id: 'SF8', name: 'School Form 8 (SF8)', title: 'Learner Basic Health and Nutritional Status', desc: 'Baseline and endline BMI, height, weight, and nutritional classification form.' },
    { id: 'SF9', name: 'School Form 9 (SF9)', title: 'Learner Progress Report Card (Form 138)', desc: 'Official 3-Term quarterly report card with learning areas, attendance, and core values.' },
    { id: 'SF10', name: 'School Form 10 (SF10)', title: 'Learner Permanent Academic Record (Form 137)', desc: 'Complete multi-year permanent transcript of scholastic records and certification.' },
    { id: 'ECR_BLANK', name: 'Blank ECR (Electronic Class Record)', title: 'DepEd 3-Term Electronic Class Record', desc: 'Standard numerical grade sheet with Term 1, Term 2, Term 3 quarterly scores and final rating columns.' }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCSV = () => {
    let headers: string[] = [];
    let rows: string[][] = [];

    if (selectedForm === 'SF1') {
      headers = ['No.', 'LRN (12-Digit)', 'Learner Last Name', 'First Name', 'M.I.', 'Sex (M/F)', 'Birthdate (YYYY-MM-DD)', 'Age', 'Mother Tongue', 'Complete Address', 'Parent / Guardian', 'Contact Number'];
      for (let i = 1; i <= config.rowCount; i++) {
        rows.push([String(i), '', '', '', '', '', '', '', '', '', '', '']);
      }
    } else if (selectedForm === 'SF2') {
      headers = ['No.', 'LRN', 'Learner Full Name', 'Sex', ...Array.from({ length: 25 }, (_, idx) => `Day ${idx + 1}`), 'Total Present', 'Total Absent', 'Remarks'];
      for (let i = 1; i <= config.rowCount; i++) {
        rows.push([String(i), '', '', '', ...Array(25).fill(''), '', '', '']);
      }
    } else if (selectedForm === 'SF5') {
      headers = ['No.', 'LRN', 'Learner Full Name (Last, First, MI)', 'Sex', 'General Average', 'Action Taken (Promoted/Conditional/Retained)', 'Qualitative Descriptor', 'Incomplete Subjects'];
      for (let i = 1; i <= config.rowCount; i++) {
        rows.push([String(i), '', '', '', '', '', '', '']);
      }
    } else {
      headers = ['No.', 'LRN', 'Learner Name', 'Sex', 'Term 1', 'Term 2', 'Term 3', 'Final Rating', 'Remarks'];
      for (let i = 1; i <= config.rowCount; i++) {
        rows.push([String(i), '', '', '', '', '', '', '', '']);
      }
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LNNCHS_Blank_${selectedForm}_Template_${config.schoolYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-xl overflow-hidden space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#092B62] via-[#0E3C84] to-[#1E4E9E] p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-400 text-blue-950 font-black text-xs rounded-full uppercase tracking-wider">
                Official Blank DepEd Templates (SF1–SF10)
              </span>
              <span className="px-3 py-1 bg-blue-800 text-blue-100 font-bold text-xs rounded-full border border-blue-600/50">
                Pristine Print &amp; Excel Fillable Formats
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <FileSpreadsheet className="w-8 h-8 text-amber-300" />
              <span>Blank School Forms (SF1–SF10) &amp; ECR Master Sheets</span>
            </h2>
            <p className="text-blue-100 text-sm max-w-3xl leading-relaxed">
              Generate formatted, empty official DepEd Region X / LNNCHS School Forms for manual encoding, printed distribution, offline teacher ledgers, or clean Excel/PDF templates.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-white text-blue-950 hover:bg-stone-100 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md transition cursor-pointer"
            >
              <Printer className="w-4 h-4 text-blue-700" />
              <span>Print Blank Form</span>
            </button>
            <button
              onClick={handleDownloadCSV}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Blank CSV</span>
            </button>
          </div>
        </div>

        {/* Template Selector Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 mt-6 scrollbar-thin">
          {formsList.map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedForm(f.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                selectedForm === f.id
                  ? 'bg-amber-400 text-blue-950 shadow-md ring-2 ring-white'
                  : 'bg-blue-950/60 text-blue-200 hover:bg-blue-900/60 border border-blue-800/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{f.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Template Controls & Config Box */}
        <div className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <h3 className="text-xs font-black text-stone-800 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-700" />
              <span>Blank Template Header &amp; Row Customizer</span>
            </h3>
            <span className="text-[11px] text-stone-500 font-medium">
              Changes reflect immediately on the blank preview table below
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-stone-600 font-bold mb-1">School Year:</label>
              <input
                type="text"
                value={config.schoolYear}
                onChange={e => setConfig({ ...config, schoolYear: e.target.value })}
                className="w-full p-2 bg-white border border-stone-300 rounded-lg font-bold text-stone-900"
              />
            </div>
            <div>
              <label className="block text-stone-600 font-bold mb-1">Grade Level:</label>
              <select
                value={config.gradeLevel}
                onChange={e => setConfig({ ...config, gradeLevel: e.target.value })}
                className="w-full p-2 bg-white border border-stone-300 rounded-lg font-bold text-stone-900"
              >
                {['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-stone-600 font-bold mb-1">Section Name:</label>
              <input
                type="text"
                value={config.section}
                onChange={e => setConfig({ ...config, section: e.target.value })}
                className="w-full p-2 bg-white border border-stone-300 rounded-lg font-bold text-stone-900"
              />
            </div>
            <div>
              <label className="block text-stone-600 font-bold mb-1">Blank Rows to Generate:</label>
              <select
                value={config.rowCount}
                onChange={e => setConfig({ ...config, rowCount: Number(e.target.value) })}
                className="w-full p-2 bg-white border border-stone-300 rounded-lg font-bold text-stone-900"
              >
                <option value={15}>15 Blank Rows</option>
                <option value={20}>20 Blank Rows</option>
                <option value={25}>25 Blank Rows (Standard Section)</option>
                <option value={35}>35 Blank Rows</option>
                <option value={45}>45 Blank Rows (Full Class)</option>
                <option value={50}>50 Blank Rows</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-600 font-bold mb-1">Class Adviser:</label>
              <input
                type="text"
                value={config.adviser}
                onChange={e => setConfig({ ...config, adviser: e.target.value })}
                className="w-full p-2 bg-white border border-stone-300 rounded-lg font-bold text-stone-900"
              />
            </div>
            <div>
              <label className="block text-stone-600 font-bold mb-1">School Principal / Head:</label>
              <input
                type="text"
                value={config.principal}
                onChange={e => setConfig({ ...config, principal: e.target.value })}
                className="w-full p-2 bg-white border border-stone-300 rounded-lg font-bold text-stone-900"
              />
            </div>
            <div>
              <label className="block text-stone-600 font-bold mb-1">Track / Strand (for SHS):</label>
              <input
                type="text"
                value={config.trackStrand}
                onChange={e => setConfig({ ...config, trackStrand: e.target.value })}
                className="w-full p-2 bg-white border border-stone-300 rounded-lg font-bold text-stone-900"
              />
            </div>
            <div>
              <label className="block text-stone-600 font-bold mb-1">School ID:</label>
              <input
                type="text"
                value={config.schoolId}
                onChange={e => setConfig({ ...config, schoolId: e.target.value })}
                className="w-full p-2 bg-white border border-stone-300 rounded-lg font-bold text-stone-900"
              />
            </div>
          </div>
        </div>

        {/* ================= BLANK FORM DISPLAY CONTAINER ================= */}
        <div className="bg-white border-2 border-stone-400 rounded-2xl p-6 sm:p-8 space-y-6 shadow-md print:border-none print:shadow-none print:p-0">
          {/* Official DepEd Header */}
          <div className="text-center space-y-1 border-b-2 border-stone-900 pb-4">
            <div className="text-[10px] uppercase font-bold tracking-widest text-stone-600">
              Republic of the Philippines • Department of Education
            </div>
            <div className="text-xs font-bold text-stone-800">{config.region} • {config.division}</div>
            <h1 className="text-base sm:text-lg font-black text-stone-950 uppercase tracking-wide">
              {config.schoolName}
            </h1>
            <div className="text-xs font-mono font-bold text-blue-900">
              School ID: {config.schoolId} • School Year: {config.schoolYear}
            </div>
            <div className="inline-block mt-2 px-4 py-1 bg-stone-100 border border-stone-300 rounded-md font-black text-sm text-stone-900">
              {formsList.find(f => f.id === selectedForm)?.name}: {formsList.find(f => f.id === selectedForm)?.title}
            </div>
          </div>

          {/* Metadata Sub-Header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-stone-50 p-3 rounded-lg border border-stone-200 font-medium">
            <div><strong>Grade Level:</strong> {config.gradeLevel}</div>
            <div><strong>Section:</strong> {config.section}</div>
            <div><strong>Track/Strand:</strong> {config.trackStrand}</div>
            <div><strong>Class Adviser:</strong> {config.adviser}</div>
          </div>

          {/* ================= BLANK TABLES BASED ON SELECTED FORM ================= */}
          {selectedForm === 'SF1' && (
            <div className="overflow-x-auto border border-stone-300 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#092B62] text-white font-bold text-[11px]">
                  <tr>
                    <th className="p-2 border border-blue-900 text-center w-10">#</th>
                    <th className="p-2 border border-blue-900 w-32">LRN (12-Digit)</th>
                    <th className="p-2 border border-blue-900 w-44">Learner Last Name</th>
                    <th className="p-2 border border-blue-900 w-44">First Name</th>
                    <th className="p-2 border border-blue-900 text-center w-12">M.I.</th>
                    <th className="p-2 border border-blue-900 text-center w-12">Sex</th>
                    <th className="p-2 border border-blue-900 text-center w-28">Birth Date</th>
                    <th className="p-2 border border-blue-900 text-center w-12">Age</th>
                    <th className="p-2 border border-blue-900 w-28">Mother Tongue</th>
                    <th className="p-2 border border-blue-900">Complete Address (Barangay/Mun/Prov)</th>
                    <th className="p-2 border border-blue-900 w-40">Parent / Guardian</th>
                    <th className="p-2 border border-blue-900 w-28">Contact No.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-300 font-mono">
                  {Array.from({ length: config.rowCount }).map((_, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}>
                      <td className="p-2.5 border border-stone-200 text-center text-stone-400 font-sans text-[11px]">{i + 1}</td>
                      <td className="p-2.5 border border-stone-200 h-8"></td>
                      <td className="p-2.5 border border-stone-200"></td>
                      <td className="p-2.5 border border-stone-200"></td>
                      <td className="p-2.5 border border-stone-200 text-center"></td>
                      <td className="p-2.5 border border-stone-200 text-center"></td>
                      <td className="p-2.5 border border-stone-200 text-center"></td>
                      <td className="p-2.5 border border-stone-200 text-center"></td>
                      <td className="p-2.5 border border-stone-200"></td>
                      <td className="p-2.5 border border-stone-200"></td>
                      <td className="p-2.5 border border-stone-200"></td>
                      <td className="p-2.5 border border-stone-200"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedForm === 'SF2' && (
            <div className="overflow-x-auto border border-stone-300 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#092B62] text-white font-bold text-[10px]">
                  <tr>
                    <th className="p-2 border border-blue-900 text-center w-8" rowSpan={2}>#</th>
                    <th className="p-2 border border-blue-900 w-28" rowSpan={2}>LRN</th>
                    <th className="p-2 border border-blue-900 w-44" rowSpan={2}>Learner Full Name</th>
                    <th className="p-2 border border-blue-900 text-center w-10" rowSpan={2}>Sex</th>
                    <th className="p-1 border border-blue-900 text-center" colSpan={20}>Daily Attendance Tick Sheet (Days of Month)</th>
                    <th className="p-2 border border-blue-900 text-center w-12" rowSpan={2}>Total Present</th>
                    <th className="p-2 border border-blue-900 text-center w-12" rowSpan={2}>Total Absent</th>
                    <th className="p-2 border border-blue-900 w-28" rowSpan={2}>Remarks</th>
                  </tr>
                  <tr className="bg-blue-950 text-white">
                    {Array.from({ length: 20 }).map((_, d) => (
                      <th key={d} className="p-1 border border-blue-800 text-center w-6">{d + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-300">
                  {Array.from({ length: config.rowCount }).map((_, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}>
                      <td className="p-2 border border-stone-200 text-center text-stone-400 font-mono">{i + 1}</td>
                      <td className="p-2 border border-stone-200 h-7"></td>
                      <td className="p-2 border border-stone-200"></td>
                      <td className="p-2 border border-stone-200 text-center"></td>
                      {Array.from({ length: 20 }).map((_, d) => (
                        <td key={d} className="p-1 border border-stone-200 text-center"></td>
                      ))}
                      <td className="p-2 border border-stone-200 text-center"></td>
                      <td className="p-2 border border-stone-200 text-center"></td>
                      <td className="p-2 border border-stone-200"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedForm === 'SF5' && (
            <div className="overflow-x-auto border border-stone-300 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#092B62] text-white font-bold text-[11px]">
                  <tr>
                    <th className="p-2 border border-blue-900 text-center w-10">#</th>
                    <th className="p-2 border border-blue-900 w-32">LRN (12-Digit)</th>
                    <th className="p-2 border border-blue-900 w-56">Learner Name (Last, First, MI)</th>
                    <th className="p-2 border border-blue-900 text-center w-12">Sex</th>
                    <th className="p-2 border border-blue-900 text-center w-24">General Average</th>
                    <th className="p-2 border border-blue-900 text-center w-36">Action Taken (Promoted / Cond / Ret)</th>
                    <th className="p-2 border border-blue-900 text-center w-48">DO 3, s. 2026 Descriptor</th>
                    <th className="p-2 border border-blue-900">Incomplete / Remedial Subjects</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-300">
                  {Array.from({ length: config.rowCount }).map((_, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}>
                      <td className="p-2.5 border border-stone-200 text-center text-stone-400 font-mono">{i + 1}</td>
                      <td className="p-2.5 border border-stone-200 h-8"></td>
                      <td className="p-2.5 border border-stone-200"></td>
                      <td className="p-2.5 border border-stone-200 text-center"></td>
                      <td className="p-2.5 border border-stone-200 text-center"></td>
                      <td className="p-2.5 border border-stone-200 text-center"></td>
                      <td className="p-2.5 border border-stone-200 text-center"></td>
                      <td className="p-2.5 border border-stone-200"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {(selectedForm === 'SF3' || selectedForm === 'SF4' || selectedForm === 'SF6' || selectedForm === 'SF7' || selectedForm === 'SF8' || selectedForm === 'SF9' || selectedForm === 'SF10' || selectedForm === 'ECR_BLANK') && (
            <div className="overflow-x-auto border border-stone-300 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#092B62] text-white font-bold text-[11px]">
                  <tr>
                    <th className="p-2 border border-blue-900 text-center w-10">#</th>
                    <th className="p-2 border border-blue-900 w-32">LRN / Code</th>
                    <th className="p-2 border border-blue-900 w-52">Learner / Personnel Full Name</th>
                    <th className="p-2 border border-blue-900 text-center w-12">Sex</th>
                    <th className="p-2 border border-blue-900 text-center w-24">Term 1 (Q1)</th>
                    <th className="p-2 border border-blue-900 text-center w-24">Term 2 (Q2)</th>
                    <th className="p-2 border border-blue-900 text-center w-24">Term 3 (Q3)</th>
                    <th className="p-2 border border-blue-900 text-center w-28">Final Average</th>
                    <th className="p-2 border border-blue-900">Official Status / Signature / Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-300">
                  {Array.from({ length: config.rowCount }).map((_, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}>
                      <td className="p-2.5 border border-stone-200 text-center text-stone-400 font-mono">{i + 1}</td>
                      <td className="p-2.5 border border-stone-200 h-8"></td>
                      <td className="p-2.5 border border-stone-200"></td>
                      <td className="p-2.5 border border-stone-200 text-center"></td>
                      <td className="p-2.5 border border-stone-200 text-center"></td>
                      <td className="p-2.5 border border-stone-200 text-center"></td>
                      <td className="p-2.5 border border-stone-200 text-center"></td>
                      <td className="p-2.5 border border-stone-200 text-center"></td>
                      <td className="p-2.5 border border-stone-200"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Official Signatures Block */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t-2 border-stone-300 text-xs text-center font-bold">
            <div className="space-y-6">
              <div className="text-stone-500 text-[11px]">Prepared by:</div>
              <div className="border-b border-stone-900 pb-1 font-black text-stone-950 uppercase">{config.adviser}</div>
              <div className="text-stone-600 text-[10px]">Class Adviser / Signature Over Printed Name</div>
            </div>
            <div className="space-y-6">
              <div className="text-stone-500 text-[11px]">Certified Correct:</div>
              <div className="border-b border-stone-900 pb-1 font-black text-stone-950 uppercase">{config.principal}</div>
              <div className="text-stone-600 text-[10px]">Secondary School Principal IV / School Head</div>
            </div>
            <div className="space-y-6">
              <div className="text-stone-500 text-[11px]">Reviewed &amp; Validated:</div>
              <div className="border-b border-stone-900 pb-1 font-black text-stone-950 uppercase">Division Checking Committee</div>
              <div className="text-stone-600 text-[10px]">DepEd Division of Lanao del Norte</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
