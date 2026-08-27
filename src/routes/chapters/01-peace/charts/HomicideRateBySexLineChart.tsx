import { Colors } from '@undp/data-viz/Colors';
import { MultiLineChart } from '@undp/data-viz/MultiLineChart';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { P } from '@undp/design-system-react/Typography';
import { CHART_HIGHLIGHT_AREA_BG, CHART_HIGHLIGHT_LABEL_COLOR, CHART_PADDING } from '@/constants';
import homicideRateBySex from '@/data/chapters/01-peace/16-1-1/homicide-rate-by-sex.json';
import ChartNote from '../../components/ChartNote';

export default function HomicideRateBySexLineChart() {
  return (
    <MultiLineChart
      data={transformDataForGraph(homicideRateBySex, 'multiLineChart', [
        {
          columnId: ['both', 'male', 'female', 'bothTarget', 'maleTarget', 'femaleTarget'],
          chartConfigId: 'y',
        },
        { columnId: 'year', chartConfigId: 'date' },
      ])}
      lineColors={[
        'var(--secondary)',
        Colors.genderColors.male,
        Colors.genderColors.female,
        '#000000',
        '#000000',
        '#000000',
      ]}
      labels={['Both sexes', 'Men', 'Women', 'Target', 'Target Men', 'Target Women']}
      dashedLines={['Target', 'Target Men', 'Target Women']}
      dashSettings={['1 3']}
      showColorScale={false}
      showDots={false}
      strokeWidth={2}
      curveType='linear'
      minValue={0}
      maxValue={12}
      noOfXTicks={5}
      highlightAreaSettings={[{ coordinates: [2025, 2030], color: CHART_HIGHLIGHT_AREA_BG }]}
      annotations={[
        {
          text: 'Projected',
          xCoordinate: 2022,
          yCoordinate: 11.5,
          align: 'center',
          fontWeight: 'medium',
          showConnector: false,
          color: CHART_HIGHLIGHT_LABEL_COLOR,
        },
        {
          text: 'period',
          xCoordinate: 2022,
          yCoordinate: 10.8,
          align: 'center',
          fontWeight: 'medium',
          showConnector: false,
          color: CHART_HIGHLIGHT_LABEL_COLOR,
        },
      ]}
      padding={CHART_PADDING}
      yAxisTitle='Rate per 100,000 population'
      relativeHeight={0.75}
      numberDisplayOptions={{ precision: 1 }}
      graphTitle={
        <div className='flex flex-col items-start gap-2'>
          <P marginBottom='none' className='font-heading font-semibold leading-sm'>
            The global homicide rate per 100,000, by sex
          </P>
          <P marginBottom='none' size='sm' className='text-content-secondary'>
            2000–2030
          </P>
          <div className='flex flex-wrap gap-4'>
            <div className='flex items-center gap-1'>
              <div className='h-0.75 w-5 bg-secondary' />
              <p className='m-0 text-sm'>Both sexes</p>
            </div>

            <div className='flex items-center gap-1'>
              <div className='h-0.75 w-5' style={{ backgroundColor: '#02a38a' }} />
              <p className='m-0 text-sm'>Men</p>
            </div>

            <div className='flex items-center gap-1'>
              <div className='h-0.75 w-5' style={{ backgroundColor: '#757af0' }} />
              <p className='m-0 text-sm'>Women</p>
            </div>

            <div className='flex items-center gap-1'>
              <div className='w-5 border-black border-t border-dashed' />
              <p className='m-0 text-sm'>Target</p>
            </div>
          </div>
        </div>
      }
      minHeight={600}
      styles={{
        tooltip: {
          padding: 0,
        },
      }}
      tooltip={(d) => {
        const year = d.date.getFullYear();
        const [both, male, female, bothTarget, maleTarget, femaleTarget] = d.y as (number | null)[];
        const rows = [
          { label: 'Both sexes', value: both, target: bothTarget, color: 'var(--secondary)' },
          { label: 'Men', value: male, target: maleTarget, color: Colors.genderColors.male },
          {
            label: 'Women',
            value: female,
            target: femaleTarget,
            className: Colors.genderColors.female,
          },
        ];
        return (
          <div className='flex flex-col gap-1 bg-white px-3 py-2'>
            <P size='sm' weight='semibold' marginBottom='none'>
              {year}
            </P>
            {rows.map((row) => (
              <P
                key={row.label}
                size='sm'
                marginBottom='none'
                className='flex items-center justify-between gap-4'
              >
                <span className='flex items-center gap-1.5'>
                  <span className='h-0.75 w-3' style={{ backgroundColor: row.color }} />
                  {row.label}
                </span>
                <span className='flex items-baseline gap-1.5'>
                  <span>{row.value?.toFixed(1)}</span>
                  {row.target !== null && (
                    <span className='text-content-secondary text-xs'>
                      (target {row.target.toFixed(1)})
                    </span>
                  )}
                </span>
              </P>
            ))}
            {year >= 2025 && (
              <>
                <div className='my-1 border-stroke-xs border-t' />
                <P size='sm' marginBottom='none' className='text-content-secondary italic'>
                  Values are projected
                </P>
              </>
            )}
          </div>
        );
      }}
      sources={[
        {
          source:
            'UNODC estimates based on responses to the United Nations Survey of Crime Trends and Operations of Criminal Justice Systems (UN-CTS) and data from other sources reviewed by Member States.',
        },
      ]}
      footNote={
        <ChartNote content='Projections for years 2025-2030 represent a linear extrapolation of trends observed between 2015 and 2024. The black dotted line indicates the trend required to achieve the SDG Target 16.1 objective of halving the global homicide rate by 2030.' />
      }
    />
  );
}
