import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { RadioGroup, RadioGroupItem } from '@undp/design-system-react/RadioGroup';
import { P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import { CHART_PADDING } from '@/constants';
import representationByInstitutionalLevel from '@/data/chapters/03-inclusion/16-7-1-b-c/representation-by-institutional-level.json';
import ChartNote from '../../components/ChartNote';

export default function RepresentationByInstitutionalLevelBarChart() {
  const [selectedSector, setSelectedSector] = useState<'Public service' | 'Judiciary'>(
    'Public service',
  );

  return (
    <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Women's representation within the {selectedSector.toLowerCase()}
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
          {['Public service', 'Judiciary'].map((sector) => (
            <RadioGroupItem key={sector} value={sector} label={sector} />
          ))}
        </RadioGroup>
      </div>
      <SimpleBarGraph
        data={transformDataForGraph(
          representationByInstitutionalLevel.filter((d) => d.sector === selectedSector),
          'barChart',
          [
            { columnId: 'level', chartConfigId: 'label' },
            { columnId: 'ratio', chartConfigId: 'size' },
          ],
        )}
        labelOrder={representationByInstitutionalLevel
          .filter((d) => d.sector === selectedSector)
          .map((d) => d.level)}
        orientation='horizontal'
        colors={selectedSector === 'Public service' ? 'var(--accent-blue)' : 'var(--primary)'}
        animate
        minValue={0}
        maxValue={1.5}
        height={selectedSector === 'Public service' ? 260 : 180}
        maxBarThickness={32}
        showValues
        valueColor='var(--content-primary)'
        numberDisplayOptions={{ precision: 2, padZeros: true }}
        showTicks={false}
        truncateBy={innerWidth < 720 ? 16 : 35}
        leftMargin={innerWidth < 720 ? 135 : 220}
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
                {d.data.ratio === 1
                  ? 'At parity'
                  : `${Math.abs(d.data.ratio - 1).toFixed(2)} ${d.data.ratio < 1 ? 'below' : 'above'}`}
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
                Public service: Estimates are derived based on the following number of countries:
                General and Keyboard Clerks (31 countries), Administration Professionals (31
                countries), Business, Administration, Associate Professionals (30 countries), Other
                Managers (36 countries), Senior Government Officials (39 countries) using the latest
                available data in the period 2015–2025.
                <br />
                <br />
                Judiciary: Global estimates are based on 117 countries and territories for
                constitutional and supreme courts and 96 countries and territories for high-level
                and 83 countries and territories for low-level courts using the latest available
                data in the period 2015–2025. The vast majority of data are from high and
                upper-middle income countries.
              </>
            }
          />
        }
        ariaLabel={`Bar chart showing women's representation ratio within the ${selectedSector.toLowerCase()} by ${selectedSector === 'Public service' ? 'occupational level' : 'court level'}. Each bar runs from zero to the representation ratio, and a reference line marks parity at 1.00. Levels run from the most junior to the most senior, and representation falls as seniority rises.`}
      />
    </div>
  );
}
