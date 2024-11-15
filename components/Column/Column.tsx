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
import { PlusIcon } from '@radix-ui/react-icons';

interface ColumnProps {
  title: string;
  status: string;
}

export const Column = (props: ColumnProps) => {
  const { title, status } = props;

  const taskModal = useModalStore();

  return (
    <div className="grid grid-rows-[36px_1fr] gap-3 rounded-xl bg-accent pb-3 pl-6 pr-3 pt-6">
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
      <TaskList status={status} />
    </div>
  );
};
