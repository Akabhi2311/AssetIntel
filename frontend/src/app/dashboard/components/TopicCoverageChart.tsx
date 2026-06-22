'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SECTOR_SATURATION_DATA = [
  { name: 'Mechanical SOPs', value: 85 },
  { name: 'LOTO Regulations', value: 94 },
  { name: 'Vibration RCA', value: 72 },
  { name: 'Electrical Safety', value: 64 },
];

export default function TopicCoverageChart() {
  return (
    <div className="rounded-3xl p-6 border h-[380px] flex flex-col" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white tracking-tight">Plant Sector Saturation</h3>
        <p className="text-xs text-gray-400">Compliance clearance metrics across localized operations</p>
      </div>

      <div className="flex-1 w-full min-h-0 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={SECTOR_SATURATION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" stroke="#64748b" tickLine={false} tickFormatter={(value) => value.split(' ')[0]} />
            <YAxis stroke="#64748b" tickLine={false} domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar dataKey="value" name="Saturation %" fill="#ea580c" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}