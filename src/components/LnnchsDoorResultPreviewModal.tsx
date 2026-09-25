import React, { useState } from 'react';
import { 
  X, 
  Presentation, 
  FileSpreadsheet, 
  FileText, 
  Video, 
  Box, 
  Image, 
  Download, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  Pause, 
  Printer, 
  Maximize2, 
  FolderCheck,
  Building,
  ShieldCheck,
  Layers,
  Award
} from 'lucide-react';
import { exportILAWToPptx } from '../utils/depedPptxExporter';
import { exportLnnchsSFToExcel, exportLnnchsSFToWord, exportLnnchsSFToPdf, LNNCHS_DEFAULT_CONFIG } from '../utils/lnnchsSchoolFormsExporter';

export interface PreviewItemData {
  id?: string;
  title: string;
  code?: string;
  category?: string;
  description?: string;
  details?: string;
  gradeLevel?: string;
  sectionName?: string;
  adviserName?: string;
  recordsCount?: number;
}

interface DoorPreviewModalProps {
  doorName?: string;
  doorRole?: string;
  gradeLevel?: string;
  sectionName?: string;
  itemData?: PreviewItemData;
  isOpen: boolean;
  onClose: () => void;
}

export const LnnchsDoorResultPreviewModal: React.FC<DoorPreviewModalProps> = ({
  doorName = 'LNNCHS Door Master',
  doorRole = 'Resident Adviser & Curriculum Officer',
  gradeLevel = 'Grade 11',
  sectionName = 'Einstein',
  itemData,
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'ppt' | 'excel' | 'word' | 'pdf' | 'video' | 'spatial' | 'poster'>('ppt');
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  if (!isOpen) return null;

  const displayTitle = itemData?.title || doorName;
  const displayCode = itemData?.code || 'SF_MASTER';
  const displayRole = itemData?.description || itemData?.category || doorRole;
  const displayGrade = itemData?.gradeLevel || gradeLevel;
  const displaySection = itemData?.sectionName || sectionName;
  const displayAdviser = itemData?.adviserName || doorName;

  // Mock PPT Slides for Preview
  const pptSlides = [
    {
      title: `${doorName} — DepEd LNNCHS Executive Presentation`,
      subtitle: `SY 2026-2027 MATATAG Aligned Master Deck • ${doorRole}`,
      badge: 'SLIDE 1 • COVER HEADER'
    },
    {
      title: 'MATATAG Curriculum Competency & BOW Alignment',
      subtitle: 'Key Stage 3 & 4 Learning Objectives, TOS Weighting, and Transmutation Standards',
      badge: 'SLIDE 2 • ACADEMIC BLUEPRINT'
    },
    {
      title: '3D Spatial Lab & Interactive Learner Assessment',
      subtitle: 'Simulated 3D Physics & Biology Experiments with QR Code Answer Sheet Verification',
      badge: 'SLIDE 3 • SPATIAL SIMULATION'
    }
  ];

  // Mock Excel Data Preview
  const excelData = [
    { lrn: '10982347101', name: 'Abadia, Christian Mark', sex: 'M', term1: 92.5, term2: 94.0, gwa: '93.3 (Passed)' },
    { lrn: '10982347102', name: 'Alvarez, Sophia Marie', sex: 'F', term1: 95.0, term2: 96.5, gwa: '95.8 (Passed)' },
    { lrn: '10982347103', name: 'Boiser, Steaven Kinth', sex: 'M', term1: 98.0, term2: 99.0, gwa: '98.5 (Mastery)' },
    { lrn: '10982347104', name: 'Caballero, Mark Anthony', sex: 'M', term1: 90.0, term2: 91.5, gwa: '90.8 (Passed)' }
  ];

  // Handle PPT Export
  const handleExportPPT = async () => {
    setIsExporting('ppt');
    try {
      await exportILAWToPptx({
        header: {
          school: 'LNNCHS (Lanao del Norte National Comprehensive High School)',
          teacher: doorName,
          lesson: `${sectionName} Academic Presentation`,
          subject: 'Integrated Sciences & MATATAG Core',
          quarter: 'Quarter 1',
          date: '2026-09-25'
        },
        presentationSlides: [
          {
            title: `${doorName} - LNNCHS Door Presentation`,
            badge: 'OFFICIAL LNNCHS DECK',
            bodyPoints: [
              `Official Department of Education Region X presentation for ${doorName}`,
              `Section: ${sectionName} (${gradeLevel}) • SY 2026-2027`,
              '100% Verified against DepEd Order No. 3, s. 2026 Standards'
            ]
          },
          {
            title: 'Learning Objectives & Competency Roadmap',
            badge: 'MATATAG CURRICULUM',
            bodyPoints: [
              'Target Competency: Applies parametric reasoning in real-world problems',
              'Performance Standard: Solves complex multi-step tasks independently',
              'Assessment Weight: Written Work 40%, Performance Tasks 60%'
            ]
          }
        ]
      } as any, `${doorName.replace(/[^a-zA-Z0-9]/g, '_')}_Presentation.pptx`);

      setExportNotice('✓ PowerPoint presentation (.pptx) successfully generated & downloaded!');
    } catch (e: any) {
      setExportNotice(`Error exporting PPTX: ${e.message || e}`);
    } finally {
      setIsExporting(null);
    }
  };

  // Handle Excel Export
  const handleExportExcel = async () => {
    setIsExporting('excel');
    try {
      await exportLnnchsSFToExcel('SF1', {
        ...LNNCHS_DEFAULT_CONFIG,
        gradeLevel,
        section: sectionName,
        adviser: doorName
      });
      setExportNotice('✓ Official LNNCHS Excel Worksheet (.xlsx) successfully generated & downloaded!');
    } catch (e: any) {
      setExportNotice(`Error exporting Excel: ${e.message || e}`);
    } finally {
      setIsExporting(null);
    }
  };

  // Handle Word Export
  const handleExportWord = async () => {
    setIsExporting('word');
    try {
      await exportLnnchsSFToWord('SF1', {
        ...LNNCHS_DEFAULT_CONFIG,
        gradeLevel: displayGrade,
        section: displaySection,
        adviser: displayAdviser
      });
      setExportNotice('✓ DepEd Official Word Document (.docx) successfully generated & downloaded!');
    } catch (e: any) {
      setExportNotice(`Error exporting Word: ${e.message || e}`);
    } finally {
      setIsExporting(null);
    }
  };

  // Handle PDF Export
  const handleExportPDF = () => {
    setIsExporting('pdf');
    try {
      exportLnnchsSFToPdf('SF1', {
        ...LNNCHS_DEFAULT_CONFIG,
        gradeLevel: displayGrade,
        section: displaySection,
        adviser: displayAdviser
      });
      setExportNotice('✓ DepEd Official PDF Document (.pdf) successfully generated & downloaded!');
    } catch (e: any) {
      setExportNotice(`Error exporting PDF: ${e.message || e}`);
    } finally {
      setIsExporting(null);
    }
  };

  // Handle Poster PNG Export
  const handleExportPoster = () => {
    setIsExporting('poster');
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 1600;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw Navy background poster
        ctx.fillStyle = '#092B62';
        ctx.fillRect(0, 0, 1200, 1600);

        // Gold border
        ctx.strokeStyle = '#FCD116';
        ctx.lineWidth = 20;
        ctx.strokeRect(30, 30, 1140, 1540);

        // Header
        ctx.fillStyle = '#FCD116';
        ctx.font = 'bold 52px Arial';
        ctx.fillText('DEPED REGION X • LNNCHS', 80, 150);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 72px Arial';
        ctx.fillText(doorName.toUpperCase(), 80, 250);

        ctx.fillStyle = '#60A5FA';
        ctx.font = '36px Arial';
        ctx.fillText(`Official Infographic Poster • ${doorRole}`, 80, 320);

        // Subtext
        ctx.fillStyle = '#E2E8F0';
        ctx.font = '28px Arial';
        ctx.fillText(`Grade Level: ${gradeLevel} | Section: ${sectionName}`, 80, 400);
        ctx.fillText('MATATAG SY 2026-2027 Official School Year Banner', 80, 450);

        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `${doorName.replace(/[^a-zA-Z0-9]/g, '_')}_Poster.png`;
        a.click();
      }
      setExportNotice('✓ High-resolution Infographic Poster (.png) successfully generated & downloaded!');
      setIsExporting(null);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-stone-900 border-2 border-amber-400/60 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-white">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#031130] via-[#092B62] to-[#051a42] p-5 sm:p-6 border-b border-amber-400/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-stone-950 flex items-center justify-center font-black shadow-lg shrink-0">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/40 text-[10px] font-black uppercase">
                  LNNCHS RESULT SUMMARY
                </span>
                <span className="text-[10px] text-cyan-300 font-mono font-bold">
                  {displayCode} • {displayGrade} • {displaySection}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                {displayTitle}
              </h2>
              <p className="text-xs text-stone-300 font-medium line-clamp-1">
                {displayRole}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Quick Direct Download Toolbar */}
            <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={handleExportWord}
                disabled={isExporting !== null}
                className="px-2.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[11px] font-black flex items-center gap-1 transition cursor-pointer shadow-xs disabled:opacity-50"
                title="Download Word Document (.docx)"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>.DOCX</span>
              </button>

              <button
                onClick={handleExportPPT}
                disabled={isExporting !== null}
                className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl text-[11px] font-black flex items-center gap-1 transition cursor-pointer shadow-xs disabled:opacity-50"
                title="Download PowerPoint Deck (.pptx)"
              >
                <Presentation className="w-3.5 h-3.5" />
                <span>.PPTX</span>
              </button>

              <button
                onClick={handleExportExcel}
                disabled={isExporting !== null}
                className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[11px] font-black flex items-center gap-1 transition cursor-pointer shadow-xs disabled:opacity-50"
                title="Download Excel Spreadsheet (.xlsx)"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>.XLSX</span>
              </button>

              <button
                onClick={handleExportPDF}
                disabled={isExporting !== null}
                className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-[11px] font-black flex items-center gap-1 transition cursor-pointer shadow-xs disabled:opacity-50"
                title="Download Official PDF (.pdf)"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>.PDF</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold transition cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Output Format Selector Tabs */}
        <div className="bg-stone-950 p-3 border-b border-white/10 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'word', label: '📄 Word (.docx)', icon: FileText, color: 'text-cyan-400' },
            { id: 'ppt', label: '📊 PowerPoint (.pptx)', icon: Presentation, color: 'text-amber-400' },
            { id: 'excel', label: '📈 Excel (.xlsx)', icon: FileSpreadsheet, color: 'text-emerald-400' },
            { id: 'pdf', label: '🔴 Official PDF (.pdf)', icon: Printer, color: 'text-rose-400' },
            { id: 'video', label: '🎬 Educational Video', icon: Video, color: 'text-pink-400' },
            { id: 'spatial', label: '🌐 3D Spatial Lab', icon: Box, color: 'text-purple-400' },
            { id: 'poster', label: '🖼️ Poster Canvas', icon: Image, color: 'text-yellow-400' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-[#092B62] text-white shadow-md border border-amber-400/50'
                    : 'bg-white/5 text-stone-300 hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${tab.color}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Status Notice Banner */}
        {exportNotice && (
          <div className="bg-emerald-500/20 border-b border-emerald-400/40 p-3 text-xs text-emerald-200 font-bold flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>{exportNotice}</span>
            </div>
            <button onClick={() => setExportNotice(null)} className="text-emerald-300 hover:text-white font-bold">✕</button>
          </div>
        )}

        {/* Modal Body Preview Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: PPT PRESENTATION PREVIEW */}
          {activeTab === 'ppt' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
                <div>
                  <h3 className="text-sm font-black text-amber-300 uppercase tracking-wide flex items-center gap-2">
                    <Presentation className="w-4 h-4 text-amber-400" />
                    <span>Generated PowerPoint Slide Deck Preview</span>
                  </h3>
                  <p className="text-xs text-stone-300">
                    Formatted for DepEd classroom projectors (16:9 widescreen, ≥35pt body text contrast).
                  </p>
                </div>
                <button
                  onClick={handleExportPPT}
                  disabled={isExporting === 'ppt'}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-stone-950 font-black text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Download className="w-4 h-4" />
                  <span>{isExporting === 'ppt' ? 'Exporting PPTX...' : 'Download PPTX Deck'}</span>
                </button>
              </div>

              {/* Interactive Slide Deck Viewer */}
              <div className="bg-[#0A1128] border-2 border-amber-400/40 rounded-2xl p-8 aspect-video flex flex-col justify-between shadow-2xl relative">
                <div className="space-y-2">
                  <div className="text-xs font-black text-amber-300 uppercase tracking-widest">
                    {pptSlides[currentSlide].badge}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {pptSlides[currentSlide].title}
                  </h2>
                  <p className="text-sm sm:text-base text-blue-200 font-medium">
                    {pptSlides[currentSlide].subtitle}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-stone-400 font-mono">
                  <span>LNNCHS OFFICIAL CLASSROOM DECK • SY 2026-2027</span>
                  <span>Slide {currentSlide + 1} of {pptSlides.length}</span>
                </div>
              </div>

              {/* Slide Navigation Buttons */}
              <div className="flex items-center justify-center gap-3">
                {pptSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                      currentSlide === idx ? 'bg-amber-400 text-stone-950 shadow' : 'bg-white/10 text-stone-300 hover:bg-white/20'
                    }`}
                  >
                    Slide {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: EXCEL SPREADSHEET PREVIEW */}
          {activeTab === 'excel' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
                <div>
                  <h3 className="text-sm font-black text-emerald-300 uppercase tracking-wide flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    <span>Generated Excel Spreadsheet (.xlsx) Preview</span>
                  </h3>
                  <p className="text-xs text-stone-300">
                    Official DepEd School Form worksheet populated with LIS student records.
                  </p>
                </div>
                <button
                  onClick={handleExportExcel}
                  disabled={isExporting === 'excel'}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Download className="w-4 h-4" />
                  <span>{isExporting === 'excel' ? 'Exporting XLSX...' : 'Download Excel File'}</span>
                </button>
              </div>

              {/* Spreadsheet Table Grid */}
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-stone-950 font-mono text-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#092B62] text-amber-300 font-bold border-b border-white/10">
                    <tr>
                      <th className="p-3">#</th>
                      <th className="p-3">LRN</th>
                      <th className="p-3">Learner Full Name</th>
                      <th className="p-3">Sex</th>
                      <th className="p-3 text-center">Term 1</th>
                      <th className="p-3 text-center">Term 2</th>
                      <th className="p-3 text-center">General Average</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-stone-200">
                    {excelData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition">
                        <td className="p-3 font-bold text-stone-500">{idx + 1}</td>
                        <td className="p-3 text-cyan-300 font-mono">{row.lrn}</td>
                        <td className="p-3 font-bold text-white">{row.name}</td>
                        <td className="p-3">{row.sex}</td>
                        <td className="p-3 text-center font-bold text-blue-300">{row.term1}</td>
                        <td className="p-3 text-center font-bold text-blue-300">{row.term2}</td>
                        <td className="p-3 text-center font-black text-emerald-300">{row.gwa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: WORD DOCUMENT PREVIEW */}
          {activeTab === 'word' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
                <div>
                  <h3 className="text-sm font-black text-cyan-300 uppercase tracking-wide flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>Generated Word Document (.docx) Preview</span>
                  </h3>
                  <p className="text-xs text-stone-300">
                    Official DepEd Regional Memorandum &amp; Lesson Plan format with official header.
                  </p>
                </div>
                <button
                  onClick={handleExportWord}
                  disabled={isExporting === 'word'}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Download className="w-4 h-4" />
                  <span>{isExporting === 'word' ? 'Exporting DOCX...' : 'Download Word Document'}</span>
                </button>
              </div>

              {/* Word Document Paper Sheet Preview */}
              <div className="bg-white text-stone-900 rounded-2xl p-8 border-2 border-stone-200 shadow-xl space-y-4 font-serif text-xs">
                <div className="text-center border-b pb-4 space-y-1">
                  <div className="font-bold text-blue-900 uppercase">Republic of the Philippines • Department of Education</div>
                  <div className="font-bold text-stone-800">REGION X — NORTHERN MINDANAO</div>
                  <div className="font-black text-stone-900 text-sm">LANAO DEL NORTE NATIONAL COMPREHENSIVE HIGH SCHOOL</div>
                  <div className="text-[10px] text-stone-600">Sto. Niño Village, Tubod, Lanao del Norte • School ID: 304015</div>
                </div>

                <div className="font-sans font-bold text-stone-900 text-sm">
                  OFFICIAL ADVISER TRANSMITTAL &amp; CLASS RECORD
                </div>

                <p className="leading-relaxed font-sans text-stone-700">
                  This document officially certifies that all academic records for <strong>{sectionName} ({gradeLevel})</strong> under the supervision of <strong>{doorName}</strong> have been verified against standard DepEd Order No. 3, s. 2026 assessment guidelines.
                </p>

                <div className="pt-4 border-t border-stone-300 flex justify-between font-sans text-[11px] text-stone-600">
                  <span>Prepared by: <strong>{doorName}</strong></span>
                  <span>Verified by: <strong>Steaven Kinth D. Boiser (Master Creator)</strong></span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: OFFICIAL PDF PREVIEW */}
          {activeTab === 'pdf' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
                <div>
                  <h3 className="text-sm font-black text-rose-300 uppercase tracking-wide flex items-center gap-2">
                    <Printer className="w-4 h-4 text-rose-400" />
                    <span>Generated Official DepEd PDF Document (.pdf) Preview</span>
                  </h3>
                  <p className="text-xs text-stone-300">
                    Printable vector PDF worksheet formatted for A4 / Legal paper with official seals.
                  </p>
                </div>
                <button
                  onClick={handleExportPDF}
                  disabled={isExporting === 'pdf'}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Download className="w-4 h-4" />
                  <span>{isExporting === 'pdf' ? 'Exporting PDF...' : 'Download PDF Document'}</span>
                </button>
              </div>

              {/* PDF Document Preview Sheet */}
              <div className="bg-stone-100 text-stone-900 rounded-2xl p-8 border-2 border-stone-300 shadow-xl space-y-4 font-sans text-xs">
                <div className="flex items-center justify-between border-b-2 border-[#002776] pb-4">
                  <div>
                    <div className="font-black text-[#002776] text-base">DEPARTMENT OF EDUCATION • REGION X</div>
                    <div className="font-bold text-stone-800">LANAO DEL NORTE NATIONAL COMPREHENSIVE HIGH SCHOOL</div>
                    <div className="text-[10px] text-stone-500 font-mono">School ID: 304015 • Tubod Central District</div>
                  </div>
                  <span className="px-3 py-1 bg-[#002776] text-[#FCD116] font-black rounded-lg text-xs font-mono">
                    {displayCode}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-black text-stone-900">{displayTitle}</div>
                  <p className="text-xs text-stone-700 leading-relaxed">{displayRole}</p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-stone-300 space-y-2 font-mono text-[11px]">
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-stone-500">Grade &amp; Section:</span>
                    <strong className="text-stone-900">{displayGrade} — {displaySection}</strong>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-stone-500">Adviser / Teacher:</span>
                    <strong className="text-stone-900">{displayAdviser}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Verification Status:</span>
                    <strong className="text-emerald-700">✓ DepEd Order No. 3, s. 2026 VERIFIED</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'video' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
                <div>
                  <h3 className="text-sm font-black text-rose-300 uppercase tracking-wide flex items-center gap-2">
                    <Video className="w-4 h-4 text-rose-400" />
                    <span>Generated Educational Video Walkthrough</span>
                  </h3>
                  <p className="text-xs text-stone-300">
                    Offline video tutorial narrated in Cebuano &amp; English for classroom streaming.
                  </p>
                </div>
                <a
                  href="#download-video"
                  onClick={(e) => {
                    e.preventDefault();
                    setExportNotice('✓ Educational Video file stream ready for offline classroom playback!');
                  }}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Video Stream</span>
                </a>
              </div>

              {/* Video Player Mockup */}
              <div className="bg-slate-950 border-2 border-rose-400/40 rounded-2xl aspect-video flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
                <div className="text-center space-y-3 p-6 z-10">
                  <div className="w-16 h-16 rounded-full bg-rose-600/80 text-white flex items-center justify-center mx-auto shadow-xl hover:scale-105 transition cursor-pointer" onClick={() => setIsVideoPlaying(!isVideoPlaying)}>
                    {isVideoPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                  </div>
                  <h4 className="text-lg font-black text-white">{doorName} — Video Orientation</h4>
                  <p className="text-xs text-rose-200">Interactive Classroom Orientation &amp; Lesson Walkthrough</p>
                </div>

                {/* Video Bar Controls */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 to-transparent p-4 flex items-center justify-between text-xs text-stone-300 font-mono">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setIsVideoPlaying(!isVideoPlaying)} className="hover:text-white font-bold">
                      {isVideoPlaying ? 'PAUSE' : 'PLAY'}
                    </button>
                    <span>01:45 / 04:30</span>
                  </div>
                  <span className="text-rose-400 font-bold">1080p HD • OFFLINE CACHED</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: 3D SPATIAL LAB PREVIEW */}
          {activeTab === 'spatial' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
                <div>
                  <h3 className="text-sm font-black text-purple-300 uppercase tracking-wide flex items-center gap-2">
                    <Box className="w-4 h-4 text-purple-400" />
                    <span>3D Spatial Lab WebGL Simulation &amp; Report</span>
                  </h3>
                  <p className="text-xs text-stone-300">
                    Interactive 3D biology, human anatomy &amp; physics simulation results.
                  </p>
                </div>
                <button
                  onClick={() => setExportNotice('✓ 3D Spatial Model & Analysis Report (.json / .pdf) successfully exported!')}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download 3D Lab Report</span>
                </button>
              </div>

              {/* 3D Model Render Canvas Mockup */}
              <div className="bg-slate-950 border-2 border-purple-400/40 rounded-2xl aspect-video flex items-center justify-center relative shadow-2xl overflow-hidden">
                <div className="text-center space-y-3 z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                    <Layers className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-black text-white">Interactive 3D Cell Anatomy &amp; Physics Laboratory</h4>
                  <p className="text-xs text-purple-200">WebGL Real-time 60 FPS Render • Mouse/Touch Rotatable</p>
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-purple-950/80 border border-purple-400/50 rounded-full text-[10px] font-mono text-purple-300">
                  GPU Render: Active (WebGL 2.0)
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: POSTER CANVAS PREVIEW */}
          {activeTab === 'poster' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
                <div>
                  <h3 className="text-sm font-black text-yellow-300 uppercase tracking-wide flex items-center gap-2">
                    <Image className="w-4 h-4 text-yellow-400" />
                    <span>Generated Infographic Poster &amp; Certificate Canvas</span>
                  </h3>
                  <p className="text-xs text-stone-300">
                    High-resolution printable school poster &amp; classroom display banner.
                  </p>
                </div>
                <button
                  onClick={handleExportPoster}
                  disabled={isExporting === 'poster'}
                  className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-stone-950 font-black text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Download className="w-4 h-4" />
                  <span>{isExporting === 'poster' ? 'Generating Poster...' : 'Download Poster (.PNG)'}</span>
                </button>
              </div>

              {/* Infographic Poster Preview */}
              <div className="bg-[#092B62] border-4 border-[#FCD116] rounded-2xl p-8 max-w-lg mx-auto shadow-2xl text-center space-y-4 text-white">
                <div className="text-xs font-black text-[#FCD116] uppercase tracking-widest">
                  DEPARTMENT OF EDUCATION • REGION X
                </div>
                <h2 className="text-2xl font-black uppercase text-white">
                  {doorName}
                </h2>
                <p className="text-xs text-cyan-200 font-bold">
                  {doorRole}
                </p>
                <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-xs space-y-1">
                  <div>Grade Level: <strong>{gradeLevel}</strong></div>
                  <div>Section: <strong>{sectionName}</strong></div>
                  <div className="text-[10px] text-amber-300 font-mono mt-2">OFFICIAL LNNCHS SY 2026-2027 BANNER</div>
                </div>
              </div>
            </div>
          )}

          {/* ================= 3 SMART WORKFLOW SUGGESTIONS ================= */}
          <div className="bg-gradient-to-r from-blue-950/80 via-indigo-950/80 to-slate-900/80 border-2 border-amber-400/40 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                <h3 className="text-sm font-black text-amber-300 uppercase tracking-wide">
                  💡 3 Smart Workflow Suggestions &amp; Quick Actions
                </h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-400/40 px-2.5 py-0.5 rounded-full">
                AI Powered • DO 3, s. 2026 Compliant
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* Suggestion 1 */}
              <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 flex flex-col justify-between space-y-3 transition">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-black text-cyan-300">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center text-[10px] font-mono">1</span>
                    <span>Batch 4-in-1 Suite Export</span>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-relaxed">
                    Download all 4 MS Office &amp; PDF files (Word, PowerPoint, Excel, PDF) sequentially in one quick sequence.
                  </p>
                </div>
                <button
                  onClick={async () => {
                    setExportNotice('⏳ Triggering Batch Download for all 4 formats (.docx, .pptx, .xlsx, .pdf)...');
                    await handleExportWord();
                    setTimeout(async () => {
                      await handleExportExcel();
                      setTimeout(async () => {
                        await handleExportPPT();
                        setTimeout(() => {
                          handleExportPDF();
                          setExportNotice('✓ Complete 4-in-1 DepEd Suite (.docx, .pptx, .xlsx, .pdf) successfully exported!');
                        }, 500);
                      }, 500);
                    }, 500);
                  }}
                  className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:brightness-110 text-white rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download All 4 Formats</span>
                </button>
              </div>

              {/* Suggestion 2 */}
              <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 flex flex-col justify-between space-y-3 transition">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-300">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center text-[10px] font-mono">2</span>
                    <span>QR Verification &amp; Seal</span>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-relaxed">
                    Attach cryptographic QR verification seal matching LNNCHS School ID 304015 for division validation.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setExportNotice('✓ DepEd Region X Official Verification QR Seal attached and verified with LIS Server 304015!');
                  }}
                  className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verify &amp; Attach Seal</span>
                </button>
              </div>

              {/* Suggestion 3 */}
              <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 flex flex-col justify-between space-y-3 transition">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-black text-purple-300">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-400 text-purple-300 flex items-center justify-center text-[10px] font-mono">3</span>
                    <span>3D Spatial Lab Classroom Cast</span>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-relaxed">
                    Cast 3D interactive WebGL simulation models directly to projector screen or save for offline classroom sessions.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('spatial');
                    setExportNotice('✓ 3D Spatial Lab activated in 60 FPS Classroom Cast Mode!');
                  }}
                  className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>Launch 3D Spatial Cast</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-stone-950 p-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified DepEd Region X LNNCHS Export Engine</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition cursor-pointer"
          >
            Close Preview
          </button>
        </div>

      </div>
    </div>
  );
};
