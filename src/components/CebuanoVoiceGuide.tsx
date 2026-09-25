import React, { useState } from 'react';
import { Volume2, VolumeX, Mic, Sparkles } from 'lucide-react';
import {
  speakWithCebuanoMaleVoice,
  stopCebuanoMaleVoice,
  PRESET_VOICE_GUIDES,
  BOISER_MANDATORY_TAGLINE
} from '../services/boiserVoiceService';

interface CebuanoVoiceGuideProps {
  guideKey?: keyof typeof PRESET_VOICE_GUIDES;
  customText?: string;
  label?: string;
  compact?: boolean;
}

export const CebuanoVoiceGuide: React.FC<CebuanoVoiceGuideProps> = ({
  guideKey = 'welcome',
  customText,
  label = 'Voice Guide (Cebuano Male)',
  compact = false
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopCebuanoMaleVoice();
      setIsPlaying(false);
      return;
    }

    const textToSpeak = customText || PRESET_VOICE_GUIDES[guideKey];
    setIsPlaying(true);
    speakWithCebuanoMaleVoice(textToSpeak, {
      appendTagline: true,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false)
    });
  };

  if (compact) {
    return (
      <button
        onClick={handleTogglePlay}
        className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition cursor-pointer ${
          isPlaying
            ? 'bg-amber-400 text-stone-950 ring-2 ring-amber-300 animate-pulse'
            : 'bg-stone-900/80 hover:bg-stone-900 text-amber-300 border border-amber-400/40'
        }`}
        title="Listen to calm Cebuano-accented voice guide"
      >
        {isPlaying ? <VolumeX className="w-3.5 h-3.5 text-stone-950" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
        <span>{isPlaying ? 'Stop Audio' : label}</span>
      </button>
    );
  }

  return (
    <div className="bg-gradient-to-r from-stone-900 via-blue-950 to-stone-900 border-2 border-amber-400/60 rounded-2xl p-4 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isPlaying ? 'bg-amber-400 text-stone-950 animate-bounce' : 'bg-white/10 text-amber-300'}`}>
          <Volume2 className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase text-amber-300 tracking-wide">
              🎙️ Calm Cebuano-Accented Audio Guide
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold">
              Male Voice • Tagline Appended
            </span>
          </div>
          <p className="text-[11px] text-stone-300 mt-0.5 line-clamp-1 italic">
            "{BOISER_MANDATORY_TAGLINE}"
          </p>
        </div>
      </div>

      <button
        onClick={handleTogglePlay}
        className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition cursor-pointer shrink-0 ${
          isPlaying
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-stone-950 font-black shadow-md'
        }`}
      >
        {isPlaying ? (
          <>
            <VolumeX className="w-4 h-4" />
            <span>Mute / Stop Voice</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4" />
            <span>Listen to Narration</span>
          </>
        )}
      </button>
    </div>
  );
};
