'use client';

import axios from 'axios';

import { Task } from '@/types';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

const getTasks = async () => {
  try {
    const res = await axios.get('/api/tasks');
    return res.data;
  } catch (error) {
    console.log('error getting :>> ', error);
    throw error;
    // if (axios.isAxiosError(error)) {
    //   throw error;
    //   // toast({
    //   //   variant: 'destructive',
    //   //   title: 'Uh oh! Something went wrong.',
    //   //   description: error.message,
    //   // });
    // } else if (error instanceof Error) {
    //   throw new Error(error.message);
    //   // toast({
    //   //   variant: 'destructive',
    //   //   title: 'Uh oh! Something went wrong.',
    //   //   description: error.message,
    //   // });
    // }
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
