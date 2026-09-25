import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Award, Volume2, VolumeX, Building, GraduationCap } from 'lucide-react';
import { speakWithCebuanoMaleVoice, stopCebuanoMaleVoice } from '../services/boiserVoiceService';

export const BoiserEmpireTaglineHeader: React.FC = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakTagline = () => {
    setIsSpeaking(true);
    const text = "Maayong adlaw sa tanan! With utmost respect and humility, welcome to LNNCHS and Division Wide Boiser Empire System. B.O.I.S.E.R.: Building Organizational Intelligence for Sustainable Educational Results.";
    speakWithCebuanoMaleVoice(text, {
      appendTagline: true,
      rate: 0.88,
      pitch: 0.86,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  const stopTagline = () => {
    stopCebuanoMaleVoice();
    setIsSpeaking(false);
  };

  return (
    <div className="bg-gradient-to-r from-stone-950 via-[#092B62] to-[#001744] text-white px-4 py-3 border-b-2 border-[#FCD116] shadow-md select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Welcoming Note & Full Acronym */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-[#FCD116] shrink-0 shadow-inner">
            <GraduationCap className="w-5 h-5 text-[#FCD116]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-black tracking-wider uppercase">
                🌟 LNNCHS &amp; Division Wide Portal
              </span>
              <span className="text-xs sm:text-sm font-black text-white">
                BOISER EMPIRE TAGLINE:
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#FCD116]">
                B.O.I.S.E.R. (Building Organizational Intelligence for Sustainable Educational Results)
              </span>
            </div>
            <p className="text-[11px] text-blue-200 font-medium mt-0.5">
              Welcome, Respected Teachers, Advisers, and Master Creator! Fully optimized for LNNCHS and expandable division-wide.
            </p>
          </div>
        </div>

        {/* Audio / Voice Welcoming Note */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              if (isSpeaking) stopTagline();
              else speakTagline();
            }}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl text-xs font-black shadow transition cursor-pointer flex items-center gap-1.5"
            title="Listen to Tagline Welcoming Note"
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isSpeaking ? 'Stop Audio' : 'Welcome Voice Note'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
