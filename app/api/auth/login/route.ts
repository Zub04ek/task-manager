import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { signIn } from '@/auth';
import prisma from '@/lib/prisma';

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json({ message: 'Invalid Data' }, { status: 422 });

    const userExists = await prisma.user.findFirst({
      where: { email },
    });
    if (!userExists || !userExists.hashedPassword || !userExists.email)
      return NextResponse.json({ message: 'User not found' }, { status: 404 });

    await signIn('credentials', {
      email: userExists.email,
      password: password,
      redirect: false,
    });

    revalidatePath('/');
    return NextResponse.json('User logged in successfully!', { status: 200 });
  } catch (error) {
    console.log('ERROR LOGGING: ', error);
    return NextResponse.json(error, { status: 500 });
  }
};
