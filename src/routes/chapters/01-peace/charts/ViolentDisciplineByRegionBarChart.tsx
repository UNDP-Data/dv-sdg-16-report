import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { numberFormattingFunction } from '@undp/data-viz/utils';
import { P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';
import violentDisciplineByRegion from '@/data/chapters/01-peace/16-2-1-16-2-3/violent-discipline-by-region.json';
import ChartNote from '../../components/ChartNote';

const WORLD_VIOLENT_DISCIPLINE_SHARE = 67;
const WORLD_CHILDREN_MILLIONS = 1600;

export default function ViolentDisciplineByRegionBarChart() {
  return (
    <SimpleBarGraph
      data={violentDisciplineByRegion.map((d) => ({
        label: d.region,
        size: d.share,
        data: { childrenMillions: d.childrenMillions },
      }))}
      orientation='horizontal'
      colors='var(--primary)'
      minValue={0}
      maxValue={100}
      showValues
      valueColor='var(--content-primary)'
      showTicks={false}
      numberDisplayOptions={{ suffix: '%' }}
      barPadding={0.4}
      height={500}
      dimmedOpacity={1}
      padding={CHART_PADDING}
      leftMargin={innerWidth < 720 ? 80 : 220}
      truncateBy={innerWidth < 720 ? 8 : undefined}
      refValues={[
        {
          value: WORLD_VIOLENT_DISCIPLINE_SHARE,
          text: `World ${WORLD_VIOLENT_DISCIPLINE_SHARE}% (${numberFormattingFunction(WORLD_CHILDREN_MILLIONS / 1000, undefined, 1)}B children)`,
        },
      ]}
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
          <div className='flex items-center justify-between gap-4'>
            <P size='sm' marginBottom='none' className='text-content-secondary'>
              Share of children
            </P>
            <P size='sm' weight='bold' marginBottom='none' className='text-content-secondary'>
              {numberFormattingFunction(d.size, undefined, 0, undefined, '%')}
            </P>
          </div>
          <div className='flex items-center justify-between gap-4'>
            <P size='sm' marginBottom='none' className='text-content-secondary'>
              Children affected
            </P>
            <P size='sm' weight='bold' marginBottom='none' className='text-content-secondary'>
              {numberFormattingFunction(d.data.childrenMillions, undefined, 0, undefined, 'M')}
            </P>
          </div>
        </div>
      )}
      graphTitle={
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Percentage of children experiencing violent discipline in the past month, by region
        </P>
      }
      graphDescription='2010–2024'
      sources={[{ source: 'UNICEF' }]}
      footNote={
        <ChartNote content='Data are drawn from the UNICEF global databases, 2025, based on Multiple Indicator Cluster Surveys, Demographic and Health Surveys, and other nationally representative surveys that use a comparable methodology. These national data are also included in the official global database for SDG indicator 16.2.1. See the source publication for other technical notes on data sources, coverage and methods.' />
      }
      ariaLabel='Horizontal bar chart showing the share of children experiencing violent discipline in the past month, by region, with a reference line for the global estimate.'
    />
  );
}
