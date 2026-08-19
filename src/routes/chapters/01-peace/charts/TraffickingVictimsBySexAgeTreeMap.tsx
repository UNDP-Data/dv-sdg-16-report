import { TreeMapGraph } from '@undp/data-viz/TreeMapGraph';
import { P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';
import traffickingVictimsBySexAge from '@/data/chapters/01-peace/16-2-2/trafficking-victims-by-sex-age.json';

export default function TraffickingVictimsBySexAgeTreeMap() {
  return (
    <TreeMapGraph
      data={traffickingVictimsBySexAge.map((d) => ({ label: d.group, size: d.value }))}
      sources={[{ source: 'UNODC' }]}
      showLabels
      colors='var(--primary)'
      numberDisplayOptions={{ suffix: '%' }}
      graphTitle={
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Share of detected victims of trafficking, by victim sex and age
        </P>
      }
      graphDescription='2024 or most recent year available'
      padding={CHART_PADDING}
      backgroundColor='var(--background-soft)'
    />
  );
}
