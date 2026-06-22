'use client';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  Trash2,
  FileText,
} from 'lucide-react';

import { toast } from 'sonner';

export default function DocumentLibrary() {

  const [docs, setDocs] =
    useState<any[]>([]);

  const fetchDocs = async () => {

    try {

      const token =
        localStorage.getItem('token');

      const res = await fetch(
        'http://localhost:8000/files',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setDocs(data.files || data || []);

    } catch {

      toast.error(
        'Failed to load documents'
      );
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const deleteDoc = async (id: number) => {

    try {

      const token =
        localStorage.getItem('token');

      await fetch(
        `http://localhost:8000/delete-file/${id}`,
        {
          method: 'DELETE',

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Document deleted');

      fetchDocs();

    } catch {

      toast.error('Delete failed');
    }
  };

  return (
    <div
      className="rounded-3xl p-8"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(14px)',
      }}
    >

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Document Library
          </h2>

          <p className="text-gray-400 mt-1">
            Your uploaded PDFs
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-violet-600/10 border border-violet-500/20 text-violet-300 text-sm">
          {docs.length} PDFs
        </div>

      </div>

      {/* EMPTY */}
      {docs.length === 0 && (
        <div className="text-center py-20">

          <FileText
            size={52}
            className="mx-auto text-gray-600 mb-5"
          />

          <h3 className="text-xl font-semibold text-white mb-2">
            No PDFs uploaded
          </h3>

          <p className="text-gray-400">
            Upload PDFs to build your knowledge base
          </p>

        </div>
      )}

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {docs.map((doc: any) => (

          <div
            key={doc.id}
            className="
              rounded-2xl
              p-5
              bg-white/5
              border border-white/5
            "
          >

            <div className="flex items-start justify-between">

              <div className="flex gap-3">

                <div className="w-12 h-12 rounded-2xl bg-violet-600/20 flex items-center justify-center">
                  <FileText
                    size={22}
                    className="text-violet-400"
                  />
                </div>

                <div>

                  <h3 className="text-white font-medium break-all">
                    {doc.filename}
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    Uploaded PDF
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  deleteDoc(doc.id)
                }
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 size={18} />
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}