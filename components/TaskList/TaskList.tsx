'use client';

import { HTMLAttributes } from 'react';
import { usePathname } from 'next/navigation';

import { TaskItem } from '@/components/TaskItem';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { useModalStore, useTasksStore } from '@/stores';
import { Task } from '@/types';
import { PlusIcon } from '@radix-ui/react-icons';

interface TaskListProps extends HTMLAttributes<HTMLUListElement> {
  status: string;
  items?: Task[];
}

export const TaskList = ({
  status,
  items,
  className,
  // ...props
}: TaskListProps) => {
  const pathname = usePathname();
  const taskModal = useModalStore();
  const allTasks = useTasksStore((state) => state.tasks);
  const filteredTasks =
    items || allTasks.filter((todo) => todo.status === status);

  // const { setNodeRef } = useDroppable({
  //   id: status,
  // });

  return (
    <ul
      // ref={setNodeRef}
      // className="flex flex-col gap-6 scroll-smooth py-3 pr-3 lg:max-h-[667px] lg:overflow-y-auto"
      className={cn(className)}
      // {...props}
    >
      {filteredTasks.map((todo) => (
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
