'use client';

import axios from 'axios';

import { MutationOptions, useMutation } from '@tanstack/react-query';

const deleteTask = async (taskId: string) => {
  try {
    const res = await axios.delete(`/api/tasks/${taskId}`);
    return res.data;
  } catch (error) {
    console.log('error deleting :>> ', error);
    throw error;
  }
};

export const useDeleteTask = (
  options?: MutationOptions<unknown, Error, string>
) => {
  return useMutation({
    mutationKey: ['deleteTask'],
    mutationFn: (params: string) => deleteTask(params),
    ...options,
  });
};
