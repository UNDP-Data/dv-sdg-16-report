import { UnitChart } from '@undp/data-viz/UnitChart';
import { RadioGroup, RadioGroupItem } from '@undp/design-system-react/RadioGroup';
import { P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import { CHART_PADDING } from '@/constants';
import defendersKilledByGroupRegion from '@/data/chapters/01-peace/16-10-1/defenders-killed-by-group-region.json';
import ChartNote from '../../components/ChartNote';

type GroupKey = 'Women' | 'Youth' | 'Indigenous & minority' | 'Environmental & Land';

export default function DefendersKilledByGroupRegionWaffle() {
  const [selectedGroup, setSelectedGroup] = useState<GroupKey>('Women');

  return (
    <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Share of killed or disappeared human rights defenders belonging to selected group
        </P>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          2025
        </P>
      </div>
      <div>
        <P size='sm' marginBottom='2xs'>
          Select defender group
        </P>
        <RadioGroup
          value={selectedGroup}
          className='pb-3'
          onValueChange={(value) => setSelectedGroup(value as GroupKey)}
          color='blue'
        >
          <RadioGroupItem value='Women' label='Women' />
          <RadioGroupItem value='Youth' label='Youth' />
          <RadioGroupItem value='Indigenous & minority' label='Indigenous & minority' />
          <RadioGroupItem value='Environmental & Land' label='Environmental & Land' />
        </RadioGroup>
      </div>

      <div className='grid grid-cols-2 gap-x-6 gap-y-8'>
        {defendersKilledByGroupRegion.map((d) => {
          const share = d.values[selectedGroup];
          return (
            <div key={d.region} className='col-span-2 flex max-h-max flex-col gap-1 sm:col-span-1'>
              <P marginBottom='none' size='base' className='text-foreground'>
                {d.region}
              </P>
              <P
                marginBottom='none'
                className='font-heading font-semibold text-2xl'
                style={{
                  color: {
                    Women: 'var(--quaternary)',
                    Youth: 'var(--primary)',
                    'Indigenous & minority': 'var(--secondary)',
                    'Environmental & Land': 'var(--tertiary)',
                  }[selectedGroup],
                }}
              >
                {share}%
              </P>
              <UnitChart
                data={[
                  { label: 'Share', value: share },
                  { label: 'Remaining', value: 100 - share },
                ]}
                colors={[
                  {
                    Women: 'var(--quaternary)',
                    Youth: 'var(--primary)',
                    'Indigenous & minority': 'var(--secondary)',
                    'Environmental & Land': 'var(--tertiary)',
                  }[selectedGroup],
                  '#ffffff',
                ]}
                totalNoOfDots={100}
                gridSize={20}
                unitPadding={2}
                size={270}
                showColorScale={false}
                showStrokeForWhiteDots
                backgroundColor={false}
                padding='0'
              />
            </div>
          );
        })}
      </div>

      <div className='flex flex-col gap-1'>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          Source: OHCHR
        </P>
        <ChartNote content='Each dot represents the share of defenders killed or disappeared in that region who belonged to the specified group. Categories are not mutually exclusive; an individual may be included in more than one group. Europe and Northern America are excluded due to small case numbers, and Oceania due to insufficient data availability.' />
      </div>
    </div>
  );
}
