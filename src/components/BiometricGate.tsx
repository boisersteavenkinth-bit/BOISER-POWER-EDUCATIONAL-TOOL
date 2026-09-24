import React, { useState, useEffect } from 'react';
import { Fingerprint, ShieldCheck, Lock, Unlock, AlertCircle, RefreshCw, User, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { authenticateBiometric } from '../lib/webauthn';

interface BiometricGateProps {
  onUnlock: (isOwner: boolean) => void;
}

export const BiometricGate: React.FC<BiometricGateProps> = ({ onUnlock }) => {
  const [status, setStatus] = useState<'idle' | 'authenticating' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');

  const handleAuthenticate = async () => {
    setStatus('authenticating');
    setErrorMessage(null);
    
    try {
      // In a production environment, this would verify against a backend challenge
      await authenticateBiometric();
      
      setStatus('success');
      // Simulate identifying the user from the biometric credential
      // In this app, we assume if they pass biometric, they are either the owner or an authorized user
      const isOwner = true; // For this prototype, we'll assume the biometric belongs to the owner
      
      setTimeout(() => {
        onUnlock(isOwner);
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Biometric authentication failed. Please try again.');
    }
  };

  const skipAuth = () => {
    // Allows standard users to enter without the "Master" biometric
    onUnlock(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-900/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-900/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl text-center"
      >
        <div className="mb-8">
          <motion.div 
            animate={status === 'authenticating' ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
              status === 'success' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500' :
              status === 'error' ? 'bg-red-500/20 border-red-500 text-red-500' :
              status === 'authenticating' ? 'bg-blue-500/20 border-blue-500 text-blue-500' :
              'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {status === 'success' ? <Unlock size={48} /> : 
             status === 'error' ? <ShieldAlert size={48} /> :
             <Fingerprint size={48} />}
          </motion.div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Master Activation Required</h1>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          Verify identity to access **Proprietary Coding Logic**, <strong>Master Skills Space</strong>, and administrative data extractors.
        </p>

        <div className="space-y-4">
          <button
            onClick={handleAuthenticate}
            disabled={status === 'authenticating'}
            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
              status === 'authenticating' ? 'bg-slate-800 text-slate-500 cursor-not-allowed' :
              status === 'success' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' :
              'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 hover:scale-[1.02]'
            }`}
          >
            {status === 'authenticating' ? (
              <>
                <RefreshCw className="animate-spin" />
                Scanning...
              </>
            ) : status === 'success' ? (
              <>
                <ShieldCheck />
                Access Granted
              </>
            ) : (
              <>
                <Fingerprint />
                Scan Fingerprint
              </>
            )}
          </button>

          <button 
            onClick={skipAuth}
            className="w-full py-3 text-slate-500 hover:text-slate-300 transition-colors text-sm font-medium"
          >
            Enter as Standard User
          </button>
        </div>

        <AnimatePresence>
          {errorMessage && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-xs text-left"
            >
              <AlertCircle className="flex-shrink-0" />
              <p>{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 pt-8 border-t border-slate-800 flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] text-slate-500 font-bold">
                <User size={12} />
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            Protected by WebAuthn v2.0
          </p>
        </div>
      </motion.div>
      
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-slate-600 text-[10px] uppercase tracking-[0.2em] font-black">
          Boiser Power Tools • Security Infrastructure
        </p>
      </div>
    </div>
  );
};
