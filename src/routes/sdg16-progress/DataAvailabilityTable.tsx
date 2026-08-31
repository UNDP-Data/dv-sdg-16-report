import { ColorLegend } from '@undp/data-viz/ColorLegend';
import { numberFormattingFunction } from '@undp/data-viz/utils';
import { cn } from '@undp/design-system-react/cn';
import { RadioGroup, RadioGroupItem } from '@undp/design-system-react/RadioGroup';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@undp/design-system-react/Tooltip';
import { P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import { CHART_PADDING } from '@/constants';
import dataAvailability from '@/data/sdg16-progress/data-availability.json';

const CHAPTER_ORDER = ['peace', 'justice', 'inclusion'];

export default function DataAvailabilityTable() {
  const [sortBy, setSortBy] = useState<'value' | 'chapter' | 'indicator'>('indicator');

  const rows =
    sortBy === 'indicator'
      ? dataAvailability
      : [...dataAvailability].sort((a, b) => {
          const chapterDiff =
            sortBy === 'chapter'
              ? CHAPTER_ORDER.indexOf(a.chapter) - CHAPTER_ORDER.indexOf(b.chapter)
              : 0;
          return chapterDiff || b.value - a.value;
        });
  return (
    <div className='flex flex-col gap-6' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8'>
        <div className='flex flex-col gap-3'>
          <P marginBottom='none' className='font-heading font-semibold leading-sm'>
            Countries with Goal 16 data for at least one year since 2015, by indicator
          </P>
          <ColorLegend
            colors={['var(--primary)', 'var(--secondary)', 'var(--tertiary)']}
            colorDomain={['Peace', 'Justice', 'Inclusion']}
            showNAColor={false}
            className='pb-0'
          />
        </div>
        <RadioGroup
          value={sortBy}
          onValueChange={(value) => setSortBy(value as 'value' | 'chapter' | 'indicator')}
          color='primary'
          className='flex shrink-0 flex-row items-center gap-4'
          aria-label='Sort indicators'
        >
          {' '}
          Sort
          <RadioGroupItem value='indicator' id='sort-by-indicator' label='by indicator number' />
          <RadioGroupItem value='value' id='sort-by-value' label='by value' />
          <RadioGroupItem value='chapter' id='sort-by-chapter' label='by dimension' />
        </RadioGroup>
      </div>

      <div className='grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8'>
        {rows.map((row) => (
          <div key={row.indicator} className='flex flex-col items-center gap-3'>
            <div
              className='mx-auto flex aspect-square w-full max-w-24 items-center justify-center rounded-full border border-stroke'
              aria-hidden='true'
            >
              <div
                className={cn(
                  'rounded-full',
                  row.chapter === 'peace' && 'bg-primary',
                  row.chapter === 'justice' && 'bg-secondary',
                  row.chapter === 'inclusion' && 'bg-accent-teal-hover',
                )}
                style={{
                  width: `${Math.sqrt(row.value / 100) * 100}%`,
                  height: `${Math.sqrt(row.value / 100) * 100}%`,
                }}
              />
            </div>
            <div className='flex flex-col items-center gap-1'>
              <TooltipProvider delayDuration={100} skipDelayDuration={0}>
                <Tooltip>
                  <TooltipTrigger className='cursor-help text-content-secondary text-xs underline decoration-dotted underline-offset-4'>
                    {row.indicator}
                  </TooltipTrigger>
                  <TooltipContent className='max-w-xs'>{row.description}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <P marginBottom='none' size='sm' className='text-foreground'>
                {numberFormattingFunction(row.value, undefined, 2, undefined, '%')}
              </P>
            </div>
          </div>
        ))}
      </div>

      <P marginBottom='none' size='sm' className='text-content-secondary'>
        Source: UNSD, Global SDG Indicator Database
      </P>
    </div>
  );
}
