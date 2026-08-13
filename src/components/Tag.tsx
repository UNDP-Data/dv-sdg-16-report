import { cn } from '@undp/design-system-react/cn';
import { P } from '@undp/design-system-react/Typography';

export default function Tag({
  color,
  content,
}: {
  color: 'primary' | 'secondary' | 'tertiary';
  content: string;
}) {
  return (
    <P
      size='sm'
      weight='semibold'
      className={cn(
        'uppercase tracking-wider',
        color === 'primary' && 'text-primary',
        color === 'secondary' && 'text-secondary',
        color === 'tertiary' && 'text-tertiary',
      )}
      marginBottom='none'
    >
      {content}
    </P>
  );
}
