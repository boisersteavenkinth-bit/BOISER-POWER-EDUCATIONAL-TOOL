import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, Eye, EyeOff, X, Lock, RefreshCw, Zap } from 'lucide-react';
import { getSecurityBreaches, SecurityBreachRecord, clearSecurityBreaches } from '../services/securityAlertService';

interface SecuritySignalAlertProps {
  currentUserRole?: string;
  currentUserName?: string;
}

export const SecuritySignalAlert: React.FC<SecuritySignalAlertProps> = ({
  currentUserRole,
  currentUserName
}) => {
  const [breaches, setBreaches] = useState<SecurityBreachRecord[]>([]);
  const [latestBreach, setLatestBreach] = useState<SecurityBreachRecord | null>(null);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [isAudioAlarmActive, setIsAudioAlarmActive] = useState<boolean>(false);

  const isMasterCreator = 
    currentUserRole === 'master_creator' || 
    currentUserName === 'Steaven Kinth D. Boiser';

  const loadBreaches = () => {
    const list = getSecurityBreaches();
    setBreaches(list);
    if (list.length > 0) {
      setLatestBreach(list[0]);
    }
  };

  useEffect(() => {
    loadBreaches();

    const handleBreachEvent = (e: CustomEvent) => {
      const breach: SecurityBreachRecord = e.detail;
      loadBreaches();
      setLatestBreach(breach);
      setIsAlertVisible(true);
      
      // Sound audio alarm beep using Web Audio API
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
        osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
        setIsAudioAlarmActive(true);
        setTimeout(() => setIsAudioAlarmActive(false), 3000);
      } catch (err) {
        console.log('Audio Context error', err);
      }
    };

    const handleClearedEvent = () => {
      setBreaches([]);
      setLatestBreach(null);
      setIsAlertVisible(false);
    };

    window.addEventListener('boiser_security_breach' as any, handleBreachEvent);
    window.addEventListener('boiser_security_breach_cleared' as any, handleClearedEvent);

    return () => {
      window.removeEventListener('boiser_security_breach' as any, handleBreachEvent);
      window.removeEventListener('boiser_security_breach_cleared' as any, handleClearedEvent);
    };
  }, []);

  if (!isAlertVisible && breaches.length === 0) return null;

  return (
    <div className="w-full bg-gradient-to-r from-red-950 via-rose-900 to-red-950 border-b-4 border-amber-400 text-white p-3 sm:p-4 shadow-2xl relative z-40 animate-fade-in font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left Section: Signal Alert Indicator */}
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl bg-red-600 text-white shadow-lg ${isAudioAlarmActive ? 'animate-ping' : 'animate-pulse'}`}>
            <ShieldAlert className="w-6 h-6 text-amber-300" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-amber-400 text-stone-950 text-[10px] font-black uppercase tracking-widest rounded-md font-mono">
                🚨 LIVE SECURITY SIGNAL ALERT
              </span>
              <span className="text-[11px] text-red-200 font-bold">
                {breaches.length} Intrusion / Copy Event(s) Intercepted
              </span>
            </div>
            <p className="text-xs font-black text-white tracking-wide">
              UNAUTHORIZED COPY / DATABASE ACCESS ATTEMPT DETECTED &amp; BLOCKED!
            </p>
          </div>
        </div>

        {/* Middle Section: Public Masked vs Master Revealed Name */}
        <div className="bg-black/40 p-3 rounded-2xl border border-red-500/40 text-xs flex-1 max-w-xl">
          {isMasterCreator ? (
            /* REVEALED TO STEAVEN KINTH D. BOISER ONLY */
            <div className="space-y-1">
              <div className="flex items-center justify-between text-amber-300 font-black text-[11px] uppercase tracking-wider">
                <span>👑 REVEALED EXCLUSIVELY TO MASTER CREATOR:</span>
                <span className="text-emerald-400 font-mono">STEAVEN KINTH D. BOISER ROOM</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                <div>
                  <span className="text-stone-400">Intruder Name: </span>
                  <strong className="text-rose-300 font-bold">{latestBreach?.intruderName || 'Unknown Visitor'}</strong>
                </div>
                <div>
                  <span className="text-stone-400">Email/ID: </span>
                  <strong className="text-amber-200 font-mono">{latestBreach?.intruderEmail || 'anonymous@node'}</strong>
                </div>
                <div>
                  <span className="text-stone-400">Attempted Action: </span>
                  <strong className="text-stone-200">{latestBreach?.attemptedAction || 'Copy / Database Query'}</strong>
                </div>
                <div>
                  <span className="text-stone-400">Query/Target: </span>
                  <strong className="text-amber-300 font-mono truncate block max-w-[200px]">{latestBreach?.queryOrTarget || 'Confidential Structures'}</strong>
                </div>
              </div>
            </div>
          ) : (
            /* PUBLIC ANONYMIZED WARNING FOR STANDARD USERS */
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-300 font-black text-[11px] uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>INTRUDER IDENTITY PROTECTED &amp; SENT TO MASTER DOOR:</span>
              </div>
              <p className="text-[11px] text-stone-200 leading-snug">
                An unauthorized user attempted to copy code or inspect database architecture. 
                The violator's name and device telemetry have been <strong className="text-amber-300">revealed exclusively to Steaven Kinth D. Boiser</strong> in the Master Creator Door.
              </p>
            </div>
          )}
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-2">
          {isMasterCreator && (
            <button
              onClick={() => {
                clearSecurityBreaches();
                alert('All breach logs and active signal alerts purged by Master Creator.');
              }}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black rounded-xl text-xs flex items-center gap-1 cursor-pointer shadow-md transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Purge Alert</span>
            </button>
          )}

          <button
            onClick={() => setIsAlertVisible(false)}
            className="p-1.5 bg-white/10 hover:bg-white/20 text-stone-200 rounded-xl cursor-pointer"
            title="Dismiss Signal Banner"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
