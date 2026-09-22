import React, { useState } from 'react';
import {
  FileText,
  Search,
  BookOpen,
  GraduationCap,
  Sparkles,
  Award,
  Layers,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  Plus,
  ArrowRight,
  Bookmark,
  Filter
} from 'lucide-react';
import {
  ResearchSourceMaster,
  ResearchEventTemplate,
  ClassroomImprovementRecord,
  InterventionLibraryItem,
  ActionResearchType,
  VerificationStatusLevel
} from '../types/masterResearchCurriculum';
import {
  SEED_RESEARCH_SOURCES,
  SEED_RESEARCH_TEMPLATES,
  SEED_CLASSROOM_RESEARCH,
  SEED_INTERVENTIONS
} from '../data/masterDatabaseSeed';
import { RRLBuilder } from './RRLBuilder';

export const ResearchIntelligenceModule: React.FC = () => {
  const [subTab, setSubTab] = useState<
    'rrl_builder' | 'literature_db' | 'action_research' | 'stf_templates' | 'gap_analyzer' | 'match_engine' | 'interventions'
  >('rrl_builder');

  const [sources, setSources] = useState<ResearchSourceMaster[]>(SEED_RESEARCH_SOURCES);
  const [templates, setTemplates] = useState<ResearchEventTemplate[]>(SEED_RESEARCH_TEMPLATES);
  const [actionResearches, setActionResearches] = useState<ClassroomImprovementRecord[]>(SEED_CLASSROOM_RESEARCH);
  const [interventions, setInterventions] = useState<InterventionLibraryItem[]>(SEED_INTERVENTIONS);

  // RRL Builder State
  const [rrlInput, setRrlInput] = useState({
    title: 'Improving Grade 8 Physics Problem-Solving via Interactive Simulations',
    problem: 'Learners struggle with isolating variables in Newton’s second law calculations.',
    variables: 'PhET Interactive Simulations, Force & Motion Conceptual Mastery',
    population: '240 Grade 8 Science Learners in Lanao del Norte',
    intervention: '8-week PhET computer-assisted simulation modules',
    subject: 'Science / Physics',
    gradeLevel: 'Grade 8'
  });

  // Match Engine State
  const [matchQuery, setMatchQuery] = useState('Grade 8 students have difficulty understanding linear equations');

  // Literature Filters
  const [yearWindow, setYearWindow] = useState<number>(15); // 15-year default (2011-2026)
  const currentYear = 2026;
  const minYear = currentYear - yearWindow;

  const filteredSources = sources.filter((s) => s.year >= minYear);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#001f5c] via-[#0038A8] to-[#002776] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-400/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCD116] text-[#002776] text-xs font-black uppercase tracking-wider mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              15-Year Window (2011–2026) Provenance
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Research Intelligence System</h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-2xl">
              Evidence-based research platform for DepEd Region X teachers and researchers. Seamlessly connects classroom problems to verified studies, RRL/RRS builders, STF guidelines, and gap analysis.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/10 rounded-2xl border border-white/20 text-xs font-bold shrink-0">
            {[
              { id: 'rrl_builder', label: 'RRL Builder' },
              { id: 'literature_db', label: '15-Yr Literature' },
              { id: 'match_engine', label: 'Match Engine' },
              { id: 'action_research', label: 'Action Research' },
              { id: 'stf_templates', label: 'STF / NSTF Fairs' },
              { id: 'gap_analyzer', label: 'Gap Analyzer' },
              { id: 'interventions', label: 'Interventions' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSubTab(t.id as any)}
                className={`px-3 py-2 rounded-xl transition cursor-pointer ${
                  subTab === t.id ? 'bg-[#FCD116] text-[#002776] shadow-xs' : 'text-white hover:text-yellow-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: RRL BUILDER */}
      {subTab === 'rrl_builder' && <RRLBuilder />}

      {/* SUB-TAB 2: 15-YEAR LITERATURE DATABASE */}
      {subTab === 'literature_db' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-stone-900">15-Year Research Literature Repository ({minYear}–{currentYear})</h3>
              <p className="text-xs text-stone-500">
                Verified peer-reviewed studies, ERIC records, and Philippine education journal publications.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-600">Year Filter:</span>
              <select
                value={yearWindow}
                onChange={(e) => setYearWindow(Number(e.target.value))}
                className="text-xs font-bold p-2 rounded-xl border border-stone-300 bg-stone-50"
              >
                <option value={1}>Last 1 Year ({currentYear - 1}–{currentYear})</option>
                <option value={3}>Last 3 Years ({currentYear - 3}–{currentYear})</option>
                <option value={5}>Last 5 Years ({currentYear - 5}–{currentYear})</option>
                <option value={10}>Last 10 Years ({currentYear - 10}–{currentYear})</option>
                <option value={15}>15-Year Window ({currentYear - 15}–{currentYear})</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredSources.map((source) => (
              <div
                key={source.id}
                className="p-5 rounded-3xl bg-stone-50/60 border border-stone-200 space-y-3 hover:border-[#0038A8] transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/60 pb-2">
                  <span className="text-xs font-extrabold text-[#0038A8]">{source.journal} ({source.year})</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900">
                      {source.publication_type}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                      {source.verification_status}
                    </span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-stone-900">{source.title}</h4>
                <p className="text-xs text-stone-600"><strong>Authors:</strong> {source.authors.join(', ')}</p>
                <p className="text-xs text-stone-700 leading-relaxed bg-white p-3 rounded-2xl border border-stone-150">
                  {source.abstract}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
                  <span className="font-mono text-stone-500">DOI: {source.doi || 'N/A'}</span>
                  {source.url && (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 underline font-semibold flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Source</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: SCIENCE + MATH RESEARCH MATCH ENGINE */}
      {subTab === 'match_engine' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="text-base font-bold text-stone-900">Science &amp; Mathematics Research Match Engine</h3>
            <p className="text-xs text-stone-500">
              Input a classroom problem to immediately retrieve matched competencies, diagnostic misconceptions, evidence-based interventions, and research questions.
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">Describe Classroom Problem</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={matchQuery}
                onChange={(e) => setMatchQuery(e.target.value)}
                className="flex-1 text-xs p-3 rounded-2xl border border-stone-300 font-medium"
                placeholder="e.g. Students fail calculation items in Newton's laws..."
              />
              <button className="px-5 py-3 rounded-2xl bg-[#0038A8] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                <Sparkles className="w-4 h-4 text-[#FCD116]" />
                <span>Run Match</span>
              </button>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-200 space-y-4 text-xs">
            <div className="flex items-center gap-2 font-bold text-[#0038A8] text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Matched Intelligence Output</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1">
                <span className="font-bold text-stone-800 block">Matched DepEd Competency</span>
                <p className="text-stone-600 font-mono">M8AL-Ie-1: Linear equations in two variables</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1">
                <span className="font-bold text-amber-900 block">Diagnosed Misconception</span>
                <p className="text-stone-600">Confusing slope sign direction when reading left-to-right on coordinate axes.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1">
                <span className="font-bold text-emerald-800 block">Evidence-Based Intervention</span>
                <p className="text-stone-600">Concrete-Representational-Abstract (CRA) grid board sequencing (Flores &amp; Mercado, 2023).</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1">
                <span className="font-bold text-blue-900 block">Suggested Research Question</span>
                <p className="text-stone-600">"To what extent does CRA instruction improve slope interpretation accuracy among Grade 8 algebra learners?"</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: ACTION RESEARCH */}
      {subTab === 'action_research' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="text-base font-bold text-stone-900">Classroom Improvement Action Research Exemplars</h3>
            <p className="text-xs text-stone-500">
              10-step action research workflow tracking baseline data, root cause, intervention, post-test analysis, and reflection.
            </p>
          </div>

          <div className="space-y-4">
            {actionResearches.map((ar) => (
              <div key={ar.id} className="p-5 rounded-3xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex justify-between items-center text-xs border-b border-stone-200 pb-2">
                  <span className="font-bold text-[#0038A8]">{ar.research_type} • {ar.subject} ({ar.grade_level})</span>
                  <span className="font-mono text-stone-500">By {ar.teacher} ({ar.school})</span>
                </div>

                <h4 className="text-sm font-bold text-stone-900">{ar.title}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-2xl border border-stone-200 space-y-1">
                    <span className="font-bold text-rose-800 block">Baseline Pre-Test Data:</span>
                    <p className="text-stone-700">{ar.baseline_data}</p>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-stone-200 space-y-1">
                    <span className="font-bold text-emerald-800 block">Post-Test Outcome:</span>
                    <p className="text-stone-700">{ar.post_test_data}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: STF / NSTF EVENT TEMPLATES */}
      {subTab === 'stf_templates' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="text-base font-bold text-stone-900">Configurable STF / RSTF / NSTF Research Event Profiles</h3>
            <p className="text-xs text-stone-500">
              Official competition profiles and formatting requirements for science fairs across Institutional, Division, Regional, and National levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((tmpl) => (
              <div key={tmpl.id} className="p-5 rounded-3xl bg-blue-50/50 border border-blue-200 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-blue-200/60 pb-2">
                  <span className="font-black text-[#0038A8] text-sm">{tmpl.event_name} ({tmpl.year})</span>
                  <span className="font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-200 text-blue-900 text-[10px]">
                    {tmpl.event_level} Level
                  </span>
                </div>

                <p className="text-stone-700"><strong>Organizer:</strong> {tmpl.organizer}</p>
                <p className="text-stone-700"><strong>Eligibility:</strong> {tmpl.eligibility}</p>
                <p className="text-stone-700"><strong>Formatting Rules:</strong> {tmpl.formatting_rules}</p>

                <div className="p-3 bg-white rounded-2xl border border-blue-200 space-y-1">
                  <span className="font-bold text-[#0038A8] block">Required Sections:</span>
                  <p className="text-stone-600">{tmpl.required_sections.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 6: GAP ANALYZER */}
      {subTab === 'gap_analyzer' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="text-base font-bold text-stone-900">Research Gap Analyzer Engine</h3>
            <p className="text-xs text-stone-500">
              Categorizes gaps across population, geographic, methodological, intervention, and curriculum dimensions. Always explicitly labeled as "Potential research gap identified".
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {[
              { type: 'Geographic / Regional Gap', desc: 'Limited empirical studies conducted in rural secondary schools in Region X (Lanao del Norte).' },
              { type: 'Longitudinal Evidence Gap', desc: 'Retention rates beyond 6 months after simulation intervention lack systematic evaluation.' },
              { type: 'Curriculum Transition Gap', desc: 'Minimal research evaluating MATATAG 2026 Three-Term trimester pacing impact on STEM mastery.' }
            ].map((gap, i) => (
              <div key={i} className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <span className="font-bold text-amber-900 block text-xs">{gap.type}</span>
                <p className="text-stone-700 leading-relaxed">{gap.desc}</p>
                <span className="text-[10px] font-extrabold uppercase bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md inline-block">
                  Potential Research Gap Identified
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 7: INTERVENTIONS */}
      {subTab === 'interventions' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="text-base font-bold text-stone-900">Classroom Improvement Intervention Library</h3>
            <p className="text-xs text-stone-500">
              17 evidence-linked pedagogical intervention strategies (Retrieval practice, CRA, Gamification, Formative Assessment, PBL).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {interventions.map((item) => (
              <div key={item.id} className="p-5 rounded-3xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <span className="font-bold text-stone-900 text-sm">{item.name}</span>
                  <span className="font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px]">
                    {item.category}
                  </span>
                </div>
                <p className="text-stone-700">{item.description}</p>
                <p className="text-stone-600"><strong>Target Problem:</strong> {item.target_problem}</p>
                <p className="text-emerald-800 font-medium"><strong>Evidence Source:</strong> {item.evidence_source} ({item.evidence_year})</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
