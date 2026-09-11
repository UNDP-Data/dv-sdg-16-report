import { useQuery } from '@tanstack/react-query';
import { Colors } from '@undp/data-viz/Colors';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { ScatterPlot } from '@undp/data-viz/ScatterPlot';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { numberFormattingFunction } from '@undp/data-viz/utils';
import { Spinner } from '@undp/design-system-react/Spinner';
import { P } from '@undp/design-system-react/Typography';
import ErrorEl from '@/components/ErrorEl';
import { CHART_PADDING } from '@/constants';

function useData() {
  return useQuery({
    queryKey: ['firearms-tracing-by-country'],
    queryFn: () =>
      fetchAndParseJSON('/data/report/03-justice/16-4-2/firearms-tracing-by-country.json'),
  });
}

export default function FirearmsTracingScatterPlot() {
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <ErrorEl />;
  return (
    <ScatterPlot
      data={transformDataForGraph(data.countryData, 'scatterPlot', [
        { columnId: 'country', chartConfigId: 'label' },
        { columnId: 'sdgValue', chartConfigId: 'x' },
        { columnId: 'seizures', chartConfigId: 'y' },
        { columnId: 'region', chartConfigId: 'color' },
      ])}
      colorDomain={[
        'Europe and Northern America',
        'Latin America and the Caribbean',
        'Northern Africa and Western Asia',
        'Sub-Saharan Africa',
        'Oceania',
      ]}
      colors={[
        Colors.sdgColors.sdg16,
        'var(--secondary)',
        'var(--tertiary)',
        Colors.genderColors.female,
        'var(--primary)',
      ]}
      showNAColor={false}
      showLabels={false}
      radius={4}
      minXValue={0}
      leftMargin={24}
      bottomMargin={0}
      maxXValue={100}
      minYValue={0}
      minHeight={600}
      noOfXTicks={5}
      xAxisTitle='Average SDG value'
      yAxisTitle='Seized firearms'
      rightMargin={24}
      height={innerWidth < 720 ? 480 : 700}
      backgroundColor={false}
      padding={CHART_PADDING}
      xNumberDisplayOptions={{ suffix: '%', precision: 1 }}
      graphTitle={
        <>
          <P marginBottom='none' weight='semibold' className='font-heading leading-sm'>
            Tracing success relative to average seizure volumes, by country
          </P>
          <P marginBottom='none' size='sm' className='text-content-secondary'>
            2016–2024
          </P>
        </>
      }
      styles={{ tooltip: { padding: 0 } }}
      tooltip={(d) => (
        <div className='flex w-56 flex-col gap-3 bg-white px-3 py-2'>
          <div className='flex flex-col'>
            <P marginBottom='none' size='sm' weight='bold'>
              {d.data.country}
            </P>
            <P marginBottom='none' size='xs' className='text-content-secondary'>
              {d.data.region}
            </P>
          </div>
          <div className='flex flex-col gap-1'>
            <P marginBottom='none' size='xs' className='text-content-secondary'>
              Successfully traced
            </P>
            <div className='flex items-center gap-2'>
              <P marginBottom='none' size='sm' weight='bold'>
                {numberFormattingFunction(d.data.sdgValue, undefined, 1)}%
              </P>
              <div className='h-3 flex-1 bg-content-secondary/10'>
                <div
                  className='h-full bg-content-secondary'
                  style={{ width: `${d.data.sdgValue}%` }}
                />
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-1'>
            <P marginBottom='none' size='xs' className='text-content-secondary'>
              Seized firearms
            </P>
            <P marginBottom='none' size='sm' weight='bold'>
              {d.data.seizures.toLocaleString('en')}
            </P>
          </div>
        </div>
      )}
      sources={[
        {
          source:
            'UNODC Illicit Arms Flow Questionnaire (IAFQ). Simple averages calculated based on data submitted by 40 Member States.',
        },
      ]}
      ariaLabel='Scatter plot showing average yearly seized firearms against the share successfully traced for 40 countries between 2016 and 2024, coloured by region. Brazil records by far the highest seizure volumes at a low tracing rate, while most countries seize fewer than 1,000 firearms a year across the full range of tracing rates.'
    />
  );
}
