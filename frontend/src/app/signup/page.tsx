'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Cpu, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error('Please fill out all technical profile metrics.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.detail || 'Technician node initialization rejected.');
        return;
      }

      toast.success('Profile registered. Synchronizing clearance credentials.');
      
      // Store state session key if multi-step password workflows are invoked
      localStorage.setItem('signup_email', email);
      router.push('/login');
    } catch (err) {
      console.error(err);
      toast.error('Network error during node identity propagation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-6 bg-[#050816]"
      style={{
        background: 'radial-gradient(circle at top, #0c1126, #050816 70%)',
      }}
    >
      <div 
        className="w-full max-w-md rounded-3xl p-10 border backdrop-blur-md shadow-2xl"
        style={{
          background: 'rgba(255,255,255,0.01)',
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      >
        {/* BRAND IDENTITY HEADER SECTION */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/10 mb-5">
            <Cpu size={28} className="text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white tracking-tight">
            Register Node
          </h1>

          <p className="text-xs text-gray-400 mt-2 text-center max-w-xs leading-5">
            Create an authoritative field profile to authenticate your technician clearance passport across plant networks.
          </p>
        </div>

        {/* INPUT FORM MATRIX */}
        <form onSubmit={handleSignup} className="space-y-4">
          {/* FULL NAME */}
          <div>
            <label className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 block mb-2">
              Operator Full Name
            </label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-4 text-orange-500" />
              <input
                type="text"
                placeholder="e.g. Sanskar5544"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#0f172a] border border-white/10 text-white text-sm outline-none focus:border-orange-500/50 transition font-mono"
              />
            </div>
          </div>

          {/* EMAIL ADDRESS */}
          <div>
            <label className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 block mb-2">
              Corporate Network Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-4 text-orange-500" />
              <input
                type="email"
                placeholder="operator@facility.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#0f172a] border border-white/10 text-white text-sm outline-none focus:border-orange-500/50 transition font-mono"
              />
            </div>
          </div>

          {/* SECURITY PASSPHRASE */}
          <div>
            <label className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 block mb-2">
              Access Passphrase
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-4 text-orange-500" />
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#0f172a] border border-white/10 text-white text-sm outline-none focus:border-orange-500/50 transition font-mono"
              />
            </div>
          </div>

          {/* REGISTER ACTION TRIGGERS */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] disabled:opacity-40 select-none transition shadow-lg shadow-orange-600/10"
            style={{
              background: 'linear-gradient(135deg, #ea580c, #b45309)',
            }}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Initializing Authorization...
              </>
            ) : (
              <>
                <span>Provision System Signature</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>

          {/* BACKLINK TO AUTH CHECKPOINT */}
          <p className="text-xs text-center text-gray-400 mt-4 pt-2 border-t border-white/5">
            Already have verified profile metrics?{' '}
            <span
              className="text-orange-400 hover:text-orange-300 font-medium cursor-pointer transition ml-1"
              onClick={() => router.push('/login')}
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}