import { DumbbellChart } from '@undp/data-viz/DumbbellChart';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';
import voteSharesByInstitution from '@/data/chapters/03-inclusion/16-8-1/vote-shares-by-institution.json';

export default function VoteSharesByInstitutionDumbbellChart() {
  return (
    <DumbbellChart
      data={transformDataForGraph(voteSharesByInstitution, 'dumbbellChart', [
        { columnId: 'institution', chartConfigId: 'label' },
        { columnId: ['voteShare', 'memberShare'], chartConfigId: 'x' },
      ])}
      orientation='horizontal'
      colorDomain={['Vote or seat share', 'Member share']}
      colors={['var(--secondary)', 'var(--tertiary)']}
      minValue={0}
      maxValue={100}
      showTicks={false}
      showValues={innerWidth >= 720}
      connectorStrokeWidth={1}
      leftMargin={innerWidth < 720 ? 135 : 130}
      truncateBy={innerWidth < 720 ? 16 : undefined}
      minHeight={innerWidth < 720 ? 620 : 480}
      relativeHeight={0.85}
      numberDisplayOptions={{ suffix: '%', precision: 1 }}
      padding={CHART_PADDING}
      backgroundColor='var(--background-soft)'
      styles={{
        tooltip: {
          padding: 0,
        },
      }}
      tooltip={(d) => {
        const [voteShare, memberShare] = d.x as (number | null)[];
        const rows = [
          { label: 'Vote or seat share', value: voteShare, color: 'var(--secondary)' },
          { label: 'Member share', value: memberShare, color: 'var(--tertiary)' },
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
      graphTitle={
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Vote shares of developing countries in some of the main international financial and
          economic institutions
        </P>
      }
      sources={[{ source: 'UN DESA' }]}
      ariaLabel='Dumbbell chart showing the vote or seat share versus member share of developing countries across international financial and economic institutions. Developing countries hold a much smaller vote or seat share than their member share in institutions such as the IFC, IMF, IBRD and ADB, while their vote and member shares are equal in UN bodies and the WTO.'
    />
  );
}
