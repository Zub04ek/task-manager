import { FC } from 'react';

import { Modal } from '../Modal';
import { Button } from '../ui';

interface AlertModalProps {
  disabled?: boolean;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const AlertModal: FC<AlertModalProps> = ({
  disabled,
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      title="Are you sure to delete?"
      description="This action can not be undone! This will permanently delete your task
            and remove your data from our servers."
      isOpen={open}
      onClose={onClose}
    >
      <div className="flex items-center justify-end gap-x-2">
        <Button onClick={onClose} disabled={disabled} variant="outline">
          Cancel
        </Button>
        <Button onClick={onConfirm} disabled={disabled} variant="destructive">
          Delete
        </Button>
      </div>
    </Modal>
  );
};
