import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';
import { cn } from '@/lib/utils';
import { TanstackProvider } from '@/utils';
import { ThemeProvider } from '@/utils/theme-provider';

import './globals.css';

const inter = Inter({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Task Manager App',
  description: 'Your time management assistant',
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(`${inter.className} antialiased`)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TanstackProvider>
              <main className="flex min-h-screen items-center justify-center p-8 pb-20 sm:p-16">
                {children}
              </main>
            </TanstackProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
