'use client';

import { ComponentPropsWithoutRef, forwardRef, useEffect } from 'react';
import { Loader } from 'lucide-react';

import { useTasks } from '@/app/api/hooks';
import { TaskForm } from '@/components/TaskForm';
import { cn } from '@/lib/utils';
import { useSelectedTask, useTasksStore } from '@/stores';

const TasksPage = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<'section'>
>(({ className, children, ...props }, ref) => {
  const selectedTask = useSelectedTask((state) => state.task);
  //   const tasks = useTasksStore((state) => state.tasks);
  const setAllTasks = useTasksStore((state) => state.setTasks);

  const { data: allTasks, isPending, error } = useTasks();

  useEffect(() => {
    if (allTasks) {
      setAllTasks(allTasks);
    }
  }, [allTasks]);

  if (isPending)
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );

  if (error)
    return (
      <div className="grid h-full place-content-center px-4">
        <div className="text-center">
          <h1>Oops, something went wrong!</h1>
          <h2 className="text-sm font-medium text-muted-foreground">
            {error.message}
          </h2>
        </div>
      </div>
    );

  return (
    <section ref={ref} className={cn('lg:h-full', className)} {...props}>
      <TaskForm initialData={selectedTask} />
      {children}
    </section>
  );
});

TasksPage.displayName = 'TasksPage';
export { TasksPage };
