import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prisma from '@/lib/prisma';
import { connectToDatabase } from '@/utils';

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password)
      return NextResponse.json({ message: 'Invalid Data' }, { status: 422 });
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectToDatabase();
    const user = await prisma.user.create({
      data: { email, name, hashedPassword },
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.log('ERROR CREATING USER: ', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
