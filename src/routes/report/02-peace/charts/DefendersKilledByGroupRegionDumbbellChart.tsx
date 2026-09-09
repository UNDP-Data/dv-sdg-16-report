import { useQuery } from '@tanstack/react-query';
import { DumbbellChart } from '@undp/data-viz/DumbbellChart';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { Spinner } from '@undp/design-system-react/Spinner';
import { P } from '@undp/design-system-react/Typography';
import ErrorEl from '@/components/ErrorEl';
import { CHART_PADDING } from '@/constants';
import ChartNote from '../../components/ChartNote';

const REGIONS = [
  'Central Asia and Southern Asia',
  'Eastern Asia and South-Eastern Asia',
  'Latin America and the Caribbean',
  'Sub-Saharan Africa',
  'Northern Africa and Western Asia',
  'World',
];

const COLORS = [
  'var(--blue-600)',
  'var(--secondary)',
  'var(--primary)',
  'var(--tertiary)',
  'var(--quaternary)',
  'var(--gray-700)',
];

function useData() {
  return useQuery({
    queryKey: ['defender-killings-by-group-region'],
    queryFn: () =>
      fetchAndParseJSON('/data/report/02-peace/16-10-1/defenders-killed-by-group-region.json'),
  });
}

export default function DefendersKilledByGroupRegionDumbbellChart() {
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <ErrorEl />;

  return (
    <DumbbellChart
      data={transformDataForGraph(data, 'dumbbellChart', [
        { columnId: 'group', chartConfigId: 'label' },
        {
          columnId: REGIONS,
          chartConfigId: 'x',
        },
      ])}
      orientation='vertical'
      colorDomain={REGIONS}
      colors={COLORS}
      backgroundColor={false}
      minValue={0}
      maxValue={50}
      noOfTicks={5}
      showValues={false}
      radius={innerWidth < 720 ? 7 : 9}
      connectorStrokeWidth={innerWidth < 720 ? 14 : 18}
      leftMargin={40}
      rightMargin={20}
      bottomMargin={48}
      minHeight={600}
      height={innerWidth < 720 ? 560 : 660}
      truncateBy={innerWidth < 720 ? 10 : 24}
      numberDisplayOptions={{ suffix: '%' }}
      padding={CHART_PADDING}
      styles={{
        tooltip: {
          padding: 0,
        },
        dataConnectors: {
          stroke: '#E6F0F7',
        },
      }}
      tooltip={(d) => (
        <div className='flex flex-col gap-1 bg-white px-3 py-2'>
          <P size='sm' weight='semibold' marginBottom='none'>
            {d.label} HRDs
          </P>
          {REGIONS.map((region, index) => {
            const value = (d.x as (number | null)[])[index];
            return (
              <P
                key={region}
                size='sm'
                marginBottom='none'
                className='flex items-center justify-between gap-4'
              >
                <span className='flex items-center gap-1.5'>
                  <span
                    className='h-2.5 w-2.5 rounded-full'
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  {region}
                </span>
                <span>{value !== null ? `${value}%` : 'N/A'}</span>
              </P>
            );
          })}
        </div>
      )}
      graphTitle={
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Share of killed or disappeared human rights defenders belonging to selected group
        </P>
      }
      graphDescription='2025'
      sources={[{ source: 'OHCHR' }]}
      footNote={
        <ChartNote content='Each dot represents the share of defenders killed or disappeared in that region who belonged to the specified group. Categories are not mutually exclusive; an individual may be included in more than one group. Europe and Northern America are excluded due to small case numbers, and Oceania due to insufficient data availability.' />
      }
      ariaLabel='Dumbbell chart showing the share of killed or disappeared human rights defenders belonging to selected groups, by region, in 2025. Environmental and land defenders account for the largest share in Latin America and the Caribbean, while indigenous and minority defenders account for the widest spread across regions.'
    />
  );
}
