import { SimpleLineChart } from '@undp/data-viz/SimpleLineChart';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { P } from '@undp/design-system-react/Typography';
import { CHART_HIGHLIGHT_AREA_BG, CHART_HIGHLIGHT_LABEL_COLOR, CHART_PADDING } from '@/constants';
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
      relativeHeight={0.7}
      maxValue={800}
      highlightAreaSettings={[{ coordinates: [2024, 2025], color: CHART_HIGHLIGHT_AREA_BG }]}
      annotations={[
        {
          text: 'Projected',
          xCoordinate: 2023,
          yCoordinate: 140,
          xOffset: 25,
          align: 'center',
          fontWeight: 'medium',
          showConnector: false,
          color: CHART_HIGHLIGHT_LABEL_COLOR,
        },
        {
          text: 'period',
          xCoordinate: 2023,
          xOffset: 25,
          yCoordinate: 80,
          align: 'center',
          fontWeight: 'medium',
          showConnector: false,
          color: CHART_HIGHLIGHT_LABEL_COLOR,
        },
      ]}
      minHeight={400}
      graphTitle={
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Number of verified killings of human rights defenders, journalists and trade unionists
          worldwide
        </P>
      }
      graphDescription='2015 – 2025 (2025 figures projected)'
      sources={[{ source: 'OHCHR' }]}
      styles={{
        tooltip: {
          padding: 0,
        },
      }}
      tooltip={(d) => (
        <div className='flex flex-col gap-1 bg-white px-2 py-1'>
          <div className='flex gap-1'>
            <P
              size='sm'
              weight='semibold'
              marginBottom='none'
              className='mr-1 border-content-reverse border-r pr-2'
            >
              {d.date.getFullYear()}
            </P>
            <P size='sm' marginBottom='none' className='flex justify-between gap-4 text-primary'>
              <span className='font-bold'>{Math.round(d.y)}</span>
            </P>
          </div>
          {d.date.getFullYear() === 2025 && (
            <>
              <div className='border-stroke-xs border-t' />
              <P size='sm' marginBottom='none' className='text-content-secondary italic'>
                Values are projected
              </P>
            </>
          )}
        </div>
      )}
      ariaLabel='Line chart showing the number of verified killings of human rights defenders, journalists and trade unionists worldwide from 2015 to 2025, rising from 426 in 2015 to a projected 743 in 2025. 2024 and 2025 figures are projected, highlighted as a shaded area.'
      strokeWidth={2}
      lineColor='var(--blue-500)'
      showDots={false}
      curveType='linear'
      noOfXTicks='showAvailableOnly'
    />
  );
}
