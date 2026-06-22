'use client';

import { logout } from '@/lib/auth';

import {
  LogOut,
  User,
} from 'lucide-react';

export default function UserProfile() {

  const user =
    JSON.parse(
      localStorage.getItem('user') || '{}'
    );

  return (
    <div className="flex items-center gap-4">

      <div className="w-11 h-11 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold">

        {user?.name?.[0] || 'U'}

      </div>

      <div>

        <p className="text-white text-sm font-medium">
          {user?.name || 'User'}
        </p>

        <p className="text-gray-400 text-xs">
          {user?.email}
        </p>

      </div>

      <button
        onClick={logout}
        className="p-2 rounded-xl hover:bg-white/10 transition"
      >
        <LogOut
          size={18}
          className="text-red-400"
        />
      </button>

    </div>
  );
}