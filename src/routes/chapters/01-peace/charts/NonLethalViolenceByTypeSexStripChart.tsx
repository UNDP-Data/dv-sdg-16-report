import { useQuery } from '@tanstack/react-query';
import { ColorLegend } from '@undp/data-viz/ColorLegend';
import { Colors } from '@undp/data-viz/Colors';
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
      fetchAndParseCSV('/data/chapters/01-peace/16-1-3/violence-prevalence.csv') as Promise<
        ViolencePrevalenceRow[]
      >,
  });
}

export default function NonLethalViolenceByTypeSexStripChart() {
  const { data: rows, isLoading, isError } = useNonLethalViolenceData();

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
          Proportion of the population subjected to violence in the previous twelve months, by sex
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          Latest available year between 2016–2024
        </P>
      </div>

      <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
        <ColorLegend
          colors={[Colors.genderColors.male, Colors.genderColors.female]}
          colorDomain={['Men', 'Women']}
          showNAColor={false}
          className='pb-0'
        />
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

      {VIOLENCE_TYPES.map((violenceType, index) => (
        <div key={violenceType} className='flex flex-col gap-1'>
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
            stripType='dot'
            showGroups
            groupOrder={['Men', 'Women']}
            colorDomain={['Men', 'Women']}
            colors={[Colors.genderColors.male, Colors.genderColors.female]}
            showColorScale={false}
            distributionMarkers={[
              { type: 'median', color: 'black', strokeWidth: 1.5, relativeMarkerLength: 0.5 },
            ]}
            animate
            radius={5}
            dotOpacity={0.4}
            minValue={0}
            maxValue={40}
            noOfTicks={5}
            height={120}
            truncateBy={innerWidth < 720 ? 16 : undefined}
            leftMargin={innerWidth < 720 ? 80 : 100}
            rightMargin={10}
            topMargin={32}
            bottomMargin={8}
            dimmedOpacity={0.1}
            numberDisplayOptions={{ suffix: '%' }}
            backgroundColor={false}
            padding='0'
            classNames={index === 0 ? undefined : { xAxis: { labels: 'hidden' } }}
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
                  <P size='sm' marginBottom='none' className='flex justify-between gap-1'>
                    <span className='font-bold'>{numberFormattingFunction(d.position)}%</span>
                    <span className='text-content-secondary text-xs'>({d.data.year})</span>
                  </P>
                </div>
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
