import React from 'react';
import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/AppSidebar';
import { Header } from '@/components/Header';
import { SidebarProvider, Toaster } from '@/components/ui';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
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
  );
}
