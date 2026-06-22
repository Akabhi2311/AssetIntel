import React from 'react';
import Sidebar from './Sidebar';
import { Toaster } from 'sonner';

interface AppLayoutProps {
  children: React.ReactNode;
  currentPath: string;
}

export default function AppLayout({ children, currentPath }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'hsl(var(--background))' }}>
      <Sidebar currentPath={currentPath} />
      <main className="flex-1 overflow-auto min-w-0">
        {children}
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'hsl(var(--surface-elevated))',
            border: '1px solid hsl(var(--border))',
            color: 'hsl(var(--text-primary))',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
          },
        }}
      />
    </div>
  );
}