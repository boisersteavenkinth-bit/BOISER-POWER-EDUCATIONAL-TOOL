import React, { useState } from 'react';
import {
  Wrench,
  Search,
  Briefcase,
  Award,
  BookOpen,
  CheckCircle2,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { TECH_PRO_ELECTIVES } from '../data/curriculumMap';
import { TechProElective } from '../types';

export const TechProDirectory: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const sectors = [
    'all',
    'Family and Consumer Sciences (FCS)',
    'Industrial Arts (IA)',
    'ICT',
    'Maritime',
  ];

  const filtered = TECH_PRO_ELECTIVES.filter((el) => {
    if (selectedSector !== 'all' && el.sector !== selectedSector) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        el.title.toLowerCase().includes(q) ||
        el.description.toLowerCase().includes(q) ||
        (el.cluster && el.cluster.toLowerCase().includes(q)) ||
        el.careerPathways.some((p) => p.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
              Strengthened SHS Track • Grade 11
            </span>
            <span className="text-xs text-stone-500 font-medium">
              3-Term Budget of Work Confirmed
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900">
            TechPro Elective Subjects Directory
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-2xl">
            Complete catalogue of verified Grade 11 Technical-Professional (TechPro) electives organized across 4 major industrial and service sectors.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700">
          <span className="font-bold text-stone-900 block mb-0.5">DO 015, s. 2026 Lab Weights:</span>
          <span className="text-emerald-700 font-bold">60% Performance Task</span> • 20% Written • 20% Exam
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search TechPro elective, career pathway, or certification (e.g. 'Photovoltaic', 'Culinary', 'Java', 'Welding')..."
            className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-stone-50/60"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {sectors.map((sector) => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedSector === sector
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {sector === 'all' ? 'All Sectors' : sector}
            </button>
          ))}
        </div>
      </div>

      {/* Electives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((el, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between space-y-3 hover:border-blue-300 transition"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {el.sector}
                </span>
                {el.code && (
                  <span className="font-mono text-[10px] text-stone-400">
                    {el.code}
                  </span>
                )}
              </div>

              {el.cluster && (
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                  Cluster: {el.cluster}
                </span>
              )}

              <h3 className="text-base font-bold text-stone-900 font-display">
                {el.title}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed mt-2 font-sans">
                {el.description}
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-stone-100 text-xs">
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                  Career Pathways:
                </span>
                <div className="flex flex-wrap gap-1">
                  {el.careerPathways.map((cp, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-medium"
                    >
                      {cp}
                    </span>
                  ))}
                </div>
              </div>

              {el.certifications && el.certifications.length > 0 && (
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-xl">
                  <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{el.certifications.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
