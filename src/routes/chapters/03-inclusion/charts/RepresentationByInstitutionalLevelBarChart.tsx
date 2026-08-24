import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { RadioGroup, RadioGroupItem } from '@undp/design-system-react/RadioGroup';
import { P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import { CHART_PADDING } from '@/constants';
import judiciaryByCourtLevel from '@/data/chapters/03-inclusion/16-7-1-b-c/judiciary-by-court-level.json';
import publicServiceByOccupation from '@/data/chapters/03-inclusion/16-7-1-b-c/public-service-by-occupation.json';

const PARITY = 1;

const SECTORS = {
  publicService: {
    label: 'Public service',
    categoryNoun: 'occupational level',
    color: 'var(--tertiary)',
    height: 260,
    rows: publicServiceByOccupation,
  },
  judiciary: {
    label: 'Judiciary',
    categoryNoun: 'court level',
    color: '#316DA8',
    height: 180,
    rows: judiciaryByCourtLevel,
  },
} as const;

type SectorKey = keyof typeof SECTORS;

const DOMAIN_BOUND = 0.7;

export default function RepresentationByInstitutionalLevelBarChart() {
  const [sector, setSector] = useState<SectorKey>('publicService');
  const { label, categoryNoun, color, height, rows } = SECTORS[sector];

  const data = rows.map((d) => ({
    label: d.level,
    size: d.ratio - PARITY,
    data: { ratio: d.ratio },
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
          value={sector}
          onValueChange={(value) => setSector(value as SectorKey)}
          color='tertiary'
        >
          {Object.entries(SECTORS).map(([value, config]) => (
            <RadioGroupItem key={value} value={value} label={config.label} />
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
        tooltip={(d) => {
          const ratio = (d.data as { ratio: number }).ratio;
          const gap = ratio - PARITY;
          return (
            <div className='flex flex-col gap-1 bg-white px-3 py-2'>
              <P size='sm' weight='semibold' marginBottom='none'>
                {d.label}
              </P>
              <P size='sm' marginBottom='none' className='flex items-center justify-between gap-4'>
                <span>Representation ratio</span>
                <span className='font-bold'>{ratio.toFixed(2)}</span>
              </P>
              <P size='sm' marginBottom='none' className='flex items-center justify-between gap-4'>
                <span>Gap to parity</span>
                <span className='font-bold'>
                  {gap === 0
                    ? 'At parity'
                    : `${Math.abs(gap).toFixed(2)} ${gap < 0 ? 'below' : 'above'}`}
                </span>
              </P>
            </div>
          );
        }}
        sources={[{ source: 'UNDP SDG 16 Data Hub' }]}
        ariaLabel={`Diverging bar chart showing women's representation ratio within the ${label.toLowerCase()} by ${categoryNoun}, measured as the distance from parity at 1.00. Levels run from the most junior to the most senior, and representation falls as seniority rises.`}
      />
    </div>
  );
}
