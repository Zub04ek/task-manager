'use client';

import { FC, ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';

interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}
const Modal: FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent
        aria-describedby={description === undefined ? undefined : ''}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description !== undefined && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
export { Modal };
