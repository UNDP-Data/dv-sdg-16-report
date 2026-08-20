import { DumbbellChart } from '@undp/data-viz/DumbbellChart';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';
import voteSharesByInstitution from '@/data/chapters/03-inclusion/16-8-1/vote-shares-by-institution.json';

export default function VoteSharesByInstitutionDumbbellChart() {
  const chartData = transformDataForGraph(voteSharesByInstitution, 'dumbbellChart', [
    { columnId: 'institution', chartConfigId: 'label' },
    { columnId: ['voteShare', 'memberShare'], chartConfigId: 'x' },
  ]);
  // eslint-disable-next-line no-console
  console.log('DEBUG chartData', chartData);
  return (
    <DumbbellChart
      data={chartData}
      orientation='horizontal'
      colorDomain={['Vote or seat share', 'Member share']}
      colors={['var(--secondary)', 'var(--tertiary)']}
      minValue={0}
      maxValue={100}
      showTicks={false}
      connectorStrokeWidth={1}
      leftMargin={180}
      relativeHeight={0.85}
      numberDisplayOptions={{ suffix: '%', precision: 1 }}
      padding={CHART_PADDING}
      backgroundColor='var(--background-soft)'
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
