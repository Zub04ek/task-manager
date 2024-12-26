'use client';

import { BadgeCheckIcon } from 'lucide-react';

interface FormSuccessProps {
  message?: string;
}

export const FormSuccessMessage = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="flex items-center space-x-4 rounded-lg bg-emerald-500/30 p-2 text-sm text-emerald-500">
      <BadgeCheckIcon className="h-5 w-5" />
      <p>{message}</p>
    </div>
  );
};
