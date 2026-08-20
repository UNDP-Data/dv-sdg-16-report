import { UnitChart } from '@undp/data-viz/UnitChart';
import { RadioGroup, RadioGroupItem } from '@undp/design-system-react/RadioGroup';
import { P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import { CHART_PADDING } from '@/constants';
import defendersKilledByGroupRegion from '@/data/chapters/01-peace/16-10-1/defenders-killed-by-group-region.json';
import ChartNote from '../../components/ChartNote';

const GROUPS = ['Women', 'Youth', 'Indigenous & minority', 'Environmental & Land'] as const;
type GroupKey = (typeof GROUPS)[number];

export default function DefendersKilledByGroupRegionWaffle() {
  const [selectedGroup, setSelectedGroup] = useState<GroupKey>(GROUPS[0]);

  return (
    <div className='flex flex-col gap-4 bg-background-soft' style={{ padding: CHART_PADDING }}>
      <div className='flex flex-col gap-1'>
        <P marginBottom='none' className='font-heading font-semibold leading-sm'>
          Share of Killed or Disappeared Human Rights Defenders Belonging to Selected Group, by
          region
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
            <div key={d.region} className='col-span-2 flex max-h-max flex-col gap-1 sm:col-span-1'>
              <P marginBottom='none' size='base' className='text-foreground'>
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

      <div className='flex flex-col gap-1'>
        <P marginBottom='none' size='sm' className='text-content-secondary'>
          Source: OHCHR
        </P>
        <ChartNote content='Each dot represents the share of defenders killed or disappeared in that region who belonged to the specified group. Categories are not mutually exclusive; an individual may be included in more than one group. Europe and Northern America are excluded due to small case numbers, and Oceania due to insufficient data availability.' />
      </div>
    </div>
  );
}
