import { useQuery } from '@tanstack/react-query';
import { Colors } from '@undp/data-viz/Colors';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { ScatterPlot } from '@undp/data-viz/ScatterPlot';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { numberFormattingFunction } from '@undp/data-viz/utils';
import { Spinner } from '@undp/design-system-react/Spinner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@undp/design-system-react/Tooltip';
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

function CountryTooltip({
  data,
  note,
}: {
  data: { country: string; region: string; sdgValue: number; seizures: number };
  note?: string;
}) {
  return (
    <div className='flex w-56 flex-col gap-3 bg-white px-3 py-2'>
      <div className='flex flex-col'>
        <P marginBottom='none' size='sm' weight='bold'>
          {data.country}
        </P>
        <P marginBottom='none' size='xs' className='text-content-secondary'>
          {data.region}
        </P>
      </div>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' size='xs' className='text-content-secondary'>
          Successfully traced
        </P>
        <div className='flex items-center gap-2'>
          <P marginBottom='none' size='sm' weight='bold'>
            {numberFormattingFunction(data.sdgValue, undefined, 1)}%
          </P>
          <div className='h-3 flex-1 bg-content-secondary/10'>
            <div className='h-full bg-content-secondary' style={{ width: `${data.sdgValue}%` }} />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <P marginBottom='none' size='xs' className='text-content-secondary'>
          Seized firearms
        </P>
        <P marginBottom='none' size='sm' weight='bold'>
          {data.seizures.toLocaleString('en')}
        </P>
      </div>
      {note ? (
        <P
          marginBottom='none'
          size='xs'
          className='border-stroke-sm border-t pt-2 text-content-secondary'
        >
          {note}
        </P>
      ) : null}
    </div>
  );
}

export default function FirearmsTracingScatterPlot() {
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <ErrorEl />;
  const brazil = data.countryData.find((d: { iso3: string }) => d.iso3 === 'BRA');
  return (
    <ScatterPlot
      data={transformDataForGraph(
        data.countryData.filter((d: { iso3: string }) => d.iso3 !== 'BRA'),
        'scatterPlot',
        [
          { columnId: 'country', chartConfigId: 'label' },
          { columnId: 'sdgValue', chartConfigId: 'x' },
          { columnId: 'seizures', chartConfigId: 'y' },
          { columnId: 'region', chartConfigId: 'color' },
        ],
      )}
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
      topMargin={64}
      customLayers={[
        {
          position: 'after',
          layer: (
            <g key='brazil-outlier'>
              <line
                x1={0}
                x2='100%'
                y1={-36}
                y2={-36}
                className='undp-tick-line stroke-stroke-lg'
              />
              <text
                y={-36}
                dx={-4}
                dy='0.33em'
                className='fill-content-tertiary text-xs'
                style={{ textAnchor: 'end' }}
              >
                50K
              </text>
              <path
                d='M-24 -12 L-8 -18 M-24 -8 L-8 -14'
                className='fill-none stroke-content-tertiary'
              />
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <g
                      style={{
                        transform: `translateX(calc((100% - 78px) * ${brazil.sdgValue / 100}))`,
                      }}
                    >
                      <circle cy={-46} r={10} className='fill-transparent' />
                      <circle cy={-46} r={4} className='fill-secondary/60 stroke-secondary' />
                    </g>
                  </TooltipTrigger>
                  <TooltipContent inPortal className='border-0 p-0 text-left'>
                    <CountryTooltip
                      data={brazil}
                      note='Shown above a break in the vertical axis to keep the rest of the chart readable.'
                    />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </g>
          ),
        },
      ]}
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
      tooltip={(d) => <CountryTooltip data={d.data} />}
      sources={[
        {
          source:
            'UNODC Illicit Arms Flow Questionnaire (IAFQ). Simple averages calculated based on data submitted by 40 Member States.',
        },
      ]}
      ariaLabel='Scatter plot showing average yearly seized firearms against the share successfully traced for 40 countries between 2016 and 2024, coloured by region. Brazil, an outlier with 53,798 seized firearms a year and 5.3% traced, is shown above a break in the vertical axis; most countries seize fewer than 1,000 firearms a year across the full range of tracing rates.'
    />
  );
}
