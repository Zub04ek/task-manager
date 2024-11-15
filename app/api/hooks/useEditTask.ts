'use client';

import axios from 'axios';
import { z } from 'zod';

import { formSchema } from '@/components/TaskForm';
import { useToast } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ValuesType = z.infer<typeof formSchema>;

interface TaskMutationProps extends ValuesType {
  id: string;
}

const updateTask = async (task: TaskMutationProps) => {
  try {
    const res = await axios.put(`/api/tasks/${task.id}`, task);
    return res.data;
  } catch (error) {
    console.log('error updating :>> ', error);
    throw error;
  }
};

export const useEditTask = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: updateTask,
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
    },
    onSuccess: (data, variables) => {
      // queryClient.setQueryData(['tasks', { id: variables.id }], data);
      toast({ description: 'Task is updated successfully!' });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
};
