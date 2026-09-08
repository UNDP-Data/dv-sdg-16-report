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

const CATEGORY_SETTINGS = [
  {
    label: 'Women',
    id: 'womenMPs',
    color: 'var(--quaternary)',
    refValue: 50,
    refText: "50% of the world's population is female",
  },
  {
    label: 'Youth',
    id: 'youngMPs',
    color: 'var(--primary)',
    refValue: 34,
    refText: "34% of the world's population is aged between 18 and 40",
  },
];

function useData() {
  return useQuery({
    queryKey: ['parliamentary-leadership-by-category'],
    queryFn: () =>
      fetchAndParseJSON(
        '/data/report/04-inclusion/16-7-1-a/parliamentary-leadership-by-category.json',
      ),
  });
}

export default function ParliamentaryLeadershipByCategoryBarChart() {
  const [selectedCategory, setSelectedCategory] = useState<'womenMPs' | 'youngMPs'>('womenMPs');

  const { data, isLoading, isError } = useData();

  if (isLoading) return <Spinner size='lg' className='mx-auto my-20' />;
  if (isError || !data) return <ErrorEl />;
  return (
    <div className='flex flex-col gap-4' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Share of women and young MPs in parliamentary leadership
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          As of 1 January 2026
        </P>
      </div>

      <div>
        <P size='sm' marginBottom='2xs'>
          Select group
        </P>
        <RadioGroup
          value={selectedCategory}
          onValueChange={(value: 'womenMPs' | 'youngMPs') => setSelectedCategory(value)}
          color='blue'
        >
          {CATEGORY_SETTINGS.map((config) => (
            <RadioGroupItem key={config.label} value={config.id} label={config.label} />
          ))}
        </RadioGroup>
      </div>

      <SimpleBarGraph
        data={transformDataForGraph(data, 'barChart', [
          {
            chartConfigId: 'label',
            columnId: 'category',
          },
          {
            chartConfigId: 'size',
            columnId: selectedCategory,
          },
        ])}
        orientation='vertical'
        colors={CATEGORY_SETTINGS.find((d) => d.id === selectedCategory)?.color}
        minValue={0}
        maxValue={70}
        animate
        showValues
        valueColor='var(--content-primary)'
        showTicks={false}
        numberDisplayOptions={{ precision: 1, suffix: '%' }}
        barPadding={0.4}
        height={450}
        bottomMargin={60}
        dimmedOpacity={0.4}
        padding='0'
        refValues={
          CATEGORY_SETTINGS.find((d) => d.id === selectedCategory)
            ? [
                {
                  value: CATEGORY_SETTINGS.find((d) => d.id === selectedCategory)?.refValue || null,
                  text: CATEGORY_SETTINGS.find((d) => d.id === selectedCategory)?.refText || '',
                },
              ]
            : undefined
        }
        sources={[{ source: 'Inter-Parliamentary Union (IPU)' }]}
        ariaLabel={`Vertical bar chart showing the share of ${selectedCategory === 'youngMPs' ? 'young MPs aged 40 or younger' : 'women MPs'} across parliamentary positions, with a reference line at ${CATEGORY_SETTINGS.find((d) => d.label === selectedCategory)?.refValue}% for the share of the world's population that is ${selectedCategory === 'youngMPs' ? 'aged between 18 and 40' : 'female'}. Representation is lowest among Speakers and highest among Gender equality chairs.`}
      />
    </div>
  );
}
