'use client';

import React, { useState, useEffect } from 'react';
import { User, Wrench, Building2, ShieldCheck, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function TechnicianPassportPage() {
  const [profile, setProfile] = useState({
    name: '',
    role: '',
    plant: '',
    clearances: '',
    summary: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    // Fetch profile on mount
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Fallback checks handle empty databases gracefully
        setProfile({
          name: data.name || data.username || 'Operator Name',
          role: data.role || data.profession || 'Field Technician',
          plant: data.plant || data.college || 'Plant Unit 3 - Sector B',
          clearances: data.clearances || data.interests || 'LOTO Certified, EQ-PUMP-101 Clearances',
          summary: data.summary || data.bio || 'Stationed at central core processing operations.',
        });
        setFetching(false);
      })
      .catch((err) => {
        console.error('Error fetching profile logs:', err);
        setFetching(false);
      });
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8000/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profile.name,
          profession: profile.role, // Matches alternative backend keys safely
          college: profile.plant,
          interests: profile.clearances,
          bio: profile.summary,
        }),
      });

      if (res.ok) {
        toast.success('Technician field credentials sync successful');
      } else {
        toast.error('Failed to sync data credentials');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network sync exception encountered');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#050816]">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#050816] min-h-screen p-8">
      {/* HEADER SECTION */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Technician Passport
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Manage active operator clearances and localized plant system access metrics.
        </p>
      </div>

      {/* CREDENTIALS FORM CONTAINER */}
      <div 
        className="max-w-4xl rounded-3xl p-8 border"
        style={{
          background: 'rgba(255,255,255,0.02)',
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-orange-500/10">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Field Operations Identity</h2>
            <p className="text-xs text-gray-500 mt-0.5 tracking-wider uppercase font-mono">
              Verified security credential node
            </p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FULL NAME */}
            <div>
              <label className="text-xs uppercase font-semibold tracking-wider text-gray-400 block mb-2">
                Operator Full Name
              </label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-4 text-orange-500" />
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-12 py-3.5 text-white text-sm outline-none focus:border-orange-500/50 transition"
                  placeholder="Enter standard name..."
                />
              </div>
            </div>

            {/* FIELD DISCIPLINE */}
            <div>
              <label className="text-xs uppercase font-semibold tracking-wider text-gray-400 block mb-2">
                Operational Discipline / Field Role
              </label>
              <div className="relative">
                <Wrench size={18} className="absolute left-4 top-4 text-orange-500" />
                <input
                  type="text"
                  value={profile.role}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-12 py-3.5 text-white text-sm outline-none focus:border-orange-500/50 transition"
                  placeholder="e.g. Reliability Engineer, Field Operator"
                />
              </div>
            </div>

            {/* ASSIGNED PLANT / FACILITY LOCATION */}
            <div>
              <label className="text-xs uppercase font-semibold tracking-wider text-gray-400 block mb-2">
                Assigned Plant Facility / Unit Location
              </label>
              <div className="relative">
                <Building2 size={18} className="absolute left-4 top-4 text-orange-500" />
                <input
                  type="text"
                  value={profile.plant}
                  onChange={(e) => setProfile({ ...profile, plant: e.target.value })}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-12 py-3.5 text-white text-sm outline-none focus:border-orange-500/50 transition"
                  placeholder="e.g. Unit 3 Hydrocarbon Processing"
                />
              </div>
            </div>

            {/* ACTIVE EQUIPMENT CLEARANCES */}
            <div>
              <label className="text-xs uppercase font-semibold tracking-wider text-gray-400 block mb-2">
                Equipment Certifications / LOTO Clearances
              </label>
              <div className="relative">
                <ShieldCheck size={18} className="absolute left-4 top-4 text-orange-500" />
                <input
                  type="text"
                  value={profile.clearances}
                  onChange={(e) => setProfile({ ...profile, clearances: e.target.value })}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-12 py-3.5 text-white text-sm outline-none focus:border-orange-500/50 transition"
                  placeholder="e.g. EQ-PUMP-101, High Voltage Isolation"
                />
              </div>
            </div>
          </div>

          {/* TECHNICAL PROFILE SUMMARY */}
          <div>
            <label className="text-xs uppercase font-semibold tracking-wider text-gray-400 block mb-2">
              Operational Focus Summary
            </label>
            <div className="relative">
              <FileText size={18} className="absolute left-4 top-4 text-orange-500" />
              <textarea
                rows={4}
                value={profile.summary}
                onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                className="w-full bg-[#0f172a] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm outline-none focus:border-orange-500/50 transition resize-none leading-6"
                placeholder="Detail core facility assignments, routine maintenance paths, or critical safety areas..."
              />
            </div>
          </div>

          {/* ACTION SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-3 text-sm font-semibold text-white hover:opacity-95 transition active:scale-[0.99] disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Syncing Credentials...
              </>
            ) : (
              'Update Field Credentials'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}