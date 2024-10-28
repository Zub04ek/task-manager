'use client';

import { useState } from 'react';

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

interface OptionsDropdownProps {
  task: Task;
}

export const OptionsDropdown = ({ task }: OptionsDropdownProps) => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const taskModal = useModalStore();
  const setSelectedTask = useSelectedTask((state) => state.setTask);

  return (
    <DropdownMenu
      open={isDropdownMenuOpen}
      onOpenChange={setIsDropdownMenuOpen}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute right-2 top-2">
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
            // setIsDeleteDialogOpen(true);
            setIsDropdownMenuOpen(false);
          }}
        >
          <TrashIcon className="text-destructive" />
          <span className="text-destructive">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
