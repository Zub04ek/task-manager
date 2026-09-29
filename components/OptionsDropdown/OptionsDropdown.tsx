'use client';

import { useState } from 'react';

import { useDeleteTask, useUpdateTask } from '@/app/api/hooks/task';
import { AlertModal } from '@/components/AlertModal';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui';
import { useToast } from '@/hooks';
import { useModalStore, useSelectedTask, useTasksStore } from '@/stores';
import { Task } from '@/types';
import {
  DotsHorizontalIcon,
  Pencil2Icon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { useQueryClient } from '@tanstack/react-query';

interface OptionsDropdownProps {
  task: Task;
}

export const OptionsDropdown = ({ task }: OptionsDropdownProps) => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const taskModal = useModalStore();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const setSelectedTask = useSelectedTask((state) => state.setTask);
  const allTasks = useTasksStore((state) => state.tasks);
  const { mutate: deleteTaskMutate } = useDeleteTask({
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({ description: 'Task deleted successfully!' });
    },
  });
  const { mutate: updateTaskMutate } = useUpdateTask();
  const mutateOptions = {
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  };

  const onDeleteTask = (taskId: string) => {
    deleteTaskMutate(taskId);
    setIsAlertModalOpen(false);
    allTasks
      .filter((item) => item.status === task.status && item.id !== task.id)
      .sort((a, b) => a.sequence - b.sequence)
      .forEach((task, index) => {
        if (task.sequence !== index) {
          updateTaskMutate({ id: task.id, sequence: index }, mutateOptions);
          console.log('mutate in delete');
        }
        return task;
      });
    // try {
    //   setLoading(true);
    //   const res = await axios.delete(`/api/tasks/${taskId}`);
    //   if (res.data.error) {
    //     toast({
    //       variant: 'destructive',
    //       title: 'Uh oh! Something went wrong.',
    //       description: res.data.error,
    //     });
    //   } else {
    //     console.log('res.data :>> ', res.data);
    //     console.log('Task deleted successfully');
    //     toast({ description: 'Task is deleted successfully' });
    //   }
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     toast({
    //       variant: 'destructive',
    //       title: 'Uh oh! Something went wrong.',
    //       description: error.message,
    //     });
    //   } else if (error instanceof Error) {
    //     toast({
    //       variant: 'destructive',
    //       title: 'Uh oh! Something went wrong.',
    //       description: error.message,
    //     });
    //   }
    // } finally {
    //   setLoading(false);
    //   setIsAlertModalOpen(false);
    // }
  };

  return (
    <>
      <AlertModal
        open={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        // disabled={loading}
        onConfirm={() => onDeleteTask(task.id)}
      />
      <DropdownMenu
        open={isDropdownMenuOpen}
        onOpenChange={setIsDropdownMenuOpen}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
          >
            <DotsHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer gap-2"
            onClick={() => {
              setSelectedTask(task);
              taskModal.onOpen();
              setIsDropdownMenuOpen(false);
            }}
          >
            <Pencil2Icon /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer gap-2"
            onClick={() => {
              setIsAlertModalOpen(true);
              setIsDropdownMenuOpen(false);
            }}
          >
            <TrashIcon className="text-destructive" />
            <span className="text-destructive">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
