'use client';

import { useEffect } from 'react';
import { Loader } from 'lucide-react';

import { useTasks } from '@/app/api/hooks';
import { Column } from '@/components/Column';
import { TaskForm } from '@/components/TaskForm';
import { useSelectedTask, useTasksStore } from '@/stores';

export const Columns = () => {
  const selectedTask = useSelectedTask((state) => state.task);
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
    <section className="grid h-full gap-6 lg:grid-cols-3">
      <TaskForm initialData={selectedTask} />
      <Column title="To do" status="TO_DO" />
      <Column title="In progress" status="IN_PROGRESS" />
      <Column title="Done" status="DONE" />
    </section>
  );
};
