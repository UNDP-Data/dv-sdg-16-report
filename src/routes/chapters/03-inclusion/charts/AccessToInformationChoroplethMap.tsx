import { ChoroplethMap } from '@undp/data-viz/ChoroplethMap';
import { DropdownSelect, type OptionType } from '@undp/design-system-react/DropdownSelect';
import { P } from '@undp/design-system-react/Typography';
import { useMemo, useState } from 'react';
import { CHART_PADDING } from '@/constants';
import accessToInformation from '@/data/chapters/03-inclusion/16-10-2/access-to-information.json';

export default function AccessToInformationChoroplethMap() {
  const [highlightedCountry, setHighlightedCountry] = useState<OptionType | null>(null);

  const countryOptions: OptionType[] = useMemo(
    () =>
      [...accessToInformation]
        .sort((a, b) => a.country.localeCompare(b.country))
        .map((d) => ({ value: d.id, label: d.country })),
    [],
  );

  const highlightedStatus = useMemo(() => {
    if (!highlightedCountry) return null;
    return accessToInformation.find((d) => d.id === highlightedCountry.value) ?? null;
  }, [highlightedCountry]);

  return (
    <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
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
          <DropdownSelect
            options={countryOptions}
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
        data={accessToInformation.map((d) => ({ id: d.id, x: d.x, data: { country: d.country } }))}
        colors={['var(--blue-500)']}
        colorDomain={[1]}
        showColorScale={false}
        scaleType='categorical'
        colorLegendTitle='Guarantees for access to information'
        highlightedIds={highlightedCountry ? [highlightedCountry.value as string] : []}
        dimmedOpacity={highlightedCountry ? 0.3 : 1}
        mapProjection='naturalEarth'
        zoomInteraction='button'
        height={600}
        scale={1.3}
        padding='0'
        sources={[{ source: 'Global SDG Database' }]}
        footNote={
          <P marginBottom='none' size='sm' className='text-content-secondary'>
            The designations employed and the presentation of material in this website do not imply
            the expression of any opinion whatsoever on the part of the Secretariat of the United
            Nations, UNDP, UNICEF and the other partnering UN entities, concerning the legal status
            of any country, territory, city or area or of its authorities, or concerning the
            delimitation of its frontiers or boundaries. The term “country” as used in this material
            also refers, as appropriate, to territories or areas.
          </P>
        }
        tooltip='{{data.country}}'
        ariaLabel='World map showing which countries have adopted constitutional, statutory and/or policy guarantees for public access to information in 2025. Most countries shown have adopted such guarantees.'
      />
    </div>
  );
}
