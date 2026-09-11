import { useQuery } from '@tanstack/react-query';
import { StackedBarGraph } from '@undp/data-viz/BarGraph';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { numberFormattingFunction } from '@undp/data-viz/utils';
import { RadioGroup, RadioGroupItem } from '@undp/design-system-react/RadioGroup';
import { Spinner } from '@undp/design-system-react/Spinner';
import { P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import ErrorEl from '@/components/ErrorEl';
import { CHART_PADDING } from '@/constants';

function useData() {
  return useQuery({
    queryKey: ['detainees-by-sentencing-status'],
    queryFn: () =>
      fetchAndParseJSON('/data/report/03-justice/16-3-2/detainees-by-sentencing-status.json'),
  });
}

export default function DetaineesBySentencingStatusBarChart() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <ErrorEl />;

  return (
    <div className='flex flex-col gap-4' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' weight='semibold' className='font-heading leading-sm'>
          Number of sentenced and unsentenced detainees, by region
        </P>
      </div>

      <div>
        <P size='sm' marginBottom='none'>
          Select year
        </P>
        <RadioGroup
          value={selectedYear}
          onValueChange={(value) => setSelectedYear(value)}
          color='blue'
        >
          <RadioGroupItem value='2024' label='2024' />
          <RadioGroupItem value='2015' label='2015' />
        </RadioGroup>
      </div>

      <StackedBarGraph
        data={transformDataForGraph(
          data.filter((d: { year: number }) => `${d.year}` === selectedYear),
          'stackedBarChart',
          [
            { columnId: 'region', chartConfigId: 'label' },
            { columnId: ['unsentenced', 'sentenced'], chartConfigId: 'size' },
          ],
        )}
        colorDomain={['Unsentenced detainees', 'Sentenced detainees']}
        colors={['var(--blue-500)', 'var(--gray-400)']}
        orientation='horizontal'
        animate
        showTotalValue
        showValues={false}
        showTicks={false}
        maxBarThickness={32}
        height={360}
        leftMargin={innerWidth < 720 ? 135 : 220}
        truncateBy={innerWidth < 720 ? 16 : undefined}
        topMargin={0}
        padding='0'
        numberDisplayOptions={{ precision: 1 }}
        styles={{ tooltip: { padding: 0 } }}
        tooltip={(d) => (
          <div className='flex flex-col gap-1 bg-white px-2 py-1'>
            <P size='sm' marginBottom='none' weight='bold'>
              {d.label} ({d.data.year})
            </P>
            <P size='sm' marginBottom='none'>
              Unsentenced:{' '}
              <span className='font-bold text-blue-500'>
                {numberFormattingFunction(d.data.unsentenced, undefined, 1)}
              </span>{' '}
              <span className='font-bold text-blue-500'>
                (
                {numberFormattingFunction(
                  (d.data.unsentenced / (d.data.unsentenced + d.data.sentenced)) * 100,
                  undefined,
                  1,
                )}
                %)
              </span>
            </P>
            <P size='sm' marginBottom='none'>
              Sentenced:{' '}
              <span className='font-bold text-content-quaternary'>
                {numberFormattingFunction(d.data.sentenced, undefined, 1)}
              </span>
            </P>
            <P size='sm' marginBottom='none' className='text-content-secondary'>
              Total: {numberFormattingFunction(d.data.unsentenced + d.data.sentenced, undefined, 1)}
            </P>
          </div>
        )}
        sources={[
          {
            source:
              'UNODC estimates, based on responses to the United Nations Survey of Crime Trends and Operations of Criminal Justice Systems, data from the World Prison Brief (Institute for Crime & Justice Policy Research) and national sources reviewed by Member States.',
          },
        ]}
        ariaLabel={`Horizontal stacked bar chart showing the number of unsentenced and sentenced detainees by region in ${selectedYear}. Worldwide, around three in ten detainees were held without a sentence.`}
      />
    </div>
  );
}
