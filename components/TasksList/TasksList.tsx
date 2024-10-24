'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import { AddTaskDialog } from '@/components/AddTaskDialog';
import { TaskCard } from '@/components/TaskCard';
// import { useTaskStore } from '@/stores';
import { Task } from '@prisma/client';

const GROUPS = [
  {
    title: 'To do',
  },
  {
    title: 'In progress',
  },
  {
    title: 'Completed',
  },
];

export function TasksList() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  // const allTasks = useTaskStore((state) => state.tasks);

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
    <>
      {GROUPS.map((group, index) => {
        return (
          <div
            key={index}
            className="grid grid-rows-[36px_1fr] gap-6 rounded-xl bg-accent py-6 pl-6 pr-3"
          >
            <div className="flex items-center justify-between pr-3">
              <span className="font-semibold">{group.title}</span>

              {group.title === 'To do' && <AddTaskDialog />}
            </div>
            <ul className="flex h-[667px] flex-col gap-6 overflow-y-auto scroll-smooth pr-3">
              {allTasks
                .filter((todo) => todo.status === group.title.toLowerCase())
                .map((todo) => {
                  return <TaskCard key={todo.id} task={todo} />;
                })}
            </ul>
          </div>
        );
      })}
    </>
  );
}
