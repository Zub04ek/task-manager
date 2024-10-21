'use client';

import { Dispatch, SetStateAction } from 'react';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';

interface DeleteTaskDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  closeDialog: () => void;
}

export function DeleteTaskDialog({
  open,
  onOpenChange,
  closeDialog,
}: DeleteTaskDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete task?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your task
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={closeDialog}>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
