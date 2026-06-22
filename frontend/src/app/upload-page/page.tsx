'use client';

import React from 'react';
import AppLayout from '@/components/AppLayout';
import AuthGuard from '@/components/AuthGuard';
import UploadDropzone from './components/UploadDropzone';
import ProcessingQueue from './components/ProcessingQueue';
import DocumentLibrary from './components/DocumentLibrary';
import { Database, ShieldCheck } from 'lucide-react';

export default function UploadPage() {
  return (
    <AuthGuard>
      <AppLayout currentPath="/upload-page">
        <div
          className="min-h-screen px-6 py-8 xl:px-10 bg-[#050816]"
          style={{
            background: 'radial-gradient(circle at top, #0c1126, #050816 70%)',
          }}
        >
          {/* HEADER SECTOR PANEL */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-white/10 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                Universal Document Ingestion
              </h1>
              <p className="text-sm text-gray-400 mt-1.5">
                Aggregate technical manuals, OEM specifications, and engineering asset corpuses into the centralized vector matrix.
              </p>
            </div>

            {/* INTEGRITY CORE SYSTEM STATUS BADGE */}
            <div className="flex items-center gap-2 bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2 text-xs text-gray-300 font-medium mt-4 md:mt-0 w-fit self-start md:self-auto">
              <Database size={14} className="text-orange-500" />
              <span className="font-mono uppercase tracking-wider text-[11px]">Corpus Node Active</span>
            </div>
          </div>

          {/* INGESTION COMPONENT HOUSING GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* DROPZONE ACCENT WRAPPER */}
            <div 
              className="xl:col-span-2 rounded-3xl p-1 border transition hover:border-orange-500/10 duration-300"
              style={{
                background: 'rgba(255,255,255,0.01)',
                borderColor: 'rgba(255,255,255,0.04)',
              }}
            >
              <UploadDropzone />
            </div>

            {/* PROCESSING QUEUE ACCENT WRAPPER */}
            <div 
              className="rounded-3xl p-1 border transition hover:border-orange-500/10 duration-300"
              style={{
                background: 'rgba(255,255,255,0.01)',
                borderColor: 'rgba(255,255,255,0.04)',
              }}
            >
              <ProcessingQueue />
            </div>
          </div>

          {/* CENTRAL SYSTEM ASSET ARCHIVE VIEW */}
          <div 
            className="rounded-3xl p-6 border bg-[#0f172a]/20"
            style={{
              borderColor: 'rgba(255,255,255,0.06)',
            }}
          >
            <div className="mb-4 px-2">
              <h3 className="text-lg font-bold text-white tracking-tight">Active Plant Document Library</h3>
              <p className="text-xs text-gray-400 mt-0.5">Verified tracking files currently mapped to downstream execution modules.</p>
            </div>
            
            <DocumentLibrary />
          </div>

        </div>
      </AppLayout>
    </AuthGuard>
  );
}