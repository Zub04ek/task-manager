'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { z } from 'zod';

import { signIn, signOut } from '@/auth';
// import { loginFormSchema } from '@/components/auth/forms/SignInForm';
import prisma from '@/lib/prisma';

// const getUserByEmail = async (email: string) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });
//     return user;
//   } catch (error) {
//     console.log('error getting user :>> ', error);
//     return null;
//   }
// };

// export const login = async (provider: string) => {
//   await signIn(provider, { redirectTo: '/' });
//   revalidatePath('/');
// };

// export const logout = async () => {
//   await signOut({ redirectTo: '/' });
//   revalidatePath('/');
// };

// export const loginWithCreds = async (
//   values: z.infer<typeof loginFormSchema>
// ) => {
//   // const rawFormData = {
//   //   email: formData.get('email') as string,
//   //   password: formData.get('password') as string,
//   //   redirectTo: '/',
//   // };
//   const existingUser = await getUserByEmail(values.email);
//   try {
//     await signIn('credentials', values);
//     redirect('/');
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return { error: 'Invalid email or password' };
//         default:
//           return { error: 'Something went wrong' };
//       }
//     }
//     throw error;
//   }
//   revalidatePath('/');
// };
