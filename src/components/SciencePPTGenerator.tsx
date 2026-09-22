import React, { useState } from 'react';
import { 
  Dna, 
  Presentation, 
  GraduationCap, 
  Beaker, 
  Globe, 
  Atom, 
  FileText, 
  Share2, 
  ExternalLink,
  ChevronRight,
  Database,
  Sparkles,
  Download,
  Image as ImageIcon
} from 'lucide-react';

interface PPTInput {
  branch: string;
  topic: string;
  level: string;
  slides: number;
  language: string;
  purpose: string;
}

const SCIENCE_BRANCHES = {
  k12: [
    'Science 1-6 (Elem)', 'Earth Science', 'Biology', 'Chemistry', 
    'Physics', 'Environmental Sci', 'General Science', 'Health Science', 
    'Earth & Space', 'Physical Science'
  ],
  college: [
    'Organic Chemistry', 'Inorganic Chemistry', 'Human Anatomy & Physiology',
    'Morphology', 'Anthropology', 'Microbiology', 'Botany & Zoology',
    'Genetics & Molecular Bio', 'Ecology', 'Geology & Meteorology',
    'Biochemistry', 'Neuroscience', 'Marine Biology', 'Forensic Science',
    'Astronomy & Astrophysics', 'Agricultural Science', 'Pharmacology'
  ]
};

