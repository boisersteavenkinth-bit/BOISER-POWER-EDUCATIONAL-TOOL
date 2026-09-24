import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Download,
  Printer,
  Palette,
  Layers,
  CheckCircle2,
  FileImage,
  Home,
  Folder,
  Settings,
  Plus,
  Sliders,
  X,
  Share2,
  Rotate3d,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PosterConfig {
  headline: string;
  subhead: string;
  category: string;
  bulletPoints: string[];
  motto: string;
  teacherName: string;
  schoolName: string;
  orientation: 'portrait' | 'landscape';
  colorTheme: 'blue-gold' | 'crimson-techpro' | 'emerald-science' | 'amber-academic' | 'violet-creative';
}

const THEMES = {
  'blue-gold': {
    name: 'DepEd Royal Blue & Gold',
    bgGradient: 'from-[#001f5c] via-[#0038A8] to-[#001440]',
    cardBg: 'bg-white text-stone-900',
    accentColor: '#FCD116',
    primaryColor: '#0038A8',
    secondaryColor: '#CE1126',
    border: 'border-[#FCD116]'
  },
  'crimson-techpro': {
    name: 'TechPro Crimson & Slate',
    bgGradient: 'from-[#4a0e17] via-[#8B0000] to-[#2b080d]',
    cardBg: 'bg-stone-900 text-stone-100',
    accentColor: '#FFD700',
    primaryColor: '#CE1126',
    secondaryColor: '#334155',
    border: 'border-red-400'
  },
  'emerald-science': {
    name: 'Science Emerald & Teal',
    bgGradient: 'from-[#064e3b] via-[#059669] to-[#022c22]',
    cardBg: 'bg-white text-stone-900',
    accentColor: '#6ee7b7',
    primaryColor: '#059669',
    secondaryColor: '#0d9488',
    border: 'border-emerald-300'
  },
  'amber-academic': {
    name: 'Academic Amber & Navy',
    bgGradient: 'from-[#451a03] via-[#b45309] to-[#291002]',
    cardBg: 'bg-white text-stone-900',
    accentColor: '#fbbf24',
    primaryColor: '#b45309',
    secondaryColor: '#1e3a8a',
    border: 'border-amber-400'
  },
  'violet-creative': {
    name: 'Arts & Media Violet',
    bgGradient: 'from-[#3b0764] via-[#7e22ce] to-[#24033e]',
    cardBg: 'bg-white text-stone-900',
    accentColor: '#f472b6',
    primaryColor: '#7e22ce',
    secondaryColor: '#c084fc',
    border: 'border-purple-300'
  }
};

const PRESETS: Record<string, Partial<PosterConfig>> = {
  announcement: {
    category: 'IMPORTANT NOTICE • DEPED SY 2026–2027',
    headline: 'TRIMESTER SUMMATIVE ASSESSMENT SCHEDULE',
    subhead: 'Official DepEd Order No. 009 & 015, s. 2026 Examination Week Guidelines',
    bulletPoints: [
      'Comprehensive Written Work (WW) accounts for 30% of your Trimester Evaluation.',
      'Performance Tasks (PT) authentic products and defense must be submitted on time.',
      'Quarterly Assessment (QA) objective examinations will follow designated schedules.',
      'Review sessions and consultation hours are available daily in the faculty room.'
    ],
    motto: '"Integrity in Evaluation, Excellence in Mastery — DepEd Region X"',
    colorTheme: 'blue-gold'
  },
  values: {
    category: 'DEPED CORE VALUES • MAKA-DIYOS, MAKATAO, MAKAKALIKASAN, MAKABANSA',
    headline: 'THE CODE OF ACADEMIC INTEGRITY',
    subhead: 'Upholding Honesty, Originality, and Ethical AI Stewardship in All Schoolwork',
    bulletPoints: [
      'Originality First: Create, compose, and solve using your own cognitive reasoning.',
      'Ethical AI Declaration: Disclose transparently any assistive generative AI tools utilized.',
      'Active Respect: Honor intellectual property through accurate academic citations.',
      'Accountability: Every student stands ready to defend and explain their submitted outputs.'
    ],
    motto: '"Tapat na Pagsisikap Tungo sa Matatag na Kinabukasan"',
    colorTheme: 'amber-academic'
  },
  labSafety: {
    category: 'STEM & TECHPRO WORKSHOP • SAFETY DIRECTIVE',
    headline: 'LABORATORY & WORKSHOP SAFETY RULES',
    subhead: 'Strengthened SHS Practical Training & Equipment Protocol',
    bulletPoints: [
      'Personal Protective Equipment (PPE) is mandatory prior to operating tools.',
      'Inspect all machine guards, emergency shut-offs, and wiring before startup.',
      'Zero Horseplay: Focus and clear communication are non-negotiable in shop areas.',
      'Report any chemical spill, tool malfunction, or near-miss incident immediately.'
    ],
    motto: '"Safety Today, Productive Competence Tomorrow"',
    colorTheme: 'crimson-techpro'
  }
};

