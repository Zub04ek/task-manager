'use client';
import { ReactNode } from 'react';

import { loginWithProvider } from '@/actions/login-with-provider';
import { Button, ButtonProps } from '@/components/ui';
import { cn } from '@/lib/utils';

interface AuthProviderButtonProps extends ButtonProps {
  provider: string;
  icon: ReactNode;
  children: ReactNode;
}

export const AuthProviderButton = ({
  provider,
  icon,
  children,
  className,
}: AuthProviderButtonProps) => {
  return (
    <Button
      onClick={() => loginWithProvider(provider)}
      className={cn(className, 'h-12 w-full gap-4 bg-foreground p-4')}
    >
      {icon}
      {children}
    </Button>
  );
};
