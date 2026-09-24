import React, { useState } from 'react';
import {
  Globe,
  BookOpen,
  Search,
  ExternalLink,
  ShieldCheck,
  Heart,
  FileText,
  Sparkles,
  HelpCircle,
  Calculator,
  Compass,
  Building,
  Check,
  Copy,
  Layers,
  Award,
  ChevronDown,
  ChevronUp,
  Tag
} from 'lucide-react';
import {
  OFFICIAL_EDUCATIONAL_SOURCES,
  WORLD_RELIGIONS_DATA,
  HELP_TOPICS_GUIDE,
  ReligionInfo
} from '../data/religionsAndEducationalSources';

interface EducationalSourcesHubProps {
  onAskBot?: (query: string) => void;
}

export const EducationalSourcesHub: React.FC<EducationalSourcesHubProps> = ({ onAskBot }) => {
  const [activeSubTab, setActiveSubTab] = useState<'legitimate_sources' | 'world_religions' | 'how_we_help'>('world_religions');
  const [selectedReligion, setSelectedReligion] = useState<ReligionInfo | null>(WORLD_RELIGIONS_DATA[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [religionSearch, setReligionSearch] = useState('');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredReligions = WORLD_RELIGIONS_DATA.filter(
    (r) =>
      r.name.toLowerCase().includes(religionSearch.toLowerCase()) ||
      r.category.toLowerCase().includes(religionSearch.toLowerCase()) ||
      r.summary.toLowerCase().includes(religionSearch.toLowerCase()) ||
      r.coreBeliefs.some((b) => b.toLowerCase().includes(religionSearch.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ========================================================= */}
      {/* 1. HERO BANNER */}
      {/* ========================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#092B62] via-[#0d3b82] to-[#1254b8] p-6 sm:p-8 text-white shadow-xl border border-blue-400/30">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-cyan-200 text-xs font-black tracking-wide">
              <ShieldCheck className="w-4 h-4 text-cyan-300" />
              <span>OFFICIAL VERIFIED PHILIPPINE EDUCATIONAL DATA SOURCES</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              📖 Open Educational Repositories &amp; World Religions Data Hub
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
              Legitimate free access to DepEd resources, curriculum materials, and comprehensive comparative data on <strong>Roman Catholicism, Islam, Jehovah's Witnesses, and Buddhism</strong> for Values Education (ESP) and Social Studies.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <a
              href="https://lrmds.deped.gov.ph"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/25 rounded-2xl text-xs font-black text-white flex items-center gap-2 transition"
            >
              <Globe className="w-4 h-4 text-amber-300" />
              <span>lrmds.deped.gov.ph</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
            <a
              href="https://commons.deped.gov.ph"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-blue-500/30 hover:bg-blue-500/40 border border-blue-400/30 rounded-2xl text-xs font-black text-white flex items-center gap-2 transition"
            >
              <Globe className="w-4 h-4 text-cyan-300" />
              <span>commons.deped.gov.ph</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. SUB NAVIGATION TABS */}
      {/* ========================================================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-white border border-[#dce3ee] p-2 rounded-2xl shadow-sm">
        {[
          { id: 'world_religions', label: '🕌 World Religions & Traditions Data', icon: Heart },
          { id: 'legitimate_sources', label: '🏛️ Legitimate Free Educational Sources', icon: Globe },
          { id: 'how_we_help', label: '💡 How I Can Help You (Prompt Assistant)', icon: Sparkles }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-[#092B62] text-white shadow-sm'
                  : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 3. SUBTAB 1: WORLD RELIGIONS & TRADITIONS */}
      {/* ========================================================= */}
      {activeSubTab === 'world_religions' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200">
            <div>
              <h2 className="text-sm font-black text-[#092B62]">
                Comparative Study of Religions &amp; Faiths in Philippine Education
              </h2>
              <p className="text-xs text-stone-500">
                Alinsunod sa DepEd Values Education (ESP) at Senior High School Introduction to World Religions and Belief Systems.
              </p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={religionSearch}
                onChange={(e) => setReligionSearch(e.target.value)}
                placeholder="Search faiths, doctrines..."
                className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar list */}
            <div className="lg:col-span-4 space-y-3">
              {filteredReligions.map((rel) => {
                const isSelected = selectedReligion?.id === rel.id;
                return (
                  <div
                    key={rel.id}
                    onClick={() => setSelectedReligion(rel)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-blue-50 border-blue-400 shadow-md ring-1 ring-blue-500'
                        : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-black text-sm text-stone-900">{rel.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-stone-100 text-stone-700 rounded-md font-mono">
                        {rel.badge}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-normal">
                      {rel.summary}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Detailed Religion Content Card */}
            {selectedReligion && (
              <div className="lg:col-span-8 bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                      {selectedReligion.category}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                      {selectedReligion.name}
                    </h2>
                  </div>

                  <button
                    onClick={() => handleCopy(JSON.stringify(selectedReligion, null, 2), selectedReligion.id)}
                    className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedId === selectedReligion.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied Data</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Religion Metadata</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Summary & Philippine Context */}
                <div className="space-y-3">
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
                    <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider block">
                      Overview &amp; Theological Essence
                    </span>
                    <p className="text-xs text-stone-800 leading-relaxed font-medium">
                      {selectedReligion.summary}
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100 space-y-1">
                    <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block">
                      🇵🇭 Philippine Cultural Context &amp; Community Presence
                    </span>
                    <p className="text-xs text-blue-950 leading-relaxed font-medium">
                      {selectedReligion.philippineContext}
                    </p>
                  </div>
                </div>

                {/* Core Beliefs & Doctrines */}
                <div className="space-y-2">
                  <h3 className="text-xs font-black uppercase text-stone-700 tracking-wider flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Core Tenets, Beliefs &amp; Practices</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedReligion.coreBeliefs.map((belief, i) => (
                      <div
                        key={i}
                        className="p-3 bg-stone-50 border border-stone-100 rounded-xl text-xs text-stone-800 flex items-start gap-2"
                      >
                        <span className="w-4 h-4 rounded-full bg-blue-100 text-[#092B62] font-black text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-snug font-medium">{belief}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sacred Texts & Major Celebrations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-1.5">
                    <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider block">
                      📜 Sacred Scriptures / Texts
                    </span>
                    <ul className="text-xs text-stone-800 space-y-1 font-medium">
                      {selectedReligion.sacredTexts.map((text, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="text-blue-600">•</span>
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-1.5">
                    <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider block">
                      🎉 Major Observances &amp; Celebrations
                    </span>
                    <ul className="text-xs text-stone-800 space-y-1 font-medium">
                      {selectedReligion.majorCelebrations.map((cel, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="text-amber-500">•</span>
                          <span>{cel}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Values Education Alignment */}
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                  <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider block">
                    🌱 DepEd Values Education &amp; Peace Education Core Competency
                  </span>
                  <p className="font-medium leading-relaxed">{selectedReligion.valuesEducationAlignment}</p>
                </div>

                {/* Verified Reference Sources */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider block">
                    Verified Reference Portals:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedReligion.verifiedSources.map((src, i) => (
                      <a
                        key={i}
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                      >
                        <span>{src.title}</span>
                        <ExternalLink className="w-3 h-3 text-stone-400" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. SUBTAB 2: LEGITIMATE WAYS TO ACCESS PH EDUCATIONAL CONTENT */}
      {/* ========================================================= */}
      {activeSubTab === 'legitimate_sources' && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-black text-[#092B62]">
                Official Free Educational Resources Matrix
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Verified repositories and authentic government portals for Philippine Basic Education.
              </p>
            </div>

            {/* Official Free Resources Table */}
            <div className="overflow-x-auto border border-stone-200 rounded-2xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-[#092B62] font-black uppercase text-[10px]">
                    <th className="py-3 px-4">Subject Area</th>
                    <th className="py-3 px-4">Recommended Source</th>
                    <th className="py-3 px-4">Primary Portal URL</th>
                    <th className="py-3 px-4">Curriculum Scope</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {OFFICIAL_EDUCATIONAL_SOURCES.map((item, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/40 transition">
                      <td className="py-3.5 px-4 font-black text-stone-900 whitespace-nowrap">
                        {item.subject}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-blue-900">
                        {item.recommendedSource}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                        >
                          <span>{item.url.replace('https://', '')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="py-3.5 px-4 text-stone-600 leading-relaxed">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* DepEd Commons & LRMDS Free Legal Access Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-[#092B62] flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span>DepEd LRMDS Central Portal</span>
                  </span>
                  <span className="text-[10px] font-bold bg-blue-200/60 text-blue-900 px-2 py-0.5 rounded-md font-mono">
                    Free Legal Access
                  </span>
                </div>
                <p className="text-xs text-blue-950 font-medium">
                  The primary national repository for quality-assured learning resources, teacher's guides, learner's materials, and contextualized learning activity sheets.
                </p>
                <div className="bg-white/80 p-2.5 rounded-xl border border-blue-200 font-mono text-xs text-blue-900 font-bold flex items-center justify-between">
                  <span>lrmds.deped.gov.ph</span>
                  <a
                    href="https://lrmds.deped.gov.ph"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-emerald-900 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <span>DepEd Commons Online Platform</span>
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded-md font-mono">
                    Zero-Data Open Access
                  </span>
                </div>
                <p className="text-xs text-emerald-950 font-medium">
                  Direct online educational platform providing free access to digital learning modules, interactive self-assessments, and video lessons for public and private school learners.
                </p>
                <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-200 font-mono text-xs text-emerald-900 font-bold flex items-center justify-between">
                  <span>commons.deped.gov.ph</span>
                  <a
                    href="https://commons.deped.gov.ph"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 hover:text-emerald-800"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. SUBTAB 3: HOW I CAN HELP YOU (PROMPT ASSISTANT) */}
      {/* ========================================================= */}
      {activeSubTab === 'how_we_help' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-lg font-black text-[#092B62] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>How Boiser Power Tools Can Assist You</span>
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Ask specific questions across these subjects using our AI-assisted local and cloud engines:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HELP_TOPICS_GUIDE.map((guide, idx) => (
              <div
                key={idx}
                className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-3 hover:border-blue-300 hover:shadow-xs transition flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-[#092B62]">
                      {guide.category}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md font-mono">
                      Query Example
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    {guide.description}
                  </p>

                  <div className="p-3 bg-white rounded-xl border border-stone-200 font-mono text-xs text-blue-900 font-bold">
                    "{guide.exampleQuery}"
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => handleCopy(guide.exampleQuery, `prompt_${idx}`)}
                    className="flex-1 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {copiedId === `prompt_${idx}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied Prompt</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                  {onAskBot && (
                    <button
                      onClick={() => onAskBot(guide.exampleQuery)}
                      className="flex-1 py-2 bg-[#092B62] hover:bg-blue-900 text-white rounded-xl text-xs font-black transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Ask Bot Now</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
