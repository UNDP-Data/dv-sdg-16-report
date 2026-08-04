import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@undp/design-system-react/Tooltip';
import type { ReactNode } from 'react';

interface FootnoteProps {
  children: ReactNode;
  note: ReactNode;
  color?: string;
}

export default function Footnote({ children, note, color = '#42A1D8' }: FootnoteProps) {
  return (
    <TooltipProvider delayDuration={100} skipDelayDuration={0}>
      <Tooltip>
        <TooltipTrigger
          className='cursor-help border-none bg-transparent p-0 underline decoration-dotted underline-offset-4'
          style={{ font: 'inherit', color, textDecorationColor: color }}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent className='max-w-xs text-left'>{note}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
