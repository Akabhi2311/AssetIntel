'use client';

import { useState } from 'react';
import { generateQuestions } from '@/lib/api';

export default function QuestionGenerator() {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    const data = await generateQuestions({
      topic,
      type: "mcq",
      difficulty: "easy",
      count: 5
    });

    setResult(data.raw);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Question Generator</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Enter topic (e.g. threads)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate Questions"}
      </button>

      <pre className="mt-4 whitespace-pre-wrap">
        {result}
      </pre>
    </div>
  );
}