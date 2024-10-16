import { ReactNode } from 'react';

import { Button } from '../ui/button';

interface GoogleSignInButtonProps {
  children: ReactNode;
}

export function GoogleSignInButton({ children }: GoogleSignInButtonProps) {
  const loginWithGoogle = () =>
    console.log('loginWithGoogle :>> ', loginWithGoogle);

  return (
    <Button variant="outline" onClick={loginWithGoogle} className="w-full">
      {children}
    </Button>
  );
}
