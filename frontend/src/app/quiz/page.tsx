'use client';

import { useEffect, useState } from 'react';
import AuthGuard from '@/components/AuthGuard';
import AppLayout from '@/components/AppLayout';

import {
  ShieldCheck,
  FileText,
  CheckCircle2,
  XCircle,
  Trophy,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

type Question = {
  question: string;
  options: string[];
  correctAnswer?: string;
  correct_answer?: string;
  answer?: string | number;
  correctIndex?: number;
  correct_index?: number;
  index?: number;
  correct?: number;
  explanation?: string;
};

export default function QuizPage() {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(3);
  const [documents, setDocuments] = useState<any[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<number | string | null>(null);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  // LOAD LOADED REFERENCE STANDARDS
  useEffect(() => {
    const fetchDocs = async () => {
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
        console.error('Failed to index system documents:', err);
      }
    };
    fetchDocs();
  }, []);

  // AUTOMATED COMPLIANCE GENERATOR STREAM
  const loadQuiz = async () => {
    if (!topic.trim()) {
      alert('Please specify an operational evaluation topic or asset tag.');
      return;
    }

    const token = localStorage.getItem('token');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          topic,
          num_questions: count,
          document_id: selectedDoc,
        }),
      });

      const data = await res.json();
      
      // Dynamic fallback mapping hooks arrays directly if wrapped inside response dictionary keys
      const extractedQuestions = data.questions || data.quiz || data.data || (Array.isArray(data) ? data : []);

      if (!extractedQuestions || extractedQuestions.length === 0) {
        alert('Failed to generate automated audit profile checkpoint vectors.');
        setLoading(false);
        return;
      }

      setQuestions(extractedQuestions);
      setCurrent(0);
      setScore(0);
      setSelected(null);
      setFinished(false);
      setUserAnswers([]);
    } catch (err) {
      console.error(err);
      alert('Operational checklist compiler exception encountered.');
    }
    setLoading(false);
  };

  // MULTI-KEY BULLETPROOF CORE EVALUATOR
  const isOptionCorrect = (qItem: Question, optIdx: number, optText: string) => {
    if (!qItem) return false;
    
    // Check text literal value matches
    const textTarget = qItem.correctAnswer || qItem.correct_answer || (typeof qItem.answer === 'string' ? qItem.answer : null);
    if (textTarget && optText === textTarget) return true;

    // Check 0-based numerical indexing positional matches
    const indexTarget = qItem.correctIndex !== undefined ? qItem.correctIndex : 
                        qItem.correct_index !== undefined ? qItem.correct_index : 
                        qItem.index !== undefined ? qItem.index : 
                        (typeof qItem.answer === 'number' ? qItem.answer : qItem.correct);
                        
    if (indexTarget !== undefined && optIdx === indexTarget) return true;

    return false;
  };

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);

    const currentQ = questions[current];
    const newAnswers = [...userAnswers];
    newAnswers[current] = currentQ.options[index];
    setUserAnswers(newAnswers);

    if (isOptionCorrect(currentQ, index, currentQ.options[index])) {
      setScore((prev) => prev + 1);
    }
  };

  const submitQuiz = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:8000/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          topic,
          questions,
          user_answers: userAnswers,
        }),
      });
    } catch (err) {
      console.error('Audit sync submission error:', err);
    }
  };

  const nextQuestion = async () => {
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      await submitQuiz();
      setFinished(true);
    }
  };

  const progress = questions.length > 0 ? ((current + 1) / questions.length) * 100 : 0;

  // ================= SCENARIO A: CONTROL CONFIGURATION PANEL =================
  if (questions.length === 0) {
    return (
      <AuthGuard>
        <AppLayout currentPath="/quiz">
          <div className="min-h-screen px-6 py-10" style={{ background: 'radial-gradient(circle at top,#0c1126,#050816 70%)' }}>
            <div className="max-w-3xl mx-auto">
              
              {/* BRAND RECLASS HEADER */}
              <div className="text-center mb-10">
                <div className="w-20 h-20 rounded-3xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/5">
                  <ShieldCheck size={40} className="text-orange-500" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                  Compliance Audit & Safety Validator
                </h1>
                <p className="text-base text-gray-400 max-w-2xl mx-auto leading-7">
                  Isolate critical regulatory thresholds and equipment parameters to clear technical field teams for high-risk operations.
                </p>
              </div>

              {/* CONTROLS HOUSING CARD */}
              <div 
                className="rounded-3xl p-8 border backdrop-blur-md"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
              >
                {/* TOPIC SELECTION TARGET */}
                <div className="mb-6">
                  <label className="text-xs uppercase font-semibold tracking-wider text-gray-400 block mb-3">
                    Evaluation Baseline Parameter / System Node
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. EQ-PUMP-101 Casing Torque, SOP-OPS-24 LOTO Rules"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full rounded-xl px-5 py-4 bg-[#0f172a] border border-white/10 text-white outline-none text-sm focus:border-orange-500/50 transition"
                  />
                </div>

                {/* DOCUMENT FILTER SELECTOR */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="md:col-span-2">
                    <label className="text-xs uppercase font-semibold tracking-wider text-gray-400 block mb-3">
                      Reference Core Document File
                    </label>
                    <select
                      value={selectedDoc ?? ''}
                      onChange={(e) => setSelectedDoc(e.target.value ? e.target.value : null)}
                      className="w-full rounded-xl px-5 py-4 bg-[#0f172a] border border-white/10 text-white outline-none text-sm cursor-pointer focus:border-orange-500/50 transition"
                    >
                      <option value="">Query full system knowledge corpus</option>
                      {documents.map((doc: any) => (
                        <option key={doc.id} value={doc.id}>{doc.filename || doc.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* CHECKPOINT VOLUMETRIC COUNT */}
                  <div>
                    <label className="text-xs uppercase font-semibold tracking-wider text-gray-400 block mb-3">
                      Question Count
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={count}
                      onChange={(e) => setCount(Number(e.target.value))}
                      className="w-full rounded-xl px-5 py-4 bg-[#0f172a] border border-white/10 text-white outline-none text-sm focus:border-orange-500/50 transition"
                    />
                  </div>
                </div>

                {/* EMISSION RUN TRIGGER COMPONENT */}
                <button
                  onClick={loadQuiz}
                  disabled={loading}
                  className="w-full py-4.5 rounded-xl font-semibold text-white transition hover:opacity-95 active:scale-[0.99] disabled:opacity-50 text-base"
                  style={{ background: 'linear-gradient(135deg,#ea580c,#b45309)' }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 size={18} className="animate-spin" />
                      Parsing Regulatory Specifications...
                    </div>
                  ) : (
                    'Execute Pre-Work Safety Evaluation'
                  )}
                </button>
              </div>

            </div>
          </div>
        </AppLayout>
      </AuthGuard>
    );
  }

  // ================= SCENARIO B: COMPLETED CLEARANCE GATE =================
  if (finished) {
    const validationPassed = score === questions.length;
    return (
      <AuthGuard>
        <AppLayout currentPath="/quiz">
          <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'radial-gradient(circle at top,#0c1126,#050816 70%)' }}>
            <div 
              className="max-w-xl w-full rounded-3xl p-10 text-center border"
              style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                validationPassed ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
              }`}>
                {validationPassed ? <ShieldCheck size={50} /> : <AlertTriangle size={50} />}
              </div>

              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                {validationPassed ? 'Clearance Status: PASSED' : 'Evaluation Completed'}
              </h1>
              <p className="text-sm text-gray-400 mb-6">
                {validationPassed ? 'Operator clearance metrics updated within passport memory.' : 'Review field parameters below before deployment.'}
              </p>

              <p className="text-5xl font-mono font-bold text-orange-500 mb-8">
                {score} <span className="text-2xl text-gray-600">/ {questions.length}</span>
              </p>

              <button
                onClick={() => setQuestions([])}
                className="w-full py-4 rounded-xl font-semibold text-white transition hover:opacity-95 active:scale-[0.99]"
                style={{ background: 'linear-gradient(135deg,#ea580c,#b45309)' }}
              >
                Compile Alternative Verification Check
              </button>
            </div>
          </div>
        </AppLayout>
      </AuthGuard>
    );
  }

  // ================= SCENARIO C: RUNTIME AUDIT STREAM =================
  const q = questions[current];

  return (
    <AuthGuard>
      <AppLayout currentPath="/quiz">
        <div className="min-h-screen px-6 py-10" style={{ background: 'radial-gradient(circle at top,#0c1126,#050816 70%)' }}>
          <div className="max-w-4xl mx-auto">

            {/* TIMELINE PROGRESS INDICATION GRID */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-orange-500 font-semibold">Active Gate Check</span>
                  <h4 className="text-base font-bold text-white mt-0.5">Verification Node {current + 1} of {questions.length}</h4>
                </div>
                <span className="text-sm font-mono text-gray-400">{Math.round(progress)}% Evaluated</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#ea580c,#b45309)' }}
                />
              </div>
            </div>

            {/* INTERACTIVE SPECIFICATION NODE */}
            <div 
              className="rounded-3xl p-8 border"
              style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <div className="flex gap-4 mb-8 items-start">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
                  <FileText size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white leading-relaxed tracking-tight">
                  {q.question}
                </h2>
              </div>

              {/* MUTABLE GRID CHECK CHANNELS */}
              <div className="space-y-3.5">
                {q.options.map((opt, i) => {
                  let classes = 'bg-[#0f172a]/40 border-white/5 hover:bg-white/5 hover:border-white/10 text-gray-300';

                  if (selected !== null) {
                    const optionCorrect = isOptionCorrect(q, i, opt);
                    const optionSelected = i === selected;

                    if (optionCorrect) {
                      classes = 'bg-green-500/10 border-green-500 text-green-400 font-medium';
                    } else if (optionSelected) {
                      classes = 'bg-red-500/10 border-red-500 text-red-400 font-medium';
                    } else {
                      classes = 'bg-transparent border-white/5 text-gray-600 opacity-40';
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={selected !== null}
                      onClick={() => handleAnswer(i)}
                      className={`w-full text-left rounded-xl border p-4.5 transition duration-200 flex items-center justify-between text-sm ${classes}`}
                    >
                      <span>{opt}</span>
                      {selected !== null && (
                        <>
                          {isOptionCorrect(q, i, opt) ? (
                            <CheckCircle2 size={18} className="text-green-400 shrink-0" />
                          ) : i === selected ? (
                            <XCircle size={18} className="text-red-400 shrink-0" />
                          ) : null}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* LOGICAL DISCIPLINE EXPLANTATION CANVAS PANEL */}
              {selected !== null && q.explanation && (
                <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-400 leading-6">
                  <span className="font-semibold text-gray-200 block mb-1">📋 Protocol Documentation Baseline:</span>
                  {q.explanation}
                </div>
              )}

              {/* CONTINUATION PIPELINE TRIGGER CHANNEL */}
              <button
                onClick={nextQuestion}
                disabled={selected === null}
                className="w-full py-4 rounded-xl font-semibold text-white transition mt-8 disabled:opacity-30 disabled:pointer-events-none text-sm tracking-wide uppercase"
                style={{ background: 'linear-gradient(135deg,#ea580c,#b45309)' }}
              >
                {current + 1 === questions.length ? 'Finalise Compliance Evaluation' : 'Advance to Next Node'}
              </button>
            </div>

          </div>
        </div>
      </AppLayout>
    </AuthGuard>
  );
}