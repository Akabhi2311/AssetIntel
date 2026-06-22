'use client';

import React from 'react';
import {
  X,
  FileText,
  StickyNote,
  PlayCircle,
  Image,
} from 'lucide-react';

interface Source {
  id: string;
  docTitle: string;
  docType: 'pdf' | 'note' | 'youtube' | 'image';
  chunkText: string;
  relevanceScore: number;
  page?: number;
  timestamp?: string;
}

interface Props {
  open: boolean;
  sources: Source[];
  onClose: () => void;
}

const typeConfig: Record<
  string,
  {
    icon: React.ReactNode;
    color: string;
    label: string;
  }
> = {
  pdf: {
    icon: <FileText size={14} />,
    color: '#ef4444',
    label: 'PDF Document',
  },

  note: {
    icon: <StickyNote size={14} />,
    color: '#8b5cf6',
    label: 'Text Note',
  },

  youtube: {
    icon: <PlayCircle size={14} />,
    color: '#f59e0b',
    label: 'YouTube',
  },

  image: {
    icon: <Image size={14} />,
    color: '#10b981',
    label: 'Image',
  },
};

export default function SourcePanel({
  open,
  sources,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <aside
      className="w-96 border-l flex flex-col"
      style={{
        background:
          'linear-gradient(180deg,#070b17,#0b1120)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      {/* HEADER */}
      <div
        className="p-5 border-b flex items-center justify-between"
        style={{
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        <div>
          <h2 className="text-white font-bold text-lg">
            Document Sources
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Relevant chunks used for answer generation
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl transition hover:bg-white/10"
        >
          <X size={18} className="text-gray-300" />
        </button>
      </div>

      {/* SOURCES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {sources.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            No sources available
          </div>
        )}

        {sources.map((src) => {
          const config = typeConfig[src.docType];

          return (
            <div
              key={src.id}
              className="rounded-2xl border p-4"
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* TOP */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${config.color}20`,
                    color: config.color,
                  }}
                >
                  {config.icon}
                </div>

                <div>
                  <p className="text-white font-semibold">
                    {src.docTitle}
                  </p>

                  <p className="text-xs text-gray-400">
                    {config.label}
                    {src.page ? ` • Page ${src.page}` : ''}
                  </p>
                </div>
              </div>

              {/* CHUNK */}
              <div
                className="rounded-xl p-4 text-sm leading-7"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  color: '#d1d5db',
                }}
              >
                {src.chunkText}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}