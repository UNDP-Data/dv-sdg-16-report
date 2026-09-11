import { useQuery } from '@tanstack/react-query';
import { Colors } from '@undp/data-viz/Colors';
import { fetchAndParseCSV } from '@undp/data-viz/fetchAndParseData';
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

interface ViolencePrevalenceRow {
  country: string;
  violenceType: string;
  sex: string;
  value: number;
  year: number;
}

const VIOLENCE_TYPES = ['Physical violence', 'Sexual violence', 'Psychological violence'];

function useNonLethalViolenceData() {
  return useQuery({
    queryKey: ['non-lethal-violence-16-1-3'],
    queryFn: () =>
      fetchAndParseCSV('/data/report/02-peace/16-1-3/violence-prevalence.csv') as Promise<
        ViolencePrevalenceRow[]
      >,
  });
}

export default function NonLethalViolenceByTypeSexStripChart() {
  const { data: rows, isLoading, isError } = useNonLethalViolenceData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <ErrorEl />;

  return (
    <div className='flex flex-col gap-4' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Proportion of the population subjected to violence in the previous twelve months, by sex
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          Latest available year between 2016–2024
        </P>
      </div>

      <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
        <div className='flex items-center gap-2'>
          <div className='flex items-center' aria-hidden='true'>
            <span
              className='h-4 w-4 rounded-full border border-background-soft'
              style={{ backgroundColor: Colors.genderColors.male }}
            />
            <span
              className='-ml-2 h-4 w-4 rounded-full border border-background-soft'
              style={{ backgroundColor: Colors.genderColors.female }}
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

      <div className='flex justify-between pr-2.5 pl-15 *:flex *:w-0 *:justify-center *:whitespace-nowrap *:text-content-quaternary'>
        <P marginBottom='none' size='xs'>
          0%
        </P>
        <P marginBottom='none' size='xs'>
          10%
        </P>
        <P marginBottom='none' size='xs'>
          20%
        </P>
        <P marginBottom='none' size='xs'>
          30%
        </P>
        <P marginBottom='none' size='xs'>
          40%
        </P>
      </div>

      {VIOLENCE_TYPES.map((violenceType) => (
        <div key={violenceType} className='flex flex-col gap-0'>
          <P marginBottom='none' size='sm' className='font-heading font-semibold'>
            {violenceType}
          </P>
          <StripChart
            data={transformDataForGraph(
              (rows ?? []).filter((d) => d.violenceType === violenceType),
              'stripChart',
              [
                { columnId: 'country', chartConfigId: 'label' },
                { columnId: 'sex', chartConfigId: 'group' },
                { columnId: 'value', chartConfigId: 'position' },
                { columnId: 'sex', chartConfigId: 'color' },
              ],
            )}
            orientation='horizontal'
            showGroups
            stripType='dot'
            groupOrder={['Men', 'Women']}
            colorDomain={['Men', 'Women']}
            colors={[Colors.genderColors.male, Colors.genderColors.female]}
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
            maxValue={40}
            noOfTicks={5}
            height={100}
            truncateBy={innerWidth < 720 ? 16 : undefined}
            leftMargin={60}
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
                  <span className='flex items-center gap-1.5'>{d.data.sex}</span>
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
                        (rows ?? [])
                          .filter((r) => r.violenceType === violenceType && r.sex === d.data.sex)
                          .map((r) => r.value),
                      ),
                    )}
                    %
                  </span>
                </P>
              </div>
            )}
            ariaLabel={`Strip chart showing ${violenceType.toLowerCase()} prevalence by country, grouped by sex. Each dot is a country and a line marks the median of each group.`}
          />
        </div>
      ))}

      <div className='flex flex-col gap-1'>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          Source: UNODC based on responses to the United Nations Survey of Crime Trends and
          Operations of Criminal Justice Systems and data from other sources reviewed by Member
          States.
        </P>
        <ChartNote
          content={
            <P size='sm' marginBottom='none'>
              18 countries (sexual violence men and women), 12 countries (psychological violence men
              and women). Each dot represents a country.
            </P>
          }
        />
      </div>
    </div>
  );
}
