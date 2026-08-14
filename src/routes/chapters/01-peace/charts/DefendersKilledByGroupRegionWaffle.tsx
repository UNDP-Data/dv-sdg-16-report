import { UnitChart } from '@undp/data-viz/UnitChart';
import { RadioGroup, RadioGroupItem } from '@undp/design-system-react/RadioGroup';
import { P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import { CHART_PADDING } from '@/constants';
import defendersKilledByGroupRegion from '@/data/chapters/01-peace/16-10-1/defenders-killed-by-group-region.json';

const GROUPS = ['Women', 'Youth', 'Indigenous & minority', 'Environmental'] as const;
type GroupKey = (typeof GROUPS)[number];

export default function DefendersKilledByGroupRegionWaffle() {
  const [selectedGroup, setSelectedGroup] = useState<GroupKey>(GROUPS[0]);

  return (
    <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
      <P marginBottom='none' className='font-heading font-semibold leading-sm'>
        Percentage of Killed or Disappeared Defenders (2025)
      </P>
      <div>
        <P size='sm' marginBottom='2xs'>
          Select defender group
        </P>
        <RadioGroup
          value={selectedGroup}
          onValueChange={(value) => setSelectedGroup(value as GroupKey)}
          color='primary'
        >
          {GROUPS.map((group) => (
            <RadioGroupItem key={group} value={group} label={group} />
          ))}
        </RadioGroup>
      </div>

      <div className='grid grid-cols-2 gap-x-6 gap-y-8'>
        {defendersKilledByGroupRegion.map((d) => {
          const share = d.values[selectedGroup];
          return (
            <div key={d.region} className='flex max-h-max flex-col gap-1'>
              <P marginBottom='none' size='sm' className='text-content-secondary'>
                {d.region}
              </P>
              <P marginBottom='none' className='font-heading font-semibold text-2xl text-primary'>
                {share}%
              </P>
              <UnitChart
                data={[
                  { label: 'Share', value: share },
                  { label: 'Remaining', value: 100 - share },
                ]}
                colors={['var(--primary)', '#ffffff']}
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

      <P marginBottom='none' size='sm' className='text-content-secondary'>
        Source: TBA
      </P>
    </div>
  );
}
