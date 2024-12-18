import { Tag, Task as TaskType, User as UserType } from '@prisma/client';

export type Example = {
  example: boolean;
};

export type ColumnType = {
  id: string;
  title: string;
};

export type User = UserType;
// export type User = {
//   id: string;
//   email: string;
//   name: string;
//   tasks: Task[];
// };

export type Tags = {
  tags: Tag[];
};

export type Task = TaskType & Tags;
// export type Task = {
//   id: string;
//   title: string;
//   description: string;
//   tags: string;
//   priority: string;
//   status?: 'to do' | 'in progress' | 'done';
//   isFutured?: boolean;
//   isCompleted?: boolean;
//   createdAt?: string;
//   updatedAt?: string;
//   dateRange?: string;
//   author?: User;
//   authorId?: string;
//   comments?: Comment[];
// };

export type Comment = {
  id: string;
  comment: string;
  task: Task;
  taskId: string;
};

// export type TaskType = {
//   userId: number;
//   id: string;
//   title: string;
//   description: string;
//   status: string;
//   completed: boolean;
// };
