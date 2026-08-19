import { cn } from '@undp/design-system-react/cn';
import { H2, P } from '@undp/design-system-react/Typography';
import type { ReactNode } from 'react';

interface BigNumberProps {
  value: string | number;
  suffix?: string;
  label: ReactNode;
  barPercent?: number;
  color?: 'primary' | 'secondary' | 'tertiary' | 'foreground';
  className?: string;
}

export default function BigNumber({
  value,
  suffix,
  label,
  barPercent,
  color = 'primary',
  className,
}: BigNumberProps) {
  const percent = barPercent ?? (suffix === '%' && typeof value === 'number' ? value : undefined);

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {percent !== undefined ? (
        <div className='h-[0.2rem] w-full overflow-hidden bg-stroke-sm'>
          <div
            className={cn(
              'h-full',
              color === 'primary' && 'bg-primary',
              color === 'secondary' && 'bg-secondary',
              color === 'tertiary' && 'bg-tertiary',
              color === 'foreground' && 'bg-foreground',
            )}
            style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
          />
        </div>
      ) : null}
      <H2
        weight='medium'
        marginBottom='none'
        className={cn(
          'pt-12 font-heading leading-none',
          color === 'primary' && 'text-primary',
          color === 'secondary' && 'text-secondary',
          color === 'tertiary' && 'text-tertiary',
          color === 'foreground' && 'text-foreground',
        )}
      >
        {value}
        {suffix ? <span className='ml-0.5 text-2xl md:text-3xl'>{suffix}</span> : null}
      </H2>
      <P marginBottom='none' size='base' className='text-foreground'>
        {label}
      </P>
    </div>
  );
}
