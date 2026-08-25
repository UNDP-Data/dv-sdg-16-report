import { ChoroplethMap } from '@undp/data-viz/ChoroplethMap';
import { Colors } from '@undp/data-viz/Colors';
import { P } from '@undp/design-system-react/Typography';
import { useMemo } from 'react';
import { CHART_PADDING } from '@/constants';
import nhriCompliance from '@/data/chapters/02-justice/16-1-a/nhri-paris-principles-compliance.json';
import ChartNote from '../../components/ChartNote';

const STATUS_LABELS: Record<string, string> = {
  D: 'No status',
  B: 'Partially compliant',
  A: 'Fully compliant',
};

const YEARS = [
  '2000',
  '2005',
  '2010',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
];

export default function NHRIComplianceChoroplethMap() {
  const data = useMemo(
    () =>
      nhriCompliance.flatMap((d) =>
        YEARS.map((year) => ({
          id: d.id,
          date: year,
          x: STATUS_LABELS[d[year as keyof typeof d]],
          data: {
            country: d.country,
            year,
          },
        })),
      ),
    [],
  );

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

      <ChoroplethMap
        data={data}
        colors={[
          Colors.primaryColors['blue-100'],
          Colors.primaryColors['blue-300'],
          Colors.sdgColors.sdg16,
        ]}
        colorDomain={['No status', 'Partially compliant', 'Fully compliant']}
        scaleType='categorical'
        colorLegendTitle='Accreditation status'
        timeline={{ enabled: true, autoplay: false, showOnlyActiveDate: true }}
        height={700}
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
                {d.data.year}
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
            <ChartNote content='Accreditation status is awarded by the Global Alliance of National Human Rights Institutions (GANHRI). “A” status means an institution is fully compliant with the Paris Principles, “B” status means partial compliance. “No status” covers countries whose institution has not been accredited as well as those without a National Human Rights Institution. Data are available for 2000, 2005, 2010 and annually from 2015 to 2025.' />
          </>
        }
        ariaLabel='World map showing the accreditation status of National Human Rights Institutions against the Paris Principles, with a timeline slider to move between years. The number of fully compliant institutions grew from 32 countries in 2000 to 89 in 2025, with no net increase between 2024 and 2025.'
      />
    </div>
  );
}
