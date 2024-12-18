// 'use client';
// import React from 'react';
// import { getServerSession } from 'next-auth';

// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { useSession } from 'next-auth/react';

import { SignInForm } from '@/components/forms';

export default function SignIn() {
  // const session = await getServerSession(authOptions);
  // const { data } = useSession();
  // return <main>{JSON.stringify(data)}</main>;
  return <SignInForm />;
}
