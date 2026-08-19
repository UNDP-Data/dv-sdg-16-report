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
      colors={[Colors.genderColors.female, Colors.genderColors.male]}
      minValue={0}
      showTicks={false}
      leftMargin={220}
      relativeHeight={0.85}
      maxValue={100}
      numberDisplayOptions={{ suffix: '%' }}
      padding={CHART_PADDING}
      backgroundColor='var(--background-soft)'
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
