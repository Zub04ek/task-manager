'use client';

import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { PlusIcon } from '@radix-ui/react-icons';

import { AddTaskForm } from '../AddTaskForm';

export function AddTaskDialog() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-background">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add a new task</DialogTitle>
        </DialogHeader>
        <AddTaskForm closeOnSubmit={() => setOpenDialog(false)} />
      </DialogContent>
    </Dialog>
  );
}