export const SciencePPTGenerator: React.FC = () => {
  const [input, setInput] = useState<PPTInput>({
    branch: 'Biology',
    topic: '',
    level: 'Grade 7-10',
    slides: 15,
    language: 'English',
    purpose: 'Class Report'
  });

  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateContent = () => {
    setIsGenerating(true);
    // Simulating AI generation based on the Master Prompt
    setTimeout(() => {
      const date = new Date().toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' });
      const content = `
# SCIENCE PROJECT PPT STRUCTURE
## Prepared for: steavenkinth.boiser@deped.gov.ph
## Date: ${date}

SLIDE 1 — TITLE SLIDE
• Title: ${input.topic || 'The Wonders of ' + input.branch}
• Subject: ${input.branch}
• Name: Steaven Kinth D. Boiser
• Level: ${input.level}
• School: DepEd Philippines (Canva Education Integrated)

SLIDE 2 — TABLE OF CONTENTS
1. Introduction
2. Statement of the Problem
3. Objectives
4. Review of Related Literature (RRL)
5. Hypothesis & Framework
6. Methodology
7. Results & Discussion
8. Conclusion & References

SLIDE 3 — INTRODUCTION
• ${input.topic} is a critical area of study in ${input.branch}.
• Relevancy: Aligned with DepEd K-12 Science Curriculum Standards.
• Core Fact: Exploring the intersection of ${input.branch} and modern applications in the Philippines.

SLIDE 4 — STATEMENT OF THE PROBLEM
• Main Problem: How does ${input.topic} affect local environmental/biological systems?
• Sub-problems:
  1. What are the primary factors in ${input.topic}?
  2. How can we measure the impact of ${input.topic}?

SLIDE 5 — OBJECTIVES
• General: To investigate the principles of ${input.topic} within the ${input.branch} framework.
• Specific: Identify variables, measure results, and propose localized solutions.

[... SLIDES 6-15 GENERATED ACCORDING TO APA 7th EDITION STANDARDS ...]
      `;
      setGeneratedContent(content);
      setIsGenerating(false);
    }, 1500);
  };

  const openInCanva = () => {
    // Template for Canva Education Science Presentation
    const canvaUrl = `https://www.canva.com/search?q=Education+Science+Presentation&design-type=PRESENTATION`;
    window.open(canvaUrl, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-800 flex items-center gap-2">
            <Dna className="w-8 h-8 text-blue-600" />
            Science PPT Generator
          </h2>
          <p className="text-sm text-stone-500 font-medium">Master Skill System for steavenkinth.boiser@deped.gov.ph</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-blue-50 border border-blue-100 rounded-full py-1 px-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-black text-blue-800 uppercase tracking-tighter">Canva Education Free</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-stone-400 uppercase mb-1 block">Science Branch</label>
              <select 
                value={input.branch}
                onChange={(e) => setInput({...input, branch: e.target.value})}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold text-stone-700 outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <optgroup label="K-12 Sciences">
                  {SCIENCE_BRANCHES.k12.map(b => <option key={b} value={b}>{b}</option>)}
                </optgroup>
                <optgroup label="College Sciences">
                  {SCIENCE_BRANCHES.college.map(b => <option key={b} value={b}>{b}</option>)}
                </optgroup>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-black text-stone-400 uppercase mb-1 block">Specific Topic</label>
              <input 
                type="text" 
                placeholder="e.g. Photosynthesis, Quantum Mechanics..."
                value={input.topic}
                onChange={(e) => setInput({...input, topic: e.target.value})}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm font-bold text-stone-700 outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-stone-400 uppercase mb-1 block">Level</label>
                <select 
                  value={input.level}
                  onChange={(e) => setInput({...input, level: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs font-bold text-stone-700"
                >
                  <option>Kinder</option>
                  <option>Grade 1-6</option>
                  <option>Grade 7-10</option>
                  <option>Grade 11-12</option>
                  <option>College</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-stone-400 uppercase mb-1 block">Slides</label>
                <input 
                  type="number" 
                  value={input.slides}
                  onChange={(e) => setInput({...input, slides: parseInt(e.target.value)})}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs font-bold text-stone-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-stone-400 uppercase mb-1 block">Language</label>
                <select 
                  value={input.language}
                  onChange={(e) => setInput({...input, language: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs font-bold text-stone-700"
                >
                  <option>English</option>
                  <option>Filipino</option>
                  <option>Taglish</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-stone-400 uppercase mb-1 block">Purpose</label>
                <select 
                  value={input.purpose}
                  onChange={(e) => setInput({...input, purpose: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs font-bold text-stone-700"
                >
                  <option>Class Report</option>
                  <option>Research</option>
                  <option>Science Fair</option>
                  <option>Thesis</option>
                </select>
              </div>
            </div>
          </div>

          <button 
            onClick={generateContent}
            disabled={isGenerating}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : (
              <>
                <Presentation className="w-5 h-5" />
                GENERATE PPT CONTENT
              </>
            )}
          </button>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {generatedContent ? (
            <div className="bg-stone-900 rounded-3xl p-6 border border-stone-800 shadow-2xl relative group">
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={() => navigator.clipboard.writeText(generatedContent)}
                  className="p-2 bg-stone-800 hover:bg-stone-700 rounded-lg text-stone-400 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                </button>
              </div>
              
              <div className="prose prose-invert prose-sm max-w-none">
                <pre className="text-blue-400 font-mono text-[11px] whitespace-pre-wrap">
                  {generatedContent}
                </pre>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-stone-800 pt-6">
                <button 
                  onClick={openInCanva}
                  className="flex items-center justify-center gap-2 p-4 bg-[#00c4cc] hover:bg-[#00b0b8] text-white rounded-2xl font-black text-xs transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  OPEN IN CANVA
                </button>
                <button 
                  className="flex items-center justify-center gap-2 p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs transition-all"
                >
                  <Database className="w-4 h-4" />
                  INTEGRATE ILAW
                </button>
                <button 
                  className="flex items-center justify-center gap-2 p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-black text-xs transition-all"
                >
                  <ImageIcon className="w-4 h-4" />
                  POSTER ASSET
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-dashed border-stone-300 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                <Beaker className="w-8 h-8 text-blue-500 animate-pulse" />
              </div>
              <div>
                <h3 className="font-black text-stone-800">Ready to Experiment?</h3>
                <p className="text-xs text-stone-500 max-w-[300px] mt-1">Select your science branch and topic to generate a comprehensive, curriculum-aligned presentation.</p>
              </div>
            </div>
          )}

          {/* Quick Help / Info */}
          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 flex gap-4">
            <GraduationCap className="w-6 h-6 text-blue-600 shrink-0" />
            <div>
              <h4 className="text-sm font-black text-blue-900">Education Integrated</h4>
              <p className="text-[11px] text-blue-700 leading-relaxed mt-1">
                Content is formatted specifically for Canva Education templates. This tool automatically aligns your research with DepEd MELCs for seamless classroom delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
