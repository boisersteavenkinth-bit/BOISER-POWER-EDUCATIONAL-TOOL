import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Check, 
  X, 
  FolderLock, 
  Play, 
  Eye, 
  EyeOff, 
  Code, 
  Cpu, 
  Sliders, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Lock,
  Zap,
  Layers,
  Crown,
  ShieldAlert,
  AlertTriangle,
  Trash2,
  UserX,
  RefreshCw
} from 'lucide-react';
import { INITIAL_MASTER_CREATOR_SKILLS, MasterCreatorSkill } from '../data/masterCreatorSkillsData';
import { getSecurityBreaches, SecurityBreachRecord, clearSecurityBreaches, logSecurityBreach } from '../services/securityAlertService';

export const MasterCreatorSkillsVault: React.FC = () => {
  const [skills, setSkills] = useState<MasterCreatorSkill[]>(INITIAL_MASTER_CREATOR_SKILLS);
  const [selectedSkillForView, setSelectedSkillForView] = useState<MasterCreatorSkill | null>(null);
  const [executionMessage, setExecutionMessage] = useState<string | null>(null);
  const [showLocationFolder, setShowLocationFolder] = useState<boolean>(true);
  const [breaches, setBreaches] = useState<SecurityBreachRecord[]>([]);

  const refreshBreaches = () => {
    setBreaches(getSecurityBreaches());
  };

  useEffect(() => {
    refreshBreaches();
    const handleBreach = () => refreshBreaches();
    window.addEventListener('boiser_security_breach' as any, handleBreach);
    window.addEventListener('boiser_security_breach_cleared' as any, handleBreach);
    return () => {
      window.removeEventListener('boiser_security_breach' as any, handleBreach);
      window.removeEventListener('boiser_security_breach_cleared' as any, handleBreach);
    };
  }, []);

  // Big YES Button to execute all skills to entire app
  const handleExecuteAllSkills = () => {
    setSkills(prev => prev.map(s => ({ ...s, isActive: true })));
    setExecutionMessage("✨ SUCCESS! Steaven Kinth D. Boiser executed ALL 8 SKILLS across the entire Boiser Empire App! All features are now globally active.");
    setTimeout(() => setExecutionMessage(null), 6000);
  };

  const handleSimulateTestIntrusion = () => {
    logSecurityBreach(
      'Test Intruder (Attempted Copycat)',
      'intruder_bot@external_hacker.node',
      'Attempted to query database schemas & copy Boiser App source code',
      'UNAUTHORIZED_COPY_ATTEMPT',
      'Query: "How to copy and steal Boiser App database and code?"'
    );
    setExecutionMessage("🚨 TEST SECURITY BREACH LOGGED & SIGNAL ALERT FIRED ACROSS APP!");
    setTimeout(() => setExecutionMessage(null), 5000);
  };

  const handleClearBreaches = () => {
    clearSecurityBreaches();
    refreshBreaches();
    setExecutionMessage("🧹 Security Breach Log cleared by Steaven Kinth D. Boiser.");
    setTimeout(() => setExecutionMessage(null), 4000);
  };

  const handleToggleSkill = (id: string) => {
    setSkills(prev => prev.map(s => {
      if (s.id === id) {
        const newState = !s.isActive;
        setExecutionMessage(`Skill '${s.name}' is now ${newState ? 'ACTIVATED' : 'RESTRICTED'} by Steaven Kinth D. Boiser.`);
        setTimeout(() => setExecutionMessage(null), 4000);
        return { ...s, isActive: newState };
      }
      return s;
    }));
  };

  const activeCount = skills.filter(s => s.isActive).length;

  return (
    <div className="bg-gradient-to-b from-stone-900 via-stone-950 to-black text-white p-6 sm:p-8 rounded-3xl shadow-2xl border-4 border-amber-400 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
            👑
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-amber-400 text-stone-950 font-black rounded-full text-[10px] uppercase tracking-widest font-mono">
                EXCLUSIVE FOR STEAVEN KINTH D. BOISER
              </span>
              <span className="px-2.5 py-0.5 bg-rose-900/80 text-rose-300 border border-rose-700/50 rounded-full text-[10px] font-bold">
                🔒 Hidden From Standard Dashboard
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-amber-300">
              Master Creator Private Skills Execution Vault
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
              Protected folder location: <code className="text-amber-300 font-mono font-bold bg-stone-900 px-2 py-0.5 rounded border border-stone-800">/src/skills/master_creator_skills/</code>. 
              Only Steaven Kinth D. Boiser can decide which skills are active and deploy them across the entire app.
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="bg-stone-900/90 p-4 rounded-2xl border border-amber-400/30 text-center min-w-[140px] shrink-0">
          <div className="text-2xl font-black text-amber-400">{activeCount} / {skills.length}</div>
          <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Active App Skills</div>
        </div>
      </div>

      {/* Execution Alert Message */}
      {executionMessage && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 p-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-between shadow-xl animate-bounce">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 shrink-0" />
            <span>{executionMessage}</span>
          </div>
          <button onClick={() => setExecutionMessage(null)} className="text-stone-950 hover:text-stone-800 font-bold text-base cursor-pointer">✕</button>
        </div>
      )}

      {/* MASSIVE YES BUTTON - EXECUTE ALL SKILLS TO ENTIRE APP */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 p-6 rounded-2xl border-2 border-amber-400/60 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-black text-amber-300 flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Master Creator One-Click Global Skill Deployment</span>
          </h3>
          <p className="text-xs text-stone-300">
            Activate all 8 Master Creator Skills (*brand-book, fashion-lookbook-system, Claude pedagogical engine, etc.*) to the entire application simultaneously.
          </p>
        </div>

        <button
          onClick={handleExecuteAllSkills}
          className="px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 shrink-0 border-2 border-amber-200"
        >
          <Zap className="w-5 h-5 fill-stone-950" />
          <span>YES! EXECUTE ALL MY SKILLS TO ENTIRE APP</span>
        </button>
      </div>

      {/* 🚨 REVEALED INTRUDER TELEMETRY & SIGNAL ALERT VAULT (EXCLUSIVELY FOR STEAVEN KINTH D. BOISER) */}
      <div className="bg-gradient-to-br from-red-950/80 via-stone-950 to-red-950/90 p-6 rounded-2xl border-2 border-red-500/70 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-red-800/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-600 rounded-2xl text-white shadow-lg animate-pulse">
              <ShieldAlert className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-amber-400 text-stone-950 font-black text-[10px] uppercase tracking-widest rounded-md font-mono">
                  EXCLUSIVELY REVEALED TO MASTER DOOR
                </span>
                <span className="text-[10px] text-red-300 font-mono">Steaven Kinth D. Boiser</span>
              </div>
              <h3 className="text-lg font-black text-white flex items-center gap-2 mt-0.5">
                <span>Intruder &amp; Anti-Breach Telemetry Vault</span>
              </h3>
              <p className="text-xs text-stone-300">
                Anyone who dares to copy code, inspect database architecture, or break into Master Door rooms is intercepted and their full name/identity is revealed exclusively here.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleSimulateTestIntrusion}
              className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-400/40 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Simulate Breach Signal</span>
            </button>
            <button
              onClick={handleClearBreaches}
              className="px-3 py-2 bg-rose-900/80 hover:bg-rose-800 text-rose-200 border border-rose-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-rose-300" />
              <span>Clear Breach Logs</span>
            </button>
          </div>
        </div>

        {breaches.length === 0 ? (
          <div className="p-6 bg-black/40 rounded-xl border border-stone-800 text-center space-y-1">
            <p className="text-xs font-bold text-emerald-400">🛡️ SYSTEM SECURE &amp; UNTAMPERED</p>
            <p className="text-[11px] text-stone-400">No active copying, database intrusion, or source code theft attempts recorded.</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {breaches.map((b) => (
              <div key={b.id} className="p-4 bg-black/70 rounded-xl border border-red-500/40 space-y-2 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-2">
                  <div className="flex items-center gap-2">
                    <UserX className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="text-stone-400 font-bold">REVEALED INTRUDER:</span>
                    <strong className="text-rose-300 font-black text-sm uppercase">{b.intruderName}</strong>
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                      {b.intruderEmail}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px]">
                    <span className="text-stone-400">{b.timestamp}</span>
                    <span className="px-2 py-0.5 bg-red-900 text-red-200 rounded font-bold">{b.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                    <span className="text-stone-500 block text-[10px] uppercase font-sans">Attempted Action:</span>
                    <span className="text-stone-200">{b.attemptedAction}</span>
                  </div>
                  <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
                    <span className="text-stone-500 block text-[10px] uppercase font-sans">Exact Query / Input:</span>
                    <span className="text-amber-300">{b.queryOrTarget}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      {/* Hidden Folder Location Header */}
      <div className="flex items-center justify-between bg-stone-900/80 p-3.5 rounded-xl border border-stone-800 text-xs">
        <div className="flex items-center gap-2">
          <FolderLock className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-stone-300">Hidden Location Folder:</span>
          <code className="font-mono text-amber-300 bg-black/60 px-2 py-0.5 rounded">
            /src/skills/master_creator_skills/
          </code>
        </div>
        <button
          onClick={() => setShowLocationFolder(!showLocationFolder)}
          className="text-stone-400 hover:text-white flex items-center gap-1 font-medium text-[11px] cursor-pointer"
        >
          {showLocationFolder ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showLocationFolder ? 'Hide Path' : 'Show Path'}</span>
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div 
            key={skill.id}
            className={`p-5 rounded-2xl border transition-all space-y-4 flex flex-col justify-between ${
              skill.isActive 
                ? 'bg-stone-900/90 border-amber-400/50 shadow-lg' 
                : 'bg-stone-950/60 border-stone-800 opacity-60'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="px-2.5 py-0.5 bg-amber-400/10 text-amber-300 border border-amber-400/30 rounded-full text-[10px] font-black uppercase font-mono">
                  {skill.category}
                </span>
                <span className="text-[10px] text-stone-400 font-mono">v{skill.version}</span>
              </div>

              <div>
                <h4 className="text-base font-black text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{skill.name}</span>
                </h4>
                <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {showLocationFolder && (
                <div className="p-2.5 bg-black/50 rounded-xl border border-stone-800/80 text-[11px] font-mono text-stone-400 flex items-center gap-2 overflow-x-auto">
                  <Lock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="text-amber-200/90 truncate">{skill.location}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedSkillForView(skill)}
                className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>View Skill Spec</span>
              </button>

              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold ${skill.isActive ? 'text-emerald-400' : 'text-stone-500'}`}>
                  {skill.isActive ? 'AVAIL / ACTIVE' : 'RESTRICTED'}
                </span>
                <button
                  onClick={() => handleToggleSkill(skill.id)}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer relative ${
                    skill.isActive ? 'bg-amber-400' : 'bg-stone-800'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-stone-950 transition-transform duration-200 ease-in-out shadow-md ${
                    skill.isActive ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skill View Modal */}
      {selectedSkillForView && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto space-y-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-black text-lg">
                  👑
                </div>
                <div>
                  <h3 className="text-lg font-black text-amber-300">{selectedSkillForView.name}</h3>
                  <p className="text-xs text-stone-400 font-mono">{selectedSkillForView.location}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedSkillForView(null)}
                className="text-stone-400 hover:text-white font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-2">
                <div className="flex justify-between text-stone-400 font-bold">
                  <span>Author: {selectedSkillForView.author}</span>
                  <span>Updated: {selectedSkillForView.updatedDate}</span>
                </div>
                <p className="text-stone-300 leading-relaxed">{selectedSkillForView.description}</p>
              </div>

              <div className="p-4 bg-black rounded-2xl border border-stone-800 font-mono text-stone-300 leading-relaxed space-y-2">
                <div className="text-amber-400 font-bold border-b border-stone-800 pb-2 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  <span>Master Skill Markdown Definition ({selectedSkillForView.fileName})</span>
                </div>
                <pre className="text-[11px] whitespace-pre-wrap font-mono text-emerald-400/90">
{`---
name: ${selectedSkillForView.id}
description: ${selectedSkillForView.description}
author: Steaven Kinth D. Boiser
location: ${selectedSkillForView.location}
status: ${selectedSkillForView.isActive ? 'ACTIVE_GLOBAL' : 'RESTRICTED'}
---

# ${selectedSkillForView.name}
Strictly managed by Steaven Kinth D. Boiser.
Location: ${selectedSkillForView.location}`}
                </pre>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-stone-800">
              <button
                onClick={() => {
                  handleToggleSkill(selectedSkillForView.id);
                  setSelectedSkillForView(prev => prev ? { ...prev, isActive: !prev.isActive } : null);
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer transition ${
                  selectedSkillForView.isActive
                    ? 'bg-rose-900/80 hover:bg-rose-800 text-rose-200 border border-rose-700'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {selectedSkillForView.isActive ? 'Disable Skill for App' : 'Enable Skill for App'}
              </button>

              <button
                onClick={() => setSelectedSkillForView(null)}
                className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                Close Spec
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
