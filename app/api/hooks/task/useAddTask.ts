'use client';

import axios from 'axios';
import { z } from 'zod';

import { formSchema } from '@/components/TaskForm';
import { MutationOptions, useMutation } from '@tanstack/react-query';

const createTask = async (values: z.infer<typeof formSchema>) => {
  try {
    const res = await axios.post('/api/tasks/create', values);
    return res.data;
  } catch (error) {
    console.log('error creating :>> ', error);
    throw error;
  }
};

export const useAddTask = (
  options?: MutationOptions<unknown, Error, z.infer<typeof formSchema>>
) => {
  return useMutation({
    mutationKey: ['createTask'],
    mutationFn: (params: z.infer<typeof formSchema>) => createTask(params),
    ...options,
  });
};
