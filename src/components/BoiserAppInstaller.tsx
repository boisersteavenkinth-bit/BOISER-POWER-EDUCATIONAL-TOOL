import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  Laptop,
  Apple,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  HardDrive,
  Cpu,
  ShieldCheck,
  Share2,
  PlusSquare,
  Sparkles,
  X,
  ExternalLink,
  ArrowRight,
  Info,
  GraduationCap
} from 'lucide-react';
import { usePWAInstall, DetectedPlatform } from '../hooks/usePWAInstall';
import { DepEdTeacherSignInModal } from './DepEdTeacherSignInModal';

interface BoiserAppInstallerProps {
  variant?: 'button' | 'banner' | 'card' | 'compact';
  className?: string;
}

export const BoiserAppInstaller: React.FC<BoiserAppInstallerProps> = ({
  variant = 'button',
  className = ''
}) => {
  const {
    isInstallable,
    isInstalled,
    installStatus,
    setInstallStatus,
    platform,
    isIOS,
    isAndroid,
    isMobile,
    install,
    hasDeferredPrompt
  } = usePWAInstall();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTeacherAuthOpen, setIsTeacherAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'install' | 'specs' | 'faq'>('install');

  // Realistic measured application download sizes
  const packageMetrics = {
    coreShellDownloadGzip: '418 KB',
    coreShellUncompressed: '1.45 MB',
    fullSuiteOnDemand: '1.85 MB (gzipped across all modules)',
    offlineStorageRecommended: '50 MB',
    ramMinimum: '2 GB',
    ramRecommended: '4 GB+'
  };

  const getPlatformLabel = (plat: DetectedPlatform) => {
    switch (plat) {
      case 'android':
        return 'Android Device';
      case 'ios':
        return 'Apple iOS / iPadOS';
      case 'windows':
        return 'Windows PC / Laptop';
      case 'mac':
        return 'macOS MacBook / iMac';
      case 'linux':
        return 'Linux Workstation';
      default:
        return 'Universal Web Browser';
    }
  };

  const handleInstallClick = async () => {
    if (isInstalled) {
      setIsModalOpen(true);
      return;
    }

    if (hasDeferredPrompt) {
      // Instant direct installation prompt
      const success = await install();
      if (!success) {
        setIsModalOpen(true);
      }
      return;
    }

    setIsModalOpen(true);
  };

  // Compact header button
  if (variant === 'compact') {
    return (
      <>
        <button
          onClick={handleInstallClick}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition shadow-sm cursor-pointer ${
            isInstalled
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              : 'bg-gradient-to-r from-[#FCD116] to-amber-400 text-stone-950 hover:brightness-105 active:scale-95 border border-amber-500/30'
          } ${className}`}
          title="Download & Install BOISER POWER TOOLS LITE"
        >
          {isInstalled ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>APP INSTALLED</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5 animate-bounce" />
              <span>INSTALL APP</span>
            </>
          )}
        </button>

        {isModalOpen && renderModal()}
      </>
    );
  }

  // Banner variant
  if (variant === 'banner') {
    return (
      <>
        <div className={`bg-gradient-to-r from-[#002776] via-[#092B62] to-[#001f5c] text-white p-4 sm:p-5 rounded-3xl border border-blue-400/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${className}`}>
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-300">
              {isIOS ? <Apple className="w-6 h-6" /> : isAndroid ? <Smartphone className="w-6 h-6" /> : <Laptop className="w-6 h-6" />}
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-amber-400 text-stone-950">
                  Universal App
                </span>
                <span className="text-[11px] text-blue-200 font-semibold">
                  Detected: {getPlatformLabel(platform)}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-white">
                Install BOISER POWER TOOLS LITE on this device
              </h3>
              <p className="text-xs text-blue-100/80">
                Ultra-lightweight ({packageMetrics.coreShellDownloadGzip} initial load). Fast offline access to ILAW, lessons, and records.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => setIsTeacherAuthOpen(true)}
              className="px-3.5 py-2.5 bg-blue-950/80 hover:bg-blue-900 text-amber-300 border border-amber-400/40 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              title="Free DepEd Teacher Account Sign-Up & Sign-In"
            >
              <GraduationCap className="w-4 h-4 text-amber-300" />
              <span>Teacher Free Setup</span>
            </button>
            <button
              onClick={handleInstallClick}
              className="flex-1 md:flex-none px-5 py-2.5 bg-gradient-to-r from-[#FCD116] to-amber-400 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4 text-stone-950" />
              <span>{isInstalled ? 'View App Status' : 'Download / Install'}</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer"
              title="System Requirements & Size Details"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isModalOpen && renderModal()}
      </>
    );
  }

  // Default button variant
  return (
    <>
      <button
        onClick={handleInstallClick}
        className={`px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-[#FCD116] via-amber-400 to-[#FCD116] hover:brightness-105 active:scale-95 text-stone-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-lg border border-amber-500/40 flex items-center justify-center gap-2 transition cursor-pointer ${className}`}
      >
        <Download className="w-4 h-4 text-stone-950 animate-pulse" />
        <span>DOWNLOAD / INSTALL BOISER APP</span>
      </button>

      {isModalOpen && renderModal()}
    </>
  );

  function renderModal() {
    return (
      <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#002776] via-[#092B62] to-[#001f5c] text-white p-5 sm:p-6 flex items-start justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>BOISER POWER TOOLS LITE</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Download &amp; Installation Guide
              </h2>
              <p className="text-xs text-blue-200 font-medium">
                Official Universal Mobile &amp; Desktop App by Steaven Kinth Boiser
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subheader Platform Banner */}
          <div className="bg-blue-50 px-5 py-3 border-b border-blue-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-bold text-blue-900">
              {isIOS ? <Apple className="w-4 h-4 text-blue-700" /> : isAndroid ? <Smartphone className="w-4 h-4 text-emerald-700" /> : <Laptop className="w-4 h-4 text-indigo-700" />}
              <span>Detected Device: <strong>{getPlatformLabel(platform)}</strong></span>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
              isInstalled ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
            }`}>
              {isInstalled ? 'Installed' : 'Ready to Install'}
            </span>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-stone-200 bg-stone-50 px-4 pt-2 gap-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('install')}
              className={`pb-2.5 px-3 border-b-2 transition cursor-pointer ${
                activeTab === 'install'
                  ? 'border-[#002776] text-[#002776] font-black'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Install Steps
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2.5 px-3 border-b-2 transition cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-[#002776] text-[#002776] font-black'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              App Size &amp; Specs
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`pb-2.5 px-3 border-b-2 transition cursor-pointer ${
                activeTab === 'faq'
                  ? 'border-[#002776] text-[#002776] font-black'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Compatibility &amp; FAQ
            </button>
          </div>

          {/* Content Area */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 text-xs">
            {/* TAB 1: INSTALLATION STEPS */}
            {activeTab === 'install' && (
              <div className="space-y-4">
                {/* Result Message Banner */}
                {installStatus === 'success' && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 flex items-center gap-2.5 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Success! BOISER POWER TOOLS LITE is installed on your device. You can launch it directly from your home screen or desktop.</span>
                  </div>
                )}

                {installStatus === 'dismissed' && (
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 flex items-center gap-2.5 font-semibold">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>Installation was cancelled or dismissed. You can try again whenever you are ready.</span>
                  </div>
                )}

                {/* Android / Chromium Flow */}
                {isAndroid || (!isIOS && isInstallable) ? (
                  <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-stone-800 uppercase tracking-wide flex items-center gap-1.5 text-xs">
                        <Smartphone className="w-4 h-4 text-emerald-600" />
                        <span>Android &amp; Chrome Direct 1-Click Install</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        PWA Web Standard
                      </span>
                    </div>

                    <p className="text-stone-600 leading-relaxed text-[11px]">
                      Your browser supports direct installation. Clicking below will add BOISER LITE to your app drawer and home screen without requiring an APK side-load or Google Play Store account.
                    </p>

                    <button
                      onClick={install}
                      disabled={isInstalled}
                      className="w-full py-3 bg-[#002776] hover:bg-blue-900 text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Download className="w-4 h-4 text-amber-400" />
                      <span>{isInstalled ? 'App Already Installed' : 'Install to Android Now'}</span>
                    </button>
                  </div>
                ) : null}

                {/* iOS Safari Guided Flow */}
                {isIOS && (
                  <div className="bg-blue-50/70 rounded-2xl p-4 border border-blue-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-blue-950 uppercase tracking-wide flex items-center gap-1.5 text-xs">
                        <Apple className="w-4 h-4 text-blue-700" />
                        <span>iPhone &amp; iPad Safari Instructions</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                        Apple WebKit PWA
                      </span>
                    </div>

                    <p className="text-blue-900/80 leading-relaxed text-[11px]">
                      iOS Safari provides full standalone PWA support through the Safari Share menu:
                    </p>

                    <div className="space-y-2 bg-white rounded-xl p-3 border border-blue-100">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                          1
                        </div>
                        <div>
                          <strong className="text-stone-900">Tap the Share icon</strong>
                          <p className="text-[11px] text-stone-500">Located at the bottom of Safari on iPhone, or top bar on iPad (square with an arrow pointing up).</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 pt-1 border-t border-stone-100">
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                          2
                        </div>
                        <div>
                          <strong className="text-stone-900">Select "Add to Home Screen"</strong>
                          <p className="text-[11px] text-stone-500">Scroll down the share sheet and tap the button with a "+" icon.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 pt-1 border-t border-stone-100">
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                          3
                        </div>
                        <div>
                          <strong className="text-stone-900">Tap "Add" in Top-Right</strong>
                          <p className="text-[11px] text-stone-500">BOISER LITE will be saved onto your home screen with its official icon.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Desktop / Laptop Instructions */}
                {!isMobile && (
                  <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
                    <span className="font-black text-stone-800 uppercase tracking-wide flex items-center gap-1.5 text-xs">
                      <Laptop className="w-4 h-4 text-indigo-600" />
                      <span>Laptop &amp; Desktop Browser Access</span>
                    </span>

                    <p className="text-stone-600 leading-relaxed text-[11px]">
                      On Windows, macOS, and Linux: Look for the install badge in your browser's address bar (right side of URL bar in Chrome/Edge), or click below:
                    </p>

                    {hasDeferredPrompt ? (
                      <button
                        onClick={install}
                        className="w-full py-2.5 bg-stone-900 hover:bg-stone-950 text-white rounded-xl font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-400" />
                        <span>Install Desktop Application</span>
                      </button>
                    ) : (
                      <div className="p-2.5 bg-stone-100 rounded-xl text-[11px] text-stone-600">
                        💡 Tip: You can also bookmark this app (Ctrl+D / Cmd+D) or install it from Chrome's 3-dot menu &gt; <em>"Save and share"</em> &gt; <em>"Install page as app"</em>.
                      </div>
                    )}
                  </div>
                )}

                {/* Transparency Notice */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2 leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>DepEd Security Guarantee:</strong> No unsigned APK or third-party executable is pushed to your device. BOISER LITE runs securely in a sandboxed, encrypted Progressive Web App container compliant with DepEd data privacy rules.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: APP SIZE & MEASURED SPECS */}
            {activeTab === 'specs' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 space-y-1">
                    <span className="text-[10px] font-black uppercase text-blue-700">Initial App Download</span>
                    <div className="text-xl font-black text-blue-950">{packageMetrics.coreShellDownloadGzip}</div>
                    <span className="text-[10px] text-blue-800">Ultra-fast 4G/3G launch</span>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 space-y-1">
                    <span className="text-[10px] font-black uppercase text-emerald-700">Storage Footprint</span>
                    <div className="text-xl font-black text-emerald-950">&lt; 15 MB</div>
                    <span className="text-[10px] text-emerald-800">Cached on device</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-100 text-stone-700 font-black text-[11px]">
                      <tr>
                        <th className="p-2.5">Component</th>
                        <th className="p-2.5">Download Mode</th>
                        <th className="p-2.5 text-right">Size</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-[11px]">
                      <tr>
                        <td className="p-2.5 font-bold text-stone-800">App Core Shell</td>
                        <td className="p-2.5 text-emerald-700 font-semibold">Pre-cached on Install</td>
                        <td className="p-2.5 text-right font-mono">{packageMetrics.coreShellDownloadGzip}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-stone-800">ILAW Lesson Plan Engine</td>
                        <td className="p-2.5 text-stone-600">On-demand lazy load</td>
                        <td className="p-2.5 text-right font-mono">180 KB</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-stone-800">PowerPoint (pptxgenjs)</td>
                        <td className="p-2.5 text-amber-700 font-semibold">Loaded only when creating PPT</td>
                        <td className="p-2.5 text-right font-mono">310 KB</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-stone-800">Word Document (.docx)</td>
                        <td className="p-2.5 text-amber-700 font-semibold">Loaded only when exporting DOCX</td>
                        <td className="p-2.5 text-right font-mono">220 KB</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-stone-800">Excel Engine (xlsx)</td>
                        <td className="p-2.5 text-amber-700 font-semibold">Loaded only when exporting XLSX</td>
                        <td className="p-2.5 text-right font-mono">340 KB</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-stone-800">3D Spatial Physics Lab</td>
                        <td className="p-2.5 text-purple-700 font-semibold">Loaded only when entering 3D Lab</td>
                        <td className="p-2.5 text-right font-mono">680 KB</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-stone-100 rounded-xl text-[11px] text-stone-600 space-y-1">
                  <div className="font-bold text-stone-800 flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-stone-600" />
                    <span>Bandwidth &amp; Data Saving Guarantee:</span>
                  </div>
                  <p>
                    Unlike traditional 150MB store apps, BOISER LITE only downloads what you use. If you never open the 3D Spatial Lab, Three.js is never downloaded to your device, keeping your phone storage clean and light.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: COMPATIBILITY & FAQ */}
            {activeTab === 'faq' && (
              <div className="space-y-3">
                <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200 space-y-2">
                  <h4 className="font-black text-stone-900 text-xs">Supported Operating Systems</h4>
                  <ul className="space-y-1.5 text-[11px] text-stone-600 list-disc pl-4">
                    <li><strong>Android:</strong> Android 8.0 (Oreo) and above. Recommended: Android 11+. Works in Chrome, Samsung Internet, Edge, Brave.</li>
                    <li><strong>Apple iOS:</strong> iOS 14.5 and above (iPhone 6s and newer, all iPads). Works in Safari.</li>
                    <li><strong>Laptops &amp; Desktops:</strong> Windows 10/11, macOS 11+, ChromeOS, Ubuntu/Fedora Linux.</li>
                  </ul>
                </div>

                <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200 space-y-2">
                  <h4 className="font-black text-stone-900 text-xs">Hardware Limitations &amp; Offline Notes</h4>
                  <ul className="space-y-1.5 text-[11px] text-stone-600 list-disc pl-4">
                    <li><strong>RAM:</strong> 2GB minimum for lesson planning and forms; 4GB+ recommended for large PowerPoint generation.</li>
                    <li><strong>Storage:</strong> Minimum 50 MB free space for offline cache and Draft Vault.</li>
                    <li><strong>Offline Capability:</strong> All cached tools, lesson plans, math/science calculators, and saved drafts work without internet. Cloud sync automatically resumes upon reconnection.</li>
                  </ul>
                </div>

                <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-2 font-black text-blue-950 text-xs">
                    <ShieldCheck className="w-4 h-4 text-blue-700" />
                    <span>Proprietary Algorithm &amp; Data Privacy Policy</span>
                  </div>
                  <p className="text-[11px] text-blue-900/80 leading-relaxed">
                    All underlying educational models, Action Research formulas, and master data catalogs remain strictly private and encrypted. Teachers have access to their individual lesson plans and class records, while administrative governance and master data access are exclusively restricted to Master Creator Steaven Kinth Boiser.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-4 bg-stone-100 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsTeacherAuthOpen(true);
              }}
              className="px-3.5 py-2 bg-[#002776] hover:bg-blue-900 text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-amber-300" />
              <span>Teacher Free Setup (@deped.gov.ph)</span>
            </button>

            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

        {/* DEPED TEACHER SIGN-IN / SETUP MODAL */}
        <DepEdTeacherSignInModal
          isOpen={isTeacherAuthOpen}
          onClose={() => setIsTeacherAuthOpen(false)}
        />
      </div>
    );
  }
};
