import { useQuery } from '@tanstack/react-query';
import { Colors } from '@undp/data-viz/Colors';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { UnitChart } from '@undp/data-viz/UnitChart';
import { Spinner } from '@undp/design-system-react/Spinner';
import { H2, P } from '@undp/design-system-react/Typography';
import ErrorEl from '@/components/ErrorEl';
import { CHART_PADDING } from '@/constants';

interface DataType {
  group: string;
  ageGroup: string;
  value: number;
}

function useData() {
  return useQuery({
    queryKey: ['trafficking-victims-by-sex-age'],
    queryFn: () =>
      fetchAndParseJSON(
        '/data/report/02-peace/16-2-2/trafficking-victims-by-sex-age.json',
      ) as Promise<DataType[]>,
  });
}
export default function TraffickingVictimsBySexAgeStackedBar() {
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError || !data) return <ErrorEl />;
  return (
    <div className='flex flex-col gap-6' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P size='xl' marginBottom='none' className='font-heading font-semibold leading-sm'>
          Share of detected victims of trafficking, by victim sex and age
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          2024 or most recent year available
        </P>
      </div>

      <div className='flex flex-col gap-10'>
        <div className='flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-5'>
          <UnitChart
            data={[
              { label: 'Women', value: data.find((d) => d.group === 'Women')?.value ?? 0 },
              { label: 'Girls', value: data.find((d) => d.group === 'Girls')?.value ?? 0 },
            ]}
            colors={[
              Colors.genderColors.female,
              `color-mix(in srgb, ${Colors.genderColors.female} 45%, white)`,
            ]}
            size={innerWidth < 720 ? 280 : 500}
            gridSize={innerWidth < 720 ? 10 : 20}
            numberDisplayOptions={{ suffix: '%' }}
            ariaLabel={`Unit chart showing the age breakdown of female trafficking victims. Women make up ${data.find((d) => d.group === 'Women')?.value}% and girls ${data.find((d) => d.group === 'Girls')?.value}%, together ${(data.find((d) => d.group === 'Women')?.value ?? 0) + (data.find((d) => d.group === 'Girls')?.value ?? 0)}% of all detected victims.`}
          />
          <div className='w-full shrink-0 sm:w-32'>
            <H2
              weight='medium'
              marginBottom='sm'
              className='m-0 font-heading text-categorical-female leading-none'
            >
              {(data.find((d) => d.group === 'Women')?.value ?? 0) +
                (data.find((d) => d.group === 'Girls')?.value ?? 0)}
              <span className='ml-0.5 text-2xl md:text-3xl'>%</span>
            </H2>
            <P marginBottom='none' size='base' className='text-foreground'>
              female victims
            </P>
          </div>
        </div>
        <div className='flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-5'>
          <UnitChart
            data={[
              { label: 'Men', value: data.find((d) => d.group === 'Men')?.value ?? 0 },
              { label: 'Boys', value: data.find((d) => d.group === 'Boys')?.value ?? 0 },
            ]}
            colors={[
              Colors.genderColors.male,
              `color-mix(in srgb, ${Colors.genderColors.male} 45%, white)`,
            ]}
            size={innerWidth < 720 ? 280 : 500}
            gridSize={innerWidth < 720 ? 10 : 20}
            numberDisplayOptions={{ suffix: '%' }}
            ariaLabel={`Unit chart showing the age breakdown of male trafficking victims. Men make up ${data.find((d) => d.group === 'Men')?.value}% and boys ${data.find((d) => d.group === 'Boys')?.value}%, together ${(data.find((d) => d.group === 'Men')?.value ?? 0) + (data.find((d) => d.group === 'Boys')?.value ?? 0)}% of all detected victims.`}
          />
          <div className='flex h-full w-full shrink-0 flex-col justify-center sm:w-32'>
            <H2
              weight='medium'
              marginBottom='sm'
              className='m-0 font-heading text-categorical-male leading-none'
            >
              {(data.find((d) => d.group === 'Men')?.value ?? 0) +
                (data.find((d) => d.group === 'Boys')?.value ?? 0)}
              <span className='ml-0.5 text-2xl md:text-3xl'>%</span>
            </H2>
            <P marginBottom='none' size='base' className='text-foreground'>
              male victims
            </P>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          Source: UNODC
        </P>
      </div>
    </div>
  );
}
