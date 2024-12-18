import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { connectToDatabase } from '@/utils';

export const GET = async () => {
  try {
    await connectToDatabase();
    const users = await prisma.user.findMany();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.log('ERROR GETTING USERS: ', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
