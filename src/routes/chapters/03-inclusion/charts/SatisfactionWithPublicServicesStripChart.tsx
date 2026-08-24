import { useQueries } from '@tanstack/react-query';
import { fetchAndParseCSV } from '@undp/data-viz/fetchAndParseData';
import { StripChart } from '@undp/data-viz/StripChart';
import { getMedian, numberFormattingFunction } from '@undp/data-viz/utils';
import { Button } from '@undp/design-system-react/Button';
import { cn } from '@undp/design-system-react/cn';
import { Spinner } from '@undp/design-system-react/Spinner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@undp/design-system-react/Tooltip';
import { P } from '@undp/design-system-react/Typography';
import { Info } from 'lucide-react';
import { CHART_PADDING } from '@/constants';
import ChartNote from '../../components/ChartNote';

interface CountryValueRow {
  GeoAreaName: string;
  Value: number;
}

const CATEGORIES = [
  {
    key: 'services',
    label: 'Government services',
    file: 'services.csv',
    color: 'var(--primary)',
  },
  { key: 'healthcare', label: 'Healthcare', file: 'healthcare.csv', color: 'var(--tertiary)' },
  {
    key: 'primary',
    label: 'Primary education',
    file: 'primary.csv',
    color: 'var(--deep-blue)',
  },
  {
    key: 'secondary',
    label: 'Secondary education',
    file: 'secondary.csv',
    color: 'var(--quaternary)',
  },
] as const;

export default function SatisfactionWithPublicServicesStripChart() {
  const queries = useQueries({
    queries: CATEGORIES.map((category) => ({
      queryKey: ['satisfaction-public-services-16-6-2', category.file],
      queryFn: () =>
        fetchAndParseCSV(`/data/chapters/03-inclusion/16-6-2/${category.file}`) as Promise<
          CountryValueRow[]
        >,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError) || queries.some((q) => !q.data);

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) {
    return (
      <P marginBottom='none' size='sm' className='text-content-secondary'>
        Unable to load the underlying data for this chart.
      </P>
    );
  }

  return (
    <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Distribution of satisfaction with public services across countries for quality of
          healthcare, primary education, secondary education and government services
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          2025 or latest year available
        </P>
      </div>

      <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
        <div className='flex items-center gap-1.5'>
          <div className='flex items-center' aria-hidden='true'>
            {CATEGORIES.map((category, i) => (
              <span
                key={category.key}
                className='h-4 w-4 rounded-full border border-background-soft'
                style={{ backgroundColor: category.color, marginLeft: i === 0 ? 0 : '-8px' }}
              />
            ))}
          </div>
          <P marginBottom='none' size='sm'>
            Each dot is a country
          </P>
        </div>
        <div className='flex items-center gap-1.5'>
          <span
            aria-hidden='true'
            className='h-3 w-0.5 shrink-0 rounded-full'
            style={{ backgroundColor: 'black' }}
          />
          <P marginBottom='none' size='sm'>
            Median
          </P>
          <TooltipProvider delayDuration={100} skipDelayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='icon'
                  type='button'
                  className='p-0 text-content-secondary'
                  aria-label='What does the median line show?'
                >
                  <Info size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className='max-w-xs text-left'>
                The line marks the median satisfaction across countries — the middle value, with
                half of observations above and half below it.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className='flex flex-col'>
        {CATEGORIES.map((category, index) => {
          const rows = (queries[index].data ?? []) as CountryValueRow[];
          const values = rows.map((d) => d.Value);
          const median = getMedian(values);
          const medianPercent = Number.isFinite(median)
            ? `${Math.min(Math.max(median, 0), 100)}%`
            : undefined;
          const customLayers = medianPercent
            ? [
                {
                  position: 'before' as const,
                  layer: (
                    <g key='median'>
                      <line
                        x1={medianPercent}
                        x2={medianPercent}
                        y1={0}
                        y2={24}
                        stroke='black'
                        strokeWidth={1.5}
                      />
                      <text x={medianPercent} y={-6} textAnchor='middle' fontSize={12} fill='black'>
                        {numberFormattingFunction(median, undefined, 0)}% satisfied
                      </text>
                    </g>
                  ),
                },
              ]
            : [];

          return (
            <div
              key={category.key}
              className={cn(
                'grid grid-cols-1 items-center gap-2 py-3 sm:grid-cols-[140px_1fr]',
                index > 0 && 'border-stroke-xs border-t',
              )}
            >
              <P marginBottom='none' size='sm' className='font-heading font-semibold'>
                {category.label}
              </P>
              <StripChart
                data={rows.map((d) => ({
                  label: d.GeoAreaName,
                  position: d.Value,
                }))}
                orientation='horizontal'
                stripType='dot'
                colors={[category.color]}
                animate
                radius={5}
                dotOpacity={0.4}
                minValue={0}
                maxValue={100}
                noOfTicks={5}
                height={64}
                topMargin={20}
                leftMargin={4}
                rightMargin={4}
                styles={{ tooltip: { padding: 0 } }}
                bottomMargin={20}
                numberDisplayOptions={{ suffix: '%' }}
                backgroundColor={false}
                padding='0'
                classNames={
                  index === CATEGORIES.length - 1 ? undefined : { xAxis: { labels: 'hidden' } }
                }
                customLayers={customLayers}
                tooltip={(d) => (
                  <div className='flex flex-col gap-1 bg-white px-2 py-1'>
                    <div className='flex gap-1'>
                      <P
                        size='sm'
                        marginBottom='none'
                        className='mr-1 border-content-reverse border-r pr-2'
                      >
                        {d.label}
                      </P>
                      <P size='sm' marginBottom='none' style={{ color: category.color }}>
                        <span className='font-bold'>{numberFormattingFunction(d.position)}%</span>
                      </P>
                    </div>
                  </div>
                )}
                ariaLabel={`Strip chart showing the distribution of satisfaction with ${category.label.toLowerCase()} across countries. The median is ${numberFormattingFunction(median, undefined, 0)}%.`}
              />
            </div>
          );
        })}
      </div>

      <div className='flex flex-col gap-1'>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          Source: UNDP, Gallup World Poll
        </P>
        <ChartNote content='Estimates are based on the latest available survey data between 2015 and 2025 for 148 countries (health services), 12 countries (primary education services), 44 countries (secondary education services) and 46 countries (government services). Education and government services are primarily based on data from high and middle-income countries.' />
      </div>
    </div>
  );
}
