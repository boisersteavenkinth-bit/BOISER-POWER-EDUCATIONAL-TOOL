import React, { useState } from 'react';
import {
  Presentation,
  Copy,
  Check,
  Sparkles,
  Layers,
  Palette,
  Layout,
  ExternalLink,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { CompetencyRecord } from '../types';

interface CanvaBridgeProps {
  competencies: CompetencyRecord[];
  selectedCompetency: CompetencyRecord | null;
}

export const CanvaBridge: React.FC<CanvaBridgeProps> = ({
  competencies,
  selectedCompetency,
}) => {
  const [activeComp, setActiveComp] = useState<CompetencyRecord>(
    selectedCompetency || competencies[0]
  );
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  React.useEffect(() => {
    if (selectedCompetency) {
      setActiveComp(selectedCompetency);
    }
  }, [selectedCompetency]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Structured Canva Slides representation
  const slides = [
    {
      slideNum: 1,
      title: 'Title & Opening Hook',
      layout: 'Headline + Subhead + Context Badge',
      headline: activeComp.subject_title,
      subhead: `Term ${activeComp.term} • Week ${activeComp.week} • Grade ${activeComp.grade_level}`,
      body: `Essential Question: How does "${activeComp.learning_competency.slice(0, 80)}..." shape our daily community life?`,
      canvaTip: 'Use a high-contrast sans-serif font (Montserrat or Poppins) with an authentic Philippine community photo.'
    },
    {
      slideNum: 2,
      title: 'Official DepEd Standard & Code',
      layout: 'Split 2-Column Focus',
      headline: 'What We Are Learning Today',
      subhead: `Competency Code: ${activeComp.competency_code || 'BOW-2026'}`,
      body: `"${activeComp.learning_competency}"\n\nContent Standard: ${activeComp.content_standard || 'Disciplinary foundation'}\nPerformance Standard: ${activeComp.performance_standard || 'Practical mastery'}`,
      canvaTip: 'Highlight key action verbs with colored badge boxes.'
    },
    {
      slideNum: 3,
      title: 'Concept Breakdown & Worked Examples',
      layout: '3-Card Bento Grid',
      headline: 'Essential Principles in Action',
      subhead: activeComp.domain || 'Key Concept Analysis',
      body: 'Card 1: Theoretical Rule & Definition\nCard 2: Realistic Worked Model / Formula\nCard 3: Common Pitfalls to Avoid',
      canvaTip: 'Insert clean vector icons for each card to structure the visual flow.'
    },
    {
      slideNum: 4,
      title: 'Guided Collaborative Practice',
      layout: 'Interactive Activity Banner',
      headline: 'Team Challenge & Formative Check',
      subhead: 'Developing Mastery (10 Mins)',
      body: 'Task: Apply the competency with your group to solve a local community problem.\nTime limit: 8 minutes. Deliverable: 1-minute pitch or mini-whiteboard solution.',
      canvaTip: 'Include an embedded countdown timer element from Canva Apps.'
    },
    {
      slideNum: 5,
      title: 'Real-World Philippine Application',
      layout: 'Story Showcase',
      headline: 'Connecting to Our Community',
      subhead: 'Daily Living in Barangay & Society',
      body: 'Case Study: How local workers, households, and leaders employ this competency to make safer, better, and more equitable decisions.',
      canvaTip: 'Use authentic Philippine municipal or industrial photo assets.'
    },
    {
      slideNum: 6,
      title: 'Assessment & Rubric Criteria',
      layout: '4-Column Metric Grid',
      headline: 'How Your Work is Evaluated',
      subhead: `Weight Category: ${activeComp.assessment_weight_set}`,
      body: 'Level 4 (Advancing): Thorough, autonomous, insightful\nLevel 3 (Benchmarking): Complete, competent\nLevel 2 (Connecting): Satisfactory with guidance\nLevel 1 (Developing): Partial, requires support',
      canvaTip: 'Use Canva color-coded progress bars for visual feedback.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-0.5 rounded-full bg-amber-400 text-stone-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Presentation Layer Bridge
          </span>
          <span className="text-xs text-purple-200">
            Competency Database = Single Source of Truth
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
          Canva Presentation Deck Bridge
        </h2>

        <p className="text-xs sm:text-sm text-purple-200 max-w-3xl leading-relaxed">
          In accordance with the Boiser Architecture, Canva is strictly the <em>presentation layer</em>. All titles, competencies, learning standards, and rubric descriptors are derived from the database and formatted into clean, copy-ready slide structures for fast creation in Canva.
        </p>
      </div>

      {/* Competency Picker */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <label className="text-xs font-bold text-stone-700 block mb-1">
            Active Competency for Slide Generation
          </label>
          <select
            value={activeComp.id}
            onChange={(e) => {
              const found = competencies.find((c) => c.id === e.target.value);
              if (found) setActiveComp(found);
            }}
            className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 font-medium text-stone-800"
          >
            {competencies.map((c) => (
              <option key={c.id} value={c.id}>
                [{c.grade_level === 'Kindergarten' ? 'K' : `Gr ${c.grade_level}`} T{c.term}] {c.subject_title}: {c.learning_competency.slice(0, 80)}...
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            const allSlidesText = slides
              .map(
                (s) =>
                  `SLIDE ${s.slideNum}: ${s.title}\nHEADLINE: ${s.headline}\nSUBHEAD: ${s.subhead}\nCONTENT:\n${s.body}\nCANVA DESIGN TIP: ${s.canvaTip}\n---`
              )
              .join('\n\n');
            copyToClipboard(allSlidesText, 'all');
          }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold shadow-xs transition cursor-pointer shrink-0"
        >
          {copiedSection === 'all' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copiedSection === 'all' ? 'All Slides Copied' : 'Copy All 6 Slides for Canva'}</span>
        </button>
      </div>

      {/* Slide Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slides.map((s) => {
          const isCopied = copiedSection === `slide-${s.slideNum}`;
          return (
            <div
              key={s.slideNum}
              className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-purple-300 transition"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                    Slide {s.slideNum} • {s.title}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {s.layout}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-stone-900 font-display">
                    {s.headline}
                  </h4>
                  <p className="text-[11px] text-purple-900 font-medium">
                    {s.subhead}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100 text-xs text-stone-700 whitespace-pre-line font-sans leading-relaxed">
                  {s.body}
                </div>

                <div className="text-[11px] text-stone-500 bg-purple-50/40 p-2.5 rounded-xl border border-purple-100/60">
                  <strong className="text-purple-900">Canva Tip:</strong> {s.canvaTip}
                </div>
              </div>

              <button
                onClick={() => {
                  const text = `SLIDE ${s.slideNum}: ${s.headline}\n${s.subhead}\n\n${s.body}`;
                  copyToClipboard(text, `slide-${s.slideNum}`);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition cursor-pointer"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied Slide Content' : 'Copy Text for Canva'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
