import React from 'react';
import { AlertTriangle } from 'lucide-react';

const industrialTopicMap: Record<string, string> = {
  'transaction': 'Hydrocarbon Processing (Sector B)',
  'transactions': 'Hydrocarbon Processing (Sector B)',
  'data analytics': 'Rotary Equipment Systems',
  'bayesian statistics': 'Vibration Frequency Predictors',
  'computer vision': 'P&ID Digitization OCR Pipeline',
  'reinforcement learning': 'Automated Dosing Actuators',
  'graph neural networks': 'Asset Structural Dependency Models',
  'ethics in ai': 'Regulatory Safety Guardrails',
  'distributed systems': 'Distributed SCADA Historians'
};

type Props = {
  weakTopics: { topic: string; accuracy: number }[];
};

export default function WeakTopicsPanel({ weakTopics }: Props) {
  return (
    <div className="bg-red-950/40 border border-red-500/20 p-5 rounded-2xl h-full">
      <h2 className="text-xl font-bold mb-4 text-red-400 flex items-center gap-2">
        <AlertTriangle size={20} /> 🚨 High-Risk Asset Lacunae
      </h2>

      {weakTopics.length === 0 ? (
        <p className="text-gray-400 text-sm">All assets within compliance thresholds 🎉</p>
      ) : (
        <div className="space-y-3">
          {weakTopics.map((t, i) => {
            const translatedTopic = industrialTopicMap[t.topic.toLowerCase()] || t.topic;
            return (
              <div key={i} className="bg-red-500/5 border border-red-500/10 p-3 rounded-xl">
                <p className="text-white font-medium text-sm">{translatedTopic}</p>
                <p className="text-xs text-red-300 mt-1">
                  Current Safety Integrity: <span className="font-bold">{t.accuracy ?? 0}%</span>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}