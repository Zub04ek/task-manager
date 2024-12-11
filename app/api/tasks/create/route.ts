import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized", status: 401 });
    // }

    const { title, description, tags, priority, sequence } = await req.json();

    if (!title || !description || !tags || !priority || !sequence) {
      return NextResponse.json({
        error: 'Missing required fields',
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: 'Title must be at least 3 characters long',
        status: 400,
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        sequence,
        tags: {
          create: tags,
        },
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log('ERROR CREATING TASK: ', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
