import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { RadioGroup, RadioGroupItem } from '@undp/design-system-react/RadioGroup';
import { SegmentedControl } from '@undp/design-system-react/SegmentedControl';
import { P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import { CHART_PADDING } from '@/constants';
import byIncomeGroup from '@/data/chapters/03-inclusion/16-7-1-b-c/by-income-group.json';
import byRegion from '@/data/chapters/03-inclusion/16-7-1-b-c/by-region.json';

const PARITY = 1;
const WORLD_LABEL = 'World';

const SECTORS = {
  publicService: {
    label: 'Public service',
    valueKey: 'publicService',
    color: 'var(--tertiary)',
    worldColor: 'color-mix(in srgb, var(--tertiary) 70%, black)',
  },
  judiciary: {
    label: 'Judiciary',
    valueKey: 'judiciary',
    color: '#316DA8',
    worldColor: 'color-mix(in srgb, #316DA8 70%, black)',
  },
} as const;

type SectorKey = keyof typeof SECTORS;

const BREAKDOWNS = {
  regions: {
    label: 'Regions',
    categoryNoun: 'region',
    height: 360,
    rows: byRegion.map((d) => ({
      label: d.region,
      publicService: d.publicService,
      judiciary: d.judiciary,
    })),
  },
  incomeGroups: {
    label: 'Income groups',
    categoryNoun: 'income group',
    height: 240,
    rows: byIncomeGroup.map((d) => ({
      label: d.group,
      publicService: d.publicService,
      judiciary: d.judiciary,
    })),
  },
} as const;

type BreakdownKey = keyof typeof BREAKDOWNS;

const DOMAIN_BOUND = 0.7;

const COLOR_DOMAIN = ['Category', WORLD_LABEL];

export default function GapToParityBarChart() {
  const [breakdown, setBreakdown] = useState<BreakdownKey>('regions');
  const [sector, setSector] = useState<SectorKey>('publicService');

  const { categoryNoun, height, rows } = BREAKDOWNS[breakdown];
  const { label, valueKey, color, worldColor } = SECTORS[sector];

  const data = rows.map((d) => ({
    label: d.label,
    size: d[valueKey] - PARITY,
    color: d.label === WORLD_LABEL ? WORLD_LABEL : 'Category',
    data: { ratio: d[valueKey] },
  }));

  return (
    <div className='flex flex-col items-center gap-4 bg-white'>
      <SegmentedControl
        className='w-fit'
        value={breakdown}
        onValueChange={(value) => setBreakdown(value as BreakdownKey)}
        color='tertiary'
        variant='light'
        options={Object.entries(BREAKDOWNS).map(([value, config]) => ({
          value,
          label: config.label,
        }))}
      />

      <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
        <div className='flex flex-col gap-1'>
          <P marginBottom='none' className='font-heading font-semibold leading-sm'>
            The gap to parity in women's representation in public institutions, by {categoryNoun}
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
          colorDomain={COLOR_DOMAIN}
          colors={[color, worldColor]}
          showColorScale={false}
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
                <P
                  size='sm'
                  marginBottom='none'
                  className='flex items-center justify-between gap-4'
                >
                  <span>Representation ratio</span>
                  <span className='font-bold'>{ratio.toFixed(2)}</span>
                </P>
                <P
                  size='sm'
                  marginBottom='none'
                  className='flex items-center justify-between gap-4'
                >
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
          ariaLabel={`Diverging bar chart showing women's representation ratio in the ${label.toLowerCase()} by ${categoryNoun}, measured as the distance from parity at 1.00. Bars extending left indicate underrepresentation and bars extending right indicate overrepresentation. The world average is shown as the first bar in a darker shade.`}
        />
      </div>
    </div>
  );
}
