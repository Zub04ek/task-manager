import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui';
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
    <html lang="en" suppressHydrationWarning>
      <body className={cn(`${inter.className} antialiased`)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid min-h-screen grid-rows-[max-content_1fr]">
            <Header />
            <ResizablePanelGroup direction="horizontal" className="w-full">
              <ResizablePanel defaultSize={25} className="max-md:hidden">
                <div className="flex h-full px-6 py-10">
                  <Sidebar />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle className="max-md:hidden" />
              <ResizablePanel defaultSize={75}>
                <main className="max-h-[calc(100vh-64px)] overflow-y-auto px-8 py-10 lg:max-h-full">
                  {children}
                </main>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
