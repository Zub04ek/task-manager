import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';

import './globals.css';

const inter = Inter({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Task Manager App',
  description: 'Your time management assistant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(`${inter.className} antialiased`)}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
