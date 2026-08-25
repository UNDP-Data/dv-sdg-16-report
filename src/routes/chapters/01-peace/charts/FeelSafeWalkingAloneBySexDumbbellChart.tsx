import { Colors } from '@undp/data-viz/Colors';
import { DumbbellChart } from '@undp/data-viz/DumbbellChart';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';
import feelSafeWalkingAloneByRegionSex from '@/data/chapters/01-peace/16-1-4/feel-safe-walking-alone-by-region-sex.json';
import ChartNote from '../../components/ChartNote';

export default function FeelSafeWalkingAloneBySexDumbbellChart() {
  return (
    <DumbbellChart
      data={transformDataForGraph(feelSafeWalkingAloneByRegionSex, 'dumbbellChart', [
        { columnId: 'region', chartConfigId: 'label' },
        { columnId: ['female', 'male'], chartConfigId: 'x' },
      ])}
      orientation='horizontal'
      colorDomain={['Women', 'Men']}
      backgroundColor='background-soft'
      colors={[Colors.genderColors.female, Colors.genderColors.male]}
      minValue={0}
      showTicks={false}
      leftMargin={innerWidth < 720 ? 100 : 220}
      minHeight={500}
      truncateBy={innerWidth < 720 ? 12 : undefined}
      relativeHeight={0.8}
      maxValue={100}
      numberDisplayOptions={{ suffix: '%' }}
      padding={CHART_PADDING}
      styles={{
        tooltip: {
          padding: 0,
        },
      }}
      tooltip={(d) => {
        const [female, male] = d.x as (number | null)[];
        const rows = [
          { label: 'Women', value: female, color: Colors.genderColors.female },
          { label: 'Men', value: male, color: Colors.genderColors.male },
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
          live in, by region and sex
        </P>
      }
      graphDescription='2021–2025'
      sources={[
        {
          source:
            'UNODC, based on responses to the United Nations Survey of Crime Trends and Operations of Criminal Justice Systems, Multiple Indicator Cluster Surveys, and the Gallup World Poll.',
        },
      ]}
      footNote={
        <ChartNote content='Regional aggregates refer to 3-year averages weighted by countries’ population size. Most surveys include the qualifications “after dark” or “at night” in the question wording. Averages for Oceania were removed, as only data for one country was available.' />
      }
      ariaLabel='Dumbbell chart showing the share of the population that feels safe walking alone at night, by region and sex, from 2021 to 2025. Women report feeling less safe than men in every region, with the widest gap in Northern Africa and Western Asia.'
    />
  );
}
