'use client';

import React from 'react';
import { RefreshCw, Calendar } from 'lucide-react';

interface Props {
  onRefresh: () => void;
}

export default function DashboardHeader({ onRefresh }: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-white/10 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Operations Control Room
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Asset Intelligence Matrix — Live System Telemetry
        </p>
      </div>

      <div className="flex items-center gap-3 mt-4 md:mt-0">
        <div className="flex items-center gap-2 bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2 text-xs text-gray-300 font-medium">
          <Calendar size={14} className="text-orange-500" />
          <span>Active Shift Baseline</span>
        </div>

        <button
          onClick={onRefresh}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:opacity-95 text-white rounded-xl px-4 py-2 text-xs font-semibold shadow-md active:scale-95 transition"
        >
          <RefreshCw size={14} />
          <span>Sync Matrix</span>
        </button>
      </div>
    </div>
  );
}