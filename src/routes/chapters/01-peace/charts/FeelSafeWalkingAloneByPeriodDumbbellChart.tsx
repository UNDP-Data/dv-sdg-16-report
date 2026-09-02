import { Colors } from '@undp/data-viz/Colors';
import { DumbbellChart } from '@undp/data-viz/DumbbellChart';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';
import feelSafeWalkingAloneByRegionPeriod from '@/data/chapters/01-peace/16-1-4/feel-safe-walking-alone-by-region-period.json';
import ChartNote from '../../components/ChartNote';

export default function FeelSafeWalkingAloneByPeriodDumbbellChart() {
  return (
    <DumbbellChart
      data={transformDataForGraph(feelSafeWalkingAloneByRegionPeriod, 'dumbbellChart', [
        { columnId: 'region', chartConfigId: 'label' },
        { columnId: ['period_2016_2020', 'period_2021_2025'], chartConfigId: 'x' },
      ])}
      orientation='horizontal'
      colorDomain={['2016–2020', '2021–2025']}
      colors={[Colors.gray, 'var(--blue-500)']}
      minValue={0}
      showTicks={false}
      showValues={false}
      leftMargin={innerWidth < 720 ? 135 : 220}
      minHeight={640}
      truncateBy={innerWidth < 720 ? 16 : undefined}
      relativeHeight={0.8}
      maxValue={100}
      numberDisplayOptions={{ suffix: '%' }}
      backgroundColor='background-soft'
      padding={CHART_PADDING}
      styles={{
        tooltip: {
          padding: 0,
        },
      }}
      tooltip={(d) => {
        const [period20162020, period20212025] = d.x as (number | null)[];
        const rows = [
          { label: '2016–2020', value: period20162020, color: Colors.gray },
          { label: '2021–2025', value: period20212025, color: 'var(--blue-500)' },
        ];
        return (
          <div className='flex flex-col gap-1 bg-white px-3 py-2'>
            <P size='sm' weight='semibold' marginBottom='none'>
              {d.label}
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
          Proportion of the population that feel safe walking alone at night around the area they
          live in, by region and period (2016–2020 and 2021–2025)
        </P>
      }
      sources={[
        {
          source:
            'UNODC, based on responses to the United Nations Survey of Crime Trends and Operations of Criminal Justice Systems, Multiple Indicator Cluster Surveys, and the Gallup World Poll.',
        },
      ]}
      footNote={
        <ChartNote
          content={
            <div className='flex flex-col gap-2'>
              <p>
                Regional aggregates refer to 3-year averages weighted by countries’ population size.
                Most surveys include the qualifications “after dark” or “at night” in the question
                wording.
              </p>
              <p>
                Data coverage: Averages for Oceania were removed, as only data for one country were
                available.
              </p>
            </div>
          }
        />
      }
      ariaLabel='Dumbbell chart showing the share of the population that feels safe walking alone at night, by region, comparing 2016–2020 and 2021–2025. Latin America and the Caribbean has the lowest share feeling safe in both periods.'
    />
  );
}
