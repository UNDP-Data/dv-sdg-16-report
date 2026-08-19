import { SimpleLineChart } from '@undp/data-viz/SimpleLineChart';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';
import defendersKillings from '@/data/chapters/01-peace/16-10-1/defender-killings-by-year.json';

export default function DefenderKillingsLineChart() {
  return (
    <SimpleLineChart
      data={transformDataForGraph(defendersKillings, 'lineChart', [
        { columnId: 'value', chartConfigId: 'y' },
        { columnId: 'year', chartConfigId: 'date' },
      ])}
      padding={CHART_PADDING}
      minValue={0}
      relativeHeight={0.85}
      maxValue={800}
      highlightAreaSettings={[{ coordinates: [2024, 2025], color: 'var(--chart-highlight)' }]}
      annotations={[
        {
          text: 'Projected',
          xCoordinate: 2023,
          yCoordinate: 100,
          xOffset: 20,
          align: 'center',
          fontWeight: 'medium',
          showConnector: false,
          color: 'var(--chart-highlight-label)',
        },
        {
          text: 'period',
          xCoordinate: 2023,
          xOffset: 20,
          yCoordinate: 65,
          align: 'center',
          fontWeight: 'medium',
          showConnector: false,
          color: 'var(--chart-highlight-label)',
        },
      ]}
      graphTitle={
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Number of verified killings of human rights defenders, journalists and trade unionists
          worldwide
        </P>
      }
      graphDescription='2015 – 2025 (2025 figures projected)'
      sources={[{ source: 'OHCHR' }]}
      ariaLabel='Line chart showing the number of verified killings of human rights defenders, journalists and trade unionists worldwide from 2015 to 2025, rising from 426 in 2015 to a projected 743 in 2025. 2024 and 2025 figures are projected, highlighted as a shaded area.'
      strokeWidth={2}
      showDots={false}
      backgroundColor='var(--background-soft)'
      curveType='linear'
      noOfXTicks='showAvailableOnly'
    />
  );
}
