'use client';

import axios from 'axios';
import { z } from 'zod';

import { formSchema } from '@/components/TaskForm';
import { MutationOptions, useMutation } from '@tanstack/react-query';

type ValuesType = z.infer<typeof formSchema>;

interface TaskMutationProps extends ValuesType {
  id: string;
}

const editTask = async (task: TaskMutationProps) => {
  try {
    const res = await axios.put(`/api/tasks/${task.id}`, task);
    return res.data;
  } catch (error) {
    console.log('error editing :>> ', error);
    throw error;
  }
};

export const useEditTask = (
  options?: MutationOptions<unknown, Error, TaskMutationProps>
) => {
  return useMutation({
    mutationKey: ['editTask'],
    mutationFn: (params: TaskMutationProps) => editTask(params),
    ...options,
  });
};
