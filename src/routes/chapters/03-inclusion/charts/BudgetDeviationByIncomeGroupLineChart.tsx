import { MultiLineChart } from '@undp/data-viz/MultiLineChart';
import { transformDataForGraph } from '@undp/data-viz/transformData';
import { P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';
import budgetDeviationByIncomeGroup from '@/data/chapters/03-inclusion/16-6-1/budget-deviation-by-income-group.json';

export default function BudgetDeviationByIncomeGroupLineChart() {
  return (
    <MultiLineChart
      data={transformDataForGraph(budgetDeviationByIncomeGroup, 'multiLineChart', [
        {
          columnId: ['lowIncome', 'lowerMiddleIncome', 'upperMiddleIncome', 'highIncome'],
          chartConfigId: 'y',
        },
        { columnId: 'year', chartConfigId: 'date' },
      ])}
      labels={['Low-Income', 'Lower-Middle Income', 'Upper-Middle Income', 'High-Income']}
      lineColors={['var(--secondary)', 'var(--quaternary)', 'var(--tertiary)', 'var(--primary)']}
      showColorScale
      animate
      showDots={false}
      strokeWidth={2}
      curveType='linear'
      rightMargin={150}
      minValue={0}
      height={500}
      maxValue={18}
      noOfXTicks='showAvailableOnly'
      numberDisplayOptions={{ suffix: '%', precision: 1 }}
      relativeHeight={0.6}
      padding={CHART_PADDING}
      backgroundColor='var(--background-soft)'
      styles={{
        tooltip: {
          padding: 0,
        },
        graphObjectValues: {
          fontWeight: 'bold',
        },
      }}
      tooltip={(d) => {
        const year = d.date.getFullYear();
        const [lowIncome, lowerMiddleIncome, upperMiddleIncome, highIncome] = d.y as (
          | number
          | null
        )[];
        const rows = [
          { label: 'Low-Income', value: lowIncome, color: 'var(--secondary)' },
          { label: 'Lower-Middle Income', value: lowerMiddleIncome, color: 'var(--quaternary)' },
          { label: 'Upper-Middle Income', value: upperMiddleIncome, color: 'var(--tertiary)' },
          { label: 'High-Income', value: highIncome, color: 'var(--primary)' },
        ];
        return (
          <div className='flex flex-col gap-1 bg-white px-3 py-2'>
            <P size='sm' weight='semibold' marginBottom='none'>
              {year}
            </P>
            {rows.map((row) => (
              <P
                key={row.label}
                size='sm'
                marginBottom='none'
                className='flex items-center justify-between gap-4'
              >
                <span className='flex items-center gap-1.5'>
                  <span className='h-0.75 w-3' style={{ backgroundColor: row.color }} />
                  {row.label}
                </span>
                <span>{row.value?.toFixed(1)}%</span>
              </P>
            ))}
          </div>
        );
      }}
      graphTitle={
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Average absolute deviation between approved and actual government expenditure, by income
          group
        </P>
      }
      graphDescription='2019–2024'
      sources={[{ source: 'PEFA' }]}
      ariaLabel='Line chart showing the average absolute deviation between approved and actual government expenditure, by income group, from 2019 to 2024. Low-Income and Lower-Middle Income countries show the highest and most volatile deviations throughout the period, while High-Income countries generally maintain the lowest deviations.'
    />
  );
}
