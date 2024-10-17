'use client';

import React from 'react';

import { Button } from '@/components/ui';
import { Task } from '@/types';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <li className="rounded-2xl bg-background p-6">
      <div className="flex items-center justify-between">
        <span>{task.status}</span>
        <Button variant="ghost" size="icon" className="hover:bg-background">
          <DotsHorizontalIcon />
        </Button>
      </div>
      <h1 className="line-clamp-1 text-lg font-medium">{task.title}</h1>
      <p className="line-clamp-3 text-xs">{task.description}</p>
    </li>
  );
}
