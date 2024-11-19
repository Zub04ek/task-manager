'use client';

import { HTMLAttributes } from 'react';

import { TaskItem } from '@/components/TaskItem';
// import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { useTasksStore } from '@/stores/TasksStore';

interface TaskListProps extends HTMLAttributes<HTMLUListElement> {
  status: string;
}

export const TaskList = ({ status, className, ...props }: TaskListProps) => {
  const allTasks = useTasksStore((state) => state.tasks);
  const filteredTasks = allTasks.filter((todo) => todo.status === status);

  return (
    <ul
      // className="flex flex-col gap-6 scroll-smooth py-3 pr-3 lg:max-h-[667px] lg:overflow-y-auto"
      className={cn('scroll-smooth', className)}
      {...props}
    >
      {filteredTasks.map((todo) => (
        <TaskItem key={todo.id} task={todo} />
      ))}
      {/* {status === 'TO_DO' && (
        <li className="rounded-2xl bg-background shadow-xl">
          <Button className="h-full w-full rounded-2xl bg-background">
            Add New Task
          </Button>
        </li>
      )} */}
    </ul>
  );
};
