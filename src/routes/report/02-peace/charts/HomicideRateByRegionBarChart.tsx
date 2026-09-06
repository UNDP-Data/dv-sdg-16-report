import { useQuery } from '@tanstack/react-query';
import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { Spinner } from '@undp/design-system-react/Spinner';
import { P } from '@undp/design-system-react/Typography';
import ErrorEl from '@/components/ErrorEl';
import { CHART_PADDING } from '@/constants';

const WORLD_HOMICIDE_RATE = 5.1;

function useData() {
  return useQuery({
    queryKey: ['homicide-rate-by-region'],
    queryFn: () => fetchAndParseJSON('/data/report/02-peace/16-1-1/homicide-rate-by-region.json'),
  });
}

export default function HomicideRateByRegionBarChart() {
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <ErrorEl />;
  return (
    <SimpleBarGraph
      data={transformDataForGraph(data, 'barChart', [
        { columnId: 'region', chartConfigId: 'label' },
        { columnId: 'value', chartConfigId: 'size' },
      ])}
      orientation='horizontal'
      colors='var(--blue-500)'
      minValue={0}
      maxValue={20}
      showValues
      valueColor='var(--content-primary)'
      showTicks={false}
      numberDisplayOptions={{ precision: 1 }}
      barPadding={0.4}
      height={500}
      leftMargin={innerWidth < 720 ? 135 : 220}
      truncateBy={innerWidth < 720 ? 16 : undefined}
      dimmedOpacity={0.4}
      padding={CHART_PADDING}
      refValues={[{ value: WORLD_HOMICIDE_RATE, text: `World ${WORLD_HOMICIDE_RATE}` }]}
      graphTitle={
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Rate of intentional homicide per 100,000 population, by region
        </P>
      }
      graphDescription='2024'
      sources={[
        {
          source:
            'UNODC estimates based on responses to the United Nations Survey of Crime Trends and Operations of Criminal Justice Systems and data from other sources reviewed by Member States.',
        },
      ]}
      ariaLabel='Horizontal bar chart showing the rate of intentional homicide per 100,000 population, by region, with a reference line for the global estimate. Latin America and the Caribbean and Sub-Saharan Africa have the highest rates.'
    />
  );
}
