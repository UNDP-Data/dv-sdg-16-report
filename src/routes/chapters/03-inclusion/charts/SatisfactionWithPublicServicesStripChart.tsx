import { useQuery } from '@tanstack/react-query';
import { fetchAndParseCSV } from '@undp/data-viz/fetchAndParseData';
import { StripChart } from '@undp/data-viz/StripChart';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { numberFormattingFunction } from '@undp/data-viz/utils';
import { Button } from '@undp/design-system-react/Button';
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

interface SatisfactionRow {
  GeoAreaName: string;
  Category: string;
  Value: number;
}

function useSatisfactionWithPublicServicesData() {
  return useQuery({
    queryKey: ['satisfaction-public-services-16-6-2'],
    queryFn: () =>
      fetchAndParseCSV(
        '/data/chapters/03-inclusion/16-6-2/satisfaction-with-public-services.csv',
      ) as Promise<SatisfactionRow[]>,
  });
}

export default function SatisfactionWithPublicServicesStripChart() {
  const { data: rows, isLoading, isError } = useSatisfactionWithPublicServicesData();

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
          Distribution of satisfaction with public services across countries
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          2025 or latest year available
        </P>
      </div>

      <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
        <div className='flex items-center gap-1.5'>
          <div className='flex items-center' aria-hidden='true'>
            <span
              className='h-4 w-4 rounded-full border border-background-soft'
              style={{ backgroundColor: 'var(--primary)' }}
            />
            <span
              className='-ml-2 h-4 w-4 rounded-full border border-background-soft'
              style={{ backgroundColor: 'var(--tertiary)' }}
            />
            <span
              className='-ml-2 h-4 w-4 rounded-full border border-background-soft'
              style={{ backgroundColor: 'var(--violet-600)' }}
            />
            <span
              className='-ml-2 h-4 w-4 rounded-full border border-background-soft'
              style={{ backgroundColor: 'var(--quaternary)' }}
            />
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

      <StripChart
        data={transformDataForGraph(rows ?? [], 'stripChart', [
          { columnId: 'GeoAreaName', chartConfigId: 'label' },
          { columnId: 'Category', chartConfigId: 'group' },
          { columnId: 'Value', chartConfigId: 'position' },
          { columnId: 'Category', chartConfigId: 'color' },
        ])}
        orientation='horizontal'
        stripType='dot'
        showGroups
        groupOrder={[
          'Government services',
          'Healthcare',
          'Primary education',
          'Secondary education',
        ]}
        colorDomain={[
          'Government services',
          'Healthcare',
          'Primary education',
          'Secondary education',
        ]}
        colors={['var(--primary)', 'var(--tertiary)', 'var(--violet-600)', 'var(--quaternary)']}
        showColorScale={false}
        distributionMarkers={[
          { type: 'median', color: 'black', strokeWidth: 1.5, relativeMarkerLength: 0.5 },
        ]}
        animate
        radius={5}
        dotOpacity={0.4}
        minValue={0}
        maxValue={100}
        noOfTicks={5}
        height={300}
        truncateBy={innerWidth < 720 ? 16 : undefined}
        leftMargin={innerWidth < 720 ? 120 : 160}
        rightMargin={10}
        topMargin={32}
        bottomMargin={20}
        dimmedOpacity={0.1}
        numberDisplayOptions={{ suffix: '%' }}
        backgroundColor={false}
        padding='0'
        styles={{
          tooltip: { padding: 0 },
          xAxis: { labels: { transform: 'translateY(-32px)' } },
        }}
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
              <P size='sm' marginBottom='none'>
                <span className='font-bold'>{numberFormattingFunction(d.position)}%</span>
              </P>
            </div>
          </div>
        )}
        ariaLabel='Strip chart showing the distribution of satisfaction with public services across countries, grouped by service. Each dot is a country and a line marks the median of each group.'
      />

      <div className='flex flex-col gap-1'>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          Source: UNDP, Gallup World Poll
        </P>
        <ChartNote content='Estimates are based on the latest available survey data between 2015 and 2025 for 148 countries (health services), 12 countries (primary education services), 44 countries (secondary education services) and 46 countries (government services). Education and government services are primarily based on data from high and middle-income countries. The line within each box indicates the median level of satisfaction, the X indicates the average, while the box shows the values for the middle 50 per cent of countries. Whiskers extend to the lowest and highest values observed with circles showing outliers. The spread of each boxplot highlights the extent of variation across countries, with wider ranges reflecting more uneven service delivery outcomes.' />
      </div>
    </div>
  );
}
