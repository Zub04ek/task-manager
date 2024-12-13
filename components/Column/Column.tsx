'use client';

import { TaskList } from '@/components/TaskList';
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';
import { useModalStore } from '@/stores';
import { Task } from '@/types';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { PlusIcon } from '@radix-ui/react-icons';

interface ColumnProps {
  title: string;
  status: string;
  items: Task[];
}

export const Column = (props: ColumnProps) => {
  const { title, status, items } = props;

  const taskModal = useModalStore();

  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <SortableContext
      id={status}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        className="grid grid-rows-[36px_1fr] gap-3 rounded-xl bg-accent pb-3 pl-6 pr-3 pt-6"
      >
        <div className="flex items-center justify-between pr-3">
          <h2 className="font-semibold">{title}</h2>
          {status === 'TO_DO' && (
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-background"
                    onClick={() => taskModal.onOpen()}
                  >
                    <PlusIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add a new task</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <TaskList
          className="flex flex-col gap-6 py-3 pr-3"
          // status={status}
          items={items}
        />
      </div>
    </SortableContext>
  );
};
