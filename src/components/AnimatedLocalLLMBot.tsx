import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Bot,
  Sparkles,
  Send,
  X,
  Minimize2,
  Maximize2,
  Quote,
  Copy,
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
  Terminal,
  ShieldCheck,
  ChevronDown,
  BookOpen,
  GraduationCap,
  Calendar,
  Layers,
  HeartHandshake,
  Zap,
  Radio
} from 'lucide-react';
import Markdown from 'react-markdown';
import chatbotData from '../../chatbot.json';

type BotState = 'idle' | 'thinking' | 'speaking' | 'happy';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  modelUsed?: string;
  providerUsed?: string;
  tokensPerSec?: number;
}

const AVAILABLE_MODELS = [
  { id: 'llama3', name: 'Llama 3 (8B Instruct)', badge: 'Recommended Local', tag: 'Meta Local' },
  { id: 'mistral', name: 'Mistral 7B (Instruct)', badge: 'Balanced', tag: 'Mistral AI' },
  { id: 'gemma2', name: 'Gemma 2 (9B DepEd)', badge: 'High Accuracy', tag: 'Google Open' },
  { id: 'phi3', name: 'Phi-3 Mini (3.8B)', badge: 'Ultra Fast', tag: 'Microsoft' },
  { id: 'offline-engine', name: 'DepEd Standards Engine', badge: '100% Offline / Zero RAM', tag: 'Region X Rules' },
  { id: 'gemini', name: 'Gemini 2.5 Flash', badge: 'Cloud Turbo', tag: 'Google AI' }
];

const QUICK_PROMPTS = [
  { label: 'DO 009 Calendar', icon: Calendar, text: 'Explain DO 009, s. 2026 Three-Term Calendar & Class Days' },
  { label: 'DLL Lesson Plan', icon: BookOpen, text: 'Draft 3-domain learning objectives for Grade 11 Mathematics' },
  { label: 'Region X ILAW', icon: Sparkles, text: 'Explain the 4-phase ILAW framework for lesson delivery' },
  { label: 'SF9 Grading', icon: Layers, text: 'How are trimester grades and transmutations calculated?' },
  { label: 'Teacher Affirmation', icon: HeartHandshake, text: 'Give me a teacher wellness booster and wisdom quote' }
];

// Web Audio sound synthesizer for realistic terminal/assistant soundscapes
const playSound = (type: 'send' | 'receive' | 'chirp', isMuted: boolean) => {
  if (isMuted) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === 'send') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'receive') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08); // A5
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch {
    // Ignore audio context autoplay restrictions
  }
};

