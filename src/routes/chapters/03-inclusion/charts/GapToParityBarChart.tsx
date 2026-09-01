import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { RadioGroup, RadioGroupItem } from '@undp/design-system-react/RadioGroup';
import { SegmentedControl } from '@undp/design-system-react/SegmentedControl';
import { P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import { CHART_PADDING } from '@/constants';
import ChartNote from '../../components/ChartNote';

const DATA = [
  {
    label: 'World',
    publicServiceValue: 0.8,
    publicServiceParityGap: -0.2,
    judiciaryValue: 0.88,
    judiciaryParityGap: -0.12,
    groupType: 'global',
  },
  {
    label: 'Europe and Northern America',
    publicServiceValue: 1.1,
    publicServiceParityGap: 0.1,
    judiciaryValue: 1.19,
    judiciaryParityGap: 0.19,
    groupType: 'region',
  },
  {
    label: 'Australia and New Zealand',
    publicServiceValue: 1.01,
    publicServiceParityGap: 0.01,
    judiciaryValue: 0.92,
    judiciaryParityGap: -0.08,
    groupType: 'region',
  },
  {
    label: 'Latin America and the Caribbean',
    publicServiceValue: 0.95,
    publicServiceParityGap: -0.05,
    judiciaryValue: 1.1,
    judiciaryParityGap: 0.1,
    groupType: 'region',
  },
  {
    label: 'Eastern and South-Eastern Asia',
    publicServiceValue: 0.82,
    publicServiceParityGap: -0.18,
    judiciaryValue: 0.84,
    judiciaryParityGap: -0.16,
    groupType: 'region',
  },
  {
    label: 'Oceania excluding Australia and New Zealand',
    publicServiceValue: 0.77,
    publicServiceParityGap: -0.23,
    judiciaryValue: 0.48,
    judiciaryParityGap: -0.52,
    groupType: 'region',
  },
  {
    label: 'Northern Africa and Western Asia',
    publicServiceValue: 0.58,
    publicServiceParityGap: -0.42,
    judiciaryValue: 0.53,
    judiciaryParityGap: -0.47,
    groupType: 'region',
  },
  {
    label: 'Sub-Saharan Africa',
    publicServiceValue: 0.57,
    publicServiceParityGap: -0.43,
    judiciaryValue: 0.7,
    judiciaryParityGap: -0.3,
    groupType: 'region',
  },
  {
    label: 'Central and Southern Asia',
    publicServiceValue: 0.52,
    publicServiceParityGap: -0.48,
    judiciaryValue: 0.46,
    judiciaryParityGap: -0.54,
    groupType: 'region',
  },
  {
    label: 'High income',
    publicServiceValue: 1.07,
    publicServiceParityGap: 0.07,
    judiciaryValue: 1.07,
    judiciaryParityGap: 0.07,
    groupType: 'incomeGroup',
  },
  {
    label: 'Upper-middle income',
    publicServiceValue: 0.88,
    publicServiceParityGap: -0.12,
    judiciaryValue: 0.85,
    judiciaryParityGap: -0.15,
    groupType: 'incomeGroup',
  },
  {
    label: 'Lower-middle income',
    publicServiceValue: 0.55,
    publicServiceParityGap: -0.45,
    judiciaryValue: 0.66,
    judiciaryParityGap: -0.34,
    groupType: 'incomeGroup',
  },
  {
    label: 'Low income',
    publicServiceValue: 0.36,
    publicServiceParityGap: -0.64,
    judiciaryValue: 0.42,
    judiciaryParityGap: -0.58,
    groupType: 'incomeGroup',
  },
];

const DOMAIN_BOUND = 0.7;

export default function GapToParityBarChart() {
  const [selectedGrouping, setSelectedGrouping] = useState<'region' | 'incomeGroup'>('region');
  const [selectedSector, setSelectedSector] = useState<'publicService' | 'judiciary'>(
    'publicService',
  );

  return (
    <div className='flex flex-col items-center gap-4 bg-white'>
      <SegmentedControl
        className='w-fit'
        classNames={{ items: 'cursor-pointer' }}
        value={selectedGrouping}
        onValueChange={(value) => setSelectedGrouping(value as 'region' | 'incomeGroup')}
        color='tertiary'
        variant='light'
        options={[
          { value: 'region', label: 'Regions' },
          { value: 'incomeGroup', label: 'Income groups' },
        ]}
      />

      <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
        <div className='flex flex-col gap-1'>
          <P marginBottom='none' className='font-heading font-semibold leading-sm'>
            The gap to parity in women's representation in public institutions
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
            onValueChange={(value) => setSelectedSector(value as 'publicService' | 'judiciary')}
            color='tertiary'
          >
            {[
              { value: 'publicService', label: 'Public service' },
              { value: 'judiciary', label: 'Judiciary' },
            ].map((g) => (
              <RadioGroupItem key={g.value} value={g.value} label={g.label} />
            ))}
          </RadioGroup>
        </div>

        <SimpleBarGraph
          data={transformDataForGraph(
            [...DATA].filter((d) => d.groupType === selectedGrouping || d.groupType === 'global'),
            'barChart',
            [
              { columnId: 'label', chartConfigId: 'label' },
              { columnId: 'groupType', chartConfigId: 'color' },
              { columnId: `${selectedSector}ParityGap`, chartConfigId: 'size' },
            ],
          )}
          orientation='horizontal'
          colorDomain={['global', selectedGrouping]}
          colors={
            selectedSector === 'publicService'
              ? ['color-mix(in srgb, var(--orange-600) 70%, black)', 'var(--orange-600)']
              : ['color-mix(in srgb, var(--violet-600) 70%, black)', 'var(--violet-600)']
          }
          showColorScale={false}
          animate
          minValue={-DOMAIN_BOUND}
          maxValue={DOMAIN_BOUND}
          height={selectedGrouping === 'region' ? 360 : 240}
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
                <span className='font-bold'>
                  {(selectedSector === 'publicService'
                    ? d.data.publicServiceValue
                    : d.data.judiciaryValue
                  ).toFixed(2)}
                </span>
              </P>
              <P size='sm' marginBottom='none' className='flex items-center justify-between gap-4'>
                <span>Gap to parity</span>
                <span className='font-bold'>
                  {(selectedSector === 'publicService'
                    ? d.data.publicServiceParityGap
                    : d.data.judiciaryParityGap) === 0
                    ? 'At parity'
                    : `${Math.abs(selectedSector === 'publicService' ? d.data.publicServiceParityGap : d.data.judiciaryParityGap).toFixed(2)} ${selectedSector === 'publicService' ? (d.data.publicServiceParityGap < 0 ? 'below' : 'above') : d.data.judiciaryParityGap < 0 ? 'below' : 'above'}`}
                </span>
              </P>
            </div>
          )}
          sources={[
            {
              source: 'UNDP, Women in the Judiciary Global Dashboard',
            },
          ]}
          footNote={
            <ChartNote
              content={
                <>
                  Regions: Estimates are derived based on 155 countries and territories for the
                  public service institutions and 131 countries and territories for the judiciary
                  using the latest available data in the period 2015–2025. Previously published
                  estimates were based on 155 countries for public service and 106 countries for the
                  judiciary. Regional estimates for 16.7.1b and 16.7.1c are based on the following
                  number of countries respectively: Europe and Northern America (43 and 45), Latin
                  America and the Caribbean (19 and 19), Eastern and South-Eastern Asia (15 and 5),
                  Sub-Saharan Africa (36 and 24), Oceania including Australia and New Zealand (14
                  and 10), Northern Africa and Western Asia (16 and 20), Central and Southern Asia
                  (12 and 7).
                  <br />
                  <br />
                  Income: Estimates by countries income level for 16.7.1b and 16.7.1c are based on
                  the following number of countries respectively: High income (54 and 61), Upper
                  middle income (39 and 34), Lower middle income (40 and 25), Low income (26 and
                  11).
                </>
              }
            />
          }
          ariaLabel={`Diverging bar chart showing women's representation ratio in the ${selectedSector === 'publicService' ? 'public service' : 'judiciary'} by ${selectedGrouping === 'region' ? 'region' : 'income group'}, measured as the distance from parity at 1.00. Bars extending left indicate underrepresentation and bars extending right indicate overrepresentation. The world average is shown as the first bar in a darker shade.`}
        />
      </div>
    </div>
  );
}
