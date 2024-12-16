'use client';

import { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';

import { useUpdateTask } from '@/app/api/hooks';
import { TaskList } from '@/components/TaskList';
import { useToast } from '@/hooks';
import { useTasksStore } from '@/stores';
import { Task } from '@/types';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Status } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';

interface TaskGridProps {
  status: Status;
}

export const TaskGrid = ({ status }: TaskGridProps) => {
  const [items, setItems] = useState<Task[]>([]);
  const allTasks = useTasksStore((state) => state.tasks);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate: updateTaskMutate, isPending } = useUpdateTask();
  const mutateOptions = {
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({ description: 'Tasks are updated successfully!' });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  };

  useEffect(() => {
    if (allTasks) {
      setItems(
        allTasks
          .filter((task) => task.status === status)
          .sort((a, b) => a.sequence - b.sequence)
      );
    }
  }, [allTasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // allows to click on nested DropdownMenuItem
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over?.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    if (oldIndex !== newIndex) {
      const updatedArray = arrayMove(items, oldIndex, newIndex);
      updatedArray.forEach((task, index) => {
        if (task.sequence !== index) {
          updateTaskMutate(
            {
              id: task.id,
              sequence: index,
            },
            mutateOptions
          );
          console.log('mutate in grid');
        }
        return task;
      });
      setItems(updatedArray);
    }
  };

  return (
    <>
      {isPending && (
        <>
          <div className="fixed inset-0 z-50 bg-black/80"></div>
          <div className="fixed left-[50%] top-[50%] z-50 flex min-h-screen translate-x-[-50%] translate-y-[-50%] items-center justify-center">
            <Loader className="size-6 animate-spin text-muted-foreground" />
          </div>
        </>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <div className="flex items-center justify-between pr-3">
            <h2 className="font-semibold">
              {status !== Status.IN_PROGRESS
                ? status === Status.TO_DO
                  ? 'Planned'
                  : 'Completed'
                : 'Active'}{' '}
              tasks
            </h2>
          </div>
          <TaskList
            className="grid gap-6 overflow-y-auto [grid-auto-rows:20vh] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            items={items}
          />
        </SortableContext>
      </DndContext>
    </>
  );
};
