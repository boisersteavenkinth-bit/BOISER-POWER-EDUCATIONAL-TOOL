import React, { useState } from 'react';
import { Smartphone, Download, ShieldCheck, CheckCircle2, Cpu, Sparkles, Wifi, WifiOff, RefreshCw, Terminal, Layers } from 'lucide-react';

export const APKCompanionModule: React.FC = () => {
  const [deviceSkin, setDeviceSkin] = useState<'android' | 'tablet' | 'pwa'>('android');
  const [offlineMode, setOfflineMode] = useState<boolean>(false);
  const [installStatus, setInstallStatus] = useState<'idle' | 'installing' | 'installed'>('idle');

  const handleSimulateInstall = () => {
    setInstallStatus('installing');
    setTimeout(() => {
      setInstallStatus('installed');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-[#092B62] to-indigo-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
              <Smartphone className="w-6 h-6 text-emerald-300" />
            </span>
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-200">Boiser Mobile APK & PWA Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            APK Simulator & PWA Mobile Companion
          </h1>
          <p className="text-sm text-emerald-100 max-w-2xl leading-relaxed">
            Run, test, and package <span className="font-semibold text-emerald-300">Boiser Power Tools</span> as an Android APK-style PWA application with offline local storage and biometric security.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateInstall}
            disabled={installStatus === 'installing'}
            className="px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-stone-900 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg cursor-pointer disabled:opacity-50"
          >
            {installStatus === 'installing' ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Building APK...</span>
              </>
            ) : installStatus === 'installed' ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-900" />
                <span>APK Ready / Installed</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Generate & Install APK</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats / Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#dce3ee] rounded-3xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase">Target Runtime</span>
            <Cpu className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-lg font-black text-[#092B62]">Android / PWA Native</p>
          <span className="text-[11px] text-stone-500">Supports offline IndexedDB + Firebase caching</span>
        </div>

        <div className="bg-white border border-[#dce3ee] rounded-3xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase">Security Gateway</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-lg font-black text-[#092B62]">Biometric & PIN Lock</p>
          <span className="text-[11px] text-emerald-600 font-bold">Active Shield Protection</span>
        </div>

        <div className="bg-white border border-[#dce3ee] rounded-3xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase">Cloud Accounts</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-lg font-black text-[#092B62]">Dual Drive Sync</p>
          <span className="text-[11px] text-stone-500 truncate block">deped.gov.ph & gmail.com</span>
        </div>
      </div>

      {/* Interactive Mobile Phone Frame Simulator */}
      <div className="bg-white border border-[#dce3ee] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div className="space-y-1">
            <h3 className="text-base font-black text-[#092B62] flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-600" />
              <span>Mobile APK & Tablet Viewport Simulator</span>
            </h3>
            <p className="text-xs text-stone-500">Preview how Boiser Power Tools appears inside an Android APK wrapper or mobile PWA screen.</p>
          </div>

          <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setDeviceSkin('android')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                deviceSkin === 'android' ? 'bg-[#092B62] text-white shadow' : 'text-stone-700 hover:bg-stone-200'
              }`}
            >
              Android Phone (9:16)
            </button>
            <button
              onClick={() => setDeviceSkin('tablet')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                deviceSkin === 'tablet' ? 'bg-[#092B62] text-white shadow' : 'text-stone-700 hover:bg-stone-200'
              }`}
            >
              Tablet View
            </button>
            <button
              onClick={() => setDeviceSkin('pwa')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                deviceSkin === 'pwa' ? 'bg-[#092B62] text-white shadow' : 'text-stone-700 hover:bg-stone-200'
              }`}
            >
              PWA Desktop
            </button>
          </div>
        </div>

        {/* Device Frame */}
        <div className="flex justify-center py-4 bg-stone-900/5 rounded-3xl p-4">
          <div className={`transition-all duration-300 bg-white border-8 border-stone-900 rounded-[40px] shadow-2xl overflow-hidden flex flex-col ${
            deviceSkin === 'android' ? 'w-[360px] h-[640px]' :
            deviceSkin === 'tablet' ? 'w-[720px] h-[520px]' : 'w-full max-w-4xl h-[560px]'
          }`}>
            {/* Phone Status Bar */}
            <div className="bg-stone-900 text-white px-6 py-2 flex items-center justify-between text-[11px] font-bold">
              <span>11:56 AM</span>
              <div className="w-20 h-3 bg-stone-800 rounded-full mx-auto" />
              <div className="flex items-center gap-2">
                <Wifi className="w-3 h-3 text-emerald-400" />
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* App Header inside Simulator */}
            <div className="bg-[#092B62] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-cyan-400 text-stone-900 font-black flex items-center justify-center text-xs">BP</span>
                <div>
                  <h4 className="text-xs font-black">Boiser Power Tools</h4>
                  <span className="text-[10px] text-cyan-200">v2.6 APK Mobile Edition</span>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-emerald-500 text-stone-900 rounded-lg text-[10px] font-extrabold">Active</span>
            </div>

            {/* Simulator Content Area */}
            <div className="flex-1 bg-[#f3f6fb] p-4 overflow-y-auto space-y-3">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
                <span className="text-[10px] font-black uppercase text-emerald-700">DepEd Order No. 3, s. 2026</span>
                <h5 className="text-xs font-black text-[#092B62]">Instructional Leadership & Academic Workflow</h5>
                <p className="text-[11px] text-stone-600">Optimized for LNNCHS teachers and students across Lanao del Norte.</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-2xl text-center space-y-1">
                  <span className="text-[10px] font-bold text-blue-800">Claude & Opus AI</span>
                  <p className="text-xs font-black text-[#092B62]">Active Engine</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 p-3 rounded-2xl text-center space-y-1">
                  <span className="text-[10px] font-bold text-purple-800">Data Vault</span>
                  <p className="text-xs font-black text-purple-900">Synchronized</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 space-y-2">
                <span className="text-[10px] font-black uppercase text-stone-500">Cloud Sync Repositories</span>
                <p className="text-[11px] font-medium text-stone-700 truncate">• steavenkinth.boiser@deped.gov.ph</p>
                <p className="text-[11px] font-medium text-stone-700 truncate">• boisersteavenkinth@gmail.com</p>
              </div>
            </div>

            {/* Simulated Android Navigation Bar */}
            <div className="bg-stone-900 text-white py-2.5 flex items-center justify-around text-xs">
              <span>◁</span>
              <span>◯</span>
              <span>▢</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
