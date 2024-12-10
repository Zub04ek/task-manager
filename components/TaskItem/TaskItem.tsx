'use client';

import { OptionsDropdown } from '@/components/OptionsDropdown';
import { Badge } from '@/components/ui';
import { badgeStyle } from '@/components/ui/multiple-selector';
import { cn } from '@/lib/utils';
import { useModalStore, useSelectedTask } from '@/stores';
import { Task } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskProps {
  task: Task;
  forceDragging?: boolean;
}

export const TaskItem = ({ task, forceDragging = false }: TaskProps) => {
  const taskModal = useModalStore();
  const setSelectedTask = useSelectedTask((state) => state.setTask);

  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  // const style = {
  //   transform: transform
  //     ? `translate3d(${transform.x}px, ${Math.round(
  //         transform.y
  //       )}px, 0) scaleX(${transform.scaleX})`
  //     : '',
  //   transition,
  // };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? '0.4' : '1',
    lineHeight: '4',
    cursor: isDragging || forceDragging ? 'grabbing' : 'grab',
  };

  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
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
          <span className="leading-8">{task.sequence}</span>
        </div>
        <h3 className="line-clamp-1 text-lg font-medium">{task.title}</h3>
        {/* <div
          className="line-clamp-3 text-xs"
          dangerouslySetInnerHTML={{ __html: task.description }}
        /> */}
        <ul className="flex flex-wrap gap-1">
          {task.tags.map((tag) => {
            return (
              <Badge
                key={tag.id}
                variant="outline"
                style={badgeStyle(tag.color || '')}
                className={cn('rounded-xl')}
              >
                {tag.label}
              </Badge>
            );
          })}
        </ul>
      </div>
    </li>
  );
};
