import { SimpleBarGraph } from '@undp/data-viz/BarGraph';
import { P } from '@undp/design-system-react/Typography';
import { CHART_PADDING } from '@/constants';

export default function DiscriminationRatesByGroupBarChart() {
  return (
    <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Percentage of population reporting having been discriminated against
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          2025 or latest available year
        </P>
      </div>
      <div className='flex flex-col gap-10'>
        <div className='mt-4 flex flex-col items-start gap-0'>
          <P marginBottom='none' size='sm' weight='semibold' className='text-center'>
            Sexual orientation
          </P>
          <SimpleBarGraph
            data={[
              { label: 'Heterosexual', size: 18, color: 'Reference group' },
              {
                label: 'Sexual minority',
                size: 41,
                color: 'Group reporting higher discrimination',
              },
            ]}
            orientation='horizontal'
            colors={['var(--text-muted)', 'var(--children)']}
            showColorScale={false}
            animate
            minValue={0}
            leftMargin={120}
            maxValue={60}
            height={90}
            maxBarThickness={32}
            showValues
            valueColor='var(--content-primary)'
            showTicks={false}
            numberDisplayOptions={{ suffix: '%', precision: 0 }}
            padding='0'
            backgroundColor={false}
            styles={{
              tooltip: {
                padding: 0,
              },
            }}
            tooltip={() => (
              <div className='flex flex-col gap-1 bg-white px-3 py-2'>
                <P
                  size='sm'
                  marginBottom='none'
                  className='flex items-center justify-between gap-4'
                >
                  <span className='flex items-center gap-1.5'>
                    <span
                      className='h-2.5 w-2.5 rounded-full'
                      style={{ backgroundColor: 'var(--text-muted)' }}
                    />
                    Heterosexual
                  </span>
                  <span>18%</span>
                </P>
                <P
                  size='sm'
                  marginBottom='none'
                  className='flex items-center justify-between gap-4'
                >
                  <span className='flex items-center gap-1.5'>
                    <span
                      className='h-2.5 w-2.5 rounded-full'
                      style={{ backgroundColor: 'var(--children)' }}
                    />
                    Sexual minority
                  </span>
                  <span>41%</span>
                </P>
                <P size='sm' marginBottom='none' className='text-content-secondary'>
                  Difference: +23 percentage points
                </P>
              </div>
            )}
            ariaLabel='Bar chart comparing discrimination rates for heterosexual people (18%) and non-heterosexual people (41%), a difference of 23 percentage points.'
          />
        </div>

        <div className='mb-4 flex flex-col items-start gap-2'>
          <P marginBottom='none' size='sm' weight='semibold' className='text-center'>
            Gender identity
          </P>
          <SimpleBarGraph
            data={[
              { label: 'Total population', size: 20, color: 'Reference group' },
              { label: 'Transgender', size: 53, color: 'Group reporting higher discrimination' },
            ]}
            orientation='horizontal'
            colorDomain={['Reference group', 'Group reporting higher discrimination']}
            colors={['var(--text-muted)', 'var(--children)']}
            showColorScale={false}
            animate
            minValue={0}
            leftMargin={120}
            maxValue={60}
            height={90}
            maxBarThickness={32}
            showValues
            valueColor='var(--content-primary)'
            showTicks={false}
            numberDisplayOptions={{ suffix: '%', precision: 0 }}
            padding='0'
            backgroundColor={false}
            styles={{
              tooltip: {
                padding: 0,
              },
            }}
            tooltip={() => (
              <div className='flex flex-col gap-1 bg-white px-3 py-2'>
                <P
                  size='sm'
                  marginBottom='none'
                  className='flex items-center justify-between gap-4'
                >
                  <span className='flex items-center gap-1.5'>
                    <span
                      className='h-2.5 w-2.5 rounded-full'
                      style={{ backgroundColor: 'var(--text-muted)' }}
                    />
                    Total population
                  </span>
                  <span>20%</span>
                </P>
                <P
                  size='sm'
                  marginBottom='none'
                  className='flex items-center justify-between gap-4'
                >
                  <span className='flex items-center gap-1.5'>
                    <span
                      className='h-2.5 w-2.5 rounded-full'
                      style={{ backgroundColor: 'var(--children)' }}
                    />
                    Transgender
                  </span>
                  <span>53%</span>
                </P>
                <P size='sm' marginBottom='none' className='text-content-secondary'>
                  Difference: +33 percentage points
                </P>
              </div>
            )}
            ariaLabel='Bar chart comparing discrimination rates for the total population (20%) and transgender people (53%), a difference of 33 percentage points.'
          />
        </div>
      </div>

      <P marginBottom='none' size='sm' className='text-content-secondary'>
        Source: Office of the United Nations High Commissioner for Human Rights (OHCHR)
      </P>
    </div>
  );
}
