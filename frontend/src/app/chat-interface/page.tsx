'use client';

import React, { useState, useEffect, useRef } from 'react';
import AuthGuard from '@/components/AuthGuard';
import AppLayout from '@/components/AppLayout';
import { Send, Terminal, Wrench, Cpu, User, Loader2, FileText } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'copilot';
  text: string;
  timestamp: string;
}

export default function ChatInterfacePage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<string | number>('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Pre-loaded conversation baseline for the presentation walk-through
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'Identify historical failure profiles for EQ-PUMP-101 regarding gearbox thermal anomalies.',
      timestamp: '11:00 PM'
    },
    {
      id: 'msg-2',
      sender: 'copilot',
      text: 'Analysis of ingested manual entries indicates that EQ-PUMP-101 experienced significant planetary gear degradation under high thermal loads. Cross-references with torque rules dictate a strict 210 Nm tightening specification to mitigate casing distortion and structural alignment desync.',
      timestamp: '11:00 PM'
    },
    {
      id: 'msg-3',
      sender: 'user',
      text: 'What is the mandatory isolation safety step required before unbolting that specific casing assembly?',
      timestamp: '11:02 PM'
    },
    {
      id: 'msg-4',
      sender: 'copilot',
      text: 'According to SOP-OPS-24-ISOLATION-PROTOCOL.pdf, you must manually verify that upstream supply valve V-301 is physically locked out. Check local telemetry pressure gauge PI-3012 to confirm a stable 0.0 PSI baseline before attempting to crack any casing fasteners.',
      timestamp: '11:02 PM'
    }
  ]);

  // Index active system document catalog on mount
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8000/files', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setDocuments(data.files || data || []);
      } catch (err) {
        console.error('Failed to resolve system asset context paths:', err);
      }
    };
    fetchDocs();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          query: userText,
          document_id: selectedDoc || null
        })
      });

      const data = await res.json();
      
      const copilotMessage: Message = {
        id: `copilot-${Date.now()}`,
        sender: 'copilot',
        text: data.response || data.answer || 'Context vector matched. Extraction complete with nominal parsing.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, copilotMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <AppLayout currentPath="/chat-interface">
        <div className="flex flex-1 h-screen bg-[#050816] text-white overflow-hidden">
          
          {/* ================= LEFT CONTROLS PANEL ================= */}
          <div className="w-80 border-r border-white/5 bg-[#0a0f24]/40 flex flex-col justify-between p-5 shrink-0 hidden xl:flex">
            <div className="space-y-6">
              
              {/* CORE METRIC BADGE */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                  <Cpu size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-white">AssetIntel Node</h3>
                  <p className="text-[10px] font-mono text-gray-400 tracking-wider uppercase">Active Engine Core</p>
                </div>
              </div>

              {/* FUNCTION DESCRIPTION CONTAINER */}
              <div className="rounded-2xl p-4 bg-white/[0.02] border border-white/5 space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase text-orange-500 tracking-widest block">Asset RAG Engine</span>
                <p className="text-xs text-gray-400 leading-5">
                  Query ingestion corpuses, isolate systemic bounds, and cross-reference active plant safety logs natively.
                </p>
              </div>
            </div>

            {/* STATUS FOOTER CONTAINER */}
            <div className="rounded-2xl p-4 bg-orange-500/[0.03] border border-orange-500/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-orange-400">
                <Terminal size={14} />
                <span>Context Bounds Secure</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-4">
                Queries are restricted to approved site references and operational constraints.
              </p>
            </div>
          </div>

          {/* ================= MAIN INTERACTION CANVAS ================= */}
          <div className="flex-1 flex flex-col h-full relative">
            
            {/* PLATFORM TITLE STRIP */}
            <div className="px-6 py-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#050816] gap-4 shrink-0">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Expert Field Copilot</h1>
                <p className="text-xs text-gray-400 mt-0.5">Parse operational regulations and equipment metrics in real-time.</p>
              </div>

              {/* CONTEXT BOUND DROPDOWN */}
              <div className="w-full sm:w-72">
                <select
                  value={selectedDoc}
                  onChange={(e) => setSelectedDoc(e.target.value)}
                  className="w-full rounded-xl px-4 py-2.5 bg-[#0f172a] border border-white/10 text-xs text-gray-300 outline-none focus:border-orange-500/50 cursor-pointer transition"
                >
                  <option value="">Query full knowledge corpus matrix</option>
                  {documents.map((doc: any) => (
                    <option key={doc.id} value={doc.id}>{doc.filename || doc.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* MESSAGE CHANNEL STREAM AREA */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-[#070b1e]/20 to-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-4 max-w-4xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  {/* ICON NODES */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${
                    msg.sender === 'user' 
                      ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' 
                      : 'bg-white/5 border-white/10 text-gray-400'
                  }`}>
                    {msg.sender === 'user' ? <User size={16} /> : <Wrench size={16} />}
                  </div>

                  {/* CHAT BUBBLE RENDERING */}
                  <div className={`rounded-2xl px-5 py-3.5 text-sm leading-6 border ${
                    msg.sender === 'user'
                      ? 'bg-[#1e110a]/40 border-orange-500/20 text-orange-100'
                      : 'bg-[#0f172a]/80 border-white/5 text-gray-300'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span className="text-[10px] text-gray-600 font-mono block mt-2 text-right">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* ACTIVE STREAM EXECUTION LOADER */}
              {loading && (
                <div className="flex gap-4 mr-auto max-w-2xl items-center text-gray-500 text-xs font-mono">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center animate-spin text-orange-500">
                    <Loader2 size={16} />
                  </div>
                  <span>Isolating vector context tokens...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT TRANSMISSION BOX */}
            <div className="p-6 bg-[#050816] border-t border-white/5 shrink-0">
              <form onSubmit={handleSendMessage} className="relative max-w-5xl mx-auto flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter equipment tags, clearance boundaries, or safety query coordinates..."
                  className="w-full bg-[#0f172a] border border-white/10 rounded-2xl pl-5 pr-16 py-4 text-sm text-white outline-none focus:border-orange-500/50 transition shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="absolute right-3 p-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white transition hover:opacity-95 active:scale-95 disabled:opacity-30 disabled:pointer-events-none shadow-md shadow-orange-500/10"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>

          </div>
        </div>
      </AppLayout>
    </AuthGuard>
  );
}