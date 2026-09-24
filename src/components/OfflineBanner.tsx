import React from 'react';
import { WifiOff, CloudOff, RefreshCw } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineBanner: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-40 bg-gradient-to-r from-amber-600 to-amber-700 text-white p-3.5 rounded-2xl shadow-2xl border border-amber-400/50 flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <WifiOff className="w-4 h-4 text-white animate-pulse" />
        </div>
        <div className="space-y-0.5">
          <div className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
            <span>Offline Mode Active</span>
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          </div>
          <p className="text-[11px] text-amber-100 font-medium leading-tight">
            Using cached lessons, math/science tools &amp; local Draft Vault. Changes sync automatically when internet restores.
          </p>
        </div>
      </div>
    </div>
  );
};
