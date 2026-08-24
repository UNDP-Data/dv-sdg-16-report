import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { RadioGroup, RadioGroupItem } from '@undp/design-system-react/RadioGroup';
import { P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import { CHART_PADDING } from '@/constants';
import ChartNote from '../../components/ChartNote';

const YEARS = ['2025', '2015'] as const;
type Year = (typeof YEARS)[number];

const REGIONS = [
  { label: 'Eastern Asia and South-Eastern Asia', y2025: 82.8, y2015: 75.2 },
  { label: 'Central Asia and Southern Asia', y2025: 63.3, y2015: 58.7 },
  { label: 'Europe and Northern America', y2025: 58.4, y2015: 57.1 },
  { label: 'Western Asia and Northern Africa', y2025: 57.1, y2015: 57.1 },
  { label: 'Latin America and the Caribbean', y2025: 52.8, y2015: 51.6 },
  { label: 'Sub-Saharan Africa', y2025: 46.4, y2015: 42.5 },
] as const;

export default function HealthcareSatisfactionByRegionBarChart() {
  const [year, setYear] = useState<Year>('2025');

  return (
    <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Proportion of the population who say that they are satisfied with the availability of
          quality healthcare, by region
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          {year} or latest year available
        </P>
      </div>

      <div>
        <P size='sm' marginBottom='none'>
          Select year
        </P>
        <RadioGroup value={year} onValueChange={(value) => setYear(value as Year)} color='tertiary'>
          {YEARS.map((y) => (
            <RadioGroupItem key={y} value={y} label={y} />
          ))}
        </RadioGroup>
      </div>

      <SimpleBarGraph
        data={REGIONS.map((r) => ({
          label: r.label,
          size: year === '2025' ? r.y2025 : r.y2015,
        }))}
        labelOrder={REGIONS.map((r) => r.label)}
        orientation='horizontal'
        colors='var(--tertiary)'
        minValue={0}
        animate
        maxValue={100}
        maxBarThickness={32}
        height={270}
        valueColor='var(--content-primary)'
        showTicks={false}
        numberDisplayOptions={{ suffix: '%', precision: 1 }}
        leftMargin={220}
        padding='0'
        topMargin={0}
        sources={[{ source: 'UNDP, Gallup World Poll' }]}
        footNote={
          <ChartNote content='Regional estimates are based on the following number of countries respectively: Europe and Northern America (18), Latin America and the Caribbean (11), Eastern Asia and South-Eastern Asia (9), Sub-Saharan Africa (31), Western Asia and Northern Africa (15), Central Asia and Southern Asia (11).' />
        }
        ariaLabel={`Horizontal bar chart showing the proportion of the population satisfied with the availability of quality healthcare, by region, in ${year}. Eastern Asia and South-Eastern Asia has the highest satisfaction and Sub-Saharan Africa has the lowest.`}
      />
    </div>
  );
}
