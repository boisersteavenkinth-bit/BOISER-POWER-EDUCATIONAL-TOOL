import React from 'react';

export const ReportGenerator: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
      <h3 className="text-sm font-black text-stone-700">DepEd Automated Report Generator (SF1-SF10)</h3>
      <p className="text-xs text-stone-500">Select form to auto-generate from synced database.</p>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">Generate SF1</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">Generate SF2</button>
      </div>
    </div>
  );
};
