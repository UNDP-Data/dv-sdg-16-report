import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { RadioGroup, RadioGroupItem } from '@undp/design-system-react/RadioGroup';
import { P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import { CHART_PADDING } from '@/constants';

const SECTORS = [
  {
    label: 'Public service',
    categoryNoun: 'occupational level',
    color: 'var(--accent-orange)',
    height: 260,
    rows: [
      { level: 'Senior government officials', ratio: 0.78, parityGap: -0.22 },
      { level: 'Other managers', ratio: 0.98, parityGap: -0.02 },
      { level: 'Business, administration and associate professionals', ratio: 1.1, parityGap: 0.1 },
      { level: 'Administration professionals', ratio: 1.27, parityGap: 0.27 },
      { level: 'General and keyboard clerks', ratio: 1.4, parityGap: 0.4 },
    ],
  },
  {
    label: 'Judiciary',
    categoryNoun: 'court level',
    color: 'var(--accent-violet)',
    height: 180,
    rows: [
      { level: 'Constitutional and supreme courts', ratio: 0.76, parityGap: -0.24 },
      { level: 'High-level courts', ratio: 0.91, parityGap: -0.09 },
      { level: 'Low-level courts', ratio: 1.12, parityGap: 0.12 },
    ],
  },
];

const DOMAIN_BOUND = 0.7;

export default function RepresentationByInstitutionalLevelBarChart() {
  const [selectedSector, setSelectedSector] = useState<'Public service' | 'Judiciary'>(
    'Public service',
  );
  const { label, categoryNoun, color, height, rows } =
    SECTORS.find((d) => d.label === selectedSector) || SECTORS[0];

  const data = rows.map((d) => ({
    label: d.level,
    size: d.parityGap,
    data: { ...d },
  }));

  return (
    <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          The gap to parity in women's representation within the {label.toLowerCase()}, by{' '}
          {categoryNoun}
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          2025 or latest year available
        </P>
      </div>

      <div>
        <P size='sm' marginBottom='none'>
          Select sector
        </P>
        <RadioGroup
          value={selectedSector}
          onValueChange={(value) => setSelectedSector(value as 'Public service' | 'Judiciary')}
          color='tertiary'
        >
          {SECTORS.map((sector) => (
            <RadioGroupItem key={sector.label} value={sector.label} label={sector.label} />
          ))}
        </RadioGroup>
      </div>
      <SimpleBarGraph
        data={data}
        labelOrder={data.map((d) => d.label)}
        orientation='horizontal'
        colors={color}
        animate
        minValue={-DOMAIN_BOUND}
        maxValue={DOMAIN_BOUND}
        height={height}
        maxBarThickness={32}
        showValues
        valueColor='var(--content-primary)'
        numberDisplayOptions={{ precision: 2, padZeros: true }}
        showTicks={false}
        truncateBy={100}
        leftMargin={10}
        rightMargin={10}
        topMargin={30}
        padding='0'
        backgroundColor={false}
        hideAxisLine
        refValues={[
          {
            value: 0,
            text: 'Parity (1.00)',
            color: 'var(--content-primary)',
            styles: { line: { strokeDasharray: 'none', strokeWidth: 1 } },
          },
        ]}
        styles={{
          tooltip: {
            padding: 0,
          },
        }}
        tooltip={(d) => (
          <div className='flex flex-col gap-1 bg-white px-3 py-2'>
            <P size='sm' weight='semibold' marginBottom='none'>
              {d.label}
            </P>
            <P size='sm' marginBottom='none' className='flex items-center justify-between gap-4'>
              <span>Representation ratio</span>
              <span className='font-bold'>{d.data.ratio.toFixed(2)}</span>
            </P>
            <P size='sm' marginBottom='none' className='flex items-center justify-between gap-4'>
              <span>Gap to parity</span>
              <span className='font-bold'>
                {d.data.parityGap === 0
                  ? 'At parity'
                  : `${Math.abs(d.data.parityGap).toFixed(2)} ${d.data.parityGap < 0 ? 'below' : 'above'}`}
              </span>
            </P>
          </div>
        )}
        sources={[{ source: 'UNDP SDG 16 Data Hub' }]}
        ariaLabel={`Diverging bar chart showing women's representation ratio within the ${label.toLowerCase()} by ${categoryNoun}, measured as the distance from parity at 1.00. Levels run from the most junior to the most senior, and representation falls as seniority rises.`}
      />
    </div>
  );
}
