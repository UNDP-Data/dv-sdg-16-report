import { useQuery } from '@tanstack/react-query';
import { GroupedBarGraph } from '@undp/data-viz/BarGraph';
import { Colors } from '@undp/data-viz/Colors';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { Spinner } from '@undp/design-system-react/Spinner';
import { P } from '@undp/design-system-react/Typography';
import ErrorEl from '@/components/ErrorEl';
import { CHART_PADDING } from '@/constants';
import ChartNote from '../../components/ChartNote';

interface DataType {
  region: string;
  male: number;
  female: number;
}

function useData() {
  return useQuery({
    queryKey: ['intimate-partner-homicide-share-by-region-sex'],
    queryFn: () =>
      fetchAndParseJSON(
        '/data/report/02-peace/16-1-1/intimate-partner-homicide-share-by-region-sex.json',
      ) as Promise<DataType[]>,
  });
}

export default function IntimatePartnerHomicideByRegionSexBarChart() {
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError) return <ErrorEl />;
  return (
    <GroupedBarGraph
      data={transformDataForGraph(
        data?.filter((d) => d.region !== 'World'),
        'groupedBarChart',
        [
          { columnId: 'region', chartConfigId: 'label' },
          { columnId: ['female', 'male'], chartConfigId: 'size' },
        ],
      )}
      orientation='vertical'
      colorDomain={['Men', 'Women']}
      colors={[Colors.genderColors.male, Colors.genderColors.female]}
      minValue={0}
      maxValue={80}
      rightMargin={130}
      showValues={innerWidth >= 720}
      valueColor='var(--content-primary)'
      showTicks={false}
      numberDisplayOptions={{ suffix: '%' }}
      barPadding={0.3}
      height={500}
      padding={CHART_PADDING}
      refValues={
        data
          ? [
              {
                value: data.find((d) => d.region === 'World')?.male ?? 0,
                text: `World (men) ${data.find((d) => d.region === 'World')?.male}%`,
                color: Colors.genderColors.male,
              },
              {
                value: data.find((d) => d.region === 'World')?.female ?? 0,
                text: `World (women) ${data.find((d) => d.region === 'World')?.female}%`,
                color: Colors.genderColors.female,
              },
            ]
          : undefined
      }
      styles={{
        tooltip: {
          padding: 0,
        },
      }}
      tooltip={(d) => (
        <div className='flex flex-col gap-1 bg-white px-3 py-2'>
          <P size='sm' weight='semibold' marginBottom='none'>
            {d.label}
          </P>
          {(['Men', 'Women'] as const).map((sex, i) => (
            <div key={sex} className='flex items-center justify-between gap-4'>
              <P size='sm' marginBottom='none' className='flex items-center gap-1.5'>
                <span
                  className='h-0.75 w-3'
                  style={{
                    backgroundColor:
                      sex === 'Men' ? Colors.genderColors.male : Colors.genderColors.female,
                  }}
                />
                {sex}
              </P>
              <P size='sm' weight='bold' marginBottom='none' className='text-content-secondary'>
                {d.size[i]}%
              </P>
            </div>
          ))}
        </div>
      )}
      graphTitle={
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Share of victims of intimate partner/family member homicide among all victims of homicide,
          by region and sex
        </P>
      }
      graphDescription='2024'
      sources={[
        {
          source:
            'UNODC estimates based on responses to the United Nations Survey of Crime Trends and Operations of Criminal Justice Systems and data from other sources reviewed by Member States.',
        },
      ]}
      footNote={
        <ChartNote content='Data on the share of intimate partner/family member homicide out of all homicides is not available for SDG regions. World reference lines show the global share for each sex.' />
      }
      ariaLabel='Grouped bar chart showing the share of victims of intimate partner or family member homicide among all homicide victims, by region and sex, with reference lines for the world average. Women are disproportionately affected in every region, ranging from 45% in the Americas to 74% in Africa, compared with 8 to 26% for men. The world average is 60% for women and 11% for men.'
    />
  );
}
