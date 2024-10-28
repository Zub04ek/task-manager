'use client';

import { useEffect } from 'react';
import axios from 'axios';

import { useSelectedTask } from '@/stores/SelectedTaskStore';
import { useTasksStore } from '@/stores/TasksStore';

import { Column } from './column';
import { TaskForm } from './task-form';

export const Columns = () => {
  const selectedTask = useSelectedTask((state) => state.task);
  const setAllTasks = useTasksStore((state) => state.setTasks);

  const getTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      if (res.data.error) {
        console.log('err :>> ', res.data.error);
      } else {
        setAllTasks(res.data);
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <section className="grid h-full gap-6 lg:grid-cols-3">
      <TaskForm initialData={selectedTask} />
      <Column title="To do" status="to do" />
      <Column title="In progress" status="in progress" />
      <Column title="Done" status="done" />
    </section>
  );
};
