import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  BookOpen, 
  CheckCircle2, 
  Lock, 
  FileText, 
  Volume2, 
  VolumeX, 
  ArrowRight,
  Heart,
  Award
} from 'lucide-react';
import { speakWithCebuanoMaleVoice, stopCebuanoMaleVoice } from '../services/boiserVoiceService';

export const BoiserPosterGuideBanner: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'tl' | 'ceb'>('en');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakPoster = (text: string) => {
    setIsSpeaking(true);
    speakWithCebuanoMaleVoice(text, {
      appendTagline: true,
      rate: 0.88,
      pitch: 0.86,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  const stopPosterSpeech = () => {
    stopCebuanoMaleVoice();
    setIsSpeaking(false);
  };

  const content = {
    en: {
      title: '🌟 LNNCHS OFFICIAL TEMPLATE & BOISER EMPIRE POSTER GUIDE',
      welcome: 'Welcome, Respected Teachers and Advisers of Lanao del Norte National Comprehensive High School (LNNCHS)!',
      tagline: 'BOISER EMPIRE: Brilliant, Optimized, Intelligent, Secure, Efficient, and Resilient Educational Systems for DepEd Region X.',
      boiserMeaning: [
        { letter: 'B', title: 'Brilliant & Balanced', desc: 'Pedagogical mastery and advanced teaching frameworks.' },
        { letter: 'O', title: 'Optimized DepEd Standards', desc: 'Full compliance with SF1–SF10, DO 009 & 015 s. 2026.' },
        { letter: 'I', title: 'Intelligent LIS Data Sync', desc: 'Seamless student masterlist integration and verification.' },
        { letter: 'S', title: 'Secure Adviser Doors', desc: 'Door-to-door data isolation for advisers and Master Creator.' },
        { letter: 'E', title: 'Efficient ECR & ILAW', desc: 'Three-term grading calculators and Daily Lesson Log generators.' },
        { letter: 'R', title: 'Resilient PWA & Offline', desc: '100% offline capability with automated cloud backup.' }
      ],
      whyUse: [
        'Save hours of manual paperwork with 1-click DepEd SF1–SF10 Excel and Word exports.',
        'Protect sensitive learner data using strict adviser residence doors and Master Creator telemetry.',
        'Experience seamless offline-to-online synchronization across all school terminals.'
      ],
      warningTitle: '⚠️ CRITICAL WARNING: DO NOT DELETE OR ERASE!',
      warningDesc: 'DO NOT DELETE OR ERASE official LIS template attributes, headers, or structure. All formulas and data fields are protected by LNNCHS Data Governance & Boiser Empire Security Shields.'
    },
    tl: {
      title: '🌟 OPISYAL NA LNNCHS TEMPLATE AT BOISER EMPIRE POSTER GABAY',
      welcome: 'Maligayang pagdating, mga Kagalang-galang na Guro at Adviser ng LNNCHS!',
      tagline: 'BOISER EMPIRE: Matalino, Naaangkop, Ligtas, at Maaasahang Sistema para sa DepEd Region X.',
      boiserMeaning: [
        { letter: 'B', title: 'Brilliant & Balanced', desc: 'Ekspertong pagtuturo at makabagong pamamaraan.' },
        { letter: 'O', title: 'Optimized DepEd Standards', desc: 'Kumpletong alinsunod sa SF1–SF10, DO 009 & 015 s. 2026.' },
        { letter: 'I', title: 'Intelligent LIS Data Sync', desc: 'Maayos na integrasyon ng masterlist ng mga mag-aaral.' },
        { letter: 'S', title: 'Secure Adviser Doors', desc: 'Pribadong pinto para sa bawat adviser at Master Creator.' },
        { letter: 'E', title: 'Efficient ECR & ILAW', desc: 'Mabilis na sistema ng paggrado at aralin.' },
        { letter: 'R', title: 'Resilient PWA & Offline', desc: 'Gumagana kahit walang internet na may awtomatikong backup.' }
      ],
      whyUse: [
        'Magtipid ng oras sa pamamagitan ng 1-click SF1–SF10 Excel at Word exports.',
        'Protektahan ang pribadong data gamit ang secure na pinto ng mga adviser at Master Creator.',
        'Walang patid na operasyon offline man o online.'
      ],
      warningTitle: '⚠️ MAHALAGANG BABALA: HUWAG BURAHIN O TANGGALIN!',
      warningDesc: 'HUWAG BURAHIN O TANGGALIN ang mga opisyal na LIS template attributes at headers. Protektado ang lahat ng ito ng LNNCHS Data Governance at Boiser Empire Security Shields.'
    },
    ceb: {
      title: '🌟 OPISYAL NGA LNNCHS TEMPLATE UG BOISER EMPIRE POSTER GIYA',
      welcome: 'Malipayong pag-abot, mga Gitahud nga Magtutudlo ug Adviser sa LNNCHS!',
      tagline: 'BOISER EMPIRE: Maalamon, Hapsay, Luwas, ug Kasaligang Sistema sa Edukasyon para sa DepEd Region X.',
      boiserMeaning: [
        { letter: 'B', title: 'Brilliant & Balanced', desc: 'Ekspertong pagtudlo ug maayong pamaagi.' },
        { letter: 'O', title: 'Optimized DepEd Standards', desc: 'Hingpit nga pagsunod sa SF1–SF10, DO 009 & 015 s. 2026.' },
        { letter: 'I', title: 'Intelligent LIS Data Sync', desc: 'Hapsay nga pag-sync sa LIS student masterlists.' },
        { letter: 'S', title: 'Secure Adviser Doors', desc: 'Pribadong pultahan sa mga adviser ug Master Creator.' },
        { letter: 'E', title: 'Efficient ECR & ILAW', desc: 'Dali ug hapsay nga pagkuwenta sa grado ug leksyon.' },
        { letter: 'R', title: 'Resilient PWA & Offline', desc: 'Makapresenta ug offline mode nga naay auto-sync.' }
      ],
      whyUse: [
        'Makadaginot sa oras sa pagbuhat sa SF1–SF10 pinaagi sa 1-click Excel/Word exports.',
        'Panalipdi ang confidential data gamit ang adviser residence doors ug Master Creator telemetry.',
        'Hapsay ug walay kahasol nga operasyon sa tanang terminal.'
      ],
      warningTitle: '⚠️ MAHINUNGDANONG PASIDAAN: AYAW PAG-DELETE O PAG-ERASE!',
      warningDesc: 'AYAW PAG-DELETE O PAG-ERASE sa opisyal nga LIS template attributes ug headers. Gipanalipdan kini sa LNNCHS Data Governance ug Boiser Empire Security Shields.'
    }
  }[lang];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-950 via-[#002776] to-[#001438] p-6 sm:p-8 text-white shadow-2xl border-2 border-[#FCD116] mb-8 select-none">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCD116]/20 border border-[#FCD116]/40 text-[#FCD116] text-xs font-black tracking-wide">
            <Sparkles className="w-4 h-4 text-[#FCD116]" />
            <span>OFFICIAL LNNCHS TEMPLATE MASTER POSTER &amp; GUIDELINE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {content.title}
          </h2>
          <p className="text-xs text-blue-200 font-medium">{content.welcome}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 bg-white/10 p-1 rounded-2xl border border-white/20">
            {[
              { id: 'en', label: '🇬🇧 EN' },
              { id: 'tl', label: '🇵🇭 TL' },
              { id: 'ceb', label: '🌾 CEB' }
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => setLang(l.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                  lang === l.id ? 'bg-[#FCD116] text-stone-950 shadow' : 'text-white hover:bg-white/10'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              const fullText = `${content.welcome}. ${content.tagline}. Why use this app: ${content.whyUse.join('. ')}. Warning: ${content.warningDesc}`;
              if (isSpeaking) stopPosterSpeech();
              else speakPoster(fullText);
            }}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-2xl text-xs font-black shadow transition cursor-pointer flex items-center gap-1.5"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? 'Stop Audio' : 'Play Audio Poster'}</span>
          </button>
        </div>
      </div>

      {/* Boiser Tagline & Meaning of Each Letter */}
      <div className="py-6 border-b border-white/10 relative z-10 space-y-4">
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-cyan-400/30">
          <div className="text-[11px] uppercase font-black text-[#FCD116] tracking-wider mb-1">👑 Official Boiser Tagline</div>
          <p className="text-xs sm:text-sm font-extrabold text-white leading-relaxed">
            "{content.tagline}"
          </p>
        </div>

        <div>
          <h3 className="text-xs font-black text-cyan-300 uppercase tracking-wider mb-3">
            📖 BOISER Acronym Meaning (Pillar Guidelines for Teachers)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {content.boiserMeaning.map((item) => (
              <div key={item.letter} className="bg-stone-900/80 rounded-2xl p-3.5 border border-white/10 flex flex-col justify-between hover:border-cyan-400 transition">
                <div>
                  <div className="text-2xl font-black text-[#FCD116] mb-1 font-mono">{item.letter}</div>
                  <div className="text-xs font-extrabold text-white mb-1">{item.title}</div>
                  <p className="text-[10px] text-stone-300 leading-tight">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Teachers Need to Use My Boiser App & Do Not Delete Warning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 relative z-10">
        {/* Why Use Box */}
        <div className="bg-blue-900/40 border border-blue-400/30 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black text-cyan-200 uppercase">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Why Teachers Must Use the Boiser System</span>
          </div>
          <ul className="space-y-2 text-xs text-blue-100 font-medium">
            {content.whyUse.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <ArrowRight className="w-3.5 h-3.5 text-[#FCD116] shrink-0 mt-0.5" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DO NOT DELETE WARNING */}
        <div className="bg-red-950/60 border-2 border-red-500/50 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black text-red-300 uppercase animate-pulse">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>{content.warningTitle}</span>
          </div>
          <p className="text-xs text-red-100 font-medium leading-relaxed">
            {content.warningDesc}
          </p>
          <div className="pt-2 flex items-center gap-2 text-[10px] font-bold text-amber-300">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Master Creator: Steaven Kinth D. Boiser (LNNCHS Data Governance)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
