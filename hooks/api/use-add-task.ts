'use client';

import axios from 'axios';
import { z } from 'zod';

import { formSchema } from '@/components/task-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '../use-toast';

export const useAddTask = () =>
  //   options?: Omit<
  //     UseMutationOptions<Task>,
  //     'mutationFn' | 'onError' | 'onSuccess' | 'onSettled'
  //   >
  {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: async (values: z.infer<typeof formSchema>) => {
        const res = await axios.post('/api/tasks', values);
        return res.data;
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.message,
        });
      },
      onSuccess: () => {
        toast({ description: 'Task is created successfully!' });
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
      //   ...options,
    });
  };
