import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { signOut } from '@/auth';

export const POST = async () => {
  try {
    await signOut({
      redirect: false,
    });
    revalidatePath('/');
    return NextResponse.json('User logged out successfully!', { status: 200 });
  } catch (error) {
    console.log('ERROR LOGGING: ', error);
    return NextResponse.json(error, { status: 500 });
  }
};
