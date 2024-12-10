'use client';

import axios from 'axios';

import { useToast } from '@/hooks';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useMutation } from '@tanstack/react-query';

interface TaskMutationProps {
  id: string;
  sequence: number;
  status?: string | UniqueIdentifier;
}

const updateTask = async (task: TaskMutationProps) => {
  try {
    const res = await axios.put(`/api/tasks/update/${task.id}`, task);
    return res.data;
  } catch (error) {
    console.log('error updating :>> ', error);
    throw error;
  }
};

export const useUpdateTask = () => {
  // const queryClient = useQueryClient();
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
  });
};
