export type Example = {
  example: boolean;
};

export type User = {
  id: string;
  email: string;
  name: string;
  tasks: Task[];
};

export type Task = {
  id: string;
  title: string;
  description: string;
  tags?: string;
  priority?: string;
  status?: string;
  isFutured?: boolean;
  isCompleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  dateRange?: string;
  author?: User;
  authorId?: string;
  comments?: Comment[];
};

export type Comment = {
  id: string;
  comment: string;
  task: Task;
  taskId: string;
};
