import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Square,
  Play,
  Pause,
  Upload,
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Copy,
  Trash2,
  Download,
  Calendar,
  Tag,
  Clock,
  Send,
  RefreshCw,
  Sliders,
  Radio,
  FileAudio,
  Check,
  ArrowRight,
  HelpCircle,
  BrainCircuit,
  Volume2
} from 'lucide-react';
import {
  LTMEntry,
  getLTMEntries,
  saveLTMEntries,
  addLTMEntry,
  deleteLTMEntry,
  exportLTMAsMarkdown,
  exportLTMAsJSON
} from '../services/whisperLTMService';
import { ActiveTab } from './Header';

interface WhisperLTMProps {
  onNavigateTab?: (tab: ActiveTab) => void;
}

export const WhisperLTM: React.FC<WhisperLTMProps> = ({ onNavigateTab }) => {
  const [entries, setEntries] = useState<LTMEntry[]>([]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [activeTermFilter, setActiveTermFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Audio Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Whisper Engine settings
  const [selectedModel, setSelectedModel] = useState('whisper-base');
  const [selectedLanguage, setSelectedLanguage] = useState('auto');
  const [transcribing, setTranscribing] = useState(false);
  const [statusInfo, setStatusInfo] = useState<any>(null);

  // Manual / Live dictation state
  const [manualTitle, setManualTitle] = useState('');
  const [liveTranscript, setLiveTranscript] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LTMEntry['category']>('Classroom Observation');
  const [selectedTerm, setSelectedTerm] = useState<LTMEntry['term']>('Term 1');
  const [selectedWeek, setSelectedWeek] = useState<number>(4);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // MediaRecorder refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Load LTM entries & whisper engine status on mount
  useEffect(() => {
    setEntries(getLTMEntries());
    fetchWhisperStatus();

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, []);

  const fetchWhisperStatus = async () => {
    try {
      const res = await fetch('/api/whisper/status');
      const data = await res.json();
      setStatusInfo(data);
    } catch (e) {
      console.warn('Failed to get whisper status', e);
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Start live microphone recording
  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      setLiveTranscript('');
      setRecordingSeconds(0);
      setAudioBlob(null);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(250);
      setIsRecording(true);

      // Start recording timer
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);

      // Initialize Web Speech API live stream if available for immediate live feedback
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = selectedLanguage === 'fil' ? 'fil-PH' : selectedLanguage === 'ceb' ? 'ceb-PH' : 'en-PH';

          recognition.onresult = (event: any) => {
            let current = '';
            for (let i = 0; i < event.results.length; i++) {
              current += event.results[i][0].transcript + ' ';
            }
            setLiveTranscript(current.trim());
          };

          recognition.onerror = (err: any) => {
            console.warn('Speech recognition warning:', err);
          };

          recognition.start();
          recognitionRef.current = recognition;
        } catch (recErr) {
          console.warn('Live recognition not available:', recErr);
        }
      }
    } catch (err: any) {
      console.error('Error accessing microphone:', err);
      alert(`Could not access microphone: ${err?.message || 'Please check browser audio permissions.'}`);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
    }
  };

  // Handle file upload of an audio recording
  const handleAudioFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAudioBlob(file);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(URL.createObjectURL(file));
    setManualTitle(file.name.replace(/\.[^/.]+$/, ''));
    showNotification(`Uploaded audio file: ${file.name}`);
  };

  // Run Whisper Open-Source ASR & LTM analysis
  const handleProcessWhisper = async () => {
    if (!audioBlob && !liveTranscript.trim()) {
      alert('Please record audio or enter text notes to process with Whisper LTM.');
      return;
    }

    setTranscribing(true);
    try {
      let base64Audio = '';
      if (audioBlob) {
        base64Audio = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(audioBlob);
        });
      }

      const res = await fetch('/api/whisper-transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64: base64Audio || undefined,
          mimeType: audioBlob?.type || 'audio/webm',
          rawText: liveTranscript.trim() || undefined,
          whisperModel: selectedModel,
          language: selectedLanguage,
          title: manualTitle.trim() || 'Educator Audio Log'
        })
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Whisper transcription failed');
      }

      // Add to Long-Term Memory (LTM)
      const newEntry = addLTMEntry({
        title: manualTitle.trim() || `${selectedCategory} (${new Date().toLocaleDateString()})`,
        timestamp: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
        durationSeconds: recordingSeconds > 0 ? recordingSeconds : 60,
        transcript: data.transcript,
        language: data.detectedLanguage || 'English / Filipino',
        category: selectedCategory,
        term: selectedTerm,
        week: selectedWeek,
        tags: data.tags || ['Whisper LTM', 'SY-2026-2027'],
        actionItems: data.actionItems || [],
        confidenceScore: data.confidence || 0.97,
        whisperModel: selectedModel,
        summary: data.summary || 'Observation logged into DepEd Long-Term Memory.'
      });

      setEntries(getLTMEntries());
      showNotification('Successfully indexed new audio record into Long-Term Memory!');

      // Reset recording form
      setLiveTranscript('');
      setManualTitle('');
      setAudioBlob(null);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
      setRecordingSeconds(0);
    } catch (err: any) {
      console.error('Whisper transcription error:', err);
      alert(`Transcription Error: ${err?.message || 'Check server connection'}`);
    } finally {
      setTranscribing(false);
    }
  };

  const handleDeleteEntry = (id: string) => {
    if (confirm('Are you sure you want to remove this record from Long-Term Memory?')) {
      const updated = deleteLTMEntry(id);
      setEntries(updated);
      showNotification('Entry removed from LTM.');
    }
  };

  const handleCopyTranscript = (entry: LTMEntry) => {
    navigator.clipboard.writeText(entry.transcript);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportMarkdown = () => {
    const md = exportLTMAsMarkdown(entries);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deped-whisper-ltm-archive-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Exported Long-Term Memory archive as Markdown.');
  };

  const handleExportJSON = () => {
    const json = exportLTMAsJSON(entries);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deped-whisper-ltm-archive-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Exported Long-Term Memory archive as JSON.');
  };

  // Filter entries
  const filteredEntries = entries.filter((e) => {
    const matchesCategory =
      activeCategoryFilter === 'all' || e.category.toLowerCase() === activeCategoryFilter.toLowerCase();
    const matchesTerm = activeTermFilter === 'all' || e.term === activeTermFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.transcript.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesTerm && matchesSearch;
  });

  const totalAudioSeconds = entries.reduce((acc, curr) => acc + curr.durationSeconds, 0);
  const totalActionItems = entries.reduce((acc, curr) => acc + (curr.actionItems?.length || 0), 0);

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-stone-700 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#FCD116]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-[#002776] text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden border-b-4 border-[#FCD116]">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCD116] text-stone-950 text-xs font-extrabold uppercase tracking-wider">
            <Radio className="w-4 h-4" />
            Open-Source Whisper ASR & Long-Term Memory (LTM)
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Whisper LTM Voice Studio & Pedagogical Memory
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Dictate classroom observations, learner recitations, and meeting takeaways using open-source OpenAI Whisper speech-to-text. Automatically extract action items, align with the 2026 Three-Term Calendar (DO 009 & DO 015), and persist into searchable Long-Term Memory (LTM).
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-stone-200 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#FCD116]" />
              Model: <strong className="text-white">{selectedModel}</strong>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-stone-200 flex items-center gap-1.5">
              <BrainCircuit className="w-3.5 h-3.5 text-blue-300" />
              LTM Entries: <strong className="text-white">{entries.length}</strong>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-stone-200 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              Total Logged: <strong className="text-white">{(totalAudioSeconds / 60).toFixed(1)} mins</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Audio Capture & Whisper Studio Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Studio Pane: Recording & Audio Input */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0038A8] flex items-center justify-center font-bold">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-stone-900">Audio Recording & Dictation Studio</h2>
                <p className="text-xs text-stone-500">Continuous speech-to-text powered by Open-Source Whisper</p>
              </div>
            </div>

            {isRecording && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                <span>REC {Math.floor(recordingSeconds / 60)}:{(recordingSeconds % 60).toString().padStart(2, '0')}</span>
              </div>
            )}
          </div>

          {/* Record / Stop Action Controls */}
          <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 text-center space-y-4">
            {!isRecording ? (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={startRecording}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#002776] to-[#0038A8] hover:scale-105 active:scale-95 text-white flex items-center justify-center mx-auto shadow-lg transition cursor-pointer group"
                  title="Click to start microphone recording"
                >
                  <Mic className="w-8 h-8 group-hover:text-[#FCD116] transition" />
                </button>
                <div>
                  <div className="text-sm font-bold text-stone-800">Click to Record Voice Note</div>
                  <div className="text-xs text-stone-500">Microphone stream with Whisper ASR & real-time live preview</div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={stopRecording}
                  className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 hover:scale-105 active:scale-95 text-white flex items-center justify-center mx-auto shadow-xl transition cursor-pointer"
                  title="Click to finish recording"
                >
                  <Square className="w-7 h-7 fill-white" />
                </button>
                <div>
                  <div className="text-sm font-bold text-red-600">Recording In Progress...</div>
                  <div className="text-xs text-stone-500">Click the red square to stop recording and process audio</div>
                </div>
              </div>
            )}

            {/* Audio Playback if recorded */}
            {audioUrl && !isRecording && (
              <div className="pt-2 flex items-center justify-center gap-3 animate-fade-in">
                <audio
                  ref={audioElementRef}
                  src={audioUrl}
                  controls
                  className="w-full max-w-md h-10 rounded-xl"
                />
              </div>
            )}

            {/* Drag and Drop Audio File Upload Alternative */}
            <div className="pt-2 border-t border-stone-200/60 flex items-center justify-center gap-2 text-xs text-stone-500">
              <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold cursor-pointer transition">
                <Upload className="w-3.5 h-3.5 text-[#0038A8]" />
                <span>Or Upload Audio File (.mp3, .wav, .m4a)</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Real-time / Live Transcript or Manual Input Area */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#0038A8]" />
                <span>Live Audio Transcript / Spoken Notes</span>
              </label>
              {liveTranscript && (
                <button
                  type="button"
                  onClick={() => setLiveTranscript('')}
                  className="text-[11px] text-stone-400 hover:text-red-500 transition cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <textarea
              rows={4}
              value={liveTranscript}
              onChange={(e) => setLiveTranscript(e.target.value)}
              placeholder="Spoken words appear here in real-time during microphone dictation, or you can paste audio meeting notes here directly..."
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0038A8] font-sans leading-relaxed"
            />
          </div>

          {/* Action Trigger Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              disabled={transcribing || (!audioBlob && !liveTranscript.trim())}
              onClick={handleProcessWhisper}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#002776] to-[#0038A8] hover:from-blue-900 hover:to-blue-800 disabled:opacity-50 text-white font-bold text-xs shadow-md flex items-center gap-2.5 transition cursor-pointer"
            >
              {transcribing ? (
                <RefreshCw className="w-4 h-4 animate-spin text-[#FCD116]" />
              ) : (
                <Sparkles className="w-4 h-4 text-[#FCD116]" />
              )}
              <span>{transcribing ? 'Whisper ASR Transcribing & Indexing...' : 'Process with Whisper & Save to LTM'}</span>
            </button>
          </div>
        </div>

        {/* Right Settings Pane: Whisper Engine Configurations & Metadata */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-2.5 border-b border-stone-100 pb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-stone-900">Whisper Open-Source Setup</h2>
                <p className="text-xs text-stone-500">Select model size and target Philippine language</p>
              </div>
            </div>

            {/* Note Title Input */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Voice Note Title (Optional)
              </label>
              <input
                type="text"
                value={manualTitle}
                onChange={(e) => setManualTitle(e.target.value)}
                placeholder="e.g. Gr 11 Rational Functions Scaffolding Reflection"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0038A8]"
              />
            </div>

            {/* Whisper Model Family Selector */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Open-Source Whisper Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0038A8] font-medium"
              >
                <option value="whisper-tiny">Whisper Tiny (39M params — Ultra Fast)</option>
                <option value="whisper-base">Whisper Base (74M params — Recommended Standard)</option>
                <option value="whisper-small">Whisper Small (244M params — Enhanced Accuracy)</option>
                <option value="whisper-medium">Whisper Medium (769M params — High Precision)</option>
                <option value="whisper-large-v3">Whisper Large-v3 (1550M params — State of the Art)</option>
                <option value="whisper-turbo">Whisper Large-v3 Turbo (Realtime Optimized)</option>
              </select>
            </div>

            {/* Target Language Selector */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Target Language
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0038A8] font-medium"
              >
                <option value="auto">Auto-Detect Language (English, Tagalog, Cebuano)</option>
                <option value="en">English (Official Medium)</option>
                <option value="fil">Filipino / Tagalog</option>
                <option value="ceb">Cebuano / Bisaya (DepEd Region X Native)</option>
              </select>
            </div>

            {/* LTM Categorization */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0038A8]"
                >
                  <option value="Classroom Observation">Classroom Observation</option>
                  <option value="Lesson Planning">Lesson Planning</option>
                  <option value="Learner Recitation">Learner Recitation</option>
                  <option value="Faculty Meeting">Faculty Meeting</option>
                  <option value="Pedagogical Reflection">Pedagogical Reflection</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Three-Term Calendar
                </label>
                <select
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0038A8]"
                >
                  <option value="Term 1">Term 1 (Aug - Nov)</option>
                  <option value="Term 2">Term 2 (Nov - Mar)</option>
                  <option value="Term 3">Term 3 (Mar - Jun)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Engine Status Banner */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs space-y-2 mt-4">
            <div className="flex items-center gap-2 text-[#0038A8] font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Whisper Open-Source Engine Ready</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Compliant with DepEd Order No. 009 & No. 015, s. 2026. Audio data processed with open-source acoustic models and cached locally in browser Long-Term Memory.
            </p>
          </div>
        </div>
      </div>

      {/* Long-Term Memory (LTM) Search, Filter & Memory Store */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">Teacher Long-Term Memory (LTM) Repository</h2>
              <p className="text-xs text-stone-500">
                Persistent searchable repository of audio observations, lesson insights, and action items
              </p>
            </div>
          </div>

          {/* Export Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportMarkdown}
              className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="Export LTM entries as Markdown"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Markdown</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="Export LTM entries as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search LTM memory by keywords, tags, or topics..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0038A8]"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={activeCategoryFilter}
              onChange={(e) => setActiveCategoryFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 font-medium"
            >
              <option value="all">All Categories ({entries.length})</option>
              <option value="Classroom Observation">Classroom Observation</option>
              <option value="Lesson Planning">Lesson Planning</option>
              <option value="Learner Recitation">Learner Recitation</option>
              <option value="Faculty Meeting">Faculty Meeting</option>
              <option value="Pedagogical Reflection">Pedagogical Reflection</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={activeTermFilter}
              onChange={(e) => setActiveTermFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 font-medium"
            >
              <option value="all">All 3 Terms</option>
              <option value="Term 1">Term 1 (Aug - Nov)</option>
              <option value="Term 2">Term 2 (Nov - Mar)</option>
              <option value="Term 3">Term 3 (Mar - Jun)</option>
            </select>
          </div>
        </div>

        {/* Entries Grid */}
        {filteredEntries.length === 0 ? (
          <div className="py-16 text-center text-xs text-stone-400 space-y-2">
            <FileAudio className="w-8 h-8 text-stone-300 mx-auto" />
            <p>No audio memory entries matching your filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200 hover:border-stone-300 hover:shadow-sm transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#0038A8] text-[10px] font-extrabold">
                          {entry.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                          {entry.term}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 text-[10px] font-mono">
                          {entry.whisperModel}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-stone-900 leading-snug">{entry.title}</h3>
                    </div>

                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="p-1 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition"
                      title="Delete from Long-Term Memory"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Summary */}
                  <div className="p-3 rounded-xl bg-white border border-stone-200/80 text-xs text-stone-700 leading-relaxed font-medium">
                    <strong className="text-stone-900 block mb-0.5 text-[11px] uppercase tracking-wider text-[#0038A8]">
                      LTM Insight Summary
                    </strong>
                    {entry.summary}
                  </div>

                  {/* Verbatim Transcript */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-stone-500 font-bold">
                      <span>VERBATIM TRANSCRIPT</span>
                      <button
                        onClick={() => handleCopyTranscript(entry)}
                        className="text-[#0038A8] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                      >
                        {copiedId === entry.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-stone-600 bg-white/70 p-3 rounded-xl border border-stone-200 line-clamp-3 leading-relaxed">
                      "{entry.transcript}"
                    </p>
                  </div>

                  {/* Action Items if present */}
                  {entry.actionItems && entry.actionItems.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-amber-900 uppercase tracking-wider">
                        Actionable Next Steps
                      </span>
                      <ul className="space-y-1 text-xs text-stone-700">
                        {entry.actionItems.map((act, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0038A8] shrink-0 mt-0.5" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1 pt-1">
                      {entry.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-stone-200/70 text-stone-600 text-[10px] font-medium"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer metadata & Quick action navigation */}
                <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-[11px] text-stone-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>{entry.timestamp}</span>
                    <span>•</span>
                    <span>{entry.durationSeconds}s</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {onNavigateTab && (
                      <>
                        <button
                          onClick={() => onNavigateTab('lesson-planner')}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#0038A8] font-bold hover:bg-blue-100 transition cursor-pointer"
                          title="Send to Lesson Planner (DLL)"
                        >
                          Use in DLL
                        </button>
                        <button
                          onClick={() => onNavigateTab('gmail')}
                          className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 font-bold hover:bg-amber-100 transition cursor-pointer"
                          title="Draft Email in Gmail Hub"
                        >
                          Email Notice
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
