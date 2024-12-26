'use client';

import axios from 'axios';

import { MutationOptions, useMutation } from '@tanstack/react-query';

const logoutUser = async () => {
  try {
    const res = await axios.post('/api/auth/logout');
    return res.data;
  } catch (error) {
    console.log('error logging out :>> ', error);
    throw error;
  }
};

export const useLogoutUser = (options?: MutationOptions) => {
  return useMutation({
    mutationKey: ['logoutUser'],
    mutationFn: logoutUser,
    ...options,
  });
};
