'use client';

import React from 'react';
import { AlertCircle, ShieldCheck, Zap } from 'lucide-react';

interface Insight {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
}

interface Props {
  insights: Insight[];
}

export default function InsightCards({ insights }: Props) {
  return (
    <div className="rounded-3xl p-6 border flex flex-col h-[320px]" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white tracking-tight">AI Generated Operational Insights</h3>
        <p className="text-xs text-gray-400">Automated system cross-reference logs</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 custom-scrollbar">
        {insights && insights.length > 0 ? (
          insights.map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-[#0f172a]/50 border border-white/5 flex gap-3 items-start hover:border-orange-500/10 transition">
              <div className="mt-0.5 shrink-0">
                {item.type === 'critical' ? (
                  <AlertCircle size={16} className="text-red-500" />
                ) : item.type === 'compliance' ? (
                  <ShieldCheck size={16} className="text-green-400" />
                ) : (
                  <Zap size={16} className="text-orange-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wide">{item.title}</h4>
                  <span className="text-[10px] font-mono text-gray-500 shrink-0">{item.timestamp}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 leading-5">{item.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-500 text-center py-8">No system anomalies flagged.</p>
        )}
      </div>
    </div>
  );
}