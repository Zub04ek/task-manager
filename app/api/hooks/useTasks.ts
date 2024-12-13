'use client';

import axios from 'axios';

import { Task } from '@/types';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

const getTasks = async () => {
  try {
    const res = await axios.get(
      '/api/tasks'
      //   {
      //   headers: {
      //     'Cache-Control': 'no-cache',
      //   },
      // }
    );
    return res.data;
  } catch (error) {
    console.log('error getting :>> ', error);
    throw error;
  }
};

export const useTasks = (
  options?: Omit<UseQueryOptions<Task[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getTasks,
    ...options,
  });
};
