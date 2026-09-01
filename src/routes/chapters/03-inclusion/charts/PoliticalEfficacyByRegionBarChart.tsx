import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';
import politicalEfficacyByRegion from '@/data/chapters/03-inclusion/16-7-2/political-efficacy-by-region.json';
import ChartNote from '../../components/ChartNote';

const WORLD_POLITICAL_EFFICACY = 44.4;

export default function PoliticalEfficacyByRegionBarChart() {
  return (
    <SimpleBarGraph
      data={politicalEfficacyByRegion.map((d) => ({ label: d.region, size: d.value }))}
      orientation='horizontal'
      colors='var(--tertiary)'
      animate
      showValues
      valueColor='var(--content-primary)'
      showTicks={false}
      numberDisplayOptions={{ precision: 1, suffix: '%' }}
      height={450}
      maxBarThickness={32}
      leftMargin={innerWidth < 720 ? 135 : 200}
      truncateBy={innerWidth < 720 ? 16 : undefined}
      dimmedOpacity={0.4}
      padding={CHART_PADDING}
      backgroundColor='var(--background-soft)'
      refValues={[{ value: WORLD_POLITICAL_EFFICACY, text: `World ${WORLD_POLITICAL_EFFICACY}%` }]}
      graphTitle={
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Proportion of the population who believe decision-making is inclusive, by region
        </P>
      }
      graphDescription='2025 or latest year available'
      sources={[{ source: 'UNDP' }]}
      footNote={
        <ChartNote content='These estimates are derived from data covering 83 countries, using the latest available information from 2015 to 2025. The question asked is: “How much would you say the political system in your country allows people like you to have a say in what the government does?”.' />
      }
      ariaLabel='Horizontal bar chart showing the proportion of the population who believe decision-making is inclusive, by region, with a reference line for the global estimate of 44.4%. Europe and Northern America has the lowest share, at 30.3%, while Central and Southern Asia has the highest, at 70%.'
    />
  );
}
