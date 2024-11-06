'use client';

import { cn } from '@/lib/utils';
import { useModalStore } from '@/stores';
import { useSelectedTask } from '@/stores/SelectedTaskStore';
import { Task } from '@prisma/client';

import { OptionsDropdown } from '../OptionsDropdown';

interface TaskProps {
  task: Task;
}

export const TaskItem = ({ task }: TaskProps) => {
  const taskModal = useModalStore();
  const setSelectedTask = useSelectedTask((state) => state.setTask);

  return (
    <li
      className="relative cursor-pointer rounded-2xl bg-background p-6 shadow-xl"
      onDoubleClick={() => {
        setSelectedTask(task);
        taskModal.onOpen();
      }}
    >
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