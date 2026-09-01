import { StackedBarGraph } from '@undp/data-viz/BarGraph';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { numberFormattingFunction } from '@undp/data-viz/utils';
import { RadioGroup, RadioGroupItem } from '@undp/design-system-react/RadioGroup';
import { P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import { CHART_PADDING } from '@/constants';
import detaineesBySentencingStatus from '@/data/chapters/02-justice/16-3-2/detainees-by-sentencing-status.json';

export default function DetaineesBySentencingStatusBarChart() {
  const [selectedYear, setSelectedYear] = useState('2024');

  return (
    <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
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
          color='secondary'
        >
          <RadioGroupItem value='2024' label='2024' />
          <RadioGroupItem value='2015' label='2015' />
        </RadioGroup>
      </div>

      <StackedBarGraph
        data={transformDataForGraph(
          detaineesBySentencingStatus.filter((d) => d.year === +selectedYear),
          'stackedBarChart',
          [
            { columnId: 'region', chartConfigId: 'label' },
            { columnId: ['unsentenced', 'sentenced'], chartConfigId: 'size' },
          ],
        )}
        colorDomain={['Unsentenced detainees', 'Sentenced detainees']}
        colors={['var(--secondary)', 'var(--content-quaternary)']}
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
              <span className='font-bold text-secondary'>
                {numberFormattingFunction(d.data.unsentenced)}
              </span>{' '}
              <span className='font-bold text-secondary'>
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
                {numberFormattingFunction(d.data.sentenced)}
              </span>
            </P>
            <P size='sm' marginBottom='none' className='text-content-secondary'>
              Total: {numberFormattingFunction(d.data.unsentenced + d.data.sentenced)}
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
