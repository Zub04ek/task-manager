import { create } from 'zustand';

// import { TaskForm } from '@/types';
// import { Task } from '@prisma/client';

export type TaskForm = {
  id: string;
  title: string;
  description: string;
  tags: string;
  priority: string;
};

export type Status = 'to do' | 'in progress' | 'done';

export type State = {
  tasks: TaskForm[];
};

export type Actions = {
  addTask: (
    id: string,
    title: string,
    description: string,
    tags: string,
    priority: string
  ) => void;
  updateTask: (id: string, status: Status) => void;
  removeTask: (id: string) => void;
};

export const useTaskStore = create<State & Actions>()((set) => ({
  tasks: [],
  addTask: (
    title: string,
    description: string,
    tags: string,
    priority: string
  ) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { id: 'lnvldnvf', title, description, tags, priority },
      ],
    })),
  updateTask: (id: string, status: Status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      ),
    })),
  removeTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));
