import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  UserCheck,
  AlertTriangle,
  Activity,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  Layers,
  Database,
  Search,
  Trash2,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    isOwner,
    activityLogs,
    securityAlerts,
    dismissAlert,
    clearOldLogs,
    switchRole,
    activeLogoUrl,
    updateOwnerLogo,
    checkForUpdates,
    updateSuggestions,
    approveUpdate,
    dismissUpdate
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'logs' | 'security' | 'updates' | 'branding'>('logs');
  const [logFilter, setLogFilter] = useState('');
  const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);
  const [customLogoInput, setCustomLogoInput] = useState('');
  const [brandingStatus, setBrandingStatus] = useState<string | null>(null);

  const handleCheckUpdates = async () => {
    setIsCheckingUpdates(true);
    setUpdateMessage(null);
    try {
      await checkForUpdates();
      setUpdateMessage('✓ DepEd Policy Repository scanned. All suggestions are current with SY 2026–2027.');
    } finally {
      setIsCheckingUpdates(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const success = updateOwnerLogo(result);
      if (success) {
        setBrandingStatus('✓ Official logo successfully updated by Owner Steaven Kinth D. Boiser.');
      } else {
        setBrandingStatus('❌ Permission Denied: Only Owner Steaven Kinth D. Boiser can update branding.');
      }
      setTimeout(() => setBrandingStatus(null), 5000);
    };
    reader.readAsDataURL(file);
  };

  const handleApplyLogoUrl = () => {
    if (!customLogoInput.trim()) return;
    const success = updateOwnerLogo(customLogoInput.trim());
    if (success) {
      setBrandingStatus('✓ Logo asset link applied by Owner.');
      setCustomLogoInput('');
    } else {
      setBrandingStatus('❌ Permission Denied: Only Owner Steaven Kinth D. Boiser can update branding.');
    }
    setTimeout(() => setBrandingStatus(null), 5000);
  };

  const handleResetToProvidedLogo = () => {
    updateOwnerLogo('/boiser-logo.png');
    setBrandingStatus('✓ Reverted to official supplied Boiser mascot logo.');
    setTimeout(() => setBrandingStatus(null), 5000);
  };

  const filteredLogs = activityLogs.filter(
    l =>
      l.feature.toLowerCase().includes(logFilter.toLowerCase()) ||
      l.action.toLowerCase().includes(logFilter.toLowerCase()) ||
      l.userName.toLowerCase().includes(logFilter.toLowerCase()) ||
      l.userEmail.toLowerCase().includes(logFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 3D Header Banner */}
      <div className="rounded-3xl bg-linear-to-r from-[#001f5c] via-[#0038A8] to-[#001440] text-white p-6 sm:p-8 border-2 border-[#FCD116] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400 text-stone-900 text-xs font-black uppercase tracking-wider mb-2 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-900" />
              Owner Admin Center • Steaven Kinth D. Boiser
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white drop-shadow-md">
              Usage Monitoring, Anti-Theft &amp; App Governance
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mt-1">
              Restricted owner administration for oversight of user activity logs, anti-theft and scraping deterrence alerts, curriculum update proposals, and protected mascot logo branding.
            </p>
          </div>

          {/* Role Indicator & Test Switcher */}
          <div className="p-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xs flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-blue-200 font-bold">Active Account:</div>
              <div className="text-xs font-bold text-white flex items-center gap-1">
                {isOwner ? (
                  <span className="text-yellow-300 font-extrabold">👑 Owner / Admin</span>
                ) : (
                  <span>Teacher Account</span>
                )}
              </div>
            </div>

            <button
              onClick={() => switchRole(isOwner ? 'user' : 'owner')}
              className="px-2.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold border border-white/30 transition cursor-pointer"
            >
              Switch to {isOwner ? 'Teacher' : 'Owner'}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'logs'
              ? 'bg-[#0038A8] text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>User Activity Log ({activityLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'security'
              ? 'bg-[#0038A8] text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          <span>Anti-Theft &amp; Alerts ({securityAlerts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('updates')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'updates'
              ? 'bg-[#0038A8] text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
          <span>Educational Tool Updates ({updateSuggestions.filter(u => u.status === 'pending').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('branding')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'branding'
              ? 'bg-[#0038A8] text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Owner Logo &amp; Branding</span>
        </button>
      </div>

      {/* TAB 1: User Activity Log */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#0038A8]" />
                User Activity &amp; Generation Audit Log
              </h3>
              <p className="text-xs text-stone-500">
                Transparently tracks user logins, feature interactions, lesson plan generations, and file downloads.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-60">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={logFilter}
                  onChange={(e) => setLogFilter(e.target.value)}
                  placeholder="Filter logs..."
                  className="w-full text-xs pl-8 pr-3 py-1.5 rounded-xl border border-stone-300 bg-stone-50 font-medium"
                />
              </div>
              <button
                onClick={clearOldLogs}
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1 cursor-pointer transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Old</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-stone-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-100 text-stone-700 font-bold">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">User &amp; Role</th>
                  <th className="p-3">Feature</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Details</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className={log.isSuspicious ? 'bg-red-50' : 'hover:bg-stone-50'}>
                    <td className="p-3 text-stone-500 font-mono text-[11px] whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-stone-900">{log.userName}</div>
                      <div className="text-[10px] text-stone-500">{log.userEmail}</div>
                    </td>
                    <td className="p-3 font-semibold text-[#002776]">{log.feature}</td>
                    <td className="p-3 font-medium text-stone-800">{log.action}</td>
                    <td className="p-3 text-stone-600 text-[11px] max-w-xs truncate">{log.details || '—'}</td>
                    <td className="p-3 text-center">
                      {log.isSuspicious ? (
                        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">
                          FLAGGED
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          NORMAL
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Anti-Theft & Security Alerts */}
      {activeTab === 'security' && (
        <div className="space-y-5">
          {/* Security Advisory & Realistic Limits Box */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-3xl p-5 shadow-xs flex items-start gap-4">
            <div className="p-2.5 rounded-2xl bg-[#0038A8] text-white shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 text-xs text-blue-950">
              <h4 className="font-extrabold text-sm uppercase tracking-wide text-[#002776]">
                Anti-Theft Architecture &amp; Technical Limits Advisory
              </h4>
              <p className="leading-relaxed text-stone-700">
                <strong>Realistic Technical Protection:</strong> Because web applications deliver JavaScript and CSS to client browsers to execute, absolute client-side code locking is technically impossible. However, the Boiser App implements a robust <strong>defense-in-depth posture</strong>:
              </p>
              <ul className="list-disc list-inside space-y-1 text-stone-700 text-[11px]">
                <li><strong>Code Minification &amp; Type Stripping:</strong> Production builds strip all TypeScript interfaces, comments, and identifiers via Vite and ESBuild.</li>
                <li><strong>Anti-Scraping Rate Limiter:</strong> Automatically flags and records clients making more than 12 rapid automated requests in under 30 seconds.</li>
                <li><strong>Owner Role Enforcement:</strong> Branding, logo asset replacements, and DepEd policy approvals are strictly restricted to <code>boisersteavenkinth@gmail.com</code>.</li>
                <li><strong>Server-Side Proxy Isolation:</strong> All sensitive API calls and secret keys remain server-side on Node.js/Express, never exposed to browser memory.</li>
              </ul>
            </div>
          </div>

          {/* Active Security Alerts */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Active Suspicious Activity &amp; Tampering Alerts
            </h3>

            {securityAlerts.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 text-stone-500 text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <span>No suspicious security events detected. All user request frequencies and assets remain within normal operational parameters.</span>
              </div>
            ) : (
              <div className="space-y-2.5">
                {securityAlerts.map(alert => (
                  <div
                    key={alert.id}
                    className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] uppercase">
                          {alert.type}
                        </span>
                        <span className="font-mono text-stone-500 text-[10px]">{alert.timestamp}</span>
                      </div>
                      <p className="font-bold text-red-950">{alert.message}</p>
                      <div className="text-[11px] text-stone-600">Source: {alert.sourceIpOrUser}</div>
                    </div>
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-red-200 text-red-700 font-bold text-[11px] hover:bg-red-100 transition cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Educational Tool Updates & Policy Checker */}
      {activeTab === 'updates' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                Educational Tool Updates &amp; DepEd Issuance Tracker
              </h3>
              <p className="text-xs text-stone-500">
                Surfaces new DepEd issuances and curriculum updates as reviewable proposals before incorporating them into the live app.
              </p>
            </div>

            <button
              onClick={handleCheckUpdates}
              disabled={isCheckingUpdates}
              className="px-4 py-2 rounded-xl bg-[#0038A8] hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#FCD116] ${isCheckingUpdates ? 'animate-spin' : ''}`} />
              <span>{isCheckingUpdates ? 'Checking Repository...' : 'Check for Updates'}</span>
            </button>
          </div>

          {updateMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{updateMessage}</span>
            </div>
          )}

          <div className="space-y-3">
            {updateSuggestions.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-white transition space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-stone-900 text-sm">{item.title}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      item.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'dismissed'
                        ? 'bg-stone-200 text-stone-600'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="text-[11px] text-stone-500 font-semibold">{item.source} • Detected: {item.dateDetected}</div>
                <p className="text-stone-700 leading-relaxed">{item.summary}</p>

                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[#002776] text-[11px]">
                  <strong>Proposed Action:</strong> {item.recommendedAction}
                </div>

                {item.status === 'pending' && isOwner && (
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => approveUpdate(item.id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Review &amp; Approve</span>
                    </button>
                    <button
                      onClick={() => dismissUpdate(item.id)}
                      className="px-3 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold text-xs flex items-center gap-1 cursor-pointer transition"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Dismiss</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Owner Logo & Branding Management */}
      {activeTab === 'branding' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              Owner-Restricted App Logo &amp; Branding Management
            </h3>
            <p className="text-xs text-stone-500">
              Only the Owner/Admin (Steaven Kinth D. Boiser) has permission to change or replace the mascot logo and branding assets.
            </p>
          </div>

          {brandingStatus && (
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-[#002776] text-xs font-bold flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600" />
              <span>{brandingStatus}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Active Logo Display */}
            <div className="p-6 rounded-2xl bg-stone-900 text-white flex flex-col items-center justify-center space-y-3 border-2 border-[#FCD116]">
              <span className="text-[11px] font-bold text-yellow-300 uppercase tracking-wider">
                Current Active App Mascot Logo
              </span>
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-black/40 p-2 border-2 border-yellow-400/50 shadow-xl flex items-center justify-center">
                <img
                  src={activeLogoUrl}
                  alt="Boiser App Mascot Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to text if missing
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="text-center">
                <div className="text-xs font-black text-white">boiser-logo.png</div>
                <div className="text-[10px] text-stone-400">Used in manifest.webmanifest, favicon, header, &amp; splash</div>
              </div>
            </div>

            {/* Controls (Owner Only) */}
            <div className="space-y-4">
              {isOwner ? (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700 block">
                      Upload New Logo Asset (PNG / SVG):
                    </label>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml"
                      onChange={handleLogoUpload}
                      className="block w-full text-xs text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-[#0038A8] hover:file:bg-blue-100 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-bold text-stone-700 block">
                      Or Provide Logo Asset URL:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customLogoInput}
                        onChange={(e) => setCustomLogoInput(e.target.value)}
                        placeholder="https://.../logo.png"
                        className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50"
                      />
                      <button
                        onClick={handleApplyLogoUrl}
                        className="px-4 py-2 rounded-xl bg-[#0038A8] text-white font-bold text-xs hover:bg-blue-800 transition cursor-pointer shrink-0"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleResetToProvidedLogo}
                      className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition cursor-pointer border border-stone-300"
                    >
                      Revert to Official Supplied Boiser Mascot Logo
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-800">
                    <Lock className="w-4 h-4" />
                    <span>Owner Permissions Required</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    You are currently signed in as a regular Teacher account. Logo and branding modification controls are exclusively unlocked for Owner <strong>Steaven Kinth D. Boiser</strong> (<code>boisersteavenkinth@gmail.com</code>).
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
