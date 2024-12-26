'use client';

import { HTMLAttributes } from 'react';
import { usePathname } from 'next/navigation';

import { TaskItem } from '@/components/TaskItem';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { useModalStore } from '@/stores';
import { Task } from '@/types';
import { PlusIcon } from '@radix-ui/react-icons';

interface TaskListProps extends HTMLAttributes<HTMLUListElement> {
  items: Task[];
}

export const TaskList = ({ items, className }: TaskListProps) => {
  const pathname = usePathname();
  const taskModal = useModalStore();

  return (
    <ul className={cn(className)}>
      {items.map((todo) => (
        <TaskItem key={todo.id} task={todo} />
      ))}
      {pathname === '/planned' && (
        <li className="">
          <Button
            variant="secondary"
            className="h-full w-full gap-2 rounded-2xl border border-dashed border-foreground bg-transparent transition-all duration-300 ease-in-out hover:border-transparent hover:bg-background hover:shadow-xl"
            onClick={() => taskModal.onOpen()}
          >
            <PlusIcon />
            Add New Task
          </Button>
        </li>
      )}
    </ul>
  );
};
