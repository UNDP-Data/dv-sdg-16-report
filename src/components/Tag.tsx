import { cn } from '@undp/design-system-react/cn';
import { P } from '@undp/design-system-react/Typography';
import type { SectionColorType } from '@/types';

export default function Tag({ color, content }: { color: SectionColorType; content: string }) {
  return (
    <P
      size='sm'
      weight='semibold'
      className={cn(
        'uppercase tracking-wider',
        color === 'primary' && 'text-primary',
        color === 'secondary' && 'text-secondary',
        color === 'tertiary' && 'text-tertiary',
        color === 'default' && 'text-accent-teal',
      )}
      marginBottom='none'
    >
      {content}
    </P>
  );
}
