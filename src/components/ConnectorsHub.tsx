import React, { useState, useEffect } from 'react';
import {
  Cable,
  Mail,
  Mic,
  Cpu,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Radio,
  ArrowRight,
  Zap,
  Server,
  RefreshCw,
  Sliders,
  Layers,
  Sparkles
} from 'lucide-react';
import { GmailManager } from './GmailManager';
import { WhisperLTM } from './WhisperLTM';
import { LocalLLMManager } from './LocalLLMManager';
import { ActiveTab } from './Header';

export type ConnectorType = 'gmail' | 'whisper' | 'local-llm';

interface ConnectorsHubProps {
  initialConnector?: ConnectorType;
  onNavigateTab?: (tab: ActiveTab) => void;
}

export const ConnectorsHub: React.FC<ConnectorsHubProps> = ({
  initialConnector = 'gmail',
  onNavigateTab
}) => {
  const [activeConnector, setActiveConnector] = useState<ConnectorType>(initialConnector);
  const [whisperStatus, setWhisperStatus] = useState<any>(null);
  const [llmStatus, setLlmStatus] = useState<any>(null);

  useEffect(() => {
    // Probe background status of connectors
    fetch('/api/whisper/status')
      .then((r) => r.json())
      .then((d) => setWhisperStatus(d))
      .catch(() => {});

    fetch('/api/local-llm/status')
      .then((r) => r.json())
      .then((d) => setLlmStatus(d))
      .catch(() => {});
  }, []);

  const connectors = [
    {
      id: 'gmail' as ConnectorType,
      name: 'Google Workspace Gmail Connector',
      shortName: 'Gmail Hub',
      category: 'Communications & Dispatch',
      icon: Mail,
      badge: 'Official OAuth 2.0',
      badgeColor: 'bg-red-100 text-red-700 border-red-200',
      iconBg: 'bg-red-50 text-red-600 border-red-200',
      activeBorder: 'border-red-500 shadow-md shadow-red-500/10',
      statusText: 'OAuth Authenticated & In-Memory Token Client',
      statusColor: 'text-emerald-600',
      description: 'Synchronize official DepEd notices, dispatch 3-term BOW submissions to school heads, and email SF9 report cards.'
    },
    {
      id: 'whisper' as ConnectorType,
      name: 'Open-Source Whisper ASR & LTM Connector',
      shortName: 'Whisper LTM',
      category: 'Speech-to-Text & Audio Memory',
      icon: Mic,
      badge: 'Open Source Engine',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      iconBg: 'bg-amber-50 text-amber-700 border-amber-200',
      activeBorder: 'border-amber-500 shadow-md shadow-amber-500/10',
      statusText: whisperStatus?.backend ? `Acoustic Engine: ${whisperStatus.backend}` : 'Microphone & Acoustic Models Ready',
      statusColor: 'text-emerald-600',
      description: 'Continuous classroom audio dictation, Multilingual (English, Tagalog, Cebuano), and persistent Long-Term Memory.'
    },
    {
      id: 'local-llm' as ConnectorType,
      name: 'Local LLM & Offline Inference Connector',
      shortName: 'Local LLM',
      category: 'Self-Hosted AI & Ollama',
      icon: Cpu,
      badge: 'Offline Inference',
      badgeColor: 'bg-blue-100 text-[#0038A8] border-blue-200',
      iconBg: 'bg-blue-50 text-[#0038A8] border-blue-200',
      activeBorder: 'border-[#0038A8] shadow-md shadow-blue-500/10',
      statusText: llmStatus?.endpoint ? `Endpoint: ${llmStatus.endpoint} (${llmStatus.model || 'llama3'})` : 'Ollama & Rule Engine Ready',
      statusColor: 'text-emerald-600',
      description: 'Host private offline language models (Llama 3, Mistral, Gemma) without transmitting school data externally.'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Top Banner explaining the modular connector design */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-[#002776] text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden border-b-4 border-[#FCD116]">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCD116] text-stone-950 text-xs font-extrabold uppercase tracking-wider">
            <Cable className="w-4 h-4" />
            Modular Connectors & Integration Console
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            System Connectors Hub
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            External communications and AI services are organized as decoupled, self-contained connectors. Manage Google Workspace Gmail, Open-Source Whisper ASR, and Local LLM backends independently without altering core Philippine DepEd curriculum workflows.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-stone-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Decoupled Architecture
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-stone-200 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#FCD116]" />
              3 Connectors Registered
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-stone-200 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-blue-300" />
              DepEd SY 2026–2027 Isolated
            </span>
          </div>
        </div>
      </div>

      {/* 3 Connector Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {connectors.map((c) => {
          const isSelected = activeConnector === c.id;
          const IconComp = c.icon;

          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveConnector(c.id)}
              className={`p-6 rounded-3xl border text-left transition-all duration-200 flex flex-col justify-between space-y-4 cursor-pointer relative bg-white ${
                isSelected
                  ? `${c.activeBorder} ring-2 ring-stone-900/5`
                  : 'border-stone-200 hover:border-stone-300 hover:shadow-sm opacity-90'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${c.iconBg}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase tracking-wider ${c.badgeColor}`}>
                    {c.badge}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    {c.category}
                  </span>
                  <h3 className="text-base font-extrabold text-stone-900 mt-0.5">
                    {c.name}
                  </h3>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                  {c.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-bold">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${c.statusColor}`} />
                  <span className="text-stone-700 truncate max-w-[180px]">{c.statusText}</span>
                </div>

                <span
                  className={`text-xs font-bold flex items-center gap-1 transition ${
                    isSelected ? 'text-stone-950' : 'text-stone-400'
                  }`}
                >
                  {isSelected ? 'Active' : 'Open'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Connector Isolation Container */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-extrabold text-stone-500 uppercase tracking-wider">
              Connected Workspace:
            </span>
            <span className="text-xs font-bold text-stone-900 px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200">
              {connectors.find((c) => c.id === activeConnector)?.name}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
            {connectors.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveConnector(c.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeConnector === c.id
                    ? 'bg-white text-stone-950 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {c.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-module render */}
        <div className="animate-fade-in">
          {activeConnector === 'gmail' && <GmailManager />}
          {activeConnector === 'whisper' && <WhisperLTM onNavigateTab={onNavigateTab} />}
          {activeConnector === 'local-llm' && <LocalLLMManager />}
        </div>
      </div>
    </div>
  );
};
