import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest) {
  try {
    // const { userId } = auth();
    const { id, title, description, tags, priority, status } = await req.json();

    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized", status: 401 });
    // }

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        priority,
        status,
        tags: {
          deleteMany: {},
          create: tags,
        },
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log('ERROR UPDATING TASK: ', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse('Unauthorized', { status: 401 });
    // }

    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log('ERROR DELETING TASK: ', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
