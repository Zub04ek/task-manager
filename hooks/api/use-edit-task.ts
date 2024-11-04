'use client';

import axios from 'axios';
import { z } from 'zod';

import { formSchema } from '@/components/task-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '../use-toast';

export const useEditTask = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  type ValuesType = z.infer<typeof formSchema>;

  interface TaskMutationProps extends ValuesType {
    id: string;
  }

  return useMutation({
    mutationFn: async (task: TaskMutationProps) => {
      const res = await axios.put('/api/tasks', task);
      return res.data;
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['tasks', { id: variables.id }], data);
      toast({ description: 'Task is updated successfully!' });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
};
