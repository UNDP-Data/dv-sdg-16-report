import { cn } from '@undp/design-system-react/cn';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@undp/design-system-react/Tooltip';
import type { ReactNode } from 'react';

export default function InfoTooltip({
  content,
  trigger,
  color = 'primary',
}: {
  content: ReactNode;
  trigger?: string;
  color?: 'primary' | 'secondary' | 'tertiary';
}) {
  return (
    <TooltipProvider delayDuration={100} skipDelayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              'cursor-help border-none bg-transparent p-0 underline decoration-dotted underline-offset-4',
              color === 'primary' && 'text-primary decoration-primary',
              color === 'secondary' && 'text-secondary decoration-secondary',
              color === 'tertiary' && 'text-tertiary decoration-tertiary',
            )}
          >
            {trigger}
          </span>
        </TooltipTrigger>
        <TooltipContent className='max-w-xs text-left'>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
