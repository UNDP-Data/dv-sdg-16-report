import { useQuery } from '@tanstack/react-query';
import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { fetchAndParseJSON } from '@undp/data-viz/fetchAndParseData';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { RadioGroup, RadioGroupItem } from '@undp/design-system-react/RadioGroup';
import { Spinner } from '@undp/design-system-react/Spinner';
import { P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import ErrorEl from '@/components/ErrorEl';
import { CHART_PADDING } from '@/constants';
import ChartNote from '../../components/ChartNote';

function useData() {
  return useQuery({
    queryKey: ['population-satisfied-with-healthcare'],
    queryFn: () =>
      fetchAndParseJSON(
        '/data/report/04-inclusion/16-6-2/population-satisfied-with-healthcare.json',
      ),
  });
}

export default function HealthcareSatisfactionByRegionBarChart() {
  const [year, setYear] = useState('2025');
  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError || !data) return <ErrorEl />;

  return (
    <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Proportion of the population who say that they are satisfied with the availability of
          quality healthcare, by region
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          2015 and 2025 or latest year available
        </P>
      </div>

      <div>
        <P size='sm' marginBottom='none'>
          Select year
        </P>
        <RadioGroup value={year} onValueChange={(value) => setYear(value)} color='blue'>
          {['2025', '2015'].map((y) => (
            <RadioGroupItem key={y} value={y} label={y} />
          ))}
        </RadioGroup>
      </div>

      <SimpleBarGraph
        data={transformDataForGraph(data, 'barChart', [
          {
            chartConfigId: 'label',
            columnId: 'label',
          },
          {
            chartConfigId: 'size',
            columnId: year === '2025' ? 'y2025' : 'y2015',
          },
        ])}
        labelOrder={data.map((r: { label: string }) => r.label)}
        orientation='horizontal'
        colors='var(--blue-500)'
        minValue={0}
        animate
        maxValue={100}
        maxBarThickness={32}
        height={270}
        valueColor='var(--content-primary)'
        showTicks={false}
        numberDisplayOptions={{ suffix: '%', precision: 1 }}
        leftMargin={innerWidth < 720 ? 135 : 220}
        truncateBy={innerWidth < 720 ? 16 : undefined}
        padding='0'
        topMargin={0}
        sources={[{ source: 'UNDP, Gallup World Poll' }]}
        footNote={
          <ChartNote content='Estimates are based on the earliest available year of survey data between 2015 and 2019 and latest available year of survey data between 2020 and 2025 for 95 countries (health services). Regional estimates are based on the following number of countries respectively: Europe and Northern America (18), Latin America and the Caribbean (11), Eastern and South-Eastern Asia (9), Sub-Saharan Africa (31), Northern Africa and Western Asia (15), Central and Southern Asia (11). Gallup World Poll asks the question: “In the city or area where you live, are you satisfied or dissatisfied with the availability of quality healthcare?”' />
        }
        ariaLabel={`Horizontal bar chart showing the proportion of the population satisfied with the availability of quality healthcare, by region, in ${year}. Eastern Asia and South-Eastern Asia has the highest satisfaction and Sub-Saharan Africa has the lowest.`}
      />
    </div>
  );
}