export const PosterMaker: React.FC = () => {
  const { logActivity } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [config, setConfig] = useState<PosterConfig>({
    category: 'DEPED SY 2026–2027 THREE-TERM CALENDAR',
    headline: 'EXCELLENCE IN COMMUNICATION & INQUIRY',
    subhead: 'Strengthened SHS Grade 11 Core Competencies & Academic Workflow',
    bulletPoints: [
      'Contextualized Inquiry: Anchor learning in regional community realities and career tracks.',
      'Collaborative Engagement: Foster constructive teamwork and peer-guided analysis.',
      'Individual Written Mastery: Produce authentic, evidence-based written reflections.',
      'Lifelong Impact: Cultivate ethical communication and critical analytical thinking.'
    ],
    motto: '"Para sa Bata, Para sa Bayan, Para sa Kinabukasan"',
    teacherName: 'STEAVEN KINTH D. BOISER',
    schoolName: 'LNNCHS (Lanao del Norte National Comprehensive High School)',
    orientation: 'portrait',
    colorTheme: 'blue-gold'
  });

  const [activeNav, setActiveNav] = useState<'home' | 'templates' | 'my-posters' | 'settings'>('home');
  const [activeDrawer, setActiveDrawer] = useState<'none' | 'templates' | 'customize' | 'export'>('none');
  const [isCreatingMode, setIsCreatingMode] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [tiltAngle, setTiltAngle] = useState({ x: 0, y: 0 });

  const applyPreset = (key: string) => {
    const preset = PRESETS[key];
    if (preset) {
      setConfig(prev => ({ ...prev, ...preset }));
      logActivity('Poster Maker', `Applied Preset: ${key}`, `Template: ${preset.headline}`);
      setDownloadSuccess(`✓ Loaded "${preset.headline?.slice(0, 24)}..." template!`);
      setTimeout(() => setDownloadSuccess(null), 3000);
    }
  };

  // Render Canvas for PNG Export & 3D Preview
  const drawPosterToCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isLandscape = config.orientation === 'landscape';
    const width = isLandscape ? 1200 : 900;
    const height = isLandscape ? 675 : 1200;

    canvas.width = width;
    canvas.height = height;

    const theme = THEMES[config.colorTheme];

    // 1. Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    if (config.colorTheme === 'blue-gold') {
      bgGrad.addColorStop(0, '#001948');
      bgGrad.addColorStop(0.4, '#0038A8');
      bgGrad.addColorStop(1, '#001438');
    } else if (config.colorTheme === 'crimson-techpro') {
      bgGrad.addColorStop(0, '#3b060d');
      bgGrad.addColorStop(0.4, '#8b0000');
      bgGrad.addColorStop(1, '#200307');
    } else if (config.colorTheme === 'emerald-science') {
      bgGrad.addColorStop(0, '#022c22');
      bgGrad.addColorStop(0.4, '#059669');
      bgGrad.addColorStop(1, '#011a14');
    } else if (config.colorTheme === 'amber-academic') {
      bgGrad.addColorStop(0, '#381604');
      bgGrad.addColorStop(0.4, '#b45309');
      bgGrad.addColorStop(1, '#1e0c02');
    } else {
      bgGrad.addColorStop(0, '#280447');
      bgGrad.addColorStop(0.4, '#7e22ce');
      bgGrad.addColorStop(1, '#17022a');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle Geometry Texture
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 3. 3D Frame Borders
    ctx.strokeStyle = theme.accentColor;
    ctx.lineWidth = 12;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 3;
    ctx.strokeRect(32, 32, width - 64, height - 64);

    // 4. Top Ribbon Banner
    ctx.fillStyle = theme.secondaryColor || '#CE1126';
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 6;
    ctx.fillRect(80, 50, width - 160, 42);
    ctx.shadowColor = 'transparent';

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(config.category.toUpperCase(), width / 2, 77);

    // 5. Headline
    ctx.fillStyle = '#FFFFFF';
    ctx.font = isLandscape ? 'bold 44px serif' : 'bold 48px serif';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;

    const words = config.headline.split(' ');
    let line = '';
    let currentY = isLandscape ? 150 : 170;
    const maxLineLength = width - 160;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxLineLength && n > 0) {
        ctx.fillText(line.trim(), width / 2, currentY);
        line = words[n] + ' ';
        currentY += 54;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), width / 2, currentY);
    ctx.shadowColor = 'transparent';

    // 6. Subhead
    currentY += 28;
    ctx.fillStyle = theme.accentColor;
    ctx.font = '500 20px sans-serif';
    ctx.fillText(config.subhead, width / 2, currentY);

    // Gold Divider Line
    currentY += 24;
    ctx.strokeStyle = theme.accentColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 140, currentY);
    ctx.lineTo(width / 2 + 140, currentY);
    ctx.stroke();

    // 7. 3D Main Card
    currentY += 30;
    const cardMargin = 80;
    const cardWidth = width - cardMargin * 2;
    const cardHeight = isLandscape ? height - currentY - 100 : height - currentY - 120;

    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 12;

    ctx.fillStyle = '#FFFFFF';
    roundRect(ctx, cardMargin, currentY, cardWidth, cardHeight, 20);
    ctx.fill();
    ctx.shadowColor = 'transparent';

    ctx.strokeStyle = theme.accentColor;
    ctx.lineWidth = 6;
    ctx.stroke();

    // Bullet Points inside Card
    const bulletStartY = currentY + 50;
    const stepY = (cardHeight - 90) / Math.max(config.bulletPoints.length, 1);

    config.bulletPoints.forEach((point, idx) => {
      const py = bulletStartY + idx * stepY;

      // 3D Bullet Badge
      ctx.fillStyle = theme.primaryColor;
      ctx.beginPath();
      ctx.arc(cardMargin + 50, py - 6, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(String(idx + 1), cardMargin + 50, py);

      // Bullet Text
      ctx.fillStyle = '#333333';
      ctx.font = '600 18px sans-serif';
      ctx.textAlign = 'left';

      const bWords = point.split(' ');
      let bLine = '';
      let bY = py - 10;
      const bMaxWidth = cardWidth - 120;

      for (let w = 0; w < bWords.length; w++) {
        const testB = bLine + bWords[w] + ' ';
        if (ctx.measureText(testB).width > bMaxWidth && w > 0) {
          ctx.fillText(bLine.trim(), cardMargin + 90, bY);
          bLine = bWords[w] + ' ';
          bY += 24;
        } else {
          bLine = testB;
        }
      }
      ctx.fillText(bLine.trim(), cardMargin + 90, bY);
    });

    // 8. Bottom Footer
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'italic bold 18px serif';
    ctx.fillText(config.motto, width / 2, height - 60);

    ctx.font = '500 14px sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillText(
      `${config.teacherName} • ${config.schoolName}`,
      width / 2,
      height - 35
    );
  };

  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  useEffect(() => {
    if (canvasRef.current) {
      drawPosterToCanvas(canvasRef.current);
    }
  }, [config]);

  const handleDownloadPNG = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `3D_Poster_${config.headline.slice(0, 15).replace(/\s+/g, '_')}.png`;
    link.href = url;
    link.click();
    setDownloadSuccess('✓ High-Resolution 3D Poster PNG downloaded!');
    setTimeout(() => setDownloadSuccess(null), 3500);
    logActivity('Poster Maker', 'Downloaded Poster PNG', `Title: ${config.headline}`);
  };

  const handleMouseMove3D = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTiltAngle({ x: y, y: x });
  };

  const handleMouseLeave3D = () => {
    setTiltAngle({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-[85vh] bg-white text-[#333333] font-sans flex flex-col justify-between max-w-md mx-auto border border-stone-200 rounded-3xl overflow-hidden shadow-lg relative">
      {/* 1. TOP HEADER */}
      <header className="px-5 py-3.5 bg-white border-b border-[#F5F5F5] flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-full bg-[#4A90D9] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
          <Rotate3d className="w-4 h-4 text-white" />
        </div>
        <h1 className="text-base font-bold text-[#333333] tracking-tight">
          3D Poster Maker
        </h1>
      </header>

      {/* SUCCESS / DOWNLOAD NOTIFICATION */}
      {downloadSuccess && (
        <div className="mx-4 mt-2 p-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs flex items-center justify-between shadow-xs animate-fade-in z-20">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>{downloadSuccess}</span>
          </div>
          <button onClick={() => setDownloadSuccess(null)} className="p-0.5 text-white/80 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* MAIN CONTAINER CONTENT BASED ON ACTIVE NAV */}
      <main className="flex-1 p-4 sm:p-5 flex flex-col justify-between items-center relative overflow-y-auto">
        {activeNav === 'home' && (
          <div className="w-full h-full flex flex-col justify-between items-center space-y-4 my-auto">
            {/* CENTER: LARGE 3D PREVIEW CANVAS AREA */}
            <div
              onMouseMove={handleMouseMove3D}
              onMouseLeave={handleMouseLeave3D}
              className="w-full flex-1 flex flex-col items-center justify-center bg-[#F5F5F5] rounded-2xl p-4 sm:p-6 border border-stone-200 min-h-[340px] max-h-[460px] transition-transform duration-200 ease-out cursor-pointer relative"
              style={{
                perspective: '1000px'
              }}
            >
              <div
                className="w-full max-w-[280px] bg-white rounded-xl shadow-xl overflow-hidden border border-stone-200 transition-transform duration-150 ease-out"
                style={{
                  transform: `rotateX(${tiltAngle.x}deg) rotateY(${tiltAngle.y}deg)`,
                  boxShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.25)'
                }}
              >
                <canvas ref={canvasRef} className="w-full h-auto block object-contain" />
              </div>

              {/* CENTER-BOTTOM PROMINENT BUTTON & TOOLTIP */}
              <div className="mt-5 flex flex-col items-center relative z-10">
                {/* TOOLTIP */}
                <div className="mb-2 px-2.5 py-1 rounded-md bg-[#333333] text-white text-[11px] font-bold shadow-xs flex items-center gap-1 animate-bounce">
                  <span>Tap to begin</span>
                  <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#333333] absolute -bottom-1 left-1/2 -translate-x-1/2" />
                </div>

                {/* START CREATING BUTTON */}
                <button
                  onClick={() => {
                    setIsCreatingMode(true);
                    setActiveDrawer('customize');
                  }}
                  className="px-6 py-3 rounded-full bg-[#4A90D9] hover:bg-blue-600 active:scale-98 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer min-h-[48px]"
                >
                  <Plus className="w-4 h-4 text-white" />
                  <span>Start Creating</span>
                </button>
              </div>
            </div>

            {/* THREE CLEAR ACTION BUTTONS IN A ROW */}
            <div className="w-full grid grid-cols-3 gap-2.5 pt-2">
              <button
                onClick={() => setActiveDrawer('templates')}
                className={`py-3 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer min-h-[48px] ${
                  activeDrawer === 'templates'
                    ? 'bg-[#4A90D9] text-white shadow-xs'
                    : 'bg-[#F5F5F5] hover:bg-stone-200 text-[#333333]'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Templates</span>
              </button>

              <button
                onClick={() => setActiveDrawer('customize')}
                className={`py-3 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer min-h-[48px] ${
                  activeDrawer === 'customize'
                    ? 'bg-[#4A90D9] text-white shadow-xs'
                    : 'bg-[#F5F5F5] hover:bg-stone-200 text-[#333333]'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Customize</span>
              </button>

              <button
                onClick={() => setActiveDrawer('export')}
                className={`py-3 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer min-h-[48px] ${
                  activeDrawer === 'export'
                    ? 'bg-[#4A90D9] text-white shadow-xs'
                    : 'bg-[#F5F5F5] hover:bg-stone-200 text-[#333333]'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: TEMPLATES FULL VIEW */}
        {activeNav === 'templates' && (
          <div className="w-full space-y-3">
            <h2 className="text-sm font-bold text-[#333333] border-b border-stone-200 pb-2 flex items-center justify-between">
              <span>Select 3D Poster Template</span>
              <span className="text-xs text-[#4A90D9] font-medium">3 Preset Designs</span>
            </h2>
            <div className="space-y-2.5">
              <button
                onClick={() => {
                  applyPreset('announcement');
                  setActiveNav('home');
                }}
                className="w-full p-3.5 rounded-2xl bg-[#F5F5F5] hover:bg-blue-50 text-left border border-stone-200 transition flex items-center justify-between min-h-[48px] cursor-pointer"
              >
                <div>
                  <span className="block text-xs font-bold text-[#333333]">Summative Exam Schedule</span>
                  <span className="text-[10px] text-stone-500">Royal Blue &amp; Gold • Official Notice</span>
                </div>
                <Check className="w-4 h-4 text-[#4A90D9]" />
              </button>

              <button
                onClick={() => {
                  applyPreset('values');
                  setActiveNav('home');
                }}
                className="w-full p-3.5 rounded-2xl bg-[#F5F5F5] hover:bg-amber-50 text-left border border-stone-200 transition flex items-center justify-between min-h-[48px] cursor-pointer"
              >
                <div>
                  <span className="block text-xs font-bold text-[#333333]">Core Values &amp; Academic AI</span>
                  <span className="text-[10px] text-stone-500">Academic Amber &amp; Navy</span>
                </div>
                <Check className="w-4 h-4 text-[#4A90D9]" />
              </button>

              <button
                onClick={() => {
                  applyPreset('labSafety');
                  setActiveNav('home');
                }}
                className="w-full p-3.5 rounded-2xl bg-[#F5F5F5] hover:bg-red-50 text-left border border-stone-200 transition flex items-center justify-between min-h-[48px] cursor-pointer"
              >
                <div>
                  <span className="block text-xs font-bold text-[#333333]">TechPro Workshop Safety</span>
                  <span className="text-[10px] text-stone-500">Crimson &amp; Slate Directive</span>
                </div>
                <Check className="w-4 h-4 text-[#4A90D9]" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: MY POSTERS */}
        {activeNav === 'my-posters' && (
          <div className="w-full space-y-3">
            <h2 className="text-sm font-bold text-[#333333] border-b border-stone-200 pb-2">
              My Saved 3D Posters
            </h2>
            <div className="p-4 rounded-2xl bg-[#F5F5F5] text-center space-y-2 border border-stone-200">
              <div className="w-12 h-12 rounded-full bg-white text-[#4A90D9] mx-auto flex items-center justify-center font-bold">
                <FileImage className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-bold text-[#333333]">Current Poster Draft Active</h3>
              <p className="text-[11px] text-stone-500">
                "{config.headline.slice(0, 30)}..."
              </p>
              <button
                onClick={() => setActiveNav('home')}
                className="mt-2 px-4 py-2 rounded-xl bg-[#4A90D9] text-white text-xs font-bold"
              >
                View in 3D Canvas
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeNav === 'settings' && (
          <div className="w-full space-y-3">
            <h2 className="text-sm font-bold text-[#333333] border-b border-stone-200 pb-2">
              App Preferences
            </h2>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#F5F5F5] flex items-center justify-between">
                <span>Default Orientation</span>
                <span className="font-bold uppercase text-[#4A90D9]">{config.orientation}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F5F5F5] flex items-center justify-between">
                <span>Default Color Theme</span>
                <span className="font-bold text-[#4A90D9]">{THEMES[config.colorTheme].name}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F5F5F5] flex items-center justify-between">
                <span>High Resolution PNG Export</span>
                <span className="font-bold text-emerald-600">Enabled</span>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM ACTION DRAWERS (TEMPLATES / CUSTOMIZE / EXPORT) */}
        {activeDrawer !== 'none' && (
          <div className="absolute inset-x-0 bottom-0 bg-white border-t border-stone-200 p-4 rounded-t-3xl shadow-2xl z-30 space-y-3 animate-slide-up">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="text-xs font-bold text-[#333333] uppercase tracking-wider">
                {activeDrawer === 'templates' && 'Choose 3D Template'}
                {activeDrawer === 'customize' && 'Customize Poster Content'}
                {activeDrawer === 'export' && 'Export & Print Actions'}
              </h3>
              <button
                onClick={() => setActiveDrawer('none')}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* TEMPLATES DRAWER */}
            {activeDrawer === 'templates' && (
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    applyPreset('announcement');
                    setActiveDrawer('none');
                  }}
                  className="p-3 rounded-xl bg-blue-50 text-[#0038A8] text-[11px] font-bold border border-blue-200 text-center cursor-pointer min-h-[48px]"
                >
                  Summative Exam
                </button>
                <button
                  onClick={() => {
                    applyPreset('values');
                    setActiveDrawer('none');
                  }}
                  className="p-3 rounded-xl bg-amber-50 text-amber-900 text-[11px] font-bold border border-amber-200 text-center cursor-pointer min-h-[48px]"
                >
                  Core Values
                </button>
                <button
                  onClick={() => {
                    applyPreset('labSafety');
                    setActiveDrawer('none');
                  }}
                  className="p-3 rounded-xl bg-red-50 text-red-900 text-[11px] font-bold border border-red-200 text-center cursor-pointer min-h-[48px]"
                >
                  Lab Safety
                </button>
              </div>
            )}

            {/* CUSTOMIZE DRAWER */}
            {activeDrawer === 'customize' && (
              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 text-xs">
                <div>
                  <label className="font-bold text-[#333333] block mb-1">Headline Title:</label>
                  <input
                    type="text"
                    value={config.headline}
                    onChange={(e) => setConfig({ ...config, headline: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-[#F5F5F5] font-bold text-[#333333]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#333333] block mb-1">Subhead Description:</label>
                  <input
                    type="text"
                    value={config.subhead}
                    onChange={(e) => setConfig({ ...config, subhead: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-[#F5F5F5]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#333333] block mb-1">Color Theme:</label>
                  <select
                    value={config.colorTheme}
                    onChange={(e) => setConfig({ ...config, colorTheme: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-[#F5F5F5] font-semibold"
                  >
                    {Object.entries(THEMES).map(([k, v]) => (
                      <option key={k} value={k}>{v.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* EXPORT DRAWER */}
            {activeDrawer === 'export' && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    handleDownloadPNG();
                    setActiveDrawer('none');
                  }}
                  className="p-3 rounded-xl bg-[#4A90D9] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PNG</span>
                </button>
                <button
                  onClick={() => {
                    window.print();
                    setActiveDrawer('none');
                  }}
                  className="p-3 rounded-xl bg-[#F5F5F5] text-[#333333] font-bold text-xs flex items-center justify-center gap-2 border border-stone-300 cursor-pointer min-h-[48px]"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / PDF</span>
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 4. BOTTOM NAVIGATION BAR (4 ICONS WITH LABELS) */}
      <nav className="bg-white border-t border-[#F5F5F5] px-2 py-2 flex items-center justify-around shrink-0 z-20">
        <button
          onClick={() => {
            setActiveNav('home');
            setActiveDrawer('none');
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition cursor-pointer min-h-[48px] min-w-[64px] ${
            activeNav === 'home' ? 'text-[#4A90D9] font-bold' : 'text-[#333333]/60 hover:text-[#333333]'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => {
            setActiveNav('templates');
            setActiveDrawer('none');
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition cursor-pointer min-h-[48px] min-w-[64px] ${
            activeNav === 'templates' ? 'text-[#4A90D9] font-bold' : 'text-[#333333]/60 hover:text-[#333333]'
          }`}
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Templates</span>
        </button>

        <button
          onClick={() => {
            setActiveNav('my-posters');
            setActiveDrawer('none');
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition cursor-pointer min-h-[48px] min-w-[64px] ${
            activeNav === 'my-posters' ? 'text-[#4A90D9] font-bold' : 'text-[#333333]/60 hover:text-[#333333]'
          }`}
        >
          <Folder className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">My Posters</span>
        </button>

        <button
          onClick={() => {
            setActiveNav('settings');
            setActiveDrawer('none');
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition cursor-pointer min-h-[48px] min-w-[64px] ${
            activeNav === 'settings' ? 'text-[#4A90D9] font-bold' : 'text-[#333333]/60 hover:text-[#333333]'
          }`}
        >
          <Settings className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Settings</span>
        </button>
      </nav>
    </div>
  );
};
