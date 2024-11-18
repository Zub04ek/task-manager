'use client';

import { TaskItem } from '@/components/TaskItem';
import { useTasksStore } from '@/stores/TasksStore';

interface TaskListProps {
  status: string;
}

export const TaskList = ({ status }: TaskListProps) => {
  const allTasks = useTasksStore((state) => state.tasks);
  const filteredTasks = allTasks.filter((todo) => todo.status === status);

  return (
    <ul className="flex flex-col gap-6 scroll-smooth py-3 pr-3 lg:max-h-[667px] lg:overflow-y-auto">
      {filteredTasks.map((todo) => (
        <TaskItem key={todo.id} task={todo} />
      ))}
    </ul>
  );
};
