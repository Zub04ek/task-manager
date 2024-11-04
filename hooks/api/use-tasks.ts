'use client';

import axios from 'axios';

import { Task } from '@prisma/client';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

export const useTasks = (
  options?: Omit<UseQueryOptions<Task[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await axios.get('/api/tasks');
      return res.data;
    },
    ...options,
  });
};
