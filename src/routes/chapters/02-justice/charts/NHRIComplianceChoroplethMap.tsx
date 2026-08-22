import { ChoroplethMap } from '@undp/data-viz/ChoroplethMap';
import { RadioGroup, RadioGroupItem } from '@undp/design-system-react/RadioGroup';
import { P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import { CHART_PADDING } from '@/constants';
import nhriCompliance from '@/data/chapters/02-justice/16-1-a/nhri-paris-principles-compliance.json';
import ChartNote from '../../components/ChartNote';

const STATUS_LABELS: Record<string, string> = {
  D: 'No status',
  B: 'Partially compliant',
  A: 'Fully compliant',
};

const YEARS = ['2015', '2025'] as const;

type Year = (typeof YEARS)[number];

export default function NHRIComplianceChoroplethMap() {
  const [year, setYear] = useState<Year>('2025');

  const fullyCompliant = nhriCompliance.filter((d) => d[year] === 'A').length;
  const partiallyCompliant = nhriCompliance.filter((d) => d[year] === 'B').length;

  return (
    <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          National Human Rights Institutions compliant with the Paris Principles
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          UN Member States and observers, by accreditation status
        </P>
      </div>

      <div>
        <P size='sm' marginBottom='2xs'>
          Select year
        </P>
        <RadioGroup
          value={year}
          onValueChange={(value) => setYear(value as Year)}
          color='secondary'
        >
          {YEARS.map((value) => (
            <RadioGroupItem key={value} value={value} label={value} />
          ))}
        </RadioGroup>
      </div>

      <ChoroplethMap
        data={nhriCompliance.map((d) => ({
          id: d.id,
          x: STATUS_LABELS[d[year]],
          data: { country: d.country },
        }))}
        colors={['var(--light-blue)', 'var(--light-orange)', 'var(--secondary)']}
        colorDomain={['No status', 'Partially compliant', 'Fully compliant']}
        scaleType='categorical'
        colorLegendTitle='Accreditation status'
        height={600}
        scale={1.3}
        padding='0'
        sources={[
          {
            source:
              'Office of the United Nations High Commissioner for Human Rights (OHCHR) in collaboration with Global Alliance of National Human Rights Institutions (GANHRI)',
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
              {d.data.country}
            </P>
            <div className='flex items-center justify-between gap-4'>
              <P size='sm' marginBottom='none' className='flex items-center gap-1.5'>
                {year}
              </P>
              <P size='sm' weight='bold' marginBottom='none' className='text-content-secondary'>
                {d.x}
              </P>
            </div>
          </div>
        )}
        footNote={
          <>
            <P marginBottom='none' size='sm' className='text-content-secondary'>
              The designations employed and the presentation of material on this map do not imply
              the expression of any opinion whatsoever on the part of the Secretariat of the United
              Nations or UNDP concerning the legal status of any country, territory, city or area or
              its authorities, or concerning the delimitation of its frontiers or boundaries.
            </P>
            <ChartNote content='Accreditation status is awarded by the Global Alliance of National Human Rights Institutions (GANHRI). “A” status means an institution is fully compliant with the Paris Principles, “B” status means partial compliance. “No status” covers countries whose institution has not been accredited as well as those without a National Human Rights Institution.' />
          </>
        }
        ariaLabel={`World map showing the accreditation status of National Human Rights Institutions against the Paris Principles in ${year}. In ${year}, ${fullyCompliant} countries had fully compliant institutions and ${partiallyCompliant} had partially compliant institutions.`}
      />
    </div>
  );
}
