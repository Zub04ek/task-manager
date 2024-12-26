'use client';

import { AuthError } from 'next-auth';
import axios from 'axios';
import { z } from 'zod';

import { loginFormSchema } from '@/utils';
import { MutationOptions, useMutation } from '@tanstack/react-query';

const loginUser = async (values: z.infer<typeof loginFormSchema>) => {
  try {
    const res = await axios.post('/api/auth/login', values);
    return res.data;
  } catch (error) {
    console.log('error creating :>> ', error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid email or password' };
        default:
          return { error: 'Please confirm your email' };
      }
    }
    throw error;
  }
};

export const useLoginUser = (
  options?: MutationOptions<unknown, Error, z.infer<typeof loginFormSchema>>
) => {
  return useMutation({
    mutationKey: ['loginUser'],
    mutationFn: (params: z.infer<typeof loginFormSchema>) => loginUser(params),
    ...options,
  });
};
