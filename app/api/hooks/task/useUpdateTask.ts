'use client';

import axios from 'axios';

import { UniqueIdentifier } from '@dnd-kit/core';
import { MutationOptions, useMutation } from '@tanstack/react-query';

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

export const useUpdateTask = (
  options?: MutationOptions<unknown, Error, TaskMutationProps>
) => {
  return useMutation({
    mutationKey: ['updateTask'],
    mutationFn: (params: TaskMutationProps) => updateTask(params),
    ...options,
  });
};
