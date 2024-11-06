import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized", status: 401 });
    // }

    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
    //   {where: {
    //     userId,
    //   },}

    return NextResponse.json(tasks);
  } catch (error) {
    console.log('ERROR GETTING TASKS: ', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
