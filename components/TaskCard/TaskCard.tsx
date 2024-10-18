'use client';

import { Task } from '@/types';

import { TaskCardDropdown } from '../TaskCardDropdown';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <li className="relative rounded-2xl bg-background p-6">
      <TaskCardDropdown />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <span className="flex h-2 w-2 rounded-full bg-chart-2" />
          <span className="text-[8px] font-medium uppercase text-muted-foreground">
            {task.status}
          </span>
        </div>
        <h1 className="line-clamp-1 text-lg font-medium">{task.title}</h1>
        <p className="line-clamp-3 text-xs">{task.description}</p>
      </div>
    </li>
  );
}
