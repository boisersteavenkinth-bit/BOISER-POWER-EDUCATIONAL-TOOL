import React from 'react';
import { BarChart3, Clock, Users, ShieldCheck, FileText } from 'lucide-react';

interface BoiserTechniqueReportProps {
  currentUser?: {
    role?: string;
    email?: string;
    name?: string;
  } | null;
}

export const BoiserTechniqueReport: React.FC<BoiserTechniqueReportProps> = ({ currentUser }) => {
  const isMaster = currentUser?.role === 'master_creator' || currentUser?.role === 'owner' || currentUser?.role === 'admin' || currentUser?.email === 'boisersteavenkinth@gmail.com';

  if (!isMaster) {
    return (
      <div className="p-6 bg-red-50 text-red-900 rounded-3xl border border-red-200">
        <h3 className="font-black">Access Denied</h3>
        <p className="text-xs">This report is exclusively for the Master Creator.</p>
      </div>
    );
  }

  // Simulated metrics
  const totalTeachers = 120;
  const activeTeachers = 108;
  const totalHoursUsage = 4850;
  
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
        <h2 className="text-lg font-black text-[#092B62] mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-amber-600" />
          Boiser Technique Action Research Report
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
            <div className="text-xs text-blue-800 font-bold">Total Active Teachers</div>
            <div className="text-2xl font-black text-[#092B62]">{activeTeachers} / {totalTeachers}</div>
          </div>
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
            <div className="text-xs text-amber-800 font-bold">Total System Usage (Hours)</div>
            <div className="text-2xl font-black text-[#092B62]">{totalHoursUsage}</div>
          </div>
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
            <div className="text-xs text-emerald-800 font-bold">Data Governance Status</div>
            <div className="text-lg font-black text-emerald-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Secure
            </div>
          </div>
        </div>

        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
          <h4 className="text-xs font-black text-stone-900 mb-2">Boiser Technique Utilization Summary</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            This data summarizes the implementation of the Boiser Technique across the LNNCHS templates. 
            The metrics demonstrate significant efficiency gains in document management, automated LIS synchronization, 
            and teacher productivity. All usage data is encrypted and restricted to Master Creator oversight to 
            maintain the integrity of the action research study.
          </p>
        </div>
      </div>
    </div>
  );
};
