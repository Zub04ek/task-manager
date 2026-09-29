'use server';

import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { signIn, signOut } from '@/auth';
import prisma from '@/lib/prisma';
import { loginFormSchema, registerFormSchema } from '@/utils';

export const loginWithProvider = async (provider: string) => {
  await signIn(provider, { redirectTo: '/' });
};

export const logout = async () => {
  await signOut({
    redirectTo: '/signin',
  });
};

export const login = async (data: z.infer<typeof loginFormSchema>) => {
  // Validate the input data
  const validatedData = loginFormSchema.parse(data);

  //  If the data is invalid, return an error
  // if (!validatedData) {
  //   return { error: 'Invalid input data' };
  // }

  const { email, password } = validatedData;

  // const userExists = await prisma.user.findFirst({
  //   where: {
  //     email,
  //   },
  // });

  // if (!userExists || !userExists.hashedPassword || !userExists.email) {
  //   return { error: 'User not found.' };
  // }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return { error: 'Invalid email or password' };
      }
      return { error: 'Please try again.' };
    }
    throw error;
  }
};

export const register = async (data: z.infer<typeof registerFormSchema>) => {
  try {
    // Validate the input data
    const validatedData = registerFormSchema.parse(data);

    //  If the data is invalid, return an error
    // if (!validatedData) {
    //   return { error: 'Invalid input data' };
    // }

    const { email, name, password, confirmPassword } = validatedData;

    if (password !== confirmPassword) {
      return { error: 'Passwords do not match' };
    }

    const lowerCaseEmail = email.toLowerCase();
    const userExists = await prisma.user.findFirst({
      where: {
        email: lowerCaseEmail,
      },
    });
    if (userExists) {
      return { error: 'Email already is in use. Please try another one.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email: lowerCaseEmail,
        name,
        hashedPassword,
      },
    });

    // Generate Verification Token
    // const verificationToken = await generateVerificationToken(email);

    // await sendVerificationEmail(lowerCaseEmail, verificationToken.token);

    // return { success: 'Email Verification was sent' };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return {
          error: 'Account was created, but automatic sign-in failed.',
        };
      }
      return {
        error:
          'Account was created, but something went wrong while signing in.',
      };
    }

    console.error('Registration error:', error);

    if ((error as { code: string }).code === 'ETIMEDOUT') {
      return {
        error: 'Unable to connect to the database. Please try again later.',
      };
    } else if ((error as { code: string }).code === '503') {
      return {
        error: 'Service temporarily unavailable. Please try again later.',
      };
    } else {
      return { error: 'An unexpected error occurred. Please try again later.' };
    }
  }
  await signIn('credentials', {
    email: data.email.toLowerCase(),
    password: data.password,
    redirectTo: '/',
  });
};
