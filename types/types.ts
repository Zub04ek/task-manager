export type Example = {
  example: boolean;
};

export type Task = {
  userId: number;
  id: number;
  title: string;
  description: string;
  tag?: string;
  priority?: string;
  createdAt?: string;
  updatedAt?: string;
  dueDate?: string;
  status?: string;
  isPlanned?: string;
  isCompleted?: boolean;
  coments?: {
    commentDate: string;
    comment: string;
  }[];
};
