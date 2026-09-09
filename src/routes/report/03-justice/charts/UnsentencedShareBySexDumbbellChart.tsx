import { useQuery } from '@tanstack/react-query';
import { DumbbellChart } from '@undp/data-viz/DumbbellChart';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { Spinner } from '@undp/design-system-react/Spinner';
import { P } from '@undp/design-system-react/Typography';
import ErrorEl from '@/components/ErrorEl';
import { CHART_PADDING } from '@/constants';

function useData() {
  return useQuery({
    queryKey: ['unsentenced-share-by-sex'],
    queryFn: () =>
      fetchAndParseJSON('/data/report/03-justice/16-3-2/unsentenced-share-by-sex.json'),
  });
}

export default function UnsentencedShareBySexDumbbellChart() {
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <ErrorEl />;
  return (
    <DumbbellChart
      data={transformDataForGraph(data, 'dumbbellChart', [
        { columnId: 'region', chartConfigId: 'label' },
        { columnId: ['female', 'male'], chartConfigId: 'x' },
      ])}
      orientation='horizontal'
      colorDomain={['Women', 'Men']}
      colors={['var(--categorical-female)', 'var(--categorical-male)']}
      backgroundColor={false}
      animate
      minValue={0}
      maxValue={100}
      showTicks={false}
      showValues={innerWidth >= 720}
      leftMargin={innerWidth < 720 ? 135 : 220}
      truncateBy={innerWidth < 720 ? 16 : undefined}
      minHeight={580}
      relativeHeight={0.8}
      numberDisplayOptions={{ suffix: '%' }}
      padding={CHART_PADDING}
      styles={{ tooltip: { padding: 0 } }}
      tooltip={(d) => (
        <div className='flex flex-col gap-1 bg-white px-3 py-2'>
          <P size='sm' weight='semibold' marginBottom='none'>
            {d.label}
          </P>
          <P size='sm' marginBottom='none' className='flex items-center justify-between gap-4'>
            <span className='flex items-center gap-1'>
              <span className='h-2 w-2 rounded-full bg-categorical-female' />
              Women
            </span>
            <span className='font-bold text-categorical-female'>{d.x[0]}%</span>
          </P>
          <P size='sm' marginBottom='none' className='flex items-center justify-between gap-4'>
            <span className='flex items-center gap-1'>
              <span className='h-2 w-2 rounded-full bg-categorical-male' />
              Men
            </span>
            <span className='font-bold text-categorical-male'>{d.x[1]}%</span>
          </P>
        </div>
      )}
      graphTitle={
        <P marginBottom='none' weight='semibold' className='font-heading leading-sm'>
          Unsentenced detainees as a proportion of the overall prison population, by sex and region
        </P>
      }
      graphDescription='2024'
      sources={[
        {
          source:
            'UNODC estimates, based on responses to the United Nations Survey of Crime Trends and Operations of Criminal Justice Systems, data from the World Prison Brief (Institute for Crime & Justice Policy Research) and national sources reviewed by Member States',
        },
      ]}
      ariaLabel='Dumbbell chart showing unsentenced prisoners as a proportion of the overall prison population by region and sex in 2024. Globally the share is around 31 per cent for both women and men, but women are more likely to be unsentenced in Northern Africa and Western Asia and in Oceania, while men are more likely to be unsentenced in Central and Southern Asia.'
    />
  );
}
