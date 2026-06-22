'use client';

import { useEffect, useState } from 'react';
import AuthGuard from '@/components/AuthGuard';

export default function SummaryPage() {

  const [files, setFiles] = useState<any[]>([]);
  const [selectedSummary, setSelectedSummary] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  // 🔥 FETCH DOCUMENTS
  const fetchFiles = async () => {

    try {

      const token = localStorage.getItem('token');

      const res = await fetch(
        'http://localhost:8000/files',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setFiles(Array.isArray(data) ? data : data.files || []); 

    } catch (err) {
      console.error('Failed to fetch files:', err);
    }
  };

  // 🔥 DELETE DOCUMENT
  const deleteDocument = async (id: number) => {

    try {

      const token = localStorage.getItem('token');

      await fetch(
        `http://localhost:8000/delete-document/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // 🔥 REFRESH FILES
      fetchFiles();

      // 🔥 CLEAR SUMMARY
      setSelectedSummary('');

    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  // 🔥 OPEN SUMMARY
  const openSummary = async (id: number) => {

    try {

      setLoading(true);

      const token = localStorage.getItem('token');

      const res = await fetch(
        `http://localhost:8000/summary/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setSelectedSummary(data.summary);

    } catch (err) {

      console.error('Summary fetch failed:', err);

      setSelectedSummary(
        'Failed to load summary.'
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="p-8 text-white min-h-screen bg-black">

      <h1 className="text-3xl font-bold mb-6">
        📄 RCA & Fault Pattern Diagnosis Engine
      </h1>

      <div className="grid grid-cols-12 gap-6">

        {/* DOCUMENT LIST */}
        <div className="col-span-4 bg-gray-900 rounded-xl p-4 border border-gray-800">

          <h2 className="text-xl font-semibold mb-4">
            Active Ingestion Corpus Logs
          </h2>

          <div className="space-y-3">

            {files.length === 0 && (
              <p className="text-gray-400">
                No Active Ingestion Corpus Logs
              </p>
            )}

            {Array.isArray(files) && files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-2"
              >

                {/* DOCUMENT BUTTON */}
                <button
                  onClick={() => openSummary(file.id)}
                  className="flex-1 text-left bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition"
                >
                  📘 {file.filename}
                </button>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => deleteDocument(file.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg"
                >
                  🗑
                </button>

              </div>
            ))}

          </div>
        </div>

        {/* SUMMARY PANEL */}
        <div className="col-span-8 bg-gray-900 rounded-xl p-6 border border-gray-800">

          <h2 className="text-2xl font-bold mb-4">
            Structured Failure Diagnosis Package
          </h2>

          {loading ? (

            <p className="text-gray-400">
              Loading summary...
            </p>

          ) : (

            <div className="text-gray-300 leading-8 whitespace-pre-line">

              {selectedSummary || (
                <p className="text-gray-500">
                  Select a document to view summary
                </p>
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}