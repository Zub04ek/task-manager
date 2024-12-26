import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { SignInForm } from '@/components/auth/forms';

export default async function SignIn() {
  const session = await auth();
  if (session?.user) {
    redirect('/');
  }
  return <SignInForm />;
}
