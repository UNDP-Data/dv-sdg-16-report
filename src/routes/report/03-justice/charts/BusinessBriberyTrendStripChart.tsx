import { useQuery } from '@tanstack/react-query';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { StripChart } from '@undp/data-viz/StripChart';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { getMedian, numberFormattingFunction } from '@undp/data-viz/utils';
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
import ErrorEl from '@/components/ErrorEl';
import { CHART_PADDING } from '@/constants';
import ChartNote from '../../components/ChartNote';

const INCOME_GROUPS = ['High income', 'Upper-middle income', 'Lower-middle income', 'Low income'];

interface DataType {
  country: string;
  iso3: string;
  incomeGroup: string;
  period: string;
  group: string;
  value: number;
  year: number;
}

const PERIODS = [
  { label: '2010–2016', color: 'var(--content-quaternary)' },
  { label: '2017–2024', color: 'var(--blue-500)' },
];

function useData() {
  return useQuery({
    queryKey: ['business-bribery-trend-by-income'],
    queryFn: () =>
      fetchAndParseJSON(
        '/data/report/03-justice/16-5-2/business-bribery-trend-by-income.json',
      ) as Promise<DataType[]>,
  });
}

export default function BusinessBriberyTrendStripChart() {
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <ErrorEl />;

  return (
    <div className='flex flex-col gap-4' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Proportion of businesses that experienced bribery by income level
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          2010–2016 and 2017–2024
        </P>
      </div>

      <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
        <div className='flex items-center gap-2'>
          <div className='flex items-center' aria-hidden='true'>
            <span
              className='h-4 w-4 rounded-full border border-background-soft'
              style={{ backgroundColor: PERIODS[0].color }}
            />
            <span
              className='-ml-2 h-4 w-4 rounded-full border border-background-soft'
              style={{ backgroundColor: PERIODS[1].color }}
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
                The line marks the median prevalence across countries — the middle value, with half
                of observations above and half below it.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className='flex justify-between pr-2.5 pl-20 *:flex *:w-0 *:justify-center *:whitespace-nowrap *:text-content-quaternary'>
        <P marginBottom='none' size='sm'>
          0%
        </P>
        <P marginBottom='none' size='sm'>
          20%
        </P>
        <P marginBottom='none' size='sm'>
          40%
        </P>
        <P marginBottom='none' size='sm'>
          60%
        </P>
        <P marginBottom='none' size='sm'>
          80%
        </P>
      </div>

      {INCOME_GROUPS.map((incomeGroup) => (
        <div key={incomeGroup} className='flex flex-col gap-0'>
          <P marginBottom='none' size='sm' className='font-heading font-semibold'>
            {incomeGroup}
          </P>
          <StripChart
            data={transformDataForGraph(
              (data ?? []).filter((d) => d.incomeGroup === incomeGroup),
              'stripChart',
              [
                { columnId: 'country', chartConfigId: 'label' },
                { columnId: 'period', chartConfigId: 'group' },
                { columnId: 'value', chartConfigId: 'position' },
                { columnId: 'period', chartConfigId: 'color' },
              ],
            )}
            orientation='horizontal'
            showGroups
            stripType='dot'
            groupOrder={PERIODS.map((period) => period.label)}
            colorDomain={PERIODS.map((period) => period.label)}
            colors={PERIODS.map((period) => period.color)}
            showColorScale={false}
            distributionMarkers={[
              {
                type: 'median',
                color: 'black',
                strokeWidth: 1.5,
                relativeMarkerLength: 0.5,
                markerLabel: { style: { display: 'none' } },
              },
            ]}
            animate
            radius={5}
            dotOpacity={0.4}
            minValue={0}
            maxValue={80}
            noOfTicks={5}
            height={100}
            truncateBy={innerWidth < 720 ? 16 : undefined}
            leftMargin={80}
            rightMargin={10}
            topMargin={8}
            bottomMargin={8}
            dimmedOpacity={0.1}
            numberDisplayOptions={{ suffix: '%' }}
            backgroundColor={false}
            padding='0'
            styles={{
              tooltip: { padding: 0 },
              xAxis: { labels: { display: 'none' } },
              yAxis: { labels: { textAlign: 'left' } },
            }}
            tooltip={(d) => (
              <div className='flex flex-col gap-1.5 bg-white px-3 py-2'>
                <P
                  size='sm'
                  weight='semibold'
                  marginBottom='none'
                  className='flex items-center justify-between gap-4'
                >
                  <span>
                    {d.label} ({d.data.year})
                  </span>
                </P>
                <P
                  size='sm'
                  marginBottom='none'
                  className='flex items-center justify-between gap-4'
                >
                  <span className='flex items-center gap-1.5'>{d.data.period}</span>
                  <span className='font-bold'>{numberFormattingFunction(d.position)}%</span>
                </P>
                <P
                  size='sm'
                  marginBottom='none'
                  className='flex items-center justify-between gap-4 text-content-secondary'
                >
                  <span className='flex items-center gap-1.5'>Median</span>
                  <span>
                    {numberFormattingFunction(
                      getMedian(
                        (data ?? [])
                          .filter(
                            (r) => r.incomeGroup === incomeGroup && r.period === d.data.period,
                          )
                          .map((r) => r.value),
                      ),
                    )}
                    %
                  </span>
                </P>
              </div>
            )}
            ariaLabel={`Strip chart comparing the proportion of firms experiencing at least one bribe payment request in ${incomeGroup.toLowerCase()} countries between 2010 to 2016 and 2017 to 2024, with each dot representing a country and a black bar marking the median.`}
          />
        </div>
      ))}

      <div className='flex flex-col gap-1'>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          Source: World Bank Enterprise Surveys
        </P>
        <ChartNote content='Each dot represents a country. Data based on the earliest available year between 2010 and 2016 and latest available year between 2017 and 2024. Countries are classified by income level as of 2024. The estimates show the median prevalence. The median represents the middle value, with half of observations above and half below it.' />
      </div>
    </div>
  );
}
