'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, Cpu, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleResetPassword() {
    if (!password.trim()) {
      toast.error('Please enter a valid credential override passphrase.');
      return;
    }

    const email = localStorage.getItem('reset_email');

    if (!email) {
      toast.error('Passphrase reset verification session expired or invalid.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok || data.message) {
        toast.success('Credential signature updated successfully across plant indexes.');
        localStorage.removeItem('reset_email'); // Safely clear out verification footprint
        router.push('/login');
      } else {
        toast.error(data.error || 'Failed to update system access credentials.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network sync exception encountered during signature overwrite.');
    } finally {
      setLoading(false);
    }
  }

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
        {/* BRAND ICON GRAPHIC ACCENT */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/10 mb-5">
            <Cpu size={28} className="text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white tracking-tight">
            Recalibrate Credentials
          </h1>

          <p className="text-xs text-gray-400 mt-2 text-center max-w-xs leading-5">
            Emergency signature override. Set a new high-security credential token to restore access authorization bounds.
          </p>
        </div>

        {/* INPUT PASSWAY HOUSING */}
        <div className="space-y-4">
          <div>
            <label className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 block mb-2">
              New Access Passphrase
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

          {/* ACTION BUTTON PIPELINE */}
          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="w-full mt-4 py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] disabled:opacity-40 select-none transition"
            style={{
              background: 'linear-gradient(135deg, #ea580c, #b45309)',
            }}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Overwriting Signatures...
              </>
            ) : (
              <>
                <span>Update Access Signature</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}