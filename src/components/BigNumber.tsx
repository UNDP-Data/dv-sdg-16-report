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
  const resolvedColor = `var(--${color})`;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {percent !== undefined ? (
        <div className='h-[0.2rem] w-full overflow-hidden bg-stroke-sm'>
          <div
            className='h-full'
            style={{
              width: `${Math.min(100, Math.max(0, percent))}%`,
              backgroundColor: resolvedColor,
            }}
          />
        </div>
      ) : null}
      <H2
        weight='medium'
        marginBottom='none'
        className='pt-12 font-heading leading-none'
        style={{ color: resolvedColor }}
      >
        {value}
        {suffix ? <span className='ml-0.5 text-2xl md:text-3xl'>{suffix}</span> : null}
      </H2>
      <P marginBottom='xs' size='xl' className={cn(suffix ? 'mt-0.5' : 'mt-5', 'text-foreground')}>
        {label}
      </P>
    </div>
  );
}
