'use client';

import React from 'react';
import { Wrench } from 'lucide-react';

interface Recommendation {
  id: string;
  priority: string;
  asset: string;
  action: string;
  impact: string;
}

interface Props {
  recommendations: Recommendation[];
}

export default function RecommendationsPanel({ recommendations }: Props) {
  return (
    <div className="rounded-3xl p-6 border flex flex-col h-[320px]" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white tracking-tight">Reliability Engineering Actions</h3>
        <p className="text-xs text-gray-400">Prescriptive mitigation protocols from parsed data corpus</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 custom-scrollbar">
        {recommendations && recommendations.length > 0 ? (
          recommendations.map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-[#0f172a]/50 border border-white/5 hover:border-orange-500/10 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-200 flex items-center gap-1.5">
                  <Wrench size={12} className="text-orange-500" />
                  {item.asset}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider ${
                  item.priority === 'CRITICAL' 
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                    : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                }`}>
                  {item.priority}
                </span>
              </div>
              <p className="text-xs font-medium text-gray-300 leading-5">{item.action}</p>
              <p className="text-[11px] text-gray-500 mt-1 leading-4 italic">Impact: {item.impact}</p>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-500 text-center py-8">No structural recommendations logged.</p>
        )}
      </div>
    </div>
  );
}