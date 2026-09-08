import { useQuery } from '@tanstack/react-query';
import { ChoroplethMap } from '@undp/data-viz/ChoroplethMap';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { DropdownSelect, type OptionType } from '@undp/design-system-react/DropdownSelect';
import { Spacer } from '@undp/design-system-react/Spacer';
import { Spinner } from '@undp/design-system-react/Spinner';
import { P } from '@undp/design-system-react/Typography';
import { useMemo, useState } from 'react';
import ErrorEl from '@/components/ErrorEl';
import { CHART_PADDING } from '@/constants';

interface DataType {
  id: string;
  country: string;
  x: number;
}

function useData() {
  return useQuery({
    queryKey: ['access-to-information'],
    queryFn: () =>
      fetchAndParseJSON('/data/report/04-inclusion/16-10-2/access-to-information.json') as Promise<
        DataType[]
      >,
  });
}

export default function AccessToInformationChoroplethMap() {
  const [highlightedCountry, setHighlightedCountry] = useState<OptionType | null>(null);
  const { data, isLoading, isError } = useData();
  const highlightedStatus = useMemo(() => {
    if (!highlightedCountry) return null;
    return data?.find((d) => d.id === highlightedCountry.value) ?? null;
  }, [highlightedCountry, data]);

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError || !data) return <ErrorEl />;
  return (
    <div className='flex flex-col gap-4' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <div className='flex flex-col gap-1'>
          <P marginBottom='none' className='font-heading font-semibold leading-sm'>
            Countries with constitutional, statutory and/or policy guarantees for access to
            information
          </P>
          <P marginBottom='none' size='sm' className='text-content-secondary'>
            2025
          </P>
        </div>
        <div className='w-56'>
          {data && (
            <DropdownSelect
              options={data
                .sort((a, b) => a.country.localeCompare(b.country))
                .map((d) => ({ value: d.id, label: d.country }))}
              value={highlightedCountry}
              onChange={(option) => setHighlightedCountry(option as OptionType | null)}
              isClearable
              isSearchable
              placeholder='Highlight a country...'
              variant='light'
              size='sm'
              color='primary'
              aria-label='Search and select a country to highlight on the map'
            />
          )}
        </div>
      </div>
      <P marginBottom='none' size='sm' className={`${highlightedCountry ? '' : 'invisible'}`}>
        {highlightedCountry
          ? `${highlightedCountry.label}: ${
              highlightedStatus
                ? 'has constitutional, statutory and/or policy guarantees for access to information'
                : 'no guarantees reported'
            }`
          : 'placeholder'}
      </P>

      <ChoroplethMap
        data={transformDataForGraph(data, 'choroplethMap', [
          { columnId: 'id', chartConfigId: 'id' },
          { columnId: 'x', chartConfigId: 'x' },
        ])}
        colors={['var(--blue-500)']}
        colorDomain={[1]}
        showColorScale={false}
        scaleType='categorical'
        colorLegendTitle='Guarantees for access to information'
        highlightedIds={highlightedCountry ? [highlightedCountry.value as string] : []}
        dimmedOpacity={highlightedCountry ? 0.3 : 1}
        mapProjection='naturalEarth'
        zoomInteraction='button'
        height={650}
        scale={1.3}
        padding='0'
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
              Source: Global SDG Database
            </P>
          </>
        }
        tooltip='{{data.country}}'
        ariaLabel='World map showing which countries have adopted constitutional, statutory and/or policy guarantees for public access to information in 2025. Most countries shown have adopted such guarantees.'
      />
    </div>
  );
}
