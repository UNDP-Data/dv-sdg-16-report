import { cn } from '@undp/design-system-react/cn';
import { H2, P } from '@undp/design-system-react/Typography';
import type { ReactNode } from 'react';

interface BigNumberProps {
  value: string | number;
  suffix?: string;
  label: ReactNode;
  barPercent?: number;
  color?: string;
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
  const colorValue = `var(--${color})`;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div
        aria-hidden
        className={cn(
          'h-1 w-full overflow-hidden bg-content-reverse',
          percent === undefined && 'invisible',
        )}
      >
        <div
          className='h-full'
          style={{
            width: `${Math.min(100, Math.max(0, percent ?? 0))}%`,
            backgroundColor: colorValue,
          }}
        />
      </div>
      <H2
        weight='medium'
        marginBottom='none'
        className='pt-6 font-heading leading-xs'
        style={{ color: colorValue }}
      >
        {value}
        {suffix ? <span className='ml-0.5 text-2xl leading-xs md:text-3xl'>{suffix}</span> : null}
      </H2>
      <P marginBottom='xs' size='xl' className='mt-0.5 text-foreground'>
        {label}
      </P>
    </div>
  );
}
