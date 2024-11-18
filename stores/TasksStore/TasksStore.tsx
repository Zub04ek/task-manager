import { create } from 'zustand';

import { Task } from '@/types';

interface useTasksProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export const useTasksStore = create<useTasksProps>((set) => ({
  tasks: [],
  setTasks: (tasks: Task[]) => set({ tasks }),
}));
