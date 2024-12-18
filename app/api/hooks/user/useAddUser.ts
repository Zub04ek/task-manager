'use client';

import axios from 'axios';
import { z } from 'zod';

import { formSchema } from '@/components/forms/SignUpForm';
import { MutationOptions, useMutation } from '@tanstack/react-query';

const createUser = async (values: z.infer<typeof formSchema>) => {
  try {
    const res = await axios.post('/api/auth/register', values);
    return res.data;
  } catch (error) {
    console.log('error creating :>> ', error);
    throw error;
  }
};

export const useAddUser = (
  options?: MutationOptions<unknown, Error, z.infer<typeof formSchema>>
) => {
  return useMutation({
    mutationKey: ['createUser'],
    mutationFn: (params: z.infer<typeof formSchema>) => createUser(params),
    ...options,
  });
};