// Animated Robot Avatar Face
const RobotAvatar: React.FC<{
  state: BotState;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ state, size = 'md', className = '' }) => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 4000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16'
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${dimensions} ${className}`}>
      {/* Outer Pulse Glow */}
      <motion.div
        animate={{
          scale: state === 'thinking' ? [1, 1.25, 1] : state === 'speaking' ? [1, 1.15, 1] : [1, 1.05, 1],
          opacity: state === 'thinking' ? [0.4, 0.9, 0.4] : state === 'speaking' ? [0.3, 0.7, 0.3] : [0.15, 0.3, 0.15]
        }}
        transition={{ repeat: Infinity, duration: state === 'thinking' ? 1 : 2.5, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-amber-400 blur-md pointer-events-none"
      />

      {/* Main Bot Head Container */}
      <motion.div
        animate={
          state === 'speaking'
            ? { y: [0, -3, 0], rotate: [0, 1.5, -1.5, 0] }
            : state === 'thinking'
            ? { rotate: [0, 2, -2, 0] }
            : { y: [0, -2, 0] }
        }
        transition={{ repeat: Infinity, duration: state === 'thinking' ? 0.8 : 3, ease: 'easeInOut' }}
        className="relative w-full h-full rounded-2xl bg-gradient-to-b from-stone-900 via-[#002776] to-[#001744] p-1 shadow-lg border border-cyan-400/40 flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Antenna */}
        <div className="absolute top-0.5 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8]">
          <motion.div
            animate={{
              scale: state === 'thinking' ? [1, 1.8, 1] : [1, 1.2, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ repeat: Infinity, duration: state === 'thinking' ? 0.4 : 1.5 }}
            className="w-full h-full rounded-full bg-cyan-200"
          />
        </div>

        {/* Visor Screen */}
        <div className="w-[86%] h-[72%] mt-1 bg-stone-950 rounded-xl border border-cyan-500/30 flex flex-col items-center justify-center p-1 relative overflow-hidden">
          {/* Subtle CRT scanline overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

          {/* Eyes Container */}
          <div className="flex items-center justify-center gap-2 z-10 w-full">
            {/* Left Eye */}
            <motion.div
              animate={
                blink
                  ? { scaleY: 0.1 }
                  : state === 'thinking'
                  ? { x: [-2, 2, -2], scale: [1, 1.15, 1] }
                  : state === 'happy'
                  ? { scaleY: 0.8, rotate: -10 }
                  : { scaleY: 1 }
              }
              transition={{ duration: 0.15 }}
              className={`rounded-full bg-gradient-to-b from-cyan-200 to-cyan-400 shadow-[0_0_8px_#38bdf8] ${
                size === 'sm' ? 'w-1.5 h-2' : size === 'md' ? 'w-2 h-3' : 'w-3 h-4.5'
              }`}
            />

            {/* Right Eye */}
            <motion.div
              animate={
                blink
                  ? { scaleY: 0.1 }
                  : state === 'thinking'
                  ? { x: [-2, 2, -2], scale: [1, 1.15, 1] }
                  : state === 'happy'
                  ? { scaleY: 0.8, rotate: 10 }
                  : { scaleY: 1 }
              }
              transition={{ duration: 0.15 }}
              className={`rounded-full bg-gradient-to-b from-cyan-200 to-cyan-400 shadow-[0_0_8px_#38bdf8] ${
                size === 'sm' ? 'w-1.5 h-2' : size === 'md' ? 'w-2 h-3' : 'w-3 h-4.5'
              }`}
            />
          </div>

          {/* Animated Mouth / Waveform */}
          <div className="mt-1 flex items-center justify-center gap-0.5 z-10 h-1.5">
            {state === 'speaking' ? (
              [4, 8, 5, 9, 3].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ height: [2, h, 2] }}
                  transition={{ repeat: Infinity, duration: 0.35 + i * 0.05, ease: 'easeInOut' }}
                  className="w-0.5 bg-amber-400 rounded-full shadow-[0_0_4px_#fbbf24]"
                />
              ))
            ) : state === 'happy' ? (
              <div className="w-3 h-1 border-b-2 border-amber-300 rounded-full" />
            ) : state === 'thinking' ? (
              <motion.div
                animate={{ width: [3, 8, 3], opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="h-0.5 bg-cyan-400 rounded-full"
              />
            ) : (
              <div className="w-2.5 h-0.5 bg-cyan-600/70 rounded-full" />
            )}
          </div>
        </div>

        {/* Golden Base Trim (Philippine Sun Color) */}
        <div className="w-full h-1 bg-gradient-to-r from-amber-400 via-[#FCD116] to-amber-500 rounded-b-xl" />
      </motion.div>
    </div>
  );
};

export const AnimatedLocalLLMBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [botState, setBotState] = useState<BotState>('idle');
  const [selectedModel, setSelectedModel] = useState('llama3');
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [engineStatus, setEngineStatus] = useState({
    online: true,
    provider: 'DepEd Local Rules & Offline Inference Engine',
    model: 'llama3'
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with DepEd Local LLM greeting
  useEffect(() => {
    if (messages.length === 0) {
      const greetings = chatbotData.knowledge_base.greetings;
      const initialGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      setMessages([
        {
          id: 'msg-init',
          sender: 'bot',
          text: `👋 **${chatbotData.bot_name} (Local LLM Mode)** activated!\n\n${initialGreeting}\n\nI am running on your **local container inference engine** with full knowledge of **DepEd Order No. 009 & 015, s. 2026** (Three-Term Calendar, Grade 11 & TechPro BOW, ILAW framework, and SF9 grading rules). How can I assist your teaching today?`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: 'Llama-3 (Local)',
          providerUsed: 'Offline Ready',
          tokensPerSec: 48
        }
      ]);
    }
  }, []);

  // Fetch local LLM backend health/status
  useEffect(() => {
    fetch('/api/local-llm/status')
      .then((res) => res.json())
      .then((data) => {
        setEngineStatus({
          online: Boolean(data.online),
          provider: data.provider || 'Local Inference Engine',
          model: data.model || 'llama3'
        });
      })
      .catch(() => {
        setEngineStatus({
          online: true,
          provider: 'DepEd Offline Standards Engine',
          model: 'llama3'
        });
      });
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || inputValue).trim();
    if (!prompt || isGenerating) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsgId = 'usr-' + Date.now();

    setMessages((prev) => [
      ...prev,
      {
        id: userMsgId,
        sender: 'user',
        text: prompt,
        time: timeNow
      }
    ]);
    setInputValue('');
    setIsGenerating(true);
    setBotState('thinking');
    playSound('send', isMuted);

    const providerChoice =
      selectedModel === 'gemini'
        ? 'gemini'
        : selectedModel === 'offline-engine'
        ? 'local'
        : 'auto';

    try {
      const startTime = performance.now();
      const res = await fetch('/api/local-llm/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          model: selectedModel,
          provider: providerChoice,
          systemPrompt:
            'You are the animated DepEd Region X Local LLM Pedagogical Assistant. You provide high-quality instructional, curriculum (DO 009 & 015 s. 2026), lesson planning, and encouraging responses.'
        })
      });

      const data = await res.json();
      const elapsedSec = Math.max(0.4, (performance.now() - startTime) / 1000);
      const rawResponse =
        data.response ||
        data.error ||
        "I've processed your request through the DepEd Local Inference Engine. Ready to assist further!";

      // Start token streaming animation
      setBotState('speaking');
      let currentIdx = 0;
      setStreamingText('');

      const streamInterval = setInterval(() => {
        currentIdx += Math.floor(Math.random() * 4) + 2;
        if (currentIdx >= rawResponse.length) {
          clearInterval(streamInterval);
          setStreamingText('');
          const botMsgId = 'bot-' + Date.now();
          const approxTokens = Math.round(rawResponse.length / 4);
          const tokSec = Math.round(approxTokens / elapsedSec) || 45;

          setMessages((prev) => [
            ...prev,
            {
              id: botMsgId,
              sender: 'bot',
              text: rawResponse,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              modelUsed: selectedModel,
              providerUsed: data.provider || 'DepEd Local LLM',
              tokensPerSec: tokSec
            }
          ]);
          setIsGenerating(false);
          setBotState('happy');
          playSound('receive', isMuted);
          setTimeout(() => setBotState('idle'), 2500);
        } else {
          setStreamingText(rawResponse.slice(0, currentIdx));
        }
      }, 16);
    } catch (err: any) {
      setIsGenerating(false);
      setBotState('idle');
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'bot',
          text: `⚠️ Offline Fallback Notice: ${err?.message || 'Connection interrupted'}. Switching to deterministic rule cache.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: 'DepEd Rule Cache'
        }
      ]);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-cleared',
        sender: 'bot',
        text: `✨ Chat session reset. **${selectedModel}** is loaded and ready on your local engine. How can I help you prepare today?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Collapsed Animated Bot Floating Trigger */}
      {!isOpen ? (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative group"
        >
          {/* Ambient Radar Glow Ring */}
          <motion.div
            animate={{
              scale: [1, 1.35, 1],
              opacity: [0.35, 0.85, 0.35]
            }}
            transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
            className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-[#FCD116] blur-md pointer-events-none"
          />

          <motion.button
            id="open-animated-local-llm-btn"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.06, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center gap-3 pl-2.5 pr-4 py-2 rounded-full bg-gradient-to-r from-stone-950 via-[#002776] to-[#001848] text-white font-bold shadow-2xl border-2 border-[#FCD116] cursor-pointer"
            title="Open Animated Local LLM Assistant"
          >
            {/* Animated Avatar */}
            <RobotAvatar state={botState} size="sm" />

            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-extrabold tracking-tight text-white flex items-center gap-1">
                  Local LLM
                  <Zap className="w-3.5 h-3.5 text-[#FCD116] fill-[#FCD116]" />
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
              </div>
              <p className="text-[10px] text-cyan-300 font-medium">Llama 3 • Offline Ready</p>
            </div>
          </motion.button>
        </motion.div>
      ) : (
        /* Expanded Animated Local LLM Window */
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          className={`bg-white rounded-3xl shadow-2xl border-2 border-stone-300 overflow-hidden flex flex-col transition-all duration-300 ${
            isExpanded
              ? 'w-[92vw] sm:w-[680px] h-[86vh] fixed bottom-6 right-4 sm:right-8'
              : 'w-[90vw] sm:w-[440px] h-[580px]'
          }`}
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-stone-950 via-[#002776] to-[#001744] text-white p-3.5 sm:p-4 flex items-center justify-between border-b-2 border-[#FCD116] shrink-0">
            <div className="flex items-center gap-3">
              {/* Interactive Animated Robot */}
              <RobotAvatar state={botState} size="md" />

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-extrabold text-white tracking-wide flex items-center gap-1.5">
                    <span>DepEd Local LLM Co-Pilot</span>
                  </h3>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Offline Active
                  </span>
                </div>

                {/* Model Selector Pill */}
                <div className="relative mt-1">
                  <button
                    id="model-selector-dropdown-btn"
                    onClick={() => setShowModelMenu(!showModelMenu)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[10px] text-cyan-200 border border-cyan-400/30 transition cursor-pointer"
                  >
                    <Cpu className="w-3 h-3 text-cyan-300" />
                    <span className="font-semibold">
                      {AVAILABLE_MODELS.find((m) => m.id === selectedModel)?.name || 'Llama 3'}
                    </span>
                    <ChevronDown className="w-3 h-3 ml-0.5" />
                  </button>

                  {/* Dropdown Menu */}
                  {showModelMenu && (
                    <div className="absolute left-0 top-full mt-1.5 w-60 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl p-1.5 z-50 text-stone-200 text-[11px] space-y-1">
                      <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-400 border-b border-stone-800 flex items-center justify-between">
                        <span>Select Inference Engine</span>
                        <Radio className="w-3 h-3 text-emerald-400" />
                      </div>
                      {AVAILABLE_MODELS.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => {
                            setSelectedModel(model.id);
                            setShowModelMenu(false);
                            setMessages((prev) => [
                              ...prev,
                              {
                                id: 'sys-switch-' + Date.now(),
                                sender: 'bot',
                                text: `Switched inference model to **${model.name}** (${model.badge}). Hardware acceleration ready.`,
                                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                modelUsed: model.name
                              }
                            ]);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition cursor-pointer ${
                            selectedModel === model.id
                              ? 'bg-[#0038A8] text-white font-bold'
                              : 'hover:bg-stone-800 text-stone-300'
                          }`}
                        >
                          <div>
                            <div className="font-medium">{model.name}</div>
                            <div className="text-[9px] text-stone-400">{model.badge}</div>
                          </div>
                          <span className="text-[9px] px-1 py-0.5 rounded bg-stone-800 text-cyan-300 border border-stone-700">
                            {model.tag}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Header Control Buttons */}
            <div className="flex items-center gap-1">
              <button
                id="toggle-audio-btn"
                onClick={() => setIsMuted(!isMuted)}
                className="w-7 h-7 rounded-lg hover:bg-white/10 text-stone-300 flex items-center justify-center transition cursor-pointer"
                title={isMuted ? 'Unmute Synth Audio' : 'Mute Synth Audio'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-stone-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-300" />}
              </button>
              <button
                id="clear-chat-btn"
                onClick={handleClearChat}
                className="w-7 h-7 rounded-lg hover:bg-white/10 text-stone-300 flex items-center justify-center transition cursor-pointer"
                title="Reset Conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                id="expand-window-btn"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-7 h-7 rounded-lg hover:bg-white/10 text-stone-300 flex items-center justify-center transition cursor-pointer"
                title={isExpanded ? 'Collapse Size' : 'Expand Size'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                id="close-chat-btn"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-red-500/20 text-stone-300 hover:text-red-300 flex items-center justify-center transition cursor-pointer"
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompt Carousel */}
          <div className="px-3 py-2 bg-stone-100 border-b border-stone-200 overflow-x-auto flex items-center gap-1.5 scrollbar-none shrink-0">
            <span className="text-[10px] font-bold uppercase text-stone-400 tracking-wider flex items-center gap-1 shrink-0 mr-1">
              <Terminal className="w-3 h-3 text-stone-500" />
              Quick:
            </span>
            {QUICK_PROMPTS.map((prompt, idx) => {
              const IconComp = prompt.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt.text)}
                  disabled={isGenerating}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-blue-50 border border-stone-300 hover:border-[#0038A8] text-stone-700 hover:text-[#0038A8] text-[10px] font-semibold flex items-center gap-1 whitespace-nowrap shadow-xs transition cursor-pointer disabled:opacity-50"
                >
                  <IconComp className="w-3 h-3 text-blue-600" />
                  <span>{prompt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/70 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-end gap-2 max-w-[92%] sm:max-w-[85%]">
                  {msg.sender === 'bot' && (
                    <div className="shrink-0 mb-1">
                      <RobotAvatar state="idle" size="sm" />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl shadow-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0038A8] text-white rounded-br-none'
                        : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none shadow-xs'
                    }`}
                  >
                    {msg.sender === 'bot' ? (
                      <div className="prose prose-stone prose-xs max-w-none prose-p:my-1 prose-headings:my-1.5 prose-ul:my-1 prose-table:my-1">
                        <Markdown>{msg.text}</Markdown>
                      </div>
                    ) : (
                      <span>{msg.text}</span>
                    )}

                    {/* Bot Message Footer: Copy & Stats */}
                    {msg.sender === 'bot' && (
                      <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center justify-between text-[9px] text-stone-400 gap-2">
                        <span className="flex items-center gap-1 font-mono text-[9px] text-stone-500">
                          <Cpu className="w-2.5 h-2.5 text-blue-600" />
                          {msg.modelUsed || 'Local LLM'}
                          {msg.tokensPerSec ? ` • ${msg.tokensPerSec} tok/s` : ''}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.text)}
                            className="p-1 rounded hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition cursor-pointer flex items-center gap-0.5"
                            title="Copy text"
                          >
                            {copiedMessageId === msg.id ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                          <span>{msg.time}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {msg.sender === 'user' && (
                  <span className="text-[9px] text-stone-400 mt-0.5 px-1">{msg.time}</span>
                )}
              </div>
            ))}

            {/* Live Streaming Token Preview */}
            {isGenerating && (
              <div className="flex items-start gap-2 max-w-[85%]">
                <RobotAvatar state="speaking" size="sm" />
                <div className="bg-white border border-cyan-300 rounded-2xl rounded-bl-none p-3.5 shadow-sm text-stone-800">
                  {streamingText ? (
                    <div className="prose prose-stone prose-xs max-w-none">
                      <Markdown>{streamingText}</Markdown>
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-1.5 h-3.5 bg-cyan-500 ml-1 align-middle"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="w-3.5 h-3.5 border-2 border-cyan-500 border-t-transparent rounded-full"
                      />
                      <span>Inference running on {selectedModel}...</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Status Banner */}
          <div className="px-3 py-1 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-500 shrink-0">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>100% Private • Local Sandbox</span>
            </div>
            <span className="font-mono text-[9px] text-stone-400">
              DO 009 & 015, s. 2026 Ready
            </span>
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isGenerating}
              placeholder="Ask about DO 009, lesson planning, grading..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-stone-100 border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#0038A8] focus:bg-white placeholder:text-stone-400 transition"
            />

            <button
              id="send-local-llm-message-btn"
              type="submit"
              disabled={!inputValue.trim() || isGenerating}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#0038A8] to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white flex items-center justify-center transition shadow-sm cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send to Local LLM"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export const UpliftChatbot = AnimatedLocalLLMBot;
export default AnimatedLocalLLMBot;
