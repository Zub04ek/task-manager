'use client';

import { BadgeAlertIcon } from 'lucide-react';

interface FormSuccessProps {
  message?: string;
}

export const FormErrorMessage = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="flex items-center space-x-4 rounded-lg bg-red-500/30 p-2 text-sm text-red-500">
      <BadgeAlertIcon className="h-5 w-5" />
      <p>{message}</p>
    </div>
  );
};
