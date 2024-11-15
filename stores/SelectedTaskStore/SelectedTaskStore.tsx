import { create } from 'zustand';

import { Task } from '@/types';

interface useSelectedTaskProps {
  task: Task | null;
  setTask: (task: Task | null) => void;
}

export const useSelectedTask = create<useSelectedTaskProps>((set) => ({
  task: null,
  setTask: (task: Task | null) => set({ task }),
}));
