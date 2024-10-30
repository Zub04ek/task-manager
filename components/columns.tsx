'use client';

import { useEffect } from 'react';
import axios from 'axios';

import { useToast } from '@/hooks';
import { useSelectedTask } from '@/stores/SelectedTaskStore';
import { useTasksStore } from '@/stores/TasksStore';

import { Column } from './column';
import { TaskForm } from './task-form';

export const Columns = () => {
  const selectedTask = useSelectedTask((state) => state.task);
  const setAllTasks = useTasksStore((state) => state.setTasks);
  const { toast } = useToast();

  const getTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      if (res.data.error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: res.data.error,
        });
      } else {
        setAllTasks(res.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.message,
        });
      } else if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.message,
        });
      }
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <section className="grid h-full gap-6 lg:grid-cols-3">
      <TaskForm initialData={selectedTask} />
      <Column title="To do" status="TO_DO" />
      <Column title="In progress" status="IN_PROGRESS" />
      <Column title="Done" status="DONE" />
    </section>
  );
};
