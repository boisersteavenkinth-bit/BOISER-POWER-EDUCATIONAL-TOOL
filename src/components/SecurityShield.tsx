import React, { useEffect, useState } from 'react';
import { ShieldAlert, Lock, AlertOctagon, UserX, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SecurityShieldProps {
  children: React.ReactNode;
  isOwner: boolean;
  ownerName: string;
}

export const SecurityShield: React.FC<SecurityShieldProps> = ({ children, isOwner, ownerName }) => {
  const [isTampered, setIsTampered] = useState(false);
  const [tamperType, setTamperType] = useState<string | null>(null);

  useEffect(() => {
    if (isOwner) return; // Owner has full access

    // 1. Disable Right-Click (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerTamperAlert('Unauthorized Access: Context Menu Disabled by Boiser Security.');
    };

    // 2. Disable Keyboard Shortcuts (DevTools, View Source, Save)
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        triggerTamperAlert('Security Protocol: DevTools blocked.');
      }
      // Ctrl+Shift+I / J (Inspect / Console)
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
        triggerTamperAlert('Security Protocol: Inspection tools blocked.');
      }
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        triggerTamperAlert('Security Protocol: Source viewing blocked.');
      }
      // Ctrl+S (Save)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        triggerTamperAlert('Security Protocol: Content saving blocked.');
      }
      // Ctrl+C (Copy)
      if (e.ctrlKey && e.key === 'c') {
        // We allow some copying if necessary, but can block it globally if desired
        // e.preventDefault();
        // triggerTamperAlert('Content Protection: Copying disabled.');
      }
    };

    // 3. Detect DevTools Opening
    const devToolsDetector = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        triggerTamperAlert('Anti-Reverse Engineering: DevTools Detected.');
      }
    };

    const triggerTamperAlert = (type: string) => {
      setTamperType(type);
      setIsTampered(true);
      console.clear();
      console.log('%c STOP! ', 'background: red; color: white; font-size: 50px; font-weight: bold;');
      console.log('%c This application and its code are the intellectual property of Steaven Kinth D. Boiser. Unauthorized access or copying is strictly prohibited. ', 'font-size: 20px; color: red;');
      
      setTimeout(() => setIsTampered(false), 5000);
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    const interval = setInterval(devToolsDetector, 1000);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [isOwner]);

  return (
    <div className="relative min-h-screen select-none outline-none">
      {/* 4. PROPRIETARY WATERMARK (Anti-Screenshot/AI) */}
      {!isOwner && (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden opacity-[0.03] select-none">
          <div className="absolute inset-0 flex flex-wrap gap-20 p-10 rotate-[-25deg] scale-150">
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="text-2xl font-black whitespace-nowrap tracking-[0.5em] text-slate-900">
                PROPRIETARY PROPERTY OF STEAVEN KINTH D. BOISER • DO NOT COPY • BOISER POWER TOOLS
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={isOwner ? '' : 'user-select-none pointer-events-auto'}>
        {children}
      </div>

      {/* Security Intercept Modal */}
      <AnimatePresence>
        {isTampered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full bg-red-600 rounded-[2rem] p-10 text-center shadow-[0_0_50px_rgba(220,38,38,0.5)] border-4 border-white/20"
            >
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldAlert size={48} className="text-white" />
              </div>
              <h2 className="text-3xl font-black text-white mb-4">SECURITY BREACH</h2>
              <p className="text-red-100 font-bold mb-6 uppercase tracking-wider">
                {tamperType}
              </p>
              <div className="bg-black/20 p-4 rounded-2xl mb-8 text-sm text-red-50 text-left border border-white/10 font-mono">
                Unauthorized attempt to access internal coding logic detected. All activity is logged and reported to the Owner: <strong>{ownerName}</strong>.
              </div>
              <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em]">
                Boiser Cyber-Security Shield v2.5
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .select-none {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .user-select-none * {
          user-select: none !important;
          -webkit-user-drag: none !important;
        }
      `}</style>
    </div>
  );
};
