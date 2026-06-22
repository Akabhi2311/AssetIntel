'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const VISUAL_TREND_DATA = [
  { date: '06-18', uploads: 1, quizzes: 2, queries: 14 },
  { date: '06-19', uploads: 2, quizzes: 1, queries: 23 },
  { date: '06-20', uploads: 4, quizzes: 3, queries: 29 },
  { date: '06-21', uploads: 3, quizzes: 2, queries: 38 },
  { date: '06-22', uploads: 6, quizzes: 3, queries: 42 }, // Matches your current active runs
];

export default function ActivityChart() {
  return (
    <div className="rounded-3xl p-6 border h-[380px] flex flex-col" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white tracking-tight">Daily Activity Matrix</h3>
        <p className="text-xs text-gray-400">Ingestion instances vs active copilot verification pipelines</p>
      </div>

      <div className="flex-1 w-full min-h-0 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={VISUAL_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="date" stroke="#64748b" tickLine={false} />
            <YAxis stroke="#64748b" tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Line type="monotone" dataKey="uploads" name="Asset Ingestions" stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="quizzes" name="Compliance Audits" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="queries" name="Copilot Queries" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}