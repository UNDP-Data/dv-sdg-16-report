import { useQuery } from '@tanstack/react-query';
import { ChoroplethMap } from '@undp/data-viz/ChoroplethMap';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { convertTopoJsonUrlToGeoJson } from '@undp/data-viz/utils';
import { Spacer } from '@undp/design-system-react/Spacer';
import { Spinner } from '@undp/design-system-react/Spinner';
import { P } from '@undp/design-system-react/Typography';
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

function useMapShapeData() {
  return useQuery({
    queryKey: ['map-shape'],
    queryFn: () =>
      convertTopoJsonUrlToGeoJson('/data/topojson/country_area.json', 'BNDA_simplified_wgs84'),
  });
}

export default function AccessToInformationChoroplethMap() {
  const { data, isLoading, isError } = useData();
  const { data: mapData, isLoading: mapIsLoading, isError: mapIsError } = useMapShapeData();

  if (isLoading || mapIsLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError || !data || mapIsError || !mapData) return <ErrorEl />;
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
      </div>

      <ChoroplethMap
        data={transformDataForGraph(data, 'choroplethMap', [
          { columnId: 'id', chartConfigId: 'id' },
          { columnId: 'x', chartConfigId: 'x' },
        ])}
        mapData={mapData}
        colors={['var(--blue-500)']}
        colorDomain={[1]}
        showColorScale={false}
        scaleType='categorical'
        dimmedOpacity={1}
        zoomInteraction='button'
        mapNoDataColor='var(--gray-300)'
        showUNBorder
        height={650}
        projectionRotate={[-10, 0]}
        scale={1.25}
        padding='0'
        mapProjection='equalEarth'
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
