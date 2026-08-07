import { cn } from '@undp/design-system-react/cn';
import type { ReactNode } from 'react';

interface HighlightProps {
  color?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  content: ReactNode;
}

export default function Highlight({ color = 'primary', className = '', content }: HighlightProps) {
  return (
    <blockquote
      className={cn(
        `my-2 border-l-4 py-1 pl-6 font-heading font-normal text-2xl text-foreground leading-snug md:text-3xl`,
        color === 'primary' && 'border-primary',
        color === 'secondary' && 'border-secondary',
        color === 'tertiary' && 'border-tertiary',
        className,
      )}
      style={{ borderColor: color }}
    >
      {content}
    </blockquote>
  );
}
