import { StackedBarGraph } from '@undp/data-viz/BarGraph';
import { P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';
import traffickingVictimsBySexAge from '@/data/chapters/01-peace/16-2-2/trafficking-victims-by-sex-age.json';

const SEX_BY_GROUP: Record<string, 'Female' | 'Male'> = {
  Women: 'Female',
  Girls: 'Female',
  Men: 'Male',
  Boys: 'Male',
};

const AGE_GROUPS = ['Adults', 'Children'] as const;
const SEXES = ['Female', 'Male'] as const;

const valueFor = (sex: 'Female' | 'Male', ageGroup: 'Adults' | 'Children') =>
  traffickingVictimsBySexAge.find((d) => SEX_BY_GROUP[d.group] === sex && d.ageGroup === ageGroup)
    ?.value ?? null;

const data = SEXES.map((sex) => ({
  label: sex,
  size: AGE_GROUPS.map((ageGroup) => valueFor(sex, ageGroup)),
}));

const AGE_GROUP_LABEL: Record<'Female' | 'Male', Record<'Adults' | 'Children', string>> = {
  Female: { Adults: 'Women', Children: 'Girls' },
  Male: { Adults: 'Men', Children: 'Boys' },
};

function TraffickingTooltip({ label, sizeIndex }: { label: 'Female' | 'Male'; sizeIndex: number }) {
  const ageGroup = AGE_GROUPS[sizeIndex];
  const groupLabel = AGE_GROUP_LABEL[label][ageGroup];
  const value = valueFor(label, ageGroup);

  return (
    <div className='flex min-w-[140px] flex-col gap-1 border-primary border-t-3 bg-white p-4'>
      <P size='sm' weight='semibold' marginBottom='2xs' className='flex justify-between gap-4'>
        <span>{groupLabel}</span>
        <span>{value}%</span>
      </P>
      <hr className='text-content-reverse' />
      <P size='sm' marginBottom='none' className='pt-2 text-content-secondary'>
        Share of all detected victims
      </P>
    </div>
  );
}

export default function TraffickingVictimsBySexAgeStackedBar() {
  return (
    <StackedBarGraph
      data={data}
      graphID='TraffickingVictimsBySexAgeStackedBar'
      orientation='horizontal'
      colorDomain={['Adults', 'Children']}
      colors={['var(--primary)', 'var(--light-blue)']}
      showColorScale
      showTicks={false}
      showValues
      showTotalValue
      maxValue={60}
      styles={{
        tooltip: {
          padding: 0,
        },
      }}
      leftMargin={64}
      numberDisplayOptions={{ suffix: '%' }}
      relativeHeight={0.5}
      sources={[{ source: 'UNODC' }]}
      tooltip={TraffickingTooltip}
      graphTitle={
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Share of detected victims of trafficking, by victim sex and age
        </P>
      }
      ariaLabel='Horizontal stacked bar chart showing detected trafficking victims by sex and age. Female victims account for 56 per cent of the total, made up of 36 per cent women and 20 per cent girls. Male victims account for 44 per cent, made up of 27 per cent men and 17 per cent boys.'
      padding={CHART_PADDING}
      backgroundColor='var(--background-soft)'
      graphDescription='2024 or most recent year available'
    />
  );
}
