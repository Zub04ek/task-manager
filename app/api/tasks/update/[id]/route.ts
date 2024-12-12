import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest) {
  try {
    // const { userId } = auth();
    const { id, sequence, status } = await req.json();

    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized", status: 401 });
    // }

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        sequence,
        status,
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.log('ERROR UPDATING TASK: ', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
