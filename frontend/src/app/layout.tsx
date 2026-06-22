import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from 'sonner';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'SecondBrain — AI Knowledge System',
  description:
    'Upload documents, generate quizzes, track weak topics, and learn with AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}