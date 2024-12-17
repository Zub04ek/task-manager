import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/AppSidebar';
import { Header } from '@/components/Header';
import { SidebarProvider, Toaster } from '@/components/ui';
import { cn } from '@/lib/utils';
import { AuthProvider, TanstackProvider, ThemeProvider } from '@/utils';

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
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

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
              <SidebarProvider defaultOpen={defaultOpen}>
                <AppSidebar />
                <div className="grid min-h-screen flex-1 grid-rows-[max-content_1fr]">
                  <Header />
                  <main className="max-h-[calc(100vh-64px)] overflow-y-auto px-8 py-10 lg:h-full">
                    {children}
                  </main>
                </div>
                <Toaster />
              </SidebarProvider>
            </AuthProvider>
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
