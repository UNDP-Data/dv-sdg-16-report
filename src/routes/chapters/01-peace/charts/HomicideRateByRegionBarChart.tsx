import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';
import homicideRateByRegion from '@/data/chapters/01-peace/16-1-1/homicide-rate-by-region.json';

const WORLD_HOMICIDE_RATE = 5.1;

export default function HomicideRateByRegionBarChart() {
  return (
    <SimpleBarGraph
      data={homicideRateByRegion.map((d) => ({ label: d.region, size: d.value }))}
      orientation='horizontal'
      colors='var(--primary)'
      minValue={0}
      maxValue={20}
      showValues
      highlightedDataPoints={['Latin America and the Caribbean', 'Sub-Saharan Africa']}
      valueColor='var(--content-primary)'
      showTicks={false}
      numberDisplayOptions={{ precision: 1 }}
      barPadding={0.4}
      height={450}
      leftMargin={200}
      dimmedOpacity={0.4}
      padding={CHART_PADDING}
      backgroundColor='var(--background-soft)'
      refValues={[{ value: WORLD_HOMICIDE_RATE, text: `World ${WORLD_HOMICIDE_RATE}` }]}
      graphTitle={
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Rate of intentional homicide per 100,000 population, by region
        </P>
      }
      graphDescription='2024'
      sources={[
        {
          source:
            'UNODC estimates based on responses to the United Nations Survey of Crime Trends and Operations of Criminal Justice Systems and data from other sources reviewed by Member States.',
        },
      ]}
      ariaLabel='Horizontal bar chart showing the rate of intentional homicide per 100,000 population, by region, with a reference line for the global estimate. Latin America and the Caribbean and Sub-Saharan Africa have the highest rates.'
    />
  );
}
