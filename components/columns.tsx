'use client';

import { useEffect } from 'react';
import { Loader } from 'lucide-react';

import { useTasks, useToast } from '@/hooks';
import { useSelectedTask, useTasksStore } from '@/stores';

import { Column } from './column';
import { TaskForm } from './task-form';

export const Columns = () => {
  const selectedTask = useSelectedTask((state) => state.task);
  const setAllTasks = useTasksStore((state) => state.setTasks);
  const { toast } = useToast();

  const { data: allTasks, isPending, error } = useTasks();

  // const getTasks = async () => {
  //   try {
  //     const res = await axios.get('/api/tasks');
  //     if (res.data.error) {
  //       toast({
  //         variant: 'destructive',
  //         title: 'Uh oh! Something went wrong.',
  //         description: res.data.error,
  //       });
  //     } else {
  //       setAllTasks(res.data);
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       toast({
  //         variant: 'destructive',
  //         title: 'Uh oh! Something went wrong.',
  //         description: error.message,
  //       });
  //     } else if (error instanceof Error) {
  //       toast({
  //         variant: 'destructive',
  //         title: 'Uh oh! Something went wrong.',
  //         description: error.message,
  //       });
  //     }
  //   }
  // };

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
    return toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: error.message,
    });

  return (
    <section className="grid h-full gap-6 lg:grid-cols-3">
      <TaskForm initialData={selectedTask} />
      <Column title="To do" status="TO_DO" />
      <Column title="In progress" status="IN_PROGRESS" />
      <Column title="Done" status="DONE" />
    </section>
  );
};
