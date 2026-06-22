'use client';

import React from 'react';
import { FileText, BrainCircuit } from 'lucide-react';

export default function ConversationSidebar() {
  return (
    <aside
      className="w-72 border-r flex flex-col"
      style={{
        background: 'linear-gradient(180deg,#060816,#0b1020)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-900/40">
            <BrainCircuit className="text-white" size={22} />
          </div>

          <div>
            <h2 className="text-white font-bold text-lg">
              SecondBrain
            </h2>

            <p className="text-xs text-gray-400">
              Personal AI Knowledge Base
            </p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="text-violet-400" size={18} />

            <h3 className="text-white font-semibold">
              RAG Assistant
            </h3>
          </div>

          <p className="text-sm text-gray-400 leading-6">
            Upload PDFs, ask questions, generate quizzes,
            and chat with your personal AI knowledge system.
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-auto p-5">
        <div className="rounded-xl bg-violet-600/10 border border-violet-500/20 p-4">
          <p className="text-violet-300 text-sm font-medium">
            Smart PDF Querying Enabled
          </p>

          <p className="text-xs text-violet-200/70 mt-2">
            Choose a PDF from the dropdown and ask
            document-specific questions.
          </p>
        </div>
      </div>
    </aside>
  );
}