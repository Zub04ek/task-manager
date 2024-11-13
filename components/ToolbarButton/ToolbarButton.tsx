import { ComponentPropsWithoutRef } from 'react';

import {
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import type { TooltipContentProps } from '@radix-ui/react-tooltip';

interface ToolbarButtonProps extends ComponentPropsWithoutRef<typeof Toggle> {
  isActive?: boolean;
  tooltip?: string;
  tooltipOptions?: TooltipContentProps;
}

export const ToolbarButton = ({
  isActive,
  children,
  tooltip,
  className,
  tooltipOptions,
  ...props
}: ToolbarButtonProps) => {
  const toggleButton = (
    <Toggle
      size="sm"
      //   ref={ref}
      className={cn('size-8 p-0', { 'bg-accent': isActive }, className)}
      {...props}
    >
      {children}
    </Toggle>
  );

  if (!tooltip) {
    return toggleButton;
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{toggleButton}</TooltipTrigger>
        <TooltipContent {...tooltipOptions}>
          <div className="">{tooltip}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};