'use client';

import React from 'react';

import {
  BrainCircuit,
  CheckCircle2,
} from 'lucide-react';

export default function ProcessingQueue() {

  return (
    <div
      className="rounded-3xl p-6 h-full"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(14px)',
      }}
    >

      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-2xl bg-violet-600/20 flex items-center justify-center">
          <BrainCircuit
            size={24}
            className="text-violet-400"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            AI Pipeline
          </h2>

          <p className="text-sm text-gray-400">
            Your PDFs are processed automatically
          </p>
        </div>

      </div>

      <div className="space-y-4">

        {[
          'PDF Text Extraction',
          'Semantic Chunking',
          'Embedding Generation',
          'FAISS Vector Indexing',
          'AI Summary Generation',
        ].map((step, i) => (
          <div
            key={i}
            className="flex items-center gap-4"
          >

            <CheckCircle2
              size={18}
              className="text-green-400"
            />

            <span className="text-gray-300">
              {step}
            </span>

          </div>
        ))}

      </div>

      <div className="mt-8 rounded-2xl bg-violet-600/10 border border-violet-500/20 p-5">

        <p className="text-violet-300 font-medium">
          RAG System Active
        </p>

        <p className="text-violet-200/70 text-sm mt-2 leading-7">
          Uploaded PDFs become searchable instantly using semantic vector retrieval.
        </p>

      </div>

    </div>
  );
}