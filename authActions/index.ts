'use server';

import { revalidatePath } from 'next/cache';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { signIn, signOut } from '@/auth';
import prisma from '@/lib/prisma';
import { loginFormSchema, registerFormSchema } from '@/utils';

export const loginWithProvider = async (provider: string) => {
  await signIn(provider, { redirectTo: '/' });
  // revalidatePath('/');
};

export const logout = async () => {
  await signOut();
  revalidatePath('/');
};

export const login = async (data: z.infer<typeof loginFormSchema>) => {
  // Validate the input data
  const validatedData = loginFormSchema.parse(data);

  //  If the data is invalid, return an error
  if (!validatedData) {
    return { error: 'Invalid input data' };
  }

  //  Destructure the validated data
  const { email, password } = validatedData;

  // Hash the password
  // const hashedPassword = await bcrypt.hash(password, 10);

  const userExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!userExists || !userExists.hashedPassword || !userExists.email) {
    return { error: 'User not found.' };
  }

  try {
    await signIn('credentials', {
      email: userExists.email,
      password,
      redirectTo: '/',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid email or password' };
        default:
          return { error: 'Please confirm your email' };
      }
    }
    throw error;
  }

  return { success: 'Logged in successfully!' };
};

export const register = async (data: z.infer<typeof registerFormSchema>) => {
  try {
    // Validate the input data
    const validatedData = registerFormSchema.parse(data);

    //  If the data is invalid, return an error
    if (!validatedData) {
      return { error: 'Invalid input data' };
    }

    //  Destructure the validated data
    const { email, name, password, confirmPassword } = validatedData;

    // Check if passwords match
    if (password !== confirmPassword) {
      return { error: 'Passwords do not match' };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check to see if user already exists
    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    // If the user exists, return an error
    if (userExists) {
      return { error: 'Email already is in use. Please try another one.' };
    }

    const lowerCaseEmail = email.toLowerCase();

    // Create the user
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

    return { success: 'Email Verification was sent' };
  } catch (error) {
    // Handle the error, specifically check for a 503 error
    console.error('Database error:', error);

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
};
