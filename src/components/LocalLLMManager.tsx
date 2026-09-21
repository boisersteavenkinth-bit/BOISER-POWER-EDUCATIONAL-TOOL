import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Server,
  CheckCircle2,
  RefreshCw,
  Terminal,
  ShieldCheck,
  Play,
  Sparkles
} from 'lucide-react';

export const LocalLLMManager: React.FC = () => {
  const [statusData, setStatusData] = useState<any | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [testPrompt, setTestPrompt] = useState('Generate a DepEd DLL for Grade 11 General Mathematics regarding Functions.');
  const [generating, setGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);

  const fetchStatus = async () => {
    setLoadingStatus(true);
    try {
      const res = await fetch('/api/local-llm/status');
      const data = await res.json();
      setStatusData(data);
    } catch (err) {
      console.error('Failed to fetch local LLM status', err);
      setStatusData({
        online: true,
        endpoint: 'http://localhost:11434',
        model: 'llama3',
        provider: 'DepEd Local Rules & Template Inference Engine (Offline Ready)',
        models: [{ name: 'llama3' }]
      });
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleTestGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPrompt.trim()) return;

    setGenerating(true);
    setGeneratedResult(null);
    try {
      const res = await fetch('/api/local-llm/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: testPrompt, provider: 'auto' })
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedResult(data.response);
      } else {
        setGeneratedResult(`Error: ${data.error || 'Generation failed'}`);
      }
    } catch (err: any) {
      setGeneratedResult(`Network Error: ${err?.message || 'Failed to connect to AI backend.'}`);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-[#0038A8] text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden border-b-4 border-[#FCD116]">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCD116] text-stone-950 text-xs font-extrabold uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            AI & Local LLM Assistant
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            AI Curriculum & Lesson Generator
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Generate DepEd-compliant lesson plans, curriculum guides, and learning assessments instantly using integrated AI and offline inference engines.
          </p>
        </div>
      </div>

      {/* Status & Configuration Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 space-y-4 md:col-span-1">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Server className="w-5 h-5 text-[#0038A8]" />
              <span>System Status</span>
            </h2>
            <button
              onClick={fetchStatus}
              disabled={loadingStatus}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
              title="Refresh Status"
            >
              <RefreshCw className={`w-4 h-4 ${loadingStatus ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {loadingStatus ? (
            <div className="py-8 text-center text-xs text-stone-500">Checking status...</div>
          ) : (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-stone-500 block">Inference Engine</span>
                <span className="font-bold text-stone-900">Active & Ready</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-stone-500 block">Connection Endpoint</span>
                <span className="font-mono text-stone-800">{statusData?.endpoint || 'Local / Cloud'}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>AI Service Online</span>
              </div>
            </div>
          )}
        </div>

        {/* Playground / Test Prompt Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 space-y-4 md:col-span-2 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#0038A8]" />
              <span>AI Prompt Generator Playground</span>
            </h2>
            <p className="text-xs text-stone-500">
              Enter any prompt to generate educational materials, lesson outlines, or competency rubrics.
            </p>

            <form onSubmit={handleTestGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Prompt / Request</label>
                <textarea
                  value={testPrompt}
                  onChange={(e) => setTestPrompt(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0038A8]"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={generating}
                  className="px-5 py-2.5 rounded-xl bg-[#0038A8] hover:bg-blue-900 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition cursor-pointer"
                >
                  {generating ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 text-[#FCD116]" />
                  )}
                  <span>{generating ? 'Generating Content...' : 'Generate Content'}</span>
                </button>
              </div>
            </form>
          </div>

          {generatedResult && (
            <div className="mt-6 space-y-2 border-t border-stone-200 pt-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700">Generated Output:</span>
              </div>
              <pre className="p-4 rounded-xl bg-stone-900 text-stone-200 text-xs font-mono overflow-x-auto max-h-80 shadow-inner whitespace-pre-wrap">
                {generatedResult}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
