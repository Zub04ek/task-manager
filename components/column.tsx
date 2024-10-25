'use client';

import { AddTaskDialog } from '@/components/AddTaskDialog';

import { Task } from './task';

interface ColumnProps {
  title: string;
  status: string;
}

const todos = [
  {
    userId: 1,
    id: '1',
    title: 'delectus aut autem',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quia explicabo alias harum officia porro, ab deserunt recusandae in, ut nulla magnam accusantium exercitationem, ullam cumque ea et. Recusandae temporibus nobis vitae dignissimos ab blanditiis corporis obcaecati necessitatibus explicabo quis facere commodi esse, numquam sequi possimus ex error quae mollitia.',
    status: 'to do',
    completed: false,
  },
  {
    userId: 1,
    id: '2',
    title: 'quis ut nam facilis et officia qui',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quia explicabo alias harum officia porro, ab deserunt recusandae in, ut nulla magnam accusantium exercitationem, ullam cumque ea et. Recusandae temporibus nobis vitae dignissimos ab blanditiis corporis obcaecati necessitatibus explicabo quis facere commodi esse, numquam sequi possimus ex error quae mollitia.',
    status: 'in progress',
    completed: false,
  },
  {
    userId: 1,
    id: '3',
    title: 'fugiat veniam minus',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quia explicabo alias harum officia porro, ab deserunt recusandae in, ut nulla magnam accusantium exercitationem, ullam cumque ea et. Recusandae temporibus nobis vitae dignissimos ab blanditiis corporis obcaecati necessitatibus explicabo quis facere commodi esse, numquam sequi possimus ex error quae mollitia.',
    status: 'done',
    completed: false,
  },
  {
    userId: 1,
    id: '4',
    title: 'et porro tempora',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quia explicabo alias harum officia porro, ab deserunt recusandae in, ut nulla magnam accusantium exercitationem, ullam cumque ea et. Recusandae temporibus nobis vitae dignissimos ab blanditiis corporis obcaecati necessitatibus explicabo quis facere commodi esse, numquam sequi possimus ex error quae mollitia.',
    status: 'to do',
    completed: true,
  },
  {
    userId: 1,
    id: '5',
    title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quia explicabo alias harum officia porro, ab deserunt recusandae in, ut nulla magnam accusantium exercitationem, ullam cumque ea et. Recusandae temporibus nobis vitae dignissimos ab blanditiis corporis obcaecati necessitatibus explicabo quis facere commodi esse, numquam sequi possimus ex error quae mollitia.',
    status: 'in progress',
    completed: false,
  },
  {
    userId: 1,
    id: '6',
    title: 'qui ullam ratione quibusdam voluptatem quia omnis',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quia explicabo alias harum officia porro, ab deserunt recusandae in, ut nulla magnam accusantium exercitationem, ullam cumque ea et. Recusandae temporibus nobis vitae dignissimos ab blanditiis corporis obcaecati necessitatibus explicabo quis facere commodi esse, numquam sequi possimus ex error quae mollitia.',
    status: 'done',
    completed: false,
  },
];

export const Column = (props: ColumnProps) => {
  const { title, status } = props;

  const filteredTasks = todos.filter((todo) => todo.status === status);

  return (
    <div className="grid grid-rows-[36px_1fr] gap-3 rounded-xl bg-accent pb-3 pl-6 pr-3 pt-6">
      <div className="flex items-center justify-between pr-3">
        <h2 className="font-semibold">{title}</h2>
        {status === 'to do' && <AddTaskDialog />}
      </div>
      <ul className="flex h-[667px] flex-col gap-6 overflow-y-auto scroll-smooth py-3 pr-3">
        {filteredTasks.map((todo) => (
          <Task key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
};
