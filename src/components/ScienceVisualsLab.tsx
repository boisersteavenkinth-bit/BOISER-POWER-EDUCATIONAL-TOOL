import React, { useState } from 'react';
import { 
  Palette, 
  ExternalLink, 
  Layers, 
  Image, 
  Compass, 
  ChevronRight, 
  Download, 
  Printer, 
  Search, 
  Database,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { ILAWCompletePlan } from '../types/ilawDO3';

interface ScienceVisualsLabProps {
  plan: ILAWCompletePlan;
}

export const ScienceVisualsLab: React.FC<ScienceVisualsLabProps> = ({ plan }) => {
  const { header } = plan;
  const isScience = header.learningArea.toLowerCase().includes('science');

  // Interactive 3D/5D Micro-Scope Model Visualizer States
  const [modelType, setModelType] = useState<'molecular' | 'cellular' | 'atomic' | 'process_cycle'>('molecular');
  const [zoom, setZoom] = useState(1.2);
  const [rotation, setRotation] = useState(45);
  const [colorMode, setColorMode] = useState<'natural' | 'fluorescent' | 'high_contrast'>('natural');

  // Custom flowchart editing
  const [flowchartSteps, setFlowchartSteps] = useState<string[]>([
    'Formulate Hypothesis',
    'Design Controlled Experiment',
    'Gather Empirical Data & Logs',
    'Perform Mathematical Analysis',
    'Draw Official Scientific Conclusion'
  ]);
  const [newStep, setNewStep] = useState('');

  const handleAddStep = () => {
    if (!newStep.trim()) return;
    setFlowchartSteps([...flowchartSteps, newStep.trim()]);
    setNewStep('');
  };

  const handleRemoveStep = (idx: number) => {
    setFlowchartSteps(flowchartSteps.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header Information Card */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="px-3 py-0.5 rounded-full bg-blue-700 text-white text-[10px] font-bold uppercase tracking-wider">
              Science Curriculum Module
            </span>
            <h3 className="text-xl font-bold font-serif text-stone-900 mt-1">
              Science Creative Flowcharts &amp; 3D/5D Photo Studio
            </h3>
            <p className="text-xs text-stone-500">
              Generate exact scientific flowcharts, interactive data tables, and high-fidelity 3D structural graphics.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const searchTxt = `Scientific diagram flowchart: ${header.lesson}`;
                window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(searchTxt)}`, '_blank');
              }}
              className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search Google 3D Photos</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`SCIENCE LESSON: ${header.lesson}\nFLOWCHART STEPS:\n${flowchartSteps.map((s, i) => `${i+1}. ${s}`).join('\n')}`);
                alert('Scientific metadata copied! Opening Canva Flowcharts...');
                window.open('https://canva.com', '_blank');
              }}
              className="px-3.5 py-2 bg-[#0084FF] hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Design in Canva</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Hand: Interactive 3D/5D Visualizer Space */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-black text-stone-800 uppercase tracking-wide">3D/5D Interactive Concept Modeler</span>
            </div>
            
            {/* View presets */}
            <div className="flex gap-1.5 bg-stone-100 p-1 rounded-xl">
              <button
                onClick={() => setModelType('molecular')}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${modelType === 'molecular' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-stone-600'}`}
              >
                Molecular
              </button>
              <button
                onClick={() => setModelType('cellular')}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${modelType === 'cellular' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-stone-600'}`}
              >
                Cellular
              </button>
              <button
                onClick={() => setModelType('atomic')}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${modelType === 'atomic' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-stone-600'}`}
              >
                Atomic
              </button>
            </div>
          </div>

          {/* Model Display Stage */}
          <div className="relative aspect-video rounded-2xl bg-stone-900 border-2 border-stone-950 flex flex-col items-center justify-center overflow-hidden shadow-inner group">
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
            
            {/* Status indicators */}
            <div className="absolute top-3 left-3 bg-stone-950/80 px-2.5 py-1 rounded-md text-[9px] font-mono text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5 shadow-md">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span>RENDERED MODEL: ACTIVE ({modelType.toUpperCase()})</span>
            </div>

            <div className="absolute top-3 right-3 flex gap-1.5">
              <span className="bg-stone-950/80 px-2 py-0.5 rounded-md text-[8px] font-mono text-stone-400">ZOOM: {zoom.toFixed(1)}x</span>
              <span className="bg-stone-950/80 px-2 py-0.5 rounded-md text-[8px] font-mono text-stone-400">ROTATION: {rotation}°</span>
            </div>

            {/* Model Artwork Renderer using vector shapes & scale transforms */}
            <div 
              style={{ 
                transform: `scale(${zoom}) rotate(${rotation}deg)`, 
                transition: 'transform 0.1s ease-out' 
              }}
              className="relative w-44 h-44 flex items-center justify-center"
            >
              {modelType === 'molecular' && (
                <div className="relative w-full h-full">
                  {/* Central atom */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full shadow-2xl transition duration-500 ${
                    colorMode === 'natural' ? 'bg-emerald-500 border-emerald-400' : colorMode === 'fluorescent' ? 'bg-rose-500 shadow-rose-500/50' : 'bg-stone-800'
                  } border-4 flex items-center justify-center text-white text-[10px] font-black`}>
                    O
                  </div>
                  {/* Bonds and side atoms */}
                  <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-blue-400 border-2 border-blue-300 flex items-center justify-center text-white text-[8px] font-black">H</div>
                  <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-blue-400 border-2 border-blue-300 flex items-center justify-center text-white text-[8px] font-black">H</div>
                  
                  {/* Bond Lines */}
                  <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-stone-400 -translate-x-12 -translate-y-6 rotate-45" />
                  <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-stone-400 translate-x-1 translate-y-4 rotate-45" />
                </div>
              )}

              {modelType === 'cellular' && (
                <div className="relative w-full h-full rounded-full border-4 border-emerald-600 bg-emerald-950/40 p-4 shadow-inner flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-purple-950/60 border-2 border-purple-500 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-rose-500 border border-white" />
                  </div>
                  <div className="absolute top-6 right-8 w-5 h-2 bg-yellow-400 rounded-full rotate-45" />
                  <div className="absolute bottom-8 left-6 w-5 h-2 bg-yellow-400 rounded-full -rotate-12" />
                  <div className="absolute bottom-6 right-10 w-3 h-3 bg-blue-400 rounded-full" />
                </div>
              )}

              {modelType === 'atomic' && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-red-600 border border-white flex items-center justify-center text-[8px] text-white font-black">
                    P+N
                  </div>
                  {/* Orbit rings */}
                  <div className="absolute w-28 h-28 rounded-full border border-stone-500/40 rotate-12" />
                  <div className="absolute w-36 h-36 rounded-full border border-stone-500/40 -rotate-45" />
                  {/* Electrons */}
                  <div className="absolute top-6 left-12 w-2.5 h-2.5 bg-blue-400 rounded-full shadow-md shadow-blue-500/40" />
                  <div className="absolute bottom-10 right-4 w-2.5 h-2.5 bg-blue-400 rounded-full shadow-md shadow-blue-500/40" />
                </div>
              )}
            </div>

            {/* Stage controls */}
            <div className="absolute bottom-3 inset-x-3 bg-stone-950/80 p-2.5 rounded-lg border border-stone-800 text-[10px] text-stone-300 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                <div className="flex items-center gap-1.5 flex-1">
                  <span>Zoom:</span>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="2.5" 
                    step="0.1" 
                    value={zoom} 
                    onChange={e => setZoom(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-stone-800 rounded-lg cursor-pointer h-1"
                  />
                </div>
                <div className="flex items-center gap-1.5 flex-1">
                  <span>Rotate:</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="360" 
                    value={rotation} 
                    onChange={e => setRotation(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-stone-800 rounded-lg cursor-pointer h-1"
                  />
                </div>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() => setColorMode('natural')}
                  className={`px-2 py-0.5 rounded text-[8px] font-bold ${colorMode === 'natural' ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-stone-400'}`}
                >
                  Natural
                </button>
                <button
                  onClick={() => setColorMode('fluorescent')}
                  className={`px-2 py-0.5 rounded text-[8px] font-bold ${colorMode === 'fluorescent' ? 'bg-rose-600 text-white' : 'bg-stone-800 text-stone-400'}`}
                >
                  Fluor
                </button>
              </div>
            </div>
          </div>

          {/* Model Metadata description */}
          <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs space-y-1">
            <span className="font-bold text-stone-800">Dynamic Description:</span>
            <p className="text-stone-600 leading-relaxed">
              Analyzing standard structural components for <strong className="text-emerald-800">{header.lesson}</strong>. Microscopic projection aligns to LNNCHS Unified Core Science Guidelines. Use standard Zoom and Rotate vectors above to highlight cell division and molecular formations to students.
            </p>
          </div>
        </div>

        {/* Right Hand: Science Flowchart Step Generator */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-black text-stone-800 uppercase tracking-wide">Interactive Cycle Flowchart</span>
            </div>

            <p className="text-xs text-stone-500">
              Arrange pedagogical steps for <strong className="text-stone-700">{header.lesson}</strong> to visually display the sequence of scientific events.
            </p>

            {/* List of flow steps */}
            <div className="space-y-2">
              {flowchartSteps.map((step, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-semibold text-emerald-950 transition group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[10px] font-black flex items-center justify-center shadow-2xs">
                      {idx + 1}
                    </span>
                    <span className="font-mono text-stone-800">{step}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveStep(idx)}
                    className="text-stone-400 hover:text-red-600 text-[10px] transition font-normal cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {/* Quick add step */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                placeholder="Enter next scientific step..."
                value={newStep}
                onChange={e => setNewStep(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddStep()}
                className="flex-1 p-2 border border-stone-300 rounded-xl text-xs focus:outline-hidden focus:ring-1 focus:ring-emerald-600 bg-white"
              />
              <button
                onClick={handleAddStep}
                className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl cursor-pointer transition"
              >
                Add Step
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 space-y-2.5">
            <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold block">Classroom Board Layout Template</span>
            <div className="p-3 bg-stone-900 text-amber-200 rounded-xl text-[10px] font-mono leading-relaxed space-y-1">
              <div>[START] -&gt; {flowchartSteps.join(' -> ')} -&gt; [END]</div>
            </div>
            <p className="text-[10px] text-stone-400 leading-snug">
              Instructors can project this cycle directly to classroom smartboards during teaching sessions.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
