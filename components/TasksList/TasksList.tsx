'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import { AddTaskDialog } from '@/components/AddTaskDialog';
import { TaskCard } from '@/components/TaskCard';
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

// const todos = [
//   {
//     userId: 1,
//     id: '1',
//     title: 'delectus aut autem',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quia explicabo alias harum officia porro, ab deserunt recusandae in, ut nulla magnam accusantium exercitationem, ullam cumque ea et. Recusandae temporibus nobis vitae dignissimos ab blanditiis corporis obcaecati necessitatibus explicabo quis facere commodi esse, numquam sequi possimus ex error quae mollitia.',
//     status: 'to do',
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: '2',
//     title: 'quis ut nam facilis et officia qui',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quia explicabo alias harum officia porro, ab deserunt recusandae in, ut nulla magnam accusantium exercitationem, ullam cumque ea et. Recusandae temporibus nobis vitae dignissimos ab blanditiis corporis obcaecati necessitatibus explicabo quis facere commodi esse, numquam sequi possimus ex error quae mollitia.',
//     status: 'in progress',
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: '3',
//     title: 'fugiat veniam minus',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quia explicabo alias harum officia porro, ab deserunt recusandae in, ut nulla magnam accusantium exercitationem, ullam cumque ea et. Recusandae temporibus nobis vitae dignissimos ab blanditiis corporis obcaecati necessitatibus explicabo quis facere commodi esse, numquam sequi possimus ex error quae mollitia.',
//     status: 'completed',
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: '4',
//     title: 'et porro tempora',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quia explicabo alias harum officia porro, ab deserunt recusandae in, ut nulla magnam accusantium exercitationem, ullam cumque ea et. Recusandae temporibus nobis vitae dignissimos ab blanditiis corporis obcaecati necessitatibus explicabo quis facere commodi esse, numquam sequi possimus ex error quae mollitia.',
//     status: 'to do',
//     completed: true,
//   },
//   {
//     userId: 1,
//     id: '5',
//     title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quia explicabo alias harum officia porro, ab deserunt recusandae in, ut nulla magnam accusantium exercitationem, ullam cumque ea et. Recusandae temporibus nobis vitae dignissimos ab blanditiis corporis obcaecati necessitatibus explicabo quis facere commodi esse, numquam sequi possimus ex error quae mollitia.',
//     status: 'in progress',
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: '6',
//     title: 'qui ullam ratione quibusdam voluptatem quia omnis',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quia explicabo alias harum officia porro, ab deserunt recusandae in, ut nulla magnam accusantium exercitationem, ullam cumque ea et. Recusandae temporibus nobis vitae dignissimos ab blanditiis corporis obcaecati necessitatibus explicabo quis facere commodi esse, numquam sequi possimus ex error quae mollitia.',
//     status: 'completed',
//     completed: false,
//   },
// ];

export function TasksList() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  async function getTasks() {
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
  }

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
