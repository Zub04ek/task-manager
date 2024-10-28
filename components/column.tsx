'use client';

import { useModalStore } from '@/stores';
import { PlusIcon } from '@radix-ui/react-icons';

import { TaskList } from './task-list';
import { Button } from './ui';

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
        {status === 'to do' && (
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-background"
            onClick={() => taskModal.onOpen()}
          >
            <PlusIcon />
          </Button>
        )}
      </div>
      <TaskList status={status} />
    </div>
  );
};
