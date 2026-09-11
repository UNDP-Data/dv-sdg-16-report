import { useQuery } from '@tanstack/react-query';
import { ColorLegend } from '@undp/data-viz/ColorLegend';
import { Colors } from '@undp/data-viz/Colors';
import { DumbbellChart } from '@undp/data-viz/DumbbellChart';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { Spinner } from '@undp/design-system-react/Spinner';
import { P } from '@undp/design-system-react/Typography';
import ErrorEl from '@/components/ErrorEl';
import { CHART_PADDING } from '@/constants';
import ChartNote from '../../components/ChartNote';

function useData() {
  return useQuery({
    queryKey: ['feel-safe-walking-alone-by-region-sex'],
    queryFn: () =>
      fetchAndParseJSON('/data/report/02-peace/16-1-4/feel-safe-walking-alone-by-region-sex.json'),
  });
}

export default function FeelSafeWalkingAloneBySexDumbbellChart() {
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <ErrorEl />;
  return (
    <div className='flex flex-col gap-4' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Proportion of the population that feel safe walking alone at night around the area they
          live in, by region and sex
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          2021–2025
        </P>
      </div>

      <ColorLegend
        colors={[Colors.genderColors.female, Colors.genderColors.male]}
        colorDomain={['Women', 'Men']}
        showNAColor={false}
        className='pb-0'
      />

      <DumbbellChart
        data={transformDataForGraph(data, 'dumbbellChart', [
          { columnId: 'region', chartConfigId: 'label' },
          { columnId: ['female', 'male'], chartConfigId: 'x' },
        ])}
        orientation='horizontal'
        colorDomain={['Women', 'Men']}
        showColorScale={false}
        backgroundColor={false}
        colors={[Colors.genderColors.female, Colors.genderColors.male]}
        minValue={0}
        showTicks
        showValues={false}
        leftMargin={innerWidth < 720 ? 135 : 220}
        minHeight={400}
        truncateBy={innerWidth < 720 ? 16 : undefined}
        maxValue={100}
        numberDisplayOptions={{ suffix: '%' }}
        padding='0'
        styles={{
          tooltip: {
            padding: 0,
          },
          xAxis: {
            gridLines: {
              display: 'none',
            },
            labels: {
              fill: 'var(--content-quaternary)',
            },
          },
        }}
        tooltip={(d) => {
          const [female, male] = d.x as (number | null)[];
          const rows = [
            { label: 'Women', value: female, color: Colors.genderColors.female },
            { label: 'Men', value: male, color: Colors.genderColors.male },
          ];
          return (
            <div className='flex flex-col gap-1 bg-white px-3 py-2'>
              <P size='sm' weight='semibold' marginBottom='none'>
                {d.label}
              </P>
              {rows.map((row) => (
                <P
                  key={row.label}
                  size='sm'
                  marginBottom='none'
                  className='flex items-center justify-between gap-4'
                >
                  <span className='flex items-center gap-1.5'>
                    <span
                      className='h-2.5 w-2.5 rounded-full'
                      style={{ backgroundColor: row.color }}
                    />
                    {row.label}
                  </span>
                  <span>{row.value !== null ? `${row.value}%` : 'N/A'}</span>
                </P>
              ))}
            </div>
          );
        }}
        sources={[
          {
            source:
              'UNODC, based on responses to the United Nations Survey of Crime Trends and Operations of Criminal Justice Systems, Multiple Indicator Cluster Surveys, and the Gallup World Poll.',
          },
        ]}
        footNote={
          <ChartNote
            content={
              <>
                Regional aggregates refer to 3-year averages weighted by countries’ population size.
                Most surveys include the qualifications “after dark” or “at night” in the question
                wording.
                <br />
                <br />
                The number of countries with sex-disaggregated data on perception of safety is
                different to the sample of countries with data on the overall perception of safety
                in the population.
              </>
            }
          />
        }
        ariaLabel='Dumbbell chart showing the share of the population that feels safe walking alone at night, by region and sex, from 2021 to 2025. Women report feeling less safe than men in every region, with the widest gap in Northern Africa and Western Asia.'
      />
    </div>
  );
}
