'use client';

import axios from 'axios';
import { z } from 'zod';

import { formSchema } from '@/components/TaskForm';
import { useToast } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const createTask = async (values: z.infer<typeof formSchema>) => {
  try {
    const res = await axios.post('/api/tasks/create', values);
    return res.data;
  } catch (error) {
    console.log('error creating :>> ', error);
    throw error;
  }
};

export const useAddTask = () =>
  //   options?: Omit<
  //     UseMutationOptions<Task>,
  //     'mutationFn' | 'onError' | 'onSuccess' | 'onSettled'
  //   >
  {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
      mutationFn: createTask,
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
