'use client';

import React from 'react';
import { FileText, Database, ShieldAlert, CheckCircle, Activity, Clock } from 'lucide-react';

interface Props {
  stats: any;
  insights: any;
  loading: boolean;
}

export default function KPIBentoGrid({ stats, insights, loading }: Props) {
  const currentStats = stats || {
    totalFiles: 6,
    totalChunks: 248,
    questionsAnswered: 42,
    activeClearances: 8,
    meanTimeToIsolate: '4.2 mins',
    systemStatus: 'NOMINAL',
    mttr: '38 mins',
    availability: '99.8%'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {/* CARD 1: INDEXED ASSET RECORDS */}
      <div className="rounded-2xl p-6 border bg-[#0f172a]/30 border-white/5 flex flex-col justify-between group hover:border-orange-500/20 transition">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold">Indexed Asset Records</span>
          <FileText size={20} className="text-orange-500" />
        </div>
        <div className="mt-4">
          <h2 className="text-4xl font-mono font-bold text-white">{currentStats.totalFiles}</h2>
          <p className="text-xs text-gray-500 mt-1">Active Technical Log Volumes</p>
        </div>
      </div>

      {/* CARD 2: KNOWLEDGE VECTOR COORDINATES */}
      <div className="rounded-2xl p-6 border bg-[#0f172a]/30 border-white/5 flex flex-col justify-between group hover:border-orange-500/20 transition">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold">Knowledge Vector Coordinates</span>
          <Database size={20} className="text-orange-500" />
        </div>
        <div className="mt-4">
          <h2 className="text-4xl font-mono font-bold text-white">{currentStats.totalChunks}</h2>
          <p className="text-xs text-gray-500 mt-1">Parsed Vector Node Blocks</p>
        </div>
      </div>

      {/* CARD 3: COMPLIANCE AUDITS */}
      <div className="rounded-2xl p-6 border bg-[#0f172a]/30 border-white/5 flex flex-col justify-between group hover:border-orange-500/20 transition">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold">Compliance Audits Executed</span>
          <CheckCircle size={20} className="text-green-500" />
        </div>
        <div className="mt-4">
          <h2 className="text-4xl font-mono font-bold text-white">{currentStats.activeClearances}</h2>
          <p className="text-xs text-gray-500 mt-1">Completed Safety Run Checks</p>
        </div>
      </div>

      {/* CARD 4: OPERATOR READINESS RATE */}
      <div className="rounded-2xl p-6 border bg-[#0f172a]/30 border-white/5 flex flex-col justify-between group hover:border-orange-500/20 transition">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold">Audit Score Baseline</span>
          <Activity size={20} className="text-amber-500" />
        </div>
        <div className="mt-4">
          <h2 className="text-4xl font-mono font-bold text-amber-500">{currentStats.availability}</h2>
          <p className="text-xs text-gray-500 mt-1">Operator Readiness Rate</p>
        </div>
      </div>

      {/* CARD 5: MEAN TIME TO ISOLATE */}
      <div className="rounded-2xl p-6 border bg-[#0f172a]/30 border-white/5 flex flex-col justify-between group hover:border-orange-500/20 transition">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold">Safe Run Time Baseline</span>
          <Clock size={20} className="text-orange-500" />
        </div>
        <div className="mt-4">
          <h2 className="text-4xl font-mono font-bold text-white">{currentStats.meanTimeToIsolate}</h2>
          <p className="text-xs text-gray-500 mt-1">Continuous Safety Streak</p>
        </div>
      </div>

      {/* CARD 6: HIGH-RISK LACUNAE */}
      <div className="rounded-2xl p-6 border bg-[#0f172a]/30 border-white/5 flex flex-col justify-between group hover:border-orange-500/20 transition">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold">High-Risk Asset Lacunae</span>
          <ShieldAlert size={20} className="text-emerald-500" />
        </div>
        <div className="mt-4">
          <h2 className="text-4xl font-mono font-bold text-emerald-400">0</h2>
          <p className="text-xs text-gray-500 mt-1">Nominal Matrix Thresholds</p>
        </div>
      </div>
    </div>
  );
}