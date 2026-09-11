import { useQuery } from '@tanstack/react-query';
import { ColorLegend } from '@undp/data-viz/ColorLegend';
import { DumbbellChart } from '@undp/data-viz/DumbbellChart';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { Spinner } from '@undp/design-system-react/Spinner';
import { P } from '@undp/design-system-react/Typography';
import ErrorEl from '@/components/ErrorEl';
import { CHART_PADDING } from '@/constants';

function useData() {
  return useQuery({
    queryKey: ['vote-shares-by-institution'],
    queryFn: () =>
      fetchAndParseJSON('/data/report/04-inclusion/16-8-1/vote-shares-by-institution.json'),
  });
}
export default function VoteSharesByInstitutionDumbbellChart() {
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <ErrorEl />;

  return (
    <div className='flex flex-col gap-4' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Vote shares of developing countries in some of the main international financial and
          economic institutions
        </P>
      </div>

      <ColorLegend
        colors={['var(--blue-500)', 'var(--primary)']}
        colorDomain={['Vote or seat share', 'Member share']}
        showNAColor={false}
        className='pb-0'
      />

      <DumbbellChart
        data={transformDataForGraph(data, 'dumbbellChart', [
          { columnId: 'institution', chartConfigId: 'label' },
          { columnId: ['voteShare', 'memberShare'], chartConfigId: 'x' },
        ])}
        orientation='horizontal'
        colorDomain={['Vote or seat share', 'Member share']}
        showColorScale={false}
        colors={['var(--blue-500)', 'var(--primary)']}
        minValue={0}
        maxValue={100}
        showTicks
        backgroundColor={false}
        showValues={false}
        connectorStrokeWidth={1}
        leftMargin={innerWidth < 720 ? 135 : 130}
        truncateBy={innerWidth < 720 ? 16 : undefined}
        minHeight={innerWidth < 720 ? 465 : 360}
        relativeHeight={0.65}
        numberDisplayOptions={{ suffix: '%', precision: 1 }}
        padding='0'
        styles={{
          tooltip: {
            padding: 0,
          },
          xAxis: {
            gridLines: {
              display: 'none',
            },
            labels: {
              fill: 'var(--content-quaternary)',
            },
          },
        }}
        tooltip={(d) => {
          const [voteShare, memberShare] = d.x as (number | null)[];
          const rows = [
            { label: 'Vote or seat share', value: voteShare, color: 'var(--blue-500)' },
            { label: 'Member share', value: memberShare, color: 'var(--primary)' },
          ];
          return (
            <div className='flex flex-col gap-1 bg-white px-3 py-2'>
              <P size='sm' weight='semibold' marginBottom='none'>
                {(d.data as { fullName?: string })?.fullName ?? d.label}
              </P>
              {rows.map((row) => (
                <P
                  key={row.label}
                  size='sm'
                  marginBottom='none'
                  className='flex items-center justify-between gap-4'
                >
                  <span className='flex items-center gap-1.5'>
                    <span
                      className='h-2.5 w-2.5 rounded-full'
                      style={{ backgroundColor: row.color }}
                    />
                    {row.label}
                  </span>
                  <span>{row.value !== null ? `${row.value}%` : 'N/A'}</span>
                </P>
              ))}
            </div>
          );
        }}
        sources={[{ source: 'UN DESA' }]}
        ariaLabel='Dumbbell chart showing the vote or seat share versus member share of developing countries across international financial and economic institutions. Developing countries hold a much smaller vote or seat share than their member share in institutions such as the IFC, IMF, IBRD and ADB, while their vote and member shares are equal in UN bodies and the WTO.'
      />
    </div>
  );
}
