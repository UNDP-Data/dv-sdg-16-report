import { useQuery } from '@tanstack/react-query';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { StripChart } from '@undp/data-viz/StripChart';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { numberFormattingFunction } from '@undp/data-viz/utils';
import { Button } from '@undp/design-system-react/Button';
import { SegmentedControl } from '@undp/design-system-react/SegmentedControl';
import { Spinner } from '@undp/design-system-react/Spinner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@undp/design-system-react/Tooltip';
import { P } from '@undp/design-system-react/Typography';
import { Info } from 'lucide-react';
import { useState } from 'react';
import ErrorEl from '@/components/ErrorEl';
import ChartNote from '../../components/ChartNote';

function useData() {
  return useQuery({
    queryKey: ['business-bribery-by-country'],
    queryFn: () =>
      fetchAndParseJSON('/data/report/03-justice/16-5-2/business-bribery-by-country.json'),
  });
}

export default function BusinessBriberyStripChart() {
  const [selectedGrouping, setSelectedGrouping] = useState<'region' | 'incomeGroup'>('region');
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <ErrorEl />;

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='flex w-full justify-center bg-white p-4'>
        <SegmentedControl
          className='w-fit'
          classNames={{ items: 'cursor-pointer' }}
          value={selectedGrouping}
          onValueChange={(value) => setSelectedGrouping(value as 'region' | 'incomeGroup')}
          color='foreground'
          variant='light'
          size='sm'
          options={[
            { value: 'region', label: 'Regions' },
            { value: 'incomeGroup', label: 'Income groups' },
          ]}
        />
      </div>

      <div className='flex flex-col gap-4' style={{ padding: '20px 40px 36px 40px' }}>
        <div className='flex flex-col gap-1'>
          <P marginBottom='none' className='font-heading font-semibold leading-sm'>
            Bribery incidence, the proportion of firms experiencing at least one bribe payment
            request, by region and income level
          </P>
          <P marginBottom='none' size='sm' className='text-content-secondary'>
            2024 or latest year available since 2016
          </P>
        </div>

        <div className='flex items-center gap-4'>
          <span aria-hidden='true' className='h-4 w-4 rounded-full bg-blue-500 opacity-40' />
          <P marginBottom='none' size='sm'>
            Each dot is a country
          </P>
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
                  The line marks the median prevalence across countries — the middle value, with
                  half of observations above and half below it.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <StripChart
          data={transformDataForGraph(data, 'stripChart', [
            { columnId: 'country', chartConfigId: 'label' },
            { columnId: 'value', chartConfigId: 'position' },
            { columnId: selectedGrouping, chartConfigId: 'group' },
          ])}
          groupOrder={
            selectedGrouping === 'region'
              ? [
                  'Europe and Northern America',
                  'Northern Africa and Western Asia',
                  'Latin America and the Caribbean',
                  'Oceania',
                  'Central and Southern Asia',
                  'Eastern and South-Eastern Asia',
                  'Sub-Saharan Africa',
                ]
              : ['High income', 'Upper-middle income', 'Lower-middle income', 'Low income']
          }
          orientation='horizontal'
          stripType='dot'
          colors={['var(--blue-400)']}
          dimmedOpacity={0.1}
          leftMargin={innerWidth < 720 ? 135 : 220}
          truncateBy={innerWidth < 720 ? 16 : undefined}
          topMargin={32}
          noOfTicks={5}
          animate
          showGroups
          distributionMarkers={[
            { type: 'median', color: 'black', strokeWidth: 1.5, relativeMarkerLength: 0.5 },
          ]}
          radius={5}
          dotOpacity={0.4}
          minValue={0}
          maxValue={60}
          height={selectedGrouping === 'region' ? 400 : 260}
          padding='0'
          numberDisplayOptions={{ suffix: '%' }}
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
                  {d.label} ({d.data.year})
                </P>
                <P size='sm' marginBottom='none' weight='bold' className='text-blue-500'>
                  {numberFormattingFunction(d.position)}%
                </P>
              </div>
            </div>
          )}
          sources={[{ source: 'World Bank Enterprise Surveys' }]}
          footNote={
            <ChartNote content='For this analysis, countries are classified according to the income group they belonged to at the time of their latest available data point.' />
          }
          ariaLabel='Strip chart showing the proportion of firms experiencing at least one bribe payment request, with each dot representing a country and a black bar marking the median. Sub-Saharan Africa and Eastern and South-Eastern Asia record the highest median levels and Europe and Northern America the lowest.'
        />
      </div>
    </div>
  );
}
