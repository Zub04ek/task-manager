'use server';

import { revalidatePath } from 'next/cache';

import { signIn } from '@/auth';

export const loginWithProvider = async (provider: string) => {
  await signIn(provider, { redirectTo: '/' });
  revalidatePath('/');
};
