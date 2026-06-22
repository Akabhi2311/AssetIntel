'use client';

export default function SummaryPanel({ summary, files }: any) {
  return (
    <div className="bg-gray-900 p-4 rounded">
      <h2 className="text-lg font-bold text-white mb-3">
        📄 Documents
      </h2>

      {!files || files.length === 0 ? (
        <p className="text-gray-400">No documents uploaded</p>
      ) : (
        <ul className="space-y-2">
          {files.map((file: string, i: number) => (
            <li
              key={i}
              className="text-gray-300 border-b border-gray-800 pb-1"
            >
              📄 {file}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}