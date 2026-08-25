import { StripChart } from '@undp/data-viz/StripChart';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { numberFormattingFunction } from '@undp/data-viz/utils';
import { Button } from '@undp/design-system-react/Button';
import { cn } from '@undp/design-system-react/cn';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@undp/design-system-react/Tooltip';
import { P } from '@undp/design-system-react/Typography';
import { Info } from 'lucide-react';
import { CHART_PADDING } from '@/constants';
import businessBriberyTrendByIncome from '@/data/chapters/02-justice/16-5-2/business-bribery-trend-by-income.json';

const INCOME_GROUPS = ['High income', 'Upper-middle income', 'Lower-middle income', 'Low income'];

const PERIODS = [
  { label: '2010–2016', color: 'var(--content-quaternary)' },
  { label: '2017–2024', color: 'var(--secondary)' },
];

export default function BusinessBriberyTrendStripChart() {
  return (
    <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' weight='semibold' className='font-heading leading-sm'>
          Proportion of businesses that experienced bribery by income level
        </P>
      </div>

      <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
        {PERIODS.map((period) => (
          <div key={period.label} className='flex items-center gap-1.5'>
            <span
              aria-hidden='true'
              className='h-4 w-4 rounded-full opacity-40'
              style={{ backgroundColor: period.color }}
            />
            <P marginBottom='none' size='sm'>
              {period.label}
            </P>
          </div>
        ))}
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

      <div className='flex flex-col'>
        {INCOME_GROUPS.map((incomeGroup, groupIndex) => (
          <div
            key={incomeGroup}
            className={cn(
              'flex flex-col gap-1 py-2',
              groupIndex > 0 && 'border-stroke-xs border-t',
            )}
          >
            <P marginBottom='none' size='sm' className='font-semibold'>
              {incomeGroup}
            </P>
            <StripChart
              data={transformDataForGraph(
                businessBriberyTrendByIncome.filter((d) => d.incomeGroup === incomeGroup),
                'stripChart',
                [
                  { columnId: 'country', chartConfigId: 'label' },
                  { columnId: 'value', chartConfigId: 'position' },
                  { columnId: 'period', chartConfigId: 'group' },
                  { columnId: 'period', chartConfigId: 'color' },
                ],
              )}
              groupOrder={PERIODS.map((period) => period.label)}
              colorDomain={PERIODS.map((period) => period.label)}
              colors={PERIODS.map((period) => period.color)}
              orientation='horizontal'
              showColorScale={false}
              stripType='dot'
              animate
              distributionMarkers={[{ type: 'median', color: 'black', strokeWidth: 1.5 }]}
              radius={5}
              dotOpacity={0.4}
              minValue={0}
              maxValue={70}
              noOfTicks={5}
              height={80}
              topMargin={8}
              leftMargin={4}
              bottomMargin={20}
              padding='0'
              numberDisplayOptions={{ suffix: '%' }}
              backgroundColor={false}
              styles={{
                tooltip: { padding: 0 },
                yAxis: { labels: { display: 'none' } },
                xAxis: { labels: { display: 'none' } },
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
                    <P
                      size='sm'
                      marginBottom='none'
                      weight='bold'
                      style={{
                        color: PERIODS.find((period) => period.label === d.data.period)?.color,
                      }}
                    >
                      {numberFormattingFunction(d.position)}%
                    </P>
                  </div>
                </div>
              )}
              ariaLabel={`Strip chart comparing the proportion of firms experiencing at least one bribe payment request in ${incomeGroup.toLowerCase()} countries between 2010 to 2016 and 2017 to 2024, with each dot representing a country and a black bar marking the median.`}
            />
          </div>
        ))}
      </div>

      <P marginBottom='none' size='sm' className='text-content-secondary'>
        Source: World Development Indicators (WDI)
      </P>
    </div>
  );
}
