'use client';

import { useTasksStore } from '@/stores/TasksStore';

import { TaskItem } from './task-item';

interface TaskListProps {
  status: string;
}

export const TaskList = ({ status }: TaskListProps) => {
  const allTasks = useTasksStore((state) => state.tasks);
  const filteredTasks = allTasks.filter((todo) => todo.status === status);

  return (
    <ul className="flex h-[667px] flex-col gap-6 overflow-y-auto scroll-smooth py-3 pr-3">
      {filteredTasks.map((todo) => (
        <TaskItem key={todo.id} task={todo} />
      ))}
    </ul>
  );
};
