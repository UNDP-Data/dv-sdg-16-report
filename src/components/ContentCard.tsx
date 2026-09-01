import { Card } from '@undp/design-system-react/Card';
import { cn } from '@undp/design-system-react/cn';
import type { ReactNode } from 'react';

interface ContentCardProps {
  children: ReactNode;
  onSelect?: () => void;
  className?: string;
}

export default function ContentCard({ children, onSelect, className }: ContentCardProps) {
  return (
    <Card
      border={false}
      variant='without-image'
      backgroundColor='transparent'
      role={onSelect ? 'button' : undefined}
      onClick={onSelect}
      className={cn(
        'group h-full min-h-96 cursor-pointer justify-start gap-4 border border-stroke-sm p-8 text-left transition-colors hover:bg-background-soft',
        className,
      )}
    >
      {children}
    </Card>
  );
}
