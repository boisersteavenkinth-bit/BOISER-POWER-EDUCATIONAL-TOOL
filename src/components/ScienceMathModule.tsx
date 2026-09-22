import React, { useState } from 'react';
import {
  Atom,
  Calculator,
  Search,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  FlaskConical,
  GraduationCap,
  Sparkles,
  BookOpen,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { ScienceRecordMaster, MathRecordMaster } from '../types/masterResearchCurriculum';
import { SEED_SCIENCE_RECORDS, SEED_MATH_RECORDS } from '../data/masterDatabaseSeed';

export const ScienceMathModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'science' | 'math'>('science');
  const [scienceRecords, setScienceRecords] = useState<ScienceRecordMaster[]>(SEED_SCIENCE_RECORDS);
  const [mathRecords, setMathRecords] = useState<MathRecordMaster[]>(SEED_MATH_RECORDS);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('ALL');
  const [selectedStrand, setSelectedStrand] = useState<string>('ALL');
  const [selectedGrade, setSelectedGrade] = useState<string>('ALL');
  const [selectedTerm, setSelectedTerm] = useState<string>('ALL');

  const filteredScience = scienceRecords.filter((s) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      s.competency_code.toLowerCase().includes(q) ||
      s.topic.toLowerCase().includes(q) ||
      s.scientific_concept.toLowerCase().includes(q) ||
      s.misconception.toLowerCase().includes(q);

    const matchesDiscipline = selectedDiscipline === 'ALL' || s.discipline === selectedDiscipline;
    const matchesGrade = selectedGrade === 'ALL' || s.grade === selectedGrade;
    const matchesTerm = selectedTerm === 'ALL' || s.term === selectedTerm;

    return matchesSearch && matchesDiscipline && matchesGrade && matchesTerm;
  });

  const filteredMath = mathRecords.filter((m) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      m.competency_code.toLowerCase().includes(q) ||
      m.topic.toLowerCase().includes(q) ||
      m.mathematical_concept.toLowerCase().includes(q) ||
      m.misconception.toLowerCase().includes(q);

    const matchesStrand = selectedStrand === 'ALL' || m.strand === selectedStrand;
    const matchesGrade = selectedGrade === 'ALL' || m.grade === selectedGrade;
    const matchesTerm = selectedTerm === 'ALL' || m.term === selectedTerm;

    return matchesSearch && matchesStrand && matchesGrade && matchesTerm;
  });

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-gradient-to-r from-[#002776] via-[#0038A8] to-[#001f5c] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-400/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCD116] text-[#002776] text-xs font-black uppercase tracking-wider mb-2">
              <Atom className="w-3.5 h-3.5" />
              Specialized STEM Knowledge Base
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Science &amp; Mathematics Databases</h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-2xl">
              DepEd Region X STEM competency map tracking scientific inquiry skills, mathematical reasoning, diagnostic misconceptions, evidence-based interventions, and research connections.
            </p>
          </div>

          <div className="inline-flex p-1 rounded-2xl bg-white/10 border border-white/20 text-xs font-bold shrink-0">
            <button
              onClick={() => setActiveTab('science')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'science' ? 'bg-[#FCD116] text-[#002776] shadow-sm' : 'text-white hover:text-yellow-200'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>Science Database ({scienceRecords.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('math')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'math' ? 'bg-[#FCD116] text-[#002776] shadow-sm' : 'text-white hover:text-yellow-200'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Mathematics Database ({mathRecords.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic, concept, misconception..."
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-2xl border border-stone-300 focus:outline-none focus:border-[#0038A8]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {activeTab === 'science' ? (
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="text-xs font-bold p-2.5 rounded-xl border border-stone-300 bg-stone-50"
              >
                <option value="ALL">All Science Disciplines</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Earth Science">Earth Science</option>
                <option value="Environmental Science">Environmental Science</option>
                <option value="General Science">General Science</option>
                <option value="STEM">STEM</option>
              </select>
            ) : (
              <select
                value={selectedStrand}
                onChange={(e) => setSelectedStrand(e.target.value)}
                className="text-xs font-bold p-2.5 rounded-xl border border-stone-300 bg-stone-50"
              >
                <option value="ALL">All Math Strands</option>
                <option value="Number and Number Sense">Number and Number Sense</option>
                <option value="Measurement">Measurement</option>
                <option value="Geometry">Geometry</option>
                <option value="Algebra">Algebra</option>
                <option value="Statistics">Statistics</option>
                <option value="Probability">Probability</option>
                <option value="Functions">Functions</option>
                <option value="Mathematical Reasoning">Mathematical Reasoning</option>
                <option value="Problem Solving">Problem Solving</option>
              </select>
            )}

            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="text-xs font-bold p-2.5 rounded-xl border border-stone-300 bg-stone-50"
            >
              <option value="ALL">All 3 Terms</option>
              <option value="Term 1">Term 1</option>
              <option value="Term 2">Term 2</option>
              <option value="Term 3">Term 3</option>
            </select>
          </div>
        </div>
      </div>

      {/* Science View */}
      {activeTab === 'science' && (
        <div className="space-y-4">
          {filteredScience.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs hover:border-[#0038A8] transition space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-[#0038A8] bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
                    {record.competency_code}
                  </span>
                  <span className="text-xs font-bold text-stone-800">{record.discipline} • {record.grade}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    HOTS: {record.hots_level}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                    {record.term}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-stone-900">{record.topic}: {record.subtopic}</h3>
                <p className="text-xs text-stone-700 bg-stone-50 p-3 rounded-2xl border border-stone-100 font-medium">
                  {record.competency}
                </p>
              </div>

              {/* Skills & Concept Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-1">
                  <span className="font-bold text-[#0038A8] text-[11px] block">Scientific Concept:</span>
                  <p className="text-stone-700">{record.scientific_concept}</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#FCD116]/10 border border-yellow-200 space-y-1">
                  <span className="font-bold text-amber-900 text-[11px] block">Inquiry &amp; Lab Skills:</span>
                  <p className="text-stone-700">{record.inquiry_skill}</p>
                </div>
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100 space-y-1">
                  <span className="font-bold text-rose-900 text-[11px] block">Common Misconception:</span>
                  <p className="text-stone-700">{record.misconception}</p>
                </div>
              </div>

              {/* Research Connection */}
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex items-center justify-between gap-2 text-emerald-900 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Research Evidence Connection:</strong> {record.research_connection}</span>
                </div>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-md shrink-0">
                  VERIFIED
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Math View */}
      {activeTab === 'math' && (
        <div className="space-y-4">
          {filteredMath.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs hover:border-[#0038A8] transition space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-[#0038A8] bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
                    {record.competency_code}
                  </span>
                  <span className="text-xs font-bold text-stone-800">{record.strand} • {record.grade}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    HOTS: {record.hots_level}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                    {record.term}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-stone-900">{record.topic}: {record.subtopic}</h3>
                <p className="text-xs text-stone-700 bg-stone-50 p-3 rounded-2xl border border-stone-100 font-medium">
                  {record.competency}
                </p>
              </div>

              {/* Mathematical Skills & Concept Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-1">
                  <span className="font-bold text-[#0038A8] text-[11px] block">Mathematical Concept:</span>
                  <p className="text-stone-700">{record.mathematical_concept}</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#FCD116]/10 border border-yellow-200 space-y-1">
                  <span className="font-bold text-amber-900 text-[11px] block">Procedural &amp; Reasoning Skill:</span>
                  <p className="text-stone-700">{record.procedural_skill}</p>
                </div>
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100 space-y-1">
                  <span className="font-bold text-rose-900 text-[11px] block">Diagnostic Misconception:</span>
                  <p className="text-stone-700">{record.misconception}</p>
                </div>
              </div>

              {/* Research Connection */}
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex items-center justify-between gap-2 text-emerald-900 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Research Evidence Connection:</strong> {record.research_connection}</span>
                </div>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-md shrink-0">
                  VERIFIED
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
