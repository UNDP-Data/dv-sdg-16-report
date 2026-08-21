import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { RadioGroup, RadioGroupItem } from '@undp/design-system-react/RadioGroup';
import { P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import { CHART_PADDING } from '@/constants';
import parliamentaryLeadershipByCategory from '@/data/chapters/03-inclusion/16-7-1-a/parliamentary-leadership-by-category.json';

const VIEWS = {
  women: {
    label: 'Women',
    valueKey: 'womenMPs',
    color: 'var(--quaternary)',
    refValue: 50,
    refText: "50% of the world's population is female",
  },
  youth: {
    label: 'Youth',
    valueKey: 'youngMPs',
    color: 'var(--primary)',
    refValue: 34,
    refText: "34% of the world's population is aged between 18 and 40",
  },
} as const;

type ViewKey = keyof typeof VIEWS;

export default function ParliamentaryLeadershipByCategoryBarChart() {
  const [view, setView] = useState<ViewKey>('women');
  const { valueKey, color, refValue, refText } = VIEWS[view];

  return (
    <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Women and young MPs remain underrepresented in parliamentary leadership
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
          value={view}
          onValueChange={(value) => setView(value as ViewKey)}
          color='tertiary'
        >
          {Object.entries(VIEWS).map(([value, config]) => (
            <RadioGroupItem key={value} value={value} label={config.label} />
          ))}
        </RadioGroup>
      </div>

      <SimpleBarGraph
        data={parliamentaryLeadershipByCategory.map((d) => ({
          label: d.category,
          size: d[valueKey],
        }))}
        orientation='vertical'
        colors={color}
        minValue={0}
        maxValue={70}
        showValues
        valueColor='var(--content-primary)'
        showTicks={false}
        numberDisplayOptions={{ precision: 1, suffix: '%' }}
        barPadding={0.4}
        height={450}
        bottomMargin={60}
        dimmedOpacity={0.4}
        padding='0'
        refValues={[{ value: refValue, text: refText }]}
        sources={[{ source: 'Inter-Parliamentary Union (IPU)' }]}
        ariaLabel={`Vertical bar chart showing the share of ${view === 'youth' ? 'young MPs aged 40 or younger' : 'women MPs'} across parliamentary positions, with a reference line at ${refValue}% for the share of the world's population that is ${view === 'youth' ? 'aged between 18 and 40' : 'female'}. Representation is lowest among Speakers and highest among Gender equality chairs.`}
      />
    </div>
  );
}
