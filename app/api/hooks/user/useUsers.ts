'use client';

import axios from 'axios';

import { User } from '@/types';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

const getUsers = async () => {
  try {
    const res = await axios.get('/api/users');
    return res.data;
  } catch (error) {
    console.log('error getting :>> ', error);
    throw error;
  }
};

export const useUsers = (
  options?: Omit<UseQueryOptions<User[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsers,
    ...options,
  });
};
