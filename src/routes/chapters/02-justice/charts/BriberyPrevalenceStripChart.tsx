import { StripChart } from '@undp/data-viz/StripChart';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { numberFormattingFunction } from '@undp/data-viz/utils';
import { Button } from '@undp/design-system-react/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@undp/design-system-react/Tooltip';
import { P } from '@undp/design-system-react/Typography';
import { Info } from 'lucide-react';
import { CHART_PADDING } from '@/constants';
import briberyPrevalenceByCountry from '@/data/chapters/02-justice/16-5-1/bribery-prevalence-by-country.json';

export default function BriberyPrevalenceStripChart() {
  return (
    <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Proportion of population that experienced bribery when in contact with public officials in
          the previous 12 months, by region and income level
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          2024 or latest year available since 2015
        </P>
      </div>

      <div className='flex items-center gap-4'>
        <span aria-hidden='true' className='h-4 w-4 rounded-full bg-secondary opacity-40' />
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
                The line marks the median prevalence across countries — the middle value, with half
                of observations above and half below it.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <StripChart
        data={transformDataForGraph(briberyPrevalenceByCountry, 'stripChart', [
          { columnId: 'country', chartConfigId: 'label' },
          { columnId: 'value', chartConfigId: 'position' },
          { columnId: 'region', chartConfigId: 'group' },
        ])}
        orientation='horizontal'
        stripType='dot'
        colors={['var(--secondary)']}
        leftMargin={innerWidth < 720 ? 135 : 220}
        truncateBy={innerWidth < 720 ? 16 : undefined}
        topMargin={32}
        noOfTicks={5}
        animate
        showGroups
        distributionMarkers={[
          { type: 'median', color: 'black', strokeWidth: 1.5, relativeMarkerLength: 0.3 },
        ]}
        radius={5}
        dotOpacity={0.4}
        minValue={0}
        maxValue={100}
        height={450}
        dimmedOpacity={0.1}
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
              <P size='sm' marginBottom='none' weight='bold' className='text-secondary'>
                {numberFormattingFunction(d.position)}%
              </P>
            </div>
          </div>
        )}
        sources={[
          {
            source:
              'UNODC, based on responses to the UNODC United Nations Survey of Crime Trends and Operations of Criminal Justice Systems (UN-CTS) and Global Corruption Barometer.',
          },
        ]}
        ariaLabel='Strip chart showing the proportion of the population that experienced bribery when in contact with public officials in the previous 12 months, with each dot representing a country and a black bar marking the median. The highest median prevalence is in Sub-Saharan Africa at 24 per cent and Central and Southern Asia at 22.5 per cent, and the lowest is in Europe and Northern America at 9 per cent.'
      />
    </div>
  );
}
