import { Colors } from '@undp/data-viz/Colors';
import { MultiLineChart } from '@undp/data-viz/MultiLineChart';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';
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
        'var(--primary)',
        Colors.genderColors.male,
        Colors.genderColors.female,
        '#000000',
        '#000000',
        '#000000',
      ]}
      labels={['Both sexes', 'Male', 'Female', 'Target', 'Target Male', 'Target Female']}
      dashedLines={['Target', 'Target Male', 'Target Female']}
      dashSettings={['1 3']}
      showColorScale={false}
      showDots={false}
      strokeWidth={2}
      curveType='linear'
      minValue={0}
      maxValue={12}
      noOfXTicks={5}
      highlightAreaSettings={[{ coordinates: [2025, 2030], color: 'var(--chart-highlight)' }]}
      annotations={[
        {
          text: 'Projected',
          xCoordinate: 2022,
          yCoordinate: 11.5,
          align: 'center',
          fontWeight: 'medium',
          showConnector: false,
          color: 'var(--chart-highlight-label)',
        },
        {
          text: 'period',
          xCoordinate: 2022,
          yCoordinate: 10.8,
          align: 'center',
          fontWeight: 'medium',
          showConnector: false,
          color: 'var(--chart-highlight-label)',
        },
      ]}
      padding={CHART_PADDING}
      backgroundColor='var(--background-soft)'
      yAxisTitle='Rate per 100,000 population'
      relativeHeight={0.85}
      numberDisplayOptions={{ precision: 1 }}
      graphTitle={
        <div className='flex flex-col items-start gap-2'>
          <P marginBottom='none' className='font-heading font-semibold leading-sm'>
            Trends in and projections of the global homicide rate, by sex (2000–2030)
          </P>
          <div className='flex flex-wrap gap-4'>
            <div className='flex items-center gap-1'>
              <div className='h-px w-5 bg-primary' />
              <p className='m-0 text-sm'>Both sexes</p>
            </div>

            <div className='flex items-center gap-1'>
              <div className='h-px w-5' style={{ backgroundColor: '#02a38a' }} />
              <p className='m-0 text-sm'>Male</p>
            </div>

            <div className='flex items-center gap-1'>
              <div className='h-px w-5' style={{ backgroundColor: '#757af0' }} />
              <p className='m-0 text-sm'>Female</p>
            </div>

            <div className='flex items-center gap-1'>
              <div className='w-5 border-black border-t border-dashed' />
              <p className='m-0 text-sm'>Target</p>
            </div>
          </div>
        </div>
      }
      sources={[{ source: 'UNODC' }]}
      footNote={
        <ChartNote content='Estimates are based on responses to the United Nations Survey of Crime Trends and Operations of Criminal Justice Systems and data from other sources reviewed by Member States. Projections for 2025-2030 represent a linear extrapolation of trends observed between 2015 and 2024. The black dotted line indicates the trend required to achieve the SDG Target 16.1 objective of halving the global homicide rate by 2030.' />
      }
    />
  );
}
