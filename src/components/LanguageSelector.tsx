import React from 'react';

export const LanguageSelector: React.FC = () => {
  return (
    <div className="flex gap-2">
      <button className="px-2 py-1 rounded bg-stone-100 text-[10px] font-bold">EN</button>
      <button className="px-2 py-1 rounded bg-stone-100 text-[10px] font-bold">FIL</button>
      <button className="px-2 py-1 rounded bg-stone-100 text-[10px] font-bold">CEB</button>
    </div>
  );
};
