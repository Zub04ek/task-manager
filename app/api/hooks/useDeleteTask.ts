'use client';

import axios from 'axios';

import { useToast } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (taskId: string) => {
      const res = await axios.delete(`/api/tasks/${taskId}`);
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
      toast({ description: 'Task deleted successfully!' });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });
};
