import { useQuery } from '@tanstack/react-query';
import { ColorLegend } from '@undp/data-viz/ColorLegend';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { numberFormattingFunction } from '@undp/data-viz/utils';
import { cn } from '@undp/design-system-react/cn';
import { Spinner } from '@undp/design-system-react/Spinner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@undp/design-system-react/Tooltip';
import { P } from '@undp/design-system-react/Typography';
import ErrorEl from '@/components/ErrorEl';
import { CHART_PADDING } from '@/constants';

const CHAPTER_ORDER = ['peace', 'justice', 'inclusion'];

interface DataType {
  indicator: string;
  description: string;
  value: number;
  chapter: string;
}

function useData() {
  return useQuery({
    queryKey: ['sdg-16-progress-data-availability'],
    queryFn: () =>
      fetchAndParseJSON('/data/report/05-sdg-16-progress/data-availability.json') as Promise<
        DataType[]
      >,
  });
}

export default function DataAvailabilityTable() {
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <ErrorEl />;

  const rows = [...(data || [])].sort(
    (a, b) =>
      CHAPTER_ORDER.indexOf(a.chapter) - CHAPTER_ORDER.indexOf(b.chapter) || b.value - a.value,
  );
  return (
    <div className='flex flex-col gap-6' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-3'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Countries with Goal 16 data for at least one year since 2015, by indicator
        </P>
        <ColorLegend
          colorLegendTitle='Chapters'
          colors={['var(--primary)', 'var(--secondary)', 'var(--tertiary)']}
          colorDomain={['Peace', 'Justice', 'Inclusion']}
          showNAColor={false}
          className='pb-0'
        />
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
                {numberFormattingFunction(row.value, undefined, 1, undefined, '%')}
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
