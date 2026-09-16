import React from 'react';

import { Toaster } from '@/components/ui';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex min-h-screen items-center justify-center p-8 pb-20 sm:p-16">
        {children}
      </main>
      <Toaster />
    </>
  );
}
