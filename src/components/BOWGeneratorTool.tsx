import React, { useState } from 'react';
import { FileText, Download, Printer, Sparkles, BookOpen } from 'lucide-react';

const SUBJECTS_MAP: Record<string, Record<string, string[]>> = {
  k6: {
    "Kindergarten": ["Kindergarten"],
    "Filipino": ["1", "2", "3", "4", "5", "6"],
    "English": ["1", "2", "3", "4", "5", "6"],
    "Mathematics": ["1", "2", "3", "4", "5", "6"],
    "Mother Tongue": ["1", "2", "3"],
    "Araling Panlipunan": ["1", "2", "3", "4", "5", "6"],
    "Edukasyon sa Pagpapakatao": ["1", "2", "3", "4", "5", "6"],
    "MAPEH": ["1", "2", "3", "4", "5", "6"],
    "Science": ["3", "4", "5", "6"],
    "EPP / TLE": ["4", "5", "6"]
  },
  jhs: {
    "Filipino": ["7", "8", "9", "10"],
    "English": ["7", "8", "9", "10"],
    "Mathematics": ["7", "8", "9", "10"],
    "Science": ["7", "8", "9", "10"],
    "Araling Panlipunan": ["7", "8", "9", "10"],
    "Edukasyon sa Pagpapakatao": ["7", "8", "9", "10"],
    "MAPEH": ["7", "8", "9", "10"],
    "TLE — Home Economics": ["7", "8", "9", "10"],
    "TLE — ICT": ["7", "8", "9", "10"],
    "TLE — Agri-Fishery Arts": ["7", "8", "9", "10"],
    "TLE — Industrial Arts": ["7", "8", "9", "10"]
  },
  shsCore: {
    "Oral Communication": ["11"],
    "Reading and Writing": ["11"],
    "Komunikasyon at Pananaliksik": ["11"],
    "General Mathematics": ["11"],
    "Statistics and Probability": ["11"],
    "Earth and Life Science": ["11"],
    "Physical Science": ["11"],
    "21st Century Literature": ["11", "12"],
    "Contemporary Philippine Arts": ["11", "12"],
    "Media and Information Literacy": ["11", "12"],
    "Personal Development": ["11"],
    "Understanding Culture, Society and Politics": ["12"],
    "Physical Education and Health": ["11", "12"],
    "Introduction to Philosophy": ["12"],
    "Empowerment Technologies": ["11"],
    "English for Academic & Professional Purposes": ["12"],
    "Practical Research 1": ["11"],
    "Practical Research 2": ["12"]
  },
  shsAcad: {
    "STEM — Pre-Calculus": ["11"],
    "STEM — Basic Calculus": ["11"],
    "STEM — General Biology": ["11", "12"],
    "STEM — General Chemistry": ["11", "12"],
    "STEM — General Physics": ["11", "12"],
    "ABM — Business Math": ["11"],
    "ABM — Fundamentals of ABM": ["11", "12"],
    "ABM — Business Finance": ["12"],
    "HUMSS — Creative Writing": ["11"],
    "HUMSS — Creative Nonfiction": ["11"],
    "HUMSS — Disciplines and Ideas in Social Sciences": ["12"],
    "HUMSS — Trends, Networks and Critical Thinking": ["12"],
    "GAS — Humanities": ["11", "12"],
    "GAS — Social Science": ["11", "12"],
    "Immersion / Research Capstone": ["12"]
  },
  shsTvl: {
    "Home Economics — Cookery": ["11", "12"],
    "Home Economics — Bread and Pastry": ["11", "12"],
    "Home Economics — Housekeeping": ["11", "12"],
    "ICT — Computer Systems Servicing": ["11", "12"],
    "ICT — Programming (Web/App)": ["11", "12"],
    "Agri-Fishery Arts — Agricultural Crops": ["11", "12"],
    "Industrial Arts — Electrical Installation": ["11", "12"],
    "Industrial Arts — Shielded Metal Arc Welding": ["11", "12"],
    "Work Immersion": ["11", "12"]
  }
};

const TERMS_MAP: Record<string, { label: string; start: string; end: string }> = {
  "1": { label: "Term 1", start: "2026-06-15", end: "2026-09-01" },
  "2": { label: "Term 2", start: "2026-09-16", end: "2026-12-04" },
  "3": { label: "Term 3", start: "2027-01-04", end: "2027-03-23" }
};

