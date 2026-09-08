import { useQuery } from '@tanstack/react-query';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { StripChart } from '@undp/data-viz/StripChart';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { numberFormattingFunction } from '@undp/data-viz/utils';
import { Spinner } from '@undp/design-system-react/Spinner';
import { P } from '@undp/design-system-react/Typography';
import ErrorEl from '@/components/ErrorEl';
import { CHART_PADDING } from '@/constants';
import ChartNote from '../../components/ChartNote';

function useData() {
  return useQuery({
    queryKey: ['dispute-resolution-access'],
    queryFn: () =>
      fetchAndParseJSON('/data/report/03-justice/16-3-3/dispute-resolution-access.json'),
  });
}

export default function DisputeResolutionAccessStripChart() {
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <ErrorEl />;
  return (
    <div className='flex flex-col gap-4' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Proportion of the population who have experienced a civil dispute in the past two years,
          and who accessed a formal or informal dispute resolution mechanism
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          2025 or latest available year
        </P>
      </div>

      <div className='flex items-center gap-2'>
        <span aria-hidden='true' className='h-4 w-4 rounded-full bg-blue-500 opacity-40' />
        <P marginBottom='none' size='sm'>
          Each dot is a country
        </P>
      </div>

      <StripChart
        data={transformDataForGraph(data, 'stripChart', [
          { columnId: 'country', chartConfigId: 'label' },
          { columnId: 'value', chartConfigId: 'position' },
        ])}
        orientation='horizontal'
        stripType='dot'
        colors='var(--blue-500)'
        animate
        radius={7}
        dotOpacity={0.4}
        minValue={0}
        maxValue={100}
        noOfTicks={5}
        height={80}
        numberDisplayOptions={{ suffix: '%' }}
        padding='0'
        styles={{ tooltip: { padding: 0 } }}
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
        ariaLabel={`Strip chart showing, for ${data.length} countries, the proportion of people who experienced a dispute in the past two years and accessed a formal or informal dispute resolution mechanism. Values range from 21 per cent in South Africa to 94 per cent in Tunisia.`}
      />

      <div className='flex flex-col gap-1'>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          Source: OECD, UNDP and UNODC
        </P>
        <ChartNote content='Data for South Africa refers to the proportion of the population who have experienced a dispute in the past two years. No aggregate indicator on the share of people who experienced a dispute and accessed a formal or informal dispute resolution mechanism was published. Data for Nigeria refer to the proportion of the population who have experienced a dispute in the past five years and who accessed a formal or informal dispute resolution mechanism.' />
      </div>
    </div>
  );
}
