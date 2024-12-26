import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prisma from '@/lib/prisma';

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, password, confirmPassword } = await req.json();

    if (!name || !email || !password)
      return NextResponse.json({ message: 'Invalid Data' }, { status: 422 });
    if (password !== confirmPassword)
      return NextResponse.json(
        { message: 'Passwords do not match' },
        {
          status: 422,
        }
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await prisma.user.findFirst({
      where: { email },
    });
    if (userExists)
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 500 }
      );

    const user = await prisma.user.create({
      data: { email: email.toLowerCase(), name, hashedPassword },
    });
    revalidatePath('/');
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.log('ERROR CREATING USER: ', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
};
