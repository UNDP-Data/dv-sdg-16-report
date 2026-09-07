import { useQuery } from '@tanstack/react-query';
import { ChoroplethMap } from '@undp/data-viz/ChoroplethMap';
import { Colors } from '@undp/data-viz/Colors';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { Spacer } from '@undp/design-system-react/Spacer';
import { Spinner } from '@undp/design-system-react/Spinner';
import { P } from '@undp/design-system-react/Typography';
import ErrorEl from '@/components/ErrorEl';
import { CHART_PADDING } from '@/constants';
import ChartNote from '../../components/ChartNote';

function useData() {
  return useQuery({
    queryKey: ['nhri-paris-principles-compliance'],
    queryFn: () =>
      fetchAndParseJSON('/data/report/03-justice/16-1-a/nhri-paris-principles-compliance.json'),
  });
}

export default function NHRIComplianceChoroplethMap() {
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <ErrorEl />;

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
        height={750}
        scale={1.3}
        padding='0'
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
                {d.data.date}
              </P>
              <P size='sm' weight='bold' marginBottom='none' className='text-content-secondary'>
                {d.x}
              </P>
            </div>
          </div>
        )}
        footNote={
          <>
            <P marginBottom='none' size='xs' className='text-content-secondary'>
              The boundaries and names shown and the designations used on this map do not imply
              official endorsement or acceptance by the United Nations. <br />
              The final boundary between the Republic of Sudan and the Republic of South Sudan has
              not yet been determined.
              <br />
              Dotted line represents approximately the Line of Control in Jammu and Kashmir agreed
              upon by India and Pakistan. The final status of Jammu and Kashmir has not yet been
              agreed upon by the parties.
              <br />A dispute exists between the Governments of Argentina and the United Kingdom of
              Great Britain and Northern Ireland concerning sovereignty over the Falkland Islands
              (Malvinas).
            </P>
            <Spacer size='lg' />
            <P marginBottom='none' size='sm' className='text-content-secondary'>
              Source: Office of the United Nations High Commissioner for Human Rights (OHCHR) in
              collaboration with Global Alliance of National Human Rights Institutions (GANHRI)
            </P>
            <Spacer size='lg' />
            <ChartNote content='Accreditation status is awarded by the Global Alliance of National Human Rights Institutions (GANHRI). “A” status means an institution is fully compliant with the Paris Principles, “B” status means partial compliance. “No status” covers countries whose institution has not been accredited as well as those without a National Human Rights Institution. Data are available for 2000, 2005, 2010 and annually from 2015 to 2025.' />
          </>
        }
        ariaLabel='World map showing the accreditation status of National Human Rights Institutions against the Paris Principles, with a timeline slider to move between years. The number of fully compliant institutions grew from 32 countries in 2000 to 89 in 2025, with no net increase between 2024 and 2025.'
      />
    </div>
  );
}
