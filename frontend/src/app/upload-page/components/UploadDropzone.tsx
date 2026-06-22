'use client';

import React, { useCallback, useState } from 'react';

import { useDropzone } from 'react-dropzone';

import {
  Upload,
  FileText,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

import { toast } from 'sonner';

export default function UploadDropzone() {

  const [uploading, setUploading] =
    useState(false);

  const [uploadedFiles, setUploadedFiles] =
    useState<any[]>([]);

  const uploadFile = async (file: File) => {

    const token = localStorage.getItem('token');

    const formData = new FormData();

    formData.append('file', file);

    const res = await fetch(
      'http://localhost:8000/upload',
      {
        method: 'POST',

        headers: {
          Authorization: `Bearer ${token}`,
        },

        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error('Upload failed');
    }

    return res.json();
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {

      if (acceptedFiles.length === 0) return;

      setUploading(true);

      try {

        for (const file of acceptedFiles) {

          await uploadFile(file);

          setUploadedFiles((prev) => [
            ...prev,
            {
              name: file.name,
              size: (
                file.size /
                1024 /
                1024
              ).toFixed(1),
            },
          ]);
        }

        toast.success(
          `${acceptedFiles.length} PDF uploaded`
        );

      } catch (err) {

        console.error(err);

        toast.error('Upload failed');
      }

      setUploading(false);
    },
    []
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: true,
  });

  return (
    <div
      className="rounded-3xl border p-8"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(14px)',
      }}
    >

      {/* HEADER */}
      <div className="mb-8">

        <h2 className="text-2xl font-bold text-white mb-2">
          Upload PDFs
        </h2>

        <p className="text-gray-400">
          Drag & drop PDFs to ingest them into your AI knowledge base.
        </p>

      </div>

      {/* DROPZONE */}
      <div
        {...getRootProps()}
        className="
          border-2 border-dashed
          rounded-3xl
          p-16
          text-center
          cursor-pointer
          transition-all
        "
        style={{
          borderColor: isDragActive
            ? '#8b5cf6'
            : 'rgba(255,255,255,0.1)',

          background: isDragActive
            ? 'rgba(139,92,246,0.08)'
            : 'rgba(255,255,255,0.02)',
        }}
      >

        <input {...getInputProps()} />

        <div className="w-24 h-24 rounded-3xl bg-violet-600/20 flex items-center justify-center mx-auto mb-6">
          <Upload
            size={42}
            className="text-violet-400"
          />
        </div>

        <h3 className="text-2xl font-bold text-white mb-3">
          {isDragActive
            ? 'Drop PDFs here'
            : 'Ingest Technical Documentation Corpus'}
        </h3>

        <p className="text-gray-400 text-lg">
          Click or drag PDFs here
        </p>

        <p className="text-gray-500 text-sm mt-3">
          Multiple files supported · Max 50MB
        </p>

      </div>

      {/* STATUS */}
      {uploading && (
        <div className="flex items-center gap-3 mt-6 text-violet-400">
          <Loader2
            size={18}
            className="animate-spin"
          />

          <span>Uploading PDFs...</span>
        </div>
      )}

      {/* UPLOADED */}
      {uploadedFiles.length > 0 && (
        <div className="mt-8">

          <h3 className="text-white font-semibold mb-4">
            Recently Uploaded
          </h3>

          <div className="space-y-3">

            {uploadedFiles.map((file, i) => (
              <div
                key={i}
                className="
                  flex items-center justify-between
                  rounded-2xl
                  px-5 py-4
                  bg-white/5
                  border border-white/5
                "
              >

                <div className="flex items-center gap-3">

                  <FileText
                    size={18}
                    className="text-violet-400"
                  />

                  <div>
                    <p className="text-white">
                      {file.name}
                    </p>

                    <p className="text-xs text-gray-400">
                      {file.size} MB
                    </p>
                  </div>

                </div>

                <CheckCircle2
                  size={18}
                  className="text-green-400"
                />

              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  );
}