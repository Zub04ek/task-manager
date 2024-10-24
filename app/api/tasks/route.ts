import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { Task } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized", status: 401 });
    // }

    const { title, description, tags, priority } = await req.json();

    if (!title || !description || !tags || !priority) {
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
      data: <Task>{
        title,
        description,
        tags,
        priority,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log('ERROR CREATING TASK: ', error);
    // return NextResponse.json({ error: 'Error creating task', status: 500 });
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

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

    console.log('task :>> ', tasks);

    return NextResponse.json(tasks);
  } catch (error) {
    console.log('ERROR GETTING TASKS: ', error);
    // return NextResponse.json({ error: 'Error getting task', status: 500 });
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    // const { userId } = auth();
    const { isCompleted, id } = await req.json();

    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized", status: 401 });
    // }

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log('ERROR UPDATING TASK: ', error);
    return NextResponse.json({ error: 'Error updating task', status: 500 });
  }
}
