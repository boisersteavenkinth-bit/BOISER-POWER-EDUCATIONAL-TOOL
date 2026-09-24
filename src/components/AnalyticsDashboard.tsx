import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const AnalyticsDashboard: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
      <h3 className="text-sm font-black text-stone-700 mb-4">Class Performance Trends</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="grade" fill="#0b4ea2" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
