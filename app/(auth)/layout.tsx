import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';
import { AuthProvider, TanstackProvider } from '@/utils';
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

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(`${inter.className} antialiased`)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TanstackProvider>
            <AuthProvider>
              <main className="grid min-h-screen grid-rows-[1fr] items-center gap-16 p-8 pb-20 sm:p-16">
                <div className="w-full justify-self-center rounded-xl bg-primary-foreground p-10 sm:w-2/3 lg:w-1/3 xl:w-1/4">
                  {children}
                </div>
              </main>
            </AuthProvider>
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
