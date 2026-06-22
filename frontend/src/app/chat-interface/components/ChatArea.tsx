'use client';

import React, {
  useState,
  useRef,
  useEffect,
} from 'react';

import {
  Send,
  Loader2,
  Copy,
  Sparkles,
  FileText,
} from 'lucide-react';

import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface Props {
  conversationId: string;
}

function AssistantMessage({
  message,
}: {
  message: Message;
}) {
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="flex gap-4">
      <div
        className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg,#ea580c,#eab308)',
        }}
      >
        <Sparkles size={18} className="text-white" />
      </div>

      <div className="flex-1">
        <div
          className="rounded-3xl p-5"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p className="text-gray-200 leading-8 whitespace-pre-wrap text-base">
            {message.content}
          </p>
        </div>

        <div className="mt-2 flex items-center gap-4">
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-white transition"
          >
            <Copy size={15} />
          </button>

          <span className="text-xs text-gray-500">
            {message.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
}

function UserMessage({
  message,
}: {
  message: Message;
}) {
  return (
    <div className="flex justify-end">
      <div
        className="max-w-2xl rounded-3xl px-5 py-4"
        style={{
          background: 'linear-gradient(135deg,#ea580c,#b45309)',
        }}
      >
        <p className="text-white leading-7 text-base">
          {message.content}
        </p>
      </div>
    </div>
  );
}

export default function ChatArea({
  conversationId,
}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);
  
  // FIXED: Dynamic typing avoids the NaN -> null payload drop
  const [selectedPdf, setSelectedPdf] = useState<string | number | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/files', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setDocuments(data.files || data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const text = input;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          question: text,
          document_id: selectedPdf,
        }),
      });

      const data = await res.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'No response generated.',
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      toast.error('Failed to query operational intelligence corpus');
    }

    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#050816]">
      {/* INDUSTRIAL REBRAND HEADER */}
      <div className="px-8 py-6 border-b border-white/10">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Expert Field Copilot
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Query operational manuals, SOPs, and engineering assets in real-time.
        </p>
      </div>

      {/* PDF SELECTOR */}
      <div className="px-8 py-5 border-b border-white/10">
        <div className="max-w-md">
          <label className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-2 block">
            Select Active Reference Standard Asset
          </label>

          <div className="relative">
            <FileText
              size={18}
              className="absolute left-4 top-4 text-orange-500"
            />

            <select
              value={selectedPdf ?? ''}
              onChange={(e) => setSelectedPdf(e.target.value || null)}
              className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-12 py-4 text-white outline-none cursor-pointer focus:border-orange-500/50 transition text-sm"
            >
              <option value="">Ask across unified corpus matrix</option>
              {documents.map((doc: any) => (
                <option key={doc.id} value={doc.id}>
                  {doc.filename || doc.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* MESSAGES RUNSTREAM */}
      <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center my-auto">
            <div className="w-24 h-24 rounded-3xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center mb-6">
              <Sparkles size={40} className="text-orange-500" />
            </div>

            <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">
              Query Plant Operational Knowledge Base
            </h2>

            <p className="text-gray-400 max-w-2xl leading-8 text-base">
              Enter equipment tags, safety regulations, or maintenance records to isolate documentation context guidelines instantly.
            </p>
          </div>
        )}

        {messages.map((msg) =>
          msg.role === 'user' ? (
            <UserMessage key={msg.id} message={msg} />
          ) : (
            <AssistantMessage key={msg.id} message={msg} />
          )
        )}

        {loading && (
          <div className="flex items-center gap-3 text-orange-500 text-sm font-medium">
            <Loader2 size={16} className="animate-spin" />
            <span>Parsing engineering metrics...</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* FOOTER INPUT AREA */}
      <div className="p-6 border-t border-white/10">
        <div className="flex items-end gap-4">
          <div
            className="flex-1 rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <textarea
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Enter engineering, safety, or maintenance routing query..."
              className="w-full px-5 py-4 bg-transparent outline-none resize-none text-white text-sm leading-6"
            />
          </div>

          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="w-14 h-14 rounded-2xl flex items-center justify-center hover:opacity-90 transition active:scale-95 disabled:opacity-40 disabled:scale-100 shrink-0"
            style={{
              background: 'linear-gradient(135deg,#ea580c,#b45309)',
            }}
          >
            <Send size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}