import { create } from 'zustand';

import { Task } from '@prisma/client';

interface useTasksProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export const useTasksStore = create<useTasksProps>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
}));
