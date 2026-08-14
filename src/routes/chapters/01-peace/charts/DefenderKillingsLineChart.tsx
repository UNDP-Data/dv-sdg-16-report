import { MultiLineChart } from '@undp/data-viz/MultiLineChart';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';
import defendersKillings from '@/data/chapters/01-peace/16-10-1/defender-killings-by-year.json';

export default function DefenderKillingsLineChart() {
  return (
    <MultiLineChart
      data={transformDataForGraph(defendersKillings, 'multiLineChart', [
        { columnId: ['value', 'projectedValue'], chartConfigId: 'y' },
        { columnId: 'year', chartConfigId: 'date' },
      ])}
      padding={CHART_PADDING}
      labels={['Actual', 'Projected']}
      dashedLines={['Projected']}
      showColorScale={false}
      graphTitle={
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Number verified killings of human rights defenders, journalists and trade unionists
          worldwide, 2015–2025
        </P>
      }
      sources={[{ source: 'OHCHR' }]}
      ariaLabel='Line chart showing the number of verified killings of human rights defenders, journalists and trade unionists worldwide from 2015 to 2025, rising from 426 in 2015 to a projected 743 in 2025. 2024 and 2025 figures are projected, shown as a dashed line.'
      lineColors={['var(--primary)', 'var(--primary)']}
      strokeWidth={2}
      showDots={false}
      backgroundColor='var(--background-soft)'
      curveType='linear'
      noOfXTicks='showAvailableOnly'
    />
  );
}
