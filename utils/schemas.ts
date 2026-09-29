import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().min(1, 'Email is required!').email(),
  password: z.string().min(1, 'Password is required!').min(8),
});

export const registerFormSchema = z
  .object({
    name: z.string().min(1, 'Username is required!').max(100),
    email: z.string().min(1, 'Email is required!').email(),
    password: z.string().min(1, 'Password is required!').min(8),
    confirmPassword: z
      .string()
      .min(1, 'Password confirmation is required!')
      .min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });
