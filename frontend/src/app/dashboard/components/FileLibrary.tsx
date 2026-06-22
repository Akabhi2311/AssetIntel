'use client';

import { useEffect, useState } from 'react';

export default function FileLibrary() {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:8000/files', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setFiles(data.files || []);
    };

    fetchFiles();
  }, []);

  return (
    <div className="bg-gray-900 p-4 rounded">
      <h2 className="text-lg font-bold mb-3">📁 Documents</h2>

      {files.length === 0 ? (
        <p className="text-gray-400">No documents uploaded</p>
      ) : (
        <ul className="space-y-2">
          {files.map((file: any, i: number) => (
            <li
              key={i}
              className="p-2 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
              onClick={() => {
                window.location.href = `/summary?doc=${file.id}`;
              }}
            >
              {file.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}