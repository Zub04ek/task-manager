'use client';

import { TaskCardDropdown } from '@/components/TaskCardDropdown';
import { cn } from '@/lib/utils';

// import { Task } from '@prisma/client';

// import { Task } from '@/types';
// import { TaskCardDropdown } from '../TaskCardDropdown';

interface TaskProps {
  userId: number;
  id: string;
  title: string;
  description: string;
  status: string;
  completed: boolean;
}

export const Task = (props: TaskProps) => {
  const { title, description, status } = props;
  return (
    <li className="relative rounded-2xl bg-background p-6">
      <TaskCardDropdown />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <span
            className={cn('flex h-2 w-2 rounded-full', {
              'bg-chart-5': status === 'to do',
              'bg-chart-3': status === 'in progress',
              'bg-chart-2': status === 'done',
            })}
          />
          <span className="text-[8px] font-medium uppercase text-muted-foreground">
            {status}
          </span>
        </div>
        <h3 className="line-clamp-1 text-lg font-medium">{title}</h3>
        <p className="line-clamp-3 text-xs">{description}</p>
      </div>
    </li>
  );
};
