import { cn } from '@undp/design-system-react/cn';
import { H5 } from '@undp/design-system-react/Typography';
import type { ReactNode } from 'react';
import type { SectionColorType } from '@/types';

interface HighlightProps {
  color?: SectionColorType;
  className?: string;
  content: ReactNode;
}

export default function Highlight({ color = 'primary', className = '', content }: HighlightProps) {
  return (
    <H5
      weight='medium'
      className={cn(
        `my-2 border-l-4 py-1 pl-6 font-heading text-foreground leading-snug`,
        color === 'primary' && 'border-primary',
        color === 'secondary' && 'border-secondary',
        color === 'tertiary' && 'border-tertiary',
        color === 'default' && 'text-blue-500',
        className,
      )}
      style={{ borderColor: color }}
    >
      {content}
    </H5>
  );
}
