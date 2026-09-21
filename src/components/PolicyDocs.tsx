import React from 'react';
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  BookOpen,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { SOURCE_HIERARCHY, CURRICULUM_FRAMEWORK_MAP } from '../data/curriculumMap';

export const PolicyDocs: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Policy Hero */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-0.5 rounded-full bg-blue-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Official Legal & Policy Framework
          </span>
          <span className="text-xs text-stone-400">DepEd SY 2026–2027</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
          DepEd Orders, System Architecture & Data Trust Hierarchy
        </h2>

        <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
          The Boiser Powerful Education Tools project enforces strict data integrity. The competency database acts as the single source of truth, normalized from official issuances and calibrated against the 3-term academic calendar.
        </p>
      </div>

      {/* DepEd Orders Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DO 009, s. 2026 */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-bold">
              DepEd Order No. 009, s. 2026
            </span>
            <span className="text-xs font-mono text-stone-400">School Calendar</span>
          </div>

          <h3 className="text-base font-bold text-stone-900 font-display">
            Three-Term School Calendar (201 Class Days)
          </h3>

          <ul className="text-xs space-y-2 text-stone-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Three Equal Terms:</strong> Restructures the academic year into Term 1, Term 2, and Term 3, replacing the traditional 4-quarter cycle.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>201 Class Days:</strong> Pacing in the Budget of Work (BOW) is calibrated across weeks per term to guarantee full curriculum coverage without teacher burnout.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Summative Examination Windows:</strong> Conducted at the end of each of the three terms with unified 30-30-40 sub-weighting.
              </span>
            </li>
          </ul>
        </div>

        {/* DO 015, s. 2026 */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold">
              DepEd Order No. 015, s. 2026
            </span>
            <span className="text-xs font-mono text-stone-400">Classroom Assessment</span>
          </div>

          <h3 className="text-base font-bold text-stone-900 font-display">
            Assessment Policy & Paragraph 49 Transition Rule
          </h3>

          <ul className="text-xs space-y-2 text-stone-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Paragraph 49 Transition:</strong> Grade 12 retains DO 8, s. 2015 weights with the new 3-term calendar and adjusted transmutation table.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Qualitative Descriptors:</strong> Official descriptors (Advancing, Benchmarking, Connecting, Developing, Emerging) replace legacy ratings.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Grade 11 Strengthened Weights:</strong> Focus on performance tasks (50-60%) for authentic mastery and laboratory competence.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Source Hierarchy / Data Trust Levels (Part 6) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-lg font-bold font-display text-stone-900">
              Source Hierarchy & Data Trust Levels (Part 6)
            </h3>
            <p className="text-xs text-stone-500">
              Extraction rule: If a competency code appears only on Level 3–4 sources, it is marked "unverified" in the schema.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-xl">
            Strict Verification Protocol
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {SOURCE_HIERARCHY.map((s) => (
            <div
              key={s.level}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-sm">
                    {s.title}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${s.badge}`}>
                    {s.trust}
                  </span>
                </div>
                <p className="text-stone-600 leading-relaxed font-sans">
                  {s.description}
                </p>
              </div>

              <div className="text-[10px] text-stone-400 font-mono pt-2 border-t border-stone-200/60">
                Level {s.level} Authority
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum Map Table (Part 2) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-lg font-bold font-display text-stone-900">
              Full Curriculum Framework Map (SY 2026–2027)
            </h3>
            <p className="text-xs text-stone-500">
              Phase 3 rollout debut: Grade 3, Grade 6, and Grade 9.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-stone-200 rounded-2xl overflow-hidden">
            <thead className="bg-stone-100 text-stone-800 font-bold">
              <tr>
                <th className="p-3">Grade Level</th>
                <th className="p-3">Key Stage</th>
                <th className="p-3">Curriculum Framework</th>
                <th className="p-3">3-Term BOW</th>
                <th className="p-3">Transition Flag</th>
                <th className="p-3">Notes & Legal Basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 bg-white text-stone-700">
              {CURRICULUM_FRAMEWORK_MAP.map((row, i) => (
                <tr key={i} className={row.transitionFlag ? 'bg-amber-50/30' : ''}>
                  <td className="p-3 font-bold text-stone-900">{row.gradeLevel}</td>
                  <td className="p-3 font-mono">{row.keyStage}</td>
                  <td className="p-3 font-medium text-blue-900">{row.curriculumFramework}</td>
                  <td className="p-3 text-emerald-700 font-bold">✓ Active (201 Days)</td>
                  <td className="p-3 font-mono font-bold">
                    {row.transitionFlag ? (
                      <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[10px]">
                        TRUE (DO 015 Par. 49)
                      </span>
                    ) : (
                      <span className="text-stone-400">FALSE</span>
                    )}
                  </td>
                  <td className="p-3 text-stone-600 text-[11px] leading-relaxed">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
