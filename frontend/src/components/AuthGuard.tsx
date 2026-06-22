'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { isAuthenticated } from '@/lib/auth';

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const authenticated =
      isAuthenticated();

    if (!authenticated) {

      router.push('/login');

    } else {

      setLoading(false);
    }

  }, []);

  if (loading) {

    return (
      <div className="min-h-screen bg-black flex items-center justify-center">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />

          <h1 className="text-white text-2xl font-semibold">
            Loading SecondBrain...
          </h1>

        </div>
      </div>
    );
  }

  return <>{children}</>;
}