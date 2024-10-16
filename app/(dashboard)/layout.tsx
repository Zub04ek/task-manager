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
              <ResizablePanel defaultSize={25}>
                <Sidebar />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={75}>
                <div className="flex h-full items-center justify-center p-6">
                  {children}
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
