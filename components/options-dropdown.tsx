'use client';

import { useState } from 'react';
import axios from 'axios';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui';
import { useModalStore } from '@/stores';
import { useSelectedTask } from '@/stores/SelectedTaskStore';
import { Task } from '@prisma/client';
import {
  DotsHorizontalIcon,
  Pencil2Icon,
  TrashIcon,
} from '@radix-ui/react-icons';

import { AlertModal } from './alert-modal';

interface OptionsDropdownProps {
  task: Task;
}

export const OptionsDropdown = ({ task }: OptionsDropdownProps) => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const taskModal = useModalStore();
  const setSelectedTask = useSelectedTask((state) => state.setTask);

  const onDeleteTask = async (taskId: string) => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/tasks/${taskId}`);
      if (res.data.error) {
        console.log('err :>> ', res.data.error);
      } else {
        console.log('res.data :>> ', res.data);
        console.log('Task deleted successfully');
        //   toast.success("Todo Deleted")
        // refetch all tasks
      }
    } catch (error) {
      console.log('error :>> ', error);
      //   toast.error("Something Went Wrong")
    } finally {
      setLoading(false);
      setIsAlertModalOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        open={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        disabled={loading}
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
            className="gap-2"
            onClick={() => {
              setSelectedTask(task);
              taskModal.onOpen();
              setIsDropdownMenuOpen(false);
            }}
          >
            <Pencil2Icon /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2"
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
