import { BeeSwarmChart } from '@undp/data-viz/BeeSwarmChart';
import { Colors } from '@undp/data-viz/Colors';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { numberFormattingFunction } from '@undp/data-viz/utils';
import { P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';
import firearmsTracingByCountry from '@/data/chapters/02-justice/16-4-2/firearms-tracing-by-country.json';

export default function FirearmsTracingBeeSwarmChart() {
  return (
    <BeeSwarmChart
      data={transformDataForGraph(firearmsTracingByCountry, 'beeSwarmChart', [
        { columnId: 'country', chartConfigId: 'label' },
        { columnId: 'traced', chartConfigId: 'position' },
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
      orientation='horizontal'
      graphTitle={
        <>
          <P marginBottom='none' weight='semibold' className='font-heading leading-sm'>
            Tracing success relative to average seizure volumes, by country
          </P>
          <P marginBottom='none' size='sm' className='text-content-secondary'>
            2016 – 2024
          </P>
        </>
      }
      radius={7}
      minValue={0}
      maxValue={100}
      noOfTicks={5}
      height={400}
      rightMargin={32}
      padding={CHART_PADDING}
      numberDisplayOptions={{ suffix: '%' }}
      styles={{ tooltip: { padding: 0 } }}
      tooltip={(d) => {
        return (
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
                  {numberFormattingFunction(d.data.traced, undefined, 0)}%
                </P>
                <div className='h-3 flex-1 bg-content-secondary/10'>
                  <div
                    className='h-full bg-content-secondary'
                    style={{
                      width: `${d.data.traced}%`,
                    }}
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
        );
      }}
      sources={[
        {
          source:
            'UNODC Illicit Arms Flow Questionnaire (IAFQ). Simple averages calculated based on data submitted by 40 Member States.',
        },
      ]}
      ariaLabel='Bee swarm chart showing the share of seized firearms successfully traced for 40 countries between 2016 and 2024, coloured by region. Tracing rates range from 0 to 100 per cent.'
    />
  );
}
