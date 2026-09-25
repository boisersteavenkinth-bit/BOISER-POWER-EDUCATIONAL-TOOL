import React, { useState, useEffect } from 'react';
import { ShieldAlert, Lock, AlertTriangle, CheckCircle2, UserCheck, X } from 'lucide-react';
import { MASTER_CREATOR_EMAIL } from '../services/securityAlertService';

export const RespectfulLockoutModal: React.FC = () => {
  const [lockoutData, setLockoutData] = useState<{
    email: string;
    name: string;
    reason: string;
    lockDurationMs: number;
  } | null>(null);

  useEffect(() => {
    const handleLockout = (e: CustomEvent) => {
      setLockoutData(e.detail);
    };

    window.addEventListener('boiser_user_locked_out_respectfully' as any, handleLockout);
    return () => {
      window.removeEventListener('boiser_user_locked_out_respectfully' as any, handleLockout);
    };
  }, []);

  if (!lockoutData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border-4 border-amber-400 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 text-stone-900">
        <div className="flex items-start justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shadow-xs">
              <ShieldAlert className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-black text-[10px] uppercase tracking-wider">
                Institutional Security Protocol
              </span>
              <h3 className="text-lg font-black text-stone-900 mt-0.5">
                Respectful System Notice
              </h3>
            </div>
          </div>
          <button
            onClick={() => setLockoutData(null)}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs leading-relaxed text-stone-700">
          <p className="font-medium">
            Dear <strong>{lockoutData.name || 'User'}</strong> ({lockoutData.email}),
          </p>
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-red-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-red-600" />
              <span>5-Hour Account Restriction Engaged</span>
            </div>
            <p className="text-[11px] text-red-800">
              Unverified, high-frequency, or prohibited system operations were intercepted ({lockoutData.reason}).
            </p>
          </div>

          <p className="text-stone-600">
            To ensure complete DepEd data governance, LIS student privacy, and system integrity, your active session has been safely logged out.
          </p>

          <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-2xl text-stone-800 text-[11px] space-y-1">
            <div className="font-bold text-amber-950 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Master Creator Authorization Required</span>
            </div>
            <p className="text-stone-700">
              In accordance with school security guidelines, account re-activation is exclusively under the authorization of <strong>Master Creator Steaven Kinth D. Boiser</strong> (<span className="font-mono text-stone-900">{MASTER_CREATOR_EMAIL}</span>) via the Master Creator Dashboard.
            </p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end">
          <button
            onClick={() => setLockoutData(null)}
            className="w-full py-3 bg-[#092B62] hover:bg-blue-900 text-white font-black text-xs rounded-xl shadow-md transition cursor-pointer"
          >
            Acknowledge &amp; Proceed
          </button>
        </div>
      </div>
    </div>
  );
};