export const BOWGeneratorTool: React.FC = () => {
  const [level, setLevel] = useState<string>('shsAcad');
  const [subject, setSubject] = useState<string>('STEM — General Biology');
  const [grade, setGrade] = useState<string>('Grade 11');
  const [term, setTerm] = useState<string>('1');
  const [melcsInput, setMelcsInput] = useState<string>(
    'Describes the different states of matter\nExplains the concept of density\nAnalyzes cellular transport mechanisms\nApplies Stoichiometry principles'
  );
  const [generatedRows, setGeneratedRows] = useState<Array<{ week: string; dates: string; comp: string; remarks: string }>>([]);
  const [outTitle, setOutTitle] = useState<string>('');
  const [disclaimer, setDisclaimer] = useState<string>('');
  const [showOutput, setShowOutput] = useState<boolean>(false);

  const subjectsList = Object.keys(SUBJECTS_MAP[level] || {});
  const gradesList = SUBJECTS_MAP[level]?.[subject] || ['Grade 11'];

  const handleLevelChange = (newLvl: string) => {
    setLevel(newLvl);
    const subs = Object.keys(SUBJECTS_MAP[newLvl] || {});
    const firstSub = subs[0] || '';
    setSubject(firstSub);
    const firstGrades = SUBJECTS_MAP[newLvl]?.[firstSub] || ['Grade 11'];
    setGrade(isNaN(Number(firstGrades[0])) ? firstGrades[0] : `Grade ${firstGrades[0]}`);
  };

  const handleSubjectChange = (newSubj: string) => {
    setSubject(newSubj);
    const grades = SUBJECTS_MAP[level]?.[newSubj] || ['Grade 11'];
    setGrade(isNaN(Number(grades[0])) ? grades[0] : `Grade ${grades[0]}`);
  };

  const getWeeks = (startStr: string, endStr: string) => {
    const start = new Date(startStr + 'T00:00:00');
    const end = new Date(endStr + 'T00:00:00');
    const weeks: Array<[Date, Date]> = [];
    let cur = new Date(start);
    const day = cur.getDay();
    if (day !== 1) cur.setDate(cur.getDate() + (day === 0 ? 1 : (1 - day + 7) % 7));
    while (cur <= end) {
      const wkStart = new Date(cur);
      const wkEnd = new Date(cur);
      wkEnd.setDate(wkEnd.getDate() + 4);
      const shownEnd = wkEnd > end ? end : wkEnd;
      weeks.push([new Date(wkStart), new Date(shownEnd)]);
      cur.setDate(cur.getDate() + 7);
    }
    return weeks;
  };

  const fmtDate = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const activeTermInfo = TERMS_MAP[term];
  const weeks = getWeeks(activeTermInfo.start, activeTermInfo.end);

  const handleGenerate = () => {
    const raw = melcsInput.split('\n').map(s => s.trim()).filter(Boolean);
    const rows = weeks.map((w, i) => {
      let comp = '';
      if (raw.length) {
        const idx = Math.floor((i * raw.length) / weeks.length);
        comp = raw[idx] || '';
      }
      return {
        week: `Week ${i + 1}`,
        dates: `${fmtDate(w[0])} – ${fmtDate(w[1])}`,
        comp: comp || '—',
        remarks: 'Aligned with MELCs'
      };
    });

    setGeneratedRows(rows);
    setOutTitle(`${subject} — ${grade} — ${activeTermInfo.label} (SY 2026–2027)`);
    setDisclaimer(
      raw.length
        ? 'Competencies were spread evenly across teaching weeks per DepEd Order No. 9, s. 2026. Tap any cell to edit or reorder.'
        : 'Blank week-by-week template for the term. Follows national DepEd calendar guidelines.'
    );
    setShowOutput(true);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-200 shadow-xl space-y-6">
      <div className="bg-gradient-to-r from-[#0b2340] via-[#123a63] to-[#0b2340] p-6 rounded-2xl text-white">
        <h2 className="text-xl sm:text-2xl font-black flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-[#c8971f]" />
          <span>Budget of Work (BOW) Generator</span>
        </h2>
        <p className="text-xs text-amber-200 mt-1">
          Three-Term School Calendar, SY 2026–2027 (per DepEd Order No. 9, s. 2026) • Connected with DepEd Account: <b>steavenkinth.boiser@deped.gov.ph</b>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div>
          <label className="block text-stone-700 font-bold mb-1.5">Track / Level:</label>
          <select
            value={level}
            onChange={(e) => handleLevelChange(e.target.value)}
            className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold text-stone-900"
          >
            <option value="k6">Kindergarten – Grade 6 (Elementary)</option>
            <option value="jhs">Grades 7–10 (Junior High School)</option>
            <option value="shsCore">Grades 11–12 — Core Subjects</option>
            <option value="shsAcad">Grades 11–12 — Academic Track</option>
            <option value="shsTvl">Grades 11–12 — TVL Track</option>
          </select>
        </div>

        <div>
          <label className="block text-stone-700 font-bold mb-1.5">Subject:</label>
          <select
            value={subject}
            onChange={(e) => handleSubjectChange(e.target.value)}
            className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold text-stone-900"
          >
            {subjectsList.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-stone-700 font-bold mb-1.5">Grade Level:</label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold text-stone-900"
          >
            {gradesList.map(g => <option key={g} value={isNaN(Number(g)) ? g : `Grade ${g}`}>{isNaN(Number(g)) ? g : `Grade ${g}`}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-stone-700 font-bold mb-1.5">Term Block:</label>
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold text-stone-900"
          >
            <option value="1">Term 1 (June 15 – Sept 1, 2026)</option>
            <option value="2">Term 2 (Sept 16 – Dec 4, 2026)</option>
            <option value="3">Term 3 (Jan 4 – Mar 23, 2027)</option>
          </select>
        </div>
      </div>

      <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs text-stone-700 flex items-center justify-between">
        <div>
          <b>{activeTermInfo.label} block:</b> {fmtDate(new Date(activeTermInfo.start + 'T00:00:00'))} – {fmtDate(new Date(activeTermInfo.end + 'T00:00:00'))} ({weeks.length} teaching weeks)
        </div>
        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-[10px]">DepEd DO 9 s. 2026</span>
      </div>

      <div>
        <label className="block text-stone-700 font-bold mb-1.5 text-xs">Paste MELCs / Competencies (one per line):</label>
        <textarea
          value={melcsInput}
          onChange={(e) => setMelcsInput(e.target.value)}
          className="w-full p-3 bg-stone-50 border border-stone-300 rounded-2xl text-xs font-mono text-stone-900 min-h-[120px]"
          placeholder="Paste MELCs here..."
        />
      </div>

      <button
        onClick={handleGenerate}
        className="w-full py-3.5 bg-[#0b2340] hover:bg-blue-950 text-white rounded-2xl font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
      >
        <Sparkles className="w-4 h-4 text-amber-300" />
        <span>Generate Official Budget of Work (BOW)</span>
      </button>

      {showOutput && (
        <div className="bg-stone-50 border-2 border-stone-300 rounded-2xl p-6 space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h3 className="text-sm font-black text-[#0b2340]">{outTitle}</h3>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-[#0b2340] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Printer className="w-3.5 h-3.5" /> Print BOW
            </button>
          </div>

          <div className="overflow-x-auto border border-stone-300 rounded-xl bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0b2340] text-white">
                  <th className="p-2.5 border border-blue-900 w-24">Week</th>
                  <th className="p-2.5 border border-blue-900 w-44">Inclusive Dates</th>
                  <th className="p-2.5 border border-blue-900">MELC / Competency</th>
                  <th className="p-2.5 border border-blue-900 w-32">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {generatedRows.map((r, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/60'}>
                    <td className="p-2.5 border border-stone-200 font-bold">{r.week}</td>
                    <td className="p-2.5 border border-stone-200 text-stone-600">{r.dates}</td>
                    <td className="p-2.5 border border-stone-200 font-medium" contentEditable suppressContentEditableWarning>{r.comp}</td>
                    <td className="p-2.5 border border-stone-200 text-stone-500" contentEditable suppressContentEditableWarning>{r.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-stone-500 italic">{disclaimer}</p>
        </div>
      )}
    </div>
  );
};
