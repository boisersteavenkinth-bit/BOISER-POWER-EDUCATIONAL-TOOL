import React from 'react';
import {
  HardDrive,
  Trash2,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  Database,
  Layers,
  Sparkles,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { useStorageManager } from '../hooks/useStorageManager';

interface StorageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StorageManagerModal: React.FC<StorageManagerModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    breakdown,
    isClearing,
    clearResult,
    refreshStorageMetrics,
    clearCache,
    exportDraftsBackup,
    allocate50GBCacheVault,
    maximize500GBCacheVault,
    runAutoCacheMaintenanceCleaner,
    autoActivateAllServices,
    autoCleanNightly2AM3AMWithSavingsVault,
    toggleAutoSaveMode
  } = useStorageManager();

  if (!isOpen) return null;

  const usedMB = (breakdown.usedBytes / (1024 * 1024)).toFixed(1);
  const quotaMB = Math.round(breakdown.quotaBytes / (1024 * 1024));

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-5 flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-black uppercase tracking-wider">
              <HardDrive className="w-3 h-3 text-emerald-400" />
              <span>Storage &amp; Cache Governance</span>
            </div>
            <h2 className="text-lg font-black text-white">
              Device Storage Manager
            </h2>
            <p className="text-xs text-stone-300">
              Control cached resources, avoid storage bloat, and manage downloaded files.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Storage Meter Bar */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-700 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-stone-500" />
                <span>500 GB Vault Offline Cache Storage</span>
              </span>
              <span className="font-mono font-bold text-blue-900">
                {breakdown.estimatedVaultUsedGB.toFixed(1)} GB used of {breakdown.allocatedVaultCapacityGB} GB Vault
              </span>
            </div>

            <div className="w-full bg-stone-200 rounded-full h-3.5 overflow-hidden relative">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  breakdown.is400GBSignalAlertActive
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 animate-pulse'
                    : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500'
                }`}
                style={{ width: `${Math.max(3, Math.min(100, (breakdown.estimatedVaultUsedGB / 500) * 100))}%` }}
              />
              {/* 400 GB Auto-Cleaner Threshold Marker */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-red-600 z-10"
                style={{ left: '80%' }}
                title="400 GB Auto-Cleaner Threshold Signal Marker (80%)"
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1">
              <span>Auto-Cleaner Marker: <strong className="text-amber-700">400 GB Threshold</strong></span>
              <span>{breakdown.isPersisted ? '🔒 500 GB Storage Persisted' : 'Persistent Storage Active'}</span>
            </div>
          </div>

          {/* 400 GB Signal Alert Indicator */}
          {breakdown.is400GBSignalAlertActive && (
            <div className="p-3 bg-amber-500/15 border-2 border-amber-500/50 rounded-2xl text-amber-900 text-xs font-bold flex items-start gap-2 animate-pulse">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="uppercase text-amber-950">🚨 400 GB CACHE USAGE SIGNAL ALERT ACTIVATED</strong>
                <p className="text-[11px] text-amber-800 mt-0.5 font-normal">
                  400 GB storage threshold reached! Built-in background maintenance auto-cleaner is active, purging temporary render buffers to maintain ultra-fast 60 FPS app performance.
                </p>
              </div>
            </div>
          )}

          {/* Breakdown Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-stone-200 rounded-2xl p-3.5 space-y-1">
              <span className="text-[10px] font-bold text-stone-500 uppercase">CacheStorage Buckets</span>
              <div className="text-lg font-black text-stone-900">{breakdown.cacheCount}</div>
              <span className="text-[10px] text-stone-500">Service Worker Shell &amp; Fonts</span>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-3.5 space-y-1">
              <span className="text-[10px] font-bold text-stone-500 uppercase">Draft Vault Records</span>
              <div className="text-lg font-black text-blue-900">{breakdown.draftsCount}</div>
              <span className="text-[10px] text-stone-500">Locally saved lesson plans</span>
            </div>
          </div>

          {/* Clear Result Notice */}
          {clearResult && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{clearResult}</span>
            </div>
          )}

          {/* Safety & Action Panel */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
            <h4 className="font-black text-stone-900 uppercase tracking-wide text-xs">
              Storage Optimization Actions
            </h4>

            <div className="space-y-2.5">
              {/* Optional Auto-Save Mode Toggle */}
              <div className="bg-white border border-stone-200 rounded-xl p-3 flex items-center justify-between shadow-xs">
                <div className="space-y-0.5">
                  <div className="text-xs font-black text-stone-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Optional Auto-Saving Mode</span>
                  </div>
                  <p className="text-[10px] text-stone-500">
                    {breakdown.isAutoSaveEnabled ? 'Auto-saves lesson plans & SF forms every 15s' : 'Manual save mode (Auto-save disabled)'}
                  </p>
                </div>

                <button
                  onClick={() => toggleAutoSaveMode(!breakdown.isAutoSaveEnabled)}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs transition cursor-pointer flex items-center gap-1 ${
                    breakdown.isAutoSaveEnabled
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                  }`}
                >
                  <span>{breakdown.isAutoSaveEnabled ? '✓ AUTO-SAVE: ON' : 'AUTO-SAVE: OFF'}</span>
                </button>
              </div>

              {/* Command 1: Auto-Activate All Services */}
              <button
                onClick={() => autoActivateAllServices()}
                disabled={isClearing}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 hover:brightness-110 text-cyan-300 font-black rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md border border-cyan-400 disabled:opacity-60"
              >
                <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
                <span>⚡ COMMAND: AUTO-ACTIVATE ALL DATA SERVICES</span>
              </button>

              {/* Command 2: Nightly 2AM-3AM Auto Cleaner with Savings Mode Vault */}
              <button
                onClick={() => autoCleanNightly2AM3AMWithSavingsVault()}
                disabled={isClearing}
                className="w-full py-2.5 px-3 bg-gradient-to-r from-emerald-800 to-teal-900 hover:brightness-110 text-emerald-200 font-black rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm border border-emerald-400 disabled:opacity-60"
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-300" />
                <span>⚡ NIGHTLY 2AM-3AM AUTO-CLEANER (SAVINGS VAULT PROTECTED)</span>
              </button>

              {/* Command 3: Maximize 500 GB Vault */}
              <button
                onClick={() => maximize500GBCacheVault()}
                disabled={isClearing}
                className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:brightness-110 text-stone-950 font-black rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md border border-amber-300 disabled:opacity-60"
              >
                <Database className="w-3.5 h-3.5 text-stone-950" />
                <span>⚡ COMMAND: MAXIMIZE 500 GB OFFLINE CACHE VAULT</span>
              </button>

              <button
                onClick={exportDraftsBackup}
                className="w-full py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-stone-600" />
                <span>Export Draft Vault JSON Backup</span>
              </button>
            </div>

            <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-600 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p>
                <strong>Data Protection:</strong> Cleaning cache removes obsolete asset versions and temporary preview buffers. Your cloud login, draft lesson plans, and master teacher settings are strictly protected.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={refreshStorageMetrics}
            className="text-[11px] text-stone-600 hover:text-stone-900 font-bold flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Recalculate Storage</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
