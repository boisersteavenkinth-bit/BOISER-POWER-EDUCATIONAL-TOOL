import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Database,
  RefreshCw,
  Download,
  Upload,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Layers,
  FileSpreadsheet,
  FileText,
  Activity,
  Wifi,
  WifiOff
} from 'lucide-react';
import { VerificationStatusLevel } from '../types/masterResearchCurriculum';

export const DataGovernanceModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'governance' | 'unified_search' | 'audit_log'>('governance');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [syncQueueCount, setSyncQueueCount] = useState<number>(3);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const mockAuditLogs = [
    { id: 1, action: 'VERIFY_CURRICULUM', record: 'S8FE-Ia-15', user: 'STEAVEN KINTH BOISER', timestamp: '2026-09-22 10:15:20', status: 'SUCCESS' },
    { id: 2, action: 'IMPORT_CSV_BATCH', record: 'BATCH-20260922-01', user: 'STEAVEN KINTH BOISER', timestamp: '2026-09-22 09:40:11', status: 'SUCCESS' },
    { id: 3, action: 'APPROVE_RRL_SOURCE', record: 'RES-2024-001', user: 'DepEd Reviewer', timestamp: '2026-09-21 16:30:00', status: 'VERIFIED' }
  ];

  const handleRunSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setSyncQueueCount(0);
      setIsSyncing(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#001f5c] via-[#0038A8] to-[#002776] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-400/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCD116] text-[#002776] text-xs font-black uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Data Security &amp; Provenance Governance
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Data Governance Center</h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-2xl">
              Curriculum version control, source verification status approval, offline-first synchronization queue, audit logs, and data backup/restore.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-3 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isOnline ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
              }`}
            >
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              <span>{isOnline ? 'Online Synced' : 'Offline Mode'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="mt-6 pt-6 border-t border-white/15 flex flex-wrap items-center gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('governance')}
            className={`px-4 py-2 rounded-xl transition cursor-pointer ${
              activeTab === 'governance' ? 'bg-[#FCD116] text-[#002776]' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Governance &amp; Offline Sync
          </button>
          <button
            onClick={() => setActiveTab('unified_search')}
            className={`px-4 py-2 rounded-xl transition cursor-pointer ${
              activeTab === 'unified_search' ? 'bg-[#FCD116] text-[#002776]' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Unified Search Engine
          </button>
          <button
            onClick={() => setActiveTab('audit_log')}
            className={`px-4 py-2 rounded-xl transition cursor-pointer ${
              activeTab === 'audit_log' ? 'bg-[#FCD116] text-[#002776]' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Audit Log &amp; Provenance
          </button>
        </div>
      </div>

      {/* TAB 1: GOVERNANCE & OFFLINE SYNC */}
      {activeTab === 'governance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <RefreshCw className="w-4 h-4 text-[#0038A8]" />
                <span>Offline-First Sync Queue</span>
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                {syncQueueCount} Pending Local Changes
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              BOISER maintains full offline functionality. When offline, lesson plans, research entries, and CSV imports are cached locally in browser storage and queued for background sync when internet becomes available.
            </p>

            <button
              onClick={handleRunSync}
              disabled={isSyncing || syncQueueCount === 0}
              className="w-full py-3 rounded-2xl bg-[#0038A8] hover:bg-[#002776] text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-[#FCD116] ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Synchronizing Queue...' : 'Force Synchronize Now'}</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm border-b border-stone-100 pb-3">
              <Database className="w-4 h-4 text-emerald-600" />
              <span>Database Backup &amp; Disaster Recovery</span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Export complete local database state (Curriculum, Competencies, Science, Math, Research Literature, RRLs, and Audit Logs) to JSON or CSV for offsite backup.
            </p>

            <div className="flex gap-2">
              <button className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer">
                <Download className="w-4 h-4 text-stone-600" />
                <span>Backup DB (JSON)</span>
              </button>
              <button className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer">
                <Upload className="w-4 h-4 text-stone-600" />
                <span>Restore DB (JSON)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: UNIFIED SEARCH ENGINE */}
      {activeTab === 'unified_search' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-base font-bold text-stone-900">BOISER Unified Education &amp; Research Search</h3>
            <p className="text-xs text-stone-500">
              Cross-entity search across Curriculum, Science, Math, Research Literature, Action Research, and Interventions.
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all curriculum, competencies, science, math, RRL, and interventions..."
              className="w-full text-xs pl-11 pr-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:border-[#0038A8] font-medium"
            />
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
            <span className="font-bold text-stone-700 uppercase tracking-wider block">Unified Search Index Status</span>
            <p className="text-stone-600">
              Indexed 100% of curriculum records, 15-year research literature, Science &amp; Math competency tables, and classroom interventions.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT LOG */}
      {activeTab === 'audit_log' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-base font-bold text-stone-900">Provenance &amp; Security Audit Log</h3>
            <p className="text-xs text-stone-500">
              Immutable log tracking curriculum modifications, CSV batch imports, and source verification approvals.
            </p>
          </div>

          <div className="overflow-x-auto border border-stone-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Target Record</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-mono text-[11px] text-stone-800">
                {mockAuditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-stone-50">
                    <td className="p-3 text-stone-400">{log.id}</td>
                    <td className="p-3 font-bold text-[#0038A8]">{log.action}</td>
                    <td className="p-3">{log.record}</td>
                    <td className="p-3">{log.user}</td>
                    <td className="p-3 text-stone-500">{log.timestamp}</td>
                    <td className="p-3 font-extrabold text-emerald-700">{log.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
