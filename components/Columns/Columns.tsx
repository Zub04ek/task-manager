'use client';

import { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';

import { useUpdateTask } from '@/app/api/hooks/task';
import { Column } from '@/components/Column';
import { useToast } from '@/hooks';
import { useTasksStore } from '@/stores';
import { ColumnType, Task } from '@/types';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';

const COLUMNS: ColumnType[] = [
  { id: 'TO_DO', title: 'To do' },
  { id: 'IN_PROGRESS', title: 'In progress' },
  { id: 'DONE', title: 'Done' },
];

export const Columns = () => {
  const [items, setItems] = useState<Record<string, Task[]>>({
    TO_DO: [],
    IN_PROGRESS: [],
    DONE: [],
  });
  const [activeTask, setActiveTask] = useState<Task>();
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
      setItems({
        TO_DO: allTasks
          .filter((task) => task.status === 'TO_DO')
          .sort((a, b) => a.sequence - b.sequence),
        IN_PROGRESS: allTasks
          .filter((task) => task.status === 'IN_PROGRESS')
          .sort((a, b) => a.sequence - b.sequence),
        DONE: allTasks
          .filter((task) => task.status === 'DONE')
          .sort((a, b) => a.sequence - b.sequence),
      });
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

  function findContainer(
    id: UniqueIdentifier
  ): string | UniqueIdentifier | undefined {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) =>
      items[key].some((el) => el.id === id)
    );
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveTask(allTasks.find((task) => task.id === active.id));
  };

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over?.id) return;

    // Find the containers
    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setTimeout(
      () =>
        setItems((items) => {
          const activeItems = items[activeContainer];
          const overItems = items[overContainer];

          // Find the indexes for the items
          const activeIndex = activeItems?.findIndex(
            (item) => item.id === active.id
          );
          const overIndex = overItems?.findIndex((item) => item.id === over.id);

          let newIndex: number;
          if (over.id in items) {
            // We're at the root droppable of a container
            newIndex = overItems.length + 1;
          } else {
            const isBelowOverItem =
              over &&
              overIndex === overItems.length - 1 &&
              active.rect.current.translated &&
              active.rect.current.translated.top >
                over.rect.top + over.rect.height;
            // or over.rect.offsetTop

            const modifier = isBelowOverItem ? 1 : 0;
            newIndex =
              overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
          }

          return {
            ...items,
            [activeContainer]: items[activeContainer].filter(
              (item) => item.id !== active.id
            ),
            [overContainer]: [
              ...items[overContainer].slice(0, newIndex),
              items[activeContainer][activeIndex],
              ...items[overContainer].slice(
                newIndex,
                items[overContainer].length
              ),
            ],
          };
        }),
      0
    );
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // const overId = over?.id;
    if (!over?.id) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    if (activeTask && activeTask?.status !== overContainer) {
      items[activeTask.status].forEach((task, index) => {
        if (task.sequence !== index) {
          updateTaskMutate({ id: task.id, sequence: index }, mutateOptions);
          console.log('mutate in dragend active');
        }
        return task;
      });
    }

    const activeIndex = items[activeContainer].findIndex(
      (item) => item.id === active.id
    );
    const overIndex = items[overContainer].findIndex(
      (item) => item.id === over.id
    );

    if (activeIndex !== overIndex) {
      const updatedArray = arrayMove(
        items[overContainer],
        activeIndex,
        overIndex
      );
      updatedArray.forEach((task, index) => {
        if (task.sequence !== index || task.status !== overContainer) {
          updateTaskMutate(
            {
              id: task.id,
              sequence: index,
              status: overContainer,
            },
            mutateOptions
          );
          console.log('mutate in dragEnd');
        }
        return task;
      });
      setItems((items) => ({
        ...items,
        [overContainer]: updatedArray,
      }));
    } else {
      items[overContainer].forEach((task, index) => {
        if (task.sequence !== index || task.status !== overContainer) {
          updateTaskMutate(
            {
              id: task.id,
              sequence: index,
              status: overContainer,
            },
            mutateOptions
          );
          console.log('mutate in dragend new');
        }
        return task;
      });
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
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {COLUMNS.map((column) => {
          return (
            <Column
              key={column.id}
              title={column.title}
              status={column.id}
              items={items[column.id]}
            />
          );
        })}
      </DndContext>
    </>
  );
};
