import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { RadioGroup, RadioGroupItem } from '@undp/design-system-react/RadioGroup';
import { SegmentedControl } from '@undp/design-system-react/SegmentedControl';
import { P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import { CHART_PADDING } from '@/constants';
import representationByIncomeGroup from '@/data/chapters/03-inclusion/16-7-1-b-c/representation-by-income-group.json';
import representationByRegion from '@/data/chapters/03-inclusion/16-7-1-b-c/representation-by-region.json';
import ChartNote from '../../components/ChartNote';

export default function RepresentationByRegionAndIncomeGroupsBarChart() {
  const [selectedGrouping, setSelectedGrouping] = useState<'region' | 'incomeGroup'>('region');
  const [selectedSector, setSelectedSector] = useState<'Public service' | 'Judiciary'>(
    'Public service',
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

      <div
        className='flex w-full flex-col gap-4 bg-background-soft'
        style={{ padding: CHART_PADDING }}
      >
        <div className='flex flex-col gap-1'>
          <P marginBottom='none' className='font-heading font-semibold leading-sm'>
            Women's representation within the {selectedSector.toLocaleLowerCase()}
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
            color='blue'
          >
            <RadioGroupItem value='Public service' label='Public service' />
            <RadioGroupItem value='Judiciary' label='Judiciary' />
          </RadioGroup>
        </div>

        <SimpleBarGraph
          data={transformDataForGraph(
            selectedGrouping === 'region' ? representationByRegion : representationByIncomeGroup,
            'barChart',
            [
              { columnId: 'label', chartConfigId: 'label' },
              { columnId: 'groupType', chartConfigId: 'color' },
              {
                columnId: selectedSector === 'Public service' ? 'publicService' : 'judiciary',
                chartConfigId: 'size',
              },
            ],
          )}
          labelOrder={(selectedGrouping === 'region'
            ? representationByRegion
            : representationByIncomeGroup
          ).map((d) => d.label)}
          orientation='horizontal'
          colorDomain={['global', selectedGrouping]}
          colors={
            selectedSector === 'Public service'
              ? ['color-mix(in srgb, var(--blue-600) 70%, black)', 'var(--blue-600)']
              : ['color-mix(in srgb, var(--primary) 70%, black)', 'var(--primary)']
          }
          showColorScale={false}
          animate
          minValue={0}
          maxValue={1.3}
          height={selectedGrouping === 'region' ? 360 : 240}
          maxBarThickness={32}
          showValues
          valueColor='var(--content-primary)'
          numberDisplayOptions={{ precision: 2, padZeros: true }}
          showTicks={false}
          truncateBy={innerWidth < 720 ? 16 : undefined}
          leftMargin={
            selectedGrouping === 'region'
              ? innerWidth < 720
                ? 135
                : 240
              : innerWidth < 720
                ? 110
                : 150
          }
          rightMargin={10}
          topMargin={30}
          padding='0'
          backgroundColor={false}
          hideAxisLine
          refValues={[
            {
              value: 1,
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
            const value = d.data[
              selectedSector === 'Public service' ? 'publicService' : 'judiciary'
            ] as number;
            const gap = value - 1;
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
                  <span className='font-bold'>{value.toFixed(2)}</span>
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
          ariaLabel={`Bar chart showing women's representation ratio in the ${selectedSector === 'Public service' ? 'public service' : 'judiciary'} by ${selectedGrouping === 'region' ? 'region' : 'income group'}. Each bar runs from zero to the representation ratio, and a reference line marks parity at 1.00. Bars falling short of the line indicate underrepresentation and bars passing it indicate overrepresentation. The world average is shown as the first bar in a darker shade.`}
        />
      </div>
    </div>
  );
}
