import { useQuery } from '@tanstack/react-query';
import { ColorLegend } from '@undp/data-viz/ColorLegend';
import { Colors } from '@undp/data-viz/Colors';
import { fetchAndParseCSV } from '@undp/data-viz/fetchAndParseData';
import { StripChart } from '@undp/data-viz/StripChart';
import { cn } from '@undp/design-system-react/cn';
import { Spinner } from '@undp/design-system-react/Spinner';
import { P } from '@undp/design-system-react/Typography';
import { useMemo } from 'react';
import { CHART_PADDING } from '@/constants';
import ChartNote from '../../components/ChartNote';

interface NonLethalViolenceRow {
  iso3: string;
  country: string;
  year: number;
  variable: string;
  source_name: string;
  count: number;
  sex: 'male' | 'female';
}

const VIOLENCE_TYPES = [
  { key: 'Physical', label: 'Physical violence' },
  { key: 'Sexual', label: 'Sexual violence' },
  { key: 'Psychological', label: 'Psychological violence' },
] as const;

const SEXES = [
  { key: 'male', label: 'Male', color: Colors.genderColors.male },
  { key: 'female', label: 'Female', color: Colors.genderColors.female },
] as const;

function useNonLethalViolenceData() {
  return useQuery({
    queryKey: ['non-lethal-violence-16-1-3'],
    queryFn: () =>
      fetchAndParseCSV('/data/chapters/01-peace/16-1-3/16-1-3.csv') as Promise<
        NonLethalViolenceRow[]
      >,
  });
}

export default function NonLethalViolenceByTypeSexStripChart() {
  const { data, isLoading, isError } = useNonLethalViolenceData();

  const maxValue = useMemo(() => {
    if (!data || data.length === 0) return undefined;
    const max = Math.max(...data.map((d) => d.count));
    return Math.ceil(max / 5) * 5;
  }, [data]);

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError || !data) {
    return (
      <P marginBottom='none' size='sm' className='text-content-secondary'>
        Unable to load the underlying data for this chart.
      </P>
    );
  }

  return (
    <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Proportion of the population subjected to violence in the previous twelve months, by sex
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          Latest available year between 2016–2024
        </P>
      </div>

      <ColorLegend
        colors={SEXES.map((s) => s.color)}
        colorDomain={SEXES.map((s) => s.label)}
        showNAColor={false}
      />

      <div className='flex flex-col'>
        {VIOLENCE_TYPES.map((type, typeIndex) => (
          <div
            key={type.key}
            className={cn('flex flex-col gap-1 py-3', typeIndex > 0 && 'border-stroke-xs border-t')}
          >
            <P marginBottom='none' size='sm' className='font-heading font-semibold'>
              {type.label}
            </P>
            {SEXES.map((sex, sexIndex) => {
              const isLastRowOverall =
                typeIndex === VIOLENCE_TYPES.length - 1 && sexIndex === SEXES.length - 1;
              const rows = data.filter(
                (d) => d.sex === sex.key && d.variable.includes(`${type.key} violence`),
              );
              return (
                <div
                  key={sex.key}
                  className='grid grid-cols-[72px_1fr] items-center gap-2 md:grid-cols-[92px_1fr]'
                >
                  <P marginBottom='none' size='sm' className='text-content-secondary'>
                    {sex.label}
                  </P>
                  <StripChart
                    data={rows.map((d) => ({
                      label: d.country,
                      position: d.count,
                      data: d,
                    }))}
                    orientation='horizontal'
                    stripType='dot'
                    colors={[sex.color]}
                    radius={5}
                    dotOpacity={0.55}
                    minValue={0}
                    maxValue={maxValue}
                    noOfTicks={6}
                    height={40}
                    leftMargin={4}
                    rightMargin={4}
                    topMargin={4}
                    styles={{ xAxis: { labels: { transform: 'translateY(6px)' } } }}
                    bottomMargin={isLastRowOverall ? 10 : 4}
                    numberDisplayOptions={{ suffix: '%' }}
                    backgroundColor={false}
                    padding='0'
                    classNames={isLastRowOverall ? undefined : { xAxis: { labels: 'hidden' } }}
                    tooltip='{{label}} ({{data.year}}): {{position}}%'
                    ariaLabel={`Strip chart showing ${type.label.toLowerCase()} prevalence among ${sex.label.toLowerCase()} respondents, by country.`}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-1'>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          Source: UNODC based on responses to the United Nations Survey of Crime Trends and
          Operations of Criminal Justice Systems and data from other sources reviewed by Member
          States.
        </P>
        <ChartNote content='Data based on the latest available year of survey data between 2016 and 2024 for 51 countries (physical violence), 18 countries (sexual violence), 12 countries (psychological violence). Each dot represents a country. The horizontal black bars show the median prevalence, or the midpoint across countries: half of countries with available data have a higher prevalence and half have a lower prevalence.' />
      </div>
    </div>
  );
}
