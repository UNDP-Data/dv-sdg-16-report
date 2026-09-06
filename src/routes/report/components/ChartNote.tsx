import { cn } from '@undp/design-system-react/cn';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@undp/design-system-react/Tooltip';
import { P } from '@undp/design-system-react/Typography';
import type { ReactNode } from 'react';

export default function ChartNote({ content }: { content: ReactNode }) {
  return (
    <TooltipProvider delayDuration={100} skipDelayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type='button'
            aria-label='More information about this data'
            className={cn(
              'cursor-help border-none p-0 text-left',
              'underline decoration-dotted underline-offset-4',
            )}
          >
            <P marginBottom='none' size='sm' className='text-content-secondary'>
              Learn more about data
            </P>
          </button>
        </TooltipTrigger>
        <TooltipContent className='max-w-xs text-left'>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
