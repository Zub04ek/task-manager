import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { SignUpForm } from '@/components/auth/forms';

export default async function SignUp() {
  const session = await auth();
  if (session?.user) {
    redirect('/');
  }
  return <SignUpForm />;
}
