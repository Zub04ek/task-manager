'use client';

import { cn } from '@/lib/utils';
import { Task } from '@prisma/client';

import { OptionsDropdown } from './options-dropdown';

interface TaskProps {
  task: Task;
}

export const TaskItem = ({ task }: TaskProps) => {
  return (
    <li className="relative rounded-2xl bg-background p-6">
      <OptionsDropdown task={task} />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <span
            className={cn('flex h-2 w-2 rounded-full', {
              'bg-chart-5': task.status === 'TO_DO',
              'bg-chart-3': task.status === 'IN_PROGRESS',
              'bg-chart-2': task.status === 'DONE',
            })}
          />
          <span className="text-[8px] font-medium uppercase text-muted-foreground">
            {task.status}
          </span>
        </div>
        <h3 className="line-clamp-1 text-lg font-medium">{task.title}</h3>
        <p className="line-clamp-3 text-xs">{task.description}</p>
      </div>
    </li>
  );
};
