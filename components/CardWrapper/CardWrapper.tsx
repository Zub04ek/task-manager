'use client';

import { ReactNode } from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui';

interface CardWrapperProps {
  children: ReactNode;
  headerLabel: string;
  title: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  title,
}: CardWrapperProps) => {
  return (
    <Card className="shadow-md md:w-1/2 xl:w-1/4">
      <CardHeader>
        <div className="flex w-full flex-col items-center justify-center gap-y-3">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">{headerLabel}</p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
