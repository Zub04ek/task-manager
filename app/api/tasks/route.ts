import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized", status: 401 });
    // }

    const tasks = await prisma.task.findMany({
      // orderBy: { updatedAt: 'desc' },
      include: {
        tags: true,
      },
    });
    //   {where: {
    //     userId,
    //   },}

    // await prisma.task.updateMany({
    //   data: {
    //     sequence: 0,
    //   },
    // });

    return NextResponse.json(tasks);
  } catch (error) {
    console.log('ERROR GETTING TASKS: ', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
